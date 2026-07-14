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

for (const file of testDaFGuides) {
  assert.ok(fs.existsSync(path.join(guideDirectory, file)), `TestDaF cluster should include ${file}`);
}

const categoryGuides = fs.readdirSync(guideDirectory)
  .filter((file) => file.endsWith('.md'))
  .filter((file) => fs.readFileSync(path.join(guideDirectory, file), 'utf8').includes('category: "germany-testdaf"'));
assert.deepEqual(categoryGuides.sort(), [...testDaFGuides].sort(), 'TestDaF cluster should contain only the four audited guides');

for (const file of testDaFGuides) {
  const source = fs.readFileSync(path.join(guideDirectory, file), 'utf8');
  assert.ok(source.includes('contentStatus: "starter-overview"'), `${file} must remain starter-overview`);
  assert.ok(source.includes('updatedDate: "2026-07-13"'), `${file} should retain the P3 update date`);
  assert.ok(source.includes('Official verification pending'), `${file} should not claim an unconfirmed historical source-check date`);
  assert.ok(source.includes('## Official sources'), `${file} should expose official sources`);
  assert.ok(source.includes('## Continue your TestDaF decision route'), `${file} should expose the TestDaF decision order`);
  assert.match(source, /target (university and programme|programme)/i, `${file} should keep the programme as the decision authority`);
  for (const href of relatedGuidePaths) {
    if (!href.includes(file.replace(/\.md$/, ''))) {
      assert.ok(source.includes(href), `${file} should link to ${href}`);
    }
  }
}

console.log('Germany TestDaF cluster rules passed');
