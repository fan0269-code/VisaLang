import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parsePurposeSuggestion } from '../src/scripts/purpose-suggestion.ts';

for (const purpose of ['family-reunion', 'b1', 'ausbildung', 'nursing', 'university', 'other']) {
  assert.equal(parsePurposeSuggestion({ status: 'suggestion', purpose, requiresConfirmation: true }), purpose);
}
assert.equal(parsePurposeSuggestion({ status: 'needs_clarification', purpose: null, requiresConfirmation: true }), null);
for (const invalid of [null, {}, { status: 'suggestion', purpose: 'university', requiresConfirmation: false },
  { status: 'suggestion', purpose: '<script>', requiresConfirmation: true },
  { status: 'needs_clarification', purpose: 'university', requiresConfirmation: true }]) {
  assert.throws(() => parsePurposeSuggestion(invalid));
}
const component = fs.readFileSync('src/components/tools/PurposeSuggestion.astro', 'utf8');
assert.ok(!/name=/.test(component), 'free text stays outside FormData/shared-plan fields');
const client = fs.readFileSync('src/scripts/purpose-suggestion.ts', 'utf8');
assert.ok(!/localStorage|sessionStorage|console\./.test(client), 'no raw input persistence or logging');
assert.match(client, /credentials: 'omit'/);
console.log('Laya purpose contract tests passed');
