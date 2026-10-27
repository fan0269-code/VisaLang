import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getChineseGuidePublicationPolicy } from '../src/data/publication-manifest.ts';

const pendingPillar = {
  slug: 'goethe-a1-test-centers',
  contentStatus: 'complete-route',
  sourceReviewStatus: 'pending',
  noindex: false,
};

assert.deepEqual(
  getChineseGuidePublicationPolicy(pendingPillar),
  { disposition: 'pending', index: false, sitemap: false, ads: false },
  'a pending allowlisted Chinese pillar is noindex, outside the sitemap, and advertising-free',
);

const layout = fs.readFileSync('src/components/ZhGuideLayout.astro', 'utf8');
const library = fs.readFileSync('src/data/guide-library.ts', 'utf8');
const sitemapPostbuild = fs.readFileSync('scripts/enrich-sitemap-lastmod.js', 'utf8');

assert.match(layout, /const publicationPolicyForGuide = \(guide[^)]*\) => getChineseGuidePublicationPolicy\(\{/, 'the Chinese layout normalizes every guide through the complete publication policy');
assert.match(layout, /const publicationPolicy = publicationPolicyForGuide\(guideRecord\)/, 'the direct Chinese page uses the normalized policy');
assert.match(layout, /filter\(\(guide\) => guide && publicationPolicyForGuide\(guide\)\.index\)/, 'related Chinese cards exclude pending allowlisted pillars');
assert.match(layout, /filter\(\(guide\)[^\n]*Boolean\(guide\) && publicationPolicyForGuide\(guide\)\.index/, 'the Chinese previous/next sequence excludes pending allowlisted pillars');
assert.match(layout, /noindex=\{!publicationPolicy\.index\}/, 'the direct Chinese page renders noindex from the normalized policy');
assert.match(layout, /enableAds=\{publicationPolicy\.ads\}/, 'the direct Chinese page renders the advertising decision from the normalized policy');
assert.match(library, /getChineseGuidePublicationPolicy\(\{[\s\S]*?slug: guide\.slug,[\s\S]*?contentStatus: guide\.status,[\s\S]*?sourceReviewStatus: guide\.sourceReviewStatus,[\s\S]*?noindex: guide\.noindex,[\s\S]*?\}\)\.index/, 'Chinese top-level discovery uses the same complete publication policy after status normalization');
assert.match(sitemapPostbuild, /meta name="robots" content="noindex,follow"/, 'the sitemap postbuild removes every rendered noindex canonical');

console.log('scheme 3 Chinese fail-closed wiring passed');
