"""Reusable clay-toy families. Signature geometry is authored, never textured."""
from .common import *
from . import common as C

PALETTES={
 'amurleopard':('#D9BE7A','#FFF1CF','#51453A'),'tiger':('#E99743','#FFF1DA','#363B37'),
 'snowleopard':('#CBD2CF','#F7F0DE','#626B70'),'redpanda':('#B8663F','#F6E9D4','#3D3E37'),
 'giantpanda':('#F4EFDD','#F4EFDD','#3E4540'),'polarbear':('#F4EBD3','#FFF5E1','#5B6259'),
 'sumatranorangutan':('#BB693C','#D7A076','#594334'),'asianelephant':('#9B9B9D','#D5C9B7','#5D625E'),
 'kakapo':('#89A553','#B5C483','#526D3C'),'axolotl':('#F0BABE','#F3D5CF','#D87992'),
 'seaturtle':('#B58A4E','#E4C584','#6F573D'),'bluewhale':('#6993A8','#BAD1CF','#527B93'),
 'mammoth':('#88634A','#B38D61','#E8D5A4'),'dodo':('#969EA0','#D3CAC0','#C1A56D'),
 'thylacine':('#C5AA78','#E4D2A7','#5A5141'),'sumatranrhino':('#A27C65','#C5A48C','#705A49'),
 'forestelephant':('#92918E','#C6C0AC','#656862'),'mountaingorilla':('#535B58','#ACAD9F','#343C39'),
 'ringtailedlemur':('#A5AAA7','#F0EAD9','#414745'),'koala':('#A6AAA4','#D9D9C8','#4C5149'),
 'cheetah':('#D6BA73','#F0E3C2','#45473C'),'wilddog':('#B28C59','#EDE4CD','#43463C'),
 'pangolin':('#AB8E5E','#DAC39A','#7E6D47'),'seaotter':('#8B6E53','#D4BB8D','#504C3B'),
 'philippineeagle':('#8C7354','#E9DCC1','#70818A'),'condor':('#484C48','#E3DFCF','#C18E86'),
 'baldeagle':('#80654C','#F1EAD5','#D7B757'),'emperorpenguin':('#424D50','#F1EADB','#E8BC56'),
 'passengerpigeon':('#8EABB2','#D9A18B','#6E7E88'),'vaquita':('#A6B7BA','#E5E4DB','#5F6C70'),
 'rightwhale':('#5B6970','#BFBFAB','#404E54'),'humpback':('#748B94','#EEE9D6','#485F6D'),
 'whaleshark':('#71979F','#E2E3CB','#506F77'),'stellerseacow':('#93968B','#C5C3AE','#777F73'),
 'pintatortoise':('#7F816B','#CFBD91','#565C49'),'elkhorncoral':('#C4A16A','#DDC08C','#977C51'),
 'dickinsonia':('#E3B49B','#FFF9EE','#A38F7C'),
 'rabbit':('#C9A27E','#F7ECD9','#4C5145'),'redfox':('#E8792B','#F4E9CE','#4A4C41'),
 'allosaurus':('#D9734E','#F4E6C9','#5C684C'),'brachiosaurus':('#89A984','#E6DDB9','#5A795A'),
 'deer':('#BD9B71','#EBD8B4','#706047'),'honeybee':('#E5BF58','#F4EED4','#4A4D42')}

def ball(name,pos,size,mat,part):return blob(name,pos,size,mat,part,12,8)
def eyes(head,at,span=.20,size=.09):
    dark=make_material('Ink','#263238');white=make_material('Highlight','#FFF9EE')
    for sign,side in [(1,'L'),(-1,'R')]:
        p=(at[0]+sign*span,at[1],at[2]);part=add_part('Eye_'+side,joint=p)
        ball('Black eye',p,(size,size*1.15,size*.65),dark,part)
        ball('Eye highlight',(p[0]-size*.18,p[1]+size*.35,p[2]+size*.55),(size*.25,)*3,white,part)
    stroke('Little smile',[(at[0]-.09,at[1]-.15,at[2]-.015),(at[0],at[1]-.175,at[2]+.015),(at[0]+.09,at[1]-.15,at[2]-.015)],.012,dark,head)

def animal(id,template,size,height=False):
    clear_scene('org_'+id,3000)
    a,b,c=PALETTES[id];coat=make_material('Coat',a);cream=make_material('Accent','#FFF9EE');mark=make_material('Markings',c)
    body=add_part('Body',joint=(0,.55,0));head=add_part('Head',joint=(0,.75,.48));tail=add_part('Tail',joint=(0,.6,-.55))
    family=template
    if id=='dickinsonia':
        ball('Peach oval',(0,.10,0),(.46,.1,.63),coat,body)
        ball('Little front',(0,.10,.48),(.27,.09,.16),coat,head)
        for i in range(11):ball('Disc rib',(0,.19,-.5+i*.1),(.4*math.sqrt(max(.1,1-((-.5+i*.1)/.65)**2)),.015,.022),cream,body)
        ball('Disc tip',(0,.1,-.56),(.15,.07,.12),coat,tail)
        eyes(head,(0,.16,.61),.12,.035)
    elif id=='seaotter':
        ball('Floating belly',(0,.25,0),(.30,.23,.55),coat,body)
        ball('Pale chest',(0,.43,.12),(.23,.065,.32),cream,body)
        ball('Round otter head',(0,.34,.52),(.29,.25,.26),coat,head)
        ball('Cream muzzle',(0,.39,.71),(.21,.14,.10),cream,head)
        eyes(head,(0,.47,.72),.16,.065)
        for sign,side in [(1,'L'),(-1,'R')]:
            arm=add_part('Arm_'+side,joint=(sign*.25,.32,.18))
            capsule('Paws together',(sign*.25,.35,.18),(sign*.065,.51,.18),.075,coat,arm,8,2)
            leg=add_part('Leg_B'+side,joint=(sign*.18,.2,-.38))
            ball('Otter hind foot',(sign*.20,.25,-.54),(.11,.08,.18),coat,leg)
            ball('Small ear',(sign*.24,.43,.48),(.08,)*3,coat,head)
        capsule('Otter tail',(0,.23,-.4),(0,.18,-.85),.08,coat,tail,10,2)
    elif family in ['bigcat','canid','bear','smallmammal','primate','pachyderm','lowcrawler']:
        sitting=id in ['giantpanda','koala','mountaingorilla','sumatranorangutan']
        long=id in ['cheetah','thylacine','redfox','pangolin']
        width=.43 if family in ['bear','pachyderm'] else .34
        ball('Plump body',(0,.60,0),(width,.42 if sitting else .32,.53 if not long else .66),coat,body)
        ball('Belly',(0,.48,.18),(width*.83,.27,.39),cream,body)
        hy=1.02 if sitting else .86;hz=.36 if sitting else .52
        if id=='polarbear':hz=.65
        if id=='brachiosaurus':
            capsule('Long neck',(0,.7,.38),(0,1.8,.60),.18,coat,body,12,3)
            hy=1.95;hz=.65
        if id=='allosaurus':hy=1.1;hz=.53
        if id=='axolotl':hy=.44;hz=.60
        ball('Toy head',(0,hy,hz),(.36,.34,.34),coat,head)
        ball('Muzzle',(0,hy-.1,hz+.27),(.26,.17,.16),cream,head)
        if id in ['redfox','thylacine','wilddog','pangolin']:ball('Long muzzle',(0,hy-.10,hz+.37),(.17,.13,.24),coat,head)
        eyes(head,(0,hy-.015,hz+.305),.21,.085)
        for name,x,z in [('Leg_FL',.27,.32),('Leg_FR',-.27,.32),('Leg_BL',.27,-.38),('Leg_BR',-.27,-.38)]:
            if id=='allosaurus' and name in ['Leg_FL','Leg_FR']:
                p=add_part('Arm_'+('L' if x>0 else 'R'),joint=(x,.8,z));capsule('Tiny arm',(x,.8,z),(x,.62,z+.16),.07,coat,p,8,2);continue
            p=add_part(name,joint=(x,.48,z));ball('Thick foot',(x,.16,z),(.14,.16,.18),mark if id in ['redfox','giantpanda','redpanda','wilddog'] else coat,p)
            capsule('Short leg',(x,.20,z),(x,.42,z),.11,coat,p,8,2)
        if family=='primate':
            for sign,side in [(1,'L'),(-1,'R')]:
                p=add_part('Arm_'+side,joint=(sign*.35,.85,.2));capsule('Long arm',(sign*.40,.86,.2),(sign*.56,.2,.42),.14,coat,p,10,2)
        ear=.2 if id in ['koala','wilddog','forestelephant'] else .13
        for sign in [-1,1]:
            if id=='rabbit':ball('Long rabbit ear',(sign*.17,hy+.48,hz-.03),(.10,.38,.10),coat,head);ball('Pink inner ear',(sign*.17,hy+.49,hz+.04),(.045,.28,.04),cream,head)
            elif family=='pachyderm' and id!='brachiosaurus':ball('Elephant ear',(sign*.37,hy,hz-.02),(.25 if id=='forestelephant' else .18,.3,.09),coat,head)
            elif id not in ['axolotl','pangolin','brachiosaurus','allosaurus']:ball('Round ear',(sign*.26,hy+.25,hz-.04),(ear,ear,.08),coat,head)
        if family=='pachyderm' and id!='brachiosaurus':
            if id=='sumatranrhino':
                cone('Front horn',(0,hy+.05,hz+.45),.11,.015,.28,cream,head,10,.02);cone('Second horn',(0,hy+.18,hz+.25),.08,.01,.15,cream,head,10,.02)
            else:
                tapered_blade('Curled trunk',[(0,hy-.05,hz+.32),(0,hy-.3,hz+.44),(0,hy-.55,hz+.45),(0,hy-.62,hz+.68)],[.12,.11,.08,.04],.10,coat,head)
                for sign in [-1,1]:tapered_blade('Curved tusk',[(sign*.18,hy-.16,hz+.3),(sign*.23,hy-.35,hz+.55),(sign*.24,hy-.28,hz+.77)],[.065,.045,.005],.05,cream,head)
        if id=='allosaurus':
            for sign in [-1,1]:ball('Rounded brow horn',(sign*.21,hy+.24,hz+.15),(.09,.12,.10),cream,head)
        if id=='axolotl':
            for sign in [-1,1]:
                for i in range(3):capsule('Feathery gill',(sign*.29,hy+.06,hz-.13+i*.1),(sign*(.51+i*.03),hy+.26-i*.06,hz-.23+i*.17),.035,mark,head,8,2)
        if id=='deer':
            for sign in [-1,1]:
                capsule('Antler',(sign*.2,hy+.2,hz),(sign*.3,hy+.65,hz),.035,mark,head,8,2)
                capsule('Antler tine',(sign*.25,hy+.45,hz),(sign*.43,hy+.55,hz+.06),.025,mark,head,8,2)
        if id=='koala':ball('Koala nose',(0,hy+.01,hz+.33),(.11,.14,.075),mark,head)
        if id=='giantpanda':
            for sign in [-1,1]:ball('Eye patch',(sign*.20,hy-.02,hz+.28),(.15,.16,.08),mark,head)
        tailpoints=[(0,.58,-.4),(.16,.6,-.8),(.25,.7,-1.08),(.15,.9,-1.25)]
        if id=='rabbit':ball('Puff tail',(0,.50,-.61),(.16,)*3,cream,tail)
        elif id in ['koala','giantpanda','polarbear','mountaingorilla','sumatranorangutan']:ball('Small tail',(0,.5,-.52),(.09,)*3,coat,tail)
        else:
            thick=.15 if id in ['redpanda','snowleopard','redfox'] else .07
            tapered_blade('Swept tail',tailpoints,[thick,thick,thick*.9,.025],thick,coat,tail)
            if id=='redfox':ball('White tail tip',tailpoints[-1],(.13,.17,.14),cream,tail)
            if id in ['redpanda','ringtailedlemur']:
                for i in range(5):ball('Tail ring',(.16+i*.015,.63+i*.055,-.78-i*.085),(.13,.10,.09),mark if i%2==0 else cream,tail)
        if id in ['tiger','thylacine']:
            for sign in [-1,1]:
                for i in range(5):ball('Stripe',(sign*width*.95,.65,-.42+i*.19),(.025,.20,.035),mark,body)
        if id in ['amurleopard','snowleopard','cheetah','wilddog']:
            for sign in [-1,1]:
                for i in range(7):
                    y=.53+(i%2)*.18;z=-.40+(i//2)*.23
                    ball('Rosette',(sign*width*.97,y,z),(.025,.065,.065),mark,body)
                    if id in ['amurleopard','snowleopard']:ball('Rosette centre',(sign*width*1.02,y,z),(.015,.028,.028),coat,body)
        if id=='cheetah':
            for sign in [-1,1]:ball('Tear line',(sign*.18,hy-.12,hz+.34),(.025,.12,.02),mark,head)
        if id=='pangolin':
            for j in range(4):
                for i in range(4):ball('Overlapping scale',((j-1.5)*.15,.85-abs(j-1.5)*.07,-.4+i*.23),(.12,.055,.14),mark,body)
        if id=='mammoth':
            for i in range(12):cone('Shaggy fur',((i%4-1.5)*.2,.48,-.4+(i//4)*.3),.1,.04,.23,coat,body,8,.015)
        if id=='mountaingorilla':ball('Silver back',(0,.85,-.25),(.31,.19,.23),cream,body)
        if id=='sumatranorangutan':
            for sign in [-1,1]:ball('Long orange hair',(sign*.30,hy-.03,hz),(.16,.35,.22),coat,head)
    elif id=='honeybee':
        ball('Bee body',(0,.24,0),(.22,.22,.4),coat,body)
        for z in [-.22,0,.22]:ball('Bee stripe',(0,.25,z),(.225,.22,.06),mark,body)
        ball('Bee head',(0,.29,.37),(.23,.22,.22),coat,head)
        eyes(head,(0,.30,.56),.12,.055)
        for sign,side in [(1,'L'),(-1,'R')]:
            wing=add_part('Wing_'+side,joint=(sign*.15,.4,0))
            ball('Round wing',(sign*.34,.47,0),(.27,.07,.29),cream,wing)
            capsule('Antenna',(sign*.1,.45,.4),(sign*.15,.62,.44),.02,mark,head,8,2)
        ball('Tail tip',(0,.24,-.37),(.1,.1,.15),mark,tail)
    elif family=='bird':
        ball('Plump bird',(0,.50,0),(.40,.46,.37),coat,body);ball('Soft breast',(0,.48,.27),(.29,.34,.16),cream,body)
        ball('Big bird head',(0,.98,.16),(.32,.31,.29),cream if id=='baldeagle' else coat,head)
        eyes(head,(0,.96,.425),.17,.075)
        for sign,side in [(1,'L'),(-1,'R')]:
            p=add_part('Wing_'+side,joint=(sign*.32,.69,0));ball('Folded wing',(sign*.39,.52,-.03),(.14,.32,.26),coat,p)
            p=add_part('Leg_F'+side,joint=(sign*.17,.30,0));ball('Bird foot',(sign*.17,.08,.12),(.14,.08,.23),mark,p)
        beak=mark if id in ['baldeagle','emperorpenguin','dodo'] else cream
        ball('Beak',(0,.89,.47),(.15,.12,.20 if id!='dodo' else .28),beak,head)
        if id=='dodo':ball('Hooked beak',(0,.83,.65),(.13,.16,.10),mark,head)
        if id=='kakapo':
            for sign in [-1,1]:ball('Owl facial disc',(sign*.14,.99,.37),(.17,.21,.055),cream,head)
        if id=='philippineeagle':
            for i in range(7):ball('Shaggy crest',((i-3)*.08,1.24+(.12 if i%2 else 0),.05),(.045,.18,.05),cream,head)
        if id=='condor':ball('Bare head',(0,.98,.16),(.30,.29,.28),mark,head)
        if id=='emperorpenguin':
            for sign in [-1,1]:ball('Golden neck',(sign*.24,.79,.22),(.07,.19,.12),mark,body)
        for i in range(3):ball('Tail feather',((i-1)*.10,.48,-.43),(.09,.10,.24 if id=='passengerpigeon' else .13),cream,tail)
    elif family=='cetacean':
        length=1.5 if id in ['bluewhale','rightwhale','humpback','stellerseacow'] else 1.05
        ball('Whale body',(0,.38,0),(.39,.34,length*.65),coat,body)
        ball('Round whale head',(0,.39,length*.55),(.40,.32,.48),coat,head)
        ball('Pale underside',(0,.20,.24),(.30,.12,length*.6),cream,body)
        eyes(head,(0,.40,length*.84),.27,.07)
        for sign,side in [(1,'L'),(-1,'R')]:
            p=add_part('Fin_'+side,joint=(sign*.31,.35,.15));ball('Flipper',(sign*(.68 if id=='humpback' else .48),.23,.04),(.43 if id=='humpback' else .25,.065,.16),cream if id=='humpback' else coat,p)
            ball('Tail fluke',(sign*.25,.39,-length*.76),(.34,.07,.22),coat,tail)
        if id not in ['rightwhale','stellerseacow']:cone('Dorsal fin',(0,.70,-.1),.14,.015,.20,coat,body,8,.025)
        if id=='whaleshark':
            for j in range(4):
                for i in range(6):ball('White spot',((j-1.5)*.16,.68-abs(j-1.5)*.04,-.5+i*.23),(.035,.018,.035),cream,body)
        if id=='rightwhale':
            for x,z in [(-.22,.9),(.2,1.0),(0,1.13)]:ball('Callosity',(x,.60,z),(.09,.035,.12),cream,head)
        if id=='humpback':
            for i in range(5):ball('Head knob',((i%3-1)*.17,.64,.8+i*.08),(.04,)*3,coat,head)
        if id=='vaquita':
            for sign in [-1,1]:ball('Dark eye ring',(sign*.26,.4,.82),(.12,.12,.055),mark,head)
    elif family=='turtle':
        ball('Domed shell',(0,.34,0),(.48,.34,.57),mark,body);ball('Shell scute',(0,.54,.03),(.30,.18,.38),coat,body)
        for x,z in [(-.25,.15),(.25,.15),(0,-.3)]:ball('Shell scute',(x,.48,z),(.18,.12,.23),coat,body)
        ball('Turtle neck',(0,.34,.55),(.14,.19,.23),cream,head);ball('Turtle head',(0,.39,.77),(.23,.22,.27),cream,head)
        eyes(head,(0,.41,.99),.14,.055)
        for sign,side in [(1,'L'),(-1,'R')]:
            p=add_part('Fin_'+side if id=='seaturtle' else 'Leg_F'+side,joint=(sign*.35,.22,.2));ball('Front flipper',(sign*.53,.14,.28),(.27,.08,.21),coat,p)
            p=add_part('Leg_B'+side,joint=(sign*.31,.18,-.3));ball('Hind foot',(sign*.37,.10,-.38),(.16,.10,.19),cream,p)
        ball('Little tail',(0,.16,-.60),(.08,.07,.17),coat,tail)
    elif family=='coral':
        # Coral has the plant hierarchy, authored by plant() below.
        raise ValueError('Use plant builder for coral')
    else:raise ValueError(family)
    # Every impact model is fitted to its longest dimension, base models to height.
    for obj in list(bpy.context.scene.objects):
        if obj.type in {'MESH','CURVE'}:apply_modifiers(obj)
    low,high=bounds([o for o in bpy.context.scene.objects if o.type=='MESH']);target=size if height else size*(high.z-low.z)/max(high-low)
    finish_model(height=target);deliver()

def plant(id,height):
    clear_scene('org_'+id,1500);green=make_material('Foliage','#4FA84E' if id in ['oak','grass','wildflower','seagrass'] else '#2F7A4A' if id=='conifer' else '#6FB34A');wood=make_material('Trunk','#8B5E3C');cream=make_material('Accent','#D8B58C');fol=add_part('Foliage');trunk=None
    if id in ['oak','conifer','cycad']:
        trunk=add_part('Trunk');cylinder('Chunky trunk',(0,.5,0),.13,1,wood,trunk,12,.025)
    if id=='oak':
        for x,y,z in [(-.35,1.4,0),(.35,1.5,.03),(0,1.8,-.1)]:ball('Round canopy',(x,y,z),(.6,.55,.55),green,fol)
    elif id=='conifer':
        for level in range(3):
            for i in range(5):
                a=i*math.tau/5;ball('Umbrella branch',(math.sin(a)*(.5-level*.12),1+level*.35,math.cos(a)*(.5-level*.12)),(.35,.15,.32),green,fol)
    elif id=='charnia':
        capsule('Central stalk',(0,0,0),(0,.9,0),.025,green,fol,8,2)
        for i in range(9):
            y=.12+i*.08;span=.29*(1-i/10)
            for sign in [-1,1]:capsule('Feather branch',(0,y,0),(sign*span,y+.13,0),.035,green,fol,8,2)
    elif id in ['grass','seagrass','cycad']:
        n=10 if id=='cycad' else 9
        for i in range(n):
            a=i*math.tau/n;length=.55+(i%3)*.13;start=.85 if id=='cycad' else 0
            tapered_blade('Curved leaf',[(0,start,0),(math.sin(a)*.23,start+length*.7,math.cos(a)*.23),(math.sin(a)*.5,start+length,math.cos(a)*.5)],[.035,.08,.001],.018,green,fol)
        if id=='cycad':
            for j in range(3):
                for i in range(6):ball('Trunk diamond',(math.sin(i*math.tau/6)*.13,.2+j*.22,math.cos(i*math.tau/6)*.13),(.055,.10,.04),cream,trunk)
    elif id=='stromatolite':
        tan=make_material('Microbial mats','#C9A15B')
        for x,z,h in [(-.28,0,.26),(.28,0,.34),(0,.27,.22),(0,-.24,.3)]:
            ball('Layered dome',(x,h*.6,z),(.29,h,.28),tan,fol);cylinder('Layer band',(x,h*.4,z),.28,.06,cream,fol,12,.02)
    elif id=='dickinsonia':
        peach=make_material('Peach','#E3B49B');ball('Oval disc',(0,.07,0),(.46,.07,.63),peach,fol)
        for i in range(11):ball('Disc rib',(0,.13,-.5+i*.1),(.40*math.sqrt(max(.1,1-((-0.5+i*.1)/.65)**2)),.025,.024),cream,fol)
    elif id=='elkhorncoral':
        gold=make_material('Golden coral','#C4A16A')
        for sign in [-1,1]:
            capsule('Coral trunk',(0,.1,0),(sign*.25,.6,0),.11,gold,fol,10,2)
            for i in range(3):capsule('Antler branch',(sign*.18,.4,i*.06),(sign*(.4+i*.12),.8+i*.12,i*.10),.07,gold,fol,10,2)
    elif id=='wildflower':
        pink=make_material('Petals','#F7A8C4');yellow=make_material('Flower centre','#FFD45C');capsule('Stem',(0,0,0),(0,.4,0),.025,green,fol,8,2)
        for i in range(5):ball('Petal',(math.sin(i*math.tau/5)*.12,.4,math.cos(i*math.tau/5)*.12),(.10,.04,.1),pink,fol)
        ball('Centre',(0,.43,0),(.065,.04,.065),yellow,fol)
    if id=='elkhorncoral':
        low,high=bounds([o for o in bpy.context.scene.objects if o.type=='MESH']);height=height*(high.z-low.z)/max(high-low)
    finish_model(height=height);deliver()

# Named template entry points keep species scripts small and reusable.
def bigcat(id,size,height=False):animal(id,'bigcat',size,height)
def canid(id,size,height=False):animal(id,'canid',size,height)
def bear(id,size,height=False):animal(id,'bear',size,height)
def primate(id,size,height=False):animal(id,'primate',size,height)
def pachyderm(id,size,height=False):animal(id,'pachyderm',size,height)
def bird(id,size,height=False):animal(id,'bird',size,height)
def cetacean(id,size,height=False):animal(id,'cetacean',size,height)
def turtle(id,size,height=False):animal(id,'turtle',size,height)
def lowcrawler(id,size,height=False):animal(id,'lowcrawler',size,height)
def smallmammal(id,size,height=False):animal(id,'smallmammal',size,height)
def coral(id,size,height=False):plant(id,size)
