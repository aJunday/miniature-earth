import {useEffect,useMemo,useRef} from 'react';
import {useGLTF} from '@react-three/drei';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import {AnimationMixer,LoopOnce,Matrix4,SkinnedMesh,type AnimationAction,type AnimationClip,type Object3D} from 'three';
import {phenotype,type Allele} from '../sim/evolution';
import {useGame} from '../state';
export interface RigHandle {update:(matrix:Matrix4,mode:string,speed:number,dt:number)=>void}
export function RiggedOrganism({id,allele,register}:{id:string;allele:Allele|undefined;register:(handle:RigHandle|null)=>void}){
 const asset=useGLTF(`/models/rigged/org_${id}.glb`);
 const mountedRig=useRef<ReturnType<typeof createRig>|null>(null);
 const rig=useMemo(()=>createRig(asset.scene,asset.animations,allele),[asset,id,allele]);
 useEffect(()=>{mountedRig.current=rig;register(rig);return()=>{register(null);mountedRig.current=null;rig.mixer.stopAllAction();queueMicrotask(()=>{if(mountedRig.current===rig)return;rig.mixer.uncacheRoot(rig.root);rig.root.traverse(o=>{if(o instanceof SkinnedMesh)o.skeleton.dispose()})})}},[rig]);
 return <primitive object={rig.root} onClick={(e:{stopPropagation:()=>void})=>{if(!useGame.getState().selectedSpeciesId){e.stopPropagation();useGame.getState().focus(id)}}}/>;
}
function createRig(scene:Object3D,animations:AnimationClip[],allele:Allele|undefined){const root=clone(scene),mixer=new AnimationMixer(root),actions:Record<string,AnimationAction>={};
 root.traverse((o:Object3D)=>{if(o instanceof SkinnedMesh){o.frustumCulled=false;const index=o.morphTargetDictionary?.Insulation;if(index!==undefined&&o.morphTargetInfluences)o.morphTargetInfluences[index]=phenotype(allele??1).insulation}});
 for(const clip of animations)actions[clip.name]=mixer.clipAction(clip);
 let current:AnimationAction|undefined;let elapsed=0;
 return {root,mixer,update(matrix:Matrix4,mode:string,speed:number,dt:number){matrix.decompose(root.position,root.quaternion,root.scale);elapsed+=dt;const name=elapsed<.35?'Birth':({walk:'Walk',flee:'Run',pursue:'Run',swim:'Swim',fly:'Fly',forage:'Forage',drink:'Forage',rest:'Rest',death:'Death'} as Record<string,string>)[mode]??'Idle';const next=actions[name]??actions.Idle;if(next&&next!==current){next.reset().play();if(name==='Death'||name==='Birth'){next.setLoop(LoopOnce,1);next.clampWhenFinished=true}if(current)current.crossFadeTo(next,.25,false);current=next}if(current)current.timeScale=['Walk','Run'].includes(name)?Math.max(.2,speed/.55):1;mixer.update(Math.min(dt,.1))}};
}
