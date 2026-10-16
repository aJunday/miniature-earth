import {metadata} from '../sim/catalogue';
import {byId} from '../sim/simulation';
import {formatYear} from '../sim/timeline';
import type {SimState} from '../sim/types';
import {adaptedSpecies} from '../sim/adaptation';
export function ScienceDetails({id,sim}:{id:string;sim:SimState}){
 const m=metadata(byId[id]);const groups=sim.groups?.filter(g=>g.speciesId===id&&g.traits)??[];
 return <><details className="science-details"><summary>Field notes & evidence</summary><dl>
 <dt>Represents</dt><dd>{m.scientificName??'Multiple organisms'} · {m.taxonomicRank}</dd>
 <dt>First appearance</dt><dd>{m.firstAppearance!==null?`≈ ${formatYear(m.firstAppearance)}`:'Not verified for this taxon'}</dd>
 <dt>Last occurrence</dt><dd>{m.lastOccurrence!==null?`≈ ${formatYear(m.lastOccurrence)}`:m.extinctionStatus==='extinct'?'Extinct; date not verified':'Living representatives'}</dd>
 <dt>Date evidence</dt><dd>{m.dateBasis}</dd>
 <dt>Habitat</dt><dd>{m.habitat} ({m.waterDomain}). {m.habitatEvidence}</dd>
 <dt>Food</dt><dd>{m.food??m.foodEvidence}</dd>
 <dt>Measured tolerances</dt><dd>{m.measurementNote}</dd>
 <dt>In this simulation</dt><dd>Temperature: {m.temperature?.join('–')??'unrestricted'}°C. Food links: {m.resourceRequirements.join(', ')||'background resources'}. {m.oxygenRequirement}.</dd>
 {m.conservation&&<><dt>Conservation</dt><dd>{m.conservation.status}. {m.conservation.note}</dd></>}
 </dl>{m.notes.map(note=><p key={note}>{note}</p>)}{m.relationships.map(text=><p key={text}>{text}</p>)}
 {m.sources.map((source,i)=><a key={i} href={source.url} target="_blank" rel="noreferrer">{source.label} · {source.field} ↗</a>)}<small>Evidence reviewed {m.checked}. Unknown values are deliberately left unquantified.</small></details>
 {adaptedSpecies.has(id)&&<details className="science-details" open><summary>Inherited variation</summary><p>Cool, baseline and warm tolerance variants are inherited by offspring. Their proportions change through reproduction and differential survival.</p>{!groups.length&&<small>Place a group, then advance time to explore selection.</small>}{groups.map((g,i)=><div key={g.id} className="trait-group"><b>Group {i+1} · {g.population<2?'extinct':Math.round(g.population)+' animals'}</b>{g.traits!.frequencies.map((v,j)=><label key={j}>{['Cool','Baseline','Warm'][j]} <meter min="0" max="1" value={v}/><span>{(v*100).toFixed(1)}%</span></label>)}<small>{g.origin==='resident'?'Resident population · ':''}{g.traits!.births.toFixed(1)} simulated births · {g.traits!.turnover.toFixed(1)} reproductive turnovers</small></div>)}<small>Teaching model: ±2°C variants, initial 25/50/25% mix. These are illustrative parameters, not measured genetics. Turnovers are not geological years. Individuals do not transform into other species.</small><a href="https://evolution.berkeley.edu/evolution-101/mechanisms-the-processes-of-evolution/natural-selection/" target="_blank" rel="noreferrer">UC Berkeley · How natural selection works ↗</a></details>}</>;
}
