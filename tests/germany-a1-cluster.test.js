const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const guideDirectory = 'src/content/guides';
const germanyA1Guides = fs.readdirSync(guideDirectory)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => fs.readFileSync(path.join(guideDirectory, file), 'utf8').includes('category: "germany-a1"'));
const hub = fs.readFileSync('src/pages/germany-family-reunion-a1.astro', 'utf8');
const zhHub = fs.readFileSync('src/pages/zh/germany-family-reunion-a1.astro', 'utf8');
const zhData = fs.readFileSync('src/data/zh-germany-a1.ts', 'utf8');
const zhGuideSources = fs.readdirSync('src/pages/zh/guides')
  .filter((file) => file.endsWith('.astro'))
  .map((file) => fs.readFileSync(path.join('src/pages/zh/guides', file), 'utf8'))
  .join('\n');

assert.equal(germanyA1Guides.length, 17, 'Germany A1 cluster should retain its 16 guides and add only the missing writing intent');
assert.ok(germanyA1Guides.includes('goethe-a1-writing-practice.md'), 'Germany A1 cluster should cover the unique writing-practice intent');

const requiredHubSteps = [
  "title: 'Confirm whether A1 applies'",
  "title: 'Confirm the accepted proof'",
  "title: 'Compare exam options'",
  "title: 'Verify centre and booking'",
  "title: 'Build the timeline'",
  "title: 'Prepare documents and exam'",
  "title: 'Recheck before submission'",
];
let previousStepIndex = -1;
for (const step of requiredHubSteps) {
  const stepIndex = hub.indexOf(step);
  assert.ok(stepIndex > previousStepIndex, `Hub should place ${step} in the decision order`);
  previousStepIndex = stepIndex;
}

const requiredRouteGuideOrder = [
  'german-family-reunion-language-requirement',
  'goethe-a1-germany-family-reunion',
  'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers',
  'goethe-a1-pre-booking-checklist',
  'german-a1-exam-booking-timeline',
  'german-a1-documents-checklist',
  'goethe-a1-official-links-practice-resources',
  'goethe-a1-30-day-study-plan',
];
let previousRouteGuideIndex = -1;
for (const slug of requiredRouteGuideOrder) {
  const routeGuideIndex = hub.indexOf(`'${slug}'`);
  assert.ok(routeGuideIndex > previousRouteGuideIndex, `Hub should place ${slug} in the explicit main-route order`);
  previousRouteGuideIndex = routeGuideIndex;
}

const guideNextStepLinks = [
  '/germany-family-reunion-a1/',
  '/tools/route-finder/',
  '/tools/checklist-generator/',
  '/tools/timeline-calculator/',
  '/tools/exam-comparison/',
  '/contact/?interest=a1-family-reunion-pack',
  '/contact/?interest=route-review',
];

const hubNextStepLinks = [
  '/tools/route-finder/',
  '/tools/checklist-generator/',
  '/tools/timeline-calculator/',
  '/tools/exam-comparison/',
  '/tools/email-reminders/',
];

const auditedA1Guides = new Set([
  'german-family-reunion-language-requirement.md',
  'goethe-a1-vs-telc-a1.md',
  'goethe-a1-test-centers.md',
  'goethe-a1-fees-by-country.md',
  'goethe-a1-retake-policy.md',
  'german-a1-documents-checklist.md',
  'german-a1-exam-booking-timeline.md',
]);
const routeRelationshipUpdatedGuides = new Set([
  'goethe-a1-germany-family-reunion.md',
  'goethe-a1-pre-booking-checklist.md',
  'goethe-a1-30-day-study-plan.md',
]);
const sourceReviewedOnJuly19 = new Set([
  'goethe-a1-test-centers.md',
  'goethe-a1-fees-by-country.md',
  'goethe-a1-retake-policy.md',
]);

for (const file of germanyA1Guides) {
  const source = fs.readFileSync(path.join(guideDirectory, file), 'utf8');
  assert.ok(source.includes('contentStatus: "complete-route"'), `${file} retains the complete-route baseline`);
  assert.ok(source.includes('## A1 decision tools and next steps'), `${file} should have the shared A1 next-step section`);
  assert.ok(source.includes('## A1 route FAQ'), `${file} should have a route-level FAQ`);
  const expectedUpdateDate = sourceReviewedOnJuly19.has(file)
    ? '2026-07-19'
    : auditedA1Guides.has(file) || routeRelationshipUpdatedGuides.has(file)
      ? '2026-07-18'
      : '2026-07-11';
  assert.ok(source.includes(`updatedDate: "${expectedUpdateDate}"`), `${file} should show its expected update date`);
  for (const href of guideNextStepLinks) {
    assert.ok(source.includes(href), `${file} should link to ${href}`);
  }
}


const newChineseSlugs = [
  'goethe-a1-germany-family-reunion',
  'goethe-a1-test-centers',
  'german-a1-exam-booking-timeline',
];
for (const slug of newChineseSlugs) {
  assert.ok(fs.existsSync(`src/pages/zh/guides/${slug}.astro`), `Chinese route exists for ${slug}`);
  assert.ok(zhData.includes(`slug: '${slug}'`), `Chinese controlled data includes ${slug}`);
  assert.ok(zhHub.includes(`/zh/guides/${slug}/`), `Chinese hub links to ${slug}`);
}
assert.ok(zhHub.indexOf('/zh/guides/goethe-a1-germany-family-reunion/') < zhHub.indexOf('/zh/guides/goethe-a1-vs-telc-a1/'), 'Chinese hub confirms accepted proof before comparing providers');
assert.ok(zhHub.indexOf('/zh/guides/goethe-a1-test-centers/') < zhHub.indexOf('/zh/guides/german-a1-exam-booking-timeline/'), 'Chinese hub verifies the centre before planning the timeline');
assert.ok(zhHub.indexOf('/zh/guides/german-a1-exam-booking-timeline/') < zhHub.indexOf('/zh/guides/goethe-a1-30-day-study-plan/'), 'Chinese hub places the study plan after the booking timeline');
assert.match(zhHub, /goethe-a1-retake-policy[^\n]*英文指南|英文指南[^\n]*goethe-a1-retake-policy/, 'Chinese hub labels the retake branch as an English guide');
assert.equal((zhData.match(/sourceReviewStatus: 'reviewed'/g) || []).length, 8, 'all eight Chinese Germany A1 records expose the completed independent review');
assert.equal((zhData.match(/sourceReviewedAt: '2026-07-19'/g) || []).length, 8, 'all eight Chinese records expose the real review date');
assert.equal((zhData.match(/reviewedByRole: 'translation-review'/g) || []).length, 8, 'all eight Chinese records expose the source and translation review role');
assert.equal((zhData.match(/updatedDate: '2026-07-19'/g) || []).length, 8, 'all eight Chinese records expose the substantive review update date');
assert.doesNotMatch(zhGuideSources, /读者问题与搜索意图|官方来源核验表|发布前人工核验清单|哪个更稳|更稳通常/, 'public Chinese guides exclude internal editorial language and unsupported stability framing');

for (const href of hubNextStepLinks) {
  assert.ok(hub.includes(href), `Germany A1 hub should link to ${href}`);
}

console.log('Germany A1 cluster rules passed');
