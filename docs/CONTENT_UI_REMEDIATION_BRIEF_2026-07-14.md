# VisaLang 内容、可信度与 UI 改造简报

> **交接对象：Codex**  
> **审查日期：2026-07-14**  
> **范围：** 线上首页、指南库、英文文章、中文入口、Route Finder；当前 Astro 源码、内容集合、测试与样式。  
> **目的：** 按优先级实施改造。不要把所有工作合成一次大重构。

## 1. 产品边界

VisaLang 是**官方来源优先的语言证明核验导航站**。它不是政府机构、考试主办方、律所、移民顾问、大学录取机构或考试报名平台。

必须遵守：

1. 决策顺序固定为：最终接收机构 → 语言证明要求 → 可接受考试 → 本地考点/报名/材料核验。
2. 不得编造或保证资格、豁免、接受范围、费用、日期、成绩、签证结果、付款、交付或人工审核。
3. 已完整配置的工具路线仅是 **Germany family reunion A1**；其它路线必须保留 `official-verification-required` 回退。
4. 新功能只修改 Astro 源码层：`src/pages/`、`src/components/`、`src/layouts/`、`src/content/guides/`、`src/data/`、`src/styles/`。不要把根目录 legacy HTML/JS/CSS 当主实现。
5. 不手工编辑 `dist/`、`.astro/`、`node_modules/`。公开路由保持 trailing slash。

## 2. 交付成功标准

完成后，读者应能快速判断：

- 此页面是否适用于自己的国家、目的和路线；
- 内容是 Complete、Core、Starter 还是待核验；
- 谁是最终决定机构；
- 内容何时更新、来源何时真正核验；
- 现在应做的下一步；
- 工具能做什么、不能做什么，以及输入如何保存。

## 3. 优先级总览

| 优先级 | 工作项 | 目标 | 主要位置 |
|---|---|---|---|
| P0 | 来源核验状态与内容日期拆分 | 不再把编辑更新时间当官方核验日期 | `content.config.ts`、首页、GuideLayout、Badge、测试 |
| P0 | 高风险 Starter 页面事实降级 | 多国内容不超出来源能力 | `src/content/guides/`、分类与 CTA 数据 |
| P0 | 广告/CMP/隐私一致性 | 法律文案与真实广告技术行为一致 | `BaseLayout`、Privacy、Cookie |
| P1 | 内容成熟度、作者/审查责任链 | 覆盖范围与真实能力一致 | content schema、GuideLayout、About、Editorial Policy |
| P1 | 首页信息架构 | 内容/证据优先，弱化 SaaS 控制台感 | `index.astro`、RouteSelector、styles |
| P1 | 指南库筛选和文章卡 | 先看内容，再筛选 | Guides index、FilterBar、GuideCard |
| P1 | 文章页信任与阅读体验 | 元信息、来源表、移动端 TOC 一致 | ArticleLayout、GuideLayout、ArticleTOC |
| P1 | 工具状态与错误语义 | 工具真实、可访问、可预期 | `src/pages/tools/*`、ToolShell、ToolStepper |
| P2 | 导航、单选与窄屏表格 | 消除重复焦点和小屏摩擦 | Header、首页、Exam Comparison |
| P2 | 样式层收敛 | 一套 token、组件与断点来源 | `global.css`、`open-design.css` |

---

# 4. P0：可信度、来源与隐私

## P0-1. 拆分内容更新与来源核验

### 问题

`updatedDate` 当前可被用于 “Official sources last checked” 类文案。内容编辑日期不等于官方来源核验日期，会错误提高用户对信息新鲜度的判断。

### 涉及文件

- `src/content.config.ts`
- `src/pages/index.astro`
- `src/components/LastCheckedBadge.astro`
- `src/layouts/GuideLayout.astro`
- `src/components/GuideCard.astro`
- `tests/content-integrity.test.js`

### 实施

新增或规范 guide frontmatter：

```yaml
publishedDate: 2026-07-01        # 首次发布
updatedDate: 2026-07-14          # 内容编辑更新
sourceReviewedAt: 2026-07-14     # 官方来源最后核验
sourceReviewStatus: reviewed     # reviewed | pending | not-applicable
reviewedByRole: source-review    # editorial | source-review | translation-review
contentStatus: core-route        # complete-route | core-route | starter-overview | verification-pending
```

规则：

- “Official sources last checked” 只能读取 `sourceReviewedAt`；
- 无 `sourceReviewedAt` 或 `sourceReviewStatus !== 'reviewed'` 时，显示 `Official verification pending`，不能回退到 `updatedDate`；
- 首页将 “Recently updated” 与 “Recently source-reviewed” 视为不同概念；第一版可只保留前者，并在卡片展示来源状态。

### 验收

- 增加 fixture：`updatedDate` 存在但 `sourceReviewedAt` 缺失，断言页面不输出 “Official sources last checked”；
- 全站所有官方核验徽章均来自 `sourceReviewedAt`；
- `npm test`、`npm run launch-check` 通过。

## P0-2. 高风险 Starter 页面做事实降级与来源补全

### 问题

Portugal、Spain、UK、Canada 等 Starter 页面可能包含签证、入籍、年限、考试接受范围或有效期判断，但不一定同时拥有最终决定机关与考试方来源。考试方不能决定移民或录取结果。

### 首批人工审查对象

- Portugal Golden Visa / citizenship；
- Spain citizenship；
- UK visa / SELT；
- Canada immigration / TEF；
- Italy、France、Finland、Netherlands 等低覆盖路线。

### 实施

为高风险文章增加或维护：

```yaml
primaryIntent:
audienceScope:
finalDecisionAuthorityType:
primaryOfficialAuthorityUrl:
examOwnerUrl:
localExecutionPrompt:
```

未完成来源审查时：

- 降为 `starter-overview` 或 `verification-pending`；
- 删除无来源支持的固定资格、年限、费用、日期、有效期和接受范围结论；
- 改写为核验任务，例如：

```text
Before registering, check the current requirement with the authority that receives your application. This page helps you prepare the questions and official sources to use.
```

Complete/Core 页面增加来源事实表：

| 核验事项 | 谁最终决定 | 官方来源 | 本页确认范围 | 用户仍需确认 |
|---|---|---|---|---|

### 验收

- **本批仅覆盖上文“首批人工审查对象”列出的路线及其对应页面**；其它高风险页面只生成待审计清单，不修改正文、不提升状态；
- 本批范围内页面都有最终决定机关入口；
- 本批范围内仅有考试方来源的页面不能标为 Complete/Core；
- 无法追溯来源的内容仅保留核验步骤；
- Codex 不应自行生成、猜测或补全政策事实，事实改写需等待人工官方复核；
- 全库覆盖拆为独立、经批准的后续内容审计窗口。

## P0-3. 广告、CMP 与隐私声明一致性

### 问题

`BaseLayout` 加载广告脚本，但隐私/Cookie 文案所描述的同意机制未必有对应 CMP、同意状态或区域化加载控制。法律文案不能替代实际技术实现。

### 涉及文件

- `src/layouts/BaseLayout.astro`
- `src/pages/privacy-policy.astro`
- `src/pages/cookie-policy.astro`

### 实施规则

1. 先由产品/广告运营/法务确认真实地区与同意策略；Codex 不得虚构供应商或合规承诺。
2. 在需同意地区，非必要广告技术只能在有效同意后加载。
3. 如果 CMP 尚未决定或未部署：暂停相应地区的非必要广告技术，或将页面文案改成真实已部署行为。
4. 接受、拒绝、撤回同意都要可重复验证。

### 验收

- Privacy/Cookie 页准确描述真实行为；
- 同意前、接受、拒绝、撤回后的网络请求符合确认后的策略；
- 广告不遮挡官方来源、表单、验证步骤与正文。

---

# 5. P1：内容成熟度、责任链与 CTA

## P1-1. 内容成熟度状态贯穿全站

### 状态定义

| 状态 | 内容能力 | 默认 CTA |
|---|---|---|
| Complete route | 要求确认到提交前复核的完整受控路径 | Route Finder、Checklist、Hub、下一步页面 |
| Core route | 已解决一个明确核心决策 | 同路线决策页、官方来源、下一步 |
| Starter overview | 官方入口与决策框架 | 最终决定机关、考试方、路线分类 |
| Verification pending | 内容/来源未完成核验 | 状态说明、官方入口，不提供判断工具 |

### 实施

- 首页、About、指南库、分类页、文章头部与 Guide Card 从同一数据源读取 `contentStatus`；
- 当前基线必须保持：Germany A1 为 Complete、Germany B1 为 Core、TestDaF 为 Starter；TestDaF 只有在专项内容补深、来源审计和状态复核完成后才能提升为 Core；
- CTA 依据状态分流；非 A1 路线不应被误导为能由 Route Finder 给出个案结论；
- 路线数量由 taxonomy 数据生成，不手工维护不一致数字。

## P1-2. 作者、编辑与来源复核责任链

### 涉及文件

- `src/content.config.ts`
- `src/layouts/GuideLayout.astro`
- `src/pages/about.astro`
- `src/pages/editorial-policy.astro`

### 实施

- Article JSON-LD 和前端读取真实 Markdown `author` / 角色数据，不要无条件将作者写死为组织；
- 不虚构专家资历，可使用真实角色：Editorial team、Source review、Translation review；
- 高风险文章展示：内容状态、Updated、Source reviewed、Written by、Reviewed by role；
- 加入真实可维护的更正入口，不要假称人工审查服务已上线。

## P1-3. 内部链接按用户决策顺序

新增受控字段：

```yaml
primaryIntent:
decisionStage: requirement | choice | local-execution | submission-review
nextGuideSlug:
supportingGuideSlugs:
comparisonScope: same-route | cross-country-comparison
```

规则：

- 同路线闭环：入口 → 核心决策 → 执行/核验 → 路线 Hub；
- 跨国链接只能用于明确比较意图；
- Related Guides 至少有一条同国家、同路线或同决策阶段链接；
- 为 `nextGuideSlug`、跨国 `comparisonScope` 增加测试。

---

# 6. P1：首页、指南库和文章页

## P1-4. 首页改为内容与证据优先

### 问题

Route Console、多个相近 CTA 与工具模块权重过高，首页偏 SaaS onboarding。官方来源、内容状态、最近核验和编辑责任等差异化信号太弱。

### 涉及文件

- `src/pages/index.astro`
- `src/components/RouteSelector.astro`
- `src/components/GlobalHeader.astro`
- `src/styles/global.css`
- `src/styles/open-design.css`

### 实施

1. Hero 只保留一个主 CTA：`Start your verification route`。
2. 一个次 CTA：`Browse verified guides`。
3. Route Console 降为轻量 `Start here` 卡，点击进入完整工具页。
4. 首屏或紧随 Hero 的 trust strip 显示：Official-source-first、来源状态、VisaLang 不决定个案。
5. 第一个内容区展示成熟路线和最新受控指南，而不是先堆叠工具营销模块。
6. 路线入口区分 Complete/Core 与 Starter/Pending。

### 验收

在 375/768/1024/1440px：3 秒内可辨认站点用途、主行动、内容入口和官方边界；不操作表单也能开始阅读；没有两个同义主 CTA。

## P1-5. 指南库改为内容优先、筛选辅助

### 问题

681–900px 时筛选默认展开，结果列表被推至首屏以下；搜索、顶部与侧边筛选重复；Guide Card 存在重复焦点。

### 涉及文件

- `src/pages/guides/index.astro`
- `src/components/FilterBar.astro`
- `src/components/GuideCard.astro`
- `src/styles/global.css`
- `src/styles/open-design.css`

### 实施

- 搜索框常驻；
- Purpose、Country 为快捷筛选；
- 其它筛选与排序放入 `More filters` / `details`；
- <=900px 默认关闭高级筛选；
- 展示 Active filter chips、结果数、Clear all；
- Guide Card 只保留单一可聚焦入口；
- 卡片展示内容状态、路线、更新时间、来源状态、阅读时间。

### 验收

- 375/768/900px 页面初始可看到至少两条结果；
- 键盘可展开、筛选、清除；
- 结果数通过 `aria-live` 通知；
- 每张卡 Tab 顺序仅出现一次。

## P1-6. 文章页信任元信息与阅读结构

### 涉及文件

- `src/layouts/ArticleLayout.astro`
- `src/layouts/GuideLayout.astro`
- `src/components/ArticleTOC.astro`
- `src/components/RelatedGuides.astro`

### 实施

1. 文章头部展示 Content status、Country/Route、Updated、Source reviewed、Written by、Reviewed by、Reading time。
2. 增加 `Who decides this?`：最终决定机关类型、官方入口、VisaLang 不做的判断。
3. 以步骤、核验清单、风险提示、来源事实表替代无必要长段落。
4. 窄屏 TOC 的 DOM、视觉和焦点顺序一致。禁止仅用 CSS `grid-row` 把目录视觉移到正文前。
5. 悬浮推荐不得遮挡移动端正文。

### 验收

- 单一 H1；
- 375/768px Tab 顺序与可见阅读顺序一致；
- 来源信息不是纯 URL 清单；
- 首屏看得出适用范围、内容状态、责任和下一步。

---

# 7. P1/P2：工具、导航与无障碍

## P1-7. 工具表单错误语义

### 涉及文件

- `src/pages/tools/route-finder.astro`
- `src/pages/tools/checklist-generator.astro`
- `src/pages/tools/timeline-calculator.astro`
- `src/pages/tools/exam-comparison.astro`
- `src/pages/tools/email-reminders.astro`

### 实施

当表单使用 `novalidate` 时，必须实现：

- `aria-invalid="true"`；
- 带稳定 ID 的字段错误文本；
- `aria-describedby` 关联；
- 提交后错误摘要 + 焦点移至第一个错误；
- 修正后移除错误状态；
- 不依赖颜色表示错误。

### 验收

键盘和 VoiceOver/NVDA 空提交后，首个无效字段会朗读 invalid 与具体原因。

## P1-8. ToolStepper 改为真实状态

### 问题

`ToolShell` 固定传入 `current={1}`，用户尚未输入或已得到结果时仍像停在第二步。

### 实施

- 初始 Step 1；
- 开始填写 Step 2；
- 生成结果 Step 3；
- 同时只有一个 `aria-current="step"`；
- 若不实现动态状态，就移除伪进度。

## P1-9. 明确 URL 与 localStorage 策略

先二选一：

**可分享链接：** 加载时解析 query、回填表单、重建结果，且不携带敏感信息。  
**仅本地草稿：** 不将状态写入 URL；明确“仅保存在此设备”；提供清除；说明 localStorage 生命周期。

验收：若 UI 声称可分享，新隐私窗口必须恢复相同结果；否则 URL 不暗示可恢复。

## P2-1. 单选、导航与窄屏对比表

- 首页 Purpose/Status 改为原生 radio + fieldset/legend，或完整 ARIA radiogroup；不要用互斥 `aria-pressed` 按钮；
- 当前导航加 `aria-current="page"`；
- Routes/About 的页面链接与展开按钮使用不同、明确名称；
- Exam Comparison 小屏表格使用可聚焦、带名称、提示横向滚动的 region 容器。

验收：方向键可切换单选；移动/桌面导航都标识当前页；375px 键盘可查看表格全部列。

---

# 8. P2：样式层收敛

## 问题

`global.css` 与 `open-design.css` 都覆盖 token、组件和断点，容易导致同组件跨页面呈现不同设计方向。

## 实施

逐批建立唯一活动设计层：

```text
src/styles/
  tokens.css
  base.css
  components.css
  layouts.css
  utilities.css
```

- 先映射当前核心组件最终使用的规则；
- 不做无关视觉重构；
- 不继续叠加多版本首页覆盖；
- 统一少量断点：375 / 768 / 1024 / 1440。

## 验收

- 每个核心 token 只存在一个活动定义；
- Header、Guide Card、Article、Tool Form、Home Hero 样式来源可追溯；
- 375/768/1024/1440 截图回归无意外变化；
- `npm test`、`npm run launch-check` 通过。

---

# 9. 建议实施顺序

1. `feat(content): separate source review status from content updates`
2. `fix(content): downgrade unreviewed starter-route claims`
3. `feat(content): add route maturity and responsibility metadata`
4. `feat(ui): prioritize guides and verification trust on homepage`
5. `fix(ui): make guide filters content-first on narrow screens`
6. `feat(article): surface source review and decision authority context`
7. `fix(a11y): align tool validation and interactive semantics`
8. `fix(tools): make progress and persistence behavior truthful`
9. `refactor(styles): consolidate active design tokens and breakpoints`

每批只改直接相关文件。触及公开页面、SEO、布局或路由后运行：

```bash
npm test
npm run launch-check
```

## 10. 手工验收

### 页面与 SEO

- 首页、指南库、文章、工具、中文入口可访问；
- 每个公开页只有一个 H1；
- canonical、hreflang、Open Graph、JSON-LD、sitemap 与旧 URL 重定向无回归；
- 内容状态、更新时间与来源核验状态不混用。

### 375px 移动端

- 无横向页面滚动；
- 指南库初始可见文章结果；
- TOC、正文与焦点顺序一致；
- 工具标签、错误与结果可用；
- 表格可横向查看且有提示。

### 内容与商业边界

- 非成熟路线不承诺工具判断能力；
- 高风险页面可定位最终决定机关；
- 不假称付款、邮件、人工审核或交付已发生；
- 广告、同意和隐私文案一致。

## 11. 90 天路线图

| 时间 | 工作重点 | 成果 |
|---|---|---|
| 第 1–14 天 | 降低 YMYL 与广告隐私风险 | 内容盘点、来源状态拆分、Starter 降级、CMP/广告策略决定 |
| 第 15–30 天 | 完成德国 A1 标杆路线 | 来源事实表、咨询模板、A1 内链闭环、中英同步 |
| 第 31–60 天 | 巩固 B1、TestDaF、telc | 路线 Hub、意图地图、来源包、顺序化内链 |
| 第 61–75 天 | 选择一个非德国试点 | 用 Search Console 与来源可得性选择最小完整路线 |
| 第 76–90 天 | 建立持续复核 | 内容状态、来源包、翻译同步、月度集群审核 |

## 12. 不要做的事

- 不要为页面数量平均扩写所有国家；
- 不要用更长正文替代来源、适用边界和行动顺序；
- 不要把更新时间包装成来源核验日期；
- 不要虚构专家、审稿人、资质或合作；
- 不要把首页改成更复杂 dashboard；
- 不要未经授权引入支付、上传证件、邮件交付、追踪或广告功能；
- 不要删除 legacy 层、重定向或部署文件，除非任务明确要求且发布验证通过。
