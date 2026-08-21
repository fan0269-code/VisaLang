const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const read = (file) => fs.readFileSync(file, 'utf8');
const baseLayout = read('src/layouts/BaseLayout.astro');
const guideLayout = read('src/layouts/GuideLayout.astro');
const guidePage = read('src/pages/guides/[slug].astro');
const contentSchema = read('src/content.config.ts');

for (const marker of [
  "providedOgImage ?? '/images/og-default.png'",
  "'VisaLang — Find the right language exam for your next move'",
  'property="og:site_name"',
  'property="og:locale"',
  'property="og:image:alt"',
  'property="og:image:width"',
  'property="og:image:height"',
  'name="twitter:image"',
  'name="twitter:image:alt"',
  'index,follow,max-image-preview:large',
]) {
  assert.ok(baseLayout.includes(marker), `shared SEO metadata includes ${marker}`);
}

assert.match(contentSchema, /seoTitle:\s*z\.string\(\)\.trim\(\)\.min\(1\)\.max\(49\)\.optional\(\)/, 'guide SEO titles are trimmed, non-empty, and search-safe');
assert.ok(guidePage.includes('seoTitle={frontmatter.seoTitle}'), 'guide routes pass the dedicated SEO title to the layout');
assert.ok(guideLayout.includes('title={seoTitle ?? title}'), 'guide metadata can use a concise title without changing the article H1');
assert.ok(baseLayout.includes('providedOgImage ? undefined : 1200') && baseLayout.includes('providedOgImage ? undefined : 630'), 'custom social images do not inherit false default dimensions');
assert.ok(baseLayout.includes('{ogImageAlt && <meta') && baseLayout.includes('{ogImageWidth && <meta') && baseLayout.includes('{ogImageHeight && <meta'), 'optional custom-image metadata renders only when accurate values are available');

const guideFiles = fs.readdirSync('src/content/guides').filter((file) => file.endsWith('.md'));
const seoTitles = guideFiles.flatMap((file) => {
  const source = read(path.join('src/content/guides', file));
  const value = source.match(/^seoTitle:\s*["']([^"']+)["']/m)?.[1];
  return value ? [{ file, value }] : [];
});
assert.ok(seoTitles.length >= 16, 'the long indexable guide titles have dedicated SEO titles');
for (const { file, value } of seoTitles) {
  assert.ok(value.length <= 49, `${file} keeps seoTitle within 49 characters before the brand suffix`);
}

const png = fs.readFileSync('public/images/og-default.png');
assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], 'default social image is a real PNG');
assert.equal(png.readUInt32BE(16), 1200, 'default social image is 1200 pixels wide');
assert.equal(png.readUInt32BE(20), 630, 'default social image is 630 pixels high');

const englishTranslatedGuide = read('dist/guides/goethe-a1-test-centers/index.html');
const chineseTranslatedGuide = read('dist/zh/guides/goethe-a1-test-centers/index.html');
assert.ok(englishTranslatedGuide.includes('<meta property="og:locale" content="en_US">'), 'English translated guide uses en_US as its Open Graph locale');
assert.ok(englishTranslatedGuide.includes('<meta property="og:locale:alternate" content="zh_CN">'), 'English translated guide declares zh_CN as its alternate Open Graph locale');
assert.ok(chineseTranslatedGuide.includes('<meta property="og:locale" content="zh_CN">'), 'Chinese translated guide uses zh_CN as its Open Graph locale');
assert.ok(chineseTranslatedGuide.includes('<meta property="og:locale:alternate" content="en_US">'), 'Chinese translated guide declares en_US as its alternate Open Graph locale');
for (const html of [englishTranslatedGuide, chineseTranslatedGuide]) {
  assert.ok(html.includes('<meta property="og:image:alt" content="VisaLang — Find the right language exam for your next move">'), 'rendered social alt text matches the default artwork');
  assert.ok(html.includes('<meta name="twitter:image:alt" content="VisaLang — Find the right language exam for your next move">'), 'rendered Twitter alt text matches the default artwork');
}

console.log('FAN-270 SEO metadata rules passed');
