import {it,expect} from 'vitest';
import {sceneCoverage} from './coverage';
import {historicalState} from './history';
import {yearToTick} from '../sim/timeline';
import {eligibility,historyRecord} from '../sim/eligibility';
it('focuses supported marine, land and freshwater communities without changing region',()=>{
 for(const [year,expected] of [[-500e6,'marine'],[-420e6,'marine'],[-150e6,'terrestrial']] as const){const state=historicalState(yearToTick(year),'North America');expect(sceneCoverage(state,'North America').preferred).toBe(expected)}
 expect(historyRecord('knightia')?.habitat).toBe('freshwater');expect(eligibility('knightia',-52e6,'freshwater','North America').allowed).toBe(true);
});
it('identifies missing game content rather than declaring an empty era lifeless',()=>{const state=historicalState(yearToTick(-120e6),'North America');const c=sceneCoverage(state,'North America');if(!c.eligible.length){expect(c.status).toBe('CONTENT MISSING');expect(c.explanation).toContain('not a lifeless Earth')}});
it('new fossil genera are integrated only inside screened regional windows',()=>{
 for(const [id,year] of [['platystrophia',-450e6],['eurypterus',-420e6],['cooksonia',-420e6],['archaeopteris',-370e6],['dunkleosteus',-370e6],['knightia',-52e6],['metasequoia',-50e6],['mesohippus',-35e6],['merychippus',-20e6],['coelophysis',-220e6],['edmontonia',-75e6]] as const){expect(historicalState(yearToTick(year),'North America').populations[id],id).toBeGreaterThan(0);expect(eligibility(id,2026,undefined,'North America').allowed,id).toBe(false)}
});
