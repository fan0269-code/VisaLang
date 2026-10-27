import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { claimRegistry } from '../src/data/claim-registry.ts';

const ledgerPath = '.superpowers/sdd/VisaLang-Master-Plan/task-5-source-ledger.md';
const highRiskArticles = [
  'german-family-reunion-language-requirement',
  'goethe-a1-fees-by-country',
  'goethe-a1-germany-family-reunion',
];
const requiredFields = [
  'source url',
  'checked date',
  'source owner',
  'exact locator',
  'allowed support',
  'boundary / prohibited inference',
  'intended consumer',
  'reader verification action',
];
const read = (path) => fs.readFileSync(path, 'utf8');
const guideSource = (slug) => read(`src/content/guides/${slug}.md`);
const markdownOfficialSourceUrls = (slug) => {
  const source = guideSource(slug);
  const sectionStart = source.search(/^## Official sources\s*$/m);
  assert.notEqual(sectionStart, -1, `${slug} has an Official sources section`);
  const afterHeading = source.slice(sectionStart).replace(/^## Official sources\s*\n/, '');
  const nextHeading = afterHeading.search(/^## /m);
  const sourceSection = nextHeading === -1 ? afterHeading : afterHeading.slice(0, nextHeading);
  return [...sourceSection.matchAll(/\((https:\/\/[^)]+)\)/g)].map((match) => match[1]);
};
const frontmatterAuthorityUrls = (slug) => {
  const frontmatter = guideSource(slug).match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  return ['primaryOfficialAuthorityUrl', 'routeRequirementAuthorityUrl', 'examOwnerUrl']
    .map((field) => frontmatter.match(new RegExp(`^${field}: "(https:\\/\\/[^"\\n]+)"$`, 'm'))?.[1])
    .filter(Boolean);
};
const expectedOfficialSourceUrls = (slug) => [...new Set([
  ...markdownOfficialSourceUrls(slug),
  ...frontmatterAuthorityUrls(slug),
])];
const htmlHref = (url) => url.replaceAll('&', '&#x26;');
const expectedSourceCounts = {
  'german-family-reunion-language-requirement': 4,
  'goethe-a1-fees-by-country': 4,
  'goethe-a1-germany-family-reunion': 3,
};
const parseLedger = (source) => [...source.matchAll(/^## ([^\n]+)\n\n((?:\|[^\n]*\|\n)+)/gm)].map(([, slug, block]) => {
  const rows = block.trim().split('\n').map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()));
  const headers = rows[0].map((header) => header.toLowerCase());
  return { slug, headers, rows: rows.slice(2) };
});

assert.ok(fs.existsSync(ledgerPath), 'high-risk article source ledger exists for the submitted C01, fee, and C07 pages');
const tables = parseLedger(read(ledgerPath));
for (const slug of highRiskArticles) {
  const table = tables.find((entry) => entry.slug === slug);
  assert.ok(table, `${slug} has its own high-risk source ledger table`);
  assert.deepEqual(table.headers, requiredFields, `${slug} ledger uses every required per-source field`);
  for (const row of table.rows) {
    assert.equal(row.length, requiredFields.length, `${slug} ledger row preserves every field`);
    for (const [index, field] of requiredFields.entries()) assert.ok(row[index], `${slug} ledger source row has ${field}`);
  }
  const expectedUrls = expectedOfficialSourceUrls(slug);
  assert.ok(expectedUrls.length > 0, `${slug} derives a non-empty reader-facing official-source set`);
  assert.equal(expectedUrls.length, expectedSourceCounts[slug], `${slug} has the independently expected official-source count`);
  for (const url of expectedUrls) {
    assert.ok(table.rows.some((row) => row[0] === url), `${slug} ledger covers the reader-facing official source ${url}`);
  }
}

execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });
for (const slug of highRiskArticles) {
  const html = read(`dist/guides/${slug}/index.html`);
  for (const url of expectedOfficialSourceUrls(slug)) {
    assert.ok(html.includes(`href="${htmlHref(url)}"`), `rendered ${slug} exposes the expected official authority/source ${url}`);
  }
}
const c01Html = read('dist/guides/german-family-reunion-language-requirement/index.html');
const authorityClaim = claimRegistry.find((claim) => claim.claimId === 'germany-family-reunion-a1-authority-split');
const reviewedAuthorityUrl = authorityClaim?.sourceRefs.find((source) => source.url.includes('04-dtehepartner/606680'))?.url;
assert.ok(reviewedAuthorityUrl, 'claim registry exposes the reviewed FFO authority source URL');
assert.ok(c01Html.includes(`href="${reviewedAuthorityUrl}"`), 'rendered C01 official-source card uses the exact reviewed FFO claim URL');

console.log('Task 5 high-risk source-ledger and rendered C01 source contracts passed');
