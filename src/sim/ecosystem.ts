import type {Species} from './types';import {clamp} from './fitness';
/** Share finite prey between consumers before calculating food satisfaction. */
export function foodWeb(species:Species[],p:Record<string,number>){
 const loss:Record<string,number>={},phi:Record<string,number>={},requests:{consumer:string;prey:string;amount:number}[]=[];
 for(const s of species){const n=p[s.id]??0;if(!n)continue;const available=s.eats.reduce((v,id)=>v+(p[id]??0),0),demand=s.need*n;phi[s.id]=s.diet==='producer'||s.selfSufficient?1:0;
 if(available>0)for(const prey of s.eats){const amount=Math.min(available,demand)*(p[prey]??0)/available;requests.push({consumer:s.id,prey,amount});loss[prey]=(loss[prey]??0)+amount}}
 const actual:Record<string,number>={};
 for(const r of requests){const amount=r.amount*Math.min(1,(p[r.prey]??0)/(loss[r.prey]||1));actual[r.consumer]=(actual[r.consumer]??0)+amount}
 for(const id of Object.keys(loss))loss[id]=Math.min(loss[id],p[id]??0);
 for(const s of species)if((p[s.id]??0)>0&&!s.selfSufficient&&s.diet!=='producer')phi[s.id]=Math.min(1,(actual[s.id]??0)/(s.need*p[s.id]||1));
 return {loss,phi};
}
export const pollination=(id:string,p:Record<string,number>)=>id==='wildflower'&&(p.honeybee??0)>5?1.3:1;
export const turtleBirths=(temp:number)=>clamp(1-(temp-21)/1.5);
