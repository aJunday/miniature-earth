import {residentPlacements} from './residents';
import {eligibility} from '../sim/eligibility';
import {tickToYear,formatYear,eraName} from '../sim/timeline';
import {envAt} from '../sim/environment';
import type {SimState} from '../sim/types';
/** Reconstruction is read-only: seeking never breeds, kills or mutates its residents. */
export function historicalState(tick:number,region='mosaic'):SimState{
 const year=tickToYear(tick);
 const groups=residentPlacements(true).filter(e=>e.tick<=tick&&(e.untilTick===undefined||tick<e.untilTick)&&eligibility(e.speciesId,Math.min(2026,year),undefined,region).allowed).map((e,i)=>({...e,id:'historical-'+(e.residentKey??i),population:e.count}));
 const populations=groups.reduce<Record<string,number>>((p,g)=>{p[g.speciesId]=(p[g.speciesId]??0)+g.population;return p},{});
 return {tick,year,yearLabel:formatYear(year),eraName:eraName(year),env:envAt(year,'Protect'),populations,groups,extinct:[],happenings:[]};
}
