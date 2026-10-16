import {it,expect} from 'vitest';
import {eras,eraAt} from './eras';
import {reefLayout} from './reef';
import {habitatAt,terrainHeight} from './terrain';
it('reef colonies stay underwater, bounded and deterministic across era changes',()=>{for(const era of eras){const items=reefLayout(era);expect(items).toEqual(reefLayout(era));expect(items.length).toBeLessThanOrEqual(96);for(const v of items){expect(habitatAt(v.x,v.z,era.snap)).toBe('sea');expect(v.y).toBeLessThan(0);expect(Number.isFinite(v.scale)).toBe(true)}}});
it('reef silhouettes distinguish early microbes, Cambrian sponges and modern gardens',()=>{expect(reefLayout(eraAt(-4.3e9))).toEqual([]);expect(reefLayout(eraAt(-3e9)).every(c=>c.kind==='mound')).toBe(true);const cambrian=reefLayout(eraAt(-510e6));expect(cambrian.length).toBeGreaterThan(0);expect(cambrian.every(c=>['mound','sponge'].includes(c.kind))).toBe(true);const modern=reefLayout(eraAt(2026));expect(new Set(modern.map(c=>c.kind)).size).toBe(4);expect(reefLayout(eraAt(-40000))).toEqual([])});
it('the submerged beach slopes continuously instead of dropping at the old shelf edge',()=>{const era=eraAt(2026);const colonies=reefLayout(era);for(const c of colonies){expect(Number.isFinite(c.y)).toBe(true)}for(const x of [14,15,16,17]){const a=terrainHeight(x,0),b=terrainHeight(x+.01,0);expect(Math.abs(b-a)).toBeLessThan(.02)}});

import {marineMeadowLayout} from './reef';
it('modern marine plants are deterministic, rooted on the bed, and fully submerged',()=>{const era=eraAt(2026),plants=marineMeadowLayout(era);expect(plants.length).toBeGreaterThan(20);expect(plants.length).toBeLessThan(300);expect(plants).toEqual(marineMeadowLayout(era));for(const p of plants){expect(habitatAt(p.x,p.z,era.snap)).toBe('sea');expect(p.y).toBeCloseTo(terrainHeight(p.x,p.z,era.snap)+.015);expect(p.y+p.height).toBeLessThan(0)}});
it('flowering marine plants never appear in ancient or glacial habitats',()=>{for(const era of eras.filter(e=>!['present','future'].includes(e.id)))expect(marineMeadowLayout(era)).toEqual([])});
it('reef crowns remain below the water surface even in shallow water',()=>{for(const era of eras)for(const c of reefLayout(era)){expect(c.scale).toBeGreaterThan(0);expect(c.y+c.scale*1.3).toBeLessThan(0)}});
