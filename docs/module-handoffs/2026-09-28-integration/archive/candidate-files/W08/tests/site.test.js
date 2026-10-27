const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { englishPillarSlugs, noindexCategorySlugs } = require('../src/data/publication-manifest.ts');

require('./commercial-pages.test.js');
require('./adsense-risk-exposure.test.js');
require('./germany-a1-cluster.test.js');
require('./fan-42-germany-a1-requirement.test.js');
require('./fan-73-guide-trust.test.js');
require('./fan-75-css-cascade.test.js');
require('./germany-b1-cluster.test.js');
require('./germany-testdaf-cluster.test.js');
require('./p0-five-countries.test.js');
require('./finland-window-b.test.js');
require('./italy-window-b.test.js');
require('./canada-window-b.test.js');
require('./netherlands-window-b.test.js');
require('./telc-window-1.test.js');
require('./telc-fees-centres.test.js');
require('./telc-work-nursing.test.js');
require('./fan-43-germany-b1-recheck.test.js');
require('./content-integrity.test.js');
require('./source-review-render.test.js');
require('./deploy.test.js');
require('./fan-254-dependency-audit.test.js');
require('./fan-270-seo.test.js');
require('./fan-273-404-recovery.test.js');
for (const testFile of [
  'tests/laya-purpose.test.mjs',
  'tests/runtime-features.test.mjs',
  'tests/route-tools.test.js',
  'tests/article-sections-key-decisions.test.mjs',
  'tests/scheme-3-publication.test.mjs',
  'tests/scheme-3-chinese-fail-closed.test.mjs',
  'tests/scheme-3-english-content-quality.test.mjs',
  'tests/scheme-3-chinese-pillars.test.js',
  'tests/scheme-3-chinese-page-sections.test.mjs',
  'tests/scheme-3-tool-content.test.js',
  'tests/scheme-3-route-hubs.test.js',
  'tests/scheme-3-gates.test.js',
  'tests/scheme-3-atomic-merge.test.mjs',
  'tests/scheme-3-content-map.test.mjs',
  'tests/scheme-3-plan-authority.test.js',
  'tests/scheme-3-release-candidate.test.mjs',
  'tests/claim-registry.test.mjs',
  'tests/url-support-inventory.test.mjs',
  'tests/task-2-p0-render.test.js',
  'tests/task-4-home-routes.test.mjs',
  'tests/task-4-guides-render.test.mjs',
  'tests/task-5-source-ledger.test.mjs',
  'tests/m2a-exam-products.test.mjs',
  'tests/m2a-staged-checklist-content.test.mjs',
  'tests/m2a-local-fees-centres.test.mjs',
  'tests/m2a-timeline-contract.test.mjs',
  'tests/m2a-plan-state.test.mjs',
  'tests/m2a-plan-state-integration.test.mjs',
  'tests/m2b-route-finder.test.mjs',
  'tests/m2b-checklist-export.test.mjs',
  'tests/m2b-exam-comparison.test.mjs',
  'tests/m2b-timeline-result.test.mjs',
  'tests/m2b-reminder-ics.test.mjs',
  'tests/m3-chinese-tool-contract.test.mjs',
  'tests/m3-chinese-journey.test.mjs',
  'tests/m3-discovery-trust.test.mjs',
  'tests/m3-generated-seo.test.mjs',
  'tests/m3-migration-map.test.mjs',
  'tests/m4-b1-routes.test.mjs',
  'tests/m4-b1-comparison.test.mjs',
  'tests/m4-study-assets.test.mjs',
  'tests/t27-measurement-privacy.test.mjs',
]) {
  execFileSync(process.execPath, [testFile], { stdio: 'inherit' });
}

const read = (file) => fs.readFileSync(file, 'utf8');
const exists = (file) => fs.existsSync(file);
const src = {
  base: read('src/layouts/BaseLayout.astro'),
  article: read('src/layouts/ArticleLayout.astro'),
  guide: read('src/layouts/GuideLayout.astro'),
  commercialShell: read('src/components/products/CommercialPageShell.astro'),
  zhGuide: read('src/components/ZhGuideLayout.astro'),
  tool: read('src/layouts/ToolLayout.astro'),
  header: read('src/components/GlobalHeader.astro'),
  mobile: read('src/components/MobileNavigation.astro'),
  footer: read('src/components/GlobalFooter.astro'),
  homeHero: read('src/components/HomeHero.astro'),
  css: read('src/styles/global.css'),
  styleArchitecture: read('docs/STYLE_ARCHITECTURE.md'),
  home: read('src/pages/index.astro'),
  zhHome: read('src/pages/zh/index.astro'),
  about: read('src/pages/about.astro'),
  notFound: read('src/pages/404.astro'),
  guides: read('src/pages/guides/index.astro'),
  guideCategory: read('src/pages/guides/category/[category].astro'),
  filterBar: read('src/components/FilterBar.astro'),
  guideCard: read('src/components/GuideCard.astro'),
  guideTaxonomy: read('src/data/guide-taxonomy.ts'),
  guideDiscovery: read('src/data/guide-discovery.ts'),
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
  publicationManifest: read('src/data/publication-manifest.ts'),
  launchCheck: read('scripts/launch-check.js'),
  guideStatusBadge: read('src/components/GuideStatusBadge.astro'),
  navigationCurrent: exists('src/lib/navigation-current.ts') ? read('src/lib/navigation-current.ts') : '',
};

const requiredComponents = [
  'GlobalHeader', 'MobileNavigation', 'Breadcrumbs', 'PageHero', 'HomeHero', 'RouteSelector', 'RouteProgress',
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
const builtFeatures = JSON.parse(read('dist/runtime-features.json'));
assert.ok(src.base.includes('enableAds?: boolean'), 'BaseLayout exposes an enableAds prop');
assert.ok(src.base.includes('enableAds = false'), 'BaseLayout keeps advertising off unless a content page opts in');
assert.equal((src.base.match(/pagead2\.googlesyndication\.com/g) || []).length, 1, 'BaseLayout declares the AdSense host once');
assert.ok(src.base.includes(adsenseLoader), 'BaseLayout loads the configured AdSense publisher script');
assert.match(
  src.base,
  /\{\s*advertisingEnabled\s*&&\s*enableAds\s*&&\s*<script\s+async\s+src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-3018617123550799"\s+crossorigin="anonymous"><\/script>\s*\}/,
  'BaseLayout requires both the runtime advertising switch and publication eligibility',
);
assert.ok(!src.base.includes('static.cloudflareinsights.com'), 'shared layout does not load Cloudflare Web Analytics');
assert.ok(src.tool.includes('enableAds={false}'), 'ToolLayout disables advertising for local planning tools');
assert.ok(src.tools.includes('enableAds={false}'), 'tools index disables advertising');
assert.ok(src.guides.includes('enableAds={false}'), 'searchable guide library index disables advertising');
assert.ok(src.home.includes('enableAds={false}'), 'homepage explicitly remains advertising-free');
assert.ok(src.guide.includes('getEnglishGuidePublicationPolicy') && src.guide.includes('enableAds={advertisingEligible}') && src.guide.includes('noindex={!primaryDiscoveryEligible}'), 'guide advertising and indexing use the manifest publication gate');
assert.ok(src.notFound.includes('enableAds={false}'), '404 page explicitly disables advertising');
assert.ok(src.guideCategory.includes('getCategoryPublicationPolicy') && src.guideCategory.includes('noindex={!indexEligible}') && src.guideCategory.includes('enableAds={false}'), 'guide categories use the manifest noindex policy and remain ad-free');
assert.ok(src.guideCategory.includes('allCategoryGuides') && src.guideCategory.includes('withheldGuideCount') && src.guideCategory.includes('not listed here while'), 'research-only category guides are described accurately without returning them to the Guide Library');
assert.ok(src.launchCheck.includes("manifestStringArray('noindexCategorySlugs')") && src.launchCheck.includes('Exactly 12 manifest categories are noindex'), 'launch check parses and enforces the manifest category closure');
assert.ok(
  src.launchCheck.includes('Only the existing 14 advertising-eligible English pillars load AdSense.')
    && src.launchCheck.includes('Advertising is off: zero generated pages load AdSense.')
    && src.launchCheck.includes('Sitemap membership exactly matches rendered indexability.'),
  'launch check enforces the manifest advertising allowlist separately from sitemap indexability',
);
assert.ok(src.publicationManifest.includes('getEnglishGuidePublicationPolicy') && src.publicationManifest.includes('getCategoryPublicationPolicy'), 'one publication manifest controls guide and category release policy');
assert.equal(src.adsTxt, 'google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0\n', 'ads.txt declares the approved direct Google seller');
assert.ok(src.privacy.includes('How VisaLang handles visitor data, advertising choices, shared tool state, browser storage, URL cleanup, and server logs.'), 'privacy policy description covers advertising and shared-plan storage');
for (const text of ['Google AdSense loader', 'Google Privacy &amp; messaging/CMP', 'Google Analytics, Cloudflare Web Analytics', 't27.v1', 'Google Ads Settings', 'Shared tool plan:', 'Save on this device for 30 days', 'Legacy URL cleanup']) {
  assert.ok(src.privacy.includes(text), `privacy policy includes ${text}`);
}
for (const text of ['Google AdSense loader', 'Google Privacy &amp; messaging/CMP', 'Google Analytics, Cloudflare Web Analytics', 't27.v1', 'Shared tool plan:', 'Optional 30-day device copy:', 'Route progress:', 'current route step in browser local storage', 'Legacy URL query cleanup']) {
  assert.ok(src.cookies.includes(text), `cookie policy includes ${text}`);
}
assert.ok(!src.headers.includes('Content-Security-Policy:'), 'headers leaves CSP to Google-managed advertising requirements');
for (const header of ['X-Content-Type-Options:', 'X-Frame-Options:', 'Referrer-Policy:', 'Permissions-Policy:', 'Strict-Transport-Security:']) {
  assert.ok(src.headers.includes(header), `headers retains ${header}`);
}

for (const page of ['dist/guides/german-family-reunion-language-requirement/index.html']) {
  assert.equal(read(page).includes(adsenseLoader), builtFeatures.advertising === 'on', `ad-eligible generated page follows the runtime advertising mode: ${page}`);
}
for (const page of [
  'dist/index.html',
  'dist/tools/index.html',
  'dist/tools/route-finder/index.html',
  'dist/tools/checklist-generator/index.html',
  'dist/tools/timeline-calculator/index.html',
  'dist/tools/exam-comparison/index.html',
  'dist/tools/email-reminders/index.html',
  'dist/guides/index.html',
  'dist/404.html',
  'dist/guides/cils-b1-cittadinanza-for-italian-citizenship/index.html',
  'dist/guides/testdaf-germany-university-admissions/index.html',
  'dist/guides/category/italy/index.html',
  'dist/guides/category/germany-testdaf/index.html',
]) {
  assert.ok(!read(page).includes('pagead2.googlesyndication.com'), `advertising-free generated page excludes AdSense: ${page}`);
}
assert.match(read('dist/guides/cils-b1-cittadinanza-for-italian-citizenship/index.html'), /<meta name="robots" content="noindex,follow">/, 'pending guide is withheld from indexing');
assert.doesNotMatch(read('dist/guides/german-family-reunion-language-requirement/index.html'), /<meta name="robots" content="noindex,follow">/, 'reviewed complete guide remains indexable');
const qualityGatedGuideIndex = read('dist/guides/index.html');
assert.ok(qualityGatedGuideIndex.includes('Goethe A1 test centers: verify an official exam centre'), 'guide library retains a reviewed complete guide');
assert.ok(!qualityGatedGuideIndex.includes('CILS B1 Cittadinanza for Italian Citizenship'), 'guide library withholds a pending guide');
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
assert.ok(viewportBreakpoints.length > 0 && viewportBreakpoints.every((width) => [375, 480, 768, 1024].includes(width)), 'active viewport media queries use only the approved breakpoint set, including the verified single-column filter threshold');
assert.ok(src.css.includes('@media (max-width: 375px)'), 'design system defines the 375px compact layout');
assert.ok(src.css.includes('min-height: 44px'), 'interactive controls use a reasonable hit area');
assert.ok(src.css.includes('overflow-x: auto'), 'wide tables and tool navigation can scroll safely');

assert.ok(src.home.includes('Start with your application route, understand the evidence you may need, and organise your next steps before booking an exam.'), 'homepage opens with the approved route-first planning task');
assert.ok(src.home.includes('<HomeHero') && src.zhHome.includes('<HomeHero'), 'English and Chinese homepages share the HomeHero composition');
assert.ok(src.homeHero.includes("import { Picture } from 'astro:assets'") && src.homeHero.includes("formats={['avif', 'webp']}") && src.homeHero.includes('fetchpriority="high"'), 'HomeHero uses responsive high-priority Astro image output');
assert.ok(src.base.includes('rel="preload"') && src.base.includes('imagesrcset={heroPreloadSrcset}') && src.base.includes('type="image/avif"'), 'BaseLayout preloads the responsive AVIF candidate selected for the home hero');
assert.ok(exists('src/assets/home-route-verification.png'), 'homepage visual source is a local managed asset');
assert.ok(src.homeHero.includes('home-route-spotlight') && !src.home.includes('route-entry') && !src.home.includes('route-console'), 'featured route uses a dedicated editorial strip instead of the old card or console');
assert.ok(src.home.includes("label: 'Start the Germany A1 route'") && src.home.includes("label: 'Read Germany B1 guides'"), 'homepage hero labels match the approved configured-route and guide-only destinations');
assert.ok(src.home.includes('<RouteSelector'), 'homepage uses the shared purpose selector');
assert.ok(src.zhHome.includes('<RouteSelector locale="zh-CN"') && src.zhHome.includes('bodyClass="home-view"'), 'Chinese homepage shares the route selector and home design scope');
assert.ok(src.zhHome.includes('publishedCategoryCount') && !src.zhHome.includes('guideCategories.length'), 'Chinese homepage reports only dynamically published route categories');
assert.ok(src.zhHome.includes('<GuideStatusBadge status={zhUpdated[0].contentStatus} locale="zh-CN"'), 'Chinese homepage localizes its guide status badge');
assert.ok(src.home.includes('heroPreload={homeRouteVisual}') && src.zhHome.includes('heroPreload={homeRouteVisual}'), 'both homepages preload the same managed hero asset used by HomeHero');
assert.ok(src.home.includes('latest-layout') && src.zhHome.includes('latest-layout'), 'both homepages use the one-feature plus compact-list update layout');
assert.equal((src.home.match(/type="radio"/g) || []).length, 0, 'homepage does not inline radio-based decision controls');
assert.ok(!src.home.includes('<fieldset class="choice-group">') && !src.home.includes('<legend>Purpose</legend>') && !src.home.includes('<legend>Status</legend>'), 'homepage does not duplicate Route Finder controls');
assert.doesNotMatch(src.home, /aria-pressed=/, 'homepage does not emulate mutually exclusive radio choices with aria-pressed buttons');
assert.ok(!src.home.includes('home-hero__principles') && src.home.includes('<strong>Route first. No invented facts.</strong>'), 'homepage moves route-first principles into the trust statement');
assert.ok(src.home.includes('trust-statement') && !src.home.includes('trust-band'), 'homepage trust boundary is editorial prose rather than a card wall');
assert.ok(!src.home.includes('button--accent'), 'homepage does not use warning accent styling for primary actions');
assert.ok(src.home.includes('publishedGuides.length'), 'homepage guide count follows the primary-discovery scope');
assert.ok(src.home.includes('publishedCategoryCount'), 'homepage category count follows the primary-discovery scope');
assert.ok(src.css.includes('--font-display: var(--font-sans)') && src.css.includes('background: var(--od-surface);\n  color: var(--od-copy);'), 'shared typography and footer stay in the page theme');
assert.ok(src.about.includes('publishedEnglishGuides') && src.about.includes('What you can use now') && src.about.includes('Research coverage'), 'About explains available and research-only coverage in reader-facing terms');
assert.doesNotMatch(src.about, /metadata checks|primary discovery|AdSense approval|verification-pending/i, 'About does not expose internal publication workflow language');
assert.ok(!src.siteData.includes("href: '/guides/testdaf-germany-university-admissions/'") && !src.siteData.includes("href: '/guides/telc-b1-b2-germany-work-nursing/'"), 'primary route navigation does not promote withheld guides');

for (const file of ['src/pages/routes/index.astro', 'src/pages/exams/index.astro', 'src/pages/tools/index.astro']) {
  assert.ok(exists(file), `top-level centre page should exist: ${file}`);
}
assert.doesNotMatch(read('src/pages/exams/index.astro'), /Object\.groupBy/, 'exam directory remains compatible with the server Node 20 runtime');
assert.ok(src.tools.includes('site.tools.map'), 'tools centre is data-driven');
assert.ok(src.tool.includes("'@type': 'WebApplication'"), 'real tools emit WebApplication structured data');
assert.ok(read('src/components/tools/ToolShell.astro').includes('data-tool-restart'), 'tools have a restart control');
assert.ok(read('src/components/tools/ToolShell.astro').includes('<ToolStepper current={0}'), 'tool progress starts at Step 1');
assert.ok(!read('src/components/tools/ToolShell.astro').includes('localStorage'), 'tools do not silently persist planning fields in localStorage');
assert.ok(read('src/components/tools/ToolShell.astro').includes('data-plan-save-device') && read('src/components/tools/ToolShell.astro').includes('data-plan-clear'), 'tools expose explicit 30-day save and shared-plan clear controls');
const toolFormController = read('src/scripts/tool-form.ts');
const sharedPlanController = read('src/scripts/plan-state.ts');
const sharedPlanModel = read('src/data/plan-state.ts');
const routeFinderTool = read('src/pages/tools/route-finder.astro');
const toolResultSupport = read('src/components/tools/ToolResultSupport.astro');
assert.ok(toolFormController.includes("setAttribute('aria-invalid', 'true')") && toolFormController.includes("field.removeAttribute('aria-invalid')"), 'tool validation sets and clears field invalid state');
assert.ok(toolFormController.includes("closest('li')?.remove()") && toolFormController.includes('summary.replaceChildren()'), 'corrected fields are also removed from the error summary');
assert.ok(toolFormController.includes('data-error-summary') && toolFormController.includes('failures[0].field.focus()'), 'tool validation renders an error summary and focuses the first invalid field');
assert.ok(toolFormController.includes('aria-describedby') && toolFormController.includes('field.id}-error'), 'tool validation connects stable field errors with aria-describedby');
assert.ok(toolFormController.includes('setStep(1)') && toolFormController.includes('setStep(2)'), 'tool progress moves through input and result states');
assert.doesNotMatch(toolFormController, /URLSearchParams|location\.search|history\.replaceState|sessionStorage|localStorage/, 'tool form controller contains no persistence transport');
assert.ok(sharedPlanController.includes('sessionStorage') && sharedPlanController.includes('data-plan-save-device') && sharedPlanController.includes('localStorage'), 'shared plan uses session storage by default and local storage only through the explicit device-save control');
assert.ok(sharedPlanModel.includes('schemaVersion') && sharedPlanModel.includes('applicationRegionId') && sharedPlanModel.includes('claimVersions'), 'shared plan has versioned route, region, and claim fields');
assert.ok(src.css.includes('.tool-error-summary') && src.css.includes('[aria-invalid="true"]'), 'tool errors use text, borders, and background rather than color alone');
for (const toolPage of ['route-finder', 'checklist-generator', 'timeline-calculator', 'exam-comparison', 'email-reminders']) {
  const toolSource = read(`src/pages/tools/${toolPage}.astro`);
  assert.ok(toolSource.includes('novalidate') && toolSource.includes('setupToolForm'), `${toolPage} uses shared accessible client validation`);
  assert.ok(toolSource.includes('setupSharedPlan') && toolSource.includes('plan.persist(') && toolSource.includes('controller.markResult()'), `${toolPage} persists a schema-approved session patch and marks Step 3`);
  assert.doesNotMatch(toolSource, /persistedNames|controller\.persist\(|requestSubmit\(\)/, `${toolPage} does not persist or auto-submit a result through the URL`);
}
const comparisonTool = read('src/pages/tools/exam-comparison.astro');
assert.ok(
  comparisonTool.includes("setAttribute('role', 'region')")
    && comparisonTool.includes("isZh ? '考试比较表，可横向滚动查看全部列。' : 'Exam comparison table. Scroll horizontally to view all columns.'"),
  'exam comparison table uses a locale-aware named region',
);
assert.ok(comparisonTool.includes('tableWrap.tabIndex = 0') && comparisonTool.includes('Scroll left and right to view all comparison columns.'), 'exam comparison region is keyboard focusable and has a narrow-screen scroll hint');
assert.ok(comparisonTool.includes('compareExamProducts') && comparisonTool.includes('fact.firstValue') && comparisonTool.includes('fact.secondValue'), 'exam comparison renders independently sourced product facts in both columns');
assert.ok(!comparisonTool.includes('sharedCell.colSpan = 2') && comparisonTool.includes("sourcesLabel.textContent = isZh ? '官方考试产品页' : 'Official exam page'"), 'exam comparison no longer substitutes one shared reminder for two product values and localizes the source-row label');
assert.ok(!comparisonTool.includes('firstCell.textContent = dimension.value') && !comparisonTool.includes('secondCell.textContent = dimension.value'), 'exam comparison no longer fills both columns with the same dimension value');
assert.ok(src.css.includes('.tool-table-hint { display: block; }') && src.css.includes('overscroll-behavior-inline: contain'), 'comparison table exposes its hint at the mobile breakpoint and contains horizontal scrolling');
assert.match(routeFinderTool, /<select\s+name="applicationRegionId"/, 'route-finder keeps the bounded application-region field available for relevant routes');
assert.doesNotMatch(routeFinderTool, /<input\s+name="location"/, 'route-finder no longer accepts application location as free text');
assert.match(routeFinderTool, /<select\s+name="relationship"/, 'route-finder keeps the bounded relationship category available for relevant routes');
assert.ok(
  routeFinderTool.includes('getRouteFinderQuestionRelevance')
    && routeFinderTool.includes('field.required = isRelevant')
    && routeFinderTool.includes('field.disabled = !isRelevant')
    && routeFinderTool.includes('label.hidden = !isRelevant'),
  'route-finder conditionally shows, enables, and requires only follow-up questions relevant to the selected route',
);
assert.doesNotMatch(routeFinderTool, /name="(?:level|targetDate)"/, 'route-finder leaves language level and target date to exam or timeline planning');
assert.doesNotMatch(routeFinderTool, /requestSubmit\(\)/, 'route-finder does not automatically submit after restoring shared state');
assert.ok(
  toolResultSupport.includes("const { resultId, locale = 'en' } = Astro.props;")
    && toolResultSupport.includes("guideHref = locale === 'zh-CN' ? '/zh/' : '/guides/'")
    && toolResultSupport.includes('guideLabel = copy.browseGuides')
    && toolResultSupport.includes('getToolLinks(locale)'),
  'ToolResultSupport derives a route-neutral guide handoff and continuation links from the selected locale',
);
assert.ok(!toolResultSupport.includes('Germany B1 settlement and citizenship route'), 'ToolResultSupport does not push unrelated Germany route defaults');
assert.ok(
  read('src/data/route-tools.ts').includes('guide: route.guide') && routeFinderTool.includes('result.guide?.href'),
  'configured route-finder results carry the configured route guide through the resolver to the rendered result',
);
assert.ok(routeFinderTool.includes('checklistLink.href = toolLinks.checklist'), 'configured route-finder results use the shared Checklist tool link');
assert.ok(routeFinderTool.includes('timelineLink.href = toolLinks.timeline'), 'configured route-finder results use the shared Timeline tool link');
assert.ok(read('src/data/route-tools.ts').includes("availability: 'verify-only'"), 'unsupported routes stop at an official-verification-required state');
assert.ok(read('src/data/route-tools.ts').includes("status: 'unsupported'") && read('src/data/route-tools.ts').includes('No route-specific checklist is configured'), 'unsupported routes do not generate a pseudo-checklist');
assert.ok(!/value="(21|28|7)"/.test(read('src/pages/tools/timeline-calculator.astro')), 'timeline does not assume default result or retake timing');
assert.ok(!/type="email"|Email address/.test(src.reminder), 'Reminder Planner does not collect email');
assert.ok(
  src.reminder.includes('data-download-ics')
    && src.reminder.includes('{copy.text.download}')
    && read('src/data/tool-copy.ts').includes("download: 'Download ICS'"),
  'Reminder Planner exposes the localized ICS download control',
);
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

for (const filter of ['purpose', 'stage', 'language']) {
  assert.ok(src.guideTaxonomy.includes(`name: '${filter}'`), `guide discovery taxonomy includes ${filter} filter`);
}
for (const retiredFilter of ['country', 'route', 'exam', 'level', 'status']) {
  assert.ok(!src.guideTaxonomy.includes(`name: '${retiredFilter}'`), `guide discovery taxonomy omits the retired ${retiredFilter} filter`);
}
for (const sort of ['Recently updated', 'Route relevance']) {
  assert.ok(src.filterBar.includes(sort), `guide library includes ${sort} sorting`);
}
assert.ok(!src.filterBar.includes('Content maturity'), 'guide sorting does not expose internal maturity state');
const expectedContentStatusLabels = {
  'complete-route': 'Coverage: complete route guide',
  'core-route': 'Coverage: core route guide',
  'starter-overview': 'Coverage: orientation guide',
  'verification-pending': 'Verification pending',
};
for (const [status, label] of Object.entries(expectedContentStatusLabels)) {
  assert.ok(src.sourceReview.includes(`'${status}': '${label}'`), `source-review labels ${status} as ${label}`);
}
const expectedChineseStatusLabels = {
  'complete-route': '覆盖范围：完整路线指南',
  'core-route': '覆盖范围：核心路线指南',
  'starter-overview': '覆盖范围：入门指南',
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
assert.ok(src.guideTaxonomy.includes('listed in the main library only after their official sources and distinct reader task have been checked'), 'other categories explain the reader-facing availability boundary');
assert.ok(src.guides.includes('history.replaceState'), 'guide filters persist to URL parameters');
assert.ok(src.guides.includes('parseGuideDiscoveryState(location.search)') && src.guides.includes('serializeGuideDiscoveryState(state)'), 'guide filters restore and serialize controlled URL state');
assert.ok(src.guideDiscovery.includes("params.get('q')") && src.guideDiscovery.includes("params.get('purpose')") && src.guideDiscovery.includes("params.get('stage')") && src.guideDiscovery.includes("params.get('language')"), 'guide URL state is limited to search, Purpose, Stage, and Language');
assert.ok(src.guides.includes('guide-empty-state'), 'guide library has an empty state');
assert.ok(src.guideDiscovery.includes('Showing ${visible}') && src.guides.includes('summarizeGuideDiscoveryResults'), 'guide library reports result count through its shared behavior');
assert.ok(!src.filterBar.includes('More filters') && !src.filterBar.includes('filter-drawer'), 'the three public facets do not hide behind an unnecessary advanced-filter drawer');
assert.ok(src.filterBar.includes('aria-live="polite"') && src.filterBar.includes('data-clear-all'), 'guide filters expose live result feedback and Clear all');
assert.equal((src.guideCard.match(/<a\s/g) || []).length, 1, 'each Guide Card exposes one primary keyboard link');
assert.ok(src.guideCard.includes('Guide summary:') && src.guideCard.includes('Updated <time') && src.guideCard.includes('<LastCheckedBadge'), 'Guide Cards expose a summary, updated date, and source-review state');
assert.ok(src.css.includes('@media (max-width: 768px)') && src.css.includes('.od-guide-library .quick-filter-bar'), 'Guide Library retains a responsive layout for its public controls');

const guideSlugSrc = read('src/pages/guides/[slug].astro');
assert.ok(guideSlugSrc.includes("if (sameRoute || sameCountry) return true;") && guideSlugSrc.includes("frontmatter.comparisonScope !== 'same-route' && candidate.data.decisionStage === frontmatter.decisionStage"), 'related-guide filtering gates same-decisionStage cross-country links behind a non-same-route comparison scope');
assert.ok(!guideSlugSrc.includes('sameDecisionStage || sameCountry') && !guideSlugSrc.includes('sameRoute || sameDecisionStage'), 'related-guide filter no longer short-circuits on sameDecisionStage before the comparisonScope gate');

const routeSteps = [
  'Confirm whether A1 applies', 'Compare exam options', 'Verify centre and booking',
  'Confirm the local fee', 'Build the timeline', 'Prepare and recheck documents', 'Use the 30-day study system',
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
assert.ok(src.redirects.includes('/guides/yki-vs-other-finland-options/ /guides/yki-finnish-citizenship/ 301'), 'the retired Finland comparison URL redirects to the consolidated guide');
assert.ok(src.redirects.includes('/guides/yki-vs-other-finland-options.html /guides/yki-finnish-citizenship/ 301'), 'the retired Finland legacy HTML URL redirects directly to the consolidated guide');
assert.ok(exists('src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md'), 'correct Dutch source slug exists');
assert.ok(exists('src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md'), 'correct Portuguese source slug exists');
assert.ok(!exists('src/content/guides/yki-vs-other-finland-options.md'), 'the duplicate Finland guide source is retired');

const contentFiles = fs.readdirSync('src/content/guides').filter((file) => file.endsWith('.md'));
assert.equal(contentFiles.length, 53, 'guide collection reflects Scheme 3 consolidation plus the two authority-reviewed Master Package restorations');
assert.equal(englishPillarSlugs.length, 15, 'the publication manifest retains exactly 15 English pillars');
assert.equal(noindexCategorySlugs.length, 12, 'the publication manifest retains exactly 12 closed categories');
for (const file of contentFiles) {
  const source = read(path.join('src/content/guides', file));
  for (const field of ['title', 'description', 'category', 'slug', 'publishedDate', 'updatedDate', 'contentStatus', 'readingTime']) {
    assert.match(source, new RegExp(`^${field}:`, 'm'), `${file} retains ${field}`);
  }
}

execFileSync(process.execPath, ['tests/retained-routes.test.mjs', '--built'], { stdio: 'inherit' });
console.log('site UI, route, guide, tool, SEO, accessibility, and migration checks passed');
execFileSync(process.execPath, ['tests/planning-map-governance.test.mjs'], { stdio: 'inherit' });
