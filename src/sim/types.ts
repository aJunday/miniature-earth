export type Scenario='Protect'|'Exploit';
export interface Species {id:string;name:string;era:string;zone:string;diet:string;eats:string[];temp:number[]|null;rain:number[]|null;height:number;hardy:boolean;tier:number;r:number;K:number;need:number;m:number;fact:string;habitatSensitivity:number;threats:string[];selfSufficient?:boolean;size?:number;template?:string;group?:string}
export interface Placement {tick:number;speciesId:string;count:number;x:number;z:number}
export interface Environment {temp:number;rain:number;sun:number;habitat:number;visualSet:'precambrian'|'jurassic'|'present';futureTint:number}
export interface SimState {tick:number;year:number;yearLabel:string;eraName:string;env:Environment;populations:Record<string,number>;extinct:string[];happenings:string[]}
