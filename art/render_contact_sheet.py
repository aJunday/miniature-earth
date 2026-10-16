import sys,math
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib.common import *

bpy.ops.wm.read_factory_settings(use_empty=True)
paths=sorted((BASE/'public/models').glob('*.glb'))
columns=min(6,len(paths));rows=math.ceil(len(paths)/columns)
scene=setup_render(1600,max(650,rows*210),False)
paths=sorted((BASE/'public/models').glob('*.glb'))
right=Vector((.841,.541,0))
forward=Vector((.541,-.841,0))
groups=[]
for index,path in enumerate(paths):
    before=set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=str(path))
    objects=set(bpy.data.objects)-before
    meshes=[o for o in objects if o.type=='MESH']
    low,high=bounds(meshes)
    center=(low+high)/2
    width=max(high.x-low.x,high.y-low.y)
    scale=3.05/width if 'island' in path.stem else min(2.75/width,1.8/(high.z-low.z))
    position=right*((index%columns-(columns-1)/2)*3.8)+forward*((index//columns-(rows-1)/2)*5.8)
    for obj in meshes:
        matrix=obj.matrix_world.copy()
        obj.parent=None
        obj.matrix_world=matrix
        for vert in obj.data.vertices:
            point=matrix@vert.co
            point=Vector(((point.x-center.x)*scale,(point.y-center.y)*scale,(point.z-low.z)*scale))+position
            vert.co=point
        obj.matrix_world.identity()
    groups.append((path.stem,position))

floor=make_material('Neutral cream floor','#F3EFE6')
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.02))
bpy.context.object.data.materials.append(floor)
target=Vector((0,0,.6))
bpy.ops.object.camera_add(location=target+Vector((27,-42,30)))
camera=bpy.context.object
camera.rotation_euler=(target-camera.location).to_track_quat('-Z','Y').to_euler()
camera.data.type='ORTHO'
camera.data.ortho_scale=max(columns*4.1/(1600/max(650,rows*210)),rows*3.4+4)
scene.camera=camera
ink=make_material('Label ink','#465248')
for label,position in groups:
    bpy.ops.object.text_add(location=position+forward*1.8+Vector((0,0,.04)))
    text=bpy.context.object
    text.name='Label '+label
    text.rotation_euler=camera.rotation_euler
    text.data.body=label
    text.data.align_x='CENTER'
    text.data.size=.20
    text.data.extrude=0
    text.data.materials.append(ink)
studio_lights(Vector((0,0,0)),6)
scene.render.filepath=str(BASE/'art/previews/contact_sheet.png')
bpy.ops.render.render(write_still=True)
print('CONTACT_SHEET '+scene.render.filepath,flush=True)
