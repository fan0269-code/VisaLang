import {chromium} from '/Users/a1-6/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';import assert from 'node:assert/strict';
const root='docs/module-handoffs/2026-09-24-01/W03',origin='http://127.0.0.1:4353';
const b=await chromium.launch({channel:'chrome',headless:true});const rows=[];
for(const width of [375,390,768,1440])for(const path of ['/','/zh/']){
 const c=await b.newContext({viewport:{width,height:width<400?844:1024},hasTouch:width<769});await c.route('**/*',r=>r.request().url().startsWith(origin)?r.continue():r.abort());const p=await c.newPage();
 for(let i=0;i<3;i++){
  await p.goto(origin+path);const link=p.locator('.stage-card a').nth(i);const href=await link.getAttribute('href');const label=await link.textContent();await link.scrollIntoViewIfNeeded();await link.focus();
  const focus=await link.evaluate(e=>{const r=e.getBoundingClientRect();const h=document.querySelector('[data-global-header]').getBoundingClientRect();return {top:r.top,bottom:r.bottom,headerBottom:h.bottom,width:r.width,height:r.height,visible:r.top>=h.bottom&&r.bottom<=innerHeight,outline:getComputedStyle(e).outlineStyle};});
  await p.keyboard.press('Enter');await p.waitForURL(origin+href);await p.waitForLoadState('domcontentloaded');const h1=await p.locator('h1').textContent();const robots=await p.locator('meta[name="robots"]').getAttribute('content');
  assert.ok(h1);assert.ok(focus.visible);assert.ok(focus.height>=44);if(i===1&&path==='/zh/')assert.match(robots,/noindex/);
  rows.push({width,path,label,href,landed:p.url(),h1,robots,focus});
 }
 await p.goto(origin+path);const b1=p.locator('main a[href="/germany-b1-settlement-citizenship/"]');if(path==='/zh/')assert.match(await b1.textContent(),/英文/);await b1.click();await p.waitForURL(origin+'/germany-b1-settlement-citizenship/');rows.push({width,path,flow:'B1 content topic',landed:p.url()});
 await p.goto(origin+path);const finder=p.locator(`main a[href="${path==='/zh/'?'/zh':''}/tools/route-finder/"]`);assert.equal(await finder.count(),1);await finder.click();await p.waitForURL(origin+(path==='/zh/'?'/zh':'')+'/tools/route-finder/');rows.push({width,path,flow:'single localized manual Finder entry',landed:p.url()});
 await c.close();
}
await b.close();fs.writeFileSync(`${root}/link-results.json`,JSON.stringify(rows,null,2)+'\n');console.log(`Verified ${rows.length} local link/keyboard flows`);
