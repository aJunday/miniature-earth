import {useState} from 'react';
import {useGame,useSimState} from '../state';
import {byId} from '../sim/simulation';
import {metadata,categoryOf,groupSize} from '../sim/catalogue';
import {historyRecord,eligibility} from '../sim/eligibility';
import {formatYear} from '../sim/timeline';
import {ScienceDetails} from './ScienceDetails';
import {EvolutionLab} from './EvolutionLab';
import {StoryDetails,stories} from './Impact';
import {resourcesFor} from '../sim/research';
export function WildlifeHistory({id}:{id:string}){
 const [expanded,setExpanded]=useState(false),g=useGame(),sim=useSimState(),s=byId[id],m=metadata(s),h=historyRecord(id),story=stories[id];
 const resources=resourcesFor(id),range=h?.coverage??(m.firstAppearance!==null&&m.lastOccurrence!==null?[m.firstAppearance,m.lastOccurrence]:null);
 return <aside className={'organism-detail '+(expanded?'history-expanded':'selection-card')} aria-label={expanded?'Wildlife history':'Selected organism'}>
 <button className="close" aria-label={expanded?'Close history':'Close organism'} onClick={()=>expanded?setExpanded(false):g.focus(null)}>×</button>
 <img src={'/icons/org_'+id+'.png'} alt=""/><span className="overline">{expanded?'VERIFIED SCIENTIFIC HISTORY':'SELECTED WILDLIFE'}</span><h2>{s.name}</h2><i>{m.scientificName??'Ecological group · no single scientific name'}</i><p>{m.extinctionStatus}{m.conservation?' · '+m.conservation.status:''}</p>
 {!expanded?<><button className="primary" onClick={()=>setExpanded(true)}>VIEW HISTORY</button><div className="wildlife-actions"><button onClick={()=>window.dispatchEvent(new CustomEvent('species-focus',{detail:id}))}>Focus on species</button><button onClick={()=>{g.selectSpecies(id);g.focus(null)}}>Place a group</button></div></>:<>
 <p className="history-context">Viewing {formatYear(sim.year)} · {eligibility(id,Math.min(sim.year,2026),undefined,g.region,g.mode).reason}. Future dates do not extend verified occurrence records.</p>
 <section><h3>Overview</h3><p>{s.fact}</p><dl><dt>Historical existence</dt><dd>{range?`Reviewed occurrence: ≈ ${formatYear(range[0])}–${formatYear(range[1])}`:m.dateBasis}</dd><dt>Geological period / catalogue grouping</dt><dd>{s.era}</dd><dt>Classification</dt><dd>{m.scientificName??s.name} · {m.taxonomicRank} · {categoryOf(s)}</dd></dl><small>Occurrence coverage is not an exact origin or extinction date. Broad groups may represent multiple species.</small></section>
 <section><h3>Evolutionary history</h3><p>First appearance: {m.firstAppearance!==null?`approximately ${formatYear(m.firstAppearance)}`:'not verified for this taxon in this catalogue'}. {m.dateBasis}.</p>{m.relationships.length?m.relationships.map(t=><p key={t}>{t}</p>):<p>Detailed lineage, related branches and changes through time have not been reviewed here. The resources below distinguish evidence from interpretation.</p>}{m.notes.map(t=><p key={t}>{t}</p>)}</section>
 <section><h3>Habitat and geography</h3><p>{m.habitat}. {m.habitatEvidence}.</p><p>Reviewed regions: {[...new Set([...(h?.regions??[]),...(h?.regionalCoverage?.map(r=>r.region)??[])])].join(', ')||'Not resolved at this scope'}.</p><p>{m.measurementNote}</p></section>
 <section><h3>Ecology and behavior</h3><p>{m.food??m.foodEvidence}.</p><p>Reproduction, predators and detailed behavior: consult the linked taxon accounts; unreviewed details are not inferred from game animations or simulated food links.</p></section>
 <section><h3>{m.extinctionStatus==='extinct'?'Extinction':'Conservation'}</h3><p>{m.extinctionStatus==='extinct'?(m.lastOccurrence!==null?`Last reviewed occurrence: approximately ${formatYear(m.lastOccurrence)}. This is not a precise extinction date.`:'Extinction date not verified here.'):(m.conservation?`${m.conservation.status}. ${m.conservation.note}`:'No verified conservation assessment in this catalogue.')}</p>{story?<StoryDetails id={id}/>:<p>Species-specific threats, population trends or extinction hypotheses have not been verified here.</p>}</section>
 <section className="history-simulation"><h3>{sim.year>2026?'Simulated Future Outcomes':'Your simulation'}</h3><p>{formatYear(sim.year)} · {Math.round(sim.populations[id]??0)} local model organisms. Game simulation, not a forecast or measured wild census. Local loss is not global extinction.</p><details><summary>Explore simulation and inherited variation</summary><ScienceDetails id={id} sim={sim}/>{id==='rabbit'&&<EvolutionLab/>}</details></section>
 <section className="research-resources"><h3>EXPLORE MORE ABOUT THIS SPECIES</h3><p>Optional original sources open in a new tab. No videos load or play inside the game.</p>{(['Websites and articles','Scientific papers and PDFs','Educational videos'] as const).map((label,i)=>{const items=resources.filter(r=>i===0?['website','article'].includes(r.type):i===1?['paper','PDF'].includes(r.type):r.type==='video');return <div key={label}><h4>{label}</h4>{items.length?items.map(r=><article key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.title} ↗</a><small>{r.organization}{r.year?' · '+r.year:''} · {r.type}</small><p>{r.description}</p><small>Scope: {r.scope}. Topic: {r.topic}. Link checked {r.verifiedAt}.</small></article>):<p>No verified {label.toLowerCase()} available in this collection yet.</p>}</div>})}</section>
 <div className="wildlife-actions"><button onClick={()=>window.dispatchEvent(new CustomEvent('world-follow',{detail:id}))}>Follow animal</button><button onClick={()=>{g.selectSpecies(id);g.focus(null)}}>Place a group of {groupSize(s)}</button><button onClick={()=>setExpanded(false)}>Back to game</button></div>
 </>}
 </aside>
}
