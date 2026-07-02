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
assert.equal(i18n.en.heroHeadline, "Find the right language exam for your next move.");
assert.equal(i18n.zh.heroHeadline, "找到适合签证、永居或入籍的语言考试。");
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
  homepage.indexOf('id="hero-finder"') < homepage.indexOf('id="exam-count"'),
  "route finder should appear before coverage stats"
);
assert.ok(homepage.includes('id="language-toggle"'), "homepage should expose a language toggle");
assert.ok(homepage.includes('data-i18n="heroHeadline"'), "hero headline should be translatable");
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
const germanyHubJsonLd = [...germanyHub.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((match) =>
  JSON.parse(match[1].trim())
);
assert.ok(
  germanyHub.includes("Germany family reunion Goethe A1"),
  "Germany hub should state the focused launch route"
);
assert.ok(germanyHub.includes('rel="canonical"'), "Germany hub should include a canonical URL");
assert.ok(germanyHub.includes("Official sources"), "Germany hub should include official sources");
assert.ok(
  germanyHub.includes("guides/goethe-a1-germany-family-reunion.html"),
  "Germany hub should link to the main Goethe A1 guide"
);
assert.ok(
  germanyHub.includes("guides/german-family-reunion-language-requirement.html"),
  "Germany hub should link to the language-requirement guide"
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
assert.ok(germanyHub.includes("Last updated: 2026-07-02"), "Germany hub should show the current update date");
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("<loc>https://flowlight.me/germany-family-reunion-a1.html</loc>\n    <lastmod>2026-07-02</lastmod>"),
  "sitemap should update the Germany hub lastmod date"
);
assert.ok(
  fs.readFileSync("sitemap.xml", "utf8").includes("https://flowlight.me/germany-family-reunion-a1.html"),
  "sitemap should include the Germany A1 topic hub"
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
assert.ok(readme.includes("docs/MONETIZATION_ROADMAP.md"), "README should link to the monetization roadmap");
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

console.log("site data and tool logic checks passed");
