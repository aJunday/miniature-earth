import {islandDistance,landscapeScale,terrainHeight,waterHabitatAt} from '../world/terrain';
import {historyRecord} from '../sim/eligibility';
import species from '../sim/data/species.json';
const catalogue=Object.fromEntries(species.map(s=>[s.id,s]));
export const tallPlants=new Set(['conifer','oak','metasequoia','archaeopteris','lycophyte']);
export function bodyRadius(id:string){const s=catalogue[id];return s.zone==='freshwater'?.36:Math.max(.38,Math.min(1.65,(s.size??s.height)*.65))}
/** Deterministic display territories; population abundance and dates are untouched. */
export function arrangeCommunities<T extends {speciesId:string;x:number;z:number}>(groups:T[],year:number):T[]{
 const scale=landscapeScale(year),occupied:{x:number;z:number;habitat:string}[]=[],positions=new Map<string,[number,number]>();
 const ordered=[...groups].sort((a,b)=>bodyRadius(b.speciesId)-bodyRadius(a.speciesId)||a.speciesId.localeCompare(b.speciesId));
 for(const g of ordered){const s=catalogue[g.speciesId];if(s.diet==='producer'&&s.zone==='land')continue;const habitat=historyRecord(g.speciesId)?.habitat??'terrestrial';let best:[number,number]=[g.x,g.z],score=-Infinity;
  for(let z=-2;z<=12;z+=.75)for(let x=-11;x<=11;x+=.75){const px=x*scale,pz=z*scale,y=terrainHeight(px,pz,year);if(waterHabitatAt(px,pz,year)!==habitat)continue;
   if(habitat==='terrestrial'&&(islandDistance(px,pz,year)>-3.2||y>2.1||z>6||x+z< -5))continue;
   if(habitat==='marine'&&(z<5||y< -2.5))continue;
   const peers=occupied.filter(p=>p.habitat===habitat),clearance=peers.length?Math.min(...peers.map(p=>Math.hypot(px-p.x,pz-p.z))):10;
   const value=clearance-Math.hypot(px,pz-(habitat==='marine'?9*scale:2*scale))*.08;
   if(value>score){score=value;best=[px,pz]}
  }
  positions.set(g.speciesId,best);occupied.push({x:best[0],z:best[1],habitat});
 }
 return groups.map(g=>{const p=positions.get(g.speciesId);return p?{...g,x:p[0],z:p[1]}:g});
}
