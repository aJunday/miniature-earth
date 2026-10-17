# Miniature Earth — complete-prompt implementation review

Request received 16 October 2026. The supplied attachment stops mid-sentence in section 6.5; no unseen requirements are assumed complete.

## Delivered
- Main navigation spans 600 Ma to 2100, opens in 2026 and uses contextual steps. Future navigation includes 2030 through 2100. Legacy save/event coordinates remain unchanged.
- Optional Earth's Origins preserves early Earth and supplies linked formation, water, microbial life, oxygenation and Ediacaran milestones. Paleogene, Neogene and Holocene have separate jumps. Optional scientific notes explain uncertainty.
- The default is a populated North American representative habitat mosaic with 11 population groups, rather than the earlier global mixture. Regional evidence filters remain strict; sparse evidence is not filled with unrelated animals. Added sourced Carboniferous forest and Pleistocene mammoth regional coverage.
- Four original playable animals: American bison, gray wolf, American beaver and Atlantic menhaden. Each has a transparent icon, full GLB, distant LOD, normalized skin rig and nine shared animation clips. Total: 69 playable organisms, 56 mobile rigs, 72 full assets including islands.
- 240 additional searchable GBIF taxonomy references. These are explicitly non-playable and have unreviewed ecological/date fields left null. This is an expandable research layer, not a claim of 309 fully reviewed ecological species or 240 additional models.
- Dedicated 2026–2100 coupled future simulation with baseline/protection choices and habitat restoration, corridors, exploitation reduction, clean water and marine protection. Population outcomes emerge from food, capacity, reproduction, mortality, water and climate. Historical experimental introductions remain in the replay.
- Compare Futures uses identical founders, introductions, seed and climate, reporting population, surviving local taxa, habitat, water and per-species local survival. Vegetation responds to biomass. Both branches expose assumptions and explicitly disclaim calibration/forecast status.
- Independent custom islands, clear/reset, persisted conditions, reviewed-occurrence travel, invalid previews, evolution lab, camera/quality controls and previous assets remain available.

## Verification
- PASS strict TypeScript and production build.
- PASS 99 unit tests across 19 files.
- PASS complete 72-asset contract: bounds, forward direction, part hierarchy, triangle budgets, dimensions and 256-square transparent icons.
- PASS all 56 rig files: normalized weights, nine clips and finite deformed bounds.
- PASS glTF Transform inspection for each new base asset; Khronos validation for all 12 new full/LOD/rig variants: zero errors and zero warnings.
- PASS close-view runtime checks: all four new animated skin assets load in their supported habitats, with no console/page errors.
- PASS new integrated browser journey: regional default, reference search, new species, adaptive navigation, 2100 conservation comparison, origins, geological jumps, custom preservation and mobile width. No console/page errors.
- PASS living-world regression: timed invalid preview, travel, separate custom island, placement, branching time, clear/reset, restore, reload and seven geological scenes. No console/page errors.
- PASS custom rainfall/water/pollution persistence and habitat travel. PASS reviewed fossil navigation, inherited rabbit experiment and reef rendering. No console/page errors.
- Visual review opened all four new icons, the regional model sheet, default/future/mobile views and close-up habitat captures. Fixed sheet framing, toolbar overflow and panels intercepting mode/reset controls. Fixed mobile filter feeders being incorrectly classified as sessile.

## Asset counts
| Animal | Triangles | Height | Budget |
|---|---:|---:|---:|
| Bison | 2710 | 1.8 | 3000 |
| Gray wolf | 2742 | 1.0 | 3000 |
| Beaver | 2742 | 0.6 | 3000 |
| Atlantic menhaden | 2200 | 0.5 | 3000 |

All four start at ground Y=0 within tolerance and face +Z. Mammal nodes are Root → Body, Head, Eye_L, Eye_R, Leg_FL, Leg_FR, Leg_BL, Leg_BR, Tail. Menhaden uses Body, Head, eyes, paired fins and Tail on Root.

## Evidence and limitations
Taxonomy references link directly to GBIF. New playable anatomy/range/food sources are University of Michigan Animal Diversity Web and NOAA Fisheries. Regional plant and fossil coverage links to Kew and NPS. Origins milestones link to NASA, NHM and published oxygenation research. Sources live beside their fields in the app; unverified origins, tolerances, census counts and conservation statuses remain unquantified.

The future engine is an uncalibrated local teaching model. Parameter choices are disclosed in NOTES.md and the UI. Local loss is not global extinction, and last fossil occurrence is not an exact extinction date. No fabricated result is used to guarantee conservation success. Some taxa/regions/periods remain sparse because evidence or playable representation is missing. Reference entries awaiting ecological review remain visibly incomplete.

Production output retains Vite's large-bundle advisory; build succeeds. Browser timing uses SwiftShader software rendering and does not establish hardware-device frame rates. No push or deployment was performed. The pre-existing user .gitignore edit is excluded from the commit.

## Isolated performance measurement

Current North American default, 11 groups, Smooth quality, 1280×800, SwiftShader: 50 ms median / 50.1 ms p95; 30 draw calls; 105,622 triangles; 32 geometries. The previous 22-group global fixture measured 66.6/66.8 ms and 170,948 triangles. The new regional workload is smaller, so this is a smoother default experience rather than a controlled same-workload speedup. Physical-device performance remains unmeasured.
