"""Toy model helpers. Public coordinates are glTF (X right, Y up, Z forward).

Blender scripts run with --background --factory-startup --python. All authored
materials are solid colours. Each exported named part is a single mesh on Root.
"""
import math
from pathlib import Path
import bpy
from mathutils import Vector

BASE = Path(__file__).resolve().parents[2]
ROOT = None
PARTS = []
MODEL_ID = ''
BUDGET = 0

def xyz(v):
    return Vector((v[0], -v[2], v[1]))

def linear(c):
    return c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4

def rgba(hex):
    h = hex.lstrip('#')
    return tuple(linear(int(h[i:i+2], 16) / 255) for i in (0, 2, 4)) + (1,)

def make_material(name, hex):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = rgba(hex)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    bsdf.inputs['Base Color'].default_value = mat.diffuse_color
    bsdf.inputs['Roughness'].default_value = .7
    bsdf.inputs['Metallic'].default_value = 0
    return mat

def clear_scene(model_id, budget):
    global ROOT, PARTS, MODEL_ID, BUDGET
    bpy.ops.wm.read_factory_settings(use_empty=True)
    PARTS, MODEL_ID, BUDGET = [], model_id, budget
    ROOT = bpy.data.objects.new('Root', None)
    bpy.context.collection.objects.link(ROOT)
    ROOT['model_id'] = model_id
    ROOT['forward'] = '+Z (glTF)'
    ROOT['triangle_budget'] = budget
    return ROOT

def add_part(name, parent=None, joint=(0, 0, 0)):
    part = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(part)
    part.parent = parent or ROOT
    part.location = xyz(joint)
    PARTS.append(part)
    bpy.context.view_layer.update()
    return part

def attach(obj, name, parent, mat=None, smooth=True):
    obj.name = 'geo_' + name
    matrix = obj.matrix_world.copy()
    obj.parent = parent
    obj.matrix_world = matrix
    if mat:
        obj.data.materials.append(mat)
    if obj.type == 'MESH':
        for face in obj.data.polygons:
            face.use_smooth = smooth
    return obj

def blob(name, pos, size, mat, part, segments=20, rings=12):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, location=xyz(pos))
    obj = bpy.context.object
    obj.scale = (size[0], size[2], size[1])
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return attach(obj, name, part, mat)

def mesh(name, vertices, faces, mat, part, smooth=True):
    data = bpy.data.meshes.new(name)
    data.from_pydata([xyz(v) for v in vertices], [], faces)
    data.update()
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    return attach(obj, name, part, mat, smooth)

def rounded_box(name, pos, size, bevel, mat, part, segments=3):
    bpy.ops.mesh.primitive_cube_add(size=1, location=xyz(pos))
    obj = bpy.context.object
    obj.scale = (size[0], size[2], size[1])
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    mod = obj.modifiers.new('Rounded edges', 'BEVEL')
    mod.width = bevel
    mod.segments = segments
    return attach(obj, name, part, mat, False)

def cone(name, pos, radius, top_radius, depth, mat, part, vertices=20, bevel=.04):
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=radius, radius2=top_radius, depth=depth, location=xyz(pos))
    obj = bpy.context.object
    if bevel:
        mod = obj.modifiers.new('Soft rim', 'BEVEL')
        mod.width = bevel
        mod.segments = 3
    return attach(obj, name, part, mat)

def cylinder(name, pos, radius, depth, mat, part, vertices=32, bevel=.03):
    return cone(name, pos, radius, radius, depth, mat, part, vertices, bevel)

def capsule(name, start, end, radius, mat, part, segments=12, cap_steps=4):
    a, b = Vector(start), Vector(end)
    axis = (b-a).normalized()
    helper = Vector((1,0,0)) if abs(axis.x) < .8 else Vector((0,0,1))
    u = axis.cross(helper).normalized()
    v = axis.cross(u).normalized()
    rings = []
    for j in range(cap_steps+1):
        t = -math.pi/2 + (math.pi/2)*j/cap_steps
        rings.append((a+axis*(radius*math.sin(t)), max(.0001, radius*math.cos(t))))
    for j in range(cap_steps+1):
        t = (math.pi/2)*j/cap_steps
        rings.append((b+axis*(radius*math.sin(t)), max(.0001, radius*math.cos(t))))
    verts = [c+r*(math.cos(k*2*math.pi/segments)*u+math.sin(k*2*math.pi/segments)*v) for c,r in rings for k in range(segments)]
    faces = [(j*segments+k, j*segments+(k+1)%segments, (j+1)*segments+(k+1)%segments, (j+1)*segments+k) for j in range(len(rings)-1) for k in range(segments)]
    faces += [tuple(reversed(range(segments))), tuple((len(rings)-1)*segments+k for k in range(segments))]
    return mesh(name, verts, faces, mat, part)

def tapered_blade(name, points, widths, thickness, mat, part):
    """Closed rounded elliptical sweep with taper and a curved centreline."""
    verts, faces, n = [], [], 8
    for i, p in enumerate(points):
        tangent = Vector(points[min(i+1,len(points)-1)])-Vector(points[max(i-1,0)])
        side = tangent.cross(Vector((0,1,0)))
        if side.length < .001:
            side = Vector((1,0,0))
        side.normalize()
        normal = side.cross(tangent).normalized()
        for k in range(n):
            angle = k*math.tau/n
            verts.append(Vector(p)+side*widths[i]*math.cos(angle)+normal*thickness*max(.1,widths[i]/max(widths))*math.sin(angle))
    for i in range(len(points)-1):
        for k in range(n):
            faces.append((i*n+k,i*n+(k+1)%n,(i+1)*n+(k+1)%n,(i+1)*n+k))
    faces += [tuple(reversed(range(n))),tuple((len(points)-1)*n+k for k in range(n))]
    return mesh(name, verts, faces, mat, part)

def stroke(name, points, radius, mat, part):
    curve = bpy.data.curves.new(name, 'CURVE')
    curve.dimensions = '3D'
    curve.resolution_u = 12
    curve.bevel_depth = radius
    curve.bevel_resolution = 2
    spline = curve.splines.new('BEZIER')
    spline.bezier_points.add(len(points)-1)
    for bp, point in zip(spline.bezier_points, points):
        bp.co = xyz(point)
        bp.handle_left_type = bp.handle_right_type = 'AUTO'
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    return attach(obj, name, part, mat)

def apply_modifiers(obj):
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    if obj.type == 'CURVE':
        bpy.ops.object.convert(target='MESH')
    for mod in list(obj.modifiers):
        bpy.ops.object.modifier_apply(modifier=mod.name)

def fit_height(height):
    """Rescale authored geometry and its joint positions before final joining."""
    bpy.context.view_layer.update()
    children = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    coords = [o.matrix_world @ Vector(c) for o in children for c in o.bound_box]
    low, high = min(p.z for p in coords), max(p.z for p in coords)
    factor = height/(high-low)
    for obj in children:
        matrix = obj.matrix_world.copy()
        for vert in obj.data.vertices:
            w = matrix @ vert.co
            w = Vector((w.x*factor,w.y*factor,(w.z-low)*factor))
            vert.co = matrix.inverted() @ w
    for part in PARTS:
        old = part.matrix_world.translation.copy()
        matrices = {obj:obj.matrix_world.copy() for obj in part.children}
        part.location = (old.x*factor,old.y*factor,(old.z-low)*factor)
        bpy.context.view_layer.update()
        for obj,matrix in matrices.items():
            obj.matrix_world = matrix

def finish_model(height=None):
    global PARTS
    for obj in list(bpy.context.scene.objects):
        if obj.type in {'MESH','CURVE'}:
            apply_modifiers(obj)
    # Collapse within each material/part before joining; retain the animated joints.
    meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
    total=sum(len(o.data.loop_triangles) or (o.data.calc_loop_triangles() or len(o.data.loop_triangles)) for o in meshes)
    if total>BUDGET:
        ratio=BUDGET*.92/total
        for obj in meshes:
            mod=obj.modifiers.new('Silhouette budget','DECIMATE')
            mod.ratio=ratio
            apply_modifiers(obj)
    if height is not None:
        fit_height(height)
    final_parts=[]
    for part in PARTS:
        name, joint = part.name, part.matrix_world.translation.copy()
        children = [o for o in part.children if o.type == 'MESH']
        if not children:
            raise RuntimeError('Empty part: '+name)
        bpy.ops.object.select_all(action='DESELECT')
        for obj in children:
            obj.select_set(True)
        bpy.context.view_layer.objects.active = children[0]
        bpy.ops.object.join()
        obj = bpy.context.object
        matrix = obj.matrix_world.copy()
        obj.parent = ROOT
        obj.matrix_world = matrix
        bpy.data.objects.remove(part, do_unlink=True)
        obj.name = name
        bpy.context.scene.cursor.location = joint
        bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
        bpy.ops.object.mode_set(mode='EDIT')
        bpy.ops.mesh.select_all(action='SELECT')
        bpy.ops.mesh.normals_make_consistent(inside=False)
        bpy.ops.object.mode_set(mode='OBJECT')
        final_parts.append(obj)
    PARTS = final_parts
    count=0
    for obj in PARTS:
        obj.data.calc_loop_triangles()
        count += len(obj.data.loop_triangles)
    print(f'TRIANGLES {MODEL_ID}: {count} / {BUDGET}', flush=True)
    assert count <= BUDGET, f'Triangle budget exceeded: {count} > {BUDGET}'
    return count

def export_glb(path):
    path=Path(path)
    path.parent.mkdir(parents=True,exist_ok=True)
    bpy.ops.object.select_all(action='DESELECT')
    ROOT.select_set(True)
    for obj in PARTS:
        obj.select_set(True)
    bpy.ops.export_scene.gltf(filepath=str(path),export_format='GLB',use_selection=True,
        export_yup=True,export_apply=True,export_cameras=False,export_lights=False,export_texcoords=False,
        export_draco_mesh_compression_enable=False,export_extras=True)

def bounds(objects):
    bpy.context.view_layer.update()
    coords=[o.matrix_world @ Vector(c) for o in objects if o.type == 'MESH' for c in o.bound_box]
    return Vector(tuple(min(p[i] for p in coords) for i in range(3))),Vector(tuple(max(p[i] for p in coords) for i in range(3)))

def setup_render(width, height, transparent=True):
    scene=bpy.context.scene
    scene.render.engine='CYCLES'
    scene.cycles.device='CPU'
    scene.cycles.samples=32
    scene.cycles.use_denoising=True
    scene.cycles.denoiser='OPENIMAGEDENOISE'
    print(f'RENDER CYCLES CPU samples=32 denoising=OPENIMAGEDENOISE transparent={transparent}',flush=True)
    scene.render.resolution_x=width
    scene.render.resolution_y=height
    scene.render.resolution_percentage=100
    scene.render.film_transparent=transparent
    scene.render.image_settings.file_format='PNG'
    scene.render.image_settings.color_mode='RGBA'
    scene.view_settings.view_transform='Standard'
    scene.view_settings.look='None'
    scene.view_settings.exposure=0
    scene.view_settings.gamma=1
    world=bpy.data.worlds.new('Studio world')
    world.use_nodes=True
    world.node_tree.nodes['Background'].inputs['Color'].default_value=(1,1,1,1)
    world.node_tree.nodes['Background'].inputs['Strength'].default_value=.65
    scene.world=world
    return scene

def area(name, loc, target, power, size):
    bpy.ops.object.light_add(type='AREA',location=loc)
    light=bpy.context.object
    light.name=name
    light.data.energy=power
    light.data.shape='DISK'
    light.data.size=size
    light.rotation_euler=(Vector(target)-light.location).to_track_quat('-Z','Y').to_euler()
    return light

def studio_lights(center, span):
    center=Vector(center)
    area('Key',center+Vector((-1,-1.5,2))*span,center,15*span*span,1.6*span)
    area('Fill',center+Vector((1.5,-.5,1))*span,center,7*span*span,1.4*span)
    area('Rim',center+Vector((0,1.5,1.7))*span,center,11*span*span,1.3*span)

def render_icon(path):
    scene=setup_render(256,256,True)
    low,high=bounds(PARTS)
    center=(low+high)/2
    span=max(high-low)
    bpy.ops.object.camera_add(location=center+Vector((1,-1.6,1.15)).normalized()*span*3)
    camera=bpy.context.object
    camera.rotation_euler=(center-camera.location).to_track_quat('-Z','Y').to_euler()
    camera.data.type='ORTHO'
    rotation=camera.rotation_euler.to_matrix().transposed()
    coords=[rotation@(o.matrix_world@v.co-center) for o in PARTS for v in o.data.vertices]
    projected=max(max(v.x for v in coords)-min(v.x for v in coords),max(v.y for v in coords)-min(v.y for v in coords))
    midpoint=Vector(((max(v.x for v in coords)+min(v.x for v in coords))/2,(max(v.y for v in coords)+min(v.y for v in coords))/2,0))
    camera.location+=rotation.transposed()@midpoint
    camera.data.ortho_scale=projected/.80
    scene.camera=camera
    studio_lights(center,span)
    path=Path(path)
    path.parent.mkdir(parents=True,exist_ok=True)
    scene.render.filepath=str(path)
    bpy.ops.render.render(write_still=True)

def bake_palette():
    """Bake solid paint into corner colours, retaining one material per animated joint."""
    surface=make_material('Painted miniature','#FFFFFF')
    node=surface.node_tree.nodes.new('ShaderNodeVertexColor');node.layer_name='Paint'
    surface.node_tree.links.new(node.outputs['Color'],surface.node_tree.nodes.get('Principled BSDF').inputs['Base Color'])
    for obj in PARTS:
        attr=obj.data.color_attributes.get('Paint') or obj.data.color_attributes.new(name='Paint',type='FLOAT_COLOR',domain='CORNER')
        for poly in obj.data.polygons:
            color=obj.data.materials[poly.material_index].diffuse_color
            for li in poly.loop_indices:attr.data[li].color=color
            poly.material_index=0
        obj.data.materials.clear();obj.data.materials.append(surface)

def deliver():
    export_glb(BASE/'public/models'/f'{MODEL_ID}.glb')
    render_icon(BASE/'public/icons'/f'{MODEL_ID}.png')
