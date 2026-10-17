import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib.regional import build
for ident in ['bison','graywolf','beaver','menhaden']:build(ident)
