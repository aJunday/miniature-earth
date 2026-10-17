import {useGLTF,Html} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {Suspense,useEffect,useMemo,useRef,useState} from 'react';
import {Group,Mesh,type Material} from 'three';
import {useGame} from '../state';
import {terrainHeight} from '../world';
import {previewOpacity} from '../sim/eligibility';
import {byId} from '../sim/simulation';
function Model({id,time}:{id:string;time:number}){
 const gltf=useGLTF('/models/org_'+id+'.glb');const ref=useRef<Group>(null);
 const {scene,materials}=useMemo(()=>{const scene=gltf.scene.clone(true),materials:Material[]=[];scene.traverse(o=>{if(o instanceof Mesh){o.material=(Array.isArray(o.material)?o.material:[o.material]).map(m=>{const c=m.clone();c.transparent=true;c.depthWrite=false;materials.push(c);return c});}});return {scene,materials}},[gltf]);
 useEffect(()=>()=>materials.forEach(m=>m.dispose()),[materials]);
 useFrame(()=>{const age=Date.now()-time;materials.forEach(m=>{m.opacity=previewOpacity(age)});if(ref.current){ref.current.visible=age<8000;ref.current.scale.setScalar(Math.min(1,Math.max(.01,age/350)));ref.current.rotation.y=Math.sin(age/900)*.08}});
 return <group ref={ref}><primitive object={scene}/></group>;
}
export function IntroductionPreview(){const r=useGame(s=>s.rejection),tick=useGame(s=>s.tick);const ref=useRef<Group>(null);const [alive,setAlive]=useState(false);useEffect(()=>{setAlive(!!r);if(!r)return;const timer=setTimeout(()=>setAlive(false),Math.max(0,8000-(Date.now()-r.time)));return()=>clearTimeout(timer)},[r]);
 useFrame(()=>{if(ref.current&&r)ref.current.visible=Date.now()-r.time<8000});
 if(!r||!alive)return null;
 return <group ref={ref} key={r.time} position={[r.x,Math.max(.1,terrainHeight(r.x,r.z)),r.z]} userData={{invalidIntroduction:true,tick}}><Suspense fallback={null}><Model id={r.id} time={r.time}/></Suspense><Html position={[0,byId[r.id].height+.4,0]} center style={{pointerEvents:'none',whiteSpace:'nowrap',background:'#fff4df',padding:'4px 8px',borderRadius:8,color:'#8b401f',fontSize:12}}>Temporary preview · invalid introduction</Html></group>
}
