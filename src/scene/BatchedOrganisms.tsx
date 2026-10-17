import {instancesMoved} from './instancePicking';
import {habitatStress} from './conservationVisuals';
import {bodyRadius} from '../state/composition';
import {islandDistance} from '../world/terrain';
import {wildlife} from './wildlife';
import type {Neighborhood} from '../sim/neighborhood';
import {waterHabitatAt} from '../world/terrain';
import {RiggedOrganism,type RigHandle} from './RiggedOrganism';
import {Suspense} from 'react';
import {furPlacement} from './phenotype';
import {phenotype,type Allele} from '../sim/evolution';
import {steerAnimal,isMobileSpecies,flyingSpecies,type AnimalMotion} from '../sim/behavior';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {useMemo,useRef,useEffect,useState} from 'react';
import {useFrame,useThree} from '@react-three/fiber';
import {useGLTF} from '@react-three/drei';
import {Box3,CanvasTexture,Color,InstancedMesh,Matrix4,Mesh,MeshLambertMaterial,Object3D,Vector3} from 'three';
import {byId} from '../sim/simulation';
import {terrainHeight} from '../world';
import {navigable} from '../world/navigation';
import {useGame,useSimState} from '../state';
export interface RenderIndividual {key:string;x:number;z:number;fossil:boolean;authored?:boolean;exitAt?:number;allele?:Allele|undefined}
/** One draw per source primitive, irrespective of the number of animals. */
export function BatchedOrganisms({id,items,year,neighbors}:{id:string;items:RenderIndividual[];year:number;neighbors:Neighborhood}){
 const focused=useGame(g=>g.focused),sim=useSimState(),stress=habitatStress(sim.year,sim.env);
 const hiddenScale=useMemo(()=>new Vector3(0,0,0),[]);
 const rigs=useRef(new Map<string,RigHandle>());
 const camera=useThree(state=>state.camera);const [distant,setDistant]=useState(()=>byId[id].height*camera.zoom<100);
 useFrame(()=>{const pixels=byId[id].height*camera.zoom;if(distant&&(pixels>130||focused===id))setDistant(false);else if(!distant&&pixels<100&&focused!==id)setDistant(true)});
 const {scene}=useGLTF('/models/'+(distant?'lod/':'')+'org_'+id+'.glb');
 const extent=useMemo(()=>{const size=new Box3().setFromObject(scene).getSize(new Vector3());return Math.max(size.x,size.y,size.z)},[scene]);
 const parts=useMemo(()=>{scene.updateMatrixWorld(true);const parts:{mesh:Mesh;joint:Matrix4;relative:Matrix4;name:string}[]=[];scene.traverse(o=>{if(o instanceof Mesh){let owner:Object3D=o;while(owner.parent&&owner.parent.name!=='Root'&&owner.parent!==scene)owner=owner.parent;parts.push({mesh:o,joint:owner.matrixWorld.clone(),relative:owner.matrixWorld.clone().invert().multiply(o.matrixWorld),name:owner.name})}});if(distant&&parts.length){const copies=parts.map(p=>{const g=p.mesh.geometry.clone();g.applyMatrix4(p.mesh.matrixWorld);for(const key of Object.keys(g.attributes))if(!['position','normal','color'].includes(key))g.deleteAttribute(key);return g});const merged=mergeGeometries(copies);copies.forEach(g=>g.dispose());if(merged){const mesh=new Mesh(merged,new MeshLambertMaterial({vertexColors:true}));mesh.userData.mergedDistant=true;return [{mesh,joint:new Matrix4(),relative:new Matrix4(),name:'Body'}]}}return parts},[scene,distant]);
 useEffect(()=>()=>{parts.forEach(p=>{if(p.mesh.userData.mergedDistant){p.mesh.geometry.dispose();(p.mesh.material as MeshLambertMaterial).dispose()}})},[parts,distant]);
 const fur=useRef<InstancedMesh>(null),furNormal=useMemo(()=>new Vector3(),[]),up=useMemo(()=>new Vector3(0,1,0),[]);
 const contact=useRef<InstancedMesh>(null),contactTransform=useMemo(()=>new Object3D(),[]),shadow=useMemo(()=>{const c=document.createElement('canvas');c.width=c.height=32;const ctx=c.getContext('2d')!,g=ctx.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'rgba(25,45,30,.3)');g.addColorStop(1,'rgba(25,45,30,0)');ctx.fillStyle=g;ctx.fillRect(0,0,32,32);return new CanvasTexture(c)},[]);useEffect(()=>()=>shadow.dispose(),[shadow]);
 const phases=useMemo(()=>new Map(items.map(item=>[item.key,Array.from(item.key).reduce((hash,c)=>(Math.imul(hash,31)+c.charCodeAt(0))>>>0,2166136261)%6283/1000])),[items]);
 useEffect(()=>()=>{for(const item of items)wildlife.delete(item.key)},[items]);
 const motions=useRef(new Map<string,AnimalMotion>());

 const refs=useRef<(InstancedMesh|null)[]>([]),births=useRef(new Map<string,number>()),dummy=useMemo(()=>new Object3D(),[]),motion=useMemo(()=>new Object3D(),[]),matrix=useMemo(()=>new Matrix4(),[]),s=byId[id];
 useEffect(()=>{const live=new Set(items.map(v=>v.key));for(const map of [motions.current,births.current])for(const key of map.keys())if(!live.has(key))map.delete(key)},[items]);
 useEffect(()=>{refs.current.forEach(mesh=>{if(!mesh)return;items.forEach((v,i)=>mesh.setColorAt(i,new Color(v.fossil?'#aaa79c':focused===id?'#fff3b0':'#ffffff').lerp(new Color('#b6aa8d'),stress*.55)));if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true})},[items,parts,focused,id,stress]);
 const elapsed=useRef(0);
 useFrame(({clock},dt)=>{elapsed.current+=dt;if(distant&&elapsed.current<1/30)return;dt=elapsed.current;elapsed.current=0;const t=clock.elapsedTime;items.forEach((item,i)=>{if(!births.current.has(item.key))births.current.set(item.key,t);const age=t-births.current.get(item.key)!,u=Math.min(1,age/.35),scale=Math.max(.01,1+2.70158*(u-1)**3+1.70158*(u-1)**2);const phase=phases.get(item.key)??0;
 let state=motions.current.get(item.key)??{x:item.x,z:item.z,heading:0,mode:'idle' as const};
 if(isMobileSpecies(id,s.diet)&&!item.fossil)state=steerAnimal(state,{key:item.key,id,zone:s.zone,diet:s.diet,eats:s.eats,flying:flyingSpecies.has(id),anchorX:item.x,anchorZ:item.z,phase,time:t,dt,neighbors:neighbors.nearby(state.x,state.z),nearWater:s.zone==='land'&&(t+phase*7)%28>21&&(t+phase*7)%28<25&&[[.7,0],[-.7,0],[0,.7],[0,-.7]].some(([dx,dz])=>waterHabitatAt(state.x+dx,state.z+dz,year)==='freshwater'),valid:(x,z)=>Math.hypot(x-item.x,z-item.z)<1.1&&(item.authored||s.zone!=='land'||islandDistance(x,z,year)<-2.5)&&(flyingSpecies.has(id)||navigable(x,z,s.zone,year))&&neighbors.nearby(x,z).every(n=>n.key===item.key||byId[n.id].diet==='producer'||Math.hypot(x-n.x,z-n.z)>=bodyRadius(id)+bodyRadius(n.id)+.12)});
 motions.current.set(item.key,state);neighbors.update(item.key,state.x,state.z);const {x,z,heading}=state,resting=['idle','rest','forage','drink'].includes(state.mode),flying=flyingSpecies.has(id);
 const y=['trilobite','vauxia','cloudina','platystrophia','eucalyptocrinites','eurypterus'].includes(id)?terrainHeight(x,z,year)+.08:s.zone==='freshwater'?(['knightia','diplomystus'].includes(id)?terrainHeight(x,z,year)-s.height*.45:terrainHeight(x,z,year)+.015):s.zone==='sea'&&s.diet!=='producer'?Math.max(terrainHeight(x,z,year)+.08,-.1-Math.min(.3,s.height*.45)):terrainHeight(x,z,year);
 dummy.position.set(x,y+(flying?(id==='honeybee'?.65:1.5)+Math.sin(t*3+phase)*.12:0)+(1-u)**2*3,z);dummy.rotation.set(0,heading,0);dummy.scale.setScalar(scale*(id==='vauxia'?2.2:1)*(!item.authored&&['conifer','oak','metasequoia','archaeopteris','lycophyte'].includes(id)?.65:1)*(item.exitAt?Math.max(.001,1-(Date.now()-item.exitAt)/600):1));dummy.updateMatrix();if(!item.fossil&&!item.exitAt)wildlife.set(item.key,{id,x,y:dummy.position.y+s.height*.5,focusY:dummy.position.y+s.height*.5-(1-u)**2*3,extent,z});contactTransform.position.set(x,y+.025,z);contactTransform.rotation.set(-Math.PI/2,0,0);contactTransform.scale.set(s.height*.8,s.height*.8,1);contactTransform.updateMatrix();contact.current?.setMatrixAt(i,contactTransform.matrix);
 if(fur.current){for(let j=0;j<24;j++){const trait=phenotype(item.allele??1),placement=furPlacement(j);motion.position.set(...placement.position);motion.quaternion.setFromUnitVectors(up,furNormal.set(...placement.normal).normalize());motion.scale.set(.032,j<trait.tufts?trait.furLength*.4:.001,.032);motion.updateMatrix();matrix.copy(dummy.matrix).multiply(motion.matrix);fur.current.setMatrixAt(i*24+j,matrix)}}
 rigs.current.get(item.key)?.update(dummy.matrix,item.fossil?'death':state.mode,state.speed??0,dt);
 parts.forEach((part,p)=>{motion.position.set(0,0,0);motion.rotation.set(0,0,0);motion.scale.set(1,1,1);if(!item.fossil){if(part.name==='Body'&&!resting&&s.zone==='land'&&!flying)motion.rotation.z=Math.sin(t*5+phase)*.06;if(part.name==='Body'){motion.scale.y=1+Math.sin(t*2.3+phase)*.015;if(item.allele!==undefined){const coat=phenotype(item.allele).insulation;motion.scale.x=motion.scale.z=1+coat*.18;motion.scale.y*=1+coat*.1}}if(part.name.startsWith('Eye_'))motion.scale.y=(t+phase)%3.7<.12?.1:1;if(part.name==='Head'&&resting)motion.rotation.x=.22+Math.sin(t*1.2+phase)*.06;if(part.name.startsWith('Leg_')&&!resting)motion.rotation.x=Math.sin(t*4*Math.max(.2,(state.speed??.55)/.55)+phase+(part.name.endsWith('L')?0:Math.PI))*.3;if(part.name.startsWith('Wing_')&&flying)motion.rotation.z=Math.sin(t*(id==='honeybee'?35:4)+phase)*.7;if(/^(Tail|Fin_|Wing_)/.test(part.name))motion.rotation.y=Math.sin(t*3+phase)*.2;if(part.name==='Foliage')motion.rotation.z=Math.sin(t*1.7+item.x+item.z)*.04}motion.updateMatrix();matrix.copy(dummy.matrix).multiply(part.joint).multiply(motion.matrix).multiply(part.relative);if(rigs.current.has(item.key))matrix.scale(hiddenScale);refs.current[p]?.setMatrixAt(i,matrix)});
 });if(fur.current)fur.current.instanceMatrix.needsUpdate=true;if(contact.current)contact.current.instanceMatrix.needsUpdate=true;refs.current.forEach(mesh=>{if(mesh)instancesMoved(mesh)});
 });
 return <group>{!distant&&focused===id&&!['producer','decomposer'].includes(s.diet)&&!['elkhorncoral','charnia','vauxia','cloudina','platystrophia','eucalyptocrinites'].includes(id)&&items.slice(0,4).map(item=><Suspense key={item.key} fallback={null}><RiggedOrganism id={id} allele={item.allele} register={handle=>{if(handle)rigs.current.set(item.key,handle);else rigs.current.delete(item.key)}}/></Suspense>)}{id==='rabbit'&&items.some(v=>v.allele!==undefined)&&<instancedMesh ref={fur} args={[undefined,undefined,items.length*24]} frustumCulled={false}><sphereGeometry args={[1,6,4]}/><meshStandardMaterial color="#c1a58a" roughness={.95}/></instancedMesh>}{s.zone!=='sea'&&<instancedMesh ref={contact} args={[undefined,undefined,items.length]} frustumCulled={false}><planeGeometry args={[1,1]}/><meshBasicMaterial map={shadow} transparent depthWrite={false} polygonOffset polygonOffsetFactor={-1}/></instancedMesh>}{parts.map((part,i)=><instancedMesh key={part.mesh.uuid} ref={m=>{refs.current[i]=m}} args={[part.mesh.geometry,part.mesh.material,items.length]} frustumCulled={false} receiveShadow onClick={e=>{if(!useGame.getState().selectedSpeciesId){e.stopPropagation();useGame.getState().focus(id)}}}/>)}</group>
}
