# VisaLang UI / 无障碍改动 独立审查报告

日期：2026-10-27
审查角色：VisaLang Independent Auditor（只读、未参与实现）
被审批次：UI/UX 无障碍优化（17 项诊断），分支 `codex/scheme-3-one-week-content`

```yaml
agent: visalang-independent-auditor
reviewer_independent: true
baseline: codex/scheme-3-one-week-content @ 4cb57e8744c752fed1881281e69e7b24cc7281c4
scope: >-
  src/components/Breadcrumbs.astro, src/components/CopyButton.astro,
  src/components/FilterBar.astro, src/components/GlobalHeader.astro,
  src/components/RouteProgress.astro, src/components/SearchInput.astro,
  src/components/ZhGuideLayout.astro, src/components/tools/PurposeSuggestion.astro,
  src/components/tools/ToolShell.astro, src/data/tool-copy.ts,
  src/layouts/GuideLayout.astro, src/pages/404.astro, src/pages/guides/index.astro,
  src/pages/tools/checklist-generator.astro, src/pages/tools/email-reminders.astro,
  src/pages/tools/exam-comparison.astro, src/pages/tools/route-finder.astro,
  src/pages/tools/timeline-calculator.astro, src/scripts/plan-state.ts,
  src/scripts/tool-form.ts, src/styles/global.css,
  tests/fan-273-404-recovery.test.js, tests/fan-75-css-cascade.test.js,
  tests/m2a-plan-state-integration.test.mjs, tests/m3-chinese-tool-contract.test.mjs
agent_review_status: fail
overall_verdict: FAIL
findings:
  - severity: P1
    path: src/styles/global.css
    locator: "第 156 行 `.mobile-navigation { display: none; }`；第 1440 行 `@media (max-width: 768px)` 块（已删除 `.global-header__nav, .language-switch { display:none }` 与 `.mobile-navigation { display:block }`）；第 380 行 `body` 规则（已移除 `overflow-x: hidden`）"
    evidence: >-
      headless Chrome 对 `dist`（构建于 19:18，晚于全部范围内源码修改时间）实测：
      index.html 在 320/375/390/414/600px 下 documentElement.scrollWidth 分别为
      535/535/668/668/668，clientWidth 为 305/360/375/399/585，横向溢出
      230/175/293/269/83px；guides 与 tools 页同样溢出（320px 时 258/230px）。
      700px 起溢出归零。`.global-header__nav` 计算样式 display=flex、宽度 441px 且不收缩，
      `.mobile-navigation` 在所有断点 display=none（构建 CSS 内无任何规则使其显示）。
    required_action: >-
      在 ≤700px 恢复移动端切换：`.global-header__nav, .language-switch { display:none }`
      且 `.mobile-navigation { display:block }`（或将导航改为可压缩布局），
      并在 320/360/375/390/414/600 六档复测 documentElement.scrollWidth == clientWidth。
  - severity: P1
    path: src/pages/404.astro
    locator: "第 3 行 `const isZh = Astro.url.pathname.startsWith('/zh')`"
    evidence: >-
      `dist/404.html` 为 `<html lang="en">`，只含英文正文；不存在 `dist/zh/404.html`；
      `dist/_redirects` 末行为 `/* /404.html 404`。静态构建时 pathname 为 `/404`，
      isZh 恒为 false，中文分支从未产出。该页仍含两处中文链接文本「中文首页」，
      处于 `lang="en"` 文档内且无 `lang` 属性（WCAG 3.1.2 Language of Parts）。
      `tests/fan-273-404-recovery.test.js:12` 只断言源码字符串，因此测试通过而行为缺失。
    required_action: >-
      为中文提供可达的 404（新增 `src/pages/zh/404.astro` 并在托管层将 /zh/* 未命中路由指向它，
      或输出带 zh-CN 文案与 lang 的独立文件）；中文链接文本补 `lang="zh-CN"`；
      同时把 fan-273 的语言断言改为对构建产物（dist/404.html、dist/zh/404.html）断言。
  - severity: P2
    path: src/scripts/tool-form.ts
    locator: "第 11-13 行 `fieldLabel()`；第 43-55 行 `errorElement()`（第 52 行把错误 span 追加进 `<label>`）"
    evidence: >-
      实测 /tools/route-finder/：连续三次空表单提交，#route-finder-error 与字段错误依次为
      「Country is required.」→「Country is required. is required.」→
      「Country is required. is required. is required.」；`label.textContent` 变为
      「CountrySelect a countryGermanyAnother countryCountry is required. is required.」，
      即错误文本被并入控件可访问名并被重复播报。
    required_action: >-
      `fieldLabel()` 取初始标签文本（排除 `.tool-field-error`，或在构建时缓存 label 文案），
      错误节点移到 `<label>` 之外并以 `aria-describedby` 关联，避免污染可访问名与重复累积。
  - severity: P2
    path: src/components/tools/ToolShell.astro
    locator: "第 42-55 行 `<details class=\"tool-plan-controls\">`，第 53 行 `<p data-plan-status aria-live=\"polite\">`"
    evidence: >-
      实测提交成功后 `[data-plan-status]` 文本为「Shared plan updated for this tab session…」，
      但 `details.open === false` 且 `element.checkVisibility() === false`；
      `src/scripts/plan-state.ts:146-148` 在 sessionStorage 被阻止时向同一节点写入
      「browser blocked session storage」提示，同样不可见、不会被 aria-live 播报。
    required_action: >-
      把 `[data-plan-status]` 移出默认折叠的 details（或存储写入失败时自动 `open`），
      使「已保存/被阻止」提示与 `tool-copy.ts` 中跨工具共享计划的承诺一致可见。
  - severity: P2
    path: src/components/FilterBar.astro
    locator: "第 8 行 `<div class=\"quick-filter-bar\" aria-label=\"Guide filters\">`"
    evidence: >-
      `div` 无 role，属于 generic 角色，ARIA 规范禁止其使用可访问名，`aria-label` 被辅助技术忽略；
      同一区域外层 `<section aria-label=\"Guide filters\">` 已承担命名，形成忽略型重复。
    required_action: 改为 `role="group"`（或 `fieldset/legend`）后再保留 aria-label，或删除该 div 上的多余名称。
owner_authorization: pending
deployment_status: not_started
candidate_scope_digest: 4a20a849505dc893f4ac8ab3f2bb7b116c984c0e973b70fcca5175b6cc0c7038
diagram_source_sha256: null
diagram_artifact_sha256: null
sync_receipt_sha256: null
planning_drift_status: approved-deviation
```

> Owner 授权与部署证据独立于本次 Agent 审查：本报告不构成提交、推送、部署、发布或索引授权。
> `planning_drift_status: approved-deviation` 仅记录 Owner 于 2026-10-27 明确接受的「本轮不使用 Archify、不生成规划图同步」决定；该偏差由 Auditor 记录，不由 Auditor 授予，且未计入任何 P0/P1/P2。

---

## 1. 独立性与授权边界

- 本次审查方未参与该批次的实现、测试修复、内容撰写或规划；仅读取候选字节并写入本报告。
- 只读证据手段：读取 25 个冻结文件、读取既有 `dist` 产物、在 `/tmp` 下以符号链接副本运行 headless Chrome 做度量、`node` 直接运行范围内测试。未修改候选源码、测试、内容、`dist`、规划图、`sync.json` 或任何外部系统。
- 未执行 `npm run build` / `npm run launch-check`：两者会重写 `dist`，落入禁止修改范围。改用实现方 19:18 生成、晚于范围内全部源码 mtime（12:58–13:17）的 `dist` 作为被审产物，并用唯一令牌（`--od-action-bg:#2f63c9`、`body:has(#checklist-result`、`minmax(min(290px,100%),1fr)`）核对其与当前 `global.css` 一致。

## 2. 冻结范围与摘要

`candidate_scope_digest = sha256(排序后的 "<sha256>  <path>" 行) = 4a20a849505dc893f4ac8ab3f2bb7b116c984c0e973b70fcca5175b6cc0c7038`

| # | 文件 | sha256 |
|---|---|---|
| 1 | src/components/Breadcrumbs.astro | `9a8709d9467ccdbced7de4e92ab49126c490bb40e3a0566b1e9aa28d665e650f` |
| 2 | src/components/CopyButton.astro | `f451684957e75a5b51e34cc160d9f4039f5564439220a0ca42daad23cb1043f1` |
| 3 | src/components/FilterBar.astro | `5de57ce1d9751bec17a1b86732fd03618c545f28e3cdb9af7c5ae7f80374c73c` |
| 4 | src/components/GlobalHeader.astro | `4c7c45d77a2fba688388e8a4cf7a60efe5edea6e2b67ff51ed824b0bad157c29` |
| 5 | src/components/RouteProgress.astro | `795d167b60d4b7a16a4f775966dbcf11e1311ec1bcc1872a156b1a1d7e81edb0` |
| 6 | src/components/SearchInput.astro | `d9639d7415b027b75ab34df314d8e44e0a5e1b2ceccf4a572ac387aff6e40391` |
| 7 | src/components/ZhGuideLayout.astro | `f941e0ed262f6c3c5c891b1d163794e367d32638b21df26a520f45e8e5e31f84` |
| 8 | src/components/tools/PurposeSuggestion.astro | `27666d07d849c0e35fbe4c384995952c77aa130fb83912aa70f8f7040f89e3c5` |
| 9 | src/components/tools/ToolShell.astro | `1fe79374014c4cacbe66b867192f789b5351677a2d7ce69d294a7db7141b7fae` |
| 10 | src/data/tool-copy.ts | `39c193adb266882765ce0a8a95756359d708f9bb67edbb5c8979a5a4e2caa6c5` |
| 11 | src/layouts/GuideLayout.astro | `8dbf9c7567d1f58cbc0cb4a28dd2252d714d92ad7f2c5ae4c7fc705fcfffcbc6` |
| 12 | src/pages/404.astro | `621fb5fffc23f79b558f52cc8711051e28230fe71612e23ff35b931def06e8d3` |
| 13 | src/pages/guides/index.astro | `8b3a113b1f481545382d2ffae8a45800dbd776949d6f8a4f99bec428016f26d5` |
| 14 | src/pages/tools/checklist-generator.astro | `009ca8b7745cbb0e69f2abc148ff187d3cb10ca15139eb439de50083890ee972` |
| 15 | src/pages/tools/email-reminders.astro | `aea36a9a3bfc5a618f10e1c0398f8337d8bb63cd280b52bea62237c40d43e642` |
| 16 | src/pages/tools/exam-comparison.astro | `404d713704d33cb343c47b88f52cb58c2503ebc980e09150bec66c262d869407` |
| 17 | src/pages/tools/route-finder.astro | `a0123dd5e41b99db607a47eb06dc8421f236a8595fb73388bcb9ba1d2f4f2ddd` |
| 18 | src/pages/tools/timeline-calculator.astro | `f2a4e3affc39c0d06f4cca3147a3e54313141e3db4275853e26f62728aba19d7` |
| 19 | src/scripts/plan-state.ts | `e3cb594784c13ef8acce4f89a0b63b9a9f62a3c9c7f7b7052448bc792e9626ab` |
| 20 | src/scripts/tool-form.ts | `790b56e8f5f8bd3483ea42fea699727d221be446bfead623a0ffc1af0adced96` |
| 21 | src/styles/global.css | `887e1996f3528d6972cc10f5da64b4b005c4accc922cc6082a849c6965eea6b5` |
| 22 | tests/fan-273-404-recovery.test.js | `9d90ac97b7703c71b44fd01d3cbdd13dd23fde95ae1f2c845ae230160d9cfe4c` |
| 23 | tests/fan-75-css-cascade.test.js | `47ee7676ca7f756d4b842bc8868834cde30fb483ecc1ec2e0dc4bb3b6179925a` |
| 24 | tests/m2a-plan-state-integration.test.mjs | `658ed01af0bcfeba64ab22d4d505f8718ad744ecfdf5e8a44f3b5efe7d53ab14` |
| 25 | tests/m3-chinese-tool-contract.test.mjs | `dfc044ef3930ac073329c1a8f8f02fb585c7597fad5406b39dde0bf7776d74b2` |

范围外但作为证据读取的文件：`src/layouts/ToolLayout.astro`、`src/layouts/ArticleLayout.astro`、`src/components/ToolStepper.astro`、`src/components/ToolResultPanel.astro`、`src/components/tools/ToolResultSupport.astro`、`src/components/MobileNavigation.astro`、`src/lib/navigation-current.ts`、`src/data/plan-state.ts`、`astro.config.mjs`、`dist/**`。以上仅用于理解上下文，未计入判定范围。

## 3. 脏基线说明

- 工作树在本批次前已存在大量未提交改动（`git status` 81 项 `M`），覆盖内容 Markdown、`docs`、`src/data`、页面与 `dist`。按冻结要求，这些既有改动不作为本批次失败理由；本报告只针对上表 25 个文件的当前字节。
- 需要区分的是：本批次**确实**修改了 `src/styles/global.css`（169 行）与 `src/pages/404.astro`（85 行），因此下文 P1 可归因于本批次差异，而非历史遗留。
- `tests/m2a-staged-checklist-content.test.mjs` 的既有红灯未纳入本次审查（内容文件不在范围）。

## 4. 实际执行的验证（可复核）

| 项 | 方式 | 结果 |
|---|---|---|
| 范围内 4 个测试 | `node tests/fan-273-404-recovery.test.js`、`fan-75-css-cascade.test.js`、`m2a-plan-state-integration.test.mjs`、`m3-chinese-tool-contract.test.mjs` | 4/4 通过（exit 0，`# fail 0`） |
| 构建页数 | `find dist -name '*.html' -not -path './.prerender/*' \| wc -l` | 105（其中 `/zh` 15 页） |
| 横向溢出 | headless Chrome，iframe 视口 320–1440，测量 `documentElement.scrollWidth/clientWidth` | 见 P1-1，<700px 全部溢出 |
| 移动导航可见性 | 同上，`getComputedStyle('.mobile-navigation').display` | 全部断点 `none` |
| 工具脚本失败态 | 故障注入：在 `/tmp` 副本中移除工具模块 `<script>`，等待 12s | 见 §5，行为与实现方声明一致 |
| 复制内容 | iframe 内替换 `navigator.clipboard.writeText`，点击两次 | 见 §5，清洗有效 |
| 共享计划状态可见性 | 提交后读取 `details.open` 与 `checkVisibility()` | 见 P2-2 |
| 深色主按钮对比度 | 由 `#2f63c9` / `#ffffff` 重算 WCAG 相对亮度 | 5.60:1（与实现方数字一致）；浅色 `#1959d9`/`#fff` 为 6.05:1 |

未执行（明确声明）：`npm run launch-check`（57/0/0 为实现方声明，本次未复跑）、`npm run build`（会重写 `dist`）、`m2b-route-finder`、`m2b-checklist-export`、真实读屏（NVDA/VoiceOver）、Safari/Firefox、200% 缩放。

## 5. 复核通过项（与实现方声明一致）

1. **ToolShell 看门狗可靠**：`is:inline define:vars` 在构建产物中被包裹为 `(function(){const runtimeError = "..."; …})()`，变量为函数作用域，不存在全局 `const` 冲突，也不存在多实例互相覆盖的作用域问题（本批次 10 个工具页各仅 1 个 ToolShell）。故障注入后 12s 准时进入 `data-tool-state="failed"`，表单 `aria-busy` 被移除、仍保持 `inert`，重试按钮可见，提交按钮 `focus()` 后不获得焦点（not-focusable），`保存/清除/重启` 仍为 `disabled`——JS-only 控件没有被做成"假可用"。
2. **CopyButton 清洗有效**：中文指南页两次点击复制均得到 1391 字符，内容不含目录、按钮文字（"复制指南/打印指南"）、反馈文字（"已复制。"）或回退 textarea 内容；成功后 `[data-copy-feedback]` 为「已复制。」。`parentElement` 定位在 GuideLayout、ZhGuideLayout、ToolResultSupport 三种容器下均命中同一父级，无跨实例串扰（每页仅 1 个实例）。
3. **RouteProgress**：`localStorage` 读写均 try/catch，`save()` 返回布尔值，失败时 `[data-route-storage-status]` 显示本地化提示且 `hidden` 正确切换；`render()` 同步 `aria-current="step"`，服务端遗留的 `--current/--complete` 修饰类在 CSS 中无对应规则，不产生可见冲突；按钮初始 `disabled` 由脚本在绑定后启用。
4. **无 JS 降级**：`guides/index` 的 20 张卡片在标记中均无 `hidden`，无 JS 时全部可见；`data-guide-search`、`data-guide-filter`、`data-guide-sort`、`data-clear-all` 均 `disabled`，并由 `SearchInput` 的 `<noscript>` 说明"筛选需要 JavaScript，全部指南仍在下方"。用户仍能拿到可用路径。
5. **焦点可见性**：`global.css:389` 全局 `:focus-visible { outline: 3px solid var(--focus) }`，`skip-link` 有 focus 显形规则，未发现 `outline: none`。
6. **打印**：`@media print` 在全部屏幕规则之后重置 12 个表面/文本令牌并 `!important` 覆写 `body` 背景与前景，白底深字成立；`prefers-reduced-motion` 同时抑制 transition 与 animation。
7. **承诺与实现一致性（抽查）**：`Save on this device for 30 days` 对应 `PLAN_DEVICE_RETENTION_DAYS = 30`；`tool-copy.ts` 声明"不写入页面网址"，`plan-state.ts` 仅清理 legacy 查询参数、不再写入 URL；提醒日期只留在页面内（`plan.persist` 只含 `topicId/routeId`）。

## 6. 发现

### P1-1 移动端主路径横向溢出，且移动导航在所有断点不可达

- 位置：`src/styles/global.css:156`（`.mobile-navigation { display:none }`）、`:1440`（`@media (max-width:768px)` 块）、`:380`（`body` 规则）。
- 事实：本批次从 768px 块中删除了 `.global-header__nav, .language-switch { display:none }` 与 `.mobile-navigation { display:block }` 三行，同时从 `body` 与 `html, body` 移除了 `overflow-x: hidden`，但没有任何新增规则把 `.mobile-navigation` 打开。
- 实测（`dist`，未改动的构建产物）：

| 视口 | index sw/cw | 指南页 sw/cw | 工具页 sw/cw | `.mobile-navigation` |
|---|---|---|---|---|
| 320 | 535 / 305（+230） | 563 / 305（+258） | 535 / 305（+230） | none |
| 375 | 535 / 360（+175） | 563 / 360（+203） | 535 / 360（+175） | none |
| 390 | 668 / 375（+293） | 697 / 375（+322） | 669 / 375（+294） | none |
| 414 | 668 / 399（+269） | 697 / 399（+298） | 669 / 399（+270） | none |
| 600 | 668 / 585（+83） | 697 / 585（+112） | 669 / 585（+84） | none |
| 700 及以上 | 0 | 0 | 0 | none |

- 影响：手机宽度下整页可横向滚动、正文与按钮被裁切（截图可见首屏段落与按钮在右边界折断），且没有汉堡菜单可替代。该现象与"320/390 无整页横向滚动"的验收声明直接矛盾。
- 修复：在 ≤700px 恢复导航切换（隐藏 `.global-header__nav` 与 `.language-switch`，显示 `.mobile-navigation`），或改造导航为可收缩布局；随后以 `documentElement.scrollWidth === clientWidth` 在 320/360/375/390/414/600 六档复测。若确认保留桌面导航，则必须同时给 `.global-header__inner` 或导航项增加收缩/换行策略，不能仅依赖删除 `overflow-x: hidden`。

### P1-2 中文 404 从未生成，且 404 文档 lang 与中文内容不符

- 位置：`src/pages/404.astro:3`；产物 `dist/404.html`、`dist/_redirects`。
- 事实：`dist/404.html` 只有英文副本（`<html lang="en">`），不存在 `dist/zh/404.html`；`_redirects` 把 `/*` 指向同一个 `/404.html`。静态构建时 `Astro.url.pathname` 为 `/404`，`isZh` 恒 false，中文文案、中文恢复入口与 `lang="zh-CN"` 分支属于不可达代码。
- 影响：任何 `/zh/...` 失效地址都返回英文页；页面中仅有的中文文本「中文首页」位于声明为 `lang="en"` 的文档内且未标注 `lang="zh-CN"`（WCAG 3.1.2）。这与验收记录 U14「中文失效地址返回中文 404，保留 `zh-CN` 与中文恢复入口」不符。
- 测试有效性：`tests/fan-273-404-recovery.test.js:12` 只匹配源码里的 `lang={isZh ? 'zh-CN' : 'en'}` 字面量，无法发现构建期恒 false；该测试通过不能作为该行为的证据。
- 修复：新增 `src/pages/zh/404.astro`（或等价产物）并在托管层把 `/zh/*` 未命中路由指向它；给中文链接文本补 `lang="zh-CN"`；把 fan-273 改为断言 `dist/404.html` 与 `dist/zh/404.html` 的实际 `lang` 与文案。

### P2-1 表单校验错误文本重复累积，并污染 `<label>` 可访问名

- 位置：`src/scripts/tool-form.ts:11-13`（`fieldLabel` 优先取 `label > span`）、`:43-55`（`errorElement` 把错误 `<span>` 追加进 `<label>`）。
- 实测：连续三次空提交，字段错误依次为 `Country is required.` → `Country is required. is required.` → `Country is required. is required. is required.`；错误摘要链接文本同步膨胀；`label.textContent` 变为 `CountrySelect a countryGermanyAnother countryCountry is required. is required.`。
- 影响：所有 10 个工具页在重复提交未修正字段时出现叠加文案；读屏把错误文本并入控件名称并再经 `aria-describedby` 播报一次。
- 修复：缓存初始标签文本或排除 `.tool-field-error`（如 `:scope > span:not(.tool-field-error)`），并把错误节点移到 `<label>` 之外、只用 `aria-describedby` 关联。

### P2-2 共享计划状态消息默认不可见（含存储被阻止的降级提示）

- 位置：`src/components/tools/ToolShell.astro:42-55`（`<details class="tool-plan-controls">` 无 `open`，`:53` 的 `[data-plan-status]` 在其内部）；写入方 `src/scripts/plan-state.ts:88-89`、`:146-148`。
- 实测：提交成功后 `[data-plan-status]` 文本为 `Shared plan updated for this tab session…`，但 `details.open === false`、`element.checkVisibility() === false`。同一节点在 `sessionStorage` 被阻止时承载「browser blocked session storage so it cannot be restored in another tool」，同样不可见且 aria-live 不播报。
- 影响：`sharedPrivacy` 明示"approved fields can move between the five tools in this tab"，但降级事实只在折叠区里，构成可见性不足的持久化承诺。
- 修复：把该状态节点移出 details，或在写入失败时自动 `open` 详情并聚焦提示。

### P2-3 `aria-label` 用在无 role 的 `div` 上（无效 ARIA）

- 位置：`src/components/FilterBar.astro:8`。
- 影响：generic 角色不允许命名，该 `aria-label` 被辅助技术忽略；外层 `section` 已有同名 label，形成"写了但不生效"的重复。
- 修复：加 `role="group"`（或改用 `fieldset/legend`）后保留名称，或删除该属性。

## 7. 非计分观察（不影响 verdict 分级，建议同批修复）

1. **面包屑缺 `aria-current`**：`Breadcrumbs.astro:12` 与 `ZhGuideLayout.astro:134` 的当前项为 `<span class="current">`，未标 `aria-current="page"`；同页 `.tool-nav`（`ToolShell.astro:33`）与步骤条已使用 `aria-current`，语义不一致。WCAG 不强制，属一致性改进。
2. **重复断点未合并**：`global.css` 仍有两个 `@media (max-width: 375px)`（第 345、1492 行），与验收记录 U15「合并两组 375px 媒体查询」不符；后者的书写顺序覆盖前者部分属性，后续维护易产生隐性覆盖。
3. **`exam-comparison.astro:140-144`** 对同一 `tableWrap` 连续设置两次 `role`、两次 `aria-label`、两次 `tabIndex`，第一次被覆盖；无功能影响，属复制粘贴残留。
4. **复制失败回退**：`CopyButton.astro:33-37` 在失败时只显示 `<details>` 的 summary，不自动 `open`；用户需再点一次才看到 textarea。文案已提示"手动选择并复制"，可用性可接受。
5. **`<details aria-labelledby>`**（`ToolShell.astro:42`、`PurposeSuggestion.astro:5`）不是标准的 details 命名方式（无对应 role 映射），实际朗读依赖 summary 文本，建议改用可见标题或 `aria-label`。

## 8. 证据不一致记录

| 实现方声明 | 本次复核 |
|---|---|
| 320/390/770/820/1440 无整页横向滚动 | 770/820/1440 成立；320/390（及 375/414/600）全部溢出，320px 达 +230px、390px 达 +293px |
| 中文 404 保留 `zh-CN` 与中文恢复入口 | 不可复现：只有 `dist/404.html`（`lang="en"`），无 `dist/zh/404.html` |
| U15 合并两组 375px 媒体查询 | 未合并，两个 375px 块仍在 |
| 深色主按钮 5.60:1 | 重算一致（5.60:1） |
| 10 个工具页 `data-tool-state=ready` | 抽查 `/tools/route-finder/`（320px）为 `ready`，一致 |
| 脚本阻断 → `failed` + 重试、无 `aria-busy` | 故障注入一致 |
| 复制排除目录/按钮/反馈文字 | 实测一致（1391 字符，无上述片段） |
| 105 页构建 | 独立统计 105，一致 |

## 9. 规划图同步偏差（Owner 已接受，不计分）

本轮不使用 Archify、不生成规划图同步，`sync.json` 与 watched-scope digest 保持原状。按 Owner 2026-10-27 的明确决定，此项记录为 `approved-deviation`：不视为代码缺陷、不计入 P0/P1/P2、不单独构成 FAIL 理由。因此 `candidate_scope_digest` 之外的 `diagram_source_sha256` / `diagram_artifact_sha256` / `sync_receipt_sha256` 均为 `null`（不存在可冻结的同步字节）。本次 FAIL 判定完全来自 §6 的两项 P1 与三项 P2。

## 10. 结论

`overall_verdict: FAIL`，`agent_review_status: fail`。

- 2 项 P1：移动端全站横向溢出且移动导航不可达；中文 404 不可达并触发 `lang` 不匹配。
- 3 项 P2：校验错误文本累积并污染可访问名；共享计划状态默认不可见；`aria-label` 用在无 role 的 `div`。
- 修复范围应严格限定在 §6 所列文件与行；修复后须由同一 Auditor 复审，并对 320–700px 六档横向溢出、`dist/404.html` 与 `dist/zh/404.html` 的实际 `lang`、以及重复提交的错误文案做产物级复测。
- 本判定不授权提交、推送、部署、发布、索引或广告；Owner 授权与部署证据另行取得。
