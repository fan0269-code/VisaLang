import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const home = read('src/pages/index.astro');
const zhHome = read('src/pages/zh/index.astro');
const routes = read('src/pages/routes/index.astro');
const selector = read('src/components/RouteSelector.astro');
const site = read('src/data/site.ts');

const homeSeoTitle = home.match(/<BaseLayout title="([^"]+)"/)?.[1] ?? '';
const expectedEnglishEntries = [
  ['Check the requirement', '/guides/german-family-reunion-language-requirement/'],
  ['Choosing between exams?', '/guides/goethe-a1-vs-telc-a1/'],
  ['Prepare booking and next steps', '/guides/german-a1-exam-booking-timeline/'],
];

const homeMetadataTitle = home.match(/<BaseLayout title="([^"]+)"/)?.[1] ?? '';
assert.ok(homeMetadataTitle && `${homeMetadataTitle} | VisaLang`.length <= 60, 'English home keeps its rendered metadata title within the launch-check snippet budget');
assert.match(home, /Plan your German language proof\./, 'English home narrows the promise to German language-proof planning');
assert.ok(homeSeoTitle && `${homeSeoTitle} | VisaLang`.length <= 60, 'English home keeps its rendered SEO title within the launch snippet budget');
assert.match(home, /Our main planning route covers Germany A1 family reunion\. Separate guides explain B1 language evidence/, 'English home distinguishes the configured Germany A1 route from B1 guides');
for (const [label, href] of expectedEnglishEntries) {
  assert.ok(home.includes(label) && home.includes(`href="${href}"`), `English home exposes the honest ${label} entry`);
}
assert.match(home, /Route Finder organises your starting questions\. Its fully configured route currently covers Germany A1 family reunion\./, 'English home states Route Finder\'s configured scope');
assert.match(home, /href="\/germany-b1-settlement-citizenship\/"/, 'English home keeps B1 as a real guide destination');
assert.doesNotMatch(home, /full-service|guarantee|real-time seat/i, 'English home does not imply a full service or live availability');

assert.match(zhHome, /德国 A1 配偶团聚规划/, 'Chinese home makes the China-facing A1 entry its current focus');
assert.match(zhHome, /B1[^\n]*（英文）/, 'Chinese home labels the B1 destination as English');
assert.match(zhHome, /href="\/zh\/tools\/route-finder\/"/, 'Chinese home sends the planning-tool entry to the maintained Chinese Route Finder');
assert.doesNotMatch(zhHome, /路线查找器（英文）/, 'Chinese home no longer labels the localized Route Finder as English-only');
assert.match(zhHome, /指南（英文）/, 'Chinese home labels English-only guide destinations');
assert.doesNotMatch(zhHome, /\/zh\/guides\/goethe-a1-germany-family-reunion\//, 'Chinese home does not invent a Chinese C07 route');

assert.match(routes, /Only Germany A1 family reunion is fully configured/, 'route hub states its single configured scope');
assert.match(selector, /Configured planning route/, 'selector uses a reader-facing configured label');
assert.match(selector, /Guide entry — verify with the authority/, 'selector makes B1 a guide-only entry');
assert.match(selector, /Verification only/, 'selector marks unsupported entries as verification-only');
assert.doesNotMatch(selector, /Route available/, 'selector no longer overstates generic availability');
assert.match(site, /support: 'configured'/, 'site data identifies the configured route');
assert.match(site, /support: 'guide-only'/, 'site data identifies guide-only B1 entries');
assert.match(site, /support: 'verify-only'/, 'site data identifies verification-only entries');

console.log('Task 4 home and route support-state contract passed');
