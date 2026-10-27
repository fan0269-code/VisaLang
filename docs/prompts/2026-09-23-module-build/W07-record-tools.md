# W07｜材料、时间与保存记录

```text
你负责 VisaLang W07，只实施本文划定的子模块。

主项目：/Users/a1-6/Documents/2.codex/1.visalang.org
本次任务边界：LC07；修复材料、时间、保存和下载的具体任务缺口，不新增邮件服务或跨设备账户。

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
W01 或现有检查发现相关缺口，LC04/LC06对应任务和既有日期契约可用。未取得前置证据先盘点；已合格资产复用，不自动重做三个工具。

具体可写范围：
- src/content/guides/german-a1-documents-checklist.md
- src/content/guides/german-a1-exam-booking-timeline.md
- src/pages/zh/guides/german-a1-documents-checklist.astro
- src/pages/zh/guides/german-a1-exam-booking-timeline.astro
- src/pages/tools/checklist-generator.astro、src/pages/tools/timeline-calculator.astro、src/pages/tools/email-reminders.astro
- 对应 src/pages/zh/tools/checklist-generator.astro、timeline-calculator.astro、email-reminders.astro（仅 locale 包装必要修改）
- src/data/checklist-export.ts、src/data/reminder-ics.ts
- W00 分配的共享记录：src/data/plan-state.ts、src/data/route-tools.ts、src/data/tool-copy.ts、src/data/zh-germany-a1.ts、src/data/zh-guide-task-reconciliation.ts
- tests/m2a-timeline-contract.test.mjs、tests/m2a-plan-state.test.mjs、tests/m2a-plan-state-integration.test.mjs、tests/m2b-checklist-export.test.mjs、tests/m2b-timeline-result.test.mjs、tests/m2b-reminder-ics.test.mjs、tests/t28-stale-results.test.mjs、tests/m3-chinese-tool-contract.test.mjs
- docs/module-handoffs/<batchId>/W07/

执行步骤：
[ ] 先列实际任务失败、受影响语言、状态与可重复步骤，确认修改最小范围。
[ ] 形成报名/考日/递交三类材料表及完成证据，保留负责机关、来源与边界；不将清单当官方受理结论。
[ ] 时间记录区分用户已确认值、编辑建议缓冲和未知假设；不从 Laya 文本自动提取日期，不捏造考试/出分/受理时间。
[ ] 修复可复制/打印/下载的下一步记录，保留事实版本及对应核验动作。保存动作不代表实际报名或申请已完成。
[ ] 验证跨工具状态、清空/恢复/过期、无效日期、更换路线/考试后的旧结果保护；原始目的自由文本不能进入 URL、持久计划或遥测。
[ ] EN/ZH 工具共用原实现，保持每设备保留期与隐私选择契约；不新建数据库、账号、邮件发送或跨设备同步。
[ ] ICS 下载与实际日历导入分开记录。没有具体获准的一次性日历目的地，不写真实日历；可完成文件验证，导入未测必须保留 T19 部分状态，不宣称导入通过。
[ ] 浏览器验证移动/键盘、打印及下载文件内容，记录候选版本和每个已完成/未完成场景。

检查命令（副本内）：
npm run build
node tests/m2a-timeline-contract.test.mjs
node tests/m2a-plan-state.test.mjs
node tests/m2a-plan-state-integration.test.mjs
node tests/m2b-checklist-export.test.mjs
node tests/m2b-timeline-result.test.mjs
node tests/m2b-reminder-ics.test.mjs
node tests/t28-stale-results.test.mjs
node tests/m3-chinese-tool-contract.test.mjs
只依据实际涉及的契约选择聚焦检查，保留原始日志；在记录中明确下载测试不覆盖外部日历导入。

模块专有输出：
record-tool-gap-list.md、materials-and-assumptions.md、state-and-export-checks.md、calendar-import-status.md、真实TXT/ICS/PDF与截图证据。包含对 LC04/06 版本的依赖以及所有共享数据接口变化。

交接与完成定义：
- 在副本 docs/module-handoffs/<batchId>/W07/ 按 COMMON.md 输出 handoff.json、README.md、candidate.patch、候选逐文件哈希、新增文件和真实测试/来源/截图等证据。只包含本模块相对分配基线的差异，不能把旧 dirty 改动夹带为自己的结果。
- handoff.json 必须填真实 batchId/moduleId/baselineId、changedFiles 的 baseSha256/candidateSha256/changeKind、tests 的实际 command/exitCode/logPath/候选 baselineId、dependencies、sharedFileChanges、limitations、nextActions；未运行检查填 null 和原因。
- 只使用 ready_for_integration、partial、blocked 状态。局部产物可完成而 LP/LC 总包仍未完成；不得自称独立审计 PASS、用户收益已证明或维护窗口已关闭。
- W00 最终统一同步 Master/overlay/执行记录/内容地图/README/TASK_LOG、规划图/history/sync、Vault，完成 Archify 自动及视觉验证、独立 Auditor 和全量 npm test/必要 launch-check。模块交接不豁免这些治理；副本中旧 sync 失效时注明待整合，不修改或绕过治理测试。
- 最后简述成果、实际检查、未完成证据、共享变更及 W00 下一步。不启动其他模块。
```

