import assert from 'node:assert/strict';
import { guideRedirects } from '../src/data/publication-manifest.ts';
import { zhGermanyA1Guides } from '../src/data/zh-germany-a1.ts';
import {
  auditedUrlSupportRecords,
  currentSourceRouteCoverage,
  duplicateCanonicalPaths,
  legacyRetirementRecords,
  packageUrlSupportRecords,
  sourceDiscoveredUrlSupportRecords,
  unverifiedUrlSupportRecords,
  urlSupportInventory,
} from '../src/data/url-support-inventory.ts';

assert.equal(auditedUrlSupportRecords.length, 64, 'all 64 remediation rows remain distinct inventory records');
assert.equal(unverifiedUrlSupportRecords.length, 14, 'all 14 discovery-only rows remain distinct inventory records');
assert.equal(packageUrlSupportRecords.length, 78, 'the package ledger retains audited and unverified rows without silent deduplication');
assert.ok(sourceDiscoveredUrlSupportRecords.length > 0, 'current public sources absent from the package are added as source-discovered records');
assert.equal(urlSupportInventory.length, packageUrlSupportRecords.length + sourceDiscoveredUrlSupportRecords.length, 'the authoritative inventory includes package and source-discovered records without collapsing either');

for (const record of packageUrlSupportRecords) {
  assert.match(record.recordId, /^(audited|unverified)-\d+$/, `${record.url} has a stable source-row identity`);
  assert.match(record.url, /^\//, `${record.recordId} stores a canonical path rather than an assumed public response`);
  assert.ok(record.sourcePath || record.sourceGap, `${record.recordId} maps to a real source path or an explicit gap`);
  assert.equal(record.migrationState, 'not-assessed', `${record.recordId} does not turn inventory into a migration decision`);
  assert.equal(record.httpEvidence, 'unknown', `${record.recordId} does not infer HTTP state from the package`);
  assert.equal(record.gscEvidence, 'unknown', `${record.recordId} does not infer traffic from missing GSC evidence`);
  assert.equal(record.backlinkEvidence, 'unknown', `${record.recordId} does not infer backlink state`);
}

for (const record of sourceDiscoveredUrlSupportRecords) {
  assert.match(record.recordId, /^source-discovered-\d+$/, `${record.url} has a stable source-discovered identity`);
  assert.ok(record.sourcePath, `${record.recordId} identifies the current source that generated the route`);
  assert.equal(record.auditState, 'source-discovered', `${record.recordId} is not misrepresented as a package-audited URL`);
}

const sourceDiscoveredKeys = sourceDiscoveredUrlSupportRecords.map((record) => `${record.url}|${record.sourcePath}`);
assert.deepEqual(sourceDiscoveredKeys, [...sourceDiscoveredKeys].sort(), 'source-discovered records use a normalized URL/source-path sort before IDs are assigned');
assert.equal(new Set(sourceDiscoveredUrlSupportRecords.map((record) => record.recordId)).size, sourceDiscoveredUrlSupportRecords.length, 'source-discovered IDs remain unique');
for (const [index, record] of sourceDiscoveredUrlSupportRecords.entries()) {
  assert.equal(record.recordId, `source-discovered-${index + 1}`, 'source-discovered IDs are stable ordinals of the sorted mapping');
}

for (const guide of zhGermanyA1Guides.filter((guide) => guide.publicationDisposition === 'pillar')) {
  const records = urlSupportInventory.filter((record) => record.url === guide.href);
  assert.ok(records.length > 0, `${guide.href} is present in the inventory`);
  for (const record of records) assert.notEqual(record.legacyRetirementConflict, 'discovery-noindex', `${guide.href} uses authoritative Chinese guide data and remains indexed`);
}
assert.equal(legacyRetirementRecords.length, 0, 'retained Chinese pages are not retirement conflicts');
assert.ok(urlSupportInventory.some((record) => record.url === '/guides/category/germany-a1/' && record.legacyRetirementConflict === 'discovery-noindex'), 'a true manifest-driven noindex category remains a discovery conflict');

for (const record of unverifiedUrlSupportRecords) {
  assert.equal(record.auditState, 'unverified', `${record.recordId} remains discovery-only`);
  assert.equal(record.disposition, 'review-required', `${record.recordId} remains pending source review`);
}

assert.ok(auditedUrlSupportRecords.some((record) => record.legacyRetirementConflict !== 'none'), 'pre-existing Scheme 3 retirement conflicts are recorded without executing them');
assert.equal(legacyRetirementRecords.length, Object.keys(guideRedirects).length, 'every current manifest redirect/deletion decision is recorded even when the package did not audit that source URL');
for (const record of legacyRetirementRecords) {
  assert.ok(record.inventoryRecordIds.length > 0 || record.sourceGap, `${record.sourceUrl} retains an explicit package-row link or source gap`);
}
for (const duplicate of duplicateCanonicalPaths) {
  assert.ok(duplicate.recordIds.length > 1, `${duplicate.url} preserves each source row instead of collapsing a duplicate canonical path`);
}
assert.ok(currentSourceRouteCoverage.length > 0, 'current Astro sources are covered or explicitly excluded');
for (const coverage of currentSourceRouteCoverage) {
  assert.ok(coverage.inventoryRecordIds.length > 0 || coverage.scopeExclusion, `${coverage.sourcePath} has record coverage or a documented scope exclusion`);
}
assert.ok(currentSourceRouteCoverage.every((coverage) => coverage.inventoryRecordIds.length > 0 || /dynamic template|generated 404/i.test(coverage.scopeExclusion ?? '')), 'scope exclusions are reserved for dynamic template mechanics or the generated 404');

console.log('URL/support inventory contract passed');
