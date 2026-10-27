# W04｜主管机关与已有证书核验

```text
你负责 VisaLang W04，只实施本文划定的子模块。

主项目：/Users/a1-6/Documents/2.codex/1.visalang.org
本次任务边界：LC04；按权威来源修复负责机关与已有证书任务缺口，保留 C07 的发布边界。

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
可先维护确认错误和真实来源缺口，与 W01 并行；LP00 观察用于排序。新增事实必须实际查阅有权机关/官方考试来源，不能沿用旧日期假装本次查过。

具体可写范围：
- src/content/guides/german-family-reunion-language-requirement.md
- src/content/guides/goethe-a1-germany-family-reunion.md
- src/pages/zh/guides/german-family-reunion-language-requirement.astro
- src/pages/zh/guides/goethe-a1-germany-family-reunion.astro
- 仅 W00 分配时：src/data/claim-registry.ts、src/data/zh-germany-a1.ts、src/data/zh-guide-task-reconciliation.ts、src/data/route-tools.ts、src/data/tool-copy.ts 中本任务相关记录
- tests/fan-42-germany-a1-requirement.test.js、tests/claim-registry.test.mjs、tests/task-5-source-ledger.test.mjs、tests/m2b-route-finder.test.mjs、tests/scheme-3-chinese-fail-closed.test.mjs
- docs/module-handoffs/<batchId>/W04/
共享文件不整份覆盖；逐条 claim/version/consumer 变更写入 sharedFileChanges。Finder 模板或状态存储的额外改造须先交 W00 分配，不顺带重构。

执行步骤：
[ ] 列现有主管机关层级、适用地区、证书产品/日期/文书形式与读者下一步；标记缺口而非先重写全文。
[ ] 建立来源台账：URL、实际核验日、负责机关、段落定位、允许支持内容、边界、引用位置。国家概览不能证明地方或个案接受结果。
[ ] 交付主管机关提问表及已有证书核验卡：读者提供证书信息、询问具体机关、保存回答与日期；无法确认时写具体核验动作。
[ ] 证书是否可用由有权机关核验，模型不判定有效性、豁免或接受。维护 unknown/needs_authority_confirmation 的具体出口。
[ ] 检查 C07 当前 contentStatus: verification-pending 与 sourceReviewStatus: reviewed 的不同含义；给出有证据的缺口/状态建议。本模块不自动提升发现、索引或广告状态，保持 noindex/ad-free。
[ ] 英文 C01 为一般说明、中文 C01 为中国申请地特定范围，不能为了双语对齐扩大事实范围或自动建立不等价 hreflang。
[ ] 检查正文、双语事实引用与 Finder 相应分支的一致性；保留必需 front matter、原网址与来源版本保护。

检查命令（副本内）：
npm run build
node tests/fan-42-germany-a1-requirement.test.js
node tests/claim-registry.test.mjs
node tests/task-5-source-ledger.test.mjs
node tests/m2b-route-finder.test.mjs
node tests/scheme-3-chinese-fail-closed.test.mjs
实际改到双语/工具才扩大相关检查；对修改页面做桌面/移动与键盘检查，记录具体证据，不把自动检查代替来源复核或真人任务复验。

模块专有输出：
authority-source-ledger.md、certificate-check-card.md、C07-gap-and-status-recommendation.md；说明每个已核验/仍未知字段、责任机关和相关版本。遇到来源不可确认时完成可确认部分并标 partial，不能编造通过结论。

交接与完成定义：
- 在副本 docs/module-handoffs/<batchId>/W04/ 按 COMMON.md 输出 handoff.json、README.md、candidate.patch、候选逐文件哈希、新增文件和真实测试/来源/截图等证据。只包含本模块相对分配基线的差异，不能把旧 dirty 改动夹带为自己的结果。
- handoff.json 必须填真实 batchId/moduleId/baselineId、changedFiles 的 baseSha256/candidateSha256/changeKind、tests 的实际 command/exitCode/logPath/候选 baselineId、dependencies、sharedFileChanges、limitations、nextActions；未运行检查填 null 和原因。
- 只使用 ready_for_integration、partial、blocked 状态。局部产物可完成而 LP/LC 总包仍未完成；不得自称独立审计 PASS、用户收益已证明或维护窗口已关闭。
- W00 最终统一同步 Master/overlay/执行记录/内容地图/README/TASK_LOG、规划图/history/sync、Vault，完成 Archify 自动及视觉验证、独立 Auditor 和全量 npm test/必要 launch-check。模块交接不豁免这些治理；副本中旧 sync 失效时注明待整合，不修改或绕过治理测试。
- 最后简述成果、实际检查、未完成证据、共享变更及 W00 下一步。不启动其他模块。
```

