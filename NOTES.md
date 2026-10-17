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
- Final rendering constants: distant mesh initial threshold 44 projected pixels, switch down below 40 and up above 52; distant parts decimated to approximately 48% of full triangles, preserving small parts and all joint transforms.
- Reef gardens use at most 96 candidate colonies across three coastal patches, filtered to submerged habitat; four instanced shapes bound draw calls independently of colony count.
- Coastline distance now interpolates from a nonuniform 72×72 water grid; the centre receives more vertices than the distant ocean. Terrain grid 128×128; rocks use one icosphere subdivision.
- The future drying tint is a material uniform instead of a terrain reconstruction for each timeline tick. Lagoon opacity is handled separately from clear coastal reef water.

- New master-prompt scope: stop after one present-day visual milestone for review; historical default-fauna expansion and advanced behavior remain later work.
- Representative setting is a stylized woodland/meadow/reef habitat mosaic, not a geographically exact community; no new biological claims or external assets are introduced.
- Modern/Holocene horizontal scale is 1.5 (approximately 2.25× land area); older geological landscapes retain their original scale. Modern saved placements migrate once via landscapeVersion 2.
- Ten resident population groups enter at the 2026 showcase date and participate in the existing deterministic ecology. They are regenerated independently of saved player additions; reset restores this baseline.
- Resident grass/oak/flowers/seagrass populations support the food web; environmental vegetation represents these resources visually and does not track each simulated plant one-to-one.
- Close wildlife keeps named joint animation; distant vertex-painted parts merge into a single draw per species, retaining whole-body breathing and movement. No source GLBs are modified.
- Visual refinements after actual screenshots: widened the river's flat bed to remove terrain clipping, clustered flowers/grass, added exposed summit rocks and wetland reeds, increased reef silhouettes, reduced repeated surface sparkles, and extended/fogged the ocean to remove its visible mobile boundary.
- Existing hand-authored model assets and procedural materials remain original. Reference images from mininature earth (2).docx guided rounded forms, habitat grouping, turquoise shallows and warm lighting; reference assets were not copied into the game.
- Remaining visual limitations: distant small-animal joint animation is omitted, freshwater/salinity is not simulated, there is no physical refraction, cliffs/waterfalls and richer bird behavior remain future work, and physical-device frame-rate validation is outstanding.

- Water/underwater milestone preserves the current toy art direction and existing modern resident roster; no new species, dependencies, external assets, push or deployment.
- New marine meadows are decorative seagrass only in Present/Future, rooted on submerged terrain and bounded beneath the wave trough; ancient marine profiles keep their existing microbial/sponge/coral distinction.
- Coral scale is capped using its tallest branch-tip bound (1.3 units) so decorative colonies no longer protrude above shallow water. Player-added marine producer models now anchor to the seabed.
- Water effects are inexpensive approximations: animated flow highlights and surf bands, clearer shallow-water transparency, animated seabed light patterns, and GPU-swaying grass; there is no physical refraction or fluid simulation.
- Performance work removes the invisible placement-grid draw while preserving raycasts, precomputes static coast/lagoon distances, reduces tiny flower/coral-tip triangles, adds canopy detail hysteresis (near above zoom 28, far below 22), and uses diffuse lighting for vegetation/reef batches while retaining terrain/animal materials.
- Performance comparison uses the same viewport, seed, player placements, resident population and adaptive resolution settings before/after; headless software-browser timings do not establish physical-device 60 fps.

- Continuous completion request supersedes the earlier pause-for-review step; no push or deployment is authorized.
- Historical resident windows describe selected representative communities, not precise first/last taxon occurrences; players remain free to experiment outside those windows.
- Added eight original rounded historical assets instead of importing external models; taxonomy is only populated when an exact GBIF match is returned.
- Mutation uses an illustrative 0.2% per-offspring redistribution among thermal variants; it does not change adult individuals or claim measured genetics.
- Three lineage chapters describe branching relationships, not direct ancestor chains. Broad-group ground sloths and plants deliberately retain unknown precise range fields.
- Rendered historical plants and large animals are capped more tightly to preserve open space. An animated bald-eagle pair joins the modern baseline.
- Behavior steering is visual; the deterministic ecological model alone changes population totals, preventing duplicate predation or reproduction accounting.
- Final headless benchmark uses SwiftShader software Vulkan, not a physical GPU; native Chrome profiling was blocked by macOS sandbox access to Crashpad. No 60 fps hardware claim is made.
- Final quality policy responds after 45 initial frames and then 90-frame windows; automatic DPR ranges 0.55–1.0, with explicit Smooth/Crisp overrides. Distant-only materials use diffuse vertex-colour lighting; close models keep their authored materials.
- Small-screen catalogue collapses by default to expose the world and can be reopened with Browse life; it does not remove any catalogue entries or controls.

## 2026-10-16 expanded master assumptions
- The newly attached master specification supersedes the old out-of-time placement rule, 2060 horizon and prohibition on genetics; no deployment or push is authorized.
- Preserve existing tick positions and saved event dates; extend the last linear segment to 2100 rather than remapping old saves.
- Historical mode is a read-only habitat mosaic, not a claim that its globally selected taxa coexist in one real locality.
- Unreviewed dates block historical introductions instead of inventing first/last appearances; living taxa are supported at the present baseline, not automatically throughout their ancestors' history.
- Rabbit insulation uses an explicitly illustrative three-allele locus with annual non-overlapping cohorts, 0.2% offspring mutation and bounded reproductive sampling; these are not measured rabbit genetic parameters.
- A maximum of 256 cohort transitions bounds geological seeks; longer intervals are explicitly labeled approximate.
- The rabbit demonstration is a controlled microhabitat: its cold/warm/food interventions do not change the island's global temperature and it is excluded from the open predator food web. The UI states this limitation explicitly.
- New cohorts receive stable seed/group/generation identities; existing animals never change inherited coat variants. Both the world and comparison view use the same coat geometry function.
- Historical display intervals describe reviewed coverage at the stated taxonomic scope, not exact evolutionary origin dates. For historically documented lost species, sightings define coverage, not first evolution.
- Region filters are deliberately conservative; the default global habitat mosaic is illustrative and is never claimed to be a real coexisting regional assemblage.
- The source catalogue remains incomplete by design: unknown historical intervals block new placement and omitted scenery, while existing experimental descendants do not acquire a historical extinction deadline.
- Use a writable temporary npm cache for asset inspection; do not alter ownership of the user's global npm cache.
- Preserve the user's pre-existing .gitignore change outside all task commits.

## 2026-10-16 completion assumptions (supersede earlier prototype limits)
- The explicit request for remaining rigging supersedes AGENTS.md's original no-armature constraint. Preserve the toy meshes, joint origins and original full/LOD assets; add deformable exports under models/rigged.
- Use nine authored skeletal actions with 0.25-second crossfades, speed-scaled walking, and graded appendage skin weights. Up to four nearby animals per species use skeletons; distant populations retain instancing.
- The four inherited mammal coats also use an exported Insulation morph target. Near/far rendering is a performance representation, not a biological change.
- The isolated rabbit microhabitat is removed. All experimental populations, inherited cohorts, food pools, nutrients, detritus and aquatic conditions now share one pure replay engine.
- Near-present experiments use annual ecological steps and overlapping survivors/offspring; deep-time seeks cap at 512 explicitly labeled ecological steps. These are not reconstructed annual fossil histories.
- Resource pools are finite teaching biomass units, not measured species abundances. Unmodeled prey and specialist browse are labeled guild proxies, not claims about the displayed plant species or geographic co-occurrence.
- Known dated fossil occurrences may be single-date snapshots; do not turn a rounded fossil age into an invented total species range or confidence interval.
- Existing historical-reconstruction tests now call historicalState; ecological tests no longer assume a population survives millions of years without finite food/nutrient turnover.
- Original rabbit, deer, fox and mammoth cohorts are bounded to 160 explicitly modeled individuals; all population changes come from the same ecological solver and preserve individual inherited alleles during life.
- Taxon metadata distinguishes a reviewed functional role from unresolved fossil feeding ecology. Broad native regions do not imply current local occupancy or natural co-occurrence in the mosaic.
- A reviewed fossil snapshot can be visited directly from its evidence panel. The separate numeric year field uses BCE conventions (1 BCE is astronomical year 0).
- Coral energy combines a sunlight-supported symbiosis proxy and finite plankton; reef-fish capacity responds to reef/seagrass support. Marine plant biomass is separate from terrestrial browse.
- Background microbial recycling is always present in a living patch; the visible fungal guild strengthens recycling. Decomposition consumes aquatic oxygen in this normalized teaching model.
- Final overview geometry uses a 96-cell terrain grid and cheaper distant foliage; close foliage keeps its original resolution. This preserves the art while reducing the measured overview triangle count.

## Living default ecosystems update
- The new gameplay request supersedes read-only placement: compatible historical introductions run a temporary coupled experiment; the authoritative reconstruction and saved custom island stay separate.
- Reuse the supported 65-organism catalogue. T. rex and amphibian examples are illustrative user journeys, not authorization to invent unsupported taxa or historical ranges; the same flow is tested with Stegosaurus.
- Default scenes supplement curated patches with eligible reviewed records, bounded to 22 groups. Counts are illustrative, and the global habitat mosaic does not claim natural regional co-occurrence.
- Empty and Custom presets start without populations; Starter uses supported residents. Existing terrain, temperature and habitat/food controls affect simulation; no cosmetic pollution or terrain-edit controls are claimed.
- Invalid introductions use the original GLB, remain visible for five seconds, fade over three, and are removed at eight real seconds. They never enter ecology, reproduction, journal or extinction accounting.
- Regional evidence gaps remain explicit. Fixed empty metadata region arrays hiding already reviewed fallback evidence; rechecked Stegosaurus USA / 152–145 Ma against the Natural History Museum on 2026-10-16.
- No new external models, datasets, dependencies or copyrighted source text are imported. Existing source links remain attached to records; unknown dates/regions stay unknown.
- Historical snapshots use a bounded 96-entry cache and stable species identities. Departing species shrink out over 0.6 seconds; retained groups keep motion state.
- Custom project persistence includes its own time, seed, settings and starting preset. Clear preserves conditions; Reset restores the chosen start. Destructive controls offer cancellation and a downloadable project copy.
- Added rainfall, freshwater availability and pollution interventions to the coupled teaching model: rainfall drives water cycling, available water limits freshwater habitat, and pollution reduces habitat capacity and aquatic oxygen. They are normalized experiment controls, not measured dose-response predictions.
- Drinking is a visual freshwater-bank behavior using the existing feeding pose; threats interrupt it. Hydrology/population effects remain in the shared solver, avoiding duplicate consumption accounting.
- North American Jurassic plant support uses NPS Morrison Formation evidence for broad fern/cycad/conifer proxies, scoped to a conservative 152–145 Ma scene window rather than extending all regional ranges. Source: https://www.nps.gov/subjects/fossils/the-morrison-formation.htm
- Existing saved populations now resume rather than being silently replaced by baseline animals; the science browser fixture includes actual grass/oak food to test deer reproduction in this retained legacy world.
- The guided demo restores the previous world when it finishes or is cancelled. Starting the rabbit lab warns before replacing an existing custom project.

## Complete development prompt — 16 October 2026
- The attached request ends mid-sentence in section 6.5 ("If the simulation has not been calibrated against real-world ecological data, clearly"); implement all complete visible requirements without inventing unseen sections.
- The latest regional-world requirement supersedes the earlier global-mosaic default; use a North American representative woodland/grassland/coast mosaic, not a reconstruction of one exact locality.
- Preserve legacy save-tick coordinates; adapt navigation independently so saved introductions do not change date.
- Add Paleogene, Neogene and Holocene controls; retain optional pre-600-Ma origins with source-linked milestones.
- Prioritize four new original playable animals: American bison, gray wolf, American beaver and Atlantic menhaden; retain the established rounded flat-colour art direction.
- Expand the reference library using exact GBIF taxonomy matches; 240 non-playable reference records deliberately leave ecological and historical fields unknown. These are not counted as fully reviewed ecological records or playable models.
- All four new species have source-linked native range, feeding and physical features. Their size, rates, tolerances and sensitivity are illustrative game parameters, not empirical estimates; no unsupported conservation status or global population is supplied.
- Kew and NPS support present North American grass/oak/deer group proxies; NPS supports Pennsylvanian plant-group proxies and the conservative mammoth regional display window. Broad groups do not imply all members are native or temporally identical.
- Future comparison replays the same founders, seed, climate and player introductions under different selected interventions; no fixed extinction-result tables are used.
- Future defaults are explicit teaching assumptions: +1.5°C over 2026 by 2100, habitat resource multiplier 0.65, pollution 0.35, water availability 0.70. They are not regional climate/conservation predictions.
- Restoration limits resource loss to 5%, corridors increase terrestrial carrying capacity by up to 16%, clean water limits pollution and water loss to 5%, and exploitation/marine controls reduce corresponding modeled mortality by 65%. Food-web constraints and local loss remain possible.
- Use Cycles CPU, 32 samples and denoising for new icon renders. Preserve normalized rig skin weights, named parts and nine shared authored animation clips.
- Local commits only; no push or deployment. Preserve the pre-existing user .gitignore change.

## Continuation 6.5–19 assumptions
- Preserve the existing 69 playable organisms and 240 reference entries; reference-only taxa remain clearly separated from working organisms.
- New custom islands retain an immutable starting snapshot; legacy saves without a snapshot reset from their saved region and starting preset because their original population snapshot is unavailable.
- Explicit hypothetical geographic introductions remain available in custom sandbox mode; historical placement requires reviewed regional evidence.
- Dated regional coverage takes precedence over an illustrative mosaic when choosing a supported travel destination.
- Added one complete South American freshwater representative, capybara, rather than marking unreviewed reference taxa playable. Source-reviewed living habitat/diet, no invented fossil origin; rates and 0.7-unit height remain teaching/art parameters.
- Capybara is represented in shallow freshwater only; amphibious crossing is explicitly not simulated.
- Rendering polish moves inherited rabbit fur tufts to the measured body surface and enlarges the comparison. Movement phase derives from stable individual identity to avoid synchronized species groups.
- Spatial lookups preserve original neighbor ordering and steering results; frame-rate claims are restricted to the measured SwiftShader software renderer.

## Critical overhaul assumptions
- Whole-repository work is authorized; preserve commit da88c6c and the user's .gitignore edit, commit each milestone, never push or deploy.
- Fossil deposit age intervals are uncertain reconstruction windows, not exact species lifespan or proof of presence in every year. Retain source occurrence IDs and references.
- North America remains a representative continental habitat mosaic, never a single reconstructed fossil locality. Broad trilobite, vegetation and ground-sloth proxies are explicitly group-level.
- Triassic has a real missing animal asset, addressed in milestone H after existing scene/camera fixes; do not populate it with Jurassic dinosaurs.
- Use 1872–2026 as a conservative continental display interval for historically documented modern North American residents, not their evolutionary origin or a local census. Stable illustrative founding counts avoid a 2026 loading jump; actual historical abundance is not claimed.
- Critical overhaul: Desmatosuchus and Vauxia are original stylized models; fossil deposit intervals bound display uncertainty, not exact origin/extinction dates. Colours and game dimensions are artistic assumptions.
- Critical overhaul: living species' 1872–2026 continental display continuity is a conservative reconstruction inference, not a local historical census.
- Critical overhaul: early Pleistocene uses southern North American lowlands; a glacial landscape is not assumed globally.
- Critical overhaul: a follow camera follows a representative group across simulation changes, not a documented individual life history.
- Critical overhaul visual QA: removed permanent zero-population animal proxies because they looked alive despite local loss; departure animation remains transient.
- Critical overhaul visual QA: replaced the fish-like old trilobite with an original three-lobed segmented arthropod, using ROM anatomy descriptions and no copied media.
- Critical overhaul: fossil oak foliage is a coarse Quercus habitat proxy based on Florida Museum woods, including reworked Pliocene/Pleistocene material; the interval is not a precise species lifespan.
- Critical overhaul performance: merge distant geometry and update distant animation at at most 30 Hz; selected animals retain deform rigs. Representative population caps were not reduced.
- Critical overhaul final review: added source-reviewed North American Allosaurus/Brachiosaurus distribution and Arthropleura deposit windows; the Carboniferous preset uses 308 Ma within that reviewed interval.
- Critical overhaul final acceptance: a local zero-population group is absent from live rendering; the catalogue still lists supported starting taxa so players can inspect the loss.
- Critical overhaul limits: whole-game software rendering remains below 60 FPS in dense views, and the 357-row coverage report exposes unresolved era/region combinations instead of filling them with unrelated animals.

## Biodiversity expansion assumptions
- Whole-project update; retain North America as the selected default region and preserve the unrelated .gitignore edit. No push or deploy.
- Audit the 24 requested dates and 23 midpoints. Empty implemented coverage means CONTENT MISSING unless a separate source review establishes genuinely limited evidence; absence from this catalogue is not evidence of absence of life.
- Reconstructed counts, colours, dimensions and animation remain illustrative. Deposit-age envelopes are uncertain display windows, not continuous local occupation or exact species lifespans.
- Added twelve genus-level original reconstructions, not twelve exact species populations. PBDB queried US/Canada, accepted genus names and conservative age bounds, retained original references, and rejected anomalous or overly broad records. Bounded queries are not comprehensive occurrence inventories.
- New art preserves diagnostic body plans; colours, proportions and soft tissue are stylized or inferred. Eurypterus uses a shallow marine analogue; precise salinity and physiological tolerances are unknown.
- Source-reviewed fossil genera have disjoint regional deposit-age windows. These do not establish continuous occupation or exact biological origin/extinction; future/local population parameters remain uncalibrated.
- Visual audit added five further genera (Placerias, Dilophosaurus, Camarasaurus, Deinonychus, Diplomystus) to address remaining Mesozoic and Eocene checkpoints. Total: 89 playable, 239 taxonomy references; species-level reference entries remain distinct from genus reconstructions.
- Camarasaurus occurrence occ:591708 is assigned a broad Late Jurassic deposit envelope (161.5–143.1 Ma by PBDB); this uncertain deposit age is not a precise species lifespan. It differs from some timeline boundary conventions and is labeled accordingly.
- Visual fixes: shell ribs moved onto the valve surface, Dunkleosteus eyes moved clear of armor, and Merychippus muzzle extended to distinguish the grazing horse silhouette. Empty scenes offer an explicit nearby supported date without changing region.
- Added Cloudina as a sessile, nested-tube reconstruction using terminal Ediacaran literature (~550–539 Ma) plus North American fossil records. Taxonomic affinities and feeding are unresolved; suspended-food coupling is explicitly a teaching assumption, not a verified diet.
- Expanded existing trilobite and ammonoid group proxies using disjoint screened regional occurrences. The same generalized body plan represents different taxa by interval, not a species surviving hundreds of millions of years.
- A fossil-bin upper age of zero Ma is the recent boundary, not calendar year zero; living oak/grass proxies now cover the Holocene through 2026 without an artificial CE gap.
- Fossil North American Metasequoia is kept separate from living Asian representatives; the genus is not falsely declared globally extinct and the fossil reconstruction is not spawned in the modern mosaic.
- Biodiversity H: cache habitat anchors by organism, terrain era and landscape scale (bounded to 256 entries); terrain is constant within that key, and each caller receives a fresh tuple. This changes computation cost, not the chosen community or coordinates.
- Biodiversity visual acceptance: marine inspection approaches from the seaward side with a steeper angle; a fixed front-right camera hid west-coast benthic animals behind the island. Benthic display clearance is 0.08 game units, an artistic allowance for mesh interpolation, not a biological claim.
- Final woodland review: extend the already-labeled fern, conifer and cycad group proxies using 714 screened North American PBDB records, with raw responses, original references and accepted occurrence IDs retained. Exclude aquatic ferns, horsetails returned within the broad fern class, dispersed spores and ambiguous cycad-like foliage; do not extrapolate species lifespans between deposit windows.
- Final habitat focus weighting gives animal groups three points and plant groups one, so two supported land-plant groups do not automatically hide a sole marine animal group. Both habitats remain manually accessible; the evidence region stays unchanged.
- Modern procedural vegetation only substitutes for oak, grass, wildflower and seagrass. Other supported resident plants retain their own model batches, rather than being silently omitted.
- Small-screen coverage placement follows the measured mode-controls height, leaving the scientific-notes control accessible. Marine and close inspection omit foreground decorative clouds to preserve visibility.
- Strict Mode's development effect replay exposed a rig cache lifecycle error: defer mixer disposal to a microtask and skip it when the same rig remounts; verify all 18 reviewed close-ups have zero page errors.
- Coverage notices must explicitly restore pointer events inside the non-interactive game overlay; mobile coverage disclosure now remains clickable above the WebGL canvas.
- Final scene validation uses 47 current captures and rewind checks: 45 populated, 2 North American content gaps (600 and 580 Ma), 12 well populated, and 33 partial. Do not label those regional gaps evidence that life was absent.
- Final software-renderer measurement is 66.7 ms median / 100 ms p95 in the 22-group, 1280x800 SwiftShader fixture (38 calls, 195,196 triangles). Native GPU/mobile performance remains unmeasured; the habitat-anchor microbenchmark is not a whole-frame speedup.

## Hackathon readability pass
- Scope: composition, spacing, compact existing controls, evidence-backed existing marine models, era cues, conservation feedback and rendering cost; no new gameplay features.
- Default camera frames the habitat rather than one animal; tall plants stay behind the central clearing, with smaller crowns. Explicit close-up/follow controls remain available.
- Preserve dated regional evidence: Dickinsonia and Charnia are Ediacaran, not Cambrian; use supported Cambrian models and friendly gap labels instead.
- Native headed Chromium launch fails in macOS Crashpad startup; use identical 1440×900 isolated Chromium software-renderer measurements and report hardware-60fps as unverified.
- Cambrian North American stromatolites are a period-level ecological-group proxy supported by museum and NPS Early/Late Cambrian deposits, not a continuous species range. Charnia and Dickinsonia remain restricted to their reviewed Ediacaran coverage.
- Display clearance uses baked horizontal LOD bounds, not height: long low marine animals need more space. These are presentation representatives, not a change to biological population totals.
- Era ground and sky colours and the rear Mesozoic volcano are artistic identification cues, not reconstructions of a specific fossil site. Vauxia is displayed at 2.2× asset scale so its silhouette reads beside the larger marine animals.
- Later native measurement succeeded through the existing in-app browser (Apple M5 Metal), despite standalone Chromium Crashpad launch failure. Benchmark the unchanged dbb52e8 source in a temporary work/ copy with only opt-in measurement instrumentation; keep the final app and baseline caches separate.
- Rendering budget uses shared instanced representatives, 512px static shadows, simpler Lambert ground shading, an 80-cell terrain grid and 56-cell ocean grid. No postprocessing composer is mounted. Default demo animal cohorts share a 40-representative budget; population totals remain unchanged.
- Conservation browning/haze and vegetation thinning are exaggerated artistic mappings of habitat state, not measured ecosystem colours or atmospheric forecasts.

## Custom placement repair
- Reproduction found real render/state disagreement: a saved front-clearing oak rendered zero representatives; adding further deer groups left the visible species count at three. Historical showcase placement filters and per-species caps must not suppress authored custom groups.
- Preserve historical automatic composition; custom groups retain a visible representative at their event anchor, with additional members spaced nearby. Existing simulation population totals remain authoritative.
- Custom introductions use reviewed global temporal support and local habitat/environment checks; geographic introductions are hypothetical, not edits to historical regional evidence.
- T. rex is not a playable asset in this catalogue. Test the requested modern out-of-time dinosaur flow with the existing Triceratops model rather than inventing a taxon or adding artwork to a placement repair.
- Initial environmental rejection uses zero viability in the existing teaching model, not empirical tolerance claims; partial fitness remains eligible for the ordinary ecological simulation. Unknown tolerance fields are not fabricated.
- Incompatible previews last eight wall-clock seconds (five visible, three fading), stay outside save/population/extinction data, and retain a labelled loading fallback if the GLB has not arrived.
- Save Island exports the current autosaved project; Load Island validates local JSON before atomically replacing custom state. Reset keeps the original snapshot, and history remains independent.
- Visual QA found an additional preview defect: converting a single GLB material to an array prevents ungrouped geometry from drawing. Preserve material shape when cloning and fading previews; regression-test this separately from HTML labels.
- Custom catalogue starts with All organisms so incompatible-date introductions remain discoverable; historical catalogue retains its era filter. Mobile placement locks orbit until cancel to avoid touch gestures moving the camera.
