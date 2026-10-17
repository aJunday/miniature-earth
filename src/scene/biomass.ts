import {useGame,useSimState} from '../state';
/** Historical scenery is a reconstruction; experimental scenery follows live biomass. */
export function useBiomass(id:string,reference:number){const sim=useSimState(),mode=useGame(s=>s.mode);return mode==='historical'&&sim.year<=2026?1:Math.min(1.5,Math.max(0,(sim.populations[id]??0)/reference))}
