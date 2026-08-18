const assert = require('node:assert/strict');
const fs = require('node:fs');
const postcss = require('postcss');

const css = fs.readFileSync('src/styles/global.css', 'utf8');
const root = postcss.parse(css);
const countSelector = (selector) => css.split(selector).length - 1;

const declarationsFor = (selector, { media = null } = {}) => {
  const declarations = new Map();
  const visit = (nodes, activeMedia = null) => {
    for (const node of nodes) {
      if (node.type === 'atrule' && node.name === 'media') {
        visit(node.nodes || [], node.params);
      } else if (node.type === 'rule' && activeMedia === media) {
        const selectors = node.selectors || [];
        if (selectors.includes(selector)) {
          for (const declaration of node.nodes || []) {
            if (declaration.type === 'decl') declarations.set(declaration.prop, declaration.value);
          }
        }
      }
    }
  };
  visit(root.nodes);
  return declarations;
};

const sourceIndex = (needle) => {
  const index = css.indexOf(needle);
  assert.notEqual(index, -1, `${needle} should exist`);
  return index;
};

for (const selector of [
  '.tool-page {',
  '.tool-nav {',
  '.tool-workspace {',
  '.tool-form-heading {',
  '.tool-result-support {',
  '.tool-support-grid {',
  '.tool-checklist {',
]) {
  assert.equal(countSelector(selector), 1, `${selector} should have one active base rule`);
}

assert.match(css, /\.tool-nav a \{[\s\S]*?min-height: 44px;/, 'tool navigation targets remain at least 44px high');
assert.doesNotMatch(css, /\.decision-authority[^}]*border-left/, 'authority information uses a neutral border');
assert.doesNotMatch(css, /\.guide-summary[^}]*border-left/, 'ordinary guide summaries do not use a risk-style left accent');
assert.doesNotMatch(css, /\.official-sources[^}]*border-left/, 'official-source collections use neutral framing');
assert.doesNotMatch(css, /\.tool-storage-note[^}]*border-left/, 'ordinary storage information uses neutral framing');
assert.doesNotMatch(css, /\.tool-notice[^}]*border-left/, 'ordinary tool notices use neutral framing');

const searchInput = declarationsFor('.search-input input');
for (const [property, value] of [
  ['width', '100%'],
  ['min-height', '44px'],
  ['padding', '10px 14px'],
  ['border', '1px solid var(--od-line)'],
  ['border-radius', 'var(--radius-sm)'],
  ['background', 'var(--od-surface)'],
  ['color', 'var(--od-ink)'],
]) {
  assert.equal(searchInput.get(property), value, `.search-input input ${property} must be effective`);
}

assert.equal(declarationsFor('.guide-summary-box').get('border-color'), 'var(--od-line)', 'ordinary summaries keep a neutral border');
assert.equal(declarationsFor('.verification-alert').get('border-left-color'), 'var(--warning)', 'warning verification keeps the warning accent');
assert.equal(declarationsFor('.verification-alert--risk').get('border-left-color'), 'var(--risk)', 'risk verification keeps the risk accent');
assert.equal(declarationsFor('.guide-disclaimer').get('border-left-color'), 'var(--risk)', 'disclaimers keep the risk accent');
for (const selector of ['.verification-pending', '.compliance-line']) {
  assert.match(css, new RegExp(`\\${selector}[^}]*border-left`), `${selector} keeps a semantic risk or verification accent`);
}

const printBody = declarationsFor('body', { media: 'print' });
assert.equal(printBody.get('background'), '#fff', 'print body background is effective in the print cascade');
assert.equal(printBody.get('color'), '#111', 'print body foreground is effective in the print cascade');
assert.ok(sourceIndex('@media print') > sourceIndex('.home-view .verification-alert--success'), 'print overrides are after consolidated screen rules');
assert.match(css, /\.global-header, \.global-footer,[\s\S]*?display: none !important;/, 'print hides header and footer');
assert.match(css, /\.site-main, \.page-shell, \.guide-page, \.guide-article[\s\S]*?width: 100%;[\s\S]*?border: 0;[\s\S]*?box-shadow: none;/, 'print keeps article full-width and removes framing');

assert.match(css, /prefers-color-scheme: dark/, 'dark-mode tokens remain present');
assert.match(css, /prefers-reduced-motion: reduce/, 'reduced-motion protection remains present');
assert.match(css, /@media print/, 'print styles remain present');

console.log('FAN-75 CSS cascade assertions passed.');
