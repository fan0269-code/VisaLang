import assert from 'node:assert/strict';
import fs from 'node:fs';

const {
  examCentreRoutes,
  getLocalFeeSchedule,
  localExamFeeRecords,
} = await import('../src/data/claim-registry.ts');
const {
  englishPillarSlugs,
  getEnglishGuidePublicationPolicy,
} = await import('../src/data/publication-manifest.ts');

const expectedFees = [
  ['goethe-germany-2026-regular-adult', 'goethe-germany', 'regular-adult', 155, 'EUR'],
  ['goethe-germany-2026-course-participant', 'goethe-germany', 'course-participant', 124, 'EUR'],
  ['goethe-beijing-2026-current-learner', 'goethe-beijing', 'current-learner', 1400, 'CNY'],
  ['goethe-beijing-2026-non-current-learner', 'goethe-beijing', 'non-current-learner', 1500, 'CNY'],
];

assert.deepEqual(
  localExamFeeRecords.map((record) => [record.id, record.scopeId, record.candidateCategory.id, record.amount, record.currency]),
  expectedFees,
  'T12 publishes exactly four source-reviewed Goethe A1 numeric fee records',
);

for (const record of localExamFeeRecords) {
  assert.equal(record.examProductId, 'goethe-zertifikat-a1-start-deutsch-1', `${record.id} stays on the exact adult A1 product`);
  assert.equal(record.priceYear, 2026, `${record.id} records the source price year`);
  assert.equal(record.sourceCheckedAt, '2026-10-06', `${record.id} records the actual source check`);
  assert.equal(record.nextReviewAt, '2026-11-06', `${record.id} records the next local fee review`);
  assert.equal(record.status, 'verified', `${record.id} is explicitly source-reviewed`);
  assert.ok(Number.isFinite(record.amount) && record.amount > 0, `${record.id} has a non-zero numeric amount`);
  assert.ok(record.candidateCategory.label && record.candidateCategory.eligibilityBoundary, `${record.id} preserves the category and its eligibility boundary`);
  assert.match(record.source.url, /^https:\/\/www\.goethe\.de\//, `${record.id} cites Goethe directly`);
  assert.ok(record.source.owner && record.source.locator && record.source.supports && record.source.boundary, `${record.id} records atomic source support and boundary`);
  assert.ok(record.boundary && record.confirmationAction && record.claimRef.claimId && record.claimRef.version, `${record.id} records use and recheck boundaries`);
  for (const forbiddenKey of ['exchangeRate', 'convertedAmount', 'combinedAmount', 'availability', 'seatAvailable', 'cheapestRank']) {
    assert.equal(Object.hasOwn(record, forbiddenKey), false, `${record.id} does not encode ${forbiddenKey}`);
  }
}

const germany = getLocalFeeSchedule({
  productId: 'goethe-zertifikat-a1-start-deutsch-1',
  scopeId: 'goethe-germany',
  asOf: '2026-10-06',
});
assert.equal(germany.status, 'verified', 'the current Germany schedule resolves');
assert.deepEqual(germany.records.map((record) => record.currency), ['EUR', 'EUR'], 'Germany returns only its original EUR records');
assert.equal(germany.conversionApplied, false, 'Germany fees are not currency-converted');

const beijing = getLocalFeeSchedule({
  productId: 'goethe-zertifikat-a1-start-deutsch-1',
  scopeId: 'goethe-beijing',
  asOf: '2026-10-06',
});
assert.equal(beijing.status, 'verified', 'the current Beijing schedule resolves');
assert.deepEqual(beijing.records.map((record) => record.currency), ['CNY', 'CNY'], 'Beijing returns only its original CNY records');
assert.equal(beijing.conversionApplied, false, 'Beijing fees are not currency-converted');

const unknown = getLocalFeeSchedule({
  productId: 'goethe-zertifikat-a1-start-deutsch-1',
  scopeId: 'another-location',
  asOf: '2026-09-09',
});
assert.deepEqual(unknown.records, [], 'an unknown location returns no numeric fee');
assert.equal(unknown.status, 'needs_authority_confirmation', 'an unknown location fails closed');
assert.equal(unknown.amount, null, 'an unknown location keeps amount null');
assert.match(unknown.confirmationAction, /selected official or authorised.*centre/i, 'the fallback sends the reader to the selected centre');

const mutateFeeRecords = (changes) => localExamFeeRecords.map((record) => ({
  ...record,
  ...changes(record),
}));
for (const [label, records] of [
  ['overdue fee-record review', mutateFeeRecords(() => ({ nextReviewAt: '2026-09-08' }))],
  ['future fee-record source check', mutateFeeRecords(() => ({ sourceCheckedAt: '2026-10-07' }))],
  ['stale fee-record version', mutateFeeRecords(() => ({ version: '2026-01-01.1' }))],
  ['mismatched fee-record source', mutateFeeRecords((record) => ({ source: { ...record.source, url: 'https://example.invalid/stale' } }))],
  ['malformed fee-record source check', mutateFeeRecords(() => ({ sourceCheckedAt: '2026-02-30' }))],
  ['malformed fee-record review date', mutateFeeRecords(() => ({ nextReviewAt: '2026-02-30' }))],
  ['expired fee-record interval', mutateFeeRecords(() => ({ effectiveTo: '2026-09-08' }))],
  ['mismatched centre identity', mutateFeeRecords(() => ({ scopeType: 'named-institute' }))],
]) {
  assert.equal(
    getLocalFeeSchedule({
      productId: 'goethe-zertifikat-a1-start-deutsch-1',
      scopeId: 'goethe-germany',
      asOf: '2026-10-06',
    }, { records }).status,
    'needs_authority_confirmation',
    `${label} fails closed before rendering stale numeric amounts`,
  );
}

assert.deepEqual(examCentreRoutes.map((route) => route.id), ['goethe-germany', 'goethe-beijing'], 'only Germany and Beijing have scoped local entry routes');
for (const route of examCentreRoutes) {
  assert.match(route.officialUrl, /^https:\/\/www\.goethe\.de\//, `${route.id} has an official deep link`);
  assert.equal(route.sourceCheckedAt, '2026-09-09', `${route.id} records the source check`);
  assert.ok(route.verificationAction && route.boundary, `${route.id} has a reader action and boundary`);
  assert.equal(Object.hasOwn(route, 'availability'), false, `${route.id} does not claim availability`);
  assert.equal(Object.hasOwn(route, 'seatAvailable'), false, `${route.id} does not claim a seat`);
}

const feeGuide = fs.readFileSync('src/content/guides/goethe-a1-fees-by-country.md', 'utf8');
const guideLayout = fs.readFileSync('src/layouts/GuideLayout.astro', 'utf8');
const feeComponent = fs.existsSync('src/components/LocalExamFeeTable.astro')
  ? fs.readFileSync('src/components/LocalExamFeeTable.astro', 'utf8')
  : '';
assert.match(guideLayout, /LocalExamFeeTable[^\n]*locale="en"/, 'the fee guide renderer consumes the validated local-fee registry');
assert.match(feeComponent, /getLocalFeeSchedule/, 'the rendered fee table uses the fail-closed schedule API');
assert.doesNotMatch(feeGuide, /€155|€124|¥1,400|¥1,500|EUR 155|EUR 124|CNY 1,400|CNY 1,500/, 'the fee guide does not duplicate source-controlled numeric amounts outside the registry');
for (const amount of ['155', '124', '1400', '1500']) {
  assert.doesNotMatch(feeComponent, new RegExp(`\\b${amount}\\b`), `the fee component derives ${amount} from the registry instead of hard-coding it`);
}
assert.match(feeGuide, /No currency conversion/i, 'the guide prohibits cross-currency conversion');
assert.match(feeGuide, /Unverified — check the selected centre/i, 'every other location has an explicit fail-closed fallback');
assert.match(feeGuide, /Status:\*{0,2}\s*needs authority confirmation/i, 'the unknown fee branch exposes an explicit status');
assert.match(feeGuide, /Owner:\*{0,2}\s*selected official or authorised test centre/i, 'the unknown fee branch names the deciding owner');
assert.match(feeGuide, /Action:\*{0,2}[^\n]*selected official or authorised test centre/i, 'the unknown fee branch gives a reader action');
assert.match(feeGuide, /Boundary:\*{0,2}[^\n]*not a Germany or Beijing fee/i, 'the unknown fee branch states its boundary');
assert.match(feeComponent, /Status:/, 'the fee component fallback exposes an explicit status');
assert.match(feeComponent, /Owner:/, 'the fee component fallback names the owner');
assert.match(feeComponent, /Action:/, 'the fee component fallback gives a reader action');
assert.match(feeComponent, /Boundary:/, 'the fee component fallback states its boundary');
assert.match(feeGuide, /^## Unfilled budget worksheet$/m, 'the fee guide provides a blank cost worksheet instead of invented totals');
assert.match(feeGuide, /does not prove.*seat|does not.*guarantee.*seat/i, 'the fee guide does not turn a price into a seat claim');

assert.equal(getLocalFeeSchedule({
  productId: 'goethe-zertifikat-a1-start-deutsch-1',
  scopeId: 'goethe-germany',
  asOf: '2026-11-07',
}).status, 'needs_authority_confirmation', 'an overdue fee claim fails closed in the same API used by the rendered table');

const englishCentreGuide = fs.readFileSync('src/content/guides/goethe-a1-test-centers.md', 'utf8');
const chineseCentreGuide = fs.readFileSync('src/pages/zh/guides/goethe-a1-test-centers.astro', 'utf8');
assert.match(englishCentreGuide, /Germany fee route[\s\S]{0,1200}Beijing fee route/i, 'the English centre guide gives reproducible Germany and Beijing official paths');
assert.match(englishCentreGuide, /Beijing[^.]{0,180}not (?:a )?China-wide/i, 'the English centre guide limits Beijing evidence to Beijing');
assert.match(chineseCentreGuide, /北京[^。]{0,140}不代表全中国|北京[^。]{0,140}不能外推.*全中国/, 'the Chinese centre guide limits Beijing evidence to Beijing');

assert.equal(englishPillarSlugs.length, 15, 'the fee guide is the sole new English primary-discovery candidate');
assert.ok(englishPillarSlugs.includes('goethe-a1-fees-by-country'), 'the fee guide is in the English primary-discovery allowlist');
assert.deepEqual(
  getEnglishGuidePublicationPolicy({
    slug: 'goethe-a1-fees-by-country',
    contentStatus: 'complete-route',
    sourceReviewStatus: 'reviewed',
    adsEligible: false,
  }),
  { disposition: 'pillar', index: true, sitemap: true, ads: false },
  'the fee guide is indexable and in the sitemap but remains ad-free',
);

console.log('M2-A local fee, centre route and publication contracts passed');
