const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const guideDirectory = 'src/content/guides';
const germanyB1Guides = fs.readdirSync(guideDirectory)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => fs.readFileSync(path.join(guideDirectory, file), 'utf8').includes('category: "germany-b1"'));
const hub = fs.readFileSync('src/pages/germany-b1-settlement-citizenship.astro', 'utf8');

assert.equal(germanyB1Guides.length, 13, 'Germany B1 cluster should retain the existing 13 guide pages');

const requiredCoreGuides = [
  'goethe-b1-germany-settlement-work.md',
  'germany-b1-citizenship-language-proof.md',
  'goethe-b1-vs-telc-b1.md',
  'germany-b1-leben-in-deutschland-and-language-proof.md',
  'germany-b1-settlement-citizenship-checklist.md',
  'germany-b1-settlement-citizenship-timeline.md',
];
for (const file of requiredCoreGuides) {
  assert.ok(germanyB1Guides.includes(file), `Germany B1 cluster should include ${file}`);
}

const requiredHubLinks = [
  '/guides/goethe-b1-germany-settlement-work/',
  '/guides/germany-b1-citizenship-language-proof/',
  '/guides/goethe-b1-vs-telc-b1/',
  '/guides/germany-b1-leben-in-deutschland-and-language-proof/',
  '/guides/germany-b1-settlement-citizenship-checklist/',
  '/guides/germany-b1-settlement-citizenship-timeline/',
  '/tools/route-finder/',
  '/tools/checklist-generator/',
  '/tools/timeline-calculator/',
  '/tools/exam-comparison/',
  '/route-review/',
];
for (const href of requiredHubLinks) {
  assert.ok(hub.includes(href), `B1 hub should link to ${href}`);
}

const guideNextStepLinks = [
  '/germany-b1-settlement-citizenship/',
  '/tools/route-finder/',
  '/guides/germany-b1-settlement-citizenship-checklist/',
  '/guides/germany-b1-settlement-citizenship-timeline/',
  '/guides/goethe-b1-vs-telc-b1/',
  '/route-review/',
];
const auditedB1Guides = new Set([
  'goethe-b1-germany-settlement-work.md',
  'germany-b1-citizenship-language-proof.md',
  'germany-b1-leben-in-deutschland-and-language-proof.md',
  'goethe-b1-vs-telc-b1.md',
  'germany-b1-settlement-citizenship-checklist.md',
  'germany-b1-settlement-citizenship-timeline.md',
  'goethe-b1-fees-and-booking.md',
  'goethe-b1-study-plan.md',
]);

for (const file of germanyB1Guides) {
  const source = fs.readFileSync(path.join(guideDirectory, file), 'utf8');
  assert.ok(source.includes('## Continue your B1 decision route'), `${file} should have the shared B1 next-step section`);
  assert.ok(source.includes('competent authority') || source.includes('authority'), `${file} should keep the authority-first boundary`);
  assert.ok(source.includes('eligibility') || source.includes('accepted language proof') || source.includes('proof acceptance'), `${file} should separate practice from eligibility or proof acceptance`);
  for (const href of guideNextStepLinks) {
    assert.ok(source.includes(href), `${file} should link to ${href}`);
  }
  if (auditedB1Guides.has(file)) {
    assert.ok(source.includes('updatedDate: "2026-07-13"'), `${file} should show the B1 audit update date`);
    assert.ok(source.includes('Official sources last checked: 2026-07-13'), `${file} should show the B1 source-check date`);
  }
}

console.log('Germany B1 cluster rules passed');
