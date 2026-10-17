import {vegetationFraction} from './conservationVisuals';
import {useGame,useSimState} from '../state';
/** Historical scenery is a reconstruction; experimental scenery follows live biomass. */
export function useBiomass(id:string,reference:number){const sim=useSimState(),mode=useGame(s=>s.mode);return mode==='historical'&&sim.year<=2026?1:vegetationFraction(sim.populations[id]??0,reference,sim.env.habitat)}
