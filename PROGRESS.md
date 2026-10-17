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

## Expanded master F — evidence and experiment controls
Added explicit region filtering (unknown regional records remain uncertain), branch resume and local archival when starting a new experiment, persistent selection interventions, source-linked coverage explanations, synchronized decade-window anchoring and dynamic future-year labels. Read-only history cannot receive placements; experimental extinction is labeled local simulation. Added direct store tests for rejection without side effects and intervention branch truncation. Reviewed browser captures and replaced overly spiky fur tufts with rounded, radially oriented tufts; kept the original miniature art direction.

## Expanded master G — local validation completed
PASS: strict build, 61 Vitest tests in 15 files, expanded browser evolution/replay/mobile checks and 11 additional browser regressions, with no console or page errors. Full exported contracts: 68 models and 65 distant variants; new decomposer GLBs pass glTF Transform/Khronos validation with zero errors/warnings. Regenerated and opened the complete Cycles CPU contact sheet and new transparent icon. Opened actual historical, reef, mobile and evolution captures; improved coat alignment/shape, deer crowding and mobile timeline layout. The comparison now uses an orthographic camera so perspective cannot masquerade as phenotype size change.
Added seeded spatial buckets for primary rock avoidance and steep-slope movement checks. Reduced distant water shader work and unnecessary coat draws. Isolated 1280×800 Smooth-quality reconstruction (13 groups) measures 50 ms median / 66.7 ms p95, 36 draws, 150,274 triangles on SwiftShader. Native Chrome is unavailable through the computer-use provider; earlier native launch attempts were blocked by macOS sandbox access. No hardware 60fps claim.
The local playable iteration is complete with explicit scientific/model limits; the entire aspirational master vision is not certified complete. See qa/EXPANDED_MASTER_REVIEW.md for delivered scope, sources, checks and unfinished advanced ecology/rigging/coverage. No push or deployment. User .gitignore edit remains excluded.

## Remaining rigging — DONE
Added reusable Blender armature/skin export for all 52 mobile catalogue animals, graded appendage deformation, nine actions, and four mammal insulation morph targets. Runtime clones skeletons for close animals, crossfades behavior actions, and retains instanced distant models. 52-asset Three.js parsing, normalized skin-weight checks, clip checks and deformed-bounds checks pass. Browser evolution/replay/mobile suite passes with no console/page errors; actual rendered animals inspected. The original toy art and base assets remain intact.

## Remaining scientific coverage — DONE for the 65-entry catalogue
Audited every entry for taxonomic scope, usable dated/present coverage, habitat, feeding evidence and explicit unknowns. Added museum/university dated occurrences for Charnia, Dickinsonia, Anomalocaris, Dimetrodon and Pteranodon; occurrence snapshots do not invent first/last appearance dates. Added reviewed regional and feeding records from Animal Diversity Web, museums, Kew and NOAA. Corrected herbivore placeholders for predators and marine consumers. Added an explicit visit-occurrence control and additional region filters. The catalogue-wide audit verifies every taxon has traceable sources and at least one supported time. Exact speciation dates, physiological tolerances and unresolved diets remain marked unknown, rather than fabricated.

## Remaining ecosystem coupling — DONE
Replaced the production experiment engine with a single replayable coupled model: evolving rabbit/deer/fox/mammoth individuals, finite shared prey, plant grazing, pollination, decomposer and background microbial recycling, detritus and nutrients, finite plankton/invertebrate/fish/browse/prey guilds, freshwater availability, salinity and aquatic oxygen. Temperature/resource interventions affect the whole ecosystem; the neutral comparison replays that same ecosystem. Visual vegetation, reef colonies, meadow density and river width respond to live biomass/water. No enclosure or predator exemption remains. Historical reconstruction remains read-only and dated; experiments are never removed by a historical extinction deadline.
The original ecological tests were updated where they assumed unlimited background resources or simulated historical reconstructions as living counterfactuals. Meaningful replay, food limitation, predation, inheritance, nutrient/oxygen, water, scenario and finite-state tests pass. Full integration and isolated performance validation are recorded below.

## Remaining-work final acceptance — DONE
Rigging, scientific coverage and ecosystem coupling are complete for the supported 65-entry catalogue. PASS: 75 tests / 17 files, strict typecheck and build, 43 named browser checks plus expanded evolution/replay/rejection, zero console/page errors, all 52 rig inspections, Khronos zero errors/warnings, normalized skin weights/clip/deformed-bounds checks, 68 original full-asset and 65 LOD contracts. Reviewed final overview, close rigs, reef, mobile and evolution images. Fixed small-animal zoom access, founding trait display, source-snapshot navigation, sessile movement and glTF skin hierarchy warnings.
The final isolated software-renderer fixture records 50.0 ms median / 66.8 ms p95, 37 calls and 140,740 triangles. Native hardware performance remains unmeasured; no hardware-60fps claim. Scientific unknowns and numerical approximations are documented explicitly in qa/REMAINING_WORK_COMPLETED.md. No requested implementation milestone remains open in this continuation. No push or deployment. User .gitignore edit excluded.
Final visual follow-up: delayed the evolution camera preset until the new era's camera has committed, so starting an experiment from a fossil snapshot reliably frames the animals. Production build and final-local browser checks pass with zero errors; refreshed and inspected the final capture.

## Living-world gameplay priorities 1–3 — DONE
Implemented classified introduction results, original-model eight-second previews, reviewed date/region/habitat travel, highlighted destinations, evidence-filtered automatic populations (22-group default cap), and independent persistent custom islands with three presets. Compatible historical introductions use a temporary coupled food web; the reconstruction and personal project remain separate. Clear, confirmed Reset, restore-default and resume work. Typecheck/build and 87 unit tests pass. New live-browser journey passes 11 grouped checks with zero errors, including actual preview expiry, travel, placement, separate dates, climate, reset, reload and mobile. Final animation polish and broader regression/performance checks follow.

## Living-world gameplay priority 4 and final acceptance — DONE
Added freshwater-bank drinking, consistent animal identity and departure animation, coupled rainfall/water/pollution controls, supported North American Jurassic vegetation, legacy-save retention, protected demo state, and clearer mobile/preview layouts. PASS: 92 tests / 18 files, strict TypeScript/build, 57 named browser checks plus expanded inherited replay, no console/page errors in passing runs. All 17 requested acceptance items and scientific scope are recorded in qa/LIVING_WORLD_UPDATE.md. Actual default, invalid-introduction and mobile images were opened and reviewed; obscured title, translucent dialogs and preview warning placement were corrected.
Isolated 22-group software-browser fixture: 66.6 ms median / 66.8 ms p95, 44 calls, 170,948 triangles. This is a denser workload than the old 14-group baseline, not a speedup or physical-device 60 fps claim. No asset files regenerated. No push or deployment. The pre-existing .gitignore edit remains excluded.

## Complete development prompt — visible implementation delivered
Added adaptive 600-Ma–2100 navigation, optional sourced origins milestones, Paleogene/Neogene/Holocene jumps, a native North American default, reviewed ancient regional vegetation/mammoth coverage, and deterministic coupled conservation futures with an identical-founder comparison. Added four original playable animals with full/LOD/rig/icon assets: 69 playable organisms and 56 mobile rigs total. A separate 240-entry GBIF reference library is explicitly taxonomy-only, non-playable and awaiting ecological review; it is not counted as 240 finished biological simulations.
PASS: strict TypeScript/build, 99 tests / 19 files, 72 full-asset contracts, all 56 normalized skin/action/deformed-bounds checks, and zero Khronos errors/warnings across the 12 new full/LOD/rig variants. Browser journeys cover new history/future/library flows, existing placement/travel/custom/save/reset/evolution behavior, mobile layout, and actual near-view loading of all four new rigs without console errors. Opened and reviewed new icons, contact sheet and desktop/mobile/close habitat images. Fixed stationary filter-feeding fish, panel collisions, mobile overflow and contact-sheet camera framing.
The attachment ends mid-sentence in section 6.5; unseen requirements cannot be audited. Scientific gaps, uncalibrated model assumptions and verification details are recorded in qa/COMPLETE_DEVELOPMENT_REVIEW.md. No push or deployment. The pre-existing .gitignore change stays outside the commit.
Isolated current 11-group regional default: 50.0 ms median / 50.1 ms p95 in SwiftShader, 30 draw calls and 105,622 triangles. This is a smaller workload than the old 22-group global default; no hardware-60fps or equal-workload speedup claim.

## Continuation priorities A–E — DONE
Audited prior commit 15bcc80; preserved existing history, custom worlds and coupled ecology. Fixed immutable custom reset snapshots, finite-date/placement guards, dated regional travel, habitat-specific CTA, and actionable protection defaults. Added deterministic spatial steering with parity tests against the original full scan. Typecheck, 104 tests and production build pass; browser/asset acceptance follows after catalogue work.

## Continuation priority F — DONE
Promoted capybara from taxonomy reference to complete South American freshwater organism, with reviewed San Diego Zoo habitat/diet/anatomy and existing GBIF identity. Added original model, transparent Cycles CPU icon, LOD, nine-clip deformation rig, finite browse food coupling, timeline/region/habitat metadata. Catalogue: 70 playable, 239 reference-only. Typecheck/build and 105 tests pass; all 73 base models pass contract validation, all 57 rigs pass weight/clip/bounds checks, capybara base/LOD/rig have zero Khronos errors/warnings. Icon opened and inspected.

## Continuation priorities C, G and acceptance A–L — DONE (measured limits recorded)
Verified 11-group regional default and preserved miniature environments. Improved inherited fur visibility, comparison scale and individual animation phases. Actual browser suites pass 30 grouped checks covering A–L, including 30-step inherited change/replay and native capybara rig loading. Latest typecheck/build and 105 tests pass; 200 GLBs have zero Khronos errors/warnings. Spatial steering microbenchmark: 223.0 → 75.7 ms (~2.9×); actual SwiftShader default 50.0/50.1 ms median/p95, crowded 66.7/66.8 ms. Native hardware 60 FPS remains unverified. Full 13-part report: qa/CONTINUATION_REPORT.md. No push/deployment; preserve user's unrelated .gitignore change.

## Critical overhaul A — data diagnosis and existing coverage fixed
Root causes: exact one-year fossil snapshots, absent regional group coverage, living taxa gated at 2026, and a genuine Triassic animal gap. PBDB occurrence intervals now support adjacent Cambrian/Cretaceous scrub dates with explicit deposit-age uncertainty. Regional ground-sloth group coverage restores Neogene/early Pleistocene representatives. 106 tests and typecheck pass; visual acceptance follows C–I. Triassic animal implementation remains scheduled for H.

## Critical overhaul B — modern continuity corrected
Reviewed historical/native continental coverage restores the eleven modern resident groups at 1892; passenger pigeon additionally appears before its documented extinction. Starting reconstruction counts are stable across the former 2026 spawn threshold, with no claim of a historical census. Regression distinguishes legitimate extinction from loading discontinuity.

## Critical overhaul C — visibility implementation
Added wildlife framing on era entry, explicit wildlife view, catalogue focus and live representative-follow camera. Stable live position registry feeds actual in-frustum QA counts; selected instanced organisms tint, and new terrestrial group anchors favor clearings. Build/typecheck pass; ten-date visual audit running and repeated after final assets.

## Critical overhaul D — marine presentation
Added a marine camera view that frames loaded aquatic wildlife and reduces foreground water opacity for aquarium-style inspection. New marine anchors prefer shallow water; trilobites sit on the seafloor. Existing base/LOD/rig assets preserved. Build passes.

## Critical overhaul E — visible conservation outcomes
Added same-camera baseline/conservation world switching beside the same-founder comparison. Live vegetation now responds to both plant biomass and modeled habitat availability; rivers already track live water and animal instances track surviving populations. Selected-species explanations distinguish local modeled loss from global extinction. No scripted recovery or extinction outcomes added.

## Critical overhaul F — contextual catalogue and immersive controls
Catalogue defaults to eligible organisms in the selected evidence region; other/all tabs and search preserve experimentation. Added habitat/extant filtering, scientific names and expandable range/habitat/region cards. Existing category, geological-era and conservation filters retained. Immersive mode hides secondary panels while retaining timeline and camera controls. Smaller header/cards leave more world visible.

## Critical overhaul G — distinct representative landscapes
Ancient marine profiles now reduce exposed land, Carboniferous wetlands use a broader meandering channel, and Triassic/Neogene coast shapes differ. Fixed river terrain sampling to use the selected era. Split early Pleistocene wooded lowlands from the late glacial showcase, preventing 1.8-Ma Florida-associated sloths from appearing in a universal snow landscape. These remain labeled habitat dioramas, not literal paleogeographic maps.

## Critical overhaul H — integrated dated coverage additions
Added original Desmatosuchus spurensis and Vauxia gracilenta models, transparent CPU-rendered icons, LODs, metadata and resource-guild integration. Desmatosuchus includes a nine-action deform rig; the attached sponge correctly remains sessile. PBDB deposit-age intervals and ROM/NPS descriptions are explicit, with source uncertainty and original stylized anatomy. A reviewed Olenoides occurrence supports the existing class-level trilobite proxy at the Cambrian showcase. Triassic preset now targets the supported 225-Ma window. 72 playable organisms, 239 reference-only; 75 full model contracts, 72 LODs, 58 rigs; 108 tests pass. New icons opened and reviewed. Counts are illustrative, fossil intervals are not exact species lifespans. Full visual acceptance and coverage-gap report follow in I.

## Critical overhaul I — DONE, with scientific and hardware limits recorded
Completed the A–I implementation pass and twelve-date visual audit. Added 357 era/region coverage rows that explicitly expose gaps. Visual inspection found and corrected lower-UI camera framing, the old fish-like trilobite, permanent zero-population animal proxies, small-organism inspection scale, stale vegetation shadows, and missing mobile date entry. Completed reviewed North American Jurassic dinosaur tags and a dated Carboniferous arthropod showcase. Distant animation/mesh batching and selected-only deform rigs reduce crowd draw calls without reducing population caps.
PASS: typecheck, 109 unit tests in 21 files, production build, 75 base model contracts, 72 LODs, 58 rig checks, 205 GLBs with zero Khronos errors/warnings. Browser regression/interaction suites pass with no captured errors; direct animal clicking, preview expiry, travel, saved custom worlds, reset, climate controls, inherited replay, cameras, mobile and distinct conservation worlds are verified. Twelve final scene images plus icons, evolution, marine, follow and future comparisons were opened and inspected.
Actual SwiftShader measurements are in qa/critical-scenes.json: dense close scenes remain below 60 FPS. Native GPU/mobile device performance is unverified. Scientific coverage remains sparse outside reviewed windows, especially Cretaceous/Cenozoic communities; this is not complete global paleobiodiversity or an empirically calibrated forecast. Full twenty-point report: qa/CRITICAL_OVERHAUL_REPORT.md. No push/deployment; unrelated pre-existing .gitignore edit preserved.

## Biodiversity expansion A — DONE
Audited 24 requested checkpoints plus 23 midpoints against the actual North American default generator. qa/biodiversity-before.json records era bounds, habitat groups, reviewed/model counts, generated populations and per-record exclusion reasons. Identified sparse source windows, missing regional evidence and assets, and a regional temporal eligibility leak. Audit test passes. Renderer visibility will be measured separately during G.

## Biodiversity expansion B — DONE
Fixed regional temporal coverage borrowing and relocated automatic founding groups through the same habitat-aware placement function as dynamically selected groups. 111 tests pass, including deterministic rewind, custom islands, ecology and new interval rejection. Historical-only generation remains separate from intentionally empty sandbox worlds.

## Biodiversity expansion C — DONE (bounded reviewed expansion)
Added twelve playable original models: Platystrophia, Eucalyptocrinites, Eurypterus, Cooksonia, Archaeopteris, Dunkleosteus, Knightia, fossil Metasequoia, Mesohippus, Merychippus, Coelophysis and Edmontonia. Added PBDB screened North American occurrence windows and museum/publication anatomy and ecology sources; restored dated regional Dimetrodon coverage. Catalogue is 84 playable organisms; reference library remains separate. All new full/LOD/icon assets built with Cycles CPU; seven mobile genera receive shared deform rigs, attached filter feeders remain sessile. 111 tests, typecheck and build pass. Full asset contracts and visual inspection continue before acceptance.

## Biodiversity expansion D — DONE
Automatic habitat focus now ranks actual eligible, asset-backed communities and reframes on community/region changes. Marine selection enables the existing transparent inspection view; land/freshwater/marine remain manually selectable, and a persistent Auto habitat setting disables automation. Region is never changed by framing. Added visible coverage diagnostics separating eligible, asset-backed, generated and loaded groups; catalogue absence is labeled missing content rather than limited fossil evidence. New tests cover marine/land selection and eleven dated integrated genera.

## Biodiversity expansion E — DONE
Expanded evidence-backed vegetation coverage for oak, grass, lycophytes and horsetails using screened PBDB group occurrences; added reviewed North American Charnia and Cretaceous ammonite coverage. Forest anchors now prefer back-edge lowlands; early vascular plants and horsetails cluster beside freshwater. Defaults still use bounded instanced representatives and native temporal/geographic checks. Twelve formerly empty requested checkpoints now gain implemented life (including vegetation-only intervals); exact remaining content gaps remain visible and unfilled with unsupported species. 114 tests and build pass; visual audit follows.

## Biodiversity expansion F — DONE
Compatible neighboring dates retain stable group IDs, deterministic population and habitat anchors, with cached rewind. Added a regression across adjacent Triassic dates. Habitat/inspection focus now eases camera position, target and zoom; dragging cancels the transition. Existing per-individual birth/departure animations remain, and new auto-framing triggers on assemblage changes rather than every timeline movement.

## Biodiversity expansion G — DONE: visual validation and refinements
Completed the final current-build 47-date browser pass with 47 deterministic rewinds, screenshots and zero browser errors. Added six original models in this step (five Mesozoic/Eocene animals plus Cloudina), bringing the catalogue to 90 playable organisms; expanded explicitly labeled trilobite/ammonoid group coverage. Current North American evidence has playable groups at 45/47 sampled dates; 600 and 580 Ma remain disclosed CONTENT MISSING regional/catalogue gaps, not claims of lifelessness. Twenty-eight of the 30 previously empty sampled dates now show life. Current statuses: 12 WELL POPULATED, 33 PARTIALLY POPULATED, 2 CONTENT MISSING. Corrected badge overlap, hidden armored-fish eyes, shell ribs, horse muzzle distinction, historical plant visibility, async focus and drop-in animation framing. Visual review sheets, icons and 18 close-model screenshots were opened and reviewed. Detailed era table and limitations: qa/BIODIVERSITY_REPORT.md.

## Biodiversity expansion H — DONE: optimization and acceptance
Cached deterministic habitat anchors (240 repeated lookups: 40.22 ms to 0.88 ms median in the isolated fixture), retained instanced/distant-mesh rendering, and fixed two final interaction/runtime problems: Strict Mode remounts no longer leave Three.js AnimationMixer actions with invalid caches, and coverage notices receive pointer input above the WebGL canvas. PASS: typecheck, 120 tests / 24 files, production build; 93 model contracts, 90 LODs, 70 rig checks and 253 Khronos-validated GLBs with zero errors/warnings. PASS: 47/47 timeline scenes and rewinds, 18/18 close model/rig inspections with zero console errors, mobile notice/pointer/overflow checks. Current 22-group SwiftShader fixture: 66.7 ms median / 100 ms p95 at 1280x800, 38 calls and 195,196 triangles. Dense scenes remain below 60 FPS in software rendering; native GPU/mobile performance is unmeasured. No push or deployment. The user's unrelated .gitignore edit remains excluded.

## Demo readability 1 — sightlines
Replaced automatic single-animal zoom with habitat framing; moved procedural crowns and tall plant anchors behind the clearing, reduced tree height/crown volume and tall plant model scale. Re-captured and opened all nine era/future views at 1440×900: all loaded representatives are in-frustum; trees no longer dominate the dinosaur/ice-age views. The large tray still covers foreground, addressed in step 3. Typecheck passes. Same-setting before measurements saved in qa/readability-before.json; native headed Chromium still fails in Crashpad startup.

## Demo readability 2 — spacing
Assigned deterministic habitat-specific species territories, size-aware individual spacing, shoreline margins and bounded separated motion. Full patches now omit extra visual representatives instead of stacking fallback coordinates; ecological counts are unchanged. Nine views re-captured/opened: all representatives remain in-frame and large mammals/dinosaur groups occupy separate areas. PASS: strict typecheck and 15 focused state, placement, habitat and spacing tests. Compact tray remains next.

### Demo readability 3 — DONE
Collapsed the wildlife tray by default, constrained expanded cards, and raised the habitat framing. All nine era/scenario screenshots inspected at 1440×900: dock is 75px (8.3% of height), all rendered representatives are in frame. Central habitat has more than 65% of viewport height. Typecheck passed.

### Demo readability 4 — DONE
Existing stromatolite assets join the supported Cambrian marine community; dated regional evidence is recorded. Improved marine framing and friendly empty/sparse-coverage text. Visual inspection caught long marine bodies overlapping with height-based spacing; measured horizontal model footprints now drive clearance. Nine captures reviewed, eight focused coverage/layout tests and typecheck passed. Remaining tiny sponge readability is refined with the era presentation pass.

### Demo readability 5 — DONE
Cool Jurassic green, warm Cretaceous clearings, rear volcanic landmark, and existing Pleistocene snow make the eras distinct. Thinned foreground ground cover to expose dinosaur silhouettes. Enlarged the existing sponge presentation and moved marine framing below the masthead. Reviewed all nine screenshots; all representatives in frame. Typecheck passed.

### Demo readability 6 — DONE
Conservation presentation now follows actual simulated habitat: nonlinear vegetation coverage, dry brown ground, subdued animal colour, and visible water/atmospheric haze. Strengthened contrast after the first visual comparison was too subtle. Recaptured and reviewed all nine views; 2100 baseline is visibly dry/hazy and protection is green. Seven conservation/futures tests passed. No new interventions or population rules.

### Demo readability 7 — DONE
Simplified ground shading, reduced terrain/water geometry, capped shadows at 512px and applied a shared animal display budget; repeated plants remain instanced, postprocessing remains absent. Reviewed all nine final screenshots. Matched SwiftShader median frame time: Modern 66.7→33.3ms, Jurassic 116.6→50ms, Cretaceous 116.7→50ms, Pleistocene 100→50ms; Cambrian505 approximately unchanged. Native Apple M5 in-app browser at 1280×720/DPR1: Modern/Jurassic/Cretaceous 8.3ms median both before/after, p95 below 10ms. No unsupported native speedup claim. Typecheck, 124 tests, build and browser interactions pass. Default tray 75px; unobscured viewport 76.1% at 1440×900. Full evidence in qa/DEMO_READABILITY_REPORT.md. Local commits only; no push/deploy. Unrelated pre-existing .gitignore change excluded.
