import type {Species} from './types';import {clamp} from './fitness';
export function foodWeb(species:Species[],p:Record<string,number>){const loss:Record<string,number>={},phi:Record<string,number>={};for(const s of species){const n=p[s.id]??0;if(!n)continue;const available=s.eats.reduce((v,id)=>v+(p[id]??0),0);const demand=s.need*n;phi[s.id]=s.diet==='producer'||s.selfSufficient?1:Math.min(1,available/(demand||1));if(available)for(const id of s.eats)loss[id]=(loss[id]??0)+Math.min(available,demand)*(p[id]??0)/available;}return {loss,phi};}
export const pollination=(id:string,p:Record<string,number>)=>id==='wildflower'&&(p.honeybee??0)>5?1.3:1;
export const turtleBirths=(temp:number)=>clamp(1-(temp-21)/1.5);
