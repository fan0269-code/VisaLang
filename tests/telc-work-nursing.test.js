const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

const slug = 'telc-b1-b2-germany-work-nursing';
const source = fs.readFileSync(`src/content/guides/${slug}.md`, 'utf8');
const field = (name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};

assert.equal(field('updatedDate'), '2026-08-14', 'the work and nursing guide records its substantive editorial update');
assert.equal(field('sourceReviewedAt'), '2026-08-14', 'the work and nursing guide records the current authority and product checks');
assert.equal(field('sourceReviewStatus'), 'reviewed', 'the work and nursing guide closes its bounded source gap');
assert.equal(field('reviewedByRole'), 'source-review', 'the work and nursing guide records the controlled source-review role');
assert.equal(field('contentStatus'), 'starter-overview', 'the work and nursing slice does not promote content maturity');
assert.equal(field('noindex'), 'true', 'the work and nursing guide remains outside indexing');
assert.equal(field('adsEligible'), 'false', 'the work and nursing guide remains advertising-free');
assert.equal(field('decisionStage'), 'requirement', 'the guide remains a requirement-verification step');
assert.match(field('primaryOfficialAuthorityUrl'), /anerkennung-in-deutschland\.de/i, 'the guide records the government recognition entry point');
assert.match(field('examOwnerUrl'), /telc.*b1-b2-nursing|telc-german-b1-b2-nursing/i, 'the guide records the exact telc nursing-product source');
assert.match(field('finalDecisionAuthorityType'), /recognition authority.*employer.*mission.*foreigners authority.*telc/is, 'the guide separates all four decision owners');
assert.match(field('localExecutionPrompt'), /Recognition Finder.*employer.*mission.*foreigners authority.*telc examination centre/is, 'the guide requires four reader-side verification actions');

for (const authority of ['Competent professional recognition authority', 'Employer', 'German mission or foreigners authority', 'telc and selected telc examination centre']) {
  assert.match(source, new RegExp(authority, 'i'), `the guide names the authority boundary: ${authority}`);
}
assert.match(source, /authority record/i, 'the guide gives readers a reusable authority record');
assert.match(source, /Claim.*Authority and official source.*Checked.*Permitted support.*Boundary.*Reader verification action/is, 'the guide records the complete claim-source boundary');
assert.match(source, /profession and.*work location|work location.*profession/is, 'the guide explains how the recognition authority is located');
assert.match(source, /regulated profession/i, 'the guide retains the bounded official nursing-profession fact');
assert.match(source, /does not decide|cannot decide|does not establish|cannot establish/i, 'the guide prevents one actor from deciding another actor\'s question');
assert.doesNotMatch(source, /often requires telc Deutsch B2|work-permit and Blue Card paths may accept B1 or B2|permanent settlement and naturalisation accept telc certificates/i, 'the guide removes unsupported universal route and threshold claims');
assert.doesNotMatch(source, /guarantees? (?:recognition|a visa|a residence permit|employment)|universally accepted|accepted throughout Germany|one language threshold/i, 'the guide avoids recognition, immigration, employment and cross-region guarantees');

execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });
const html = fs.readFileSync(`dist/guides/${slug}/index.html`, 'utf8');
assert.match(html, /Official sources last checked: <time datetime="2026-08-14">2026-08-14<\/time>/, 'the generated work and nursing guide renders its bounded source-review date');
assert.doesNotMatch(html, /Official verification pending/, 'the reviewed work and nursing guide does not render a conflicting pending state');
assert.match(html, />Starter overview<\//, 'the work and nursing guide remains visibly outside mature states');

console.log('FAN-39 telc work and nursing contract passed');
