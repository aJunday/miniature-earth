"""Original broad trilobite proxy: cephalon, axial/pleural lobes, thorax and pygidium.
Not a species reconstruction; no fish fins or vertebrate tail.
"""
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib.common import *
from lib.templates import ball
clear_scene('org_trilobite',3000)
shell=make_material('Shell','#5C9B9B');ridge=make_material('Axial lobe','#98C7B4');dark=make_material('Joint','#396A70');eye=make_material('Eyes','#243E40');glint=make_material('Eye shine','#F1EBD9')
body=add_part('Body',joint=(0,.15,0));head=add_part('Head',joint=(0,.16,.45));tail=add_part('Tail',joint=(0,.10,-.60))
ball('Cephalic shield',(0,.18,.51),(.43,.14,.31),shell,head)
ball('Glabella',(0,.28,.52),(.13,.10,.22),ridge,head)
for side,label in [(-1,'R'),(1,'L')]:
 part=add_part('Eye_'+label,joint=(side*.24,.29,.57))
 ball('Dorsal compound eye',(side*.24,.30,.57),(.062,.065,.075),eye,part)
 ball('Catchlight',(side*.24-.015,.345,.60),(.019,)*3,glint,part)
 capsule('Antenna',(side*.17,.11,.74),(side*.27,.10,1.0),.018,dark,head,6,2)
for i in range(8):
 z=.28-i*.115;width=.38-i*.017
 ball('Axial segment',(0,.24,z),(.115,.095,.068),ridge,body)
 for side in [-1,1]:
  ball('Pleural segment',(side*width*.57,.14,z),(.24-i*.011,.07,.065),shell,body)
  capsule('Small walking appendage',(side*.2,.065,z),(side*(width+.045),.025,z-.04),.018,dark,body,6,2)
ball('Pygidium',(0,.10,-.69),(.23,.08,.18),shell,tail)
finish_model(height=.42);bake_palette();deliver()
