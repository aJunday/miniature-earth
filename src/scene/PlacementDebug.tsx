import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {Vector3} from 'three';
import {terrainHeight,waterHabitatAt,landscapeScale} from '../world/terrain';
interface Target {x:number;z:number;screenX:number;screenY:number;habitat:string}
declare global {interface Window {__placementTargets?:Target[]}}
/** Opt-in QA projects candidate surfaces; tests still use genuine pointer input. */
export function PlacementDebug({year}:{year:number}){const last=useRef(0),point=useRef(new Vector3());useFrame(({camera,gl,clock})=>{if(!new URLSearchParams(location.search).has('placementQA')||clock.elapsedTime-last.current<.5)return;last.current=clock.elapsedTime;const bounds=gl.domElement.getBoundingClientRect(),scale=landscapeScale(year),targets:Target[]=[];for(let z=-16;z<=16;z+=1)for(let x=-18;x<=18;x+=1){const wx=x*scale,wz=z*scale;point.current.set(wx,Math.max(.05,terrainHeight(wx,wz,year)),wz).project(camera);const screenX=bounds.left+(point.current.x+1)*bounds.width/2,screenY=bounds.top+(1-point.current.y)*bounds.height/2;if(screenX<12||screenY<12||screenX>innerWidth-12||screenY>innerHeight-12||document.elementFromPoint(screenX,screenY)!==gl.domElement)continue;const habitat=waterHabitatAt(wx,wz,year);if(habitat!=='outside')targets.push({x:wx,z:wz,screenX,screenY,habitat})}window.__placementTargets=targets});return null}
