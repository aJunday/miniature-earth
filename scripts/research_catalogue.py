"""Reproducible taxonomy audit. Exact GBIF matches only; never creates playable assets.
No occurrence coordinates, images, descriptions or unreviewed historical ranges imported.
"""
import json,urllib.request,urllib.parse,concurrent.futures,time
from pathlib import Path
root=Path(__file__).resolve().parents[1]
existing=json.loads((root/'src/sim/data/metadata.json').read_text())
names=set(v.get('scientificName') for v in existing.values())
candidates=list(dict.fromkeys((root/'scripts/catalogue_candidates.txt').read_text().splitlines()))
def fetch(name):
 if name in names:return None
 url='https://api.gbif.org/v1/species/match?'+urllib.parse.urlencode({'name':name,'strict':'true'})
 for attempt in range(3):
  try:
   with urllib.request.urlopen(url,timeout=25) as response:r=json.load(response)
   if r.get('matchType')!='EXACT' or r.get('rank') not in ('SPECIES','GENUS'):return None
   key=r.get('acceptedUsageKey',r['usageKey'])
   return {'id':'gbif-'+str(key),'scientificName':r['canonicalName'],'rank':r['rank'],'status':r['status'],'classification':{k:r[k] for k in ['kingdom','phylum','class','order','family','genus'] if k in r},'gbifKey':key,'source':'https://www.gbif.org/species/'+str(key),'reviewed':'2026-10-16','playable':False,'coverage':None,'region':None,'habitat':None,'diet':None,'uncertainty':'Taxonomy verified. Historical range, native habitat and ecological parameters await review; no playable asset is supplied.'}
  except Exception:
   if attempt==2:return None
   time.sleep(1)
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:rows=[r for r in pool.map(fetch,candidates) if r]
rows=list({r['id']:r for r in rows}.values())
(root/'src/sim/data/research-catalogue.json').write_text(json.dumps(rows,indent=2)+'\n')
print('Verified reference entries:',len(rows),'existing playable:',len(existing),flush=True)
