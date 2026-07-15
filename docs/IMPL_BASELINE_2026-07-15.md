# VisaLang Implementation Baseline — Content/UI Migration

## 1. Header

- **Date captured:** 2026-07-15
- **Branch:** `main` (tracking `origin/main`)
- **AUDITED_SHA:** `<AUDITED_SHA>` <!-- placeholder: fill with the SHA the migration audit is pinned to; baseline HEAD at capture time was 5839fe8e16eae278b28dd1e11175f5b7bb9c5b53 -->
- **HEAD at capture:** `5839fe8e16eae278b28dd1e11175f5b7bb9c5b53`
- **Owner:** repository maintainer (fan0269-code)
- **Source spec:** `docs/superpowers/specs/2026-07-15-visalang-content-ui-design.md`
- **Plan:** `docs/superpowers/plans/2026-07-15-visalang-content-ui.md` (Phase 0 / Task 0.1)
- **Scope of this document:** read-only observation. No behavioural, policy, legal, compliance, or advertising claims are made.

## 2. Git state (verbatim `/tmp/baseline-git.txt`)

```
## main...origin/main
?? docs/RELEASE_AUDIT_AND_DEPLOY_PROMPT.md
?? docs/superpowers/plans/2026-07-15-visalang-content-ui.md
?? docs/superpowers/specs/2026-07-15-visalang-content-ui-design.md
5839fe8e16eae278b28dd1e11175f5b7bb9c5b53
```

Notes:
- `git diff --stat` produced no output (no unstaged changes to tracked files); the HEAD SHA line follows the status block directly.
- The three `??` entries are pre-existing untracked docs. They are recorded here only as context and are not part of this task's deliverable (see footnote).
- Working tree is otherwise clean.

## 3. Active Astro surface

`src/` is the active Astro application. Entry shell is `BaseLayout.astro`, which imports the sole stylesheet.

### 3.1 Layouts (`src/layouts/`)

| Layout | Imports (verified) |
|---|---|
| `BaseLayout.astro` | `GlobalHeader.astro`, `GlobalFooter.astro`, `../data/site` (`organisationJsonLD`, `site`, `ui`), `../styles/global.css` |
| `GuideLayout.astro` | `BaseLayout.astro`, `Breadcrumbs.astro`, `ArticleLayout.astro`, `RelatedGuides.astro`, `GuideStatusBadge.astro`, `LastCheckedBadge.astro`, `VerificationAlert.astro`, `ReportOutdatedInfo.astro`, `CopyButton.astro`, `PrintButton.astro`, `../data/site` (`translatedPaths`), `../data/source-review` (types + `contentStatusCtas`, `reviewerRoleLabels`, `resolveGuideContentStatus`), `../data/article-sections` (types) |
| `ArticleLayout.astro` | `ArticleTOC.astro` (renders `.guide-layout` / `.guide-article` shell + TOC slot) |
| `ToolLayout.astro` | `BaseLayout.astro`, `tools/ToolShell.astro`; emits `WebApplication` JSON-LD |

Canonical/site URL constants in layouts point at `https://visalang.org` (BaseLayout favicon + `site.url`; GuideLayout/ToolLayout hard-code `https://visalang.org...`). See §6 for the observed divergence from the deploy domain.

### 3.2 Pages (`src/pages/`) — imports verified

| Surface | File | Key imports |
|---|---|---|
| Home | `index.astro` | BaseLayout, RouteSelector, GuideStatusBadge, `astro:content` getCollection, `source-review` (resolveGuideContentStatus), `guide-taxonomy` (guideCategories), `site`, `zh-germany-a1` (zhGermanyA1Guides) |
| Guide library | `guides/index.astro` | BaseLayout, PageHero, GuideCard, FilterBar, SearchInput, getCollection, `guide-taxonomy` (guideCategories, inferGuideMeta), `source-review` (resolveGuideContentStatus), `zh-germany-a1` |
| Guide slug | `guides/[slug].astro` | getCollection, GuideLayout, `guide-taxonomy` (formatRouteLabel, inferGuideMeta), `article-sections` (buildArticleSections) |
| Guide category | `guides/category/[category].astro` | BaseLayout, ArticleCard, GuideStatusBadge, `guide-taxonomy` (categoryContentStatus, guideCategories, guideCategoryIntro, guideCategoryMap, inferGuideMeta), `source-review` (contentStatusCtas, resolveGuideContentStatus) |
| Route centre | `routes/index.astro` | BaseLayout, PageHero, RouteSelector, VerificationAlert, DecisionTable, `site` |
| Tool index | `tools/index.astro` | BaseLayout, PageHero, ProductStatus, `site` |
| Route finder | `tools/route-finder.astro` | ToolLayout, tools/ToolResultSupport; client script: `route-tools` (findRoute), `scripts/tool-form` (setupToolForm) |
| Checklist | `tools/checklist-generator.astro` | ToolLayout, tools/ToolResultSupport, `route-tools` (routeRegistry); client: `route-tools` (getChecklist, routeRegistry, safeRouteResult), `scripts/tool-form` |
| Timeline | `tools/timeline-calculator.astro` | ToolLayout, tools/ToolResultSupport; client: `route-tools` (calculateTimeline), `scripts/tool-form` |
| Exam comparison | `tools/exam-comparison.astro` | ToolLayout, tools/ToolResultSupport, `route-tools` (examComparisonOptions); client: `route-tools` (examComparisonDimensions, examComparisonOptions), `scripts/tool-form` |
| Email reminders | `tools/email-reminders.astro` | ToolLayout, tools/ToolResultSupport, ToolResultPanel; client: `scripts/tool-form` (ICS generated locally, no mail service) |
| zh home | `zh/index.astro` | BaseLayout, getCollection, `zh-germany-a1`, `guide-taxonomy` (guideCategories), PageHero, TrustNotice, RouteSelector |
| Exams index | `exams/index.astro` | (present under `src/pages/exams/`) |
| Legal / static | `about.astro`, `contact.astro`, `privacy-policy.astro`, `cookie-policy.astro`, `editorial-policy.astro`, `terms.astro`, `affiliate-disclosure.astro`, `partners.astro`, `pricing.astro`, `404.astro` | BaseLayout-based |
| Commercial | `products/a1-family-reunion-pack.astro`, `products/a1-practice-pack.astro`, `germany-family-reunion-a1.astro`, `germany-b1-settlement-citizenship.astro`, `route-review.astro` | use `products/*` + BaseLayout |
| zh guides | `zh/germany-family-reunion-a1.astro`, `zh/guides/*.astro` (5 files) | BaseLayout / ZhGuideLayout |

### 3.3 Components (`src/components/`)

Present and confirmed (task-required set): `GlobalHeader`, `MobileNavigation`, `GlobalFooter`, `GuideCard`, `ArticleTOC`, `tools/ToolShell`, `ToolStepper`, `FilterBar`, `SearchInput`, `RouteSelector`, `RouteProgress`, `TrustNotice`, `VerificationAlert`, `SourceCard`, `LastCheckedBadge`, `GuideStatusBadge`, `ComparisonTable`, `DecisionTable`, `ToolResultPanel`, `CopyButton`, `PrintButton`, `ExportButton`, `RelatedGuides`, `ReportOutdatedInfo`, `Breadcrumbs`.

Additional components present (not in task's named list, recorded for completeness): `ArticleCard`, `PageHero`, `ProductStatus`, `ZhGuideLayout`, `tools/ToolResultSupport`, `products/CommercialBoundary`, `products/CommercialPageShell`, `products/IntentCTA`.

### 3.4 Data modules (`src/data/`) & scripts

- Imported by BaseLayout: `site.ts` (`organisationJsonLD`, `site`, `ui`, `translatedPaths`).
- Imported by guide index / slug pipeline: `guide-taxonomy.ts`, `source-review.ts`, `article-sections.ts`, `zh-germany-a1.ts`.
- Tool logic: `route-tools.ts` (findRoute, getChecklist, calculateTimeline, routeRegistry, safeRouteResult, examComparisonOptions/Dimensions), driven by `src/scripts/tool-form.ts`.
- Other data modules present: `app-data.ts`, `commercial-offers.ts`.
- Content collection defined by `src/content.config.ts`; 54 Markdown guides under `src/content/guides/`.

## 4. Active CSS surface

- **Single active stylesheet:** `src/styles/global.css` (2168 lines), imported exactly once, by `BaseLayout.astro:5`. A repo-wide grep confirms no other `import` of a stylesheet in `src/`.
- **`src/styles/open-design.css` is NOT imported anywhere** (grep for `open-design` in `src/` matches only its own self-referential header comment). Its own header states: *"LEGACY MIGRATION REFERENCE ONLY. Not imported by BaseLayout. Active production rules live in global.css."* → **Runtime status: inactive / dead reference.** Its component and layout rules were consolidated into `global.css` under the "Consolidated Open Design component and layout rules" section (global.css line ~823 onward), which is the version that applies at runtime.

### 4.1 Token duplication (`:root` blocks in global.css)

| Line | Block | Applies at runtime? |
|---|---|---|
| 2 | Primary `:root` design tokens (light) | Yes — base tokens |
| 74 | `:root:not([data-theme="light"])` inside `@media (prefers-color-scheme: dark)` | Yes — dark override |
| 503 | `:root { --space-8: 3.25rem; }` inside `@media (max-width:375px)` | Yes — narrow-viewport override |
| 674 | Full `:root` token re-declaration ("warm paper" reference palette) inside `@media not all { … }` | **No — permanently disabled** (`@media not all` never matches) |
| 816 | `:root { color-scheme: light; }` inside `@media print` | Yes — print only |

Net: the live token set is the line-2 base plus the dark (74), narrow (503), and print (816) overrides. The line-674 warm-paper palette is inert because its whole block (lines 670–813) is wrapped in `@media not all` and marked *"Archived warm UI reference. Intentionally inactive."*

### 4.2 `body:has(.site-main--home)` overrides

`global.css` contains a large number of `body:has(.site-main--home)` rule lines (~200+), stacked across several sequentially authored "home-page design direction" layers (a dark navy "Option 3" stage, a light-canvas variant, an "Exam-learning" warm variant, the archived `@media not all` warm reference, and the consolidated Open Design layer). Because these blocks target overlapping selectors, **CSS source-order cascade governs the runtime result: for any given property on a home-page element, the last matching declaration in `global.css` wins.** The consolidated Open Design block near the end of the file (and its responsive `@media` blocks at ~1976 / 2029 / 2036) therefore has final say for most home-hero, route-selector, and card styling. The `@media not all` home overrides (lines ~692–811) never apply.

### 4.3 Note

Full line-by-line reconciliation of every overlapping `body:has(...)` declaration was not exhaustively resolved for this baseline; the runtime rule is the cascade-order statement above. A detailed per-property reconciliation, if needed, belongs to the migration phase, not this snapshot.

## 5. Legacy layer boundary (out of scope for migration)

Per `CLAUDE.md` ("Documentation precedence" + "Source of truth"), the following root-level files are the legacy static compatibility layer and are **out of scope** for the content/UI migration (do not use, edit, or delete for normal feature work):

- Root pages/assets: `index.html`, `app.js`, `app-data.js`, `styles.css`, `404.html`, `about.html`, `affiliate-disclosure.html`, `contact.html`, `cookie-policy.html`, `editorial-policy.html`, `privacy-policy.html`, `terms.html`, `do-i-need-german-a1.html`, `germany-family-reunion-a1.html`.
- Legacy guide HTML: `guides/*.html` (45 files, e.g. `goethe-a1-30-day-study-plan.html`, `telc-b1-b2-*.html`, `testdaf-*.html`).
- Legacy Chinese layer: `zh/index.html`, `zh/germany-family-reunion-a1.html`, `zh/guides/` (legacy HTML).

These are superseded by the Astro `src/` application and its build output; they are recorded here only to fix the boundary.

## 6. Deployment mapping (read-only; secrets redacted)

Sources: `deploy/README.md`, `deploy/deploy.sh` (with `deploy/nginx-vhost-template.conf`, `deploy/server-init.sh`, `deploy/harden.sh` present).

| Field | Value |
|---|---|
| Host platform | 腾讯云 CVM (Tencent Cloud CVM), single machine hosting multiple domains |
| Host IP | Not stored in repo (README uses placeholder `你的服务器公网IP`) — see BLOCKED §7 |
| Deploy domain | `flowlight.me` (and `www.flowlight.me`) |
| Site directory | `/var/www/flowlight.me` → `source/` (git checkout) + `public/dist/` (Nginx serve root) |
| Nginx vhost | `/etc/nginx/sites-available/flowlight.me.conf`, symlinked into `sites-enabled/`; generated from `deploy/nginx-vhost-template.conf` by replacing `$DOMAIN`→`flowlight.me` |
| Public URL (last-known) | `https://flowlight.me` |
| DNS | A records: `@` → server IP, `www` → server IP |
| Repo source | `https://github.com/fan0269-code/VisaLang.git`, branch `main` |
| Build/publish | `deploy.sh`: `npm ci` + `npm run build` on server; guards on `dist/index.html`; copies `dist/.` to serve dir; `chown www-data`, `chmod 755`; `nginx -t && systemctl reload nginx` |
| TLS | `certbot --nginx` (auto-renew) |
| Contact form | Formspree placeholder `YOUR_FORM_ID` (not configured with a real ID in repo) |

**Secrets:** No passwords, private keys, API keys, or tokens are stored in the deploy files. The secret scan surfaced only sshd hardening directives in `harden.sh` (`PasswordAuthentication no`, `PermitRootLogin prohibit-password`), which are configuration flags, not secrets. Nothing required redaction.

**Observed divergence (factual):** Astro canonical/site URLs are hard-coded to `https://visalang.org` (`BaseLayout`, `GuideLayout`, `ToolLayout`, favicon), while the deployment target domain is `flowlight.me`. Recorded as an observation only.

## 7. BLOCKED items

- **Host IP address:** the concrete server IP is not committed to the repo (README uses a placeholder). This single field cannot be inferred from repository contents without infrastructure/secret access. All other deployment-mapping fields (domain, site directory, vhost, public URL, DNS scheme, repo, build flow, TLS) are present and inferred above, so the overall mapping is **not** flagged `DEPLOYMENT_TARGET_MAPPING_BLOCKED`; only the literal host IP is unknown-from-repo (by design).
- No unreadable files were encountered. `src/styles/open-design.css` was readable and confirmed inactive (§4).

## 8. Out-of-scope reminder

- Do not edit `src/`, `tests/`, `scripts/`, `public/`, `deploy/`, `astro.config.mjs`, `package.json`, or `package-lock.json` as part of this baseline task.
- Never hand-edit `dist/`, `.astro/`, or `node_modules/` (both `dist/` and `.astro/` are confirmed present and are build-produced, not source).
- The legacy static layer (§5) and the existing sub2api admin project are out of scope.
- This document asserts no policy, legal, GDPR, immigration, advertising, or consent-compliance conclusions; all statements are neutral observations of repository state.

---

*Footnote — pre-existing untracked files (context only, not produced or modified by this task):* `docs/RELEASE_AUDIT_AND_DEPLOY_PROMPT.md`, `docs/superpowers/plans/2026-07-15-visalang-content-ui.md`, `docs/superpowers/specs/2026-07-15-visalang-content-ui-design.md`.
