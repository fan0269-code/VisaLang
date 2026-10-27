# VisaLang M2-B T15–T19 execution evidence

Window opened: 2026-09-10 (Asia/Shanghai)  
Evidence updated: 2026-09-11 (Asia/Shanghai)  
Branch: `codex/scheme-3-one-week-content`  
Baseline commit: `4cb57e8744c752fed1881281e69e7b24cc7281c4`  
Upstream: `origin/codex/scheme-3-one-week-content` (`0` ahead / `0` behind at freeze)  
Result commit: unavailable — the candidate is intentionally uncommitted  
Deployment: `not_started`  
Owner decision: `pending`
Independent review: round-2 `PASS`, no remaining P0/P1/P2; successor status receipt pending re-review

This is local implementation and verification evidence. It does not authorize a
commit, push, deployment, publication, external-account change, authority
contact, or calendar-client import. VisaLang remains a verification navigator;
the receiving authority, exam owner, and selected official or authorised centre
retain their own decision boundaries.

## Baseline, preservation, and frozen scope

- Initial staged paths: none.
- The checkout was materially dirty, including unrelated modified, deleted,
  and untracked files. Those paths were preserved. No reset, clean, branch
  switch, worktree, checkout restoration, staging, or commit was performed.
- The initial backlog SHA-256 was
  `26fbc283498a2ec60b54f84bedee0c6ca2daaca3e670d74d032ec9c9a6533982`.
  The final hash must match this value byte-for-byte.
- The initial inventory and dependency rulings are retained in
  `.superpowers/sdd/2026-09-09-visalang-m2b-t15-t19/progress.md`.

The 36 frozen candidate paths are enumerated in that ledger and must exactly
match docs/planning-map/sync.json scope.changedPaths and the Independent
Auditor's frozen scope. The Auditor's own report is its only permitted output
and is deliberately outside the submitted candidate list.

## Task acceptance matrix

| Task | Implemented | Automated evidence | Browser evidence | Remaining boundary |
| --- | --- | --- | --- | --- |
| T15 Route Finder | yes | focused suite PASS; four statuses and five scenarios retained; irrelevant unsupported-branch questions fail closed | desktop / 390 / 768 supported and unsupported journeys PASS; result focus and route-to-checklist handoff observed | stale-version forced-reconfirmation browser branch not naturally reachable; automated_verified only |
| T16 Checklist | yes | focused suite PASS; stable IDs, route clearing/restoration, serialization, count, sources, scope, date, fallback and print CSS contracts | desktop / 390 / 768 configured and unsupported transitions PASS; copy success and reload/reset observed; real Chrome print preview rendered six populated pages | blocked-Clipboard fallback not naturally observed without changing browser permissions; not_tested |
| T17 Exam Comparison | yes | focused suite PASS; product facts, same/unsupported states, practice links and local unknown-action boundaries | desktop / 390 / 768 ready and same-product states PASS; result focus, keyboard order and contained horizontal table scroll observed | unsupported stale product cannot be selected through the allowlisted UI; automated_verified only |
| T18 Timeline | yes | focused suite PASS; D/W/P/R, both formulae, invalid, past, zero, cross-year, leap-day and positive/negative timezone cases | desktop / 390 / 768 future, past, zero and required-field-invalid states PASS with result/input focus | cross-year, leap-day and both timezone extremes are automated_verified rather than separately observed in the UI |
| T19 Reminder / ICS | generator and browser download implemented | focused RFC 5545 suite PASS | desktop / 390 / 768 valid and invalid form states PASS; actual Chrome download and byte comparison PASS | real calendar-client import is blocked/not_tested pending separate explicit authorization; T19 is not fully verified |

## Focused RED → GREEN chronology

- T15 RED: node tests/m2b-route-finder.test.mjs failed because
  getRouteFinderQuestionRelevance was absent. GREEN: the focused suite passed
  after adding a fail-closed relevance contract and page wiring.
- T17 practice-link RED: node tests/m2b-exam-comparison.test.mjs failed because
  telc practice navigation duplicated the product page rather than the official
  mock-exam PDF. GREEN: both user-visible practice links and the exact telc PDF
  destination passed.
- T19 RED: the route lacked a bounded trusted reminder source and accepted an
  arbitrary optional HTTPS source. GREEN: only a configured route with its
  exact Federal Foreign Office verification entry can generate the event.
- Browser acceptance found a T17 whole-page overflow at 390 CSS px. RED: the
  focused containment assertion failed before grid items could shrink. GREEN:
  min-width: 0 on shared tool grid items passed, and the rebuilt browser
  measured document scroll width 375 at a 390 viewport while the 680 px table
  remained inside a 301 px overflow-x:auto wrapper.
- Browser acceptance found a T16 configured-to-unsupported action leak. RED:
  the focused lifecycle helper did not exist. The first helper-only regression
  received an independent P1 because it did not bind production wiring. The
  corrected GREEN test builds and parses the real page, exercises
  configured → unsupported → configured, and guards the reset/restore call
  order. The same reviewer then returned PASS with no remaining P0/P1/P2.

Exact RED output and task-local self-review are preserved in
.superpowers/sdd/2026-09-09-visalang-m2b-t15-t19/task-1-report.md,
task-3-report.md, task-5-report.md, and the controller transcript. Separate
read-only task reviews returned PASS for T15, T17, T19 and the two
browser-discovered corrections.

## Browser acceptance evidence

The Unified Computer Use session exercised the built site at desktop
1440×900, exact 390×844, and exact 768×1024 viewports. Screenshots were
visually inspected during the run. Across the observed states, page-level
horizontal overflow was false after the T17 correction, result focus moved to
the relevant result region, and native required-field failures focused the
invalid control.

- Route Finder: guidance_available, needs_information,
  needs_authority_confirmation, and unsupported were observed across the
  desktop flow; the 390 and 768 checks repeated configured and unsupported
  branches. Unsupported branches hid and disabled irrelevant follow-up fields
  and removed their required state.
- Checklist: the configured route produced 12 stable checklist items. A checked
  item updated completion to 1/12 and [x] serialization; reload restored the
  route and item state; restart cleared checklist-owned state while retaining
  the shared route. Switching to Germany B1 produced zero items and, after the
  correction, hidden plus disabled take-away controls at all three sizes.
- Clipboard: automatic copy succeeded and displayed Checklist copied. A
  blocked-Clipboard fallback was not observed. An insecure-origin attempt did
  not reach a usable page, and browser permissions were not changed.
- Print: a real Chrome print preview was opened from the configured checklist.
  It reported a six-page PDF; all six pages contained ordered checklist
  material, with the five stage headings, generated date, scope, sources,
  boundaries and final completion line present. The preview was cancelled;
  no PDF was saved and no printer action occurred.
- Exam Comparison: the ready result contained nine independent fact rows,
  exact Goethe and telc official-practice links, and explicit local
  fee/booking/acceptance verification actions. Same-product state and first
  select → second select → submit keyboard order were observed. At 390 px the
  document no longer overflowed; the table alone remained horizontally
  scrollable.
- Timeline: future, past, zero-buffer and required-field-invalid states were
  observed. The output retained D − W − P and D − W − P − R wording and did not
  claim a seat, result, certificate or authority outcome.
- Reminder: empty required controls failed natively; a configured topic, date
  and route produced a focused ready result with an available Download ICS
  action and no page overflow.

Browser states not listed as observed above are recorded as not_tested, even
where a focused automated contract covers them.

## Actual ICS download and byte identity

Chrome downloaded /Users/a1-6/Downloads/visalang-reminder (1).ics from the
locally built Reminder tool. The existing older visalang-reminder.ics was not
overwritten or deleted.

- Browser-generated UTC timestamp: 2026-09-11T02:01:32.000Z.
- Actual bytes / generator bytes: 911 / 911.
- Actual SHA-256 / generator SHA-256:
  36c0f751d9c3b1ffa4917eaef5cddc353c7215a4970df69a85907075ffefe747
  for both.
- Buffer.equals result: true.
- UID:
  visalang-recheck-official-source-germany-family-reunion-a1-20261231@visalang.org.
- DTSTART / exclusive DTEND: 20261231 / 20270101.
- Embedded route source:
  https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682
- Separators: CRLF present; no bare LF.

The downloaded file was not opened or imported in Apple Calendar or any other
calendar client. Import, alert behavior and notification delivery remain
blocked/not_tested and must not be inferred from byte validity.

## Verification ledger

- Fresh pre-audit serial run on 2026-09-11 at 12:54-12:55 Asia/Shanghai:
  all five focused M2-B suites exited 0 in T15, T16, T17, T18, T19 order.
- `npm test`: every product, content, M2-A and M2-B assertion plus its embedded
  83-page production build and the complete site assertion tail passed before
  the now-last planning-map invocation. The command exited 1 only when that
  final governance entry reached line 420 and found that the separate audit
  record did not yet exist. This is the designed pre-audit gate described by
  `docs/planning-map/README.md`, not a product-test regression.
- `npm run build`: exit 0; 83 pages generated.
- `npm run launch-check`: exit 0; 57 PASS / 0 FAIL / `READY` after its own
  clean 83-page production build.
- Direct `node tests/planning-map-governance.test.mjs`: exit 1 only at the same
  line-420 missing-audit assertion; it passed every earlier digest, history,
  classified-scope, Archify, browser-evidence and perceptual-evidence check.
- `git diff --check`: exit 0 with no output.
- Audit remediation for the full-suite entry was RED then GREEN: the obsolete
  static-`required` probe failed against both conditional Route Finder fields;
  its replacement binds field presence and the production
  `getRouteFinderQuestionRelevance` show/enable/require wiring. A separate
  ordering probe failed while governance preceded the site assertion tail, then
  passed after governance became the true last invocation.
- Post-report serial run on 2026-09-11 at 12:59-13:01 Asia/Shanghai: all five
  focused suites, `npm test`, `npm run build`, `npm run launch-check`, direct
  planning-map governance and `git diff --check` exited 0. The full suite built
  83 pages; launch-check returned 57 PASS / 0 FAIL / `READY`; governance
  confirmed 179 watched files for `VL-PMAP-20260911-01`.

## Governance, Vault, and release boundary

Planning-map corrected successor sync `VL-PMAP-20260911-03` records `drift: aligned`, the exact
36-path classified candidate, watched-scope digest
`46f8f2b7a0ccf821a67d377e217c01be079f92e8e59bab676a559a0595281e83`,
source SHA-256
`82f249258a9a33a2ce63fbba05c3683d884fb9611df86fdf47d7f3f17b77fac6`,
and delivered HTML SHA-256
`c457c67447f51849aa8e3766629eafb8915e83562593c1f678c5a2f88112125c`.
Archify showcase validation passed 9/9 with no errors or warnings; automated
containment and image-capable inspection passed at the required light/dark
sizes. The browser receipt is bound at SHA-256
`6642491222f5ebca86541ccc20f5d510dcd7ecd00c239d6ffd254157814eabfd`,
and the perceptual review at
`974f54789d5945d3fb20c3e454530f667ec6418d322ba322e62472e3e5e98e5a`.
The successor audit target is
`docs/planning-map/VISALANG_M2B_INDEPENDENT_AUDIT_2026-09-11.md`.

The separate Auditor's round-2 report records `PASS` with `findings: []` and
binds the complete sync receipt at SHA-256
`bfb30b3f4246f2751c5b1baed3a00911b9e4c82ff98014e9966b3e26f7900ce3`.
Its own report SHA-256 is
`cfdf85db93a237f205a5293f85a650da2fa3489d741809ef1421c1cf55791aa2`.
T15–T18 are locally complete at the implementation-review gate. T19 has closed
generator/download and implementation-review evidence but remains partial
because calendar-client import is blocked/not_tested.

The configured Vault template and target directory under /Users/fanlw are not
present on this host. The repository Obsidian payload is therefore the
fail-closed review record. It must remain status: review,
needs_human_review: true, owner_decision: pending and
deployment_status: not_started.
