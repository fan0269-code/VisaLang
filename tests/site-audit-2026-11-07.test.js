const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = (file) => fs.readFileSync(file, 'utf8');
const home = read('src/pages/index.astro');
const zhHome = read('src/pages/zh/index.astro');
const routes = read('src/pages/routes/index.astro');
const exams = read('src/pages/exams/index.astro');
const guides = read('src/pages/guides/index.astro');
const tools = read('src/pages/tools/index.astro');
const about = read('src/pages/about.astro');
const header = read('src/components/GlobalHeader.astro');
const mobile = read('src/components/MobileNavigation.astro');
const selector = read('src/components/RouteSelector.astro');
const site = read('src/data/site.ts');
const css = read('src/styles/global.css');
const a1Hub = read('src/pages/germany-family-reunion-a1.astro');
const b1Hub = read('src/pages/germany-b1-settlement-citizenship.astro');

const brandSuffix = ' | VisaLang';
const englishSnippets = [
  ['home title', 'Germany A1 and B1 language proof', home],
  ['routes title', 'Germany A1 and B1 route hubs', routes],
  ['exams title', 'Match an exam to the route', exams],
  ['guides title', 'Germany-first guide library', guides],
  ['about title', 'About the Germany route scope', about],
];
for (const [label, title, source] of englishSnippets) {
  assert.ok(source.includes(`title="${title}"`), `${label} is set`);
  assert.ok(title.length + brandSuffix.length <= 60, `${label} stays inside the search-title budget`);
}

for (const [label, description, source] of [
  ['home', 'Check Germany family-reunion A1 and settlement or citizenship B1 proof, then confirm the current official instruction before booking.', home],
  ['routes', 'Open the Germany A1 family-reunion hub or the B1 settlement and citizenship hub. Route Finder fully configures only the A1 path.', routes],
  ['exams', 'Use the Germany A1 and B1 comparisons before booking. The directory lists official exam sites and is not proof of acceptance.', exams],
  ['guides', 'Filter source-reviewed guides. Germany A1 family reunion and Germany B1 settlement or citizenship are the developed routes.', guides],
  ['tools', 'Organise route questions on this device. Route Finder fully configures Germany family-reunion A1; other purposes need official verification.', tools],
  ['about', 'How VisaLang deepens Germany A1 family reunion and B1 settlement checks without deciding a visa, residence, or exam outcome.', about],
]) {
  assert.ok(source.includes(`description="${description}"`), `${label} description is set`);
  assert.ok(description.length <= 170, `${label} description stays inside the snippet budget`);
}

assert.ok(home.includes('href="/germany-b1-settlement-citizenship/"'), 'English homepage links the Germany B1 hub');
assert.ok(home.includes('href="/guides/german-family-reunion-language-requirement/"'), 'English homepage links the A1 requirement decision page');
const requirement = read('src/content/guides/german-family-reunion-language-requirement.md');
assert.ok(requirement.includes('seoTitle: "Do you need German A1 for family reunion?"'), 'the top-pick guide uses the question as its search title');
assert.ok(requirement.includes('Whether your file needs German A1 is decided by the competent German mission.'), 'the top-pick direct answer stays with the mission');
assert.ok(requirement.includes('sourceReviewedAt: "2026-11-14"'), 'the requirement guide records the 2026-11-14 source check');
assert.ok(requirement.includes('/guides/goethe-a1-vs-telc-a1/') && requirement.includes('/guides/german-a1-family-reunion-faq/') && requirement.includes('/guides/german-a1-documents-checklist/'), 'the top-pick guide links the next A1 checks');
assert.ok(read('src/pages/germany-family-reunion-a1.astro').includes('title="Germany A1 family reunion: verify proof"'), 'the A1 hub search title names the verification task');
assert.ok(read('src/pages/zh/index.astro').includes('href="/zh/guides/german-family-reunion-language-requirement/"'), 'the Chinese homepage links the Chinese A1 requirement page');
assert.ok(home.includes('enableAds={true}'), 'homepage keeps the future eligibility flag');
assert.ok(zhHome.includes('德国 A1 与 B1 语言证明核验'), 'Chinese homepage title names the developed routes');
assert.ok(!zhHome.includes('签证、永居、入籍语言考试路径导航'), 'Chinese homepage title is not a keyword list');
assert.ok(zhHome.includes('href="/germany-b1-settlement-citizenship/"'), 'Chinese homepage points at the English B1 hub');
assert.ok(zhHome.includes('英文'), 'Chinese homepage labels the English B1 hub');
assert.ok(routes.includes('Route Finder fully configures only Germany family-reunion A1'), 'routes page keeps the tool boundary');
assert.ok(routes.includes('href="/germany-family-reunion-a1/"') && routes.includes('href="/germany-b1-settlement-citizenship/"'), 'routes page links both developed hubs');
assert.ok(exams.includes('/guides/goethe-a1-vs-telc-a1/') && exams.includes('/guides/goethe-b1-vs-telc-b1/'), 'exam directory links the developed comparisons');
assert.ok(exams.includes('<h4>{exam.name}</h4>'), 'exam names sit under the country heading');
assert.ok(selector.includes('Guide hub') && selector.includes('Official check first'), 'route chips distinguish hubs from official checks');
assert.ok(!selector.includes('Route available'), 'route chips do not call every purpose available');
assert.ok(site.includes("coverage: 'guide-hub'") && site.includes("coverage: 'verification'"), 'route data records hub versus verification coverage');
assert.ok(site.includes("lastSystemReview: '2026-11-07'"), 'system review date matches this audit');
assert.ok(about.includes("const updated = '2026-11-07'"), 'About records this route-scope edit date');
assert.ok(about.includes('It is not a new statutory re-read.'), 'About date is a scope label, not a statutory re-read');
assert.ok(site.includes('advertisingRuntimeEnabled: false'), 'advertising runtime stays off');
assert.ok(header.includes("'/guides/?language=zh'") && header.includes('中文指南'), 'Chinese header opens the Chinese guide filter');
assert.ok(mobile.includes("'/guides/?language=zh'") && mobile.includes('中文指南'), 'Chinese mobile nav opens the Chinese guide filter');
assert.ok(a1Hub.includes('href="/germany-b1-settlement-citizenship/"'), 'A1 hub points settlement and citizenship elsewhere');
assert.ok(b1Hub.includes('href="/germany-family-reunion-a1/"') && b1Hub.includes('href="/zh/germany-family-reunion-a1/"'), 'B1 hub points family reunion to the A1 hubs');
assert.ok(css.includes('@media (max-width: 1024px)') && css.includes('.mobile-navigation { display: block; }'), 'primary nav collapses at the approved 1024px breakpoint');
assert.ok(css.includes('color: #0d1725;'), 'dark-mode primary actions use dark text on the light blue fill');
assert.ok(!css.includes('.route-selector a:hover { background: var(--primary); color: #fff; }'), 'route chips do not invert to white on primary');
assert.ok(read('docs/SITE_AUDIT_2026-11-07.md').includes('HTTP 521') && read('docs/SITE_AUDIT_2026-11-07.md').includes('not ready to apply'), 'audit records the live outage and refuses an AdSense-ready claim');

console.log('2026-11-07 site audit rules passed');
