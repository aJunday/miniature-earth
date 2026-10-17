import {it,expect} from 'vitest';
import {BoxGeometry,InstancedMesh,MeshBasicMaterial,Matrix4,Raycaster,Vector3} from 'three';
import {instancesMoved} from './instancePicking';
it('can pick an animated animal after it leaves its cached bounding sphere',()=>{
 const mesh=new InstancedMesh(new BoxGeometry(),new MeshBasicMaterial(),1),ray=new Raycaster(new Vector3(0,0,5),new Vector3(0,0,-1));
 mesh.setMatrixAt(0,new Matrix4());mesh.updateMatrixWorld();expect(ray.intersectObject(mesh).length).toBeGreaterThan(0);
 mesh.setMatrixAt(0,new Matrix4().makeTranslation(20,0,0));ray.set(new Vector3(20,0,5),new Vector3(0,0,-1));expect(ray.intersectObject(mesh)).toHaveLength(0);
 instancesMoved(mesh);expect(ray.intersectObject(mesh).length).toBeGreaterThan(0);
});
