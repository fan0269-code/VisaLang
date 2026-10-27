# B1 集群关键词蚕食治理方案（可执行版）

- 方案日期：2026-10-27
- 仓库：`/Users/a1-6/Documents/2.codex/1.visalang.org`
- 生效范围：**仅 `drafts/`**。本文件不修改 `src/`、`public/`、`tests/`、`docs/planning-map/`。`src/` 变更受 planning-map 治理阻塞（见 §7）。
- 硬约束：不改事实（不新增/修改费用、日期、资格结论、法条引用）；seoTitle ≤ 49 字符（`src/content.config.ts` 已强制）；不新增 `claimId`，不删 `claimRefs`。
- 作者角色：link-strategist-2（链接策略与内容分析）
- 修订：**v6**（2026-10-27）——本方案已被执行，文件转为「决策记录 + 核验报告」，请以 **§11 的核验矩阵**为准（含 S1/S2/S3 三个源码快照与一个 dist 快照，引用必须带编号）。v6 变化：**撤回三处我说错的事实**——(a) 「directAnswer 3 句是我方案内部矛盾、由 link-strategist-3 写成」错（他落地版 5 篇全是 2 句，3 句是 content-editor 按 P0-1/P0-3 整体替换后一度反弹、现已回到 5/5 两句）；(b) 「9 个 noindex 分类页在 sitemap 里」错（dist 实测 sitemap 41 条、分类页 0 条、41+65 严格互补，我漏读了 postbuild 脚本）；(c) 「sitemap 由硬编码黑名单决定」说反了（黑名单 16 条中 15 条有构建页且全部已 noindex，一条也没额外拦到）。另新增 §11.8（并发写纪律）、§11.9（`exit 0` + 空 TAP 是假绿灯；m4 耗时 171.6s/5.85s/0.55s 是负载伪影，不许当预算）、§11.10（dist 侧核验与三处纠错）。§11.3 的「词数预算」判定列已作废（主理人裁定 ≤25/≤20 不采纳，在效口径为「2 句」）。v2 的修订（`routeGuideOrder` 结论、探针证据）见 §10。

---

## 0. 结论摘要（先看这里）

1. **不合并。本轮 301 数量 = 0。** 5 篇被点名的页面（3 篇意图重叠 + checklist + timeline）实测为 1,555–1,971 词，全部满足 `germany-b1-cluster.test.js` 的 1,200–2,400 词门槛，且每篇都有独占的 claim 集与独占的法条来源。合并会**删除独有内容而不是消除重复**（依据 §1.2 的实测重叠率）。
2. **真正的病灶不是重复内容，而是「意图框架重叠 + 链接三角」。** 三篇互相把对方的答案当成自己的过渡段，页均把「语言/知识分流」讲一遍，导致 Google 难以判断哪一页才是该问题的答案页（依据 §2）。
3. **改动面（推荐路径）**：5 个 `.md` 的 `seoTitle` / `description` / `directAnswer` 文案 + 2 处正文首段/段落替换 + 3 条新增上下文内链 + 2 处锚文本改写 + 1 处 hub 卡片名（结构化数据 `hasPart` 名称）。**不改 slug、不改 supportingGuideSlugs、不改 englishPillarSlugs、不改 `public/_redirects`、不改 readingTime。**
4. **测试影响**：走「日期冻结」策略为 **0 个测试文件改动**；走「刷新 updatedDate」策略需同步改 4 个测试文件的日期期望（exact diff 见 §8.2，二选一，勿混用）。

---

## 1. 现状量化

### 1.1 数据表（实测，非估计）

| # | slug | 正文词数 | readingTime | 现 seoTitle | 字符数 | decisionStage | nextGuideSlug |
|---|------|---------|-------------|-------------|--------|---------------|---------------|
| A | `goethe-b1-germany-settlement-work` | 1,697 | 9 | Germany settlement permit B1 proof | 34 | requirement | `goethe-b1-vs-telc-b1` |
| B | `germany-b1-citizenship-language-proof` | 1,590 | 8 | German citizenship B1 language proof | 36 | requirement | `goethe-b1-vs-telc-b1` |
| C | `germany-b1-leben-in-deutschland-and-language-proof` | 1,555 | 8 | B1 and Leben in Deutschland explained | 37 | requirement | `goethe-b1-vs-telc-b1` |
| D | `germany-b1-settlement-citizenship-checklist` | 1,971 | 10 | Germany B1 settlement and citizenship checklist | 47 | submission-review | （空，终局页） |
| E | `germany-b1-settlement-citizenship-timeline` | 1,657 | 9 | Germany B1 settlement and citizenship timeline | 46 | local-execution | `…-checklist` |

词数计算复刻 `tests/germany-b1-cluster.test.js` 的口径（剥离 URL 与 HTML 标签后按 `\b[\p{L}\p{N}]…` 计数），5 篇 `readingTime` 与 `ceil(words/200)` 完全一致，可直接作为基线。

germany-b1 类目共 13 个源文件：8 个可索引（`englishPillarSlugs` 中的 8 条）+ 5 个 344–351 词的薄页（`goethe-b1-difficulty-analysis` / `-listening-deep-dive` / `-mock-exam-routine` / `-speaking-topics` / `-writing-assessment`），后者已在 `guideRedirectCandidates` 且 `disposition=retained`（noindex/无 sitemap/无广告）。

### 1.2 重复内容实测（否定「合并即去重」的前提）

对 5 篇正文做 6-gram 词串 Jaccard 重叠：

| 组合 | 重叠率 | 共享 6-gram 数 |
|------|--------|----------------|
| A × B | **0.5%** | 18 |
| A × C | **0.4%** | 14 |
| B × C | **0.9%** | 28 |
| D × E | **0.7%** | 24 |
| A × D | 0.5% / A × E 0.4% | 20 / 13 |
| B × D | 0.6% / B × E 0.5% | 20 / 16 |
| C × D | 0.4% / C × E 0.4% | 13 / 12 |

结论：**没有任何一篇是另一篇的近似副本**（`scheme-3-english-content-quality.test.mjs` 另有「任意两篇不得共享连续 80 词」的断言，目前为绿）。因此「薄页并入支柱」不成立——这 5 篇都不是薄页。

### 1.3 现存 8 篇的独占资产（合并即丢失）

| 页面 | 独占 claim | 独占官方来源 | 独占结构 |
|------|-----------|--------------|----------|
| A | `germany-b1-settlement-{general,skilled,blue-card}-*`（9 条）| `aufenthg_2004/__9.html`、`__18c.html`、`__2.html` | §9 / §18c(1) / §18c(2) 四行条文匹配表 + 四个 checklist 分支锚 |
| B | `germany-b1-citizenship-{language,knowledge,wider-file}`（3 条）| `stag/__10.html` | 特殊规则/例外（子女、前招募工人、困难条款、疾病残疾年龄）分流段 |
| C | `germany-b1-integration-course-evidence`（**全站唯一消费者**）| `intv/__17.html` | DTZ / LiD / Zertifikat Integrationskurs 文档识别表 |
| D | 复用 A+B 的 12 条 claim | 4 个 `#*-checklist` 锚 | 4 分支 × 4 证据道 + `confirmed / n-a / unresolved` 状态词表 |
| E | 复用 A+B 的 12 条 claim | `bamf-navi` 定位器 | 双轨（settlement / citizenship）日期账本 + 依赖箭头 |

C 若被合并，`germany-b1-integration-course-evidence` 将失去唯一消费者（`usedBy` 仅 `guide:germany-b1-leben-in-deutschland-and-language-proof`），等于把一个已核验 claim 变成孤儿。

---

## 2. 诊断：蚕食的四条具体通路

**C1｜标题 token 级撞车（最严重）**
D 与 E 的 seoTitle 前 5 个 token 完全相同：`Germany B1 settlement and citizenship` + 后缀（`checklist` / `timeline`）。这是仅靠后缀区分，SERP 上两页的「主题指纹」几乎一致，且两者 decisionStage 相邻（submission-review / local-execution），互相稀释。

**C2｜「语言 vs 公民知识分流」被四页复述**
B 的「Keep two evidence lists」、C 的「Build a two-column evidence note」、D 的「Language and civic-knowledge evidence」、E 的两轨表都在教同一件事。分流解释的唯一所有者应是 C；A/B/D/E 只需一句边界 + 链回 C。

**C3｜链接三角（解释权分散）**
现状：B→C→B 互指，B/C 都推给 D，D/E 都指向 A 与 B。每页的 `## Next action` 都在说「这个问题去那页」，等于由每一页替另两页背书 → 主题信号的锚点漂移。同时存在两处**入链缺口**：A 的正文与 RelatedGuides 都**没有**任何指向 C 的链接（而 A 正是最需要「知识道」交接的定居程序页）；D 同样不链 C，尽管 D 的「Knowledge」行就是 C 的问题。

**C4｜C 的元数据把自己卖成「入籍页」**
C 的 `primaryOfficialAuthorityUrl` 是 `einbuergerung.de/ablauf.php?l=en`（入籍流程门户），`guidePurposeOverrides` 标注 `['settlement','citizenship']`，directAnswer 直接讲「两个要求」。但 C 的真正独占价值是 **IntV §17 的文档识别**（你手上这张纸属于哪条证据道）。元数据把 C 拉入入籍意图族，正是三页互抢的直接原因。

---

## 3. 三篇重定位方案（A / B / C）

三篇共用一条铁律：**每篇只回答一个问题，其余三个方向用一句边界句交出去**。`title`（H1/面包屑/JSON-LD headline）**全部保持不动**——三篇 H1 已经天然区分（都含各自独有词），改 H1 会牵动面包屑与 `Article.headline`，收益低于风险。

### 3.A `goethe-b1-germany-settlement-work`

| 项 | 内容 |
|----|------|
| **新主承接意图** | 「德国**定居许可**（Niederlassungserlaubnis / settlement permit）要不要 B1、按哪条条文」——即按 § 9(2) / § 18c(1) / § 18c(2) 分支定位语言证据 |
| **不再承接** | 入籍（§10 StAG）、考试产品对比、备考、公民知识分流教学 |
| **seoTitle（旧）** | `Germany settlement permit B1 proof`（34） |
| **seoTitle（新）** | `Germany settlement permit B1: which provision`（**45**） |
| **description（旧）** | `Check a Germany settlement-permit language-proof question without treating B1 as approval or overlooking the route's other requirements.` |
| **description（新）** | `Match the B1 language question to the settlement-permit provision your foreigners authority names — § 9, § 18c(1) or § 18c(2) — before comparing any exam product.`（**162**，测试要求 70–170） |
| **新首段定位句（directAnswer，2 句）** | `This page covers one question: the language evidence on a German settlement-permit route, where B1 is the level that § 9, § 18c(1) and § 18c(2) reference. Your local foreigners authority confirms which provision applies and which document it accepts; § 10 naturalisation and exam-product choice are handled by separate guides.` |
| **正文首段（替换，2 句）** | `Read this page only for the language-evidence question on a settlement-permit route. Naturalisation, exam-product choice and study planning belong to the guides that own them, and nothing here turns B1 into a work-visa requirement.`（替换掉现有「The word “work” in this page's existing address…」这段**关于 URL 的自我解释**——它对读者零价值，且把 slug 缺陷写进了正文） |
| **与另两篇的分工边界** | 对 B：A 不出现「Einbürgerung / naturalisation evidence」正文段落，只在 directAnswer 提一句 §10 已由他页承接。对 C：A 不解释 DTZ/LiD 差异，改为**新增一条链**指向 C（原缺失）。对 D/E：A 只做「条文→分支」入口，交付给 D 的分支锚（现状已如此，保持）。 |
| 事实边界 | 新增句只含 §9/§18c(1)/§18c(2) 与 B1 的既有表述，**没有**新增任何资格、期限、费用结论。 |

### 3.B `germany-b1-citizenship-language-proof`

| 项 | 内容 |
|----|------|
| **新主承接意图** | 「**入籍**（§10 StAG）的语言证据：B1 这一项怎么和公民知识、其他条件、地方程序分开」+ 特殊规则/例外该问谁 |
| **不再承接** | 定居许可条文、考试产品、文档识别教学 |
| **seoTitle（旧）** | `German citizenship B1 language proof`（36） |
| **seoTitle（新）** | `German citizenship B1: § 10 language proof`（**42**）——保留 ``German citizenship B1`` 主词，用 `§ 10` 与 A 的 `§ 9 / § 18c` 形成法条级切分 |
| **description（旧）** | `Check the B1 language-evidence step for German naturalisation while keeping civic knowledge, other conditions and local procedure separate.` |
| **description（新）** | `Keep B1 language evidence inside a § 10 naturalisation file: separate it from civic knowledge and the wider file, and ask the nationality authority about documents.`（**164**） |
| **新首段定位句（directAnswer，2 句）** | `This page covers one question: B1 language evidence in a § 10 naturalisation file, kept apart from civic knowledge and the wider file. Your local nationality authority decides which document and format it accepts; settlement-permit routes and exam-product choice are handled by separate guides.` |
| **正文首段** | 保留现有首段（已含「Use the § 10 StAG result only when…」边界与「settlement permit 是另一个程序」的排除句），仅改 `## Next action` 里的锚文本（见 §6.3） |
| **与另两篇的分工边界** | 对 A：B 不出现在任何「§9/§18c」条文条目，不提 Niederlassungserlaubnis 的条件表。对 C：B 把「文档识别」整体交给 C，只保留「入籍这道程序需要哪些类别」的提问清单。 |
| 事实边界 | `§ 10` 与「language / civic knowledge 分离」均为现有 claim 原文表述，未新增。 |

### 3.C `germany-b1-leben-in-deutschland-and-language-proof`

| 项 | 内容 |
|----|------|
| **新主承接意图** | 「**我手上这份文件属于哪条证据道**」——DTZ / 独立 B1 / Zertifikat Integrationskurs（语言道）vs Leben in Deutschland（知识道）的**文档识别**，跨两条程序通用 |
| **不再承接** | 路线选择、资格判断、入籍程序细节、考试选型 |
| **seoTitle（旧）** | `B1 and Leben in Deutschland explained`（37） |
| **seoTitle（新）** | `Leben in Deutschland vs DTZ: two evidence types`（**47**）——引入全站标题里没有出现过的实体 `DTZ`，从 token 层面与 A/B 彻底分离 |
| **备选** | `Leben in Deutschland vs B1: separate proofs`（43）——若担心 `DTZ` 英文检索量偏低，用此备选；两者字符数均合规 |
| **description（旧）** | `Understand the separate roles of B1 language evidence and Leben in Deutschland without assuming one replaces the other for every route.` |
| **description（新）** | `Sort the document you hold: a language result and a Leben in Deutschland result answer different requirements, and the receiving authority decides what it accepts.`（**163**） |
| **新首段定位句（directAnswer，2 句）** | `This page sorts the documents you hold: a language result — DTZ, an independent B1 certificate or a Zertifikat Integrationskurs — answers a different requirement from a Leben in Deutschland civic-knowledge result. It does not choose your route; ask the receiving authority which categories your procedure needs and which documents it accepts.` |
| **正文首段（新增，2 句，插在 `## Read the actual document before filling either file lane` 之后、表格之前）** | `Start from the document in your hand, not from the route. The table records what each document can answer and what still needs an authority reply.` |
| **与另两篇的分工边界** | 对 A：C 只说「去问定居条文」，不做条文匹配；对 B：C 只说「入籍还要单独问知识道」，不给入籍检查清单。C 是**文档分类器**，A/B 是**程序入口**。 |
| 事实边界 | directAnswer 里列的三种语言文件在 C 表格与 `germany-b1-integration-course-evidence` 中均已存在，仅做归类表述，未新增效力判断。 |

---

## 4. checklist（D）vs timeline（E）差异化

一篇吃「材料清单」，一篇吃「时间线/顺序」，且**都不承诺时长**（E 现有边界：不计算居留期、处理时长、缓冲期）。

| 项 | D `germany-b1-settlement-citizenship-checklist` | E `germany-b1-settlement-citizenship-timeline` |
|----|--------------------------------------------------|------------------------------------------------|
| 承接意图 | 「我要交的材料有哪些、每项状态是什么」= **材料清单 + 提交前核对** | 「先后顺序是什么、每个日期由谁给」= **步骤顺序**（时间线查询） |
| **seoTitle（旧）** | `Germany B1 settlement and citizenship checklist`（47） | `Germany B1 settlement and citizenship timeline`（46） |
| **seoTitle（新）** | `Germany B1 documents checklist: 4 evidence lanes`（**48**） | `Germany B1 timeline: which step comes first`（**43**） |
| **description（旧）** | `Use a non-legal Germany B1 checklist to recheck authority instructions, language evidence and the wider file before submission.` | `Build a Germany B1 evidence timeline from authority- and centre-confirmed dates without calculating eligibility or inventing standard buffers.` |
| **description（新）** | `Recheck four lanes before you submit — route and procedure, language, civic knowledge and the wider file — and mark each item confirmed, not applicable or unresolved.`（**166**） | `Order the steps from the authority instruction to the submission recheck, and record which owner supplies each date. No step duration is stated or implied here.`（**160**） |
| **新首段区分句（directAnswer，2 句）** | `This page is the document lane list for a file you are about to submit: route and procedure, language, civic knowledge and the wider file, each with a status field. Pick the branch your authority named — settlement and citizenship are different procedures — and leave any unresolved item open with that authority.` | `This page orders the steps — route instruction, proof acceptance, product choice, centre booking, submission recheck — and shows which owner supplies each date. It does not state how long any step takes: every date must come from you, the authority or the selected centre.` |
| 正文 | 不动主体；仅在 `## Language and civic-knowledge evidence` 增加 1 条指向 C 的 bullet（§6.3） | **正文完全不动**（`tests/fan-43-germany-b1-recheck.test.js` 逐句 pin 了 timeline 正文的关键句，改正文会连带改测试） |
| 标题 token 分离度 | 改前 D/E 共享前缀 **5 个 token**；改后共享 **2 个 token**（`Germany B1`），第 3 个 token 起分别为 `documents` / `timeline`。 | 同左 |

---

## 5. 301 映射表

### 5.1 映射表（结论：本轮无 301）

| # | old slug | new slug | 类型 | 决策 | 理由（可核验） |
|---|----------|----------|------|------|----------------|
| 1 | `/guides/germany-b1-citizenship-language-proof/` | — | — | **不合并** | 1,590 词；独占 3 条 `germany-b1-citizenship-*` claim 与 `stag/__10.html` 来源；与 A 的正文重叠仅 0.5%；合并后「§10 特殊规则/例外」段无落点 |
| 2 | `/guides/goethe-b1-germany-settlement-work/` | — | — | **不合并** | 1,697 词；独占 §9/§18c(1)/§18c(2) 四行条文匹配表；与 B 重叠 0.5%；B 的 claim 集不含 skilled / Blue Card 分支 |
| 3 | `/guides/germany-b1-leben-in-deutschland-and-language-proof/` | — | — | **不合并** | 1,555 词；`germany-b1-integration-course-evidence` 的唯一消费者，合并将产生孤儿 claim；且 A/B 均无 IntV §17 内容，**无可承接目标** |
| 4 | `/guides/germany-b1-settlement-citizenship-checklist/` | — | — | **不合并** | 1,971 词；其 5 个锚点 `#settlement-checklist` / `#skilled-settlement-checklist` / `#blue-card-checklist` / `#citizenship-checklist` / `#unknown-route-checklist` 实测被 **13 处**引用（`src/data/b1-route-paths.ts` 的 5 条 `checklistHref`（L31/54/77/100/129）+ 3 篇正文 8 处锚链接：settlement 4、citizenship 2、timeline 2），301 会同时打断这 13 处深链 |
| 5 | `/guides/germany-b1-settlement-citizenship-timeline/` | — | — | **不合并** | 1,657 词；是 `goethe-b1-fees-and-booking` 与 `goethe-b1-study-plan` 两页 `nextGuideSlug` 的**唯一目标**，删除会让两页的 next 导航指向 404 并直接打挂 `source-review-render.test.js` 的 next 断言 |
| 6 | 5 个薄页 `goethe-b1-{difficulty-analysis,listening-deep-dive,mock-exam-routine,speaking-topics,writing-assessment}` | 各自支柱（如 `/guides/goethe-b1-study-plan/`） | 真 301 候选 | **不合并（本轮）** | 它们已在 `guideRedirectCandidates` 且 `disposition=retained`、`index:false`，本就不参与排名，不构成蚕食。真做 301 需改 `public/_redirects`（其 sha256 被 `tests/m3-migration-map.test.mjs` 冻结为 `ba08ae41…`）+ 更新 `docs/VISALANG_M3_T23_MIGRATION_CANDIDATE_ROLLBACK_MAP_2026-09-11.md` + `deploy/retained-routes.json` + `guideRedirects`（当前**故意为空**，`tests/retained-routes.test.mjs` 依赖其为空）→ 必须单独立项 |

### 5.2 若主理人坚持要一条 301：唯一可讨论的映射（不建议执行）

| old slug | new slug | 触发条件 | 必须同时改动的文件（否则测试红） |
|----------|----------|----------|----------------------------------|
| `/guides/germany-b1-settlement-citizenship-timeline/` | `/guides/germany-b1-settlement-citizenship-checklist/` | 仅当 E 与 D 被判定为同一意图 | `src/content/guides/germany-b1-settlement-citizenship-timeline.md`（删）、`…-checklist.md`（并入 1,657 词 → 将超 2,400 词上限，必删内容）、`goethe-b1-fees-and-booking.md`+`goethe-b1-study-plan.md`（改 `nextGuideSlug`）、`timeline` 的 6 处入链、`public/_redirects`（frozen hash）、`src/data/publication-manifest.ts`（`englishPillarSlugs` 15→14，frozen hash）、`docs/VISALANG_SCHEME_3_B1_CLAIM_SOURCE_LEDGER_2026-09-01.md`、`tests/{germany-b1-cluster,content-integrity,source-review-render,fan-270-seo,fan-43-germany-b1-recheck,m4-b1-routes,scheme-3-english-content-quality}.{js,mjs}` 共 7 个测试 |

结论：合并成本 = 2 个冻结哈希 + 7 个测试 + 1 份迁移地图，收益 = 消除 0.7% 的正文重叠。**不划算，且 D/E 的意图（清单 vs 顺序）本身不同。**

---

## 6. 内链影响清单（逐文件、逐字段）

> **术语校正（2026-10-27 修订，v2）**：`routeGuideOrder` **确实存在于本仓库，但只在 A1 hub**：
> `src/pages/germany-family-reunion-a1.astro:15` —— `const routeGuideOrder = englishPillarSlugs.filter((slug) => guideBySlug.get(slug)?.data.category === 'germany-a1');`，
> 也就是说 A1 的支柱顺序是**由 `englishPillarSlugs` 自动派生**的。
> **B1 hub 没有 `routeGuideOrder`**（`src/pages/germany-b1-settlement-citizenship.astro` 里该字符串零出现，实测见下方探针），它用的是**手写** `corePages` 数组。所以任务里说的三处等价物在本簇的实际对应是：
> ① B1 hub 的手写 `corePages` 数组（`src/pages/germany-b1-settlement-citizenship.astro:19-28`，同时作为 `CollectionPage.hasPart` 的 JSON-LD 名称源）——**本次唯一要改的"顺序/名单"位置**；
> ② `src/data/b1-route-paths.ts` 的 `guideHref` / `checklistHref`；
> ③ `src/data/publication-manifest.ts` 的 `englishPillarSlugs`（15 条，B1 占 8 条；不改）。
> `RelatedGuides` 不是独立配置，而是由每篇 frontmatter 的 `supportingGuideSlugs` 在 `src/pages/guides/[slug].astro:21-32` 运行时生成（过滤条件：目标页必须 `index:true`）。
>
> 探针（node，绕开本机 toybox grep，见 §10）：
> ```
> $ node -e '…遍历 src/tests/scripts/public 查 "routeGuideOrder"…'
> files containing "routeGuideOrder": 1 src/pages/germany-family-reunion-a1.astro
> $ node -e '…统计 germany-b1-settlement-citizenship-checklist/# 引用…'
> { "…citizenship-language-proof.md": 2, "…timeline.md": 2, "…settlement-work.md": 4, "b1-route-paths.ts": 5 }
> total anchored refs = 13 across 4 files
> $ node -e '…解析 englishPillarSlugs…'
> total pillars = 15 | germany-b1 subset = 8
> ```

### 6.1 需要改动的文件与字段（推荐路径 = 6 个文件）

| # | 文件 | 行 | 字段 | 现状 | 动作 |
|---|------|----|------|------|------|
| 1 | `src/content/guides/goethe-b1-germany-settlement-work.md` | 3 | `seoTitle` | `Germany settlement permit B1 proof` | 改为 §3.A 新值 |
| 2 | 同上 | 4 | `description` | 见 §3.A | 改为 §3.A 新值 |
| 3 | 同上 | 5 | `directAnswer` | 见 §3.A | 改为 §3.A 新值 |
| 4 | 同上 | 21 | `primaryIntent` | `Verify the statutory settlement route and accepted language proof before comparing B1 exams` | 改为 `Match the settlement-permit provision (§ 9, § 18c(1), § 18c(2)) before any exam-product question`（仅元数据，无渲染/无测试依赖） |
| 5 | 同上 | 52-54 | 正文首段 | `The word “work” in this page's existing address…` 3 句 | 替换为 §3.A 的 2 句 |
| 6 | 同上 | 103 之后（`## What to save before comparing exams` 末句 `Do not transfer an answer from citizenship, work, study or another residence route into this file.` 之后） | 正文（新增内链） | 无 | 追加 1 句：`Civic-knowledge evidence is a separate lane; use the [Leben in Deutschland and DTZ evidence lanes](/guides/germany-b1-leben-in-deutschland-and-language-proof/) to tell the two documents apart.` |
| 7 | `src/content/guides/germany-b1-citizenship-language-proof.md` | 3 / 4 / 5 / 21 | `seoTitle` / `description` / `directAnswer` / `primaryIntent` | 见 §3.B | 改（`primaryIntent` → `Keep § 10 language evidence distinct from civic knowledge and the wider naturalisation file`） |
| 8 | 同上 | 141 | 正文锚文本 | `[Leben in Deutschland and language proof guide]` | 改为 `[Leben in Deutschland and DTZ document lanes]`（URL 不变） |
| 9 | `src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md` | 3 / 4 / 5 / 33 | `seoTitle` / `description` / `directAnswer` / `primaryIntent` | 见 §3.C | 改（`primaryIntent` → `Identify which evidence lane the document in hand belongs to`） |
| 10 | 同上 | 50 之后 | 正文（新增首段） | 紧跟 H2 即表格 | 插入 §3.C 的 2 句 |
| 11 | 同上 | 150 | 正文锚文本 | `[citizenship language-proof guide]` | 改为 `[§ 10 citizenship language-evidence guide]`（URL 不变） |
| 12 | `src/content/guides/germany-b1-settlement-citizenship-checklist.md` | 3 / 4 / 5 / 39 | `seoTitle` / `description` / `directAnswer` / `primaryIntent` | 见 §4 | 改（`primaryIntent` → `Recheck four evidence lanes and mark each item's status before submission`） |
| 13 | 同上 | 138 之后 | 正文（新增内链 bullet） | 无 | 追加：`- File the document you hold in the right lane with the [Leben in Deutschland and DTZ lanes](/guides/germany-b1-leben-in-deutschland-and-language-proof/) before asking the authority to confirm it.` |
| 14 | `src/content/guides/germany-b1-settlement-citizenship-timeline.md` | 3 / 4 / 5 / 39 | `seoTitle` / `description` / `directAnswer` / `primaryIntent` | 见 §4 | 改（`primaryIntent` → `Order the steps and record which owner supplies each date`）；**正文不动** |
| 15 | `src/pages/germany-b1-settlement-citizenship.astro` | 19-28 | `corePages[].name`（5 条） | `Settlement permit and B1` / `Citizenship language proof` / `Language and civic knowledge` / `Evidence timeline` / `Submission checklist` | 改为：`Settlement permit B1: which provision` / `Citizenship B1: § 10 language proof` / `Leben in Deutschland vs DTZ: two evidence lanes` / `Timeline: which step comes first` / `Documents checklist: four evidence lanes`（`url` 全部不变） |

### 6.2 明确**不改**的字段（列出以证明已核对）

| 文件 | 字段 | 为什么不改 |
|------|------|-----------|
| `src/data/publication-manifest.ts` | `englishPillarSlugs`（8 条 B1 全保留，总 15 条） | 无合并；`fan-270-seo.test.js` 断言 `pillarTitleRecords.length === 15`；本文件 sha256 被 `m3-migration-map.test.mjs` 冻结 |
| 同上 | `guideRedirects`（`{}`） / `guideRedirectCandidates` | `retained-routes.test.mjs` 依赖 `guideRedirects` 为空 |
| `public/_redirects` | 全文 | 无 301；sha256 冻结为 `ba08ae41…` |
| `src/data/b1-route-paths.ts` | `guideHref`（L32/55/78 → A；L101 → B）、`checklistHref`（L31/54/77/100）、`unknownRoute.guideHref`（L130） | 目标 slug 未变、锚点未变；重定位不改变「条文→页面/清单分支」的映射关系 |
| `src/data/b1-route-claims.ts` / `claim-registry.ts` | `usedBy` 数组、claim 文本、version | 未发生「某页不再使用某 claim」的情况，`validateClaimSet` 全绿 |
| `src/data/guide-taxonomy.ts` | `guidePurposeOverrides`（L63-70） | C 仍同时服务 settlement + citizenship（文档分类器本就跨程序）；改它会削弱 C 的用途标签 |
| 4 篇的 `supportingGuideSlugs` | L47 / L35 / L47 / L52 / L53 | 见 §6.4：`content-integrity.test.js:66-113` 用 `deepEqual` 钉死这 5 个数组，改一条就要改测试；收益（RelatedGuides 多一张卡）低于成本。新增内链改走**正文上下文链接**，SEO 价值更高且零测试改动 |
| 5 篇的 `nextGuideSlug` | A/B/C → `goethe-b1-vs-telc-b1`；E → D；D → 空 | 与重定位后的旅程一致（三个程序入口都交给考试选型；顺序页交给清单）；`content-integrity.test.js:112` 亦钉死 |
| 5 篇的 `title` / `eyebrow` / `route` / `claimRefs` / `primaryOfficialAuthorityUrl` / `examOwnerUrl` / `readingTime` | 见 §8 | H1 已天然区分；改 `readingTime` 无必要（实测 5 篇词数变动后 `ceil` 全部不变，见 §6.5） |

### 6.3 内链拓扑变化（改前 → 改后）

```
改前（三角 + 缺口）                        改后（放射 + 单向交接）
B ⇄ C                                       B ──→ C   （文档分类交给 C）
  ↘   ↙                                      C ──→ A, B（程序入口交回）
    D ← E                                    A ──→ C   （【本次新增】知识道）
A ──→ D(4 分支锚) ──→ E ──→ D                 D ──→ A, B, C（【本次新增】文档道）
A ──→ ✗ C（缺口）                             E ──→ D（锚点）, A, B
```

新增 3 条内链、改 2 条锚文本、**零条删除**。三条新增均指向 `englishPillarSlugs` 内的支柱（满足 `germany-b1-cluster.test.js:63-67`「正文只允许链到 8 个保留支柱」）。

### 6.4 用户旅程链接地图（改后）

```
入口：/germany-b1-settlement-citizenship/（hub，corePages 5 卡）
  ├─ 我是定居许可 → A（条文匹配）→ D#settlement-checklist / #skilled / #blue-card / #unknown
  ├─ 我是入籍     → B（§10 语言证据）→ D#citizenship-checklist
  ├─ 我手上已有证书 → C（文档识别）→ A 或 B（回到对应程序）
  ├─ 我要排顺序   → E（步骤顺序）→ D（提交核对）
  └─ 我要选考试   → goethe-b1-vs-telc-b1 → fees-and-booking → study-plan
```

### 6.5 词数 / readingTime 影响（实测，用于验收）

| 页面 | 词数 改前 → 改后 | `ceil(w/200)` | 是否需改 `readingTime` |
|------|------------------|---------------|------------------------|
| A | 1,697 → 1,720 | 9 → 9 | **否** |
| B | 1,590 → 1,596 | 8 → 8 | **否** |
| C | 1,555 → 1,581 | 8 → 8 | **否** |
| D | 1,971 → 1,997 | 10 → 10 | **否** |
| E | 1,657 → 1,657（正文未动） | 9 → 9 | **否** |

全部仍在 1,200–2,400 区间；`### Scenario:` ≥2、`### Original asset:` ≥3、`four-owner map` 等断言均不受影响。

---

## 7. 执行顺序（含治理门禁）

`src/` 与 `public/` 均在 `docs/planning-map/sync.json` 的 `watchRoots` 内，任何编辑会让 `watchedScopeDigest` 失效，`tests/planning-map-governance.test.mjs` 必然转红。因此**不能**先改内容再补治理：

1. **批准**：主理人确认 §0/§3/§4 文案与 §5「零 301」结论。
2. **编辑**：按 §6.1 只改 6 个文件（5 个 md + 1 个 astro）。**不要**改 §6.2 列出的任何字段。
3. **构建**：`npm run build`（`prebuild` 会清 `.astro`/`dist`；`postbuild` 会用 `updatedDate` 回填 sitemap `lastmod`）。
   ⚠️ **当前 `dist/` 是不完整的**（无 `guides/`、无 `sitemap-0.xml`，实测见 §10.3）。跳过这一步直接跑测试会得到 `ENOENT`，很容易被误判成「改动把内容搞坏了」。
4. **定向测试**（按 §8.2 选定日期策略后；其中 `fan-270` / `source-review-render` / `scheme-3-release-candidate` 都读 `dist/`，**必须先完成第 3 步**）：
   ```
   node tests/germany-b1-cluster.test.js
   node tests/fan-270-seo.test.js
   node tests/fan-43-germany-b1-recheck.test.js
   node --test tests/m4-b1-routes.test.mjs
   node --test tests/scheme-3-english-content-quality.test.mjs
   node tests/content-integrity.test.js
   node tests/source-review-render.test.js   # 会自行 rebuild，最慢，放最后
   ```
5. **planning-map 同步窗**：更新 `docs/planning-map/{sync.json,history.json,*.archify.json,*.html}` + 独立审计记录 + `docs/TASK_LOG.md` 条目，然后跑
   ```
   node --test tests/planning-map-governance.test.mjs
   ```
6. **人工核验**（3 条，必须人看）：
   - `dist/guides/<5 slugs>/index.html` 的 `<title>` 与 `<meta name="description">` 是否为新值；
   - 三个页面 `<h1>` 是否**未变**（防止误改 `title`）；
   - `dist/germany-b1-settlement-citizenship/index.html` 的 `CollectionPage.hasPart` 名称是否已更新。

---

## 8. 风险与来源支持边界复核项

### 8.1 claimRefs / 权威来源（逐页核对结果）

| 页面 | `primaryOfficialAuthorityUrl` | 覆盖 claim 集 | 重定位后是否仍成立 | 复核项 |
|------|------------------------------|---------------|--------------------|--------|
| B | `stag/__10.html` | 仅 citizenship ×3（同一来源） | ✅ 成立（1:1 对应） | 无 |
| A | `aufenthg_2004/__9.html` | settlement-general/skilled/blue-card ×9（来源含 `__18c.html`、`__2.html`） | ⚠️ **部分**：primary 只覆盖 §9；§18c(1)/(2) 的支撑在 claim 的 `sourceRefs` 与正文表格内的行内链接（L71） | **R1（不改，需 source-review 会签一句）**：重定位把「which provision」提到标题层，读者更可能追问 §18c。保持 `primaryOfficialAuthorityUrl` 不变，但确认正文 §18c 行内链接未被删（它是该页对 §18c 的唯一出站入口） |
| C | `einbuergerung.de/ablauf.php?l=en` | 同时含 settlement ×6 + citizenship ×2 + integration-course ×1 | ⚠️ primary 是**入籍流程门户**，与新定位（DTZ/LiD 文档识别）不匹配，且正是把 C 拖进入籍意图族的原因 | **R2（默认不改，建议评估）**：候选改为 `https://www.gesetze-im-internet.de/intv/__17.html`（`germany-b1-integration-course-evidence` 的实际来源）。若改，须：① source-review 角色重新会签；② 在 `docs/VISALANG_M4_T24_SOURCE_LEDGER_2026-09-13.md`（或 intv §17 行所在的那份 T24/T25/T26 台账）补一行；③ `finalDecisionAuthorityType` 不变；④ 渲染面只影响「Open the official authority source」与 source fact table（无测试钉 URL）。**批准前不要动** |
| D | `einbuergerung.de/ablauf.php?l=en` | 12 条（A+B 全集） | ⚠️ 与 A 同样的「单 URL vs 多法条」不对称 | **R3（不改）**：清单页的 primary 本就是一个「流程向」门户，且正文 4 个分支各自带法条链接（L126）。记录不对称即可 |
| E | `bamf-navi.bamf.de/…typ=ABH` | 12 条 | ✅ 成立：这是**定位器**不是规则源，页面已明确「finder 只定位机关」 | **R4（不改）**：重定位强调「顺序」，需保持正文「Source boundaries」段里「a finder locates an authority, it cannot own a date」的边界句不被删 |

**通用红线（4 条，任何编辑都不得触碰）**

1. 不删任何 `claimRefs` 条目：`GuideLayout` 的 `directAnswer` 只在 `validateClaimSet` 通过时渲染，删 claim 会让首段退化为通用免责句（等于本方案失效）。
2. 不新增 `claimId`，不改 `version`（会触发 `claim-registry.test.mjs` 与 `m4-b1-routes.test.mjs` 的 asOf 校验）。
3. 新增文案不得出现金额、日期、处理时长、通过率、资格结论——本方案所有新句均是**边界句**与**归类句**。
4. 不把 `examOwnerUrl` 讲成受理结论（A 的 `examOwnerUrl` 是 Goethe B1 产品页，B 是 BAMF 结业考试页，C 是 BAMF 结业考试页——三者本就不同，保持）。

### 8.2 `updatedDate` 两套策略（二选一，务必明确）

**策略 A：日期冻结（0 测试改动，保守）**
5 篇 `updatedDate` 保持 `2026-09-13`，在 `docs/TASK_LOG.md` 记一条：`2026-10-27 copy-only re-scoping; claim set and sources unchanged, so updatedDate/sourceReviewedAt remain 2026-09-13`。
代价：`scripts/enrich-sitemap-lastmod.js` 从 `updatedDate` 取 `lastmod`，sitemap 时间戳不变 → 重抓信号弱。**适用于只做文案微调。**

**策略 B：刷新 updatedDate（推荐，需改 4 个测试）**
5 篇 `updatedDate` → `2026-10-27`；`sourceReviewedAt` **保持 `2026-09-13`**（来源未重核，这是诚实表达）。sitemap `lastmod` 自动刷新。必须同步改：

| 文件 | 行 | 改法 |
|------|----|------|
| `tests/germany-b1-cluster.test.js` | 44 | 将 `assert.equal(field(source,'updatedDate'),'2026-09-13', …)` 前加映射：`const reScoped = new Map([['goethe-b1-germany-settlement-work.md','2026-10-27'],['germany-b1-citizenship-language-proof.md','2026-10-27'],['germany-b1-leben-in-deutschland-and-language-proof.md','2026-10-27'],['germany-b1-settlement-citizenship-checklist.md','2026-10-27'],['germany-b1-settlement-citizenship-timeline.md','2026-10-27']]);` 并改为 `assert.equal(field(source,'updatedDate'), reScoped.get(file) ?? '2026-09-13', …)`。**第 46 行 `sourceReviewedAt` 断言保持 `2026-09-13` 不动** |
| `tests/m4-b1-routes.test.mjs` | 63 | 该循环正好遍历这 5 个 slug → 直接改为 `/^updatedDate: "2026-10-27"$/m`；第 64 行 `sourceReviewedAt` 保持 |
| `tests/fan-43-germany-b1-recheck.test.js` | 12 | timeline 单页 → `/^updatedDate: "2026-10-27"$/m`；第 13 行 `sourceReviewedAt` 保持 |
| `tests/scheme-3-english-content-quality.test.mjs` | 32-39 | 现 `expectedReviewDate` 同时喂 `updatedDate` 与 `sourceReviewedAt`，**必须拆成两个变量**：`const expectedUpdatedDate = !a1Slugs.has(slug) ? '2026-10-27' : expectedReviewDate;` 然后 `updatedDate` 用 `expectedUpdatedDate`、`sourceReviewedAt` 仍用 `expectedReviewDate` |

> 若采用策略 B，§6.1 的改动面从 6 个文件变为 10 个文件；**没有第三种半改法**（只改部分页会让 `germany-b1-cluster.test.js:44` 的整表断言失效）。

### 8.3 其他已知副作用

- `inferGuideMeta`（`src/data/guide-taxonomy.ts:120-153`）会用 `slug + title + description + eyebrow` 的 haystack 匹配 `examMatchers` 与 CEFR 级别。新文案里**没有**出现 `Goethe` / `telc` / `IELTS` 等品牌词，也没有新的级别词 → 页面顶部 exam/level 徽标不变。（`DTZ` 不在匹配表内，安全。）
- A 的正文首段替换删掉了「The word “work” in this page's existing address…」——这段是对 slug 的自我辩解，删掉不损失信息，但**不要**顺手改 slug（改 slug = 301 = 触碰冻结哈希，见 §5.2）。
- `description` 会进入 `Article.description`（JSON-LD）与 `<meta name="description">`，长度必须留在 70–170（`content-integrity.test.js:156`）；本方案 5 条新值实测 160 / 164 / 163 / 166 / 160。
- `directAnswer` 变更不影响 `validateClaimSet`（只校验 claimId+version），但会让「Direct answer」盒子文案变化；请确认与 `claimText` 不冲突（已逐条比对，见 §3 事实边界行）。

---

## 9. 回滚

- 纯文案改动，回滚 = `git revert` 单个提交；`dist/` 由 `npm run build` 重建。
- 无 slug 变更、无 301、无 `_redirects`/`publication-manifest` 变更 → **不需要**回滚迁移地图或保留路由清单。
- 若采用策略 B，回滚时 4 个测试的日期期望要一起回滚（否则测试红）。

---

## 10. 核查方法与探针证据（可复现）

### 10.1 本机 shell 的 grep 不可信，本方案所有计数改用 node

本机 `grep` 为 toybox 0.8.13，实测四类问题（前两类**静默**：不报错、直接返回空 + exit 1）：

| # | 行为 | 后果 |
|---|------|------|
| 1 | BRE 默认不支持 `\|` 交替 | 多模式查询静默返回空 |
| 2 | ERE 的 `\b` 不是「被忽略」，而是被改写成**字面量 `b`**，`\bnot\b` 等价于 `bnotb` | 既**漏计**（`not here` 不命中）又**假命中**（任何含 `…bnotb…` 的串命中）→ 两个方向都会让人改错本来正确的内容 |
| 3 | `grep -c` 数的是**行**，不是次数 | 同一行两个 `not` 只算 1；凡计次数必须 `grep -oE … \| wc -l` |
| 4 | 本机有 `rg` 15.2.0，`\b` 与交替均正常 | 应**默认用 rg 或 node**；必须用 shell grep 时写 `-E` + `[[:<:]]word[[:>:]]` |

本次编制期间**两次踩到，均当场改道**：
- `grep -rn "slugA\|slugB\|…" src/ tests/ scripts/` → 空 + exit 1；同一模式用 rg → 10 个文件。
- 想用 `grep -A 12 "not ok\|Error\|assert"` 过滤测试输出 → 空。这正是第 1 类（在「修 grep 陷阱」的命令里又踩了一次）。

**并因此纠正了 v1 的一处错误结论**：v1 写「仓库不存在 `routeGuideOrder` 字段」是**错的**——node 探针显示它存在于 A1 hub（见 §10.2 第 1 行）。§6 已按 v2 修订。留痕原因：这是「反向错误」的典型样本。

**两条硬规则（本节所有探针均已遵守）**
- **(a) 零命中必须带阳性对照**：脚本内含至少一个已知会命中的目标，对照未命中则非零退出；贴输出时对照行一起贴。
- **(b) 报零命中必须写清模式面**：例如「`## Source boundaries` 用 `String.includes` 全文子串匹配，覆盖任何大小写/位置，但不覆盖被改写为同义表述的段落」——命令对、输出对，结论仍可能错，错在「我以为我搜全了」。

### 10.2 逐条证据（claim → command → output）

| # | 方案中的断言 | 探针 | 输出 |
|---|--------------|------|------|
| 1 | `routeGuideOrder` 只在 A1 hub | 遍历 `src/tests/scripts/public` 查子串 | `files containing "routeGuideOrder": 1 src/pages/germany-family-reunion-a1.astro`；根目录 `*.md`: 0 |
| 2 | checklist 锚点被 13 处引用 | 统计 `germany-b1-settlement-citizenship-checklist/#` | `{citizenship-language-proof.md:2, timeline.md:2, settlement-work.md:4, b1-route-paths.ts:5}` → `total = 13 across 4 files` |
| 3 | `englishPillarSlugs` 15 条 / B1 占 8 | 解析 manifest 数组（注意该文件用**单引号**） | `total pillars = 15 | germany-b1 subset = 8` |
| 4 | 5 篇正文 1,555–1,971 词、`readingTime == ceil(w/200)` | 复刻 cluster 测试口径 | `1697/9, 1590/8, 1555/8, 1971/10, 1657/9`（全部相符） |
| 5 | 5 篇薄页 340–351 词 | 同口径 | `345, 351, 344, 340, 347` |
| 6 | 改动后词数与 `ceil` 不变 | 对 6 处替换做 dry-run 后重算 | `1697→1720(9), 1590→1596(8), 1555→1581(8), 1971→1997(10), 1657→1657(9)` |
| 7 | 6-gram 重叠 0.4%–0.9% | Python 分词 + shingle Jaccard | `A×B 0.5% / A×C 0.4% / B×C 0.9% / D×E 0.7%` |
| 8 | 5 条新 seoTitle ≤49、description ∈[70,170] | `node -e` 逐条 `length` | `45/42/47/48/43`；`162/164/163/166/160` |
| 9 | 2 个冻结 sha256 | 直接读 `tests/m3-migration-map.test.mjs:14-17` | `public/_redirects: ba08ae41…`；`publication-manifest.ts: af30714b…` |
| 10 | `supportingGuideSlugs` 被 deepEqual 钉死 | 直接读 `tests/content-integrity.test.js:66-113` | `germanyB1CoreRoute` 8 条映射，第 113 行 `assert.deepEqual` |

### 10.3 一条执行前置警告：当前 `dist/` 不完整

```
$ node -e '…检查 dist/sitemap-0.xml 与 dist/guides/…'
exists: false            # dist/sitemap-0.xml 不存在
sitemap files in dist: (none)
dist/guides/goethe-b1-germany-settlement-work: false
```

即：**当前 `dist/` 里没有 `guides/` 产物、没有 sitemap**（只有部分页面目录）。因此：

- 一切读 `dist/` 的测试（`fan-270-seo.test.js` 读 `dist/guides/goethe-a1-test-centers/index.html`、`source-review-render.test.js` 读 `dist/sitemap-0.xml`、`scheme-3-release-candidate.test.mjs`）**必须先 `npm run build`**，否则报 `ENOENT`，极易被误读成「内容改坏了」。
- 本方案**不对 sitemap 成员关系做任何断言**：这 5 个 URL 是否在 sitemap 中，由构建期的 publication policy 派生（`source-review-render.test.js:326-343` 构建后断言每个 B1 支柱 canonical 恰好出现 1 次）。既然本轮不改 slug、不改 `englishPillarSlugs`，成员关系不变；`lastmod` 只随 `updatedDate` 变（`scripts/enrich-sitemap-lastmod.js` 实测从 frontmatter 读取）。

---

## 11. 执行后核验矩阵（2026-10-27 工作区实测）

本节取代 §6.1 的 `old_string` diff（执行时正文已变，diff 不再适用）。**所有数字都来自 `/tmp/vl-verify11.mjs` 一次运行，不是估算。**

### 11.0 取证方式（先声明方法，再看结论）

| 项 | 做法 | 依据 |
|----|------|------|
| 单遍读取 | 9 个文件，每文件 `readFileSync` **只调 1 次**并缓存进 `Map`，后续全部读缓存 | 第三条陷阱「一个文件只读一次」 |
| 终止哨兵 | 末尾打印 `[done] processed 9/9 files`；`cache.size !== 9` 或 `fail > 0` 则 `process.exit(1)` | 第三条陷阱「没有哨兵的遍历输出一律当作可能被截断」 |
| 零命中 | 每条「不存在」都配阳性对照（见 11.3 / 11.5） | 规则 a |
| 规模 | 三个快照，数字不同——**这不是矛盾，是仓库在被并发写**：S1 = 104 项 / 101 PASS / 3 FAIL（A/B/D 各 3 句）；S2（几分钟后重跑）= 104 项 / 103 PASS / 1 FAIL（只剩 D）；S3（带并发自检，见 11.8）= 句数 5/5 合规、结构面全绿。**引用本节任何结论都必须带快照编号** | 见 11.2 – 11.9 |

### 11.1 五篇落地核对表

| 篇 | seoTitle（字符数） | desc | 词数 | `readingTime` | `ceil(w/200)` | `claimRefs` | `updatedDate` | `sourceReviewedAt` |
|----|------------------|------|------|--------------|---------------|-------------|---------------|--------------------|
| A `goethe-b1-germany-settlement-work` | `Germany settlement permit B1: which provision`（**45**） | 162 | 1,549 | 8 | 8 ✅ | 9 | 2026-10-27 | 2026-09-13 |
| B `germany-b1-citizenship-language-proof` | `German citizenship B1: § 10 language proof`（**42**） | 164 | 1,418 | 8 | 8 ✅ | 3 | 2026-10-27 | 2026-09-13 |
| C `germany-b1-leben-in-deutschland-and-language-proof` | `Leben in Deutschland vs DTZ: two evidence types`（**47**） | 163 | 1,372 | 7 | 7 ✅ | 9 | 2026-10-27 | 2026-09-13 |
| D `germany-b1-settlement-citizenship-checklist` | `Germany B1 documents checklist: 4 evidence lanes`（**48**） | 166 | 1,742 | 9 | 9 ✅ | 12 | 2026-10-27 | 2026-09-13 |
| E `germany-b1-settlement-citizenship-timeline` | `Germany B1 timeline: which step comes first`（**43**） | 160 | 1,498 | 8 | 8 ✅ | 12 | 2026-10-27 | 2026-09-13 |

五篇全部通过：seoTitle ≤49、description ∈[70,170]、词数 ∈[1200,2400]、`readingTime == ceil(words/200)`、无 pre-heading 内容、5 段契约（Who / Key / Mistakes / Next / Official sources）各出现 1 次、`### Scenario:` ≥2、`### Original asset:` ≥3。`updatedDate=2026-10-27` 且 `sourceReviewedAt=2026-09-13` 即 §8.2 **策略 B**（正文/标题重写但来源未重核）已按预期落地。

### 11.2 四条内链/锚改写 + hub

| 项 | 结果 | 证据 |
|----|------|------|
| A → C 新内链 | HIT | A 正文含 `](/guides/germany-b1-leben-in-deutschland-and-language-proof/)` |
| D → C 新内链 | HIT | D 正文含同一 href |
| B 锚文本 | HIT | `Leben in Deutschland and DTZ document lanes` |
| C 锚文本 | HIT | `§ 10 citizenship language-evidence guide` |
| 阴性对照 | MISS | 注入 `ZZZ-NOT-PRESENT-9f3a` → 探针返回 MISS（证明 `includes` 能区分） |
| B1 hub `corePages` | 8 条，5 条新文案全 HIT | 含 `Settlement permit B1: which provision` / `Citizenship B1: § 10 language proof` / `Leben in Deutschland vs DTZ: two evidence lanes` / `Timeline: which step comes first` / `Documents checklist: four evidence lanes` |
| B1 hub 无 `routeGuideOrder` | 确认 | `HIT=false` |
| **阳性对照**：A1 hub 有 `routeGuideOrder` | 确认 | `HIT=true`（`germany-family-reunion-a1.astro:15`）——这才让上一行的「没有」有意义 |
| `b1-route-paths.ts` 的 5 个 checklist 锚点 | 全部 HIT | `settlement-checklist` / `skilled-settlement-checklist` / `blue-card-checklist` / `citizenship-checklist` / `unknown-route-checklist` 均在 D 页有对应 `id="…"` |

`publication-manifest.ts`：`englishPillarSlugs` 15 条（单引号；双引号 0 条，阳性对照）、B1 占 8 条、`guideRedirects` 仍为空对象、`guideRedirectCandidates` **14 条**（其中 B1 5 条，全是 `goethe-b1-*`）、`retained` 不是每条存的字段而是由键派生（`retainedGuidePaths = Object.keys(guideRedirectCandidates)`，L92）+ `closedPolicy('retained')`（L120）。

### 11.3 `directAnswer`：句数已 5/5 合规；「词数预算」这一栏已作废（**并更正一处我自己的错误归因**）

**先更正归因。** 本节 v4 初稿写过「偏差来源是我自己的方案内部打架，执行方把边界写成了第 3 句」。**这句是错的，已撤回**，由 link-strategist-3 当场纠正、我逐字核对后确认：

- 方案 §3.A/§3.B/§4.D 的原始 directAnswer 本身都是 **2 句**，分工边界是塞在 S2 里的**分号从句**，从来没有第 3 句。他的落地版本是逐字复制，5 篇全部 2 句。
- 现在的文本是被**整体替换**的，不是「从那版删/加一句」：他那版的交界标记（`This page covers one question` / `This page sorts the documents` / `This page is the document lane list` / `This page orders the steps`）现在全仓零命中，阳性对照 `^directAnswer:` 仍有 11 个文件命中。
- 替换者是 `content-editor`，依据是 **P0-1（S1 ≤25 / S2 ≤20）与 P0-3（消除 5 连 `This page …` 模板）**。他换手时明确把编辑权交给了 content-editor，自己只做复核。

正确表述：**不是「方案内部矛盾」，而是「方案 §3/§4 的 2 句版被执行 P0-1/P0-3 的整体替换覆盖，替换过程中一度反弹成 3 句、随后又被改回 2 句」**。

**但「词数预算」这一栏已作废，不要再拿来判定任何东西。** 主理人已裁定「**≤25/≤20 我不采纳**」：该口径在 `docs/` + `drafts/` 全仓零命中，只存在于派 task #3 的任务指令正文里；唯一有书面出处的口径是 `docs/SITE_BUILD_ROADMAP_AND_PROMPTS_2026-10-25.md:93`「英文 **2–4 句**」，在效规则是**方案 §3/§4 的「2 句」**。所以下表保留词数**只作观测值**：

| 篇 | 句数 | S1（gate 口径 / `§` 计入） | S2（同左） | 在效判定（2 句） |
|----|------|--------------------------|-----------|----------------|
| A | 2 | 32 / **35** | 20 / 21 | ✅ |
| B | 2 | 22 / **23** | 18 / 18 | ✅ |
| C | 2 | 36 / 36 | 14 / 14 | ✅ |
| D | 2 | 24 / 24 | 27 / 27 | ✅ |
| E | 2 | 31 / 31 | 19 / 19 | ✅ |

- **gate 口径** = `scheme-3` 的 tokenizer（`§` 不计为词）；**右值** = 把 `§` 计 1 个 token。C/D/E 两列相同，因为这三篇一个 `§` 都没有；A 差 3/1、B 差 1/0，正好等于各自 `§` 的个数（A 的 4 个 `§` 是 `§ 9`、`§ 18c(1)`、`§ 18c(2)`、`§ 10`，S1 占 3、S2 占 1）。**这是我和 link-strategist-3 数字不一致的全部原因，不是文本又变了两次。**
- 句数：**5/5 合规**（我 v4 初稿报的「3 处 FAIL」已被后续重写消除——同脚本现在只剩 D 一项红，几分钟后连 D 也变绿）。
- **没有任何词数门槛在生效**，所以「逐句删除清单」这件事**整个不需要做**——不是「等裁定再做」，是「没有可依据的删除标准」。
- 教训：**同一批文本，三种口径三个答案**（gate 32/20；`§` 计入 35/21；纯空白切分还会把破折号 `—` 算成词）。跨人报数前必须先对齐 tokenizer，否则会去改一个本来就正确的字段。

**两处内容风险：current 版本已自行消除**（link-strategist-3 提出，我复核确认）：

| 风险 | 他的判断（基于旧文本） | 当前文本 | 判定 |
|------|---------------------|---------|------|
| A 页把 `§ 18c(2)` 的 A1/B1 分支抹平 | 旧句 `B1 is the language level that § 9, § 18c(1) and § 18c(2) reference…` 会让 Blue Card 读者以为只需 B1 | 现句 `Which settlement provision your file names — § 9, § 18c(1) or § 18c(2) — decides the language evidence, because the Blue Card route splits simple German (A1) from sufficient German (B1) by qualifying period.` | **已修**：分支被写进首句，且与正文表格第 3 行表述一致 |
| B 页 `is a requirement of its own` 变成资格断言 | 旧句读起来像「入籍必须具备 B1 语言证据」 | 现句 `B1 language evidence sits in its own lane, assessed separately from civic knowledge and the wider file.` | **已修**：改回描述式「lane」表述，不再是 requirement 断言 |

即：他列的两条风险在**他测的那版**成立，在**当前版**已不存在。这说明这类风险的存活期只有几分钟——**任何「已核查」结论都必须带快照时间与并发自检**（见 §11.8）。

### 11.4 五类环境陷阱 vs 本节自查（含我自己的 4 次踩坑）

| 陷阱 | 现象 | 本节如何防 |
|------|------|------------|
| BRE `\|` 交替 | 静默返回空 + exit 1 | 不用 shell grep，一律 `rg` |
| ERE `\b` → 字面量 `b` | 既漏计也假命中 | 不用 `\b`，改用 `includes` / `matchAll` |
| `grep -c` 数行不数次数 | 一行多条只算 1 | 用 `matchAll(...).length` |
| **broker 静默截断** | 遍历输出被截断、无报错 | 单遍读取 + 终止哨兵 `n/expected` |
| **新增（本轮实测）**：`cd <repo>` 偶发 `operation not permitted`，而 `&&` 链会让**前一段命令整段不执行** | 只看到一条 shim 报错，后续段照常输出，整体看起来"跑过了" | 用绝对路径变量（`R=…`）+ `;` 分隔，不用 `cd … && …` |

**我自己踩的 4 次（都已修正；写出来是为了让下一个人不要重复）**

| # | 我第一版怎么写的 | 真实情况 | 根因 |
|---|-----------------|---------|------|
| 1 | 按 inline `claimRefs: ["a","b"]` 数 → 得 `-1` | 真实写法是 YAML 对象列表 `- claimId: "x"` / `version: "y"` | 按记忆里的形状解析，没先 dump 原文 |
| 2 | 以为 `guideRedirectCandidates` 是「带 `disposition: retained` 的数组」 | 它是 `Record<string,string>` 14 条，`retained` 是派生值 | 同上：把派生语义当成存储字段 |
| 3 | 预期 `b1-route-paths` 是 4 条 `checklistHref` + 4 条 `guideHref` | 各 **5** 条（4 条 `definitions` + 独立 `unknownRoute`） | 同上：token 计数 ≠ 结构 |
| 4 | `rg 'germany-b1-difficulty-analysis'` 返回空 → 差点写成"不存在" | 真实 slug 是 **`goethe-b1-difficulty-analysis`**（`publication-manifest.ts:79`） | **模式面写错**，与工具无关——正是规则 b 说的那种 |

### 11.5 一条对上游事实的更正：`canada-work-visa` 在本仓库不存在

主理人提到「`guides/canada-work-visa-…` 走 `guideRedirectCandidates` 的确认」。实测该路径**不在本仓库**：

```
$ rg -ni 'canada' -l "$R/src" "$R/public"      # 8 个文件
src/pages/guides/[slug].astro  src/pages/about.astro
src/content/guides/tef-canada-immigration.md  src/content/guides/tcf-canada-vs-tef.md
src/data/app-data.ts  src/data/source-review.ts  src/data/guide-taxonomy.ts  src/data/publication-manifest.ts

$ rg -ni 'canada' "$R/src/data/publication-manifest.ts"
59:  'canada',        # ← 国家清单里的一项，不是候选键

$ rg -ni 'work-visa|workvisa|work-permit' -l "$R/src"    # 3 个文件，均无 canada 组合
telc-b1-b2-germany-work-nursing.md  germany-b1-settlement-citizenship-checklist.md  goethe-b1-germany-settlement-work.md

$ ls src/content/guides/ | rg -i 'canada|work-visa'
tcf-canada-vs-tef.md
tef-canada-immigration.md

# 阳性对照（同命令、同目录，证明模式本身有效）
$ rg -ni 'germany-b1' -l "$R/src" | wc -l
28
```

模式面声明：`canada` 走大小写不敏感全文匹配，覆盖 `Canada` / `canada` / `CANADA` 及任意位置；`work-visa|workvisa|work-permit` 覆盖连字符与无连字符两种写法（未覆盖 `workVisa` 驼峰，已由 `-i` + 无连字符分支部分兜住）。

**结论**：`/guides/canada-work-visa-…/` 不是本仓库路径，现有 14 条候选全是 `goethe-a1-*` / `goethe-b1-*` / `german-a1-*`。若确实要把它塞进 `guideRedirectCandidates`，需要先确认它属于哪个站/哪个真实 slug——否则会往一个 `Record` 里加一条永不命中的键，而 `retainedGuidePaths` 与 `closedPolicy('retained')` 都会静默地不生效。

### 11.6 复现

```bash
# 结构面 + 内链 + hub + manifest + routes（9 个文件、104 项检查、单遍读取 + 哨兵）
node /tmp/vl-verify11.mjs
#   快照 S1 输出：104 checks, 3 FAIL, 101 PASS   （A/B/D directAnswer 3 句）
#   快照 S2 输出：104 checks, 1 FAIL, 103 PASS   （只剩 D）
#   预期随内容编辑变化；判定只看 summary 与 [done] processed 9/9 files 是否同时出现

# 句数 / 逐句词数 / 并发自检（5 个文件，前后双枚举，漂移即 exit 2）
node /tmp/vl-verify11b.mjs

# 词数与 readingTime 契约（5 个文件，单遍缓存 + drift 检测）
node /tmp/vl-words.mjs
#   2026-10-27 实测：1549/1418/1372/1742/1498，ceil 8/8/7/9/8，readingTime 全 ok，drift 0
```

退出码语义：`0` = 全绿；`1` = 有 FAIL（**这是设计，不是噪声**，11.3 的口径问题就靠它冒出来）；`2` = 扫描期间文件被改动、**本次快照作废，不许引用**。

**引用纪律**：任何「已核查 / 全部 / 零命中」都必须带上「用了哪个脚本 + 是哪个快照」，因为这三个脚本的输出在 2026-10-27 当天已经变过三次（原因见 11.8）。

---

### 11.7 与执行前的差异：词数走向相反（我 §6.5 的 dry-run 只证了一个方向）

§6.5 的 dry-run 假设「新增定位句 ⇒ 词数**净增**」，据此得出「`readingTime` 无需改」。执行结果的走向是**净减**：

| 篇 | 执行前词数 | 执行后 | 差 |
|----|-----------|--------|-----|
| A | 1,697 | 1,549 | **−148** |
| B | 1,590 | 1,418 | **−172** |
| C | 1,555 | 1,372 | **−183** |
| D | 1,971 | 1,742 | **−229** |
| E | 1,657 | 1,498 | **−159** |

减法是合理的（执行方删掉的是 §3.A 点名的那段「关于 URL 的自我解释」以及若干复述句，属于本方案要删的东西），但它让 §6.5 的结论**在净减分支下不成立**：A 的 `readingTime` 由 **9 降到 8**。

**没有破口**，因为 `tests/germany-b1-cluster.test.js:59` 是动态校验 `readingTime == ceil(words/200)`，净减也自动一致（11.1 表已逐篇验证 8/8、8/8、7/7、9/9、8/8）。但这是我第二次犯同一类错：**只验了「净增」这一种模式面就下了「无需改」的结论**。§6.5 的表述应读作「净增时无需改；净减时必须重算」——重算的结果是 A 必须改，而执行方确实改了。

（其余四篇的执行前 `readingTime` 已无法从当前工作区取回，故不作断言；只断言当前值与 `ceil` 一致。）

---

### 11.8 第六类环境事实：这棵树是**并发写**的，快照会自己过期

link-strategist-3 实测文件总数在 **233 → 235 → 233 → 235** 之间几分钟内变过两次。我这边更直接：**同一份脚本前后两次运行，结论从「3 篇超句数」变成「1 篇超句数」，再变成「0 篇超句数」**——因为 `content-editor` 在这期间把 5 条 directAnswer 整体重写了两次。

三条纪律（已落到 §11 的脚本里）：

1. **扫描前后各枚举一次目录**，比较 `文件名 + size + mtimeMs`；有任何差异 → **本次快照作废**，脚本 `exit(2)`，不给结论。S3 快照的实测：`guides 文件数 before=53 after=53`、`drifted files: 0`。
2. **阳性对照不许取正在被编辑的文案**。我原来的对照里有 `Leben in Deutschland and DTZ document lanes`（那是 content-editor 的锚文本，随时会变），现在改用测试钉死的不变量：`## Official sources` 每篇恰好 1 次、`claimId:` 合计 45 条。
3. **结论必须带快照编号**。本节 S1/S2/S3 三个快照并存，谁引用「3 处 FAIL」而不写 S1，就是在报一个已经过期的事实。

### 11.9 `m4-b1-routes` 的「exit 0」是个假绿灯

后台跑该测试时拿到：`EXIT=0`，但输出文件只有 **15 字节**（`TAP version 13`），**一条断言行都没有**。这不是通过，是重定向被 shim 打断（`brokered-sandbox-bash-env.sh:7: resource temporarily unavailable: /dev/null`）导致 TAP 流没落地。

前台无重定向重跑才是真结果：

```
$ node --test …/tests/m4-b1-routes.test.mjs 2>&1 | tail
ok 1 - …/tests/m4-b1-routes.test.mjs
1..1
# pass 1
# fail 0
# duration_ms 171598.9
```

→ 通过。判定标准必须是「**有 `ok N` + `# pass` + `# fail 0` 三条**」，单看 `EXIT=0` 会把「什么都没跑」误判成「跑过了」。这与此前记录的 `dist/` 半成品问题同源：**空输出不等于成功**。

**但耗时别抄 171.6 秒——那是负载伪影。** 同一测试三次测量：

| 时刻/条件 | duration_ms | 来源 |
|-----------|------------|------|
| 机器被并发构建占满时 | **171,598**（171.6 s） | 我 |
| 另一成员同期 | 5,855（5.85 s） | link-strategist-3 |
| 空闲时段复测 | **548（0.55 s）** | 我 |

同一份代码同一份测试，差 **313 倍**。所以：**只记"通过"，不记耗时预算**；任何人按 171.6 s 预留超时，都会把一个 0.5 秒的测试当成长任务、甚至误判成挂死。这也是一条通用教训——**耗时和退出码在共享机器上都不可作为判断依据，只有内容哨兵可以**。

---

### 11.10 dist 侧核验（快照 `/tmp/vlsnap-2026-10-27T11-38-23-335Z`）—— 含三处对我自己的纠错

**为什么要先拷快照**：`prebuild` 里有 `rm -rf dist`（`package.json:6`），队友一构建，`dist` 就被抽走。所以我先把 **106 个 html + 2 个 xml** 拷成时间点快照，全部判定在快照上做；拷贝前后 `dist` 顶层 mtime 一致（`1793101004692.984` → 同值），快照期间未被重建。

**① canonical 实测：106/106 通过。** 恰好 1 条、0 缺失、0 重复；全部 `https://visalang.org/…/`。唯一一条「与自身路径不一致」是 `404.html`（canonical `/404/`）——**是我的检查误报**：我的期望路径推导没处理「404 不是 `index.html`」。→ §11.4 的旁路 1（`Astro.url.href` 默认值）在 **dist 侧被证实**与 13 处硬编码同构，不再只是「按 static + trailingSlash 推断」。

**② 纠错：我说过「9 个 noindex 分类页现在就在 sitemap 里」——错的，撤回。**

```
snapshot html: 106   sitemap entries: 41
inSitemap: 41   noindex: 65
A. noindex pages inside sitemap (expect 0): 0
B. indexable pages missing from sitemap (expect 0): 0
C. sitemap ghost entries (expect 0): 0
```

**sitemap 里一个分类页都没有**；106 = 41（在 sitemap）+ 65（noindex），严格互补。漏读的是 **postbuild 脚本 `scripts/enrich-sitemap-lastmod.js`**：它遍历 `dist` 全部 html，把带 `noindex,follow` 且能找到 canonical 的 URL 从 sitemap 里删掉（`:38-42` 取 canonical、`:61-64` 逐页 removeUrl）。

**③ 纠错：「sitemap 成员由硬编码黑名单决定」——说反了。**

16 条黑名单里 **15 条有构建页且全部已 `noindex,follow`**，第 16 条 `/404/` 根本没有构建页（404 实际输出为 `404.html`）。即：**黑名单当前一条也没「额外」拦到**；sitemap 成员实际由 enrich 按 noindex 决定，黑名单是纯冗余的 belt-and-braces。

**④ 纠错：黑名单是 16 条，不是 14 条。** `git diff -- astro.config.mjs` = `+9` 行，其中把 `/zh/404/`、`/404/` 加进了 `noindexSitemapPaths`，另加了 vite proxy 段。所以「14 条」是 **HEAD 的值**，当前工作树是 16 条——我第一次读文件看到 14 条不是读错，是**文件在这期间被改了**（`git status`：` M astro.config.mjs`）。

**⑤ enrich 的两个静默失效点（seo-optimizer 提出）实测：当前都没触发，但风险是真的。**

| 失效点 | 前提 | 实测 | 判定 |
|--------|------|------|------|
| A. `removeUrl` 正则假设 `<url><loc>` 紧邻 | 单行格式 | `<url><loc>` 41 = `<loc>` 41 = `<url>` 41 | **未触发**；`@astrojs/sitemap` 一改缩进即静默失效 |
| B. `canonicalUrlFromHtml` 用逐字符 `includes('<meta name="robots" content="noindex,follow">')` | 该值逐字一致 | 65 个 noindex 页的 robots **全部**是 `noindex,follow` | **未触发**；写成 `noindex, nofollow` 或追加指令即静默失效 |

**这里有个容易误判的坑**：我复刻它的移除逻辑，得到「可移除 **0** 条」——这**不能**证明链坏了，只能证明**已经清过了**（上一轮 postbuild 跑过）。判断这条链是否有效，必须看格式前提（上表两行），**不能看「移除条数」**。

**但这条链到底做了什么，可以用算术闭起来**（keyword-researcher-2 在 19:18 读到 `90` 条、19:30 读到 `41` 条，一度以为是并发重建在抖；其实是 postbuild 把 sitemap 改写了）：

```
built html: 106
blacklist hits: 16 (built, non-404: 15)
raw sitemap = 106 − 1 (404, Astro 不写入) − 15 (黑名单) = 90
  ├─ 其中 noindex（应被 enrich 移除）= 49
  └─ 其中可索引（应留下）=             41
measured sitemap after postbuild: 41
raw − noindex = 41 vs measured 41  -> MATCH
missing: 0   extra: 0
```

所以 **90 → 41 不是抖，是 `enrich-sitemap-lastmod.js` 删掉了 49 条 noindex URL**；`41 + 49 + 15 = 105`，加上 404 共 106，全部对得上。

**由此得出一条会误导人的操作规则**：任何**跳过 postbuild** 的构建（例如 content-editor-2 记的那个绕法 `env -u NODE_OPTIONS … astro.mjs build`）产出的 `sitemap-0.xml` 会是 **90 条**，其中 49 条是 noindex。看到 90 不要以为「这次收录更多」，那是**没清理的中间态**。

**⑥ B1 五篇（与本轮直接相关）**：canonical 正确、`noindex=false`、**全部在 sitemap 里**：

```
IN  /guides/goethe-b1-germany-settlement-work/                      noindex=false
IN  /guides/germany-b1-citizenship-language-proof/                 noindex=false
IN  /guides/germany-b1-leben-in-deutschland-and-language-proof/    noindex=false
IN  /guides/germany-b1-settlement-citizenship-checklist/           noindex=false
IN  /guides/germany-b1-settlement-citizenship-timeline/            noindex=false
```

**复现**：

```bash
node /tmp/vl-dist-verify.mjs                    # 拷快照 + canonical 覆盖率 + sitemap 格式/成员；[done] processed 108/108
node /tmp/vl-sitemap-partition.mjs /tmp/vlsnap-<ts>   # 互补性三条断言（A/B/C 全为 0 才算干净）
node /tmp/vl-blacklist-redundancy.mjs /tmp/vlsnap-<ts> # 黑名单 16 条是否已被 noindex 覆盖
```

阴性对照：`vl-sitemap-partition` 的 A/B/C 三条**必须全为 0**；任何一条非 0 就是真缺陷，不是工具问题。

---

## 附录 A：可选 Plan B —— 扩展 `supportingGuideSlugs`（本次不执行）
若主理人认为 RelatedGuides 区块必须与正文内链同步，可按此执行，代价是改测试：

| 文件 | 行 | 新数组 |
|------|----|--------|
| `goethe-b1-germany-settlement-work.md` | 47 | `["germany-b1-settlement-citizenship-checklist", "germany-b1-settlement-citizenship-timeline", "germany-b1-leben-in-deutschland-and-language-proof"]` |
| `germany-b1-settlement-citizenship-checklist.md` | 52 | `["goethe-b1-germany-settlement-work", "germany-b1-citizenship-language-proof", "germany-b1-settlement-citizenship-timeline", "germany-b1-leben-in-deutschland-and-language-proof"]` |

必须同步改 `tests/content-integrity.test.js:67-106` 的 `germanyB1CoreRoute` 对应两项（该处用 `deepEqual` 断言，逐字对齐）。约束复核：不得包含自身 slug、不得包含本页 `nextGuideSlug`（`content-integrity.test.js:126-133`）；D 的 `nextGuideSlug` 为空，故加 timeline 合法。

## 附录 B：本方案涉及的全部路径清单

**改（6，或策略 B 下 10）**
```
src/content/guides/goethe-b1-germany-settlement-work.md
src/content/guides/germany-b1-citizenship-language-proof.md
src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md
src/content/guides/germany-b1-settlement-citizenship-checklist.md
src/content/guides/germany-b1-settlement-citizenship-timeline.md
src/pages/germany-b1-settlement-citizenship.astro
+ 策略 B：tests/germany-b1-cluster.test.js, tests/m4-b1-routes.test.mjs,
          tests/fan-43-germany-b1-recheck.test.js,
          tests/scheme-3-english-content-quality.test.mjs
+ 治理：docs/planning-map/*, docs/TASK_LOG.md
```

**必须不动**
```
public/_redirects                    （sha256 冻结：ba08ae41…）
src/data/publication-manifest.ts     （sha256 冻结；englishPillarSlugs 15/8 保持不变）
deploy/retained-routes.json
docs/VISALANG_M3_T23_MIGRATION_CANDIDATE_ROLLBACK_MAP_2026-09-11.md
src/data/b1-route-paths.ts  src/data/b1-route-claims.ts  src/data/claim-registry.ts
src/data/guide-taxonomy.ts（guidePurposeOverrides）
5 篇的 supportingGuideSlugs / nextGuideSlug / title / claimRefs / readingTime
```

## 附录 C：seoTitle 新旧对照（交付核对表）

| 页面 | 旧 seoTitle（字符） | 新 seoTitle（字符） | 变化要点 |
|------|--------------------|---------------------|----------|
| A | `Germany settlement permit B1 proof`（34） | `Germany settlement permit B1: which provision`（45） | 加「which provision」，把 §9/§18c 分支意图写进标题 |
| B | `German citizenship B1 language proof`（36） | `German citizenship B1: § 10 language proof`（42） | 加 `§ 10`，与 A 的条文层分离 |
| C | `B1 and Leben in Deutschland explained`（37） | `Leben in Deutschland vs DTZ: two evidence types`（47） | 引入 `DTZ`，改为对比式文档识别意图 |
| D | `Germany B1 settlement and citizenship checklist`（47） | `Germany B1 documents checklist: 4 evidence lanes`（48） | 去 `settlement and citizenship`，吃「材料清单」 |
| E | `Germany B1 settlement and citizenship timeline`（46） | `Germany B1 timeline: which step comes first`（43） | 去 `settlement and citizenship`，吃「顺序/时间线」 |
