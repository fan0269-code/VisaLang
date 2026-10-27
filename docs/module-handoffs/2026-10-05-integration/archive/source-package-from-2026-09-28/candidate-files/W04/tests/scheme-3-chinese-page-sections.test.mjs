import assert from 'node:assert/strict';
import fs from 'node:fs';

const slugs = [
  'german-family-reunion-language-requirement',
  'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers',
  'german-a1-exam-booking-timeline',
  'goethe-a1-30-day-study-plan',
  'german-family-reunion-language-requirement',
  'goethe-a1-germany-family-reunion',
];
const slotNames = ['who', 'key-decisions', 'mistakes', 'next-action', 'sources'];
const layout = fs.readFileSync('src/components/ZhGuideLayout.astro', 'utf8');

for (const slot of slotNames) {
  assert.match(layout, new RegExp(`<slot name=["']${slot}["']`), `Chinese layout exposes the page-specific ${slot} slot`);
}
assert.doesNotMatch(layout, /适合已经在规划德国配偶团聚或家庭团聚/, 'Chinese layout does not publish a generic audience paragraph as article content');
assert.doesNotMatch(layout, /先确认负责接收语言证明的机构/, 'Chinese layout does not publish generic key decisions as article content');
assert.doesNotMatch(layout, /没有确认个案要求就先报名/, 'Chinese layout does not publish generic mistakes as article content');
assert.doesNotMatch(layout, /zhCoreOfficialSources\.map/, 'Chinese layout does not use a generic source list as page-specific sources');

for (const slug of slugs) {
  const page = fs.readFileSync(`src/pages/zh/guides/${slug}.astro`, 'utf8');
  for (const slot of slotNames) {
    assert.equal((page.match(new RegExp(`<Fragment slot=["']${slot}["']`, 'g')) || []).length, 1, `${slug} supplies exactly one page-specific ${slot} section`);
  }
}

console.log('scheme 3 Chinese page-specific section slots passed');
