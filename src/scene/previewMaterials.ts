import {Mesh,type Material,type Object3D} from 'three';
/** Preserve single-material geometry semantics: material arrays require groups. */
export function clonePreviewScene(source:Object3D){
 const scene=source.clone(true),materials:Material[]=[];
 const clone=(material:Material)=>{const copy=material.clone();copy.transparent=true;copy.depthWrite=false;materials.push(copy);return copy};
 scene.traverse(object=>{if(object instanceof Mesh)object.material=Array.isArray(object.material)?object.material.map(clone):clone(object.material)});
 return {scene,materials};
}
