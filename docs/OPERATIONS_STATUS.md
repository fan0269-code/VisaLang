# VisaLang Operations Status

Updated: 2026-07-13
Window: planning-alignment verification (documentation and verification only)

## Decision at a glance

- **Technical deployment baseline: confirmed for the current release.** On 2026-07-13, `b9f83b9beed548165d5d414080db1353a941dc80` was pushed to `main`, built on the server, and published to `/var/www/flowlight.me/public/dist`; the server source resolves to the same commit. The public Privacy and Cookie Policy pages return HTTP 200 and contain the 2026-07-13 policy wording.
- **Business/operations baseline: incomplete.** No required item below has both named primary/backup responsibility and current, inspectable evidence. Page copy, an email address, a legacy script, or an undeployed configuration is not service-availability evidence.
- **Phase 1 decision: 暂不启动阶段 1.** Search Console is deferred from the current review; it is not confirmed. Do not add analytics, lead capture, or conversion work until the remaining applicable gate items are confirmed.
- **Analytics, advertising and privacy decision: AdSense consent configuration is user-verified; Plausible remains conditionally approved.** Business selected Plausible Analytics Cloud Growth and directed that AdSense be retained. The European consent message was published after the matching policies were deployed; the user reports that the regional test showed the message, Google-only management options, and normal page behaviour after rejection. Retain a screenshot/export of that result as operational evidence. Plausible may not be installed until its account owners, retention/deletion decision and DPA review are recorded. See `docs/PHASE_1_PRIVACY_CONSENT_AUDIT_2026-07-13.md`.

## Deployment and rollback facts

| Item | Owner | Status | Evidence | Gap | Next action |
| --- | --- | --- | --- | --- | --- |
| Production static root | Server / release owner: 待业务方确认 | Confirmed | Nginx serves `/var/www/flowlight.me/public/dist` with `index.html`. | Named accountable owner is not recorded. | Business records the release operator and backup operator. |
| Server source and target commit | Server / release owner: 待业务方确认 | Confirmed for 2026-07-13 release | `main` at `b9f83b9beed548165d5d414080db1353a941dc80` was pushed, built on the server and published to `/var/www/flowlight.me/public/dist`; the server source resolves to the same commit. | No named person owns future target-commit approval; public HTML still has no deploy-version marker. | Record the selected target commit, approver, build output and public version evidence for every release. |
| Rollback artifact | Rollback authority: 待业务方确认 | Recorded, not drill-verified | Pre-release `7e9cd943ef24f247b6513758535ae26b072dbf3e` static output is preserved at `/var/www/flowlight.me/releases/20260712T202600CST-7e9cd943/dist`. | Restoration has not been exercised; no formal rollback authorizer is recorded. | Name the rollback authorizer and run a separately approved restoration drill. |
| Fixed release / rollback flow | Release owner and rollback authority: 待业务方确认 | Partially evidenced | The 2026-07-12 release used `main` → server build → staged `dist` → `/var/www/flowlight.me/public/dist`, with `nginx -t`, reload, and public smoke check; the prior artifact was retained. | The mandatory approver, release record format, and incident rollback authorization are not confirmed as an operating procedure. | Approve a written SOP that records branch, target commit, build time, smoke result, rollback commit/artifact, releaser, and rollback authorizer for every release. |

## Public smoke check

Recorded release check: 2026-07-12 20:27 Asia/Shanghai, after publishing `f258472…`

Read-only recheck: 2026-07-13. The six URLs below, plus `/pricing/` and `/contact/`, returned HTTP 200 with the listed titles. This proves public reachability only; it does not identify the deployed commit or confirm Search Console, analytics, contact handling, or any business responsibility.

| URL | HTTP | Page title |
| --- | ---: | --- |
| `https://flowlight.me/` | 200 | Find the language proof required for your route \| VisaLang |
| `https://flowlight.me/germany-family-reunion-a1/` | 200 | Germany A1 family reunion route \| VisaLang |
| `https://flowlight.me/germany-b1-settlement-citizenship/` | 200 | Germany B1 for settlement permits and citizenship: verify before you choose proof \| VisaLang |
| `https://flowlight.me/tools/` | 200 | Decision tools \| VisaLang |
| `https://flowlight.me/guides/` | 200 | Task guide library \| VisaLang |
| `https://flowlight.me/zh/` | 200 | 签证、永居、入籍语言考试路径导航 \| VisaLang |
| `https://flowlight.me/pricing/` | 200 | Choose the level of help you need \| VisaLang |
| `https://flowlight.me/contact/` | 200 | Contact \| VisaLang |

## Phase 1 entry-responsibility verification

Checked: 2026-07-12 (repository-visible source, deployment record, and current operations documentation only). No account was accessed, no service was configured, and no personal data was sent.

Status definitions: **Confirmed** requires named primary and backup owners plus current, inspectable evidence for every stated responsibility. **待业务方确认** is not an approval and must not be treated as a configured or operating service.

| Required item | Owner | Status | Evidence checked in this window | Gap / risk | Required next action |
| --- | --- | --- | --- | --- | --- |
| 1. Search Console property; sitemap submission and monitoring permission | Deferred by business direction | Deferred; not confirmed | `public/robots.txt` names `https://flowlight.me/sitemap-index.xml`. No property URL, verified-property proof, submitted-sitemap result, user/role evidence, error-monitoring record, or monitoring cadence is recorded. | Deferral is not a confirmation and it cannot support organic-search reporting. | Keep out of the current scope; reopen only when the business assigns primary/backup owners and provides access evidence. |
| 2. Analytics and advertising account; event-view permission; data processing and retention responsibility | Account owner: 待业务方确认; Event-view backup: 待业务方确认; Data-retention owner: 待业务方确认 | AdSense consent configuration user-verified; Plausible implementation blocked | Business selected Plausible Analytics Cloud Growth. The user reports published AdSense European consent messaging with Google-only options and normal post-rejection page behaviour. Source legal pages now match the retained AdSense direction; Plausible has no account, approved role, processor terms, retention decision, or deployed Phase 1 events. | User report is not a retained account screenshot/export. Plausible selection does not create an account, owner, DPA review or retention decision. | Retain the AdSense configuration evidence. Name Plausible primary/backup/retention owners; record account, DPA and retention evidence before implementation. |
| 3. Privacy Policy; Cookie / consent approach for analytics and advertising | Audit performed by Codex; final wording deployed; operational evidence owner: 待业务方确认 | AdSense technical configuration user-verified; Plausible pending | The matching Privacy and Cookie Policies were deployed in `b9f83b9`; the user reports the published European message displayed, offered Google-only management options, and did not break the site after rejection. | The configuration result is user-reported until screenshots or an AdSense settings export are retained. Jurisdiction-specific legal approval remains a business/legal responsibility. | Retain dated configuration evidence; have the accountable business/legal owner approve the operating record. Repeat the check after any CMP, provider or policy change. |
| 4. Contact / waitlist receiving endpoint; owner; permitted data; reply SLA | Receiver owner: 待业务方确认; Backup: 待业务方确认; SLA owner: 待业务方确认 | 待业务方确认 | `src/pages/contact.astro` displays `hello@flowlight.me`; commercial pages retain `contact-intent` / `request access` boundaries; no form endpoint, mailbox-routing proof, approved receipt test, data inventory, retention/deletion rule, triage record, SLA, or escalation record is present. The contact page explicitly does not promise a response time. | A displayed address is not evidence of receipt, triage, permitted-data handling, or a reply process. Contact intent must not imply booking, payment, email delivery, intake, or service completion. | Name primary/backup receivers and SLA owner; prove the real receiver with an approved non-personal test; define permitted fields, prohibited/sensitive data, retention/deletion, triage, SLA, and escalation; keep the current intent-only wording until that process is confirmed. |
| 5. Official-source fact-review responsibility; triggers; audit trail | Primary reviewer: 待业务方确认; Backup reviewer: 待业务方确认 | 待业务方确认 | `src/pages/editorial-policy.astro` requires official-source-first checks and identifies high-risk facts, but it names no reviewers and provides no review queue, trigger rule, approval record, or retained correction log. | Content policy is not an accountable review workflow. Time-sensitive requirements, fees, dates, centres, accepted certificates, eligibility, and policy claims lack a checkable business owner and evidence trail. | Name primary/backup reviewers; define mandatory triggers (official-source change, correction report, and edits to high-risk facts); require source URL/date and reviewer decision; retain review and correction records in an agreed location. |
| 6. Release primary/backup; formal rollback primary/backup and authority | Release primary: 待业务方确认; Release backup: 待业务方确认; Rollback primary: 待业务方确认; Rollback backup: 待业务方确认 | 待业务方确认 | The 2026-07-12 record identifies a branch, target commit, build, public smoke check, and preserved prior artifact, but names no authorised releaser or rollback authority. The rollback artifact has not had a restoration drill. | Technical evidence for one release is not delegated authority for future publication or incident recovery. | Business names all four roles; records the release approval point, rollback incident thresholds, communication path, restoration verification, and post-incident record; conduct any restoration drill only under separately approved release scope. |
| 7. Fixed release process: production branch; target-commit approval; build/smoke record; rollback commit/artifact; incident authorization | Process approver: 待业务方确认; Record owner: 待业务方确认; Incident authorizer: 待业务方确认 | 待业务方确认 | The recorded 2026-07-12 flow was `main` → target `f258472…` → server build/staged `dist` → `/var/www/flowlight.me/public/dist`, with `nginx -t`, reload, public smoke check, and prior `7e9cd943…` artifact retained. That historical record does not identify the current production commit. No approved SOP, target-commit sign-off, mandatory record template, or incident authorization flow is recorded. | An observed release does not establish mandatory future branch, approval, evidence, rollback, or incident procedures. | Approve and store an SOP requiring production branch, approved target commit, approver, build/test/launch-check and smoke evidence, releaser, rollback commit/artifact location, rollback authorizer, incident communication, and restoration verification for every release. |

## Explicit Phase 1 gate

**Result: 暂不启动阶段 1。** Search Console is deferred and AdSense consent configuration is user-verified, but the remaining gate is closed because Plausible account/owner/retention evidence, contact receiver, reply SLA, official-source reviewer, release owner, rollback authority, and a fixed branch/target/rollback procedure remain incomplete.

Until the gate is opened in writing:

- Do not add or expand GA, GTM, PostHog, Plausible, AdSense, forms, email, payment, or any other third-party service. The existing AdSense loader is an unresolved risk, not approval to operate or expand advertising.
- Do not collect personal information or send tool results to any service.
- Keep all commercial and contact paths as current `contact-intent` / `request access` language only; do not imply payment, registration, email delivery, review acceptance, or manual-service completion.
- Permitted maintenance remains limited to official-source content verification and public route-health checks in separately scoped windows.

When every row above becomes **Confirmed**, open a new, separately authorized Phase 1 window. Its implementation limit is the minimal privacy-safe event set only: route selection, tool completion, official outbound-link click, guide CTA, and contact intent. It must exclude tool results and all personal information.
