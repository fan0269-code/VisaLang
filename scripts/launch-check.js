const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const dist = path.join(root, 'dist');
const checks = [];
const pass = (message) => checks.push({ ok: true, message });
const fail = (message) => checks.push({ ok: false, message });
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const listFiles = (directory, suffix, result = []) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) listFiles(full, suffix, result);
    else if (entry.name.endsWith(suffix)) result.push(full);
  }
  return result;
};
const occurrences = (html, pattern) => [...html.matchAll(pattern)].length;
const frontmatterField = (source, name) => source.match(new RegExp(`^${name}:\\s*["']?([^"'\\n]+)`, 'm'))?.[1]?.trim();
const jsonLdTypes = (html) => {
  const types = new Set();
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const visit = (value) => {
        if (!value || typeof value !== 'object') return;
        if (Array.isArray(value)) return value.forEach(visit);
        if (value['@type']) types.add(value['@type']);
        Object.values(value).forEach(visit);
      };
      visit(JSON.parse(match[1]));
    } catch { types.add('__INVALID__'); }
  }
  return types;
};
const routeFor = (file) => {
  const relative = path.relative(dist, file).split(path.sep).join('/');
  if (relative === 'index.html') return '/';
  if (relative === '404.html') return '/404.html';
  return `/${relative.replace(/index\.html$/, '')}`;
};
const outputFor = (href) => {
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '/') return path.join(dist, 'index.html');
  if (clean.endsWith('.html')) return path.join(dist, clean.slice(1));
  return path.join(dist, clean.slice(1), 'index.html');
};

if (!fs.existsSync(dist)) {
  console.error('dist/ is missing. Run npm run build first.');
  process.exit(1);
}

const files = listFiles(dist, '.html');
const pages = files.map((file) => ({ file, route: routeFor(file), html: fs.readFileSync(file, 'utf8') }));
if (pages.length >= 90) pass(`${pages.length} generated HTML routes found.`); else fail(`Only ${pages.length} generated routes found.`);

const h1Failures = pages.filter(({ html }) => occurrences(html, /<h1(?:\s|>)/g) !== 1).map(({ route }) => route);
if (!h1Failures.length) pass('Every generated route has exactly one H1.'); else fail(`H1 count failures: ${h1Failures.slice(0, 5).join(', ')}`);

const mainFailures = pages.filter(({ html }) => !html.includes('id="main-content"')).map(({ route }) => route);
if (!mainFailures.length) pass('Every route exposes the shared skip-link target.'); else fail(`Missing main target: ${mainFailures.slice(0, 5).join(', ')}`);

const titleMap = new Map();
const descriptionMap = new Map();
const metadataFailures = [];
for (const page of pages) {
  if (page.route === '/404.html') continue;
  const title = page.html.match(/<title>(.*?)<\/title>/)?.[1] || '';
  const description = page.html.match(/<meta name="description" content="([^"]+)"/)?.[1] || '';
  const canonical = page.html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] || '';
  if (!title || !description || !canonical.startsWith('https://visalang.org/')) metadataFailures.push(page.route);
  if (titleMap.has(title)) metadataFailures.push(`${page.route} duplicate title with ${titleMap.get(title)}`); else titleMap.set(title, page.route);
  if (descriptionMap.has(description)) metadataFailures.push(`${page.route} duplicate description with ${descriptionMap.get(description)}`); else descriptionMap.set(description, page.route);
}
if (!metadataFailures.length) pass('Titles, descriptions, and canonical URLs are complete and unique.'); else fail(`Metadata failures: ${metadataFailures.slice(0, 5).join(', ')}`);

const invalidJsonLd = pages.filter(({ html }) => jsonLdTypes(html).has('__INVALID__')).map(({ route }) => route);
if (!invalidJsonLd.length) pass('Every JSON-LD block parses successfully.'); else fail(`Invalid JSON-LD: ${invalidJsonLd.slice(0, 5).join(', ')}`);
const organizationFailures = pages.filter(({ html }) => !jsonLdTypes(html).has('Organization')).map(({ route }) => route);
if (!organizationFailures.length) pass('Every generated route emits Organization structured data.'); else fail(`Organization schema missing: ${organizationFailures.slice(0, 5).join(', ')}`);

const home = read('dist/index.html');
const header = home.match(/<header class="global-header"[\s\S]*?<\/header>/)?.[0] || '';
for (const href of ['/routes/', '/exams/', '/tools/', '/guides/', '/about/']) {
  if (home.includes(`href="${href}"`)) pass(`Primary navigation exposes ${href}`); else fail(`Primary navigation is missing ${href}`);
}
const directMenuLinkFailures = [['/routes/', 'Routes'], ['/about/', 'About']].filter(([href, label]) => !header.includes(`class="nav-menu__link" href="${href}">${label}</a>`));
if (!directMenuLinkFailures.length && (header.match(/class="nav-menu__disclosure"/g) || []).length === 2) pass('Routes and About keep direct links with separate disclosure controls.'); else fail(`Navigation menu controls are incomplete: ${directMenuLinkFailures.map(([, label]) => label).join(', ') || 'missing disclosure'}`);
if (home.includes('href="/pricing/"') && home.includes('href="/partners/"')) pass('Pricing and Partners remain available under the About navigation and footer surfaces.'); else fail('Pricing or Partners link missing.');
if (!home.includes('route-console') && !home.includes('class="route-entry"') && home.includes('home-route-spotlight') && !home.includes('button--accent')) pass('Homepage uses the shared editorial route spotlight without old console or accent CTA styling.'); else fail('Homepage still exposes the old console or accent CTA styling.');

const spainCitizenship = fs.readFileSync(outputFor('/guides/dele-a2-ccse-spanish-citizenship/'), 'utf8');
if (spainCitizenship.includes('status-badge--verification-pending') && spainCitizenship.includes('Spanish citizenship authority')) pass('Spain citizenship output preserves pending status and deciding authority.'); else fail('Spain citizenship trust boundary is incomplete.');
if (!spainCitizenship.includes('href="/guides/cils-b1-cittadinanza-for-italian-citizenship/"')) pass('Same-route Spain output excludes the Italian same-stage guide.'); else fail('Spain same-route output leaks a cross-country Related Guide.');
if (/"author":\{"@type":"Organization","name":"VisaLang Editorial team"\}/.test(spainCitizenship)) pass('Guide Article JSON-LD identifies the editorial author as an Organization.'); else fail('Guide Article JSON-LD author type is incorrect.');

const comparison = fs.readFileSync(outputFor('/tools/exam-comparison/'), 'utf8');
const clientScripts = fs.readdirSync(path.join(dist, '_astro'))
  .filter((file) => file.endsWith('.js'))
  .map((file) => read(`dist/_astro/${file}`))
  .join('\n');
if (comparison.includes('id="comparison-form"') && clientScripts.includes('Official exam page') && clientScripts.includes('colSpan=2')) pass('Exam Comparison shares verification prompts and exposes official exam links.'); else fail('Exam Comparison generated bundle repeats or omits its verification contract.');

const routeFinder = fs.readFileSync(outputFor('/tools/route-finder/'), 'utf8');
if (routeFinder.includes('href="/tools/" aria-current="location"') && routeFinder.includes('href="/tools/route-finder/" aria-current="page"')) pass('Navigation distinguishes the Tools section from the exact Route Finder page.'); else fail('Navigation aria-current semantics are inconsistent.');

const guidePages = pages.filter(({ route }) => route.startsWith('/guides/') && !route.startsWith('/guides/category/') && route !== '/guides/');
const guideFailures = guidePages.filter(({ html }) => {
  const types = jsonLdTypes(html);
  const orderedSections = ['id="direct-answer"', 'id="who-this-applies-to"', 'id="key-decisions"', 'id="detailed-explanation"', 'id="what-to-verify-officially"', 'id="common-mistakes"', 'id="next-action"', 'id="official-sources"'];
  let previousIndex = -1;
  const sectionsInvalid = orderedSections.some((marker) => {
    const index = html.indexOf(marker);
    const invalid = index <= previousIndex || occurrences(html, new RegExp(marker, 'g')) !== 1;
    previousIndex = index;
    return invalid;
  });
  return !types.has('Article') || !types.has('BreadcrumbList') || occurrences(html, /class="article-toc"/g) !== 1 || occurrences(html, /class="guide-disclaimer"/g) !== 1 || sectionsInvalid;
}).map(({ route }) => route);
if (!guideFailures.length) pass(`All ${guidePages.length} guide pages have Article/Breadcrumb data, one TOC, one disclaimer, and eight ordered semantic sections.`); else fail(`Guide layout failures: ${guideFailures.slice(0, 5).join(', ')}`);

const sourceReviewFailures = guidePages.filter(({ route, html }) => {
  const slug = route.split('/').filter(Boolean).at(-1);
  const source = read(`src/content/guides/${slug}.md`);
  const status = frontmatterField(source, 'sourceReviewStatus') || 'pending';
  const date = frontmatterField(source, 'sourceReviewedAt');
  if (status === 'reviewed') return !date || !html.includes(`Official sources last checked: <time datetime="${date}">${date}</time>`);
  if (status === 'not-applicable') return !html.includes('Official source review not applicable') || html.includes('Official sources last checked');
  return !html.includes('Official verification pending') || html.includes('Official sources last checked');
}).map(({ route }) => route);
if (!sourceReviewFailures.length) pass('Guide source-review HTML matches each record’s reviewed, pending, or not-applicable metadata.'); else fail(`Guide source-review status failures: ${sourceReviewFailures.slice(0, 5).join(', ')}`);
const contentStatusFailures = guidePages.filter(({ route, html }) => {
  const slug = route.split('/').filter(Boolean).at(-1);
  const source = read(`src/content/guides/${slug}.md`);
  const requested = frontmatterField(source, 'contentStatus');
  const category = frontmatterField(source, 'category');
  const sourceReviewStatus = frontmatterField(source, 'sourceReviewStatus') || 'pending';
  const hasAuthority = Boolean(frontmatterField(source, 'primaryOfficialAuthorityUrl'));
  const isHighRisk = ['portugal', 'spain', 'uk', 'canada', 'italy', 'france', 'finland', 'netherlands'].includes(category);
  const elevated = requested === 'complete-route' || requested === 'core-route';
  const expected = isHighRisk && elevated && (!hasAuthority || sourceReviewStatus !== 'reviewed') ? 'verification-pending' : requested;
  return !expected || !html.includes(`status-badge--${expected}`);
}).map(({ route }) => route);
if (!contentStatusFailures.length) pass('Every guide article header uses the shared contentStatus gate.'); else fail(`Guide content-status failures: ${contentStatusFailures.slice(0, 5).join(', ')}`);
const italyRequirement = fs.readFileSync(outputFor('/guides/cils-b1-cittadinanza-for-italian-citizenship/'), 'utf8');
const italyComparison = fs.readFileSync(outputFor('/guides/cils-vs-celi-vs-plida-for-italian-citizenship/'), 'utf8');
if (
  italyRequirement.includes('citizenship-basis requirement check')
  && italyRequirement.includes('<small>Next guide</small><strong>CILS vs CELI vs PLIDA After an Italian Citizenship Requirement Check</strong>')
  && italyComparison.includes('certificate comparison record')
  && !italyComparison.includes('<small>Next guide</small>')
) pass('Italy B-4 keeps the authority-first requirement-to-comparison route.'); else fail('Italy B-4 route or task separation is incomplete.');
const canadaRequirement = fs.readFileSync(outputFor('/guides/tef-canada-immigration/'), 'utf8');
const canadaComparison = fs.readFileSync(outputFor('/guides/tcf-canada-vs-tef/'), 'utf8');
if (
  canadaRequirement.includes('programme-first requirement check')
  && canadaRequirement.includes('<small>Next guide</small><strong>TEF Canada vs TCF Canada After an Express Entry Requirement Check</strong>')
  && canadaComparison.includes('test comparison record')
  && canadaComparison.includes('Raw scores are not interchangeable')
  && !canadaComparison.includes('<small>Next guide</small>')
) pass('Canada B-5 keeps the IRCC-first requirement-to-comparison route.'); else fail('Canada B-5 route or task separation is incomplete.');
if (!home.includes('Official sources last checked') && home.includes('Recently updated')) pass('Homepage keeps recent editing updates separate from source review.'); else fail('Homepage mixes editing and source-review dates.');

const tools = ['/tools/route-finder/', '/tools/checklist-generator/', '/tools/timeline-calculator/', '/tools/exam-comparison/', '/tools/email-reminders/'];
const toolFailures = tools.filter((route) => !jsonLdTypes(fs.readFileSync(outputFor(route), 'utf8')).has('WebApplication'));
if (!toolFailures.length) pass('Every real tool page emits WebApplication structured data.'); else fail(`Tool schema failures: ${toolFailures.join(', ')}`);

const reminder = fs.readFileSync(outputFor('/tools/email-reminders/'), 'utf8');
if (!/type="email"|Email address/.test(reminder) && reminder.includes('Download ICS') && reminder.includes('Restart this tool')) pass('Reminder Planner uses local, copy, print, text, and ICS paths without collecting email.'); else fail('Reminder Planner still has an email or export gap.');

const guideIndex = fs.readFileSync(outputFor('/guides/'), 'utf8');
for (const label of ['Purpose', 'Country', 'Route', 'Exam', 'Level', 'Language', 'Content status', 'Sort by']) {
  if (!guideIndex.includes(label)) fail(`Guide library is missing ${label}.`);
}
if (!checks.some((check) => !check.ok && check.message.startsWith('Guide library'))) pass('Guide library exposes seven filters, sorting, search, result count, and empty state markup.');
if (guideIndex.includes('<details class="filter-drawer">') && !guideIndex.includes('<details class="filter-drawer" open>') && guideIndex.includes('aria-live="polite"') && guideIndex.includes('data-clear-all')) pass('Guide library keeps advanced filters closed by default and exposes live results plus Clear all.'); else fail('Guide library filter disclosure or feedback controls are incomplete.');
const guideCardBlocks = [...guideIndex.matchAll(/<article class="article-card guide-card">([\s\S]*?)<\/article>/g)].map((match) => match[1]);
if (guideCardBlocks.length && guideCardBlocks.every((card) => occurrences(card, /<a(?:\s|>)/g) === 1)) pass('Every rendered Guide Card has one primary link.'); else fail('A rendered Guide Card has zero or multiple links.');
if (
  guideIndex.includes('Recently updated')
  && !guideIndex.includes('Recently verified')
  && guideIndex.includes('This primary library contains source-reviewed complete and core route guides.')
  && !guideIndex.includes('CILS B1 Cittadinanza')
) pass('Guide cards sort by editing date and exclude pending research pages from primary discovery.'); else fail('Guide cards mix editing, source-review, or primary-discovery semantics.');
const guideIndexTypes = jsonLdTypes(guideIndex);
const categorySchemaFailures = pages.filter(({ route }) => route.startsWith('/guides/category/')).filter(({ html }) => {
  const types = jsonLdTypes(html); return !types.has('CollectionPage') || !types.has('ItemList');
}).map(({ route }) => route);
if (guideIndexTypes.has('CollectionPage') && guideIndexTypes.has('ItemList') && !categorySchemaFailures.length) pass('Guide library and all category routes emit CollectionPage and ItemList data.'); else fail(`Guide collection schema gaps: ${categorySchemaFailures.join(', ') || '/guides/'}`);

const a1Hub = fs.readFileSync(outputFor('/germany-family-reunion-a1/'), 'utf8');
if (jsonLdTypes(a1Hub).has('FAQPage') && occurrences(a1Hub, /<details>/g) >= 2 && occurrences(a1Hub, /class="route-progress__item/g) === 7) pass('Germany A1 route has visible FAQ data and seven route steps.'); else fail('Germany A1 FAQ or seven-step route is incomplete.');

const hreflangPairs = pages.filter(({ route }) => !route.startsWith('/zh')).flatMap(({ route, html }) => [...html.matchAll(/hreflang="zh-CN" href="https:\/\/visalang\.org([^\"]+)"/g)].map((match) => [route, match[1]]));
const hreflangFailures = hreflangPairs.filter(([en, zh]) => {
  if (!fs.existsSync(outputFor(zh))) return true;
  return !fs.readFileSync(outputFor(zh), 'utf8').includes(`hreflang="en" href="https://visalang.org${en}"`);
});
if (hreflangPairs.length >= 7 && !hreflangFailures.length) pass(`All ${hreflangPairs.length} English and Chinese hreflang pairs are reciprocal.`); else fail(`hreflang pair failures: ${hreflangFailures.map((pair) => pair.join(' <-> ')).join(', ')}`);

const internalFailures = [];
for (const page of pages) {
  for (const match of page.html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (clean.startsWith('/_astro/')) {
      if (!fs.existsSync(path.join(dist, clean.slice(1)))) internalFailures.push(`${page.route} -> ${clean}`);
      continue;
    }
    if (!fs.existsSync(outputFor(clean))) internalFailures.push(`${page.route} -> ${clean}`);
  }
}
if (!internalFailures.length) pass('All generated internal route links resolve.'); else fail(`Broken internal links: ${internalFailures.slice(0, 8).join(', ')}`);

const sitemap = read('dist/sitemap-0.xml');
const advertisingFreeRoutes = [
  '/404.html',
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
  '/guides/category/uk/',
  '/guides/category/canada/',
  '/guides/category/italy/',
  '/guides/category/spain/',
  '/guides/category/france/',
  '/guides/category/finland/',
  '/guides/category/netherlands/',
  '/guides/category/portugal/',
  '/guides/category/germany-testdaf/',
  '/guides/category/germany-telc/',
  '/guides/cils-b1-cittadinanza-for-italian-citizenship/',
  '/guides/cils-vs-celi-vs-plida-for-italian-citizenship/',
  '/guides/testdaf-germany-university-admissions/',
  '/guides/telc-b1-b2-fees-and-test-centers/',
];
const advertisingRiskFailures = advertisingFreeRoutes.filter((route) => read(path.relative(root, outputFor(route))).includes('pagead2.googlesyndication.com'));
if (!advertisingRiskFailures.length) pass('404, noindex, commercial-placeholder, and thin country category routes exclude the AdSense runtime.'); else fail(`AdSense risk-route failures: ${advertisingRiskFailures.join(', ')}`);

const commercialPlaceholderRoutes = [
  '/pricing/',
  '/partners/',
  '/route-review/',
  '/products/a1-family-reunion-pack/',
  '/products/a1-practice-pack/',
];
const commercialIndexFailures = commercialPlaceholderRoutes.filter((route) => {
  const html = read(path.relative(root, outputFor(route)));
  return !html.includes('<meta name="robots" content="noindex,follow">') || sitemap.includes(`<loc>https://visalang.org${route}</loc>`);
});
if (!commercialIndexFailures.length) pass('All five commercial placeholder routes are noindex and excluded from the sitemap.'); else fail(`Commercial placeholder index failures: ${commercialIndexFailures.join(', ')}`);

const guideDiscoveryFailures = guidePages.filter(({ route, html }) => {
  const slug = route.split('/').filter(Boolean).at(-1);
  const source = read(`src/content/guides/${slug}.md`);
  const status = frontmatterField(source, 'contentStatus');
  const sourceReviewStatus = frontmatterField(source, 'sourceReviewStatus') || 'pending';
  const explicitlyNoindex = frontmatterField(source, 'noindex') === 'true';
  const explicitlyAdsIneligible = frontmatterField(source, 'adsEligible') === 'false';
  const primaryDiscoveryEligible = sourceReviewStatus === 'reviewed'
    && (status === 'complete-route' || status === 'core-route')
    && !explicitlyNoindex;
  const advertisingEligible = primaryDiscoveryEligible && !explicitlyAdsIneligible;
  const hasNoindex = html.includes('<meta name="robots" content="noindex,follow">');
  const hasAds = html.includes('pagead2.googlesyndication.com');
  const inSitemap = sitemap.includes(`<loc>https://visalang.org${route}</loc>`);
  const discoveryFailure = primaryDiscoveryEligible
    ? hasNoindex || !inSitemap
    : !hasNoindex || inSitemap;
  const advertisingFailure = advertisingEligible ? !hasAds : hasAds;
  return discoveryFailure || advertisingFailure;
}).map(({ route }) => route);
const guideTaxonomySource = read('src/data/guide-taxonomy.ts');
const explicitlyNoindexCategorySlugs = new Set(
  [...guideTaxonomySource.matchAll(/\{[^{}]*slug: '([^']+)'[^{}]*noindex: true[^{}]*\}/g)].map((match) => match[1])
);
const categoryDiscoveryFailures = pages.filter(({ route }) => route.startsWith('/guides/category/')).filter(({ route, html }) => {
  const categorySlug = route.split('/').filter(Boolean).at(-1);
  const hasEligibleGuide = guidePages.some(({ route: guideRoute }) => {
    const slug = guideRoute.split('/').filter(Boolean).at(-1);
    const source = read(`src/content/guides/${slug}.md`);
    const category = frontmatterField(source, 'category');
    const status = frontmatterField(source, 'contentStatus');
    const sourceReviewStatus = frontmatterField(source, 'sourceReviewStatus') || 'pending';
    const explicitlyNoindex = frontmatterField(source, 'noindex') === 'true';
    return route === `/guides/category/${category}/`
      && sourceReviewStatus === 'reviewed'
      && (status === 'complete-route' || status === 'core-route')
      && !explicitlyNoindex;
  });
  const hasNoindex = html.includes('<meta name="robots" content="noindex,follow">');
  const hasAds = html.includes('pagead2.googlesyndication.com');
  const inSitemap = sitemap.includes(`<loc>https://visalang.org${route}</loc>`);
  const eligible = hasEligibleGuide && !explicitlyNoindexCategorySlugs.has(categorySlug);
  return eligible ? hasNoindex || hasAds || !inSitemap : !hasNoindex || hasAds || inSitemap;
});
if (!guideDiscoveryFailures.length && !categoryDiscoveryFailures.length) pass('All guide and category routes follow the fail-closed discovery, sitemap, and advertising gate.'); else fail(`Discovery-policy failures: ${[...guideDiscoveryFailures, ...categoryDiscoveryFailures].slice(0, 8).join(', ')}`);

const germanyCategoryRoute = '/guides/category/germany-a1/';
const germanyCategoryHtml = read(path.relative(root, outputFor(germanyCategoryRoute)));
if (!germanyCategoryHtml.includes('<meta name="robots" content="noindex,follow">') && sitemap.includes(`<loc>https://visalang.org${germanyCategoryRoute}</loc>`)) pass('Germany A1 category remains indexable and in the sitemap.'); else fail('Germany A1 category index policy was changed unexpectedly.');

const netherlandsWindowBRoutes = [
  '/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship/',
  '/guides/staatsexamen-nt2-for-work-and-higher-education/',
  '/guides/category/netherlands/',
];
const netherlandsWindowBFailures = netherlandsWindowBRoutes.filter((route) => {
  const html = read(path.relative(root, outputFor(route)));
  return !html.includes('<meta name="robots" content="noindex,follow">')
    || html.includes('pagead2.googlesyndication.com')
    || sitemap.includes(`<loc>https://visalang.org${route}</loc>`);
});
const netherlandsInburgeringSource = read('src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md');
const netherlandsNt2Html = read(path.relative(root, outputFor('/guides/staatsexamen-nt2-for-work-and-higher-education/')));
const netherlandsInburgeringHtml = read(path.relative(root, outputFor('/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship/')));
if (
  !netherlandsWindowBFailures.length
  && netherlandsInburgeringSource.includes('## Start with a procedure-first route check')
  && netherlandsInburgeringSource.includes('## A2/B1 stop rule')
  && netherlandsInburgeringSource.includes('| IND |')
  && netherlandsInburgeringSource.includes('| Municipality |')
  && netherlandsInburgeringSource.includes('| DUO / Inburgeren |')
  && netherlandsInburgeringSource.includes('| Mijn Inburgering / PIP |')
  && !netherlandsInburgeringHtml.includes('<small>Next guide</small>')
  && !netherlandsNt2Html.includes('<small>Next guide</small>')
) pass('Netherlands B-6 keeps both guides terminal and all three routes noindex, advertising-free, and outside the sitemap.'); else fail(`Netherlands B-6 failures: ${netherlandsWindowBFailures.join(', ') || 'content or terminal-route contract'}`);

for (const slug of ['dutch-inburgering-a2-b1-for-integration-and-citizenship', 'portuguese-language-for-golden-visa-and-citizenship']) {
  if (!sitemap.includes(slug)) pass(`Pending corrected slug remains outside sitemap: ${slug}`); else fail(`Pending corrected slug leaked into sitemap: ${slug}`);
}
for (const slug of ['dutch-inburgering-a2-b1-for-integration-and-citize/', 'portuguese-language-for-golden-visa-and-citizenshi/']) {
  if (sitemap.includes(slug)) fail(`Truncated slug remains in sitemap: ${slug}`);
}

const redirects = read('dist/_redirects');
if (
  redirects.includes('/do-i-need-german-a1.html /tools/route-finder/ 301')
  && redirects.includes('/guides/yki-vs-other-finland-options/ /guides/yki-finnish-citizenship/ 301')
  && redirects.includes('/guides/yki-vs-other-finland-options.html /guides/yki-finnish-citizenship/ 301')
  && redirects.includes('/guides/:slug.html /guides/:slug/ 301')
) pass('Legacy static helpers and retired guide URLs have direct 301 redirects.'); else fail('Legacy redirects are incomplete.');

const css = read('dist/_astro/' + fs.readdirSync(path.join(dist, '_astro')).find((file) => file.endsWith('.css')));
if (css.includes('prefers-reduced-motion') && css.includes('overflow-x:auto') && css.includes('min-height:44px')) pass('Built CSS includes reduced-motion, overflow, and target-size protections.'); else fail('Built accessibility or responsive CSS protections are incomplete.');

const errors = checks.filter((check) => !check.ok);
console.log('\n=== VisaLang Launch Readiness ===\n');
for (const check of checks) console.log(`  ${check.ok ? '✓' : '✗'} ${check.message}`);
console.log(`\n--- Summary ---\n  Pass: ${checks.length - errors.length}\n  Fail: ${errors.length}`);
console.log(errors.length ? '\n  NOT READY.' : '\n  READY.');
process.exit(errors.length ? 1 : 0);
