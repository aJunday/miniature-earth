import {mulberry32} from './rng';
/** One haploid insulation locus, three alleles, annual non-overlapping cohorts.
 * Pedagogical rabbit model, not estimated wild-rabbit genetic parameters. */
export type Allele=0|1|2;
export interface Individual {id:string;allele:Allele;born:number;parent:string|null}
export interface Intervention {year:number;temperature:number;resources:number}
export interface EvolutionSnapshot {individuals:Individual[];generation:number;frequencies:[number,number,number];mean:number;births:number;deaths:number;approximate:boolean}
export const insulation=[1,.55,.1] as const;
export function phenotype(allele:Allele){return {insulation:insulation[allele],furLength:.012+insulation[allele]*.075,tufts:Math.round(4+insulation[allele]*20)}}
export function evolutionAt(start:number,year:number,seed:number,count:number,changes:readonly Intervention[]=[]):EvolutionSnapshot{
 let individuals:Individual[]=Array.from({length:Math.min(80,Math.max(0,Math.round(count)))},(_,i)=>({id:`${seed}:0:${i}`,allele:([0,1,1,2] as const)[i%4],born:start,parent:null}));
 const generations=Math.max(0,Math.floor(year-start));let births=0,deaths=0;const steps=Math.min(256,generations);
 for(let g=1;g<=steps;g++){
  const date=start+g*generations/steps,change=changes.filter(c=>c.year<=date).at(-1)??{temperature:0,resources:1};
  const rng=mulberry32(seed+g*7919),pressure=Math.max(-1,Math.min(1,change.temperature/10));
  const fitness=individuals.map(a=>Math.max(.08,.8+pressure*(1-2*insulation[a.allele])*.65));const total=fitness.reduce((a,b)=>a+b,0);
  const capacity=Math.max(0,40*change.resources),mean=individuals.length?total/individuals.length:0;
  const nextCount=Math.min(80,Math.max(0,Math.round(individuals.length*(.55+mean*.85)*(1-individuals.length/Math.max(1,capacity)*.28))));
  const offspring:Individual[]=[];
  for(let i=0;i<nextCount&&total>0;i++){let draw=rng()*total,index=0;while(index<fitness.length-1&&draw>fitness[index])draw-=fitness[index++];const parent=individuals[index];let allele=parent.allele;if(rng()<.002)allele=((allele+1+Math.floor(rng()*2))%3) as Allele;offspring.push({id:`${seed}:${g}:${i}`,allele,born:date,parent:parent.id})}
  births+=offspring.length;deaths+=individuals.length;individuals=offspring;
 }
 const frequencies=[0,0,0] as [number,number,number];for(const a of individuals)frequencies[a.allele]+=1/Math.max(1,individuals.length);
 return {individuals,generation:generations,frequencies,mean:frequencies.reduce((n,f,i)=>n+f*insulation[i],0),births,deaths,approximate:generations>256};
}
