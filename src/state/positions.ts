import {habitatAt,waterHabitatAt} from '../world/terrain';
import {mulberry32} from '../sim/rng';
export function inZone(x:number,z:number,zone:string,year=2026){return zone==='freshwater'?waterHabitatAt(x,z,year)==='freshwater':zone==='land'?waterHabitatAt(x,z,year)==='terrestrial':habitatAt(x,z,year)===zone}
/** If a patch is full, draw fewer representatives; never stack failures at one fallback point. */
export function individualPositions(x:number,z:number,count:number,zone:string,seed:number,year=2026,spacing=.35,radius=2.5,valid:(x:number,z:number)=>boolean=()=>true){
 const random=mulberry32(seed),points:[number,number][]=[];
 for(let i=0;i<count;i++)for(let attempt=0;attempt<180;attempt++){
  const angle=random()*Math.PI*2,d=Math.sqrt(random())*radius,px=x+Math.cos(angle)*d,pz=z+Math.sin(angle)*d;
  if(inZone(px,pz,zone,year)&&valid(px,pz)&&points.every(([a,b])=>Math.hypot(a-px,b-pz)>=spacing)){points.push([px,pz]);break}
 }
 return points;
}
