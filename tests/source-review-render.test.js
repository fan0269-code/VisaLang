const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { chinesePillarSlugs, englishPillarSlugs } = require('../src/data/publication-manifest.ts');

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
  .filter(({ source }) => frontmatterField(source, 'category') === 'germany-b1' && require('../src/data/publication-manifest.ts').englishPillarSlugs.includes(frontmatterField(source, 'slug')));
const germanyB1CoreSlugs = englishPillarSlugs.filter((slug) => germanyB1GuideSources.some(({ source }) => frontmatterField(source, 'slug') === slug));
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
  assert.ok(reviewedHtml.includes('Coverage: complete route guide'), 'reviewed authority metadata renders reader-facing coverage status');
  assert.ok(reviewedHtml.includes('Source-reviewed verification responsibilities for this guide'), 'reviewed coverage metadata renders the semantic source fact table');
  assert.ok(reviewedHtml.includes('Who decides this?') && reviewedHtml.includes('Test authority'), 'reviewed authority metadata renders the controlled decision authority');

  const unreviewedHtml = fs.readFileSync(path.join(pendingFixtureOutput, 'index.html'), 'utf8');
  assert.ok(unreviewedHtml.includes('Verification pending'), 'a high-risk guide with a final-authority URL remains downgraded while source review is pending');
  assert.ok(!unreviewedHtml.includes('Coverage: complete route guide') && !unreviewedHtml.includes('Coverage: core route guide'), 'pending source review cannot render mature coverage even with a final-authority URL');
  assert.ok(!unreviewedHtml.includes('Source-reviewed verification responsibilities for this guide'), 'pending source review cannot render a source fact table');

  for (const slug of englishPillarSlugs) {
    const source = fs.readFileSync(path.join(guideDirectory, `${slug}.md`), 'utf8');
    const html = fs.readFileSync(path.join('dist/guides', slug, 'index.html'), 'utf8');
    const nextSlug = frontmatterField(source, 'nextGuideSlug');
    const renderedNext = html.match(/<a href="([^"]+)"><small>Next guide<\/small>/)?.[1] || '';
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${slug} renders exactly one H1`);
    assert.ok(html.includes('aria-label="Disclaimer"'), `${slug} renders the planning disclaimer`);
    const sourceReviewedAt = frontmatterField(source, 'sourceReviewedAt');
    assert.ok(html.includes(`Official sources last checked: <time datetime="${sourceReviewedAt}">${sourceReviewedAt}</time>`), `${slug} renders the current source-review date`);
    assert.ok(html.includes('<dt>Reviewed by role</dt><dd>Source review</dd>'), `${slug} renders the source-review role`);
    assert.ok(!html.includes('Official verification pending'), `${slug} does not render a conflicting pending state`);
    assert.ok(html.includes(`"dateModified":"${frontmatterField(source, 'updatedDate')}"`), `${slug} keeps dateModified tied to updatedDate`);
    assert.ok(html.includes(`<link rel="canonical" href="https://visalang.org/guides/${slug}/">`), `${slug} renders its self-canonical`);
    assert.equal(renderedNext, nextSlug ? `/guides/${nextSlug}/` : '', `${slug} renders only its direct manifest-pillar next step`);
  }

  const highRiskReviewedHtml = fs.readFileSync('dist/guides/ielts-ukvi-uk-visa/index.html', 'utf8');
  const highRiskReviewedSource = fs.readFileSync('src/content/guides/ielts-ukvi-uk-visa.md', 'utf8');
  assert.ok(highRiskReviewedHtml.includes('Official sources last checked: <time datetime="2026-07-21">2026-07-21</time>'), 'reviewed high-risk metadata renders its current controlled source date');
  assert.ok(highRiskReviewedHtml.includes('Verification pending'), 'reviewed sources do not promote incomplete high-risk content');
  assert.ok(!highRiskReviewedHtml.includes('Coverage: complete route guide') && !highRiskReviewedHtml.includes('Coverage: core route guide'), 'verification-pending remains consistent across the article header');
  assert.ok(highRiskReviewedHtml.includes(`"dateModified":"${frontmatterField(highRiskReviewedSource, 'updatedDate')}"`), 'Article JSON-LD keeps the editorial updatedDate');

  const fiveCountryRoutes = {
    'ielts-ukvi-uk-visa': 'languagecert-selt-uk-visa',
    'languagecert-selt-uk-visa': '',
    'tef-canada-immigration': 'tcf-canada-vs-tef',
    'tcf-canada-vs-tef': '',
    'cils-b1-cittadinanza-for-italian-citizenship': 'cils-vs-celi-vs-plida-for-italian-citizenship',
    'cils-vs-celi-vs-plida-for-italian-citizenship': '',
    'portuguese-language-for-golden-visa-and-citizenship': 'portuguese-ciple-a2-for-citizenship-and-residence',
    'portuguese-ciple-a2-for-citizenship-and-residence': '',
    'yki-finnish-citizenship': '',
  };
  for (const [slug, nextSlug] of Object.entries(fiveCountryRoutes)) {
    const source = fs.readFileSync(path.join(guideDirectory, `${slug}.md`), 'utf8');
    const html = fs.readFileSync(path.join('dist/guides', slug, 'index.html'), 'utf8');
    const renderedNext = html.match(/<a href="([^"]+)"><small>Next guide<\/small>/)?.[1] || '';
    const sourceReviewedAt = frontmatterField(source, 'sourceReviewedAt');
    assert.equal((html.match(/<h1(?:\\s|>)/g) || []).length, 1, `${slug} renders one H1`);
    assert.ok(html.includes('aria-label="Disclaimer"'), `${slug} renders its disclaimer`);
    assert.ok(html.includes(`Official sources last checked: <time datetime="${sourceReviewedAt}">${sourceReviewedAt}</time>`), `${slug} renders the current source-review date`);
    assert.ok(html.includes('<dt>Reviewed by role</dt><dd>Source review</dd>'), `${slug} renders the source-review role`);
    assert.ok(html.includes(`"dateModified":"${frontmatterField(source, 'updatedDate')}"`), `${slug} keeps dateModified tied to updatedDate`);
    assert.equal(frontmatterField(source, 'nextGuideSlug'), nextSlug, `${slug} retains its reviewed same-route relationship in controlled metadata`);
    assert.equal(renderedNext, '', `${slug} stays outside generated next-guide navigation while pending`);
  }

  const ukRequirementHtml = fs.readFileSync('dist/guides/ielts-ukvi-uk-visa/index.html', 'utf8');
  const ukChoiceHtml = fs.readFileSync('dist/guides/languagecert-selt-uk-visa/index.html', 'utf8');
  for (const [slug, html] of [['ielts-ukvi-uk-visa', ukRequirementHtml], ['languagecert-selt-uk-visa', ukChoiceHtml]]) {
    assert.ok(html.includes('Verification pending'), `${slug} remains visibly pending after UK window B-1 content work`);
    assert.ok(!html.includes('Coverage: complete route guide') && !html.includes('Coverage: core route guide'), `${slug} does not render mature coverage while contentStatus is pending`);
  }
  assert.ok(ukRequirementHtml.includes('route-first requirement check'), 'IELTS UKVI render states the route-first requirement-check task');
  assert.equal(frontmatterField(fs.readFileSync('src/content/guides/ielts-ukvi-uk-visa.md', 'utf8'), 'nextGuideSlug'), 'languagecert-selt-uk-visa', 'IELTS UKVI retains its bounded provider-choice relationship in controlled metadata');
  assert.ok(!ukRequirementHtml.includes('<small>Next guide</small>'), 'IELTS UKVI stays outside generated next-guide navigation while pending');
  assert.ok(ukChoiceHtml.includes('provider-choice') || ukChoiceHtml.includes('SELT product verification'), 'LanguageCert SELT render states the provider-choice product-verification task');
  assert.ok(!ukChoiceHtml.includes('<small>Next guide</small>'), 'LanguageCert SELT render remains terminal');

  const portugalRequirementHtml = fs.readFileSync('dist/guides/portuguese-language-for-golden-visa-and-citizenship/index.html', 'utf8');
  const portugalChoiceHtml = fs.readFileSync('dist/guides/portuguese-ciple-a2-for-citizenship-and-residence/index.html', 'utf8');
  for (const [slug, html] of [
    ['portuguese-language-for-golden-visa-and-citizenship', portugalRequirementHtml],
    ['portuguese-ciple-a2-for-citizenship-and-residence', portugalChoiceHtml],
  ]) {
    assert.ok(html.includes('Verification pending'), `${slug} remains visibly pending after Portugal window B-2 content work`);
    assert.ok(!html.includes('Coverage: complete route guide') && !html.includes('Coverage: core route guide'), `${slug} does not render mature coverage while contentStatus is pending`);
    assert.ok(html.includes('2026-07-29'), `${slug} renders the current source recheck date`);
  }
  assert.ok(portugalRequirementHtml.includes('nationality-profile requirement check'), 'Portugal requirement render states its requirement-check task');
  assert.ok(portugalRequirementHtml.includes('href="/guides/portuguese-ciple-a2-for-citizenship-and-residence/"'), 'Portugal requirement content keeps its bounded product-verification handoff');
  assert.ok(!portugalRequirementHtml.includes('<small>Next guide</small>'), 'Portugal requirement stays outside generated next-guide navigation while pending');
  assert.ok(portugalChoiceHtml.includes('CIPLE product verification'), 'Portugal choice render states its product-verification task');
  assert.ok(!portugalChoiceHtml.includes('<small>Next guide</small>'), 'Portugal CIPLE choice render remains terminal');

  const finlandHtml = fs.readFileSync('dist/guides/yki-finnish-citizenship/index.html', 'utf8');
  assert.ok(finlandHtml.includes('Verification pending'), 'the consolidated Finland guide remains visibly pending');
  assert.ok(finlandHtml.includes('Official sources last checked: <time datetime="2026-07-29">2026-07-29</time>'), 'the Finland guide renders the current source recheck date');
  assert.ok(finlandHtml.includes('Migri') && finlandHtml.includes('final authority'), 'the Finland render keeps the decision authority visible');
  assert.ok(finlandHtml.includes('evidence-path record'), 'the Finland render includes the merged evidence comparison workflow');
  assert.ok(!finlandHtml.includes('<small>Next guide</small>'), 'the consolidated Finland guide is terminal');
  assert.ok(!fs.existsSync('dist/guides/yki-vs-other-finland-options/index.html'), 'the retired Finland guide is no longer generated');

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
  assert.equal(frontmatterField(fs.readFileSync('src/content/guides/dele-a2-ccse-spanish-citizenship.md', 'utf8'), 'nextGuideSlug'), 'dele-levels-spanish-citizenship', 'the Spain requirement retains its bounded certificate-choice relationship in controlled metadata');
  assert.ok(!spainA2CcseHtml.includes('<small>Next guide</small>'), 'the Spain requirement stays outside generated next-guide navigation while pending');

  const newlyReviewedP0Pages = [
    {
      slug: 'delf-b1-b2-french-work-study',
      authority: 'Sorbonne University Faculty of Arts and Humanities admissions',
      nextAction: 'Open the current admissions page for your exact faculty and programme before choosing a DELF or DALF level.',
    },
    {
      slug: 'tcf-irn-french-residence',
      authority: 'French Ministry of the Interior nationality procedure',
      nextAction: 'Identify the exact Ministry nationality procedure and save its current language-proof instructions before booking TCF IRN.',
    },
    {
      slug: 'staatsexamen-nt2-for-work-and-higher-education',
      authority: 'University of Amsterdam Dutch-taught bachelor admissions',
      nextAction: 'Open the current UvA admissions page for your Dutch-taught bachelor’s programme and confirm its accepted Dutch proof before registering for NT2.',
    },
  ];
  for (const { slug, authority, nextAction } of newlyReviewedP0Pages) {
    const html = fs.readFileSync(`dist/guides/${slug}/index.html`, 'utf8');
    assert.ok(html.includes('Official sources last checked: <time datetime="2026-07-19">2026-07-19</time>'), `${slug} renders its current source-review date`);
    assert.ok(html.includes('Verification pending'), `${slug} remains visibly pending after page-specific source review`);
    assert.ok(html.includes(authority), `${slug} renders the named decision authority or receiving institution`);
    assert.ok(html.includes(nextAction), `${slug} renders its page-specific authority-first next action`);
    assert.ok(!html.includes('<small>Next guide</small>'), `${slug} does not send readers into a different route as a sequential next step`);
  }

  const requirementHtml = fs.readFileSync('dist/guides/german-family-reunion-language-requirement/index.html', 'utf8');
  assert.ok(requirementHtml.includes('Save the current mission instruction for your route'), 'generated guide HTML renders the article-specific next action');
  assert.ok(!requirementHtml.includes('Confirm the current requirement with the organisation that will receive your proof.'), 'article-specific next action replaces the generic fallback copy');
  assert.ok(requirementHtml.includes('href="/guides/goethe-a1-vs-telc-a1/"><small>Next guide</small>'), 'Germany A1 sequence renders the direct next pillar');
  assert.ok(!requirementHtml.includes('<small>Previous guide</small>'), 'Germany A1 sequence does not imply an ambiguous previous step when branches converge');

  for (const slug of chinesePillarSlugs) {
    const englishHtml = fs.readFileSync(path.join('dist/guides', slug, 'index.html'), 'utf8');
    const chineseHtml = fs.readFileSync(path.join('dist/zh/guides', slug, 'index.html'), 'utf8');
    if (slug === 'german-family-reunion-language-requirement') {
      assert.ok(!englishHtml.includes(`<link rel="alternate" hreflang="zh-CN" href="https://visalang.org/zh/guides/${slug}/"`), 'general English C01 does not claim a China-scoped translation');
      assert.ok(!chineseHtml.includes(`<link rel="alternate" hreflang="en" href="https://visalang.org/guides/${slug}/"`), 'China-scoped Chinese C01 does not claim a general English translation');
    } else {
      assert.ok(englishHtml.includes(`hreflang="zh-CN" href="https://visalang.org/zh/guides/${slug}/"`), `${slug} English page links to its Chinese equivalent`);
      assert.ok(chineseHtml.includes(`hreflang="en" href="https://visalang.org/guides/${slug}/"`), `${slug} Chinese page links to its English equivalent`);
    }
    assert.ok(chineseHtml.includes('"@type":"Article"') && chineseHtml.includes('"@type":"BreadcrumbList"'), `${slug} Chinese page emits Article and BreadcrumbList JSON-LD`);
  }

  const chineseReviewedHtml = fs.readFileSync('dist/zh/guides/goethe-a1-test-centers/index.html', 'utf8');
  assert.ok(chineseReviewedHtml.includes('官方来源核验日期: <time datetime="2026-09-09">2026-09-09</time>'), 'Chinese review renders its controlled independent review date');
  assert.ok(chineseReviewedHtml.includes('来源与翻译审查'), 'Chinese review renders the controlled source and translation role');
  assert.ok(!chineseReviewedHtml.includes('独立中文来源复核待完成'), 'reviewed Chinese content no longer renders the pending boundary');

  assert.equal(germanyB1GuideSources.length, 8, 'render checks cover all eight Germany B1 pillars');
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
    assert.equal(sourceReviewedAt, '2026-09-13', `${slug} keeps the actual source-review date`);
    assert.equal(frontmatterField(source, 'reviewedByRole'), 'source-review', `${slug} keeps the source-review role`);
    assert.ok(html.includes('Official sources last checked: <time datetime="2026-09-13">2026-09-13</time>'), `${slug} renders its controlled source-review date`);
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
for (const slug of chinesePillarSlugs) {
  assert.ok(sitemap.includes(`https://visalang.org/zh/guides/${slug}/`), `sitemap includes the Chinese ${slug} route`);
}
assert.ok(!sitemap.includes('__source-review-'), 'test fixtures are removed from the generated sitemap');
assert.ok(!sitemap.includes('.html'), 'generated sitemap excludes legacy .html URLs');
const englishGuides = fs.readdirSync(guideDirectory)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const source = fs.readFileSync(path.join(guideDirectory, file), 'utf8');
    return {
      slug: frontmatterField(source, 'slug'),
      contentStatus: frontmatterField(source, 'contentStatus'),
      sourceReviewStatus: frontmatterField(source, 'sourceReviewStatus') || 'pending',
      noindex: frontmatterField(source, 'noindex') === 'true',
    };
  });
assert.equal(englishGuides.length, 53, 'source collection retains the P0 fee guide and restored C07 alongside the Scheme 3 collection');
for (const { slug, contentStatus, sourceReviewStatus, noindex } of englishGuides) {
  const canonical = `https://visalang.org/guides/${slug}/`;
  const escapedCanonical = canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const primaryDiscoveryEligible = englishPillarSlugs.includes(slug)
    && sourceReviewStatus === 'reviewed'
    && (contentStatus === 'complete-route' || contentStatus === 'core-route')
    && !noindex;
  const expectedCount = primaryDiscoveryEligible ? 1 : 0;
  assert.equal((sitemap.match(new RegExp(`<loc>${escapedCanonical}</loc>`, 'g')) || []).length, expectedCount, `sitemap matches the fail-closed discovery gate: ${canonical}`);
}
assert.equal((sitemap.match(/<loc>https:\/\/visalang\.org\/zh\/guides\/[^<]+<\/loc>/g) || []).length, 5, 'sitemap contains exactly five Chinese guide canonicals');
for (const canonical of [
  'https://visalang.org/germany-b1-settlement-citizenship/',
  ...germanyB1GuideSources.map(({ source }) => `https://visalang.org/guides/${frontmatterField(source, 'slug')}/`),
]) {
  const escapedCanonical = canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  assert.equal((sitemap.match(new RegExp(`<loc>${escapedCanonical}</loc>`, 'g')) || []).length, 1, `sitemap includes the Germany B1 canonical exactly once: ${canonical}`);
}

console.log('source-review rendered HTML states passed');
