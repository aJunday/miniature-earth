"""South American wetland grazer: barrel body, blunt muzzle, small high ears, no external tail."""
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib.common import *
from lib.templates import ball
clear_scene('org_capybara',3000)
coat=make_material('Warm ochre','#B49A74');cream=make_material('Muzzle','#D9C6A3');dark=make_material('Hooves','#806B52');ink=make_material('Eyes','#263238')
body=add_part('Body',joint=(0,.44,0));head=add_part('Head',joint=(0,.64,.43))
ball('Barrel body',(0,.45,-.05),(.36,.34,.62),coat,body)
rounded_box('Blunt head',(0,.69,.55),(.53,.40,.56),.13,coat,head)
rounded_box('Square muzzle',(0,.60,.82),(.44,.23,.22),.08,cream,head)
for sign,side in [(-1,'R'),(1,'L')]:
    ball('Small high ear',(sign*.23,.90,.44),(.085,.10,.065),coat,head)
    ball('Inner ear',(sign*.23,.91,.49),(.047,.054,.019),dark,head)
    eye=add_part('Eye_'+side,joint=(sign*.256,.78,.68))
    ball('Eye',(sign*.256,.78,.68),(.031,.045,.043),ink,eye)
    ball('Glint',(sign*.274,.798,.701),(.012,)*3,cream,eye)
    ball('Nostril',(sign*.12,.68,.924),(.024,.02,.015),ink,head)
    for z,label in [(.30,'F'),(-.43,'B')]:
        leg=add_part('Leg_'+label+side,joint=(sign*.25,.37,z))
        capsule('Short leg',(sign*.25,.38,z),(sign*.27,.11,z),.095,coat,leg,10,2)
        ball('Webbed foot',(sign*.27,.08,z+.055),(.115,.075,.15),dark,leg)
stroke('Small smile',[(-.11,.52,.925),(0,.505,.935),(.11,.52,.925)],.009,dark,head)
finish_model(height=.7);bake_palette();deliver()
