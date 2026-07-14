# VisaLang UI 改造：Codex 执行提示词

> **适用场景：** 已完成 UI 审查或已有 Open Design 高保真稿后，将本文件中的单个工作包交给 Codex 落地到现有 Astro 站点。
>
> **不是设计稿提示词：** Codex 的职责是理解当前实现、最小范围改造、运行验证并报告证据，**不是**重新设计品牌、引入新框架或做全站视觉重写。
>
> **规划来源：** `docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md` 的 P1/P2 UI 事项，以及 `docs/OPEN_DESIGN_UI_PROMPTS_2026-07-14.md` 的视觉方向。

---

## 使用顺序

1. 先执行 **UI-0**，建立真实页面、组件和 CSS 级联基线。
2. 如有 Open Design 稿，先把批准的截图、标注或链接与对应工作包一起交给 Codex；没有批准稿时，Codex 只按本文件的行为与信息层级实施，不自行发明新视觉语言。
3. 按依赖执行：**UI-1 首页**、**UI-2 Guide Library**、**UI-3 Guide Article**、**UI-4 Tools** 可在 UI-0 后分别进行；**UI-5 Header/Navigation** 应在首页方向明确后进行；**UI-6 样式收敛** 必须最后执行。
4. 每个工作包完成后检查 diff、运行验收，再进入下一步。不要把所有工作包合成一条“大重构”提示词。
5. 最后执行 **UI-7 最终 UI 回归**。

---

## 每次都附带：Codex UI 执行合同

> 将以下整段放在每一个具体页面工作包之前。

```text
这是 VisaLang 的 Astro 源码层定向 UI 实现任务，不是设计稿任务，也不是全站重构。

先执行 git status --short --branch，并阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md，以及本任务涉及的页面、组件、布局、数据源、测试和实际生效的样式导入顺序。不得覆盖、回退、格式化或混入已有无关修改。

工作范围：仅修改本任务直接需要的 src/、tests/、scripts/、docs/ 与必要 public/ 文件。不要修改根目录 legacy HTML/CSS/JS、dist/、.astro/、node_modules、部署文件或 package-lock.json，除非任务明确要求且验证通过。

VisaLang 是官方来源优先的语言证明核验导航站，不是 SaaS 控制台、AI 工具 landing page、移民中介、考试报名平台或 CRM。视觉优先服务于：适用范围、最终决定机构、来源核验状态和当前下一步。不要把页面改成 dashboard、营销卡片墙或复杂 wizard。

数据和能力边界：
- 路线成熟度、来源状态、更新时间、作者、审查角色、国家、路线、阅读时间和相关指南必须读取真实内容数据或既有 taxonomy；不得在页面、卡片、CSS 或 JavaScript 中硬编码这些事实。
- updatedDate 只表示内容编辑更新；“Official sources last checked”只能来自 sourceReviewedAt，且仅当 sourceReviewStatus === 'reviewed' 时显示。无可靠来源复核数据时必须呈现 pending，不得用 updatedDate 回退。
- Germany family reunion A1 是唯一 fully configured 工具路线。其他路线必须保留 Official verification required 回退，不得输出资格、豁免、接受范围、签证结果、费用、日期或成绩结论。
- 不新增广告、CMP、追踪、Cookie 写入、支付、邮件、上传、账户、人工审核或第三方服务。不要虚构专家、审稿人、官方机构或合规承诺。

视觉与交互要求：
- 每页只有一个主 CTA；次 CTA 必须服务不同任务，不能和主 CTA 同义或指向同一动作。
- 卡片只用于真实可点击的路线、指南或工具入口。不要把免责声明、静态说明或每一个内容区都做成卡片。
- 状态、错误、选中态和完成度必须以完整文字及非颜色线索表达；不能只靠颜色、位置或动画。
- 不使用紫色渐变、玻璃拟态、发光边框、装饰 blob/圆球、emoji、厚阴影、金融科技指标卡或三栏 SaaS 功能卡。
- 先复用现有、实际生效的 token 与组件；不要建立平行 design system、页面专属 token、重复断点或新的覆盖式 CSS 层。

完成前必须实际验证：
1. 375 / 768 / 1024 / 1440px 下无页面级横向滚动、无正文/来源/表单/错误被遮挡，且信息优先级符合本工作包；
2. 键盘 Tab 顺序和可见阅读/操作顺序一致；单页单一 H1；focus 状态清晰；任何操作目标至少 44×44px；
3. 按页面需要验证菜单、筛选、卡片、TOC、表格或表单的语义和辅助技术朗读；
4. 运行 npm test 与 npm run launch-check；
5. 最后报告修改文件、复用的数据源、运行命令和结果、浏览器断点检查、未验证项与 BLOCKED 项。

不要提交、推送、部署或删除无关文件。
```

---

## UI-0：实现基线与视觉级联盘点

**目的：** 先找出 UI 真正由哪些页面、组件、CSS 文件和后置覆盖规则控制，防止 Codex 在错误层上改样式或误把 legacy/失效 CSS 当作活动系统。

### Codex 提示词

```text
使用“Codex UI 执行合同”。本任务只建立 UI 实施基线，不修改产品页面、组件、内容、CSS 或部署行为。

检查并阅读：
- src/pages/index.astro、src/pages/guides/index.astro、src/pages/tools/route-finder.astro；
- src/layouts/BaseLayout.astro、src/layouts/GuideLayout.astro、src/layouts/ToolLayout.astro；
- GlobalHeader、MobileNavigation、GlobalFooter、GuideCard、FilterBar、SearchInput、RouteSelector、ArticleTOC、RelatedGuides、ToolShell、ToolStepper；
- src/styles/global.css，以及任何实际被导入的 open-design.css 或等价样式文件；
- 相关测试、CSS 导入顺序和现有客户端脚本。

创建 docs/UI_IMPLEMENTATION_BASELINE.md，必须包含：
1. 首页、Guide Library、Guide Article、Route Finder、Header/Mobile Navigation 各自的页面入口、主要组件、数据来源与客户端交互；
2. 每个核心界面的最终活动样式来源和导入顺序。明确哪些规则只是归档/失效规则，哪些 body:has(...)、媒体查询或后置覆盖会改变最终渲染；
3. 现有 token 的重复/冲突清单，只记录不修复；
4. 现有响应式阈值与 375/768/1024/1440px 的风险点；
5. 现有可访问性风险：重复焦点、TOC DOM/视觉顺序、筛选状态通知、表单错误、单选语义、移动表格、隐藏导航；
6. 本次 UI 工作包允许修改的真实文件映射。

验收：只新增该文档；运行 npm test。最后报告修改文件、发现、后续工作包依赖和阻塞项。不要做任何顺手 UI 修复。
```

---

## UI-1：首页，内容与证据优先

**依赖：** UI-0。若有批准的 Open Design 首页稿，一并提供。

**目标：** 用户不填表单也能在首屏理解站点用途、官方边界、一个主要行动和可直接阅读的内容入口。降低 Route Console 的 SaaS onboarding 感。

### Codex 提示词

```text
使用“Codex UI 执行合同”，并读取 docs/UI_IMPLEMENTATION_BASELINE.md。对 VisaLang 首页实施内容与证据优先的信息架构改造。

主要文件通常包括：src/pages/index.astro、RouteSelector、GuideCard、TrustNotice、GlobalHeader、相关数据模块和实际生效的样式规则。先验证真实路径，避免修改 legacy 首页。

必须实现：
1. Hero 的任务顺序固定为：
   - eyebrow：Official-source-first；
   - H1：Find the right language proof before you book an exam；
   - 副标题强调先核验最终接收机构，再决定考试；
   - 唯一主 CTA：Start your verification route；
   - 唯一次 CTA：Browse verified guides。
2. Hero 内不得保留大型 Route Console、完整表单或重型 SaaS wizard。Route Selector 降为轻量 Start here 卡，仅帮助用户理解：Your purpose / Who receives your proof / What to verify first，并进入完整 Route Finder。
3. Hero 紧随其后展示 trust strip，完整表达：Official-source-first、Source review status、VisaLang does not decide your individual case，并提供低干扰的 How we verify information 链接。
4. 首个主要内容区先展示成熟路线与受控指南，不先堆工具营销模块。路线卡必须从真实 contentStatus 数据读取：
   - Germany family reunion A1：Complete route；
   - Germany B1：Core route；
   - TestDaF：Starter overview；
   - 其余路线按真实数据为 Starter overview 或 Verification pending。
   不得为了版面硬编码状态、路线数或把 TestDaF 提升为 Core。
5. Latest guides 卡片必须有：标题、Direct answer、Country/Route、内容状态、Updated、Source reviewed 或 pending、reading time，且每张卡仅有一个可聚焦的主要入口。
6. How VisaLang works 使用紧凑的编号和细分隔线表达：Identify the receiving organisation → Confirm accepted proof → Compare official exam options → Verify local execution details。不要做四张 SaaS feature cards。
7. 不操作表单时，用户仍可从首页直接进入指南和路线内容；Header 的全局 CTA 不能与 Hero 主 CTA 形成同义重复。

响应式与无障碍验收：
- 375/768/1024/1440px 下，3 秒内可辨认定位、非个案决定边界、主 CTA 与指南入口；无横向滚动；
- 375px 下 Hero、trust strip、路线状态与首批内容入口不挤压成难读的标签墙；
- 状态文字完整显示且不只靠颜色；主/次 CTA 的视觉和语义层级明确；
- 单一 H1、可见 focus、键盘按 Tab 不出现重复 CTA 或无意义的卡片停靠点。

保留 canonical、hreflang、OG、JSON-LD、trailing slash 与现有 SEO 行为。补充最小必要测试或 launch-check 断言。

运行 npm test、npm run launch-check，并在 375/1440px 实际检查后报告结果。不要提交、推送或部署。
```

---

## UI-2：Guide Library，结果优先、筛选辅助

**依赖：** UI-0。若有批准的 Open Design Guide Library 稿，一并提供。

**目标：** 用户先找到适合自己的文章，再按需使用筛选。避免平板和手机把筛选面板放在内容结果之前。

### Codex 提示词

```text
使用“Codex UI 执行合同”，并读取 docs/UI_IMPLEMENTATION_BASELINE.md。改造 /guides/ Guide Library，使内容结果优先、筛选为辅助。不要改成后端筛选或重写 content collection。

主要文件通常包括：src/pages/guides/index.astro、FilterBar、SearchInput、GuideCard、guide-taxonomy、相关内联脚本、样式与测试。先确认实际实现。

必须实现：
1. H1 为 Guide library，并用一段说明明确可按 purpose、country、route 和 verification status 查找指南。
2. 大搜索框始终可见。Purpose 和 Country 是首层快捷筛选；Route、Exam、Level、Language、Content status、Sort 放入 More filters 或语义正确的 details/summary。
3. <=900px 时高级筛选默认关闭。不得只隐藏抽屉但仍让搜索、排序、筛选说明和 chips 把文章结果推离首屏。
4. 显示 Active filters、清晰的结果数量和 Clear all。筛选变化时只通过 aria-live 简洁播报结果数，不把整个列表放入 live region。
5. 筛选和排序继续使用 URL query。刷新及新窗口必须恢复同一非敏感筛选状态；不要新增敏感参数或 localStorage 声称。
6. Guide Card 只保留一个完整且可发现的键盘入口。标题链接、整卡点击、Read more 不能同时指向同一页面。状态、Country/Route、Updated、source reviewed/pending、reading time 与 direct answer 必须读取真实数据。
7. 不添加虚构缩略图或无信息价值插画。用标题层级、元信息、标签和细分隔线建立扫描效率。
8. Empty state 必须告知用户如何放宽筛选或前往 Route Finder 做官方核验准备，不得伪装成错误页。

响应式与无障碍验收：
- 375/768/900px 初始视图应在首屏或一次短滚动内看到搜索、快捷筛选、结果数和至少两条文章结果；
- 1440px 可以有窄侧栏或横向筛选，但文章列表必须是主视觉；
- 每张卡 Tab 只停靠一次；筛选可由键盘展开、选择、清除；选中和成熟度不只通过颜色表达；
- 无页面横向滚动，标签和长标题不撑破视口。

保留公开 URL、title、canonical、CollectionPage/ItemList JSON-LD 和 query 恢复语义。为默认折叠、aria-live、Clear all、单卡单焦点、query 恢复补充最小测试。

运行 npm test、npm run launch-check，并在 375/768/900/1440px 检查后报告。不要提交、推送或部署。
```

---

## UI-3：Guide Article，可信度、阅读顺序与移动端正文

**依赖：** UI-0。内容元数据迁移工作未完成时，必须使用 pending 边界而不是伪造来源状态。

**目标：** 文章首屏清楚回答“是否适用、谁决定、何时核验、下一步是什么”，同时确保 TOC、正文、来源事实表和 Related Guides 在移动端顺序一致。

### Codex 提示词

```text
使用“Codex UI 执行合同”，并读取 docs/UI_IMPLEMENTATION_BASELINE.md。实施 Guide Article 的阅读与信任 UI 改造。不要在本任务中猜测、补写或强化签证/考试/入学政策事实。

主要文件通常包括：src/layouts/GuideLayout.astro、src/layouts/ArticleLayout.astro、ArticleTOC、RelatedGuides、LastCheckedBadge、GuideCard、ZhGuideLayout、对应页面与实际样式。先确认真实路径和内容数据边界。

必须实现：
1. 页面顺序为：Breadcrumb → Content status + Country + Route → 单一 H1 → Direct answer → 元信息 → Who decides this? → On this page → 正文 → What to verify officially → Common mistakes → Next action → Related guides → Disclaimer。
2. 元信息必须清晰区分：Updated、Source reviewed 或 Official verification pending、Written by、Reviewed by role、Reading time。来源日期只能读取 sourceReviewedAt；没有 reviewed 状态时不能用 updatedDate 代替。
3. Who decides this? 必须显示最终决定机关类型、真实官方入口和 VisaLang 不做的判断。缺少 primaryOfficialAuthorityUrl 或未审核时展示 pending 与具体核验动作，不得生成机构或链接。
4. Complete/Core 页面可呈现来源事实表，列为：核验事项、谁最终决定、官方来源、本页确认范围、用户仍需确认。没有人工审核来源包时不得伪造完整事实表。
5. 用受控的步骤、核验清单、风险提示和下一步行动提高可扫描性；不要把文章全文拆成一排卡片或引入悬浮广告式推荐。
6. Related Guides 是同一旅程的下一步，不能像广告。不得让固定或悬浮元素遮挡移动端正文、来源、表单或底部行动。
7. Article JSON-LD 与可见作者/审查角色读取同一受控 frontmatter 数据，不能无条件硬编码组织作者。
8. 若中文文章仍未迁移到新的来源状态/责任链模型，保持清晰的 pending 边界并在报告中列为 BLOCKED；不能因中文入口可访问而宣称中文文章已完成可信度改造。

响应式与无障碍验收：
- 英文正文目标宽度约 55–75ch，移动端正文不小于 16px；
- 375/768px 下 TOC、正文、来源表和 Related Guides 的视觉顺序、DOM 顺序、Tab 顺序完全一致。禁止只用 grid-row 或 CSS order 让视觉顺序与焦点顺序不同；
- 不产生两份目录，其中一份隐藏但仍可聚焦；
- 来源事实表保留真实表格语义。小屏需要横向滚动时，容器可聚焦、有名称、有“可左右滚动”提示，键盘可查看全部列；
- 单一 H1、清晰 focus、无移动端横向页面滚动。

保留 Article/BreadcrumbList JSON-LD、canonical、hreflang 与 Markdown 渲染。补充最小测试，覆盖元信息来源、TOC 顺序、来源表 pending 门槛或 JSON-LD 作者数据。

运行 npm test、npm run launch-check；至少检查 Complete、Core、Starter/Pending 英文文章各一篇，以及一篇中文文章或其明确 pending 边界。不要提交、推送或部署。
```

---

## UI-4：Tools，真实状态、表单错误与安全回退

**依赖：** UI-0。

**目标：** 工具应当是编辑型的核验助手，不是 CRM wizard。步骤、错误、结果和保存策略必须真实且对键盘/读屏用户可理解。

### Codex 提示词

```text
使用“Codex UI 执行合同”，并读取 docs/UI_IMPLEMENTATION_BASELINE.md。改造 VisaLang 工具页面的 UI 状态、错误语义和移动端体验。不要接入后端、账户、邮件、支付、文件上传、追踪或额外数据收集。

阅读并按实际路径实施：src/pages/tools/route-finder.astro、checklist-generator.astro、timeline-calculator.astro、exam-comparison.astro、email-reminders.astro、ToolShell、ToolStepper、ToolResultPanel、CopyButton、PrintButton、ExportButton、相关数据模块、客户端脚本、样式和测试。

必须实现：
1. 工具首页明确说明：“This tool organises verification steps. It does not decide eligibility or certificate acceptance.” 显示覆盖边界：Germany family reunion A1 fully configured；其他路线仅 official verification guidance。
2. ToolStepper 使用真实状态：初始 Step 1，用户开始填写 Step 2，成功产生结果 Step 3；任何时刻只有一个 aria-current="step"。若某工具不能可靠表示真实步骤，移除伪进度，不要保留装饰性步骤条。
3. 所有使用 novalidate 的表单实现完整错误行为：可见 label、必填与帮助文本、aria-invalid="true"、稳定 ID 的字段错误、aria-describedby、提交后错误摘要、焦点移至第一个无效字段、修正后清除错误状态。不得只显示红色边框或红色文字。
4. 已配置 A1 结果必须按“先找谁确认 → 再确认何种语言证明 → 再核验本地执行细节”提供下一步和打印/导出能力，不能出现 Approved、Eligible 或 Guarantee 等结论。
5. 非 A1 路线安全回退必须明确 Official verification required、工具不能决定什么、应联系的机构类型、官方入口/应询问问题及 Browse relevant guides。它不能是 dead end 或普通错误页。
6. 明确每个工具的持久化策略：
   - 若使用 URL query，只存恢复结果所需的非敏感字段，并在刷新/新隐私窗口恢复；
   - 若只保存本地草稿，明确“仅保存在此设备”、提供清除动作、说明生命周期，且 URL 不暗示可分享恢复；
   - 不接收或保存护照、签证文件、报名号、支付信息等敏感资料。
7. Exam Comparison 的小屏表格必须有可聚焦、有名称的横向滚动 region，提供可左右滚动提示，保持 caption/th/td 等真实表格语义。

响应式与无障碍验收：
- 375px 下字段标签、步骤、错误摘要、字段错误、结果和按钮均不溢出；操作目标至少 44×44px；
- 使用键盘完成：一次空提交、定位第一个错误、修正后重新提交、得到 A1 结果或安全回退；
- 用 VoiceOver/NVDA 或浏览器无障碍树抽查 invalid 与具体错误、当前步骤、回退状态和表格滚动提示的朗读；
- 不让 sticky/floating 元素遮挡表单、错误、来源或正文。

新增或更新最小测试：错误语义和清除、stepper 转移、A1/非 A1 分流、存储策略的真实恢复、表格滚动容器。运行 npm test、npm run launch-check 后报告。不要提交、推送或部署。
```

---

## UI-5：Header、移动导航、Footer 与单选语义

**依赖：** UI-1 已确定首页 CTA 层级。

**目标：** 让导航像可信内容站的路径入口，而不是复杂应用导航。桌面和移动端必须只有一种当前有效的主导航模式。

### Codex 提示词

```text
使用“Codex UI 执行合同”，并读取 docs/UI_IMPLEMENTATION_BASELINE.md。改造 VisaLang 的 GlobalHeader、MobileNavigation、GlobalFooter 和首页互斥选择控件。只处理导航与单选语义，不重做全部页面视觉。

主要文件通常包括：GlobalHeader、MobileNavigation、GlobalFooter、BaseLayout、RouteSelector、相关导航数据、global.css 和实际导入的覆盖样式。先确认真实路径和现有链接结构。

必须实现：
1. Desktop Header 保持轻量、编辑型：VisaLang 品牌、Routes、Guides、Tools、About、中文入口和一个全局行动入口。禁止厚重 sticky header、全屏渐变菜单或多个同义 CTA。
2. 当前页面链接使用 aria-current="page"。Routes/About 若同时需页面链接与展开菜单，分别使用语义清晰、名称不同的 link 和 button；一个元素不得同时承担导航和展开两种行为。
3. <=900px 只显示一种有效主导航模式。打开 Menu 后显示清晰层级、当前页、中文入口和一个主要行动；关闭、Esc、焦点进入/返回和隐藏桌面导航必须可预测，不能留下重复 Tab stop 或焦点陷阱。
4. Footer 包含 Routes、Editorial Policy、Privacy、Cookie、Terms、Contact 与冷静的非官方免责声明。不得把首要信任信息全部藏到 Footer。
5. 首页 Purpose/Status 等互斥选择器使用原生 fieldset/legend + radio，或完整 ARIA radiogroup；不能再以互斥 aria-pressed 按钮模拟 radio。方向键必须能切换，选中状态不只依赖颜色。
6. 与主 CTA 不同的普通链接、官方来源链接和下一步 CTA 必须可通过文字、语义与视觉层级区分，不能只依赖颜色或图标。

响应式与无障碍验收：
- 375/768/1024/1440px 无横向滚动；桌面和移动导航不同时出现在 Tab 顺序中；
- 键盘可完成打开/关闭菜单、进入当前页、切换语言、使用 radio；focus 进入/退出菜单正确返回触发器；
- 当前页、展开状态、菜单按钮、语言入口均有可访问名称；
- 所有主要触控目标至少 44×44px；状态不只靠颜色。

保留导航路由、trailing slash、canonical/hreflang 的既有行为。为 aria-current、菜单语义、radio 语义和单一导航模式补最小测试。运行 npm test、npm run launch-check 后报告。不要提交、推送或部署。
```

---

## UI-6：样式层收敛，先映射再迁移

**依赖：** UI-1 至 UI-5 完成，且对应页面方向已获得批准。

**目标：** 消除 `global.css` 和可能存在的 `open-design.css` 或页面覆盖层之间的重复 token、冲突断点与级联不确定性。不是一次全站美化。

### Codex 提示词

```text
使用“Codex UI 执行合同”，并读取 docs/UI_IMPLEMENTATION_BASELINE.md。对 VisaLang 执行受控样式层收敛。必须先映射最终级联，后做最小迁移；不要借此重做全站视觉。

开始前：
- 阅读 src/styles/global.css、任何实际被导入的 open-design.css 或等价文件、BaseLayout 的样式导入顺序，以及首页/Guide Library/Guide Article/Tool/Header 使用的关键类；
- 区分活动规则、后置覆盖、body:has(...) 规则、媒体查询和明确失效/归档规则；
- 记录将修改的确切规则，不要根据类名猜测。

实施要求：
1. 先在 docs/STYLE_ARCHITECTURE.md 写出核心组件最终样式来源：Home Hero、Header/Mobile Navigation、Guide Card、Guide Library filters、Guide Article/TOC/source table、Tool form/stepper。每项写明 token 来源、规则文件、断点与导入顺序。
2. 确定一个单一活动 token 来源。可按 tokens.css/base.css/components.css/layouts.css/utilities.css 拆分，或保留一个已整理的 global.css。选择必须以最小改动为准；不能新增与旧 token 并存的第二套系统。
3. 每个核心 token 只有一个有效定义。处理重复的背景、正文、边框、品牌色、状态色、圆角、阴影、字体、容器宽度和间距 token；不要把来源状态和成熟度色写死在页面局部 CSS。
4. 响应式策略收敛到 375 / 768 / 1024 / 1440 的明确意图。可以保留必要的中间媒体查询，但不得继续叠加相互矛盾的临时覆盖。
5. 保持已批准的内容站视觉：纸张/暖白背景、深墨蓝/石墨文本、低饱和官方蓝行动色、细分隔线、小至中等圆角、有限阴影、正文优先。禁止紫色渐变、玻璃拟态、发光边框、blob、大圆角、厚阴影、卡片墙或金融科技 dashboard 感。
6. 不删除无法证明未使用的 legacy 样式。不能判断用途时，记录在 STYLE_ARCHITECTURE.md，作为后续独立清理任务。
7. 不改变内容数据、工具业务逻辑、SEO、路由、广告/CMP 或文案事实。

验证：
- 在 375/768/1024/1440px 检查首页、Guide Library、Guide Article、Route Finder：无横向滚动、无异常遮挡、TOC/筛选/表单/卡片无布局回归；
- 检查正常、hover、focus、visited、active、disabled、error、selected 状态，不只依赖颜色；
- 运行 npm test、npm run launch-check；
- 输出 token/规则迁移映射、保留和移除的规则及理由、断点矩阵、截图或浏览器检查证据。

不要提交、推送或部署。
```

---

## UI-7：最终 UI 回归与交接

**依赖：** 已执行的 UI 工作包均通过各自验证。内容来源治理、CMP 和广告策略若未完成，必须如实报告为 BLOCKED，不得用 UI 完成掩盖它们。

### Codex 提示词

```text
对 VisaLang 已完成的 UI 改造进行最终只读回归验收。除非发现构建阻断、严重无障碍故障、页面横向溢出、焦点顺序错误、误导性来源状态或路由/SEO 回归，否则不要再修改源码；先报告问题，等待确认范围。

阅读：CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md、docs/UI_IMPLEMENTATION_BASELINE.md、docs/STYLE_ARCHITECTURE.md（如存在）以及本窗口 diff。

运行 npm test 与 npm run launch-check，并检查：
1. 页面：首页、/guides/、Complete/Core/Starter 或 Pending 英文文章、中文入口与中文文章边界、Route Finder、Exam Comparison、Privacy/Cookie。
2. 四个断点：375、768、1024、1440px。确认无页面横向滚动，首要内容没有被 Header、TOC、悬浮推荐、Cookie/广告或固定 CTA 遮挡。
3. 首页：用途、官方边界、一个主 CTA、指南入口和路线成熟度在首屏可理解，不需要填写表单才能开始。
4. Guide Library：搜索和快捷筛选易发现，<=900px 高级筛选默认关闭，至少两条结果可见，卡片单焦点，aria-live 只播报结果数。
5. Guide Article：单一 H1，Updated 与 Source reviewed/pending 未混用，TOC DOM/视觉/Tab 顺序一致，来源表语义和移动横向访问正确。
6. Tools：键盘空提交时有错误摘要、invalid 语义、具体错误和焦点移动；修正后错误清除；A1 与其他路线能力边界不同且真实；stepper 不伪造进度。
7. Navigation：当前页 aria-current、移动菜单焦点与关闭、radio 方向键和窄屏表格均可访问。
8. SEO：canonical、hreflang、Open Graph、JSON-LD、sitemap、trailing slash 和既有重定向无明显回归。
9. 边界：没有新增未经批准的广告、CMP、追踪、支付、邮件、上传、人工审核或政策承诺。

创建或更新 docs/UI_IMPLEMENTATION_HANDOFF.md，记录：已完成工作包、每项验证、发现的问题、BLOCKED 项、四个断点检查、键盘/辅助技术检查、剩余的内容来源/CMP 风险。同步更新 docs/TASK_LOG.md，且不能把 BLOCKED 或未验证事项写为完成。

最后输出：PASS / FAIL / BLOCKED 项、证据、运行命令结果和建议的下一步。不要提交、推送或部署。
```

---

## 给 Codex 的验收速查表

| 维度 | 必须能证明的结果 |
|---|---|
| 定位 | 页面像可信内容与核验导航站，不像 SaaS dashboard 或移民中介广告页。 |
| CTA | 每页一个主 CTA；次 CTA 不同义、不重复、不抢占内容。 |
| 数据 | 成熟度、来源核验、更新日期、作者/审查角色来自真实数据；不硬编码，不混用日期。 |
| 375px | 无页面横向滚动；首要内容、错误、来源、表单和正文不被遮挡。 |
| 键盘 | 可见顺序 = DOM/Tab 顺序；无重复卡片焦点、焦点陷阱或隐藏导航停靠点。 |
| 状态 | 成熟度、错误、筛选、步骤和当前页不只靠颜色，有完整文本与可访问语义。 |
| 工具 | A1 是唯一配置路线；其他路线为安全核验回退，不输出个案判断。 |
| 文章 | 单一 H1；TOC 顺序正确；来源表有语义；正文可读；Related Guides 是下一步而非广告。 |
| CSS | 先确认最终级联；不叠加新的 token/断点系统；最后才做样式收敛。 |
| 验证 | `npm test`、`npm run launch-check`、四断点浏览器检查、键盘检查、必要辅助技术抽查。 |
