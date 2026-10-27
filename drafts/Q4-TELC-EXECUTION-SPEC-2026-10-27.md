# Q4 执行规格：telc 第一批解封（可直接照做版）— 2026-10-27

**性质**：本文件是 `drafts/keyword-gap-briefs-2026-10-27.md` §A 的**执行层翻译件**。§A 回答「为什么做」，本文件回答「改哪一行、改成什么、改完跑什么」。
**产出人**：seo-optimizer（第 1–7 节为只读分析产出；载入「路 3」后，本窗口唯一改动为 `src/pages/germany-b1-settlement-citizenship.astro` 的两条入链，见 §4.3）
**执行前置**：**必须等 Q2（`updatedDate` 日期期望改造）落地并由单一 owner 接手**。Q4 与 Q2 触及同一批测试文件，并行改动必然互相覆盖。

> 🔴 **本窗口范围（2026-10-27 裁定「路 3」，覆盖本文件全部早期版本）**
> Q4 拆成两个窗口。本文件同时是全两窗口的作业单，但**本窗口只执行其中 2 行 HTML**：
> - **窗口一（本窗口，已收口）**：**只做 B1 hub 两条入链**（`src/pages/germany-b1-settlement-citizenship.astro` 的 `#compare-proof` / `#preparation-support` 各新增 1 个 `<p>`，见 §4.3 落点 1、2）。**内容改写不在本窗口。** 两页保持 `noindex: true`、保持 `contentStatus: "starter-overview"`、不进入 `englishPillarSlugs`、不改 `updatedDate`、不改 `sourceReviewedAt`、不改任何 manifest/计数测试、不跑构建。详见 §7。
> - **窗口二（解封窗口）**：真实 telc 源复核 + **两页内容重建** + `updatedDate` 前移 + manifest 翻转 + 9 处计数测试 + `telc-work-nursing:12` / `telc-window-1:54` 两行日期断言 + launch-check + CONTENT_MAP + ledger，**以上必须同批**。§0 门槛表、§2、§3、§6.2 全部是该窗口作业单。
> 本文早期版本曾把「内容改写」放在窗口一；路 3 裁定后整体移入窗口二。凡与本节冲突处，以本节为准。

> ⚠️ **本文所有行号、断言原文均为 2026-10-27 工作副本快照。Q2 合入后必须重读第 3 节全部文件，不得沿用本文行号直接改。**

---

## 0. 一句话结论（先看这个）

§A.9 把第一批条件写成「≥2,000 词 + 删模板空节 + 入链 + source-review 日期」，**这是不完整的**。仓库里真正生效的 pillar 准入契约是 `tests/scheme-3-english-content-quality.test.mjs`（§A 完全未提及），它要求每篇 pillar 同时满足：

> 下表是**窗口二（解封）的门槛**。本窗口不做内容、不翻 manifest，因此下面任何一项断言都**不会被触发**；但窗口二的重建必须一次打满全表——路 3 已经把「内容返工」和「契约改动」压进同一批次，不存在二次返工的余地。

| 契约 | 现状（两页均未通过） |
| --- | --- |
| 正文词数 **1,200–2,400**（有上限） | 护理 1,273 / 格式 1,245（通过，但护理补到 2,000 后仅剩 400 词余量） |
| `## Who this is for` 恰好 1 次 | 两页均 **0 次** |
| `## Key decisions` 恰好 1 次 | 两页均 **0 次** |
| `## (Common )?Mistakes( to avoid)?` 恰好 1 次（**区分大小写**） | 护理 0 次；格式页写作 `## Common mistakes`（小写 m）→ 断言不匹配，等同 0 次 |
| `## Next action` / `## Official sources` 各 1 次 | 两页均通过 |
| `## Scenario:` 或 `### Scenario:` **≥2 个** | 两页均 **0 个**。⚠️ 断言是 `/^#{2,3} Scenario:/gm`，**H2 或 H3 都算** |
| 资产型标题 **≥3 个**（asset/worksheet/record/matrix/map/script/log/register/card/board/check/pack/template） | 护理 1 个（`## Build an authority record`）；格式页 2 个。⚠️ 断言是**关键词正则**，标题里含这些词即可，**不要求写 `### Original asset:` 字面量** |
| 正文含 `four-owner|four-party … map` 句式 | 两页均 **无** |
| `readingTime == ceil(词数/200)` | 护理 8→应为 **7**；格式 9→应为 **7** |
| `sourceReviewedAt == '2026-09-13'`（非 A1 slug 硬编码） | 两页均为 `2026-08-14` → **必改，且改法受 Q2 影响** |
| `updatedDate == sourceReviewedAt`（除非登记进 `reScopedB1Slugs`） | 两页均为 `2026-08-14` |
| 在 A1/B1 claim ledger 中有 `## <slug>` 八列表格 | 两页**均无**（telc slug 不属于 A1 集合 → 落到 B1 ledger） |
| 与现有 15 篇 pillar **无连续 80 词重复块** | 待执行者验证（改写时若复用 goethe-b1 句式会命中） |
| `seoTitle` 存在且 ≤49 字符（`fan-270-seo.test.js:44-48`） | 两页**均无 `seoTitle`**，且 `title` 超 49 字符 |

**结论：Q4 不是「加名单 + 翻开关」，是「按 pillar 契约重建两页」。** 2026-10-27 裁定**路 3** 后拆成两个窗口：
- **窗口一（本窗口，已收口）＝ 只做 B1 hub 的 2 条入链**，即 §4.3 落点 1、2，**已落地**；不碰 telc 内容、不翻 manifest、不改测试、不跑构建；
- **窗口二（解封）＝ 真实 telc 源复核 + 两页内容重建 + `updatedDate` 前移 + manifest 翻转 + 9 处计数测试 + 2 行日期断言 + launch-check + CONTENT_MAP + ledger**，任何一步缺失都会红。

下面 §1 是两窗口共用的现状基准；§0、§2、§3、§6.2 是**窗口二**的作业单；§4.4、§7 是本窗口边界（已执行完毕）。

### 0.1 窗口二验收清单（逐条到文件:行号，翻转即全部生效）

> 这份清单就是窗口二的验收标准。**每一条都在 `englishPillarSlugs` 包含 telc 的那一刻生效**（`scheme-3:4` 导入该数组、`:35` 用它构造被检集合）。
> 下列行号已于 2026-10-27 用 `awk` 逐行复核；**旧版转述里出现过的 `:48-56`、`:58-62`、`:64` 两两 80 词等映射均不准确，以本表为准。**

| # | 契约 | 位置（文件:行） | 断言原文要素 | 两页现状 |
| --- | --- | --- | --- | --- |
| 1 | 词数 1,200–2,400（门禁口径） | `scheme-3:42` | `words >= 1200 && words <= 2400` | 1,273 / 1,245 ✅ |
| 2 | `updatedDate` 精确值 | `scheme-3:48-49` | `expectedUpdatedDate`（`reScopedB1Slugs` 命中则 `2026-10-27`，否则同 `expectedReviewDate`） | `2026-08-14` ❌ |
| 3 | `sourceReviewedAt` 精确值 | `scheme-3:43-47,50` | 非 A1 slug → **硬编码 `2026-09-13`** | `2026-08-14` ❌（见 §6.3 的映射方案） |
| 4 | `readingTime === ceil(words/200)` | `scheme-3:51` | 严格相等 | 8→7 / 9→7 ❌ |
| 5 | 五个 section 各恰好 1 次 | `scheme-3:53-62` | `## Who this is for` / `## Key decisions` / `## (?:Common )?Mistakes(?: to avoid)?` / `## Next action` / `## Official sources` | 前三个均 0 ❌ |
| 6 | Scenario ≥2 | `scheme-3:64` | **`/^#{2,3} Scenario:/gm`**（H2 或 H3 均可） | 0 ❌ |
| 7 | 资产型标题 ≥3 | `scheme-3:65-66` | **关键词正则** `/^#{2,3} .*(?:asset\|worksheet\|record\|matrix\|map\|script\|log\|register\|card\|board\|check\|pack\|template).*$/gmi`（**不要求 `### Original asset:` 字面量**） | 1 / 2 ❌ |
| 8 | four-owner 责任图句式 | `scheme-3:67` | `/four-(?:owner\|party)[^\n]{0,80}map/i` | 无 ❌ |
| 9 | 官方来源 https 链接 ≥2 | `scheme-3:68` | `(body.match(/https:\/\//g) \|\| []).length >= 2` | 护理 **10** 条 / 格式 **6** 条 ✅（实测） |
| 10 | 与其余 14 篇无连续 80 词重复块 | `scheme-3:71-83` | 逐对 80-word shingle 比对 | 待验证（改写若复用 goethe-b1 句式会命中） |
| 11 | B1 ledger 含 `## <slug>` 小节 | `scheme-3:130-133` | telc 不在 `a1Slugs` → **必须进 B1 ledger** | 无 ❌ |
| 12 | ledger 表 = 八列且每格非空 | `scheme-3:97,108-120` | `['claim','source url','locator','checked','owner','allowed support','boundary','update trigger']`；`source url` 须 `https://` 开头；`locator` 不得以 `http` 开头 | 无表 ❌ |

**另有 6 条不在 `scheme-3`、但翻转后同样要过**：`scheme-3-publication:44`（`deepEqual` 精确名单，15→17）、`scheme-3-release-candidate`、`scheme-3-content-map`、`fan-73-guide-trust`、`scheme-3-route-hubs`、`source-review-render:113`（next-guide 渲染）。详见 §3.1–3.2。

### 0.2 作用域提醒：这套契约是否适用，取决于「翻转前 / 翻转后」

| | `germany-b1-cluster`（`###` 级，8 篇 `requiredCoreGuides`） | `scheme-3-english-content-quality`（`#{2,3}` 级，遍历 `englishPillarSlugs`） |
| --- | --- | --- |
| **翻转前（现状）** | ❌ 不覆盖 telc（telc 不在 `coreSlugs`） | ❌ 不覆盖 telc（telc 不在 `englishPillarSlugs`，`:34` 的循环不遍历它们） |
| **翻转后（窗口二完成 §2.1 那一刻起）** | ❌ 仍不覆盖（telc 不进 `coreSlugs`） | ✅ **立即覆盖**，且**当场全红** |

**关键点：`scheme-3` 读的是 `publication-manifest.ts` 的 `englishPillarSlugs`（`:4` 导入、`:34` 遍历）。§2.1 把两个 telc slug 插进该数组的那一行，就是这套断言对 telc 生效的开关。** 所以「现在 `grep telc publication-manifest.ts` 无命中」只能证明*现在*不覆盖，**不能**推出窗口二不需要满足这些契约。

**翻转后不满足会怎样（模拟 §2.1 插入两行、其余不动）：**

```
### telc-b1-b2-germany-work-nursing → scheme-3 立刻红 8 处
   缺「Who this is for」/「Key decisions」/「Mistakes」（各需 1 次，现 0）
   Scenario 0 个（需 ≥2）｜资产型标题 1 个（需 ≥3）｜缺 four-owner/four-party … map
   readingTime 8 ≠ ceil(1273/200)=7｜sourceReviewedAt=2026-08-14（期望 2026-09-13）
### telc-b1-b2-exam-format-and-preparation → 同样红 8 处（资产型标题 2 个）
```

**结论**：窗口二**必须**先按 §0 契约表重建内容，再翻 manifest；顺序反过来，**仅 `scheme-3` 内容断言就红 16 处**（护理 8 + 格式 8，逐条见上），另有 `scheme-3-publication:44` 名单 `deepEqual`、`release-candidate`、`content-map` 等列表/计数断言同步红（**未逐条枚举，不报总数**）。`### Original asset:` 字面量仍不需要（那属 cluster 的 8 篇），但 `#{2,3} Scenario:` ≥2 与关键词型资产标题 ≥3 **确实需要**。

另一组易混的是 `tests/m4-study-assets.test.mjs`：它钉的是**具体句子与节点**（`**Transfer exercise:**` ×2、`**Self-check:**` ×2、`not an official exam task`、`cannot assess pronunciation, fluency or listening`、两个 `responsive-table` 的 `tabindex="0"`），**与 `###` 标题层级无关**，且只作用于 study-plan 页。窗口二两页都不涉及它。

---

## 1. 两篇目标页的精确现状

### 1.1 `src/content/guides/telc-b1-b2-germany-work-nursing.md`（共 112 行）

**正文字数**
| 口径 | 数值 | 说明 |
| --- | --- | --- |
| `awk` 裸词数（`---` 之后） | **1,369** | §A.0 引用的是这个数 |
| 测试度量词数（`wordsOf()`：剥离 URL 与标签后计 token） | **1,273** | **这是 gate 实际使用的数字** |
| 目标 2,000 词的缺口 | **+727**（按测试度量）～+631（按裸词数） | **目标区间已定：2,000–2,300（门禁口径）**，硬上限 2,400；上限留 100 词余量给 `readingTime` 的 `ceil` 分界 |

**frontmatter 目标（行号；「本窗口」= 现在可改，「解封窗口」= 窗口二才改）**

| 字段 | 当前值 | 本窗口 | 解封窗口 | 行号 |
| --- | --- | --- | --- | --- |
| `contentStatus` | `"starter-overview"` | **不改** | `"core-route"`（见 §2.2） | 11 |
| `noindex` | `true` | **不改** | `false` | 12 |
| `sourceReviewStatus` | `"reviewed"` | 不改 | 保持 | 9 |
| `sourceReviewedAt` | `"2026-08-14"` | **不改**（本窗口不写新事实，故不产生新复核日） | 真实复核日（见 §6.3） | 8 |
| `updatedDate` | `"2026-08-14"` | 改为实际改写日（见 §3.4 的两条日期断言代价） | 同左 | 7 |
| `readingTime` | `"8"` | 重算为 `ceil(新词数/200)`（本窗口无测试耦合） | 必须与门禁一致 | 24 |
| `adsEligible` | `false` | **保持 false** | **保持 false**（`telc-window-1:60`、`telc-work-nursing:18` 双重锁定；翻 true 会改变 AdSense 页面分类） | 13 |
| `seoTitle` | **不存在** | 建议新增（≤49 字符）——窗口二 `fan-270-seo:47` 强制，提前做可减一次返工 | 必须存在 | — |

**H2 清单（行号 · 本节词数 · 可核验事实）**

| 行号 | H2 | 本节词数 | 段落/表格 | 可核验事实 | 判定 |
| --- | --- | --- | --- | --- | --- |
| 31 | `Start with the decision, not a level label` | 84 | 2 段 | 无（纯框定） | 可保留，属引入 |
| 37 | `Four decision owners` | 201 | 1 段 + 6 行表 | 仅责任边界，无外部事实 | 结构价值高，**需补 `four-owner … map` 句式** |
| 48 | `Nursing: locate the competent authority` | 138 | 7 块 | **有**：Recognition Finder 将 `General nurse (Pflegefachperson)` 标为 regulated；主管机关由职业+工作地决定 | 达标 |
| 61 | `Keep employment and immigration separate` | 150 | 3 段 | **有**：skilled-worker portal 对 job offer / 执业许可的分离表述 | 达标 |
| 69 | `Identify the exact telc product only after acceptance` | 121 | 3 段 | **有**：`telc Deutsch B1·B2 Pflege` 产品身份、写+口两部分 | 达标但偏薄 |
| 77 | `Build an authority record` | 417 | 1 段 + 7 行表 | **有**：5 条带 URL 与 checked 日期 | 全页最实，可作资产 |
| 89 | `Stop conditions` | 91 | 6 条列表 | 无外部事实（但有决策价值） | 保留 |
| 102 | `Next action` | 42 | 1 段 | — | 契约必需 |
| 106 | `Official sources` | 75 | 5 条 | — | 契约必需 |

**「模板空节」审计结论：0 个 §A.0 所述的模板骨架节。** §A.0 描述的 15 个模板节（Exam Overview / Best Courses / Career Outcome…）属于 `telc-vs-goethe-for-german-visa`（第二批），**不在本篇**。§A.9 对护理页写「删除模板空节」是**误植**，执行者不要去找不存在的节、更不要以「删节」凑改动量。

**真正缺失的是契约节，不是空节：**
- 缺 `## Who this is for`（可把 31 行的框定段迁入）
- 缺 `## Key decisions`
- 缺 `## Common mistakes`（注意大小写契约）
- 缺 ≥2 个 `## Scenario: …`（A.4.2 第 6 节「认可见习与知识考试：谁发通知、谁考试、谁出结果」天然是两个场景，但**该节事实需 source-review 后才能写**）
- 缺 ≥3 个资产型标题（现仅 1 个 `record`；`Stop conditions` 若改名为 `## Stop-condition register` 即计 2 个，第三个需新建，如 `## Nursing authority verification card`）
- 缺 `four-owner … map` 句式：`## Four decision owners` 标题不含 `four-owner`/`four-party` 连字符形式，正则不匹配 → 建议在 46 行那句后补一句 "…; keep this four-owner responsibility map with the file."

### 1.2 `src/content/guides/telc-b1-b2-exam-format-and-preparation.md`（共 147 行）

**正文字数**
| 口径 | 数值 |
| --- | --- |
| `awk` 裸词数 | **1,346** |
| 测试度量词数 | **1,245** |
| 目标 | **维持**（§A.9② 只要求补「官方样题获取路径」+ 1 条入链）；上限 2,400 → 余量 **+1,155** |

**frontmatter 目标（行号；列义同 §1.1）**

| 字段 | 当前值 | 本窗口 | 解封窗口 | 行号 |
| --- | --- | --- | --- | --- |
| `contentStatus` | `"starter-overview"` | **不改** | `"core-route"` | 11 |
| `noindex` | `true` | **不改** | `false` | 12 |
| `sourceReviewedAt` | `"2026-08-14"` | **不改** | 见 §6.3 | 8 |
| `updatedDate` | `"2026-08-14"` | 改为实际改写日（见 §3.4） | 同左 | 7 |
| `readingTime` | `"9"` | 重算为 `ceil(新词数/200)`；1,245 词时为 `"7"` | 与门禁一致 | 23 |
| `adsEligible` | `false` | **保持 false** | **保持 false** | 13 |
| `seoTitle` | **不存在** | 建议新增 ≤49 字符 | 必须存在 | — |

**H2 清单（行号 · 词数 · 判定）**

| 行号 | H2 | 本节词数 | 可核验事实 | 判定 |
| --- | --- | --- | --- | --- |
| 30 | `Confirm the exact product first` | 131 | 产品名清单（Zertifikat Deutsch / telc Deutsch B1、telc Deutsch B2） | 达标 |
| 49 | `Exam format: B1 and B2 are similar, not identical` | 244 | **强**：90 分钟阅读+语言元素块、听力 30/20 分钟、写作 30、口语 15+20 分钟准备、机考/纸笔 | 全站最实内容之一 |
| 63 | `Scoring and results` | 192 | **强**：笔试 75% / 口试 25%、双 60%（135/45 分）、FAQ 4–6 周 | 达标 |
| 73 | `Build an official baseline` | 148 | 官方 mock 包（B1/B2 zip） | 达标 |
| 87 | `Create a diagnostic record` | 152 | 5 行诊断表 | 资产 |
| 101 | `Turn the diagnosis into a weekly loop` | 87 | 纯方法 | 保留 |
| 113 | `Registration and local execution check` | 99 | 6 条核对项 | 资产（`check`） |
| 126 | `Common mistakes` | 77 | 7 条 | **大小写导致契约不匹配** |
| 136 | `Next action` | 42 | — | 契约必需 |
| 140 | `Official sources` | 102 | 6 条含 mock zip 直链 | 达标 |

**「模板空节」审计：0 个。** 该页是四页 telc 中信息密度最高的，§A.9②「维持」的判断成立。缺的仍是契约节（`Who this is for`、`Key decisions`、≥2 `Scenario:`、≥3 资产标题、`four-owner map` 句式、`seoTitle`、`readingTime`、ledger）。

**注意**：`## Common mistakes` 必须改成 `## Mistakes to avoid`（或 `## Common Mistakes` 大写 M），否则 `scheme-3-english-content-quality.test.mjs:56` 的正则 `/^## (?:Common )?Mistakes(?: to avoid)?$/gm` 匹配不到。

---

## 2. `src/data/publication-manifest.ts` 精确改动点（**窗口二作业单，本窗口不动此文件**）

### 2.1 `englishPillarSlugs`（第 27–43 行）

- **当前条目数：15**（第 28–42 行，每行一条）
- **插入位置**：第 42 行 `'goethe-b1-study-plan',` 之后、第 43 行 `] as const;` 之前
- **插入内容**（两行，保持既有单引号 + 尾逗号风格）：
```ts
  'telc-b1-b2-germany-work-nursing',
  'telc-b1-b2-exam-format-and-preparation',
```
- **插入后条目数：17**

### 2.2 `contentStatus` 合法值来源

- 枚举定义：`src/data/source-review.ts:7`
  ```ts
  export const contentStatuses = ['complete-route', 'core-route', 'starter-overview', 'verification-pending'] as const;
  ```
- schema 绑定：`src/content.config.ts:18` → `contentStatus: z.enum(contentStatuses)`
- 索引判定：`publication-manifest.ts` 的 `mature = sourceReviewStatus === 'reviewed' && (contentStatus === 'complete-route' || contentStatus === 'core-route')`
- **风险检查（已核实，无风险）**：`germany-telc` **不在** `highRiskRouteCategories`（`source-review.ts:55`，含 portugal/spain/uk/canada/italy/france/finland/netherlands）→ 不会触发 `resolveGuideContentStatus()` 的降级为 `verification-pending`。
- **取值建议**：`core-route`。参照 `goethe-b1-vs-telc-b1`、`germany-b1-settlement-citizenship-checklist` 同层做法；`complete-route` 留给「一个完整路线」（如 `german-family-reunion-language-requirement`）。**两页取同一值**，避免同批解封出现不对等。

### 2.3 是否还有第二处清单要同步

| 候选 | 是否需要改 | 依据 |
| --- | --- | --- |
| `chinesePillarSlugs` | **不改**（保持 5） | Q4 只解封英文 telc；改它会连带 `fan-73-guide-trust.test.js:11-15` 与 `scheme-3-chinese-*` |
| `supportingGuideSlugs`（两页 frontmatter） | **不改，保持现状** | 护理页第 28 行已含 `telc-b1-b2-exam-format-and-preparation`；格式页第 27 行三条目标均为 noindex 页，`RelatedGuides` 会按 index 策略自动过滤，不影响渲染 |
| `nextGuideSlug` | **护理页保持**（第 16 行 → exam-format）；**格式页保持为空** | 见 `tests/source-review-render.test.js:113` 的渲染契约：护理→格式必须同批解封，否则该断言红 |
| `retainedGuidePaths` / `guideRedirectCandidates` | **不改** | 两页不在 `guideRedirectCandidates` 的 17 条里；`release-candidate:70` 断言 17 条不变 |
| `noindexCategorySlugs` | **不改** | `germany-telc` 必须保持 noindex（分类页不解封） |

---

## 3. 测试现状原文（含 §A 清单外的 8 处）

> 每条给出：文件:行号 → 当前断言原文 → Q4 后应变成什么。
> **Q2 合入后须整体重读**，尤其涉及日期期望的行。

### 3.1 §A 点名的四个

**① `tests/scheme-3-publication.test.mjs:44`**
```js
assert.deepEqual([...englishPillarSlugs].sort(), expectedEnglishPillars, 'publication manifest exposes exactly 15 English pillars');
```
- 断言的是**精确名单**（`expectedEnglishPillars` 在第 13–29 行列了 15 条字面量），不是数量。
- 改法：在第 13–29 行的数组中插入 `'telc-b1-b2-exam-format-and-preparation'` 与 `'telc-b1-b2-germany-work-nursing'`（保持 `.sort()` 语义，位置任意），消息文案 `exactly 15` → `exactly 17`。

**② `tests/scheme-3-publication.test.mjs:45`**（中文侧，**不得动**）
```js
assert.deepEqual([...chinesePillarSlugs].sort(), expectedChinesePillars, 'publication manifest exposes exactly 5 Chinese pillars');
```

**③ `tests/scheme-3-release-candidate.test.mjs:61-63,100,101,114,150`**
```js
assert.equal(englishPillarSlugs.length, 15, 'the publication manifest names exactly 15 English pillars');        // 61 → 17
assert.equal(chinesePillarSlugs.length, 5, 'the publication manifest names exactly 5 Chinese pillars');           // 62 不动
assert.equal(noindexCategorySlugs.length, 12, 'the publication manifest names exactly 12 closed categories');     // 63 不动
assert.equal(noindexPages.length, 64, 'the release candidate generates exactly 47 noindex pages after promoting the reviewed fee guide'); // 100 → 62
assert.equal(advertisingPages.length, 14, 'the release candidate exposes AdSense on exactly 14 pages');           // 101 不动（adsEligible:false）
assert.deepEqual(advertisingPages.map(({route})=>route).sort(), expectedAdvertisingRoutes, '...');               // 114 自动派生，不改
assert.equal(pendingEnglishPages.length, 38, 'exactly 24 English guides remain pending and fail closed after promoting the reviewed fee guide'); // 150 → 36
```
- 该文件第 76 行会 **自己执行 `npm run build`** → 与任何并发构建互斥；也是全量测试里最慢的一环。
- 注意 100/101/150 三处的中文消息数字早已与实际值不符（写 47/24，实际断言 64/38），**改数时顺手把消息改对**，免得下一次误读。

**④ `tests/fan-73-guide-trust.test.js:11-15`**（§A 判断需更正）
```js
assert.equal(
  (zhGuideData.match(/sourceReviewStatus: 'reviewed'/g) || []).length,
  chinesePillarSlugs.length,
  'the Chinese Germany A1 data keeps one completed source review for each manifest pillar',
);
```
- 它断言的是「`src/data/zh-germany-a1.ts` 里 `sourceReviewStatus: 'reviewed'` 出现次数 == 中文 pillar 数」。
- **Q4 完全不需要改这个文件**：英文 telc 解封不改变中文 pillar 数（5）。该断言只对 §B（中文费用页，5→6）有意义。§A.8 把它列进 telc 清单是 **A/B 两节串线**。

**⑤ `tests/scheme-3-content-map.test.mjs:16-22`（§A 提到但未给行号）**
```js
assert.match(current, /15 English pillars/);       // 16 → 17
assert.match(current, /5 Chinese pillars/);        // 17 不动
assert.match(current, /38 non-pillar English guides/); // 18 → 36
assert.match(current, /12 noindex categories/);    // 19 不动
assert.match(current, /17 retained supporting URLs/);   // 20 不动
assert.match(current, /41 sitemap URLs/);          // 21 → 43
assert.match(current, /64 noindex pages/);         // 22 → 62
assert.match(current, /14 ad-enabled pages/);      // 23 不动
```
- 被断言对象是 `docs/CONTENT_MAP.md` 中 `<!-- SCHEME-3-CURRENT-START -->…<!-- SCHEME-3-CURRENT-END -->` 之间的快照段。
- 第 25 行还会对**每个** pillar slug 断言其出现在该快照里 → 两个 telc slug 必须被显式写进快照正文。
- 第 14 行另有 `assert.match(current, /Updated:\s*2026-09-22/)` → 若更新快照日期需同步改此正则。

### 3.2 §A 清单外、但 Q4 必然触发的 8 处

**⑥ `tests/scheme-3-english-content-quality.test.mjs`（全文，最硬的闸门）**
- 第 42 行：`assert.ok(words >= 1200 && words <= 2400, ...)` — **有上限 2,400**
- 第 43–50 行：`expectedReviewDate` 对非 A1 slug 硬编码 `'2026-09-13'`；`updatedDate` 必须等于它（除非登记进第 20–26 行 `reScopedB1Slugs`）
- 第 51 行：`readingTime == ceil(words/200)`
- 第 53–62 行：五个契约节各恰好 1 次
- 第 64 行：`/^#{2,3} Scenario:/gm` ≥2
- 第 65–66 行：资产型标题 ≥3
- 第 67 行：`/four-(?:owner|party)[^\n]{0,80}map/i`
- 第 71–83 行：任意两篇 pillar **不得共享连续 80 词块**
- 第 130–133 行：每个 slug 必须在 A1 ledger（A1 集合内）或 **B1 ledger** 中有 `## <slug>` 段，且表格为 8 列（第 97 行 `ledgerSchema`）：
  `| Claim | Source URL | Checked date | Owner | Locator | Allowed support | Boundary | Update trigger |`
  每格非空、`Source URL` 必须 `https://` 开头、`Locator` 不得是 URL。

**⑦ `tests/fan-270-seo.test.js:44-48`**
```js
assert.equal(pillarTitleRecords.length, 15, 'SEO checks cover every indexable English pillar');  // → 17
if (title.length > 49) assert.ok(seoTitle, `${file} gives its long indexable title a dedicated SEO title`);
assert.ok((seoTitle || title).length <= 49, `${file} keeps its selected SEO title within 49 characters before the brand suffix`);
```
- 两页 `title` 分别为 63 / 65 字符 → **必须新增 `seoTitle` 且 ≤49 字符**（不含 ` | VisaLang` 后缀）。

**⑧ `tests/site.test.js:443`**
```js
assert.equal(englishPillarSlugs.length, 15, 'the publication manifest retains exactly 15 English pillars'); // → 17
```

**⑨ `tests/m2a-local-fees-centres.test.mjs:141`**
```js
assert.equal(englishPillarSlugs.length, 15, 'the fee guide is the sole new English primary-discovery candidate'); // → 17（消息同步改）
```
- 该文件第 142 行还断言 `englishPillarSlugs.includes('goethe-a1-fees-by-country')`（保持）。此文件同时是 Q2/费用页争议文件，**改动必须与 content-editor-3 串行**。

**⑩ `scripts/launch-check.js:392,400,429`（不是 tests/，但被 tests 断言）**
```js
if (englishPillarSlugs.length === 15 && ... ) { pass('Publication manifest supplies the exact 15 English pillars, ...'); } // 392：15→17，消息同改
if (noindexPages.length === 64) pass('Exactly 64 generated pages are noindex.'); else fail(...);                                // 400：64→62 + 消息
if (pendingGuidePages.length === 38 && ...) pass('Exactly 38 non-pillar English guides are noindex, ...');                     // 429：38→36 + 消息
```
- 另第 423 行 `pass('All 20 manifest pillars are ...')` 是**纯消息**（无计数断言），但 20 → 22 应顺手改。
- 第 401 行 `advertisingPages.length === 14` 保持。

**⑪ `tests/site.test.js:174`（字面量守护 launch-check 文案）**
```js
src.launchCheck.includes('Only the 14 advertising-eligible English pillars load AdSense.')
&& src.launchCheck.includes('Sitemap membership exactly matches rendered indexability.')
```
- 数字 14 不变，但若改了 launch-check 里**其它**三处消息，此断言仍只锁这一句 → 安全；改 launch-check 时**不要改写这句话**。

**⑫ `tests/source-review-render.test.js:100-113`（渲染契约，白盒但必须过）**
```js
for (const slug of englishPillarSlugs) { ... 
  assert.ok(html.includes(`Official sources last checked: <time datetime="${sourceReviewedAt}">${sourceReviewedAt}</time>`), ...)
  assert.ok(html.includes('<dt>Reviewed by role</dt><dd>Source review</dd>'), ...)
  assert.ok(!html.includes('Official verification pending'), ...)
  assert.ok(html.includes(`"dateModified":"${updatedDate}"`), ...)
  assert.equal(renderedNext, nextSlug ? `/guides/${nextSlug}/` : '', `${slug} renders only its direct manifest-pillar next step`);
}
```
- **护理→格式必须同批解封**：`RelatedGuides` 只渲染 index 为真的目标。若只升护理页，`nextGuideSlug` 指向的格式页仍 noindex → 链接不渲染 → 第 113 行红。
- 两页都必须保留 `reviewedByRole: "source-review"`、`primaryOfficialAuthorityUrl`、`finalDecisionAuthorityType`（现已具备），否则第 109/110 行红。

**⑬（参考，不需改）`tests/germany-b1-cluster.test.js:16,74-78`** — 见 §4.2，**这是内链方案的真正约束**。

### 3.3 §A 数字勘误汇总（执行者别照抄 brief）

| §A 说法 | 实际 |
| --- | --- |
| 「护理页 1,369 词」 | 裸词数 1,369，**gate 用 1,273**；两者差 96 |
| 「格式页 1,346 词」 | 裸词数 1,346，gate 用 1,245 |
| 「护理页需删除模板空节」 | 护理页**没有**模板空节；15 个模板节在 `telc-vs-goethe-for-german-visa`（第二批） |
| 「4 个测试需同步」 | 实际 **9 处测试 + 1 个脚本 + 1 个文档快照**（§3.1–3.2） |
| 「fan-73 断言恰好 5 个中文 pillar」 | 对，但**与 Q4 无关**（只影响 §B） |
| 「≥2,000 词」 | gate 是 **1,200–2,400 区间**，超 2,400 反而红 |

### 3.4 两篇页各自还有一份「专属契约」测试（首个版本遗漏，必须遵守）

这两份测试**逐字段锁定**当前状态，是「本窗口不翻 manifest」这一决策的**代码级执法者**；同时它们也是内容改写最强的绊脚石——两份都会自己 `execFileSync('npm','run','build')` 并断言渲染结果。

**⑭ `tests/telc-work-nursing.test.js`（护理页专属，共 42 行；逐字块 25 条，零偏差）**

以下为**逐字原文**（`Lnn` 为行号），无省略号、无转义改写，可直接 `grep -F` 比对：

```js
L 9  const value = source.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() || '';
L12  assert.equal(field('updatedDate'), '2026-08-14', 'the work and nursing guide records its substantive editorial update');
L13  assert.equal(field('sourceReviewedAt'), '2026-08-14', 'the work and nursing guide records the current authority and product checks');
L14  assert.equal(field('sourceReviewStatus'), 'reviewed', 'the work and nursing guide closes its bounded source gap');
L15  assert.equal(field('reviewedByRole'), 'source-review', 'the work and nursing guide records the controlled source-review role');
L16  assert.equal(field('contentStatus'), 'starter-overview', 'the work and nursing slice does not promote content maturity');
L17  assert.equal(field('noindex'), 'true', 'the work and nursing guide remains outside indexing');
L18  assert.equal(field('adsEligible'), 'false', 'the work and nursing guide remains advertising-free');
L19  assert.equal(field('decisionStage'), 'requirement', 'the guide remains a requirement-verification step');
L20  assert.match(field('primaryOfficialAuthorityUrl'), /anerkennung-in-deutschland\.de/i, 'the guide records the government recognition entry point');
L21  assert.match(field('examOwnerUrl'), /telc.*b1-b2-nursing|telc-german-b1-b2-nursing/i, 'the guide records the exact telc nursing-product source');
L22  assert.match(field('finalDecisionAuthorityType'), /recognition authority.*employer.*mission.*foreigners authority.*telc/is, 'the guide separates all four decision owners');
L23  assert.match(field('localExecutionPrompt'), /Recognition Finder.*employer.*mission.*foreigners authority.*telc examination centre/is, 'the guide requires four reader-side verification actions');
L25  for (const authority of ['Competent professional recognition authority', 'Employer', 'German mission or foreigners authority', 'telc and selected telc examination centre']) {
L26    assert.match(source, new RegExp(authority, 'i'), `the guide names the authority boundary: ${authority}`);
L28  assert.match(source, /authority record/i, 'the guide gives readers a reusable authority record');
L29  assert.match(source, /Claim.*Authority and official source.*Checked.*Permitted support.*Boundary.*Reader verification action/is, 'the guide records the complete claim-source boundary');
L30  assert.match(source, /profession and.*work location|work location.*profession/is, 'the guide explains how the recognition authority is located');
L31  assert.match(source, /regulated profession/i, 'the guide retains the bounded official nursing-profession fact');
L32  assert.match(source, /does not decide|cannot decide|does not establish|cannot establish/i, 'the guide prevents one actor from deciding another actor\'s question');
L33  assert.doesNotMatch(source, /often requires telc Deutsch B2|work-permit and Blue Card paths may accept B1 or B2|permanent settlement and naturalisation accept telc certificates/i, 'the guide removes unsupported universal route and threshold claims');
L34  assert.doesNotMatch(source, /guarantees? (?:recognition|a visa|a residence permit|employment)|universally accepted|accepted throughout Germany|one language threshold/i, 'the guide avoids recognition, immigration, employment and cross-region guarantees');
L36  execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });
L38  assert.match(html, /Official sources last checked: <time datetime="2026-08-14">2026-08-14<\/time>/, 'the generated work and nursing guide renders its bounded source-review date');
L39  assert.doesNotMatch(html, /Official verification pending/, 'the reviewed work and nursing guide does not render a conflicting pending state');
L40  assert.match(html, />Coverage: orientation guide<\//, 'the work and nursing guide remains visibly outside mature states');
```

| 行 | 类型 | 改写时的处置 |
| --- | --- | --- |
| 12–13 | 日期锁 | ⚠️ 改 `updatedDate`/`sourceReviewedAt` 必红 → 路 3：本窗口不动 |
| 14–19 | 状态锁 | 保持即绿；**反向锁定「不翻 manifest」** |
| 20–23 | frontmatter 四字段正则 | 不得删改字段；`L23` 的 `Recognition Finder…telc examination centre` 顺序是硬约束 |
| 25–27 | 四个主体名循环 | 正文必须**逐字**保留那 4 个字符串 |
| 28–32 | 正文保留短语 | `authority record`、六列表头（顺序不可换）、`profession … work location` 共现、`regulated profession`、四种否定式任一 |
| 33–34 | 被禁断言 | 扩写时**极易踩到**，逐条自查 |
| **36** | build | 🚫 **本窗口禁止执行本文件**（§3.5） |
| 38–40 | 渲染断言 | 随 `sourceReviewedAt` / 徽标文案走，保持即绿 |

> 行号已于 2026-10-27 用 `awk` 逐行复核（旧版表格有 1–2 行偏移：`:15` 是 `reviewedByRole` 而非 `contentStatus`，`:16` 才是 `contentStatus`；保留短语实为 `:25–34` 而非 `:24–33`）。**旧版若已流出，以本表为准。**

**⑮ `tests/telc-window-1.test.js:40-79`（格式页专属；:40 的一次 build 同时供本文件前半段与格式页断言）**

> ⚠️ **同一文件的前半段（`:1-39`）锁的是第三篇页 `telc-vs-goethe-for-german-visa`** 的 frontmatter（`:6` 定 slug，`:9-12` 四个字段），与 Q4 两页无关，但它**不在** `englishPillarSlugs` 15 条之内（实测 `includes() === false`），所以 `scheme-3` 不管它。后果：任何人为**别的**理由改 `telc-vs-goethe-for-german-visa.md` 的 `updatedDate`/`sourceReviewedAt`/`sourceReviewStatus`/`reviewedByRole`，都会让本文件变红，而现场看起来像是 telc 批次的问题。**归因前先看红在哪一段**：`:9-39` 红 → 第三篇页；`:40` 之后红 → 格式页。

同为逐字原文，行号连续可核：

```js
L40  execFileSync('npm', ['run', 'build'], { stdio: 'pipe' });
L51  const formatSlug = 'telc-b1-b2-exam-format-and-preparation';
L52  const formatSource = fs.readFileSync(`src/content/guides/${formatSlug}.md`, 'utf8');
L54  assert.equal(frontmatterField(formatSource, 'updatedDate'), '2026-08-14', 'the format guide records its substantive editorial update');
L55  assert.equal(frontmatterField(formatSource, 'sourceReviewedAt'), '2026-08-14', 'the format guide records the exact-product source check');
L56  assert.equal(frontmatterField(formatSource, 'sourceReviewStatus'), 'reviewed', 'the format guide closes its bounded source gap');
L57  assert.equal(frontmatterField(formatSource, 'reviewedByRole'), 'source-review', 'the format guide records the controlled review role');
L58  assert.equal(frontmatterField(formatSource, 'contentStatus'), 'starter-overview', 'the format slice does not promote content maturity');
L59  assert.equal(frontmatterField(formatSource, 'noindex'), 'true', 'the format guide remains outside indexing');
L60  assert.equal(frontmatterField(formatSource, 'adsEligible'), 'false', 'the format guide remains advertising-free');
L61  assert.match(frontmatterField(formatSource, 'audienceScope'), /general.*B1.*B2|Zertifikat Deutsch.*telc Deutsch B2/i, 'the guide is limited to the two exact general products');
L62  assert.match(frontmatterField(formatSource, 'finalDecisionAuthorityType'), /telc.*exam owner.*selected.*centre/i, 'the guide separates product rules from local execution');
L63  assert.match(frontmatterField(formatSource, 'primaryOfficialAuthorityUrl'), /certificate-german-telc-german-b1/i, 'the guide records the exact B1 product source');
L64  assert.match(frontmatterField(formatSource, 'examOwnerUrl'), /telc-german-b2/i, 'the guide records the exact B2 product source');
L65  assert.match(frontmatterField(formatSource, 'localExecutionPrompt'), /selected.*telc.*examination centre/i, 'the guide sends local terms to the selected telc centre');
L67  assert.match(formatSource, /product record/i, 'the guide gives readers an exact-product record');
L68  assert.match(formatSource, /diagnostic record/i, 'the guide gives readers a reusable practice diagnostic');
L69  assert.match(formatSource, /both the written and oral (?:parts|examinations).*60%/is, 'the guide explains the exact-product pass rule');
L70  assert.match(formatSource, /general estimate.*not.*guarantee|not a guaranteed delivery date/is, 'the guide bounds the published result estimate');
L71  assert.match(formatSource, /profession-specific|nursing|medical|school/i, 'the guide excludes materially different variants');
L72  assert.match(formatSource, /selected telc examination centre/i, 'the guide names the local execution owner');
L73  assert.doesNotMatch(formatSource, /real exam questions|copied test items|exam dumps/i, 'the guide does not make unsupported leaked-material claims');
L74  assert.doesNotMatch(formatSource, /(?:€|EUR|\$)\s?\d+|(?:result|certificate|pass|acceptance) is guaranteed|guarantees? (?:a |the )?(?:result|certificate|pass|acceptance)|universally accepted|same day or within a short window/i, 'the guide avoids fixed local facts and positive guarantees');
L77  assert.match(formatHtml, /Official sources last checked: <time datetime="2026-08-14">2026-08-14<\/time>/, 'the generated format guide renders its bounded source-review date');
L78  assert.doesNotMatch(formatHtml, /Official verification pending/, 'the reviewed format guide does not render a conflicting pending state');
L79  assert.match(formatHtml, />Coverage: orientation guide<\//, 'the format guide remains visibly outside mature states');
```

处置同 ⑭：`:54–60` 状态锁一律不动；`:61–65` frontmatter 字段不得删改；`:67–72` 正文保留短语；`:73–74` 被禁断言（**`:74` 含 `(?:€|EUR|\$)\s?\d+` 与 `\b\d+\s?(?:hours?|days?|weeks?)\b` → 禁写任何金额与固定时长**）；`:77–79` 渲染断言；`:40` build 🚫 禁止执行。

#### 3.4.1 「不许删」到底是哪几句：唯一支撑实测（2026-10-27）

改写时最容易犯的错，是把「正文短语必须保留」理解成「这些句子一句都不能动」，于是不敢做任何措辞合并。**正确口径是：只有「唯一支撑」的句子不能删，其余可以合并措辞。**

判据（可机械复现）：把每条 `assert.match(正文, /regex/)` 的正则展开到 md 逐行，统计**能单独满足它的行数**——`1` 行即唯一支撑（删该行必红）；`≥2` 行即多重支撑（删任一行不会红，只会在删到 0 行时红）。

**护理页**（`telc-work-nursing` → `telc-b1-b2-germany-work-nursing.md`）

| 断言 | 支撑行 | 性质 |
| --- | --- | --- |
| `:29` 六列表头 | md **L81** | 🔴 **唯一支撑** |
| `:28` `authority record` | L77 / L79 / L104 | 3 处支撑，可合并 |
| `:31` `regulated profession` | L50 / L84 | 2 处支撑 |
| `:32` 否定式（4 个分支：`does not decide` / `cannot decide` / `does not establish` / `cannot establish`） | L39 / L46 / L65 / L73 / L84 | 5 行命中，可合并 |
| `:30` `profession … work location` | L22 / L41 / L50 / L52 / L83 / L93 | 6 处支撑 |
| `:25-27` `Competent professional recognition authority` | L19 / L41 | 2 处支撑 |
| `:25-27` `Employer`（断言带 `i`，`Employers` 也会命中） | 12 行：L3 / 19 / 22 / 41 / 42 / 43 / 44 / 65 / 73 / 87 / 95 / 104 | 12 处支撑，最稳 |
| `:25-27` `German mission or foreigners authority` | L19 / 22 / 43 / 73 / 85 / 96 | 6 处支撑 |
| `:25-27` **`telc and selected telc examination centre`** | md **L44**（四主体表第四行行首） | 🔴 **唯一支撑** |

**格式页**（`telc-window-1` → `telc-b1-b2-exam-format-and-preparation.md`）

| 断言 | 支撑行 | 性质 |
| --- | --- | --- |
| `:69` `both the written and oral (?:parts\|examinations).*60%` | md **L67** | 🔴 **唯一支撑** |
| `:70` `general estimate.*not.*guarantee` / `not a guaranteed delivery date` | md **L69** | 🔴 **唯一支撑** |
| `:67` `product record` | L37 / L39 / L138 | 3 处支撑 |
| `:68` `diagnostic record` | L87 / L89 / L99 / L105 / L138 | 5 处支撑 |
| `:72` `selected telc examination centre` | L18 / L21 / L44 / L69 / L115 / L138 | 6 处支撑 |
| `:71` `profession-specific\|nursing\|medical\|school` | L17 / L37 | 2 处支撑 |

> **据此收敛红线：两页合计只有 4 处绝对不许删**（护理 md **L44**、护理 md L81、格式 md L67、格式 md L69）。其余短语在保留语义的前提下可合并改写。把全部 15 条都写成红线，反而会让执行者认为契约过度保守而整体打折。
>
> **L44 是 2026-10-27 补测出来的第 4 处，第一版漏了它。** `:26` 用 `new RegExp(authority,'i')` 逐串构造，四条串的支撑密度差得极远：`Employer` 12 行、`German mission…` 6 行、`Competent professional…` 2 行，而 `telc and selected telc examination centre` **只有 L44 一行**。注意 `L19` 写的是「telc **as exam owner** and selected…」、`L22` 写的是「telc and **the** selected…」，都**不**含这条串——所以它们不构成支撑。窗口二若重写四主体表（§0.1 第 8 条本来要求补 `four-owner map` 句式），把这一格改成「telc as exam owner…」即立刻红。
>
> **L44 的精确失效面（2026-10-27 四变体实测，`[done] parsed 4/4`）**：L44 是三列表格的一行（`|` 切出 5 段含首尾空）。**只有格 1（`telc and selected telc examination centre`）是硬的**：
>
> | 动作 | 测试 | 性质 |
> | --- | --- | --- |
> | 删格 1 文字 / 删整行 | 🔴 红 1 条（仅 `:26` 第 4 条串） | 契约问题，`Employer` 另有 11 行不受牵连 |
> | 改格 2 / 改格 3 | 绿 | **合法改写**（格 2 正是补 `four-owner map` 的安全落点） |
> | 丢 `\|`、列数不一致、格 3 挤进格 2 | **绿** | **纯渲染质量损失，机械检查覆盖不到**——只能人工核 |
>
> 把后两行写成同一个坑，执行者会以为表格结构有测试兜着；实际没有。同页 L81 还有一张**六列**表（`:29` 钉的是那张），两张表列数不同，不要求一致。
>
> 注意 `doesNotMatch` 类断言语义相反：**0 行命中即通过**。对它们要衡量的是「md 里离红线多近」，不是「有几行撑着」。
>
> **本表已于 2026-10-27 用条目级哨兵复证**：15 条断言 + 4 条主体串全部命中、`[done] parsed 15/15 entries; files 2/2`、零偏差。护理页 `wc -l` = 112、格式页 `wc -l` = 147。

**⚠️ 数量型契约的余量风险（窗口二必须知道）**：`Scenario ≥2`、资产标题 `≥3` 是**计数阈值**，不是「每节都被断言覆盖」。判据是 `count_after >= threshold`，因此：
- 某页若恰好写 2 个 Scenario / 3 个资产标题（余量 0），**下一窗口任何一次正当的删节都会让它红**；
- 若有 4 个 Scenario，删一个 → 3 ≥ 2，**测试不报警，但内容已丢**——机械检查覆盖不到的损失。

实测两个临界样本（`goethe-b1-vs-telc-b1.md`，Scenario 2/2、Asset 3/3）：删任一整节，`germany-b1-cluster:68/69` 与 `scheme-3:64/65` 同时红，文案分别是 `gives at least two bounded reader scenarios` / `includes at least two bounded scenarios`、`gives at least three original reader assets` / `includes at least three distinct original reader assets`——**靠 message 措辞即可分辨是哪套报的**。

> **对窗口二的处置**：**不允许为凑余量而注水标题**（多写一个空壳 `### Scenario:` 会直接降低内容质量，SEO 与读者双输）。正确做法是「结构按内容需要写，接受 0 余量」，并在 §6.2 S5 的构建后目视核验里记下当时的计数，供后续窗口判断余量。
>
> **作用域（分两段读，别混）**：`### Scenario:` / `### Original asset:` 这两条 `###` 级契约属 `germany-b1-cluster.test.js:68-69`，**只对 8 篇 B1 支柱生效**；`scheme-3:64-66` 是另一套（`#{2,3}` 均可、资产为关键词正则）。
> - **对 telc 两页**：`germany-b1-cluster` 不管它们（它们不在那 8 篇字面清单里），只受 `scheme-3` 约束 → **不会两套同红**。
> - **对 8 篇 B1 支柱**：8 篇 ⊆ `scheme-3` 的 15 篇，交集正好 8 篇 → 这 8 篇**同时**受两套约束，删一个 Scenario 节会**两套同红**。本节上方「实测两个临界样本」那段用的样本 `goethe-b1-vs-telc-b1` 就是这种情形。
>
> 上一版这句写成「不存在『两套同红』的情形」，与本节上方「实测两个临界样本」那段自相矛盾，已按上表拆开。


**✅ 已裁定：路 3（2026-10-27）。两页内容改写与 `updatedDate` 前移整体推入窗口二。**

三条路当时的权衡与最终裁定依据：

| 路 | 内容 | 结论 |
| --- | --- | --- |
| 路 1 | 本窗口改 `updatedDate` 到改写日，同步改 `telc-work-nursing:12`、`telc-window-1:54` | **不采用**。本窗口不写内容，没有「改写日」可填 |
| 路 2 | 改内容但不动 `updatedDate` | **永久否决**：页面声称「2026-08-14 后未更新」，与事实不符 |
| **路 3** | 内容改写 + `updatedDate` 前移 + 两行断言改动，全部进窗口二，与源复核同批 | **✅ 采用** |

裁定理由（team-lead 原文四条，执行者可直接引用）：

1. **两页是 `noindex`，本轮 AdSense 审核根本看不到它们** → 本窗口重写它们对审核零收益。
2. **在「不做源复核」的前提下重写到支柱标准，本身就不诚实** → 会把未复核事实写成已复核语气。
3. **`telc-work-nursing.test.js:36` 自己 `execFileSync('npm','run','build')`** → 改内容即需验证，验证即构建，与并行窗口冲突。
4. **窗口二本来就要动那 2 行 `updatedDate` 断言** → 内容改写与契约改动同批，只做一次。

**因此本窗口对两篇 `telc-*.md` 的授权是零。** §1.1 / §1.2 的 frontmatter 表、§0 门槛表、§6.2 的 S1–S3 全部转为窗口二作业单；本窗口只在 §4.3 的两处 `<p>` 上留痕。

### 3.5 本窗口的测试执行禁区（硬约束）+ 三条方法论告警

**🚫 本窗口禁止执行以下三个测试文件，无例外：**

| 文件 | 触发行 | 危害 |
| --- | --- | --- |
| `tests/telc-work-nursing.test.js` | **:36** `execFileSync('npm', ['run', 'build'], { stdio: 'pipe' })` | 自起构建 |
| `tests/telc-window-1.test.js` | **:40** 同上（一次构建同时供两页断言） | 自起构建 |
| `tests/scheme-3-release-candidate.test.mjs` | **:76** `execFileSync('npm', ['run', 'build'], { cwd: root, stdio: 'pipe' })` | 自起构建 |

多个写者并发跑 `npm run build` 会互相清空 `dist/.prerender`，造成**模块缺失型报错**（表现为 import 失败，而非目标断言失败），极难归因。本窗口**一律不跑**；它们的验证统一排到 **Q8 收口构建之后**、单进程独占执行。

> **注意口径：上表只是「与 Q4 直接相关」的 3 个，不是全部。** 全仓**直接** `execFileSync('npm', …)` 的测试是 **14 个文件 / 16 处调用**（2026-10-27 实测，三路一致：`rg -l` = 14、`rg -o` 计调用 = 16、`ls tests/*.js tests/*.mjs` = 69 作阳性对照），**16 处的参数全部为 `['run','build']`**，无 `test` / `lint` 变体。另有 `m2a-*` 走**间接**构建，队列 §17 记作第 15 项：
> `adsense-risk-exposure`、`canada-window-b`、`finland-window-b`、`italy-window-b`、`netherlands-window-b`、`m2b-checklist-export`、`scheme-3-gates`、`scheme-3-release-candidate`、`source-review-render`、`task-2-p0-render`、`task-4-guides-render`、`task-5-source-ledger`、`telc-window-1`、`telc-work-nursing`。
> **任何 worker 窗口都不得单独跑它们。** ⚠️ 上面的「14 / 15」是当时的实测，**不是常量**——校验时以 `grep -rlE …` 现跑结果与队列 §17 清单为准，不要拿数字去对条目数。
>
> **Q8 执行构建必须带阈值环境变量。** 实证链（两处都已核）：
> - `package.json:4-6`：`"clean:dist": "rm -rf dist"`，`"prebuild": "npm run clean:astro && npm run clean:dist"` → **每次 build 都会先 `rm -rf dist`**（约 169 个文件）；
> - Astro 内部 `deleteViteFolder` 还会删 `dist/.prerender/.vite/`（约 50 个文件）；
> - 两者都命中 `scripts/safe-delete-bulk-guard.cjs` 的默认阈值 50（`count >= threshold` 即拒）。
>
> 失败信息长成 `Command failed: npm run build`，**极易被误读成内容回归**。故：
> ```bash
> CODEBUDDY_SAFE_DELETE_BULK_THRESHOLD=100000 npm run build
> CODEBUDDY_SAFE_DELETE_BULK_THRESHOLD=100000 node --test tests/*.test.js tests/*.test.mjs
> ```
> 另见 `drafts/EXECUTION-QUEUE-2026-10-27.md` §17.2。

**✅ 本窗口可安全执行的测试**（已确认 `import` 只读 md / 读 manifest，无 `execFileSync`、无 `spawn`）：`tests/scheme-3-english-content-quality.test.mjs` 及其它纯静态内容契约。

**告警 1：`readingTime` 一律以本测试为准，勿信任何二手清单。** 2026-10-27 窗口内曾流出一份「8 篇 pillar `readingTime` 违约」的表，事后查明是**过程态误报**（详见告警 3）：当时这 8 篇正处于免责收敛批次的改写中途，正文已改、`readingTime` 尚未同步，红是真的，但属瞬时态。**当前**判据为：`node --test tests/scheme-3-english-content-quality.test.mjs` → `pass 1 / fail 0`，15 篇 pillar 的 `readingTime` 与 `ceil(words/200)` **15/15 一致**。照那份表去「修」这 8 篇，会把 8 处正确值改错，把全绿测试改红 8 处。

> **同一窗口还出现过反方向的错：假绿。** 当时的度量脚本把词类字面量写成两个**直引号** `''`（而非 `'` + `’`/U+2019），于是 `centre’s` 这类所有格被拆成两词、词数虚高约 10–25；`goethe-a1-test-centers` 因此显示 `rt 9 / ceil 9 ok`，而按真值（1,582 词，`ceil = 8`）它当时是**真违约**。**教训是双向的**：错的度量既会造出假红，也会盖住真红。度量脚本必须把词类写成 Unicode 转义 `['\u2019-]`，并自带探针（`the centre’s don't it's` → 4 词），否则「全部通过」不可信。

复核口径（两步都必须做，不可只做第一步）：

```bash
node --test tests/scheme-3-english-content-quality.test.mjs   # 判据
for f in <涉及的 md>; do stat -f '%Sm %N' -t '%Y-%m-%d %H:%M:%S' "$f"; done
date                                                          # 与上面 mtime 比对
```

**告警 2：本机 `grep` 的 BRE 交替符 `\|` 失效，返回的是假阴性。** 已实测：

```bash
grep -c 'englishPillarSlugs\|chinesePillarSlugs' src/data/publication-manifest.ts   # → 0（错）
grep -cE 'englishPillarSlugs|chinesePillarSlugs' src/data/publication-manifest.ts   # → 4（对）
```

**本文件所有多模式检索结论均已用 `grep -E` 或 node 正则复验。** 后续任何人在此仓库做「某文案/某断言不存在」的断言时，必须用 `-E`，否则结论无证明力。

**告警 3（对 Q8 收口直接适用）：内容门禁测试在有 writer 活跃期间不作为验收依据。**

正文改写与 frontmatter（`readingTime` / `updatedDate` / `seoTitle`）**不同步落盘**，因此任何时刻都存在「文本已改、字段未改」的帧；此时 `scheme-3-*`、`m2a-*`、`telc-*` 报红是**过程态**而非缺陷。同年 10-27 的 8 篇误报即由此产生（8 篇 mtime 密集落在 `18:18:50` / `18:20:23`，而读数发生在 `18:18–18:19`）。

收口纪律三条：
1. **静默前置**：等所有 writer 停止写入后再跑；
2. **mtime 对账**：目标文件 mtime 落在读数窗口内 → 结论作废，重取；
3. **记录时点**：报告里写出运行时的 `date`，使「同一测试两个相反结论」可回溯到不同时刻。

> 教训归属：那次不是「谁的数据不可靠」，是**取样落在写入窗口内**。此条已同步 team-lead 更正归因。

---

## 4. 内链落点（精确到行）

### 4.0 先确认现状

**改动前（本 spec 立项时）**：全量 `grep -rnE` 核实，两个目标 slug 的**唯一**出现位置是自己的 frontmatter + 其它 noindex telc 页的 `nextGuideSlug`/`supportingGuideSlugs`。**任何可索引页都没有指向它们的链接**（§A.0 的「0 入链」成立）。

**改动后（2026-10-27 本窗口落地，复验命令见下）**：
```bash
grep -rnE 'telc-b1-b2-(germany-work-nursing|exam-format-and-preparation)' src/ \
  --include='*.astro' --include='*.ts'
```
→ 仅命中 `src/pages/germany-b1-settlement-citizenship.astro:88` 与 `:101`。即现状为「**1 个可索引页 → 2 条链接**」，仍不满足 §A.9 的「≥2 条索引页入链」（该条只能在窗口二验收，见 §4.4 下方说明）。

### 4.1 §A.6 对批次一共列了几条？
§A.6 表格里属于第一批（护理 + 格式）的是 **3 条**，不是 4 条；第 4 条 `telc-b1-b2-fees-and-test-centers` 属于第二批。派单描述的「4 条（nursing ×2、exam-format ×1）」应为笔误。

### 4.2 ⚠️ §A.6 推荐的两条落点当前**被测试契约挡住**

§A.6 建议从 `/guides/goethe-b1-vs-telc-b1/` 向护理页与格式页各挂 1 条。但 `tests/germany-b1-cluster.test.js:74-78` 对 8 篇 B1 pillar 正文的**所有** `/guides/*` 链接做了封禁：
```js
for (const [, href] of body.matchAll(/\]\((\/[^)#?]+)\/?(?:[?#][^)]*)?\)/g)) {
  if (!href.startsWith('/guides/')) continue;
  const destination = href.split('/').filter(Boolean).at(-1);
  assert.ok(coreSlugs.has(destination), `${file} directly links only to a retained B1 pillar: ${href}`);
}
```
`coreSlugs`（第 16 行）= 8 个 B1 slug，**不含 telc**。因此：

- **方案 A（推荐，零契约让步）**：入链改挂 `.astro` 页，不碰 B1 正文。
- **方案 B（需 team-lead 批准）**：把两个 telc slug 加进第 6–15 行 `requiredCoreGuides` → `coreSlugs` 自动扩容。代价：该文件第 55/57/64-69 行会连带把 telc 页纳入「B1 pillar 日期/词数/契约节」的强校验，语义上把 telc 说成 B1 pillar，**不推荐**。

### 4.3 方案 A 的具体落点（✅ 本窗口已全部落地）

> 以下「实际落地文本」与磁盘逐字一致，行号为落地后行号（2026-10-27 复核）。

**落点 1｜护理页 ← `/guides/germany-b1-settlement-citizenship/`（B1 hub，可索引）**
- 文件：`src/pages/germany-b1-settlement-citizenship.astro`
- 小节：`<h2 id="compare-proof">Compare only possible proof</h2>`（第 86 行）
- 插入位置：该小节原段落之后 → **新第 88 行**（第 87 行为空行）
- 锚文本：`telc B1/B2 work and nursing decision boundary`
- 目标 URL：`/guides/telc-b1-b2-germany-work-nursing/`
- 实际落地文本：
  ```html
  <p>If the purpose is work or regulated nursing rather than a settlement file, read the <a href="/guides/telc-b1-b2-germany-work-nursing/">telc B1/B2 work and nursing decision boundary</a>, which separates recognition, employer and immigration decisions before any product choice.</p>
  ```
- 契约检查：`scheme-3-route-hubs.test.js:38-41` 只禁 `/guides/category/` 与 retired slug → 允许；`source-review-render.test.js:297-298` 要求内链带尾斜杠、无 `.html` → 上述 href 满足。

**落点 2｜格式页 ← 同一 B1 hub 的备考小节**
- 文件同上
- 小节：`<h2 id="preparation-support">Optional preparation support</h2>`（第 99 行）
- 插入位置：该小节首段之后 → **新第 101 行**（第 100 行为空行）
- 锚文本：`telc B1 and B2 format baseline`
- 目标 URL：`/guides/telc-b1-b2-exam-format-and-preparation/`
- 实际落地文本：
  ```html
  <p>If the receiving authority has already confirmed a telc product, use the <a href="/guides/telc-b1-b2-exam-format-and-preparation/">telc B1 and B2 format baseline</a> to turn the official mock into a diagnostic record before booking.</p>
  ```
- 两条目的语序刻意写成「条件在前、链接在中、边界在后」（`If …, read/use the <a>…</a>, which …`），使锚文本落在句中而非句首，避免两个相同句式的 `<p>` 相邻形成模板腔。

**落点 3（自动获得，无需改文件）｜两页 ← `/guides/` 索引**
- `src/pages/guides/index.astro` 以 `getEnglishGuidePublicationPolicy(...).index` 生成卡片，解封后两页自动出现 → 这是**第 2 条独立入链**，可满足 §A.9「≥2 条索引页入链」。
- 执行后须核验：`node -e` 或构建产物 grep `/guides/telc-b1-b2-germany-work-nursing/` 出现在 `dist/guides/index.html`。

**落点 4（同批自动）｜格式页 ← 护理页**
- 护理页 `nextGuideSlug` 已指向格式页；两页同为 pillar 后 `RelatedGuides` 会渲染该链接 → 格式页获得 1 条 pillar 入链（但属同族环链，**不计入「独立入链」**）。

**仍需人工决定**：§A.6 中「`/tools/exam-comparison/` 工具页说明区」属于**第二批**（fees 页），本批不做。

**⚠️ 关于 `/guides/` 索引「自动卡片」——team-lead 要我确认的那一点，结论是：本窗口不会出现。**
`src/pages/guides/index.astro:18` 的过滤是
```js
.filter((guide) => getEnglishGuidePublicationPolicy({ slug, contentStatus: guide.status, sourceReviewStatus, noindex, adsEligible }).index)
```
即按**发布策略 `.index`** 过滤，而不是直接看 `noindex` 字段；而 `getEnglishGuidePublicationPolicy` 的 `.index` 同时被三件事把住：(a) slug ∈ `englishPillarSlugs`、(b) `mature`（reviewed + complete-route/core-route）、(c) `noindex !== true`。
本窗口 (a)(c) 都不满足 → **卡片不会渲染**。所以：
- 本窗口的真实入链**只有 B1 hub 的 2 条**（§4.3 落点 1、2），它们指向的仍是 noindex 页（合法：`noindex,follow` 仍传权重，且窗口二翻转后立即变成正式的 pillar 入链）。
- `/guides/` 卡片与护理→格式的同族链接**在窗口二 manifest 翻转后自动出现**，不需要额外改模板。
- 因此「≥2 条索引页入链」这一条件**只能在窗口二验收**，本窗口只能做到「1 个索引页给出 2 条链接」。这一点必须在 Q4 交付说明里写清，避免被误判为未完成。

### 4.4 入链矩阵（分窗口）

| 目标页 | 本窗口可得 | 窗口二自动获得 |
| --- | --- | --- |
| 护理页 | B1 hub `#compare-proof`（新，1 条）**✅ 已落地第 88 行** | `/guides/` 索引卡片；`germany-b1-settlement-citizenship` 已有链接继续有效 |
| 格式页 | B1 hub `#preparation-support`（新，1 条）**✅ 已落地第 101 行** | `/guides/` 索引卡片；护理页 `nextGuideSlug` 渲染的同族链接 |

**落地核验（2026-10-27，`git diff` 实取）：**
- 该文件相对 HEAD：`15 insertions(+), 18 deletions(-)`；其中**本窗口 2 条 `<p>` 贡献 `+2 insertions / 0 deletions`**，另 13/18 属本会话之前已存在的未提交改动（`B1RoutePaths` 引入、`corePages` 8 条改名、`enableAds={false}`、`#preparation-support` 列表收并为单段、`last-updated` 日期行）。
- `corePages`（第 19–28 行，仅用于 JSON-LD `hasPart`）**改动前后均为 8 条**，本次两个 `<p>` 未触碰该数组。
- 全仓 `grep -rnE 'telc-b1-b2-(germany-work-nursing|exam-format-and-preparation)' src/ --include='*.astro' --include='*.ts'` 仅命中上述 2 行 → **除本页外，`src/` 内无第二处引用**（§4.0「可索引页 0 入链」现状由本条改写为「1 个可索引页给出 2 条」）。

§A.6 其余 1 条（`goethe-b1-vs-telc-b1` 正文内的 2 条）**永久不走**——被 `germany-b1-cluster.test.js:74-78` 结构契约挡住，已按决策 (1) 放弃；如后续确需该锚点，唯一正当路径是把 telc 页做成真正的 B1 pillar（属窗口二之后的独立议题）。

---

## 5. 「不得写」红线清单（附正确写法原文，照抄这些句子）

> 逐条对照。**左边是禁止，右边是本仓库现有的正确写法原文**（可直接引用/改写，不必新增事实）。

| # | 禁止写法 | 正确写法（现有原文，可照抄） | 出处 |
| --- | --- | --- | --- |
| 1 | 「中国大陆没有 telc 考点」「国内无 telc 考场」 | `Use only a currently bookable date supplied by the selected centre for the exact product. A provider catalogue or centre finder does not prove a seat, registration deadline, result date or certificate-delivery date.` | `telc-vs-goethe-for-german-visa.md:70` |
| 2 | 把「查不到」写成「一定没有」 | ⚠️ **本条无现成句可抄 → 必须新写，且新写句要标「需 source-review 后才能上线」**。建议形态：「An official centre search that returns no result for your city is a finding to confirm with telc, not proof that no centre exists.」 | — |
| 3 | 把某国使领馆清单写成通用规则 | `The Federal Foreign Office visa page is a process entry point, not a universal list of accepted certificates. Follow it to the mission responsible for your application and use that mission's current route instructions.` | `telc-vs-goethe-for-german-visa.md:54` |
| 4 | 「B2 就够」「某州要 C1」「B1–B2 视州而定」 | `Do not copy a threshold, accepted certificate or specialist-language process from another city, federal state, profession or applicant. The national portal helps locate the decision owner; the named competent authority controls the actual case instruction.` | `telc-b1-b2-germany-work-nursing.md:59` |
| 5 | 把中介的四主体分级表搬进来当结论 | `Do not collapse these rows into one approval. A job offer does not establish professional authorisation or immigration permission. A recognition notice does not establish that a visa will be issued. A telc catalogue page does not establish that a receiving body accepts that certificate.` | `telc-b1-b2-germany-work-nursing.md:46` |
| 6 | 按难度/通过率/价格给产品排名 | `Do not rank products by unverified difficulty, recognition, speed, pass rate or price. A nearby centre or provider claim is not a substitute for the receiving authority's instruction.` | `telc-vs-goethe-for-german-visa.md:123` |
| 7 | 写任何具体考试费用 / 价格区间 | 现有 4 篇 telc 页**全部无价格**，这是对的。护理页只写 75 行那句：`…ask the selected telc examination centre to confirm current availability, delivery format, fee, registration, …`（把费用留给中心，不写数字） | `telc-b1-b2-germany-work-nursing.md:75` |
| 8 | 写护理认可见习/知识考试的**金额或时长承诺** | 只写「谁发通知、谁考试、谁出结果」三问；任何具体金额/周数 **必须标「需 source-review 后才能写」** | —（新内容） |
| 9 | 写具体州级机构名 | `Do not copy … from another city, federal state, profession or applicant.`（同 #4）；机构名只能写「由 Recognition Finder 就你的职业与工作地查出的主管机关」 | `telc-b1-b2-germany-work-nursing.md:59` |
| 10 | 承诺「证书终身有效 / 一年内有效」等时效 | 现有页无此类断言。涉及时效只能写「向接收机关确认当前时效要求」 | — |

**新写事实的处理规则**：凡是 A.4.2 第 3、6 节要求的扩写内容（Recognition Finder 输入/输出逻辑、认可见习与知识考试的通知/考核/出结果链条），若执行者当天无法从官方页面逐条核对，**必须**在句中标注 `[需 source-review]` 并**不要**把该页翻成 `noindex: false`——宁可分批。

---

## 6. 执行顺序与验收命令

### 6.1 硬性批次关系（**窗口二**；本窗口不适用）

> 本窗口（路 3）不执行本节任何一条——本窗口只落地 §4.3 两行 `<p>`，已完成。以下转为窗口二纪律。

1. **护理页与格式页同批改**：两页共用同一内容契约，拆开做会出现「格式页有 `Who this is for`、护理页没有」的不一致；且窗口二 `source-review-render:113` 的 next-guide 渲染要求两页同时可索引。
2. **内容先于入链**：先按 §0 契约把两页正文写到位，再往 B1 hub 加链（否则链到的是半成品）。
3. **窗口二解封前不产生任何计数变化** → 在真正翻 manifest 之前，9 处计数测试、`launch-check.js`、`CONTENT_MAP.md` **一律不动**（见 §7）。
4. **`adsEligible` 保持 `false`**：`telc-work-nursing:18`、`telc-window-1:60` 双重锁定，翻 true 会同时改变 AdSense 页面分类与商业页判定。
5. **两页改写完成后必须独占跑一次 build**：`telc-work-nursing.test.js:36` 与 `telc-window-1.test.js:40` 各自 `execFileSync('npm','run','build')`，与 `scheme-3-release-candidate:76` 三者互斥 → **任何时刻只有一个构建进程**。⚠️ 这三个文件在本窗口**禁止执行**（§3.5）。

### 6.2 步骤与每步验收（**窗口二**；S4 已于本窗口完成）

| 步 | 动作 | 验收命令 | 预期 |
| --- | --- | --- | --- |
| S1 | 内容改写（护理页）：补 `## Who this is for`、`## Key decisions`、`## Common mistakes`、≥2 `## Scenario:`、≥3 资产标题、`four-owner … map` 句式；扩到 **2,000–2,300 词（门禁口径）**；**保留** `telc-work-nursing:20-32` 的全部 frontmatter 字段与正文短语；**避开** `:33-34` 的两条被禁断言 | §6.4 预检脚本 | `words` 落在区间、5 个契约节各 1 次、`Scenario ≥2`、assets ≥3、four-owner 命中 |
| S2 | 内容改写（格式页）：同契约；`## Common mistakes` → `## Mistakes to avoid`（大小写）；补「官方样题获取路径」；**保留** `telc-window-1:67-72` 的短语、避开其 `:73-74` 两条被禁断言（含 `(?:€|EUR|\$)\s?\d+` 禁金额） | §6.4 预检脚本 | 同上 |
| S3 | frontmatter：`updatedDate` 前移到**真实复核日**（与 `sourceReviewedAt` 同批，路 3）、`readingTime` 重算、`seoTitle` 新增（≤49）；**`noindex`/`contentStatus`/`sourceReviewedAt` 的改动与 manifest 翻转同批**、`adsEligible` 一律不动 | `node tests/telc-work-nursing.test.js` 与 `node tests/telc-window-1.test.js`（**顺序跑，各自会 build；禁止并行**） | 两条 `updatedDate` 断言同步改为新日期后全绿 |
| S4 | ✅ **本窗口已完成**：`src/pages/germany-b1-settlement-citizenship.astro` 第 88 / 101 行两条 `<p>`（带尾斜杠、无 `.html`） | `node tests/scheme-3-route-hubs.test.js && node tests/germany-b1-cluster.test.js && node tests/source-review-render.test.js` | 全绿（后者验证 hub 渲染链接合规）——**待 Q8 收口构建后统一验证** |
| S5 | 构建期目视核验 | `npm run build` 后 grep `dist/guides/telc-b1-b2-germany-work-nursing/index.html` | 解封前仍应有 `noindex,follow`；徽标仍是 `Coverage: orientation guide`；`Official sources last checked` 跟随新 `sourceReviewedAt` |
| S6 | 全量回归（**窗口二**结束） | `npm test`（**独占运行**） | 全绿；计数断言按新名单同步 |

### 6.3 日期字段（已裁定路 3，无待决项）

**本窗口**：`updatedDate`、`sourceReviewedAt`、`noindex`、`contentStatus`、`adsEligible` **一律不动**（两页仍为 `2026-08-14` / `true` / `starter-overview` / `false`）。本窗口不写任何内容，没有「改写日」存在。

**窗口二（同批，一次到位）**：

> **✅ 已裁定（2026-10-27，team-lead）：走 (B) 真做一次 telc 源复核。** (A) 不采用。
>
> (A) 不采用的理由（原文）：**它不是不诚实，而是会把一个「本该做的复核」变成「一个被永久豁免的例外」，下次没人记得为什么豁免。** 且窗口二的定义里本来就含「telc 真实源复核」这一项，它不是额外开销，是既定工作。
>
> 做了真复核，(B) 的日期就**真的是新的**，不需要任何映射去圆谎——这是选 B 的实际收益，不是道德收益。

1. **做一次真实的 telc 源复核**（核 `telc.net` 的 `telc Deutsch B1·B2 Pflege` 与 `telc Deutsch B2` 两个产品页、以及 `anerkennung-in-deutschland.de` 的认领入口），取**实际复核日**作为 `sourceReviewedAt`。**不得**为了省事填 `2026-09-13`。
2. `updatedDate` 与 `sourceReviewedAt` 同批前移到该日；
3. 同步改 `telc-work-nursing:12-13`、`telc-window-1:54-55` 两处日期断言到同一真实值；
4. 给 `scheme-3-english-content-quality.test.mjs:43-47` 的 `expectedReviewDate` 换成 **`Map<slug, date>` 的按 slug 显式映射**，telc 两页映射到第 1 步的实际复核日，其余页保持现值。
   ⚠️ **不接受 blanket 常量**：不要再写「非 A1 slug → 某一天」。这个假设**今天已经被证伪一次**——两页真实是 `2026-08-14`，而测试写死 `2026-09-13`。把单值常量换成映射，是这条断言的正确形态，与日期本身改成什么无关。
5. manifest 翻转（§2）。

**🔒 不可协商（写死）**

| 禁止 | 后果 |
| --- | --- |
| **让页面去迁就测试的 `2026-09-13`**（即把 `sourceReviewedAt` 写成 9-13） | 伪造来源披露：页面声称在 9-13 复审过 telc 源，而实际没有。**这比测试红严重得多**，且一旦上线无法追溯撤回 |
| 沿用 `:43` 的 blanket 兜底（非 A1 → `2026-09-13`）而不建显式映射 | 同上，只是把伪造藏在代码里而非 frontmatter 里 |
| 只改 frontmatter 日期、不改 `:43-47` 映射 | 测试必红，且下一窗口会误判为内容问题 |

> 路 2（改内容但不前移 `updatedDate`）同样为永久禁区：页面会声称「2026-08-14 后未更新」，与事实不符，属披露造假。

### 6.4 本地预检脚本（只读，不写文件；别提交进 `tests/`）

```bash
node - <<'JS'
const fs=require('fs');
const bodyOf=s=>s.replace(/^---\s*[\s\S]*?\n---\s*/,'');
const W=b=>(b.replace(/https?:\/\/[^\s)]+/g,' ').replace(/<[^>]+>/g,' ').match(/\b[\p{L}\p{N}][\p{L}\p{N}'’-]*\b/gu)||[]);
for(const s of ['telc-b1-b2-germany-work-nursing','telc-b1-b2-exam-format-and-preparation']){
  const src=fs.readFileSync(`src/content/guides/${s}.md`,'utf8'), b=bodyOf(src), w=W(b).length;
  const one=re=>(b.match(re)||[]).length;
  console.log(s,'words',w,'| 2000-2300?',w>=2000&&w<=2300,'| <=2400?',w<=2400);
  console.log('  who',one(/^## Who this is for$/gm),'kd',one(/^## Key decisions$/gm),
    'mistakes',one(/^## (?:Common )?Mistakes(?: to avoid)?$/gm),
    'next',one(/^## Next action$/gm),'sources',one(/^## Official sources$/gm));
  console.log('  scenarios',one(/^#{2,3} Scenario:/gm),'assets',
    (b.match(/^#{2,3} .*(?:asset|worksheet|record|matrix|map|script|log|register|card|board|check|pack|template).*$/gmi)||[]).length,
    'fourOwnerMap',/four-(?:owner|party)[^\n]{0,80}map/i.test(b));
}
JS
```

---

## 7. 本窗口不做什么（边界，写死）

> 以下任一项**单独做**都会造成「页面声称已解封，但真实的 telc 源复核尚未发生」的不一致。本窗口全部不动。

| # | 禁止动作 | 具体对象 | 若违反的后果 |
| --- | --- | --- | --- |
| 1 | 不碰 publication manifest | `src/data/publication-manifest.ts`：`englishPillarSlugs` / `chinesePillarSlugs` / `contentStatus` 相关定义 / `noindexCategorySlugs` | 立刻触发 9 处计数断言红；且页面变可索引而源复核未做 |
| 2 | 不改 `noindex` | 两页 frontmatter 第 12 行 | `telc-work-nursing:16`、`telc-window-1:59` 直接红；同时把未复核页推进索引 |
| 3 | 不改 `contentStatus` | 两页 frontmatter 第 11 行 | `telc-work-nursing:15`、`telc-window-1:58` 红；徽标会从 `Coverage: orientation guide` 变成熟态，渲染断言（:43 / :79）连带红 |
| 4 | 不改 9 处计数测试 | §3.1–3.2 清单（`scheme-3-publication`、`release-candidate`、`content-map`、`fan-270-seo`、`site.test`、`m2a-local-fees-centres`、`english-content-quality` 等） | 测试与实现失去同步，窗口二无法判断谁错 |
| 5 | 不改 `scripts/launch-check.js` | 第 392 / 400 / 429 行阈值与消息 | `site.test.js:174` 的字面量守护会红；launch-check 与真实产物不一致 |
| 6 | 不改 `docs/CONTENT_MAP.md` 计数 | 第 16–22 行的 15/5/38/12/17/41/64/14 | `scheme-3-content-map` 红，且文档宣称的站点规模与事实不符 |
| 7 | 不改 `sourceReviewedAt` | 两页 frontmatter 第 8 行 | 会伪造「已完成 telc 源复核」的披露 |
| 8 | 不写未复核的新事实 | 尤其 A.4.2 第 6 节（认可见习/知识考试的通知-考核-出结果链条） | 一旦写入即须复核，否则违反上一条 |
| 9 | 不改 `adsEligible` | 两页第 13 行 | 双重测试锁定 + 改变 AdSense 页面分类 |
| 10 | 不把 telc 页加入导航 | `src/data/site.ts` 的 `routes[]` | `site.test.js:258` 明令「primary route navigation does not promote withheld guides」 |
| 11 | **不执行会自起构建的三个测试** | `tests/telc-work-nursing.test.js`（:36）、`tests/telc-window-1.test.js`（:40）、`tests/scheme-3-release-candidate.test.mjs`（:76） | 并发 build 互清 `dist/.prerender`，报错表现为模块缺失，极难归因。统一排到 Q8 收口构建后（§3.5） |
| 12 | **不改两篇 `telc-*.md` 的任何字节** | 两页全文（含 frontmatter `updatedDate`/`readingTime`/`seoTitle`） | 路 3 已把内容改写整体推入窗口二；本窗口单独改内容 = 无源复核下的重写，且立即触发 `telc-work-nursing:12`/`telc-window-1:54` 红 |

**本窗口允许且仅允许改动的文件（1 个，已执行完毕）：**

| # | 文件 | 改动 | 状态 |
| --- | --- | --- | --- |
| 1 | `src/pages/germany-b1-settlement-citizenship.astro` | +2 个 `<p>`（第 88、101 行） | ✅ **已落地**，`git diff` 贡献 `+2 / -0` |
| — | ~~`telc-b1-b2-germany-work-nursing.md`~~ | 正文 + frontmatter | 🚫 窗口二 |
| — | ~~`telc-b1-b2-exam-format-and-preparation.md`~~ | 同上 | 🚫 窗口二 |
| — | ~~`tests/telc-work-nursing.test.js:12`、`tests/telc-window-1.test.js:54`~~ | 两行日期期望 | 🚫 窗口二（随源复核同批） |

---

## 8. 裁决记录（2026-10-27）

| 议题 | 裁决 | 落地位置 |
| --- | --- | --- |
| 入链方案 | **方案 A**：不动 `germany-b1-cluster.test.js:74-78` 的 `coreSlugs`；入链走 B1 hub 两处 | §4.2–4.4 |
| 日期与解封 | **本窗口不翻 manifest**、`sourceReviewedAt` 保持 `2026-08-14`；**窗口二走 (B)：真做一次 telc 源复核，用实际复核日**。(A)「永久保持 8-14」**不采用**，理由不是不诚实，而是它会把「本该做的复核」变成「被永久豁免的例外」，下次没人记得为什么豁免。`expectedReviewDate` 必须改为 `Map<slug,date>` 按 slug 显式映射，**禁止 blanket 常量** | §7、§6.3 |
| 字数口径 | **门禁口径 2,000–2,300**（去 URL、去标签、Unicode 词边界）；硬上限 2,400 | §1.1、§0 |
| 真门禁认定 | 接受：`scheme-3-english-content-quality.test.mjs` 为真门槛，Q4 是「重建」不是「微调」 | §0 |
| 「模板空节 15 个」 | 接受为**误归因**，实际 0 个；模板骨架在 `telc-vs-goethe-for-german-visa`（第二批） | §1.1 |
| 测试清单 | 接受 9 处 + launch-check 3 处 + CONTENT_MAP 8 个数字；**`fan-73` 与 Q4 无关** | §3 |
| 入链条数 | 第一批 **3 条**（本窗口实得 2 条，第 3 条随解封自动出现）；第 4 条属第二批 | §4.4 |
| 保护性事实 | 接受：`germany-telc` 不在 `highRiskRouteCategories`；`adsEligible` 保持 `false` | §6.1、§7 |
| **路 3 裁定** | **2026-10-27 裁定路 3：telc 内容改写与 `updatedDate` 前移均推入窗口二，与 telc 源复核 + manifest 翻转 + `telc-work-nursing:12`/`telc-window-1:54` 两行断言同批。本窗口仅落地 B1 hub 两条入链。** 理由四条见 §3.4；后果：本窗口对两篇 `telc-*.md` 授权为零 | §3.4、§4.3、§6.3、§7 |
| 执行禁区 | 新增硬约束：`telc-work-nursing.test.js:36`、`telc-window-1.test.js:40`、`scheme-3-release-candidate.test.mjs:76` 三者各自 spawn `npm run build`，**本窗口禁止执行**，验证统一排到 Q8 收口构建之后 | §3.5、§7 第 11 条 |
| 二手数据勘误 | 「8 篇 pillar `readingTime` 违约」系**过程态误报**（取样落在 8 篇改写中途，正文已改、字段未同步），非数据不可靠；当前 `scheme-3-english-content-quality` 绿、15/15 一致。照该表改动会把 8 处正确值改错 | §3.5 告警 1、告警 3 |
| 检索方法勘误 | 六条已实测的本机陷阱，凡结论涉及计数一律附带校验口径：①shell `grep` 的 BRE `\|` 无交替（返回假阴性）；②ERE `\b` 被改写成**字面量 `b`**（`\bnot\b`→`bnotb`，既漏计又假命中）；③`grep -c`/`rg -c` 数**行**不数**次数**，用 `-oE \| wc -l`；④fs broker 遍历会**静默截断**（无报错），遍历脚本必须打印 `[done] parsed n/m` 且 `n≠m` 非零退出；⑤「字符数」有三层口径——`s.length` 是 UTF-16 **码元**、`[...s].length` 是**码点**、`Buffer.byteLength(s,'utf8')` 是**字节**；报字节必须用第三层（含中文/破折号/弯引号的文件会差 30–120）。码元与码点仅在含**星平面字符**（码点 > `U+FFFF`）时分叉，且**恒有 `码元 − 码点 = 星平面字符数`**。⚠️ **不要在这里写绝对数值**：本 spec 就是全仓 242 个源文件里唯一的反例（严重度标记 emoji 落在星平面），而**写下这条本身就会改变它**——本节首次实测为 13 个，补入这句后变为 16 个，码元与字节也跟着变。**当场复算**：`node -e "const s=require('node:fs').readFileSync(process.argv[1],'utf8');console.log('码元',s.length,'码点',[...s].length,'字节',Buffer.byteLength(s,'utf8'))" <文件>`；⑥`wc -l` 数换行符，文件以换行结尾时比 `split('\n').length` **少 1**。**哨兵粒度必须落在条目级**——本 spec §3.4 的 51 条逐字块曾因解析正则假设 2 空格、静默漏掉 1 条（4 空格缩进的 `L26`），而「文件 3/3」的哨兵照样通过，偏差仍报 0。 | §3.5 告警 2、§3.4 |

---

## 9. 索引三件套自洽性：canonical / noindex / hreflang（＋sitemap）

> 只读排查，覆盖两页在 `noindex: true` 期间的实际输出与翻转时刻的变化点。**未修改任何文件。**

### 9.1 生成链路（唯一事实来源）

| 环节 | 位置 | 逻辑 |
| --- | --- | --- |
| canonical | `src/layouts/GuideLayout.astro:59` | **硬编码自指**：`https://visalang.org/guides/${slug}/`，与 noindex 无关 |
| hreflang | `GuideLayout.astro:60-65` | `translatedPath = translatedPaths['/guides/<slug>/']`；**无译文 → `alternates = []`**（不输出任何 hreflang） |
| noindex 判定 | `GuideLayout.astro:41-42,86` | `noindex={!primaryDiscoveryEligible}`，`primaryDiscoveryEligible = publicationPolicy.index` |
| 策略门控 | `src/data/publication-manifest.ts:119-126` | 三重且：`englishPillarSet.has(slug)` && `mature` && `noindex !== true`；任一不满足 → `closedPolicy` → `index/sitemap/ads` 全 false（`:100-105`） |
| robots 输出 | `src/layouts/BaseLayout.astro:76` | `noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'` |
| canonical 输出 | `BaseLayout.astro:77` | **无论是否 noindex 都输出** `<link rel="canonical">`（自指） |
| sitemap | `scripts/enrich-sitemap-lastmod.js:40,63` | 读 `dist` 产物，**凡含 `noindex,follow` 的页面从 sitemap 移除**；另 `astro.config.mjs:24-29` 有一份静态 `noindexSitemapPaths` 过滤 |

### 9.2 结论：当前组合**自洽**，不需要改，也不该改

1. **`canonical` 自指 + `noindex: true` 不矛盾。** 二者职责不同：canonical 声明「本页的规范地址就是它自己」，robots 声明「不要把它放进索引」。这是「保留可访问、但不参与检索」的标准形态。
   真正会出错的是反过来的组合——**canonical 指向别处 + 本页 noindex**：那等于把本页信号并给目标 URL，而本页内容又明确不参与索引，两者互相抵消且难以排查。本项目不存在这种写法（`:59` 是模板级自指，无逐页覆盖）。
2. **hreflang 当前为空，是正确的。** `translatedPaths` 中**无任何 telc 条目**（`src/data/site.ts` 内 `telc` 仅命中 `goethe-a1-vs-telc-a1` 一条，与本批无关）→ `alternates = []` → 两页不输出 hreflang。
   ⚠️ **不要为了"完整性"补 hreflang**：没有 zh 对应页而输出 `zh-CN` 指向，会形成悬空 alternate；且 `tests/m3-chinese-journey.test.mjs:25-28` 对 `translatedPaths` 有显式断言（该契约已裁定不得改动，见 §7）。
3. **sitemap 是产物派生的，不是清单维护的。** 翻转后两页 HTML 变 `index,follow` → `enrich-sitemap-lastmod.js:40` 不再命中 → 自动进入 `sitemap-0.xml` 并回填 `<lastmod>`（取自 frontmatter `updatedDate`）。**无需任何代码改动**，也不要去手改 `noindexSitemapPaths`。

### 9.3 翻转那一刻必须同时改的（仅 3 组，全部为内容/数据层）

| # | 文件 | 改动 | 若漏改的后果 |
| --- | --- | --- | --- |
| 1 | `src/data/publication-manifest.ts`（`:27-43`） | 插入两个 telc slug（§2.1） | `englishPillarSet.has()` 恒 false → 策略恒 `closedPolicy` → 页面永远 `noindex,follow`，sitemap 永不收录 |
| 2 | 两页 frontmatter | `noindex: true → false` **且** `contentStatus: starter-overview → core-route` | 只改 noindex：`mature` 仍 false → 仍 closed；只改 contentStatus：`noindex===true` → 仍 closed |
| 3 | 计数/日期断言（§3.1–3.2、§3.4） | 名单 15→17、两行日期、ledger 新增两节 | 测试红 |

**三个组件缺一不可，且门控是 fail-closed 的**：任意两项到位而第三项缺失，策略仍返回 closed，**不会出现「半解封导致页面提前进索引」的泄漏**。这是好消息——它意味着翻转动作可以分步做而不会失控，**唯一不可逆的风险是「内容还没达标就把三项全做齐」**。

### 9.4 不需要改的（避免误伤）

- `GuideLayout.astro`：canonical 与 alternates 逻辑无需为 telc 变更；
- `BaseLayout.astro`：robots 与 canonical 输出无需变更；
- `astro.config.mjs` 的 `noindexSitemapPaths`：静态清单与 telc 无关，**不要加**（sitemap 由产物派生）；
- `src/data/site.ts` 的 `translatedPaths`：**不得为 telc 添加映射**（`m3-chinese-journey:25-28` 契约 + 无 zh 页）。

### 9.5 翻转后应核验的四项（构建产物）

> 全部用 `rg`（本机 shell `grep` 的 ERE `\b` 被改写成字面量 `b`、BRE `\|` 无交替，见 §8）；计数一律 `-o | wc -l`，**不用 `-c`**（`-c` 数行不数次数）。
> 每条都要配一个**阳性对照**，否则「零命中」无法区分「确实没有」与「模式写错/文件是空的」。

```bash
P=dist/guides/telc-b1-b2-germany-work-nursing/index.html
# 阳性对照 0：产物存在且非空（防「文件没生成 → 后面全零命中」被读成通过）
wc -c "$P"

# 1. robots 已放开（期望 index,follow,max-image-preview:large）
rg -o '<meta name="robots" content="[^"]*"' "$P"

# 2. canonical 仍自指（期望 https://visalang.org/guides/telc-b1-b2-germany-work-nursing/）
rg -o '<link rel="canonical" href="[^"]*"' "$P"

# 3. 未意外产生 hreflang（期望 0）
#    阳性对照必须用**确实有 zh 对应页**的指南。translatedPaths（src/data/site.ts:47-59）里
#    指南只有 4 条键：goethe-a1-vs-telc-a1 / goethe-a1-test-centers /
#    german-a1-exam-booking-timeline / goethe-a1-30-day-study-plan。
#    拿别的 slug 当对照会得到 0，与「模式写错」无法区分。
rg -o 'rel="alternate"' "$P" | wc -l
rg -o 'rel="alternate"' dist/guides/goethe-a1-vs-telc-a1/index.html | wc -l   # 期望 3（en / zh-CN / x-default）

# 4. 已进 sitemap 且带 lastmod（期望 1 条）
rg -o '<loc>https://visalang.org/guides/telc-b1-b2-germany-work-nursing/</loc><lastmod>[^<]+</lastmod>' dist/sitemap-0.xml | wc -l
```

### 9.6 两个前置依赖：不满足则「翻转可分步做不会泄漏」不成立

§9.3 的「不会泄漏」结论依赖 sitemap 清理**真的执行**。清理不是 Astro 集成做的，而是构建后脚本做的，两处都可能静默失效：

**前置 A — `removeUrl` 的正则必须匹配实际序列化**

```js
// scripts/enrich-sitemap-lastmod.js:18
new RegExp(`<url><loc>${escapedLoc}</loc>(?:<lastmod>[^<]+</lastmod>)?</url>`, flags)
```

这条正则**假设 `<url>` 与 `<loc>` 之间没有任何空白或换行**。若 `@astrojs/sitemap` 输出的是缩进多行格式，`String.prototype.replace` 会**静默不匹配**——不抛错、不打日志、退出码 0，结果是**全部 noindex 页面留在 sitemap 里**。那不是「不漏」，是「漏了且没有任何信号」。

一条命令即可判定格式：

```bash
# 若两者相等 → 单行格式，removeUrl 可用
# 若前者为 0 而后者非 0 → 多行缩进，removeUrl 已静默失效，必须先修 :18
rg -o '<url><loc>' dist/sitemap-0.xml | wc -l
rg -o '<loc>'       dist/sitemap-0.xml | wc -l
```

**前置 B — 页面必须渲染完全一致的 `noindex,follow` 字符串**

`enrich-sitemap-lastmod.js:40` 用的是 `html.includes('<meta name="robots" content="noindex,follow">')`，**逐字符匹配**。`BaseLayout.astro:76` 当前正好是这一串，但下列任一改动都会让它失配、该页不再被移除：

| 改动 | 后果 |
| --- | --- |
| 写成 `noindex, nofollow`（逗号后加空格） | `:40` 失配 → 该页留在 sitemap |
| 写成 `noindex,follow,max-image-preview:large` | 同上 |
| 加上 `data-*` 或调换属性顺序 | 同上 |
| 改成 `noindex` 单值 | 同上 |

**所以「加一个 SEO 属性」这种看似无害的改动，会让 sitemap 清理整体失效而没有任何测试变红。** 翻转前必须先跑上面两条格式/字符串检查，再判 §9.3 的「不泄漏」。

**另需知道（2026-10-27 已用 dist 实测，两处更正）**：

1. **黑名单是 16 条，不是我先前读到的 14 条。** 我读该文件时 `noindexSitemapPaths` 是 14 条（止于 `/guides/category/portugal/`）；随后工作树被改动，`git status` 现为 ` M astro.config.mjs`，`git diff` 显示新增 `/zh/404/`、`/404/` 两条与一个 `vite.server.proxy` 段，故当前 **16 条**。**这是「版本」这一元的实例：我读到的数只在我读的那一刻成立。**（该 `vite.server` 段是 dev-only，静态站构建不读它，不影响产物。）
2. **这 16 条目前是纯冗余的，加黑名单不会产生任何行为变化。** dist 实测：41 条 sitemap 成员 + 65 个 noindex 页 = 106 个 html，**严格互补、交集为空、无幽灵条目**；`sitemap` 里的分类页 **0 条**（含那 9 个）。也就是说 **enrich 已经把该删的全删了，黑名单一条也没"额外"拦到**。所以「想靠往黑名单加一个 URL 来压掉它」是静默无效的动作——真正的闸门是 noindex。**不要用改黑名单的方式解决问题，也不要因为它没生效就以为链坏了。**

**第三个失效点（比 A/B 更容易误判）**：**「可移除条数」必然为 0，不能用作健康指标。** 复刻 `removeUrl` 去数「本轮能删掉几条」，在已跑过 postbuild 的产物上恒为 0——那证明的是「已经清过了」，不是「链坏了」。判链是否可用，**只能看格式前提**：

| 断言 | 判据 | 2026-10-27 dist 实测 |
| --- | --- | --- |
| 格式前提（失效点 A） | `<url><loc>` 计数 == `<loc>` 计数 == `<url>` 计数 | 41 / 41 / 41 ✅ 单行格式，未触发 |
| 字符串前提（失效点 B） | 全部 noindex 页的 robots 恰为 `noindex,follow`（无空格、无附加指令） | 65/65 ✅ 未触发 |
| 结果断言 | `noindex 页 ∩ sitemap 成员 = ∅` | ✅ 交集 0 |

⚠️ 第三条**只在「刚构建完且 postbuild 已跑」的快照上成立**；在裸 `astro build` 产物上它会失败，**那是预期的**，不是回归。

**那 9 个分类页的原始风险判断仍然成立**：`/guides/category/` 下 `germany-a1` / `germany-b1` / `germany-testdaf` / `germany-telc` / `canada` / `italy` / `spain` / `france` / `netherlands` 不在黑名单内，恒为 `closedPolicy`（`publication-manifest.ts:137-139` 的 `getCategoryPublicationPolicy` 未使用入参、恒返回 `closedPolicy`），能不进 sitemap **完全依赖上述后处理链**；今天实测链是通的，所以它们没进。

---

**证据基准**：所有行号与断言原文取自 2026-10-27 工作副本；字数用 §6.4 与 `scheme-3-english-content-quality` 同口径复算。**未执行** `npm run build` / `npm test` / 任何 spawn 构建的测试文件（遵守并发纪律）；执行过的只有三类只读操作：① `node --test tests/scheme-3-english-content-quality.test.mjs`（该文件无 `execFileSync`/`spawn`，§3.5 已核）；② 逐篇 `wordsOf` 复算脚本（`/tmp`，不写仓库）；③ 谓词抄自测试原文的「假设删除 / 模拟翻转」脚本（`/tmp`，对内存副本操作，不写仓库）。所有「会红」的判断均来自**静态复现断言谓词**。
