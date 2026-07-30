const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');

const requirementSlug = 'tef-canada-immigration';
const comparisonSlug = 'tcf-canada-vs-tef';
const read = (file) => fs.readFileSync(file, 'utf8');
const field = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};

const requirement = read(`src/content/guides/${requirementSlug}.md`);
const comparison = read(`src/content/guides/${comparisonSlug}.md`);

for (const [slug, source] of [[requirementSlug, requirement], [comparisonSlug, comparison]]) {
  assert.equal(field(source, 'contentStatus'), 'verification-pending', `${slug} remains verification-pending`);
  assert.equal(field(source, 'sourceReviewStatus'), 'reviewed', `${slug} keeps the controlled source-review state`);
  assert.equal(field(source, 'sourceReviewedAt'), '2026-07-30', `${slug} records the current official-source check`);
  assert.equal(field(source, 'updatedDate'), '2026-07-30', `${slug} records the current editorial update`);
  assert.equal(field(source, 'reviewedByRole'), 'source-review', `${slug} records the controlled reviewer role`);
  assert.equal(field(source, 'noindex'), 'true', `${slug} explicitly remains outside indexing`);
  assert.equal(field(source, 'adsEligible'), 'false', `${slug} explicitly remains advertising-free`);
  assert.match(field(source, 'finalDecisionAuthorityType'), /IRCC.*Express Entry/i, `${slug} identifies IRCC as the Express Entry decision authority`);
  assert.match(source, /Federal Skilled Worker|Federal Skilled Trades|Canadian Experience Class/i, `${slug} keeps the programme decision visible`);
  assert.match(source, /Common mistakes/i, `${slug} includes Canada-specific common mistakes`);
  assert.match(source, /Next action/i, `${slug} ends with a concrete next action`);
  assert.doesNotMatch(source, /(?:C\\$|CAD|\\$)\\s?\\d+|\\b(?:guaranteed|always accepted|approval guaranteed|permanent residence guaranteed)\\b/i, `${slug} avoids fixed fees and outcome guarantees`);
}

assert.equal(field(requirement, 'decisionStage'), 'requirement', 'the Canada route starts with the Express Entry requirement');
assert.equal(field(requirement, 'nextGuideSlug'), comparisonSlug, 'the requirement guide continues to the TEF/TCF comparison');
assert.match(requirement, /programme-first requirement check/i, 'the requirement guide states its distinct task');
assert.match(requirement, /IRCC.*test-specific table|test-specific table.*IRCC/is, 'the requirement guide sends score interpretation back to IRCC');
assert.doesNotMatch(`${field(requirement, 'title')} ${field(requirement, 'description')}`, /citizenship/i, 'the requirement metadata does not overstate the reviewed Express Entry scope');

assert.equal(field(comparison, 'decisionStage'), 'choice', 'the Canada comparison is the choice stage');
assert.equal(field(comparison, 'nextGuideSlug'), '', 'the Canada comparison remains terminal');
assert.match(comparison, /TEF Canada.*TCF Canada/is, 'the comparison covers both named French tests');
assert.match(comparison, /comparison record|product comparison|test comparison/i, 'the comparison gives the reader a reusable comparison task');
assert.match(comparison, /raw scores.*(?:not|cannot)|(?:not|cannot).*raw scores/i, 'the comparison prevents direct raw-score equivalence');
assert.doesNotMatch(`${field(comparison, 'title')} ${field(comparison, 'description')}`, /which to take/i, 'the comparison metadata does not imply a universal recommendation');

const taxonomy = read('src/data/guide-taxonomy.ts');
assert.match(taxonomy, /\{[^{}]*slug: 'canada'[^{}]*adsEligible: false[^{}]*noindex: true[^{}]*\}/, 'the Canada category is explicitly noindex and advertising-free');

execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });

const sitemap = read('dist/sitemap-0.xml');
const requirementHtml = read(`dist/guides/${requirementSlug}/index.html`);
const comparisonHtml = read(`dist/guides/${comparisonSlug}/index.html`);
const categoryHtml = read('dist/guides/category/canada/index.html');
for (const [slug, html] of [[requirementSlug, requirementHtml], [comparisonSlug, comparisonHtml]]) {
  assert.ok(html.includes('<meta name="robots" content="noindex,follow">'), `${slug} renders noindex`);
  assert.ok(!html.includes('pagead2.googlesyndication.com'), `${slug} does not load AdSense`);
  assert.ok(!sitemap.includes(`<loc>https://visalang.org/guides/${slug}/</loc>`), `${slug} is absent from the sitemap`);
}
assert.ok(requirementHtml.includes(`<small>Next guide</small><strong>${field(comparison, 'title')}</strong>`), 'the generated requirement guide continues to the comparison');
assert.ok(!comparisonHtml.includes('<small>Next guide</small>'), 'the generated comparison remains terminal');
assert.ok(categoryHtml.includes('<meta name="robots" content="noindex,follow">'), 'the Canada category renders noindex');
assert.ok(!categoryHtml.includes('pagead2.googlesyndication.com'), 'the Canada category remains advertising-free');
assert.ok(!sitemap.includes('<loc>https://visalang.org/guides/category/canada/</loc>'), 'the Canada category is absent from the sitemap');

console.log('Canada window B remediation rules passed');
