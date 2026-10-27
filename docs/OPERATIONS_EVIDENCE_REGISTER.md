# VisaLang Operations Evidence Register

- Updated: 2026-09-01
- Scope: `VL-GOV-003` repository-only evidence index
- Review basis: `VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md`, `VISALANG_CURRENT_STATE_2026-09-01.md`, `OPERATIONS_STATUS.md`, and the local Git state checked at `2026-09-01T11:02+08:00`

## Use and evidence boundary

This register helps an operator locate evidence and gaps. It is not an external-account check, a production check, an owner appointment, or an authorization to log in, commit, push, release, roll back, send email, or change a service.

- Gate statuses are only `PASS`, `BLOCKED`, or `NOT_APPLICABLE`.
- Every row is `BLOCKED` until its required owner and backup or escalation path, durable current evidence, and review date are confirmed.
- A taskbook role name states the required role. It does not prove that a person or business-approved role currently accepts that responsibility.
- Repository source proves only the checked source state. Historical release text proves only what that dated record says. Neither proves a current production or account fact.
- `expires_at: UNKNOWN` means no approved freshness period or expiry date is recorded. Treat the evidence as insufficient for a current-use conclusion and recheck it before the relevant decision.
- Screenshots, exports, HAR files, and messages that contain account, query, cookie, address, or personal details belong in an owner-approved controlled location. The repository should hold only a redacted summary, locator, check date, checksum when appropriate, permitted conclusion, and boundary.
- `/private/tmp` is temporary and non-durable. A path there must never be the only long-term evidence.

## Gate summary

| Capability | task_id | phase | status | Current owner | Current backup / escalation | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| Production version | VL-REL-001 | Phase 0 | `BLOCKED` | `UNKNOWN` — Release Owner required | `UNKNOWN` — Rollback Owner or approved escalation required | Do not state a current production commit or release. |
| Search Console | VL-SC-001 | Phase 1 | `BLOCKED` | `UNKNOWN` — Data Owner required | `UNKNOWN` | Do not state that a property, role, sitemap submission, or performance dataset is current. |
| Analytics | VL-ANA-001 | Phase 1 | `BLOCKED` | `UNKNOWN` — Business Owner decision required | `UNKNOWN`; Data/Privacy consultation is also unconfirmed | Keep the capability closed unless a separate approved decision window says otherwise. |
| AdSense | VL-ADS-001 | Phase 1 | `BLOCKED` | `UNKNOWN` — Business Owner and Ads/Consent Owner required | `UNKNOWN` | Do not expand or claim account approval, Auto Ads configuration, policy status, or verified delivery. |
| CMP | VL-CMP-001 | Phase 1 | `BLOCKED` | `UNKNOWN` — Ads/Consent Owner required | `UNKNOWN` | Do not claim that consent paths or regional behavior are verified. |
| Contact | VL-CONTACT-001 | Phase 1 | `BLOCKED` | `UNKNOWN` — Contact Owner required | `UNKNOWN`; Business Owner approval and privacy escalation are unconfirmed | Keep contact as contact intent only; do not promise receipt, routing, reply, deletion, or service. |
| Release | VL-REL-001 | Phase 0 | `BLOCKED` | `UNKNOWN` — Release Owner required | `UNKNOWN` — backup or escalation required | No commit, push, deployment, or production change is authorized by this register. |
| Rollback | VL-REL-001 | Phase 0 | `BLOCKED` | `UNKNOWN` — Rollback Owner and authorizer required | `UNKNOWN` | Do not claim a current usable rollback point or perform a rollback/drill. |

## Evidence records

### Production version

| Field | Value |
| --- | --- |
| `task_id` | `VL-REL-001` |
| `phase` | Phase 0 |
| `owner` | `UNKNOWN` — the taskbook requires a Release Owner; no current assignee or accepted role is evidenced. |
| `backup` | `UNKNOWN` — a Rollback Owner or approved escalation path is required. |
| `dependency` | `VL-GOV-002`; current read-only production evidence from an authorized owner/operator. |
| `status` | `BLOCKED` |
| `evidence_type` | Current repository Git observation; dated historical release/reconciliation records; temporary raw-log references. |
| `evidence_location` | Local Git at the check time: `HEAD`, `main`, and `origin/main` = `2ef029f28c03a5838b3ec9add90d851259e81f82`. Durable repository summaries: `docs/VISALANG_CURRENT_STATE_2026-09-01.md`, `docs/OPERATIONS_STATUS.md`, and `docs/RELEASE_RECONCILIATION_2026-08-21.md`. The raw paths listed under “Non-durable evidence references” are temporary, their present existence was not checked, and they are not durable proof. Current server/source/release evidence location: `UNKNOWN`. |
| `checked_at` | `2026-09-01T11:02+08:00` for repository state only. The last server/production evidence described by the records is dated `2026-08-21`; it was not refreshed here. |
| `expires_at` | `UNKNOWN` — no approved production-evidence freshness period is recorded. |
| `permitted_conclusion` | At the repository-only check, local `HEAD`, `main`, and the local `origin/main` ref matched `2ef029f`. Repository records describe a verified App payload/release at `80c6d04c4ccd3d5ee9af069703f7a56534939c3e` on 2026-08-21 and a later docs-only governance successor. |
| `boundary` | This does not prove the current public deployment, server source, `current` symlink, immutable release directory, DNS target, smoke state, or that `2ef029f` reached production. The local remote-tracking ref is not a fresh network or server check. Historical text and local source cannot establish a current production fact. |
| `decision` | Current production commit/release is unverified. Do not use the historical release as a current-state assertion. |
| `blocker` | No confirmed Release Owner/backup, no current authorized read-only server/public version evidence, and no durable current raw evidence package. |
| `next_action` | After owner and read-only authorization are recorded, execute `VL-REL-001`: separately record production commit/release, current candidate, local/origin state, last stable rollback point, release time, authorization, and smoke result. Store redacted durable evidence and set a review/expiry date. |

### Search Console

| Field | Value |
| --- | --- |
| `task_id` | `VL-SC-001` (then `VL-SC-002` and `VL-SC-003`) |
| `phase` | Phase 1 |
| `owner` | `UNKNOWN` — the taskbook requires a Data Owner; no current assignee or accepted role is evidenced. |
| `backup` | `UNKNOWN` |
| `dependency` | `VL-GOV-002`; external-account read-only authorization. |
| `status` | `BLOCKED` |
| `evidence_type` | Repository sitemap/robots configuration and historical public checks; explicit account-evidence gap. |
| `evidence_location` | `public/robots.txt`; generated sitemap implementation in the repository; `docs/OPERATIONS_STATUS.md`; `docs/VISALANG_CURRENT_STATE_2026-09-01.md`. Current property/role/sitemap/index/export evidence location: `UNKNOWN`. |
| `checked_at` | `2026-09-01T11:02+08:00` for repository documents only. No Search Console account check was performed. |
| `expires_at` | `UNKNOWN` — no account-evidence expiry or review date is recorded. |
| `permitted_conclusion` | The repository has a sitemap path and records historical public sitemap reachability. The current-state plan identifies Search Console evidence as missing. |
| `boundary` | Public sitemap availability does not prove a Search Console property, canonical property/domain, user role, sitemap submission/read status, indexing state, query data, or monitoring ownership. |
| `decision` | Search Console gate remains blocked. No data-driven expansion claim may rely on this row. |
| `blocker` | Missing confirmed Data Owner/backup, authorized property and role proof, sitemap platform status, evidence locator, and 28/90-day exports. |
| `next_action` | With owner authorization, complete `VL-SC-001` read-only: record property type and canonical domain, operator role, sitemap view path, check date, controlled evidence location, and expiry. Then perform `VL-SC-002`/`VL-SC-003` without storing credentials, cookies, or personal/query detail in the repository. |

### Analytics

| Field | Value |
| --- | --- |
| `task_id` | `VL-ANA-001` |
| `phase` | Phase 1 |
| `owner` | `UNKNOWN` — a Business Owner decision is required; Data/Privacy consultation is also unconfirmed. |
| `backup` | `UNKNOWN` |
| `dependency` | `VL-GOV-002`; explicit business/privacy decision. |
| `status` | `BLOCKED` |
| `evidence_type` | Current repository-source inspection and dated historical documentation. |
| `evidence_location` | `src/layouts/BaseLayout.astro`; `docs/VISALANG_CURRENT_STATE_2026-09-01.md`; historical discussion in `docs/OPERATIONS_STATUS.md` and `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md`. Current account/dashboard, approved decision, privacy review, retention, and access evidence location: `UNKNOWN`. |
| `checked_at` | `2026-09-01T11:02+08:00` for repository source/documents only. No account, dashboard, production-network, or server check was performed. |
| `expires_at` | `UNKNOWN` — no approved decision-review date or trigger is recorded. |
| `permitted_conclusion` | At the checked local source state, `BaseLayout.astro` has no Cloudflare Web Analytics or Google Analytics loader. The current-state plan describes Analytics as remaining closed in source policy. |
| `boundary` | This does not prove the public build, server/CDN injection behavior, an Analytics account state, dashboard data, access roles, data retention, cookie behavior, consent compliance, or an owner-approved long-term decision. Historical source or public observations may be superseded. |
| `decision` | Keep Analytics closed pending the separate `VL-ANA-001` decision. Do not combine this decision with AdSense or CMP. |
| `blocker` | Missing owner/backup, approved “remain closed” versus “assess in a separate window” decision, purpose/data-minimization/access/retention record, and review date or trigger. |
| `next_action` | Business Owner, with Data/Privacy input, records one independent decision. If closed, record the shutdown verification method and review date/trigger. If assessment is authorized, open a separate scoped window; this register does not authorize implementation. |

### AdSense

| Field | Value |
| --- | --- |
| `task_id` | `VL-ADS-001` |
| `phase` | Phase 1 |
| `owner` | `UNKNOWN` — Business Owner and Ads/Consent Owner are both required; no current assignees or accepted roles are evidenced. |
| `backup` | `UNKNOWN` |
| `dependency` | `VL-GOV-002`; external-account read-only authorization. |
| `status` | `BLOCKED` |
| `evidence_type` | Current repository-source configuration; historical production smoke summary; explicit account/browser waiver and gap. |
| `evidence_location` | `src/layouts/BaseLayout.astro` (conditional loader, default off); `public/ads.txt`; `docs/OPERATIONS_STATUS.md`; `docs/VISALANG_CURRENT_STATE_2026-09-01.md`; `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md`. Current AdSense account, role, Policy Center, Auto Ads/exclusions, browser network, and CLS evidence location: `UNKNOWN`. |
| `checked_at` | `2026-09-01T11:02+08:00` for repository source/documents only. The last production smoke described in `OPERATIONS_STATUS.md` is dated `2026-08-21` and explicitly omitted account-side and clean-browser verification. |
| `expires_at` | `UNKNOWN` — no approved account/browser evidence expiry is recorded. |
| `permitted_conclusion` | The checked source can conditionally emit an AdSense loader only when `enableAds` is true, and the repository contains `ads.txt`. The historical record says its bounded production smoke checked the loader, exclusion behavior, and `ads.txt` in that release window. |
| `boundary` | Source, `ads.txt`, policy text, and historical smoke do not prove a current AdSense account role/status, site approval, Policy Center state, Auto Ads placements or exclusions, served ads, revenue, consent behavior, regional behavior, production requests, or CLS. The 2026-08-21 waiver is not evidence that those checks passed. |
| `decision` | Evidence is insufficient. Preserve the current bounded source posture and do not expand page or advertising scope or claim approval/verification. |
| `blocker` | Missing confirmed owners/backups, account authorization and role proof, independent AdSense decision, current Auto Ads/exclusion evidence, production-network evidence, CLS evidence, and durable controlled evidence location. |
| `next_action` | Authorized owners choose “retain after verification”, “disable in a separate window”, or “insufficient evidence; do not expand”. Record source scope, account role, Auto Ads/exclusions, production requests, CLS, fallback, evidence expiry, and boundaries separately from CMP. |

### CMP

| Field | Value |
| --- | --- |
| `task_id` | `VL-CMP-001` |
| `phase` | Phase 1 |
| `owner` | `UNKNOWN` — the taskbook requires an Ads/Consent Owner; no current assignee or accepted role is evidenced. |
| `backup` | `UNKNOWN` |
| `dependency` | `VL-GOV-002`; account and clean-browser check authorization. |
| `status` | `BLOCKED` |
| `evidence_type` | Repository policy/source audit notes and explicit historical account/browser evidence gap. |
| `evidence_location` | `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md`; `docs/OPERATIONS_STATUS.md`; `docs/VISALANG_CURRENT_STATE_2026-09-01.md`. Current Google Privacy & messaging account and reproducible clean-browser/network evidence location: `UNKNOWN`. |
| `checked_at` | `2026-09-01T11:02+08:00` for repository documents only. No CMP account, browser, region, or production-network check was performed. |
| `expires_at` | `UNKNOWN` — no approved CMP evidence expiry is recorded. |
| `permitted_conclusion` | The repository records a known need to verify account, policy, and browser behavior separately. Historical releases explicitly waived rather than passed that account/browser check. |
| `boundary` | No conclusion is permitted about account configuration, applicable regions, message publication, consent/reject/manage/reopen flows, consent persistence, vendor behavior, policy alignment, or all-region coverage. A waiver and policy copy do not prove runtime behavior. |
| `decision` | CMP remains unverified and blocked. Do not infer it from the AdSense loader or merge it into the AdSense decision. |
| `blocker` | Missing owner/backup, account/browser authorization, account status, actual test region/environment, both consent and rejection paths, reopen path, production-network capture, failure/fallback record, and durable controlled evidence location. |
| `next_action` | An authorized Ads/Consent Owner completes `VL-CMP-001` with a clean browser under actual stated test conditions. Record account state, region, environment, consent/reject/manage/reopen results, policy comparison, failure/fallback, check date, and expiry. Do not generalize beyond tested conditions. |

### Contact

| Field | Value |
| --- | --- |
| `task_id` | `VL-CONTACT-001` |
| `phase` | Phase 1 |
| `owner` | `UNKNOWN` — Contact Owner required; Business Owner approval and privacy/retention responsibility are unconfirmed. |
| `backup` | `UNKNOWN` |
| `dependency` | `VL-GOV-002`; explicit authorization for a synthetic, non-personal-data email test. |
| `status` | `BLOCKED` |
| `evidence_type` | Current repository contact string and page copy; historical public page observation; explicit mail-operation gap. |
| `evidence_location` | `src/data/site.ts`; `src/pages/contact.astro`; `docs/OPERATIONS_STATUS.md`; `docs/VISALANG_CURRENT_STATE_2026-09-01.md`. Current mailbox routing/access, synthetic send/delivery/routing/reply, retention/deletion, SLA, and incident evidence location: `UNKNOWN`. |
| `checked_at` | `2026-09-01T11:02+08:00` for repository source/documents only. No email was sent and no mailbox or external service was accessed. |
| `expires_at` | `UNKNOWN` — no approved operational review date or SLA evidence expiry is recorded. |
| `permitted_conclusion` | The checked repository displays `hello@visalang.org` as a contact address. Historical records describe older public contact-page observations. |
| `boundary` | An address string or reachable page does not prove mailbox ownership, access, delivery, routing, response, escalation, allowed data, retention/deletion, SLA, backup coverage, privacy compliance, or service availability. The historical `hello@flowlight.me` evidence is not current proof for `hello@visalang.org`. |
| `decision` | Keep the surface as contact intent only. Do not promise a reply time, collect through a new form/waitlist, or imply payment, delivery, manual review, or service completion. |
| `blocker` | Missing Contact Owner/backup, Business Owner approval, privacy/retention owner and rules, test authorization, current synthetic delivery/routing/deletion proof, SLA, escalation/failure path, and durable evidence location. |
| `next_action` | After authorization, use a synthetic message with no real case or personal data to test receipt, routing, response, escalation, retention, and deletion. Record the test-data deletion date, SLA, backup, failure copy, check/expiry dates, and a redacted durable evidence locator. |

### Release

| Field | Value |
| --- | --- |
| `task_id` | `VL-REL-001` (later operating standard: `VL-OPS-004`) |
| `phase` | Phase 0 |
| `owner` | `UNKNOWN` — the taskbook requires a Release Owner; historical operators or Git authors are not current owner evidence. |
| `backup` | `UNKNOWN` — backup or approved escalation path required. |
| `dependency` | `VL-GOV-002`; current production/candidate/rollback reconciliation; explicit owner authorization for any future action. |
| `status` | `BLOCKED` |
| `evidence_type` | Durable historical release summaries/manifests; historical authorization and gate descriptions; temporary raw-log references. |
| `evidence_location` | `docs/OPERATIONS_STATUS.md`; `docs/RELEASE_RECONCILIATION_2026-08-21.md`; `docs/RELEASE_CANDIDATE_MANIFEST_2026-08-21.md`; `docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md`; `docs/TASK_LOG.md`. Temporary references are listed under “Non-durable evidence references”; their present existence was not checked. Current release target/authorization evidence location: `UNKNOWN`. |
| `checked_at` | `2026-09-01T11:02+08:00` for repository records only. The latest described release window is dated `2026-08-21`; no new production check occurred here. |
| `expires_at` | `UNKNOWN` — historical release records remain historical, but no freshness period for current release readiness is approved. |
| `permitted_conclusion` | The repository contains structured records for the 2026-08-21 Security → App release sequence, gates, smoke, and bounded account-evidence waiver. |
| `boundary` | Those records do not appoint a current Release Owner/backup, authorize a new target commit, prove current production, or authorize commit, push, deployment, account access, or server change. Temporary logs are not a durable evidence archive. |
| `decision` | Release authority and current release readiness are blocked. This register makes no release approval. |
| `blocker` | Missing confirmed owner/backup and SLA/escalation, current production/candidate/rollback reconciliation, approved target, current authorization, durable raw evidence location, and evidence expiry/review date. |
| `next_action` | First complete `VL-GOV-002` and read-only `VL-REL-001`. For any separately authorized future release, use a durable record that links authorization, target commit, immutable release, build gates, smoke, production version, rollback point, owner/backup, closure decision, and controlled raw evidence. |

### Rollback

| Field | Value |
| --- | --- |
| `task_id` | `VL-REL-001` (later operating standard: `VL-OPS-004`) |
| `phase` | Phase 0 |
| `owner` | `UNKNOWN` — Rollback Owner and rollback authorizer are required; historical execution does not assign either role. |
| `backup` | `UNKNOWN` |
| `dependency` | `VL-GOV-002`; current production/candidate/rollback reconciliation; separately approved drill or incident authorization. |
| `status` | `BLOCKED` |
| `evidence_type` | Historical immutable release paths and rollback descriptions; no current path-validity or drill proof. |
| `evidence_location` | `docs/OPERATIONS_STATUS.md`; `docs/RELEASE_RECONCILIATION_2026-08-21.md`; `docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md`; `docs/TASK_LOG.md`. The dated records name historical release paths, including `/var/www/visalang.org/releases/80c6d04c4ccd` and `/var/www/visalang.org/releases/f680c6234611`; current existence/usability was not checked. Current SOP, authorization chain, drill evidence, and controlled raw evidence location: `UNKNOWN`. |
| `checked_at` | `2026-09-01T11:02+08:00` for repository records only. Historical rollback paths were last described in the 2026-08-21 release record and were not refreshed here. |
| `expires_at` | `UNKNOWN` — no approved rollback-evidence freshness period or drill-expiry rule is recorded. |
| `permitted_conclusion` | The repository records rollback targets for a dated 2026-08-21 release window and says no rollback trigger occurred then. |
| `boundary` | A recorded historical path does not prove that the artifact still exists, is intact, matches current production, can be restored, has a current operator/authorizer, or has passed a rollback drill. This register is not a rollback instruction or authorization. |
| `decision` | Current rollback point and operational readiness are unverified. Do not execute or claim readiness. |
| `blocker` | Missing confirmed owner/authorizer/backup, current production mapping, verified artifact integrity and path, trigger thresholds, approved SOP, communications chain, recovery checks, drill date/result, durable evidence, and expiry. |
| `next_action` | Under read-only authorization, reconcile the current production release and nearest stable rollback artifact. Record checksum/integrity where appropriate, trigger thresholds, authorizer/operator/backup, SOP locator, recovery checks, and expiry. A restoration drill requires a separate approved window. |

## Non-durable evidence references

`docs/OPERATIONS_STATUS.md` names the following raw evidence paths for the 2026-08-21 release window:

- `/private/tmp/visalang-production-security-deploy-20260821.log`
- `/private/tmp/visalang-production-security-smoke-20260821.log`
- `/private/tmp/visalang-app-after-production-security-predeploy-20260821.log`
- `/private/tmp/visalang-production-app-deploy-20260821.log`
- `/private/tmp/visalang-production-app-smoke-20260821.log`

All five paths are **temporary and non-durable**. Their present existence, contents, integrity, and access controls were not checked in this repository-only task. Before relying on them, an authorized owner must move or reproduce the necessary redacted evidence in an approved durable controlled location, record its locator and checksum where appropriate, and update the affected record without placing secrets, cookies, account identifiers, query details, addresses, or personal data in the repository.

## Immediate blocked actions

1. Obtain the owner decision input required by `VL-GOV-001`, then update the current responsibility matrix under `VL-GOV-002`.
2. Do not change any row to `PASS` until the row has a confirmed current owner, backup or escalation path, durable evidence locator, checked date, expiry/review date, permitted conclusion, and explicit boundary.
3. Complete `VL-REL-001` as an authorized read-only reconciliation before making a new production, release, or rollback claim.
4. Keep Phase 1 account/data/contact gates closed until their independent tasks and evidence packages are complete.
