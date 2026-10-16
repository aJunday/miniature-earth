import {useEffect,useMemo,useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {BufferGeometry,Float32BufferAttribute,InstancedMesh,MeshLambertMaterial,Object3D,Color,DoubleSide} from 'three';
import {marineMeadowLayout} from '../world/reef';
import type {EraProfile} from '../world';
/** Five curved ribbons per tuft, shared by the entire meadow. */
function tuftGeometry(){
 const positions:number[]=[],colors:number[]=[],indices:number[]=[];
 for(let blade=0;blade<5;blade++){
  const angle=blade*2.4,base=positions.length/3;
  for(let row=0;row<=3;row++){const t=row/3,w=.075*(1-t)+.006;
   for(const side of [-1,1]){const spread=t*t*.24;positions.push(Math.cos(angle)*spread+Math.sin(angle)*w*side,t,Math.sin(angle)*spread-Math.cos(angle)*w*side);const c=new Color('#307957').lerp(new Color('#a2cb73'),t);colors.push(c.r,c.g,c.b)}
   if(row<3){const a=base+row*2;indices.push(a,a+2,a+1,a+1,a+2,a+3)}
  }
 }
 const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(positions,3));g.setAttribute('color',new Float32BufferAttribute(colors,3));g.setIndex(indices);g.computeVertexNormals();return g;
}
export function MarineMeadow({era}:{era:EraProfile}){
 const ref=useRef<InstancedMesh>(null),items=useMemo(()=>marineMeadowLayout(era),[era]),geometry=useMemo(tuftGeometry,[]),time=useMemo(()=>({value:0}),[]);
 const material=useMemo(()=>{const m=new MeshLambertMaterial({vertexColors:true,side:DoubleSide});m.onBeforeCompile=shader=>{shader.uniforms.meadowTime=time;shader.vertexShader='uniform float meadowTime;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed.x+=sin(meadowTime*.8+instanceMatrix[3].x*.6+instanceMatrix[3].z*.4)*.16*position.y*position.y;')};return m},[time]);
 useFrame(({clock})=>{time.value=clock.elapsedTime});
 useEffect(()=>{if(!ref.current)return;const dummy=new Object3D();items.forEach((v,i)=>{dummy.position.set(v.x,v.y,v.z);dummy.scale.set(1,v.height,1);dummy.rotation.y=v.rotation;dummy.updateMatrix();ref.current!.setMatrixAt(i,dummy.matrix)});ref.current.instanceMatrix.needsUpdate=true;ref.current.computeBoundingSphere()},[items]);
 useEffect(()=>()=>{geometry.dispose();material.dispose()},[geometry,material]);
 return items.length?<instancedMesh name="Modern seagrass meadow" ref={ref} args={[geometry,material,items.length]}/>:null;
}
