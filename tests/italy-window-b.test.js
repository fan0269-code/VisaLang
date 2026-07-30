const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');

const requirementSlug = 'cils-b1-cittadinanza-for-italian-citizenship';
const comparisonSlug = 'cils-vs-celi-vs-plida-for-italian-citizenship';
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
  assert.match(source, /Italian (?:citizenship|Interior Ministry|Foreign Ministry).*final|final (?:decision|authority).*Italian/is, `${slug} identifies the Italian authority as the final decision source`);
  assert.match(source, /responsible (?:Prefettura|consulate|authority)|competent (?:Prefettura|consulate)/i, `${slug} gives the reader a competent-authority verification action`);
  assert.match(source, /Common mistakes/i, `${slug} includes Italy-specific common mistakes`);
  assert.match(source, /Next action/i, `${slug} ends with a concrete next action`);
  assert.doesNotMatch(source, /€\s?\d+|\b(?:guaranteed|always accepted|automatically accepted|approval guaranteed)\b/i, `${slug} avoids fixed fees and acceptance guarantees`);
}

assert.equal(field(requirement, 'decisionStage'), 'requirement', 'the Italy route starts with the citizenship requirement');
assert.equal(field(requirement, 'nextGuideSlug'), comparisonSlug, 'the requirement guide continues to the certificate comparison');
assert.match(requirement, /citizenship-basis requirement check/i, 'the requirement guide states its distinct task');
assert.match(requirement, /CILS B1 Cittadinanza.*product|product.*CILS B1 Cittadinanza/is, 'the requirement guide separates the CILS product from the authority decision');

assert.equal(field(comparison, 'decisionStage'), 'choice', 'the Italy comparison is the choice stage');
assert.equal(field(comparison, 'nextGuideSlug'), '', 'the Italy comparison remains terminal');
assert.match(comparison, /CILS.*CELI.*PLIDA/is, 'the comparison covers all three named certificate products');
assert.match(comparison, /comparison record|provider comparison|certificate comparison/i, 'the comparison gives the reader a reusable comparison task');

execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });

const sitemap = read('dist/sitemap-0.xml');
const requirementHtml = read(`dist/guides/${requirementSlug}/index.html`);
const comparisonHtml = read(`dist/guides/${comparisonSlug}/index.html`);
const categoryHtml = read('dist/guides/category/italy/index.html');
for (const [slug, html] of [[requirementSlug, requirementHtml], [comparisonSlug, comparisonHtml]]) {
  assert.ok(html.includes('<meta name="robots" content="noindex,follow">'), `${slug} renders noindex`);
  assert.ok(!html.includes('pagead2.googlesyndication.com'), `${slug} does not load AdSense`);
  assert.ok(!sitemap.includes(`<loc>https://visalang.org/guides/${slug}/</loc>`), `${slug} is absent from the sitemap`);
}
assert.ok(requirementHtml.includes(`<small>Next guide</small><strong>${field(comparison, 'title')}</strong>`), 'the generated requirement guide continues to the comparison');
assert.ok(!comparisonHtml.includes('<small>Next guide</small>'), 'the generated comparison remains terminal');
assert.ok(categoryHtml.includes('<meta name="robots" content="noindex,follow">'), 'the Italy category renders noindex');
assert.ok(!categoryHtml.includes('pagead2.googlesyndication.com'), 'the Italy category remains advertising-free');
assert.ok(!sitemap.includes('<loc>https://visalang.org/guides/category/italy/</loc>'), 'the Italy category is absent from the sitemap');

console.log('Italy window B remediation rules passed');
