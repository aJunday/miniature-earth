# Miniature Earth — remaining-work completion report

Completed locally on 2026-10-16. No push or deployment.

## Delivered

- **Rigging:** all 52 mobile catalogue animals have real armatures, skin weights and nine animation clips. Appendages use graded weights across base/tip bones. Close animals use independent skeletons with behavior crossfades, locomotion speed matching, birth/death actions and insulation morph targets for rabbit, deer, red fox and mammoth. Distant populations retain instancing. Zoom now reaches small animals' skeletal detail. Sessile organisms remain stationary.
- **Scientific coverage:** all 65 catalogue entries pass a source/scope/date/habitat/feeding audit and have at least one supported time. Added reviewed fossil occurrences, modern regional evidence, corrected predator/marine feeding roles and source links. Single dated fossils remain snapshots, accessible through “Visit reviewed occurrence”; they are not invented lifetime ranges. Historical extinction records now agree across story and metadata panels.
- **Ecosystem coupling:** one pure engine drives every experimental population, including inherited individuals. Predation, grazing, pollination, finite prey/browse/plankton/invertebrate/fish resources, marine plants, reef support, detritus, microbial/fungal decomposition, nutrients, freshwater, salinity and aquatic oxygen interact. Interventions affect the whole ecosystem. Vegetation, reef/meadow density and river width reflect live state. The comparison replays the complete neutral ecosystem. No rabbit enclosure or predator exemption remains.
- **Presentation/performance:** retained the toy art direction; inspected actual overview, reef, mobile, inherited-coat and close-rig renders. Reduced terrain and distant-foliage geometry, retained near detail and shared replay results between UI/scene subscribers. Original full and distant assets remain available.

## Verification

PASS — strict TypeScript, production build and all **75 Vitest tests in 17 files**.

PASS — **43 named browser checks** across completion, extended timeline/region regression, rig runtime, science, reef, water and final-local suites, plus the expanded evolution/replay/rejected-placement suite. Zero console/page errors in these runs. Checks cover actual close-rig loading, moving rendered frames, complete historical asset loading, deterministic rewind, global climate intervention, source navigation, inheritance, invalid placements and mobile overflow.

PASS — **52 glTF Transform inspections**; Khronos validation reports **zero errors and zero warnings** for all new rigged exports. Independent Three.js parsing verifies normalized vertex weights, all nine clips and finite animated bounds. Original **68 full assets and 65 LOD assets** pass their geometry, naming, dimension, budget and icon contracts.

PASS — `git diff --check`. Commits are local. The user's pre-existing `.gitignore` change is excluded.

Final isolated benchmark: 1280×800, Smooth quality, 14 reconstruction groups; **50.0 ms median, 66.8 ms p95**, **37 draw calls / 140,740 triangles / 38 geometries**, on SwiftShader software Vulkan. This is not a native-GPU 60 fps measurement. The first expanded fixture measured 66.6 ms median and 153,596 triangles before the final geometry reduction.

## Scientific and numerical scope

The game is an educational aggregate patch simulation, not a validated ecological or genetic forecast. Broad resource guilds represent unmodeled food organisms; they do not assert that every displayed animal naturally eats the displayed plant species or shares one geographic community. Unknown origins, physiological tolerances and disputed fossil diets remain explicitly unknown. Ancient occurrence snapshots do not establish continuous global occupancy.

Inherited populations use three illustrative alleles, 0.2% offspring mutation, bounded individual counts (160 maximum), weighted reproduction/survival and unchanged genotypes for survivors. Modern steps are annual; long geological seeks use at most 512 labeled ecological steps. There is no measured genetic calibration or speciation claim. Historical reconstruction is read-only; ecological experiments never receive date-forced historical extinction.

Runtime/asset/data work requested in this continuation is complete for the existing catalogue. The build emits a nonfatal bundle-size advisory; the test runner emits an existing Three.js CommonJS deprecation advisory. No login, external service or deployment is needed to play locally.

## Selected evidence added

- [Royal Ontario Museum: Anomalocaris canadensis](https://burgess-shale.rom.on.ca/fossils/anomalocaris-canadensis/) — dated Burgess Shale occurrence and functional ecology.
- [ANU: Dickinsonia evidence](https://science.anu.edu.au/news-events/news/fat-558-million-years-ago-reveals-earliest-known-animal) — dated White Sea specimen.
- [AMNH: Pteranodon longiceps](https://www.amnh.org/explore/ology/ology-cards/358-pteranodon-longiceps) — Kansas occurrence and feeding interpretation.
- [University of Texas museum](https://sciencemuseum.utexas.edu/exhibit/paleontology-gallery/) — Dimetrodon occurrence.
- [Animal Diversity Web](https://animaldiversity.org/) — linked taxon-level feeding and range records; per-entry links remain in the game.
- [NOAA: seagrass habitat](https://www.fisheries.noaa.gov/west-coast/habitat-conservation/seagrass-west-coast) — marine plant scope and habitat role.

Local game: http://127.0.0.1:5182/
