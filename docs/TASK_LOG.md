# VisaLang Task Log

Updated: 2026-07-13

## Phase 2 content / SEO / quality audit window — 2026-07-13

Scope: narrow content, SEO metadata, guide-link, and quality review. No deployment, release, new business line, large page batch, tool logic, pricing, partners, Route Review commercial flow, analytics, advertising, dependency, deployment-config, UI polish, or homepage hero work was changed.

Completed:

- Added `docs/PHASE_2_CONTENT_SEO_QUALITY_AUDIT.md` with findings, allowed-scope decisions, excluded work, and human review items.
- Fixed the Germany A1 route hub so the related guide cards render in route-decision order instead of update-date order.
- Tightened several guide SEO descriptions that were too short or too long, without adding new policy, fee, timing, acceptance, exemption, or eligibility claims.
- Added a content-integrity guard requiring guide metadata descriptions to stay concise and specific.

Official-source boundary:

- A1 / B1 high-risk wording hits were reviewed as a scan. The current A1 / B1 content mostly uses the risky terms to deny over-claims and point readers back to the competent authority or official centre.
- Did not invent route-level official verification dates, fixed fees, fixed result times, accepted-certificate guarantees, exemption conclusions, or individual eligibility findings.

Verification:

- `npm test` — passed, including route tools, commercial pages, A1 cluster, B1 cluster, content integrity, UI/route/tool/SEO/accessibility/migration checks.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.

## 阶段 1 业务证据补全（无代码）— 2026-07-13

Scope: only complete, verify, and align business-responsibility/evidence records in `docs/OPERATIONS_STATUS.md`, `docs/PROJECT_CONTEXT.md`, and `docs/TASK_LOG.md` for the seven Phase 1 entry requirements. Existing source, deployment configuration, third-party services, production servers, `dist/`, and root legacy HTML were read-only or untouched.

Business information received:

- The business supplied the seven required evidence categories, evidence rules, stop rules, and allowed document scope.
- No real responsible person's name, business-approved explicit owner role, account-role evidence, evidence repository path, approved SLA, approved test-email scope, release authorization, rollback authorization, or current drill record was supplied in this window. No missing value was inferred or backfilled.

Status separation:

- **本地源码状态**：本窗口开始时 `HEAD` 与 `origin/main` 均为 `1d8770cc11ad03145590ee51782a79cd8c848fb0`。工作区已有与本窗口无关的指南库展示代码和 Task Log 改动；均保留且未发布。
- **线上部署状态**：2026-07-13 20:20 CST 的只读复核中，apex 首页、`www` 首页、sitemap index、联系页及隐私/Cookie 页面返回 HTTP 200；两个首页含 Cloudflare Web Analytics beacon，线上 Privacy/Cookie 页面含 Cloudflare 与 AdSense 说明。公开 HTML 无版本标记，本窗口未登录服务器，故线上精确 commit 与当前回滚路径有效性为待业务方确认。
- **业务/运营就绪状态**：不满足阶段 1 准入；七项中 0 项同时具备已命名负责人和直接对应的当前可检查证据。页面文案、邮箱字符串、脚本存在和历史发布记录未被当作真实权限、收件能力或责任归属证据。

Seven-item result:

- Search Console 或等价搜索监测：公开 sitemap 可检查；负责人/备份制度、平台/属性、访问角色、提交状态、查看路径和复核节奏待业务方确认。
- Analytics：公开 beacon 与政策说明可检查；账户/数据负责人、备份查看人、当前账户角色、面板数据查看方式、隐私/同意要求及批准人、证据保存位置和复核日期待业务方确认。
- 联系真实收件、分流与保留：仅能检查到 `hello@flowlight.me` 字符串；未获准发送测试邮件。实际送达、收件/分流负责人、数据保留负责人、允许/禁止数据、保留/删除规则和升级路径待业务方确认。
- 联系 SLA：负责人、目标时限、工作时间/适用范围、计时起点、超时升级规则和响应记录位置待业务方确认。
- 官方来源与高风险事实复核：可检查到 official-source-first 政策和历史审计样例；主备负责人、固定节奏、强制触发条件、持续审计台账和纠错记录待业务方确认。
- 发布：可检查到历史发布技术记录；授权发布负责人、备份/升级方式、批准点、目标 commit 批准证据和验证记录位置待业务方确认。
- 回滚：可检查到历史发布目录和两个回滚产物路径；负责人/授权人、触发阈值、当前生产主机/发布目录、实际回滚 SOP、沟通批准流程、恢复验证和有效演练证据待业务方确认。

Decision:

- **暂不启动阶段 1。** 七项未全部同时具备已命名负责人和可检查证据。

Not changed:

- No application code, route/content body, tool or commercial logic, analytics/form/email/payment/advertising integration, deployment configuration, server state, production artifact, or legacy root HTML was changed by this window.

Remaining risks and next prerequisite:

- Public reachability does not identify the deployed commit or prove operational ownership.
- The smallest next window remains a no-code business-evidence handoff/review: the business supplies the named owners and the exact minimal materials listed in each `docs/OPERATIONS_STATUS.md` row; an authorized reviewer only checks and records them. The contact test and any rollback drill remain excluded until separately approved. Only after all seven rows pass may a separately scoped minimal implementation window be considered.

Verification:

- `git diff --check` — passed after the three-document consistency review.

Remaining manual checks:

- Before future publication or route expansion, manually recheck any page that would state a fee, result time, accepted certificate, exemption, or eligibility conclusion.
- If the A1 route hub needs a route-level official-source check date later, verify every listed official entry point first instead of copying guide-level dates upward.

## Phase 2 Germany B1 content quality window — 2026-07-13

Scope: continue the content-quality plan after the A1 audit by tightening the Germany B1 settlement/citizenship cluster. No A1 content, Header/Footer, tool engine, global styling, deployment configuration, analytics, advertising, pricing, partners, or route-review commercial flow was changed.

Completed:

- Added `docs/PHASE_2_B1_CONTENT_AUDIT.md` as the B1 source and editorial boundary record.
- Added `tests/germany-b1-cluster.test.js` and wired it into `npm test`.
- Rechecked the B1 cluster as 13 existing guide pages; no new B1 slug was added.
- Updated the B1 hub timestamp and the audited B1 guides' source-check dates.
- Tightened high-risk B1 guidance so language proof, civic knowledge, residence history, livelihood/income, insurance, housing, identity, documents, fees, appointments, and procedure stay separate.
- Removed unsafe universal planning language from the B1 fee/booking and study-plan pages; both now require authority acceptance and local-centre terms before booking or relying on a schedule.

Official-source boundary:

- Used BAMF settlement/residence, naturalisation, and integration-course final-exam pages; Goethe B1 / German examinations pages; telc B1 / centre-finder pages; and the German Government naturalisation starting point only within their stated scope.
- Did not add fixed fees, result times, retake windows, appointment waits, accepted-certificate guarantees, exemption conclusions, or individual eligibility findings.
- The competent authority remains the source of settlement/citizenship acceptance and procedure; the official or authorised centre remains the source of local exam logistics.

Verification:

- `node tests/germany-b1-cluster.test.js` — passed.
- `npm test` — passed, including route tools, commercial pages, A1 cluster, B1 cluster, content integrity, UI/route/tool/SEO/accessibility/migration checks.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.

Remaining manual checks:

- Before a reader books, pays, submits, or changes an application plan, manually check the competent local authority's current B1/civic-knowledge/document/procedure instruction and the selected centre's current fee, ID, result, certificate, cancellation, rescheduling, and retake rules.
- Do not open a second-route expansion until the plan's data prerequisites are met; if continuing content work without those prerequisites, keep deepening A1/B1 official-source quality rather than creating thin new pages.

## Astro 7 production post-release record and health review — 2026-07-13

Scope: record the already-published Astro 7 security upgrade and run a lightweight production health review. No content, UI, SEO, routes, commercial pages, analytics, advertising, deployment configuration, or dependencies were changed.

Release record:

- Target commit: `194e883b183aba981404754f45c0759d2e4e3e3c`.
- Release purpose: upgrade `astro` from 5 to 7, add explicit `@astrojs/markdown-remark`, and remove the Astro / nested `esbuild` vulnerabilities reported by `npm audit`.
- Publication window: Astro 7 production release was completed before this post-release review; the preserved pre-release artifact timestamp is `20260713T044703Z`, and this review was run on 2026-07-13 around 13:02 CST / 05:02Z.
- Production DNS target: `flowlight.me` and `www.flowlight.me` both resolved to `107.150.102.145`.
- Local git state after `git fetch origin main`: `HEAD` and `origin/main` both resolved to `194e883b183aba981404754f45c0759d2e4e3e3c`.
- Production server source: `ubuntu@107.150.102.145:/var/www/flowlight.me/source` resolved to `194e883b183aba981404754f45c0759d2e4e3e3c`.
- Production publish directory: `/var/www/flowlight.me/public/dist`.
- Rollback artifact: `/var/www/flowlight.me/releases/20260713T044703Z-pre-194e883-dist`.

Production verification:

- Server `npm audit --json --registry=https://registry.npmjs.org`: 0 vulnerabilities (`info: 0`, `low: 0`, `moderate: 0`, `high: 0`, `critical: 0`, `total: 0`).
- Server `npm run launch-check`: passed; 98 generated pages, 24 checks, 0 failures, `READY`.
- Public smoke checks:
  - `https://flowlight.me/`: HTTP 200.
  - `https://flowlight.me/tools/`: HTTP 200.
  - `https://flowlight.me/germany-family-reunion-a1/`: HTTP 200.
  - `https://flowlight.me/germany-b1-settlement-citizenship/`: HTTP 200.
  - `https://flowlight.me/guides/goethe-b1-germany-settlement-work/`: HTTP 200.
  - `https://flowlight.me/zh/germany-family-reunion-a1/`: HTTP 200.
  - `https://flowlight.me/pricing/`: HTTP 200.
  - `https://flowlight.me/partners/`: HTTP 200.
  - `https://flowlight.me/route-review/`: HTTP 200.
  - `https://flowlight.me/sitemap-index.xml`: HTTP 200.

Risk and boundary:

- No unresolved production health risk was found in this review: DNS, production source commit, audit, launch-check, and required public URLs all matched the expected state.
- Remaining non-technical operating risks are unchanged from `docs/OPERATIONS_STATUS.md`: named release/rollback owners, rollback authority, and formal restoration drill are still business-operation follow-ups.
- No redeploy was run.

## Astro major upgrade assessment and controlled fix — 2026-07-13

Scope: evaluate and repair the `npm audit` findings rooted in `astro@5.18.2` and its nested `esbuild@0.27.7` with the smallest controlled framework upgrade. No page copy, UI styling, routes, SEO/schema, commercial pages, analytics, advertising, deployment configuration, or unrelated documentation was changed.

Upgrade candidate review:

- `astro@6.4.8`: SemVer-major from Astro 5. It is above the Astro advisory fix thresholds (`<6.1.6`, `<6.1.10`, `<6.3.3`, `<6.4.6`) and removed the previous high-severity Astro advisories, but `npm audit --json --registry=https://registry.npmjs.org` still reported 2 low vulnerabilities because Astro 6 kept `astro/node_modules/esbuild@0.27.7` in the vulnerable range. Not accepted.
- `astro@7.0.7`: SemVer-major from Astro 5 and the version suggested by npm audit. It depends on `esbuild@^0.28.0`; after install, `npm audit --json --registry=https://registry.npmjs.org` reported 0 vulnerabilities. Accepted after full local release-gate verification.

Implemented:

- Updated `astro` from `^5.18.2` to `^7.0.7`.
- Added `@astrojs/markdown-remark@^7.2.1` as an explicit dependency because `src/data/article-sections.ts` imports it directly and Astro 7 no longer left that transitive package resolvable for the project build.
- Updated `package-lock.json` through npm install only. `npm audit fix --force` was not used.

Verification:

- Pre-upgrade audit: 2 vulnerabilities total, 1 low and 1 high, rooted in direct `astro` and nested `astro/node_modules/esbuild`.
- Astro 6 trial audit: 2 low vulnerabilities remained, both through nested `esbuild`.
- Final audit on Astro 7: 0 vulnerabilities.
- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.
- Follow-up clean-install verification after `npm ci --registry=https://registry.npmjs.org` — passed: `npm test`, `npm run build`, `npm run launch-check`, `npm audit --json --registry=https://registry.npmjs.org`, and `git diff --check` all remained clean.

Manual confirmation:

- Production was not deployed in this window.
- Recommended next human check before release: review the dependency-only diff, confirm the team accepts the Astro 7 framework-major jump, then run the normal publish decision separately.

## Dependency security audit window — 2026-07-13

Scope: verify the current `npm ci` / `npm audit` dependency security warnings and decide whether a minimal, controlled upgrade is available. No page content, UI styling, route logic, commercial page, analytics/advertising configuration, deployment script, or unrelated documentation was changed.

Audit result:

- Initial `npm audit --json` against the configured `https://registry.npmmirror.com` registry failed because that mirror does not implement npm's security audit endpoint.
- Re-ran `npm audit --json --registry=https://registry.npmjs.org`; confirmed 2 vulnerabilities total: 1 low and 1 high.
- Direct vulnerable dependency: `astro@5.18.2`.
- Indirect vulnerable dependency: `astro`'s bundled `esbuild@0.27.7`.
- `npm audit` reports the available automatic fix as `astro@7.0.7`, marked as a SemVer-major update.

Decision:

- No non-breaking fix is available inside the current `astro@^5.18.2` range; `npm view astro@5` shows `5.18.2` as the latest Astro 5 release.
- A patched Astro line exists in later majors, but moving from Astro 5 to Astro 6 or 7 is a framework major upgrade and was not applied in this security-only window.
- `npm audit fix --force` was not used.
- Current production risk is limited by the site being built as static Astro output, but the direct dependency still affects the build framework and any future SSR/server-island/dev-server usage. Treat this as a build-chain and framework-surface risk rather than a confirmed exploit in the current static pages.

Follow-up trigger:

- Open a separate controlled Astro-major-upgrade window if the business accepts the migration risk. That window should review Astro 6/7 breaking changes, update dependencies deliberately, run the full release gate, and visually smoke-check key pages before any production deployment.

## Open Design UI production release — 2026-07-13

Scope: publish the already reviewed Open Design UI layer to the current production host. No guide text, route logic, tool calculations, analytics, advertising, policy copy, or deployment script was changed during this release.

Released commits:

- `12bd8c2` — production target and analytics baseline documentation.
- `b15b14ebce0de1c3bcd8d25522bffd5b1c07a395` — Open Design UI layer and audit screenshots.

Production deployment:

- DNS for `flowlight.me` and `www.flowlight.me` resolved to `107.150.102.145` before deployment.
- Production source moved from `16a94dc` to `b15b14e`.
- Production Nginx serves `/var/www/flowlight.me/public/dist`.
- Pre-release production artifact was saved at `/var/www/flowlight.me/releases/20260713T035302Z-pre-b15b14e-dist`.
- Server-side build generated 98 pages, then Nginx configuration test and reload passed.

Public smoke check:

- `https://flowlight.me/`: HTTP 200 and expected homepage marker.
- `https://flowlight.me/tools/`: HTTP 200 and expected tools marker.
- `https://flowlight.me/germany-b1-settlement-citizenship/`: HTTP 200 and expected B1 hub title.
- `https://flowlight.me/guides/goethe-b1-germany-settlement-work/`: HTTP 200 and expected B1 content marker.
- `https://flowlight.me/guides/goethe-b1-vs-telc-b1/`: HTTP 200 and expected DTZ / Goethe / telc title.
- `https://flowlight.me/zh/guides/german-family-reunion-language-requirement/`: HTTP 200 and expected Chinese page title.
- Live CSS returned HTTP 200 and contained the new Open Design primary colour variable.

## B1/A1 verification-guide release and production-target correction — 2026-07-13

Scope: release the three verification-first content updates and record the correct production target. No tool logic, pricing page, commercial flow, analytics, advertising configuration, deployment script, or UI styling was changed in this release.

Released files:

- `src/content/guides/goethe-b1-germany-settlement-work.md`
- `src/content/guides/goethe-b1-vs-telc-b1.md`
- `src/pages/zh/guides/german-family-reunion-language-requirement.astro`

Local release gate:

- `npm test -- --runInBand`: passed.
- `npm run launch-check`: passed; 24 checks, 0 failures, `READY`.
- `git diff --check` for the three target files: passed.

Git and production deployment:

- Released commit: `16a94dc3a9509e10f9d84c21f436fe80d3f0bd7c`.
- Pushed to `origin/main` before deployment.
- DNS for `flowlight.me` and `www.flowlight.me` resolved to `107.150.102.145` during the release check. This is the current production target used for the live deployment.
- Production server source at `/var/www/flowlight.me/source` resolved to `16a94dc` after deployment.
- Production Nginx serves `/var/www/flowlight.me/public/dist`.
- Pre-release production artifact was saved at `/var/www/flowlight.me/releases/20260712T202525PDT-pre-16a94dc-dist`.
- Server-side `npm run build` completed and Nginx configuration test/reload passed during the deployment script.

Public smoke check:

- `https://flowlight.me/`: HTTP 200.
- `https://flowlight.me/guides/goethe-b1-germany-settlement-work/`: HTTP 200 and contained the updated content marker.
- `https://flowlight.me/guides/goethe-b1-vs-telc-b1/`: HTTP 200 and contained the updated title/content marker.
- `https://flowlight.me/zh/guides/german-family-reunion-language-requirement/`: HTTP 200 and contained the updated Chinese scenario section.
- `https://flowlight.me/germany-b1-settlement-citizenship/`: HTTP 200.
- `https://flowlight.me/zh/germany-family-reunion-a1/`: HTTP 200.

Production-target exclusion notes:

- `43.162.126.37` was reachable and had a compatible `/var/www/flowlight.me/public/dist`, but it was not the DNS target for `flowlight.me` during the release. It must not be treated as the live production host unless DNS changes.
- SSH alias `aliyun` / `8.218.193.140` failed host-key verification with reported ED25519 fingerprint `SHA256:yFIeAuRfz70RkuQc+pcY2imBex745Z2IjqQOyZfWNGA`. Do not use it for release work until the server owner verifies the host key.
- Future releases must confirm `dig +short flowlight.me A` before deployment and must publish only to the host currently serving the domain.

## Cloudflare Web Analytics beacon installation — 2026-07-13

Scope: add the user-provided official Cloudflare Web Analytics beacon to the shared Astro layout and align the two public policy pages with the selected free, cookie-free page/performance-only scope. No custom events, user-input analytics, contact collection, advertising configuration, or deployment was changed in this window.

Completed:

- Added the site-specific Cloudflare beacon to `src/layouts/BaseLayout.astro`, so every Astro route receives one beacon.
- Updated Privacy and Cookie Policies to replace the future Plausible wording with the current Cloudflare page/path/referrer/country/device/performance scope.
- Explicitly exclude tool answers, free text, contact details, document details, query strings, and custom events from analytics.

Release and verification:

- Released in `ab28655` and deployed from `main` to `/var/www/flowlight.me/public/dist` on 2026-07-13.
- `npm test`, `npm run launch-check` and `git diff --check` passed before release.
- Server source resolves to `ab28655`; the public homepage, Privacy Policy and Cookie Policy each expose the Cloudflare beacon, and the two policy pages contain the Cloudflare wording and 2026-07-13 update date.
- Cloudflare dashboard evidence supplied by the user shows the `flowlight.me` site created 19 minutes earlier with 4 homepage page views and 1 visit in the prior 24 hours. This confirms initial data receipt; do not add custom events.

## Free analytics scope decision — 2026-07-13

Decision: replace the previously selected paid Plausible direction with Cloudflare Web Analytics as the long-term free baseline. The business accepts the product trade-off: this provides page views, paths, referrals, country/device context and performance metrics, but no custom route, tool, outbound-link, guide-CTA or contact-intent events.

Boundary:

- No Cloudflare account, beacon, code, policy wording, deployment or data collection was changed in this decision window.
- Account primary/backup access must be recorded before a separate beacon-implementation window.

## AdSense European consent publication — 2026-07-13

Scope: account-side publication and regional user verification only. No source code, policy wording, analytics implementation, deployment configuration, or other service was changed in this step.

User-confirmed result:

- The European regulations message was published in AdSense after the matching policies were deployed.
- A regional test showed the consent message, Google-only management options, and normal page behaviour after rejection.

Evidence boundary:

- This is user-reported verification. Retain a dated screenshot or AdSense settings export as the operating record; do not treat this log as independent legal approval.
- Plausible remains unconfigured and must not be installed until account ownership, backup access, retention/deletion and DPA review are documented.

## Privacy and Cookie Policy alignment — 2026-07-13

Scope: align the Astro Privacy Policy and Cookie Policy with the chosen AdSense direction, the drafted European consent message, and the fact that Plausible is not yet enabled. No advertising, analytics, consent-message, account, deployment, or other third-party configuration was changed.

Completed:

- Updated `src/pages/privacy-policy.astro` to disclose the retained Google AdSense script, consent-dependent advertising choices, local tool-progress storage, and the limited future Plausible event scope without claiming that Plausible is live.
- Updated `src/pages/cookie-policy.astro` to remove the incorrect Plausible-cookie claim; document advertising/consent storage, local tool-progress storage, and the future no-cookie Plausible design.
- Preserved the limits against collecting tool answers, free text, email addresses, document details, or other user-provided identifiers in analytics events.

Verification:

- `npm test`: passed.
- `npm run build`: passed; 98 static routes generated.
- `npm run launch-check`: passed; 24 checks, `READY`.
- `git diff --check`: passed.

Not yet complete:

- The updated policies were released in `b9f83b9` and deployed from `main` to `/var/www/flowlight.me/public/dist` on 2026-07-13. The public `/privacy-policy/` and `/cookie-policy/` pages returned HTTP 200 and expose the 2026-07-13 date plus the new AdSense/Plausible wording.
- The AdSense European consent message remains a user-prepared draft. Publish it only now that the matching policies are live, then run a post-publication regional verification before treating advertising consent as complete.
- Plausible remains unconfigured and must not be added before its account owners, retention/deletion decision and DPA review are recorded.

## Phase 2 Germany A1 content close-out — 2026-07-13

Scope: final evidence and release-gate record for the seven English Germany A1 family-reunion guides. No route, layout, tool, navigation, Chinese page, commercial surface, analytics, advertising, deployment, or legacy-file change was made in this close-out.

Completed editorial files:

- `src/content/guides/german-family-reunion-language-requirement.md`
- `src/content/guides/goethe-a1-vs-telc-a1.md`
- `src/content/guides/goethe-a1-test-centers.md`
- `src/content/guides/goethe-a1-fees-by-country.md`
- `src/content/guides/goethe-a1-retake-policy.md`
- `src/content/guides/german-a1-documents-checklist.md`
- `src/content/guides/german-a1-exam-booking-timeline.md`

Evidence boundary:

- The audit in `docs/PHASE_2_A1_CONTENT_AUDIT.md` records current BAMF, Federal Foreign Office, Goethe-Institut, and telc sources only within their stated scope. The Federal Foreign Office FAQ remained a manual official-source verification link because automated access was blocked.
- The responsible German mission remains the source of current local visa/document instructions and proof acceptance; the selected official local test centre remains the source of current exam product, seat, fee, registration, identification, result, certificate, cancellation, rescheduling, and retake terms. No individual eligibility, acceptance, price, availability, timing, or visa outcome is concluded here.

Release evidence:

- `node tests/germany-a1-cluster.test.js`: passed (`Germany A1 cluster rules passed`).
- `npm test`: passed, including Germany A1, guide-source/compliance, deployment, UI, route, SEO, accessibility, and migration checks.
- `npm run build`: passed; 98 static pages generated.
- `npm run launch-check`: passed; 24 checks passed, 0 failed, `READY`.
- `git diff --check`: passed with no output.

Remaining manual checks:

- Before a reader books, pays, changes an appointment, or submits a visa file, manually check the responsible German mission's current family-reunion instruction and the selected official local centre's current terms.
- Treat any locally unavailable, time-sensitive, or conflicting instruction as a verification stop, not an inferred answer.

## Phase 1 privacy and consent audit — 2026-07-13

Scope: audit the business direction to use Plausible Analytics Cloud Growth and retain AdSense. No code, account setting, consent message, policy wording, deployment, or data collection was changed.

Decision:

- Search Console is deferred from this review and remains unconfirmed.
- Plausible Cloud Growth is conditionally approved as the selected future analytics service, limited to the existing five-event scope and with no event properties or user-provided values. It cannot be deployed before account owners, retention/deletion decision and DPA review are recorded.
- Retaining the current AdSense implementation is **not approved**. The public homepage loads the script but no CMP/consent flow is present, and public policy text describes advertising as future-only. The implementation remains an unresolved risk rather than an authorised advertising state.
- Phase 1 remains closed. The full evidence, official-source links and remediation checklist are in `docs/PHASE_1_PRIVACY_CONSENT_AUDIT_2026-07-13.md`.

## Planning-alignment window — 2026-07-13

Scope: planning, operations and historical-roadmap documentation only. No application page, tool logic, third-party integration, legal copy, deployment configuration, release, or content fact was changed.

Completed:

- Declared `docs/MASTER_EXECUTION_PLAN.md` as the only future execution sequence; `docs/OPERATIONS_STATUS.md` as the current evidence and gate record; `docs/PROJECT_CONTEXT.md` as a project map; and this task log as historical window evidence.
- Marked the traffic and monetization roadmaps as non-authorising historical strategy references, so their older waitlist, tracking, advertising and expansion ideas cannot bypass the current Phase 1 gate.
- Replaced the obsolete “next window is Phase 0” instruction. The technical baseline is recorded; the only next window is a no-code Phase 1 entry-confirmation pass with two valid outcomes: open a separately authorised minimal-event window or keep the gate closed.
- Updated deployment wording: the last recorded release used `f258472…`; current local `main` is `c5838eb`, `origin/main` is `f092be6`, and the public homepage contains Open Design markup, but no public version marker proves the current deployed commit.
- Recorded the visible AdSense loader as an unresolved business/privacy risk. It was not removed or expanded in this documentation-only window; a business/legal decision and, if needed, a separately authorised code-removal window remain required.

Verification:

- Read-only Git check: local `main` remains three commits ahead of `origin/main`.
- Read-only public check: `/`, both Germany hubs, `/tools/`, `/guides/`, `/zh/`, `/pricing/`, and `/contact/` returned HTTP 200.
- Documentation-only change: build, tests, deployment and third-party services were intentionally not run or changed.

Next-window prerequisite:

- Business completes every owner/evidence row in `docs/OPERATIONS_STATUS.md`, including an explicit AdSense/Plausible decision. Until then, Phase 1 remains closed.

## Phase 1 entry-responsibility verification — 2026-07-12

Scope: documentation, repository-state verification, and entry-gate decision only. No application pages, tool logic, factual guide content, visual system, deployment script, Nginx configuration, third-party service, personal-data collection, commit, or deployment was changed.

Completed:

- Re-read the Phase 0/1 sequence in `docs/MASTER_EXECUTION_PLAN.md`, current project context, release record, and operations status. Confirmed the technical release baseline remains: local `main` and `origin/main` resolve to `f25847291d053a927d0b0a2c062474bf9d5a100b`; production was published from that `main` commit to `/var/www/flowlight.me/public/dist`; the prior `7e9cd943…` static artifact remains recorded for rollback.
- Performed a read-only public recheck at 2026-07-12 20:58 Asia/Shanghai: `/`, Germany A1, Germany B1, `/tools/`, `/guides/`, and `/zh/` returned HTTP 200 with the expected titles. This confirms reachability only and does not establish any account, approval, service-receipt, or business-operation evidence.
- Reworked `docs/OPERATIONS_STATUS.md` into the seven required Phase 1 entry items. Every row now explicitly records named primary/backup placeholders, status, evidence, gap/risk, and next action for Search Console; analytics/data retention; privacy/consent; contact receiver/data limits/SLA; official-fact review; release/rollback roles; and the fixed release process.
- Verified only repository-visible configuration. The legacy root `index.html` contains a Plausible loader and the Astro shared layout contains an AdSense loader; the source Privacy/Cookie pages also describe Plausible. None supplies an account, access role, processor/retention decision, legal approval, consent decision, or live-service receipt. `/contact/` displays `hello@flowlight.me`, but no receiving/triage proof, permitted-data rule, SLA, or verified mailbox route was found.
- Marked all business owners and approvals as **待业务方确认**, rather than inferring availability from page copy or legacy documentation. Clarified in `docs/PROJECT_CONTEXT.md` that the 2026-07-11 legacy-production observation is historical and is superseded by the 2026-07-12 live deployment baseline.

Decision:

- **暂不启动阶段 1。** The required business conditions are not all explicitly confirmed. No analytics, lead capture, conversion, payment, mail, form, or other third-party integration may begin in this state.

Residual risks:

- Existing Privacy/Cookie source text and the legacy Plausible loader conflict with the absence of account/access/approval evidence; the Astro layout also contains an AdSense loader. Treat all of these as unverified service/compliance evidence, not as authorization or proof that a service is operating.
- The rollback artifact is preserved but has not been restoration-drill verified. A fixed release path is technically evidenced for this release, but release and rollback authority are not yet an approved operating procedure.
- `hello@flowlight.me` is a contact display string only; its owner, receiving endpoint, retention/deletion handling, triage, and reply SLA remain unknown.

Next-window prerequisite:

- Business must complete every Phase 1 gate row in `docs/OPERATIONS_STATUS.md` with named primary/backup owners and inspectable evidence: Search Console property and sitemap status; analytics account/view access; privacy/consent decision; contact receiver and data handling; reply SLA; official-source reviewers; release and rollback authorities; and an approved branch/target/rollback SOP.
- Only then open a new Phase 1 window, limited to privacy-safe events for route selection, tool completion, official external-link click, guide CTA, and contact intent. It must not transmit tool results or personal information.

## Production release: local `main` deployed — 2026-07-12

Scope: publish the current local `main` after release gates, with a server-side build, a preserved prior static artifact, and public route verification.

Completed:

- Confirmed local `main` and `origin/main` both resolve to `f25847291d053a927d0b0a2c062474bf9d5a100b` (`feat: adopt warm Flowlight UI system`). Local uncommitted material was limited to documentation and unrelated/untracked files, so it was not included in the release target.
- Release gate passed locally: `npm test`, `npm run build`, and `npm run launch-check`; build output contained 98 routes and launch check was `24/24` passed, `READY`.
- Preserved the former production static output (`7e9cd943…`) at `/var/www/flowlight.me/releases/20260712T202600CST-7e9cd943/dist` before changing the live directory.
- Switched server source from `feature/flowlight-rebrand` to `main` at `f258472…`, ran `npm ci` and `npm run build` on the server, staged the output, then published it to `/var/www/flowlight.me/public/dist`.
- `nginx -t` passed before and after publication; Nginx reload succeeded.
- Final public HTTPS check at 2026-07-12 20:27 Asia/Shanghai: `/`, `/germany-family-reunion-a1/`, `/germany-b1-settlement-citizenship/`, `/tools/`, `/guides/`, and `/zh/` all returned HTTP 200 with expected titles.

Residual risks:

- The rollback static artifact is preserved but has not yet been exercised as a restoration drill.
- Business ownership for Search Console, analytics, privacy/consent, contact receiver, reply SLA, and official-source review remains unconfirmed. This continues to block Stage 1 tracking and any lead-capture/commercial activation.

## Phase 0 operational baseline and production smoke check — 2026-07-12

Scope: deployment/rollback contract, public smoke check, operating ownership status, and documentation correction only. No application pages, guide facts, tool logic, third-party services, or deployment files were changed.

Completed:

- Logged into the deployment server after its current SSH host key matched the local known-host record.
- Confirmed Nginx serves `/var/www/flowlight.me/public/dist` with `index.html`; the server source is under `/var/www/flowlight.me/source`.
- Confirmed the active server source is `feature/flowlight-rebrand` at `7e9cd943ef24f247b6513758535ae26b072dbf3e`, while the local checkout's `main` is a different commit. The server output exists, but this does not establish that local `main` is live.
- Performed a public HTTPS smoke check at 2026-07-12 20:19 Asia/Shanghai. `/`, `/germany-family-reunion-a1/`, `/germany-b1-settlement-citizenship/`, `/tools/`, `/guides/`, and `/zh/` all returned HTTP 200 with expected titles.
- Added `docs/OPERATIONS_STATUS.md` as the single current status page for deployment evidence, smoke checks, ownership gaps, and the Phase 1 entry gate.

Risks and blockers:

- The checked-in deployment script pulls `origin main`, but the running server checkout is a feature branch. Do not deploy or describe a local `main` build as live until the release owner selects the intended branch/commit and a rollback commit.
- Search Console, analytics access, privacy/consent, contact receiver, reply SLA, official-source reviewer, and release owner are not yet confirmed. No tracking, lead capture, payment, email delivery, or consultation intake may be activated.

Next-window prerequisite:

- Business owner records the missing responsibilities in `docs/OPERATIONS_STATUS.md` and explicitly chooses the production branch/commit plus rollback point. Once that is done, Stage 1 may be scoped as a privacy-safe, minimal observability window; otherwise continue only official-source content refreshes and public health checks.

This log records current project-map findings, known issues, and recommended next-window boundaries for flowlight.me / VisaLang.

## Production 403 Incident - 2026-07-11

Observed online with a reproducible check:

- `https://flowlight.me/` returned Nginx `403` with the native `403 Forbidden` body.
- `https://flowlight.me/index.html` returned `404`, while `/about/` returned the new Astro page with `200`.
- This means the Nginx document root contained partial Astro output but no root `index.html`; it was not an application-route or content error.

Root cause and repository fix:

- The checked-in deployment script pulled the repository into the Nginx document root, never ran `npm run build`, and never verified or copied `dist/`.
- `deploy/deploy.sh` now keeps source in `/var/www/flowlight.me/source`, installs Node/npm when missing, runs `npm ci` and `npm run build`, blocks publication unless `source/dist/index.html` exists, and synchronizes the complete `dist/` into `/var/www/flowlight.me/public`.
- `deploy/server-init.sh`, `deploy/README.md`, and deployment regression assertions were updated to match this contract.
- The first server build exposed a Node 20 compatibility issue in `/exams/`: `Object.groupBy` was replaced with a reducer, and the deployment target was aligned with the actual Nginx root `/var/www/flowlight.me/public/dist`.

Verification:

- `npm test`: passed, including deployment-contract assertions.
- `npm run launch-check`: passed, 24 checks, `READY`.
- `bash -n deploy/deploy.sh deploy/server-init.sh`: passed.
- Server build after the compatibility fix: 98 pages generated successfully; `dist/index.html` exists and Nginx config validation passed.
- Final production verification: `/`, `/about/`, `/routes/`, `/exams/`, `/tools/`, `/guides/`, `/tools/route-finder/`, `/germany-family-reunion-a1/`, and `/zh/` all returned HTTP 200; homepage title is `Find the language proof required for your route | VisaLang`.
- Server source is synchronized to commit `8fd3174`; the live static output was built from `e31665e` and contains the same application content. The final commit only hardens the future deployment script for `ubuntu + sudo` execution.
- The remote fix could not be applied from this session because the configured `aliyun` SSH host key changed and was correctly rejected by SSH. Confirm the new fingerprint `SHA256:yFIeAuRfz70RkuQc+pcY2imBex745Z2IjqQOyZfWNGA` with the server owner before connecting and running the deployment script.

## Decision Product UI Refactor - 2026-07-11

Role: senior product design, UX architecture, frontend implementation, migration, and release verification.

Completed:

- Kept the Astro and Markdown stack; did not rewrite policy, visa, fee, exam-acceptance, or legal conclusions for UI reasons.
- Added `/routes/`, `/exams/`, and `/tools/` centres and rebuilt the homepage around the route decision task.
- Replaced the old primary navigation with Home, Routes, Exams, Tools, Guides, About, and a route-aware language switch. Pricing and Partners moved under About and footer surfaces.
- Added the shared component and token system documented in `docs/UI_REFACTOR_REPORT.md`.
- Migrated English guides to one conditional article layout, removed the duplicate Germany A1 support shell, and kept one TOC and one disclaimer per generated guide.
- Rebuilt the Germany A1 hub as a seven-step route centre with guide, tool, official-source, last-checked, FAQ, and correction-reporting surfaces.
- Rebuilt Guides as a task library with seven filters, sorting, URL state, mobile drawer, result count, and empty state.
- Unified the library across 54 English and 5 Chinese guide entries and added a working Language filter.
- Added a shared tool layout with WebApplication schema, local progress, restart, copy, print, text export, and clear unsupported-route boundaries.
- Removed the Reminder Planner email field and added local reminder, ICS, copy, print, and text export paths.
- Standardised commercial page states and removed request-access purchase language from unavailable products.
- Corrected two truncated guide slugs and added 301 redirects for them and the legacy static layer.
- After two-axis review, changed unsupported route/checklist output to a hard coming-soon stop, removed default timeline buffers, separated update and official-verification dates, added persistent per-step route progress, labelled all Chinese-to-English transitions, expanded legacy legal redirects, and hardened JSON-LD parsing checks.
- Added a build-time Markdown sectioner so all 54 English articles render the eight required sections once and in a fixed order without rewriting the underlying policy or exam content; added previous/next and next-tool navigation to both English and Chinese guide bottoms.

Verification:

- Pre-change backup: `/tmp/visalang-pre-ui-refactor-20260711.tgz`.
- `npm test`: passed.
- `npm run build`: passed, 98 generated HTML routes.
- Browser checks: 1440×900, 768×1024, and 390×844; no horizontal overflow on checked pages; menu, filters, URL state, Route Finder result, and restart passed; console clean.
- Full final `launch-check` and `git diff --check` recorded in the final handoff after the last documentation pass.

Remaining boundaries:

- Chinese remains a focused Germany A1 path rather than a full-site translation.
- Legacy root static files remain until deployment source-of-truth is independently confirmed; redirects prevent route competition.
- No payment, delivery, email-sending, Route Review intake, or partner-application backend is active.

## Google AdSense Script Install - 2026-07-10

Role: monetization script integration owner.

Scope completed:

- Added the Google AdSense publisher script for `ca-pub-3018617123550799` to the shared Astro page head in `src/layouts/BaseLayout.astro`.
- Kept the change narrow: no ad units, no layout changes, no content changes, no route changes, no package/deploy config changes.
- Verified generated pages include the script, including `/`, `/guides/`, `/zh/`, and `/germany-family-reunion-a1/`.

Verification:

- `npm test`: passed.
- `npm run build`: passed, 79 pages generated.
- `npm run launch-check`: passed, 55 checks, READY.
- `git diff --check`: passed.

Remaining follow-up:

- Add visible ad placements only after Google AdSense approval and a separate UX/compliance pass.
- Review cookie/privacy consent requirements for display advertising in a separate legal/compliance window if ads are activated beyond the loader script.

## Final QA Refresh / Deployment Gate - 2026-07-10

Role: final quality check, build/link/mobile/SEO risk gate, and small-fix owner.

Overall conclusion:

- Can deploy, with manual official-source review still recommended for time-sensitive policy, fee, date, test-center, certificate-acceptance, exemption, retake, and result-timing claims.
- No blocking install, build, route, internal-link, sitemap, robots, canonical, CTA, security-cleanup, or mobile-overflow issue remains after this pass.

Package manager / scripts:

- Used npm because `package-lock.json` is present and no `pnpm-lock.yaml`, `yarn.lock`, or `bun.lockb` was found.
- `package.json` provides `dev`, `build`, `preview`, `test`, and `launch-check`.
- `package.json` does not provide `lint` or `typecheck`, so those commands were not run.

Commands run:

- `npm install`: passed.
- `npm test`: passed.
- `npm run build`: passed; 79 pages generated.
- `npm run launch-check`: passed; 55 checks, 0 warnings, 0 failures, `READY`.
- `npm run dev -- --host 127.0.0.1 --port 4321`: sandbox attempt failed with local listen permission; passed after local-server permission, and checked dev routes returned `200`.
- `npm run preview -- --host 127.0.0.1 --port 4322`: passed after local-server permission; checked preview routes returned `200`.
- `git diff --check`: passed.

Pages checked:

- `/`
- `/guides/`
- `/guides/?category=germany-a1`
- `/germany-family-reunion-a1/`
- `/guides/goethe-a1-fees-by-country/`
- `/guides/goethe-a1-test-centers/`
- `/guides/goethe-a1-retake-policy/`
- `/guides/german-a1-documents-checklist/`
- `/guides/goethe-a1-speaking-topics/`
- `/guides/german-a1-family-reunion-faq/`
- `/guides/goethe-a1-vs-telc-a1/`
- `/guides/german-family-reunion-language-requirement/`
- `/guides/goethe-a1-booking-mistakes/`
- `/guides/goethe-a1-30-day-study-plan/`
- `/about/`
- `/editorial-policy/`
- `/privacy-policy/`
- `/cookie-policy/`
- `/terms/`
- `/affiliate-disclosure/`
- `/zh/`
- `/zh/germany-family-reunion-a1/`

Fixes completed:

- Replaced stale telc Deutsch A1 links with the current `start-german1-telc-german-a1` telc page in the English Germany A1 hub, shared Germany A1 support component, Chinese Germany A1 source data, and relevant guides.
- Replaced stale official-source links that returned 404 in generated output: France Education International DELF/DALF/TCF links, Goethe B1 deep link, OPH YKI link, TEF Canada deep link, IRCC Express Entry language-criteria deep link, and Dutch NT2/CvE entry.
- Updated the source test assertion so Goethe B1 depth pages still require a Goethe official source while using the reachable Goethe examinations page.

Link / navigation result:

- Internal links passed `launch-check`.
- Header, Footer, breadcrumbs, Related guides, Germany A1 route links, CTA/contact links, and language-switch links were present in checked generated pages.
- Checked generated pages had one H1, title, meta description, canonical URL, footer links, and no empty `href`, `href="#"`, or `javascript:` links.
- A stale-link scan of generated output found 0 occurrences of the old known-bad official URLs after the fix.
- External link checker still reports some official sites as bot-blocked, redirected, or timeout-prone, especially BAMF, Canada.ca, IELTS, Migri, and CAPLE. These are not treated as confirmed dead links, but should be manually spot-checked in a real browser.

SEO / sitemap result:

- `launch-check` confirmed generated sitemap, robots, guide `lastmod`, canonical URLs, Article/BreadcrumbList JSON-LD, CollectionPage/ItemList JSON-LD, guide category pages, Chinese pages, and legal noindex handling.
- Duplicate title scan found 0 duplicate generated titles.
- Duplicate meta-description scan found 0 duplicate generated descriptions.
- `/guides/?category=germany-a1` remains an intentionally client-filtered view canonicalizing to `/guides/`; indexable category pages remain under `/guides/category/{category}/`.

UI / mobile / security result:

- Existing generated CSS includes protection for long links, guide tables, card grids, responsive grids, and `min-width: 0` layout constraints.
- No obvious hard-coded wide layout blocker was found in the checked generated pages.
- Security cleanup scan found no empty href, `javascript:` links, public `YOUR_FORM_ENDPOINT`, API key/secret placeholders, `debugger`, or frontend `console.log` matches in the checked source/static areas.
- Legal pages use the shared shell and narrow article layout, not raw default templates.

Content / compliance result:

- Risk-term scan found no recommended guaranteed-pass, leaked-material, copied-answer, or official-authority claims. Matches were in prohibitions, disclaimers, or official-source warnings.
- Thin-content scan still shows several non-core starter pages under roughly 150 body words, but they have updated dates and official-source/disclaimer cues.
- Germany A1 content continues to avoid fixed fee/date/test-center promises and keeps official-source, test-center, embassy, or consulate verification language.

Remaining risks / manual review:

- No `lint` or `typecheck` scripts exist; add them only in a separate engineering hardening window.
- External official links should be spot-checked in a normal browser because some official sites block automated checks or redirect through protection pages.
- BAMF migration overview links timed out or returned bot-protection behavior during automated checking; keep them as manual official-source review items.
- Legacy root static files still coexist with Astro source/output; do not reconcile or delete them without a separate source-of-truth/deploy task.
- The actual server deploy path still needs host access/source-of-truth confirmation if deployment is not Git-based.

Recommended next module:

- Proceed with deployment from the current build if the hosting flow builds from the pushed Astro source.
- After deployment, check production 404s, Search Console sitemap status, and CTA/contact clicks.
- Next content window should deepen remaining thin non-core guides or continue Germany A1 official-source refreshes; content expansion should happen in a new window.

## Guides + SEO Review Window - 2026-07-10

Role: Guides list, guide template, Germany A1 internal-link, and technical SEO owner.

Scope completed:

- Re-read `docs/PROJECT_CONTEXT.md`, `docs/CONTENT_MAP.md`, and this task log before making changes.
- Re-checked `/guides/`, `/guides/?category=xxx`, static guide category pages, `/guides/[slug]/`, `/germany-family-reunion-a1/`, Germany A1 core guides, metadata, canonical URLs, structured data, sitemap, robots, and launch checks.
- Kept the work narrow: no guide-body rewrite, no UI design-system changes, no Header/Footer structure changes, no deploy config changes, and no new fee/date/policy/test-center claims.

Files changed:

- `src/content/guides/german-family-reunion-language-requirement.md`
- `src/content/guides/goethe-a1-vs-telc-a1.md`
- `docs/TASK_LOG.md`

Guides list result:

- `/guides/` is currently a guide library rather than a chronological blog: it shows all 49 English guides, has Popular routes, route overview, search, category pills, country / route / exam / level facets, result count, empty state, and guide cards with title, summary, country, route, exam, level, last updated, related route, and CTA.
- Germany A1 is a visible core route in Popular routes and the route overview.
- Latest guides do not dominate the page.

Category / filter SEO result:

- `/guides/?category=xxx` remains a client-side filtered view and canonicalizes to `/guides/`, so parameter combinations are not treated as separate indexable pages.
- Static pages under `/guides/category/{category}/` are the indexable category aggregation pages with route-specific H1, title, meta description, canonical URL, CollectionPage JSON-LD, and ItemList JSON-LD.
- User wording `telc-deutsch` maps to the existing project slug `germany-telc`; no duplicate category slug was added.
- Sitemap handling is appropriate: generated sitemap includes static category pages, not query-parameter variants.

Guide template result:

- Guide detail pages share `GuideLayout.astro` with Breadcrumb, H1, one-line summary, route metadata box, audience fit, non-fit, decision support, TOC, main content, official verification, common mistakes, next action, Related guides, Last updated, Disclaimer, CTA, and route backlink.
- Guide detail SEO includes canonical, Open Graph article type, Article JSON-LD with published/modified dates, and BreadcrumbList JSON-LD.

Germany A1 related-guide changes:

- `german-family-reunion-language-requirement` now points readers to `goethe-a1-vs-telc-a1`, `german-a1-documents-checklist`, and `goethe-a1-germany-family-reunion`, matching the requirement-check -> exam choice -> documents flow.
- `goethe-a1-vs-telc-a1` now points readers to `goethe-a1-test-centers`, `goethe-a1-fees-by-country`, and `goethe-a1-booking-mistakes`, matching the provider comparison -> centre / price / booking-risk flow.
- Germany A1 shared route support still links every Germany A1 guide back to `/germany-family-reunion-a1/` and exposes the core guide set, including FAQ.

SEO metadata result:

- Germany A1 title and description improvements from the prior SEO follow-up are still in place.
- No keyword-stuffed titles were added.
- No page claims that VisaLang is an official authority.
- No ratings, reviews, prices, Course schema, or fake FAQPage schema were added.

Sitemap / robots / canonical result:

- Generated sitemap includes `/germany-family-reunion-a1/`, English guides, guide category pages, and generated Chinese pages.
- Generated sitemap excludes configured noindex legal pages.
- `public/robots.txt` points to `https://flowlight.me/sitemap-index.xml`.
- Guide pages canonicalize to `/guides/{slug}/`.
- Static category pages canonicalize to `/guides/category/{category}/`.
- Query-filtered `/guides/?category=...` URLs remain non-canonical duplicate views.

Still needs content window:

- Germany A1 short-body pages still worth deepening without changing the current SEO shell: `goethe-a1-test-centers`, `goethe-a1-retake-policy`, `german-a1-documents-checklist`, `goethe-a1-speaking-topics`, `goethe-a1-30-day-study-plan`, `goethe-a1-vs-telc-a1`, and `german-family-reunion-language-requirement`.
- Non-Germany thin starter guides remain content-window work, especially Portugal, Netherlands, Italy, Canada/French, and some TestDaF/telc pages listed in the earlier follow-up section.

Still needs UI window:

- No UI window is required before final QA. A UI sitewide unity pass has already run.
- Optional human screenshot review remains useful for `/guides/`, `/guides/category/germany-a1/`, a representative guide detail page, `/germany-family-reunion-a1/`, and mobile filters.

Verification:

- `npm test`: passed.
- `npm run build`: passed, 79 pages generated.
- `npm run launch-check`: passed, 55 checks, READY.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

## Final QA / Deployment Check Window - 2026-07-10

Role: final quality check and deployment readiness owner.

Overall conclusion:

- Can deploy, with human official-source review items for future content maintenance.
- No blocking build, route, internal-link, sitemap, robots, canonical, CTA, or mobile-overflow issue was found in this final QA pass.

Package manager:

- Used npm because `package-lock.json` exists and `package.json` defines npm scripts.

Commands run:

- `npm install`: passed; dependencies already up to date.
- `npm run build`: passed; 79 pages generated.
- `npm test`: passed.
- `npm run launch-check`: passed; 55 checks, 0 warnings, 0 failures, `READY`.
- `npm run dev -- --host 127.0.0.1 --port 4321`: first attempt was blocked by local sandbox port permission; passed after explicit local-server permission.
- `npm run preview -- --host 127.0.0.1 --port 4322`: passed after explicit local-server permission.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

Pages checked:

- `/`
- `/guides/`
- `/guides/?category=germany-a1`
- `/germany-family-reunion-a1/`
- `/guides/goethe-a1-fees-by-country/`
- `/guides/goethe-a1-test-centers/`
- `/guides/goethe-a1-retake-policy/`
- `/guides/german-a1-documents-checklist/`
- `/guides/goethe-a1-speaking-topics/`
- `/guides/german-a1-family-reunion-faq/`
- `/guides/goethe-a1-vs-telc-a1/`
- `/guides/german-family-reunion-language-requirement/`
- `/guides/goethe-a1-booking-mistakes/`
- `/guides/goethe-a1-30-day-study-plan/`
- `/about/`
- `/editorial-policy/`
- `/privacy-policy/`
- `/cookie-policy/`
- `/terms/`
- `/affiliate-disclosure/`
- `/zh/`
- `/zh/germany-family-reunion-a1/`

Page / route result:

- All checked local dev-server routes returned `200`.
- Production preview sanity check for `/`, `/guides/`, `/germany-family-reunion-a1/`, and `/zh/` returned `200`.
- Checked pages had one H1, a title, a meta description, a canonical URL, footer links, and no empty `href`, `href="#"`, or `javascript:` link.

Link / navigation result:

- `launch-check` passed internal-link validation.
- Header, Footer, breadcrumbs, Related guides, Germany A1 route links, and language-switch links passed existing automated checks.
- `/guides/?category=germany-a1` is intentionally a client-side filtered query view that canonicalizes to `/guides/`; indexable category pages are under `/guides/category/{category}/`.
- No dead internal link was fixed in this pass.

Fixes completed:

- Removed the public placeholder `YOUR_FORM_ENDPOINT` example from legacy `app.js`. The waitlist remains demo/local-storage mode, but the public front-end script no longer exposes a half-configured endpoint placeholder.

SEO result:

- Generated sitemap and robots checks passed.
- Generated sitemap includes core pages, Germany A1 pages, Chinese pages, guides, and guide category pages.
- Generated sitemap excludes configured noindex legal pages.
- Generated guide `lastmod` values match `updatedDate`.
- No duplicate generated page titles or duplicate generated meta descriptions were found.
- Guide pages still emit Article and BreadcrumbList JSON-LD; guide index/category pages emit CollectionPage and ItemList JSON-LD.

UI / mobile result:

- Existing responsive CSS covers header wrapping/scrolling, guide grids, guide facets, card grids, long links, tables, and code blocks.
- No hard-coded wide inline styles or obvious mobile-overflow blocker was found in the checked Astro pages.
- Mobile visual risk is not a deploy blocker, but a human screenshot pass is still useful after deploy or before design review.

Content / compliance result:

- Search for risky terms found no recommended guaranteed-pass, leaked-material, copied-answer, or unofficial-authority claims. Matches were in prohibitions, disclaimers, or "verify officially" wording.
- Germany A1 content continues to avoid fixed fee/date/test-center promises and tells readers to verify with official sources, test centers, embassies, or consulates.
- All guide content files checked had `updatedDate`, related metadata, and detectable official-source cues.

Remaining risks:

- No `lint` or `typecheck` scripts are configured in `package.json`.
- Legacy root static files still coexist with Astro source/output; do not delete or reconcile them without a separate source-of-truth task.
- Waitlist is still demo/local-storage mode in the legacy layer; the Astro guide CTA points to `/contact/`, not a live signup provider.
- Some guide bodies remain thin, especially `portuguese-ciple-a2-for-citizenship-and-residence`, `portuguese-language-for-golden-visa-and-citizenshi`, `staatsexamen-nt2-for-work-and-higher-education`, `cils-vs-celi-vs-plida-for-italian-citizenship`, `goethe-a1-30-day-study-plan`, `dutch-inburgering-a2-b1-for-integration-and-citize`, `goethe-a1-vs-telc-a1`, and `german-family-reunion-language-requirement`.
- Chinese coverage is real but partial; `/zh/`, the Chinese Germany A1 hub, and five Chinese core guide pages exist, but the full guide library is not localized.

Human confirmation needed:

- Re-check current official fee, date, retake, ID, test-center, certificate-acceptance, embassy/consulate, and exemption rules before making country-specific publishing claims.
- Decide whether to add formal `lint` and `typecheck` scripts in a separate engineering hardening pass.
- Decide whether the legacy waitlist should be wired to a real provider or left as a demo/contact flow.
- Decide later whether the static-only `/do-i-need-german-a1.html` should become an Astro route.

Recommended next module:

- Deploy is acceptable from the current build.
- After deploy, monitor 404s, Search Console indexing/sitemap status, and CTA/contact clicks.
- Next content-maintenance window should deepen Germany A1 thin pages first: fees, test centers, retake policy, documents checklist, speaking topics, and the 30-day study plan.

## UI Sitewide Unity Follow-up Window - 2026-07-10

Role: UI design system and sitewide visual consistency owner.

Scope completed:

- Re-read `docs/PROJECT_CONTEXT.md`, `docs/CONTENT_MAP.md`, `docs/TASK_LOG.md`, current UI source, layout components, guide templates, Chinese pages, and the existing project scripts.
- Kept this window strictly to UI/display-layer work. No guide body rewrites, no article title edits, no article summary edits, no SEO title/meta description edits, no slug/route changes, no sitemap/robots/canonical changes, no package/deploy config changes, and no policy/fee/date/source claims were changed.
- Promoted English and Chinese Germany A1 route hubs from the standard narrow guide body width to the shared `route-hub-page` width so the hub pages feel more like route entry points while staying in the same visual system.
- Converted the Germany A1 hub's five core decision links into shared card styling so fees, test centers, retake, documents, and speaking entries look like intentional route actions instead of loose article links.
- Updated Chinese guide breadcrumbs and related-guide sections to reuse the same `guide-breadcrumb` and `guide-related` classes as English guide pages.
- Added small shared CSS refinements for route hub width and card behavior inside guide articles.

Files changed in this UI follow-up:

- `src/styles/global.css`
- `src/pages/germany-family-reunion-a1.astro`
- `src/pages/zh/germany-family-reunion-a1.astro`
- `src/components/ZhGuideLayout.astro`
- `docs/TASK_LOG.md`

Unified components / UI surfaces:

- Route hub page width: `route-hub-page`.
- Guide breadcrumbs: English and Chinese guide pages now share `guide-breadcrumb`.
- Related guides: English and Chinese guide pages now share `guide-related` and `guide-related-grid`.
- Route hub entry cards: Germany A1 core decision links now use the same `article-card` family as other guide cards.
- Mobile behavior remains governed by the existing global breakpoints for card grids, route grids, guide facets, search rows, and guide layout.

Homepage UI result:

- No new homepage changes were required in this follow-up. The current homepage already presents the route finder, Germany A1 primary route, coverage stats, Browse by route, Featured guides, and Latest updates inside the shared UI system.

Guides list UI result:

- No filter logic was changed. `/guides/` already uses the shared library header, popular routes, route pills, country/route/exam/level facets, search panel, route overview, guide cards, and empty state.

Guide detail UI result:

- English guide detail pages already use `GuideLayout.astro` with breadcrumbs, summary box, audience sections, TOC, official verification, common mistakes, related guides, last updated, disclaimer, and CTA.
- Chinese guide detail pages now reuse the same breadcrumb and related-guide visual classes, reducing the remaining mismatch between English and Chinese guide templates.

Germany A1 route page UI result:

- `/germany-family-reunion-a1/` and `/zh/germany-family-reunion-a1/` now use the wider route hub width.
- The English route hub's five high-priority decision entries now read as route cards/guide cards, making fees, test centers, retake, documents, and speaking topics easier to scan.

About / Legal UI result:

- No new About/Legal changes were required in this follow-up. Current About, Contact, legal, and 404 pages already use shared page shells and narrow guide article styling from the previous UI window.

Mobile fixes / checks:

- No hard-coded wide inline styles were found in the checked Astro pages.
- Static UI shell/mobile-risk check passed for homepage, guides index, representative English guide, English route hub, Chinese route hub, representative Chinese guide, About, Privacy, and Chinese homepage.
- Header, language switch, card grids, guide facets, search rows, route hub width, and guide breadcrumbs remain covered by global responsive CSS.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed, 79 pages generated.
- `npm run launch-check`: passed, 55 checks, READY.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

Remaining UI risks / human review:

- A real browser screenshot pass is still recommended before deployment sign-off, especially `/`, `/guides/`, `/guides/category/germany-a1/`, `/guides/goethe-a1-germany-family-reunion/`, `/germany-family-reunion-a1/`, `/zh/`, `/zh/germany-family-reunion-a1/`, and one Chinese guide page.
- Legacy root static files still coexist with Astro source; do not reconcile or delete them without a separate source-of-truth/deploy task.
- Some non-Germany guide bodies remain thin, but that is a content-depth issue, not a UI unification blocker.

Final recommendation:

- UI is ready to enter a final visual QA / deployment window, with human screenshot review as the next best step.

## Guides + SEO Follow-up Window - 2026-07-10

Role: Guides + SEO owner, focused on information architecture and metadata after the Germany A1 depth pass.

Scope completed:

- Re-checked `docs/PROJECT_CONTEXT.md`, `docs/CONTENT_MAP.md`, `docs/TASK_LOG.md`, current guide source files, guide list routes, guide category routes, guide template, sitemap/robots/canonical behavior, and launch scripts.
- Kept the existing Guides library architecture: `/guides/` remains the searchable/filterable library, `/guides/?category=xxx` remains a client-side filtering path, and `/guides/category/{category}/` is the indexable static category path.
- Made light SEO metadata edits only for six Germany A1 core guides; no article body rewrites and no new policy, fee, date, or exam-center claims were added.
- Updated `docs/CONTENT_MAP.md` for the changed Germany A1 guide titles and last-updated dates.

Files changed in this follow-up:

- `src/content/guides/german-a1-family-reunion-faq.md`
- `src/content/guides/goethe-a1-vs-telc-a1.md`
- `src/content/guides/german-family-reunion-language-requirement.md`
- `src/content/guides/goethe-a1-booking-mistakes.md`
- `src/content/guides/goethe-a1-30-day-study-plan.md`
- `src/content/guides/goethe-a1-germany-family-reunion.md`
- `docs/CONTENT_MAP.md`
- `docs/TASK_LOG.md`

Guides list / category result:

- `/guides/` displays all 49 current English guide entries from the content collection.
- `/guides/?category=xxx` filters in the browser and keeps canonical as `/guides/`, which avoids indexing many duplicate query URLs.
- Static category pages under `/guides/category/{category}/` are the indexable category aggregation pages, with their own H1, title, meta description, canonical URL, CollectionPage JSON-LD, and ItemList JSON-LD.
- The user-supplied `telc-deutsch` category label maps to the current project category slug `germany-telc`; no new duplicate slug was introduced.
- Country, route, exam, and level filters still rely on `src/data/guide-taxonomy.ts` inference, not first-class frontmatter fields.

Guide template / structured data result:

- Guide detail pages use `GuideLayout.astro` with breadcrumbs, H1, summary box, audience fit, non-fit, TOC, body slot, official verification, common mistakes, related guides, last updated, disclaimer, CTA, and footer.
- Guide detail pages emit Article and BreadcrumbList JSON-LD with published and modified dates.
- Category pages emit CollectionPage and ItemList JSON-LD.
- No fake ratings, reviews, prices, Course schema, or FAQPage schema were added.

Germany A1 internal-link result:

- `/germany-family-reunion-a1/` links to the core Germany A1 guides.
- Every Germany A1 guide receives a shared route-support module linking back to the Germany A1 hub and core guide set.
- Fees page links to test centers, booking mistakes, and booking timeline.
- Test centers page links to documents, Goethe A1 vs telc A1, and fees.
- Documents page links to booking mistakes, language requirement, and test centers.
- Retake page links to speaking, listening, study plan, and booking timeline.
- Speaking page links to study plan, listening practice, and retake.
- FAQ is linked from the shared Germany A1 route-support module and links to requirement, Goethe/telc comparison, and documents.
- Goethe A1 vs telc A1 links to booking mistakes, test centers, and documents.
- Language requirement links to the Goethe A1 route, Goethe A1 vs telc A1, and FAQ; this should be content-reviewed later if the desired next step is documents rather than FAQ.

Title / description optimized:

- `german-a1-family-reunion-faq`: title and description now clarify language-proof FAQ scope.
- `goethe-a1-vs-telc-a1`: title and description now specify German family reunion use and practical comparison dimensions.
- `german-family-reunion-language-requirement`: title and description now frame the page as a requirement guide with official verification.
- `goethe-a1-booking-mistakes`: title and description now describe booking-risk checks before payment.
- `goethe-a1-30-day-study-plan`: title and description now specify family reunion applicants, four-skill practice, official materials, and risk checks.
- `goethe-a1-germany-family-reunion`: title and description now specify visa-proof planning and official verification.

Remaining weak title candidates:

- `dutch-inburgering-a2-b1-for-integration-and-citize`
- `goethe-a1-listening-practice`
- `goethe-a1-pre-booking-checklist`
- `goethe-b1-difficulty-analysis`
- `goethe-b1-listening-deep-dive`
- `goethe-b1-mock-exam-routine`
- `goethe-b1-speaking-topics`
- `goethe-b1-writing-assessment`
- `languagecert-selt-uk-visa`
- `portuguese-ciple-a2-for-citizenship-and-residence`
- `portuguese-language-for-golden-visa-and-citizenshi`
- `telc-b1-b2-fees-and-test-centers`

Remaining weak description candidates:

- `cils-b1-cittadinanza-for-italian-citizenship`
- `cils-vs-celi-vs-plida-for-italian-citizenship`
- `dele-a2-ccse-spanish-citizenship`
- `dele-levels-spanish-citizenship`
- `delf-b1-b2-french-work-study`
- `dutch-inburgering-a2-b1-for-integration-and-citize`
- `goethe-a1-study-plan-working-adults`
- `goethe-b1-fees-and-booking`
- `goethe-b1-germany-settlement-work`
- `languagecert-selt-uk-visa`
- `portuguese-ciple-a2-for-citizenship-and-residence`
- `portuguese-language-for-golden-visa-and-citizenshi`
- `staatsexamen-nt2-for-work-and-higher-education`
- `tcf-irn-french-residence`
- `tef-canada-immigration`
- `testdaf-vs-goethe-dsh`
- `yki-finnish-citizenship`
- `yki-vs-other-finland-options`

Thin body candidates for content window:

- Highest priority non-Germany pages: `portuguese-ciple-a2-for-citizenship-and-residence`, `portuguese-language-for-golden-visa-and-citizenshi`, `staatsexamen-nt2-for-work-and-higher-education`, `cils-vs-celi-vs-plida-for-italian-citizenship`, `dutch-inburgering-a2-b1-for-integration-and-citize`, `tcf-canada-vs-tef`, `cils-b1-cittadinanza-for-italian-citizenship`, `delf-b1-b2-french-work-study`, `testdaf-levels-and-scoring`.
- Germany A1 pages still worth content deepening after the shared template support: `goethe-a1-vs-telc-a1`, `goethe-a1-30-day-study-plan`, `goethe-a1-official-links-practice-resources`, `german-family-reunion-language-requirement`, `goethe-a1-germany-family-reunion`, `goethe-a1-test-centers`.

No current gaps found in this audit:

- Missing official source: none detected in current guide bodies.
- Missing Related guides: none detected in current guide frontmatter.
- Missing Last updated: none detected in current guide frontmatter.

Possible duplicate / canonical risks:

- `/guides/?category=...` and `/guides/category/.../` overlap in user intent. Current handling is acceptable because query URLs canonicalize to `/guides/`, while static category pages are the indexable route pages.
- Legacy root `guides/*.html` and generated Astro guide pages still coexist. Do not remove legacy files without a separate source-of-truth/deployment task.
- `sitemap.xml` in the legacy root layer and generated `dist/sitemap-index.xml` still represent two layers. Current launch checks pass, but deployment source-of-truth should remain a separate task.

Sitemap / robots / canonical result:

- Generated Astro sitemap includes `/germany-family-reunion-a1/`, guides, Chinese generated pages, and static guide category pages.
- Generated sitemap excludes configured noindex legal pages.
- `public/robots.txt` points to `https://flowlight.me/sitemap-index.xml`.
- Guide detail canonical URLs point to `/guides/{slug}/`.
- Static category canonical URLs point to `/guides/category/{category}/`.
- Query-filtered `/guides/?category=...` URLs are not intended as separate indexable pages.

Artificial / human confirmation needed:

- Confirm whether `country`, `exam`, `level`, and source-check date should become formal frontmatter fields instead of inferred taxonomy.
- Confirm whether `language requirement` should link directly to `documents checklist` in frontmatter related guides, replacing or supplementing FAQ.
- Confirm whether the static-only `/do-i-need-german-a1.html` should become an Astro route.
- Re-check all current official source claims before a public publishing push involving fees, exam dates, certificate acceptance, local test centers, retake rules, or country-specific mission rules.

UI window status:

- A UI unification window has already run after the original Guides + SEO pass.
- Remaining UI work is not required before final QA, but a browser screenshot review of `/guides/`, `/guides/category/germany-a1/`, representative guide pages, and mobile filters would still be useful before public design review.

Final QA status:

- The project already has a later final QA log entry showing `npm run launch-check` passed with 55 checks and `READY`.
- Fresh follow-up verification after the metadata changes passed:
  - `npm run build`: passed, 79 pages generated.
  - `npm test`: passed.
  - `npm run launch-check`: passed, 55 checks, READY.
  - `npm run lint`: not available in `package.json`, so not run.
  - `npm run typecheck`: not available in `package.json`, so not run.

## Final QA / Deployment Readiness Window - 2026-07-09

Role: final quality check and release owner.

Deployment recommendation:

- Can deploy from the current Astro build output.
- Final automated launch status: `npm run launch-check` passed with 55 checks, 0 warnings, 0 failures, `READY`.

Fixes completed:

- Changed the shared guide CTA in `src/components/GuideCTA.astro` from the missing Astro homepage `/#waitlist` anchor to the real `/contact/` page.
- Added `tests/site.test.js` assertions so the guide CTA stays pointed at `/contact/` and does not regress to `/#waitlist`.

Commands run:

- `npm install`: passed, dependencies already up to date.
- `npm run dev -- --host 127.0.0.1 --port 4321`: initially blocked by local sandbox port permission, then passed after local network permission was granted.
- `npm run build`: passed, 79 pages generated.
- `npm test`: passed.
- `npm run launch-check`: passed, 55 checks, `READY`.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

Manual / browser checks completed:

- Checked these priority routes via the local dev server: `/`, `/guides/`, `/guides/goethe-a1-germany-family-reunion/`, `/germany-family-reunion-a1/`, `/about/`, `/editorial-policy/`, `/privacy-policy/`, `/cookie-policy/`, `/terms/`, `/affiliate-disclosure/`, `/zh/`, and `/zh/germany-family-reunion-a1/`.
- Desktop and 390px mobile viewport checks found no horizontal overflow on the checked pages.
- The checked pages each had one H1, canonical URL, meta description, Footer links, language switch, and working CTA/link targets.
- Internal-link launch check passed with no dead links.
- Generated sitemap and robots checks passed; generated robots points to the sitemap index.
- Duplicate page-title scan found no duplicate generated titles.

Trust / compliance result:

- About, Editorial Policy, Affiliate Disclosure, Privacy, Cookie, and Terms pages are accessible and use the shared site shell.
- Guide pages have template-level official-source reminders, last-updated cues, disclaimers, and structured data.
- Search for risky claims found no recommended "guaranteed pass", leaked-material, or copied-answer guidance; those terms appear in prohibitions/disclaimers.
- Current fee, date, policy, certificate-acceptance, and country-specific mission claims still require official-source recheck before any strong country-specific publishing push.

Remaining risks:

- No dedicated `lint` or `typecheck` scripts exist in `package.json`; launch confidence currently depends on Astro build, source tests, launch checks, and browser/static inspection.
- Some guide bodies remain thin even though template-level support adds trust cues. Shortest current bodies include Portuguese CIPLE A2, Goethe A1 retake policy, Goethe A1 test centers, Portuguese Golden Visa language, Staatsexamen NT2, German A1 documents checklist, CILS comparison, Goethe A1 speaking topics, Goethe A1 30-day plan, Dutch Inburgering, Goethe A1 vs telc A1, and Goethe A1 fees by country.
- Chinese coverage is intentionally partial: `/zh/`, the Chinese Germany A1 hub, and five Chinese core guides exist; non-Germany Chinese routes and secondary Germany A1 pages are not fully localized.
- Legacy root static files still coexist with Astro source and generated output. Do not delete or rewire them without a separate source-of-truth/deploy task.

Pages needing human review:

- `/guides/goethe-a1-fees-by-country/`
- `/guides/goethe-a1-test-centers/`
- `/guides/goethe-a1-retake-policy/`
- `/guides/german-a1-documents-checklist/`
- `/guides/goethe-a1-speaking-topics/`
- `/guides/portuguese-ciple-a2-for-citizenship-and-residence/`
- `/guides/dutch-inburgering-a2-b1-for-integration-and-citize/`
- `/zh/` and `/zh/germany-family-reunion-a1/` for Chinese-market copy fit.

Official-source verification needed:

- Current German mission rules by applicant country or appointment location.
- Whether A1 applies, and which exemptions may apply, for the user's exact family reunion case.
- Whether Goethe A1, telc A1, or other A1 certificates are accepted by the responsible authority.
- Current Goethe/telc local fees, dates, ID rules, cancellation rules, retake rules, result timing, and certificate delivery.
- Current Portugal, Netherlands, Italy, Spain, France, Finland, UK, and Canada official pages before expanding non-Germany routes.

Recommended next module:

- Maintain the Germany A1 cluster first, especially fees, test centers, retake policy, documents checklist, and speaking topics.
- A new window is recommended for content expansion rather than continuing in this QA window.

## Chinese Core Path Window - 2026-07-09

Role: Chinese site and internationalization owner.

Scope completed:

- Reworked `src/pages/zh/index.astro` so `/zh/` points first to the Chinese Germany A1 path instead of pulling English featured guide cards into the core Chinese journey.
- Added `src/pages/zh/germany-family-reunion-a1.astro` as the Chinese Germany A1 family reunion topic page.
- Added five Chinese core Germany A1 guide pages:
  - `/zh/guides/german-family-reunion-language-requirement/`
  - `/zh/guides/goethe-a1-vs-telc-a1/`
  - `/zh/guides/goethe-a1-booking-mistakes/`
  - `/zh/guides/german-a1-documents-checklist/`
  - `/zh/guides/goethe-a1-30-day-study-plan/`
- Added shared Chinese guide data in `src/data/zh-germany-a1.ts`.
- Added shared Chinese guide wrapper in `src/components/ZhGuideLayout.astro` with `zh-CN`, canonical URLs, hreflang alternates, Article JSON-LD, official-source reminders, related Chinese guides, and compliance disclaimer.
- Updated `src/components/Header.astro` so the Chinese navigation uses Chinese entry points and available English/Chinese guide translations switch directly between paired pages.
- Updated `tests/site.test.js` and `scripts/launch-check.js` to cover the Chinese hub, five Chinese guides, zh-CN metadata, canonical/hreflang, Chinese navigation, language switching, and official-check reminders.

Chinese content still not complete:

- The Chinese site is not a full translation of every English page.
- Non-Germany routes still point to the English guide library or English route pages.
- Germany A1 Chinese coverage now has the core path, but secondary pages such as fees by country, test centers, retake policy, speaking topics, listening practice, official resources, FAQ, and working-adult study plan are still not fully Chinese.

Language switching:

- `/zh/` switches to `/`.
- `/zh/germany-family-reunion-a1/` switches to `/germany-family-reunion-a1/`.
- The five Chinese core guide pages switch to their English guide equivalents, and the matching English guide pages switch back to the Chinese versions.
- English pages without a Chinese equivalent still send users to `/zh/` as the Chinese homepage.

Chinese SEO completed:

- Chinese homepage keeps `zh-CN`, canonical URL, hreflang alternates, and WebSite JSON-LD.
- Chinese topic page has its own title, meta description, canonical URL, hreflang alternates, and FAQPage JSON-LD.
- Five Chinese guide pages have independent titles, meta descriptions, canonical URLs, hreflang alternates, and Article JSON-LD.
- Generated sitemap includes the Chinese generated pages through Astro sitemap generation.

Manual policy checks still needed before treating claims as current:

- Current German mission requirements for the applicant's country or appointment location.
- Whether A1 applies to the user's exact family reunion case and whether an exemption may apply.
- Whether Goethe A1, telc A1, or another certificate is accepted by the responsible authority.
- Current Goethe/telc local fees, exam dates, ID rules, cancellation rules, retake rules, result timing, certificate delivery, and document requirements.
- Any country-specific Chinese applicant instructions from the German mission in China or the responsible application center.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed, 79 pages generated.
- `npm run launch-check`: passed, 55 checks, READY.

## UI Design System + Sitewide Visual Unity Window - 2026-07-09

Role: UI design system and sitewide visual consistency owner.

Scope completed:

- Expanded `src/styles/global.css` into the shared UI layer for page shells, narrow content pages, section headers, card grids, route cards, stat cards, badges/tags, primary/secondary buttons, route finder panels, library panels, guide filters, search controls, and mobile breakpoints.
- Reworked `src/pages/index.astro` so the homepage reads as a route-selection tool: clearer hero, prominent Exam Route Finder, Germany A1 as the primary route, professional coverage stats, route browsing before editorial guide lists, and latest updates pushed lower.
- Reworked `src/pages/guides/index.astro` so `/guides/` reads as a guide library: shared library header, popular routes, route filter pills, country/route/exam/level facets, search panel, route overview, unified guide cards, filter status, and empty-state behavior.
- Unified static route category pages in `src/pages/guides/category/[category].astro` with the same library header and guide card grid.
- Unified `src/pages/germany-family-reunion-a1.astro` with the shared page shell, narrow guide article width, shared guide grid, and shared CTA styling.
- Unified `src/pages/zh/index.astro` with the same hero, stat grid, feature-route panel, section headers, and route cards used by the English homepage.
- Unified About, Contact, legal, and 404 page layouts through `page-shell`, `narrow-page`, and shared guide article styling.

Files changed in this UI window:

- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/guides/index.astro`
- `src/pages/guides/category/[category].astro`
- `src/pages/germany-family-reunion-a1.astro`
- `src/pages/zh/index.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/privacy-policy.astro`
- `src/pages/cookie-policy.astro`
- `src/pages/terms.astro`
- `src/pages/editorial-policy.astro`
- `src/pages/affiliate-disclosure.astro`
- `src/pages/404.astro`

Mobile fixes:

- Added shared small-screen rules so route finder, feature route, card grids, stat grids, guide facets, and guide search collapse to one column.
- Kept header navigation horizontally scrollable on small screens while preserving the language switch outside the nav row.
- Standardized guide/legal/route body width to avoid hard-coded wide layouts.
- Removed remaining hard-coded inline widths from the checked Astro pages, except no content-strategy or legacy static layer changes were made.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed, 73 pages generated.
- `npm run launch-check`: passed, 53 checks, READY.
- Static UI shell/mobile-risk check passed for homepage, guides index, representative guide detail, Germany A1 route hub, About, Privacy, and Chinese homepage.

Pages or areas still worth a later dedicated pass:

- Legacy root HTML/CSS files remain outside the Astro UI system and should only be reconciled in a separate source-of-truth task.
- Individual non-Germany guide bodies still vary in depth and structure; this window unified the wrapper, not the 49 Markdown bodies.
- A live browser screenshot pass would still be useful before a public design review; local preview binding was blocked by the current sandbox, so this window used build output and static risk checks instead.

## Guides + SEO Window - 2026-07-09

Role: Guides list, guide template, and SEO owner.

Scope completed:

- Added shared guide taxonomy in `src/data/guide-taxonomy.ts` for route, country, exam, level, route descriptions, and popular-route flags.
- Upgraded `/guides/` from a simple article list into a guide library with popular routes, route overview, search, route/category filter pills, and country / route / exam / level faceted filters.
- Kept `/guides/?category=xxx` working as a client-side filter path while adding static indexable category pages at `/guides/category/{category}/`.
- Expanded guide cards through `src/components/ArticleCard.astro` so cards show title, short description, country tag, route tag, exam tag, level tag, last updated, related route, reading time, and CTA.
- Standardized `src/layouts/GuideLayout.astro` with template-level Summary, Who this guide is for, Who this guide is not for, On this page, main content, Official verification, Common mistakes, Related guides, Last updated, Disclaimer, CTA, and global footer.
- Updated guide breadcrumbs and same-route backlinks to point to real static category pages instead of homepage anchors or query-only route views.
- Added `ogType` support in `src/layouts/BaseLayout.astro` and set guide pages to `og:type=article`.
- Added `CollectionPage` and `ItemList` JSON-LD for each static guide category page.
- Updated `scripts/launch-check.js` so generated category pages are checked as collection pages, while guide detail pages remain checked for Article/BreadcrumbList JSON-LD, trust cues, and same-route backlinks.

Filtering issues fixed:

- `/guides/?category=xxx` still filters the visible list.
- Search now works together with category, country, exam, and level filters.
- Empty state remains visible when no guide matches.
- Mobile filters collapse to a single-column control stack.
- Static category pages give SEO and no-JavaScript users a real route collection page.

SEO optimized:

- Guide detail pages now emit article Open Graph type.
- Static category pages have canonical URLs, meta descriptions, CollectionPage JSON-LD, and ItemList JSON-LD.
- Guide detail internal links now point to `/guides/category/{category}/`.
- Generated sitemap now includes the new static category pages through Astro sitemap generation.
- Launch checks continue to verify canonical URLs, H1 count, useful meta descriptions, guide structured data, sitemap inclusion, robots, internal links, and noindex legal-page sitemap filtering.

Guide template changes:

- Template-level sections now cover summary, audience fit, non-fit, official verification, common mistakes, last updated, disclaimer, related guides, CTA, and footer.
- Existing Markdown bodies were not rewritten in this window.
- Germany A1 body depth and shared Germany A1 route-support content were left intact.

Pages still needing a content window:

- Older short guides outside the Germany A1 model route still need page-specific depth, examples, official-source tables, and clearer route decision flows.
- Non-Germany category pages are now indexable but still mostly depend on the current short guide bodies.
- Category-level intro copy can be expanded later if a route becomes a commercial/content priority.

Pages still needing a UI window:

- Visual polish for the denser `/guides/` filters and card grid should be checked manually on mobile.
- Static category pages use the existing simple guide-list style; they can later receive a richer category hub layout.
- Homepage, Chinese homepage, and Germany A1 hub were intentionally not redesigned in this window.

Verification completed:

- `npm test`: passed.
- `npm run launch-check`: passed, 53 checks, READY.

## Germany A1 Content Cluster Window - 2026-07-09

Role: Germany A1 Family Reunion topic owner.

Scope completed:

- Reworked the Astro route hub at `src/pages/germany-family-reunion-a1.astro` for `/germany-family-reunion-a1/`.
- Added a Germany A1-only guide support module at `src/components/GermanyA1RouteSupport.astro`.
- Rendered that module from `src/pages/guides/[slug].astro` only when `category: "germany-a1"`.
- Updated Germany A1 guide `related` metadata and `updatedDate` values for the current cluster.
- Added source-level assertions in `tests/site.test.js` so the Germany A1 support module and core links stay covered.

Germany A1 pages changed:

- `/germany-family-reunion-a1/` route hub.
- All `category: "germany-a1"` Astro guides through the shared route-support module.
- Frontmatter updated in: `german-family-reunion-language-requirement`, `goethe-a1-germany-family-reunion`, `goethe-a1-vs-telc-a1`, `goethe-a1-booking-mistakes`, `german-a1-documents-checklist`, `goethe-a1-pre-booking-checklist`, `german-a1-exam-booking-timeline`, `goethe-a1-test-centers`, `goethe-a1-fees-by-country`, `goethe-a1-30-day-study-plan`, `goethe-a1-study-plan-working-adults`, `goethe-a1-speaking-topics`, `goethe-a1-listening-practice`, `goethe-a1-official-links-practice-resources`, `goethe-a1-retake-policy`, and `german-a1-family-reunion-faq`.

Article enhancements added:

- Each Germany A1 guide now receives visible sections for Quick answer, Who this guide is for, Who this guide is not for, What to verify officially, Common mistakes, Step-by-step next action, Related guides, Official sources, Last updated, and Disclaimer.
- The support module avoids invented fees, dates, pass guarantees, and certificate-acceptance promises.
- The module explicitly warns against leaked materials, copied real exam answers, and guaranteed-pass claims.
- The hub now covers route overview, who needs A1, commonly used exams, Goethe A1 vs telc A1, booking/test-center guidance, documents checklist, study plan, retake rules, FAQ, all Germany A1 guides, official verification reminder, and the Start Germany A1 route CTA.

Internal links added or strengthened:

- Requirement check now points toward the Goethe A1 route and Goethe A1 vs telc A1.
- Goethe A1 route now points toward Goethe vs telc and the pre-booking checklist.
- Goethe vs telc now points toward booking mistakes, test centers, and documents.
- Booking mistakes and pre-booking checklist now point toward documents and timeline checks.
- Documents and timeline pages are tied to test-center, booking, and retake planning.
- Study plan pages now point to speaking, listening, and official practice resources.
- Every Germany A1 guide links back to `/germany-family-reunion-a1/` through the shared support module.
- FAQ is included in the shared core guide list alongside all core Germany A1 pages.

Thin or still-weaker pages:

- Individual older short guides such as `goethe-a1-fees-by-country`, `goethe-a1-test-centers`, `goethe-a1-retake-policy`, `goethe-a1-speaking-topics`, and `german-a1-documents-checklist` still have short original bodies. The shared module improves consistency, but these could later receive page-specific tables, examples, and decision flows.
- There is still no Astro source route for `/do-i-need-german-a1.html`; it remains a legacy/static helper.
- Chinese guide coverage remains partial and outside this Germany A1 English cluster pass.

Manual official verification needed:

- Current German mission rules for the applicant's country or appointment location.
- Whether Goethe A1, telc A1, or another A1 certificate is accepted for a specific case.
- Current Goethe or telc local fees, dates, result timing, ID rules, cancellation rules, and retake rules.
- Current BAMF, Auswaertiges Amt, Goethe-Institut, telc, and local test-center pages before publishing country-specific claims.

## Current Check Summary

Role: project map and context compression window.

Scope completed:

- Scanned technology stack, directory structure, routes, content source, guide layout, categories, SEO, multilingual implementation, CTA/waitlist behavior, build scripts, and deploy scripts.
- Created `docs/PROJECT_CONTEXT.md`.
- Created `docs/CONTENT_MAP.md`.
- Updated this `docs/TASK_LOG.md` with findings and next-window boundaries.

Verification completed:

- `npm run build`: passed, 61 pages generated.
- `npm test`: passed.
- `npm run launch-check`: passed, 53 checks, READY.

Working-tree note:

- Many existing modified and untracked files were already present before this map update. Future windows must check `git status --short` and avoid reverting unrelated work.

## Findings By Area

### 页面结构问题

- Homepage is functional but currently behaves mostly like a content index: hero, featured guides, route cards, latest guides.
- It lacks a stronger product/action surface such as an actual route finder, waitlist module, or guided decision entry in the Astro layer.
- `germany-family-reunion-a1.astro` is a route hub but uses page-specific inline styles and does not fully reuse the guide layout.
- `do-i-need-german-a1.html` exists only as a root static page, not as an Astro source route.

### 分类筛选问题

- `/guides/?category=xxx` does filter in normal browsers because `src/pages/guides/index.astro` reads `URLSearchParams` and hides cards client-side.
- The static HTML itself is not pre-filtered by category. With JavaScript unavailable, all guides remain listed and a fallback message appears.
- Category definitions are duplicated between `src/pages/index.astro`, `src/pages/zh/index.astro`, and `src/pages/guides/index.astro`.
- `country`, `exam`, and `level` are not structured frontmatter fields, so future filtering by those dimensions would require inference or schema expansion.

### 中文入口问题

- `/zh/` is a real Chinese homepage with `lang="zh-CN"` and hreflang.
- It is not a full Chinese site. Most guide pages remain English.
- Chinese homepage card titles/descriptions are pulled from English guide frontmatter, so parts of the Chinese page still display English text.
- Header on English article pages labels the language switch as `中文首页`, which is honest but confirms there is no article-level Chinese translation.

### waitlist 链接问题

- `GuideCTA.astro` points `Join waitlist` to `/#waitlist`.
- Generated Astro homepage does not contain an element with `id="waitlist"`.
- Root legacy `index.html` has a waitlist section and form, but the Astro homepage does not.
- Root `app.js` handles the legacy waitlist in demo/local mode; no real email submission endpoint is connected in the Astro layer.
- Docs mention Formspree / `YOUR_FORM_ID`, but the current generated Astro route has no real form target.

### guide 模板问题

- All generated guide pages share `GuideLayout.astro`, including H1, summary, trust bar, breadcrumbs, TOC, related guides, route backlink, CTA, and JSON-LD.
- Article body structure is not normalized. Some pages use quick answer/checklist/workflow structures; others are shorter or older guide bodies.
- The old 15-section guide template exists in docs and legacy data, but it is not enforced as Markdown structure in the Astro content collection.
- `updatedDate` is structured in frontmatter and used by the layout and sitemap enrichment.

### SEO 问题

- Core SEO implementation is healthy: canonical URLs, meta descriptions, hreflang for homepages, sitemap index, guide lastmod, guide JSON-LD, guide index JSON-LD, robots.
- `public/robots.txt` points to `sitemap-index.xml`; root legacy `robots.txt` points to `sitemap.xml`. This split should be reconciled only in a dedicated deploy/source-of-truth task.
- Legal/noindex pages are filtered out of generated sitemap, but `BaseLayout` only emits noindex when pages pass `noindex`; verify each intended noindex page if doing SEO hardening.
- `og:type` is always `website` in `BaseLayout`, including articles; this is acceptable but can be improved later.

### UI 统一问题

- Main visual system is centralized in `src/styles/global.css`.
- Some Astro pages use inline styles and local `<style>` blocks, especially homepage, guide index, Chinese homepage, and Germany A1 hub.
- The English homepage, Chinese homepage, guide index, and guide pages share cards but not a fully unified page composition pattern.
- Footer is complete and stable, with About, Contact, Editorial Policy, Privacy Policy, Cookie Policy, Terms, and Affiliate Disclosure.

### 移动端问题

- Launch check confirms guide tables and long links have mobile overflow protection.
- Guide index search row collapses on small screens.
- Chinese homepage focus block collapses on small screens.
- Still needs visual/manual mobile QA for dense card grids, sticky TOC behavior, and long translated labels.

### 构建风险

- Current build passes.
- Build relies on `scripts/enrich-sitemap-lastmod.js` after Astro build; do not remove `postbuild` without replacing lastmod behavior.
- `launch-check` checks both generated Astro output and legacy static pages. Removing legacy files can break launch readiness.
- The content collection does not currently validate `country`, `exam`, `level`, or source-check date fields.
- Existing worktree contains many modified/untracked files; accidental revert is the main operational risk.

##重点检查结果

| Check | Result |
|---|---|
| `/guides/?category=xxx` 是否真的过滤 | Yes with JavaScript. It is client-side filtering, not separate static category pages. |
| 中文入口是否真正中文化 | Partially. `/zh/` is Chinese, but guide cards still pull English frontmatter and guides are mostly English. |
| Join waitlist 是否有真实目标页 | No in Astro. CTA points to `/#waitlist`, but Astro homepage has no `id="waitlist"`. |
| guide 模板是否统一 | Wrapper is unified; article body structure is not fully standardized. |
| last updated 是否来自数据源 | Yes for guides: `updatedDate` frontmatter feeds layout and sitemap lastmod. |
| 首页是否过于像文章列表 | Somewhat. It is currently a hero plus guide/category lists, not a strong interactive product surface. |
| Germany A1 是否已经形成专题集群 | Yes. 16 Germany A1 guides plus a route hub. |
| Footer 链接是否完整 | Yes. Legal/trust links are present and launch check passes affiliate footer link. |
| sitemap / robots 是否存在 | Yes. Generated `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, and `dist/robots.txt` exist. |
| 项目是否能正常 build | Yes. `npm run build`, `npm test`, and `npm run launch-check` passed. |

## 当前最重要的 10 个问题

1. Astro guide CTA links to a missing `/#waitlist` anchor.
2. Astro layer has no real waitlist form or email capture target.
3. Chinese homepage is only partially Chinese because guide cards reuse English frontmatter.
4. There is no article-level Chinese guide translation system.
5. Category filters are client-side only; no dedicated static category landing pages.
6. Category definitions are duplicated across multiple pages.
7. `country`, `exam`, and `level` are inferred, not structured content fields.
8. Guide body structure is inconsistent across older and newer guides.
9. Homepage still reads more like a guide index than a decision/navigation product.
10. Legacy static layer and Astro source layer coexist, creating source-of-truth risk.

## Recommended Next 6 Windows

### Window 1: Waitlist / CTA Reality Check

Goal:

- Make the current `Join waitlist` path honest and functional.

Suggested file range:

- `src/components/GuideCTA.astro`
- `src/pages/index.astro`
- `src/pages/contact.astro`
- Possibly `src/styles/global.css`
- Tests only if behavior is asserted.

Do not touch:

- Deploy scripts.
- Guide content bodies.

Human confirmation needed:

- Should waitlist collect real emails now?
- Which provider should be used: Formspree, Mailchimp, Google Forms, custom endpoint, or simple contact link?
- What user promise should the CTA make?

### Window 2: Chinese Entry Quality

Goal:

- Make `/zh/` feel intentionally Chinese, not a mixed-language index.

Suggested file range:

- `src/pages/zh/index.astro`
- Optional small structured mapping in the page itself or a new data helper.

Do not touch:

- English guide body content.
- Global routing unless a full i18n task is approved.

Human confirmation needed:

- Is `/zh/` only a Chinese landing page, or should top Germany A1 guides be translated too?

### Window 3: Germany A1 Cluster Depth

Goal:

- Tighten Germany A1 as the flagship topic cluster.

Suggested file range:

- `src/pages/germany-family-reunion-a1.astro`
- `src/content/guides/*a1*.md`
- `src/content/guides/german-*.md`
- Related tests if routes/links change.

Do not touch:

- Non-Germany clusters.
- Deploy config.

Human confirmation needed:

- Should `do-i-need-german-a1.html` become an Astro route?
- Which Germany A1 user journey is the priority: requirement check, booking, prep, documents, or retake risk?

### Window 4: Guide Template Normalization

Goal:

- Define a practical guide body standard without rewriting every article at once.

Suggested file range:

- `docs/CONTENT_WORKFLOW.md`
- `src/layouts/GuideLayout.astro`
- A small sample set in `src/content/guides/`
- `tests/site.test.js` only for stable rules.

Do not touch:

- All guides in one large rewrite.

Human confirmation needed:

- Should the canonical body template be strict 15-section, or flexible route-specific sections?

### Window 5: Content Schema / Content Map Upgrade

Goal:

- Decide whether `country`, `exam`, `level`, and source-check date should become first-class frontmatter.

Suggested file range:

- `src/content.config.ts`
- `src/content/guides/*.md` in small batches.
- `src/pages/guides/index.astro` only if new filters are added.
- `docs/CONTENT_MAP.md`.

Do not touch:

- UI redesign.

Human confirmation needed:

- Which filters matter commercially: route, country, exam, level, language, or user goal?

### Window 6: Legacy / Astro Source-of-Truth Audit

Goal:

- Clarify what is deployed and what should remain as compatibility artifacts.

Suggested file range:

- `README.md`
- `CLAUDE.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/LAUNCH_CHECKLIST.md`
- Maybe tests/launch checks after confirmation.

Do not touch:

- Delete no legacy files unless explicitly approved.
- Deploy config unless explicitly approved.

Human confirmation needed:

- Is the live server serving Astro `dist/` or legacy root files?
- Should old root HTML pages remain permanently, redirect, or be regenerated from Astro?

## Germany A1 Decision Guides Window - 2026-07-10

Role: Germany A1 Family Reunion content owner.

Scope completed:

- Deepened the five Germany A1 decision guides without changing the UI system, route structure, Chinese site, or non-Germany content.
- Reused the existing Germany A1 route-support module for the shared Quick answer, audience fit, official-verification, common-mistake, next-step, related-guide, last-updated, official-source, and disclaimer sections.
- Added source-level tests that preserve the five decision-guide structures and their next-step links.

Pages enhanced:

- `goethe-a1-fees-by-country`: replaced a fixed-fee-style checklist with a local official-verification workflow; covers changing fee factors, payment/refund/rescheduling checks, and the distinction between course and exam fees.
- `goethe-a1-test-centers`: defines an official centre as one shown or confirmed through Goethe or telc; adds exact-exam checks, a centre checklist, and booking risks.
- `goethe-a1-retake-policy`: starts from the score report and local rule rather than promising a resit pattern; adds targeted review, two-week and four-week recovery plans, and a visa-timeline warning.
- `german-a1-documents-checklist`: separates booking, test-day, and visa-file materials; distinguishes original ID, booking proof, official certificate, and local mission requirements.
- `goethe-a1-speaking-topics`: frames topics as adaptable practice areas rather than predictions; adds a safe practice routine, common errors, and a seven-day reset without leaked or copied exam content.

Internal links added or strengthened:

- Fees -> test centres and booking mistakes.
- Test centres -> documents checklist, Goethe vs telc, and fees.
- Documents checklist -> language requirement, test centres, and booking mistakes.
- Retake -> speaking, listening, study plan, and booking timeline.
- Speaking -> study plan, listening, and retake.
- All five pages continue to link back to `/germany-family-reunion-a1/` through the shared Germany A1 route-support module; the hub already lists all five core pages.

Manual official verification still required:

- Current local Goethe/telc fee, payment deadline, refund, and rescheduling rules.
- Whether a local centre offers the exact adult A1 exam on the required date, its ID rules, result timing, and certificate delivery process.
- Local retake or partial-resit rules for the exact examination and test centre.
- The responsible German mission's current certificate-acceptance and visa-document checklist for the applicant's individual case.

Fact-risk assessment:

- No fees, dates, centre lists, acceptance promises, or fixed retake rules were added.
- The A1 examination and skill descriptions are linked to official Goethe information; changing local conditions are explicitly directed back to the responsible official source.

Remaining thin Germany A1 pages:

- `goethe-a1-germany-family-reunion`, `goethe-a1-vs-telc-a1`, `goethe-a1-booking-mistakes`, `goethe-a1-pre-booking-checklist`, and `german-a1-exam-booking-timeline` could be deepened next, but they remain outside this five-page maintenance window.

Recommended next module:

- Use a Guides + SEO window next to refine search intent, title/description fit, and structured internal-link coverage for this completed Germany A1 decision cluster.
- Use the final quality-check window after that SEO pass; a UI window is not currently necessary.

## Germany A1 Guides + SEO Window - 2026-07-10

Role: Germany A1 search-intent and internal-link owner.

Scope completed:

- Refined the five Germany A1 decision-guide titles and meta descriptions so the search result clearly states the next decision: local fee, official centre, retake plan, three document stages, or safe speaking practice.
- Added a compact `Five core decision guides` section near the top of `/germany-family-reunion-a1/`, giving each core page a clear contextual link before the longer route sections.
- Updated the hub's title, description, and last-updated signal to reflect its stronger requirement-to-booking route role.
- Added source-level assertions for the five focused titles and the hub's five direct core-guide links.

SEO boundaries retained:

- No keyword-stuffed copy, new route, schema change, fee/date claim, centre list, or certificate-acceptance promise was added.
- Existing Article, BreadcrumbList, canonical, sitemap, guide-category backlink, and official-source trust cues remain the technical SEO layer for these pages.

Recommended next module:

- Proceed to the final quality-check window for generated-page copy, heading hierarchy, metadata, internal-link targets, and mobile rendering. A separate UI window is still not required.

## Germany A1 Thin-Page Maintenance Window - 2026-07-10

Role: Germany A1 practical-route content owner.

Scope completed:

- Maintained six Germany A1 guides only: fees, test centres, retake, documents, speaking, and the 30-day plan.
- Kept the existing shared trust and disclaimer structure; no UI, route, Chinese, legal, deployment, or non-Germany files were changed.

Practical depth added:

- Fees: a comparable personal fee record and a safe response when two local listings disagree.
- Test centres: a concise official-centre enquiry path when a local page is unclear.
- Retake: a decision rule for choosing a shorter or longer recovery period instead of automatically booking the earliest date.
- Documents: a private record-keeping step and a warning against sharing sensitive scans through unverified channels.
- Speaking: a repeatable ten-minute drill alongside the existing seven-day reset.
- 30-day plan: replaced the thin four-week outline with daily minimum practice, four staged date ranges, a weekly review, a realistic extension rule, and explicit speaking/listening/retake next steps.

Internal links strengthened:

- The 30-day plan now points to speaking, listening, retake, and the Germany A1 hub.
- The existing fee, centre, retake, documents, and speaking progression remains intact.

Fact-risk assessment:

- No fees, dates, test-centre lists, retake entitlement, certificate-acceptance promise, or pass guarantee was added.
- Local conditions and visa requirements continue to require official-source verification.

Remaining thinner Germany A1 guides:

- `goethe-a1-germany-family-reunion`, `goethe-a1-vs-telc-a1`, `goethe-a1-booking-mistakes`, `goethe-a1-pre-booking-checklist`, and `german-a1-exam-booking-timeline` remain suitable candidates for a later content-only window.

Recommended next module:

- Run final quality checks on the completed six-page route, then decide whether the next content window should deepen exam-choice or booking-timeline pages.

## Germany A1 Exam Choice And Booking Window - 2026-07-10

Role: Germany A1 route-decision and booking-risk content owner.

Scope completed:

- Deepened five Germany A1 guides only: Goethe A1 route, Goethe vs telc, booking mistakes, pre-booking checklist, and booking timeline.
- Connected the route as requirement -> acceptance and provider choice -> official centre -> payment checks -> document and timing plan.

Pages enhanced:

- `goethe-a1-germany-family-reunion`: separates the stable Goethe exam description from case-specific mission acceptance and sends users to the requirement, comparison, and pre-booking decisions in order.
- `goethe-a1-vs-telc-a1`: replaces brand preference with four checks: acceptance, availability, process, and total cost.
- `goethe-a1-booking-mistakes`: removes unsupported claims about centre frequency, universal ID practice, fixed lead times, and modular scheduling; adds a factual stop-and-check record and local-resolution path.
- `goethe-a1-pre-booking-checklist`: adds hard stop conditions and one evidence record while keeping certificate acceptance, centre, payment, ID, and preparation checks separate.
- `german-a1-exam-booking-timeline`: adds backward planning from the document deadline and an explicit rule for unknown timings rather than assuming later submission or a usable retake date.

Internal links strengthened:

- Goethe route -> requirement -> Goethe vs telc -> pre-booking checklist.
- Goethe vs telc -> test centres -> booking mistakes -> documents.
- Booking mistakes and pre-booking checklist -> documents, centres, and timeline.
- Timeline -> fees, centres, documents, retake, and requirement check.

Fact-risk assessment:

- No universal booking lead time, centre schedule, ID list, result date, acceptance promise, refund entitlement, modular resit claim, fee, or visa outcome was added.
- Goethe/telc product descriptions use official overview pages; every local or case-specific point remains an official-centre or mission verification task.

Remaining Germany A1 content candidates:

- The central cluster is now materially deeper. A later page-specific pass could refine the FAQ, listening practice, official practice resources, and working-adult study plan, but no additional route page is currently thin enough to require immediate expansion.

Recommended next module:

- Run final quality checks on the complete Germany A1 cluster, including generated-page heading order, metadata, internal links, and narrow/mobile reading surfaces.

## Germany A1 Support Guides Window - 2026-07-10

Role: Germany A1 preparation and source-navigation content owner.

Scope completed:

- Maintained four Germany A1 support guides only: FAQ, listening practice, official resources, and working-adult study plan.
- Kept the existing shared guide structure and did not touch UI, route generation, Chinese pages, non-Germany content, legal pages, or deployment configuration.

Pages enhanced:

- `german-a1-family-reunion-faq`: replaces generic or overcertain answers with safe routing to requirement, provider choice, centre, timeline, documents, and preparation pages.
- `goethe-a1-listening-practice`: replaces unsupported fixed exam-format claims with a three-pass daily drill, error diagnosis, official-format-first practice, and a weekly checkpoint.
- `goethe-a1-official-links-practice-resources`: maps each reader question to the authority, provider, local centre, or practice source that owns the answer.
- `goethe-a1-study-plan-working-adults`: replaces fixed daily workload and outcome claims with flexible weekday/review blocks, an eight-week progression, and a clear extension rule.

Fact-risk cleanup:

- Removed fixed result-time, study-hour, study-duration, partial-resit, provider-acceptance, and listening-procedure claims where they were not safe as universal statements.
- Retained official Goethe, BAMF, telc, and German Federal Foreign Office links; country-, case-, and centre-specific details remain official verification tasks.

Internal links strengthened:

- FAQ now routes to requirement, exam choice, centre, fee, timeline, documents, 30-day plan, working-adult plan, and the hub.
- Listening, official resources, and working-adult plan now cross-link to speaking, 30-day preparation, retake, and pre-booking decisions.

Cluster status:

- The English Germany A1 content cluster is now internally connected and has route-specific depth across requirement, provider choice, booking, documents, fees, timing, preparation, retake, and FAQ support.
- Remaining work is quality assurance and manual official-source review rather than another broad content-expansion window.

Recommended next module:

- Run the final Germany A1 quality-check window, including generated metadata, internal links, mobile reading, and the official-source review list.

## Sitewide Content-Depth Window - 2026-07-10

Role: route-decision content owner.

Scope completed:

- Deepened the live Astro content layer only. No deployment configuration, source-of-truth decision, package configuration, sitemap/canonical behavior, or CSS/UI system was changed.
- Repositioned the site from an exam-description library toward a route-decision product: readers now start with the receiving authority, exact proof, local booking conditions, and document timeline rather than an assumed exam choice.
- Added a shared, route-specific decision layer to every English guide: what the page helps decide, three official-first checks tailored to its route, and a concrete next action into the relevant route cluster.
- Added the equivalent audience boundary and next-action sequence to all five Chinese core guides.

Homepage and library result:

- `/` now states the route-decision proposition in the hero, explains how to use VisaLang, distinguishes Germany A1 as the full route from non-Germany starter routes, adds a five-point pre-payment verification checklist, a Chinese route entry, and a correction path.
- `/guides/` and every indexable category page now explain that the library is for route selection, identify Germany A1 as the deepest route, label other categories as starter overviews, and send no-result searches back to an authority-first decision.

Germany A1 route result:

- `/germany-family-reunion-a1/` now follows a clear eight-step decision sequence: confirm A1 applicability; choose accepted proof; compare Goethe and telc; check fees and official centres; book safely; prepare documents; build a study plan; and retain a retake buffer.
- The existing five core guides remain the route’s concrete actions: local fees, official centre verification, retake planning, three-stage documents, and safe speaking practice. Their existing detailed sections already cover the required local-fee, centre, retake, materials, and no-leak practice constraints; this window makes their role in the route explicit on every generated page.

Non-Germany route result:

- Germany B1+ guides now frame settlement/work/citizenship decisions as authority-specific, distinguish B1 risk from A1, and route readers into the B1 cluster.
- TestDaF guides now lead with target programme and university language requirements, TDN/alternative-proof verification, and backward planning from application deadlines.
- telc Deutsch guides now distinguish exact telc variants, require authority/employer/professional-body confirmation, and direct readers to authorised-centre checks.
- UK, Canada, Italy, Spain, France, Finland, Netherlands, and Portugal guides now explicitly operate as starter routes, with the relevant authority, exact test, local centre, and time-sensitive official check in the decision sequence.

Chinese and trust-page result:

- `/zh/` and `/zh/germany-family-reunion-a1/` now explain the Chinese Germany A1 decision order, who should check an exemption first, and why Chinese readers should preserve official evidence rather than rely on agency or community claims.
- About, Contact, Editorial Policy, Privacy, Cookie, Terms, and Affiliate pages now state the official-source hierarchy, correction evidence and priority, Chinese coverage boundary, sensitive-document boundary, and no-leak/no-guarantee boundaries more clearly without changing their underlying legal role.

Content-depth assessment:

| Cluster | Grade | Assessment |
|---|---|---|
| Germany A1 hub and core guides | A | Model route: requirement, acceptance, fee, centre, documents, preparation, retake, official checks, and connected next actions. |
| Remaining Germany A1 support guides | A | Shared decision layer plus established cluster links; retained as route-support pages. |
| Germany B1+ | B | Decision framing, authority check, provider choice, local fee/centre/retake risks are now explicit; individual pages can later gain more case studies. |
| TestDaF | B | University/TDN/application-timeline decision checks are explicit; target-programme pages remain the human verification point. |
| telc Deutsch | B | Exact-variant, authorised-centre, employer/authority checks and next actions are explicit. |
| UK / Canada / Italy / Spain / France / Finland / Netherlands / Portugal | B | Clear starter-guide boundary, route-specific decision checklist, official verification, and cluster next action; not represented as full country dossiers. |
| Chinese homepage and Germany A1 core guides | A | Chinese-intent route path with official-source boundary and actionable sequence; deliberately not a machine-translated full site. |
| About / Contact / Editorial / Legal | A | Clear trust, correction, commercial, sensitive-data, and no-guarantee boundaries; legal meaning not materially expanded. |

Risk and human verification list:

- Re-check the current German mission or authority rule and possible exemptions for each individual family-reunion case.
- Re-check local official centre status, fees, dates, ID rules, cancellation terms, result timing, and certificate delivery before every booking.
- Re-check university programme language requirements and TDN/alternative-proof conditions for each TestDaF applicant and intake.
- Re-check exact certificate acceptance with the relevant authority, employer, or professional body for Germany B1/telc, UK, Canada, and other country routes.
- Legal/privacy text is clearer but should receive counsel review before any jurisdiction-specific claim, data processor, cookie banner, or monetisation change.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed; 79 static pages generated.
- `npm run launch-check`: passed; 55 checks, READY.
- `git diff --check`: passed.

Recommended next module:

- Perform a human official-source spot-check of the high-risk route pages (Germany A1, B1/telc, TestDaF, Canada, UK) in the live deployment, then deepen individual non-Germany starter-guide bodies only where real authority-specific scenarios warrant it.

## Manual Confirmation Needed

- Real waitlist provider and destination.
- Whether to add a visible waitlist section to Astro homepage or change CTA to Contact.
- Whether `/do-i-need-german-a1.html` should be migrated into Astro.
- Whether Chinese should remain homepage-only or become guide-level localization.
- Whether category filtering should stay client-side or become real route pages.
- Whether to formalize `country`, `exam`, and `level` in guide frontmatter.
- Which layer the live deployment currently serves: Astro `dist/` or legacy root static files.

## Window 0: Product-Upgrade Scan And Workstream Boundary — 2026-07-11

Role: flowlight.me total coordinator.

Scope completed:

- Performed a read-only scan of the live Astro source, legacy compatibility layer, project documentation, route/content inventory, shared components, style system, automated test status, and the supplied Window 1–7 briefs.
- No product, content, UI, SEO, deployment, or dependency code was changed. This entry records the delivery boundary for the follow-on windows.

Current-state decision:

- The active source of truth is `src/` (Astro). The root HTML/JS/CSS layer remains a legacy compatibility surface and must not be used as the primary place for new product work unless the deployment layer is confirmed.
- The Germany A1 cluster is already the deepest English route (16 guides) and should be reused rather than recreated. Germany B1 has nine supporting guides, but lacks the requested settlement/citizenship pillar and route-level hub.
- Homepage “Route Finder” is currently explanatory UI, not an interactive decision tool. There are no dedicated tool, pricing, product, route-review, or partners routes; there is no real email capture destination.

Recommended non-overlapping window order:

1. Window 1: shared information architecture and compliance surfaces, including the navigation/footer contract and an Astro homepage handoff point for tools.
2. Window 4: build the shared, configurable tool engine plus dedicated tool routes. This must own client-side logic and any new tool-specific components only.
3. Window 6: add pricing, product, route-review, partners, and email-capture UI after the tool CTA targets are settled. A payment provider and email destination still need owner confirmation.
4. Window 2: map existing A1 guides to the required cluster and fill only the factual/content gaps after the tool/product URLs exist.
5. Window 3: create the B1 settlement/citizenship pillar and requested supporting route pages, using the same shared tool/product links.
6. Window 5: complete cross-cluster SEO, structured-data, and internal-link audit after the new routes exist.
7. Window 7: perform the final UI-only visual/mobile unification pass after structural work is stable.

Protected areas:

- Do not hand-edit `dist/`, alter deploy configuration, delete legacy pages, or change canonical/sitemap behavior without a dedicated verified scope.
- Do not add claims about certificate acceptance, exemptions, fees, dates, visa outcomes, official affiliation, or legal advice without current authoritative-source verification.
- Do not create competing global navigation, footer, CTA, or style systems in downstream windows; extend the shared Astro components and `src/styles/global.css`.

Verification:

- `npm test`: passed (`site data and tool logic checks passed`).

## Window Prompt Refinement — 2026-07-11

Role: total-dispatch documentation owner.

Scope completed:

- Converted the supplied Window 0–7 briefs into executable, non-overlapping prompts in `docs/PRODUCT_UPGRADE_WINDOW_PROMPTS.md`.
- Added shared guardrails, dependency order, per-window file ownership, explicit allowed/prohibited changes, deliverables, acceptance checks, human-decision gates, and a single handoff format.
- No application, content, CSS, route, SEO, deployment, or dependency code was changed.

Key coordination decisions:

- Run information architecture before the tool engine; run products after tool URLs exist; run A1/B1 content after shared CTA URLs exist; run SEO after URLs are frozen; run UI only after structure is stable.
- The A1 window must map and deepen the existing 16-guide cluster rather than recreate a parallel 12-page cluster.
- Real email, payment, delivery, and Route Review service promises remain blocked on owner-confirmed providers and operations.

Verification:

- `git diff --check`: passed.

## Window 0: Dispatch Verification And Release Gate — 2026-07-11

Role: flowlight.me total coordinator.

Scope completed:

- Re-scanned `src/pages`, `src/components`, `src/layouts`, `src/content/guides`, `src/styles`, `tests`, `scripts`, Git state, the product-upgrade prompt, deployment files, and the reachable production homepage.
- Updated `docs/PROJECT_CONTEXT.md` with the current functional matrix, exclusive file ownership, acceptance/return rule, execution order, and business-risk register.
- No product, content, CSS, route, deployment, or dependency file was changed.

Release-gate finding:

- Production is **not verified to serve the Astro output**. The current live homepage showed 43 guides, 15 Germany A1 guides, and 4 Germany B1 guides; the current local Astro source has 49, 16, and 9 respectively.
- The checked-in CVM deployment script clones/pulls the repository into the Nginx document root and reloads Nginx, but does not build Astro or serve `dist/`. Therefore no Astro-window handoff may claim an online release until the hosting owner confirms and implements a build-and-publish contract.

Functional status:

- Existing: Astro foundation, A1 cluster, B1 supporting guides, SEO baseline, shared visual system.
- Partial: homepage/navigation/trust surfaces and B1 route structure.
- Missing: five interactive tools, product/pricing pages, Route Review, Partners, real email capture, payment, and fulfilment.
- Business confirmation required: deployment contract; email provider/data flow/retention; payment/delivery/refund/tax/support owner; Route Review reviewer/SLA/capacity/secure-intake policy; current official facts; AdSense CSP/consent posture.

Dispatch decision:

1. Keep the established execution order: Window 1 → 4 → 6 → (2 and 3 in parallel) → 5 → 7.
2. Treat deployment as an owner decision gate alongside, not inside, the code windows.
3. Do not permit concurrent edits to shared `index.astro`, Header, Footer, layouts, or `global.css`; the detailed exclusive ownership contract is in `docs/PROJECT_CONTEXT.md` and `docs/PRODUCT_UPGRADE_WINDOW_PROMPTS.md`.
4. Return any handoff that crosses its file boundary, lacks proportional verification, or claims unconfigured email/payment/review service behavior to the originating window.

Verification:

- `git diff --check`: passed before this documentation update.
- Production homepage was read on 2026-07-11 and compared with the current source inventory.

Scope not touched:

- All application code, guide bodies, CSS, build output, hosting configuration, email/payment integrations, and server state.

## Window 5: SEO, Schema And Internal-Link Audit — 2026-07-11

Role: search structure and cluster-connection owner.

URL freeze decision:

- Audited the actual Astro route set after Window 1, 2, 3, 4, and 6 pages were present. No renamed, temporary, or unresolved target URL was found in the new A1, B1, tool, pricing, product, Route Review, or partner routes.
- Treated the following as the frozen SEO contract for this window: `/germany-family-reunion-a1/`, `/germany-b1-settlement-citizenship/`, `/tools/{route-finder,checklist-generator,timeline-calculator,exam-comparison,email-reminders}/`, `/pricing/`, `/products/{a1-family-reunion-pack,a1-practice-pack}/`, `/route-review/`, and `/partners/`.

SEO matrix:

| URL / page role | One primary search intent | Next step CTA | Structured-data decision |
| --- | --- | --- | --- |
| `/germany-family-reunion-a1/` | Germany A1 family-reunion route | Requirement guide → tools → proposed A1 packs / Route Review | FAQPage retained because the page exposes the matching FAQ visibly. |
| A1 requirement, provider-comparison, booking, timing, documents, retake, and preparation guides | One decision per guide: requirement, accepted proof, provider choice, booking risk, timeline, documents, retake, or practice | Back to A1 hub plus the relevant planning tool / proposed support | Article + BreadcrumbList retained on every generated guide. |
| `/germany-b1-settlement-citizenship/` | Germany B1 language proof for settlement permits and citizenship | B1 checklist/timeline/comparison → free tools → pricing / Route Review | No FAQ schema: the page does not present a FAQ section. |
| B1 settlement, citizenship, Leben in Deutschland, checklist, timeline, and exam-comparison guides | One B1 proof or planning question per page, distinct from A1 family reunion | B1 hub → planning tool → Route Review | Article + BreadcrumbList retained. |
| `/tools/*` | Route finding, checklist creation, timeline planning, exam-comparison questions, or local reminder drafting | A1/B1 hub → proposed packs / Route Review | No HowTo schema: these are interactive planning utilities, not step-by-step instructional articles. |
| `/pricing/`, `/products/*`, `/route-review/`, `/partners/` | Transparent support scope, not a claim of a purchasable product or accepted service | Free tools → relevant route hub → contact intent | No Product schema: price, delivery, availability, and service acceptance are not confirmed. |

Search / link changes:

- Replaced A1 hub and tool-result shortcuts that went directly to contact-intent query URLs with the real product-scope and Route Review pages. Those pages still make the contact-intent boundary explicit.
- Added the A1 Practice Pack to the A1 route’s next-step set.
- Connected every tool result to both the A1 and B1 hubs, both proposed A1 product-scope pages, and the Route Review boundary.
- Added both route hubs to the commercial-page boundary and added Pricing to the B1 hub’s conversion path. This removes the prior one-link-only entry condition for each proposed product page without changing a tool calculation, commercial promise, or page fact.
- Extended `launch-check` to enforce unique rendered titles/descriptions, visible-FAQ-only FAQPage use, retained homepage WebSite and guide Article/BreadcrumbList schemas, the complete core sitemap set, and the required A1/B1/tool/product cross-links.

Audit result:

- Generated output has 95 pages, each with exactly one H1, a title, a useful meta description, and a `flowlight.me` canonical URL.
- No duplicate rendered title or meta description, no broken generated internal link, and no generated-page orphan was found.
- All indexable A1, B1, tool, pricing, product, Route Review, and partner URLs are in the generated sitemap. Noindex legal pages retain `noindex,follow` and are excluded from the sitemap.

Human official review still required:

- Germany A1: the receiving authority’s current requirement/exemption handling; accepted certificate; local centre status, fees, dates, ID, cancellation, result, and document rules.
- Germany B1: the competent authority’s current settlement/naturalisation requirements and exact accepted language/civic evidence; no VisaLang page decides individual eligibility.
- Any product or Route Review launch: price, tax, refund, delivery, reviewer qualifications, secure intake, capacity, and contact-data handling before the page can become a real sale or service.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 95 pages generated.
- `npm run launch-check` — passed; 60 checks, READY.
- `git diff --check` — passed.

## Window 5 handoff

### Completed

- Search intents are separated between A1 family reunion, B1 settlement/citizenship, tools, and proposed products; no competing primary page was added.
- Schema stays conservative: WebSite, Article, BreadcrumbList, and visible FAQPage are retained; no unsupported HowTo or Product schema was introduced.
- Cross-cluster links and sitemap/indexing contracts are now regression-checked.

### Files changed

- `src/data/route-tools.ts`, `src/components/tools/ToolResultSupport.astro`, `src/components/products/CommercialBoundary.astro`, `src/pages/germany-family-reunion-a1.astro`, `src/pages/germany-b1-settlement-citizenship.astro`, `tests/route-tools.test.js`, and `scripts/launch-check.js`.

### Decisions/interfaces for next window

- Keep the frozen URL set above. Window 7 may change presentation only; it must not change these routes, their primary search intent, schema strategy, or CTA destinations.
- Proposed packs and Route Review remain informational, non-purchasable/contact-intent pages and intentionally do not use Product schema.

### Human confirmation still required

- The current official facts and all real commercial-operation decisions listed above; deployment remains a separate owner gate.

## Window 8: Final Release Closure — 2026-07-11

Role: final release owner for scope audit, functional acceptance, fact-risk review, SEO, accessibility/mobile checks, build verification, narrow defect repair, Git delivery, and deployment handoff.

### Start-state audit

- Branch: `main`; upstream: `origin/main`; remote: `https://github.com/fan0269-code/VisaLang.git`.
- The branch started two commits ahead of `origin/main`: `897c5e2 content: complete Germany A1 decision cluster` and `265e4d5 content: add Germany A1 writing route`.
- The Window 8 baseline had 23 modified tracked files and 17 untracked status entries representing 23 untracked files. No staged file was present.
- All baseline changes predated Window 8. Git could identify the two committed A1 changes, but could not identify authorship for the uncommitted Window 0–7 files. The task log contained explicit Window 0 and Window 5 handoffs, while separate Window 1, 2, 3, 4, 6, and 7 handoffs were not present. Window 8 therefore treated those files as provenance-incomplete until their diff, ownership boundary, rendered behavior, and tests were checked.
- The real release scope is limited to the documented Window 0–7 source set plus the narrow Window 8 fixes below: shared navigation/footer/home/trust pages; A1 and B1 route content; five client-side tools; proposed/contact-intent commercial pages; shared tool/product components and data; shared CSS; tests; launch checks; and coordination docs.
- Protected areas remained untouched: `deploy/**`, `astro.config.mjs`, `public/_headers`, `public/_redirects`, `public/robots.txt`, legacy root pages, dependency manifests/lockfiles, and generated `dist/**` were not edited or staged.

### Acceptance result

- Functional: Route Finder, Checklist, Timeline Calculator, Exam Comparison, and Reminder Planner were exercised in a rendered browser. The configured A1 result, checklist completion state, calculated dates, six-row comparison, and explicit local-only reminder result all appeared correctly.
- Commercial boundary: pricing, proposed packs, Route Review, and Partners remain informational/contact-intent surfaces. No false purchase, email-send, delivery, or review-acceptance state was found.
- Content and fact risk: new A1/B1 content consistently sends acceptance, exemption, fee, date, result, retake, document, settlement, and citizenship decisions back to the responsible authority or official provider. BAMF DTZ/Leben in Deutschland and settlement guidance, the current Nationality Act B1 rule, Goethe A1, and telc A1 sources were checked against official first-party pages.
- SEO: generated titles and descriptions are unique; every generated page has one H1, a useful description, a `flowlight.me` canonical URL, and resolved internal links. Required A1/B1/tool/product URLs are generated and included in the sitemap; noindex legal pages remain excluded.
- Accessibility/mobile: checked desktop and 390px pages had labelled controls, named buttons, no application console errors, and no horizontal overflow. This is a focused release check, not a full WCAG conformance audit across every browser and assistive technology.

### Window 8 defects fixed

1. `tests/germany-a1-cluster.test.js` was committed but not executed by `npm test`, and its hub assertions still expected pre-Window-5 contact URLs. Added it to the main test entry and split guide contact-intent links from the frozen hub product/Route Review links.
2. Four new B1 surfaces used a superseded BMI naturalisation URL. Replaced it with the current German Government naturalisation guidance and added a regression assertion.

### Verification

- `npm test`: passed; route tools, commercial pages, Germany A1 cluster, and the site suite all ran.
- `npm run build`: passed; 95 static pages generated.
- `npm run launch-check`: passed; 60 checks, 0 warnings, 0 failures, `READY`.
- `git diff --check`: passed.
- Rendered browser QA: desktop key pages and 390px mobile key pages passed HTTP/title/H1/overflow/control-name/console checks; all five tools passed their primary interaction.
- `lint` and `typecheck`: not run because `package.json` defines neither script.

### Release and deployment handoff

- The source is acceptable to commit and push on the current branch after one final post-document verification.
- Push success must not be reported as live deployment success.
- Production remains blocked on the documented source-of-truth decision: the checked-in CVM flow pulls the repository root and reloads Nginx but does not build Astro or publish `dist/`.
- After the hosting owner implements and verifies the chosen build/publish contract, confirm the live route count and spot-check `/`, both Germany hubs, all five tools, pricing/products/Route Review/Partners, sitemap, robots, and production 404s.

### Git delivery result

- Created `01536f4 feat: complete VisaLang product upgrade` and pushed it together with the two pre-existing local A1 commits to `origin/main`.
- Post-push Git state was clean and synchronized: `HEAD` and `origin/main` both resolved to `01536f4205effe3844607e13445217c1db7ec12f` before this final handoff note.
- A post-push production check still showed the legacy homepage inventory: 43 guides, 15 Germany A1 guides, and 4 Germany B1 guides. That does not match the validated 95-page Astro build, so production deployment remains unconfirmed and blocked on the hosting source-of-truth decision above.

## UI reference refinement — 2026-07-11

Scope: presentation-only refinement inspired by the high-level visual principles of NextNation (clear blue primary action, expressive editorial display type, generous whitespace, and contained information panels). No routes, copy, SEO/schema, data, CTA targets, tool rules, commercial claims, or deployment files changed.

Completed:

- Updated the shared visual tokens in `src/styles/global.css` for a calmer blue, lower-noise surfaces, stronger type hierarchy, restrained shadows, and a more precise header treatment.
- Added the shared `hero--home` presentation wrapper to the English and Chinese homepages. It creates an elevated but still information-first entry surface without changing either homepage's content or actions.
- Refined common decision panels, numbered verification steps, cards, and primary actions so they read as one coherent, international product system on desktop and mobile.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 95 static pages generated.
- `git diff --check` — passed.
- Rendered QA at `http://127.0.0.1:4321/`: homepage loaded with no relevant console warnings/errors at desktop and 390px mobile; mobile document width stayed within the viewport.
- Interaction QA: homepage primary CTA -> `/tools/route-finder/`; Route Finder rendered correctly at 390px with no horizontal overflow or relevant console warnings/errors.

## Figma export visual-system adoption — 2026-07-11

Input reviewed: `/Users/fanlw/Downloads/Optimize Flowlight UI`, the exported implementation for the `Optimize Flowlight UI` Figma design.

Scope: visual-only. Existing page copy, routes, canonical/SEO/schema output, data, CTA targets, tool behavior, commercial boundary, and deployment configuration remain unchanged. Reference-only photography and replacement text from the export were intentionally not imported.

Completed:

- Reworked the shared visual system around the export's warm white, deep-navy, and restrained-gold palette; Poppins body typography; Italiana display hierarchy; soft ambient backgrounds; and translucent glass surfaces.
- Converted the global header into a floating, blurred navigation surface and restyled shared cards, route steps, panels, buttons, guide CTA, and tool surfaces so the site reads as one coherent system.
- Applied the homepage layout treatment to both English and Chinese entry pages by adding presentation-only `site-main--home` classes; no visible copy or behavior changed.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 95 static pages generated.
- `git diff --check` — passed.
- Rendered QA: desktop homepage and a configured 390px mobile viewport loaded with the expected title/hero, no relevant console warnings/errors, and no horizontal document overflow.
- Interaction QA: the unique homepage primary CTA continued to navigate to `/tools/route-finder/`; the resulting mobile Route Finder page rendered with no horizontal overflow or relevant console warnings/errors.

## NextNation-inspired homepage design refinement — 2026-07-12

Scope: UI-only redesign based on a live visual reference from `https://nextnation.co/`. The reference informed hierarchy, contrast, whitespace, contained panels, and action emphasis; its branding, copy, login modal, imagery, immigration-service claims, and assets were not copied. Route data, tool behavior, SEO/schema, verification wording, commercial boundaries, and deployment configuration remain unchanged.

Completed:

- Rebuilt the English homepage hero in `src/pages/index.astro` as a stronger split decision surface: headline and CTAs on the left, a three-move verification journey on the right, and an explicit verification boundary beneath the actions.
- Reworked the shared UI system in `src/styles/global.css`: blue primary action, navy emphasis surface, larger editorial type, rounded but restrained shared surfaces, clearer header states, stronger card interaction cues, and a dark global footer.
- Refined homepage route selection into a contained, high-contrast interaction surface. Hover/focus-capable routes receive visual feedback without changing their destinations.
- Added responsive rules for the split hero and retained full-width mobile CTAs, stable navigation, and single-column content at small widths.
- Updated the homepage CTA source assertions in `tests/site.test.js` to validate the real semantic links rather than the retired `PageHero` prop syntax. This preserves the behavior contract while allowing the homepage to own its visual structure.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.
- Visual QA: live source capture, local desktop capture, mobile capture, and a side-by-side comparison are saved under `.audit/flowlight-ui-2026-07-12/`; the formal review is in `design-qa.md` with `final result: passed`.
- Local desktop and 500px mobile captures show no clipped headings, off-screen primary action, or persistent-control overflow. The production deployment status remains separate and unverified by this local UI pass.

## Selected Option 3: pale-canvas route-atlas homepage — 2026-07-12

Scope: the user selected the third generated direction (international route planning) and then requested a pale background. This pass changes only the English homepage presentation, its original hero image asset, source assertions, and visual QA record. It does not change any route/tool logic, factual content, CTA destination, sitemap/schema, commercial claim, or deployment configuration.

Completed:

- Reframed the homepage headline around route planning and verification, then added an original `public/images/route-atlas-hero.png` asset with route-relevant mountain, rail, and city imagery.
- Rebuilt the selected hero as three desktop zones: verification copy, route atlas, and a cobalt three-step planning panel.
- Kept the surrounding canvas pale blue for information density and reading comfort, while retaining the selected direction's dark-navy hero stage, cobalt planning panel, yellow primary action, and yellow route-step markers.
- Added the homepage-specific light/dark token rules without changing the shared route, guide, or tool content surfaces.
- Added a precise mobile override after visual QA found the more-specific homepage grid overriding the generic single-column breakpoint. The corrected 500px screenshot now has one ordered column, full-width actions, and no clipped persistent controls.
- Updated the homepage source assertion so the selected route-planning task and route-atlas asset are regression-checked.

Verification:

- `npm test` — passed after the selected-homepage assertion and responsive repair.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.
- Desktop evidence: `.audit/flowlight-ui-2026-07-12/09-option3-light-desktop.png`.
- Mobile evidence: `.audit/flowlight-ui-2026-07-12/11-option3-light-mobile-fixed.png`.
- Comparison evidence and full current QA record: `design-qa.md` (`final result: passed`).

Correction after clarification:

- The user clarified that “pale background” applies only to the page canvas, not to the selected third direction's hero identity. Restored the dark-navy route stage, yellow primary action, route-atlas composition, cobalt three-step panel, and dark route selector; no route/tool/content behavior changed.
- Corrected desktop evidence: `.audit/flowlight-ui-2026-07-12/14-option3-corrected-desktop-fixed.png`.
- Corrected mobile evidence: `.audit/flowlight-ui-2026-07-12/15-option3-corrected-mobile.png`.

## Exam-learning visual-system refinement — 2026-07-12

Scope: full shared UI-system refresh and English homepage presentation inspired by the high-level product patterns of `https://www.testgerman.de/`: spacious learning-oriented composition, bright primary action, a contained practice-style panel, and clear progression. This is not a clone: TestGerman branding, logo, copy, user counts, course/exam data, pricing, product claims, AI mentor flow, imagery, partner badges, and page implementation were not copied. VisaLang route data, tool behaviour, SEO/schema, legal/verification boundaries, and CTA destinations remain unchanged.

Completed:

- Replaced the prior mixed visual overrides with a coherent light exam-learning system: warm off-white canvas, navy text, restrained blue support surfaces, yellow primary action, compact navigation, and softened information panels.
- Rebuilt the English homepage hero into an original decision-and-practice composition using VisaLang's existing original route-atlas asset and verification-first language.
- Applied the new system across shared cards, route selectors, guide articles, tool panels, filters, notices, and footer so the non-homepage routes keep the same visual family.
- Created a Figma design file named `VisaLang · Exam learning UI direction`. The first local-page import could not finish because the connected Figma/Codex account reached its current usage limit; no partially imported capture is treated as a completed Figma deliverable.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- Desktop evidence: `.audit/flowlight-ui-2026-07-12/16-exam-learning-desktop.png`.
- Mobile evidence: `.audit/flowlight-ui-2026-07-12/17-exam-learning-mobile.png`; no clipped primary actions or horizontal overflow observed.

## Optimize Flowlight UI warm-system adoption — 2026-07-12

Input reviewed: `/Users/fanlw/Downloads/Optimize Flowlight UI (1)`, the user-provided React export.

Scope: presentation-only adoption of the export's warm paper palette, wine-red primary action, yellow support surface, rounded `Baloo 2` display type, compact navigation, and white route-check card pattern. Existing VisaLang routes, guide/tool logic, legal boundaries, structured data, CTA destinations, and deployment configuration remain unchanged.

Completed:

- Added the source direction's `Baloo 2` and `Poppins` type pairing through shared layout font links, then applied it to the visual hierarchy without changing content semantics.
- Rebuilt the English homepage hero as a reference-aligned white route-check card: status badge, authority-first route prompt, green progress state, pale-yellow explanatory note, and wine-red primary action.
- Reworked the shared header, footer, buttons, route grids, cards, guide/tool surfaces, alerts, and filters into the same warm visual system. The global brand now uses the intended `Visa` / red `Lang` treatment.
- Removed the stale IPv4 local preview process and started a read-only static local preview from the fresh `dist/` output at `http://127.0.0.1:4321/`; this does not change production hosting.

Verification:

- Desktop evidence: `.audit/flowlight-ui-2026-07-12/22-warm-reference-desktop-built.png`.
- Mobile evidence: `.audit/flowlight-ui-2026-07-12/23-warm-reference-mobile-built.png`; no horizontal overflow, clipped action, or hidden route-check panel observed.

## Open Design cool-blue UI sync — 2026-07-13

Input reviewed: `/Users/fanlw/Library/Application Support/Open Design/namespaces/release-stable/data/projects/65a225e9-0d82-423a-a31a-67620219401a`.

Scope: presentation-only sync from the Open Design project. No guide text, exam facts, route logic, URLs, SEO metadata, structured data, legal copy, tool calculations, or deployment configuration were changed.

Completed:

- Replaced the compressed `open-design.css` layer with a maintainable cool-blue Open Design system: restrained 8/12/16 radius scale, opaque header, official-first blue action colour, teal route accent, stronger focus rings, mobile rules, and retained system dark-mode tokens.
- Disabled the older warm paper / wine-red / Baloo 2 override block in `global.css` by archiving it inside a non-matching media query, so it no longer competes with the active Open Design layer.
- Removed the now-unused Google font links from `BaseLayout.astro`, since the active Open Design layer uses the system/Noto stack.
- Added the `od-tools` page scope to `/tools/` so the tools index gets the intended feature-card rhythm without changing tool destinations or logic.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.

## Homepage Open Design override repair — 2026-07-13

Scope: homepage UI bug fix after the Open Design sync. No content, routes, SEO metadata, structured data, tool logic, or deployment configuration changed.

Cause:

- Older homepage-specific selectors in `global.css` used `body:has(.site-main--home)` and had higher specificity than the new generic Open Design selectors.
- As a result, homepage-only surfaces such as the header, route selector, route cards, last-checked badges, and verification alert could inherit stale dark/warm styling instead of the active cool-blue Open Design layer.

Completed:

- Added homepage-scoped Open Design overrides in `src/styles/open-design.css` for the header, navigation states, route selector, route cards, article cards, badges, and verification alert.
- Added a tight source-level check for the required homepage OD override selectors during the repair pass.

Verification:

- Homepage OD override check — passed.
- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
## Open Design final alignment release prep — 2026-07-13

Scope: final presentation-only alignment from the Open Design project before production release. No guide text, exam facts, route logic, URLs, SEO metadata, structured data, legal copy, analytics, advertising, deployment script, or tool calculations were changed.

Completed:

- Added the Open Design brand mark and favicon assets to the public static tree, then connected them to the shared header, footer, and document favicon.
- Tightened the active `open-design.css` layer for header/footer branding, route-finder/tool panels, tool steppers, guide-list card rhythm, compact mobile filters, and mobile overflow protection.
- Verified the real 390px mobile viewport with Chrome DevTools Protocol; homepage, guide library, and Route Finder reported document width equal to viewport width.

Local verification:

- `npm test` — passed.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.

Release result:

- UI payload commit: `ef1f9dca9e5add2ea0a88a04a7eaf93663f800da`.
- `flowlight.me` DNS target during release: `107.150.102.145`; standard server deploy completed, server source resolved to `ef1f9dc`, Nginx test/reload passed, and the published static output included `favicon.svg`, the Open Design CSS tokens, and the shared header mark.
- `www.flowlight.me` DNS target during release: `43.162.126.37`; server source resolved to `ef1f9dc` when checked with `sudo git`. Server-side build failed because Node.js was `v20.20.2` while Astro 7 requires `>=22.12.0`, so the locally built and verified `dist` artifact was synchronized to `/var/www/flowlight.me/public/dist`; Nginx test/reload passed.
- Rollback artifacts: `107.150.102.145:/var/www/flowlight.me/releases/20260713T080850Z-pre-ef1f9dc-dist` and `43.162.126.37:/var/www/flowlight.me/releases/20260713T080853Z-pre-ef1f9dc-dist`.

Public smoke check:

- `https://flowlight.me/`: HTTP 200 and expected Open Design header/homepage markers.
- `https://flowlight.me/tools/`: HTTP 200.
- `https://flowlight.me/guides/`: HTTP 200.
- `https://flowlight.me/tools/route-finder/`: HTTP 200.
- `https://www.flowlight.me/`: HTTP 200 and expected Open Design header/homepage markers.
- `https://www.flowlight.me/tools/`: HTTP 200.
- `https://www.flowlight.me/guides/`: HTTP 200 on retry and expected guide-library/header markers.
- `https://www.flowlight.me/favicon.svg`: HTTP 200.

Operational follow-up:

- Upgrade Node.js on `43.162.126.37` to `>=22.12.0` and fix Git safe-directory/ownership so the standard server-side deploy script can build there without the local-artifact fallback.

## Open Design homepage structure sync — 2026-07-13

Scope: presentation-layer homepage alignment from the provided Open Design project at `/Users/fanlw/Library/Application Support/Open Design/namespaces/release-stable/data/projects/65a225e9-0d82-423a-a31a-67620219401a`. No URLs, SEO metadata, structured data, guide facts, route data, tool calculations, legal copy, analytics, advertising, or deployment configuration changed.

Completed:

- Reworked the homepage source structure to match the Open Design route-decision layout: route console, staged decision lane, resource entry panel, purpose selector, recently updated guides, and trust boundary band.
- Added the matching Open Design CSS layer for the new homepage components, including 8/12/16px radius rhythm, cool-blue tokens, non-glass surfaces, route-choice controls, responsive stage cards, and mobile one-column fallbacks.
- Updated the source-level homepage UI regression checks so they guard the new route-console/trust-band structure instead of the previous temporary `od-*` homepage markers.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.

## Guide library maturity-positioning window — 2026-07-13

Scope: narrow content-positioning and guide-library presentation cleanup for `/guides/`, guide category pages, guide cards, and guide status labels. No new country, exam, route, guide page, tool logic, commercial flow, deployment configuration, analytics, form, email, payment, advertising, `dist/`, or root legacy HTML work was in scope.

Completed:

- Centralized guide maturity display in `src/data/guide-taxonomy.ts`: Germany A1 is `Complete route`, Germany B1 is `Core route`, and all other guide categories remain `Starter overview`.
- Updated `/guides/` copy, status filter options, route relevance sorting, and Chinese Germany A1 card status so mature/core routes are easier to distinguish from starter overviews.
- Updated guide category intros and category/list cards so Germany A1, Germany B1, and starter categories no longer present as the same maturity level.
- Reused the same status mapping on guide article headers to avoid B1 guide pages being labelled as starter while the category/library presents them as a core route.
- Added a focused regression assertion for the guide-library maturity vocabulary and taxonomy mapping.

Not changed:

- No guide pages were added or removed; the build still generated 98 pages and retained all 54 English guide source files.
- No A1/B1 article body facts, official-source claims, fees, timelines, acceptance statements, route tools, pricing, partners, Route Review, analytics, forms, email, payment, ads, deployment scripts, `dist/`, or legacy root HTML files were changed.

Remaining risk:

- Non-Germany and non-core Germany exam categories are still starter overviews; deeper official-source expansion should remain a separate phase-2/content-quality or later data-led route window.
- This window improves presentation clarity only; it does not prove live production deployment state because deployment was explicitly out of scope.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.
