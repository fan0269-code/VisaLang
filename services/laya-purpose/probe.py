#!/usr/bin/env python3
"""Local-only real-model evaluation. Expected labels must exist before this runs."""
import argparse
import hashlib
import json
import time
import urllib.request
from pathlib import Path


def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--port',type=int,default=8012)
    p.add_argument('--cases',type=Path,required=True)
    p.add_argument('--out',type=Path,required=True)
    a=p.parse_args()
    cases=json.loads(a.cases.read_text()); rows=[]
    for case in cases:
        start=time.monotonic()
        request=urllib.request.Request(f'http://127.0.0.1:{a.port}/api/purpose-suggestion/',
            data=json.dumps({'text':case['text']}).encode(),headers={'Content-Type':'application/json'})
        with urllib.request.urlopen(request,timeout=12) as r:actual=json.load(r)
        assert actual['requiresConfirmation'] is True
        passed=actual['purpose']==case['expectedPurpose']
        rows.append({**case,'actual':actual,'seconds':round(time.monotonic()-start,3),'correct':passed,
                     'failureReason':None if passed else 'Model label differs from frozen expectation; no confidence-based override.'})
    with urllib.request.urlopen(f'http://127.0.0.1:{a.port}/internal/metrics') as r:metrics=json.load(r)
    result={'casesSha256':hashlib.sha256(a.cases.read_bytes()).hexdigest(),'environment':'local macOS CPU; not production capacity',
            'correct':sum(r['correct'] for r in rows),'total':len(rows),'metrics':metrics,'rows':rows}
    a.out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({k:v for k,v in result.items() if k!='rows'},indent=2))


if __name__=='__main__':main()
