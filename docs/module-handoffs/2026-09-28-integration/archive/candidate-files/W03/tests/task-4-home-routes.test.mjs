import assert from 'node:assert/strict';
import fs from 'node:fs';
import { routeRegistry } from '../src/data/route-tools.ts';
import { getChineseGuidePublicationPolicy } from '../src/data/publication-manifest.ts';
import { zhGermanyA1Guides } from '../src/data/zh-germany-a1.ts';

const read = (file) => fs.readFileSync(file, 'utf8');
const home = read('src/pages/index.astro');
const zhHome = read('src/pages/zh/index.astro');
const routes = read('src/pages/routes/index.astro');
const selector = read('src/components/RouteSelector.astro');
const site = read('src/data/site.ts');

const task4aDeclaredRoute = '/guides/goethe-a1-germany-family-reunion/';
const homeSeoTitle = home.match(/<BaseLayout title="([^"]+)"/)?.[1] ?? '';
const expectedEnglishEntries = [
  ['Check the requirement', '/guides/german-family-reunion-language-requirement/'],
  ['Already have a certificate?', task4aDeclaredRoute],
  ['Prepare booking and next steps', '/guides/german-a1-exam-booking-timeline/'],
];

const homeMetadataTitle = home.match(/<BaseLayout title="([^"]+)"/)?.[1] ?? '';
assert.ok(homeMetadataTitle && `${homeMetadataTitle} | VisaLang`.length <= 60, 'English home keeps its rendered metadata title within the launch-check snippet budget');
assert.match(home, /Plan your German language proof\./, 'English home narrows the promise to German language-proof planning');
assert.ok(homeSeoTitle && `${homeSeoTitle} | VisaLang`.length <= 60, 'English home keeps its rendered SEO title within the launch snippet budget');
assert.match(home, /Our main planning route covers Germany A1 family reunion\. Separate guides explain B1 language evidence/, 'English home distinguishes the configured Germany A1 route from B1 guides');
for (const [label, href] of expectedEnglishEntries) {
  assert.ok(home.includes(`href="${href}">${label}</a>`), `English home exposes the honest ${label} entry`);
}
assert.match(home, /Route Finder organises your starting questions\. Its fully configured route currently covers Germany A1 family reunion\./, 'English home states Route Finder\'s configured scope');
assert.match(home, /href="\/germany-b1-settlement-citizenship\/"/, 'English home keeps B1 as a real guide destination');
assert.doesNotMatch(home, /full-service|guarantee|real-time seat/i, 'English home does not imply a full service or live availability');

assert.match(zhHome, /德国 A1 配偶团聚规划/, 'Chinese home makes the China-facing A1 entry its current focus');
assert.match(zhHome, /B1[^\n]*（英文）/, 'Chinese home labels the B1 destination as English');
assert.match(zhHome, /href="\/zh\/tools\/route-finder\/"/, 'Chinese home sends the planning-tool entry to the maintained Chinese Route Finder');
assert.doesNotMatch(zhHome, /路线查找器（英文）/, 'Chinese home no longer labels the localized Route Finder as English-only');
assert.match(zhHome, /指南（英文）/, 'Chinese home labels English-only guide destinations');
const chineseTasks = [
  ['已有 Goethe A1 证书？', '/zh/guides/goethe-a1-germany-family-reunion/'],
  ['查要求', '/zh/guides/german-family-reunion-language-requirement/'],
  ['准备报名', '/zh/guides/german-a1-exam-booking-timeline/'],
];
for (const [label, href] of chineseTasks) {
  assert.ok(zhHome.includes(`href="${href}">${label}</a>`), `Chinese task ${label} directly links to its maintained page`);
  assert.ok(fs.existsSync(`src/pages${href}index.astro`) || fs.existsSync(`src/pages${href.slice(0, -1)}.astro`), `${href} is an existing route`);
}
assert.match(read('src/pages/zh/guides/goethe-a1-germany-family-reunion.astro'), /先建立证书记录/, 'the restored Chinese certificate page supplies the task record');

assert.match(routes, /Only Germany A1 family reunion is fully configured/, 'route hub states its single configured scope');
assert.match(selector, /Configured planning route/, 'selector uses a reader-facing configured label');
assert.match(selector, /Guide entry — verify with the authority/, 'selector makes B1 a guide-only entry');
assert.match(selector, /Verification only/, 'selector marks unsupported entries as verification-only');
assert.doesNotMatch(selector, /Route available/, 'selector no longer overstates generic availability');
assert.match(site, /support: 'configured'/, 'site data identifies the configured route');
assert.match(site, /support: 'guide-only'/, 'site data identifies guide-only B1 entries');
assert.match(site, /support: 'verify-only'/, 'site data identifies verification-only entries');

assert.equal(routeRegistry.filter((route) => route.availability === 'configured').length, 1, 'entry scope retains exactly one configured tool route');
assert.equal(routeRegistry.filter((route) => route.availability === 'verify-only').length, 4, 'the four other registered tool routes remain verification-only');
const certificateRecord = zhGermanyA1Guides.find((guide) => guide.slug === 'goethe-a1-germany-family-reunion');
assert.ok(certificateRecord, 'the Chinese certificate entry is backed by its retained record');
const certificatePolicy = getChineseGuidePublicationPolicy(certificateRecord);
assert.equal(certificatePolicy.index, false, 'linking the retained Chinese certificate page does not expand indexing');
assert.equal(certificatePolicy.ads, false, 'the retained Chinese certificate page stays ad-free');

console.log('Task 4 home and route support-state contract passed');
