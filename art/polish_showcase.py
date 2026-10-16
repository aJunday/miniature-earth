"""Twelve original showcase refinements, rebuilt through the shared CPU pipeline."""
import sys,math,runpy
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib import common as C
from lib.common import *
ROSTER=['deer','redfox','rabbit','honeybee','seaturtle','stegosaurus','mammoth','reeffish','trilobite','arthropleura','fern','oak']

def ball(name,p,s,m,part):return blob(name,p,s,m,part,14,8)
def palette(id):
    colors={'deer':['#BB8E61','#F5DEB7','#6A4936'],'redfox':['#E57F3A','#FFF1D4','#4C423C'],'rabbit':['#C9AC94','#F7E8D7','#A77F76'],'honeybee':['#EFBC51','#F5ECDC','#4A3E36'],'seaturtle':['#A9854F','#F0D8A1','#526D4D'],'mammoth':['#94705B','#F4DDB1','#604A3D'],'oak':['#48985A','#81B96A','#846348']}[id]
    return [make_material(n,c) for n,c in zip(['Main','Accent','Detail'],colors)]+[make_material('Ink','#273B39')]
def eyes(head,y,z,span,ink,light,size=.065):
    for sign,name in [(1,'L'),(-1,'R')]:
        eye=add_part('Eye_'+name,joint=(sign*span,y,z))
        ball('Eye',(sign*span,y,z),(size,size*1.16,size*.65),ink,eye)
        ball('Spark',(sign*span-size*.2,y+size*.32,z+size*.5),(size*.26,)*3,light,eye)
    stroke('Smile',[(-span*.5,y-.13,z-.015),(0,y-.15,z+.015),(span*.5,y-.13,z-.015)],.01,ink,head)
def bake_palette():
    # Keep named joints, but encode paint as vertex colour: one draw/material per part.
    surface=make_material('Painted miniature','#FFFFFF')
    node=surface.node_tree.nodes.new('ShaderNodeVertexColor');node.layer_name='Paint'
    surface.node_tree.links.new(node.outputs['Color'],surface.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
    for obj in C.PARTS:
        attr=obj.data.color_attributes.new(name='Paint',type='FLOAT_COLOR',domain='CORNER')
        for poly in obj.data.polygons:
            color=obj.data.materials[poly.material_index].diffuse_color
            for li in poly.loop_indices:attr.data[li].color=color
            poly.material_index=0
        obj.data.materials.clear();obj.data.materials.append(surface)
def finish(id,size,longest=False):
    for obj in list(bpy.context.scene.objects):
        if obj.type in {'MESH','CURVE'}:apply_modifiers(obj)
    low,high=bounds([o for o in bpy.context.scene.objects if o.type=='MESH'])
    finish_model(height=size*(high.z-low.z)/max(high-low) if longest else size)
    bake_palette();deliver()
def mammal(id,size):
    clear_scene('org_'+id,3000);coat,cream,detail,ink=palette(id)
    body=add_part('Body',joint=(0,.6,0));head=add_part('Head',joint=(0,.87,.38));tail=add_part('Tail',joint=(0,.6,-.5))
    rabbit=id=='rabbit';fox=id=='redfox';mammoth=id=='mammoth'
    ball('Torso',(0,.58,0),(.39 if mammoth else .29,.42 if rabbit else .32,.54),coat,body)
    ball('Chest',(0,.58,.32),(.25,.29,.24),cream if not mammoth else coat,body)
    hy=.94 if not rabbit else .81
    ball('Head',(0,hy,.55),(.31,.29,.29),coat,head)
    ball('Cheek L',(.19,hy-.1,.69),(.15,.13,.14),cream if not mammoth else coat,head)
    ball('Cheek R',(-.19,hy-.1,.69),(.15,.13,.14),cream if not mammoth else coat,head)
    ball('Muzzle',(0,hy-.12,.81),(.16,.12,.18 if fox else .12),cream,head)
    ball('Nose',(0,hy-.07,.94 if fox else .89),(.055,.04,.035),ink,head)
    eyes(head,hy+.01,.79,.19,ink,cream,.065)
    for sign in [-1,1]:
        if rabbit:
            ear=ball('Tall ear',(sign*.15,1.24,.49),(.095,.36,.085),coat,head)
            ball('Ear inset',(sign*.15,1.26,.56),(.047,.26,.025),detail,head)
            ball('Haunch',(sign*.23,.34,-.26),(.21,.27,.26),coat,body)
        elif mammoth:
            ball('Small furry ear',(sign*.31,.94,.44),(.12,.19,.075),detail,head)
        else:
            tapered_blade('Pointed ear',[(sign*.20,hy+.15,.46),(sign*.28,hy+.37,.48),(sign*.30,hy+.49,.48)],[.12,.09,.005],.065,coat,head)
            tapered_blade('Inner ear',[(sign*.21,hy+.22,.51),(sign*.27,hy+.35,.54),(sign*.29,hy+.43,.51)],[.055,.04,.002],.015,cream,head)
    for name,x,z in [('Leg_FL',.22,.33),('Leg_FR',-.22,.33),('Leg_BL',.23,-.35),('Leg_BR',-.23,-.35)]:
        part=add_part(name,joint=(x,.48,z))
        capsule('Leg',(x,.14,z),(x,.48,z),.09 if not mammoth else .13,coat,part,10,2)
        ball('Foot',(x,.1,z+.05),(.12,.1,.20 if rabbit else .14),detail if fox else coat,part)
        if mammoth:
            for k in [-1,0,1]:ball('Toe',(x+k*.065,.08,z+.17),(.035,.045,.025),cream,part)
    if fox:
        tapered_blade('Bushy sweep',[(0,.55,-.46),(.20,.55,-.82),(.34,.72,-1.13),(.25,.92,-1.29)],[.12,.25,.22,.045],.19,coat,tail)
        tapered_blade('Cream tip',[(.32,.75,-1.12),(.3,.88,-1.24),(.25,.96,-1.32)],[.20,.12,.005],.15,cream,tail)
    elif rabbit:ball('Pom tail',(0,.46,-.58),(.16,.16,.14),cream,tail)
    else:ball('Short tail',(0,.6,-.59),(.07,.13,.10),coat,tail)
    if id=='deer':
        for sign in [-1,1]:
            stroke('Antler',[(sign*.17,1.13,.47),(sign*.22,1.43,.45),(sign*.32,1.62,.43)],.028,detail,head)
            for j in range(2):capsule('Antler tine',(sign*(.21+j*.04),1.36+j*.14,.45),(sign*(.36+j*.03),1.42+j*.16,.5),.022,detail,head,8,2)
        for sign in [-1,1]:
            for z in [-.26,-.02,.18]:ball('Soft dapple',(sign*.27,.72,z),(.018,.035,.045),cream,body)
    if mammoth:
        ball('Shoulder hump',(0,.94,-.13),(.32,.18,.39),coat,body)
        tapered_blade('Curled trunk',[(0,.9,.8),(0,.6,.96),(0,.3,1.03),(0,.26,1.25),(0,.40,1.32)],[.12,.11,.09,.065,.04],.1,coat,head)
        for sign in [-1,1]:
            tapered_blade('Sweeping tusk',[(sign*.2,.77,.77),(sign*.35,.52,1.05),(sign*.38,.58,1.34),(sign*.3,.85,1.45)],[.065,.06,.035,.003],.055,cream,head)
            for i in range(5):tapered_blade('Fur fringe',[(sign*.32,.65,-.4+i*.18),(sign*.36,.38,-.36+i*.18),(sign*.32,.27,-.30+i*.18)],[.07,.065,.003],.035,detail,body)
        for i in [-1,0,1]:ball('Forehead curl',(i*.10,1.18,.60),(.09,.12,.08),detail,head)
    finish(id,size,mammoth)
def bee():
    id='honeybee';clear_scene('org_'+id,3000);gold,cream,dark,ink=palette(id);body=add_part('Body');head=add_part('Head',joint=(0,.3,.34));tail=add_part('Tail',joint=(0,.25,-.3))
    ball('Abdomen',(0,.28,-.05),(.23,.23,.40),gold,body)
    for z in [-.26,-.04,.17]:ball('Stripe',(0,.28,z),(.232,.231,.047),dark,body)
    ball('Head',(0,.32,.38),(.24,.23,.21),gold,head);eyes(head,.34,.57,.125,ink,cream,.06)
    for sign,side in [(1,'L'),(-1,'R')]:
        part=add_part('Wing_'+side,joint=(sign*.12,.40,0))
        for z,r in [(0,.24),(-.25,.17)]:ball('Wing',(sign*.34,.47,z),(r,.035,r*.8),cream,part)
        stroke('Antenna',[(sign*.1,.48,.4),(sign*.16,.62,.44),(sign*.20,.64,.48)],.018,dark,head)
        ball('Antenna bead',(sign*.20,.64,.48),(.03,)*3,dark,head)
        for j in range(3):capsule('Foot',(sign*.14,.15,-.22+j*.17),(sign*.28,.03,-.18+j*.17),.025,dark,body,8,2)
    ball('Tail',(0,.28,-.43),(.10,.10,.12),dark,tail);finish(id,.35)
def turtle():
    id='seaturtle';clear_scene('org_'+id,3000);shell,cream,green,ink=palette(id);body=add_part('Body');head=add_part('Head',joint=(0,.25,.45));tail=add_part('Tail',joint=(0,.2,-.48))
    ball('Shell',(0,.27,0),(.42,.27,.55),green,body);ball('Plastron',(0,.10,0),(.38,.08,.48),cream,body)
    for z in [-.27,0,.27]:ball('Central scute',(0,.49-abs(z)*.3,z),(.18,.06,.16),shell,body)
    for sign in [-1,1]:
        for z in [-.23,.08,.30]:ball('Side scute',(sign*.25,.40-abs(z)*.2,z),(.14,.07,.14),shell,body)
    ball('Neck',(0,.24,.48),(.14,.13,.23),green,head);ball('Head',(0,.28,.68),(.22,.18,.24),green,head)
    ball('Hooked beak',(0,.23,.88),(.10,.09,.07),cream,head);eyes(head,.33,.84,.13,ink,cream,.05)
    for sign,side in [(1,'L'),(-1,'R')]:
        fin=add_part('Fin_'+side,joint=(sign*.32,.19,.25));tapered_blade('Swept paddle',[(sign*.3,.19,.25),(sign*.63,.12,.19),(sign*.78,.09,-.10)],[.08,.16,.005],.035,green,fin)
        leg=add_part('Leg_B'+side,joint=(sign*.25,.15,-.34));ball('Hind paddle',(sign*.36,.09,-.48),(.17,.05,.17),green,leg)
    tapered_blade('Tail',[(0,.16,-.46),(0,.12,-.68)],[.07,.003],.04,green,tail);finish(id,.6,True)
def oak():
    clear_scene('org_oak',1500);green,light,wood,ink=palette('oak');trunk=add_part('Trunk');fol=add_part('Foliage')
    cylinder('Taper trunk',(0,.61,0),.14,1.22,wood,trunk,10,.04)
    for i in range(5):
        a=i*math.tau/5;x,z=math.sin(a),math.cos(a)
        capsule('Root',(x*.06,.12,z*.06),(x*.32,.025,z*.32),.065,wood,trunk,8,2)
        capsule('Branch',(0,.85,0),(x*.43,1.28,z*.43),.065,wood,trunk,8,2)
        ball('Canopy lobe',(x*.4,1.45+(i%2)*.12,z*.4),(.44,.43,.44),green if i%2 else light,fol)
    ball('Crown',(0,1.85,0),(.5,.4,.49),green,fol)
    finish('oak',2.4)

for id,size in [('deer',1.3),('redfox',.7),('rabbit',.5),('mammoth',2.6)]:mammal(id,size)
bee();turtle();oak()
# Refine the existing articulated dinosaur/frond and three new invertebrate/fish sculpts.
for script in ['build_stegosaurus.py','build_fern.py','build_showcase.py']:
    runpy.run_path(str(Path(__file__).resolve().parent/script),run_name='__main__')
    # Each of these builders will also be called independently; preserve its authoring source.
# Bake each remaining asset after reimport, retaining the established animated part origins.
for id in ['stegosaurus','fern','reeffish','trilobite','arthropleura']:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(BASE/'public/models'/f'org_{id}.glb'))
    C.ROOT=bpy.data.objects.get('Root');C.PARTS=[o for o in C.ROOT.children if o.type=='MESH'];C.MODEL_ID='org_'+id
    bake_palette();deliver()
