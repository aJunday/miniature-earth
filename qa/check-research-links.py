import json,urllib.request,concurrent.futures,datetime
from pathlib import Path
m=json.load(open('src/sim/data/metadata.json'))
# These are previously curated taxon/field associations, not newly inferred claims.
sources={s['url']:s for v in m.values() for s in v['sources'] if s['url'].startswith('https://') and 'paleobiodb.org/data' not in s['url']}
def check(url):
 try:
  req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 MiniatureEarthResourceCheck'})
  with urllib.request.urlopen(req,timeout=18) as r:
   body=r.read(200000).decode('utf-8',errors='replace');return url,{'status':r.status,'finalUrl':r.url,'checked':'2026-10-17','available':r.status==200 and not any(t in body.lower() for t in ['<title>access denied','<title>just a moment'])}
 except Exception as e:return url,{'available':False,'error':str(e),'checked':'2026-10-17'}
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as pool: results=dict(pool.map(check,sources))
Path('qa/research-link-checks.json').write_text(json.dumps(results,indent=2))
resources={}
for id,v in m.items():
 items=[];seen=set()
 for s in v['sources']:
  url=s['url']
  if url in seen or not results.get(url,{}).get('available'):continue
  seen.add(url);items.append({'speciesId':id,'title':s['label']+' — '+s['field'],'organization':s['label'],'type':'website','url':url,'year':None,'description':'Existing catalogue evidence for '+s['field']+'.','topic':s['field'],'scope':v['scientificName'] or v['commonName'],'verifiedAt':'2026-10-17','verification':'URL retrieved successfully; scientific scope follows the existing curated catalogue.'})
 resources[id]=items
 for item in items:
  if 'the-morrison-formation.htm' in item['url']:item['scope']='Broader Morrison Formation fossil ecosystem, including Jurassic plants'
  if 'pennsylvanian-period.htm' in item['url']:item['scope']='Broader Pennsylvanian plant communities and geological context'
Path('src/sim/data/research-resources.json').write_text(json.dumps(resources,indent=2)+'\n')
print('Checked',len(results),'URLs; reachable',sum(v['available'] for v in results.values()),'; organisms with resources',sum(bool(v) for v in resources.values()))
