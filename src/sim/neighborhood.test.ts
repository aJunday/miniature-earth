import {it,expect} from 'vitest';
import {Neighborhood} from './neighborhood';
import {steerAnimal,type Neighbor,type AnimalMotion} from './behavior';
it('local indexing preserves steering including ties and moving across negative cell boundaries',()=>{
 const neighbors:Neighbor[]=Array.from({length:800},(_,i)=>({key:String(i),id:i%5?'rabbit':'redfox',diet:i%5?'herbivore':'carnivore',eats:i%5?['grass']:['rabbit'],x:(i%40)-20,z:Math.floor(i/40)-10}));
 const index=new Neighborhood(neighbors);let full:AnimalMotion={x:-3.21,z:-.01,heading:0,mode:'idle'},local=full;
 for(let frame=0;frame<200;frame++){const input={key:'subject',id:'rabbit',zone:'land',diet:'herbivore',eats:['grass'],flying:false,anchorX:-3,anchorZ:0,phase:0,time:frame*.1,dt:.1,valid:()=>true};full=steerAnimal(full,{...input,neighbors});local=steerAnimal(local,{...input,neighbors:index.nearby(local.x,local.z)});expect(local).toEqual(full);index.update('0',frame*.1-10,0)}
 expect(index.nearby(0,0).length).toBeLessThan(neighbors.length/10);
});
it('moving neighbors enter and leave query cells without stale or duplicate entries',()=>{const n={key:'a',id:'rabbit',diet:'herbivore',eats:[],x:-10,z:-10},index=new Neighborhood([n]);expect(index.nearby(0,0)).toEqual([]);index.update('a',0,0);expect(index.nearby(0,0)).toEqual([n]);index.update('a',.1,.1);expect(index.nearby(0,0)).toHaveLength(1);index.update('a',20,20);expect(index.nearby(0,0)).toEqual([])});
