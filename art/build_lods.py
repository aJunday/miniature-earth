"""Generate distant-view meshes from the finished catalogue; preserve parts and vertex paint."""
import sys,json
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib.common import *
from lib import common as C
report=json.loads((BASE/'art/reports/lod.json').read_text()) if '--new-only' in sys.argv else {}
for path in sorted((BASE/'public/models').glob('org_*.glb')):
    if '--new-only' in sys.argv and (BASE/'public/models/lod'/path.name).exists(): continue
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(path))
    C.ROOT=bpy.data.objects.get('Root');C.PARTS=[o for o in C.ROOT.children if o.type=='MESH'];C.MODEL_ID=path.stem
    before=after=0
    for obj in C.PARTS:
        obj.data.calc_loop_triangles();before+=len(obj.data.loop_triangles)
        if len(obj.data.loop_triangles)>32:
            mod=obj.modifiers.new('Distant silhouette','DECIMATE');mod.ratio=.48
            apply_modifiers(obj)
        obj.data.calc_loop_triangles();after+=len(obj.data.loop_triangles)
    export_glb(BASE/'public/models/lod'/path.name)
    report[path.stem]={'full':before,'distant':after,'parts':[o.name for o in C.PARTS]}
(BASE/'art/reports/lod.json').write_text(json.dumps(report,indent=2)+'\n')
