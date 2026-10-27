import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (file) => fs.readFileSync(file, 'utf8');
const toolPages = [
  ['finder', 'route-finder'],
  ['checklist', 'checklist-generator'],
  ['timeline', 'timeline-calculator'],
  ['comparison', 'exam-comparison'],
  ['reminders', 'email-reminders'],
];
const formController = read('src/scripts/tool-form.ts');
const planAdapter = read('src/scripts/plan-state.ts');
const planModel = read('src/data/plan-state.ts');
const toolCopy = read('src/data/tool-copy.ts');
const shell = read('src/components/tools/ToolShell.astro');
const privacy = read('src/pages/privacy-policy.astro');
const cookies = read('src/pages/cookie-policy.astro');
const css = read('src/styles/global.css');
const copyButton = read('src/components/CopyButton.astro');
const routeProgress = read('src/components/RouteProgress.astro');
const guideFilters = read('src/pages/guides/index.astro');
const searchInput = read('src/components/SearchInput.astro');
const guideLayout = read('src/layouts/GuideLayout.astro');
const { removeLegacyToolCopies, setupSharedPlan } = await import('../src/scripts/plan-state.ts');

const legacyStorageKeys = [
  'visalang-tool:/tools/route-finder/',
  'visalang-tool:/tools/route-finder/index.html',
  'visalang-route:germany-family-reunion-a1',
  'unrelated-key',
];
const storageMock = {
  keys: [...legacyStorageKeys],
  get length() { return this.keys.length; },
  key(index) { return this.keys[index] ?? null; },
  removeItem(key) { this.keys = this.keys.filter((candidate) => candidate !== key); },
};
assert.equal(removeLegacyToolCopies(storageMock), true, 'legacy same-origin storage cleanup succeeds through the Storage interface');
assert.deepEqual(storageMock.keys, ['visalang-route:germany-family-reunion-a1', 'unrelated-key'], 'legacy cleanup removes every old tool-path variant and preserves route progress plus unrelated storage');
assert.equal(removeLegacyToolCopies({ get length() { throw new Error('blocked'); } }), false, 'blocked storage cleanup fails safely without making the tool unusable');

const originalLocalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
const originalSessionStorage = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage');
const originalDocument = Object.getOwnPropertyDescriptor(globalThis, 'document');
const originalLocation = Object.getOwnPropertyDescriptor(globalThis, 'location');
try {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new DOMException('blocked', 'SecurityError'); } });
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: { getItem: () => null, setItem: () => {}, removeItem: () => {} } });
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: { documentElement: { lang: 'en' }, querySelector: () => null, querySelectorAll: () => [] },
  });
  Object.defineProperty(globalThis, 'location', { configurable: true, value: { search: '', pathname: '/tools/route-finder/', hash: '' } });
  assert.doesNotThrow(
    () => setupSharedPlan({ toolId: 'finder', form: null }),
    'a throwing global localStorage getter cannot abort shared-plan setup before a tool registers and activates its form',
  );
} finally {
  for (const [key, descriptor] of [
    ['localStorage', originalLocalStorage],
    ['sessionStorage', originalSessionStorage],
    ['document', originalDocument],
    ['location', originalLocation],
  ]) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
}

for (const [toolId, file] of toolPages) {
  const source = read(`src/pages/tools/${file}.astro`);
  assert.match(source, /setupSharedPlan\(/, `${file} initialises the shared plan controller`);
  assert.ok(source.includes(`toolId: '${toolId}'`), `${file} identifies its stable shared-plan tool ID`);
  assert.match(source, /plan\.persist\(/, `${file} writes only an explicit schema-approved tool patch after a successful run`);
  assert.doesNotMatch(source, /persistedNames|controller\.persist\(|requestSubmit\(\)/, `${file} no longer uses URL persistence or automatic result submission`);
  assert.match(source, /<form[^>]*\binert\b/, `${file} fails closed instead of submitting inputs as a GET request before JavaScript initialises`);
  assert.doesNotMatch(source, /<form[^>]*aria-busy="true"/, `${file} does not announce perpetual loading when JavaScript is unavailable`);
  assert.match(source, /controller\?\.activate\(\)/, `${file} activates only after its local submit handler is registered`);
  assert.ok(source.indexOf('controller?.activate()') > source.indexOf("addEventListener('submit'"), `${file} cannot activate before registering its submit interception`);
}

assert.doesNotMatch(formController, /URLSearchParams|location\.search|history\.replaceState|sessionStorage|localStorage/, 'tool-form handles validation and steps but no persistence transport');
assert.match(formController, /onRestart/, 'tool-form delegates current-tool restart to the shared-plan adapter');
assert.match(formController, /removeAttribute\('inert'\)[\s\S]{0,100}removeAttribute\('aria-busy'\)/, 'tool-form activates a fail-closed form only after its controller is ready');
assert.match(planAdapter, /sessionStorage/, 'shared plans write to session storage by default');
assert.match(planAdapter, /localStorage/, 'optional device saves use local storage');
assert.match(planAdapter, /data-plan-save-device/, 'local storage is reached from the explicit Save control');
assert.match(planAdapter, /history\.replaceState\([^\n]+pathname[^\n]+hash/, 'legacy query cleanup preserves the path and hash while removing query values');
assert.doesNotMatch(planAdapter, /params\.set|searchParams\.set|\?\$\{/, 'the adapter never writes new plan values into a URL');
assert.match(planAdapter, /legacy\.hadLegacyFields\s*&&\s*legacy\.hasCompatibleValues/, 'only a compatible legacy patch can replace saved-plan reconfirmation state');
assert.match(planAdapter, /No compatible legacy values were restored/, 'discard-only legacy queries receive an explicit non-restoration status');
assert.match(planAdapter, /LEGACY_TOOL_LOCAL_STORAGE_PREFIX/, 'the adapter recognises the dedicated local-storage namespace used by older tool versions');
assert.match(planAdapter, /target\.key\([^)]+\)[\s\S]{0,220}startsWith\(LEGACY_TOOL_LOCAL_STORAGE_PREFIX\)/, 'legacy cleanup snapshots all matching same-origin keys, including non-canonical historic paths');
assert.match(planAdapter, /try\s*\{[\s\S]*sessionStorage[\s\S]*\}\s*catch/, 'session storage failures are guarded');
assert.match(planAdapter, /try\s*\{[\s\S]*localStorage[\s\S]*\}\s*catch/, 'device storage failures are guarded');

for (const [attribute, copyField, englishLabel] of [
  ['data-plan-save-device', 'save', 'Save on this device for 30 days'],
  ['data-plan-clear', 'clear', 'Clear shared plan'],
  ['data-tool-restart', 'restart', 'Restart this tool'],
]) {
  assert.ok(shell.includes(attribute) && shell.includes(`{copy.${copyField}}`), `ToolShell exposes the localized ${copyField} control`);
  assert.ok(toolCopy.includes(englishLabel), `English presentation retains ${englishLabel}`);
}
assert.match(shell, /data-plan-status[^>]*aria-live="polite"/, 'ToolShell announces restore, save and clear status accessibly');
assert.match(shell, /dataset\.toolState = 'initializing'/, 'ToolShell exposes an explicit initialization state');
assert.match(shell, /dataset\.toolState = 'failed'[\s\S]*runtimeError[\s\S]*retry\.hidden = false/, 'ToolShell converts failed initialization into a visible retry state');
assert.match(shell, /form\.setAttribute\('aria-busy', 'true'\)/, 'busy state is applied only when the runtime watchdog is actually executing');
assert.match(shell, /data-plan-save-device disabled/, 'device save cannot be activated before its handler is registered');
assert.match(shell, /data-plan-clear disabled/, 'shared-plan clear cannot be activated before its handler is registered');
assert.match(shell, /data-tool-restart disabled/, 'restart cannot be activated before its handler is registered');
assert.match(shell, /aria-current=\{tool\.id === current \? 'page' : undefined\}/, 'current tool is exposed to assistive technology');
assert.match(formController, /dispatchEvent\(new CustomEvent\('visalang:tool-ready'/, 'successful form activation resolves the runtime watchdog');
assert.match(planAdapter, /\[data-plan-save-device\], \[data-plan-clear\][\s\S]*button\.disabled = false/, 'shared-plan controls activate only after their controller initializes');
assert.match(shell, /\{copy\.sharedPrivacyLead\}[\s\S]{0,80}\{copy\.sharedPrivacy\}/, 'ToolShell renders the localized session-only explanation');
assert.ok(toolCopy.includes('Session-only by default:') && toolCopy.includes('They are not added to the page URL.'), 'English presentation explains the session-only default');
assert.match(shell, /\{copy\.restartLead\}[\s\S]{0,80}\{copy\.restartBoundary\}/, 'ToolShell renders the localized restart boundary');
assert.ok(toolCopy.includes('Restart boundary:') && toolCopy.includes('Shared route remains'), 'English presentation explains current-tool ownership and the retained shared-route boundary');
assert.match(shell, /<noscript>[\s\S]*\{copy\.noScriptLead\}[\s\S]{0,80}\{copy\.noScript\}/, 'ToolShell renders the localized no-JavaScript boundary');
assert.ok(toolCopy.includes('entries are not submitted to the page URL'), 'English presentation explains that no-JavaScript forms stay disabled instead of falling back to URL submission');
assert.ok(css.includes('.tool-plan-controls') && css.includes('.tool-plan-status'), 'shared plan controls have dedicated responsive styles');
assert.match(copyButton, /class="copy-feedback" role="status"/, 'copy outcomes are visible as well as announced');
assert.match(copyButton, /clone\.querySelectorAll\('\.article-toc, button, nav/, 'copied guide text excludes navigation and button labels');
assert.match(copyButton, /fallbackText\.value = text[\s\S]*fallback\.hidden = false/, 'clipboard failure exposes a complete manual-copy fallback');
assert.match(routeProgress, /data-route-next=\{index\} disabled/, 'route progress cannot be activated before JavaScript initializes');
assert.match(routeProgress, /const persisted = save\(next\)[\s\S]*storageStatus\.hidden = persisted/, 'blocked route persistence produces visible feedback');
assert.match(searchInput, /data-guide-search disabled/, 'guide search is not a fake control without JavaScript');
assert.match(guideFilters, /search\.disabled = false[\s\S]*filter\.disabled = false[\s\S]*sort\.disabled = false/, 'guide controls activate only after filtering is initialized');
assert.match(guideLayout, /class="source-fact-table" role="region"[^>]*tabindex="0"/, 'source tables are keyboard-scrollable named regions');

const finder = read('src/pages/tools/route-finder.astro');
assert.match(finder, /select name="applicationRegionId"/, 'Route Finder uses a bounded application-region select');
assert.doesNotMatch(finder, /input name="location"/, 'Route Finder no longer accepts an application-location free-text field');
const timeline = read('src/pages/tools/timeline-calculator.astro');
assert.match(timeline, /select name="examId"/, 'Timeline uses stable exam IDs');
assert.match(timeline, /examComparisonOptions\.map\(\(exam\) => <option value=\{exam\.id\}/, 'Timeline renders the configured stable product IDs');
const reminder = read('src/pages/tools/email-reminders.astro');
assert.match(reminder, /select name="route"/, 'Reminder uses a bounded route selector');
assert.match(reminder, /reminderTopicOptions\.map\(\(topic\) => <option value=\{topic\.id\}/, 'Reminder topics use stable IDs');
assert.ok(planModel.includes("id: 'confirm-language-requirement'"), 'the reminder topic registry contains the stable language-requirement ID');
assert.match(reminder, /plan\.persist\(\{\s*topicId:[\s\S]{0,160}routeId:/, 'Reminder shared-state patch contains only topic and route IDs');
const reminderPersistBody = reminder.match(/plan\.persist\(\{([\s\S]*?)\}\);/)?.[1] || '';
assert.doesNotMatch(reminderPersistBody, /date|source/, 'Reminder date and source URL stay page-local');

for (const source of [privacy, cookies]) {
  assert.match(source, /sessionStorage|session storage/i, 'policy text discloses session-by-default plan state');
  assert.match(source, /30 days/i, 'policy text discloses the optional 30-day device save');
  assert.match(source, /Clear shared plan/i, 'policy text identifies the shared-plan clear control');
  assert.match(source, /address bar|URL query/i, 'policy text explains legacy URL cleanup');
  assert.match(source, /server[^.]{0,100}logs|logs[^.]{0,100}server/i, 'policy text does not imply URL cleanup erases historical server logs');
  assert.match(source, /legacy per-tool local storage/i, 'policy text discloses cleanup of local-storage copies created by older tool versions');
}
assert.match(planModel, /applicationRegionId/, 'the pure schema keeps region separate from locale and route');
assert.doesNotMatch(planModel, /window\.|document\.|sessionStorage|localStorage|history\./, 'the plan-state model remains pure and browser-independent');

console.log('M2-A shared plan-state integration contracts passed');
