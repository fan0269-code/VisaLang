const assert = require('node:assert/strict');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const { guideRedirects } = require('../src/data/publication-manifest.ts');

const feeGuidePath = '/guides/goethe-a1-fees-by-country/';

const renderedRow = (html, item) => {
  const match = html.match(new RegExp(`<tr><th scope="row">${item}</th>([\\s\\S]*?)</tr>`));
  assert.ok(match, `rendered verification table includes the ${item} row`);
  return match[0];
};

execFileSync('npm', ['run', 'build'], { stdio: 'inherit' });

const publicRedirects = fs.readFileSync('public/_redirects', 'utf8');
assert.doesNotMatch(publicRedirects, /^\/guides\/goethe-a1-fees-by-country\/\s/m, 'the retained fee guide is not a public redirect source');
assert.equal(guideRedirects[feeGuidePath], undefined, 'the retained fee guide is absent from manifest redirect sources');

const studyPlanHtml = fs.readFileSync('dist/guides/goethe-a1-30-day-study-plan/index.html', 'utf8');
const routeRequirementRow = renderedRow(studyPlanHtml, 'Current route requirement and accepted proof');
assert.match(routeRequirementRow, /Competent German mission or receiving immigration authority for the application route/, 'the study-plan route-requirement row names the authority that can decide application proof');
assert.doesNotMatch(routeRequirementRow, /Goethe-Institut|authorised local centre/i, 'the study-plan route-requirement row does not assign application proof to the exam side');
assert.match(renderedRow(studyPlanHtml, 'Exam product and booking rules'), /Official exam owner and authorised local centre/, 'the separate exam-product and local-booking row retains the exam-side boundary');
assert.match(studyPlanHtml, /<strong>Final decision authority:<\/strong> Goethe-Institut for exam format and an authorised local centre for local administration/, 'the study plan keeps its page-wide exam and local-administration authority');

const chineseA1RequirementHtml = fs.readFileSync('dist/zh/guides/german-family-reunion-language-requirement/index.html', 'utf8');
assert.doesNotMatch(chineseA1RequirementHtml, /检查文中|检查 hub 链接/, 'the Chinese A1 requirement guide does not expose editor-only self-check instructions');

const feeGuideHtml = fs.readFileSync('dist/guides/goethe-a1-fees-by-country/index.html', 'utf8');
assert.ok(fs.existsSync('dist/guides/goethe-a1-fees-by-country/index.html'), 'the retained fee guide is directly generated');
assert.match(feeGuideHtml, /<link rel="canonical" href="https:\/\/visalang\.org\/guides\/goethe-a1-fees-by-country\/">/, 'the retained fee guide renders its own canonical URL');
const feeRouteRequirementRow = renderedRow(feeGuideHtml, 'Current route requirement and accepted proof');
assert.match(feeRouteRequirementRow, /Competent German mission or receiving immigration authority for the application route/, 'the retained fee guide keeps application-proof responsibility with the receiving authority');
assert.match(feeRouteRequirementRow, /href="https:\/\/www\.auswaertiges-amt\.de\/en\/visa-service\/buergerservice\/faq\/04-dtehepartner\/606680"/, 'the retained fee guide links the route-proof row to its official authority source');
assert.match(renderedRow(feeGuideHtml, 'Exam product and booking rules'), /Official exam owner and authorised local centre/, 'the retained fee guide keeps exam and local-booking facts with the exam side');
assert.match(feeGuideHtml, /<strong>Final decision authority:<\/strong> Selected official or authorised test centre/, 'the fee guide keeps its page-wide fee and booking authority');

console.log('Task 2 P0 rendered authority boundaries passed');
