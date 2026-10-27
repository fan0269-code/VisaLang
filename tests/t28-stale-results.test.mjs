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
