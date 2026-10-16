import sys, math
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib.common import *

clear_scene('org_stegosaurus',8000)
green=make_material('Sage green','#6FAF6A')
cream=make_material('Cream belly','#F5E6BD')
orange=make_material('Apricot plates','#F2A65A')
white=make_material('Warm eye white','#FFF8E9')
dark=make_material('Deep olive features','#30382C')
body=add_part('Body',joint=(0,.65,0))
head=add_part('Head',joint=(0,.70,.66))
eye_l=add_part('Eye_L',joint=(.30,.89,1.02))
eye_r=add_part('Eye_R',joint=(-.30,.89,1.02))
legs={}
for name,x,z in [('Leg_FL',.40,.46),('Leg_FR',-.40,.46),('Leg_BL',.40,-.47),('Leg_BR',-.40,-.47)]:
    legs[name]=add_part(name,joint=(x,.55,z))
tail=add_part('Tail',joint=(0,.68,-.63))
blob('Body',(0,.77,0),(.52,.48,.85),green,body)
blob('Belly',(0,.53,.12),(.43,.24,.67),cream,body,20,10)
for name,x,z in [('Leg_FL',.40,.46),('Leg_FR',-.40,.46),('Leg_BL',.40,-.47),('Leg_BR',-.40,-.47)]:
    capsule('Stubby leg',(x,.20,z),(x,.48,z),.17,green,legs[name],12,3)
    blob('Foot',(x,.16,z+.04),(.21,.16,.24),green,legs[name],12,8)
blob('Big head',(0,.85,.99),(.39,.33,.46),green,head)
blob('Round muzzle',(0,.74,1.28),(.34,.21,.27),green,head,16,10)
blob('Chin',(0,.635,1.20),(.255,.07,.22),cream,head,12,8)
for sign,part in [(1,eye_l),(-1,eye_r)]:
    blob('Eye white',(sign*.305,.88,1.135),(.115,.145,.12),white,part,16,10)
    blob('Pupil',(sign*.354,.875,1.213),(.06,.085,.052),dark,part,12,8)
    blob('Catchlight',(sign*.366,.910,1.252),(.021,.027,.015),white,part,8,6)
    blob('Nostril',(sign*.13,.80,1.511),(.023,.016,.009),dark,head,8,6)
stroke('Smile',[(-.15,.704,1.502),(0,.679,1.544),(.15,.704,1.502)],.012,dark,head)
for row in [-1,1]:
    for j in range(5):
        z=-.62+j*.28+(0.12 if row==1 else 0)
        y=.77+.43*math.sqrt(max(0,1-(z/.9)**2))
        height=[.23,.34,.39,.33,.23][j]
        x=row*.14
        # Broad diamond plates with rounded edges, attached to Body.
        outline=[(y-.06,z-.105),(y+height*.45,z-.14),(y+height,z),(y+height*.45,z+.14),(y-.06,z+.105)]
        verts=[(x+dx,yy,zz) for dx in [-.042,.042] for yy,zz in outline]
        faces=[tuple(reversed(range(5))),tuple(range(5,10))]+[(k,(k+1)%5,(k+1)%5+5,k+5) for k in range(5)]
        plate=mesh('Back plate',verts,faces,orange,body,False)
        bevel=plate.modifiers.new('Rounded plate','BEVEL')
        bevel.width=.035
        bevel.segments=2
points=[(0,.70,-.58),(0,.65,-.91),(0,.55,-1.22),(0,.48,-1.51),(0,.50,-1.73)]
tapered_blade('Curved tail',points,[.25,.22,.16,.10,.016],.17,green,tail)
for x,y,z,dx in [(.09,.53,-1.35,.22),(-.09,.53,-1.35,-.22),(.06,.52,-1.57,.17),(-.06,.52,-1.57,-.17)]:
    tapered_blade('Tail spike',[(x,y,z),(x+dx*.55,y+.13,z-.04),(x+dx,y+.23,z-.09)],[.065,.045,.003],.045,cream,tail)
finish_model(height=1.6)
deliver()
