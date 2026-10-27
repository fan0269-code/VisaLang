---
agent: visalang-independent-auditor
reviewer_independent: true
review_round: 5
baseline: "codex/scheme-3-one-week-content @ 4cb57e8744c752fed1881281e69e7b24cc7281c4"
scope:
  - docs/master-package-2026-09-08/BACKLOG_STATUS_OVERLAY_2026-09-09.md
  - docs/master-package-2026-09-08/EXECUTION_RECORD.md
  - docs/planning-map/history.json
  - docs/planning-map/sync.json
  - docs/planning-map/visalang-overall-build-plan.archify.json
  - docs/planning-map/visalang-overall-build-plan.html
  - docs/planning-map/visalang-overall-build-plan.visual-check.1440x900.dark.png
  - docs/planning-map/visalang-overall-build-plan.visual-check.1440x900.light.png
  - docs/planning-map/visalang-overall-build-plan.visual-check.2048x1320.dark.png
  - docs/planning-map/visalang-overall-build-plan.visual-check.2048x1320.light.png
  - docs/planning-map/visalang-overall-build-plan.visual-check.html
  - docs/planning-map/visalang-overall-build-plan.visual-check.json
  - docs/planning-map/visual-review.json
  - docs/TASK_LOG.md
  - docs/VISALANG_M2B_T15_T19_EXECUTION_EVIDENCE_2026-09-10.md
  - docs/VISALANG_MASTER_PACKAGE_OBSIDIAN_SYNC_PAYLOAD_2026-09-09.md
  - src/components/tools/ToolResultSupport.astro
  - src/data/checklist-export.ts
  - src/data/claim-registry.ts
  - src/data/plan-state.ts
  - src/data/reminder-ics.ts
  - src/data/route-tools.ts
  - src/pages/tools/checklist-generator.astro
  - src/pages/tools/email-reminders.astro
  - src/pages/tools/exam-comparison.astro
  - src/pages/tools/route-finder.astro
  - src/pages/tools/timeline-calculator.astro
  - src/scripts/tool-form.ts
  - src/styles/global.css
  - tests/m2b-checklist-export.test.mjs
  - tests/m2b-exam-comparison.test.mjs
  - tests/m2b-reminder-ics.test.mjs
  - tests/m2b-route-finder.test.mjs
  - tests/m2b-timeline-result.test.mjs
  - tests/planning-map-governance.test.mjs
  - tests/site.test.js
agent_review_status: pass
overall_verdict: PASS
findings: []
owner_authorization: pending
deployment_status: not_started
vault_status: blocked
candidate_scope_digest: 46f8f2b7a0ccf821a67d377e217c01be079f92e8e59bab676a559a0595281e83
diagram_source_sha256: 82f249258a9a33a2ce63fbba05c3683d884fb9611df86fdf47d7f3f17b77fac6
diagram_artifact_sha256: c457c67447f51849aa8e3766629eafb8915e83562593c1f678c5a2f88112125c
sync_receipt_sha256: 41f6e9dd50c37b9d13129232cca46171d659bc7f82ef20dbcbbac37819ae6ec2
planning_drift_status: aligned
---

# VisaLang M2-B T15–T19 independent audit

## Overall verdict

PASS. I did not implement, source, plan, or repair the submitted M2-B scope.
On the corrected round-5 bytes, no scoped P0, P1, or P2 finding remains. The
36-path scope above exactly matches `scope.changedPaths` in planning-map sync
`VL-PMAP-20260911-03`.

The prior round-2 PASS closed the M2-B implementation review. Round 3 of the
status successor found two contradictory current-status statements and a
fail-open gap for candidate files outside the watched roots. The implementer
corrected the status authorities and added exact SHA-256 bindings for every
outside-watch candidate except cycle-breaking `sync.json`, which this report
binds in full. Round 4 found that the sync summary's visual correction count
did not match its bound perceptual-review receipt. The summary now records zero
visual correction rounds, matching the receipt. I re-read and rechecked each
correction in round 5.

## Task verdicts and source boundaries

- T15 Route Finder: PASS. The five acceptance scenarios map to the four
  governed states, and unsupported selections do not collect irrelevant
  follow-up answers. Current guidance is tied to exact claim/rule versions and
  never decides an exemption, accepted proof, or individual result.
- T16 Checklist: PASS. Stable IDs, route-state clearing/restoration,
  completion counts, `[x]`/`[ ]` export, scope/date/source output, selectable
  Clipboard fallback, and checklist-specific print structure are covered.
  Automatic copy succeeded in the browser; a naturally blocked Clipboard was
  not observed and remains `not_tested`. The real Chrome print preview showed
  six populated pages and was cancelled without saving or printing.
- T17 Exam Comparison: PASS. Goethe and telc retain independent, official
  product evidence and visible official-practice links. Local fee, booking,
  delivery, and receiving-authority acceptance remain explicit confirmation
  actions rather than inferred facts. Same-product and unsupported states fail
  closed; the narrow table scroll is contained.
- T18 Timeline: PASS. D/W/P/R, both calendar-day formulas, zero and invalid
  inputs, past-date attention, cross-year and leap-day arithmetic, and positive
  and negative timezone cases are covered. Calculated dates are not described
  as authority deadlines, seats, results, certificates, or outcome guarantees.
- T19 Reminder/ICS: PASS for the implementation and file/download boundary.
  The tested and browser-downloaded 911-byte file matched byte-for-byte at
  SHA-256
  `36c0f751d9c3b1ffa4917eaef5cddc353c7215a4970df69a85907075ffefe747`.
  It contains the VisaLang product identifier and the configured Federal
  Foreign Office verification URL, with stable UID, UTC DTSTAMP, all-day start,
  exclusive next-day end, CRLF, TEXT escaping, and 75-octet folding. No
  calendar-client import, alert, or notification delivery was tested; that
  sub-item remains `blocked/not_tested`, so T19 is not fully verified.

The Federal Foreign Office route page, the Goethe product/practice and exam
administration sources, and the telc product/mock-exam sources were reopened
independently. Their current official content supports only the bounded claims
recorded in the registry; local centre transactions and receiving-authority
decisions remain separate.

## Verification and governance evidence

The dated evidence report records the five focused suites passing in order, an
83-page production build, launch-check at 57 PASS / 0 FAIL / `READY`, and the
complete site assertion tail passing before the final expected pre-audit gate.
In round 5 I reran the five focused T15–T19 suites; each exited 0. Fresh direct
governance validated the scope, candidate-byte bindings and in-memory mutation
fixture, then exited 1 only because the existing round-2 report still carried
the older watched digest. Fresh Archify showcase validation passed 9/9 with no
errors or warnings, and `git diff --check` exited 0. After this report, the
controller must rerun governance and the complete serial repository gates
against the report-bearing tree; this verdict does not pre-claim those
post-report results.

The backlog CSV remains byte-identical at SHA-256
`26fbc283498a2ec60b54f84bedee0c6ca2daaca3e670d74d032ec9c9a6533982`.
All 36 paths are unique, sorted and classified. Fifteen candidate paths are
covered by the 179-file watched digest; 20 outside-watch candidates have exact
current byte bindings; `sync.json` is the sole cycle-breaking exception and is
bound by this report at SHA-256
`41f6e9dd50c37b9d13129232cca46171d659bc7f82ef20dbcbbac37819ae6ec2`.
The mutation fixture proves that changed Task Log bytes fail before the audit
gate.

The authority digest is
`580dedb98311adefdf367651de7ff0b1b75786a96166d613da2fa070f2581397`,
and the append-only history file is
`e9c67cd14f1989d0a0e9fc9262e441b93834198b181fdfd4cf56348a557b1eb3`.
The Archify source and HTML hashes match the front matter. The automated
browser receipt is
`6642491222f5ebca86541ccc20f5d510dcd7ecd00c239d6ffd254157814eabfd`,
the perceptual receipt is
`974f54789d5945d3fb20c3e454530f667ec6418d322ba322e62472e3e5e98e5a`,
and the contact sheet is
`985b00179edc354eb50e53f827f9e046ad640defca84a898276f3c8a14f0f3d1`.
Every receipt-bound screenshot hash and dimension matches. I inspected all four
1440×900 and 2048×1320 light/dark screenshots; the status, complete digest,
nodes, edges and cards are legible without clipping, masking or overlap.

The recorded `aligned` drift result is supported. The corrected authorities
consistently record T15–T18 as locally complete, T19 as partial/in progress,
and T20 as next. The candidate stays inside T15–T19, preserves dependency and
authority boundaries, and does not broaden release authorization.

Owner authorization and deployment evidence are separate from Agent review.
This PASS authorizes neither a commit nor a push, deployment, publication,
calendar import, external-account action, authority contact, legal conclusion,
or individual visa/exam outcome. Owner authorization remains pending,
deployment remains not started, and the unavailable Vault sync remains
blocked.
