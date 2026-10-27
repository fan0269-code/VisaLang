import assert from 'node:assert/strict';
import { buildArticleSections } from '../src/data/article-sections.ts';

const sections = await buildArticleSections(`
## Who this applies to

This page is for one bounded route.

## Key decisions

1. Confirm the receiving authority.
2. Record the exact proof it asks for.

## Detailed explanation

The route-specific explanation belongs here.

## Common mistakes

- Booking before confirming the proof.

## Next action

Save the authority response and its date.

## Official sources

- [Official authority](https://example.gov/authority)
`);

assert.match(sections.who, /one bounded route/, 'Who content is page-specific');
assert.match(sections.keyDecisions, /receiving authority/, 'Key decisions are extracted as their own required section');
assert.doesNotMatch(sections.detailed, /receiving authority/, 'Key decisions do not leak into detailed explanation');
assert.match(sections.commonMistakes, /Booking before/, 'Common mistakes are extracted');
assert.match(sections.nextAction, /Save the authority response/, 'Next action is extracted');
assert.match(sections.officialSources, /Official authority/, 'Official sources are extracted');

console.log('article section key-decision contract passed');
