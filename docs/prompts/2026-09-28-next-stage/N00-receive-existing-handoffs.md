# N00｜接收已有四模块，冻结集成输入

复制下面完整文本到执行任务。

```text
项目根目录：/Users/a1-6/Documents/2.codex/1.visalang.org。先读AGENTS.md、docs/PROJECT_REVIEW_2026-09-28.md、docs/superpowers/plans/2026-09-28-visalang-integration-content-acceptance.md，以及Master → backlog → status overlay → EXECUTION_RECORD；同时读docs/prompts/2026-09-23-module-build/COMMON.md。本轮9/28进度观察优先于旧dispatch的“未开始”描述，旧记录不删除。
只执行本提示词对应任务；沿用W/LP/LC编号。保留全部既有dirty成果，不从HEAD重置，不整文件覆盖。没有commit/push/deploy、真实回滚、账户动作、联系真人、读取密钥、付费API或真实输入外发授权。AI与广告不开启；高风险事实只用正确层级官方来源。不能把历史单次smoke当本轮调用许可。
维护窗口必须遵守规划图/独立Auditor/TASK_LOG/Vault要求；功能候选交接不是整批完成。所有build及内部会build的检查串行。未测试、环境阻塞和实际失败分开记录。不要重复索取已授权的本地工作许可，也不要跳过仍需外部证据的门槛。

你是W00接收者，执行新计划任务0。本提示词只接收、验证、归档，不应用功能补丁。
1. 读取docs/next-stage-evidence-2026-09-28/module-inventory.json及module-receipts/。原始候选：/private/tmp/visalang-W00-2026-09-24-01/W03、W04、W08；/private/tmp/visalang-W00-2026-09-25-01/W07。W03/W04=ready_for_integration，W08/W07=partial，主树未集成。先确认目录仍存在，禁止重新派P01–P04从零施工。
2. 保存当前Git/dirty基线和逐文件hash；新建docs/module-handoffs/2026-09-28-integration/（若执行日不同，生成实际唯一batch并回报）。比对原dispatch、handoff、candidate.patch、基准与候选hash、当前主树hash。临时目录或证据缺失则标blocked，不伪造候选。
3. 持久化四份完整交接证据以及补丁涉及的候选源文件；排除密钥、依赖、缓存和模型权重。9/28归档仅保存了关键证据，不是完整备份。逐项登记来源和SHA-256。
4. 生成intake.json、baseline-manifest.json、conflict-map.json：包括全部交接字段、allowed paths、缺失项、共享文件和集成顺序。global.css=W03/W04/W07；tools/route-finder.astro=W08/W07。共享文件逐段三方合并。
5. 验证归档hash及补丁基准，记录W07 T28缺Playwright导致exit1、W04未归档截图和未打印、W08真实Git身份/生产环境未验证。历史测试不标作本轮重跑。
6. 完成此接收窗口的治理同步与独审，交出具体intake路径、四包可进入/不可进入状态及N01输入。不要把“接收完成”改成T/LP/LC完成。
```
