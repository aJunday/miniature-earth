import {eraAt} from './eras';
export const oceanLevel=0;
export function coastRadius(a:number){return 13.4+1.4*Math.sin(a*3+.5)+.8*Math.cos(a*5-.7)+.45*Math.sin(a*9)}
export function islandDistance(x:number,z:number){return Math.hypot(x,z/0.87)-coastRadius(Math.atan2(z/.87,x))}
export const lagoonDistance=(x:number,z:number)=>Math.hypot(x-5,z-5)-3.2;
export function riverX(z:number){return 1.8+1.8*Math.sin(z*.24)+z*.17}
export function terrainHeight(x:number,z:number,year=2026){const era=eraAt(year),d=islandDistance(x,z);if(d>1.8)return -1.7-Math.min(3.3,(d-1.8)*.6);const shore=Math.max(0,Math.min(1,-d/2.1));let y=-.35+shore*1.7;const hills=3.8*Math.exp(-((x+6)**2/22+(z+6)**2/15))+2.2*Math.exp(-((x-6)**2/17+(z+8)**2/15));y+=hills*shore*era.mountain;y+=.15*Math.sin(x*.65)*Math.cos(z*.52)*shore;
const pond=lagoonDistance(x,z);if(pond<.7)y=Math.min(y,-.75+Math.max(0,pond+.4)*2);
if(z>-7&&z<6){const river=Math.abs(x-riverX(z));if(river<1){const t=Math.max(0,Math.min(1,(river-.25)/.75));const start=Math.max(0,Math.min(1,(z+7)/2));const target=.22+(y-.22)*t*t*(3-2*t);y=Math.min(y,y+(target-y)*start*start*(3-2*start))}}return y;}
export function habitatAt(x:number,z:number,year=2026){if(Math.abs(x)>22||Math.abs(z)>20)return 'outside';return terrainHeight(x,z,year)<.12?'sea':'land'}
export function placementHeight(x:number,z:number,zone:string,year=2026){return zone==='sea'?-.10:terrainHeight(x,z,year)}
