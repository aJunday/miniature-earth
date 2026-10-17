# Miniature Earth — milestone completion review

Completed the seven implementation milestones as a curated browser-game MVP. This is not a claim that every aspirational species or a commercially finished release is complete. All work remains local; no push or deployment.

| Milestone | Result | Evidence |
| --- | --- | --- |
| 1. Visual foundation | PASS | Expanded modern island, terrain relief, procedural materials, foliage, atmospheric lighting; retained and visually reviewed. |
| 2. Oceans and underwater worlds | PASS | Animated depth-coloured water, surf, river highlights, caustics, era-specific reef structures and marine communities; dedicated reef camera. |
| 3. Living historical ecosystems | PASS | Curated resident windows and era presets; required snapshots contain appropriate life, Hadean stays lifeless; deterministic replay and habitat tests. |
| 4. Organism interaction | PASS | 64 authored organisms, eight new historical models, group placement, named joints, walking/swimming/flying/rest/forage/flee/pursuit. |
| 5. Ecological simulation | PASS | Environmental stress, reproduction, finite prey sharing, competition, carrying capacity, disasters and deterministic extinction; pressure explanations. |
| 6. Evolution | PASS | Inherited thermal variation, offspring mutation, differential survival and reproduction; three cited branching-history chapters. |
| 7. Final polish | PASS for supported local checks | Mobile tray, camera and quality controls, clearer scene composition, bounded resource use, retained audio and tested controls. Native GPU acceptance remains unavailable. |

## Verification

- Strict TypeScript, production build and all **48 Vitest tests pass**.
- **46 browser assertions/checks across seven suites**, including drag/drop, invalid habitats, historical scenes, scientific panels, trait replay, lineage navigation, model LOD, animated water, future scrubbing, reset/reload, quality controls and mobile catalogue expansion/collapse. No browser console/page errors.
- All **67 full GLBs** (64 organisms + 3 retained legacy island assets) pass geometry, hierarchy, dimensions, triangle-budget and transparent-icon contracts.
- All **64 distant GLBs** pass node identity, joint-transform, paint and index contracts. The checker now derives expected IDs from the catalogue instead of hard-coding 56.
- All eight new full models and their eight distant variants pass glTF Transform inspection and Khronos validation without errors.
- Opened and reviewed the complete contact sheet, historical showcase sheet, transparent icon and actual Hadean, Cambrian, Carboniferous, Jurassic, Cretaceous, Pleistocene, modern, reef and phone screenshots.
- Applied visual corrections: enlarged sail and brow horns, stronger sloth shoulder/claws, fewer crowded dinosaurs, wider size-aware spacing, more visible ancient marine communities, separated controls/instructions and a collapsible mobile catalogue.

### New model triangles

| Model | Triangles | Budget |
| --- | ---: | ---: |
| Anomalocaris | 2,722 | 3,000 |
| Ammonoid | 2,748 | 3,000 |
| Dimetrodon | 2,754 | 3,000 |
| Triceratops | 2,738 | 3,000 |
| Pteranodon | 1,934 | 3,000 |
| Giant ground sloth | 2,734 | 3,000 |
| Tree lycophyte | 1,356 | 1,500 |
| Ancient horsetail | 1,356 | 1,500 |

## Performance

Isolated 1280×800 headless Chromium, seed 42, same 12-deer/12-fish player fixture, now with the additional resident eagle group:

- Median frame time **50.0 ms**, p95 **66.7 ms**.
- 32 draw calls, 149,430 triangles, 33 geometries.
- Previous water milestone: median 66.6 ms, p95 66.7 ms, 30 calls, 148,152 triangles. The fixture now includes extra birds, so this is an expanded workload rather than a strictly identical scene.
- Faster initial adaptive resolution and cheaper distant-model lighting reduced median time about 25% relative to the previous recorded fixture. Close-up models retain their original materials; users can choose Crisp or Smooth quality.
- Renderer identified as **SwiftShader software Vulkan**. About 20 fps in this environment is not a hardware 60 fps claim. Native Google Chrome profiling was attempted but its Crashpad bootstrap/settings access was denied by the macOS sandbox. This remains an external acceptance limitation.
- Repeated future scrubbing keeps geometry count at 33 → 33.

## Scope and remaining limitations

Historical communities are curated regional snapshots, not a continuous reconstruction of every locality or all organisms across billions of years. Dates of scene introduction/retirement do not force player-added organisms extinct. Missing measured tolerances, detailed conservation assessment dates and unsupported taxon endpoints remain explicitly unknown. Detailed freshwater salinity, rigid-body collisions, full pathfinding, individual genetic simulation and speciation are outside this completed simplified implementation. Evolution uses three illustrative ±2°C variants in four mammal populations and 0.2% offspring mutation; it does not claim measured genetics or direct ancestor chains. Some consumer guilds use explicitly simplified background resources.

The production bundle still emits a size advisory, and the test dependency emits a Three.js CommonJS deprecation advisory; neither is a failed build or runtime error. Physical desktop/phone frame rates need device-side acceptance. Additional species named as examples in the vision are not silently represented by modern substitutes.

## Files and local history

- Historical assets: `art/build_history.py`, `art/render_history.py`, `public/models/`, `public/icons/`, catalogue metadata and manifest.
- Ecosystems: `src/state/communities.ts`, `residents.ts`, replay types/simulation, era profiles and vegetation.
- Behavior/ecology: `src/sim/behavior.ts`, `ecosystem.ts`, `pressures.ts`, corresponding tests and scene batching.
- Evolution: adaptation module/tests, `src/ui/Lineages.tsx`, scientific details and reference notes.
- Polish: camera/quality controls, responsive tray, distant shading, adaptive resolution, QA scripts/reports/screenshots.
- Local commits: milestone 3 `2dffec7`, milestone 4 `4061e1f`, milestone 5 `4184b46`, milestone 6 `8fd59b0`; final polish is committed after this review.

No additional implementation milestone is queued from this seven-part MVP. Next acceptance step is the user's visual/play review and hardware performance testing. The pre-existing `.gitignore` change is preserved and excluded from commits. Deployment remains intentionally unperformed.
