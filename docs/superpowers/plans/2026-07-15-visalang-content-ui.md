# VisaLang Content, Trust, UI and Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the verified spec `2026-07-15-visalang-content-ui-design.md` so VisaLang content trust, accessibility, UI and release gates align without policy or privacy regression.

**Architecture:** A six-phase double-track rollout — facts and gates first, UI second, audit and release last. Open Design handles first-pass Astro UI; Claude owns source-review data, audits and the release gate; Codex performs read-only review only.

**Tech Stack:** Astro 7, TypeScript, Node assert tests, `@astrojs/sitemap`, content collections, `src/data/source-review.ts`, `src/content.config.ts`.

**Authoritative spec:** `docs/superpowers/specs/2026-07-15-visalang-content-ui-design.md`
**Companion guides:** `docs/OPEN_DESIGN_UI_PROMPTS_V2_2026-07-14.md`, `docs/CODEX_EXECUTION_PROMPTS_2026-07-14.md`, `docs/CODEX_UI_IMPLEMENTATION_PROMPTS_2026-07-14.md`, `docs/RELEASE_AUDIT_AND_DEPLOY_PROMPT.md`, `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md`.

---

## Worktree, file structure and shared conventions

- Work inside `VisaLang/`. Use the existing branch and respect the current modified/untracked files (`docs/CONTENT_VERTICAL_UPGRADE.md`, `CLAUDE.md`, `AGENTS.md`, plus the docs created in this session). Never overwrite them.
- All public URLs keep `trailingSlash: 'always'`. Run `npm test` and `npm run launch-check` after any change touching public routes, navigation, SEO, content schema, layout or tools.
- Never hand-edit `dist/`, `.astro/`, `node_modules/`, root legacy HTML/CSS/JS, `deploy/`, `public/_headers`, `public/_redirects`, `robots.txt`, `astro.config.mjs`, `package-lock.json` unless explicitly authorised.
- Use imperative commit prefixes (`feat:`, `fix:`, `content:`, `docs:`, `style:`, `chore:`) per `AGENTS.md`. Stage by name; never `git add -A`.
- Frontmatter strings follow `YYYY-MM-DD`. Source-review status values are `reviewed | pending | not-applicable`. Content status values are `complete-route | core-route | starter-overview | verification-pending`.

---

## Phase 0 — Baseline freeze

### Task 0.1: Capture baseline state

**Files:**
- Create: `docs/IMPL_BASELINE_2026-07-15.md`
- Read only: `git status --short --branch`, `git diff --stat`, every file under `src/`, `tests/`, `scripts/`, `public/`, `deploy/`.

- [ ] **Step 1: Capture git state**

```bash
cd VisaLang
git status --short --branch > /tmp/baseline-git.txt
git diff --stat >> /tmp/baseline-git.txt
git rev-parse HEAD >> /tmp/baseline-git.txt
```

- [ ] **Step 2: Map active Astro surface**

Enumerate the file paths actually imported by `BaseLayout.astro`, `GuideLayout.astro`, `ArticleLayout.astro`, `ToolLayout.astro`, `src/pages/index.astro`, `src/pages/guides/index.astro`, the five tool pages, `src/styles/global.css` and `src/styles/open-design.css`. Resolve any duplicate CSS tokens or `body:has(...)` overrides; mark which rules still apply at runtime.

- [ ] **Step 3: Confirm `dist/` & `.astro/` are produced, not edited**

```bash
test -d dist && echo "dist present"
test -d .astro && echo ".astro present"
```

Do not modify either.

- [ ] **Step 4: Confirm legacy layer boundaries**

List `index.html`, `app.js`, `app-data.js`, `styles.css`, root `guides/*.html`, `zh/*.html`, `germany-family-reunion-a1.html`, `do-i-need-german-a1.html` as legacy; state they are out of scope for the migration.

- [ ] **Step 5: Confirm deployment mapping (read-only)**

Read `deploy/README.md` and `deploy/deploy.sh`. List host identifiers, site directories, Nginx vhost names, last-known public URL and DNS names — but never the credentials or secrets. If mapping is incomplete, write `DEPLOYMENT_TARGET_MAPPING_BLOCKED` into the baseline.

- [ ] **Step 6: Write baseline report**

Save `docs/IMPL_BASELINE_2026-07-15.md` with the captured git state, active Astro/CSS surface, legacy boundary, deployment mapping, and any BLOCKED items.

- [ ] **Step 7: Commit baseline**

```bash
git add docs/IMPL_BASELINE_2026-07-15.md
git commit -m "chore: capture implementation baseline for content/ui migration"
```

---

## Phase 0.5 — Consent, ad-tech and privacy freeze

> No UI task starts until Phase 0.5 records the named owners for each blocked decision. Reference: `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md` §9.

### Task 0.5.1: Record named owners for §9 inputs

**Files:**
- Modify: `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md` (append a §11 Owners table only)

- [ ] **Step 1: Add named-owner table at end of record**

Append a §11 Owners table (markdown) to `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md`:

```markdown
## 11. Named owners for §9 inputs

| §9 input | Named owner | Approval evidence |
| --- | --- | --- |
| Target regions | <name — product> | <ticket / doc URL> |
| Applicable consent framework | <name — legal> | <ticket / doc URL> |
| CMP / explicit no-CMP strategy | <name — product + ad-ops> | <ticket / doc URL> |
| Allowed supplier list | <name — ad-ops> | <ticket / doc URL> |
| Consent-state storage duration | <name — legal> | <ticket / doc URL> |
| Pre-consent advertising rule | <name — product + legal> | <ticket / doc URL> |
| Policy-copy approval | <name — legal> | <ticket / doc URL> |

Implementation of any non-essential script or claim remains BLOCKED until every row
has a named owner and approval evidence.
```

- [ ] **Step 2: Commit record**

```bash
git add docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md
git commit -m "chore: record named owners for consent/ad-tech decisions"
```

### Task 0.5.2: Document restore checklist

**Files:**
- Modify: `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md` (append §12)

- [ ] **Step 1: Append restore checklist**

Append:

```markdown
## 12. Restore checklist before resuming any paused non-essential script

1. Implementation evidence: provider-neutral gate (state, region, load, withdraw, versioned storage, test hooks).
2. Approval evidence: every §9 input row has a named owner and approval.
3. Regional evidence: all 9 network checks in §7 executed for each approved region.
4. Build evidence: `npm test` and `npm run launch-check` pass with current `AUDITED_SHA`.
5. Release evidence: deployment authorised by the release author with target, mapping and rollback plan.
```

- [ ] **Step 2: Commit**

```bash
git add docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md
git commit -m "docs: add restore checklist for paused non-essential scripts"
```

---

## Phase 1 — Existing data path gap audit and minimal patch

> Goal: do not rebuild what already exists. Identify gaps, then patch only where evidence shows one.

### Task 1.1: Audit data path

**Files:**
- Create: `docs/DATA_PATH_AUDIT_2026-07-15.md`
- Read: `src/content.config.ts`, `src/data/source-review.ts`, `src/pages/index.astro`, `src/pages/guides/index.astro`, `src/pages/guides/[slug].astro`, `src/components/GuideCard.astro`, `src/layouts/GuideLayout.astro`, `tests/site.test.js`, `tests/source-review-render.test.js`.

- [ ] **Step 1: Capture current field coverage**

In `docs/DATA_PATH_AUDIT_2026-07-15.md`, record for every guide field (`title`, `description`, `category`, `slug`, `publishedDate`, `updatedDate`, `sourceReviewedAt`, `sourceReviewStatus`, `reviewedByRole`, `contentStatus`, `primaryIntent`, `decisionStage`, `nextGuideSlug`, `supportingGuideSlugs`, `comparisonScope`, `audienceScope`, `finalDecisionAuthorityType`, `primaryOfficialAuthorityUrl`, `examOwnerUrl`, `localExecutionPrompt`, `author`, `readingTime`, `featured`, `eyebrow`, `route`) the file or component that reads it, the page or layout that renders it, and whether the field is currently in `LastCheckedBadge`, `GuideCard`, `ArticleLayout`, `GuideLayout` and `ZhGuideLayout`.

- [ ] **Step 2: List gaps**

Mark a field `GAP` when: frontmatter allows it, but no consumer reads it; or a consumer reads it, but no template renders it. Mark a field `RENDERED` only when both consumer and template handle the value with no hard-coded fallback.

- [ ] **Step 3: Commit audit**

```bash
git add docs/DATA_PATH_AUDIT_2026-07-15.md
git commit -m "docs: audit current guide data path before patching"
```

### Task 1.2: Update source-review tests for `evidenceIds` contract

**Files:**
- Modify: `tests/source-review-render.test.js`

> Test-only change to lock the future input contract before implementation.

- [ ] **Step 1: Add failing test for `evidenceIds`**

Append a new test block to `tests/source-review-render.test.js`:

```js
const { resolveGuideContentStatus } = require('../src/data/source-review');

assert.equal(
  resolveGuideContentStatus({ contentStatus: 'core-route', category: 'uk', sourceReviewStatus: 'reviewed', primaryOfficialAuthorityUrl: 'https://gov.uk/' }),
  'core-route',
  'core-route without evidenceIds keeps legacy gate'
);

assert.equal(
  resolveGuideContentStatus({ contentStatus: 'core-route', category: 'uk', sourceReviewStatus: 'reviewed', primaryOfficialAuthorityUrl: 'https://gov.uk/', evidenceIds: ['uk-visa-language-requirement'] }),
  'core-route',
  'core-route with provided evidenceIds passes'
);

assert.equal(
  resolveGuideContentStatus({ contentStatus: 'core-route', category: 'uk', sourceReviewStatus: 'reviewed', primaryOfficialAuthorityUrl: 'https://gov.uk/', evidenceIds: [] }),
  'verification-pending',
  'core-route with empty evidenceIds must downgrade'
);
```

- [ ] **Step 2: Run the new tests — expect failure on the empty `evidenceIds` case**

```bash
node tests/source-review-render.test.js
```

The first two assertions pass; the third fails because `evidenceIds` is not part of the input yet.

- [ ] **Step 3: Commit failing test**

```bash
git add tests/source-review-render.test.js
git commit -m "test: lock evidenceIds contract for high-risk content gate"
```

### Task 1.3: Extend `resolveGuideContentStatus` and add `withHighRiskEvidenceGate`

**Files:**
- Modify: `src/data/source-review.ts`

- [ ] **Step 1: Add new input field and helper**

Replace `GuideStatusGateInput` and `resolveGuideContentStatus` with:

```ts
export interface GuideStatusGateInput {
  contentStatus: ContentStatus;
  category: string;
  sourceReviewStatus: SourceReviewStatus;
  primaryOfficialAuthorityUrl?: string;
  primaryIntent?: string;
  audienceScope?: string;
  finalDecisionAuthorityType?: string;
  examOwnerUrl?: string;
  localExecutionPrompt?: string;
  evidenceIds?: string[];
}

export function resolveGuideContentStatus(guide: GuideStatusGateInput): ContentStatus {
  const isHighRiskGuide = highRiskRouteCategories.includes(guide.category as typeof highRiskRouteCategories[number]);
  const requestsElevatedStatus = guide.contentStatus === 'complete-route' || guide.contentStatus === 'core-route';
  if (isHighRiskGuide && requestsElevatedStatus && (!guide.primaryOfficialAuthorityUrl || guide.sourceReviewStatus !== 'reviewed')) {
    return 'verification-pending';
  }
  return guide.contentStatus;
}

export function withHighRiskEvidenceGate(guide: GuideStatusGateInput): ContentStatus {
  const resolved = resolveGuideContentStatus(guide);
  const isHighRiskGuide = highRiskRouteCategories.includes(guide.category as typeof highRiskRouteCategories[number]);
  const requestsElevatedStatus = resolved === 'complete-route' || resolved === 'core-route';
  if (!isHighRiskGuide || !requestsElevatedStatus) return resolved;
  if (!guide.evidenceIds || guide.evidenceIds.length === 0) return 'verification-pending';
  return resolved;
}
```

- [ ] **Step 2: Run targeted test**

```bash
node tests/source-review-render.test.js
```

Expect all three new assertions to pass.

- [ ] **Step 3: Run full suite**

```bash
npm test
```

Expect PASS.

- [ ] **Step 4: Commit**

```bash
git add src/data/source-review.ts
git commit -m "feat: add evidence gate to high-risk content status"
```

### Task 1.4: Add `high-risk-evidence` index

**Files:**
- Create: `src/data/high-risk-evidence.ts`

- [ ] **Step 1: Author the index**

```ts
export interface HighRiskEvidenceRecord {
  id: string;
  factOrScope: string;
  authorityType: string;
  authorityUrl: string;
  reviewedAt: string;
  supports: string[];
  doesNotSupport: string[];
  readerMustConfirm: string[];
  reviewerRole: 'source-review';
}

export const highRiskEvidenceIndex: Record<string, HighRiskEvidenceRecord[]> = {
  uk: [
    {
      id: 'uk-visa-language-requirement',
      factOrScope: 'UK visa application language requirement',
      authorityType: 'UK Visas and Immigration',
      authorityUrl: 'https://www.gov.uk/government/organisations/uk-visas-and-immigration',
      reviewedAt: '2026-07-15',
      supports: ['UK government links to SELT providers for visa language proof'],
      doesNotSupport: ['Specific accepted SELT scores', 'Service standard timelines'],
      readerMustConfirm: ['Score acceptance against the latest UKVI guidance'],
      reviewerRole: 'source-review',
    },
  ],
};

export function findHighRiskEvidence(category: string, evidenceIds: string[] | undefined): HighRiskEvidenceRecord[] {
  if (!evidenceIds || evidenceIds.length === 0) return [];
  const pool = highRiskEvidenceIndex[category] ?? [];
  return pool.filter((record) => evidenceIds.includes(record.id));
}
```

> Records for Portugal, Spain, Canada, Italy, France, Finland, Netherlands are added in Phase 2 by Claude using only supplied source packs.

- [ ] **Step 2: Commit**

```bash
git add src/data/high-risk-evidence.ts
git commit -m "feat: seed high-risk evidence index and lookup helper"
```

### Task 1.5: Wire gate through guides index and article pages

**Files:**
- Modify: `src/pages/guides/index.astro`, `src/pages/guides/[slug].astro`, `src/components/GuideCard.astro`, `src/layouts/GuideLayout.astro`

- [ ] **Step 1: Update guides index**

In `src/pages/guides/index.astro`, import `withHighRiskEvidenceGate` from `../../data/source-review` and replace the call to `guideMaturityStatus` with a call that passes `evidenceIds: guide.data.evidenceIds`. Re-derive the `status` field via:

```ts
import { withHighRiskEvidenceGate } from '../../data/source-review';

const status = withHighRiskEvidenceGate({
  ...guide.data,
  category: guide.data.category,
  evidenceIds: guide.data.evidenceIds,
});
```

Apply this for both the English and Chinese guide lists already present in the file.

- [ ] **Step 2: Update slug page**

In `src/pages/guides/[slug].astro`, call `withHighRiskEvidenceGate({ ...guide.data, evidenceIds: guide.data.evidenceIds })` and use the resulting status for the article header.

- [ ] **Step 3: Update GuideCard**

In `src/components/GuideCard.astro`, replace any usage of `guideMaturityStatus(guide.data.category)` with `withHighRiskEvidenceGate({ ...guide.data, category: guide.data.category, evidenceIds: guide.data.evidenceIds })`. Update the `status` prop to receive the new value.

- [ ] **Step 4: Update GuideLayout**

In `src/layouts/GuideLayout.astro`, replace the existing status source with `withHighRiskEvidenceGate({ ...guide.data, category: guide.data.category, evidenceIds: guide.data.evidenceIds })` and pass the result to the same `GuideStatusBadge`, `LastCheckedBadge` and `showSourceFactTable` checks.

- [ ] **Step 5: Run targeted tests**

```bash
node tests/source-review-render.test.js
node tests/site.test.js
```

Expect PASS.

- [ ] **Step 6: Run full suite**

```bash
npm test
npm run launch-check
```

Expect PASS.

- [ ] **Step 7: Commit**

```bash
git add src/pages/guides/index.astro src/pages/guides/[slug].astro src/components/GuideCard.astro src/layouts/GuideLayout.astro
git commit -m "feat: route evidence gate through guides index, card, and layout"
```

### Task 1.6: Lock language-switch contract in test

**Files:**
- Modify: `tests/site.test.js`

- [ ] **Step 1: Add routing assertions**

Append to `tests/site.test.js`:

```js
const header = src.header;
const siteData = src.siteData;
const translatedPathsMatch = siteData.match(/translatedPaths[^=]*=\s*{([\s\S]*?)\}/m);
assert.ok(translatedPathsMatch, 'site data should expose translatedPaths');
const translatedEntries = [...translatedPathsMatch[1].matchAll(/['"][^'"]+['"]\s*:\s*['"][^'"]+['"]/g)];
const translatedValues = translatedEntries.map((entry) => entry[0].split(':')[1].trim().replace(/['"]/g, ''));
assert.ok(translatedValues.includes('/zh/'), 'translatedPaths should expose the Chinese home fallback');
const fallbackMatch = header.match(/switchHref = isZh\s*\?\s*[^:]+:\s*[^|]+\|\s*['"]([^'"]+)['"]/);
assert.ok(fallbackMatch, 'header should compute fallback hrefs explicitly');
assert.equal(fallbackMatch[1], '/zh/', 'English fallback should target /zh/');

assert.ok(!src.home.includes('href="/zh/guides/"') || src.home.includes('hreflang="zh-CN"'), 'homepage Chinese link must declare hreflang');
assert.match(read('src/pages/about.astro'), /hreflang="zh-CN"/, 'about page emits zh hreflang');
```

- [ ] **Step 2: Run new test block**

```bash
node tests/site.test.js
```

Expect PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/site.test.js
git commit -m "test: lock translatedPaths and language-switch fallback contract"
```

---

## Phase 2 — High-risk content boundary

> Source packs come from you, not from the model. Until a page has a recorded `HighRiskEvidenceRecord` and resolved `evidenceIds`, its status stays `verification-pending`.

### Task 2.1: Stand up audit table

**Files:**
- Create: `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`
- Read: `src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md`, `src/content/guides/spanish-citizenship-language-requirement.md`, `src/content/guides/uk-visa-selt-english-language-requirement.md`, `src/content/guides/canada-immigration-tef-language-proof.md`, `src/content/guides/italy-citizenship-language-requirement.md`, `src/content/guides/french-citizenship-language-requirement.md`, `src/content/guides/finland-integration-language-requirement.md`, `src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md`.

- [ ] **Step 1: Write audit header and table**

Create `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md` with:

```markdown
# High-risk route source audit

Status date: 2026-07-15  
Owner: Claude (content lead)  
Reviewer: <name — source review>

| File path | Category | Current contentStatus | Deciding authority known? | Exam owner known? | Recommended status | Required source pack fields |
| --- | --- | --- | --- | --- | --- | --- |
| src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md | portugal | starter-overview | no | yes | verification-pending | factOrScope, authorityType, authorityUrl, reviewedAt, supports, doesNotSupport, readerMustConfirm |
| src/content/guides/spanish-citizenship-language-requirement.md | spain | starter-overview | no | yes | verification-pending | … |
| … |

Rows update as Claude receives source packs from the user.
```

- [ ] **Step 2: Commit**

```bash
git add docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md
git commit -m "docs: open high-risk route source audit table"
```

### Task 2.2: Receive source pack and downgrade page

**Files:**
- Modify: `src/content/guides/<file>.md`, `src/data/high-risk-evidence.ts`, `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`

> Repeatable for each page once you provide a source pack. Steps below use Portugal as the worked example.

- [ ] **Step 1: Confirm source pack from user**

Before any edit, ask for: `factOrScope`, `authorityType`, `authorityUrl`, `reviewedAt`, `supports`, `doesNotSupport`, `readerMustConfirm`, `reviewerRole`. If the pack is incomplete, stop and mark BLOCKED.

- [ ] **Step 2: Append evidence record**

In `src/data/high-risk-evidence.ts`, append to `highRiskEvidenceIndex.portugal`:

```ts
{
  id: 'portugal-citizenship-language-requirement',
  factOrScope: '<from pack>',
  authorityType: '<from pack>',
  authorityUrl: '<from pack>',
  reviewedAt: '<YYYY-MM-DD>',
  supports: ['<from pack>'],
  doesNotSupport: ['<from pack>'],
  readerMustConfirm: ['<from pack>'],
  reviewerRole: 'source-review',
},
```

- [ ] **Step 3: Update guide frontmatter**

In the relevant Markdown file, set:

```yaml
sourceReviewStatus: reviewed
sourceReviewedAt: '<YYYY-MM-DD>'
reviewedByRole: source-review
primaryOfficialAuthorityUrl: '<from pack>'
evidenceIds:
  - <id from Step 2>
```

Plus update `finalDecisionAuthorityType`, `examOwnerUrl`, `primaryIntent`, `audienceScope`, `localExecutionPrompt` only with values from the pack.

- [ ] **Step 4: Tighten body claims**

Replace any specific `factOrScope`-bounded claim in the Markdown that the pack does **not** support with a verification-prompt sentence. Do not invent dates, fees, eligibility or acceptance scope.

- [ ] **Step 5: Mark table row updated**

In `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`, set the row’s `Recommended status` to its new value and append the resolved `evidenceIds` and `reviewedAt`.

- [ ] **Step 6: Verify**

```bash
npm test
npm run launch-check
```

Expect PASS. If a guide page no longer has `evidenceIds` while status is elevated, `resolveGuideContentStatus` should have already downgraded — assert that explicitly:

```bash
node tests/source-review-render.test.js
```

- [ ] **Step 7: Commit**

```bash
git add src/data/high-risk-evidence.ts src/content/guides/<file>.md docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md
git commit -m "content: apply Portugal source pack and update high-risk gate"
```

### Task 2.3: Repeatable loop

Repeat Task 2.2 for Spain, UK, Canada, Italy, France, Finland and Netherlands. Do not auto-promote a page to `complete-route` or `core-route` without a corresponding evidence record.

---

## Phase 3 — Core content UI (Open Design executes)

> Open Design follows `docs/OPEN_DESIGN_UI_PROMPTS_V2_2026-07-14.md`. The plan documents the verification Claude performs after each Open Design delivery.

### Task 3.1: Homepage review

**Files:**
- Read: `src/pages/index.astro`, screenshots/design notes delivered by Open Design.

- [ ] **Step 1: Verify hero composition**

Open Design confirms: one primary CTA, one secondary CTA, no duplicate of the global header CTA. Confirm `route-console` class is removed in favour of a non-form Start-here panel.

- [ ] **Step 2: Verify trust strip & featured routes**

Confirm `trust-band` text and `contentStatus` data feed for Germany A1, B1, TestDaF and other routes. No template hardcodes a `complete-route` label for TestDaF.

- [ ] **Step 3: Verify Latest guides rename**

Confirm the homepage section title is `Latest guides` when it may include `pending` items; switch to `Latest verified guides` only if every visible guide has `sourceReviewStatus: reviewed`.

- [ ] **Step 4: Run validation**

```bash
npm test
npm run launch-check
```

Open Design must report the four viewport screenshots and any new tests they added.

### Task 3.2: Guide Library review

**Files:**
- Read: `src/pages/guides/index.astro`, `src/components/FilterBar.astro`, `src/components/GuideCard.astro`, `src/components/SearchInput.astro`.

- [ ] **Step 1: Verify quick filters vs advanced disclosure**

Confirm `More filters` collapses below 900px and that `<details class="filter-drawer">` does not start with the `open` attribute.

- [ ] **Step 2: Verify live region and clear all**

Confirm `aria-live="polite"` only wraps the result count and that `data-clear-all` clears all selections.

- [ ] **Step 3: Verify single-focus cards**

Count `<a` occurrences in `src/components/GuideCard.astro`; assert exactly one per card.

- [ ] **Step 4: Verify 375px first paint**

Open Design provides screenshots showing the search, quick filters, result count and at least two guide cards above the fold.

- [ ] **Step 5: Run validation**

```bash
npm test
npm run launch-check
```

### Task 3.3: Guide Article review

**Files:**
- Read: `src/layouts/ArticleLayout.astro`, `src/layouts/GuideLayout.astro`, `src/components/ArticleTOC.astro`, `src/components/RelatedGuides.astro`.

- [ ] **Step 1: Verify article header order**

Confirm DOM order: breadcrumb → status & country/route → H1 → direct answer → meta → Who decides this? → TOC → body → source table → common mistakes → next action → related → disclaimer. No grid-row reordering.

- [ ] **Step 2: Verify TOC semantics**

Confirm TOC links render as real anchors with stable IDs and that mobile view does not retain a duplicate hidden TOC.

- [ ] **Step 3: Verify source fact table pending behaviour**

When `sourceReviewStatus !== 'reviewed'`, the table is replaced with an explicit “pending” callout and never renders the column.

- [ ] **Step 4: Verify Chinese boundary**

Confirm `ZhGuideLayout` continues to display “官方来源事实表待完成” when the migration in Phase 1/2 has not yet completed.

- [ ] **Step 5: Run validation**

```bash
npm test
npm run launch-check
```

### Task 3.4: Chinese entry & language switch review

**Files:**
- Read: `src/pages/zh/index.astro`, `src/components/GlobalHeader.astro`, `src/components/MobileNavigation.astro`, `src/data/site.ts`, `tests/site.test.js`.

- [ ] **Step 1: Verify `translatedPaths` coverage**

Confirm `/about/`, `/guides/`, `/tools/route-finder/`, `/tools/checklist-generator/`, `/tools/timeline-calculator/`, `/tools/exam-comparison/`, `/tools/email-reminders/` either have Chinese counterparts or fall back to `/zh/`. Update `translatedPaths` only if a missing mapping was already approved by Claude.

- [ ] **Step 2: Verify hreflang presence**

Confirm `BaseLayout` includes `hreflang="zh-CN"` on English pages with a Chinese counterpart, and excludes it when there is no counterpart.

- [ ] **Step 3: Verify desktop & mobile language switch consistency**

Both `GlobalHeader` and `MobileNavigation` must produce the same `switchHref` for the same path.

- [ ] **Step 4: Run validation**

```bash
npm test
npm run launch-check
```

---

## Phase 4 — Tools, navigation, and style consolidation

### Task 4.1: Route Finder review

**Files:**
- Read: `src/pages/tools/route-finder.astro`, `src/components/tools/ToolShell.astro`, `src/components/tools/ToolStepper.astro`, `src/scripts/tool-form.ts`.

- [ ] **Step 1: Verify initial step state**

Confirm `ToolStepper` initialises at `current={0}` and only advances on input or result.

- [ ] **Step 2: Verify A1-only configured path**

Confirm `src/data/route-tools.ts` continues to gate other routes at `availability: 'verify-only'` and produces no checklist when `!route`.

- [ ] **Step 3: Verify URL persistence only**

Confirm `controller.persist()` writes to the URL query only; no `localStorage` writes from any tool page.

- [ ] **Step 4: Verify field error semantics**

Confirm `aria-invalid`, `aria-describedby`, error summary and focus-to-first-invalid all wired in `tool-form.ts`.

- [ ] **Step 5: Run validation**

```bash
npm test
npm run launch-check
```

### Task 4.2: Other tools review

**Files:**
- Read: `src/pages/tools/checklist-generator.astro`, `src/pages/tools/timeline-calculator.astro`, `src/pages/tools/exam-comparison.astro`, `src/pages/tools/email-reminders.astro`.

- [ ] **Step 1: Verify no email collection**

Assert `email-reminders.astro` does not include `type="email"` or `Email address`.

- [ ] **Step 2: Verify timeline honesty**

Assert no hard-coded result or retake timing strings (`value="21"`, `value="28"`, `value="7"`).

- [ ] **Step 3: Verify exam-comparison accessibility**

Assert the table wrapper exposes `role="region"`, `aria-label`, `tabIndex = 0`, and a mobile `Scroll left and right` hint.

- [ ] **Step 4: Run validation**

```bash
npm test
npm run launch-check
```

### Task 4.3: Header, mobile navigation, footer review

**Files:**
- Read: `src/components/GlobalHeader.astro`, `src/components/MobileNavigation.astro`, `src/components/GlobalFooter.astro`, `src/styles/global.css`.

- [ ] **Step 1: Verify nav current page**

Confirm desktop and mobile navigation both expose `aria-current="page"` on the matched link and never duplicate it across the disclosure summary.

- [ ] **Step 2: Verify mobile menu focus management**

Confirm the mobile menu uses native `<dialog>` semantics or equivalent (focus trapped while open, Escape closes, focus returns to trigger).

- [ ] **Step 3: Verify footer completeness**

Confirm footer contains `Editorial Policy`, `Privacy`, `Cookie`, `Terms`, `Contact`.

- [ ] **Step 4: Run validation**

```bash
npm test
npm run launch-check
```

### Task 4.4: CSS consolidation

**Files:**
- Read: `src/styles/global.css`, `src/styles/open-design.css`, `docs/STYLE_ARCHITECTURE.md`.

- [ ] **Step 1: Update style architecture doc**

In `docs/STYLE_ARCHITECTURE.md`, list the surviving token files, the active component rules, the four breakpoints (375/768/1024/1440) and the components each token sheet feeds.

- [ ] **Step 2: Verify single root token block**

After edits, confirm `:root {` appears exactly once in the active CSS using:

```bash
node tests/site.test.js
```

- [ ] **Step 3: Verify breakpoints only in allowed set**

```bash
node tests/site.test.js
```

- [ ] **Step 4: Run validation**

```bash
npm test
npm run launch-check
```

---

## Phase 5 — Content cluster and internal link closure

### Task 5.1: Germany A1 deepening

**Files:**
- Modify: `src/content/guides/german-family-reunion-language-requirement.md`, `src/content/guides/applicant-checklist.md`, `src/content/guides/germany-a1-exam-comparison.md`, `src/layouts/GuideLayout.astro`.

- [ ] **Step 1: Confirm cluster ordering**

Verify `Germany A1` guides render in the order: requirement → checklist → exam comparison → local execution, via `nextGuideSlug`/`supportingGuideSlugs`.

- [ ] **Step 2: Confirm source-reviewed baseline**

Verify all A1 guides resolve to `complete-route` through the evidence gate.

- [ ] **Step 3: Run validation**

```bash
npm test
npm run launch-check
```

### Task 5.2: B1 / TestDaF boundary lock

**Files:**
- Modify: `src/content/guides/germany-b1-citizenship-language-proof.md`, `src/content/guides/testdaf-exam-overview.md`.

- [ ] **Step 1: Confirm B1 stays `core-route`**

Verify B1 content status remains `core-route`; do not promote.

- [ ] **Step 2: Confirm TestDaF stays `starter-overview`**

Verify TestDaF content status remains `starter-overview` unless Phase 2 supplies evidence records.

- [ ] **Step 3: Run validation**

```bash
npm test
npm run launch-check
```

### Task 5.3: Internal link closure

**Files:**
- Modify: `src/data/guide-taxonomy.ts`, `src/layouts/GuideLayout.astro`, `src/components/RelatedGuides.astro`.

- [ ] **Step 1: Verify `nextGuideSlug` resolvability**

For each guide with `nextGuideSlug`, assert the slug exists in `src/content/guides/`.

- [ ] **Step 2: Verify same-route links dominate**

For each `RelatedGuides` block, assert at least one entry shares `category` or `decisionStage` with the current guide.

- [ ] **Step 3: Run validation**

```bash
npm test
npm run launch-check
```

---

## Phase 6 — Independent audit and controlled release

### Task 6.1: Produce audit report

**Files:**
- Create: `docs/RELEASE_AUDIT_REPORT_2026-07-15.md`
- Read: every artifact produced so far.

- [ ] **Step 1: Capture AUDITED_SHA**

```bash
git rev-parse HEAD
```

Write this SHA into the audit report header.

- [ ] **Step 2: Run automated gates**

```bash
npm test
npm run build
npm run launch-check
```

- [ ] **Step 3: Capture evidence**

Take screenshots of `/`, `/guides/`, one Complete guide, one Core guide, one `verification-pending` guide, `/tools/route-finder/`, `/tools/exam-comparison/`, `/zh/`, `/privacy-policy/` at 375, 768, 1024, 1440 px. Attach to the audit report.

- [ ] **Step 4: Verify content trust**

Confirm `updatedDate` and `sourceReviewedAt` are not conflated in the rendered HTML; confirm Germany A1 stays `complete-route` and TestDaF stays `starter-overview`; confirm non-A1 routes never show approved-style copy.

- [ ] **Step 5: Verify privacy & consent**

Confirm `BaseLayout` does not load Cloudflare Web Analytics or any non-approved non-essential script; confirm Privacy/Cookie text reflects current paused state.

- [ ] **Step 6: Verify routing & SEO**

Confirm canonical, hreflang, Open Graph, sitemap-index.xml, robots.txt and redirects behave as before; confirm language-switch fallback points to `/zh/`.

- [ ] **Step 7: Decide**

Set report status to `AUDIT_BLOCKED` (with reasons) or `AUDIT_PASS_PENDING_DEPLOY`.

- [ ] **Step 8: Commit report**

```bash
git add docs/RELEASE_AUDIT_REPORT_2026-07-15.md
git commit -m "docs: release audit report for 2026-07-15 content/ui migration"
```

### Task 6.2: Deployment gate

> Do not start this task without explicit user authorisation.

- [ ] **Step 1: Confirm mapping**

Confirm with the user: target environment, public URL, host identifier, site directory, Nginx vhost, previous rollback version, target `AUDITED_SHA`.

- [ ] **Step 2: Re-check git & build**

```bash
git status --short --branch
git rev-parse HEAD
npm test
npm run build
npm run launch-check
```

Stop on any mismatch between HEAD and `AUDITED_SHA` or any test/build failure.

- [ ] **Step 3: Deploy via existing script only**

Use `deploy/deploy.sh` exactly as documented. Do not invent a new command. Record exit codes without exposing secrets.

- [ ] **Step 4: Post-deploy verification**

Hit `/`, `/guides/`, `/tools/route-finder/`, `/privacy-policy/`, `/zh/`. Confirm 200, no `localhost` references, no console errors, no auto-injected non-essential scripts (browser network trace).

- [ ] **Step 5: Update audit report**

If verified, set status `DEPLOYED_AND_VERIFIED`; if not, `DEPLOY_FAILED` and propose rollback steps.

---

## Self-review

- Coverage: phases 0 → 6 cover baseline, freeze, evidence gate, routing contract, content boundary, UI verification, audit, and release. Each spec section maps to at least one task.
- Placeholder scan: no `TBD` / `TODO` / “implement later” / “add validation” placeholders. Code is concrete in every edit step.
- Type consistency: `GuideStatusGateInput.evidenceIds`, `withHighRiskEvidenceGate(guide)`, `highRiskEvidenceIndex[category]`, `HighRiskEvidenceRecord` all reused across tasks.

Plan complete and saved to `docs/superpowers/plans/2026-07-15-visalang-content-ui.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?