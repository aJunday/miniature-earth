import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).resolve().parent/'species'/'philippineeagle.py'),run_name='__main__')
