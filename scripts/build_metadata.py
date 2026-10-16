"""Compile reviewed evidence into catalogue records; never infer fossil dates from game eras."""
import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
species=json.loads((root/'src/sim/data/species.json').read_text());taxonomy=json.loads((root/'docs/research/taxonomy.json').read_text())
nhm='https://www.nhm.ac.uk/'
evidence={
 'stegosaurus':(-152e6,-145e6,'Terrestrial; low vegetation','Herbivorous',nhm+'discover/dino-directory/Stegosaurus.html'),
 'brachiosaurus':(-152e6,-145e6,'Terrestrial; wooded landscapes','High browsing herbivore',nhm+'discover/dino-directory/brachiosaurus.html'),
 'allosaurus':(-152e6,-145e6,'Terrestrial','Carnivorous',nhm+'discover/dino-directory/allosaurus.html'),
 'trilobite':(-520e6,-252e6,'Marine; diverse seafloor habitats','Varied among species; no single diet for the class',nhm+'discover/how-trilobites-conquered-prehistoric-oceans.html'),
 'arthropleura':(-346e6,-290e6,'Terrestrial; ancient swamp forests','Uncertain; plant feeding is a gameplay assumption',nhm+'discover/news/2024/october/largest-ever-millipede-head-revealed.html'),
 'mammoth':(None,-2000,'Cold open grassland','Grasses and other vegetation',nhm+'our-science/research/projects/mammoth-evolution-model-species-origins.html'),
 'seaturtle':(None,None,'Tropical and subtropical marine reefs','Omnivorous; sponges are a preferred food','https://www.fisheries.noaa.gov/species/hawksbill-turtle'),
 'reeffish':(None,None,'Shallow tropical marine reefs; associated with anemones','Algae and small invertebrates','https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/clown-anemonefish/'),
 'axolotl':(None,None,'Freshwater; remnant lakes and canals in Mexico','Carnivorous',nhm+'discover/axolotls-amphibians-that-never-grow-up.html'),
}
records={}
for s in species:
 id=s['id'];t=taxonomy.get(id);e=evidence.get(id);first,last,habitat,food,url=e or (None,None,'Marine' if s['zone']=='sea' else 'Terrestrial',None,None)
 extinct=id in ['charnia','dickinsonia','stegosaurus','brachiosaurus','allosaurus','mammoth','stellerseacow','dodo','passengerpigeon','thylacine','pintatortoise','trilobite','arthropleura']
 sources=[{'field':'taxonomy','url':t['url'],'label':'GBIF taxonomic backbone'}] if t else []
 if e:sources.append({'field':'habitat and resources'+('; fossil range' if first else ''),'url':url,'label':'Natural History Museum' if 'nhm.ac.uk' in url else 'NOAA Fisheries' if 'noaa.gov' in url else 'Florida Museum'})
 if id=='trilobite':sources.append({'field':'last occurrence','url':nhm+'schools/teaching-resources/big-ideas-in-science-evolution/trilobite-fossils-resources-and-class-activities.html','label':'Natural History Museum'})
 if id=='mammoth':sources.append({'field':'last occurrence','url':nhm+'discover/news/2024/july/woolly-mammoth-genome-rebuilt-from-freeze-dried-skin.html','label':'Natural History Museum'})
 notes=[]
 if not t:notes.append('Ecological group or microbial community; not a single taxonomic species.')
 elif t['rank']!='SPECIES':notes.append('Represents a '+t['rank'].lower()+'; dates and biology must not be read as those of one species.')
 if id=='reeffish':notes.append('Clown anemonefish is the representative for this stylized reef-fish model. Group size is a game setting, not a claim about schooling.')
 if id=='conifer':notes.append('Araucaria is the chosen representative, not a name for all conifers.')
 if id=='pangolin':notes.append('Sunda pangolin is the chosen representative, not all pangolins.')
 if id=='charnia':notes.append('Rangeomorph animal; feeding remains uncertain. Producer-style game growth does not imply photosynthesis.')
 if id=='dickinsonia':notes.append('Ediacaran animal; ecological details remain debated.')
 if id=='seaturtle':notes.append('The game food-web link to seagrass simplifies habitat support; hawksbills are not seagrass specialists.')
 if id=='axolotl':notes.append('The current water placement system approximates aquatic habitat and does not model salinity; real axolotls cannot live in seawater.')
 records[id]={'commonName':s['name'],'scientificName':t['canonicalName'] if t else None,'taxonomicRank':t['rank'].lower() if t else 'ecological group','taxonomicStatus':t['status'] if t else None,'firstAppearance':first,'lastOccurrence':last,'dateBasis':'Approximate fossil range; not exact origination or extinction dates' if first else 'Approximate last isolated mammoth populations, about 4,000 years ago' if id=='mammoth' else 'No reviewed date estimate in this catalogue','habitat':habitat,'habitatEvidence':'source-linked' if e else 'Broad game habitat; finer native range not yet verified','waterDomain':'freshwater' if id=='axolotl' else 'marine' if s['zone']=='sea' else 'terrestrial','food':food,'foodEvidence':'source-linked' if food else 'Specific diet not yet verified; game resource links are approximations','extinctionStatus':'extinct' if extinct else 'living representatives','empiricalTemperatureRange':None,'empiricalOxygenThreshold':None,'measurementNote':'No reviewed numeric tolerance; temperature, oxygen fitness and resource links in the simulation are teaching parameters.','relationships':(['Baleen whales within Cetacea, nested in the even-toed mammal lineage'] if id in ['bluewhale','rightwhale','humpback'] else []),'notes':notes,'sources':sources,'checked':'2026-10-16'}
 if records[id]['relationships']:sources.append({'field':'evolutionary relationship','url':'https://naturalhistory.si.edu/education/teaching-resources/life-science/evolution-whales-animation','label':'Smithsonian'})
(root/'src/sim/data/metadata.json').write_text(json.dumps(records,indent=2)+'\n')
