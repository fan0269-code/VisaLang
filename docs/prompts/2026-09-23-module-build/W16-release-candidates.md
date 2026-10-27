# W16：分别冻结发布候选（LP06）

复制下面整个代码块到对应窗口；先满足启动条件。

```text
项目主目录：/Users/a1-6/Documents/2.codex/1.visalang.org。
先读 AGENTS.md、docs/prompts/2026-09-23-module-build/COMMON.md、docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md，以及同目录 2026-09-23-visalang-laya-overall-plan.md、2026-09-23-visalang-laya-content-plan.md；核对最新 Master、overlay、执行记录和规划图。以下是本窗口唯一任务，遵守共同约定，不自行启动别的模块。
你是 W16，只准备候选清单与验收证据，不执行发布。W00必须在dispatch中选择core、laya或ads一个目标；未选择先只读梳理三个目标的缺口，不默认联合发布。
只写所分配副本 docs/module-handoffs/<batchId>/W16/；读取已集成源码、构建/配置身份、前置交接和独审报告。修复返回对应模块，禁止伪造缺少的提交或环境信息。
[ ] core目标：核对W15/LP04与W08/LP05a全条件、17旧URL/目标主机/TLS/备份与回滚实证、关闭模型与广告的实际构建行为。不要求W02/W10/W11/W12/W09完成。
[ ] laya目标：核对W10 continue、W11完整质量与LC02/03资产、W12目标Linux容量、W08解耦、已验收core候选；联查同源API/隐私/确认/回退、共存与单独停用回滚。未全部具备就列缺口，不要求广告已启用。
[ ] ads目标：核对W09真实账户/同意/加载/体验证据与已验收core版本；不要求Laya。不能把账户文案或配置样例作为账户已批准的证据。
[ ] 每次生成独立candidate.json：组件清单、target、实际branch/HEAD及dirty候选摘要、构建和配置哈希、来源前置、检查记录、回滚计划/已演练范围、未完成项、授权状态。未提交时用HEAD+dirty manifest绑定，绝不造result commit。
[ ] 将本次完整scope交W00治理冻结和W18独审。报告未生成时只能review_pending；PASS也只表示质量验收。已满足除审核外条件时交ready_for_integration，否则partial/blocked并列出证据差额。
[ ] 输出下一次外部操作所需具体范围供Owner决定；本任务不commit/push/部署/购买/账户操作，也不把授权pending当成已经上线。实际发布后才将真实时间/版本交W17。
验证：逐项重算artifact/manifest哈希和依赖报告身份；消费W00当前npm test/launch-check结果而不是旧日志；过期证据必须重验。不要为三个分支再造联合必经门槛。
```
