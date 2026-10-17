# Living default ecosystems gameplay update

Implemented in the existing Miniature Earth application. No push or deployment.

## Delivered

- Two prominent modes: historical exploration and independently saved custom islands.
- Evidence-filtered, deterministic automatic populations: 22 groups in the default global habitat mosaic, with stable identities, instancing, LOD, cached seeks and smooth departure transitions. Earlier periods remain limited to supported life.
- Compatible historical introductions participate in a temporary coupled food web. They do not alter historical records or personal projects. Entering another geological scene ends that temporary experiment; present-to-future experiments continue.
- Incompatible introductions show the actual authored GLB, a marked ring, camera focus and specific explanation. Visible for five seconds, fading for three, removed at eight real seconds. No ecological effects or false extinction event.
- Working reviewed-date, region and habitat travel for all 65 catalogue entries, selected-organism focus and educational details. Unknown regional coverage remains explicitly an illustrative mosaic.
- Empty, Starter and Custom island presets; starting period, temperature and resource capacity; runtime temperature, habitat/food, rainfall, freshwater and pollution controls coupled to ecology.
- Separate Clear, confirmed Reset, Restore Default, Resume and local project persistence. Reset restores the selected start/preset/seed. Destructive dialogs offer a downloadable copy. Legacy saves retain their actual populations. The demo restores the prior world on cancellation/completion.
- Existing rigged animals, inherited variation, food webs, nutrient cycling, water, cameras, source panels and lineage chapters retained. Added freshwater-bank drinking and preserved movement across compatible historical transitions.

## Requested acceptance

| Test | Result | Evidence |
|---|---|---|
| 1 Default population | PASS | 22 groups immediately, no manual setup |
| 2 Geological timeline | PASS | Live era switching and evidence-filtered reconstruction |
| 3 Dense world | PASS | More species/groups, reviewed overview; bounded instances |
| 4 Automatic extinction | PASS | Unsupported later records removed; reconstructed separately from simulated extinction |
| 5 Automatic appearance | PASS | Supported historical models load on era entry and selected destination |
| 6 Manual placement | PASS | Valid history and custom placement; all catalogue taxa can be attempted |
| 7 Incompatible species | PASS | Actual GLB and marker; live expiry check after 5 and before 9 seconds |
| 8 Historical explanation | PASS | Specific categories, approximate reviewed ranges, region/habitat and explicit uncertainty |
| 9 Time travel | PASS | Date, region, habitat population, camera and selected details update |
| 10 Custom island | PASS | Three presets and separate saved project |
| 11 Reset | PASS | Confirmed reset restores date, conditions, original seed and preset |
| 12 Restore default | PASS | Populated history returns without deleting custom project |
| 13 Scientific accuracy | PASS within reviewed catalogue | Every displayed historical group passes shared validator; no invented ranges |
| 14 Validation bug | PASS | Supported, pre-appearance, extinct, regional, habitat and uncertainty results tested separately |
| 15 Performance | PASS for local responsiveness | Bounded/cached population system; isolated timing below. Physical-device 60 fps unverified |
| 16 Rewinding | PASS | Deterministic reconstruction, exact decade round trips and inherited-state replay |
| 17 Existing features | PASS | Camera, rigs, source panels, inheritance, LOD, water and reef regressions |

## Verification

- Strict TypeScript and production build pass.
- 92 Vitest tests across 18 files pass.
- 57 named browser checks across gameplay (11), conditions/habitat (3), completion (14), expanded regressions (11), rigs (3), science (5), water (3), reef (4), final-local (3), plus the expanded evolution/replay journey. Zero console/page errors in passing runs.
- Reviewed actual overview, invalid introduction and mobile screenshots. Moved the warning away from the model, restored unobscured mobile title, made setup panels opaque, and added preview focus/ring.
- Existing GLB assets were not changed; runtime rig/LOD tests passed. Prior asset validation reports remain applicable; no claim of newly regenerated assets.
- Isolated 1280×800 Smooth-quality Chromium/SwiftShader: median 66.6 ms, p95 66.8 ms, 44 draws, 170,948 triangles, 45 geometries. The prior 14-group scene measured 50.0/66.8 ms; this 22-group scene is a larger workload, not a speedup claim. No native-GPU or physical-phone 60 fps certification.
- Nonfatal existing warnings: large production bundle and upstream Three.js Clock/CommonJS deprecations.

## Scientific scope and sources

The existing 65 supported organisms are retained. Example taxa absent from the catalogue (such as T. rex) were not invented; the complete invalid-introduction/travel journey is tested with Stegosaurus and marine fish. Some fossil taxa have only single-date occurrences. Those snapshots are not expanded into unsupported lifetimes. Counts, terrain, ecological rates, three inherited insulation variants and pollution responses are teaching approximations, not measured reconstructions or forecasts.

Fixed empty regional arrays suppressing reviewed fallback evidence. Rechecked [Stegosaurus dates and USA occurrence at the Natural History Museum](https://www.nhm.ac.uk/discover/dino-directory/stegosaurus.html). Added dated regional support for broad Jurassic fern/cycad/conifer proxies from the [National Park Service Morrison Formation account](https://www.nps.gov/subjects/fossils/the-morrison-formation.htm), restricted to a conservative display interval. No new external dataset, imagery, model, API service or dependency was imported. Existing field-level source links and explicit unknowns remain available in the app.

The custom terrain is selected through its starting geological landscape, not a free-form terrain sculptor. Population density and vegetation are controlled by actual populations/resources; the interface does not offer cosmetic controls that pretend to change ecology. Downloaded project copies are archival JSON; the application resumes its independently saved local project automatically through Resume.

Local play: http://127.0.0.1:5182/
