# VisaLang 后续建站规划与执行提示词

- 日期：2026-10-25
- 配套文档：[ADSENSE_CONTENT_RESTRUCTURE_PLAN_2026-10-25.md](./ADSENSE_CONTENT_RESTRUCTURE_PLAN_2026-10-25.md)（诊断与内容标准）
- 用法：第一部分是路线图；第二部分是可以直接复制给 Claude Code / Codex 的分阶段提示词。每条提示词都是自包含的。按顺序执行，一次只执行一条，验收通过后再进入下一条。

---

## 第一部分：路线图

### 目标

| 时间点 | 目标 | 可度量信号 |
|---|---|---|
| 第 6 周 | AdSense 复审通过 | 后台状态从“需要注意”变为“准备就绪” |
| 第 12 周 | Germany A1/B1 成为可信的垂直站 | Search Console 中 20+ 页面有展示；支柱页平均停留 > 2 分钟 |
| 第 24 周 | 扩展到第二个考试体系（telc / TestDaF） | 新增 8–10 篇成熟页，每页通过 §4 验收 |

### 阶段总览

```
P0 清理（W1）──► P1 支柱重写（W2–3）──► P2 备考深度内容（W3–5）──► 复审（W6）
                                                                   │
                         P4 扩展（复审后，每月一个主题）◄── P3 体验与信任（W4–6，并行）
```

| 阶段 | 产出 | 依赖 | 负责人 |
|---|---|---|---|
| P0 清理 | 执行页面处置、301、首页链接修正、更新计数测试 | 无 | 开发 |
| P1 支柱重写 | 18 篇支柱的新首屏、结构和 directAnswer | P0 | 内容 + 开发 |
| P2 Layer 3 | 8 篇原创备考页（含练习、范文、评分） | P0 | 内容（需要德语能力） |
| P3 信任 | 真人作者页、编辑政策、首页事实区 | **站长提供真人信息** | 站长 + 开发 |
| P4 扩展 | telc → TestDaF → 其他国家 | 复审通过 | 内容 |

### 站长必须亲自提供的输入（代码无法生成）

1. 至少一位作者/审稿人的真实姓名、简介和可公开的资历（德语证书、教学或移民相关经验）。
2. 是否同意在重写完成前下线 telc、TestDaF 和其他国家页面（处置表 §3.2）。
3. 商业页（pricing / partners / products）继续保留还是暂时移除。
4. Layer 3 原创练习题由谁编写，或者由谁对 AI 草稿做人工审校。

---

## 第二部分：执行提示词

> 每条提示词开头都要求先读 `CLAUDE.md`，因为项目约束（不编造费用/日期、尾斜杠 URL、只用 `global.css` 等）都写在那里。

### 提示词 P0-1：执行页面处置（下线与 301）

```text
先读 CLAUDE.md、PROJECT_CONTEXT.md 和 docs/ADSENSE_CONTENT_RESTRUCTURE_PLAN_2026-10-25.md 的 §3.2。

任务：在复审前减少公开可访问的低成熟度页面。

1. 在 src/data/publication-manifest.ts 新增导出 `unpublishedGuideSlugs`，包含：
   - 4 篇 telc（category: germany-telc）
   - 4 篇 TestDaF（category: germany-testdaf）
   - 16 篇其他国家指南（uk、canada、italy、spain、portugal、netherlands、france、finland）
2. 修改 src/pages/guides/[slug].astro 的 getStaticPaths，不为上述 slug 生成页面。Markdown 源文件保留，不删除。
3. 修改 src/pages/guides/category/[category].astro，只生成 germany-a1 和 germany-b1。
4. 把 guideRedirectCandidates 中的英文 A1/B1 条目移入 guideRedirects，并在 public/_redirects 中为每条加 301。下线的 24 篇也加 301，指向最相关的现存页面（没有相关页时指向 /guides/）。任何旧 URL 都不能变成 404。
5. 首页 src/pages/index.astro 中 “Already have a certificate?” 目前链接到 noindex 页 /guides/goethe-a1-germany-family-reunion/。改为链接到 /guides/german-family-reunion-language-requirement/ 中合适的锚点，并同步更新 tests/task-4-home-routes.test.mjs 中的对应断言。
6. 更新 tests 中所有依赖页面计数的断言（例如 tests/site.test.js 中断言 53 篇的那一行），让断言反映新事实，不要直接删除断言。

验收：
- npm run build 后，dist/ 中不存在被下线 slug 的 index.html
- 扫描 dist/**/index.html 的内部链接，不存在指向 noindex 页或不存在页面的链接
- npm test 和 npm run launch-check 通过（如果 tests/planning-map-governance.test.mjs 因治理摘要过期而失败，单独报告，不要伪造摘要）
- 输出一张表：每个旧 URL → 新去向
```

### 提示词 P0-2：内部链接审计

```text
先读 CLAUDE.md。

npm run build 后，写一个一次性脚本（不要提交到仓库），扫描 dist/ 下所有 index.html 的 <main> 内链接，报告：
1. 指向 noindex 页面的链接
2. 指向不存在页面的链接
3. 每个可索引页面的入链数量（列出入链 < 2 的页面）

修复第 1、2 类问题。第 3 类只报告，不修改。
```

### 提示词 P1-1：支柱页首屏与正文重写（每次一篇）

```text
先读 CLAUDE.md 和 docs/ADSENSE_CONTENT_RESTRUCTURE_PLAN_2026-10-25.md 的 §4。

目标页：src/content/guides/{SLUG}.md

1. 读该页全文，以及 src/data/claim-registry.ts 中与它相关的 claim。
2. 写一个 directAnswer（英文 2–4 句），直接回答标题里的问题，给出决策结论并指出确切数字在“经来源核验的产品/费用表”中的位置，frontmatter 加上对应的 claimRefs。⚠️ 不要在 directAnswer 或正文里重复具体数值（时长、及格分、费用金额）——这些只存在于 claim-registry，由组件 fail-closed 渲染；重复会触发 m2a-exam-products / m2a-local-fees-centres 测试。不得写 claim-registry 里没有的数字，也不得把 registry 里已有的数字抄进正文。
3. 正文改写规则：
   - 删除段落里重复的 “verify with the authority / do not assume / confirm before” 类句子；页面模板已经有统一的核验块和免责声明。
   - 每个事实后用行内来源标注：(Source: <官方页名>, checked YYYY-MM-DD)。
   - 至少保留或新增 3 个“信息增量模块”：对比表、算例、原创练习、场景、带“后果”列的错误清单。
   - 不改 slug 和 publishedDate；updatedDate 改为今天。
4. 改写前后各统计一次：正文词数、hedge 词密度（verify|verified|confirm|confirmed|official|authority|do not|cannot|boundary|source 每 100 词出现次数）、数字个数。目标：密度 ≤ 1.5，数字 ≥ 25。

验收：
- node tests/content-integrity.test.js 通过
- npm test 通过
- 输出改写前后的指标对比表
- 列出所有改动过的事实性陈述及其来源，供人工复核

建议顺序（搜索意图最强的优先）：
goethe-a1-vs-telc-a1 → german-family-reunion-language-requirement → goethe-a1-fees-by-country → goethe-a1-test-centers → german-a1-exam-booking-timeline → german-a1-documents-checklist → goethe-a1-30-day-study-plan → goethe-b1-vs-telc-b1 → goethe-b1-fees-and-booking → goethe-b1-germany-settlement-work → germany-b1-citizenship-language-proof → germany-b1-settlement-citizenship-checklist → goethe-b1-study-plan
```

### 提示词 P1-2：中文支柱同步

```text
先读 CLAUDE.md（特别是“中文页面要为中文读者自然写作，不要机械翻译”）。

英文支柱 {SLUG} 已按 §4 重写。现在更新对应的中文页 src/pages/zh/guides/{SLUG}.astro 及其数据源 src/data/zh-germany-a1.ts：
1. 中文首屏直接回答中文读者最常问的问题（例如“歌德 A1 和 telc A1 哪个好考”“国内哪里能考”“多少钱”）。事实只用 claim-registry 中已有且已核验的内容。
2. 加入中国大陆读者特有的信息增量：北京、上海、广州歌德学院考点的官方入口，国内报名的常见流程问题，材料翻译认证的注意事项。不确定的信息给出具体的官方核验步骤，不要编造。
3. 按中文写作习惯组织段落，不要逐句对应英文。

验收：node tests/scheme-3-chinese-pillars.test.js 与 npm test 通过。
```

### 提示词 P2-1：Layer 3 原创备考页（每次一篇）

```text
先读 CLAUDE.md 和 docs/ADSENSE_CONTENT_RESTRUCTURE_PLAN_2026-10-25.md。

新建指南：src/content/guides/goethe-a1-{SKILL}-practice.md（SKILL = writing | speaking | listening | reading）

内容要求：
1. 该部分的考试结构：题型、时长、分值。只用 Goethe 官方产品页和官方 Durchführungsbestimmungen 中的事实，并注明核验日期。
2. 原创练习：至少 3 道仿真题（自编，不得照抄官方样题），每题附：
   - 参考答案或范文
   - 按官方评分维度的逐项点评
   - 3 个常见失分点及改法
3. 一周练习计划表（每天 30–45 分钟）。
4. 链接到官方免费模拟题入口（只链接，不复制内容）。
5. 这类页面不涉及签证决策，不需要在正文里重复签证免责声明，保留模板自带的那一处即可。

frontmatter：category: germany-a1，contentStatus: core-route，按 content.config.ts 填全所有必填字段。把 slug 加入 englishPillarSlugs 之前，先请站长人工审校练习题的德语。

验收：
- 德语练习部分标注“待人工审校”，直到站长确认
- npm test 通过
- 页面 hedge 词密度 ≤ 1.0
```

### 提示词 P3-1：作者与信任页

```text
先读 CLAUDE.md。

站长提供的作者信息：
- 姓名：{NAME}
- 简介：{BIO}
- 相关资历：{CREDENTIALS}
- 可公开的个人链接：{LINK}

任务：
1. 新建 src/data/authors.ts，导出作者记录（id、name、bio、credentials、url）。
2. content.config.ts 中 author 字段改为引用作者 id，保留默认值以免破坏现有文章。
3. GuideLayout.astro 的 guide-meta 区显示作者姓名（链接到 /about/#author-{id}），Article JSON-LD 的 author 改为 Person 类型。
4. /about/ 增加“编辑团队”一节；/editorial-policy/ 写明谁核验来源、多久复查一次、怎样处理读者报错。
5. 更新相关测试断言。

验收：npm test、npm run launch-check 通过；Rich Results Test 中 Article 的 author 为 Person。
```

### 提示词 P3-2：首页加入事实区

```text
先读 CLAUDE.md。

首页 src/pages/index.astro 目前只有导航卡片。在 Hero 下方新增 “Key facts at a glance” 区块：
1. 3–4 张事实卡，内容来自 claim-registry.ts 中当前有效的 claim（例如 Goethe A1 与 telc A1 的考试时长和及格线、B1 入籍的语言等级要求）。用和 ExamProductComparisonTable 相同的方式读取 claim；claim 过期时卡片自动隐藏（fail-closed）。
2. 每张卡显示：事实、来源名称、核验日期、对应支柱页的链接。
3. 复用 global.css 现有的卡片样式和 token，不要新建视觉体系。
4. 中文首页 src/pages/zh/index.astro 做对应的中文版本。

验收：npm test 通过；手动把一个 claim 的核验日期改成过期，确认该卡片不渲染，然后改回。
```

### 提示词 P4-1：扩展新主题（复审通过后）

```text
先读 CLAUDE.md 和 docs/ADSENSE_CONTENT_RESTRUCTURE_PLAN_2026-10-25.md 的 §4。

主题：{telc B1/B2 | TestDaF | 某个国家}

1. 先做来源复核：在 docs/ 下新建 {TOPIC}_SOURCE_REVIEW_{DATE}.md，列出每个官方来源的 URL、核验日期、能支持什么结论、不能支持什么结论。
2. 在 src/data/claim-registry.ts 中登记该主题的可验证事实。
3. 至少写 3 篇按 §4 标准完成的页面（一篇要求/路线、一篇考试对比或结构、一篇备考深度页）。三篇都通过验收后，再一起从 unpublishedGuideSlugs 移出并加入 englishPillarSlugs。
4. 不要单独上线一篇。

验收：npm test、npm run launch-check 通过；附三篇页面的 §4.5 指标表。
```

### 提示词 R-1：复审前总检查

```text
先读 CLAUDE.md 和 docs/ADSENSE_CONTENT_RESTRUCTURE_PLAN_2026-10-25.md 的 §6。

对 npm run build 产出的 dist/ 做复审前检查，逐项输出 PASS/FAIL 和证据：
1. 列出 dist/ 中所有 index.html，按“可索引 / noindex / 法律页 / 工具页”分类计数
2. 在所有可见文本中搜索 “coming soon”“verification pending”“not yet published”“即将推出”
3. 对每篇可索引指南计算 §4.5 指标
4. 检查广告脚本只出现在可索引的成熟指南页
5. 随机抽 5 篇指南，每篇用一句话写出“这页比官方页面多给了读者什么”；写不出来的标 FAIL
6. 运行 npm test 和 npm run launch-check

不要修改任何文件，只出报告。最后给出“可以提交复审 / 还不能提交”的结论和理由。
```
