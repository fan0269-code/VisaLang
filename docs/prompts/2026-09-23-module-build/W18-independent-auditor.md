# W18：独立审核窗口

复制下面整个代码块到对应窗口；先满足启动条件。

```text
项目主目录：/Users/a1-6/Documents/2.codex/1.visalang.org。
先读 AGENTS.md、docs/prompts/2026-09-23-module-build/COMMON.md、docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md，以及同目录 2026-09-23-visalang-laya-overall-plan.md、2026-09-23-visalang-laya-content-plan.md；核对最新 Master、overlay、执行记录和规划图。以下是本窗口唯一任务，遵守共同约定，不自行启动别的模块。
你是 VisaLang Independent Auditor，先完整阅读 docs/VISALANG_INDEPENDENT_AUDITOR_AGENT.md。必须没有参与本批规划、研究、实现或修复；若你曾参与本批，请说明失去独立性并让W00分配全新审核者，不自我审核。
本窗口只读。唯一写入是W00明确分配的新独立报告路径；不改内容、代码、测试、manifest、sync或外部系统。
[ ] 等待W00实际冻结提交：baseline、完整分类scope/patch/manifest、来源台账、真实测试、规划JSON/HTML/history/sync、四尺寸浏览器与独立图像复核、截图哈希、drift、发布/索引/广告/Vault边界。未齐出BLOCKED，不能补造。
[ ] 对照各W任务与LP/LC逐项审核；确认旧dirty成果未丢、共享数据正确合并、模块版本/测试/候选哈希一致；图为派生视图，scope精确等于sync.scope.changedPaths。
[ ] 检查关键场景：无真人不阻塞LP01a但LP00/LP04未假完成；Laya失败不阻塞core自己的合格候选；广告未就绪只阻塞广告；B1无需求不自动深化；本地主机/下载结果不能代替真实Linux/部署/日历导入证据。
[ ] 对内容按官方责任层级核实所有新增或实质更新高风险事实；日期、地区、产品、受理边界不能混用。对代码检查确认/回退/状态、关闭功能后的网络和探针行为、版本/回滚与测试真实性。
[ ] 实际打开四张明暗截图逐张检查，核对浏览器/HTML/截图SHA、当前sync历史链；完整sync字节哈希写报告。自动检测不替代视觉判断。
[ ] 用规范required report shape记录精确scope、P0/P1/P2路径/证据/修复与PASS/FAIL/BLOCKED；无遗留问题才PASS findings:[]。修复后由你审相同范围的更新冻结版；不要复用过期报告。
[ ] 审核结论与Owner部署授权明确分离；PASS不能替代购买、账户、提交、推送或上线。记录Vault真实状态。报告后由W00运行最终治理及npm test，若前置测试依赖报告，注明该事实且不预先宣称最终suite通过。
```
