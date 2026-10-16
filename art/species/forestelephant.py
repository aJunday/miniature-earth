import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from lib.templates import *
pachyderm('forestelephant',2.2,height=False)
