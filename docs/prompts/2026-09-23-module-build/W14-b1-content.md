# W14｜条件式 B1 内容深化

```text
你负责 VisaLang W14，只实施本文划定的子模块。

主项目：/Users/a1-6/Documents/2.codex/1.visalang.org
本次任务边界：LC09–LC11；既有纠错与来源维护持续，深化按 B1 独立需求逐层启动，每批最多一个任务。

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
既有明确错误与到期来源可先维护；新增/深化必须有 B1 自身可追溯问题或搜索线索、现有缺口、完整来源与维护预算/角色。A1完成、模型识别B1、到了某周都不是触发证据。LC10须LC09选定任务确需比较/准备资产；LC11另须对应产品事实、实际学习问题和语言复核能力。前置不满足只交盘点/缺口记录，不能一次全开三包。

具体可写范围（仅 W00 分配的本批任务）：
LC09：
- src/pages/germany-b1-settlement-citizenship.astro
- src/components/B1RoutePaths.astro
- src/data/b1-route-claims.ts、src/data/b1-route-paths.ts
- src/content/guides/goethe-b1-germany-settlement-work.md
- src/content/guides/germany-b1-citizenship-language-proof.md
- src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md
LC10：
- src/data/b1-exam-products.ts
- src/content/guides/goethe-b1-vs-telc-b1.md
- src/content/guides/goethe-b1-fees-and-booking.md
- src/content/guides/germany-b1-settlement-citizenship-timeline.md
- src/content/guides/germany-b1-settlement-citizenship-checklist.md
LC11：
- src/content/guides/goethe-b1-study-plan.md
- src/content/guides/goethe-b1-writing-assessment.md
- src/content/guides/goethe-b1-speaking-topics.md
- src/content/guides/goethe-b1-mock-exam-routine.md
必要共享文件只能由 W00 明确分配后最小改动：
- src/data/claim-registry.ts、src/data/route-tools.ts、src/data/tool-copy.ts
- src/pages/tools/exam-comparison.astro、src/pages/zh/tools/exam-comparison.astro、src/components/ExamProductComparisonTable.astro
测试：
- tests/m4-b1-routes.test.mjs、tests/fan-43-germany-b1-recheck.test.js、tests/germany-b1-cluster.test.js
- tests/m4-b1-comparison.test.mjs、tests/m2b-exam-comparison.test.mjs
- tests/m4-study-assets.test.mjs、tests/retained-routes.test.mjs
记录：docs/module-handoffs/<batchId>/W14/

执行步骤：
[ ] 按LC09/10/11分别登记实际启动证据、维护或深化性质、缺口、投入上限与停止条件，选一个任务。
[ ] 来源维护实际读取正确层级官方资料，记录URL/核验日/定位/责任机关/支持边界/使用位置，不把旧M4核验日刷新为本次实测。
[ ] 若做LC09：保持四分支及未知分支，语言证明、知识要求、其他条件分开；交付有权机关问询记录，不从“B1”一词推永居或入籍程序。
[ ] 若做LC10：仅补选定任务所需准确产品差异、本地报价/退改/文书交付工作表或材料版本；未知当地/个案条件保留核验，不把B1导入A1清单。
[ ] 若做LC11：从真实弱项选一组初稿→修改理由→迁移练习→自查→复测；记录语言复核身份与限制，不扩成自动作文评分或假装官方评判。
[ ] B1继续verify-only，不创建B1完整Finder/Checklist规则、中文B1 hub、新国家或新路由；共享双语比较实现不能被复制或破坏。
[ ] 保留合格既有资产、原网址及支持页noindex/ad-free政策，做对应移动/键盘/工作表填写/打印检查。

检查命令（副本内先构建，再仅运行所选层及跨模块回归）：
npm run build
node tests/m4-b1-routes.test.mjs
node tests/fan-43-germany-b1-recheck.test.js
node tests/germany-b1-cluster.test.js
node tests/m4-b1-comparison.test.mjs
node tests/m2b-exam-comparison.test.mjs
node tests/m4-study-assets.test.mjs
node tests/retained-routes.test.mjs
未触及的层无需重复全跑；真实来源变化引起测试旧日期断言需按证据更新，不能移除边界保护。全量集成验证由W00承担。

模块专有输出：
b1-demand-and-gates.md、selected-task-and-sources.md、所选任务可填资产、actual-review.md；分别写LC09/10/11的实际状态，未知需求不是“没有需求”，不能用本模块一项通过宣称B1全套完成。

交接与完成定义：
- 在副本 docs/module-handoffs/<batchId>/W14/ 按 COMMON.md 输出 handoff.json、README.md、candidate.patch、候选逐文件哈希、新增文件和真实测试/来源/截图等证据。只包含本模块相对分配基线的差异，不能把旧 dirty 改动夹带为自己的结果。
- handoff.json 必须填真实 batchId/moduleId/baselineId、changedFiles 的 baseSha256/candidateSha256/changeKind、tests 的实际 command/exitCode/logPath/候选 baselineId、dependencies、sharedFileChanges、limitations、nextActions；未运行检查填 null 和原因。
- 只使用 ready_for_integration、partial、blocked 状态。局部产物可完成而 LP/LC 总包仍未完成；不得自称独立审计 PASS、用户收益已证明或维护窗口已关闭。
- W00 最终统一同步 Master/overlay/执行记录/内容地图/README/TASK_LOG、规划图/history/sync、Vault，完成 Archify 自动及视觉验证、独立 Auditor 和全量 npm test/必要 launch-check。模块交接不豁免这些治理；副本中旧 sync 失效时注明待整合，不修改或绕过治理测试。
- 最后简述成果、实际检查、未完成证据、共享变更及 W00 下一步。不启动其他模块。
```

