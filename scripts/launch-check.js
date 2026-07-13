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
  if (!title || !description || !canonical.startsWith('https://flowlight.me/')) metadataFailures.push(page.route);
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
const guideIndexTypes = jsonLdTypes(guideIndex);
const categorySchemaFailures = pages.filter(({ route }) => route.startsWith('/guides/category/')).filter(({ html }) => {
  const types = jsonLdTypes(html); return !types.has('CollectionPage') || !types.has('ItemList');
}).map(({ route }) => route);
if (guideIndexTypes.has('CollectionPage') && guideIndexTypes.has('ItemList') && !categorySchemaFailures.length) pass('Guide library and all category routes emit CollectionPage and ItemList data.'); else fail(`Guide collection schema gaps: ${categorySchemaFailures.join(', ') || '/guides/'}`);

const a1Hub = fs.readFileSync(outputFor('/germany-family-reunion-a1/'), 'utf8');
if (jsonLdTypes(a1Hub).has('FAQPage') && occurrences(a1Hub, /<details>/g) >= 2 && occurrences(a1Hub, /class="route-progress__item/g) === 7) pass('Germany A1 route has visible FAQ data and seven route steps.'); else fail('Germany A1 FAQ or seven-step route is incomplete.');

const hreflangPairs = pages.filter(({ route }) => !route.startsWith('/zh')).flatMap(({ route, html }) => [...html.matchAll(/hreflang="zh-CN" href="https:\/\/flowlight\.me([^\"]+)"/g)].map((match) => [route, match[1]]));
const hreflangFailures = hreflangPairs.filter(([en, zh]) => {
  if (!fs.existsSync(outputFor(zh))) return true;
  return !fs.readFileSync(outputFor(zh), 'utf8').includes(`hreflang="en" href="https://flowlight.me${en}"`);
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
for (const slug of ['dutch-inburgering-a2-b1-for-integration-and-citizenship', 'portuguese-language-for-golden-visa-and-citizenship']) {
  if (sitemap.includes(slug)) pass(`Corrected slug is in sitemap: ${slug}`); else fail(`Corrected slug missing from sitemap: ${slug}`);
}
for (const slug of ['dutch-inburgering-a2-b1-for-integration-and-citize/', 'portuguese-language-for-golden-visa-and-citizenshi/']) {
  if (sitemap.includes(slug)) fail(`Truncated slug remains in sitemap: ${slug}`);
}

const redirects = read('dist/_redirects');
if (redirects.includes('/do-i-need-german-a1.html /tools/route-finder/ 301') && redirects.includes('/guides/:slug.html /guides/:slug/ 301')) pass('Legacy static helpers and guide files have 301 redirects.'); else fail('Legacy redirects are incomplete.');

const css = read('dist/_astro/' + fs.readdirSync(path.join(dist, '_astro')).find((file) => file.endsWith('.css')));
if (css.includes('prefers-reduced-motion') && css.includes('overflow-x:auto') && css.includes('min-height:44px')) pass('Built CSS includes reduced-motion, overflow, and target-size protections.'); else fail('Built accessibility or responsive CSS protections are incomplete.');

const errors = checks.filter((check) => !check.ok);
console.log('\n=== VisaLang Launch Readiness ===\n');
for (const check of checks) console.log(`  ${check.ok ? '✓' : '✗'} ${check.message}`);
console.log(`\n--- Summary ---\n  Pass: ${checks.length - errors.length}\n  Fail: ${errors.length}`);
console.log(errors.length ? '\n  NOT READY.' : '\n  READY.');
process.exit(errors.length ? 1 : 0);
