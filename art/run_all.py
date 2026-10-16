"""Rebuild exactly the three approved-for-sampling assets and their contact sheet.

Usage: python3 art/run_all.py [--blender PATH] [--gpu-backend BACKEND]
Every render uses Cycles CPU, 32 samples, and denoising.
"""
import argparse, subprocess, sys
from pathlib import Path

base=Path(__file__).resolve().parent.parent
parser=argparse.ArgumentParser()
parser.add_argument('--blender',default='/Users/arnavjunday/Documents/Codex/2026-10-16/run-blender-in-background-mode-from/work/blender36/Blender/Blender.app/Contents/MacOS/Blender')
parser.add_argument('--gpu-backend',default='opengl',help='Optional Blender startup backend; rendering always uses Cycles CPU.')
args=parser.parse_args()
if not Path(args.blender).is_file():
    parser.error('Blender executable not found: '+args.blender+'; supply --blender with an existing executable.')
reports=base/'art/reports'
reports.mkdir(parents=True,exist_ok=True)
for name in ['build_island_jurassic','build_fern','build_stegosaurus','render_contact_sheet']:
    command=[args.blender,'--background','--factory-startup']
    if args.gpu_backend:
        command+=['--gpu-backend',args.gpu_backend]
    command+=['--python-exit-code','1','--python',str(base/'art'/f'{name}.py')]
    path=reports/f'{name}.log'
    print('RUN '+' '.join(command),flush=True)
    with path.open('w') as log:
        result=subprocess.run(command,stdout=log,stderr=subprocess.STDOUT)
    output=path.read_text()
    for line in output.splitlines():
        if line.startswith(('TRIANGLES','CONTACT_SHEET','Saved:')):
            print(line,flush=True)
    if result.returncode or 'Traceback (most recent call last)' in output:
        print(output[-6000:])
        sys.exit(result.returncode or 1)
(reports/'render_engine.txt').write_text('CYCLES CPU; samples=32; denoising=OPENIMAGEDENOISE\n')
print('All three models, icons, and contact sheet rendered with Cycles CPU',flush=True)
subprocess.run([sys.executable,str(base/'art/validate.py')],check=True)
subprocess.run([sys.executable,str(base/'art/inspect_all.py')],check=True)
