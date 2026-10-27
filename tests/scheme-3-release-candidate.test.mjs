import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import {
  chinesePillarSlugs,
  englishPillarSlugs,
  guideRedirects,
  guideRedirectCandidates,
  noindexCategorySlugs,
} from '../src/data/publication-manifest.ts';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const adsenseHost = 'pagead2.googlesyndication.com';
const noindexDirective = '<meta name="robots" content="noindex,follow">';
const migrationMapPath = path.join(root, 'docs', 'VISALANG_M3_T23_MIGRATION_CANDIDATE_ROLLBACK_MAP_2026-09-11.md');
const migrationMapSource = fs.readFileSync(migrationMapPath, 'utf8');
const machineRecordMatch = migrationMapSource.match(
  /<!-- M3_T23_MACHINE_RECORD_START -->\s*```json\s*([\s\S]*?)\s*```\s*<!-- M3_T23_MACHINE_RECORD_END -->/,
);
assert.ok(machineRecordMatch, 'the T23 migration map exposes its frozen machine record');
const migrationRecord = JSON.parse(machineRecordMatch[1]);
const expectedNoindexSupportRoutes = [
  '/privacy-policy/',
  '/cookie-policy/',
  '/terms/',
  '/editorial-policy/',
  '/affiliate-disclosure/',
  '/pricing/',
  '/partners/',
  '/route-review/',
  '/products/a1-family-reunion-pack/',
  '/products/a1-practice-pack/',
  '/404.html',
];

function listFiles(directory, suffix, result = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) listFiles(file, suffix, result);
    else if (entry.name.endsWith(suffix)) result.push(file);
  }
  return result;
}

function routeFor(file) {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404.html';
  return `/${relative.replace(/index\.html$/, '')}`;
}

function outputFor(route) {
  if (route === '/') return path.join(dist, 'index.html');
  if (route.endsWith('.html')) return path.join(dist, route.slice(1));
  return path.join(dist, route.slice(1), 'index.html');
}

assert.equal(englishPillarSlugs.length, 15, 'the publication manifest names exactly 15 English pillars');
assert.equal(chinesePillarSlugs.length, 5, 'the publication manifest names exactly 5 Chinese pillars');
assert.equal(noindexCategorySlugs.length, 12, 'the publication manifest names exactly 12 closed categories');
const localMappings = Object.entries(guideRedirectCandidates)
  .map(([sourceUrl, currentDirtyTargetUrl]) => ({ sourceUrl, currentDirtyTargetUrl }))
  .sort((left, right) => left.sourceUrl.localeCompare(right.sourceUrl, 'en'));
const mappedCandidates = migrationRecord.records
  .map(({ sourceUrl, currentDirtyTargetUrl }) => ({ sourceUrl, currentDirtyTargetUrl }))
  .sort((left, right) => left.sourceUrl.localeCompare(right.sourceUrl, 'en'));
assert.equal(localMappings.length, 17, 'the publication manifest exposes exactly 17 pre-existing local structural mappings');
assert.deepEqual(mappedCandidates, localMappings, 'the T23 record binds every pre-existing local structural mapping');
assert.equal(migrationRecord.newRedirectAuthorization, 'none', 'the local mappings have no new redirect authorization');
assert.equal(migrationRecord.releaseGate.authorizedRedirectCandidates, 0, 'the T23 record approves zero redirect candidates');
assert.equal(migrationRecord.releaseGate.status, 'blocked', 'the unresolved redirect candidates keep the release gate blocked');

execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'pipe' });

const pages = listFiles(dist, '.html').map((file) => ({
  file,
  route: routeFor(file),
  html: fs.readFileSync(file, 'utf8'),
}));
const sitemap = fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const noindexPages = pages.filter(({ html }) => html.includes(noindexDirective));
const advertisingPages = pages.filter(({ html }) => html.includes(adsenseHost));

const generatedRouteSet = new Set(pages.map(({ route }) => route));
const chineseToolRoutes = [
  '/zh/tools/route-finder/',
  '/zh/tools/checklist-generator/',
  '/zh/tools/timeline-calculator/',
  '/zh/tools/exam-comparison/',
  '/zh/tools/email-reminders/',
];
assert.equal(generatedRouteSet.size, pages.length, 'the release candidate emits each generated route once');
for (const route of chineseToolRoutes) assert.ok(generatedRouteSet.has(route), `the release candidate generates Chinese tool route: ${route}`);
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'the release candidate sitemap contains each canonical URL once');
for (const route of chineseToolRoutes) assert.ok(sitemapUrls.includes(`https://visalang.org${route}`), `the release candidate sitemap contains Chinese tool route: ${route}`);
assert.equal(noindexPages.length, 65, 'the release candidate generates exactly 65 noindex pages, including the Chinese 404 recovery page');
assert.equal(advertisingPages.length, 14, 'the release candidate exposes AdSense on exactly 14 pages');

const indexableCanonicals = pages
  .filter(({ html }) => !html.includes(noindexDirective))
  .map(({ route, html }) => html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || `missing canonical: ${route}`)
  .sort();
assert.deepEqual([...sitemapUrls].sort(), indexableCanonicals, 'sitemap membership exactly matches rendered indexability');

const englishPillarRoutes = englishPillarSlugs.map((slug) => `/guides/${slug}/`);
const expectedAdvertisingRoutes = englishPillarSlugs
  .filter((slug) => !/^adsEligible:\s*false\s*$/m.test(fs.readFileSync(path.join(root, 'src/content/guides', `${slug}.md`), 'utf8')))
  .map((slug) => `/guides/${slug}/`)
  .sort();
assert.deepEqual(advertisingPages.map(({ route }) => route).sort(), expectedAdvertisingRoutes, 'only the 14 advertising-eligible English pillars load AdSense');
const chinesePillarRoutes = chinesePillarSlugs.map((slug) => `/zh/guides/${slug}/`);
for (const route of [...englishPillarRoutes, ...chinesePillarRoutes]) {
  const html = fs.readFileSync(outputFor(route), 'utf8');
  assert.ok(!html.includes(noindexDirective), `pillar is indexable: ${route}`);
  assert.ok(sitemapUrls.includes(`https://visalang.org${route}`), `pillar is in sitemap: ${route}`);
}

const indexableNonPillarPages = pages.filter(({ route, html }) => !html.includes(noindexDirective)
  && !englishPillarRoutes.includes(route)
  && !chinesePillarRoutes.includes(route));
const expectedIndexableNonPillarRoutes = [
  '/',
  '/about/',
  '/contact/',
  '/exams/',
  '/germany-b1-settlement-citizenship/',
  '/germany-family-reunion-a1/',
  '/guides/',
  '/routes/',
  '/tools/',
  '/tools/checklist-generator/',
  '/tools/email-reminders/',
  '/tools/exam-comparison/',
  '/tools/route-finder/',
  '/tools/timeline-calculator/',
  '/zh/',
  '/zh/germany-family-reunion-a1/',
  ...chineseToolRoutes,
].sort();
assert.deepEqual(indexableNonPillarPages.map(({ route }) => route).sort(), expectedIndexableNonPillarRoutes, 'the exact non-pillar home, hub, directory, tool, trust, and Chinese-tool route set remains indexable');

const englishGuidePages = pages.filter(({ route }) => route.startsWith('/guides/')
  && !route.startsWith('/guides/category/')
  && route !== '/guides/');
const pendingEnglishPages = englishGuidePages.filter(({ route }) => !englishPillarRoutes.includes(route));
assert.equal(pendingEnglishPages.length, 38, 'exactly 24 English guides remain pending and fail closed after promoting the reviewed fee guide');
for (const page of pendingEnglishPages) {
  assert.ok(page.html.includes(noindexDirective), `pending guide is noindex: ${page.route}`);
  assert.ok(!sitemapUrls.includes(`https://visalang.org${page.route}`), `pending guide is outside sitemap: ${page.route}`);
}

for (const slug of noindexCategorySlugs) {
  const route = `/guides/category/${slug}/`;
  const html = fs.readFileSync(outputFor(route), 'utf8');
  assert.ok(html.includes(noindexDirective), `closed category is noindex: ${route}`);
  assert.ok(!html.includes(adsenseHost), `closed category is advertising-free: ${route}`);
  assert.ok(!sitemapUrls.includes(`https://visalang.org${route}`), `closed category is outside sitemap: ${route}`);
}

assert.equal(expectedNoindexSupportRoutes.length, 11, 'the support surface contains exactly 11 policy, placeholder, and error routes');
for (const route of expectedNoindexSupportRoutes) {
  const html = fs.readFileSync(outputFor(route), 'utf8');
  assert.ok(html.includes(noindexDirective), `policy, placeholder, or error route is noindex: ${route}`);
  assert.ok(!html.includes(adsenseHost), `policy, placeholder, or error route is advertising-free: ${route}`);
  assert.ok(!sitemapUrls.includes(`https://visalang.org${route}`), `policy, placeholder, or error route is outside sitemap: ${route}`);
}

const hreflangPairs = pages
  .filter(({ route }) => !route.startsWith('/zh/'))
  .flatMap(({ route, html }) => [...html.matchAll(/hreflang="zh-CN" href="https:\/\/visalang\.org([^\"]+)"/g)]
    .map((match) => [route, match[1]]));
const expectedHreflangPairs = [
  ['/', '/zh/'],
  ['/germany-family-reunion-a1/', '/zh/germany-family-reunion-a1/'],
  ...chinesePillarSlugs
    .filter((slug) => slug !== 'german-family-reunion-language-requirement')
    .map((slug) => [`/guides/${slug}/`, `/zh/guides/${slug}/`]),
  ['/tools/route-finder/', '/zh/tools/route-finder/'],
  ['/tools/checklist-generator/', '/zh/tools/checklist-generator/'],
  ['/tools/timeline-calculator/', '/zh/tools/timeline-calculator/'],
  ['/tools/exam-comparison/', '/zh/tools/exam-comparison/'],
  ['/tools/email-reminders/', '/zh/tools/email-reminders/'],
];
const sortPairs = (pairs) => pairs.map((pair) => pair.join(' <-> ')).sort();
assert.deepEqual(sortPairs(hreflangPairs), sortPairs(expectedHreflangPairs), 'the exact home, A1 hub, and four equivalent guide hreflang pairs are emitted');
for (const [englishRoute, chineseRoute] of hreflangPairs) {
  const englishHtml = fs.readFileSync(outputFor(englishRoute), 'utf8');
  const chineseHtml = fs.readFileSync(outputFor(chineseRoute), 'utf8');
  assert.ok(!englishHtml.includes(noindexDirective), `hreflang English target is indexable: ${englishRoute}`);
  assert.ok(!chineseHtml.includes(noindexDirective), `hreflang Chinese target is indexable: ${chineseRoute}`);
  assert.ok(chineseHtml.includes(`hreflang="en" href="https://visalang.org${englishRoute}"`), `hreflang pair is reciprocal: ${englishRoute}`);
}

const redirects = fs.readFileSync(path.join(dist, '_redirects'), 'utf8')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);
const redirectSources = new Set(Object.keys(guideRedirects));
for (const [source, target] of Object.entries(guideRedirects)) {
  assert.ok(redirects.includes(`${source} ${target} 301`), `pre-existing local 301 line is present: ${source}`);
  assert.ok(!redirectSources.has(target), `local mapping is structurally single-hop: ${source}`);
  assert.ok(!fs.existsSync(outputFor(source)), `candidate source does not generate in this checkout: ${source}`);
  assert.ok(fs.existsSync(outputFor(target)), `candidate target generates in this checkout: ${target}`);
}

const staleInternalLinks = [];
for (const page of pages) {
  for (const match of page.html.matchAll(/href="([^\"]+)"/g)) {
    const rawHref = match[1].split('#')[0].split('?')[0];
    const href = rawHref.startsWith('https://visalang.org/') ? rawHref.slice('https://visalang.org'.length) : rawHref;
    if (redirectSources.has(href)) staleInternalLinks.push(`${page.route} -> ${href}`);
  }
}
assert.deepEqual(staleInternalLinks, [], 'current generated internal navigation omits candidate source URLs');

console.log('scheme 3 generated-state observations and authorization gates passed');
