import os,json,hashlib,subprocess,shutil,stat,datetime
from pathlib import Path
root=Path.cwd(); batch='2026-09-24-01'; evidence=root/'docs/module-handoffs'/batch; dest=Path('/private/tmp/visalang-W00-'+batch)
assert not evidence.exists() and not dest.exists(), 'unique batch required'
def git(*a): return subprocess.check_output(['git',*a],cwd=root)
def jwrite(p,v): p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def zlist(b): return [x for x in b.decode().split('\0') if x]
def sha(b): return hashlib.sha256(b).hexdigest()
listed=sorted(set(zlist(git('ls-files','--cached','--others','--exclude-standard','-z'))))
ignored=zlist(git('ls-files','--others','--ignored','--exclude-standard','--directory','-z'))
supp=[p for p in ignored if p.startswith('experiments/') and '/evidence/' in p and p.endswith('.log')]
supp+=['.agents/skills/typesafe-ai/SKILL.md','.agents/skills/typesafe-ai/LICENSE','skills-lock.json']
def exclusion(p):
 parts=Path(p).parts
 if any(x in {'.git','node_modules','dist','.astro','.venv','venv','__pycache__','.cache','.runtime','.DS_Store'} for x in parts): return 'Git metadata / dependency / generated output / virtual environment / cache excluded; never shared writable'
 if Path(p).name.startswith('.env') or Path(p).suffix in {'.pem','.key','.p12','.pfx'} or Path(p).name.lower() in {'credentials','credentials.json','secrets.json'}: return 'credential material: path-only inventory; bytes not read'
 if p.startswith('.external/'): return 'optional nested external repository, not required by P01/P02/P03; not traversed'
 return None
omitted=[]; deleted=[]; entries=[]; snapshot=dest/'baseline'; snapshot.mkdir(parents=True)
for p in sorted(set(listed+supp)):
 reason=exclusion(p)
 if reason: omitted.append({'path':p,'reason':reason});continue
 src=root/p
 if not os.path.lexists(src):deleted.append(p);continue
 s=src.lstat(); target=snapshot/p
 if stat.S_ISLNK(s.st_mode):
  link=os.readlink(src); resolved=(src.parent/link).resolve()
  if os.path.isabs(link) or not resolved.is_relative_to(root): omitted.append({'path':p,'reason':'unsafe or external symlink; target not read'});continue
  b=os.fsencode(link); kind='symlink';target.parent.mkdir(parents=True,exist_ok=True);target.symlink_to(link)
 elif stat.S_ISREG(s.st_mode):
  b=src.read_bytes();kind='file';target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(b);os.chmod(target,stat.S_IMODE(s.st_mode))
 else:omitted.append({'path':p,'reason':'non-file inventory entry; no traversal'});continue
 entries.append({'path':p,'sha256':sha(b),'bytes':len(b),'kind':kind,'mode':oct(stat.S_IMODE(s.st_mode)),'inventory':'supplemental-ignored-input' if p in supp else 'git-cached-or-untracked'})
for p in ignored:
 if p in supp:reason='included as necessary ignored historical evidence / project skill metadata'
 elif p=='.agents/':reason='project TypeSafe skill/license included explicitly; no unrelated skill metadata required'
 else:reason=exclusion(p) or 'ignored local metadata/cache; not a required implementation input'
 omitted.append({'path':p,'reason':reason})
h=hashlib.sha256()
for e in entries:
 p=e['path']; f=snapshot/p;b=os.fsencode(os.readlink(f)) if e['kind']=='symlink' else f.read_bytes();h.update(p.encode()+b'\0'+b+b'\0')
baselineId=h.hexdigest(); evidence.mkdir(parents=True)
branch=git('branch','--show-current').decode().strip();head=git('rev-parse','HEAD').decode().strip()
upstream=git('rev-parse','--abbrev-ref','--symbolic-full-name','@{upstream}').decode().strip();ab=git('rev-list','--left-right','--count','HEAD...@{upstream}').decode().split()
status=git('status','--porcelain=v1','-uall');(evidence/'baseline-status.txt').write_bytes(status)
(evidence/'baseline-index.txt').write_bytes(git('ls-files','--stage'))
allowedTracked=[e['path'] for e in entries if e['inventory']=='git-cached-or-untracked']
(evidence/'baseline-dirty.patch').write_bytes(git('diff','--binary','--',*allowedTracked))
(evidence/'baseline-staged.patch').write_bytes(git('diff','--cached','--binary','--',*allowedTracked))
manifest={'schemaVersion':1,'batchId':batch,'capturedAt':datetime.datetime.now().astimezone().isoformat(timespec='seconds'),'branch':branch,'head':head,'upstream':upstream,'ahead':int(ab[0]),'behind':int(ab[1]),'upstreamEvidence':'local refs only; no fetch','sourceRoot':str(root),'snapshotPath':str(snapshot),'baselineId':baselineId,'algorithm':'SHA-256 over UTF-8 byte-sorted paths + NUL + file bytes (relative symlink target bytes) + NUL','files':entries,'deletedPaths':deleted,'exclusionsPath':str(evidence/'exclusions.json'),'missingRequiredInputs':[],'stagedPaths':zlist(git('diff','--cached','--name-only','-z')),'dirtyPaths':zlist(git('diff','--name-only','-z')),'untrackedPaths':zlist(git('ls-files','--others','--exclude-standard','-z'))}
jwrite(evidence/'baseline-manifest.json',manifest);jwrite(evidence/'exclusions.json',{'schemaVersion':1,'items':[{'path':'.git/','reason':'Git metadata excluded; no synthetic repository in candidates'},*omitted],'credentialBytesRead':False,'supplementalIncludedPaths':supp})
verifications=[]
for module in ['baseline','W03','W04','W08']:
 w=dest/module
 if module!='baseline':shutil.copytree(snapshot,w,symlinks=True)
 result=[];d=hashlib.sha256()
 for e in entries:
  p=e['path'];f=w/p;b=os.fsencode(os.readlink(f)) if e['kind']=='symlink' else f.read_bytes();digest=sha(b);assert digest==e['sha256'];d.update(p.encode()+b'\0'+b+b'\0');result.append({'path':p,'expectedSha256':e['sha256'],'actualSha256':digest,'bytes':len(b),'matched':True})
 assert d.hexdigest()==baselineId
 assert not (w/'.git').exists()
 jwrite(evidence/f'{module}-byte-verification.json',{'baselineId':baselineId,'workspacePath':str(w),'matchedFiles':len(entries),'mismatches':[],'aggregateSha256':d.hexdigest(),'files':result})
 verifications.append({'workspace':module,'workspacePath':str(w),'matchedFiles':len(entries),'bytes':sum(e['bytes'] for e in entries),'aggregateSha256':d.hexdigest(),'verificationPath':f'docs/module-handoffs/{batch}/{module}-byte-verification.json'})
# Check source still equals captured input; no source mutation was authorized during capture.
for e in entries:
 src=root/e['path'];b=os.fsencode(os.readlink(src)) if e['kind']=='symlink' else src.read_bytes();assert sha(b)==e['sha256'],e['path']
jwrite(evidence/'snapshot-verification.json',{'schemaVersion':1,'baselineId':baselineId,'sourceVerifiedUnchangedAtCapture':True,'copies':verifications,'deletedPaths':deleted,'excludedCredentialsRead':False,'hardLinksOrSharedWritableDependencies':False})
print(json.dumps({'batchId':batch,'baselineId':baselineId,'files':len(entries),'bytes':sum(e['bytes'] for e in entries),'deleted':len(deleted),'staged':len(manifest['stagedPaths']),'dirty':len(manifest['dirtyPaths']),'untracked':len(manifest['untrackedPaths']),'symlinks':sum(e['kind']=='symlink' for e in entries)},indent=2))
