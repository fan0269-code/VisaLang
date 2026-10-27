# P00｜W00重新冻结与调度

```text
项目：/Users/a1-6/Documents/2.codex/1.visalang.org。
先读取AGENTS.md、docs/PROJECT_SCAN_2026-09-24.md、docs/superpowers/plans/2026-09-24-visalang-next-stage-content-ui.md、docs/prompts/2026-09-23-module-build/COMMON.md及Master/overlay/EXECUTION_RECORD。新增内容规划从属于这些权威，不改变原T/LP/LC门槛。
本提示词只授权所列本地工作，不授权commit/push/deploy/真实回滚、付费API、真实数据外发、账户变更或联系真人。保留所有既有dirty成果。不得用截图/合成样本冒充真人、真实设备或生产证据。不要索取已经明确给出的同一范围授权。
你是W00集成者。当前只执行基线与分配准备，保留旧batch，不自动启动未发出的模块。读取旧W00-integration.md和docs/module-handoffs/2026-09-23-01/dispatch.json作为历史，不能继续用旧快照覆盖TypeSafe接入。

1. 记录branch/HEAD/upstream/ahead-behind/staged/dirty/untracked；按COMMON从当前工作树复制完整候选，排除.git、凭据、缓存、dist/.astro和可写共享依赖；逐文件验证，删除记录和排除理由明确。不得stash/reset/clean或切分支。
2. 读取TypeSafe方案第10节和当前release.py：当前只支持laya/typesafe提供方且强制广告，不存在已验收core-only。历史Owner scope只授权过本地启用与一条synthetic smoke；本批不调用API、不读.env.local。
3. 在新唯一batch分配W03(P01)、W04(P02)、W08(P03)候选副本；W01可按旧提示词做研究准备。每份dispatch写baselineId、workspacePath、允许路径、依赖证据与实现状态。若用户只发送本P00，到分配就绪结束；用户已另发模块时才派送。
4. 将P04留给W07/W15后续整合，P05给W17。W03/W04同改global.css或GuideLayout时独立补丁，主树由你逐段合并；不能整文件覆盖。旧W02保持Laya离线边界，TypeSafe新评测另有数据/预算范围。
5. 不把准备状态写成模块完成；现行25/5/4与LP/LC状态保持。用dispatch逐文件校验结果、排除清单和scope计划交付。更新必要执行记录、README、TASK_LOG、规划图新sync/history、Archify展示验证与图像复核、Vault实际状态，交新鲜独立Auditor。
6. 各项会build的npm命令必须串行；本P00仅文档/快照时先node tests/planning-map-governance.test.mjs到独审前置，独审后npm test及governance。不得为副本运行方便伪造.git。

输出新batch路径、三个副本路径、字节验证、仍待派送窗口和当前审核状态。未确认范围时完成不依赖该信息的准备，不假冒发出了模块。
```
