import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parse } from 'parse5';
import { claimRegistry, examProducts } from '../src/data/claim-registry.ts';
import { compareExamProducts, getExamComparisonOptions, buildChecklist } from '../src/data/route-tools.ts';
import { applyToolPatch, createEmptyPlanState } from '../src/data/plan-state.ts';
import { configuredExams, exams } from '../src/data/app-data.ts';

const ids = ['goethe-zertifikat-b1', 'telc-zertifikat-deutsch-b1'];
const asOf = '2026-09-13';
const compare = (options = {}) => compareExamProducts(...ids, { asOf, ...options });
const ready = compare();
assert.equal(ready.status, 'ready', 'two independently verified adult B1 products produce a comparison');
assert.equal(ready.rows.length, 4);
assert.deepEqual(ready.rows.map((row) => row.id), ['written-structure-and-duration', 'oral-format-and-duration', 'score-rule', 'whole-or-partial-sitting']);
const byId = Object.fromEntries(ready.rows.map((row) => [row.id, row]));
assert.match(byId['written-structure-and-duration'].firstValue, /65[\s\S]*40[\s\S]*60[\s\S]*165/);
assert.match(byId['written-structure-and-duration'].secondValue, /90[\s\S]*30[\s\S]*30/);
assert.match(byId['oral-format-and-duration'].firstValue, /15[\s\S]*10[\s\S]*15/);
assert.match(byId['oral-format-and-duration'].secondValue, /15[\s\S]*20/);
assert.match(byId['score-rule'].firstValue, /60[\s\S]*100[\s\S]*each module/);
assert.match(byId['score-rule'].secondValue, /135[\s\S]*225[\s\S]*45[\s\S]*75/);
assert.match(byId['whole-or-partial-sitting'].firstValue, /module[\s\S]*certificate/i);
assert.match(byId['whole-or-partial-sitting'].secondValue, /12 months[\s\S]*results sheet[\s\S]*registration/);
assert.doesNotMatch(byId['whole-or-partial-sitting'].secondValue, /following calendar year/);
for (const product of examProducts.filter((product) => ids.includes(product.id))) {
  assert.equal(product.level, 'B1');
  assert.equal(product.sourceCheckedAt, asOf);
  assert.equal(product.localFee.amount, null);
  assert.equal(product.localFee.currency, null);
  for (const fact of product.comparisonFacts) {
    assert.equal(fact.sourceCheckedAt, asOf);
    assert.ok(fact.labelZh && fact.valueZh && fact.source.locator && fact.source.boundary);
  }
}
assert.equal(ready.localRows.length, 3);
assert.ok(ready.localRows.every((row) => row.firstStatus === 'needs_authority_confirmation' && row.secondStatus === 'needs_authority_confirmation' && row.firstSourceUrl === null && row.secondSourceUrl === null));
const zh = compare({ locale: 'zh-CN' });
assert.equal(zh.status, 'ready');
for (const row of zh.rows) assert.ok(/[\u3400-\u9fff]/u.test(row.label) && /[\u3400-\u9fff]/u.test(row.firstValue) && /[\u3400-\u9fff]/u.test(row.secondValue));
for (const [first, second, status] of [[ids[0], ids[0], 'same_product'], ['', ids[1], 'unsupported'], ['dtz', ids[1], 'unsupported'], ['goethe-zertifikat-a1-start-deutsch-1', ids[1], 'unsupported']]) {
  const result = compareExamProducts(first, second, { asOf });
  assert.equal(result.status, status);
  assert.equal(Object.hasOwn(result, 'rows'), false);
}
const fail = (options, label) => {
  const result = compare(options);
  assert.equal(result.status, 'unsupported', label);
  assert.equal(Object.hasOwn(result, 'rows'), false, `${label}: no fact rows`);
  if (options.products) assert.equal(getExamComparisonOptions({ ...options, asOf }).some((p) => p.id === ids[0]), false, `${label}: no invalid option`);
};
for (const patch of [
  { status: 'draft' }, { status: 'withdrawn' }, { status: 'needs_review' },
  { comparisonFacts: [] }, { comparisonFacts: undefined }, { comparisonFacts: [null] },
  { productClaim: undefined }, { usedBy: [] }, { localFee: null }, { acceptance: null },
  { localFee: {} }, { acceptance: {} }, { localExecutionBoundary: '' }, { effectiveTo: '2026-09-12' },
  { version: 'wrong' }, { sourceCheckedAt: '2026-09-14' },
  { productClaim: examProducts.find((p) => p.id === ids[1]).productClaim },
  { effectiveFrom: '2026-02-30' },
]) {
  fail({ products: examProducts.map((p) => p.id === ids[0] ? { ...p, ...patch } : p) }, JSON.stringify(patch));
}
for (const level of [undefined, null, '', 'A2', 'b1']) {
  const products = examProducts.map((p) => ids.includes(p.id) ? { ...p, level } : p);
  fail({ products }, 'missing or unsupported product level');
  assert.ok(getExamComparisonOptions({ products, asOf }).every((p) => !ids.includes(p.id)));
}
const first = examProducts.find((p) => p.id === ids[0]);
for (const facts of [first.comparisonFacts.slice(1), [...first.comparisonFacts.slice(0, 3), first.comparisonFacts[0]], first.comparisonFacts.map((f, i) => i ? f : { ...f, valueZh: '' }), first.comparisonFacts.map((f, i) => i ? f : { ...f, source: null })]) {
  fail({ products: examProducts.map((p) => p.id === ids[0] ? { ...p, comparisonFacts: facts } : p) }, 'missing, duplicate or malformed fact');
}
fail({ products: [...examProducts, { ...first }] }, 'duplicate product identity');
assert.equal(getExamComparisonOptions({ products: [...examProducts, { ...first }], asOf }).some((p) => p.id === first.id), false);
fail({ claims: claimRegistry.filter((c) => c.claimId !== first.productClaim.claimId) }, 'missing claim');
fail({ claims: [...claimRegistry, claimRegistry.find((c) => c.claimId === first.productClaim.claimId)] }, 'conflicting claim');
fail({ claims: claimRegistry.map((c) => c.claimId === first.productClaim.claimId ? { ...c, status: 'needs_review' } : c) }, 'unreviewed claim');
fail({ asOf: '2026-12-14' }, 'expired evidence');
fail({ consumerId: 'guide:goethe-a1-vs-telc-a1', consumerLocale: 'en' }, 'A1 guide cannot consume B1 claim');
assert.equal(compare({ consumerId: 'guide:goethe-b1-vs-telc-b1', consumerLocale: 'en' }).status, 'ready');
const plan = applyToolPatch(createEmptyPlanState(), 'comparison', { firstExamId: ids[0], secondExamId: ids[1] });
assert.deepEqual(plan.selectedExamIds, ids);
const mixedPlan = applyToolPatch(createEmptyPlanState(), 'comparison', { firstExamId: 'goethe-zertifikat-a1-start-deutsch-1', secondExamId: ids[1] });
assert.equal(compareExamProducts(...mixedPlan.selectedExamIds, { asOf }).status, 'unsupported', 'restored mixed-level selections cannot expose a ready comparison');
assert.equal(buildChecklist({ routeId: 'germany-b1', selectedExamIds: ids }).status, 'unsupported', 'B1 selection cannot manufacture A1 checklist support');
assert.equal(exams.length, 31);
assert.equal(configuredExams.length, 4);
assert.equal(new Set(exams.map((e) => e.name)).size, 31);
assert.deepEqual(exams.slice(0, 4), configuredExams);
assert.ok(fs.readFileSync('src/layouts/GuideLayout.astro', 'utf8').includes('level="B1"'));
const comparisonPage = fs.readFileSync('src/pages/tools/exam-comparison.astro', 'utf8');
const recoveryExpression = comparisonPage.match(/missing\.textContent = ([\s\S]*?);/)[1];
const renderRecovery = new Function('status', 'isZh', `return (${recoveryExpression});`);
assert.equal(renderRecovery('same_product', false), 'Select another exact adult product at the same level so each column represents a different product.');
assert.equal(renderRecovery('same_product', true), '请选择同一等级的另一个准确成人考试产品，使两列代表不同产品。');
if (process.argv.includes('--built')) {
  for (const slug of ['goethe-b1-vs-telc-b1', 'goethe-b1-fees-and-booking']) {
    const tree = parse(fs.readFileSync(`dist/guides/${slug}/index.html`, 'utf8'));
    const nodes = (node) => [node, ...(node.childNodes || []).flatMap(nodes)];
    const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
    const wrappers = nodes(tree).filter((node) => attr(node, 'class')?.includes('responsive-table'));
    assert.equal(wrappers.length, 1, `${slug} has one responsive worksheet`);
    for (const wrapper of wrappers) {
      assert.equal(attr(wrapper, 'role'), 'region');
      assert.equal(attr(wrapper, 'tabindex'), '0');
      assert.ok(attr(wrapper, 'aria-label'));
      assert.equal(nodes(wrapper).filter((node) => node.tagName === 'table').length, 1);
    }
    assert.match(fs.readFileSync(`dist/guides/${slug}/index.html`, 'utf8'), /scroll horizontally on a narrow screen/);
  }
  const html = fs.readFileSync('dist/guides/goethe-b1-vs-telc-b1/index.html', 'utf8');
  assert.match(html, /data-exam-product-registry/);
  for (const row of ready.rows) {
    assert.ok(html.includes(row.firstValue.replaceAll('&', '&amp;')));
    assert.ok(html.includes(row.secondValue.replaceAll('&', '&amp;')));
  }
}
console.log('T25 B1 sourced comparison, localized output, fail-closed lifecycle and directory contracts passed');
