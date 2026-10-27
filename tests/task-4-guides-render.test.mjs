import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { guideRedirects } from '../src/data/publication-manifest.ts';
import * as claimRegistry from '../src/data/claim-registry.ts';
import { resolveZhGuideDirectAnswer, zhDirectAnswerUnavailable, zhGermanyA1Guides } from '../src/data/zh-germany-a1.ts';

const invalidFixtureSlug = '__task-4-invalid-claim-fixture';
const invalidFixturePath = `src/content/guides/${invalidFixtureSlug}.md`;
const invalidFixtureOutput = `dist/guides/${invalidFixtureSlug}/index.html`;
const orphanFixtureSlug = '__task-4-orphan-generated-fixture';
const orphanFixtureOutput = `dist/guides/${orphanFixtureSlug}/index.html`;
fs.rmSync(invalidFixturePath, { force: true });
fs.writeFileSync(invalidFixturePath, `---
title: "Task 4 invalid claim fixture"
description: "A temporary build fixture."
directAnswer: "This deterministic fixture answer must not render."
claimRefs:
  - claimId: "missing-claim"
    version: "2026-09-08.1"
category: "germany-a1"
slug: "${invalidFixtureSlug}"
publishedDate: "2026-09-08"
updatedDate: "2026-09-08"
sourceReviewedAt: "2026-09-08"
sourceReviewStatus: "reviewed"
reviewedByRole: "source-review"
contentStatus: "verification-pending"
noindex: true
adsEligible: false
primaryIntent: "Build-only invalid-claim check"
decisionStage: "requirement"
comparisonScope: "same-route"
audienceScope: "Build-only fixture."
finalDecisionAuthorityType: "Fixture authority"
primaryOfficialAuthorityUrl: "https://example.gov/"
examOwnerUrl: "https://example.org/"
localExecutionPrompt: "Confirm with the receiving authority."
author: "VisaLang"
---

## Fixture
`);

try {
execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });

const readPage = (route) => fs.readFileSync(`dist${route}index.html`, 'utf8');
const c01 = readPage('/guides/german-family-reunion-language-requirement/');
const guideIndex = readPage('/guides/');
const c07Path = 'dist/guides/goethe-a1-germany-family-reunion/index.html';
assert.ok(fs.existsSync(c07Path), 'English C07 is directly generated instead of being only a redirect');
const c07 = fs.readFileSync(c07Path, 'utf8');
const zhC01 = readPage('/zh/guides/german-family-reunion-language-requirement/');
const invalidFixture = readPage(`/guides/${invalidFixtureSlug}/`);
const count = (source, pattern) => (source.match(pattern) || []).length;
const ids = (html) => [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
const assertUniqueGuideIds = (name, html) => {
  const guideIds = ids(html);
  const duplicates = guideIds.filter((id, index) => guideIds.indexOf(id) !== index);
  assert.deepEqual(duplicates, [], `${name} has no duplicate IDs for readers or its table of contents`);
  assert.equal(guideIds.filter((id) => id === 'what-to-verify-officially').length, 1, `${name} has one standard official-verification section`);
};

assert.doesNotMatch(invalidFixture, /This deterministic fixture answer must not render/, 'an invalid claim set suppresses deterministic answer text in real built output');
assert.match(invalidFixture, /A deterministic answer is not shown because the recorded official claim set is missing, changed, or overdue/, 'an invalid claim set renders the fail-closed authority-confirmation boundary');

for (const [name, html, expectedAnswer] of [
  ['English C01', c01, /Spouses joining a partner in Germany usually need basic German \(A1\)/],
  ['English C07', c07, /A passed Goethe A1 certificate does not expire as a Goethe product fact/],
  ['Chinese C01', zhC01, /你不能只凭“家庭团聚”四个字断定自己一定要交 A1/],
]) {
  const h1End = html.indexOf('</h1>');
  const answerIndex = html.indexOf('id="direct-answer"');
  assert.ok(h1End >= 0 && answerIndex > h1End, `${name} places its page-specific direct answer immediately after the H1`);
  assert.match(html, expectedAnswer, `${name} renders its distinct direct answer rather than relabelling the description`);
  assert.equal(count(html, /class="verification-alert/g), 1, `${name} consolidates generic and local verification into one alert`);
}
assert.doesNotMatch(zhC01, /考试机构和考点不决定签证材料是否被接受/, 'Chinese C01 deterministic answer stays within its China-mission claim instead of asserting an unsupported exam-centre authority split');
for (const [name, html] of [['English C01', c01], ['English C07', c07], ['Chinese C01', zhC01]]) assertUniqueGuideIds(name, html);
const zhC01Summary = zhC01.match(/<section class="guide-summary-box"[^>]*>[\s\S]*?<\/section>/)?.[0] ?? '';
assert.ok(zhC01Summary, 'Chinese C01 renders its direct-answer summary');
assert.doesNotMatch(zhC01Summary, /。。/, 'Chinese C01 direct-answer boundary normalizes terminal Chinese punctuation');

assert.ok(!/Route structure complete|Core route structure/.test(c01), 'English public status copy uses reader-facing coverage language');
assert.ok(!/Route structure complete|Core route structure/.test(guideIndex), 'guide-library filters do not render internal maturity labels');
assert.match(guideIndex, /Coverage: complete route guide/, 'guide-library filters use reader-facing coverage labels');
assert.doesNotMatch(guideIndex, /Draft and verification-pending pages|verification-pending/, 'guide-library public copy does not expose internal status tokens');
assert.ok(!/路线结构完整|核心路线结构/.test(zhC01), 'Chinese public status copy uses reader-facing coverage language');
assert.doesNotMatch(c01, /<link rel="alternate" hreflang="zh-CN"/, 'general English C01 does not claim the China-scoped Chinese C01 as a translation');
assert.doesNotMatch(zhC01, /<link rel="alternate" hreflang="en"/, 'China-scoped Chinese C01 does not claim the general English C01 as a translation');
assert.match(c01, /language-skills FAQ[^\n]*checked 2026-09-08/, 'English C01 visible first official source matches its reviewed date');
assert.match(c01, /joining a German spouse[^\n]*checked 2026-09-08/, 'English C01 visible authority-split source matches its reviewed date');
assert.match(c01, /href="\/guides\/goethe-a1-germany-family-reunion\/"/, 'C01 offers a visible sibling handoff for an existing certificate');
assert.ok(!c01.includes('href="/guides/goethe-a1-germany-family-reunion/"><small>Next guide</small>'), 'C07 is not inserted into the seven-pillar sequential chain');

assert.match(c07, /Goethe product and certificate fact/, 'C07 separates Goethe product responsibility');
assert.match(c07, /Receiving authority’s recency and acceptance rule/, 'C07 separates receiving-authority responsibility');
assert.match(c07, /Your current route and document facts/, 'C07 separates reader-specific facts');
assert.match(c07, /Certificate-check record/, 'C07 renders the reusable certificate-check record');
for (const label of ['Product', 'Exam date', 'Intended procedure', 'Receiving authority', 'Evidence checked', 'Unresolved question']) assert.ok(c07.includes(label), `C07 record includes ${label}`);
assert.match(c07, /China application locations only/i, 'C07 keeps China recency wording visibly location-scoped');
assert.match(c07, /usually accepted/i, 'C07 preserves the China mission’s non-guaranteed wording');
assert.match(c07, /does not expire.*not.*acceptance guarantee/is, 'C07 does not turn Goethe certificate non-expiry into a global acceptance guarantee');
assert.ok(c07.includes('<meta name="robots" content="noindex,follow">'), 'C07 remains crawlable but noindex');
assert.ok(c07.includes('<link rel="canonical" href="https://visalang.org/guides/goethe-a1-germany-family-reunion/">'), 'C07 is self-canonical');
assert.ok(!fs.readFileSync('dist/sitemap-0.xml', 'utf8').includes('/guides/goethe-a1-germany-family-reunion/'), 'C07 stays out of the sitemap');
assert.ok(!c07.includes('pagead2.googlesyndication.com'), 'C07 stays ad-free');

assert.equal(guideRedirects['/guides/goethe-a1-germany-family-reunion/'], undefined, 'English C07 is no longer a manifest redirect');
assert.equal(guideRedirects['/zh/guides/goethe-a1-germany-family-reunion/'], undefined, 'Chinese C07 retains its source URL');
const redirects = fs.readFileSync('public/_redirects', 'utf8');
assert.doesNotMatch(redirects, /^\/guides\/goethe-a1-germany-family-reunion\/\s/m, 'English C07 redirect is removed');
assert.doesNotMatch(redirects, /^\/zh\/guides\/goethe-a1-germany-family-reunion\/\s+\/zh\/guides\/german-family-reunion-language-requirement\/\s+301$/m, 'Chinese C07 redirect is removed');

assert.equal(typeof claimRegistry.validateClaimSet, 'function', 'the build-rendered deterministic answer uses a claim-set validator');
assert.equal(claimRegistry.validateClaimSet([
  { claimId: 'germany-family-reunion-a1-general-starting-rule', version: '2026-09-08.1' },
  { claimId: 'germany-family-reunion-a1-authority-split', version: '2026-09-08.1' },
], {
  consumerId: 'guide:german-family-reunion-language-requirement',
  consumerLocale: 'en',
}).valid, true, 'current exact C01 claims allow their authorised English guide consumer to render its deterministic answer');
assert.equal(claimRegistry.validateClaimSet(
  [{ claimId: 'goethe-zertifikat-a1-product-and-certificate', version: 'wrong' }],
  { consumerId: 'guide:goethe-a1-germany-family-reunion', consumerLocale: 'en' },
).valid, false, 'invalid claim references fail closed before deterministic rendering');

const zhC01Record = zhGermanyA1Guides.find((guide) => guide.slug === 'german-family-reunion-language-requirement');
assert.ok(zhC01Record?.directAnswer, 'Chinese C01 has a controlled deterministic answer to validate');
assert.equal(resolveZhGuideDirectAnswer(zhC01Record), zhC01Record.directAnswer, 'current China-scoped claim references allow the Chinese C01 direct answer');
assert.equal(
  resolveZhGuideDirectAnswer({ ...zhC01Record, claimRefs: [{ claimId: 'missing-claim', version: '2026-09-08.1' }] }),
  zhDirectAnswerUnavailable,
  'missing Chinese C01 claim references suppress its deterministic answer',
);
const overdueZhClaims = claimRegistry.claimRegistry.map((claim) => claim.claimId === 'germany-family-reunion-a1-china-mission-context'
  ? { ...claim, nextReviewAt: '2026-09-07' }
  : claim);
assert.equal(
  resolveZhGuideDirectAnswer(zhC01Record, { claims: overdueZhClaims, asOf: '2026-09-08' }),
  zhDirectAnswerUnavailable,
  'overdue Chinese C01 claim references suppress its deterministic answer',
);

for (const guide of zhGermanyA1Guides.filter((entry) => entry.claimRefs)) {
  for (const ref of guide.claimRefs ?? []) {
    const claim = claimRegistry.claimRegistry.find((entry) => entry.claimId === ref.claimId && entry.version === ref.version);
    assert.ok(claim?.usedBy.includes(`guide:zh-${guide.slug}`), `${guide.slug} Chinese claim reference ${ref.claimId}@${ref.version} records its live rendered consumer`);
    assert.ok(!claim?.usedBy.some((consumer) => consumer.startsWith('future:')), `${guide.slug} Chinese claim reference ${ref.claimId}@${ref.version} has no stale future-only consumer`);
  }
}

for (const file of fs.readdirSync('src/content/guides').filter((entry) => entry.endsWith('.md') && entry !== `${invalidFixtureSlug}.md`)) {
  const source = fs.readFileSync(`src/content/guides/${file}`, 'utf8');
  const slug = source.match(/^slug: "([^"]+)"$/m)?.[1];
  const claimRefs = [...source.matchAll(/^  - claimId: "([^"]+)"\n    version: "([^"]+)"$/gm)];
  for (const [, claimId, version] of claimRefs) {
    const claim = claimRegistry.claimRegistry.find((entry) => entry.claimId === claimId && entry.version === version);
    assert.ok(claim?.usedBy.includes(`guide:${slug}`), `${slug} claim reference ${claimId}@${version} records its live rendered consumer`);
    assert.ok(!claim?.usedBy.some((consumer) => consumer.startsWith('future:')), `${slug} live claim reference ${claimId}@${version} has no stale future-only consumer`);
  }
}

console.log('Task 4 guide render and claim-boundary contracts passed');
} finally {
  fs.rmSync(invalidFixturePath, { force: true });
  execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });
  assert.ok(!fs.existsSync(invalidFixtureOutput), 'fixture cleanup leaves no generated public route after its source is removed');
  try {
    fs.mkdirSync(`dist/guides/${orphanFixtureSlug}`, { recursive: true });
    fs.writeFileSync(orphanFixtureOutput, '<!doctype html><html><body>orphan fixture</body></html>');
    assert.throws(
      () => execFileSync('node', ['scripts/launch-check.js'], { encoding: 'utf8', stdio: 'pipe' }),
      (error) => /Generated guide ownership failures/.test(`${error.stdout}\n${error.stderr}`),
      'launch-check rejects a generated guide that has no current source or manifest ownership',
    );
  } finally {
    fs.rmSync(`dist/guides/${orphanFixtureSlug}`, { recursive: true, force: true });
    execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });
  }
}
