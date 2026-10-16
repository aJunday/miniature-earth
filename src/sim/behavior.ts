/** Visual steering only: ecological births, feeding and deaths remain in simulation.ts.
 * Pure and deterministic for a fixed initial state, dt and neighborhood. */
export type Behavior='idle'|'walk'|'swim'|'fly'|'forage'|'rest'|'flee'|'pursue';
export interface AnimalMotion {x:number;z:number;heading:number;mode:Behavior}
export interface Neighbor {id:string;x:number;z:number;diet:string;eats:readonly string[]}
interface Input {id:string;zone:string;diet:string;eats:readonly string[];flying:boolean;anchorX:number;anchorZ:number;phase:number;time:number;dt:number;neighbors:readonly Neighbor[];valid:(x:number,z:number)=>boolean}
export function steerAnimal(previous:AnimalMotion,input:Input):AnimalMotion{
 const {id,zone,diet,eats,flying,anchorX,anchorZ,phase,time,neighbors,valid}=input;
 let mode:Behavior=zone==='sea'?'swim':flying?'fly':'walk';
 let targetX=anchorX+Math.sin(time*.17+phase)*1.5,targetZ=anchorZ+Math.cos(time*.17+phase)*1.5;
 let speed=zone==='sea'?.48:flying?.8:.55;
 const cycle=(time+phase*7)%28;
 if(!flying&&cycle>21){mode=cycle>25?'rest':'forage';speed=0}
 let nearest=Infinity,threat:Neighbor|undefined;
 for(const n of neighbors){if(n.id===id||!n.eats.includes(id))continue;const d=Math.hypot(n.x-previous.x,n.z-previous.z);if(d<3.2&&d<nearest){nearest=d;threat=n}}
 if(threat){mode='flee';targetX=previous.x+(previous.x-threat.x)*3;targetZ=previous.z+(previous.z-threat.z)*3;speed=1.05}
 else if(diet==='carnivore'){
  let prey:Neighbor|undefined;nearest=Infinity;
  for(const n of neighbors){if(!eats.includes(n.id))continue;const d=Math.hypot(n.x-previous.x,n.z-previous.z);if(d<2.8&&d<nearest){nearest=d;prey=n}}
  if(prey){mode=nearest<.55?'forage':'pursue';speed=nearest<.55?0:.7;targetX=prey.x;targetZ=prey.z}
 }
 const dx=targetX-previous.x,dz=targetZ-previous.z,d=Math.hypot(dx,dz),step=Math.min(d,speed*Math.max(0,Math.min(.1,input.dt)));
 if(d<.08||!step)return {...previous,mode:mode==='walk'?'idle':mode};
 const angle=Math.atan2(dx,dz);
 for(const turn of [0,.65,-.65,1.3,-1.3]){const heading=angle+turn,x=previous.x+Math.sin(heading)*step,z=previous.z+Math.cos(heading)*step;
  if(Math.hypot(x-anchorX,z-anchorZ)<3.5&&valid(x,z))return {x,z,heading,mode};
 }
 return {...previous,mode:'idle'};
}
export const flyingSpecies=new Set(['honeybee','pteranodon','philippineeagle','condor','baldeagle','passengerpigeon']);
