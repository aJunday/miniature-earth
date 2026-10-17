import json,pathlib,shutil,subprocess,html
root=pathlib.Path(__file__).resolve().parents[1]
out=pathlib.Path('/Users/arnavjunday/Documents/Codex/2026-10-16/run-blender-in-background-mode-from/outputs/biodiversity-expansion');out.mkdir(parents=True,exist_ok=True)
def read(p):return json.loads((root/p).read_text())
before=read('qa/biodiversity-before.json');after=read('qa/biodiversity-after.json');species=read('src/sim/data/species.json');metadata=read('src/sim/data/metadata.json');review=read('qa/evidence/biodiversity/review.json');scenes=read('qa/biodiversity-scenes.json');validation=read('art/reports/validation.json');refs=read('src/sim/data/research-catalogue.json')
new=[v['id'] for v in review];names={s['id']:s['name'] for s in species}
rows=['| Date | Groups before → after | Habitat groups after |','|---|---:|---|']
for a,b in zip(before,after):rows.append(f"| {b['year']:,} | {len(a['defaultGroups'])} → {len(b['defaultGroups'])} | {', '.join(b['defaultGroups']) or 'CONTENT MISSING'} |")
assetrows=['| New model | Triangles | Height |','|---|---:|---:|']
for ident in new:
 v=validation['org_'+ident];assetrows.append(f"| {names[ident]} | {v['triangles']} | {v['height']:.2f} |")
changes=subprocess.check_output(['git','diff','--name-only','1c65ed2','--','.',' :(exclude).gitignore'.strip()],cwd=root,text=True)
(out/'changed-files.txt').write_text(changes)
remaining=[r['year'] for r in after if not r['defaultGroups']]
report=f'''# Miniature Earth — biodiversity expansion

Local implementation; no push or deployment. North America remains the selected default region. All population counts and body proportions are illustrative, not historical censuses or empirical forecasts.

1. **Previously empty ranges.** {sum(not r['defaultGroups'] for r in before)}/47 audited dates were empty, including {sum(not r['defaultGroups'] for r in before[:24])}/24 requested checkpoints. The table below includes each requested checkpoint and 23 intervening dates; it is a sample, not proof of uninterrupted coverage at every date.
2. **Root causes.** Missing playable organisms; narrow or absent regional evidence; regional windows borrowing coverage from elsewhere; founding groups using fixed coordinates; historical plants skipped by a modern vegetation shortcut; marine framing; and a focus-before-model-load race. A zero-Ma recent fossil boundary also needed distinction from calendar year zero.
3. **New organisms.** {', '.join(names[i] for i in new)}. All have original meshes, transparent CPU-rendered icons, LODs and actual integration. Mobile additions have deform rigs; attached organisms remain sessile.
4. **Vegetation.** New Cooksonia-like leafless vascular shoots, Archaeopteris trees and fossil Metasequoia. Expanded dated regional fern, conifer, cycad, oak, grass, lycophyte and horsetail coverage, including screened Mesozoic woodland occurrences. Wetland shoots cluster near freshwater; tree anchors favor lowland edges. Early scenes do not gain modern grass or flowers.
5. **Playable count.** {len(species)} (previously 72). A playable genus/group proxy is counted once, not as each fossil species it represents.
6. **Reference-only count.** {len(refs)}. Exact species references remain separate from broader genus reconstructions and are not counted as additional playable organisms.
7. **Visible historical coverage.** The implementation now has eligible content at {sum(bool(r['defaultGroups']) for r in after[:24])}/24 requested checkpoints and {sum(bool(r['defaultGroups']) for r in after)}/47 sampled dates. Late Ediacaran, Cambrian, Ordovician, Silurian, Devonian, Carboniferous, Permian, Triassic, Jurassic, Cretaceous, Paleogene, Neogene, Pleistocene, Holocene, historical-modern and future scenes have representative content at reviewed dates. This does not make every interval or region complete.
8. **Scientifically sparse scenes.** Early macroscopic life and fossil soft-tissue/feeding interpretations retain uncertainty. The game does not infer LIMITED FOSSIL EVIDENCE merely from an empty catalogue; many sparse scenes are implementation gaps, not poor actual fossil records.
9. **Content still missing.** Empty North American samples: {', '.join(f'{y:,}' for y in remaining)}. Other unsampled intervals and other regions still lack content. Many populated dates have only one or two modeled groups and are explicitly PARTIALLY POPULATED; complete food webs and rich terrestrial communities at every date remain future work.
10. **Automatic habitat focus.** Scores eligible asset-backed communities, frames supported habitats on assemblage/region changes, favors moving representatives when available, and never changes the selected region. Persistent Auto habitat checkbox, manual land/freshwater/marine controls and explicit nearby-date suggestions remain available. Global mosaic suggestions explicitly say that they change region.
11. **Marine visibility.** Supported marine entries load as live representatives with shallow-water anchors, benthic placement for attached forms, and transparent inspection water. Cloudina, crinoids and brachiopods are attached; mobile arthropods and ammonoids animate. Freshwater fish use the waterline. This is an inspectable diorama, not a physical underwater optics model.
12. **Spawning.** Regional age-window validation, habitat-aware founding anchors, distinct forest/wetland clusters, visible historical plant batches and per-scene eligible/asset/generated/loaded counts. Historical auto-population does not populate intentionally empty custom islands.
13. **Transitions.** Stable compatible group IDs/counts/anchors, bounded reconstruction cache, per-individual animation and departure behavior; camera easing and queued focus for asynchronously loaded models. Rewind reconstructs the same populations.
14. **Scientific limitations and sources.** Source-linked genus/class/group reconstructions, not exact coeval local communities. PBDB deposit envelopes are uncertainty intervals, not exact species lifespans. Queries are bounded US/Canada samples, not complete inventories; suspect names, overly broad ages and out-of-scope intervals were excluded. Group proxies vary in real anatomy across constituent taxa. Colours, soft tissues, dimensions, numerical tolerances, abundance and rates are artistic/teaching assumptions. Cloudina affinities/feeding remain unresolved. Fossil Metasequoia is not declared globally extinct: living Asian representatives are separate. Future local loss is not global extinction. Original art uses no external mesh or image assets. PBDB records retain CC BY 4.0 attribution and original publication references.
15. **Performance.** Actual browser measurements are in biodiversity-scenes.json; these are SwiftShader software-renderer samples, not a native Mac 60-FPS claim. Frustum inclusion is not an occlusion test or proof that a representative is above the interface. Screenshots provide separate visual evidence. The generation benchmark records the same repeated habitat-anchor workload before/after optimization. Whole-frame performance remains a constraint in dense scenes.
16. **Automated validation.** See final acceptance log in PROGRESS.md: strict typecheck, unit/regression tests, production build, complete base asset contracts, LODs, normalized rig weights/nine clips/deformed bounds, and Khronos validation. Original model contracts: {len(validation)} base assets including three islands; all new icons have transparency. Build retains a large-bundle advisory.
17. **Browser/visual validation.** Date/region/population/render counts, screenshots and rewind results are in biodiversity-scenes.json. Close-model checks, loaded rigs, auto-focus persistence, region preservation and mobile overflow are in biodiversity-interactions.json. Existing custom islands, conservation, evolution, placement and save/reset regression suites are retained. Final screenshots and icon sheet were opened and reviewed; fixes include camera framing, hidden fish eyes, shell ribs, horse muzzle distinction, badge overlap and historical plant visibility.
18. **Files modified.** See changed-files.txt. Main areas: src/state/history.ts and coverage.ts; eligibility and metadata; scene camera/placement/water; coverage controls; reusable Blender biodiversity builder and per-model wrappers; original full/LOD/rig/icon assets; source evidence and QA scripts/reports. The user's pre-existing .gitignore edit is excluded.
19. **Commits.** Local milestone commits A–H are listed in the repository history. No push or deployment. Final commit identifier is appended after acceptance.
20. **Remaining work.** Broaden reviewed regional and between-checkpoint coverage, especially early Ediacaran ecosystems and multi-guild terrestrial communities. Expand additional insects, fungi, small vertebrates and aquatic vegetation with matching evidence/assets. Replace remaining broad proxies where precise reconstructions are supported. Benchmark on the native Mac GPU and physical mobile hardware; further dense-scene optimization is needed. These are explicit limits, not silently completed requirements.

## Era coverage audit

Dates use the game's signed calendar convention; negative values approximate geological ages. Exact population reconstruction is not claimed.

'''+ '\n'.join(rows)+'\n\n## New asset contracts\n\n'+'\n'.join(assetrows)+'\n\n## Primary sources\n\n'
for ident in new:
 links=metadata[ident]['sources'];report+=f"- **{names[ident]}**: "+', '.join(f"[{v['label']}]({v['url']})" for v in links)+'\n'
generation=read('qa/biodiversity-generation-after.json');prior=read('qa/biodiversity-generation-before.json')
performance=read('qa/continuation-crowded-performance.json')
report+='\n## Final acceptance measurements\n\n'
report+=f"- Strict typecheck and production build: PASS; 120 unit tests across 24 files: PASS.\n- Stable-build date sweep: {len(scenes['results'])}/47 captures, {sum(r['rewind']=='PASS' for r in scenes['results'])} deterministic rewinds, {len(scenes['errors'])} captured browser errors.\n- New model close-ups: {len(read('qa/biodiversity-interactions.json')['results'])}/18; loaded mobile rigs, region preservation, auto-habitat persistence and mobile overflow checks pass.\n- Habitat-anchor benchmark: {prior['medianMs']:.2f} → {generation['medianMs']:.2f} ms median for 240 repeated anchors including equality assertions ({prior['medianMs']/generation['medianMs']:.1f}× in this isolated workload). This is not a whole-frame speedup.\n- Crowded 2026 mosaic, Smooth quality, 1280×800: {performance['medianMs']:.1f} ms median / {performance['p95Ms']:.1f} ms p95; {performance['calls']} draw calls, {performance['triangles']:,} triangles. Renderer: {performance['renderer']}.\n"
for file in ['complete-development-results','continuation-results','gameplay-results','gameplay-conditions-results','final-local-results','critical-interactions','critical-click']:
 path=root/'qa'/f'{file}.json'
 if path.exists():
  result=json.loads(path.read_text());report+=f"- {file}: {len(result.get('checks',[]))} recorded checks; {len(result.get('errors',[]))} captured errors.\n"
(root/'qa/BIODIVERSITY_REPORT.md').write_text(report);(out/'REPORT.md').write_text(report)
images=out/'images';images.mkdir(exist_ok=True)
files=list((root/'qa/shots/biodiversity').glob('*.png'))
if (root/'qa/shots/biodiversity-icons.png').exists():files.append(root/'qa/shots/biodiversity-icons.png')
cards=[]
for path in sorted(files,key=lambda p:(0,int(p.stem)) if p.stem.isdigit() else (1,p.stem)):
 if path.stem in ['failure','focus-debug']:continue
 shutil.copy2(path,images/path.name);cards.append(f'<figure><a href="images/{html.escape(path.name)}"><img loading="lazy" src="images/{html.escape(path.name)}"></a><figcaption>{html.escape(path.stem)}</figcaption></figure>')
(out/'gallery.html').write_text('<!doctype html><meta charset="utf-8"><title>Miniature Earth — biodiversity evidence</title><style>body{background:#f3efe6;color:#263238;font:16px system-ui;margin:24px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(440px,1fr));gap:16px}figure{margin:0;background:white;padding:10px;border-radius:16px}img{width:100%}a{color:inherit}</style><h1>Miniature Earth — biodiversity evidence</h1><p>Actual local-game captures; numbered images follow the 47-date coverage audit. Click for full resolution.</p><main>'+''.join(cards)+'</main>')
for file in ['qa/biodiversity-before.json','qa/biodiversity-after.json','qa/biodiversity-scenes.json','qa/biodiversity-interactions.json','qa/critical-asset-validation.json','qa/biodiversity-generation-before.json','qa/biodiversity-generation-after.json','qa/continuation-crowded-performance.json','qa/critical-coverage.json','qa/rig-validation.json']:
 path=root/file
 if path.exists():shutil.copy2(path,out/path.name)
print(out)
