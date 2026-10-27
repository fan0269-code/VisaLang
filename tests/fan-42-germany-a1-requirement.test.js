const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const guide = fs.readFileSync(path.join(root, 'src/content/guides/german-family-reunion-language-requirement.md'), 'utf8');

assert.match(guide, /^slug: "german-family-reunion-language-requirement"$/m, 'FAN-42 remains scoped to the selected Germany A1 requirement root');
assert.match(guide, /^sourceReviewedAt: "2026-09-08"$/m, 'FAN-42 records the current official-source check date');
assert.match(guide, /competent German mission abroad; that mission forwards the application to the foreigners authority/, 'the page preserves the official application handoff');
assert.match(guide, /responsible German mission or competent immigration authority decides the visa route and its document instructions/, 'visa document authority is not assigned to an exam centre');
assert.match(guide, /A selected exam centre controls only its current booking and test-day process/, 'the local exam-centre boundary remains explicit');
assert.match(guide, /\/tools\/route-finder\//, 'the requirement root keeps a discoverable next-step tool');
assert.match(guide, /^nextGuideSlug: "goethe-a1-vs-telc-a1"$/m, 'the requirement root hands directly to the seven-pillar comparison stage');
assert.match(guide, /^## Who this is for$/m, 'the requirement root identifies the bounded reader before giving route guidance');
assert.match(guide, /^## Route classification worksheet$/m, 'the requirement root provides a reusable route-classification asset');
assert.match(guide, /^## Mission question script$/m, 'the requirement root provides a safe escalation script instead of deciding an exception');
assert.match(guide, /^## Scenario: the sponsor has a residence permit$/m, 'the requirement root distinguishes a residence-permit scenario from a German-national route');

console.log('FAN-42 Germany A1 requirement review contract passed');
