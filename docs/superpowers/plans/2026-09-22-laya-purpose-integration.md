# Laya purpose suggestion integration

**Goal:** Integrate an optional, confirmation-gated Laya purpose suggestion into the real bilingual Route Finder, with an independently deployable Python service.

**Authority / approved design:** The Owner requested “要接入正式的流程” after the suggestion → user confirmation → existing rules design was presented, and selected “独立服务器或容器（推荐，可先完成实现）” on 2026-09-22 in the current task. This authorizes implementation of a new advisory service and UI, not a live deployment, account change, commit or push. The existing Master Plan explicitly permits latest Owner instructions and bounded autonomous implementation (section 586 of the source at baseline). No new immigration/exam factual claims are introduced.

**Architecture:** Static Astro continues serving the pages. A same-origin POST endpoint is reverse-proxied by Nginx to one resident multilingual Laya worker in a separate Python/container service. It accepts only bounded text and returns one allowlisted purpose or clarification. Only a user's confirm click fills the existing select; the deterministic resolver still owns route output. The model does not infer country, credentials or eligibility. Both languages get equivalent UI; source text is not persisted in browser storage, query parameters or application logs.

**Tech stack:** Existing Astro/TypeScript; Python 3.13; Laya 0.3.5; Uvicorn 0.53.0; Nginx; optional Docker. No new frontend dependency.

## Implementation and acceptance

- [x] Implement `services/laya-purpose/app.py`, bounded POST schema, label mapping, no-store response, startup model load, single in-flight inference, malformed-output fallback; keep model-specific questions in `questions.json`.
- [x] Add pinned top-level requirements, non-root/read-only-compatible Dockerfile and Nginx snippet. Document offline cache provisioning, image/model pinning, private upstream, rate limit, request timeout, no body logging, real-host activation/rollback.
- [x] Add `PurposeSuggestion.astro` and `purpose-suggestion.ts`; integrate into both locale versions through shared Route Finder. Keep textarea unnamed; no automatic field mutation, result generation, navigation or persistence.
- [x] Update the privacy page to accurately describe optional transmission and transient processing, preserving infrastructure-log boundary.
- [x] Verify malformed/oversized input, unavailable model, unknown output, clarification and concurrent requests with Python contract tests. Verify allowlist and required confirmation with Node tests.
- [x] Verify real Laya through local HTTP and the rendered page; separately inject responses for deterministic browser recovery tests. Check pending edits, manually changed purpose, reset, timeout, HTTP error, unknown label, clarification, confirmation and existing route result invalidation.
- [x] Run npm test and launch-check. Record exact outcomes, distinguish model correctness from integration correctness, and keep Docker/production validation explicitly unverified if unavailable.
- [ ] Sync the planning map via Archify, inspect screenshot evidence, bind hashes and freeze exact task delta. Request a separate read-only VisaLang Independent Auditor; repair scoped P0/P1/P2 and use the same Auditor for re-review.
- [x] Create the required Vault review record, or report unavailable Vault path and retain a repository fallback payload. No production authorization is inferred.

## Review focus and rulings

1. A model can be confidently wrong: every suggestion still requires a user's explicit confirmation; no confidence threshold enables automatic routing.
2. A reply can arrive after the input/selection/reset has changed: version guard plus abort must discard it.
3. An unavailable API must never prevent manual selection or submitting existing valid fields.
4. Raw free text must never enter FormData/shared plan, URL, logging or analytics. The optional API necessarily transmits it; UI and privacy copy must state this.
5. The static website cannot invoke the developer's MCP. The deployable service and same-origin proxy are mandatory deployment prerequisites; local integration is not a live rollout.

Ruling: Keep the current dirty branch and preserve unrelated changes; record exact pre-turn bytes/hashes and task delta rather than creating a clean worktree that would omit the current implementation. No commit is authorized.

Ruling: The current Owner request extends the prior plan with an advisory Laya service. Record approved-deviation with this locatable Owner instruction, preserve existing T19/T23/T28/T29 task states, and do not claim release authorization.

Ruling: Current intent accuracy is inadequate for automatic decisions, but the authorized user-confirmed suggestion can be implemented without granting the model any route authority. Service/contract tests do not assert classifier accuracy.

Verification ledger: six Python service contract tests passed; Node contract assertions passed; ten rendered interaction cases passed plus page/viewport checks. Real Laya HTTP/browser integration returned university for the one recorded synthetic smoke. Initial parallel npm test/launch-check runs conflicted over Astro generated cache; sequential npm rerun reached only the pre-existing/stale planning-map receipt gate, to be rerun after this window sync. Build passes; launch-check is 59 pass / 0 fail / 1 existing T23 block. Docker daemon unavailable; Nginx executable absent. Vault template/path does not exist on this host. Browser plugin absent, so bundled Playwright/Chrome was used.
