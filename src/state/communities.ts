import type {Placement} from '../sim/types';
import {yearToTick} from '../sim/timeline';
/** Curated regional snapshots. Windows are scene coverage, not claimed taxon origination dates.
 * Each patch is introduced once, then follows the same ecology as player populations.
 * Player populations never receive historical retirement. */
type Patch=[id:string,count:number,x:number,z:number];
interface Community {id:string;start:number;end:number;patches:Patch[]}
export const communities:Community[]=[
 {id:'documented-dodo',start:1598,end:1663,patches:[['dodo',4,-5,2]]},
 {id:'documented-seacow',start:1741,end:1769,patches:[['stellerseacow',3,18,12]]},
 {id:'documented-pigeon',start:1850,end:1915,patches:[['passengerpigeon',6,-5,2]]},
 {id:'documented-thylacine',start:1903,end:1937,patches:[['thylacine',3,-8,2]]},
 {id:'documented-tortoise',start:1971,end:2013,patches:[['pintatortoise',2,-5,2]]},
 {id:'microbial',start:-3.5e9,end:-635e6,patches:[['stromatolite',45,16,-2]]},
 {id:'ediacaran',start:-580e6,end:-538.8e6,patches:[['stromatolite',65,14,6],['charnia',18,15,8],['dickinsonia',9,13,9]]},
 {id:'paleozoic-sea',start:-538.8e6,end:-252e6,patches:[['stromatolite',60,16,-3],['trilobite',12,16,0]]},
 {id:'cambrian',start:-520e6,end:-500e6,patches:[['anomalocaris',3,16,3]]},
 {id:'coal-forest',start:-330e6,end:-299e6,patches:[['fern',60,-5,1],['lycophyte',24,-9,-4],['horsetail',45,-4,4],['arthropleura',8,-4,1]]},
 {id:'early-permian',start:-295e6,end:-272e6,patches:[['fern',40,-6,1],['horsetail',30,-4,4],['dimetrodon',3,-5,2]]},
 {id:'mesozoic-sea',start:-240e6,end:-66e6,patches:[['ammonite',10,14,7]]},
 {id:'triassic-flora',start:-240e6,end:-201.4e6,patches:[['fern',50,-6,1],['cycad',30,-8,-3]]},
 {id:'jurassic',start:-155e6,end:-145e6,patches:[['fern',90,-5,2],['cycad',60,-7,-2],['conifer',50,-9,-6],['stegosaurus',8,-5,1],['brachiosaurus',4,-5,-5],['allosaurus',2,-8,5]]},
 {id:'cretaceous-flying',start:-86e6,end:-84e6,patches:[['pteranodon',3,-5,1]]},
 {id:'late-cretaceous',start:-68e6,end:-66e6,patches:[['fern',70,-6,1],['cycad',40,-8,-3],['triceratops',8,-4,2]]},
 {id:'neogene',start:-9e6,end:-2.58e6,patches:[['grass',90,-5,1],['groundsloth',5,-6,2]]},
 {id:'ice-age',start:-120000,end:-11700,patches:[['grass',90,-5,1],['mammoth',5,-7,2],['groundsloth',3,0,4]]},
];
export function historicalResidents():Placement[]{return communities.flatMap(c=>c.patches.map(([speciesId,count,x,z],i)=>({speciesId,count,x,z,tick:yearToTick(c.start),untilTick:yearToTick(c.end),residentKey:c.id+'-'+i,origin:'resident' as const})));}
