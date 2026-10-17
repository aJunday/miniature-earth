"""Reproducible reviewed genus-level additions; raw PBDB evidence is retained."""
import json,pathlib,copy
root=pathlib.Path(__file__).resolve().parents[1]
def read(p):return json.loads((root/p).read_text())
def write(p,d):(root/p).write_text(json.dumps(d,indent=2)+'\n')
# Conservative screening bounds (Ma), not claimed exact origination/extinction.
entries=[
('cloudina','Cloudina tube colony','Ediacaran','marine','filter feeder',.45,635,538.8,'Nested mineralized tubes of a late Ediacaran organism; affinities and detailed feeding are uncertain','https://pmc.ncbi.nlm.nih.gov/articles/PMC5524506/'),
('placerias','Placerias','Triassic','terrestrial','herbivore',1.2,237,205.7,'Stocky dicynodont with a beak and paired upper tusks; a mammal relative, not a dinosaur','https://www.nps.gov/subjects/fossils/vertebrate-fossils.htm'),
('dilophosaurus','Dilophosaurus','Jurassic','terrestrial','carnivore',1.4,201.4,184.2,'Bipedal theropod with two thin cranial crests; no fictional neck frill or venom','https://www.jsg.utexas.edu/txvp/dilophosaurus/'),
('camarasaurus','Camarasaurus','Jurassic','terrestrial','herbivore',2.4,161.5,143.1,'Robust sauropod with a boxy skull, long neck and four pillar-like legs','https://www.nps.gov/dino/learn/nature/camarasaurus-lentus.htm'),
('deinonychus','Deinonychus','Cretaceous','terrestrial','carnivore',.9,121.4,100.5,'Light biped with a raised sickle claw on each hind foot; feather covering inferred from relatives','https://www.amnh.org/exhibitions/permanent/saurischian-dinosaurs/deinonychus-cast-link-to-early-birds--amnh'),
('diplomystus','Diplomystus lake predator','Paleogene','freshwater','carnivore',.5,56,45.9,'Deep-bodied Eocene lake fish; preserved specimens document fish predation','https://www.nps.gov/fobu/learn/nature/fossil-fish.htm'),
('platystrophia','Ribbed brachiopod','Ordovician','marine','filter feeder',.32,470,422,'Suspension feeding; two ribbed valves and a central fold','https://www.nps.gov/choh/learn/nature/fossils.htm'),
('eucalyptocrinites','Cup crinoid','Silurian','marine','filter feeder',.75,443.1,419.62,'Stalked echinoderm; a cup and branching food-catching arms','https://www.bgs.ac.uk/discovering-geology/fossils-and-geological-time/crinoids/'),
('eurypterus','Eurypterus','Silurian','marine','carnivore',.35,432.9,419.62,'Aquatic arthropod with paddles, walking legs and a tapering tail spine','https://nysm.nysed.gov/exhibitions/windows/eurypterid'),
('cooksonia','Cooksonia-like early plant','Silurian','terrestrial','producer',.3,422.7,410.62,'Small leafless branching axes with terminal spore capsules; genus-level reconstruction','https://pmc.ncbi.nlm.nih.gov/articles/PMC4360123/'),
('archaeopteris','Archaeopteris tree','Devonian','terrestrial','producer',2.2,387.95,358.86,'Woody tree with fern-like leafy branch systems; not a flowering tree','https://doi.org/10.1016/j.revpalbo.2024.105212'),
('dunkleosteus','Dunkleosteus','Devonian','marine','carnivore',.85,382.31,358.86,'Predatory placoderm with bony head armor; soft-body outline is reconstructed','https://www.cmnh.org/explore/galleries-attractions/visitor-hall'),
('knightia','Knightia lake fish','Paleogene','freshwater','filter feeder',.35,56,48.07,'Small schooling fish from Eocene freshwater lake deposits; feeding rates are illustrative','https://www.nps.gov/fobu/learn/fossils-geology.htm'),
('metasequoia','Fossil dawn redwood','Cretaceous','terrestrial','producer',2.5,89.8,5.333,'Fossil Metasequoia genus reconstruction with opposite leafy branchlets; not the modern species','https://www.nps.gov/articles/000/battle-of-the-bark.htm'),
('mesohippus','Three-toed browsing horse','Paleogene','terrestrial','herbivore',.85,39.7,29.5,'Small woodland browser with three toes on each foot','https://www.nps.gov/media/photo/view.htm?id=7f8cefd8-408f-419f-9e11-9a787b4660e2'),
('merychippus','Three-toed grazing horse','Neogene','terrestrial','herbivore',1.1,20.45,9.4,'Longer-faced horse retaining three toes; side toes reduced','https://www.floridamuseum.ufl.edu/fossil-horses/gallery/merychippus/'),
('coelophysis','Coelophysis','Triassic','terrestrial','carnivore',1.0,227.3,201.4,'Lightly built bipedal theropod, long neck and tail; no invented pack hunting claim','https://www.nps.gov/subjects/fossils/triassic-dinosaurs.htm'),
('edmontonia','Edmontonia','Cretaceous','terrestrial','herbivore',1.2,83.6,66,'Broad armored nodosaur with shoulder spikes and no tail club','https://www.nps.gov/dena/learn/nature/edmontonia.htm')]
species=read('src/sim/data/species.json');meta=read('src/sim/data/metadata.json');review=[]
for ident,name,era,hab,diet,height,older,younger,fact,url in entries:
 raw=read('qa/evidence/biodiversity/'+ident+'.json');records=raw['data']['records'];accepted=[r for r in records if r.get('tna','').lower().split()[0]==ident and younger<=r.get('lag',-1)<=r.get('eag',0)<=older and r['eag']-r['lag']<=25]
 if ident=='cloudina':accepted=[r for r in records if r.get('tna','').startswith('Cloudina')]
 assert accepted,ident
 windows=sorted(set((-r['eag']*1e6,-r['lag']*1e6) for r in accepted))
 if ident=='cloudina':windows=[(-550e6,-539e6)] # Terminal Ediacaran reconstruction window from cited primary publication, not PBDB's whole-period age envelope.
 m=copy.deepcopy(meta['vauxia']);m.update(commonName=name,scientificName=ident.capitalize(),taxonomicRank='genus',taxonomicStatus='Source-reported genus; species identities not conflated',habitat={'marine':'Shallow marine reconstruction','freshwater':'Freshwater lake','terrestrial':'Woodland / lowland vegetation'}[hab],habitatEvidence=fact,waterDomain=hab,food={'producer':'Photosynthesis','filter feeder':'Suspended particles / small plankton','herbivore':'Plant matter','carnivore':'Animal prey'}[diet],foodEvidence='Broad functional guild; detailed prey and numeric tolerances are not established by occurrence data',coverage=list(windows[0]),regions=['North America'],regionalCoverage=[dict(region='North America',first=a,last=b) for a,b in windows],notes=['Genus-level original stylized reconstruction. Colours, dimensions, abundance and movement are artistic/teaching assumptions.','Accepted occurrence windows are disjoint deposit-age uncertainty intervals, not continuous local occupation.','This is a continental habitat mosaic, not a single fossil assemblage.'],sources=[dict(field='dated occurrence / display coverage',url=raw['url'],label='Paleobiology Database · CC BY 4.0 · occurrence IDs and original publications retained in evidence bundle'),dict(field='anatomy / ecological interpretation',url=url,label='Museum, scientific institution or primary publication')])
 # coverage is only the first interval for travel; regional windows are authoritative.
 if ident=='metasequoia':
  m['fossilReconstruction']=True
  m['extinctionStatus']='Fossil regional reconstruction; genus has living representatives in Asia'
 if ident=='cloudina':
  m['food']='Uncertain; modeled suspended food is an explicit teaching assumption'
  m['foodEvidence']='Feeding and affinities unresolved; a suspension-feeding hypothesis supplies the illustrative resource link.'
  m['dateBasis']='Terminal Ediacaran (~550–539 Ma) literature reconstruction window; PBDB whole-period ages alone are too broad.'
  m['sources'].append(dict(field='age context and uncertainty',url='https://www.nature.com/articles/s41467-019-13882-z',label='Schiffbauer et al. 2020; cloudinomorph biology and terminal Ediacaran context'))
 meta[ident]=m
 s=copy.deepcopy(next(s for s in species if s['id']=='vauxia'));s.update(id=ident,name=name,era=era,zone={'marine':'sea','terrestrial':'land','freshwater':'freshwater'}[hab],diet=diet,height=height,fact=fact,need=.08 if diet=='producer' else .15,K=160 if diet=='producer' else 60,r=.08,m=.04)
 species=[v for v in species if v['id']!=ident]+[s]
 review.append(dict(id=ident,accepted=[r['oid'] for r in accepted],excluded=len(records)-len(accepted),windows=windows,screen='Accepted genus name, conservative age bounds, maximum 25-Myr deposit uncertainty. Query is a bounded sample, not exhaustive.'))
# Restore existing Permian asset using reviewed occurrences, without changing its identity.
r=read('qa/evidence/biodiversity/dimetrodon.json');acc=[v for v in r['data']['records'] if v.get('tna','').startswith('Dimetrodon') and v['eag']<=298.9 and v['lag']>=266.9 and v['eag']-v['lag']<=18]
meta['dimetrodon']['regionalCoverage']=[dict(region='North America',first=-a*1e6,last=-b*1e6) for a,b in sorted(set((v['eag'],v['lag']) for v in acc))];meta['dimetrodon']['sources']=[v for v in meta['dimetrodon']['sources'] if v['url']!=r['url']]
meta['dimetrodon']['sources'].append(dict(field='regionalCoverage',url=r['url'],label='PBDB screened North American occurrences; raw references retained'))
# Its former single-year coverage must not override newly reviewed intervals in mosaic.
meta['dimetrodon']['coverage']=[-298.9e6,-266.9e6]
write('src/sim/data/species.json',species);write('src/sim/data/metadata.json',meta);write('qa/evidence/biodiversity/review.json',review)
print('Playable count',len(species))
