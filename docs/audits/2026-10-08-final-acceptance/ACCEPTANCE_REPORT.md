# VisaLang 最终验收复核

检查日期：2026-10-08（UTC）  
结论：**BLOCKED / 不通过发布验收**  
对象：当前 VisaLang checkout、此前本地全站审计交付、规划治理和可访问的公开证据。

## 执行摘要

当前 checkout 的隔离生产构建和 `launch-check` 通过；全量 `npm test` 在规划图完整性绑定处失败。缺少当前范围的 Archify 生成交付、浏览器截图和感知审阅回执，无法完成桌面/移动交互验收。规划同步仍为 `VL-PMAP-20261005-02` 且 `drift.status` 为 `unresolved`。所以不能把局部代码检查通过解释为全站独立验收、可发布或已部署。

| 验收项 | 结果 | 判据 |
|---|---|---|
| 隔离构建与静态候选检查 | **PASS** | `npm run build` 生成 105 个页面；`npm run launch-check` 为 57 PASS / 0 FAIL / 0 BLOCKED。只证明本地候选产物。 |
| 全量测试与规划治理 | **FAIL** | `npm test` 因冻结的 `tests/site.test.js` SHA 与当前文件不一致退出 1。 |
| 当前窗口 planning-map 治理闭环 | **BLOCKED** | 同步漂移未决，当前 scope / 分类 / Archify 交付 / 浏览器和感知证据 / 完整 Auditor PASS 缺失。 |
| 浏览器 UI、工具真实操作 | **BLOCKED** | 没有可用且获准的本地浏览器通路；既有策略记录明确禁止以替代浏览器、CLI 或 CDP 绕过。 |
| 线上可用性 | **BLOCKED（信号待复核）** | 2026-10-08 单一网页读取器对首页返回 Cloudflare 521；未由第二网络、浏览器或主机日志确认。 |
| 发布/部署 | **NOT READY** | 上述阻断未清，工作树很脏；无发布授权，也未进行生产操作。 |

本次只在原工作树新增本报告。测试和构建都在物理隔离副本中执行，没有运行会清理根目录 `.astro/` 或 `dist/` 的命令，没有修改业务代码、部署配置、规划同步、测试门禁或生产系统。

## 基线、范围和证据边界

- 仓库：`/Users/a1-6/Documents/2.codex/1.visalang.org`
- 分支：`codex/scheme-3-one-week-content`
- HEAD：`4cb57e8744c752fed1881281e69e7b24cc7281c4`；本轮没有创建提交或改变 HEAD。
- 本轮写入前 `git status --short` 有 283 项：130 项跟踪文件状态、153 个未跟踪文件；改动均保留。`git diff --check` 通过。这个工作树不能等同于干净、审过的发布候选。
- 现有三份完整审计交付位于 [`2026-10-06-local-full-site-audit`](../2026-10-06-local-full-site-audit/)；本报告是验收补充，不覆盖旧文件，也不把旧基线当成当前运行结果。
- 2026-10-07 更新记录仍为待审核状态；其中说明 Obsidian 目标及模板在当前环境不可见，没有写入替代位置。[本地更新记录](../../VISALANG_UPDATE_RECORD_REVIEW_2026-10-07.md:5)
- 当前仓库有 Astro 项目脚本，但没有 lint、typecheck 或 security-scan 脚本；项目的 `prebuild` 会清理 `.astro/` 与 `dist/`，所以所有构建门禁都在副本运行。[`package.json`](../../../package.json)

### 规划同步与独立审计

当前 [`sync.json`](../../planning-map/sync.json:3) 仍记录 `VL-PMAP-20261005-02`，漂移未决；记录的 watched-scope digest 和 changed-path 清单并非本轮新冻结的范围。候选绑定把 `tests/site.test.js` 固定为 `4bce5115c3995c3d641c6eb1c4b7b961e1990e7795b1b7dec20f6feee9da3a37`，当前文件实际为 `961917e4ccaa75228df71b886e7fbc3de9fdd334fd91f07a08ba8024179d0982`。当前测试入口在规划治理测试之前运行 retained-route 检查，并在第 454 行执行该门禁。[`tests/site.test.js`](../../../tests/site.test.js:452)

2026-10-06 的工具中心和费用范围独立审阅都写明：**限定代码范围 clean、没有 scoped P0/P1/P2，但整体 verdict 为 `BLOCKED`**；原因包括未冻结当前范围、没有本轮 Archify / 浏览器 / 感知证据，且漂移未决。两份旧记录不是针对 2026-10-08 全部脏工作树的 Auditor PASS。[工具中心 verdict](../2026-10-06-local-full-site-audit/TOOLS_HUB_INDEPENDENT_AUDIT_2026-10-06.verdict.json)、[费用 verdict](../2026-10-06-local-full-site-audit/FEE_REVIEW_INDEPENDENT_AUDIT_2026-10-06.verdict.json)

`docs/planning-map/README.md` 要求先冻结范围、更新源和同步历史，再执行 Archify showcase validate/deliver/visual-check，检查截图并存 browser 与独立感知回执，最后将精确 changedPaths 和完整 sync 字节交给 Auditor。它明确规定治理测试在 Auditor 前只能到达缺失/非 PASS 审计门禁，不能更早发生完整性失败。[治理步骤](../../planning-map/README.md:96)

## 当前功能、页面与运营状态矩阵

| 范围 | 当前状态 | 本轮可支持的结论 | 未验证项 |
|---|---|---|---|
| Astro 构建与路由 | **完成（本地候选）** | 隔离 build 生成 105 个页面；launch-check 通过已配置的路由、元数据、链接和 schema 检查。 | 生产部署内容、浏览器实际布局与用户环境。 |
| 五组决策工具 | **实现；交互验收未完成** | 工具中心源码列明 Route Finder、Checklist、Timeline、Comparison、Reminders 的输入、结果和决定边界；静态工具/状态断言在全量测试最终规划失败前通过。[工具中心](../../../src/pages/tools/index.astro:7) | 本轮没有在浏览器走正常、无效、恢复、存储受限和文件导出流程。`t28-stale-results` 单独检查因隔离副本缺 Playwright 包而不能运行。 |
| 内容与申请事实 | **部分完成 / 需持续复核** | 53 篇英文 guide 和 8 篇中文 guide 构成当前审计台账；高风险稿件使用权威和 noindex/verification-pending 门槛。德国/北京 Goethe A1 价格 registry 显式记载机构、范围和边界。[registry](../../../src/data/claim-registry.ts:452) | 这不是逐条法律审计；例如荷兰指南 source review 为 2026-08-15，仍是 verification-pending/noindex；意大利来源页本轮读取失败，未据此推断其声明错误。[荷兰页](../../../src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md:7) [意大利页](../../../src/content/guides/cils-vs-celi-vs-plida-for-italian-citizenship.md:7) |
| SEO、sitemap、结构化数据、内链 | **本地静态检查通过** | launch-check 57 项通过，覆盖生成页面 metadata、canonical、schema 解析、内部链接、hreflang、robots/sitemap 与 noindex 策略。 | 搜索引擎是否抓取、收录、展示或排名；线上 robots/sitemap 在本次网页读取器中不可读。 |
| 可访问性与响应式 | **源码/构建约束部分通过** | 静态候选检查包含唯一 H1、skip link、reduced-motion、overflow 与最小触控目标等规则。 | 键盘、屏幕阅读器、触控、真实桌面/移动视口均未在本轮验证。 |
| 隐私与同意 | **静态合同通过，运行时未知** | 工具数据保存/清理和隐私路由有静态测试；未调用真实邮件、支付或生产 API。 | 浏览器第三方请求、CMP/广告 consent signal、地区行为和生产配置。 |
| 分析、变现、部署 | **未完成运营验证** | 仓库有分析/广告/部署候选合同与模拟测试。 | 未验证生产事件数据、AdSense 账户批准、CMP 实际效果、主机/TLS、部署和回滚。不得宣称流量或广告批准。 |

两个官方费用来源最近已按德国和北京的独立范围核对，registry 有对应 checked-at 与使用边界：德国页面支持其成人 A1 €155 价目与限定课程折扣；北京页面支持其成人 A1 CNY 1,400 / 1,500 类别表。两页都不能证明个人类别资格、实时考位、结账结果或移民机关接受。[Goethe 德国价格页](https://www.goethe.de/ins/de/en/prf/pre.html)；[Goethe 北京报名页](https://www.goethe.de/ins/cn/zh/spr/prf/anm.html)

## 最关键的 5 个问题

1. **规划完整性门禁失败。** `npm test` 被旧哈希绑定挡住，sync 的 drift 仍为 unresolved，且当下候选路径未完成精确冻结。不能跳过/弱化测试来换取 PASS。
2. **缺少真实 UI 证据。** 本机工具清查没有找到可用 Archify、CUA 或 executor skill。历史浏览器策略记录显示 `file://` 被拦截，并明确禁止用浏览器命令、CDP 或其他界面绕过；本次遵守该限制。[策略记录](../../module-handoffs/2026-10-05-integration/browser-policy-block.json:5)
3. **公网有 521 信号但严重程度未证实。** 只能称为单一读取器/出口/入口样本；不能据此改生产，也不能忽略，应由另一网络与主机/Cloudflare 日志确认。
4. **dirty tree 无法代表 release candidate。** HEAD 未变，但已有 283 项工作树状态记录；没有对这些未提交文件完成当前完整范围独立审核。
5. **少量内容来源仍需刷新，生产数据空缺。** 荷兰来源更新时间晚于本地 sourceReviewedAt；意大利官方源无法在当前读取器验证。实际 Search Console、真实用户路径、流量、广告批准和同意状态均未知。

## 优先级与解除路径

### P0 — 阻止验收/发布

- **规划图冻结/字节绑定/漂移。** 在单独获准的内容维护窗口冻结确切候选范围，依 README 更新规划源、sync、history 与完整 hashes；不得把本报告加入或冒充本轮 changedPaths。随后用项目要求的 Archify 流程生成交付和回执、完成人工感知复核、运行治理测试，并让指定只读 Auditor 对精确 scope 与 sync SHA 返回 PASS。
- **浏览器验收证据。** 取得符合现行策略、可验证本地页面的获准浏览器工具，以及 Archify skill/CLI 位置。不得用被策略禁止的浏览器替代方案。最低覆盖首页、导航、5 工具正常和错误流程、桌面与移动视口；截图、browser receipt 和独立视觉 review 需绑定页面版本。
- **全量测试。** 先闭合当前规划契约再重跑 `npm test`。不得删减 binding assertion、回写旧哈希或通过修改生成 HTML 伪造验证通过。

### P1 — 发布前需要解决

- 通过独立网络/真实浏览器检查线上首页、robots、sitemap、A1/B1 与核心工具；向负责者核实同时间 Cloudflare/主机状态。若 521 可复现，按可用性事件升级。
- 在对应权威页面重新确认荷兰移民/入籍程序来源并记录日期、支持范围和边界；重新取得意大利主管机关页面或可靠替代官方源。继续保持未确认稿件的 noindex / verification-pending。
- 先冻结并审阅可部署版本，确认 dirty 工作树中各项更改的归属和影响；再跑门禁及当前范围独立 Auditor。不要把 HEAD 与 dirty tree 混为一谈。

### P2 — 增量质量与运营准备

- 在获准浏览器验收后做逐页视觉、键盘、读屏和真实触控覆盖；补齐 playwright 依赖或使用合规且获准的浏览器验证方案。
- 若要启用运营分析、同意管理或广告，先由 Owner 决定服务与策略，再验证生产 consent、网络请求和账户状态。没有生产证据时保持“未验证”。
- 没有基于真实数据的需求/性能证据前，不新增同义 SEO 页、不按页数批量删除或合并内容。

## 命令与检查结果

所有会写 `.astro/`、`dist/` 或执行 build 的命令均在物理隔离副本运行；副本排除了 checkout 的 `.git`、根 `.astro/` 和 `dist/`，其依赖文件独立复制，内部 `.bin` 相对链接已检查指向副本自身。

| 命令/检查 | 结果 | 证据解释 |
|---|---|---|
| `npm run build` | **PASS** | 隔离副本；生成 105 个页面。 |
| `npm run launch-check` | **PASS** | 隔离副本；57 PASS / 0 FAIL / 0 BLOCKED，明确只代表本地候选检查。 |
| `npm test` | **FAIL** | 隔离副本；先行产品、内容、工具、SEO、隐私和部署断言通过，随后 planning-map governance 因 `tests/site.test.js` frozen SHA 不匹配退出 1。 |
| `node tests/t28-stale-results.test.mjs` | **BLOCKED** | 隔离副本无 `playwright` 包，运行于导入时以 `ERR_MODULE_NOT_FOUND` 终止；不是应用断言通过。 |
| `git diff --check` | **PASS** | 原 checkout 只读检查。 |
| lint / typecheck / security scan | **NOT AVAILABLE** | 当前 `package.json` 没有相应脚本；没有偷偷联网提交依赖清单做安全审计。 |
| 浏览器 UI / Archify visual-check | **BLOCKED** | 没有可调用且获准的工具/skill；不生成虚构浏览器截图或回执。 |
| `https://visalang.org/` | **521 单点观察** | 2026-10-08 网页读取器返回 Cloudflare 521；同一入口未能读取 robots/sitemap/www。不是多网络故障结论。 |

### `.astro/` 与 `dist/` 保全说明

本轮没有在原 checkout 运行构建或测试。原目录现有 `.astro/` 的 5 个文件和 `dist/` 的 137 个文件与 2026-10-06 15:15 的事后保全清单逐文件一致。这只说明自该快照后未再变化；不能证明或恢复更早测试前的原始字节。

## 浏览器覆盖记录

- 浏览器：**未能使用获准的本地浏览器**。既有 browser policy 记载 `file://` URL 被策略拦截并禁止替代 surface/命令/CDP 绕过。
- 页面 URL 与视口：未成功打开本地页面；桌面、移动视口都未覆盖。不得将预定视口写成实测。
- 未覆盖：桌面/移动视觉与菜单、键盘焦点、表单错误和恢复、工具计算/导出、存储禁用、屏幕阅读器、触控、CMP/广告实际请求。
- 线上抽查 URL：`https://visalang.org/`，2026-10-08，通过网页读取器取得 521；不是浏览器渲染、第二网络、Search Console 或主机日志。

## 最短解除顺序

1. Owner/项目管理员提供获准的 Archify 工具位置和符合策略的本地浏览器通路；确认 `playwright` 是否可通过批准方式提供。
2. 在单独明确的规划/内容维护窗口冻结范围与基线，按 `docs/planning-map/README.md` 完整更新并生成绑定的视觉证据；复核 `npm test`，保留任何真实失败。
3. 同一 VisaLang Independent Auditor 对精确当前 scope、同步字节、视觉回执复查；取得正式 `PASS` 后才关闭本地审计验收。
4. 用另一网络和负责人的主机日志确认线上 521；刷新荷兰/意大利来源记录。
5. 另行审阅工作树并明确 Owner 发布决定。**本报告本身不授权提交、推送、上传、付费或部署。**

## 最终判定

**整体：BLOCKED；发布就绪：否。** 可靠的正面证据限于隔离构建、静态候选检查，以及全量测试失败前通过的断言；不足以替代规划治理、真实 UI/无障碍验证、全范围独立 Auditor PASS 或生产运行证据。2026-10-06 的两项窄范围代码审阅 clean 结论可以保留，但它们的整体 BLOCKED verdict 同样有效。
