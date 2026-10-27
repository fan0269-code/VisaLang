import assert from 'node:assert/strict';
import fs from 'node:fs';

const {
  claimRegistry,
  routeRules,
} = await import('../src/data/claim-registry.ts');
const {
  familyRelationshipOptions,
  getRouteFinderQuestionRelevance,
  resolveRouteFinder,
} = await import('../src/data/route-tools.ts');
const {
  applyToolPatch,
  clearToolState,
  createEmptyPlanState,
  projectStateForTool,
} = await import('../src/data/plan-state.ts');

assert.equal(typeof resolveRouteFinder, 'function', 'T15 exposes one claim-backed Route Finder resolver');
assert.deepEqual(
  familyRelationshipOptions.map((option) => option.id),
  ['spouse', 'other-family', 'not-confirmed'],
  'the Finder asks for a bounded relationship category instead of assuming every family route is a spouse route',
);

const supportedInput = {
  country: 'germany',
  purpose: 'family-reunion',
  applicationRegionId: 'germany-mission-china',
  relationship: 'spouse',
  certificate: 'none',
};

assert.deepEqual(
  getRouteFinderQuestionRelevance({ country: 'other', purpose: 'other' }),
  [],
  'an unsupported country and purpose requires no application region, relationship, or certificate answer before its safe result',
);
assert.deepEqual(
  getRouteFinderQuestionRelevance({ country: 'germany', purpose: 'family-reunion' }),
  ['applicationRegionId', 'relationship', 'certificate'],
  'the configured spouse route asks only the bounded follow-up questions that identify its verification path',
);
const currentRule = routeRules.find((rule) => rule.routeId === 'germany-family-reunion-a1');
assert.ok(currentRule, 'the configured route keeps its existing registered rule');

const ordinary = resolveRouteFinder(supportedInput, { asOf: '2026-09-09' });
assert.equal(ordinary.status, 'guidance_available', 'ordinary preparation receives bounded guidance when exact evidence is current');
assert.equal(ordinary.routeId, 'germany-family-reunion-a1', 'the configured route uses its stable route ID');
assert.equal(ordinary.allowChecklist, true, 'the current ordinary branch may continue to the route checklist');
assert.equal(ordinary.basis?.ruleId, currentRule.ruleId, 'the result exposes the exact rule that produced guidance');
assert.equal(ordinary.basis?.ruleVersion, currentRule.version, 'the result exposes the rule version');
assert.deepEqual(
  ordinary.basis?.claims.map((claim) => [claim.claimId, claim.version]),
  currentRule.claimRefs.map((claim) => [claim.claimId, claim.version]),
  'the result exposes every exact claim version used by the rule',
);
assert.ok(ordinary.basis?.claims.every((claim) => claim.sourceCheckedAt && claim.sources.length > 0), 'each basis claim includes dated official-source metadata');
assert.match(ordinary.boundary, /does not decide|does not confirm|not.*decision/i, 'the guidance retains its decision boundary');
assert.ok(ordinary.responsibleParties.some((owner) => /mission|authority/i.test(owner)), 'the result identifies the receiving authority as a responsible party');

const existingCertificate = resolveRouteFinder({ ...supportedInput, certificate: 'a1' }, { asOf: '2026-09-09' });
assert.equal(existingCertificate.status, 'needs_authority_confirmation', 'an existing A1 certificate takes a distinct authority-confirmation branch');
assert.equal(existingCertificate.allowChecklist, true, 'an existing-certificate user may use the bounded verification checklist');
assert.match(existingCertificate.nextSteps.join(' '), /exact.*certificate|accepted.*certificate|document form|recency/i, 'the existing-certificate branch gives a concrete proof-verification action');
assert.doesNotMatch(JSON.stringify(existingCertificate), /you are exempt|certificate is accepted|certificate has expired/i, 'the existing-certificate result never decides exemption, acceptance, or expiry');

const missingRegion = resolveRouteFinder({ ...supportedInput, applicationRegionId: 'not-confirmed' }, { asOf: '2026-09-09' });
assert.equal(missingRegion.status, 'needs_information', 'the non-empty not-confirmed region fails closed to needs_information');
assert.deepEqual(missingRegion.missingInformation, ['application region'], 'the result names the missing region information');
assert.equal(missingRegion.allowChecklist, false, 'a missing authority region cannot open a route-specific checklist');

const missingRelationship = resolveRouteFinder({ ...supportedInput, relationship: 'not-confirmed' }, { asOf: '2026-09-09' });
assert.equal(missingRelationship.status, 'needs_information', 'an unconfirmed relationship category does not inherit spouse guidance');
assert.ok(missingRelationship.missingInformation.includes('relationship category'), 'the result names the missing relationship category');

const tamperedRelationship = resolveRouteFinder({ ...supportedInput, relationship: 'tampered-value' }, { asOf: '2026-09-09' });
assert.equal(tamperedRelationship.status, 'needs_information', 'an out-of-allowlist relationship value fails closed instead of inheriting spouse guidance');
assert.equal(tamperedRelationship.allowChecklist, false, 'a tampered relationship value cannot open the spouse checklist');
assert.ok(tamperedRelationship.missingInformation.includes('relationship category'), 'the tampered relationship result names the input that must be corrected');

const otherFamilyRoute = resolveRouteFinder({ ...supportedInput, relationship: 'other-family' }, { asOf: '2026-09-09' });
assert.equal(otherFamilyRoute.status, 'unsupported', 'family routes outside the configured spouse branch are unsupported');
assert.equal(otherFamilyRoute.allowChecklist, false, 'an unsupported family relationship cannot open the spouse checklist');

for (const input of [
  { ...supportedInput, purpose: 'university' },
  { ...supportedInput, country: 'other', purpose: 'other' },
]) {
  const result = resolveRouteFinder(input, { asOf: '2026-09-09' });
  assert.equal(result.status, 'unsupported', 'an unconfigured country or purpose produces the public unsupported state');
  assert.ok(result.responsibleParties.length > 0 && result.nextSteps.length > 0, 'unsupported output names an authority type and a concrete verification action');
  assert.equal(result.allowChecklist, false, 'unsupported output does not continue to the configured checklist');
}

const targetClaimId = currentRule.claimRefs[0].claimId;
const staleClaims = claimRegistry.map((claim) => claim.claimId === targetClaimId ? { ...claim, status: 'withdrawn' } : claim);
const stale = resolveRouteFinder(supportedInput, { claims: staleClaims, asOf: '2026-09-09' });
assert.equal(stale.status, 'needs_authority_confirmation', 'withdrawn source evidence downgrades the production Finder result');
assert.equal(stale.allowChecklist, false, 'stale evidence cannot hand a deterministic route to Checklist');
assert.match(stale.nextSteps.join(' '), /confirm/i, 'stale evidence gives a concrete authority-confirmation action');

const wrongVersions = Object.fromEntries(currentRule.claimRefs.map((claim, index) => [claim.claimId, index === 0 ? 'wrong-version' : claim.version]));
assert.equal(
  resolveRouteFinder(supportedInput, { claimVersions: wrongVersions, asOf: '2026-09-09' }).status,
  'needs_authority_confirmation',
  'a supplied claim-version mismatch cannot produce guidance',
);

let plan = applyToolPatch(createEmptyPlanState(), 'timeline', {
  targetDate: '2026-12-15',
  resultWaitDays: 14,
  documentPreparationDays: 7,
  retakeBufferDays: 30,
});
plan = applyToolPatch(plan, 'finder', {
  routeId: ordinary.routeId,
  country: supportedInput.country,
  purpose: supportedInput.purpose,
  applicationRegionId: supportedInput.applicationRegionId,
  relationship: supportedInput.relationship,
  certificate: supportedInput.certificate,
});
const finderProjection = projectStateForTool(plan, 'finder');
assert.deepEqual(
  Object.keys(finderProjection).sort(),
  ['applicationRegionId', 'certificate', 'country', 'purpose', 'relationship'],
  'Finder projects only the rule inputs it needs and does not require level or target date',
);
assert.equal(plan.targetDate, '2026-12-15', 'Finder updates do not overwrite Timeline-owned dates');
assert.equal(plan.answers.relationship, 'spouse', 'the bounded relationship answer is retained in the session plan');
assert.equal(clearToolState(plan, 'finder').targetDate, '2026-12-15', 'restarting Finder does not clear Timeline-owned dates');

const page = fs.readFileSync('src/pages/tools/route-finder.astro', 'utf8');
const resultSupport = fs.readFileSync('src/components/tools/ToolResultSupport.astro', 'utf8');
assert.match(page, /select name="relationship"/, 'the page asks for the bounded relationship category when that configured route needs it');
assert.doesNotMatch(page, /name="level"/, 'the page does not require language level before it is needed for exam or study planning');
assert.doesNotMatch(page, /name="targetDate"/, 'the page does not require a date to obtain a route result');
assert.match(page, /resolveRouteFinder/, 'the production page consumes the claim-backed route resolver');
assert.match(page, /getRouteFinderQuestionRelevance/, 'the rendered Finder consumes the deterministic question-relevance contract before validating follow-up fields');
for (const status of ['guidance_available', 'needs_information', 'needs_authority_confirmation', 'unsupported']) {
  assert.ok(page.includes(`'${status}'`) || page.includes(status), `the page visibly handles ${status}`);
}
assert.match(
  resultSupport,
  /<section data-tool-continuation>\s*<h2>\{copy\.continueTitle\}<\/h2>/,
  'the shared continuation marker wraps the Checklist and Timeline links that Finder hides for non-actionable results',
);

console.log('M2-B T15 Route Finder state contracts passed');
