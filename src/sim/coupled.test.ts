import {describe,it,expect} from 'vitest';
import {coupledState,cyclePools,initialPools} from './coupled';
import {species} from './simulation';
import {yearToTick} from './timeline';
import {envAt} from './environment';
import type {Placement} from './types';
const start=yearToTick(2026),event=(speciesId:string,count:number):Placement=>({speciesId,count,tick:start,x:-5,z:2});
const base=[event('grass',90),event('wildflower',40),event('rabbit',30),event('decomposer',12)];
const run=(events=base,year=2046,temperature=0,seed=42)=>coupledState(species,events,yearToTick(year),'Protect',seed,[{year:2026,temperature,resources:1}]);
describe('one coupled ecosystem',()=>{
 it('replays exactly without mutating events or previous snapshots',()=>{const before=JSON.stringify(base),a=run();run(base,2036);expect(run()).toEqual(a);expect(JSON.stringify(base)).toBe(before)});
 it('predators remove the same evolving rabbits, and food changes their population',()=>{expect(run([...base,event('redfox',12)]).populations.rabbit).toBeLessThan(run().populations.rabbit);expect(run(base.filter(p=>!['grass','wildflower'].includes(p.speciesId))).populations.rabbit).toBeLessThan(run().populations.rabbit)});
 it('offspring inherit and surviving individuals never change alleles',()=>{const a=run(base,2027),b=run(base,2028),old=new Map(a.groups!.find(g=>g.speciesId==='rabbit')!.evolution!.individuals.map(i=>[i.id,i]));for(const i of b.groups!.find(g=>g.speciesId==='rabbit')!.evolution!.individuals){if(old.has(i.id))expect(i.allele).toBe(old.get(i.id)!.allele);else expect(i.parent).not.toBeNull()}});
 it('environmental selection shifts inherited coats across seeded ensembles',()=>{let cold=0,warm=0;for(let seed=1;seed<=30;seed++){cold+=run(base,2046,-5,seed).groups!.find(g=>g.speciesId==='rabbit')!.evolution!.mean;warm+=run(base,2046,5,seed).groups!.find(g=>g.speciesId==='rabbit')!.evolution!.mean}expect(cold).toBeGreaterThan(warm)});
 it('decomposition recycles detritus and consumes dissolved oxygen',()=>{const env=envAt(2026,'Protect'),p=initialPools(),a=cyclePools(p,env,0,20,0),b=cyclePools(p,env,0,0,0);expect(a.detritus).toBeLessThan(b.detritus);expect(a.nutrients).toBeGreaterThan(b.nutrients);expect(a.oxygen).toBeLessThan(b.oxygen)});
 it('low water and heat reduce oxygen and concentrate salinity',()=>{const e={...envAt(2026,'Protect'),temp:35,rain:0};let p=initialPools();for(let i=0;i<30;i++)p=cyclePools(p,e,0,0,0);expect(p.freshwater).toBeLessThan(.5);expect(p.salinity).toBeGreaterThan(35);expect(p.oxygen).toBeLessThan(.8)});
 it('does not resurrect extinct cohorts; all pools stay finite and bounded',()=>{const s=run([event('rabbit',0)],2100);expect(s.populations.rabbit).toBe(0);for(const value of Object.values(s.pools!)){expect(Number.isFinite(value)).toBe(true);expect(value).toBeGreaterThanOrEqual(0)}});
 it('vegetation is depleted by grazing and changes detritus/nutrients',()=>{const a=run(base,2027),b=run(base.filter(e=>e.speciesId!=='rabbit'),2027);expect(a.populations.grass).toBeLessThan(b.populations.grass);expect(a.pools).not.toEqual(b.pools)});
});
