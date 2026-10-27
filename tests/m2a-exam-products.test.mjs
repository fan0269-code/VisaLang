import assert from 'node:assert/strict';
import fs from 'node:fs';

const { claimRegistry, examProducts } = await import('../src/data/claim-registry.ts');
const routeTools = await import('../src/data/route-tools.ts');
const { compareExamProducts } = routeTools;

const expectedProductIds = [
  'goethe-zertifikat-a1-start-deutsch-1',
  'telc-start-deutsch-1-a1',
];

assert.deepEqual(
  examProducts.filter((product) => product.level === 'A1').map((product) => product.id),
  expectedProductIds,
  'M2-A retains exactly its two source-reviewed adult A1 products',
);
assert.equal('examComparisonDimensions' in routeTools, false, 'the retired shared-placeholder comparison API is not exposed beside the sourced product model');

const requiredFactIds = [
  'written-structure-and-duration',
  'oral-format-and-duration',
  'score-rule',
  'whole-or-partial-sitting',
];

for (const product of examProducts.filter((product) => product.level === 'A1')) {
  assert.equal(product.level, 'A1', `${product.id} remains in the approved A1-only scope`);
  assert.match(product.officialUrl, /^https:\/\//, `${product.id} has a direct official product URL`);
  assert.match(product.officialPracticeUrl, /^https:\/\//, `${product.id} has an official practice route`);
  assert.equal(product.sourceCheckedAt, '2026-09-09', `${product.id} records the current product check`);
  assert.deepEqual(
    product.comparisonFacts.map((fact) => fact.id),
    requiredFactIds,
    `${product.id} exposes the same independently sourced comparison dimensions`,
  );
  for (const fact of product.comparisonFacts) {
    assert.equal(fact.status, 'verified', `${product.id}/${fact.id} is explicitly verified`);
    assert.ok(fact.value, `${product.id}/${fact.id} has a product-specific value`);
    assert.equal(fact.sourceCheckedAt, '2026-09-09', `${product.id}/${fact.id} records when its source was checked`);
    assert.match(fact.source.publisher, product.examOwner === 'Goethe-Institut' ? /Goethe/i : /telc/i, `${product.id}/${fact.id} cites its exam owner`);
    assert.match(fact.source.url, /^https:\/\//, `${product.id}/${fact.id} cites a direct HTTPS source`);
    assert.ok(fact.source.locator && fact.source.supports && fact.source.boundary, `${product.id}/${fact.id} records support and boundary`);
  }
  assert.match(product.localExecutionBoundary, /selected.*centre|local.*centre/i, `${product.id} keeps local execution with the selected centre`);
}

const comparison = compareExamProducts(expectedProductIds[0], expectedProductIds[1]);
assert.equal(comparison.status, 'ready', 'two supported, different products produce a comparison');
assert.equal(comparison.rows.length, requiredFactIds.length, 'the comparison renders each sourced field independently');
assert.equal(comparison.localRows.length, 3, 'the comparison keeps local execution, fees, and authority acceptance as explicit per-product unknowns');
assert.ok(
  comparison.rows.some((row) => row.firstValue !== row.secondValue),
  'the product columns contain at least one real, source-backed difference',
);
for (const row of comparison.rows) {
  assert.ok(row.firstValue && row.secondValue, `${row.id} does not replace both columns with one shared reminder`);
  assert.match(row.firstSourceUrl, /^https:\/\//, `${row.id} exposes the first product source`);
  assert.match(row.secondSourceUrl, /^https:\/\//, `${row.id} exposes the second product source`);
}
for (const row of comparison.localRows) {
  assert.equal(row.firstStatus, 'needs_authority_confirmation', `${row.id} keeps the first product local field unresolved`);
  assert.equal(row.secondStatus, 'needs_authority_confirmation', `${row.id} keeps the second product local field unresolved`);
  assert.ok(row.firstOwner && row.secondOwner && row.firstValue && row.secondValue && row.firstAction && row.secondAction && row.firstBoundary && row.secondBoundary, `${row.id} exposes an owner, action, and boundary in both columns`);
  assert.equal(row.firstSourceUrl, null, `${row.id} does not invent a first-product local source`);
  assert.equal(row.secondSourceUrl, null, `${row.id} does not invent a second-product local source`);
}

const needsReviewProducts = examProducts.map((product, index) => index === 0 ? { ...product, status: 'needs_review' } : product);
assert.equal(
  compareExamProducts(expectedProductIds[0], expectedProductIds[1], { products: needsReviewProducts, claims: claimRegistry, asOf: '2026-09-09' }).status,
  'unsupported',
  'a product lifecycle mutation fails closed before any consumer renders its facts',
);
const needsReviewClaims = claimRegistry.map((claim) => claim.claimId === examProducts[0].productClaim.claimId ? { ...claim, status: 'needs_review' } : claim);
assert.equal(
  compareExamProducts(expectedProductIds[0], expectedProductIds[1], { products: examProducts, claims: needsReviewClaims, asOf: '2026-09-09' }).status,
  'unsupported',
  'a referenced claim lifecycle mutation fails closed',
);
assert.equal(
  compareExamProducts(expectedProductIds[0], expectedProductIds[1], { products: examProducts, claims: claimRegistry, asOf: '2026-12-10' }).status,
  'unsupported',
  'an overdue product claim fails closed instead of rendering stale facts',
);

assert.deepEqual(
  compareExamProducts(expectedProductIds[0], expectedProductIds[0]),
  {
    status: 'same_product',
    message: 'Choose two different exam products. A product cannot be compared with itself.',
  },
  'the same exam cannot produce a pseudo-comparison',
);
assert.equal(compareExamProducts('unknown', expectedProductIds[0]).status, 'unsupported', 'unknown products fail closed');

const comparisonPage = fs.readFileSync('src/pages/tools/exam-comparison.astro', 'utf8');
assert.ok(comparisonPage.includes('compareExamProducts'), 'the comparison page consumes the centralized product comparison');
assert.match(comparisonPage, /\.firstValue/, 'the page renders the first product value independently');
assert.match(comparisonPage, /\.secondValue/, 'the page renders the second product value independently');
assert.ok(!comparisonPage.includes('sharedCell.colSpan = 2'), 'the page no longer presents one shared reminder as a product comparison');
assert.match(comparisonPage, /\.firstSourceUrl/, 'the first product fact links to its official source');
assert.match(comparisonPage, /\.secondSourceUrl/, 'the second product fact links to its official source');
assert.match(comparisonPage, /comparison\.localRows\.forEach/, 'the interactive result renders every local and authority unknown row');
for (const field of ['firstStatus', 'secondStatus', 'firstOwner', 'secondOwner', 'firstAction', 'secondAction', 'firstBoundary', 'secondBoundary']) {
  assert.ok(comparisonPage.includes(`fact.${field}`), `the interactive result renders ${field} instead of hiding its unresolved state`);
}

const englishGuide = fs.readFileSync('src/content/guides/goethe-a1-vs-telc-a1.md', 'utf8');
const chineseGuide = fs.readFileSync('src/pages/zh/guides/goethe-a1-vs-telc-a1.astro', 'utf8');
const guideLayout = fs.readFileSync('src/layouts/GuideLayout.astro', 'utf8');
const comparisonComponent = fs.existsSync('src/components/ExamProductComparisonTable.astro')
  ? fs.readFileSync('src/components/ExamProductComparisonTable.astro', 'utf8')
  : '';
for (const [label, guide] of [['English', englishGuide], ['Chinese', chineseGuide]]) {
  assert.ok(guide.includes('Goethe-Zertifikat A1: Start Deutsch 1'), `${label} guide names the exact Goethe adult product`);
  assert.ok(guide.includes('Start Deutsch 1 / telc Deutsch A1'), `${label} guide names the exact telc adult product`);
  assert.ok(guide.includes('Durchfuehrungsbestimmungen_A1_Start_Deutsch_1.pdf'), `${label} guide cites the Goethe administration terms`);
  assert.ok(guide.includes('20210103_5070-b00-010106_web_1.pdf'), `${label} guide cites the official telc mock scoring source`);
  assert.ok(guide.includes('2026-09-09'), `${label} guide records the current product-source check date`);
}
assert.match(guideLayout, /ExamProductComparisonTable[^\n]*locale="en"/, 'the English guide renderer consumes the validated product registry');
assert.match(chineseGuide, /ExamProductComparisonTable[^\n]*locale="zh-CN"/, 'the Chinese guide consumes the same validated product records with localized expression');
assert.match(comparisonComponent, /compareExamProducts/, 'the shared rendered table fails closed through the validated comparison API');
assert.doesNotMatch(englishGuide, /65 minutes|45-minute|60 of 100|36 of 60/i, 'the English guide does not duplicate source-controlled product values outside the registry');
assert.doesNotMatch(chineseGuide, /65 分钟|45 分钟|60\/100|36\/60/, 'the Chinese guide does not duplicate source-controlled product values outside the registry');

console.log('M2-A exam product and comparison contracts passed');
