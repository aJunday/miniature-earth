import data from './data/research-resources.json';
import curated from './data/research-curated.json';
export interface ResearchResource {speciesId:string;title:string;organization:string;type:string;url:string;year:number|null;description:string;topic:string;scope:string;verifiedAt:string;verification:string}
export function resourcesFor(id:string):ResearchResource[]{return [...((curated as Record<string,ResearchResource[]>)[id]??[]),...((data as Record<string,ResearchResource[]>)[id]??[])]}
