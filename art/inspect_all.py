"""Run the requested glTF Transform inspect plus Khronos validation on every GLB."""
import os, subprocess, sys
from pathlib import Path

base=Path(__file__).resolve().parent.parent
env=dict(os.environ,npm_config_cache=str(base/'art/.npm-cache'),npm_config_prefer_offline='true',NO_COLOR='1')
folder=base/'public/models/lod' if '--lod' in sys.argv else base/'public/models'
for path in sorted(folder.glob('*.glb')):
    if '--history' in sys.argv and path.stem[4:] not in ['anomalocaris','ammonite','dimetrodon','triceratops','pteranodon','groundsloth','lycophyte','horsetail']: continue
    for operation,suffix in [('inspect','inspect'),('validate','gltf_validate')]:
        log=base/'art/reports'/f'{path.stem}_{"lod_" if "--lod" in sys.argv else ""}{suffix}.txt'
        command=['npx','--yes','@gltf-transform/cli@4.5.1',operation,str(path)]
        with log.open('w') as output:
            result=subprocess.run(command,env=env,stdout=output,stderr=subprocess.STDOUT)
        report=log.read_text()
        if result.returncode or (operation=='validate' and 'No errors found.' not in report):
            print('FAIL '+' '.join(command)+'\n'+report)
            sys.exit(1)
        print(f'PASS {operation}: {path.name}',flush=True)
