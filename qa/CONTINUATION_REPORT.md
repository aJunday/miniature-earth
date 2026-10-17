# Miniature Earth — continuation 6.5–19 report

Local continuation of commit `15bcc80`, 16 October 2026. No push or public deployment.

## 1. Previously completed functionality verified
Adaptive timeline, optional early Earth, evidence-filtered historical communities, 8-second incompatible previews, independent saved custom islands, coupled finite-resource ecology, conservation comparisons, inherited rabbit variation, animated rigs, LODs, instancing, water/reef scenes and responsive controls were preserved and exercised. Existing assets and the Three.js renderer were retained.

## 2. New functionality
Immutable starting snapshots for new custom worlds; evidence-aware regional travel; habitat-specific Find Suitable Habitat action; invalid-number guards; one-click protection defaults; deterministic spatial neighbor indexing; individual-specific animation phases; more readable inherited fur and enlarged 3D comparison; one fully implemented capybara.

## 3. Files modified
Core changes: `src/state/index.ts`, `src/sim/eligibility.ts`, `src/sim/neighborhood.ts`, `src/scene/Creatures.tsx`, `src/scene/BatchedOrganisms.tsx`, `src/scene/phenotype.ts`, `src/ui/WorldManagement.tsx`, `src/ui/Futures.tsx`, `src/ui/EvolutionLab.tsx`.
Catalogue: `src/sim/coupled.ts`, species/metadata/research-catalogue JSON, `art/build_capybara.py`, capybara base/LOD/rig/icon, manifest and asset reports.
Regression evidence: state gameplay, coverage and neighborhood tests; `qa/continuation.mjs`, existing browser scripts, steering/default/crowded benchmarks, GLB/rig validation and screenshots. NOTES.md and PROGRESS.md record assumptions and completed steps. The pre-existing user change to `.gitignore` is preserved and excluded from our commits.

## 4. Bugs corrected
- Reset could regenerate a custom world from the current region rather than its original region/community. New worlds now store and restore the actual initial snapshot, including seed and interventions.
- Travel ignored reviewed date-specific regional coverage when an unrestricted region was absent.
- Wrong-habitat rejection offered generic time travel instead of Find Suitable Habitat.
- NaN/infinite date or placement inputs could corrupt state.
- Protect Wildlife selected a policy with no active measures, producing an unexpected no-op. It now selects all five measures when none are selected; individual actions remain editable.
- Movement scanned every animal and searched the whole array for each position update. Spatial cells and keyed updates replace those scans while preserving neighbor order and steering results.
- Identically indexed animals in different species could share animation phase; phases now derive from stable individual identity.
- Rabbit fur tufts sat partly inside the body and were difficult to compare; surface placement and larger previews improve readability.

## 5. Playable organisms
**70**, including the new capybara. The new asset has 2,724 triangles, height 0.700 units, ground minimum Y=0, a 256×256 RGBA icon, LOD, and a nine-clip deformation rig. Its broad South American freshwater habitat and feeding role are reviewed; numeric rates and scale remain game parameters. The model is original and does not simply recolour another organism.

## 6. Taxonomy-only references
**239**, explicitly non-playable. Capybara was removed from this list when promoted. Scientific identity is linked to GBIF accepted taxon 5786666. Habitat, diet and anatomy sources: [San Diego Zoo Wildlife Alliance](https://animals.sandiegozoo.org/animals/capybara) and [Wildlife Explorers](https://sdzwildlifeexplorers.org/animals/capybara). No fossil origin date was invented.

## 7. Historical environments
The representative landscape profiles cover Hadean, Archean, Proterozoic, Cryogenian, Ediacaran, Cambrian, Ordovician, Silurian, Devonian, Carboniferous, Permian, Triassic, Jurassic, Cretaceous, Paleogene, Neogene, Pleistocene, Holocene, present and illustrative futures. These are habitat approximations, not exact paleogeographic localities. Coverage gaps deliberately remain sparse. Actual browser checks visited seven populated/early-Earth showcases plus Paleogene, Neogene and Holocene. Jurassic contains reviewed dinosaurs and vegetation; the Cretaceous-to-Paleogene test removes Triceratops and restores identical population rows on rewind. Default North America has 11 supported population groups.

## 8. Conservation actions
Restore habitat, Wildlife corridors, Reduce exploitation, Clean water, Marine protection. Actions change carrying capacity/connectivity, modeled mortality, pollution and water supply within the coupled ecosystem. Compare Futures uses the same founders, seed and warming assumptions. Numeric settings are labeled uncalibrated teaching assumptions and resulting populations are simulated local counts, not observations or exact extinction forecasts. The tested 2100 comparison differs in population, habitat and water outcomes. No actions yields identical baseline/protection states.

## 9. Visible inherited traits
Rabbit insulation has three inherited alleles represented by body coat volume and procedural fur density/length. Offspring inheritance, mutation, selection, survival and reproduction alter frequencies rather than changing adult identities. Actual browser experiment: dense/medium/light frequencies start at 25/50/25%; after 30 cold-selection steps they are approximately 96.6/3.4/0%. Earlier-versus-later 3D views and the live world show the variants. Rewind restores the initial distribution and replay reproduces the later distribution exactly. The three alleles and mutation rate are teaching parameters, not empirical genetic predictions.

## 10. Tests performed
- PASS: 105 automated tests in 20 files, strict TypeScript check, production build, diff whitespace check.
- PASS: all 73 base model contracts (70 organisms + 3 islands), dimensions/budgets/nodes/materials and transparent icon alpha.
- PASS: all 57 mobile rigs have normalized skin weights, nine clips and finite animated bounds.
- PASS: all 200 base/LOD/rig GLBs have zero Khronos errors and zero warnings.
- PASS: 30 grouped browser checks across complete-development, gameplay-update, gameplay-conditions, final-local and continuation suites, with no captured JavaScript/console errors. These cover actual A–L experiences, including previews visible after five seconds and absent by nine, travel highlighting/education, same-seed comparisons, independent saved/reset worlds, extinction rewind, visible evolution and 390×844 mobile controls.
- Visually opened default world, mobile view, reef, evolution comparison, capybara icon and capybara in-world closeup. Coherent miniature palettes and readable silhouettes retained; the fur comparison was enlarged after inspection.
- Browser automation is desktop Chromium/SwiftShader with mobile viewport emulation; physical mobile hardware and native GPU performance were not tested.

## 11. Measured performance
1280×800, Smooth quality, ANGLE SwiftShader software renderer, isolated runs:

| Scene | Median frame | p95 frame | Draw calls | Triangles |
|---|---:|---:|---:|---:|
| Default 11 regional groups | 50.0 ms (~20 FPS) | 50.1 ms | 30 | 105,622 |
| Crowded 22-group illustrative mosaic | 66.7 ms (~15 FPS) | 66.8 ms | 44 | 170,948 |

The default is essentially unchanged from the 50.0/50.1 ms pre-change sample; no whole-game FPS improvement or 60 FPS claim is made. A separate synthetic CPU benchmark (800 neighbors × 20 steering frames, five trials) improves median steering time from 223.0 ms to 75.7 ms, about 2.9×, with identical result checksums. This is not a frame-rate benchmark. Existing instancing, LOD merging, bounded visible populations, shared geometry/materials, cached history and aggregated simulation remain in use.

## 12. Incomplete requirements / limits
- Approximately 60 FPS on capable native desktop hardware is not verified; software-rendered measurements remain below that target.
- Historical evidence is not exhaustive. Unreviewed dates/regions are labeled unknown; present-day representatives are not assigned fabricated ancient origins.
- Legacy custom saves created before immutable snapshots cannot recover an unavailable original population snapshot. Their reset falls back to the saved region and starting preset; new saves preserve exact initial conditions.
- Capybara occupies the game's shallow freshwater habitat; amphibious land-water transitions are explicitly not modeled.
- Conservation is an explanatory parameter model, not calibrated regional forecasting. Historical landscapes are representative, and physical-device mobile validation remains outstanding.
- The production build still reports a large main-bundle advisory (about 1.65 MB minified); build succeeds.

## 13. Recommended next priorities
Profile a real native GPU and physical phone; reduce startup bundle cost; continue sourced historical/region coverage and full playable promotions; implement shared amphibious movement; calibrate ecological parameters against selected regional datasets before offering forecast-like interpretations.
