const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const guideDirectory = 'src/content/guides';
const germanyA1Guides = fs.readdirSync(guideDirectory)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => fs.readFileSync(path.join(guideDirectory, file), 'utf8').includes('category: "germany-a1"'));
const hub = fs.readFileSync('src/pages/germany-family-reunion-a1.astro', 'utf8');

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

for (const file of germanyA1Guides) {
  const source = fs.readFileSync(path.join(guideDirectory, file), 'utf8');
  assert.ok(source.includes('## A1 decision tools and next steps'), `${file} should have the shared A1 next-step section`);
  assert.ok(source.includes('## A1 route FAQ'), `${file} should have a route-level FAQ`);
  assert.ok(source.includes('updatedDate: "2026-07-11"'), `${file} should show its current update date`);
  for (const href of guideNextStepLinks) {
    assert.ok(source.includes(href), `${file} should link to ${href}`);
  }
}

for (const href of hubNextStepLinks) {
  assert.ok(hub.includes(href), `Germany A1 hub should link to ${href}`);
}

console.log('Germany A1 cluster rules passed');
