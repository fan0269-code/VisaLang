const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

require('./route-tools.test.js');
require('./commercial-pages.test.js');
require('./germany-a1-cluster.test.js');
require('./germany-b1-cluster.test.js');
require('./germany-testdaf-cluster.test.js');
require('./content-integrity.test.js');
require('./source-review-render.test.js');
require('./deploy.test.js');

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
  styleArchitecture: read('docs/STYLE_ARCHITECTURE.md'),
  home: read('src/pages/index.astro'),
  guides: read('src/pages/guides/index.astro'),
  filterBar: read('src/components/FilterBar.astro'),
  guideCard: read('src/components/GuideCard.astro'),
  guideTaxonomy: read('src/data/guide-taxonomy.ts'),
  route: read('src/pages/germany-family-reunion-a1.astro'),
  tools: read('src/pages/tools/index.astro'),
  reminder: read('src/pages/tools/email-reminders.astro'),
  privacy: read('src/pages/privacy-policy.astro'),
  cookies: read('src/pages/cookie-policy.astro'),
  siteData: read('src/data/site.ts'),
  redirects: read('public/_redirects'),
  headers: read('public/_headers'),
  adsTxt: exists('public/ads.txt') ? read('public/ads.txt') : '',
  sourceReview: read('src/data/source-review.ts'),
  guideStatusBadge: read('src/components/GuideStatusBadge.astro'),
  navigationCurrent: exists('src/lib/navigation-current.ts') ? read('src/lib/navigation-current.ts') : '',
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
assert.ok(!src.header.includes('header-route-cta'), 'header does not duplicate the homepage Route Finder CTA');
assert.ok(src.footer.includes('href="/pricing/"') && src.footer.includes('href="/partners/"'), 'Pricing and Partners remain available in the footer');
assert.ok(src.header.includes('nav-menu__panel'), 'Routes and About use dropdown panels');
assert.ok(src.header.includes('nav-menu__link') && src.header.includes('nav-menu__disclosure'), 'Routes and About keep a direct link separate from their disclosure control');
assert.ok(src.header.includes("navigationCurrent(currentPath, item.key, href)") && src.mobile.includes("navigationCurrent(currentPath, item.key, href)"), 'desktop and mobile navigation reuse one current-location rule');
assert.ok(src.navigationCurrent.includes("if (currentPath === href) return 'page'") && src.navigationCurrent.includes("return sectionActive(currentPath, key, href) ? 'location' : undefined"), 'navigation distinguishes exact pages from parent sections');
assert.ok(src.header.includes('Open Routes menu') && src.header.includes('Open About menu'), 'Routes and About disclosures have names distinct from their page links');
assert.ok(src.css.includes('.global-header__nav { margin-left: 0; flex: 1; overflow: visible;'), 'desktop navigation does not clip dropdown panels');
assert.ok(src.mobile.includes('Mobile navigation'), 'mobile navigation has its own accessible label');
assert.ok(src.base.includes('class="skip-link"'), 'shared layout exposes a skip link');
assert.ok(src.base.includes('id="main-content"'), 'shared layout exposes a main target');
assert.ok(src.base.includes('organisationJsonLD'), 'shared layout emits Organization data');
assert.ok(src.base.includes('rel="canonical"'), 'shared layout emits canonical URLs');
assert.ok(src.base.includes('hreflang'), 'shared layout emits hreflang links');
const adsenseLoader = 'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018617123550799';
assert.ok(src.base.includes('enableAds?: boolean'), 'BaseLayout exposes an enableAds prop');
assert.ok(src.base.includes('enableAds = true'), 'BaseLayout enables advertising by default');
assert.equal((src.base.match(/pagead2\.googlesyndication\.com/g) || []).length, 1, 'BaseLayout declares the AdSense host once');
assert.ok(src.base.includes(adsenseLoader), 'BaseLayout loads the configured AdSense publisher script');
assert.match(
  src.base,
  /\{\s*enableAds\s*&&\s*<script\s+async\s+src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-3018617123550799"\s+crossorigin="anonymous"><\/script>\s*\}/,
  'BaseLayout conditionally renders the approved AdSense loader through enableAds',
);
assert.ok(!src.base.includes('static.cloudflareinsights.com'), 'shared layout does not load Cloudflare Web Analytics');
assert.ok(src.tool.includes('enableAds={false}'), 'ToolLayout disables advertising for URL-backed tools');
assert.ok(src.tools.includes('enableAds={false}'), 'tools index disables advertising');
assert.ok(src.guides.includes('enableAds={false}'), 'searchable guide library index disables advertising');
assert.equal(src.adsTxt, 'google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0\n', 'ads.txt declares the approved direct Google seller');
assert.ok(src.privacy.includes('How VisaLang handles visitor data, advertising choices, URL state, local storage, and server logs.'), 'privacy policy description covers advertising choices');
for (const text of ['VisaLang uses Google AdSense on ad-eligible content pages', 'Google Privacy & messaging', 'Google Ads Settings', 'places only the non-sensitive values needed to restore that result in the page URL']) {
  assert.ok(src.privacy.includes(text), `privacy policy includes ${text}`);
}
for (const text of ['Google AdSense and Google Privacy & messaging', 'Current tools do not store their form fields in local storage.', 'Route progress:', 'current route step in browser local storage']) {
  assert.ok(src.cookies.includes(text), `cookie policy includes ${text}`);
}
assert.ok(!src.headers.includes('Content-Security-Policy:'), 'headers leaves CSP to Google-managed advertising requirements');
for (const header of ['X-Content-Type-Options:', 'X-Frame-Options:', 'Referrer-Policy:', 'Permissions-Policy:', 'Strict-Transport-Security:']) {
  assert.ok(src.headers.includes(header), `headers retains ${header}`);
}

for (const page of [
  'dist/index.html',
  'dist/guides/german-family-reunion-language-requirement/index.html',
]) {
  assert.ok(read(page).includes(adsenseLoader), `ad-eligible generated page loads AdSense: ${page}`);
}
for (const page of [
  'dist/tools/index.html',
  'dist/tools/route-finder/index.html',
  'dist/tools/checklist-generator/index.html',
  'dist/tools/timeline-calculator/index.html',
  'dist/tools/exam-comparison/index.html',
  'dist/tools/email-reminders/index.html',
  'dist/guides/index.html',
]) {
  assert.ok(!read(page).includes('pagead2.googlesyndication.com'), `advertising-free generated page excludes AdSense: ${page}`);
}
assert.equal(read('dist/ads.txt'), 'google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0\n', 'generated ads.txt retains the approved direct Google seller');

for (const token of ['--page-max', '--reading-max', '--text-2xl', '--space-8', '--radius', '--shadow-md', '--primary', '--risk', '--success', '--focus', '--disabled']) {
  assert.ok(src.css.includes(token), `design system should define ${token}`);
}
assert.ok(src.css.includes('prefers-color-scheme: dark'), 'design system reserves dark mode tokens');
assert.ok(src.css.includes('prefers-reduced-motion: reduce'), 'design system respects reduced motion');
assert.ok(src.base.includes("import '../styles/global.css';") && !src.base.includes('open-design.css'), 'BaseLayout loads one production stylesheet');
assert.ok(src.styleArchitecture.includes('one stylesheet') && src.styleArchitecture.includes('375px') && src.styleArchitecture.includes('1440px'), 'style architecture documents the active source and breakpoint strategy');
const activeCssBeforeArchive = src.css.split('@media not all')[0];
assert.equal((activeCssBeforeArchive.match(/(?:^|\n):root\s*\{/g) || []).length, 1, 'core tokens have one effective base definition');
const viewportBreakpoints = [...src.css.matchAll(/@media\s*\(max-width:\s*(\d+)px\)/g)].map((match) => Number(match[1]));
assert.ok(viewportBreakpoints.length > 0 && viewportBreakpoints.every((width) => [375, 768, 1024].includes(width)), 'active viewport media queries use only the approved breakpoint set');
assert.ok(src.css.includes('@media (max-width: 375px)'), 'design system defines the 375px compact layout');
assert.ok(src.css.includes('min-height: 44px'), 'interactive controls use a reasonable hit area');
assert.ok(src.css.includes('overflow-x: auto'), 'wide tables and tool navigation can scroll safely');

assert.ok(src.home.includes('Find the right language proof before you book an exam.'), 'homepage has the selected route-planning task');
assert.ok(src.home.includes('class="route-entry"') && !src.home.includes('route-console'), 'homepage uses a static editorial route entry instead of a console surface');
assert.ok(src.home.includes('href="/tools/route-finder/">Start with Route Finder'), 'homepage has the required primary action');
assert.ok(src.home.includes('href="/guides/">Browse guides</a>'), 'homepage has the Open Design secondary action');
assert.ok(src.home.includes('<RouteSelector'), 'homepage uses the shared purpose selector');
assert.equal((src.home.match(/type="radio"/g) || []).length, 0, 'homepage does not inline radio-based decision controls');
assert.ok(!src.home.includes('<fieldset class="choice-group">') && !src.home.includes('<legend>Purpose</legend>') && !src.home.includes('<legend>Status</legend>'), 'homepage does not duplicate Route Finder controls');
assert.doesNotMatch(src.home, /aria-pressed=/, 'homepage does not emulate mutually exclusive radio choices with aria-pressed buttons');
assert.ok(!src.home.includes('home-hero__principles') && src.home.includes('<strong>Route first. No invented facts.</strong>'), 'homepage moves route-first principles into the trust statement');
assert.ok(src.home.includes('trust-statement') && !src.home.includes('trust-band'), 'homepage trust boundary is editorial prose rather than a card wall');
assert.ok(!src.home.includes('button--accent'), 'homepage does not use warning accent styling for primary actions');
assert.ok(src.home.includes('guides.length'), 'homepage guide count is data-driven');
assert.ok(src.home.includes('guideCategories.length'), 'homepage route count is data-driven');

for (const file of ['src/pages/routes/index.astro', 'src/pages/exams/index.astro', 'src/pages/tools/index.astro']) {
  assert.ok(exists(file), `top-level centre page should exist: ${file}`);
}
assert.doesNotMatch(read('src/pages/exams/index.astro'), /Object\.groupBy/, 'exam directory remains compatible with the server Node 20 runtime');
assert.ok(src.tools.includes('site.tools.map'), 'tools centre is data-driven');
assert.ok(src.tool.includes("'@type': 'WebApplication'"), 'real tools emit WebApplication structured data');
assert.ok(read('src/components/tools/ToolShell.astro').includes('data-tool-restart'), 'tools have a restart control');
assert.ok(read('src/components/tools/ToolShell.astro').includes('<ToolStepper current={0}'), 'tool progress starts at Step 1');
assert.ok(!read('src/components/tools/ToolShell.astro').includes('localStorage'), 'tools do not silently persist planning fields in localStorage');
const toolFormController = read('src/scripts/tool-form.ts');
const routeFinderTool = read('src/pages/tools/route-finder.astro');
const toolResultSupport = read('src/components/tools/ToolResultSupport.astro');
assert.ok(toolFormController.includes("setAttribute('aria-invalid', 'true')") && toolFormController.includes("field.removeAttribute('aria-invalid')"), 'tool validation sets and clears field invalid state');
assert.ok(toolFormController.includes("closest('li')?.remove()") && toolFormController.includes('summary.replaceChildren()'), 'corrected fields are also removed from the error summary');
assert.ok(toolFormController.includes('data-error-summary') && toolFormController.includes('failures[0].field.focus()'), 'tool validation renders an error summary and focuses the first invalid field');
assert.ok(toolFormController.includes('aria-describedby') && toolFormController.includes('field.id}-error'), 'tool validation connects stable field errors with aria-describedby');
assert.ok(toolFormController.includes('setStep(1)') && toolFormController.includes('setStep(2)'), 'tool progress moves through input and result states');
assert.ok(toolFormController.includes('new URLSearchParams(location.search)') && toolFormController.includes('history.replaceState'), 'tool state restores from and persists to a shareable URL');
assert.ok(src.css.includes('.tool-error-summary') && src.css.includes('[aria-invalid="true"]'), 'tool errors use text, borders, and background rather than color alone');
for (const toolPage of ['route-finder', 'checklist-generator', 'timeline-calculator', 'exam-comparison', 'email-reminders']) {
  const toolSource = read(`src/pages/tools/${toolPage}.astro`);
  assert.ok(toolSource.includes('novalidate') && toolSource.includes('setupToolForm'), `${toolPage} uses shared accessible client validation`);
  assert.ok(toolSource.includes('controller.persist()') && toolSource.includes('controller.markResult()'), `${toolPage} persists successful URL-backed results and marks Step 3`);
  if (toolPage !== 'route-finder') assert.ok(toolSource.includes('requestSubmit()'), `${toolPage} restores successful URL-backed results automatically`);
}
const comparisonTool = read('src/pages/tools/exam-comparison.astro');
assert.ok(comparisonTool.includes("setAttribute('role', 'region')") && comparisonTool.includes("setAttribute('aria-label', 'Exam comparison table."), 'exam comparison table uses a named region');
assert.ok(comparisonTool.includes('tableWrap.tabIndex = 0') && comparisonTool.includes('Scroll left and right to view all comparison columns.'), 'exam comparison region is keyboard focusable and has a narrow-screen scroll hint');
assert.ok(comparisonTool.includes('sharedCell.colSpan = 2') && comparisonTool.includes('sourcesLabel.textContent = \'Official exam page\''), 'exam comparison shares one verification prompt across both exam columns and routes each exam to its own official page');
assert.ok(!comparisonTool.includes('firstCell.textContent = dimension.value') && !comparisonTool.includes('secondCell.textContent = dimension.value'), 'exam comparison no longer fills both columns with the same dimension value');
assert.ok(src.css.includes('.tool-table-hint { display: block; }') && src.css.includes('overscroll-behavior-inline: contain'), 'comparison table exposes its hint at the mobile breakpoint and contains horizontal scrolling');
assert.ok(routeFinderTool.includes("persistedNames: ['country', 'purpose', 'level', 'certificate']"), 'route-finder restores only route classification fields from the URL');
assert.match(routeFinderTool, /<input\s+name="location"\s+required\b/, 'route-finder keeps application location required for the current page result');
assert.match(routeFinderTool, /<input\s+name="targetDate"\s+type="date"\s+required\b/, 'route-finder keeps target submission date required for the current page result');
assert.doesNotMatch(routeFinderTool, /persistedNames:\s*\[[^\]]*(?:location|targetDate)/s, 'route-finder does not persist location or target date to the URL');
assert.doesNotMatch(routeFinderTool, /restored[\s\S]*requestSubmit\(\)/, 'route-finder does not automatically submit after restoring partial URL state');
assert.ok(toolResultSupport.includes("const { resultId, guideHref = '/guides/', guideLabel = 'Browse route guides' } = Astro.props;"), 'ToolResultSupport defaults to a route-neutral guide handoff');
assert.ok(!toolResultSupport.includes('Germany B1 settlement and citizenship route'), 'ToolResultSupport does not push unrelated Germany route defaults');
assert.ok(routeFinderTool.includes('route.guide?.href'), 'configured route-finder results use the configured route guide link when available');
assert.ok(routeFinderTool.includes('checklistLink.href = toolLinks.checklist'), 'configured route-finder results use the shared Checklist tool link');
assert.ok(routeFinderTool.includes('timelineLink.href = toolLinks.timeline'), 'configured route-finder results use the shared Timeline tool link');
assert.ok(read('src/data/route-tools.ts').includes("availability: 'verify-only'"), 'unsupported routes stop at an official-verification-required state');
assert.ok(read('src/data/route-tools.ts').includes('if (!route) return []'), 'unsupported routes do not generate a pseudo-checklist');
assert.ok(!/value="(21|28|7)"/.test(read('src/pages/tools/timeline-calculator.astro')), 'timeline does not assume default result or retake timing');
assert.ok(!/type="email"|Email address/.test(src.reminder), 'Reminder Planner does not collect email');
assert.ok(src.reminder.includes('Download ICS'), 'Reminder Planner exports an ICS calendar file');
assert.ok(src.reminder.includes('ToolResultSupport'), 'Reminder Planner offers shared copy, print, and export actions');

assert.equal((src.guide.match(/<h1>/g) || []).length, 1, 'ArticleLayout declares one H1');
assert.ok(src.article.includes('<ArticleTOC'), 'ArticleLayout uses one shared TOC');
assert.ok(src.article.indexOf('<slot name="article-header"') < src.article.indexOf('<ArticleTOC') && src.article.indexOf('<ArticleTOC') < src.article.indexOf('<slot />'), 'article DOM order is header, TOC, then body at every viewport');
assert.doesNotMatch(src.css, /\.article-toc\s*\{[^}]*grid-row/s, 'TOC is not visually reordered with grid-row');
assert.ok(src.guide.includes('<ArticleLayout') && src.zhGuide.includes('<ArticleLayout'), 'English and Chinese guides share ArticleLayout');
assert.ok(src.guide.includes('sourceReviewStatus'), 'ArticleLayout distinguishes update and source-review states');
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
for (const sort of ['Recently updated', 'Route relevance', 'Content maturity']) {
  assert.ok(src.filterBar.includes(sort), `guide library includes ${sort} sorting`);
}
for (const status of ['Route structure complete', 'Core route structure', 'Starter overview', 'Verification pending']) {
  assert.ok(src.guides.includes(status), `guide library includes ${status} status`);
}
for (const oldFilterLabel of ['Complete route', 'Core route']) {
  assert.ok(!src.guides.includes(`label: '${oldFilterLabel}'`), `guide library no longer uses ${oldFilterLabel} as a filter label`);
}
const expectedContentStatusLabels = {
  'complete-route': 'Route structure complete',
  'core-route': 'Core route structure',
  'starter-overview': 'Starter overview',
  'verification-pending': 'Verification pending',
};
for (const [status, label] of Object.entries(expectedContentStatusLabels)) {
  assert.ok(src.sourceReview.includes(`'${status}': '${label}'`), `source-review labels ${status} as ${label}`);
}
const expectedChineseStatusLabels = {
  'complete-route': '路线结构完整',
  'core-route': '核心路线结构',
  'starter-overview': '入门概览',
  'verification-pending': '待核验',
};
for (const [status, label] of Object.entries(expectedChineseStatusLabels)) {
  assert.ok(src.guideStatusBadge.includes(`'${status}': '${label}'`), `Chinese status badge labels ${status} as ${label}`);
}
assert.match(read('src/content/guides/german-family-reunion-language-requirement.md'), /^contentStatus: "complete-route"/m, 'Germany A1 content records retain the complete route baseline');
assert.match(read('src/content/guides/germany-b1-citizenship-language-proof.md'), /^contentStatus: "core-route"/m, 'Germany B1 content records retain the core route baseline');
assert.ok(src.guides.includes('resolveGuideContentStatus(guide.data)'), 'guide cards use the shared content-status gate');
assert.ok(src.guide.includes('resolveGuideContentStatus'), 'article headers use the shared content-status gate');
assert.ok(src.guide.includes('showSourceFactTable') && src.guide.includes('sourceReviewStatus === \'reviewed\''), 'source fact tables require reviewed controlled metadata');
assert.ok(src.guide.includes('Who decides this?') && src.guide.includes('Official verification pending.'), 'English guides expose the deciding-authority boundary');
assert.ok(src.zhGuide.includes('谁最终决定？') && src.zhGuide.includes('独立中文来源复核待完成'), 'Chinese guides preserve an explicit pending source boundary');
assert.ok(src.guide.includes("author: { '@type': 'Organization', name: author }") && src.zhGuide.includes("author: { '@type': 'Organization', name: guideRecord.author }"), 'Article JSON-LD authors use a controlled Organization type with the same controlled name, without inventing a Person');
assert.ok(src.guideTaxonomy.includes('starter overview guides'), 'other categories retain starter overview framing');
assert.ok(src.guides.includes('history.replaceState'), 'guide filters persist to URL parameters');
assert.ok(src.guides.includes("params.get('q')") && src.guides.includes('params.get(filter.name)') && src.guides.includes("params.get('sort')"), 'guide filters restore search, facets, and sort from URL parameters');
assert.ok(src.guides.includes('guide-empty-state'), 'guide library has an empty state');
assert.ok(src.guides.includes('Showing ${visible}'), 'guide library reports result count');
assert.ok(src.filterBar.includes('<details class="filter-drawer">') && !src.filterBar.includes('<details class="filter-drawer" open>'), 'advanced filters are closed by default, including narrow viewports');
assert.ok(src.filterBar.includes('More filters') && src.filterBar.includes('quick-filter-bar'), 'Purpose and Country remain quick filters while advanced controls use a disclosure');
assert.ok(src.filterBar.includes('aria-live="polite"') && src.filterBar.includes('data-clear-all'), 'guide filters expose live result feedback and Clear all');
assert.equal((src.guideCard.match(/<a\s/g) || []).length, 1, 'each Guide Card exposes one primary keyboard link');
assert.ok(src.guideCard.includes('Direct answer:') && src.guideCard.includes('Updated <time') && src.guideCard.includes('<LastCheckedBadge'), 'Guide Cards expose direct answer, updated date, and source-review state');
assert.ok(src.css.includes('@media (max-width: 768px)') && src.css.includes('.od-guide-library .filter-drawer > summary { display: flex; }'), 'Guide Library keeps the advanced-filter disclosure available at narrow widths');

const guideSlugSrc = read('src/pages/guides/[slug].astro');
assert.ok(guideSlugSrc.includes("if (sameRoute || sameCountry) return true;") && guideSlugSrc.includes("frontmatter.comparisonScope !== 'same-route' && candidate.data.decisionStage === frontmatter.decisionStage"), 'related-guide filtering gates same-decisionStage cross-country links behind a non-same-route comparison scope');
assert.ok(!guideSlugSrc.includes('sameDecisionStage || sameCountry') && !guideSlugSrc.includes('sameRoute || sameDecisionStage'), 'related-guide filter no longer short-circuits on sameDecisionStage before the comparisonScope gate');

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
  for (const field of ['title', 'description', 'category', 'slug', 'publishedDate', 'updatedDate', 'contentStatus', 'readingTime']) {
    assert.match(source, new RegExp(`^${field}:`, 'm'), `${file} retains ${field}`);
  }
}

console.log('site UI, route, guide, tool, SEO, accessibility, and migration checks passed');
