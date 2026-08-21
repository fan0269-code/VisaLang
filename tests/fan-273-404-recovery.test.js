const assert = require('node:assert/strict');
const fs = require('node:fs');

const page = fs.readFileSync('src/pages/404.astro', 'utf8');
const css = fs.readFileSync('src/styles/global.css', 'utf8');

assert.match(page, /noindex=\{true\}/, '404 remains excluded from indexing');
assert.match(page, /enableAds=\{false\}/, '404 remains advertising-free');
assert.match(page, /<form[^>]+action="\/guides\/"[^>]+method="get"/, '404 exposes a progressively enhanced guide search');
assert.match(page, /name="q"[^>]+type="search"/, 'guide search uses the Guide Library query parameter');
assert.match(page, /href="\/tools\/route-finder\/"/, '404 offers Route Finder as the unsupported-route recovery path');
assert.match(page, /href="\/guides\/"/, '404 offers the full primary-discovery guide library');
assert.match(page, /href="\/"/, '404 retains a route back to the homepage');
assert.match(page, /aria-label="Recovery options"/, '404 recovery links have a clear navigation label');
assert.match(css, /\.not-found-search input[^}]+min-height:\s*48px/s, '404 search input has a robust touch target');
assert.match(css, /\.not-found-option[^}]+overflow-wrap:\s*anywhere/s, '404 recovery actions tolerate long translated labels');

console.log('FAN-273 404 recovery contract passed');
