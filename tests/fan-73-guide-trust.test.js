const assert = require('node:assert/strict');
const fs = require('node:fs');

const guideIndex = fs.readFileSync('src/pages/guides/index.astro', 'utf8');
const guideLayout = fs.readFileSync('src/layouts/GuideLayout.astro', 'utf8');
const zhGuideData = fs.readFileSync('src/data/zh-germany-a1.ts', 'utf8');
const css = fs.readFileSync('src/styles/global.css', 'utf8');
const { getPrimaryDiscoveryZhGuides } = require('../src/data/guide-library.ts');

assert.equal(
  (zhGuideData.match(/sourceReviewStatus: 'reviewed'/g) || []).length,
  8,
  'the Chinese Germany A1 data keeps all eight completed source reviews',
);
assert.match(guideIndex, /const zhGuides = getPrimaryDiscoveryZhGuides\(zhGermanyA1Guides\)/, 'Chinese guide list uses the shared primary-discovery normalizer');
assert.match(
  fs.readFileSync('src/data/guide-library.ts', 'utf8'),
  /\.filter\(\(guide\) => isGuidePrimaryDiscoveryEligible\(guide\.status, guide\.sourceReviewStatus\)\)/,
  'Chinese library applies the shared primary-discovery gate after normalization',
);
const discoveryFixture = [
  { slug: 'reviewed-newer', contentStatus: 'complete-route', sourceReviewStatus: 'reviewed', updatedDate: '2026-07-20' },
  { slug: 'pending', contentStatus: 'complete-route', sourceReviewStatus: 'pending', updatedDate: '2026-07-21' },
  { slug: 'missing', contentStatus: 'complete-route', updatedDate: '2026-07-22' },
  { slug: 'reviewed-older', contentStatus: 'core-route', sourceReviewStatus: 'reviewed', updatedDate: '2026-07-19' },
];
assert.deepEqual(
  getPrimaryDiscoveryZhGuides(discoveryFixture).map((guide) => guide.slug),
  ['reviewed-newer', 'reviewed-older'],
  'pending and missing-status Chinese records stay outside cards, counts, and JSON-LD while reviewed records retain date sorting',
);
assert.match(guideIndex, /const totalGuideCount = guides\.length \+ zhGuides\.length/, 'guide count uses the filtered Chinese collection');
assert.match(guideIndex, /\.\.\.zhGuides\.map\(/, 'JSON-LD uses the filtered Chinese collection');
for (const binding of [
  'status={guide.status}',
  'data-updated={guide.updatedDate}',
  'updatedDate={guide.updatedDate}',
  'sourceReviewedAt={guide.sourceReviewedAt}',
  'sourceReviewStatus={guide.sourceReviewStatus}',
  'readingTime={guide.readingTime}',
]) {
  assert.ok(guideIndex.includes(binding), `Chinese library cards use controlled metadata: ${binding}`);
}
assert.ok(
  guideIndex.includes("b.dataset.updated.localeCompare(a.dataset.updated)"),
  'the default library ordering compares each card controlled updated date',
);
assert.doesNotMatch(
  guideIndex,
  /data-updated="2026-07-09"[\s\S]*sourceReviewStatus="pending"[\s\S]*readingTime="6"/,
  'Chinese library cards do not reuse the legacy hard-coded trust metadata',
);

assert.match(
  guideLayout,
  /<section class="guide-summary-box"[\s\S]*?<p class="guide-summary-answer">\{description\}<\/p>/,
  'Direct answer keeps one answer container without a nested emphasized callout',
);
assert.match(
  guideLayout,
  /<p class="guide-summary-responsibility">Responsibility:/,
  'Direct answer exposes a scan-friendly responsibility line',
);

for (const contract of [
  'display: inline-flex;\n  min-height: 44px;\n  align-items: center;\n  padding: 6px 12px;',
  '.nav-menu__disclosure > summary { min-width: 44px;',
  '.mobile-navigation > summary {\n  display: flex;\n  min-height: 44px;',
  '.filter-drawer > summary {\n  width: fit-content;\n  min-height: 44px;',
  '.od-guide-library .active-filter-chip { min-height: 44px;',
]) {
  assert.ok(css.includes(contract), `interactive hit-area contract is present: ${contract}`);
}
assert.match(
  css,
  /@media \(max-width: 768px\)[\s\S]*?\.report-outdated \{ align-items: stretch; flex-direction: column; \}[\s\S]*?\.report-outdated \.button \{ width: 100%; white-space: normal; \}/,
  'the report-outdated recovery CTA stacks and wraps before the 390px failure range',
);

console.log('FAN-73 guide trust and interaction contract passed');
