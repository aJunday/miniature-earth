import {it,expect} from 'vitest';
import {steerAnimal,type AnimalMotion} from './behavior';
const base={id:'rabbit',zone:'land',diet:'herbivore',eats:['grass'],flying:false,anchorX:0,anchorZ:0,phase:0,time:5,dt:.1,neighbors:[],valid:(x:number,z:number)=>Math.hypot(x,z)<2};
const start:AnimalMotion={x:0,z:0,heading:0,mode:'idle'};
it('steering stays in its habitat with bounded speed and reproducible group paths',()=>{let a=start,b=start;for(let i=0;i<1000;i++){const input={...base,time:i*.1};const next=steerAnimal(a,input);expect(Math.hypot(next.x,next.z)).toBeLessThan(2);expect(Math.hypot(next.x-a.x,next.z-a.z)).toBeLessThanOrEqual(.106);a=next;b=steerAnimal(b,input)}expect(a).toEqual(b)});
it('prey flee, predators approach food, and resting stops movement',()=>{
 const predator={id:'redfox',diet:'carnivore',eats:['rabbit'],x:1,z:0};
 const fleeing=steerAnimal(start,{...base,neighbors:[predator]});expect(fleeing.mode).toBe('flee');expect(fleeing.x).toBeLessThan(0);
 const hunting=steerAnimal(start,{...base,id:'redfox',diet:'carnivore',eats:['rabbit'],neighbors:[{...predator,id:'rabbit',x:1,eats:[]}]});expect(hunting.mode).toBe('pursue');expect(hunting.x).toBeGreaterThan(0);
 expect(steerAnimal(start,{...base,time:27})).toEqual({...start,mode:'rest'});
});
it('swimming and flying retain their distinct states and cannot leave valid habitat',()=>{expect(steerAnimal(start,{...base,zone:'sea'}).mode).toBe('swim');expect(steerAnimal(start,{...base,flying:true}).mode).toBe('fly');expect(steerAnimal(start,{...base,valid:()=>false})).toEqual(start)});
