const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const activePlan = 'docs/VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md';
const removedPlans = [
  'docs/VISALANG_MASTER_ROADMAP_2026-09-01.md',
  'docs/VISALANG_90_DAY_EXECUTION_PLAN_2026-09-01.md',
  'docs/VISALANG_DETAILED_EXECUTION_TASKS_2026-09-01.md',
  'docs/VISALANG_EXECUTION_BOARD_2026-09-01.md',
];

assert.equal(fs.existsSync(path.join(root, activePlan)), true, 'the Scheme 3 plan must exist');
assert.match(read(activePlan), /status:\s*active/i, 'the Scheme 3 plan must declare active status');

for (const removedPlan of removedPlans) {
  assert.equal(fs.existsSync(path.join(root, removedPlan)), false, `${removedPlan} must be removed`);
}

const markdownFiles = fs.readdirSync(path.join(root, 'docs'))
  .filter((name) => name.endsWith('.md'))
  .map((name) => path.join(root, 'docs', name));
for (const markdownFile of [path.join(root, 'README.md'), ...markdownFiles]) {
  const content = fs.readFileSync(markdownFile, 'utf8');
  for (const removedPlan of removedPlans) {
    const basename = path.basename(removedPlan).replaceAll('.', '\\.');
    assert.doesNotMatch(
      content,
      new RegExp(`\\]\\([^\\n)]*${basename}[^\\n)]*\\)`),
      `${path.relative(root, markdownFile)} must not link to removed ${removedPlan}`,
    );
  }
}

const readme = read('README.md');
assert.match(readme, /VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01\.md/);
for (const removedPlan of removedPlans) {
  assert.doesNotMatch(readme, new RegExp(path.basename(removedPlan).replaceAll('.', '\\.')));
}

const auditorInstructions = read('docs/VISALANG_INDEPENDENT_AUDITOR_AGENT.md');
assert.match(auditorInstructions, /VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01\.md/);
assert.doesNotMatch(auditorInstructions, /VISALANG_(?:DETAILED_EXECUTION_TASKS|EXECUTION_BOARD)_2026-09-01\.md/);

for (const historicalPlan of [
  'docs/MASTER_EXECUTION_PLAN.md',
  'docs/NEXT_STAGE_EXECUTION_TASKBOOK_2026-08-21.md',
  'docs/NEXT_STAGE_PHASE_0_EXECUTION_PLAN_2026-08-21.md',
  'docs/MONETIZATION_ROADMAP.md',
  'docs/TRAFFIC_SITE_ROADMAP.md',
  'docs/CONTENT_UPDATE_PLAN_2026-08-14.md',
]) {
  const content = read(historicalPlan).slice(0, 1400);
  assert.match(content, /superseded/i, `${historicalPlan} must be visibly marked superseded near the top`);
  assert.match(content, /VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01\.md/, `${historicalPlan} must point to the active plan`);
}

console.log('Scheme 3 planning authority contract passed.');
