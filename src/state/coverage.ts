import {species} from '../sim/simulation';
import {eligibility,historyRecord,type Habitat} from '../sim/eligibility';
import manifest from '../../public/models/manifest.json';
import type {SimState} from '../sim/types';
const assets=new Set(manifest.map(m=>m.id));
export type CoverageStatus='WELL POPULATED'|'PARTIALLY POPULATED'|'LIMITED FOSSIL EVIDENCE'|'CONTENT MISSING'|'RENDERING ERROR';
/** Catalogue implementation coverage, not an estimate of Earth's actual biodiversity. */
export function sceneCoverage(sim:SimState,region:string){
 const eligible=species.filter(s=>eligibility(s.id,Math.min(2026,sim.year),undefined,region).allowed);
 const playable=eligible.filter(s=>assets.has(s.id));
 const habitats=(['terrestrial','freshwater','marine'] as Habitat[]).map(h=>({habitat:h,organisms:playable.filter(s=>historyRecord(s.id)?.habitat===h)}));
 const rank=(items:typeof playable)=>items.reduce((n,s)=>n+(s.diet==='producer'?1:2),0);
 const preferred=habitats.reduce((a,b)=>rank(b.organisms)>rank(a.organisms)?b:a,habitats[0]);
 const generated=playable.filter(s=>(sim.populations[s.id]??0)>0);
 const roles=new Set(generated.map(s=>s.diet));
 const activeAnimals=generated.filter(s=>!['producer','decomposer'].includes(s.diet));
 const coherent=roles.size>=3&&activeAnimals.length>=2;
 const status:CoverageStatus=!playable.length?'CONTENT MISSING':coherent?'WELL POPULATED':'PARTIALLY POPULATED';
 return {status,eligible:eligible.map(s=>s.id),playable:playable.map(s=>s.id),generated:generated.map(s=>s.id),missingAssets:eligible.filter(s=>!assets.has(s.id)).map(s=>s.id),habitats,preferred:preferred.habitat,explanation:!playable.length?'Life existed during this period, but this date and region lack implemented, reviewed organisms. This is a content gap, not a lifeless Earth.':preferred.habitat==='marine'?'The best-supported playable community here is marine. Land animal coverage is absent or less complete; explore the sea.':preferred.habitat==='freshwater'?'The best-supported playable community here lives in freshwater. This view represents a lake or river habitat.':'A representative land community is available. Counts are simulated, and this continental mosaic is not one fossil locality.'};
}

/** Offer an explicit date change; never silently substitute a different region. */
export function nearbyShowcase(year:number,region:string){
 const candidates=species.flatMap(s=>{const h=historyRecord(s.id);if(!h)return [];const windows=h.regionalCoverage?.filter(w=>w.region===region).map(w=>[w.first,w.last] as const)??(h.regions.includes(region)&&h.coverage?[h.coverage]:[]);return windows.map(([a,b])=>({id:s.id,name:s.name,year:(a+b)/2,source:h.sources[0]})).filter(v=>eligibility(s.id,v.year,undefined,region).allowed)});
 return candidates.sort((a,b)=>Math.abs(a.year-year)-Math.abs(b.year-year))[0];
}
