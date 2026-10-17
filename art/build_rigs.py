"""Reusable deform rigs and authored blended actions for every mobile catalogue animal.
Existing joint meshes and vertex colours are preserved; Body/Head share a neck
transition, and each appendage has a base and tip bone with graded skin weights.
"""
import bpy, json, math, sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from normalize_rigs import normalize
from pathlib import Path
from mathutils import Vector
BASE=Path(__file__).resolve().parents[1]
out=BASE/'public/models/rigged'; out.mkdir(exist_ok=True)
report=json.loads((BASE/'art/reports/rigs.json').read_text()) if '--new-only' in sys.argv else []
for species in json.loads((BASE/'src/sim/data/species.json').read_text()):
    ident=species['id']
    if '--new-only' in sys.argv and (out/f'org_{ident}.glb').exists(): continue
    if species['diet'] in ('producer','decomposer') or ident in ('elkhorncoral','charnia'): continue
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(BASE/f'public/models/org_{ident}.glb'))
    meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
    parts={o.name:o.matrix_world.copy() for o in meshes}
    arm=bpy.data.armatures.new('Skeleton'); rig=bpy.data.objects.new('Rig',arm); bpy.context.collection.objects.link(rig)
    bpy.context.view_layer.objects.active=rig; rig.select_set(True)
    for o in meshes: o.select_set(False)
    bpy.ops.object.mode_set(mode='EDIT')
    root=arm.edit_bones.new('RootJoint'); root.head=(0,0,0); root.tail=(0,0,.1)
    for o in meshes:
        b=arm.edit_bones.new(o.name+'Joint'); b.head=parts[o.name].translation; b.tail=b.head+Vector((0,0,max(.03,species['height']*.15))); b.parent=root
    for o in meshes:
        b=arm.edit_bones[o.name+'Joint']
        if o.name.startswith('Eye') and 'HeadJoint' in arm.edit_bones: b.parent=arm.edit_bones['HeadJoint']
        elif o.name!='Body' and 'BodyJoint' in arm.edit_bones: b.parent=arm.edit_bones['BodyJoint']
        if o.name.startswith(('Tail','Leg','Fin','Wing')):
            points=[parts[o.name]@v.co for v in o.data.vertices]
            far=max(points,key=lambda p:(p-b.head).length)
            if (far-b.head).length>.01:
                b.tail=b.head.lerp(far,.55)
                tip=arm.edit_bones.new(o.name+'Tip'); tip.head=b.tail; tip.tail=far; tip.parent=b; tip.use_connect=True
    bpy.ops.object.mode_set(mode='OBJECT')
    for o in meshes:
        world=o.matrix_world.copy(); o.parent=rig; o.matrix_world=world
        group=o.vertex_groups.new(name=o.name+'Joint'); tip=arm.bones.get(o.name+'Tip')
        tipgroup=o.vertex_groups.new(name=tip.name) if tip else None
        base=arm.bones[o.name+'Joint'].head_local
        length=(tip.tail_local-base).length if tip else 1
        for v in o.data.vertices:
            w=max(0,min(1,((world@v.co-base).length/length-.25)/.65)) if tip else 0
            group.add([v.index],1-w,'REPLACE')
            if tipgroup: tipgroup.add([v.index],w,'REPLACE')
        mod=o.modifiers.new('Deform','ARMATURE');mod.object=rig
        if o.name=='Body' and ident in ['rabbit','deer','redfox','mammoth']:
            o.shape_key_add(name='Basis'); key=o.shape_key_add(name='Insulation')
            for v in key.data: v.co.x*=1.12;v.co.y*=1.12;v.co.z*=1.05
    rig.animation_data_create()
    actions=['Idle','Walk','Run','Forage','Rest','Swim','Fly','Birth','Death']
    for name in actions:
        action=bpy.data.actions.new(name);rig.animation_data.action=action
        for frame in [1,7,13,19,25]:
            phase=(frame-1)/24*math.tau
            for bone in rig.pose.bones:
                bone.rotation_mode='XYZ'; bone.rotation_euler=(0,0,0);bone.scale=(1,1,1)
                n=bone.name
                if n.startswith('Body'):
                    bone.scale.z=1+math.sin(phase)*.012
                    if name=='Birth':bone.scale=(.05+(frame-1)/24*.95,)*3
                    if name=='Death':bone.rotation_euler.y=(frame-1)/24*math.pi*.4
                if n.startswith('Leg') and name in ['Walk','Run']:
                    bone.rotation_euler.x=math.sin(phase+(0 if ('FL' in n or 'BR' in n) else math.pi))*(.35 if name=='Walk' else .6)
                if n.startswith(('Tail','Fin')) and name in ['Swim','Walk','Run','Idle']:bone.rotation_euler.z=math.sin(phase+(.8 if 'Tip' in n else 0))*.25
                if n.startswith('Wing') and name=='Fly':bone.rotation_euler.y=math.sin(phase)*.7*(1 if '_L' in n else -1)
                if n.startswith('Head') and name=='Forage':bone.rotation_euler.x=.3+math.sin(phase)*.1
                if n.startswith('Body') and name=='Rest':bone.scale.z=.92
                bone.keyframe_insert('rotation_euler',frame=frame);bone.keyframe_insert('scale',frame=frame)
        track=rig.animation_data.nla_tracks.new();track.name=name;track.strips.new(name,1,action)
    rig.animation_data.action=None
    for track in rig.animation_data.nla_tracks:track.mute=True
    bpy.context.scene.frame_set(1)
    for bone in rig.pose.bones:bone.rotation_euler=(0,0,0);bone.scale=(1,1,1)
    # Export NLA tracks requires unmuted strips; reset pose above preserves bind pose.
    for track in rig.animation_data.nla_tracks:track.mute=False
    bpy.ops.export_scene.gltf(filepath=str(out/f'org_{ident}.glb'),export_format='GLB',export_yup=True,export_animations=True,export_nla_strips=True,export_skins=True,export_morph=True,export_cameras=False,export_lights=False)
    normalize(out/f'org_{ident}.glb')
    report.append({'id':ident,'bones':len(arm.bones),'skins':len(meshes),'actions':actions})
(BASE/'art/reports/rigs.json').write_text(json.dumps(report,indent=2))
print('RIGGED',len(report))
