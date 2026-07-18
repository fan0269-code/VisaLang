# VisaLang Germany A1 官方来源刷新执行提示词

> 用途：在独立执行窗口中，对 Germany A1 核心路线第一批高风险页面进行官方来源刷新、有限正文修订、内容台账更新和完整验证。
>
> 本文件是执行总纲，不代表相关页面已经完成来源审核，也不授权 commit、push 或部署。

## 1. 项目与任务目标

项目路径：

```text
/Users/fanlw/Documents/考试网站维护/VisaLang
```

本窗口只处理以下五篇 Germany A1 指南：

1. `goethe-a1-fees-by-country`
2. `goethe-a1-test-centers`
3. `goethe-a1-retake-policy`
4. `german-a1-documents-checklist`
5. `german-family-reunion-language-requirement`

任务目标：

- 明确每条高风险事实由谁决定；
- 使用当前官方来源逐条核验费用、考点、补考、材料和家庭团聚要求；
- 区分签证/家庭团聚决定机关与考试机构；
- 区分全球规则、国家规则、具体考点规则和个案要求；
- 只修订获得官方证据支持的内容；
- 来源不足时保留或强化核验边界；
- 更新内容台账、审计记录、测试和任务日志；
- 不新增页面，不扩大内容范围。

## 2. 当前执行基线

开始时必须核对当前源码，不得机械沿用以下历史数字。上一窗口已知基线为：

- 54 篇英文指南；
- 5 篇中文 Germany A1 指南；
- 内容队列：P0 16、P1 35、P2 8；
- 两篇西班牙指南已完成窄范围来源试点，但仍为 `verification-pending`；
- 构建生成 98 个页面；
- `npm run launch-check` 为 31 项通过、0 失败；
- 上一窗口没有 commit、push 或部署；
- 工作区存在必须保留的既有未提交修改。

本窗口不得重新处理西班牙指南，不得把历史验证结果当作当前验证结果。

## 3. 开始前必读文件

完整阅读：

- `AGENTS.md`
- `docs/MASTER_EXECUTION_PLAN.md`
- `docs/CONTENT_WORKFLOW.md`
- `docs/CONTENT_MAP.md`
- `docs/PHASE_2_A1_CONTENT_AUDIT.md`
- `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md`
- `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`
- `docs/SPAIN_CONTENT_SOURCE_PILOT_2026-07-16.md`
- `docs/TASK_LOG.md`
- `src/content.config.ts`
- `src/data/source-review.ts`
- `src/data/guide-taxonomy.ts`
- `src/layouts/GuideLayout.astro`
- 五篇目标指南及相关测试

必须以当前 `src/` 源码和 frontmatter 为准。旧审计、旧任务日志和历史构建结果只能作为背景。

## 4. 工作区保护

开始先执行：

```bash
cd "/Users/fanlw/Documents/考试网站维护/VisaLang"
git status --short --branch
git rev-parse HEAD
git diff --check
git diff --stat
```

记录：

- 当前分支和 HEAD；
- 相对 `origin/main` 的状态；
- 已修改文件和未跟踪文件；
- 五个目标文件是否已有未提交修改；
- 哪些修改属于本窗口开始前的既有资产。

禁止：

- 覆盖、回退或格式化无关修改；
- 使用破坏性 Git 命令；
- 把既有修改误报成本窗口产出；
- 在无法安全区分修改归属时强行继续。

如果目标文件存在不可安全合并的既有修改，停止对应页面并报告 `BLOCKED_BY_WORKTREE_CONFLICT`。

## 5. 权威来源层级

### 5.1 家庭团聚与签证要求

权威顺序：

1. 申请人实际递交申请的德国使领馆；
2. 德国外交部；
3. 与个案相关的德国外国人管理局；
4. BAMF 的一般说明。

Goethe-Institut、telc 和考试中心不能证明签证资格、豁免或材料接受结果。

### 5.2 考试产品与当地执行规则

以下内容由考试机构或具体官方/授权考点决定：

- 考试形式；
- 费用和币种；
- 报名方式；
- 日期和考点；
- 考试当天证件；
- 退改规则；
- 重考规则；
- 成绩和证书流程；
- 具体中心执行安排。

优先使用：

1. Goethe-Institut 全球官方页面；
2. 对应国家或地区的 Goethe-Institut 页面；
3. 用户实际选择的官方或授权考试中心页面。

不得把某一国家、城市或考点规则泛化为全球规则。

## 6. 不可违反的内容安全规则

不得编造、推断或泛化：

- 全球固定考试费；
- 全球固定出分时间；
- 全球统一重考或退费政策；
- 所有 Goethe 考点都提供同一考试；
- 某证书一定被所有使领馆接受；
- 所有家庭团聚申请人都必须提交 A1；
- 所有申请人都不具备豁免；
- 全球通用签证材料清单；
- 个案签证结果；
- 历史来源日期；
- 未经确认的审核人或责任角色。

不得使用博客、论坛、培训机构、搜索摘要或 AI 总结支撑高风险结论。

来源不足时：

- 保留 `sourceReviewStatus: pending`；
- 不填写 `sourceReviewedAt`；
- 删除或弱化无来源确定性措辞；
- 写明用户应向哪个使领馆、考试机构或考点核验；
- 不为追求“完成”而填充结论。

## 7. 文件范围

允许修改：

- 五篇目标指南；
- `docs/CONTENT_MAP.md`；
- `docs/PHASE_2_A1_CONTENT_AUDIT.md`；
- 新建 `docs/GERMANY_A1_SOURCE_REFRESH_2026-07-16.md`；
- 与目标页面直接相关的窄范围测试；
- `docs/TASK_LOG.md`。

禁止修改：

- Germany B1、TestDaF、telc starter、中文或其他国家正文；
- 两篇西班牙指南；
- 首页、Guide Library、导航或视觉样式；
- Route Finder 或其他工具；
- URL、canonical、sitemap、schema 或重定向架构；
- 商业化、价格、表单、支付或联系流程；
- 分析、广告、CMP 或第三方脚本；
- 部署配置；
- `dist/` 手工产物；
- 与本窗口无关的问题。

不得 commit、push 或部署。

## 8. 阶段一：建立主张—来源矩阵

逐篇提取当前正文的事实主张，并写入：

```text
docs/GERMANY_A1_SOURCE_REFRESH_2026-07-16.md
```

矩阵至少包含：

| 字段 | 说明 |
|---|---|
| page | 所属页面 |
| claim | 当前具体主张 |
| risk | 高 / 中 / 低 |
| claim owner | 决定机关、考试机构或考点 |
| required source | 所需官方证据 |
| located source | 实际官方 URL |
| checked date | 本次真实核验日期 |
| support level | fully supports / partially supports / does not support |
| geographic scope | 全球、国家、城市、考点或个案 |
| allowed wording | 证据允许保留的措辞 |
| prohibited wording | 证据不允许的措辞 |
| action | 保留 / 改写 / 删除 / pending |

要求：

- URL 必须落到具体官方页面；
- 每条主张单独判断，不能只提供页面级来源列表；
- 搜索结果页不能作为最终来源；
- 每条来源写清支持范围和不支持范围。

## 9. 阶段二：五篇页面的来源门

### 9.1 `goethe-a1-fees-by-country`

核验：

- 是否存在全球统一费用；
- 当前国家费用是否有对应官方来源；
- 币种、税费、付款方式和改期条款的适用范围；
- 费用是否应改为动态查询方式。

保留具体金额的条件：

- 有当前官方国家/考点来源；
- 来源显示币种和地区；
- 页面不把金额写成长期保证。

否则删除静态金额，改为官方查询步骤。

### 9.2 `goethe-a1-test-centers`

核验：

- Goethe 官方考点查询入口；
- Goethe 机构与授权考试中心的区别；
- 页面列举的中心是否仍在官方目录；
- 用户如何确认目标考试、日期和当地条件。

不得维护无法持续复核的大规模静态考点名单。

### 9.3 `goethe-a1-retake-policy`

核验：

- Goethe 对重考或重新报名的官方规则；
- A1 是否支持模块化重考；
- 费用、日期和重报是否由具体中心决定；
- 是否存在国家和考点差异。

不得从 B1/B2 或其他考试规则推断 A1。

### 9.4 `german-a1-documents-checklist`

将材料拆成：

1. 考试当天材料；
2. 家庭团聚或签证递交材料。

考试材料由具体考点决定；签证材料由实际使领馆或办理机关决定。不得合并为通用必需清单。

### 9.5 `german-family-reunion-language-requirement`

核验：

- 德国外交部或实际使领馆的当前家庭团聚语言说明；
- 页面是否把一般规则写成个案结论；
- 豁免是否明确由主管机关判断；
- Goethe/telc 是否被限定为考试产品机构；
- 用户是否被引导到实际递交申请的使领馆。

不得判断个人是否满足豁免。

## 10. 阶段三：页面状态判定

每篇只能得到以下一种结果。

### `REVIEWED_WITH_BOUNDARY`

适用条件：

- 保留的关键主张均有当前官方来源；
- 来源适用范围清晰；
- 个案结论已明确排除；
- 可以填写真实 `sourceReviewedAt`；
- 可以填写 `reviewedByRole: "source-review"`。

### `PARTIAL_SOURCE_REVIEW`

适用条件：

- 部分事实得到支持；
- 仍有国家、考点、使领馆或个案缺口；
- 只能更新已支持内容；
- `sourceReviewStatus` 继续保持 `pending`。

### `BLOCKED`

适用条件：

- 找不到最终决定机关或具体执行来源；
- 官方来源冲突；
- 无法确定适用地区；
- 需要业务方指定国家、城市、使领馆或考点。

被阻塞时不强行修改事实，只记录所缺输入。

## 11. 阶段四：有限正文修订

只有通过对应来源门才修改正文。

修订要求：

- 每篇保持一个主要用户意图；
- 决定机关与考试机构分开说明；
- 费用、日期、考点和重考优先使用动态核验动作；
- 高风险结论就近提供官方来源；
- 明确全球、国家、城市、考点或个案范围；
- 不使用未经支持的绝对措辞；
- 保留明确下一步；
- 不增加重复 FAQ 或无来源填充内容。

只有正文实际变化时才更新 `updatedDate`。

只有整篇受控来源复核完成时才添加：

```yaml
sourceReviewedAt: "2026-07-16"
sourceReviewStatus: "reviewed"
reviewedByRole: "source-review"
```

日期必须使用实际执行日期。如果执行日期不是 2026-07-16，应写真实日期，不能照抄示例。

## 12. 内容台账更新

只更新 `docs/CONTENT_MAP.md` 中五篇目标记录的：

- `updated`；
- `source reviewed`；
- `evidence`；
- `unresolved`；
- `next action`；
- `priority`。

重新从当前数据计算 reviewed、partial、blocked、pending 数量，不得手工猜测。

不得无理由改动其他页面记录。

## 13. 测试要求

聚焦回归至少覆盖：

- 五篇目标页面仍存在；
- 没有新增或重复 slug；
- `updatedDate` 与 `sourceReviewedAt` 分离；
- pending 页面没有伪造复核日期；
- reviewed 页面具有真实审核日期和角色；
- 费用页面没有无来源固定价格；
- 考点页面引导官方查询；
- 重考页面没有跨等级或跨中心泛化；
- 材料页面区分考试材料和签证材料；
- 家庭团聚页面保留最终决定机关边界。

不得通过降低现有安全断言让测试通过。

## 14. 完整验证

按顺序执行，禁止并行运行 build 和 launch-check：

```bash
git diff --check
npm test
npm run build
npm run launch-check
```

检查生成结果：

- 五篇页面全部生成；
- H1、canonical、Article/Breadcrumb JSON-LD 正常；
- 内链可解析；
- 路由数量变化符合预期；
- 成熟度没有意外变化；
- source-review UI 与 frontmatter 一致；
- 未修改西班牙、广告、CMP 或部署状态。

失败时只修复由本窗口造成的问题。范围外失败应记录为阻塞，不得扩大修改范围。

## 15. 最终审查

完成后从两个轴审查本窗口差异。

### Standards

检查：

- 是否遵守 `AGENTS.md`；
- 是否遵守 authority-first；
- 是否保护既有工作区；
- 是否保持窄范围；
- 是否存在重复、过度抽象或不可追溯来源；
- 是否完成测试和任务日志。

### Spec

检查：

- 五篇是否全部有明确结果；
- 是否修改禁止范围；
- 是否新增来源不支持的事实；
- 是否错误填写审核日期；
- 是否把国家或考点规则泛化；
- 是否正确更新台账、审计和测试。

发现问题后先修复，再重新运行全部验证。

## 16. 任务日志

在 `docs/TASK_LOG.md` 记录：

- 本窗口范围；
- 五篇页面各自状态；
- 修改文件；
- 使用的官方来源类型；
- 删除或弱化的高风险结论；
- 验证命令和实际结果；
- 生成路由数量；
- 遗留阻塞；
- 下一窗口建议；
- 明确未 commit、未 push、未部署。

## 17. 最终输出格式

### 17.1 最终结论

只能使用：

- `GERMANY_A1_SOURCE_REFRESH_COMPLETE`
- `GERMANY_A1_SOURCE_REFRESH_PARTIAL`
- `BLOCKED_BY_AUTHORITY_SOURCE`
- `BLOCKED_BY_WORKTREE_CONFLICT`
- `BLOCKED_BY_VERIFICATION_FAILURE`

### 17.2 页面结果

| page | result | reviewed sources | retained boundary | next action |
|---|---|---|---|---|

### 17.3 修改文件

逐项说明文件和修改目的。

### 17.4 证据统计

报告 reviewed、partial、blocked、pending 数量。

### 17.5 验证结果

逐项报告：

- `git diff --check`；
- `npm test`；
- `npm run build`；
- `npm run launch-check`；
- 生成路由数量。

### 17.6 遗留问题

写明缺失的国家、城市、考点、使领馆、决定机关页面或人工输入。

### 17.7 下一窗口

只推荐一个最小窗口：

- 五篇完成：继续预约时间线、预订检查和 FAQ 来源刷新；
- 部分完成：只继续有明确来源缺口的页面；
- 普遍受阻：停止正文更新，先收集指定国家、考点或使领馆输入。

## 18. 停止规则

出现以下任一情况，停止对应页面：

- 找不到当前官方来源；
- 无法确认官方来源的适用地区；
- 需要指定申请人国家、城市、使领馆或考点；
- 官方来源互相冲突；
- 只能依赖非官方来源；
- 目标文件存在无法安全合并的既有修改；
- 修改需要超出允许范围。

正确保留 pending 并明确记录缺口，比写入未经支持的结论更重要。

## 19. 执行指令

在独立窗口中执行本文件时，使用以下指令：

```text
请完整阅读并严格执行：
/Users/fanlw/Documents/考试网站维护/VisaLang/docs/GERMANY_A1_SOURCE_REFRESH_PROMPT.md

先保护现有工作区，再完成来源审计、有限正文修订、测试、完整验证和任务日志。
不得 commit、push 或部署。
```
