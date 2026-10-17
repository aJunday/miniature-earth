# Miniature Earth phase progress

Repository: /Users/arnavjunday/Documents/GitHub/miniature-earth

## Phase A: Project scaffold — DONE

The scaffold now runs in the intended Git repository. npm ci, strict typecheck, both Vitest tests, and the production build pass; the live page renders its spinning rounded box without console errors. Reference folders, local fonts, client dependencies, and all requested npm scripts are present.

Skipped/unverifiable: additional stack or folder rules in the unavailable AGENTS.md. Existing art and documentation were preserved. Git commit/push status is recorded below.

## Run blockers

AGENTS.md is missing after three recovery approaches (direct files, broader local/history search, and upstream fetch). CLAUDE.md imports that missing file. The Git remote requires unavailable HTTPS authentication. No phase will be labelled DONE merely because a dependency or requirement was skipped.


## Phase B: Art pipeline and style check — BLOCKED

The existing Cycles CPU helpers and three sample files remain usable. Re-ran art/validate.py here: island 3,008 triangles, fern 2,604, stegosaurus 6,348; organism heights, ground bounds, hierarchy, and icon transparency pass their existing provisional checks.

Cannot finish the requested correction against AGENTS.md or validate all its species, budgets, and part contracts because that specification is missing after the three recovery approaches above. The expected /Applications Blender executable is also absent; an explicit smoke-test binary fallback exists in the earlier workspace. No unsupported claim of exact art compliance was made.

## Phase C: Simulation engine — BLOCKED

The master prompt explicitly requires every population rule and scenario tests 1–6 exactly as written in AGENTS.md. The defining equations, species fields/constants, timeline segment boundaries, environmental anchors, and scenario assertions are absent. Inventing substitutes would violate the requested exact tests and would not resolve this blocker.

## Phases D–M — NOT STARTED

D (state), E (world), F (placement), G (interface), H (research), I (full model set), J (endangered features), K (demo/polish), L (judge QA), and M (shipping) remain unfinished. Their full acceptance depends on the missing simulation/species/scenario contract. The reference's general feature descriptions are not a substitute for that source of truth. H additionally needs the authoritative endangered/lost/hope roster and threat lists referenced only in AGENTS.md.

Working fallback: the verified scaffold and the three existing sample models, with a clean production build. No fabricated scientific data, substitute scenario tests, or phase-DONE claims were introduced. Deployment was not attempted for an unimplemented game.


## Git and final run status

Phase A was committed locally as 77a7a61 (Phase A: Project scaffold). The required git push was attempted immediately afterward and failed: fatal: could not read Username for https://github.com: Device not configured. Fetch had already failed for the same reason; no credentials or login flow were bypassed.

Stopping condition: the missing authoritative specification could not be recovered after three approaches. Phases B and C cannot pass their required exact checks, and dependent phases are not being marked DONE. A verified working fallback is retained and the dev server is running at http://127.0.0.1:5173 from this repository.

Resume prerequisites: restore AGENTS.md with its full rules/tests and species roster; authenticate the origin remote; supply the specified Blender installation or explicitly retain the existing fallback binary. No deployment URL exists.

## Phase B: Art pipeline and style check — DONE (real spec)
PASS: rebuilt Cycles CPU icons and GLBs; island 3,196/15,000, fern 1,334/1,500, stegosaurus 2,718/3,000 triangles. Actual GLB hierarchy, dimensions, ground bounds, materials and transparent 256px PNGs validate.
Viewed the contact sheet and both organism icons; applied the three style improvements recorded in NOTES.md (exact soil palette/parts, low-set black highlight eyes, silhouette-preserving budget reduction). Missing future models are explicitly listed.

## Phase C: Simulation engine — DONE
PASS: pure TypeScript modules, full 18-species and timeline data, checkpoints and deterministic replay. Scenario tests 1–6, boundary/unit checks and 10-species replay under 50ms pass; npm run sim:report, typecheck and build pass. Constants and explicit temporal-niche assumption are in NOTES.md.

## Phase D: Game state — DONE
PASS: Zustand actions, memoized checkpoint simulation, 100ms autoplay and guarded localStorage persistence. Snap/persistence tests and 400 deterministic in-zone positions pass; typecheck, all 15 tests and build pass.

## Phase E: The 3D world — DONE
PASS: orthographic orbit camera, warm soft-shadow lighting, N8AO/tilt-shift/vignette/SMAA, layered fallback island, GLB boundary, water shimmer and eased era/sky transitions. Live browser has no console errors. Browser review caught and fixed absolute OrbitControls zoom clamping; build and all tests pass.

## Phase F: Creatures and placement — DONE
PASS: manifest-backed GLBs with sized primitive fallback, instanced plant parts, capped animal groups, deterministic in-zone spread/wander, named-part motion, drop/squash/dust, fossils, hover labels and click facts. Zone-valid pointer surface rejects invalid placement and exposes sound hooks. Typecheck, tests and production build pass. Death transitions receive final polish in K.

## Phase G: Interface — DONE with QA follow-up
PASS: pointer/keyboard timeline, snap/zoom/speed controls, organism trays, era card, scenario selection, population chart, queued discoveries and journal. Phone browser interaction and four snap captures are in qa/shots; inspected each, fixed hint/toast overflow. Typecheck/tests/build pass. Desktop automated screenshots are deferred to L because macOS denies Chromium MachPort startup; interactive browser fallback remains usable.

## Phase H: Endangered, Lost and Hope data — DONE with research gaps
PASS: all 36 impact entries, actual source URLs, threat/habitat gameplay parameters, forced historical memorial boundaries, and scenarios 1–8 (17 tests total); build passes. Emperor penguin status updated from NT to EN using IUCN April 2026.
Research gaps: direct profile fetches, official search and alternate authoritative pages were attempted; inaccessible/undated assessment years and population estimates remain empty, and many cards have fewer than three verified dated moments. These fields are hidden rather than fabricated. Exact last-wild-individual dates for dodo/mammoth/thylacine are explicitly uncertain.

## Phase I: The world's models — DONE
PASS: all 53 species and three islands built, including tier 2. All five group validations passed. Final validation prints every node tree, bound and triangle count; 136,788 total triangles, largest organism 2,948/3,000. All 56 glTF Transform inspect/validate runs passed. All organism icons are transparent 256px PNGs. Reviewed the complete contact sheet, corrected seven silhouette/palette issues and re-rendered. Shared template proportions remain intentionally stylised.

## Phase J: Endangered features — DONE
PASS: coloured status badges, sourced story cards with hidden unknown fields, tappable dated moments, threats, sources, status-sorted journal, historical extinction dots, rising/fading Lost ghosts and five-second memorials. Your 2060 lists placed impact animals and switches scenarios with the simulation disclaimer. Fractional historical dates and exact 2026 snap retained. Typecheck, 17 tests and build pass; browser interaction is checked in L.

## Phase K: Sound, demo and polish — DONE
PASS: gesture-started Web Audio effects and quiet era ambience; 60-second captioned tour with asteroid, dodo memorial, present habitat and both futures; user input cancels remaining steps. Added regression tests for demo completion and cancellation. Full-page sky, touch placement, ghost opacity, individual animation phase, death shrink and fossil fade are implemented. Typecheck, tests and build pass. Detailed production screenshot review follows in L; minor stylised motion differs from biological locomotion.

## Phase L: Test like a judge — DONE
PASS: production Playwright smoke at desktop 1440px and mobile 390×844, all four snaps, rabbit population, tiger story, full 60-second demo with six captures and zero console errors. Separate touch/keyboard check passes. Viewed all screenshot states; fixed water normals, overflow, covered hints/captions, panel sizing, label wrapping, future grass tint and chart endpoint. Re-ran layout and targeted regressions. See qa/REVIEW.md and qa/full-smoke-result.json. Official Chromium works with single-process launch; earlier launch blocker is resolved.

## Phase M: Ship — BLOCKED on Vercel login
PASS: strict typecheck, all 19 tests, production build, full production Playwright tour, subsequent layout and targeted render regressions, touch/keyboard interaction, and all 56 model contracts. README.md and PITCH.md are complete.
Deployment attempted with Vercel CLI 64.4.0. Default global settings directory was blocked by the filesystem sandbox; retry with --global-config in the writable workspace reached authentication and returned: No existing credentials found. Stopping at the user's explicit login boundary. No deployment URL exists. No git push was run.
User action from /Users/arnavjunday/Documents/GitHub/miniature-earth: npx vercel login, then npx vercel --prod. The user's normal terminal can use Vercel's default settings directory.

## Current final status
A–L implemented and locally committed; H retains explicitly disclosed unconfirmed research fields. M documentation and checks complete; deployment awaits user login. Historical BLOCKED entries above describe earlier runs, not current missing-spec status. Known follow-ups: complete verified conservation histories, refine individual species silhouettes/motion and population spacing, and reduce the initial bundle plus test more physical phones. No fabricated facts or population estimates were added to fill research gaps.

## Overhaul milestone 1: terrain, catalogue and ecological replay — IMPLEMENTED
The October 16 comprehensive request supersedes relevant original geometry/material/date-gating rules. Added organic raised terrain, procedural surface detail, animated ocean/shoreline, instanced woodland/grass/flowers, era profiles from Hadean to 2060, full-screen world and compact searchable catalogue. Added actual pointer drag/drop, terrain-aware group placement, oxygen/resource suitability, shared deterministic replay, rewind branching and an educational whale lineage. Retained existing assets and authored reef fish, trilobite and Arthropleura.
PASS: typecheck, build, 23 tests including replay performance/determinism, production browser deer/fish drag, invalid fish placement, early-Earth suitability notice, five geological views, lineage navigation, mobile overflow and zero browser console errors. All three new GLBs validate without errors or warnings; triangles 2,564 / 2,724 / 2,698. Icons rendered with Cycles CPU and inspected.
Review found further refinements needed: river/lagoon junction, era-date snap precision, phone framing, and distant seabed boundary. These are addressed in the following polish milestone. Headless interaction is slow; ordinary-device frame-rate target is not yet established. Full adaptation and complete scientific metadata remain deferred, documented in docs/OVERHAUL_REFERENCES.md. No deployment or push.

## Overhaul milestone 2: screenshot-driven polish and validation — IMPLEMENTED
PASS: corrected river/lagoon geometry and source transition, removed terrain-cast seabed rectangle, lowered fish into water, eased water/sky colours, preserved exact deep-time selections and fixed Escape from inputs. Reduced phone card footprint and enlarged mobile world; future scenario controls remain available. Extended the asset validator to catalogue additions without losing the manifest.
PASS: final strict typecheck, 24 tests, production build, repeated 11-check browser smoke with zero errors, all 59 geometry/icon contracts, inspected final desktop/mobile and geological captures. Added README guidance, research/approximation notes and qa/OVERHAUL_REVIEW.md with explicit incomplete acceptance criteria.
INCOMPLETE: inherited adaptation, complete scientific metadata, detailed freshwater ecology, twelve individually reworked showcase models, reference-level terrain/reef polish and ordinary-device frame-rate validation. This completes the higher-priority overhaul milestone, not every feature in the comprehensive vision. No deployment or push.

## Continuation: performance and twelve showcase models — IMPLEMENTED
PASS: animal/plant part instancing, fixed environment shadow maps plus moving soft contact shadows, GPU vegetation sway, reduced distant/ground-cover geometry, adaptive render resolution, removal of costly full-screen passes. Same 12-deer/12-fish headless scene: initial median 183.4ms, final 66.6ms, final p95 66.7ms; 623 forward-render draw calls reduced to 34. Headless software rendering remains below 60fps; no universal hardware frame-rate claim.
PASS: twelve named showcase assets refined, rebuilt and inspected as a sheet; one painted vertex-colour material per part reduces draw calls. Distinct mammal silhouettes, turtle shell/paddles, bee wings/legs, stegosaurus feet/cheeks, fish dorsal fin, arthropod anatomy and fern/oak foliage. All 59 model contracts and the twelve glTF validations pass. Browser placement/era/lineage/mobile checks pass with no console errors; existing 24 tests pass. No push/deploy.

## Continuation: scientific metadata and inherited adaptation — IMPLEMENTED, evidence gaps explicit
PASS: all 56 catalogue entries have structured evidence records, scientific names/ranks where applicable (53 exact GBIF matches; three community/ecological groups), field-level source links, habitat domain, reviewed fossil ranges, food corrections, conservation references and explicit unknown measurements. Hawksbill, axolotl, Arthropleura and Charnia caveats distinguish real biology from simplified game links. Unverified dates, diets and measured tolerances remain unknown; this does not claim comprehensive biological verification.
PASS: deer/rabbit/redfox/mammoth standing heritable thermal variation, reproduction and differential mortality, ecological fitness feedback, per-group UI, deep-copy checkpoint isolation and deterministic branching. No mutation, individual transformation or fabricated ancestry. Tests include selection during actual end-Permian heat stress.
PASS: strict typecheck/build; 30 Vitest tests; 11 original overhaul browser checks plus five scientific/adaptation checks, zero browser console/page errors. Reviewed final desktop, source/trait panels, 12-model sheet and representative transparent icons. Fixed panel bleed-through, restored round tree crowns and separated contact-sheet rows/labels.
Final isolated benchmark after restoring round crowns: median 66.6ms, p95 66.7ms, 34 calls / 162,186 triangles, versus original 183.4ms median. This is about 2.75× faster in headless Chromium, not a 60fps hardware guarantee. Asset contracts and 12 glTF validation reports remain passing; models are unchanged since those validations.
Remaining: physical-device performance measurement; unknown fine scientific records and conservation assessment dates; freshwater salinity ecology; richer reefs and remaining non-showcase family-template assets. No push or deployment; pre-existing .gitignore edit preserved outside commits.

## Remaining model refinement and distant assets — IMPLEMENTED
PASS: rebuilt all 44 non-showcase organisms through the shared template/refinement pipeline; retained the twelve prior showcase source meshes. Added species-specific proportions, facial/coat details, bird feather/toe shapes, rhino ears, primate hands, axolotl gill tufts, cycad leaflets, layered microbial mounds and flattened elkhorn forks. Corrected whale-shark caudal orientation and removed unsupported cartoon eyes from Dickinsonia (named nodes remain neutral lobes for compatibility).
PASS: one vertex-painted material per named part throughout the organism catalogue; generated 56 separate distant-view GLBs with the same joint transforms and names. Full assets remain intact for close viewing. All 59 full assets and 56 distant assets pass glTF inspection/Khronos validation; full asset dimension/budget/hierarchy/transparent-icon contracts pass. Distant asset identity/indices/paint contracts pass. Re-rendered and visually inspected the complete contact sheet; expanded row spacing and moved the camera back to prevent clipping/label overlap.
All preview rendering used Cycles CPU, 32 samples and denoising. No new external assets or dependencies. No push/deploy.

## Reef gardens and further rendering optimization — IMPLEMENTED
PASS: three clustered reef gardens with four instanced shape families, era-dependent microbial/sponge/coral silhouettes, clear shallow water, a separately tinted lagoon, smooth submerged beach slope and sand-to-seabed colour blend. Hadean/glacial profiles omit the gardens. Final screenshots reviewed; refinements corrected hidden reef colours, jagged underwater colour edges and a pale lagoon.
PASS: runtime distant/full model switching with 40/52px hysteresis; browser verifies actual low/full asset requests while zooming. Reduced ground/rock detail, moved coastline math from fragment to vertex shader, retained animated ripples, replaced unnecessary seabed lighting and changed future ground tint to a uniform. Repeated future scrubbing keeps geometry count stable (20 → 20 in the empty-world test).
PASS: 33 Vitest tests, strict typecheck and production build; 22 browser checks across placement/eras, metadata/adaptation, LOD/reef and future scrubbing, zero console/page errors. All 59 full GLBs and 56 distant variants inspected and Khronos-validated; final condor/thylacine signature corrections were revalidated. Full dimensions, hierarchy, triangle budgets and transparent icons pass; distant joint transforms, paint and indices pass. Final sheet and representative icons inspected.
Final isolated 1280×800 12-deer/12-fish headless benchmark: median 50.0ms (previous 66.6ms, about 25% less frame time), p95 66.7ms (unchanged), 37 draws / 129,714 triangles (previous 34 / 162,186). Three additional draws provide the richer reef; fewer triangles and cheaper shading lower median cost. This remains ~20fps in headless software rendering; physical-device 60fps is not established. The large-bundle build warning remains.
No push or deployment. The pre-existing .gitignore change remains unstaged.

## New master prompt: present-day visual foundation — IMPLEMENTED, stopped for review
Expanded modern island horizontally 1.5× (~2.25× area); added raised rocky summit, clustered woodland/meadow planting, riverbank stones/shrubs, irregular pond/reeds, deeper ocean contrast, larger reef silhouettes and an atmospheric horizon. Ten deterministic baseline groups populate the 2026 environment, including six visible animal species. Existing ecology, inherited traits and player branching remain in use. Modern saves migrate once; reset/reload/rewind preserve one baseline.
PASS: typecheck/build, 37 Vitest tests, 22 established browser checks, new resident/reset/reload/mobile checks; no browser errors. Inspected present overview/detail/mobile and Hadean/Cambrian/Carboniferous/Jurassic/Pleistocene screenshots. Corrected river clipping, uniform grass, weak summit, shiny foliage, water repetition, mobile ocean boundary and text contrast.
Distant parts now merge per species; close-view joint animation remains. Final headless expanded-world benchmark including residents plus player deer/fish: median 66.7 ms, p95 83.4 ms, 30 draws / 194,742 triangles. This heavier workload is not comparable to the prior empty-baseline benchmark as a speedup; physical-device 60 fps remains unverified.
See qa/VISUAL_MILESTONE_REVIEW.md for changed files, visual critique and limitations. Earlier-era fauna, sophisticated underwater effects, detailed freshwater ecology and advanced behavior remain future milestones. No GLB/icon changes, push or deployment. Pre-existing .gitignore edit excluded. Stop after this initial environment milestone for user review, per the latest master prompt.

## Water, underwater habitats and smoother rendering — IMPLEMENTED
PASS: animated surf and river highlights, clearer lagoon/coastal viewing water, brighter sand and animated seabed light patterns, modern-only swaying seagrass pockets, submerged coral crown bounds and seabed anchoring for player-added marine producers. Preserved existing toy direction, organism assets, resident roster and historical profile distinctions.
PASS: removed the invisible placement-grid draw without losing raycasting; cheaper diffuse vegetation/reef lighting, small-feature triangle reduction, canopy zoom detail, precomputed ocean coast attributes and independent resource disposal.
PASS: strict typecheck/build; 40 Vitest tests; six browser smoke suites covering placement/eras, science/replay, reef/LOD, future resource stability, resident reset/reload and animated water/mobile views. Zero browser errors. Future geometry count stable at 31. Actual overview, reef close-up and phone captures inspected; improved shallow transparency after the first render obscured coral and grasses.
Matched isolated 1280×800 headless benchmark: median 66.7 → 66.6 ms (essentially unchanged), p95 83.4 → 66.7 ms (~20% less slow-frame time), triangles 194,742 → 148,152 (~24% fewer), draw calls 30 → 30. This improves consistency but does not establish 60 fps; physical-device profiling remains open.
See qa/WATER_MILESTONE_REVIEW.md for files, evidence and limitations. No new external assets/dependencies, no push/deployment. Pre-existing .gitignore change excluded from the local commit.

## Master milestone 3 — Living historical ecosystems — DONE (curated MVP)
Added data-driven resident windows for microbial, Ediacaran, Cambrian/Paleozoic marine, Carboniferous wetland, early Permian, Triassic marine/flora, Jurassic, late Cretaceous, Neogene and Pleistocene snapshots. Default modern birds now fly. Historical residents retire at the end of their curated scene window; player experiments never receive date-forced extinction. Added exact replay/habitat/era-specific animal assertions. Reviewed actual early-Earth, Cambrian, Carboniferous, Jurassic, Cretaceous and glacial renders; reduced clutter, separated dinosaur groups and changed ancient wetland foliage. Every named era snapshot has a living community except deliberately lifeless Hadean.
PASS: strict build, 48 tests, original browser interaction/geological screenshots; 67 full model contracts and 64 LOD contracts. Eight new models and distant variants pass glTF Transform inspect and Khronos validation. Sources and unknowns are recorded per organism. Limits: curated regional scene windows are not continuous global fossil reconstructions; no claim that every taxon listed as an example in the vision has been modeled. Next: finish interaction/behavior acceptance and ecological checks.

## Master milestone 4 — Organism interaction — DONE (curated MVP)
Catalogue now has 64 authored organisms, including eight historical additions with transparent icons, named joints, source records and distant assets. Existing pointer drag/raycast/land-water validation remains. Added modular deterministic steering for walk/swim/fly, forage/rest, prey avoidance and pursuit; joint animation follows rest/flight states. Added group spacing based on size, fewer large animals and predators, and tighter resident plant caps. Corrected birth animations so advancing within an era does not repeatedly drop every animal from the sky.
PASS: unit tests cover habitat bounds over 1,000 steps, speed limits, reproducibility, rest, flee, pursuit and flight/swimming states. Browser checks verify herd/school placement and invalid land drops; rendered historical models and transparent icons inspected. Three art corrections applied and rebuilt: larger Dimetrodon sail, longer brow horns, stronger sloth shoulder/claw silhouette. Limits: visual steering samples nearby group positions; it is not a rigid-body collision or full pathfinding solver. Next: finish ecological acceptance.

## Master milestone 5 — Ecological simulation — DONE (simplified model)
Retained deterministic environmental suitability, rainfall/water availability, oxygen, resource cover, reproduction, carrying capacity, habitat loss and two extinction events. Fixed a real shared-resource bug: prey demand is now apportioned across competing consumers before food satisfaction is computed, so a prey population cannot be consumed repeatedly by different predators. Added concise population-pressure explanations in organism details.
PASS: all existing ecological scenarios and replay/cache/branch tests; new prey conservation and stress-explanation tests; 48 tests total, strict typecheck and production build. Historical group expiry removes only curated residents; user-added populations remain ecological experiments. Limits: this is an aggregate patch model; background resources support some broad food guilds, rainfall is a water-availability proxy, and freshwater salinity is not resolved. Next: validate the evolutionary presentation.

## Master milestone 6 — Evolution — DONE (bounded MVP)
Extended the inherited thermal-variation system with rare offspring mutation, preserving ecological population totals, reproduction-weighted inheritance and differential survival. Added three sourced evolutionary chapters: whales, birds within theropods, and major branches of land-plant history. UI distinguishes documented relationships, illustrative inherited adaptation and unmodeled speciation; no individual changes species.
PASS: warm/cold selection, fitness feedback, neutral reproduction, absent variants without mutation, rare variants with mutation, no mutation without births, no resurrection, normalization, checkpoint isolation and deterministic replay. Prior ecology checks still pass. Limits: three ±2°C thermal variants in four mammal populations, not full genetics; 0.2% mutation is a teaching parameter. Next: final integrated browser, visual and performance acceptance.

## Master milestone 7 — Final polish — DONE for the supported local MVP
Added overview/reef camera controls, Auto/Smooth/Crisp render quality, faster adaptive resolution, cheaper distant-model diffuse lighting with explicit disposal, and mobile catalogue collapse/expand. Improved marine framing, reduced wildlife crowding, separated instruction/control panels and preserved the existing synthesized audio. Regenerated and opened the complete 67-model contact sheet. Fixed the old hard-coded LOD catalogue assertion and the DOM environment's missing matchMedia support.
PASS: strict typecheck/build, 48 unit tests, 46 browser checks across seven suites, zero console/page errors, all full/distant asset contracts and all 16 new GLB inspections/Khronos validations. Final rendered historical, modern, reef and mobile scenes were opened and reviewed. Future geometry count remains 33 → 33.
Final isolated software-renderer fixture: median 50.0 ms, p95 66.7 ms, 32 calls / 149,430 triangles. Previous water run was 66.6 ms median; this run also includes two new resident birds. This is roughly 25% less median frame time, not a physical-device 60fps claim. Hardware Chrome profiling is unavailable because the macOS sandbox denies native Crashpad access. The working headless fallback is explicitly identified as SwiftShader. Bundle-size and dependency-deprecation advisories remain non-fatal.
See qa/COMPLETION_REVIEW.md for PASS/limitations, source notes, tests and the distinction between a completed curated MVP and the larger aspirational catalogue. No push/deployment. User's existing .gitignore edit remains outside commits.

## Latest master milestone status
1 Visual foundation — DONE (retained and reverified).
2 Oceans and underwater worlds — DONE (retained, historical marine residents and reef camera added).
3 Living historical ecosystems — DONE (curated regional snapshots).
4 Organism interaction — DONE (64 authored organisms and modular behaviors).
5 Ecological simulation — DONE (aggregate deterministic model).
6 Evolution — DONE (bounded inherited-variation MVP and three histories).
7 Final polish — DONE for supported local checks; native-GPU/phone acceptance remains external.
Deployment is intentionally excluded under the user's latest instruction, regardless of older Phase M entries.

## Expanded master A1/A2/B — integrated implementation
Implemented exact decade controls and playback, extended horizon to 2100 without shifting saved events, a shared evidence/habitat validator, read-only reconstruction versus seeded experiments, rejected-placement ghosts, annual heritable rabbit cohorts and actual inherited fur geometry with a Then/Now 3D panel and neutral comparison. Unknown historical coverage is blocked explicitly. Further coverage, integration and browser acceptance continue in subsequent milestones; this entry does not certify the entire expanded specification.

## Expanded master C — movement refinement
Added bounded turn rates, smooth acceleration, individual separation and loose conspecific cohesion using live rendered positions. Retained deterministic habitat steering, prey avoidance, pursuit, rest/forage, swimming/flying and named-joint movement; walking phase now responds to speed. Browser acceptance remains part of final integrated validation. No new animation dependency or asset purchase.

## Expanded master D — water material refinement
Added a generated, repeating normal map with two animated sampling directions, view-dependent Fresnel reflection and a restrained specular highlight. Retained depth gradients, turquoise transparent shallows, surf, river flow, seabed caustics, instancing and existing 2.25× modern island area. Texture disposal is explicit. Strict production build passes; browser shader/visual acceptance follows in G.

## Expanded master E — shared life eligibility
Routed procedural land cover, tree proxies and coral/stromatolite gardens through the historical validator; added reviewed broad-group Jurassic plant, Carboniferous plant and Jurassic ammonite display coverage with source links. Ancient conifers are explicitly broad proxies rather than modern Araucaria species. Added modern saprotrophic fungi with an original GLB/icon/LOD, source-linked guild metadata and a bounded decomposition/nutrient feedback. Added freshwater river habitat for axolotls and freshwater-aware movement. Unknown coverage remains unavailable rather than fabricated. Unit and asset checks run; integrated browser verification continues.
