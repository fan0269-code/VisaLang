# W01｜A1 真实读者任务验证

```text
你负责 VisaLang W01，只实施本文划定的子模块。

主项目：/Users/a1-6/Documents/2.codex/1.visalang.org
本次任务边界：LP00；准备并在条件具备时执行真实读者任务验证，不修改产品或模型。

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
W00 已分配候选与本模块记录路径即可准备；真实会话还须 W00/Owner 提供可参加的目标读者、同意依据和获准的研究材料保存位置。不得自行招募、发送邀请或用代理/合成情境冒充真人。没有真人仍完成脚本和工具准备，但 LP00 及本模块整体交接保持 partial。

具体范围：
- 只读 src/pages/tools/、src/pages/zh/tools/、现有 A1 指南、src/data/route-tools.ts、src/data/plan-state.ts、src/data/checklist-export.ts 和当前本地候选。
- 可写 docs/module-handoffs/<batchId>/W01/ 内研究脚本、同意说明草案、去标识观察模板、真实观察和问题汇总。敏感身份、联系方式及原始材料不得进入公共仓库。
- 不修改 src/、public/、services/、deploy/、tests/ 或其他文档；产品问题交对应模块。

执行步骤：
[ ] 记录候选身份、目标人群/语言/申请地与实际可用功能；先确认本轮用文章直达、手选、辅助中的哪些版本。
[ ] 编写三个中性任务脚本：找到有决定权的负责机关；核查一份已有证书下一步需问什么；保存可执行的下一步准备记录。不暗示具体答案。
[ ] 先做一次明确标注为研究准备的脚本走查，不算真人样本；准备同意、退出、匿名ID、最少必要字段与观察表。
[ ] 对实际同意参与的5–8名目标读者逐任务记录独立完成/需帮助/失败、误入路径、恢复、耗时与理解反馈。实际样本不足就记录实际人数，不能补造。
[ ] 首轮即可探索性比较文章直达、手选与现有辅助，无需等手选失败；平衡先后顺序并记录学习效应及辅助实际可用状态。缺模型不阻塞手选任务研究。
[ ] 汇总最多三个优先问题，严重误导优先，分别标明内容、界面、规则、模型或未知原因，附对应证据和建议模块。
[ ] 修复后复验需实际进行才记录通过；未做复验列 pending。交给 LP01b 的用户收益结论必须区分已观察、未观察与未知。

检查：
可在自己的副本运行 node tests/m2b-route-finder.test.mjs、node tests/m2b-checklist-export.test.mjs，必要时 node tests/t28-stale-results.test.mjs，记录退出码和原始日志。这些检查只验证现有工具契约，不能替代真人观察或证明用户收益。没有执行环境时记录未运行，不安装分析采集服务。

模块专有输出：
task-scripts.md、consent-draft.md、observation-template.csv、actual-observations.csv（仅真实去标识记录；未招募不得写示例成功行）、findings.md。明确实际参与人数、每任务整数分母、辅助/手选顺序、最多三项优先问题、未完成项。小样本仅发现问题，不宣称统计转化提升、市场需求已证明或模型泛化通过。

交接与完成定义：
- 在副本 docs/module-handoffs/<batchId>/W01/ 按 COMMON.md 输出 handoff.json、README.md、candidate.patch、候选逐文件哈希、新增文件和真实测试/来源/截图等证据。只包含本模块相对分配基线的差异，不能把旧 dirty 改动夹带为自己的结果。
- handoff.json 必须填真实 batchId/moduleId/baselineId、changedFiles 的 baseSha256/candidateSha256/changeKind、tests 的实际 command/exitCode/logPath/候选 baselineId、dependencies、sharedFileChanges、limitations、nextActions；未运行检查填 null 和原因。
- 只使用 ready_for_integration、partial、blocked 状态。局部产物可完成而 LP/LC 总包仍未完成；不得自称独立审计 PASS、用户收益已证明或维护窗口已关闭。
- W00 最终统一同步 Master/overlay/执行记录/内容地图/README/TASK_LOG、规划图/history/sync、Vault，完成 Archify 自动及视觉验证、独立 Auditor 和全量 npm test/必要 launch-check。模块交接不豁免这些治理；副本中旧 sync 失效时注明待整合，不修改或绕过治理测试。
- 最后简述成果、实际检查、未完成证据、共享变更及 W00 下一步。不启动其他模块。
```

