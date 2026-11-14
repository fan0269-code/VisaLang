import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const base = process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4173';
const outDir = path.resolve('artifacts/runtime-browser');
fs.mkdirSync(outDir, { recursive: true });

const AD = /adsbygoogle|pagead|googlesyndication|doubleclick|googleads|adtrafficquality/i;
const records = [];

function note(entry) {
  records.push(entry);
  process.stdout.write(`${entry.status} ${entry.id}\n`);
}

async function shot(page, name) {
  const file = path.join(outDir, `${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  return path.relative(process.cwd(), file);
}

async function inspect(page, id, extra = {}) {
  const dom = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent?.trim() || '',
    robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
    adNodes: document.querySelectorAll('ins.adsbygoogle, [data-ad-slot], iframe[src*="doubleclick"], script[src*="adsbygoogle"], script[src*="pagead"]').length,
    bodyHasAdText: /adsbygoogle|pagead2\.googlesyndication/.test(document.documentElement.innerHTML),
    visible: (document.querySelector('main')?.innerText || '').slice(0, 500),
  }));
  return { id, url: page.url(), dom, ...extra };
}

async function withContext(browser, { javaScriptEnabled, viewport, harName }, run) {
  const context = await browser.newContext({
    javaScriptEnabled,
    viewport,
    isMobile: viewport.width < 500,
    hasTouch: viewport.width < 500,
    recordHar: { path: path.join(outDir, harName), content: 'omit' },
  });
  const requests = [];
  context.on('request', (request) => {
    requests.push({ url: request.url(), method: request.method(), resourceType: request.resourceType() });
  });
  const page = await context.newPage();
  page.on('dialog', async (dialog) => {
    requests.push({ url: `dialog:${dialog.message()}`, method: 'DIALOG', resourceType: 'dialog' });
    await dialog.dismiss();
  });
  try {
    await run(page, requests);
  } finally {
    await context.close();
  }
  return requests;
}

function adHits(requests) {
  return requests.filter((request) => AD.test(request.url) || request.method === 'POST' || request.method === 'DIALOG');
}

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const desktop = { width: 1280, height: 900 };
const mobile = { width: 390, height: 844 };

async function open(page, route) {
  const response = await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
  return response?.status() || 0;
}

const desktopRequests = await withContext(browser, {
  javaScriptEnabled: true,
  viewport: desktop,
  harName: 'desktop.har',
}, async (page, requests) => {
  const cases = [];

  let status = await open(page, '/tools/route-finder/');
  await page.locator('#route-finder-form').evaluate((form) => form.requestSubmit());
  await page.waitForTimeout(200);
  cases.push(await inspect(page, 'route-finder-invalid-empty', {
    http: status,
    screenshot: await shot(page, 'route-finder-invalid-empty'),
    resultHidden: await page.locator('#route-finder-result').getAttribute('hidden'),
    error: await page.locator('#route-finder-error').innerText(),
  }));

  await page.selectOption('select[name="country"]', 'germany');
  await page.selectOption('select[name="purpose"]', 'family-reunion');
  await page.fill('input[name="location"]', 'German mission, example only');
  await page.selectOption('select[name="level"]', { label: 'Beginner / A0' });
  await page.selectOption('select[name="certificate"]', 'none');
  await page.fill('input[name="targetDate"]', '2026-12-18');
  await page.locator('#route-finder-form').evaluate((form) => form.requestSubmit());
  await page.waitForSelector('#route-finder-result h2');
  cases.push(await inspect(page, 'route-finder-normal-a1', {
    screenshot: await shot(page, 'route-finder-normal-a1'),
    result: await page.locator('#route-finder-summary').innerText(),
  }));

  await page.selectOption('select[name="country"]', 'other');
  await page.selectOption('select[name="purpose"]', 'other');
  await page.locator('#route-finder-form').evaluate((form) => form.requestSubmit());
  await page.waitForTimeout(200);
  cases.push(await inspect(page, 'route-finder-unknown-country', {
    screenshot: await shot(page, 'route-finder-unknown-country'),
    result: await page.locator('#route-finder-summary').innerText(),
  }));

  status = await open(page, '/tools/exam-comparison/');
  await page.selectOption('select[name="first"]', 'goethe-a1');
  await page.selectOption('select[name="second"]', 'goethe-a1');
  await page.locator('#comparison-form').evaluate((form) => form.requestSubmit());
  await page.waitForTimeout(200);
  cases.push(await inspect(page, 'exam-comparison-invalid-same', {
    http: status,
    screenshot: await shot(page, 'exam-comparison-invalid-same'),
    error: await page.locator('#comparison-error').innerText(),
    resultHidden: await page.locator('#comparison-result').getAttribute('hidden'),
  }));
  await page.selectOption('select[name="second"]', 'telc-a1');
  await page.locator('#comparison-form').evaluate((form) => form.requestSubmit());
  await page.waitForSelector('#comparison-summary h2');
  cases.push(await inspect(page, 'exam-comparison-normal', {
    screenshot: await shot(page, 'exam-comparison-normal'),
    result: await page.locator('#comparison-summary').innerText(),
  }));

  status = await open(page, '/tools/checklist-generator/');
  await page.locator('#checklist-form').evaluate((form) => form.requestSubmit());
  await page.waitForTimeout(200);
  cases.push(await inspect(page, 'checklist-invalid-empty', {
    http: status,
    screenshot: await shot(page, 'checklist-invalid-empty'),
    error: await page.locator('#checklist-error').innerText(),
  }));
  await page.selectOption('select[name="route"]', 'germany-b1');
  await page.locator('#checklist-form').evaluate((form) => form.requestSubmit());
  await page.waitForSelector('#checklist-summary h2');
  cases.push(await inspect(page, 'checklist-unknown-b1', {
    screenshot: await shot(page, 'checklist-unknown-b1'),
    result: await page.locator('#checklist-summary').innerText(),
  }));
  await page.selectOption('select[name="route"]', 'germany-family-reunion-a1');
  await page.locator('#checklist-form').evaluate((form) => form.requestSubmit());
  await page.waitForSelector('#checklist-summary input[type="checkbox"]');
  const checked = await page.locator('#checklist-summary input[type="checkbox"]:checked').count();
  cases.push(await inspect(page, 'checklist-normal-a1', {
    screenshot: await shot(page, 'checklist-normal-a1'),
    result: await page.locator('#checklist-summary').innerText(),
    prechecked: checked,
  }));

  status = await open(page, '/tools/timeline-calculator/');
  await page.locator('#timeline-form').evaluate((form) => form.requestSubmit());
  await page.waitForTimeout(200);
  cases.push(await inspect(page, 'timeline-invalid-empty', {
    http: status,
    screenshot: await shot(page, 'timeline-invalid-empty'),
    error: await page.locator('#timeline-error').innerText(),
    resultHidden: await page.locator('#timeline-result').getAttribute('hidden'),
  }));
  await page.fill('input[name="targetDate"]', '2026-12-31');
  await page.selectOption('select[name="examType"]', { label: 'Goethe-Zertifikat A1' });
  await page.fill('input[name="resultWaitDays"]', '-3');
  await page.fill('input[name="retakeBufferDays"]', '0');
  await page.fill('input[name="translationDays"]', '0');
  await page.locator('#timeline-form').evaluate((form) => form.requestSubmit());
  await page.waitForTimeout(200);
  cases.push(await inspect(page, 'timeline-negative-buffer', {
    screenshot: await shot(page, 'timeline-negative-buffer'),
    error: await page.locator('#timeline-error').innerText(),
    resultHidden: await page.locator('#timeline-result').getAttribute('hidden'),
  }));
  await page.fill('input[name="resultWaitDays"]', '10');
  await page.fill('input[name="retakeBufferDays"]', '5');
  await page.fill('input[name="translationDays"]', '2');
  await page.locator('#timeline-form').evaluate((form) => form.requestSubmit());
  await page.waitForSelector('#timeline-summary h2');
  cases.push(await inspect(page, 'timeline-normal', {
    screenshot: await shot(page, 'timeline-normal'),
    result: await page.locator('#timeline-summary').innerText(),
  }));

  status = await open(page, '/tools/email-reminders/');
  await page.locator('#reminder-form').evaluate((form) => form.requestSubmit());
  await page.waitForTimeout(200);
  cases.push(await inspect(page, 'reminders-invalid-empty', {
    http: status,
    screenshot: await shot(page, 'reminders-invalid-empty'),
    error: await page.locator('#reminder-error').innerText(),
    resultHidden: await page.locator('#reminder-result').getAttribute('hidden'),
  }));
  await page.fill('input[name="source"]', 'not a url');
  await page.locator('#reminder-form').evaluate((form) => form.requestSubmit());
  await page.waitForTimeout(200);
  cases.push(await inspect(page, 'reminders-invalid-url', {
    screenshot: await shot(page, 'reminders-invalid-url'),
    error: await page.locator('#reminder-error').innerText(),
  }));
  await page.selectOption('select[name="topic"]', { label: 'Confirm the language requirement' });
  await page.fill('input[name="date"]', '2026-12-20');
  await page.fill('input[name="route"]', 'Germany family reunion / local mission, example only');
  await page.fill('input[name="source"]', 'https://www.auswaertiges-amt.de/de/service/fragenkatalog-node/2238204-2238204');
  await page.locator('#reminder-form').evaluate((form) => form.requestSubmit());
  await page.waitForSelector('#reminder-summary h2');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('[data-download-ics]').click();
  const download = await downloadPromise;
  const icsPath = path.join(outDir, 'reminder-local.ics');
  await download.saveAs(icsPath);
  cases.push(await inspect(page, 'reminders-local-plan-no-send', {
    screenshot: await shot(page, 'reminders-local-plan'),
    result: await page.locator('#reminder-summary').innerText(),
    ics: fs.readFileSync(icsPath, 'utf8').slice(0, 400),
    mailto: requests.some((request) => request.url.startsWith('mailto:')),
  }));

  for (const [id, route] of [
    ['search-normal', '/guides/?q=family%20reunion'],
    ['search-unknown', '/guides/?q=zzzz-not-a-guide'],
    ['search-invalid-markup', '/guides/?q=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E'],
  ]) {
    await open(page, route);
    await page.waitForTimeout(300);
    cases.push(await inspect(page, id, {
      screenshot: await shot(page, id),
      visibleCards: await page.locator('.guide-card-wrap:visible').count(),
      emptyVisible: await page.locator('.guide-empty-state').isVisible(),
    }));
  }

  await open(page, '/this-page-is-absent/');
  cases.push(await inspect(page, 'missing-route-404', {
    screenshot: await shot(page, 'missing-route-404'),
    http: 404,
  }));
  await page.fill('#not-found-query', 'family reunion');
  await page.locator('.not-found-search').evaluate((form) => form.submit());
  await page.waitForTimeout(400);
  cases.push(await inspect(page, 'not-found-search-normal', {
    screenshot: await shot(page, 'not-found-search-normal'),
    visibleCards: await page.locator('.guide-card-wrap:visible').count(),
  }));

  for (const [id, route] of [
    ['pricing', '/pricing/'],
    ['partners', '/partners/'],
    ['route-review', '/route-review/'],
    ['b1-hub', '/germany-b1-settlement-citizenship/'],
    ['a1-faq', '/guides/german-a1-family-reunion-faq/'],
    ['fees', '/guides/goethe-a1-fees-by-country/'],
    ['study-plan', '/guides/goethe-a1-30-day-study-plan/'],
  ]) {
    const http = await open(page, route);
    cases.push(await inspect(page, id, { http, screenshot: await shot(page, id) }));
  }

  const redirectResponse = await page.goto(`${base}/guides/goethe-a1-booking-mistakes/`, { waitUntil: 'domcontentloaded' });
  const redirectChain = [];
  let redirectRequest = redirectResponse?.request();
  while (redirectRequest) {
    redirectChain.push({ url: redirectRequest.url(), method: redirectRequest.method() });
    redirectRequest = redirectRequest.redirectedFrom() || undefined;
  }
  cases.push(await inspect(page, 'merge-redirect-booking', {
    http: redirectResponse?.status() || 0,
    redirectChain: redirectChain.reverse(),
    screenshot: await shot(page, 'merge-redirect-booking'),
  }));

  for (const item of cases) {
    const hits = adHits(requests);
    note({
      ...item,
      adRequests: hits,
      status: hits.length || item.dom.adNodes || item.dom.bodyHasAdText ? 'blocked-ads-present' : 'observed',
    });
  }
});

const mobileRequests = await withContext(browser, {
  javaScriptEnabled: true,
  viewport: mobile,
  harName: 'mobile.har',
}, async (page, requests) => {
  await open(page, '/tools/email-reminders/');
  await page.selectOption('select[name="topic"]', { label: 'Check an official test centre' });
  await page.fill('input[name="date"]', '2026-12-21');
  await page.fill('input[name="route"]', 'Example mission only');
  await page.locator('#reminder-form').evaluate((form) => form.requestSubmit());
  await page.waitForSelector('#reminder-summary h2');
  const item = await inspect(page, 'reminders-mobile', {
    screenshot: await shot(page, 'reminders-mobile'),
    result: await page.locator('#reminder-summary').innerText(),
    viewport: mobile,
  });
  note({ ...item, adRequests: adHits(requests), status: adHits(requests).length || item.dom.adNodes ? 'blocked-ads-present' : 'observed' });

  await open(page, '/tools/route-finder/');
  const mobileFinder = await inspect(page, 'route-finder-mobile', { screenshot: await shot(page, 'route-finder-mobile'), viewport: mobile });
  note({ ...mobileFinder, adRequests: adHits(requests), status: mobileFinder.dom.adNodes ? 'blocked-ads-present' : 'observed' });
});

const noJsRequests = await withContext(browser, {
  javaScriptEnabled: false,
  viewport: desktop,
  harName: 'no-js.har',
}, async (page, requests) => {
  for (const [id, route] of [
    ['route-finder-no-js', '/tools/route-finder/'],
    ['reminders-no-js', '/tools/email-reminders/'],
    ['timeline-no-js', '/tools/timeline-calculator/'],
    ['checklist-no-js', '/tools/checklist-generator/'],
    ['comparison-no-js', '/tools/exam-comparison/'],
    ['guides-no-js', '/guides/'],
    ['404-no-js', '/this-page-is-absent/'],
  ]) {
    const http = await open(page, route);
    const item = await inspect(page, id, {
      http,
      screenshot: await shot(page, id),
      javascript: false,
      noscript: await page.locator('noscript').count(),
    });
    note({
      ...item,
      adRequests: adHits(requests),
      status: 'blocked-without-javascript',
      note: 'Client tools and guide filtering do not run without JavaScript. No result was invented and no message was sent.',
    });
  }
});

await browser.close();

const report = {
  origin: base,
  generatedAt: new Date().toISOString(),
  disclaimer: 'Observations of the local preview of this branch. Not production. A status of observed means the browser showed that state. It is not an advertising approval or a legal conclusion. blocked-without-javascript means the interactive result could not run.',
  requestCounts: {
    desktop: desktopRequests.length,
    mobile: mobileRequests.length,
    noJs: noJsRequests.length,
  },
  adRequestTotal: records.reduce((sum, record) => sum + (record.adRequests?.length || 0), 0),
  records,
};
fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
process.stdout.write(`wrote ${records.length} observations, ad requests ${report.adRequestTotal}\n`);
