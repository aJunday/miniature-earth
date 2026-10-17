import {it,expect} from 'vitest';
import fs from 'node:fs';
import {historicalState} from './history';
import {species} from '../sim/simulation';
import {eligibility,historyRecord} from '../sim/eligibility';
import {yearToTick} from '../sim/timeline';
import {eraAt} from '../world/eras';
export const checkpoints=[-600e6,-560e6,-540e6,-500e6,-450e6,-420e6,-370e6,-320e6,-270e6,-230e6,-200e6,-160e6,-120e6,-90e6,-66e6,-50e6,-20e6,-5e6,-1.8e6,-10000,1892,2026,2050,2100];
it('audits requested checkpoints and intervening dates against actual default populations',()=>{
 const dates=[...checkpoints,...checkpoints.slice(1).map((y,i)=>(y+checkpoints[i])/2)];
 const rows=dates.map(year=>{const era=eraAt(year),region='North America',state=historicalState(yearToTick(year),region);const eligible=species.filter(s=>eligibility(s.id,Math.min(year,2026),undefined,region).allowed);const groups=(habitat:string,plants=false)=>eligible.filter(s=>historyRecord(s.id)?.habitat===habitat&&(['producer','decomposer'].includes(s.diet)===plants)).map(s=>s.id);for(const id of Object.keys(state.populations))expect(eligible.some(s=>s.id===id),`${year}: ${id}`).toBe(true);return {year,region,era:era.name,dateRange:[era.start,era.end],landAnimals:groups('terrestrial'),marineAnimals:groups('marine'),freshwaterAnimals:groups('freshwater'),vegetation:eligible.filter(s=>s.diet==='producer').map(s=>s.id),other:eligible.filter(s=>s.diet==='decomposer').map(s=>s.id),validatedRecords:eligible.length,usableModels:eligible.filter(s=>fs.existsSync(`public/models/org_${s.id}.glb`)).length,defaultGroups:Object.keys(state.populations),population:state.populations,missing:species.filter(s=>!eligible.includes(s)).map(s=>({id:s.id,reason:eligibility(s.id,Math.min(year,2026),undefined,region).reason})),status:eligible.length===0?'CONTENT MISSING':eligible.length<4?'PARTIALLY POPULATED':'WELL POPULATED'};});
 if(process.env.BIODIVERSITY_REPORT)fs.writeFileSync(`qa/biodiversity-${process.env.BIODIVERSITY_REPORT}.json`,JSON.stringify(rows,null,2));
});
