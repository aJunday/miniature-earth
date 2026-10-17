import {chromium} from '@playwright/test';
import fs from 'node:fs';
let browser;
try{
 browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:false,args:['--use-angle=metal','--enable-gpu'],timeout:20000});
 const page=await browser.newPage({viewport:{width:1280,height:800}});await page.goto('http://127.0.0.1:5182/?profile');await page.waitForTimeout(7000);
 const renderer=await page.locator('canvas').evaluate(c=>{const gl=c.getContext('webgl2'),ext=gl.getExtension('WEBGL_debug_renderer_info');return ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER)});
 const timings=await page.evaluate(()=>new Promise(resolve=>{let last=performance.now();const frames=[];function frame(now){frames.push(now-last);last=now;if(frames.length<120)requestAnimationFrame(frame);else{frames.sort((a,b)=>a-b);resolve({medianMs:frames[60],p95Ms:frames[114],...window.__renderMetrics})}}requestAnimationFrame(frame)}));
 const result={renderer,...timings};fs.writeFileSync('qa/hardware-performance.json',JSON.stringify(result,null,2));console.log(result);
}catch(error){fs.writeFileSync('qa/hardware-performance.json',JSON.stringify({unavailable:String(error).split('Call log:')[0].slice(0,1200)},null,2));console.log(String(error).split('Call log:')[0].slice(0,1200))}finally{await browser?.close()}
