import type {InstancedMesh} from 'three';
/** Let the next raycast calculate bounds for the current animated transforms. */
export function instancesMoved(mesh:InstancedMesh){mesh.instanceMatrix.needsUpdate=true;mesh.boundingSphere=null;mesh.boundingBox=null}
