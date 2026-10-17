import {guildFood} from './coupled';
import {fitness,rangeFit} from './fitness';
import {foodWeb} from './ecosystem';
import {byId,species} from './simulation';
import type {SimState} from './types';
export function ecologicalPressures(id:string,state:SimState):string[]{const s=byId[id],reasons:string[]=[];if(!s)return reasons;
 if((state.env.oxygenFit??1)<.2&&id!=='stromatolite')reasons.push('Very low oxygen');
 if(rangeFit(state.env.temp,s.temp,5)<.7)reasons.push('Temperature stress');
 if(rangeFit(state.env.rain,s.rain,.2)<.7)reasons.push('Water availability outside this population’s tolerance');
 if(state.env.habitat<.7)reasons.push('Habitat loss reduces carrying capacity');
 const pool=guildFood[id];if(pool&&state.pools&&state.pools[pool]<(state.populations[id]??0)*Math.max(.08,s.need))reasons.push('Finite '+pool+' guild is limiting food');
 const {phi,loss}=foodWeb(species,state.populations);
 if(s.diet!=='producer'&&(phi[id]??1)<.5&&!s.selfSufficient&&(s.zone==='sea'||(state.env.resourceCover??0)<.3))reasons.push('Insufficient food');
 if((loss[id]??0)>0)reasons.push('Feeding pressure from consumers');
 if(state.happenings.some(h=>['asteroid','end-permian'].includes(h)))reasons.push('Mass-extinction environmental disruption');
 if(!reasons.length&&fitness(s,state.env)>.7)reasons.push('Climate and habitat are currently suitable; food and competition still matter');
 return reasons;
}
