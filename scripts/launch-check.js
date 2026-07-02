// VisaLang launch readiness check.
// Run: npm run launch-check
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const exists = (rel) => fs.existsSync(path.join(root, rel));

const checks = [];
const fail = (msg) => checks.push({ ok: false, msg });
const pass = (msg) => checks.push({ ok: true, msg });
const warn = (msg) => checks.push({ ok: true, warn: true, msg });

// Domain
const indexHtml = read("index.html");
if (/visalang\.example/i.test(indexHtml)) {
  warn("Domain: still a placeholder. Replace with your real domain.");
} else {
  pass("Domain: real domain found (no placeholder).");
}

// Email form
if (/id="waitlist-form"/.test(indexHtml)) { pass("Email form: present."); } else { fail("Email form: missing."); }

// Analytics
if (/google-analytics|gtag|plausible|fathom|matomo/i.test(indexHtml)) {
  pass("Analytics: snippet detected.");
} else {
  warn("Analytics: no snippet yet.");
}

// Legal pages
var requiredPages = ["about.html", "contact.html", "privacy-policy.html", "terms.html", "cookie-policy.html", "editorial-policy.html", "affiliate-disclosure.html"];
for (var pi = 0; pi < requiredPages.length; pi++) {
  var pn = requiredPages[pi];
  if (exists(pn)) pass("Legal page: " + pn);
  else fail("Legal page missing: " + pn);
}
var topicPages = ["germany-family-reunion-a1.html"];
for (var ti = 0; ti < topicPages.length; ti++) {
  var tn = topicPages[ti];
  if (exists(tn)) pass("Topic page: " + tn);
  else fail("Topic page missing: " + tn);
}

// Guide pages
var guideDir = path.join(root, "guides");
var guideFiles = fs.readdirSync(guideDir).filter(function(f) { return f.endsWith(".html"); });
if (guideFiles.length < 38) {
  fail("Guide count: " + guideFiles.length + " (need >= 22)");
} else {
  pass("Guide pages: " + guideFiles.length + " (>= 38)");
}
var srcRe = /goethe.de|testdaf.de|telc.net|cils.unistrasi.it|cvcl.it|dante.global|inburgeren.nl|cve.nl|caple.letras.ulisboa.pt|cervantes.es|siele.org|ielts.org|languagecert.org|gov.uk|oph.fi|migri.fi|lefrancaisdesaffaires.fr|france-education-international/;
for (var gi = 0; gi < guideFiles.length; gi++) {
  var gf = guideFiles[gi];
  var gc = fs.readFileSync(path.join(guideDir, gf), "utf8");
  if (!/Official sources/.test(gc)) fail("Missing Official sources: " + gf);
  if (!/Last updated:\s*\d{4}-\d{2}-\d{2}/.test(gc)) fail("Missing Last updated: " + gf);
  if (!srcRe.test(gc)) fail("Missing German exam link: " + gf);
}

// SEO
if (exists("robots.txt")) pass("robots.txt exists."); else fail("robots.txt missing.");
if (exists("sitemap.xml")) pass("sitemap.xml exists."); else fail("sitemap.xml missing.");
if (/Sitemap:\s*\S+\/sitemap\.xml/.test(read("robots.txt"))) pass("robots.txt references sitemap.");
else fail("robots.txt missing sitemap reference.");

// JSON-LD
function checkJsonLd(file, label) {
  var re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  var m, found = false;
  while ((m = re.exec(file)) !== null) {
    found = true;
    try { JSON.parse(m[1].trim()); } catch (e) { fail("Invalid JSON-LD: " + label); return; }
  }
  if (!found) fail("No JSON-LD: " + label);
}
checkJsonLd(indexHtml, "index.html");
for (var tj = 0; tj < topicPages.length; tj++) {
  var tm = topicPages[tj];
  if (exists(tm)) checkJsonLd(read(tm), tm);
}
for (var gj = 0; gj < guideFiles.length; gj++) {
  var gk = guideFiles[gj];
  checkJsonLd(fs.readFileSync(path.join(guideDir, gk), "utf8"), "guides/" + gk);
}

// Dead links
var allHtml = ["index.html"].concat(requiredPages.filter(exists)).concat(topicPages.filter(exists)).concat(guideFiles.map(function(f) { return "guides/" + f; }));
var linkRe = /href="([^"]+)"/g;
var broken = [];
for (var ai = 0; ai < allHtml.length; ai++) {
  var rel = allHtml[ai];
  var file = read(rel);
  var baseDir = path.dirname(rel);
  var m;
  while ((m = linkRe.exec(file)) !== null) {
    var href = m[1];
    if (/^(https?:|mailto:|#|data:)/.test(href)) continue;
    var clean = href.split("#")[0].split("?")[0];
    if (!clean) continue;
    var target = path.join(root, baseDir, clean);
    if (!fs.existsSync(target)) broken.push(rel + " -> " + href);
  }
}
if (broken.length === 0) pass("Internal links: all valid.");
else fail("Broken links (" + broken.length + "): " + broken.slice(0, 3).join(", "));

// Affiliate
if (/affiliate-disclosure\.html/.test(indexHtml)) pass("Footer: affiliate link.");
else fail("Footer: no affiliate link.");

// Report
var errors = checks.filter(function(c) { return !c.ok; });
var warnings = checks.filter(function(c) { return c.warn; });
console.log("\n=== VisaLang Launch Readiness ===\n");
for (var xi = 0; xi < checks.length; xi++) {
  var c = checks[xi];
  console.log("  " + (c.warn ? "!" : c.ok ? "✓" : "✗") + " " + c.msg);
}
console.log("\n--- Summary ---");
console.log("  Pass: " + checks.filter(function(c) { return c.ok && !c.warn; }).length);
console.log("  Warn: " + warnings.length);
console.log("  Fail: " + errors.length);
if (errors.length === 0) {
  console.log("\n  READY.");
  process.exit(0);
} else {
  console.log("\n  NOT READY.");
  process.exit(1);
}
