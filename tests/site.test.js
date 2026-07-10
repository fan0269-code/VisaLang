const assert = require("node:assert/strict");
const fs = require("node:fs");

const {
  brand,
  i18n,
  exams,
  pageSections,
  tools,
  sources,
  pageSeeds,
  calculateExamBudget,
  recommendExamPath,
} = require("../app-data.js");

assert.equal(brand.name, "VisaLang");
assert.ok(brand.tagline.includes("visa"));
assert.ok(brand.headline.includes("language exam"));
assert.equal(i18n.en.heroHeadline, "Find the right language exam for your visa, residency, citizenship, or work path");
assert.equal(i18n.zh.heroHeadline, "根据签证、永居、入籍、留学或职业注册需求，找到正确的语言考试路径");
assert.equal(i18n.zh.languageToggle, "EN");

assert.equal(exams.length, 50, "VisaLang should include 50 sourced exam page seeds");
assert.equal(pageSeeds.length, 200, "50 exams should generate 200 high-intent SEO pages");

for (const exam of exams) {
  assert.ok(exam.name, "exam name is required");
  assert.ok(exam.officialSource, `${exam.name} needs an official source`);
  assert.ok(exam.lastUpdated, `${exam.name} needs Last Updated`);
}

const contentGuideFiles = fs.readdirSync("src/content/guides").filter((file) => file.endsWith(".md"));
const contentGuideSlugs = contentGuideFiles.map((file) => {
  const guide = fs.readFileSync(`src/content/guides/${file}`, "utf8");
  const match = guide.match(/^slug:\s*"([^"]+)"/m);
  assert.ok(match, `${file} needs a slug`);
  return match[1];
});
assert.equal(new Set(contentGuideSlugs).size, contentGuideSlugs.length, "Astro content guide slugs should be unique");
const guideBySlug = new Map(contentGuideFiles.map((file) => {
  const guide = fs.readFileSync(`src/content/guides/${file}`, "utf8");
  return [guide.match(/^slug:\s*"([^"]+)"/m)[1], guide];
}));
for (const [slug, guide] of guideBySlug) {
  const related = [...(guide.match(/^related:\s*\[([^\]]*)\]/m)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  for (const relatedSlug of related) {
    assert.ok(guideBySlug.has(relatedSlug), `${slug} related guide should exist: ${relatedSlug}`);
  }
}
const categoryCounts = new Map();
for (const guide of guideBySlug.values()) {
  const category = guide.match(/^category:\s*"([^"]+)"/m)[1];
  categoryCounts.set(category, (categoryCounts.get(category) ?? 0) + 1);
}
for (const [slug, guide] of guideBySlug) {
  const category = guide.match(/^category:\s*"([^"]+)"/m)[1];
  const related = [...(guide.match(/^related:\s*\[([^\]]*)\]/m)?.[1] ?? "").matchAll(/"([^"]+)"/g)].map((match) => match[1]);
  if (categoryCounts.get(category) > 1) {
    assert.ok(related.length > 0, `${slug} should link to a related guide in its multi-guide route`);
  }
}

assert.deepEqual(pageSections, [
  "Exam Overview",
  "Eligibility",
  "Fees",
  "Dates",
  "Test Format",
  "Locations / Online",
  "Required Documents",
  "Passing Score",
  "Retake Policy",
  "Prep Path",
  "Best Courses",
  "Practice Test",
  "Career Outcome",
  "Related Exams",
  "FAQ",
  "Last Updated",
]);

assert.equal(tools.length, 3, "VisaLang should expose exactly three tools");
assert.ok(
  sources.some((source) => source.name.includes("Goethe")),
  "official source table should include Goethe"
);

const budget = calculateExamBudget({ examFee: 130, prepBudget: 49, retakes: 1 });
assert.deepEqual(budget, { examFee: 130, prepBudget: 49, retakes: 1, total: 309 });

const recommendation = recommendExamPath({
  goal: "spouse-visa",
  country: "Germany",
  language: "German",
});
assert.equal(recommendation.primaryExam, "Goethe-Zertifikat A1");
assert.ok(recommendation.nextSteps.length >= 3);
assert.ok(!recommendation.warning.toLowerCase().includes("dump"));

const homepage = fs.readFileSync("index.html", "utf8");
const appScript = fs.readFileSync("app.js", "utf8");
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
const publicRobots = fs.readFileSync("public/robots.txt", "utf8");
const astroConfig = fs.readFileSync("astro.config.mjs", "utf8");
const astroGlobalCss = fs.readFileSync("src/styles/global.css", "utf8");
const guideLayoutSource = fs.readFileSync("src/layouts/GuideLayout.astro", "utf8");
const headerSource = fs.readFileSync("src/components/Header.astro", "utf8");
const guideCtaSource = fs.readFileSync("src/components/GuideCTA.astro", "utf8");
const baseLayoutSource = fs.readFileSync("src/layouts/BaseLayout.astro", "utf8");
const editorialPolicySource = fs.readFileSync("src/pages/editorial-policy.astro", "utf8");
const contactSource = fs.readFileSync("src/pages/contact.astro", "utf8");
const cookiePolicySource = fs.readFileSync("src/pages/cookie-policy.astro", "utf8");
const astroHomepage = fs.readFileSync("src/pages/index.astro", "utf8");
const astroGuidesIndex = fs.readFileSync("src/pages/guides/index.astro", "utf8");
const guideCategoryPage = fs.readFileSync("src/pages/guides/category/[category].astro", "utf8");
const guideTaxonomy = fs.readFileSync("src/data/guide-taxonomy.ts", "utf8");
const astroZhHomepage = fs.readFileSync("src/pages/zh/index.astro", "utf8");
const zhGermanyA1Data = fs.readFileSync("src/data/zh-germany-a1.ts", "utf8");
const zhGermanyA1Hub = fs.readFileSync("src/pages/zh/germany-family-reunion-a1.astro", "utf8");
const astroGermanyA1Hub = fs.readFileSync("src/pages/germany-family-reunion-a1.astro", "utf8");
const zhGuideLayout = fs.readFileSync("src/components/ZhGuideLayout.astro", "utf8");
const astroGermanA1Timeline = fs.readFileSync("src/content/guides/german-a1-exam-booking-timeline.md", "utf8");
const astroGermanyA1GuidePage = fs.readFileSync("src/pages/guides/[slug].astro", "utf8");
const germanyA1RouteSupport = fs.readFileSync("src/components/GermanyA1RouteSupport.astro", "utf8");
const goetheA1FeesGuide = fs.readFileSync("src/content/guides/goethe-a1-fees-by-country.md", "utf8");
const goetheA1TestCentersGuide = fs.readFileSync("src/content/guides/goethe-a1-test-centers.md", "utf8");
const goetheA1RetakeGuide = fs.readFileSync("src/content/guides/goethe-a1-retake-policy.md", "utf8");
const germanA1DocumentsGuide = fs.readFileSync("src/content/guides/german-a1-documents-checklist.md", "utf8");
const goetheA1SpeakingGuide = fs.readFileSync("src/content/guides/goethe-a1-speaking-topics.md", "utf8");
const astroTcfCanadaVsTef = fs.readFileSync("src/content/guides/tcf-canada-vs-tef.md", "utf8");
const astroTcfIrn = fs.readFileSync("src/content/guides/tcf-irn-french-residence.md", "utf8");
const astroGoetheB1DepthSlugs = [
  "goethe-b1-difficulty-analysis",
  "goethe-b1-listening-deep-dive",
  "goethe-b1-mock-exam-routine",
  "goethe-b1-speaking-topics",
  "goethe-b1-writing-assessment",
];

assert.doesNotThrow(() => new Function(appScript), "app.js should parse without syntax errors");
assert.equal(
  packageJson.scripts["prelaunch-check"],
  "npm run build",
  "launch-check should build fresh Astro output before inspecting dist/"
);
assert.equal(
  packageJson.scripts["prebuild"],
  "npm run clean:astro",
  "Astro builds should clear stale content cache before syncing content"
);
assert.equal(
  packageJson.scripts["postbuild"],
  "node scripts/enrich-sitemap-lastmod.js",
  "Astro builds should enrich the generated sitemap with guide updatedDate values"
);
assert.ok(
  packageJson.scripts["clean:astro"].includes("node_modules/.astro"),
  "Astro cache cleanup should include node_modules/.astro content cache"
);
assert.ok(
  fs.readFileSync("scripts/enrich-sitemap-lastmod.js", "utf8").includes("updatedDate"),
  "Sitemap enrichment script should read guide updatedDate metadata"
);
assert.ok(
  fs.readFileSync("scripts/enrich-sitemap-lastmod.js", "utf8").includes("<lastmod>${lastmod}</lastmod>"),
  "Sitemap enrichment script should write lastmod entries"
);
assert.ok(
  publicRobots.includes("https://flowlight.me/sitemap-index.xml"),
  "Astro public robots.txt should point search engines to the generated sitemap index"
);
assert.ok(astroConfig.includes("noindexSitemapPaths"), "Astro sitemap should define noindex paths to exclude");
assert.ok(astroConfig.includes("filter: (page)"), "Astro sitemap should filter generated URLs");
for (const noindexPath of [
  "/affiliate-disclosure/",
  "/cookie-policy/",
  "/editorial-policy/",
  "/privacy-policy/",
  "/terms/",
]) {
  assert.ok(astroConfig.includes(`'${noindexPath}'`), `Astro sitemap filter should exclude ${noindexPath}`);
}
assert.ok(
  guideLayoutSource.includes("<h1>{title}</h1>"),
  "Astro guide layout should render the article title as the page H1"
);
assert.ok(guideLayoutSource.includes("'@graph'"), "Astro guide layout should emit JSON-LD as a graph");
assert.ok(guideLayoutSource.includes("'@type': 'Article'"), "Astro guide layout should emit Article structured data");
assert.ok(guideLayoutSource.includes("'@type': 'BreadcrumbList'"), "Astro guide layout should emit BreadcrumbList structured data");
assert.ok(guideLayoutSource.includes("itemListElement: breadcrumbs.map"), "Astro guide breadcrumbs should be reflected in JSON-LD");
assert.ok(guideLayoutSource.includes("routeHref?: string"), "Astro guide layout should accept a route index link");
assert.ok(guideLayoutSource.includes("routeHref={routeHref}"), "Astro guide layout should pass the route index link to related guides");
assert.ok(guideLayoutSource.includes('class="guide-trustbar"'), "Astro guide layout should show a trust bar near the title");
assert.ok(guideLayoutSource.includes("Last updated:"), "Astro guide trust bar should show the updated date");
assert.ok(guideLayoutSource.includes("Official sources are linked below"), "Astro guide trust bar should point readers to official sources");
assert.ok(guideLayoutSource.includes('id="summary"'), "Astro guide layout should include a summary box anchor");
assert.ok(guideLayoutSource.includes("Who this guide is for"), "Astro guide layout should include an audience section");
assert.ok(guideLayoutSource.includes("Who this guide is not for"), "Astro guide layout should include a non-audience section");
assert.ok(guideLayoutSource.includes("Official verification"), "Astro guide layout should include an official verification box");
assert.ok(guideLayoutSource.includes("Common mistakes"), "Astro guide layout should include a common mistakes box");
assert.ok(guideLayoutSource.includes("Disclaimer"), "Astro guide layout should include a disclaimer section");
assert.ok(guideLayoutSource.includes('ogType="article"'), "Astro guide pages should use article Open Graph type");
assert.ok(
  headerSource.indexOf("</nav>") < headerSource.indexOf('class="lang-switch"'),
  "Astro mobile header should keep the language switch outside the navigation row"
);
assert.ok(!headerSource.includes("?lang=zh"), "Astro language switch should use a real /zh/ route");
assert.ok(!headerSource.includes("#guides"), "Astro header should link to the guide index instead of a homepage anchor");
assert.ok(headerSource.includes("{ href: '/guides/', label: 'Guides' }"), "Astro English header should link to the guide index");
assert.ok(headerSource.includes("{ href: '/zh/germany-family-reunion-a1/', label: '德国 A1' }"), "Astro Chinese header should link to the Chinese Germany A1 hub");
assert.ok(headerSource.includes("{ href: '/zh/#zh-guides', label: '中文指南' }"), "Astro Chinese header should link to Chinese core guides");
assert.ok(headerSource.includes("Astro.url.pathname.startsWith('/guides/')"), "Astro guide nav should stay active on guide pages");
assert.ok(headerSource.includes("const isEnglishHome"), "Astro header should distinguish homepage language switch context");
assert.ok(headerSource.includes("zhTranslationMap"), "Astro header should route available Chinese translations directly");
assert.ok(headerSource.includes("label: '中文首页'"), "Astro non-home English pages should label the link as Chinese homepage");
assert.ok(headerSource.includes("Open Chinese homepage"), "Astro non-home English pages should avoid implying a page-level translation");
assert.ok(baseLayoutSource.includes("<html lang={lang}>"), "Astro pages should be able to set their document language");
assert.ok(baseLayoutSource.includes("ogImage = '/images/og-default.svg'"), "Astro layout should reference the existing default OG image");
assert.ok(baseLayoutSource.includes("const pageTitle"), "Astro layout should centralize the rendered page title");
assert.ok(baseLayoutSource.includes("content={pageTitle}"), "Astro Open Graph and Twitter titles should reuse the deduplicated page title");
assert.ok(!editorialPolicySource.includes(".li>"), "Astro editorial policy should not contain malformed list tags");
assert.ok(contactSource.includes("official-source updates"), "Astro contact page should have a specific meta description");
assert.ok(guideCtaSource.includes("buttonHref = '/contact/'"), "guide CTA should point to the real contact page");
assert.ok(!guideCtaSource.includes("/#waitlist"), "guide CTA should not point to a missing waitlist anchor");
assert.ok(cookiePolicySource.includes("privacy-conscious"), "Astro cookie policy should have a specific meta description");
assert.ok(/\.guide-article table[\s\S]*overflow-x:\s*auto/.test(astroGlobalCss), "Astro guide tables should scroll horizontally on small screens");
assert.ok(/\.guide-article a[\s\S]*overflow-wrap:\s*anywhere/.test(astroGlobalCss), "Astro guide long links should wrap on small screens");
assert.ok(/\.guide-article pre[\s\S]*overflow-x:\s*auto/.test(astroGlobalCss), "Astro guide code blocks should scroll horizontally on small screens");
assert.ok(astroGlobalCss.includes(".guide-trustbar"), "Astro guide trust bar should have a stable style hook");
assert.ok(astroHomepage.includes('canonicalURL="https://flowlight.me/"'), "Astro English homepage should set a stable canonical URL");
assert.ok(astroHomepage.includes("https://flowlight.me/zh/"), "Astro English homepage should link to the Chinese alternate");
assert.ok(!astroGuidesIndex.includes('title="Browse exam guides | VisaLang"'), "Astro guide index title should not duplicate the brand suffix");
assert.ok(astroGuidesIndex.includes("'@type': 'CollectionPage'"), "Astro guides index should emit CollectionPage structured data");
assert.ok(astroGuidesIndex.includes("'@type': 'ItemList'"), "Astro guides index should emit ItemList structured data");
assert.ok(astroGuidesIndex.includes("numberOfItems: sortedGuides.length"), "Astro guides ItemList should count all guides");
assert.ok(astroGuidesIndex.includes("itemListElement: sortedGuides.map"), "Astro guides ItemList should include every guide URL");
assert.ok(astroGuidesIndex.includes("categoriesWithCounts"), "Astro guides index should compute route guide counts");
assert.ok(astroGuidesIndex.includes('id="route-overview-title"'), "Astro guides index should include a route overview heading");
assert.ok(astroGuidesIndex.includes('data-route-card={cat.slug}'), "Astro guides index should expose one overview card per route");
assert.ok(guideTaxonomy.includes("Family reunion language proof"), "Astro guide taxonomy should explain the Germany A1 route");
assert.ok(astroGuidesIndex.includes('role="search"'), "Astro guides index should include a real guide search form");
assert.ok(astroGuidesIndex.includes('id="guide-search-input"'), "Astro guides index should expose a search input");
assert.ok(astroGuidesIndex.includes('class="popular-routes"'), "Astro guides index should include popular route links");
assert.ok(astroGuidesIndex.includes('class="guide-facets"'), "Astro guides index should include faceted filters");
assert.ok(astroGuidesIndex.includes('data-facet="country"'), "Astro guides index should filter by country");
assert.ok(astroGuidesIndex.includes('data-facet="exam"'), "Astro guides index should filter by exam");
assert.ok(astroGuidesIndex.includes('data-facet="level"'), "Astro guides index should filter by level");
assert.ok(astroGuidesIndex.includes("data-country={g.meta.country}"), "Astro guides cards should expose country metadata");
assert.ok(astroGuidesIndex.includes("data-exam={g.meta.exam}"), "Astro guides cards should expose exam metadata");
assert.ok(astroGuidesIndex.includes("data-level={g.meta.level}"), "Astro guides cards should expose level metadata");
assert.ok(guideCategoryPage.includes("getStaticPaths"), "Astro should generate static guide category pages");
assert.ok(guideCategoryPage.includes("CollectionPage"), "Astro guide category pages should emit CollectionPage structured data");
assert.ok(guideCategoryPage.includes("canonicalURL={canonicalURL}"), "Astro guide category pages should set canonical URLs");
assert.ok(astroGuidesIndex.includes("params.get('q')"), "Astro guides search should read a query parameter");
assert.ok(astroGuidesIndex.includes("search.addEventListener('input'"), "Astro guides search should listen as users type");
assert.ok(astroGuidesIndex.includes("applyFilters();"), "Astro guides search should apply filters from browser state");
assert.ok(astroGuidesIndex.includes("data-search="), "Astro guide cards should expose searchable text");
assert.ok(astroGuidesIndex.includes('class="filter-fallback"'), "Astro guides index should explain filter fallback behavior");
assert.ok(astroGuidesIndex.includes("all guides remain listed below"), "Astro guides filter fallback should keep all content available");
assert.ok(astroGuidesIndex.includes("fallback.setAttribute('hidden', '')"), "Astro guides filter fallback should hide when JavaScript runs");
assert.ok(astroZhHomepage.includes('lang="zh-CN"'), "Astro should include a real Chinese homepage route");
assert.ok(astroZhHomepage.includes("https://flowlight.me/"), "Astro Chinese homepage should link back to the English alternate");
assert.ok(astroZhHomepage.includes("德国配偶团聚"), "Astro Chinese homepage should prioritize the Germany A1 route");
assert.ok(astroZhHomepage.includes("zhGermanyA1Guides"), "Astro Chinese homepage should use Chinese guide data");
assert.ok(!astroZhHomepage.includes("featured.map"), "Astro Chinese homepage should not pull English featured cards into the core Chinese path");
assert.ok(zhGermanyA1Hub.includes('canonicalURL={canonicalURL}'), "Chinese Germany A1 hub should set a stable canonical URL");
assert.ok(zhGermanyA1Hub.includes("Goethe A1 和 telc A1 哪个更稳"), "Chinese Germany A1 hub should answer core Chinese user questions");
assert.ok(zhGuideLayout.includes('lang="zh-CN"'), "Chinese guide layout should set zh-CN document language");
assert.ok(zhGuideLayout.includes("政策、考位、费用和证书接受范围可能变化"), "Chinese guide layout should warn that changing requirements need official checks");
[
  "german-family-reunion-language-requirement",
  "goethe-a1-vs-telc-a1",
  "goethe-a1-booking-mistakes",
  "german-a1-documents-checklist",
  "goethe-a1-30-day-study-plan",
].forEach((slug) => {
  assert.ok(zhGermanyA1Data.includes(`slug: '${slug}'`), `Chinese Germany A1 guide data should include ${slug}`);
  const page = fs.readFileSync(`src/pages/zh/guides/${slug}.astro`, "utf8");
  assert.ok(page.includes(`slug="${slug}"`), `Chinese guide page should set slug ${slug}`);
  assert.ok(page.includes("ZhGuideLayout"), `${slug} should use the Chinese guide layout`);
});
assert.ok(
  fs.readFileSync("src/pages/guides/[slug].astro", "utf8").includes("const routeHref = frontmatter.category ? `/guides/category/${frontmatter.category}/` : undefined"),
  "Astro guide pages should build a static guide category link"
);
assert.ok(
  fs.readFileSync("src/pages/guides/[slug].astro", "utf8").includes("routeHref={routeHref}"),
  "Astro guide pages should link readers back to the same route index"
);
assert.ok(
  fs.readFileSync("src/components/RelatedGuides.astro", "utf8").includes("Browse all guides in {routeLabel}"),
  "Related guides should include a same-route index link"
);
assert.ok(
  astroGlobalCss.includes(".route-backlink"),
  "Same-route guide index link should have a stable style hook"
);
assert.ok(
  !fs.readFileSync("src/pages/guides/[slug].astro", "utf8").includes("href: `/#${frontmatter.route}`"),
  "Astro guide breadcrumbs should not link to missing homepage route anchors"
);
assert.ok(astroGermanA1Timeline.includes('slug: "german-a1-exam-booking-timeline"'), "Astro should include the German A1 booking timeline guide");
assert.ok(astroGermanA1Timeline.includes("Official sources last checked: 2026-07-08"), "German A1 timeline content should show source check date");
assert.ok(
  astroGermanyA1GuidePage.includes("frontmatter.category === 'germany-a1'"),
  "Germany A1 guides should receive the route-support module only inside the Germany A1 cluster"
);
[
  "Quick answer",
  "Who this guide is for",
  "Who this guide is not for",
  "What to verify officially",
  "Common mistakes",
  "Step-by-step next action",
  "Related guides",
  "Official sources",
  "Last updated",
  "Disclaimer",
].forEach((section) => {
  assert.ok(germanyA1RouteSupport.includes(section), `Germany A1 route support should include ${section}`);
});
[
  "/germany-family-reunion-a1/",
  "/guides/german-family-reunion-language-requirement/",
  "/guides/goethe-a1-vs-telc-a1/",
  "/guides/goethe-a1-booking-mistakes/",
  "/guides/german-a1-documents-checklist/",
  "/guides/goethe-a1-speaking-topics/",
  "/guides/goethe-a1-listening-practice/",
  "/guides/german-a1-family-reunion-faq/",
].forEach((href) => {
  assert.ok(germanyA1RouteSupport.includes(href), `Germany A1 route support should link to ${href}`);
});
assert.ok(goetheA1FeesGuide.includes("The useful answer is not one number"), "Goethe A1 fees should teach readers to verify the live local fee");
assert.ok(goetheA1FeesGuide.includes('title: "Goethe A1 exam fees: check your local price"'), "Goethe A1 fees should use a decision-focused search title");
assert.ok(goetheA1FeesGuide.includes("refund and rescheduling rules"), "Goethe A1 fees should cover payment-policy checks");
assert.ok(goetheA1FeesGuide.includes("/guides/goethe-a1-test-centers/"), "Goethe A1 fees should lead to test-centre verification");
assert.ok(goetheA1TestCentersGuide.includes("Centre-selection checklist"), "Goethe A1 test centres should provide a selection checklist");
assert.ok(goetheA1TestCentersGuide.includes('title: "Goethe A1 test centers: verify an official exam centre"'), "Goethe A1 test centres should use an official-centre search title");
assert.ok(goetheA1TestCentersGuide.includes("/guides/german-a1-documents-checklist/"), "Goethe A1 test centres should lead to document checks");
assert.ok(goetheA1RetakeGuide.includes("Five things to check first"), "Goethe A1 retake should start with score and local-policy checks");
assert.ok(goetheA1RetakeGuide.includes('title: "Goethe A1 retake: plan your next attempt"'), "Goethe A1 retake should use an action-focused search title");
assert.ok(goetheA1RetakeGuide.includes("Two weeks:"), "Goethe A1 retake should include a short recovery plan");
assert.ok(goetheA1RetakeGuide.includes("/guides/goethe-a1-speaking-topics/"), "Goethe A1 retake should lead to targeted speaking practice");
assert.ok(germanA1DocumentsGuide.includes("Keep three document moments separate"), "German A1 documents should distinguish booking, test-day, and visa stages");
assert.ok(germanA1DocumentsGuide.includes('title: "German A1 documents checklist: booking, test day, visa"'), "German A1 documents should use a stage-specific search title");
assert.ok(germanA1DocumentsGuide.includes("/guides/german-family-reunion-language-requirement/"), "German A1 documents should return readers to the requirement check");
assert.ok(goetheA1SpeakingGuide.includes("Practise abilities, not predicted questions"), "Goethe A1 speaking should avoid question prediction");
assert.ok(goetheA1SpeakingGuide.includes('title: "Goethe A1 speaking topics: safe practice plan"'), "Goethe A1 speaking should use a safe-practice search title");
assert.ok(goetheA1SpeakingGuide.includes("Seven-day speaking reset"), "Goethe A1 speaking should include a focused practice plan");
assert.ok(goetheA1SpeakingGuide.includes("/guides/goethe-a1-retake-policy/"), "Goethe A1 speaking should support retake planning");
assert.ok(astroGermanyA1Hub.includes("Five core decision guides"), "Germany A1 hub should expose the five core decision guides near the route overview");
[
  "/guides/goethe-a1-fees-by-country/",
  "/guides/goethe-a1-test-centers/",
  "/guides/goethe-a1-retake-policy/",
  "/guides/german-a1-documents-checklist/",
  "/guides/goethe-a1-speaking-topics/",
].forEach((href) => {
  assert.ok(astroGermanyA1Hub.includes(href), `Germany A1 hub should link to core decision guide ${href}`);
});
assert.ok(astroTcfCanadaVsTef.includes('category: "canada"'), "TCF Canada vs TEF should appear in the Canada filter");
assert.ok(astroTcfIrn.includes('category: "france"'), "TCF IRN should appear in the France filter");
assert.ok(!astroTcfCanadaVsTef.includes("canada-france"), "TCF Canada vs TEF should not use the old mixed category");
assert.ok(!astroTcfIrn.includes("canada-france"), "TCF IRN should not use the old mixed category");
assert.ok(astroTcfCanadaVsTef.includes('related: ["tef-canada-immigration"]'), "TCF Canada vs TEF should link to TEF Canada");
assert.ok(astroTcfIrn.includes('related: ["delf-b1-b2-french-work-study"]'), "TCF IRN should link to the French DELF guide");
assert.ok(fs.readFileSync("src/content/guides/ielts-ukvi-uk-visa.md", "utf8").includes('related: ["languagecert-selt-uk-visa"]'), "IELTS UKVI should link to LanguageCert SELT");
for (const slug of astroGoetheB1DepthSlugs) {
  const guide = fs.readFileSync(`src/content/guides/${slug}.md`, "utf8");
  assert.ok(guide.includes(`slug: "${slug}"`), `Astro should include ${slug}`);
  assert.ok(guide.includes("Goethe-Zertifikat B1 official exam page"), `${slug} should cite the official Goethe B1 source`);
  assert.ok(guide.includes("Official sources last checked: 2026-07-04"), `${slug} should show source check date`);
}
const heroStart = homepage.indexOf('<section class="hero">');
const heroEnd = homepage.indexOf("</section>", heroStart);
const heroMarkup = homepage.slice(heroStart, heroEnd);

assert.ok(heroMarkup.includes('id="hero-finder"'), "hero should contain the route finder card");
assert.ok(heroMarkup.includes('id="path-result"'), "route recommendation result should render above the fold");
assert.ok(
  homepage.indexOf('id="hero-finder"') < homepage.indexOf('id="guide-count"'),
  "route finder should appear before coverage metrics"
);
assert.ok(homepage.includes('id="language-toggle"'), "homepage should expose a language toggle");
assert.ok(homepage.includes('data-i18n="heroHeadline"'), "hero headline should be translatable");
assert.ok(homepage.includes('hreflang="zh-CN"'), "homepage should link to the Chinese version with hreflang");
assert.ok(homepage.includes('id="hero-search"'), "homepage should include a hero search box");
assert.ok(homepage.includes('id="waitlist-message"'), "waitlist form should expose user feedback");
assert.ok(homepage.includes('data-i18n="footerDisclaimer"'), "homepage should include a launch-safe disclaimer");
assert.ok(
  homepage.includes('href="germany-family-reunion-a1.html"'),
  "homepage should link to the Germany family reunion A1 topic hub"
);
assert.ok(
  homepage.includes("first reusable route template"),
  "homepage should frame Germany A1 as the reusable route template"
);
assert.ok(
  homepage.includes('id="germany-a1"'),
  "homepage should expose a Germany A1 anchor for guide backlinks"
);

const germanyHub = fs.readFileSync("germany-family-reunion-a1.html", "utf8");
const germanA1DecisionHelper = fs.readFileSync("do-i-need-german-a1.html", "utf8");
const zhHomepage = fs.readFileSync("zh/index.html", "utf8");
assert.ok(zhHomepage.includes('lang="zh-CN"'), "Chinese homepage should use zh-CN lang");
assert.ok(zhHomepage.includes("VisaLang 帮助用户"), "Chinese homepage should have native Chinese positioning copy");
assert.ok(zhHomepage.includes('hreflang="en"'), "Chinese homepage should link back to English with hreflang");
const germanyHubJsonLd = [...germanyHub.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) =>
  JSON.parse(match[1].trim())
);
assert.ok(
  germanyHub.includes("Germany A1 for family reunion: complete route guide"),
  "Germany hub should state the focused launch route"
);
assert.ok(germanyHub.includes('rel="canonical"'), "Germany hub should include a canonical URL");
assert.ok(germanyHub.includes("Official sources"), "Germany hub should include official sources");
assert.ok(germanyHub.includes("Quick answer"), "Germany hub should include a quick answer card");
assert.ok(germanyHub.includes("Official source checked"), "Germany hub should include official-source cards");
assert.ok(germanyHub.includes("Germany A1 pillar and cluster guides"), "Germany hub should frame guides as pillar and cluster content");
assert.ok(
  germanyHub.includes("guides/goethe-a1-germany-family-reunion.html"),
  "Germany hub should link to the main Goethe A1 guide"
);
assert.ok(
  germanyHub.includes("guides/german-family-reunion-language-requirement.html"),
  "Germany hub should link to the language-requirement guide"
);
assert.ok(
  germanyHub.includes("do-i-need-german-a1.html"),
  "Germany hub should link to the German A1 decision helper"
);
assert.ok(
  germanyHub.includes("Reusable route template"),
  "Germany hub should include a reusable route template section"
);
[
  "Audience and outcome",
  "Official rule check",
  "Accepted exam map",
  "Booking and document plan",
  "Safe preparation path",
  "Update and expansion rule",
].forEach((section) => {
  assert.ok(germanyHub.includes(section), `Germany route template should include ${section}`);
});
assert.ok(germanyHub.includes("Germany A1 FAQ"), "Germany hub should include a reader-facing FAQ section");
assert.ok(germanyHub.includes("Can I use VisaLang instead of official sources?"), "Germany FAQ should reinforce official-source use");
const faqSchema = germanyHubJsonLd.find((item) => item["@type"] === "FAQPage");
assert.ok(faqSchema, "Germany hub should include FAQPage structured data");
assert.equal(faqSchema.mainEntity.length, 4, "Germany FAQPage should include four focused questions");
assert.ok(
  faqSchema.mainEntity.some((item) => item.name === "Can I use VisaLang instead of official sources?"),
  "FAQPage should include the official-source safety question"
);
assert.ok(germanyHub.includes("Last updated: 2026-07-04"), "Germany hub should show the current update date");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/germany-family-reunion-a1.html</loc>\n    <lastmod>2026-07-04</lastmod>"),
  "sitemap should update the Germany hub lastmod date"
);
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("https://flowlight.me/germany-family-reunion-a1.html"),
  "sitemap should include the Germany A1 topic hub"
);
assert.ok(germanA1DecisionHelper.includes('id="a1-decision-helper"'), "German A1 decision helper should expose the interactive helper");
assert.ok(germanA1DecisionHelper.includes("Official verification table"), "German A1 decision helper should include an official verification table");
assert.ok(germanA1DecisionHelper.includes("Hypothetical scenario"), "German A1 decision helper should label scenarios as hypothetical");
assert.ok(germanA1DecisionHelper.includes("BAMF family reunification"), "German A1 decision helper should cite BAMF");
assert.ok(germanA1DecisionHelper.includes("Goethe-Institut German examinations"), "German A1 decision helper should cite Goethe");
assert.ok(germanA1DecisionHelper.includes("Last updated: 2026-07-07"), "German A1 decision helper should show the current update date");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/do-i-need-german-a1.html</loc>\n    <lastmod>2026-07-07</lastmod>"),
  "sitemap should include the German A1 decision helper"
);
const goetheVsTelc = fs.readFileSync("guides/goethe-a1-vs-telc-a1.html", "utf8");
assert.ok(goetheVsTelc.includes("Decision table"), "Goethe vs telc guide should include a decision table");
assert.ok(goetheVsTelc.includes("Hypothetical scenario"), "Goethe vs telc guide should label scenarios as hypothetical");
assert.ok(goetheVsTelc.includes("Official sources last checked: 2026-07-08"), "Goethe vs telc guide should show official source check date");
assert.ok(goetheVsTelc.includes("../do-i-need-german-a1.html"), "Goethe vs telc guide should link to the A1 decision helper");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/guides/goethe-a1-vs-telc-a1.html</loc>\n    <lastmod>2026-07-08</lastmod>"),
  "sitemap should update the Goethe vs telc lastmod date"
);
const germanA1Documents = fs.readFileSync("guides/german-a1-documents-checklist.html", "utf8");
assert.ok(germanA1Documents.includes("Printable German A1 checklist"), "German A1 documents guide should include a printable checklist");
assert.ok(germanA1Documents.includes("window.print()"), "German A1 documents guide should include a print action");
assert.ok(germanA1Documents.includes("Visa file checklist"), "German A1 documents guide should include a visa-file checklist");
assert.ok(germanA1Documents.includes("Official sources last checked: 2026-07-08"), "German A1 documents guide should show official source check date");
assert.ok(germanA1Documents.includes("../do-i-need-german-a1.html"), "German A1 documents guide should link to the A1 decision helper");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/guides/german-a1-documents-checklist.html</loc>\n    <lastmod>2026-07-08</lastmod>"),
  "sitemap should update the German A1 documents checklist lastmod date"
);
const goetheSpeakingTopics = fs.readFileSync("guides/goethe-a1-speaking-topics.html", "utf8");
assert.ok(goetheSpeakingTopics.includes("Original practice prompts"), "Goethe A1 speaking guide should include original practice prompts");
assert.ok(goetheSpeakingTopics.includes("not real exam questions"), "Goethe A1 speaking guide should avoid copied real exam questions");
assert.ok(goetheSpeakingTopics.includes("Official sources last checked: 2026-07-08"), "Goethe A1 speaking guide should show official source check date");
assert.ok(goetheSpeakingTopics.includes("https://www.goethe.de/en/spr/prf/gzsd1/ueb.html"), "Goethe A1 speaking guide should link official A1 practice source");
const goetheStudyPlan = fs.readFileSync("guides/goethe-a1-30-day-study-plan.html", "utf8");
assert.ok(goetheStudyPlan.includes("Weekly plan"), "Goethe A1 study plan should include a weekly plan");
assert.ok(goetheStudyPlan.includes("Daily routine"), "Goethe A1 study plan should include a daily routine");
assert.ok(goetheStudyPlan.includes("Risk checks"), "Goethe A1 study plan should include risk checks");
assert.ok(goetheStudyPlan.includes("Official sources last checked: 2026-07-08"), "Goethe A1 study plan should show official source check date");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/guides/goethe-a1-speaking-topics.html</loc>\n    <lastmod>2026-07-08</lastmod>"),
  "sitemap should update the Goethe A1 speaking topics lastmod date"
);
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/guides/goethe-a1-30-day-study-plan.html</loc>\n    <lastmod>2026-07-08</lastmod>"),
  "sitemap should update the Goethe A1 study plan lastmod date"
);
const germanA1Timeline = fs.readFileSync("guides/german-a1-exam-booking-timeline.html", "utf8");
assert.ok(germanA1Timeline.includes('id="a1-timeline-helper"'), "German A1 timeline guide should include a timeline helper");
assert.ok(germanA1Timeline.includes("Timeline map"), "German A1 timeline guide should include a timeline map");
assert.ok(germanA1Timeline.includes("Risk table"), "German A1 timeline guide should include a risk table");
assert.ok(germanA1Timeline.includes("Hypothetical scenario"), "German A1 timeline guide should label scenarios as hypothetical");
assert.ok(germanA1Timeline.includes("Official sources last checked: 2026-07-08"), "German A1 timeline guide should show official source check date");
assert.ok(germanyHub.includes("guides/german-a1-exam-booking-timeline.html"), "Germany hub should link to the booking timeline guide");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/guides/german-a1-exam-booking-timeline.html</loc>\n    <lastmod>2026-07-08</lastmod>"),
  "sitemap should include the German A1 booking timeline guide"
);
const goetheTestCenters = fs.readFileSync("guides/goethe-a1-test-centers.html", "utf8");
assert.ok(goetheTestCenters.includes("Center checklist"), "Goethe A1 test centers guide should include a center checklist");
assert.ok(goetheTestCenters.includes("Compare centers"), "Goethe A1 test centers guide should include center comparison guidance");
assert.ok(goetheTestCenters.includes("Red flags"), "Goethe A1 test centers guide should include red flags");
assert.ok(goetheTestCenters.includes("Hypothetical scenario"), "Goethe A1 test centers guide should label scenarios as hypothetical");
assert.ok(goetheTestCenters.includes("Official sources last checked: 2026-07-08"), "Goethe A1 test centers guide should show official source check date");
assert.ok(goetheTestCenters.includes("german-a1-exam-booking-timeline.html"), "Goethe A1 test centers guide should link to the booking timeline guide");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/guides/goethe-a1-test-centers.html</loc>\n    <lastmod>2026-07-08</lastmod>"),
  "sitemap should update the Goethe A1 test centers lastmod date"
);
const goetheRetakePolicy = fs.readFileSync("guides/goethe-a1-retake-policy.html", "utf8");
assert.ok(goetheRetakePolicy.includes("Timeline risk"), "Goethe A1 retake policy should include timeline risk planning");
assert.ok(goetheRetakePolicy.includes("Retake budget table"), "Goethe A1 retake policy should include a retake budget table");
assert.ok(goetheRetakePolicy.includes("Hypothetical scenario"), "Goethe A1 retake policy should label scenarios as hypothetical");
assert.ok(goetheRetakePolicy.includes("Official sources last checked: 2026-07-08"), "Goethe A1 retake policy should show official source check date");
assert.ok(goetheRetakePolicy.includes("german-a1-exam-booking-timeline.html"), "Goethe A1 retake policy should link to the booking timeline guide");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/guides/goethe-a1-retake-policy.html</loc>\n    <lastmod>2026-07-08</lastmod>"),
  "sitemap should update the Goethe A1 retake policy lastmod date"
);
const goetheOfficialResources = fs.readFileSync("guides/goethe-a1-official-links-practice-resources.html", "utf8");
assert.ok(goetheOfficialResources.includes("Source map"), "Goethe A1 resources guide should include a source map");
assert.ok(goetheOfficialResources.includes("Resource checklist"), "Goethe A1 resources guide should include a resource checklist");
assert.ok(goetheOfficialResources.includes("Red flags"), "Goethe A1 resources guide should include red flags");
assert.ok(goetheOfficialResources.includes("leaked questions"), "Goethe A1 resources guide should warn against leaked questions");
assert.ok(goetheOfficialResources.includes("https://www.goethe.de/en/spr/prf/gzsd1/ueb.html"), "Goethe A1 resources guide should link official A1 practice source");
assert.ok(goetheOfficialResources.includes("Official sources last checked: 2026-07-08"), "Goethe A1 resources guide should show official source check date");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/guides/goethe-a1-official-links-practice-resources.html</loc>\n    <lastmod>2026-07-08</lastmod>"),
  "sitemap should update the Goethe A1 official resources lastmod date"
);
const goetheA1FamilyReunion = fs.readFileSync("guides/goethe-a1-germany-family-reunion.html", "utf8");
assert.ok(goetheA1FamilyReunion.includes("Decision path"), "Goethe A1 family reunion guide should include a decision path");
assert.ok(goetheA1FamilyReunion.includes("Booking plan"), "Goethe A1 family reunion guide should include a booking plan");
assert.ok(goetheA1FamilyReunion.includes("Preparation plan"), "Goethe A1 family reunion guide should include a preparation plan");
assert.ok(goetheA1FamilyReunion.includes("../do-i-need-german-a1.html"), "Goethe A1 family reunion guide should link to the A1 decision helper");
assert.ok(goetheA1FamilyReunion.includes("german-a1-exam-booking-timeline.html"), "Goethe A1 family reunion guide should link to the booking timeline");
assert.ok(goetheA1FamilyReunion.includes("Official sources last checked: 2026-07-08"), "Goethe A1 family reunion guide should show official source check date");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/guides/goethe-a1-germany-family-reunion.html</loc>\n    <lastmod>2026-07-08</lastmod>"),
  "sitemap should update the Goethe A1 family reunion lastmod date"
);
const zhGoetheA1FamilyReunion = fs.readFileSync("zh/guides/goethe-a1-germany-family-reunion.html", "utf8");
assert.ok(zhGoetheA1FamilyReunion.includes("决策路径"), "Chinese Goethe A1 family reunion guide should include a decision path");
assert.ok(zhGoetheA1FamilyReunion.includes("报名计划"), "Chinese Goethe A1 family reunion guide should include a booking plan");
assert.ok(zhGoetheA1FamilyReunion.includes("官方来源最近核查：2026-07-08"), "Chinese Goethe A1 family reunion guide should show source check date");
const zhGoetheOfficialResources = fs.readFileSync("zh/guides/goethe-a1-official-links-practice-resources.html", "utf8");
assert.ok(zhGoetheOfficialResources.includes("来源地图"), "Chinese Goethe A1 resources guide should include a source map");
assert.ok(zhGoetheOfficialResources.includes("资源核查清单"), "Chinese Goethe A1 resources guide should include a resource checklist");
assert.ok(zhGoetheOfficialResources.includes("泄题"), "Chinese Goethe A1 resources guide should warn against leaked questions");
assert.ok(zhGoetheOfficialResources.includes("官方来源最近核查：2026-07-08"), "Chinese Goethe A1 resources guide should show source check date");
const zhGoetheVsTelc = fs.readFileSync("zh/guides/goethe-a1-vs-telc-a1.html", "utf8");
assert.ok(zhGoetheVsTelc.includes("选择对比表"), "Chinese Goethe vs telc guide should include a decision table");
assert.ok(zhGoetheVsTelc.includes("报名风险清单"), "Chinese Goethe vs telc guide should include booking risk checks");
assert.ok(zhGoetheVsTelc.includes("官方来源最近核查：2026-07-08"), "Chinese Goethe vs telc guide should show source check date");
const zhGermanA1Documents = fs.readFileSync("zh/guides/german-a1-documents-checklist.html", "utf8");
assert.ok(zhGermanA1Documents.includes("可打印德语 A1 清单"), "Chinese German A1 documents guide should include a printable checklist");
assert.ok(zhGermanA1Documents.includes("签证材料"), "Chinese German A1 documents guide should include visa-file checks");
assert.ok(zhGermanA1Documents.includes("官方来源最近核查：2026-07-08"), "Chinese German A1 documents guide should show source check date");

const guideFiles = fs.readdirSync("guides").filter((file) => file.endsWith(".html"));
assert.ok(guideFiles.length >= 38, `guide count should be >= 22, got ${guideFiles.length}`);

for (const file of guideFiles) {
  const guide = fs.readFileSync(`guides/${file}`, "utf8");
  assert.ok(/Last updated:\s*\d{4}-\d{2}-\d{2}/.test(guide), `${file} needs a Last updated date`);
  assert.ok(guide.includes("Official sources"), `${file} needs official sources`);
	  assert.ok(/goethe.de|testdaf.de|telc.net|cils.unistrasi.it|cvcl.it|dante.global|inburgeren.nl|cve.nl|caple.letras.ulisboa.pt|cervantes.es|siele.org|ielts.org|languagecert.org|gov.uk|oph.fi|migri.fi|lefrancaisdesaffaires.fr|france-education-international/.test(guide), `${file} needs an official German exam source link`);
}

assert.ok(
  homepage.includes('id="guide-groups"'),
  "homepage should have the dynamic guide-groups section"
);

const readme = fs.readFileSync("README.md", "utf8");
const monetizationPlan = fs.readFileSync("docs/MONETIZATION_ROADMAP.md", "utf8");
const trafficPlan = fs.readFileSync("docs/TRAFFIC_SITE_ROADMAP.md", "utf8");
const adNetworkGuide = fs.readFileSync("docs/AD_NETWORK_ONBOARDING.md", "utf8");
assert.ok(readme.includes("docs/MONETIZATION_ROADMAP.md"), "README should link to the monetization roadmap");
assert.ok(readme.includes("docs/TRAFFIC_SITE_ROADMAP.md"), "README should link to the traffic-site roadmap");
assert.ok(readme.includes("docs/AD_NETWORK_ONBOARDING.md"), "README should link to the ad network onboarding guide");
[
  "Affiliate and referral revenue",
  "Lead generation",
  "Paid digital products",
  "Paid mock practice",
  "Newsletter sponsorship",
  "B2B partnerships",
  "Data-backed expansion",
].forEach((route) => {
  assert.ok(monetizationPlan.includes(route), `monetization roadmap should include ${route}`);
});
assert.ok(monetizationPlan.includes("Do not monetize by selling certainty"), "monetization roadmap should preserve trust boundaries");
assert.ok(monetizationPlan.includes("Germany A1 first"), "monetization roadmap should keep Germany A1 as the first commercial test");
[
  "Traffic-site thesis",
  "Germany A1 SEO sample route",
  "UK SELT route",
  "Canada TEF/TCF route",
  "100-page long-tail plan",
  "Ad network timing",
].forEach((section) => {
  assert.ok(trafficPlan.includes(section), `traffic-site roadmap should include ${section}`);
});
[
  "Google AdSense first",
  "Before applying",
  "Apply to AdSense",
  "Add ads.txt",
  "Ad placement rules",
  "Premium network later",
].forEach((section) => {
  assert.ok(adNetworkGuide.includes(section), `ad network guide should include ${section}`);
});
assert.ok(adNetworkGuide.includes("Do not click your own ads"), "ad network guide should warn against invalid clicks");

console.log("site data and tool logic checks passed");
