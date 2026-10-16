import {chromium} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,args:['--single-process','--no-zygote']});
const page=await browser.newPage({viewport:{width:1280,height:800}});
await page.addInitScript(()=>localStorage.setItem('miniature-earth-v1',JSON.stringify({seed:42,placements:[{tick:3869.230769230769,speciesId:'deer',count:12,x:0,z:0},{tick:3869.230769230769,speciesId:'reeffish',count:12,x:16,z:0}]})));
await page.goto('http://127.0.0.1:5182/?profile');await page.waitForTimeout(6000);
const result=await page.evaluate(()=>new Promise(resolve=>{const times=[];let last=performance.now();function next(now){times.push(now-last);last=now;if(times.length<60)requestAnimationFrame(next);else{times.sort((a,b)=>a-b);resolve({medianMs:times[30],p95Ms:times[57],...window.__renderMetrics})}}requestAnimationFrame(next)}));
fs.writeFileSync(`qa/performance-${process.argv[2]||'current'}.json`,JSON.stringify(result,null,2));console.log(result);await browser.close();
