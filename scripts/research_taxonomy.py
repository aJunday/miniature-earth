"""Read-only GBIF backbone lookups; save reviewable taxonomy evidence, not occurrences."""
import concurrent.futures,json,urllib.request,urllib.parse
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
NAMES=dict(zip('charnia dickinsonia fern cycad conifer stegosaurus brachiosaurus allosaurus grass oak rabbit deer redfox honeybee seaturtle amurleopard sumatranorangutan vaquita kakapo axolotl sumatranrhino rightwhale pangolin philippineeagle condor forestelephant elkhorncoral tiger redpanda bluewhale mountaingorilla asianelephant whaleshark seaotter ringtailedlemur wilddog giantpanda snowleopard polarbear koala cheetah emperorpenguin mammoth stellerseacow dodo passengerpigeon thylacine pintatortoise humpback baldeagle reeffish trilobite arthropleura'.split(),['Charnia','Dickinsonia','Polypodiopsida','Cycadales','Araucaria','Stegosaurus','Brachiosaurus','Allosaurus','Poaceae','Quercus','Oryctolagus cuniculus','Cervidae','Vulpes vulpes','Apis mellifera','Eretmochelys imbricata','Panthera pardus orientalis','Pongo abelii','Phocoena sinus','Strigops habroptila','Ambystoma mexicanum','Dicerorhinus sumatrensis','Eubalaena glacialis','Manis javanica','Pithecophaga jefferyi','Gymnogyps californianus','Loxodonta cyclotis','Acropora palmata','Panthera tigris','Ailurus fulgens','Balaenoptera musculus','Gorilla beringei beringei','Elephas maximus','Rhincodon typus','Enhydra lutris','Lemur catta','Lycaon pictus','Ailuropoda melanoleuca','Panthera uncia','Ursus maritimus','Phascolarctos cinereus','Acinonyx jubatus','Aptenodytes forsteri','Mammuthus primigenius','Hydrodamalis gigas','Raphus cucullatus','Ectopistes migratorius','Thylacinus cynocephalus','Chelonoidis abingdonii','Megaptera novaeangliae','Haliaeetus leucocephalus','Amphiprion ocellaris','Trilobita','Arthropleura']))
def lookup(item):
 id,name=item;url='https://api.gbif.org/v1/species/match?'+urllib.parse.urlencode({'name':name,'strict':'true'})
 try:
  with urllib.request.urlopen(url,timeout=20) as response:data=json.load(response)
  return id,{'query':name,'url':url,'checked':'2026-10-16',**{k:data.get(k) for k in ['usageKey','acceptedUsageKey','canonicalName','scientificName','rank','status','matchType','confidence','kingdom','phylum','class','order','family']}}
 except Exception as e:return id,{'query':name,'url':url,'error':str(e)}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:result=dict(pool.map(lookup,NAMES.items()))
(ROOT/'docs/research/taxonomy.json').write_text(json.dumps(result,indent=2)+'\n')
for id,r in result.items():print(id,r.get('canonicalName'),r.get('matchType'),r.get('error',''))
