const assert = require('node:assert/strict');

(async () => {
const routeTools = await import('../src/data/route-tools.ts');

assert.equal(routeTools.routeRegistry.filter((route) => route.availability === 'configured').length, 1, 'Only Germany family reunion A1 should be configured in the first release');
assert.deepEqual(
  routeTools.routeRegistry.filter((route) => route.availability === 'verify-only').map((route) => route.id),
  ['germany-b1', 'germany-ausbildung', 'germany-nursing', 'germany-university'],
  'Future routes should retain a safe verify-only structure'
);

const a1Result = routeTools.findRoute({ country: 'Germany', purpose: 'family-reunion', location: 'Berlin' });
assert.equal(a1Result.id, 'germany-family-reunion-a1');
assert.equal(a1Result.availability, 'configured');
assert.ok(a1Result.officialAction.includes('Confirm'));
assert.ok(a1Result.nextSteps.some((step) => step.includes('accepted A1 certificate')));

const unsupportedResult = routeTools.findRoute({ country: 'Germany', purpose: 'university' });
assert.equal(unsupportedResult.id, 'official-verification-required');
assert.equal(unsupportedResult.availability, 'verify-only');
assert.ok(unsupportedResult.officialAction.includes('receiving your application'));
assert.ok(unsupportedResult.authorityTypes.length >= 2, 'Safe fallback identifies institution types without deciding eligibility');
assert.match(unsupportedResult.officialEntry.href, /^https:\/\//, 'Safe fallback provides an official starting point');
assert.ok(unsupportedResult.questions.length >= 3, 'Safe fallback provides questions instead of a qualification conclusion');
const unknownCountryResult = routeTools.findRoute({ country: 'other', purpose: 'other' });
assert.equal(unknownCountryResult.officialEntry, null, 'Unknown countries do not receive a fabricated official URL');
assert.match(unknownCountryResult.officialEntryPending, /country-specific official entry/, 'Unknown countries receive an explicit official-entry boundary');

const configuredChecklist = routeTools.getChecklist('germany-family-reunion-a1');
assert.ok(configuredChecklist.length >= 10, 'Configured checklist decomposes broad reminders into atomic actions');
assert.equal(new Set(configuredChecklist.map((item) => item.id)).size, configuredChecklist.length, 'Configured checklist IDs are stable and unique');
assert.deepEqual([...new Set(configuredChecklist.map((item) => item.stage))], routeTools.checklistStageOrder, 'Configured checklist follows the declared stage order');
assert.deepEqual(routeTools.getChecklist('unknown-route'), [], 'Unsupported routes must not generate a pseudo-checklist');

assert.deepEqual(
  routeTools.calculateTimeline({ targetDate: '2026-12-31', resultWaitDays: 21, retakeBufferDays: 28, translationDays: 7 }),
  { targetDate: '2026-12-31', basePlanningDate: '2026-12-03', additionalBufferPlanningDate: '2026-11-05', basePlanningDays: 28, additionalBufferPlanningDays: 56, latestTestDate: '2026-12-03', cautiousTestDate: '2026-11-05', totalPlanningDays: 56 },
  'Deprecated pre-M2 input and result aliases remain compatible without appearing in current UI'
);
assert.equal(routeTools.calculateTimeline({ targetDate: 'not-a-date' }), null);
assert.equal(routeTools.calculateTimeline({ targetDate: '2026-02-30' }), null, 'Invalid calendar dates should be rejected');
assert.deepEqual(
  routeTools.calculateTimeline({ targetDate: '0099-12-31', resultWaitDays: 0, retakeBufferDays: 0, translationDays: 0 }),
  { targetDate: '0099-12-31', basePlanningDate: '0099-12-31', additionalBufferPlanningDate: '0099-12-31', basePlanningDays: 0, additionalBufferPlanningDays: 0, latestTestDate: '0099-12-31', cautiousTestDate: '0099-12-31', totalPlanningDays: 0 },
  'Four-digit years below 0100 should not be remapped into the 1900s'
);

const originalTimezone = process.env.TZ;
try {
  process.env.TZ = 'Pacific/Kiritimati';
  assert.deepEqual(
    routeTools.calculateTimeline({ targetDate: '2026-08-20', resultWaitDays: 0, retakeBufferDays: 0, translationDays: 0 }),
    { targetDate: '2026-08-20', basePlanningDate: '2026-08-20', additionalBufferPlanningDate: '2026-08-20', basePlanningDays: 0, additionalBufferPlanningDays: 0, latestTestDate: '2026-08-20', cautiousTestDate: '2026-08-20', totalPlanningDays: 0 },
    'Timeline dates should not move to the previous day in UTC+14'
  );
  assert.deepEqual(
    routeTools.calculateTimeline({ targetDate: '2026-08-20', resultWaitDays: 10, retakeBufferDays: 5, translationDays: 2 }),
    { targetDate: '2026-08-20', basePlanningDate: '2026-08-08', additionalBufferPlanningDate: '2026-08-03', basePlanningDays: 12, additionalBufferPlanningDays: 17, latestTestDate: '2026-08-08', cautiousTestDate: '2026-08-03', totalPlanningDays: 17 },
    'Timeline subtraction should be timezone-independent'
  );
} finally {
  if (originalTimezone === undefined) delete process.env.TZ;
  else process.env.TZ = originalTimezone;
}

assert.equal(routeTools.toolLinks.a1Pack, '/products/a1-family-reunion-pack/', 'Pack CTA should explain the proposed product before opening contact intent');
assert.equal(routeTools.toolLinks.a1PracticePack, '/products/a1-practice-pack/', 'Practice-pack CTA should resolve to its proposed-product page');
assert.equal(routeTools.toolLinks.routeReview, '/route-review/', 'Route Review CTA should explain its boundary before opening contact intent');

console.log('route tool rules passed');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
