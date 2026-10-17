import raw from './data/species.json';
import {coupledState} from './coupled';
import type {Intervention} from './evolution';
import type {Species,Placement,Scenario,SimState} from './types';
export const species=raw as Species[];
export const byId=Object.fromEntries(species.map(s=>[s.id,s]));
export function createWorld(seed=42){let events:Placement[]=[],changes:Intervention[]=[];const cache=new Map<string,SimState>();
 function setPlacements(v:Placement[]){events=v.map(e=>({...e})).sort((a,b)=>a.tick-b.tick);cache.clear()}
 function place(e:Placement){setPlacements([...events,e])}
 function setInterventions(v:Intervention[]){changes=v.map(c=>({...c}));cache.clear()}
 function getStateAt(tick:number,scenario:Scenario='Protect'){const key=`${scenario}:${tick}`;let state=cache.get(key);if(!state){state=coupledState(species,events,tick,scenario,seed,changes);if(cache.size>64)cache.delete(cache.keys().next().value!);cache.set(key,state)}return structuredClone(state)}
 return {place,setPlacements,setInterventions,getStateAt,get placements(){return events.map(e=>({...e}))}};
}
