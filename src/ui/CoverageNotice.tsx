import {useMemo,useState,useEffect} from 'react';
import {useGame,useSimState} from '../state';
import {sceneCoverage} from '../state/coverage';
import {wildlife} from '../scene/wildlife';
export function CoverageNotice(){const g=useGame(),sim=useSimState(),coverage=useMemo(()=>sceneCoverage(sim,g.region),[sim,g.region]),[loaded,setLoaded]=useState(0),[ready,setReady]=useState(false);
 useEffect(()=>{setReady(false);const start=Date.now();const timer=setInterval(()=>{setLoaded([...wildlife.values()].filter(v=>(sim.populations[v.id]??0)>0).length);setReady(Date.now()-start>8000)},1000);return()=>clearInterval(timer)},[sim]);
 if(g.mode!=='historical')return null;
 const error=ready&&coverage.generated.some(id=>!['grass','oak','wildflower','seagrass','conifer'].includes(id))&&loaded===0;
 return <details className="coverage-notice"><summary>{error?'RENDERING ERROR':coverage.status} · {coverage.generated.length} supported groups</summary><p>{coverage.explanation}</p><p>{coverage.eligible.length} eligible · {coverage.playable.length} with assets · {coverage.generated.length} populated · {loaded} loaded representatives (not an occlusion count).</p>{coverage.missingAssets.length>0&&<p>Missing assets: {coverage.missingAssets.join(', ')}</p>}<p>Unlisted taxa may await research or implementation. A missing record does not establish limited fossil evidence. Fossil age intervals are uncertain; exact abundance is unknown.</p><div>{coverage.habitats.map(h=><button key={h.habitat} onClick={()=>window.dispatchEvent(new CustomEvent('world-camera',{detail:h.habitat}))}>{h.habitat} · {h.organisms.length}</button>)}</div></details>
}
