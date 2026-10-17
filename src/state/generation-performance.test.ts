import {it,expect} from 'vitest';
import fs from 'node:fs';
import {habitatPoint} from './history';
import {waterHabitatAt} from '../world/terrain';
import {historyRecord} from '../sim/eligibility';
it('profiles repeated historical habitat generation while preserving correct habitats',()=>{
 const fixtures=[['eurypterus',-420e6],['archaeopteris',-370e6],['dunkleosteus',-370e6],['coelophysis',-220e6],['camarasaurus',-150e6],['knightia',-52e6],['mesohippus',-35e6],['deer',2026]] as const;
 const expected=fixtures.map(([id,year])=>habitatPoint(id,year));const runs=[];
 for(let run=0;run<5;run++){const start=performance.now();for(let n=0;n<30;n++)fixtures.forEach(([id,year],i)=>expect(habitatPoint(id,year)).toEqual(expected[i]));runs.push(performance.now()-start)}
 fixtures.forEach(([id,year],i)=>expect(waterHabitatAt(...expected[i],year)).toBe(historyRecord(id)!.habitat));
 if(process.env.GENERATION_REPORT)fs.writeFileSync(`qa/biodiversity-generation-${process.env.GENERATION_REPORT}.json`,JSON.stringify({fixture:'240 repeated anchors per run; includes identical equality assertion overhead',runs,medianMs:[...runs].sort((a,b)=>a-b)[2]},null,2));
});

it('cached habitat points cannot be corrupted by a caller and respect landscape scale changes',()=>{
 const point=habitatPoint('deer',2026),expected=[...point];point[0]=999;
 expect(habitatPoint('deer',2026)).toEqual(expected);
 expect(habitatPoint('deer',-20000)).not.toEqual(expected);
 expect(habitatPoint('deer',2025)).toEqual(expected);
});
