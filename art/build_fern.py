import sys, math
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
from lib.common import *

clear_scene('org_fern',1500)
green=make_material('Fern green','#4E9A3A')
part=add_part('Foliage',joint=(0,0,0))
for j in range(7):
    angle=j*math.tau/7
    length=[.60,.54,.58,.51,.56,.53,.56][j]
    points=[]
    widths=[]
    for i in range(10):
        t=i/9
        distance=length*t
        points.append((math.sin(angle)*distance,.02+.40*math.sin(t*math.pi*.85),math.cos(angle)*distance))
        widths.append(.004+.012*math.sin(math.pi*t)**.8)
    widths[-1]=.001
    tapered_blade('Curved frond',points,widths,.009,green,part)
    # Six pairs of rounded pinnae per frond; one continuous silhouette.
    radial=Vector((math.sin(angle),0,math.cos(angle)))
    side=Vector((math.cos(angle),0,-math.sin(angle)))
    for k in range(6):
        t=.20+k*.12
        center=radial*(length*t)+Vector((0,.02+.40*math.sin(t*math.pi*.85),0))
        leaf_length=.23*(1-.65*t)
        for sign in [-1,1]:
            direction=(side*sign*.9+radial*.4+Vector((0,.22,0))).normalized()
            across=radial*.045*(1-.4*t)
            tip=center+direction*leaf_length
            mid=center+direction*leaf_length*.54
            vertices=[center,center+direction*leaf_length*.22+across*.75,center+direction*leaf_length*.50+across,center+direction*leaf_length*.78+across*.65,tip,center+direction*leaf_length*.78-across*.65,center+direction*leaf_length*.50-across,center+direction*leaf_length*.22-across*.75,mid+Vector((0,.009,0)),mid-Vector((0,.006,0))]
            faces=[(i,(i+1)%8,8) for i in range(8)]+[((i+1)%8,i,9) for i in range(8)]
            mesh('Pinna',vertices,faces,green,part)
blob('Crown',(0,.045,0),(.065,.045,.065),green,part,12,8)
finish_model(height=.6)
deliver()
