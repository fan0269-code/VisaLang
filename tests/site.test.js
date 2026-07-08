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

assert.doesNotThrow(() => new Function(appScript), "app.js should parse without syntax errors");
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
