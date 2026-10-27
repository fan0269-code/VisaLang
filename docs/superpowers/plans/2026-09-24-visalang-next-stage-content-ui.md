# VisaLang 下一阶段内容与UI实施增补

> **For agentic workers:** 沿用W00集成、W01–W17功能模块、W18独立审核。执行可使用superpowers:subagent-driven-development或superpowers:executing-plans，按复选步骤工作。本轮仅交付方案与提示词，实际功能模块尚未启动。

**Goal:** 将当前M5候选的已知任务/UI缺口及独立核心发布能力转为可检验交付，保持A1优先。

**Architecture:** Astro静态内容与确定性工具继续作为核心；可选用途建议支持现有laya/typesafe提供方，与广告分别受开关和发布证据控制。功能模块从当前dirty工作树完整快照开始，W00唯一主目录写入者串行合并，W18独立审核。

**Tech Stack:** 当前锁定的Astro、TypeScript、Markdown、Node assertions及现有Python用途建议服务；本轮不升级框架。

**Spec:** [本轮完整扫描与设计依据](../../PROJECT_SCAN_2026-09-24.md)，以及9/23 overall/content/module-dispatch与9/24 TypeSafe启用增补。本文件是现有LP/LC的执行增补，Master权威顺序和任务状态不变。

## Global Constraints

- 原任务25完成/5进行中/4待开始；不因本方案改成完成。
- 原URL、15EN/5ZH索引白名单、14EN广告资格上限、中文覆盖与预算≤100元/月（域名除外）保持。广告资格不等于必须启用。
- TypeSafe当前只获得过本地接入及一次合成连通调用授权；本批默认不调用付费API、不发送真实用户文字，不读密钥。
- W01/W02初验独立；核心不等待模型/广告，但LP04真人和LP05a环境门槛保留。
- 本地发布候选、独立审核、Owner授权与上线证据分开；禁止自动commit/push/deploy/真实回滚/账户更改/联系用户。
- 每次内容维护都要按AGENTS完成规划图、hash、独审、TASK_LOG和真实Vault状态。

## Review Focus

- dirty旧副本覆盖TypeSafe新实现：P00冻结当前全量工作树并校验base/candidate哈希。
- 关闭可选功能只隐藏UI、发布仍强制服务或广告：P03覆盖core/laya/typesafe × ads矩阵及失败回滚。
- 看懂说明却找不到操作：P01/P02/P04验证390首屏、清单标题、结果下一步与保存路径。
- unknown/已有证书/verify-only被当确定资格：P02/P04保留核验边界与安全出口。
- 技术验证被当真人/生产/搜索表现：每包记录not_tested及缺口，P06按独立条件验收。

## 文件分工与执行包

| 提示词 | 映射 | 主要源码/数据/测试位置 | 交付接口 |
|---|---|---|---|
| P00 | W00 | docs/module-handoffs/新batch、现行计划/提示词/治理 | dispatch.json、baselineId、workspacePath、允许范围、依赖证据 |
| P01 | W03/LC01 | pages/index、zh/index、routes/index、tools/index；HomeHero、RouteSelector、GlobalHeader、MobileNavigation；global.css；task-4-home-routes、m3-discovery-trust | 任务入口与三层能力对照、截图、无索引扩大 |
| P02 | W04/LC04 | A1要求/已有证书EN/ZH、GuideLayout、ZhGuideLayout、article-sections、source-review；fan-42、source-review-render、scheme-3-chinese-page-sections | 机关问询与已有证书核验记录、来源ledger、状态理由 |
| P03 | W08/LP05a | runtime-features（存在则复用）、Astro/BaseLayout/PurposeSuggestion、deploy、launch-check；deploy/tests、laya-purpose、publication | 一个配置契约贯穿UI/请求/打包/探针/回滚，供W09/W16消费 |
| P04 | W07/LC07＋W15/LP04局部验收 | ToolShell、ToolResultSupport、tool-form、plan-state、global.css及受影响tools；m2a/m2b/m3/t28测试 | 结果优先层级、滚动焦点修复、保存/恢复/导出实证 |
| P05 | W17/LC12 | 61指南清单、CONTENT_MAP、publication policy只读；新处置台账；现行来源队列 | 41页逐页处置与最多3项后续深化，不直接扩索引 |
| P06 | W00/W15/W16/W18 | 冻结候选、正式检查、planning-map、TASK_LOG、Vault payload、独立报告 | 明确core候选或缺口；不自动发布 |

## Task 0：当前基线与分配

- [ ] 运行P00；从当前工作树复制而不是HEAD，排除凭据与生成目录；留存删除和排除理由。
- [ ] 冻结P01/P02/P03的独立副本及基准，P01与P02共享样式由W00逐段集成；不共享dist/.astro。
- [ ] 研究准备复用W01，缺真人记录partial；原W02若执行仅Laya离线范围，不混入TypeSafe调用。

## Task 1：首批三项整改

- [ ] P01先保存当前截图/入口表，再改已确认重复与双语入口；保留已有视觉tokens。
- [ ] P02先验证已有表能否完成任务，有缺口再补最小段落/记录；高风险改动先查正确官方来源。
- [ ] P03先冻结统一开关契约和六种模式断言，再实现；不改candidateOnly或真实身份校验绕过发布门禁。
- [ ] 各自输出COMMON规定handoff.json、补丁、base/candidate哈希、测试、截图/来源和未验证项；W00串行合并。

## Task 2：结果与内容台账

- [ ] P04基于已集成输入修改结果顺序与sticky-header偏移，先复现06截图问题，再固定失败路径与回归检查。
- [ ] W05/W06只修对应来源/比较/报价确证缺口，不做全量重写。读取旧提示词与现行COMMON。
- [ ] P05产生完整41页处置表，从“读者任务/独有产物/来源/维护”选四项证据，不以词数或无流量断言删页。
- [ ] W13/W14只在自身需求与复核能力具备后启动一项；不列为核心必做前置。

## Task 3：候选与证据

- [ ] P06在集成后顺序执行全量检查、浏览器矩阵、图同步和独审；修完所有P0/P1/P2并由同一Auditor复审。
- [ ] 真人、日历、真实主机/回滚或生产17旧URL证据不足保留partial，不改原任务为完成。
- [ ] 仅产生待Owner授权的具体core候选；模型/广告分别候选，实际上线后才启动各自24h/day7观察。

## 通过标准与调用顺序

直接复制[提示词目录](../../prompts/2026-09-24-next-stage/README.md)中的完整text块。每包明确允许文件、输入、动作、实际命令及结果；本计划不预写未确定接口或假设新增测试已存在。仅低影响文案排版不新增镜像式测试；路由、行为和必要链接变化加 focused regression。

顺序为P00 →（P01、P02、P03隔离并行）→ 串行集成 → P04/P05及有缺口的W05/W06 → P06。该顺序是推荐批次，沿用原模块“可先维护已知缺陷”的权限，不更改LP00/LP04等验收依赖。先完成局部可审成果，再取得缺失的真实证据。
