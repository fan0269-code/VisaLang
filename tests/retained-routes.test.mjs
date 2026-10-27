import assert from 'node:assert/strict';
import fs from 'node:fs';
import { guideRedirects, getEnglishGuidePublicationPolicy, getChineseGuidePublicationPolicy } from '../src/data/publication-manifest.ts';
const historical = JSON.parse(fs.readFileSync('docs/VISALANG_M3_T23_MIGRATION_CANDIDATE_ROLLBACK_MAP_2026-09-11.md','utf8').match(/<!-- M3_T23_MACHINE_RECORD_START -->\s*```json\s*([\s\S]*?)\s*```/)[1]);
assert.equal(historical.records.length,17);
for (const r of historical.records) {
  assert.equal(guideRedirects[r.sourceUrl],undefined,`${r.sourceUrl} must not redirect`);
  assert.ok(fs.existsSync(r.preservedSourcePath),`${r.sourceUrl} has a maintained source`);
  assert.ok(!fs.readFileSync('public/_redirects','utf8').split('\n').some(l=>l.startsWith(`${r.sourceUrl} `)),`${r.sourceUrl} has no active redirect`);
  const policy=(r.sourceUrl.startsWith('/zh/')?getChineseGuidePublicationPolicy:getEnglishGuidePublicationPolicy)({slug:r.sourceUrl.split('/').at(-2),contentStatus:'complete-route',sourceReviewStatus:'reviewed'});
  assert.deepEqual(policy,{disposition:'retained',index:false,sitemap:false,ads:false});
  if (process.argv.includes('--built')) {
    const html=fs.readFileSync(`dist${r.sourceUrl}index.html`,'utf8');
    assert.match(html,new RegExp(`rel="canonical" href="https://visalang.org${r.sourceUrl}"`));
    assert.match(html,/noindex/);
    assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1);
    assert.ok(!html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'));
    assert.ok(!/http-equiv=["']refresh/i.test(html));
  }
}
console.log('17 retained historical routes pass source/publication checks');
