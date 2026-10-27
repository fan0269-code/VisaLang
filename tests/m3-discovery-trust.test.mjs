import assert from 'node:assert/strict';
import fs from 'node:fs';

import {
  guideDiscoveryFilters,
  guidePurposeLabels,
  resolveGuidePurposes,
} from '../src/data/guide-taxonomy.ts';
import {
  clearGuideDiscoveryState,
  filterGuideDiscoveryCards,
  parseGuideDiscoveryState,
  serializeGuideDiscoveryState,
  summarizeGuideDiscoveryResults,
} from '../src/data/guide-discovery.ts';
import { configuredExams, exams, referenceExams } from '../src/data/app-data.ts';
import { examProducts } from '../src/data/claim-registry.ts';

assert.deepEqual(
  Object.keys(guidePurposeLabels),
  ['family', 'settlement', 'citizenship', 'preparation'],
  'the public purpose vocabulary contains the four approved stable IDs',
);
assert.deepEqual(
  guideDiscoveryFilters.map((filter) => filter.name),
  ['purpose', 'stage', 'language'],
  'the library exposes exactly Purpose, Stage, and Language as public filters',
);
assert.deepEqual(
  resolveGuidePurposes({ slug: 'german-family-reunion-language-requirement', category: 'germany-a1' }),
  ['family'],
  'the family-reunion requirement has an explicit family purpose',
);
assert.deepEqual(
  resolveGuidePurposes({ slug: 'goethe-a1-30-day-study-plan', category: 'germany-a1' }),
  ['family', 'preparation'],
  'an A1 study guide can match both its application purpose and preparation',
);
assert.deepEqual(
  resolveGuidePurposes({ slug: 'germany-b1-settlement-citizenship-checklist', category: 'germany-b1' }),
  ['settlement', 'citizenship', 'preparation'],
  'a shared B1 checklist can match both legal routes and preparation',
);
assert.deepEqual(
  resolveGuidePurposes({ slug: 'germany-b1-citizenship-language-proof', category: 'germany-b1' }),
  ['citizenship'],
  'a citizenship-specific requirement is not mislabeled as settlement or work',
);

const discoveryCards = [
  {
    id: 'citizenship-checklist',
    search: 'germany b1 submission checklist',
    purposes: ['settlement', 'citizenship', 'preparation'],
    stage: 'submission-review',
    language: 'en',
  },
  {
    id: 'a1-study',
    search: 'goethe a1 30 day study plan',
    purposes: ['family', 'preparation'],
    stage: 'local-execution',
    language: 'en',
  },
];
const restored = parseGuideDiscoveryState('?q=checklist&purpose=citizenship&stage=submission-review&language=en&sort=relevance&country=Germany');
assert.deepEqual(
  restored,
  { q: 'checklist', purpose: 'citizenship', stage: 'submission-review', language: 'en', sort: 'relevance' },
  'URL restoration keeps supported public state and discards retired filters',
);
assert.deepEqual(
  filterGuideDiscoveryCards(discoveryCards, restored).map((card) => card.id),
  ['citizenship-checklist'],
  'multi-value purpose matching uses membership rather than string equality',
);
assert.equal(
  serializeGuideDiscoveryState(restored),
  'q=checklist&purpose=citizenship&stage=submission-review&language=en&sort=relevance',
  'shareable URL state uses a deterministic, non-sensitive parameter order',
);
assert.deepEqual(
  clearGuideDiscoveryState(),
  { q: '', purpose: '', stage: '', language: '', sort: 'updated' },
  'Clear all restores the deterministic default state',
);
const zeroResult = summarizeGuideDiscoveryResults(0, discoveryCards.length);
assert.deepEqual(
  zeroResult,
  {
    empty: true,
    announcement: 'No guides match these filters. Clear a filter or clear all to see every guide.',
  },
  'a zero-result state announces the result and gives an immediate recovery action',
);

assert.equal(exams.length, 31, 'the broad reference directory retains all 31 records');
assert.deepEqual(
  configuredExams.map((exam) => exam.productId),
  examProducts.map((product) => product.id),
  'the supported section is backed by the exact current product IDs',
);
assert.deepEqual(
  configuredExams.map((exam) => exam.name),
  examProducts.map((product) => product.name),
  'the supported section uses exact names from the current product registry',
);
assert.equal(configuredExams.length, 4, 'only the four maintained A1/B1 comparison products are presented as configured');
assert.equal(referenceExams.length, 27, 'every other retained directory entry is reference-only');
assert.ok(referenceExams.every((exam) => exam.support === 'reference-only' && !exam.productId), 'reference-only records cannot imply configured product support');
assert.deepEqual(exams.slice(0, 4), configuredExams, 'configured products are ordered above reference-only directory records');

const read = (path) => fs.readFileSync(path, 'utf8');
const publicTrustPages = {
  about: read('src/pages/about.astro'),
  editorial: read('src/pages/editorial-policy.astro'),
  contact: read('src/pages/contact.astro'),
  pricing: read('src/pages/pricing.astro'),
  partners: read('src/pages/partners.astro'),
};
assert.doesNotMatch(
  publicTrustPages.about,
  /metadata checks|primary discovery|content status|AdSense approval|verification-pending|complete-route|core-route/i,
  'About explains reader coverage without internal publication-state jargon',
);
assert.doesNotMatch(
  publicTrustPages.editorial,
  /source-review status|review roles|maintained content record|pending review label/i,
  'Editorial Policy explains accountability without exposing internal record vocabulary',
);
assert.doesNotMatch(
  publicTrustPages.pricing,
  /Future AI Correction|coming soon|proposed A1 packs|proposed informational Route Review/i,
  'Pricing foregrounds delivered help and gives unavailable work one plain status boundary',
);
assert.match(publicTrustPages.contact, /hello@visalang\.org/, 'Contact exposes the real communication channel without implying submission or delivery');
assert.match(publicTrustPages.partners, /does not create a partnership|does not create a partnership or a listing/i, 'Partners keeps the non-acceptance boundary beside its real contact path');

for (const file of [
  'src/pages/products/a1-family-reunion-pack.astro',
  'src/pages/products/a1-practice-pack.astro',
]) {
  const page = read(file);
  assert.doesNotMatch(page, /IntentCTA|Get product updates|Get updates/, `${file} has no CTA for an undelivered product`);
}

const guideCard = read('src/components/GuideCard.astro');
assert.match(guideCard, /Guide summary:/, 'guide cards label descriptive copy as a summary');
assert.doesNotMatch(guideCard, /Direct answer:/, 'guide cards do not relabel a description as a direct answer');
assert.doesNotMatch(
  `${read('src/data/guide-taxonomy.ts')}\n${read('src/pages/guides/index.astro')}\n${read('src/pages/guides/category/[category].astro')}`,
  /primary discovery|content status meet the publication gate|withheld from/i,
  'public category explanations describe reader availability without internal gating vocabulary',
);
const guideLibrary = read('src/pages/guides/index.astro');
assert.match(
  guideLibrary,
  /const focusTarget = [\s\S]*?apply\(\);\s*focusTarget\?\.focus\(\);/,
  'removing a filter chip returns keyboard focus to the control that owns that filter',
);
assert.match(
  read('src/styles/global.css'),
  /@media \(max-width: 480px\)[\s\S]*?\.od-guide-library \.quick-filter-bar\s*\{\s*grid-template-columns:\s*1fr;/,
  'Guide Library controls use one readable column at the required 375 px and 390 px viewports',
);

console.log('M3 T21 discovery, exam-priority, and trust contracts passed');
