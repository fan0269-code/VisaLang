const assert = require('node:assert/strict');
const fs = require('node:fs');

const routePairs = {
  uk: ['ielts-ukvi-uk-visa', 'languagecert-selt-uk-visa'],
  canada: ['tef-canada-immigration', 'tcf-canada-vs-tef'],
  italy: ['cils-b1-cittadinanza-for-italian-citizenship', 'cils-vs-celi-vs-plida-for-italian-citizenship'],
  portugal: ['portuguese-language-for-golden-visa-and-citizenship', 'portuguese-ciple-a2-for-citizenship-and-residence'],
  finland: ['yki-finnish-citizenship', 'yki-vs-other-finland-options'],
};

const read = (slug) => fs.readFileSync(`src/content/guides/${slug}.md`, 'utf8');
const field = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};

for (const [country, [requirementSlug, choiceSlug]] of Object.entries(routePairs)) {
  const requirement = read(requirementSlug);
  const choice = read(choiceSlug);
  for (const [slug, source] of [[requirementSlug, requirement], [choiceSlug, choice]]) {
    assert.equal(field(source, 'contentStatus'), 'verification-pending', `${slug} remains verification-pending`);
    assert.equal(field(source, 'sourceReviewStatus'), 'reviewed', `${slug} records the completed current source review`);
    assert.equal(field(source, 'sourceReviewedAt'), '2026-07-21', `${slug} records the actual review date`);
    assert.equal(field(source, 'reviewedByRole'), 'source-review', `${slug} records the controlled reviewer role`);
    assert.doesNotMatch(source, /This review did not establish|This page helps you prepare the questions and official sources to use\./, `${slug} removes internal review-template language`);
  }
  assert.equal(field(requirement, 'decisionStage'), 'requirement', `${country} starts at requirement`);
  assert.equal(field(requirement, 'nextGuideSlug'), choiceSlug, `${country} requirement points to choice`);
  assert.equal(field(choice, 'decisionStage'), 'choice', `${country} ends at choice`);
  assert.equal(field(choice, 'nextGuideSlug'), '', `${country} choice is terminal`);
}

console.log('P0 five-country source status and route rules passed');
