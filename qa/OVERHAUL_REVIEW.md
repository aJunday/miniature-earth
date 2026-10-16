# Overhaul review — 16 October 2026

## Verified

- PASS: TypeScript strict check, production build, 24 Vitest tests. Tests cover original stable ecosystems/future divergence plus oxygen stress, browsing resources, anachronistic survival, historical-date independence, exact deterministic replay, rewind branching and non-resurrection of dead groups. Ten-species replay remains below the existing 50 ms test threshold on this machine.
- PASS: Production Playwright suite actually drags deer onto terrain and fish into the ocean, rejects fish on land without recording another placement, checks low-oxygen explanatory feedback, traverses the whale lineage and captures Hadean, Cambrian, Carboniferous, Jurassic, Pleistocene and present views.
- PASS: Desktop 1440×1000 and phone-sized 390×844 layouts captured and inspected, no horizontal overflow. This is viewport testing, not physical-phone or touch-device certification.
- PASS: No browser page errors or console errors in the recorded smoke run.
- PASS: All 59 GLBs pass the repository geometry/hierarchy/budget/icon contract. Three additions also pass glTF Transform/Khronos validation without warnings or errors. New triangle counts: reef fish 2,564, trilobite 2,724, Arthropleura 2,698. All new icons are transparent 256×256 PNGs generated with Cycles CPU.

## Visual review and applied refinements

Compared actual captures with the supplied miniature-world references. Enlarged organic land, relief, vegetation, ocean and a compact dock materially improve the old flat platform. The result remains procedural and more visually simplified than the reference games.

1. Smoothed the grass/sand blend, varied canopy sizes and distinguished ancient woodland silhouettes; removed the obvious rectangular seabed shadow.
2. Corrected the river channel's source transition and lagoon junction; the river no longer creates a raised strip through the pond. Corrected fish caudal-fin orientation and lowered swimming models into the surface.
3. Reduced the mobile information card, enlarged the island on phones, restored mobile future controls, fixed Escape while an input has focus and preserved exact selected era dates.

Sky and water colour ease between profiles; terrain topology still changes immediately. The authored shoreline retains some triangulation at close zoom. Ground cover and reef decoration need richer shapes and composition. Dense ecosystem scenes need further material batching and performance measurement.

## Acceptance scope / incomplete criteria

- Visual transformation: implemented and inspected; reference-level art polish remains incomplete.
- Era variation: implemented with broad representative biomes. Carboniferous/Devonian foliage is illustrative, not a taxonomic reconstruction; Cambrian underwater biodiversity is still sparse.
- Placement, marine rejection, survival feedback, deterministic populations, rewind and an educational lineage: verified by the checks above.
- Smooth ordinary-device frame rate: NOT established. Headless Chromium rendered populated scenes slowly. Render scale and shadow resolution were reduced and simulation results shared; hardware profiling remains required. Build retains a large-bundle warning.
- Twelve individually polished showcase organisms: NOT complete. Existing assets are reused; only three new bespoke additions were built in this pass.
- Inherited traits/adaptation: NOT implemented. The lineage UI presents documented history only.
- Scientific data: incomplete dates/tolerances remain null or explicitly labelled gameplay assumptions. Freshwater vs marine chemistry and legacy Charnia feeding are unresolved; see docs/OVERHAUL_REFERENCES.md.

No push or deployment. Original .gitignore modification from before this work was left unstaged.

## Continuation verification (supersedes the earlier incomplete list)

- PASS: 30 tests, strict typecheck and production build. Added evidence coverage and inherited variation tests, including reproduction, differential survival, ecological heat-stress selection, cache isolation and deterministic branches.
- PASS: 11 original overhaul browser checks plus five new science UI checks; zero console/page errors. Expanded panels fit a 390px viewport; trait histories restore after rewind.
- PASS: twelve bespoke showcase models, all 59 asset contracts and twelve Khronos validations. Current triangle counts are recorded in art/reports/validation.json. Reviewed the final sheet and representative individual icons. Original procedural source and no external model licences required.
- PASS: headless benchmark median 183.4ms → 66.6ms, p95 66.7ms; 34 draws and 162,186 triangles after retaining rounded tree crowns. Same 12-deer/12-fish scene and viewport. Headless results do not establish ordinary-device 60fps.
- Applied visual improvements: distinct mammal silhouettes and animal appendages; single painted material per part for richer colour without per-colour draws; improved sheet spacing and restored round runtime tree crowns. Source/trait panels no longer show the world card through their background.
- Scientific records cover every entry with evidence or explicit unknowns. Detailed occurrence dates/diets/thermal thresholds are not fully researched. Freshwater chemistry and Charnia's game-growth abstraction remain disclosed. Overall art is still more simplified and faceted than the reference games, especially non-showcase assets.

## Remaining assets and reef pass

- PASS: 44 remaining organisms refined, 56 distant variants generated; all 115 GLBs pass inspection/Khronos checks. Full asset contracts and transparent icons pass. Remaining model silhouettes are still intentionally stylized and some retain family ancestry; this is not a claim of reference-game fidelity.
- PASS: 33 automated tests and 22 browser checks, including zoom-triggered full-detail loading, reef-era transitions, and stable geometry counts during future scrubbing. Zero console/page errors.
- PASS: inspected complete 1600px-wide contact sheet, whale-shark/condor icons, present reef, zoom and future views. Applied flatter elkhorn forks, vertical shark caudal fin, distinct bird signatures, clearer reef water, smoother underwater colour transitions and restored lagoon blue.
- PASS: isolated median frame time 66.6 → 50.0ms (~25% reduction), p95 remains 66.7ms. Geometry 162,186 → 129,714 triangles with 37 calls, including four instanced reef families. Hardware/browser differences still require physical-device measurement; 60fps is not claimed.
- Local build retains the large-chunk warning. Scientific-data and freshwater-salinity limits are unchanged. No push/deploy.
