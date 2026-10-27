const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const dist = path.join(root, 'dist');
const checks = [];
const blockers = [];
const pass = (message) => checks.push({ ok: true, message });
const fail = (message) => checks.push({ ok: false, message });
const block = (message) => blockers.push(message);
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const publicationManifestSource = read('src/data/publication-manifest.ts');
const siteDataSource = read('src/data/site.ts');
const migrationMapSource = read('docs/VISALANG_M3_T23_MIGRATION_CANDIDATE_ROLLBACK_MAP_2026-09-11.md');
const migrationMapBlock = migrationMapSource.match(/<!-- M3_T23_MACHINE_RECORD_START -->\s*```json\s*([\s\S]*?)\s*```\s*<!-- M3_T23_MACHINE_RECORD_END -->/);
if (!migrationMapBlock) throw new Error('Unable to parse the bounded T23 migration candidate map.');
const migrationCandidateMap = JSON.parse(migrationMapBlock[1]);
const manifestStringArray = (name) => {
  const block = publicationManifestSource.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`))?.[1];
  if (!block) throw new Error(`Unable to parse ${name} from the publication manifest.`);
  return [...block.matchAll(/'([^']+)'/g)].map((match) => match[1]);
};
const manifestRedirects = () => {
  const block = publicationManifestSource.match(/export const guideRedirects:[^=]+ = \{([\s\S]*?)\n\};/)?.[1];
  if (block === undefined) throw new Error('Unable to parse guideRedirects from the publication manifest.');
  return Object.fromEntries([...block.matchAll(/'([^']+)':\s*'([^']+)'/g)].map((match) => [match[1], match[2]]));
};
const englishPillarSlugs = manifestStringArray('englishPillarSlugs');
const chinesePillarSlugs = manifestStringArray('chinesePillarSlugs');
const noindexCategorySlugs = manifestStringArray('noindexCategorySlugs');
const guideRedirects = manifestRedirects();
const translatedPathsBlock = siteDataSource.match(/export const translatedPaths:[^=]+ = \{([\s\S]*?)\n\};/)?.[1];
if (!translatedPathsBlock) throw new Error('Unable to parse translatedPaths from site data.');
const translatedPaths = Object.fromEntries([...translatedPathsBlock.matchAll(/'([^']+)':\s*'([^']+)'/g)].map((match) => [match[1], match[2]]));
const adsenseHost = 'pagead2.googlesyndication.com';
const noindexDirective = '<meta name="robots" content="noindex,follow">';
const releaseNoindexSupportRoutes = [
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

const runtimeFeaturesPath = path.join(dist, 'runtime-features.json');
if (!fs.existsSync(runtimeFeaturesPath)) throw new Error('dist/runtime-features.json is missing.');
const runtimeFeatures = JSON.parse(fs.readFileSync(runtimeFeaturesPath, 'utf8'));
const expectedRuntimeFeatures = {
  schemaVersion: 1,
  purposeSuggestions: process.env.VISALANG_PURPOSE_MODE || 'off',
  advertising: process.env.VISALANG_ADS_MODE || 'off',
};
if (JSON.stringify(runtimeFeatures) !== JSON.stringify(expectedRuntimeFeatures)) {
  fail(`Built runtime feature contract does not match requested modes: ${JSON.stringify(runtimeFeatures)}.`);
} else {
  pass(`Built runtime contract is purpose=${runtimeFeatures.purposeSuggestions}, ads=${runtimeFeatures.advertising}.`);
}

const files = listFiles(dist, '.html');
const pages = files.map((file) => ({ file, route: routeFor(file), html: fs.readFileSync(file, 'utf8') }));
const generatedRouteSet = new Set(pages.map(({ route }) => route));
const chineseToolRoutes = [
  '/zh/tools/route-finder/',
  '/zh/tools/checklist-generator/',
  '/zh/tools/timeline-calculator/',
  '/zh/tools/exam-comparison/',
  '/zh/tools/email-reminders/',
];
const missingChineseToolRoutes = chineseToolRoutes.filter((route) => !generatedRouteSet.has(route));
if (generatedRouteSet.size === pages.length && !missingChineseToolRoutes.length) pass(`All ${pages.length} generated HTML routes are unique and include the five Chinese tools.`); else fail(`Generated route set is incomplete or duplicated; missing Chinese tools: ${missingChineseToolRoutes.join(', ') || 'none'}.`);

const sourcePathForGuideRoute = (route) => {
  const slug = route.split('/').filter(Boolean).at(-1);
  return path.join(root, 'src', 'content', 'guides', `${slug}.md`);
};
const isGeneratedGuideRoute = (route) => route.startsWith('/guides/')
  && !route.startsWith('/guides/category/')
  && route !== '/guides/';
const generatedGuideOwnershipFailures = pages
  .filter(({ route }) => isGeneratedGuideRoute(route))
  .filter(({ route }) => {
    const sourcePath = sourcePathForGuideRoute(route);
    if (!fs.existsSync(sourcePath)) return true;
    const source = fs.readFileSync(sourcePath, 'utf8');
    const slug = route.split('/').filter(Boolean).at(-1);
    return frontmatterField(source, 'slug') !== slug || Object.hasOwn(guideRedirects, route);
  })
  .map(({ route }) => route);
if (!generatedGuideOwnershipFailures.length) pass('Every generated guide has current source ownership and is not a manifest redirect.'); else fail(`Generated guide ownership failures: ${generatedGuideOwnershipFailures.join(', ')}.`);

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

const indexableEnglishPages = pages.filter(({ route, html }) => route !== '/404.html'
  && html.includes('<html lang="en">')
  && !html.includes('<meta name="robots" content="noindex,follow">'));
const searchSnippetFailures = indexableEnglishPages.filter(({ html }) => {
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] || '';
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] || '';
  return title.length > 60 || description.length > 170;
}).map(({ route }) => route);
if (!searchSnippetFailures.length) pass('Indexable English titles and descriptions stay within the search-snippet budget.'); else fail(`Search-snippet length failures: ${searchSnippetFailures.slice(0, 8).join(', ')}`);

const socialMetadataFailures = pages.filter(({ html }) => {
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1] || '';
  const twitterImage = html.match(/<meta name="twitter:image" content="([^"]+)"/)?.[1] || '';
  const expectedLocale = html.includes('<html lang="zh-CN">') ? 'zh_CN' : 'en_US';
  const indexable = !html.includes('<meta name="robots" content="noindex,follow">');
  return !ogImage.endsWith('/images/og-default.png')
    || twitterImage !== ogImage
    || !html.includes('<meta property="og:site_name" content="VisaLang">')
    || !html.includes(`<meta property="og:locale" content="${expectedLocale}">`)
    || !html.includes('<meta property="og:image:alt" content="VisaLang — Find the right language exam for your next move">')
    || !html.includes('<meta property="og:image:width" content="1200">')
    || !html.includes('<meta property="og:image:height" content="630">')
    || !html.includes('<meta name="twitter:image:alt" content="VisaLang — Find the right language exam for your next move">')
    || (indexable && !html.includes('<meta name="robots" content="index,follow,max-image-preview:large">'));
}).map(({ route }) => route);
if (!socialMetadataFailures.length) pass('Every route emits complete PNG social-card metadata and an explicit crawler directive.'); else fail(`Social metadata failures: ${socialMetadataFailures.slice(0, 8).join(', ')}`);

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
if (
  comparison.includes('id="comparison-form"')
  && occurrences(clientScripts, /Official exam page/g) === 1
  && clientScripts.includes('officialUrl')
  && !clientScripts.includes('colSpan=2')
) pass('Exam Comparison renders independent product facts and one official link for each product.'); else fail('Exam Comparison generated bundle repeats, merges, or omits its product verification contract.');

const routeFinder = fs.readFileSync(outputFor('/tools/route-finder/'), 'utf8');
if (routeFinder.includes('href="/tools/" aria-current="location"') && routeFinder.includes('href="/tools/route-finder/" aria-current="page"')) pass('Navigation distinguishes the Tools section from the exact Route Finder page.'); else fail('Navigation aria-current semantics are inconsistent.');

const guidePages = pages.filter(({ route }) => isGeneratedGuideRoute(route) && fs.existsSync(sourcePathForGuideRoute(route)));
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
const italyRequirementSource = read('src/content/guides/cils-b1-cittadinanza-for-italian-citizenship.md');
const italyComparisonSource = read('src/content/guides/cils-vs-celi-vs-plida-for-italian-citizenship.md');
if (
  italyRequirement.includes('citizenship-basis requirement check')
  && italyRequirement.includes('href="/guides/cils-vs-celi-vs-plida-for-italian-citizenship/"')
  && italyComparison.includes('certificate comparison record')
  && frontmatterField(italyRequirementSource, 'decisionStage') === 'requirement'
  && frontmatterField(italyComparisonSource, 'decisionStage') === 'choice'
  && frontmatterField(italyComparisonSource, 'comparisonScope') === 'same-route'
  && !italyRequirement.includes('<small>Next guide</small>')
  && !italyComparison.includes('<small>Next guide</small>')
) pass('Italy B-4 keeps distinct requirement and comparison tasks while pending pages stay out of next-guide navigation.'); else fail('Italy B-4 route, task separation, or pending-navigation boundary is incomplete.');
const canadaRequirement = fs.readFileSync(outputFor('/guides/tef-canada-immigration/'), 'utf8');
const canadaComparison = fs.readFileSync(outputFor('/guides/tcf-canada-vs-tef/'), 'utf8');
const canadaRequirementSource = read('src/content/guides/tef-canada-immigration.md');
const canadaComparisonSource = read('src/content/guides/tcf-canada-vs-tef.md');
if (
  canadaRequirement.includes('programme-first requirement check')
  && canadaRequirement.includes('href="/guides/tcf-canada-vs-tef/"')
  && canadaComparison.includes('test comparison record')
  && canadaComparison.includes('Raw scores are not interchangeable')
  && frontmatterField(canadaRequirementSource, 'decisionStage') === 'requirement'
  && frontmatterField(canadaComparisonSource, 'decisionStage') === 'choice'
  && frontmatterField(canadaComparisonSource, 'comparisonScope') === 'same-route'
  && !canadaRequirement.includes('<small>Next guide</small>')
  && !canadaComparison.includes('<small>Next guide</small>')
) pass('Canada B-5 keeps distinct requirement and comparison tasks while pending pages stay out of next-guide navigation.'); else fail('Canada B-5 route, task separation, or pending-navigation boundary is incomplete.');
if (!home.includes('Official sources last checked') && home.includes('Recently updated')) pass('Homepage keeps recent editing updates separate from source review.'); else fail('Homepage mixes editing and source-review dates.');

const tools = ['/tools/route-finder/', '/tools/checklist-generator/', '/tools/timeline-calculator/', '/tools/exam-comparison/', '/tools/email-reminders/'];
const toolFailures = tools.filter((route) => !jsonLdTypes(fs.readFileSync(outputFor(route), 'utf8')).has('WebApplication'));
if (!toolFailures.length) pass('Every real tool page emits WebApplication structured data.'); else fail(`Tool schema failures: ${toolFailures.join(', ')}`);

const toolSourceFiles = ['route-finder', 'checklist-generator', 'timeline-calculator', 'exam-comparison', 'email-reminders']
  .map((name) => read(`src/pages/tools/${name}.astro`));
const toolFormSource = read('src/scripts/tool-form.ts');
const sharedPlanSource = read('src/scripts/plan-state.ts');
const sharedPlanHtmlFailures = tools.filter((route) => {
  const html = fs.readFileSync(outputFor(route), 'utf8');
  return !html.includes('data-plan-save-device') || !html.includes('data-plan-clear') || !html.includes('data-plan-status');
});
if (
  toolSourceFiles.every((source) => source.includes('setupSharedPlan') && source.includes('plan.persist(') && !/persistedNames|controller\.persist\(|requestSubmit\(\)/.test(source))
  && !/URLSearchParams|location\.search|history\.replaceState|sessionStorage|localStorage/.test(toolFormSource)
  && sharedPlanSource.includes('sessionStorage')
  && sharedPlanSource.includes('data-plan-save-device')
  && sharedPlanSource.includes('localStorage')
  && sharedPlanSource.includes('history.replaceState')
  && !sharedPlanHtmlFailures.length
) pass('All five tools use versioned session-first shared state, explicit 30-day device save, clear controls, and legacy query cleanup without URL result persistence.'); else fail(`Shared plan integration failures: ${sharedPlanHtmlFailures.join(', ') || 'source contract mismatch'}.`);

const reminder = fs.readFileSync(outputFor('/tools/email-reminders/'), 'utf8');
if (!/type="email"|Email address/.test(reminder) && reminder.includes('Download ICS') && reminder.includes('Restart this tool')) pass('Reminder Planner uses local, copy, print, text, and ICS paths without collecting email.'); else fail('Reminder Planner still has an email or export gap.');

const privacyPolicy = fs.readFileSync(outputFor('/privacy-policy/'), 'utf8');
const cookiePolicy = fs.readFileSync(outputFor('/cookie-policy/'), 'utf8');
if ([privacyPolicy, cookiePolicy].every((html) => html.includes('sessionStorage') && html.includes('30 days') && html.includes('Clear shared plan') && html.includes('server'))) pass('Privacy and cookie policies disclose session state, optional 30-day save, clear behavior, URL cleanup limits, and server-log boundaries.'); else fail('Shared-plan privacy disclosure is incomplete.');

const guideIndex = fs.readFileSync(outputFor('/guides/'), 'utf8');
const guideFilterNames = [...guideIndex.matchAll(/<select name="([^"]+)" data-guide-filter/g)].map((match) => match[1]);
if (JSON.stringify(guideFilterNames) === JSON.stringify(['purpose', 'stage', 'language'])
  && guideIndex.includes('name="sort" data-guide-sort')
  && guideIndex.includes('data-guide-search')
  && guideIndex.includes('guide-empty-state')) pass('Guide library exposes exactly Purpose, Stage, and Language filters plus sorting, search, and an empty state.'); else fail(`Guide library discovery controls are incorrect: ${guideFilterNames.join(', ') || 'none'}.`);
if (!guideIndex.includes('filter-drawer')
  && guideIndex.includes('aria-live="polite"')
  && guideIndex.includes('data-clear-all')
  && guideIndex.includes('data-empty-clear-all')) pass('Guide library exposes direct filters, live results, and Clear all recovery in both normal and zero-result states.'); else fail('Guide library direct filters or feedback controls are incomplete.');
const guideCardBlocks = [...guideIndex.matchAll(/<article class="article-card guide-card">([\s\S]*?)<\/article>/g)].map((match) => match[1]);
if (guideCardBlocks.length && guideCardBlocks.every((card) => occurrences(card, /<a(?:\s|>)/g) === 1)) pass('Every rendered Guide Card has one primary link.'); else fail('A rendered Guide Card has zero or multiple links.');
if (
  guideIndex.includes('Recently updated')
  && !guideIndex.includes('Recently verified')
  && guideIndex.includes('This library lists source-reviewed route guides. Research pages stay out of this list until their official sources and distinct reader task have been checked.')
  && !guideIndex.includes('CILS B1 Cittadinanza')
) pass('Guide cards sort by editing date and exclude still-being-checked research pages from the main library.'); else fail('Guide cards mix editing, source review, or reader-availability semantics.');
const guideIndexTypes = jsonLdTypes(guideIndex);
const categorySchemaFailures = pages.filter(({ route }) => route.startsWith('/guides/category/')).filter(({ html }) => {
  const types = jsonLdTypes(html); return !types.has('CollectionPage') || !types.has('ItemList');
}).map(({ route }) => route);
if (guideIndexTypes.has('CollectionPage') && guideIndexTypes.has('ItemList') && !categorySchemaFailures.length) pass('Guide library and all category routes emit CollectionPage and ItemList data.'); else fail(`Guide collection schema gaps: ${categorySchemaFailures.join(', ') || '/guides/'}`);

const a1Hub = fs.readFileSync(outputFor('/germany-family-reunion-a1/'), 'utf8');
if (jsonLdTypes(a1Hub).has('FAQPage') && occurrences(a1Hub, /<details>/g) >= 2 && occurrences(a1Hub, /class="route-progress__item/g) === 7) pass('Germany A1 route has visible FAQ data and the seven-pillar route sequence.'); else fail('Germany A1 FAQ or seven-pillar route is incomplete.');

const hreflangPairs = pages.filter(({ route }) => !route.startsWith('/zh')).flatMap(({ route, html }) => [...html.matchAll(/hreflang="zh-CN" href="https:\/\/visalang\.org([^\"]+)"/g)].map((match) => [route, match[1]]));
const hreflangFailures = hreflangPairs.filter(([en, zh]) => {
  if (!fs.existsSync(outputFor(zh))) return true;
  const englishHtml = fs.readFileSync(outputFor(en), 'utf8');
  const chineseHtml = fs.readFileSync(outputFor(zh), 'utf8');
  return Object.prototype.hasOwnProperty.call(guideRedirects, en)
    || Object.prototype.hasOwnProperty.call(guideRedirects, zh)
    || englishHtml.includes(noindexDirective)
    || chineseHtml.includes(noindexDirective)
    || !chineseHtml.includes(`hreflang="en" href="https://visalang.org${en}"`);
});
const expectedHreflangPairs = Object.entries(translatedPaths);
const sortPairs = (pairs) => pairs.map((pair) => pair.join(' <-> ')).sort();
const expectedHreflangRoutePairs = new Map(expectedHreflangPairs.flatMap(([englishRoute, chineseRoute]) => [
  [englishRoute, [englishRoute, chineseRoute]],
  [chineseRoute, [englishRoute, chineseRoute]],
]));
const exactHreflangRouteFailures = pages.filter(({ route, html }) => {
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
    .map((match) => `${match[1]}=${match[2]}`)
    .sort();
  const pair = expectedHreflangRoutePairs.get(route);
  if (!pair) return alternates.length > 0;
  const [englishRoute, chineseRoute] = pair;
  const expected = [
    `en=https://visalang.org${englishRoute}`,
    `x-default=https://visalang.org${englishRoute}`,
    `zh-CN=https://visalang.org${chineseRoute}`,
  ].sort();
  return JSON.stringify(alternates) !== JSON.stringify(expected);
}).map(({ route }) => route);
if (JSON.stringify(sortPairs(hreflangPairs)) === JSON.stringify(sortPairs(expectedHreflangPairs)) && !hreflangFailures.length && !exactHreflangRouteFailures.length) pass('Every declared equivalent page pair is reciprocal, indexable, and the only route set emitting hreflang.'); else fail(`Expected the exact ${expectedHreflangPairs.length} reciprocal hreflang pairs; found ${sortPairs(hreflangPairs).join(', ') || 'none'}. Route failures: ${exactHreflangRouteFailures.join(', ') || 'none'}. Pair failures: ${hreflangFailures.map((pair) => pair.join(' <-> ')).join(', ') || 'set mismatch'}`);

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
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const noindexPages = pages.filter(({ html }) => html.includes(noindexDirective));
const advertisingPages = pages.filter(({ html }) => html.includes(adsenseHost));
const englishPillarRoutes = englishPillarSlugs.map((slug) => `/guides/${slug}/`);
const chinesePillarRoutes = chinesePillarSlugs.map((slug) => `/zh/guides/${slug}/`);
const expectedAdvertisingRoutes = englishPillarRoutes.filter((route) => {
  const source = fs.readFileSync(sourcePathForGuideRoute(route), 'utf8');
  return frontmatterField(source, 'adsEligible') !== 'false';
}).sort();

if (englishPillarSlugs.length === 15 && chinesePillarSlugs.length === 5 && noindexCategorySlugs.length === 12 && Object.keys(guideRedirects).length === 0) {
  pass('Publication manifest supplies the exact 15 English pillars, 5 Chinese pillars, 12 closed categories, and zero active candidate redirects.');
} else {
  fail(`Publication manifest count mismatch: English ${englishPillarSlugs.length}, Chinese ${chinesePillarSlugs.length}, categories ${noindexCategorySlugs.length}, redirects ${Object.keys(guideRedirects).length}.`);
}

const missingChineseToolSitemapUrls = chineseToolRoutes.filter((route) => !sitemapUrls.includes(`https://visalang.org${route}`));
if (new Set(sitemapUrls).size === sitemapUrls.length && !missingChineseToolSitemapUrls.length) pass(`All ${sitemapUrls.length} sitemap URLs are unique and include the five indexable Chinese tools.`); else fail(`Sitemap is duplicated or missing Chinese tools: ${missingChineseToolSitemapUrls.join(', ') || 'none'}.`);
if (noindexPages.length === 64) pass('Exactly 64 generated pages are noindex.'); else fail(`Expected 64 noindex pages; found ${noindexPages.length}.`);
const expectedLoadedAdRoutes = runtimeFeatures.advertising === 'on' ? expectedAdvertisingRoutes : [];
if (advertisingPages.length === expectedLoadedAdRoutes.length
  && JSON.stringify(advertisingPages.map(({ route }) => route).sort()) === JSON.stringify(expectedLoadedAdRoutes)) {
  pass(runtimeFeatures.advertising === 'on'
    ? 'Only the existing 14 advertising-eligible English pillars load AdSense.'
    : 'Advertising is off: zero generated pages load AdSense.');
} else {
  fail(`AdSense ${runtimeFeatures.advertising} mode mismatch: ${advertisingPages.map(({ route }) => route).sort().join(', ') || 'no advertising pages'}.`);
}

const purposeUiPages = pages.filter(({ html }) => html.includes('data-purpose-suggestion'));
if (runtimeFeatures.purposeSuggestions === 'off' && purposeUiPages.length === 0) {
  pass('Purpose suggestions are off: zero generated pages contain the optional suggestion UI.');
} else if (runtimeFeatures.purposeSuggestions !== 'off' && purposeUiPages.some(({ route }) => !['/tools/route-finder/', '/zh/tools/route-finder/'].includes(route))) {
  fail(`Purpose suggestion UI appeared outside the bilingual Route Finder: ${purposeUiPages.map(({ route }) => route).join(', ')}.`);
} else if (runtimeFeatures.purposeSuggestions !== 'off' && purposeUiPages.length === 2) {
  pass(`Purpose suggestion UI is present only on the two Route Finder pages (${runtimeFeatures.purposeSuggestions}).`);
} else if (runtimeFeatures.purposeSuggestions !== 'off') {
  fail(`Purpose suggestion mode expected two bilingual tool pages; found ${purposeUiPages.length}.`);
}

const sitemapPolicyFailures = pages.filter(({ route, html }) => {
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) return route !== '/404.html';
  const shouldBeIndexed = !html.includes(noindexDirective);
  return sitemapUrls.includes(canonical) !== shouldBeIndexed;
}).map(({ route }) => route);
if (!sitemapPolicyFailures.length) pass('Sitemap membership exactly matches rendered indexability.'); else fail(`Sitemap/indexability mismatches: ${sitemapPolicyFailures.slice(0, 8).join(', ')}.`);

const pillarFailures = [...englishPillarRoutes, ...chinesePillarRoutes].filter((route) => {
  if (!fs.existsSync(outputFor(route))) return true;
  const html = fs.readFileSync(outputFor(route), 'utf8');
  const shouldAdvertise = runtimeFeatures.advertising === 'on' && expectedAdvertisingRoutes.includes(route);
  return html.includes(noindexDirective)
    || !sitemapUrls.includes(`https://visalang.org${route}`)
    || html.includes(adsenseHost) !== shouldAdvertise;
});
if (!pillarFailures.length) pass('All 20 manifest pillars are indexable, in the sitemap, and follow their advertising policies.'); else fail(`Pillar publication failures: ${pillarFailures.slice(0, 8).join(', ')}.`);

const pendingGuidePages = guidePages.filter(({ route }) => !englishPillarRoutes.includes(route));
const pendingGuideFailures = pendingGuidePages.filter(({ route, html }) => html.includes(noindexDirective) === false
  || html.includes(adsenseHost)
  || sitemapUrls.includes(`https://visalang.org${route}`)).map(({ route }) => route);
if (pendingGuidePages.length === 38 && !pendingGuideFailures.length) pass('Exactly 38 non-pillar English guides are noindex, advertising-free, and outside the sitemap.'); else fail(`Pending English guide gate mismatch: found ${pendingGuidePages.length}; failures ${pendingGuideFailures.slice(0, 8).join(', ') || 'count mismatch'}.`);

const categoryRoutes = noindexCategorySlugs.map((slug) => `/guides/category/${slug}/`);
const renderedCategoryRoutes = pages.filter(({ route }) => route.startsWith('/guides/category/')).map(({ route }) => route).sort();
const categoryFailures = categoryRoutes.filter((route) => {
  if (!fs.existsSync(outputFor(route))) return true;
  const html = fs.readFileSync(outputFor(route), 'utf8');
  return !html.includes(noindexDirective) || html.includes(adsenseHost) || sitemapUrls.includes(`https://visalang.org${route}`);
});
if (JSON.stringify(renderedCategoryRoutes) === JSON.stringify([...categoryRoutes].sort()) && !categoryFailures.length) pass('Exactly 12 manifest categories are noindex, advertising-free, and outside the sitemap.'); else fail(`Closed category failures: ${categoryFailures.join(', ') || 'rendered category set differs from manifest'}.`);

const supportFailures = releaseNoindexSupportRoutes.filter((route) => {
  if (!fs.existsSync(outputFor(route))) return true;
  const html = fs.readFileSync(outputFor(route), 'utf8');
  return !html.includes(noindexDirective) || html.includes(adsenseHost) || sitemapUrls.includes(`https://visalang.org${route}`);
});
if (releaseNoindexSupportRoutes.length === 11 && !supportFailures.length) pass('Exactly 11 policy, placeholder, and error routes are noindex, advertising-free, and outside the sitemap.'); else fail(`Policy/placeholder/error failures: ${supportFailures.join(', ') || 'count mismatch'}.`);

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
const actualIndexableNonPillarRoutes = indexableNonPillarPages.map(({ route }) => route).sort();
if (JSON.stringify(actualIndexableNonPillarRoutes) === JSON.stringify(expectedIndexableNonPillarRoutes)) pass('The exact non-pillar home, hub, directory, tool, trust, and Chinese-tool route set is indexable.'); else fail(`Indexable non-pillar route mismatch: ${actualIndexableNonPillarRoutes.join(', ') || 'none'}.`);

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
) pass('The generated redirect artifact includes the established compatibility declarations.'); else fail('Established compatibility declarations are incomplete in the generated redirect artifact.');

// The September 11 map is historical evidence; current retained decisions are separate.
const retained = JSON.parse(read('deploy/retained-routes.json'));
const retainedErrors = [];
const historicalPaths = migrationCandidateMap.records.map(r => r.sourceUrl).sort();
const retainedPaths = retained.records.map(r => r.path).sort();
if (JSON.stringify(retainedPaths) !== JSON.stringify(historicalPaths)) retainedErrors.push('retained register must cover the exact 17 historical paths');
if (!fs.existsSync(path.join(root, retained.ownerDecisionRef))) retainedErrors.push('missing Owner decision');
for (const record of retained.records) {
  if (record.disposition !== 'RETAIN' || record.index !== false || record.sitemap !== false || record.ads !== false) retainedErrors.push(`${record.path}: invalid retained policy`);
  if (!fs.existsSync(path.join(root, record.sourcePath)) || !fs.existsSync(outputFor(record.path))) { retainedErrors.push(`${record.path}: missing source or output`); continue; }
  const html = fs.readFileSync(outputFor(record.path), 'utf8');
  if (record.canonical !== `https://visalang.org${record.path}` || !html.includes(`rel="canonical" href="${record.canonical}"`)) retainedErrors.push(`${record.path}: canonical mismatch`);
  if (!html.includes(noindexDirective) || html.includes(adsenseHost) || sitemapUrls.includes(record.canonical)) retainedErrors.push(`${record.path}: publication policy mismatch`);
  if (Object.hasOwn(guideRedirects, record.path) || redirects.split(/\r?\n/).some(line => line.trim().split(/\s+/)[0] === record.path)) retainedErrors.push(`${record.path}: active redirect conflict`);
  if (!fs.existsSync(path.join(root, record.sourceLedger))) retainedErrors.push(`${record.path}: missing source review`);
}
if (retainedErrors.length) fail(`T23 retained-route failures: ${retainedErrors.join('; ')}`);
else pass('T23 local retention checks pass for all 17 historical URLs; production HTTP and indexing remain unverified.');

const redirectSourceSet = new Set(Object.keys(guideRedirects));
const staleRedirectLinks = [];
for (const page of pages) {
  for (const match of page.html.matchAll(/href="([^"]+)"/g)) {
    const rawHref = match[1].split('#')[0].split('?')[0];
    const href = rawHref.startsWith('https://visalang.org/') ? rawHref.slice('https://visalang.org'.length) : rawHref;
    if (redirectSourceSet.has(href)) staleRedirectLinks.push(`${page.route} -> ${href}`);
  }
}
if (!staleRedirectLinks.length) pass('Generated internal links, canonicals, and hreflang do not point to a redirect-declared candidate source URL.'); else fail(`Redirect-candidate source links remain: ${staleRedirectLinks.slice(0, 8).join(', ')}.`);

const css = read('dist/_astro/' + fs.readdirSync(path.join(dist, '_astro')).find((file) => file.endsWith('.css')));
if (css.includes('prefers-reduced-motion') && css.includes('overflow-x:auto') && css.includes('min-height:44px')) pass('Built CSS includes reduced-motion, overflow, and target-size protections.'); else fail('Built accessibility or responsive CSS protections are incomplete.');

const errors = checks.filter((check) => !check.ok);
console.log('\n=== VisaLang Launch Readiness ===\n');
for (const check of checks) console.log(`  ${check.ok ? '✓' : '✗'} ${check.message}`);
for (const message of blockers) console.log(`  ⚠ ${message}`);
console.log(`\n--- Summary ---\n  Pass: ${checks.length - errors.length}\n  Fail: ${errors.length}\n  Blocked: ${blockers.length}`);
if (errors.length) console.log('\n  NOT READY.');
else if (blockers.length) console.log('\n  BLOCKED.');
else console.log('\n  LOCAL CANDIDATE CHECKS PASSED; production evidence is separate.');
process.exit(errors.length || blockers.length ? 1 : 0);
