import json,pathlib
p=pathlib.Path('src/sim/data/metadata.json');m=json.loads(p.read_text());r=m['ammonite'];review=[]
for source in pathlib.Path('qa/evidence/biodiversity').glob('ammonoidea*.json'):
 data=json.loads(source.read_text());accepted=[v for v in data['data'].get('records',[]) if 66<=v.get('lag',0)<=v.get('eag',0)<=251.902 and v['eag']-v['lag']<=20]
 windows=[dict(region='North America',first=-a*1e6,last=-b*1e6) for a,b in sorted(set((v['eag'],v['lag']) for v in accepted))]
 r['regionalCoverage']=list({(w['region'],w['first'],w['last']):w for w in r.get('regionalCoverage',[])+windows}.values())
 if not any(s['url']==data['url'] for s in r['sources']):r['sources'].append(dict(field='regionalCoverage',url=data['url'],label='PBDB Ammonoidea regional occurrences; subclass reconstruction, CC BY 4.0'))
 review.append(dict(file=str(source),accepted=[v['oid'] for v in accepted],windows=windows))
r['notes'].append('Ammonoid group proxy: the coiled-shell miniature represents different regional members of Ammonoidea through time, including Triassic ceratitids; it is not a single genus or species. Fine shell ornament and soft tissues are generalized. Feeding rates remain illustrative.')
r['habitatEvidence']='Source-backed North American marine ammonoid occurrence windows, varying taxa by interval.'
p.write_text(json.dumps(m,indent=2)+'\n');pathlib.Path('qa/evidence/biodiversity/ammonoid-review.json').write_text(json.dumps(review,indent=2)+'\n')
