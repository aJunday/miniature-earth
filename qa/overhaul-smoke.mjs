import {chromium,expect} from '@playwright/test';
import fs from 'node:fs';
console.log('launch');const browser=await chromium.launch({headless:true,args:['--single-process','--no-zygote']});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],checks=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',e=>{if(e.type()==='error')errors.push(e.text())});
page.setDefaultTimeout(15000);console.log('navigate');await page.goto('http://127.0.0.1:5182');await page.waitForTimeout(1800);
async function drag(name,x,y){console.log('drag',name);await page.getByLabel('Search organisms').fill(name);const card=page.getByRole('button',{name:'Place '+name,exact:true});const b=await card.boundingBox();await page.mouse.move(b.x+b.width/2,b.y+30);await page.mouse.down();await page.mouse.move(x,y,{steps:3});await page.mouse.up();console.log('dropped',name);await page.waitForTimeout(500);}
const saved=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('miniature-earth-v1')).placements);
await drag('Deer',650,450);expect((await saved()).filter(p=>p.speciesId==='deer')).toHaveLength(1);checks.push('deer drag places one herd');
await drag('Reef fish',210,470);expect((await saved()).filter(p=>p.speciesId==='reeffish')).toHaveLength(1);checks.push('fish drag places a school in ocean');
await drag('Reef fish',650,450);expect((await saved()).filter(p=>p.speciesId==='reeffish')).toHaveLength(1);await expect(page.getByText('This organism needs water — try the ocean or lagoon.')).toBeVisible();checks.push('fish dry-land drop rejected');
await page.keyboard.press('Escape');await page.getByLabel('Search organisms').fill('');await page.waitForTimeout(1000);await page.screenshot({path:'qa/shots/overhaul-present.png'});
for(const era of ['hadean','cambrian','carboniferous','jurassic','pleistocene']){await page.getByLabel('Geological period').selectOption(era);await page.waitForTimeout(700);await page.screenshot({path:`qa/shots/overhaul-${era}.png`});checks.push(era+' renders');}
await page.getByLabel('Geological period').selectOption('archean');await drag('Deer',650,450);await expect(page.getByText('Very low oxygen — rapid decline')).toBeVisible();checks.push('early Earth placement explains oxygen stress');
await page.keyboard.press('Escape');await page.getByRole('button',{name:'◎ Life’s story'}).click();await expect(page.getByText('From land to ocean')).toBeVisible();await page.getByRole('button',{name:/Early whale relatives/}).click();checks.push('curated whale lineage navigates time');await page.getByLabel('Close panel').click();
await page.getByLabel('Geological period').selectOption('present');await page.getByLabel('Search organisms').fill('');
await page.setViewportSize({width:390,height:844});await page.waitForTimeout(800);await page.screenshot({path:'qa/shots/overhaul-mobile.png'});expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);checks.push('mobile has no horizontal overflow');
fs.writeFileSync('qa/overhaul-results.json',JSON.stringify({checks,errors},null,2));expect(errors).toEqual([]);console.log({checks,errors});await browser.close();
