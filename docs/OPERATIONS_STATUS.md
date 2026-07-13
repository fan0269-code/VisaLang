# VisaLang Operations Status

Updated: 2026-07-13
Window: Open Design final UI production release

## Decision at a glance

- **Technical deployment baseline: confirmed for the current release.** On 2026-07-13, the Open Design final UI target `ef1f9dca9e5add2ea0a88a04a7eaf93663f800da` was pushed to `origin/main`, deployed to the current `flowlight.me` DNS target, and synchronized as static output to the current `www.flowlight.me` DNS target. Public smoke checks returned HTTP 200 for the checked URLs.
- **Current production hosts: split by DNS for this release.** `flowlight.me` resolved to `107.150.102.145`; `www.flowlight.me` resolved to `43.162.126.37`. Both hosts were treated as current production targets for this release. Reconfirm DNS before every deployment.
- **Business/operations baseline: incomplete.** No required item below has both named primary/backup responsibility and current, inspectable evidence. Page copy, an email address, a legacy script, or an undeployed configuration is not service-availability evidence.
- **Phase 1 decision: 暂不启动阶段 1.** Search Console is deferred from the current review; it is not confirmed. Do not add analytics, lead capture, or conversion work until the remaining applicable gate items are confirmed.
- **Analytics, advertising and privacy decision: AdSense consent configuration is user-verified; Cloudflare Web Analytics is live.** Business selected Cloudflare Web Analytics as the long-term free, cookie-free baseline and accepted that it does not support custom events. The European consent message was published after the matching policies were deployed; the user reports that the regional test showed the message, Google-only management options, and normal page behaviour after rejection. Cloudflare dashboard evidence supplied by the user shows 4 homepage page views and 1 visit in the prior 24 hours, confirming initial data receipt. Retain the screenshots/exports as operational evidence. The remaining analytics gate item is a primary and backup account-access record.

## Deployment and rollback facts

| Item | Owner | Status | Evidence | Gap | Next action |
| --- | --- | --- | --- | --- | --- |
| Production DNS target | Server / release owner: 待业务方确认 | Confirmed for this release | `flowlight.me` resolved to `107.150.102.145`; `www.flowlight.me` resolved to `43.162.126.37` during the Open Design final UI release. | Named accountable owner is not recorded; DNS can change and must be checked per release. Split apex/www hosting increases release risk. | Record release operator and require DNS target confirmation before every deployment. |
| Production static root | Server / release owner: 待业务方确认 | Confirmed | Nginx on `107.150.102.145` serves `/var/www/flowlight.me/public/dist` with `index.html`. | Named accountable owner is not recorded. | Business records the release operator and backup operator. |
| Server source and target commit | Server / release owner: 待业务方确认 | Confirmed for 2026-07-13 release | Local `HEAD` and `origin/main` resolved to `ef1f9dca9e5add2ea0a88a04a7eaf93663f800da`; `107.150.102.145:/var/www/flowlight.me/source` resolved to `ef1f9dc`; `43.162.126.37:/var/www/flowlight.me/source` also resolved to `ef1f9dc` when checked with `sudo git` because normal `ubuntu` Git access reports dubious ownership. | No named person owns future target-commit approval; public HTML still has no deploy-version marker. The `www` host's source ownership and Node version need maintenance. | Record the selected target commit, approver, build output and public version evidence for every release. Fix `www` host Git ownership / Node version before relying on server-side builds there. |
| Production health checks | Server / release owner: 待业务方确认 | Confirmed for this release | On the production server, `npm audit --json --registry=https://registry.npmjs.org` returned 0 vulnerabilities and `npm run launch-check` returned 24 checks, 0 failures, `READY`. | This confirms the current server source only; it is not a substitute for future release checks. | Keep audit and launch-check in each production release or post-release record. |
| Rollback artifact | Rollback authority: 待业务方确认 | Recorded, not drill-verified | Before the Open Design final UI release, the existing static output was preserved at `107.150.102.145:/var/www/flowlight.me/releases/20260713T080850Z-pre-ef1f9dc-dist` and `43.162.126.37:/var/www/flowlight.me/releases/20260713T080853Z-pre-ef1f9dc-dist`. Earlier artifacts remain historical release records. | Restoration has not been exercised; no formal rollback authorizer is recorded. | Name the rollback authorizer and run a separately approved restoration drill. |
| Fixed release / rollback flow | Release owner and rollback authority: 待业务方确认 | Partially evidenced | The 2026-07-13 Astro 7 release record identifies `main` target `194e883`, DNS target `107.150.102.145`, production publish directory `/var/www/flowlight.me/public/dist`, rollback artifact, server audit, server launch-check, and public smoke checks. | The mandatory approver, release record format, and incident rollback authorization are not confirmed as an operating procedure. | Approve a written SOP that records branch, target commit, DNS target, build time, smoke result, rollback commit/artifact, releaser, and rollback authorizer for every release. |

## Hosts excluded from current production release

| Host | Finding | Release decision |
| --- | --- | --- |
| `43.162.126.37` | SSH worked and the host had `/var/www/flowlight.me/public/dist`. During the Open Design final UI release, `www.flowlight.me` resolved here while the apex domain resolved to `107.150.102.145`. The host's Node.js version was `v20.20.2`, below Astro 7's `>=22.12.0` requirement, so server-side build failed and the already verified local `dist` artifact was synchronized to the publish directory instead. | Treated as current production for `www.flowlight.me` while DNS points here. Upgrade Node to `>=22.12.0` and fix Git safe-directory/ownership before relying on standard server-side builds here. |
| `8.218.193.140` / SSH alias `aliyun` | SSH was blocked by host-key mismatch. Reported ED25519 fingerprint: `SHA256:yFIeAuRfz70RkuQc+pcY2imBex745Z2IjqQOyZfWNGA`. | Do not use until the server owner verifies and intentionally updates the known host key. |

## Public smoke check

Recorded release check: 2026-07-13 after publishing `194e883b183aba981404754f45c0759d2e4e3e3c`.

The URLs below returned HTTP 200 during the Astro 7 post-release review. This proves public reachability for the checked URLs only; it does not confirm Search Console, analytics access, contact handling, or any business responsibility.

| URL | HTTP | Check purpose |
| --- | ---: | --- |
| `https://flowlight.me/` | 200 | Homepage |
| `https://flowlight.me/tools/` | 200 | Tools index |
| `https://flowlight.me/germany-family-reunion-a1/` | 200 | Germany A1 hub |
| `https://flowlight.me/germany-b1-settlement-citizenship/` | 200 | Germany B1 hub |
| `https://flowlight.me/guides/goethe-b1-germany-settlement-work/` | 200 | B1 guide |
| `https://flowlight.me/zh/germany-family-reunion-a1/` | 200 | Chinese A1 hub |
| `https://flowlight.me/pricing/` | 200 | Pricing |
| `https://flowlight.me/partners/` | 200 | Partners |
| `https://flowlight.me/route-review/` | 200 | Route Review |
| `https://flowlight.me/sitemap-index.xml` | 200 | Sitemap index |

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
