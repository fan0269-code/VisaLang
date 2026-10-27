import assert from 'node:assert/strict';
import {
  chinesePillarSlugs,
  englishPillarSlugs,
  getCategoryPublicationPolicy,
  getChineseGuidePublicationPolicy,
  getEnglishGuidePublicationPolicy,
  guideRedirects,
  guideRedirectCandidates,
  noindexCategorySlugs,
} from '../src/data/publication-manifest.ts';

const expectedEnglishPillars = [
  'german-a1-documents-checklist',
  'german-a1-exam-booking-timeline',
  'german-family-reunion-language-requirement',
  'germany-b1-citizenship-language-proof',
  'germany-b1-leben-in-deutschland-and-language-proof',
  'germany-b1-settlement-citizenship-checklist',
  'germany-b1-settlement-citizenship-timeline',
  'goethe-a1-30-day-study-plan',
  'goethe-a1-fees-by-country',
  'goethe-a1-test-centers',
  'goethe-a1-vs-telc-a1',
  'goethe-b1-fees-and-booking',
  'goethe-b1-germany-settlement-work',
  'goethe-b1-study-plan',
  'goethe-b1-vs-telc-b1',
].sort();

const expectedChinesePillars = [
  'german-a1-exam-booking-timeline',
  'german-family-reunion-language-requirement',
  'goethe-a1-30-day-study-plan',
  'goethe-a1-test-centers',
  'goethe-a1-vs-telc-a1',
].sort();

const expectedNoindexCategories = [
  'canada', 'finland', 'france', 'germany-a1', 'germany-b1', 'germany-telc',
  'germany-testdaf', 'italy', 'netherlands', 'portugal', 'spain', 'uk',
].sort();

assert.deepEqual([...englishPillarSlugs].sort(), expectedEnglishPillars, 'publication manifest exposes exactly 15 English pillars');
assert.deepEqual([...chinesePillarSlugs].sort(), expectedChinesePillars, 'publication manifest exposes exactly 5 Chinese pillars');
assert.deepEqual([...noindexCategorySlugs].sort(), expectedNoindexCategories, 'all 12 guide categories are withheld from indexing');

const reviewedPillar = getEnglishGuidePublicationPolicy({
  slug: 'goethe-a1-test-centers',
  contentStatus: 'complete-route',
  sourceReviewStatus: 'reviewed',
});
assert.deepEqual(reviewedPillar, { disposition: 'pillar', index: true, sitemap: true, ads: true }, 'a reviewed English pillar is indexable and advertising eligible');

const matureRedirectSource = getEnglishGuidePublicationPolicy({
  slug: 'goethe-a1-booking-mistakes',
  contentStatus: 'complete-route',
  sourceReviewStatus: 'reviewed',
});
assert.deepEqual(matureRedirectSource, { disposition: 'retained', index: false, sitemap: false, ads: false }, 'a mature non-pillar redirect source fails closed before deletion');

const pendingPillar = getEnglishGuidePublicationPolicy({
  slug: 'goethe-a1-test-centers',
  contentStatus: 'complete-route',
  sourceReviewStatus: 'pending',
});
assert.deepEqual(pendingPillar, { disposition: 'pending', index: false, sitemap: false, ads: false }, 'a pillar without reviewed sources fails closed');
assert.deepEqual(getChineseGuidePublicationPolicy({
  slug: 'goethe-a1-test-centers',
  contentStatus: 'complete-route',
  sourceReviewStatus: 'reviewed',
}), { disposition: 'pillar', index: true, sitemap: true, ads: false }, 'a reviewed mature Chinese pillar remains indexable and advertising-free');
assert.deepEqual(getChineseGuidePublicationPolicy({
  slug: 'goethe-a1-test-centers',
  contentStatus: 'complete-route',
  sourceReviewStatus: 'pending',
}), { disposition: 'pending', index: false, sitemap: false, ads: false }, 'an allowlisted Chinese pillar with pending review fails closed');
assert.deepEqual(getChineseGuidePublicationPolicy({
  slug: 'goethe-a1-booking-mistakes',
  contentStatus: 'complete-route',
  sourceReviewStatus: 'reviewed',
}), { disposition: 'retained', index: false, sitemap: false, ads: false }, 'a Chinese merge source fails closed before deletion');
assert.deepEqual(getCategoryPublicationPolicy('germany-a1'), { disposition: 'category', index: false, sitemap: false, ads: false }, 'even mature Germany categories remain noindex and advertising-free');

const redirects = Object.entries(guideRedirects);
const expectedRedirects = {
  '/guides/german-a1-family-reunion-faq/': '/guides/german-family-reunion-language-requirement/',
  '/guides/goethe-a1-pre-booking-checklist/': '/guides/goethe-a1-test-centers/',
  '/guides/goethe-a1-booking-mistakes/': '/guides/goethe-a1-test-centers/',
  '/guides/goethe-a1-retake-policy/': '/guides/german-a1-exam-booking-timeline/',
  '/guides/goethe-a1-study-plan-working-adults/': '/guides/goethe-a1-30-day-study-plan/',
  '/guides/goethe-a1-official-links-practice-resources/': '/guides/goethe-a1-30-day-study-plan/',
  '/guides/goethe-a1-listening-practice/': '/guides/goethe-a1-30-day-study-plan/',
  '/guides/goethe-a1-speaking-topics/': '/guides/goethe-a1-30-day-study-plan/',
  '/guides/goethe-a1-writing-practice/': '/guides/goethe-a1-30-day-study-plan/',
  '/guides/goethe-b1-difficulty-analysis/': '/guides/goethe-b1-study-plan/',
  '/guides/goethe-b1-mock-exam-routine/': '/guides/goethe-b1-study-plan/',
  '/guides/goethe-b1-listening-deep-dive/': '/guides/goethe-b1-study-plan/',
  '/guides/goethe-b1-speaking-topics/': '/guides/goethe-b1-study-plan/',
  '/guides/goethe-b1-writing-assessment/': '/guides/goethe-b1-study-plan/',
  '/zh/guides/goethe-a1-germany-family-reunion/': '/zh/guides/german-family-reunion-language-requirement/',
  '/zh/guides/goethe-a1-booking-mistakes/': '/zh/guides/goethe-a1-test-centers/',
  '/zh/guides/german-a1-documents-checklist/': '/zh/guides/german-a1-exam-booking-timeline/',
};
assert.deepEqual(guideRedirectCandidates, expectedRedirects, 'publication manifest locks every approved source-to-target mapping after restoring English C07');
assert.equal(redirects.length, 0, 'publication manifest contains exactly 17 permanent guide redirects after restoring English C07');
assert.equal(new Set(redirects.map(([source]) => source)).size, redirects.length, 'redirect sources are unique');
for (const [source, target] of redirects) {
  assert.ok(source.endsWith('/') && target.endsWith('/'), `redirect keeps trailing slashes: ${source}`);
  assert.notEqual(source, target, `redirect cannot target itself: ${source}`);
  assert.ok(!(target in guideRedirects), `redirect target must not create a chain: ${source} -> ${target}`);
}

console.log('scheme 3 publication manifest rules passed');
