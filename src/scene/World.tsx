import {Suspense,type ReactNode} from 'react';
import {Canvas,useThree} from '@react-three/fiber';
import {OrbitControls,OrthographicCamera,Html} from '@react-three/drei';
import {EffectComposer,N8AO,Bloom,Vignette} from '@react-three/postprocessing';
import {ACESFilmicToneMapping,PCFSoftShadowMap} from 'three';
import {Environment} from './Environment';
import {useGame,useSimState} from '../state';
import {eraAt} from '../world';
function Diorama({children}:{children:ReactNode}){const {size}=useThree(),sim=useSimState(),era=eraAt(sim.year),selected=useGame(s=>s.selectedSpeciesId);return <><color attach="background" args={[era.sky]}/><fog attach="fog" args={[era.sky,65,145]}/><OrthographicCamera makeDefault position={[35,32,40]} zoom={Math.min(size.width/43,size.height/35)} near={.1} far={220}/><OrbitControls target={[0,1,0]} enablePan enableRotate={!selected} minPolarAngle={.45} maxPolarAngle={1.18} minZoom={Math.min(size.width/43,size.height/35)*.75} maxZoom={Math.min(size.width/43,size.height/35)*2.5} enableDamping/><hemisphereLight args={['#e7fbff','#59776b',1.65]}/><directionalLight position={[15,28,12]} color="#fff0d2" intensity={3.2} castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-24} shadow-camera-right={24} shadow-camera-top={24} shadow-camera-bottom={-24} shadow-normalBias={.045} shadow-bias={-.0001}/><Environment/>{children}<EffectComposer multisampling={0}><N8AO aoRadius={.6} intensity={1.15} halfRes/><Bloom intensity={.15} luminanceThreshold={1.4} mipmapBlur/><Vignette darkness={.14} offset={.3}/></EffectComposer></>}
export function World({children}:{children?:ReactNode}){return <Canvas shadows={{type:PCFSoftShadowMap}} dpr={1} gl={{antialias:false,toneMapping:ACESFilmicToneMapping,toneMappingExposure:1}}><Suspense fallback={<Html center><div className="panel">Growing a little world…</div></Html>}><Diorama>{children}</Diorama></Suspense></Canvas>}
