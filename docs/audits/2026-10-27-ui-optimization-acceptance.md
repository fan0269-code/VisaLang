# VisaLang UI 优化验收记录（2026-10-27）

状态：**实现与本地验收完成；规划图同步门禁按用户决定不做。**
性质：由实现方完成的验收记录，**不是**独立 Auditor 报告，不替代 `docs/VISALANG_INDEPENDENT_AUDITOR_AGENT.md` 规定的独立审查。

## 1. 范围

基线：分支 `codex/scheme-3-one-week-content`，HEAD `4cb57e8`。

本批次改动仅涉及 UI 层，未修改签证/考试事实内容，未提交、未推送、未部署：

- 样式与设计令牌：`src/styles/global.css`
- 工具骨架与交互：`src/components/tools/ToolShell.astro`、`src/components/tools/PurposeSuggestion.astro`、`src/scripts/tool-form.ts`、`src/scripts/plan-state.ts`、`src/data/tool-copy.ts`
- 通用组件：`Breadcrumbs`、`CopyButton`、`FilterBar`、`GlobalHeader`、`RouteProgress`、`SearchInput`、`ZhGuideLayout`
- 页面：`404`、`guides/index`、五个工具页（中英文各一套，共 10 个工具页）
- 回归测试：`fan-75`、`fan-273`、`m2a-plan-state-integration`、`m3-chinese-tool-contract`

仓库在本批次之前已存在大量未提交改动（含内容文件与 `dist`），不属于本批次，未回退、未合并。

## 2. 已实施的 17 项修复

| ID | 处理结果 |
|---|---|
| U01 | 按钮与步骤状态改用独立前景/背景令牌；深色主按钮与当前步骤由 2.41:1 提升至 **5.60:1** |
| U02 | 五个工具加入 `initializing / ready / failed` 状态机，异常时显示可见错误与重试，JS-only 控件默认禁用 |
| U03 | 共享计划移至表单之后；可选 AI 建议默认折叠后置；十个中英文工具首字段进入首屏（390×844 下 y≈618–782） |
| U04 | 中文导航缩短标签，770/820px 不再逐字换行 |
| U05 | 统一锚点 `scroll-margin-top`；目录跳转后标题位于固定页头下方约 19px |
| U06 | 指南筛选在无 JS 时禁用并给出降级说明 |
| U07 | 路线进度按钮就绪后启用；`localStorage` 失败时显示可见提示 |
| U08 | 复制前剔除目录/按钮/反馈节点；成功与失败均有可见文本，失败提供完整手动复制 textarea |
| U09 | 打印时重置全部表面令牌，白底深字 |
| U10 | 横向表格改为可聚焦滚动区域并带本地化名称 |
| U11 | 小屏步骤条改单列；操作按钮组统一间距，消除 0px 粘连 |
| U12 | 浅色辅助文字、步骤编号、面包屑分隔符提升至 4.5:1 以上 |
| U13 | 当前工具补 `aria-current`；中文 landmark 与面包屑语义修正 |
| U14 | 中文失效地址返回中文 404，保留 `zh-CN` 与中文恢复入口 |
| U15 | 合并重复标题规则与两组 375px 媒体查询（两组 375px 块经核查承担不同职责：密度调整与宽度守门，且位置影响级联，故保留并加注说明，未强行合并） |
| U16 | 减少动态效果时禁用非必要 transition |
| U17 | 关键元数据字号下限提升至 13–14px |

额外发现并修复：320px 下相关指南卡片最小列宽导致 11px 整页横向溢出。

## 3. 验证结果

- `npm run launch-check`：**57 通过 / 0 失败 / 0 阻塞**，覆盖 106 个生成页面。
- `npm run build`：成功，106 页。
- 针对本批次的 6 个专项测试全部通过：`fan-75`、`fan-273`、`m2a-plan-state-integration`、`m3-chinese-tool-contract`、`m2b-route-finder`、`m2b-checklist-export`。
- 浏览器实测：十个中英文工具均进入 `ready`；320 / 390 / 770 / 820 / 1440px 关键页面无整页横向滚动；深色对比度、打印配色、复制回退、存储失败提示、脚本阻断后的 `failed + retry`、中文 404 均已复核。

## 4. 未关闭项（明确记录，不视为通过）

1. **规划图同步门禁（`tests/planning-map-governance.test.mjs`）**：用户明确要求本轮不使用 Archify 工具、不生成规划图同步。因此 `sync.json`、watched-scope digest 与审查证据链**保持原状未更新**，该门禁处于未满足状态。**不得**将其记录为通过，也未伪造任何摘要或证据。
2. **`tests/m2a-staged-checklist-content.test.mjs`**：断言 `selected centre … not universal` 在 HEAD 版本内容上同样失败，属仓库既有红灯，与本批次 UI 改动无关，未改动内容文件。
3. **独立审查**：本轮独立 Auditor 服务多次因队列容量限制未能启动，尚未取得规定的独立 `PASS`。

## 5. 建议的后续验收

真实读屏（NVDA / VoiceOver）、Safari 与 Firefox 矩阵、200% 缩放、生产环境 404 与真实网络条件下的脚本失败，仍应在发布前专项复核。

## 6. 独立审查（Auditor）发现与修复

首轮独立审查（未参与实现）判定 `FAIL`：**P0 = 0，P1 = 2，P2 = 3**。报告见 `docs/audits/VISALANG_UI_ACCESSIBILITY_INDEPENDENT_AUDIT_2026-10-27.md`。已逐项修复：

| 编号 | 发现 | 修复 |
|---|---|---|
| P1-1 | 收尾合并断点时删除了 ≤768px 的导航切换规则，且移除了 `overflow-x: hidden`，导致 320–600px 全站横向溢出（320px 达 +230px）、移动菜单在所有断点 `display:none` | 在 `@media (max-width: 768px)` 内恢复 `.global-header__nav, .language-switch { display:none }` 与 `.mobile-navigation { display:block }`；320/375/414/480/600/768/769/820/900/1024/1280 五页面实测 `scrollWidth === clientWidth`，无溢出 |
| P1-2 | `Astro.url.pathname` 在静态构建时恒为 `/404`，中文 404 分支不可达；`dist/404.html` 为 `lang="en"`，无 `dist/zh/404.html` | 新增 `src/pages/zh/404.astro`（`lang="zh-CN"`，中文恢复入口），根 404 改为纯英文并给中文入口链接标记 `lang="zh-CN"`；`_redirects` 增加 `/zh/* /zh/404/index.html 404` 且置于兜底规则之前；nginx 增加 `/zh/` 的 `error_page`；新页面加入 sitemap 排除并同步 noindex 计数（64→65） |
| P2-1 | 校验错误文本重复累积（`Country is required. is required.`），错误节点被追加进 `<label>` 污染可访问名 | `fieldLabel()` 改为克隆 label 并剔除 `.tool-field-error`/控件后的缓存文本；错误节点移到 `<label>` 之后，仅用 `aria-describedby` 关联。连续三次空提交文案稳定，`label` 内无错误节点 |
| P2-2 | `[data-plan-status]` 位于默认折叠的 `<details>` 内，保存成功与「存储被阻止」提示均不可见 | 将状态节点移出 `<details>`。实测提交后与 `sessionStorage` 被阻止时 `checkVisibility()` 均为 `true` |
| P2-3 | `aria-label` 用在无 `role` 的 `div`（FilterBar），被辅助技术忽略且与外层 `section` 重复命名 | 移除该 `div` 上的重复 `aria-label`，保留外层 `section` 命名 |

同时处理了审查报告 §7 的非计分建议：面包屑当前项补 `aria-current="page"`（中英文）、复制失败时自动展开手动回退 `details`（实测 `open === true`）、`exam-comparison` 重复设置 `role`/`aria-label`/`tabIndex` 的残留清理、`details` 上无效的 `aria-labelledby` 移除。

修复后复测：`npm run launch-check` **57/0/0（106 页）**；`npm test` 除规划图同步门禁外全部通过；深色主按钮与当前步骤仍为 **5.60:1**；复制回退不含目录文字。

## 7. 审查范围扩展（相对首轮冻结清单）

首轮冻结清单之外，本次修复新增或修改了：`src/pages/zh/404.astro`（新增）、`astro.config.mjs`、`public/_redirects`、`deploy/nginx-vhost-template.conf`、`scripts/launch-check.js`、`tests/scheme-3-release-candidate.test.mjs`、`tests/scheme-3-content-map.test.mjs`、`docs/CONTENT_MAP.md`。这些改动均为 P1-2 的必要配套（可达性、托管映射、noindex 计数一致性），未涉及签证或考试事实。

