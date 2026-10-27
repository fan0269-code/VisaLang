const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const guideDirectory = 'src/content/guides';
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
const coreSlugs = new Set(requiredCoreGuides.map((file) => path.basename(file, '.md')));
const b1PillarContract = [
  '## Who this is for',
  '## Key decisions',
  '## Mistakes to avoid',
  '## Next action',
  '## Official sources',
];
const redirectSourceSlugs = [
  'goethe-b1-difficulty-analysis',
  'goethe-b1-mock-exam-routine',
  'goethe-b1-listening-deep-dive',
  'goethe-b1-speaking-topics',
  'goethe-b1-writing-assessment',
];
const field = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};
// 2026-10-27 copy-only re-scoping: the five pages below changed their SEO title,
// description, direct answer and internal links, so their editorial update date
// moves forward. Their claim set and official sources were not re-reviewed, so
// sourceReviewedAt deliberately stays at 2026-09-13.
const reScopedDates = new Map([
  ['goethe-b1-germany-settlement-work.md', '2026-10-27'],
  ['germany-b1-citizenship-language-proof.md', '2026-10-27'],
  ['germany-b1-leben-in-deutschland-and-language-proof.md', '2026-10-27'],
  ['germany-b1-settlement-citizenship-checklist.md', '2026-10-27'],
  ['germany-b1-settlement-citizenship-timeline.md', '2026-10-27'],
]);
const markdownBody = (source) => source.split(/^---\s*$/m).slice(2).join('---');

for (const file of requiredCoreGuides) {
  const fullPath = path.join(guideDirectory, file);
  assert.ok(fs.existsSync(fullPath), `B1 pillar exists: ${file}`);
  const source = fs.readFileSync(fullPath, 'utf8');
  const body = markdownBody(source);

  assert.ok(source.includes('category: "germany-b1"'), `${file} remains in the B1 route`);
  assert.equal(field(source, 'updatedDate'), reScopedDates.get(file) ?? '2026-09-13', `${file} records the material M4 update date`);
  assert.equal(field(source, 'sourceReviewStatus'), 'reviewed', `${file} retains the source-review gate`);
  assert.equal(field(source, 'sourceReviewedAt'), '2026-09-13', `${file} records the current source-review date`);
  const readingWords = body.replace(/https?:\/\/[^\s)]+/g, ' ').replace(/<[^>]+>/g, ' ').match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu) || [];
  assert.equal(field(source, 'readingTime'), String(Math.ceil(readingWords.length / 200)), `${file} recalculates reading time from its final body`);
  assert.equal(field(source, 'reviewedByRole'), 'source-review', `${file} records the source-review role`);
  assert.doesNotMatch(body, /Official verification pending|Reader decision and search intent|Manual checks still needed|Before you rely on this page|Proposed B1 practice pack interest/i, `${file} excludes internal editorial language`);

  const wordCount = readingWords.length;
  assert.ok(wordCount >= 1200 && wordCount <= 2400, `${file} supplies 1,200–2,400 independent words of decision support`);
  for (const heading of b1PillarContract) {
    assert.equal((body.match(new RegExp(`^${heading}$`, 'gm')) || []).length, 1, `${file} provides ${heading} exactly once`);
  }
  assert.ok((body.match(/^### Scenario:/gm) || []).length >= 2, `${file} gives at least two bounded reader scenarios`);
  assert.ok((body.match(/^### Original asset:/gm) || []).length >= 3, `${file} gives at least three original reader assets`);

  for (const slug of redirectSourceSlugs) {
    assert.ok(!source.includes(slug), `${file} does not depend on the future redirect source ${slug}`);
  }
  for (const [, href] of body.matchAll(/\]\((\/[^)#?]+)\/?(?:[?#][^)]*)?\)/g)) {
    if (!href.startsWith('/guides/')) continue;
    const destination = href.split('/').filter(Boolean).at(-1);
    assert.ok(coreSlugs.has(destination), `${file} directly links only to a retained B1 pillar: ${href}`);
  }
}

const b1Ledger = fs.readFileSync('docs/VISALANG_SCHEME_3_B1_CLAIM_SOURCE_LEDGER_2026-09-01.md', 'utf8');
for (const slug of coreSlugs) {
  assert.match(b1Ledger, new RegExp(`^## ${slug}$`, 'm'), `B1 ledger provides a page record for ${slug}`);
}
for (const label of ['Source URL', 'Checked date', 'Owner', 'Locator', 'Allowed support', 'Boundary', 'Update trigger']) {
  assert.ok(b1Ledger.includes(label), `B1 ledger records ${label} for sourced claims`);
}

console.log('Germany B1 pillar rules passed');
