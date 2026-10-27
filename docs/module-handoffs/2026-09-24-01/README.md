# P00 当前工作树冻结与分配 — 2026-09-24-01

本批只完成分配准备；W03/P01、W04/P02、W08/P03 均为 `prepared_awaiting_owner_dispatch` / `not_started`。模块派送=0、handoff=0、集成=0。只收到 P00，不启动研究或功能窗口；下一步是 Owner 另行发送相应提示词。

- 主分配：[dispatch.json](dispatch.json)；逐窗口分配：[W03](W03/dispatch.json)、[W04](W04/dispatch.json)、[W08](W08/dispatch.json)。
- 基线：`codex/scheme-3-one-week-content @ 4cb57e8744c752fed1881281e69e7b24cc7281c4`；upstream `origin/codex/scheme-3-one-week-content`，本地 refs ahead/behind=0/0，未 fetch。
- 冻结身份：`cd845c55e17fcffa5e2184f6047df6be65f74d3cb393a3f6723fc67b2f784b40`；1,313 文件、59,896,160 字节。暂存0、已跟踪dirty129、未跟踪条目901、删除0。完整清单与每文件哈希见 [baseline-manifest.json](baseline-manifest.json)。
- 候选位置：`/private/tmp/visalang-W00-2026-09-24-01/W03`、`/private/tmp/visalang-W00-2026-09-24-01/W04`、`/private/tmp/visalang-W00-2026-09-24-01/W08`；冻结源 `/private/tmp/visalang-W00-2026-09-24-01/baseline`。四份逐文件复验全部一致，见 [snapshot-verification.json](snapshot-verification.json) 及各 `*-byte-verification.json`。
- [排除清单](exclusions.json)：排除 Git、凭据、缓存、生成目录、虚拟环境、依赖及两份可选嵌套外部仓库；没有读 `.env.local`。额外纳入15份必要旧实验日志、项目TypeSafe技能/许可和技能锁文件；没有已知必要输入缺口。快照是模块施工基线；本轮随后产生的调度/图/审核证据归主树，形成独立维护scope，不回灌而改变副本身份。
- [环境证据](environment-preflight.json)：每份副本另复制10,147项本地Node依赖，逐项校验且不共享可写inode；各自dist/.astro/cache，W08独立stdlib venv。无安装、下载、服务启动、模型推理或API调用；端口与未来完整执行环境尚待模块实际派送后验证。无.git，真实Git身份prepare留给W00集成后执行。

共享 `global.css`（W03/W04）及 `GuideLayout.astro`（W04/W08）只交最小独立补丁，由W00逐段集成；W03本次没有GuideLayout写权，如确需改须先扩充精确分配。禁止整文件覆盖。P04留W07/W15、P05留W17；W01可另行分配研究准备；旧W02仍为Laya离线范围，TypeSafe新评测另定数据/用途/预算。

当前TypeSafe实现保留；release仍为广告＋laya/typesafe，core-only未验收。原T=25/5/4及LP/LC状态不变，真实读者、日历、主机/备份/TLS/回滚门槛不变。无移民、考试或费用事实改动，无来源checkedAt刷新，路由/索引/sitemap/广告资格不变。

治理同步 `VL-PMAP-20260924-07`，drift `aligned`；[候选清单](candidate-manifest.json)、[审核提交](review-submission.md)、[Vault待同步记录](vault-review.md)。新独审权威为 `docs/planning-map/VISALANG_P00_REBASELINE_INDEPENDENT_AUDIT_2026-09-24.md`；独审结论只以其落盘报告为准，不在dispatch预填PASS。独审前只执行governance到缺少新报告的门禁，独审后串行npm test及governance，原始收口日志保存在 `/private/tmp/visalang-p00-2026-09-24-01-postaudit/`，不修改已审字节。没有为本P00跑launch-check或单独build，npm test若自行构建则串行执行。

指定Vault目录与模板本次检查均不存在，实际同步 `blocked`；本地payload为review / needs_human_review:true / owner_decision:pending / deployment_status:not_started。准备、审核不代表发布授权。
