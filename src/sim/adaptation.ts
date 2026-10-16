import {rangeFit} from './fitness';
import type {Species} from './types';
/** Teaching model of standing heritable variation, not measured genetics or speciation. */
export interface InheritedTraits {frequencies:[number,number,number];births:number;turnover:number}
export const traitOffsets=[-2,0,2] as const;
export const adaptedSpecies=new Set(['deer','rabbit','redfox','mammoth']);
export const initialTraits=():InheritedTraits=>({frequencies:[.25,.5,.25],births:0,turnover:0});
export function variantFitness(s:Species,temp:number){return traitOffsets.map(offset=>rangeFit(temp,s.temp?.map(v=>v+offset)??null,5))}
export function inheritedFitness(s:Species,temp:number,traits:InheritedTraits){return variantFitness(s,temp).reduce((total,f,i)=>total+f*traits.frequencies[i],0)}
/** Offspring retain parental variant; mortality is weighted toward poorly suited variants.
 * No mutation: a missing variant cannot appear. Population size remains governed by ecology. */
export function inherit(traits:InheritedTraits,oldPopulation:number,nextPopulation:number,births:number,fit:number[]):InheritedTraits{
 if(oldPopulation<=0||nextPopulation<=0)return {...traits,frequencies:[0,0,0]};
 const weights=traits.frequencies.map((p,i)=>p*fit[i]);const weight=weights.reduce((a,b)=>a+b,0);
 const offspring=weights.map((w,i)=>births*(weight?w/weight:traits.frequencies[i]));
 const cohorts=traits.frequencies.map((p,i)=>oldPopulation*p+offspring[i]);
 let deaths=Math.max(0,oldPopulation+births-nextPopulation);
 // Redistribute capped deaths so no cohort can become negative.
 for(let pass=0;pass<3&&deaths>1e-9;pass++){
  const risks=cohorts.map((n,i)=>n*(1+2*(1-fit[i]))),risk=risks.reduce((a,b)=>a+b,0);if(!risk)break;
  let removed=0;for(let i=0;i<3;i++){const d=Math.min(cohorts[i],deaths*risks[i]/risk);cohorts[i]-=d;removed+=d}deaths-=removed;
 }
 const total=cohorts.reduce((a,b)=>a+b,0);
 return {frequencies:cohorts.map(n=>total?n/total:0) as [number,number,number],births:traits.births+births,turnover:traits.turnover+births/oldPopulation};
}
