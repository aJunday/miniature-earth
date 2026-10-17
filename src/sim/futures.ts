import {coupledState} from './coupled';
import {yearToTick} from './timeline';
import type {Placement,Species} from './types';
import type {Intervention} from './evolution';
export const conservationActions=['Restore habitat','Wildlife corridors','Reduce exploitation','Clean water','Marine protection'] as const;
export type ConservationAction=typeof conservationActions[number];
/** Explicit teaching assumptions, not calibrated forecasts or measured policy effects. */
export function futureChanges(actions:readonly ConservationAction[]):Intervention[]{
 const has=(a:ConservationAction)=>actions.includes(a);
 return [{year:2026,futureBaseline:true,temperature:0,resources:1,pollution:0,water:1},...Array.from({length:74},(_,i)=>{
 const year=2027+i,t=(year-2026)/74;
 return {year,futureBaseline:true,temperature:t*1.5,resources:1-t*(has('Restore habitat')?.05:.35),pollution:t*(has('Clean water')?.05:.35),water:1-t*(has('Clean water')?.05:.3),connectivity:has('Wildlife corridors')?.8:0,exploitationReduction:has('Reduce exploitation')?.65:0,marineProtection:has('Marine protection')?.65:0};
 })];
}
export function simulateFuture(species:Species[],founders:Placement[],year:number,actions:readonly ConservationAction[],seed=42){return coupledState(species,founders,yearToTick(Math.max(2026,Math.min(2100,year))),'Exploit',seed,futureChanges(actions))}
export function futureMetrics(state:ReturnType<typeof simulateFuture>){return {population:Object.values(state.populations).reduce((a,b)=>a+b,0),diversity:Object.values(state.populations).filter(n=>n>=2).length,habitat:state.env.habitat,water:state.pools?.freshwater??1}}
