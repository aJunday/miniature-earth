# Custom island placement repair

The bug is fixed in the existing application; no renderer replacement or historical data rewrite.

## Reproduced causes

- Saved front-clearing oaks were suppressed by the historical renderer's rear-tree composition rule.
- A shared per-species representative cap left the second and third manually placed deer groups invisible. The saved population increased while the scene stayed at three deer.
- Incompatible GLB previews converted single materials to arrays, so geometry without material groups did not draw. The HTML label alone was misleading. Visual review found this and a material regression test now covers it.
- Expanded controls obstructed placement on small screens. Custom settings now collapse; selecting a card closes the tray; touch placement disables orbit until cancelled.

## Changes

Authored groups retain a representative at their event position, with additional spaced representatives. Automatic historical composition remains unchanged. Mouse, drag and touch share one raycast/placement handler. Missing/loading assets have a visible fallback. Selection remains active for repeated placement, with named feedback, cursor and cancel.

Introductions use reviewed temporal evidence plus habitat and initial environmental fitness. Rejected introductions display a real model for five seconds and fade over three seconds, outside populations, saved events and extinction records. Partial viability still uses the normal ecological simulation; missing evidence is reported as uncertainty.

Save Island downloads the complete custom project; Load Island validates JSON before replacement. Existing autosave, reset snapshots, clear, restore history and deterministic event replay remain intact.

## Live checks

| Test | Result |
|---|---|
| A modern terrestrial | PASS — deer in 2026 |
| B Cretaceous | PASS — Triceratops at 67 Ma |
| C incompatible dinosaur | PASS using existing Triceratops in 2026; T. rex is not playable in this catalogue |
| D Jurassic | PASS — Stegosaurus at 150 Ma |
| E aquatic | PASS — Atlantic menhaden in marine water, American beaver in freshwater |
| F plant | PASS — oak visibly anchored in front clearing |
| G repeat | PASS — additional groups gain visible representatives; original reproduction changed from 3/3/3 deer to 3/6/9 |
| H save/load | PASS — export, clear, import and browser reload restore saved groups |
| I timeline | PASS — rewind before placement hides animals; replay restores identical population outcomes |
| J reset | PASS — original empty 2026 snapshot restored |
| K dates | PASS — 600, 505, 200, 150, 100, 66, 10 and 1 million years ago; 2026, 2050 and 2100 |
| L touch | PASS — 390×844 touch viewport: selection, tap, repeated tap and cancel |

Additional checks: dry-environment rejection, working travel action, invalid save rejection, independent historical/custom state, and historical dinosaur movement/extinction. Browser checks report no console errors. Screenshots were opened and inspected; the preview material defect and mobile overlap were corrected after inspection.

## Automated validation

`npm run typecheck`, `npm test` (132 tests in 28 files), and `npm run build` pass. Build retains the existing large-chunk warning; test tooling reports a Three.js CommonJS deprecation warning. No push or deployment.

## Changed code

- `src/state/index.ts`, `renderBatches.ts`, `placementEnvironment.ts`, `projectFile.ts`, `customPlacement.test.ts`
- `src/scene/Creatures.tsx`, `BatchedOrganisms.tsx`, `IntroductionPreview.tsx`, `OrganismPlaceholder.tsx`, `World.tsx`, `previewMaterials.ts`, `previewMaterials.test.ts`, `PlacementDebug.tsx`
- `src/ui/GameUI.tsx`, `WorldManagement.tsx`, `src/styles/global.css`

`PlacementDebug` is opt-in via `?placementQA`; it projects candidate click targets for the browser tests, which still use real pointer input.

## Limits

T. rex remains unavailable; no species or model was invented for this fix. Tiny fish remain small at island-wide zoom. Valid populations can subsequently decline through ordinary ecology. Representatives are a visual sample of populations; many manually authored groups can exceed the nominal 40-representative target because every authored group retains a visible anchor. Touch was tested with browser emulation, not a physical phone. Scientific ranges remain approximate reviewed coverage, not exact origin/extinction dates.
