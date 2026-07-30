# VisaLang AdSense 内容标准与整改规范

Date: 2026-07-28

## 0. 文档目的与边界

本规范用于处理 `visalang.org` 在 Google AdSense 审核中被判定为 **低价值内容** 的问题。它把 Google 官方政策基线、2026-07-27 全站 AdSense 内容审计和当前 VisaLang 项目边界，转化为后续逐页整改的执行标准。

本规范的目标不是让页面机械变长，而是让每个公开页面都能证明：

> 这个页面有清晰用户任务、独特内容价值、官方来源边界、可执行下一步，并且不是建设中、模板化、低信息量或只为广告/SEO 存在的页面。

重要边界：

- 本规范不是 Google 官方评分表。
- 本规范不能保证 AdSense 复审通过。
- Google 没有公布统一的最低文章篇数或单篇最低字数。
- 构建成功、SEO 元数据完整、sitemap 可访问或页面已索引，都不能单独证明 AdSense 内容质量达标。
- VisaLang 是官方来源优先的语言考试路径导航站，不是政府、使领馆、考试机构、大学、移民顾问、法律顾问或最终决策方。
- 所有签证、居留、入籍、录取、职业注册、考试接受性、费用、日期、考位、证书和个案结果，都必须回到有最终决定权或执行权的官方机构核验。

制定依据：

- `PROJECT_CONTEXT.md`
- `CLAUDE.md`
- `docs/ADSENSE_CONTENT_QUALITY_OFFICIAL_SOURCES_2026-07-27.md`
- `docs/ADSENSE_SITEWIDE_CONTENT_AUDIT_2026-07-27.md`
- `docs/TASK_LOG.md`
- `docs/OPERATIONS_STATUS.md`

## 1. 适用范围

本规范适用于 VisaLang 所有公开或计划公开的页面，包括：

- 英文 Markdown 指南页；
- 中文页面和未来中文指南；
- 国家、考试、路线分类页；
- 路线 hub；
- 工具页和工具 hub；
- 商业、产品、合作、定价、服务说明页；
- 首页、About、Contact、Editorial Policy、Privacy、Terms、Cookie Policy、Affiliate Disclosure；
- 404 和其他错误/状态页面；
- 新页面 brief、改写 brief、合并/noindex 决策 brief。

## 2. 总体整改原则

### 2.1 先减少审核风险，再追求页面数量

短期不以“100 页计划”或横向扩国家为目标。复审前宁可减少可索引页面，也不要保留大量：

- pending 页面；
- thin content 页面；
- coming soon 页面；
- 纯导航页；
- 只有 1–2 篇文章支撑的薄分类页；
- 无法证明独立价值的国家/考试页。

### 2.2 每个可索引页面必须完成一个独立用户任务

保留页面必须能回答：

1. 这个页面服务谁？
2. 这个页面解决什么具体问题？
3. 读者读完后能做什么下一步？
4. 它和相邻页面有什么不同？
5. 哪些结论必须回到官方来源确认？

如果两个页面只是替换国家名、考试名、等级或机构名，但用户任务相同，应优先合并，而不是批量扩写。

### 2.3 广告资格必须低于内容成熟度

不是所有公开页面都应该加载广告。页面必须先证明内容成熟，再考虑广告资格。

默认不具备广告资格的页面包括：

- 404；
- 法律/政策/noindex 页面；
- 纯导航页；
- 只有两篇内容支撑的薄分类页；
- coming soon 商业页；
- pending 指南；
- 未完成来源复核的高风险指南；
- 主要依赖通用模板撑起的页面。

### 2.4 不用字段修改伪造成熟度

不得为了消除 pending 提示，简单把 `sourceReviewStatus` 改成 `reviewed`。

每个页面必须有真实处理结果：

1. 完成官方来源复核后保留索引；
2. 内容不足时 `noindex`；
3. 与相邻页面重复时合并；
4. 无法支撑结论时保留为官方核验工作流，不写死答案；
5. 未成熟页面不得进入广告候选范围。

### 2.5 复审前不启动新商业化

复审前不新增：

- 新产品页；
- 付费 PDF；
- Route Review 收单；
- tutor lead form；
- 邮件收集；
- 新广告位；
- affiliate 推荐块；
- 新第三方追踪。

原因：这些会引入新的隐私、合规、商业承诺和审核风险，与当前 AdSense 复审目标冲突。

## 3. 一票否决项

只要页面命中以下任意一项，复审前不得进入“可索引 + 可广告”范围。

### 3.1 内容状态类

- 显示 `Official verification pending`；
- 显示 `Coming soon`、`Not currently offered`、`Price to be confirmed`、`not yet a purchasable product` 等未完成或未上线信号；
- 页面主要是模板，主题独有正文很少；
- 只有标题、列表、卡片、导航，没有完整解释；
- 只是复制、翻译、摘要或轻微改写官方资料，没有本站自己的整理、判断边界或执行步骤；
- 与相邻页面只有国家名、考试名、机构名不同，任务本质相同；
- 页面没有明确告诉用户下一步该做什么；
- 页面主体内容不是用户访问该页的主要原因。

### 3.2 广告资格类

以下页面默认不能加载 AdSense runtime：

- 404；
- Privacy、Terms、Cookie、Editorial Policy、Affiliate Disclosure；
- noindex 页面；
- 商业占位页；
- coming soon 产品页；
- 纯导航页；
- 只有 1–2 篇内容的薄分类页；
- pending 指南；
- 未经过来源复核的高风险指南；
- 主要依赖通用模板撑起的页面；
- 广告、联盟链接、推广卡片或商业 CTA 在数量或视觉上超过正文的页面。

### 3.3 信任风险类

涉及签证、居留、入籍、大学录取、职业注册、考试接受性等高风险主题时，页面不得：

- 保证签证、录取、入籍、考试通过或证书接受；
- 写死费用、日期、考位、证书时效、接受规则，除非有当前官方来源支持；
- 把考试机构规则写成移民、大学、政府或职业监管机构的接受规则；
- 用“通常”“大多数”“一般来说”替代官方决定方；
- 伪造作者、审阅人、人工复核、专业资质或官方认可；
- 把 AI/Agent/Codex 自查写成人工审阅或人工批准。

## 4. 页面分级标准

页面分级用于决定：是否保留公开索引、是否进入 sitemap、是否允许加载 AdSense runtime、是否需要合并/重写/noindex/下线、是否可以作为复审前成熟内容样本。

| 等级 | 名称 | 定义 | 索引 | 广告 | 处理方向 |
|---|---|---|---|---|---|
| A | 成熟指南页 | 完成独立用户任务，有官方来源、原创增值、人工复核和清晰责任边界 | 可以 | 可以，谨慎 | 保留并纳入复审样本 |
| B | 核心路线页 | 主题重要，内容基本完整，但仍需增强差异化、来源记录或审阅透明度 | 可以 | 暂缓或按页判断 | 优先加深 |
| C | Starter overview | 有导航价值但任务完成度不足 | 可按情况 | 不建议 | 深化、合并或 noindex |
| D | Verification pending | 来源、权威责任方、适用边界或人工复核未完成 | 通常 noindex | 不允许 | 完成复核后升级，或合并/下线 |
| E | Thin page | 独立正文不足，主要依赖模板，不能证明独立价值 | 通常 noindex | 不允许 | 重写、合并或删除/重定向 |
| F | Category / Hub | 分类、列表或导航页，主要帮助用户找到其他页面 | 按内容深度判断 | 默认不允许 | 深化成路线 Hub 或 noindex |
| G | Commercial placeholder | 产品、服务、定价、合作等尚未真实上线 | noindex | 不允许 | 保留最小状态说明或下线 |
| H | Legal / policy / error | 法律、政策、404、状态页 | noindex 或按用途 | 不允许 | 保留功能，不作为内容价值页 |

页面从 B/C/D/E 升级到 A，必须同时满足：

- 有明确、单一、真实的用户任务；
- 不依赖通用模板作为主要内容；
- 官方来源和最终责任方明确；
- 动态事实有核验路径，不伪造固定结论；
- 与相邻页面有可解释的独立价值；
- 没有 `Official verification pending` 等未完成信号；
- 有真实作者/负责人、审阅方式、复核日期或责任记录；
- 页面不含 coming soon、not currently offered、price to be confirmed 等未完成商业信号；
- 适合公开索引且符合广告资格标准。

## 5. 成熟指南页标准

成熟指南页不是“字数足够的文章”，而是能让目标读者完成一个具体路径判断或核验任务的页面。

成熟指南页必须回答：

1. 这页适合谁？
2. 这页不适合谁？
3. 谁有最终决定权？
4. 哪个考试机构只负责考试产品本身？
5. 哪些事实已可核验？
6. 哪些信息会变化，需要读者到官方来源确认？
7. 读者下一步应该做什么？
8. VisaLang 在官方来源之外提供了什么原创增值？

### 5.1 必备内容结构

每篇成熟指南至少应覆盖：

1. Quick answer / Direct answer；
2. 适用对象与不适用对象；
3. 最终决定方说明；
4. 考试/证书责任方说明；
5. 官方来源区；
6. 可执行核验清单；
7. 路径决策步骤；
8. 常见误区；
9. 下一步行动；
10. 相关指南；
11. 更新时间和来源复核日期；
12. 免责声明；
13. 作者/审阅/AI 辅助透明度信息。

不是每篇都必须机械使用完全一样的章节标题，但每篇必须覆盖：结论、对象、决定方、来源、行动、风险边界、独特增值。

### 5.2 独特内容价值

每篇保留索引的页面，至少应具备 3 类以上本站原创增值：

- 决策树；
- 核验清单；
- 官方来源职责拆分；
- 场景化错误；
- 读者下一步路径；
- 对比表；
- 材料准备表；
- 时间线；
- 风险边界；
- 示例记录格式；
- “不要这么做”清单；
- 相关页面的任务顺序说明。

不合格增值包括：

- 只放官方链接；
- 只翻译官方说明；
- 只把官方段落改写成更通顺的中文或英文；
- 只把多个官网链接汇总成列表；
- 生成一篇没有场景判断的通用介绍；
- 套用同一模板后替换国家、考试、等级或日期。

### 5.3 与相似页面的差异标准

当两个页面属于同一国家、同一路线或相近考试时，必须证明差异：

- 主搜索意图不同；
- 目标读者不同；
- 决策场景不同；
- 官方责任方或核验路径不同；
- 下一步行动不同；
- 页面保留后比合并成一页更有用户价值。

不能证明差异时，应优先合并，而不是批量扩写。

## 6. 官方来源与责任方标准

VisaLang 的主题特殊，所有高风险页面都必须区分 4 个责任方。

| 责任方 | 页面必须说明什么 |
|---|---|
| 最终决定方 | 谁决定签证、居留、入籍、录取、职业注册是否接受 |
| 考试产品方 | 谁定义考试产品、成绩、证书、模块、报名规则 |
| 本地执行方 | 谁决定当前考位、费用、证件、取消、出分、证书交付 |
| VisaLang | 只负责导航、整理、核验步骤和提醒，不做最终决定 |

每篇成熟指南必须有官方来源信息，至少包含：

- 来源名称；
- 来源 URL；
- 来源角色：最终决定方 / 考试方 / 本地执行方 / 背景说明；
- 检查日期；
- 该来源能支持什么；
- 该来源不能支持什么；
- 用户需要自己核验什么。

推荐来源卡格式：

| 官方来源 | 用途 | 已支持内容 | 不支持内容 | 检查日期 |
|---|---|---|---|---|
| BAMF / Goethe / telc / university / authority | 决定方或考试方 | 页面中使用的事实 | 个案结论、未来费用、当地执行 | YYYY-MM-DD |

以下动态事实不得在无来源情况下固定写死：

- 费用；
- 考试日期；
- 考点；
- 成绩发布时间；
- 证书有效期；
- 被接受考试清单；
- 签证、居留、入籍、录取、职业注册结果；
- 预约规则；
- 取消、退款、改期政策；
- 政策变更日期。

如果无法完成来源核验：

- 页面不得标记为成熟；
- 页面不得加载广告；
- 页面应显示 pending 或 noindex；
- 页面 brief 中应记录缺口；
- 不得用通用免责声明替代权威来源。

## 7. Thin / Pending / Commercial / Category 页面处理规则

### 7.1 Thin 页面处理规则

Thin 页面指：

- 独立正文很少；
- 主要内容来自通用模板；
- 缺少本站原创增值；
- 与相邻页面高度相似；
- 读者无法通过该页完成明确任务。

处理路径：

1. **重写为成熟指南页**：适用于主题有明确需求、官方来源可核验、页面能形成独立价值的情况。
2. **合并到更完整页面**：适用于两个或多个页面只是国家名、考试名或关键词替换，无法证明独立任务的情况。
3. **noindex + 禁用广告**：适用于仍需保留导航或内部承接，但尚未达到成熟内容标准的情况。
4. **下线或重定向**：适用于无独立价值、无维护计划或已被更完整页面替代的情况。

验收标准：

- 保留页面必须有独立用户任务；
- 被合并页面应有清晰重定向和内部链接更新；
- noindex 页面不得加载 AdSense runtime；
- 不得通过改字段掩盖 thin 状态。

### 7.2 Pending 页面处理规则

Pending 页面指：

- `contentStatus: verification-pending`；
- `sourceReviewStatus` 未完成或语义不一致；
- 缺少 `primaryOfficialAuthorityUrl`；
- 页面渲染仍显示官方核验 pending；
- 本地、台账、公网页面状态不一致。

处理路径只有三种：

1. 完成官方来源核验和人工复核后升级；
2. 如果关键来源无法确认，保留为 noindex + 禁广告；
3. 如果与相邻页面无法区分，合并或下线。

硬规则：

- 不得批量把 pending 改为 reviewed；
- 不得用字段变化替代真实来源复核；
- 不得让 pending 页面加载广告；
- 不得让 pending 页面作为 AdSense 复审成熟样本。

### 7.3 Commercial 页面处理规则

Commercial 页面包括：

- pricing；
- partners；
- route review；
- products；
- paid packs；
- future services；
- contact-intent commercial landing pages。

如果产品或服务尚未真实交付，页面必须：

- `noindex`；
- 从 sitemap 移除；
- 禁用 AdSense runtime；
- 不在主导航中作为核心价值入口；
- 不声明价格、上线日期、交付承诺、退款规则、审核接受或服务完成状态；
- 使用清晰的状态说明，例如 `not currently offered`。

如果未来商业页要升级为公开成熟页，必须先具备：

- 真实可交付服务或产品；
- 明确服务边界；
- 隐私、支付、退款、联系和履约说明；
- 不误导用户认为 VisaLang 是官方机构或官方代理；
- 单独通过广告资格审查。

### 7.4 Category / Hub 页面处理规则

Category / Hub 页面包括：

- 国家分类页；
- 路线分类页；
- 考试分类页；
- 工具列表页；
- 指南索引页。

处理原则：

- 如果只是导航列表，默认不加载广告；
- 如果只有少量卡片和简短介绍，默认 noindex 或不作为 AdSense 内容页；
- 如果要可索引且可广告，必须升级为真正路线 Hub。

真正路线 Hub 应包含：

- 路线总览；
- 谁应该从这里开始；
- 官方责任方地图；
- 子页面之间的区别；
- 推荐阅读顺序；
- 决策流程；
- 常见错误；
- 维护日期；
- 与具体成熟指南的关系。

## 8. 作者、审阅与 AI 辅助透明度标准

### 8.1 作者标准

VisaLang 应公开真实责任主体。可采用以下方式之一：

- 真实个人作者；
- 真实内容负责人；
- 组织署名 + 明确责任人/联系渠道；
- 组织署名 + 真实编辑政策和人工复核流程。

不得：

- 伪造姓名；
- 伪造法律、移民、考试、院校资质；
- 把 `VisaLang Editorial team` 当作可核验个人身份；
- 把角色名写成专业资格。

### 8.2 审阅标准

高风险页面应有审阅记录：

- 审阅人或责任角色；
- 审阅日期；
- 审阅范围；
- 来源核验方式；
- 是否与撰写者不同；
- 是否为人工抽查。

最低要求：

- 广告资格页面不得只依赖 AI 或自动脚本自审；
- pending 页面不得通过字段修改冒充 reviewed；
- 审阅记录必须可追溯到页面或内容台账。

### 8.3 AI 辅助透明度标准

如果 AI 对内容生成、改写、摘要、翻译或来源整理有实质参与，应说明：

- AI 用于初稿、结构化、语言润色、对比表整理或检查清单生成；
- 官方来源和关键事实由人工核验；
- AI 不作为官方、法律、移民、考试或院校判断依据；
- 人工负责人对最终发布内容负责。

不得：

- 声称 AI 完成了官方核验；
- 声称 AI 输出等同人工专业审阅；
- 用 AI 批量生成页面后直接投放广告；
- 隐瞒自动化批量内容生产造成的页面相似问题。

### 8.4 About / Editorial Policy 支撑要求

About 和 Editorial Policy 应说明：

- VisaLang 是什么；
- VisaLang 不是官方机构；
- 内容如何选择来源；
- 如何处理动态信息；
- 如何纠错；
- 作者/审阅责任如何记录；
- AI 辅助如何使用；
- 商业或联盟关系如何披露。

这些信任页面只能增强整站可信度，不能替代正文原创价值。

## 9. 广告资格标准

### 9.1 可以加载广告的页面

页面必须同时满足：

- 是成熟指南页、成熟路线页或有足够发布商内容的成熟 Hub；
- 页面主体内容是用户访问该页的主要原因；
- 没有 pending、coming soon、not currently offered 等未完成信号；
- 不属于错误页、法律页、纯导航页、工具空壳、商业占位页；
- 发布商内容明显多于广告和商业推广；
- 移动端主要内容清晰可读；
- 没有异常跳转、坏链、登录墙或无法访问内容；
- 官方来源、责任方、作者/审阅透明度达到本规范要求；
- 页面适合公开索引并进入 sitemap。

### 9.2 不得加载广告的页面

以下页面必须禁用广告：

- 404 和错误页；
- Privacy、Cookie、Terms、Editorial Policy、Affiliate Disclosure 等法律/政策页；
- noindex 页面；
- pending 指南；
- thin 指南；
- 只承担导航功能的分类页；
- 只有两篇文章且无实质 Hub 内容的国家页；
- tools hub 或工具页，如果主要是功能入口而非发布商内容；
- coming soon、not currently offered、price to be confirmed 页面；
- 未上线产品、服务、合作、定价页面；
- 任何内容不足、建设中、测试、空白或模板页。

### 9.3 sitemap、index、ads 三者一致规则

每个页面必须明确处于以下状态之一：

| 页面状态 | sitemap | index | ads |
|---|---|---|---|
| 成熟公开内容 | 是 | index | 可按资格开启 |
| 公开但不成熟 | 否 | noindex | 关闭 |
| 导航/法律/错误/状态页 | 通常否 | noindex 或按用途 | 关闭 |
| 商业占位页 | 否 | noindex | 关闭 |
| 工具功能页 | 按策略 | 通常可 index | 默认关闭 |

不得出现：

- noindex 页面加载广告；
- sitemap 包含未上线商业页；
- pending 页面加载广告；
- thin 分类页加载广告；
- 导航页面伪装成成熟内容页。

## 10. 新页面 brief 标准

任何新指南、分类页、路线页、商业页或工具页，在进入写作前必须先有 brief。

Brief 目标：

- 防止为了增加页面数而制造 thin page；
- 防止相似页面批量替换关键词；
- 防止未核验来源页面进入索引和广告范围；
- 确保页面从一开始就符合官方来源优先和 AdSense 内容价值标准。

### 10.1 新指南页 brief 模板

每个新指南 brief 必须包含：

1. 页面标题；
2. 目标 URL / slug；
3. 页面类型；
4. 页面等级目标；
5. 主用户任务；
6. 目标读者；
7. 不适用读者；
8. 搜索意图；
9. 与现有页面的区别；
10. 是否应合并到现有页面；
11. 最终决定方；
12. 考试产品方；
13. 官方来源清单；
14. 动态事实清单；
15. 页面原创增值设计；
16. 决策路径或核验清单；
17. 常见误区；
18. 下一步行动；
19. 作者或负责人；
20. 审阅人或审阅角色；
21. AI 辅助范围；
22. 是否 index；
23. 是否进入 sitemap；
24. 是否允许广告；
25. 发布前检查项。

### 10.2 Brief 拒绝条件

出现以下任一情况，不应创建公开可索引页面：

- 只是为了覆盖关键词；
- 与现有页面无法区分；
- 官方来源未确认；
- 没有真实用户任务；
- 只能写成 coming soon；
- 主要内容会来自模板；
- 无法说明 VisaLang 的原创增值；
- 计划直接用 AI 批量生成且无人复核；
- 商业服务尚未上线却想进入 sitemap 或加载广告。

## 11. 页面评分标准

建议对每个页面做 100 分内部评分。复审前，可索引且可广告页面建议达到 85 分以上，并且不能命中一票否决项。

| 项目 | 分值 | 标准 |
|---|---:|---|
| 用户任务清晰 | 15 | 页面解决一个明确问题 |
| 独特内容价值 | 20 | 有本站原创整理、表格、决策树或核验框架 |
| 官方来源与边界 | 20 | 来源清楚，支持范围清楚 |
| 内容完整度 | 15 | 不是模板空壳，解释充分 |
| 与相似页面差异 | 10 | 不是关键词替换页 |
| 下一步可执行 | 10 | 用户读完能行动 |
| 信任透明度 | 5 | 作者/审阅/更新时间合理 |
| 用户体验 | 5 | 导航、移动端、广告不干扰 |

分级处理：

| 分数 | 处理 |
|---:|---|
| 85–100 | 可索引，可进入广告候选 |
| 70–84 | 可索引但暂不广告，继续补强 |
| 50–69 | noindex，待重写或合并 |
| <50 | 合并、删除入口或重建 |

## 12. 当前页面风险盘点

以下分组来自 2026-07-27 全站 AdSense 审计与窗口 A 任务记录。

| 页面类型 | 当前问题 | 建议处理策略 | 优先级 / 窗口状态 |
|---|---|---|---|
| 5 个商业占位页：`/pricing/`、`/partners/`、`/route-review/`、`/products/a1-practice-pack/`、`/products/a1-family-reunion-pack/` | 公开文案包含 coming soon / not currently offered / price to be confirmed 等未上线信号；此前在 sitemap 中可索引并默认加载广告 runtime | 不编造价格、上线时间、服务能力；保持 noindex、禁广告、从 sitemap 排除 | P0 / 窗口 A 已完成本地整改；窗口 E 仍需公网与账户侧复核 |
| 404 与 noindex 法律/政策页 | 以前 404 和法律页仍加载 AdSense runtime | 显式 `enableAds={false}`，测试断言无 AdSense loader | P0 / 窗口 A 已完成本地整改；窗口 E 仍需公网复核 |
| 8 个两篇指南国家分类页：UK、Canada、Italy、Spain、France、Finland、Netherlands、Portugal | 主内容薄，主要由分类介绍和两张 Guide Card 组成，属于导航型薄分类页 | 深化成真正路线 Hub，或 noindex + 禁广告 | P0/P1 / 窗口 A 已禁广告；深化/noindex 属于窗口 B |
| 24 篇可见 `Official verification pending` 英文指南 | 本地构建中仍显示 pending，包括 verification-pending、telc source pending、TestDaF authority gate 不一致 | 完成复核后保留；证据不足时 noindex + 禁广告；重复时合并 | P0 / 普通国家 pending 属于窗口 B；telc/TestDaF 属于窗口 C |
| 最薄 12 篇指南 | 独立正文约 91–149 词，多数依赖通用模板撑起主内容 | 逐页保留加深、合并或 noindex，不按字数灌水 | P0 / 窗口 B |
| 两页国家集群 | 同国家两篇短文、同模板、同 pending 状态时容易像批量入口页 | 逐国家决定：深化为 hub + 任务页，或合并为完整路线指南，或 noindex | P1 / 窗口 B |
| telc 4 篇指南 | 3 篇进入最薄 12，来源/权威字段不足，依赖默认 pending | 完成 telc source/authority 审计，或 noindex + 禁广告 | P0 / 窗口 C |
| TestDaF 4 篇指南 | 本地 source review 已做过，但 authority gate 与公网一致性仍有问题 | 修正 authority/source/pending 渲染口径，统一本地、台账、公网状态 | P0/P1 / 窗口 C + E |
| 作者/审阅可信度 | 统一机构署名，真实作者/审阅责任和人工抽查不足 | 补 Who/How/Why、About、Editorial Policy、人工抽查记录，不伪造资质 | P1 / 窗口 D |
| 公网状态和账户侧证据 | 本地整改不能证明生产已部署或 AdSense 账户侧已排除 | 公网 sitemap/noindex/ads runtime/pending 检查；账户负责人核验 Policy Center/CMP/Auto ads | P2 / 窗口 E |

## 13. 后续整改窗口规划

采用“审核风险清零优先，先收缩再复审”的方案。窗口 A 已完成本地明显风险暴露处理。后续为窗口 B/C/D/E。

## 13.1 窗口 B：12 个最薄指南 + 8 个两页国家集群

### 目标

把最容易被判断为低价值、模板化、批量入口页的内容先收缩或加深，形成清晰的保留/合并/noindex 决策。

窗口 B 的目标不是追求固定字数，而是让每个保留 URL 具备：

- 明确且不同的主搜索意图；
- 独立用户任务；
- 国家、考试或路线特有的事实边界；
- 对相邻页面无法替代的原创增值；
- 可执行的官方核验下一步；
- 若仍未成熟，则不得进入广告资格。

### 范围

最薄 12 个指南：

1. `yki-vs-other-finland-options`
2. `tcf-canada-vs-tef`
3. `portuguese-ciple-a2-for-citizenship-and-residence`
4. `cils-vs-celi-vs-plida-for-italian-citizenship`
5. `dutch-inburgering-a2-b1-for-integration-and-citizenship`
6. `portuguese-language-for-golden-visa-and-citizenship`
7. `languagecert-selt-uk-visa`
8. `ielts-ukvi-uk-visa`
9. `telc-vs-goethe-for-german-visa`
10. `telc-b1-b2-germany-work-nursing`
11. `telc-b1-b2-fees-and-test-centers`
12. `cils-b1-cittadinanza-for-italian-citizenship`

8 个两页国家集群：

- UK；
- Canada；
- Portugal；
- Netherlands；
- Italy；
- Spain；
- France；
- Finland。

### 明确不做

窗口 B 不做：

- 不修改商业页；
- 不新增广告位；
- 不新增工具或商业服务；
- 不新增国家集群；
- 不做 telc/TestDaF 的 source-review 状态统一；
- 不做作者/审阅模型重构；
- 不做账户侧 Auto ads/CMP/Policy Center 操作；
- 不承诺或推断费用、考位、考试日期、签证/入籍/录取结果。

### 任务清单

1. 建立逐页决策表：记录 slug、国家/路线、状态、主搜索意图、相似页、处理决策、决策理由、官方来源缺口。
2. 按国家集群逐组处理，不批量扩写。
3. 对保留页补足独立价值：适用/不适用读者、最终决定方、考试产品方、核验顺序、相似页区别、国家/考试特有决策表、常见误判、下一步。
4. 对重复页做合并、canonical、redirect、sitemap 和内部链接更新。
5. 对仍未成熟页设置 noindex + 禁广告。
6. 更新内容完整性、source-review render、sitemap、redirect、adsense-risk-exposure 等测试。

### 验收标准

- 12 个最薄指南均有明确处理结果：保留加深 / 合并 / noindex / 下线重定向；
- 8 个两页国家集群均有明确策略；
- 每个保留 URL 都能说明“为什么不能被相邻页替代”；
- 合并 URL 的 canonical/301/sitemap/内部链接一致；
- 未成熟或 pending 页面不进入广告资格；
- 不出现为了消除风险而伪造 review/source/authority 的情况。

### 推荐验证

- `node tests/content-integrity.test.js`
- `node tests/source-review-render.test.js`
- `node tests/p0-five-countries.test.js`
- `node tests/adsense-risk-exposure.test.js`
- 新增或修改的国家集群专测
- `npm test`
- `npm run build`
- `npm run launch-check`
- `git diff --check`

### 完成后输出物

- 窗口 B 任务日志；
- 内容决策表；
- 每个国家集群处理摘要；
- 合并/重定向清单；
- 保留 pending/noindex/禁广告页面清单；
- 测试结果记录。

## 13.2 窗口 C：telc 和 TestDaF 状态一致性、pending/authority/source 修正

### 目标

让 telc 和 TestDaF 的本地内容、frontmatter、渲染状态、内容台账、公网页面状态保持一致，避免出现：

- frontmatter 写 reviewed，但页面仍显示 pending；
- source review 完成，但缺少 `primaryOfficialAuthorityUrl` 导致 authority gate 失败；
- 本地显示与公网显示不一致；
- 内容台账声称 reviewed，但 public output 仍 pending；
- 通过字段修改掩盖真实证据缺口。

### 范围

telc 4 篇：

1. `telc-vs-goethe-for-german-visa`
2. `telc-b1-b2-germany-work-nursing`
3. `telc-b1-b2-fees-and-test-centers`
4. `telc-b1-b2-exam-format-and-preparation`

TestDaF 4 篇：

1. `testdaf-germany-university-admissions`
2. `testdaf-levels-and-scoring`
3. `testdaf-vs-goethe-dsh`
4. `testdaf-preparation-and-practice`

### 明确不做

- 不新增 TestDaF hub；
- 不新增 telc hub；
- 不新增商业页；
- 不新增广告位；
- 不写固定费用、考位、报名日期、出分时间、中心规则或个案资格；
- 不把 DAAD、uni-assist、TestDaF、telc 或 Goethe 的概览页面写成目标大学/雇主/移民局的最终决定；
- 不把 pending 改成 reviewed，除非逐项证据已记录并可追溯。

### 任务清单

1. 复核状态渲染规则：`sourceReviewStatus`、`primaryOfficialAuthorityUrl`、`finalDecisionAuthorityType`、`sourceReviewedAt`、`reviewedByRole`、`contentStatus` 与最终渲染的关系。
2. 对 telc 四页建立 source/authority 证据矩阵。
3. 对 TestDaF 四页修正 authority gate 或记录真实 pending 原因。
4. 统一 content ledger、本地构建、公网页面口径。
5. 修复 telc/TestDaF 的显式路由顺序和 Related Guides。
6. 补充 TestDaF/telc/source-review/render/content-integrity/adsense-risk 测试。

### 验收标准

- 4 个 telc 页面逐页有 source/authority 决策；
- 4 个 TestDaF 页面逐页有 source/authority 决策；
- 页面不再出现“frontmatter reviewed 但真实渲染 pending 口径不解释”的状态；
- 若页面仍 pending，原因在台账和页面文案中一致；
- 若页面不 pending，必须具备必要证据字段；
- 仍 pending 的 telc/TestDaF 页面不得进入广告资格；
- 不新增费用、日期、资格、录取、签证结果承诺。

### 推荐验证

- `node tests/germany-testdaf-cluster.test.js`
- telc 专测文件，如果新增
- `node tests/source-review-render.test.js`
- `node tests/content-integrity.test.js`
- `node tests/site.test.js`
- `node tests/adsense-risk-exposure.test.js`
- `npm test`
- `npm run build`
- `npm run launch-check`
- `git diff --check`

### 完成后输出物

- telc source/authority 矩阵；
- TestDaF source/authority 状态核对表；
- reviewed/pending 数量最终口径；
- 本地构建与公网状态差异表；
- 测试结果。

## 13.3 窗口 D：作者、审阅、人工抽查、Editorial Policy/About 可信度

### 目标

补足 VisaLang 作为高风险路径导航站的可信度基础，让读者能判断：谁负责内容、谁做来源复核、人工审阅如何进行、AI/自动化是否参与、哪些内容不是法律/移民建议、纠错如何处理。

### 范围

- `src/pages/about.astro`
- `src/pages/editorial-policy.astro`
- `src/layouts/GuideLayout.astro`
- `src/content.config.ts`
- guide frontmatter 的 author/reviewer 字段；
- Article JSON-LD author/reviewer/publisher 表达；
- 人工抽查记录；
- 相关 docs 运营状态记录。

### 明确不做

- 不伪造真实姓名；
- 不虚构律师、移民顾问、教育顾问、考试官方人员、政府背景；
- 不把 role name 写成专业资质；
- 不把 Agent/Codex 自检写成人工审阅；
- 不承诺申请、签证、入籍、录取、考试成绩；
- 不新增联系表单、个人信息收集、商业功能或广告位。

### 任务清单

1. 确定可公开责任主体：真实个人、组织责任主体或诚实的组织署名 + 方法说明。
2. 设计 author/reviewer 数据模型，避免所有页面自动显示“人工审阅”而没有证据。
3. 修正 GuideLayout 可见信任区。
4. 修正 Article JSON-LD，使其与页面可见作者/审阅信息一致。
5. 更新 About 页面，说明 VisaLang 的定位、责任主体、非官方边界、来源选择、纠错方式。
6. 更新 Editorial Policy，说明 authority hierarchy、source review 与 content update 区别、AI/人工边界、纠错触发、pending/noindex/禁广告规则。
7. 建立人工抽查样本和记录。

### 验收标准

- About 能清楚说明 VisaLang 的责任主体与非官方边界；
- Editorial Policy 能清楚说明来源、审阅、AI/人工边界；
- guide 页面不再只依赖“VisaLang Editorial team + source-review role”这种不可核验结构；
- Article JSON-LD 与页面可见作者/审阅信息一致；
- 至少有一份人工抽查记录；
- 没有虚构个人、资质、官方认可或人工批准；
- 不新增个人信息收集、商业功能或广告位。

### 推荐验证

- `node tests/source-review-render.test.js`
- `node tests/content-integrity.test.js`
- `node tests/site.test.js`
- 新增 author/reviewer 专测，如果需要
- `npm test`
- `npm run build`
- `npm run launch-check`
- `git diff --check`

### 完成后输出物

- 作者/审阅字段设计说明；
- About 更新摘要；
- Editorial Policy 更新摘要；
- 人工抽查记录；
- JSON-LD 变更说明；
- 测试结果；
- 未覆盖事项清单。

## 13.4 窗口 E：公网复核、账户侧广告排除、复审准备

### 目标

在 B/C/D 完成并发布后，做最终复审前证据整理：

- 公网内容与本地预期一致；
- sitemap、robots、ads.txt 可访问；
- noindex 和 AdSense runtime 状态符合预期；
- pending 页面状态符合真实内容；
- 账户侧 Auto ads 排除、CMP、Policy Center 由授权负责人核验；
- 形成复审证据包；
- 只在证据齐全后再考虑提交复审。

### 范围

公网检查：

- 首页；
- sitemap；
- robots.txt；
- ads.txt；
- 8 个国家分类页；
- B 中保留/合并/noindex 的代表页面；
- C 中 4 个 telc；
- C 中 4 个 TestDaF；
- About；
- Editorial Policy；
- Privacy/Cookie/Terms/Affiliate Disclosure；
- 404；
- 商业占位页；
- 工具页；
- 移动端视口。

账户侧检查由授权负责人执行：

- AdSense Policy Center；
- Auto ads 页面排除；
- CMP 状态；
- 是否有页面级限制；
- 是否有自动广告仍投放在 noindex/薄页/法律页/404/商业占位页。

### 明确不做

- 不修改账户设置，除非授权负责人单独批准；
- 不新增广告位；
- 不新增商业功能；
- 不新增个人信息收集；
- 不修改正文事实；
- 不把公网可访问写成 Search Console 已收录；
- 不把 Auto ads 排除截图写成源码证明；
- 不把本地测试通过写成 AdSense 通过；
- 不提交复审，除非业务方明确授权提交。

### 任务清单

1. 发布前本地最终门禁。
2. 授权后发布并记录 release、rollback 和 smoke 证据。
3. 检查公网 sitemap、robots、ads.txt。
4. 抽查公网页面状态：HTTP、canonical、robots meta、sitemap、AdSense runtime、pending、author/reviewer、source review marker、移动端可读性。
5. 由授权负责人核验账户侧 Auto ads、Policy Center、CMP。
6. 由授权负责人提供 Search Console sitemap/indexing 证据。
7. 整理复审证据包。

### 验收标准

- 生产部署版本已明确记录；
- 回滚路径已明确记录；
- 公网 sitemap 与本地预期一致；
- 商业占位页不在 sitemap，不加载广告，且 noindex；
- 404/noindex 法律页不加载广告；
- 两页薄分类页不加载广告，若未深化则 noindex 或保持非广告导航；
- pending/noindex guide 不加载广告；
- telc/TestDaF 公网状态与本地台账一致；
- About/Editorial Policy 公网可见且可信度文案一致；
- 账户侧 Policy Center、Auto ads、CMP 由授权负责人核验；
- Search Console 状态由授权负责人提供或明确记录未核验；
- 人工抽查完成；
- 复审提交前有一份完整证据包；
- 不出现“已保证通过”表述。

### 推荐验证

本地：

- `npm test`
- `npm run build`
- `npm run launch-check`
- `git diff --check`

服务器：

- 服务器侧 `npm test`
- 服务器侧 `npm run launch-check`
- Nginx config test；
- public smoke；
- 回滚 artifact 存在性核验。

公网：

- sitemap URL 数量与预期；
- representative pages HTTP 200；
- redirect/canonical 检查；
- robots/noindex 检查；
- AdSense loader 检查；
- mobile viewport 手动浏览；
- clean profile browser/network 检查，如果条件允许。

账户侧：

- AdSense Policy Center；
- Auto ads exclusions；
- CMP；
- Search Console sitemap/indexing。

### 完成后输出物

- 窗口 E 记录；
- 公网复核表；
- 账户侧核验表；
- 复审前证据包；
- 已知风险与未核验项；
- 复审提交建议：只有在授权负责人确认账户侧与公网证据后再提交；
- 明确说明：整改只能降低明显风险，不能保证 AdSense 批准。

## 14. 复审前检查清单

### 14.1 内容 gate

- [ ] 12 篇最薄指南已逐页处理；
- [ ] 8 个两页国家集群已深化、合并或 noindex；
- [ ] 所有 pending 页面不进入广告候选范围；
- [ ] telc / TestDaF 状态和公网一致；
- [ ] 商业占位页 noindex、禁广告、不进 sitemap；
- [ ] 成熟内容页有官方来源、独特价值和下一步；
- [ ] 没有明显模板化、批量生成、关键词替换页。

### 14.2 广告 gate

- [ ] 404 禁广告；
- [ ] 法律/noindex 页面禁广告；
- [ ] 商业占位页禁广告；
- [ ] 薄分类页禁广告；
- [ ] pending 指南禁广告；
- [ ] 广告不出现在官方核验区、Quick answer 后立刻位置、按钮附近或误点区域；
- [ ] 账户侧 Auto ads 排除由负责人确认。

### 14.3 信任 gate

- [ ] About 说明网站身份和边界；
- [ ] Editorial Policy 说明来源复核方法；
- [ ] 高风险页面有 source review 记录；
- [ ] 不虚构作者、专家或人工审核；
- [ ] 有错误报告入口；
- [ ] 公网状态、本地构建、内容台账一致。

### 14.4 技术 gate

- [ ] `npm test` 通过；
- [ ] `npm run launch-check` 通过；
- [ ] `git diff --check` 通过；
- [ ] sitemap 不含不该索引页面；
- [ ] noindex 页面实际输出 noindex；
- [ ] 禁广告页面实际不加载 AdSense runtime；
- [ ] 公网抽查通过。

## 15. 复审提交判断

满足以下条件前，不建议重新申请：

- P0 风险已全部处理；
- pending 页面不在广告范围；
- thin 页面不在广告范围；
- 商业占位页不在索引和广告范围；
- 分类页已深化或禁广告；
- 成熟指南有足够独立价值；
- 作者、审阅、AI 辅助透明度达到最低标准；
- 本地、构建、公网和账户侧状态一致；
- 已完成真实人工抽查。

即使全部完成，也只能说明明显风险已降低，不能承诺 Google AdSense 通过。

## 16. 附录：页面整改决策表模板

| 页面 | 当前类型 | 当前状态 | 主要问题 | 决策 | index | sitemap | ads | 负责人 | 复核日期 |
|---|---|---|---|---|---|---|---|---|---|

## 17. 附录：官方来源记录表模板

| 页面 | 最终决定方 | 官方 URL | 考试产品方 | 官方 URL | 动态事实 | 复核人 | 复核日期 |
|---|---|---|---|---|---|---|---|

## 18. 附录：相似页面差异证明表模板

| 页面 A | 页面 B | 是否同集群 | 用户任务差异 | 来源差异 | 下一步差异 | 保留/合并决策 |
|---|---|---|---|---|---|---|

## 19. 附录：广告资格判定表模板

| 页面 | 成熟内容 | 非 pending | 非 thin | 非商业占位 | 非导航专用 | 来源完整 | 审阅完整 | 允许广告 |
|---|---|---|---|---|---|---|---|---|
