import type {Species,Environment,Scenario} from './types';import {fitness,clamp} from './fitness';import {foodWeb,pollination,turtleBirths} from './ecosystem';
export function stepPopulation(species:Species[],p:Record<string,number>,e:Environment,event:boolean,year:number,scenario:Scenario,random:()=>number,zones:Record<string,boolean>,temperatureFits:Record<string,number>={},births:Record<string,number>={}){const {loss,phi}=foodWeb(species,p),next={...p};for(const s of species){const n=p[s.id]??0;if(!n)continue;let f=fitness(s,e,zones[s.id],temperatureFits[s.id]);if(s.diet==='decomposer')f*=Math.min(1,(e.resourceCover??0)*e.rain*2);if(s.diet==='producer')f*=1+Math.min(.12,(p.decomposer??0)*.002);
// Suitability follows resources and oxygen, never the organism’s historical label.
if(s.zone==='land'&&s.diet!=='producer'&&(e.resourceCover??1)===0)f*=.05;
const k=Math.max(.001,s.K*e.habitat*(s.diet==='producer'?e.sun:1));const food=s.diet==='herbivore'&&s.zone==='land'?Math.max(phi[s.id]??0,(e.resourceCover??0)*.8):phi[s.id]??1;let growth=s.r*n*(1-n/k)*f*food*pollination(s.id,p);if(s.id==='seaturtle')growth*=turtleBirths(e.temp);let deaths=s.m*n*(1-f*food);
if(event&&!s.hardy)deaths+=n*.14;
if((e.oxygenFit??1)<.2&&s.id!=='stromatolite')deaths+=n*.24;
if(year>2026&&s.habitatSensitivity){const pressure=clamp((year-2026)/34);deaths+=scenario==='Exploit'?n*pressure*s.habitatSensitivity*(.025+.012*s.threats.length):0;}
const reproduction=growth*(1+.05*random());births[s.id]=Math.max(0,reproduction);let value=n+reproduction-deaths-(loss[s.id]??0);if(s.diet==='producer'&&f<.1)value-=n*.025;if(event&&s.hardy)value=Math.max(3,value);next[s.id]=value<2?0:clamp(value,0,1.2*s.K);}return next;}
