"""Reviewed higher-group display windows; no single species is extrapolated across time."""
import json,pathlib
root=pathlib.Path(__file__).resolve().parents[1];p=root/'src/sim/data/metadata.json';m=json.loads(p.read_text());review=[]
configs=[('fern',['polypodiopsida','ferns-mesozoic'],{'Clathropteris','Cladophlebis','Coniopteris','Gleichenites','Laccopteris','Phlebopteris','Danaeopsis','Dryopteris','Dryopterites','Asplenium','Thelypteris','Osmunda','Acrostichopteris'}),('conifer',['pinales','conifers-mesozoic'],{'Pinus','Picea','Abies','Tsuga','Larix','Pseudotsuga','Taxodiaceae','Elatides','Xenoxylon','Brachyphyllum','Pagiophyllum','Araucarioxylon','Agathoxylon','Voltzia','Podozamites','Cheirolepidiaceae','Coniferophyta','Pelourdea'}),('cycad',['cycadales'],{'Leptocycas','Cycadaceae','Cycadales','Zamia'})]
for ident,files,allowed in configs:
 accepted=[];windows=[]
 for filename in files:
  raw=json.loads((root/f'qa/evidence/biodiversity/{filename}.json').read_text());records=raw['data'].get('records',[])
  for r in records:
   a,b=r.get('eag',0),r.get('lag',-1)
   if r.get('tna','').split(' ')[0] not in allowed or not 0<=b<=a<=360 or a-b>25:continue
   accepted.append({'occurrence':r['oid'],'taxon':r['tna'],'oldMa':a,'youngMa':b,'source':filename})
   windows.append(dict(region='North America',first=-a*1e6,last=2026 if b==0 and ident=='conifer' else -b*1e6))
  if not any(v['url']==raw['url'] for v in m[ident]['sources']):m[ident]['sources'].append(dict(field='dated regional group coverage',url=raw['url'],label='PBDB screened North American plant records; CC BY 4.0, original references retained'))
 m[ident]['regionalCoverage']=list({(w['region'],w['first'],w['last']):w for w in m[ident].get('regionalCoverage',[])+windows}.values())
 note='Fossil display uses explicitly labeled higher-group reconstructions with differing constituent taxa across time. Only reviewed macrofossil genera or unambiguous group identifications are used here; aquatic ferns, horsetail records returned under Polypodiopsida, dispersed spores and ambiguous cycad-like foliage were excluded. Occurrence deposit envelopes are not exact species lifespans or abundance estimates.'
 if note not in m[ident]['notes']:m[ident]['notes'].append(note)
 if ident=='conifer':m[ident]['notes']=[n for n in m[ident]['notes'] if not n.startswith('Represents a genus;')]
 m[ident]['checked']='2026-10-17'
 review.append(dict(id=ident,accepted=accepted,windows=windows))
p.write_text(json.dumps(m,indent=2)+'\n');(root/'qa/evidence/biodiversity/woodland-review.json').write_text(json.dumps(review,indent=2)+'\n')
print([(r['id'],len(r['accepted'])) for r in review])
