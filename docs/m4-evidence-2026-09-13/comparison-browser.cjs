const { chromium } = require('/Users/a1-6/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true});const results=[];
for(const width of [375,1440])for(const locale of ['en','zh']){
 const context=await browser.newContext({viewport:{width,height:width===375?812:900}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const prefix=locale==='zh'?'/zh':'';await page.goto('http://127.0.0.1:4321'+prefix+'/tools/exam-comparison/');await page.waitForFunction(()=>!document.querySelector('#comparison-form').inert);
 assert.equal(await page.locator('[name="first"] option').count(),5);
 const first=page.locator('[name="first"]'),second=page.locator('[name="second"]');
 const run=async(a,b)=>{await first.selectOption(a);await second.selectOption(b);await page.locator('#comparison-form button[type="submit"]').click();await page.locator('#comparison-result').waitFor({state:'visible'});};
 await run('goethe-zertifikat-b1','telc-zertifikat-deutsch-b1');assert.equal(await page.locator('#comparison-summary table').count(),1);
 assert.ok((await page.locator('#comparison-summary').innerText()).includes('2026-09-13'));
 const region=page.locator('#comparison-summary .tool-table-wrap');await region.scrollIntoViewIfNeeded();await region.focus();
 if(width===375){await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('#comparison-summary .tool-table-wrap').scrollLeft>0);}
 const state=await region.evaluate(e=>({focused:document.activeElement===e,scrollLeft:e.scrollLeft,width:e.clientWidth,scrollWidth:e.scrollWidth}));
 await page.screenshot({path:`/private/tmp/visalang-m4-20260913/comparison-${locale}-${width}.png`});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.reload();await page.waitForFunction(()=>!document.querySelector('#comparison-form').inert);assert.equal(await first.inputValue(),'goethe-zertifikat-b1');assert.equal(await second.inputValue(),'telc-zertifikat-deutsch-b1');
 await run('goethe-zertifikat-b1','goethe-zertifikat-b1');assert.equal(await page.locator('#comparison-summary table').count(),0);const same=await page.locator('#comparison-summary').innerText();assert.ok(same.includes(locale==='zh'?'同一等级':'same level'));
 await run('goethe-zertifikat-a1-start-deutsch-1','telc-zertifikat-deutsch-b1');assert.equal(await page.locator('#comparison-summary table').count(),0);
 await run('goethe-zertifikat-a1-start-deutsch-1','telc-start-deutsch-1-a1');assert.equal(await page.locator('#comparison-summary table').count(),1);
 results.push({locale,width,readyB1:true,keyboard:state,reloadPreservedB1:true,sameProductNoFacts:true,mixedLevelNoFacts:true,a1StillReady:true,pageOverflow:false,errors});assert.equal(errors.length,0);await context.close();
}
for(const width of [375,1440]){const page=await browser.newPage({viewport:{width,height:width===375?812:900}});
for(const slug of ['goethe-b1-vs-telc-b1','goethe-b1-fees-and-booking']){await page.goto('http://127.0.0.1:4321/guides/'+slug+'/');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);const tables=await page.locator('#guide-content .responsive-table').count();assert.ok(tables>0);await page.locator('#guide-content .responsive-table').first().scrollIntoViewIfNeeded();await page.screenshot({path:`/private/tmp/visalang-m4-20260913/${slug}-${width}.png`});results.push({slug,width,contained:true,worksheetRegions:tables});}
await page.close();}
fs.writeFileSync('/private/tmp/visalang-m4-20260913/comparison-browser.json',JSON.stringify(results,null,2)+'\n');await browser.close();console.log(JSON.stringify(results,null,2));})().catch(e=>{console.error(e);process.exit(1)});
