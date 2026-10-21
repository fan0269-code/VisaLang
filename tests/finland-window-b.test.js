const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');

const primarySlug = 'yki-finnish-citizenship';
const retiredSlug = 'yki-vs-other-finland-options';
const primaryPath = `src/content/guides/${primarySlug}.md`;
const retiredPath = `src/content/guides/${retiredSlug}.md`;
const read = (file) => fs.readFileSync(file, 'utf8');
const field = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};

assert.ok(fs.existsSync(primaryPath), 'the consolidated Finland guide remains available');
assert.ok(!fs.existsSync(retiredPath), 'the duplicate Finland comparison source is retired after consolidation');

const primary = read(primaryPath);
assert.equal(field(primary, 'contentStatus'), 'verification-pending', 'the consolidated guide remains verification-pending');
assert.equal(field(primary, 'sourceReviewStatus'), 'reviewed', 'the controlled source-review state is preserved');
assert.equal(field(primary, 'sourceReviewedAt'), '2026-07-29', 'the guide records the current official-source recheck');
assert.equal(field(primary, 'nextGuideSlug'), '', 'the consolidated Finland guide is terminal');
assert.equal(field(primary, 'noindex'), 'true', 'the still-pending Finland guide declares noindex');
assert.equal(field(primary, 'adsEligible'), 'false', 'the still-pending Finland guide is not advertising-eligible');
assert.match(primary, /Migri.*(?:decides|final authority)|final authority.*Migri/is, 'the guide identifies Migri as the final authority');
assert.match(primary, /YKI.*(?:one|several).*evidence|one.*evidence.*YKI/is, 'the guide does not present YKI as the only evidence path');
assert.match(primary, /oral.*written|speaking.*writing|listening.*writing|reading.*speaking/is, 'the guide records the current YKI subtest-combination check');
assert.match(primary, /evidence record|verification record|save.*record/is, 'the guide gives the reader a reusable verification record');
assert.match(primary, /Common mistakes/i, 'the guide includes Finland-specific common mistakes');
assert.match(primary, /Next action/i, 'the guide ends with a concrete next action');
assert.doesNotMatch(primary, /€\s?\d+|\b\d+\s?(?:hours?|days?|weeks?|months?)\b|guaranteed?\s+(?:citizenship|approval|outcome|result)|always accepted|YKI is (?:the )?(?:only|default)/i, 'the guide avoids fixed dynamic facts, guarantees, and a default-YKI shortcut');

const redirects = read('public/_redirects');
assert.ok(
  redirects.includes(`/guides/${retiredSlug}/ /guides/${primarySlug}/ 301`),
  'the static redirect manifest sends the retired Finland URL to the consolidated guide',
);
assert.ok(
  redirects.includes(`/guides/${retiredSlug}.html /guides/${primarySlug}/ 301`),
  'the static redirect manifest sends the retired legacy HTML URL directly to the consolidated guide',
);

const nginxRedirects = read('deploy/legacy-redirects.conf');
assert.ok(
  nginxRedirects.includes(`location = /guides/${retiredSlug}/ { return 301 https://visalang.org/guides/${primarySlug}/$is_args$args; }`),
  'the production Nginx redirect preserves query parameters on the retired Finland URL',
);
assert.ok(
  nginxRedirects.includes(`location = /guides/${retiredSlug}.html { return 301 https://visalang.org/guides/${primarySlug}/$is_args$args; }`),
  'the production Nginx redirect sends the retired HTML URL directly to the consolidated guide',
);

const taxonomy = read('src/data/guide-taxonomy.ts');
assert.match(
  taxonomy,
  /\{ name: 'Finland',[^\n]*adsEligible: false, noindex: true \}/,
  'the two-page-derived Finland category remains advertising-free and becomes noindex',
);

const astroConfig = read('astro.config.mjs');
assert.ok(astroConfig.includes("'/guides/category/finland/'"), 'the Finland category is excluded from the generated sitemap');

execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });

const sitemap = read('dist/sitemap-0.xml');
const primaryUrl = `<loc>https://visalang.org/guides/${primarySlug}/</loc>`;
const retiredUrl = `<loc>https://visalang.org/guides/${retiredSlug}/</loc>`;
assert.ok(!sitemap.includes(primaryUrl), 'the still-pending consolidated Finland guide is absent from the sitemap');
assert.ok(!sitemap.includes(retiredUrl), 'the retired Finland URL is absent from the sitemap');
assert.ok(!sitemap.includes('<loc>https://visalang.org/guides/category/finland/</loc>'), 'the Finland category is absent from the sitemap');

const primaryHtml = read(`dist/guides/${primarySlug}/index.html`);
const categoryHtml = read('dist/guides/category/finland/index.html');
assert.ok(primaryHtml.includes(`<link rel="canonical" href="https://visalang.org/guides/${primarySlug}/">`), 'the consolidated guide keeps a self-canonical');
assert.ok(primaryHtml.includes('<meta name="robots" content="noindex,follow">'), 'the still-pending consolidated guide renders noindex');
assert.ok(!primaryHtml.includes('pagead2.googlesyndication.com'), 'the still-pending consolidated guide does not load AdSense');
assert.ok(!primaryHtml.includes('<small>Next guide</small>'), 'the consolidated guide does not link to the retired page');
assert.ok(categoryHtml.includes('<meta name="robots" content="noindex,follow">'), 'the Finland category renders noindex');
assert.ok(!categoryHtml.includes('pagead2.googlesyndication.com'), 'the Finland category remains advertising-free');

// Dual-stack root/guides HTML and root sitemap.xml are deleted; old .html URLs
// are handled by public/_redirects + deploy/legacy-redirects.conf (asserted above).
assert.ok(!fs.existsSync(`guides/${retiredSlug}.html`), 'retired Finland legacy HTML is removed from the repo');
assert.ok(!fs.existsSync(`guides/${primarySlug}.html`), 'pending Finland primary legacy HTML is removed from the repo');
assert.ok(!fs.existsSync('sitemap.xml'), 'misleading root sitemap.xml is removed (Astro emits dist/sitemap-index.xml)');
assert.ok(!fs.existsSync('guides'), 'legacy guides/ HTML directory is removed');

console.log('Finland window B consolidation rules passed');
