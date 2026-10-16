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
