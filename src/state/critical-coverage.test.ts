import {it,expect} from 'vitest';
import fs from 'node:fs';
import {eras} from '../world/eras';
import {historicalState,habitatPoint} from './history';
import {species} from '../sim/simulation';
import {yearToTick} from '../sim/timeline';
import {eligibility,historyRecord} from '../sim/eligibility';
import {isMobileSpecies} from '../sim/behavior';
import {waterHabitatAt} from '../world/terrain';
import {metadata} from '../sim/catalogue';
it('audits every era and supported region without substituting unsupported wildlife',()=>{
 const regions=['mosaic',...new Set(species.flatMap(s=>{const h=historyRecord(s.id)!;return [...h.regions,...(h.regionalCoverage??[]).map(r=>r.region)]}))];
 const rows=eras.flatMap(era=>regions.map(region=>{const state=historicalState(yearToTick(era.snap),region),available=species.filter(s=>eligibility(s.id,era.snap,undefined,region).allowed);for(const g of state.groups??[])expect(eligibility(g.speciesId,era.snap,undefined,region).allowed,g.speciesId).toBe(true);return {era:era.name,year:era.snap,region,available:available.map(s=>s.id),simulatedPopulations:state.populations,habitat:era.climate,gaps:available.length===0?'No reviewed playable coverage at this date/region':available.filter(s=>!['producer','decomposer'].includes(s.diet)).length<2?'Sparse animal coverage; not a complete community':'Representative subset; not a historical census'};}));
 const organisms=species.map(s=>{const h=historyRecord(s.id)!,m=metadata(s),model=fs.existsSync(`public/models/org_${s.id}.glb`),rig=fs.existsSync(`public/models/rigged/org_${s.id}.glb`);expect(model,s.id).toBe(true);if(isMobileSpecies(s.id,s.diet))expect(rig,s.id).toBe(true);return {id:s.id,model,rig,animation:isMobileSpecies(s.id,s.diet)?'rig + procedural LOD':'sessile / environmental movement',habitat:h.habitat,regions:h.regions,regionalCoverage:h.regionalCoverage,coverage:h.coverage,sources:h.sources,unknownFirstAppearance:h.first===null,uncertainty:m.notes,feedingEvidence:m.foodEvidence};});
 for(const id of ['desmatosuchus','vauxia']){const year=id==='vauxia'?-504.9e6:-224.9e6,[x,z]=habitatPoint(id,year);expect(waterHabitatAt(x,z,year)).toBe(historyRecord(id)!.habitat)}
 if(process.env.CRITICAL_REPORT)fs.writeFileSync('qa/critical-coverage.json',JSON.stringify({rows,organisms},null,2));
});
