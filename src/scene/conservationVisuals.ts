import type {Environment} from '../sim/types';
/** Exaggerated artistic cues driven by simulated habitat, never by a UI button alone. */
export function habitatStress(year:number,env:Environment){return year>2026?Math.max(0,Math.min(1,(.95-env.habitat)/.45)):env.futureTint}
export function vegetationFraction(population:number,reference:number,habitat:number){return Math.min(1,Math.max(0,population/reference))*Math.max(0,Math.min(1,habitat))**2}
