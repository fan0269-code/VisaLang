---
status: review
needs_human_review: true
owner_decision: pending
deployment_status: not_started
site: visalang.org
record_date: 2026-09-09
branch: codex/scheme-3-one-week-content
baseline_commit: 4cb57e8744c752fed1881281e69e7b24cc7281c4
result_commit: unavailable_uncommitted
sync_status: blocked_missing_vault_mount_and_template
agent_review_status: pass
m2b_status: t15_t18_completed_t19_partial
m2b_independent_review: pass
m2b_calendar_import: blocked_not_tested
m2b_planning_map_sync: VL-PMAP-20260911-03
intended_vault_directory: /Users/fanlw/Documents/Website-Content-Hub/10-visalang.org网站维护/30-待审核/网站更新记录/
required_template: /Users/fanlw/Documents/Website-Content-Hub/50-内容模板/网站更新同步记录模板.md
---

# VisaLang Master Package T01–T18 与 T19 部分验证更新记录（待同步载荷）

> 本文件是在必需 Vault 根目录和模板均不可访问时保存的待审核载荷，
> 不是正式 Obsidian 记录。不得据此标记 approved、previewed、deployed
> 或 published。T01–T09 的同一独立审计员第三轮结论曾为 `PASS` /
> `findings: []`；同一审计员已对 T10–T14 修正范围复核并返回 `PASS` /
> `findings: []`。该 PASS 不代表人工批准、提交、部署或发布。

## 内容摘要

- 把 2026-09-08 Master Package 八份原始 Markdown/CSV 文档按哈希完整
  纳入仓库，并记录真实源码、运行命令、脏工作树与可恢复基线。
- 修正 A1 页面中把签证路线/证明决定权错误交给考试侧的 P0 责任错配，
  并用渲染测试锁定中文页面不再出现编辑自检指令。
- 建立 64 个已审计、14 个待核与 24 个源码发现记录的 URL/支持范围
  台账，以及按 claim/version/scope/source/date/usedBy 管理的 fail-closed
  事实契约；稳定 consumer ID 与语言范围现在参与运行时授权，未知费用
  不写成 0 或免费。
- 英文/中文首页和路线入口只把德国 A1 家庭团聚标为完整配置，B1 为
  指南入口，其余为核验入口；所有首屏按钮均落到现有本地页面。
- C01/C07 显示受来源约束的直接答案。恢复英文 C07 为 self-canonical、
  `noindex,follow`、无广告、站点地图/主发现之外的审核页；保留中文旧
  C07 重定向。中英文 C01 范围不等价，因此不机械互设 hreflang。
- 第二轮独立审计确认四项首轮问题已解决，并发现费用页台账漏掉实际渲染
  的 FFO 路线来源、测试又可在空来源集合上通过。修复后的测试从 Markdown
  与三个 frontmatter authority 字段派生 4/4/3 URL 集，先对缺失行产生
  精确 RED，再补齐八字段行转为 GREEN；只读任务审查无 findings。
- T10–T12 建立两个精确成人 A1 产品的分项事实模型、五阶段原子工作清单，
  以及只覆盖德国和指定北京机构的四条本地费用/两条考点路线证据。费用
  保留原币种，折扣只做同表精确算术；不推断接受、座位、实时结账或中国
  全国价格；未知费用分支明确输出 status、owner、action、boundary。
- T13 用同一严格日历日契约驱动文章、中文表面、Timeline 和持久化：
  基准为 `D - W - P`，附加缓冲为 `D - W - P - R`。三个固定场景覆盖
  普通、跨年与闰日；输入是假设或本地事实，不是机构默认时间。
- T14 为五个工具增加 schema-v1 共享计划、session 优先、显式 30 天设备
  快照、稳定 ID 白名单、版本重确认和安全旧链接迁移。新表单值不写 URL；
  无 JavaScript 时 fail closed；同源旧 `visalang-tool:` 存储可清除，但
  不触碰独立路线进度或无关键。

## 当前本地发布矩阵

- 39 篇英文指南源：15 个英文 pillar，24 个 pending/noindex 支持页。
- 5 个中文 pillar；12 个 noindex 分类；17 条单跳 301。
- 构建目标：83 个 HTML 页面、36 个 sitemap URL、47 个 noindex 页面、
  14 个广告 allowlist 页面。
- 当前候选始终为本地 `not_deployed`；上述数字不是线上状态证明。

## 规划与决策依据

- `docs/master-package-2026-09-08/VisaLang-Master-Plan.md`
- `docs/master-package-2026-09-08/VisaLang-Codex-Backlog.csv`
- `docs/master-package-2026-09-08/VisaLang-audit.md`
- `docs/master-package-2026-09-08/VisaLang-url-remediation.csv`
- `docs/master-package-2026-09-08/VisaLang-content-rewrites.md`
- `.superpowers/sdd/VisaLang-Master-Plan/task-1-report.md` 至
  `task-5-report.md`
- `.superpowers/sdd/VisaLang-Master-Plan/m2a-t10-t14-execution-plan.md`
- `docs/VISALANG_M2A_T10_T14_EXECUTION_EVIDENCE_2026-09-09.md`
- `docs/CONTENT_MAP.md`、`src/data/publication-manifest.ts`、
  `src/data/url-support-inventory.ts`、`src/data/claim-registry.ts`、
  `src/data/plan-state.ts`

## 主要改动文件

- 文案与入口：`src/pages/index.astro`、`src/pages/zh/index.astro`、
  `src/pages/routes/index.astro`、`src/components/RouteSelector.astro`、
  `src/content/guides/german-family-reunion-language-requirement.md`、
  `src/content/guides/goethe-a1-germany-family-reunion.md`、
  `src/content/guides/goethe-a1-fees-by-country.md`。
- 数据与渲染：`src/data/claim-registry.ts`、
  `src/data/url-support-inventory.ts`、`src/data/publication-manifest.ts`、
  `src/data/zh-germany-a1.ts`、`src/data/site.ts`、
  `src/layouts/GuideLayout.astro`、`src/components/ZhGuideLayout.astro`。
- M2-A 工具与事实：`src/data/claim-registry.ts`、`src/data/route-tools.ts`、
  `src/data/plan-state.ts`、`src/scripts/plan-state.ts`、
  `src/components/ExamProductComparisonTable.astro`、
  `src/components/LocalExamFeeTable.astro`、`src/scripts/tool-form.ts`、五个
  工具页面、共享 `ToolShell.astro`，以及 Privacy/Cookie 披露。
- URL/测试/记录：`public/_redirects`、`tests/task-2-p0-render.test.js`、
  `tests/claim-registry.test.mjs`、`tests/source-review-render.test.js`、
  `tests/task-4-guides-render.test.mjs`、`tests/task-4-home-routes.test.mjs`、
  `tests/task-5-source-ledger.test.mjs`、相关发布矩阵断言、
  七个 `tests/m2a-*.test.mjs` 回归、`docs/master-package-2026-09-08/`、
  `docs/CONTENT_MAP.md` 和本批执行证据。

## 官方来源与边界

- 德国外交部配偶语言 FAQ：
  `https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682`
  只支持一般起点并要求向主管使领馆确认细节。
- 德国外交部德国配偶场景：
  `https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/04-dtehepartner/606680`
  只支持该场景中的主管使领馆/外国人管理局流程，不能扩展到所有家庭路线。
- 德国外交部主管使领馆 FAQ：
  `https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/25-wobeantragen/606738`
  只支持按通常居住地识别主管机关的核验动作。
- 德国驻华使领馆 A1 说明与长期签证 FAQ：
  `https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606`、
  `https://china.diplo.de/cn-zh/service/visa-einreise/faq-national-visa-1434978`
  仅限中国申请地；“通常接受”不是保证、自动拒绝、全球有效期或个案结论。
- Goethe A1 产品、实施规则、考试目录与练习材料：
  `https://www.goethe.de/ins/de/en/prf/prf/gzsd1.html`、
  `https://www.goethe.de/pro/relaunch/prf/de/Durchfuehrungsbestimmungen_A1_Start_Deutsch_1.pdf`、
  `https://www.goethe.de/en/spr/prf.html`、
  `https://www.goethe.de/en/spr/prf/ueb/pa1.html`
  只支持相应产品/考试字段和官方后续路线，不决定签证接受、本地开考、费用、
  座位或个案结果。
- telc A1 产品、模拟题与考点目录：
  `https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/`、
  `https://shop.telc.net/media/catalog/product/file/2/0/20210103_5070-b00-010106_web_1.pdf`、
  `https://www.telc.net/en/language-examinations/find-a-telc-examination-centre/`
  只支持相应产品字段和官方查找路线，不证明本地价格、场次、座位或签证接受。
- Goethe 北京本地考试/价目页：`https://www.goethe.de/ins/cn/zh/spr/prf/anm.html`
  仅支持该页当时发布的本地表格与类别差异；不支持全球统一费用、座位、预约或受理结论。
- Goethe 德国官方价格页面/国家网络价格页面：`https://www.goethe.de/ins/de/en/prf/pre.html`
  仅支持该页当时发布的价格表与类别差异；不支持全球统一费用、座位、预约或受理结论。
- BAMF 英文配偶团聚说明：
  `https://www.bamf.de/SharedDocs/Anlagen/DE/MigrationAufenthalt/Ehegattennachzug/ehegattennachzug-en.pdf?__blob=publicationFile&v=11`
  仅支持基础德语/配偶团聚导向和递交使领馆对证明的核验边界；不支持完整例外测试、证书受理决定或个案结果。
  该直链在 2026-09-09 的复查返回 HTTP 403，因此本记录不声称当前可达。
- 完整 locator、允许支持范围、禁止推断、预期消费者和读者动作的规范记录见
  `.superpowers/sdd/VisaLang-Master-Plan/task-5-source-ledger.md`。此前的
  `task-2-source-evidence.md` 与 `task-4-source-evidence.md` 仅为各自任务的
  边界表，已由该逐文章台账补充；不要把它们当作完整来源台账。

## 实际验证

> T01–T09 的 2026-09-09 11:27–11:43 round-3 候选曾通过完整测试、
> 83/35/48/14 矩阵和同一审计员 `PASS`。下面记录新增 T10–T14 的最终本地
> 候选，以及同一审计员对修正范围的 `PASS`。

- 七个 M2-A 聚焦测试当前 PASS：路线工具、精确产品、阶段清单、本地费用/
  考点、日历契约、共享状态模型与浏览器侧集成。
- 首轮全量 `npm test` 揭示旧 14-pillar 断言，修正为本批有意的 15；随后
  全量入口 PASS。首轮 launch-check 揭示 Exam Comparison 的旧双列断言，
  修正为两个独立产品/两条官方链接后，直接检查 PASS 57/57 / `READY`。
- 本批最终 `npm test`、`npm run build`、`npm run launch-check` 和
  `git diff --check` 均 PASS；launch-check 为 57/57 / `READY`，单独读取
  生成物确认 83 HTML / 36 sitemap / 47 noindex / 14 ads，暂存区为空。
  首轮最终测试暴露的 route-tools 断言缺逗号和下一轮暴露的旧内容地图日期
  均已用最小修复后从头复跑通过。同一审计员的新结论为 `PASS`；审计记录见
  `.superpowers/sdd/VisaLang-Master-Plan/m2a-independent-audit-record-2026-09-09.md`。
- Vault 模板和目标目录在本机均不存在；正式同步仍阻塞，不能把本载荷
  伪称为已写入 Vault。

## 风险与所有者决定

- T10–T14 是本地已完成且经同一独立 Auditor PASS、但未提交的候选，并非线上能力；T15–T19 与 T20–T34 的其余
  工具完成度、RFC 5545/客户端导入、迁移、运营和生产发布仍为 `pending`。
- 没有 GSC、反链或生产 HTTP 证据，不据此批准其余 URL 合并或线上状态。
- Node 会输出既有 `MODULE_TYPELESS_PACKAGE_JSON` 性能警告；这不是本批
  新增的功能错误，但测试架构仍有重复发布快照的维护风险。
- 所有者仍需审阅内容、来源边界、URL/索引矩阵和本地差异，并另行决定
  是否 commit、push、部署、发布或发起广告复审。

## 2026-09-10 网站整体规划图与偏航门禁增量（待同步）

- 同步窗口：`VL-PMAP-20260910-01`；规划判断：`drift: aligned`；最终
  179 文件受监控指纹为
  `b7766e40c50a8cd9bf693bed4bfbdb0fc7d9e41fd4944098d5877e58a6f551b1`。
- 新增 Archify 可编辑源、可信 HTML、浏览器多尺寸证据和机器可读
  `sync.json`。该图是 Master Package 与状态覆盖层的派生视图，不替代
  规划权威，也不改变任务完成状态。
- 当前正式完成边界仍为 T01–T14；T15–T19 仅是待收口的实现候选。
  下一执行阶段先关闭 M2-B，再进入 M3 的 T20–T22；T23 缺迁移证据或
  Owner 授权时只允许交付映射，不允许声称已迁移。
- 后续每次内容或内容规划更新，都必须重新计算受监控范围指纹、更新规划
  图或显式证明状态无变化，并记录 `aligned`、`approved-deviation` 或
  `unresolved`。未解决偏航将阻塞完成与发布。
- Archify `showcase` 校验为 9/9、0 error、0 warning；最终 HTML 已通过
  1440×900、1600×1000、1920×1080、2048×1320 自动 containment，
  并保存/复核 1440×900 与 2048×1320 的明暗主题截图。首轮独立审计的
  3 个 P1、3 个 P2 已转为非可选根、分类候选清单、append-only 同步历史、
  完整 sync receipt 绑定、浏览器/感知证据哈希与可换行完整指纹；最终结论
  以同一 Auditor 的复审记录为准，不由本载荷预先声明。Round 2 另发现的
  生成机绝对路径可移植性 P2 已改为仓库相对 artifact identity 加 SHA/字节
  校验，并覆盖异地 checkout 正例与错误路径/哈希负例。Round 3 的跨平台
  分隔符逃逸 P2 已由统一的 normalize-first 路径验证器关闭，POSIX、Windows、
  drive-relative、UNC 和 `..` 路径均 fail closed。Round 4 的点段/目录冒充
  证据 P2 已由空段、`.`、`..`、非规范路径拒绝及普通文件/扩展名检查关闭。
  Round 5 的正文伪造 PASS P1 已由唯一 strict front matter 解析、必需字段
  精确验证及正文 spoof/重复 verdict/重复 hash 负例关闭。Round 6 的无效
  baseline P2 已由“分支 + 40 位 commit SHA”合同及空值/数组/布尔/数字
  负例关闭。
- 相关仓库记录：`docs/planning-map/`、
  `docs/prompts/2026-09-10-m2b-closeout-m3-codex.md`、
  `tests/planning-map-governance.test.mjs`。本地候选为 `not_deployed`；
  Vault 目录和模板仍不可访问，因此本节只是待同步载荷，状态继续保持
  `review` / `needs_human_review: true` / `owner_decision: pending` /
  `deployment_status: not_started`。
- 最终命令证据：同一 Auditor Round 7 `PASS` 后，直接规划门禁以 179 个
  watched files / `VL-PMAP-20260910-01` 通过；2026-09-10 09:53
  Asia/Shanghai 的完整 `npm test` exit 0，包含 83-page production build、
  既有站点/内容/M2-A/M2-B 套件与规划门禁；`git diff --check` exit 0。
  既有 `MODULE_TYPELESS_PACKAGE_JSON` 警告仍为非失败项。该证据已提交给
  同一 Auditor 作最终确认，最终独立结论仍以审计报告为准。

## 2026-09-10 至 2026-09-11 M2-B T15–T19 收口结果（待人工审核）

- 本节记录 M2-B 新增本地结果；独立 Auditor Round 2 对 36 路径冻结候选
  返回 `PASS` / `findings: []`。页首 `agent_review_status: pass` 现在覆盖
  T01–T18 的本地实现审查，以及 T19 的生成器/下载实现审查；它不覆盖
  T19 的真实日历客户端导入，不代表 Owner、提交、部署或发布授权。
- T15 Route Finder 保留四个结果状态与五个验收场景；仅配置完成的德国
  配偶团聚 A1 分支询问地区、关系和既有证书，未配置分支不推断豁免、
  证明接受或个案结论。
- T16 Checklist 保留 12 个稳定任务 ID、切换/恢复/重置和明确的
  [x]/[ ] 导出。真实 Chrome 打印预览生成 6 个有内容的分页；自动复制
  成功。浏览器权限未被更改，因此 Clipboard 被阻止时的界面回退仅有自动
  回归证据，浏览器状态为 not_tested。
- T17 Exam Comparison 显示 Goethe 与 telc 各自的官方练习入口和彼此
  独立的产品列；390 px 的整页横向溢出经 RED→GREEN
  修复后，仅表格容器可 680 px 内容横向滚动，页面本身不溢出。
- T18 Timeline 的 D/W/P/R、两个公式、无效/过去/零值、跨年、闰日及
  正负时区合同通过；界面没有把计算日期描述为权威截止、座位、成绩或
  证书保证。
- T19 的真实 Chrome 下载文件为 911 bytes，和同一 UTC DTSTAMP 输入的
  生成器逐字节相等；两者 SHA-256 均为
  36c0f751d9c3b1ffa4917eaef5cddc353c7215a4970df69a85907075ffefe747。
  文件含配置路线对应的德国外交部核验入口。未打开或导入日历客户端；
  该项保持 blocked_not_tested，T19 不得称为 fully verified。
- 桌面 1440×900、390×844、768×1024 的已观察工具状态、焦点、键盘
  顺序与 overflow 均记录于
  docs/VISALANG_M2B_T15_T19_EXECUTION_EVIDENCE_2026-09-10.md。未观察
  状态均明确标为 not_tested。
- 当前所有变更仍未提交、未推送、未部署、未发布；Owner decision 保持
  pending。Vault 目录和模板仍不存在，本仓库载荷不等于正式 Vault 写入。
- M2-B 修正后的后继规划图同步为 `VL-PMAP-20260911-03`，规划判断为
  `drift: aligned`；当前图记录 T15–T18 已完成、T19 客户端导入仍待单独
  授权，以及 T20 为下一任务。该图和 Auditor PASS 均不构成 Owner 或
  发布授权。
- Round 3 发现冻结范围中位于 hard-watch roots 之外的证据/测试文件缺少
  独立字节绑定。修正后的 `sync.json` 对每个此类候选（除自引用 receipt）
  记录精确 SHA-256，并由变异回归证明审核后改动会 fail closed。
