import {historicalResidents} from './communities';
import {snapTick,tickToYear,yearToTick} from '../sim/timeline';
import type {Placement} from '../sim/types';
/** A curated habitat mosaic, not a reconstruction of one real-world community. */
export function residentPlacements(includeHistory=false):Placement[]{
 const tick=includeHistory?yearToTick(1872):snapTick('Present');
 const modern:Placement[] = [
  ['decomposer',12,-12,-4],['axolotl',3,2.7,0],['grass',90,-5,2],['oak',24,-13,-6],['wildflower',40,-4,5],
  ['baldeagle',2,-2,-4],['honeybee',6,-4,5],['deer',6,-5,2],['rabbit',8,-7,6],['redfox',3,-10,-2],
  ['elkhorncoral',12,19,13],['reeffish',12,19,11],['seaturtle',3,16,15],['seagrass',60,18,12],
 ].map(([speciesId,count,x,z])=>({speciesId:speciesId as string,count:count as number,x:x as number,z:z as number,tick,origin:'resident'}));
 return includeHistory?[...historicalResidents(),...modern]:modern;
}
/** Old modern-world saves used a 1× footprint. Historical placements keep their coordinates. */
export function migratePlacements(events:Placement[],version:number):Placement[]{
 return events.map(e=>version<2&&tickToYear(e.tick)>=-11700?{...e,x:e.x*1.5,z:e.z*1.5}:{...e});
}
