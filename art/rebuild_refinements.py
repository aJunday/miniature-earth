import subprocess
from pathlib import Path
base=Path(__file__).resolve().parent
binary='/Users/arnavjunday/Documents/Codex/2026-10-16/run-blender-in-background-mode-from/work/blender36/Blender/Blender.app/Contents/MacOS/Blender'
for name in ['seaotter','contact']:
 script='render_contact_sheet.py' if name=='contact' else 'build_'+name+'.py'
 with (base/'reports'/('refine_'+name+'.log')).open('w') as f:subprocess.run([binary,'--background','--factory-startup','--gpu-backend','opengl','--python-exit-code','1','--python',str(base/script)],stdout=f,stderr=subprocess.STDOUT,check=True)
 print('PASS refined '+name,flush=True)
