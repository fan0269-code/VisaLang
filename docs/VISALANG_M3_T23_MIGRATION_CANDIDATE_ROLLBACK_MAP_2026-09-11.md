# VisaLang M3 T23 migration candidate and rollback map

> Evidence date: 2026-09-11 (Asia/Shanghai)  
> Scope: repository evidence only  
> Decision authority: none; Owner authorization remains pending  
> Implementation effect: none; this record does not change a URL, redirect, source page, canonical, sitemap, deployment, or production system

## Outcome

The current dirty checkout contains 17 Scheme-3 guide mappings in both
`public/_redirects` and `src/data/publication-manifest.ts`, while all 17 source
files are absent from the working tree. That state is a pre-existing local
disposition, not a newly authorized migration.

The 2026-09-08 Master Package conflicts with 15 of the mappings because it says
to retain, differentiate, localize, or rewrite the source task. Those mappings
are therefore `REJECT_CURRENT_REDIRECT` candidates. The package describes two
English cases as conditional:

- `german-a1-family-reunion-faq` is `HOLD`. The package provides no approved
  target and requires GSC, backlink, and unique-task evidence before merging.
- `goethe-a1-booking-mistakes` is `REJECT_CURRENT_REDIRECT`. Its package-level
  conditional target is the pre-booking checklist, not the test-centres page
  named by the dirty manifest. Even the package candidate remains blocked until
  the stated evidence and Owner decision exist.

These labels are evidence recommendations only. `HOLD` does not approve the
dirty redirect, and `REJECT_CURRENT_REDIRECT` does not authorize restoring a
page or removing a redirect.

## Evidence boundary

- The package inventory is
  `docs/master-package-2026-09-08/VisaLang-url-remediation.csv`. Its extraction
  notes expressly say that retrieved body text does not prove HTTP status and
  that GSC/backlink checks must precede indexing or URL changes.
- `src/data/url-support-inventory.ts` records every candidate as
  `migrationState: not-assessed` with HTTP, GSC, and backlink evidence unknown.
- The repository contains no GSC export or backlink evidence for these 17
  paths. None is inferred.
- The local preview cannot execute hosting redirects, and no production URL was
  checked in this window. Production HTTP behavior is `not-observed`.
- `deploy/deploy.sh` installs
  `/etc/nginx/snippets/visalang-legacy-redirects.conf` from
  `deploy/legacy-redirects.conf`. The checked-in Nginx snippet (SHA-256
  `e5657750951b86e97f401256da9f4e86bdeed68316edc4d28ba312ab3795884f`)
  contains none of the 17 Scheme-3 mappings. The repository configuration
  entry point is nevertheless present: `deploy/deploy.sh:78-80` installs the
  snippet, `deploy/nginx-vhost-template.conf:49` includes it, and
  `deploy/README.md:46-55` documents installation. Production installation and
  production effect were not inspected and remain `not-observed`; repository
  wiring does not prove that any candidate redirect is live.
- No locatable Owner decision authorizes these redirects, their reversal, a
  canonical/indexing change, a source restoration, a deployment, or a
  production smoke test.
- The recoverable blobs below are historical source evidence at the current
  baseline commit. Restoring a blob would not make its facts current or its page
  indexable; a fresh authority/source review remains mandatory.

## Rollback interpretation

Every record supplies the exact absent source path and immutable Git object,
the exact local `_redirects` line and manifest key that would need review, and
the direct-route canonical expectation. An authorized rollback would still
need to identify the legally active server configuration, re-review the
restored content and authority claims, derive indexing and sitemap state from
the reviewed publication policy, restore direct internal links only after that
review, run the full generated-output gate, and obtain a separate deployment
authorization. This document executes none of those steps.

## Machine-readable frozen record

The JSON block is the test-consumed record. Stable record IDs bind all 17
candidates to the package inventory rows and recoverable Git blobs. The final
planning-map freeze supplies the whole-file byte binding.

<!-- M3_T23_MACHINE_RECORD_START -->
```json
{
  "schema": "visalang.m3-t23-migration-candidate-map.v1",
  "snapshotDate": "2026-09-11",
  "baselineCommit": "4cb57e8744c752fed1881281e69e7b24cc7281c4",
  "scope": "repository-evidence-only",
  "newRedirectAuthorization": "none",
  "frozenArtifacts": {
    "public/_redirects": "ba08ae41c47462c629c4640b14e940bcf2c22e823fe47a0486e29b4a18af37eb",
    "src/data/publication-manifest.ts": "af30714bef76d480a163025dfb0e8713543ece88b56f4ef50210537a2d24b7dc"
  },
  "globalEvidenceGaps": {
    "gsc": "missing",
    "backlinks": "missing",
    "productionHttp": "not-observed",
    "legalConfigurationEntryPoint": "present",
    "productionConfigurationInstallation": "not-observed",
    "productionConfigurationEffect": "not-observed",
    "ownerAuthorization": "pending"
  },
  "repositoryConfigurationEvidence": {
    "entryPoint": "present",
    "installScript": "deploy/deploy.sh:78-80",
    "vhostInclude": "deploy/nginx-vhost-template.conf:49",
    "installationDocumentation": "deploy/README.md:46-55",
    "candidateMappingsInCheckedInSnippet": 0,
    "productionInstallation": "not-observed",
    "productionEffect": "not-observed"
  },
  "releaseGate": {
    "status": "blocked",
    "reason": "new-redirect-authorization-none",
    "unresolvedRedirectCandidates": 17,
    "authorizedRedirectCandidates": 0
  },
  "records": [
    {
      "recordId": "S3-REDIRECT-001",
      "inventoryRecordIds": ["audited-11"],
      "sourceUrl": "/guides/german-a1-family-reunion-faq/",
      "currentDirtyTargetUrl": "/guides/german-family-reunion-language-requirement/",
      "proposedSuccessorUrl": "/guides/german-family-reunion-language-requirement/",
      "packageDecisionClass": "conditional",
      "packageDecision": "conditional merge only after unique-task, GSC, and backlink review; no package target is supplied",
      "independentTaskJudgment": "conditional overlap with the general requirement task; equivalence is not established",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:12",
      "preservedSourcePath": "src/content/guides/german-a1-family-reunion-faq.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/german-a1-family-reunion-faq.md",
      "preservedSourceBlob": "837d970fcb277d86af2d245d894513350810cca0",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "HOLD",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/german-a1-family-reunion-faq.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/german-a1-family-reunion-faq.md",
        "publicRedirectLineToRemove": "/guides/german-a1-family-reunion-faq/ /guides/german-family-reunion-language-requirement/ 301",
        "manifestKeyToRemove": "/guides/german-a1-family-reunion-faq/",
        "canonicalExpectation": "https://visalang.org/guides/german-a1-family-reunion-faq/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-002",
      "inventoryRecordIds": ["audited-17"],
      "sourceUrl": "/guides/goethe-a1-pre-booking-checklist/",
      "currentDirtyTargetUrl": "/guides/goethe-a1-test-centers/",
      "proposedSuccessorUrl": "/guides/goethe-a1-test-centers/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain as the main pre-booking checklist",
      "independentTaskJudgment": "independent payment-readiness and booking-input checklist, distinct from locating a test centre",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:18",
      "preservedSourcePath": "src/content/guides/goethe-a1-pre-booking-checklist.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-pre-booking-checklist.md",
      "preservedSourceBlob": "dd1d2971a8d22ad3439f727091e22764ff23c050",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-a1-pre-booking-checklist.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-pre-booking-checklist.md",
        "publicRedirectLineToRemove": "/guides/goethe-a1-pre-booking-checklist/ /guides/goethe-a1-test-centers/ 301",
        "manifestKeyToRemove": "/guides/goethe-a1-pre-booking-checklist/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-a1-pre-booking-checklist/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-003",
      "inventoryRecordIds": ["audited-13"],
      "sourceUrl": "/guides/goethe-a1-booking-mistakes/",
      "currentDirtyTargetUrl": "/guides/goethe-a1-test-centers/",
      "proposedSuccessorUrl": "/guides/goethe-a1-test-centers/",
      "packageConditionalTargetUrl": "/guides/goethe-a1-pre-booking-checklist/",
      "packageDecisionClass": "conditional",
      "packageDecision": "conditional 301 only after unique recovery content moves to the pre-booking checklist and GSC/backlink/HTTP checks pass",
      "independentTaskJudgment": "conditional incident-recovery task; the dirty target differs from the package candidate target",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:14",
      "preservedSourcePath": "src/content/guides/goethe-a1-booking-mistakes.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-booking-mistakes.md",
      "preservedSourceBlob": "e477538b9cb559027b4d343f11cfce4fcf4a0525",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-a1-booking-mistakes.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-booking-mistakes.md",
        "publicRedirectLineToRemove": "/guides/goethe-a1-booking-mistakes/ /guides/goethe-a1-test-centers/ 301",
        "manifestKeyToRemove": "/guides/goethe-a1-booking-mistakes/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-a1-booking-mistakes/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-004",
      "inventoryRecordIds": ["audited-31"],
      "sourceUrl": "/guides/goethe-a1-retake-policy/",
      "currentDirtyTargetUrl": "/guides/german-a1-exam-booking-timeline/",
      "proposedSuccessorUrl": "/guides/german-a1-exam-booking-timeline/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite the A1 retake task",
      "independentTaskJudgment": "independent post-result retake decision task, distinct from first-attempt backward planning",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:32",
      "preservedSourcePath": "src/content/guides/goethe-a1-retake-policy.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-retake-policy.md",
      "preservedSourceBlob": "c2d42d2704db9977bc375bfb44cdbfcb3272dbd8",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-a1-retake-policy.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-retake-policy.md",
        "publicRedirectLineToRemove": "/guides/goethe-a1-retake-policy/ /guides/german-a1-exam-booking-timeline/ 301",
        "manifestKeyToRemove": "/guides/goethe-a1-retake-policy/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-a1-retake-policy/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-005",
      "inventoryRecordIds": ["audited-19"],
      "sourceUrl": "/guides/goethe-a1-study-plan-working-adults/",
      "currentDirtyTargetUrl": "/guides/goethe-a1-30-day-study-plan/",
      "proposedSuccessorUrl": "/guides/goethe-a1-30-day-study-plan/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and differentiate the eight-week working-adult plan",
      "independentTaskJudgment": "independent eight-week schedule and missed-session recovery task, distinct from a 30-day plan",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:20",
      "preservedSourcePath": "src/content/guides/goethe-a1-study-plan-working-adults.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-study-plan-working-adults.md",
      "preservedSourceBlob": "69f5a812689345d5b954712656c47683b110b0a1",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-a1-study-plan-working-adults.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-study-plan-working-adults.md",
        "publicRedirectLineToRemove": "/guides/goethe-a1-study-plan-working-adults/ /guides/goethe-a1-30-day-study-plan/ 301",
        "manifestKeyToRemove": "/guides/goethe-a1-study-plan-working-adults/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-a1-study-plan-working-adults/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-006",
      "inventoryRecordIds": ["audited-16"],
      "sourceUrl": "/guides/goethe-a1-official-links-practice-resources/",
      "currentDirtyTargetUrl": "/guides/goethe-a1-30-day-study-plan/",
      "proposedSuccessorUrl": "/guides/goethe-a1-30-day-study-plan/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain as an annotated official-resource navigator",
      "independentTaskJudgment": "independent official-resource selection and verification task, distinct from daily study scheduling",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:17",
      "preservedSourcePath": "src/content/guides/goethe-a1-official-links-practice-resources.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-official-links-practice-resources.md",
      "preservedSourceBlob": "42b25983eef235e4c538eab039481113e4a52a8c",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-a1-official-links-practice-resources.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-official-links-practice-resources.md",
        "publicRedirectLineToRemove": "/guides/goethe-a1-official-links-practice-resources/ /guides/goethe-a1-30-day-study-plan/ 301",
        "manifestKeyToRemove": "/guides/goethe-a1-official-links-practice-resources/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-a1-official-links-practice-resources/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-007",
      "inventoryRecordIds": ["audited-15"],
      "sourceUrl": "/guides/goethe-a1-listening-practice/",
      "currentDirtyTargetUrl": "/guides/goethe-a1-30-day-study-plan/",
      "proposedSuccessorUrl": "/guides/goethe-a1-30-day-study-plan/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite as an original listening practice task",
      "independentTaskJudgment": "independent listening practice and error-analysis task, distinct from a multi-skill study calendar",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:16",
      "preservedSourcePath": "src/content/guides/goethe-a1-listening-practice.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-listening-practice.md",
      "preservedSourceBlob": "549f077fb5b1bef77764adc246998e03ac022cd6",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-a1-listening-practice.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-listening-practice.md",
        "publicRedirectLineToRemove": "/guides/goethe-a1-listening-practice/ /guides/goethe-a1-30-day-study-plan/ 301",
        "manifestKeyToRemove": "/guides/goethe-a1-listening-practice/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-a1-listening-practice/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-008",
      "inventoryRecordIds": ["audited-18"],
      "sourceUrl": "/guides/goethe-a1-speaking-topics/",
      "currentDirtyTargetUrl": "/guides/goethe-a1-30-day-study-plan/",
      "proposedSuccessorUrl": "/guides/goethe-a1-30-day-study-plan/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite as an original speaking-practice task",
      "independentTaskJudgment": "independent speaking interaction and self-assessment task, distinct from a multi-skill study calendar",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:19",
      "preservedSourcePath": "src/content/guides/goethe-a1-speaking-topics.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-speaking-topics.md",
      "preservedSourceBlob": "38369b22fa7f583fb4de6814a4ea9e9e0bb43b88",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-a1-speaking-topics.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-speaking-topics.md",
        "publicRedirectLineToRemove": "/guides/goethe-a1-speaking-topics/ /guides/goethe-a1-30-day-study-plan/ 301",
        "manifestKeyToRemove": "/guides/goethe-a1-speaking-topics/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-a1-speaking-topics/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-009",
      "inventoryRecordIds": ["audited-20"],
      "sourceUrl": "/guides/goethe-a1-writing-practice/",
      "currentDirtyTargetUrl": "/guides/goethe-a1-30-day-study-plan/",
      "proposedSuccessorUrl": "/guides/goethe-a1-30-day-study-plan/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite as an original writing-practice task",
      "independentTaskJudgment": "independent writing completion and error-review task, distinct from a multi-skill study calendar",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:21",
      "preservedSourcePath": "src/content/guides/goethe-a1-writing-practice.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-writing-practice.md",
      "preservedSourceBlob": "86003db1b07208911074e8525760878875d30884",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-a1-writing-practice.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-a1-writing-practice.md",
        "publicRedirectLineToRemove": "/guides/goethe-a1-writing-practice/ /guides/goethe-a1-30-day-study-plan/ 301",
        "manifestKeyToRemove": "/guides/goethe-a1-writing-practice/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-a1-writing-practice/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-010",
      "inventoryRecordIds": ["audited-21"],
      "sourceUrl": "/guides/goethe-b1-difficulty-analysis/",
      "currentDirtyTargetUrl": "/guides/goethe-b1-study-plan/",
      "proposedSuccessorUrl": "/guides/goethe-b1-study-plan/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite as an A2-to-B1 difficulty diagnostic",
      "independentTaskJudgment": "independent diagnostic and skill-gap task, distinct from the study-plan schedule",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:22",
      "preservedSourcePath": "src/content/guides/goethe-b1-difficulty-analysis.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-b1-difficulty-analysis.md",
      "preservedSourceBlob": "5b2bb3279d61146c7220b2e5202a6eccc8982312",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-b1-difficulty-analysis.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-b1-difficulty-analysis.md",
        "publicRedirectLineToRemove": "/guides/goethe-b1-difficulty-analysis/ /guides/goethe-b1-study-plan/ 301",
        "manifestKeyToRemove": "/guides/goethe-b1-difficulty-analysis/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-b1-difficulty-analysis/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-011",
      "inventoryRecordIds": ["audited-23"],
      "sourceUrl": "/guides/goethe-b1-mock-exam-routine/",
      "currentDirtyTargetUrl": "/guides/goethe-b1-study-plan/",
      "proposedSuccessorUrl": "/guides/goethe-b1-study-plan/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite as a timed mock-exam routine",
      "independentTaskJudgment": "independent timed simulation and review-loop task, distinct from the study-plan schedule",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:24",
      "preservedSourcePath": "src/content/guides/goethe-b1-mock-exam-routine.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-b1-mock-exam-routine.md",
      "preservedSourceBlob": "bccb3b7b491e4bdcaecaddcb6ca0e91951983034",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-b1-mock-exam-routine.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-b1-mock-exam-routine.md",
        "publicRedirectLineToRemove": "/guides/goethe-b1-mock-exam-routine/ /guides/goethe-b1-study-plan/ 301",
        "manifestKeyToRemove": "/guides/goethe-b1-mock-exam-routine/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-b1-mock-exam-routine/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-012",
      "inventoryRecordIds": ["audited-22"],
      "sourceUrl": "/guides/goethe-b1-listening-deep-dive/",
      "currentDirtyTargetUrl": "/guides/goethe-b1-study-plan/",
      "proposedSuccessorUrl": "/guides/goethe-b1-study-plan/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite as a B1 listening deep dive",
      "independentTaskJudgment": "independent B1 listening strategy and error-pattern task, distinct from the study-plan schedule",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:23",
      "preservedSourcePath": "src/content/guides/goethe-b1-listening-deep-dive.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-b1-listening-deep-dive.md",
      "preservedSourceBlob": "bc5abe521b5c2047cd3cb1b1ab278c0d49881a0a",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-b1-listening-deep-dive.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-b1-listening-deep-dive.md",
        "publicRedirectLineToRemove": "/guides/goethe-b1-listening-deep-dive/ /guides/goethe-b1-study-plan/ 301",
        "manifestKeyToRemove": "/guides/goethe-b1-listening-deep-dive/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-b1-listening-deep-dive/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-013",
      "inventoryRecordIds": ["audited-24"],
      "sourceUrl": "/guides/goethe-b1-speaking-topics/",
      "currentDirtyTargetUrl": "/guides/goethe-b1-study-plan/",
      "proposedSuccessorUrl": "/guides/goethe-b1-study-plan/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite as B1 speaking interaction practice",
      "independentTaskJudgment": "independent interactive speaking and feedback task, distinct from the study-plan schedule",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:25",
      "preservedSourcePath": "src/content/guides/goethe-b1-speaking-topics.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-b1-speaking-topics.md",
      "preservedSourceBlob": "5d6eebdf5f9fbd81a2a9de1e85bd47267c15d02f",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-b1-speaking-topics.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-b1-speaking-topics.md",
        "publicRedirectLineToRemove": "/guides/goethe-b1-speaking-topics/ /guides/goethe-b1-study-plan/ 301",
        "manifestKeyToRemove": "/guides/goethe-b1-speaking-topics/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-b1-speaking-topics/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-014",
      "inventoryRecordIds": ["audited-25"],
      "sourceUrl": "/guides/goethe-b1-writing-assessment/",
      "currentDirtyTargetUrl": "/guides/goethe-b1-study-plan/",
      "proposedSuccessorUrl": "/guides/goethe-b1-study-plan/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite as a B1 writing assessment task",
      "independentTaskJudgment": "independent writing-sample and self-assessment task, distinct from the study-plan schedule",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:26",
      "preservedSourcePath": "src/content/guides/goethe-b1-writing-assessment.md",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-b1-writing-assessment.md",
      "preservedSourceBlob": "2ae7943125d159ed4e7491748f57675baef8b412",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/content/guides/goethe-b1-writing-assessment.md",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/content/guides/goethe-b1-writing-assessment.md",
        "publicRedirectLineToRemove": "/guides/goethe-b1-writing-assessment/ /guides/goethe-b1-study-plan/ 301",
        "manifestKeyToRemove": "/guides/goethe-b1-writing-assessment/",
        "canonicalExpectation": "https://visalang.org/guides/goethe-b1-writing-assessment/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-015",
      "inventoryRecordIds": ["audited-41"],
      "sourceUrl": "/zh/guides/goethe-a1-germany-family-reunion/",
      "currentDirtyTargetUrl": "/zh/guides/german-family-reunion-language-requirement/",
      "proposedSuccessorUrl": "/zh/guides/german-family-reunion-language-requirement/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite the Chinese existing-certificate verification task",
      "independentTaskJudgment": "independent existing-certificate validity and acceptance-verification task, distinct from the general language requirement",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:42",
      "preservedSourcePath": "src/pages/zh/guides/goethe-a1-germany-family-reunion.astro",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/pages/zh/guides/goethe-a1-germany-family-reunion.astro",
      "preservedSourceBlob": "a9c5309e961d3b7dbc662ecabe4b66ee4a22c78e",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/pages/zh/guides/goethe-a1-germany-family-reunion.astro",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/pages/zh/guides/goethe-a1-germany-family-reunion.astro",
        "publicRedirectLineToRemove": "/zh/guides/goethe-a1-germany-family-reunion/ /zh/guides/german-family-reunion-language-requirement/ 301",
        "manifestKeyToRemove": "/zh/guides/goethe-a1-germany-family-reunion/",
        "canonicalExpectation": "https://visalang.org/zh/guides/goethe-a1-germany-family-reunion/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-016",
      "inventoryRecordIds": ["audited-44"],
      "sourceUrl": "/zh/guides/goethe-a1-booking-mistakes/",
      "currentDirtyTargetUrl": "/zh/guides/goethe-a1-test-centers/",
      "proposedSuccessorUrl": "/zh/guides/goethe-a1-test-centers/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and localize the Chinese booking-recovery task",
      "independentTaskJudgment": "independent China-specific payment, name, identity, and cancellation recovery task, distinct from finding a test centre",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:45",
      "preservedSourcePath": "src/pages/zh/guides/goethe-a1-booking-mistakes.astro",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/pages/zh/guides/goethe-a1-booking-mistakes.astro",
      "preservedSourceBlob": "2b4ca41372371e974aef042d3b9301021bf4abcb",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/pages/zh/guides/goethe-a1-booking-mistakes.astro",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/pages/zh/guides/goethe-a1-booking-mistakes.astro",
        "publicRedirectLineToRemove": "/zh/guides/goethe-a1-booking-mistakes/ /zh/guides/goethe-a1-test-centers/ 301",
        "manifestKeyToRemove": "/zh/guides/goethe-a1-booking-mistakes/",
        "canonicalExpectation": "https://visalang.org/zh/guides/goethe-a1-booking-mistakes/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    },
    {
      "recordId": "S3-REDIRECT-017",
      "inventoryRecordIds": ["audited-46"],
      "sourceUrl": "/zh/guides/german-a1-documents-checklist/",
      "currentDirtyTargetUrl": "/zh/guides/german-a1-exam-booking-timeline/",
      "proposedSuccessorUrl": "/zh/guides/german-a1-exam-booking-timeline/",
      "packageDecisionClass": "retain-conflict",
      "packageDecision": "retain and rewrite the Chinese materials-separation task",
      "independentTaskJudgment": "independent booking, test-day, certificate, and application-document separation task, distinct from a timeline",
      "packageEvidenceLocator": "docs/master-package-2026-09-08/VisaLang-url-remediation.csv:47",
      "preservedSourcePath": "src/pages/zh/guides/german-a1-documents-checklist.astro",
      "preservedSourceRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/pages/zh/guides/german-a1-documents-checklist.astro",
      "preservedSourceBlob": "8922238e9a6ba6b579f6e18dee0304c3123872fc",
      "currentWorkspaceSourceState": "absent-in-dirty-worktree",
      "evidenceGaps": {"gsc":"missing","backlinks":"missing","productionHttp":"not-observed","legalConfigurationEntryPoint":"present","productionConfigurationInstallation":"not-observed","productionConfigurationEffect":"not-observed","ownerAuthorization":"pending"},
      "authorizationState": "owner-pending-no-change-authority",
      "disposition": "REJECT_CURRENT_REDIRECT",
      "rollbackMapping": {
        "restoreSourcePath": "src/pages/zh/guides/german-a1-documents-checklist.astro",
        "restoreFromRef": "4cb57e8744c752fed1881281e69e7b24cc7281c4:src/pages/zh/guides/german-a1-documents-checklist.astro",
        "publicRedirectLineToRemove": "/zh/guides/german-a1-documents-checklist/ /zh/guides/german-a1-exam-booking-timeline/ 301",
        "manifestKeyToRemove": "/zh/guides/german-a1-documents-checklist/",
        "canonicalExpectation": "https://visalang.org/zh/guides/german-a1-documents-checklist/",
        "internalLinkAction": "restore-direct-links-only-after-source-review",
        "indexingAction": "re-evaluate-after-source-and-authority-review",
        "sitemapAction": "derive-from-reviewed-publication-policy",
        "productionVerification": "authorized-production-window-required"
      }
    }
  ]
}
```
<!-- M3_T23_MACHINE_RECORD_END -->

## Decision gate before any future action

For a candidate to move beyond this evidence map, the Owner must provide a
locatable decision and name the exact source/target pair. The review must bind a
current GSC export, backlink evidence, observed source and target HTTP/head
behavior, and the legally active redirect configuration. A content and authority
review must then decide whether the tasks are genuinely equivalent. Only after
those gates may a separately authorized implementation change a source,
redirect, canonical, internal link, sitemap policy, deployment artifact, or
production route.
