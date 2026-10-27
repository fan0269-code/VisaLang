import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';
import { transform as compileAstro } from '@astrojs/compiler-rs';
import { transform as compileTypeScript } from 'esbuild';

const { commonToolCopy, getToolCopy, getToolLinks, getReminderTopicOptions, supportedToolLocales } = await import('../src/data/tool-copy.ts');
const { buildChecklist, compareExamProducts, getTimelineResultState, resolveRouteFinder } = await import('../src/data/route-tools.ts');
const { serializeChecklist } = await import('../src/data/checklist-export.ts');
const { createReminderIcs } = await import('../src/data/reminder-ics.ts');
const { applyToolPatch, createEmptyPlanState } = await import('../src/data/plan-state.ts');

const hasHan = (value) => /[\u3400-\u9fff]/u.test(JSON.stringify(value));
const toolIds = ['finder', 'checklist', 'timeline', 'comparison', 'reminders'];

assert.deepEqual(supportedToolLocales, ['en', 'zh-CN'], 'T20 exposes only implemented presentation locales');
for (const toolId of toolIds) {
  const english = getToolCopy(toolId, 'en');
  const chinese = getToolCopy(toolId, 'zh-CN');
  assert.equal(english.id, toolId);
  assert.equal(chinese.id, toolId);
  assert.ok(chinese.title && chinese.submitLabel && chinese.resultTitle, `${toolId} has complete critical-state Chinese copy`);
  assert.ok(hasHan(chinese), `${toolId} contains Chinese reader-facing text`);
  assert.notDeepEqual(chinese, english);
}
assert.deepEqual(getToolLinks('en'), {
  finder: '/tools/route-finder/', checklist: '/tools/checklist-generator/', timeline: '/tools/timeline-calculator/',
  comparison: '/tools/exam-comparison/', reminders: '/tools/email-reminders/',
});
assert.deepEqual(getToolLinks('zh-CN'), {
  finder: '/zh/tools/route-finder/', checklist: '/zh/tools/checklist-generator/', timeline: '/zh/tools/timeline-calculator/',
  comparison: '/zh/tools/exam-comparison/', reminders: '/zh/tools/email-reminders/',
});
assert.ok(getReminderTopicOptions('zh-CN').every((topic) => hasHan(topic.label)));

const finderInput = {
  country: 'germany', purpose: 'family-reunion', applicationRegionId: 'germany-mission-china',
  relationship: 'spouse', certificate: 'none',
};
const finderEn = resolveRouteFinder(finderInput, { asOf: '2026-09-09', locale: 'en' });
const finderZh = resolveRouteFinder(finderInput, { asOf: '2026-09-09', locale: 'zh-CN' });
assert.equal(finderZh.status, finderEn.status, 'locale cannot change Finder state');
assert.equal(finderZh.routeId, finderEn.routeId, 'locale cannot change Finder route');
assert.deepEqual(finderZh.basis, finderEn.basis, 'locale cannot change Finder evidence');
assert.ok(hasHan([finderZh.statusLabel, finderZh.title, finderZh.selectionSummary, finderZh.nextSteps, finderZh.boundary]));

const unsupportedFinderZh = resolveRouteFinder(
  { country: 'other', purpose: 'family-reunion' },
  { asOf: '2026-09-09', locale: 'zh-CN' },
);
assert.equal(unsupportedFinderZh.status, 'unsupported');
assert.equal(
  new Set(unsupportedFinderZh.nextSteps).size,
  unsupportedFinderZh.nextSteps.length,
  'distinct unsupported-route verification questions stay distinct in Chinese',
);
assert.ok(unsupportedFinderZh.nextSteps.every(hasHan));

test('Chinese Route Finder localizes every purpose selector and preserves other-family recovery semantics', () => {
  const selectorCases = [
    {
      input: finderInput,
      status: 'guidance_available',
      title: '德国家庭团聚：A1 核验路线',
    },
    {
      input: { country: 'germany', purpose: 'b1' },
      status: 'unsupported',
      title: '德国 B1 路线：需要向主管机关核验',
    },
    {
      input: { country: 'germany', purpose: 'ausbildung' },
      status: 'unsupported',
      title: '德国职业培训路线：需要向接收申请的机构核验',
    },
    {
      input: { country: 'germany', purpose: 'nursing' },
      status: 'unsupported',
      title: '德国护理路线：需要向监管机关和雇主核验',
    },
    {
      input: { country: 'germany', purpose: 'university' },
      status: 'unsupported',
      title: '德国大学申请路线：需要向大学核验',
    },
    {
      input: { country: 'germany', purpose: 'other' },
      status: 'unsupported',
      title: '此国家与目的尚未配置',
    },
  ];

  for (const selectorCase of selectorCases) {
    const result = resolveRouteFinder(selectorCase.input, { asOf: '2026-09-09', locale: 'zh-CN' });
    assert.equal(result.status, selectorCase.status, `${selectorCase.input.purpose} retains its route state`);
    assert.equal(result.title, selectorCase.title, `${selectorCase.input.purpose} has a branch-specific Chinese title`);
    assert.ok(result.nextSteps.every(hasHan), `${selectorCase.input.purpose} exposes Chinese recovery actions`);
    assert.equal(new Set(result.nextSteps).size, result.nextSteps.length, `${selectorCase.input.purpose} keeps its recovery actions distinct`);
  }

  const otherFamily = resolveRouteFinder({
    ...finderInput,
    relationship: 'other-family',
  }, { asOf: '2026-09-09', locale: 'zh-CN' });
  assert.equal(otherFamily.status, 'unsupported');
  assert.deepEqual(otherFamily.nextSteps, [
    '针对这一准确家庭关系，找到有管辖权的德国使领馆或接收机关。',
    '选择考试或使用配偶团聚核对清单前，先询问这一家庭关系适用的语言证明问题。',
  ], 'the other-family branch retains its two different recovery actions in Chinese');
});

test('Chinese guide CopyButton compiles zh-CN wiring and announces both Clipboard outcomes in Chinese', async () => {
  const guideComponent = await compileAstro(
    fs.readFileSync('src/components/ZhGuideLayout.astro', 'utf8'),
    { filename: 'src/components/ZhGuideLayout.astro' },
  );
  const copyInvocationStart = guideComponent.code.indexOf('$$renderComponent($$result, "CopyButton", CopyButton, {');
  assert.notEqual(copyInvocationStart, -1, 'the compiled guide renders CopyButton');
  const copyInvocationEnd = guideComponent.code.indexOf('})', copyInvocationStart);
  const copyInvocation = guideComponent.code.slice(copyInvocationStart, copyInvocationEnd + 2);
  assert.match(copyInvocation, /"locale": "zh-CN"/, 'the compiled Chinese guide forwards its locale to CopyButton');

  const copyComponent = await compileAstro(
    fs.readFileSync('src/components/CopyButton.astro', 'utf8'),
    { filename: 'src/components/CopyButton.astro' },
  );
  const clientScript = copyComponent.scripts.find((script) => script.type === 'inline')?.code;
  assert.ok(clientScript, 'CopyButton exposes its real inline interaction script');
  const executableScript = await compileTypeScript(
    clientScript.replace(/^import\s+\{\s*commonToolCopy\s*\}\s+from\s+["'][^"']+["'];\s*/m, ''),
    { loader: 'ts', format: 'iife', target: 'es2022' },
  );

  const runCopyInteraction = async (writeText) => {
    let clickHandler;
    const clone = {
      textContent: '中文指南正文',
      querySelectorAll: (selector) => {
        assert.match(selector, /\.article-toc/);
        assert.match(selector, /button/);
        return [];
      },
    };
    const source = { cloneNode: () => clone };
    const feedback = { textContent: '' };
    const button = {
      dataset: { copyTarget: '#zh-guide-content', copyLocale: 'zh-CN' },
      parentElement: { querySelector: (selector) => selector === '[data-copy-feedback]' ? feedback : null },
      addEventListener: (event, handler) => {
        assert.equal(event, 'click');
        clickHandler = handler;
      },
    };
    const context = vm.createContext({
      commonToolCopy,
      document: {
        querySelectorAll: (selector) => {
          assert.equal(selector, '[data-copy-target]');
          return [button];
        },
        querySelector: (selector) => selector === '#zh-guide-content' ? source : null,
      },
      navigator: { clipboard: { writeText } },
    });
    new vm.Script(executableScript.code).runInContext(context);
    assert.equal(typeof clickHandler, 'function', 'the generated CopyButton script wires its click handler');
    await clickHandler();
    return feedback.textContent;
  };

  const copiedText = [];
  assert.equal(
    await runCopyInteraction(async (value) => copiedText.push(value)),
    '已复制。',
    'successful Chinese-guide copying announces success in Chinese',
  );
  assert.deepEqual(copiedText, ['中文指南正文']);
  assert.equal(
    await runCopyInteraction(async () => { throw new Error('Clipboard blocked'); }),
    '无法自动复制，请手动选择并复制结果文字。',
    'blocked Chinese-guide copying announces manual recovery in Chinese',
  );
  assert.equal(commonToolCopy['zh-CN'].copied, '已复制。');
  assert.equal(commonToolCopy['zh-CN'].copyUnavailable, '无法自动复制，请手动选择并复制结果文字。');
});

const routeId = 'germany-family-reunion-a1';
const checklistEn = buildChecklist({ routeId }, { locale: 'en' });
const checklistZh = buildChecklist({ routeId }, { locale: 'zh-CN' });
assert.equal(checklistEn.status, 'guidance_available');
assert.equal(checklistZh.status, checklistEn.status);
assert.deepEqual(
  checklistZh.groups.flatMap((group) => group.items.map((item) => item.id)),
  checklistEn.groups.flatMap((group) => group.items.map((item) => item.id)),
  'locale cannot change checklist stable IDs',
);
assert.deepEqual(
  checklistZh.groups.flatMap((group) => group.items.flatMap((item) => item.sourceRefs.map((source) => [source.url, source.sourceCheckedAt]))),
  checklistEn.groups.flatMap((group) => group.items.flatMap((item) => item.sourceRefs.map((source) => [source.url, source.sourceCheckedAt]))),
  'locale cannot change checklist source URLs or checked dates',
);
assert.ok(hasHan(checklistZh.groups));

const firstId = checklistZh.groups[0].items[0].id;
const exportZh = serializeChecklist({
  routeTitle: '德国家庭团聚 A1', generatedDate: '2026-09-11', applicationRegion: '在中国申请所在地负责的德国使领馆',
  certificateStatus: '尚无证书', checklist: checklistZh, checklistState: { [firstId]: true },
}, { locale: 'zh-CN' });
assert.match(exportZh, /^VisaLang 准备核对清单$/m);
assert.match(exportZh, /^生成日期：2026-09-11$/m);
assert.match(exportZh, /https:\/\/www\.auswaertiges-amt\.de\//);

const timelineInput = { targetDate: '2026-12-15', resultWaitDays: 14, documentPreparationDays: 7, retakeBufferDays: 30 };
const timelineEn = getTimelineResultState(timelineInput, { today: '2026-09-11', locale: 'en' });
const timelineZh = getTimelineResultState(timelineInput, { today: '2026-09-11', locale: 'zh-CN' });
assert.equal(timelineEn.status, 'calculated');
assert.deepEqual(timelineZh, timelineEn, 'locale cannot change valid timeline calculation');
const timelineInvalidZh = getTimelineResultState({ ...timelineInput, targetDate: '2026-02-30' }, { today: '2026-09-11', locale: 'zh-CN' });
assert.equal(timelineInvalidZh.status, 'invalid');
assert.ok(hasHan(timelineInvalidZh.message));

const comparisonEn = compareExamProducts('goethe-zertifikat-a1-start-deutsch-1', 'telc-start-deutsch-1-a1', { locale: 'en' });
const comparisonZh = compareExamProducts('goethe-zertifikat-a1-start-deutsch-1', 'telc-start-deutsch-1-a1', { locale: 'zh-CN' });
assert.equal(comparisonZh.status, comparisonEn.status);
assert.deepEqual(
  comparisonZh.status === 'ready' ? comparisonZh.rows.map((row) => row.id) : [],
  comparisonEn.status === 'ready' ? comparisonEn.rows.map((row) => row.id) : [],
);
assert.ok(hasHan(comparisonZh));

const reminderInput = { topicId: 'confirm-language-requirement', routeId, date: '2026-12-15' };
const reminderEn = createReminderIcs(reminderInput, { generatedAt: '2026-09-11T00:00:00.000Z', locale: 'en' });
const reminderZh = createReminderIcs(reminderInput, { generatedAt: '2026-09-11T00:00:00.000Z', locale: 'zh-CN' });
assert.equal(reminderEn.status, 'ready');
assert.equal(reminderZh.status, 'ready');
assert.equal(reminderZh.uid, reminderEn.uid);
assert.match(reminderZh.content, /SUMMARY:.*[\u3400-\u9fff]/u);
assert.match(reminderZh.content, /DESCRIPTION:.*[\u3400-\u9fff]/u);

for (const toolId of toolIds) {
  const localized = applyToolPatch(createEmptyPlanState('en'), toolId, { locale: 'zh-CN' });
  assert.equal(localized.locale, 'zh-CN', `${toolId} persists locale`);
  assert.equal(localized.applicationRegionId, null, `${toolId} locale never infers region`);
}

assert.match(
  fs.readFileSync('src/styles/global.css', 'utf8'),
  /html\[lang="zh-CN"\] \.tool-form label:has\(\[required\]\)::after\s*\{\s*content:\s*"必填";/,
  'Chinese required-field affordances are localized with the rest of the validation state',
);

console.log('M3 T20 Chinese tool presentation contract passed');
