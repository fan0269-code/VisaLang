import assert from 'node:assert/strict';
import fs from 'node:fs';

const {
  buildChecklist,
  checklistStageOrder,
} = await import('../src/data/route-tools.ts');

assert.deepEqual(
  checklistStageOrder,
  ['requirement', 'exam-choice', 'booking', 'exam-certificate', 'submission-review'],
  'the configured Germany A1 checklist has an explicit route-to-submission stage order',
);

const result = buildChecklist({ routeId: 'germany-family-reunion-a1' });
assert.equal(result.status, 'guidance_available', 'the configured Germany family-reunion A1 route produces bounded guidance');
assert.match(result.boundary, /not (?:a )?complete visa-document list|not.*complete.*visa/i, 'the result says it is not a complete visa-document list');
assert.deepEqual(result.groups.map((group) => group.stage), checklistStageOrder, 'every checklist stage renders in the declared order');

const items = result.groups.flatMap((group) => group.items);
assert.ok(items.length >= 10, 'the three prose reminders are decomposed into useful atomic actions');
assert.equal(new Set(items.map((item) => item.id)).size, items.length, 'every checklist item has a unique stable ID');
for (const item of items) {
  assert.match(item.id, /^[a-z][a-z0-9-]*\.[a-z][a-z0-9-]*$/, `${item.id} uses a stable stage.action ID`);
  assert.ok(checklistStageOrder.includes(item.stage), `${item.id} uses a declared stage`);
  assert.ok(item.action && !/[.;].+[.;]/.test(item.action), `${item.id} contains one concise action`);
  assert.ok(item.doneWhen, `${item.id} has an observable completion criterion`);
  assert.ok(item.owner, `${item.id} names the responsible owner`);
  assert.ok(item.sourceRefs.length > 0, `${item.id} has an official verification source`);
  for (const source of item.sourceRefs) {
    assert.match(source.url, /^https:\/\//, `${item.id} source uses HTTPS`);
    assert.ok(source.owner && source.supports && source.boundary, `${item.id} source records owner, support and boundary`);
  }
}

assert.deepEqual(
  buildChecklist({ routeId: 'unknown-route' }),
  {
    status: 'unsupported',
    groups: [],
    boundary: 'No route-specific checklist is configured. Use the organisation receiving the application to identify the applicable requirements.',
  },
  'unsupported routes fail closed instead of receiving a pseudo-checklist',
);

const englishDocuments = fs.readFileSync('src/content/guides/german-a1-documents-checklist.md', 'utf8');
assert.match(englishDocuments, /^## Pre-payment stop gate$/m, 'the English documents guide has an explicit pre-payment gate');
assert.match(englishDocuments, /^### Scenario: the booking name differs before payment$/m, 'the guide covers a name mismatch before payment');
assert.match(englishDocuments, /^### Scenario: payment was already sent before a mismatch was found$/m, 'the guide covers the already-paid recovery path');
assert.match(englishDocuments, /selected centre[\s\S]{0,300}not (?:a )?universal/i, 'the guide does not turn a selected-centre rule into a universal ID or materials rule');
const englishComparison = fs.readFileSync('src/content/guides/goethe-a1-vs-telc-a1.md', 'utf8');
for (const [label, page] of [['English documents guide', englishDocuments], ['English comparison guide', englishComparison]]) {
  assert.match(page, /BAMF language-proof leaflet/, `${label} identifies the BAMF source`);
  assert.match(page, /HTTP 403[\s\S]{0,180}reachability/i, `${label} discloses the BAMF source reachability limitation`);
}

const englishCentres = fs.readFileSync('src/content/guides/goethe-a1-test-centers.md', 'utf8');
assert.match(englishCentres, /^## Booking failure recovery$/m, 'the centre guide absorbs useful booking-mistake recovery content');
assert.match(englishCentres, /payment already sent/i, 'the centre guide covers the already-paid branch without promising a refund');

const chineseCentres = fs.readFileSync('src/pages/zh/guides/goethe-a1-test-centers.astro', 'utf8');
const chineseTimeline = fs.readFileSync('src/pages/zh/guides/german-a1-exam-booking-timeline.astro', 'utf8');
for (const [label, page] of [['Chinese centre target', chineseCentres], ['Chinese timeline target', chineseTimeline]]) {
  for (const stage of ['报名阶段', '考试当天', '申请递交']) {
    assert.ok(page.includes(stage), `${label} independently distinguishes ${stage}`);
  }
  assert.match(page, /不是完整.*签证.*材料清单|不构成完整.*签证.*材料清单/, `${label} keeps the visa-document-list boundary`);
}
assert.match(chineseCentres, /付款前发现姓名不一致[\s\S]{0,900}付款后才发现姓名不一致/, 'the Chinese centre target carries two bounded name-mismatch recovery paths');

for (const retiredPath of [
  'src/pages/zh/guides/goethe-a1-booking-mistakes.astro',
  'src/pages/zh/guides/german-a1-documents-checklist.astro',
]) {
  assert.equal(fs.existsSync(retiredPath), true, `${retiredPath} has a separately reviewed retained task; current publication is tested by retained-routes`);
}

console.log('M2-A staged checklist and merged-content contracts passed');
