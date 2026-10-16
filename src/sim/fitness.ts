import type {Species,Environment} from './types';
export const clamp=(n:number,a=0,b=1)=>Math.max(a,Math.min(b,n));
export function rangeFit(value:number,range:number[]|null,margin:number){return !range?1:clamp(1-Math.max(range[0]-value,value-range[1],0)/margin)}
export function fitness(s:Species,e:Environment,zone=true){return rangeFit(e.temp,s.temp,5)*rangeFit(e.rain,s.rain,.2)*(zone?1:0)*e.habitat*(s.id==='stromatolite'?1:Math.min(1,(e.oxygenFit??1)*1.4));}
