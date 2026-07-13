# VisaLang Operations Status

Updated: 2026-07-13
Window: Open Design UI production release

## Decision at a glance

- **Technical deployment baseline: confirmed for the current release.** On 2026-07-13, `b15b14ebce0de1c3bcd8d25522bffd5b1c07a395` was pushed to `main`, built on the current DNS production server, and published to `/var/www/flowlight.me/public/dist`; the server source resolves to the same commit. The homepage, tools page, B1 hub, updated B1 guides, and Chinese A1 guide returned HTTP 200 after release.
- **Current production host: confirmed by DNS for this release.** `flowlight.me` and `www.flowlight.me` resolved to `107.150.102.145` during the release check. That host is the live production target unless DNS changes.
- **Business/operations baseline: incomplete.** No required item below has both named primary/backup responsibility and current, inspectable evidence. Page copy, an email address, a legacy script, or an undeployed configuration is not service-availability evidence.
- **Phase 1 decision: 暂不启动阶段 1.** Search Console is deferred from the current review; it is not confirmed. Do not add analytics, lead capture, or conversion work until the remaining applicable gate items are confirmed.
- **Analytics, advertising and privacy decision: AdSense consent configuration is user-verified; Cloudflare Web Analytics is live.** Business selected Cloudflare Web Analytics as the long-term free, cookie-free baseline and accepted that it does not support custom events. The European consent message was published after the matching policies were deployed; the user reports that the regional test showed the message, Google-only management options, and normal page behaviour after rejection. Cloudflare dashboard evidence supplied by the user shows 4 homepage page views and 1 visit in the prior 24 hours, confirming initial data receipt. Retain the screenshots/exports as operational evidence. The remaining analytics gate item is a primary and backup account-access record.

## Deployment and rollback facts

| Item | Owner | Status | Evidence | Gap | Next action |
| --- | --- | --- | --- | --- | --- |
| Production DNS target | Server / release owner: 待业务方确认 | Confirmed for this release | `flowlight.me` and `www.flowlight.me` resolved to `107.150.102.145` during the 2026-07-13 release. | Named accountable owner is not recorded; DNS can change and must be checked per release. | Record release operator and require DNS target confirmation before every deployment. |
| Production static root | Server / release owner: 待业务方确认 | Confirmed | Nginx on `107.150.102.145` serves `/var/www/flowlight.me/public/dist` with `index.html`. | Named accountable owner is not recorded. | Business records the release operator and backup operator. |
| Server source and target commit | Server / release owner: 待业务方确认 | Confirmed for 2026-07-13 release | `main` at `b15b14ebce0de1c3bcd8d25522bffd5b1c07a395` was pushed, built on `107.150.102.145`, and published to `/var/www/flowlight.me/public/dist`; the server source resolves to the same commit. | No named person owns future target-commit approval; public HTML still has no deploy-version marker. | Record the selected target commit, approver, build output and public version evidence for every release. |
| Rollback artifact | Rollback authority: 待业务方确认 | Recorded, not drill-verified | The production static output that existed before publishing `b15b14e` is preserved at `/var/www/flowlight.me/releases/20260713T035302Z-pre-b15b14e-dist`. The prior content-release artifact remains at `/var/www/flowlight.me/releases/20260712T202525PDT-pre-16a94dc-dist`. | Restoration has not been exercised; no formal rollback authorizer is recorded. | Name the rollback authorizer and run a separately approved restoration drill. |
| Fixed release / rollback flow | Release owner and rollback authority: 待业务方确认 | Partially evidenced | The 2026-07-13 UI release used `main` → target `b15b14e` → DNS target confirmation → server build → staged `dist` → `/var/www/flowlight.me/public/dist`, with `nginx -t`, reload, public smoke check, and prior artifact retained. | The mandatory approver, release record format, and incident rollback authorization are not confirmed as an operating procedure. | Approve a written SOP that records branch, target commit, DNS target, build time, smoke result, rollback commit/artifact, releaser, and rollback authorizer for every release. |

## Hosts excluded from current production release

| Host | Finding | Release decision |
| --- | --- | --- |
| `43.162.126.37` | SSH worked and the host had `/var/www/flowlight.me/public/dist`, but DNS did not point `flowlight.me` there during the release. | Not treated as current production. Do not deploy here for public release unless DNS points here. |
| `8.218.193.140` / SSH alias `aliyun` | SSH was blocked by host-key mismatch. Reported ED25519 fingerprint: `SHA256:yFIeAuRfz70RkuQc+pcY2imBex745Z2IjqQOyZfWNGA`. | Do not use until the server owner verifies and intentionally updates the known host key. |

## Public smoke check

Recorded release check: 2026-07-13 after publishing `b15b14ebce0de1c3bcd8d25522bffd5b1c07a395`.

The URLs below returned HTTP 200. The checked guide pages contained release-specific content markers, and the live CSS returned the new Open Design primary colour variable. This proves public reachability and the checked release markers only; it does not confirm Search Console, analytics access, contact handling, or any business responsibility.

| URL | HTTP | Page title |
| --- | ---: | --- |
| `https://flowlight.me/` | 200 | Find the language proof required for your route \| VisaLang |
| `https://flowlight.me/tools/` | 200 | Decision tools \| VisaLang |
| `https://flowlight.me/guides/goethe-b1-germany-settlement-work/` | 200 | Germany settlement permit and B1: verify language proof separately \| VisaLang |
| `https://flowlight.me/guides/goethe-b1-vs-telc-b1/` | 200 | DTZ vs Goethe B1 vs telc B1: verify acceptance before choosing \| VisaLang |
| `https://flowlight.me/zh/guides/german-family-reunion-language-requirement/` | 200 | 德国配偶团聚到底要不要 A1？ \| VisaLang |
| `https://flowlight.me/germany-b1-settlement-citizenship/` | 200 | Germany B1 for settlement permits and citizenship: verify before you choose proof \| VisaLang |
| `https://flowlight.me/zh/germany-family-reunion-a1/` | 200 | 德国 A1 家庭团聚中文专题 \| VisaLang |

## Phase 1 entry-responsibility verification

Checked: 2026-07-12 (repository-visible source, deployment record, and current operations documentation only). No account was accessed, no service was configured, and no personal data was sent.

Status definitions: **Confirmed** requires named primary and backup owners plus current, inspectable evidence for every stated responsibility. **待业务方确认** is not an approval and must not be treated as a configured or operating service.

| Required item | Owner | Status | Evidence checked in this window | Gap / risk | Required next action |
| --- | --- | --- | --- | --- | --- |
| 1. Search Console property; sitemap submission and monitoring permission | Deferred by business direction | Deferred; not confirmed | `public/robots.txt` names `https://flowlight.me/sitemap-index.xml`. No property URL, verified-property proof, submitted-sitemap result, user/role evidence, error-monitoring record, or monitoring cadence is recorded. | Deferral is not a confirmation and it cannot support organic-search reporting. | Keep out of the current scope; reopen only when the business assigns primary/backup owners and provides access evidence. |
| 2. Analytics and advertising account; event-view permission; data processing and retention responsibility | Cloudflare account owner: 待业务方确认; Analytics backup: 待业务方确认 | AdSense consent configuration user-verified; Cloudflare live, account roles pending | Business selected Cloudflare Web Analytics as a free cookie-free baseline. It records page/performance metrics only and does not support custom events. User-supplied dashboard evidence shows 4 homepage page views and 1 visit in the prior 24 hours. The user reports published AdSense European consent messaging with Google-only options and normal post-rejection page behaviour. | Cloudflare primary/backup access is not yet recorded. User reports/screenshots must be retained as operating evidence. | Retain the AdSense and Cloudflare evidence. Name Cloudflare primary owner and backup Analytics viewer; do not add custom events or another analytics provider. |
| 3. Privacy Policy; Cookie / consent approach for analytics and advertising | Audit performed by Codex; final wording deployed; operational evidence owner: 待业务方确认 | AdSense technical configuration user-verified; Cloudflare wording and beacon deployed | Privacy and Cookie Policy wording was updated for Cloudflare Web Analytics before the beacon release. The user reports the published European message displayed, offered Google-only management options, and did not break the site after rejection. The public homepage, Privacy Policy and Cookie Policy were checked after the Cloudflare beacon release. | The AdSense configuration result is user-reported until screenshots or an AdSense settings export are retained. Jurisdiction-specific legal approval remains a business/legal responsibility. | Retain dated AdSense and Cloudflare evidence; have the accountable business/legal owner approve the operating record. Repeat the check after any CMP, provider or policy change. |
| 4. Contact / waitlist receiving endpoint; owner; permitted data; reply SLA | Receiver owner: 待业务方确认; Backup: 待业务方确认; SLA owner: 待业务方确认 | 待业务方确认 | `src/pages/contact.astro` displays `hello@flowlight.me`; commercial pages retain `contact-intent` / `request access` boundaries; no form endpoint, mailbox-routing proof, approved receipt test, data inventory, retention/deletion rule, triage record, SLA, or escalation record is present. The contact page explicitly does not promise a response time. | A displayed address is not evidence of receipt, triage, permitted-data handling, or a reply process. Contact intent must not imply booking, payment, email delivery, intake, or service completion. | Name primary/backup receivers and SLA owner; prove the real receiver with an approved non-personal test; define permitted fields, prohibited/sensitive data, retention/deletion, triage, SLA, and escalation; keep the current intent-only wording until that process is confirmed. |
| 5. Official-source fact-review responsibility; triggers; audit trail | Primary reviewer: 待业务方确认; Backup reviewer: 待业务方确认 | 待业务方确认 | `src/pages/editorial-policy.astro` requires official-source-first checks and identifies high-risk facts, but it names no reviewers and provides no review queue, trigger rule, approval record, or retained correction log. | Content policy is not an accountable review workflow. Time-sensitive requirements, fees, dates, centres, accepted certificates, eligibility, and policy claims lack a checkable business owner and evidence trail. | Name primary/backup reviewers; define mandatory triggers (official-source change, correction report, and edits to high-risk facts); require source URL/date and reviewer decision; retain review and correction records in an agreed location. |
| 6. Release primary/backup; formal rollback primary/backup and authority | Release primary: 待业务方确认; Release backup: 待业务方确认; Rollback primary: 待业务方确认; Rollback backup: 待业务方确认 | 待业务方确认 | The 2026-07-13 record identifies DNS target, branch, target commit, build, public smoke check, and preserved prior artifact, but names no authorised releaser or rollback authority. The rollback artifact has not had a restoration drill. | Technical evidence for one release is not delegated authority for future publication or incident recovery. | Business names all four roles; records the release approval point, rollback incident thresholds, communication path, restoration verification, and post-incident record; conduct any restoration drill only under separately approved release scope. |
| 7. Fixed release process: production branch; target-commit approval; build/smoke record; rollback commit/artifact; incident authorization | Process approver: 待业务方确认; Record owner: 待业务方确认; Incident authorizer: 待业务方确认 | 待业务方确认 | The recorded 2026-07-13 flow was `main` → target `b15b14e` → DNS target `107.150.102.145` → server build/staged `dist` → `/var/www/flowlight.me/public/dist`, with `nginx -t`, reload, public smoke check, and prior artifact retained. No approved SOP, target-commit sign-off, mandatory record template, or incident authorization flow is recorded. | An observed release does not establish mandatory future branch, approval, evidence, rollback, or incident procedures. | Approve and store an SOP requiring production branch, DNS target confirmation, approved target commit, approver, build/test/launch-check and smoke evidence, releaser, rollback commit/artifact location, rollback authorizer, incident communication, and restoration verification for every release. |

## Explicit Phase 1 gate

**Result: 暂不启动阶段 1。** Search Console is deferred and AdSense consent configuration is user-verified, but the remaining gate is closed because Cloudflare account/owner evidence, contact receiver, reply SLA, official-source reviewer, release owner, rollback authority, and a fixed branch/target/rollback procedure remain incomplete.

Until the gate is opened in writing:

- Do not add or expand GA, GTM, PostHog, Plausible, forms, email, payment, or any other third-party service. Install the Cloudflare Web Analytics beacon only in its separately authorised, page/performance-only implementation window. Do not add new AdSense placements without a separate review.
- Do not collect personal information or send tool results to any service.
- Keep all commercial and contact paths as current `contact-intent` / `request access` language only; do not imply payment, registration, email delivery, review acceptance, or manual-service completion.
- Permitted maintenance remains limited to official-source content verification and public route-health checks in separately scoped windows.

When every row above becomes **Confirmed**, open a new, separately authorized Phase 1 window. Its implementation limit is the minimal privacy-safe event set only: route selection, tool completion, official outbound-link click, guide CTA, and contact intent. It must exclude tool results and all personal information.
