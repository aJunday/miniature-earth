from PIL import Image, ImageDraw
from pathlib import Path
import sys
stage=sys.argv[1];root=Path('qa/shots/readability')/stage
names=['modern','jurassic','cretaceous80','cretaceous','cambrian520','cambrian','pleistocene','exploit2100','protect2100']
out=Image.new('RGB',(1440,972),'#f3efe6');d=ImageDraw.Draw(out)
for i,n in enumerate(names):
 p=root/(n+'.png')
 if p.exists():
  im=Image.open(p).convert('RGB');im.thumbnail((480,300));x=(i%3)*480;y=(i//3)*324;out.paste(im,(x,y+24));d.text((x+8,y+6),stage+' / '+n,fill='#263238')
out.save(root/'sheet.jpg',quality=92)
