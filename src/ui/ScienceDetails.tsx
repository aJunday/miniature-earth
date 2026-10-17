import stories from '../sim/data/stories.json';
import {guildFood} from '../sim/coupled';
import {useGame} from '../state';
import {historyRecord,eligibility} from '../sim/eligibility';
import {ecologicalPressures} from '../sim/pressures';
import {metadata} from '../sim/catalogue';
import {byId} from '../sim/simulation';
import {formatYear} from '../sim/timeline';
import type {SimState} from '../sim/types';
import {adaptedSpecies} from '../sim/adaptation';
export function ScienceDetails({id,sim}:{id:string;sim:SimState}){
 const region=useGame(s=>s.region),mode=useGame(s=>s.mode);const m=metadata(byId[id]);const groups=sim.groups?.filter(g=>g.speciesId===id&&g.traits)??[];
 const census=stories[id as keyof typeof stories]?.wildPopulation;const history=historyRecord(id);return <><p><b>{eligibility(id,sim.year,undefined,region,mode).reason}</b></p>{history?.coverage&&<p>Reviewed display coverage: ≈ {formatYear(history.coverage[0])} to {formatYear(history.coverage[1])}. Display occurrence or interval, not exact origin/extinction dates. <button onClick={()=>{useGame.getState().travelTo(id)}}>Visit reviewed occurrence</button></p>}{history?.sources.filter(url=>!m.sources.some(s=>s.url===url)).map(url=><a key={url} href={url} target="_blank" rel="noreferrer">Historical coverage source ↗</a>)}<div className="ecological-pressures"><b>Current pressures</b>{ecologicalPressures(id,sim).map(reason=><p key={reason}>{reason}</p>)}</div><details className="science-details"><summary>Field notes & evidence</summary><dl>
 <dt>Local model population</dt><dd>{Math.round(sim.populations[id]??0)} · illustrative island count, not a wild census</dd><dt>Source-reported population</dt><dd>{census?`${census.text} (${census.year}); scope and source in the conservation story.`:'Not verified here; no global estimate inferred from the simulation.'}</dd><dt>Represents</dt><dd>{m.scientificName??'Multiple organisms'} · {m.taxonomicRank}</dd>
 <dt>First appearance</dt><dd>{m.firstAppearance!==null?`≈ ${formatYear(m.firstAppearance)}`:'Not verified for this taxon'}</dd>
 <dt>Last occurrence</dt><dd>{m.lastOccurrence!==null?`≈ ${formatYear(m.lastOccurrence)}`:m.extinctionStatus==='extinct'?'Extinct; date not verified':'Living representatives'}</dd>
 <dt>Date evidence</dt><dd>{m.dateBasis}</dd>
 <dt>Habitat</dt><dd>{m.habitat} ({m.waterDomain}). {m.habitatEvidence}</dd>
 <dt>Reviewed regions</dt><dd>{history?.regions.join(', ')||'Unresolved at this scope; the mosaic is illustrative'}</dd>
 <dt>Food</dt><dd>{m.food??m.foodEvidence}</dd>
 <dt>Measured tolerances</dt><dd>{m.measurementNote}</dd>
 <dt>In this simulation</dt><dd>Temperature: {m.temperature?.join('–')??'unrestricted'}°C. Food links: {m.resourceRequirements.join(', ')||(guildFood[id]?'Finite '+guildFood[id]+' guild':'Light and nutrients')}. {m.oxygenRequirement}.</dd>
 {m.conservation&&<><dt>Conservation</dt><dd>{m.conservation.status}. {m.conservation.note}</dd></>}
 </dl>{m.notes.map(note=><p key={note}>{note}</p>)}{m.relationships.map(text=><p key={text}>{text}</p>)}
 {m.sources.map((source,i)=><a key={i} href={source.url} target="_blank" rel="noreferrer">{source.label} · {source.field} ↗</a>)}<small>Evidence reviewed {m.checked}. Unknown values are deliberately left unquantified.</small></details>
 {adaptedSpecies.has(id)&&<details className="science-details" open><summary>Inherited variation</summary><p>Dense, medium and light insulation variants are inherited by offspring. Their proportions change through reproduction and differential survival. Rare mutations introduce variation in offspring.</p>{!groups.length&&<small>Place a group, then advance time to explore selection.</small>}{groups.map((g,i)=><div key={g.id} className="trait-group"><b>Group {i+1} · {g.population<2?'extinct':Math.round(g.population)+' animals'}</b>{g.traits!.frequencies.map((v,j)=><label key={j}>{['Dense','Medium','Light'][j]} <meter min="0" max="1" value={v}/><span>{(v*100).toFixed(1)}%</span></label>)}<small>{g.origin==='resident'?'Resident population · ':''}{g.traits!.births.toFixed(1)} simulated births · {g.traits!.turnover.toFixed(1)} reproductive turnovers</small></div>)}<small>Teaching model: three insulation alleles, initial 25/50/25% mix; 0.2% offspring mutation probability. These are illustrative parameters, not measured genetics. Turnovers are not geological years. Individuals do not transform into other species.</small><a href="https://evolution.berkeley.edu/evolution-101/mechanisms-the-processes-of-evolution/natural-selection/" target="_blank" rel="noreferrer">UC Berkeley · How natural selection works ↗</a></details>}</>;
}
