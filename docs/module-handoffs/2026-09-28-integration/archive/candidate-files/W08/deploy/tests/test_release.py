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

    def test_failed_mode_transition_restores_exact_previous_mode(self):
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        for target_mode, previous_mode in [
            ('laya', 'off'), ('off', 'typesafe'), ('typesafe', 'laya'),
            ('laya', 'typesafe'), ('typesafe', 'off'),
        ]:
            calls = []
            class Backend:
                def preflight(self, release): calls.append(('preflight', release))
                def stage(self, release): calls.append(('stage', release))
                def validate(self, release): calls.append(('validate', release))
                def start(self, release):
                    calls.append(('start', release))
                    if release == target_mode: raise RuntimeError('injected start failure')
                def restore(self, release): calls.append(('restore', release))
            with self.assertRaisesRegex(RuntimeError, 'injected start failure'):
                module.switch_release(target_mode, previous_mode, Backend())
            self.assertEqual(calls[-1], ('restore', previous_mode))

    def test_restore_failure_is_reported_instead_of_hidden(self):
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        class Backend:
            def __getattr__(self, name):
                def run(release):
                    if name == 'start' and release == 'new': raise RuntimeError('target failed')
                    if name == 'restore': raise OSError('restore failed')
                return run
        with self.assertRaisesRegex(OSError, 'restore failed'):
            module.switch_release('new', 'old', Backend())

class BundleTests(unittest.TestCase):
    def setUp(self):
        self.module = importlib.util.module_from_spec(spec); spec.loader.exec_module(self.module)
        self.tmp = tempfile.TemporaryDirectory(); self.addCleanup(self.tmp.cleanup)
        self.bundle = Path(self.tmp.name) / 'release-a'; self.bundle.mkdir()
        (self.bundle/'site').mkdir(); (self.bundle/'site/index.html').write_text('site')
        self.features={'schemaVersion':1,'purposeSuggestions':'off','advertising':'off'}
        self.module.write_json(self.bundle/'site/runtime-features.json',self.features)
        (self.bundle/'nginx').mkdir(); (self.bundle/'nginx/site.conf').write_text('config')
        self.manifest={'schema':'visalang.release.v1','sourceCommit':'a'*40,'candidateOnly':False,
                       'features':self.features.copy(),
                       'files':self.module.tree_hashes(self.bundle)}
        self.module.write_json(self.bundle/'release.json',self.manifest)

    def set_features(self, purpose, advertising):
        self.features={'schemaVersion':1,'purposeSuggestions':purpose,'advertising':advertising}
        self.module.write_json(self.bundle/'site/runtime-features.json',self.features)
        self.manifest['features']=self.features.copy()
        (self.bundle/'nginx/site.conf').write_text('config')
        for key in ['image','modelRevision','typesafeRequired','typesafeModel','layaRequired','purposeProvider','adsRequired']:
            self.manifest.pop(key,None)
        (self.bundle/'nginx/laya.conf').unlink(missing_ok=True)
        if purpose != 'off':
            (self.bundle/'nginx/laya.conf').write_text('purpose endpoint route')
            (self.bundle/'nginx/site.conf').write_text('limit_req_zone $binary_remote_addr zone=visalang_purpose:10m rate=6r/m;\ninclude /releases/release-a/nginx/laya.conf;')
            self.manifest['image']='example/laya@sha256:'+'b'*64
        if purpose == 'laya':
            self.manifest.update(modelRevision='c'*40,layaRequired=True)
        elif purpose == 'typesafe':
            self.manifest.update(typesafeRequired=True,typesafeModel='jev-latest',layaRequired=False)
        hashes=self.module.tree_hashes(self.bundle); hashes.pop('release.json',None)
        self.manifest['files']=hashes
        self.module.write_json(self.bundle/'release.json',self.manifest)

    def test_ads_off_requires_zero_loader_and_runtime_manifest_match(self):
        (self.bundle/'site/index.html').write_text('<script src="https://pagead2.googlesyndication.com/x.js"></script>')
        hashes=self.module.tree_hashes(self.bundle); hashes.pop('release.json',None)
        self.manifest['files']=hashes; self.module.write_json(self.bundle/'release.json',self.manifest)
        with self.assertRaisesRegex(ValueError, 'Advertising-off'):
            self.module.verify(self.bundle)

    def test_pre_contract_candidate_without_build_mode_manifest_is_refused(self):
        (self.bundle/'site/runtime-features.json').unlink()
        hashes=self.module.tree_hashes(self.bundle); hashes.pop('release.json',None)
        self.manifest['files']=hashes; self.module.write_json(self.bundle/'release.json',self.manifest)
        with self.assertRaisesRegex(ValueError, 'Built runtime feature contract is missing'):
            self.module.verify(self.bundle)

    def test_byte_and_file_set_tampering_is_rejected(self):
        self.module.verify(self.bundle)
        (self.bundle/'site/index.html').write_text('changed')
        with self.assertRaisesRegex(ValueError,'bytes changed'):self.module.verify(self.bundle)
        (self.bundle/'site/index.html').write_text('site')
        (self.bundle/'site/extra.html').write_text('unreviewed')
        with self.assertRaisesRegex(ValueError,'file set'):self.module.verify(self.bundle)

    def test_mutable_image_tag_and_missing_approval_are_rejected(self):
        self.set_features('typesafe','off')
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
           'evidence':{k:{'status':'pass','path':'evidence.txt','sha256':self.module.sha(evidence)} for k in self.module.BASE_GATES}}
        r['evidence']['capacity']={'status':'not_applicable','path':'evidence.txt','sha256':self.module.sha(evidence)}
        r['evidence']['adsConsent']={'status':'not_applicable','path':'evidence.txt','sha256':self.module.sha(evidence)}
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
        self.set_features('laya','on')
        self.manifest.pop('features')
        self.manifest.update(purposeProvider='laya', adsRequired=True, layaRequired=True)
        self.module.write_json(self.bundle/'release.json',self.manifest)
        self.assertEqual(self.module.verify(self.bundle)['features'],
                         {'schemaVersion': 1, 'purposeSuggestions': 'laya', 'advertising': 'on'})
        self.manifest.update(purposeProvider='typesafe', typesafeRequired=True,
                             typesafeModel='jev-latest', layaRequired=False)
        self.manifest.pop('modelRevision',None)
        self.features={'schemaVersion':1,'purposeSuggestions':'typesafe','advertising':'on'}
        self.module.write_json(self.bundle/'site/runtime-features.json',self.features)
        self.manifest.update(image='example/laya@sha256:'+'b'*64)
        (self.bundle/'nginx/laya.conf').write_text('purpose endpoint route')
        hashes=self.module.tree_hashes(self.bundle); hashes.pop('release.json',None)
        self.manifest['files']=hashes
        self.module.write_json(self.bundle/'release.json',self.manifest)
        self.assertEqual(self.module.verify(self.bundle)['features']['purposeSuggestions'], 'typesafe')
        self.manifest['typesafeRequired'] = False
        self.module.write_json(self.bundle/'release.json',self.manifest)
        with self.assertRaisesRegex(ValueError, 'TypeSafe provider release contract'):
            self.module.verify(self.bundle)

    def test_all_six_feature_combinations_verify_without_unrelated_laya_requirements(self):
        for purpose in ['off', 'laya', 'typesafe']:
            for advertising in ['off', 'on']:
                self.set_features(purpose,advertising)
                self.assertEqual(self.module.verify(self.bundle)['features']['purposeSuggestions'], purpose)

    def test_conflicting_legacy_fields_are_rejected(self):
        self.set_features('off','off')
        self.manifest.update(purposeProvider='typesafe', adsRequired=True)
        self.module.write_json(self.bundle/'release.json', self.manifest)
        with self.assertRaisesRegex(ValueError, 'Conflicting legacy feature fields'):
            self.module.verify(self.bundle)

    def test_typesafe_release_approval_requires_privacy_and_quota_evidence(self):
        self.set_features('typesafe','off')
        evidence=Path(self.tmp.name)/'evidence.txt'; evidence.write_text('bound evidence')
        receipt=Path(self.tmp.name)/'approval.json'
        gates={k:{'status':'pass','path':'evidence.txt','sha256':self.module.sha(evidence)} for k in self.module.BASE_GATES}
        gates.update(capacity={'status':'not_applicable','path':'evidence.txt','sha256':self.module.sha(evidence)},
                     adsConsent={'status':'not_applicable','path':'evidence.txt','sha256':self.module.sha(evidence)})
        payload={'ownerAuthorized':True,'ownerDecisionRef':'unit-test-only','operation':'activate',
                 'releaseSha256':self.module.sha(self.bundle/'release.json'),'previousReleaseSha256':None,'evidence':gates}
        self.module.write_json(receipt,payload)
        with self.assertRaisesRegex(ValueError, 'typesafePrivacy'):
            self.module.approval(self.bundle,receipt,'activate',None)
        for key in ['typesafePrivacy','typesafeQuota']:
            payload['evidence'][key]={'status':'pass','path':'evidence.txt','sha256':self.module.sha(evidence)}
        self.module.write_json(receipt,payload)
        self.module.approval(self.bundle,receipt,'activate',None)

    def test_typesafe_capacity_is_not_the_laya_local_model_gate(self):
        self.set_features('typesafe','off')
        evidence=Path(self.tmp.name)/'evidence.txt'; evidence.write_text('bound evidence')
        receipt=Path(self.tmp.name)/'approval.json'
        gates={k:{'status':'pass','path':'evidence.txt','sha256':self.module.sha(evidence)} for k in self.module.BASE_GATES}
        gates.update(capacity={'status':'not_applicable','path':'evidence.txt','sha256':self.module.sha(evidence)},
                     typesafePrivacy={'status':'pass','path':'evidence.txt','sha256':self.module.sha(evidence)},
                     typesafeQuota={'status':'pass','path':'evidence.txt','sha256':self.module.sha(evidence)},
                     adsConsent={'status':'not_applicable','path':'evidence.txt','sha256':self.module.sha(evidence)})
        payload={'ownerAuthorized':True,'ownerDecisionRef':'unit-test-only','operation':'activate',
                 'releaseSha256':self.module.sha(self.bundle/'release.json'),'previousReleaseSha256':None,'evidence':gates}
        self.module.write_json(receipt,payload)
        self.module.approval(self.bundle,receipt,'activate',None)
        payload['evidence']['capacity']['status']='pass'
        self.module.write_json(receipt,payload)
        with self.assertRaisesRegex(ValueError,'capacity.*not_applicable'):
            self.module.approval(self.bundle,receipt,'activate',None)

    def test_laya_release_requires_local_capacity_evidence(self):
        self.set_features('laya','off')
        evidence=Path(self.tmp.name)/'evidence.txt'; evidence.write_text('bound evidence')
        receipt=Path(self.tmp.name)/'approval.json'
        gates={k:{'status':'pass','path':'evidence.txt','sha256':self.module.sha(evidence)} for k in self.module.BASE_GATES}
        gates.update(capacity={'status':'not_applicable','path':'evidence.txt','sha256':self.module.sha(evidence)},
                     adsConsent={'status':'not_applicable','path':'evidence.txt','sha256':self.module.sha(evidence)})
        payload={'ownerAuthorized':True,'ownerDecisionRef':'unit-test-only','operation':'activate',
                 'releaseSha256':self.module.sha(self.bundle/'release.json'),'previousReleaseSha256':None,'evidence':gates}
        self.module.write_json(receipt,payload)
        with self.assertRaisesRegex(ValueError,'capacity.*pass'):
            self.module.approval(self.bundle,receipt,'activate',None)
        payload['evidence']['capacity']['status']='pass'
        self.module.write_json(receipt,payload)
        self.module.approval(self.bundle,receipt,'activate',None)

class HostSmokeTests(unittest.TestCase):
    def test_retained_path_redirects_are_not_successful_smoke_checks(self):
        from unittest.mock import patch
        module = importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        with tempfile.TemporaryDirectory() as tmp:
            bundle=Path(tmp)
            module.write_json(bundle/'retained-routes.json', {'records':[{'path':'/guides/retained/'}]})
            host=object.__new__(module.Host)
            for rejected in [b'301', b'302', b'204', b'404']:
                with patch.object(module, 'verify', return_value={'features': {'purposeSuggestions':'off'}}), \
                     patch.object(module.subprocess, 'check_output', side_effect=[b'200',b'200',rejected]), patch.object(host, 'run'):
                    with self.assertRaisesRegex(ValueError, 'HTTP 200'):
                        host.smoke(bundle)
            with patch.object(module, 'verify', return_value={'features': {'purposeSuggestions':'off'}}), \
                 patch.object(module.subprocess, 'check_output', side_effect=[b'200',b'200',b'200',b'404']), patch.object(host, 'run'):
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
        release = {'features':{'purposeSuggestions':'typesafe','advertising':'off'}, 'typesafeModel': 'jev-latest',
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
            'features':{'purposeSuggestions':'typesafe','advertising':'off'}, 'typesafeModel': 'jev-latest',
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
                    'features':{'purposeSuggestions':'laya','advertising':'off'},
                    'image': 'example/laya@sha256:' + 'b' * 64,
                },
                'old-typesafe': {
                    'purposeProvider': 'typesafe', 'typesafeModel': 'jev-latest',
                    'features':{'purposeSuggestions':'typesafe','advertising':'off'},
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
