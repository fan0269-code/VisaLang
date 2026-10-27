import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
// Real-browser regression; point PLAYWRIGHT_MODULE at an available installation.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
const results = [];
try {
  for (const prefix of ['', '/zh']) {
    for (const tool of ['route-finder', 'exam-comparison', 'checklist-generator']) {
      if (tool === 'checklist-generator') await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${process.env.VISALANG_BASE_URL || 'http://127.0.0.1:4321'}${prefix}/tools/${tool}/`);
      await page.locator('form:not([inert])').waitFor();
      const values = tool === 'route-finder' ? {
        country: 'germany', purpose: 'family-reunion', applicationRegionId: 'germany-mission-china', relationship: 'spouse', certificate: 'none',
      } : tool === 'exam-comparison' ? {
        first: 'goethe-zertifikat-a1-start-deutsch-1', second: 'telc-start-deutsch-1-a1',
      } : { route: 'germany-family-reunion-a1' };
      const field = Object.keys(values)[0];
      for (const [name, value] of Object.entries(values)) await page.locator(`[name="${name}"]`).selectOption(value);
      await page.locator('form button[type="submit"]').click();
      const result = page.locator('.tool-result, .tool-result-panel').first();
      await result.waitFor();
      if (tool === 'checklist-generator') {
        const visibility = await page.evaluate(() => {
          const title = document.querySelector('#checklist-summary > h2');
          const header = document.querySelector('.global-header');
          if (!title || !header) throw new Error('Checklist title or sticky header is missing.');
          const titleRect = title.getBoundingClientRect();
          const headerRect = header.getBoundingClientRect();
          return {
            viewport: { width: window.innerWidth, height: window.innerHeight },
            scrollY: window.scrollY,
            focusedId: document.activeElement?.id || null,
            titleTop: titleRect.top,
            titleBottom: titleRect.bottom,
            headerBottom: headerRect.bottom,
          };
        });
        if (process.env.VISALANG_SCREENSHOT_DIR) {
          fs.mkdirSync(process.env.VISALANG_SCREENSHOT_DIR, { recursive: true });
          await page.screenshot({ path: `${process.env.VISALANG_SCREENSHOT_DIR}/${prefix ? 'zh' : 'en'}-checklist-result.png` });
        }
        results.push({ locale: prefix ? 'zh-CN' : 'en', tool, ...visibility });
        assert.equal(visibility.viewport.width, 390, 'checklist obstruction is measured at a 390 CSS-pixel viewport');
        assert.equal(visibility.focusedId, 'checklist-result', 'result container receives focus after generation');
        assert.ok(
          visibility.titleTop >= visibility.headerBottom,
          `${prefix ? 'zh-CN' : 'en'} checklist title is obscured: title top ${visibility.titleTop}px, sticky header bottom ${visibility.headerBottom}px, scrollY ${visibility.scrollY}px`,
        );
      }
      await page.locator(`[name="${field}"]`).selectOption('');
      await page.locator('form button[type="submit"]').click();
      const hidden = !await result.isVisible();
      const invalid = await page.locator(`[name="${field}"]`).getAttribute('aria-invalid');
      const focus = await page.evaluate(() => document.activeElement.name);
      await page.locator(`[name="${field}"]`).selectOption(values[field]);
      await page.locator('form button[type="submit"]').click();
      const recovered = await result.isVisible();
      results.push({ locale: prefix ? 'zh-CN' : 'en', tool, hidden, invalid, focus, field, recovered });
    }
  }
} finally {
  await browser.close();
}
if (process.env.VISALANG_RESULT_PATH) fs.writeFileSync(process.env.VISALANG_RESULT_PATH, JSON.stringify(results, null, 2) + '\n');
for (const row of results) {
  assert.equal(row.hidden, true, `${row.locale}/${row.tool}: invalid changed input hides prior result`);
  assert.equal(row.invalid, 'true');
  assert.equal(row.focus, row.field);
  assert.equal(row.recovered, true, 'valid resubmission recovers');
}
console.log('T28 stale-result browser regression passed (three tools, both languages).');
