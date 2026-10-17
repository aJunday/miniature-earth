import {useState} from 'react';
import {useGame} from '../state';
import {tickToYear,yearToTick,formatYear} from '../sim/timeline';
import {eraAt} from '../world/eras';
const milestones=[
 {year:-4.54e9,title:'Earth forms',note:'Approximate age from geological dating.',source:'https://www.nhm.ac.uk/discover/factfile-earth.html'},
 {year:-4.4e9,title:'Evidence for early liquid water',note:'Ancient zircons suggest water; the exact timing and extent of the first oceans remain uncertain.',source:'https://science.nasa.gov/earth/earth-observatory/ancient-crystals-suggest-earlier-ocean/'},
 {year:-3.48e9,title:'Ancient microbial ecosystems',note:'Dresser Formation stromatolites preserve early biological structures. This is evidence of life, not its exact origin; older proposed signs remain debated.',source:'https://www.nhm.ac.uk/press-office/press-releases/earth-s-oldest-stromatolites-help-in-the-search-for-ancient-life.html'},
 {year:-2.4e9,title:'Atmospheric oxygenation',note:'A major rise in atmospheric oxygen around this interval changed environmental conditions.',source:'https://www.nature.com/articles/s41467-021-23286-7'},
 {year:-560e6,title:'Ediacaran complexity',note:'Large organisms appear in late Precambrian seas. The landscape represents broad conditions, not an exact fossil locality.',source:'https://www.nhm.ac.uk/discover/origin-of-life-on-earth.html'}
];
export function HistoryNotes(){const g=useGame(),[notes,setNotes]=useState(false),year=tickToYear(g.tick);if(g.mode!=='historical'||year>=2026)return null;return <section className="history-notes"><button onClick={()=>setNotes(!notes)}>{notes?'Hide':'Show'} scientific notes</button>{notes&&<><p>{eraAt(year).description}</p><small>Automatic residents follow reviewed occurrence windows. Gaps may reflect missing game content, unreviewed regional records or limited evidence; they do not establish lifelessness. Last fossils do not establish exact extinction dates.</small></>}{g.origins&&<details><summary>Earth’s origins · milestones</summary>{milestones.map(m=><article key={m.year}><button onClick={()=>{g.setRegion('mosaic');g.setTick(yearToTick(m.year))}}>{m.title} · {formatYear(m.year)}</button><p>{m.note} <a href={m.source} target="_blank" rel="noreferrer">Evidence ↗</a></p></article>)}</details>}</section>}
