# W02｜Laya有限初验（LP01a，LC02/03最小准备）

```text
你负责VisaLang模块W02：LP01a初步技术/对照验证，只交付可集成的有限实验与证据，不优化生产模型，不替代LP01b决策。

项目主目录：/Users/a1-6/Documents/2.codex/1.visalang.org
先只读：AGENTS.md；docs/superpowers/plans/2026-09-23-visalang-laya-overall-plan.md；同目录2026-09-23-visalang-laya-content-plan.md；docs/prompts/2026-09-23-module-build/COMMON.md；docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md。

隔离与启动：
- 只在W00分配的独立完整dirty快照副本中工作，核对batchId、baselineId、baseline manifest与副本绝对路径；下列路径均相对于该副本。不得修改主目录，也不得自动创建仅基于HEAD的worktree丢失未提交成果。没有分配时，只读分析和临时草案，不能开始产品或实验实现。
- LP00尚未完成、尚未招募真人或手选尚未证明困难，均不阻塞本模块。初验只需已有候选、冻结基线、预先写明的范围和投入上限；不等待LC02/03完整上线资产。
- 使用W00确认的现有解释器、离线模型缓存和独占本地端口。先核对版本/权重哈希；缺少运行库或缓存时记录blocked，不自动下载模型、不付费、不更换依赖来制造成功。

输入（只读）：
- services/laya-purpose/{app.py,questions.json,probe.py,model.lock.json,README.md,test_app.py}。
- src/components/tools/PurposeSuggestion.astro、src/scripts/purpose-suggestion.ts、src/pages/tools/route-finder.astro；中文页面复用该页面。
- docs/release-candidate-evidence-2026-09-22/laya-expected.json、laya-actual.json、laya-comparison.md。
- experiments/laya-purpose/与experiments/laya-purpose-v2/，特别是v2的rules.py、ANNOTATION.md、冻结清单与原始结果；历史实验全部保持原字节。

允许写入：
- 新建experiments/laya-lp01a/，只用于本次最小说明、回归/新小样本清单、冻结记录、对照运行器、分析脚本和实际结果。
- docs/module-handoffs/<batchId>/W02/，包括COMMON规定的handoff.json、补丁/新增文件包、哈希清单、运行日志与浏览器证据。
- 不修改services/、src/、public/、deploy/、历史实验和全局规划/任务日志。发现生产缺陷，在handoff列出位置与复现步骤，由W00安排后续模块。

步骤：
[ ] 验证副本与baseline一致，记录运行器/模型/问题定义版本、机器、端口、初验投入上限；整理LC02最小确认/改选/无法判断/回退说明及LC03既有6+1类定义，不宣布完整资产完成。
[ ] 先冻结预期再调用模型。既有20例及已见28/48例仅作回归，分别报告；另建小型新样本并单列来源、语言、类型、编写/接触者和哈希，不能称独立盲测。不得合并分母制造“准确率提升”。
[ ] 复现旧错误，以相同任务比较手选路径、现有简单规则与当前Laya。手选的技术路径检查不等于真人耗时；没有真人时不编造其成功率。不得针对错误持续改提示词、规则、权重或生产代码；改进建议留给W10决策。
[ ] 对现有双语交互检查确认前不改表单、改选、含糊/多目的拒识、不可用/超时/busy/旧响应恢复；明确哪些情境使用真实服务，哪些故障由stub注入。模型产生错误标签必须保留。
[ ] 记录本地冷启动/热请求的实际样本数与耗时范围；明确操作系统、硬件、运行顺序与预热限制，不推导Linux容量或线上质量。
[ ] 在副本中运行现有契约检查：
    PYTHONDONTWRITEBYTECODE=1 <已核实Python路径> -m unittest discover -s services/laya-purpose -p 'test_*.py' -v
    node tests/laya-purpose.test.mjs
    node tests/m2b-route-finder.test.mjs
    node tests/t27-measurement-privacy.test.mjs
    真实服务复现可参考python3 services/laya-purpose/probe.py --port <独占端口> --cases <冻结用例文件> --out <本模块结果文件>，但必须先启动副本中的现有服务；该probe内置“local macOS CPU”说明，在其他系统使用时应在新实验运行器中如实记录环境，不能冒用它作Linux证明。
[ ] 若需要现有浏览器回归，使用副本专属预览端口与VISALANG_BASE_URL运行node tests/t28-stale-results.test.mjs；按实际环境指定PLAYWRIGHT_MODULE，VISALANG_RESULT_PATH指本模块handoff目录。额外初验场景写在新实验目录；无浏览器/服务则相应项not_tested。
[ ] 达到预设投入上限就汇总。输出旧/新样本分开结果、错误清单、交互与耗时证据、技术限制、建议交给W10的问题；不声称用户收益、市场需求或生产质量已经通过。

交付：按COMMON填写handoff.json，包括schemaVersion、batchId、moduleId=W02、baselineId、implementationStatus、changedFiles逐文件base/candidate哈希与changeKind、tests实际命令/退出码/logPath/baselineId、dependencies、sharedFileChanges、limitations、nextActions。提交仅本模块相对基线的补丁、新增文件和字节哈希给W00串行集成；不得把历史dirty改动当作本模块成果。

状态仅可ready_for_integration、partial或blocked。真实运行缺失不能记passed；旧错误未改善不等于初验无交付，但必须如实保留。模型优化与完整评测等待W10的LP01b继续决定。W00统一规划图新sync、独立Auditor与最终npm test等收口；本模块不自审为PASS、不自行改治理记录。禁止commit、push、部署、购买、账户变更或联系他人；本地实验授权不扩大为外部行动授权。
```
