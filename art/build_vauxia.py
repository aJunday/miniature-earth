"""Original branching tubular sponge; inferred colour, source-reviewed form."""
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib.common import *
from lib.templates import ball
clear_scene('org_vauxia',1500)
coat=make_material('Sponge','#C5AD7C');rim=make_material('Rim','#E7D4A4');inner=make_material('Osculum','#786A51');body=add_part('Body')
ball('Holdfast',(0,.045,0),(.15,.045,.12),coat,body)
capsule('Stalk',(0,.03,0),(0,.28,0),.065,coat,body,8,2)
for x,y,z in [(-.18,.50,0),(.16,.62,.04),(0,.72,-.08)]:
 capsule('Branch',(0,.23,0),(x,y-.12,z),.065,coat,body,8,2)
 cylinder('Upright tube',(x,y-.06,z),.079,.20,coat,body,vertices=10)
 ball('Opening rim',(x,y+.04,z),(.082,.018,.082),rim,body)
 ball('Dark opening',(x,y+.052,z),(.058,.009,.058),inner,body)
finish_model(height=.45);bake_palette();deliver()
