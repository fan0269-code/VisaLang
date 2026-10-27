import assert from 'node:assert/strict';
import fs from 'node:fs';

const registryPath = 'src/data/claim-registry.ts';
assert.ok(fs.existsSync(registryPath), 'the T05 claim registry exists before consumers use claim-derived guidance');

const {
  claimRegistry,
  claimLifecycleStatuses,
  examProducts,
  currentClaimAsOf,
  routeRules,
  resolveRouteRule,
  validateClaimSet,
} = await import('../src/data/claim-registry.ts');

const { b1RouteClaims } = await import('../src/data/b1-route-claims.ts');
const m4ClaimIds = new Set([...b1RouteClaims.map((claim) => claim.claimId), 'goethe-zertifikat-b1-format-score-modules-certificate', 'telc-zertifikat-deutsch-b1-format-score-partial-certificate']);
const checkedAt = '2026-09-08';
const productCheckedAt = '2026-09-09';
const feeCheckedAt = '2026-10-06';
const feeClaimIds = new Set(['goethe-germany-a1-2026-fees', 'goethe-beijing-a1-2026-fees']);
const productClaimIds = new Set([
  'goethe-zertifikat-a1-format-score-and-repeat',
  'telc-start-deutsch-1-format-score-and-partial-sitting',
]);
const requiredRule = routeRules.find((rule) => rule.ruleId === 'germany-family-reunion-a1-authority-guidance');
assert.ok(requiredRule, 'the supported Germany A1 rule is registered');
assert.deepEqual(claimLifecycleStatuses, ['draft', 'verified', 'needs_review', 'withdrawn'], 'claim lifecycle uses only the Master Package statuses');

for (const claim of claimRegistry) {
  const expectedCheckedAt = m4ClaimIds.has(claim.claimId) ? '2026-09-13' : feeClaimIds.has(claim.claimId) ? feeCheckedAt : productClaimIds.has(claim.claimId) ? productCheckedAt : checkedAt;
  assert.equal(claim.sourceCheckedAt, expectedCheckedAt, `${claim.claimId} uses its actual checked date`);
  if (feeClaimIds.has(claim.claimId)) assert.equal(claim.nextReviewAt, '2026-11-06', `${claim.claimId} has a scoped fee recheck date`);
  assert.equal(claim.effectiveFrom, null, `${claim.claimId} does not invent an effective-from date`);
  assert.equal(claim.effectiveTo, null, `${claim.claimId} does not invent an effective-to date`);
  assert.equal(claim.status, 'verified', `${claim.claimId} is explicitly reviewed rather than inferred from guide prose`);
  assert.ok(claim.claimId && claim.claimText && claim.version && claim.reviewedBy && claim.usedBy.length > 0, `${claim.claimId} has stable naming, version, process role, and consumers`);
  assert.ok(claim.route && claim.jurisdiction && Object.hasOwn(claim, 'examProduct'), `${claim.claimId} exposes the Master Package route, jurisdiction, and exam-product scope fields`);
  assert.ok(Array.isArray(claim.conditions) && Array.isArray(claim.exceptions), `${claim.claimId} carries explicit conditions and exceptions`);
  assert.ok(claim.sourceRefs.length > 0, `${claim.claimId} has official evidence`);
  for (const source of claim.sourceRefs) {
    assert.ok(source.publisher && source.url.startsWith('https://') && source.locator && source.supports && source.boundary, `${claim.claimId} keeps an atomic official-source boundary`);
  }
}

const generalClaim = claimRegistry.find((claim) => claim.claimId === 'germany-family-reunion-a1-general-starting-rule');
const chinaClaim = claimRegistry.find((claim) => claim.claimId === 'germany-family-reunion-a1-china-mission-context');
const chinaRecencyClaim = claimRegistry.find((claim) => claim.claimId === 'china-family-reunion-a1-certificate-recency-context');
assert.equal(generalClaim?.scope.jurisdiction, 'general English orientation only', 'general English orientation does not claim China-specific terms');
assert.equal(chinaClaim?.scope.jurisdiction, 'China application locations only', 'China mission context stays location-scoped');
assert.match(chinaClaim?.boundary ?? '', /not.*individual|not.*exception|not.*global/i, 'China scope does not infer an exception or individual result');
assert.equal(chinaRecencyClaim?.scope.locale, 'en', 'the China-only recency expression is scoped to its real English guide consumer');

const englishC01Consumer = {
  consumerId: 'guide:german-family-reunion-language-requirement',
  consumerLocale: 'en',
};
assert.equal(
  validateClaimSet([{ claimId: generalClaim.claimId, version: generalClaim.version }], { asOf: checkedAt, ...englishC01Consumer }).valid,
  true,
  'an exact current claim authorises its registered English guide consumer',
);
assert.equal(
  validateClaimSet([{ claimId: generalClaim.claimId, version: generalClaim.version }], { asOf: checkedAt }).valid,
  false,
  'claim validation without a stable consumer identity fails closed',
);
const noConsumerClaims = claimRegistry.map((claim) => claim.claimId === generalClaim.claimId ? { ...claim, usedBy: [] } : claim);
assert.equal(
  validateClaimSet([{ claimId: generalClaim.claimId, version: generalClaim.version }], { claims: noConsumerClaims, asOf: checkedAt, ...englishC01Consumer }).valid,
  false,
  'a claim with a missing usedBy authorisation cannot render deterministic guidance',
);
assert.equal(
  validateClaimSet([{ claimId: generalClaim.claimId, version: generalClaim.version }], {
    asOf: checkedAt,
    consumerId: 'guide:retired-family-reunion-page',
    consumerLocale: 'en',
  }).valid,
  false,
  'a wrong or stale usedBy consumer cannot render deterministic guidance',
);
const crossLocaleConsumerId = 'guide:cross-locale-family-reunion-page';
const crossLocaleClaims = claimRegistry.map((claim) => claim.claimId === chinaClaim.claimId
  ? { ...claim, usedBy: [...claim.usedBy, crossLocaleConsumerId] }
  : claim);
assert.equal(
  validateClaimSet([{ claimId: chinaClaim.claimId, version: chinaClaim.version }], {
    claims: crossLocaleClaims,
    asOf: checkedAt,
    consumerId: crossLocaleConsumerId,
    consumerLocale: 'en',
  }).valid,
  false,
  'an English consumer cannot use a zh-CN-scoped claim even when usedBy is misconfigured to include it',
);

const goetheA1 = examProducts.find((product) => product.id === 'goethe-zertifikat-a1-start-deutsch-1');
assert.ok(goetheA1, 'the source-checked Goethe A1 product is seeded');
assert.deepEqual(
  goetheA1.usedBy,
  ['guide:goethe-a1-germany-family-reunion', 'guide:goethe-a1-vs-telc-a1', 'guide:zh-goethe-a1-vs-telc-a1', 'tool:exam-comparison'],
  'the Goethe product record names each current guide and tool consumer',
);
assert.equal(
  validateClaimSet([goetheA1.productClaim, goetheA1.certificateClaim], {
    asOf: productCheckedAt,
    consumerId: `exam-product:${goetheA1.id}`,
    consumerLocale: 'multi-lingual',
  }).valid,
  true,
  'the exam product can use the exact product claim that authorises its stable product consumer ID',
);
assert.equal(goetheA1.localFee.amount, null, 'unknown local fee amounts remain null');
assert.equal(goetheA1.localFee.currency, null, 'unknown local fee currency remains null');
assert.equal(goetheA1.localFee.status, 'needs_authority_confirmation', 'unknown local fees require confirmation rather than a default');
assert.match(goetheA1.localFee.responsibleParty, /selected official or authorised test centre/i, 'local fee responsibility belongs to the selected centre');
assert.match(goetheA1.acceptance.responsibleParty, /German mission|receiving immigration authority/i, 'acceptance responsibility stays with the application authority');
assert.notEqual(goetheA1.localFee.responsibleParty, goetheA1.acceptance.responsibleParty, 'local fee and acceptance responsibility are separate');

const telcA1 = examProducts.find((product) => product.id === 'telc-start-deutsch-1-a1');
assert.ok(telcA1, 'the source-checked telc A1 product is seeded');
assert.deepEqual(
  telcA1.usedBy,
  ['guide:goethe-a1-vs-telc-a1', 'guide:zh-goethe-a1-vs-telc-a1', 'tool:exam-comparison'],
  'the telc product record names each current guide and tool consumer',
);
assert.equal(
  validateClaimSet([telcA1.productClaim, telcA1.certificateClaim], {
    asOf: productCheckedAt,
    consumerId: `exam-product:${telcA1.id}`,
    consumerLocale: 'multi-lingual',
  }).valid,
  true,
  'the telc product can use the exact claim that authorises its stable product consumer ID',
);

assert.equal(requiredRule.priority, 'P0', 'the authoritative route rule exposes its implementation priority');
assert.deepEqual(requiredRule.inputConditions.map((condition) => condition.id), ['applicationLocation'], 'the route rule exposes its explicit input condition');
assert.equal(requiredRule.intendedResultStatus, 'guidance_available', 'the route rule declares its intended result state');
assert.ok(requiredRule.explanation && requiredRule.outstandingItems.length > 0 && requiredRule.confirmationItems.length > 0 && requiredRule.nextActionId, 'the route rule exposes explanation, open confirmation work, and a next-action ID');

const currentClaimVersions = Object.fromEntries(requiredRule.claimRefs.map((claim) => [claim.claimId, claim.version]));
const guidance = resolveRouteRule({
  routeId: requiredRule.routeId,
  applicationLocation: 'Shanghai, China',
  claimVersions: currentClaimVersions,
});
assert.equal(guidance.status, 'guidance_available', 'exact current verified claim versions allow bounded guidance');
assert.match(guidance.nextAction, /confirm/i, 'available guidance still requires authority confirmation rather than an outcome');
assert.equal(guidance.ruleId, requiredRule.ruleId, 'resolution preserves the public rule ID');
assert.equal(guidance.nextActionId, requiredRule.nextActionId, 'resolution preserves the public next-action ID');

assert.equal(resolveRouteRule({ routeId: requiredRule.routeId, claimVersions: currentClaimVersions }).status, 'needs_information', 'missing application location fails closed to needs_information');
assert.equal(resolveRouteRule({ routeId: 'unknown-route', applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }).status, 'unsupported', 'unknown routes are unsupported');
assert.equal(resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: { ...currentClaimVersions, [requiredRule.claimRefs[0].claimId]: 'wrong-version' } }).status, 'needs_authority_confirmation', 'version mismatch cannot produce deterministic guidance');

for (const status of ['draft', 'needs_review', 'withdrawn']) {
  const alteredClaims = claimRegistry.map((claim) => claim.claimId === requiredRule.claimRefs[0].claimId ? { ...claim, status } : claim);
  const result = resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }, { claims: alteredClaims });
  assert.equal(result.status, 'needs_authority_confirmation', `${status} evidence fails closed`);
}

const incompleteClaims = claimRegistry.map((claim) => claim.claimId === requiredRule.claimRefs[0].claimId ? { ...claim, sourceRefs: [] } : claim);
assert.equal(resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }, { claims: incompleteClaims }).status, 'needs_authority_confirmation', 'incomplete official evidence fails closed');

const unauthorisedRouteClaims = claimRegistry.map((claim) => requiredRule.claimRefs.some((ref) => ref.claimId === claim.claimId)
  ? { ...claim, usedBy: claim.usedBy.filter((consumer) => consumer !== `route-rule:${requiredRule.ruleId}`) }
  : claim);
assert.equal(
  resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }, { claims: unauthorisedRouteClaims, asOf: checkedAt }).status,
  'needs_authority_confirmation',
  'route resolution fails closed when a required claim no longer authorises the stable route-rule consumer ID',
);

const overdueClaims = claimRegistry.map((claim) => claim.claimId === requiredRule.claimRefs[0].claimId ? { ...claim, nextReviewAt: '2026-09-07' } : claim);
assert.equal(resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }, { claims: overdueClaims, asOf: checkedAt }).status, 'needs_authority_confirmation', 'an otherwise verified but overdue claim cannot produce deterministic guidance');
assert.equal(currentClaimAsOf(), new Date().toISOString().slice(0, 10), 'default claim validation evaluates against the real current build date, not the frozen evidence-check date');
assert.equal(validateClaimSet([requiredRule.claimRefs[0]], { claims: overdueClaims }).valid, false, 'default claim validation fails closed for an overdue claim without an injected as-of date');

const retainedHistory = [...claimRegistry, { ...generalClaim, version: '2026-09-01.1', status: 'withdrawn' }];
assert.equal(resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }, { claims: retainedHistory, asOf: checkedAt }).status, 'guidance_available', 'withdrawn historical versions do not invalidate the exactly referenced verified version');

const exactDuplicateClaims = [...claimRegistry, { ...generalClaim }];
assert.equal(resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }, { claims: exactDuplicateClaims, asOf: checkedAt }).status, 'needs_authority_confirmation', 'duplicate records for one required claim ID and version fail closed');

const targetClaimId = requiredRule.claimRefs[0].claimId;
const withTargetClaim = (changes) => claimRegistry.map((claim) => claim.claimId === targetClaimId ? { ...claim, ...changes } : claim);
const zeroExactMatches = claimRegistry.filter((claim) => claim.claimId !== targetClaimId);
assert.equal(resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }, { claims: zeroExactMatches, asOf: checkedAt }).status, 'needs_authority_confirmation', 'zero records for a required claim ID and version fail closed');
const validBoundedInterval = withTargetClaim({ effectiveFrom: '2026-09-01', effectiveTo: '2026-09-30' });
assert.equal(resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }, { claims: validBoundedInterval, asOf: checkedAt }).status, 'guidance_available', 'valid ISO dates with a current effective interval allow bounded guidance');

for (const [description, claims, asOf] of [
  ['malformed source-check date', withTargetClaim({ sourceCheckedAt: '2026-9-08' }), checkedAt],
  ['malformed next-review date', withTargetClaim({ nextReviewAt: '2026-02-30' }), checkedAt],
  ['malformed effective-from date', withTargetClaim({ effectiveFrom: '2026-02-30' }), checkedAt],
  ['malformed effective-to date', withTargetClaim({ effectiveTo: '2026-09-31' }), checkedAt],
  ['future source-check date', withTargetClaim({ sourceCheckedAt: '2026-09-09' }), checkedAt],
  ['future-effective claim', withTargetClaim({ effectiveFrom: '2026-09-09' }), checkedAt],
  ['expired claim', withTargetClaim({ effectiveTo: '2026-09-07' }), checkedAt],
  ['inverted effective interval', withTargetClaim({ effectiveFrom: '2026-09-09', effectiveTo: '2026-09-07' }), checkedAt],
]) {
  assert.equal(resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }, { claims, asOf }).status, 'needs_authority_confirmation', `${description} fails closed`);
}

assert.equal(resolveRouteRule({ routeId: requiredRule.routeId, applicationLocation: 'Shanghai, China', claimVersions: currentClaimVersions }, { asOf: '2026-02-30' }).status, 'needs_authority_confirmation', 'a malformed resolver as-of date fails closed');

console.log('claim registry contracts passed');
