import type {Neighbor} from './behavior';
/** Mutable spatial index for visual steering, independent of ecological simulation.
 * Preserve insertion order so tied predators and flock sums remain deterministic. */
export class Neighborhood {
 private cells=new Map<string,Set<Neighbor>>();
 private keyed=new Map<string,Neighbor>();
 private order=new Map<Neighbor,number>();
 private cell(x:number,z:number){return `${Math.floor(x/3.2)},${Math.floor(z/3.2)}`}
 constructor(neighbors:Neighbor[]){neighbors.forEach((n,i)=>{this.order.set(n,i);if(n.key)this.keyed.set(n.key,n);this.insert(n)})}
 private insert(n:Neighbor){const key=this.cell(n.x,n.z);let bucket=this.cells.get(key);if(!bucket)this.cells.set(key,bucket=new Set());bucket.add(n)}
 nearby(x:number,z:number){const result:Neighbor[]=[];for(let a=Math.floor((x-3.2)/3.2);a<=Math.floor((x+3.2)/3.2);a++)for(let b=Math.floor((z-3.2)/3.2);b<=Math.floor((z+3.2)/3.2);b++)for(const n of this.cells.get(`${a},${b}`)??[])if((n.x-x)**2+(n.z-z)**2<=3.2**2)result.push(n);return result.sort((a,b)=>this.order.get(a)!-this.order.get(b)!)}
 update(key:string,x:number,z:number){const n=this.keyed.get(key);if(!n)return;const old=this.cell(n.x,n.z),next=this.cell(x,z);if(old!==next){const bucket=this.cells.get(old);bucket?.delete(n);if(!bucket?.size)this.cells.delete(old)}n.x=x;n.z=z;if(old!==next)this.insert(n)}
}
