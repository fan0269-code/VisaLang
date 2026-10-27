const { chromium } = require('/Users/a1-6/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const width of [375, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width === 375 ? 812 : 900 } });
    const page = await context.newPage();
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
    for (const [name, pathname] of [['hub','/germany-b1-settlement-citizenship/'],['checklist','/guides/germany-b1-settlement-citizenship-checklist/'],['knowledge','/guides/germany-b1-leben-in-deutschland-and-language-proof/'],['timeline','/guides/germany-b1-settlement-citizenship-timeline/'],['study','/guides/goethe-b1-study-plan/']]) {
      await page.goto('http://127.0.0.1:4321'+pathname);
      await page.waitForLoadState('networkidle');
      const dimensions=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,overflowing:[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1||e.getBoundingClientRect().left < -1).slice(0,10).map(e=>({tag:e.tagName,cl:e.className,text:e.textContent.slice(0,80)}))}));
      results.push({name,url:page.url(),title:await page.title(),width,headings:await page.locator('h1').count(),...dimensions,errors:[...errors]});
      await page.screenshot({path:`/private/tmp/visalang-m4-20260913/${name}-${width}.png`,fullPage:false});
      if(name==='study'){
        await page.getByRole('heading', {name:'Original asset: writing revision — change a meeting',exact:true}).scrollIntoViewIfNeeded();
        await page.screenshot({path:`/private/tmp/visalang-m4-20260913/study-writing-${width}.png`,fullPage:false});
        const worksheet = page.getByRole('region',{name:'Diagnosis and retest worksheet',exact:true});
        await worksheet.scrollIntoViewIfNeeded();await worksheet.focus();
        await page.keyboard.press('ArrowRight');
        results.push({name:'worksheet keyboard scroll',width,focused:await worksheet.evaluate(e=>e===document.activeElement),scrollLeft:await worksheet.evaluate(e=>e.scrollLeft)});
        await page.screenshot({path:`/private/tmp/visalang-m4-20260913/study-worksheet-${width}.png`,fullPage:false});
      }
      if(name==='hub'){
        await page.locator('[data-b1-route="citizenship"] a').filter({hasText:/checklist/i}).click();
        if(!page.url().endsWith('#citizenship-checklist'))throw Error('citizenship destination missing');
        const anchor=page.locator('#citizenship-checklist');await anchor.scrollIntoViewIfNeeded();
        await page.screenshot({path:`/private/tmp/visalang-m4-20260913/citizenship-checklist-${width}.png`,fullPage:false});
        results.push({name:'citizenship navigation',width,url:page.url(),anchorExists:await anchor.count()});
      }
    }
    await context.close();
  }
  fs.writeFileSync('/private/tmp/visalang-m4-20260913/t24-browser.json',JSON.stringify(results,null,2)+'\n');
  await browser.close();
  console.log(JSON.stringify(results,null,2));
  if(results.some(r=>r.errors?.length||r.headings&&r.headings!==1||r.scrollWidth>r.width))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
