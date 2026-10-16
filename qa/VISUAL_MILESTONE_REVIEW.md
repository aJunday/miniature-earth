# Present-day visual milestone — review build

## Implemented
- Modern island horizontal dimensions enlarged 1.5×, approximately 2.25× usable area. Expanded terrain raycasting and habitat bounds, migrated old modern save coordinates once, preserved earlier-era scale.
- Raised rocky summit, exposed boulders, varied grass tint and procedural surface grain, woodland edges, clustered meadow flowers, riverbank stones/shrubs, irregular pond and wetland reeds. Kept open placement clearings.
- Turquoise transparent shallows against deeper blue water, larger reef silhouettes, quieter animated highlights, atmospheric horizon fade and extended ocean geometry for narrow/mobile cameras.
- Ten deterministic resident groups: grass, oak, wildflower, seagrass, bees, deer, rabbits, foxes, reef fish and turtles. Six animal assets render without player input. Plants use environment decoration as a visual population proxy. Residents enter at 2026 and use the existing food web and inherited-trait simulation.
- Resting/grazing head poses on close animals, hovering bees, softer foliage material. Merged distant painted parts into one instanced draw per species; full named joints remain available at the existing zoom threshold.
- Reset clears player additions, retaining the baseline. Resident provenance is visible in inherited-trait details. Title contrast is protected over light and dark backgrounds.

## Changed files
Environment and presentation: `src/scene/Environment.tsx`, `World.tsx`, `Creatures.tsx`, `BatchedOrganisms.tsx`, `src/world/terrain.ts`, `reef.ts`, `src/styles/game.css`.
State and metadata plumbing: `src/state/residents.ts`, `index.ts`, `src/sim/types.ts`, `simulation.ts`, `src/ui/GameUI.tsx`, `ScienceDetails.tsx`.
Verification/documentation: `src/state/residents.test.ts`, `qa/visual-milestone.mjs`, `qa/science-smoke.mjs`, QA JSON/screenshots, `NOTES.md`, `PROGRESS.md`, `README.md`, this report.
No GLBs, icons, Blender source assets or dependencies changed. Pre-existing `.gitignore` modification is excluded from the commit.

## Checklist
- PASS — strict TypeScript check and production build.
- PASS — 37 Vitest tests: existing ecology/extinction/adaptation/replay scenarios plus resident habitat, save migration, land-area ratio and duplicate-free resident rewind.
- PASS — 11 interaction/era browser checks, 5 scientific-panel/replay checks, 4 reef/LOD checks, 2 future-scrubbing checks. Zero console/page errors. Future GPU geometry count stays 30 → 30.
- PASS — initial resident asset loading, reset, rewind/return, reload, mobile overflow and browser-error checks in the new visual smoke script.
- PASS — actual rendered screenshots inspected for present day (overview, zoom, phone), Hadean, Cambrian, Carboniferous, Jurassic and Pleistocene.
- PASS — screenshot-led fixes: jagged river clipping, uniformly scattered grass, weak summit silhouette, glossy foliage, repetitive sparkles, visible mobile ocean boundary and title contrast.
- PASS — local commit; no push, deployment, asset purchase or paid service.
- NOT VERIFIED — 60 fps on a physical modern device. Final isolated headless Chromium benchmark: median 66.7 ms, p95 83.4 ms, 30 draws, 194,742 triangles. The fixture now includes the six resident animal species in addition to player deer/fish, so it is a heavier workload than the previous 50 ms empty-baseline comparison. Do not claim a direct speedup or a 60 fps result.

## Visual review and remaining limitations
The new overview has a clearer wooded/ridge/meadow composition, readable blue-depth contrast, open clearings with visible wildlife, and stronger nearshore reef silhouettes. Zoom shows the existing recognizable toy animals. The references guided palette, rounded forms and habitat grouping; their copyrighted assets were not reused.
This is a stylized woodland/reef mosaic, not a species-accurate geographical reconstruction. It is a reviewable improvement, not a claim of matching the reference games' final production quality. Trees still share a small procedural shape vocabulary, rivers use an approximate surface, water has no physical refraction, and reef detail remains modest. Small distant animals use whole-body motion instead of joint animation; full joint animation appears only when their projected size crosses the threshold. Mobile wildlife is best inspected by zooming.
Earlier eras retain their existing illustrative vegetation and reef shapes and do not yet have curated resident fauna. The present baseline begins at the 2026 showcase date; it does not pretend to model the community's earlier history. Freshwater/salinity, physical-device profiling, richer cliffs/waterfalls, bird behavior, advanced NPC interactions and remaining geological ecosystem expansion are still open. The existing large-JavaScript-bundle warning remains.

## Next milestone
After visual review: deeper underwater habitat art and water motion, coupled with physical-device performance profiling; then extend curated default communities to one scientifically reviewed historical era at a time. Stop here pending review, as requested by the master prompt's immediate assignment.
