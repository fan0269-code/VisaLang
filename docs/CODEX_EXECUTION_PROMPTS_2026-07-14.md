# VisaLang Codex 分步执行提示词

> **目的：** 将 `CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md` 中已确认的内容、可信度、UI 和无障碍改造，拆成可独立执行、可回归验证的 Codex 工作包。
>
> **使用方式：** 按编号顺序，一次只把一个“Codex 提示词”完整交给 Codex。每一步完成后先审查 diff、运行该步骤要求的验证，再开始下一步。不要把这些提示词合并为一次大重构。
>
> **前置阅读：** Codex 每次开始前应阅读 `CLAUDE.md`、`AGENTS.md`、`PROJECT_CONTEXT.md`、对应步骤指定的源文件和测试。以 `src/` Astro 源码为主，不以根目录 legacy HTML/CSS/JS 为主实现。

---

## 全局执行约束

以下约束已写入每个工作包，但首次运行时可一并提供给 Codex：

- 工作目录为 `VisaLang/`。先执行 `git status --short --branch`，识别已有修改；不得覆盖、回退或格式化无关的既有改动。
- 仅修改任务直接涉及的 Astro 源码、Markdown、测试和文档。禁止手工修改 `dist/`、`.astro/`、`node_modules/` 或非依赖变更所必需的 `package-lock.json`。
- 保留公开 URL 的 trailing slash 约定。公开路由、布局、SEO、站点地图、导航或内容结构变更，均运行 `npm test` 和 `npm run launch-check`。
- VisaLang 是**官方来源优先的核验导航站**，不是政府、考试机构、律所、移民顾问、大学录取方或报名平台。不得编造或保证资格、豁免、接受范围、费用、日期、成绩、签证结果、付款、邮件、人工审核或交付。
- 当前唯一 fully configured 路线为 **Germany family reunion A1**。其余路线必须保留 `official-verification-required` 回退，不能假装能给个案结论。
- 任务完成时报告：修改文件、关键行为变化、运行命令及结果、未解决的阻塞项。不要自行提交、推送或部署。

---

## Step 0：建立可执行基线与变更边界

**目的：** 先确认当前代码、测试和已有本地改动，避免后续任务在错误层或错误基线上实施。

### Codex 提示词

```text
你正在维护 VisaLang，一个使用 Astro、TypeScript、Markdown Content Collections 和 Node assert 测试的双语静态站点。

任务：只做实施前基线盘点，不修改产品源码、内容、样式或部署配置。请确认后续改造应在哪些真实 Astro 文件中实施，并记录当前工作区的既有修改。

必须遵守：
1. 先阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md。
2. 运行 git status --short --branch，不能覆盖或回退任何既有修改。
3. 阅读 package.json、src/content.config.ts、src/pages/index.astro、src/pages/guides/index.astro、src/layouts/GuideLayout.astro、src/layouts/BaseLayout.astro、src/styles/global.css、tests/site.test.js，以及相关 tests/ 入口。
4. 区分当前 Astro 源码层与根目录 legacy HTML/CSS/JS 兼容层。后续正常开发只能修改 src/、tests/、scripts/、docs/ 与必要 public/ 文件；不得把 legacy 层当作主实现。
5. 将盘点结果写入 docs/CODEX_IMPLEMENTATION_BASELINE.md，内容包括：
   - 当前 git 工作区状态摘要；
   - 各工作包会触及的真实文件映射；
   - 测试入口及可运行的验证命令；
   - 当前不能由 Codex 自行决定的外部输入：CMP/广告同意策略、官方政策事实复核、作者或审查角色的真实身份数据；
   - 发现的路径或文档不一致，仅记录，不顺手修复。

验收：只新增该基线文档；npm test 通过。不要提交、推送或部署。
最后用“修改文件 / 发现 / 验证 / 阻塞项”四段输出结果。
```

---

## Step 1：P0-1，拆分“内容更新”与“官方来源核验”

**依赖：** Step 0 完成。

**目的：** 防止 `updatedDate` 被误用为“官方来源最近核验日期”，避免提升高风险内容的新鲜度印象。

### Codex 提示词

```text
在 VisaLang Astro 源码中实施 P0-1：将“内容编辑更新”与“官方来源核验”彻底分离。

开始前：
- 阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md 的 P0-1 部分，以及 docs/CODEX_IMPLEMENTATION_BASELINE.md。
- 运行 git status --short --branch，保留所有既有改动。
- 阅读 src/content.config.ts、src/components/LastCheckedBadge.astro、src/components/GuideCard.astro、src/layouts/GuideLayout.astro、src/pages/index.astro、相关 Markdown guides 与现有内容测试。

实现要求：
1. 在 guides content collection schema 中增加并验证以下元数据，字段命名保持一致：
   - sourceReviewedAt：来源最后核验日期；
   - sourceReviewStatus：reviewed | pending | not-applicable；
   - reviewedByRole：editorial | source-review | translation-review；
   - contentStatus：complete-route | core-route | starter-overview | verification-pending。
2. 保持 publishedDate 与 updatedDate 的现有语义：它们只能表示发布或编辑更新，绝不能隐式表示官方来源已核验。
3. 所有“Official sources last checked”或同义 UI 只能读取 sourceReviewedAt，且仅当 sourceReviewStatus === 'reviewed' 时显示。
4. 若 sourceReviewedAt 缺失，或状态不是 reviewed，展示真实的 pending/not-applicable 状态。绝不能回退显示 updatedDate。
5. 首页“Recently updated”与“Recently source-reviewed”不得混用。若没有可靠的来源复核筛选数据，首页仅保留 Recently updated，并让卡片自己显示来源状态。
6. 不捏造历史来源复核日期。对当前未人工确认的数据，使用 pending 或在 schema 兼容策略中明确其未核验状态。不要为了消除校验错误而把 updatedDate 复制给 sourceReviewedAt。
7. 新增或更新聚焦测试，至少覆盖：有 updatedDate 但没有 sourceReviewedAt 时，HTML/组件输出绝不能包含“Official sources last checked”；reviewed 状态才显示核验日期；pending 状态给出清晰、非误导性文案。
8. 保持单一 H1、trailing slash、既有 canonical/hreflang/JSON-LD 行为不回归。

范围限制：不要在本任务中批量改写文章政策事实、重做首页布局、处理 CMP，或重构全站 CSS。

验证：
- npm test
- npm run launch-check
- 如测试未覆盖渲染输出，补充最小必要断言后再运行以上命令。

最后输出：修改文件、字段迁移策略、UI 文案状态矩阵、测试结果、任何需要人工来源复核的剩余项。不要提交、推送或部署。
```

---

## Step 2A：P0-2，高风险 Starter 路线审计与暂时安全降级准备

**依赖：** Step 1 完成。

**目的：** 先建立人工复核队列、可追溯证据边界和临时展示门槛，避免 Codex 擅自补全移民、国籍、考试接受范围等 YMYL 事实。本步骤不是 P0-2 的事实处置闭环。

### Codex 提示词

```text
在 VisaLang 中执行 P0-2 的“审计与安全降级准备”阶段。此任务的优先级是避免不受官方来源支持的高风险主张，不是增加文章数量或补写政策内容。

开始前：
- 阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md 的 P0-2 部分，以及 Step 1 的 schema/渲染实现。
- 运行 git status --short --branch；不得回退已有工作。
- 找出 Portugal Golden Visa/citizenship、Spain citizenship、UK visa/SELT、Canada immigration/TEF、Italy、France、Finland、Netherlands 相关 Markdown 指南与其前端引用位置。

严格限制：
- 不能联网猜测、生成、补全或改写任何政策事实、资格、年限、费用、日期、有效期、豁免、可接受证书或签证结果。
- 本批只覆盖上述指定路线。其他高风险页面只列入待审计清单，不能顺手改正文或提升内容状态。
- 没有人工提供的官方来源包时，不得把任一页面升为 Complete route 或 Core route。

实施：
1. 扩展内容 schema，使高风险指南可以承载并验证以下受控字段：
   primaryIntent、audienceScope、finalDecisionAuthorityType、primaryOfficialAuthorityUrl、examOwnerUrl、localExecutionPrompt。
2. 创建 docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md。每个指定页面一行，至少包含：文件路径、当前 contentStatus、涉及的高风险声明类别、最终决定机关是否已给出、考试方 URL 是否已给出、人工需要核验的官方来源、建议状态（starter-overview 或 verification-pending）。
3. 对当前已有的页面内容只做“可由现有代码直接证明”的安全降级：
   - 当没有 primaryOfficialAuthorityUrl 或来源核验状态不是 reviewed 时，不得在 UI 中展示该页面为 Complete/Core；
   - 使用不构成事实结论的核验行动提示，例如：
     “Before registering, check the current requirement with the authority that receives your application. This page helps you prepare the questions and official sources to use.”
   - 不改写没有得到人工来源确认的具体政策句子，除非只是删除明显无来源的断言并改为上述核验提示；若要删除，请在审计文档中精确记录原文件和理由。
4. 为状态门槛添加最小测试：仅有 examOwnerUrl、没有最终决定机关来源的页面不得显示 Complete/Core；未 reviewed 的高风险页面只能显示 starter-overview 或 verification-pending。
5. 确保 routes/cards/article headers 一致使用同一 contentStatus 数据，不要在组件中硬编码国家或路线例外。

验证：npm test 与 npm run launch-check 必须通过。

最后输出：审计覆盖页面列表、实际做过的安全降级、未改写的事实内容、需要人工提供的来源清单、测试结果。不要提交、推送或部署。
```

## Step 2B：P0-2，收到人工来源包后的逐页事实处置

**依赖：** Step 2A 完成，且每个待处理页面都已提供人工审核的来源包。

**目的：** 在来源证据到位后，逐页删除或来源限定高风险断言。没有这一步，状态徽章不能阻止正文继续渲染未经支持的主张。

> 每个页面缺少下方任何一项时，跳过该页面，保持 `verification-pending`，在审计文档中记录 BLOCKED，不得猜测或补写。

### Codex 提示词

```text
对 VisaLang 首批高风险 Starter 页面执行 P0-2 的逐页事实处置。你只能使用用户/编辑团队已提供并确认的官方来源包；不得联网猜测或自行补全政策事实。

每个待处理页面必须先具备以下人工输入：
- 最终决定机关 URL；
- 考试主办方或授权考点 URL（如该页面涉及考试）；
- sourceReviewedAt，格式 YYYY-MM-DD；
- 每个来源可支持的事实边界，以及仍须由读者确认的事项；
- 页面应维持的 contentStatus。

开始前阅读：CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md、对应页面 Markdown、Step 1 和 Step 2A 的实现。运行 git status --short --branch；不得覆盖既有改动。

逐页实施：
1. 将 primaryOfficialAuthorityUrl、examOwnerUrl、sourceReviewedAt、sourceReviewStatus、reviewedByRole、contentStatus 填入 frontmatter；值必须完全来自已提供来源包。
2. 逐条审查正文中关于资格、年限、费用、日期、有效期、豁免、可接受证书和结果的断言：
   - 来源包明确支持的，改写为具有明确适用范围和来源边界的表述，并在页面来源结构中可追溯；
   - 来源不支持或不适用于读者的，删除该断言，改成具体的官方核验步骤；
   - 不使用“通常”“一般”“应当可以”等模糊语气掩盖没有来源的结论。
3. Complete/Core 页面必须有来源事实表，且每一行只表述来源包允许支持的内容。Starter/Pending 页面不得伪造完整来源表。
4. 如果无法完成这一页的证据闭环，保持 verification-pending，并确认其正文、卡片、CTA 和工具入口都不暗示个案结论。
5. 在 docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md 更新每页的处置结果：保留/删除/限定的断言类别、使用的来源、核验日期、未解决问题。
6. 添加针对实际清理内容的最小测试：高风险页面在缺最终决定机关来源时不能出现 Complete/Core；页面元数据和 Article JSON-LD 与受控 frontmatter 一致。

本批仅处理 Portugal、Spain、UK、Canada、Italy、France、Finland、Netherlands 及审计文档明列的对应页面。不要顺带改写其他国家或新增页面。

验证：npm test、npm run launch-check。最后输出逐页处置清单、仍 BLOCKED 的页面、来源包边界、测试结果。不要提交、推送或部署。
```

---

## Step 3A：P0-3，广告、CMP 与隐私的“决策门”

**依赖：** Step 0 完成。**本步骤不直接接入 CMP 或广告 SDK。**

**目的：** 先把真实技术行为、法律文案和广告脚本之间的差异查清，避免 Codex 虚构供应商、同意状态或合规承诺。

### Codex 提示词

```text
对 VisaLang 的广告、Cookie、隐私和同意机制执行只读审计与实施准备。不要接入新的 CMP、广告供应商、分析 SDK 或追踪脚本；不要修改用户可见法律承诺，除非只是删除已被代码明确证明为不真实的陈述且在报告中说明。

开始前阅读：CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md 的 P0-3、src/layouts/BaseLayout.astro、src/pages/privacy-policy.astro、src/pages/cookie-policy.astro、public/_headers、public/robots.txt、astro.config.mjs 以及所有引用广告/CMP/cookie 的源码。

任务：
1. 执行 git status --short --branch，不覆盖已有改动。
2. 创建 docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md，准确列出：
   - 当前加载的第三方脚本、来源文件、触发条件、可能收集的数据类别；
   - 代码中真实存在的同意、拒绝、撤回、地区判断和持久化行为；
   - Privacy/Cookie 文案声称但代码没有实现的行为；
   - 代码实现但文案没有覆盖的行为；
   - 是否会在同意前加载非必要广告技术；
   - 可验证的网络请求检查点。
3. 在文档末尾给出明确 BLOCKED 决策清单，要求产品/广告运营/法务提供：目标地区、适用同意框架、CMP 供应商或无 CMP 策略、允许的供应商列表、用户同意状态存储期限、同意前的广告加载规则。
4. 只在没有新增承诺的前提下，为后续实现预留最小接口说明。不要创建“假的”同意横幅、假供应商列表或声称 GDPR/UK GDPR 已合规。
5. 如当前页面含有明显与真实代码矛盾的确定性陈述，提出精确变更建议，但把实际修改留到产品决策输入到位后。

验证：npm test；如果此次只改文档则无需人为增加不存在的运行时测试。不要提交、推送或部署。
最后输出：当前真实行为、文案差异、必须由业务确认的决策、建议的后续实施顺序。
```

### Step 3A.1：未确认策略时的安全临时处置

**依赖：** Step 3A 审计已确认存在非必要广告/追踪技术在同意前加载，或 Privacy/Cookie 文案与代码真实行为不一致。

> 这不是虚构 CMP：它只暂停未经批准的非必要技术并让文案如实反映当前行为。如果产品不同意暂停，则该 P0 风险不可关闭，站点不得被标为可发布。

```text
根据 docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md 实施 VisaLang 的最小安全临时处置。仅当审计明确发现未决同意策略下的非必要广告/追踪加载，或法律文案与真实代码矛盾时执行。

开始前：阅读 CLAUDE.md、AGENTS.md、审计报告、BaseLayout、Privacy/Cookie 页面、当前第三方脚本调用和相关测试；运行 git status --short --branch。

实施要求：
1. 在没有已批准地区/同意策略的范围内，暂停或移除所有非必要广告、营销和追踪脚本的无条件加载。不要添加伪 CMP、伪同意横幅、伪供应商清单或新的第三方 SDK。
2. 将 Privacy/Cookie 文案收敛到代码已经实现的真实行为。若无法使用已批准文案准确描述，就以明确的“广告/同意功能尚未启用”或等价事实陈述替代，不作合规承诺。
3. 必要的站点功能、官方来源链接、正文、表单和核验工具仍应可用；广告移除不得造成页面错误或遮挡。
4. 记录被暂停的脚本、文件、原因、恢复所需的 Step 3B 决策输入。
5. 添加最小测试或静态断言，确保未获同意策略时非必要脚本不再无条件注入。

验证：npm test、npm run launch-check，并用浏览器网络面板确认首次加载不再请求被暂停的非必要域名。
最后输出：暂停的技术、文案变化、网络验证证据、恢复条件。不要提交、推送或部署。
```

### Step 3B：收到业务/法务决策后才使用的实施提示词

> 在下方尖括号内容均已由业务确认前，不要执行。

```text
根据已确认的广告与同意策略实施 VisaLang 的 CMP/广告加载改造。

已确认输入（缺一项即停止并报告 BLOCKED）：
- 适用地区：<地区列表>
- CMP 或替代方案：<供应商及版本，或明确无 CMP 策略>
- 广告/追踪供应商白名单：<列表>
- 同意前允许加载的技术：<列表>
- 接受、拒绝、撤回后的加载规则：<规则>
- 同意状态存储与过期规则：<规则>
- Privacy/Cookie 页面需使用的经批准文案：<文案或文档路径>

先阅读 docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md，并严格按确认输入实现，不自行扩大供应商或地区范围。

实现要求：
1. 非必要广告技术只在有效同意后加载，除非上方已明确批准其他行为。
2. 接受、拒绝、撤回均可重复操作、具有可访问名称和键盘路径；撤回后立即停止后续非必要加载。
3. Privacy/Cookie 文案仅描述已部署的真实行为。
4. 广告不得遮挡正文、官方来源、表单、错误信息或验证步骤。
5. 加入可测试的同意状态逻辑，并记录同意前、接受、拒绝、撤回四种状态下应出现和不应出现的网络请求。

验证：npm test、npm run launch-check，并通过浏览器网络面板或自动化测试验证四种状态。最后输出实际行为矩阵与验证证据。不要提交、推送或部署。
```

---

## Step 4：P1-1 至 P1-3，内容成熟度、责任链与旅程式内链

**依赖：** Step 1 与 Step 2A 完成；首批高风险页面若要脱离 `verification-pending`，还必须完成 Step 2B。

**目的：** 让所有路线页面的能力边界、编辑责任和下一步行动都从同一数据源表达。

### Codex 提示词

```text
在 VisaLang Astro 源码中实施内容成熟度、责任链和内部链接的统一数据模型。不要批量扩写文章政策事实，也不要把未审查路线提升为更高成熟度。

开始前：阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、内容改造简报 P1-1/P1-2/P1-3、Step 1、Step 2A 与（如适用）Step 2B 的输出；运行 git status --short --branch；阅读 src/content.config.ts、GuideLayout、GuideCard、RelatedGuides、首页、guides index、about、editorial-policy、ZhGuideLayout、src/data/zh-germany-a1.ts、相关中英文页面、数据模块和测试。

实现要求：
1. 统一 contentStatus，并使首页、About、指南库、分类/路线入口、Guide Card、文章页头部从同一内容数据读取状态。状态为：complete-route、core-route、starter-overview、verification-pending。
2. 固定当前基线：Germany family reunion A1 = complete-route；Germany B1 = core-route；TestDaF = starter-overview。不能因视觉或数据迁移方便把 TestDaF 提升为 Core。
3. 建立状态到 CTA 的受控映射：
   - complete-route 可以引导 Route Finder、Checklist、Route Hub 或明确下一步；
   - core-route 引导同路线核心决策和官方来源；
   - starter-overview 引导最终决定机关、考试方、路线分类；
   - verification-pending 只提供状态说明与官方入口，不提供个案判断工具。
4. 作者与审查信息必须来自真实 Markdown author/role 数据。可使用 Editorial team、Source review、Translation review 等真实角色；禁止虚构专家资质、律师、人工审稿服务。`[slug].astro` 必须把 author、reviewedByRole 和来源审核状态传给 GuideLayout；可见元信息与 Article JSON-LD 必须从同一受控 frontmatter 数据源生成，不能再无条件把作者写死为组织。
5. 中文内容必须同步采用同一来源日期、内容状态和责任链语义：显式审查 ZhGuideLayout、`src/data/zh-germany-a1.ts` 与对应 `src/pages/zh/guides/*.astro`。若本维护窗口不能迁移中文文章，必须保留非误导性的旧页面边界，并在最终交接中列为未完成项，不得把“中文入口可访问”当作中文内容已完成改造。
6. 为高风险文章展示 Content status、Updated、Source reviewed、Written by、Reviewed by role，并提供真实可维护的 correction/reporting 入口。
7. 扩展并验证受控内链字段：primaryIntent、decisionStage（requirement | choice | local-execution | submission-review）、nextGuideSlug、supportingGuideSlugs、comparisonScope（same-route | cross-country-comparison）。
8. Related Guides 至少有一条与同国家、同路线或同决策阶段一致的链接。跨国链接只有 comparisonScope === 'cross-country-comparison' 且意图明确时才显示。
9. 路线总数等统计必须由 taxonomy/content 数据生成，不得写死数字。
10. 增加最小必要测试：状态基线、CTA 不能越权、nextGuideSlug 可解析、跨国 comparisonScope 门槛、Related Guides 同路线/阶段约束，以及页面可见作者/角色与 Article JSON-LD 使用相同受控数据。

范围限制：不重做首页视觉、Guide Library 筛选、工具交互、广告/CMP 或全站 token。

验证：npm test 与 npm run launch-check。
最后输出：数据字段说明、状态-CTA 映射、修改文件、迁移时标为 pending 的内容、测试结果。不要提交、推送或部署。
```

---

## Step 5：P1-4，首页改为“内容与证据优先”

**依赖：** Step 4 完成；如有 Open Design 首页稿，以其批准版本为视觉输入。

**目的：** 减弱 SaaS onboarding 感，先让用户看懂站点边界、成熟路线和可信内容入口。

### Codex 提示词

```text
在 VisaLang 中实施首页信息架构改造。目标是内容与证据优先，不是重做成 SaaS dashboard 或营销 landing page。

开始前：阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、内容改造简报 P1-4、Open Design Prompt 1 的已批准设计稿（如有）、src/pages/index.astro、RouteSelector、GlobalHeader、GuideCard、TrustNotice、相关样式与测试。先运行 git status --short --branch，不覆盖已有改动。

设计与实现要求：
1. Hero 只保留一个主 CTA：Start your verification route；仅保留一个非同义的次 CTA：Browse verified guides。
2. 不在 Hero 放大型 Route Console 或复杂表单。将 Route Selector 降为轻量“Start here”卡，说明 purpose、receiving organisation、what to verify first，并链接到完整 Route Finder。
3. Hero 紧随其后放 trust strip：Official-source-first、source review status、VisaLang does not decide your individual case，并有低干扰的 How we verify information 链接。
4. 第一个主要内容区先展示成熟路线与最新受控指南，而不是工具营销模块。路线须由 contentStatus 数据驱动，并明显区分 Complete/Core 与 Starter/Pending。
5. 最新指南卡展示标题、direct answer、Country/Route、content status、Updated、Source reviewed 或 pending、reading time，且只有一个主可聚焦入口。
6. 用紧凑的四步流程表达“Identify receiving organisation → Confirm accepted proof → Compare official exam options → Verify local execution details”。不要做四张 SaaS 功能卡。
7. 保留现有 SEO、单一 H1、canonical/hreflang/OG/JSON-LD 和 trailing slash 行为；不要改动 legacy 静态首页。
8. 以现有 token/class 为主进行最小样式调整。不要引入紫色渐变、玻璃拟态、装饰球、厚阴影或大面积空洞留白。
9. 在 375、768、1024、1440px 确保：3 秒内能理解用途、主行动、内容入口与官方边界；不填写表单也能浏览；没有两个同义主 CTA；无横向滚动。
10. 为关键结构和 CTA 层级补充最小测试或 launch-check 断言。

验证：npm test、npm run launch-check；用本地开发/预览检查 375px 与 1440px 首页。
最后输出：修改文件、信息架构变化、响应式检查结果、验证结果、与设计稿不一致之处。不要提交、推送或部署。
```

---

## Step 6：P1-5，Guide Library 内容优先与筛选辅助

**依赖：** Step 4 完成；如有 Open Design Guide Library 稿，以其批准版本为视觉输入。

### Codex 提示词

```text
改造 VisaLang 的 /guides/ Guide Library，使文章结果优先、筛选作为辅助。不得重写内容 collection 或将筛选改成依赖后端。

开始前：阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、内容改造简报 P1-5、Open Design Prompt 2 的已批准稿（如有）、src/pages/guides/index.astro、FilterBar、SearchInput、GuideCard、相关 URL query 逻辑、global.css/open-design.css、测试。运行 git status --short --branch，保护已有改动。

实现要求：
1. 搜索框始终可见；Purpose 与 Country 为快捷筛选；其他筛选和排序放进 More filters 或语义正确的 details/summary。
2. <=900px 时高级筛选默认关闭。初始视口不能因筛选面板使文章列表被推到首屏之外。
3. 显示 active filter chips、可理解的结果数、Clear all；筛选改变后使用 aria-live 通知结果数。
4. 保持或增强 URL-backed filter 行为，使筛选可分享、刷新可恢复，且不写入敏感信息。
5. 每张 Guide Card 只允许一个主要键盘焦点/链接。卡片显示 content status、Country/Route、Updated、source reviewed/pending、reading time 和 direct answer。
6. 不用虚构缩略图或无信息价值图片填充卡片。用排版、标签、细分隔线表达扫描层级。
7. 375/768/900px 初始状态能看见至少两条结果；无页面横向滚动；键盘可以展开筛选、筛选、清除；状态不只依赖颜色。
8. 不改变公开 URL、title、canonical、CollectionPage/ItemList JSON-LD 和现有筛选数据语义，除非测试同步证明新行为。
9. 添加或更新最小测试：高级筛选窄屏默认收起、单卡单焦点、结果数 aria-live、Clear all 和 query 恢复。

验证：npm test、npm run launch-check，并在 375/768/900/1440px 手动检查。
最后输出：修改文件、筛选行为矩阵、无障碍实现说明、响应式检查和测试结果。不要提交、推送或部署。
```

---

## Step 7：P1-6，Guide Article 的信任结构与阅读体验

**依赖：** Steps 1、2、4 完成；如有 Open Design Article 稿，以其批准版本为视觉输入。

### Codex 提示词

```text
在 VisaLang 文章页实施“高风险内容的信任与阅读结构”改造。请以 GuideLayout 为主，保持 Markdown 内容、文章 JSON-LD 和现有指南 URL 的兼容性。

开始前：阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、内容改造简报 P1-6、Open Design Prompt 3 的已批准稿（如有）、src/layouts/ArticleLayout.astro、src/layouts/GuideLayout.astro、src/components/ZhGuideLayout.astro、ArticleTOC、RelatedGuides、LastCheckedBadge、GuideCard、文章内容 schema、中文文章数据和相关测试；运行 git status --short --branch。

实现要求：
1. 文章头部按一致顺序显示：Content status、Country/Route、H1、Direct answer、Updated、Source reviewed 或 pending、Written by、Reviewed by role、Reading time。
2. 加入 “Who decides this?” 区块：最终决定机关类型、primaryOfficialAuthorityUrl、VisaLang 不做的判断。若来源未审查或 URL 缺失，显示明确的 official verification pending，不得编造机构或链接。
3. 为 Complete/Core 内容提供可读的 “What to verify officially” 来源事实表，列为：核验事项、谁最终决定、官方来源、本页确认范围、用户仍需确认。没有人工审核来源时，不得制造看似完整的来源表。
4. 通过步骤、核验清单、风险提示和下一步行动改善扫描效率，但不要将未经人工来源确认的正文政策事实改写得更具体。
5. Related Guides 必须像同一用户旅程的下一步，沿用 Step 4 的受控内链规则，不能像广告。
6. 窄屏下 TOC 的 DOM 顺序、视觉顺序和键盘焦点顺序必须一致。禁止用 CSS grid-row 只移动视觉位置而不改 DOM 顺序。
7. 悬浮推荐不得遮挡移动端正文、来源表、错误提示或底部行动。
8. 保持单一 H1，英文正文行长约 55–75 字符，移动正文不小于 16px，来源表保留语义表格或等价可访问结构。
9. 维护 Article/BreadcrumbList JSON-LD、canonical、hreflang 与现有 markdown 渲染。Article JSON-LD 中的 author 与可见元信息必须使用同一 frontmatter 数据；不得无条件硬编码组织作者。
10. 若 Step 4 已同步迁移中文文章，中文文章页也必须显示不误导的来源日期、状态和责任链；若未迁移，明确维持其 pending 边界并将其列为未完成项。新增针对元信息来源、TOC 焦点顺序或来源表状态的最小测试。

验证：npm test、npm run launch-check；本地检查至少一篇 Complete、Core、Starter/Pending 英文文章，以及一篇已迁移或明确标注边界的中文文章在 375/768/1440px 的表现。
最后输出：修改文件、各 contentStatus 的文章头部行为、来源表门槛、响应式/键盘检查、测试结果。不要提交、推送或部署。
```

---

## Step 8：P1-7 至 P1-9，工具表单的错误语义、真实进度与存储策略

**依赖：** Step 0 完成。

**目的：** 工具能明确自己做什么、当前处于哪一步、输入如何保存，且空提交对键盘与读屏用户可理解。

### Codex 提示词

```text
改造 VisaLang 工具页面的可访问验证、步骤状态和数据持久化表述。不要扩大工具的决策能力，也不要接入账号、邮件、支付、文档上传或后端服务。

开始前：阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、内容改造简报 P1-7/P1-8/P1-9、src/pages/tools/route-finder.astro、checklist-generator.astro、timeline-calculator.astro、exam-comparison.astro、email-reminders.astro、ToolShell、ToolStepper、ToolResultPanel、相关 data 模块与测试。运行 git status --short --branch。

实现要求：
1. 所有使用 novalidate 的表单均实现真实客户端验证：
   - 无效字段有 aria-invalid="true"；
   - 每条字段错误都有稳定 ID；
   - aria-describedby 关联到对应帮助与错误文本；
   - 空/非法提交后显示错误摘要，焦点移至第一个无效字段；
   - 修正输入后清除错误状态；
   - 不只用颜色表示错误。
2. ToolStepper 不得继续固定 current={1}。使用真实状态：初始为 Step 1，开始输入后 Step 2，成功生成结果后 Step 3；任意时刻仅一个 aria-current="step"。如果某工具没有可靠的多步状态模型，则移除伪进度而不是假装进度存在。
3. 对每个工具明确持久化策略并在 UI 中说真话。默认优先采用现有 URL query 恢复机制：只存恢复结果所需的非敏感字段，刷新/新隐私窗口可恢复同一结果。若某工具改为 localStorage 草稿，则明确“仅保存在此设备”、提供清除动作、说明生命周期，且 URL 不暗示可分享恢复。
4. 禁止接收或建议保存护照、签证文件、报名号、支付信息等敏感数据。
5. Germany family reunion A1 仍是唯一 configured 结果；其他路线继续显示 official-verification-required，并给出机构类型、官方入口和应询问的问题，而不是资格结论。
6. 用原生字段语义优先，保持可见 label、required 标记、清晰的示例/帮助文本和 44px 以上触控目标。
7. 添加最小测试，覆盖：空提交错误语义、修正后错误清除、stepper 状态转移、configured 路线与安全回退、URL 或 localStorage 策略的真实恢复行为。

验证：npm test、npm run launch-check；在浏览器中用键盘进行每个工具的一次空提交和一次成功流程，并检查 375px 不横向溢出。
最后输出：每个工具的验证模式、stepper 行为、存储策略、可访问性证据、测试结果和仍需人工决策项。不要提交、推送或部署。
```

---

## Step 9：P2-1，导航、单选和窄屏对比表可访问性

**依赖：** Step 8 可独立，但建议在 Step 5 后执行以减少导航冲突。

### Codex 提示词

```text
完成 VisaLang 的 P2-1 交互语义修复：单选控件、当前导航状态和窄屏考试对比表。只做这些直接问题，不重做全站视觉系统。

开始前阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、内容改造简报 P2-1、GlobalHeader、MobileNavigation、首页 RouteSelector/Purpose/Status 控件、exam-comparison 工具页面及相关样式/测试；运行 git status --short --branch。

实现要求：
1. 将首页互斥的 Purpose/Status 选择器改成原生 radio + fieldset/legend，或完整的 ARIA radiogroup。不得继续用一组互斥 aria-pressed 按钮冒充单选。
2. 单选必须有正确可见状态和方向键行为；状态不能只用颜色表达。
3. 当前导航项目加 aria-current="page"。若 Routes/About 同时需要页面链接和展开菜单，页面导航与展开控件必须使用语义不同、名称明确的独立元素，不能让一个链接同时承担两个冲突行为。
4. Exam Comparison 在 375px 时用有可访问名称的可聚焦 region 容器包住可横向滚动的表格，并在视觉上提示“左右滚动查看全部列”。保留真实 table 语义及表头关联。
5. 避免新增重复 Tab stop、焦点陷阱或横向整页滚动。
6. 更新最小必要测试，验证 aria-current、单选语义、表格容器和窄屏提示。

验证：npm test、npm run launch-check；用键盘检查 radio、桌面/移动导航和 375px 表格横向访问。
最后输出：修改文件、键盘行为、屏幕阅读器语义、响应式检查、测试结果。不要提交、推送或部署。
```

---

## Step 10：P2，样式层收敛，不做视觉大爆炸

**依赖：** Steps 5、6、7、8、9 完成，且关键页面设计方向已确认。

**目的：** 解决 `global.css` 与 `open-design.css` 的 token、组件、断点重复覆盖问题，但严格避免借机全站重写。

### Codex 提示词

```text
对 VisaLang 执行受控的样式层收敛。目标是建立单一、可追溯的活动 token 和断点来源，保持已批准的首页、Guide Library、Guide Article、工具和导航视觉效果，不进行无关视觉重构。

开始前：阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、内容改造简报 P2、src/styles/global.css、src/styles/open-design.css、所有被这两份样式表覆盖的核心组件与布局。运行 git status --short --branch。先产出内部映射，再编辑。

必须执行：
1. 先列出 global.css 和 open-design.css 中重复/冲突的 token、组件规则、断点和覆盖顺序。仅针对被首页、Guide Card、文章、Tool Form、Header 使用的规则确定迁移方案。
2. 建立一个唯一活动样式来源。可以按 tokens.css、base.css、components.css、layouts.css、utilities.css 拆分，也可以在当前规模下保留单一 global.css；选择应以最小改动为准。无论采用哪种形式，每个核心 token 只能有一个有效定义。
3. 统一并限制响应式断点为 375 / 768 / 1024 / 1440 的明确策略，不再叠加互相矛盾的临时媒体查询。
4. 把 Header、Guide Card、Guide Article、Tool Form、Home Hero 的样式来源写入 docs/STYLE_ARCHITECTURE.md，说明 token 文件、组件规则位置、断点意图以及不该再使用的覆盖层。
5. 删除或迁移只有在确认没有使用后才可删除的重复规则。不要删除无法确定用途的 legacy 样式；记录而不是猜测。
6. 不引入新的大圆角、紫色渐变、玻璃拟态、装饰 blob、厚阴影或 SaaS 卡片网格。链接、按钮、focus、error、selected、disabled 状态需保持清晰且不只依赖颜色。
7. 验证 375/768/1024/1440px 的首页、Guide Library、Guide Article、Route Finder 关键页面，无页面横向滚动、TOC/表单/卡片不发生布局回归。
8. 更新最小必要的测试和文档引用；不调整内容/SEO/工具业务逻辑。

验证：npm test、npm run launch-check，以及上述四个页面在四个断点的手动截图或浏览器检查。
最后输出：规则迁移映射、保留/移除的文件和原因、断点矩阵、视觉回归检查、测试结果。不要提交、推送或部署。
```

---

## Step 11：最终回归、内容边界复核与交接报告

**依赖：** 所有已执行步骤均通过各自验收。Step 3B 未执行时，仍可进行只读回归与交接，但最终判定必须为 `BLOCKED`，不得声称 P0 已关闭、不可发布的广告/CMP 风险已解决。

### Codex 提示词

```text
对已经完成的 VisaLang 内容与 UI 改造执行最终只读回归审查。除非发现阻止构建、严重无障碍故障、误导性官方来源状态或内容越权，否则不要修改源码；先报告问题，再等待确认范围。

开始前：阅读 CLAUDE.md、AGENTS.md、PROJECT_CONTEXT.md、docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md、docs/CODEX_IMPLEMENTATION_BASELINE.md、HIGH_RISK_ROUTE_SOURCE_AUDIT.md、CONSENT_AND_AD_TECH_DECISION_RECORD.md（如存在）、STYLE_ARCHITECTURE.md（如存在）及变更 diff。运行 git status --short --branch。

审查清单：
1. 构建与自动验证：npm test、npm run launch-check。
2. 公开页面：首页、/guides/、至少一篇 Complete、Core、Starter/Pending 指南、Route Finder、中文入口、Privacy/Cookie。
3. SEO：单一 H1、canonical、hreflang、OG、Article/Breadcrumb JSON-LD、sitemap、trailing slash、旧 URL/redirect 行为无明显回归。
4. 可信度：updatedDate 与 sourceReviewedAt 不混用；未 reviewed 页面不声称官方来源已核验；非 A1 路线不假装有个案结论；高风险内容可定位最终决定机关或明确 pending。
5. 无障碍：375px 无横向页面滚动；Guide Card 单焦点；筛选 aria-live；TOC 可见顺序/DOM/focus 一致；工具空提交有错误摘要、invalid 语义和焦点移动；导航当前页与菜单语义明确；表格可访问。
6. 商业/隐私：不得新增未经确认的广告、CMP、支付、追踪、邮件、人工审核或交付承诺；若广告/CMP 决策未获输入，报告必须明确 BLOCKED。若 Step 3A 已确认同意前加载非必要技术而 Step 3A.1 未完成，判定为不可发布的 P0 问题。
7. 中文文章：区分“中文入口可访问”与“中文文章可信度元数据已迁移”；后者未完成时必须单列为未完成项。

创建 docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md，包含：
- 已完成步骤与对应验证；
- 按严重程度排序的剩余问题；
- 人工来源审核队列；
- CMP/广告策略决策状态；
- 375/768/1024/1440px 检查结果；
- 下一轮建议，限于德国 A1 深化、B1/TestDaF 有证据扩充或经批准的单一非德国试点。

同时更新 docs/TASK_LOG.md，记录本维护窗口实际完成的工作包、验证命令与结果、P0 未关闭原因、人工来源审核队列和 CMP/广告决策状态。不要把未执行、未验证或 BLOCKED 的工作写成完成。

最后输出：通过项、失败项、BLOCKED 项、运行命令结果。不要提交、推送或部署。
```

---

## 建议执行顺序与停止条件

| 顺序 | 工作包 | 可以并行吗 | 必须停止的条件 |
|---|---|---:|---|
| 0 | 基线盘点 | 否 | 发现 Astro/legacy 层不清或既有修改冲突 |
| 1 | 来源日期拆分 | 否 | 迁移需要伪造 sourceReviewedAt |
| 2A | 高风险 Starter 审计与暂时降级 | Step 1 后 | 缺来源包时不得升状态；完成审计并保持 pending，等待 2B |
| 2B | 人工来源包后的逐页事实处置 | 2A 后 | 任一页面缺少人工审核来源或事实边界 |
| 3A | CMP/广告审计决策门 | 可与 1、2A 并行 | 策略未确认时完成审计；发现 P0 不一致则进入 3A.1 |
| 3A.1 | 未决策略的安全临时处置 | 3A 发现 P0 不一致后 | 产品拒绝暂停未经批准的非必要技术时阻止发布 |
| 4 | 内容成熟度、责任链、内链 | Steps 1、2A 后；高风险页面升状态需 2B | 试图将未审查路线提升状态 |
| 5 | 首页 | Step 4 后 | 未确认的设计稿与现有产品边界冲突 |
| 6 | Guide Library | Step 4 后，可与 5 并行 | 筛选改动破坏 query 恢复或单卡单焦点 |
| 7 | Guide Article | Steps 1、2、4 后 | 没有官方来源却试图生成事实表 |
| 8 | 工具语义、进度、存储 | 可与 5–7 并行 | 需要保存敏感资料或扩展成个案判断 |
| 9 | 导航/单选/表格 | 建议 Step 5 后 | 与已批准 Header 设计冲突 |
| 10 | 样式收敛 | 5–9 后 | 规则用途不明但需要删除 |
| 11 | 最终回归与交接 | 所有已执行任务后 | P0/构建问题阻止发布；CMP 未明确时仍可交接，但结论必须为 BLOCKED |

## 不应交给 Codex 自行决定的事项

1. **官方政策事实与来源包：** 哪个机构最终决定、当前规则、费用、日期、资格、豁免、接受范围必须由人工提供官方链接与核验结论。Codex 可以做结构化审计，不能补事实。
2. **CMP/广告同意方案：** 目标地区、供应商、同意前后加载规则、法律文案必须先由产品、广告运营和法务确认。
3. **作者、审稿人与资质：** 只能使用真实姓名或真实角色，不能为了 E-E-A-T 视觉效果虚构专家。
4. **上线与发布：** 本提示词不授权提交、推送、部署、变更 DNS、购买服务或对外发布。
