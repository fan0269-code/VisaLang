---
status: review
needs_human_review: true
owner_decision: pending
deployment_status: not_started
site: visalang.org
record_date: 2026-09-11
branch: codex/scheme-3-one-week-content
baseline_commit: 4cb57e8744c752fed1881281e69e7b24cc7281c4
result_commit: unavailable_uncommitted
sync_status: repository_payload_only_external_vault_not_written
agent_review_status: round_3_pass_0_p0_0_p1_0_p2_post_pass_successor_pending
m3_status: t20_t21_t22_local_complete_implementation_review_t19_partial_t23_blocked
m3_automated_verification: focused_green_final_serial_verification_pending
m2b_focused_verification: five_serial_suites_pass
m3_browser_verification: local_preview_pass_with_not_tested_boundaries
m3_final_full_test: pending
m3_final_build: pending
m3_launch_check: blocked_59_pass_0_fail_1_blocked_no_redirect_authorization
m3_independent_review: round_3_pass_candidate_gate_only_final_successor_binding_pending
m3_round_3_audit_report_sha256: 7ca1cdfc9b8b898a51fae57c353005bbea793ad819a36cbeaaf81b67ab944d01
m3_reviewed_sync_sha256: b465a72a8956227888d94bc03a21f8106fe3b247889640a67134f04ce628923d
m3_planning_map_sync_and_governance: vl_pmap_20260911_07_exact_freeze_atomic_delivery_final_binding_pending
m3_production_http: not_observed
m3_url_migration_execution: blocked_no_authority
m2b_calendar_import: blocked_not_tested
intended_vault_directory: /Users/fanlw/Documents/Website-Content-Hub/10-visalang.org网站维护/30-待审核/网站更新记录/
required_template: /Users/fanlw/Documents/Website-Content-Hub/50-内容模板/网站更新同步记录模板.md
---

# VisaLang M3 T20–T23 网站更新记录（待同步载荷）

> 本文件只是仓库中的待人工审核载荷，不是正式 Vault 记录。当前没有写入
> 外部 Obsidian Vault，也不得据此标记 approved、previewed、deployed 或
> published。M3 本地预览及修正浏览器证据已记录。同一 Auditor 对精确的
> `VL-PMAP-20260911-06` 候选返回 round-3 `PASS`（0 P0 / 0 P1 / 0 P2）。该
> 结论只关闭 T20–T22 的本地 implementation-review gate；post-PASS 状态
> successor `VL-PMAP-20260911-07` 已精确冻结并原子交付，最终同一 Auditor 绑定
> 及最终串行验证仍待完成，不得预写 successor `PASS`、发布就绪或 M3 全部完成状态。

## 当前结论

- `implemented`：T20 中文核心工具流程、T21 指南发现与信任文案、T22
  生成 SEO 合同已在本地 implementation-review gate 完成；T23 仅证据迁移
  候选/回滚图存在于本地脏工作树，但仍为 `evidence_map_only` / `blocked`。
  T19 因真实日历客户端导入未获授权而保持 `partial` / `in_progress`。
- `automated_verified`：六个 M3 范围聚焦命令按顺序全部通过，最后一个是 T23
  迁移图复跑；五个 M2-B 聚焦套件也全部通过。生成物测试基于 88 个 HTML
  页面、41 个 sitemap URL 和 47 个 noindex 页面。
- `browser_verified`：本地 Astro preview 在精确 375×812、390×844、
  768×1024 和 1440×900 视口下通过已记录的 T20–T22 页面与流程检查；该结论
  仅限 Codex 内置 Chromium，本文件保留下列全部 `not_tested` 边界。
- `independently_reviewed`：同一 M3 Independent Auditor 对
  `VL-PMAP-20260911-06` 返回 round-3 `PASS`（0 P0 + 0 P1 + 0 P2）。审计报告
  SHA-256 为
  `7ca1cdfc9b8b898a51fae57c353005bbea793ad819a36cbeaaf81b67ab944d01`，
  被审 `sync.json` SHA-256 为
  `b465a72a8956227888d94bc03a21f8106fe3b247889640a67134f04ce628923d`。
  该 `PASS` 不是 Owner、release、部署或生产行为授权。
- `committed`：否；`deployed`：否；`planning_drift_status`：`aligned`。
  Round-1 候选为 `VL-PMAP-20260911-04`；修正候选
  `VL-PMAP-20260911-05` 已冻结为精确 87 路径、覆盖 188 个 watched 文件，
  并完成 Archify 原子交付、自动浏览器和图像感知收据；它收到 round-2
  `FAIL`。修正 successor `VL-PMAP-20260911-06` 已精确冻结 87 条路径、覆盖
  188 个 watched 文件，并完成 Archify 原子交付、自动浏览器检查和图像感知
  检查；同一 Auditor 已对该精确收据返回 round-3 `PASS`。Post-PASS 状态
  successor `VL-PMAP-20260911-07` 已冻结同一精确 87 路径、覆盖 188 个 watched
  文件，并绑定更新后的状态权威、Archify/浏览器/图像感知收据；其最终同一
  Auditor 绑定仍待完成。

## 内容与功能摘要

- 五个中文工具路由复用同一套 Route Finder、Checklist、Timeline、Exam
  Comparison 和 Reminder 逻辑，只把自然语言界面本地化；语言不会推断申请地，
  事实版本、来源、日期、claim ID、任务 ID 和路线 ID 保持共享。
- 中文首页、A1 路线与维护中的中文指南进入中文工具路径。11 组经审核的
  真等价页面互设 `en` / `zh-CN` / `x-default`；中国范围 C01 与较宽英文
  C01 不建立 hreflang 关系。
- 八个历史中文 A1 用户任务被登记到五个维护中承接页；其中三个旧路径只记录
  已吸收任务证据和 `not_assessed` 迁移状态，不批准既有重定向。
- 指南库使用 `family`、`settlement`、`citizenship`、`preparation` 四个
  稳定目的，可按多目的成员关系筛选；URL 恢复/清除和零结果恢复均有确定合同。
- 考试目录把两个当前维护的 Goethe/telc A1 产品放在配置区，其他 29 条保留
  为官方入口型参考记录，不暗示签证路线接受、价格、考位或可预订状态。
- About、Editorial、Contact、Pricing、Partners 与未交付产品页面改用读者可懂
  的范围说明；未交付产品没有订阅、购买或交付 CTA。
- 本地生成输出核验 self-canonical、语言、robots、sitemap 与 hreflang；参数
  不进入 canonical、hreflang 或 sitemap。该结果不是线上 HTTP 证据。
- T23 地图覆盖 17 个既有 Scheme-3 重定向：1 个 `HOLD`、16 个
  `REJECT_CURRENT_REDIRECT`、0 个 `APPROVE`。仓库中的合法配置入口存在，
  但生产安装和效果均 `not_observed`；GSC、反链与 Owner 授权仍缺失或待定。
  本批没有执行迁移，launch-check 因此必须保持 `BLOCKED` 而不是 `READY`。

## 规划依据

- `docs/superpowers/plans/2026-09-11-visalang-m3-t20-t23.md`
- `docs/master-package-2026-09-08/VisaLang-Master-Plan.md`
- `docs/master-package-2026-09-08/VisaLang-Codex-Backlog.csv`
- `docs/master-package-2026-09-08/VisaLang-url-remediation.csv`
- `docs/VISALANG_M3_T23_MIGRATION_CANDIDATE_ROLLBACK_MAP_2026-09-11.md`
- `docs/VISALANG_M3_T20_T23_EXECUTION_EVIDENCE_2026-09-11.md`

## 主要改动范围

- T20：`src/data/tool-copy.ts`、`src/data/zh-guide-task-reconciliation.ts`、
  五个 `src/pages/zh/tools/` 路由、共享工具数据/状态/组件/布局，以及中文首页、
  A1 路线和中文指南入口。
- T21：`src/data/guide-taxonomy.ts`、`src/data/guide-discovery.ts`、指南库与分类
  页面、筛选/搜索/卡片组件、`src/data/app-data.ts`、考试目录，以及 About、
  Editorial、Contact、Pricing、Partners 和两个未交付产品页面。
- T22：`tests/m3-generated-seo.test.mjs`、`scripts/launch-check.js` 和受影响的
  发布候选断言；本地预览证据记录见
  `docs/VISALANG_M3_T20_T22_BROWSER_EVIDENCE_2026-09-11.md`。
- T23：迁移候选/回滚地图和 `tests/m3-migration-map.test.mjs`。受保护的
  redirect 与 publication manifest 字节未变。
- 治理与记录：本执行证据、本地预览浏览器证据和本待同步载荷；规划图、
  TASK_LOG 和 round-1 修正记录已更新；`VL-PMAP-20260911-05` 已绑定规划图、
  浏览器/感知审查收据和精确治理冻结并收到 round-2 `FAIL`；
  `VL-PMAP-20260911-06` 的精确冻结、Archify 原子交付、自动浏览器检查和
  图像感知检查已记录并收到同一 Auditor round-3 `PASS`；post-PASS 状态
  successor `VL-PMAP-20260911-07` 的精确冻结、原子交付、自动浏览器和图像感知
  收据也已记录，其最终同一 Auditor 绑定与最终串行验证仍待完成。

Round-1 `VL-PMAP-20260911-04` 已冻结 83 条路径；round-2 修正候选
`VL-PMAP-20260911-05` 与 round-3 successor `VL-PMAP-20260911-06` 均冻结
同一精确 87 条路径；后者覆盖 188 个 watched 文件。本节是范围摘要，不能替代
`docs/planning-map/sync.json` 中经治理测试绑定的最终精确候选。

## 官方来源与事实边界

- T20 不建立第二套事实库。中文输出继续使用
  `src/data/claim-registry.ts`、`src/data/route-tools.ts` 和既有官方来源记录；
  聚焦测试确认本地化不改变来源 URL、核验日期、规则、claim 或稳定任务 ID。
- T21 的参考考试卡只是官方考试信息入口。最终接受范围由接收机关或机构决定；
  产品、考位、费用、退改和成绩规则由考试主办方及所选官方/授权考点决定。
- T23 只使用仓库 Master Package、URL inventory、dirty manifest/redirect
  状态和基线 Git blob。正文读取、静态生成或搜索发现不证明生产 HTTP、流量、
  反链、已安装/生效的生产服务器配置或迁移授权。仓库入口存在这一事实也不证明
  17 条候选映射已安装或生效。
- 本批没有重新抓取外部官方页面，也不把旧核验记录扩大为新的费用、时限、豁免、
  接受范围、考位或个案结论。

## 实际验证

2026-09-11 六个 M3 范围聚焦命令按下列顺序串行运行并全部 exit 0，T23
复跑刻意放在最后：

1. `node tests/m3-chinese-tool-contract.test.mjs` — PASS。
2. `node tests/m3-chinese-journey.test.mjs` — PASS。
3. `node tests/m3-discovery-trust.test.mjs` — PASS。
4. `node --test tests/m3-generated-seo.test.mjs` — 6/6 PASS。
5. `node tests/commercial-pages.test.js` — PASS。
6. `node --test tests/m3-migration-map.test.mjs` — 最终 T23 复跑，2/2 PASS。

五个 M2-B 聚焦套件也按顺序全部通过：

- `node tests/m2b-route-finder.test.mjs`
- `node tests/m2b-checklist-export.test.mjs`
- `node tests/m2b-exam-comparison.test.mjs`
- `node tests/m2b-timeline-result.test.mjs`
- `node tests/m2b-reminder-ics.test.mjs`

两条根任务 RED→GREEN 收据已保留：

- 不支持路线的中文主管机关步骤唯一性断言先以 1 个不同步骤、期望 4 个失败；
  补齐四条限定范围翻译后同一断言 PASS，最终本地预览也显示四条不同步骤。
- 完整 `npm test` 聚合登记检查先发现 `tests/site.test.js` 漏接 5 个 M3
  套件中的 4 个；补接四个套件后登记检查 PASS，当前聚合器列出全部五个
  `m3-*` 套件。该收据不等同于最终冻结候选的完整 `npm test`。

另有 T22 最初五项中的 2 项 RED：非等价中文 C01 曾输出孤立 self-hreflang，
launch 合同仍使用旧 83/36/16 数量；移除错误 alternate 并改为集合/唯一性断言后，
这五项转为 GREEN；再加入并修复上述聚合登记检查后，当前套件 6/6 PASS，工作
构建生成 88 页。

同一 Independent Auditor 随后对 `VL-PMAP-20260911-04` 返回 round-1 `FAIL`，
共 3 P1 + 3 P2：中文 Finder 分支呈现、过期 site-test 字面合同、错误的重定向
release-ready 结论、中文指南 CopyButton locale/反馈、仓库与生产合法配置证据的
混淆，以及执行/同步记录矛盾。Round 2 已确认上述六项均已修正，但对
`VL-PMAP-20260911-05` 返回新的 `FAIL`：0 P0 / 0 P1 / 3 P2，不能把 round-1
修正确认写成整体独立通过。

Round-2 三项 P2 的修正状态为：旧 standard suites 已改写为仅描述既有本地
redirect 声明和当前 source/target 生成观察，并绑定 T23 的 0 个 `APPROVE`、
`newRedirectAuthorization: none` 与 blocked release gate，明确否认退役、等价或
迁移授权；planning diagram 的 visual correction count 已与 byte-bound 感知收据
统一为 0；backlog overlay 已把“仓库配置入口存在”与“生产安装、active
configuration、effect 均未观察”分开，同时保留 GSC、反链、Owner、迁移和部署
阻断。

Standard-suite 修正已 GREEN：`scheme-3-atomic-merge` 先针对旧肯定性合同 RED
再通过，修正后的 `scheme-3-release-candidate` 与 `scheme-3-gates` 也通过，三者
均显式绑定 T23 的 0 approvals / none / blocked 状态。该自动化结果本身不替代
独立审查；同一 Auditor 随后对这份精确候选返回 round-3 `PASS`。

T23/release-gate 修正命令
`node --test tests/m3-migration-map.test.mjs tests/m3-generated-seo.test.mjs`
先以 5 PASS / 3 个预期失败退出 1，随后以 8/8 PASS 退出 0。直接非构建
`node scripts/launch-check.js` 有 59 PASS / 0 FAIL / 1 BLOCKED，并按设计退出 1、
终态为 `BLOCKED.`：17 个候选均未获授权，`newRedirectAuthorization: none`，
本地目标文件存在不等于线上 HTTP 成功。

已记录、供生成物和浏览器检查使用的工作构建 exit 0，生成 88 页。
`VL-PMAP-20260911-05` 已完成 9/9 Archify showcase、原子交付、四张图像感知
检查和精确 87 路径冻结，并收到 round-2 `FAIL`。Round-3 successor
`VL-PMAP-20260911-06` 也已完成同一精确 87 路径冻结、9/9 showcase、原子交付、
自动浏览器检查和四张图像感知检查；同一 Auditor 对该精确候选返回 round-3
`PASS`，0 P0 / 0 P1 / 0 P2。审计报告 SHA-256 为
`7ca1cdfc9b8b898a51fae57c353005bbea793ad819a36cbeaaf81b67ab944d01`，
被审 sync SHA-256 为
`b465a72a8956227888d94bc03a21f8106fe3b247889640a67134f04ce628923d`。
该结果把 T20、T21、T22 提升为本地 implementation-review gate 已完成；T19
仍为 `partial` / `in_progress`，T23 仍为 `evidence_map_only` / `blocked`。
Post-PASS 状态 successor `VL-PMAP-20260911-07` 已完成精确冻结和原子交付；最终
同一 Auditor 绑定及其后的串行 `npm test`、独立 `npm run build`、规划图治理与
`git diff --check` 仍为 `pending`，不得预写最终 successor `PASS`。当前 launch-check 的
`BLOCKED` 是故意的发布门禁，不是可改写为 `READY` 的待补绿色收据。Node 直接
导入 TypeScript 时继续出现既有 `MODULE_TYPELESS_PACKAGE_JSON` 性能警告；
当前聚焦命令没有功能失败。

## 本地预览浏览器证据

在 `http://127.0.0.1:4327/` 的本地 Astro preview 中，Codex 内置 Chromium
使用精确 375×812、390×844、768×1024 和 1440×900 视口；四种尺寸的已记录
页面均 PASS，且没有页面级横向 overflow。

| 页面/状态 | 375×812 | 390×844 | 768×1024 | 1440×900 | 精确观察 |
| --- | --- | --- | --- | --- | --- |
| Guide Library | PASS | PASS | PASS | PASS | 四个控件在 375/390 为单列、768 为双列、桌面保持内容主次；最终 390 复核中每个控件宽 309 px 且 x 坐标一致。 |
| Exam directory | PASS | PASS | PASS | PASS | 两个受支持精确 A1 产品始终排在 29 个仅参考记录之前。 |
| About / Editorial / Contact / Pricing / Partners | PASS | PASS | PASS | PASS | H1 和信任边界可见，没有未实现商业 CTA。 |
| 中文首页 / Germany A1 Hub / 代表指南 | PASS | PASS | PASS | PASS | 中文导航与英文目标标签清楚。 |
| 五个中文工具路由 | PASS | PASS | PASS | PASS | `zh-CN` H1 与本地化表单正确；可用控件至少 44 CSS px 高。 |
| 中文 Comparison 就绪结果 | PASS | PASS | PASS | PASS | 375 下可聚焦表格容器 client 286 px、scroll 680 px；只有表格横向滚动。 |

T20 实际观察包括：语言没有推断申请地；空 Finder 给出中文两项错误、聚焦国家
字段并显示 `必填`；不支持分支隐藏/禁用/取消必填三个无关控件、聚焦结果并显示
四条不同主管机关步骤；Germany/family/China/spouse/no-certificate 分支给出来源、
中文指南/Checklist/Timeline，已有 A1 则进入独立的主管机关确认状态。Round-1
CUA 修正复核还实际看到 B1、Ausbildung、nursing、university 四条各自本地化的
中文结果标题，以及 `other-family` 分支两条不同的恢复步骤。30 天保存成功，
同标签页进入 Checklist 时恢复路线；Checklist 有 5 组 12 项，首项后为 1/12、
`已完成`、`[x]`，序列化文本保留路线、日期、范围、申请地、证书状态和官方 URL；
Checklist 复制提示 `清单已复制。`，中文指南复制另行实际提示 `已复制。`。
中文指南 blocked Clipboard 反馈只由编译后的交互断言覆盖，没有在 CUA 中触发。
Timeline 对 D=`2026-12-15`、W=14、
P=7、R=30 得出 `2026-11-24` 与 `2026-10-25`，W=-1 清除旧结果并聚焦中文
错误。Comparison 对 Goethe/telc 显示 9 行与独立来源，同产品选择可恢复；
Reminder 空提交给出两项错误并聚焦主题，配置后显示本地化就绪状态。

T21 实际观察包括：20 个指南、准确的 Purpose/Stage/Language 加 Sort、skip link
到 main、可播报零结果与 Clear all 后 20/20/Search 焦点、citizenship 筛选 7/20、
键盘移除 chip 后 Purpose 焦点，以及含 `q=checklist` 等受控参数的直接恢复为 1/20
并删除旧 `country=Germany` 参数。375 px 菜单可由键盘开关且没有重复活跃路径；
Pricing 只有现有免费帮助、无 checkout，信任/商业页提供真实 Contact 路径且没有
内部工作流词或未交付产品订阅 CTA。

T22 实际观察包括：代表性工具、指南、目录和信任页均有一个 self-canonical、
受控 robots 与正确 HTML lang；Route Finder 和 Goethe test-centres 英中页面有
精确 `en`/`zh-CN`/`x-default`，两篇非等价 C01 均无 hreflang；Guides/Exams
自指 canonical、可索引且无虚构 alternate。canonical 没有 query/fragment；
浏览器控制台最终无 warning/error。全生成物套件另外覆盖所有 HTML、sitemap、
robots 源/生成一致性、11 组互反页面和 17 个未决重定向候选来源在当前本地
生成物中的缺席；后者不是已授权退役或生产 HTTP 证据。

## 受保护文件与迁移状态

最后执行的 T23 2/2 PASS 复跑再次核对了以下字节：

- Master Package backlog SHA-256：
  `26fbc283498a2ec60b54f84bedee0c6ca2daaca3e670d74d032ec9c9a6533982`。
- `public/_redirects` SHA-256：
  `ba08ae41c47462c629c4640b14e940bcf2c22e823fe47a0486e29b4a18af37eb`。
- `src/data/publication-manifest.ts` SHA-256：
  `af30714bef76d480a163025dfb0e8713543ece88b56f4ef50210537a2d24b7dc`。
- T23 的仓库合法配置入口存在：部署脚本安装受管 snippet，vhost 模板包含它，
  README 记录安装步骤；但生产安装与效果均未观察。GSC、反链、生产 HTTP 与
  Owner 授权仍缺失、未观察或待定，因此 `newRedirectAuthorization: none`，
  不得恢复、删除或迁移 URL。

## 风险与所有者决定

- 375×812、390×844、768×1024、1440×900 本地预览矩阵已完成；它不是
  production、非 Chromium、实体移动设备或完整辅助技术证据。
- M3 中中文导出、打印和 ICS 下载控件已渲染且键盘可达，但三项动作没有再次
  执行；强制不兼容保存 schema、blocked Clipboard fallback、冷启动新标签页
  device restore、screen reader 超出 DOM/ARIA/focus 的行为也均 `not_tested`。
  中文指南成功复制的 CUA 观察及 blocked 路径的编译交互断言不改变这条浏览器
  `not_tested` 边界。
- T19 仍为 `partial`。真实日历客户端导入、设备提醒、邮件与通知投递保持
  `blocked/not_tested`，不能从 M2-B 的 ICS 字节与打印证据推断客户端结果。
- 生产 HTTP、redirect、header、canonical、sitemap fetch、CDN 与 live index
  均为 `not_observed` / `not_tested`。
- 仓库合法重定向配置入口存在，但生产安装、active configuration 与 effect
  未观察；GSC、反链和可定位 Owner 决定仍缺失或待定。T23 只能交付映射，
  不能执行迁移。
- `VL-PMAP-20260911-06` 精确 87 路径冻结、188 文件 watched-scope、Archify
  原子交付、自动浏览器检查和图像感知检查已记录，并收到同一 Independent
  Auditor round-3 `PASS`。Post-PASS 状态 successor `VL-PMAP-20260911-07`
  的精确冻结、原子交付和视觉收据已记录；最终同一 Auditor 绑定与其后的最终
  串行测试/build/governance/diff check 仍为 `pending`；当前
  launch-check 正确保持 59 PASS / 0 FAIL / 1 BLOCKED。
- 所有者仍需审阅中文范围、发现/信任文案、索引矩阵和 T23 建议，并在独立审计
  PASS 后另行决定是否 commit、push、部署或发布。
- 本地候选保持未提交、未推送、未部署、未发布。外部 Vault 未写入；正式同步
  必须使用实际可访问的模板和目标目录，且继续保持人工审核状态，直到所有者亲自
  作出决定。
