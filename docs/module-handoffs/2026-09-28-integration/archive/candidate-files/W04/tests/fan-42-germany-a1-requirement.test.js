const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const guide = fs.readFileSync(path.join(root, 'src/content/guides/german-family-reunion-language-requirement.md'), 'utf8');

assert.match(guide, /^slug: "german-family-reunion-language-requirement"$/m, 'FAN-42 remains scoped to the selected Germany A1 requirement root');
assert.match(guide, /^sourceReviewedAt: "2026-09-08"$/m, 'FAN-42 records the current official-source check date');
assert.match(guide, /competent German mission abroad; that mission forwards the application to the foreigners authority/, 'the page preserves the official application handoff');
assert.match(guide, /responsible German mission or competent immigration authority decides the visa route and its document instructions/, 'visa document authority is not assigned to an exam centre');
assert.match(guide, /A selected exam centre controls only its current booking and test-day process/, 'the local exam-centre boundary remains explicit');
assert.match(guide, /\/tools\/route-finder\//, 'the requirement root keeps a discoverable next-step tool');
assert.match(guide, /^nextGuideSlug: "goethe-a1-vs-telc-a1"$/m, 'the requirement root hands directly to the seven-pillar comparison stage');
assert.match(guide, /^## Who this is for$/m, 'the requirement root identifies the bounded reader before giving route guidance');
assert.match(guide, /^## Route classification worksheet$/m, 'the requirement root provides a reusable route-classification asset');
assert.match(guide, /^## Mission question script$/m, 'the requirement root provides a safe escalation script instead of deciding an exception');
assert.match(guide, /^## Scenario: the sponsor has a residence permit$/m, 'the requirement root distinguishes a residence-permit scenario from a German-national route');
const chineseRequirementPage = fs.readFileSync(path.join(root, 'src/pages/zh/guides/german-family-reunion-language-requirement.astro'), 'utf8');
assert.match(chineseRequirementPage, /可保存的主管机关问询卡/, 'the Chinese requirement guide has a reusable authority-question card');
assert.match(chineseRequirementPage, /准确证书名称\/级别、文件形式及页面写明的日期条件/, 'the authority card records the authority’s exact proof requirements');
assert.match(chineseRequirementPage, /证据与检查日/, 'the authority card records an official evidence link and reader check date');
assert.match(chineseRequirementPage, /不填证件号、案号、证书编号/, 'the reusable card excludes personal identifiers and private documents');

const certificateGuide = fs.readFileSync(path.join(root, 'src/content/guides/goethe-a1-germany-family-reunion.md'), 'utf8');
const chineseCertificatePage = fs.readFileSync(path.join(root, 'src/pages/zh/guides/goethe-a1-germany-family-reunion.astro'), 'utf8');
assert.match(certificateGuide, /^contentStatus: "verification-pending"$/m, 'C07 retains its current content status pending separate evidence');
assert.match(certificateGuide, /^noindex: true$/m, 'C07 remains noindex');
assert.match(certificateGuide, /^adsEligible: false$/m, 'C07 remains ad-free');
for (const field of ['Product', 'Exam date', 'Current receiving-authority entry', 'Requirement stated by that authority', 'Evidence checked', 'Unresolved question']) {
  assert.ok(certificateGuide.includes(`| ${field} |`), `C07 certificate card records ${field}`);
}
assert.match(certificateGuide, /checked 2026-09-25/, 'the changed certificate source record uses the date actually checked');
assert.match(chineseCertificatePage, /准确产品[\s\S]*考试日期[\s\S]*当前受理机关入口[\s\S]*该机关要求[\s\S]*证据与检查日[\s\S]*待确认问题/, 'the Chinese certificate card includes every required reader record');
const savedCertificateCard = chineseCertificatePage.match(/<table>([\s\S]*?)<\/table>/)?.[1] || '';
assert.ok(savedCertificateCard.length > 0, 'the Chinese certificate task supplies a table that can be copied into a private note');
assert.match(chineseCertificatePage, /不填证件号、案号、证书编号，也不附私人文件或证书扫描件/, 'the card instructions explicitly exclude sensitive identifiers and private files');
assert.doesNotMatch(savedCertificateCard, /<td>(?:护照号|证书编号|案号|扫描件)<\/td>/, 'the card has no field that collects an identifier or private document');

console.log('FAN-42 Germany A1 requirement review contract passed');
