# VisaLang 当前内容盘点证据

日期：2026-09-24。范围：当前本地工作树。机器清单见 [content-inventory.json](content-inventory.json)。这是受托内容盘点与建议，不是 VisaLang Independent Auditor 的审核报告，不授予独立审核 PASS，也不证明线上或账户状态。

## 结论与去重口径

低价值内容的主要本地风险收缩、核心支柱深化已有实现，不能宣布全站整改完成。`noindex` 是发布限制；`sourceReviewStatus: reviewed` 是来源复核记录；两者都不能代替独有用户任务、可用产物、真人验证或 AdSense 账户结果。

清单以带语言的 `routePath` 去重：53 EN + 8 ZH = **61 个指南路由**，对应 53 个不同 slug 名称。17 个恢复支持网址已经包含在其中，不另加一次。分类页、工具页、专题 Hub、商业页不计入这个指南分母。下列数量不是建站百分比、AdSense 达标率或实际线上索引数。

| 资产组 | 路由数量 | 当前发布政策 | 本轮建议 |
|---|---:|---|---|
| 英文支柱 | 15 | index/sitemap；其中 14 个广告 eligible | maintain：保留合格资产，维护来源与任务结果 |
| 中文支柱 | 5 | index/sitemap；无广告 | maintain：维护双语、地区和任务一致性 |
| 英文其他参考页 | 24 | pending；noindex、无广告、不进 sitemap | task-review：逐页核对独有任务与可带走结果 |
| 恢复英文支持页 | 14 | retained；noindex、无广告、不进 sitemap | task-review：核对与支柱分工，不擅自再合并或升索引 |
| 恢复中文支持页 | 3 | retained；noindex、无广告、不进 sitemap | task-review：核对中文独立任务和恢复路径 |
| 合计 | 61 | 20 index eligible；41 noindex；14 ad eligible | 20 maintain；41 task-review |

主题归属：A1 25 个路由（17 EN + 8 ZH），B1 13 个 EN 路由，其他 23 个 EN 路由。EN 的 24 pending = 15 个其他国家参考页 + C07 已有证书页 1 个 + telc 4 个 + TestDaF 4 个。

53 个 EN 的内容状态为 7 `complete-route`、22 `core-route`、8 `starter-overview`、16 `verification-pending`；8 个 ZH 为 5 `complete-route`、3 `core-route`。61 个指南的来源状态均记录为 `reviewed`。这些是当前字段值，不是本轮重新打开官方来源后作出的事实认证。

## 方法与精确证据

1. 逐个读取 `src/content/guides/*.md` 的 slug、category、contentStatus、sourceReviewStatus、sourceReviewedAt、updatedDate、noindex、adsEligible、primaryOfficialAuthorityUrl 标量。共 53 个文件；必需盘点字段均非空。
2. 导入 `src/data/zh-germany-a1.ts` 的 `zhGermanyA1Guides`，取得 8 个中文条目，并确认各自 `src/pages/zh/guides/<slug>.astro` 存在。中文 metadata 与页面源文件分开记录。
3. 调用实际 `resolveGuideContentStatus` 与 EN/ZH publication-policy 函数，不凭名单猜测输出。中文存储的 disposition 与计算结果逐项一致。JSON 逐项记录原始和解析后的 contentStatus、来源状态、policy、归属、建议、源路径和 SHA-256。
4. 断言 53 EN、8 ZH、61 个不重复 routePath、20 个 index eligible、17 个 retained。JSON 的 summary 保留所有分母和主题/状态/政策分组。
5. 导入实际 claims、products、fees、routeRegistry、exam directory，记录能力边界。JSON 的 sourceDependencies 绑定本次使用的规则/数据源字节；后续源文件变化应重新生成盘点。

关键定位：

| 证据 | 支持的判断 | 不支持的判断 |
|---|---|---|
| `src/data/publication-manifest.ts:27`、`:45`、`:119`、`:128` | 15 EN / 5 ZH 白名单与实际源策略；成熟度、来源或显式 noindex 未过关时关闭 | 公网已经部署、搜索引擎已按该策略更新 |
| `src/data/publication-manifest.ts:68`、`:89`、`:137` | 历史候选不是 active redirect；当前 guideRedirects 为 0；12 分类关闭索引/广告 | 17 个历史网址已重定向 |
| `public/_redirects:15` | Finland 比较页 slash 与 `.html` 路由的本地 301 配置仍在 | 生产 301 已观察成功 |
| `src/layouts/BaseLayout.astro:40`、`src/pages/404.astro:5`、`src/components/products/CommercialPageShell.astro:17` | 广告默认关闭，404/商业壳明确关闭并 noindex | 账户配置或实际广告运行时已验收 |
| `src/data/route-tools.ts:226` | 5 个注册 route options 中仅德国配偶团聚 A1 为 configured | 全站已配置 5 条完整申请工具流程 |
| `src/data/app-data.ts:69`、`:80` | 31 考试目录记录包含 4 configured、27 reference-only | 31 个考试均有完整比较/工具支持 |
| `src/data/claim-registry.ts:233` 及其 B1 imports | 24 个 versioned claims 全部记录 verified；4 个精确考试产品、4 条当地费用记录 | 未录入 registry 的全文事实均完成同等版本化 |
| `src/content/guides/goethe-a1-germany-family-reunion.md:16`、`:57` | C07 同时 reviewed/pending，已有证书核验记录；不能只为减少 pending 改状态 | C07 内容有已证实的事实错误或已批准索引 |
| `src/pages/about.astro:33` | 站内仍披露 38 个额外 EN 研究页尚需核对独有任务 | 所有 38 页已被认定无价值 |

24 条 registry claims 截至 2026-09-24 没有登记的 `nextReviewAt` 已到期；最早日期为 2026-10-09，对应两条 A1 费用 claims 及四条费用记录。它表示台账复查计划，不保证来源在该日之前不变；本轮没有把来源核验日刷新为今天。

## 与早期低价值问题的对照

- 旧的广告默认开启、404/建设中商业页具备广告加载条件，已有明确本地关闭实现；12 个分类页和 41 个非支柱指南受到发布限制。
- `docs/ADSENSE_SITEWIDE_CONTENT_AUDIT_2026-07-27.md` 的 54 EN 基线不等于现在；Finland 一篇重复比较页已合并，所以当前为 53 EN。
- 17 个历史候选在后续恢复为支持页。当前按 14 EN + 3 ZH 保留原 URL，source/publication tests 锁定保留政策；不能沿用旧的“17重定向已完成”结论。
- 24 个参考页不代表从未改写。国家集群已有职责与用户任务拆分记录，telc 内容已经补来源和正文，仍保持既有受限状态。应核验剩余缺口，而不是重复重写所有内容。
- 用现有英语内容质量测试的 URL/HTML 标签移除及 Unicode 词匹配方法重新统计：15 支柱为 1,251–2,278 词，14 恢复支持页为 336–377 词，其他 24 页为 261–1,309 词。当前 Markdown 已无早期 `<150` 词极薄页，但字数仅为诊断线索，不是价值、索引或广告审批阈值。中文不套用该英文计词方法。

## 下一阶段优先内容任务

执行编号沿用 [2026-09-23 内容规划](../superpowers/plans/2026-09-23-visalang-laya-content-plan.md:46)，不创建另一套竞争里程碑。现有合格资产先核对，只有发现具体缺口才修改。

| 优先级 | 范围与现有包 | 本次建议的可验收结果 |
|---|---|---|
| P0 | 首页/中文首页/Routes/Tools；LC01、W03 | 清楚区分完整准备流程、内容专题、官方参考，入口能力与 registry 一致 |
| P0 | A1要求与C07已有证书 EN/ZH；LC04、W04 | 主管机关问询记录、证书核验卡、可保存下一步；先证明任务结果，再提出C07状态决定 |
| P1 | A1精确考试比较及报名/费用；LC05/06、W05/06 | 付款前产品/姓名/考点/报价/取消规则记录；当地未知项保留明确核验动作 |
| P1 | 材料、时间、保存恢复；LC07、W07 | 三类材料与事实/假设表、可复制行动记录；下载与真实日历导入分别验收 |
| P1 | 17恢复支持页及其余24参考页；LC12、W17 | 每页任务分工/来源/产物/下一步核对；决定维护、补一个任务或暂缓，不自动升索引/删除 |
| 条件式 | A1训练；LC08、W13 | 基于实际学习问题选一个任务，复用已有资产，形成诊断→训练→自查→陌生任务复测 |
| 条件式 | B1专题与训练；LC09–11、W14 | 按B1独立需求深化一个任务，不能由A1进度自然推定全部B1扩展 |
| 暂缓自动扩张 | 新国家完整流程、中文全量翻译、新索引页；LC12 | 先有需求、权威来源、独有产物、维护能力和适用授权 |

### 小范围质量治理改进

- `tests/scheme-3-english-content-quality.test.mjs:31` 仍把每支柱 1,200–2,400 词作为硬断言。后续应在可审范围内评估历史字数门槛，补充任务结果、来源覆盖、边界和下一步可达性验证；本轮未更改标准，也不建议通过扩字数制造进度。
- `tests/retained-routes.test.mjs:5` 起主要证明原 URL 和发布政策，不能证明17页的独有价值。内容深化窗口须有相应任务验收。
- `tests/scheme-3-publication.test.mjs:106` 的断言是 active redirects `length=0`，说明文字却仍写“17 permanent guide redirects”。这是测试说明的历史文案漂移，可由后续小修纠正；本轮未修改它。

## 本轮实际验证

以下5个只读针对性命令均于本轮 2026-09-24 执行，退出码均为 0。原始输出未另存文件，下表如实摘录终端成功信息；未将其表述为全量测试或独立审计。

| 命令 | 实际结果 |
|---|---|
| `node tests/scheme-3-publication.test.mjs` | `scheme 3 publication manifest rules passed` |
| `node tests/retained-routes.test.mjs` | `17 retained historical routes pass source/publication checks`；未传 `--built`，只验证源码/政策 |
| `node tests/scheme-3-english-content-quality.test.mjs` | `scheme 3 English content depth, uniqueness, and source-ledger rules passed` |
| `node tests/content-integrity.test.js` | `guide sources, related links, compliance, app data, legacy handoff, and deployment checks passed`；这是该源码断言套件的输出，不证明部署发生 |
| `node tests/claim-registry.test.mjs` | `claim registry contracts passed` |

部分 Node 命令输出 `MODULE_TYPELESS_PACKAGE_JSON` 警告后正常退出，不是失败。该警告未在本只读内容任务中修复。

## 限制与交接边界

本轮只按当前文件生成清单，并做本地事实结构、发布策略和内容合同核对。没有本轮官方网页重新核验、外部查重、真人任务研究、生产 HTTP 验证、GSC/AdSense/CMP 账户核对，也没有提交、推送、部署、购买或发送外部消息。来源状态、台账日期和历史审核不能补足这些证据。

独立审计由主维护窗口另行提交；本文不自发 PASS。所有 `maintain`/`task-review` 为建议，现行 index、ads、retained、route support、人工/Owner 门槛保持。根代理还需完成该维护窗口的规划图、同步记录、全量验证、Vault实际路径处理和独立审核要求。
