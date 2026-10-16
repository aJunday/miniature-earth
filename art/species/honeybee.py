import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from lib.templates import *
bird('honeybee',0.35,height=True)
