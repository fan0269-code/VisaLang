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
  assert.ok(reviewedHtml.includes('Complete route'), 'reviewed authority metadata preserves the controlled Complete route status');
  assert.ok(reviewedHtml.includes('Source-reviewed verification responsibilities for this guide'), 'reviewed Complete/Core metadata renders the semantic source fact table');
  assert.ok(reviewedHtml.includes('Who decides this?') && reviewedHtml.includes('Test authority'), 'reviewed authority metadata renders the controlled decision authority');

  const unreviewedHtml = fs.readFileSync(path.join(pendingFixtureOutput, 'index.html'), 'utf8');
  assert.ok(unreviewedHtml.includes('Verification pending'), 'a high-risk guide with a final-authority URL remains downgraded while source review is pending');
  assert.ok(!unreviewedHtml.includes('Complete route') && !unreviewedHtml.includes('Core route'), 'pending source review cannot render Complete/Core even with a final-authority URL');
  assert.ok(!unreviewedHtml.includes('Source-reviewed verification responsibilities for this guide'), 'pending source review cannot render a source fact table');

  const pendingHtml = fs.readFileSync('dist/guides/goethe-a1-booking-mistakes/index.html', 'utf8');
  assert.ok(pendingHtml.includes('<dt>Updated</dt><dd><time datetime="2026-07-11">2026-07-11</time></dd>'), 'editing date remains visible as an update');
  assert.ok(pendingHtml.includes('Official verification pending'), 'missing sourceReviewedAt renders pending copy');
  assert.ok(!pendingHtml.includes('Official sources last checked'), 'updatedDate never falls back into source-review output');
  assert.ok(!pendingHtml.includes('Source-reviewed verification responsibilities for this guide'), 'unreviewed Complete/Core content does not manufacture a source fact table');

  const highRiskReviewedHtml = fs.readFileSync('dist/guides/ielts-ukvi-uk-visa/index.html', 'utf8');
  assert.ok(highRiskReviewedHtml.includes('Official sources last checked: <time datetime="2026-07-14">2026-07-14</time>'), 'reviewed high-risk metadata renders its controlled source date');
  assert.ok(highRiskReviewedHtml.includes('Verification pending'), 'reviewed sources do not promote incomplete high-risk content');
  assert.ok(!highRiskReviewedHtml.includes('Complete route') && !highRiskReviewedHtml.includes('Core route'), 'verification-pending remains consistent across the article header');
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
} finally {
  fs.rmSync(fixturePath, { force: true });
  fs.rmSync(pendingFixturePath, { force: true });
  fs.rmSync(fixtureOutput, { recursive: true, force: true });
  fs.rmSync(pendingFixtureOutput, { recursive: true, force: true });
}

console.log('source-review rendered HTML states passed');
