import sys, math
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib.common import *

clear_scene('island_jurassic',15000)
grass=make_material('Jurassic ground','#8CC152')
soil=make_material('Warm soil','#A0704C')
clay=make_material('Clay stripe','#8A5D3F')
deep=make_material('Deep soil','#6E4A33')
watermat=make_material('Lagoon blue','#79C9D0')
stone=make_material('Warm stone','#A79C88')
volcanomat=make_material('Volcano terracotta','#5B4A44')
lava=make_material('Lava glow','#FF7A3D')
bsdf=lava.node_tree.nodes.get('Principled BSDF')
bsdf.inputs['Emission'].default_value=rgba('#FF7A3D')
bsdf.inputs['Emission Strength'].default_value=.35
ground=add_part('Top')
sides=add_part('Sides')
water=add_part('Water',joint=(5,-.15,5))
deco=add_part('Deco')

# Rounded-square perimeter, with ring heights gently varying on the shoulder.
perimeter=[]
for cx,cz,start in [(9,9,0),(-9,9,90),(-9,-9,180),(9,-9,270)]:
    for j in range(9):
        angle=math.radians(start+j*90/8)
        perimeter.append((cx+math.cos(angle),cz+math.sin(angle)))
    end=perimeter[-1]
    next_start={0:(-9,10),90:(-10,-9),180:(9,-10),270:(10,9)}[start]
    for j in range(1,9):
        t=j/9
        perimeter.append((end[0]*(1-t)+next_start[0]*t,end[1]*(1-t)+next_start[1]*t))
n=len(perimeter)
verts=[]
for ring,(scale,y) in enumerate([(.97,0),(1,-.20),(1,-.48),(.985,-.72)]):
    for i,(x,z) in enumerate(perimeter):
        wave=.045*math.sin(i*math.tau*5/n) if ring in [1,2] else 0
        verts.append((x*scale,y+wave,z*scale))
faces=[tuple(reversed(range(n))),tuple(3*n+i for i in range(n))]
faces += [(r*n+i,r*n+(i+1)%n,(r+1)*n+(i+1)%n,(r+1)*n+i) for r in range(3) for i in range(n)]
top=mesh('Wavy ground',verts,faces,grass,ground,False)
# Recalculate before the boolean so the lagoon subtracts correctly.
bpy.context.view_layer.objects.active=top
top.select_set(True)
bpy.ops.object.mode_set(mode='EDIT')
bpy.ops.mesh.select_all(action='SELECT')
bpy.ops.mesh.normals_make_consistent(inside=False)
bpy.ops.object.mode_set(mode='OBJECT')
bpy.ops.mesh.primitive_cylinder_add(vertices=80,radius=3.5,depth=3,location=xyz((5,.5,5)))
cutter=bpy.context.object
mod=top.modifiers.new('Recessed lagoon','BOOLEAN')
mod.operation='DIFFERENCE'
mod.solver='EXACT'
mod.object=cutter
apply_modifiers(top)
bpy.data.objects.remove(cutter,do_unlink=True)
rounded_box('Upper soil',(0,-1.12,0),(19.70,1.15,19.70),.18,soil,sides)
rounded_box('Clay layer',(0,-1.94,0),(19.55,.60,19.55),.17,clay,sides)
rounded_box('Lower soil',(0,-2.85,0),(19.4,1.30,19.4),.20,deep,sides)
rockbase=make_material('Rock base','#9A9AA6')
rounded_box('Rock base',(0,-3.70,0),(19.4,.60,19.4),.15,rockbase,sides)
# One exact flat disk: Water surface y=-.15, no raised bevel.
waterverts=[(5,-.15,5)]+[(5+3.5*math.cos(i*math.tau/80),-.15,5+3.5*math.sin(i*math.tau/80)) for i in range(80)]
mesh('Water surface',waterverts,[(0,i+1,(i+1)%80+1) for i in range(80)],watermat,water,False)

# Squat rounded volcano with an inset orange crater.
cone('Volcano',(-8,.70,-8),1.5,.58,1.4,volcanomat,deco,24,.18)
blob('Lava crater',(-8,1.39,-8),(.46,.045,.46),lava,deco,20,8)
for i,(x,z,scale) in enumerate([(-8,4,.65),(-8.4,5.2,.42),(8.4,-5.5,.64),(7.4,-7.3,.48),(-3.8,-8.6,.56)]):
    blob('Edge rock',(x,scale*.36,z),(scale,scale*.40,scale*.72),stone,deco,12,8)
finish_model()
deliver()
