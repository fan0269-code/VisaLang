# W09｜广告独立候选与体验验证（LP05b）

```text
你负责VisaLang模块W09：在核心解耦契约上准备广告独立候选、同意/加载验证与缺口记录。广告未就绪不阻塞核心，不实际启用生产广告或修改外部账户。

项目主目录：/Users/a1-6/Documents/2.codex/1.visalang.org
先只读：AGENTS.md；docs/superpowers/plans/2026-09-23-visalang-laya-overall-plan.md；同目录2026-09-23-visalang-laya-content-plan.md；docs/prompts/2026-09-23-module-build/COMMON.md；docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md。

隔离与前置：
- 在W00分配的独立完整dirty快照副本中编辑，下列路径均相对副本。核对batchId/baselineId/manifest；禁止直接改主目录、自动worktree@HEAD或共享dist/.astro。无W00分配只读分析与临时草案。
- 必须读取W00已集成的W08组件开关契约及新baseline；不得消费未集成旧快照或另发明一套开关。若W08未提供可用契约，可只读梳理账号/证据缺口，不开始冲突实现。
- 账号、CMP/Privacy & messaging与地区行为必须来自有权人员提供的真实证据或已获准只读检查。没有授权不登录、配置、提交或联系平台。现有publisher字符串与ads.txt不证明账号批准、归属、同意或已出广告。

输入：
- src/layouts/BaseLayout.astro、GuideLayout.astro；src/data/publication-manifest.ts、site.ts及W08实际交付的运行配置。
- public/ads.txt、public/_headers；src/pages/privacy-policy.astro、cookie-policy.astro；docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md与相关既有证据，只读核对其日期/适用范围。
- W08模式矩阵、deploy/production-evidence.example.json、scripts/launch-check.js与广告相关测试。

允许写入：
- W08交付的src/data/runtime-features.ts（或其实际等效配置文件，只能沿用一个契约）；src/layouts/BaseLayout.astro；src/pages/privacy-policy.astro、cookie-policy.astro。
- public/ads.txt仅在真实归属与精确seller行证据齐全时允许必要修正；public/_headers默认只读，若需新安全策略须交W00另定范围，不能为广告泛化放宽安全配置。
- tests/adsense-risk-exposure.test.js、scheme-3-release-candidate.test.mjs、site.test.js、t27-measurement-privacy.test.mjs；scripts/launch-check.js；可新增tests/ad-consent.test.mjs。
- docs/module-handoffs/<batchId>/W09/，含账号/同意证据索引、官方文档核验边界、浏览器场景与实际结果。全局决策/规划/图/任务日志由W00更新。
- 不扩广告白名单、不改索引政策、不增加Analytics或访客文字采集、不修改模型或部署事务。

步骤：
[ ] 按实际W08契约建立关闭、拒绝/撤回、允许及失败回退的测试矩阵；先登记哪些状态能本地模拟，哪些必须真实账户/CMP或区域环境。法律/地区结论须用当前官方资料核实；无法确认写具体缺口，不自行认证合规。
[ ] 实现或完善已获准的本地广告接入边界，默认关闭；启用仍受W08独立候选门禁。广告资格继续来自publication-manifest，最多现有14篇英文支柱；首页、工具、指南库、中文、支持页及费用页保持无广告，不复制维护另一份白名单。
[ ] 核对实际CMP方案所需的同意、拒绝、撤回、刷新、错误与地域分支；只实现有明确合同/证据支持的行为。伪造弹窗或stub不能替代真实CMP，脚本出现也不能证明合法同意或广告账户正常。
[ ] 用隔离浏览器配置、测试页面与专属端口记录请求、存储、脚本状态和移动端布局；测量实际样本的加载/布局变化，未测设备/地区明确not_tested。不得点击广告、制造曝光或通过生产广告反复测试获利；优先使用获准测试模式与拦截验证，标清真实性边界。
[ ] 在副本中串行验证：
    node tests/scheme-3-publication.test.mjs
    node tests/t27-measurement-privacy.test.mjs
    node tests/ad-consent.test.mjs（仅在本模块确实新增后）
    npm run build（使用W08实际冻结的模式参数；正式全量launch-check由W00集成后执行）
    node tests/scheme-3-release-candidate.test.mjs
    node tests/adsense-risk-exposure.test.js（本身重建，避免与其他构建并行）
    额外浏览器场景/日志放handoff；广告on/off均验证允许范围与核心流程，不能通过删断言掩盖错误。
[ ] 输出源代码候选、各状态实际结果、真实账户/CMP证据索引、仍缺的地区/生产验证与回滚要求。缺真实账户/同意/网络证据时只可partial或blocked，不写adsConsent=pass、已批准、已启用或已盈利。

交付：docs/module-handoffs/<batchId>/W09/；按COMMON写handoff.json，moduleId=W09，包含逐文件base/candidate哈希、patch/新增文件及哈希、实际测试命令/退出码/logPath/baselineId、W08依赖、共享文件差异、limitations和nextActions。仅向W00交模块增量，由其串行合并，不能覆盖W08或原dirty成果。

状态仅ready_for_integration、partial、blocked，不宣称正式完成。真实证据不足不阻塞核心全关候选。W00统一规划图新sync、独立Auditor和最终npm test等收口；本模块不自审PASS。禁止commit、push、部署、购买、账户修改、联系他人；本地开发授权不构成广告启用或外部行动授权。
```
