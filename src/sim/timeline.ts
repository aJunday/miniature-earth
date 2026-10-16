import data from './data/timeline.json';
export const TICKS=4000;export const segments=data.segments;export const snaps=data.snaps;
export const tickToU=(t:number)=>Math.max(0,Math.min(TICKS,t))/TICKS;
export const uToTick=(u:number)=>Math.round(Math.max(0,Math.min(1,u))*TICKS);
export function tickToYear(t:number){const u=tickToU(t);const s=segments.find(s=>u<=s[1])!;return s[2]+(s[3]-s[2])*(u-s[0])/(s[1]-s[0]);}
export function yearToTick(y:number){const s=segments.find(s=>y<=s[3])??segments[4]!;return uToTick(s[0]+(s[1]-s[0])*(y-s[2])/(s[3]-s[2]));}
export function formatYear(y:number){if(y<=-1e9)return `${Number((-y/1e9).toFixed(2))} billion years ago`;if(y<=-1e6)return `${Number((-y/1e6).toFixed(1))} million years ago`;if(y<=-10000)return `${Math.round(-y).toLocaleString('en-US')} years ago`;return `${Math.round(y)}`;}
export const eraName=(y:number)=>data.eras.find(e=>y>=Number(e[1])&&y<Number(e[2]))?.[0]?.toString()??'Future';
export const snapTick=(name:keyof typeof snaps)=>yearToTick(snaps[name]);
