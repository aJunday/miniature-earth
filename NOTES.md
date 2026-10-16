# Assumptions

- CLAUDE.md and AGENTS.md are absent from the repository root, its parent locations, and the searched Documents/Codex tree; neither their imported rules nor their complete stack/folder structure can be verified.
- The explicit user request is the source of truth. The provisional stack is React, React DOM, TypeScript, Vite, React Three Fiber, Three.js, Drei, Tailwind CSS, Vitest, jsdom, and Testing Library.
- The provisional folder structure is src/app, src/components, src/components/scene, src/config, src/hooks, src/lib, src/pages, src/styles, src/test, and src/types; every src directory includes index.ts.
- Dependencies use the npm latest stable tags checked during setup, with compatible peer ranges, exact package versions, and a committed-style package-lock.json for reproducibility.
- Baloo 2 and Nunito were downloaded from Google Fonts and bundled in public/fonts/ with their OFL licenses because the live external font request did not load reliably. System fonts remain a fallback.
- The placeholder uses procedural RoundedBox geometry and never imports or modifies the protected art/model/icon directories.
- Reduced-motion preferences stop the box rotation; standard motion preferences show continuous rotation.
- No additional packages or architecture from the unavailable AGENTS.md are invented beyond what the placeholder needs.

# Requests

- Scaffold Vite + React + strict TypeScript, Tailwind, Vitest, and React Three Fiber in the repository root.
- Include dev, build, preview, test (vitest run), and typecheck (tsc --noEmit) scripts.
- Show Miniature Earth in Baloo 2, the exact tagline in Nunito, a full-screen sky background, and a spinning rounded box.
- Leave art/, public/models/, and public/icons/ untouched; verify against the baseline checksums.
- Missing input: CLAUDE.md and imported AGENTS.md are required to certify the full intended stack and folder structure.

# Final constants

- Background: #BFE3F5.
- Title: Miniature Earth; font: Baloo 2.
- Tagline: Build a world. Play with time.; font: Nunito.
- Text: #294F42; rounded box: #8CC152; roughness: 0.7; metallic: 0.
- Box side: 1.7 units; bevel radius: 0.18 units; spin speed: 0.42 radians/second.
- Dev server: http://127.0.0.1:5173 (strict port).
- Dependency versions and verification results are recorded below after installation and checks.

## Installed versions

- @react-three/drei: 10.7.9.
- @react-three/fiber: 9.8.2.
- react: 19.3.1.
- react-dom: 19.3.1.
- three: 0.186.1.
- @tailwindcss/vite: 4.3.3.
- @testing-library/jest-dom: 7.0.1.
- @testing-library/react: 16.3.3.
- @types/node: 26.6.5.
- @types/react: 19.3.0.
- @types/react-dom: 19.3.0.
- @types/three: 0.186.0.
- @vitejs/plugin-react: 6.1.2.
- jsdom: 30.1.3.
- tailwindcss: 4.3.3.
- typescript: 7.0.2.
- vite: 8.3.4.
- vitest: 5.0.5.

## Verification

- PASS: npm run typecheck (strict TypeScript).
- PASS: npm test (two tests: page identity/preview accessibility and live reduced-motion preference handling).
- PASS: npm run build; production output created in dist/.
- PASS: npm run dev serves HTTP 200 at http://127.0.0.1:5173; real WebGL canvas renders the rounded green box; browser error logs are empty.
- PASS: background is rgb(191, 227, 245), with Baloo 2 and Nunito font faces available locally.
- PASS: all src directories have index.ts.
- PASS: all 8,987 protected files have identical paths and SHA-256 hashes; no files created, changed, or deleted in art/, public/models/, or public/icons/.
- Non-blocking: the production Three.js bundle exceeds Vite’s default 500 kB chunk warning threshold.
- Non-blocking: the latest compatible React Three Fiber release uses Three.Clock, which Three.js deprecates; the browser reports a warning, not an error.
- UNVERIFIED: exact CLAUDE.md/AGENTS.md stack and folder compliance because neither file exists in the available workspace.


## A–M run in the intended repository

- The latest user request authorizes all phases, including art changes, phase commits/pushes, and the Phase M deployment attempt; earlier scaffold-only ownership limits no longer define this run.
- Work now targets /Users/arnavjunday/Documents/GitHub/miniature-earth; the verified scaffold was copied from the earlier Codex workspace without replacing existing artwork, NOTES.md, README.md, or CLAUDE.md.
- Read CLAUDE.md completely: it contains only @AGENTS.md. AGENTS.md and PROGRESS.md were absent at the start.
- Specification recovery attempt 1: checked this repository and the earlier workspace directly; AGENTS.md is missing in both.
- Specification recovery attempt 2: searched the available GitHub/Codex and attachment locations and inspected tracked files and cached Git history; no AGENTS.md was found.
- Specification recovery attempt 3: attempted git fetch origin to inspect the upstream specification; HTTPS authentication is unavailable. The unauthenticated GitHub repository API returned 404.
- Missing specification content includes the exact species table, triangle budgets, part contracts, timeline segments/anchors, population rules, scenario tests 1–8, and the authoritative endangered/lost/hope roster. These cannot be certified by inventing replacement tests.
- Blender is still absent at /Applications/Blender.app/Contents/MacOS/Blender; the existing smoke-test binary remains available in the earlier workspace as an explicit fallback.
- Fonts are bundled in src/assets/fonts; reference folders sim/data, state, scene, ui, and audio are present. Installed client libraries include Zustand, Framer Motion, Recharts, and post-processing, but their game features are not implemented yet.

## Current run assumptions
- The complete AGENTS.md supersedes earlier missing-spec notes; the user authorizes the whole project and local commits only.
- Blender startup uses --gpu-backend opengl to avoid Metal initialization crashes; every render still uses Cycles CPU, 32 samples and denoising.
- Impact animals use longest dimension from the impact table; the hawksbill uses its impact size rather than the base height.

## Style notes
- Preserve chunky silhouettes with material-aware mesh simplification to 1,500 plant / 3,000 animal triangles.
- Use black low-set eyes with small white highlights, generous rounded heads, and short sturdy limbs.
- Use the exact era and soil palettes, four island parts, clear empty centres, and consistent three-quarter icon framing.

- Simulation assumption: the explicit out-of-time scenario requires an era-niche penalty beyond temperature alone; modern Jurassic hardy plants receive fitness ×0.04, and modern dinosaurs ×0. Event mortality 0.14/tick makes the specified extinction story visible within the 40-tick event.
- Final simulation constants: producers r=.08 K=200; herbivores r=.05 K=60 need=.05 m=.04; carnivores r=.02 K=8 need=.025 m=.05. Nonviable producers lose .025 N per tick; seeded growth noise is 0–5%.
- Strict TypeScript remains enabled; unchecked indexed access is omitted for numeric tables whose lengths are validated by tests.

- Playwright is added as a development-only dependency because phases G/L/M explicitly require real browser interaction and screenshots.

- IUCN 9 April 2026 update confirms Emperor penguin EN (was NT in AGENTS); use EN.
- Impact ecology parameters and broad ranges are game balancing assumptions, not empirical species measurements; most added animals are habitat-supported to avoid inventing missing food species.
- Historical dates before 1800 require fractional positions within the specified slider segment (one integer tick spans ~82,500 years there). Preserve fractional query/event endpoints for dodo 1500/1600 while integer ticks remain the ecology steps.
- Dodo 1662 is the last reliable sighting, thylacine 1936 the last recorded captive death, mammoth ~2000 BCE an approximate boundary; the story cards explicitly disclose these uncertainties.
- Research fallback: direct HTTP profiles often return 403, IUCN DOI pages time out or deny access; search-indexed official profiles and reputable museum/government pages were checked. Unconfirmed assessment years, dated populations, and extra key moments remain empty rather than invented.
- Phase I visual refinements: removed elephant ears/trunk/tusks from brachiosaurus; authored a striped bee with antennae and broad wings; made Charnia a single feather-like frond; added deer antlers, corrected conifer green, removed dinosaur ears, and gave sea otter a back-floating pose with clasped paws.
- The 56-model contact sheet uses a labelled grid so every asset remains visible; all icons are Cycles CPU transparent PNGs.
- Audio is quiet procedural tones with era-specific ambience; no external audio files. Demo steps use wall-clock time and cancel immediately on pointer or keyboard input.
- Phase K fixes include full-page sky blending, direct touch placement coordinates, translucent placement ghosts, per-individual motion phase, soft fossil colour transitions, and retained animal instances for shrink-out deaths.
- Phase L screenshot review requires actual upward water normals even though two-sided Blender renders had hidden the winding error; the GLB validator now checks this explicitly and checks forward direction for every animal with Head/Body/Tail.
- Official Playwright Chromium runs with --single-process --no-zygote on this Mac; no sandbox policy is changed. Browser smoke and separate touch/keyboard checks pass.
- Vercel CLI 64.4.0 deployment reaches a real login blocker after using a writable --global-config directory; no existing credentials are available. No temporary deployment is substituted for the requested authenticated production deployment.

## Overhaul assumptions
- The October overhaul request supersedes the original flat 20×20 platform, fixed roughness, era gate and forced-extinction rules where they conflict.
- Preserve React/Three.js, all existing assets and local saves; migrate legacy group placement coordinates without deleting user data.
- Use original procedural environment geometry and textures; supplied screenshots are visual references only, with no copied proprietary assets.
- Environmental profiles represent selected miniature habitats, not exact global reconstructions; climate and oxygen suitability indices are gameplay approximations.
- Preserve the pre-existing uncommitted .gitignore addition for .vercel; do not deploy or push in this overhaul.

## Overhaul assumptions and final constants
- The latest comprehensive overhaul supersedes the old flat 20×20 terrain, no-texture and date-forced-extinction rules.
- The island is one representative changing biome, not a reconstruction of Earth's entire geography.
- Procedural texture noise and original authored assets avoid external game asset licensing dependencies.
- Oxygen suitability uses a qualitative 0–1 gameplay index; no precise ancient oxygen measurements are claimed.
- Modern background woodland supplies 0.8 × vegetation-cover browsing suitability; added food still contributes.
- Physically unsuitable habitat removes 20% of a group's population per simulation tick; groups below two become extinct.
- Group sizes are gameplay defaults (trees 5, plants 12, fish 9, large animals 4, small animals 6, predators 3).
- Deep-time simulation ticks are not literal years or generations; inherited traits are deferred rather than misrepresented.
- Catalogue occurrence dates remain null unless separately verified; no exact dates were invented to complete fields.
- Three new original models use the existing 3,000-triangle animal budget and Cycles CPU icon pipeline.
- Continuation showcase roster: deer, redfox, rabbit, honeybee, seaturtle, stegosaurus, mammoth, reeffish, trilobite, arthropleura, fern and oak; covers mammals, reptiles, arthropods, fish and plants.
- Performance measurement uses the same 1280×800 headless Chromium scene with 12 deer and 12 fish; this is a reproducible software-renderer comparison, not a claim about every device.

- Continuation assumption: scientific completeness means every catalogue record exposes a value or explicit evidence gap; no precision is invented for fossil dates, genetic parameters or oxygen thresholds.
- Continuation assumption: reef fish is represented by Amphiprion ocellaris; its group placement is a game default, not a universal schooling claim.
- Continuation assumption: inherited temperature variation is demonstrated on deer, rabbit, red fox and mammoth; it is a deterministic teaching model of standing variation, without mutation or speciation.
- Final constants: inherited thermal offsets −2/0/+2°C; initial frequencies 0.25/0.50/0.25; mortality weighting 1+2×(1−fitness). These are game choices, not empirical measurements.
- Water limitation: axolotl metadata explicitly says freshwater; current water placement has no salinity model. Hawksbill food-web seagrass support remains a simplified ecological link, with the real sponge-rich diet shown in field notes.
- Remaining-polish assumption: preserve the twelve approved-for-review showcase builds; refine all other 44 organisms through their existing scripts and retain named joints, dimensions and budgets.
- Reef decoration is an illustrative miniature habitat, not a species-accurate reconstruction: early microbial mounds, Paleozoic sponge-like forms and later branched/plate corals use era-specific layouts.
- Continue using original procedural geometry and vertex paint; no external models, textures or licences are introduced.
