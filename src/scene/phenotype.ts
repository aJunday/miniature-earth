/** Identical coat geometry in the world and comparison view. */
export function furPlacement(index:number){const a=index*2.39996,y=1-2*(index+.5)/24,r=Math.sqrt(1-y*y),x=Math.cos(a)*r,z=Math.sin(a)*r;return {position:[x*.112,.1875+y*.10,-.035+z*.13] as [number,number,number],normal:[x,y,z] as [number,number,number]}}
