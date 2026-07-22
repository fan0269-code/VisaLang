# VisaLang Germany B1 Content Review Implementation Plan

> **For Codex or other agentic workers:** Execute the tasks in order from this document and the companion prompt. If the environment provides task isolation or subagents, they may be used, but no external skill is required. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不新增页面、不提升内容成熟度、不推断个案资格的前提下，完成 Germany B1 核心路线 8 篇既有指南的官方来源复核、路线去环、公开文案清理和 B1 Hub 内容/SEO 收敛。

**Architecture:** 将 Germany B1 保持为现有 13 页 `core-route` 集群，其中 8 篇承担主管机关确认、语言/公民知识分离、考试选择、本地执行、时间线和提交复核，另外 5 篇保持为备考支持。来源复核采用“现行德文法条 → 具体地方主管机关 → BAMF/德国政府说明 → 考试主办方 → 具体官方或授权考点”的五层门禁；页面事实复核与读者个案实时核验严格分离。

**Tech Stack:** Astro 7、TypeScript、Astro Content Collections、Markdown、Node `assert` 回归测试、官方网页/PDF 来源

---

## 文件结构

### 本轮核心内容文件

- `src/content/guides/goethe-b1-germany-settlement-work.md` — 定居许可路线与 B1 证明边界。
- `src/content/guides/germany-b1-citizenship-language-proof.md` — 入籍语言证明与完整申请材料分离。
- `src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md` — B1、Leben in Deutschland、公民知识证据分离。
- `src/content/guides/goethe-b1-vs-telc-b1.md` — DTZ、Goethe B1、telc B1 的受控比较。
- `src/content/guides/goethe-b1-fees-and-booking.md` — 主管机关确认后再核验具体考点费用和报名条件。
- `src/content/guides/goethe-b1-study-plan.md` — 明确为可调整的编辑计划，不是官方或通过保证。
- `src/content/guides/germany-b1-settlement-citizenship-timeline.md` — 使用主管机关/考点确认日期做计划。
- `src/content/guides/germany-b1-settlement-citizenship-checklist.md` — 提交前问题和证据类别复核，作为主路线终点。

### 页面与路线文件

- `src/pages/germany-b1-settlement-citizenship.astro` — B1 Hub 的读者路线、内部术语清理、TOC 与页面级结构化数据。
- `src/pages/guides/[slug].astro` — 让 Germany B1 的可见 Next guide 使用显式业务路线，而不是标题字母顺序。

### 测试文件

- `tests/germany-b1-cluster.test.js` — 集群数量、核心范围、状态、链接和 Hub 结构。
- `tests/content-integrity.test.js` — B1 主路线目标存在、无循环、终点明确。
- `tests/source-review-render.test.js` — 构建后的来源状态、canonical、JSON-LD、TOC、Next guide 和 sitemap。
- `tests/site.test.js` — 仅在现有入口没有包含新增聚焦测试时最小调整。

### 审计与台账

- `docs/PHASE_2_B1_CONTENT_AUDIT.md` — 写入本轮真实来源核验结果、边界和页面处置。
- `docs/CONTENT_MAP.md` — 从当前源码元数据重新生成或最小同步内容账本。
- `docs/TASK_LOG.md` — 仅在范围完成并通过验证后记录真实结果。

### 默认不修改

- 5 篇纯备考支持页：`goethe-b1-difficulty-analysis`、`goethe-b1-listening-deep-dive`、`goethe-b1-mock-exam-routine`、`goethe-b1-speaking-topics`、`goethe-b1-writing-assessment`。
- `src/content.config.ts`、`src/data/source-review.ts`、共享布局和全站样式属于 denylist；若真实失败测试表明必须修改这些基础设施，应停止并报告 `BLOCKED`，不得在本计划内扩大范围。
- 非 Germany B1 内容、legacy 根目录静态文件、部署/广告/商业流程。

## 推荐业务路线

| slug | `decisionStage` | `nextGuideSlug` | 精确 `supportingGuideSlugs` |
|---|---|---|---|
| `goethe-b1-germany-settlement-work` | `requirement` | `goethe-b1-vs-telc-b1` | `["germany-b1-settlement-citizenship-checklist", "germany-b1-settlement-citizenship-timeline"]` |
| `germany-b1-citizenship-language-proof` | `requirement` | `goethe-b1-vs-telc-b1` | `["germany-b1-leben-in-deutschland-and-language-proof", "germany-b1-settlement-citizenship-checklist"]` |
| `germany-b1-leben-in-deutschland-and-language-proof` | `requirement` | `goethe-b1-vs-telc-b1` | `["germany-b1-citizenship-language-proof", "germany-b1-settlement-citizenship-checklist"]` |
| `goethe-b1-vs-telc-b1` | `choice` | `goethe-b1-fees-and-booking` | `["goethe-b1-germany-settlement-work", "germany-b1-citizenship-language-proof"]` |
| `goethe-b1-fees-and-booking` | `local-execution` | `germany-b1-settlement-citizenship-timeline` | `["goethe-b1-vs-telc-b1", "goethe-b1-study-plan"]` |
| `goethe-b1-study-plan` | `local-execution` | `germany-b1-settlement-citizenship-timeline` | `["goethe-b1-vs-telc-b1", "goethe-b1-fees-and-booking"]` |
| `germany-b1-settlement-citizenship-timeline` | `local-execution` | `germany-b1-settlement-citizenship-checklist` | `["goethe-b1-germany-settlement-work", "germany-b1-citizenship-language-proof"]` |
| `germany-b1-settlement-citizenship-checklist` | `submission-review` | 省略该字段 | `["goethe-b1-germany-settlement-work", "germany-b1-citizenship-language-proof"]` |

- `nextGuideSlug` 表示唯一主下一步。
- `supportingGuideSlugs` 只表示补充或条件性内容，不与 `nextGuideSlug` 重复。
- checklist 是提交复核终点，不强行回到 timeline 或 requirement。
- Route Review 是非法律服务边界，不作为 Markdown guide 的 `nextGuideSlug`。

### Task 1: 建立执行基线和来源 claim matrix

**Files:**
- Read: `CLAUDE.md`
- Read: `AGENTS.md`
- Read: `PROJECT_CONTEXT.md`
- Read: `docs/OPERATIONS_STATUS.md`
- Read: `docs/PHASE_2_B1_CONTENT_AUDIT.md`
- Read: 上述 8 篇核心指南
- Create/Modify: `docs/PHASE_2_B1_CONTENT_AUDIT.md`

- [ ] **Step 1: 验证唯一维护目录和 Git 基线**

Run:

```bash
pwd -P
git rev-parse --show-toplevel
git status --short --branch
git status --porcelain=v1 --untracked-files=all
git rev-parse HEAD
git rev-parse origin/main
```

Expected:

```text
pwd 和 Git 顶层目录都严格等于 /Users/fanlw/Documents/考试网站维护/VisaLang
```

不匹配时立即 `BLOCKED`。保存初始工作树清单；禁止 clean、reset、restore、stash、覆盖未跟踪文档。

- [ ] **Step 2: 为 8 篇页面逐条建立 claim matrix**

每个高风险主张至少记录：

```text
page_slug
claim_id
section_heading
claim_text
claim_category
route_name / route_statute
final decision owner
source owner / title / final URL
source language
accessed_at / access result
exact quote / locator
support level
source scope / claim scope
qualifiers / exceptions / cross-references
legal change risk
prohibited inference
permitted wording
reader verification action
final disposition
```

- [ ] **Step 3: 实际打开第一方来源**

候选入口只用于发现，不能直接视为已审查：

```text
现行德文法条：gesetze-im-internet.de
地方主管机关：Ausländerbehörde / Einbürgerungsbehörde / Federal Portal regional service
BAMF / einbuergerung.de：官方导航和制度说明
Goethe / telc：考试产品
具体官方或授权考点：费用、日期、报名、取消、结果和证书流程
```

搜索摘要、AI 回答和历史审计不能作为最终证据。无法打开正文、无法定位段落、存在冲突或修法状态不清时保持 `pending`。

### Task 2: 先写来源状态和路线失败测试

**Files:**
- Modify: `tests/germany-b1-cluster.test.js`
- Modify: `tests/content-integrity.test.js`

- [ ] **Step 1: 写核心 8 篇来源状态断言**

断言：只有实际完成来源复核的页面可为 `reviewed`，并同时具有真实 `sourceReviewedAt` 和 `reviewedByRole: "source-review"`；未复核的 5 篇保持 pending 且没有日期/角色。

- [ ] **Step 2: 运行 B1 聚焦测试并记录 RED**

Run:

```bash
node tests/germany-b1-cluster.test.js
```

Expected: 因当前 8 篇仍缺少受控来源元数据而失败。不得通过制造无意义断言获得 RED。

- [ ] **Step 3: 写主路线无环断言**

断言上述双入口、单汇合、单终点路线；每个 target 存在、同 route、不可自指、不可循环，终点没有 `nextGuideSlug`，supporting 不重复 next。

- [ ] **Step 4: 运行内容完整性测试并记录 RED**

Run:

```bash
node tests/content-integrity.test.js
```

Expected: 当前 citizenship ↔ LiD、checklist ↔ timeline 循环或业务顺序不一致导致失败。

### Task 3: 实施来源状态和内容修复

**Files:**
- Modify: 8 篇核心指南
- Modify: `docs/PHASE_2_B1_CONTENT_AUDIT.md`

- [ ] **Step 1: 按实际证据处置每条主张**

只允许：保留、加限定、删除、改为具体核验动作。不得发布固定居住年限、资格、豁免、证书普遍接受、费用、日期、出分时间或预约等待。

- [ ] **Step 2: 更新受控 frontmatter**

仅对真实复核完成的页面设置来源字段；每个值必须直接来自该页完成的 claim matrix：

- `sourceReviewStatus` 使用 `reviewed`；证据不足则保持 `pending`。
- `sourceReviewedAt` 使用实际复核日期，格式严格为 `YYYY-MM-DD`。
- `reviewedByRole` 使用 `source-review`。
- `audienceScope`、`finalDecisionAuthorityType` 和 `localExecutionPrompt` 写入页面真实、具体的范围与动作。
- `primaryOfficialAuthorityUrl` 和适用时的 `examOwnerUrl` 必须是实际打开并记录的最终 HTTPS URL。

不得把本计划中的说明文字复制为 frontmatter 值。若证据不足：保持 `pending`，不写日期，不伪造 reviewer role。

- [ ] **Step 3: 清理公开编辑语言和冲突状态**

从 8 篇核心页删除或改写：

```text
Official verification pending（当页面已真实 reviewed 时）
Reader decision and search intent
Manual checks still needed
Before you rely on this page（编辑 QA 语义）
Proposed B1 practice pack interest
页面自链接
每页完全相同的六链接导航清单
```

每页保留一个主行动和最多两个条件性辅助链接；来源状态由共享组件渲染。

- [ ] **Step 4: 保持状态分离**

全部 13 篇继续 `contentStatus: "core-route"`。`updatedDate` 只在有实质用户可见修改时更新；`publishedDate` 不变；来源日期不替代编辑日期。

### Task 4: 修正 B1 显式路线和页面可见 Next guide

**Files:**
- Modify: 8 篇核心指南 frontmatter
- Modify: `src/pages/guides/[slug].astro`
- Test: `tests/content-integrity.test.js`
- Test: `tests/source-review-render.test.js`

- [ ] **Step 1: 写构建后 Next guide 失败断言**

先在 `tests/source-review-render.test.js` 中断言 Germany B1 构建页面的 Next guide 等于逐 slug 映射，而不是标题字母顺序。

- [ ] **Step 2: 运行测试确认 RED**

Run:

```bash
node tests/source-review-render.test.js
```

Expected: 当前 B1 仍使用字母序 Next guide，测试因目标行为缺失而失败。

- [ ] **Step 3: 按确定映射更新 next/supporting**

按本文“推荐业务路线”表格更新核心 frontmatter；无循环、无 stage 倒退、无 next/supporting 重复，终点明确。

- [ ] **Step 4: 让 Germany B1 使用 explicitNext**

在 `src/pages/guides/[slug].astro` 中做最小改动，使 Germany B1 的底部 Next guide 使用有效的 `nextGuideSlug`；保持 A1 与其他类别现有行为不变。

- [ ] **Step 5: 重跑测试确认 GREEN**

Run:

```bash
node tests/source-review-render.test.js
```

Expected: exit 0，B1 构建页面显示业务下一步。

### Task 5: 收敛 B1 Hub 内容与 SEO

**Files:**
- Modify: `src/pages/germany-b1-settlement-citizenship.astro`
- Test: `tests/germany-b1-cluster.test.js`
- Test: `tests/source-review-render.test.js`

- [ ] **Step 1: 写 Hub 失败断言**

先在聚焦测试中断言：Hub 不含内部实施语言；核心入口按业务顺序；构建后有一个 H1、一个 `ArticleTOC`、self-canonical、可解析的 Organization/BreadcrumbList/CollectionPage JSON-LD，以及 trailing-slash 内链。

- [ ] **Step 2: 运行测试确认 RED**

Run:

```bash
node tests/germany-b1-cluster.test.js
node tests/source-review-render.test.js
```

Expected: 当前 Hub 缺少 TOC/页面级 JSON-LD，且仍含内部实施语言，因此至少一个命令失败。

- [ ] **Step 3: 删除用户可见的内部实施语言**

替换：

```text
Content map and internal-link matrix
Existing B1 guide audit
Reworked as...
Genuinely missing decision pages...
proposed support / proposed human-service contact path
```

改成读者导向的“选择入口”“每页能帮助核验什么”“规划工具”。

- [ ] **Step 4: 按业务顺序重组 Hub**

顺序：主管机关/路线 → settlement/citizenship 入口 → 公民知识条件分支 → 证明比较 → 考点/报名 → 时间线 → checklist → 备考支持。

- [ ] **Step 5: 复用现有模式增加最小 TOC 和 JSON-LD**

使用现有 `ArticleTOC`、`BaseLayout` JSON-LD 接口，增加与可见内容一致的 `BreadcrumbList` 和 `CollectionPage`；不添加不可见 FAQ 或 HowTo schema。

- [ ] **Step 6: 重跑测试确认 GREEN**

Run:

```bash
node tests/germany-b1-cluster.test.js
node tests/source-review-render.test.js
```

Expected: 全部 exit 0。

### Task 6: 更新账本并完成全量验证

**Files:**
- Modify: `docs/CONTENT_MAP.md`
- Modify: `docs/TASK_LOG.md`
- Verify: 全部本轮文件

- [ ] **Step 1: 从当前源码同步内容账本**

修正 2026-07-16 旧摘要，不得继续将已经完成的 Germany A1 复核记为 pending；Germany B1 逐页按本轮真实结果记录 reviewed/pending。

- [ ] **Step 2: 运行聚焦验证**

```bash
node tests/germany-b1-cluster.test.js
node tests/content-integrity.test.js
node tests/source-review-render.test.js
node tests/site.test.js
```

Expected: 全部退出码 0。

- [ ] **Step 3: 运行完整门禁**

```bash
npm test
git diff --check
npm run launch-check
git status --short
```

Expected:

```text
npm test: exit 0
git diff --check: 无输出
npm run launch-check: exit 0，并以 READY. 结束
无 __source-review-* fixture
无意外源文件或超范围修改
```

- [ ] **Step 4: 输出证据化报告**

只能使用 `PASS`、`PARTIAL`、`BLOCKED`。逐页报告来源、边界、状态、路线、修改文件、验证命令、未完成事项和工作树保护结果。

## 交付边界

本计划本身不授权 commit、push、PR、SSH、部署、Nginx、服务器或第三方账户操作。Codex 执行结束时必须明确：未提交、未推送、未部署、未访问服务器、未修改第三方账户。
