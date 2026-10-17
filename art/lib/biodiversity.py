"""Original genus-level fossil miniatures. No third-party mesh/media reuse.
Anatomy sources and uncertain reconstructions are in metadata.json and evidence.
"""
from .common import *
from .templates import ball,eyes
import json

def build(ident):
    spec=next(s for s in json.loads((BASE/'src/sim/data/species.json').read_text()) if s['id']==ident)
    plant=spec['diet']=='producer'
    clear_scene('org_'+ident,1500 if plant else 3000)
    coat=make_material('Main','#7EAD91' if plant else '#86A7AE')
    accent=make_material('Accent','#D6C59A');dark=make_material('Detail','#58746A')
    if plant:
        trunk=add_part('Trunk');leaf=add_part('Foliage')
        if ident=='cooksonia':
            for x,z,k in [(-.13,0,.8),(.12,.04,1),(0,-.09,.65)]:
                capsule('Leafless axis',(x,0,z),(x,.42*k,z),.018,coat,trunk,6,1)
                for sign in [-1,1]:
                    tip=(x+sign*.10,.68*k,z)
                    capsule('Dichotomy',(x,.38*k,z),tip,.014,coat,leaf,6,1)
                    blob('Terminal sporangium',tip,(.038,.027,.035),accent,leaf,8,4)
        else:
            wood=make_material('Wood','#9B775B')
            cylinder('Woody trunk',(0,.65,0),.10,1.3,wood,trunk,vertices=8)
            for level in range(4):
                y=.65+level*.29;reach=.52-level*.09
                for j in range(4):
                    a=j*math.pi/2+level*.5;x,z=math.cos(a)*reach,math.sin(a)*reach
                    capsule('Branch',(0,y,0),(x,y+.13,z),.025,wood,trunk,6,1)
                    # Flat layered frond/branchlet masses preserve a readable low-poly crown.
                    blob('Leafy branch system',(x*.65,y+.17,z*.65),(reach*.72,.10,reach*.43),coat,leaf,8,4)
                    if ident=='archaeopteris':
                        for sign in [-1,1]:blob('Fernlike pinna',(x*.8+sign*.09,y+.19,z*.8),(.13,.045,.09),dark,leaf,6,4)
            blob('Crown',(0,1.8,0),(.19,.15,.19),coat,leaf,8,4)
    elif ident in ['platystrophia','eucalyptocrinites']:
        body=add_part('Body')
        if ident=='platystrophia':
            ball('Lower convex valve',(0,.10,0),(.42,.10,.31),accent,body)
            ball('Upper convex valve',(0,.19,0),(.42,.13,.31),coat,body)
            for i in range(-4,5):
                x=i*.075
                capsule('Radial shell rib',(x*.25,.29,-.22),(x,.23,.22),.017,accent,body,6,1)
            capsule('Pedicle',(0,.08,-.22),(0,.03,-.35),.04,dark,body,6,1)
        else:
            ball('Holdfast',(0,.04,0),(.16,.04,.15),dark,body)
            for j in range(9):cylinder('Stem columnal',(0,.09+j*.055,0),.045,.045,accent,body,vertices=8)
            ball('Calyx',(0,.62,0),(.16,.20,.16),coat,body)
            for j in range(10):
                a=j*math.tau/10;x,z=math.cos(a)*.2,math.sin(a)*.2
                capsule('Arm',(x*.5,.61,z*.5),(x,.93,z),.025,coat,body,6,1)
                for k in range(2):capsule('Feather branch',(x*.8,.74+k*.08,z*.8),(x*1.3,.81+k*.08,z*1.3),.014,accent,body,6,1)
    elif ident in ['knightia','dunkleosteus']:
        body=add_part('Body');head=add_part('Head',joint=(0,.3,.35));tail=add_part('Tail',joint=(0,.3,-.4))
        ball('Fish body',(0,.3,0),(.15,.24,.52),coat,body)
        ball('Fish head',(0,.31,.4),(.19,.23,.26),coat,head)
        if ident=='dunkleosteus':
            rounded_box('Armored skull',(0,.38,.48),(.46,.38,.43),.08,dark,head)
            rounded_box('Jaw plate',(0,.16,.54),(.42,.14,.36),.05,accent,head)
        eyes(head,(0,.38,.58),.145,.045)
        for side in [-1,1]:
            fin=add_part('Fin_'+('L' if side>0 else 'R'),joint=(side*.12,.22,.1))
            tapered_blade('Pectoral fin',[(side*.12,.22,.15),(side*.34,.13,-.08)],[.12,.015],.025,accent,fin)
        tapered_blade('Dorsal fin',[(0,.48,-.1),(0,.72,-.22)],[.18,.02],.025,dark,body)
        for sign in [-1,1]:tapered_blade('Forked tail',[(0,.3,-.44),(0,.3+sign*.22,-.75)],[.09,.14],.025,accent,tail)
    elif ident=='eurypterus':
        body=add_part('Body');head=add_part('Head',joint=(0,.14,.4));tail=add_part('Tail',joint=(0,.12,-.4))
        ball('Broad carapace',(0,.15,.4),(.26,.13,.25),coat,head)
        eyes(head,(0,.22,.52),.14,.04)
        for j in range(7):ball('Segment',(0,.13,.23-j*.13),(.24-j*.022,.10-j*.007,.09),coat if j%2 else accent,body)
        tapered_blade('Telson',[(0,.10,-.55),(0,.08,-1.05)],[.08,.005],.035,dark,tail)
        for sign,side in [(1,'L'),(-1,'R')]:
            p=add_part('Fin_'+side,joint=(sign*.2,.12,.15))
            capsule('Swimming limb',(sign*.2,.12,.15),(sign*.48,.10,-.05),.035,coat,p,6,1)
            ball('Swimming paddle',(sign*.52,.1,-.13),(.12,.035,.20),accent,p)
            for j in range(3):capsule('Walking leg',(sign*.17,.12,.35+j*.05),(sign*(.33+j*.03),.035,.35+j*.13),.025,dark,body,6,1)
    else:
        horse=ident in ['mesohippus','merychippus'];biped=ident=='coelophysis'
        coat=make_material('Coat','#C59D78' if horse else '#82A98A')
        body=add_part('Body',joint=(0,.56,0));head=add_part('Head',joint=(0,.75,.45));tail=add_part('Tail',joint=(0,.48,-.5))
        ball('Torso',(0,.55,0),(.27 if biped else .36,.27,.57),coat,body)
        capsule('Neck',(0,.6,.32),(0,.92,.55),.13 if biped else .18,coat,head,8,2)
        ball('Head',(0,.98,.62),(.22,.23,.28),coat,head)
        ball('Muzzle',(0,.90,.84),(.18,.13,.20 if ident=='merychippus' else .13),accent,head)
        eyes(head,(0,1.02,.80),.145,.055)
        for sign,side in [(1,'L'),(-1,'R')]:
            if horse:ball('Ear',(sign*.13,1.23,.57),(.065,.15,.07),coat,head)
            for z,label in [(.30,'F'),(-.32,'B')]:
                p=add_part(('Arm_'+side) if biped and label=='F' else 'Leg_'+label+side,joint=(sign*.25,.48,z))
                low=.37 if biped and label=='F' else .09
                capsule('Limb',(sign*.25,.48,z),(sign*.29,low,z+.05),.065 if biped else .09,coat,p,8,2)
                ball('Foot',(sign*.29,low,z+.11),(.10,.07,.16),dark,p)
                if horse:
                    for k in [-1,1]:ball('Side toe',(sign*.29+k*.075,low+.01,z+.13),(.034,.045,.065),accent,p)
            if ident=='edmontonia':
                for j in range(4):rounded_box('Armor',(sign*.2,.78,-.35+j*.2),(.25,.10,.18),.035,dark,body)
                tapered_blade('Shoulder spine',[(sign*.3,.65,.33),(sign*.68,.68,.49)],[.1,.005],.07,accent,body)
        if horse:
            capsule('Tail',(0,.58,-.45),(0,.18,-.68),.055,dark,tail,8,2)
            for j in range(4):ball('Mane',(0,.80+j*.08,.28+j*.06),(.05,.09,.08),dark,head)
        else:
            for j in range(4):ball('Tapering tail',(0,.43-j*.04,-.50-j*.18),(.15-j*.03,.12-j*.025,.18),coat,tail)
    finish_model(height=spec['height']);bake_palette();deliver()
