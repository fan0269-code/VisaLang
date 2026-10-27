# W05｜A1 考试选择与比较

```text
你负责 VisaLang W05，只实施本文划定的子模块。

主项目：/Users/a1-6/Documents/2.codex/1.visalang.org
本次任务边界：LC05；完善两个准确成人 A1 产品的任务比较，不扩考试品牌或路线支持。

开始前依次阅读主项目中的 AGENTS.md，以及以下文件：
- docs/prompts/2026-09-23-module-build/COMMON.md
- docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md
- docs/superpowers/plans/2026-09-23-visalang-laya-overall-plan.md
- docs/superpowers/plans/2026-09-23-visalang-laya-content-plan.md
- docs/master-package-2026-09-08/VisaLang-Master-Plan.md
- docs/master-package-2026-09-08/BACKLOG_STATUS_OVERLAY_2026-09-09.md
- docs/master-package-2026-09-08/EXECUTION_RECORD.md
必要时只读查看 docs/planning-map/visalang-overall-build-plan.archify.json；HTML 是派生视图，不能替代文字权威。

工作目录规则：
- 先找到 W00 分配的 docs/module-handoffs/<batchId>/dispatch.json，核对本窗口 workspacePath、baselineId、允许路径及依赖证据。只在该独立完整 dirty 快照副本内写入；以下所有相对路径均指副本。
- 禁止写主项目目录，禁止自行从 HEAD 创建 worktree 代替当前完整工作树。没有分配时，只读分析并在系统临时目录准备缺口说明，报告等待分配。
- 核对副本逐文件哈希与基线；独立 node_modules、dist、.astro、环境与日志，不与其他窗口共用可写构建目录。
- 以下列表是模块范围上限，实际可写范围以 W00 分配为准；未分配的共享文件只提交需求。已分配的共享数据可在私有副本做最小修改，交付 base/candidate SHA-256 和补丁，由 W00 串行整合。
- 不改全局治理记录、规划图、history/sync、索引/广告白名单、重定向、package 锁文件或其他窗口文件。不创建提交，不 push、部署、购买、操作账户、自动联系外部人员或写入真实日历。

启动条件：
W01 的实际任务失败或现有检查已确认比较缺口；须有 LC04 对应任务与版本化产品事实。缺少前置时可盘点，不进入无依据重写；已有资产合格可交检查结果，无需正文变更。

具体可写范围：
- src/content/guides/goethe-a1-vs-telc-a1.md
- src/pages/zh/guides/goethe-a1-vs-telc-a1.astro
- src/pages/tools/exam-comparison.astro
- src/pages/zh/tools/exam-comparison.astro（仅 locale 包装确有问题时，不重复实现）
- src/components/ExamProductComparisonTable.astro（仅任务所需）
- W00 分配的共享记录：src/data/claim-registry.ts、src/data/route-tools.ts、src/data/tool-copy.ts、src/data/zh-germany-a1.ts、src/data/zh-guide-task-reconciliation.ts
- tests/m2a-exam-products.test.mjs、tests/m2b-exam-comparison.test.mjs、tests/m4-b1-comparison.test.mjs、tests/m3-chinese-tool-contract.test.mjs
- docs/module-handoffs/<batchId>/W05/

执行步骤：
[ ] 将实际比较缺口与 LC04 权威核验任务及产品版本关联，复用已合格产品事实和表格。
[ ] 实际核验准确成人 A1 产品及相关格式信息；逐列保留各自来源，不以品牌名代替具体产品。
[ ] 交付产品差异卡与当地待问表；先确认受理范围再比较。当地费用、考期、交付或接受未知时仍明确未知，不用笼统说明冒充核实。
[ ] 保持事实/版本过期、缺失、冲突的保护；不让旧产品引用继续生成确定性输出。
[ ] 保持 EN/ZH 同一比较实现和等价事实；共享数据改动给 W00 精确基准/候选哈希补丁。
[ ] 检查原有 B1 比较与不支持路线保护未受回归影响，B1 不得获得 A1 checklist 支持。
[ ] 在自己的构建验证选择、更换产品、未知/不支持、返回及手机窄表格和键盘体验。

检查命令（副本内）：
npm run build
node tests/m2a-exam-products.test.mjs
node tests/m2b-exam-comparison.test.mjs
node tests/m4-b1-comparison.test.mjs
node tests/m3-chinese-tool-contract.test.mjs
只据真实行为调整测试，不以放宽产品范围解决失败。完整发布/索引验证留给 W00。

模块专有输出：
comparison-gap-and-products.md、product-source-ledger.md、local-questions.md、相关实际截图/检查。来源验证通过与个案受理未知分开，不执行报名付款、不承诺考试通过。

交接与完成定义：
- 在副本 docs/module-handoffs/<batchId>/W05/ 按 COMMON.md 输出 handoff.json、README.md、candidate.patch、候选逐文件哈希、新增文件和真实测试/来源/截图等证据。只包含本模块相对分配基线的差异，不能把旧 dirty 改动夹带为自己的结果。
- handoff.json 必须填真实 batchId/moduleId/baselineId、changedFiles 的 baseSha256/candidateSha256/changeKind、tests 的实际 command/exitCode/logPath/候选 baselineId、dependencies、sharedFileChanges、limitations、nextActions；未运行检查填 null 和原因。
- 只使用 ready_for_integration、partial、blocked 状态。局部产物可完成而 LP/LC 总包仍未完成；不得自称独立审计 PASS、用户收益已证明或维护窗口已关闭。
- W00 最终统一同步 Master/overlay/执行记录/内容地图/README/TASK_LOG、规划图/history/sync、Vault，完成 Archify 自动及视觉验证、独立 Auditor 和全量 npm test/必要 launch-check。模块交接不豁免这些治理；副本中旧 sync 失效时注明待整合，不修改或绕过治理测试。
- 最后简述成果、实际检查、未完成证据、共享变更及 W00 下一步。不启动其他模块。
```

