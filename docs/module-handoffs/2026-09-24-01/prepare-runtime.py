import os,sys,json,hashlib,shutil,stat,subprocess
from pathlib import Path
root=Path.cwd();batch='2026-09-24-01';base=Path('/private/tmp/visalang-W00-'+batch);ev=root/'docs/module-handoffs'/batch
source=root/'node_modules'; entries=[];excluded=[]
for directory,dirs,files in os.walk(source,followlinks=False):
 dirs.sort();files.sort()
 for name in list(dirs):
  p=Path(directory)/name;r=p.relative_to(source).as_posix()
  if name in {'.astro','.cache','__pycache__'}:excluded.append(r);dirs.remove(name)
  elif p.is_symlink():files.append(name);dirs.remove(name)
 for name in sorted(files):
  p=Path(directory)/name;r=p.relative_to(source).as_posix()
  if name=='.DS_Store':excluded.append(r);continue
  if p.is_symlink():
   link=os.readlink(p);assert not os.path.isabs(link) and (p.parent/link).resolve().is_relative_to(source),r
   b=os.fsencode(link);kind='symlink'
  else:b=p.read_bytes();kind='file'
  entries.append({'path':r,'kind':kind,'sha256':hashlib.sha256(b).hexdigest(),'bytes':len(b)})
rows=[]
for module in ['W03','W04','W08']:
 dst=base/module/'node_modules';dst.mkdir()
 for e in entries:
  a=source/e['path'];b=dst/e['path'];b.parent.mkdir(parents=True,exist_ok=True)
  if e['kind']=='symlink':b.symlink_to(os.readlink(a));data=os.fsencode(os.readlink(b))
  else:shutil.copy2(a,b);data=b.read_bytes();assert (a.stat().st_dev,a.stat().st_ino)!=(b.stat().st_dev,b.stat().st_ino)
  assert hashlib.sha256(data).hexdigest()==e['sha256']
 rows.append({'moduleId':module,'nodeModulesPath':str(dst),'entriesVerified':len(entries),'sharedWritableDependencies':False,'hardLinksToSource':False,'buildPaths':[str(base/module/'dist'),str(base/module/'.astro')],'runtimeEnvironment':{'npm_config_cache':str(base/module/'.runtime/npm-cache'),'XDG_CACHE_HOME':str(base/module/'.runtime/cache'),'PYTHONDONTWRITEBYTECODE':'1'},'preview':'not_started; choose and check loopback port only after dispatch'})
subprocess.check_call([sys.executable,'-m','venv','--without-pip',str(base/'W08/.venv')])
probe=subprocess.check_output([str(base/'W08/.venv/bin/python'),'-c','import sys;print(sys.version);print(sys.prefix)']).decode().strip()
record={'schemaVersion':1,'nodeExecutable':shutil.which('node'),'nodeVersion':subprocess.check_output(['node','--version']).decode().strip(),'npmVersion':subprocess.check_output(['npm','--version']).decode().strip(),'packageLockSha256':hashlib.sha256((root/'package-lock.json').read_bytes()).hexdigest(),'dependencyCopy':'trusted currently installed local bytes; no install or download; independent copies; cache excluded','nodeModulesEntries':entries,'excludedDependencyPaths':excluded,'modules':rows,'python':{'moduleId':'W08','interpreter':str(base/'W08/.venv/bin/python'),'probe':probe,'provisioning':'private standard-library venv only; API/service/model not started; extra Python packages not installed'},'gitDependentPrepare':'not_run; requires real main-tree Git identity after authorized module integration; never fabricate .git','apiCalls':0,'envLocalRead':False}
(ev/'environment-preflight.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'copies':3,'dependencyEntriesEach':len(entries),'python':probe,'apiCalls':0},indent=2))
