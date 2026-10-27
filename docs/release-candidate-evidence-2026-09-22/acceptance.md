# Local production-source candidate — 2026-09-22

Scope: the Owner-authorized local implementation under `docs/superpowers/plans/2026-09-22-production-candidate.md`. **Not deployed, no purchase, no commit/push, no DNS or account mutation.** A source candidate is not a built Docker image or an approved production release. Current independent verdict is solely `docs/planning-map/VISALANG_PRODUCTION_CANDIDATE_INDEPENDENT_AUDIT_2026-09-22.md`; this document never self-approves the implementation.

## Baseline and URL decisions

Branch `codex/scheme-3-one-week-content`, HEAD `4cb57e8744c752fed1881281e69e7b24cc7281c4`, with pre-existing dirty work preserved. `baseline.json` and `baseline-status.txt` record original bytes/state; full pre-window files are at `/tmp/visalang-release-baseline-20260922/`. `candidate-manifest.json` and `task-delta.patch` distinguish this window from that existing work. The temporary copy is a local recovery aid, not a durable production backup; copy it to an approved durable backup before cleanup. No assertion that HEAD alone reproduces this candidate.

All 17 historical guide paths now retain maintained source pages (14 EN, 3 ZH), self-canonical, noindex/follow, outside sitemap, ads off. Current decision: `deploy/retained-routes.json`; official authority ledger: `retained-source-ledger.json`. Historical merge and Git-blob evidence remain intact in `guideRedirectCandidates` and the September 11 migration record; active candidate redirects are zero. Existing HTML compatibility redirects are preserved. No bulk approval of old migration proposals was used.

`live-url-observations.json` records public read-only GETs: 16 HTTP 403 and one timeout. This cannot establish old-site index/canonical/redirect behavior, so production T23 remains open. The local route/source/config/check-program inconsistency has been repaired. Local output has 105 HTML pages, 41 sitemap URLs, 64 noindex pages and 14 ad-enabled pages; supporting restorations do not expand the advertising allowlist.

## Verification evidence and limits

- `launch-check.txt`: generated-site route/metadata/link/schema checks. Local candidate success does not waive production evidence.
- `python-tests.txt`: 7 Laya service tests, including content-free counters and existing error/busy contracts.
- `deploy-tests.txt`: 9 tests covering release manifest, operation/baseline/evidence bindings, transaction ordering, exact HTTP 200 probes and mocked failure restoration. This is not a real Docker/Nginx rollback rehearsal.
- `pre-audit-npm-test.txt`: regression run before final planning/audit freeze; the tail reaches only the then-missing independent audit record. Final full-suite and governance checks run after the Auditor binds sync; their actual command results belong to the final handoff, not fabricated PASS entries here.
- `browser-results.json` / `browser-run.txt`: 15 successful isolated Chrome checks; one headless native-select observation inconclusive. Real model call forwarded by the browser test to localhost8012; failure cases deliberately stubbed. This is not production same-origin proxy proof. The static fixture isolates tests from development HMR.
- `keyboard-native-zh.md`: subsequent actual macOS in-app-browser keyboard-only choice/submit flow passes. Other devices/browsers and real-user interviews remain untested.
- Six browser screenshots were refreshed from the final built pages after the authority-label correction and inspected by an image-capable reviewer. Screenshot byte hashes and bounded visual findings are in browser-visual-review.json.
- `calendar-import.md`: native Calendar offered account-backed destinations, no verified disposable local calendar. Actual import was not performed; T19 remains partial. No account/calendar event was created.
- `laya-comparison.md`: frozen expected answers before real inference; **11/20 correct**, all 20 HTTP 200. Normal 8/10, negation 2/4, ambiguous 0/4, boundary 1/2. Original failure evidence retained. Quality must improve and be tested on an independent holdout before launch.
- Real Mac process peak RSS **4,140,924,928 bytes**. No Linux cold-start/load/cgroup/OOM result exists. The configured 3 GB container allocation is unvalidated; a 4 GB host is not proven sufficient.

## Release implementation and remaining gates

The bundle tool verifies exact file bytes, immutable image digest, pinned offline model, explicit committed candidate state and bound evidence. Deployment and rollback use one configuration/service/site transaction. Failure injection verifies restoration dispatch; host crashes and real infrastructure remain operational acceptance work. The Dockerfile requires an explicit pinned Python base; Linux amd64 Python3.13 CPU wheel dependencies have hashes. No Docker daemon was running during this window; no actual image was built. Operator must bind image provenance/package inventory to reviewed source before production.

Unresolved production requirements: server selection and authorized purchase within CNY100/month including tax/IPv4/backups; real image and clean audited commit; model quality; target-host capacity and restart/busy/parallel-static tests; exact ads account/CMP/ads.txt and actual consent/loading behavior; pre-DNS domain/TLS/API/17-path checks; full rollback rehearsal, old-site/DNS backup; explicit release authorization. Website + Laya + advertising must launch together. No fallback to an unapproved ad-free launch.

## T32–T34 operating handoff

At actual cutover record the timestamp, release manifest, previous manifest and rollback evidence. Schedule 24-hour and day-7 checks then: core EN/ZH pages, all 17 paths, same-origin API, consent/ads behavior, model RSS/errors/latency, static availability and bill trend. Core/TLS failures or sustained inference faults trigger the explicitly approved complete rollback; restore DNS when required by that runbook. No future observations have been recorded as done.

T32: use the source ledger due dates; prioritize booking, fees and policy changes; update checked dates only after reading the competent source. T33: request available Search Console/feedback/runtime aggregates and distinguish definitions from captured data; select at most three improvements. T34: prioritize German A1/B1, tool completion and Laya misclassification, then decide a sustainable next-quarter scope. Do not automatically expand countries, membership, payments or chatbot scope.

Vault: configured `/Users/fanlw/Documents/Website-Content-Hub/` and template unavailable. `vault-review.md` is an unsynced payload, not a completed Vault write. Planning map sync: `VL-PMAP-20260922-02`, approved deviation bound to the Owner's local implementation and URL-retention decisions. Review/deployment authority remains separate.

## Independent-review correction

The Auditor identified that `curl --fail` alone accepts HTTP redirects, allowing retained-path smoke checks to pass incorrectly. Host probes now require exact HTTP 200 for each core/retained route without following redirects. A focused test first failed against the original code (`deploy-smoke-red.txt`), then passed for rejecting 301/302/204/404 and accepting 200 (`deploy-tests.txt`). Full host rehearsal remains unperformed.
