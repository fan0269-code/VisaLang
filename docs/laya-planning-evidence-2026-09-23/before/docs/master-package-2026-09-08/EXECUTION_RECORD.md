# Master Package execution record

Checked: 2026-09-13 (Asia/Shanghai)  
Execution status: `completed` at task-review gate for T01–T18, T20–T22 and T24–T26; T27 local implementation in progress pending independent review; T19 partial/in progress; T23 evidence-map-only/blocked  
Release status: `not_deployed`

## Authority and checkout baseline

The direct user instruction of 2026-09-08 makes the copied Master Package in
this directory the current local execution authority. It supersedes the
README's earlier exclusive-Scheme-3 statement for new work but does not erase
the older Scheme 3 plan or its extensive uncommitted changes. Those remain
historical/in-progress input requiring reconciliation.

| Baseline fact | Evidence |
| --- | --- |
| Branch | `codex/scheme-3-one-week-content` |
| HEAD / baseline commit | `4cb57e8744c752fed1881281e69e7b24cc7281c4` |
| Checkout | Normal checkout, not a linked worktree |
| Dirty-tree exception | Extensive Scheme 3 changes predated this task and are preserved. Recoverable controller artifacts: `.superpowers/sdd/VisaLang-Master-Plan/baseline-tracked.patch` (SHA-256 `d1b0bb1a3be914f609a6efd4085800281531e0bf762545f90443a9a0729a0eeb`) and `baseline-untracked-validated.tar.gz` (SHA-256 `cbe413bb4ba79b475e3671a78252ea51f311629bb8b34523696719a1cea295d0`; `gzip -t` and `tar -tzf` pass). The original `baseline-untracked.tar.gz` is retained for forensics but is not recovery evidence because `gzip -t` reports trailing garbage. |
| Runtime | Node `v22.23.2`; npm `10.9.8`; Astro `7.1.1` |
| Baseline test | `npm test`: pass; existing `MODULE_TYPELESS_PACKAGE_JSON` warnings |
| Baseline build | `npm run build`: pass; 81 pages built |
| Baseline launch check | `npm run launch-check`: pass, 54/54; validates the older Scheme 3 publication/deletion model and is not Master Package acceptance proof |

## Package work status

| Scope | Execution status | Release status | Evidence / next boundary |
| --- | --- | --- | --- |
| T01 package integration | `completed` | `not_deployed` | Eight Markdown/CSV artifacts copied verbatim into this directory. |
| T02 source map and baseline | `completed` | `not_deployed` | `SOURCE_MAP.md` maps actual sources, commands, versions, protections and conflicts. |
| T03 P0 corrections | `completed` | `not_deployed` | Corrected the authority split and exposed editorial copy; restored the fee route as a self-canonical, noindex, ad-free page. Task-quality review: Approved. |
| T04–T05 inventory and fact contract | `completed` | `not_deployed` | Reconciled 64 audited, 14 unverified and 24 source-discovered records; added exact-version, fail-closed claim/support contracts. Task-quality review: Approved. |
| T06–T08 templates, support and C01/C07 | `completed` | `not_deployed` | Added bounded direct answers/support states, rewrote C01, and restored English C07 as a self-canonical, noindex, ad-free page. Task-quality review: Approved. |
| T09 verification and independent audit | `completed` | `not_deployed` | Audit round 2 confirmed four round-1 findings resolved and found one remaining P1: a missing fee-guide FFO ledger row plus a vacuous source extractor. Its repaired regression failed RED on that exact row, then passed GREEN after the eight-field row was added; a separate task-quality review passed. Fresh 83/35/48/14 output, post-test direct 55/55 orphan check, clean build, full 55/55 launch-check and round-3 record freeze passed locally. The same Independent Auditor returned round-3 `PASS` with `findings: []`. |
| T10 exact A1 product comparison | `completed` | `not_deployed` | Added typed, versioned records for the exact adult Goethe-Zertifikat A1: Start Deutsch 1 and Start Deutsch 1 / telc Deutsch A1 products. Format, duration, oral, score and whole/partial-sitting facts retain independent owner sources; acceptance and local fees remain separate and no easiest-product ranking is made. Same Independent Auditor: `PASS`. |
| T11 staged checklist content | `completed` | `not_deployed` | Rebuilt the configured Germany family-reunion A1 working list as stable atomic tasks across requirement, exam choice, booking, exam/certificate and submission review. Each task records done-when, owner, source and boundary; it is explicitly not a universal or complete visa-document list. Same Independent Auditor: `PASS`. |
| T12 scoped centre and fee evidence | `completed` | `not_deployed` | Added four 2026 records: Goethe Germany EUR 155 regular and EUR 124 exact-discount arithmetic, plus Goethe Beijing CNY 1,400 current-learner and CNY 1,500 non-current-learner rows. Two official centre routes are scoped to Germany and the named Beijing institute. Currencies are not converted; categories, checkout, dates and seats remain local checks. Unknown fee fallback output exposes status, owner, action and boundary. The fee guide is the 15th English pillar and remains ad-free. Same Independent Auditor: `PASS`. |
| T13 calendar-day planning contract | `completed` | `not_deployed` | Added one strict D/W/P/R contract: base `D - W - P`, additional buffer `D - W - P - R`, with no provider/default duration. Three reproducible scenarios cover ordinary, cross-year and leap-day arithmetic; the strict shared parser, 3,650-day per-input ceiling and UTC calculation now match persistence. A buffer is not a real retake, approval or result guarantee. Same Independent Auditor: `PASS`. |
| T14 versioned shared plan | `completed` | `not_deployed` | Added schema v1 shared state for all five tools: session-first storage, explicit 30-day device snapshot, stable IDs, locale/route/application-region separation, rule/claim version reconfirmation and allowlisted legacy migration. New form runs do not write plan values to URLs; no-JavaScript forms fail closed; discard-only legacy queries cannot cancel reconfirmation; same-origin historic `visalang-tool:` keys are removed without touching route progress. Privacy and Cookie pages disclose the actual boundaries. Same Independent Auditor: `PASS`. |
| T15–T18 M2-B tool acceptance | `completed` | `not_deployed` | Focused automated and desktop/390/768 browser evidence pass for Route Finder, Checklist, Exam Comparison and Timeline. Browser acceptance exposed and closed a 390 px comparison containment defect and a configured-to-unsupported Checklist action leak through strict RED→GREEN corrections and separate task reviews. Audit remediation also replaced stale static-required assertions and moved governance to the true end of the full suite. The exact 36-path candidate received M2-B Independent Auditor round-2 `PASS`, followed by all-green serial focused/full/build/launch/governance/diff gates. |
| T19 reminder / RFC 5545 | `in_progress` | `not_deployed` | The tested generator produces a stable UID, UTC DTSTAMP, all-day start, exclusive next-day end, CRLF, escaped/folded TEXT and the configured route's exact Federal Foreign Office verification URL. A real Chrome download matched generator bytes exactly (911 bytes; SHA-256 `36c0f751d9c3b1ffa4917eaef5cddc353c7215a4970df69a85907075ffefe747`) and the independent implementation review passed. Calendar-client import remains blocked/not_tested pending separate authorization, so T19 is not fully verified or completed. |
| T20 Chinese A1 journey | `completed` | `not_deployed` | Five `zh-CN` tool routes reuse the shared fact and calculation contracts. The typed reconciliation maps eight historical Chinese A1 tasks to five maintained guide routes, with three preserved as absorbed task modules. The same Independent Auditor returned round-3 `PASS` with no P0/P1/P2 findings. |
| T21 discovery, exam and trust surfaces | `completed` | `not_deployed` | Guide discovery uses four explicit purposes (`family`, `settlement`, `citizenship`, and `preparation`) and exactly three public facets (Purpose, Stage, and Language), including multi-value matching and restorable/clearable/zero-result state. The exam directory retains 31 records: two exact registry-backed supported A1 products followed by 29 truthful reference-only entries. The same Independent Auditor returned round-3 `PASS`. |
| T22 generated SEO and local preview | `completed` | `not_deployed` | The independently reviewed source-generated/local-preview contract records 88 generated pages, 41 sitemap URLs, 47 noindex pages, 14 ad-eligible pages and 11 genuine reciprocal hreflang pairs. Production HTTP is `not_observed`; local completion does not establish production behavior. |
| T23 migration candidate / rollback map | `blocked` | `not_deployed` | `evidence_map_only`: the repository-only map records candidate and rollback fields without changing a URL, redirect, canonical, sitemap or production system. GSC, backlink, legally active configuration and Owner authorization evidence are absent, so migration remains blocked. |

`pending`, `in_progress`, `blocked`, and `completed` are execution states.
They are separate from release states such as `not_deployed`; this document
does not assert publication, production verification, or owner approval.

## Scope and conflict rulings

1. T01–T02 integrated documentation and source mapping only. Later rows T03–T14
   made the bounded first-batch implementation changes recorded in their task
   reports and M2-A evidence record; this does not retroactively change the
   T01–T02 baseline or claim completion of the whole Master Package.
2. The package P0 audit is remediation input, not evidence that a page is now
   corrected. Official-source boundaries remain mandatory for future claims.
3. Existing Scheme 3 publication/deletion behavior conflicts with the Master
   Package where retention/migration lacks evidence. This record preserves the
   conflict; it does not resolve it through route or redirect modification.
4. No commit, push, deployment, external-account action, destructive reset,
   branch switch, worktree creation, or write outside the repository is
   authorized.

## Reproducibility and verification

The copied files preserve their source names and can be checked against the
source package with `shasum -a 256`. T01–T02 verified file presence, repository
configuration, branch/HEAD/worktree state, and baseline evidence. T09 records
fresh final-tree test, build, launch-check, diff, browser, package-integrity and
independent-audit evidence separately so baseline and result evidence are not
conflated.

The T10–T14 candidate adds focused RED/GREEN contracts for product comparison,
  staged checklist content, scoped local fees/centre routes, strict calendar-day
  planning and versioned shared state. Its independently reviewed M2-A matrix was
83 generated HTML pages, 36 sitemap URLs, 47 noindex pages and 14 ad-enabled pages. The
implementation remains uncommitted and not deployed. T15–T18 are locally
completed after the M2-B review and final serial gates; T19 remains partial,
because real calendar-client import is unauthorized and `not_tested`. The final M2-A command evidence and same-Auditor `PASS` are recorded
in `docs/VISALANG_M2A_T10_T14_EXECUTION_EVIDENCE_2026-09-09.md` and the audit
record under `.superpowers/sdd/VisaLang-Master-Plan/`. They must not be treated
as release or owner approval.

The required Obsidian Vault root and template do not exist on this machine, so
formal sync remains blocked. The repository payload is a review handoff, not a
claim that a Vault record was created.

The M2-B evidence is recorded in
`docs/VISALANG_M2B_T15_T19_EXECUTION_EVIDENCE_2026-09-10.md`, and the exact
candidate received a separate VisaLang Independent Auditor `PASS`. T15–T18 are
therefore locally complete at the implementation-review gate. T19's
implementation review and file/download validation are closed, but its real
calendar-client import remains `blocked/not_tested`; it is not fully verified.

The exact frozen M3 candidate received the same Independent Auditor's round-3
`PASS` with no P0/P1/P2 findings, so T20–T22 are locally complete at the
implementation-review gate. T20's five Chinese tool routes and eight-to-five
reconciliation retain three absorbed task modules; T21's normalized
four-purpose/three-facet discovery and 31-record exam directory separate two
supported products from 29 reference-only records. T22's source-generated/
local-preview evidence records 88 generated pages, 41 sitemap URLs, 47 noindex
pages, 14 ad-eligible pages and 11 genuine reciprocal hreflang pairs, while
production HTTP is `not_observed`. T23 remains `evidence_map_only` / `blocked`;
its record grants no migration authority.

## 2026-09-13 — M3 closeout and M4 T24–T26

The user approved the proposed local M3 closeout and T24–T26 sequence with
“好的，同意”. Before source edits, fresh M3 full/focused tests, independent build
(88 pages), planning governance and diff check passed; launch-check remained
59 PASS / 0 FAIL / 1 T23 BLOCKED. The existing round-4 M3 audit binds sync07,
closing the stale pending successor wording in earlier records without
rewriting historical bound reports.

The branch/HEAD and upstream remain the baseline above, 0 ahead / 0 behind.
The exact 497-file beginning-of-window snapshot is preserved at
`.superpowers/sdd/2026-09-13-visalang-m4-t24-t26/baseline.tar.gz`
(SHA-256 `b23672d03c1e52a22b7ec02371b6ab5ab4de56a81185e323003b0a3bcab811db`;
`gzip -t` passed). This preserves prior dirty files; the full HEAD diff is not
misrepresented as this maintenance window.

| Task | Local task-review outcome | Evidence and boundary |
| --- | --- | --- |
| T24 / C09 | `completed` | Separate task review PASS after source/freshness fixes. Five B1 guides and hub expose scoped settlement and naturalisation paths with independent authority actions. |
| T25 / C10 | `completed` | Separate corrected task review PASS. Exact adult B1 products, shared localized comparator and booking/selection worksheets; A1 facts unchanged. The directory has four supported plus 27 reference entries. |
| T26 / C11–C12 first assets | `completed` | Separate AI editorial language/content review PASS, T24/T25 dependencies passed, actual keyboard and print validation passed. Exercises remain original/non-official, without scores or claimed human examiner credentials. |
| T27–T34 | `pending` | Next T27: minimal measurement and privacy consistency. No implementation in this window. |

Final whole-window acceptance is conditional on the separate
`docs/planning-map/VISALANG_M4_INDEPENDENT_AUDIT_2026-09-13.md` PASS bound to
`sync.json`; the implementing agent cannot declare its own review PASS.
Actual commands, browser receipts, print checks, corrections and limitations
are recorded in `docs/VISALANG_M4_T24_T26_EXECUTION_EVIDENCE_2026-09-13.md`.

The new separate read-only Auditor replaces the unavailable prior M3 session
and reviews only this M4 scope; it did not implement or research sources for
drafting. T19 stays partial with calendar-client import not_tested. T23 stays
evidence-map-only/blocked, including the launch gate. Formal Obsidian sync is
blocked because its prescribed root/template are absent;
`docs/VISALANG_M4_OBSIDIAN_SYNC_PAYLOAD_2026-09-13.md` is the local review
payload. No commit, push, deployment, publication, production request,
external-account action or URL migration occurred.


## 2026-09-16 — T27 local implementation candidate

T27 is `in_progress` at the local implementation boundary. The repository now
contains a pure `t27.v1` measurement contract for the five existing tools,
allowlisted finite enums, fail-closed validation, and source-level Privacy,
Cookie, Terms, and commercial-boundary consistency wording. No Analytics
collector, custom event sender, CMP implementation, account action, or
production data collection was added. The current Astro source has no
Analytics/fetch/XHR/beacon event transport; existing AdSense loader scope and
browser plan/ICS behavior remain separate and account/production unverified.

The focused test is `tests/t27-measurement-privacy.test.mjs`, registered in the
full suite. Detailed local evidence is
`docs/VISALANG_T27_EXECUTION_EVIDENCE_2026-09-16.md`. The exact changed-path
planning sync and a separate read-only VisaLang Auditor review remain required
before treating this as an independently reviewed local task. T23 remains
blocked and T19 remains partial with calendar-client import `blocked/not_tested`.
Release status remains `not_deployed`; no commit, push, deployment, or external
account action occurred.

## 2026-09-20 — T27 independent closeout

Fresh Auditor replaces two unavailable report-less attempts (reason/baseline in `docs/t27-closeout-evidence-2026-09-20/review-submission.md`). Initial complete-scope audit found one P2: missing T27 Task Log/sync entry. Corrected before refreshed submission. T27 remains in_progress until the formal closeout report PASS and post-report gates; no real data obtained, transport none. Current sync VL-PMAP-20260920-01, aligned. No source behavior or route/index/ads decision changed. T19 import remains not_tested; T23 blocked; T28 follows only after T27 acceptance.

## 2026-09-20 — T27 completed; T28 local technical acceptance

T27 completed after formal closeout Auditor round-3 PASS and post-report focused/npm test/build/planning governance/diff exit 0; launch-check retained only T23 blocked. Exact accepted sync and evidence archived under docs/t28-evidence-2026-09-20/t27-accepted-planning-map and t27-postaudit. No collector and no real data.

T28 remains in_progress: double-language five-tool local chain, 375/390/768 viewport operations, actual clipboard/download/ICS bytes, print PDFs and state recovery recorded. Fixed one P2 shared stale-result defect; six bilingual regression cases pass. Main 50 pass / 2 native-arrow keyboard automation failures; supplemental English Finder keyboard flow passes. Chinese full dropdown keyboard operation, real users/devices, calendar import and delivery remain not_tested. Full report docs/VISALANG_T28_LOCAL_ACCEPTANCE_2026-09-20.md. No broad T29 repair justified by current findings; retain T29 for later confirmed defects and regression consolidation. Current sync VL-PMAP-20260920-02, aligned; final independent report is docs/planning-map/VISALANG_T28_INDEPENDENT_AUDIT_2026-09-20.md. T19 partial/T23 blocked/Vault blocked and all release boundaries preserved.


## 2026-09-22 — Owner-authorized Laya advisory purpose integration

Owner explicitly requested “要接入正式的流程” and selected “独立服务器或容器（推荐，可先完成实现）” in the current Codex task. Locatable decision and exact design: `docs/superpowers/plans/2026-09-22-laya-purpose-integration.md`. This is an approved scope extension: optional bilingual text-to-purpose suggestion, explicit user confirmation, existing deterministic resolver, independent resident Python service. No classifier output is an immigration/exam decision. Initial MCP accuracy was 5/10 and is not a reliability guarantee; new configuration accuracy remains unestablished.

Local source integration and verification are submitted under sync VL-PMAP-20260922-01, approved-deviation. Independent review remains governed by `docs/planning-map/VISALANG_LAYA_INDEPENDENT_AUDIT_2026-09-22.md`; only its recorded PASS closes source review. T19 partial, T23 blocked, T28 in_progress and T29 pending remain unchanged. Production service provisioning, Docker image build/target sizing, Nginx validation, account-side prerequisites and deployment remain unverified/not_started. No commit/push/deployment is authorized by this implementation request.


## 2026-09-22 local website/Laya/ads candidate

Owner authorized local code/document implementation and preservation of original URLs. Exact plan: `docs/superpowers/plans/2026-09-22-production-candidate.md`. Baseline, 17 retained source/route decisions, model results, browser/keyboard verification and deployment-tool tests: `docs/release-candidate-evidence-2026-09-22/acceptance.md`. T23 local source/config inconsistency repaired; production HTTP remains inconclusive. T28/T29/T30 partial, T31–T34 pending. Real model matches 11/20; Mac RSS 4.14 GB is a capacity warning, not a Linux result. Calendar import and configured Vault sync remain blocked.

Planning sync `VL-PMAP-20260922-02`, `approved-deviation` under the cited Owner scope; classified candidate paths and byte evidence live in sync.json. Independent verdict authority: `docs/planning-map/VISALANG_PRODUCTION_CANDIDATE_INDEPENDENT_AUDIT_2026-09-22.md`. Final full-suite/governance commands follow the immutable audit record; no verdict is self-issued here. Website + Laya + ads remain a joint release condition. No purchase, commit, push, server/DNS/account change or deployment performed.
