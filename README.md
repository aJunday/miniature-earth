# Miniature Earth

Build a world. Play with time.

A browser toy diorama spanning 4.54 billion years to 2060. Place plants and animals, explore food webs and extinction, and compare two simplified futures. Includes 56 organisms, one changing procedural island, 36 conservation stories and a one-minute guided demo.

## Run

Use Node 24 (or a version matching package.json), then:

```sh
npm ci
npm run dev
```

Open the URL Vite prints. To check or serve production:

```sh
npm run typecheck
npm test
npm run build
npm run preview -- --port 5181
```

The current overhaul browser suite uses production preview port 5182: `npm run preview -- --port 5182`, then `node qa/overhaul-smoke.mjs`. Install Playwright Chromium first. Screenshots and results are under qa/. Legacy qa/smoke.mjs targets the previous interface.

## Play

Search or filter the catalogue, drag a card onto the island or ocean, or select a card and tap the world. Each drop creates a group. Land/water compatibility is checked; anachronistic experiments are allowed. Press Escape to stop placing. Tap a creature or its info button for source-linked field notes. Deer, rabbit, red fox and mammoth also show inherited tolerance variants and reproductive history.

Drag the timeline, choose a geological period, zoom into its interval, or enter a year (negative for BCE). Arrow keys move five years in recent history; Shift moves ten. Deep-time arrow keys move one or ten simulation ticks. Space toggles playback. Drag the world to orbit when no species is selected; scroll/pinch to zoom. The population panel shows species totals. Life’s story explores a sourced whale lineage without transforming your organisms.

At 2060 switch Protect/Exploit to compare placements. Watch demo runs a captioned 60-second tour; pointer or keyboard input cancels it. Saves stay in localStorage. Reset removes player additions and restores the curated present-day resident community. Residents enter at the 2026 showcase date; earlier-era default fauna are a later milestone. Modern saves migrate to the expanded footprint once.

## How the simulation works

This is a game simulation, not a forecast. Each placement is a persistent population group; rendered individuals represent its population. Groups share species-level food and carrying capacity. Events are replayed deterministically from a seed across 4,000 nonlinear timeline ticks, with cached checkpoints. Temperature, rain, habitat, sunlight, food availability and seeded growth variation shape logistic growth and mortality. Bees assist flowers; turtle births respond to nest temperatures. Impact species have simplified threat and habitat sensitivity parameters. Many added species use habitat-supported capacity instead of an invented complete food web.

The asteroid disrupts temperature and sunlight for 40 game ticks; hardy plants retain a seed-bank floor. The end-Permian event adds heat, habitat loss and mortality for 35 ticks. Oxygen suitability and background plant resources affect survival. There is no temporal-niche penalty or forced extinction at a recorded historical date. Rewinding restores earlier state; placing after rewind branches away from later placements. Constants and limitations are documented in NOTES.md and [research notes](docs/OVERHAUL_REFERENCES.md).

Real science informs the asteroid, fern recovery and turtle nest-temperature relationship. Conservation stories link to IUCN, government, conservation organisations and museums. Unconfirmed population estimates, assessment years and dates are deliberately omitted. Many entries still lack a complete dated history. Dodo 1662 means the last reliable sighting, thylacine 1936 the last recorded captive death, and the mammoth boundary is approximate. These dates simplify complex histories. Emperor penguin status follows the IUCN April 2026 Endangered update.

## Art pipeline

Python is used only for offline Blender asset generation, not the game runtime. The verified local Blender path is in AGENTS.md. Run each art/build_<id>.py with `--background --factory-startup --gpu-backend opengl --python-exit-code 1 --python`. All renders use Cycles CPU, 32 samples and denoising. `python3 art/build_all.py` builds groups; `python3 art/run_all.py` rebuilds the three original samples. `python3 art/validate.py` checks actual exported geometry, materials, dimensions, hierarchy, budgets and PNG transparency and regenerates the manifest. `python3 art/inspect_all.py` runs glTF Transform inspection and Khronos validation. After a bulk rebuild, run art/polish_showcase.py through Blender to regenerate all twelve bespoke showcase assets and bake their vertex-colour materials. Render their four-column review sheet with art/render_showcase.py. Run art/polish_remaining.py for the other 44 refined organisms. After any full model rebuild, run art/build_lods.py through Blender, then python3 art/validate_lods.py and python3 art/inspect_all.py --lod. Distant meshes live in public/models/lod and retain the same named joints; camera zoom selects the full mesh when it becomes readable. Build the three overhaul additions alone with art/build_showcase.py through Blender. Render the labelled sheet with art/render_contact_sheet.py through Blender. Runtime terrain and vegetation are generated in src/world/ and src/scene/Environment.tsx; the three old island GLBs remain archived assets.

## Stack and credits

React, strict TypeScript, Vite, Three.js, React Three Fiber, Drei, React Three Postprocessing, Zustand, Tailwind CSS, Recharts, Framer Motion and Vitest. Playwright is a development-only QA dependency. Audio is synthesised with Web Audio. No backend, accounts, model APIs or analytics; saves remain in localStorage.

Original procedural toy geometry is generated by the included Blender scripts. Baloo 2 and Nunito are bundled Google Fonts; their OFL licences are included with the font assets. Conservation source URLs are stored in src/sim/data/stories.json and exposed on each card. See PROGRESS.md for phase history and research limitations.

## Deploy

```sh
npm run build
npx vercel --prod
```

Vercel uses the Vite preset and dist output. Authenticate with `npx vercel login` if requested. Git commits are local; no push is performed by this workflow.

## Overhaul limitations

The 12 showcase models are individually refined and validated, and inherited adaptation plus structured metadata for all 56 entries are implemented. Unknown fossil dates, measured tolerances, fine habitat/diet records and conservation assessment years remain explicitly unverified. These are evidence gaps rather than invented values. All 44 remaining models have received species-specific refinements, and the reef now uses clustered era-dependent forms. Freshwater salinity ecology, further bespoke sculpting, reference-level environmental detail and broad physical-device performance verification remain follow-ups. Headless frame time improved substantially through instancing and adaptive resolution, but is still below 60fps. The production bundle retains a large-chunk warning. See docs/OVERHAUL_REFERENCES.md and qa/OVERHAUL_REVIEW.md. No production deployment or push was performed.

Inherited variation is a teaching model of three thermal-tolerance variants, not measured genetics. Reproduction passes variants to offspring and differential survival changes frequencies; the weighted tolerance affects ecological fitness. Recorded turnovers are not calendar generations. Rewinding restores both populations and traits. No individuals transform into new species.

## Latest rendering polish

Screen-size model selection uses distant variants below 40 projected pixels and full detail above 52, with a 44px initial choice. The gap prevents rapid switching near a threshold. Geometry, joint names and vertex paint are validated offline. All catalogue organisms now use one material per animated part. Repeated reef colonies use four instanced geometry families; Hadean and glacial showcases omit reefs, and early eras avoid modern coral silhouettes.

The water shader computes coastline distance per vertex on a grid concentrated near the island. Shallow water reveals reef colours while the lagoon retains a stronger turquoise tint. Future ground tint is a shader uniform, so scrubbing recent years no longer rebuilds the terrain mesh on each tick. Terrain, river and procedural-texture resources are released when replaced.

### Present-day visual review milestone
The modern island uses a 1.5× horizontal footprint, a rocky summit, a wider river valley, an irregular pond with reeds, clustered meadow planting and three shallow reef gardens. Ten baseline populations include deer, rabbits, foxes, bees, reef fish, turtles and their plant resources. The initial view is alive without placement; player events still branch and replay deterministically.

Distant vertex-painted organism parts merge into one instanced draw per species. Zoom restores the existing full jointed models when their projected size crosses the detail threshold. Ocean geometry extends beyond the mobile view and fades into atmospheric colour. See `qa/VISUAL_MILESTONE_REVIEW.md` for checks, screenshots and limitations. This milestone stops for visual review before further historical ecosystem work.

Water now includes animated shoreline surf, river flow highlights and seabed light patterns. Modern reef gardens have instanced swaying seagrass, and decorative coral crowns stay submerged. Shallow water is clearer so marine habitat can be inspected from above. See `qa/WATER_MILESTONE_REVIEW.md` for verified changes and the matched performance comparison (about 20% lower slow-frame time, median essentially unchanged in headless Chromium).

## Living worlds and custom islands

The default **Explore Earth's History** view automatically chooses evidence-supported populations. The global mosaic is illustrative; the region filter uses reviewed records. Detailed controls move exactly ten years; the geological selector makes large jumps. Some taxa have only a dated fossil snapshot, so gaps remain honestly unpopulated.

Place any catalogue organism. A compatible introduction starts a temporary coupled food-web experiment, clearly separated from the historical record. An incompatible introduction shows its actual model for eight seconds, explains the mismatch and offers a sourced time/habitat destination. The preview cannot breed or change populations.

**Create Your Own Island** offers Empty, Starter and Custom presets, a starting era and environmental conditions. Temperature, habitat/food capacity, rainfall, freshwater availability and pollution affect the teaching simulation. Clear Island removes populations while retaining date/settings; Reset Custom Island returns to the chosen beginning. Both destructive controls ask for confirmation. A downloadable JSON copy is available before replacement/reset. Returning to history or restoring its default ecosystem preserves your locally saved custom island; Resume restores its own date and conditions. Browser reload opens historical exploration, with the saved custom project available to resume.

Scientific bounds: 65 existing catalogue organisms, bounded fossil coverage, representative habitats and illustrative counts. This is not a global paleogeographic reconstruction or quantitative ecological forecast. Unsupported example taxa are not invented. The historical timeline never acquires a sandbox extinction or evolutionary outcome.
