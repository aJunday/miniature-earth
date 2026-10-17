"""Check distant asset identity, joints, bounds, colour and index validity against full models."""
import contextlib,io,json,subprocess,os
from pathlib import Path
with contextlib.redirect_stdout(io.StringIO()):
 from validate import glb,accessor,BASE
report={}
for path in sorted((BASE/'public/models/lod').glob('org_*.glb')):
 full,_=glb(path.parent.parent/path.name);doc,blob=glb(path)
 names=lambda d:sorted(n['name'] for n in d['nodes'])
 assert names(full)==names(doc),path.name
 for node in doc['nodes']:
  original=next(n for n in full['nodes'] if n['name']==node['name'])
  for field in ['translation','rotation','scale','matrix']:assert node.get(field)==original.get(field),(path.name,node['name'],field)
 total=0
 for m in doc['meshes']:
  assert len(m['primitives'])==1
  for p in m['primitives']:
   assert 'COLOR_0' in p['attributes'];pos=accessor(doc,blob,p['attributes']['POSITION']);ix=accessor(doc,blob,p['indices']);assert all(0<=i[0]<len(pos) for i in ix);total+=len(ix)//3
 assert total<sum(full['accessors'][p['indices']]['count']//3 for m in full['meshes'] for p in m['primitives'])
 report[path.stem]={'triangles':total,'parts':names(doc),'pass':True}
 print('PASS LOD',path.stem,total,flush=True)
expected={'org_'+s['id'] for s in json.loads((BASE/'src/sim/data/species.json').read_text())}
assert set(report)==expected, {'missing':sorted(expected-set(report)),'unexpected':sorted(set(report)-expected)}
(BASE/'art/reports/lod-validation.json').write_text(json.dumps(report,indent=2)+'\n')
