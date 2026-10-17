"""Original aetosaur miniature: armored back, shoulder spines, shovel snout."""
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib.common import *
from lib.templates import ball,eyes
clear_scene('org_desmatosuchus',3000)
coat=make_material('Ochre','#B49C72');plate=make_material('Armor','#758C78');cream=make_material('Spines','#E6D8B9');ink=make_material('Nose','#394D45')
body=add_part('Body',joint=(0,.42,0));head=add_part('Head',joint=(0,.45,.62));tail=add_part('Tail',joint=(0,.35,-.65))
ball('Low broad body',(0,.40,0),(.38,.28,.75),coat,body)
ball('Friendly head',(0,.47,.69),(.23,.20,.29),coat,head)
rounded_box('Shovel snout',(0,.40,.97),(.31,.16,.30),.07,coat,head)
eyes(head,(0,.55,.81),.19,.05)
for side in [-1,1]:
 ball('Nostril',(side*.08,.47,1.06),(.018,)*3,ink,head)
 for z in [-.55,-.35,-.15,.05,.25,.45]:rounded_box('Back armor',(side*.17,.64,z),(.28,.105,.18),.04,plate,body)
 capsule('Shoulder spine',(side*.28,.58,.34),(side*.66,.85,.23),.065,cream,body,8,2)
 capsule('Side spine',(side*.30,.53,-.12),(side*.48,.67,-.22),.04,cream,body,8,2)
 for z,label in [(.42,'F'),(-.42,'B')]:
  leg=add_part('Leg_'+label+('L' if side==1 else 'R'),joint=(side*.30,.35,z))
  capsule('Stout leg',(side*.30,.35,z),(side*.45,.11,z+.04),.095,coat,leg,8,2)
  ball('Foot',(side*.45,.08,z+.13),(.12,.08,.17),plate,leg)
for j in range(4):ball('Tapering tail',(0,.32-j*.045,-.68-j*.19),(.18-j*.035,.13-j*.02,.19),coat,tail)
finish_model(height=.9);bake_palette();deliver()
