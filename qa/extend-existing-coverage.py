"""Expand already-modeled group proxies using retained North American evidence."""
import json,pathlib
p=pathlib.Path('src/sim/data/metadata.json');m=json.loads(p.read_text());reviews=[]
for ident,query,old,young,maxspan in [('oak','quercus',33.9,0,12),('grass','poaceae',20.45,0,12),('lycophyte','lepidodendron',358.86,298.9,20),('horsetail','calamites',358.86,251.902,25),('ammonite','ammonitida',200,66,20)]:
 data=json.load(open('qa/evidence/biodiversity/'+query+'.json'));records=[r for r in data['data']['records'] if young<=r.get('lag',-1)<=r.get('eag',0)<=old and r['eag']-r['lag']<=maxspan]
 windows=[dict(region='North America',first=-a*1e6,last=2026 if b==0 and ident in ['oak','grass'] else -b*1e6) for a,b in sorted(set((r['eag'],r['lag']) for r in records))]
 prior=m[ident].get('regionalCoverage',[]);m[ident]['regionalCoverage']=list({(v['region'],v['first'],v['last']):v for v in prior+windows}.values())
 m[ident]['sources']=[s for s in m[ident]['sources'] if s['url']!=data['url']]+[dict(field='regionalCoverage',url=data['url'],label='PBDB screened North American group occurrences, CC BY 4.0; original citations retained')]
 note='Group proxy: fossil members differ from living species. Dated regional windows represent deposit uncertainty, not exact species lifespans or a continuous local population.'
 if note not in m[ident]['notes']:m[ident]['notes'].append(note)
 reviews.append(dict(id=ident,accepted=[r['oid'] for r in records],windows=windows))
# Intersection of PBDB Newfoundland deposit window (570–538.8 Ma) with
# provincial Mistaken Point assemblage dating (580–560 Ma). Explicit uncertainty.
m['charnia']['regionalCoverage']=[dict(region='North America',first=-570e6,last=-560e6)]
u='https://www.gov.nl.ca/eccc/natural-areas/wer/r-mpe/'
if not any(s['url']==u for s in m['charnia']['sources']):m['charnia']['sources'] += [dict(field='regionalCoverage',url=u,label='Newfoundland and Labrador: Mistaken Point assemblage 580–560 Ma'),dict(field='dated occurrence / display coverage',url=json.load(open('qa/evidence/biodiversity/charnia.json'))['url'],label='PBDB Newfoundland Charnia occurrences; deposit envelope intersected with assemblage chronology')]
m['charnia']['notes'].append('North American view is a stylized deep-seafloor community; camera illumination is for inspection, not literal sunlight at the original habitat depth.')
p.write_text(json.dumps(m,indent=2)+'\n');pathlib.Path('qa/evidence/biodiversity/existing-review.json').write_text(json.dumps(reviews,indent=2)+'\n')
