const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

require('./route-tools.test.js');
require('./commercial-pages.test.js');
require('./germany-a1-cluster.test.js');
require('./germany-b1-cluster.test.js');
require('./content-integrity.test.js');

const read = (file) => fs.readFileSync(file, 'utf8');
const exists = (file) => fs.existsSync(file);
const src = {
  base: read('src/layouts/BaseLayout.astro'),
  article: read('src/layouts/ArticleLayout.astro'),
  guide: read('src/layouts/GuideLayout.astro'),
  zhGuide: read('src/components/ZhGuideLayout.astro'),
  tool: read('src/layouts/ToolLayout.astro'),
  header: read('src/components/GlobalHeader.astro'),
  mobile: read('src/components/MobileNavigation.astro'),
  footer: read('src/components/GlobalFooter.astro'),
  css: read('src/styles/global.css'),
  openDesignCss: read('src/styles/open-design.css'),
  home: read('src/pages/index.astro'),
  guides: read('src/pages/guides/index.astro'),
  guideTaxonomy: read('src/data/guide-taxonomy.ts'),
  route: read('src/pages/germany-family-reunion-a1.astro'),
  tools: read('src/pages/tools/index.astro'),
  reminder: read('src/pages/tools/email-reminders.astro'),
  siteData: read('src/data/site.ts'),
  redirects: read('public/_redirects'),
};

const requiredComponents = [
  'GlobalHeader', 'MobileNavigation', 'Breadcrumbs', 'PageHero', 'RouteSelector', 'RouteProgress',
  'TrustNotice', 'VerificationAlert', 'SourceCard', 'LastCheckedBadge', 'GuideCard', 'GuideStatusBadge',
  'FilterBar', 'SearchInput', 'ArticleTOC', 'ComparisonTable', 'DecisionTable', 'ToolStepper',
  'ToolResultPanel', 'CopyButton', 'PrintButton', 'ExportButton', 'RelatedGuides',
  'ReportOutdatedInfo', 'GlobalFooter',
];
for (const component of requiredComponents) {
  assert.ok(exists(`src/components/${component}.astro`), `shared component should exist: ${component}`);
}

for (const route of ['Home', 'Routes', 'Exams', 'Tools', 'Guides', 'About']) {
  assert.match(src.siteData, new RegExp(route.toLowerCase()), `navigation data should include ${route}`);
}
assert.ok(src.header.includes("href=\"/pricing/\""), 'Pricing remains available under the About menu');
assert.ok(src.header.includes("href=\"/partners/\""), 'Partners remains available under the About menu');
assert.ok(src.footer.includes('href="/pricing/"') && src.footer.includes('href="/partners/"'), 'Pricing and Partners remain available in the footer');
assert.ok(src.header.includes('nav-menu__panel'), 'Routes and About use dropdown panels');
assert.ok(src.header.includes('nav-menu__link') && src.header.includes('nav-menu__disclosure'), 'Routes and About keep a direct link separate from their disclosure control');
assert.ok(src.openDesignCss.includes('.global-header__nav { margin-left: 0; flex: 1; overflow: visible;'), 'desktop navigation does not clip dropdown panels');
assert.ok(src.mobile.includes('Mobile navigation'), 'mobile navigation has its own accessible label');
assert.ok(src.base.includes('class="skip-link"'), 'shared layout exposes a skip link');
assert.ok(src.base.includes('id="main-content"'), 'shared layout exposes a main target');
assert.ok(src.base.includes('organisationJsonLD'), 'shared layout emits Organization data');
assert.ok(src.base.includes('rel="canonical"'), 'shared layout emits canonical URLs');
assert.ok(src.base.includes('hreflang'), 'shared layout emits hreflang links');

for (const token of ['--page-max', '--reading-max', '--text-2xl', '--space-8', '--radius', '--shadow-md', '--primary', '--risk', '--success', '--focus', '--disabled']) {
  assert.ok(src.css.includes(token), `design system should define ${token}`);
}
assert.ok(src.css.includes('prefers-color-scheme: dark'), 'design system reserves dark mode tokens');
assert.ok(src.css.includes('prefers-reduced-motion: reduce'), 'design system respects reduced motion');
assert.ok(src.css.includes('@media (max-width: 680px)'), 'design system defines a mobile layout');
assert.ok(src.css.includes('min-height: 44px'), 'interactive controls use a reasonable hit area');
assert.ok(src.css.includes('overflow-x: auto'), 'wide tables and tool navigation can scroll safely');

assert.ok(src.home.includes('Find the right language proof before you book an exam.'), 'homepage has the selected route-planning task');
assert.ok(src.home.includes('route-console'), 'homepage includes the Open Design route console panel');
assert.ok(src.home.includes('href="/tools/route-finder/">Start with Route Finder'), 'homepage has the required primary action');
assert.ok(src.home.includes('href="/guides/">Browse guides</a>'), 'homepage has the Open Design secondary action');
assert.ok(src.home.includes('<RouteSelector'), 'homepage uses the shared purpose selector');
assert.ok(src.home.includes('trust-band'), 'homepage uses the Open Design trust strip');
assert.ok(src.home.includes('guides.length'), 'homepage guide count is data-driven');
assert.ok(src.home.includes('guideCategories.length'), 'homepage route count is data-driven');

for (const file of ['src/pages/routes/index.astro', 'src/pages/exams/index.astro', 'src/pages/tools/index.astro']) {
  assert.ok(exists(file), `top-level centre page should exist: ${file}`);
}
assert.doesNotMatch(read('src/pages/exams/index.astro'), /Object\.groupBy/, 'exam directory remains compatible with the server Node 20 runtime');
assert.ok(src.tools.includes('site.tools.map'), 'tools centre is data-driven');
assert.ok(src.tool.includes("'@type': 'WebApplication'"), 'real tools emit WebApplication structured data');
assert.ok(read('src/components/tools/ToolShell.astro').includes('localStorage'), 'tool progress is saved locally');
assert.ok(read('src/components/tools/ToolShell.astro').includes('data-tool-restart'), 'tools have a restart control');
assert.ok(read('src/data/route-tools.ts').includes("availability: 'coming-soon'"), 'unsupported routes stop at a coming-soon state');
assert.ok(read('src/data/route-tools.ts').includes('if (!route) return []'), 'unsupported routes do not generate a pseudo-checklist');
assert.ok(!/value="(21|28|7)"/.test(read('src/pages/tools/timeline-calculator.astro')), 'timeline does not assume default result or retake timing');
assert.ok(!/type="email"|Email address/.test(src.reminder), 'Reminder Planner does not collect email');
assert.ok(src.reminder.includes('Download ICS'), 'Reminder Planner exports an ICS calendar file');
assert.ok(src.reminder.includes('ToolResultSupport'), 'Reminder Planner offers shared copy, print, and export actions');

assert.equal((src.guide.match(/<h1>/g) || []).length, 1, 'ArticleLayout declares one H1');
assert.ok(src.article.includes('<ArticleTOC'), 'ArticleLayout uses one shared TOC');
assert.ok(src.guide.includes('<ArticleLayout') && src.zhGuide.includes('<ArticleLayout'), 'English and Chinese guides share ArticleLayout');
assert.ok(src.guide.includes('Official verification date not separately recorded'), 'ArticleLayout distinguishes update and verification dates');
assert.ok(read('src/data/article-sections.ts').includes('buildArticleSections'), 'ArticleLayout uses a build-time Markdown sectioner');
for (const section of ['who', 'detailed', 'commonMistakes', 'nextAction', 'officialSources']) assert.ok(read('src/data/article-sections.ts').includes(section), `article sectioner preserves ${section}`);
for (const id of ['direct-answer', 'who-this-applies-to', 'key-decisions', 'detailed-explanation', 'what-to-verify-officially', 'common-mistakes', 'next-action', 'official-sources']) {
  assert.ok(src.guide.includes(`id="${id}"`), `English article renders ordered section ${id}`);
  assert.ok(src.zhGuide.includes(`id="${id}"`), `Chinese article renders ordered section ${id}`);
}
assert.ok(!read('src/pages/guides/[slug].astro').includes('GermanyA1RouteSupport'), 'guide pages no longer add the duplicate Germany A1 shell');
assert.ok(src.guide.includes("'@type': 'Article'"), 'articles emit Article data');
assert.ok(src.guide.includes("'@type': 'BreadcrumbList'"), 'articles emit BreadcrumbList data');

for (const filter of ['purpose', 'country', 'route', 'exam', 'level', 'language', 'status']) {
  assert.ok(src.guides.includes(`name: '${filter}'`), `guide library includes ${filter} filter`);
}
for (const sort of ['Recently verified', 'Route relevance', 'Content maturity']) {
  assert.ok(src.guides.includes(sort), `guide library includes ${sort} sorting`);
}
for (const status of ['Complete route', 'Core route', 'Starter overview']) {
  assert.ok(src.guides.includes(status), `guide library includes ${status} status`);
}
assert.ok(src.guideTaxonomy.includes("category === 'germany-a1'") && src.guideTaxonomy.includes("'complete-route'"), 'Germany A1 is marked as the complete route');
assert.ok(src.guideTaxonomy.includes("category === 'germany-b1'") && src.guideTaxonomy.includes("'core-route'"), 'Germany B1 is marked as the core route');
assert.ok(src.guideTaxonomy.includes('starter overview guides'), 'other categories retain starter overview framing');
assert.ok(src.guides.includes('history.replaceState'), 'guide filters persist to URL parameters');
assert.ok(src.guides.includes('guide-empty-state'), 'guide library has an empty state');
assert.ok(src.guides.includes('Showing ${visible}'), 'guide library reports result count');

const routeSteps = [
  'Confirm whether A1 applies', 'Confirm the accepted proof', 'Compare exam options', 'Verify centre and booking',
  'Build the timeline', 'Prepare documents and exam', 'Recheck before submission',
];
let previous = -1;
for (const step of routeSteps) {
  const index = src.route.indexOf(step);
  assert.ok(index > previous, `route centre keeps decision order: ${step}`);
  previous = index;
}
assert.ok(src.route.includes('<RouteProgress'), 'route centre uses the shared route-progress component');
assert.ok(read('src/components/RouteProgress.astro').includes('Mark complete and continue'), 'route steps provide a persistent next-step control');
assert.ok(src.route.includes('<ReportOutdatedInfo'), 'route centre includes outdated-information reporting');
assert.ok(src.route.includes("'@type': 'FAQPage'"), 'FAQ data is used only where the FAQ is visibly rendered');

for (const status of ['Available', 'Coming soon', 'Contact only', 'Not currently offered']) {
  assert.ok(src.siteData.includes(status), `product status vocabulary includes ${status}`);
}
for (const page of ['pricing.astro', 'partners.astro', 'route-review.astro']) {
  assert.ok(read(`src/pages/${page}`).includes('status="'), `${page} declares a product state`);
}
for (const page of ['a1-family-reunion-pack.astro', 'a1-practice-pack.astro']) {
  assert.ok(read(`src/pages/products/${page}`).includes('status="coming-soon"'), `${page} is clearly coming soon`);
}

assert.ok(src.redirects.includes('/do-i-need-german-a1.html /tools/route-finder/ 301'), 'legacy helper has a 301 redirect');
assert.ok(src.redirects.includes('dutch-inburgering-a2-b1-for-integration-and-citizenship'), 'truncated Dutch slug redirects to corrected slug');
assert.ok(src.redirects.includes('portuguese-language-for-golden-visa-and-citizenship'), 'truncated Portuguese slug redirects to corrected slug');
assert.ok(exists('src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md'), 'correct Dutch source slug exists');
assert.ok(exists('src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md'), 'correct Portuguese source slug exists');

const contentFiles = fs.readdirSync('src/content/guides').filter((file) => file.endsWith('.md'));
assert.equal(contentFiles.length, 54, 'guide collection retains all 54 guides');
for (const file of contentFiles) {
  const source = read(path.join('src/content/guides', file));
  for (const field of ['title', 'description', 'category', 'slug', 'publishedDate', 'updatedDate', 'readingTime']) {
    assert.match(source, new RegExp(`^${field}:`, 'm'), `${file} retains ${field}`);
  }
}

console.log('site UI, route, guide, tool, SEO, accessibility, and migration checks passed');
