import assert from 'node:assert/strict';
import { resolveRuntimeFeatures } from '../src/data/runtime-features.ts';

const purposeModes = ['off', 'laya', 'typesafe'];
const adModes = ['off', 'on'];

for (const purposeSuggestions of purposeModes) {
  for (const advertising of adModes) {
    assert.deepEqual(
      resolveRuntimeFeatures({ VISALANG_PURPOSE_MODE: purposeSuggestions, VISALANG_ADS_MODE: advertising }),
      { schemaVersion: 1, purposeSuggestions, advertising },
      `resolves ${purposeSuggestions}/${advertising}`,
    );
  }
}

assert.deepEqual(resolveRuntimeFeatures({}), {
  schemaVersion: 1,
  purposeSuggestions: 'off',
  advertising: 'off',
}, 'default build is core-only');

for (const invalid of [
  { VISALANG_PURPOSE_MODE: 'true', VISALANG_ADS_MODE: 'off' },
  { VISALANG_PURPOSE_MODE: 'off', VISALANG_ADS_MODE: 'false' },
]) {
  assert.throws(() => resolveRuntimeFeatures(invalid), /Unsupported runtime feature mode/);
}

console.log('Runtime feature mode contract passed.');
