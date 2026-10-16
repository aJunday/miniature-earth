import raw from './data/species.json';
import {mulberry32} from './rng';
import {tickToYear,formatYear,eraName,yearToTick} from './timeline';
import {envAt} from './environment';
import {stepPopulation} from './population';
import {habitatAt} from '../world/terrain';
import type {Species,Placement,Scenario,SimState} from './types';
export const species=raw as Species[];
export const byId=Object.fromEntries(species.map(s=>[s.id,s]));
interface GroupState {id:string;speciesId:string;population:number;x:number;z:number;tick:number}
const sum=(groups:GroupState[])=>groups.reduce<Record<string,number>>((p,g)=>{p[g.speciesId]=(p[g.speciesId]??0)+g.population;return p},{});
export function createWorld(seed=42){let events:Placement[]=[];const cache=new Map<string,GroupState[]>();const asteroid=yearToTick(-66e6),permian=yearToTick(-252e6);
function setPlacements(v:Placement[]){events=v.slice().sort((a,b)=>a.tick-b.tick);cache.clear()}
function place(e:Placement){events.push(e);events.sort((a,b)=>a.tick-b.tick);for(const key of cache.keys())if(Number(key.split(':')[1])>=e.tick)cache.delete(key)}
function getStateAt(tick:number,scenario:Scenario='Protect'):SimState{tick=Math.max(0,Math.min(4000,tick));let start=0,groups:GroupState[]=[];for(let t=Math.floor(tick/100)*100;t>0;t-=100){const c=cache.get(scenario+':'+t);if(c){groups=c.map(g=>({...g}));start=t+1;break}}
const add=(e:Placement,i:number)=>groups.push({...e,id:'group-'+i,population:e.count});
for(let t=start;t<=Math.floor(tick);t++){const year=tickToYear(t);events.forEach((e,i)=>{if(e.tick<=t&&e.tick>t-1)add(e,i)});if(t>0&&groups.length){const zones:Record<string,boolean>={};for(const g of groups){if(habitatAt(g.x,g.z,year)!==byId[g.speciesId].zone)g.population*=.8;zones[g.speciesId]=true}const p=sum(groups);const impact=t>=asteroid&&t<asteroid+40,volcanism=t>=permian&&t<permian+35;const env=envAt(year,scenario,impact);if(volcanism){env.temp+=10;env.habitat*=.25;env.oxygenFit=.4}const next=stepPopulation(species,p,env,impact||volcanism,year,scenario,mulberry32(seed+t*7919),zones);for(const g of groups){g.population=p[g.speciesId]>0?g.population*(next[g.speciesId]??0)/p[g.speciesId]:0;if(g.population<2)g.population=0}}if(t%100===0)cache.set(scenario+':'+t,groups.map(g=>({...g})))}
events.forEach((e,i)=>{if(e.tick>Math.floor(tick)&&e.tick<=tick)add(e,i)});const year=tickToYear(tick),p=sum(groups),impact=tick>=asteroid&&tick<asteroid+40,volcanism=tick>=permian&&tick<permian+35;const env=envAt(year,scenario,impact);if(volcanism){env.temp+=10;env.habitat*=.25;env.oxygenFit=.4}return {tick,year,yearLabel:formatYear(year),eraName:eraName(year),env,populations:p,groups,extinct:Object.keys(p).filter(id=>p[id]===0),happenings:[...(impact?['asteroid']:[]),...(volcanism?['end-permian']:[])]}}
return {place,setPlacements,getStateAt,get placements(){return events}}}
