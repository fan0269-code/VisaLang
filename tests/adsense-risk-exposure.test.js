const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });

const adsenseHost = 'pagead2.googlesyndication.com';
const read = (file) => fs.readFileSync(file, 'utf8');

const advertisingFreeRoutes = [
  'dist/404.html',
  'dist/privacy-policy/index.html',
  'dist/cookie-policy/index.html',
  'dist/terms/index.html',
  'dist/editorial-policy/index.html',
  'dist/affiliate-disclosure/index.html',
  'dist/pricing/index.html',
  'dist/partners/index.html',
  'dist/route-review/index.html',
  'dist/products/a1-family-reunion-pack/index.html',
  'dist/products/a1-practice-pack/index.html',
  'dist/guides/yki-finnish-citizenship/index.html',
  'dist/guides/cils-b1-cittadinanza-for-italian-citizenship/index.html',
  'dist/guides/testdaf-germany-university-admissions/index.html',
  'dist/guides/telc-b1-b2-fees-and-test-centers/index.html',
  'dist/guides/category/uk/index.html',
  'dist/guides/category/canada/index.html',
  'dist/guides/category/italy/index.html',
  'dist/guides/category/spain/index.html',
  'dist/guides/category/france/index.html',
  'dist/guides/category/finland/index.html',
  'dist/guides/category/netherlands/index.html',
  'dist/guides/category/portugal/index.html',
  'dist/guides/category/germany-testdaf/index.html',
  'dist/guides/category/germany-telc/index.html',
  'dist/guides/category/germany-a1/index.html',
  'dist/guides/category/germany-b1/index.html',
];

for (const file of advertisingFreeRoutes) {
  assert.ok(fs.existsSync(file), `risk route should still generate: ${file}`);
  assert.ok(!read(file).includes(adsenseHost), `risk route should not load AdSense: ${file}`);
}

const commercialRoutes = [
  '/pricing/',
  '/partners/',
  '/route-review/',
  '/products/a1-family-reunion-pack/',
  '/products/a1-practice-pack/',
];
const sitemap = read('dist/sitemap-0.xml');

for (const route of commercialRoutes) {
  const file = `dist${route}index.html`;
  assert.ok(read(file).includes('<meta name="robots" content="noindex,follow">'), `commercial placeholder should be noindex: ${route}`);
  assert.ok(!sitemap.includes(`<loc>https://visalang.org${route}</loc>`), `commercial placeholder should be excluded from sitemap: ${route}`);
}

for (const route of [
  '/guides/yki-finnish-citizenship/',
  '/guides/cils-b1-cittadinanza-for-italian-citizenship/',
  '/guides/testdaf-germany-university-admissions/',
  '/guides/telc-b1-b2-fees-and-test-centers/',
  '/guides/category/uk/',
  '/guides/category/canada/',
  '/guides/category/italy/',
  '/guides/category/spain/',
  '/guides/category/france/',
  '/guides/category/finland/',
  '/guides/category/netherlands/',
  '/guides/category/portugal/',
  '/guides/category/germany-testdaf/',
  '/guides/category/germany-telc/',
]) {
  const html = read(`dist${route}index.html`);
  assert.ok(html.includes('<meta name="robots" content="noindex,follow">'), `pending or starter route should be noindex: ${route}`);
  assert.ok(!sitemap.includes(`<loc>https://visalang.org${route}</loc>`), `pending or starter route should be excluded from sitemap: ${route}`);
}

for (const file of [
  'dist/index.html',
  'dist/guides/german-family-reunion-language-requirement/index.html',
]) {
  assert.ok(read(file).includes(adsenseHost), `ad-eligible control route should keep AdSense: ${file}`);
}

const germanyCategoryHtml = read('dist/guides/category/germany-a1/index.html');
assert.ok(!germanyCategoryHtml.includes('<meta name="robots" content="noindex,follow">'), 'Germany A1 category should remain indexable');
assert.ok(sitemap.includes('<loc>https://visalang.org/guides/category/germany-a1/</loc>'), 'Germany A1 category should remain in sitemap');

console.log('AdSense risk-exposure rules passed');
