# Overhaul: evidence, authorship and simplifications

Consulted 16 October 2026. These references support broad history; they do not validate the game's numerical population model.

- International Commission on Stratigraphy, December 2024 chart: https://stratigraphy.org/ICSchart/ChronostratChart2024-12.pdf — geological boundaries. Scene transitions use rounded boundaries; illustrative snapshots do not reconstruct a specific location.
- Smithsonian, Early Life on Earth: https://naturalhistory.si.edu/education/teaching-resources/life-science/early-life-earth-animal-origins — microbial early life, changing oxygen and later animal diversification.
- Natural History Museum, Arthropleura: https://www.nhm.ac.uk/discover/news/2024/october/largest-ever-millipede-head-revealed.html — millipede-like arthropod, not a spider.
- Smithsonian, Evolution of Whales: https://naturalhistory.si.edu/education/teaching-resources/life-science/evolution-whales-animation — broad mammalian transition to aquatic life. The interface shows branching relationships, not a proven direct ancestor chain or a simulated transformation.
- Natural History Museum, ancient food webs: https://www.nhm.ac.uk/discover/news/2023/april/can-ancient-food-webs-help-predict-biodiversity-collapse.html — ecological disruption around the end-Permian extinction.

## Game approximations

OxygenFit is a qualitative suitability index, NOT an ancient atmospheric percentage. Temperature, vegetation cover, carrying capacities, mortality and reproduction constants are gameplay choices. Deep-time ticks represent unequal intervals; one tick is not a biological generation. Ancient global climate cannot be represented by one local temperature.

Each placement is retained as a separate population group. Groups share species-level food competition and carrying capacity. Unsuitable physical habitat adds mortality per group. A group below two disappears into a fossil representation. Modern woodland supplies a simplified background browsing resource, but added producers and prey still affect food availability. Modern organisms are not rejected by historical label or forced extinct at their real-world extinction date. Recorded extinction history remains educational context.

The end-Permian event increases heat and reduces habitat for 35 ticks; the end-Cretaceous event reduces sunlight and temperature for 40 ticks. These durations are visual/game pacing, not scientific estimates. Future outcomes are illustrative game scenarios, not forecasts.

The catalogue's taxonomic category is separate from its old diet abstraction: coral, Charnia and Dickinsonia are animals. Charnia's legacy producer role remains an uncorrected ecological approximation. Scientific names are provided for a subset; unknown dates and measurements are null rather than invented. Axolotl is identified as freshwater in metadata, but placement currently only distinguishes land/water. Freshwater chemistry and detailed water requirements remain unimplemented.

## Asset authorship

Terrain, procedural grain, water shader, vegetation and new reef fish, trilobite and Arthropleura models were authored in this repository. No external game textures, characters or proprietary meshes were copied. The supplied reference document informed composition, gloss, vegetation density and colour. Existing repository models are retained.

Reef fish is an anemonefish-inspired stylisation, not a species-accurate reconstruction. School size is a gameplay convention. Trilobite represents a broad group; neither arthropod model is a fossil reconstruction. Their diets and tolerances are simplified, unverified gameplay defaults. Model size is chosen for diorama readability, not literal comparative body length.

## Remaining work

Inherited traits, quantitative adaptation, a broader documented lineage collection, richer habitat-specific food webs, complete occurrence metadata and twelve individually polished showcase models remain future work. Existing 53 models include generic family templates. Three new models improve coverage without claiming the entire catalogue has received bespoke art direction. Historical landscape profiles are broad illustrative biomes; their topology does not reconstruct actual palaeogeography.

## Continuation: catalogue evidence and inherited adaptation

`src/sim/data/metadata.json` now covers all 56 entries. `scripts/build_metadata.py` rebuilds it from reviewed overrides and the saved GBIF evidence in `docs/research/taxonomy.json`. `scripts/research_taxonomy.py` is an optional network refresh, not a build dependency. All 53 taxon queries returned exact name matches; the three ecological/community entries deliberately have no single scientific name. GBIF matching establishes a name/rank, **not** a fossil range, diet, conservation assessment or a direct ancestry claim. Broad groups (Cervidae, Trilobita, ferns, etc.) retain their rank. Clown anemonefish represents the stylized reef fish.

Field-level links in the UI distinguish reviewed museum/government evidence from broad game habitats. Verified approximate ranges are included for the three dinosaur genera, trilobites and Arthropleura. Mammoth last occurrence is approximate. Remaining unreviewed dates, numerical oxygen thresholds, empirical thermal tolerances and specific diets are explicitly unknown; no first appearances were inferred from a game-era label. Existing conservation status records retain their original references and unconfirmed assessment dates. This is structured coverage, not a claim that all missing scientific data has been resolved.

Additional reviewed sources:
- NHM dinosaur directory: https://www.nhm.ac.uk/discover/dino-directory/Stegosaurus.html ; https://www.nhm.ac.uk/discover/dino-directory/brachiosaurus.html ; https://www.nhm.ac.uk/discover/dino-directory/allosaurus.html
- Trilobite range: https://www.nhm.ac.uk/discover/how-trilobites-conquered-prehistoric-oceans.html ; https://www.nhm.ac.uk/schools/teaching-resources/big-ideas-in-science-evolution/trilobite-fossils-resources-and-class-activities.html
- Arthropleura anatomy and uncertainty: https://www.nhm.ac.uk/discover/news/2024/october/largest-ever-millipede-head-revealed.html . Two pairs of legs per trunk segment; feeding and respiration remain uncertain.
- Mammoth ecology: https://www.nhm.ac.uk/our-science/research/projects/mammoth-evolution-model-species-origins.html ; approximate final populations: https://www.nhm.ac.uk/discover/news/2024/july/woolly-mammoth-genome-rebuilt-from-freeze-dried-skin.html
- Hawksbill diet/habitat: https://www.fisheries.noaa.gov/species/hawksbill-turtle . Sponges are preferred; the old seagrass game link represents simplified habitat support, not a claim of dietary specialization.
- Clown anemonefish: https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/clown-anemonefish/
- Axolotl: https://www.nhm.ac.uk/discover/axolotls-amphibians-that-never-grow-up.html . Freshwater organism; current aquatic placement does not simulate salinity and is explicitly labelled as an approximation.
- Natural selection: https://evolution.berkeley.edu/evolution-101/mechanisms-the-processes-of-evolution/natural-selection/ . Variation, inheritance and differential reproductive success support the mechanism; this source does **not** validate our numerical parameters.

### Inherited variation rules

Deer, rabbit, red fox and mammoth have three standing temperature-tolerance variants, shifting the game tolerance range by −2, 0 and +2°C. A new group starts 25/50/25%; offspring inherit parental variants without mutation. Birth contributions are weighted by temperature fitness, and mortality is weighted toward poorly suited variants. Death allocation is capped by available cohort size. Variant frequencies affect the species-level weighted temperature fitness used for ecological growth. Groups share carrying capacity and resources, so this is not a spatial genetics model.

The simulation records cumulative births and reproductive turnover (births divided by the previous population). These fractional deterministic populations are teaching approximations, not individual genotypes, actual generation times or demographic predictions. Mortality can select standing variation even without births; reproduction transmits it. Extinct groups cannot generate new variants or resurrect. No animal morphing, automatic speciation or inevitable descendant chain is implemented. Cached trait vectors are deep-copied; rewind and branch replay include them.
