"""Validate actual exported GLB data, hierarchy, dimensions, materials, and PNG alpha."""
import json, math, struct, zlib
from pathlib import Path

BASE=Path(__file__).resolve().parent.parent
import re
SPEC=(BASE/'AGENTS.md').read_text()
HEIGHTS={}
for line in SPEC.splitlines():
    cells=[v.strip() for v in line.split('|')]
    if len(cells)==13 and cells[1] not in ('id','---'):
        try: HEIGHTS['org_'+cells[1]]=float(cells[9])
        except ValueError: pass
SIZES={}
for line in SPEC.splitlines():
    if line.startswith('- ') and ' | ' in line:
        cells=line[2:].split(' | ')
        if len(cells)==8:
            SIZES['org_'+cells[0]]=float(cells[6])
EXPECTED={'island_'+era:['Top','Sides','Water','Deco'] for era in ['precambrian','jurassic','present']}
EXPECTED.update({'org_fern':['Foliage'],'org_stegosaurus':['Body','Head','Eye_L','Eye_R','Leg_FL','Leg_FR','Leg_BL','Leg_BR','Tail']})
PLANTS={'stromatolite','charnia','fern','cycad','conifer','grass','oak','wildflower','seagrass','elkhorncoral'}
BUDGETS={name:(15000 if name.startswith('island_') else 1500 if name[4:] in PLANTS else 3000) for name in set(EXPECTED)|set(HEIGHTS)|set(SIZES)}

def glb(path):
    raw=path.read_bytes()
    magic,version,length=struct.unpack_from('<4sII',raw)
    assert magic==b'glTF' and version==2 and length==len(raw)
    offset=12
    doc=blob=None
    while offset<len(raw):
        size,kind=struct.unpack_from('<I4s',raw,offset)
        data=raw[offset+8:offset+8+size]
        if kind==b'JSON': doc=json.loads(data)
        if kind==b'BIN\0': blob=data
        offset+=8+size
    return doc,blob

def identity():
    return [[float(i==j) for j in range(4)] for i in range(4)]

def multiply(a,b):
    return [[sum(a[i][k]*b[k][j] for k in range(4)) for j in range(4)] for i in range(4)]

def matrix(node):
    if 'matrix' in node:
        return [[node['matrix'][j*4+i] for j in range(4)] for i in range(4)]
    x,y,z,w=node.get('rotation',[0,0,0,1])
    m=[[1-2*(y*y+z*z),2*(x*y-z*w),2*(x*z+y*w),0],
       [2*(x*y+z*w),1-2*(x*x+z*z),2*(y*z-x*w),0],
       [2*(x*z-y*w),2*(y*z+x*w),1-2*(x*x+y*y),0],[0,0,0,1]]
    for i in range(3):
        m[i][3]=node.get('translation',[0,0,0])[i]
        for j in range(3): m[i][j]*=node.get('scale',[1,1,1])[j]
    return m

def accessor(doc,blob,index):
    a=doc['accessors'][index]
    v=doc['bufferViews'][a['bufferView']]
    count={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4}[a['type']]
    code={5126:'f',5125:'I',5123:'H',5121:'B'}[a['componentType']]
    fmt='<'+code*count
    stride=v.get('byteStride',struct.calcsize(fmt))
    offset=v.get('byteOffset',0)+a.get('byteOffset',0)
    return [struct.unpack_from(fmt,blob,offset+i*stride) for i in range(a['count'])]

def validate_png(path):
    raw=path.read_bytes()
    assert raw[:8]==b'\x89PNG\r\n\x1a\n'
    pos=8; data=b''
    while pos<len(raw):
        n=struct.unpack_from('>I',raw,pos)[0]
        kind=raw[pos+4:pos+8]
        payload=raw[pos+8:pos+8+n]
        if kind==b'IHDR': w,h,depth,color,_,_,interlace=struct.unpack('>IIBBBBB',payload)
        if kind==b'IDAT': data+=payload
        pos+=n+12
    assert (w,h,depth,color,interlace)==(256,256,8,6,0)
    pixels=zlib.decompress(data)
    prior=bytearray(w*4); alpha=[]
    def paeth(a,b,c):
        p=a+b-c; pa,pb,pc=abs(p-a),abs(p-b),abs(p-c)
        return a if pa<=pb and pa<=pc else b if pb<=pc else c
    for row in range(h):
        start=row*(w*4+1); filt=pixels[start]
        curr=bytearray(pixels[start+1:start+1+w*4])
        for i in range(len(curr)):
            a=curr[i-4] if i>=4 else 0; b=prior[i]; c=prior[i-4] if i>=4 else 0
            delta=[0,a,b,(a+b)//2,paeth(a,b,c)][filt]
            curr[i]=(curr[i]+delta)&255
        alpha.extend(curr[3::4]); prior=curr
    assert min(alpha)==0 and max(alpha)==255
    return {'width':w,'height':h,'alpha_range':[min(alpha),max(alpha)],'transparent_pixels':alpha.count(0)}

results={}
for name in sorted(BUDGETS):
    expected=EXPECTED.get(name)
    path=BASE/'public/models'/f'{name}.glb'
    if not path.exists():
        print('MISSING '+name); continue
    doc,blob=glb(path)
    assert not doc.get('cameras') and 'KHR_lights_punctual' not in doc.get('extensions',{})
    assert 'KHR_draco_mesh_compression' not in doc.get('extensionsUsed',[])
    assert not doc.get('textures')
    for mat in doc['materials']:
        pbr=mat['pbrMetallicRoughness']
        assert abs(pbr.get('roughnessFactor',1)-.7)<1e-5
        assert pbr.get('metallicFactor',1)==0
    names=[node.get('name') for node in doc['nodes']]
    if expected is not None: assert sorted(names)==sorted(['Root']+expected),names
    else:
        expected=[n for n in names if n!='Root']
        allowed={'Body','Head','Eye_L','Eye_R','Leg_FL','Leg_FR','Leg_BL','Leg_BR','Tail','Arm_L','Arm_R','Wing_L','Wing_R','Fin_L','Fin_R','Trunk','Foliage'}
        assert set(expected)<=allowed,names
        assert ('Foliage' in names) if name[4:] in PLANTS else {'Body','Head','Eye_L','Eye_R'}<=set(names)
    allpoints=[]; bypart={}; tree=[]; triangles=0
    def visit(index,parent,depth):
        global triangles
        node=doc['nodes'][index]
        world=multiply(parent,matrix(node))
        tree.append('  '*depth+node['name'])
        assert all(abs(s-1)<1e-5 for s in node.get('scale',[1,1,1]))
        if 'mesh' in node:
            points=[]
            for primitive in doc['meshes'][node['mesh']]['primitives']:
                assert primitive.get('mode',4)==4
                positions=accessor(doc,blob,primitive['attributes']['POSITION'])
                indices=accessor(doc,blob,primitive['indices'])
                assert all(0<=i[0]<len(positions) for i in indices)
                triangles+=len(indices)//3
                for p in positions:
                    assert all(math.isfinite(c) for c in p)
                    points.append(tuple(sum(world[i][j]*p[j] for j in range(3))+world[i][3] for i in range(3)))
            allpoints.extend(points); bypart[node['name']]=points
        for child in node.get('children',[]): visit(child,world,depth+1)
    scene=doc['scenes'][doc.get('scene',0)]
    assert len(scene['nodes'])==1 and doc['nodes'][scene['nodes'][0]]['name']=='Root'
    root=doc['nodes'][scene['nodes'][0]]
    assert len(root.get('children',[]))==len(expected)
    assert all(abs(v)<1e-6 for v in root.get('translation',[0,0,0]))
    for index in scene['nodes']: visit(index,identity(),0)
    low=[min(p[i] for p in allpoints) for i in range(3)]
    high=[max(p[i] for p in allpoints) for i in range(3)]
    assert triangles<=BUDGETS[name]
    if name.startswith('org_'):
        assert abs(low[1])<=.01
        dimension=max(high[i]-low[i] for i in range(3)) if name in SIZES else high[1]-low[1]
        target=SIZES.get(name,HEIGHTS.get(name))
        assert abs(dimension/target-1)<.05,(name,dimension,target)
        if name=='org_stegosaurus':
            mean=lambda part:sum(p[2] for p in bypart[part])/len(bypart[part])
            assert mean('Head')>mean('Body')>mean('Tail'), 'Wrong forward direction'
    else:
        assert all(abs(low[i]+10)<1e-5 and abs(high[i]-10)<1e-5 for i in [0,2])
        assert -.02<=max(p[1] for p in bypart['Top'])<=.05
        assert abs(low[1]+4)<1e-5
        assert all(abs(p[1]+.15)<1e-5 for p in bypart['Water'])
        assert all(abs(min(p[i] for p in bypart['Water'])-1.5)<1e-5 and abs(max(p[i] for p in bypart['Water'])-8.5)<1e-5 for i in [0,2])
    png=validate_png(BASE/'public/icons'/f'{name}.png')
    results[name]={'triangles':triangles,'budget':BUDGETS[name],'bounds_min':low,'bounds_max':high,'height':high[1]-low[1],'node_tree':tree,'icon':png}
    print(f'PASS {name}: {triangles} triangles / {BUDGETS[name]}; bounds {low} to {high}; height {high[1]-low[1]:.6f}')
    print('\n'.join(tree))
    print(f'PASS icon RGBA 256x256: alpha {png["alpha_range"]}, transparent pixels {png["transparent_pixels"]}')
(BASE/'art/reports/validation.json').write_text(json.dumps(results,indent=2)+'\n')
manifest=[{'id':k.removeprefix('org_'),'file':'/models/'+k+'.glb','icon':'/icons/'+k+'.png','heightUnits':v['height'],'triangles':v['triangles'],'parts':[n.strip() for n in v['node_tree']]} for k,v in results.items()]
(BASE/'public/models/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('PASS built-model contract; MISSING entries remain explicit until Phase I.')
