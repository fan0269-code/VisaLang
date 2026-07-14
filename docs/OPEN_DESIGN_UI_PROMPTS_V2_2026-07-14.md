# VisaLang Open Design UI 提示词 V2

> **用途：** 本文件交给 **Open Design** 生成高保真 UI 设计稿，并在确认方向后直接落地到现有 Astro 源码。
>
> **后续分工：** Open Design 负责视觉设计、响应式状态和首轮 UI 代码实现；Codex 仅在明确需要时进行独立的只读代码审查并报告发现。任何由 Codex 执行的修复、测试补强或代码修改，都必须获得单独明确授权，不由本提示词预授权。不要让任一工具自行设定数据、政策、隐私策略或产品能力。
>
> **使用方式：** 先把“0. 设计与实现总合同”连同某一个页面提示词一起发送给 Open Design。一次只处理一个页面/系统，按：首页 → Guide Library → Guide Article → Route Finder → 其余工具 → 全站导航与 Token 的顺序推进。

---

# 0. 设计与实现总合同

> 每次都把这一段与具体页面提示词一并发送。

```text
你正在为 VisaLang 完成高保真网页 UI 设计，并将已确认的设计直接实现到现有 Astro 源码。先输出设计方向与 1440/768/375px 效果图，再以最小范围修改 src/ 中的相关页面、组件、布局和样式。不要重写无关页面，不要写新的后端或产品能力，不要发明政策事实、专家身份、价格、考试日期、签证结论或广告/CMP 方案。

产品定位：
VisaLang 是一个双语（英文/中文）语言证明核验导航站。用户准备签证、家庭团聚、居留、入籍、大学申请、工作或职业注册时，VisaLang 帮他们按正确顺序行动：
1. 找到最终接收语言证明的机构；
2. 确认该机构当前要求与接受范围；
3. 比较官方考试选项；
4. 最后才核验本地考点、报名、证件、费用、日期、成绩和材料。

产品边界：
- VisaLang 不是政府机构、考试主办方、律所、移民顾问、大学录取机构或考试报名平台；
- 它不决定个案资格、豁免、证书接受、签证结果、费用、日期或成绩；
- Germany family reunion A1 是当前唯一的 Complete route；Germany B1 是 Core route；TestDaF 是 Starter overview；其他路线只能是 Starter overview 或 Verification pending；
- Content status、Updated、Source reviewed、Official verification pending 是不同概念，设计不得混淆；
- 不要用“approved”“guaranteed”“expert legal advice”“fast-track visa”等承诺性文案。

设计读法：
这是一个信任优先、编辑型、公共服务感的内容网站。用户必须在 3 秒内看懂站点用途、官方边界、当前主行动和内容入口。视觉像高质量公共信息服务、大学申请资源中心或专业编辑部，不像 SaaS dashboard、AI 工具 landing page、金融科技界面或移民中介广告页。

视觉方向：
- 气质：冷静、可信、清楚、有编辑感，不花哨；
- 主体：暖白或低饱和纸张背景，深墨蓝/石墨正文，低饱和官方蓝作为唯一主要行动色；
- 字体：英文可用成熟但克制的 serif display 搭配高可读 sans-serif 正文；中文使用 Noto Sans SC 或等效高可读字体。不能让字体风格压过信息；
- 组件：以细分隔线、排版层级、元信息与状态标签组织内容。卡片只用于真正可点击的路线、文章或工具入口；
- 圆角：6-10px，阴影非常有限；
- 密度：中等偏高，避免大面积空洞留白；文章正文优先；
- 动效：默认极弱或无。无需展示复杂动画、炫技滚动或悬浮特效；
- 视觉禁区：紫色渐变、玻璃拟态、发光边框、装饰 blob、漂浮圆球、emoji、厚阴影、彩色圆形 icon、三栏 SaaS feature cards、金融科技指标卡、复杂仪表盘。

信息与 CTA 原则：
- 每页只能有一个最强主 CTA；次 CTA 必须是不同任务，不能同义重复；
- 普通正文链接、官方来源链接、下一步 CTA、全站 CTA 需要明确的视觉层级；
- Complete route / Core route / Starter overview / Verification pending 必须用完整文字及非颜色线索表达；
- 不能把 Starter/Pending 设计成看起来可提供个案结论的“完整工具路线”；
- `Updated` 与 `Source reviewed` 必须各自有位置和标签；来源未核验时展示 `Official verification pending`，不能拿更新时间冒充来源核验日期。

无障碍与响应式设计要求：
- 必须同时输出 1440px desktop、768px tablet、375px mobile；移动端是重新排序信息，不是把桌面压窄；
- 375px 不允许页面横向滚动，正文、标签、表单错误、来源、按钮不能溢出或互相遮挡；
- 触控目标至少 44×44px；正文至少 16px；
- 正文、元数据、链接与状态文字对比度至少 4.5:1；组件边界、图标、focus ring 与非文本状态至少 3:1；
- focus、selected、error、status 不只依赖颜色；
- 除 375px 截图外，还要标注约 320 CSS px / 400% 浏览器缩放时的重排意图：不丢内容、不要求双向页面滚动、控件仍可操作；
- 设计需要标注键盘焦点顺序、折叠/展开逻辑、错误状态、空状态与移动端信息优先级；移动菜单打开时，背景页面不可获得焦点，焦点约束在菜单与关闭控件内，关闭后返回触发器；
- 不设计会遮挡正文、官方来源、表单或错误信息的 floating CTA、悬浮推荐、广告或聊天入口。

交付与实现格式：
1. 先给出一句“Design thesis”，描述本页服务的用户任务和视觉气质；
2. 输出 1440 / 768 / 375 三个断点的高保真设计稿；
3. 标注信息层级、主/次 CTA、所有状态标签、组件复用与折叠行为；
4. 对关键组件输出至少 default / hover / focus / selected / disabled（如适用）/ error（如适用）状态；
5. 设计确认后，直接实现到现有 Astro 源码。开始前读取 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、目标页面/组件/布局、现有测试和实际生效的样式导入顺序；先运行 git status --short --branch，不能覆盖已有无关改动；
6. 仅修改任务直接涉及的 `src/pages/**`、`src/components/**`、`src/layouts/**`、`src/styles/**`、最小必要 `tests/**`、`docs/**` 与必要 `public/**` 文件。未经单独明确授权，不得修改 `src/data/**`、`src/content/**`、`src/content.config.ts`、URL query 状态、localStorage、Cookie、同意管理或任何既有持久化/隐私行为；UI 必须消费现有数据与状态，而不是重写它们；
7. 不得修改 legacy HTML/CSS/JS、dist/、.astro/、node_modules、部署文件或 package-lock.json。保持 trailing slash、单一 H1、canonical、hreflang、Open Graph、JSON-LD、sitemap 和现有路由行为；不得为实现效果引入新依赖、CMS、广告、CMP、追踪、支付、上传、邮件或账户；
8. 实现后运行 npm test 和 npm run launch-check，并在 375 / 768 / 1024 / 1440px 做浏览器检查。报告修改文件、断点检查、测试结果、未解决的内容/来源/隐私 BLOCKED 项。不要提交、推送或部署。
```

---

# Prompt 1：首页，先理解再行动

```text
请遵守“设计与实现总合同”，设计 VisaLang 首页。

本页唯一目标：不要求用户填写表单，也能在首屏快速理解“这是核验语言证明要求的网站”“VisaLang 不做个案决定”“我可以开始核验路线，也可以先读指南”。

现有问题：
- Route Console、多个相近 CTA 和工具入口让首页像 SaaS onboarding；
- 官方来源优先、来源复核状态、内容成熟度和编辑责任等真正的信任信号不够突出；
- 用户不知道先填工具、看指南还是点顶部入口；
- Complete/Core 与 Starter/Pending 路线没有明显差异。

请按以下结构设计：

1. Header
- 左侧 VisaLang wordmark；
- 导航：Routes、Guides、Tools、About；
- 中文入口；
- 只保留一个全站行动入口，不与 Hero 主 CTA 同义；
- 当前页、下拉入口与展开状态清楚；
- Header 轻量，桌面高度克制，不用厚重 sticky bar。

2. Hero
- eyebrow：Official-source-first；
- H1：Find the right language proof before you book an exam；
- 副标题：强调先确认最终接收机构，再决定考试；
- 唯一主 CTA：Start your verification route；
- 唯一次 CTA：Browse verified guides；
- 不放大型路线表单、dashboard、统计指标或复杂 Wizard；
- Hero 右侧或下方仅放一张轻量 Start here 卡，内容为：Your purpose / Who receives your proof / What to verify first / 进入完整 Route Finder；
- 该卡应像“下一步说明”，不是表单控制台或营销 feature card。

3. Trust strip
Hero 后紧接一个低高度、易扫描的信任带，完整呈现：
- Official-source-first；
- Source review status；
- VisaLang does not decide your individual case；
- 一个低干扰链接：How we verify information。

4. Featured routes
将路线按成熟度展示，不把它们做成等权营销卡：
- Germany family reunion A1：Complete route；
- Germany B1：Core route；
- TestDaF：Starter overview；
- Other routes：Starter overview 或 Verification pending；
每项必须有完整状态文字、简短说明和一个明确但不越界的下一步。Complete/Core 可以引导受控路线/指南；Starter/Pending 应导向官方入口、指南或核验准备，不表现为能得到个案答案。

5. Latest guides
展示 3-4 篇文章，用编辑型列表或克制的可点击卡片。每项显示：标题、一句 Direct answer、Country/Route、Content status、Updated、Source reviewed 或 Official verification pending、Reading time，以及一个唯一点击入口。
这个区块不得统称为“verified”，除非只展示 `reviewed` 内容。若同时展示 reviewed 与 pending 内容，使用中性的 `Latest guides` 标题，并让每张卡片以同等清晰度呈现真实来源状态。
不要用无意义缩略图、彩色图标圆圈或大面积卡片背景。

6. How VisaLang works
用紧凑的步骤与细分隔线表达：
Identify the receiving organisation → Confirm accepted proof → Compare official exam options → Verify local execution details。
不要做四个等宽 SaaS 功能卡。此区块要像行动顺序说明，而不是产品功能介绍。

7. Footer
展示 Routes、Editorial Policy、Privacy、Cookie、Terms、Contact 和克制的非官方边界。不要把关键可信度信息全部藏到 Footer。

断点要求：
- 1440px：Hero 可以采用左文案、右侧 Start here 卡的非对称编辑布局；信息紧凑且主行动清楚；
- 768px：将 Hero 与 Start here 卡改为清晰的垂直阅读顺序；路线状态和 trust strip 不能挤成一行；
- 375px：Hero、边界、主 CTA、指南入口和至少一个路线状态在一次短滚动内可见；不操作表单也可开始阅读；无横向滚动；
- 说明桌面/移动端 Header 的折叠策略、当前页状态与 CTA 层级。

不要加入任何虚构的用户评价、品牌 Logo 墙、专家背书、统计数字、倒计时、广告、支付、证件上传或人工审核服务。
```

---

# Prompt 2：Guide Library，先看文章，再使用筛选

```text
请遵守“设计与实现总合同”，设计 VisaLang 的 Guide Library 页面。

页面职责：这是按国家、目的、路线和核验状态帮助用户找到语言证明指南的内容库，不是普通博客列表，也不是复杂的内容管理后台。

用户要立刻知道：
- 哪篇文章适合自己的国家与目的；
- 它是 Complete route、Core route、Starter overview 还是 Verification pending；
- 来源是否已核验；
- 下一步该读什么。

现有问题：
- 搜索、顶部筛选和侧边筛选重复；
- 平板/移动端筛选默认展开，把文章结果推到首屏以下；
- 已选条件、结果数和清除路径不够明显；
- Guide Card 有可能产生重复点击/重复焦点；
- 内容扫描效率不够高。

请设计：

1. 页面头部
- H1：Guide library；
- 一句说明：Find a guide by purpose, country, route and verification status；
- 可显示指南数量、内容最近更新和来源复核说明，但必须明确 Updated 与 Source reviewed 不是同一件事；
- 一个始终可见、清晰的大搜索框。

2. 筛选层级
- 第一层快捷筛选只保留 Purpose、Country；
- 快捷筛选使用清晰 chips 或等价控件，但状态不只用颜色；
- Route、Exam、Level、Language、Content status 与排序放入 More filters；
- `More filters` 在 768px 与 375px 默认关闭；
- 显示 Active filters、结果数和 Clear all；
- 需要展示筛选变化后的结果数通知逻辑，但不要让设计变成一整排复杂控件。

3. Guide Card / Article row
每项必须展示：
- 标题；
- 一句话 Direct answer；
- Country 与 Route；
- Content status 的完整文字；
- Updated；
- Source reviewed 或 Official verification pending；
- Reading time；
- 一个唯一、完整、易发现的点击入口。

不要为标题、整张卡、Read more 同时设计三个指向相同文章的入口。不要用虚构缩略图。优先采用高密度、编辑型的排版和细分隔线，使用户能快速扫描多条指南。

4. Empty state
设计“没有匹配文章”的状态：告诉用户可以清除部分筛选，或使用 Route Finder 准备官方核验。它不能像报错页、404 或销售引导。

断点要求：
- 1440px：可以使用窄侧边筛选或横向筛选条，但文章列表必须占主视觉；
- 768px：高级筛选默认关闭，初始可看到搜索、快捷筛选、结果数和至少两篇文章；
- 375px：搜索、快捷筛选、结果数及至少两篇文章在首屏或一次短滚动内可找到；标签、长标题和按钮不能造成横向滚动；
- 标注 More filters 的展开/关闭、Active filters、Clear all、键盘焦点和 aria-live 结果反馈意图。

输出 article card 的 default、hover、focus、selected filter、empty-state 与 mobile-stack 状态。不要设计任何虚构的搜索建议、推荐数据、广告位或后台管理功能。
```

---

# Prompt 3：Guide Article，谁决定、何时核验、下一步做什么

```text
请遵守“设计与实现总合同”，设计 VisaLang 的 Guide Article 页面。

页面涉及语言考试、家庭团聚、签证、居留、入籍、大学申请和职业路径等高风险信息。它必须帮助用户理解适用范围、最终决定机构、来源核验边界和下一步，而不是看起来像法律/签证结论。

读者打开文章首屏时，必须快速获得：
- 这篇文章是否适用于我；
- 谁最终决定；
- 内容是什么成熟度；
- 信息何时编辑更新、何时来源复核；
- 我现在该做什么。

请按以下阅读顺序设计：

1. Breadcrumb；
2. Content status + Country + Route；
3. 单一 H1；
4. 一句 Direct answer；
5. 元信息：Updated、Source reviewed 或 Official verification pending、Written by、Reviewed by role、Reading time；
6. Who decides this?；
7. On this page（TOC）；
8. 正文；
9. What to verify officially 来源事实表；
10. Common mistakes；
11. Next action；
12. Related guides；
13. Disclaimer。

设计重点：
- `Updated` 和 `Source reviewed` 绝不能合并成一个日期或一个 badge；来源尚未复核时，明确显示 Official verification pending；
- `Who decides this?` 要展示最终决定机构类型、官方入口以及 VisaLang 不做的判断。若无来源，不要设计假机构、假 URL 或“已核验”外观；
- 来源事实表应帮助用户扫描，不是 URL 堆砌。列为：核验事项、谁最终决定、官方来源、本页确认范围、用户仍需确认；
- 正文使用步骤、核验清单、风险提示和清晰段落节奏，避免长段落墙，也避免把每一段都装进卡片；
- 普通链接、官方来源链接和 Next action 需要有不同视觉等级；
- Related guides 要像旅程下一步，不像广告或推荐位；
- 不使用 sticky 推荐、浮动 CTA 或任何遮挡移动端正文的元素。

TOC 与表格：
- 1440px 可以是正文旁的可见目录，但它不应抢占文章阅读；
- 768px 与 375px 下，TOC 必须按自然阅读顺序进入正文前，不能只在视觉上搬动而键盘顺序仍在正文后；
- 不能出现一份桌面 TOC 与一份隐藏但仍可聚焦的移动 TOC；
- 来源事实表在小屏可转为可滚动表格或可访问的分组，但必须保留“谁决定/来源/用户仍需确认”的对照关系；
- 英文正文每行约 55-75 字符，移动正文不小于 16px。

断点要求：
- 1440px：清楚的文章主列、克制目录列、来源表和 Related guides；
- 768px：元信息不挤成一行，TOC 回到文章流中；
- 375px：首屏显示状态、标题、Direct answer 和来源责任；所有元信息可读；来源表不造成页面横向滚动；
- 标注 DOM/视觉/键盘焦点顺序必须一致的意图。

输出完整文章头部、TOC、来源事实表、Related guides、免责声明的 default / focus / mobile 状态。不要虚构作者资历、官方来源、政策事实或服务承诺。
```

---

# Prompt 4：Route Finder，可信工具而不是资格判定器

```text
请遵守“设计与实现总合同”，设计 VisaLang 的 Route Finder 工具页。

工具定位：Route Finder 只帮助用户组织核验顺序，不决定签证资格、考试接受范围或证书有效性。

当前能力边界：
- Fully configured：Germany family reunion A1；
- Other routes：只能显示 Official verification required 与官方核验准备，不能冒充个案结论。

目标：降低表单焦虑，真实表达工具能力，使步骤、输入、错误、结果和保存策略可预期。页面要像编辑型可信工具，不像 CRM、复杂 SaaS wizard 或报名表单。

请输出以下五种完整页面状态，每一种都需要 desktop 与 375px mobile：

A. 初始状态
- H1：Find your verification starting point；
- 说明：This tool organises verification steps. It does not decide eligibility or certificate acceptance；
- 明确 Coverage notice：Fully configured: Germany family reunion A1；
- 三步状态：Understand the scope / Enter verified facts / Review and export；
- 初始状态只能显示第一步为当前，不要伪造用户已完成进度；
- 说明用户需要准备哪些非敏感信息。

B. 填写状态
- 每个字段有可见 label、必填标记、简短帮助和示例；
- Application location 与 Target submission date 要说明为什么询问；
- 主 CTA：Generate my verification checklist；
- 用清晰分组与排版节奏组织输入，不用堆叠厚重卡片；
- 不索取护照、签证材料、报名号、支付信息或其他敏感资料；
- 用户开始输入后，才将第二步表现为当前。

C. 校验错误状态
- 顶部有简短错误摘要；
- 每个无效字段旁显示具体文字错误；
- 设计需要明确对应 aria-invalid、aria-describedby、焦点跳转到第一个错误字段的实现意图；
- 错误不只用红色，修正后错误状态应可清除；
- 视觉应清楚但不制造焦虑。

D. 已配置路线结果
- 仅用于 Germany family reunion A1；
- 第三步为当前；
- 展示行动顺序：先找谁确认、再确认什么语言证明、再核验哪些本地信息；
- 提供 Next actions、打印/导出核验清单的入口；
- 不出现 Approved、Eligible、Guaranteed、You qualify 等个案结论。

E. 未配置路线的安全回退
- 清晰标题：Official verification required；
- 解释工具不能决定什么；
- 指出用户应联系的机构类型、官方入口和应询问的问题；
- 提供 Browse relevant guides；
- 页面不能像错误页或 dead end，也不能和 A1 已配置结果使用相同的成功视觉。

保存与隐私：
- 本次设计与实现必须沿用现有、已批准的 URL query、localStorage 或其他隐私/持久化行为，不得自行新增、移除、修改或重新表述这些行为；
- 若现有行为与设计任务不清楚或无法验证，停止设计相关控件与文案，并报告 BLOCKED。不要用“输入仅用于生成本页”“仅保存在此设备”“可分享”等新的声明代替事实；
- 只有当产品负责人另行提供唯一、已批准的策略与文案时，才设计对应状态：可分享链接必须可在新窗口恢复且不含敏感信息；本地草稿必须明确“仅保存在此设备”并提供清除入口；
- 不要自行设计 Cookie/CMP 弹窗、广告位或追踪授权流程。

响应式与无障碍：
- 375px 下步骤、字段、错误摘要、结果、按钮和导出入口都不溢出；
- 触控目标至少 44px；
- 标注每一步当前态、字段 focus、error、disabled、success/fallback 状态；
- 不用颜色单独区分 A1 配置结果与安全回退；
- 不让固定元素、悬浮操作或广告遮挡表单和错误。
```

---

# Prompt 5：其余工具页面的统一状态与无障碍语言

```text
请遵守“设计与实现总合同”，为 VisaLang 其余四个现有工具设计一套统一但不 SaaS 化的 UI 状态系统：Checklist Generator、Timeline Calculator、Exam Comparison、Email Reminders。

工具共同边界：它们只帮助用户组织核验、比较或提醒步骤，不决定资格、证书接受、签证结果、考试费用、日期、成绩或任何个案结论。不要设计账户、支付、邮件真实发送、文件上传、广告、追踪、Cookie/CMP 或后台管理功能。

请输出每个工具的 desktop、375px mobile，以及至少 default / filling / validation error / generated result 或 verification-required fallback 状态。

共同设计要求：
- 统一使用可见 label、必填标记、字段帮助、具体错误文字、错误摘要、focus/error/disabled 状态；错误不只用红色；
- 步骤条只有在确实存在可验证状态时使用。初始、填写、结果状态必须不同；无法真实表达时不要设计伪进度；
- 错误状态标注：焦点移至首个错误字段，aria-invalid 与 aria-describedby 的实现意图，修正后错误清除；
- 不设计未经批准的本地保存、分享链接或恢复功能。若需要说明，仅标注“等待产品确认存储策略”；
- 375px 下字段、错误、结果、按钮和表格不溢出，不被固定元素遮挡，主要触控目标至少 44px；
- 设计键盘阅读顺序与视觉顺序一致，状态不只通过颜色表达。

专项要求：

1. Checklist Generator
- 设计为清晰的核验清单生成与打印/导出准备界面；
- 结果按“先联系谁、确认什么、再完成什么本地步骤”排序；
- 未配置路线显示 Official verification required 与相关指南入口，不像死路或错误页。

2. Timeline Calculator
- 清晰区分用户输入的目标日期、工具计算的计划节奏和必须由官方确认的真实截止日期；
- 不把计算结果设计成官方处理时间、预约保证或签证结果预测；
- 结果页应说明这是准备时间线，而不是机构承诺。

3. Exam Comparison
- 比较项目使用真实列标题和范围，不用虚假评分、进度条或“最佳选择”徽章；
- 375px 下设计一个可聚焦、有可访问名称、带“左右滚动查看全部列”提示的表格容器；
- 保留表头与单元格的关系，不将表格拆成失去比较关系的卡片墙；
- 比较结论必须导向官方核验，不做推荐性资格判断。

4. Email Reminders
- 仅设计提醒计划/导出日历文件的准备体验，不设计已经发送真实邮件、账户订阅或通知服务；
- 明确用户仍需自行确认官方日期；
- 任何“已生成提醒”都不得暗示邮件已发送或日历已保存，除非后续功能真实实现。

在结尾输出每个工具的组件复用、错误状态、空/回退状态和移动表格策略，然后直接实现已确认设计。实现时只修改对应 Astro 页面、共享工具组件、最小必要样式与测试；运行 npm test、npm run launch-check，并报告所有验证结果。
```

---

# Prompt 6：全站 Header、移动导航、Footer 与 Token Sheet

```text
请遵守“设计与实现总合同”，为 VisaLang 设计可复用的 Header、Desktop Navigation、Mobile Navigation、Footer 和基础 Design Token Sheet。

这不是一次视觉重启。目标是建立一套轻量、编辑型、可访问的导航和 token 系统，让页面像可信信息站，支持首页、Guide Library、Guide Article 和工具页。

现有问题：
- 顶部项目较多，Routes/About 可能同时承担页面链接与展开行为；
- 全局 CTA 容易与首页 Hero CTA 同义重复；
- 当前页状态不稳定；
- global.css 与 open-design.css 等样式层可能存在多套 token、组件和断点覆盖；
- 网站不应像 SaaS 应用。

请设计：

1. Desktop Header
- VisaLang wordmark；
- Routes、Guides、Tools、About；
- 中文入口；
- 一个全站行动入口；
- 明确当前页状态；
- 当 Routes 或 About 同时需要页面和展开内容时，视觉上区分页面链接与展开 button，不能让一个元素承担两个冲突动作；
- Header 高度克制，不做厚重 sticky bar、渐变背景或多层工具栏。

2. Mobile Navigation
- 清晰的 Menu 入口；
- 打开后展示导航层级、当前页、中文入口和一个主要行动；
- 设计焦点进入、关闭、Esc、返回触发器的意图；菜单打开时背景页面不可获得焦点，焦点只在菜单与关闭控件内流动；
- 不能把桌面导航隐藏在视觉上却保留为移动端重复焦点；
- 不做花哨全屏渐变菜单、浮动球或复杂转场。

3. Footer
- Routes、Editorial Policy、Privacy、Cookie、Terms、Contact；
- 一段简洁、易读的非官方免责声明；
- 不把“官方来源优先/不决定个案”这类首要信任信息只放在 Footer。

4. Token Sheet
请给出可实施 token，并标注用途而不是只给颜色板：
- background/paper、surface、ink、muted text、official blue、border；
- complete/core/starter/pending、success/warning/error 的状态系统，状态必须有文字/图形/边框等非颜色表达；
- display、body、metadata 字体层级，含中英文兼容策略；
- 4px 或 8px spacing 系统；
- 小/中两级圆角（6-10px）；
- 有限阴影；
- 375 / 768 / 1024 / 1440px 响应式策略；
- link、visited、hover、focus、active、disabled、selected、error 的状态规范；
- focus ring 要在浅色和状态背景上可见。

约束：
- 不创建紫色渐变、玻璃拟态、发光、厚阴影、大圆角、图标圆圈或 dashboard token；
- 不让每一个区块都变为白色卡片；
- 不要用纯颜色表达状态；
- 设计应服务“官方来源优先、路线核验、下一步行动”，而不是展示产品炫技；
- 不添加 dark mode，除非现有产品已有明确需求。此网站当前设计方向以高可读的浅色编辑型界面为主。

输出：1440px Desktop Header、375px Mobile Menu、Footer、Token Sheet、各导航/按钮/状态组件的 default-hover-focus-selected-disabled 状态。确认方向后直接在现有 Astro 源码中实现导航、状态和 token 方案，并运行 npm test、npm run launch-check 后报告。
```

---

## Open Design 输出验收清单

在接受任何一份设计稿前，逐项检查：

- [ ] 三秒内能辨认页面的用户任务、官方边界和主行动；
- [ ] 只有一个最强主 CTA，其他 CTA 任务不同；
- [ ] Complete/Core/Starter/Pending 有完整文字与非颜色表达；
- [ ] Updated 与 Source reviewed/pending 没有混用；
- [ ] 页面像可信内容站，不像 dashboard、SaaS onboarding 或移民中介广告；
- [ ] 没有紫色渐变、玻璃拟态、blob、厚阴影、彩色图标圆圈、卡片墙或无意义装饰；
- [ ] 1440 / 768 / 375 三个断点都有明确且不同的信息优先级；
- [ ] 375px 无横向布局，正文、标签、表单、来源、错误与 CTA 不遮挡；
- [ ] 文章页 TOC/正文/来源表的阅读与键盘顺序设计一致；
- [ ] Guide Card 只有一个主要点击入口；
- [ ] 筛选有默认收起、结果数、Active filters、Clear all 与空状态；
- [ ] 工具页区分 A1 已配置结果与其他路线安全回退，不产生资格结论；
- [ ] 错误、焦点、选中、禁用和状态均有明确设计，且不只依赖颜色；
- [ ] 没有设计未经授权的广告、CMP、支付、上传、邮件交付、人工审核或政策承诺；
- [ ] 设计说明足够让 Codex 落地，而无需自行猜测页面结构、状态、断点或组件关系。
