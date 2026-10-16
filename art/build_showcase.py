"""Original authored showcase additions; no external asset dependencies."""
import sys, json, math
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib import common as c

def build(id):
    c.clear_scene('org_'+id,3000)
    orange=c.make_material('Warm coral','#ED955A'); cream=c.make_material('Ivory','#FFF1D1'); dark=c.make_material('Ink','#223C43'); teal=c.make_material('Ocean shell','#438F9B'); brown=c.make_material('Chestnut shell','#9D6651')
    body=c.add_part('Body'); head=c.add_part('Head',joint=(0,.25,.4))
    if id=='reeffish':
        c.blob('body',(0,.3,0),(.18,.26,.48),orange,body)
        c.blob('head',(0,.31,.36),(.18,.21,.19),orange,head)
        for z in [-.24,.09]:
            c.blob('white band',(0,.3,z),(.186,.255 if z>.0 else .22,.045),cream,body,16,10)
        tail=c.add_part('Tail',joint=(0,.3,-.4))
        c.blob('tail fan',(0,.3,-.67),(.035,.23,.17),orange,tail,16,10)
        c.capsule('tail joint',(0,.3,-.4),(0,.3,-.58),.055,orange,tail)
        for sign,name in [(-1,'L'),(1,'R')]:
            fin=c.add_part('Fin_'+name,joint=(sign*.14,.24,.08))
            c.tapered_blade('fin',[(sign*.14,.24,.08),(sign*.32,.17,-.07),(sign*.26,.14,-.2)],[.04,.11,.005],.025,orange,fin)
        c.tapered_blade('Dorsal fin',[(0,.49,.22),(0,.66,.03),(0,.49,-.3)],[.015,.07,.005],.025,orange,body)
        c.stroke('Gill',[(.176,.39,.23),(.19,.3,.19),(.17,.2,.23)],.012,cream,head)
        height=.55
    else:
        segments=10 if id=='arthropleura' else 8
        mat=brown if id=='arthropleura' else teal
        for i in range(segments):
            z=.42-i*(.17 if id=='arthropleura' else .085)
            width=.24 if id=='arthropleura' else .43*(1-i*.07)
            c.blob('segment',(0,.19,z),(width,.15,.12),mat,body,12,8)
            c.blob('ridge',(0,.32,z),(.09,.04,.09),cream,body,10,6)
            for sign in [-1,1]:
                c.capsule('leg',(sign*width*.65,.13,z),(sign*(width+.13),.035,z-.05),.025,dark,body,6,2)
                if id=='arthropleura':c.capsule('Second leg',(sign*width*.65,.12,z+.05),(sign*(width+.12),.025,z+.025),.018,dark,body,6,2)
        if id=='trilobite':
            for sign in [-1,1]:c.tapered_blade('Genal spine',[(sign*.34,.19,.58),(sign*.49,.14,.37),(sign*.46,.09,.12)],[.06,.04,.003],.035,teal,head)
        c.blob('head',(0,.21,.57),(.28 if id=='arthropleura' else .43,.18,.22),mat,head,16,10)
        if id=='arthropleura':
            for sign in [-1,1]:
                c.stroke('antenna',[(sign*.12,.27,.69),(sign*.2,.38,.85),(sign*.27,.4,.93)],.02,brown,head)
        height=.42 if id=='trilobite' else .48
    for sign,name in [(-1,'L'),(1,'R')]:
        eye=c.add_part('Eye_'+name,joint=(sign*.14,.36,.48 if id=='reeffish' else .7))
        pos=(sign*.14,.36,.48 if id=='reeffish' else .7)
        c.blob('eye',pos,(.055,.065,.04),dark,eye,12,8)
        c.blob('spark',(pos[0]-.012,pos[1]+.02,pos[2]+.032),(.017,.02,.012),cream,eye,8,6)
    triangles=c.finish_model(height)
    c.deliver()
    p=c.BASE/'public/models/manifest.json';data=json.loads(p.read_text());data=[v for v in data if v['id']!=id]
    data.append(dict(id=id,file=f'/models/org_{id}.glb',icon=f'/icons/org_{id}.png',heightUnits=height,triangles=triangles,parts=['Root']+[p.name for p in c.PARTS]));p.write_text(json.dumps(data,indent=2)+'\n')
for id in ['reeffish','trilobite','arthropleura']: build(id)
