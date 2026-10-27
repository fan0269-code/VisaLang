import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

import { guideRedirectCandidates as guideRedirects } from '../src/data/publication-manifest.ts';
import { legacyRetirementRecords } from '../src/data/url-support-inventory.ts';

const root = path.resolve(import.meta.dirname, '..');
const mapPath = path.join(root, 'docs/VISALANG_M3_T23_MIGRATION_CANDIDATE_ROLLBACK_MAP_2026-09-11.md');
const baselineCommit = '4cb57e8744c752fed1881281e69e7b24cc7281c4';
const frozenArtifacts = {
  'public/_redirects': 'ba08ae41c47462c629c4640b14e940bcf2c22e823fe47a0486e29b4a18af37eb',
  'src/data/publication-manifest.ts': 'af30714bef76d480a163025dfb0e8713543ece88b56f4ef50210537a2d24b7dc',
};

const expectedCandidateDecisions = new Map([
  ['/guides/german-a1-family-reunion-faq/', ['conditional', 'HOLD']],
  ['/guides/goethe-a1-pre-booking-checklist/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-a1-booking-mistakes/', ['conditional', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-a1-retake-policy/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-a1-study-plan-working-adults/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-a1-official-links-practice-resources/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-a1-listening-practice/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-a1-speaking-topics/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-a1-writing-practice/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-b1-difficulty-analysis/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-b1-mock-exam-routine/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-b1-listening-deep-dive/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-b1-speaking-topics/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/guides/goethe-b1-writing-assessment/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/zh/guides/goethe-a1-germany-family-reunion/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/zh/guides/goethe-a1-booking-mistakes/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
  ['/zh/guides/german-a1-documents-checklist/', ['retain-conflict', 'REJECT_CURRENT_REDIRECT']],
]);

function sha256(filePath) {
  return createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function readMachineRecord() {
  assert.ok(fs.existsSync(mapPath), 'T23 migration candidate/rollback map must exist before the evidence contract can pass');
  const markdown = fs.readFileSync(mapPath, 'utf8');
  const block = markdown.match(/<!-- M3_T23_MACHINE_RECORD_START -->\s*```json\s*([\s\S]*?)\s*```\s*<!-- M3_T23_MACHINE_RECORD_END -->/);
  assert.ok(block, 'T23 map must contain one bounded machine-readable JSON record');
  return JSON.parse(block[1]);
}

test('T23 records every pre-existing Scheme-3 redirect without granting migration authority', () => {
  const evidence = readMachineRecord();
  assert.equal(evidence.schema, 'visalang.m3-t23-migration-candidate-map.v1');
  assert.equal(evidence.snapshotDate, '2026-09-11');
  assert.equal(evidence.baselineCommit, baselineCommit);
  assert.equal(evidence.scope, 'repository-evidence-only');
  assert.equal(evidence.newRedirectAuthorization, 'none');
  assert.deepEqual(evidence.frozenArtifacts, frozenArtifacts);
  assert.deepEqual(evidence.globalEvidenceGaps, {
    gsc: 'missing',
    backlinks: 'missing',
    productionHttp: 'not-observed',
    legalConfigurationEntryPoint: 'present',
    productionConfigurationInstallation: 'not-observed',
    productionConfigurationEffect: 'not-observed',
    ownerAuthorization: 'pending',
  });
  assert.deepEqual(evidence.repositoryConfigurationEvidence, {
    entryPoint: 'present',
    installScript: 'deploy/deploy.sh:78-80',
    vhostInclude: 'deploy/nginx-vhost-template.conf:49',
    installationDocumentation: 'deploy/README.md:46-55',
    candidateMappingsInCheckedInSnippet: 0,
    productionInstallation: 'not-observed',
    productionEffect: 'not-observed',
  }, 'repository configuration wiring is present without claiming production installation or effect');
  assert.deepEqual(evidence.releaseGate, {
    status: 'blocked',
    reason: 'new-redirect-authorization-none',
    unresolvedRedirectCandidates: 17,
    authorizedRedirectCandidates: 0,
  }, 'the evidence-only map blocks release while every legacy redirect candidate remains unauthorized');

  assert.equal(Object.keys(guideRedirects).length, 17, 'the dirty baseline has exactly 17 Scheme-3 manifest redirects');
  assert.equal(legacyRetirementRecords.length, 0, 'current source inventory has no active retirement candidate');
  assert.equal(evidence.records.length, 17, 'the map has one immutable record per redirect candidate');

  const recordsBySource = new Map(evidence.records.map((record) => [record.sourceUrl, record]));
  assert.equal(recordsBySource.size, 17, 'candidate source URLs are unique');
  assert.deepEqual([...recordsBySource.keys()].sort(), [...expectedCandidateDecisions.keys()].sort(), 'the map covers the literal 17-source candidate set');

  let retainConflictCount = 0;
  let conditionalCount = 0;
  for (const [sourceUrl, [decisionClass, disposition]] of expectedCandidateDecisions) {
    const record = recordsBySource.get(sourceUrl);

    assert.ok(record, `machine record exists for ${sourceUrl}`);

    assert.match(record.recordId, /^S3-REDIRECT-\d{3}$/, `${sourceUrl} has a stable record id`);
    assert.equal(record.currentDirtyTargetUrl, guideRedirects[sourceUrl], `${sourceUrl} records the current dirty manifest target`);
    assert.equal(record.proposedSuccessorUrl, guideRedirects[sourceUrl], `${sourceUrl} records a concrete proposed successor`);
    assert.ok(record.inventoryRecordIds.every(id => /^audited-/.test(id)), `${sourceUrl} preserves historical package row identifiers`);
    assert.equal(record.packageDecisionClass, decisionClass, `${sourceUrl} preserves the Master Package decision class`);
    assert.equal(record.disposition, disposition, `${sourceUrl} has the conservative evidence-only disposition`);
    assert.notEqual(record.disposition, 'APPROVE', `${sourceUrl} is not approved`);
    assert.match(record.independentTaskJudgment, /independent|conditional/i, `${sourceUrl} records its task-equivalence judgment`);
    assert.match(record.packageEvidenceLocator, /^docs\/master-package-2026-09-08\/VisaLang-url-remediation\.csv:\d+$/, `${sourceUrl} has an exact package evidence locator`);
    assert.equal(record.currentWorkspaceSourceState, 'absent-in-dirty-worktree', `${sourceUrl} distinguishes current source absence from authorization`);
    assert.ok(fs.existsSync(path.join(root, record.preservedSourcePath)), `${sourceUrl} now has a retained source; historical absence is not current state`);
    assert.equal(record.preservedSourceRef, `${baselineCommit}:${record.preservedSourcePath}`, `${sourceUrl} has an immutable recovery reference`);
    assert.equal(execFileSync('git', ['rev-parse', record.preservedSourceRef], { cwd: root, encoding: 'utf8' }).trim(), record.preservedSourceBlob, `${sourceUrl} recovery blob exists at the recorded ref`);
    assert.deepEqual(record.evidenceGaps, evidence.globalEvidenceGaps, `${sourceUrl} cannot bypass any global evidence gate`);
    assert.equal(record.authorizationState, 'owner-pending-no-change-authority', `${sourceUrl} distinguishes observation from new authorization`);
    assert.deepEqual(Object.keys(record.rollbackMapping).sort(), [
      'canonicalExpectation',
      'indexingAction',
      'internalLinkAction',
      'manifestKeyToRemove',
      'productionVerification',
      'publicRedirectLineToRemove',
      'restoreFromRef',
      'restoreSourcePath',
      'sitemapAction',
    ].sort(), `${sourceUrl} supplies every exact rollback field`);
    assert.equal(record.rollbackMapping.restoreSourcePath, record.preservedSourcePath);
    assert.equal(record.rollbackMapping.restoreFromRef, record.preservedSourceRef);
    assert.equal(record.rollbackMapping.publicRedirectLineToRemove, `${sourceUrl} ${record.currentDirtyTargetUrl} 301`);
    assert.equal(record.rollbackMapping.manifestKeyToRemove, sourceUrl);
    assert.equal(record.rollbackMapping.canonicalExpectation, `https://visalang.org${sourceUrl}`);
    assert.equal(record.rollbackMapping.indexingAction, 're-evaluate-after-source-and-authority-review');
    assert.equal(record.rollbackMapping.internalLinkAction, 'restore-direct-links-only-after-source-review');
    assert.equal(record.rollbackMapping.sitemapAction, 'derive-from-reviewed-publication-policy');
    assert.equal(record.rollbackMapping.productionVerification, 'authorized-production-window-required');
    if (decisionClass === 'retain-conflict') retainConflictCount += 1;
    if (decisionClass === 'conditional') conditionalCount += 1;
  }

  assert.equal(retainConflictCount, 15, 'the map exposes all 15 Master Package retain/rewrite conflicts');
  assert.equal(conditionalCount, 2, 'the map exposes the two conditional candidates separately');
  assert.equal(recordsBySource.get('/guides/german-a1-family-reunion-faq/').disposition, 'HOLD', 'FAQ conditional merge remains held for evidence');
  assert.equal(recordsBySource.get('/guides/goethe-a1-booking-mistakes/').packageConditionalTargetUrl, '/guides/goethe-a1-pre-booking-checklist/', 'booking-mistakes retains the Master Package conditional target');
  assert.equal(recordsBySource.get('/guides/goethe-a1-booking-mistakes/').disposition, 'REJECT_CURRENT_REDIRECT', 'the dirty booking-mistakes target is rejected because it differs from the conditional package target');
});
