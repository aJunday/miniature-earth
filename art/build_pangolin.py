import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).resolve().parent/'species'/'pangolin.py'),run_name='__main__')
