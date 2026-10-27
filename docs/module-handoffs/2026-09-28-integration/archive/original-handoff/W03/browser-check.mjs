import { chromium } from '/Users/a1-6/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import crypto from 'node:crypto';
const phase = process.argv[2] || 'before';
const root = 'docs/module-handoffs/2026-09-24-01/W03';
const origin = 'http://127.0.0.1:4353';
const browser = await chromium.launch({channel:'chrome',headless:true});
const rows = [];
for (const width of [375,390,768,1440]) {
  for (const [name,path] of [['en','/'],['zh','/zh/'],['routes','/routes/'],['tools','/tools/']]) {
    const height = width===375?812:width===390?844:width===768?1024:900;
    const context = await browser.newContext({viewport:{width,height}, deviceScaleFactor:1});
    await context.route('**/*', r => r.request().url().startsWith(origin) ? r.continue() : r.abort());
    const blockedRequests=[];context.on('requestfailed',r=>blockedRequests.push({url:r.url(),error:r.failure()?.errorText}));
    const page = await context.newPage();const errors=[];
    page.on('pageerror', e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    const response = await page.goto(origin+path);await page.evaluate(()=>document.fonts.ready);
    const screenshot = `${root}/screenshots/${phase}-${name}-${width}.png`;
    await page.screenshot({path:screenshot,fullPage:true});
    const firstViewport = `${root}/screenshots/${phase}-${name}-${width}-first.png`;
    if(name==='en'||name==='zh') await page.screenshot({path:firstViewport});
    const dom=await page.evaluate(()=>({title:document.title,viewport:{width:innerWidth,height:innerHeight},scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,h1:document.querySelector('h1')?.textContent,frameworkOverlay:!!document.querySelector('astro-error-overlay'),sections:[...document.querySelectorAll('main section')].map(e=>({label:e.getAttribute('aria-labelledby'),top:e.getBoundingClientRect().top})),stageLinks:[...document.querySelectorAll('.stage-card a')].map(a=>({text:a.textContent,href:a.getAttribute('href')})),mainLinks:[...document.querySelectorAll('main a')].map(a=>({text:a.textContent.trim(),href:a.getAttribute('href')})),overflowing:[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1||e.getBoundingClientRect().left< -1).slice(0,10).map(e=>({tag:e.tagName,cls:e.className}))}));
    rows.push({name,path,url:page.url(),status:response.status(),...dom,errors,blockedRequests,screenshot,screenshotSha256:crypto.createHash('sha256').update(fs.readFileSync(screenshot)).digest('hex'),...(name==='en'||name==='zh'?{firstViewport,firstViewportSha256:crypto.createHash('sha256').update(fs.readFileSync(firstViewport)).digest('hex')}: {})});
    await context.close();
  }
}
await browser.close();
fs.writeFileSync(`${root}/${phase}-browser.json`,JSON.stringify({phase,checkedAt:new Date().toISOString(),environment:'Local Chrome headless via Playwright; Browser plugin not available; CSS viewport simulation, not real devices/readers/production',rows},null,2)+'\n');
if(rows.some(r=>r.status!==200||!r.h1||r.frameworkOverlay||r.scrollWidth>r.viewport.width||r.overflowing.length||r.errors.length>r.blockedRequests?.length)) process.exitCode=1;
console.log(JSON.stringify(rows.map(r=>({name:r.name,width:r.viewport.width,status:r.status,overflow:r.scrollWidth>r.viewport.width,errors:r.errors})),null,2));
