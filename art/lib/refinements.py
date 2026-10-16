"""Species-specific silhouette and paint refinements for the remaining catalogue.
Authored in glTF coordinates before fitting; joint names and budgets stay unchanged.
"""
from .common import *
def ball(name,p,s,m,part):return blob(name,p,s,m,part,10,6)
def remove_named(*names):
    for o in list(bpy.context.scene.objects):
        if any(o.name.startswith('geo_'+n) for n in names):bpy.data.objects.remove(o,do_unlink=True)
def reshape(prefix,scale):
    for o in bpy.context.scene.objects:
        if o.name.startswith('geo_'+prefix):
            # Local primitive axes are Blender X,Z,Y: preserve the existing centre/joint.
            o.scale.x*=scale[0];o.scale.z*=scale[1];o.scale.y*=scale[2]
def refine_animal(id,family,coat,cream,mark,body,head,tail):
    if family in ['bigcat','canid','bear','primate','pachyderm','smallmammal']:
        if id not in ['pangolin','brachiosaurus','allosaurus','seaotter']:
            ball('Velvet nose',(0,1.01 if id in ['giantpanda','koala','mountaingorilla','sumatranorangutan'] else .85,.70 if id in ['giantpanda','koala','mountaingorilla','sumatranorangutan'] else .91),(.065,.05,.04),mark,head)
    if family=='bigcat':
        reshape('Plump body',(1,.95,1.08));reshape('Thick foot',(1.15,1,1.1))
        for sign in [-1,1]:
            ball('Cheek ruff',(sign*.28,.73,.67),(.13,.14,.12),cream,head)
            for z in [.31,.42,.53]:ball('Whisker freckle',(sign*.20,.74,z+.35),(.025,.02,.015),mark,head)
        if id=='tiger':
            for sign in [-1,1]:
                for i in range(3):ball('Forehead stripe',(sign*(.08+i*.065),1.08-i*.025,.71),(.028,.075,.025),mark,head)
        if id in ['snowleopard','amurleopard']:
            for sign in [-1,1]:
                for i in range(3):ball('Forehead rosette',(sign*(.08+i*.075),1.08-i*.04,.74),(.033,.03,.014),mark,head)
        if id=='cheetah':reshape('Plump body',(.85,.9,1.15));reshape('Thick foot',(.8,1.05,1))
    if id in ['wilddog','thylacine']:
        reshape('Round ear',(1.25,1.25,1));reshape('Plump body',(1,.9,1.1))
        ball('White chest',(0,.55,.45),(.18,.22,.12),cream,body)
        if id=='wilddog':
            for sign in [-1,1]:ball('Ear inset',(sign*.26,1.13,.52),(.12,.13,.035),mark,head)
            ball('Pale tail flag',(.15,.9,-1.25),(.08,.11,.10),cream,tail)
    if id in ['redpanda','giantpanda','polarbear','koala']:
        for sign in [-1,1]:
            ball('Ear inset',(sign*.26,1.27 if id in ['giantpanda','koala'] else 1.11,.37 if id in ['giantpanda','koala'] else .53),(.09,.10,.03),cream if id!='giantpanda' else mark,head)
        if id=='redpanda':
            for sign in [-1,1]:ball('Rust cheek',(sign*.27,.80,.71),(.13,.14,.075),cream,head)
        if id=='polarbear':reshape('Muzzle',(.8,.85,1.5));reshape('Plump body',(1.1,.95,1.1))
        if id=='koala':reshape('Round ear',(1.25,1.1,1));reshape('Koala nose',(1,1.15,1))
        if id=='giantpanda':reshape('Thick foot',(1.15,1.1,1.1))
    if family=='primate':
        for sign,side in [(1,'L'),(-1,'R')]:
            part=next(p for p in bpy.data.objects if p.name=='Arm_'+side)
            ball('Knuckles',(sign*.56,.17,.44),(.16,.12,.13),mark,part)
        if id=='sumatranorangutan':
            for sign in [-1,1]:ball('Cheek flange',(sign*.23,1.03,.59),(.15,.22,.065),mark,head)
        if id=='mountaingorilla':
            reshape('Plump body',(1.25,1.15,1));ball('Brow ridge',(0,1.17,.60),(.29,.065,.075),mark,head)
        if id=='ringtailedlemur':
            remove_named('Swept tail','Tail ring');points=[(0,.58,-.4),(.13,.85,-.67),(.18,1.22,-.8),(.12,1.55,-.72)]
            tapered_blade('Upright tail',points,[.095,.095,.08,.04],.08,cream,tail)
            for j in range(6):ball('Tail band',(.15,.80+j*.12,-.65-j*.018),(.094,.035,.09),mark,tail)
    if id in ['asianelephant','forestelephant']:
        reshape('Elephant ear',(1.15 if id=='forestelephant' else 1,.95,1));reshape('Plump body',(1.15,1.15,1.1))
        for p in [p for p in bpy.data.objects if p.name.startswith('Leg_')]:
            q=p.location;x=q.x;z=-q.y
            for i in [-1,0,1]:ball('Ivory toenail',(x+i*.06,.07,z+.15),(.025,.04,.025),cream,p)
    if id=='sumatranrhino':
        remove_named('Elephant ear');reshape('Muzzle',(1.15,1.1,1.4))
        for sign in [-1,1]:ball('Upright rhino ear',(sign*.25,1.16,.42),(.09,.17,.08),coat,head)
        for z in [-.28,.18]:ball('Shoulder fold',(0,.78,z),(.35,.14,.045),mark,body)
    if id=='brachiosaurus':
        reshape('Plump body',(1.2,1.12,1.12))
        for sign in [-1,1]:
            for i in range(4):ball('Neck dapple',(sign*.17,.9+i*.22,.48),(.03,.07,.06),cream,body)
        ball('Nostril crest',(0,2.20,.63),(.17,.13,.15),coat,head)
    if id=='allosaurus':
        reshape('Toy head',(1.05,.92,1.25));reshape('Muzzle',(1.1,.9,1.3))
        for sign in [-1,1]:
            for i in range(5):ball('Dorsal spot',(sign*.21,.87,-.43+i*.17),(.06,.035,.07),mark,body)
    if id=='axolotl':
        reshape('Plump body',(1,.55,1.12));reshape('Toy head',(1.15,.75,1));remove_named('Swept tail')
        tapered_blade('Ribbon tail',[(0,.35,-.4),(0,.35,-.7),(.10,.38,-1.0),(.18,.45,-1.18)],[.08,.065,.04,.005],.16,coat,tail)
        for sign in [-1,1]:
            for j in range(3):
                for k in range(3):ball('Gill tuft',(sign*(.40+k*.045),.60-j*.06,.37+j*.14),(.025,.05,.025),mark,head)
    if id=='pangolin':
        reshape('Toy head',(.7,.75,1));reshape('Long muzzle',(.65,.75,1.35))
        for i in range(4):ball('Tail scale',(.15,.65+i*.06,-.75-i*.12),(.10,.045,.12),mark,tail)
    if id=='seaotter':
        ball('Nose',(0,.43,.79),(.05,.04,.025),mark,head)
        ball('Held clam',(0,.53,.18),(.10,.045,.08),cream,body)
    if family=='bird':
        # Individually shaped silhouettes, painted feather tips and toes.
        if id=='emperorpenguin':reshape('Plump bird',(.85,1.2,.9));reshape('Folded wing',(.7,1.3,.75))
        if id=='passengerpigeon':reshape('Plump bird',(.8,.9,1.1));reshape('Tail feather',(.8,.8,1.7))
        if id=='dodo':reshape('Plump bird',(1.2,1.12,1.2));reshape('Folded wing',(.7,.7,.7))
        if id=='kakapo':reshape('Plump bird',(1.1,.9,1.1));reshape('Tail feather',(1,1,1.6))
        for sign,side in [(1,'L'),(-1,'R')]:
            part=bpy.data.objects.get('Wing_'+side)
            for i in range(3):ball('Feather scallop',(sign*.47,.38+i*.07,-.15+i*.03),(.055,.13,.12),mark if id in ['baldeagle','condor'] else cream,part)
            leg=bpy.data.objects.get('Leg_F'+side)
            for j in [-1,0,1]:capsule('Toe',(sign*.17+j*.055,.06,.17),(sign*.17+j*.075,.04,.31),.023,mark,leg,6,1)
        if id in ['baldeagle','philippineeagle']:ball('Hooked beak tip',(0,.80,.61),(.075,.12,.075),mark,head)
    if family=='cetacean':
        if id=='whaleshark':
            remove_named('Tail fluke','Dorsal fin');reshape('Round whale head',(1.25,.7,.85))
            # Sharks have a vertical caudal fin, unlike whale flukes.
            tapered_blade('Upper caudal',[(0,.38,-.65),(0,.72,-.93),(0,1.03,-1.12)],[.14,.17,.005],.055,coat,tail)
            tapered_blade('Lower caudal',[(0,.38,-.65),(0,.15,-.94),(0,.04,-1.02)],[.10,.13,.005],.045,coat,tail)
            tapered_blade('Dorsal sail',[(0,.62,-.12),(0,.99,-.23),(0,.75,-.38)],[.10,.005,.06],.065,coat,body)
            for sign in [-1,1]:
                for i in range(4):ball('Gill slit',(sign*.38,.40,.38-i*.065),(.015,.12,.013),mark,body)
        if id=='bluewhale':
            reshape('Whale body',(.95,.9,1.1));reshape('Round whale head',(1.05,.8,1.05))
        if id in ['bluewhale','humpback']:
            for x in [-.16,-.08,0,.08,.16]:capsule('Throat groove',(x,.13,.25),(x,.18,.86),.009,mark,body,6,1)
        if id=='rightwhale':reshape('Round whale head',(1.1,1.05,1.12))
        if id=='stellerseacow':reshape('Whale body',(1.2,1.05,1.1));reshape('Round whale head',(.72,.8,.85))
        if id=='vaquita':reshape('Round whale head',(.88,.85,.8))
    if id=='pintatortoise':
        remove_named('Front flipper')
        for sign,side in [(1,'L'),(-1,'R')]:
            leg=bpy.data.objects.get('Leg_F'+side);ball('Column foreleg',(sign*.37,.18,.28),(.13,.18,.15),cream,leg)
        ball('Saddle shell ridge',(0,.62,.25),(.32,.10,.18),coat,body)
    if id=='dickinsonia':
        # No anatomical eyes are known: retain animated eye nodes as subtle neutral lobes.
        remove_named('Little smile','Eye highlight')
        for p in [p for p in bpy.data.objects if p.name.startswith('geo_Black eye')]:p.data.materials.clear();p.data.materials.append(coat)

def refine_plant(id,green,wood,cream,fol,trunk):
    if id=='elkhorncoral':
        remove_named('Coral trunk','Antler branch')
        for sign in [-1,1]:
            tapered_blade('Broad antler',[(0,.08,0),(sign*.20,.32,0),(sign*.42,.56,.04)],[.14,.15,.10],.065,cream,fol)
            for i in range(3):tapered_blade('Flattened fork',[(sign*.20,.35,i*.08),(sign*(.35+i*.13),.64+i*.06,i*.12),(sign*(.41+i*.14),.80+i*.06,i*.14)],[.08,.07,.025],.04,cream,fol)
    if id=='conifer':
        for i in range(5):
            a=i*math.tau/5;capsule('Visible branch',(0,.9,0),(math.sin(a)*.45,.98,math.cos(a)*.45),.035,wood,trunk,6,1)
        ball('Crown bud',(0,1.94,0),(.15,.22,.15),green,fol)
    if id=='cycad':
        remove_named('Curved leaf')
        for i in range(7):
            a=i*math.tau/7;u,v=math.sin(a),math.cos(a)
            capsule('Frond rachis',(0,.9,0),(u*.65,1.2,v*.65),.018,green,fol,6,1)
            for j in range(1,5):
                t=j/5
                for side in [-1,1]:tapered_blade('Cycad leaflet',[(u*.65*t,.9+.3*t,v*.65*t),(u*.65*t+v*side*.14,1.02+.3*t,v*.65*t-u*side*.14)],[.035,.001],.01,green,fol)
    if id in ['grass','seagrass']:
        for i in range(3):
            a=i*2.4;tapered_blade('Young blade',[(0,0,0),(math.sin(a)*.12,.35,math.cos(a)*.12),(math.sin(a)*.22,.48,math.cos(a)*.22)],[.015,.025,.001],.008,green,fol)
    if id=='wildflower':
        for sign in [-1,1]:tapered_blade('Stem leaf',[(0,.13,0),(sign*.12,.23,0),(sign*.20,.24,0)],[.02,.07,.001],.012,green,fol)
        for i in range(6):a=i*math.tau/6;ball('Pollen bead',(math.sin(a)*.045,.46,math.cos(a)*.045),(.012,)*3,cream,fol)
    if id=='charnia':
        for i in range(5):
            for sign in [-1,1]:capsule('Fractal branch',(sign*.12,.2+i*.11,0),(sign*.19,.27+i*.10,.015),.014,cream,fol,6,1)
    if id=='stromatolite':
        for x,z,h in [(-.28,0,.26),(.28,0,.34),(0,.27,.22),(0,-.24,.3)]:
            ball('Upper growth layer',(x,h*1.25,z),(.21,h*.36,.20),cream,fol)
