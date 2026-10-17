import {afterEach,expect,it} from 'vitest';
import {cleanup,fireEvent,render,screen} from '@testing-library/react';
import {WildlifeHistory} from './WildlifeHistory';
import {useGame} from '../state';
import {yearToTick} from '../sim/timeline';
import {resourcesFor} from '../sim/research';
import {species} from '../sim/simulation';
afterEach(cleanup);
it('opens only the compact selection card until history is explicitly requested',()=>{
 useGame.getState().startCustom(2026,'Empty Island');const before=useGame.getState();render(<WildlifeHistory id="stegosaurus"/>);
 expect(screen.queryByText('Evolutionary history')).toBeNull();expect(document.querySelector('a')).toBeNull();
 fireEvent.click(screen.getByText('VIEW HISTORY'));expect(screen.getByText('Evolutionary history')).toBeTruthy();
 for(const link of document.querySelectorAll('.research-resources a')){expect(link.getAttribute('target')).toBe('_blank');expect(link.getAttribute('rel')).toContain('noopener')}
 fireEvent.click(screen.getByLabelText('Close history'));expect(screen.queryByText('Evolutionary history')).toBeNull();expect(useGame.getState().tick).toBe(before.tick);expect(useGame.getState().placements).toEqual(before.placements);
});
it('separates hypothetical future outcomes and explicitly reports missing research',()=>{
 useGame.getState().setTick(yearToTick(2100));render(<WildlifeHistory id="decomposer"/>);fireEvent.click(screen.getByText('VIEW HISTORY'));expect(screen.getByText('Simulated Future Outcomes')).toBeTruthy();expect(screen.getByText(/No verified educational videos/)).toBeTruthy();expect(document.querySelector('iframe,video')).toBeNull();
});
it('provides a safe resource collection for every supported organism without invented category fillers',()=>{
 for(const s of species)for(const r of resourcesFor(s.id)){expect(r.speciesId).toBe(s.id);expect(new URL(r.url).protocol).toBe('https:');expect(r.verifiedAt).toBe('2026-10-17');expect(r.scope.length).toBeGreaterThan(0)}
 expect(resourcesFor('stegosaurus').some(r=>r.type==='paper')).toBe(true);expect(resourcesFor('stegosaurus').some(r=>r.type==='PDF')).toBe(true);expect(resourcesFor('fern').some(r=>r.type==='video')).toBe(true);
});
