import fs from 'node:fs';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {AnimationMixer,Box3,Vector3} from 'three';
const report=[];
for(const name of fs.readdirSync('public/models/rigged').filter(n=>n.endsWith('.glb'))){
 const data=fs.readFileSync('public/models/rigged/'+name);const asset=await new GLTFLoader().parseAsync(data.buffer.slice(data.byteOffset,data.byteOffset+data.byteLength),'');
 const meshes=[];asset.scene.traverse(o=>{if(o.isSkinnedMesh)meshes.push(o)});if(!meshes.length)throw Error(name+' has no skin');
 for(const mesh of meshes){const weights=mesh.geometry.attributes.skinWeight;for(let i=0;i<weights.count;i++){const sum=weights.getX(i)+weights.getY(i)+weights.getZ(i)+weights.getW(i);if(Math.abs(sum-1)>.001)throw Error(name+' bad weights')}}
 const clips=asset.animations.map(c=>c.name);for(const name of ['Idle','Walk','Run','Forage','Rest','Swim','Fly','Birth','Death'])if(!clips.includes(name))throw Error('missing '+name);
 const mixer=new AnimationMixer(asset.scene);const samples=[];for(const name of ['Idle','Walk','Swim','Fly']){mixer.stopAllAction();mixer.clipAction(asset.animations.find(c=>c.name===name)).play();mixer.update(.3);asset.scene.updateMatrixWorld(true);const b=new Box3().setFromObject(asset.scene,true),v=b.getSize(new Vector3());if(![v.x,v.y,v.z].every(Number.isFinite))throw Error('nonfinite deformed bounds');samples.push({clip:name,bounds:v.toArray()})}
 report.push({id:name,skinMeshes:meshes.length,clips,samples});
}
fs.writeFileSync('qa/rig-validation.json',JSON.stringify(report,null,2));console.log('PASS',report.length,'rigged assets, normalized weights, nine clips, deformed bounds');
