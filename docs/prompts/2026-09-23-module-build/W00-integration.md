# W00：调度、隔离副本与集成收口

复制下面整个代码块到对应窗口；先满足启动条件。

```text
项目主目录：/Users/a1-6/Documents/2.codex/1.visalang.org。
先读 AGENTS.md、docs/prompts/2026-09-23-module-build/COMMON.md、docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md，以及同目录 2026-09-23-visalang-laya-overall-plan.md、2026-09-23-visalang-laya-content-plan.md；核对最新 Master、overlay、执行记录和规划图。以下是本窗口唯一任务，遵守共同约定，不自行启动别的模块。
你是 W00 集成窗口，是主目录唯一实施写入者。执行当前 Owner 选中的模块批次；本提示词授权本地分配、集成和验证，不代表其余窗口已被派发，也不授权提交/推送/部署。
输入：最新 dirty 工作树、规划/提示词、Owner 已选择模块、后续各模块 handoff。输出：冻结基线、dispatch.json、串行集成记录、整体候选与真实治理结果。

[ ] 先冻结 branch/HEAD/upstream/ahead-behind、staged/dirty/untracked 及逐文件字节；保护既有变更。按 COMMON 创建当前完整工作树快照与每窗口隔离候选，分配独立构建/依赖目录。不要直接从 HEAD worktree 开工。校验每副本和源基线相等；把省略、缺失输入、删项记录清楚。
[ ] 在 docs/module-handoffs/<batchId>/dispatch.json 写实际 batchId/baselineId/各workspacePath/文件范围/证据依赖。优先准备 W01、W02、W08；W03/W04可另批根据产能启动。向用户返回可直接给每窗口的分配路径和对应提示词；只有用户明确要你创建任务时才调用新任务工具。
[ ] 阶段门禁逐项读取实际 handoff：W01无真人仍partial；W02无需W01通过；W10无真人收益未知时不能继续W11/12；W09消费已集成W08开关；W13/14看独立需求；W16三类候选分别核对；W17的线上观察从真实发布起算。不能把日历进度作为开工证据。
[ ] 收模块成果先验baselineId及各文件base/candidate哈希、测试对应候选、允许范围和隐私。只集成本批选定范围；partial中哪些本地部分可合并需逐项说明，保持其LP未通过。共享claim/route/tool/开关/布局的冲突逐段对照合并，不能覆盖别人修改；接口改变时重验已受影响模块，不盲拷整文件。
[ ] 每批集成后运行相关聚焦测试。页面/导航/元数据/部署面对的变更必须 npm run launch-check，并保留实际输出；随后执行完整 npm test。若 suite 包含当前审核报告门禁，先运行可执行部分并明确缺报告，再在独审报告后跑最终完整suite，不能伪造预审通过。
[ ] 统一维护必要的 Master 当前增补、BACKLOG_STATUS_OVERLAY、EXECUTION_RECORD、CONTENT_MAP、README、TASK_LOG；仅真实完成的验收改变状态，不按窗口交付数改T25/5/4。新实施计划放 docs/superpowers/plans，新提示词放 docs/prompts。证据放本批目录，历史只追加不覆写。
[ ] 每批作为一个完整维护窗口执行 docs/planning-map/README.md：冻结精确候选manifest和分类；新唯一sync ID/history链；全watchRoots/authority摘要；按变化修改JSON节点/边或状态卡；用Archify九项showcase校验及原子deliver生成HTML；四尺寸浏览器、四张明暗截图逐张图像复核并字节绑定；选择有依据的drift结果。不能手改HTML或关闭治理测试。
[ ] 按指定模板同步Obsidian；目录或模板缺失时写本地待同步payload，status:review、needs_human_review:true、owner_decision:pending、deployment_status:not_started，如实blocked，不向不存在Vault假写成功。
[ ] 把完整冻结scope、候选/图/图像/测试/来源及sync字节交W18或完全独立的新Auditor。P0–P2修复后同一Auditor复审；修复影响字节则重做相关冻结及证据。PASS后运行规划治理和最终npm test；不由自己给PASS。
[ ] 最终给用户实际完成、仍partial/blocked、下一批最多三项与条件。冻结后的任何变更都会使相应审核失效；不得把文档、图或审计通过当真实发布/账户授权。

主目录范围：本批经dispatch明列的候选文件、上述治理文件与实际证据；未列文件保持原样。任何外部操作留在明确授权边界内。无授权时继续本地可完成工作，不为了收口把缺少的真人、主机、账号、日历证据填成功。
```
