# Expanded master implementation review

The October 16 master document supersedes the previous MVP's out-of-time placement rules. This pass implements a playable historical/visible-evolution slice and works through A–G locally. It does not claim exhaustive scientific coverage or a fully calibrated biological model.

## Delivered

- **A1 — PASS:** exact ±10-year buttons, keyboard stepping and playback; anchored decade zoom window; geological navigation grouped by eon/era; continuous cursor from 4.54 Ga to 2100. High-level jumps seek directly using bounded replay. BCE labels have no displayed year zero. Bounds disable an unavailable forward decade.
- **A2 — PASS for supported coverage:** shared temporal/habitat/region eligibility; immutable historical reconstruction; separately seeded counterfactual events; historical disappearance never forces experimental extinction. Invalid placement creates a fading ghost and notice, without a population, journal entry or extinction. Interventions after rewind truncate affected future choices. Local branches are archived when replaced, and the current experiment can be resumed.
- **B — PASS:** rabbit insulation is inherited through annual non-overlapping cohorts with stable parent/offspring IDs, fitness-weighted reproduction and bounded mutation. Cold/warm selection changes allele frequencies; neutral runs do not force cold adaptation. Body coat volume and rounded fur tufts derive from actual alleles in both the island and Then/Now comparison. The unmodified baseline shares seed and founder count. The experiment is explicitly a controlled microhabitat, separate from open predation.
- **C — PASS for the procedural animation system:** live neighborhood separation/cohesion, accelerated movement, bounded turning, habitat restrictions, seeded rock buckets and steep-slope avoidance. Existing forage/rest, predator avoidance/pursuit, swimming, flight, breathing, blinking and named-joint animation remain. Larger deer herds now have fewer representatives to improve silhouettes.
- **D — PASS:** animated normal-map water, Fresnel, controlled highlights, transparent shallows, surf and seabed caustics. Distant water omits detailed normal evaluation with a smooth fade. Existing terrain, 2.25× modern land area, roughness differences, lighting and instancing remain.
- **E — PASS for reviewed catalogue coverage:** all 65 catalogue entries use the same validator, including terrestrial animals, freshwater axolotls, marine animals, plants, microbial structures and a new modern decomposer-fungus guild. Procedural vegetation and reef life are also gated. Fungi have original full/LOD GLBs, a transparent icon and a bounded nutrient feedback. Unknown historical taxa remain unavailable rather than being silently reconstructed.
- **F — PASS:** availability reasons, reviewed coverage/source links, historical/counterfactual/future labels, regional filters, branch resume/archive, source-linked evolution inspection and synchronized baseline comparison. Mobile controls were reorganized after screenshot review exposed overflow and a cramped date label.
- **G — local validation below; hardware target remains unverified.**

## Verification

- Strict TypeScript and production build: PASS.
- Vitest: 61 tests across 15 files, PASS. Includes inheritance, selection, mutation, neutral ensembles, determinism, range/habitat/region eligibility, invalid-placement state integrity, branching, historical reconstruction, ecological scenarios and navigation.
- `qa/expanded-master.mjs`: PASS. Checks visible selection, deterministic rewind, decade stepping, historical navigation, rejected placement and mobile width; captures actual rendered screenshots; zero console/page errors.
- `qa/expanded-regressions.mjs`: 11 checks PASS. Includes exact decade round trips in six eras, zoom/keyboard, playback, rejection without a new population, regional freshwater reconstruction, reef camera and quality switching; zero console/page errors.
- All 68 full model contracts and 65 LOD contracts: PASS. New decomposer full and distant GLBs pass glTF Transform/Khronos validation with no errors or warnings. New PNG has a real alpha channel.
- Cycles CPU contact sheet regenerated. Opened the sheet, fungus icon and actual history, evolution, reef and mobile captures. Applied three visual fixes: rounded and correctly aligned fur, reduced deer crowding, and compact mobile timeline controls.
- Isolated 1280×800 Smooth-quality software-renderer measurement: 50.0 ms median, 66.7 ms p95, 36 draws and 150,274 triangles. Performance is recorded in `qa/performance-expanded.json`; this software-renderer workload is not directly comparable to the former resident-plus-player benchmark. No hardware 60fps claim.

## Evidence and uncertainty

The coverage layer distinguishes exact taxonomic species, genera, broader clades and ecological guilds. Triceratops is a genus-level 68–66 Ma entry; Stegosaurus and its Jurassic neighbours use their reviewed genus ranges. Trilobites are a broad class, not one species. Modern named taxa are not assumed to have existed throughout an ancestral clade's history. Fossil coverage is approximate despite a precise simulation cursor.

Sources used/rechecked in this pass include:

- [NHM Triceratops](https://www.nhm.ac.uk/discover/dino-directory/triceratops.html) and [Tyrannosaurus](https://www.nhm.ac.uk/discover/dino-directory/tyrannosaurus.html): the Late Cretaceous/Jurassic rejection fixtures.
- [NHM trilobites](https://www.nhm.ac.uk/schools/teaching-resources/big-ideas-in-science-evolution/trilobite-fossils-resources-and-class-activities.html): marine fossil context.
- [NHM Jurassic vegetation](https://www.nhm.ac.uk/discover/the-jurassic-period.html), [tree history](https://www.nhm.ac.uk/discover/how-trees-changed-the-world.html), and [NPS Pennsylvanian](https://www.nps.gov/articles/000/pennsylvanian-period.htm): broad ancient plant proxies.
- [NHM ammonites](https://www.nhm.ac.uk/discover/what-is-an-ammonite.html): Jurassic true-ammonite coverage; the limited surviving post-boundary occurrences are not resolved in this scene.
- [NHM early microbial structures](https://www.nhm.ac.uk/discover/news/2022/november/oldest-evidence-life-earth-could-help-discover-ancient-life-mars.html): approximately 3.48 Ga coverage.
- [Smithsonian Deep Time](https://www.si.edu/newsdesk/factsheets/david-h-koch-hall-fossils-deep-time): Neogene grassland context.
- [NHM mammoths](https://www.nhm.ac.uk/discover/were-all-mammoths-woolly.html) and [Florida Museum ground sloths](https://www.floridamuseum.ufl.edu/florida-vertebrate-fossils/species/eremotherium-eomigrans/): broad historical display windows.
- [Animal Diversity Web rabbit account](https://animaldiversity.org/accounts/Oryctolagus_cuniculus/): reproduction context, not the numerical genetic parameters.
- [Kew decomposers](https://growwild.kew.org/blog/uk-fungi-work): decomposition and nutrient cycling.

Existing GBIF taxonomy and conservation source records remain in the metadata. No API is presented as a complete chronology or a source of measured game fitness. Source review date: 2026-10-16. New sources are linked; no external asset licenses or paid assets were introduced.

## Remaining scope and model limits

This is still a bounded teaching implementation, not every aspirational feature in the master vision. The annual rabbit cohort has one three-state insulation locus; it is not a diploid, multilocus, age-structured model, and does not simulate speciation. More than 256 annual generations uses explicitly labeled bounded approximation. Other species retain aggregate tick-based ecology. Rabbit selection is not yet coupled to the island's entire food web.

Many exact fossil ranges and native regions remain unreviewed. Those entries are labeled uncertain and cannot be introduced at unsupported dates. Some earlier showcase assets therefore remain in the catalogue but are absent from historical scenes until their coverage is verified. The default island is a global illustrative habitat mosaic, not a scientifically complete fossil locality. Freshwater/marine classification is implemented; detailed salinity, water-level and dissolved-oxygen fields are not.

The models retain authored toy proportions and procedural named-part animation. Full skeletal rigs, animation crossfades, comprehensive obstacle collision and additional evolution-capable anatomical meshes are not finished. The screenshots validate the current art direction, not parity with a commercial console game's art budget.

Native GPU/device 60fps remains unverified. SwiftShader performance must not be represented as native hardware performance. The build still reports a large main bundle and a Three.js CommonJS deprecation in the test environment.

Next priorities: expand verified locality-specific records; couple age-structured phenotype cohorts to open ecology; author skeletal/morph showcase assets; then profile native desktop/mobile GPUs. Nothing was pushed or deployed. The user's .gitignore edit is excluded from task commits.

Native browser check: the computer-use browser provider reports Chrome unavailable. The existing headless SwiftShader test remains the working fallback; no native-GPU result is inferred.
