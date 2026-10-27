# Laya integration — local source acceptance evidence

Date: 2026-09-22. Scope: optional bilingual Route Finder purpose suggestions, independent offline Python service and deployment configuration. Source-readiness only; no production rollout, commit, push or external account action.

Owner design/authorization: `docs/superpowers/plans/2026-09-22-laya-purpose-integration.md`. Baseline: `codex/scheme-3-one-week-content @ 4cb57e8744c752fed1881281e69e7b24cc7281c4`, upstream same branch, ahead/behind 0/0, no staged entries; extensive pre-existing dirty/untracked files are inventoried in `baseline-status.txt`. Only this task's increments belong to review; see `task-delta.patch`, `candidate-manifest.json` and planning sync classified paths. No unrelated working-tree change is to be reverted or attributed to this task.

## Implemented behavior

- Optional description in both English and Chinese Finder. Explicit notice before sending; no request while typing.
- POST to same-origin `/api/purpose-suggestion/`; fixed input schema, bounded body/text, no request-text persistence or generic prompt API. The browser never calls Codex MCP.
- Only clicking confirm updates purpose, dispatches the existing change event, clears the description and invalidates prior route results. Country and existing evidence rules remain separate.
- Input edits, manual changes, reset and submit discard pending suggestions. Invalid result/HTTP failure/12-second timeout fall back to manual use. JavaScript-disabled users retain the existing tool fallback; the optional panel starts hidden.
- Resident multilingual Laya, one worker and one inference in flight, fail-fast concurrency, offline startup, no-store responses, generic errors. An aborted client does not terminate an already-running model operation.
- Nginx snippet documents rate limiting and private upstream; container configuration uses a non-root user and read-only-compatible runtime. The main static deploy script deliberately does not imply service provisioning.

## Actual verification

| Check | Outcome | Evidence |
|---|---|---|
| Python ASGI contract suite | 6 tests passed | `python-tests.txt` |
| Node response/confirmation contract | Passed | `node-tests.txt` |
| Real model HTTP + browser | One synthetic master-study input returned university; no automatic selection | `real-model-smoke.json`, `browser-results.json` |
| Browser interactions | 10 cases passed plus identity/viewport/page-error checks | `browser-scenarios.mjs`, `browser-results.json` |
| Perceptual UI check | Three exact screenshots inspected, readable at 1440px desktop and 390px mobile | `visual-review.json` and PNGs |
| Build and launch-check | Build passed; 59 pass / 0 fail / 1 existing T23 block | `launch-check.txt` |
| Full npm test before fresh governance sync | Reached only stale planning receipt gate; final rerun follows independent report | `preaudit-npm-test.txt` |
| Container/Nginx runtime | Not verified: Docker daemon unavailable, Nginx executable absent | No successful build/reload claimed |

Browser plugin not available; used bundled Playwright with local Chrome. Rendered tests used a real model for the first case and explicit test-only intercepted responses for deterministic error/state scenarios. No production mock behavior exists. No raw real-user data was used. Initial failed browser pass exposed missing endpoint trailing slash; fixed consistently in client, service, proxy and tests. The first concurrent full-suite/build attempt raced over Astro generated cache; later build/suite commands were sequenced.

Integration correctness does not establish classification accuracy. Initial prior MCP test was 5/10; the service's renamed labels are not claimed to improve this. There is no confidence-based auto-action. User confirmation is mandatory, not proof that the model is correct.

## Release and governance boundaries

Sync VL-PMAP-20260922-01 is an Owner-approved scope extension (`approved-deviation`). Existing T19 partial, T23 blocked, T28 in_progress and T29 pending states remain. Route URLs, index/sitemap/ads eligibility and immigration source claims are unchanged; optional data processing is accurately disclosed on the privacy page. No new high-risk factual ledger is needed because no visa/exam fact is added or changed.

The final independent review authority is `docs/planning-map/VISALANG_LAYA_INDEPENDENT_AUDIT_2026-09-22.md`; this report does not self-approve the implementation. Final post-audit governance/npm results are run and reported in the task without mutating frozen evidence bytes. A local PASS does not override the existing T23 launch block.

Before live use: provision/pin target model cache and container image; test target memory/latency/load, Nginx configuration, TLS/private upstream, rate limits and infrastructure logging; choose an authorized release and rollback target. No server address, target release, runtime provisioning or deployment authorization was supplied.

Vault sync blocked: required `/Users/fanlw/Documents/Website-Content-Hub/` and template are absent. Prepared `vault-review.md` preserves review/pending/not_started states; it is not claimed to be a Vault write.
