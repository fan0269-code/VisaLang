import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parse } from 'parse5';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

// Losing a route, conflating evidence categories, or sending an unknown route to
// a B1 result must fail this contract. No residence/eligibility inputs exist.
assert.ok(fs.existsSync('src/data/b1-route-paths.ts'), 'T24 provides production route outputs');
const { b1RoutePaths, resolveB1Route } = await import('../src/data/b1-route-paths.ts');
const ids = ['settlement-general', 'settlement-skilled', 'settlement-blue-card', 'citizenship'];
assert.equal(resolveB1Route('citizenship', { asOf: '2026-12-14' }).status, 'unresolved', 'expired legal claims cannot emit a route fact');
const { claimRegistry, validateClaimSet } = await import('../src/data/claim-registry.ts');
const legalId = 'germany-b1-citizenship-language';
for (const change of [
  (claims) => claims.filter((claim) => claim.claimId !== legalId),
  (claims) => claims.map((claim) => claim.claimId === legalId ? { ...claim, status: 'withdrawn' } : claim),
  (claims) => claims.map((claim) => claim.claimId === legalId ? { ...claim, version: 'changed' } : claim),
  (claims) => claims.map((claim) => claim.claimId === legalId ? { ...claim, usedBy: [] } : claim),
  (claims) => claims.map((claim) => claim.claimId === legalId ? { ...claim, scope: { ...claim.scope, locale: 'zh-CN' } } : claim),
]) {
  const result = resolveB1Route('citizenship', { claims: change(claimRegistry), asOf: '2026-09-13' });
  assert.equal(result.status, 'unresolved');
  assert.match(result.nextAction, /authority/);
  assert.doesNotMatch(result.language, /B1/);
}
const altered = claimRegistry.map((claim) => claim.claimId === legalId ? { ...claim, claimText: 'A separately reviewed statutory statement.' } : claim);
assert.equal(resolveB1Route('citizenship', { claims: altered, asOf: '2026-09-13' }).language, 'A separately reviewed statutory statement.', 'route copy comes from the current registry record');
assert.deepEqual(b1RoutePaths.map((route) => route.id), [...ids, 'unknown']);
for (const id of ids) {
  const result = resolveB1Route(id);
  assert.equal(result.id, id);
  assert.equal(result.status, 'route-information');
  assert.ok(result.language && result.knowledge && result.otherConditions);
  assert.notEqual(result.language, result.knowledge);
  assert.ok(result.authority.includes(id === 'citizenship' ? 'nationality' : 'foreigners'));
  assert.ok(result.sources.every((source) => new URL(source.url).hostname === 'www.gesetze-im-internet.de'));
  assert.match(result.nextAction, /authority/i);
  const [path, anchor] = result.checklistHref.split('#');
  assert.ok(path.endsWith('/'));
  const checklist = fs.readFileSync(`src/content${path.slice(0, -1)}.md`, 'utf8');
  assert.ok(checklist.includes(`id="${anchor}"`), `${id} has a usable checklist destination`);
}
assert.notEqual(resolveB1Route('citizenship').checklistHref, resolveB1Route('settlement-general').checklistHref);
assert.match(resolveB1Route('settlement-general').provision, /9/);
assert.match(resolveB1Route('settlement-skilled').provision, /18c\(1\)/);
assert.match(resolveB1Route('settlement-blue-card').language, /A1[\s\S]*B1/);
assert.match(resolveB1Route('citizenship').provision, /10/);
for (const input of ['', 'work', 'not-a-route', null, undefined, '__proto__']) {
  const result = resolveB1Route(input);
  assert.equal(result.id, 'unknown');
  assert.equal(result.status, 'unresolved');
  assert.match(result.nextAction, /authority/i);
  assert.doesNotMatch(result.language, /B1 required|eligible/i);
}

const hub = fs.readFileSync('src/pages/germany-b1-settlement-citizenship.astro', 'utf8');
assert.match(hub, /<B1RoutePaths\s*\/>/, 'hub renders production branch results');
const markdown = await createMarkdownProcessor();
const tableCounts = [1, 1, 1, 2, 2];
let articleIndex = 0;
for (const slug of ['goethe-b1-germany-settlement-work', 'germany-b1-citizenship-language-proof', 'germany-b1-leben-in-deutschland-and-language-proof', 'germany-b1-settlement-citizenship-checklist', 'germany-b1-settlement-citizenship-timeline']) {
  const guide = fs.readFileSync(`src/content/guides/${slug}.md`, 'utf8');
  assert.match(guide, /^updatedDate: "2026-10-27"$/m);
  assert.match(guide, /^sourceReviewedAt: "2026-09-13"$/m);
  assert.match(guide, /## Next action/);
  const refs = [...guide.matchAll(/claimId: "([^"]+)"\s+version: "([^"]+)"/g)].map((match) => ({ claimId: match[1], version: match[2] }));
  assert.equal(validateClaimSet(refs, { consumerId: `guide:${slug}`, consumerLocale: 'en', asOf: '2026-09-13' }).valid, true, `${slug} binds versioned registry facts`);
  const rendered = await markdown.render(guide.split(/^---\s*$/m).slice(2).join('---'));
  checkTableWrappers(rendered.code, tableCounts[articleIndex++]);
}

function checkTableWrappers(html, expectedCount) {
  const nodes = (node) => [node, ...(node.childNodes || []).flatMap(nodes)];
  const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
  const inSourceFactTable = (node) => {
    for (let parent = node.parentNode; parent; parent = parent.parentNode) {
      if (attr(parent, 'class')?.split(' ').includes('source-fact-table')) return true;
    }
    return false;
  };
  // GuideLayout adds its existing verification-responsibilities table outside
  // Markdown. Exclude only that named layout surface; every article table must
  // still match the literal expected count and satisfy the wrapper assertions.
  const tables = nodes(parse(html)).filter((node) => node.tagName === 'table' && !inSourceFactTable(node));
  assert.equal(tables.length, expectedCount);
  for (const table of tables) {
    let parent = table.parentNode;
    while (parent && !attr(parent, 'class')?.split(' ').includes('responsive-table')) parent = parent.parentNode;
    assert.ok(parent, 'every new T24 table has a contained horizontal-scroll wrapper');
    assert.equal(attr(parent, 'role'), 'region');
    assert.equal(attr(parent, 'tabindex'), '0');
    assert.ok(attr(parent, 'aria-label'));
  }
}

// Controller runs this after its build; --built prevents silently accepting
// missing artifacts while agents themselves avoid rebuilding shared outputs.
if (process.argv.includes('--built')) {
  let index = 0;
  for (const slug of ['goethe-b1-germany-settlement-work', 'germany-b1-citizenship-language-proof', 'germany-b1-leben-in-deutschland-and-language-proof', 'germany-b1-settlement-citizenship-checklist', 'germany-b1-settlement-citizenship-timeline']) {
    checkTableWrappers(fs.readFileSync(`dist/guides/${slug}/index.html`, 'utf8'), tableCounts[index++]);
  }
  const tree = parse(fs.readFileSync('dist/germany-b1-settlement-citizenship/index.html', 'utf8'));
  const nodes = (node) => [node, ...(node.childNodes || []).flatMap(nodes)];
  const all = nodes(tree);
  const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;
  const rendered = all.filter((node) => attr(node, 'data-b1-route'));
  assert.deepEqual(rendered.map((node) => attr(node, 'data-b1-route')), [...ids, 'unknown']);
  for (const result of b1RoutePaths) {
    const card = rendered.find((node) => attr(node, 'data-b1-route') === result.id);
    const text = nodes(card).filter((node) => node.nodeName === '#text').map((node) => node.value).join(' ');
    for (const value of [result.language, result.knowledge, result.otherConditions, result.nextAction]) assert.ok(text.includes(value));
    assert.ok(nodes(card).some((node) => attr(node, 'href') === result.checklistHref));
    const [destination, anchor] = result.checklistHref.split('#');
    const checklistTree = parse(fs.readFileSync(`dist${destination}index.html`, 'utf8'));
    assert.ok(nodes(checklistTree).some((node) => attr(node, 'id') === anchor), `${result.id} reaches a rendered checklist`);
  }
}
console.log('T24 independent B1 route outputs, evidence categories, checklists and unknown fallback passed');
