import {it,expect} from 'vitest';
import {futureState} from '../state';
import {conservationActions} from '../sim/futures';
import {habitatStress,vegetationFraction} from './conservationVisuals';
it('shows stronger degradation for actual baseline habitat and preserves extinct vegetation',()=>{const a=futureState(2100,'North America',[]),b=futureState(2100,'North America',conservationActions);expect(habitatStress(2100,a.env)-habitatStress(2100,b.env)).toBeGreaterThan(.7);expect(vegetationFraction(24,24,b.env.habitat)).toBeGreaterThan(vegetationFraction(24,24,a.env.habitat)*2);expect(vegetationFraction(0,24,1)).toBe(0);expect(vegetationFraction(1000,24,1)).toBe(1)});
