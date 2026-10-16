"""Build the full model contract, with validation after each group."""
import subprocess,sys,json
from pathlib import Path
BASE=Path(__file__).resolve().parent.parent
BLENDER='/Users/arnavjunday/Documents/Codex/2026-10-16/run-blender-in-background-mode-from/work/blender36/Blender/Blender.app/Contents/MacOS/Blender'
def run(script):
 path=BASE/'art'/script;log=BASE/'art/reports'/(path.stem+'.log')
 with log.open('w') as f:r=subprocess.run([BLENDER,'--background','--factory-startup','--gpu-backend','opengl','--python-exit-code','1','--python',str(path)],stdout=f,stderr=subprocess.STDOUT)
 if r.returncode:print(log.read_text()[-3000:],flush=True);raise RuntimeError(script)
 print('PASS '+script+' '+next((s for s in log.read_text().splitlines() if s.startswith('TRIANGLES')),''),flush=True)
hero='amurleopard tiger snowleopard redpanda giantpanda polarbear sumatranorangutan asianelephant kakapo axolotl seaturtle bluewhale mammoth dodo thylacine'.split()
species=json.loads((BASE/'src/sim/data/species.json').read_text())
groups=[['island_precambrian','island_present'],['stromatolite','dickinsonia','cycad','conifer','allosaurus','grass','oak','rabbit','redfox'],hero,[s['id'] for s in species if s.get('group') and s['id'] not in hero],['charnia','brachiosaurus','wildflower','seagrass','deer','honeybee']]
for i,group in enumerate(groups):
 print('GROUP '+str(i+1),flush=True)
 for id in group:run('build_'+id+'.py')
 subprocess.run([sys.executable,str(BASE/'art/validate.py')],check=True,stdout=(BASE/'art/reports'/f'group_{i+1}_validation.txt').open('w'))
 run('render_contact_sheet.py')
print('PASS all build groups',flush=True)
