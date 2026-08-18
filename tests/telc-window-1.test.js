const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const { frontmatterField } = require('./frontmatter-field.js');

const slug = 'telc-vs-goethe-for-german-visa';
const source = fs.readFileSync(`src/content/guides/${slug}.md`, 'utf8');

assert.equal(frontmatterField(source, 'updatedDate'), '2026-08-14', 'the guide records the current editorial update');
assert.equal(frontmatterField(source, 'sourceReviewedAt'), '2026-08-14', 'the guide records the current official-source check');
assert.equal(frontmatterField(source, 'sourceReviewStatus'), 'reviewed', 'the guide closes the bounded source-review gap');
assert.equal(frontmatterField(source, 'reviewedByRole'), 'source-review', 'the guide records the controlled source-review role');
assert.equal(frontmatterField(source, 'contentStatus'), 'starter-overview', 'the first slice does not promote content maturity');
assert.equal(frontmatterField(source, 'noindex'), 'true', 'the candidate remains explicitly outside indexing');
assert.equal(frontmatterField(source, 'adsEligible'), 'false', 'the candidate remains explicitly advertising-free');
assert.equal(frontmatterField(source, 'decisionStage'), 'choice', 'the guide remains an exam-product choice step');
assert.match(frontmatterField(source, 'primaryOfficialAuthorityUrl'), /auswaertiges-amt\.de|diplo\.de/i, 'the guide records a German authority or mission entry point');
assert.match(frontmatterField(source, 'examOwnerUrl'), /goethe\.de|telc\.net/i, 'the guide records a first-party exam-owner URL');
assert.match(frontmatterField(source, 'finalDecisionAuthorityType'), /mission|embassy|consulate|immigration authority|receiving authority/i, 'the guide identifies the competent receiving authority');
assert.match(frontmatterField(source, 'audienceScope'), /already confirmed|after.*confirm|candidate products/i, 'the guide starts after route-specific acceptance confirmation');
assert.match(frontmatterField(source, 'localExecutionPrompt'), /selected.*(?:official|authorised).*centre/i, 'the guide sends local terms to the selected official or authorised centre');

assert.match(source, /authority record|acceptance record|requirement record/i, 'the guide gives the reader a reusable authority record');
assert.match(source, /product comparison record|comparison record/i, 'the guide gives the reader a reusable product comparison record');
assert.match(source, /Common mistakes/i, 'the guide includes route-specific common mistakes');
assert.match(source, /Next action/i, 'the guide ends with a concrete next action');
assert.match(source, /Goethe-Institut/i, 'the guide names the Goethe exam owner');
assert.match(source, /telc/i, 'the guide names the telc exam owner');
assert.match(source, /selected official or authorised centre/i, 'the guide names the local execution authority');
assert.match(source, /cannot decide|does not decide|cannot establish|does not establish/i, 'the guide separates exam-owner facts from acceptance decisions');
assert.match(source, /Only if.*exact Goethe A1 and telc A1 products.*candidate proofs.*same family-reunion route/is, 'the A1 handoff requires exact same-route product confirmation');
assert.match(source, /Otherwise, stop and return to the responsible authority/is, 'the guide stops instead of routing from a level-only confirmation');
for (const heading of ['Exam Overview', 'Eligibility', 'Fees', 'Dates', 'Test Format', 'Locations / Online', 'Required Documents', 'Passing Score', 'Retake Policy', 'Prep Path', 'Best Courses', 'Practice Test', 'Career Outcome', 'Related Exams', 'FAQ', 'Last Updated']) {
  assert.match(source, new RegExp(`^## ${heading.replace('/', '\\/')}$`, 'm'), `the guide includes the workflow section: ${heading}`);
}

assert.doesNotMatch(source, /many embassies|frequently used for|better choice|historically the most common|reasonable fee/i, 'the guide removes unsupported prevalence and ranking claims');
assert.doesNotMatch(source, /(?:€|EUR|\$)\s?\d+|\b\d+\s?(?:hours?|days?|weeks?)\b|always accepted|universally accepted|guaranteed|easier|harder|faster|cheaper/i, 'the guide avoids fixed dynamic facts, guarantees, and unsupported rankings');

execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });
const html = fs.readFileSync(`dist/guides/${slug}/index.html`, 'utf8');
assert.match(html, /Official sources last checked: <time datetime="2026-08-14">2026-08-14<\/time>/, 'the generated guide renders its bounded source-review date');
assert.doesNotMatch(html, /Official verification pending/, 'the reviewed guide does not render a conflicting pending state');
assert.match(html, /Source-reviewed verification responsibilities for this guide/, 'the generated guide renders the bounded authority and source responsibilities');
assert.match(html, /Final decision authority:<\/strong> Responsible German mission, embassy or consulate and any competent receiving immigration authority/, 'the generated guide renders the responsible authority boundary');
assert.match(html, />Starter overview<\//, 'the bounded source review does not promote content maturity');
assert.doesNotMatch(html, />Route structure complete<\/|>Core route structure<\//, 'the generated guide remains outside mature content states');

console.log('FAN-34 telc first-slice contract passed');

const formatSlug = 'telc-b1-b2-exam-format-and-preparation';
const formatSource = fs.readFileSync(`src/content/guides/${formatSlug}.md`, 'utf8');

assert.equal(frontmatterField(formatSource, 'updatedDate'), '2026-08-14', 'the format guide records its substantive editorial update');
assert.equal(frontmatterField(formatSource, 'sourceReviewedAt'), '2026-08-14', 'the format guide records the exact-product source check');
assert.equal(frontmatterField(formatSource, 'sourceReviewStatus'), 'reviewed', 'the format guide closes its bounded source gap');
assert.equal(frontmatterField(formatSource, 'reviewedByRole'), 'source-review', 'the format guide records the controlled review role');
assert.equal(frontmatterField(formatSource, 'contentStatus'), 'starter-overview', 'the format slice does not promote content maturity');
assert.equal(frontmatterField(formatSource, 'noindex'), 'true', 'the format guide remains outside indexing');
assert.equal(frontmatterField(formatSource, 'adsEligible'), 'false', 'the format guide remains advertising-free');
assert.match(frontmatterField(formatSource, 'audienceScope'), /general.*B1.*B2|Zertifikat Deutsch.*telc Deutsch B2/i, 'the guide is limited to the two exact general products');
assert.match(frontmatterField(formatSource, 'finalDecisionAuthorityType'), /telc.*exam owner.*selected.*centre/i, 'the guide separates product rules from local execution');
assert.match(frontmatterField(formatSource, 'primaryOfficialAuthorityUrl'), /certificate-german-telc-german-b1/i, 'the guide records the exact B1 product source');
assert.match(frontmatterField(formatSource, 'examOwnerUrl'), /telc-german-b2/i, 'the guide records the exact B2 product source');
assert.match(frontmatterField(formatSource, 'localExecutionPrompt'), /selected.*telc.*examination centre/i, 'the guide sends local terms to the selected telc centre');

assert.match(formatSource, /product record/i, 'the guide gives readers an exact-product record');
assert.match(formatSource, /diagnostic record/i, 'the guide gives readers a reusable practice diagnostic');
assert.match(formatSource, /both the written and oral (?:parts|examinations).*60%/is, 'the guide explains the exact-product pass rule');
assert.match(formatSource, /general estimate.*not.*guarantee|not a guaranteed delivery date/is, 'the guide bounds the published result estimate');
assert.match(formatSource, /profession-specific|nursing|medical|school/i, 'the guide excludes materially different variants');
assert.match(formatSource, /selected telc examination centre/i, 'the guide names the local execution owner');
assert.doesNotMatch(formatSource, /real exam questions|copied test items|exam dumps/i, 'the guide does not make unsupported leaked-material claims');
assert.doesNotMatch(formatSource, /(?:€|EUR|\$)\s?\d+|(?:result|certificate|pass|acceptance) is guaranteed|guarantees? (?:a |the )?(?:result|certificate|pass|acceptance)|universally accepted|same day or within a short window/i, 'the guide avoids fixed local facts and positive guarantees');

const formatHtml = fs.readFileSync(`dist/guides/${formatSlug}/index.html`, 'utf8');
assert.match(formatHtml, /Official sources last checked: <time datetime="2026-08-14">2026-08-14<\/time>/, 'the generated format guide renders its bounded source-review date');
assert.doesNotMatch(formatHtml, /Official verification pending/, 'the reviewed format guide does not render a conflicting pending state');
assert.match(formatHtml, />Starter overview<\//, 'the format guide remains visibly outside mature states');

console.log('FAN-37 telc format and preparation contract passed');
