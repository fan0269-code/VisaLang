# VisaLang Open Design UI 改造提示词集

> **用途：** 将以下提示词逐个交给 Open Design。不要一次性重做全站。建议顺序：首页 → 指南库 → 文章页 → Route Finder → 全站导航与 token。

## 0. 每次都附带的通用背景

```text
产品名称：VisaLang

VisaLang 是一个双语（英文/中文）语言证明核验导航站，面向准备签证、家庭团聚、永居、入籍、大学申请、工作或职业注册的人。

它帮助用户按正确顺序行动：先确定最终接收机构，再确认语言证明要求与接受范围，再比较官方考试选项，最后核验本地考点、报名、证件、费用、日期、成绩和材料。

VisaLang 不是政府机构、考试主办方、律所、移民顾问、大学录取机构或考试报名平台。它不会决定个案资格、豁免、证书接受、签证结果、费用、日期或考试成绩。

品牌目标：可信赖、编辑型、证据导向、温和、清晰、可引用。它应该像高质量公共服务信息站、大学申请资源中心或专业编辑部，而不是 SaaS 控制台、金融科技仪表盘、AI 工具 landing page 或移民中介广告页。

视觉规则：
- 使用暖白/纸张感背景、深墨蓝或石墨灰正文、低饱和官方蓝行动色；
- 英文标题可用成熟 serif display，英文正文用清晰 sans-serif；中文用 Noto Sans SC 或等价高可读字体；
- 圆角克制，6–10px；使用细分隔线而不是厚阴影；
- 卡片只用于真实可点击的文章、路线或工具；
- 禁止：紫色渐变、玻璃拟态、发光边框、装饰 blob、漂浮圆球、emoji、彩色 icon 圆圈、夸张大圆角、三栏 SaaS feature cards；
- 不使用大面积空洞留白；
- 不写 guaranteed、approved、expert legal advice、fast-track visa 等承诺；
- 只有一个主要 CTA；普通链接、官方来源链接、下一步 CTA 必须有明确层级；
- 正文不小于 16px，移动触控目标不小于 44px，focus/selected/error 状态清晰且不只依赖颜色；
- 同时设计 1440px desktop、768px tablet、375px mobile；移动端不是简单压缩桌面布局。
```

---

# Prompt 1：首页

```text
请设计 VisaLang 首页。先遵守“通用背景”。

首页的 3 秒目标：
1. 用户理解：这是帮助核验语言证明要求的网站；
2. 用户理解：VisaLang 不代替官方机构做决定；
3. 用户可立即开始核验路线，或浏览已整理指南。

现有问题：
- 路线选择器、多个相近 CTA 和工具入口像 SaaS onboarding；
- Official-source-first、内容成熟度、来源复核等真正的差异化证据不够突出；
- 用户不知道应该填工具、看指南还是点顶部入口；
- 成熟路线与 Starter 路线没有明显区分。

请设计：

1. Header
- 左侧 VisaLang 品牌；
- 导航：Routes、Guides、Tools、About；
- 中文入口；
- 仅一个全站级行动入口，不能与 Hero 主按钮同义重复；
- 当前页和下拉入口状态清楚。

2. Hero
- Eyebrow：Official-source-first；
- H1：Find the right language proof before you book an exam；
- 副标题强调：先核验最终接收机构，再决定考试；
- 主 CTA：Start your verification route；
- 次 CTA：Browse verified guides；
- 不放大型表单控制台；
- 只放轻量 Start here 路线卡：Your purpose / Who receives your proof / What to verify first / 进入完整 Route Finder。

3. Trust strip
紧接 Hero 展示三个信任信号：
- Official-source-first；
- Source review status；
- VisaLang does not decide your individual case；
并提供 How we verify information 低干扰链接。

4. Featured routes
- Germany family reunion A1：Complete route；
- Germany B1：Core route；
- TestDaF：Starter overview；
- Other routes：Starter overview 或 Verification pending；
每张路线卡只有一个行动，并说明内容成熟度。内容成熟度必须从实现中的 `contentStatus` 数据读取，不要在视觉稿或前端逻辑中预先硬编码；TestDaF 仅在专项内容补深、来源审计和状态复核完成后才能提升为 Core route。

5. Latest verified guides
展示 3–4 篇：标题、一句说明、Country/Route、内容状态、Updated、Source reviewed 或 Pending、阅读时间、单一点击入口。

6. How VisaLang works
用紧凑编号与细线展示：
Identify the receiving organisation → Confirm accepted proof → Compare official exam options → Verify local execution details。
不要做四张 SaaS feature 卡片。

7. Footer
展示 Routes、Editorial Policy、Privacy、Cookie、Terms、Contact；语气平静、非营销。

输出：1440px、768px、375px 高保真页面；标注 CTA 层级、菜单折叠、路线状态与信任信息位置。每个区块必须有明确任务，不要添加无意义装饰。
```

---

# Prompt 2：Guide Library

```text
请设计 VisaLang 的 Guide Library 页面。先遵守“通用背景”。

这不是普通博客列表，而是帮助用户按国家、目的、路线和核验状态查找语言证明指南的内容库。

用户要快速判断：
- 文章是否适用于我的国家与目的；
- 它是完整路线、核心决策还是 Starter；
- 官方来源是否已核验；
- 下一篇该读什么。

现有问题：搜索、顶部筛选、侧边筛选重复；平板/移动端筛选默认展开，会把文章结果推至首屏以下；文章列表扫描效率不足；已选条件不明显；卡片可能有重复链接焦点。

请设计：

1. 页面头部
- H1：Guide library；
- 说明：Find a guide by purpose, country, route and verification status；
- 显示指南数量、最后内容更新、来源复核说明；
- 始终可见的大搜索框。

2. 快捷筛选
- 默认只显示 Purpose、Country；
- 用 chips 表现；
- 高级筛选和排序放入 More filters；
- tablet/mobile 默认关闭高级筛选；
- 显示 Active filters、结果数量、Clear all；
- 筛选改变时状态明确。

3. Guide Card
- 标题；
- 一句话 Direct answer；
- Country、Route；
- Content status：Complete route / Core route / Starter overview / Verification pending；
- Updated；
- Source reviewed 或 Verification pending；
- 阅读时间；
- 一个唯一、完整、易发现的点击入口。

不要用虚构缩略图填充内容；没有真实信息价值图像时，用排版、标签和分隔线建立扫描层级。

响应式：
- 1440px 可以用窄侧栏或横向筛选，但文章列表必须是主视觉；
- 768px 高级筛选默认折叠，初始可看到至少两篇文章；
- 375px 搜索、快捷筛选、结果数和至少两篇文章在首屏或一次短滚动内可找到；
- 不出现页面横向滚动。

可访问性：筛选变化有结果计数；focus/selected 明确；每张卡只有一个主要焦点；不只靠颜色表达成熟度。

输出 desktop、tablet、mobile 三套高保真稿，标注筛选展开/收起逻辑和不同断点的信息优先级。
```

---

# Prompt 3：Guide Article

```text
请设计 VisaLang 的 Guide Article 页面。先遵守“通用背景”。

页面涉及语言考试、家庭团聚、签证、居留、入籍、大学申请、职业路径等高风险信息。页面必须帮助用户理解边界和下一步，不能看起来像在提供法律或签证结论。

用户要快速知道：是否适用、谁最终决定、来源何时核验、当前做什么、下一步读什么或去哪里确认。

请按以下顺序设计：
1. Breadcrumb；
2. Content status + Country + Route；
3. H1；
4. 一句 Direct answer；
5. 元信息：Updated、Official sources reviewed、Written by、Reviewed by role、Reading time；
6. Who decides this?：最终决定机构类型、官方入口、VisaLang 不做的判断；
7. On this page；
8. 正文；
9. What to verify officially 来源事实表；
10. Common mistakes；
11. Next action；
12. Related guides；
13. Disclaimer。

正文要求：
- 用步骤、核验清单、风险提示、来源事实表提高扫描效率；
- 避免全篇长段落；
- 来源表包含：核验事项、谁决定、官方来源、本页确认范围、用户仍需确认；
- 普通链接、官方来源、下一步 CTA 具有不同视觉等级；
- Related guides 像旅程下一步，不能像广告；
- 不允许悬浮推荐遮挡移动端正文；
- 保持单一 H1；英文正文每行约 55–75 字符；移动正文最小 16px。

移动端：TOC、正文与键盘焦点顺序一致；来源表保留可访问语义；元信息不挤成一行；首屏看得见标题、直接答案、状态与来源责任。

输出 1440px、768px、375px 高保真稿，并说明 TOC、来源表、Related guides 的响应式策略。
```

---

# Prompt 4：Route Finder

```text
请设计 VisaLang 的 Route Finder 工具页。先遵守“通用背景”。

Route Finder 不决定签证、考试或证书接受范围，只帮助用户整理核验顺序。

当前能力边界：
- Fully configured：Germany family reunion A1；
- Other routes：只显示 official verification guidance，不能冒充个案结论。

目标：降低表单焦虑；真实表达工具边界；让步骤、输入、错误、结果与保存策略可预期；做成编辑型可信工具，而不是 CRM 或复杂 SaaS wizard。

请设计五个状态：

A. 初始
- H1：Find your verification starting point；
- 说明：This tool organises verification steps. It does not decide eligibility or certificate acceptance；
- Coverage notice：Fully configured: Germany family reunion A1；
- 三步：Understand the scope（当前）/ Enter verified facts / Review and export；
- 解释需要准备哪些信息。

B. 填写
- visible labels；
- required 标识清楚；
- Application location 有示例和解释；
- Target submission date 有用途说明；
- 主按钮：Generate my verification checklist；
- 使用轻分组和清晰表单节奏，不堆厚重卡片。

C. 校验错误
- 顶部简短错误摘要；
- 每个字段旁有具体错误；
- 不仅靠红色；
- 视觉清楚但不制造焦虑。

D. 已配置路线结果
- Step 3 当前；
- 展示先找谁确认、再确认什么证明、再核验什么本地信息；
- 有明确 Next actions；
- 可导出或打印核验清单；
- 不出现“已批准”“符合资格”等结论。

E. 未配置路线安全回退
- 明确 Official verification required；
- 解释工具不能决定什么；
- 指出应联系的机构类型、官方入口、应询问的问题；
- 提供 Browse relevant guides；
- 不能像错误页或 dead end。

保存/隐私：明确输入是本地保存、可分享 URL 或不保存；若可分享，刷新和新窗口必须能恢复；不要求护照、签证文件、报名号等敏感信息。

输出 initial、filling、validation-error、configured-result、verification-required 五种状态，并展示 desktop 与 375px mobile。
```

---

# Prompt 5：全站 Header、导航、Footer 与 token

```text
请为 VisaLang 设计轻量、编辑型、可访问的全站 Header、导航、Footer 和基础 design tokens。先遵守“通用背景”。

现有问题：顶部项目较多；Routes/About 既是页面链接又有展开行为；全局 CTA 与页面 CTA 可能重复；当前页状态不稳定；样式层存在多套 token 与断点覆盖；网站应像可信信息站而不是 SaaS 应用。

请设计：

1. Desktop Header
- VisaLang 品牌；
- Routes、Guides、Tools、About；
- 中文入口；
- 一个全站行动入口；
- 当前页状态清楚；
- 下拉和直接页面链接避免同义重复；
- 不使用厚重 sticky header。

2. Mobile Navigation
- 明确 Menu；
- 打开后显示清晰层级、当前页面、中文入口和一个主要行动；
- 关闭、焦点管理清楚；
- 不做花哨全屏渐变菜单。

3. Footer
- Routes、Editorial Policy、Privacy、Cookie、Terms、Contact；
- 简洁、可读、非官方免责声明；
- 不把最重要信任信息都藏在页脚。

4. Token sheet
定义可实施 token：paper background、ink text、muted text、official blue、border、success/warning/error；display/body/metadata 排版；4px 或 8px 间距系统；小/中两级圆角；有限阴影；375/768/1024/1440 断点；focus、visited、hover、active、disabled 状态。

要求：不使用默认 SaaS 风格、紫色渐变、玻璃拟态、浮动装饰；不让每个区域像卡片；链接、按钮和状态在移动端可用；视觉服务于“官方来源优先、路线核验、下一步行动”。

输出 desktop header、mobile menu、footer 和 token sheet 高保真稿。
```

---

## 推荐使用顺序

1. Prompt 1：确认首页方向；
2. Prompt 2：确认内容库与筛选；
3. Prompt 3：确认文章信任与阅读结构；
4. Prompt 4：确认工具状态和表单；
5. Prompt 5：沉淀为导航与 token 系统。

## 每次 Open Design 输出后的验收

- 设计是否是内容/证据优先，而不是 SaaS dashboard；
- 是否只有一个最强主 CTA；
- 首屏是否可见来源责任或官方核验边界；
- 是否区分 Complete、Core、Starter、Pending；
- 是否避免紫色渐变、玻璃拟态、图标圆圈、装饰卡片网格；
- 375px、768px、1440px 是否都有合理优先级；
- 是否避免悬浮元素遮挡正文；
- 是否避免只用颜色表达步骤、错误、成熟度和选择状态；
- 是否保留 VisaLang 不做个案决定的边界；
- 是否没有加入支付、证件上传、人工审核已上线或保证结果等未授权能力。
