import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { guideRedirects } from '../src/data/publication-manifest.ts';
import { translatedPaths } from '../src/data/site.ts';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const migrationMapPath = path.join(root, 'docs/VISALANG_M3_T23_MIGRATION_CANDIDATE_ROLLBACK_MAP_2026-09-11.md');
const origin = 'https://visalang.org';
const indexRobots = 'index,follow,max-image-preview:large';
const noindexRobots = 'noindex,follow';

const expectedTranslationPairs = [
  ['/', '/zh/'],
  ['/germany-family-reunion-a1/', '/zh/germany-family-reunion-a1/'],
  ['/guides/german-a1-exam-booking-timeline/', '/zh/guides/german-a1-exam-booking-timeline/'],
  ['/guides/goethe-a1-30-day-study-plan/', '/zh/guides/goethe-a1-30-day-study-plan/'],
  ['/guides/goethe-a1-test-centers/', '/zh/guides/goethe-a1-test-centers/'],
  ['/guides/goethe-a1-vs-telc-a1/', '/zh/guides/goethe-a1-vs-telc-a1/'],
  ['/tools/checklist-generator/', '/zh/tools/checklist-generator/'],
  ['/tools/email-reminders/', '/zh/tools/email-reminders/'],
  ['/tools/exam-comparison/', '/zh/tools/exam-comparison/'],
  ['/tools/route-finder/', '/zh/tools/route-finder/'],
  ['/tools/timeline-calculator/', '/zh/tools/timeline-calculator/'],
];

const representativePolicies = new Map([
  ['/guides/goethe-a1-test-centers/', { lang: 'en', robots: indexRobots }],
  ['/zh/guides/goethe-a1-test-centers/', { lang: 'zh-CN', robots: indexRobots }],
  ['/guides/german-family-reunion-language-requirement/', { lang: 'en', robots: indexRobots }],
  ['/zh/guides/german-family-reunion-language-requirement/', { lang: 'zh-CN', robots: indexRobots }],
  ['/guides/cils-b1-cittadinanza-for-italian-citizenship/', { lang: 'en', robots: noindexRobots }],
  ['/guides/', { lang: 'en', robots: indexRobots }],
  ['/exams/', { lang: 'en', robots: indexRobots }],
  ['/about/', { lang: 'en', robots: indexRobots }],
  ['/editorial-policy/', { lang: 'en', robots: noindexRobots }],
  ...expectedTranslationPairs
    .filter(([, chineseRoute]) => chineseRoute.startsWith('/zh/tools/'))
    .map(([, chineseRoute]) => [chineseRoute, { lang: 'zh-CN', robots: indexRobots }]),
]);

function listHtmlFiles(directory, result = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) listHtmlFiles(file, result);
    else if (entry.name.endsWith('.html')) result.push(file);
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

function attributes(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match.slice(1));
}

function pageRecord(file) {
  const html = fs.readFileSync(file, 'utf8');
  const route = routeFor(file);
  const canonicals = attributes(html, /<link rel="canonical" href="([^"]+)"/g).map(([href]) => href);
  const robots = attributes(html, /<meta name="robots" content="([^"]+)"/g).map(([content]) => content);
  const languages = attributes(html, /<html lang="([^"]+)"/g).map(([lang]) => lang);
  const alternates = attributes(html, /<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)
    .map(([lang, href]) => ({ lang, href }));
  return { file, route, html, canonicals, robots, languages, alternates };
}

function expectedAlternates(englishRoute, chineseRoute) {
  return [
    { lang: 'en', href: `${origin}${englishRoute}` },
    { lang: 'x-default', href: `${origin}${englishRoute}` },
    { lang: 'zh-CN', href: `${origin}${chineseRoute}` },
  ].sort((left, right) => left.lang.localeCompare(right.lang));
}

function readMigrationMap() {
  const markdown = fs.readFileSync(migrationMapPath, 'utf8');
  const block = markdown.match(/<!-- M3_T23_MACHINE_RECORD_START -->\s*```json\s*([\s\S]*?)\s*```\s*<!-- M3_T23_MACHINE_RECORD_END -->/);
  assert.ok(block, 'T23 map exposes its bounded machine-readable record to the release gate');
  return JSON.parse(block[1]);
}

const pages = listHtmlFiles(dist).map(pageRecord);
const pagesByRoute = new Map(pages.map((page) => [page.route, page]));
const sitemap = fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8');
const sitemapUrls = attributes(sitemap, /<loc>([^<]+)<\/loc>/g).map(([href]) => href);
const sitemapUrlSet = new Set(sitemapUrls);

test('the full repository runner invokes every focused M3 contract', () => {
  const fullRunner = fs.readFileSync(path.join(root, 'tests', 'site.test.js'), 'utf8');
  for (const suite of [
    'm3-chinese-tool-contract.test.mjs',
    'm3-chinese-journey.test.mjs',
    'm3-discovery-trust.test.mjs',
    'm3-generated-seo.test.mjs',
    'm3-migration-map.test.mjs',
  ]) {
    assert.match(fullRunner, new RegExp(`tests/${suite.replaceAll('.', '\\.')}`), `npm test includes ${suite}`);
  }
});

test('generated routes have one self-canonical, one language, one robots policy, and no indexable query variant', () => {
  assert.ok(pages.length > 0, 'a built dist is available for the generated contract');

  for (const page of pages) {
    assert.equal(page.canonicals.length, 1, `${page.route} emits exactly one canonical`);
    assert.equal(page.languages.length, 1, `${page.route} emits exactly one html language`);
    assert.equal(page.robots.length, 1, `${page.route} emits exactly one robots directive`);
    assert.ok([indexRobots, noindexRobots].includes(page.robots[0]), `${page.route} uses a controlled robots directive`);
    assert.doesNotMatch(page.canonicals[0], /[?#]/, `${page.route} canonical has no query or fragment`);
    if (page.route !== '/404.html') {
      assert.equal(page.canonicals[0], `${origin}${page.route}`, `${page.route} is self-canonical`);
    }
    const shouldBeIndexed = page.robots[0] === indexRobots;
    assert.equal(sitemapUrlSet.has(page.canonicals[0]), shouldBeIndexed, `${page.route} sitemap membership matches rendered robots`);
  }

  for (const href of sitemapUrls) assert.doesNotMatch(href, /[?#]/, `sitemap URL has no query or fragment: ${href}`);
  assert.equal(sitemapUrls.length, sitemapUrlSet.size, 'sitemap URLs are unique');
});

test('five Chinese tools and representative guide, directory, and trust routes render the declared source policy', () => {
  for (const [route, policy] of representativePolicies) {
    const page = pagesByRoute.get(route);
    assert.ok(page, `generated route exists: ${route}`);
    assert.deepEqual(page.languages, [policy.lang], `${route} renders the declared language`);
    assert.deepEqual(page.robots, [policy.robots], `${route} renders the declared robots policy`);
    assert.deepEqual(page.canonicals, [`${origin}${route}`], `${route} renders its declared self-canonical`);
  }
});

test('generated hreflang is reciprocal and limited to the exact true-equivalence registry', () => {
  assert.deepEqual(
    Object.entries(translatedPaths).sort(([left], [right]) => left.localeCompare(right)),
    expectedTranslationPairs.sort(([left], [right]) => left.localeCompare(right)),
    'the source registry contains only the eleven reviewed equivalence pairs',
  );

  const pairByRoute = new Map(expectedTranslationPairs.flatMap(([englishRoute, chineseRoute]) => [
    [englishRoute, [englishRoute, chineseRoute]],
    [chineseRoute, [englishRoute, chineseRoute]],
  ]));

  for (const page of pages) {
    const pair = pairByRoute.get(page.route);
    const actual = [...page.alternates].sort((left, right) => left.lang.localeCompare(right.lang));
    if (!pair) {
      assert.deepEqual(actual, [], `${page.route} does not emit hreflang without a reviewed equivalent`);
      continue;
    }
    assert.deepEqual(actual, expectedAlternates(...pair), `${page.route} emits the exact reciprocal language set`);
    for (const alternate of actual) assert.doesNotMatch(alternate.href, /[?#]/, `${page.route} hreflang has no query or fragment`);
  }

  for (const [englishRoute, chineseRoute] of expectedTranslationPairs) {
    assert.ok(pagesByRoute.has(englishRoute), `English equivalent exists: ${englishRoute}`);
    assert.ok(pagesByRoute.has(chineseRoute), `Chinese equivalent exists: ${chineseRoute}`);
  }

  for (const c01Route of [
    '/guides/german-family-reunion-language-requirement/',
    '/zh/guides/german-family-reunion-language-requirement/',
  ]) {
    assert.deepEqual(pagesByRoute.get(c01Route)?.alternates, [], `C01 scope mismatch has no hreflang: ${c01Route}`);
  }
});

test('unresolved redirect-candidate sources remain locally absent without being classified as authorized retirements', () => {
  const migrationMap = readMigrationMap();
  const emittedHeadUrls = pages.flatMap((page) => [
    ...page.canonicals,
    ...page.alternates.map((alternate) => alternate.href),
  ]);

  assert.equal(migrationMap.newRedirectAuthorization, 'none', 'the current map grants no new redirect authorization');
  assert.equal(migrationMap.records.length, 17, 'the map classifies all 17 pre-existing candidates');
  assert.equal(migrationMap.records.filter(({ disposition }) => disposition === 'APPROVE').length, 0, 'no redirect candidate is approved');
  assert.equal(migrationMap.releaseGate.status, 'blocked', 'the unresolved redirect state blocks launch readiness');

  for (const candidateRoute of Object.keys(guideRedirects)) {
    assert.ok(!fs.existsSync(outputFor(candidateRoute)), `current generated output omits the unresolved source: ${candidateRoute}`);
    assert.ok(!sitemapUrlSet.has(`${origin}${candidateRoute}`), `current sitemap omits the unresolved source: ${candidateRoute}`);
    assert.ok(!emittedHeadUrls.includes(`${origin}${candidateRoute}`), `current canonical and hreflang output omit the unresolved source: ${candidateRoute}`);
  }
});

test('robots source, generated robots, sitemap index, and launch SEO assertions describe one generated contract', () => {
  const sourceRobots = fs.readFileSync(path.join(root, 'public', 'robots.txt'), 'utf8');
  const generatedRobots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
  const sitemapIndex = fs.readFileSync(path.join(dist, 'sitemap-index.xml'), 'utf8');
  const sitemapIndexUrls = attributes(sitemapIndex, /<loc>([^<]+)<\/loc>/g).map(([href]) => href);

  assert.equal(generatedRobots, sourceRobots, 'the built robots.txt is an exact copy of its maintained source');
  assert.match(sourceRobots, /^User-agent: \*$/m, 'robots source addresses all crawlers');
  assert.match(sourceRobots, /^Allow: \/$/m, 'robots source allows pages to expose their robots meta');
  assert.doesNotMatch(sourceRobots, /^Disallow:/m, 'robots source does not hide noindex directives from crawlers');
  assert.deepEqual(
    attributes(sourceRobots, /^Sitemap:\s*(\S+)$/gm).map(([href]) => href),
    [`${origin}/sitemap-index.xml`],
    'robots source names the one generated sitemap index',
  );
  assert.deepEqual(sitemapIndexUrls, [`${origin}/sitemap-0.xml`], 'sitemap index names the generated URL set once');
  assert.ok(fs.existsSync(path.join(dist, 'sitemap-0.xml')), 'the sitemap index target exists');

  const launchCheck = spawnSync(process.execPath, ['scripts/launch-check.js'], {
    cwd: root,
    encoding: 'utf8',
  });
  const launchOutput = `${launchCheck.stdout}\n${launchCheck.stderr}`;
  assert.equal(launchCheck.status, 0, `launch-check exits non-zero while redirect authorization is unresolved:\n${launchOutput}`);
  assert.match(launchOutput, /✓ All \d+ generated HTML routes are unique and include the five Chinese tools\./, 'launch-check validates the generated route set');
  assert.match(launchOutput, /✓ All \d+ sitemap URLs are unique and include the five indexable Chinese tools\./, 'launch-check validates the generated sitemap set');
  assert.match(launchOutput, /✓ The exact non-pillar home, hub, directory, tool, trust, and Chinese-tool route set is indexable\./, 'launch-check validates the exact indexable support set');
  assert.doesNotMatch(launchOutput, /whose targets succeed|all 17 .*retired/i, 'launch-check does not overstate local target files as HTTP success or authorized retirement');
  assert.match(launchOutput, /T23 local retention checks pass for all 17 historical URLs/);
  assert.match(launchOutput, /LOCAL CANDIDATE CHECKS PASSED; production evidence is separate/);
  assert.doesNotMatch(launchOutput, /✗ .*?(?:generated HTML routes|sitemap URLs|non-pillar|hreflang|canonical|robots)/i, `launch-check has no generated SEO failure:\n${launchOutput}`);
});
