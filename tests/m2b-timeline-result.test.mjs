import assert from 'node:assert/strict';
import fs from 'node:fs';

const {
  getLocalCalendarDate,
  getTimelineResultState,
  TIMELINE_BUFFER_MAX_DAYS,
} = await import('../src/data/route-tools.ts');

assert.equal(typeof getTimelineResultState, 'function', 'T18 exposes a testable Timeline result-state resolver');
assert.equal(typeof getLocalCalendarDate, 'function', 'T18 exposes the local calendar-date provider used by the default result state');
const sample = {
  targetDate: '2026-12-15',
  resultWaitDays: 14,
  documentPreparationDays: 7,
  retakeBufferDays: 30,
};

const ordinary = getTimelineResultState(sample, { today: '2026-09-09' });
assert.equal(ordinary.status, 'calculated', 'valid explicit assumptions produce a calculated result state');
assert.equal(ordinary.calculation.basePlanningDate, '2026-11-24', 'D - W - P matches the required sample');
assert.equal(ordinary.calculation.additionalBufferPlanningDate, '2026-10-25', 'D - W - P - R matches the required sample');
assert.equal(ordinary.basePlanningDateState, 'future', 'the controlled today classifies the base date');
assert.equal(ordinary.additionalBufferPlanningDateState, 'future', 'the controlled today classifies the additional-buffer date');
assert.equal(ordinary.requiresAttention, false, 'future assumption dates do not trigger the past-date warning');

const mixed = getTimelineResultState(sample, { today: '2026-11-01' });
assert.equal(mixed.status, 'calculated');
assert.equal(mixed.basePlanningDateState, 'future', 'a base date after today remains future');
assert.equal(mixed.additionalBufferPlanningDateState, 'past', 'an additional-buffer date before today is explicitly past');
assert.equal(mixed.requiresAttention, true, 'either past calculated date requires attention');

const onBaseDate = getTimelineResultState(sample, { today: '2026-11-24' });
assert.equal(onBaseDate.status, 'calculated');
assert.equal(onBaseDate.basePlanningDateState, 'today', 'a date equal to controlled today is not labelled past');
const afterBaseDate = getTimelineResultState(sample, { today: '2026-11-25' });
assert.equal(afterBaseDate.status, 'calculated');
assert.equal(afterBaseDate.basePlanningDateState, 'past', 'a base date before controlled today is explicitly past');
assert.equal(afterBaseDate.requiresAttention, true);

const zero = getTimelineResultState({
  targetDate: '2026-12-15',
  resultWaitDays: 0,
  documentPreparationDays: 0,
  retakeBufferDays: 0,
}, { today: '2026-09-09' });
assert.equal(zero.status, 'calculated', 'explicit zero values remain valid planning assumptions');
assert.equal(zero.calculation.basePlanningDate, '2026-12-15');
assert.equal(zero.calculation.additionalBufferPlanningDate, '2026-12-15');

for (const [input, field] of [
  [{ ...sample, targetDate: '' }, 'targetDate'],
  [{ ...sample, targetDate: '2026-02-30' }, 'targetDate'],
  [{ ...sample, resultWaitDays: '' }, 'resultWaitDays'],
  [{ ...sample, resultWaitDays: -1 }, 'resultWaitDays'],
  [{ ...sample, documentPreparationDays: 1.5 }, 'documentPreparationDays'],
  [{ ...sample, retakeBufferDays: '1e2' }, 'retakeBufferDays'],
  [{ ...sample, retakeBufferDays: TIMELINE_BUFFER_MAX_DAYS + 1 }, 'retakeBufferDays'],
  [{ targetDate: '0001-01-01', resultWaitDays: 1, documentPreparationDays: 0, retakeBufferDays: 0 }, 'targetDate'],
]) {
  const result = getTimelineResultState(input, { today: '2026-09-09' });
  assert.equal(result.status, 'invalid', `invalid input fails closed: ${JSON.stringify(input)}`);
  assert.equal(result.field, field, `the invalid result points to ${field}`);
  assert.ok(result.message, 'the invalid result provides a concrete correction message');
}

const invalidToday = getTimelineResultState(sample, { today: '2026-02-30' });
assert.equal(invalidToday.status, 'invalid', 'an invalid injected today cannot create a date relation');
assert.equal(invalidToday.field, 'today');

for (const [input, expected] of [
  [
    { targetDate: '2027-01-10', resultWaitDays: 10, documentPreparationDays: 5, retakeBufferDays: 20 },
    ['2026-12-26', '2026-12-06'],
  ],
  [
    { targetDate: '2024-03-01', resultWaitDays: 1, documentPreparationDays: 0, retakeBufferDays: 1 },
    ['2024-02-29', '2024-02-28'],
  ],
]) {
  const result = getTimelineResultState(input, { today: '2023-01-01' });
  assert.equal(result.status, 'calculated');
  assert.deepEqual([result.calculation.basePlanningDate, result.calculation.additionalBufferPlanningDate], expected, 'cross-year and leap-day arithmetic remains exact');
}

const originalTimezone = process.env.TZ;
try {
  const results = [];
  for (const timezone of ['Pacific/Kiritimati', 'America/Adak']) {
    process.env.TZ = timezone;
    results.push(getTimelineResultState(sample, { today: '2026-11-01' }));
  }
  assert.deepEqual(results[0], results[1], 'positive and negative local timezones produce identical calendar-date state');

  const instant = new Date('2026-01-01T00:30:00.000Z');
  process.env.TZ = 'Pacific/Kiritimati';
  assert.equal(getLocalCalendarDate(instant), '2026-01-01', 'the positive-zone local calendar date is derived from local date parts');
  process.env.TZ = 'America/Adak';
  assert.equal(getLocalCalendarDate(instant), '2025-12-31', 'the negative-zone local calendar date does not silently use the UTC day');
} finally {
  if (originalTimezone === undefined) delete process.env.TZ;
  else process.env.TZ = originalTimezone;
}

const page = fs.readFileSync('src/pages/tools/timeline-calculator.astro', 'utf8');
const formController = fs.readFileSync('src/scripts/tool-form.ts', 'utf8');
assert.match(page, /getTimelineResultState/, 'the production page consumes the controlled Timeline result state');
assert.match(page, /controller\.reportError/, 'calculation failures are connected to a concrete form field');
assert.match(page, /invalidateTimeline/, 'editing an input invalidates the prior Timeline result');
assert.match(page, /form\?\.addEventListener\('input', invalidateTimeline\)/, 'input edits hide stale calculation output before another submit');
assert.match(page, /can no longer be arranged this way/i, 'past assumption dates receive the explicit required warning');
for (const label of ['Target date (D)', 'Result and certificate wait (W)', 'Document preparation (P)', 'Additional retake buffer (R)', 'Base planning date', 'Additional-buffer planning date']) {
  assert.ok(page.includes(label), `the final result shows ${label}`);
}
assert.match(page, /timelinePlanningContract\.boundary/, 'the result displays the general no-guarantee boundary');
assert.match(page, /timelinePlanningContract\.retakeBoundary/, 'the result retains the narrower retake-buffer boundary');
assert.match(page, /if \(timelineState\.status === 'invalid'\)[\s\S]{0,500}return;[\s\S]{0,500}plan\.persist/, 'invalid state exits before shared-plan persistence');
assert.match(formController, /reportError/, 'the shared form controller exposes a named-field error path');

console.log('M2-B T18 Timeline result-state contracts passed');
