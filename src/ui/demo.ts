import {useEffect} from 'react';
import {useGame} from '../state';
import {yearToTick,snapTick} from '../sim/timeline';
import {playSound} from '../audio';
function place(ids:string[]){for(const [i,id] of ids.entries()){const g=useGame.getState();g.selectSpecies(id);g.place(id==='seaturtle'||id==='seagrass'?5:-5+(i%4)*2.7,id==='seaturtle'||id==='seagrass'?5:-4+Math.floor(i/4)*3)}useGame.getState().selectSpecies(null);playSound('plop')}
export const demoSteps=[
 {at:0,run:()=>{const g=useGame.getState();g.resetWorld();g.snapTo('Jurassic');g.setCaption('A Jurassic garden. Every creature has a part to play.');place(['fern','cycad','conifer','stegosaurus','allosaurus'])}},
 {at:8,run:()=>{useGame.getState().setTick(snapTick('Jurassic')+300);useGame.getState().setCaption('Plants feed grazers. Predators keep a living balance.')}},
 {at:15,run:()=>{useGame.getState().setTick(yearToTick(-66e6)+100);useGame.getState().setCaption('An asteroid changes everything. Hardy ferns return.');playSound('whoosh')}},
 {at:23,run:()=>{useGame.getState().setTick(yearToTick(1600));place(['dodo']);useGame.getState().setCaption('A dodo in 1600. Some losses cannot be undone.')}},
 {at:28,run:()=>{useGame.getState().setTick(yearToTick(1700));useGame.getState().setCaption('The last reliable dodo sighting was in 1662.')}},
 {at:34,run:()=>{useGame.getState().snapTo('Present');place(['grass','oak','rabbit','redfox','tiger','redpanda','giantpanda','seagrass','seaturtle']);useGame.getState().setCaption('Today, a small island holds a world worth protecting.')}},
 {at:43,run:()=>{useGame.getState().setScenario('Protect');useGame.getState().snapTo('Future');useGame.getState().setCaption('2060 · Protect habitats. Give life room to recover.')}},
 {at:51,run:()=>{useGame.getState().setScenario('Exploit');useGame.getState().setCaption('Same world, different choices. More pressure, less habitat.')}},
 {at:60,run:()=>{useGame.getState().setDemo(false);useGame.getState().setCaption('Your 2060 · Game simulation, not a forecast.')}}
];
export function useDemo(){const demo=useGame(s=>s.demo);useEffect(()=>{if(!demo)return;const timers=demoSteps.map(s=>setTimeout(s.run,s.at*1000));const cancel=()=>{useGame.getState().setDemo(false);useGame.getState().setCaption('')};window.addEventListener('pointerdown',cancel);window.addEventListener('keydown',cancel);return()=>{timers.forEach(clearTimeout);window.removeEventListener('pointerdown',cancel);window.removeEventListener('keydown',cancel)}},[demo]);}
