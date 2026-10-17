import {useFrame} from '@react-three/fiber';
declare global {interface Window {__renderMetrics?:{calls:number;triangles:number;geometries:number;frameMs:number}}}
/** Opt-in QA instrumentation; no timers, storage or telemetry. */
export function RenderMetrics(){const enabled=new URLSearchParams(location.search).has('profile');useFrame(({gl},dt)=>{if(enabled)window.__renderMetrics={calls:gl.info.render.calls,triangles:gl.info.render.triangles,geometries:gl.info.memory.geometries,frameMs:dt*1000}});return null}
