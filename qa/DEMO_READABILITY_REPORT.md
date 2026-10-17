# Miniature Earth — demo readability review

Implemented and visually reviewed all seven requested fixes. No new gameplay systems, push or deployment.

- Whole-habitat framing replaces accidental auto-focus on one organism. Smaller rear tree crowns and thinned central cover expose animals.
- Species territories, measured horizontal model-footprint clearance and bounded movement replace stacking and edge fallbacks. All representatives are inside the camera in all nine final captures.
- Tray defaults collapsed: 75px at 1440×900. UI union-area check leaves 76.1% of the viewport unobscured, exceeding 65%. Browse/hide works.
- Cambrian505Ma uses existing trilobites, Anomalocaris, Vauxia and stromatolites. 520Ma remains a smaller supported community. Friendly coverage-gap messaging works at 600Ma. Ediacaran animals stay in their supported dates. Stromatolites are explicitly a sourced period-level ecological proxy.
- Cool green Jurassic, warm Cretaceous clearings, a rear volcanic landmark and Pleistocene snow distinguish the environments. Green Cretaceous dinosaurs stand out against warm ground.
- The 2100 current-trends baseline (requested Exploit comparison) is brown, sparse and hazy; protection is greener. These artistic cues derive from simulated habitat/populations, with no new interventions.
- 512px static shadows, instanced plants, bounded animal representatives, Lambert terrain shading, 80-cell terrain and 56-cell ocean grids. No postprocessing composer is mounted.

## Frame time

Native in-app Chromium, Apple M5 Metal, 1280×720, DPR1 / Auto: Modern, Jurassic and Cretaceous each measured **8.3ms median before and after** (about 120fps). Before p95: 9.7 / 9.1 / 9.3ms; after: 9.2 / 9.1 / 9.1ms. Settled 120-frame snapshots, not long-duration stress tests. Already refresh-limited; no native FPS gain is claimed. Baseline source dbb52e8 ran from an isolated temporary copy with only opt-in measurement instrumentation added.

Matched headless SwiftShader software renderer, 1440×900, Smooth DPR.55, 50-frame samples:

| Scene | Median before ms | Median after ms | P95 before ms | P95 after ms | Triangles before → after |
|---|---:|---:|---:|---:|---:|
| modern | 66.7 | 33.3 | 100.0 | 50.0 | 136,450 → 59,656 |
| jurassic | 116.6 | 50.0 | 116.8 | 66.7 | 109,652 → 40,724 |
| cretaceous80 | 116.7 | 50.0 | 133.4 | 50.1 | 119,232 → 40,030 |
| cretaceous | 116.7 | 50.0 | 133.4 | 66.7 | 141,172 → 44,134 |
| cambrian520 | 50.0 | 33.3 | 50.1 | 50.0 | 31,052 → 17,968 |
| cambrian | 33.3 | 33.4 | 33.4 | 50.0 | 40,368 → 23,866 |
| pleistocene | 100.0 | 50.0 | 100.1 | 50.1 | 75,748 → 27,888 |
| exploit2100 | 116.6 | 50.0 | 116.8 | 50.1 | 132,408 → 36,292 |
| protect2100 | 116.7 | 50.0 | 133.4 | 50.1 | 161,940 → 49,124 |

Software rendering remains below 60fps in most scenes; it is not the native GPU result. Cambrian505 timing is essentially unchanged despite its added fourth group. Biological population totals are unchanged; fewer display representatives improve clarity and cost.

## Checks and visual review

PASS: typecheck, 124 tests across 26 files, build, browser movement, Cretaceous dinosaur presence, disappearance after supported dates, friendly gap label, tray expansion/collapse, viewport-area check, and no captured browser errors. Build retains its existing large-chunk advisory.

Recaptured and personally inspected nine views after each fix, including two Cretaceous dates, two Cambrian dates and both 2100 outcomes. Follow-up visual review corrected marine overlap, undersized sponges and an initially subtle conservation contrast. Small marine props still benefit from the marine view. Sparse dates are honestly labelled, not populated with unrelated species.

The temporary baseline server is stopped. Updated game: http://127.0.0.1:5182/ . Native measurements and software timing JSON accompany the before/after sheets and final screenshots.
