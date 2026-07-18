# VisaLang 改造完成后的审计与部署提示词

> **用途：** 在 Open Design 或其他实施者完成内容、UI、无障碍和样式改造后，将下方提示词交给执行代理。它先进行只读发布审计，再等待明确的部署授权与目标环境信息。  
> **原则：** 审计通过不等于已部署。没有明确目标环境和用户确认，不得推送、发布、运行服务器部署脚本或改动线上环境。

```text
你正在为 VisaLang 执行“改造完成后的发布审计与受控部署”。

目标：先确认当前改动是否真的满足 VisaLang 的内容可信度、UI、无障碍、SEO、隐私边界和静态构建要求；只有在所有发布阻塞问题关闭、部署目标明确且收到明确授权后，才使用项目已有部署流程发布。

# 0. 不可违反的产品与安全边界

VisaLang 是官方来源优先的语言证明核验导航站，不是政府机构、考试主办方、律所、移民顾问、大学录取方或报名平台。

- 不得把 updatedDate 作为官方来源核验日期；“Official sources last checked”只能来自 sourceReviewedAt，且仅在 sourceReviewStatus === 'reviewed' 时显示。
- Germany family reunion A1 是唯一 fully configured 路线；其他路线必须保留 Official verification required / verification-pending 边界，不能输出个案资格、豁免、证书接受、签证结果、费用、日期或成绩结论。
- 不得虚构官方来源、作者/审查人身份、专家资质、广告合规、Cookie/CMP 同意、支付、邮件发送、文件上传、人工审核或服务交付能力。
- 不得修改或删除 legacy HTML/CSS/JS、dist/、.astro/、node_modules、部署文件、public/_redirects、public/_headers、robots.txt、astro.config.mjs 或 package-lock.json，除非审计发现它们是本次明确范围内的发布阻塞问题，并在报告中逐项说明。
- 不得把审计通过表述为法律、隐私、广告或移民合规认证。

# 1. 开始前的只读勘察

从 VisaLang 项目根目录执行：

1. 读取：
   - CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md；
   - docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md；
   - docs/OPEN_DESIGN_UI_PROMPTS_V2_2026-07-14.md；
   - docs/CODEX_EXECUTION_PROMPTS_2026-07-14.md；
   - docs/UI_IMPLEMENTATION_BASELINE.md、docs/UI_IMPLEMENTATION_HANDOFF.md、docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md、docs/STYLE_ARCHITECTURE.md（若存在）；
   - deploy/README.md、deploy/deploy.sh（仅阅读，尚不执行）；
   - package.json、astro.config.mjs、public/robots.txt、public/_redirects、public/_headers、scripts/launch-check.js。
2. 运行 git status --short --branch，列出已有改动、未跟踪文件和当前分支。
3. 使用 git diff --check、git diff --stat、git diff --name-only，并按本次改造范围审阅 diff。不得覆盖或回退已有无关改动。
4. 识别实际部署目标、部署方式、公开域名和必要凭据来源。不得打印、提交或在报告中暴露密钥、token、服务器地址密码或环境变量内容。

若找不到明确部署目标、发布 URL 或现有部署说明，停止在“审计报告”阶段，并标记 DEPLOYMENT_TARGET_BLOCKED。不要猜测 Vercel、Netlify、Cloudflare 或服务器命令。

# 2. 构建与自动化验证

按以下顺序运行，并完整记录每条命令的退出状态和失败摘要：

```bash
npm test
npm run build
npm run launch-check
```

要求：
- `npm test`、`npm run build`、`npm run launch-check` 全部必须通过；
- 不得用跳过、删除、test.only、test.skip、弱化断言或伪造输出让检查通过；
- 若任一命令失败，停止部署流程，定位最小根因，报告 BLOCKED。除非被明确授权修复，不修改代码。

# 3. 发布前内容与可信度审计

审阅首页、Guide Library、至少一篇 Complete、Core、Starter/Pending 英文指南、中文入口及中文文章边界、Route Finder、Exam Comparison、Privacy、Cookie、About、Editorial Policy。

逐项确认：

1. 内容与来源
- Updated 与 Source reviewed / Official verification pending 明确区分；
- 无 sourceReviewedAt 或未 reviewed 的内容不展示“Official sources last checked”；
- Starter/Pending 页面不因版式、CTA 或栏目名称而看似已核验或可给个案结论；
- 高风险页面可定位最终决定机关，或明确给出 pending 与下一步官方核验动作；
- 没有新增未验证的费用、日期、年限、资格、豁免、考试接受范围或结果保证；
- 作者、审查角色和 Article JSON-LD 使用真实受控内容数据，不虚构专家或审稿服务；
- 中文入口“可访问”不等于中文文章可信度已迁移。若中文文章仍保留旧模型，必须在报告中单列未完成边界。

2. 工具能力边界
- Route Finder 只有 Germany family reunion A1 显示已配置结果；
- 其他路线显示 Official verification required，且不是死路或普通错误页；
- 工具不暗示报名、支付、邮件发送、人工审核、文件保存、资格判断或官方结果已经发生；
- URL query、localStorage、Cookie 或持久化行为必须与现有批准行为一致。无法确认时标记 BLOCKED，不得写新的隐私声明。

3. 广告、Cookie 与隐私
- 代码中广告/第三方脚本的真实行为与 Privacy/Cookie 页面没有矛盾；
- 若 CMP/同意策略尚未经产品、广告运营、法务确认，不能宣称合规；
- 若审计发现非必要广告或追踪技术在未批准的同意策略下无条件加载，标记为 P0_DEPLOY_BLOCKER；
- 广告、固定元素、Cookie UI 或推荐组件不遮挡正文、官方来源、表单、错误和核验步骤。

# 4. UI、无障碍与响应式审计

使用本地预览或已构建站点，在 375px、768px、1024px、1440px 检查以下页面：

- `/`
- `/guides/`
- 一篇 Complete guide、一篇 Core guide、一篇 Starter/Pending guide
- `/tools/route-finder/`
- `/tools/exam-comparison/`
- `/zh/`
- `/privacy-policy/`、`/cookie-policy/`

逐项确认：

1. 全局
- 无页面级横向滚动；
- 单页一个 H1；
- Header、TOC、移动菜单、浮动元素、广告和 Cookie UI 不遮挡正文、来源、表单或错误；
- 正文至少 16px，主要触控目标至少 44×44px；
- 文本、元数据、链接与状态文本对比度至少 4.5:1，非文本状态、边界与 focus ring 至少 3:1；
- 在约 320 CSS px / 400% 浏览器缩放条件下，内容和关键操作仍可访问，不依赖双向页面滚动。

2. Guide Library
- 搜索、Purpose、Country、结果数和至少两条结果在 375/768/900px 初始状态可见或一次短滚动可见；
- More filters 在 <=900px 默认关闭；
- Active filters、Clear all、Empty state、结果数 aria-live 行为正确；
- 每张 Guide Card 只有一个主要 Tab 停靠点，没有整卡/标题/Read more 的重复链接；
- 状态和来源复核信息不只依赖颜色。

3. Guide Article
- TOC 的 DOM 顺序、视觉顺序和 Tab 顺序一致；没有隐藏但仍可聚焦的重复目录；
- 来源事实表保留真实表格语义，窄屏横向查看时有可聚焦容器、可访问名称和滚动提示；
- 文章头部的状态、适用范围、责任信息和下一步在首屏清楚可见；
- Related guides 像旅程下一步，不像遮挡正文的广告。

4. Tools 与导航
- 空提交会出现错误摘要、aria-invalid、字段错误文本、aria-describedby 和焦点移至首个错误字段；修正后错误状态清除；
- ToolStepper 仅在真实状态变化时显示，任意时刻只有一个 aria-current="step"；
- Desktop/Mobile navigation 不产生重复焦点；移动菜单打开时背景不可聚焦，Esc/关闭后焦点返回触发器；
- 当前导航项有 aria-current="page"；单选控件使用正确 radio/radiogroup 语义；
- Exam Comparison 在窄屏下可以由键盘访问全部列。

# 5. SEO、构建产物与部署前检查

审阅构建后的 dist/ 输出，但不要手工编辑 dist/。

确认：
- canonical、hreflang、Open Graph、Twitter meta、Article/Breadcrumb JSON-LD、CollectionPage/ItemList JSON-LD 无明显回归；
- 所有公开 URL 保持 trailing slash；
- `sitemap-index.xml`、sitemap 内容和 robots.txt 指向实际生产域名与正确 sitemap；
- noindex/legal/trust 页的站点地图行为与现有策略一致；
- 旧 URL 的重定向规则未被无意删除；
- 页面中没有 localhost、测试域名、设计占位文案、TODO、test.skip、test.only、空链接、断裂图片、开发调试信息或 console.log 残留；
- 不存在提交进仓库的密钥、token、证书或私有环境配置。

# 6. 发布判定

将所有发现按以下级别分类：

- P0_DEPLOY_BLOCKER：构建/测试失败；误导性来源核验或高风险政策断言；路由/SEO 严重回归；未批准广告/CMP/隐私行为；严重无障碍阻断；公开页面不可访问；密钥暴露。
- P1_RELEASE_RISK：重要断点布局问题；键盘/读屏流程缺陷；状态或 CTA 误导；重要内部链接、JSON-LD、sitemap、重定向问题。
- P2_FOLLOW_UP：不阻塞发布的视觉一致性、文案、轻微间距或可维护性事项。

只有满足以下全部条件，才可输出 AUDIT_PASS_PENDING_DEPLOY：
- 无 P0_DEPLOY_BLOCKER；
- npm test、npm run build、npm run launch-check 全部通过；
- 审计报告记录确定的 Git commit SHA（AUDITED_SHA），且审计、构建、测试和待部署源码可证明对应同一 SHA；
- 部署目标、发布 URL、回滚方式及目标映射已确认；
- 没有未经确认的广告/CMP、隐私或内容来源阻塞项；
- 已生成完整审计报告。

在这一阶段，仍然不要部署。先生成：

`docs/RELEASE_AUDIT_REPORT_<YYYY-MM-DD>.md`

报告必须包括：
- 审计时间、分支、必填 AUDITED_SHA、部署目标状态；
- 改动范围及关键文件；
- 执行命令与结果；
- 逐项审计证据；
- P0/P1/P2 发现与处理状态；
- 四断点和键盘/辅助技术检查结果；
- SEO/构建产物检查结果；
- 明确结论：AUDIT_BLOCKED 或 AUDIT_PASS_PENDING_DEPLOY；
- 推荐的发布与回滚步骤。

同步更新 docs/TASK_LOG.md，记录本次审计的实际结果。不要将 BLOCKED、未验证或待人工确认事项写成完成。

# 7. 部署授权门

仅当用户在本次对话中明确提供以下两项后，才进入部署：

1. 明确授权，例如：`批准部署到 <环境>`；
2. 明确目标环境和公开 URL，例如：`production / https://example.com`。

如果没有这两项，停止并输出：

`DEPLOYMENT_NOT_AUTHORIZED - 审计已完成，但没有明确部署目标和用户授权。`

不要自行选择环境、不要执行 deploy/deploy.sh、不要 SSH、不要推送、不要创建发布、不要修改 DNS。

# 7.1 目标映射与版本冻结门

在实际部署前，必须向用户或已批准的部署记录确认以下非敏感映射，并写入审计报告：

- 授权环境名、公开 URL、生产域名；
- 已批准的主机标识与 SSH 账户（仅记录别名或非敏感标识，不记录密码、私钥、token）；
- 该环境对应的静态站点目录与 Nginx vhost 配置文件；
- `astro.config.mjs`、`public/robots.txt`、生成 sitemap 与授权生产域名的一致性；
- 上一个可回滚发布版本标识；
- 将要部署的 AUDITED_SHA。

还必须证明“审计版本 = 部署版本”：

- 部署只能使用 AUDITED_SHA 构建出的 `dist/`，或服务器必须先检出完全相同的 AUDITED_SHA 后重新运行 `npm test`、`npm run build`、`npm run launch-check`；
- 禁止在受控发布流程中直接下载、执行或发布远端 `main` 的“最新”代码或脚本；如确有经批准的下载步骤，必须固定到 AUDITED_SHA 对应的不可变版本并验证来源；
- 工作区有未纳入审计的改动、HEAD 与 AUDITED_SHA 不一致、服务器源码版本无法证明、目标账户/目录/vhost/域名映射不清时，输出 `DEPLOYMENT_VERSION_OR_TARGET_MAPPING_BLOCKED`，不得部署。

# 8. 获得授权后的受控部署

收到明确授权后：

1. 再次执行 git status --short --branch 和 git rev-parse HEAD，确认审计后没有未审查的新改动，且 HEAD === AUDITED_SHA；
2. 确认第 7.1 节的账户、主机、站点目录、vhost、域名和回滚映射已获得批准。任一项不明确时停止；
3. 重新运行 npm test、npm run build、npm run launch-check，并确认构建产物对应 AUDITED_SHA；
4. 仅使用 deploy/README.md 与 deploy/deploy.sh 中已记录、已批准且已固定到 AUDITED_SHA 的部署流程。不要下载或发布远端 main 的最新版本，不要发明或替换部署平台命令；
5. 部署前记录回滚方式、上一个可用版本/发布标识、目标 URL、部署账户/目录/vhost 的非敏感映射和 AUDITED_SHA；
6. 执行部署，并完整记录命令状态。不得在日志或报告中暴露敏感凭据；
7. 如部署失败，立即停止，不做猜测性修复；报告失败点与可用回滚操作。只有在用户明确授权时才执行回滚。

# 9. 部署后的线上验收

成功部署后，在公开 URL 上检查：

- 首页、Guide Library、Complete/Core/Starter/Pending guide、Route Finder、Exam Comparison、中文入口、Privacy/Cookie；
- HTTP 成功状态、无明显 404/500、关键资源正常加载；
- canonical、hreflang、robots.txt、sitemap-index.xml 可访问且域名正确；
- 375px 与 1440px 无横向滚动和关键遮挡；
- Guide Library 筛选、文章 TOC、工具安全回退与关键表单错误可用；
- 生产环境没有 localhost、预发布域名、调试信息、错误堆栈或未经批准的第三方请求；
- 监测浏览器控制台和网络错误，确认无关键运行时异常。

完成后将报告更新为：

`DEPLOYED_AND_VERIFIED` 或 `DEPLOY_FAILED`。

报告中必须包含：部署时间、环境、发布 URL、必填 AUDITED_SHA/部署版本、线上检查项、失败项、回滚状态和后续建议。

不要把部署成功表述为法律、隐私、广告、移民或政策合规认证。
```
