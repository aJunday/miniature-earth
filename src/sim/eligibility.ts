import records from './data/metadata.json';
export type Habitat='terrestrial'|'marine'|'freshwater'|'outside';
export type WorldMode='historical'|'sandbox';
export interface HistoryRecord {id:string;rank:string;first:number|null;last:number|null;living:boolean;habitat:Habitat;regions:readonly string[];sources:readonly string[];coverage?:readonly [number,number]}
const raw:Record<string,(typeof records)[keyof typeof records]>=records;
/** Coverage is a reviewed display interval, never a claim about an exact origin. */
const coverage:Record<string,readonly [number,number]>={fern:[-360e6,2026],stromatolite:[-3.48e9,2026],triceratops:[-68e6,-66e6],cycad:[-201.4e6,-66e6],conifer:[-201.4e6,-66e6],lycophyte:[-323.2e6,-298.9e6],horsetail:[-323.2e6,-298.9e6],ammonite:[-200e6,-66e6]};
const links:Record<string,string>={ammonite:'https://www.nhm.ac.uk/discover/what-is-an-ammonite.html',cycad:'https://www.nhm.ac.uk/discover/the-jurassic-period.html',conifer:'https://www.nhm.ac.uk/discover/how-to-grow-a-dinosaur-garden.html',lycophyte:'https://www.nps.gov/articles/000/pennsylvanian-period.htm',horsetail:'https://www.nps.gov/articles/000/pennsylvanian-period.htm',fern:'https://www.nhm.ac.uk/discover/how-trees-changed-the-world.html',stromatolite:'https://www.nhm.ac.uk/discover/news/2022/november/oldest-evidence-life-earth-could-help-discover-ancient-life-mars.html',triceratops:'https://www.nhm.ac.uk/discover/dino-directory/triceratops.html'};
const regionEvidence:Record<string,string[]>={triceratops:['North America'],stegosaurus:['North America'],rabbit:['Europe'],axolotl:['Mexico']};
export function historyRecord(id:string):HistoryRecord|undefined{const r=raw[id];if(!r)return undefined;return {id,rank:r.taxonomicRank,first:r.firstAppearance,last:r.lastOccurrence,living:r.extinctionStatus!=='extinct'&&!['lycophyte','horsetail'].includes(id),habitat:r.waterDomain as Habitat,regions:regionEvidence[id]??[],sources:[...r.sources.map(s=>s.url),...(links[id]?[links[id]]:[])],...(coverage[id]?{coverage:coverage[id]}:{})}}
export interface Eligibility {allowed:boolean;status:'supported'|'uncertain'|'unsupported';reason:string}
export function validateHistory(r:HistoryRecord|undefined,year:number,habitat?:Habitat,region='mosaic',mode:WorldMode='historical'):Eligibility{
 const reject=(reason:string):Eligibility=>({allowed:false,status:'unsupported',reason});
 if(!r)return {allowed:false,status:'uncertain',reason:'Evidence uncertain — no reviewed record'};
 if(habitat&&habitat!==r.habitat)return reject(`Wrong habitat — requires ${r.habitat}`);
 if(r.first!==null&&year<r.first)return reject('Not yet known to exist');
 if(r.last!==null&&year>r.last)return reject('No longer known to exist');
 const covered=(r.first!==null&&year>=r.first&&(r.last!==null?year<=r.last:r.living&&year>=2026))||(r.coverage&&year>=r.coverage[0]&&year<=r.coverage[1])||(r.living&&year>=2026);
 if(!covered)return {allowed:false,status:'uncertain',reason:'Evidence uncertain — no reviewed coverage at this date'};
 if(region!=='mosaic'&&!r.regions.includes(region))return {allowed:mode==='sandbox',status:'uncertain',reason:mode==='sandbox'?'Hypothetical geographic introduction':'Region not supported by this record'};
 return {allowed:true,status:region==='mosaic'?'uncertain':'supported',reason:year>2026?'Hypothetical future — present-day starting taxon':region==='mosaic'?'Time supported · illustrative habitat mosaic':'Available in this period'};
}
export const eligibility=(id:string,year:number,habitat?:Habitat,region='mosaic',mode:WorldMode='historical')=>validateHistory(historyRecord(id),year,habitat,region,mode);
