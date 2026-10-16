import {mulberry32} from '../sim/rng';
import {islandDistance,terrainHeight,landscapeScale} from './terrain';
import type {EraProfile} from './eras';
export type ReefKind='branch'|'plate'|'sponge'|'mound';
export interface ReefColony {kind:ReefKind;x:number;y:number;z:number;scale:number;rotation:number;color:string}
/** Clustered shallow-water habitat; no modern coral silhouettes before the Mesozoic. */
export function reefLayout(era:EraProfile):ReefColony[]{
 if(era.id==='hadean'||era.snow)return [];
 const scale=landscapeScale(era.snap),random=mulberry32(912),colonies:ReefColony[]=[];
 const microbial=era.snap< -538.8e6,modern=era.snap> -201.4e6;
 const palette=microbial?['#b9ab6d','#a4b889','#cfbc87']:modern?['#e78c9b','#eeb778','#9c8acb','#66c3b0','#e2c99b']:['#b7ab7c','#69a998','#c3b095'];
 // Three visible garden patches, broken by open swimming lanes rather than a uniform ring.
 for(const [cx,cz] of [[12,7],[-10,10],[3,13]])for(let i=0;i<44;i++){
  const a=random()*Math.PI*2,r=Math.sqrt(random())*3.1,x=(cx+Math.cos(a)*r)*scale,z=(cz+Math.sin(a)*r)*scale;
  const d=islandDistance(x,z,era.snap),y=terrainHeight(x,z,era.snap);if(d<.25||d>4.2||y>-.45)continue;
  const kind:ReefKind=microbial?'mound':modern?(['branch','plate','sponge','mound'] as const)[i%4]:i%3?'sponge':'mound';
  colonies.push({kind,x,y:y+.05,z,scale:Math.min((.65+random()*.8)*(scale>1?1.25:1),(-y-.14)/1.3),rotation:random()*Math.PI*2,color:palette[i%palette.length]});
 }
 return colonies;
}

export interface MarinePlant {x:number;y:number;z:number;height:number;rotation:number}
/** Modern seagrass pockets only; never substitute flowering plants in ancient seas. */
export function marineMeadowLayout(era:EraProfile):MarinePlant[]{
 if(!['present','future'].includes(era.id))return [];
 const random=mulberry32(284),plants:MarinePlant[]=[];
 for(const colony of reefLayout(era))for(let i=0;i<3;i++){
  const a=random()*Math.PI*2,r=.7+random()*.9,x=colony.x+Math.cos(a)*r,z=colony.z+Math.sin(a)*r;
  const y=terrainHeight(x,z,era.snap),depth=-y;
  if(depth<.5||depth>2.8||islandDistance(x,z,era.snap)<.2)continue;
  plants.push({x,y:y+.015,z,height:Math.min(.55+random()*.5,depth-.15),rotation:a});
 }
 return plants;
}
