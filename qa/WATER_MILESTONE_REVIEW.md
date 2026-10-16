# Water, underwater habitat and performance milestone

## Implemented
- Animated shoreline surf, irregular water highlights, moving river flow accents and a clearer lagoon.
- Wider transparent turquoise shallows with a brighter sandy seabed. Animated underwater light patterns reuse the ground material, with no additional fullscreen render pass.
- Deterministic modern seagrass pockets around the reef gardens, using five curved ribbons per tuft, instancing and GPU sway. Meadows are absent from ancient/glacial profiles.
- Coral crowns are capped below the wave trough, including the tallest branch tip. Player-added marine producer models anchor to the seabed instead of floating near the surface.
- Removed the invisible placement-grid draw while retaining raycasting; reduced tiny flower/coral-tip geometry; canopy detail increases when zoomed in; vegetation and reef batches use cheaper diffuse lighting. Terrain and animal materials remain intact.
- Static coast/lagoon distances are now computed when ocean geometry is built, instead of evaluating trigonometric coastline formulas every animated frame. Geometry and material cleanup remain independent across era changes.

## Verification
| Check | Result |
|---|---|
| Strict TypeScript / production build | PASS |
| 40 Vitest tests, including ecology/adaptation/replay | PASS |
| New meadow determinism, habitat, rooting and submergence tests | PASS |
| Ancient/glacial exclusion and coral crown bounds | PASS |
| Existing placement, invalid-habitat, era, lineage and mobile checks | PASS |
| Metadata and inherited-trait rewind checks | PASS |
| Near/far model switching and future-scrubbing resource checks | PASS; geometry count 31 → 31 |
| Resident reset/reload/rewind and no duplicate baseline | PASS |
| Open-water animation, habitat switching and phone viewport | PASS |
| Browser console/page errors across six smoke suites | None |
| Actual overview, reef close-up and mobile screenshot review | PASS |

Visual review prompted a second pass to clear the shallow-water band and brighten the seabed: coral colours and curved seagrass were initially too obscured. The final view keeps the rounded miniature forms and warm vegetation while making marine habitat easier to read. No GLBs, icons, species records, dependencies or external assets changed.

## Measured performance
Same isolated headless Chromium fixture: 1280×800, seed 42, resident community plus 12 player deer and 12 fish, same adaptive resolution configuration.

| Metric | Before | After |
|---|---:|---:|
| Median frame time | 66.7 ms | 66.6 ms |
| 95th-percentile frame time | 83.4 ms | 66.7 ms |
| Draw calls | 30 | 30 |
| Triangles | 194,742 | 148,152 |

Slow-frame time fell about 20%, and rendered triangles about 24%. Median throughput is essentially unchanged, around 15 fps in this software-rendered test. This is improved frame consistency, not a claim of 60 fps or a physical-device speed guarantee. The new meadow replaces the removed invisible-grid draw, keeping draw calls unchanged. Raw measurements are in `qa/performance-water-before.json` and `qa/performance-water-after.json`.

## Files
Rendering: `src/scene/Water.tsx`, `MarineMeadow.tsx`, `Environment.tsx`, `Reef.tsx`, `Creatures.tsx`, `BatchedOrganisms.tsx`.
Habitat data/tests: `src/world/reef.ts`, `reef.test.ts`.
Verification/docs: `qa/water-smoke.mjs`, QA results/screenshots/benchmarks, `NOTES.md`, `PROGRESS.md`, `README.md`, this report.

## Limits and next work
Water lighting/reflections are stylized approximations, without physical refraction, fluid simulation, salinity or an underwater camera mode. Modern meadows remain decorative population proxies; historical reef shapes remain illustrative rather than taxonomically exact reconstructions. Dynamic organism self-shadows, richer marine behavior and physical-device profiling remain future work. The existing large JS bundle and Three.js test-import deprecation warnings remain.
Next recommended work: profile GPU/CPU time on a physical browser, then improve underwater camera access and species-specific marine behavior. No push or deployment.
