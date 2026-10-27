import assert from 'node:assert/strict';
import fs from 'node:fs';
import { buildArticleSections } from '../src/data/article-sections.ts';
import { parse } from 'parse5';

// Removing the practice records or either complete revision example must break
// this reader-task contract even when the rest of the long guide still renders.
const source = fs.readFileSync('src/content/guides/goethe-b1-study-plan.md', 'utf8');
const body = source.replace(/^---\s*[\s\S]*?\n---\s*/, '');
const sections = await buildArticleSections(body);
const code = sections.detailed;
const document = parse(code);
const descendants = (node) => [node, ...(node.childNodes || []).flatMap(descendants)];
const nodes = descendants(document);
const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join(' ');
const attr = (node, name) => node.attrs?.find((entry) => entry.name === name)?.value;
const tables = nodes.filter((node) => node.tagName === 'table');
assert.ok(tables.some((table) => /Retest task\/date/.test(text(table)) && /One repair action/.test(text(table))), 'the study guide renders a fillable diagnosis/repair/retest worksheet');
assert.ok(tables.some((table) => /Recovery slot/.test(text(table)) && /Evidence to keep/.test(text(table))), 'the guide renders a weekly plan with completion evidence and recovery space');
assert.equal(nodes.filter((node) => attr(node, 'class') === 'responsive-table' && attr(node, 'tabindex') === '0').length, 2, 'both worksheets expose keyboard-focusable horizontal scroll regions');
const examples = nodes.filter((node) => node.tagName === 'div' && attr(node, 'lang') === 'de');
assert.equal(examples.length, 4, 'writing and speaking each render an initial and revised German example with a language annotation');
assert.ok(examples.every((node) => text(node).trim().length > 50), 'each example contains actual original language material');
assert.notEqual(text(examples[0]), text(examples[1]), 'writing revision is a different usable response');
assert.notEqual(text(examples[2]), text(examples[3]), 'speaking revision is a different usable exchange');
assert.equal((body.match(/\*\*Transfer exercise:\*\*/g) || []).length, 2, 'both skills have an actionable transfer task');
assert.equal((body.match(/\*\*Self-check:\*\*/g) || []).length, 2, 'both skills have self-review instructions');
assert.match(body, /not an official exam task/);
assert.match(body, /cannot assess pronunciation, fluency or listening/);
assert.doesNotMatch(body, /guaranteed (?:pass|score)|officially (?:scored|graded)|teacher-reviewed/i);
console.log('M4 T26 original study worksheet and revision-example contracts passed');
