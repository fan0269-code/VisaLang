# VisaLang Split and Re-attest Execution — 2026-08-21

> Status: **DEPLOYED / PRODUCTION VERIFIED / NO ROLLBACK TRIGGER**
> Authorization progressed in explicit stages: isolated verification, one-file commit/local refs, then owner-authorised read-only account verification plus account-evidence waiver and full ordered deployment.
> The final window pushed and deployed Security first, then App. No external-account setting was changed; authenticated account-side evidence was unavailable and explicitly waived by the owner.

## 1. Candidate sequence

The candidates are sequential, not alternatives that may be released in any order:

1. **Security RC**: production/origin `6a1cb43239200ceae1d43700cdc0241bdbc2e861` → `f680c6234611606c0f308bbf386ee714b027385a`.
2. **App RC**: only after Security RC becomes the production baseline, local ref `rc/app-after-security-20260821` at `80c6d04c4ccd3d5ee9af069703f7a56534939c3e` (the `f680c62..9e33c5c` app range plus the one-file integration correction).

Publishing App RC directly from the then-current `6a1cb43` production was prohibited: that production lockfile had six audit findings and the direct split experiment therefore failed the dependency gate.

## 2. Security RC — PASS

| Field | Evidence |
|---|---|
| Isolated worktree | `/private/tmp/visalang-rc-fan254-20260821` |
| Baseline | `6a1cb43239200ceae1d43700cdc0241bdbc2e861` |
| Candidate | `f680c6234611606c0f308bbf386ee714b027385a`; local ref `rc/fan254-security-20260821` |
| Candidate tree | `9f3c485b97f8c5af5de638a1b082a33fee209c61` |
| Scope | Seven FAN-254 commits; five-file final net diff; no deploy script change |
| Environment | Node 22.23.2, npm 11.11.0, `https://registry.npmjs.org` |
| Install/audit | `npm ci` passed; full and omit-dev audit both 0 vulnerabilities |
| Repeated gates | 3/3 `npm test`; 3/3 100-page build; 3/3 launch check 44/44 READY; 3/3 diff check |
| Shell gates | All five `deploy/*.sh` files passed `bash -n` |
| Final state | HEAD unchanged; worktree clean |
| Independent audit | PASS; P0=0, P1=0, P2=0 |
| Raw evidence | `/private/tmp/visalang-rc-fan254-validation-20260821.log`, `/private/tmp/visalang-rc-fan254-validation-status.tsv` |

The final independent review covers the full `6a1cb43..f680c62` range, closing the earlier final-range review gap.

## 3. Direct App-on-production experiment — BLOCKED

A separate staged 404+SEO patch was applied over the then-production baseline `6a1cb43` in `/private/tmp/visalang-rc-app-20260821` without any FAN-254 files.

Results:

- Node 22 functional gates were stable: 3/3 tests, 3/3 100-page builds, 3/3 launch checks 46/46 READY and 3/3 diff checks passed.
- `npm audit --omit=dev` failed with the six findings inherited from the then-current `6a1cb43` production baseline: one moderate and five high across Astro/js-yaml/nanoid/postcss/sharp/svgo paths.
- Therefore the application patch must not be released before Security RC.

This negative experiment is retained as sequencing evidence, not as a release candidate.

## 4. App-after-security candidate — initial FAIL, corrected PASS

### 4.1 Deterministic failure

The clean `f680c62..9e33c5c` range was tested in `/private/tmp/visalang-rc-app-after-security-20260821`:

- install and audit passed with 0 vulnerabilities;
- builds were 3/3 successful at 100 pages;
- launch checks were 3/3 successful at 46/46 READY;
- but `npm test` failed 3/3 because `tests/fan-254-dependency-audit.test.js` fixed the global Task Log date at `2026-08-18`, while later 404/SEO work correctly advanced it to `2026-08-20`.

### 4.2 Minimal integration correction

The only correction changes the brittle exact-date assertion into the durable invariant:

- the Task Log date must be ISO `YYYY-MM-DD`;
- the date must be at or after the FAN-254 window (`>= 2026-08-18`).

No dependency, content claim, runtime behavior, route, sitemap, advertising gate or deployment file changed.

### 4.3 Corrected validation

| Field | Evidence |
|---|---|
| Baseline | `f680c6234611606c0f308bbf386ee714b027385a` |
| Parent app HEAD | `9e33c5c404b969abdc7a2dc18e69421ce2dedf2e` |
| Immutable candidate | `80c6d04c4ccd3d5ee9af069703f7a56534939c3e`; tree `222fc44bf4d5487b83807dc3cb5b39ab8d9d3bdc` |
| Local ref | `rc/app-after-security-20260821` |
| Additional correction | One committed file: `tests/fan-254-dependency-audit.test.js` (2 additions, 1 deletion) |
| Pre-commit combined patch SHA-256 | `4da3ffbc83417d158b235c29c20ed09fe57994e1d61c1fc55205625e6c7b3530` |
| Environment | Node 22.23.2, official npm registry |
| Install/audit | `npm ci` passed and preserved the correction; audit 0 vulnerabilities |
| Repeated gates | 3/3 `npm test`; 3/3 100-page build; 3/3 launch check 46/46 READY; 3/3 diff check |
| Post-commit gate | Node 22.23.2, official registry, audit 0, test PASS, build 100 pages, launch 46/46 READY, diff check PASS; worktree clean |
| Independent audit | PASS; P0=0, P1=0, P2=0 |
| Post-commit evidence | `/private/tmp/visalang-rc-app-immutable-validation-20260821.log` |

The independent auditor confirmed the final boundary is 31 committed app files plus the one minimal integration correction, with no `package-lock.json` change.

## 5. Pre-release decision snapshot

| Candidate | Technical verification | Independent review | Commit state | Deployment state |
|---|---|---|---|---|
| Security RC `f680c62` | PASS | PASS | Local ref created; not pushed | Not started |
| Corrected App RC `80c6d04` | PASS | PASS | One-file correction committed; local ref created; not pushed | Not started |
| Direct app-on-production experiment | Functional PASS / audit FAIL | Not a release candidate | Staged temporary patch only | Prohibited |

At the end of local candidate preparation, before the later deployment authorization, the verdict was:

**HOLD / OWNER PUSH DECISION REQUIRED / NO DEPLOY**

At that point, the authorised local-only preparation window was complete: the one-file correction is committed, both ordered local refs exist, and the immutable App commit passed a post-commit provenance gate. The next safe action requires separate push authorization. Deployment remains excluded; only after Security RC is released and publicly verified may App RC be reconstructed/rechecked against the actual new production commit.


## 6. App production release result before the governance-only successor

- Security `f680c62` was pushed to `origin/main`, deployed as `/var/www/visalang.org/releases/f680c6234611`, and passed server gates plus public smoke.
- Production source/current were confirmed at that exact Security commit before App proceeded.
- App `80c6d04` was then revalidated against the actual production Security baseline with Node 22, official registry, audit 0, tests, 100 pages, launch 46/46 READY, clean diff/status and independent PASS.
- App was pushed to `origin/main`, deployed as `/var/www/visalang.org/releases/80c6d04c4ccd`, and passed final server and public smoke.
- Focused public checks passed for the 404/noindex/search/no-ads recovery, separate SEO title and visible H1, and the default OG PNG.
- Final production source, release symlink and `origin/main` all resolve to `80c6d04c4ccd3d5ee9af069703f7a56534939c3e`.
- Immediate rollback is the verified Security release `f680c6234611`; no rollback trigger occurred.
- No authenticated AdSense/CMP account context was available. Owner explicitly combined read-only authorisation with an account-evidence waiver; no account configuration changed and no CMP/Auto Ads/Policy Center/CLS clean-profile result is claimed.
