# W13｜条件式 A1 学习训练

```text
你负责 VisaLang W13，只实施本文划定的子模块。

主项目：/Users/a1-6/Documents/2.codex/1.visalang.org
本次任务边界：LC08；由独立学习问题选择一个训练任务，不按周数自动扩展内容。

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
必须有可定位的实际学习问题/需求证据、现有资产无法解决的缺口，以及可承担本次复核的语言能力与人员/代理真实身份。W00 分配需记录这些证据和投入上限。条件不满足时只盘点现有资产、列缺口和所需证据，交 partial；A1准备闭环完成或时间推进不自动证明学习训练需求。

具体可写范围（只选本轮任务对应文件，不默认全改）：
- src/content/guides/goethe-a1-30-day-study-plan.md
- src/content/guides/goethe-a1-study-plan-working-adults.md
- src/content/guides/goethe-a1-listening-practice.md
- src/content/guides/goethe-a1-speaking-topics.md
- src/content/guides/goethe-a1-writing-practice.md
- src/pages/zh/guides/goethe-a1-30-day-study-plan.astro
- W00 分配的必要中文共享记录：src/data/zh-germany-a1.ts、src/data/zh-guide-task-reconciliation.ts
- tests/germany-a1-cluster.test.js、tests/retained-routes.test.mjs、tests/scheme-3-english-content-quality.test.mjs、tests/scheme-3-chinese-page-sections.test.mjs；若新行为确需独立断言，由 W00 分配新测试路径后增加
- docs/module-handoffs/<batchId>/W13/

执行步骤：
[ ] 写清需求来源、实际弱项、已有资产、为何需修改、投入上限与停止条件；优先复用训练材料。
[ ] 本轮只选择一个任务，做诊断→一组训练→自查→复测的闭环；给明确完成标准和证据，不以文章长度衡量交付。
[ ] 在职学习任务才增加真实可填的时间预算、漏学/补学调整；不承诺30天达到通过水平。
[ ] 使用原创或获准使用的材料；考试格式/评分描述需官方一手依据，编辑练习明确不是官方试题。不复制受版权保护试题或伪造官方评分。
[ ] 记录语言复核的实际人员/代理身份、范围与限制，AI复核不冒充真人教师审核；不能证明听力、发音等能力时明确不能评估。
[ ] 仅维护现有中文对应页面，不自动翻译所有英文支持页。现有 noindex/ad-free 支持页不提升发布状态。
[ ] 验证练习可实际填写、复制/打印、自查/复测，移动和键盘可用；不让训练变成保存A1准备记录的前置。

检查命令（副本内，按实际修改选择）：
npm run build
node tests/germany-a1-cluster.test.js
node tests/retained-routes.test.mjs
node tests/scheme-3-english-content-quality.test.mjs
node tests/scheme-3-chinese-page-sections.test.mjs
tests/m4-study-assets.test.mjs 可以只读借鉴任务契约，但它验证B1，不能充当新增A1训练已验证证据。必要的新行为测试应覆盖读者产物，不能镜像实现。

模块专有输出：
learning-demand-and-scope.md、one-task-practice.md、language-review.md、实际可填产物及浏览器/打印证据。没有真实需求或复核能力就提交条件缺口，不扩展自动评分、语音服务、付费包或新训练平台。

交接与完成定义：
- 在副本 docs/module-handoffs/<batchId>/W13/ 按 COMMON.md 输出 handoff.json、README.md、candidate.patch、候选逐文件哈希、新增文件和真实测试/来源/截图等证据。只包含本模块相对分配基线的差异，不能把旧 dirty 改动夹带为自己的结果。
- handoff.json 必须填真实 batchId/moduleId/baselineId、changedFiles 的 baseSha256/candidateSha256/changeKind、tests 的实际 command/exitCode/logPath/候选 baselineId、dependencies、sharedFileChanges、limitations、nextActions；未运行检查填 null 和原因。
- 只使用 ready_for_integration、partial、blocked 状态。局部产物可完成而 LP/LC 总包仍未完成；不得自称独立审计 PASS、用户收益已证明或维护窗口已关闭。
- W00 最终统一同步 Master/overlay/执行记录/内容地图/README/TASK_LOG、规划图/history/sync、Vault，完成 Archify 自动及视觉验证、独立 Auditor 和全量 npm test/必要 launch-check。模块交接不豁免这些治理；副本中旧 sync 失效时注明待整合，不修改或绕过治理测试。
- 最后简述成果、实际检查、未完成证据、共享变更及 W00 下一步。不启动其他模块。
```

