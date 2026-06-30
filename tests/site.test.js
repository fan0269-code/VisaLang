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

const guideFiles = fs.readdirSync("guides").filter((file) => file.endsWith(".html"));
assert.ok(guideFiles.length >= 22, `guide count should be >= 22, got ${guideFiles.length}`);

for (const file of guideFiles) {
  const guide = fs.readFileSync(`guides/${file}`, "utf8");
  assert.ok(guide.includes("Last updated: 2026-06-30"), `${file} needs a Last updated date`);
  assert.ok(guide.includes("Official sources"), `${file} needs official sources`);
	  assert.ok(/goethe\.de\/en\/spr\/prf|testdaf\.de|telc\.net\/en\/language-examinations/.test(guide), `${file} needs an official German exam source link`);
}

assert.ok(
  homepage.includes("guides/goethe-a1-germany-family-reunion.html"),
  "homepage should link to Germany A1 guide pages"
);

console.log("site data and tool logic checks passed");
