const assert = require('node:assert/strict');
const fs = require('node:fs');
const { frontmatterField } = require('./frontmatter-field.js');

const feesSlug = 'telc-b1-b2-fees-and-test-centers';
const feesSource = fs.readFileSync(`src/content/guides/${feesSlug}.md`, 'utf8');

assert.equal(frontmatterField(feesSource, 'updatedDate'), '2026-08-14', 'the fees guide records its substantive editorial update');
assert.equal(frontmatterField(feesSource, 'sourceReviewedAt'), '2026-08-14', 'the fees guide records the current centre and fee source check');
assert.equal(frontmatterField(feesSource, 'sourceReviewStatus'), 'reviewed', 'the fees guide closes its bounded source gap');
assert.equal(frontmatterField(feesSource, 'reviewedByRole'), 'source-review', 'the fees guide records the controlled review role');
assert.equal(frontmatterField(feesSource, 'contentStatus'), 'starter-overview', 'the fees slice does not promote content maturity');
assert.equal(frontmatterField(feesSource, 'noindex'), 'true', 'the fees guide remains outside indexing');
assert.equal(frontmatterField(feesSource, 'adsEligible'), 'false', 'the fees guide remains advertising-free');
assert.match(frontmatterField(feesSource, 'audienceScope'), /general.*B1.*B2|Zertifikat Deutsch.*telc Deutsch B2/i, 'the guide is limited to the two exact general products');
assert.match(frontmatterField(feesSource, 'finalDecisionAuthorityType'), /telc.*exam owner.*selected.*centre/i, 'the guide separates provider facts from local execution');
assert.match(frontmatterField(feesSource, 'primaryOfficialAuthorityUrl'), /find-a-telc-examination-centre/i, 'the guide records the first-party centre finder');
assert.match(frontmatterField(feesSource, 'examOwnerUrl'), /language-examinations-support-faq/i, 'the guide records the first-party fee boundary');
assert.match(frontmatterField(feesSource, 'localExecutionPrompt'), /selected.*telc.*examination centre.*(?:total|full).*price.*terms/i, 'the guide sends the final price and terms to the selected centre');

assert.match(feesSource, /centre record/i, 'the guide gives readers a reusable centre record');
assert.match(feesSource, /quote comparison record|fee comparison record/i, 'the guide gives readers a reusable quote comparison');
assert.match(feesSource, /primary business partner|contract(?:ual)? relationship/i, 'the guide explains the centre contract boundary');
assert.match(feesSource, /does not prove.*(?:product|date|seat|fee)|cannot establish.*(?:product|date|seat|fee)/is, 'the guide bounds what a finder listing proves');
assert.match(feesSource, /country|region|local/i, 'the guide tells readers to preserve the regional context');
assert.match(feesSource, /selected telc examination centre/i, 'the guide names the local execution owner');
assert.match(feesSource, /cancellation.*transfer.*refund/is, 'the guide routes dynamic booking terms to the selected centre');
assert.match(feesSource, /complete exam name|exact product/i, 'the guide requires the exact exam product rather than a level label');
assert.doesNotMatch(feesSource, /oral-examiner costs|administrative overhead/i, 'the guide removes unsupported reasons for price differences');
assert.doesNotMatch(feesSource, /(?:€|EUR|\$)\s?\d+|available (?:on|from) [A-Z][a-z]+\s+\d+|guaranteed seat|always available|universally accepted/i, 'the guide avoids fixed local facts and guarantees');

console.log('FAN-38 telc fees and test centres contract passed');
