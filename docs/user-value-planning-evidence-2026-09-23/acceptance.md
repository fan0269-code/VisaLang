# User-value-first planning maintenance — 2026-09-23

Scope: implement the Owner-approved planning revision, not the future product work described by it. Sync ID `VL-PMAP-20260923-02`; deployment `not_started`; no commit, push, purchase, recruitment or external account action.

## Authorization and behavior

Owner: “PLEASE IMPLEMENT THIS PLAN”, including “取消网站、Laya、广告必须同时上线的规划约束；实际发布仍须分别验收并取得授权”. Locatable full decision and bounds: overall plan §1. This supersedes the September 22 mandatory joint-release planning order. It does not make the currently coupled scripts fit for independent core deployment.

Added LP00 real-reader task validation; LP04 excludes LC02/03; LP05a/b and LP06-core/laya/ads separate prerequisites. Core decoupling/configuration/build/check/deploy/rollback is future pending work. Laya benefit and full quality/capacity gates remain; ads has its own evidence; B1 deepening requires independent demand while routine maintenance continues. Original T states are 25 completed / 5 in_progress / 4 pending, LP/LC all pending. Two-week decisions replace fixed model allocation and automatic B1 weekly expansion.

## Verification

- `archify-validate.json`: final candidate showcase 9/9, no errors/warnings. `archify-deliver.json`: atomic delivery, source/artifact SHA-256 and bytes.
- Browser first attempt failed with Chrome SIGABRT in sandbox, preserved in `browser-initial-failure.json`. Same supported command succeeded in the approved browser-capable context. Canonical browser receipt binds final HTML; all 1440×900, 1600×1000, 1920×1080, 2048×1320 containment checks pass.
- Root inspected each of four exact endpoint-size/theme PNGs. `docs/planning-map/visual-review.json` binds screenshots, browser receipt and HTML independently from automated checks; visual status passed, no post-delivery correction.
- `scenario-checks.json`: 12 nodes, core path without Laya/ads prerequisites, B1 demand gate, common audit-before-Owner workflow; protected implementation bytes unchanged. These are planning checks, not production scenario results.
- Initial `preaudit-npm-test.txt` failed because this edit accidentally omitted CONTENT_MAP's historical ledger tail; the exact archived bytes were restored from this window's snapshot. `preaudit-npm-test-after-fix.txt` then passed all functional/site assertions and reached governance, which rejected the diagram title missing “规划”; corrected in the final candidate. Neither interim full-suite run is claimed as PASS. Final governance/full-suite checks run after receipt freezing and independent review; their fresh outputs accompany the Auditor/final handoff.
- `git diff --check`: required before freeze. Launch-check is not rerun in this planning-only window: no routes, navigation, metadata or deployment-facing code changed. Previous launch results remain historical.

## Baseline, preservation and layout decisions

`baseline.json` records 947 pre-window files, current branch/HEAD/upstream and hashes; `baseline-status.txt` records the dirty checkout. No worktree/HEAD-only copy was used because it would omit the existing uncommitted candidate. `before/` preserves every maintained document and prior planning-map file, including previous audit/receipts/screenshots. Prior evidence directories and historical audits are not rewritten.

The common governance lane is an independent control workflow applying to every maintenance/release candidate; a reader action is not its causal trigger. A redundant connector between the reader task and that lane was removed; the visible lane label/cards retain the common requirement. Automatic layout and short labels are used; the audit node moved to the next column to satisfy direct clearance. No renderer/test policy was modified and no hand-edited HTML is used.

The source date/reference table is carried from the previous planning window, explicitly labeled as such. No new legal/exam/fee assertion, live model experiment, user study, search/ads metric or production result is claimed.

## Remaining boundaries

Independent verdict authority: `docs/planning-map/VISALANG_USER_VALUE_PLANNING_INDEPENDENT_AUDIT_2026-09-23.md`; implementation agents do not self-approve. Complete sync bytes and exact candidate paths must be bound by that report. Vault's configured root/template are absent; local `vault-review.md` is an unsynced payload. Planning authorization is granted, but production/financial/account decisions remain pending.
