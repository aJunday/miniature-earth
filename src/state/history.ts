import {residentPlacements} from './residents';
import {eligibility,historyRecord} from '../sim/eligibility';
import {tickToYear,formatYear,eraName} from '../sim/timeline';
import {envAt} from '../sim/environment';
import {waterHabitatAt,landscapeScale} from '../world/terrain';
import species from '../sim/data/species.json';
import type {SimState} from '../sim/types';
export function habitatPoint(id:string,year:number):[number,number]{
 const habitat=historyRecord(id)?.habitat,scale=landscapeScale(year),hash=Array.from(id).reduce((n,c)=>n+c.charCodeAt(0),0);
 const points:[number,number][]=[];
 for(let z=-8;z<=12;z+=1)for(let x=-14;x<=20;x+=1){if(waterHabitatAt(x*scale,z*scale,year)===habitat)points.push([x*scale,z*scale])}
 return points[hash%Math.max(1,points.length)]??[0,0];
}
/** Bounded, deterministic evidence reconstruction. Counts are illustrative, never fossil census data. */
const cache=new Map<string,SimState>();
export function historicalState(tick:number,region='mosaic',highlight?:string|null):SimState{
 const key=JSON.stringify([tick,region,highlight]);const cached=cache.get(key);if(cached)return cached;
 const year=tickToYear(tick),date=Math.min(2026,year);
 const groups:NonNullable<SimState['groups']>=residentPlacements(true).filter(e=>e.tick<=tick&&(e.untilTick===undefined||tick<e.untilTick)&&eligibility(e.speciesId,date,undefined,region).allowed).map(e=>({...e,id:'historical-'+e.speciesId,population:e.count}));
 const existing=new Set(groups.map(g=>g.speciesId));
 const candidates=species.filter(s=>!existing.has(s.id)&&eligibility(s.id,date,undefined,region).allowed);
 candidates.sort((a,b)=>(a.id===highlight?-1:b.id===highlight?1:0));
 for(const s of candidates){if(groups.length>=22&&s.id!==highlight)continue;const [x,z]=habitatPoint(s.id,year);const count=s.diet==='producer'?24:s.height>=2.5?3:s.diet==='carnivore'?3:8;groups.push({id:'historical-'+s.id,speciesId:s.id,tick:0,x,z,population:count,origin:'resident'})}
 const populations=groups.reduce<Record<string,number>>((p,g)=>{p[g.speciesId]=(p[g.speciesId]??0)+g.population;return p},{});
 const result={tick,year,yearLabel:formatYear(year),eraName:eraName(year),env:envAt(year,'Protect'),populations,groups,extinct:[],happenings:[]};if(cache.size>=96)cache.delete(cache.keys().next().value!);cache.set(key,result);return result;
}
