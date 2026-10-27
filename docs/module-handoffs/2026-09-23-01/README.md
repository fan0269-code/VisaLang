# W00 分配准备：2026-09-23-01

状态：三份候选已准备，等待 Owner 分别派发；模块尚未实施，收到 handoff 0，集成 0。不可把准备完成写成 LP/LC 通过。

基线：`6575f350de1af90c9d439d99573ff3b16c50c17b2de2d234e0a08bd430a232c8`；branch `codex/scheme-3-one-week-content`；HEAD `4cb57e8744c752fed1881281e69e7b24cc7281c4`；upstream `origin/codex/scheme-3-one-week-content`；ahead/behind 0/0。完整 Git 状态、index、staged/dirty patch、1,115 文件字节与省略项见 baseline 文件。原文件从工作树复制，未 stash/reset/clean/切分支。基线及副本不含 .git。

| 窗口 | 候选绝对路径 | 对应已有提示词 | 预览端口 |
|---|---|---|---|
| W01 | /private/tmp/visalang-W00-2026-09-23-01/W01 | docs/prompts/2026-09-23-module-build/W01-reader-validation.md | 4311 |
| W02 | /private/tmp/visalang-W00-2026-09-23-01/W02 | docs/prompts/2026-09-23-module-build/W02-laya-initial.md | 4312；模型8782 |
| W08 | /private/tmp/visalang-W00-2026-09-23-01/W08 | docs/prompts/2026-09-23-module-build/W08-core-decoupling.md | 4318 |

给每个窗口提供主目录 dispatch.json 的绝对路径、窗口号，以及对应提示词全文；按 dispatch 的 workspacePath 工作，先用 baseline-manifest 校验源文件，不要求 node_modules/.venv/dist/.astro/.runtime 进入源码基线。副本中的原规划图是该基线历史状态，正式治理由 W00 收口。

Node 依赖各自独立复制并校验，无硬链/外部软链。Python 各自独立环境；共享基础解释器仅只读。W02 模型五个文件按 lock 校验并解引用复制为私有普通文件，未启动推理；用私有 Python 的 `-m`，避免复制的 console-script 旧 shebang。版本、离线变量、独立日志/cache 路径见 environment-preflight.json。端口是本批分配，不是长期系统保留，启动时必须重新检查。临时目录可能被系统清理；丢失时 W00 重新从冻结快照校验恢复，不从 HEAD 猜测。

W01 无真人/同意/保存位置时只交准备成果并保持 partial。W02 初验预设上限120分钟，旧/新样本分开；无真人不阻塞初验，收益仍未知。W08 本地候选可先行，真实Git prepare由W00集成后验证，目标主机等缺失时LP05a partial。W09等W08正式集成的新基线；其他门禁见 integration-record.json。禁止 commit/push/部署、招募联系、账户或真实日历操作。

治理：本轮为调度准备维护窗口，使用新 sync VL-PMAP-20260923-05；正式结论只由独立报告及最终测试决定。后续 handoff 是新的变更窗口，必须另行冻结治理，不能改本次冻结清单后沿用本次审核。
