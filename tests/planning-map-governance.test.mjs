import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const relative = (...parts) => path.join(...parts);
const absolute = (relativePath) => path.join(root, relativePath);
const normalizePath = (value) => value.replaceAll('\\', '/');
const sorted = (values) => [...values].sort((left, right) => left.localeCompare(right, 'en'));
const read = (relativePath) => fs.readFileSync(absolute(relativePath));
const readText = (relativePath) => read(relativePath).toString('utf8');
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');

const diagramPath = relative('docs', 'planning-map', 'visalang-overall-build-plan.archify.json');
const artifactPath = relative('docs', 'planning-map', 'visalang-overall-build-plan.html');
const syncPath = relative('docs', 'planning-map', 'sync.json');
const historyPath = relative('docs', 'planning-map', 'history.json');
const visualReviewPath = relative('docs', 'planning-map', 'visual-review.json');

const requiredPlanningFiles = [
  relative('docs', 'planning-map', 'README.md'),
  diagramPath,
  artifactPath,
  syncPath,
  historyPath,
  visualReviewPath,
];

const requiredWatchRoots = [
  'AGENTS.md',
  'README.md',
  'docs/CONTENT_MAP.md',
  'docs/VISALANG_INDEPENDENT_AUDITOR_AGENT.md',
  'docs/VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md',
  'docs/master-package-2026-09-08',
  'docs/prompts',
  'docs/superpowers/plans',
  'public',
  'src',
];

const requiredAuthorityPaths = [
  'docs/master-package-2026-09-08/VisaLang-Master-Plan.md',
  'docs/master-package-2026-09-08/VisaLang-Codex-Backlog.csv',
  'docs/master-package-2026-09-08/BACKLOG_STATUS_OVERLAY_2026-09-09.md',
  'docs/master-package-2026-09-08/EXECUTION_RECORD.md',
];

const allowedPathClassifications = new Set([
  'content',
  'content-facing-implementation',
  'content-planning',
  'content-planning-policy',
  'generated-artifact',
  'generated-evidence',
  'governance-evidence',
  'governance-output',
  'governance-source',
  'governance-test',
]);

for (const requiredPath of requiredPlanningFiles) {
  assert.equal(
    fs.existsSync(absolute(requiredPath)),
    true,
    `planning-map governance requires ${requiredPath}`,
  );
}

const diagramBytes = read(diagramPath);
const artifactBytes = read(artifactPath);
const syncBytes = read(syncPath);
const historyBytes = read(historyPath);
const diagram = JSON.parse(diagramBytes.toString('utf8'));
const sync = JSON.parse(syncBytes.toString('utf8'));
const history = JSON.parse(historyBytes.toString('utf8'));

assert.equal(diagram.schema_version, 2, 'the maintained planning map uses workflow schema v2');
assert.equal(diagram.diagram_type, 'workflow', 'the maintained planning map is a workflow');
assert.equal(diagram.meta?.locale, 'zh-CN', 'the planning map and viewer use the project language');
assert.equal(diagram.meta?.quality_profile, 'showcase', 'the maintained artifact requires showcase validation');
assert.match(diagram.meta?.title || '', /VisaLang.*建设规划/, 'the artifact identifies the whole-site build plan');

const listFiles = (relativePath) => {
  const target = absolute(relativePath);
  assert.equal(fs.existsSync(target), true, `watched path must exist: ${relativePath}`);
  const stat = fs.statSync(target);
  if (stat.isFile()) return [normalizePath(relativePath)];
  assert.equal(stat.isDirectory(), true, `watched path must be a file or directory: ${relativePath}`);
  return fs.readdirSync(target, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name, 'en'))
    .flatMap((entry) => {
      if (entry.name === '.DS_Store') return [];
      return listFiles(path.join(relativePath, entry.name));
    });
};

const digestPaths = (paths) => {
  const safePaths = paths.map((digestPath) => normalizeRepoRelativePath(digestPath, 'digest path'));
  const files = sorted(new Set(safePaths.flatMap(listFiles)));
  assert.ok(files.length > 0, 'a governance digest cannot be calculated from an empty file set');
  const digest = crypto.createHash('sha256');
  for (const file of files) {
    digest.update(file);
    digest.update('\0');
    digest.update(read(file));
    digest.update('\0');
  }
  return { digest: digest.digest('hex'), files };
};

const normalizeRepoRelativePath = (value, label) => {
  assert.equal(typeof value, 'string', `${label} must be a string`);
  assert.notEqual(value, '', `${label} cannot be empty`);
  const normalized = normalizePath(value);
  assert.equal(path.posix.isAbsolute(normalized), false, `${label} must be repository-relative: ${value}`);
  assert.equal(path.win32.isAbsolute(value), false, `${label} must be repository-relative: ${value}`);
  assert.equal(path.win32.isAbsolute(normalized), false, `${label} must be repository-relative: ${value}`);
  assert.equal(/^[A-Za-z]:/.test(normalized), false, `${label} must not use a drive-relative form: ${value}`);
  assert.equal(
    normalized.split('/').some((segment) => segment === '' || segment === '.' || segment === '..'),
    false,
    `${label} cannot contain empty, dot, or parent path segments: ${value}`,
  );
  assert.equal(path.posix.normalize(normalized), normalized, `${label} must use a canonical repository-relative form: ${value}`);
  return normalized;
};

const assertExactWatchRoots = (watchRoots) => {
  assert.ok(Array.isArray(watchRoots), 'watch roots must be an array');
  const normalized = watchRoots.map((watchRoot) => normalizeRepoRelativePath(watchRoot, 'watch root'));
  assert.equal(new Set(normalized).size, normalized.length, 'watch roots cannot contain duplicates');
  assert.deepEqual(sorted(normalized), sorted(requiredWatchRoots), 'the non-optional hard-watch roots cannot be removed or substituted');
};

assert.throws(
  () => assertExactWatchRoots(requiredWatchRoots.slice(1)),
  /non-optional hard-watch roots/,
  'removing a required watch root fails closed',
);
assert.throws(
  () => assertExactWatchRoots([...requiredWatchRoots.slice(0, -1), 'src/pages']),
  /non-optional hard-watch roots/,
  'substituting a narrower watch root fails closed',
);
assertExactWatchRoots(sync.scope?.watchRoots);

for (const watchedPath of sync.scope.watchRoots) {
  assert.equal(normalizePath(watchedPath).startsWith('docs/planning-map'), false, 'planning-map outputs are excluded to avoid a digest cycle');
}

const normalizeCandidatePath = (candidatePath) => {
  return normalizeRepoRelativePath(candidatePath, 'candidate path');
};

for (const unsafePath of [
  '../outside.json',
  '..\\outside.json',
  '/tmp/outside.json',
  'C:/outside.json',
  'C:\\outside.json',
  'C:outside.json',
  '\\\\server\\share\\outside.json',
  '.',
  './',
  '.\\',
  'file/',
  'dir//file',
  'dir/./file',
]) {
  assert.throws(
    () => normalizeCandidatePath(unsafePath),
    /repository-relative|drive-relative|empty, dot, or parent path segments/,
    `non-canonical, alternate-separator, or absolute path fails closed: ${unsafePath}`,
  );
}

const validateCandidateManifest = (changedPaths, pathClassifications, independentlyReviewedPaths) => {
  assert.ok(Array.isArray(changedPaths) && changedPaths.length > 0, 'the frozen candidate path manifest is required');
  const normalizedChangedPaths = changedPaths.map(normalizeCandidatePath);
  assert.equal(new Set(normalizedChangedPaths).size, normalizedChangedPaths.length, 'changedPaths cannot contain duplicates');
  assert.deepEqual(normalizedChangedPaths, sorted(normalizedChangedPaths), 'changedPaths stays deterministically sorted');
  assert.ok(pathClassifications && typeof pathClassifications === 'object' && !Array.isArray(pathClassifications), 'every candidate path requires a classification map');
  assert.deepEqual(sorted(Object.keys(pathClassifications).map(normalizeCandidatePath)), normalizedChangedPaths, 'every changed path, including content-facing Astro paths, has exactly one classification');
  for (const [candidatePath, classification] of Object.entries(pathClassifications)) {
    assert.ok(allowedPathClassifications.has(classification), `unsupported candidate classification for ${candidatePath}: ${classification}`);
  }
  if (independentlyReviewedPaths) {
    assert.deepEqual(normalizedChangedPaths, sorted(independentlyReviewedPaths.map(normalizeCandidatePath)), 'changedPaths exactly matches the independently frozen audit scope');
  }
  return normalizedChangedPaths;
};

assert.throws(
  () => validateCandidateManifest([], {}, ['src/pages/example.astro']),
  /frozen candidate path manifest/,
  'omitting a content-facing page from changedPaths fails closed',
);
assert.throws(
  () => validateCandidateManifest(['src/components/Example.astro'], {}, ['src/components/Example.astro']),
  /exactly one classification/,
  'omitting the classification for a content-facing component fails closed',
);
const changedPaths = validateCandidateManifest(sync.scope?.changedPaths, sync.scope?.pathClassifications);

const isCoveredByWatchRoot = (candidatePath, watchRoots) => watchRoots.some((watchRoot) => {
  const normalizedRoot = normalizeRepoRelativePath(watchRoot, 'watch root');
  return candidatePath === normalizedRoot || candidatePath.startsWith(`${normalizedRoot}/`);
});

const validateCandidateByteBindings = (
  bindings,
  candidatePaths,
  watchRoots,
  readCandidate = read,
) => {
  assert.ok(
    bindings && typeof bindings === 'object' && !Array.isArray(bindings),
    'byte bindings for candidates outside the watched roots are required',
  );
  const expectedPaths = sorted(candidatePaths.filter((candidatePath) => (
    candidatePath !== syncPath && !isCoveredByWatchRoot(candidatePath, watchRoots)
  )));
  const boundPaths = sorted(Object.keys(bindings).map(normalizeCandidatePath));
  assert.deepEqual(
    boundPaths,
    expectedPaths,
    'every candidate outside the watched roots is bound exactly once, except the self-bound sync receipt',
  );
  for (const candidatePath of expectedPaths) {
    assert.match(bindings[candidatePath] || '', /^[0-9a-f]{64}$/, `candidate byte binding is a SHA-256: ${candidatePath}`);
    assert.equal(
      bindings[candidatePath],
      sha256(readCandidate(candidatePath)),
      `candidate byte binding is current: ${candidatePath}`,
    );
  }
  return expectedPaths;
};

const excludedCandidatePaths = validateCandidateByteBindings(
  sync.scope?.candidateByteBindings,
  changedPaths,
  sync.scope.watchRoots,
);
assert.ok(excludedCandidatePaths.includes('docs/TASK_LOG.md'), 'the excluded task log is byte-bound');
assert.ok(excludedCandidatePaths.includes('tests/site.test.js'), 'the excluded full-suite entry is byte-bound');
const mutationTarget = 'docs/TASK_LOG.md';
assert.throws(
  () => validateCandidateByteBindings(
    sync.scope.candidateByteBindings,
    changedPaths,
    sync.scope.watchRoots,
    (candidatePath) => candidatePath === mutationTarget
      ? Buffer.concat([read(candidatePath), Buffer.from('\nsynthetic post-review mutation', 'utf8')])
      : read(candidatePath),
  ),
  /candidate byte binding is current: docs\/TASK_LOG\.md/,
  'a post-review mutation to an excluded evidence path fails closed',
);

assert.equal(sync.schemaVersion, 1, 'the sync receipt uses the current governance schema');
assert.match(sync.syncId || '', /^VL-PMAP-(\d{8})-(\d{2})$/, 'the sync window has a stable dated identifier');
assert.match(sync.checkedAt || '', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/, 'the sync receipt records an offset-aware check time');
const syncIdDate = sync.syncId.match(/^VL-PMAP-(\d{8})-/)?.[1];
assert.equal(syncIdDate, sync.checkedAt.slice(0, 10).replaceAll('-', ''), 'the sync ID date matches checkedAt');
assert.deepEqual(sync.scope?.triggerClasses, ['content', 'content-planning'], 'both required update classes trigger diagram sync');

const validateHistory = (records) => {
  assert.ok(Array.isArray(records) && records.length > 0, 'the append-only sync history is required');
  const ids = new Set();
  records.forEach((record, index) => {
    assert.equal(record.sequence, index + 1, 'history sequence is append-only and contiguous');
    assert.equal(ids.has(record.syncId), false, `sync ID cannot be reused: ${record.syncId}`);
    ids.add(record.syncId);
    const expectedPrevious = index === 0
      ? null
      : sha256(Buffer.from(JSON.stringify(records[index - 1]), 'utf8'));
    assert.equal(record.previousRecordSha256, expectedPrevious, 'each history record binds its predecessor');
    assert.match(record.syncId || '', /^VL-PMAP-(\d{8})-(\d{2})$/, 'history sync IDs use the governed shape');
    assert.equal(record.syncId.slice(8, 16), record.checkedAt.slice(0, 10).replaceAll('-', ''), 'history ID date matches its checkedAt date');
  });
};

const duplicateSyncFixture = history.records?.length
  ? [...history.records]
  : [{ sequence: 1, syncId: sync.syncId, checkedAt: sync.checkedAt, previousRecordSha256: null }];
const fixturePredecessor = duplicateSyncFixture.at(-1);
duplicateSyncFixture.push({
  ...fixturePredecessor,
  sequence: duplicateSyncFixture.length + 1,
  syncId: duplicateSyncFixture[0].syncId,
  checkedAt: duplicateSyncFixture[0].checkedAt,
  previousRecordSha256: sha256(Buffer.from(JSON.stringify(fixturePredecessor), 'utf8')),
});
assert.throws(
  () => validateHistory(duplicateSyncFixture),
  /sync ID cannot be reused/,
  'reusing a prior sync ID fails closed',
);
assert.equal(history.schemaVersion, 1, 'sync history uses the current schema');
validateHistory(history.records);
assert.equal(sync.history?.path, historyPath, 'the receipt names the append-only history');
assert.equal(sync.history?.sha256, sha256(historyBytes), 'the receipt binds the append-only history bytes');
const currentHistory = history.records.at(-1);
assert.equal(currentHistory.syncId, sync.syncId, 'the latest history record is the current sync');
assert.equal(currentHistory.checkedAt, sync.checkedAt, 'history and receipt use the same check time');
assert.equal(currentHistory.watchedScopeDigest, sync.scope.watchedScopeDigest, 'history binds the watched digest');
assert.equal(currentHistory.driftStatus, sync.drift.status, 'history binds the drift result');

const watchedScope = digestPaths(sync.scope.watchRoots);
assert.equal(sync.scope.watchedScopeDigest, watchedScope.digest, 'content or planning changes require a fresh watched-scope digest');
assert.equal(sync.scope.watchedFileCount, watchedScope.files.length, 'the receipt records the exact watched file count');

const safeAuthorityPaths = sync.authority.paths.map((authorityPath) => normalizeRepoRelativePath(authorityPath, 'authority path'));
assert.deepEqual(
  sorted(safeAuthorityPaths),
  sorted(requiredAuthorityPaths),
  'the planning authority paths cannot be removed or substituted',
);
const authorityScope = digestPaths(safeAuthorityPaths);
assert.equal(sync.authority.authorityDigest, authorityScope.digest, 'the current planning authority digest is current');
assert.equal(sync.authority.status, 'derived-view-only', 'the diagram cannot replace the Master Package or status overlay');

const compactDigestText = (value) => value.replace(/[\s\u200B\u2060]/gu, '');
const cardItems = (diagram.cards || []).flatMap((card) => card.items || []);
assert.ok(cardItems.some((item) => item.includes(sync.syncId)), 'the visible diagram contains the current sync ID');
assert.ok(compactDigestText(cardItems.join('\n')).includes(sync.scope.watchedScopeDigest), 'the visible diagram contains the complete, wrappable watched-scope digest');
assert.ok(artifactBytes.includes(Buffer.from(sync.syncId)), 'the delivered HTML contains the current sync ID');
assert.ok(compactDigestText(artifactBytes.toString('utf8')).includes(sync.scope.watchedScopeDigest), 'the delivered HTML contains the complete, wrappable watched-scope digest');

assert.equal(sync.diagramChange.sourcePath, diagramPath, 'the receipt binds the canonical Archify source');
assert.equal(sync.diagramChange.artifactPath, artifactPath, 'the receipt binds the canonical delivered HTML');
assert.equal(sync.diagramChange.sourceSha256, sha256(diagramBytes), 'the receipt binds the exact diagram source bytes');
assert.equal(sync.diagramChange.artifactSha256, sha256(artifactBytes), 'the receipt binds the exact delivered artifact bytes');
assert.equal(currentHistory.diagramSourceSha256, sync.diagramChange.sourceSha256, 'history binds the diagram source');
assert.equal(currentHistory.diagramArtifactSha256, sync.diagramChange.artifactSha256, 'history binds the diagram artifact');
assert.equal(sync.diagramChange.validation.quality, 'showcase', 'the recorded validation used showcase quality');
assert.equal(sync.diagramChange.validation.checks, 9, 'all nine Archify artifact checks ran');
assert.equal(sync.diagramChange.validation.errors, 0, 'Archify validation has no errors');
assert.equal(sync.diagramChange.validation.warnings, 0, 'Archify validation has no warnings');

const browserEvidencePath = normalizeCandidatePath(sync.diagramChange.browserEvidencePath);
assert.equal(fs.existsSync(absolute(browserEvidencePath)), true, 'the artifact-bound browser receipt exists');
const browserEvidenceBytes = read(browserEvidencePath);
const browserEvidence = JSON.parse(browserEvidenceBytes.toString('utf8'));
assert.equal(sync.diagramChange.browserEvidenceSha256, sha256(browserEvidenceBytes), 'the sync receipt binds the browser evidence bytes');
assert.equal(sync.diagramChange.browserEvidence, 'passed', 'the exact delivered artifact has passing automated browser evidence');
assert.equal(browserEvidence.schemaVersion, 1, 'browser evidence uses the current schema');
assert.equal(browserEvidence.ok, true, 'browser evidence completed successfully');
assert.equal(browserEvidence.command, 'visual-check', 'browser evidence came from Archify visual-check');
assert.equal(browserEvidence.evidenceKind, 'automated-browser', 'browser evidence is not confused with perceptual review');
assert.equal(browserEvidence.status, 'pass', 'browser evidence passed');
assert.deepEqual(browserEvidence.diagnostics, [], 'browser evidence has no diagnostics');

const hasCanonicalArtifactIdentity = (provenancePath, canonicalPath) => {
  const normalizedProvenance = normalizePath(provenancePath);
  const normalizedCanonical = normalizePath(canonicalPath);
  return normalizedProvenance === normalizedCanonical
    || normalizedProvenance.endsWith(`/${normalizedCanonical}`);
};
const validateBrowserArtifact = (receiptArtifact, canonicalPath, expectedBytes) => {
  assert.equal(hasCanonicalArtifactIdentity(receiptArtifact.path, canonicalPath), true, 'browser evidence names the repository-relative canonical artifact');
  assert.equal(receiptArtifact.sha256, sha256(expectedBytes), 'browser evidence binds the delivered artifact hash');
  assert.equal(receiptArtifact.bytes, expectedBytes.length, 'browser evidence binds the delivered artifact byte count');
};

assert.doesNotThrow(
  () => validateBrowserArtifact(
    { ...browserEvidence.artifact, path: `/different-checkout/${normalizePath(artifactPath)}` },
    artifactPath,
    artifactBytes,
  ),
  'unchanged evidence remains verifiable after moving the repository',
);
assert.throws(
  () => validateBrowserArtifact({ ...browserEvidence.artifact, path: '/different-checkout/docs/planning-map/other.html' }, artifactPath, artifactBytes),
  /repository-relative canonical artifact/,
  'a wrong artifact identity fails closed',
);
assert.throws(
  () => validateBrowserArtifact({ ...browserEvidence.artifact, sha256: '0'.repeat(64) }, artifactPath, artifactBytes),
  /delivered artifact hash/,
  'a wrong artifact hash still fails closed',
);
validateBrowserArtifact(browserEvidence.artifact, artifactPath, artifactBytes);

const expectedContainment = ['1440x900:light', '1600x1000:light', '1920x1080:light', '2048x1320:light'];
const containment = browserEvidence.containment?.viewports || [];
assert.deepEqual(sorted(containment.map((entry) => `${entry.width}x${entry.height}:${entry.theme}`)), expectedContainment, 'browser evidence covers every required containment viewport');
for (const viewport of containment) {
  assert.equal(viewport.ok, true, `browser viewport passed: ${viewport.width}x${viewport.height}:${viewport.theme}`);
  assert.equal(viewport.overflowX, false, 'browser evidence has no page-level horizontal overflow');
  assert.equal(viewport.overflowY, false, 'browser evidence has no page-level vertical overflow');
  assert.equal(viewport.readabilityOk, true, 'browser evidence passes projected diagram readability');
  assert.equal(viewport.viewerChromeStageOk, true, 'viewer chrome does not obstruct the diagram');
}

const expectedCaptures = ['1440x900:dark', '1440x900:light', '2048x1320:dark', '2048x1320:light'];
const captures = browserEvidence.captures?.screenshots || [];
assert.deepEqual(sorted(captures.map((entry) => `${entry.width}x${entry.height}:${entry.theme}`)), expectedCaptures, 'saved screenshots cover both themes at the required review sizes');

const pngDimensions = (bytes) => {
  assert.equal(bytes.subarray(1, 4).toString('ascii'), 'PNG', 'visual evidence is a PNG');
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
};
const capturedScreenshots = captures.map((capture) => {
  assert.equal(capture.ok, true, `saved capture passed: ${capture.file}`);
  const captureFile = normalizeRepoRelativePath(capture.file, 'browser screenshot filename');
  assert.equal(path.posix.dirname(captureFile), '.', `browser screenshot must be a sidecar basename: ${capture.file}`);
  assert.equal(path.posix.extname(captureFile), '.png', `browser screenshot must be a PNG sidecar: ${capture.file}`);
  const screenshotPath = normalizeCandidatePath(path.posix.join(path.posix.dirname(browserEvidencePath), captureFile));
  assert.equal(fs.existsSync(absolute(screenshotPath)), true, `saved screenshot exists: ${screenshotPath}`);
  assert.equal(fs.statSync(absolute(screenshotPath)).isFile(), true, `saved screenshot is a file: ${screenshotPath}`);
  const bytes = read(screenshotPath);
  assert.deepEqual(pngDimensions(bytes), { width: capture.width, height: capture.height }, `saved screenshot dimensions match: ${screenshotPath}`);
  return {
    path: screenshotPath,
    sha256: sha256(bytes),
    width: capture.width,
    height: capture.height,
    theme: capture.theme,
  };
});
const contactSheetFile = normalizeRepoRelativePath(browserEvidence.captures?.contactSheet, 'browser contact-sheet filename');
assert.equal(path.posix.dirname(contactSheetFile), '.', 'browser contact sheet must be a sidecar basename');
assert.equal(path.posix.extname(contactSheetFile), '.html', 'browser contact sheet must be an HTML sidecar');
const contactSheetPath = normalizeCandidatePath(path.posix.join(path.posix.dirname(browserEvidencePath), contactSheetFile));
assert.equal(fs.existsSync(absolute(contactSheetPath)), true, 'the browser contact sheet exists');
assert.equal(fs.statSync(absolute(contactSheetPath)).isFile(), true, 'the browser contact sheet is a file');

assert.equal(sync.diagramChange.visualReview, 'passed', 'the rendered artifact received image-capable perceptual review');
assert.equal(sync.diagramChange.visualReviewPath, visualReviewPath, 'the sync receipt names the perceptual review record');
const visualReviewBytes = read(visualReviewPath);
const visualReview = JSON.parse(visualReviewBytes.toString('utf8'));
assert.equal(sync.diagramChange.visualReviewSha256, sha256(visualReviewBytes), 'the sync receipt binds the perceptual review bytes');
assert.equal(visualReview.schemaVersion, 1, 'perceptual review uses the current schema');
assert.equal(visualReview.status, 'passed', 'perceptual review passed');
assert.equal(visualReview.reviewerCapability, 'image-capable-agent', 'perceptual review records the reviewer capability');
assert.match(visualReview.reviewedAt || '', /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/, 'perceptual review records an offset-aware time');
assert.deepEqual(visualReview.findings, [], 'perceptual review has no unresolved findings');
assert.equal(visualReview.artifact.path, artifactPath, 'perceptual review names the delivered artifact');
assert.equal(visualReview.artifact.sha256, sync.diagramChange.artifactSha256, 'perceptual review binds the delivered artifact hash');
assert.equal(visualReview.browserEvidence.path, browserEvidencePath, 'perceptual review names the browser receipt');
assert.equal(visualReview.browserEvidence.sha256, sync.diagramChange.browserEvidenceSha256, 'perceptual review binds the browser receipt bytes');
assert.deepEqual(
  visualReview.screenshots,
  sorted(capturedScreenshots.map((entry) => JSON.stringify(entry))).map((entry) => JSON.parse(entry)),
  'perceptual review binds every named screenshot byte-for-byte',
);

const nodeIds = new Set(diagram.nodes.map((node) => node.id));
const edgeIds = new Set(diagram.edges.map((edge) => edge.id).filter(Boolean));
for (const nodeId of sync.planState.affectedNodeIds) {
  assert.equal(nodeIds.has(nodeId), true, `affected node exists in the diagram: ${nodeId}`);
}
for (const edgeId of sync.planState.affectedEdgeIds) {
  assert.equal(edgeIds.has(edgeId), true, `affected edge exists in the diagram: ${edgeId}`);
}

assert.ok(['aligned', 'approved-deviation', 'unresolved'].includes(sync.drift.status), 'every update records one explicit drift result');
assert.ok(sync.drift.basis && sync.drift.planRefs.length > 0, 'drift judgment records its basis and plan references');
if (sync.drift.status === 'approved-deviation') {
  assert.ok(sync.drift.ownerDecisionRef, 'an approved deviation requires a locatable owner decision');
}
if (sync.drift.status === 'unresolved') {
  assert.equal(sync.drift.releaseImpact, 'blocked', 'unresolved drift blocks completion and release');
}

assert.equal(sync.releaseStatus, 'not_deployed', 'planning-map sync cannot imply a deployment');
assert.ok(['review', 'blocked'].includes(sync.vaultStatus), 'Vault state remains fail-closed');

const auditPath = normalizeCandidatePath(sync.audit.recordPath);
assert.equal(fs.existsSync(absolute(auditPath)), true, 'the planning-map change has a recorded independent audit');
const audit = readText(auditPath);
const requiredAuditKeys = [
  'agent',
  'reviewer_independent',
  'review_round',
  'baseline',
  'scope',
  'agent_review_status',
  'overall_verdict',
  'findings',
  'owner_authorization',
  'deployment_status',
  'vault_status',
  'candidate_scope_digest',
  'diagram_source_sha256',
  'diagram_artifact_sha256',
  'sync_receipt_sha256',
  'planning_drift_status',
];

const parseAuditScalar = (rawValue, label) => {
  const value = rawValue.trim();
  assert.notEqual(value, '', `${label} cannot be an empty scalar`);
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === '[]') return [];
  if (/^\d+$/.test(value)) return Number(value);
  if (value.startsWith('"')) {
    assert.equal(value.endsWith('"'), true, `${label} has an unterminated quoted scalar`);
    const parsed = JSON.parse(value);
    assert.equal(typeof parsed, 'string', `${label} quoted scalar must be a string`);
    return parsed;
  }
  if (value.startsWith("'")) {
    assert.equal(value.endsWith("'"), true, `${label} has an unterminated quoted scalar`);
    return value.slice(1, -1).replaceAll("''", "'");
  }
  return value;
};

const parseStrictAuditFrontmatter = (markdown) => {
  assert.equal(typeof markdown, 'string', 'the independent audit must be Markdown text');
  const lines = markdown.split('\n');
  const delimiters = lines
    .map((line, index) => line === '---' ? index : -1)
    .filter((index) => index >= 0);
  assert.equal(delimiters[0], 0, 'the independent audit must start with YAML front matter');
  assert.equal(delimiters.length, 2, 'the independent audit must contain exactly one YAML front matter block');
  assert.ok(delimiters[1] > 1, 'the independent audit front matter cannot be empty');

  const frontmatterLines = lines.slice(1, delimiters[1]);
  const metadata = Object.create(null);
  for (let index = 0; index < frontmatterLines.length;) {
    const line = frontmatterLines[index];
    assert.notEqual(line, '', 'blank lines are not allowed in the strict audit front matter');
    const keyMatch = line.match(/^([a-z_][a-z0-9_]*):(.*)$/);
    assert.ok(keyMatch, `invalid top-level audit front-matter line: ${line}`);
    const [, key, rawValue] = keyMatch;
    assert.ok(requiredAuditKeys.includes(key), `unsupported audit front-matter key: ${key}`);
    assert.equal(Object.hasOwn(metadata, key), false, `duplicate audit front-matter key: ${key}`);

    const indentedLines = [];
    let nextIndex = index + 1;
    while (nextIndex < frontmatterLines.length && /^\s/.test(frontmatterLines[nextIndex])) {
      indentedLines.push(frontmatterLines[nextIndex]);
      nextIndex += 1;
    }

    if (rawValue.trim() !== '') {
      assert.equal(indentedLines.length, 0, `scalar audit key cannot also have a block: ${key}`);
      metadata[key] = parseAuditScalar(rawValue, key);
    } else if (key === 'scope') {
      assert.ok(indentedLines.length > 0, 'the independent audit scope cannot be empty');
      metadata[key] = indentedLines.map((scopeLine) => {
        const itemMatch = scopeLine.match(/^  - (.+)$/);
        assert.ok(itemMatch, `invalid audit scope item: ${scopeLine}`);
        const item = parseAuditScalar(itemMatch[1], 'audit scope item');
        assert.equal(typeof item, 'string', 'every audit scope item must be a string');
        return item;
      });
    } else if (key === 'findings') {
      assert.ok(indentedLines.some((findingLine) => findingLine.trim() !== ''), 'a findings block cannot be empty');
      metadata[key] = [indentedLines.join('\n')];
    } else {
      assert.fail(`audit key requires a scalar value: ${key}`);
    }
    index = nextIndex;
  }

  assert.deepEqual(sorted(Object.keys(metadata)), sorted(requiredAuditKeys), 'the independent audit must contain every required front-matter key exactly once');
  return metadata;
};

const validateAuditRecord = (markdown) => {
  const metadata = parseStrictAuditFrontmatter(markdown);
  assert.equal(metadata.agent, 'visalang-independent-auditor', 'the recorded reviewer is the required VisaLang Independent Auditor');
  assert.equal(metadata.reviewer_independent, true, 'the audit explicitly records reviewer independence');
  assert.ok(Number.isInteger(metadata.review_round) && metadata.review_round > 0, 'the audit records a positive review round');
  assert.equal(typeof metadata.baseline, 'string', 'the audit baseline must be a branch-and-commit string');
  assert.match(
    metadata.baseline,
    /^\S+ @ [0-9a-f]{40}(?:; .+)?$/,
    'the audit baseline must identify a branch and 40-character commit SHA',
  );
  assert.equal(metadata.agent_review_status, 'pass', 'the independent Auditor recorded a passing agent-review status');
  assert.equal(metadata.overall_verdict, 'PASS', 'the independent Auditor recorded PASS');
  assert.deepEqual(metadata.findings, [], 'a passing planning-map audit has no P0/P1/P2 findings');
  assert.equal(metadata.owner_authorization, 'pending', 'the audit cannot grant Owner authorization');
  assert.equal(metadata.deployment_status, 'not_started', 'the audit cannot imply deployment');
  assert.equal(metadata.vault_status, sync.vaultStatus, 'the audit records the same fail-closed Vault state');
  assert.equal(metadata.candidate_scope_digest, sync.scope.watchedScopeDigest, 'the audit is bound to the watched content/planning scope');
  assert.equal(metadata.diagram_source_sha256, sync.diagramChange.sourceSha256, 'the audit is bound to the diagram source');
  assert.equal(metadata.diagram_artifact_sha256, sync.diagramChange.artifactSha256, 'the audit is bound to the delivered diagram');
  assert.equal(metadata.sync_receipt_sha256, sha256(syncBytes), 'the audit binds the complete sync receipt against post-review mutation');
  assert.equal(metadata.planning_drift_status, sync.drift.status, 'the audit independently records the same drift judgment');
  validateCandidateManifest(changedPaths, sync.scope.pathClassifications, metadata.scope);
  return metadata;
};

const renderAuditFixture = ({
  agentReviewStatus = 'pass',
  overallVerdict = 'PASS',
  findings = '[]',
  baseline = `"codex/synthetic-audit @ ${'a'.repeat(40)}"`,
  body = '',
} = {}) => [
  '---',
  'agent: visalang-independent-auditor',
  'reviewer_independent: true',
  'review_round: 99',
  `baseline: ${baseline}`,
  'scope:',
  ...changedPaths.map((candidatePath) => `  - ${candidatePath}`),
  `agent_review_status: ${agentReviewStatus}`,
  `overall_verdict: ${overallVerdict}`,
  findings === '[]' ? 'findings: []' : `findings:\n${findings}`,
  'owner_authorization: pending',
  'deployment_status: not_started',
  `vault_status: ${sync.vaultStatus}`,
  `candidate_scope_digest: ${sync.scope.watchedScopeDigest}`,
  `diagram_source_sha256: ${sync.diagramChange.sourceSha256}`,
  `diagram_artifact_sha256: ${sync.diagramChange.artifactSha256}`,
  `sync_receipt_sha256: ${sha256(syncBytes)}`,
  `planning_drift_status: ${sync.drift.status}`,
  '---',
  body,
].join('\n');

const spoofedPassBody = [
  'agent_review_status: pass',
  'overall_verdict: PASS',
  'findings: []',
  `candidate_scope_digest: ${sync.scope.watchedScopeDigest}`,
  `diagram_source_sha256: ${sync.diagramChange.sourceSha256}`,
  `diagram_artifact_sha256: ${sync.diagramChange.artifactSha256}`,
  `sync_receipt_sha256: ${sha256(syncBytes)}`,
  `planning_drift_status: ${sync.drift.status}`,
].join('\n');
assert.throws(
  () => validateAuditRecord(renderAuditFixture({
    agentReviewStatus: 'fail',
    overallVerdict: 'FAIL',
    findings: '  - id: synthetic-finding',
    body: spoofedPassBody,
  })),
  /passing agent-review status/,
  'FAIL front matter cannot be overridden by PASS-like prose in the report body',
);
assert.doesNotThrow(
  () => validateAuditRecord(renderAuditFixture({ body: 'Earlier round: agent_review_status: fail and overall_verdict: FAIL.' })),
  'a real PASS front matter remains valid when prose accurately mentions an earlier failure',
);
for (const invalidBaseline of ['""', '[]', 'true', '123']) {
  assert.throws(
    () => validateAuditRecord(renderAuditFixture({ baseline: invalidBaseline })),
    /audit baseline must be a branch-and-commit string|branch and 40-character commit SHA/,
    `a missing or non-locatable audit baseline fails closed: ${invalidBaseline}`,
  );
}
const validAuditFixture = renderAuditFixture();
assert.throws(
  () => parseStrictAuditFrontmatter(validAuditFixture.replace('overall_verdict: PASS', 'overall_verdict: FAIL\noverall_verdict: PASS')),
  /duplicate audit front-matter key: overall_verdict/,
  'duplicate verdict keys fail closed',
);
assert.throws(
  () => parseStrictAuditFrontmatter(validAuditFixture.replace(
    `sync_receipt_sha256: ${sha256(syncBytes)}`,
    `sync_receipt_sha256: ${'0'.repeat(64)}\nsync_receipt_sha256: ${sha256(syncBytes)}`,
  )),
  /duplicate audit front-matter key: sync_receipt_sha256/,
  'duplicate hash keys fail closed',
);

validateAuditRecord(audit);

const taskLog = readText('docs/TASK_LOG.md');
assert.ok(taskLog.includes(sync.syncId), 'the completed maintenance window records the planning-map sync ID');
assert.ok(taskLog.includes(`drift: ${sync.drift.status}`), 'the task log records the same drift judgment');
assert.ok(taskLog.includes(auditPath), 'the task log links the independent planning-map audit');

console.log(`Planning-map governance contract passed (${watchedScope.files.length} watched files, ${sync.syncId}).`);
