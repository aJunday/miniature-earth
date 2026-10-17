import {it,expect} from 'vitest';
import {residentPlacements} from './residents';
import {createWorld,byId} from '../sim/simulation';
import {yearToTick} from '../sim/timeline';
import {eras} from '../world/eras';
import {habitatAt,waterHabitatAt} from '../world';
it('historical scenes have suitable residents without duplicate replay groups',()=>{
 const w=createWorld();w.setPlacements(residentPlacements(true));
 for(const era of eras){const state=w.getStateAt(yearToTick(era.snap));const alive=state.groups?.filter(g=>g.population>=2)??[];
 const expected:Record<string,string>={archean:'stromatolite',ediacaran:'dickinsonia',cambrian:'anomalocaris',carboniferous:'arthropleura',permian:'dimetrodon',triassic:'ammonite',jurassic:'stegosaurus',cretaceous:'triceratops',cenozoic:'groundsloth',pleistocene:'mammoth',present:'deer',future:'deer'};if(expected[era.id])expect(alive.map(g=>g.speciesId),era.id).toContain(expected[era.id]);
 if(!['hadean'].includes(era.id))expect(alive.length,era.id).toBeGreaterThan(0);
 expect(new Set(state.groups?.map(g=>g.id)).size).toBe(state.groups?.length);
 for(const g of alive)expect((byId[g.speciesId].zone==='freshwater'?waterHabitatAt(g.x,g.z,era.snap):habitatAt(g.x,g.z,era.snap))).toBe(byId[g.speciesId].zone);
 const again=w.getStateAt(yearToTick(era.snap));expect(again).toEqual(state);
 }
});
it('historical retirement affects only curated residents, never player experiments',()=>{const w=createWorld();const tick=yearToTick(-67e6);w.setPlacements([{tick,speciesId:'fern',count:40,x:-5,z:1},{tick,speciesId:'fern',count:40,x:-6,z:1,origin:'resident',untilTick:tick+.5}]);expect(w.getStateAt(tick+.75).groups).toHaveLength(1)});
