"""Run the requested glTF Transform inspect plus Khronos validation on every GLB."""
import os, subprocess, sys
from pathlib import Path

base=Path(__file__).resolve().parent.parent
env=dict(os.environ,npm_config_cache=str(base/'art/.npm-cache'),npm_config_prefer_offline='true',NO_COLOR='1')
for path in sorted((base/'public/models').glob('*.glb')):
    for operation,suffix in [('inspect','inspect'),('validate','gltf_validate')]:
        log=base/'art/reports'/f'{path.stem}_{suffix}.txt'
        command=['npx','--yes','@gltf-transform/cli@4.5.1',operation,str(path)]
        with log.open('w') as output:
            result=subprocess.run(command,env=env,stdout=output,stderr=subprocess.STDOUT)
        report=log.read_text()
        if result.returncode or (operation=='validate' and 'No errors found.' not in report):
            print('FAIL '+' '.join(command)+'\n'+report)
            sys.exit(1)
        print(f'PASS {operation}: {path.name}',flush=True)
