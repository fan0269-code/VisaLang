# W06｜报名、考点与预算

```text
你负责 VisaLang W06，只实施本文划定的子模块。

主项目：/Users/a1-6/Documents/2.codex/1.visalang.org
本次任务边界：LC06；修复实际报名与预算缺口，建立付款前记录和失败恢复。

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
W01 或现有检查已发现报名缺口；对应 LC05 任务和具体当地来源可用。没有缺口则核对合格资产并记录无变更。不能默认中文读者在北京，不能把一个考点条件推广到全部地区。

具体可写范围：
- src/content/guides/goethe-a1-test-centers.md
- src/content/guides/goethe-a1-fees-by-country.md
- src/content/guides/goethe-a1-pre-booking-checklist.md
- src/content/guides/goethe-a1-booking-mistakes.md
- src/pages/zh/guides/goethe-a1-test-centers.astro
- src/pages/zh/guides/goethe-a1-booking-mistakes.astro
- src/components/LocalExamFeeTable.astro（仅任务所需）
- W00 分配的共享记录：src/data/claim-registry.ts、src/data/zh-germany-a1.ts、src/data/zh-guide-task-reconciliation.ts
- tests/m2a-local-fees-centres.test.mjs、tests/m2a-staged-checklist-content.test.mjs、tests/task-5-source-ledger.test.mjs、tests/retained-routes.test.mjs
- docs/module-handoffs/<batchId>/W06/

执行步骤：
[ ] 对每处缺口确定读者地区、准确产品与考点，保持已有有用资产和原网址。
[ ] 实际阅读官方主办方及选定官方/授权考点材料，记录核验日、定位和范围。当地报价、取消/改期、证件与交付规则只由对应当地证据支持。
[ ] 制作付款前产品/姓名/考点/报价/取消规则记录，分开已确认值和待问值，标明报价币种与适用时间。不进行自动汇率换算或捏造全球统一价格。
[ ] 将报名、考日、递交三类材料分开，避免付款前清单被读者当完整移民材料表。
[ ] 提供报名错误恢复顺序：保存状态证据→联系正确考点/支付渠道→确认结果；不得承诺付款成功、可退款、补位或资格已获确认。
[ ] 来源不可取得或已过期时保留明确待核验动作，不仅刷新日期。
[ ] 检查中英文下一步、手机表格/键盘与相关旧URL；保留支持页 noindex、无广告等既有发布边界。

检查命令（副本内）：
npm run build
node tests/m2a-local-fees-centres.test.mjs
node tests/m2a-staged-checklist-content.test.mjs
node tests/task-5-source-ledger.test.mjs
node tests/retained-routes.test.mjs
按真正修改范围运行，记录本构建与截图；不因测试记着旧费用而未读来源便改数字。

模块专有输出：
booking-gap-list.md、centre-source-ledger.md、prepayment-record.md、recovery-order.md；列地区/考点/币种/核验日与所有未知条件。任何账户、预订、付款、联系考点均不在本提示词授权内。

交接与完成定义：
- 在副本 docs/module-handoffs/<batchId>/W06/ 按 COMMON.md 输出 handoff.json、README.md、candidate.patch、候选逐文件哈希、新增文件和真实测试/来源/截图等证据。只包含本模块相对分配基线的差异，不能把旧 dirty 改动夹带为自己的结果。
- handoff.json 必须填真实 batchId/moduleId/baselineId、changedFiles 的 baseSha256/candidateSha256/changeKind、tests 的实际 command/exitCode/logPath/候选 baselineId、dependencies、sharedFileChanges、limitations、nextActions；未运行检查填 null 和原因。
- 只使用 ready_for_integration、partial、blocked 状态。局部产物可完成而 LP/LC 总包仍未完成；不得自称独立审计 PASS、用户收益已证明或维护窗口已关闭。
- W00 最终统一同步 Master/overlay/执行记录/内容地图/README/TASK_LOG、规划图/history/sync、Vault，完成 Archify 自动及视觉验证、独立 Auditor 和全量 npm test/必要 launch-check。模块交接不豁免这些治理；副本中旧 sync 失效时注明待整合，不修改或绕过治理测试。
- 最后简述成果、实际检查、未完成证据、共享变更及 W00 下一步。不启动其他模块。
```

