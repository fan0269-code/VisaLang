# W10：Laya 后续投入决策（LP01b）

复制下面整个代码块到对应窗口；先满足启动条件。

```text
项目主目录：/Users/a1-6/Documents/2.codex/1.visalang.org。
先读 AGENTS.md、docs/prompts/2026-09-23-module-build/COMMON.md、docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md，以及同目录 2026-09-23-visalang-laya-overall-plan.md、2026-09-23-visalang-laya-content-plan.md；核对最新 Master、overlay、执行记录和规划图。以下是本窗口唯一任务，遵守共同约定，不自行启动别的模块。
你是 W10，只做LP01b证据决策，不训练、调参或部署模型。只能在W00分配副本的 docs/module-handoffs/<batchId>/W10/ 写分析；无分配只读。
启动：已有W01与W02的当前实际记录，允许其明确缺失；缺失不会阻止出“证据不足”报告，但不能得到继续大投入的结论。
[ ] 锁定W01实际受试者同意/去标识任务结果、W02模型/规则/手选初验身份与原始结果；分清旧回归、新小样本、真人和本机技术数据。
[ ] 按任务比较独立完成、帮助、失败原因、改选/恢复负担与耗时；不同样本不混合成一个准确率，样本小不宣称统计提升。
[ ] 输出 decision.md + decision.json：decision为continue/pause/insufficient_evidence，证据路径与哈希、收益解释/不确定性、候选范围、投入上限、停止条件。缺真人或无法判断收益时选insufficient_evidence；手选顺畅且辅助无解释增益或负担增大时可pause。不能先定继续再改评判理由。
[ ] 只有continue才为W11/12明确有限候选与范围；完整6+1定义、独立标注/split、评分/校准规范必须先冻结再优化。继承全站规划第5节全部阈值，不以初验门槛替代。W11负责形成可审完整协议与LC02/03资产，W12正式验收须使用W11固定候选。
[ ] 按COMMON交接证据和决策。自查每条判断均有可定位记录、核心发布不依赖本决策、无外部授权暗示。不需要写镜像式单元测试；证据交叉核对是本模块检查，真正模型质量仍待W11。
缺少真人时照样完成可审的“证据不足”决策，但LP01b继续条件未满足；不得把分析完成写成Laya收益已证实。
```
