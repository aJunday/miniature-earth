import {rangeFit} from '../sim/fitness';
import type {Species,SimState} from '../sim/types';
/** Initial viability uses the same teaching parameters as the coupled simulator. */
export function placementEnvironmentReason(s:Species,sim:SimState){
 if(rangeFit(sim.env.temp,s.temp,5)===0)return `Modelled temperature (${sim.env.temp.toFixed(1)}°C) is outside this organism's survivable range. Try a suitable temperature`;
 if(rangeFit(sim.env.rain,s.rain,.2)===0)return 'Modelled rainfall is unsuitable. Adjust rainfall or choose a wetter/drier habitat';
 if((sim.env.oxygenFit??1)<=.05&&s.id!=='stromatolite')return 'Modelled oxygen is too low. Choose an oxygenated environment';
 if(sim.env.habitat<=.05)return 'Too little usable habitat. Restore habitat and reduce pollution';
 if(s.zone==='freshwater'&&(sim.pools?.freshwater??1)<=.1)return 'Freshwater availability is too low. Restore freshwater';
 return null;
}
