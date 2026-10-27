import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  englishPillarSlugs,
  chinesePillarSlugs,
  noindexCategorySlugs,
  guideRedirects,
} from '../src/data/publication-manifest.ts';

const source = fs.readFileSync('docs/CONTENT_MAP.md', 'utf8');
const current = source.match(/<!-- SCHEME-3-CURRENT-START -->([\s\S]*?)<!-- SCHEME-3-CURRENT-END -->/)?.[1] || '';

assert.ok(current, 'CONTENT_MAP has one bounded current Scheme 3 snapshot');
assert.match(current, /Updated:\s*2026-09-22/);
assert.match(current, /VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01\.md/);
assert.match(current, /15 English pillars/);
assert.match(current, /5 Chinese pillars/);
assert.match(current, /38 non-pillar English guides/);
assert.match(current, /12 noindex categories/);
assert.match(current, /17 retained supporting URLs/);
assert.match(current, /41 sitemap URLs/);
assert.match(current, /65 noindex pages/);
assert.match(current, /14 ad-enabled pages/);

for (const slug of englishPillarSlugs) assert.match(current, new RegExp(`\\b${slug}\\b`), `English pillar is mapped: ${slug}`);
for (const slug of chinesePillarSlugs) assert.match(current, new RegExp(`\\b${slug}\\b`), `Chinese pillar is mapped: ${slug}`);
assert.equal(noindexCategorySlugs.length, 12);
assert.equal(Object.keys(guideRedirects).length, 0);

console.log('Scheme 3 content-map snapshot passed.');
