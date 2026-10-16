import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true,args:['--single-process','--disable-gpu','--no-zygote']});
await browser.close();
