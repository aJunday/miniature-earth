import {Placeholder} from './OrganismPlaceholder';
import {tickToYear} from '../sim/timeline';
import {useGLTF,Html} from '@react-three/drei';
import {useFrame} from '@react-three/fiber';
import {Component,Suspense,type ReactNode,useEffect,useMemo,useRef,useState} from 'react';
import {Group} from 'three';
import {clonePreviewScene} from './previewMaterials';
import {useGame} from '../state';
import {terrainHeight} from '../world';
import {previewOpacity} from '../sim/eligibility';
import {byId} from '../sim/simulation';
function Model({id,time}:{id:string;time:number}){
 const gltf=useGLTF('/models/org_'+id+'.glb');const ref=useRef<Group>(null);
 const {scene,materials}=useMemo(()=>clonePreviewScene(gltf.scene),[gltf]);
 useEffect(()=>()=>materials.forEach(m=>m.dispose()),[materials]);
 useFrame(()=>{const age=Date.now()-time;materials.forEach(m=>{m.opacity=previewOpacity(age)});if(ref.current){ref.current.visible=age<8000;ref.current.scale.setScalar(Math.min(1,Math.max(.01,age/350)));ref.current.rotation.y=Math.sin(age/900)*.08}});
 return <group ref={ref}><primitive object={scene}/></group>;
}
class PreviewBoundary extends Component<{children:ReactNode;id:string},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return {failed:true}}render(){return this.state.failed?<Placeholder id={this.props.id} opacity={.55}/>:this.props.children}}
export function IntroductionPreview(){const r=useGame(s=>s.rejection),tick=useGame(s=>s.tick);const ref=useRef<Group>(null);const [alive,setAlive]=useState(false);useEffect(()=>{setAlive(!!r);if(!r)return;const timer=setTimeout(()=>setAlive(false),Math.max(0,8000-(Date.now()-r.time)));return()=>clearTimeout(timer)},[r]);
 useFrame(()=>{if(ref.current&&r)ref.current.visible=Date.now()-r.time<8000});
 if(!r||!alive)return null;
 return <group ref={ref} key={r.time} position={[r.x,byId[r.id].zone==='land'?Math.max(.1,terrainHeight(r.x,r.z,tickToYear(tick))):terrainHeight(r.x,r.z,tickToYear(tick))+.08,r.z]} userData={{invalidIntroduction:true,tick}}><mesh rotation={[-Math.PI/2,0,0]} position={[0,.04,0]}><ringGeometry args={[.8,1,32]}/><meshBasicMaterial color="#e4aa61" transparent opacity={.65}/></mesh><PreviewBoundary key={r.time} id={r.id}><Suspense fallback={<Placeholder id={r.id} opacity={.55}/>}><Model id={r.id} time={r.time}/></Suspense></PreviewBoundary><Html position={[0,byId[r.id].height+.4,0]} center style={{pointerEvents:'none',whiteSpace:'nowrap',background:'#fff4df',padding:'4px 8px',borderRadius:8,color:'#8b401f',fontSize:12}}>Temporary preview · invalid introduction</Html></group>
}
