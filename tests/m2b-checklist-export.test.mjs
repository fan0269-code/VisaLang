import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { parse } from 'parse5';

const { buildChecklist } = await import('../src/data/route-tools.ts');
const { serializeChecklist, syncChecklistTakeawayUi } = await import('../src/data/checklist-export.ts');
const { applyToolPatch, createEmptyPlanState, projectStateForTool } = await import('../src/data/plan-state.ts');

assert.equal(typeof serializeChecklist, 'function', 'T16 exposes a dedicated checklist serializer');
const routeId = 'germany-family-reunion-a1';
const checklist = buildChecklist({ routeId });
assert.equal(checklist.status, 'guidance_available', 'the focused export fixture uses the configured route checklist');
const items = checklist.groups.flatMap((group) => group.items);
assert.ok(
  items.every((item) => item.sourceRefs.every((source) => /^\d{4}-\d{2}-\d{2}$/.test(source.sourceCheckedAt))),
  'every controlled checklist source records the date on which that source was checked',
);
const completedId = items[0].id;
const text = serializeChecklist({
  routeTitle: 'Germany family reunion A1',
  generatedDate: '2026-09-09',
  applicationRegion: 'German mission responsible for a China application location',
  certificateStatus: 'No certificate yet',
  checklist,
  checklistState: { [completedId]: true, unknown: true },
});

assert.match(text, /^VisaLang preparation checklist$/m, 'the export identifies the planning artifact');
assert.match(text, /^Route: Germany family reunion A1$/m, 'the export names the exact route');
assert.match(text, /^Generated: 2026-09-09$/m, 'the export records an injected generation date');
assert.match(text, /^Scope: /m, 'the export states its applicability scope');
assert.match(text, /^Application region: German mission responsible for a China application location$/m, 'the safe shared route context carries into the checklist');
assert.match(text, /^Certificate status: No certificate yet$/m, 'the safe certificate branch carries into the checklist');
assert.match(text, new RegExp(`^\\[x\\] ${items[0].action.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm'), 'a completed stable ID serializes as [x]');
assert.match(text, new RegExp(`^\\[ \\] ${items[1].action.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'm'), 'an incomplete stable ID serializes as [ ]');
assert.equal((text.match(/^\[x\] /gm) || []).length, 1, 'unknown state keys do not create extra completed items');
assert.equal((text.match(/^\[ \] /gm) || []).length, items.length - 1, 'every remaining configured item is explicitly incomplete');
assert.match(text, new RegExp(`^Completion: 1/${items.length}$`, 'm'), 'the export reports an exact completed/total count');
assert.match(text, /^Sources:$/m, 'the export includes a source section');
assert.match(text, /https:\/\/www\.auswaertiges-amt\.de\//, 'the export keeps the official source URL');
assert.match(text, /Checked: 2026-09-0[89]/, 'the export keeps each official-source check date');
assert.match(text, /Source boundary:/, 'the export keeps each source boundary');
assert.match(text, /^Overall boundary: /m, 'the export keeps the checklist result boundary');
assert.doesNotMatch(text, /success (?:chance|probability)|visa success/i, 'completion text is not represented as an outcome probability');

execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });
const renderedChecklistPage = fs.readFileSync('dist/tools/checklist-generator/index.html', 'utf8');
const renderedDocument = parse(renderedChecklistPage);
const descendants = (node) => [node, ...(node.childNodes || []).flatMap(descendants)];
const attr = (node, name) => node.attrs?.find((candidate) => candidate.name === name);
const renderedActions = descendants(renderedDocument).find((node) => attr(node, 'data-checklist-actions'));
const renderedControls = descendants(renderedActions).filter((node) => node.tagName === 'button');
const renderedFallback = descendants(renderedDocument).find((node) => attr(node, 'data-checklist-copy-fallback'));
const renderedFallbackText = descendants(renderedFallback).find((node) => node.tagName === 'textarea');
const renderedFeedback = descendants(renderedDocument).find((node) => attr(node, 'data-checklist-feedback'));
const reflectBooleanAttribute = (node, property, attribute = property) => {
  const target = {};
  Object.defineProperty(target, property, {
    enumerable: true,
    get: () => Boolean(attr(node, attribute)),
    set: (value) => {
      node.attrs ||= [];
      const index = node.attrs.findIndex((candidate) => candidate.name === attribute);
      if (value && index === -1) node.attrs.push({ name: attribute, value: '' });
      if (!value && index !== -1) node.attrs.splice(index, 1);
    },
  });
  return target;
};
const reflectText = (node, property) => {
  let value = '';
  const target = {};
  Object.defineProperty(target, property, {
    enumerable: true,
    get: () => value,
    set: (nextValue) => { value = String(nextValue); node.childNodes = [{ nodeName: '#text', value }]; },
  });
  return target;
};
const takeawayUi = {
  container: reflectBooleanAttribute(renderedActions, 'hidden'),
  controls: renderedControls.map((control) => reflectBooleanAttribute(control, 'disabled')),
  feedback: reflectText(renderedFeedback, 'textContent'),
  fallback: reflectBooleanAttribute(renderedFallback, 'hidden'),
  fallbackText: reflectText(renderedFallbackText, 'value'),
};

assert.equal(renderedControls.length, 3, 'the rendered page exposes exactly the three controlled take-away actions');
assert.equal(takeawayUi.container.hidden, true, 'take-away actions start hidden in the rendered page');
assert.ok(takeawayUi.controls.every((control) => control.disabled), 'take-away actions start disabled in the rendered page');

let renderedSerializedText = syncChecklistTakeawayUi(takeawayUi, true, 'configured checklist one');
assert.equal(takeawayUi.container.hidden, false, 'a configured result exposes the rendered take-away actions');
assert.ok(takeawayUi.controls.every((control) => !control.disabled), 'a configured result enables every rendered take-away action');
assert.equal(renderedSerializedText, 'configured checklist one', 'the configured transition retains the serialized checklist');

takeawayUi.feedback.textContent = 'Checklist copied.';
takeawayUi.fallback.hidden = false;
takeawayUi.fallbackText.value = renderedSerializedText;
renderedSerializedText = syncChecklistTakeawayUi(takeawayUi, false, renderedSerializedText);
assert.equal(takeawayUi.container.hidden, true, 'configured to unsupported hides the rendered take-away actions');
assert.ok(takeawayUi.controls.every((control) => control.disabled), 'configured to unsupported disables every rendered take-away action');
assert.equal(renderedSerializedText, '', 'configured to unsupported clears stale serialized text');
assert.equal(takeawayUi.fallback.hidden, true, 'configured to unsupported hides a stale Clipboard fallback');
assert.equal(takeawayUi.fallbackText.value, '', 'configured to unsupported clears stale fallback text');
assert.equal(takeawayUi.feedback.textContent, '', 'configured to unsupported clears stale action feedback');

renderedSerializedText = syncChecklistTakeawayUi(takeawayUi, true, 'configured checklist two');
assert.equal(takeawayUi.container.hidden, false, 'unsupported to configured restores the rendered take-away actions');
assert.ok(takeawayUi.controls.every((control) => !control.disabled), 'unsupported to configured re-enables every rendered take-away action');
assert.equal(renderedSerializedText, 'configured checklist two', 'unsupported to configured accepts the newly serialized checklist');

assert.throws(
  () => serializeChecklist({
    routeTitle: 'Germany family reunion A1',
    generatedDate: '2026-02-30',
    checklist,
    checklistState: {},
  }),
  /calendar date/i,
  'the serializer rejects an impossible generation date instead of exporting misleading metadata',
);

let state = applyToolPatch(createEmptyPlanState(), 'finder', {
  routeId,
  country: 'germany',
  purpose: 'family-reunion',
  applicationRegionId: 'germany-mission-china',
  relationship: 'spouse',
  certificate: 'none',
});
state = applyToolPatch(state, 'checklist', { routeId, checklistState: { [completedId]: true } });
assert.equal(projectStateForTool(state, 'checklist').checklistState[completedId], true, 'the unchanged route restores its checked stable ID');
state = applyToolPatch(state, 'checklist', { routeId: 'germany-b1' });
assert.deepEqual(state.checklistState, {}, 'switching to an inapplicable route clears the old checklist state');
state = applyToolPatch(state, 'checklist', { routeId });
assert.equal(projectStateForTool(state, 'checklist').checklistState[completedId], false, 'switching back does not resurrect state cleared for another route');

const page = fs.readFileSync('src/pages/tools/checklist-generator.astro', 'utf8');
const support = fs.readFileSync('src/components/tools/ToolResultSupport.astro', 'utf8');
const css = fs.readFileSync('src/styles/global.css', 'utf8');
assert.match(
  page,
  /syncTakeaway\(false\);[\s\S]*?if \(checklist\.status !== 'guidance_available'\)[\s\S]*?summary\.append\(generated, scope, checklistContainer, completion, boundary\);[\s\S]*?syncTakeaway\(true\);/,
  'the rendered submit path clears take-away state before the unsupported return and restores it only after configured rendering',
);
assert.match(page, /serializeChecklist/, 'the page uses the dedicated serializer for take-away text');
assert.match(page, /data-checklist-copy-fallback/, 'the page includes a visible selectable Clipboard fallback');
assert.match(page, /\.select\(\)/, 'Clipboard failure focuses and selects the fallback text');
assert.match(page, /navigator\.clipboard\.writeText\(serializedChecklist\)/, 'Clipboard receives the explicit serialized state rather than DOM innerText');
assert.match(page, /new Blob\(\[serializedChecklist\]/, 'text export uses the same explicit serialized state');
assert.match(page, /isZh \? '生成日期' : 'Generated'/, 'the printable result DOM includes locale-aware generation metadata');
assert.match(page, /data-checklist-status/, 'the printable result has an explicit status per item');
assert.match(page, /sourceRef\.sourceCheckedAt/, 'the on-page and printable source list exposes the controlled source-check date');
assert.match(support, /showActions/, 'the shared result support can suppress generic innerText actions for Checklist');
assert.match(css, /body:has\(#checklist-result:not\(\[hidden\]\)\)/, 'print CSS activates only when a checklist result is visible');
assert.doesNotMatch(css, /body:has\(#checklist-result\)(?!:)/, 'the hidden checklist placeholder cannot trigger a blank result-only print');
assert.match(css, /@media print[\s\S]*?\.skip-link[\s\S]*?display: none !important;/, 'print output excludes the screen-only skip link');
assert.match(css, /break-inside:\s*avoid/, 'print CSS protects checklist groups or rows from avoidable splits');

console.log('M2-B T16 checklist export and state contracts passed');
