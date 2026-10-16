import {it} from 'vitest';it('prints scenario report',async()=>{if(process.env.SIM_REPORT)await import('./report')});
