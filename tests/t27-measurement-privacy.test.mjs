import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  MEASUREMENT_CONTRACT_VERSION,
  MEASUREMENT_TRANSPORT,
  measurementActionsByTool,
  measurementEventDefinitions,
  measurementEventNames,
  measurementForbiddenData,
  measurementLocales,
  measurementResultStatuses,
  measurementStatusByTool,
  measurementToolIds,
  buildMeasurementEvent,
  validateMeasurementEvent,
} from '../src/data/measurement-contract.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

assert.equal(MEASUREMENT_CONTRACT_VERSION, 't27.v1');
assert.equal(MEASUREMENT_TRANSPORT, 'none');
assert.deepEqual(measurementToolIds, ['finder', 'checklist', 'timeline', 'comparison', 'reminders']);
assert.deepEqual(measurementLocales, ['en', 'zh-CN']);
assert.deepEqual(measurementEventNames, ['tool_viewed', 'tool_result_rendered', 'tool_takeaway_requested']);
assert.equal(measurementEventDefinitions.length, 3, 'T27 keeps the event set minimal');
for (const definition of measurementEventDefinitions) {
  assert.ok(definition.trigger && definition.denominator && definition.boundary, `${definition.name} has an auditable definition`);
  assert.ok(definition.allowedAttributes.includes('contract_version'), `${definition.name} binds its contract version`);
  assert.ok(definition.doNotSend.length > 0, `${definition.name} has a no-send boundary`);
}

for (const tool_id of measurementToolIds) {
  for (const locale of measurementLocales) {
    const view = buildMeasurementEvent({
      event_name: 'tool_viewed',
      contract_version: MEASUREMENT_CONTRACT_VERSION,
      tool_id,
      locale,
    });
    assert.deepEqual(view, {
      event_name: 'tool_viewed',
      contract_version: MEASUREMENT_CONTRACT_VERSION,
      tool_id,
      locale,
    }, `valid view event is accepted for ${tool_id}/${locale}`);
  }
}

for (const [tool_id, statuses] of Object.entries(measurementStatusByTool)) {
  for (const result_status of statuses) {
    const result = validateMeasurementEvent({
      event_name: 'tool_result_rendered',
      contract_version: MEASUREMENT_CONTRACT_VERSION,
      tool_id,
      locale: 'en',
      result_status,
    });
    assert.equal(result.valid, true, `valid ${tool_id} result status is accepted: ${result_status}`);
  }
}

for (const [tool_id, actions] of Object.entries(measurementActionsByTool)) {
  for (const action of actions) {
    const result = validateMeasurementEvent({
      event_name: 'tool_takeaway_requested',
      contract_version: MEASUREMENT_CONTRACT_VERSION,
      tool_id,
      locale: 'zh-CN',
      action,
    });
    assert.equal(result.valid, true, `valid ${tool_id} takeaway is accepted: ${action}`);
  }
}

const rejected = [
  [{ event_name: 'unknown_event', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'finder', locale: 'en' }, 'unknown event name'],
  [{ event_name: 'tool_viewed', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'made-up-tool', locale: 'en' }, 'unknown tool ID'],
  [{ event_name: 'tool_viewed', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'finder', locale: 'de' }, 'unknown locale'],
  [{ event_name: 'tool_viewed', contract_version: 'future', tool_id: 'finder', locale: 'en' }, 'unknown contract version'],
  [{ event_name: 'tool_result_rendered', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'finder', locale: 'en', result_status: 'unknown' }, 'unknown result status'],
  [{ event_name: 'tool_result_rendered', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'timeline', locale: 'en', result_status: 'unsupported' }, 'result status is not valid for this tool'],
  [{ event_name: 'tool_takeaway_requested', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'finder', locale: 'en', action: 'ics_download' }, 'takeaway action is not valid for this tool'],
  [{ event_name: 'tool_takeaway_requested', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'reminders', locale: 'en', action: 'email_sent' }, 'unknown takeaway action'],
  [{ event_name: 'tool_viewed', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'finder', locale: 'en', full_url: 'https://visalang.org/tools/route-finder/?answer=secret' }, 'non-allowlisted'],
  [{ event_name: 'tool_result_rendered', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'finder', locale: 'en', result_status: 'guidance_available', email: 'person@example.com' }, 'non-allowlisted'],
  [{ event_name: 'tool_result_rendered', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'finder', locale: 'en', result_status: 'guidance_available', exam_date: '2026-09-16' }, 'non-allowlisted'],
  [{ event_name: 'tool_viewed', contract_version: MEASUREMENT_CONTRACT_VERSION, tool_id: 'finder' }, 'non-allowlisted'],
  [null, 'plain object'],
  ['not-an-event', 'plain object'],
];
for (const [input, reason] of rejected) {
  const result = validateMeasurementEvent(input);
  assert.equal(result.valid, false, `rejected input: ${reason}`);
  if (!result.valid) assert.equal(typeof result.reason, 'string');
  assert.equal(buildMeasurementEvent(input), null, `malformed input cannot produce an event: ${reason}`);
}

for (const forbidden of measurementForbiddenData) {
  assert.equal(typeof forbidden, 'string');
}
assert.ok(measurementForbiddenData.includes('email'));
assert.ok(measurementForbiddenData.includes('full_url'));
assert.ok(measurementForbiddenData.includes('exam_date'));
assert.ok(measurementForbiddenData.includes('raw_answer'));
assert.ok(measurementForbiddenData.includes('document_or_certificate_content'));

const toolShell = read('src/components/tools/ToolShell.astro');
assert.match(toolShell, /data-measurement-contract=\{MEASUREMENT_CONTRACT_VERSION\}/);
assert.match(toolShell, /data-measurement-transport=\{MEASUREMENT_TRANSPORT\}/);
assert.match(toolShell, /data-measurement-tool=\{current\}/);
for (const page of ['route-finder', 'checklist-generator', 'timeline-calculator', 'exam-comparison', 'email-reminders']) {
  const source = read(`src/pages/tools/${page}.astro`);
  assert.match(source, /setupSharedPlan/);
  assert.doesNotMatch(source, /fetch\s*\(|XMLHttpRequest|sendBeacon|navigator\.sendBeacon/);
}

const runtimeSources = [
  'src/layouts/BaseLayout.astro',
  'src/layouts/ToolLayout.astro',
  'src/components/tools/ToolShell.astro',
  'src/scripts/tool-form.ts',
  'src/scripts/plan-state.ts',
  'src/data/reminder-ics.ts',
  ...['route-finder', 'checklist-generator', 'timeline-calculator', 'exam-comparison', 'email-reminders'].map((name) => `src/pages/tools/${name}.astro`),
].map(read).join('\n');
assert.doesNotMatch(runtimeSources, /fetch\s*\(|XMLHttpRequest|sendBeacon|navigator\.sendBeacon/);
assert.doesNotMatch(runtimeSources, /google-analytics|gtag\s*\(|dataLayer|plausible\.io|static\.cloudflareinsights\.com/i);
assert.match(runtimeSources, /sessionStorage/);
assert.match(runtimeSources, /localStorage/);
assert.match(read('src/data/reminder-ics.ts'), /createReminderIcs/);

const privacy = read('src/pages/privacy-policy.astro');
const cookies = read('src/pages/cookie-policy.astro');
const terms = read('src/pages/terms.astro');
const affiliate = read('src/pages/affiliate-disclosure.astro');
const partners = read('src/pages/partners.astro');
const pricing = read('src/pages/pricing.astro');
for (const policy of [privacy, cookies]) {
  assert.match(policy, /t27\.v1/);
  assert.match(policy, /Google Analytics, Cloudflare Web Analytics/);
  assert.match(policy, /no collector|sends no events|no collector/i);
  assert.match(policy, /sessionStorage/);
  assert.match(policy, /localStorage/);
  assert.match(policy, /not.*URL|URL.*not/i);
}
assert.match(terms, /do not create accounts, submit tool answers, send email reminders/i);
assert.match(terms, /ICS download is a local file action/i);
assert.match(affiliate, /not an official recommendation|not a statement that a course is required/i);
assert.match(partners, /does not submit a partner application|does not create a partnership/i);
assert.match(pricing, /no waitlist, update subscription, checkout, payment collection, delivery promise/i);

console.log('T27 measurement contract and privacy consistency tests passed.');
