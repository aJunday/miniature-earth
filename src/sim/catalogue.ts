import {eraAt} from '../world/eras';
import type {Species} from './types';
export type Category='Animals'|'Plants'|'Fungi'|'Algae & microbes';
import records from './data/metadata.json';
import stories from './data/stories.json';
const entries:Record<string,(typeof records)[keyof typeof records]>=records;
export function categoryOf(s:Species):Category{return s.id==='decomposer'?'Fungi':s.id==='stromatolite'?'Algae & microbes':['charnia','dickinsonia','elkhorncoral'].includes(s.id)?'Animals':s.diet==='producer'?'Plants':'Animals'}
export function metadata(s:Species){const evidence=entries[s.id];const story=stories[s.id as keyof typeof stories];return {...evidence,category:categoryOf(s),temperature:s.temp,temperatureEvidence:'Gameplay tolerance; not an empirical measurement',oxygenRequirement:s.id==='stromatolite'?'Microbial community; oxygen needs vary':'Aerobic metabolism; exact threshold not quantified',resourceRequirements:s.eats,defaultGroup:groupSize(s),conservation:story?{status:story.status,assessmentYear:story.assessmentYear,sources:story.sources,note:'Source-reported status; assessment date unconfirmed. Not a live Red List feed.'}:null}}
export function groupSize(s:Species){return s.id==='reeffish'?9:s.diet==='producer'?(['oak','conifer','cycad'].includes(s.id)?5:12):s.diet==='carnivore'?3:(s.size??s.height)>1.2?4:6}
export function suitability(s:Species,year:number){const era=eraAt(year);if(era.oxygenFit<.2&&s.id!=='stromatolite')return 'Very low oxygen — rapid decline';if(era.vegetation===0&&s.zone==='land'&&s.diet!=='producer')return 'Little food or terrestrial habitat';return 'Experiment here · food and climate matter'}
