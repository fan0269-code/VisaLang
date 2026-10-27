"""Separate verification session: recovery, repeatability and offline failure paths."""
import json
import os
from pathlib import Path
import subprocess
import sys
import time
ROOT = Path(__file__).parent.resolve()
ENV = dict(os.environ, LAYA_PYTHON=sys.executable, LAYA_DEVICE='cpu', PYTHONDONTWRITEBYTECODE='1')
started = time.perf_counter()
valid = {'text': '我这次要申请大学本科。'}
requests = [valid, {'text': ''}, {'text': 17}, {'text': 'x'*301},
            {'text': '\U0010fffd'*300}, valid]
proc = subprocess.run([sys.executable, '-u', str(ROOT/'worker.py')],
    input='\n'.join([json.dumps(x) for x in requests]+['{invalid json',json.dumps(valid)])+'\n',
    text=True,capture_output=True,env=ENV,timeout=180)
assert proc.returncode == 0,proc.stderr
out = [json.loads(x) for x in proc.stdout.splitlines()]
assert len(out)==9,len(out)
assert out[0]['ready']
assert len({x['pid'] for x in out})==1
assert all(x['model_load_count']==1 for x in out)
assert all('error' in out[i] for i in [2,3,4,5,7]),out
assert 'token-truncated' in out[5]['error'],out[5]
for i in [6,8]:
    for variant in 'ABCD':
        assert out[1]['results'][variant]['actual']==out[i]['results'][variant]['actual']
        assert out[1]['results'][variant]['probabilities']==out[i]['results'][variant]['probabilities']
failures=[]
for name,changes in [('unset_python',{'LAYA_PYTHON':None}),
                     ('missing_python',{'LAYA_PYTHON':'/nonexistent-laya-v2/python'}),
                     ('missing_cache',{'LAYA_MODEL':'visalang-local-test/no-such-cached-model'}),
                     ('missing_laya',{'LAYA_PYTHON':'/usr/bin/python3'})]:
    env=ENV.copy()
    for k,v in changes.items():
        if v is None:env.pop(k,None)
        else:env[k]=v
    r=subprocess.run(['node',str(ROOT/'demo.mjs'),'--text','我想读本科。'],capture_output=True,text=True,env=env,timeout=30)
    assert r.returncode!=0,(name,r.stdout,r.stderr)
    failures.append({'case':name,'exit_code':r.returncode,'stderr':r.stderr,'stdout':r.stdout})
(ROOT/'evidence/runtime-checks.json').write_text(json.dumps({'status':'PASS','elapsed_s':time.perf_counter()-started,'session':out,'stderr':proc.stderr,'failure_cases':failures},ensure_ascii=False,indent=2)+'\n')
print('PASS: same pid/load, repeated result, blank/type/length/token/malformed JSON recovery, missing env/python/cache/library errors')
