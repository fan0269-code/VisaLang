const assert = require('node:assert/strict');
const fs = require('node:fs');

const page = fs.readFileSync('src/pages/404.astro', 'utf8');
const zhPage = fs.readFileSync('src/pages/zh/404.astro', 'utf8');
const redirects = fs.readFileSync('public/_redirects', 'utf8');
const css = fs.readFileSync('src/styles/global.css', 'utf8');

assert.match(page, /noindex=\{true\}/, '404 remains excluded from indexing');
assert.match(page, /enableAds=\{false\}/, '404 remains advertising-free');
assert.match(zhPage, /noindex=\{true\}/, 'Chinese 404 remains excluded from indexing');
assert.match(zhPage, /enableAds=\{false\}/, 'Chinese 404 remains advertising-free');
assert.match(page, /<form[^>]+action="\/guides\/"[^>]+method="get"/, '404 exposes a progressively enhanced guide search');
assert.match(page, /name="q"[^>]+type="search"/, 'guide search uses the Guide Library query parameter');
assert.match(page, /<noscript>[\s\S]+\{copy\.fallbackLead\}[\s\S]+href="\/guides\/"[\s\S]+<\/noscript>/, '404 states the unfiltered Guide Library fallback when JavaScript is unavailable');
assert.match(page, /lang="en"/, 'English 404 declares its document language');
assert.doesNotMatch(page, /Astro\.url\.pathname/, '404 no longer relies on a build-time path check that a static 404.html cannot satisfy');
assert.match(page, /href="\/zh\/"[^>]*lang="zh-CN"/, 'English 404 marks the Chinese entry link as Chinese');
assert.match(zhPage, /lang="zh-CN"/, 'Chinese 404 declares its document language');
assert.match(zhPage, /href: '\/zh\/tools\/route-finder\/'/, 'Chinese 404 offers the Chinese Route Finder recovery path');
assert.match(zhPage, /href="\/"[^>]*lang="en"/, 'Chinese 404 marks the English entry link as English');
assert.match(page, /href: '\/tools\/route-finder\/'/, '404 offers Route Finder as the unsupported-route recovery path');
assert.match(page, /href="\/guides\/"/, '404 offers the full primary-discovery guide library');
assert.match(page, /href: '\/'/, '404 retains a route back to the homepage');
assert.match(page, /aria-label=\{copy\.optionsAria\}/, '404 recovery links have a localized navigation label');
assert.match(css, /\.not-found-search input[^}]+min-height:\s*48px/s, '404 search input has a robust touch target');
assert.match(css, /\.not-found-option[^}]+overflow-wrap:\s*anywhere/s, '404 recovery actions tolerate long translated labels');
assert.doesNotMatch(css.match(/\.not-found-page[\s\S]+?\.home-view\s*\{/)[0], /var\(--od-/, '404 components consume semantic design tokens');

const zhRuleIndex = redirects.indexOf('/zh/* /zh/404/index.html 404');
const catchAllIndex = redirects.indexOf('/* /404.html 404');
assert.ok(zhRuleIndex > -1, 'hosting maps unmatched Chinese routes to the Chinese 404');
assert.ok(catchAllIndex > -1 && zhRuleIndex < catchAllIndex, 'the Chinese 404 rule precedes the catch-all 404 rule');
assert.match(fs.readFileSync('deploy/nginx-vhost-template.conf', 'utf8'), /location \/zh\/ \{[\s\S]*error_page 404 \/zh\/404\/index\.html;/, 'nginx serves the Chinese 404 for unmatched Chinese routes');

if (fs.existsSync('dist/404.html')) {
  const builtEn = fs.readFileSync('dist/404.html', 'utf8');
  assert.match(builtEn, /<html[^>]+lang="en"/i, 'built English 404 is really English');
  const builtZhPath = ['dist/zh/404/index.html', 'dist/zh/404.html'].find((candidate) => fs.existsSync(candidate));
  assert.ok(builtZhPath, 'a built Chinese 404 artifact exists');
  const builtZh = fs.readFileSync(builtZhPath, 'utf8');
  assert.match(builtZh, /<html[^>]+lang="zh-CN"/i, 'built Chinese 404 declares zh-CN');
  assert.match(builtZh, /这个页面已偏离路线/, 'built Chinese 404 contains Chinese recovery copy');
}

console.log('FAN-273 404 recovery contract passed');
