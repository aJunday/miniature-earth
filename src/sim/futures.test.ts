import {it,expect} from 'vitest';
import {futureState,useGame} from '../state';
import {conservationActions,futureMetrics} from './futures';
import {navigationStep,stepAdaptive,yearToTick,tickToYear} from './timeline';
import {historicalState} from '../state/history';
import {eligibility} from './eligibility';
import references from './data/research-catalogue.json';
it('uses contextual increments and exact future decade markers without changing save ticks',()=>{
 expect(navigationStep(-150e6)).toBe(5e6);expect(navigationStep(-40e6)).toBe(1e6);expect(navigationStep(-40000)).toBe(1000);expect(navigationStep(1000)).toBe(100);
 expect(stepAdaptive(2026,1)).toBe(2030);expect(stepAdaptive(2030,-1)).toBe(2026);expect(stepAdaptive(2026,-1)).toBe(2016);expect(stepAdaptive(2100,1)).toBe(2100);expect(stepAdaptive(-600e6,-1)).toBe(-600e6);expect(stepAdaptive(-600e6,-1,true)).toBeLessThan(-600e6);
 for(const y of [-454e7,-600e6,-150e6,-40000,1600,2026,2030,2100])expect(tickToYear(yearToTick(y))).toBeCloseTo(y,3);
});
it('uses reviewed regional residents and native functional proxies without tropical or polar fill',()=>{
 const state=historicalState(yearToTick(2026),'North America');expect(state.groups!.length).toBeGreaterThanOrEqual(6);
 for(const g of state.groups!)expect(eligibility(g.speciesId,2026,undefined,'North America').allowed).toBe(true);
 for(const id of ['tiger','polarbear','forestelephant','giantpanda'])expect(state.populations[id]).toBeUndefined();
 expect(state.populations.grass).toBeGreaterThan(0);expect(state.populations.deer).toBeGreaterThan(0);
});
it('compares deterministic futures from identical founders, preserving independent custom worlds',()=>{
 const initial=futureState(2026,'North America',[]),protectedInitial=futureState(2026,'North America',conservationActions);expect(initial.populations).toEqual(protectedInitial.populations);
 const base=futureState(2100,'North America',[]),protect=futureState(2100,'North America',conservationActions);
 expect(futureState(2100,'North America',[])).toEqual(base);expect(futureMetrics(protect).habitat).toBeGreaterThan(futureMetrics(base).habitat);expect(protect.env.temp).toBeCloseTo(21.5);expect(base.env.habitat).toBeCloseTo(.65*(1-.35*.5));
 expect(protect.populations).not.toEqual(base.populations);expect(protect.pools!.freshwater).toBeGreaterThan(base.pools!.freshwater);
 const custom=useGame.getState().custom;futureState(2050,'Asia',conservationActions);expect(useGame.getState().custom).toBe(custom);
});
it('keeps more than 200 sourced references separate from playable and ecological claims',()=>{
 expect(references.length).toBeGreaterThanOrEqual(200);expect(new Set(references.map(r=>r.id)).size).toBe(references.length);
 for(const r of references){expect(r.source).toMatch(/^https:\/\/www.gbif.org\/species\/\d+$/);expect(r.playable).toBe(false);expect(r.coverage).toBeNull();expect(r.habitat).toBeNull()}
});
it('future introductions enter the same coupled replay used by comparisons',()=>{const tick=yearToTick(2040),additions=[{speciesId:'bison',count:15,x:0,z:0,tick}];const before=futureState(2030,'North America',[],42,additions),without=futureState(2030,'North America',[]);expect(before.populations).toEqual(without.populations);const introduced=futureState(2040,'North America',[],42,additions);expect(introduced.groups!.filter(g=>g.speciesId==='bison').length).toBe(2)});
it('native historical reconstructions include reviewed ancient forests and Ice Age mammals',()=>{expect(historicalState(yearToTick(-315e6),'North America').populations.lycophyte).toBeGreaterThan(0);expect(historicalState(yearToTick(-40000),'North America').populations.mammoth).toBeGreaterThan(0);expect(historicalState(yearToTick(2026),'North America').populations.mammoth).toBeUndefined()});
