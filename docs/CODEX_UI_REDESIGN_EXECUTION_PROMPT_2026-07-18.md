# 执行 VisaLang UI 全面重设计与 Bug 修正

你是本次任务的执行代理。请在当前 VisaLang 仓库中完成本文定义的全部工作。严格按阶段顺序执行、验证和汇报。

不要把本文改写成新计划。先检查现状，再直接实施。只有遇到本文无法消除的真实业务决策、破坏性操作或范围冲突时，才停止并报告。

## 1. 最终目标

完成一次可验证、可分阶段回退的 UI 重设计与 Bug 修正，使 VisaLang：

- 修复已确认的 Related Guides、Exam Comparison 和 Article JSON-LD 问题
- 从偏 SaaS、偏仪表盘的视觉表达转向正式、可信的编辑型公共信息站
- 保留“官方来源优先、本站不做最终决策”的产品边界
- 统一导航语义、响应式断点、状态徽章和首页样式
- 清理本次修改后确认不再使用的首页死 CSS
- 更新设计架构、任务日志和 UI 交接文档
- 通过全部测试、构建和发布准备检查

本次任务只修改本地源码、测试和相关文档。不要提交、推送或部署。

## 2. 项目定位和不可破坏的原则

VisaLang 是一个双语静态语言考试证据导航站，服务于签证、居留、入籍、学习和工作注册路径。

网站必须遵守以下原则：

- 将最终资格、接受证明、费用、日期和政策判断交给官方机构
- 不虚构考试费用、考试日期、接受范围、豁免、签证结果或服务能力
- 对可变化事实提供明确的官方核验动作
- 保留 Guide 页的信任结构、免责声明和更新时间信号
- 使用当前 Astro 源码层作为实现真相源
- 不通过手工修改构建产物解决源码问题
- 不新增未要求的服务、抽象、主题系统或业务能力

## 3. 开始前必须完成的勘察

在修改任何文件前，完成以下检查：

1. 进入 VisaLang 仓库根目录。
2. 运行 `git status --short --branch`。
3. 记录所有已有修改和未跟踪文件。
4. 阅读以下文件：
   - `CLAUDE.md`
   - `AGENTS.md`，如存在
   - `PROJECT_CONTEXT.md`
   - `docs/PROJECT_CONTEXT.md`
   - `docs/CODEX_IMPLEMENTATION_BASELINE.md`
   - `docs/STYLE_ARCHITECTURE.md`
   - `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md`
   - `docs/TASK_LOG.md`
   - `package.json`
5. 检查本文列出的目标文件当前内容和现有测试。
6. 不要假设历史行号仍然准确。以当前符号、class 和逻辑为准。
7. 不要回退、覆盖、暂存或格式化与本任务无关的已有修改。

如果目标文件已有未提交修改：

- 先判断这些修改是否属于本任务
- 保留用户或其他代理的已有工作
- 在现有内容上做最小增量修改
- 如果无法安全合并，停止该文件并在报告中说明冲突

## 4. 技术基线和验证命令

当前项目使用 Astro 7、TypeScript、Astro Content Collections、Markdown Guide 内容、共享 CSS 和 Node `assert` 回归测试。

从仓库根目录运行：

```bash
npm test
npm run build
npm run launch-check
git diff --check
```

不要调用不存在的命令，例如：

```bash
npm run lint
npm run typecheck
```

不要并发运行两个会写入 `dist/` 或 `.astro/` 的构建命令。

## 5. 修改范围

### 5.1 预计需要修改的源码

根据当前实现按需修改：

- `src/pages/guides/[slug].astro`
- `src/pages/tools/exam-comparison.astro`
- `src/data/route-tools.ts`
- `src/layouts/GuideLayout.astro`
- `src/components/ZhGuideLayout.astro`
- `src/pages/index.astro`
- `src/styles/global.css`
- `src/styles/open-design.css`，仅当它仍被实际导入且本任务必须调整
- `src/components/ArticleTOC.astro`
- `src/components/GlobalHeader.astro`
- `src/components/MobileNavigation.astro`
- 导航判定逻辑所需的一个现有或新增小型 `src/data/` 或 `src/lib/` 文件
- `public/fonts/`，仅在满足本文字体资产条件时修改

### 5.2 预计需要修改的测试

根据当前测试拆分按需修改：

- `tests/site.test.js`
- 与 Guide、内容完整性、source review、route tool 或站点输出相关的最小现有测试文件
- 如确有必要，可新增一个聚焦当前行为的 Node `assert` 测试文件，但必须由聚合测试入口加载

不要建立新的测试框架。

### 5.3 需要更新的文档

- `docs/STYLE_ARCHITECTURE.md`
- `docs/TASK_LOG.md`
- `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md`

### 5.4 禁止修改的范围

除非修复本任务直接造成的问题，否则不要修改：

- `dist/`
- `.astro/`
- `node_modules/`
- `package-lock.json`
- `deploy/`
- `public/_headers`
- `public/_redirects`
- `public/robots.txt`
- 根目录 `robots.txt`
- `sitemap.xml`
- `astro.config.mjs`
- 根目录 legacy `index.html`
- 根目录 legacy `styles.css`
- 根目录 legacy `app.js`
- 根目录 legacy `app-data.js`
- 根目录 `guides/*.html`
- 根目录 `zh/*.html`
- `do-i-need-german-a1.html`
- `germany-family-reunion-a1.html`
- 与 Germany、Spain 或其他现有内容工作线相关但不在本文范围内的文件

不要删除 legacy 文件。不要手改生成文件。

## 6. 通用执行规则

按“测试先行、最小实现、验证、再继续”的方式工作：

1. 先为当前缺陷新增或调整最小回归测试。
2. 运行聚焦测试并确认它暴露旧行为。
3. 修改最少的生产代码。
4. 再运行聚焦测试并确认通过。
5. 完成一个阶段后运行完整门禁。
6. 完整门禁通过后才进入下一阶段。

每次修改必须满足：

- 只改与当前阶段直接相关的内容
- 不重构无关模块
- 不引入第二套设计系统
- 不新增不必要的依赖
- 不在生产代码中加入 `console.log`
- 不使用硬编码替代已有 token 或数据结构
- 保持函数小而清晰
- 使用不可变数据处理方式
- 对用户输入和外部数据保留现有验证
- 不降低测试、内容或信任门槛来让构建通过

## 7. 阶段 1：修复功能和结构化数据缺陷

先完成阶段 1 的全部内容，再运行完整验证。

### 7.1 修复 Related Guides 跨国放行逻辑

目标文件：

- `src/pages/guides/[slug].astro`
- 相关 Guide 回归测试

当前缺陷：

- `isAllowedRelated` 或等价逻辑把 `sameDecisionStage` 当作无条件放行条件
- 这会让其他国家的同阶段指南绕过 `comparisonScope: "same-route"`
- 结果是只允许同路线推荐的页面出现跨国 Related Guides

实现以下规则：

1. `sameRoute` 始终允许。
2. `sameCountry` 始终允许。
3. `sameDecisionStage` 只有在 `comparisonScope !== "same-route"` 时允许。
4. 其他跨国指南只有在以下条件同时成立时才允许：
   - 当前 Guide 明确允许跨国比较
   - `comparisonScope` 表示 cross-country comparison
   - `primaryIntent` 或当前受控字段明确属于 comparison 意图
5. 不要仅凭相同 `decisionStage` 放行跨国指南。
6. 不要更改 Guide taxonomy 的整体数据契约。

至少覆盖以下回归场景：

- 当前 Guide：`dele-a2-ccse-spanish-citizenship`
- 当前范围：`comparisonScope: "same-route"`
- 当前阶段：`decisionStage: "requirement"`
- 候选他国 Guide：`cils-b1-cittadinanza-for-italian-citizenship`
- 预期：候选他国 Guide 不出现在 Related Guides 输出中

优先测试构建期输出或当前纯逻辑。不要为了测试暴露不必要的新公共 API。

验收结果：

- `same-route` 页面不再出现被同阶段条件错误放行的他国指南
- 同路线和同国家的合法推荐保持正常
- 明确允许的跨国 comparison 页面仍可推荐受控比较内容

### 7.2 修复 Exam Comparison 两列同值

目标文件：

- `src/pages/tools/exam-comparison.astro`
- `src/data/route-tools.ts`，仅在必要时修改现有展示契约
- 相关 route tool 或站点测试

当前缺陷：

- 两个考试列都读取同一个 `dimension.value`
- 两列内容完全相同
- 页面看起来是比较工具，实际没有比较功能

不要为每个考试虚构独立事实。使用“官方核验型比较”实现：

1. 保留考试选择功能和现有考试选项。
2. 每个比较维度仍占一行。
3. 在维度行中显示该维度的共同官方核验提示。
4. 让共同提示明确跨两个考试列展示，例如使用语义正确的 `colspan="2"`。
5. 在表格中分别提供两个所选考试的官方页面链接。
6. 清楚标注每个链接对应的考试。
7. 保留现有横向滚动区域。
8. 保留或改善当前 `role="region"`、`aria-label` 和横滚提示。
9. 不把两个考试继续渲染成两个相同的 `dimension.value`。
10. 不修改与本缺陷无关的 Route Finder、Timeline 或 Planner 逻辑。

如果当前数据中没有可靠的官方 URL：

- 优先复用现有考试数据中的官方来源字段
- 不自行猜测 URL
- 如目标考试确实缺少来源，显示明确的官方核验动作，而不是伪造链接

新增或调整回归测试，至少证明：

- 两个考试列不再分别读取同一个 `dimension.value`
- 页面仍保留可访问的横向比较区域
- 两个考试能显示各自的官方核验入口或明确的核验动作

### 7.3 修复 Article JSON-LD author 类型

目标文件：

- `src/layouts/GuideLayout.astro`
- `src/components/ZhGuideLayout.astro`
- 相关 JSON-LD 测试

当前结构类似：

```ts
author: { name: author }
```

改为：

```ts
author: {
  '@type': 'Organization',
  name: author,
}
```

约束：

- 当前作者是 `VisaLang Editorial team`
- 它代表组织，不代表自然人
- 不要标记为 `Person`
- 页面可见 author 和 JSON-LD author 继续使用同一受控值
- 中英文 Guide 布局保持一致

更新旧测试：

- 删除“author 不得带硬编码类型”的过时要求
- 改为要求 `@type: "Organization"`
- 保留 visible author 与 JSON-LD author 同源的断言

### 7.4 阶段 1 验证

阶段 1 完成后运行：

```bash
npm test
npm run build
npm run launch-check
git diff --check
```

只有全部通过后，才进入阶段 2。

如果失败：

- 只修复阶段 1 范围内的问题
- 不降低 Related Guides 过滤规则
- 不删除 JSON-LD 守门项
- 不删除 Exam Comparison 可访问性要求

## 8. 阶段 2：重建权威性视觉表达

阶段 2 只调整视觉系统和首页表达。不要重写内容事实，不要改变公共 URL。

### 8.1 先建立稳定的字体层级

目标文件：

- `src/styles/global.css`
- 如仍活动，`src/styles/open-design.css`
- 可选 `public/fonts/`
- `docs/STYLE_ARCHITECTURE.md`

当前问题：

- 标题和正文主要依赖相近的系统无衬线字体
- 页面缺少编辑型信息站的排版层级
- 视觉更接近通用 SaaS 或后台界面

先完成必选的 2.1a：

1. 先确认 `global.css` 与 `open-design.css` 的真实导入和覆盖顺序。
2. 保留现有 `--font-sans` 和 `--font-display` token 名称，或使用当前唯一活动 token 名称。
3. 为正文和标题建立明显不同的字体角色。
4. 正文优先使用稳定的人文无衬线栈。
5. 标题优先使用适合公共信息和编辑内容的衬线栈。
6. 中文必须有可读的 `Noto Sans SC`、`Noto Serif SC` 或可靠系统 fallback。
7. 不删除通用 fallback。
8. 不使用外部 Google Fonts 或运行时第三方字体请求。
9. 不在两个活动 CSS 文件中重复定义一套新字体 token。

自托管字体 2.1b 只在以下条件都满足时执行：

- 仓库已有可确认许可的 WOFF2 字体文件，或本地已有明确来源的可用资产
- 不需要从不明来源下载字体
- 不引入新的包依赖
- 可以使用 `font-display: swap`
- 可以控制 preload 数量
- 构建后没有外部字体请求
- 不产生明显布局位移风险

如果条件不满足：

- 完成 2.1a
- 不下载字体
- 在最终报告中把自托管字体标记为 deferred
- 不因此阻塞其他视觉工作

### 8.2 收敛黄色 accent 和装饰光晕

目标文件：

- 活动共享 CSS
- 使用 `button--accent` 或黄色状态样式的本任务相关组件

执行以下调整：

1. 将主操作按钮统一为现有官方蓝 token。
2. 不再使用亮黄色作为主要 CTA 颜色。
3. 仅在“待核验”等明确状态中保留克制的 warning 色。
4. 检查 `body::before` 或等价径向渐变。
5. 删除装饰光晕，或将其透明度降至不高于 `0.03`。
6. 深色区域不得继续叠加暖黄色背景光晕。
7. 使用现有 token，不在多个 selector 中重复硬编码颜色。
8. 保留足够的文字和控件对比度。
9. 保留可见焦点状态。

补全状态徽章语义：

- `.status-badge--starter-overview` 使用低饱和 teal 或现有 secondary token
- `.status-badge--verification-pending` 使用 warning 或 risk token
- 删除只有在确认全仓库不再使用时才可删除的死变体
- 不把 `verification-pending` 设计成成功状态

### 8.3 统一 TOC 响应式断点

目标文件：

- `src/components/ArticleTOC.astro`

将非标准的 `900px` 行为改为设计系统允许的 `768px` 断点。

预期：

```ts
matchMedia('(max-width: 768px)')
```

或使用项目当前等价写法。

不要新增 900px、800px 等新断点。设计系统只使用：

- 1024px
- 768px
- 375px

1440px 仅作为桌面检查基准，不需要额外媒体查询。

### 8.4 首页去 SaaS 化

目标文件：

- `src/pages/index.astro`
- 活动共享 CSS
- 相关首页测试

#### 8.4.1 替换 Route Console

删除或替换首页 Hero 中的 `route-console` 内联交互面板。

不要删除真正的 `/tools/route-finder/` 工具。首页只去掉重复的内联决策界面。

将该区域改成静态编辑型路线入口，例如：

- 标明当前最成熟路线是 Germany A1 家庭团聚
- 用一段简短正文解释该路线的适用范围
- 提供指向 Germany A1 route hub 的链接
- 提供指向 Route Finder 的次级正文链接
- 使用新的语义 class，例如 `route-entry`
- 不在首页复制 Route Finder 的选择和结果逻辑

更新测试：

- 不再要求首页包含 `route-console`
- 改为要求新的静态路线入口存在
- 继续验证 Route Finder 公共 URL 存在

#### 8.4.2 删除页面自我说明

删除讨论“首页自己做什么或不做什么”的 happy talk。

不要写：

- “This page does not try to…”
- “The homepage helps you…”之类页面自我描述

改为直接说明：

- 用户可以确认什么
- 哪些内容需要官方核验
- 推荐的下一步是什么

#### 8.4.3 简化阶段卡片

将带大圆形节点的 stage cards 改为克制的编号列表：

- 使用简单数字
- 使用标题和短说明
- 使用细分隔线
- 不使用仪表盘节点、发光效果或大面积卡片阴影

#### 8.4.4 合并首页卡片墙

将重复的 `.signal`、`.trust-band` 或等价三列卡片合并为更少的编辑型内容块：

- 使用一个清晰段落或少量分组
- 使用内联强调代替大量卡片
- 保持信息层级和可扫描性
- 不牺牲官方核验提醒

#### 8.4.5 统一首页按钮

将首页主要 `button--accent` 改为现有 `button--primary` 或等价官方蓝样式。

不要把所有 warning 色删除。只取消 warning 色承担主 CTA 的角色。

### 8.5 清理首页死 CSS

只清理本次首页重构后确认无人使用的 selector。

重点检查：

- 旧 home hero 覆盖
- `home-hero__journey`
- `home-hero__atlas`
- `home-hero__practice`
- `home-hero__live-dot`
- 旧 route console 样式
- 已从 `index.astro` 删除的 signal、stage node 和 accent button 专用规则

执行方式：

1. 搜索每个 selector 的全仓库引用。
2. 只删除零引用且不是运行时拼接的 selector。
3. 每删除一组就运行 `npm run build`。
4. 再运行 `npm run launch-check`。
5. 如果任何页面或检查退化，立即恢复刚删除的那一组。
6. 不顺手清理与首页无关的历史 CSS。
7. 无法证明未使用的 selector 只记录，不删除。

### 8.6 阶段 2 验证

运行：

```bash
npm test
npm run build
npm run launch-check
git diff --check
```

同时检查构建产物：

- 首页不再包含 `route-console`
- 首页包含新的静态路线入口
- 首页主要 CTA 不再使用 `button--accent`
- TOC 使用 768px 断点
- `verification-pending` 徽章保持明确的待核验语义
- 页面没有新增外部字体请求
- 没有新增第三方脚本
- 公共 URL 数量和 canonical 规则没有意外变化

## 9. 阶段 3：统一导航语义和首页样式契约

### 9.1 统一 `aria-current`

目标文件：

- `src/components/GlobalHeader.astro`
- `src/components/MobileNavigation.astro`
- 一个共享的精确 URL/section 判定函数
- 相关导航测试

当前问题：

- 桌面端和移动端使用不同的 active 判断
- section 级激活项可能错误使用 `aria-current="page"`
- 同一个链接在不同导航中语义不一致

实现统一规则：

1. 精确匹配当前页面的最终链接使用：

```html
aria-current="page"
```

2. 表示当前 section 或下拉父级的链接使用：

```html
aria-current="location"
```

3. 非当前项不输出 `aria-current`。
4. 桌面和移动导航复用同一判定函数。
5. 视觉 `.active` 可以覆盖 section 和 page，但 ARIA 语义必须区分。
6. URL 判断必须保留 trailing slash 约定。
7. 不改变公共导航 URL。
8. 不重做整个 Header 组件。

更新旧测试：

- section active 期望 `location`
- exact page active 期望 `page`
- 桌面和移动使用相同语义

### 9.2 修复首页无样式 class

检查 `src/pages/index.astro` 中以下 class 或当前等价 class：

- `.section`
- `.section-title`
- `.section-lede`
- `.rule`
- `.button--accent`

优先复用现有样式：

- `.content-section`
- `.section-header`
- `.text-link`
- `.button--primary`

只有没有现有等价样式时，才在唯一活动共享 CSS 中补充最小定义。

可接受的最小方向：

```css
.section {
  margin-top: var(--space-8);
}

.section-title {
  font-size: var(--text-xl);
}

.section-lede {
  color: var(--text-muted);
  max-width: 60ch;
}

.rule {
  margin: var(--space-7) 0;
  border: 0;
  border-top: 1px solid var(--border);
}
```

不要原样添加这些规则，除非当前 token 名称与项目一致。优先复用仓库已有 token。

### 9.3 阶段 3 验证

运行：

```bash
npm test
npm run build
npm run launch-check
git diff --check
```

额外检查：

- 桌面和移动导航的 exact page 使用 `page`
- section 父项使用 `location`
- 非当前项没有 `aria-current`
- 首页使用的 class 都能在当前活动 CSS 中找到对应规则
- 没有新增第二套 spacing、color 或 typography token

## 10. 阶段 4：更新文档和交接状态

阶段 4 不再增加新的产品行为。

### 10.1 更新 `docs/STYLE_ARCHITECTURE.md`

记录本次最终实现：

- 正文和标题字体角色
- 活动 CSS 文件和导入顺序
- 是否只完成稳定字体栈
- 是否加入自托管字体
- 主 CTA 使用的颜色 token
- warning 色的使用边界
- 装饰光晕的最终处理
- 状态徽章语义
- 1024/768/375 断点规则
- 首页从 Route Console 改为静态路线入口
- 已删除的首页死 CSS 类型
- 单一活动 token 来源约束

不要把未完成项写成已完成。

### 10.2 更新 `docs/TASK_LOG.md`

追加一个 2026-07-18 工作窗口记录，包含：

- 工作目标
- 实际完成项
- 实际修改文件
- 每阶段验证结果
- 完整测试结果
- 构建路由数量
- launch-check 结果
- 未完成或 deferred 项
- AdSense/CMP 未处理声明
- 未部署声明
- 下一窗口前置条件

更新文档顶部 `Updated` 日期，但不要改写旧日志。

### 10.3 更新 `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md`

根据实际结果更新 remaining issues：

- Related Guides 跨国过滤
- Exam Comparison 两列同值
- Article JSON-LD author 类型
- `aria-current` 语义
- TOC 断点
- 首页 Route Console 和 SaaS 化表达
- 状态徽章样式
- 首页死 CSS
- 字体系统

只把已经通过验证的项目标为已完成。

## 11. AdSense 和 CMP 的强制边界

不要在本次任务中修改 AdSense、Consent Management Platform、Cookie 同意或隐私承诺。

已知状态存在矛盾：

- `src/layouts/BaseLayout.astro` 已加载或可能仍加载 AdSense 脚本
- 生产构建可能已包含该脚本
- 运营文档仍可能把广告和 CMP 标记为 blocked
- 隐私文案可能仍描述广告处于暂停状态

本次必须：

1. 检查当前源码和相关文档。
2. 在最终报告中如实描述状态。
3. 不自动删除 AdSense。
4. 不自动保留并扩展 AdSense。
5. 不新增 CMP。
6. 不修改 Privacy Policy 或 Cookie Policy 来替业务方做决定。
7. 不修改 CSP 或第三方脚本权限。

最终报告必须给出两个后续选项：

- **选项 A：恢复暂停态。** 移除广告脚本，使源码与暂停状态一致。
- **选项 B：正式启用。** 保留广告，并另行完成 CMP、政策、CSP、责任和法务审批。

这两个选项都不在本次执行范围内。

## 12. 构建产物专项断言

除现有测试外，使用最小 Node `assert` 检查或现有测试机制验证构建产物。

至少验证：

1. 首页 HTML 不包含 `route-console`。
2. 首页 HTML 包含新的静态路线入口。
3. 首页 HTML 不包含主要用途的 `button--accent`。
4. Spain citizenship 相关页面继续显示 `verification-pending`。
5. Spain citizenship 相关页面继续显示 `Spanish citizenship authority` 或当前受控等价文案。
6. `dele-a2-ccse-spanish-citizenship` 页面不包含被错误推荐的意大利同阶段指南。
7. Guide 页面 JSON-LD author 包含 `"@type":"Organization"` 或格式化后的等价结构。
8. Exam Comparison 页面不再把同一个 `dimension.value` 渲染进两个考试列。
9. 公共 Guide 页面仍只有一个 H1。
10. canonical、hreflang、JSON-LD 和 sitemap 现有门禁继续通过。

不要为这些断言建立不会被测试套件调用的临时脚本。优先放入最小相关现有测试。

## 13. 失败处理和回退策略

### 13.1 测试或构建失败

如果某个阶段失败：

1. 停留在当前阶段。
2. 阅读完整错误输出。
3. 只修当前阶段引入的问题。
4. 重新运行最小失败测试。
5. 再运行完整门禁。
6. 不进入下一阶段，直到当前阶段通过。

### 13.2 死 CSS 删除导致退化

如果删除某组 CSS 后构建或 launch-check 失败：

1. 只恢复刚删除的 selector 组。
2. 保留其他已验证修改。
3. 在最终报告中标记该组为 deferred。
4. 不扩大为全站 CSS 清理。

### 13.3 字体导致失败

如果自托管字体导致构建、布局或资源问题：

1. 回退自托管字体资产和 `@font-face`。
2. 保留已经验证的稳定字体栈。
3. 将自托管字体标记为 deferred。
4. 继续执行其他阶段。

### 13.4 已有修改发生冲突

如果目标文件包含无法安全保留的已有修改：

1. 不要使用 `git checkout -- <file>`。
2. 不要使用 `git reset --hard`。
3. 不要覆盖整个文件。
4. 保留现有改动并报告具体冲突。
5. 只在无法继续时停止该文件。

## 14. 禁止事项

整个任务中禁止：

- 运行部署脚本
- 登录或修改生产服务器
- 修改 DNS、Nginx 或 Cloudflare 配置
- 创建 commit
- 执行 `git push`
- 自动暂存文件
- 使用 `git reset --hard`
- 使用 `git clean`
- 回退其他工作线的改动
- 手工修改 `dist/`
- 新增支付、表单、邮件、跟踪或广告能力
- 自行决定 AdSense/CMP 方案
- 编造考试或移民事实
- 改变公共 URL 或 trailing slash 规则
- 创建第二套 CSS 主题
- 进行全仓库格式化
- 升级依赖
- 删除 legacy 静态层
- 为通过测试而降低信任或内容完整性规则

## 15. 最终完整验证

全部阶段完成后，从仓库根目录运行：

```bash
npm test
npm run build
npm run launch-check
git diff --check
git status --short
```

记录每条命令的真实结果。

成功标准：

- 所有测试通过
- Astro 构建通过
- launch-check 返回 READY 或项目当前等价成功状态
- `git diff --check` 无输出
- 没有修改生成目录
- 没有部署
- 没有 commit
- 没有混入无关已有变更
- 本文要求的专项断言全部通过

如果任何一项失败，不要声称任务完成。

## 16. 最终汇报格式

执行结束后，按以下结构汇报。不要只说“已完成”。

### 16.1 结果摘要

用 3 至 6 句话说明：

- 修复了哪些真实缺陷
- 首页和全站视觉发生了什么变化
- 哪些内容被保留或 deferred
- 当前是否可以进入部署评审

### 16.2 分阶段结果

逐项列出：

- 阶段 1：完成项和测试
- 阶段 2：完成项和测试
- 阶段 3：完成项和测试
- 阶段 4：文档更新

### 16.3 修改文件

列出本任务实际修改的文件，并为每个文件写一句修改目的。

不要把已有但未修改的脏文件列为本任务成果。

### 16.4 验证证据

按真实结果列出：

```text
npm test: PASS/FAIL
npm run build: PASS/FAIL，生成路由数量
npm run launch-check: PASS/FAIL，检查数量
git diff --check: PASS/FAIL
构建产物专项断言: PASS/FAIL
```

### 16.5 未完成和风险

必须列出：

- 自托管字体是否完成
- 浏览器真机截图是否完成
- 是否有 CSS 清理被回退
- 是否有已有修改冲突
- AdSense/CMP 当前矛盾
- 任何尚未验证的内容

浏览器截图不是本任务的硬门禁。如果当前浏览器运行环境仍出现 `Cannot redefine property: process`，记录错误并继续使用测试、构建、launch-check 和构建产物断言，不要把截图写成已完成。

### 16.6 AdSense/CMP 后续决策

明确写出：

- 选项 A：移除脚本，恢复暂停态
- 选项 B：保留脚本，另行完成 CMP、政策、CSP 和审批

不要替业务方选择。

### 16.7 Git 和部署状态

明确写出：

- 未暂存或已存在的其他修改是否被保留
- 本任务没有 commit
- 本任务没有 push
- 本任务没有部署

## 17. 完成定义

只有同时满足以下条件，才能将本任务标记为完成：

- 阶段 1、2、3 的实现已完成，或按本文条件明确 deferred
- 阶段 4 文档已按真实状态更新
- 所有完整验证通过
- 构建产物专项断言通过
- 没有覆盖无关已有修改
- 没有执行提交、推送或部署
- AdSense/CMP 只报告，没有擅自修改
- 最终报告包含修改文件、验证证据、风险和后续决策

现在开始执行。先运行 `git status --short --branch`，阅读项目约束和目标文件，再从阶段 1.1 的回归测试开始。
