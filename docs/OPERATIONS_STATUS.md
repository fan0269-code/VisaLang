# VisaLang Operations Status

Updated: 2026-07-19
Window: Germany B1 source-review and route production release

## Decision at a glance

- **本地源码状态：已提交并推送。** Germany B1 来源复核与路线修正的应用提交为 `c99877850ab13a98851b5bfc9a0d2b0f5d99710d`；本地和服务器发布门禁均通过。
- **线上部署状态：已部署并验证。** `visalang.org` 当前不可变发布为 `/var/www/visalang.org/releases/c99877850ab1`；Nginx 原子切换、服务器 gate、公网 smoke、页面复核标记和路线检查通过。
- **回滚状态：可用但未触发。** 发布前版本 `/var/www/visalang.org/releases/1521d98021e0` 保留完整；本次没有发生强制回滚条件。
- **内容复核状态：八篇核心页已完成。** 8 篇 Germany B1 核心路线指南已完成页面事实、来源边界和核验流程复核，日期均为 2026-07-19；5 篇备考支持页继续 `pending`。读者的具体法定路线、当地主管机关、证明接受形式、费用和日期仍须实时核验。
- **广告/CMP 状态：本轮未改变。** CMP 选择、Auto ads 位置、CLS、浏览器网络行为和账户侧证据仍需单独的受控验证窗口。
- **历史边界：** 下方 `flowlight.me`、无广告状态和旧 `/public/dist` 发布记录仅为带日期的历史证据，不证明当前 `visalang.org` 线上状态。
- **未处理范围：** 本窗口未新增 analytics、表单、支付、邮件投递或其他服务集成，也未修改 DNS、TLS、CMP 或广告账户配置。

## Germany B1 source-review release — 2026-07-19

- Application commit and immutable release: `c99877850ab13a98851b5bfc9a0d2b0f5d99710d` / `/var/www/visalang.org/releases/c99877850ab1`.
- Previous verified release retained for rollback: `/var/www/visalang.org/releases/1521d98021e0`.
- Server release gate: Node.js `v22.23.1`; locked dependency install reported 0 vulnerabilities; `npm test` passed; `npm run launch-check` built 101 pages and passed 37 checks with 0 failures, ending in `READY`; Nginx configuration testing and atomic switch passed.
- Production smoke: homepage, Guide Library, robots and sitemap returned 200; legacy routes and `www` returned expected canonical 301 redirects.
- B1 public verification: all eight core guides displayed the 2026-07-19 official-source review marker; none rendered an alphabetic Previous guide; all seven non-terminal pages rendered the specified explicit Next guide; the checklist remained terminal; the Hub rendered its self-canonical URL, accessible TOC and `CollectionPage` structured data.
- Review boundary: the five preparation-support guides remain pending. Reader-specific route, authority, proof acceptance, exception, centre, fee, date and submission details remain live verification items rather than page-level review gaps.
- No DNS, TLS, CMP, advertising account, analytics, form, payment or email-delivery configuration was changed. No rollback trigger occurred.

## Germany A1 source-review release — 2026-07-19

- Application commit and immutable release: `1521d98021e0eb80efa3dc453bce0e8ea766de4e` / `/var/www/visalang.org/releases/1521d98021e0`.
- Previous verified release retained for rollback: `/var/www/visalang.org/releases/5cfe8eedc290`.
- Review result: the three formerly pending English pages display source-review date 2026-07-19; all eight Chinese Germany A1 records display the same date and the visible role `来源与翻译审查`.
- Evidence boundary: China / Beijing / Beijing German Cultural Center · Goethe-Institut China is the bounded local example. Its 2026 price and local contract terms were not generalized to another centre. Start Deutsch 1 is recorded as a non-modular whole examination; local next-attempt dates, seats and fees remain centre-controlled.
- Server release gate: locked dependency install reported 0 vulnerabilities; `npm test` passed; `npm run launch-check` built 101 pages and passed 37 checks with 0 failures, ending in `READY`; Nginx configuration testing and atomic switch passed.
- Public smoke: homepage, Guide Library, robots and sitemap returned 200; legacy and `www` routes returned expected 301 redirects. All three English review-date markers and the checked Chinese review-date/role/title markers were present on the public site; reviewed Chinese output did not contain the pending-review message.
- The first pre-deploy SSH command stopped before deployment because a nonessential `git status` hit Git's dubious-ownership protection. No switch occurred in that attempt. The repository deployment script then ran successfully without changing the global Git safe-directory configuration.

## Germany A1 content release — 2026-07-19

- Application commit and immutable release: `5cfe8eedc290dd3ef03a2f27617a33ccd3425bd0` / `/var/www/visalang.org/releases/5cfe8eedc290`.
- Previous verified release retained for rollback: `/var/www/visalang.org/releases/0e1dec2929ca`.
- DNS/TLS path: `visalang.org` and `www.visalang.org` resolved through Cloudflare; direct origin verification against `107.150.102.145` returned the same current page timestamp and successful HTTPS response. `www` redirected to the canonical apex host.
- Server release gate: Node.js `v22.23.1`; locked dependency install reported 0 vulnerabilities; `npm test` passed; `npm run launch-check` built 101 pages and passed 37 checks with 0 failures, ending in `READY`.
- Publication: server source fast-forwarded from `0e1dec2` to `5cfe8ee`; the deployment script created the commit-addressed release, installed the legacy redirect snippet, passed `nginx -t`, switched `current` atomically and reloaded Nginx.
- Public smoke: homepage, Guide Library, robots and sitemap returned 200; legacy `.html` routes and `www` returned the expected canonical 301 redirects. The three new Chinese routes, reviewed/pending English source-state markers and Chinese sitemap entry were present online.
- Local smoke caveat: the first macOS smoke attempt failed before HTTP validation with a LibreSSL/Cloudflare `SSL_ERROR_SYSCALL`. The same repository smoke script passed from the production host, and a second public marker check completed 6/6 without the local TLS path.
- Remaining manual evidence: CMP choices, Auto ads placement, CLS and clean-profile browser network behavior were not part of this content release and remain separately gated.

## Content and UI remediation release — 2026-07-14

- Application commit: `5167dd45361cfa4920ca87c39091652d8e545405`.
- Production target: `107.150.102.145:/var/www/flowlight.me/public/dist`; both apex and `www` A records resolved to this host before deployment.
- Server Node.js: `v22.23.1`; server source advanced from `6b8131b` to `5167dd4`.
- Rollback artifact: `/var/www/flowlight.me/releases/20260714T115051Z-pre-5167dd4-dist`.
- Server verification: dependency audit reported 0 vulnerabilities; `npm test` passed; `npm run launch-check` passed with 98 routes and 31 checks; Nginx configuration test and reload passed.
- Public verification: apex, `www`, Guide Library, representative Complete/Core/Starter guides, Route Finder, Chinese entry, Privacy, Cookie and sitemap returned HTTP 200. Public Privacy/Cookie HTML contained the corrected URL/local-storage wording; the Spain pending guide contained the safe verification boundary; checked public HTML contained no AdSense, Cloudflare Insights or DoubleClick runtime markers.
- Served homepage SHA-256 after publish: `5a05525786f841c7350fd263e9cc1464d3c1048c7c0cef081b407e8a7d33294e`.
- Remaining release evidence gap: the in-app browser runtime still could not provide 375/768/1024/1440 screenshots or a clean-profile network HAR. HTTP and generated-HTML checks are not recorded as a substitute for that manual evidence.

## Previous 2026-07-13 decision snapshot

- **本地源码状态：已提交并推送。** 本次导航修复的应用提交为 `01b1827ad20d3cb7e8fc0fa3457f3fc675c1cb33`；提交前已通过 `npm test`、`npm run build`、`npm run launch-check` 和 `git diff --check`。
- **线上部署状态：已部署并可核对。** 当前 `flowlight.me` 与 `www.flowlight.me` 的 A 记录均为 `107.150.102.145`。该主机的 `/var/www/flowlight.me/source` 与 `/var/www/flowlight.me/public/dist` 已更新为 `01b1827` 产物；Nginx 配置检查与重载通过。工具页、路线页、关于页和 `www` 工具页均返回 HTTP 200。
- **业务/运营就绪状态：不满足准入。** 七项准入要求没有全部同时具备“已命名负责人”和“可检查证据”。页面文案、邮箱字符串、脚本存在或历史发布记录均不能替代真实权限、收件测试、责任授权或运营记录。
- **单一结论：暂不启动阶段 1。** 本次发布不接入服务、不修改隐私文案、不改变七项准入结论；只有七项全部补齐负责人和证据后，才能记录“可进入下一最小实施窗口”。

## Navigation menu fix release — 2026-07-13

- Server source advanced from `1c95a9f` to `01b1827ad20d3cb7e8fc0fa3457f3fc675c1cb33`.
- The fix restores direct `/routes/` and `/about/` links, separates their disclosure controls, and prevents the desktop navigation container from clipping open panels.
- Rollback artifact: `/var/www/flowlight.me/releases/20260713T142716Z-pre-1c95a9f-dist`.
- Verification: local and server `npm test` passed; server `npm run launch-check` passed with 25 checks and 0 failures. Public HTML contains both direct links and two disclosure controls; final CSS contains a visible-overflow navigation rule; tools, routes, about, and `www` tools pages returned HTTP 200.

## Full release record — 2026-07-13

- User-authorized full release: server source advanced from `8d66394` to `1c95a9f208f78ae955b61df4cb1701ce75eab33e`.
- Release target: `107.150.102.145:/var/www/flowlight.me/public/dist`; the checked current DNS sent both apex and `www` to this host.
- Rollback artifact: `/var/www/flowlight.me/releases/20260713T133159Z-pre-8d66394-dist`.
- Verification: local and server `npm test` passed; server `npm run launch-check` passed with 24 checks and 0 failures; homepage, `www` homepage, guide library, Germany A1/B1 category pages, and sitemap index all returned HTTP 200. The guide library exposes `Complete route`, `Core route`, and `Starter overview` labels.
- This release evidence does not name a business release or rollback owner, and it is not a rollback drill. The seven Phase 1 rows below remain closed.

## Historical deployment and rollback evidence (not current-state proof)

The rows below preserve evidence from earlier 2026-07-13 release windows. They do not prove the current deployed commit, current authority, or current path validity; those remain subject to the Phase 1 gate and a fresh release check.

| Item | Owner | Status | Evidence | Gap | Next action |
| --- | --- | --- | --- | --- | --- |
| Production DNS target | Server / release owner: 待业务方确认 | Confirmed for this release | `flowlight.me` resolved to `107.150.102.145`; `www.flowlight.me` resolved to `43.162.126.37` during the Open Design final UI release. | Named accountable owner is not recorded; DNS can change and must be checked per release. Split apex/www hosting increases release risk. | Record release operator and require DNS target confirmation before every deployment. |
| Production static root | Server / release owner: 待业务方确认 | Confirmed | Nginx on `107.150.102.145` serves `/var/www/flowlight.me/public/dist` with `index.html`. | Named accountable owner is not recorded. | Business records the release operator and backup operator. |
| Server source and target commit | Server / release owner: 待业务方确认 | Confirmed for 2026-07-13 release | Local `HEAD` and `origin/main` resolved to `ef1f9dca9e5add2ea0a88a04a7eaf93663f800da`; `107.150.102.145:/var/www/flowlight.me/source` resolved to `ef1f9dc`; `43.162.126.37:/var/www/flowlight.me/source` also resolved to `ef1f9dc` when checked with `sudo git` because normal `ubuntu` Git access reports dubious ownership. | No named person owns future target-commit approval; public HTML still has no deploy-version marker. The `www` host's source ownership and Node version need maintenance. | Record the selected target commit, approver, build output and public version evidence for every release. Fix `www` host Git ownership / Node version before relying on server-side builds there. |
| Production health checks | Server / release owner: 待业务方确认 | Confirmed for this release | On the production server, `npm audit --json --registry=https://registry.npmjs.org` returned 0 vulnerabilities and `npm run launch-check` returned 24 checks, 0 failures, `READY`. | This confirms the current server source only; it is not a substitute for future release checks. | Keep audit and launch-check in each production release or post-release record. |
| Rollback artifact | Rollback authority: 待业务方确认 | Recorded, not drill-verified | Before the Open Design final UI release, the existing static output was preserved at `107.150.102.145:/var/www/flowlight.me/releases/20260713T080850Z-pre-ef1f9dc-dist` and `43.162.126.37:/var/www/flowlight.me/releases/20260713T080853Z-pre-ef1f9dc-dist`. Earlier artifacts remain historical release records. | Restoration has not been exercised; no formal rollback authorizer is recorded. | Name the rollback authorizer and run a separately approved restoration drill. |
| Fixed release / rollback flow | Release owner and rollback authority: 待业务方确认 | Partially evidenced | The 2026-07-13 Astro 7 release record identifies `main` target `194e883`, DNS target `107.150.102.145`, production publish directory `/var/www/flowlight.me/public/dist`, rollback artifact, server audit, server launch-check, and public smoke checks. | The mandatory approver, release record format, and incident rollback authorization are not confirmed as an operating procedure. | Approve a written SOP that records branch, target commit, DNS target, build time, smoke result, rollback commit/artifact, releaser, and rollback authorizer for every release. |

## Historical host findings from the recorded release

| Host | Finding | Release decision |
| --- | --- | --- |
| `43.162.126.37` | SSH worked and the host had `/var/www/flowlight.me/public/dist`. During the Open Design final UI release, `www.flowlight.me` resolved here while the apex domain resolved to `107.150.102.145`. The host's Node.js version was `v20.20.2`, below Astro 7's `>=22.12.0` requirement, so server-side build failed and the already verified local `dist` artifact was synchronized to the publish directory instead. | Treated as current production for `www.flowlight.me` while DNS points here. Upgrade Node to `>=22.12.0` and fix Git safe-directory/ownership before relying on standard server-side builds here. |
| `8.218.193.140` / SSH alias `aliyun` | SSH was blocked by host-key mismatch. Reported ED25519 fingerprint: `SHA256:yFIeAuRfz70RkuQc+pcY2imBex745Z2IjqQOyZfWNGA`. | Do not use until the server owner verifies and intentionally updates the known host key. |

## Historical public smoke check

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

Current read-only check at 2026-07-13 20:20 CST: `https://flowlight.me/`, `https://www.flowlight.me/`, `https://flowlight.me/sitemap-index.xml`, `https://flowlight.me/contact/`, `https://flowlight.me/privacy-policy/`, and `https://flowlight.me/cookie-policy/` returned HTTP 200. Both public homepages contained the Cloudflare Web Analytics beacon; the contact page displayed `hello@flowlight.me`; the two policy pages mentioned Cloudflare Web Analytics and Google AdSense. No server login or deploy-version marker was available, so the precise live commit remains **待业务方确认**.

## Phase 1 entry-responsibility verification

Checked: 2026-07-13 20:20 CST (repository-visible source and documentation plus read-only public URL checks). No account or server was accessed, no service was configured, no email was sent, and no personal data was used.

Status definitions: **已确认** requires a real named person or business-approved explicit role, current inspectable evidence, an evidence location/view path, and direct correspondence between that evidence and the responsibility. A backup owner is required only if the business adopts a primary/backup system. **待业务方确认** is not an approval and must not be treated as a configured or operating service.

| Required item | Owner | Status | Evidence checked in this window | Gap / risk | Required next action |
| --- | --- | --- | --- | --- | --- |
| 1. Search Console 或等价搜索表现监测 | 负责人：待业务方确认；备份负责人：待业务方确认（如采用主备制度） | 待业务方确认 | 仓库 `public/robots.txt` 可定位 sitemap URL；20:20 CST 只读复核 sitemap 返回 HTTP 200。未提供平台/属性名称、账户用户/角色证据、平台查看路径、sitemap 提交状态或复核记录。 | 负责人、备份制度、平台/属性名称、访问方式、角色/权限证据、sitemap 提交状态、查看和复核节奏均待业务方确认；sitemap 公开可访问不能证明已提交或有人监测。 | 最小材料：负责人姓名或认可角色；如采用主备制度则提供备份负责人；平台与属性名称；查看路径；当前用户/角色截图或导出及保存位置；sitemap 提交结果；查看/复核频率。 |
| 2. Analytics | 账户/数据负责人：待业务方确认；备份查看人：待业务方确认；隐私/同意批准人：待业务方确认 | 部分技术事实可检查，业务准入待确认 | 仓库 `src/layouts/BaseLayout.astro` 与两个公开首页均可检查到 Cloudflare Web Analytics beacon，说明前端已部署 beacon；公开 Privacy/Cookie 页面可检查到 Cloudflare Web Analytics 与 Google AdSense 说明。历史记录称面板收到数据及欧洲同意消息已测试，但当前账户角色、面板数据和批准记录没有可独立定位的保存位置。 | 是否由当前有效账户持续接收数据、账户角色/访问权、数据查看方式、备份查看人、适用的 Cookie/同意结论、批准人、证据保存位置和复核日期均待业务方确认。源码脚本和页面文案不能单独证明这些事项。 | 最小材料：当前面板/站点名称及查看路径；负责人和备份查看人；账户角色截图/导出；最近数据截图/导出；适用的隐私/Cookie/同意决定及批准人；全部证据保存位置和下一复核日期。 |
| 3. 联系入口 | 收件/分流负责人：待业务方确认；数据保留负责人：待业务方确认 | 待业务方确认 | 仓库和 20:20 CST 公开联系页均显示 `hello@flowlight.me`。业务方未在本窗口批准测试范围，故未发送测试邮件；未提供邮箱路由/访问证据、送达证据或分流记录。 | 是否真实可收件、负责人、允许/禁止接收的数据、保留/删除规则、分流/升级方式及经批准的不含个人信息测试送达证据均待业务方确认。邮箱字符串不能证明收件能力。 | 最小材料：两名责任人的姓名或认可角色；允许/禁止数据清单；保留与删除规则；分流/升级路径；业务方批准的测试范围；随后由获准人员执行不含个人信息的测试，并保存发送、送达和分流证据。 |
| 4. 联系请求 SLA | SLA 负责人：待业务方确认 | 待业务方确认 | 仓库联系页不承诺回复时限；未发现经批准的 SLA 或可定位的响应台账。 | 目标响应时限、工作时间、适用范围、计时起点、超时升级规则和响应记录位置均待业务方确认。 | 最小材料：SLA 负责人；批准的响应时限；工作时间/时区与适用请求；计时起点；超时接收人和升级步骤；可复查响应记录的保存位置及抽查频率。 |
| 5. 官方来源及高风险事实复核 | 负责人：待业务方确认；备份负责人：待业务方确认 | 待业务方确认 | 仓库 `src/pages/editorial-policy.astro` 可检查到 official-source-first 政策，历史内容审计可作样例；未提供当前责任授权、固定复核台账或持续纠错记录。 | 负责人、备份负责人、固定复核节奏、强制触发条件、source URL/检查日期/结论/复核人的记录位置及纠错记录保存方式均待业务方确认。政策页面和历史样例不是持续运营证据。 | 最小材料：主备负责人；固定频率；强制触发清单（至少官方来源变化、纠错报告和高风险事实编辑）；审计台账位置与样例；纠错记录位置及关闭规则。 |
| 6. 发布 | 授权发布负责人：待业务方确认；备份或升级方式：待业务方确认 | 待业务方确认 | `docs/OPERATIONS_STATUS.md` 和 `docs/TASK_LOG.md` 含历史发布技术记录，可定位历史 branch、commit、构建、DNS、冒烟检查和产物路径；未提供下一次发布的授权或目标 commit 批准证据。 | 授权负责人、备份/升级方式、发布批准点、目标 commit 批准证据和发布验证记录保存位置均待业务方确认。历史执行记录不等于当前授权。 | 最小材料：授权负责人；不能执行时的备份/升级路径；发布前批准点；批准人对目标 commit 的可定位记录；每次发布验证记录的固定保存位置和模板。 |
| 7. 回滚 | 回滚负责人：待业务方确认；授权人：待业务方确认 | 历史路径有记录，当前责任、路径与演练待确认 | 历史记录保存了发布目录 `/var/www/flowlight.me/public/dist` 及两个发布前产物路径；未登录服务器，故未核验当前生产主机、目录、产物可用性或实际恢复路径，也未发现有效演练证据。 | 回滚负责人/授权人、触发阈值、当前生产主机和发布目录、当前实际回滚步骤、沟通/批准流程、恢复验证方式及有效演练证据均待业务方确认。 | 最小材料：负责人和授权人；可执行触发阈值；当前主机/目录及由获准人员提供的查看证据；实际回滚 SOP；沟通与批准链；恢复检查清单；最近演练日期、目标、结果和证据位置。演练须另开获批窗口。 |

## Explicit Phase 1 gate

**Result: 暂不启动阶段 1。** 七项中只有部分技术事实可检查；Search Console/等价监测、Analytics 与隐私责任、联系收件/分流/保留、联系 SLA、官方事实复核、发布和回滚均未同时具备已命名负责人及可检查运营证据。

Until the gate is opened in writing:

- Do not add or expand analytics, forms, email, payment, advertising, or any other third-party service. Do not modify the existing Cloudflare or AdSense setup in this gate-confirmation window.
- Do not collect personal information or send tool results to any service.
- Keep all commercial and contact paths as current `contact-intent` / `request access` language only; do not imply payment, registration, email delivery, review acceptance, or manual-service completion.
- Permitted maintenance remains limited to official-source content verification and public route-health checks in separately scoped windows.

When every row above has a named accountable owner and current inspectable evidence, record **可进入下一最小实施窗口** and define that later window separately. This gate-confirmation window itself does not authorize analytics changes, privacy-copy changes, contact collection, deployment, or feature development.
