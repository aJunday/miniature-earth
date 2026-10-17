"""Class-level reconstruction: retain local intervals, never call it one species."""
import json,pathlib
p=pathlib.Path('src/sim/data/metadata.json');m=json.loads(p.read_text());r=m['trilobite'];review=[]
for source in pathlib.Path('qa/evidence/biodiversity').glob('trilobita*.json'):
 data=json.loads(source.read_text());accepted=[v for v in data['data'].get('records',[]) if 252<=v.get('lag',0)<=v.get('eag',0)<=521 and v['eag']-v['lag']<=20]
 windows=[dict(region='North America',first=-a*1e6,last=-b*1e6) for a,b in sorted(set((v['eag'],v['lag']) for v in accepted))]
 r['regionalCoverage']=list({(w['region'],w['first'],w['last']):w for w in r.get('regionalCoverage',[])+windows}.values())
 if not any(s['url']==data['url'] for s in r['sources']):r['sources'].append(dict(field='regionalCoverage',url=data['url'],label='PBDB Trilobita class query; original locality references retained, CC BY 4.0'))
 review.append(dict(file=str(source),accepted=[v['oid'] for v in accepted],windows=windows))
note='The trilobite miniature is an explicitly generalized three-lobed class-level body plan. Different regional windows represent different taxa, not one long-lived species; exact spines, segment counts and soft tissues vary and are not reconstructed for every occurrence.'
if note not in r['notes']:r['notes'].append(note)
r['habitatEvidence']='Marine class-level proxy, supported by regional fossil occurrences; species-specific microhabitats unresolved.'
p.write_text(json.dumps(m,indent=2)+'\n');pathlib.Path('qa/evidence/biodiversity/trilobite-review.json').write_text(json.dumps(review,indent=2)+'\n')
