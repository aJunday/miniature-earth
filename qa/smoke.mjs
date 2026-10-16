import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
await fs.mkdir('qa/shots',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--single-process','--no-zygote']});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
try{
await page.goto('http://127.0.0.1:5181');await page.getByRole('heading',{name:'Miniature Earth',exact:true}).waitFor();await page.waitForTimeout(2500);
for(const era of ['Precambrian','Jurassic','Present','Future']){await page.getByRole('button',{name:era,exact:true}).first().click();await page.waitForTimeout(1500);await page.screenshot({path:`qa/shots/desktop-${era}.png`});}
await page.getByRole('button',{name:'Present',exact:true}).first().click();await page.getByRole('button',{name:'Place Rabbit',exact:true}).click();
const canvas=page.locator('canvas');const rect=await canvas.boundingBox();assert(rect);await page.mouse.click(rect.x+rect.width*.46,rect.y+rect.height*.45);await page.getByRole('button',{name:/Populations/}).click();await page.locator('.population-panel').getByRole('button',{name:/Rabbit.*6/}).waitFor();await page.screenshot({path:'qa/shots/rabbit.png'});
await page.getByRole('button',{name:'Close populations'}).click();await page.getByRole('button',{name:'Endangered',exact:true}).click();await page.getByRole('button',{name:'Place Tiger',exact:true}).click();await page.getByRole('dialog',{name:'Tiger fact'}).waitFor();await page.getByText('Sources',{exact:true}).click();await page.screenshot({path:'qa/shots/tiger-story.png'});await page.getByRole('button',{name:'Close',exact:true}).click();
if(!process.env.QUICK){await page.getByRole('button',{name:/Watch demo/}).click();for(let i=10;i<=60;i+=10){await page.waitForTimeout(10000);await page.screenshot({path:`qa/shots/demo-${i}.png`})}await page.getByRole('heading',{name:'Your 2060',exact:true}).waitFor();}
await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:/Reset/}).click();
for(const era of ['Precambrian','Jurassic','Present','Future']){await page.getByRole('button',{name:era,exact:true}).first().click();await page.waitForTimeout(1500);await page.screenshot({path:`qa/shots/mobile-${era}.png`});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow');}
assert.deepEqual(errors,[]);await fs.writeFile(process.env.QUICK?'qa/layout-result.json':'qa/full-smoke-result.json',JSON.stringify({passed:true,mode:process.env.QUICK?"layout":"full",errors,screenshots:process.env.QUICK?10:16},null,2));console.log('PASS production smoke: desktop/mobile snaps, rabbit, tiger story, '+(process.env.QUICK?'layout only':'60-second demo')+', no console errors');
}finally{await fs.writeFile('qa/console-errors.json',JSON.stringify(errors,null,2));await browser.close()}
