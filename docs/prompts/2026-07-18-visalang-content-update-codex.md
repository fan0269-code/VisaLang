# VisaLang 下一步内容更新任务

你是 VisaLang 内容站的执行 Agent。请在现有 Astro 项目中完成下一轮内容更新，重点修复 Germany A1 家庭团聚路线的来源可信度、决策顺序、中文内容闭环和文章级下一步行动。

采用能完成任务的最小变更。不要扩展未要求的国家或考试主题，不要重构无关代码，不要虚构政策事实，不要把未经验证的结果报告为完成。

## 一、项目位置与任务目标

项目根目录：

```text
/Users/fanlw/Documents/搬迁测试/VisaLang
```

从该目录运行全部命令。

本轮目标：

1. 重新核验并更新 7 篇 Germany A1 英文核心指南的来源状态与必要文案；
2. 修正 Germany A1 的决策阶段、主路线顺序和直接双向下一篇循环；
3. 让指南正文中的文章特定下一步行动真实显示，而不是只展示通用 CTA；
4. 新增 3 个中文 Germany A1 核心页面，补齐接受证明、官方考点和报名时间线断点；
5. 同步中文受控数据、Hub、双语映射、canonical、hreflang、JSON-LD、sitemap 和最小测试；
6. 保持“内容成熟度”和“官方来源审查状态”相互独立；
7. 通过聚焦测试、完整测试和发布就绪检查证明结果。

## 二、必须先读

开始编辑前，依次阅读并遵守：

- `CLAUDE.md`
- `AGENTS.md`
- `PROJECT_CONTEXT.md`
- `package.json`
- `astro.config.mjs`
- `docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md`
- `docs/PHASE_2_A1_CONTENT_AUDIT.md`
- `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`
- `src/content.config.ts`
- `src/data/source-review.ts`
- `src/data/guide-taxonomy.ts`
- `src/data/article-sections.ts`
- `src/data/zh-germany-a1.ts`
- `src/data/site.ts`
- `src/pages/guides/[slug].astro`
- `src/layouts/GuideLayout.astro`
- `src/components/ZhGuideLayout.astro`
- `src/pages/germany-family-reunion-a1.astro`
- `src/pages/zh/germany-family-reunion-a1.astro`
- `tests/content-integrity.test.js`
- `tests/germany-a1-cluster.test.js`
- `tests/source-review-render.test.js`
- 与路由、双语、SEO 或 sitemap 直接相关的现有测试和脚本

当前源码、schema 和测试优先于陈旧文档。发现文档与当前实现冲突时，按当前实现执行，并在最终报告中记录冲突；不要顺手修改无关历史文档。

## 三、开始前检查

先运行：

```bash
git status --short --branch
```

要求：

- 记录已有修改；
- 不覆盖、回退、格式化或删除其他人已有的无关修改；
- 只修改本任务直接需要的文件；
- 不创建分支，不提交，不推送，不部署；
- 不编辑 `dist/`、`.astro/`、`node_modules/`；
- 不把根目录 legacy HTML、CSS 和 JavaScript 当作当前实现来源。

## 四、官方来源与事实门禁

VisaLang 是核验导航站，不是签证、居留、入籍、录取、职业认可或考试接受结果的决定者。

### 4.1 权威来源分工

按主张类型选择最终权威：

| 主张类型 | 首要权威 |
|---|---|
| 签证、家庭团聚、居留、入籍、豁免、材料接受 | 接收申请的国家机关、地方主管机关或具体使领馆 |
| 考试产品、等级、格式、评分、证书 | 官方考试主办方 |
| 考点、当前费用、日期、证件、退改、出分 | 官方考试方及所选官方或授权考点 |
| 大学录取 | 具体大学和具体 programme |
| 职业认可 | 对应地区和职业的认可或执照机构 |

考试主办方不能替签证或移民机关决定证书是否适用于个案。当地考点不能替主管机关决定申请资格。

### 4.2 每个高风险主张的内部检查记录

对每个需要新增、保留或改写的高风险主张，先建立检查表，至少记录：

- 主张内容；
- 最终决定机关；
- 实际打开的官方来源 URL；
- 执行当天的真实核验日期，格式为 `YYYY-MM-DD`；
- 来源明确支持的范围；
- 来源不能支持的边界；
- 最终处置：保留、限定、删除或改为官方核验步骤。

### 4.3 停止条件

出现以下任一情形，不得把相关页面标记为来源已审查：

- 官方来源无法访问；
- 来源内容已经变化；
- 来源没有明确支持原主张；
- 只有考试方来源，却要证明签证或家庭团聚接受范围；
- 无法确认来源适用的国家、申请路线、考试版本或时间范围；
- 审计文档记录与当前官方页面冲突。

此时必须：

1. 保持 `sourceReviewStatus: pending`；
2. 不填写 `sourceReviewedAt`；
3. 删除或限定无支持结论；
4. 把结论改为具体官方核验步骤；
5. 在最终报告中列为 `PARTIAL` 或 `BLOCKED`。

不要仅凭历史审计文档写有 “Finalized” 就认定 2026-07-18 或执行当天仍然有效。

## 五、P0：Germany A1 英文内容可信度与路线修复

### 5.1 目标英文指南

重新打开 `docs/PHASE_2_A1_CONTENT_AUDIT.md` 记录的官方来源，并处理以下 7 篇指南：

- `src/content/guides/german-family-reunion-language-requirement.md`
- `src/content/guides/goethe-a1-vs-telc-a1.md`
- `src/content/guides/goethe-a1-test-centers.md`
- `src/content/guides/goethe-a1-fees-by-country.md`
- `src/content/guides/goethe-a1-retake-policy.md`
- `src/content/guides/german-a1-documents-checklist.md`
- `src/content/guides/german-a1-exam-booking-timeline.md`

来源仍适用时，按现有 schema 补齐或更新：

```yaml
sourceReviewStatus: reviewed
sourceReviewedAt: 执行当天的真实核验日期
reviewedByRole: source-review
audienceScope: 与官方来源一致的明确适用范围
finalDecisionAuthorityType: 与页面主张一致的机关类型
primaryOfficialAuthorityUrl: 最终决定机关的官方 HTTPS URL
examOwnerUrl: 考试主办方的官方 HTTPS URL
localExecutionPrompt: 读者在所选官方或授权考点需要核验的具体事项
```

只有真实完成来源核验的页面才可使用 `reviewed`。不要复制 `updatedDate` 作为 `sourceReviewedAt`。

### 5.2 内容状态规则

保持现有受控成熟度基线：

- Germany A1 保持 `complete-route`；
- 来源已核验不自动提升或改变 `contentStatus`；
- 路线结构完整不等于官方事实全部已核验；
- 页面应向用户清楚解释这两个状态的区别。

`updatedDate` 只在发生实质性、用户可见的内容变化时更新。`publishedDate` 保持首次发布日期。

### 5.3 决策阶段与主路线

Germany A1 主路线使用以下业务顺序：

```text
requirement
→ accepted proof
→ provider choice
→ official centre and pre-booking checks
→ timeline
→ documents
→ official preparation resources and study plan
→ submission recheck or retake branch
```

核心 slug 顺序应表达为：

```text
german-family-reunion-language-requirement
goethe-a1-germany-family-reunion
goethe-a1-vs-telc-a1
goethe-a1-test-centers
goethe-a1-pre-booking-checklist
german-a1-exam-booking-timeline
german-a1-documents-checklist
goethe-a1-official-links-practice-resources
goethe-a1-30-day-study-plan
```

`goethe-a1-retake-policy` 是考试未通过后的条件分支，不是所有用户必经的线性步骤。

要求：

- 将 requirement guide 的 `decisionStage` 设为真实的 requirement 阶段；
- `nextGuideSlug` 表示唯一主下一步，不表示普通相关文章；
- `supportingGuideSlugs` 表示补充内容；
- 不允许 A 指向 B、B 又直接指向 A 的下一篇循环；
- 不使用标题字母顺序、发布日期或更新时间代替业务路线顺序；
- 每个 slug 必须存在且不能指向自身；
- 每篇指南至少保留一个同路线或同决策阶段的 supporting guide；
- 跨国家相关内容必须继续满足现有 `comparisonScope` 和 `primaryIntent` 约束。

如果当前页面底部上一篇/下一篇仍按标题排序，请在最小范围内让它服从显式路线顺序，或者取消其“线性下一步”的含义。不要创建第二套重复路线数据。

### 5.4 显示文章特定的下一步行动

当前 `src/data/article-sections.ts` 会提取 `## Next action`，但共享英文布局没有展示该段文章特定正文。

采用最小修复：

- 先增加失败测试，证明文章特定 next action 在生成页面中可见；
- 在 `src/layouts/GuideLayout.astro` 中复用现有 `sections.nextAction`；
- 有文章特定内容时显示它；
- 没有文章特定内容时保留现有安全 fallback；
- 不重复显示两套相同 CTA；
- 不移除官方核验提醒、免责声明、相关指南或现有可访问结构。

不要为这项修复重构整个 GuideLayout 或 article section 系统。

## 六、P1：中文 Germany A1 内容闭环

### 6.1 新增页面

新增以下三个活动 Astro 页面：

- `src/pages/zh/guides/goethe-a1-germany-family-reunion.astro`
- `src/pages/zh/guides/goethe-a1-test-centers.astro`
- `src/pages/zh/guides/german-a1-exam-booking-timeline.astro`

三个页面分别只解决一个核心任务：

1. **可接受证明：**如何向最终决定机关确认准确证书、等级、考试版本和材料形式；
2. **官方考点核验：**如何确认考点授权状态、准确考试产品、日期、费用、证件和退改规则；
3. **报名时间线：**如何使用用户已确认的考试、出分、取证和材料节点倒排计划。

### 6.2 中文页面写作边界

中文页面必须：

- 按中文读者问题自然重写，不逐句机械翻译英文；
- 在前三句话内说明适用对象、当前可确认范围和下一步；
- 明确最终决定机关、考试主办方和当地考点分别负责什么；
- 不给出固定费用、考位、日期、出分周期、证书寄送时间、复考间隔或签证处理时间；
- 不判断个案豁免或保证证书被接受；
- 不使用“最稳、一定接受、默认考试、包过、保证赶上”等表达；
- 不暴露“搜索意图、受控数据、来源事实表、发布前人工核验清单”等内部编辑术语；
- 保留官方来源区、核验提醒、免责声明、下一步和过期信息报告入口；
- 只有独立完成中文来源和翻译复核时才改变中文来源状态。

英文来源状态不能自动继承到中文页面。若没有完成独立中文来源复核，中文记录保持 `sourceReviewStatus: pending`，不填写 `sourceReviewedAt`，不虚构 `translation-review`。

### 6.3 中文受控数据与布局

同步更新：

- `src/data/zh-germany-a1.ts`
- `src/components/ZhGuideLayout.astro`，仅限新增页面和受控元数据真实需要的最小变化

按当前项目模式为新增记录维护真实字段。需要扩展中文受控数据时，优先复用英文内容模型和 `source-review.ts` 的受控枚举，避免创建平行概念。

至少保证每条中文记录能够表达：

- slug；
- title；
- description；
- publishedDate；
- updatedDate；
- readingTime；
- contentStatus；
- sourceReviewStatus；
- 来源复核日期和角色，仅在真实复核完成时存在；
- audienceScope；
- 最终决定机关类型；
- 官方主管机关 URL；
- 考试主办方 URL；
- 本地执行核验提示；
- 下一篇与补充指南关系。

不要继续依赖固定的全站中文更新时间或固定阅读时长来代表所有页面。

### 6.4 中文 Hub 与用户路线

更新：

- `src/pages/zh/germany-family-reunion-a1.astro`

修复现有语义错位：

- “确认可接受证明”必须指向新增接受证明页，不能继续由考试比较页代替；
- “核验考点与报名”必须指向新增官方考点核验页；
- “制定时间线”必须指向新增报名时间线页或现有时间线工具，不能指向 30 天学习计划；
- 学习计划应出现在要求、证明、考点、报名和时间线之后；
- 复考作为条件分支显示；
- 暂时没有中文等价页的补充内容必须明确标注为英文指南或英文工具，不能静默跳过。

### 6.5 双语映射、canonical 与 hreflang

同步更新：

- `src/data/site.ts` 中的受控双语路径；
- 与新增路由直接相关的 canonical、hreflang 和 JSON-LD；
- 必要的 Hub 和内部链接。

要求：

- 中英文对应页互相引用；
- 每页 self-canonical；
- canonical 使用绝对 HTTPS trailing-slash URL；
- `x-default` 继续指向英文默认页；
- 只为解决同一核心任务的真实等价页面输出 hreflang；
- 中文指南具有与可见内容一致的 Article 和 BreadcrumbList JSON-LD；
- 不把明显中国本地化、范围不同的页面强行声明为英文页的等价翻译。

## 七、品牌与编辑规则

内容遵循“前瞻、锐度、温度”。

### 7.1 前瞻

提前指出：

- 用户下一步要确认什么；
- 谁最终决定；
- 哪些时间节点存在风险；
- 需要保留哪些官方页面、回复、报名确认和付款记录；
- 未通过时如何重新计算时间和费用缓冲。

### 7.2 锐度

- 一页只解决一个主要决策；
- 删除不影响行动的背景和重复免责声明；
- 明确区分主管机关、考试方、考点和 VisaLang；
- 标题、description、Direct answer、正文和 CTA 的确定程度必须一致；
- 页面只能提供核验流程时，使用 “How to verify…” 或“如何核验……”类标题；
- 不用“通常、一般、往往、可能接受”掩盖证据缺口。

### 7.3 温度

- 承认时间、费用、学习基础和复考压力；
- 不羞辱基础薄弱或未通过考试的用户；
- 不用空泛鼓励替代具体行动；
- 不承诺通过、考位、签证结果或材料接受。

### 7.4 禁用表达

避免或删除：

- `comprehensive guide`
- `ultimate guide`
- `one-stop solution`
- `navigate the complex world of`
- `decision support`
- `manual checks still needed`
- “全方位解析”
- “一站式解决”
- “轻松搞定”
- “最稳”
- “默认选择”
- “一定接受”
- “包过”
- “保证赶上”
- “发布前人工核验清单”
- “搜索意图”
- “受控数据”
- “来源事实表待完成”

## 八、页面结构与 SEO 规则

### 8.1 页面唯一职责

保持以下分工：

- Germany A1 Hub：完整路线导航；
- requirement guide：如何确认是否需要 A1、谁决定和需要准备什么信息；
- accepted-proof guide：如何确认准确证书和材料形式；
- comparison guide：只比较已被主管机关确认可能适用的考试；
- FAQ：只回答不能由 requirement guide 简洁覆盖的独立次级问题。

若 FAQ 与 requirement guide 大量重复，优先合并重复内容或收窄 FAQ，不新增模板化问题来补长度。

### 8.2 标题与元数据

英文 Markdown 继续满足现有 schema：

- 文件名等于 `${slug}.md`；
- slug 唯一；
- description 满足当前测试要求的 70–170 个字符；
- `publishedDate` 保持首次发布日期；
- `updatedDate` 仅代表实质内容更新；
- `readingTime` 使用当前 schema 规定的类型；
- 正文至少有一个真实、相关、可追踪的 HTTPS 官方来源；
- Markdown 正文不添加第二个 H1。

不要创建 `seoTitle` 或新 schema 字段，除非现有标题无法在不扩大范围的情况下解决，并且有失败测试证明需要该字段。

### 8.3 内链与面包屑

- 所有内部链接使用 trailing slash；
- 不使用 `href="#"`、空链接或 legacy `.html` URL；
- Hub 链接到 requirement、choice、local-execution、timeline、documents、study 和 submission/retake；
- 指南链接回 Hub 或所属分类；
- anchor 描述用户任务，不只写“Learn more”或“阅读更多”；
- 英文和中文指南保留可见 breadcrumb；
- BreadcrumbList 与可见 breadcrumb 一致。

### 8.4 Sitemap 与测试 fixture

构建后检查 sitemap：

- 不包含 `__source-review-` 测试 fixture；
- 不包含 legacy `.html` URL；
- 不包含 noindex 法律页；
- 不包含重定向前 URL；
- 包含新增的三个中文 canonical 路由；
- guide `lastmod` 继续来自真实内容更新时间，不使用构建时间冒充更新日期。

如果现有测试 fixture 会污染 `dist` sitemap，先写失败断言，再在测试清理或 `scripts/launch-check.js` 中做最小修复。不要为此重写 sitemap 架构。

### 8.5 FAQ 与 HowTo

- FAQPage 只能描述页面上真实可见的问答；
- 不把全站通用免责声明包装为 FAQ；
- 不让同一套 FAQ 复制到多篇指南；
- 不为签证结果、豁免、资格判断或证书接受添加 HowTo；
- 本轮不主动增加新的 HowTo schema。

## 九、测试先行执行顺序

严格按以下顺序执行：

1. 运行 `git status --short --branch`，记录基线；
2. 阅读规则、schema、审计记录、目标内容、相邻页面和相关测试；
3. 建立高风险主张的来源检查记录；
4. 写入最小失败测试，至少覆盖：
   - 7 篇目标指南来源状态字段的条件约束；
   - requirement guide 的正确决策阶段；
   - Germany A1 主路线不存在直接双向 `nextGuideSlug` 循环；
   - 文章特定 next action 在生成页面中可见；
   - 3 个新增中文路由、Hub 入口和受控数据记录存在；
   - 中英文 reciprocal hreflang；
   - sitemap 不含测试 fixture 和 legacy `.html` URL；
5. 运行聚焦测试，确认新增断言在实现前因预期行为缺失而失败；
6. 实施最小内容和必要支撑变更；
7. 运行聚焦测试，修复本轮引入的问题；
8. 运行完整测试和 launch check；
9. 检查 diff、生成文件和未说明修改；
10. 只有全部验证通过后才报告 `PASS`。

不得通过删除断言、放宽状态规则、固定页面数量或忽略失败来获得绿色测试。

## 十、允许修改的范围

允许修改：

- 本任务列出的 7 篇英文指南；
- 为修复主路线关系而必须同步的 Germany A1 英文指南 frontmatter；
- 新增的 3 个中文 Astro 页面；
- `src/data/zh-germany-a1.ts`；
- `src/data/site.ts`；
- 英文和中文 Germany A1 Hub；
- `src/layouts/GuideLayout.astro`，仅用于显示文章特定 next action；
- `src/components/ZhGuideLayout.astro`，仅用于受控元数据和新增中文页一致性；
- 与目标变化直接相关的最小测试；
- `scripts/launch-check.js` 或测试清理逻辑，仅当失败测试证明 sitemap fixture 污染确实存在；
- `docs/TASK_LOG.md`，仅在实际工作完成并验证后，按既有格式记录真实结果。

## 十一、禁止项

不得：

- 新增或扩写 UK、Canada、Italy、Spain、France、Finland、Netherlands、Portugal 等其他国家页面；
- 新增 Germany B1 页面；
- 提升 Germany B1 的 `core-route` 状态；
- 提升 TestDaF 的 `starter-overview` 状态；
- 批量改写 telc、B1、TestDaF 或其他无关集群；
- 创建费用数据库、考位数据库、出分时间表或实时库存功能；
- 修改视觉设计、全站样式或创建平行设计系统；
- 修改工具业务、广告、支付、邮件、上传、账号或商业流程；
- 添加依赖或修改 `package-lock.json`；
- 编辑 `dist/`、`.astro/`、`node_modules/`；
- 编辑或删除 legacy 根目录 HTML/CSS/JS；
- 创建无真实来源支持的公开占位页面；
- 虚构作者、专家、审稿人、人工审核或机构资质；
- 使用 Last Updated 代替来源复核日期；
- 运行不存在的 `npm run lint` 或 `npm run typecheck`；
- 提交、推送或部署。

## 十二、验证命令

先运行聚焦测试：

```bash
node tests/content-integrity.test.js
node tests/germany-a1-cluster.test.js
node tests/source-review-render.test.js
```

如果新增或更新了其他直接相关测试，也逐个运行并记录结果。

最终必须运行：

```bash
npm test
git diff --check
npm run launch-check
```

只有以下条件全部成立才能报告 `PASS`：

- 聚焦测试退出码为 0；
- `npm test` 退出码为 0；
- `git diff --check` 无输出；
- `npm run launch-check` 退出码为 0，最终输出 `READY.`；
- 新增三个中文路由出现在构建产物和 sitemap；
- sitemap 不含 `__source-review-` 和 legacy `.html` URL；
- 工作树没有本轮意外留下的测试 fixture；
- 没有未说明的中英文事实冲突；
- 没有把未核验来源标为 reviewed。

任一验证失败时：

1. 停止完成声明；
2. 报告准确命令、退出码和首个可操作错误；
3. 判断失败是否由本轮引入；
4. 只修复本轮直接导致的问题；
5. 不放宽测试，不删除断言；
6. 无法在本轮范围内修复时报告 `PARTIAL` 或 `BLOCKED`。

## 十三、验收场景

至少验证以下用户场景：

1. 英文用户从 Germany A1 Hub 按 requirement、accepted proof、comparison、centre、timeline、documents、study 顺序前进；
2. 从搜索直接进入考试比较页的用户能看到来源状态和“核验官方考点”的文章特定下一步；
3. 从搜索直接进入考点或费用页的用户不会看到未经当地官方来源确认的固定费用、日期或考位；
4. 中文用户从中文 Hub 能进入可接受证明、官方考点和报名时间线三个新增页面；
5. 中文 Hub 的“制定时间线”不再错误指向 30 天学习计划；
6. 直接进入学习计划的用户会先被提醒确认要求、证书和考试日期，不获得“30 天必过”承诺；
7. 考试未通过的用户进入 retake 分支，并被要求重新核验考点规则和时间线；
8. `complete-route` 且 `sourceReviewStatus: pending` 的页面明确说明“路线结构完整”不等于“官方事实已核验”；
9. 新增中文页面的 canonical、hreflang、Article 和 BreadcrumbList 与可见内容一致；
10. 测试结束后的 sitemap 不包含测试 fixture。

## 十四、最终汇报格式

完成后使用以下结构汇报，不省略失败或未完成项。

### 结论

只能使用：

- `PASS`：范围内工作全部完成，全部验证通过；
- `PARTIAL`：完成了部分工作，但存在明确未完成项或非关键验证失败；
- `BLOCKED`：缺少官方来源、范围冲突或验证失败导致不能安全完成。

### 实际范围

列出：

- 实际处理的英文 slug；
- 实际新增的中文路由；
- 明确未处理的内容；
- 是否新增公开路由。

### 修改文件

逐文件说明修改目的，不只列文件名。

### 事实与来源处置

用表格列出：

- 页面或主张；
- 最终决定机关；
- 官方来源；
- 实际核验日期；
- 来源支持范围；
- 来源边界；
- 最终处置。

### Frontmatter 与状态

说明：

- `publishedDate` 是否保持；
- `updatedDate` 变更依据；
- `sourceReviewStatus`；
- `sourceReviewedAt`；
- `reviewedByRole`；
- `contentStatus` 是否变化以及依据。

### 路线、内链与双语

说明：

- 主路线顺序；
- 修复的 next-guide 循环；
- supporting guides；
- 中文对应页；
- canonical；
- hreflang；
- JSON-LD；
- sitemap。

### 验证

逐条列出实际运行的命令、退出结果和关键输出。不能只写“测试已通过”。

### 阻塞与人工复核

列出：

- 无法访问或无法支持主张的来源；
- 仍需主管机关确认的事实；
- 仍需编辑来源复核或中文翻译复核的内容；
- 未在本轮处理的相邻问题。

### 交付边界

最终明确写出：

- 未提交；
- 未推送；
- 未部署。
