import assert from 'node:assert/strict';

const {
  PLAN_BUFFER_MAX_DAYS,
  PLAN_DEVICE_RETENTION_DAYS,
  PLAN_SCHEMA_VERSION,
  LEGACY_TOOL_LOCAL_STORAGE_PREFIX,
  applyToolPatch,
  chooseRestorablePlan,
  clearToolState,
  createDevicePlanSnapshot,
  createEmptyPlanState,
  parseLegacyToolQuery,
  parseStoredPlan,
  projectStateForTool,
  sanitizePlanState,
  serializeSafeShareState,
} = await import('../src/data/plan-state.ts');
const { buildChecklist } = await import('../src/data/route-tools.ts');

const now = '2026-09-09T00:00:00.000Z';
const routeId = 'germany-family-reunion-a1';
const goetheId = 'goethe-zertifikat-a1-start-deutsch-1';
const telcId = 'telc-start-deutsch-1-a1';
const checklistIds = buildChecklist({ routeId }).groups.flatMap((group) => group.items.map((item) => item.id));

assert.equal(PLAN_SCHEMA_VERSION, 1, 'shared plan state starts with an explicit schema version');
assert.equal(PLAN_DEVICE_RETENTION_DAYS, 30, 'device persistence is bounded to 30 days');
assert.ok(Number.isSafeInteger(PLAN_BUFFER_MAX_DAYS) && PLAN_BUFFER_MAX_DAYS > 0, 'buffer validation has a finite explicit upper bound');
assert.equal(LEGACY_TOOL_LOCAL_STORAGE_PREFIX, 'visalang-tool:', 'the dedicated historic per-tool storage namespace is explicit for complete same-origin cleanup');

const chineseOnly = applyToolPatch(createEmptyPlanState(), 'finder', { locale: 'zh-CN' });
assert.equal(chineseOnly.locale, 'zh-CN', 'locale is a first-class plan field');
assert.equal(chineseOnly.applicationRegionId, null, 'Chinese locale never infers China or Beijing as application region');

let state = applyToolPatch(createEmptyPlanState(), 'finder', {
  locale: 'zh-CN',
  country: 'germany',
  purpose: 'family-reunion',
  applicationRegionId: 'germany-mission-china',
  level: 'a0',
  certificate: 'none',
  targetDate: '2026-12-15',
  routeId,
  ignoredFreeText: 'passport 123 and arbitrary notes',
});
assert.equal(state.routeId, routeId, 'route ID is stored separately from locale and region');
assert.equal(state.applicationRegionId, 'germany-mission-china', 'an explicitly selected application region can be stored');
assert.equal(state.targetDate, '2026-12-15', 'a strict calendar date can be stored');
assert.ok(state.ruleVersion, 'the configured route records its current rule version');
assert.ok(Object.keys(state.claimVersions).length >= 1, 'the configured route records current claim versions');
assert.equal(Object.hasOwn(state, 'ignoredFreeText'), false, 'unknown free-text keys are discarded');

state = applyToolPatch(state, 'checklist', {
  routeId,
  checklistState: { [checklistIds[0]]: true, [checklistIds[1]]: false, unknown: true, [checklistIds[2]]: 'yes' },
});
const checklistProjection = projectStateForTool(state, 'checklist');
assert.equal(checklistProjection.route, routeId, 'Checklist restores the selected stable route');
assert.deepEqual(Object.keys(checklistProjection.checklistState).sort(), [...checklistIds].sort(), 'Checklist projection includes every currently applicable stable item');
assert.equal(checklistProjection.checklistState[checklistIds[0]], true, 'a stored boolean completion state round-trips');
assert.equal(checklistProjection.checklistState[checklistIds[1]], false, 'an explicit false completion state round-trips');
assert.equal(checklistProjection.checklistState[checklistIds[2]], false, 'a non-boolean or newly introduced item defaults to false');
assert.equal(Object.hasOwn(checklistProjection.checklistState, 'unknown'), false, 'unknown checklist IDs are discarded');

state = applyToolPatch(state, 'timeline', {
  examId: goetheId,
  targetDate: '2026-12-15',
  resultWaitDays: 14,
  documentPreparationDays: 7,
  retakeBufferDays: 30,
});
assert.deepEqual(projectStateForTool(state, 'timeline'), {
  examId: goetheId,
  targetDate: '2026-12-15',
  resultWaitDays: 14,
  documentPreparationDays: 7,
  retakeBufferDays: 30,
}, 'Timeline round-trips only its stable exam, date and bounded W/P/R fields');

state = applyToolPatch(state, 'comparison', { firstExamId: goetheId, secondExamId: telcId });
assert.deepEqual(projectStateForTool(state, 'comparison'), { first: goetheId, second: telcId }, 'Exam comparison round-trips two distinct stable product IDs');

state = applyToolPatch(state, 'reminders', {
  topicId: 'recheck-official-source',
  routeId,
  date: '2027-01-02',
  source: 'https://example.invalid/private-path',
  routeText: 'free text must not persist',
});
assert.deepEqual(projectStateForTool(state, 'reminders'), { topic: 'recheck-official-source', route: routeId }, 'Reminder state excludes date, source URL and free text');

const invalid = sanitizePlanState({
  ...createEmptyPlanState(),
  locale: 'de',
  routeId: 'unknown-route',
  applicationRegionId: 'beijing-inferred-from-language',
  selectedExamIds: [goetheId, goetheId, 'unknown-exam'],
  targetDate: '2026-02-30',
  buffers: {
    resultWaitDays: -1,
    documentPreparationDays: 1.5,
    retakeBufferDays: PLAN_BUFFER_MAX_DAYS + 1,
  },
  checklistState: { [checklistIds[0]]: 'yes' },
});
assert.equal(invalid.locale, 'en', 'unknown locale fails closed to the non-geographic default');
assert.equal(invalid.routeId, null, 'unknown route IDs are discarded');
assert.equal(invalid.applicationRegionId, null, 'unknown region IDs are discarded');
assert.deepEqual(invalid.selectedExamIds, [goetheId], 'unknown and duplicate exam IDs are discarded');
assert.equal(invalid.targetDate, null, 'nonexistent calendar dates are discarded');
assert.deepEqual(invalid.buffers, { resultWaitDays: null, documentPreparationDays: null, retakeBufferDays: null }, 'negative, decimal and over-limit buffers fail closed');
assert.deepEqual(invalid.checklistState, {}, 'non-boolean or inapplicable checklist state is discarded');
const inconsistentRouteAnswers = sanitizePlanState({
  ...state,
  answers: { ...state.answers, country: 'other', purpose: 'university' },
});
assert.deepEqual(
  { country: inconsistentRouteAnswers.answers.country, purpose: inconsistentRouteAnswers.answers.purpose },
  { country: 'germany', purpose: 'family-reunion' },
  'sanitisation normalises country and purpose to a selected stable route instead of restoring contradictory fields',
);

const pollutedInput = JSON.parse(`{"schemaVersion":1,"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}},"prototype":{"polluted":true}}`);
const sanitizedPollution = sanitizePlanState(pollutedInput);
assert.equal({}.polluted, undefined, 'prototype-pollution input does not affect Object.prototype');
for (const key of ['__proto__', 'constructor', 'prototype']) {
  assert.equal(Object.hasOwn(sanitizedPollution, key), false, `${key} is never copied into plan state`);
}

const sessionRaw = JSON.stringify(state);
assert.equal(parseStoredPlan(sessionRaw, { source: 'session', now }).status, 'ready', 'a current session record can be restored');
const deviceState = createDevicePlanSnapshot(state, now);
const deviceRaw = JSON.stringify(deviceState);
assert.equal(deviceState.savedAt, now, 'device save records the explicit save time');
assert.equal(deviceState.savedUntil, '2026-10-09T00:00:00.000Z', 'device save expires exactly 30 days later');
assert.equal(parseStoredPlan(deviceRaw, { source: 'device', now: '2026-10-08T23:59:59.999Z' }).status, 'ready', 'a device copy restores before expiry');
assert.equal(parseStoredPlan(deviceRaw, { source: 'device', now: deviceState.savedUntil }).status, 'expired', 'a device copy is expired at the boundary');
const incompatibleDevice = { ...deviceState, schemaVersion: 999 };
assert.equal(parseStoredPlan(JSON.stringify(incompatibleDevice), { source: 'device', now: '2026-10-08T23:59:59.999Z' }).status, 'reconfirm_required', 'an unexpired incompatible device copy asks for reconfirmation');
assert.equal(parseStoredPlan(JSON.stringify(incompatibleDevice), { source: 'device', now: deviceState.savedUntil }).status, 'expired', 'device expiry wins over schema incompatibility at the 30-day boundary');
assert.equal(parseStoredPlan(JSON.stringify({ ...deviceState, ruleVersion: 'old-rule' }), { source: 'device', now: '2026-10-10T00:00:00.000Z' }).status, 'expired', 'an expired incompatible rule copy cannot remain indefinitely');
assert.equal(parseStoredPlan(JSON.stringify({ ...deviceState, claimVersions: { ...deviceState.claimVersions, stale: 'old-claim' } }), { source: 'device', now: '2026-10-10T00:00:00.000Z' }).status, 'expired', 'an expired incompatible claim copy is still classified for deletion');

const extendedDevice = { ...deviceState, savedUntil: '2026-10-10T00:00:00.000Z' };
assert.equal(parseStoredPlan(JSON.stringify(extendedDevice), { source: 'device', now }).status, 'invalid', 'a tampered device expiry beyond 30 days is rejected');
assert.equal(parseStoredPlan('{broken', { source: 'session', now }).status, 'invalid', 'malformed JSON is rejected');
assert.equal(parseStoredPlan(JSON.stringify([]), { source: 'session', now }).status, 'invalid', 'array-shaped state is rejected');
assert.equal(parseStoredPlan(JSON.stringify({ ...state, schemaVersion: 999 }), { source: 'session', now }).status, 'reconfirm_required', 'an incompatible schema requires explicit reconfirmation');
assert.equal(parseStoredPlan(JSON.stringify({ ...state, ruleVersion: 'old-rule' }), { source: 'session', now }).status, 'reconfirm_required', 'an incompatible route rule requires explicit reconfirmation');
const [claimId] = Object.keys(state.claimVersions);
assert.equal(parseStoredPlan(JSON.stringify({ ...state, claimVersions: { ...state.claimVersions, [claimId]: 'old-claim' } }), { source: 'session', now }).status, 'reconfirm_required', 'an incompatible claim version requires explicit reconfirmation');

const deviceOnly = createDevicePlanSnapshot(applyToolPatch(createEmptyPlanState(), 'comparison', { firstExamId: telcId, secondExamId: goetheId }), now);
const chosen = chooseRestorablePlan(sessionRaw, JSON.stringify(deviceOnly), { now });
assert.equal(chosen.status, 'ready');
assert.equal(chosen.source, 'session', 'valid session state wins over a valid device copy');
const fallback = chooseRestorablePlan('{broken', JSON.stringify(deviceOnly), { now });
assert.equal(fallback.source, 'device', 'an invalid session can fall back to a valid device copy');

const legacyTimeline = parseLegacyToolQuery('timeline', '?targetDate=2026-12-15&examType=Goethe-Zertifikat%20A1&resultWaitDays=14&translationDays=7&retakeBufferDays=30');
assert.equal(legacyTimeline.hadLegacyFields, true, 'legacy timeline fields are detected for cleanup');
assert.deepEqual(legacyTimeline.patch, {
  examId: goetheId,
  targetDate: '2026-12-15',
  resultWaitDays: 14,
  documentPreparationDays: 7,
  retakeBufferDays: 30,
}, 'valid legacy timeline values migrate to canonical state fields');
const legacyComparison = parseLegacyToolQuery('comparison', '?first=goethe-a1&second=telc-a1');
assert.deepEqual(legacyComparison.patch, { firstExamId: goetheId, secondExamId: telcId }, 'historic short comparison IDs migrate to the current stable product IDs');
assert.equal(legacyComparison.hasCompatibleValues, true, 'historic comparison IDs count as compatible after exact mapping');
const legacyFinder = parseLegacyToolQuery('finder', '?country=germany&purpose=family-reunion&location=Somewhere&targetDate=2026-12-15');
assert.equal(Object.hasOwn(legacyFinder.patch, 'applicationRegionId'), false, 'legacy free-text location is cleaned but never inferred into a region');
const legacyOtherRoute = parseLegacyToolQuery('finder', '?country=other&purpose=other');
assert.equal(Object.hasOwn(legacyOtherRoute.patch, 'routeId'), true, 'a legacy finder route selection explicitly replaces any previously saved stable route');
assert.equal(legacyOtherRoute.patch.routeId, null, 'an unsupported legacy selection clears rather than inherits a previously saved route');
const legacyOverride = applyToolPatch(state, 'finder', legacyOtherRoute.patch);
assert.equal(legacyOverride.routeId, null, 'the legacy unsupported selection cannot retain a configured route from session state');
assert.deepEqual(
  { country: legacyOverride.answers.country, purpose: legacyOverride.answers.purpose },
  { country: 'other', purpose: 'other' },
  'clearing the stable route preserves the validated unsupported finder answers for review',
);
const legacyReminder = parseLegacyToolQuery('reminders', '?topic=Confirm%20the%20language%20requirement&date=2027-01-02&route=private%20free%20text&source=https%3A%2F%2Fexample.invalid%2Fcase');
assert.deepEqual(legacyReminder.patch, { topicId: 'confirm-language-requirement' }, 'legacy reminder date, URL and free-text route are deliberately not migrated');
assert.equal(legacyReminder.hasCompatibleValues, true, 'a stable legacy topic is marked as a compatible migration');
const discardedLegacyOnly = parseLegacyToolQuery('reminders', '?date=2027-01-02&source=https%3A%2F%2Fexample.invalid%2Fcase&route=private%20free%20text');
assert.equal(discardedLegacyOnly.hadLegacyFields, true, 'discard-only legacy fields are still detected for address-bar cleanup');
assert.equal(discardedLegacyOnly.hasCompatibleValues, false, 'discard-only legacy fields cannot replace an incompatible saved-plan warning');
assert.deepEqual(discardedLegacyOnly.patch, {}, 'discard-only legacy fields never enter plan state');
for (const [toolId, search] of [
  ['finder', '?level=constructor'],
  ['timeline', '?examType=toString'],
  ['comparison', '?first=__proto__&second=constructor'],
  ['reminders', '?topic=toString'],
]) {
  const inheritedKey = parseLegacyToolQuery(toolId, search);
  assert.equal(inheritedKey.hadLegacyFields, true, `${toolId} still detects the legacy field for address-bar cleanup`);
  assert.equal(inheritedKey.hasCompatibleValues, false, `${toolId} rejects inherited object keys instead of claiming a compatible migration`);
  assert.deepEqual(inheritedKey.patch, {}, `${toolId} does not migrate an inherited object property`);
}

const safeShare = JSON.parse(serializeSafeShareState(state));
assert.deepEqual(Object.keys(safeShare).sort(), ['locale', 'routeId', 'selectedExamIds'], 'safe sharing is limited to three non-sensitive plan dimensions');
for (const sensitiveValue of ['germany-mission-china', '2026-12-15', 'https://example.invalid', checklistIds[0], '14', '30']) {
  assert.equal(JSON.stringify(safeShare).includes(sensitiveValue), false, `safe sharing excludes ${sensitiveValue}`);
}

const changedRoute = applyToolPatch(state, 'finder', { routeId: 'germany-b1' });
assert.deepEqual(changedRoute.checklistState, {}, 'changing route clears inapplicable checklist state');
assert.equal(changedRoute.ruleVersion, null, 'a route without a configured rule does not retain the old rule version');
assert.deepEqual(changedRoute.claimVersions, {}, 'a route change removes old claim versions');
assert.deepEqual(
  { country: projectStateForTool(changedRoute, 'finder').country, purpose: projectStateForTool(changedRoute, 'finder').purpose },
  { country: 'germany', purpose: 'b1' },
  'changing a stable route from another tool keeps Finder country and purpose consistent with that route',
);
const clearedTimeline = clearToolState(state, 'timeline');
assert.equal(clearedTimeline.targetDate, null, 'restarting Timeline clears its shared date field');
assert.deepEqual(clearedTimeline.buffers, { resultWaitDays: null, documentPreparationDays: null, retakeBufferDays: null }, 'restarting Timeline clears its buffers');
assert.equal(clearedTimeline.routeId, routeId, 'restarting one tool does not clear the shared route');
const clearedChecklist = clearToolState(state, 'checklist');
assert.equal(clearedChecklist.routeId, routeId, 'restarting Checklist retains the shared route owned by the plan');
assert.deepEqual(clearedChecklist.checklistState, {}, 'restarting Checklist clears only its owned completion state');
const clearedReminder = clearToolState(state, 'reminders');
assert.equal(clearedReminder.routeId, routeId, 'restarting Reminder retains the shared route owned by the plan');
assert.equal(Object.hasOwn(clearedReminder.answers, 'reminderTopicId'), false, 'restarting Reminder clears its owned topic');

console.log('M2-A versioned shared plan-state contract passed');
