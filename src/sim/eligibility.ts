import stories from './data/stories.json';
import records from './data/metadata.json';
export type Habitat='terrestrial'|'marine'|'freshwater'|'outside';
export type WorldMode='historical'|'sandbox';
export interface HistoryRecord {id:string;rank:string;first:number|null;last:number|null;living:boolean;habitat:Habitat;regions:readonly string[];sources:readonly string[];coverage?:readonly [number,number];lineageBoundary?:number;regionalCoverage?:readonly {region:string;first:number;last:number}[]}
const raw:Record<string,(typeof records)[keyof typeof records]>=records;
/** Coverage is a reviewed display interval, never a claim about an exact origin. */
const coverage:Record<string,readonly [number,number]>={grass:[-19e6,2026],mammoth:[-120000,-13000],groundsloth:[-9e6,-13000],fern:[-360e6,2026],stromatolite:[-3.48e9,2026],triceratops:[-68e6,-66e6],cycad:[-201.4e6,-66e6],conifer:[-201.4e6,-66e6],lycophyte:[-323.2e6,-298.9e6],horsetail:[-323.2e6,-298.9e6],ammonite:[-200e6,-66e6]};
const links:Record<string,string>={grass:'https://www.si.edu/newsdesk/factsheets/david-h-koch-hall-fossils-deep-time',mammoth:'https://www.nhm.ac.uk/discover/were-all-mammoths-woolly.html',groundsloth:'https://www.floridamuseum.ufl.edu/florida-vertebrate-fossils/species/eremotherium-eomigrans/',ammonite:'https://www.nhm.ac.uk/discover/what-is-an-ammonite.html',cycad:'https://www.nhm.ac.uk/discover/the-jurassic-period.html',conifer:'https://www.nhm.ac.uk/discover/how-to-grow-a-dinosaur-garden.html',lycophyte:'https://www.nps.gov/articles/000/pennsylvanian-period.htm',horsetail:'https://www.nps.gov/articles/000/pennsylvanian-period.htm',fern:'https://www.nhm.ac.uk/discover/how-trees-changed-the-world.html',stromatolite:'https://www.nhm.ac.uk/discover/news/2022/november/oldest-evidence-life-earth-could-help-discover-ancient-life-mars.html',triceratops:'https://www.nhm.ac.uk/discover/dino-directory/triceratops.html'};
const regionEvidence:Record<string,string[]>={triceratops:['North America'],stegosaurus:['North America'],rabbit:['Europe'],axolotl:['Mexico']};
export function historyRecord(id:string):HistoryRecord|undefined{const r=raw[id];if(!r)return undefined;const story=stories[id as keyof typeof stories],last=r.lastOccurrence??story?.extinctionYear??null;const moments=story?.keyMoments.filter(m=>last!==null&&m.year<=last)??[];const window=('coverage' in r?r.coverage as [number,number]:undefined)??coverage[id]??(moments.length&&last!==null?[Math.min(...moments.map(m=>m.year)),last] as const:undefined);return {...('regionalCoverage' in r?{regionalCoverage:r.regionalCoverage}:{}),id,rank:r.taxonomicRank,first:r.firstAppearance,last,living:r.extinctionStatus!=='extinct'&&!['lycophyte','horsetail'].includes(id),habitat:r.waterDomain as Habitat,regions:('regions' in r&&(r.regions as string[]).length?r.regions as string[]:regionEvidence[id])??[],sources:[...r.sources.map(s=>s.url),...(links[id]?[links[id]]:[])],...(['wildflower','oak','grass','seagrass'].includes(id)?{lineageBoundary:-136e6}:{}),...(window?{coverage:window}:{})}}
export type Compatibility='supported'|'not-yet'|'extinct'|'region'|'habitat'|'uncertain';
export interface Eligibility {allowed:boolean;status:'supported'|'uncertain'|'unsupported';reason:string;category?:Compatibility}
export function validateHistory(r:HistoryRecord|undefined,year:number,habitat?:Habitat,region='mosaic',mode:WorldMode='historical'):Eligibility{
 const reject=(reason:string,category:Compatibility='uncertain'):Eligibility=>({allowed:false,status:'unsupported',reason,category});
 if(!Number.isFinite(year))return {allowed:false,status:'uncertain',category:'uncertain',reason:'Invalid date — choose a finite calendar year'};
 if(!r)return {allowed:false,status:'uncertain',category:'uncertain',reason:'Evidence uncertain — no reviewed record'};
 if(habitat&&habitat!==r.habitat)return reject(`Wrong habitat — requires ${r.habitat}`, 'habitat');
 if(r.lineageBoundary!==undefined&&year<r.lineageBoundary)return reject('Not yet known — before reviewed flowering-plant evidence','not-yet');
 if(r.first!==null&&year<r.first)return reject('Before the first reviewed appearance; fossil dates are approximate','not-yet');
 if(r.last!==null&&year>r.last)return reject('Outside the reviewed occurrence range; a last fossil occurrence is not an exact extinction date','extinct');
 const regional=r.regionalCoverage?.filter(w=>region==='mosaic'||w.region===region);
 if(region!=='mosaic'&&regional?.length&&!regional.some(w=>Math.min(year,2026)>=w.first&&Math.min(year,2026)<=w.last))return reject('Outside the reviewed regional display interval','uncertain');
 const covered=regional?.some(w=>year>=w.first&&year<=w.last)||(r.first!==null&&year>=r.first&&(r.last!==null?year<=r.last:r.living&&year>=2026))||(r.coverage&&year>=r.coverage[0]&&year<=r.coverage[1])||(r.living&&year>=2026);
 if(!covered)return {allowed:false,status:'uncertain',category:'uncertain',reason:'Evidence uncertain — no reviewed coverage at this date'};
 if(region!=='mosaic'&&!r.regions.includes(region)&&!r.regionalCoverage?.some(w=>w.region===region&&Math.min(year,2026)>=w.first&&Math.min(year,2026)<=w.last))return {allowed:mode==='sandbox',status:'uncertain',category:'region',reason:mode==='sandbox'?'Hypothetical geographic introduction':'Region not supported by this record'};
 return {allowed:true,category:'supported',status:region==='mosaic'?'uncertain':'supported',reason:year>2026?'Hypothetical future — present-day starting taxon':region==='mosaic'?'Time supported · illustrative habitat mosaic':'Available in this period'};
}
export const eligibility=(id:string,year:number,habitat?:Habitat,region='mosaic',mode:WorldMode='historical')=>validateHistory(historyRecord(id),year,habitat,region,mode);

/** Choose only a reviewed interval or occurrence, never invent missing dates or regions. */
export function travelDestination(id:string,currentYear=2026){
 const r=historyRecord(id);if(!r)return null;
 const window=r.coverage??(r.first!==null&&r.last!==null?[r.first,r.last]:null);
 const year=eligibility(id,currentYear).allowed?Math.min(2026,currentYear):window?(window[0]+window[1])/2:r.living?2026:r.first;
 if(year===null||!eligibility(id,year).allowed)return null;
 const regional=r.regionalCoverage?.find(w=>year>=w.first&&year<=w.last);
 const region=r.regions[0]??regional?.region??'mosaic';
 return {year,region,habitat:r.habitat,uncertainRegion:region==='mosaic'};
}
export const previewOpacity=(age:number)=>age<0||age>=8000?0:age<5000?.72:.72*(8000-age)/3000;
