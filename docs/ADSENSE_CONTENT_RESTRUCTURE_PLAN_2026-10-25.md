# VisaLang 内容重构方案：从“核验提醒站”到“有信息增量的备考与路线站”

- 日期：2026-10-25
- 背景：AdSense 复审结果仍为“低价值内容”
- 依据：本地构建 `dist/`（104 个 HTML 页面）、`src/content/guides/` 53 篇指南、`src/data/publication-manifest.ts`、此前的 `ADSENSE_*` 审计文档
- 边界：Google 不公布具体判定页面或分数。本文是基于可测量信号的推断，不能保证复审通过。

---

## 1. 诊断：为什么在“页面都很长”的情况下仍被判低价值

上一轮整改（7 月–9 月）解决的是**数量与状态**问题：noindex 了 pending 页、关掉了 404/商业页广告、把 15 篇英文支柱扩到 1,300–2,400 词。本次对构建产物重新测量，剩下的问题集中在**信息密度**，而不是长度。

### 1.1 实测数据（2026-10-25 构建）

| 指标 | 数值 | 说明 |
|---|---:|---|
| 生成 HTML 页面 | 104 | |
| sitemap 可索引 URL | 41 | 15 英文支柱 + 5 中文支柱 + 工具/枢纽/About 等 |
| noindex 但仍可访问、可抓取的页面 | 63 | 其中 38 篇是英文指南 |
| 15 篇支柱的正文词数 | 1,288–2,428 | 长度已不是问题 |
| 支柱中“verify / confirm / official / authority / do not / cannot / boundary / source”出现密度 | **每 100 词 1.8–5.1 次** | 最高的是 `germany-b1-settlement-citizenship-timeline`（5.1） |
| 支柱正文中的具体数字个数 | **7–56** | `goethe-b1-fees-and-booking` 全文只有 7 个数字 |
| 每篇指南固定模板区块 | 9 个 | Direct answer、Who decides、Verify 提醒、What to verify 表、Common mistakes、Disclaimer、Report outdated 等 |
| “Direct answer” 的内容 | = `description` 原文 | 53 篇里只有 7 篇有真正的 `directAnswer`，其余只是把 meta 描述再显示一遍 |
| 署名 | 全部为 “VisaLang Editorial team” | 没有可核验的真人作者/审稿人 |

### 1.2 核心判断

**页面在告诉读者“去问官方”，而不是告诉读者“答案是什么”。**

以 `goethe-a1-vs-telc-a1` 为例：读者搜索这个词，想知道两场考试有什么不同、哪个更容易、多少钱、多久出成绩。页面 1,552 词里大部分篇幅在讲“先问使馆、再问考试机构、再问考点、不要相信别处的价格”。真正的对比事实（题型时长、及格线）被放在一个组件表里，排在第 5 个 H2 之后。

在 Google 的“有帮助内容”自查框架里，这类页面会在以下问题上失分：

- *内容是否提供了原创信息、报告、研究或分析？* —— 大部分是流程性免责声明，原创分析少。
- *读完后，读者是否觉得已经学到足够多、能达成目标？* —— 读者被反复要求去别处找答案。
- *与搜索结果中的其他页面相比，是否提供了实质性价值？* —— 官方页面本身已经给出了考试结构；本站没有在其上加东西。

“官方来源优先”是本站的正确定位，但它应该体现在**引用和日期**上，而不是体现在**每一段都重复一遍免责声明**上。

### 1.3 次要但会拖累整站判断的问题

1. **63 个 noindex 页仍公开可访问。** noindex 只影响搜索收录，不影响 AdSense 审核员或爬虫看到它们。38 篇 noindex 指南里，16 篇状态为 `verification-pending`，法国、西班牙、荷兰等国家页只有 400–500 词，质量明显低于支柱。首页 “Already have a certificate?” 链接指向的 `goethe-a1-germany-family-reunion` 就是 noindex 页面。
2. **`guideRedirectCandidates` 里已列出 17 个合并目标，但 `guideRedirects` 是空的。** 合并已经决定了，但还没执行；薄页和支柱同时在线。
3. **首页没有实质内容。** 首页全是导航卡片和“我们不做决定”的声明，读者看完带不走任何一条事实。
4. **没有作者 E-E-A-T 信号。** 签证/移民话题属于 YMYL，机构署名 + “source-review 角色”无法建立信任。

---

## 2. 重构原则

1. **先给答案，再给边界。** 每页第一屏回答搜索意图本身（考试结构、费用记录、时长、难点）。所有事实带“来源 + 核验日期”。免责声明集中到一处，不在每节重复。
2. **只做官方页面没有的东西。** 官方给的是规则；本站给的是：横向对比、练习题与范文、时间线算例、常见失分点、真实决策场景、可下载清单。这才是“信息增量”。
3. **少而深。** 复审前，公开可访问的页面只保留成熟页。其余要么合并（301），要么暂时不生成，而不是 noindex 后继续挂着。
4. **一个页面一个任务。** 两页如果只是换了考试名或国家名、任务相同，就合并。
5. **不编造。** 依然遵守 CLAUDE.md：不发明费用、日期、豁免、接受情况。具体数字只来自 `claim-registry.ts` 或已核验来源，并显示核验日期。

---

## 3. 新的内容架构

### 3.1 三层结构

```
Layer 1  路线枢纽（2 个）      /germany-family-reunion-a1/   /germany-b1-settlement-citizenship/
            │
Layer 2  决策支柱（15 → 13）   要求 / 考试对比 / 费用 / 考点 / 时间线 / 材料清单
            │
Layer 3  备考深度内容（新增）   听说读写分项、模拟题、范文、错题本、30 天计划
```

当前站点只有 Layer 1 和 Layer 2，Layer 3 已经被合并掉了（A1 听力/口语/写作等页被列为合并候选）。**Layer 3 恰恰是最容易做出原创价值、最不涉及签证决策风险的内容**，应当作为重建重点。但要用原创练习材料重写，而不是恢复旧的 470 词薄页。

### 3.2 页面处置表（复审前执行）

| 组 | 页面 | 处置 | 理由 |
|---|---|---|---|
| 英文 A1 支柱 | 7 篇 | **保留，按 §4 重写顶部与结构** | 已有真实结构和来源 |
| 英文 B1 支柱 | 8 篇 | 保留 6 篇；`settlement-citizenship-timeline` 与 `-checklist` 合并；`leben-in-deutschland` 并入 `citizenship-language-proof` | 任务重叠；timeline 免责密度最高（5.1） |
| A1 流程薄页（retake、pre-booking、booking-mistakes、FAQ、working-adults、official-links） | 6 篇 | **执行 301** 到 `guideRedirectCandidates` 里已定的目标 | 合并决定已做，只差执行 |
| A1/B1 技能薄页（listening、speaking、writing、difficulty、mock-exam、writing-assessment 等） | 8 篇 | 先 301 到学习计划；**在 Layer 3 重新写成深度页**后再启用新 URL | 旧页 470 词，没有原创练习 |
| `goethe-a1-germany-family-reunion` | 1 篇 | 合并进 `german-family-reunion-language-requirement` 的“已有证书”一节；首页链接改指向支柱 | 首页链到 noindex 页 |
| telc 4 篇、TestDaF 4 篇 | 8 篇 | **暂不生成**，Phase 3 按 §4 标准重写后再上线 | starter-overview，来源未完成 |
| 其他国家 16 篇（法、西、葡、意、荷、芬、英、加） | 16 篇 | **暂不生成**，保留 Markdown 源文件 | 400–1,200 词、verification-pending，拉低整站均值 |
| 12 个分类页 | 12 | 已 noindex；只保留 germany-a1 / germany-b1，其余不生成 | 分类页只有 1–2 篇子页 |
| 中文支柱 | 5 篇 | 保留，按 §4 同步重写（中文原生写作，不机翻） | |
| 商业页（pricing、partners、products） | 5 | 不生成，或从导航移除，直到真有产品 | “即将推出”页属于 Google 明确不宜放广告的类型 |

执行后，公开可访问的内容页约 **20 个（英文支柱 13 + 中文支柱 5 + 枢纽 2）**，全部为成熟页。之后再按 §5 节奏扩充。

> 实施注意：从构建中排除页面时，要同步 `public/_redirects`（老 URL 301 到相关支柱，不要 404）、`src/data/url-support-inventory.ts`、`src/data/publication-manifest.ts`，以及 `tests/` 中断言 53 篇和 15 篇支柱的计数测试（`tests/site.test.js:441-442`）。

---

## 4. 单页深度标准（替代“字数目标”）

每篇保留或新写的页面必须同时满足：

### 4.1 首屏（Direct answer 区）

- 用 2–4 句话**直接回答**标题里的问题，给出决策结论并指出确切数字的位置。
  - ✗ 现在：“How to compare Goethe A1 and telc A1 for Germany family reunion without assuming which certificate…”（这就是 description，没有回答任何问题）
  - ✓ 目标：“Goethe-Zertifikat A1: Start Deutsch 1 和 Start Deutsch 1 / telc Deutsch A1 都是 CEFR A1 成人考试，书面和口试结构相近。选择的决定因素几乎不在题型本身，而在你的使领馆接受哪一个具体产品、以及你能实际预约到哪个官方考点；确切时长、及格线和重考规则见下方经来源核验的产品对照表。”
  - ⚠️ 架构约束：**不要在 directAnswer 或正文里重复经来源核验的具体数值**（考试时长、及格分、费用金额）。这些值只存在于 `claim-registry.ts`，由 `ExamProductComparisonTable` / `LocalExamFeeTable` 以 fail-closed 方式渲染；在 Markdown 里重复会触发 `tests/m2a-exam-products.test.mjs` 和 `tests/m2a-local-fees-centres.test.mjs` 的“不得在 registry 之外重复来源控制数值”断言。directAnswer 通过 `claimRefs` 绑定这些 claim，使过期时整段自动隐藏，但文字本身只给结论、不抄数字。
- 每篇都写 `directAnswer` + `claimRefs`，不再回退到 description。

### 4.2 正文必须包含的“信息增量模块”（至少 3 个）

| 模块 | 示例 |
|---|---|
| 对比表 | 题型、时长、分数、补考规则 —— 由 `ExamProductComparisonTable` 从 registry 渲染，逐项带来源，正文不抄数值 |
| 算例 / 时间线示例 | “若考试日为第 0 天，成绩按考点说明的 X 周发布……”，用变量，不做承诺 |
| 原创练习 | 自编 A1 写作题 + 评分维度 + 范文 + 常见扣分点 |
| 场景 | 真实决策冲突（现有内容里的 Scenario 写得不错，保留并扩展） |
| 错误清单 | 增加“后果”一列，而不是只列“不要做什么” |
| 可下载 / 可打印工具 | 清单、记录模板 |

### 4.3 边界写法

- 每页只保留**一个** “Who decides / 官方核验” 块和**一个**底部免责声明。
- 正文段落里不再重复“请向官方确认”，改用行内引用：“来源：XX，YYYY-MM-DD 核验”。
- 目标：hedge 词密度从当前 1.8–5.1 降到 **≤ 1.5 / 100 词**。具体数字/事实（时长、分数、费用）由 registry 组件渲染，不在正文重复；正文提供的是分析、场景和下一步。

### 4.4 作者与审稿

- 每篇显示真实作者姓名、简介和相关经历（例如本人考过 Goethe A1/B1、从事德语教学、处理过家庭团聚材料）。
- `/about/` 和 `/editorial-policy/` 列出编辑团队的真人信息和核验流程。
- 实在无法提供真人信息时，至少提供一位身份可公开的审稿人。**这些信息只能由站长提供，代码生成不了。**

### 4.5 可自动检查的验收项（建议加入 `tests/`）

```
[ ] directAnswer 存在且 ≠ description
[ ] 正文 hedge 词密度 ≤ 1.5/100 词
[ ] 经来源核验的数值只出现在 registry 组件，正文不重复（m2a-exam-products / m2a-local-fees-centres 通过）
[ ] 至少 1 张对比表或记录表
[ ] 至少 1 个“原创练习 / 算例 / 场景”模块（按 H2 命名约定识别）
[ ] 页面内链只指向可索引页面
[ ] 作者字段不是 “VisaLang Editorial team”
```

---

## 5. 内容扩充节奏

| 阶段 | 时间 | 内容 | 页面变化 |
|---|---|---|---:|
| P0 清理 | 第 1 周 | 执行 §3.2 处置表；修正首页链接；补作者信息 | 可访问页 −30 左右 |
| P1 支柱重写 | 第 2–3 周 | 13 篇英文 + 5 篇中文支柱按 §4 重写首屏和结构 | 18 篇改写 |
| P2 Layer 3 | 第 3–5 周 | Goethe A1 四项技能（每项含原创练习 + 范文 + 评分解读）、A1 考试日流程、B1 四项技能 | +8 |
| 复审 | 第 6 周 | 按 §6 清单自查后提交 | |
| P3 扩展 | 复审后 | telc B1/B2、TestDaF 按 §4 重写后上线；其他国家每次只开一国，每国至少 3 篇成熟页才上线 | 每月 +4 |

---

## 6. 复审前自查清单

- [ ] 所有公开可访问页面（不只是 sitemap 里的）都满足 §4，或属于法律/联系页
- [ ] 不存在可见的“即将推出 / coming soon / verification pending”文案
- [ ] 首页能直接带走至少 3 条有用事实
- [ ] 作者与编辑政策中有真人身份
- [ ] 随机抽 5 页，每页都能回答“这页比官方页面多给了读者什么？”
- [ ] 广告脚本只在成熟指南页加载；首页、工具、法律页、404 不加载（已实现）
- [ ] `npm test` 与 `npm run launch-check` 通过
- [ ] 生产部署后用无痕窗口抽检：被处置的页面已真正下线或 301

---

## 7. 不做的事

- 不批量 AI 扩写来凑字数。Google 明确把“未经人工审核的自动生成内容”列为不宜投放广告的类型。
- 不恢复已下线的薄页。
- 不为了覆盖面同时开多个国家。
- 不在任何页面加入未核验的费用、日期、豁免或“通过率”数据。
