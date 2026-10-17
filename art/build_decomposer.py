"""Original stylised saprotrophic fruiting-body guild, not an identified species."""
import sys,json
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib import common as c
c.clear_scene('org_decomposer',1500)
stem=c.make_material('Ivory stem','#EADAC0');cap=c.make_material('Ochre cap','#B78C67')
a=c.add_part('Trunk');b=c.add_part('Foliage')
for x,z,h in [(0,0,.3),(.13,.07,.21),(-.12,.1,.17)]:
 c.capsule('Stem',(x,.02,z),(x,h*.75,z),.025,stem,a,10,4)
 c.blob('Cap',(x,h*.79,z),(.11,h*.21,.105),cap,b,16,8)
tri=c.finish_model(.3);c.bake_palette();c.deliver()
p=c.BASE/'public/models/manifest.json';m=json.loads(p.read_text());m=[v for v in m if v['id']!='decomposer'];m.append(dict(id='decomposer',file='/models/org_decomposer.glb',icon='/icons/org_decomposer.png',heightUnits=.3,triangles=tri,parts=['Root','Trunk','Foliage']));p.write_text(json.dumps(m,indent=2)+'\n')
