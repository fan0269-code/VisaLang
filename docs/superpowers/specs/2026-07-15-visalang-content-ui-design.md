# VisaLang 内容、可信度与 UI 改造设计规格

**状态：** 已完成方案确认，等待用户审阅规格后再编写实施计划。  
**范围：** VisaLang Astro 源码层的内容可信度、UI、工具交互、无障碍、SEO 审计与受控发布。  
**非目标：** 本规格不授权发布、部署、支付、账户、邮件交付、文件上传、广告/CMP 接入或政策事实编造。

## 1. 目标与定位

VisaLang 是一个官方来源优先的语言证明核验导航站。它服务于准备签证、家庭团聚、居留、入籍、大学申请、工作和职业注册的用户。

用户旅程必须遵循：

1. 确认最终接收语言证明的机构；
2. 确认该机构当前要求和接受范围；
3. 比较官方考试选项；
4. 最后核验本地考点、报名、证件、费用、日期、成绩和材料。

产品不是政府、考试主办方、律所、移民顾问、大学录取方或报名平台。它不作个案资格、豁免、证书接受、签证结果、费用、日期或成绩决定。

成功的改造应让用户在首页、指南库、文章和工具中清楚理解：适用范围、谁最终决定、内容成熟度、来源复核状态和下一步行动。

## 2. 已确认的协作模型

### Open Design：视觉和首轮 UI 实现

Open Design 负责：

- 按 `docs/OPEN_DESIGN_UI_PROMPTS_V2_2026-07-14.md` 产出 1440px、768px、375px 效果图；
- 明确布局、状态、组件复用、折叠行为、焦点和响应式策略；
- 在设计方向确认后，直接实现相关 Astro UI；
- 仅触及 `src/pages/**`、`src/components/**`、`src/layouts/**`、`src/styles/**`、最小必要 `tests/**`、`docs/**` 和必要 `public/**`。

Open Design 不得自行修改：

- `src/data/**`、`src/content/**`、`src/content.config.ts`；
- URL query、localStorage、Cookie、同意管理或既有隐私/持久化行为；
- legacy HTML/CSS/JS、`dist/`、`.astro/`、`node_modules/`、部署文件和 `package-lock.json`；
- 路由、trailing slash、canonical、hreflang、Open Graph、JSON-LD、sitemap 和重定向行为。

### Claude：内容可信度、质量门与发布控制

Claude 负责：

- 定义和审核内容成熟度、来源复核、责任链、最终决定机构、内链和 CTA 规则；
- 审查 Open Design 设计与实现是否符合内容边界；
- 独立进行无障碍、SEO、隐私、广告/CMP、代码质量和发布审计；
- 执行或协调测试、浏览器验证、版本冻结、发布门和线上验收。

### Codex：仅在明确要求时只读审查

Codex 默认只做独立只读审查并报告发现。任何由 Codex 执行的修复、测试补强或源码修改均需用户单独明确授权。

## 3. 内容数据必须先于 UI

所有**内容成熟度、来源复核、责任链和 CTA 分流状态**必须由真实内容/数据源驱动，而不是页面或 CSS 中硬编码。表单填写、错误、菜单、筛选、焦点和工具步骤必须由真实、可验证的客户端状态驱动，并沿用既有 URL query、localStorage、Cookie 与隐私边界。

### 必须统一的内容状态

- `complete-route`
- `core-route`
- `starter-overview`
- `verification-pending`

当前基线：

- Germany family reunion A1：`complete-route`
- Germany B1：`core-route`
- TestDaF：`starter-overview`
- 其他路线：`starter-overview` 或 `verification-pending`

TestDaF 不得因视觉或实现方便被提升为 Core。高风险路线只有在人工官方来源包、事实边界和来源复核完成后才能提升状态。

### 必须分开的日期和责任字段

- `publishedDate`：首次发布；
- `updatedDate`：编辑更新；
- `sourceReviewedAt`：官方来源最后核验；
- `sourceReviewStatus`：`reviewed`、`pending`、`not-applicable`；
- `reviewedByRole`：编辑、来源复核、翻译复核等真实角色；
- `author`：真实作者或真实编辑团队；
- `primaryOfficialAuthorityUrl`：最终决定机关官方入口；
- `examOwnerUrl`：考试主办方或授权考点入口。

“Official sources last checked”只能来自 `sourceReviewedAt`，且仅当状态为 `reviewed` 时显示。没有来源日期或状态不是 `reviewed` 时，页面必须显示 `Official verification pending`，不得回退使用 `updatedDate`。

### 高风险事实证据链

每个可能涉及资格、年限、费用、日期、有效期、豁免、接受范围或结果的高风险页面/路线，必须维护可审计的证据记录，作为发布门可机械核验的依据。

记录权威来源采用现有 `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`（待建）或既有 `src/data/source-review.ts` 之外的事实级索引，命名与字段需统一为：

```
high_risk_evidence:
  id: <slug>-<fact-key>          # 例：portugal-citizenship-language-requirement
  fact_or_scope: <string>
  authority_type: <string>
  authority_url: <string>
  reviewed_at: YYYY-MM-DD
  supports: [<断言列表>]
  does_not_support: [<不能支持列表>]
  reader_must_confirm: [<待用户确认>]
  reviewer_role: source-review
```

规则：

- 证据索引落地于 `src/data/high-risk-evidence.ts`，导出 `highRiskEvidenceIndex: Record<string, HighRiskEvidenceRecord>`，按 guide `slug` 索引；
- 索引可被构建脚本和测试读取；
- 高风险页面设置为 `reviewed`、`complete-route` 或 `core-route` 必须解析到至少一条完整证据记录；
- 缺少记录的页面只显示 `verification-pending` 与具体核验行动；
- `resolveGuideContentStatus` 的入参增加可选 `evidenceIds: string[]`，并新增 `withHighRiskEvidenceGate()` 包装：当 `evidenceIds` 为空或在索引中查不到时强制降级到 `verification-pending`；
- 测试锚点为 `tests/source-review-render.test.js`（已存在）或新增 `tests/high-risk-evidence.test.js`，补充一组降级矩阵 fixture：高风险指南 × 是否带证据记录 × `primaryOfficialAuthorityUrl` × `sourceReviewStatus` → 期望 `contentStatus`。

## 4. 分阶段实施顺序

### 阶段 0：基线冻结

交付：当前分支、现有改动、Astro/legacy 边界、活动样式来源、测试入口、部署映射的审计记录。

目的：避免覆盖已有工作，避免把 legacy 文件、失效 CSS 或生成目录误当成实现源。

### 阶段 0.5：隐私、广告与同意策略冻结

负责人（必须命名并保留证据记录）：

- 产品决策人：批准目标地区、CMP 决策和文案；
- 法务批准人：批准法律文案和合规边界；
- 广告运营账户负责人：批准供应商账户属性、配置和广告位控制；
- 实施人：暂停或恢复第三方脚本；
- 网络验证人：执行 `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md` 第 7 节区域网络检查；
- 发布授权人：批准部署 `AUDITED_SHA` 上线。

冻结前不得继续的前提：

- `BaseLayout.astro` 仍无条件注入任何未经批准的非必要技术；
- 广告/CMP/隐私文案与真实脚本行为不一致；
- 缺乏 section 9 列表中的命名责任人或批准证据。

恢复任一被暂停脚本的最低门槛：

- 已实施 provider-neutral gate（状态、区域、加载、撤回、版本化存储和测试钩子）；
- 产品/广告运营/法务批准书已存档；
- 在产品/广告运营/法务批准的每个目标地区全部完成 `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md` 第 7 节的 9 类网络检查（initial state、message availability、accept、reject、withdraw、persistence、tool data isolation、placement、headers/deployment）；
- 经发布授权人确认的 `AUDITED_SHA` 上线部署。

### 阶段 1：现有内容数据层差距审计与最小补齐

交付：现有 content schema、来源状态组件、文章/卡片/首页消费链路的差距报告，以及只针对已证实缺口的最小测试和实现补齐。

验收：不重建、不重命名、不回填或覆盖现有已验证字段。编辑更新时间与来源核验日期不混用；路线成熟度、作者和责任链由真实数据提供。

### 阶段 2：高风险内容边界

范围：Portugal、Spain、UK、Canada、Italy、France、Finland、Netherlands 等审计中列出的首批高风险路线。

交付：事实级来源审计表、状态降级、待人工来源包列表。收到人工来源包后，再逐页删除或来源限定无支持的资格、年限、费用、日期、有效期、豁免和接受范围断言，并记录来源支持边界与读者仍需确认事项。

验收：没有最终决定机关来源或事实级证据记录的页面不能被呈现为 Complete/Core；未审查页面只提供核验动作和官方入口。

### 阶段 3：Open Design 核心内容 UI

工作包顺序：

1. 首页：定位、单主 CTA、trust strip、成熟路线和指南入口；
2. Guide Library：常驻搜索、快捷筛选、窄屏高级筛选收起、结果数、Clear all、单焦点卡片；
3. Guide Article：内容状态、来源责任、TOC 阅读顺序、来源事实表、Related Guides；
4. 中文入口与中文文章边界：`/zh/`、语言切换、中文状态文案和窄屏信息顺序。中文内容若仍使用旧可信度模型，必须明确呈现 pending 边界，不能继承英文已 reviewed 外观。

中文路由与语言切换合同（不得由 Open Design 改动，由 Claude 在阶段 1 后维护）：

- 中英已有对应路由的页面必须维持 `hreflang`、canonical 与目标语言 URL；
- 无中文对应的英文指南点击切换时，应回退到 `/zh/` 或显式标注“该指南暂无中文版，请阅读英文原页”；
- 桌面、移动菜单、Hero 与 Footer 的语言入口行为一致；
- 不得让 UI 改造覆盖中英文映射表或 SEO alternates；
- 测试锚点收紧为 `tests/site.test.js`：① `translatedPaths` 在每个语言入口点都被使用；② 缺映射的页面 `hreflang` 不输出 zh href；③ 切换器跳转路径等于 `translatedPaths[current]` 或 fallback `/zh/`。新增或重命名为 `tests/site-routing.test.js` 时，需同步移除上文“或追加”的二义性表述。

验收：页面为可信编辑型内容站，不是 SaaS dashboard；英文和中文入口在桌面、平板、手机上均按正确的信息优先级重排；中英文切换和 SEO alternates 无回归。

### 阶段 4：工具、导航与样式系统

工作包顺序：

1. Route Finder：真实步骤、表单错误、A1 已配置结果与其他路线安全回退；
2. Checklist Generator、Timeline Calculator、Exam Comparison、Email Reminders：统一的真实状态、错误语义和移动端策略；
3. Header、Mobile Navigation、Footer、语言切换与单选语义；
4. 最后进行 token、断点与 CSS 收敛。

验收：工具不提供个案决定；移动表格、菜单、表单、错误和语言切换可由键盘和辅助技术使用；样式不形成第二套并行系统。

### 阶段 5：内容集群和内部路径

优先深化德国 A1 标杆路线，随后巩固 B1 和 TestDaF 的边界与内链。内容扩展必须以来源包可得性为条件，不按国家数量平均扩写。

### 阶段 6：独立审计与受控发布

使用 `docs/RELEASE_AUDIT_AND_DEPLOY_PROMPT.md`，审计内容、UI、无障碍、SEO、隐私、广告/CMP、构建产物和部署映射。

## 5. UI 设计与实现标准

### 视觉语言

- 暖白或低饱和纸张背景；
- 深墨蓝或石墨正文；
- 低饱和官方蓝为主要行动色；
- 细分隔线、排版层级、状态标签和元信息为主；
- 6-10px 圆角，有限阴影；
- 中等偏高信息密度，正文阅读优先；
- 无复杂动效、无玻璃拟态、无紫色渐变、无装饰 blob、无卡片墙、无 dashboard 视觉语言。

### CTA 与状态

- 每页一个主 CTA；次 CTA 必须服务不同任务；
- 完整显示 Complete/Core/Starter/Pending，不能只靠颜色；
- Updated、Source reviewed、Official verification pending 分开显示；
- Starter/Pending 不能被视觉或 CTA 包装成可得个案结论的完整路线。

### 响应式与无障碍

在 1440、1024、768、375px，以及约 320 CSS px/400% 缩放条件下验证：

- 无页面级横向滚动；
- 主要触控目标至少 44×44px，正文至少 16px；
- 文本、元数据、链接和状态文字对比度至少 4.5:1；边界、图标和 focus ring 至少 3:1；
- 键盘 Tab 顺序与可见阅读顺序一致；
- 单页只有一个 H1；
- 移动菜单打开时背景不可聚焦，Esc/关闭后焦点回到触发器；
- Guide Card 只有一个主 Tab 停靠点；
- Guide Library 在窄屏下高级筛选默认关闭，初始可看到搜索、快捷筛选、结果数和至少两条结果；
- 文章 TOC 的 DOM、视觉和焦点顺序一致；
- 来源表保留语义，窄屏横向滚动时有名称和提示；
- 表单错误具备错误摘要、`aria-invalid`、`aria-describedby`、焦点移动和修正后清除；
- 工具步骤仅在真实状态变化时显示，且只能有一个 `aria-current="step"`。

## 6. 审计与发布硬标准

任一以下问题存在时，发布结论为 `AUDIT_BLOCKED`：

- `npm test`、`npm run build` 或 `npm run launch-check` 失败；
- 误导性来源复核、无来源高风险政策断言或虚构责任身份；
- 非 A1 路线被工具呈现为已配置个案结果；
- 未批准广告/CMP/追踪或 Privacy/Cookie 文案与真实行为矛盾；
- 严重无障碍、响应式、键盘或焦点问题；
- canonical、hreflang、JSON-LD、robots、sitemap 或重定向回归；
- 审计、测试、构建和待部署版本不是同一个 `AUDITED_SHA`；
- 部署环境、公开 URL、主机/账户、站点目录、Nginx vhost、生产域名和回滚版本映射不明确；
- 没有用户在当前对话中明确给出的部署授权。

部署前必须存在审计报告，并记录 AUDITED_SHA。部署只能使用该 SHA 的构建产物，或服务器检出同一 SHA 后重新测试和构建。不得发布远端 `main` 的未审计最新版本。

## 7. 验收结果

改造完成后，用户应能够：

1. 从首页理解 VisaLang 的核验导航定位和非个案决定边界；
2. 从 Guide Library 判断文章适用性、成熟度、来源复核状态和下一篇阅读路径；
3. 从 Guide Article 理解最终决定机构、来源边界、风险和下一步；
4. 在工具中整理核验步骤而非得到未授权资格判断；
5. 在移动端、键盘和辅助技术环境下完成核心阅读、筛选和表单操作；
6. 在不牺牲内容可信度、隐私边界、SEO 或上线稳定性的前提下获得统一、清晰、编辑型 UI。
