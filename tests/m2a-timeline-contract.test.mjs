import assert from 'node:assert/strict';
import fs from 'node:fs';

const { calculateTimeline, timelinePlanningContract, TIMELINE_BUFFER_MAX_DAYS } = await import('../src/data/route-tools.ts');
const { PLAN_BUFFER_MAX_DAYS } = await import('../src/data/plan-state.ts');

assert.equal(timelinePlanningContract.dayUnit, 'calendar-days', 'the planning contract uses calendar days, not inferred business days');
assert.deepEqual(
  Object.fromEntries(Object.entries(timelinePlanningContract.variables).map(([symbol, value]) => [symbol, value.inputKey])),
  {
    D: 'targetDate',
    W: 'resultWaitDays',
    P: 'documentPreparationDays',
    R: 'retakeBufferDays',
  },
  'D/W/P/R have one canonical input meaning',
);
assert.deepEqual(timelinePlanningContract.formulas, {
  basePlanningDate: 'D - W - P',
  additionalBufferPlanningDate: 'D - W - P - R',
}, 'the two displayed formulas are part of the shared contract');
assert.match(timelinePlanningContract.boundary, /user-entered|locally confirmed/i, 'the contract does not invent official defaults');
assert.match(timelinePlanningContract.boundary, /does not guarantee/i, 'the contract does not guarantee an outcome');
assert.match(timelinePlanningContract.retakeBoundary, /next session/i, 'R does not silently include a real next exam session');
assert.match(timelinePlanningContract.retakeBoundary, /re-?registration/i, 'R does not silently include re-registration');
assert.match(timelinePlanningContract.retakeBoundary, /result/i, 'R does not silently include another result cycle');
assert.equal(TIMELINE_BUFFER_MAX_DAYS, PLAN_BUFFER_MAX_DAYS, 'calculation and shared-state persistence use one buffer ceiling');

const scenarios = [
  {
    input: { targetDate: '2026-12-15', resultWaitDays: 14, documentPreparationDays: 7, retakeBufferDays: 30 },
    basePlanningDate: '2026-11-24',
    additionalBufferPlanningDate: '2026-10-25',
  },
  {
    input: { targetDate: '2027-01-10', resultWaitDays: 10, documentPreparationDays: 5, retakeBufferDays: 20 },
    basePlanningDate: '2026-12-26',
    additionalBufferPlanningDate: '2026-12-06',
  },
  {
    input: { targetDate: '2024-03-01', resultWaitDays: 1, documentPreparationDays: 0, retakeBufferDays: 1 },
    basePlanningDate: '2024-02-29',
    additionalBufferPlanningDate: '2024-02-28',
  },
];

for (const scenario of scenarios) {
  const result = calculateTimeline(scenario.input);
  assert.ok(result, `the calendar-day scenario resolves: ${JSON.stringify(scenario.input)}`);
  assert.equal(result.basePlanningDate, scenario.basePlanningDate, 'the base planning date matches the shared formula');
  assert.equal(result.additionalBufferPlanningDate, scenario.additionalBufferPlanningDate, 'the additional-buffer date matches the shared formula');
}

for (const invalidInput of [
  { targetDate: '2026-12-15', documentPreparationDays: 7, retakeBufferDays: 30 },
  { targetDate: '2026-12-15', resultWaitDays: '', documentPreparationDays: 7, retakeBufferDays: 30 },
  { targetDate: '2026-12-15', resultWaitDays: '   ', documentPreparationDays: 7, retakeBufferDays: 30 },
  { targetDate: '2026-12-15', resultWaitDays: -1, documentPreparationDays: 7, retakeBufferDays: 30 },
  { targetDate: '2026-12-15', resultWaitDays: 1.5, documentPreparationDays: 7, retakeBufferDays: 30 },
  { targetDate: '2026-12-15', resultWaitDays: '1e2', documentPreparationDays: 7, retakeBufferDays: 30 },
  { targetDate: '2026-12-15', resultWaitDays: '+10', documentPreparationDays: 7, retakeBufferDays: 30 },
  { targetDate: '2026-12-15', resultWaitDays: '-0', documentPreparationDays: 7, retakeBufferDays: 30 },
  { targetDate: '2026-12-15', resultWaitDays: 'unknown', documentPreparationDays: 7, retakeBufferDays: 30 },
  { targetDate: '2026-12-15', resultWaitDays: Number.MAX_SAFE_INTEGER, documentPreparationDays: 7, retakeBufferDays: 30 },
  { targetDate: '0000-01-01', resultWaitDays: 0, documentPreparationDays: 0, retakeBufferDays: 0 },
  { targetDate: '0001-01-01', resultWaitDays: 1, documentPreparationDays: 0, retakeBufferDays: 0 },
]) {
  assert.equal(calculateTimeline(invalidInput), null, `invalid or missing day input fails closed: ${JSON.stringify(invalidInput)}`);
}
assert.ok(calculateTimeline({ targetDate: '2026-12-15', resultWaitDays: 0, documentPreparationDays: 0, retakeBufferDays: 0 }), 'explicit zero-day assumptions remain valid');
assert.ok(calculateTimeline({ targetDate: '2026-12-15', resultWaitDays: TIMELINE_BUFFER_MAX_DAYS, documentPreparationDays: 0, retakeBufferDays: 0 }), 'the documented maximum buffer remains calculable and persistable');
assert.equal(calculateTimeline({ targetDate: '2026-12-15', resultWaitDays: TIMELINE_BUFFER_MAX_DAYS + 1, documentPreparationDays: 0, retakeBufferDays: 0 }), null, 'a buffer above the shared-state ceiling fails before a result is shown');

const tool = fs.readFileSync('src/pages/tools/timeline-calculator.astro', 'utf8');
const englishGuide = fs.readFileSync('src/content/guides/german-a1-exam-booking-timeline.md', 'utf8');
const chineseGuide = fs.readFileSync('src/pages/zh/guides/german-a1-exam-booking-timeline.astro', 'utf8');

for (const source of [tool, englishGuide]) {
  assert.match(source, /calendar days/i, 'English timeline surfaces name calendar-day arithmetic');
  assert.match(source, /base planning date/i, 'English timeline surfaces use the base planning date label');
  assert.match(source, /additional-buffer planning date/i, 'English timeline surfaces use the additional-buffer planning date label');
  assert.doesNotMatch(source, /(?:latest|cautious|safe) (?:test|planning) date/i, 'English timeline surfaces do not present assurance-like date labels');
}
assert.match(englishGuide, /D\s*[−-]\s*W\s*[−-]\s*P/, 'the article displays the base formula');
assert.match(englishGuide, /D\s*[−-]\s*W\s*[−-]\s*P\s*[−-]\s*R/, 'the article displays the additional-buffer formula');
assert.ok(englishGuide.includes('/guides/goethe-a1-test-centers/'), 'the article connects calculated thresholds to actual-session verification');
assert.match(englishGuide, /later than that threshold[^.]{0,120}(?:does not fit|not fit)/i, 'the article explains when a real session makes the current assumptions fail');
for (const scenario of scenarios) {
  for (const date of [scenario.input.targetDate, scenario.basePlanningDate, scenario.additionalBufferPlanningDate]) {
    assert.ok(englishGuide.includes(date), `the English article makes scenario date ${date} reproducible`);
    assert.ok(chineseGuide.includes(date), `the Chinese article mirrors scenario date ${date}`);
  }
}
assert.match(englishGuide, /R[^\n]{0,220}(?:does not|cannot)[^\n]{0,180}(?:next session|re-registration|result)/i, 'the article limits what the R buffer represents');
assert.match(chineseGuide, /基础规划日期/, 'the Chinese article names the base planning date');
assert.match(chineseGuide, /增加重考余量的规划日期/, 'the Chinese article names the additional-buffer date');
assert.doesNotMatch(tool, /value="(?:7|14|21|28|30)"/, 'the tool introduces no provider-wait or retake default');
assert.match(tool, /max=\{TIMELINE_BUFFER_MAX_DAYS\}/, 'all timeline number inputs expose the shared maximum');
assert.match(tool, /parseTimelineBufferDays\(field\.value\)/, 'the visible form validates with the same strict parser used by calculation and persistence');
assert.match(tool, /customError:[\s\S]{0,300}using digits only/, 'the visible form explains strict integer syntax instead of silently dropping a result');
assert.doesNotMatch(`${tool}\n${englishGuide}`, /visa processing (?:time|days|duration)\s*[:=]\s*\d/i, 'no visa-processing duration is invented');

console.log('M2-A calendar-day timeline contract passed');
