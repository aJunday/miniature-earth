"""Promote skinned meshes beneath identity Rig nodes to scene roots per glTF guidance."""
import json,struct
from pathlib import Path
def normalize(path):
 raw=path.read_bytes();size=struct.unpack_from('<I',raw,12)[0];g=json.loads(raw[20:20+size]);changed=False
 for scene in g['scenes']:
  for parent in list(scene['nodes']):
   node=g['nodes'][parent]
   if node.get('name')!='Rig':continue
   assert not any(k in node for k in ['matrix','translation','rotation','scale']), 'Nonidentity rig requires transform baking'
   skins=[i for i in node.get('children',[]) if 'skin' in g['nodes'][i]]
   if skins:scene['nodes']+=skins;node['children']=[i for i in node['children'] if i not in skins];changed=True
 if changed:
  text=json.dumps(g,separators=(',',':')).encode();text+=b' '*((-len(text))%4);rest=raw[20+size:];path.write_bytes(struct.pack('<III',0x46546c67,2,20+len(text)+len(rest))+struct.pack('<II',len(text),0x4e4f534a)+text+rest)
if __name__=='__main__':
 for path in (Path(__file__).resolve().parents[1]/'public/models/rigged').glob('*.glb'):normalize(path)
