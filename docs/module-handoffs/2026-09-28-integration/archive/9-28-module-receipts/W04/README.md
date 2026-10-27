# W04 / LC04 handoff

状态：`ready_for_integration`（仅表示此候选模块工作已整理交接；W00 串行集成、中央治理和独立审核仍待完成）。

基线：`cd845c55e17fcffa5e2184f6047df6be65f74d3cb393a3f6723fc67b2f784b40`。本模块限定在新快照 `/private/tmp/visalang-W00-2026-09-24-01/W04` 中；主树未写入。候选源码身份（仅 W04 修改的源码路径）为 `3ead7d3d28dfef5ebd1f11b568210376e7b088028002a2c86d9d6c209342525d`，逐文件哈希见 `file-hashes.json`，清单见 `candidate-manifest.json`，本模块补丁见 `candidate.patch`。

## 结果

已有资产经核对后复用并补上真实任务缺口：英文与中文已有证书页提供完整核验字段（准确产品、考试日期、申请地/路线、实际主管机关当前入口、机关明示要求、官方证据链接/位置/检查日、未确认问题）；中文路线页另提供主管机关问询卡，包含申请路线、接收机关、要求、已有证书事实、官方证据和下一步。卡片提醒不要保存证件号、案号、证书编号或私人文件。首屏先呈现任务动作，重复责任元信息折叠收起。详细差距与未确认内容见 `existing-asset-gap.md`。

高风险事实来源、实际检查时间、责任者、段落定位、支持范围和边界见 `authority-source-ledger.md`。C07 状态、noindex 与无广告策略未更改，发布 manifest 未更改。

## 验证

下列命令在此 W04 副本内运行，均退出码 0；原始输出保存在 `evidence/`：

- `node tests/fan-42-germany-a1-requirement.test.js`
- `node tests/source-review-render.test.js`（内含构建与渲染断言）
- `node tests/scheme-3-chinese-page-sections.test.mjs`
- `node tests/article-sections-key-decisions.test.mjs`

浏览器窗口走查及复制操作见 `browser-walkthrough.md`：390 × 844 与桌面 Chrome 尺寸下四个 EN/ZH 目标页复制按钮都给出成功提示。没有执行真人测试、打印或生产验证；也没有声称个案被机关接受。

共享变动：`GuideLayout.astro`、`ZhGuideLayout.astro`、`global.css`。它们对英文证书页/中文主管机关页和中文证书页的 compact task header 生效，属于共享接口范围，W00 集成时需一并审查；非目标指南未被选择性切换。
