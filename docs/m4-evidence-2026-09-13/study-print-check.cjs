const {chromium}=require('/Users/a1-6/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:375,height:812}});
 await page.goto('http://127.0.0.1:4321/guides/goethe-b1-study-plan/');
 const worksheet=page.getByRole('region',{name:'Diagnosis and retest worksheet',exact:true});await worksheet.scrollIntoViewIfNeeded();await worksheet.focus();await page.keyboard.press('ArrowRight');
 await page.waitForFunction(()=>document.querySelector('[aria-label="Diagnosis and retest worksheet"]').scrollLeft>0,{timeout:3000});
 const keyboard=await worksheet.evaluate(e=>({focused:document.activeElement===e,scrollLeft:e.scrollLeft,clientWidth:e.clientWidth,scrollWidth:e.scrollWidth}));
 await page.setViewportSize({width:680,height:960});await page.emulateMedia({media:'print'});
 const print=await page.locator('#guide-content .responsive-table').evaluateAll(es=>es.map(e=>({width:e.clientWidth,content:e.scrollWidth,tableWidth:e.querySelector('table').getBoundingClientRect().width,headings:[...e.querySelectorAll('th')].map(t=>t.textContent)})));
 await page.pdf({path:'/private/tmp/visalang-m4-20260913/study-print.pdf',format:'A4',margin:{top:'15mm',bottom:'15mm',left:'15mm',right:'15mm'},printBackground:true});
 fs.writeFileSync('/private/tmp/visalang-m4-20260913/study-print.json',JSON.stringify({keyboard,print},null,2)+'\n');
 console.log(JSON.stringify({keyboard,print}));await browser.close();if(print.some(e=>e.content>e.width))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
