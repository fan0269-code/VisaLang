import { chromium } from '/Users/a1-6/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const out = process.cwd() + '/docs/laya-integration-evidence-2026-09-22';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const rows = [];
const errors = [];
async function test(name, run) { await run(); rows.push({name, status:'pass'}); }
try {
const page = await browser.newPage({viewport:{width:1440,height:1000}});
page.on('pageerror', e => errors.push(String(e)));
await page.goto('http://127.0.0.1:4321/zh/tools/route-finder/');
await page.locator('[data-purpose-suggestion]').waitFor({state:'visible'});
const input=page.locator('#purpose-description'), button=page.locator('[data-purpose-request]'), apply=page.locator('[data-purpose-apply]'), purpose=page.locator('select[name=purpose]'), status=page.locator('[data-purpose-status]');
await test('real model through Astro same-origin proxy requires confirmation', async()=>{
 await input.fill('我想去德国读硕士。');await button.click();await apply.waitFor({state:'visible'});
 assert.equal(await purpose.inputValue(),'');assert.match(await status.textContent(),/大学/);
 await apply.click();assert.equal(await purpose.inputValue(),'university');assert.equal(await input.inputValue(),'');
});
await page.locator('select[name=country]').selectOption('germany');
await page.locator('button[type=submit]').click();
assert.equal(await page.locator('#route-finder-result').isVisible(),true);
await test('confirmation invalidates old route result and triggers follow-up questions',async()=>{
 await page.route('**/api/purpose-suggestion/',r=>r.fulfill({json:{status:'suggestion',purpose:'family-reunion',requiresConfirmation:true}}));
 await input.fill('和丈夫团聚');await button.click();await apply.waitFor({state:'visible'});await apply.click();
 assert.equal(await purpose.inputValue(),'family-reunion');assert.equal(await page.locator('#route-finder-result').isVisible(),false);
 assert.equal(await page.locator('select[name=relationship]').isVisible(),true);
});
await test('editing text clears candidate and reset clears raw input',async()=>{
 await input.fill('团聚');await button.click();await apply.waitFor({state:'visible'});await input.fill('改变了');assert.equal(await apply.isVisible(),false);
 await page.locator('[data-tool-restart]').click();assert.equal(await input.inputValue(),'');assert.equal(await purpose.inputValue(),'');
});
await page.unroute('**/api/purpose-suggestion/');
await test('manual choice while request pending cannot be overwritten',async()=>{
 let release;const gate=new Promise(resolve=>release=resolve);
 await page.route('**/api/purpose-suggestion/',async r=>{await gate;await r.fulfill({json:{status:'suggestion',purpose:'university',requiresConfirmation:true}}).catch(()=>{});});
 await input.fill('团聚');await button.click();await purpose.selectOption('nursing');release();await page.waitForTimeout(250);
 assert.equal(await purpose.inputValue(),'nursing');assert.equal(await apply.isVisible(),false);
});
await page.unroute('**/api/purpose-suggestion/');
await test('clarification keeps manual form usable',async()=>{
 await page.route('**/api/purpose-suggestion/',r=>r.fulfill({json:{status:'needs_clarification',purpose:null,requiresConfirmation:true}}));
 await input.fill('还没想好');await button.click();await page.waitForFunction(()=>document.querySelector('[data-purpose-status]').textContent.includes('还不能确定'));
 assert.equal(await apply.isVisible(),false);assert.equal(await purpose.isEnabled(),true);
});
await page.unroute('**/api/purpose-suggestion/');
await test('HTTP failure falls back to manual choices',async()=>{
 await page.route('**/api/purpose-suggestion/',r=>r.fulfill({status:503,json:{error:'temporarily_unavailable'}}));
 await input.fill('大学');await button.click();await page.waitForFunction(()=>document.querySelector('[data-purpose-status]').textContent.includes('暂时无法'));
 assert.equal(await purpose.isEnabled(),true);assert.equal(await button.isEnabled(),true);
});
await page.unroute('**/api/purpose-suggestion/');
await test('untrusted response label rejected',async()=>{
 await page.route('**/api/purpose-suggestion/',r=>r.fulfill({json:{status:'suggestion',purpose:'<script>alert(1)</script>',requiresConfirmation:true}}));
 await button.click();await page.waitForFunction(()=>document.querySelector('[data-purpose-status]').textContent.includes('暂时无法'));
 assert.equal(await apply.isVisible(),false);
});
await page.unroute('**/api/purpose-suggestion/');
await test('12 second timeout recovers request control',async()=>{
 await page.route('**/api/purpose-suggestion/',async r=>{await new Promise(resolve=>setTimeout(resolve,13000));await r.abort().catch(()=>{});});
 await button.click();await page.waitForFunction(()=>document.querySelector('[data-purpose-status]').textContent.includes('暂时无法'),null,{timeout:15000});
 assert.equal(await button.isEnabled(),true);assert.equal(await purpose.isEnabled(),true);
});
await page.unroute('**/api/purpose-suggestion/');
await test('raw input absent from shared storage and URL',async()=>{
 await input.fill('SYNTHETIC_PRIVATE_MARKER');
 await purpose.selectOption('university');await page.locator('select[name=country]').selectOption('germany');await page.locator('button[type=submit]').click();
 const stored=await page.evaluate(()=>JSON.stringify({session:{...sessionStorage},local:{...localStorage},url:location.href}));assert.ok(!stored.includes('SYNTHETIC_PRIVATE_MARKER'));
});
await input.fill('我想去德国读硕士。');
await page.locator('[data-purpose-suggestion]').scrollIntoViewIfNeeded();
await page.screenshot({path:out+'/zh-desktop.png'});
await page.setViewportSize({width:390,height:844});
await page.locator('[data-purpose-suggestion]').scrollIntoViewIfNeeded();
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
await page.screenshot({path:out+'/zh-mobile.png'});
await page.goto('http://127.0.0.1:4321/tools/route-finder/');
await page.locator('[data-purpose-suggestion]').waitFor({state:'visible'});
await test('English UI and keyboard confirmation',async()=>{
 await page.route('**/api/purpose-suggestion/',r=>r.fulfill({json:{status:'suggestion',purpose:'university',requiresConfirmation:true}}));
 await input.fill('I want to study for a masters degree.');await button.focus();await page.keyboard.press('Enter');await apply.waitFor({state:'visible'});
 await page.keyboard.press('Tab');assert.equal(await apply.evaluate(el=>el===document.activeElement),true);await page.keyboard.press('Enter');assert.equal(await purpose.inputValue(),'university');
});
await page.locator('[data-purpose-suggestion]').scrollIntoViewIfNeeded();await page.screenshot({path:out+'/en-mobile.png'});
assert.deepEqual(errors,[]);
rows.push({name:'page identity, nonblank content, no framework overlay, no page errors, desktop/mobile containment',status:'pass',title:await page.title()});
} finally {
 fs.writeFileSync(out+'/browser-results.json',JSON.stringify({browser:'Chrome via Playwright',reason:'Browser plugin not available',baseURL:'http://127.0.0.1:4321',rows,pageErrors:errors},null,2));await browser.close();
}
console.log(JSON.stringify(rows,null,2));
