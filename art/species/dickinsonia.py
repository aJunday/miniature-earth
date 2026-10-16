import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from lib.templates import *
animal('dickinsonia','lowcrawler',.3,height=True)
