const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const guideDirectory = 'src/content/guides';
const pillarSlugs = [
  'german-family-reunion-language-requirement',
  'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers',
  'goethe-a1-fees-by-country',
  'german-a1-exam-booking-timeline',
  'german-a1-documents-checklist',
  'goethe-a1-30-day-study-plan',
];
const retiredSourceSlugs = [
  'german-a1-family-reunion-faq',
  'goethe-a1-pre-booking-checklist', 'goethe-a1-booking-mistakes', 'goethe-a1-retake-policy',
  'goethe-a1-study-plan-working-adults', 'goethe-a1-official-links-practice-resources',
  'goethe-a1-listening-practice', 'goethe-a1-speaking-topics', 'goethe-a1-writing-practice',
];
const field = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};
const bodyOf = (source) => source.replace(/^---\s*[\s\S]*?\n---\s*/, '');
const wordCount = (body) => (body
  .replace(/https?:\/\/[^\s)]+/g, ' ')
  .match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu) || []).length;

for (let index = 0; index < pillarSlugs.length; index += 1) {
  const slug = pillarSlugs[index];
  const source = fs.readFileSync(path.join(guideDirectory, `${slug}.md`), 'utf8');
  const body = bodyOf(source);
  assert.equal(field(source, 'category'), 'germany-a1', `${slug} remains an A1 pillar`);
  const expectedReviewDate = slug === 'german-family-reunion-language-requirement'
    ? '2026-09-08'
    : ['goethe-a1-vs-telc-a1', 'goethe-a1-test-centers', 'goethe-a1-fees-by-country', 'german-a1-exam-booking-timeline', 'german-a1-documents-checklist'].includes(slug)
      ? '2026-09-09'
      : '2026-09-01';
  assert.equal(field(source, 'updatedDate'), expectedReviewDate, `${slug} records its current substantive update`);
  assert.equal(field(source, 'sourceReviewedAt'), expectedReviewDate, `${slug} records the current source check`);
  assert.equal(field(source, 'nextGuideSlug'), pillarSlugs[index + 1] || '', `${slug} stays on the direct seven-pillar chain`);
  assert.ok(wordCount(body) >= 1200 && wordCount(body) <= 2400, `${slug} stays within the independent-word range`);
  for (const heading of ['Who this is for', 'Key decisions', 'Mistakes to avoid', 'Next action', 'Official sources']) {
    assert.equal((body.match(new RegExp(`^## ${heading}$`, 'gm')) || []).length, 1, `${slug} has one ${heading} section`);
  }
  assert.ok((body.match(/^#{2,3} Scenario:/gm) || []).length >= 2, `${slug} retains bounded reader scenarios`);
  assert.ok((body.match(/^#{2,3} .*(?:asset|worksheet|record|matrix|map|script|log|register|card|board|check|pack|template).*$/gmi) || []).length >= 3, `${slug} retains original reader assets`);
  const supporting = [...(source.match(/^supportingGuideSlugs:\s*\[(.*?)\]/m)?.[1] || '').matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
  assert.ok(supporting.every((support) => pillarSlugs.includes(support)), `${slug} supports readers only with another pillar`);
  for (const retiredSlug of retiredSourceSlugs) {
    assert.ok(!source.includes(retiredSlug), `${slug} does not rely on retired source slug ${retiredSlug}`);
  }
}

const ledger = fs.readFileSync('docs/VISALANG_SCHEME_3_A1_CLAIM_SOURCE_LEDGER_2026-09-01.md', 'utf8');
for (const slug of pillarSlugs) {
  const section = ledger.split(new RegExp(`^## ${slug}$`, 'm'))[1]?.split(/^## /m)[0] || '';
  assert.ok(section, `ledger includes ${slug}`);
  const rows = (section.match(/^\|.*\|$/gm) || []).map((row) => row.split('|').slice(1, -1).map((cell) => cell.trim()));
  const header = rows.shift();
  rows.shift();
  assert.deepEqual(header, ['Claim / reader action', 'Owner', 'Source URL', 'Locator', 'Checked', 'Allowed support', 'Boundary', 'Update trigger'], `${slug} ledger has separate source URL and locator fields`);
  assert.ok(rows.length >= 3, `${slug} records every high-risk claim in distinct source rows`);
  for (const row of rows) {
    assert.equal(row.length, 8, `${slug} ledger row has every required field`);
    assert.match(row[2], /^https:\/\/(?:www\.|shop\.)?(?:auswaertiges-amt\.de|bamf\.de|goethe\.de|telc\.net)\//, `${slug} source URL is a real official URL`);
    assert.ok(row[3].length >= 12 && !/https?:\/\//.test(row[3]), `${slug} locator is a precise in-source location, not a URL`);
    const expectedCheckedAt = slug === 'goethe-a1-test-centers'
      || slug === 'goethe-a1-fees-by-country'
      || slug === 'german-a1-exam-booking-timeline'
      || (slug === 'goethe-a1-vs-telc-a1' && !row[0].startsWith('Compare exact products only'))
      || (slug === 'german-a1-documents-checklist' && !row[0].startsWith('Separate centre administration'))
      ? '2026-09-09'
      : '2026-09-01';
    assert.equal(row[4], expectedCheckedAt, `${slug} records its actual checked date per claim`);
    for (const requiredCell of [row[1], row[5], row[6], row[7]]) assert.ok(requiredCell, `${slug} retains owner, support, boundary, and update trigger`);
  }
}

console.log('Germany A1 seven-pillar source and content rules passed');
