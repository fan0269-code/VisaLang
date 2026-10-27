#!/usr/bin/env python3
"""Build/verifiy immutable local candidates; host activation requires bound evidence.

Only activate/rollback mutate a host. Run as root in a separately authorized
maintenance window. Both use the same transaction and explicit target bundle.
"""
import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = Path('/var/www/visalang.org')
ENABLED = Path('/etc/nginx/sites-enabled/visalang.org')
CONTAINER = 'visalang-laya-purpose'
GATES = ('independentAudit', 'adsConsent', 'capacity', 'preDnsTls', 'rollbackRehearsal', 'dnsBackup')


def sha(file):
    return hashlib.sha256(Path(file).read_bytes()).hexdigest()


def write_json(path, data):
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def tree_hashes(path):
    return {str(p.relative_to(path)): sha(p) for p in sorted(Path(path).rglob('*')) if p.is_file()}


def require(condition, message):
    if not condition:
        raise ValueError(message)


def verify(bundle):
    bundle = Path(bundle).resolve()
    require(not any(p.is_symlink() for p in bundle.rglob('*')), 'Release bundle must not contain symlinks')
    m = json.loads((bundle / 'release.json').read_text())
    require(type(m.get('candidateOnly')) is bool, 'Explicit candidate state required')
    require(m['schema'] == 'visalang.release.v1', 'Unsupported release schema')
    require(re.fullmatch(r'[0-9a-f]{40}', m['sourceCommit']), 'Exact source commit required')
    require(re.fullmatch(r'[a-z0-9][a-z0-9._/-]*@sha256:[0-9a-f]{64}', m['image']), 'Immutable registry image digest required')
    require(re.fullmatch(r'[0-9a-f]{40}', m['modelRevision']), 'Exact model revision required')
    require(m['adsRequired'] is True and m['layaRequired'] is True, 'Joint release contract required')
    actual = tree_hashes(bundle)
    actual.pop('release.json', None)
    require(actual == m['files'], 'Bundle file set/bytes changed after packaging')
    require('site/index.html' in actual and 'nginx/site.conf' in actual, 'Incomplete bundle')
    return m


def prepare(out, image, model_revision):
    out = Path(out).resolve()
    require(not out.exists(), 'Refuse to overwrite an existing release')
    require((ROOT / 'dist/index.html').is_file(), 'Build and validate the site first')
    require(re.fullmatch(r'[a-z0-9][a-z0-9._/-]*@sha256:[0-9a-f]{64}', image), 'Supply a built image by registry digest, never a tag')
    model_lock = json.loads((ROOT / 'services/laya-purpose/model.lock.json').read_text())
    require(model_revision == model_lock['revision'], 'Only the reviewed model revision is allowed')
    out.mkdir(parents=True)
    try:
        shutil.copytree(ROOT / 'dist', out / 'site')
        (out / 'nginx').mkdir()
        # Runtime paths are release-specific. Old Nginx workers retain the old static
        # root while new configuration is staged; current is only a release pointer.
        installed = SITE / 'releases' / out.name
        config = (ROOT / 'deploy/nginx-vhost-template.conf').read_text()
        config = config.replace('root /var/www/visalang.org/current;', f'root {installed}/site;')
        config = config.replace('include /etc/nginx/snippets/visalang-legacy-redirects.conf;', f'include {installed}/nginx/legacy.conf;\n    include {installed}/nginx/laya.conf;')
        config = 'limit_req_zone $binary_remote_addr zone=visalang_purpose:10m rate=6r/m;\n' + config
        (out / 'nginx/site.conf').write_text(config)
        shutil.copy2(ROOT / 'deploy/legacy-redirects.conf', out / 'nginx/legacy.conf')
        shutil.copy2(ROOT / 'deploy/laya-purpose-nginx.conf', out / 'nginx/laya.conf')
        shutil.copy2(ROOT / 'services/laya-purpose/model.lock.json', out / 'model.lock.json')
        shutil.copy2(ROOT / 'deploy/retained-routes.json', out / 'retained-routes.json')
        # Commit alone cannot describe a dirty candidate. Bind all application inputs.
        source = subprocess.check_output(['git', 'ls-files', '-co', '--exclude-standard', '-z'], cwd=ROOT).decode().split('\0')
        inputs = sorted(set(p for p in source if p and (ROOT / p).is_file() and p.startswith(('src/', 'public/', 'deploy/', 'services/')) and '__pycache__' not in p))
        write_json(out / 'source-inputs.json', {p: sha(ROOT / p) for p in inputs})
        dirty = subprocess.check_output(['git', 'status', '--porcelain'], cwd=ROOT).decode()
        m = {'schema': 'visalang.release.v1', 'releaseId': out.name,
             'sourceCommit': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT).decode().strip(),
             'candidateOnly': bool(dirty), 'image': image, 'modelRevision': model_revision,
             'adsRequired': True, 'layaRequired': True, 'files': tree_hashes(out)}
        write_json(out / 'release.json', m)
        verify(out)
    except Exception:
        shutil.rmtree(out)
        raise
    return m


def approval(bundle, receipt, operation, previous_hash):
    m = verify(bundle)
    require(not m['candidateOnly'], 'Dirty source candidate cannot be activated; commit and repackage after authorization')
    receipt = Path(receipt).resolve()
    r = json.loads(receipt.read_text())
    require(r['releaseSha256'] == sha(Path(bundle) / 'release.json'), 'Approval binds a different release')
    require(r['operation'] == operation and r['ownerAuthorized'] is True, 'Explicit operation authorization missing')
    require(r.get('previousReleaseSha256') == previous_hash, 'Approval does not bind the current rollback baseline')
    require(r.get('ownerDecisionRef', '').strip(), 'Locatable Owner decision required')
    for key in GATES:
        gate = r.get('evidence', {}).get(key, {})
        require(gate.get('status') == 'pass', f'Missing release evidence: {key}')
        file = (receipt.parent / gate.get('path', '')).resolve()
        require(file.is_relative_to(receipt.parent) and file.is_file(), f'Invalid evidence path: {key}')
        require(sha(file) == gate.get('sha256'), f'Changed evidence: {key}')
    return m


def switch_release(target, previous, backend):
    try:
        for action in ('stage', 'validate', 'start', 'probe', 'reload', 'smoke', 'record'):
            getattr(backend, action)(target)
    except BaseException:
        # A restore failure must propagate: never report rollback success on intent.
        backend.restore(previous)
        raise


class Host:
    def __init__(self):
        require(not ENABLED.exists() or ENABLED.is_symlink(), 'Existing unmanaged vhost: inventory and migrate it explicitly before activation')
        self.old_config = os.readlink(ENABLED) if ENABLED.is_symlink() else None
        self.model_changed = False

    def run(self, *args):
        subprocess.run(args, check=True, timeout=180)

    def link(self, target, link):
        stage = link.with_name(link.name + '.next')
        require(not stage.exists() and not stage.is_symlink(), f'Stale staged link: {stage}')
        stage.symlink_to(target)
        os.replace(stage, link)

    def stage(self, release):
        self.link(Path(release) / 'nginx/site.conf', ENABLED)

    def validate(self, release):
        self.run('nginx', '-t')

    def start(self, release):
        m = verify(release)
        cache = Path('/srv/visalang/models') / m['modelRevision']
        lock = json.loads((Path(release) / 'model.lock.json').read_text())
        require(tree_hashes(cache) == lock['files'], 'Model cache is absent or not the reviewed bytes')
        self.run('docker', 'image', 'inspect', m['image'])  # no implicit pull on production
        self.model_changed = True
        existing = subprocess.run(['docker', 'container', 'inspect', CONTAINER], capture_output=True)
        if existing.returncode == 0:
            self.run('docker', 'rm', '-f', CONTAINER)
        self.run('docker', 'run', '-d', '--pull=never', '--name', CONTAINER,
                 '--restart', 'unless-stopped', '--read-only', '--tmpfs', '/tmp:rw,noexec,nosuid,size=128m',
                 '--cap-drop', 'ALL', '--security-opt', 'no-new-privileges', '--memory', '3g',
                 '--cpus', '2', '--pids-limit', '128', '--log-opt', 'max-size=5m', '--log-opt', 'max-file=2',
                 '-p', '127.0.0.1:8011:8011', '-v', f'{cache}:/models/checkpoint:ro',
                 '-e', 'LAYA_MODEL=/models/checkpoint', '-e', 'LAYA_SUBFOLDER=multilingual', m['image'])

    def probe(self, release):
        last = None
        for _ in range(30):
            try:
                request = urllib.request.Request('http://127.0.0.1:8011/api/purpose-suggestion/',
                    data=b'{"text":"I want to apply for a university degree."}', headers={'Content-Type': 'application/json'})
                with urllib.request.urlopen(request, timeout=10) as r:
                    result = json.load(r)
                require(result.get('status') in ('suggestion', 'needs_clarification') and result.get('requiresConfirmation') is True, 'Inference contract failed')
                return
            except Exception as e:
                last = e
                time.sleep(2)
        raise RuntimeError('Real inference probe failed') from last

    def reload(self, release):
        self.run('systemctl', 'reload', 'nginx')

    def smoke(self, release):
        # Real TLS/SNI through Nginx, independent of public DNS propagation.
        for route in ['/', '/zh/tools/route-finder/'] + [r['path'] for r in json.loads((Path(release) / 'retained-routes.json').read_text())['records']]:
            status = subprocess.check_output([
                'curl', '--fail', '--silent', '--show-error', '--max-time', '10',
                '--resolve', 'visalang.org:443:127.0.0.1', '-o', '/dev/null',
                '--write-out', '%{http_code}', 'https://visalang.org' + route], timeout=15)
            require(status.strip() == b'200', f'Expected HTTP 200 for retained/core path: {route}')

        response = subprocess.check_output([
            'curl', '--fail', '--silent', '--show-error', '--max-time', '12',
            '--resolve', 'visalang.org:443:127.0.0.1', '-H', 'Content-Type: application/json',
            '--data', '{"text":"I want to apply for a university degree."}',
            'https://visalang.org/api/purpose-suggestion/'], timeout=15)
        result = json.loads(response)
        require(result.get('requiresConfirmation') is True and result.get('status') in ('suggestion', 'needs_clarification'), 'Nginx inference contract failed')

    def record(self, release):
        self.link(Path(release), SITE / 'current')

    def restore(self, previous):
        if previous:
            if self.model_changed:
                self.start(previous)
                self.probe(previous)
            self.stage(previous)
        elif self.old_config:
            self.link(self.old_config, ENABLED)
        else:
            if ENABLED.is_symlink(): ENABLED.unlink()
        if not previous and self.model_changed:
            self.run('docker', 'rm', '-f', CONTAINER)
        self.validate(previous)
        self.reload(previous)
        if previous: self.record(previous)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    build = sub.add_parser('prepare')
    build.add_argument('out'); build.add_argument('--image', required=True); build.add_argument('--model-revision', required=True)
    check = sub.add_parser('verify'); check.add_argument('bundle')
    for name in ('activate', 'rollback'):
        p = sub.add_parser(name); p.add_argument('bundle'); p.add_argument('--approval', required=True)
    args = parser.parse_args()
    if args.command == 'prepare':
        require(re.fullmatch(r'[a-z0-9][a-z0-9-]{0,63}', Path(args.out).name), 'Use a safe release directory name')
        print(json.dumps(prepare(args.out, args.image, args.model_revision), indent=2)); return
    bundle = Path(args.bundle).resolve()
    if args.command == 'verify': print(json.dumps(verify(bundle), indent=2)); return
    require(os.geteuid() == 0, 'Host mutation requires root and an authorized maintenance window')
    require(bundle.parent == (SITE / 'releases').resolve(), 'Install immutable bundle under the exact releases directory')
    require(bundle.name == verify(bundle)['releaseId'], 'Do not rename a prepared release directory')
    # Read and authorize the actual baseline only after acquiring the host lock.
    import fcntl
    with (SITE / 'release.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        current = SITE / 'current'
        require(not current.exists() or current.is_symlink(), 'Unmanaged current directory requires explicit migration')
        previous = current.resolve() if current.is_symlink() else None
        require(previous != bundle, 'Target is already current')
        if previous:
            require(previous.parent == (SITE / 'releases').resolve(), 'Current release escaped releases directory')
            verify(previous)
        approval(bundle, args.approval, args.command, sha(previous / 'release.json') if previous else None)
        if previous is None:
            existing = subprocess.run(['docker', 'container', 'inspect', CONTAINER], capture_output=True)
            require(existing.returncode != 0, 'Unmanaged Laya container: inventory before first activation')
        switch_release(bundle, previous, Host())
    print('Release switched. Public DNS, ads-account validation and post-launch observation are separate evidence.')


if __name__ == '__main__':
    main()
