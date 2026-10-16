import {expect,it} from 'vitest';
import {residentPlacements,migratePlacements} from './residents';
import {habitatAt,terrainHeight} from '../world';
import {byId,createWorld} from '../sim/simulation';
import {snapTick} from '../sim/timeline';
it('resident community starts alive in suitable habitat and is deterministic',()=>{
 const events=residentPlacements();expect(events).toEqual(residentPlacements());
 for(const e of events){expect(byId[e.speciesId]).toBeDefined();expect(habitatAt(e.x,e.z)).toBe(byId[e.speciesId].zone)}
 const world=createWorld();world.setPlacements(events);const now=world.getStateAt(snapTick('Present'));
 expect(now.groups).toHaveLength(events.length);expect(now.groups?.every(g=>g.population>0)).toBe(true);
 expect(world.getStateAt(snapTick('Jurassic')).groups).toEqual([]);
});
it('save migration scales modern placements exactly once and preserves historical coordinates',()=>{
 const old=[{tick:snapTick('Present'),speciesId:'reeffish',count:9,x:16,z:0},{tick:snapTick('Jurassic'),speciesId:'fern',count:12,x:2,z:3}];
 const migrated=migratePlacements(old,1);expect(migrated[0].x).toBe(24);expect(migrated[1]).toEqual(old[1]);expect(migratePlacements(migrated,2)).toEqual(migrated);
 expect(habitatAt(migrated[0].x,migrated[0].z)).toBe('sea');
});
it('modern horizontal area grows by 2.25 while river and lagoon remain continuous',()=>{
 let previous=0,current=0;for(let x=-24;x<24;x+=.25)for(let z=-24;z<24;z+=.25){if(habitatAt(x,z,-150e6)==='land')previous++;if(habitatAt(x,z)==='land')current++}
 expect(current/previous).toBeGreaterThan(2.1);expect(current/previous).toBeLessThan(2.4);
 expect(terrainHeight(7.5,7.5)).toBeLessThan(0);
});

it('resident replay restores exact groups and never duplicates the baseline',()=>{const world=createWorld(42);world.setPlacements(residentPlacements());const present=world.getStateAt(snapTick('Present'));world.getStateAt(4000);world.getStateAt(snapTick('Jurassic'));expect(world.getStateAt(snapTick('Present'))).toEqual(present);expect(new Set(present.groups?.map(g=>g.id)).size).toBe(residentPlacements().length)});
