import importlib.util
import tempfile
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location('release', Path(__file__).parents[1] / 'release.py')

class ReleaseTests(unittest.TestCase):
    def test_release_manager_exists(self):
        self.assertTrue(Path(spec.origin).exists(), 'transactional release manager must exist')

    def test_switch_rolls_back_config_service_and_pointer_on_failure(self):
        if not Path(spec.origin).exists(): self.skipTest('implementation absent')
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        for failure in ['validate', 'start', 'probe', 'reload', 'smoke']:
            calls = []
            class Backend:
                def __getattr__(self, name):
                    def run(release):
                        calls.append((name, release))
                        if name == failure and release == 'new': raise RuntimeError(failure)
                    return run
            with self.assertRaises(RuntimeError): module.switch_release('new', 'old', Backend())
            self.assertIn(('restore', 'old'), calls, failure)
            self.assertNotIn(('record', 'new'), calls, failure)

    def test_success_records_only_after_real_probe_reload_and_smoke(self):
        if not Path(spec.origin).exists(): self.skipTest('implementation absent')
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        calls=[]
        class Backend:
            def __getattr__(self,name): return lambda release:calls.append(name)
        module.switch_release('new','old',Backend())
        self.assertEqual(calls,['preflight','preflight','stage','validate','start','probe','reload','smoke','record'])

    def test_both_release_start_conditions_are_preflighted_before_mutation(self):
        if not Path(spec.origin).exists(): self.skipTest('implementation absent')
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        calls=[]
        class Backend:
            def preflight(self, release):
                calls.append(('preflight', release))
                if release == 'old': raise ValueError('missing old TypeSafe rollback key')
            def __getattr__(self, name):
                def run(release): calls.append((name, release))
                return run
        with self.assertRaisesRegex(ValueError, 'rollback key'):
            module.switch_release('new', 'old', Backend())
        self.assertEqual(calls, [('preflight', 'new'), ('preflight', 'old')])

class BundleTests(unittest.TestCase):
    def setUp(self):
        self.module = importlib.util.module_from_spec(spec); spec.loader.exec_module(self.module)
        self.tmp = tempfile.TemporaryDirectory(); self.addCleanup(self.tmp.cleanup)
        self.bundle = Path(self.tmp.name) / 'release-a'; self.bundle.mkdir()
        (self.bundle/'site').mkdir(); (self.bundle/'site/index.html').write_text('site')
        (self.bundle/'nginx').mkdir(); (self.bundle/'nginx/site.conf').write_text('config')
        self.manifest={'schema':'visalang.release.v1','sourceCommit':'a'*40,'candidateOnly':False,
                       'image':'example/laya@sha256:'+'b'*64,'modelRevision':'c'*40,
                       'adsRequired':True,'layaRequired':True,'files':self.module.tree_hashes(self.bundle)}
        self.module.write_json(self.bundle/'release.json',self.manifest)

    def test_byte_and_file_set_tampering_is_rejected(self):
        self.module.verify(self.bundle)
        (self.bundle/'site/index.html').write_text('changed')
        with self.assertRaisesRegex(ValueError,'bytes changed'):self.module.verify(self.bundle)
        (self.bundle/'site/index.html').write_text('site')
        (self.bundle/'site/extra.html').write_text('unreviewed')
        with self.assertRaisesRegex(ValueError,'file set'):self.module.verify(self.bundle)

    def test_mutable_image_tag_and_missing_approval_are_rejected(self):
        self.manifest['image']='example/laya:latest'
        self.module.write_json(self.bundle/'release.json',self.manifest)
        with self.assertRaisesRegex(ValueError,'digest'):self.module.verify(self.bundle)

    def test_dirty_candidate_cannot_be_activated(self):
        self.manifest['candidateOnly']=True
        self.module.write_json(self.bundle/'release.json',self.manifest)
        with self.assertRaisesRegex(ValueError,'Dirty source'):
            self.module.approval(self.bundle,Path(self.tmp.name)/'missing.json','activate',None)

    def test_approval_is_bound_to_operation_baseline_and_evidence_bytes(self):
        evidence=Path(self.tmp.name)/'evidence.txt'; evidence.write_text('test evidence only')
        receipt=Path(self.tmp.name)/'approval.json'
        r={'ownerAuthorized':True,'ownerDecisionRef':'unit-test-only', 'operation':'activate',
           'releaseSha256':self.module.sha(self.bundle/'release.json'),'previousReleaseSha256':None,
           'evidence':{k:{'status':'pass','path':'evidence.txt','sha256':self.module.sha(evidence)} for k in self.module.GATES}}
        self.module.write_json(receipt,r)
        self.module.approval(self.bundle,receipt,'activate',None)
        with self.assertRaisesRegex(ValueError,'operation'):self.module.approval(self.bundle,receipt,'rollback',None)
        with self.assertRaisesRegex(ValueError,'baseline'):self.module.approval(self.bundle,receipt,'activate','old')
        evidence.write_text('changed')
        with self.assertRaisesRegex(ValueError,'Changed evidence'):self.module.approval(self.bundle,receipt,'activate',None)

    def test_bundle_symlinks_are_rejected(self):
        (self.bundle/'site/alias.html').symlink_to('index.html')
        with self.assertRaisesRegex(ValueError,'symlinks'):self.module.verify(self.bundle)

    def test_old_manifest_defaults_to_laya_and_typesafe_manifest_is_explicit(self):
        self.assertEqual(self.module.verify(self.bundle).get('purposeProvider', 'laya'), 'laya')
        self.manifest.update(purposeProvider='typesafe', typesafeRequired=True,
                             typesafeModel='jev-latest', layaRequired=False)
        self.module.write_json(self.bundle/'release.json',self.manifest)
        self.assertEqual(self.module.verify(self.bundle)['purposeProvider'], 'typesafe')
        self.manifest['typesafeRequired'] = False
        self.module.write_json(self.bundle/'release.json',self.manifest)
        with self.assertRaisesRegex(ValueError, 'TypeSafe provider release contract'):
            self.module.verify(self.bundle)

class HostSmokeTests(unittest.TestCase):
    def test_retained_path_redirects_are_not_successful_smoke_checks(self):
        from unittest.mock import patch
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        with tempfile.TemporaryDirectory() as tmp:
            bundle=Path(tmp)
            module.write_json(bundle/'retained-routes.json', {'records':[{'path':'/guides/retained/'}]})
            host=object.__new__(module.Host)
            for rejected in [b'301', b'302', b'204', b'404']:
                with patch.object(module.subprocess, 'check_output', side_effect=[b'200',b'200',rejected]), patch.object(host, 'run'):
                    with self.assertRaisesRegex(ValueError, 'HTTP 200'):
                        host.smoke(bundle)
            with patch.object(module.subprocess, 'check_output', side_effect=[b'200',b'200',b'200',b'{"status":"suggestion","requiresConfirmation":true}']), patch.object(host, 'run'):
                host.smoke(bundle)


class HostProviderTests(unittest.TestCase):
    def test_typesafe_key_is_preflighted_and_passed_by_environment_name(self):
        from unittest.mock import patch
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        host = object.__new__(module.Host)
        calls = []
        def fake_run(*args):
            calls.append(args)
        host.run = fake_run
        host.model_changed = False
        release = {'purposeProvider': 'typesafe', 'typesafeModel': 'jev-latest',
                   'image': 'example/laya@sha256:' + 'b' * 64}
        with patch.object(module, 'verify', return_value=release), \
             patch.dict(module.os.environ, {'TYPESAFE_API_KEY': 'test-only-secret'}), \
             patch.object(module.subprocess, 'run', return_value=type('Result', (), {'returncode': 1})()):
            host.start('release')
        docker_run = calls[-1]
        self.assertIn('TYPESAFE_API_KEY', docker_run)
        self.assertNotIn('test-only-secret', docker_run)
        self.assertIn('PURPOSE_PROVIDER=typesafe', docker_run)
        self.assertFalse(any(arg.startswith('-v') for arg in docker_run))

    def test_missing_typesafe_key_fails_before_container_mutation(self):
        from unittest.mock import patch
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        host = object.__new__(module.Host)
        host.run = lambda *args: self.fail('Docker must not run without the TypeSafe key')
        with patch.object(module, 'verify', return_value={
            'purposeProvider': 'typesafe', 'typesafeModel': 'jev-latest',
            'image': 'example/laya@sha256:' + 'b' * 64,
        }), patch.dict(module.os.environ, {}, clear=True):
            with self.assertRaisesRegex(ValueError, 'key must be configured'):
                host.start('release')

    def test_previous_typesafe_key_is_checked_before_switch_staging(self):
        from unittest.mock import patch
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        host = object.__new__(module.Host)
        calls = []
        host.run = lambda *args: calls.append(args)
        with tempfile.TemporaryDirectory() as tmp:
            target = Path(tmp) / 'new-laya'; target.mkdir()
            (target / 'model.lock.json').write_text('{"files":{}}')
            manifests = {
                str(target): {
                    'purposeProvider': 'laya', 'modelRevision': 'c' * 40,
                    'image': 'example/laya@sha256:' + 'b' * 64,
                },
                'old-typesafe': {
                    'purposeProvider': 'typesafe', 'typesafeModel': 'jev-latest',
                    'image': 'example/laya@sha256:' + 'd' * 64,
                },
            }
            with patch.object(module, 'verify', side_effect=lambda release: manifests[str(release)]), \
                 patch.object(module, 'tree_hashes', return_value={}), \
                 patch.dict(module.os.environ, {}, clear=True):
                with self.assertRaisesRegex(ValueError, 'key must be configured'):
                    module.switch_release(target, 'old-typesafe', host)
        self.assertEqual(calls, [('docker', 'image', 'inspect', 'example/laya@sha256:' + 'b' * 64)])
        self.assertFalse(any(command[1] in ('rm', 'run') for command in calls))


class PrepareGuardTests(unittest.TestCase):
    """prepare() must fail closed on broken output and stay quiet on healthy output.

    Each case builds a minimal tree under a temporary directory and points module.ROOT at it, so no
    case reads the repository's real src/ or dist/. Those change while other editors are working and
    while test runs write fixtures, which would make these cases flaky rather than wrong.

    Guards live before out.mkdir(), so a refused prepare() must leave no release directory behind:
    otherwise the next attempt dies on 'Refuse to overwrite an existing release' instead of the real
    cause, and every case below also asserts that.
    """

    COMMIT = 'a' * 40
    REVISION = 'c' * 40
    IMAGE = 'example/site@sha256:' + 'b' * 64

    def write(self, path, text):
        Path(path).parent.mkdir(parents=True, exist_ok=True)
        Path(path).write_text(text, encoding='utf-8')

    def sitemap(self, *slugs, extra=''):
        urls = ''.join(f'<url><loc>https://visalang.org/guides/{slug}/</loc></url>' for slug in slugs)
        return f'<?xml version="1.0"?><urlset>{urls}{extra}</urlset>'

    def tree(self, tmp):
        """A build that should package cleanly: one guide, its page, its sitemap entry."""
        base = Path(tmp)
        root = base / 'root'
        self.write(root / 'dist/index.html', '<!doctype html><title>home</title>')
        self.write(root / 'dist/guides/pillar-one/index.html', '<!doctype html><title>pillar</title>')
        self.write(root / 'dist/sitemap-0.xml', self.sitemap('pillar-one'))
        self.write(root / 'src/content/guides/pillar-one.md', '---\ntitle: Pillar one\n---\n\nBody.\n')
        self.write(root / 'deploy/nginx-vhost-template.conf',
                   'root /var/www/visalang.org/current;\n'
                   'include /etc/nginx/snippets/visalang-legacy-redirects.conf;\n')
        self.write(root / 'deploy/legacy-redirects.conf', '# legacy redirects\n')
        self.write(root / 'deploy/laya-purpose-nginx.conf', '# laya purpose\n')
        self.write(root / 'deploy/retained-routes.json', '{"records": []}\n')
        self.write(root / 'services/laya-purpose/model.lock.json', '{"revision": "' + self.REVISION + '"}\n')
        return root, base / 'out'

    def prepare(self, root, out):
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        from unittest.mock import patch
        module.ROOT = Path(root)

        def check_output(args, cwd=None):
            if args[:2] == ['git', 'ls-files']:
                return 'src/content/guides/pillar-one.md\0'.encode()
            if args[:2] == ['git', 'status']:
                return b''
            if args[:2] == ['git', 'rev-parse']:
                return (self.COMMIT + '\n').encode()
            raise AssertionError('unexpected git call: ' + repr(args))

        with patch.object(module.subprocess, 'check_output', side_effect=check_output):
            return module.prepare(out, self.IMAGE, self.REVISION)

    def assert_refused(self, root, out, pattern):
        with self.assertRaisesRegex(ValueError, pattern):
            self.prepare(root, out)
        self.assertFalse(Path(out).exists(), 'a refused prepare() must leave no release directory')

    def test_healthy_output_packages(self):
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            manifest = self.prepare(root, out)
            self.assertTrue((Path(out) / 'site/index.html').is_file(), 'site payload is copied verbatim')
            self.assertTrue((Path(out) / 'nginx/site.conf').is_file(), 'nginx config is staged')
            self.assertFalse(manifest['candidateOnly'], 'clean git status yields a non-candidate release')

    def test_missing_dist_guides_directory_is_refused(self):
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            import shutil
            shutil.rmtree(root / 'dist/guides')
            self.assert_refused(root, out, 'dist/guides missing')

    def test_missing_sitemap_is_refused(self):
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            (root / 'dist/sitemap-0.xml').unlink()
            self.assert_refused(root, out, 'sitemap-0.xml missing')

    def test_leaked_fixture_in_output_is_refused(self):
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            self.write(root / 'dist/guides/__source-review-pending-fixture/index.html', '<!doctype html>')
            self.assert_refused(root, out, 'carries test fixtures')

    def test_fixture_in_sources_with_clean_output_packages(self):
        """The state that must stay allowed: a test wrote a fixture, dist is still the clean build.

        Without excluding '__' from the source slugs this is a false positive, and it fires exactly
        when the guard should pass -- the one moment nobody questions the guard.
        """
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            self.write(root / 'src/content/guides/__source-review-pending-fixture.md',
                       '---\ntitle: Fixture\n---\n\nFixture only.\n')
            manifest = self.prepare(root, out)
            self.assertFalse(manifest['candidateOnly'])

    def test_noindex_guide_absent_from_sitemap_packages(self):
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            self.write(root / 'src/content/guides/delisted.md',
                       '---\ntitle: Delisted\nnoindex: true\n---\n\nDeliberately unlisted.\n')
            self.write(root / 'dist/guides/delisted/index.html', '<!doctype html><title>delisted</title>')
            manifest = self.prepare(root, out)
            self.assertFalse(manifest['candidateOnly'])

    def test_sitemap_contents_are_not_a_gate(self):
        """Pins release.py:80-84: completeness is asserted on the directory tree, not the sitemap.

        The sitemap is written last and can be read mid-flush; a concurrent build showed
        mtime == read epoch with 41 of 90 URLs. Gating on its content rejects good builds at random.
        A guide absent from the sitemap must therefore NOT block packaging: the rendered directory
        is what proves the page exists. If someone re-adds a sitemap-content gate, this test fails
        and points at that reasoning before the gate ships.

        The related category case is now pinned by its own test: Astro writes category URLs into the
        sitemap and enrich-sitemap-lastmod.js removes them afterwards, so a category row means the
        postbuild step did not finish. That check is kept despite the mid-flush risk because the
        failure modes are asymmetric -- truncation makes an omission check noisy (rejects good
        builds) but makes the category check quiet (fewer rows), so it cannot reject a finished one.
        """
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            self.write(root / 'src/content/guides/extra.md', '---\ntitle: Extra\n---\n\nBody.\n')
            self.write(root / 'dist/guides/extra/index.html', '<!doctype html><title>extra</title>')
            # sitemap still lists only pillar-one: extra is absent from it on purpose.
            manifest = self.prepare(root, out)
            self.assertFalse(manifest['candidateOnly'])

    def test_guide_without_rendered_page_is_refused(self):
        """Source has the guide, no directory exists: only the set difference catches this."""
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            self.write(root / 'src/content/guides/ghost.md', '---\ntitle: Ghost\n---\n\nBody.\n')
            self.write(root / 'dist/sitemap-0.xml', self.sitemap('pillar-one', 'ghost'))
            self.assert_refused(root, out, 'no page rendered for')

    def test_category_route_outside_sitemap_packages(self):
        """A category page is built but stays out of the sitemap; that is the healthy state."""
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            self.write(root / 'dist/guides/category/uk/index.html', '<!doctype html><title>UK</title>')
            manifest = self.prepare(root, out)
            self.assertFalse(manifest['candidateOnly'])

    def test_category_url_in_sitemap_is_refused(self):
        """A category row in the sitemap means the pipeline stopped before postbuild.

        Astro writes category URLs into the sitemap; enrich-sitemap-lastmod.js removes them in the
        postbuild step. So this is a statement about the pipeline, not about content: the message
        must name postbuild, otherwise the reader looks for a content leak that does not exist.
        """
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            extra = '<url><loc>https://visalang.org/guides/category/uk/</loc></url>'
            self.write(root / 'dist/sitemap-0.xml', self.sitemap('pillar-one', extra=extra))
            with self.assertRaisesRegex(ValueError, 'postbuild') as caught:
                self.prepare(root, out)
            self.assertIn('noindex category URLs', str(caught.exception))
            self.assertFalse(Path(out).exists(), 'a refused prepare() must leave no release directory')

    def test_refused_prepare_can_be_retried(self):
        """A guard failure must not poison the target path for the next attempt."""
        with tempfile.TemporaryDirectory() as tmp:
            root, out = self.tree(tmp)
            import shutil
            shutil.rmtree(root / 'dist/guides')
            self.assert_refused(root, out, 'dist/guides missing')
            self.assert_refused(root, out, 'dist/guides missing')
