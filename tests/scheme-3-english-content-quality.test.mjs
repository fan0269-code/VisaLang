import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { englishPillarSlugs } from '../src/data/publication-manifest.ts';

const guideDir = 'src/content/guides';
const a1Slugs = new Set([
  'german-family-reunion-language-requirement',
  'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers',
  'goethe-a1-fees-by-country',
  'german-a1-exam-booking-timeline',
  'german-a1-documents-checklist',
  'goethe-a1-30-day-study-plan',
]);

// Five B1 pillars were re-scoped by copy only on 2026-10-27 (SEO title,
// description, direct answer, internal links). Their claims and official
// sources were not re-reviewed, so only updatedDate moves forward here.
const reScopedB1Slugs = new Set([
  'goethe-b1-germany-settlement-work',
  'germany-b1-citizenship-language-proof',
  'germany-b1-leben-in-deutschland-and-language-proof',
  'germany-b1-settlement-citizenship-checklist',
  'germany-b1-settlement-citizenship-timeline',
]);

const field = (source, name) => source.match(new RegExp(`^${name}:\\s*["']?([^"'\\n]+)`, 'm'))?.[1]?.trim() ?? '';
const bodyOf = (source) => source.replace(/^---\s*[\s\S]*?\n---\s*/, '');
const wordsOf = (body) => body
  .replace(/https?:\/\/[^\s)]+/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu) ?? [];

const documents = englishPillarSlugs.map((slug) => {
  const source = fs.readFileSync(path.join(guideDir, `${slug}.md`), 'utf8');
  return { slug, source, body: bodyOf(source) };
});

for (const { slug, source, body } of documents) {
  const words = wordsOf(body).length;
  assert.ok(words >= 1200 && words <= 2400, `${slug} contains 1,200–2,400 independent body words; found ${words}`);
  const expectedReviewDate = !a1Slugs.has(slug) ? '2026-09-13' : slug === 'german-family-reunion-language-requirement'
    ? '2026-09-08'
    : ['goethe-a1-vs-telc-a1', 'goethe-a1-test-centers', 'goethe-a1-fees-by-country', 'german-a1-exam-booking-timeline', 'german-a1-documents-checklist'].includes(slug)
      ? '2026-09-09'
      : '2026-09-01';
  const expectedUpdatedDate = reScopedB1Slugs.has(slug) ? '2026-10-27' : expectedReviewDate;
  assert.equal(field(source, 'updatedDate'), expectedUpdatedDate, `${slug} records the material update date`);
  assert.equal(field(source, 'sourceReviewedAt'), expectedReviewDate, `${slug} records the current source-check date`);
  assert.equal(field(source, 'readingTime'), String(Math.ceil(words / 200)), `${slug} recalculates reading time from its final body at 200 words per minute`);

  const sectionContracts = [
    ['Who this is for', /^## Who this is for$/gm],
    ['Key decisions', /^## Key decisions$/gm],
    ['Mistakes', /^## (?:Common )?Mistakes(?: to avoid)?$/gm],
    ['Next action', /^## Next action$/gm],
    ['Official sources', /^## Official sources$/gm],
  ];
  for (const [label, pattern] of sectionContracts) {
    assert.equal((body.match(pattern) || []).length, 1, `${slug} has exactly one page-specific ${label} section`);
  }

  assert.ok((body.match(/^#{2,3} Scenario:/gm) || []).length >= 2, `${slug} includes at least two bounded scenarios`);
  const assetHeadings = body.match(/^#{2,3} .*(?:asset|worksheet|record|matrix|map|script|log|register|card|board|check|pack|template).*$/gmi) || [];
  assert.ok(assetHeadings.length >= 3, `${slug} includes at least three distinct original reader assets`);
  assert.match(body, /four-(?:owner|party)[^\n]{0,80}map/i, `${slug} includes a page-specific four-party responsibility map`);
  assert.ok((body.match(/https:\/\//g) || []).length >= 2, `${slug} includes page-specific official source links`);
}

for (let left = 0; left < documents.length; left += 1) {
  const leftWords = wordsOf(documents[left].body).map((word) => word.toLowerCase());
  const leftShingles = new Set();
  for (let index = 0; index <= leftWords.length - 80; index += 1) {
    leftShingles.add(leftWords.slice(index, index + 80).join(' '));
  }
  for (let right = left + 1; right < documents.length; right += 1) {
    const rightWords = wordsOf(documents[right].body).map((word) => word.toLowerCase());
    const duplicate = rightWords.some((_, index) => index <= rightWords.length - 80
      && leftShingles.has(rightWords.slice(index, index + 80).join(' ')));
    assert.equal(duplicate, false, `${documents[left].slug} and ${documents[right].slug} share no continuous 80-word body block`);
  }
}

const a1Ledger = fs.readFileSync('docs/VISALANG_SCHEME_3_A1_CLAIM_SOURCE_LEDGER_2026-09-01.md', 'utf8');
const b1Ledger = fs.readFileSync('docs/VISALANG_SCHEME_3_B1_CLAIM_SOURCE_LEDGER_2026-09-01.md', 'utf8');
const ledgerTables = (ledger) => [...ledger.matchAll(/^## ([^\n]+)\n\n((?:\|[^\n]*\|\n)+)/gm)].map(([, guide, block]) => {
  const lines = block.trim().split('\n');
  const cells = (line) => line.trim().slice(1, -1).split('|').map((cell) => cell.trim());
  const headers = cells(lines[0]).map((header) => header.toLowerCase());
  return {
    guide,
    headers,
    rows: lines.slice(2).map(cells),
  };
});
const ledgerSchema = ['claim', 'source url', 'locator', 'checked', 'owner', 'allowed support', 'boundary', 'update trigger'];
const canonicalHeader = (header) => {
  const normalized = header.toLowerCase();
  if (normalized === 'claim / reader action') return 'claim';
  if (normalized === 'checked date') return 'checked';
  return normalized;
};
const ledgerValue = (table, row, fieldName) => {
  const index = table.headers.findIndex((header) => canonicalHeader(header) === fieldName);
  return index === -1 ? '' : row[index] ?? '';
};
const validateLedgerTable = (name, table) => {
  const schema = table.headers.map(canonicalHeader);
  assert.equal(schema.length, ledgerSchema.length, `${name} ${table.guide} uses exactly eight claim-table columns`);
  assert.deepEqual([...schema].sort(), [...ledgerSchema].sort(), `${name} ${table.guide} uses the exact claim-table schema`);
  for (const row of table.rows) {
    assert.equal(row.length, table.headers.length, `${name} ${table.guide} keeps every claim row aligned to the header`);
    for (const label of ledgerSchema) {
      assert.ok(ledgerValue(table, row, label), `${name} ${table.guide} gives every claim a ${label} value`);
    }
    assert.match(ledgerValue(table, row, 'source url'), /^https:\/\//, `${name} ${table.guide} gives every sourced claim an independent official https Source URL`);
    assert.doesNotMatch(ledgerValue(table, row, 'locator'), /^https?:\/\//, `${name} ${table.guide} keeps Locator independent from Source URL`);
  }
};
assert.throws(
  () => validateLedgerTable('fixture', {
    guide: 'legacy-seven-column-table',
    headers: ['claim', 'locator', 'checked', 'owner', 'allowed support', 'boundary', 'update trigger'],
    rows: [['legacy row', 'old locator', '2026-09-01', 'owner', 'support', 'boundary', 'trigger']],
  }),
  /exactly eight claim-table columns/,
  'the validator rejects the legacy seven-column schema instead of falling back to Locator',
);
for (const { slug } of documents) {
  const ledger = a1Slugs.has(slug) ? a1Ledger : b1Ledger;
  assert.match(ledger, new RegExp(`^## ${slug}$`, 'm'), `the appropriate claim/source ledger contains ${slug}`);
}
for (const [name, ledger] of [['A1', a1Ledger], ['B1', b1Ledger]]) {
  const tables = ledgerTables(ledger);
  assert.ok(tables.length > 0, `${name} ledger contains Markdown claim tables`);
  for (const table of tables) {
    validateLedgerTable(name, table);
  }
  assert.ok((ledger.match(/2026-09-01/g) || []).length >= 3, `${name} ledger records current checked dates`);
}

const b1Tables = ledgerTables(b1Ledger);
const b1Table = (guide) => b1Tables.find((table) => table.guide === guide);
const hasB1Claim = (guide, phrase, sourceUrl, locator) => b1Table(guide)?.rows.some((row) =>
  row.join(' | ').includes(phrase)
  && ledgerValue(b1Table(guide), row, 'source url') === sourceUrl
  && ledgerValue(b1Table(guide), row, 'locator').includes(locator));
assert.ok(
  hasB1Claim(
    'germany-b1-leben-in-deutschland-and-language-proof',
    'LiD may, in the stated conditions, demonstrate naturalisation civic knowledge',
    'https://www.einbuergerung.de/ablauf.php?l=en',
    'Assembling your documents -> knowledge of the legal system and society',
  ),
  'B1 ledger records the bounded LiD naturalisation civic-knowledge source',
);
assert.ok(
  hasB1Claim(
    'goethe-b1-vs-telc-b1',
    'Goethe B1 has four modules that may be taken together or separately',
    'https://www.goethe.de/ins/de/en/prf/prf/gzb1/inf.html',
    'Make your mark: the modules',
  ),
  'B1 ledger records Goethe’s bounded module rule separately from authority acceptance',
);

console.log('scheme 3 English content depth, uniqueness, and source-ledger rules passed');
