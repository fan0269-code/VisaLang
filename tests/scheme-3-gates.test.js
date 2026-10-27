const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const {
  chinesePillarSlugs: chinesePillars,
  englishPillarSlugs: englishPillars,
  guideRedirects,
  guideRedirectCandidates,
  noindexCategorySlugs: categories,
} = require('../src/data/publication-manifest.ts');

const root = path.resolve(__dirname, '..');
const migrationMapPath = path.join(root, 'docs', 'VISALANG_M3_T23_MIGRATION_CANDIDATE_ROLLBACK_MAP_2026-09-11.md');
const migrationMapSource = fs.readFileSync(migrationMapPath, 'utf8');
const machineRecordMatch = migrationMapSource.match(
  /<!-- M3_T23_MACHINE_RECORD_START -->\s*```json\s*([\s\S]*?)\s*```\s*<!-- M3_T23_MACHINE_RECORD_END -->/,
);
assert.ok(machineRecordMatch, 'the T23 migration map exposes its frozen machine record');
const migrationRecord = JSON.parse(machineRecordMatch[1]);
const localMappings = Object.entries(guideRedirectCandidates)
  .map(([sourceUrl, currentDirtyTargetUrl]) => ({ sourceUrl, currentDirtyTargetUrl }))
  .sort((left, right) => left.sourceUrl.localeCompare(right.sourceUrl, 'en'));
const mappedCandidates = migrationRecord.records
  .map(({ sourceUrl, currentDirtyTargetUrl }) => ({ sourceUrl, currentDirtyTargetUrl }))
  .sort((left, right) => left.sourceUrl.localeCompare(right.sourceUrl, 'en'));
assert.deepEqual(mappedCandidates, localMappings, 'the T23 record binds every pre-existing local structural mapping');
assert.equal(migrationRecord.newRedirectAuthorization, 'none', 'the local mappings have no new redirect authorization');
assert.equal(migrationRecord.releaseGate.authorizedRedirectCandidates, 0, 'the T23 record approves zero redirect candidates');
assert.equal(migrationRecord.releaseGate.status, 'blocked', 'the unresolved redirect candidates keep the release gate blocked');

execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });

const adsenseHost = 'pagead2.googlesyndication.com';
const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const routeFile = (route) => route === '/'
  ? 'dist/index.html'
  : route.endsWith('.html') ? `dist${route}` : `dist${route}index.html`;
const readRoute = (route) => fs.readFileSync(routeFile(route), 'utf8');
const isNoindex = (html) => html.includes('<meta name="robots" content="noindex,follow">');

for (const slug of englishPillars) {
  const route = `/guides/${slug}/`;
  const html = readRoute(route);
  const source = fs.readFileSync(`src/content/guides/${slug}.md`, 'utf8');
  const shouldAdvertise = !/^adsEligible:\s*false\s*$/m.test(source);
  assert.equal(isNoindex(html), false, `English pillar remains indexable: ${route}`);
  assert.equal(html.includes(adsenseHost), shouldAdvertise, `English pillar follows its advertising policy: ${route}`);
  assert.ok(sitemap.includes(`<loc>https://visalang.org${route}</loc>`), `English pillar is in sitemap: ${route}`);
}
for (const slug of chinesePillars) {
  const route = `/zh/guides/${slug}/`;
  const html = readRoute(route);
  assert.equal(isNoindex(html), false, `Chinese pillar remains indexable: ${route}`);
  assert.ok(!html.includes(adsenseHost), `Chinese pillar is advertising-free: ${route}`);
  assert.ok(sitemap.includes(`<loc>https://visalang.org${route}</loc>`), `Chinese pillar is in sitemap: ${route}`);
}
for (const sourceRoute of Object.keys(guideRedirects)) {
  assert.ok(!fs.existsSync(routeFile(sourceRoute)), `candidate source does not generate in this checkout: ${sourceRoute}`);
  assert.ok(!sitemap.includes(`<loc>https://visalang.org${sourceRoute}</loc>`), `current sitemap omits candidate source: ${sourceRoute}`);
}
for (const slug of categories) {
  const route = `/guides/category/${slug}/`;
  const html = readRoute(route);
  assert.equal(isNoindex(html), true, `category is noindex: ${route}`);
  assert.ok(!html.includes(adsenseHost), `category is advertising-free: ${route}`);
  assert.ok(!sitemap.includes(`<loc>https://visalang.org${route}</loc>`), `category is outside sitemap: ${route}`);
}
for (const route of ['/', '/germany-family-reunion-a1/', '/germany-b1-settlement-citizenship/', '/zh/', '/zh/germany-family-reunion-a1/']) {
  assert.ok(!readRoute(route).includes(adsenseHost), `home or route hub is advertising-free: ${route}`);
}

const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.equal(sitemapLocations.length, new Set(sitemapLocations).size, 'sitemap contains each currently indexable canonical once');
for (const route of [
  '/zh/tools/route-finder/',
  '/zh/tools/checklist-generator/',
  '/zh/tools/timeline-calculator/',
  '/zh/tools/exam-comparison/',
  '/zh/tools/email-reminders/',
]) {
  assert.ok(sitemapLocations.includes(`https://visalang.org${route}`), `sitemap includes the maintained Chinese tool: ${route}`);
}
const generatedHtml = fs.readdirSync('dist', { recursive: true })
  .filter((entry) => typeof entry === 'string' && entry.endsWith('.html'))
  .map((entry) => fs.readFileSync(`dist/${entry}`, 'utf8'));
assert.equal(generatedHtml.filter((html) => html.includes(adsenseHost)).length, 14, 'only 14 English pillars load the AdSense runtime');

console.log('scheme 3 publication observations and T23 authorization gates passed');
