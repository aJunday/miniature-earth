import {envAt} from './environment';
import {tickToYear,eraName,formatYear} from './timeline';
import {mulberry32} from './rng';
import {fitness,clamp} from './fitness';
import {foodWeb} from './ecosystem';
import {evolutionAt,evolutionSeed,insulation,type EvolutionSnapshot,type Individual,type Allele,type Intervention} from './evolution';
import {adaptedSpecies,initialTraits} from './adaptation';
import {waterHabitatAt} from '../world/terrain';
import type {Placement,Species,Scenario,SimState,Environment} from './types';
export interface Pools {detritus:number;nutrients:number;plankton:number;invertebrates:number;fish:number;browse:number;marinePlants:number;marinePrey:number;terrestrialPrey:number;freshwater:number;salinity:number;oxygen:number}
export const initialPools=():Pools=>({detritus:20,nutrients:60,plankton:80,invertebrates:60,fish:60,browse:100,marinePlants:60,marinePrey:40,terrestrialPrey:40,freshwater:1,salinity:35,oxygen:1});
export function cyclePools(p:Pools,e:Environment,producers:number,decomposers:number,dead:number,consumption:Partial<Pools>={},marineProducers=0){
 const water=clamp(p.freshwater+(e.rain-.5)*.1-(Math.max(0,e.temp-20))*.003,.1,1);
 const decomposition=Math.min(p.detritus,(Math.max(0,decomposers)*.08+p.detritus*.04)*water);
 return {detritus:clamp(p.detritus+dead+producers*.01-decomposition-(consumption.detritus??0),0,500),nutrients:clamp(p.nutrients+decomposition*.8-producers*.008+e.rain*.1,0,100),
 plankton:clamp(p.plankton+.15*p.plankton*(1-p.plankton/100)*e.sun*p.nutrients/60-(consumption.plankton??0)-p.fish*.03-p.invertebrates*.02-p.plankton*.01,0,150),
 invertebrates:clamp(p.invertebrates+.12*p.invertebrates*(1-p.invertebrates/100)*(p.detritus+p.plankton)/100-(consumption.invertebrates??0)-p.invertebrates*.01,0,150),
 terrestrialPrey:clamp(p.terrestrialPrey+.08*p.terrestrialPrey*(1-p.terrestrialPrey/60)*p.browse/100-(consumption.terrestrialPrey??0)-p.terrestrialPrey*.01,0,100),
 marinePlants:clamp(p.marinePlants+marineProducers*.12-(consumption.marinePlants??0)-p.marinePlants*.01,0,150),
 browse:clamp(p.browse+Math.max(0,producers-marineProducers)*.12-(consumption.browse??0)-p.browse*.01-p.terrestrialPrey*.02,0,150),marinePrey:clamp(p.marinePrey+.06*p.marinePrey*(1-p.marinePrey/60)*p.fish/60-(consumption.marinePrey??0)-p.marinePrey*.01,0,100),
 fish:clamp(p.fish+.1*p.fish*(1-p.fish/100)*p.plankton/80-(consumption.fish??0)-p.marinePrey*.03-p.fish*.01,0,150),freshwater:water,salinity:35+(1-water)*8,
 oxygen:clamp(p.oxygen+(.9-p.oxygen)*.08+producers*.0003-decomposition*.003-Math.max(0,e.temp-24)*.003,0,1)};
}
export type FoodPool='plankton'|'invertebrates'|'fish'|'detritus'|'browse'|'marinePlants'|'marinePrey'|'terrestrialPrey';
export const guildFood:Record<string,FoodPool>={polarbear:'marinePrey',giantpanda:'browse',redpanda:'browse',koala:'browse',sumatranorangutan:'browse',sumatranrhino:'browse',forestelephant:'browse',mountaingorilla:'browse',asianelephant:'browse',ringtailedlemur:'browse',kakapo:'browse',dodo:'browse',passengerpigeon:'browse',pintatortoise:'browse',mammoth:'browse',groundsloth:'browse',stellerseacow:'marinePlants',dimetrodon:'terrestrialPrey',charnia:'plankton',vaquita:'fish',axolotl:'invertebrates',rightwhale:'plankton',pangolin:'invertebrates',condor:'detritus',elkhorncoral:'plankton',bluewhale:'plankton',whaleshark:'plankton',seaotter:'invertebrates',emperorpenguin:'fish',humpback:'fish',baldeagle:'fish',reeffish:'plankton',seaturtle:'invertebrates',ammonite:'plankton',pteranodon:'fish',decomposer:'detritus'};
function cohort(previous:EvolutionSnapshot,next:number,births:number,year:number,random:()=>number,temperature:number):EvolutionSnapshot{
 const pressure=clamp(temperature/10,-1,1),fit=(a:Individual)=>Math.max(.08,.8+pressure*(1-2*insulation[a.allele])*.65);
 const parents=previous.individuals,weight=parents.reduce((n,a)=>n+fit(a),0),born:Individual[]=[];
 const count=Math.max(0,Math.min(160,Math.floor(next+random())));
 const nBirth=Math.min(count,Math.max(0,Math.floor(births+random())));
 for(let i=0;i<nBirth&&weight>0;i++){let draw=random()*weight;let parent=parents[0];for(const a of parents){parent=a;draw-=fit(a);if(draw<=0)break}let allele=parent.allele;if(random()<.002)allele=((allele+1+Math.floor(random()*2))%3) as Allele;born.push({id:`${parent.id.split(':')[0]}:${year}:${i}`,allele,born:year,parent:parent.id})}
 // Weighted survival without replacement; the same individual retains its genotype.
 const survivors=parents.map(a=>({a,score:Math.log(Math.max(1e-9,random()))/fit(a)})).sort((a,b)=>b.score-a.score).slice(0,Math.max(0,count-born.length)).map(v=>v.a);
 const individuals=[...survivors,...born],frequencies:[number,number,number]=[0,0,0];for(const a of individuals)frequencies[a.allele]+=1/Math.max(1,individuals.length);
 return {individuals,frequencies,mean:frequencies.reduce((n,f,i)=>n+f*insulation[i],0),generation:previous.generation+1,births:previous.births+born.length,deaths:previous.deaths+parents.length-survivors.length,approximate:false};
}
/** Annual coupled patch model. All constants are teaching parameters, not field estimates.
 * Deep-time replay uses bounded ecological steps and labels the approximation. */
export function coupledState(species:Species[],events:Placement[],tick:number,scenario:Scenario,seed:number,changes:readonly Intervention[]):SimState{
 const year=tickToYear(tick),active=events.map((e,i)=>({...e,id:`group-${i}`})).filter(e=>e.tick<=tick&&(e.untilTick===undefined||tick<e.untilTick)),first=active.length?Math.min(...active.map(e=>tickToYear(e.tick))):year;
 let pools=initialPools();const groups:NonNullable<SimState['groups']>=[];const added=new Set<string>();
 const disturbance=(date:number)=>date>=-66e6&&date< -65e6?'asteroid':date>=-252e6&&date< -251e6?'end-permian':null;
 const duration=Math.max(0,year-first),steps=Math.min(512,Math.ceil(duration)),interval=steps?duration/steps:0;
 let env=envAt(year,scenario);const byId=Object.fromEntries(species.map(s=>[s.id,s]));
 function add(date:number){for(const e of active)if(!added.has(e.id)&&tickToYear(e.tick)<=date+1e-6){added.add(e.id);groups.push({...e,population:e.count,...(adaptedSpecies.has(e.speciesId)?{traits:initialTraits(),evolution:evolutionAt(date,date,evolutionSeed(seed,e.tick,e.x,e.z),e.count)}:{})})}}
 add(first);
 for(let step=1;step<=steps;step++){
 const date=first+step*interval,dt=Math.min(1,interval),change=changes.filter(c=>c.year<date).at(-1)??{temperature:0,resources:1};env=envAt(date,scenario,disturbance(date)==='asteroid');if(disturbance(date)==='end-permian'){env.temp+=10;env.habitat*=.25;env.oxygenFit=.4}env.temp+=change.temperature;env.habitat*=change.resources;env.oxygenFit=(env.oxygenFit??1)*pools.oxygen;
 const populations=Object.fromEntries(species.map(s=>[s.id,groups.filter(g=>g.speciesId===s.id).reduce((n,g)=>n+g.population,0)]));
 const {loss,phi}=foodWeb(species,populations),demand:Partial<Pools>={};
 for(const g of groups){const pool=guildFood[g.speciesId];if(pool&&g.speciesId!=='decomposer')demand[pool]=(demand[pool]??0)+g.population*Math.max(.08,byId[g.speciesId].need)}
 let deaths=0,producerTotal=0,marineProducerTotal=0;
 for(const g of groups){const s=byId[g.speciesId],old=g.population;if(!old)continue;const random=mulberry32(evolutionSeed(seed,g.tick,g.x,g.z)+step*7919),pool=guildFood[s.id];
 const food=s.id==='elkhorncoral'?Math.min(1,env.sun*.6+Math.min(1,pools.plankton/Math.max(.001,demand.plankton??0))*.4):pool?Math.min(1,pools[pool]/Math.max(.001,demand[pool]??0)):s.diet==='producer'?Math.min(1,pools.nutrients/20):phi[s.id]??0;
 let fit=fitness(s,env,waterHabitatAt(g.x,g.z,date)===(s.zone==='land'?'terrestrial':s.zone==='sea'?'marine':'freshwater'));
 if(s.zone==='freshwater')fit*=pools.freshwater*pools.oxygen;
 if(s.zone==='sea')fit*=pools.oxygen*clamp(1-Math.abs(pools.salinity-35)/15);
 const selectionTemperature=change.temperature+envAt(date,scenario).temp-envAt(first,scenario).temp;
 if(g.evolution){const pressure=clamp(selectionTemperature/10,-1,1);fit*=g.evolution.frequencies.reduce((n,f,i)=>n+f*Math.max(.08,.8+pressure*(1-2*insulation[i])*.65),0)/.8}
 const reefSupport=s.id==='reeffish'?clamp(((populations.elkhorncoral??0)/12+(populations.seagrass??0)/60)/2,.1,1):1;
 const capacity=Math.max(1,s.K*env.habitat*reefSupport*(s.diet==='producer'?pools.nutrients/60:1));
 const pollination=s.id==='wildflower'?1+Math.min(.3,(populations.honeybee??0)*.05):1;
 const growth=pollination*Math.max(0,s.r*old*(1-(populations[s.id]??0)/capacity))*fit*food*dt*4;
 const mortality=(Math.max(0,old-capacity)*.2+old*(.025+s.m*(1-fit*food)+(disturbance(date)&&!s.hardy?.5:0)+((env.oxygenFit??1)<.2&&s.id!=='stromatolite'?.5:0))+(loss[s.id]??0)*old/Math.max(1,populations[s.id]))*dt;
 const pressure=scenario==='Exploit'?clamp((date-2026)/34)*s.habitatSensitivity*old*.08*dt:0;
 const next=Math.max(0,Math.min(s.K*1.2,old+growth-mortality-pressure));
 if(g.evolution){g.evolution=cohort(g.evolution,next,growth,date,random,selectionTemperature);g.evolution.approximate=interval>1;g.population=g.evolution.individuals.length;g.traits={frequencies:g.evolution.frequencies,births:g.evolution.births,turnover:g.evolution.generation}}
 else g.population=next<2?0:next;
 deaths+=Math.max(0,old+growth-g.population);if(s.diet==='producer'){producerTotal+=g.population;if(s.zone==='sea')marineProducerTotal+=g.population};
 }
 pools=cyclePools(pools,env,producerTotal,populations.decomposer??0,deaths,Object.fromEntries(Object.entries(demand).map(([k,v])=>[k,Math.min(pools[k as FoodPool],v??0)])),marineProducerTotal);
 add(date);
 }
 const currentChange=changes.filter(c=>c.year<=year).at(-1)??{temperature:0,resources:1};env=envAt(year,scenario,disturbance(year)==='asteroid');if(disturbance(year)==='end-permian'){env.temp+=10;env.habitat*=.25;env.oxygenFit=.4}env.temp+=currentChange.temperature;env.habitat*=currentChange.resources;env.oxygenFit=(env.oxygenFit??1)*pools.oxygen;
 const populations=groups.reduce<Record<string,number>>((p,g)=>{p[g.speciesId]=(p[g.speciesId]??0)+g.population;return p},{});
 return {tick,year,yearLabel:formatYear(year),eraName:eraName(year),env,pools,groups,populations,extinct:Object.keys(populations).filter(id=>populations[id]===0),happenings:[...(disturbance(year)?[disturbance(year)!]:[]),...(interval>1?['Batched deep-time ecology; not an annual fossil reconstruction']:[])]};
}
