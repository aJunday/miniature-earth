import {byId} from '../sim/simulation';
import {TICKS} from '../sim/timeline';
import type {Project,InitialWorld} from './index';
/** Read local project data only; never trust arbitrary imported fields as store actions. */
export function parseProject(input:unknown):Project{
 const fail=()=>{throw new Error('This is not a valid Miniature Earth island file. Your current island was not changed.')};
 if(!input||typeof input!=='object')return fail();
 const raw=input as Record<string,unknown>;
 const finite=(v:unknown):v is number=>typeof v==='number'&&Number.isFinite(v);
 function world(v:Record<string,unknown>):InitialWorld{
  if(!finite(v.tick)||v.tick<0||v.tick>TICKS||!finite(v.seed)||typeof v.region!=='string'||!['Protect','Exploit'].includes(String(v.scenario))||!Array.isArray(v.placements)||v.placements.length>1000||!Array.isArray(v.interventions)||v.interventions.length>1000)return fail();
  const placements=v.placements.map(e=>{if(!e||typeof e!=='object'||!byId[e.speciesId]||!finite(e.tick)||e.tick<0||e.tick>TICKS||!finite(e.x)||!finite(e.z)||Math.abs(e.x)>100||Math.abs(e.z)>100||!finite(e.count)||e.count<=0||e.count>10000)return fail();return {speciesId:String(e.speciesId),tick:e.tick,count:e.count,x:e.x,z:e.z,...(e.origin==='resident'?{origin:'resident' as const}:{}),...(finite(e.untilTick)?{untilTick:e.untilTick}:{})}});
  const interventions=v.interventions.map(c=>{if(!c||typeof c!=='object'||!finite(c.year)||!finite(c.temperature)||!finite(c.resources))return fail();const out:Record<string,number|boolean>={year:c.year,temperature:c.temperature,resources:c.resources};for(const key of ['rainfall','water','pollution','connectivity','exploitationReduction','marineProtection'])if(key in c){if(!finite(c[key]))return fail();out[key]=c[key]}if(c.futureBaseline===true)out.futureBaseline=true;return out as unknown as Project['interventions'][number]});
  return {tick:v.tick,seed:v.seed,region:v.region,scenario:v.scenario as Project['scenario'],placements,interventions};
 }
 const current=world(raw);if(!finite(raw.start)||!finite(raw.temperature)||!finite(raw.resources)||!['Empty Island','Starter Ecosystem','Custom Ecosystem'].includes(String(raw.preset)))return fail();
 return {...current,start:raw.start,temperature:raw.temperature,resources:raw.resources,preset:raw.preset as Project['preset'],...(raw.initial&&typeof raw.initial==='object'?{initial:world(raw.initial as Record<string,unknown>)}:{})};
}
