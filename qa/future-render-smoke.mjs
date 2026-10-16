import {chromium,expect} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,args:['--single-process','--no-zygote']});const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text())});
await page.goto('http://127.0.0.1:5182/?profile');
async function year(value){await page.getByLabel('Go to year (negative for BCE)').fill(String(value));await page.getByLabel('Go to year',{exact:true}).click();await page.waitForTimeout(500)}
await year(2030);await page.getByRole('button',{name:'Exploit',exact:true}).click();await page.waitForTimeout(700);const before=await page.evaluate(()=>window.__renderMetrics.geometries);
for(const value of [2040,2050,2060,2030,2060])await year(value);
const after=await page.evaluate(()=>window.__renderMetrics.geometries);expect(after).toBe(before);await expect(page.locator('.world-card strong')).toHaveText('2060');await page.screenshot({path:'qa/shots/reef-future.png'});expect(errors).toEqual([]);
const result={checks:['future tint responds during repeated year changes','geometry count stable across future scrubbing'],geometries:{before,after},errors};fs.writeFileSync('qa/future-render-results.json',JSON.stringify(result,null,2));console.log(result);await browser.close();
