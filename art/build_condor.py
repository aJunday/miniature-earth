import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).resolve().parent/'species'/'condor.py'),run_name='__main__')
