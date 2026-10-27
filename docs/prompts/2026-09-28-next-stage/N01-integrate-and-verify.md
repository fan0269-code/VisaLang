# N01｜串行集成与本地体验验证

复制下面完整文本到执行任务。

```text
项目根目录：/Users/a1-6/Documents/2.codex/1.visalang.org。先读AGENTS.md、docs/PROJECT_REVIEW_2026-09-28.md、docs/superpowers/plans/2026-09-28-visalang-integration-content-acceptance.md，以及Master → backlog → status overlay → EXECUTION_RECORD；同时读docs/prompts/2026-09-23-module-build/COMMON.md。本轮9/28进度观察优先于旧dispatch的“未开始”描述，旧记录不删除。
只执行本提示词对应任务；沿用W/LP/LC编号。保留全部既有dirty成果，不从HEAD重置，不整文件覆盖。没有commit/push/deploy、真实回滚、账户动作、联系真人、读取密钥、付费API或真实输入外发授权。AI与广告不开启；高风险事实只用正确层级官方来源。不能把历史单次smoke当本轮调用许可。
维护窗口必须遵守规划图/独立Auditor/TASK_LOG/Vault要求；功能候选交接不是整批完成。所有build及内部会build的检查串行。未测试、环境阻塞和实际失败分开记录。不要重复索取已授权的本地工作许可，也不要跳过仍需外部证据的门槛。

你是W00集成者，执行新计划任务1。消费N00实际返回的intake.json；未找到则先只读定位，不假设准备已经完成。仅verified的包可应用；冻结允许路径为四份handoff的非证据路径并保留准确基准。
1. W03→W04→W08→W07逐包应用最小补丁。global.css和Finder按三方差异逐段合并；每包记录before/after hash和冲突理由，不直接覆盖共享文件。保持事实/索引政策与当前TypeSafe成果。
2. 复用W08 runtime-feature-contract.md：VISALANG_PURPOSE_MODE=off|laya|typesafe，VISALANG_ADS_MODE=off|on，默认off/off。src/data/runtime-features.ts→dist/runtime-features.json→release.json.features保持唯一契约；不增加第二套开关。AI相关工作先读项目TypeSafe技能与adoption方案，涉及版本代码才查现行官方文档，不调用API。
3. 先复核W07 T28缺依赖，再使用已可用本地浏览器环境或CUA补真实几何/交互证据。375/390/768/桌面×EN/ZH，结果标题与sticky header不重叠、焦点到位、无页面横溢出。保存截图、viewport、scrollY、bounding rect及hash。依赖不可用如实保留blocked，不删测试。
4. 实测已有证书、unknown、verify-only、修改输入作废旧结果、复制失败回退、存储禁用/session恢复/30天过期/清空，打印预览与下载文件中的来源、日期、未确认状态。W04四目标页截图/复制/打印补证；真实日历导入不由ICS下载代替。
5. 顺序运行候选对应focused测试、六个provider×ads模式build及launch-check，最后恢复off/off。不得发送真实模型请求。实际Git树验证dirty发布拒绝；不得为让正向prepare通过而提交、伪造hash或关闭身份校验，缺少合法immutable候选则保留partial。
6. 串行npm test、npm run launch-check，维护窗口统一完成planning-map/独审/记录。若分步骤交局部候选，明确未收口；不得把旧模块日志当本轮集成PASS。交integration-record.json、候选hash、实际日志/截图与未完成的真实证据。
```
