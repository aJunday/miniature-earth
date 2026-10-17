"""Original regional silhouettes using the shared flat-colour miniature pipeline."""
from .common import *
from . import common as C
from .templates import ball,eyes

def build(ident):
    clear_scene('org_'+ident,3000)
    palettes={'bison':('#987352','#694F42'),'graywolf':('#9DAAA7','#697B7C'),'beaver':('#B18D68','#79614F'),'menhaden':('#8BB8C5','#547E91')}
    a,b=palettes[ident];coat=make_material('Coat',a);dark=make_material('Accent',b);cream=make_material('Cream','#F4E8CE');ink=make_material('Ink','#263238')
    body=add_part('Body',joint=(0,.5,0));head=add_part('Head',joint=(0,.68,.45));tail=add_part('Tail',joint=(0,.5,-.5))
    if ident=='menhaden':
        ball('Silver deep body',(0,.5,0),(.18,.32,.65),coat,body)
        ball('Blue back',(0,.67,-.08),(.16,.16,.48),dark,body)
        ball('Blunt fish head',(0,.5,.48),(.19,.23,.25),coat,head)
        for sign,side in [(-1,'R'),(1,'L')]:
            eye=add_part('Eye_'+side,joint=(sign*.17,.57,.57));ball('Eye',(sign*.17,.57,.57),(.035,.045,.045),ink,eye);ball('Glint',(sign*.19,.59,.59),(.012,)*3,cream,eye)
            ball('Shoulder spot',(sign*.18,.58,.23),(.015,.055,.05),dark,body)
            fin=add_part('Fin_'+side,joint=(sign*.15,.38,.2));ball('Pectoral fin',(sign*.23,.35,.10),(.15,.035,.17),dark,fin)
        for y in [.31,.69]:capsule('Forked tail',(0,.5,-.55),(0,y,-.91),.07,dark,tail,8,2)
        ball('Dorsal fin',(0,.81,-.14),(.045,.14,.19),dark,body)
        height=.5
    else:
        is_bison=ident=='bison';is_beaver=ident=='beaver'
        ball('Body',(0,.58,0),(.43 if is_bison else .33,.34,.62),coat,body)
        ball('Chest',(0,.6,.30),(.37,.36,.30),dark if is_bison else cream,body)
        ball('Toy head',(0,.84,.58),(.34,.30,.31),dark if is_bison else coat,head)
        ball('Muzzle',(0,.74,.85),(.24,.16,.21 if not is_beaver else .12),coat if is_bison else cream,head)
        ball('Nose',(0,.81,1.02 if not is_beaver else .95),(.12,.075,.06),ink,head)
        eyes(head,(0,.90,.83),.22,.07)
        for sign,side in [(-1,'R'),(1,'L')]:
            for z,label in [(.38,'F'),(-.4,'B')]:
                leg=add_part('Leg_'+label+side,joint=(sign*.27,.51,z));capsule('Leg',(sign*.27,.51,z),(sign*.29,.17,z),.105,coat,leg,10,2);ball('Foot',(sign*.29,.11,z+.07),(.13,.10,.18),dark,leg)
            if ident=='graywolf':
                cone('Pointed ear',(sign*.23,1.18,.55),.13,.025,.36,coat,head,vertices=10)
            else:ball('Round ear',(sign*.32,1.01,.52),(.12,.12,.07),coat,head)
        if is_bison:
            ball('Shoulder hump',(0,.98,.12),(.39,.30,.38),dark,body)
            ball('Beard',(0,.55,.72),(.17,.21,.13),dark,head)
            for sign in [-1,1]:stroke('Curved horn',[(sign*.28,1.04,.57),(sign*.46,1.13,.55),(sign*.47,1.33,.56)],.055,cream,head)
            capsule('Tail stem',(0,.55,-.53),(0,.26,-.8),.045,coat,tail,8,2);ball('Tail tuft',(0,.23,-.8),(.07,.11,.07),dark,tail)
        elif is_beaver:
            ball('Flat paddle tail',(0,.14,-.92),(.27,.065,.48),dark,tail)
            for x in [-.045,.045]:rounded_box('Incisor',(x,.63,.96),(.075,.13,.06),.02,cream,head)
        else:
            capsule('Bushy tail',(0,.55,-.50),(0,.32,-1.02),.14,coat,tail,10,2);ball('Tail tip',(0,.28,-1.07),(.13,.14,.18),dark,tail)
        height={'bison':1.8,'graywolf':1.0,'beaver':.6}[ident]
    finish_model(height=height);bake_palette();deliver()
