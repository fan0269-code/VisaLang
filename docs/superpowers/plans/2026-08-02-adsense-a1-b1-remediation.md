# VisaLang A1/B1 AdSense Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 VisaLang 收敛为以 Germany A1 家庭团聚与 Germany B1 永居／入籍为核心的高价值任务型内容站，并形成可验证的 AdSense 低价值内容复审准备版本。

**Architecture:** 以 `src/data/source-review.ts` 和指南 frontmatter 作为内容成熟度、主发现、索引和广告资格的唯一门控；所有页面从同一门控获取状态，避免 homepage、sitemap、广告和文章布局各自维护规则。A1/B1 Route Hub 采用共享的五步任务模型，英文 Markdown 支持页用统一的状态条、来源、实质更新与任务完成区呈现；国际页面保留 URL，但统一成为 noindex、无广告的官方核验导航页。

**Tech Stack:** Astro 7、TypeScript、Astro Content Collections、Markdown、现有 CSS tokens、Node `assert` 测试、`@astrojs/sitemap`、既有 `npm test` / `npm run launch-check`。

---

## 0. 范围、前置条件与不可替代的外部验证

### 本计划实现的范围

- 英文 A1/B1 双路线五步任务中枢；
- 6–8 篇英文核心内容的成熟度、任务关系和主发现资格；
- 4–6 篇中文核心内容（仅在对应英文事实审核完成后实施）；
- 非 A1/B1 内容的 noindex、无广告、退出 sitemap／主发现；
- 状态条、编辑方法、实质更新记录、完整页脚；
- 首页／导航／指南库收敛；
- 自动化构建、SEO、sitemap、广告运行时和页面结构验证。

### 不在代码库内可证明的条件

以下项必须由拥有外部账户权限的负责人单独完成并保存证据。实施者不得以源码、构建或本地测试通过替代它们：

1. Google Privacy & Messaging CMP 在 EEA、英国和瑞士的同意、拒绝、管理和重新打开测试；
2. AdSense Policy Center、Auto Ads 排除和真实广告位置检查；
3. Search Console 的 sitemap、URL 检查、抓取和索引状态；
4. 正式生产部署、回滚记录和重新提交 AdSense 审核。

### 实施前规则

- 先阅读 `docs/ADSENSE_TWO_WEEK_A1_B1_DESIGN_PLAN_2026-08-02.md`；
- 不编辑 `dist/`、`.astro/`、`node_modules/`；
- 不新建广告位、商业功能、表单、支付、邮件收集或追踪；
- 不把 AI/自动检查表述为人工审阅；
- 不把任何动态的费用、考试日期、考点、证书接受性或行政结果写成未经当前官方来源支持的固定事实；
- 每个会改变路由、导航、SEO、sitemap、内容结构或布局的任务结束后，运行对应定向测试；每个阶段结束运行 `npm test`、`npm run launch-check`、`git diff --check`。

## 1. 文件结构与责任边界

| 文件 | 责任 |
|---|---|
| `src/data/source-review.ts` | 内容等级、核心路线白名单、主发现、索引和广告资格的唯一判定接口 |
| `src/content.config.ts` | 指南 frontmatter schema；路线归属、页面类型和实质更新记录的输入约束 |
| `src/data/core-route-content.ts`（新增） | A1/B1 Hub 五步任务、状态、来源、更新与成熟支持页的受控内容数据 |
| `src/components/ContentStatusBar.astro`（新增） | 标题区统一展示成熟度、团队、来源审核日期、来源和纠错链接 |
| `src/components/BeforeYouContinue.astro`（新增） | 3–7 项任务、官方核验动作和一个下一步的统一完成区 |
| `src/components/RouteHub.astro`（新增） | A1/B1 共用的五步 Route Hub 页面骨架；事实内容由 data 提供 |
| `src/layouts/GuideLayout.astro` | 英文 Markdown 指南的状态条、Route Hub 上下文、实质更新和任务完成区 |
| `src/pages/germany-family-reunion-a1.astro` | 使用共享 Route Hub 数据渲染 A1 页面 |
| `src/pages/germany-b1-settlement-citizenship.astro` | 使用共享 Route Hub 数据渲染 B1 页面 |
| `src/pages/index.astro` | A1/B1／不确定三分流首页；无首页广告运行时 |
| `src/pages/guides/[slug].astro` | 传递 guide route hub、页面类型、任务和更新数据；限制相关内容 |
| `src/pages/guides/index.astro` | 只展示可主发现的 A1/B1 成熟内容 |
| `src/data/site.ts` | 收敛全局可用路线、导航、翻译路径和信任链接 |
| `src/components/GlobalHeader.astro` / `GlobalFooter.astro` | 仅主推 A1/B1 和信任链接；补 Cookie／Affiliate／Update Log |
| `src/pages/about.astro` / `src/pages/editorial-policy.astro` | 公开 A1/B1 双层定位及编辑方法；不做过度全称承诺 |
| `src/pages/content-update-log.astro`（新增） | 从受控数据渲染实质内容更新记录，无广告、noindex |
| `astro.config.mjs` / `scripts/enrich-sitemap-lastmod.js` | sitemap 与实际渲染 noindex／成熟度门控一致 |
| `src/data/zh-germany-a1.ts`、`src/pages/zh/**` | 中文核心页数据与页面；在英文通过事实审核后添加 B1 对应内容 |
| `tests/*.test.js` / `scripts/launch-check.js` | 将旧的全量／七步／首页广告假设替换为确认设计的可执行验收 |

## 2. 受控内容模型

在开始界面或正文工作前，先实现以下单一模型。**不得**让首页、布局、sitemap 和测试各自以 slug 列表判断资格。

```ts
export const coreRouteIds = ['germany-a1-family-reunion', 'germany-b1-settlement-citizenship'] as const;
export type CoreRouteId = typeof coreRouteIds[number];

export const guidePageTypes = ['route-hub-support', 'core-support', 'verification-navigator', 'research-pending'] as const;
export type GuidePageType = typeof guidePageTypes[number];

export interface SubstantiveUpdate {
  date: string;
  summary: string;
  readerRecheckRequired: boolean;
}

export interface GuidePublicationInput {
  routeHub?: CoreRouteId;
  pageType: GuidePageType;
  contentStatus: ContentStatus;
  sourceReviewStatus: SourceReviewStatus;
  noindex: boolean;
  adsEligible: boolean;
}

export function isCoreRoute(routeHub?: string): routeHub is CoreRouteId {
  return coreRouteIds.includes(routeHub as CoreRouteId);
}

export function isGuidePrimaryDiscoveryEligible(guide: GuidePublicationInput): boolean {
  return isCoreRoute(guide.routeHub)
    && guide.sourceReviewStatus === 'reviewed'
    && (guide.contentStatus === 'complete-route' || guide.contentStatus === 'core-route')
    && guide.pageType !== 'verification-navigator'
    && guide.pageType !== 'research-pending'
    && guide.noindex !== true;
}

export function isGuideAdvertisingEligible(guide: GuidePublicationInput): boolean {
  return isGuidePrimaryDiscoveryEligible(guide) && guide.adsEligible === true;
}
```

`ContentStatus` 继续沿用现有字段以减小数据迁移范围；公开文字映射为：

```ts
export const contentStatusLabels: Record<ContentStatus, string> = {
  'complete-route': 'Complete Route Guide',
  'core-route': 'Core Support Guide',
  'starter-overview': 'Official verification navigator',
  'verification-pending': 'Research update in progress',
};
```

`Retire / Merge Candidate` 不生成活跃 Markdown 页面；应通过重定向或移出主发现处理，而不是伪造新的已发布内容状态。

## 3. 任务分解

### Task 1: 为新发布门控建立失败测试

**Files:**
- Modify: `tests/source-review-render.test.js`
- Modify: `tests/adsense-risk-exposure.test.js`
- Modify: `tests/content-integrity.test.js`
- Modify: `src/data/source-review.ts`

- [ ] **Step 1: 在 `tests/source-review-render.test.js` 添加受控门控单元断言。**

```js
const {
  isGuidePrimaryDiscoveryEligible,
  isGuideAdvertisingEligible,
} = require('../src/data/source-review.ts');

const reviewedA1 = {
  routeHub: 'germany-a1-family-reunion',
  pageType: 'core-support',
  contentStatus: 'core-route',
  sourceReviewStatus: 'reviewed',
  noindex: false,
  adsEligible: true,
};

assert.equal(isGuidePrimaryDiscoveryEligible(reviewedA1), true);
assert.equal(isGuideAdvertisingEligible(reviewedA1), true);
assert.equal(isGuidePrimaryDiscoveryEligible({ ...reviewedA1, routeHub: undefined }), false);
assert.equal(isGuideAdvertisingEligible({ ...reviewedA1, pageType: 'verification-navigator' }), false);
assert.equal(isGuidePrimaryDiscoveryEligible({ ...reviewedA1, sourceReviewStatus: 'pending' }), false);
```

- [ ] **Step 2: 运行定向测试并确认失败。**

Run: `node tests/source-review-render.test.js`

Expected: FAIL，因为新的 `isGuideAdvertisingEligible` 或新的参数形式尚未存在。

- [ ] **Step 3: 在 `src/data/source-review.ts` 添加 `coreRouteIds`、`GuidePageType`、`GuidePublicationInput`、`isCoreRoute()`、新的 `isGuidePrimaryDiscoveryEligible()` 和 `isGuideAdvertisingEligible()`。**

使用第 2 节给出的完整接口。保留旧的 `resolveGuideContentStatus()`，但让它只决定展示成熟度；主发现和广告必须改用新的 publication input。

- [ ] **Step 4: 更新调用方所需的 TypeScript 类型，使 `routeHub` 与 `pageType` 通过显式字段传递。**

不使用 `category` 或 slug 字符串隐式判断核心路线。任何没有 `routeHub` 的旧国际内容都应返回 false。

- [ ] **Step 5: 运行定向测试并确认通过。**

Run: `node tests/source-review-render.test.js`

Expected: PASS，且非 A1/B1、navigator、pending、noindex 的组合均不具发现和广告资格。

- [ ] **Step 6: Commit。**

```bash
git add src/data/source-review.ts tests/source-review-render.test.js
git commit -m "feat: centralize core guide publication gating"
```

### Task 2: 扩展 frontmatter schema 并将国际内容设为 fail-closed

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/content/guides/*.md`
- Test: `tests/content-integrity.test.js`
- Test: `tests/adsense-risk-exposure.test.js`

- [ ] **Step 1: 写失败测试，要求每个活跃指南都声明 `routeHub` 和 `pageType`，且非核心指南不可索引、不可广告。**

```js
for (const guide of allGuides) {
  assert.ok(field(guide.source, 'pageType'), `${guide.slug} declares pageType`);
  if (!['germany-a1-family-reunion', 'germany-b1-settlement-citizenship'].includes(field(guide.source, 'routeHub'))) {
    assert.equal(field(guide.source, 'noindex'), 'true', `${guide.slug} is noindex outside core routes`);
    assert.equal(field(guide.source, 'adsEligible'), 'false', `${guide.slug} cannot load ads outside core routes`);
  }
}
```

- [ ] **Step 2: 运行测试并确认失败。**

Run: `node tests/content-integrity.test.js`

Expected: FAIL，现有 Markdown 没有 `routeHub`／`pageType`，且仍有国际内容可索引或广告候选。

- [ ] **Step 3: 扩展 `guideSchema`。**

在 `src/content.config.ts` 加入：

```ts
routeHub: z.enum(['germany-a1-family-reunion', 'germany-b1-settlement-citizenship']).optional(),
pageType: z.enum(['route-hub-support', 'core-support', 'verification-navigator', 'research-pending']).default('verification-navigator'),
substantiveUpdates: z.array(z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  summary: z.string().min(1),
  readerRecheckRequired: z.boolean(),
})).default([]),
```

在 `superRefine()` 增加：当 `routeHub` 存在且 `pageType` 为 `route-hub-support` 或 `core-support` 时，要求 `sourceReviewStatus: reviewed`、`sourceReviewedAt`、`reviewedByRole`、`primaryIntent`、`audienceScope`、`finalDecisionAuthorityType`、`primaryOfficialAuthorityUrl`、`examOwnerUrl` 和至少一条 `substantiveUpdates`；否则构建失败。

- [ ] **Step 4: 批量更新所有现有 Markdown frontmatter。**

规则：

```yaml
# A1/B1 本轮选定核心支持页
routeHub: "germany-a1-family-reunion" # 或 germany-b1-settlement-citizenship
pageType: "core-support"
noindex: false
adsEligible: true
substantiveUpdates:
  - date: "2026-08-02"
    summary: "Clarified the authority-first verification task and refreshed the recorded official sources."
    readerRecheckRequired: true

# 所有国际、TestDaF、telc、备考、练习及未选入核心集的 A1/B1 页面
pageType: "verification-navigator" # 来源仍待复核则 research-pending
noindex: true
adsEligible: false
```

不要将 `sourceReviewStatus` 从 pending 改为 reviewed，除非已有真实人工来源审核记录。不要给没有实质变更的页面伪造 2026-08-02 更新记录。

- [ ] **Step 5: 将核心支持页限定为以下最多 8 个 slug，并按真实已审核来源填写 `routeHub`、`pageType` 和更新记录。**

```text
german-family-reunion-language-requirement
goethe-a1-germany-family-reunion
german-a1-exam-booking-timeline
goethe-a1-test-centers                 # 第 7 页候选
Germany B1:
germany-b1-citizenship-language-proof
goethe-b1-germany-settlement-work
goethe-b1-vs-telc-b1
germany-b1-settlement-citizenship-timeline # 第 8 页候选
```

若某页不能通过第 5 节的来源／独立任务审查，则改为 `verification-navigator`／`research-pending`，并把它从上述核心集合移除；不可为了凑足 8 篇而升级。

- [ ] **Step 6: 运行 content integrity 和广告风险测试。**

Run: `node tests/content-integrity.test.js && node tests/adsense-risk-exposure.test.js`

Expected: PASS，所有非核心指南都 fail-closed；核心页的前置字段完整。

- [ ] **Step 7: Commit。**

```bash
git add src/content.config.ts src/content/guides tests/content-integrity.test.js tests/adsense-risk-exposure.test.js
git commit -m "feat: classify guides by core route maturity"
```

### Task 3: 让页面、指南库、相关内容和 sitemap 使用同一门控

**Files:**
- Modify: `src/pages/guides/[slug].astro`
- Modify: `src/pages/guides/index.astro`
- Modify: `src/pages/guides/category/[category].astro`
- Modify: `src/layouts/GuideLayout.astro`
- Modify: `astro.config.mjs`
- Modify: `scripts/enrich-sitemap-lastmod.js`
- Test: `tests/adsense-risk-exposure.test.js`
- Test: `scripts/launch-check.js`

- [ ] **Step 1: 写失败测试，检查代表性国际页面、未选 A1/B1 页面和核心页面的 `robots`、广告和 sitemap 一致性。**

```js
const expectedNoindexNoAds = [
  '/guides/ielts-ukvi-uk-visa/',
  '/guides/testdaf-germany-university-admissions/',
  '/guides/goethe-a1-30-day-study-plan/',
  '/guides/category/germany-telc/',
];
for (const route of expectedNoindexNoAds) {
  const html = read(`dist${route}index.html`);
  assert.match(html, /<meta name="robots" content="noindex,follow">/);
  assert.ok(!html.includes(adsenseHost));
  assert.ok(!sitemap.includes(`<loc>https://visalang.org${route}</loc>`));
}
```

另增加核心 A1/B1 代表页应保留 index+sitemap 的断言，但不要断言首页带 AdSense loader。

- [ ] **Step 2: 运行测试并确认失败。**

Run: `node tests/adsense-risk-exposure.test.js`

Expected: FAIL，因为旧门控仍让部分页面可发现或广告资格不一致。

- [ ] **Step 3: 更新 `src/pages/guides/[slug].astro`。**

把 GuideLayout props 显式传入：

```astro
routeHub={guide.data.routeHub}
pageType={guide.data.pageType}
substantiveUpdates={guide.data.substantiveUpdates}
enableAds={isGuideAdvertisingEligible(guide.data)}
```

相关内容过滤必须满足：同一个 `routeHub`、`isGuidePrimaryDiscoveryEligible(candidate.data)`、不是当前页、最多两项；国际／pending 页面不可成为 related 内容。

- [ ] **Step 4: 更新 `src/pages/guides/index.astro` 和 category 页。**

所有指南列表只调用 `isGuidePrimaryDiscoveryEligible(guide.data)`。默认库标题改为 `Reviewed Germany route guides`，并说明只展示完成来源与路线审核的德国 A1/B1 内容。分类页若不是 A1/B1 核心 route，必须 `noindex` 且 `enableAds={false}`。

- [ ] **Step 5: 更新 `GuideLayout.astro` 的 `primaryDiscoveryEligible` 和 `advertisingEligible`。**

```ts
const publication = { routeHub, pageType, contentStatus, sourceReviewStatus, noindex, adsEligible };
const primaryDiscoveryEligible = isGuidePrimaryDiscoveryEligible(publication);
const advertisingEligible = isGuideAdvertisingEligible(publication) && enableAds === true;
```

将 `enableAds` 默认改为 `false`，让广告成为显式选择而非默认行为。

- [ ] **Step 6: 更新 sitemap。**

在 `astro.config.mjs` 不再维护国际 URL 手工清单。保留静态政策／商业页排除；指南与分类页的最终排除由渲染出的 `noindex` 和 `scripts/enrich-sitemap-lastmod.js` 完成。该脚本要在删除 noindex canonical 后断言 sitemap 中不存在带 `noindex,follow` 的 canonical；若发现则 `process.exitCode = 1`。

- [ ] **Step 7: 构建并运行测试。**

Run: `npm run build && node tests/adsense-risk-exposure.test.js && npm run launch-check`

Expected: PASS；所有 noindex 页面不在 sitemap，且不加载 AdSense runtime。

- [ ] **Step 8: Commit。**

```bash
git add src/pages/guides src/layouts/GuideLayout.astro astro.config.mjs scripts/enrich-sitemap-lastmod.js tests/adsense-risk-exposure.test.js scripts/launch-check.js
git commit -m "feat: restrict discovery to reviewed Germany core guides"
```

### Task 4: 建立状态条、更新记录和任务完成组件

**Files:**
- Create: `src/components/ContentStatusBar.astro`
- Create: `src/components/BeforeYouContinue.astro`
- Modify: `src/components/GuideStatusBadge.astro`
- Modify: `src/layouts/GuideLayout.astro`
- Modify: `src/styles/global.css`
- Test: `tests/site.test.js`

- [ ] **Step 1: 写失败测试，要求每个核心指南输出统一状态、来源和纠错语义。**

```js
const coreGuideHtml = read('dist/guides/german-family-reunion-language-requirement/index.html');
assert.match(coreGuideHtml, /Complete Route Guide|Core Support Guide/);
assert.match(coreGuideHtml, /VisaLang Editorial Team/);
assert.match(coreGuideHtml, /Source-reviewed on/);
assert.match(coreGuideHtml, /View sources/);
assert.match(coreGuideHtml, /Report an issue/);
assert.match(coreGuideHtml, /Before you continue/);
```

- [ ] **Step 2: 运行测试并确认失败。**

Run: `node tests/site.test.js`

Expected: FAIL，因为现有 meta 区分散展示，且无 `Before you continue` 组件。

- [ ] **Step 3: 创建 `ContentStatusBar.astro`。**

```astro
---
import GuideStatusBadge from './GuideStatusBadge.astro';
interface Props {
  status: import('../data/source-review').ContentStatus;
  author: string;
  sourceReviewedAt?: string;
  sourceReviewStatus: import('../data/source-review').SourceReviewStatus;
  sourcesHref: string;
  reportHref: string;
  routeLabel?: string;
  routeHref?: string;
}
const { status, author, sourceReviewedAt, sourceReviewStatus, sourcesHref, reportHref, routeLabel, routeHref } = Astro.props;
---
<section class="content-status-bar" aria-label="Content status and review information">
  <GuideStatusBadge status={status} />
  <span>{author}</span>
  {sourceReviewStatus === 'reviewed' && sourceReviewedAt ? <span>Source-reviewed on <time datetime={sourceReviewedAt}>{sourceReviewedAt}</time></span> : <span>Source review in progress</span>}
  {routeLabel && routeHref && <a href={routeHref}>Part of the {routeLabel} route</a>}
  <a href={sourcesHref}>View sources</a>
  <a href={reportHref}>Report an issue</a>
</section>
```

`GuideStatusBadge.astro` 只负责将 `contentStatusLabels` 渲染成 badge；不要在多个地方分别复制状态文案。

- [ ] **Step 4: 创建 `BeforeYouContinue.astro`。**

```astro
---
interface TaskItem { text: string; }
interface Props {
  tasks: TaskItem[];
  authorityHref: string;
  authorityLabel: string;
  nextHref: string;
  nextLabel: string;
}
const { tasks, authorityHref, authorityLabel, nextHref, nextLabel } = Astro.props;
if (tasks.length < 3 || tasks.length > 7) throw new Error('BeforeYouContinue requires 3–7 tasks');
---
<section class="before-you-continue" aria-labelledby="before-you-continue-title">
  <h2 id="before-you-continue-title">Before you continue</h2>
  <ul>{tasks.map((task) => <li>{task.text}</li>)}</ul>
  <div class="button-row">
    <a class="button button--secondary" href={authorityHref}>{authorityLabel}</a>
    <a class="button button--primary" href={nextHref}>{nextLabel}</a>
  </div>
</section>
```

- [ ] **Step 5: 将组件接入 `GuideLayout.astro`。**

在 H1 前／后使用 `ContentStatusBar`，删除分散的 `GuideStatusBadge`／`LastCheckedBadge` 重复表达。让 layout 接收 `substantiveUpdates` 和 `completionTasks`；显示最新一条更新：

```astro
{latestUpdate && <section class="substantive-update"><h2>Latest content update</h2><p><time datetime={latestUpdate.date}>{latestUpdate.date}</time> — {latestUpdate.summary}</p><a href="/content-update-log/">View full update history</a></section>}
```

以 `BeforeYouContinue` 替换原 `Next action` 中的多 CTA 堆叠；navigator／pending 页面只显示官方核验动作和回首页／Route Finder，不能显示成熟路线 CTA。

- [ ] **Step 6: 在 `global.css` 添加最小样式。**

```css
.content-status-bar { display:flex; flex-wrap:wrap; gap:.5rem 1rem; align-items:center; padding:.75rem 1rem; border:1px solid var(--line); border-radius:var(--radius-sm); background:var(--surface); }
.before-you-continue, .substantive-update { margin-block:2rem; padding:1.25rem; border-left:4px solid var(--brand); background:var(--brand-tint); }
@media (max-width: 48rem) { .content-status-bar { align-items:flex-start; flex-direction:column; } }
```

使用现有 token，不创建新配色系统。

- [ ] **Step 7: 运行测试和构建。**

Run: `node tests/site.test.js && npm run build`

Expected: PASS，构建后的核心页有状态条、更新和 `Before you continue`；移动布局不溢出。

- [ ] **Step 8: Commit。**

```bash
git add src/components/ContentStatusBar.astro src/components/BeforeYouContinue.astro src/components/GuideStatusBadge.astro src/layouts/GuideLayout.astro src/styles/global.css tests/site.test.js
git commit -m "feat: add guide trust and completion components"
```

### Task 5: 建立共享的 A1/B1 五步 Route Hub

**Files:**
- Create: `src/data/core-route-content.ts`
- Create: `src/components/RouteHub.astro`
- Modify: `src/pages/germany-family-reunion-a1.astro`
- Modify: `src/pages/germany-b1-settlement-citizenship.astro`
- Modify: `src/styles/global.css`
- Test: `tests/germany-a1-cluster.test.js`
- Test: `tests/germany-b1-cluster.test.js`

- [ ] **Step 1: 写失败测试，替换旧的 A1 七步／全量内容要求。**

```js
const requiredHubSteps = [
  'Confirm the authority',
  'Verify accepted proof',
  'Prepare booking',
  'Plan your timeline',
  'Check before submission',
];
for (const file of [
  'src/pages/germany-family-reunion-a1.astro',
  'src/pages/germany-b1-settlement-citizenship.astro',
]) {
  const source = fs.readFileSync(file, 'utf8');
  for (const step of requiredHubSteps) assert.match(source, new RegExp(step));
  assert.match(source, /ContentStatusBar/);
  assert.match(source, /BeforeYouContinue/);
}
```

删除旧测试中“A1 必须 17 篇”“所有 A1 complete”“所有 B1 core”“七步固定标题”的断言，替换为“每条 hub 最多推荐 3 篇成熟支持页”和“非核心支持页不在 hub 主推荐”。

- [ ] **Step 2: 运行两个集群测试并确认失败。**

Run: `node tests/germany-a1-cluster.test.js && node tests/germany-b1-cluster.test.js`

Expected: FAIL，旧 A1/B1 页面没有共享五步模型。

- [ ] **Step 3: 创建 `src/data/core-route-content.ts`。**

定义强类型的 hub 数据：

```ts
export interface RouteHubStep {
  title: 'Confirm the authority' | 'Verify accepted proof' | 'Prepare booking' | 'Plan your timeline' | 'Check before submission';
  goal: string;
  verification: string[];
  mistakes: string[];
  guideHref: string;
  guideLabel: string;
  toolHref: string;
  toolLabel: string;
}
export interface RouteHubContent {
  id: 'germany-a1-family-reunion' | 'germany-b1-settlement-citizenship';
  title: string;
  description: string;
  directAnswer: string;
  authorityBoundary: string;
  stopConditions: string[];
  sourceReviewedAt: string;
  sources: { name: string; href: string }[];
  steps: RouteHubStep[];
  completionTasks: { text: string }[];
  supportingGuides: { href: string; title: string; description: string }[];
  substantiveUpdates: SubstantiveUpdate[];
}
```

A1 和 B1 各自必须有五项 `steps`，但 `goal`、`verification`、`mistakes`、来源和 stop condition 必须按路径真实差异填写；不能复制后仅替换 A1/B1 文本。

- [ ] **Step 4: 创建 `RouteHub.astro`。**

该组件使用 `Breadcrumbs`、`ContentStatusBar`、`BeforeYouContinue`、`VerificationAlert`、`SourceCard` 和现有按钮／卡片类，按照以下顺序渲染：状态条 → H1 → 直接答案 → authority boundary／stop conditions → 五步模块 → 关键风险 → 完成前清单 → 最多三张支持页卡片 → 工具 → 来源 → 最新更新 → `ReportOutdatedInfo`。

每个步骤模块必须渲染：

```astro
<section class="route-task-step" id={`step-${index + 1}`}>
  <p class="page-kicker">0{index + 1}</p><h2>{step.title}</h2>
  <p><strong>Goal:</strong> {step.goal}</p>
  <h3>What to verify</h3><ul>{step.verification.map((item) => <li>{item}</li>)}</ul>
  <h3>Common mistake to avoid</h3><ul>{step.mistakes.map((item) => <li>{item}</li>)}</ul>
  <div class="button-row"><a class="button button--primary" href={step.guideHref}>{step.guideLabel}</a><a class="button button--secondary" href={step.toolHref}>{step.toolLabel}</a></div>
</section>
```

- [ ] **Step 5: 将两个现有 hub 页面改为最小 wrapper。**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import RouteHub from '../components/RouteHub.astro';
import { germanyA1RouteHub } from '../data/core-route-content';
---
<BaseLayout title={germanyA1RouteHub.title} description={germanyA1RouteHub.description} canonicalURL="https://visalang.org/germany-family-reunion-a1/" enableAds={false}>
  <RouteHub content={germanyA1RouteHub} />
</BaseLayout>
```

B1 wrapper 使用 `germanyB1RouteHub`。整改期两个 hub 都 `enableAds={false}`，因为现有 Auto Ads 无法在源码层证明首屏和步骤之间不会出现广告。重新启用必须在第 12 天生产证据完成后由单独授权变更处理。

- [ ] **Step 6: 运行集群测试和构建。**

Run: `node tests/germany-a1-cluster.test.js && node tests/germany-b1-cluster.test.js && npm run build`

Expected: PASS；两个 hub 均有五步、状态条、来源、纠错、任务完成区；不存在首页／hub 广告 loader。

- [ ] **Step 7: Commit。**

```bash
git add src/data/core-route-content.ts src/components/RouteHub.astro src/pages/germany-family-reunion-a1.astro src/pages/germany-b1-settlement-citizenship.astro src/styles/global.css tests/germany-a1-cluster.test.js tests/germany-b1-cluster.test.js
git commit -m "feat: rebuild Germany route hubs around five tasks"
```

### Task 6: 重写选定英文核心支持页并降级其他 A1/B1 页面

**Files:**
- Modify: `src/content/guides/german-family-reunion-language-requirement.md`
- Modify: `src/content/guides/goethe-a1-germany-family-reunion.md`
- Modify: `src/content/guides/german-a1-exam-booking-timeline.md`
- Modify: `src/content/guides/goethe-a1-test-centers.md`（仅在来源审核通过时）
- Modify: `src/content/guides/germany-b1-citizenship-language-proof.md`
- Modify: `src/content/guides/goethe-b1-germany-settlement-work.md`
- Modify: `src/content/guides/goethe-b1-vs-telc-b1.md`
- Modify: `src/content/guides/germany-b1-settlement-citizenship-timeline.md`（仅在来源审核通过时）
- Modify: 其余 `src/content/guides` 中 A1/B1 辅助／备考页 frontmatter
- Test: `tests/germany-a1-cluster.test.js`
- Test: `tests/germany-b1-cluster.test.js`
- Test: `tests/content-integrity.test.js`

- [ ] **Step 1: 为每个选定页面写内容级失败测试。**

每个核心 slug 在测试中断言：`routeHub` 正确、`pageType: "core-support"`、已审核、非 noindex、广告候选、至少一个实质更新、来源字段完整，正文包含至少三个 `## Common mistakes` 子项和 `## Before you continue` 任务清单。

示例：

```js
const required = ['german-family-reunion-language-requirement', 'germany-b1-citizenship-language-proof'];
for (const slug of required) {
  const source = readGuide(slug);
  assert.equal(field(source, 'pageType'), 'core-support');
  assert.match(source, /## Common mistakes[\s\S]*\n- .+\n- .+\n- .+/);
  assert.match(source, /## Before you continue[\s\S]*\n- \[ \] .+/);
  assert.match(source, /## Official sources/);
}
```

- [ ] **Step 2: 运行测试并确认失败。**

Run: `node tests/germany-a1-cluster.test.js && node tests/germany-b1-cluster.test.js`

Expected: FAIL，因为核心页尚未采用新的完整任务结构。

- [ ] **Step 3: 按每个页面的唯一任务重写正文。**

每篇必须使用以下实际章节语义，不要求标题完全相同：

```markdown
## Who this applies to
## Direct answer
## When to stop and verify with the authority
## Decision path
## What to record before you book or submit
## Common mistakes
### [具体错误] — consequence and safer action
## Before you continue
- [ ] [任务 1]
- [ ] [任务 2]
- [ ] [任务 3]
## Official sources
```

页面任务不可重叠：

| 页面 | 只解决的任务 |
|---|---|
| `german-family-reunion-language-requirement` | 家庭团聚路径是否需要语言证明、谁决定、何时停止自行判断 |
| `goethe-a1-germany-family-reunion` | 已确认需要证明后，核验可接受的具体证明／考试产品与接收方边界 |
| `goethe-a1-test-centers` | 官方考试方与当地授权考点的执行信息核验，不给固定费用／日期 |
| `german-a1-exam-booking-timeline` | 从递交节点倒推报名、成绩和重考缓冲，不计算行政资格或处理期 |
| `germany-b1-citizenship-language-proof` | 入籍程序中主管机关／材料边界的核验任务 |
| `goethe-b1-germany-settlement-work` | 永居／居留相关情形的接收方优先核验，不把考试方当最终决定方 |
| `goethe-b1-vs-telc-b1` | 已确认候选证明后才比较 Goethe/telc 的产品核验维度 |
| `germany-b1-settlement-citizenship-timeline` | 永居／入籍递交前的时间线和材料复核缓冲 |

不得添加固定费用、日期、中心、保证接受性或“哪个更容易”的结论。

- [ ] **Step 4: 为未选 A1/B1 辅助页设置 navigator/pending 状态。**

对练习、题型、学习计划、难度、模考、口语题、写作题、资源等未选页面，使用：

```yaml
routeHub: "germany-a1-family-reunion" # 或 B1
pageType: "verification-navigator"
noindex: true
adsEligible: false
```

正文顶部必须明确这不是完整路线指南，并仅保留其当前可支持的官方核验／准备价值。若页面的实际价值不可区分，记录为后续 `Retire / Merge Candidate`，但不要在本任务删除 URL。

- [ ] **Step 5: 更新 frontmatter 的关系。**

核心页只允许一个 `nextGuideSlug` 和最多两个 `supportingGuideSlugs`。两者不得重复；跨路线／国际 related slug 必须移除。Route Hub 不从 Markdown `nextGuideSlug` 自动产生无关循环。

- [ ] **Step 6: 运行内容和构建验证。**

Run: `node tests/germany-a1-cluster.test.js && node tests/germany-b1-cluster.test.js && node tests/content-integrity.test.js && npm run build`

Expected: PASS；仅审核通过的 6–8 页保留主发现资格；其他 A1/B1 页面仍可访问但 noindex、无广告。

- [ ] **Step 7: Commit。**

```bash
git add src/content/guides tests/germany-a1-cluster.test.js tests/germany-b1-cluster.test.js tests/content-integrity.test.js
git commit -m "content: focus Germany A1 and B1 core task guides"
```

### Task 7: 收敛首页、导航、Guides、About 与页脚

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/data/site.ts`
- Modify: `src/components/GlobalHeader.astro`
- Modify: `src/components/MobileNavigation.astro`
- Modify: `src/components/GlobalFooter.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/guides/index.astro`
- Modify: `src/styles/global.css`
- Test: `tests/site.test.js`

- [ ] **Step 1: 写失败测试，定义公开信息架构。**

```js
const home = fs.readFileSync('src/pages/index.astro', 'utf8');
assert.match(home, /Germany A1[\s\S]*Family reunion/);
assert.match(home, /Germany B1[\s\S]*Settlement or citizenship/);
assert.match(home, /Not sure which route applies/);
assert.doesNotMatch(home, /enableAds=\{true\}/);

const footer = fs.readFileSync('src/components/GlobalFooter.astro', 'utf8');
for (const href of ['/about/', '/editorial-policy/', '/content-update-log/', '/contact/', '/privacy-policy/', '/cookie-policy/', '/terms/', '/affiliate-disclosure/']) {
  assert.ok(footer.includes(`href="${href}"`), `footer links ${href}`);
}
```

- [ ] **Step 2: 运行测试并确认失败。**

Run: `node tests/site.test.js`

Expected: FAIL，因为首页未同级展示 B1，页脚缺 Cookie、Affiliate、Update Log，且首页硬编码广告启用。

- [ ] **Step 3: 重写英文首页为三分流。**

替换 hero／工具优先叙事：

```astro
<BaseLayout ... enableAds={false}>
  <main class="site-main">
    <header class="home-hero">
      <div class="home-hero__copy">
        <p class="eyebrow">Germany language-proof routes</p>
        <h1>Prepare the right German language proof — before you book an exam.</h1>
        <p>VisaLang helps you verify requirements, plan your timeline, and prepare questions for the authority handling your case.</p>
      </div>
    </header>
    <section class="route-choice-grid" aria-label="Choose a Germany route">
      <!-- A1 card: /germany-family-reunion-a1/ -->
      <!-- B1 card: /germany-b1-settlement-citizenship/ -->
      <!-- Not sure card: /tools/route-finder/ -->
    </section>
  </main>
</BaseLayout>
```

保留四步方法，展示每个核心路线最多两篇成熟支持页，最多四篇总计；信任区加入 Editorial Method、Content Update Log、Contact/corrections。移除把多国、工具库规模或总文章数作为首页核心卖点的文案。

- [ ] **Step 4: 收敛 `site.ts` 和 Header/Mobile Navigation。**

Routes 菜单只提供 A1、B1 与 Route Finder。About 菜单提供 About、Editorial Method、Content Update Log、Contact。Pricing／Partners 仍可通过直链访问，但不可作为主要导航项。同步更新移动导航，避免桌面和移动端出现不同的国际入口。

- [ ] **Step 5: 完整更新 Footer。**

路线区仅显示 Germany A1、Germany B1、Tools。政策／信任区按设计的八项直链输出。中文站如无对应页面，链接使用英文并明确 `（英文）`，不得制造不存在的本地化路由。

- [ ] **Step 6: 重写 About 页面范围文案。**

删除将 TestDaF、UK、Canada、Italy 等写作对等“已发布覆盖”的句子。明确说明：A1/B1 是完整路线；其他保留页面是 Official Verification Navigator，不是完整路线指南；链接到编辑方法、更新记录和纠错通道。

- [ ] **Step 7: 添加最小 CSS。**

```css
.route-choice-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1rem; }
.route-choice-card { padding:1.5rem; border:1px solid var(--line); border-radius:var(--radius); background:var(--surface); }
@media (max-width: 48rem) { .route-choice-grid { grid-template-columns:1fr; } }
```

使用现有卡片、按钮和 token；不要重构不相关样式。

- [ ] **Step 8: 运行测试、构建和输出检查。**

Run: `node tests/site.test.js && npm run build && npm run launch-check`

Expected: PASS；首页／header／footer 只主推确认范围，所有信任链接在生成 HTML 中存在。

- [ ] **Step 9: Commit。**

```bash
git add src/pages/index.astro src/data/site.ts src/components/GlobalHeader.astro src/components/MobileNavigation.astro src/components/GlobalFooter.astro src/pages/about.astro src/pages/guides/index.astro src/styles/global.css tests/site.test.js
git commit -m "feat: focus public navigation on Germany core routes"
```

### Task 8: 实现 Editorial Method 与公开 Content Update Log

**Files:**
- Modify: `src/pages/editorial-policy.astro`
- Create: `src/pages/content-update-log.astro`
- Modify: `src/data/core-route-content.ts`
- Modify: `src/pages/guides/[slug].astro`
- Test: `tests/site.test.js`
- Test: `scripts/launch-check.js`

- [ ] **Step 1: 写失败测试。**

```js
const editorial = read('src/pages/editorial-policy.astro');
for (const phrase of ['Final decision authority', 'Exam product owner', 'Local execution', 'AI-assisted work', 'Report a correction']) {
  assert.match(editorial, new RegExp(phrase));
}
assert.ok(fs.existsSync('src/pages/content-update-log.astro'));
```

输出检查应要求 `/content-update-log/` noindex、无 AdSense runtime、存在至少一项核心页面实质更新。

- [ ] **Step 2: 运行测试并确认失败。**

Run: `node tests/site.test.js`

Expected: FAIL，因为更新记录页尚不存在，编辑政策未描述所有确认职责。

- [ ] **Step 3: 更新 Editorial Policy 为方法页内容。**

保留 URL `/editorial-policy/`，但页面 H1 使用 `Editorial method`。页面必须直接说明：来源优先级；最终决定方／考试产品方／本地执行方分工；冲突信息处理；何时只给核验动作；写作、来源核验、翻译审校和发布责任；AI 只可辅助初稿、整理、语言润色或翻译，关键事实需人工按来源核验；团队署名不是资质声明；纠错流程；非法律／移民／个案建议边界。

删除全称断言如 “Every guide cites…”；替换为“Only pages that satisfy the recorded source-review standard are included in the reviewed Germany guide library.”

- [ ] **Step 4: 创建 `content-update-log.astro`。**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { allSubstantiveUpdates } from '../data/core-route-content';
const updates = [...allSubstantiveUpdates].sort((a, b) => b.date.localeCompare(a.date));
---
<BaseLayout title="Content update log" description="Substantive updates to VisaLang’s reviewed Germany route content." canonicalURL="https://visalang.org/content-update-log/" noindex={true} enableAds={false}>
  <main class="site-main">
    <h1>Content update log</h1>
    <p>We record changes that affect a reader’s decision, source boundary, route task, or risk warning. Styling and minor typo changes are not listed.</p>
    <ol>{updates.map((update) => <li><time datetime={update.date}>{update.date}</time> — <a href={update.href}>{update.pageTitle}</a>: {update.summary}{update.readerRecheckRequired ? ' Recheck the official authority before acting.' : ''}</li>)}</ol>
  </main>
</BaseLayout>
```

在 `core-route-content.ts` 导出 `allSubstantiveUpdates`，其字段为 `date`、`href`、`pageTitle`、`summary`、`readerRecheckRequired`。Markdown 页的更新可在 `[slug].astro` 汇总，或建立同源 registry；不得手写与 Markdown 不一致的第二份日期。

- [ ] **Step 5: 运行测试和构建。**

Run: `node tests/site.test.js && npm run build && npm run launch-check`

Expected: PASS；编辑方法和更新日志页面可访问、noindex、无广告，状态条能链接到更新日志。

- [ ] **Step 6: Commit。**

```bash
git add src/pages/editorial-policy.astro src/pages/content-update-log.astro src/data/core-route-content.ts src/pages/guides/[slug].astro tests/site.test.js scripts/launch-check.js
git commit -m "feat: publish editorial method and update log"
```

### Task 9: 英文审核完成后实施中文 A1/B1 核心路径

**Files:**
- Modify: `src/data/zh-germany-a1.ts`（必要时重命名为 `src/data/zh-germany-core.ts`）
- Modify: `src/components/ZhGuideLayout.astro`
- Modify: `src/pages/zh/index.astro`
- Modify: `src/pages/zh/germany-family-reunion-a1.astro`
- Create: `src/pages/zh/germany-b1-settlement-citizenship.astro`
- Create: 2–4 个 `src/pages/zh/guides/<core-slug>.astro`
- Modify: `src/data/site.ts`
- Test: `tests/germany-a1-cluster.test.js`
- Test: `tests/germany-b1-cluster.test.js`

- [ ] **Step 1: 检查英文核心页发布清单是否已通过。**

Run: `node tests/germany-a1-cluster.test.js && node tests/germany-b1-cluster.test.js && node tests/content-integrity.test.js`

Expected: PASS。若失败，停止本任务，先回到 Task 6；中文不得抢在英文事实审核前发布。

- [ ] **Step 2: 写失败测试，规定中文发布数量、互链和广告状态。**

```js
for (const path of [
  '/zh/germany-family-reunion-a1/',
  '/zh/germany-b1-settlement-citizenship/',
]) {
  const html = read(`dist${path}index.html`);
  assert.ok(!html.includes(adsenseHost));
  assert.match(html, /来源核验日期|Source-reviewed on/);
}
assert.match(read('dist/zh/index.html'), /德国 A1[\s\S]*德国 B1[\s\S]*不确定/);
```

- [ ] **Step 3: 统一中文核心记录结构。**

每条记录必须含：`slug`、`href`、`englishHref`、`routeHubHref`、`status`、`sourceReviewedAt`、`updatedDate`、`substantiveUpdates`、`officialSources`、`completionTasks`、`related`。不要把全部中文页面默认写为 `complete-route`；中文 hub 为 complete，支持页为 core support。

- [ ] **Step 4: 将中文 A1 hub 改为五步任务页，并新增 B1 中文 hub。**

中文 A1/B1 均需：直接答案、主管机关边界、停止条件、五步任务、来源、纠错、任务完成区。中文表达必须自然，且所有事实范围不得弱于英文。两个 hub 明确 `enableAds={false}`。

- [ ] **Step 5: 新增 2–4 个中文核心支持页。**

优先顺序：A1 证明／接受性、A1 时间线、B1 主管机关／程序、B1 证明／接受性。每页使用 `ZhGuideLayout`，并让该 layout 复用与英文同义的状态、更新和完成区数据；相关内容最多两篇。

- [ ] **Step 6: 更新翻译路径和语言切换。**

在 `src/data/site.ts` 为 B1 hub 和新增中文页添加双向 `translatedPaths`。只对真实存在的一对页面输出 reciprocal hreflang；没有中文页时不生成虚假的 `zh-CN` alternate。

- [ ] **Step 7: 收敛中文首页。**

移除 TestDaF、UK、Italy、Spain 等国际卡片／统计；同级展示 A1、B1、Route Finder。国际信息仅保留非主发现的官方核验说明，不作为首页路线入口。

- [ ] **Step 8: 运行测试与构建。**

Run: `node tests/germany-a1-cluster.test.js && node tests/germany-b1-cluster.test.js && npm run build && npm run launch-check`

Expected: PASS；中文核心页面无广告、语言互链正确、没有国际页面从中文首页被主动推荐。

- [ ] **Step 9: Commit。**

```bash
git add src/data/zh-germany-a1.ts src/components/ZhGuideLayout.astro src/pages/zh src/data/site.ts tests/germany-a1-cluster.test.js tests/germany-b1-cluster.test.js
git commit -m "feat: add focused Chinese A1 and B1 route support"
```

### Task 10: 把发布验证改为设计门槛，而非旧产品快照

**Files:**
- Modify: `tests/site.test.js`
- Modify: `tests/adsense-risk-exposure.test.js`
- Modify: `tests/germany-a1-cluster.test.js`
- Modify: `tests/germany-b1-cluster.test.js`
- Modify: `scripts/launch-check.js`
- Create: `tests/core-route-publication.test.js`

- [ ] **Step 1: 创建 `tests/core-route-publication.test.js`，写完整矩阵测试。**

```js
const coreSlugs = new Set([
  'german-family-reunion-language-requirement',
  'goethe-a1-germany-family-reunion',
  'german-a1-exam-booking-timeline',
  'germany-b1-citizenship-language-proof',
  'goethe-b1-germany-settlement-work',
  'goethe-b1-vs-telc-b1',
]);

for (const guide of allGuides) {
  const isCore = coreSlugs.has(guide.slug);
  const html = read(`dist/guides/${guide.slug}/index.html`);
  if (isCore) {
    assert.ok(!html.includes('noindex,follow'));
    assert.ok(sitemap.includes(`/guides/${guide.slug}/`));
  } else {
    assert.match(html, /noindex,follow/);
    assert.ok(!html.includes(adsenseHost));
    assert.ok(!sitemap.includes(`/guides/${guide.slug}/`));
  }
}
```

若第 6 篇核心候选被来源审核拒绝，从 `coreSlugs` 删除，而不要为了通过测试保留它。

- [ ] **Step 2: 运行测试并确认失败。**

Run: `node tests/core-route-publication.test.js`

Expected: FAIL，直到 build、sitemap、前端门控和 frontmatter 全部一致。

- [ ] **Step 3: 将旧测试中的过期断言替换为当前设计。**

删除／替换：A1 17 篇、B1 13 篇、所有页面成熟、七步骤、首页广告、Pricing/Partners 主导航、德国 A1 category 必然可索引等断言。保留 H1、canonical、JSON-LD、可访问性、官方来源、无误导性承诺的有效检查。

- [ ] **Step 4: 更新 `scripts/launch-check.js`。**

构建输出须检查：

```js
assertPage('/germany-family-reunion-a1/', ['Complete Route Guide', 'Confirm the authority', 'Before you continue']);
assertPage('/germany-b1-settlement-citizenship/', ['Complete Route Guide', 'Verify accepted proof', 'Before you continue']);
assertNoAds('/content-update-log/');
assertNoAds('/tools/route-finder/');
assertNoAds('/guides/ielts-ukvi-uk-visa/');
```

对每个 Markdown route 读取其构建 HTML；将 `noindex`、sitemap、广告 runtime 与 `isGuidePrimaryDiscoveryEligible`／`isGuideAdvertisingEligible` 的预期集合逐项比对。输出错误时列出 route 和三个实际值。

- [ ] **Step 5: 运行完整本地门禁。**

Run: `npm test && npm run launch-check && git diff --check`

Expected: 全部 PASS；若存在旧测试和确认设计冲突，修改测试为新的验收，而不是回退设计。

- [ ] **Step 6: Commit。**

```bash
git add tests/core-route-publication.test.js tests/site.test.js tests/adsense-risk-exposure.test.js tests/germany-a1-cluster.test.js tests/germany-b1-cluster.test.js scripts/launch-check.js
git commit -m "test: enforce A1 B1 publication and ad boundaries"
```

### Task 11: 生产前人工 UI、SEO 与内容审查

**Files:**
- Create: `docs/review/2026-08-02-a1-b1-publication-checklist.md`
- Create: `docs/review/2026-08-02-a1-b1-source-records.md`
- Create: `docs/review/2026-08-02-a1-b1-known-risks.md`
- Modify: `docs/TASK_LOG.md`

- [ ] **Step 1: 创建逐页发布检查记录。**

文件表头必须为：

```markdown
| URL | 页面等级 | 独立任务 | 最终决定方 | 考试产品方 | 来源已核验 | 三个具体错误 | 任务产出 | 更新记录 | index | sitemap | ads | 桌面 | 手机 | 结论 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
```

对每个 6–8 英文核心页和 4–6 中文页逐行填写。任何未知项填 `未核验`，不得填“通过”。

- [ ] **Step 2: 创建官方来源记录。**

```markdown
| URL | 结论／任务 | 最终决定方 URL | 考试产品方 URL | 本地执行方／读者动作 | 核验日期 | 审核角色 | 仍未解决的个案边界 |
|---|---|---|---|---|---|---|---|
```

来源记录只列实际打开并核验过的官方 URL。动态事实无法核验时记录读者要执行的官方核验动作。

- [ ] **Step 3: 本地启动并手动检查桌面与窄屏。**

Run: `npm run dev`

在浏览器检查 `/`、两个英文 hub、每篇核心英文页、中文首页／hub、一个国际 navigator、`/guides/`、`/editorial-policy/`、`/content-update-log/`。逐项记录：一个 H1、状态条、来源、纠错、任务区、无横向溢出、键盘焦点、无广告 runtime（首页／工具／政策／国际页）。

- [ ] **Step 4: 运行正式本地门禁并把结果写入 `TASK_LOG.md`。**

Run: `npm test && npm run launch-check && git diff --check`

在日志中记录日期、命令、结果、未验证外部项和回滚条件。失败时保持 No-Go，修复后重新执行；不得仅记录“已运行”。

- [ ] **Step 5: Commit 文档与检查记录。**

```bash
git add docs/review docs/TASK_LOG.md
git commit -m "docs: record A1 B1 publication review"
```

### Task 12: 生产证据包与 AdSense Go / No-Go 决策（负责人执行）

**Files:**
- Create: `docs/review/2026-08-02-adsense-production-evidence.md`
- Create: `docs/review/2026-08-02-adsense-go-no-go.md`

- [ ] **Step 1: 发布前确认授权与回滚。**

在证据文档写入发布负责人、授权时间、目标 commit、部署命令、当前生产版本、回滚 artifact／路径。未获得明确授权时停止，不部署。

- [ ] **Step 2: 发布后收集公网技术证据。**

记录以下 URL 的 HTTP 状态、canonical、robots、AdSense loader、sitemap 是否含 URL：首页、A1 hub、B1 hub、两个核心支持页、一个国际 navigator、工具页、Editorial Method、Update Log、Cookie、Affiliate、404。将每个实际值写入表格；不以预期值替代实测值。

- [ ] **Step 3: 由账户负责人完成 CMP 与广告证据。**

在 EEA、英国、瑞士的测试环境分别记录：同意、拒绝、管理、再次打开、页面表现、浏览器、日期和截图路径。桌面与手机检查 A1/B1 候选页的广告不遮挡答案、风险、步骤、来源或 CTA；检查 Auto Ads 不出现在首页、工具、政策、国际 noindex 或 404 页面。

- [ ] **Step 4: 由账户负责人完成 Search Console 证据。**

记录 sitemap 提交状态；对 A1/B1 hubs 和两个核心支持页运行 URL Inspection；记录抓取／索引状态和错误。不要将“可访问”写成“已收录”。

- [ ] **Step 5: 填写 Go / No-Go 文件。**

`docs/review/2026-08-02-adsense-go-no-go.md` 必须逐项复用设计文档第 9.1 节的四类门槛，并对每项写 `Go`、`No-Go` 或 `未核验`、对应证据文件和负责人。结论规则：出现任意 `No-Go` 或 `未核验` 即写：

```markdown
## 决策
No-Go — 不提交 AdSense 复审。

## 必须关闭的缺口
- [具体缺口和责任人]
```

只有全项 `Go` 时才写：

```markdown
## 决策
Go — 可以由获得授权的账户负责人提交 AdSense 复审。
```

- [ ] **Step 6: 在明确授权后才提交复审。**

提交前截取 Policy Center 状态；提交后记录时间、提交人和截图。不得由无权限实施者替代账户负责人点击提交。

- [ ] **Step 7: Commit 仅包含非敏感证据元数据。**

```bash
git add docs/review/2026-08-02-adsense-production-evidence.md docs/review/2026-08-02-adsense-go-no-go.md
git commit -m "docs: record AdSense remediation decision"
```

不要提交含个人数据、账户凭证、Cookie、原始同意记录或敏感截图的文件；在文档中仅引用受控存储位置。

## 4. 全计划最终验证

在所有代码、内容和本地文档任务完成后，执行：

```bash
npm test
npm run launch-check
git diff --check
git status --short
```

预期：前 3 个命令均成功；`git status --short` 只列出已知、待提交或明确保留的变更。随后按 Task 12 做生产验证和 Go / No-Go；未完成外部验证时，计划状态仍为 **No-Go**，即使所有本地检查通过。

## 5. 设计覆盖自查

| 已确认设计要求 | 实现任务 |
|---|---|
| A1/B1 双层定位、国际内容隔离 | Tasks 1–3、6–7 |
| 6–8 英文与 4–6 中文核心内容 | Tasks 6、9 |
| 内容分级、来源、原创任务与发布清单 | Tasks 1–2、4、6、11 |
| 首页／Hub／支持页任务型 UI | Tasks 4–5、7 |
| 编辑方法、更新记录、团队透明度 | Tasks 4、8 |
| 广告边界、noindex、sitemap 一致 | Tasks 1–3、5、10、12 |
| 两周倒排、生产证据、Go / No-Go | Tasks 11–12 |

## 6. 计划自查

- **范围：** 未新增商业化、追踪、付费、表单或广告位；外部账户操作明确留给授权负责人。
- **一致性：** `routeHub`、`pageType`、`isGuidePrimaryDiscoveryEligible()` 与 `isGuideAdvertisingEligible()` 是全计划唯一的资格命名和行为接口。
- **无占位：** 每项代码任务提供精确路径、测试、命令和实现接口；正文事实仅允许在实际官方来源审核后填写。
- **可分批交付：** 门控 → 隔离 → 信任组件 → hubs → 核心内容 → 导航 → 中文 → 自动化 → 生产证据，每一阶段均可单独验证和提交。
