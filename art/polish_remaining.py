"""Rebuild the 44 non-showcase organisms through their own reproducible scripts."""
import json,runpy,sys
from pathlib import Path
BASE=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(BASE/'art'))
showcase=set('deer redfox rabbit honeybee seaturtle stegosaurus mammoth reeffish trilobite arthropleura fern oak'.split())
for species in json.loads((BASE/'src/sim/data/species.json').read_text()):
    if species['id'] in showcase:continue
    print('REFINE '+species['id'],flush=True)
    runpy.run_path(str(BASE/'art'/('build_'+species['id']+'.py')),run_name='__main__')
