const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = (file) => fs.readFileSync(file, 'utf8');

const contracts = {
  'route-finder': [
    'When Route Finder is useful',
    'Example input: a Germany family-reunion starting point',
    'What the example result means',
    'Stop instead of following the route',
    'Official follow-up after Route Finder',
    'data-tool-example-input',
    'data-tool-example-output',
  ],
  'checklist-generator': [
    'When to use the Requirement Checklist',
    'Example input: Germany family reunion A1',
    'What the generated checklist means',
    'Stop and rebuild the checklist',
    'Official follow-up after the checklist',
    'data-tool-example-input',
    'data-tool-example-output',
  ],
  'timeline-calculator': [
    'When the Timeline Planner is safe to use',
    'Example input using confirmed buffers',
    'How to read the example output',
    'Stop and verify before calculating',
    'Official follow-up after the timeline',
    'data-tool-example-input',
    'data-tool-example-output',
  ],
  'exam-comparison': [
    'When Exam Comparison helps',
    'Example input: compare two A1 options',
    'What the comparison output means',
    'Stop before choosing an exam',
    'Official follow-up after comparing',
    'data-tool-example-input',
    'data-tool-example-output',
  ],
  'email-reminders': [
    'When the Reminder Planner is useful',
    'Example input: a source-review reminder',
    'What the reminder output means',
    'Stop and replace the reminder',
    'Official follow-up when the reminder fires',
    'data-tool-example-input',
    'data-tool-example-output',
  ],
};

for (const [slug, requiredCopy] of Object.entries(contracts)) {
  const source = read(`src/pages/tools/${slug}.astro`);
  assert.match(source, /<section class="tool-guidance"[^>]*data-tool-guidance/, `${slug} has page-specific guidance`);
  for (const copy of requiredCopy) {
    assert.ok(source.includes(copy), `${slug} includes its page-specific contract: ${copy}`);
  }
  assert.match(source, /https:\/\//, `${slug} gives an official web follow-up`);
  assert.match(source, /does not (?:decide|mean|prove|confirm|replace)/i, `${slug} states what its output cannot establish`);
  assert.match(source, /(?:stop|do not use|do not act)/i, `${slug} states a failure or stop boundary`);
}

const toolLayout = read('src/layouts/ToolLayout.astro');
assert.ok(toolLayout.includes('enableAds={false}'), 'all tools remain advertising-free');
assert.doesNotMatch(toolLayout, /noindex=\{true\}/, 'all tools remain indexable');

console.log('Scheme 3 tool content contracts passed');
