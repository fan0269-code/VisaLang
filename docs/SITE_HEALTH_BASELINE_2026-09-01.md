# VisaLang Site Health Baseline

> Checked at: `2026-09-01T12:07:45+08:00`  
> Task: `VL-HEALTH-001`  
> Status: `PARTIAL / BLOCKED_INPUT`  
> Dictionary: `docs/GROWTH_DATA_DICTIONARY.md` version `0.1-draft` (not effective until Data Owner approval)

## 1. Result and boundary

A repository and public-HTTP health snapshot was collected without account login or production change. The sampled public routes responded as expected, but this is not a production version attestation, uptime report, Search Console indexing report, field-performance report, or owner-approved severity policy.

`VL-HEALTH-001` remains incomplete until:

- `VL-DATA-001` has an approved effective dictionary version;
- Release Owner proposes and Business Owner accepts severity, stop-release, rollback and response thresholds;
- performance method/scope is approved and run;
- correction-report and source-expiry registers have confirmed owners and definitions.

No commit, push, deployment, rollback, server access or external-account access was performed.

## 2. Public HTTP sample

Environment: public `https://visalang.org`, clean unauthenticated HTTP GET from the execution environment. This sample proves only the listed URLs at the stated timestamp.

| URL | Status | Content type | H1 | Canonical | Robots | AdSense loader in HTML |
| --- | ---: | --- | ---: | --- | --- | --- |
| `https://visalang.org/` | 200 | `text/html` | 1 | `https://visalang.org/` | `index,follow,max-image-preview:large` | yes |
| `https://visalang.org/germany-family-reunion-a1/` | 200 | `text/html` | 1 | same URL | `index,follow,max-image-preview:large` | yes |
| `https://visalang.org/germany-b1-settlement-citizenship/` | 200 | `text/html` | 1 | same URL | `index,follow,max-image-preview:large` | yes |
| `https://visalang.org/guides/` | 200 | `text/html` | 1 | same URL | `index,follow,max-image-preview:large` | no |
| `https://visalang.org/robots.txt` | 200 | `text/plain` | NA | NA | NA | NA |
| `https://visalang.org/sitemap-index.xml` | 200 | `text/xml` | NA | NA | NA | NA |
| `https://visalang.org/__vl-health-missing-20260901/` | 404 | `text/html` | 1 | `https://visalang.org/404/` | `noindex,follow` | no |

Observations:

- No 5xx response occurred in this seven-URL sample.
- The synthetic missing URL returned the recovery page as 404, remained `noindex`, and did not include the AdSense loader.
- The Guide Library index did not include the AdSense loader, consistent with the existing bounded source policy.
- The three sampled indexable HTML pages had one H1 and a matching canonical.
- An AdSense loader visible in HTML does not prove account approval, served ads, Auto Ads configuration, CMP behavior, revenue, or consent compliance.
- Public reachability does not identify the deployed commit or immutable release.

## 3. Repository and generated-route checks

The frozen batch must run the following before independent review:

| Check | Required command/evidence | Current state |
| --- | --- | --- |
| Focused document assertions | validated 49-card board, eight-record evidence register, dictionary/template, 23-page preparation and safety/status boundaries | PASS on 2026-09-01 |
| Regression suite | `npm test` | PASS on 2026-09-01 |
| Generated routes and launch gate | `npm run launch-check` | 100 pages; 46/46 PASS; `READY` on 2026-09-01 |
| Whitespace | `git diff --check` | PASS on 2026-09-01 |
| Search Console sitemap/index state | authorized platform snapshot | `NA_NOT_AUTHORIZED` |
| Performance | approved tool, pages, device, versions and repeated runs | `NA_NOT_RUN` |
| Correction reports | redacted controlled register | `NA_NOT_CONNECTED` — no accepted register or owner is connected to this reporting contract |
| Source expiry | approved policy and source queue | `NA_NOT_RUN` — queue seed exists, but cadence/owner approval is missing so no expiry calculation was run |

Local build and public production are separate environments. A passing local command cannot be described as a deployment or current production result.

## 4. Proposed severity and action policy — not approved

The following is a proposal for Release Owner and Business Owner review. It is not an active release/rollback authorization.

| Severity | Proposed trigger examples | Proposed response | Authority still required |
| --- | --- | --- | --- |
| P0 | sensitive-data exposure; payment/service falsely live; site-wide or critical-route 5xx; high-risk content asserting an unsupported legal/eligibility outcome | stop affected capability/release work immediately; preserve evidence; escalate before any recovery action | Business + appropriate Security/Release/Content owner |
| P1 | critical A1/B1 route 404; canonical/robots/sitemap conflict on a core page; ads on a fail-closed page; broken consent/decline path; launch gate failure | stop release; assign owner; correct and independently re-review | Release/Content/Ads owner as applicable |
| P2 | isolated internal broken link; non-critical metadata/schema regression; material lab performance regression; stale but bounded source nearing approved review cap | schedule scoped correction within the current capacity limit; retain fail-closed behavior | Programme + relevant owner |
| Info | expected platform delay, no-change source check, isolated public sample without anomaly | record boundary and next check | Programme/Data owner |

A rollback trigger additionally requires a confirmed current production version, target rollback point, authorized Rollback Owner and recovery verification plan. None is established by this document.

## 5. Blockers and next actions

| Blocker | Owner needed | Next action |
| --- | --- | --- |
| Data dictionary is draft | Data Owner | accept/change version and effective date |
| Severity/stop/rollback thresholds unapproved | Release + Business Owners | accept/change/defer proposed table |
| Production commit/release unverified | Release + Rollback Owners | separately authorize `VL-REL-001` read-only check |
| Search Console index state missing | Data Owner | authorize and run `VL-SC-001/002` |
| Performance method absent | Programme + Release Owners | choose pages, device, tool/version, run count and thresholds |
| Correction/source registers lack accepted owner/policy | Content Authority + Programme Owners | close `VL-GOV-002`, approve cadence and durable register |

Until these blockers close, the correct status is `PARTIAL / BLOCKED_INPUT`. This snapshot can support only a bounded statement about the checked repository/public URLs.
