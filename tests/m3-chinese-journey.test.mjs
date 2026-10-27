import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parse } from 'parse5';

const { translatedPaths } = await import('../src/data/site.ts');
const { getToolLinks } = await import('../src/data/tool-copy.ts');
const { zhA1TaskReconciliation } = await import('../src/data/zh-guide-task-reconciliation.ts');

const toolSlugs = ['route-finder', 'checklist-generator', 'timeline-calculator', 'exam-comparison', 'email-reminders'];
const toolIds = ['finder', 'checklist', 'timeline', 'comparison', 'reminders'];
const englishLinks = getToolLinks('en');
const chineseLinks = getToolLinks('zh-CN');

for (let index = 0; index < toolSlugs.length; index += 1) {
  const slug = toolSlugs[index];
  const id = toolIds[index];
  const wrapperPath = `src/pages/zh/tools/${slug}.astro`;
  assert.ok(fs.existsSync(wrapperPath), `${wrapperPath} exists`);
  const wrapper = fs.readFileSync(wrapperPath, 'utf8');
  assert.match(wrapper, new RegExp(`locale=["']zh-CN["']`), `${slug} passes the Chinese locale into the shared implementation`);
  assert.equal(translatedPaths[englishLinks[id]], chineseLinks[id], `${slug} has a genuine English-to-Chinese equivalence mapping`);
}

assert.equal(
  translatedPaths['/guides/german-family-reunion-language-requirement/'],
  undefined,
  'the China-scoped requirement guide is not mechanically paired to a broader English guide',
);
for (const deletedPath of [
  '/guides/goethe-a1-germany-family-reunion/',
  '/guides/goethe-a1-booking-mistakes/',
  '/guides/german-a1-documents-checklist/',
]) assert.equal(translatedPaths[deletedPath], undefined, `${deletedPath} is not treated as a live language equivalent`);

assert.equal(zhA1TaskReconciliation.length, 8, 'all eight audited historical Chinese A1 tasks are classified');
assert.equal(new Set(zhA1TaskReconciliation.map((entry) => entry.historicalPath)).size, 8, 'each historical Chinese task path is unique');
assert.equal(new Set(zhA1TaskReconciliation.map((entry) => entry.maintainedPath)).size, 5, 'eight tasks resolve to the five maintained Chinese guide successors');
assert.ok(zhA1TaskReconciliation.every((entry) => entry.taskId && entry.evidence && entry.migrationState === 'not_assessed'));
assert.equal(zhA1TaskReconciliation.filter((entry) => entry.preservation === 'absorbed-task-module').length, 3);
assert.ok(zhA1TaskReconciliation.every((entry) => fs.existsSync(`src/pages${entry.maintainedPath}index.astro`.replace('/index.astro', '.astro'))));

for (const file of [
  'src/layouts/ToolLayout.astro',
  'src/components/tools/ToolShell.astro',
  'src/components/tools/ToolResultSupport.astro',
  'src/components/CopyButton.astro',
  'src/components/PrintButton.astro',
  'src/components/ExportButton.astro',
]) {
  const source = fs.readFileSync(file, 'utf8');
  assert.match(source, /locale/, `${file} accepts or derives locale-aware presentation`);
}
for (const slug of toolSlugs) {
  const source = fs.readFileSync(`src/pages/tools/${slug}.astro`, 'utf8');
  assert.match(source, /getToolCopy/, `${slug} renders from the shared bilingual copy contract`);
  assert.match(source, /locale/, `${slug} forwards locale into dynamic and shared states`);
}

for (const file of ['src/pages/zh/index.astro', 'src/pages/zh/germany-family-reunion-a1.astro', 'src/components/ZhGuideLayout.astro']) {
  const source = fs.readFileSync(file, 'utf8');
  assert.match(source, /\/zh\/tools\//, `${file} links Chinese readers into the Chinese tool journey`);
  assert.doesNotMatch(source, /工具(?:为|目前为|界面为).*英文|English-only tool|tools? (?:is|are) in English/i, `${file} no longer labels the implemented tools as English-only`);
}

const descendants = (node) => [node, ...(node.childNodes || []).flatMap(descendants)];
const attr = (node, name) => node.attrs?.find((candidate) => candidate.name === name)?.value;
for (const slug of toolSlugs) {
  const output = `dist/zh/tools/${slug}/index.html`;
  assert.ok(fs.existsSync(output), `${slug} is generated as a static Chinese route`);
  const html = fs.readFileSync(output, 'utf8');
  const document = parse(html);
  const nodes = descendants(document);
  const root = nodes.find((node) => node.tagName === 'html');
  assert.equal(attr(root, 'lang'), 'zh-CN', `${slug} renders zh-CN at the document root`);
  assert.match(html, /[\u3400-\u9fff]/u, `${slug} contains Chinese interface copy`);
  assert.doesNotMatch(html, />\s*(?:Route Finder|Requirement Checklist|Timeline Planner|Exam Comparison|Reminder Planner)\s*</, `${slug} does not expose an English-only primary title`);
  for (const href of Object.values(chineseLinks)) assert.match(html, new RegExp(`href=["']${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`), `${slug} keeps all five Chinese continuation routes available`);
  assert.match(html, /保存|复制|导出|下载|打印/u, `${slug} exposes a Chinese save/copy/export/download/print action vocabulary`);
}

console.log('M3 T20 Chinese journey and eight-task reconciliation passed');
