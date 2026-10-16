"""Original historical miniatures; rounded silhouettes, joint origins and vertex paint."""
import sys,json,math
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib import common as c
HEIGHTS={'anomalocaris':.65,'ammonite':.7,'dimetrodon':1.3,'triceratops':1.6,'pteranodon':.8,'groundsloth':1.8,'lycophyte':2.8,'horsetail':1.1}
def build(id):
    plant=id in ('lycophyte','horsetail');c.clear_scene('org_'+id,1500 if plant else 3000)
    paint=c.make_material('Sage clay','#79A47C');accent=c.make_material('Apricot','#E3A46E');cream=c.make_material('Warm ivory','#F7E5C3');ink=c.make_material('Ink','#283B43');brown=c.make_material('Earth','#A78465')
    body=c.add_part('Trunk' if plant else 'Body');head=c.add_part('Foliage' if plant else 'Head',joint=(0,.55,.55))
    if plant:
        h=2.5 if id=='lycophyte' else 1
        c.capsule('Jointed stem',(0,.08,0),(0,h,0),.14 if id=='lycophyte' else .065,brown if id=='lycophyte' else paint,body,8,3)
        for j in range(4):
            y=h*(.55+j*.14)
            for k in range(7):
                a=k*math.tau/7+j*.4;r=.7 if id=='lycophyte' else .32
                c.tapered_blade('Whorled leaf',[(0,y,0),(math.cos(a)*r*.6,y+.15,math.sin(a)*r*.6),(math.cos(a)*r,y+.05,math.sin(a)*r)],[.04,.09,.003],.025,paint,head)
    elif id=='anomalocaris':
        for j in range(8):
            z=.45-j*.18;r=.23*(1-j*.07)
            c.blob('Segment',(0,.3,z),(r,.18,.15),accent,body,12,8)
            for sign in [-1,1]:c.tapered_blade('Swimming lobe',[(sign*r*.6,.28,z),(sign*(r+.26),.25,z-.12),(sign*(r+.32),.22,z-.24)],[.03,.12,.004],.035,accent,body)
        c.blob('Head',(0,.32,.62),(.28,.2,.24),accent,head,16,10)
        for sign in [-1,1]:
            c.stroke('Feeding appendage',[(sign*.13,.25,.76),(sign*.25,.08,.9),(sign*.12,.07,1.05)],.05,cream,head)
            c.capsule('Eye stalk',(sign*.17,.45,.64),(sign*.35,.53,.7),.035,accent,head,8,3)
    elif id=='ammonite':
        c.blob('Coiled shell',(0,.4,-.05),(.16,.39,.39),accent,body,20,14)
        for sign in [-1,1]:
            pts=[]
            for j in range(38):
                a=j/37*math.tau*2;r=.035+.30*j/37;pts.append((sign*.165,.4+math.sin(a)*r,-.05+math.cos(a)*r))
            c.stroke('Shell spiral',pts,.025,cream,body)
        c.blob('Soft head',(0,.2,.34),(.15,.13,.18),paint,head,16,10)
        for j in range(6):c.stroke('Arm',[(0,.18,.44),((j-2.5)*.065,.12,.62),((j-2.5)*.08,.17,.76)],.024,paint,head)
    elif id=='pteranodon':
        c.blob('Body',(0,.35,0),(.17,.2,.4),paint,body,16,10)
        c.blob('Head',(0,.55,.38),(.18,.18,.22),paint,head,16,10)
        c.tapered_blade('Toothless beak',[(0,.53,.5),(0,.51,.85),(0,.50,1.03)],[.12,.06,.003],.06,cream,head)
        c.tapered_blade('Backward crest',[(0,.67,.3),(0,.84,.02),(0,.82,-.3)],[.1,.07,.003],.045,accent,head)
        for sign,name in [(-1,'L'),(1,'R')]:
            wing=c.add_part('Wing_'+name,joint=(sign*.13,.4,.05))
            c.mesh('Wing membrane',[(sign*.13,.4,.22),(sign*.65,.45,.3),(sign*1.4,.42,-.2),(sign*.45,.29,-.35),(sign*.13,.3,-.25)],[(0,1,3),(1,2,3),(0,3,4)],accent,wing)
            c.stroke('Wing spar',[(sign*.13,.4,.22),(sign*.65,.45,.3),(sign*1.4,.42,-.2)],.045,paint,wing)
    else:
        sloth=id=='groundsloth';tri=id=='triceratops';mat=brown if sloth else paint
        c.blob('Plump body',(0,.65,0),(.43,.32 if id=='dimetrodon' else .45,.73),mat,body,20,12)
        c.blob('Belly',(0,.48,.19),(.37,.3,.5),cream,body,16,10)
        c.blob('Round head',(0,.85,.65),(.37,.32,.4),mat,head,20,12)
        c.blob('Muzzle',(0,.73,.96),(.28,.18,.2),cream,head,16,10)
        for sign,name in [(-1,'L'),(1,'R')]:
            for z,label in [(.4,'F'),(-.4,'B')]:
                leg=c.add_part('Leg_'+label+name,joint=(sign*.3,.55,z));c.capsule('Stout limb',(sign*.3,.55,z),(sign*.4,.15,z+.06),.15,mat,leg,10,4)
                c.blob('Foot',(sign*.4,.12,z+.13),(.17,.12,.22),mat,leg,12,8)
                if sloth:
                    for k in range(3):c.capsule('Curved claw',(sign*.4+(k-1)*.065,.10,z+.23),(sign*.4+(k-1)*.065,.07,z+.49),.033,cream,leg,6,2)
        tail=c.add_part('Tail',joint=(0,.55,-.55));c.tapered_blade('Tapered tail',[(0,.55,-.55),(.1,.32,-1.04),(.22,.18,-1.45)],[.21,.13,.008],.11,mat,tail)
        if tri:
            c.blob('Rounded frill',(0,1,.47),(.51,.43,.09),accent,head,20,12)
            for sign in [-1,1]:c.tapered_blade('Brow horn',[(sign*.22,1.02,.78),(sign*.22,1.29,1.05),(sign*.19,1.35,1.36)],[.09,.05,.003],.06,cream,head)
            c.tapered_blade('Nose horn',[(0,.85,1.04),(0,1.02,1.09),(0,1.08,1.13)],[.07,.04,.003],.05,cream,head)
        elif sloth:
            c.blob('Shoulder hump',(0,.96,.15),(.42,.34,.42),brown,body,16,10)
            c.blob('Dark nose',(0,.78,1.13),(.12,.075,.04),ink,head,12,8)
            for sign in [-1,1]:c.blob('Small ear',(sign*.32,1.05,.51),(.1,.12,.06),mat,head,12,8)
        else:
            c.blob('Tall sail',(0,1.05,-.13),(.065,.79,.73),accent,body,20,14)
            for j in range(6):
                z=-.65+j*.2;y=1.08+.45*math.sin((j+1)/7*math.pi)
                c.stroke('Sail rib',[(.067,.8,z),(.068,y,z)],.016,cream,body)
        c.stroke('Small smile',[(-.15,.65,1.09),(0,.62,1.13),(.15,.65,1.09)],.015,ink,head)
    if not plant:
        if id=='anomalocaris':x,y,z=.35,.53,.73
        elif id=='ammonite':x,y,z=.13,.25,.43
        elif id=='pteranodon':x,y,z=.15,.59,.5
        else:x,y,z=.27,.90,.9
        for sign,name in [(-1,'L'),(1,'R')]:
            eye=c.add_part('Eye_'+name,joint=(sign*x,y,z));c.blob('Eye',(sign*x,y,z),(.06,.075,.045),ink,eye,12,8);c.blob('Highlight',(sign*x-.015,y+.025,z+.035),(.02,.023,.014),cream,eye,8,6)
    triangles=c.finish_model(HEIGHTS[id]);c.bake_palette();c.deliver()
    p=c.BASE/'public/models/manifest.json';data=json.loads(p.read_text());data=[v for v in data if v['id']!=id];data.append(dict(id=id,file=f'/models/org_{id}.glb',icon=f'/icons/org_{id}.png',heightUnits=HEIGHTS[id],triangles=triangles,parts=['Root']+[p.name for p in c.PARTS]));p.write_text(json.dumps(data,indent=2)+'\n')
if __name__=='__main__':
    for id in HEIGHTS:build(id)
