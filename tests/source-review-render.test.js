const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const fixtureSlug = '__source-review-reviewed-fixture';
const fixturePath = path.join('src/content/guides', `${fixtureSlug}.md`);
const fixtureOutput = path.join('dist/guides', fixtureSlug);
const pendingFixtureSlug = '__source-review-pending-fixture';
const pendingFixturePath = path.join('src/content/guides', `${pendingFixtureSlug}.md`);
const pendingFixtureOutput = path.join('dist/guides', pendingFixtureSlug);

const removeFixtureSitemapEntries = () => {
  const sitemapPath = 'dist/sitemap-0.xml';
  if (!fs.existsSync(sitemapPath)) return;
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  for (const slug of [fixtureSlug, pendingFixtureSlug]) {
    sitemap = sitemap.replace(new RegExp(`<url><loc>https://visalang\\.org/guides/${slug}/</loc>(?:<lastmod>[^<]+</lastmod>)?</url>`, 'g'), '');
  }
  fs.writeFileSync(sitemapPath, sitemap);
};

const fixture = `---
title: "Source review render fixture"
description: "A build-only fixture that verifies controlled source-review metadata rendering without publishing a real review claim."
category: "uk"
slug: "${fixtureSlug}"
publishedDate: "2026-07-01"
updatedDate: "2026-07-14"
sourceReviewedAt: "2026-07-10"
sourceReviewStatus: "reviewed"
reviewedByRole: "source-review"
contentStatus: "complete-route"
examOwnerUrl: "https://docs.astro.build/"
primaryIntent: "Test-only high-risk gate"
audienceScope: "Build fixture"
finalDecisionAuthorityType: "Test authority"
primaryOfficialAuthorityUrl: "https://example.gov/"
localExecutionPrompt: "Verify with the receiving authority."
author: "VisaLang"
readingTime: "1"
featured: false
related: []
---

## Fixture only

This temporary test content points to the [Astro documentation](https://docs.astro.build/) and is removed after the render assertion.
`;

const pendingFixture = fixture
  .replaceAll(fixtureSlug, pendingFixtureSlug)
  .replace('sourceReviewedAt: "2026-07-10"\n', '')
  .replace('sourceReviewStatus: "reviewed"', 'sourceReviewStatus: "pending"')
  .replace('reviewedByRole: "source-review"\n', '');

try {
  fs.rmSync(fixturePath, { force: true });
  fs.rmSync(pendingFixturePath, { force: true });
  fs.writeFileSync(fixturePath, fixture);
  fs.writeFileSync(pendingFixturePath, pendingFixture);
  execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });

  const reviewedHtml = fs.readFileSync(path.join(fixtureOutput, 'index.html'), 'utf8');
  assert.ok(reviewedHtml.includes('Official sources last checked: <time datetime="2026-07-10">2026-07-10</time>'), 'reviewed status renders sourceReviewedAt');
  assert.ok(!reviewedHtml.includes('Official verification pending'), 'reviewed status does not render pending copy');
  assert.ok(reviewedHtml.includes('Route structure complete'), 'reviewed authority metadata preserves the controlled Route structure complete status');
  assert.ok(reviewedHtml.includes('Source-reviewed verification responsibilities for this guide'), 'reviewed Route structure complete/Core route structure metadata renders the semantic source fact table');
  assert.ok(reviewedHtml.includes('Who decides this?') && reviewedHtml.includes('Test authority'), 'reviewed authority metadata renders the controlled decision authority');

  const unreviewedHtml = fs.readFileSync(path.join(pendingFixtureOutput, 'index.html'), 'utf8');
  assert.ok(unreviewedHtml.includes('Verification pending'), 'a high-risk guide with a final-authority URL remains downgraded while source review is pending');
  assert.ok(!unreviewedHtml.includes('Route structure complete') && !unreviewedHtml.includes('Core route structure'), 'pending source review cannot render Route structure complete/Core route structure even with a final-authority URL');
  assert.ok(!unreviewedHtml.includes('Source-reviewed verification responsibilities for this guide'), 'pending source review cannot render a source fact table');

  const pendingHtml = fs.readFileSync('dist/guides/goethe-a1-booking-mistakes/index.html', 'utf8');
  assert.ok(pendingHtml.includes('<dt>Updated</dt><dd><time datetime="2026-07-11">2026-07-11</time></dd>'), 'editing date remains visible as an update');
  assert.ok(pendingHtml.includes('Official verification pending'), 'missing sourceReviewedAt renders pending copy');
  assert.ok(!pendingHtml.includes('Official sources last checked'), 'updatedDate never falls back into source-review output');
  assert.ok(!pendingHtml.includes('Source-reviewed verification responsibilities for this guide'), 'unreviewed Complete/Core content does not manufacture a source fact table');

  const highRiskReviewedHtml = fs.readFileSync('dist/guides/ielts-ukvi-uk-visa/index.html', 'utf8');
  assert.ok(highRiskReviewedHtml.includes('Official sources last checked: <time datetime="2026-07-14">2026-07-14</time>'), 'reviewed high-risk metadata renders its controlled source date');
  assert.ok(highRiskReviewedHtml.includes('Verification pending'), 'reviewed sources do not promote incomplete high-risk content');
  assert.ok(!highRiskReviewedHtml.includes('Route structure complete') && !highRiskReviewedHtml.includes('Core route structure'), 'verification-pending remains consistent across the article header');
  assert.ok(highRiskReviewedHtml.includes('"dateModified":"2026-07-01"'), 'Article JSON-LD keeps the editorial updatedDate');
  assert.ok(!highRiskReviewedHtml.includes('"dateModified":"2026-07-14"'), 'Article JSON-LD does not reinterpret sourceReviewedAt as an editorial update');

  const spainHtml = fs.readFileSync('dist/guides/dele-levels-spanish-citizenship/index.html', 'utf8');
  assert.ok(spainHtml.includes('Official sources last checked: <time datetime="2026-07-16">2026-07-16</time>'), 'the Spain pilot renders its controlled source-review date');
  assert.ok(spainHtml.includes('Verification pending'), 'reviewed Spain sources do not promote incomplete applicant-specific content');
  assert.ok(spainHtml.includes('Spanish citizenship authority'), 'the Spain pilot renders the deciding-authority boundary');

  const spainA2CcseHtml = fs.readFileSync('dist/guides/dele-a2-ccse-spanish-citizenship/index.html', 'utf8');
  assert.ok(spainA2CcseHtml.includes('Official sources last checked: <time datetime="2026-07-16">2026-07-16</time>'), 'the second Spain pilot page renders its controlled source-review date');
  assert.ok(spainA2CcseHtml.includes('Verification pending'), 'the second reviewed Spain page remains pending for applicant-specific decisions');
  assert.ok(spainA2CcseHtml.includes('Spanish citizenship authority'), 'the second Spain page renders the deciding-authority boundary');

  const requirementHtml = fs.readFileSync('dist/guides/german-family-reunion-language-requirement/index.html', 'utf8');
  assert.ok(requirementHtml.includes('Save the current mission instruction for your route'), 'generated guide HTML renders the article-specific next action');
  assert.ok(!requirementHtml.includes('Confirm the current requirement with the organisation that will receive your proof.'), 'article-specific next action replaces the generic fallback copy');
  assert.ok(requirementHtml.includes('<small>Next guide</small><strong>Goethe A1 for Germany family reunion visa proof</strong>'), 'Germany A1 sequence renders the explicit primary next guide');
  assert.ok(!requirementHtml.includes('<small>Previous guide</small>'), 'Germany A1 sequence does not imply an ambiguous previous step when branches converge');

  for (const slug of ['goethe-a1-germany-family-reunion', 'goethe-a1-test-centers', 'german-a1-exam-booking-timeline']) {
    const englishHtml = fs.readFileSync(path.join('dist/guides', slug, 'index.html'), 'utf8');
    const chineseHtml = fs.readFileSync(path.join('dist/zh/guides', slug, 'index.html'), 'utf8');
    assert.ok(englishHtml.includes(`hreflang="zh-CN" href="https://visalang.org/zh/guides/${slug}/"`), `${slug} English page links to its Chinese equivalent`);
    assert.ok(chineseHtml.includes(`hreflang="en" href="https://visalang.org/guides/${slug}/"`), `${slug} Chinese page links to its English equivalent`);
    assert.ok(chineseHtml.includes('"@type":"Article"') && chineseHtml.includes('"@type":"BreadcrumbList"'), `${slug} Chinese page emits Article and BreadcrumbList JSON-LD`);
  }

  const chineseReviewedHtml = fs.readFileSync('dist/zh/guides/goethe-a1-test-centers/index.html', 'utf8');
  assert.ok(chineseReviewedHtml.includes('官方来源核验日期: <time datetime="2026-07-19">2026-07-19</time>'), 'Chinese review renders its controlled independent review date');
  assert.ok(chineseReviewedHtml.includes('来源与翻译审查'), 'Chinese review renders the controlled source and translation role');
  assert.ok(!chineseReviewedHtml.includes('独立中文来源复核待完成'), 'reviewed Chinese content no longer renders the pending boundary');
} finally {
  fs.rmSync(fixturePath, { force: true });
  fs.rmSync(pendingFixturePath, { force: true });
  fs.rmSync(fixtureOutput, { recursive: true, force: true });
  fs.rmSync(pendingFixtureOutput, { recursive: true, force: true });
  removeFixtureSitemapEntries();
}

const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
for (const slug of ['goethe-a1-germany-family-reunion', 'goethe-a1-test-centers', 'german-a1-exam-booking-timeline']) {
  assert.ok(sitemap.includes(`https://visalang.org/zh/guides/${slug}/`), `sitemap includes the Chinese ${slug} route`);
}
assert.ok(!sitemap.includes('__source-review-'), 'test fixtures are removed from the generated sitemap');
assert.ok(!sitemap.includes('.html'), 'generated sitemap excludes legacy .html URLs');

console.log('source-review rendered HTML states passed');
