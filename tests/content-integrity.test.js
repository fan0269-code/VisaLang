const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const guideDir = 'src/content/guides';
const files = fs.readdirSync(guideDir).filter((file) => file.endsWith('.md'));
const entries = files.map((file) => ({ file, source: fs.readFileSync(path.join(guideDir, file), 'utf8') }));
const field = (source, name) => source.match(new RegExp(`^${name}:\\s*["']?([^"'\\n]+)`, 'm'))?.[1]?.trim();
const slugs = new Set(entries.map(({ source }) => field(source, 'slug')));

assert.equal(slugs.size, entries.length, 'Guide slugs must remain unique');
for (const { file, source } of entries) {
  const slug = field(source, 'slug');
  assert.equal(`${slug}.md`, file, `${file} must match its canonical slug`);
  assert.match(source, /^updatedDate:\s*"\d{4}-\d{2}-\d{2}"/m, `${file} needs an updated date`);
  assert.match(source, /https:\/\//, `${file} needs at least one traceable source link`);
  assert.doesNotMatch(source, /guaranteed pass|guaranteed visa|officially endorsed by VisaLang/i, `${file} must not make unsafe outcome or authority claims`);
  const related = source.match(/^related:\s*\[(.*?)\]/m)?.[1] || '';
  for (const match of related.matchAll(/["']([^"']+)["']/g)) {
    assert.ok(slugs.has(match[1]), `${file} related slug must resolve: ${match[1]}`);
  }
}

const appData = fs.readFileSync('src/data/app-data.ts', 'utf8');
const examRows = [...appData.matchAll(/\{ name: '([^']+)', officialSource: '([^']+)', lastUpdated: '(\d{4}-\d{2}-\d{2})', category: '([^']+)', country: '([^']+)' \}/g)].map((match) => ({ name: match[1], officialSource: match[2], lastUpdated: match[3], category: match[4], country: match[5] }));
assert.equal(examRows.length, 31, 'live Astro exam directory retains all 31 configured exam records');
assert.equal(new Set(examRows.map((exam) => exam.name)).size, examRows.length, 'exam names must be unique');
for (const exam of examRows) {
  assert.ok(exam.officialSource.startsWith('https://'), `${exam.name} needs an HTTPS official source`);
  assert.match(exam.lastUpdated, /^\d{4}-\d{2}-\d{2}$/, `${exam.name} needs a checked date`);
  assert.ok(exam.category && exam.country, `${exam.name} needs category and country metadata`);
}
for (const requiredSource of ['Goethe-Institut', 'telc', 'TestDaF', 'BAMF']) {
  assert.ok(appData.includes(requiredSource), `app data retains official source: ${requiredSource}`);
}
for (const legacy of ['index.html', 'about.html', 'contact.html', 'privacy-policy.html', 'terms.html', 'cookie-policy.html', 'editorial-policy.html', 'affiliate-disclosure.html']) {
  assert.ok(fs.existsSync(legacy), `legacy file remains available until hosting source-of-truth is confirmed: ${legacy}`);
}

const deployScript = fs.readFileSync('deploy/deploy.sh', 'utf8');
assert.match(deployScript, /SOURCE_DIR=.*\/source/, 'deployment keeps source and served files in separate directories');
assert.match(deployScript, /SERVE_DIR="\$PUBLIC_DIR\/dist"/, 'deployment target matches the Nginx Astro root');
assert.match(deployScript, /npm run build/, 'deployment builds Astro before publishing');
assert.match(deployScript, /SOURCE_DIR\/dist\/index\.html/, 'deployment blocks publication without the Astro root entry');
assert.match(deployScript, /cp -a \"\$SOURCE_DIR\/dist\//, 'deployment publishes the complete Astro dist output');

console.log('guide sources, related links, compliance, app data, legacy handoff, and deployment checks passed');
