const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const guideDirectory = 'src/content/guides';
const germanyB1Guides = fs.readdirSync(guideDirectory)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => fs.readFileSync(path.join(guideDirectory, file), 'utf8').includes('category: "germany-b1"'));
const hub = fs.readFileSync('src/pages/germany-b1-settlement-citizenship.astro', 'utf8');
const field = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};
const markdownBody = (source) => source.split(/^---\s*$/m).slice(2).join('---');

assert.equal(germanyB1Guides.length, 13, 'Germany B1 cluster should retain the existing 13 guide pages');

const requiredCoreGuides = [
  'goethe-b1-germany-settlement-work.md',
  'germany-b1-citizenship-language-proof.md',
  'germany-b1-leben-in-deutschland-and-language-proof.md',
  'goethe-b1-vs-telc-b1.md',
  'goethe-b1-fees-and-booking.md',
  'goethe-b1-study-plan.md',
  'germany-b1-settlement-citizenship-timeline.md',
  'germany-b1-settlement-citizenship-checklist.md',
];
for (const file of requiredCoreGuides) {
  assert.ok(germanyB1Guides.includes(file), `Germany B1 cluster should include ${file}`);
}

const preparationSupportGuides = [
  'goethe-b1-difficulty-analysis.md',
  'goethe-b1-listening-deep-dive.md',
  'goethe-b1-mock-exam-routine.md',
  'goethe-b1-speaking-topics.md',
  'goethe-b1-writing-assessment.md',
];
for (const file of preparationSupportGuides) {
  assert.ok(germanyB1Guides.includes(file), `Germany B1 cluster should retain support page ${file}`);
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

for (const file of germanyB1Guides) {
  const source = fs.readFileSync(path.join(guideDirectory, file), 'utf8');
  assert.ok(source.includes('contentStatus: "core-route"'), `${file} retains the core-route baseline`);
  assert.ok(source.includes('competent authority') || source.includes('authority'), `${file} should keep the authority-first boundary`);
  assert.ok(source.includes('eligibility') || source.includes('accepted language proof') || source.includes('proof acceptance'), `${file} should separate practice from eligibility or proof acceptance`);
}

for (const file of requiredCoreGuides) {
  const source = fs.readFileSync(path.join(guideDirectory, file), 'utf8');
  assert.equal(field(source, 'sourceReviewStatus'), 'reviewed', `${file} records the completed 2026-07-19 source review`);
  assert.equal(field(source, 'sourceReviewedAt'), '2026-07-19', `${file} records the actual source-review date`);
  assert.equal(field(source, 'reviewedByRole'), 'source-review', `${file} records the source-review role`);
  assert.doesNotMatch(markdownBody(source), /Official verification pending/i, `${file} does not contradict reviewed metadata in public copy`);
  assert.doesNotMatch(markdownBody(source), /Reader decision and search intent|Manual checks still needed|Before you rely on this page|Proposed B1 practice pack interest/i, `${file} does not expose internal editorial language`);
}

for (const file of preparationSupportGuides) {
  const source = fs.readFileSync(path.join(guideDirectory, file), 'utf8');
  assert.equal(field(source, 'sourceReviewStatus') || 'pending', 'pending', `${file} stays source-review pending`);
  assert.equal(field(source, 'sourceReviewedAt'), '', `${file} does not claim a completed source-review date`);
  assert.equal(field(source, 'reviewedByRole'), '', `${file} does not claim a completed source-review role`);
}

assert.equal((hub.match(/<h1(?:\s|>)/g) || []).length, 1, 'B1 hub source declares exactly one H1');
assert.equal((hub.match(/<ArticleTOC(?:\s|\/>)/g) || []).length, 1, 'B1 hub source uses exactly one ArticleTOC');
assert.ok(hub.includes("canonicalURL=\"https://visalang.org/germany-b1-settlement-citizenship/\""), 'B1 hub keeps its self-canonical URL');
for (const schemaType of ['BreadcrumbList', 'CollectionPage']) {
  assert.ok(hub.includes(`'@type': '${schemaType}'`), `B1 hub declares ${schemaType} JSON-LD`);
}
assert.doesNotMatch(hub, /Content map and internal-link matrix|Existing B1 guide audit|Reworked as|Genuinely missing decision pages|proposed support|proposed human-service contact path/i, 'B1 hub does not expose internal editorial language');

for (const [, href] of hub.matchAll(/href=["'](\/[^"']*)["']/g)) {
  const pathname = href.split(/[?#]/, 1)[0];
  assert.ok(pathname.endsWith('/'), `B1 hub internal link uses a trailing slash: ${href}`);
  assert.ok(!pathname.endsWith('.html'), `B1 hub internal link avoids legacy HTML: ${href}`);
}

console.log('Germany B1 cluster rules passed');
