import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {Mesh} from 'three';
import {useGame} from '../state';
import {byId} from '../sim/simulation';
import {wildlife} from './wildlife';
/** One light marker also makes a selected skinned animal legible. */
export function SelectionRing(){const ref=useRef<Mesh>(null),focused=useGame(s=>s.focused);useFrame(()=>{const ring=ref.current;if(!ring)return;const animal=focused?[...wildlife.values()].find(v=>v.id===focused):undefined;ring.visible=!!animal;if(animal){ring.position.set(animal.x,animal.y-byId[animal.id].height*.45+.04,animal.z);ring.scale.setScalar(Math.max(.3,byId[animal.id].height*.8))}});return <mesh ref={ref} visible={false} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[.9,1,40]}/><meshBasicMaterial color="#fff3a6" transparent opacity={.9} depthWrite={false}/></mesh>}
