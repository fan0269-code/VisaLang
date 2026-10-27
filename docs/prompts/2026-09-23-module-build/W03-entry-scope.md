# W03｜入口与支持范围

```text
你负责 VisaLang W03，只实施本文划定的子模块。

主项目：/Users/a1-6/Documents/2.codex/1.visalang.org
本次任务边界：LC01；澄清现有入口能力与任务路径，按确认缺陷做必要修正。

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
有 W00 分配即可与 LP00、LP01a 并行进行能力盘点与已知缺陷维护。不要等待 Laya 完整评测；没有确认缺陷的合格入口记录检查通过，不为显示进度重写。

具体可写范围：
- src/pages/index.astro
- src/pages/zh/index.astro
- src/pages/routes/index.astro
- src/pages/tools/index.astro
- src/components/HomeHero.astro、src/components/RouteSelector.astro（仅被分配且入口修复需要）
- tests/task-4-home-routes.test.mjs、tests/scheme-3-route-hubs.test.js、tests/m3-chinese-journey.test.mjs、tests/m3-discovery-trust.test.mjs（仅新增/修正受影响的任务断言）
- docs/module-handoffs/<batchId>/W03/
只读 routeRegistry（src/data/route-tools.ts）、src/data/publication-manifest.ts、src/data/site.ts 与现有指南状态。确需共享数据/布局变更时先确认 W00 已分配，再按共同约定提交小补丁；不升级 configured 范围。

执行步骤：
[ ] 对照当前 routeRegistry，列出现有入口承诺和实际能力；记录每一处真实差异。
[ ] 建立三层能力表：德国 A1 完整准备流程、B1 信息专题、其他目的官方核验；避免目录出现考试名就暗示完整工具支持。
[ ] 修复首页、中文首页、Routes、Tools 的必要入口与文案，使文章直达、手选和已有证书阶段入口可找到；不强制所有人重走全流程。
[ ] 根据该候选实际配置标识 Laya；未启用版本不宣传自然语言能力。模型可识别不等于对应路线支持完整输出。
[ ] 英中能力范围保持一致，但语言不能推断申请地；原网址、索引/广告范围和中文页面数量保持。
[ ] 在自己的构建中检查桌面与移动、键盘进入和返回；记录目标路径、可理解的能力边界与截图。真实读者理解反馈来自 W01，未取得就保留未知。

检查命令（副本内）：
npm run build
node tests/task-4-home-routes.test.mjs
node tests/scheme-3-route-hubs.test.js
node tests/m3-chinese-journey.test.mjs
node tests/m3-discovery-trust.test.mjs
只运行与实际变更有关的聚焦检查，记录正确候选构建；不得删除/弱化失败断言来掩盖支持范围变化。最终全量检查由 W00 集成执行。

模块专有输出：
capability-matrix.md、entry-gap-list.md、实际修复差异、浏览器与键盘记录。区分已修复、原本合格无需改动、需真人验证和超出范围；不能把界面检查写成 LP00 已完成。

交接与完成定义：
- 在副本 docs/module-handoffs/<batchId>/W03/ 按 COMMON.md 输出 handoff.json、README.md、candidate.patch、候选逐文件哈希、新增文件和真实测试/来源/截图等证据。只包含本模块相对分配基线的差异，不能把旧 dirty 改动夹带为自己的结果。
- handoff.json 必须填真实 batchId/moduleId/baselineId、changedFiles 的 baseSha256/candidateSha256/changeKind、tests 的实际 command/exitCode/logPath/候选 baselineId、dependencies、sharedFileChanges、limitations、nextActions；未运行检查填 null 和原因。
- 只使用 ready_for_integration、partial、blocked 状态。局部产物可完成而 LP/LC 总包仍未完成；不得自称独立审计 PASS、用户收益已证明或维护窗口已关闭。
- W00 最终统一同步 Master/overlay/执行记录/内容地图/README/TASK_LOG、规划图/history/sync、Vault，完成 Archify 自动及视觉验证、独立 Auditor 和全量 npm test/必要 launch-check。模块交接不豁免这些治理；副本中旧 sync 失效时注明待整合，不修改或绕过治理测试。
- 最后简述成果、实际检查、未完成证据、共享变更及 W00 下一步。不启动其他模块。
```

