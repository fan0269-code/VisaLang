import {chromium} from '/Users/a1-6/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const phase=process.argv[2]||'before', root='docs/module-handoffs/2026-09-24-01/W03',origin='http://127.0.0.1:4353';
const b=await chromium.launch({channel:'chrome',headless:true});const rows=[];
for(const width of [375,390,768,1440])for(const path of ['/','/zh/']){
 const c=await b.newContext({viewport:{width,height:width===375?812:width===390?844:width===768?1024:900},hasTouch:width<769});await c.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());const p=await c.newPage();await p.goto(origin+path);
 const selector=width<=768?'.mobile-navigation':'.nav-menu__disclosure';const menu=p.locator(selector).first();const summary=menu.locator('summary');
 await p.keyboard.press('Tab');let tabs=1;while(!(await summary.evaluate(e=>e===document.activeElement))&&tabs<20){await p.keyboard.press('Tab');tabs++;}
 await p.keyboard.press('Enter');const enterOpen=await menu.evaluate(e=>e.open);await p.keyboard.press('Tab');const firstLink=await p.evaluate(()=>({tag:document.activeElement.tagName,text:document.activeElement.textContent,focusVisible:document.activeElement.matches(':focus-visible'),outline:getComputedStyle(document.activeElement).outlineStyle}));
 await p.keyboard.press('Escape');const escapeClosed=await menu.evaluate(e=>!e.open);const focusReturned=await summary.evaluate(e=>e===document.activeElement);
 if(!escapeClosed)await summary.click();
 await summary.focus();await p.keyboard.press('Enter');await p.keyboard.press('Tab');await p.keyboard.press('Shift+Tab');const reverseReturns=await summary.evaluate(e=>e===document.activeElement);await p.keyboard.press('Enter');const enterClosed=await menu.evaluate(e=>!e.open);
 if(width<=768)await summary.tap();else await summary.click();const pointerOpen=await menu.evaluate(e=>e.open);
 const screenshot=`${root}/screenshots/${phase}-menu-${path==='/zh/'?'zh':'en'}-${width}.png`;await p.screenshot({path:screenshot});
 await menu.locator('a').last().focus();await p.keyboard.press('Tab');await p.evaluate(()=>new Promise(requestAnimationFrame));const closesOnExit=await menu.evaluate(e=>!e.open);
 rows.push({width,path,tabs,enterOpen,firstLink,escapeClosed,focusReturned,reverseReturns,enterClosed,pointerOpen,closesOnExit,screenshot});await c.close();
}
await b.close();fs.writeFileSync(`${root}/${phase}-keyboard.json`,JSON.stringify(rows,null,2)+'\n');console.log(JSON.stringify(rows,null,2));if(phase!=='before'&&rows.some(r=>!r.escapeClosed||!r.focusReturned||!r.closesOnExit||!r.enterOpen||!r.enterClosed||!r.pointerOpen||!r.reverseReturns||!r.firstLink.focusVisible))process.exitCode=1;
