const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = (file) => fs.readFileSync(file, 'utf8');
const a1Hub = read('src/pages/germany-family-reunion-a1.astro');
const b1Hub = read('src/pages/germany-b1-settlement-citizenship.astro');
const zhHub = read('src/pages/zh/germany-family-reunion-a1.astro');

const a1Pillars = [
  'german-family-reunion-language-requirement', 'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers', 'goethe-a1-fees-by-country', 'german-a1-exam-booking-timeline',
  'german-a1-documents-checklist', 'goethe-a1-30-day-study-plan',
];
const b1Pillars = [
  'goethe-b1-germany-settlement-work', 'germany-b1-citizenship-language-proof',
  'germany-b1-leben-in-deutschland-and-language-proof', 'goethe-b1-vs-telc-b1',
  'goethe-b1-fees-and-booking', 'germany-b1-settlement-citizenship-timeline',
  'germany-b1-settlement-citizenship-checklist', 'goethe-b1-study-plan',
];
const zhPillars = [
  'german-family-reunion-language-requirement', 'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers', 'german-a1-exam-booking-timeline', 'goethe-a1-30-day-study-plan',
];
const retiredSlugs = [
  'goethe-a1-germany-family-reunion', 'german-a1-family-reunion-faq',
  'goethe-a1-pre-booking-checklist', 'goethe-a1-booking-mistakes',
  'goethe-a1-retake-policy', 'goethe-a1-study-plan-working-adults',
  'goethe-a1-official-links-practice-resources', 'goethe-a1-listening-practice',
  'goethe-a1-speaking-topics', 'goethe-a1-writing-practice',
  'goethe-b1-difficulty-analysis', 'goethe-b1-mock-exam-routine',
  'goethe-b1-listening-deep-dive', 'goethe-b1-speaking-topics', 'goethe-b1-writing-assessment',
];

for (const slug of a1Pillars) assert.ok(a1Hub.includes(`/guides/${slug}/`) || a1Hub.includes(`'${slug}'`), `A1 hub exposes pillar ${slug}`);
for (const slug of b1Pillars) assert.ok(b1Hub.includes(`/guides/${slug}/`), `B1 hub exposes pillar ${slug}`);
for (const slug of zhPillars) assert.ok(zhHub.includes(`/zh/guides/${slug}/`) || zhHub.includes('getPrimaryDiscoveryZhGuides'), `Chinese hub exposes pillar ${slug}`);

for (const [name, hub] of [['A1', a1Hub], ['B1', b1Hub], ['Chinese A1', zhHub]]) {
  for (const slug of retiredSlugs) assert.ok(!hub.includes(slug), `${name} hub does not route through retired slug ${slug}`);
  assert.doesNotMatch(hub, /\/guides\/category\//, `${name} hub does not send primary discovery to noindex category pages`);
  assert.match(hub, /enableAds=\{false\}/, `${name} hub explicitly remains advertising-free`);
}

assert.match(a1Hub, /Your 7-step route/, 'A1 hub presents the seven-pillar decision sequence');
assert.match(zhHub, /五步|5 步|5步/, 'Chinese hub presents the five-pillar decision sequence');
assert.match(a1Hub, /href: 'https:\/\/visalang\.org\/zh\/germany-family-reunion-a1\/'/, 'English A1 hub keeps its Chinese alternate');
assert.match(zhHub, /href: 'https:\/\/visalang\.org\/germany-family-reunion-a1\/'/, 'Chinese A1 hub keeps its English alternate');

console.log('scheme 3 route-hub publication paths passed');
