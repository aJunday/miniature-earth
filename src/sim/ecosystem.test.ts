import {expect,it} from 'vitest';
import {foodWeb} from './ecosystem';
import {byId,createWorld} from './simulation';
import {ecologicalPressures} from './pressures';
import {yearToTick} from './timeline';
it('competing predators cannot consume or claim more prey than exists',()=>{const a={...byId.redfox,id:'a',need:1},b={...a,id:'b'};const result=foodWeb([a,b],{a:10,b:10,rabbit:4});expect(result.loss.rabbit).toBe(4);expect(result.phi.a).toBe(.2);expect(result.phi.b).toBe(.2)});
it('ecological explanations identify actual oxygen, heat and resource stress',()=>{const w=createWorld();const early=w.getStateAt(yearToTick(-3e9));expect(ecologicalPressures('deer',early)).toContain('Very low oxygen');const crisis=w.getStateAt(yearToTick(-252e6)+1);expect(ecologicalPressures('deer',crisis)).toContain('Mass-extinction environmental disruption')});
