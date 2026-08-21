# VisaLang release and content-ledger reconciliation — 2026-08-21

> Point-in-time reconciliation record. The current local candidate state is maintained in `docs/RELEASE_CANDIDATE_MANIFEST_2026-08-21.md`; later commits do not rewrite the facts observed during this window.

Verdict: **PHYSICAL_DEPLOYMENT_RECONCILED / APPROVAL_GAP_OPEN / DAILY_20_PAUSED**

## Decision

- The Codex automation `visalang-20` is paused. Its previous target of producing 20 articles every day is not authorised by either the master plan or the pending 20-natural-day maintenance plan.
- Production is serving commit `6a1cb43239200ceae1d43700cdc0241bdbc2e861` from immutable release `/var/www/visalang.org/releases/6a1cb4323920`.
- Nineteen Website Content Hub records are physically included in the current production lineage. Their deployment status is reconciled to `deployed`, while human review and owner decision remain pending.
- At reconciliation time, FAN-254 and FAN-270 were not deployed. Neither was authorised to be committed, pushed or released through this reconciliation window.

## Evidence captured

Checked on 2026-08-21 (Asia/Shanghai):

- Local `origin/main`: `6a1cb43239200ceae1d43700cdc0241bdbc2e861`.
- At reconciliation time, local `main` was `f680c6234611606c0f308bbf386ee714b027385a`, ahead/behind `7/0`; the seven local-only commits were the FAN-254 dependency-remediation sequence.
- Production `current`: `/var/www/visalang.org/releases/6a1cb4323920`.
- Production source HEAD: `6a1cb43239200ceae1d43700cdc0241bdbc2e861`; server source status: clean.
- Current release directory mtime: `2026-08-18T11:20:52+08:00`.
- Immediate rollback candidate: `/var/www/visalang.org/releases/cd0f73cb0f9d`, commit `cd0f73cb0f9d4662d73369bb757bdaa02856eb50`; the directory contains `index.html` and the commit is an ancestor of current production.
- The repository production smoke script passed from the production host: homepage, Guide Library, robots and sitemap returned HTTP 200; legacy and `www` redirects returned the expected HTTP 301 responses; canonical, advertising exclusions, `ads.txt`, robots and required security-header checks passed.

This evidence proves the physical source/release state. It does not identify or backfill the person who approved commit `6a1cb43`, the approval time, or a completed batch-level independent review.

## Website Content Hub reconciliation

All records remain under human review with `needs_human_review: true` and `owner_decision: pending`.

| Record | Result mapping | Physical deployment |
| --- | --- | --- |
| `2026-07-22-visalang-germany-a1-b1-support-source-review.md` | corrected to `cd0f73cb0f9d4662d73369bb757bdaa02856eb50` | deployed; exact immutable release retained |
| `2026-07-26-visalang-adsense-low-value-remediation.md` | existing `f2c09f4455d5314259e7b1cfdf8ef0462fa77c76`, ancestor of production | deployed through current release |
| `2026-07-29-visalang-adsense-window-b2-portugal.md` | existing `0b71e7e4f718166a7b68acad344b74b77cf458f4`, parent of production | deployed through current release |
| `2026-07-29-visalang-adsense-window-b3-finland.md` | existing `0b71e7e4f718166a7b68acad344b74b77cf458f4`, parent of production | deployed through current release |
| `2026-07-30-visalang-adsense-window-b4-italy.md` | existing `0b71e7e4f718166a7b68acad344b74b77cf458f4`, parent of production | deployed through current release |
| `2026-07-30-visalang-adsense-window-b5-canada.md` | existing `0b71e7e4f718166a7b68acad344b74b77cf458f4`, parent of production | deployed through current release |
| `2026-07-30-visalang-adsense-window-b6-netherlands.md` | existing `0b71e7e4f718166a7b68acad344b74b77cf458f4`, parent of production | deployed through current release |
| `2026-07-30-visalang-uk-testdaf-release-review.md` | existing `0b71e7e4f718166a7b68acad344b74b77cf458f4`, parent of production | deployed through current release |
| `2026-08-13-visalang-bilingual-home-visual-optimization.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `2026-08-14-visalang-fan-34-telc-goethe-source-slice.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `2026-08-14-visalang-fan-37-telc-b1-b2-format.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `2026-08-14-visalang-fan-38-telc-fees-centres.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `2026-08-14-visalang-fan-39-telc-work-nursing.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `2026-08-14-visalang-fan-73-guide-trust.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `2026-08-15-FAN-43-Germany-B1核心页复核.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `2026-08-15-visalang-fan-40-netherlands-inburgering.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `FAN-42-Germany-A1-核心页复核-2026-08-15.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `2026-08-17-visalang-fan-237-sitewide-bug-audit.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `2026-08-17-visalang-fan-75-stage-c-css.md` | mapped from uncommitted work to `6a1cb43239200ceae1d43700cdc0241bdbc2e861` | deployed |
| `2026-08-18-visalang-fan-254-dependency-advisory-remediation.md` | corrected from non-ancestor `ea07fb7d...` to current local candidate `f680c6234611606c0f308bbf386ee714b027385a` | not started |
| `2026-08-20-visalang-fan-270-seo-optimization.md` | uncommitted working tree at reconciliation time; no result commit then existed | not started |

The Hub records were backed up before editing to `/tmp/visalang-hub-records-before-reconcile-2026-08-21.tgz`.

## Planning correction

The four-page telc package, FAN-40, FAN-42 and FAN-43 were selected within the bounded existing-page maintenance scope, but they were executed before the pending content plan had a recorded CEO approval. Their content direction remains authority-first and no-new-page; their governance order remains unreconciled.

The number `20` in `CONTENT_UPDATE_PLAN_2026-08-14.md` means 20 natural days, with at most eight existing pages. It is not authority for 20 new articles per day. No future content production may resume from the paused automation prompt.

## Remaining gates

1. Record an owner disposition for the already deployed `6a1cb43` package: accepted, accepted with corrections, or deployed without prior recorded approval.
2. Reconcile final independent review/re-review evidence for FAN-36 through FAN-40, FAN-42, FAN-43, FAN-73 and FAN-75. A release pointer does not close those reviews.
3. Decide whether the seven local FAN-254 commits remain a local candidate, should be replaced, or may enter a separately authorised release window.
4. Review FAN-270 as a separate SEO candidate. It was uncommitted at reconciliation time and was not represented by the production release; consult the current release manifest for later local Git state.
5. Before any future production change, name the accountable fact-review, release and rollback owners and record the intended release commit.

## Actions not taken

- No source/content implementation was changed by this reconciliation.
- No commit, push, deploy, rollback, Nginx change, DNS/TLS change or external account mutation was performed.
- No human approval, reviewer identity or approval timestamp was inferred.
