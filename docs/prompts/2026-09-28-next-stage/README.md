# 2026-09-28 下一阶段执行提示词

先读[进度审查](../../PROJECT_REVIEW_2026-09-28.md)与[实施计划](../../superpowers/plans/2026-09-28-visalang-integration-content-acceptance.md)。四个隔离候选已经存在，主树尚未集成；旧P01–P04不要作为重新施工指令。N编号仅是新交接顺序，沿用既有W/LP/LC。

| 顺序 | 直接复制的提示词 | 交付与停点 |
|---|---|---|
| 1 | [N00 接收已有交接](N00-receive-existing-handoffs.md) | 持久化完整包、hash核对、intake；不应用补丁 |
| 2 | [N01 集成并验证](N01-integrate-and-verify.md) | 串行合并、补浏览器与开关验证；真实证据缺口保留 |
| 3 | [N02 内容台账与来源](N02-content-ledger-and-sources.md) | 41页逐页台账、费用复查队列、最多3项短名单 |
| 4 | [N03 有限内容维护](N03-targeted-content-maintenance.md) | 仅修确证缺口；无缺口可0项，不批量新写文章 |
| 5 | [N04 核心候选独审](N04-core-candidate-and-audit.md) | 整批证据、独立PASS或明确阻塞；不自动发布 |

推荐单一W00串行执行，独立Auditor另设；N02只读盘点可提前，依赖集成结果的验收须等N01。每个提示词是该范围的本地执行指令，不一次授权全部外部动作。规划文件本身不代表任务已经启动。真实读者研究准备可独立进行，无真人不得升LP04；模型、广告、B1或训练深化保持原条件。

当前主仓库根目录直接包含package.json，命令在该根目录运行，不进入不存在的VisaLang子目录。后续batch路径以N00实际回传为准。每次独立维护窗口都保留图同步、精确范围、独审与Vault真实状态，不以分模块规避。
