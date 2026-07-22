# VisaLang 下一步内容更新 Codex 提示词设计

**日期：** 2026-07-18  
**状态：** 已获用户批准  
**产物：** `docs/prompts/2026-07-18-visalang-content-update-codex.md`

## 1. 目标

生成一份可直接交给 Codex 的单一 Markdown 主提示词，指导其在现有 Astro 内容站中完成下一轮内容更新。提示词必须把工作范围、事实门禁、编辑规则、执行顺序、验证命令和最终汇报格式写清楚，避免开放式指令导致越界重构、政策事实虚构或未经验证的完成声明。

## 2. 现状判断

VisaLang 是一个以最终决定机关为起点的双语语言证明导航站，当前最成熟的内容集群是 Germany A1 家庭团聚路线。英文指南由 Astro content collection 管理，中文 Germany A1 内容由独立 Astro 页面和受控数据管理。项目已具备内容成熟度、来源审查状态、决策阶段、双语路由、canonical、hreflang、JSON-LD、sitemap 和集群测试等机制。

五个独立 Agent 的分析共同指出：下一轮应优先修复 Germany A1 的来源可信度、路线顺序、中文关键决策断点和文章级下一步行动，而不是继续横向增加国家或宽泛考试页面。

## 3. 最终提示词结构

最终 Markdown 使用单一主提示词，依次包含：

1. 角色与总目标；
2. 项目根目录和事实优先级；
3. 本轮明确范围；
4. 停止条件与官方来源门禁；
5. P0：现有 Germany A1 内容可信度和路线修复；
6. P1：中文 Germany A1 内容闭环；
7. 品牌文案、内容结构和 SEO 规则；
8. frontmatter、来源状态、双语和内链约束；
9. 禁止项；
10. 测试先行的执行步骤；
11. 分层验证命令；
12. PASS、PARTIAL、BLOCKED 最终汇报格式。

## 4. 本轮工作范围

### P0：现有内容可信度

Codex 应重新打开并核验现有审计记录列出的官方来源，然后在来源仍适用时更新 7 篇 Germany A1 指南的来源审查元数据和必要文案：

- `src/content/guides/german-family-reunion-language-requirement.md`
- `src/content/guides/goethe-a1-vs-telc-a1.md`
- `src/content/guides/goethe-a1-test-centers.md`
- `src/content/guides/goethe-a1-fees-by-country.md`
- `src/content/guides/goethe-a1-retake-policy.md`
- `src/content/guides/german-a1-documents-checklist.md`
- `src/content/guides/german-a1-exam-booking-timeline.md`

同时应：

- 纠正 `decisionStage` 与页面实际用户任务不一致的问题；
- 修复 `nextGuideSlug` 的回退、双向循环和非业务顺序；
- 保持 `supportingGuideSlugs` 可解析并符合路线关系；
- 让文章特定的下一步行动对用户可见，避免只显示通用 CTA；
- 保持内容成熟度与来源审查状态分离，不因来源已核验而自动提升 `contentStatus`。

若来源无法访问、已变化或不能支持原主张，Codex 必须保持 `pending`，删除或限定无支持结论，并将状态报告为 `PARTIAL` 或 `BLOCKED`。

### P1：中文内容闭环

新增并接入以下三个中文 Germany A1 核心页面：

- `src/pages/zh/guides/goethe-a1-germany-family-reunion.astro`
- `src/pages/zh/guides/goethe-a1-test-centers.astro`
- `src/pages/zh/guides/german-a1-exam-booking-timeline.astro`

同步更新：

- `src/data/zh-germany-a1.ts`
- `src/data/site.ts`
- `src/pages/zh/germany-family-reunion-a1.astro`
- 与中文元数据、来源状态和双语一致性直接相关的最小布局或组件
- 对应的最小测试

中文页面必须自然重写，不逐句机械翻译；不能继承英文页面的来源审核状态；必须明确最终决定机关、考试方和当地考点的职责边界。

## 5. 内容与品牌设计

内容遵循“前瞻、锐度、温度”：

- 前瞻：提前指出下一决策、时间风险、材料依赖和需要保留的记录；
- 锐度：明确谁决定什么，删除内部编辑术语、空泛背景和模糊比较；
- 温度：承认时间、费用和复考压力，但不承诺结果。

每页只解决一个主要用户决策。标题、导语、摘要、Direct answer、正文和 CTA 的确定程度必须与来源支持范围一致。页面只能提供核验流程时，应使用“如何核验”类标题，不得用确定性标题后在正文拒绝回答。

删除或避免以下类型的用户可见表达：

- “搜索意图”“受控数据”“来源事实表”“发布前人工核验清单”等编辑工作台语言；
- `decision support`、`manual checks still needed` 等内部英文；
- 重复的完整免责声明、同质化 FAQ 和全站相同 CTA；
- “最稳、最简单、默认选择、一定接受、包过、保证赶上”等过度承诺；
- “comprehensive guide”“one-stop solution”“navigate the complex world of”等 AI 套话。

## 6. SEO 和信息架构设计

Codex 必须：

- 让 Germany A1 Hub、requirement guide、FAQ 各自承担唯一搜索意图；
- 让主路线遵循 `requirement → accepted proof → provider choice → centre/booking → timeline → documents → study → submission/retake`；
- 不使用更新时间、发布日期或标题字母顺序代替业务路线顺序；
- 保持 canonical 为当前绝对 HTTPS trailing-slash URL；
- 只为真实等价中英文页面输出 reciprocal hreflang；
- 让中文指南具备与可见内容一致的 Article 和 BreadcrumbList 数据；
- 确保 sitemap 不含 legacy `.html` URL、测试 fixture 或非 canonical 路由；
- 不新增薄 FAQ、费用库、考点库或未有官方来源支撑的关键词页。

## 7. 禁止范围

本轮不允许：

- 扩展 UK、Canada、Italy、Spain、France、Finland、Netherlands、Portugal 等其他国家内容；
- 新增 Germany B1 页面或提升 B1 状态；
- 提升 TestDaF 的 `starter-overview` 状态；
- 修改视觉设计、无关组件、工具业务、广告、商业流程或部署；
- 编辑 `dist/`、`.astro/`、`node_modules/` 或 legacy 根目录 HTML；
- 添加依赖或修改锁文件；
- 创建占位页面或无来源支持的公开草稿；
- 提交、推送或部署。

## 8. 执行与验证设计

Codex 必须采用测试先行的最小变更流程：

1. 记录工作树和既有修改；
2. 阅读项目规则、schema、审计文档、目标内容和相关测试；
3. 为来源、路线顺序和中文页面行为编写或更新最小失败测试；
4. 运行聚焦测试，确认测试在实现前失败；
5. 实施最小内容和必要支撑变更；
6. 运行聚焦测试并修复；
7. 运行完整回归；
8. 检查 diff 和意外生成文件；
9. 按真实结果输出证据化报告。

最终至少运行：

```bash
node tests/content-integrity.test.js
node tests/germany-a1-cluster.test.js
node tests/source-review-render.test.js
npm test
git diff --check
npm run launch-check
```

若测试或 launch check 失败，不得报告完成。不得放宽测试、删除断言或将失败描述为“基本通过”。

## 9. 验收标准

最终 Codex 提示词应使执行结果满足：

- 7 篇目标英文指南的来源状态与实际官方核验一致；
- Germany A1 主路线无直接双向 next-guide 循环；
- 页面显示文章特定下一步，而非只有通用模板 CTA；
- 新增 3 个中文页面可构建、可访问并进入中文 Hub；
- `zh-germany-a1.ts`、`translatedPaths`、canonical 和 hreflang 同步；
- 中文不虚构 translation review 或 source review；
- title、H1、description 和正文范围一致；
- sitemap 不含测试 fixture、legacy `.html` 或非 canonical URL；
- 所有聚焦测试、完整测试、diff check 和 launch check 通过；
- 最终报告逐文件列出修改、来源处置、状态、双语、验证命令和未完成事项；
- 明确未提交、未推送、未部署。

## 10. 交付边界

本设计只规定最终 Codex 提示词的内容与结构。当前任务不会执行网站内容更新，不会访问或发布外部系统，也不会提交、推送或部署代码。
