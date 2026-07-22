# VisaLang P0 五国 Codex 执行计划

**日期：** 2026-07-21
**状态：** 设计中
**产物：** `docs/superpowers/plans/2026-07-21-p0-five-countries-codex-plan.md`

## 1. 目标

为 UK、Canada、Italy、Portugal、Finland 五个国家各 2 篇指南（共 10 篇）生成一份可直接交给 Codex 的单一 Markdown 主提示词。提示词必须把工作范围、事实门禁、编辑规则、执行顺序、验证命令和最终汇报格式写清楚，避免开放式指令导致越界重构、政策事实虚构或未经验证的完成声明。

## 2. 现状判断

### 2.1 已完成窗口

| 窗口 | 国家 | 操作 | 状态 |
|---|---|---|---|
| 2026-07-18 | Germany A1 | 来源复核 + 中文新增 3 页 + 路线去环 | 已部署 |
| 2026-07-19 | Germany B1 | 8 篇核心来源复核 + Hub SEO + 路线去环 | 已部署 |
| 2026-07-19 | France (2) | 逐页官方来源复核 + 范围收窄 + 路线去环 | 已部署 |
| 2026-07-19 | Netherlands NT2 (1) | 逐页官方来源复核 + UvA 有界示例 | 已部署 |
| 2026-07-19 | Spain (2) | 命名人工验收门禁开放，页面仍 verification-pending | 已部署但门禁未关闭 |

### 2.2 P0 五国当前状态

| 国家 | 页面数 | sourceReviewStatus | sourceReviewedAt | contentStatus | nextGuideSlug 循环 | Hub 页 |
|---|---|---|---|---|---|---|
| UK | 2 | reviewed | 2026-07-14 | verification-pending | A↔B 双向 | 无 |
| Canada | 2 | reviewed | 2026-07-14 | verification-pending | A↔B 双向 | 无 |
| Italy | 2 | reviewed | 2026-07-14 | verification-pending | A↔B 双向 | 无 |
| Portugal | 2 | reviewed | 2026-07-14 | verification-pending | A↔B 双向 | 无 |
| Finland | 2 | reviewed | 2026-07-14 | verification-pending | A↔B 双向 | 无 |

关键发现：
- 10 篇全部 `sourceReviewStatus: reviewed`，但日期停留在 2026-07-14 的历史审计基线；
- 每对国家内部存在直接双向 `nextGuideSlug` 循环；
- 没有 Hub 页，每国仅 2 篇短正文指南（4-6 段）；
- `updatedDate` 全部为 2026-07-01，与 `sourceReviewedAt: 2026-07-14` 不一致——说明 7-14 的改动只改了元数据字段，未改正文；
- 与 France/NL/Spain 2026-07-19 窗口相比，这 10 篇缺少逐页重新打开官方来源的当前核验。

### 2.3 本轮应做的事

参照 France/NL/Spain 的模式：
1. 逐页重新打开官方来源，建立当前 claim matrix；
2. 修复双向 nextGuideSlug 循环，建立单入口→单终点的业务路线；
3. 清理正文中的通用模板语言，让每页只解决一个核心任务；
4. 保持 `contentStatus: verification-pending`——来源已审查不等于读者个案已确认；
5. 通过聚焦测试、完整测试和 launch check。

## 3. 最终提示词结构

最终 Markdown 使用单一主提示词，依次包含：

1. 角色与总目标；
2. 项目根目录和事实优先级；
3. 开始前检查；
4. 官方来源与事实门禁；
5. P0：10 篇指南逐页来源复核与路线去环；
6. 品牌文案与编辑规则；
7. frontmatter、来源状态和双语约束；
8. 禁止项；
9. 测试先行的执行步骤；
10. 分层验证命令；
11. PASS、PARTIAL、BLOCKED 最终汇报格式。

## 4. 本轮工作范围

### IN SCOPE：10 篇指南

**UK（2 篇）：**
- `ielts-ukvi-uk-visa.md`
- `languagecert-selt-uk-visa.md`

**Canada（2 篇）：**
- `tcf-canada-vs-tef.md`
- `tef-canada-immigration.md`

**Italy（2 篇）：**
- `cils-b1-cittadinanza-for-italian-citizenship.md`
- `cils-vs-celi-vs-plida-for-italian-citizenship.md`

**Portugal（2 篇）：**
- `portuguese-ciple-a2-for-citizenship-and-residence.md`
- `portuguese-language-for-golden-visa-and-citizenship.md`

**Finland（2 篇）：**
- `yki-finnish-citizenship.md`
- `yki-vs-other-finland-options.md`

### IN SCOPE：页面、测试和记录

- `tests/content-integrity.test.js` — 增加五国路线无环断言
- `tests/germany-a1-cluster.test.js` 或新建 `tests/p0-five-countries.test.js` — 增加来源状态断言
- `docs/TASK_LOG.md` — 仅在完成并验证后追加真实结果
- `docs/CONTENT_MAP.md` — 同步更新五国账本状态

### OUT OF SCOPE

- Germany A1、Germany B1、TestDaF、telc starter 集群；
- France、Netherlands Inburgering、Spain 页面（已在 2026-07-19 窗口处理）；
- 新增任何公开页面或 Hub 页；
- 将任何页面提升为 `complete-route`；
- 全站视觉设计、CSS 重构、导航重构；
- Route Finder、Checklist、Timeline 工具业务；
- 广告、CMP、表单、邮件、支付、商业流程；
- 依赖、`package-lock.json`、Astro 配置；
- 部署、服务器、DNS、TLS；
- commit、push、PR。

## 5. 推荐业务路线

每个国家 2 篇形成 requirement → choice 单向链，choice 为终点：

| 国家 | requirement slug | choice slug | 方向 |
|---|---|---|---|
| UK | `ielts-ukvi-uk-visa` | `languagecert-selt-uk-visa` | requirement → choice，choice 无 next |
| Canada | `tef-canada-immigration` | `tcf-canada-vs-tef` | requirement → choice，choice 无 next |
| Italy | `cils-b1-cittadinanza-for-italian-citizenship` | `cils-vs-celi-vs-plida-for-italian-citizenship` | requirement → choice，choice 无 next |
| Portugal | `portuguese-language-for-golden-visa-and-citizenship` | `portuguese-ciple-a2-for-citizenship-and-residence` | requirement → choice，choice 无 next |
| Finland | `yki-finnish-citizenship` | `yki-vs-other-finland-options` | requirement → choice，choice 无 next |

规则：
- `nextGuideSlug` 是唯一主下一步；choice 页省略该字段；
- `supportingGuideSlugs` 指向同国家另一篇，不与 next 重复；
- 不得跨国家混用 supporting guide；
- 当前 Finland 两篇的 supportingGuideSlugs 包含了 Italy/Spain/Netherlands 页面，必须收窄到本国。

## 6. 官方来源五层门禁

### 6.1 权威顺序

1. 当前该国移民/国籍/签证主管机关官方页面或法条；
2. 具体使领馆、地方当局或申请门户的当前说明；
3. 国家政府官方概览；
4. 官方考试主办方产品页；
5. 具体官方或授权考点的当前页面。

搜索引擎摘要、AI 回答、历史审计、论坛和其他申请人经验只可用于发现入口，不能作为证据。

### 6.2 候选官方入口

**UK：**
- `https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt`
- `https://www.gov.uk/check-english-language`
- `https://ielts.org/take-a-test/test-types/ielts-tests-for-uk-visas-and-immigration`
- `https://www.languagecert.org/en/language-exams/english/languagecert-esol-selt`

**Canada：**
- `https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html`
- `https://www.canada.ca/en/immigration-refugees-citizenship/services/application/express-entry/eligibility.html`
- `https://www.lefrancaisdesaffaires.fr/en/`
- `https://www.france-education-international.fr/en/test/tcf-canada`

**Italy：**
- `https://libertaciviliimmigrazione.dlci.interno.gov.it/temi/temi/cittadinanza`
- `https://www.esteri.it/it/servizi-opportunita/italiani-all-estero/cittadinanza/`
- `https://cils.unistrasi.it/`
- `https://www.cvcl.it/`
- `https://plida.dante.global/`

**Portugal：**
- `https://justica.gov.pt/Registos/Nacionalidade/Nacionalidade-portuguesa`
- `https://caple.letras.ulisboa.pt/exame/2/ciple`
- `https://www.imi.gov.pt/`

**Finland：**
- `https://migri.fi/en/language-skills`
- `https://migri.fi/en/application_for_finnish_citizenship`
- `https://www.oph.fi/en/national-certificates-language-proficiency-yki`

### 6.3 每个高风险主张的 claim matrix

每条主张单独记录，至少包含：

```text
page_slug
claim_id
section_heading
claim_text
claim_category
jurisdiction
target_authority
decision_owner
source_owner
source_title
source_url（最终 URL）
source_type
source_language
accessed_at（实际日期）
access_result
exact_quote
quote_translation
locator
support_level（direct / partial / contextual / unsupported）
source_scope
claim_scope
scope_match
qualifiers
exceptions_present
cross_references
cross_references_checked
time_sensitive
prohibited_inference
permitted_wording
reader_verification_action
manual_verification_required
stop_reason
final disposition（保留 / 限定 / 删除 / 改为核验动作）
```

## 7. 不得推出的结论

严禁从中央或概览页面推出：
- 申请人已经符合资格；
- 所有签证/入籍/居留路线都要求同一考试；
- 某考试被普遍接受；
- 模块成绩、完整证书和不同考试产品法律效果相同；
- 某人符合豁免；
- 考试主办方能决定签证或入籍结果；
- 中央页面能证明地方费用、日期、名额、出分；
- 英文翻译必然与原文同步；
- 搜索摘要或历史页面仍是当前有效规则。

## 8. 来源停止条件

出现以下任一情况，受影响主张必须标记为 `manual verification required`：
- 页面 403、404、500、空白、验证码或重定向到通用首页；
- 关键正文只能通过未成功加载的 JavaScript 查看；
- 无法定位原主张、限定词、例外或交叉引用；
- 来源只支持考试产品本身，不支持签证/入籍接受性；
- 中央页面与地方考点/机构页面冲突。

对仍留在最终公开内容中的受影响主张，必须：
1. 让对应页面保持 `sourceReviewStatus: pending`；
2. 不写 `sourceReviewedAt`；
3. 删除、限定或改为明确的主管机关核验动作；
4. 在 claim matrix 中记录停止原因和最终处置。

## 9. frontmatter 与状态规则

- `contentStatus` 全部保持 `verification-pending`；
- 只有真实完成来源核验的页面才可使用 `reviewed`；
- `sourceReviewedAt` 使用实际完成该页面复核的日期；
- `reviewedByRole` 固定为 `source-review`；
- `updatedDate` 只在有实质用户可见内容变化时更新；
- `publishedDate` 保持首次发布日期；
- 来源已核验不等于读者个案已确认。

## 10. 公开内容清理规则

- 每页只解决一个主要用户决策；
- 删除或改写面向编辑者的内部语言；
- 避免重复免责声明、同质化 FAQ 和全站相同 CTA；
- 标题、导语、摘要、正文和 CTA 的确定程度必须与来源支持范围一致；
- 页面只能提供核验流程时，使用"如何核验"类标题；
- 避免过度承诺表达。

## 11. SEO 和信息架构

- 每页 self-canonical；
- 所有内部链接使用 trailing slash；
- 不为真实等价中英文页面输出 reciprocal hreflang（本轮无中文新增）；
- sitemap 不含测试 fixture、legacy `.html` 或非 canonical 路由；
- 不创建薄 FAQ、费用库或未有官方来源支撑的关键词页。

## 12. 禁止范围

本轮不允许：
- 扩展其他国家或考试主题；
- 新增公开页面或 Hub 页；
- 将任何页面提升为 `complete-route` 或 `core-route`；
- 修改 Germany A1/B1、France、Netherlands Inburgering、Spain 内容；
- 修改 TestDaF 或 telc starter 状态；
- 修改视觉设计、无关组件、工具业务、广告、商业流程或部署；
- 编辑 `dist/`、`.astro/`、`node_modules/` 或 legacy 根目录 HTML；
- 添加依赖或修改锁文件；
- 创建占位页面或无来源支持的公开草稿；
- 提交、推送或部署。

## 13. 执行与验证设计

Codex 必须采用测试先行的最小变更流程：

1. 记录工作树和既有修改；
2. 阅读项目规则、schema、审计文档、目标内容和相关测试；
3. 为每页建立 claim matrix；
4. 实际打开官方来源，逐页决定 `reviewed` 或继续 `pending`；
5. 修复双向 nextGuideSlug 循环；
6. 清理正文中的通用模板语言和内部编辑语言；
7. 运行聚焦测试并修复；
8. 运行完整回归；
9. 检查 diff 和意外生成文件；
10. 按真实结果输出证据化报告。

最终至少运行：

```bash
node tests/content-integrity.test.js
node tests/source-review-render.test.js
npm test
git diff --check
npm run launch-check
```

若测试或 launch check 失败，不得报告完成。不得放宽测试、删除断言或将失败描述为"基本通过"。

## 14. 验收标准

- 10 篇目标指南的来源状态与实际官方核验一致；
- 每个国家 requirement → choice 单向链，无直接双向循环；
- Finland supportingGuideSlugs 收窄到本国；
- 页面显示文章特定下一步，而非只有通用 CTA；
- `contentStatus` 全部保持 `verification-pending`；
- title、H1、description 和正文范围一致；
- sitemap 不含测试 fixture、legacy `.html` 或非 canonical 路由；
- 所有聚焦测试、完整测试、diff check 和 launch check 通过；
- 最终报告逐文件列出修改、来源处置、状态、验证命令和未完成事项；
- 明确未提交、未推送、未部署。

## 15. 交付边界

本设计只规定最终 Codex 提示词的内容与结构。当前任务不会执行网站内容更新，不会访问或发布外部系统，也不会提交、推送或部署代码。
