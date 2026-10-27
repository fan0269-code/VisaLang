# W08 handoff — core, purpose suggestions and advertising switches

Status: `partial` for LP05a. Local candidate engineering is implemented and the six mode builds, launch checks and transaction unit tests passed. This handoff does not claim independent Auditor PASS or target-host acceptance.

## Implemented

- One v1 runtime contract: purpose suggestions `off | laya | typesafe`; advertising `off | on`. Both default to `off`. See `runtime-feature-contract.md` for the W09/W16 interface, six-mode table and old candidate compatibility/refusal rules.
- The core-only mode emits no purpose UI/client import/proxy route, Python/model/image/key prerequisite or ad loader. English and Chinese manual route selection, deterministic rules and local save/restore remain available.
- Laya keeps immutable image, exact model lock and local capacity gates. TypeSafe keeps the existing server-side key boundary, send-time disclosure, privacy and quota/price evidence gates; the Laya-local capacity receipt is N/A and no Laya weights are required. Provider errors retain manual choice.
- Feature settings flow through Astro build output, static pages, the release manifest, verification/evidence rules, generated Nginx, local body-free method probe and transaction start/restore logic. Ad-on remains limited to the existing English guide allowlist; home, tool and guide index stay ad-free.
- Git identity, dirty-candidate, source/input hashes, Owner approval, evidence-byte and rollback-baseline checks remain enforced. No Git metadata was fabricated in this snapshot.

## Verification

- Final mode matrix: all six serial `npm run build` and `node scripts/launch-check.js` runs passed; commands, exit codes and logs are in `final2-mode-matrix.json`.
- Deployment Python suite (23 tests), runtime feature contract, Laya purpose, deploy integration contract, EN/ZH route contracts, measurement privacy, publication, release-candidate, ad exposure and shell syntax passed. Raw outputs are in `logs/`. The first deploy-contract attempt failed one static wording assertion; the smoke-script comment was corrected and the rerun passed. Earlier first matrix launch checks exposed a build-time page-mode read issue; the page mode is now injected from the canonical config, and all final matrix runs pass.
- Browser evidence for both languages is in `browser-evidence.md`. It records local UI result/source observations and clearly limits request evidence to the static server log plus built DOM/bundle inspection; no HAR was captured. A synthetic local input is not a human or production test. Temporary browser plan data was cleared.
- No TypeSafe API request was made. No nginx binary is installed in this candidate environment, so no `nginx -t` was run. No `prepare`/`activate`/`rollback`, Docker operation, real host, TLS, DNS, backup or production evidence was exercised.

## Integration interface and W00 actions

Consume only `dist/runtime-features.json` and `release.json.features`; do not introduce another toggle. W00 should verify this handoff’s per-file base/candidate hashes against the allocated baseline, serially apply the patch to the current dirty main tree, resolve any overlapping changes by hunk, and rerun the six-mode matrix plus the full required checks there. Real Git identity and `release.py prepare` must be checked on the integrated main tree. Keep LP05a `partial` until actual target host, backup, TLS, retained-URL and rollback evidence plus the applicable Owner/Auditor gates are satisfied. Do not run a real rollback/deploy without the separately authorized production window.

## Out of scope / evidence gaps

- Actual TypeSafe account price, quota, privacy settings/contract and production quality/cost/latency are unverified; enablement remains gated on located evidence.
- Actual host, backup restore, TLS/Nginx load, 17 retained URL checks, DNS and real rollback remain untested.
- Snapshot has no `.git`; it cannot prove branch/HEAD/upstream/dirty identity or perform a production-valid `prepare` here.
- This module did not update the global planning map, sync/history, Task Log, Obsidian record or independent audit. W00 owns the serial integration/governance/audit window.
