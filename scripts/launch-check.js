// VisaLang launch readiness check.
// Verifies the "Definition of Ready For Public Launch" from docs/PM_AUDIT.md,
// plus automated checks for things that do not require the user's accounts.
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

// --- Domain: not automatable (user buys domain). Warn about placeholder. ---
const indexHtml = read("index.html");
const placeholderDomain = /visalang\.example/i.test(indexHtml);
if (placeholderDomain) {
  warn("Domain: still a placeholder (visalang.example). Replace with your real domain before launch (canonical, sitemap, JSON-LD).");
} else {
  pass("Domain: real domain found in homepage (no placeholder).");
}

// --- Email form connected: detect the Formspree placeholder. ---
const formPlaceholder = /YOUR_FORM_ID/.test(indexHtml);
if (formPlaceholder) {
  warn("Email form: Formspree ID is still the placeholder (YOUR_FORM_ID). Replace it before launch; form currently runs in demo mode.");
} else {
  pass("Email form: Formspree ID configured.");
}

// --- Analytics: not installed yet (informational). ---
const hasAnalytics = /google-analytics|gtag|googletagmanager|plausible|fathom|matomo/i.test(indexHtml);
if (hasAnalytics) pass("Analytics: snippet detected in homepage.");
else warn("Analytics: no snippet detected yet (install before public launch).");

// --- Legal & trust pages exist. ---
const requiredPages = ["about.html", "contact.html", "privacy-policy.html", "terms.html", "cookie-policy.html", "editorial-policy.html", "affiliate-disclosure.html"];
for (const p of requiredPages) {
  if (exists(p)) pass(`Legal page exists: ${p}`);
  else fail(`Legal page missing: ${p}`);
}

// --- At least 10 verified guide pages, each with official sources + Last Updated. ---
const guideDir = path.join(root, "guides");
const guideFiles = fs.readdirSync(guideDir).filter((f) => f.endsWith(".html"));
if (guideFiles.length < 10) {
  fail(`Guide pages: only ${guideFiles.length}, need at least 10.`);
} else {
  pass(`Guide pages: ${guideFiles.length} live (>= 10).`);
}
for (const f of guideFiles) {
  const g = fs.readFileSync(path.join(guideDir, f), "utf8");
  if (!/Official sources/.test(g)) fail(`Guide missing "Official sources": ${f}`);
  if (!/Last updated:\s*\d{4}-\d{2}-\d{2}/.test(g)) fail(`Guide missing Last updated date: ${f}`);
  if (!/https:\/\/www\.goethe\.de\/en\/spr\/prf\.html/.test(g)) fail(`Guide missing Goethe source link: ${f}`);
}

// --- SEO files. ---
if (exists("robots.txt")) pass("robots.txt exists.");
else fail("robots.txt missing.");
if (exists("sitemap.xml")) pass("sitemap.xml exists.");
else fail("sitemap.xml missing.");
if (/Sitemap:\s*\S+\/sitemap\.xml/.test(read("robots.txt"))) pass("robots.txt references sitemap.");
else fail("robots.txt does not reference sitemap.");

// --- JSON-LD validity on homepage + every guide. ---
function checkJsonLd(file, rel) {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m, found = false;
  while ((m = re.exec(file)) !== null) {
    found = true;
    try { JSON.parse(m[1].trim()); }
    catch (e) { fail(`Invalid JSON-LD in ${rel}: ${e.message}`); return; }
  }
  if (!found) fail(`No JSON-LD found in ${rel}`);
}
checkJsonLd(indexHtml, "index.html");
for (const f of guideFiles) {
  checkJsonLd(fs.readFileSync(path.join(guideDir, f), "utf8"), `guides/${f}`);
}

// --- Dead internal links: every href to a local .html/.xml/.txt must resolve. ---
const allHtml = ["index.html", ...requiredPages.filter(exists), ...guideFiles.map((f) => `guides/${f}`)];
const linkRe = /href="([^"]+)"/g;
const broken = [];
for (const rel of allHtml) {
  const file = read(rel);
  const baseDir = path.dirname(rel);
  let m;
  while ((m = linkRe.exec(file)) !== null) {
    let href = m[1];
    if (/^(https?:|mailto:|#|data:)/.test(href)) continue; // external / anchor / data
    const clean = href.split("#")[0].split("?")[0];
    if (!clean) continue;
    const target = path.join(root, baseDir, clean);
    if (!fs.existsSync(target)) broken.push(`${rel} -> ${href}`);
  }
}
if (broken.length === 0) pass("Internal links: no broken local links found.");
else fail(`Broken internal links (${broken.length}): ${broken.slice(0, 5).join(", ")}${broken.length > 5 ? " …" : ""}`);

// --- Affiliate disclosure link present in footer. ---
if (/affiliate-disclosure\.html/.test(indexHtml)) pass("Footer links to affiliate disclosure.");
else fail("Footer does not link to affiliate disclosure.");

// --- Report ---
const errors = checks.filter((c) => !c.ok);
const warnings = checks.filter((c) => c.warn);
console.log("\n=== VisaLang Launch Readiness ===\n");
for (const c of checks) {
  const mark = c.warn ? "!" : c.ok ? "✓" : "✗";
  console.log(`  ${mark} ${c.msg}`);
}
console.log("\n--- Summary ---");
console.log(`  Pass: ${checks.filter((c) => c.ok && !c.warn).length}`);
console.log(`  Warn: ${warnings.length}`);
console.log(`  Fail: ${errors.length}`);

if (errors.length === 0) {
  console.log("\n  READY: all automated checks pass. Warnings are items only you can complete (domain, analytics, Search Console).");
  process.exit(0);
} else {
  console.log("\n  NOT READY: fix the ✗ items above before launch.");
  process.exit(1);
}
