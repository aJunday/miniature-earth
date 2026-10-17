import {eligibility} from '../sim/eligibility';
import {useGame} from '../state';
import {useEffect,useMemo,useRef} from 'react';
import {Color,CylinderGeometry,IcosahedronGeometry,InstancedMesh,Matrix4,MeshLambertMaterial,Object3D,Quaternion,Vector3,type BufferGeometry} from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {reefLayout,type ReefKind} from '../world/reef';
import type {EraProfile} from '../world/eras';
function colonyGeometry(kind:ReefKind){const pieces:BufferGeometry[]=[];
 const ball=(x:number,y:number,z:number,sx:number,sy:number,sz:number)=>{const g=new IcosahedronGeometry(1,sx<.1?0:1);g.scale(sx,sy,sz);g.translate(x,y,z);pieces.push(g)};
 const branch=(a:number[],b:number[],radius:number)=>{const start=new Vector3(...a),end=new Vector3(...b),delta=end.clone().sub(start);const g=new CylinderGeometry(radius*.65,radius,delta.length(),6,1);g.applyMatrix4(new Matrix4().compose(start.add(end).multiplyScalar(.5),new Quaternion().setFromUnitVectors(new Vector3(0,1,0),delta.normalize()),new Vector3(1,1,1)));pieces.push(g.toNonIndexed());g.dispose()};
 if(kind==='branch'){branch([0,0,0],[0,.6,0],.12);for(let i=0;i<5;i++){const a=i*2.4,x=Math.cos(a),z=Math.sin(a);branch([0,.25,0],[x*.32,.65,z*.32],.085);branch([x*.32,.65,z*.32],[x*.46,1.02+(i%2)*.18,z*.46],.055);ball(x*.46,1.02+(i%2)*.18,z*.46,.065,.075,.065)}}
 if(kind==='plate'){branch([0,0,0],[0,.5,0],.09);for(let i=0;i<3;i++)ball(Math.sin(i*2)*.2,.30+i*.25,Math.cos(i*2)*.16,.48-i*.07,.075,.35-i*.04)}
 if(kind==='mound'){ball(0,.28,0,.50,.33,.43);ball(.18,.51,.06,.26,.20,.24)}
 if(kind==='sponge'){for(let i=0;i<3;i++){const g=new CylinderGeometry(.12,.18,.55+i*.19,9,1,true);g.translate((i-1)*.20,.28+i*.095,Math.sin(i)*.13);pieces.push(g.toNonIndexed());g.dispose()}}
 // All primitive attributes agree after dropping UVs; paint is instanced per colony.
 for(const g of pieces)g.deleteAttribute('uv');const merged=mergeGeometries(pieces);pieces.forEach(g=>g.dispose());return merged;
}
function Colonies({kind,era}:{kind:ReefKind;era:EraProfile}){const ref=useRef<InstancedMesh>(null),geometry=useMemo(()=>colonyGeometry(kind),[kind]);const items=useMemo(()=>reefLayout(era).filter(c=>c.kind===kind),[era,kind]);const material=useMemo(()=>new MeshLambertMaterial(),[]);
 useEffect(()=>{const mesh=ref.current;if(!mesh)return;const dummy=new Object3D();items.forEach((v,i)=>{dummy.position.set(v.x,v.y,v.z);dummy.scale.setScalar(v.scale);dummy.rotation.y=v.rotation;dummy.updateMatrix();mesh.setMatrixAt(i,dummy.matrix);mesh.setColorAt(i,new Color(v.color))});mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;mesh.computeBoundingSphere()},[items]);useEffect(()=>()=>{geometry.dispose();material.dispose()},[geometry,material]);
 return items.length?<instancedMesh ref={ref} args={[geometry,material,items.length]} receiveShadow onClick={e=>{if(!useGame.getState().selectedSpeciesId){e.stopPropagation();useGame.getState().focus(era.snap>=2026?'elkhorncoral':'stromatolite')}}}/>:null;
}
export function Reef({era,year}:{era:EraProfile;year:number}){const modern=eligibility('elkhorncoral',year).allowed,microbial=eligibility('stromatolite',year).allowed;if(!modern&&!microbial)return null;return <group name="Era reef garden">{(modern?(['branch','plate','sponge','mound'] as const):(['mound'] as const)).map(kind=><Colonies key={kind} kind={kind} era={era}/>)}</group>}
