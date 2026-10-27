# VisaLang 多窗口模块建设 Implementation Plan

> **For agentic workers:** 执行方式已由Owner指定为不同窗口分工。窗口内可按需使用 superpowers:subagent-driven-development 或 superpowers:executing-plans 逐项执行，不自动创建用户任务。按复选步骤工作；本轮只交付提示词，不启动功能建设。

**Goal:** 将已批准的A1读者任务与Laya初验并行规划，转换成可独立派发、可验证、可串行集成的功能模块提示词。

**Architecture:** 17个功能窗口在W00分配的当前工作树独立快照中工作，交付带基准与候选哈希的补丁/证据；W00在主目录串行集成并完成治理，W18独立审核。窗口划分不改变现有产品架构或LP/LC门槛。

**Tech Stack:** 当前Astro/TypeScript静态站、Markdown内容、Node断言、既有Python Laya服务、Archify规划图。

**Spec:** [全站规划](2026-09-23-visalang-laya-overall-plan.md)；[内容规划](2026-09-23-visalang-laya-content-plan.md)；[提示词入口](../../prompts/2026-09-23-module-build/README.md)。Owner当前要求“按照规划、规划图，切分每个功能模块，写提示词，分别给不同窗口完成子模块建设”。本轮授权为提示词/规划同步；未来发到窗口的具体任务才按其边界执行。

## Global Constraints

- 德国A1优先；现有EN/ZH、原网址、月服务器预算≤100元（域名除外）；不自动扩大索引、14页EN广告白名单或已配置路线。
- LP00与LP01a并行；LP01b汇总真实读者和初验后才决定更大投入；核心不等待模型/广告；LP04自己的真人与LP05a目标环境条件保留。
- 全站规划第5节质量/容量完整协议不变；B1与学习深化独立需求驱动；旧任务25完成/5进行中/4待开始不因提示词交付改变。
- 不自动commit/push/部署/购买/账户变更/招募联系。用户已有明确授权不重复索取；未授权外部动作保留待办。
- 共同规则和交接字段完整定义在 [COMMON.md](../../prompts/2026-09-23-module-build/COMMON.md)，每个窗口必须读取；主目录唯一写入者W00，审核者独立只读。

## Review Focus

- 当前dirty成果遗漏：W00从工作树冻结而非HEAD，逐文件校验副本；验收snapshot与基线哈希一致。
- 共享事实/中英文工具互相覆盖：W00串行合并base/candidate补丁，W03–07及W11交接口差异；对冲突涉及任务重跑契约。
- 初验被当生产或真人证据：W02分开旧/新样本，W10真人缺失必须证据不足，W11/12继承完整门槛。
- 关闭模型/广告仅隐藏UI：W08实际检查构建、请求、健康探针与回滚，W09/16消费同一版本契约，不造第二套开关。
- 文档/代码通过误记为业务完成：W01/15保留真人缺口、W12保留Linux缺口、W16分支验收、W17只用真实上线时间和可得数据。

## 文件与窗口契约

本计划只创建docs/prompts中的可重复执行指令，不修改产品API或数据类型。未来模块允许文件是最小候选范围，不是全量改写要求。W08若需新开关模块，先冻结接口由W00分配给依赖者；其他窗口不能预设尚未实现的API。现有共享route/tool/claim事实应复用，契约变化要列影响并复验。

| 窗口 | 规划包 | 对应图节点 | 输入/启动 | 输出 |
|---|---|---|---|---|
| [W00 集成调度与治理](../../prompts/2026-09-23-module-build/W00-integration.md) | 全体共用治理 | authority_map_sync, drift_gate, automated_evidence | Owner选定批次 | 单写者，先分配隔离副本 |
| [W01 A1真实读者任务](../../prompts/2026-09-23-module-build/W01-reader-validation.md) | LP00 | reader_validation | 可立即准备；真人结果需实际同意读者 | 脚本、观察记录、最多三项问题 |
| [W02 Laya有限初验](../../prompts/2026-09-23-module-build/W02-laya-initial.md) | LP01a；LC02/03最小整理 | reader_validation | 与W01并行，不等真人或手选失败 | 旧回归、新小样本、比较及限制 |
| [W03 首页与能力入口](../../prompts/2026-09-23-module-build/W03-entry-scope.md) | LC01 | a1_core | 可先核查支持范围/已知缺陷 | 三层能力与一致入口 |
| [W04 主管机关与已有证书](../../prompts/2026-09-23-module-build/W04-authority-certificate.md) | LC04 | a1_core | 可先维护来源/已知缺陷 | 机关问询表、证书核验卡、C07判断 |
| [W05 考试选择与对比](../../prompts/2026-09-23-module-build/W05-exam-comparison.md) | LC05 | a1_core | W04对应任务/产品事实＋实际比较缺口 | 准确产品差异与当地待问表 |
| [W06 报名与预算](../../prompts/2026-09-23-module-build/W06-booking.md) | LC06 | a1_core | W05对应任务＋当地来源＋报名缺口 | 付款前记录、分币种预算与恢复 |
| [W07 材料、时间与行动记录](../../prompts/2026-09-23-module-build/W07-record-tools.md) | LC07 | a1_core | W04/W06相关事实＋材料时间保存缺口 | 三类材料、确认/假设、复制与下载 |
| [W08 核心站独立运行与发布适配](../../prompts/2026-09-23-module-build/W08-core-decoupling.md) | LP05a | core_candidate | 本地实现可先行；真实主机另需环境与授权 | 统一功能开关、构建/探针/回滚适配 |
| [W09 广告独立验收](../../prompts/2026-09-23-module-build/W09-ads.md) | LP05b | ads_gate | 已集成W08配置；真实账户证据另核 | 同意/关闭/加载/体验与账户缺口 |
| [W10 Laya继续投入判断](../../prompts/2026-09-23-module-build/W10-laya-decision.md) | LP01b | laya_gate | W01/W02实际证据；缺失可出证据不足 | continue/pause/insufficient_evidence |
| [W11 Laya完整质量及上线资产](../../prompts/2026-09-23-module-build/W11-laya-quality.md) | LP02；LC02/03完整资产 | laya_gate | W10 continue；先冻结完整协议再优化 | 独立评测、有限候选、确认回退与文案 |
| [W12 Laya Linux容量与成本](../../prompts/2026-09-23-module-build/W12-laya-capacity.md) | LP03 | laya_gate | W10 continue；正式验收用W11固定候选 | 真实Linux资源/24h/预算实证 |
| [W13 A1一个训练任务](../../prompts/2026-09-23-module-build/W13-a1-practice.md) | LC08 | operate_expand | 独立学习需求＋复核能力 | 诊断→练习→自查→复测 |
| [W14 B1有限内容深化](../../prompts/2026-09-23-module-build/W14-b1-content.md) | LC09–LC11 | b1_gate | B1独立需求/缺口/来源/维护能力 | 先一个任务；LC10/11逐项有条件 |
| [W15 A1完整任务验收](../../prompts/2026-09-23-module-build/W15-core-journey.md) | LP04 | a1_core | W01真实任务＋W03/04＋W05–07必要缺口已集成 | 英中/移动/键盘/恢复/保存与复验 |
| [W16 分别冻结候选](../../prompts/2026-09-23-module-build/W16-release-candidates.md) | LP06-core/laya/ads | core_candidate, ads_gate, laya_gate, owner_release | 每次选择一个目标，按各自门槛 | 候选身份、证据及待授权项 |
| [W17 反馈与下一周期](../../prompts/2026-09-23-module-build/W17-operations.md) | LP07/LP08；LC12 | operate_expand, b1_gate | 问题台账可先建；线上观察须真实发布 | 实际反馈、来源队列、最多三项下一批 |
| [W18 独立审计](../../prompts/2026-09-23-module-build/W18-independent-auditor.md) | 所有候选的独立审核 | independent_audit | 没有参与本批工作＋W00完整冻结提交 | PASS/FAIL/BLOCKED及精确字节绑定 |

## 派发顺序

- [ ] W00先冻结当前工作树、创建独立候选与dispatch.json，提供每窗口可读的分配记录。
- [ ] 第一批W01、W02、W08并行；研究准备、有限技术初验、核心独立运行适配可以各自推进。W03/04可按产能加入或接续。
- [ ] W05/06/07只处理W01或现有检查确实发现的缺口，依赖的是对应任务事实，不要求相邻模块每个页面都重做。既有合格资产可作为已核对输入，由W00登记证据。
- [ ] W10在两类当前证据可定位后给继续/暂停/证据不足；仅继续才启动W11完整规范/优化，W12正式容量验收用W11固定候选。W09待W08统一关闭/启用契约集成后开展。
- [ ] W15验收核心闭环；W16按core、laya、ads各自前置分别准备候选，不要求三者同批就绪。每个候选都经过W00治理和W18独审，外部启用另有授权。
- [ ] W13/14在各自需求/来源/复核能力具备后选一个任务深化，既有纠错维护继续。W17问题台账可先行；线上观测从各增量实际发布时间分别计算。

## 一个集成维护窗口如何完成

模块提交可审局部成果并不关闭维护窗口。W00完成范围核对、共享文件合并、当前权威与状态记录、唯一规划图sync/history/全部hash、Archify9项与四尺寸/四图视觉、Vault真实记录、独立审核及最终npm test。页面/导航/元数据/部署面对变化还必须launch-check。若缺真人或真实环境，只能交付明确范围的本地成果，LP整体仍partial/pending，不能为了收口改验收定义。

全部19个提示词采用同一交接协议，含依赖、允许路径、具体步骤、测试/证据、不能自动通过的条件。不把治理节点拆成相互修改同一sync的窗口。W18审核范围严格等于当批冻结manifest；任何修复改变字节都需相应证据和复审。

## 本轮提示词交付验收

- [ ] 全部LP/LC可映射到W窗口，19个文件均可单独复制且指向共同规则；所有引用路径实际存在或明确标为拟建。
- [ ] 没有跳过LP00真人、LP01b证据、LP05a实际解耦或独立发布/审核的条件。
- [ ] 本轮仅文档与图状态更新，保持12主节点及全部箭头/必经路径；原实施状态不变。
- [ ] 新sync `VL-PMAP-20260923-04`，独立报告 `docs/planning-map/VISALANG_MODULE_PROMPTS_INDEPENDENT_AUDIT_2026-09-23.md` 是本轮审核权威；脚本与视觉结果按实际证据记录。

Obsidian目录/模板如仍缺失，保留本地待同步记录并明确blocked。本轮不创建或运行上述子模块，不把prompt-ready计为LP/LC完成。
