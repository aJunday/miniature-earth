import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {useMemo,useRef,useEffect,useState} from 'react';
import {useFrame,useThree} from '@react-three/fiber';
import {useGLTF} from '@react-three/drei';
import {CanvasTexture,Color,InstancedMesh,Matrix4,Mesh,Object3D} from 'three';
import {byId} from '../sim/simulation';
import {terrainHeight} from '../world';
import {inZone} from '../state/positions';
import {useGame} from '../state';
export interface RenderIndividual {key:string;x:number;z:number;fossil:boolean}
/** One draw per source primitive, irrespective of the number of animals. */
export function BatchedOrganisms({id,items,year}:{id:string;items:RenderIndividual[];year:number}){
 const camera=useThree(state=>state.camera);const [distant,setDistant]=useState(()=>byId[id].height*camera.zoom<44);
 useFrame(()=>{const pixels=byId[id].height*camera.zoom;if(distant&&pixels>52)setDistant(false);else if(!distant&&pixels<40)setDistant(true)});
 const {scene}=useGLTF('/models/'+(distant?'lod/':'')+'org_'+id+'.glb');
 const parts=useMemo(()=>{scene.updateMatrixWorld(true);const parts:{mesh:Mesh;joint:Matrix4;relative:Matrix4;name:string}[]=[];scene.traverse(o=>{if(o instanceof Mesh){let owner:Object3D=o;while(owner.parent&&owner.parent.name!=='Root'&&owner.parent!==scene)owner=owner.parent;parts.push({mesh:o,joint:owner.matrixWorld.clone(),relative:owner.matrixWorld.clone().invert().multiply(o.matrixWorld),name:owner.name})}});if(distant&&parts.length){const copies=parts.map(p=>{const g=p.mesh.geometry.clone();g.applyMatrix4(p.mesh.matrixWorld);for(const key of Object.keys(g.attributes))if(!['position','normal','color'].includes(key))g.deleteAttribute(key);return g});const merged=mergeGeometries(copies);copies.forEach(g=>g.dispose());if(merged){const mesh=new Mesh(merged,parts[0].mesh.material);mesh.userData.mergedDistant=true;return [{mesh,joint:new Matrix4(),relative:new Matrix4(),name:'Body'}]}}return parts},[scene,distant]);
 useEffect(()=>()=>{parts.forEach(p=>{if(p.mesh.userData.mergedDistant)p.mesh.geometry.dispose()})},[parts,distant]);
 const contact=useRef<InstancedMesh>(null),contactTransform=useMemo(()=>new Object3D(),[]),shadow=useMemo(()=>{const c=document.createElement('canvas');c.width=c.height=32;const ctx=c.getContext('2d')!,g=ctx.createRadialGradient(16,16,0,16,16,16);g.addColorStop(0,'rgba(25,45,30,.3)');g.addColorStop(1,'rgba(25,45,30,0)');ctx.fillStyle=g;ctx.fillRect(0,0,32,32);return new CanvasTexture(c)},[]);useEffect(()=>()=>shadow.dispose(),[shadow]);
 const refs=useRef<(InstancedMesh|null)[]>([]),births=useRef(new Map<string,number>()),dummy=useMemo(()=>new Object3D(),[]),motion=useMemo(()=>new Object3D(),[]),matrix=useMemo(()=>new Matrix4(),[]),s=byId[id];
 useEffect(()=>{refs.current.forEach(mesh=>{if(!mesh)return;items.forEach((v,i)=>mesh.setColorAt(i,new Color(v.fossil?'#aaa79c':'#ffffff')));if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true})},[items,parts]);
 useFrame(({clock})=>{const t=clock.elapsedTime;items.forEach((item,i)=>{if(!births.current.has(item.key))births.current.set(item.key,t);const age=t-births.current.get(item.key)!,u=Math.min(1,age/.35),scale=Math.max(.01,1+2.70158*(u-1)**3+1.70158*(u-1)**2);const phase=i*1.713,resting=s.zone==='land'&&id!=='honeybee'&&Math.sin(t*.16+phase)>.35;
 let x=item.x,z=item.z,heading=0;
 if(s.diet!=='producer'&&!item.fossil){const stride=id==='honeybee'?1:1-Math.max(0,Math.min(1,(Math.sin(t*.16+phase)-.15)*3)),wx=x+Math.sin(t*.4+phase)*.65*stride,wz=z+Math.cos(t*.4+phase)*.65*stride;if(inZone(wx,wz,s.zone,year)){x=wx;z=wz;heading=Math.atan2(Math.cos(t*.4+phase),-Math.sin(t*.4+phase))}}
 const y=s.zone==='sea'?-.1-Math.min(.3,s.height*.45):terrainHeight(x,z,year);
 dummy.position.set(x,y+(id==='honeybee'?.65+Math.sin(t*3+phase)*.12:0)+(1-u)**2*3,z);dummy.rotation.set(0,heading,0);dummy.scale.setScalar(scale);dummy.updateMatrix();contactTransform.position.set(x,y+.025,z);contactTransform.rotation.set(-Math.PI/2,0,0);contactTransform.scale.set(s.height*.8,s.height*.8,1);contactTransform.updateMatrix();contact.current?.setMatrixAt(i,contactTransform.matrix);
 parts.forEach((part,p)=>{motion.position.set(0,0,0);motion.rotation.set(0,0,0);motion.scale.set(1,1,1);if(!item.fossil){if(part.name==='Body')motion.scale.y=1+Math.sin(t*2.3+phase)*.015;if(part.name.startsWith('Eye_'))motion.scale.y=(t+phase)%3.7<.12?.1:1;if(part.name==='Head'&&resting)motion.rotation.x=.22+Math.sin(t*1.2+phase)*.06;if(part.name.startsWith('Leg_')&&!resting)motion.rotation.x=Math.sin(t*4+phase+(part.name.endsWith('L')?0:Math.PI))*.3;if(part.name.startsWith('Wing_')&&id==='honeybee')motion.rotation.z=Math.sin(t*35)*.7;if(/^(Tail|Fin_|Wing_)/.test(part.name))motion.rotation.y=Math.sin(t*3+phase)*.2;if(part.name==='Foliage')motion.rotation.z=Math.sin(t*1.7+item.x+item.z)*.04}motion.updateMatrix();matrix.copy(dummy.matrix).multiply(part.joint).multiply(motion.matrix).multiply(part.relative);refs.current[p]?.setMatrixAt(i,matrix)});
 });if(contact.current)contact.current.instanceMatrix.needsUpdate=true;refs.current.forEach(mesh=>{if(mesh)mesh.instanceMatrix.needsUpdate=true});
 });
 return <group>{s.zone!=='sea'&&<instancedMesh ref={contact} args={[undefined,undefined,items.length]} frustumCulled={false}><planeGeometry args={[1,1]}/><meshBasicMaterial map={shadow} transparent depthWrite={false} polygonOffset polygonOffsetFactor={-1}/></instancedMesh>}{parts.map((part,i)=><instancedMesh key={part.mesh.uuid} ref={m=>{refs.current[i]=m}} args={[part.mesh.geometry,part.mesh.material,items.length]} frustumCulled={false} receiveShadow onClick={e=>{if(!useGame.getState().selectedSpeciesId){e.stopPropagation();useGame.getState().focus(id)}}}/>)}</group>
}
