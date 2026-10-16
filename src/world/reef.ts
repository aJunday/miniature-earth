import {mulberry32} from '../sim/rng';
import {islandDistance,terrainHeight} from './terrain';
import type {EraProfile} from './eras';
export type ReefKind='branch'|'plate'|'sponge'|'mound';
export interface ReefColony {kind:ReefKind;x:number;y:number;z:number;scale:number;rotation:number;color:string}
/** Clustered shallow-water habitat; no modern coral silhouettes before the Mesozoic. */
export function reefLayout(era:EraProfile):ReefColony[]{
 if(era.id==='hadean'||era.snow)return [];
 const random=mulberry32(912),colonies:ReefColony[]=[];
 const microbial=era.snap< -538.8e6,modern=era.snap> -201.4e6;
 const palette=microbial?['#b9ab6d','#a4b889','#cfbc87']:modern?['#e78c9b','#eeb778','#9c8acb','#66c3b0','#e2c99b']:['#b7ab7c','#69a998','#c3b095'];
 // Three visible garden patches, broken by open swimming lanes rather than a uniform ring.
 for(const [cx,cz] of [[12,7],[-10,10],[3,13]])for(let i=0;i<32;i++){
  const a=random()*Math.PI*2,r=Math.sqrt(random())*3.1,x=cx+Math.cos(a)*r,z=cz+Math.sin(a)*r;
  const d=islandDistance(x,z),y=terrainHeight(x,z,era.snap);if(d<.25||d>4.2||y>-.45)continue;
  const kind:ReefKind=microbial?'mound':modern?(['branch','plate','sponge','mound'] as const)[i%4]:i%3?'sponge':'mound';
  colonies.push({kind,x,y:y+.05,z,scale:.65+random()*.8,rotation:random()*Math.PI*2,color:palette[i%palette.length]});
 }
 return colonies;
}
