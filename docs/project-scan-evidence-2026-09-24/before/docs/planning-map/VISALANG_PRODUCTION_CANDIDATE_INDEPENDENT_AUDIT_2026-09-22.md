---
agent: visalang-independent-auditor
reviewer_independent: true
review_round: 2
baseline: "codex/scheme-3-one-week-content @ 4cb57e8744c752fed1881281e69e7b24cc7281c4"
scope:
  - "deploy/.gitignore"
  - "deploy/deploy.sh"
  - "deploy/production-evidence.example.json"
  - "deploy/README.md"
  - "deploy/release.py"
  - "deploy/retained-routes.json"
  - "deploy/rollback.sh"
  - "deploy/tests/test_release.py"
  - "docs/CONTENT_MAP.md"
  - "docs/master-package-2026-09-08/BACKLOG_STATUS_OVERLAY_2026-09-09.md"
  - "docs/master-package-2026-09-08/EXECUTION_RECORD.md"
  - "docs/planning-map/history.json"
  - "docs/planning-map/sync.json"
  - "docs/planning-map/visalang-overall-build-plan.archify.json"
  - "docs/planning-map/visalang-overall-build-plan.html"
  - "docs/planning-map/visalang-overall-build-plan.visual-check.1440x900.dark.png"
  - "docs/planning-map/visalang-overall-build-plan.visual-check.1440x900.light.png"
  - "docs/planning-map/visalang-overall-build-plan.visual-check.2048x1320.dark.png"
  - "docs/planning-map/visalang-overall-build-plan.visual-check.2048x1320.light.png"
  - "docs/planning-map/visalang-overall-build-plan.visual-check.json"
  - "docs/planning-map/visual-review.json"
  - "docs/release-candidate-evidence-2026-09-22/acceptance.md"
  - "docs/release-candidate-evidence-2026-09-22/archify-deliver.json"
  - "docs/release-candidate-evidence-2026-09-22/archify-validate.json"
  - "docs/release-candidate-evidence-2026-09-22/baseline-status.txt"
  - "docs/release-candidate-evidence-2026-09-22/baseline.json"
  - "docs/release-candidate-evidence-2026-09-22/browser-results.json"
  - "docs/release-candidate-evidence-2026-09-22/browser-run.txt"
  - "docs/release-candidate-evidence-2026-09-22/browser-scenarios.mjs"
  - "docs/release-candidate-evidence-2026-09-22/browser-visual-review.json"
  - "docs/release-candidate-evidence-2026-09-22/build.txt"
  - "docs/release-candidate-evidence-2026-09-22/calendar-import.md"
  - "docs/release-candidate-evidence-2026-09-22/candidate-manifest.json"
  - "docs/release-candidate-evidence-2026-09-22/deploy-red.txt"
  - "docs/release-candidate-evidence-2026-09-22/deploy-smoke-red.txt"
  - "docs/release-candidate-evidence-2026-09-22/deploy-tests.txt"
  - "docs/release-candidate-evidence-2026-09-22/en-mobile.png"
  - "docs/release-candidate-evidence-2026-09-22/german-a1-documents-checklist-mobile.png"
  - "docs/release-candidate-evidence-2026-09-22/goethe-a1-listening-practice-mobile.png"
  - "docs/release-candidate-evidence-2026-09-22/goethe-b1-writing-assessment-mobile.png"
  - "docs/release-candidate-evidence-2026-09-22/keyboard-native-zh.md"
  - "docs/release-candidate-evidence-2026-09-22/launch-check.txt"
  - "docs/release-candidate-evidence-2026-09-22/laya-actual.json"
  - "docs/release-candidate-evidence-2026-09-22/laya-comparison.md"
  - "docs/release-candidate-evidence-2026-09-22/laya-expected.json"
  - "docs/release-candidate-evidence-2026-09-22/live-url-observations.json"
  - "docs/release-candidate-evidence-2026-09-22/metrics-red.txt"
  - "docs/release-candidate-evidence-2026-09-22/pre-audit-npm-test.txt"
  - "docs/release-candidate-evidence-2026-09-22/progress.md"
  - "docs/release-candidate-evidence-2026-09-22/python-tests.txt"
  - "docs/release-candidate-evidence-2026-09-22/retained-red.txt"
  - "docs/release-candidate-evidence-2026-09-22/retained-source-ledger.json"
  - "docs/release-candidate-evidence-2026-09-22/task-delta.patch"
  - "docs/release-candidate-evidence-2026-09-22/vault-review.md"
  - "docs/release-candidate-evidence-2026-09-22/zh-desktop.png"
  - "docs/release-candidate-evidence-2026-09-22/zh-mobile.png"
  - "docs/superpowers/plans/2026-09-22-production-candidate.md"
  - "docs/TASK_LOG.md"
  - "public/_redirects"
  - "scripts/launch-check.js"
  - "services/laya-purpose/app.py"
  - "services/laya-purpose/Dockerfile"
  - "services/laya-purpose/model.lock.json"
  - "services/laya-purpose/probe.py"
  - "services/laya-purpose/README.md"
  - "services/laya-purpose/requirements.in"
  - "services/laya-purpose/requirements.lock"
  - "services/laya-purpose/test_app.py"
  - "src/content/guides/german-a1-family-reunion-faq.md"
  - "src/content/guides/goethe-a1-booking-mistakes.md"
  - "src/content/guides/goethe-a1-listening-practice.md"
  - "src/content/guides/goethe-a1-official-links-practice-resources.md"
  - "src/content/guides/goethe-a1-pre-booking-checklist.md"
  - "src/content/guides/goethe-a1-retake-policy.md"
  - "src/content/guides/goethe-a1-speaking-topics.md"
  - "src/content/guides/goethe-a1-study-plan-working-adults.md"
  - "src/content/guides/goethe-a1-writing-practice.md"
  - "src/content/guides/goethe-b1-difficulty-analysis.md"
  - "src/content/guides/goethe-b1-listening-deep-dive.md"
  - "src/content/guides/goethe-b1-mock-exam-routine.md"
  - "src/content/guides/goethe-b1-speaking-topics.md"
  - "src/content/guides/goethe-b1-writing-assessment.md"
  - "src/data/publication-manifest.ts"
  - "src/data/zh-germany-a1.ts"
  - "src/pages/zh/guides/german-a1-documents-checklist.astro"
  - "src/pages/zh/guides/goethe-a1-booking-mistakes.astro"
  - "src/pages/zh/guides/goethe-a1-germany-family-reunion.astro"
  - "tests/content-integrity.test.js"
  - "tests/deploy.test.js"
  - "tests/m2a-staged-checklist-content.test.mjs"
  - "tests/m3-generated-seo.test.mjs"
  - "tests/m3-migration-map.test.mjs"
  - "tests/retained-routes.test.mjs"
  - "tests/scheme-3-atomic-merge.test.mjs"
  - "tests/scheme-3-content-map.test.mjs"
  - "tests/scheme-3-gates.test.js"
  - "tests/scheme-3-publication.test.mjs"
  - "tests/scheme-3-release-candidate.test.mjs"
  - "tests/site.test.js"
  - "tests/source-review-render.test.js"
  - "tests/task-4-guides-render.test.mjs"
  - "tests/url-support-inventory.test.mjs"
agent_review_status: pass
overall_verdict: PASS
findings: []
owner_authorization: pending
deployment_status: not_started
vault_status: blocked
candidate_scope_digest: 4c075afd782bfdc30a00e725ee108a212d10670b4621edcffb21fd39b19f7256
diagram_source_sha256: 903237d8d675f3a0022c4e0f7d49c583124b8fd48feeec794601e5fc29eabd58
diagram_artifact_sha256: eb203496659b4498bbd3aff214db834eece6ee486028662ecd5ec1a9c89af20c
sync_receipt_sha256: 5fa58dbf808a31fba49cfbaed378884aa988172fa3a5ed7149f7412099af0252
planning_drift_status: approved-deviation
---

# Independent local production-source candidate audit — 2026-09-22

PASS for the exact 102-path local source candidate above, after the same Auditor re-reviewed the round-1 P2 correction. No scoped P0/P1/P2 remains. This is not production-readiness approval. Model quality, target capacity, image build, ads/account evidence, live URL verification and operational release work remain incomplete.

The reviewer is the separate read-only VisaLang Independent Auditor. It did not implement, plan, edit content, repair tests or mutate the submitted candidate. It read the candidate and official sources, inspected screenshots and ran verification; the only file it writes is this report. Owner authorization and deployment evidence are separate from Agent review. This PASS cannot authorize a commit, push, purchase, account change, DNS change, deployment, indexing expansion or an individual immigration/exam outcome.

## Scope, baseline and integrity

The frozen scope exactly matches candidate-manifest.json and sync.json scope.changedPaths. The baseline is the branch and commit above, upstream origin/codex/scheme-3-one-week-content, ahead/behind 0/0, no staged entries. Extensive existing dirty work is explained by baseline.json, baseline-status.txt and the preserved pre-window bytes at `/tmp/visalang-release-baseline-20260922/`; task-delta.patch distinguishes this task's changes. HEAD alone is not a reproducible candidate. The temporary baseline is not a durable production backup.

The Auditor recomputed every candidateByteBindings value, confirmed exact 102-path manifest equality, and independently executed the governance checks up to their then-missing-report gate. The full final sync bytes are bound above. The scope expanded during documented correction to include deploy-smoke-red.txt and the refreshed browser-visual-review.json, then was independently refrozen. Any later bound-byte mutation invalidates this verdict. This report is excluded from its own candidate hash cycle.

## Finding and same-Auditor re-review

Round 1 found P2 in `deploy/release.py`, `Host.smoke`: curl `--fail` accepts redirects, allowing a retained/core path returning 301/302 to pass and the transaction to record a successful switch. That contradicted the retained-URL decision. Required remediation was exact HTTP 200 without redirect following while preserving TLS/SNI verification, plus a focused regression.

Round 2 confirms each core/retained probe now captures `%{http_code}` and requires `b'200'`. The new test rejects 301, 302, 204 and 404 and accepts all-200 paths followed by the API contract. The Auditor independently ran `PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s deploy/tests -v`: nine tests passed. The prior failure is retained in deploy-smoke-red.txt. The scope contains no remaining instance of this finding.

## Article-by-article review

Every restored article was read, including its front matter/Chinese metadata, distinct intent, next action, authority boundary and source card. They preserve 14 English and three Chinese source URLs as self-canonical noindex/follow, outside sitemap and advertising-free supporting tasks. They are not promoted into the 15 EN/5 ZH indexed pillar allowlists. Original practice prompts are distinguished from official tasks; none introduces a fabricated price, pass score, deadline, certificate acceptance or individual eligibility conclusion.

The following official pages were independently reopened on 2026-09-22. The source ledger supplies the owner, checked date, locator, allowed support and boundary. Source support is limited to the linked resource/authority entry point; original practice and record-keeping advice does not become an official requirement.

- S1: [Federal Foreign Office language FAQ](https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682), question and mission-referral paragraph. Supports routing further questions to the responsible German mission, not resolving exceptions for an individual.
- S2: [Goethe examination directory](https://www.goethe.de/en/spr/prf.html), product sections, examination rules and centre links. Supports finding the exact product/provider and local instructions, not universal local booking terms.
- S3: [Goethe A1 training](https://www.goethe.de/en/spr/prf/ueb/pa1.html), A1 Adults and accessible digital training sections. Confirms adult practice materials and format references; individual accommodations require provider confirmation.
- S4: [Goethe B1 training](https://www.goethe.de/en/spr/prf/ueb/pb1.html), B1 Adults and training instructions. Confirms adult practice resources; editorial routines and feedback are not official results.
- S5: [German missions in China language-proof guidance](https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606), proof section. Supports that the China guidance discusses certificate types and examination-date conditions; the articles correctly avoid claiming acceptance of a particular person's certificate or applying China instructions worldwide.
- S6: [Goethe Beijing examination registration](https://www.goethe.de/ins/cn/zh/spr/prf/anm.html), registration forms, payment, test-day information and registration contacts. Supports a Beijing-specific verification entry point, not nationwide correction/refund guarantees.

| Restored article slug | Verdict | Independent task and source boundary |
| --- | --- | --- |
| EN german-a1-family-reunion-faq | PASS | Precise unresolved-question record and competent mission referral; S1. |
| EN goethe-a1-pre-booking-checklist | PASS | Product/payment/timing decision record before paying; missing facts returned to selected centre; S2. |
| EN goethe-a1-booking-mistakes | PASS | Name/payment/confirmation recovery record; no promised refund or completed correction; S2. |
| EN goethe-a1-retake-policy | PASS | Separates result review from a new booking and preparation; no invented interval or deadline; S2. |
| EN goethe-a1-study-plan-working-adults | PASS | Flexible working-week practice and recovery, not official preparation duration; S3. |
| EN goethe-a1-official-links-practice-resources | PASS | Traceable resource cards, adult-section selection and accommodation boundary; S3. |
| EN goethe-a1-listening-practice | PASS | Error diagnosis and original detail drill, not predicted questions; S3. |
| EN goethe-a1-speaking-topics | PASS | Original partner prompts and repair practice, not an official topic forecast; S3. |
| EN goethe-a1-writing-practice | PASS | Original messages and two-pass self-check, no official score/word-count claim; S3. |
| EN goethe-b1-difficulty-analysis | PASS | Four-skill evidence table rather than invented pass probability; S4. |
| EN goethe-b1-mock-exam-routine | PASS | Conditions/assistance/error log and official-material timing reference; S4. |
| EN goethe-b1-listening-deep-dive | PASS | Distinguishes information targets and speaker changes using an original drill; S4. |
| EN goethe-b1-speaking-topics | PASS | Interactive original shared-decision practice, not memorised topic prediction; S4. |
| EN goethe-b1-writing-assessment | PASS | Draft/feedback/revision evidence without invented examiner points; S4. |
| ZH goethe-a1-germany-family-reunion | PASS | Existing-certificate submission questions, with China/mission scope retained; S5. |
| ZH goethe-a1-booking-mistakes | PASS | Centre-specific correction/payment query and explicit Beijing-only source scope; S6. |
| ZH german-a1-documents-checklist | PASS | Editorial folders separate booking, test day, certificate and visa material; no universal official checklist; S5/S6. |

## Implementation and test review

The current retained-route register and publication manifest are consistent: zero active candidate redirects, 17 maintained historical URLs, unchanged compatibility HTML rules, and 105 local HTML pages / 41 sitemap URLs / 64 noindex pages / 14 ad-enabled pages. The immutable September 11 candidate map remains historical evidence, with its Git-blob recovery checks and prior dispositions tested in m3-migration-map.test.mjs. Current retention has separate assertions; history is not relabelled as migration authorization.

The release tool binds the bundle file set and bytes, exact source commit, image digest, model revision and source-input hashes; rejects dirty candidates for activation; binds operation, previous release and six hashed operator-evidence records; serializes host mutation under a lock; stages/validates/probes/reloads/smokes before updating current. Rollback uses the same target transaction, and restore failure propagates. Root-owned immutable bundles and reviewed evidence are operational preconditions. Evidence receipts are operator attestations, not automatic proof that accounts are compliant. No host crash recovery, Docker/Nginx execution or real rollback rehearsal has been proven by mocks.

The model lock records exact revision and file hashes; requirements.lock contains the Linux amd64/Python 3.13 CPU resolution with hashes; the image requires an explicit base. These establish source inputs, not a built image or tested host allocation. A real image digest and image/source provenance must be reviewed before activation.

Service metrics use only fixed aggregate status counters, total inference seconds, busy state and peak RSS; no text, IP, identifier or text-derived label is retained. The Nginx public endpoint does not expose health/metrics. Loaded health alone is not liveness; the real inference probe is explicitly separate. Mandatory user confirmation and manual fallback remain intact, and country/eligibility logic remains deterministic.

Submitted verification: seven Python service tests passed; corrected deployment suite nine passed; generated local launch-check 57 pass / 0 fail / 0 blocked. Full npm functional checks passed up to the then-missing independent report, whose creation cannot precede this review. Final full npm/governance must be rerun after this binder without changing candidate bytes. Neither the preaudit run nor this verdict fabricates that future result.

The refreshed browser results record 15 passes and one native-select automation-inconclusive observation with no page errors. A separate contemporary native macOS in-app-browser keyboard receipt documents the Chinese form flow passing; this does not erase the inconclusive headless result or prove all devices. Real-model browser forwarding is test-only localhost forwarding, not production Nginx evidence. Deterministic fault cases are openly stubbed.

## Planning and visual verification

The map remains derived from the Master Package, current overlay and execution record. The Owner's explicit local implementation/URL-retention instruction is locatable in the plan, supporting approved-deviation; it does not authorize live rollout. Existing incomplete production tasks remain incomplete. Unique sync VL-PMAP-20260922-02, history chaining, mandatory watch roots, watched digest and classification integrity were verified by the governance checks and full byte comparisons.

Archify showcase/atomic delivery records nine checks, zero errors and zero warnings. The Auditor inspected every exact map screenshot: 1440x900 light/dark and 2048x1320 light/dark. Nodes, relationship paths, status cards, full digest and Owner boundary remain visible and contained in both themes. Automated containment and the separate perceptual visual-review.json are distinct, hash-bound evidence.

The Auditor inspected all six refreshed final-build captures named in browser-visual-review.json: EN mobile, ZH desktop/mobile and three restored article mobile views. Titles, corrected authority copy, form labels, disclosure and focus outlines are legible without horizontal clipping in the captured views. These are viewport observations, not complete long-page or cross-device coverage. All final screenshots and both browser/perceptual receipts match their candidate bindings.

## Explicit production and operational limits

The real frozen model check is 11/20, with unresolved ambiguity/negation errors. This is inadequate evidence to approve public model quality; it does not establish improvement over the different earlier sample. macOS peak RSS is 4,140,924,928 bytes; neither the 3 GB container allocation nor a 4 GB host is validated. Independent holdout quality and Linux cold-load/steady-state/cgroup/restart/static-concurrency tests remain necessary before a production decision.

No Docker image, production host, account-side advertising/CMP evidence, live TLS/API/retained-page proof, DNS change, purchase, deployment or real rollback exercise was completed. Public old-URL observations are 16 HTTP 403 and one timeout and cannot establish migration/indexing behavior. Website, Laya and ads remain a joint release condition; no ad-free substitute is approved. T31–T34 observations cannot be completed before launch.

Calendar import remains blocked without an authorized disposable destination. The configured Vault/template is absent; vault-review.md is an unsynced payload with review/pending/not_started, not a Vault write. Those limits are preserved rather than waived by this source-review PASS. A later separately authorized production window must supply actual evidence and fresh independent review of changed artifacts.

Post-report independent check: `node tests/planning-map-governance.test.mjs` exited 0, reporting 215 watched files and sync VL-PMAP-20260922-02. Final full-suite verification remains the implementer's handoff check.
