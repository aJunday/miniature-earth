import {expect,it} from 'vitest';
import {Mesh,MeshStandardMaterial,SphereGeometry,Group} from 'three';
import {clonePreviewScene} from './previewMaterials';
it('keeps ungrouped geometry renderable and does not fade shared asset materials',()=>{
 const source=new Group(),material=new MeshStandardMaterial();source.add(new Mesh(new SphereGeometry(),material));
 const {scene,materials}=clonePreviewScene(source),mesh=scene.children[0] as Mesh;
 expect(mesh.geometry.groups).toHaveLength(0);expect(Array.isArray(mesh.material)).toBe(false);
 expect(mesh.material).not.toBe(material);materials[0].opacity=.2;expect(material.opacity).toBe(1);
});
