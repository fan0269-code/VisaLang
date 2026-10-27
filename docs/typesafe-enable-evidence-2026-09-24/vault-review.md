---
title: TypeSafe server-side purpose suggestion enablement
date: 2026-09-24
branch: codex/scheme-3-one-week-content
baseline_commit: 4cb57e8744c752fed1881281e69e7b24cc7281c4
result_commit: 4cb57e8744c752fed1881281e69e7b24cc7281c4
status: review
needs_human_review: true
owner_decision: pending
deployment_status: not_started
vault_sync_status: blocked
---

# TypeSafe server-side purpose suggestion enablement

## Scope and changed files

The local Route Finder purpose suggestion now uses TypeSafe's server-side Choice API by default. A bounded seven-option mapping retains `unclear`, fixed public categories, fail-closed validation and explicit user confirmation. Release manifests can select TypeSafe while older manifests continue to resolve to Laya. User-facing English and Chinese text discloses TypeSafe AI, Inc., United States processing and the provider's published retention statement; manual route selection remains available.

Changed paths and their classifications are frozen in `docs/planning-map/sync.json` under `VL-PMAP-20260924-05`. The local API key is stored only in ignored `.env.local`, with mode 600; the credential is intentionally absent from this record.

## Planning basis

Owner explicitly authorized local TypeSafe enablement and one synthetic connectivity request in `docs/typesafe-enable-evidence-2026-09-24/owner-scope.md`. The whole-site map remains a derived status view; no Master Package task counts or dependency topology changed. Drift is `approved-deviation` for this local scope. No commit, push, production activation, or external account configuration was performed.

## External sources checked

- TypeSafe HTTP API: <https://docs.typesafe.ai/api>, checked 2026-09-24. Supports endpoint, Bearer authentication, Choice response and token usage shape; does not prove model accuracy or account terms.
- TypeSafe Choice: <https://docs.typesafe.ai/primitives/choice>, checked 2026-09-24. Supports finite-choice output fields; does not establish correct intent classification.
- TypeSafe Privacy Policy: <https://typesafe.ai/legal/privacy-policy>, checked 2026-09-24. States U.S. hosting and possible retention of personal data as reasonably necessary; does not verify account-specific settings or legal compliance.

## Actual verification

One synthetic request returned `university` with `requiresConfirmation: true` and 568 input tokens; see `live-smoke.json`. Service contract: 18 tests passed, including mocked slow phased/drip transport, TypeSafe cancellation after disconnect, chunked response parsing, provider-specific token boundaries, and Laya timeout/cancellation tests proving the single-inference lock remains held until its worker exits. Deployment bundle/rollback provider tests: 14 passed, including a missing previous TypeSafe key that stops before container mutation. Node public-contract/privacy disclosure test passed. `npm run launch-check` passed 57 checks with 0 failures and 0 blocks. Round 1 found three P2s; round 2 verified those fixes and found a fourth P2 in legacy Laya worker cancellation, fixed before round 3. Round 3 passed the code review; the subsequent governance run required the exact report path and drift value in the Task Log. That record correction is frozen for the same Auditor's next review. The first `npm test` included the 105-page Astro build and preceding suites, then stopped at the required review gate. The final full-suite and governance run follows the Auditor's review of the corrected seal.

## Risks and owner decision needed

Classification accuracy and reader benefit are unknown. TypeSafe receives text after the user explicitly requests a suggestion; users are told not to enter personal or immigration case details. The API key appeared in chat and should be rotated. Production deployment remains not_started and requires its own evidence review and explicit Owner authorization.

## Repository template availability

The configured Website Content Hub update-record directory and the required synchronization template were absent when checked. This local record preserves the required review fields; it has not been copied into the Vault.
