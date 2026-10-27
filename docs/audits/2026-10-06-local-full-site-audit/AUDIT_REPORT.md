# VisaLang 本地全站审计报告

检查日期：2026-10-06（UTC）
检查对象：工作目录中的 Astro 源码、内容、生成配置、测试与规划证据，以及公开网址的可访问性抽查。
审计性质：全站基线先以只读检查和三份 Markdown 交付；随后获准补做工具目录说明与 Goethe A1 价格来源日期校准。未修改部署配置、重定向、根目录 dist/.astro 或生产系统。规划图仍未改，完整窗口尚未通过治理闭环。

## 执行摘要

VisaLang 当前源码已形成可运行的静态站点：隔离副本构建出 105 个页面；有五组双语工具、德国 A1 家庭团聚主路径、德国 B1 路线、53 篇英文指南和 8 篇中文指南页面。SEO、来源状态、noindex/sitemap、广告资格和工具状态有显式数据契约，静态 launch-check 对这些契约通过。

当前不能判为可发布或运营就绪，原因有两项优先阻断：

1. 2026-10-06 公开抓取器访问 https://visalang.org/ 收到 Cloudflare 521；相同抓取器未能读取 robots.txt、sitemap-index.xml 或 www 首页。该观察来自一个抓取器出口，尚不能单独证明所有地区、浏览器或用户都不可访问；需用另一网络及真实线上监控交叉确认。
2. 最新的 2026-10-05 N00 独立审计结论为 BLOCKED：当前规划图交付没有绑定到最终 HTML 的本轮浏览器回执、截图和独立视觉审阅；规划漂移为 unresolved。当前 npm test 在更早的 candidate byte-binding 检查即因 `tests/site.test.js` 存档哈希过期而退出 1；更新该绑定后，仍须满足完整视觉/漂移门槛。

本地构建、页面/内容静态检查与 launch-check 通过，不代表线上可用、源码已合并、搜索引擎实际收录、真人可用性通过、广告获批或部署回滚准备完成。本工作树极脏，本次只审计实际工作树，不把其中内容视为已提交版本。

**审计结论：本地产品基础已实现；当前候选发布状态为 HOLD。** 先确认公网可达性和当前规划治理阻断，再做真实浏览器验收和逐页内容价值/来源维护。

## 基线与审计边界

| 项目 | 本次实际观察 |
|---|---|
| 仓库 | /Users/a1-6/Documents/2.codex/1.visalang.org |
| 分支 / HEAD | codex/scheme-3-one-week-content / 4cb57e8744c752fed1881281e69e7b24cc7281c4 |
| 跟踪上游 | origin/codex/scheme-3-one-week-content；本地 refs ahead/behind 0/0，未执行 fetch |
| 工作树 | 审计启动、写入本目录前：129 个已修改的跟踪文件、1,551 个未跟踪文件；没有已暂存文件的迹象。结束核验仍为 129 个跟踪文件改动，新增审计文件正好 3 个，未跟踪文件现为 1,554 个。所有既有改动保留 |
| 变更量 | git diff --stat 显示 129 个跟踪文件变更、6,929 insertions、3,264 deletions。未跟踪文件另计 |
| 本地构建 | 在 /tmp/visalang-audit.5pRzuY 隔离副本执行；没有清理或重写仓库 dist |
| 本地浏览器 | 未完成。CUA 浏览器连接返回 nodeRepl.fetch request failed，随后 getApp 返回 Transport closed；没有成功打开站点或截图 |
| 公开访问 | 通过网页读取器访问线上 URL；不是 Chrome，也不是主机监控或 Cloudflare 控制台 |
| 未做事项 | 未读取密钥、未提交/推送、未使用真实姓名或申请案例、未触发支付/邮件/API、未调用生产迁移、未上传任何内容 |

新审计目录在写入前不存在，未发现同一路径的已有审计文件。应用侧任务列表工具不可用，故不能证明其他任务没有在不同路径活动。本报告只写新目录，未覆盖现存文件。

## 代码、路由和内容证据

| 范围 | 证据与判断 |
|---|---|
| 技术栈 | README、package.json、astro.config.mjs：Astro 静态输出，TypeScript/组件/Markdown；源站实现以 src/ 为准 |
| 路由规模 | src/pages 有 42 个 Astro 路由源（含动态路由）；隔离构建生成 105 个 HTML 页面 |
| 指南规模 | src/content/guides 有 53 篇英文 Markdown；另有 8 个中文指南 Astro 页面。项目规划把 61 个内容页划分为 20 个索引候选支柱＋41 个支持/参考页 |
| 现有成熟度字段 | 53 篇英文 Markdown 的 sourceReviewStatus 均为 reviewed，但内容成熟度字段并不相同：7 complete-route、22 core-route、8 starter-overview、16 verification-pending。sourceReviewStatus 是历史记录字段，不表示本轮重新核完每条法律/费用事实 |
| 发布政策 | src/data/publication-manifest.ts 将 15 个英文指南、5 个中文指南作为支柱候选；launch-check 验证 20 篇可索引支柱、41 个 sitemap URL、64 个 noindex 页面，非支柱内容不会因存在于源码就自动获索引 |
| 工具 | 5 个工具家族：Route Finder、Checklist Generator、Timeline Calculator、Exam Comparison、Reminder Planner；对应 5 个中文工具路由。历史主计划记载当前仅德国 A1 家庭团聚为 configured，其他 4 条为 verify-only |
| 工具状态 | launch-check 验证版本化 session-first 状态、明确的可选 30 天设备保存、清空入口与旧 URL 清理。提醒工具生成本地 ICS/文本/打印路径，不收邮箱、不代表已发送邮件或已导入用户日历 |
| 来源记录 | src/data/claim-registry.ts 有 24 个版本化 claims。德国/北京 Goethe A1 的 2 个 claim + 4 条 local fee record 共 6 个对象已于 2026-10-06 复核，下一次复核为 2026-11-06 |
| 信任/无障碍静态契约 | launch-check 通过 57 项本地候选检查，包括唯一 H1、skip link、canonical、JSON-LD、内部链接、hreflang、响应式 CSS/overflow/reduced-motion 规则。此类源码/生成检查不是屏幕阅读器或真机实测 |
| 商业页 | 价格、产品及伙伴页面保留 noindex/无广告策略；测试确保不声称支付成功、邮件已发、退款或服务交付 |
| 发布实现 | deploy/release.py、shell 与配置有静态合同和 14 项 Python bundle/host/release 单元测试。合同/模拟成功不证明目标主机、TLS、生产反向代理、广告账户或回滚演练已经实际验证 |

### T01–T34 任务状态矩阵

以下以 2026-09-09 的 BACKLOG_STATUS_OVERLAY、2026-09-28 项目审查、当前源码和本次测试交叉检查。状态表示当前本地工作树/已有证据，不代表提交、线上或商业完成。T28–T30 的工作树存在新实现，但真实设备、模型质量、主机和候选验收门槛仍未齐备。

| 任务 | 状态 | 当前可验证结论 |
|---|---|---|
| T01–T02 | 完成（本地） | Master Package/来源图与可恢复基线记录存在 |
| T03 | 完成（本地） | 高风险主张权威分层与保守费用回退合同存在 |
| T04–T05 | 完成（本地） | URL/support inventory 与版本化 fail-closed claim 合同存在 |
| T06–T08 | 完成（本地） | 答案呈现、路线状态、C01/C07 内容修复有源文件/测试 |
| T09 | 完成（本地） | 来源账本/覆盖断言曾有修复与独审记录 |
| T10–T12 | 完成（本地） | 考试产品、德国/北京 A1 价格数据和类别边界存在 |
| T13–T14 | 完成（本地） | 日历日计算和五工具共享状态/稳定 ID 合同存在 |
| T15–T18 | 完成（本地） | 核心工具本地状态/结果检查有 focused tests；浏览器结果并不由本次复验 |
| T19 | 部分 | RFC 5545 ICS 生成器与用户下载实现；真实日历客户端导入仍未测试/授权 |
| T20–T21 | 完成（本地） | 中文工具路径、指南发现/分类与考试目录有静态合同 |
| T22 | 完成（本地） | 本地 metadata/sitemap/noindex/hreflang 路由政策有测试；实际索引未知 |
| T23 | 部分 | 17 个历史 URL 保留/redirect 候选及本地回滚映射存在；生产 HTTP、实际部署规则、线上索引和原站回滚证据未确认；本次线上读取遇 521 |
| T24–T27 | 完成（本地） | B1 路线、B1 产品比较、学习资产、隐私测量合同在源码与本地测试中存在。T27 没有真实事件传输或用户收益证据 |
| T28 | 部分 | 工具提示和结果状态代码存在；本次真实桌面/手机浏览器与真人设备验收未完成 |
| T29 | 部分 | purpose suggestion 接口存在；既有审计记录的模型评估为 11/20、Mac 峰值 RSS 4.14 GB，阻止激活结论；本次不运行模型 |
| T30 | 部分 | release/rollback 工具和合同存在；core-only 独立发布候选、真实 git 身份、主机与回滚 rehearsal 未验证 |
| T31–T34 | 未开始（按 overlay） | DNS/TLS 切换、公开验收、上线后 24 小时/第 7 天运营与下一季度复盘都依赖授权发布，不能在本地报告中标完成 |

依据：[状态 overlay](../../master-package-2026-09-08/BACKLOG_STATUS_OVERLAY_2026-09-09.md)、[9/28 项目审查](../../PROJECT_REVIEW_2026-09-28.md)、[9/28 集成交接计划](../../superpowers/plans/2026-09-28-visalang-integration-content-acceptance.md)。

## 功能与任务矩阵

| 面向 | 状态 | 本地证据 | 未验证项/下一步 |
|---|---|---|---|
| 首页、主导航、Guide Library | 部分完成 | 首页、routes/exams/tools/guides/about 导航、搜索/筛选/排序/清空状态通过 launch-check | 本次没有真实桌面/移动视觉审查；检查菜单尺寸、长标题、空状态、键盘顺序 |
| Germany A1 决策路径 | 本地实现 | 主 hub、指南、source/claim registry、1 条配置路线与 linked tools 存在 | 申请地、使馆、个案、豁免与证书接受仍应转到对应决定机关；不能把路线工具结论当个案结论 |
| Germany B1 路线 | 本地实现 | 永居/入籍路线、语言与 Leben in Deutschland 区分、清单/时间线、官方边界字段有测试 | 个案资格和当地 Einbürgerungsbehörde/主管机关结论未核；production reader outcome 未知 |
| 五组决策工具 | 功能代码存在 | 状态解析器/导出/结果 fail-closed tests 通过，五个中文页存在 | 本次浏览器未执行正常/错误表单；日期、存储拒绝、旧结果清除、导出内容仍需真实 Chrome 核验 |
| Laya/TypeSafe suggestion | 条件式本地集成 | source 页和接口合同在代码中；旧 source review 记录只有合成输入 smoke | 未运行真实 API，准确率/延迟/隐私披露现状与用户授权未验证；不能据此默认开启 |
| 53 英文 + 8 中文指南 | 部分成熟 | 53 篇英文 source review 状态字段为 reviewed；构建生成全部内容路线 | 16 篇 verification-pending、8 篇 starter-overview；41 支持页逐页独特任务、需求/流量和来源生命周期仍需 ledger。禁止只因页数/字数删除 |
| SEO 与索引 | 本地生成通过 | 57/57 launch-check、41 sitemap URL、20 pillar guide index candidates、64 noindex route pages、reciprocal pairs 检查 | 公开 robots/sitemap 抓取失败；真实 Search Console、canonical 排名/收录、外链和 impressions/clicks 都未知 |
| 结构化数据/内链 | 本地生成通过 | Article/Breadcrumb/Collection/ItemList/WebApplication/Organization JSON-LD 可解析，内链检查通过 | 浏览器渲染之外的 Google 实际呈现未知 |
| 隐私/同意 | 文档和本地状态门禁有 | Privacy/Cookie 页、session/30 日保存披露、查询参数清理限制说明被检查 | 未验证浏览器 CMP/广告 consent signal、第三方网络请求、区域规则、账户设置；本次没有访客输入或追踪 |
| 运营分析 | 未验证/未闭环 | measurement contract 限定 allowlist，隐私测试阻止 URL/个人信息 | 无生产后台/数据样本；事件是否部署、同意门禁和责任人未知。不要用合成事件声称真实运营闭环 |
| 变现准备 | 本地政策有，生产未验证 | 仅 14 个英语支柱进入广告资格合同；商业页无支付完成误导 | AdSense 审批、CMP/Consent Mode/账户级 Auto ads 排除、广告真实布局和收入均未验证；不能声称已批准 |
| 部署/回滚 | 工具代码有，生产阻断 | release tests 覆盖 bundle 篡改、dirty candidate、preflight 和模拟 rollback | 当前 dirty 状态不可作为候选包；构建运行环境/生产域名/线上文件和真实 rollback 未验证 |

## 最关键的 5 个问题

1. **公网可达性有紧急信号**：网页读取器于 2026-10-06 对首页收到 HTTP 521。未完成第二网络或真实 Chrome 复核，需按“可能线上故障”处理并及时用主机/Cloudflare日志确认。
2. **规划治理门禁确实失败**：N00 10/5 报告为 BLOCKED、planning_drift_status=unresolved；当前规划交付的浏览器证据缺项。当前完整 npm test 在 planning-map byte-binding 阶段更早因 `tests/site.test.js` 的候选哈希过期而退出；修正本轮 manifest 后仍需满足最终 browser/perceptual evidence 门槛。
3. **源码版本身份不清晰**：HEAD 与跟踪上游相同，但 129 tracked changes + 1,551 untracked files。当前构建是 dirty 工作树，不是干净、审过、可部署的 commit。
4. **41 个支持/参考指南的内容任务仍待逐页 ledger**：是否保留、是否合并、搜索需求与每页独有产物不能从 noindex/词数推断。当前应继续保留 URL，不批量删页或新建同义页。
5. **内容来源、流量及商业结果不能互相替代**：德国与北京 Goethe A1 共 6 个价格登记对象已于 2026-10-06 按各自官方页面复核，金额与范围未变，下一次复核日期为 2026-11-06；实际结账、席位、个人类别资格仍未验证。Search Console/分析、真实读者任务、AdSense 账户批准和 consent 运行状态均未知。

## P0 / P1 / P2

### P0 — 先确认再推进

- 公网首页 HTTP 521 观察：用独立用户网络/浏览器和受控主机/Cloudflare日志确认范围；若可复现，按线上可用性 incident 处理。不要仅凭一个代理抓取器改生产配置。
- planning-map 独立审计 BLOCKED：精确最终 HTML 缺自动浏览器回执、两主题截图及独立图像审阅，且漂移未决。N00 记录的 governance test 退出 1；本次未伪造或补做截图。

### P1 — 可发布前闭环

- 冻结一个明确 scope、源文件 hash 和 dirty baseline；当前变更不应被当作稳定 release candidate。
- 由可用本机浏览器完成桌面/390px 手机/平板布局、导航、工具正常与错误流程；保存实测截图及 hash，屏幕阅读器与真实设备结论单列。
- 德国/北京 Goethe A1 的 2 个 claim、4 条费用记录已在 2026-10-06 依据各自官方价目页复核并刷新来源检查/下次复核日期，金额未改。实际 checkout 与席位仍需读者向选定中心核验；价格页不能证明个体类别资格或移民接受。
- 执行 41 页逐页内容价值清单；交通/流量标 unknown，确有来源变化的才提修改。任何 canonical/noindex/redirect/sitemap/ads 变更都要显式 owner 与规划门禁。
- 恢复生产状态观察：通过第二个网络/真实浏览器检查首页、robots、sitemap、A1/B1 和工具。若仅此读网页工具遇 521，记录工具边界；不要把未验证结论当 outage。

### P2 — 质量改善与增长准备

- 通过真实 browser walk-through 后再定首页/工具信息架构和视觉调整；修复前先保存现况截图。
- 决定是否启用分析、使用哪种 consent/CMP、由谁读取数据；未决前只保留隐私 allowlist 和静态站点行为。
- AdSense 与产品变现先完成内容/流量/同意政策和后台批准验证；不按“合格页数”预测收入。
- 按 core A1 → 支柱 hub → 相关支持指南 → official next action 建内部链接，减少同一用户在 fees/centres/bookings/acceptance 页间回跳。

## 验证结果

| 命令/检查 | 结果 | 说明 |
|---|---|---|
| npm run build | PASS | 在完整物理隔离副本运行；build 的 prebuild 只清理副本内 `.astro/` 与 `dist/`；构建由 launch-check 前置步骤及测试子进程完成 |
| npm run launch-check | PASS | 完整物理隔离副本，57 PASS / 0 FAIL / 0 BLOCKED；末尾明确 LOCAL CANDIDATE CHECKS PASSED; production evidence is separate |
| npm test | FAIL（规划图冻结门禁） | 完整物理隔离副本运行。UI、路由、内容、工具、SEO、部署与 fee-registry 断言通过；最后在 `tests/planning-map-governance.test.mjs:234` 因存档绑定 SHA-256 `4bce5115…` 与当前 `tests/site.test.js` SHA-256 `961917e4…` 不符而退出 1。未覆盖、删除或放宽该门禁 |
| git diff --check | PASS | 在原工作树只读运行；没有空白错误 |
| lint/typecheck/security scripts | NOT AVAILABLE | package.json 没有 lint、typecheck、security scan script。npm run 列表确认仅 dev/test/build/preview/launch-check/clean |
| dependency / security audit | NOT RUN | 没有仓库现成的安全扫描命令；未向 npm registry 发送依赖清单 |
| tests/planning-map-governance.test.mjs | FAIL（复现） | 当前最先失败项是 `tests/site.test.js` 候选字节绑定过期；N00 独立审计 10/5 还记录后续 browserEvidence=blocked 门槛。二者均未被伪装为通过 |
| 浏览器 UI | NOT RUN | 可用浏览器 Chrome 被 CUA 列出，但绑定/创建 tab 请求失败（nodeRepl.fetch request failed；之后 Transport closed）。目标 URL 127.0.0.1:4379，原计划视口 1440×900、390×844；没有任何视口成功渲染或截图，不能称为实测 |
| 线上首页 | HTTP 521（单抓取器） | 网页读取器尝试 https://visalang.org/，返回 Cloudflare 521；robots.txt、sitemap-index.xml 与 https://www.visalang.org/ 在同一工具中不可读取；非 Chrome，未从第二网路确认 |

### 后续授权校准与隔离续验（2026-10-06）

- 官方价格页再次显示德国成人 A1 为 EUR 155，课程学员 20% 优惠适用于考试日前六个月内参加 Goethe 课程者；北京成人 A1 在读/非在读分别为 CNY 1,400 / 1,500，北京页面以考试与课程结课日期间隔定义在读并要求课程证明。两页均保留原来的国家/机构边界；本次没有访问报名结账流程，也没有推断实时席位或个人类别结果。[德国 Goethe 价目](https://www.goethe.de/ins/de/en/prf/pre.html)，[北京 Goethe 报名及价目](https://www.goethe.de/ins/cn/zh/spr/prf/anm.html)。
- 本次续验只改 `src/data/claim-registry.ts` 中上述两条价格 claim 与四条价格记录的 `sourceCheckedAt`（2026-10-06）和 `nextReviewAt`（2026-11-06）；数额、正文、版本、中心路由及其他考试产品来源日期未改。对应断言在 `tests/claim-registry.test.mjs` 与 `tests/m2a-local-fees-centres.test.mjs` 更新。
- 续验前 SHA-256 已冻结于 `/tmp/visalang-fee-review-baseline-20261006.json`（文件自身 SHA-256：`b4f28f4dd03b295f48303fac4652af4213c67963b485b9414809fa87664cd3dc`）；三个原文件的前置哈希及最终哈希见本地状态清单/当前文件。原 `dist/` 与 `.astro/` 每个文件均与保全快照逐项一致。
- 说明较早的根目录构建副作用：在要求保全输出前，先前的 `npm test` 已由 `prebuild` 清理并重建根 `.astro/` 与 `dist/`；无法找到确认是事故前内容的备份，因此没有推测恢复、覆盖或删除。保全清单 `/tmp/visalang-preservation-20261006T151509Z.json`（SHA-256 `d4c9549869ae8aac2b4878d5efe919493cc61fecfac89fc0e0247b31551558e7`）记录的是当时现存状态；后续清单 `/tmp/visalang-preservation-followup-20261006T151653Z.json`（SHA-256 `3573fa3c03cefe98edd99a768aafe6156f0ed1f246ca5313141786dd660fe599`）及最终逐文件比对确认这两个目录此后未变。这不能恢复或证明事故前的原始字节。
- 在不含 `dist/.astro` 的物理隔离副本执行完整 `npm test`：所有先行 UI、内容、工具、SEO、部署与 fee registry 断言均通过，最后在规划图 byte-binding 处失败，因 `tests/site.test.js` 的存档哈希 `4bce5115…` 与当前文件哈希 `961917e4…` 不同；退出码 1。没有覆盖或放宽该门禁。隔离副本 `npm run launch-check` 通过，57 PASS / 0 FAIL / 0 BLOCKED。构建由这些隔离测试及 launch-check 运行在副本内。
- 本次复核仍缺当前窗口 planning-map/sync/history、Archify showcase 验证与交付、浏览器截图及独立图像审阅；因此不构成治理 PASS。现有本机工具清查未找到 Archify CLI/skill，也未找到获准的本地浏览器路径；`docs/module-handoffs/2026-10-05-integration/browser-policy-block.json` 禁止替代路径。没有生成或声称视觉证据。
- 未更新 `docs/TASK_LOG.md` 或 Obsidian Vault，因为窗口尚未闭合。Obsidian 所需目标和模板路径见最终交接；本地授权范围未开放 Vault 写入。

## 官方来源抽查（2026-10-06）

| 来源 | 本次核对可支持的内容 | 明确边界 |
|---|---|---|
| [德国联邦外交部配偶语言 FAQ](https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682) | 当前页面对配偶申请签证的德语基础知识要求作一般说明，并提示详情向对应国家的德国使领馆核验 | 不证明某申请人的豁免、证书接受、当地材料/预约流程或结果 |
| [Goethe-Institut Germany 2026 价目](https://www.goethe.de/ins/de/en/prf/pre.html) | 德国机构的 2026 价格表成人 A1 行为 EUR 155；登记范围为德国 Goethe 价格页 | 不可外推到境外/合作中心，不证明名额、最终结账价、付款成功或移民接受 |
| [Goethe-Institut 北京报名及价目](https://www.goethe.de/ins/cn/zh/spr/prf/anm.html) | 北京分院页面的 2026 成人 A1 行区分在读 CNY 1,400 与非在读 CNY 1,500；页面写明名额与报名通知边界 | 北京专属且类别依官方定义；不等于中国全国价格、报名成功或个案资格。来源台账当前登记值与本次网页抽查一致 |
| [汉堡大学德语能力要求](https://www.uni-hamburg.de/campuscenter/bewerbung/international/studium-mit-abschluss/sprachkenntnisse/deutschkenntnisse.html) | 2026-07-16 页面展示该校 TestDaF/DSH 的证书与分数要求；说明项目/学校是最终考试接受方 | 只适用于汉堡大学页面所述入学申请，不是德国所有高校或专业的统一规则 |
| BAMF 英文入籍页 | 本次网页读取返回 403；未把它作为已验证的当前规则来源 | Germany B1 个案、豁免及当地材料仍应指向法定/主管机关和申请人对应机构重新核验 |

该抽查只验证几项当前最相关的官方边界，不是 61 页 claim-by-claim 的完整法律审计。其他国家、考试中心、大学专业和职业路线必须分别找决定机关或官方 provider，不以德国政策作类比。

## 浏览器覆盖清单与剩余项

- 计划浏览器：本机 macOS Google Chrome；自动化接口 CUA。
- 计划本地 URL：隔离副本 http://127.0.0.1:4379/。CUA 未成功创建浏览器标签；这是使用的目标 URL，不是已浏览 URL。
- 线上 URL：网页读取器打开 https://visalang.org/ 得到 521；没有用 Chrome 加载线上页。
- 视口：桌面 1440×900、手机 390×844 均未运行；平板/375/768 也未运行。
- 未覆盖：视觉布局、移动菜单开合、表单焦点/错误提示、键盘操作、屏幕阅读器、复制/打印/文件下载、触控、Cookie/广告真实网络请求、移动设备 Safari/Chrome。
- 用户测试：没有联系真人，也没有将移民/考试个案数据输入工具。

## 交付状态

本目录三份文件是独立审计与建议，不是 Master Package、正式执行计划或已获批准的实现提示词。后续获准的价格元数据校准已写入本地源码和对应断言，但当前窗口尚未更新 planning-map/sync/history、TASK_LOG 或 Obsidian，也没有完成所需的当前窗口 Auditor PASS。需先补齐 Archify/视觉证据、精确冻结 scope 与来源链，再由 VisaLang Independent Auditor 复审；N00 当前 BLOCKED 不能由本报告绕过。

Owner 发布/部署授权：pending。Deployment：not_started。此报告不授予任何生产操作权限。
