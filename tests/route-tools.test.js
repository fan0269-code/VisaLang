const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs
  .readFileSync('src/data/route-tools.ts', 'utf8')
  .replace(/export\s+(const|function)\s/g, '$1 ');

const routeTools = new Function(`${source}\nreturn { toolLinks, routeRegistry, safeRouteResult, findRoute, getChecklist, calculateTimeline, examComparisonOptions, examComparisonDimensions };`)();

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

assert.equal(routeTools.getChecklist('germany-family-reunion-a1').length, 3);
assert.deepEqual(routeTools.getChecklist('unknown-route'), [], 'Unsupported routes must not generate a pseudo-checklist');

assert.deepEqual(
  routeTools.calculateTimeline({ targetDate: '2026-12-31', resultWaitDays: 21, retakeBufferDays: 28, translationDays: 7 }),
  { targetDate: '2026-12-31', latestTestDate: '2026-12-03', cautiousTestDate: '2026-11-05', totalPlanningDays: 56 }
);
assert.equal(routeTools.calculateTimeline({ targetDate: 'not-a-date' }), null);

for (const dimension of routeTools.examComparisonDimensions.filter((dimension) => ['Fees', 'Result timing', 'Centre coverage and dates'].includes(dimension.label))) {
  assert.equal(dimension.value, 'Please verify with the official centre.');
}
assert.equal(routeTools.toolLinks.a1Pack, '/products/a1-family-reunion-pack/', 'Pack CTA should explain the proposed product before opening contact intent');
assert.equal(routeTools.toolLinks.a1PracticePack, '/products/a1-practice-pack/', 'Practice-pack CTA should resolve to its proposed-product page');
assert.equal(routeTools.toolLinks.routeReview, '/route-review/', 'Route Review CTA should explain its boundary before opening contact intent');

console.log('route tool rules passed');
