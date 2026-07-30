const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const guideDir = 'src/content/guides';
const files = fs.readdirSync(guideDir).filter((file) => file.endsWith('.md'));
const entries = files.map((file) => ({ file, source: fs.readFileSync(path.join(guideDir, file), 'utf8') }));
const field = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};
const slugs = new Set(entries.map(({ source }) => field(source, 'slug')));
const bySlug = new Map(entries.map((entry) => [field(entry.source, 'slug'), entry]));
const arrayField = (source, name) => {
  const raw = source.match(new RegExp(`^${name}:\\s*\\[(.*?)\\]`, 'm'))?.[1] || '';
  return [...raw.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
};
const bodyOnly = (source) => source.replace(/^---[\s\S]*?---\s*/, '');

const auditedGermanyA1Slugs = [
  'german-family-reunion-language-requirement',
  'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers',
  'goethe-a1-fees-by-country',
  'goethe-a1-retake-policy',
  'german-a1-documents-checklist',
  'german-a1-exam-booking-timeline',
];
const reviewedGermanyA1Slugs = new Set([
  'german-family-reunion-language-requirement',
  'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers',
  'goethe-a1-fees-by-country',
  'goethe-a1-retake-policy',
  'german-a1-documents-checklist',
  'german-a1-exam-booking-timeline',
]);
const newlyReviewedLocalSourceSlugs = new Set([
  'goethe-a1-test-centers',
  'goethe-a1-fees-by-country',
  'goethe-a1-retake-policy',
]);
for (const slug of auditedGermanyA1Slugs) {
  const source = bySlug.get(slug)?.source || '';
  assert.equal(field(source, 'contentStatus'), 'complete-route', `${slug} keeps content maturity independent from source review`);
  const expectedReviewDate = newlyReviewedLocalSourceSlugs.has(slug) ? '2026-07-19' : '2026-07-18';
  assert.equal(field(source, 'updatedDate'), expectedReviewDate, `${slug} records the substantive visible update`);
  for (const fieldName of ['audienceScope', 'finalDecisionAuthorityType', 'primaryOfficialAuthorityUrl', 'examOwnerUrl', 'localExecutionPrompt']) {
    assert.ok(field(source, fieldName), `${slug} records ${fieldName}`);
  }
  if (reviewedGermanyA1Slugs.has(slug)) {
    assert.equal(field(source, 'sourceReviewStatus'), 'reviewed', `${slug} records the completed source review`);
    assert.equal(field(source, 'sourceReviewedAt'), expectedReviewDate, `${slug} records the real source-review date`);
    assert.equal(field(source, 'reviewedByRole'), 'source-review', `${slug} records the source-review role`);
  }
}

assert.equal(field(bySlug.get('german-family-reunion-language-requirement')?.source || '', 'decisionStage'), 'requirement', 'the requirement guide uses the requirement decision stage');
const germanyA1MainRoute = [
  'german-family-reunion-language-requirement',
  'goethe-a1-germany-family-reunion',
  'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers',
  'goethe-a1-pre-booking-checklist',
  'german-a1-exam-booking-timeline',
  'german-a1-documents-checklist',
  'goethe-a1-official-links-practice-resources',
  'goethe-a1-30-day-study-plan',
];
for (let index = 0; index < germanyA1MainRoute.length - 1; index += 1) {
  const slug = germanyA1MainRoute[index];
  assert.equal(field(bySlug.get(slug)?.source || '', 'nextGuideSlug'), germanyA1MainRoute[index + 1], `${slug} points to the next main-route decision`);
}
assert.equal(field(bySlug.get('goethe-a1-30-day-study-plan')?.source || '', 'nextGuideSlug'), '', 'the main route terminates after the study plan');
assert.ok(!germanyA1MainRoute.includes('goethe-a1-retake-policy'), 'retake remains a conditional branch, not a universal main-route step');

for (const { source } of entries.filter(({ source }) => field(source, 'category') === 'germany-a1')) {
  const route = [];
  let cursor = field(source, 'slug');
  while (cursor) {
    assert.ok(!route.includes(cursor), `Germany A1 next-guide chain must terminate without a cycle: ${[...route, cursor].join(' -> ')}`);
    route.push(cursor);
    cursor = field(bySlug.get(cursor)?.source || '', 'nextGuideSlug');
  }
}

const germanyB1CoreRoute = {
  'goethe-b1-germany-settlement-work': {
    decisionStage: 'requirement',
    nextGuideSlug: 'goethe-b1-vs-telc-b1',
    supportingGuideSlugs: ['germany-b1-settlement-citizenship-checklist', 'germany-b1-settlement-citizenship-timeline'],
  },
  'germany-b1-citizenship-language-proof': {
    decisionStage: 'requirement',
    nextGuideSlug: 'goethe-b1-vs-telc-b1',
    supportingGuideSlugs: ['germany-b1-leben-in-deutschland-and-language-proof', 'germany-b1-settlement-citizenship-checklist'],
  },
  'germany-b1-leben-in-deutschland-and-language-proof': {
    decisionStage: 'requirement',
    nextGuideSlug: 'goethe-b1-vs-telc-b1',
    supportingGuideSlugs: ['germany-b1-citizenship-language-proof', 'germany-b1-settlement-citizenship-checklist'],
  },
  'goethe-b1-vs-telc-b1': {
    decisionStage: 'choice',
    nextGuideSlug: 'goethe-b1-fees-and-booking',
    supportingGuideSlugs: ['goethe-b1-germany-settlement-work', 'germany-b1-citizenship-language-proof'],
  },
  'goethe-b1-fees-and-booking': {
    decisionStage: 'local-execution',
    nextGuideSlug: 'germany-b1-settlement-citizenship-timeline',
    supportingGuideSlugs: ['goethe-b1-vs-telc-b1', 'goethe-b1-study-plan'],
  },
  'goethe-b1-study-plan': {
    decisionStage: 'local-execution',
    nextGuideSlug: 'germany-b1-settlement-citizenship-timeline',
    supportingGuideSlugs: ['goethe-b1-vs-telc-b1', 'goethe-b1-fees-and-booking'],
  },
  'germany-b1-settlement-citizenship-timeline': {
    decisionStage: 'local-execution',
    nextGuideSlug: 'germany-b1-settlement-citizenship-checklist',
    supportingGuideSlugs: ['goethe-b1-germany-settlement-work', 'germany-b1-citizenship-language-proof'],
  },
  'germany-b1-settlement-citizenship-checklist': {
    decisionStage: 'submission-review',
    nextGuideSlug: '',
    supportingGuideSlugs: ['goethe-b1-germany-settlement-work', 'germany-b1-citizenship-language-proof'],
  },
};

for (const [slug, expected] of Object.entries(germanyB1CoreRoute)) {
  const source = bySlug.get(slug)?.source || '';
  assert.equal(field(source, 'decisionStage'), expected.decisionStage, `${slug} uses the agreed B1 decision stage`);
  assert.equal(field(source, 'nextGuideSlug'), expected.nextGuideSlug, `${slug} uses the agreed B1 primary next step`);
  assert.deepEqual(arrayField(source, 'supportingGuideSlugs'), expected.supportingGuideSlugs, `${slug} uses only the agreed B1 supporting branches`);
}

const germanyB1Entries = entries.filter(({ source }) => field(source, 'category') === 'germany-b1');
assert.equal(germanyB1Entries.length, 13, 'Germany B1 route graph retains exactly 13 guides');
for (const { file, source } of germanyB1Entries) {
  const slug = field(source, 'slug');
  const nextGuideSlug = field(source, 'nextGuideSlug');
  const supportingGuideSlugs = arrayField(source, 'supportingGuideSlugs');
  assert.equal(new Set(supportingGuideSlugs).size, supportingGuideSlugs.length, `${file} has no duplicate supporting-guide targets`);
  assert.ok(!supportingGuideSlugs.includes(slug), `${file} has no supporting self-link`);
  if (nextGuideSlug) {
    const nextSource = bySlug.get(nextGuideSlug)?.source || '';
    assert.ok(nextSource, `${file} nextGuideSlug resolves: ${nextGuideSlug}`);
    assert.equal(field(nextSource, 'category'), 'germany-b1', `${file} nextGuideSlug stays in the Germany B1 route`);
    assert.notEqual(nextGuideSlug, slug, `${file} has no next-guide self-link`);
    assert.ok(!supportingGuideSlugs.includes(nextGuideSlug), `${file} keeps its primary next step out of supportingGuideSlugs`);
  }
  for (const supportingSlug of supportingGuideSlugs) {
    const supportingSource = bySlug.get(supportingSlug)?.source || '';
    assert.ok(supportingSource, `${file} supportingGuideSlug resolves: ${supportingSlug}`);
    assert.equal(field(supportingSource, 'category'), 'germany-b1', `${file} supportingGuideSlug stays in the Germany B1 route`);
  }

  const route = [];
  let cursor = slug;
  while (cursor) {
    assert.ok(!route.includes(cursor), `Germany B1 next-guide chain must terminate without a cycle: ${[...route, cursor].join(' -> ')}`);
    route.push(cursor);
    cursor = field(bySlug.get(cursor)?.source || '', 'nextGuideSlug');
  }
}
assert.equal(field(bySlug.get('germany-b1-settlement-citizenship-checklist')?.source || '', 'nextGuideSlug'), '', 'Germany B1 submission checklist is the terminal route page');

const supportReviewRouteExpectations = {
  'goethe-a1-germany-family-reunion': ['germany-a1', 'requirement', 'goethe-a1-vs-telc-a1'],
  'german-a1-family-reunion-faq': ['germany-a1', 'requirement', 'goethe-a1-vs-telc-a1'],
  'goethe-a1-listening-practice': ['germany-a1', 'local-execution', 'goethe-a1-speaking-topics'],
  'goethe-a1-speaking-topics': ['germany-a1', 'local-execution', 'goethe-a1-30-day-study-plan'],
  'goethe-a1-writing-practice': ['germany-a1', 'local-execution', 'goethe-a1-30-day-study-plan'],
  'goethe-a1-study-plan-working-adults': ['germany-a1', 'local-execution', 'goethe-a1-30-day-study-plan'],
  'goethe-a1-official-links-practice-resources': ['germany-a1', 'local-execution', 'goethe-a1-30-day-study-plan'],
  'goethe-a1-30-day-study-plan': ['germany-a1', 'local-execution', ''],
  'goethe-a1-booking-mistakes': ['germany-a1', 'local-execution', 'german-a1-documents-checklist'],
  'goethe-a1-pre-booking-checklist': ['germany-a1', 'local-execution', 'german-a1-exam-booking-timeline'],
  'goethe-b1-difficulty-analysis': ['germany-b1', 'local-execution', 'goethe-b1-study-plan'],
  'goethe-b1-listening-deep-dive': ['germany-b1', 'local-execution', 'goethe-b1-mock-exam-routine'],
  'goethe-b1-mock-exam-routine': ['germany-b1', 'local-execution', 'goethe-b1-study-plan'],
  'goethe-b1-speaking-topics': ['germany-b1', 'local-execution', 'goethe-b1-mock-exam-routine'],
  'goethe-b1-writing-assessment': ['germany-b1', 'local-execution', 'goethe-b1-mock-exam-routine'],
};
const stageRank = { requirement: 0, choice: 1, 'local-execution': 2, 'submission-review': 3 };
for (const [slug, [category, decisionStage, expectedNext]] of Object.entries(supportReviewRouteExpectations)) {
  const source = bySlug.get(slug)?.source || '';
  const nextGuideSlug = field(source, 'nextGuideSlug');
  const supportingGuideSlugs = arrayField(source, 'supportingGuideSlugs');
  assert.equal(field(source, 'category'), category, `${slug} remains in its support-page cluster`);
  assert.equal(field(source, 'decisionStage'), decisionStage, `${slug} uses the corrected decision stage`);
  assert.equal(nextGuideSlug, expectedNext, `${slug} uses the agreed support-page next step`);
  assert.ok(supportingGuideSlugs.length <= 2, `${slug} exposes at most two supporting guides`);
  assert.ok(!supportingGuideSlugs.includes(slug), `${slug} has no supporting self-link`);
  assert.ok(!nextGuideSlug || !supportingGuideSlugs.includes(nextGuideSlug), `${slug} does not duplicate its primary next step`);
  if (nextGuideSlug) {
    const nextSource = bySlug.get(nextGuideSlug)?.source || '';
    assert.equal(field(nextSource, 'category'), category, `${slug} keeps its primary next step in ${category}`);
    assert.ok(stageRank[field(nextSource, 'decisionStage')] >= stageRank[decisionStage], `${slug} does not move backwards in decision stage`);
  }
}

assert.equal(slugs.size, entries.length, 'Guide slugs must remain unique');
for (const { file, source } of entries) {
  const slug = field(source, 'slug');
  const description = field(source, 'description');
  assert.equal(`${slug}.md`, file, `${file} must match its canonical slug`);
  assert.ok(description.length >= 70 && description.length <= 170, `${file} needs a concise, specific SEO description`);
  assert.match(source, /^updatedDate:\s*"\d{4}-\d{2}-\d{2}"/m, `${file} needs an updated date`);
  assert.doesNotMatch(source, /Official sources last checked:/i, `${file} must not keep source-review dates outside controlled frontmatter`);
  assert.match(source, /https:\/\//, `${file} needs at least one traceable source link`);
  assert.doesNotMatch(source, /guaranteed pass|guaranteed visa|officially endorsed by VisaLang/i, `${file} must not make unsafe outcome or authority claims`);
  const nextGuideSlug = field(source, 'nextGuideSlug');
  if (nextGuideSlug) assert.ok(slugs.has(nextGuideSlug), `${file} nextGuideSlug must resolve: ${nextGuideSlug}`);
  const supportingGuideSlugs = arrayField(source, 'supportingGuideSlugs');
  const isFiveCountryRequirement = ['uk', 'canada', 'italy', 'portugal', 'finland'].includes(field(source, 'category')) && field(source, 'decisionStage') === 'requirement';
  assert.ok(supportingGuideSlugs.length > 0 || isFiveCountryRequirement, `${file} needs controlled supporting guides unless its only same-route peer is already the primary next step`);
  for (const relatedSlug of supportingGuideSlugs) assert.ok(slugs.has(relatedSlug), `${file} supporting guide slug must resolve: ${relatedSlug}`);
  const category = field(source, 'category');
  const decisionStage = field(source, 'decisionStage');
  assert.ok(isFiveCountryRequirement || supportingGuideSlugs.some((relatedSlug) => {
    const relatedSource = bySlug.get(relatedSlug)?.source || '';
    return field(relatedSource, 'category') === category || field(relatedSource, 'decisionStage') === decisionStage;
  }), `${file} needs at least one related guide in the same route or decision stage`);
  assert.match(field(source, 'comparisonScope'), /^(same-route|cross-country-comparison)$/, `${file} needs a controlled comparison scope`);
  if (category === 'germany-a1' && nextGuideSlug) {
    const nextSource = bySlug.get(nextGuideSlug)?.source || '';
    assert.notEqual(field(nextSource, 'nextGuideSlug'), slug, `${file} must not form a direct bidirectional next-guide loop with ${nextGuideSlug}`);
  }
}

const contentSchema = fs.readFileSync('src/content.config.ts', 'utf8');
for (const fieldName of ['sourceReviewedAt', 'sourceReviewStatus', 'reviewedByRole', 'contentStatus', 'primaryIntent', 'decisionStage', 'nextGuideSlug', 'supportingGuideSlugs', 'comparisonScope', 'audienceScope', 'finalDecisionAuthorityType', 'primaryOfficialAuthorityUrl', 'examOwnerUrl', 'localExecutionPrompt']) {
  assert.ok(contentSchema.includes(fieldName), `guide schema validates ${fieldName}`);
}
assert.match(contentSchema, /sourceReviewStatus:\s*z\.enum\(sourceReviewStatuses\)\.default\('pending'\)/, 'legacy guides migrate to an explicit pending source-review state');
assert.match(contentSchema, /sourceReviewedAt is required when sourceReviewStatus is reviewed/, 'reviewed guides require a source-review date');
assert.match(contentSchema, /sourceReviewedAt is only valid when sourceReviewStatus is reviewed/, 'pending and not-applicable guides cannot carry a misleading source-review date');
assert.match(contentSchema, /reviewedByRole is required when sourceReviewStatus is reviewed/, 'reviewed guides require a reviewer role');
assert.match(contentSchema, /contentStatus:\s*z\.enum\(contentStatuses\)/, 'guides require a controlled content status');

const statusDomain = fs.readFileSync('src/data/source-review.ts', 'utf8');
assert.match(statusDomain, /resolveGuideContentStatus/, 'content status uses one shared gate');
assert.match(statusDomain, /!guide\.primaryOfficialAuthorityUrl \|\| guide\.sourceReviewStatus !== 'reviewed'/, 'high-risk elevated status requires a final authority URL and reviewed sources');
assert.match(statusDomain, /if \(status === 'complete-route'\)/, 'complete routes use the controlled CTA mapping');
assert.match(statusDomain, /if \(status === 'core-route'\)/, 'core routes use the controlled CTA mapping');
assert.match(statusDomain, /if \(status === 'starter-overview'\)/, 'starter routes use the controlled CTA mapping');
const pendingCtaBranch = statusDomain.slice(statusDomain.indexOf("if (status === 'starter-overview')"));
assert.doesNotMatch(pendingCtaBranch, /Route Finder|checklist/i, 'verification-pending CTA branch cannot expose individual-decision tools');

const highRiskCategories = new Set(['portugal', 'spain', 'uk', 'canada', 'italy', 'france', 'finland', 'netherlands']);
const highRiskEntries = entries.filter(({ source }) => highRiskCategories.has(field(source, 'category')));
assert.equal(highRiskEntries.length, 15, 'the high-risk collection reflects the consolidated Finland guide');
for (const { file, source } of highRiskEntries) {
  assert.equal(field(source, 'contentStatus'), 'verification-pending', `${file} remains verification-pending without a reviewed source package`);
  for (const fieldName of ['primaryIntent', 'audienceScope', 'finalDecisionAuthorityType', 'examOwnerUrl', 'localExecutionPrompt']) {
    assert.ok(field(source, fieldName), `${file} records ${fieldName}`);
  }
  assert.ok(field(source, 'localExecutionPrompt').length >= 40, `${file} provides a concrete non-conclusive verification prompt`);
}

const activeCountryRoutePairs = {
  uk: ['ielts-ukvi-uk-visa', 'languagecert-selt-uk-visa'],
  canada: ['tef-canada-immigration', 'tcf-canada-vs-tef'],
  italy: ['cils-b1-cittadinanza-for-italian-citizenship', 'cils-vs-celi-vs-plida-for-italian-citizenship'],
  portugal: ['portuguese-language-for-golden-visa-and-citizenship', 'portuguese-ciple-a2-for-citizenship-and-residence'],
};
for (const [category, [requirementSlug, choiceSlug]] of Object.entries(activeCountryRoutePairs)) {
  const requirement = bySlug.get(requirementSlug)?.source || '';
  const choice = bySlug.get(choiceSlug)?.source || '';
  assert.equal(field(requirement, 'nextGuideSlug'), choiceSlug, `${category} requirement points to its choice page`);
  assert.equal(field(choice, 'nextGuideSlug'), '', `${category} choice page terminates`);
  for (const [slug, source] of [[requirementSlug, requirement], [choiceSlug, choice]]) {
    const next = field(source, 'nextGuideSlug');
    const supporting = arrayField(source, 'supportingGuideSlugs');
    assert.ok(!supporting.includes(slug), `${slug} has no supporting self-link`);
    assert.ok(!next || !supporting.includes(next), `${slug} does not duplicate its primary next step in supporting guides`);
    for (const supportingSlug of supporting) {
      assert.equal(field(bySlug.get(supportingSlug)?.source || '', 'category'), category, `${slug} keeps supporting guides inside ${category}`);
    }
    if (next) assert.notEqual(field(bySlug.get(next)?.source || '', 'nextGuideSlug'), slug, `${slug} has no direct bidirectional next loop`);
  }
}

const finlandGuide = bySlug.get('yki-finnish-citizenship')?.source || '';
const finlandBody = bodyOnly(finlandGuide);
assert.equal(field(finlandGuide, 'contentStatus'), 'verification-pending', 'the consolidated Finland guide remains pending');
assert.equal(field(finlandGuide, 'sourceReviewStatus'), 'reviewed', 'the Finland source review status remains controlled');
assert.equal(field(finlandGuide, 'sourceReviewedAt'), '2026-07-29', 'the Finland guide records the current source recheck');
assert.equal(field(finlandGuide, 'nextGuideSlug'), '', 'the consolidated Finland guide is terminal');
assert.ok(!bySlug.has('yki-vs-other-finland-options'), 'the duplicate Finland comparison entry is removed');
assert.match(finlandBody, /Migri.*(?:final authority|decides)|final authority.*Migri/is, 'the Finland guide keeps Migri as final authority');
assert.match(finlandBody, /YKI.*(?:one|several).*evidence|one.*evidence.*YKI/is, 'the Finland guide presents YKI as one evidence path');
assert.match(finlandBody, /oral.*written|speaking.*writing|listening.*writing|reading.*speaking/is, 'the Finland guide records the subtest-combination check');
assert.match(finlandBody, /evidence-path record|verification record/i, 'the Finland guide provides an evidence record');
assert.match(finlandBody, /Common mistakes/i, 'the Finland guide includes common mistakes');
assert.match(finlandBody, /Next action/i, 'the Finland guide includes a next action');
assert.doesNotMatch(finlandBody, /€\s?\d+|\b\d+\s?(?:hours?|days?|weeks?|months?)\b|guaranteed?\s+(?:citizenship|approval|outcome|result)|always accepted|YKI is (?:the )?(?:only|default)/i, 'the Finland guide avoids fixed dynamic facts and outcome promises');

const ukRequirement = bySlug.get('ielts-ukvi-uk-visa')?.source || '';
const ukChoice = bySlug.get('languagecert-selt-uk-visa')?.source || '';
assert.equal(field(ukRequirement, 'category'), 'uk', 'IELTS UKVI guide remains in the UK cluster');
assert.equal(field(ukChoice, 'category'), 'uk', 'LanguageCert SELT guide remains in the UK cluster');
assert.equal(field(ukRequirement, 'contentStatus'), 'verification-pending', 'IELTS UKVI remains pending after window B-1 content work');
assert.equal(field(ukChoice, 'contentStatus'), 'verification-pending', 'LanguageCert SELT remains pending after window B-1 content work');
assert.equal(field(ukRequirement, 'sourceReviewStatus'), 'reviewed', 'IELTS UKVI source review status is not downgraded or promoted');
assert.equal(field(ukChoice, 'sourceReviewStatus'), 'reviewed', 'LanguageCert SELT source review status is not downgraded or promoted');
assert.equal(field(ukRequirement, 'sourceReviewedAt'), '2026-07-21', 'IELTS UKVI keeps the real source-review date');
assert.equal(field(ukChoice, 'sourceReviewedAt'), '2026-07-21', 'LanguageCert SELT keeps the real source-review date');
assert.notEqual(field(ukRequirement, 'primaryIntent'), field(ukChoice, 'primaryIntent'), 'UK pages record distinct primary intents');
assert.notEqual(field(ukRequirement, 'audienceScope'), field(ukChoice, 'audienceScope'), 'UK pages record distinct audience scopes');
assert.notEqual(field(ukRequirement, 'localExecutionPrompt'), field(ukChoice, 'localExecutionPrompt'), 'UK pages record distinct local execution prompts');
assert.match(field(ukRequirement, 'primaryIntent'), /route-first|requirement|route requirement/i, 'IELTS UKVI records a route-first requirement-check intent');
assert.match(field(ukChoice, 'primaryIntent'), /provider-choice|product verification|LanguageCert/i, 'LanguageCert SELT records a provider-choice product-verification intent');
assert.match(field(ukRequirement, 'audienceScope'), /confirming|checking|route requirement|before choosing/i, 'IELTS UKVI audience starts before provider choice');
assert.match(field(ukChoice, 'audienceScope'), /already confirmed|provider|LanguageCert|product/i, 'LanguageCert SELT audience starts after requirement confirmation');
assert.match(field(ukRequirement, 'localExecutionPrompt'), /GOV\.UK|Home Office/i, 'IELTS UKVI prompt starts with the deciding authority');
assert.match(field(ukChoice, 'localExecutionPrompt'), /GOV\.UK|Home Office/i, 'LanguageCert SELT prompt starts with the deciding authority');
assert.match(field(ukRequirement, 'examOwnerUrl'), /ielts\.org/i, 'IELTS UKVI exam-owner URL remains IELTS-owned');
assert.match(field(ukChoice, 'examOwnerUrl'), /languagecert\.org/i, 'LanguageCert SELT exam-owner URL remains LanguageCert-owned');

const ukRequirementBody = bodyOnly(ukRequirement);
const ukChoiceBody = bodyOnly(ukChoice);
for (const [slug, source] of [['ielts-ukvi-uk-visa', ukRequirementBody], ['languagecert-selt-uk-visa', ukChoiceBody]]) {
  assert.match(source, /Home Office|GOV\.UK|UKVI/i, `${slug} keeps the UK final decision authority visible`);
  assert.match(source, /final decision|decides|does not decide|does not prove/i, `${slug} separates final decision authority from guide or provider facts`);
  assert.match(source, /exam product|provider|booking|approved product/i, `${slug} separates exam product facts from route decisions`);
  assert.match(source, /before booking|before paying|booking checklist|booking/i, `${slug} gives a pre-booking verification checklist`);
  assert.match(source, /not replace|does not replace|cannot replace|return to|use.*instead/i, `${slug} explains why the two UK pages cannot replace each other`);
  assert.match(source, /Common mistakes/i, `${slug} includes UK-specific common mistakes`);
  assert.match(source, /Next action|next step/i, `${slug} includes a next action section`);
  assert.doesNotMatch(source, /£\s?\d+|\b\d+\s?(?:hours?|days?|weeks?)\b|guaranteed?\s+(?:visa|citizenship|approval|outcome|result)|all UK visas|always accepted|(?:will|can|must)\s+(?:get|receive|secure|lead to)\s+(?:a\s+)?(?:visa|citizenship|approval|outcome|result)/i, `${slug} avoids fixed dynamic facts and outcome promises`);
}
assert.match(ukRequirementBody, /route-first requirement check/i, 'IELTS UKVI body names its route-first requirement-check task');
assert.match(ukChoiceBody, /provider-choice|SELT product verification/i, 'LanguageCert SELT body names its provider-choice product-verification task');

const portugalRequirement = bySlug.get('portuguese-language-for-golden-visa-and-citizenship')?.source || '';
const portugalChoice = bySlug.get('portuguese-ciple-a2-for-citizenship-and-residence')?.source || '';
const portugalRequirementBody = bodyOnly(portugalRequirement);
const portugalChoiceBody = bodyOnly(portugalChoice);
assert.match(portugalRequirementBody, /nationality-profile requirement check/i, 'Portugal requirement page names its nationality-profile requirement-check task');
assert.match(portugalChoiceBody, /CIPLE product verification/i, 'Portugal choice page names its CIPLE product-verification task');
for (const [slug, source] of [
  ['portuguese-language-for-golden-visa-and-citizenship', portugalRequirementBody],
  ['portuguese-ciple-a2-for-citizenship-and-residence', portugalChoiceBody],
]) {
  assert.match(source, /Justiça|Portuguese nationality authority/i, `${slug} keeps the nationality authority visible`);
  assert.match(source, /CAPLE/i, `${slug} identifies the CIPLE product owner`);
  assert.match(source, /authority record|verification record|before booking/i, `${slug} gives a pre-booking evidence checklist`);
  assert.match(source, /cannot replace|does not replace/i, `${slug} explains why the two Portugal pages cannot replace each other`);
  assert.match(source, /Common mistakes/i, `${slug} includes Portugal-specific common mistakes`);
  assert.match(source, /Next action/i, `${slug} includes a concrete next action`);
  assert.doesNotMatch(source, /€\s?\d+|\b\d+\s?(?:days?|weeks?|months?|years?)\b|guaranteed?\s+(?:nationality|citizenship|residence|approval|outcome|result)|always accepted|(?:will|can|must)\s+(?:get|receive|secure|lead to)\s+(?:Portuguese\s+)?(?:nationality|citizenship|residence|approval|outcome|result)/i, `${slug} avoids fixed dynamic facts and outcome promises`);
}

const highRiskAudit = fs.readFileSync('docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md', 'utf8');
for (const { file } of highRiskEntries) assert.ok(highRiskAudit.includes(`src/content/guides/${file}`), `${file} appears in the high-risk source audit`);

const blockedClaims = {
  'dele-levels-spanish-citizenship': /legal minimum|not required for citizenship|DELE A2 is the standard reference/i,
  'dele-a2-ccse-spanish-citizenship': /10 years|2 years for some nationalities|must pass both/i,
  'delf-b1-b2-french-work-study': /accepted for life|accepted by every|often requires B2 or C1|lifetime acceptance/i,
  'tcf-irn-french-residence': /Applicants for a multi-year residence permit|Applicants for French citizenship|requiring a B1 level/i,
  'staatsexamen-nt2-for-work-and-higher-education': /For vocational education \(MBO\) and jobs|For higher education \(HBO\/university\)|NT2 is the one/i,
};
for (const [slug, unsafePattern] of Object.entries(blockedClaims)) {
  assert.doesNotMatch(bySlug.get(slug)?.source || '', unsafePattern, `${slug} does not retain the audited deterministic claim`);
}

const newlyReviewedDecisionAuthorityPages = {
  'delf-b1-b2-french-work-study': { authority: /sorbonne-universite\.fr/, scope: /Sorbonne Faculty of Arts and Humanities admissions/i, eyebrow: /Sorbonne admissions/i },
  'tcf-irn-french-residence': { authority: /immigration\.interieur\.gouv\.fr/, scope: /French nationality procedure/i, eyebrow: /Nationality procedure/i },
  'staatsexamen-nt2-for-work-and-higher-education': { authority: /uva\.nl/, scope: /UvA Dutch-taught bachelor's admissions/i, eyebrow: /UvA admissions/i },
};
for (const [slug, { authority, scope, eyebrow }] of Object.entries(newlyReviewedDecisionAuthorityPages)) {
  const source = bySlug.get(slug)?.source || '';
  assert.equal(field(source, 'sourceReviewStatus'), 'reviewed', `${slug} records the completed page-specific source review`);
  assert.equal(field(source, 'sourceReviewedAt'), '2026-07-19', `${slug} records the current source-review date`);
  assert.equal(field(source, 'reviewedByRole'), 'source-review', `${slug} records the controlled reviewer role`);
  assert.equal(field(source, 'contentStatus'), 'verification-pending', `${slug} remains pending for reader-specific acceptance and execution`);
  assert.match(field(source, 'primaryOfficialAuthorityUrl'), authority, `${slug} records a named final-decision authority or receiving institution`);
  assert.match(field(source, 'primaryIntent'), scope, `${slug} narrows its intent to the branch controlled by the recorded authority`);
  assert.match(field(source, 'audienceScope'), scope, `${slug} narrows its audience to the branch controlled by the recorded authority`);
  assert.match(field(source, 'eyebrow'), eyebrow, `${slug} keeps its visible route label within the reviewed authority scope`);
  assert.equal(field(source, 'nextGuideSlug'), '', `${slug} terminates instead of sending readers into a different France or Netherlands route`);
  assert.match(source, /does not establish|does not decide|only applies|does not create a rule/i, `${slug} keeps the named-source scope boundary`);
}

const franceStudy = bySlug.get('delf-b1-b2-french-work-study')?.source || '';
const franceResidence = bySlug.get('tcf-irn-french-residence')?.source || '';
const dutchStudy = bySlug.get('staatsexamen-nt2-for-work-and-higher-education')?.source || '';
const dutchIntegration = bySlug.get('dutch-inburgering-a2-b1-for-integration-and-citizenship')?.source || '';
assert.match(franceStudy, /Sorbonne University/i, 'the DELF page names the reviewed receiving institution');
assert.match(franceStudy, /Faculty of Arts and Humanities/i, 'the DELF page limits the institution example to the reviewed faculty scope');
assert.match(franceResidence, /1 January 2026/i, 'the TCF IRN page dates the current French procedure rule');
assert.match(franceResidence, /B2/i, 'the TCF IRN page records the current nationality-procedure language level from the Ministry source');
assert.match(dutchStudy, /University of Amsterdam/i, 'the NT2 page names the reviewed receiving university');
assert.match(dutchStudy, /Dutch-taught bachelor/i, 'the NT2 page limits the acceptance example to the reviewed programme scope');
assert.equal(field(dutchIntegration, 'nextGuideSlug'), '', 'the separate Dutch integration route no longer loops into the work/study route');
assert.ok(arrayField(dutchIntegration, 'supportingGuideSlugs').includes('staatsexamen-nt2-for-work-and-higher-education'), 'the Dutch integration page may retain NT2 as non-sequential supporting context');

const highRiskSourceAudit = fs.readFileSync('docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md', 'utf8');
assert.match(highRiskSourceAudit, /P0-3 page-specific authority review — 2026-07-19/, 'the high-risk audit records the new page-specific authority review');
assert.match(highRiskSourceAudit, /FRANCE_HIGH_RISK_SOURCE_REVIEW_2026-07-19\.md/, 'the high-risk audit links the France evidence matrix');
assert.match(highRiskSourceAudit, /NETHERLANDS_NT2_SOURCE_REVIEW_2026-07-19\.md/, 'the high-risk audit links the Netherlands evidence matrix');

for (const slug of ['dele-levels-spanish-citizenship', 'dele-a2-ccse-spanish-citizenship']) {
  const source = bySlug.get(slug)?.source || '';
  assert.equal(field(source, 'sourceReviewStatus'), 'reviewed', `${slug} records the completed narrow source review`);
  assert.equal(field(source, 'sourceReviewedAt'), '2026-07-19', `${slug} records the agent source re-review date`);
  assert.equal(field(source, 'contentStatus'), 'verification-pending', `${slug} remains pending despite the reviewed source package`);
  assert.match(field(source, 'primaryOfficialAuthorityUrl'), /mjusticia\.gob\.es/, `${slug} records the Spanish deciding authority`);
  assert.match(source, /does not establish|cannot decide|does not let VisaLang decide/i, `${slug} keeps the applicant-specific decision boundary`);
}

const spainRequirement = bySlug.get('dele-a2-ccse-spanish-citizenship')?.source || '';
const spainChoice = bySlug.get('dele-levels-spanish-citizenship')?.source || '';
assert.equal(field(spainRequirement, 'decisionStage'), 'requirement', 'Spain starts with the citizenship requirement and evidence question');
assert.equal(field(spainRequirement, 'nextGuideSlug'), 'dele-levels-spanish-citizenship', 'Spain requirement page continues to the certificate-choice page');
assert.ok(!arrayField(spainRequirement, 'supportingGuideSlugs').includes('dele-levels-spanish-citizenship'), 'Spain requirement keeps its primary next page out of supporting links');
assert.equal(field(spainChoice, 'decisionStage'), 'choice', 'Spain certificate page remains a choice step');
assert.equal(field(spainChoice, 'nextGuideSlug'), '', 'Spain certificate-choice page terminates instead of looping to the requirement page');
assert.ok(arrayField(spainChoice, 'supportingGuideSlugs').includes('dele-a2-ccse-spanish-citizenship'), 'Spain certificate choice keeps the requirement page as supporting context');

const spainPilotAudit = fs.readFileSync('docs/SPAIN_CONTENT_SOURCE_PILOT_2026-07-16.md', 'utf8');
assert.match(spainPilotAudit, /AGENT_REREVIEW_COMPLETED_WITH_APPLICANT_BOUNDARY/, 'Spain pilot records the agent pre-review disposition');
assert.match(spainPilotAudit, /Human acceptance gate:\s*`ACCEPTED_BY_PROJECT_OWNER`/, 'Spain pilot records the project-owner wording acceptance');
assert.match(spainPilotAudit, /Human acceptance date:\s*2026-07-19/, 'Spain pilot records the human acceptance date');
assert.match(spainPilotAudit, /explicit user confirmation in the Codex task/i, 'Spain pilot records the acceptance evidence without inventing a personal identity');
assert.match(spainPilotAudit, /Re-review date:\s*2026-07-19/, 'Spain pilot records the actual agent re-review date');

const contentMap = fs.readFileSync('docs/CONTENT_MAP.md', 'utf8');
assert.doesNotMatch(contentMap, /named human acceptance pending/i, 'the content ledger no longer reports the accepted Spain wording as pending');
assert.doesNotMatch(contentMap, /^1\. A named human reviewer must inspect and intentionally accept or reject the two Spain pilot rewrites/m, 'the completed Spain acceptance gate is removed from the execution queue');
assert.match(contentMap, /Project-owner wording acceptance completed on 2026-07-19/i, 'the content ledger records the completed Spain wording acceptance');
assert.doesNotMatch(highRiskSourceAudit, /Human review of retained Ministry-first wording/, 'the high-risk audit closes the wording-review requirement for both Spain pages');

for (const source of [spainRequirement, spainChoice]) {
  assert.doesNotMatch(source, /\b(?:1|2|5|10|one|two|five|ten)[ -]years?\b/i, 'Spain pilot does not publish fixed residence-year shortcuts');
  assert.doesNotMatch(source, /\b(?:must|required to)\s+(?:take|pass)\s+(?:the\s+)?(?:DELE|CCSE|both)\b/i, 'Spain pilot does not publish a universal named-exam rule');
  assert.doesNotMatch(source, /\b(?:no exemptions?|cannot be exempt|everyone must|all applicants? must)\b/i, 'Spain pilot does not publish a universal exemption or applicant rule');
}

const lastCheckedBadge = fs.readFileSync('src/components/LastCheckedBadge.astro', 'utf8');
assert.match(lastCheckedBadge, /status === 'reviewed' && date/, 'source-review dates render only for reviewed records');
assert.match(lastCheckedBadge, /Official verification pending/, 'pending records render a clear source-review state');
assert.match(lastCheckedBadge, /Official source review not applicable/, 'not-applicable records render a distinct source-review state');

const guideRoute = fs.readFileSync('src/pages/guides/[slug].astro', 'utf8');
const guideLayout = fs.readFileSync('src/layouts/GuideLayout.astro', 'utf8');
assert.doesNotMatch(guideRoute, /guide\.body\.match\(\/Official sources last checked/, 'guide routes do not infer review dates from Markdown body text');
assert.match(guideRoute, /sourceReviewedAt=\{frontmatter\.sourceReviewedAt\}/, 'guide routes pass the controlled source-review date');
assert.match(guideLayout, /<LastCheckedBadge date=\{sourceReviewedAt\} status=\{sourceReviewStatus\}/, 'guide HTML delegates source-review output to controlled metadata');
assert.doesNotMatch(guideLayout, /<LastCheckedBadge date=\{updatedDate\}/, 'updatedDate is never used as a source-review date');
assert.match(guideRoute, /author=\{frontmatter\.author\}/, 'guide routes pass the controlled author');
assert.match(guideRoute, /reviewedByRole=\{frontmatter\.reviewedByRole\}/, 'guide routes pass the controlled review role');
assert.match(guideLayout, /<dt>Written by<\/dt><dd>\{author\}<\/dd>/, 'visible byline uses the same controlled author value');
assert.match(guideLayout, /name: author/, 'Article JSON-LD uses the same controlled author value');
assert.match(guideRoute, /comparisonScope === 'cross-country-comparison' && \/compar\/i/, 'cross-country related guides require comparison scope and explicit intent');

const appData = fs.readFileSync('src/data/app-data.ts', 'utf8');
const examRows = [...appData.matchAll(/\{ name: '([^']+)', officialSource: '([^']+)', lastUpdated: '(\d{4}-\d{2}-\d{2})', category: '([^']+)', country: '([^']+)' \}/g)].map((match) => ({ name: match[1], officialSource: match[2], lastUpdated: match[3], category: match[4], country: match[5] }));
assert.equal(examRows.length, 31, 'live Astro exam directory retains all 31 configured exam records');
assert.equal(new Set(examRows.map((exam) => exam.name)).size, examRows.length, 'exam names must be unique');
for (const exam of examRows) {
  assert.ok(exam.officialSource.startsWith('https://'), `${exam.name} needs an HTTPS official source`);
  assert.match(exam.lastUpdated, /^\d{4}-\d{2}-\d{2}$/, `${exam.name} needs a checked date`);
  assert.ok(exam.category && exam.country, `${exam.name} needs category and country metadata`);
}
for (const requiredSource of ['Goethe-Institut', 'telc', 'TestDaF', 'BAMF']) {
  assert.ok(appData.includes(requiredSource), `app data retains official source: ${requiredSource}`);
}
for (const legacy of ['index.html', 'about.html', 'contact.html', 'privacy-policy.html', 'terms.html', 'cookie-policy.html', 'editorial-policy.html', 'affiliate-disclosure.html']) {
  assert.ok(fs.existsSync(legacy), `legacy file remains available until hosting source-of-truth is confirmed: ${legacy}`);
}

const deployScript = fs.readFileSync('deploy/deploy.sh', 'utf8');
assert.match(deployScript, /SOURCE_DIR=.*\/source/, 'deployment keeps source separate from releases');
assert.match(deployScript, /RELEASES_DIR="\$SITE_DIR\/releases"/, 'deployment stores immutable releases separately');
assert.match(deployScript, /CURRENT_LINK="\$SITE_DIR\/current"/, 'deployment switches the canonical current release link');
assert.match(deployScript, /npm --prefix "\$SOURCE_DIR" run launch-check/, 'deployment uses launch-check to build and validate before publishing');
assert.match(deployScript, /SOURCE_DIR\/dist\/index\.html/, 'deployment blocks publication without the Astro root entry');
assert.match(deployScript, /cp -a "\$SOURCE_DIR\/dist\/\." "\$RELEASE_DIR\//, 'deployment publishes the complete Astro dist output to a release candidate');
assert.match(deployScript, /SUDO="sudo"/, 'deployment supports the ubuntu plus sudo server account');

console.log('guide sources, related links, compliance, app data, legacy handoff, and deployment checks passed');
