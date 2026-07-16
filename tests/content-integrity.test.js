const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const guideDir = 'src/content/guides';
const files = fs.readdirSync(guideDir).filter((file) => file.endsWith('.md'));
const entries = files.map((file) => ({ file, source: fs.readFileSync(path.join(guideDir, file), 'utf8') }));
const field = (source, name) => {
  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
  return value.replace(/^["']|["']$/g, '');
};
const slugs = new Set(entries.map(({ source }) => field(source, 'slug')));
const bySlug = new Map(entries.map((entry) => [field(entry.source, 'slug'), entry]));
const arrayField = (source, name) => {
  const raw = source.match(new RegExp(`^${name}:\\s*\\[(.*?)\\]`, 'm'))?.[1] || '';
  return [...raw.matchAll(/["']([^"']+)["']/g)].map((match) => match[1]);
};

assert.equal(slugs.size, entries.length, 'Guide slugs must remain unique');
for (const { file, source } of entries) {
  const slug = field(source, 'slug');
  const description = field(source, 'description');
  assert.equal(`${slug}.md`, file, `${file} must match its canonical slug`);
  assert.ok(description.length >= 70 && description.length <= 170, `${file} needs a concise, specific SEO description`);
  assert.match(source, /^updatedDate:\s*"\d{4}-\d{2}-\d{2}"/m, `${file} needs an updated date`);
  assert.doesNotMatch(source, /Official sources last checked:/i, `${file} must not keep source-review dates outside controlled frontmatter`);
  assert.match(source, /https:\/\//, `${file} needs at least one traceable source link`);
  assert.doesNotMatch(source, /guaranteed pass|guaranteed visa|officially endorsed by VisaLang/i, `${file} must not make unsafe outcome or authority claims`);
  const nextGuideSlug = field(source, 'nextGuideSlug');
  assert.ok(slugs.has(nextGuideSlug), `${file} nextGuideSlug must resolve: ${nextGuideSlug}`);
  const supportingGuideSlugs = arrayField(source, 'supportingGuideSlugs');
  assert.ok(supportingGuideSlugs.length > 0, `${file} needs controlled supporting guides`);
  for (const relatedSlug of supportingGuideSlugs) assert.ok(slugs.has(relatedSlug), `${file} supporting guide slug must resolve: ${relatedSlug}`);
  const category = field(source, 'category');
  const decisionStage = field(source, 'decisionStage');
  assert.ok(supportingGuideSlugs.some((relatedSlug) => {
    const relatedSource = bySlug.get(relatedSlug)?.source || '';
    return field(relatedSource, 'category') === category || field(relatedSource, 'decisionStage') === decisionStage;
  }), `${file} needs at least one related guide in the same route or decision stage`);
  assert.match(field(source, 'comparisonScope'), /^(same-route|cross-country-comparison)$/, `${file} needs a controlled comparison scope`);
}

const contentSchema = fs.readFileSync('src/content.config.ts', 'utf8');
for (const fieldName of ['sourceReviewedAt', 'sourceReviewStatus', 'reviewedByRole', 'contentStatus', 'primaryIntent', 'decisionStage', 'nextGuideSlug', 'supportingGuideSlugs', 'comparisonScope', 'audienceScope', 'finalDecisionAuthorityType', 'primaryOfficialAuthorityUrl', 'examOwnerUrl', 'localExecutionPrompt']) {
  assert.ok(contentSchema.includes(fieldName), `guide schema validates ${fieldName}`);
}
assert.match(contentSchema, /sourceReviewStatus:\s*z\.enum\(sourceReviewStatuses\)\.default\('pending'\)/, 'legacy guides migrate to an explicit pending source-review state');
assert.match(contentSchema, /sourceReviewedAt is required when sourceReviewStatus is reviewed/, 'reviewed guides require a source-review date');
assert.match(contentSchema, /sourceReviewedAt is only valid when sourceReviewStatus is reviewed/, 'pending and not-applicable guides cannot carry a misleading source-review date');
assert.match(contentSchema, /reviewedByRole is required when sourceReviewStatus is reviewed/, 'reviewed guides require a reviewer role');
assert.match(contentSchema, /contentStatus:\s*z\.enum\(contentStatuses\)/, 'guides require a controlled content status');

const statusDomain = fs.readFileSync('src/data/source-review.ts', 'utf8');
assert.match(statusDomain, /resolveGuideContentStatus/, 'content status uses one shared gate');
assert.match(statusDomain, /!guide\.primaryOfficialAuthorityUrl \|\| guide\.sourceReviewStatus !== 'reviewed'/, 'high-risk elevated status requires a final authority URL and reviewed sources');
assert.match(statusDomain, /if \(status === 'complete-route'\)/, 'complete routes use the controlled CTA mapping');
assert.match(statusDomain, /if \(status === 'core-route'\)/, 'core routes use the controlled CTA mapping');
assert.match(statusDomain, /if \(status === 'starter-overview'\)/, 'starter routes use the controlled CTA mapping');
const pendingCtaBranch = statusDomain.slice(statusDomain.indexOf("if (status === 'starter-overview')"));
assert.doesNotMatch(pendingCtaBranch, /Route Finder|checklist/i, 'verification-pending CTA branch cannot expose individual-decision tools');

const highRiskCategories = new Set(['portugal', 'spain', 'uk', 'canada', 'italy', 'france', 'finland', 'netherlands']);
const highRiskEntries = entries.filter(({ source }) => highRiskCategories.has(field(source, 'category')));
assert.equal(highRiskEntries.length, 16, 'P0-2 audit covers the 16 approved high-risk guides');
for (const { file, source } of highRiskEntries) {
  assert.equal(field(source, 'contentStatus'), 'verification-pending', `${file} remains verification-pending without a reviewed source package`);
  for (const fieldName of ['primaryIntent', 'audienceScope', 'finalDecisionAuthorityType', 'examOwnerUrl', 'localExecutionPrompt']) {
    assert.ok(field(source, fieldName), `${file} records ${fieldName}`);
  }
  assert.equal(field(source, 'localExecutionPrompt'), 'Before registering, check the current requirement with the authority that receives your application. This page helps you prepare the questions and official sources to use.', `${file} uses the approved non-conclusive verification prompt`);
}
const highRiskAudit = fs.readFileSync('docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md', 'utf8');
for (const { file } of highRiskEntries) assert.ok(highRiskAudit.includes(`src/content/guides/${file}`), `${file} appears in the high-risk source audit`);

const blockedFactEditSlugs = [
  'delf-b1-b2-french-work-study',
  'tcf-irn-french-residence',
  'staatsexamen-nt2-for-work-and-higher-education',
];
for (const slug of blockedFactEditSlugs) {
  const source = bySlug.get(slug)?.source || '';
  assert.match(source, /Official verification required/i, `${slug} exposes the blocked verification boundary in its body`);
}
const blockedClaims = {
  'dele-levels-spanish-citizenship': /legal minimum|not required for citizenship|DELE A2 is the standard reference/i,
  'dele-a2-ccse-spanish-citizenship': /10 years|2 years for some nationalities|must pass both/i,
  'delf-b1-b2-french-work-study': /valid for life|often requires B2 or C1|lifetime validity/i,
  'tcf-irn-french-residence': /Applicants for a multi-year residence permit|Applicants for French citizenship|requiring a B1 level/i,
  'staatsexamen-nt2-for-work-and-higher-education': /For vocational education \(MBO\) and jobs|For higher education \(HBO\/university\)|NT2 is the one/i,
};
for (const [slug, unsafePattern] of Object.entries(blockedClaims)) {
  assert.doesNotMatch(bySlug.get(slug)?.source || '', unsafePattern, `${slug} does not retain the audited deterministic claim`);
}

for (const slug of ['dele-levels-spanish-citizenship', 'dele-a2-ccse-spanish-citizenship']) {
  const source = bySlug.get(slug)?.source || '';
  assert.equal(field(source, 'sourceReviewStatus'), 'reviewed', `${slug} records the completed narrow source review`);
  assert.equal(field(source, 'sourceReviewedAt'), '2026-07-16', `${slug} records the real source-review date`);
  assert.equal(field(source, 'contentStatus'), 'verification-pending', `${slug} remains pending despite the reviewed source package`);
  assert.match(field(source, 'primaryOfficialAuthorityUrl'), /mjusticia\.gob\.es/, `${slug} records the Spanish deciding authority`);
  assert.match(source, /does not establish|cannot decide|does not let VisaLang decide/i, `${slug} keeps the applicant-specific decision boundary`);
}

const lastCheckedBadge = fs.readFileSync('src/components/LastCheckedBadge.astro', 'utf8');
assert.match(lastCheckedBadge, /status === 'reviewed' && date/, 'source-review dates render only for reviewed records');
assert.match(lastCheckedBadge, /Official verification pending/, 'pending records render a clear source-review state');
assert.match(lastCheckedBadge, /Official source review not applicable/, 'not-applicable records render a distinct source-review state');

const guideRoute = fs.readFileSync('src/pages/guides/[slug].astro', 'utf8');
const guideLayout = fs.readFileSync('src/layouts/GuideLayout.astro', 'utf8');
assert.doesNotMatch(guideRoute, /guide\.body\.match\(\/Official sources last checked/, 'guide routes do not infer review dates from Markdown body text');
assert.match(guideRoute, /sourceReviewedAt=\{frontmatter\.sourceReviewedAt\}/, 'guide routes pass the controlled source-review date');
assert.match(guideLayout, /<LastCheckedBadge date=\{sourceReviewedAt\} status=\{sourceReviewStatus\}/, 'guide HTML delegates source-review output to controlled metadata');
assert.doesNotMatch(guideLayout, /<LastCheckedBadge date=\{updatedDate\}/, 'updatedDate is never used as a source-review date');
assert.match(guideRoute, /author=\{frontmatter\.author\}/, 'guide routes pass the controlled author');
assert.match(guideRoute, /reviewedByRole=\{frontmatter\.reviewedByRole\}/, 'guide routes pass the controlled review role');
assert.match(guideLayout, /<dt>Written by<\/dt><dd>\{author\}<\/dd>/, 'visible byline uses the same controlled author value');
assert.match(guideLayout, /name: author/, 'Article JSON-LD uses the same controlled author value');
assert.match(guideRoute, /comparisonScope === 'cross-country-comparison' && \/compar\/i/, 'cross-country related guides require comparison scope and explicit intent');

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
assert.match(deployScript, /npm --prefix .* run build/, 'deployment builds Astro before publishing');
assert.match(deployScript, /SOURCE_DIR\/dist\/index\.html/, 'deployment blocks publication without the Astro root entry');
assert.match(deployScript, /cp -a \"\$SOURCE_DIR\/dist\//, 'deployment publishes the complete Astro dist output');
assert.match(deployScript, /SUDO="sudo"/, 'deployment supports the ubuntu plus sudo server account');

console.log('guide sources, related links, compliance, app data, legacy handoff, and deployment checks passed');
