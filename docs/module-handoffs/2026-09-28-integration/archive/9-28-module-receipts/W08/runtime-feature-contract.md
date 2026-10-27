# W08 runtime feature contract v1

Shared W09/W16 interface for batch `2026-09-24-01`; baseline `cd845c55e17fcffa5e2184f6047df6be65f74d3cb393a3f6723fc67b2f784b40`.

## Canonical shape

```json
{"schemaVersion":1,"purposeSuggestions":"off | laya | typesafe","advertising":"off | on"}
```

`src/data/runtime-features.ts` owns the contract. Select with `VISALANG_PURPOSE_MODE` and `VISALANG_ADS_MODE`; both default to `off`. Astro injects the resolved object and writes the same bytes to `dist/runtime-features.json`. `release.py prepare` reads that built file; `release.json.features`, Nginx, service startup, probe and evidence conditions derive from it. Release flags cannot pick a mode. Advertising `on` only permits existing `publication-manifest.ts` eligible English articles; it cannot add pages. Home, tools, guide index, Chinese, policy, category, pending and commercial pages remain ad-free.

## Six-mode matrix

| Purpose | Ads | Runtime and dependencies |
|---|---|---|
| off | off | No suggestion markup, client initialization, request or proxy; no ad loader. EN/ZH manual choices, deterministic routes and saved state remain. No Python image/model/cache/key/service. `capacity` and `adsConsent` must be hash-bound `not_applicable` evidence proving absence. |
| off | on | Same core-only behavior; current eligible EN article set (14) may load ads; home/tools stay at zero. No provider dependencies; ads consent/account evidence must pass. |
| laya | off | Explicit local Laya provider copy; user-triggered only; failures keep manual choice. Requires immutable image, exact locked model revision/weights and capacity evidence. No TypeSafe key/privacy/quota gate. Ads evidence is N/A with zero-load proof. |
| laya | on | Laya requirements plus only the existing eligible EN pages. Ads consent/account evidence must pass. |
| typesafe | off | User-triggered only; pre-send copy names TypeSafe, US processing, policy retention/no-training terms, and unresolved local price/quota settings. Requires immutable image, `jev-latest`, server `TYPESAFE_API_KEY`, and TypeSafe privacy/processing plus price/quota evidence. Laya local capacity evidence is N/A; no Laya revision/cache/weights. Ads evidence is N/A. |
| typesafe | on | TypeSafe requirements plus only existing eligible EN pages; both TypeSafe and ads evidence must pass. Laya local capacity evidence is N/A; no Laya revision/cache/weights. |

Provider outage, missing credentials, malformed output, timeout or disabled mode leaves manual selection available. No model branch decides eligibility or submits a route choice.

## Old candidates

- New bundles contain exactly `features` and matching `site/runtime-features.json`; extra/missing fields, unknown values or conflicting legacy mirrors fail closed. New manifests do not emit `purposeProvider`, `adsRequired`, or provider booleans as a parallel source.
- Legacy v1 manifests without `features` are inferred only with explicit boolean `adsRequired`; absent `purposeProvider` means legacy Laya. Legacy TypeSafe must satisfy its prior `typesafeModel`, `typesafeRequired=true`, `layaRequired=false` shape. Its built runtime file must match the inferred mode.
- Pre-contract bundles without `site/runtime-features.json`, ambiguous ad mode, incomplete provider requirements, mismatched bytes or mode conflict are refused and must be rebuilt; no in-place migration. Dirty candidates, source hashes, candidate identity, owner receipt and rollback baseline gates remain.

## Transitions and failure recovery

Mode changes create a new immutable candidate. The transaction preflights target and current release, stages/validates mode-specific Nginx, starts or removes the optional service, uses a body-free GET guard (405 enabled, 404 off), reloads and smokes static/retained routes before recording `current`. Any failure restores the exact previous service/config/pointer; restore failure propagates. Laya alone requires the local capacity gate; TypeSafe requires its key presence plus privacy/processing and quota/price evidence and does not require Laya capacity or weights. TypeSafe preflight passes the environment-variable name to Docker. Builds and probes make no model API call.

W09/W16 consume `dist/runtime-features.json` and `release.json.features` after W00 serial integration. Do not create a second toggle or infer activation from `ads.txt`. LP04, actual host/backup/TLS/rollback, Owner and production evidence remain separate.
