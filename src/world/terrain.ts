import {eraAt} from './eras';
export const oceanLevel=0;
export function coastRadius(a:number){return 13.4+1.4*Math.sin(a*3+.5)+.8*Math.cos(a*5-.7)+.45*Math.sin(a*9)}
export const landscapeScale=(year=2026)=>year>=-11700?1.5:1;
export function islandDistance(x:number,z:number,year=2026){const scale=landscapeScale(year);x/=scale;z/=scale;return baseDistance(x,z,year)*scale}
function baseDistance(x:number,z:number,year=2026){const era=eraAt(year);const sx=era.marine?.62:era.id==='triassic'?1.13:era.id==='carboniferous'?1.05:era.id==='neogene'?.88:1,sz=era.marine?.75:era.id==='triassic'?.76:era.id==='carboniferous'?1.12:era.id==='neogene'?1.13:1;return Math.hypot(x/sx,z/(.87*sz))-coastRadius(Math.atan2(z/(.87*sz),x/sx))}
export function lagoonDistance(x:number,z:number,year=2026){const scale=landscapeScale(year);const dx=x/scale-5,dz=z/scale-5,a=Math.atan2(dz,dx);return (Math.hypot(dx,dz)-3.2-(scale>1?.28*Math.sin(a*3)+.18*Math.cos(a*5):0))*scale}
export function riverX(z:number,year=2026){const scale=landscapeScale(year);z/=scale;return (1.8+(eraAt(year).id==='carboniferous'?3:1.8)*Math.sin(z*.24)+z*.17)*scale}
export function terrainHeight(x:number,z:number,year=2026){const scale=landscapeScale(year);x/=scale;z/=scale;const era=eraAt(year),d=baseDistance(x,z,year);if(d>0)return -.35-Math.min(4.65,d*.75);const shore=Math.max(0,Math.min(1,-d/2.1));let y=-.35+shore*1.7;const hills=3.8*Math.exp(-((x+6)**2/22+(z+6)**2/15))+2.2*Math.exp(-((x-6)**2/17+(z+8)**2/15));y+=hills*shore*era.mountain;y+=.15*Math.sin(x*.65)*Math.cos(z*.52)*shore;
if(scale>1)y+=2.2*Math.exp(-((x+6)**2/10+(z+6)**2/7))*shore;
const pond=lagoonDistance(x*scale,z*scale,year);if(pond<.7)y=Math.min(y,-.75+Math.max(0,pond+.4)*2);
if(z>-7&&z<6){const river=Math.abs(x-riverX(z*scale,year)/scale);if(river<1.4){const t=Math.max(0,Math.min(1,(river-.85)/.55));const start=Math.max(0,Math.min(1,(z+7)/2));const target=.22+(y-.22)*t*t*(3-2*t);y=Math.min(y,y+(target-y)*start*start*(3-2*start))}}return y;}
export function habitatAt(x:number,z:number,year=2026){if(Math.abs(x)>22*landscapeScale(year)||Math.abs(z)>20*landscapeScale(year))return 'outside';return terrainHeight(x,z,year)<.12?'sea':'land'}
export function placementHeight(x:number,z:number,zone:string,year=2026){return zone==='sea'?-.10:terrainHeight(x,z,year)}

/** A freshwater river is distinct from the saltwater lagoon and ocean. */
export function waterHabitatAt(x:number,z:number,year=2026):'terrestrial'|'marine'|'freshwater'|'outside'{
 const coarse=habitatAt(x,z,year);if(coarse==='outside')return 'outside';if(coarse==='sea')return 'marine';
 const scale=landscapeScale(year);if(z>-5*scale&&z<2*scale&&Math.abs(x-riverX(z,year))<.42*scale)return 'freshwater';return 'terrestrial';
}
