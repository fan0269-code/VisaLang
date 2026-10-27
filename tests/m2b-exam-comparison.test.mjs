import assert from 'node:assert/strict';
import fs from 'node:fs';

const { examProducts } = await import('../src/data/claim-registry.ts');
const { compareExamProducts, examComparisonOptions } = await import('../src/data/route-tools.ts');
const { applyToolPatch, createEmptyPlanState } = await import('../src/data/plan-state.ts');

const goetheId = 'goethe-zertifikat-a1-start-deutsch-1';
const telcId = 'telc-start-deutsch-1-a1';
assert.deepEqual(examComparisonOptions.filter((option) => examProducts.find((product) => product.id === option.id)?.level === 'A1').map((product) => product.id), [goetheId, telcId], 'T17 remains scoped to the two source-reviewed adult A1 products');

const ready = compareExamProducts(goetheId, telcId, { asOf: '2026-09-09' });
assert.equal(ready.status, 'ready', 'two distinct current products produce the complete comparison');
assert.equal(ready.rows.length, 4, 'the result keeps four independently sourced product dimensions');
assert.equal(ready.localRows.length, 3, 'local execution, fee/booking, and acceptance remain explicit unresolved dimensions');
for (const row of ready.rows) {
  assert.match(row.firstSourceUrl, /^https:\/\//, `${row.id} has a direct first-product source`);
  assert.match(row.secondSourceUrl, /^https:\/\//, `${row.id} has a direct second-product source`);
  assert.ok(row.firstValue && row.secondValue, `${row.id} keeps independent non-empty product values`);
}
for (const row of ready.localRows) {
  assert.doesNotMatch(`${row.firstValue}\n${row.secondValue}`, /(?:^|\D)0(?:\D|$)/, `${row.id} does not convert an unknown local value to zero`);
  assert.equal(row.firstStatus, 'needs_authority_confirmation', `${row.id} keeps the first local unknown explicit`);
  assert.equal(row.secondStatus, 'needs_authority_confirmation', `${row.id} keeps the second local unknown explicit`);
}

const telc = examProducts.find((product) => product.id === telcId);
assert.equal(
  telc?.officialPracticeUrl,
  'https://shop.telc.net/media/catalog/product/file/2/0/20210103_5070-b00-010106_web_1.pdf',
  'telc practice navigation reaches the official mock examination rather than duplicating the product page',
);

const same = compareExamProducts(goetheId, goetheId, { asOf: '2026-09-09' });
assert.equal(same.status, 'same_product', 'the data contract distinguishes same-product input');
assert.match(same.message, /different exam products/i, 'same-product output tells the user how to correct the selection');

const retiredProducts = examProducts.map((product) => product.id === goetheId ? { ...product, status: 'withdrawn' } : product);
const unsupported = compareExamProducts(goetheId, telcId, { products: retiredProducts, asOf: '2026-09-09' });
assert.equal(unsupported.status, 'unsupported', 'a withdrawn or invalid product fails closed');
assert.match(unsupported.message, /supported, source-reviewed/i, 'unsupported output explains the missing product evidence');
assert.equal(Object.hasOwn(unsupported, 'rows'), false, 'unsupported output exposes no stale fact rows');

const sameState = applyToolPatch(createEmptyPlanState(), 'comparison', { firstExamId: goetheId, secondExamId: goetheId });
assert.deepEqual(sameState.selectedExamIds, [], 'shared state does not persist a one-product pseudo-comparison');
const partialState = applyToolPatch(createEmptyPlanState(), 'comparison', { firstExamId: goetheId, secondExamId: 'unsupported-product' });
assert.deepEqual(partialState.selectedExamIds, [], 'shared state does not persist a partial or unsupported comparison');
const readyState = applyToolPatch(createEmptyPlanState(), 'comparison', { firstExamId: goetheId, secondExamId: telcId });
assert.deepEqual(readyState.selectedExamIds, [goetheId, telcId], 'shared state persists exactly two valid, different product IDs');

const page = fs.readFileSync('src/pages/tools/exam-comparison.astro', 'utf8');
const globalCss = fs.readFileSync('src/styles/global.css', 'utf8');
assert.match(page, /comparison\.status === 'same_product'/, 'the page renders the same-product result instead of returning silently');
assert.match(page, /comparison\.status === 'unsupported'/, 'the page renders the unsupported/stale-source result instead of returning silently');
assert.match(page, /renderComparisonStatus/, 'non-ready results share a visible, focusable status renderer');
assert.match(page, /resultPanel\.focus\(\)/, 'every submitted result moves focus to the result region');
assert.match(page, /comparison\.status !== 'ready'[\s\S]{0,500}return;[\s\S]{0,500}plan\.persist/, 'only a ready result reaches shared-state persistence');
assert.match(page, /tableWrap\.tabIndex = 0/, 'the comparison region remains keyboard focusable');
assert.match(page, /Scroll left and right to view all comparison columns/, 'the narrow-screen scrolling instruction remains visible');
assert.match(page, /firstSource\.href = fact\.firstSourceUrl[\s\S]*secondSource\.href = fact\.secondSourceUrl/, 'each comparison column retains its own official link');
assert.match(page, /firstPractice\.href = comparison\.first\.officialPracticeUrl[\s\S]*secondPractice\.href = comparison\.second\.officialPracticeUrl/, 'each ready comparison column exposes its own official-practice destination');
assert.match(page, /Official practice material/, 'the ready result labels the user-visible official-practice links');
assert.match(
  globalCss,
  /\.tool-form,\s*\.tool-result,\s*\.tool-result-panel\s*\{[^}]*min-width:\s*0;/,
  'tool result grid items can shrink at 390 CSS px so only the comparison table wrapper scrolls horizontally',
);

console.log('M2-B T17 Exam Comparison result contracts passed');
