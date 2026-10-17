import type {InheritedTraits} from './adaptation';
export type Scenario='Protect'|'Exploit';
export interface Species {id:string;name:string;era:string;zone:string;diet:string;eats:string[];temp:number[]|null;rain:number[]|null;height:number;hardy:boolean;tier:number;r:number;K:number;need:number;m:number;fact:string;habitatSensitivity:number;threats:string[];selfSufficient?:boolean;size?:number;template?:string;group?:string}
export interface Placement {tick:number;untilTick?:number;residentKey?:string;origin?:'resident';speciesId:string;count:number;x:number;z:number}
export interface Environment {temp:number;rain:number;sun:number;habitat:number;visualSet:'precambrian'|'jurassic'|'present';futureTint:number;oxygenFit?:number;resourceCover?:number}
export interface SimState {pools?:import('./coupled').Pools;tick:number;year:number;yearLabel:string;eraName:string;env:Environment;populations:Record<string,number>;extinct:string[];happenings:string[];groups?:{id:string;origin?:'resident';speciesId:string;population:number;x:number;z:number;tick:number;evolution?:import('./evolution').EvolutionSnapshot;traits?:InheritedTraits|undefined}[]}
