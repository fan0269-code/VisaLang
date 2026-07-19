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
const guideDirectory = 'src/content/guides';
const frontmatterField = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};
const germanyB1GuideSources = fs.readdirSync(guideDirectory)
  .filter((file) => file.endsWith('.md'))
  .map((file) => ({ file, source: fs.readFileSync(path.join(guideDirectory, file), 'utf8') }))
  .filter(({ source }) => frontmatterField(source, 'category') === 'germany-b1');
const germanyB1CoreSlugs = [
  'goethe-b1-germany-settlement-work',
  'germany-b1-citizenship-language-proof',
  'germany-b1-leben-in-deutschland-and-language-proof',
  'goethe-b1-vs-telc-b1',
  'goethe-b1-fees-and-booking',
  'goethe-b1-study-plan',
  'germany-b1-settlement-citizenship-timeline',
  'germany-b1-settlement-citizenship-checklist',
];
const structuredDataTypes = (html) => {
  const types = [];
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const visit = (value) => {
      if (Array.isArray(value)) return value.forEach(visit);
      if (!value || typeof value !== 'object') return;
      if (typeof value['@type'] === 'string') types.push(value['@type']);
      for (const child of Object.values(value)) visit(child);
    };
    visit(JSON.parse(json));
  }
  return types;
};

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
  assert.ok(spainHtml.includes('Official sources last checked: <time datetime="2026-07-19">2026-07-19</time>'), 'the Spain pilot renders its agent source re-review date');
  assert.ok(spainHtml.includes('Verification pending'), 'reviewed Spain sources do not promote incomplete applicant-specific content');
  assert.ok(spainHtml.includes('Spanish citizenship authority'), 'the Spain pilot renders the deciding-authority boundary');
  assert.ok(spainHtml.includes('Confirm the Ministry procedure and accepted evidence before choosing a DELE level or another product.'), 'the Spain choice page renders its authority-first next action');
  assert.ok(!spainHtml.includes('<small>Next guide</small>'), 'the Spain choice page is terminal and does not loop to the requirement page');

  const spainA2CcseHtml = fs.readFileSync('dist/guides/dele-a2-ccse-spanish-citizenship/index.html', 'utf8');
  assert.ok(spainA2CcseHtml.includes('Official sources last checked: <time datetime="2026-07-19">2026-07-19</time>'), 'the second Spain pilot page renders its agent source re-review date');
  assert.ok(spainA2CcseHtml.includes('Verification pending'), 'the second reviewed Spain page remains pending for applicant-specific decisions');
  assert.ok(spainA2CcseHtml.includes('Spanish citizenship authority'), 'the second Spain page renders the deciding-authority boundary');
  assert.ok(spainA2CcseHtml.includes('Save the current Ministry instruction before comparing or booking a DELE or CCSE product.'), 'the Spain requirement page renders its authority-first next action');
  assert.ok(spainA2CcseHtml.includes('<small>Next guide</small><strong>DELE levels and Spanish citizenship: verify the accepted proof first</strong>'), 'the Spain requirement page continues to the certificate-choice page');

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

  assert.equal(germanyB1GuideSources.length, 13, 'render checks cover all 13 Germany B1 guides');
  for (const { file, source } of germanyB1GuideSources) {
    const slug = frontmatterField(source, 'slug');
    const html = fs.readFileSync(path.join('dist/guides', slug, 'index.html'), 'utf8');
    const nextGuideSlug = frontmatterField(source, 'nextGuideSlug');
    const renderedNext = html.match(/<a href="([^"]+)"><small>Next guide<\/small>/)?.[1] || '';
    const renderedPrevious = html.match(/<a href="([^"]+)"><small>Previous guide<\/small>/)?.[1] || '';
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${file} renders exactly one H1`);
    assert.equal((html.match(/<details class="article-toc"/g) || []).length, 1, `${file} renders exactly one ArticleTOC`);
    const schemaTypes = structuredDataTypes(html);
    assert.ok(schemaTypes.includes('Article'), `${file} renders Article JSON-LD`);
    assert.ok(schemaTypes.includes('BreadcrumbList'), `${file} renders BreadcrumbList JSON-LD`);
    assert.ok(html.includes('aria-label="Disclaimer"') && html.includes('VisaLang does not provide legal or immigration advice'), `${file} renders the planning disclaimer`);
    assert.equal(renderedNext, nextGuideSlug ? `/guides/${nextGuideSlug}/` : '', `${file} renders its explicit business next step instead of an alphabetical neighbour`);
    assert.equal(renderedPrevious, '', `${file} does not render an alphabetical previous step into the explicit B1 route`);
  }

  for (const slug of germanyB1CoreSlugs) {
    const source = germanyB1GuideSources.find((guide) => frontmatterField(guide.source, 'slug') === slug)?.source || '';
    const html = fs.readFileSync(path.join('dist/guides', slug, 'index.html'), 'utf8');
    const sourceReviewedAt = frontmatterField(source, 'sourceReviewedAt');
    const updatedDate = frontmatterField(source, 'updatedDate');
    assert.ok(html.includes(`"dateModified":"${updatedDate}"`), `${slug} Article dateModified comes from updatedDate`);
    assert.equal(frontmatterField(source, 'sourceReviewStatus'), 'reviewed', `${slug} keeps the completed source review`);
    assert.equal(sourceReviewedAt, '2026-07-19', `${slug} keeps the actual source-review date`);
    assert.equal(frontmatterField(source, 'reviewedByRole'), 'source-review', `${slug} keeps the source-review role`);
    assert.ok(html.includes('Official sources last checked: <time datetime="2026-07-19">2026-07-19</time>'), `${slug} renders its controlled source-review date`);
    assert.ok(html.includes('<dt>Reviewed by role</dt><dd>Source review</dd>'), `${slug} renders the controlled source-review role`);
    assert.ok(!html.includes('Official verification pending'), `${slug} does not render a conflicting pending state`);
  }

  const b1HubHtml = fs.readFileSync('dist/germany-b1-settlement-citizenship/index.html', 'utf8');
  assert.equal((b1HubHtml.match(/<h1(?:\s|>)/g) || []).length, 1, 'Germany B1 hub renders exactly one H1');
  assert.equal((b1HubHtml.match(/<details class="article-toc"/g) || []).length, 1, 'Germany B1 hub renders exactly one ArticleTOC');
  assert.equal((b1HubHtml.match(/<link rel="canonical" href="https:\/\/visalang\.org\/germany-b1-settlement-citizenship\/">/g) || []).length, 1, 'Germany B1 hub renders its self-canonical exactly once');
  const hubSchemaTypes = structuredDataTypes(b1HubHtml);
  for (const schemaType of ['Organization', 'BreadcrumbList', 'CollectionPage']) {
    assert.ok(hubSchemaTypes.includes(schemaType), `Germany B1 hub renders ${schemaType} JSON-LD`);
  }
  const tocHtml = b1HubHtml.match(/<details class="article-toc"[\s\S]*?<\/details>/)?.[0] || '';
  const h2Ids = new Set([...b1HubHtml.matchAll(/<h2 id="([^"]+)"/g)].map((match) => match[1]));
  const tocTargets = [...tocHtml.matchAll(/href="#([^"]+)"/g)].map((match) => match[1]);
  assert.ok(tocTargets.length > 0, 'Germany B1 hub TOC exposes real section links');
  assert.equal(new Set(tocTargets).size, tocTargets.length, 'Germany B1 hub TOC has no duplicate targets');
  for (const target of tocTargets) assert.ok(h2Ids.has(target), `Germany B1 hub TOC target resolves to an H2 id: ${target}`);
  assert.doesNotMatch(b1HubHtml, /Content map and internal-link matrix|Existing B1 guide audit|Reworked as|Genuinely missing decision pages|proposed support|proposed human-service contact path/i, 'Germany B1 hub does not render internal editorial language');
  for (const [, href] of b1HubHtml.matchAll(/<a\b[^>]*href="(\/[^"#]*)"/g)) {
    const pathname = new URL(href, 'https://visalang.org').pathname;
    assert.ok(pathname.endsWith('/'), `Germany B1 hub rendered internal link uses a trailing slash: ${href}`);
    assert.ok(!pathname.endsWith('.html'), `Germany B1 hub rendered internal link avoids legacy HTML: ${href}`);
  }
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
for (const canonical of [
  'https://visalang.org/germany-b1-settlement-citizenship/',
  ...germanyB1GuideSources.map(({ source }) => `https://visalang.org/guides/${frontmatterField(source, 'slug')}/`),
]) {
  const escapedCanonical = canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  assert.equal((sitemap.match(new RegExp(`<loc>${escapedCanonical}</loc>`, 'g')) || []).length, 1, `sitemap includes the Germany B1 canonical exactly once: ${canonical}`);
}

console.log('source-review rendered HTML states passed');
