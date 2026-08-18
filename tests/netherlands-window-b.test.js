const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const crypto = require('node:crypto');
const fs = require('node:fs');

const inburgeringSlug = 'dutch-inburgering-a2-b1-for-integration-and-citizenship';
const nt2Slug = 'staatsexamen-nt2-for-work-and-higher-education';
const nt2BaselineSha256 = '093c9c320d9be6dace0a46128b40253954b656a288a27f84e13ffd9155c21003';
const read = (file) => fs.readFileSync(file, 'utf8');
const field = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};

execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });

const inburgering = read(`src/content/guides/${inburgeringSlug}.md`);
const nt2 = read(`src/content/guides/${nt2Slug}.md`);

assert.equal(field(inburgering, 'contentStatus'), 'verification-pending', 'the Inburgering guide remains verification-pending');
assert.equal(field(inburgering, 'sourceReviewStatus'), 'reviewed', 'the Inburgering guide keeps the controlled source-review state');
assert.equal(field(inburgering, 'sourceReviewedAt'), '2026-08-15', 'the Inburgering guide records the FAN-40 official-source recheck');
assert.equal(field(inburgering, 'updatedDate'), '2026-08-15', 'the Inburgering guide records the FAN-40 editorial update');
assert.equal(field(inburgering, 'reviewedByRole'), 'source-review', 'the Inburgering guide records the controlled reviewer role');
assert.equal(field(inburgering, 'noindex'), 'true', 'the pending Inburgering guide explicitly remains outside indexing');
assert.equal(field(inburgering, 'adsEligible'), 'false', 'the pending Inburgering guide explicitly remains advertising-free');
assert.equal(field(inburgering, 'decisionStage'), 'requirement', 'the Inburgering guide remains a requirement-stage route check');
assert.equal(field(inburgering, 'nextGuideSlug'), '', 'the Inburgering guide is terminal');

assert.match(inburgering, /procedure-first (?:route )?check/i, 'the guide starts with a procedure-first route check');
for (const authority of ['IND', 'Municipality', 'DUO / Inburgeren', 'Mijn Inburgering / PIP']) {
  assert.ok(inburgering.includes(`| ${authority} |`), `the authority table includes ${authority}`);
}
assert.match(inburgering, /personal route record/i, 'the guide gives the reader a personal route record');
assert.match(inburgering, /A2\/B1 stop rule/i, 'the guide includes an explicit A2/B1 stop rule');
assert.match(inburgering, /Common mistakes/i, 'the guide includes Netherlands-specific common mistakes');
assert.match(inburgering, /Next action/i, 'the guide ends with a concrete next action');
assert.match(inburgering, /Official sources checked on 15 August 2026/i, 'the guide exposes the current FAN-40 source-check date');
assert.match(inburgering, /Inburgering.*UvA\/NT2|UvA\/NT2.*Inburgering/is, 'the guide distinguishes Inburgering from the UvA/NT2 admissions task');

for (const url of [
  'https://ind.nl/en/living-in-the-netherlands-with-a-residence-permit/civic-integration-for-more-secure-residence-permit-and-naturalisation',
  'https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation',
  'https://www.inburgeren.nl/en/taking-the-integration-exam/index.jsp',
  'https://www.inburgeren.nl/en/integration-in-the-netherlands/choosing-course.jsp',
]) {
  assert.ok(inburgering.includes(url), `the guide records the reviewed official source: ${url}`);
}

assert.doesNotMatch(
  inburgering,
  /\b(?:everyone|all applicants|every applicant|always)\b[^\n]{0,80}\b(?:A2|B1)\b|\b(?:A2|B1)\b[^\n]{0,80}\b(?:everyone|all applicants|every applicant|always)\b/i,
  'the guide does not create a universal A2/B1 rule',
);
assert.doesNotMatch(inburgering, /\b\d+\s+(?:day|days|month|months|year|years)\b/i, 'the guide does not publish a universal deadline or residence period');
assert.doesNotMatch(
  inburgering,
  /\b(?:guaranteed|always accepted|automatically accepted|approval guaranteed|naturalisation guaranteed|residence guaranteed|exemption guaranteed)\b/i,
  'the guide does not promise an application, residence, naturalisation, evidence, or exemption outcome',
);

assert.equal(field(nt2, 'contentStatus'), 'verification-pending', 'the UvA/NT2 guide remains verification-pending');
assert.equal(field(nt2, 'sourceReviewStatus'), 'reviewed', 'the UvA/NT2 guide keeps the controlled source-review state');
assert.equal(field(nt2, 'nextGuideSlug'), '', 'the UvA/NT2 guide remains terminal');
assert.match(nt2, /UvA Dutch-taught bachelor's admissions/i, 'the NT2 reference page remains bounded to the named UvA admissions task');
assert.notEqual(field(inburgering, 'primaryIntent'), field(nt2, 'primaryIntent'), 'the two Netherlands guides retain distinct user tasks');
assert.equal(
  crypto.createHash('sha256').update(nt2).digest('hex'),
  nt2BaselineSha256,
  'the read-only UvA/NT2 reference page remains byte-for-byte unchanged',
);

const taxonomy = read('src/data/guide-taxonomy.ts');
assert.match(
  taxonomy,
  /\{[^{}]*slug: 'netherlands'[^{}]*adsEligible: false[^{}]*noindex: true[^{}]*\}/,
  'the Netherlands category is explicitly noindex and advertising-free',
);

const generatedNetherlandsRoutes = [
  [`/guides/${inburgeringSlug}/`, `dist/guides/${inburgeringSlug}/index.html`],
  [`/guides/${nt2Slug}/`, `dist/guides/${nt2Slug}/index.html`],
  ['/guides/category/netherlands/', 'dist/guides/category/netherlands/index.html'],
];
assert.ok(fs.existsSync('dist/sitemap-0.xml'), 'the focused generated-output contract requires a current sitemap');
for (const [, output] of generatedNetherlandsRoutes) {
  assert.ok(fs.existsSync(output), `the focused generated-output contract requires ${output}`);
}

const sitemap = read('dist/sitemap-0.xml');
for (const [route, output] of generatedNetherlandsRoutes) {
  const html = read(output);
  assert.ok(html.includes('<meta name="robots" content="noindex,follow">'), `${route} renders noindex`);
  assert.ok(!html.includes('pagead2.googlesyndication.com'), `${route} does not load AdSense`);
  assert.ok(!sitemap.includes(`<loc>https://visalang.org${route}</loc>`), `${route} is absent from the sitemap`);
}
assert.ok(!read(`dist/guides/${inburgeringSlug}/index.html`).includes('<small>Next guide</small>'), 'the generated Inburgering guide is terminal');
assert.ok(!read(`dist/guides/${nt2Slug}/index.html`).includes('<small>Next guide</small>'), 'the generated UvA/NT2 guide remains terminal');

console.log('Netherlands window B remediation rules passed');
