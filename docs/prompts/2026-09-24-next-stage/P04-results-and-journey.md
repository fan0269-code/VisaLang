# P04｜W07结果优先与W15局部任务验收

```text
项目：/Users/a1-6/Documents/2.codex/1.visalang.org。
先读取AGENTS.md、docs/PROJECT_SCAN_2026-09-24.md、docs/superpowers/plans/2026-09-24-visalang-next-stage-content-ui.md、docs/prompts/2026-09-23-module-build/COMMON.md及Master/overlay/EXECUTION_RECORD。新增内容规划从属于这些权威，不改变原T/LP/LC门槛。
本提示词只授权所列本地工作，不授权commit/push/deploy/真实回滚、付费API、真实数据外发、账户变更或联系真人。保留所有既有dirty成果。不得用截图/合成样本冒充真人、真实设备或生产证据。不要索取已经明确给出的同一范围授权。
你负责W07/LC07及交给W15的局部技术验收。只能用W00分配的新副本；依赖对应W04/W06事实，若已存在合格资产由W00登记后复用。读取旧W07-record-tools.md和W15-core-journey.md。

允许最小修改：src/components/tools/ToolShell.astro、ToolResultSupport.astro；src/scripts/tool-form.ts、plan-state.ts；受影响src/pages/tools及zh/tools页面；src/styles/global.css；相关tests/m2a-plan-state-integration.test.mjs、m2b-route-finder.test.mjs、m2b-checklist-export.test.mjs、m3-chinese-tool-contract.test.mjs、t28-stale-results.test.mjs。计算公式/法规数据只读，不擅自改逻辑。超出范围由W00记录分配后再做。

[ ] 新构建复现390手机生成清单后标题被sticky header遮挡，记录滚动位置/焦点/截图；先建立能捕捉标题被遮挡的真实浏览器断言或测量，不只匹配CSS字符串。
[ ] 整理结果为路线/边界→下一步→待核实→保存/继续→证据详情。来源、版本、检查日仍在可访问详情及导出中；技术claim ID不占普通读者主流程。
[ ] 工具首屏压缩为任务与保存状态摘要，把详细重置规则放就近说明；当前页可直接手选，AI供应商说明在发送前仍清晰可见，不因精简删除。
[ ] 修复结果滚动/焦点偏移，标题及状态可见；不要用overflow:hidden剪掉证据。下一步/复制/打印/下载有清晰位置。宽表可控滚动且不破坏表头语义。
[ ] 实际验证unknown、已有证书、verify-only、编辑后旧结果失效、会话恢复、保存30天/清除、复制失败、存储不可用；保留三类材料和已确认/假设区分。
[ ] 运行上述Node断言；按是否实际发生路由/行为变化补focused回归，不编造通过。375/390/768/桌面EN/ZH、键盘、打印/下载逐项记录。日历实际导入、真人LP00和真实设备未测单列；本模块不关闭整个LP04。

交付必须包含COMMON的handoff.json、逐文件base/candidate哈希、补丁、新文件、测试实际命令/退出码/日志、截图或来源证据、未验证项和共享接口变动。仅使用ready_for_integration、partial或blocked，不自称独立审核PASS。功能窗口不改主树、不维护全局图，W00串行集成后统一治理与独审。

```
