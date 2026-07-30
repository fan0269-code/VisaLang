const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const guideDirectory = 'src/content/guides';
const testDaFGuides = [
  'testdaf-germany-university-admissions.md',
  'testdaf-levels-and-scoring.md',
  'testdaf-vs-goethe-dsh.md',
  'testdaf-preparation-and-practice.md',
];
const relatedGuidePaths = testDaFGuides.map((file) => `/guides/${file.replace(/\.md$/, '/')}`);
const field = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.*)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};
const arrayField = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*\\[(.*)\\]$`, 'm'))?.[1] || '';
  return [...value.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
};
const routeExpectations = {
  'testdaf-germany-university-admissions': {
    decisionStage: 'requirement',
    nextGuideSlug: 'testdaf-levels-and-scoring',
    supportingGuideSlugs: ['testdaf-vs-goethe-dsh', 'testdaf-preparation-and-practice'],
  },
  'testdaf-levels-and-scoring': {
    decisionStage: 'choice',
    nextGuideSlug: 'testdaf-vs-goethe-dsh',
    supportingGuideSlugs: ['testdaf-germany-university-admissions', 'testdaf-preparation-and-practice'],
  },
  'testdaf-vs-goethe-dsh': {
    decisionStage: 'choice',
    nextGuideSlug: 'testdaf-preparation-and-practice',
    supportingGuideSlugs: ['testdaf-germany-university-admissions', 'testdaf-levels-and-scoring'],
  },
  'testdaf-preparation-and-practice': {
    decisionStage: 'local-execution',
    nextGuideSlug: '',
    supportingGuideSlugs: [
      'testdaf-germany-university-admissions',
      'testdaf-levels-and-scoring',
      'testdaf-vs-goethe-dsh',
    ],
  },
};

for (const file of testDaFGuides) {
  assert.ok(fs.existsSync(path.join(guideDirectory, file)), `TestDaF cluster should include ${file}`);
}

const categoryGuides = fs.readdirSync(guideDirectory)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => fs.readFileSync(path.join(guideDirectory, file), 'utf8').includes('category: "germany-testdaf"'));
assert.deepEqual(categoryGuides.sort(), [...testDaFGuides].sort(), 'TestDaF cluster should contain only the four audited guides');

for (const file of testDaFGuides) {
  const source = fs.readFileSync(path.join(guideDirectory, file), 'utf8');
  const slug = field(source, 'slug');
  const expected = routeExpectations[slug];
  assert.ok(expected, `${file} should have a controlled TestDaF route expectation`);
  assert.ok(source.includes('contentStatus: "starter-overview"'), `${file} must remain starter-overview`);
  assert.ok(source.includes('updatedDate: "2026-07-23"'), `${file} should record its completed P3 source-review update date`);
  assert.ok(source.includes('sourceReviewedAt: "2026-07-23"'), `${file} should record its P3 source-review date`);
  assert.ok(source.includes('sourceReviewStatus: "reviewed"'), `${file} should record the bounded P3 review`);
  assert.ok(source.includes('reviewedByRole: "source-review"'), `${file} should identify the P3 review role`);
  assert.ok(field(source, 'localExecutionPrompt'), `${file} should retain an actionable official verification step`);
  assert.equal(field(source, 'decisionStage'), expected.decisionStage, `${file} should use the agreed decision stage`);
  assert.equal(field(source, 'nextGuideSlug'), expected.nextGuideSlug, `${file} should use the agreed primary next step`);
  assert.deepEqual(arrayField(source, 'supportingGuideSlugs'), expected.supportingGuideSlugs, `${file} should use the agreed related-guide order`);
  assert.ok(!expected.supportingGuideSlugs.includes(slug), `${file} should not include a supporting self-link`);
  assert.ok(!expected.nextGuideSlug || !expected.supportingGuideSlugs.includes(expected.nextGuideSlug), `${file} should keep its primary next step out of supporting links`);
  assert.ok(source.includes('## Official sources'), `${file} should expose official sources`);
  assert.ok(source.includes('## Continue your TestDaF decision route'), `${file} should expose the TestDaF decision order`);
  assert.match(source, /target (university and programme|programme)/i, `${file} should keep the programme as the decision authority`);
  for (const href of relatedGuidePaths) {
    if (!href.includes(file.replace(/\.md$/, ''))) {
      assert.ok(source.includes(href), `${file} should link to ${href}`);
    }
  }
}

for (const slug of Object.keys(routeExpectations)) {
  const route = [];
  let cursor = slug;
  while (cursor) {
    assert.ok(!route.includes(cursor), `TestDaF next-guide chain should terminate without a cycle: ${[...route, cursor].join(' -> ')}`);
    route.push(cursor);
    cursor = routeExpectations[cursor]?.nextGuideSlug || '';
  }
}

const guideRoute = fs.readFileSync('src/pages/guides/[slug].astro', 'utf8');
assert.match(guideRoute, /usesExplicitRoute[\s\S]*'germany-testdaf'/, 'generated TestDaF pages should use the explicit route sequence');

console.log('Germany TestDaF cluster rules passed');
