# Miniature Earth: project spec (source of truth)

Pitch: 'Build a world. Play with time.' A toy-like miniature island. Slide through Earth's history from 4 billion years ago to 2060, place plants and animals, and watch them thrive, struggle or go extinct by simple ecological rules. Hackathon theme: nature / modern. One day. Playable in a browser.

## Team split
- Codex: art/, public/models/, public/icons/ (and, when asked, the whole project).
- Claude Code: everything else when it is used.
- Never edit the other side's folders unless the prompt says you own the whole project. Need something from the other side? Add a line under 'Requests' in NOTES.md.

## Rules for every agent
- Read this whole file before every task.
- Never stop to ask. Make a reasonable assumption, write it as one line in NOTES.md, keep going.
- Do the work; don't describe how to do it.
- End every task by running its checklist and reporting PASS/FAIL per item, then fix any FAIL.
- No libraries beyond the stack unless you write why in NOTES.md.
- Git: commit after every phase or step. Do NOT run git push; the user pushes from GitHub Desktop.

## Machine notes
- macOS (Apple Silicon).
- Blender 3.6.23 executable: /Users/arnavjunday/Documents/Codex/2026-10-16/run-blender-in-background-mode-from/work/blender36/Blender/Blender.app/Contents/MacOS/Blender
- Run it with --background --factory-startup --python <script>.
- Render previews and icons with Cycles on CPU (32 samples, denoiser on). Workbench and Eevee crash in background mode on this Mac.

## Stack (code)
Vite, React, TypeScript (strict), three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, zustand, tailwindcss, recharts, framer-motion, vitest. Sound is synthesised with the Web Audio API. Latest stable versions that work together. No backend, no AI/LLM APIs, localStorage only. Deploy on Vercel.

## Folders
- src/sim/      pure TypeScript simulation. NO React or three imports.
- src/sim/data/ species.json, timeline.json, stories.json
- src/state/    zustand store
- src/scene/    3D (React Three Fiber)
- src/ui/       2D interface
- src/audio/    sound
- public/models/, public/icons/ (Codex art)
- art/          Blender scripts and previews

## World coordinates and scale
- Y is up. 1 unit = 1 game metre. Island top surface at y = 0, spanning x and z from -10 to +10 (20 x 20). Base goes down to y = -4.
- Water zone (lagoon): circle centred at x = 5, z = 5, radius 3.5. Water surface at y = -0.15. The rest of the top is the land zone.
- Decoration (rocks, volcano, background trees) only within 1.5 units of the island edge. The middle stays clear for placing.
- Camera looks from the +x, +y, +z side toward the origin (position about 30, 26, 30). The lagoon is front-right; the back corner (-8, -8) is for the volcano.

## Visual style
- A toy diorama on a desk: rounded, chunky, bevelled shapes that look like painted clay or plastic toys.
- Flat colours only, no image textures. Materials: base colour, roughness 0.7, metallic 0.
- Low poly but smooth silhouettes (bevel, plus one subdivision level where cheap).
- Palette:
  - Precambrian: rock #B5735A, dark rock #7A4A3A, sea #3FA7C9, microbial mats #C9A15B, sky #F4C9A8
  - Jurassic: ground #8CC152, fern #4E9A3A, cycad #6FB34A, conifer #2F7A4A, volcano #5B4A44, lava #FF7A3D, sky #BFE6C9
  - Present: grass #7CC36A, leaves #4FA84E, trunk #8B5E3C, flowers #F7A8C4 and #FFD45C, water #4FB8E6, sand #F2D99B, sky #BFE3F5
  - 2060 high-impact: dry grass #B8B36A, hazy sky #E3D3B5
  - Island sides (all eras): #A0704C top band, #8A5D3F middle, #6E4A33 bottom, #9A9AA6 rock base
  - Fossil stone: #B9B4A8
- Lighting (code): warm key light #FFF1DC from top-right-front, soft shadows, hemisphere fill, ambient occlusion, tilt-shift blur at the top and bottom of the screen, light vignette.

## Creature style (every animal)
- Cute toy proportions: head about 40% of total height, big round eyes set low on the head (black with one white highlight), small mouth, short thick legs, plump round body. Predators look friendly, never scary.
- 2 to 4 flat colours each, from the era palette plus one accent.
- Built from separate named parts so code can animate them: Body, Head, Eye_L, Eye_R, Leg_FL, Leg_FR, Leg_BL, Leg_BR, plus Tail, Arm_L/Arm_R, Wing_L/Wing_R or Fin_L/Fin_R where they exist. Each part's origin sits at its joint (head at the neck, legs at the hip). All parts are children of an empty named Root at 0,0,0.
- No armatures or baked animation. Code animates the parts.
- Plants and coral: parts Root, Trunk (if any) and Foliage (code sways Foliage).
- Whole model: origin at ground level between the feet, facing +Z, standing on y = 0, height as in the species table.
- Triangle budgets: animal 3,000 max, plant 1,500 max, island 15,000 max.

## File contract
- public/models/island_precambrian.glb, island_jurassic.glb, island_present.glb: identical footprint, parts named Top, Sides, Water, Deco.
- public/models/org_<id>.glb for every species id in this file.
- public/icons/org_<id>.png: 256 x 256, transparent background, three-quarter view.
- public/models/manifest.json: a list of { id, file, icon, heightUnits, triangles, parts }.
- art/previews/contact_sheet.png: every model side by side with its id.
- glTF export: Y up, modifiers applied, no cameras or lights, no Draco compression.
- The code must draw a simple primitive placeholder for any missing file, so the game always runs.

## Species (ids are final)
| id | name | era | zone | diet | eats | temp C | rain | height | hardy | tier |
|---|---|---|---|---|---|---|---|---|---|---|
| stromatolite | Stromatolite | Precambrian | sea | producer | - | 15 to 40 | any | 0.6 | yes | 1 |
| charnia | Charnia | Precambrian | sea | producer | - | 12 to 30 | any | 0.9 | no | 2 |
| dickinsonia | Dickinsonia | Precambrian | sea | herbivore | stromatolite | 12 to 30 | any | 0.3 | no | 1 |
| fern | Fern | Jurassic | land | producer | - | 12 to 34 | 0.4 to 1 | 0.6 | yes | 1 |
| cycad | Cycad | Jurassic | land | producer | - | 16 to 36 | 0.3 to 0.9 | 1.0 | no | 1 |
| conifer | Araucaria conifer | Jurassic | land | producer | - | 8 to 32 | 0.3 to 1 | 2.6 | no | 1 |
| stegosaurus | Stegosaurus | Jurassic | land | herbivore | fern, cycad | 22 to 36 | 0.3 to 1 | 1.6 | no | 1 |
| brachiosaurus | Brachiosaurus | Jurassic | land | herbivore | conifer, cycad | 22 to 36 | 0.3 to 1 | 3.0 | no | 2 |
| allosaurus | Allosaurus | Jurassic | land | carnivore | stegosaurus, brachiosaurus | 22 to 36 | 0.3 to 1 | 1.8 | no | 1 |
| grass | Grass | Present | land | producer | - | 5 to 38 | 0.2 to 0.9 | 0.3 | yes | 1 |
| oak | Oak | Present | land | producer | - | 5 to 28 | 0.4 to 1 | 2.4 | no | 1 |
| wildflower | Wildflower | Present | land | producer | - | 8 to 32 | 0.3 to 0.9 | 0.4 | no | 2 |
| seagrass | Seagrass | Present | sea | producer | - | 12 to 32 | any | 0.4 | no | 2 |
| rabbit | Rabbit | Present | land | herbivore | grass, wildflower | 5 to 30 | 0.2 to 1 | 0.5 | no | 1 |
| deer | Deer | Present | land | herbivore | grass, oak | 0 to 30 | 0.3 to 1 | 1.3 | no | 2 |
| redfox | Red fox | Present | land | carnivore | rabbit | -5 to 32 | 0.1 to 1 | 0.7 | no | 1 |
| honeybee | Honeybee | Present | land | herbivore | wildflower | 10 to 32 | 0.3 to 0.9 | 0.35 | no | 2 |
| seaturtle | Hawksbill turtle | Present | sea | herbivore | seagrass | 18 to 32 | any | 0.5 | no | 2 |

Tier 1 = must have for the demo. Tier 2 = add if time allows.

One-line facts (shown in the info card):
- stromatolite: Microbial mats build these layered mounds; fossil ones are among the oldest signs of life, about 3.5 billion years old.
- charnia: A frond-shaped Ediacaran organism that stood anchored to the sea floor.
- dickinsonia: A flat oval creature from about 560 million years ago; chemical traces in its fossils show it was an animal.
- fern: After the dinosaur-ending asteroid, ferns were among the first plants to bounce back, a 'fern spike' seen in rocks worldwide.
- cycad: Cycads were common in dinosaur times; today they are one of the most threatened plant groups.
- conifer: Relatives of today's monkey puzzle tree grew in Jurassic forests.
- stegosaurus: Stegosaurus lived about 150 million years ago, so T. rex lived closer in time to us than to Stegosaurus.
- brachiosaurus: Long front legs and a long neck let it browse treetops like a giant giraffe.
- allosaurus: A top Jurassic predator; one Allosaurus bone has a wound matching a Stegosaurus tail spike.
- grass: Grasses lived alongside late dinosaurs, but wide grasslands spread much later.
- oak: A single oak can support hundreds of insect species.
- wildflower: Flowering plants appeared in the Cretaceous and now make up most plant species on Earth.
- seagrass: Seagrass meadows store carbon and feed sea turtles.
- rabbit: Rabbits can have several litters a year, so their numbers rebound fast.
- deer: Without predators, deer numbers can grow until they over-browse young trees.
- redfox: The red fox has the widest range of any wild carnivore on Earth.
- honeybee: Bees and other pollinators help produce a large share of the crops people eat.
- seaturtle: Nest temperature sets a hatchling's sex: warmer sand produces more females.

## Timeline
- Slider value u from 0 to 1, split into 4,000 ticks. The simulation advances one step per tick.
- Non-linear scale (linear inside each segment):
  - u 0.00 to 0.20: 4,000 to 541 million years ago
  - u 0.20 to 0.32: 541 to 252 million years ago
  - u 0.32 to 0.55: 252 to 66 million years ago
  - u 0.55 to 0.75: 66 million years ago to the year 1800
  - u 0.75 to 1.00: 1800 to 2060
- Display: 'X billion years ago', 'X million years ago', 'X years ago' above 10,000, else the calendar year ('1850', '2060').
- Era names: Archean (4,000 to 2,500 Mya), Proterozoic (2,500 to 541), Paleozoic (541 to 252), Triassic (252 to 201), Jurassic (201 to 145), Cretaceous (145 to 66), Paleogene (66 to 23), Neogene (23 to 2.6), Quaternary (2.6 Mya to 1800), Industrial (1800 to 2026), Future (2026 to 2060).
- Snap buttons: Precambrian = 600 Mya, Jurassic = 150 Mya, Present = 2026, Future = 2060.
- Island environment anchors (interpolate linearly by year; temp in C, rain, sun and habitat 0 to 1):
  - 4,000 Mya: temp 60, rain 0.2, sun 0.7, habitat 1
  - 2,500 Mya: 32, 0.4, 0.9, 1
  - 600 Mya: 24, 0.5, 1, 1
  - 300 Mya: 24, 0.9, 1, 1
  - 150 Mya: 28, 0.7, 1, 1
  - 66 Mya: 27, 0.6, 1, 1
  - 20 Mya: 23, 0.6, 1, 1
  - 2026: 20, 0.6, 1, 1
  - 2060 Protect: 20.6, 0.6, 1, 1.0
  - 2060 Exploit: 21.6, 0.45, 1, 0.5
- The player picks the 2060 scenario (Protect or Exploit); 2026 to 2060 interpolates toward it.
- Asteroid event: when the simulation crosses 66 Mya, for the next 40 ticks sunlight = 0.1 and temp drops 15 C, then returns. Events are counted in ticks because they are too short to see on the scale.
- Island look by year: before 541 Mya = precambrian; 541 to 66 Mya = jurassic; after = present. From 2026 to 2060 under Exploit, tint grass and sky toward the 2060 high-impact colours.

## Simulation rules
- Deterministic: the same placements and seed always give the same result. Seeded RNG (mulberry32).
- Placing = an event { tick, speciesId, count, x, z }: 6 for animals, 10 for plants. The state at tick T = replay of all events up to T from tick 0, cached with checkpoints every 100 ticks. Placing at tick T clears checkpoints after T. Scrubbing backward just shows an earlier cached state.
- Each tick, for every living species (N = population):
  - Fit f = tempFit x rainFit x zoneFit x habitat. tempFit is 1 inside the range and falls linearly to 0 at 5 C outside it. rainFit is 1 inside and falls to 0 at 0.2 outside. zoneFit is 1 if the species was placed in its zone.
  - Producers: Keff = K x habitat x sunlight; N grows by r x N x (1 - N/Keff) x f, minus what herbivores eat.
  - Consumers: food ratio phi = min(1, available prey / (need x N)); growth = r x N x (1 - N/Keff) x f x phi; deaths = m x N x (1 - f x phi). Prey lose what is eaten, split by their share of the prey.
  - Noise: growth x (1 + up to 5% seeded random).
  - Hardy species can't fall below 3 during an event (spores and seed banks).
  - Below 2 = extinct: N = 0, shown as fossils. Extinct species can be placed again.
  - Clamp N between 0 and 1.2 x K.
  - Pollination: honeybee N above 5 multiplies wildflower r by 1.3.
  - Sea turtle: births x clamp(1 - (temp - 21) / 1.5, 0, 1). Warmer nests mean fewer males.
- Starting constants (tune until the scenario tests pass, then record final values in NOTES.md): producers r 0.08, K 200; herbivores r 0.05, K 60, need 0.05, m 0.04; carnivores r 0.03, K 15, need 0.1, m 0.05.
- Rendering: plants draw min(N, 30) individuals (instanced); animals draw min(N, 12); sea animals with size 2.5 or more draw at most 3.

## Scenario tests (the demo story; must pass)
1. Jurassic garden: at 150 Mya place fern, cycad, conifer, stegosaurus, allosaurus. After 300 ticks all five are alive and each stays within 25% of its own average over the last 50 ticks.
2. Asteroid: run that world to 100 ticks past 66 Mya. Stegosaurus and allosaurus are extinct; fern is alive.
3. Present day: at 2026 place grass, oak, rabbit, redfox. At 2060 Protect all four are alive.
4. Two futures: test 3 plus wildflower, honeybee, seagrass, seaturtle. Redfox and seaturtle end at least 30% lower under Exploit than under Protect.
5. Out of time: stegosaurus and fern placed at 2026 end lower at 2060 than at placement.
6. Determinism: the same events and seed give identical populations at every tick.

## Interface
- Full-screen island. Top left: 'Miniature Earth' and the tagline. Top right: era card (era, date, temp, one fact) and a sound toggle.
- Bottom: the timeline bar across the full width, the organism tray below it.
- Right: collapsible panel with a population chart and each placed species marked thriving, stable, declining or extinct.
- When the thumb is past 2026, show a Protect / Exploit toggle.
- Fonts: Baloo 2 (headings), Nunito (body). Panels #FFF9EE at 92% opacity, ink #263238, 16 px corners, soft shadow. Buttons at least 44 px.

## Feel (why it's satisfying)
- Every action answers within 100 ms with movement and sound.
- Place: drops from 3 units up, squashes on landing (y 0.8, x/z 1.2), overshoots, settles in 350 ms; 6 to 8 dust puffs; 'plop' sound with pitch varied by up to 10%.
- Idle: breathing scale 1.00 to 1.03 over 2 to 3 s, random phase per animal; blink (eyes scale y to 0.1 for 120 ms) every 2 to 6 s at random.
- Wander: animals waddle between random points in their zone at 0.4 to 0.8 units/s; body rolls 6 degrees, legs swing 25 degrees.
- Plants: Foliage sways 3 degrees, phase by position.
- Births pop in (scale 0, then 1.1, then 1 over 250 ms); deaths shrink out.
- Extinction: the last individuals fade to fossil stone over 1 s and stay as fossils. Never gory.
- Era change: islands cross-fade over 1.2 s, sky colour tweens, soft whoosh.
- Discovery toast: slides up, stays 3 s, chime; one at a time, others queue.
- Medium polish, not maximum: too many effects hide what matters.
- Easing: easeOutBack for drops, easeInOutCubic for transitions.

## Discoveries (reward moments)
First placement; first extinction; fern spike after the asteroid; a species surviving 100 ticks outside its own era; a population doubling; all four snap points visited; both 2060 futures seen.

## Endangered, Lost and Hope animals (impact layer)

These 36 animals are the emotional heart of the game. All live in the Present era except Lost species, which live in the past until their real extinction date. The base species 'seaturtle' is the Hawksbill turtle and is part of this group.

Columns: id | name | group | listed status (VERIFY) | zone | body template | size (longest dimension, units) | hero
- amurleopard | Amur leopard | Critically Endangered | CR | land | bigcat | 1.0 | hero
- sumatranorangutan | Sumatran orangutan | Critically Endangered | CR | land | primate | 1.1 | hero
- vaquita | Vaquita | Critically Endangered | CR | sea | cetacean | 1.0 | -
- kakapo | Kakapo | Critically Endangered | CR | land | bird | 0.6 | hero
- axolotl | Axolotl | Critically Endangered | CR | sea | lowcrawler | 0.5 | hero
- sumatranrhino | Sumatran rhino | Critically Endangered | CR | land | pachyderm | 1.4 | -
- rightwhale | North Atlantic right whale | Critically Endangered | CR | sea | cetacean | 3.5 | -
- seaturtle | Hawksbill turtle | Critically Endangered | CR | sea | turtle | 0.6 | hero
- pangolin | Sunda pangolin | Critically Endangered | CR | land | smallmammal | 0.7 | -
- philippineeagle | Philippine eagle | Critically Endangered | CR | land | bird | 0.9 | -
- condor | California condor | Critically Endangered | CR | land | bird | 0.9 | -
- forestelephant | African forest elephant | Critically Endangered | CR | land | pachyderm | 2.2 | -
- elkhorncoral | Elkhorn coral | Critically Endangered | CR | sea | coral | 0.8 | -
- tiger | Tiger | Endangered | EN | land | bigcat | 1.3 | hero
- redpanda | Red panda | Endangered | EN | land | bear | 0.7 | hero
- bluewhale | Blue whale | Endangered | EN | sea | cetacean | 4.5 | hero
- mountaingorilla | Mountain gorilla | Endangered | EN | land | primate | 1.3 | -
- asianelephant | Asian elephant | Endangered | EN | land | pachyderm | 2.4 | hero
- whaleshark | Whale shark | Endangered | EN | sea | cetacean | 3.0 | -
- seaotter | Sea otter | Endangered | EN | sea | smallmammal | 0.6 | -
- ringtailedlemur | Ring-tailed lemur | Endangered | EN | land | primate | 0.7 | -
- wilddog | African wild dog | Endangered | EN | land | canid | 0.9 | -
- giantpanda | Giant panda | Vulnerable | VU | land | bear | 1.2 | hero
- snowleopard | Snow leopard | Vulnerable | VU | land | bigcat | 1.1 | hero
- polarbear | Polar bear | Vulnerable | VU | land | bear | 1.5 | hero
- koala | Koala | Vulnerable | VU | land | bear | 0.6 | -
- cheetah | Cheetah | Vulnerable | VU | land | bigcat | 1.1 | -
- emperorpenguin | Emperor penguin | Near Threatened | NT | land | bird | 0.8 | -
- mammoth | Woolly mammoth | Lost | EX | land | pachyderm | 2.6 | hero
- stellerseacow | Steller's sea cow | Lost | EX | sea | cetacean | 3.0 | -
- dodo | Dodo | Lost | EX | land | bird | 0.7 | hero
- passengerpigeon | Passenger pigeon | Lost | EX | land | bird | 0.5 | -
- thylacine | Thylacine (Tasmanian tiger) | Lost | EX | land | canid | 1.0 | hero
- pintatortoise | Pinta Island tortoise (Lonesome George) | Lost | EX | land | turtle | 0.8 | -
- humpback | Humpback whale | Hope | LC | sea | cetacean | 3.5 | -
- baldeagle | Bald eagle | Hope | LC | land | bird | 0.9 | -

Body templates (build each once, every animal is a variation): bigcat, canid, bear, primate, pachyderm, bird, cetacean (whales, sharks, sea cows, vaquita), turtle, lowcrawler, smallmammal, coral.
Each variation changes proportions, colours, markings (spots, stripes, rosettes, patches), and signature features (trunk, tusks, horn, crest, mane, flippers, fins, ears) so every animal is instantly recognisable from its silhouette.
These animals must be the most beautiful and lovable models in the game: big expressive eyes, soft rounded shapes, one memorable signature feature each, same toy style as everything else.
Sea animals with size 2.5 or more render at most 3 individuals and swim slowly in the lagoon, partly above the water line.

Simulation for this layer:
- Each species gets habitatSensitivity (0 to 1) and threats (from: habitat loss, poaching, warming, bycatch, pollution, disease).
- Under Exploit, deaths rise with habitatSensitivity and the number of threats; under Protect, deaths fall and slow recovery is possible.
- Lost species: before their extinction date they behave like normal species. At their real extinction date they go extinct whatever the player did, with a memorial toast.
- The game must label 2060 results as 'game simulation, not a forecast'.

Facts rule: every real-world fact (status, population, dates, threats) comes from a cited reputable source (IUCN Red List first, then government or major conservation organisations). If a fact can't be confirmed, leave it empty. Never invent a number.

Extra scenario tests:
7. Present day with tiger, redpanda, giantpanda, polarbear, seaturtle, bluewhale and their food: under Protect, none are extinct at 2060; under Exploit, at least 3 of them are extinct or below 25% of their Protect value.
8. Lost species: a dodo placed in 1500 is alive in 1600 and extinct after its extinction year in every scenario.

## Out of scope today
Real genetics, machine learning, multiplayer, accounts, Python, payments.
