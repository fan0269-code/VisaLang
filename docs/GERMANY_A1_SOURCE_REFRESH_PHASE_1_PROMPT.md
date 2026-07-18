# VisaLang Germany A1 来源刷新：阶段一详细执行提示词

> 下一窗口用途：只建立五篇 Germany A1 指南的“主张—来源—风险—处理建议”审计矩阵，为后续正文修订提供证据基础。
>
> 本阶段是只读内容审计与文档交付窗口。不得修改五篇指南正文、frontmatter、测试、内容状态、来源审核日期或部署状态。

## 1. 执行目标

项目路径：

```text
/Users/fanlw/Documents/考试网站维护/VisaLang
```

阶段一只审计以下五篇指南：

1. `src/content/guides/goethe-a1-fees-by-country.md`
2. `src/content/guides/goethe-a1-test-centers.md`
3. `src/content/guides/goethe-a1-retake-policy.md`
4. `src/content/guides/german-a1-documents-checklist.md`
5. `src/content/guides/german-family-reunion-language-requirement.md`

本阶段只完成：

- 提取五篇页面中的事实性主张；
- 判断每条主张的风险等级；
- 识别每条主张的最终决定机关或执行机构；
- 确定每条主张需要什么类型的官方来源；
- 查找并记录当前官方 URL；
- 记录实际核验日期；
- 判断官方来源对主张的支持程度；
- 标明适用地区和适用边界；
- 给出下一阶段允许保留、需要改写、应删除或继续 pending 的建议；
- 形成一份可独立审查的阶段一报告。

本阶段不以“修改文章”为完成标准，而以“每条高风险主张可追溯、可判定、可交接”为完成标准。

## 2. 唯一主要交付物

新建或完整更新：

```text
docs/GERMANY_A1_SOURCE_REFRESH_2026-07-16.md
```

如果实际执行日期不是 2026-07-16，应将文件名和文档中的核验日期改为真实执行日期，不得照抄历史日期。

阶段结束时只允许以下文档发生变化：

- `docs/GERMANY_A1_SOURCE_REFRESH_2026-07-16.md`
- `docs/TASK_LOG.md`

如果需要记录无法继续的工作区冲突，也只写入上述审计文档或最终报告，不修改目标指南。

## 3. 必须先阅读

完整阅读：

- `AGENTS.md`
- `docs/GERMANY_A1_SOURCE_REFRESH_PROMPT.md`
- `docs/MASTER_EXECUTION_PLAN.md`
- `docs/CONTENT_WORKFLOW.md`
- `docs/CONTENT_MAP.md`
- `docs/PHASE_2_A1_CONTENT_AUDIT.md`
- `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md`
- `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`
- `docs/SPAIN_CONTENT_SOURCE_PILOT_2026-07-16.md`
- `src/content.config.ts`
- `src/data/source-review.ts`
- `src/data/guide-taxonomy.ts`
- 五篇目标指南全文

阅读目的：

- 确认当前内容状态和审核模型；
- 区分 `updatedDate` 与 `sourceReviewedAt`；
- 理解 `complete-route` 不代表事实已经审核；
- 识别当前页面已有的免责声明、官方来源和核验动作；
- 避免重复旧审计或把历史结论当作当前证据。

## 4. 工作区保护与起始记录

执行：

```bash
cd "/Users/fanlw/Documents/考试网站维护/VisaLang"
git status --short --branch
git rev-parse HEAD
git diff --check
git diff --stat
```

在审计报告中记录：

- 开始时间和时区；
- 当前分支；
- 当前 HEAD；
- 相对 `origin/main` 的状态；
- 已有修改文件；
- 已有未跟踪文件；
- 五篇目标指南是否存在既有修改；
- 本阶段允许修改的两个文档是否已存在。

保护规则：

- 所有既有修改属于用户资产；
- 不覆盖、回退、暂存或格式化无关文件；
- 不使用破坏性 Git 命令；
- 不把既有差异计入阶段一产出；
- 不修改 `dist/`；
- 不 commit、push 或部署。

如果五篇目标指南存在无法安全区分的既有修改：

- 仍可基于当前工作区内容做只读审计；
- 必须在报告中说明审计基于 working tree，而不是 HEAD；
- 不得对该页面给出“可以直接改写”的结论；
- 标记 `WORKTREE_REVIEW_REQUIRED`。

## 5. 阶段边界

### 5.1 允许执行

- 阅读源码和文档；
- 搜索官方网页；
- 打开、核验和比较官方来源；
- 检查官方 URL 的实际访问状态；
- 提取当前正文主张；
- 建立审计矩阵；
- 记录来源冲突和信息缺口；
- 更新 `docs/TASK_LOG.md` 的阶段一记录；
- 运行 `git diff --check` 验证文档格式。

### 5.2 明确禁止

- 修改五篇目标指南正文；
- 修改五篇目标指南 frontmatter；
- 修改 `updatedDate`；
- 添加或修改 `sourceReviewedAt`；
- 修改 `sourceReviewStatus` 或 `reviewedByRole`；
- 修改 content maturity；
- 添加或删除指南；
- 修改其他国家、Germany B1、TestDaF、telc 或中文内容；
- 修改测试；
- 修改组件、UI、工具、SEO、schema 或路由；
- 修改隐私、分析、广告、CMP 或商业化内容；
- 修改部署配置；
- commit、push 或部署。

发现范围外问题，只记录到“范围外发现”，不得直接修复。

## 6. 权威来源层级

### 6.1 家庭团聚要求、A1 证明和签证材料

权威顺序：

1. 申请人实际递交申请的德国使领馆；
2. 德国外交部；
3. 与具体案件有关的德国外国人管理局；
4. BAMF 的一般说明。

边界：

- Goethe-Institut 和 telc 只能说明考试产品；
- 考试机构不能决定签证资格、豁免或材料接受；
- BAMF 一般说明不能覆盖具体使领馆文件要求；
- VisaLang 不能判断个案是否满足豁免。

### 6.2 考试费用、考点、重考和考试当天材料

权威顺序：

1. Goethe-Institut 全球考试规则；
2. 对应国家或地区 Goethe-Institut 页面；
3. 用户选择的官方或授权考试中心页面；
4. 考生报名确认或中心当前条款。

边界：

- 全球页面只能支持全球产品规则；
- 国家页面只能支持对应国家；
- 考点页面只能支持对应考点；
- 具体价格、日期、证件和退改规则不能跨地区泛化。

## 7. 来源质量规则

可以作为事实依据：

- 德国外交部和德国驻外使领馆；
- BAMF；
- 德国政府或主管机关页面；
- Goethe-Institut 官方全球、国家和城市页面；
- 官方或明确授权考试中心页面；
- 官方 PDF、考试条款、报名规则和候选人手册。

只能用于发现线索，不能支撑最终结论：

- 搜索摘要；
- 博客；
- 培训机构；
- 留学或移民中介；
- 论坛和社交媒体；
- AI 回答；
- 没有明确官方归属的聚合页面。

来源检查要求：

- 记录最终落地 URL，不记录搜索结果页；
- 确认页面可访问；
- 记录页面标题或机构名称；
- 记录核验日期；
- 说明来源支持什么；
- 说明来源不能支持什么；
- 如果页面依赖国家、城市或考点，明确记录范围；
- 如果来源已失效、重定向异常或内容冲突，标记 `SOURCE_BLOCKED`。

## 8. 主张提取方法

逐篇从以下位置提取事实性主张：

- 标题和 description；
- frontmatter 中的 audience、authority、intent 和 prompt；
- 正文标题；
- 段落；
- 表格；
- 清单；
- FAQ；
- CTA 前后的事实说明；
- 官方来源说明；
- “通常”“一般”“可以”“必须”“接受”“固定”等带结论性的措辞。

需要进入矩阵的主张包括：

- 数字、价格、币种和时间；
- 考试中心和地域覆盖；
- 报名、补考、退改和出分规则；
- 必需材料和证件；
- 签证、家庭团聚和语言要求；
- 豁免、替代证明和接受范围；
- “谁决定”以及“向谁核验”；
- 任何可能影响用户付费、报名或提交申请的结论。

纯编辑性内容可以不逐句进入矩阵，例如：

- 页面导航提示；
- 不包含事实判断的学习建议；
- 一般性的“请核验官方来源”提醒。

但如果编辑性建议隐含费用、适用性或成功率结论，仍须进入矩阵。

## 9. 风险等级

### 高风险

- 家庭团聚或签证要求；
- A1 是否必需；
- 豁免或替代证明；
- 证书接受范围；
- 必需签证材料；
- 个案资格或结果；
- 固定考试费用；
- 可能导致用户错误报名或错误提交申请的结论。

### 中风险

- 考点状态；
- 报名时间；
- 重考和退改规则；
- 考试当天证件；
- 出分和证书流程；
- 国家或中心执行差异。

### 低风险

- 官方入口链接；
- 不含结果承诺的通用准备建议；
- 页面结构和下一步导航；
- 明确标为示例且不影响报名或申请的内容。

风险等级必须根据用户可能受到的影响判断，不能因为页面成熟度高就降低风险。

## 10. 主张—来源矩阵格式

每篇页面使用独立小节和独立矩阵。

必填字段：

| 字段 | 填写要求 |
|---|---|
| claim id | 例如 `FEE-01`、`CENTER-02` |
| current claim | 当前页面主张的准确摘要 |
| source location | 当前主张所在段落或标题 |
| risk | high / medium / low |
| claim owner | 最终决定该事实的机关或机构 |
| required source | 需要什么官方来源才能支持 |
| located source | 实际官方 URL；没有则写 `not located` |
| source title | 官方页面或文件名称 |
| checked date | 真实核验日期 |
| support level | fully supports / partially supports / does not support / source blocked |
| geographic scope | global / country / city / centre / mission / individual case |
| supported fact | 来源实际支持的内容 |
| unsupported boundary | 来源不能支持的内容 |
| allowed wording | 下一阶段允许保留的表述 |
| prohibited wording | 下一阶段不得使用的表述 |
| proposed action | keep / rewrite / remove / pending |
| blocker | 无则写 `none`，否则写具体缺口 |

不得使用以下模糊值：

- `Recorded`；
- `Official source exists`；
- `Probably supported`；
- `Should be fine`；
- `Generally accepted`；
- `Common practice`。

## 11. 五篇页面的专项审计要求

### 11.1 `goethe-a1-fees-by-country`

至少检查：

- 页面是否包含具体金额；
- 金额对应哪个国家、城市或考点；
- 币种是否准确；
- 来源是否仍可访问；
- 来源是否明确为 A1 考试；
- 是否包含报名费、考试费或其他费用混淆；
- 是否把历史价格写成当前价格；
- 是否存在“全球大致价格”一类无法安全维持的结论；
- 是否应在下一阶段改为动态官方查询路径。

输出：

- 每个具体金额单独一条 claim；
- 没有当前官方来源的金额必须标记 `remove` 或 `pending`；
- 不得用一个国家的价格支持另一个国家。

### 11.2 `goethe-a1-test-centers`

至少检查：

- 当前列出的每个国家、城市或中心；
- 是否出现在 Goethe 官方目录；
- 是 Goethe-Institut 自营还是授权中心；
- 是否明确提供目标 A1 考试；
- 是否能证明当前日期或场次；
- 页面是否暗示所有官方中心都提供相同考试；
- 静态名单是否具有持续维护价值。

输出：

- 每个静态中心或地域结论单独记录；
- 无法持续核验的名单建议改为官方查询方法；
- 不在本阶段删除名单，只给下一阶段建议。

### 11.3 `goethe-a1-retake-policy`

至少检查：

- 页面是否声称可以随时重考；
- 是否声称可以只重考一个模块；
- 是否存在等待期；
- 是否存在固定重考费用；
- 是否把其他级别的模块规则用于 A1；
- 是否把某个国家或中心的重新报名规则写成全球规则；
- 退费、改期、缺考和重新报名是否被混淆。

输出：

- A1 产品规则与当地报名条款分开；
- 每一项重考、退费或改期结论独立记录；
- 无法证明的模块化重考结论标记 `remove`。

### 11.4 `german-a1-documents-checklist`

必须将所有材料主张分为：

1. 考试报名材料；
2. 考试当天材料；
3. 成绩或证书领取材料；
4. 家庭团聚或签证申请材料。

逐项检查：

- 谁要求该材料；
- 适用于哪个国家、考点或使领馆；
- 是否是原件、复印件、翻译件或报名确认；
- 是否有当前官方页面；
- 页面是否把考试材料误写成签证材料；
- 页面是否把某个使领馆清单写成全球清单。

输出：

- 每个材料条目单独一条 claim；
- 考试中心与使领馆来源不得混用；
- 个案材料必须保留主管机关核验动作。

### 11.5 `german-family-reunion-language-requirement`

至少检查：

- 页面如何描述 A1 一般要求；
- 是否暗示所有家庭团聚申请人适用同一规则；
- 是否列出豁免；
- 每项豁免由哪个机关决定；
- 是否将考试证书与签证接受混为一谈；
- 是否明确要求用户查看实际使领馆；
- 是否存在确定性资格判断；
- 是否把 BAMF 或考试机构当成最终决定机关。

输出：

- 一般规则、申请人类别、豁免、证书和本地递交要求分别记录；
- 不得将一般说明升级为个案结论；
- 无法由当前官方页面支持的豁免细节标记 `pending`。

## 12. 支持程度判定

### `fully supports`

官方来源直接、明确支持该主张，且适用地区和对象一致。

### `partially supports`

官方来源只支持主张的一部分，或只支持特定国家、城市、考点、使领馆或申请人类型。

### `does not support`

来源没有该结论、结论超出来源范围，或当前主张与来源冲突。

### `source blocked`

官方页面无法访问、需要登录、内容无法读取、链接失效、语言版本冲突或无法确认当前有效性。

不得把“找到相关页面”直接等同于 `fully supports`。

## 13. 页面级结论

每篇矩阵之后给出页面级结论：

```markdown
### Page disposition

- Current content status:
- Current source-review status:
- High-risk claims:
- Fully supported claims:
- Partially supported claims:
- Unsupported claims:
- Blocked claims:
- Recommended next-stage result:
- Required human/business input:
```

推荐结果只能是：

- `READY_FOR_LIMITED_REWRITE`
- `PARTIAL_REWRITE_ONLY`
- `SOURCE_PACKAGE_BLOCKED`
- `WORKTREE_REVIEW_REQUIRED`

阶段一不得将推荐结果写成“审核完成”，不得修改 frontmatter 状态。

## 14. 审计报告结构

`docs/GERMANY_A1_SOURCE_REFRESH_2026-07-16.md` 必须包含：

1. 标题、实际日期和时区；
2. 执行范围；
3. 起始 Git/工作区状态；
4. 权威来源层级；
5. 来源核验方法；
6. 五篇页面各自的完整主张矩阵；
7. 五篇页面各自的 disposition；
8. 跨页面重复或冲突；
9. 来源缺口清单；
10. 下一阶段允许修改的具体段落；
11. 下一阶段禁止写入的具体结论；
12. 总体阶段结论；
13. 修改文件和验证结果。

## 15. 跨页面一致性检查

完成五篇矩阵后，检查：

- 费用页面与考点页面是否引用不同价格或中心状态；
- 考点页面与材料清单是否对考试当天证件说法冲突；
- 重考页面是否与费用页面的重新报名费用冲突；
- 家庭团聚要求页与材料清单是否对签证材料说法冲突；
- 同一 Goethe 来源是否被不同页面解释成不同适用范围；
- 是否有一个页面把考试机构写成签证决定机关；
- 是否有一个页面把国家/考点规则写成全球规则。

把发现写入“跨页面重复或冲突”，但本阶段不修改正文。

## 16. 来源缺口清单

按以下格式汇总：

| blocker id | page | missing input | required authority | required geography | impact | next action |
|---|---|---|---|---|---|---|

缺口必须具体，例如：

- 需要 Goethe 中国北京考点当前 A1 费用页；
- 需要申请人实际递交申请的德国驻外使领馆；
- 需要具体中心的缺考和重新报名条款；
- 需要确认页面列出的城市是否仍提供 Start Deutsch 1。

不得只写“需要更多来源”。

## 17. 阶段一完成标准

只有同时满足以下条件才算完成：

- 五篇页面全部完成主张提取；
- 每条高风险主张都有 claim owner；
- 每条高风险主张都有 required source；
- 找到来源的主张记录实际 URL 和日期；
- 未找到来源的主张明确写 `not located`；
- 每条主张都有 support level；
- 每条主张都有 geographic scope；
- 每条主张都有 allowed/prohibited wording；
- 每条主张都有 proposed action；
- 五篇页面都有 disposition；
- 完成跨页面一致性检查；
- 完成具体来源缺口清单；
- 没有修改五篇正文或 frontmatter；
- 没有修改范围外文件；
- `git diff --check` 通过；
- `docs/TASK_LOG.md` 记录真实结果。

## 18. 验证步骤

本阶段是文档审计窗口，不运行完整构建门禁，除非发现审计文档之外存在本窗口造成的源码变更。

必须执行：

```bash
git diff --check
git status --short --branch
git diff --stat
git diff -- \
  docs/GERMANY_A1_SOURCE_REFRESH_2026-07-16.md \
  docs/TASK_LOG.md
```

同时确认：

```bash
git diff -- \
  src/content/guides/goethe-a1-fees-by-country.md \
  src/content/guides/goethe-a1-test-centers.md \
  src/content/guides/goethe-a1-retake-policy.md \
  src/content/guides/german-a1-documents-checklist.md \
  src/content/guides/german-family-reunion-language-requirement.md
```

上述五篇指南相对于阶段开始状态不得出现本阶段新增修改。

如果因为既有修改导致 diff 非空，必须说明这些差异在阶段开始前已经存在，并确认本阶段没有编辑它们。

## 19. 任务日志

在 `docs/TASK_LOG.md` 增加窄范围记录：

- 窗口名称：Germany A1 source refresh phase 1；
- 执行日期；
- 只读审计范围；
- 五篇页面结果；
- 找到的官方来源类型；
- fully/partially/unsupported/blocked 主张数量；
- 工作区保护结果；
- `git diff --check` 结果；
- 未运行 build/test 的原因：阶段一未修改源码；
- 下一阶段准入条件；
- 明确未修改正文、未 commit、未 push、未部署。

不得把 `READY_FOR_LIMITED_REWRITE` 写成正文已经修订完成。

## 20. 最终输出格式

### 20.1 最终结论

只能使用：

- `PHASE_1_CLAIM_SOURCE_MATRIX_COMPLETE`
- `PHASE_1_PARTIAL_SOURCE_GAPS_RECORDED`
- `PHASE_1_BLOCKED_BY_SOURCE_ACCESS`
- `PHASE_1_BLOCKED_BY_WORKTREE_CONFLICT`

### 20.2 页面汇总

| page | claims | high risk | fully supported | partial | unsupported | blocked | disposition |
|---|---:|---:|---:|---:|---:|---:|---|

### 20.3 主要来源

按机关或机构列出：

- 德国外交部/使领馆；
- BAMF；
- Goethe-Institut 全球页面；
- Goethe-Institut 国家页面；
- 具体官方或授权考点。

### 20.4 来源缺口

逐项写明需要的国家、城市、考点、使领馆或具体规则页面。

### 20.5 修改文件

预期只有：

- `docs/GERMANY_A1_SOURCE_REFRESH_2026-07-16.md`
- `docs/TASK_LOG.md`

出现其他修改必须解释原因；无授权不得保留范围外修改。

### 20.6 验证

报告：

- `git diff --check`；
- 最终 `git status --short --branch`；
- 五篇正文未被本阶段修改的证据；
- 未运行测试和构建的范围理由。

### 20.7 下一阶段准入

明确列出：

- 哪些页面可以进入有限正文修订；
- 哪些页面只能部分修订；
- 哪些页面必须等待指定来源；
- 下一阶段允许修改的具体段落；
- 下一阶段仍然禁止写入的结论。

## 21. 停止规则

出现以下情况，停止对应主张的来源判定：

- 找不到当前官方来源；
- 来源需要登录或无法访问；
- 无法确认官方页面更新时间或适用范围；
- 官方来源之间冲突；
- 需要指定申请人国家、城市、使领馆或考点；
- 只能找到博客、论坛、培训机构或搜索摘要；
- 当前工作区无法安全判断审计基线；
- 工作需要进入正文修订。

停止时：

- 将主张标记为 `pending` 或 `source blocked`；
- 写明具体所缺输入；
- 不猜测；
- 不修改正文；
- 继续完成其他不受阻的主张。

## 22. 下一窗口执行指令

在下一窗口中直接使用：

```text
请完整阅读并严格执行：
/Users/fanlw/Documents/考试网站维护/VisaLang/docs/GERMANY_A1_SOURCE_REFRESH_PHASE_1_PROMPT.md

本窗口只完成五篇 Germany A1 指南的主张提取、官方来源核验和审计矩阵。
不得修改目标指南正文、frontmatter、测试、内容状态或审核日期。
只允许创建/更新阶段一审计报告和 TASK_LOG。
不得 commit、push 或部署。
```
