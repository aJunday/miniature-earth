"""Create readable review sheets from actual browser captures; run after QA."""
from PIL import Image, ImageDraw
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
shots=root/'qa/shots/biodiversity';out=root/'qa/shots/biodiversity-review';out.mkdir(exist_ok=True)
dates=json.loads((root/'qa/biodiversity-after.json').read_text())
sets={'dates':[(shots/f'{i}.png',f'{i}: {row["year"]:,} | {row["era"]}') for i,row in enumerate(dates)],'models':[(p,p.stem.removeprefix('model-')) for p in sorted(shots.glob('model-*.png'))]}
for label,files in sets.items():
 for start in range(0,len(files),6):
  sheet=Image.new('RGB',(1440,1560),'#f3efe6');draw=ImageDraw.Draw(sheet)
  for i,(path,text) in enumerate(files[start:start+6]):
   im=Image.open(path).convert('RGB');im.thumbnail((720,500));x=(i%2)*720;y=(i//2)*520
   sheet.paste(im,(x,y+20));draw.text((x+8,y+3),text,fill='#263238')
  sheet.save(out/f'{label}-{start//6}.jpg',quality=90)
print(out)
