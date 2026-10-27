# T27 closeout → T28 local technical acceptance — 2026-09-20

## Authority and baseline

Read AGENTS.md, Master Package, latest BACKLOG_STATUS_OVERLAY, EXECUTION_RECORD and planning-map/sync.json from the actual working tree. Branch remains `codex/scheme-3-one-week-content`, HEAD `4cb57e8744c752fed1881281e69e7b24cc7281c4`, upstream 0/0. Historic dirty files preserved; no reset/clean/checkout/commit/push/deploy. T27 baseline hashes and inventory: `docs/t27-closeout-evidence-2026-09-20/`; T28 inventory: `docs/t28-evidence-2026-09-20/baseline-git.txt`. Full HEAD diff is not this window's delta.

## T27 formally accepted before T28

Replacement Auditor reviewed complete T27 candidate because two former review attempts had produced no report and no recoverable live session existed. Initial FAIL found a missing Task Log sync entry (P2); corrected. The same Auditor's closeout round-3 PASS binds the exact final T27 sync (archived under `docs/t28-evidence-2026-09-20/t27-accepted-planning-map/`). Post-report focused/npm test/build/governance/diff all exit 0; launch-check exit 1 with 59 PASS / 0 FAIL / 1 existing T23 BLOCKED. Actual output: `docs/t28-evidence-2026-09-20/t27-postaudit/`. Only then T27 became completed and T28 began. Transport remains none; real measurement data not obtained.

## T28 scope and actual evidence

Environment: installed Google Chrome 153.0.8010.48 headless on macOS, Playwright, `http://127.0.0.1:4321`; desktop 1440×900 and emulated widths 375/390/768, height 900. Browser plugin absent; regular Playwright from the bundled runtime used. Sandbox initially rejected loopback listen and Chrome launch; same local-only operations succeeded with approved execution permissions. No external account touched; browser checks intercept external requests.

Full per-scenario preconditions/actions/expected/actual/evidence: `docs/t28-evidence-2026-09-20/SCENARIO_MATRIX.md` plus raw JSON and scripts. Main run: 50 pass and 2 native-arrow keyboard automation failures. Supplement: 6 state/failure recovery checks pass; 6 bilingual stale-result regression cases pass after a red run; English Finder keyboard character-selection flow passes; Chinese Tab traversal observed. These are bounded technical observations, not user task completion statistics.

- Real visible links: EN/ZH home → A1 route → Finder → comparison → checklist → timeline → reminder.
- Normal/missing/negative input, unsupported country/route, incomplete relationship and existing certificate branches; A1/B1, same-product and mixed-level comparison boundaries.
- Same-tab inherited route, checkbox refresh, target-date refresh, schema/rule/claim mismatch, malformed storage, expired device copy, explicit save/restore/clear.
- Real clipboard readback equals actual checklist download bytes; deliberately denied clipboard exposes manual fallback. ICS download event saved actual CRLF calendar bytes, all-day start and exclusive next-day end checked; no import or notification inferred.
- Print handler events plus actual five-page PDFs in both languages, all ten pages rendered/inspected. Physical printing not tested.
- All 30 mobile viewport tool operations pass page-width containment; selected screenshots inspected separately. Ten tool pages have meaningful titles/content, no framework overlay and no uncaught app errors. Console network errors are intercepted `https://visalang.org/favicon.svg` requests (exact requestfailed URLs recorded), not unexplained script exceptions.

## Defect and correction

T28-01 (P2): Finder, Comparison and Checklist retained an old result after clearing a required field and submitting, in both languages. Shared `setupToolForm` now hides result surfaces on field input/change and failed validation. It does not change facts, formulas, persistence schema or external behavior. `tests/t28-stale-results.test.mjs` records six actual browser hide/focus/recovery assertions: red exit 1, green exit 0. The full five-tool browser run followed this fix. Findings ledger: `docs/t28-evidence-2026-09-20/FINDINGS.md`. No larger confirmed defect requiring broad repair was found; T29 remains the next remediation/consolidation task for subsequent confirmed defects.

## Explicit not_tested and status

T28 stays **in_progress**, not fully completed. No real participants or five-user study; no physical iOS/Android device; no Safari/Firefox/Edge or screen-reader testing; no real calendar import/duplicate import/device notification/email delivery; no physical printer/OS print dialog; no production verification. English Finder keyboard flow is evidenced, but Chinese native-dropdown keyboard-only selection is not_tested because this headless automation did not successfully exercise it. T19 import remains partial/not_tested. T23 migration remains blocked/evidence_map_only.

## Final gates and governance

Actual commands and exit codes are in `docs/t28-evidence-2026-09-20/preaudit/command-results.json`; post-report final outputs will be retained separately without mutating reviewed candidate bytes. The final Auditor report governs review outcome; no implementing-agent self-approval. Current planning sync `VL-PMAP-20260920-02`, drift aligned: approved local T28 acceptance and minimal demonstrated fix; incomplete coverage honestly retained. Archify validation/atomic delivery/browser/perceptual receipts and complete bytes are in the frozen manifest. Review target: `docs/planning-map/VISALANG_T28_INDEPENDENT_AUDIT_2026-09-20.md`.

## Vault and next step

Configured Obsidian directory and template remain absent (both existence checks exit 1). `docs/VISALANG_T28_OBSIDIAN_SYNC_PAYLOAD_2026-09-20.md` is local review payload only; formal Vault sync blocked. Next: finish the explicitly untested T28 coverage when appropriate environment/authorization is available; use T29 for confirmed findings and focused regression before any T30 release candidate. No commit/push/deploy, URL migration, account login, user recruitment or message sending occurred.
