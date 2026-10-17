import {it,expect} from 'vitest';
import {historicalState} from './history';
import {yearToTick} from '../sim/timeline';
import {individualPositions,inZone} from './positions';
import {byId} from '../sim/simulation';
import {islandDistance} from '../world/terrain';
import {bodyRadius} from './composition';
it('leaves gaps rather than stacking individuals when a small habitat is full',()=>{const p=individualPositions(0,0,200,'land',42,2026,1,2);expect(p.length).toBeLessThan(200);for(let i=0;i<p.length;i++){expect(inZone(...p[i],'land')).toBe(true);for(let j=0;j<i;j++)expect(Math.hypot(p[i][0]-p[j][0],p[i][1]-p[j][1])).toBeGreaterThanOrEqual(1)}});
it('keeps large-animal territories inside the visible clearing and separates species',()=>{for(const year of [-150e6,-67e6,-40000,2026]){const groups=historicalState(yearToTick(year),'North America').groups!.filter(g=>byId[g.speciesId].zone==='land'&&byId[g.speciesId].diet!=='producer');for(let i=0;i<groups.length;i++){const a=groups[i];expect(islandDistance(a.x,a.z,year)).toBeLessThan(-3);for(let j=0;j<i;j++){const b=groups[j];expect(Math.hypot(a.x-b.x,a.z-b.z)).toBeGreaterThan(bodyRadius(a.speciesId)+bodyRadius(b.speciesId))}}}});
