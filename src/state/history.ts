import {arrangeCommunities} from './composition';
import {eraAt} from '../world/eras';
import {residentPlacements} from './residents';
import {eligibility,historyRecord} from '../sim/eligibility';
import {tickToYear,formatYear,eraName} from '../sim/timeline';
import {envAt} from '../sim/environment';
import {waterHabitatAt,landscapeScale,terrainHeight,riverX} from '../world/terrain';
import species from '../sim/data/species.json';
import type {SimState} from '../sim/types';
const habitatCache=new Map<string,readonly [number,number]>();
export function habitatPoint(id:string,year:number):[number,number]{
 const key=JSON.stringify([id,eraAt(year).id,landscapeScale(year)]),cached=habitatCache.get(key);
 if(cached)return [...cached];
 const habitat=historyRecord(id)?.habitat,scale=landscapeScale(year),hash=Array.from(id).reduce((n,c)=>n+c.charCodeAt(0),0);
 const points:[number,number][]=[];
 for(let z=-8;z<=12;z+=1)for(let x=-14;x<=20;x+=1){if(waterHabitatAt(x*scale,z*scale,year)===habitat)points.push([x*scale,z*scale])}
 const wetland=['cooksonia','horsetail'].includes(id)?points.filter(([x,z])=>Math.abs(x-riverX(z,year))<1.6*scale):[];const forest=['archaeopteris','metasequoia','lycophyte','conifer','oak'].includes(id)?points.filter(([x,z])=>z< -6*scale&&x+z< -8*scale&&terrainHeight(x,z,year)<3.5):[];
 const clearings=habitat==='terrestrial'?points.filter(([x,z])=>Math.abs(x)<7*scale&&z> -2*scale&&z<6*scale):[];const shallow=habitat==='marine'?points.filter(([x,z])=>terrainHeight(x,z,year)>-1.8):[];const chosen=wetland.length?wetland:forest.length?forest:clearings.length?clearings:shallow.length?shallow:points;
 const point:[number,number]=chosen[hash%Math.max(1,chosen.length)]??[0,0];
 if(habitatCache.size>=256)habitatCache.delete(habitatCache.keys().next().value!);
 habitatCache.set(key,point);return [...point];
}
/** Bounded, deterministic evidence reconstruction. Counts are illustrative, never fossil census data. */
const cache=new Map<string,SimState>();
export function historicalState(tick:number,region='mosaic',highlight?:string|null):SimState{
 const key=JSON.stringify([tick,region,highlight]);const cached=cache.get(key);if(cached)return cached;
 const year=tickToYear(tick),date=Math.min(2026,year);
 const groups:NonNullable<SimState['groups']>=residentPlacements(true).filter(e=>e.tick<=tick&&(e.untilTick===undefined||tick<e.untilTick)&&eligibility(e.speciesId,date,undefined,region).allowed).map(e=>{const [x,z]=habitatPoint(e.speciesId,year);return {...e,x,z,id:'historical-'+e.speciesId,population:e.count}});
 const existing=new Set(groups.map(g=>g.speciesId));
 const candidates=species.filter(s=>!existing.has(s.id)&&eligibility(s.id,date,undefined,region).allowed);
 candidates.sort((a,b)=>(a.id===highlight?-1:b.id===highlight?1:0));
 for(const s of candidates){if(groups.length>=22&&s.id!==highlight)continue;const [x,z]=habitatPoint(s.id,year);const count=s.diet==='producer'?24:s.height>=2.5?3:s.diet==='carnivore'?3:8;groups.push({id:'historical-'+s.id,speciesId:s.id,tick:0,x,z,population:count,origin:'resident'})}
 const arranged=arrangeCommunities(groups,year);
 const populations=groups.reduce<Record<string,number>>((p,g)=>{p[g.speciesId]=(p[g.speciesId]??0)+g.population;return p},{});
 const result={tick,year,yearLabel:formatYear(year),eraName:eraName(year),env:envAt(year,'Protect'),populations,groups:arranged,extinct:[],happenings:[]};if(cache.size>=96)cache.delete(cache.keys().next().value!);cache.set(key,result);return result;
}
