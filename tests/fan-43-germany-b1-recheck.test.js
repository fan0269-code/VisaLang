const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const guide = read('src/content/guides/germany-b1-settlement-citizenship-timeline.md');
const review = read('docs/GERMANY_B1_TIMELINE_SOURCE_RECHECK_2026-08-15.md');

assert.match(guide, /^slug: "germany-b1-settlement-citizenship-timeline"$/m, 'FAN-43 keeps FAN-35\'s selected page identity');
assert.match(guide, /^publishedDate: "2026-07-11"$/m, 'FAN-43 preserves required publishedDate');
assert.match(guide, /^updatedDate: "2026-11-14"$/m, 'the 2026-11-14 correction records a real public update date');
assert.match(guide, /^sourceReviewedAt: "2026-11-14"$/m, 'the 2026-11-14 correction records the source-review date');
assert.match(guide, /This timeline does not calculate residence periods, eligibility or processing time/, 'the page still refuses residence, eligibility, and processing calculations');
assert.match(guide, /do not give this page a processing time/, 'the recheck does not copy a processing-time number');
assert.match(guide, /^readingTime: "8"$/m, 'the P1 rewrite records the current reading time');
assert.match(guide, /^sourceReviewStatus: "reviewed"$/m, 'FAN-43 retains the reviewed discovery gate');
assert.match(guide, /^finalDecisionAuthorityType: "Competent local foreigners or nationality authority/m, 'FAN-43 names both route decision authorities and the centre boundary');
assert.match(guide, /This timeline does not calculate residence periods, eligibility or processing time/, 'FAN-43 keeps the legal and timing boundary');
assert.match(guide, /Use only dates entered by you or confirmed by the competent authority and selected centre/, 'FAN-43 gives a concrete local verification action');
assert.match(guide, /Do not copy another centre's result period, assume a retake seat, or create a standard appointment wait/, 'FAN-43 rejects invented timing claims');
assert.match(guide, /\/guides\/germany-b1-settlement-citizenship-checklist\//, 'FAN-43 retains the terminal checklist branch');
assert.match(guide, /\/guides\/goethe-b1-germany-settlement-work\//, 'FAN-43 retains the settlement requirement branch');
assert.match(guide, /\/guides\/germany-b1-citizenship-language-proof\//, 'FAN-43 retains the citizenship requirement branch');

assert.match(review, /Checked: 2026-08-15/, 'FAN-43 records the actual recheck date');
assert.match(review, /retain without a public-content or front-matter date change/, 'FAN-43 records the no-change disposition');
assert.match(review, /Permitted support \| Boundary/, 'FAN-43 records source permission and boundaries');
assert.match(review, /FAN-35 revision 3 selected `germany-b1-settlement-citizenship-timeline`/, 'FAN-43 records the controlling selection before review');

console.log('FAN-43 Germany B1 source recheck contract passed');
