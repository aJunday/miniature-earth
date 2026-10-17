import {afterEach,expect,it,vi} from 'vitest';
import {renderHook,act} from '@testing-library/react';
import {useDemo,demoSteps} from './demo';
import {useGame} from '../state';
import {createWorld} from '../sim/simulation';
afterEach(()=>{useGame.setState({demo:false});vi.useRealTimers()});
it('demo ends at 2060 with both scenarios and a surviving experimental fern population',()=>{for(const step of demoSteps)step.run();const g=useGame.getState();expect(g.tick).toBe(4000);expect(g.scenario).toBe('Exploit');expect(g.demo).toBe(false);const w=createWorld(g.seed);w.setPlacements(g.placements);expect(w.getStateAt(4000,'Protect').populations.fern).toBeGreaterThan(0);expect(g.placements.some(p=>p.speciesId==='seaturtle'&&p.x===19&&p.z===11)).toBe(true)});
it('any pointer interaction cancels remaining demo timers',()=>{vi.useFakeTimers();useGame.setState({demo:true});const hook=renderHook(()=>useDemo());act(()=>vi.advanceTimersByTime(0));act(()=>window.dispatchEvent(new Event('pointerdown')));expect(useGame.getState().demo).toBe(false);const tick=useGame.getState().tick;act(()=>vi.advanceTimersByTime(61000));expect(useGame.getState().tick).toBe(tick);hook.unmount()});
