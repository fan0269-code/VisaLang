# PROJECT_CONTEXT

This document is a working map for future agent windows. It records the project as it exists in this checkout, not only the older README/CLAUDE notes.

## Current operations baseline — 2026-08-21

- The production application payload baseline is App commit `80c6d04c4ccd3d5ee9af069703f7a56534939c3e`. The docs-only governance commit containing this record is its authorised successor; after deployment, `origin/main`, server source and `current` resolve to that containing commit while generated site behavior remains unchanged.
- Security commit `f680c6234611606c0f308bbf386ee714b027385a` was released and smoke-verified first. After the governance-only successor is deployed, App release `/var/www/visalang.org/releases/80c6d04c4ccd` is the immediate verified rollback release; Security remains the next earlier rollback point.
- Local dirty `main` remains at `9e33c5c`; after the governance successor reaches `origin/main`, it is behind by the App integration commit plus this governance commit (2 commits). Preserve it; do not reset, pull over, or sweep unrelated tracked/untracked material into a candidate.
- The next safe work package is post-release stabilization and an isolated governance/documentation candidate. Bulk content generation remains paused.
- Account-side CMP/Auto Ads/Policy Center/CLS evidence was explicitly waived for the completed release and must not be represented as verified.

## 1. 网站定位

VisaLang is an official-source-first language exam navigation site for visa, residency, citizenship, study, and work-registration paths.

Current strongest niche:

- Germany A1 family reunion / spouse visa language proof.
- Route-based decision support, not a generic exam catalog.
- High-trust guide pages that explain what to verify, where to verify it, and what not to assume.

Durable content pattern:

- Quick answer.
- Official-source cards or official-source section.
- Decision checklist / path.
- FAQ.
- Related guides.
- Revision or last-updated signal.
- Clear disclaimer: verify requirements, fees, dates, and accepted exams with the authority or test centre.

Important: do not fabricate fees, dates, policy requirements, or official acceptance rules. If the data can change, write a verification workflow and link the official source.

## 2. 当前技术栈

Primary stack:

- Astro static site.
- TypeScript in Astro source/data files.
- Markdown content collection for guide articles.
- `@astrojs/sitemap` for generated sitemap output.
- Plain CSS in `src/styles/global.css`.
- Node-based verification scripts.

Important commands:

- `npm run dev`: local Astro development server.
- `npm run build`: clean Astro cache, build static output, then enrich sitemap lastmod values.
- `npm test`: project assertions in `tests/site.test.js`.
- `npm run launch-check`: builds first, then checks launch readiness.

Historical/static layer still present:

- Root-level `index.html`, `styles.css`, `app.js`, `app-data.js`, `guides/*.html`, and `zh/*.html` still exist.
- Some older docs still describe the site as plain HTML/CSS/JS with no framework. Treat that as stale unless a task explicitly targets the old static layer.
- Current maintenance should usually happen under `src/`, especially `src/pages`, `src/components`, `src/layouts`, `src/content/guides`, and `src/styles/global.css`.

## 3. 目录结构说明

- `src/pages/`: Astro route pages.
- `src/pages/guides/[slug].astro`: dynamic route that renders Markdown guides from the content collection.
- `src/pages/guides/index.astro`: guide index, route filters, search UI, and guide list structured data.
- `src/pages/zh/index.astro`: real Chinese homepage route.
- `src/layouts/`: shared page layouts.
- `src/components/`: reusable Astro components.
- `src/content/guides/`: Markdown source for guide pages. There are currently 53 guide Markdown files.
- `src/content.config.ts`: Astro content collection schema for guides.
- `src/data/app-data.ts`: Astro-era data, brand, i18n, exam list, tools, source list, and planner helpers.
- `src/styles/global.css`: primary design system and shared styles for Astro pages.
- `public/`: static assets and deploy-facing files copied by Astro, including `public/robots.txt` and the current default social card `public/images/og-default.png` (`og-default.svg` is a retained older asset).
- `scripts/`: verification and sitemap helper scripts.
- `tests/site.test.js`: high-value project assertions; treat it as part of the spec.
- `docs/`: operating, launch, monetization, content workflow, traffic, and agent notes.
- `dist/`: generated build output. Do not hand-edit.
- `node_modules/`, `.astro/`: generated dependency/cache folders. Do not hand-edit.
- Root-level HTML/CSS/JS files and `guides/*.html`: older generated/static layer. Do not assume these are the canonical source for new work.

## 4. 主要页面

Astro source routes:

- `/` from `src/pages/index.astro`: English homepage with route browsing, featured guides, latest guides, and homepage SEO metadata.
- `/zh/` from `src/pages/zh/index.astro`: Chinese homepage route.
- `/germany-family-reunion-a1/` from `src/pages/germany-family-reunion-a1.astro`: Germany A1 family reunion route page.
- `/guides/` from `src/pages/guides/index.astro`: all guide index with route category filters and client-side search.
- `/guides/[slug]/` from `src/pages/guides/[slug].astro`: individual guide pages rendered from `src/content/guides/*.md`.
- Legal/trust pages: `about`, `contact`, `privacy-policy`, `terms`, `cookie-policy`, `editorial-policy`, `affiliate-disclosure`.
- `404` page: `src/pages/404.astro`.

Important existing static pages:

- `do-i-need-german-a1.html` exists as a static helper page, but there is no matching `src/pages/do-i-need-german-a1.astro` in the current source tree.
- Root-level `germany-family-reunion-a1.html`, `index.html`, and `zh/index.html` also exist as static artifacts or legacy pages.

## 5. 公共组件

- `GlobalHeader.astro`: site logo, purpose-based Routes menu, unified primary navigation, and route-aware language switch.
- `MobileNavigation.astro`: expandable mobile navigation.
- `GlobalFooter.astro`: route, legal/trust links, and disclaimer.
- `Breadcrumbs.astro`: guide breadcrumb navigation.
- `ArticleTOC.astro`: responsive generated table of contents for guide headings.
- `RelatedGuides.astro`: related guide links and same-route guide index backlink.
- `GuideCard.astro`: task-oriented guide card used by the guide library.
- `RouteSelector.astro`, `RouteProgress.astro`: route choice and seven-step route progress.
- `TrustNotice.astro`, `VerificationAlert.astro`, `SourceCard.astro`, `LastCheckedBadge.astro`: shared trust hierarchy.
- `FilterBar.astro`, `SearchInput.astro`: URL-backed guide filtering controls.
- `ToolStepper.astro`, `ToolResultPanel.astro`, `CopyButton.astro`, `PrintButton.astro`, `ExportButton.astro`: shared tool interaction system.

Shared layouts:

- `BaseLayout.astro`: HTML shell, title normalization, meta description, canonical, hreflang alternates, Open Graph/Twitter tags, optional noindex, optional JSON-LD, shared header/footer.
- `GuideLayout.astro`: conditional single article shell, breadcrumbs, one TOC, trust hierarchy, Article/BreadcrumbList JSON-LD, related guides, and correction reporting.
- `ToolLayout.astro`: shared WebApplication shell for the five real planning tools.

## 6. 样式系统

Primary stylesheet:

- `src/styles/global.css`.

Design tokens:

- Brand blue: `--brand`, `--brand-700`, `--brand-600`, `--brand-100`, `--brand-tint`.
- Supporting colors: teal/info, gold, coral, lavender.
- Text/surface tokens: `--ink`, `--muted`, `--soft`, `--line`, `--paper`, `--surface`, `--panel`.
- Radius tokens: `--radius`, `--radius-sm`, `--radius-pill`.
- Shadow tokens: `--shadow-sm`, `--shadow-md`, `--shadow-lg`.
- Fonts: `--font-sans` and `--font-display`.

Main styled surfaces:

- Sticky header and footer.
- Hero sections.
- Guide layout, TOC, breadcrumbs, article body, trust bar.
- Guide cards and route overview cards.
- Guide search and filter controls.
- Tables, long links, and code blocks are styled to avoid mobile overflow.

Style rule of thumb:

- Extend existing tokens/classes before introducing a new visual system.
- Keep content-heavy pages readable and source-focused; avoid decorative changes that reduce trust.

## 7. SEO 当前情况

Current SEO foundations:

- `astro.config.mjs` sets `site: "https://visalang.org"` and `trailingSlash: "always"`.
- `@astrojs/sitemap` is enabled.
- Sitemap exclusions are defined by `astro.config.mjs` `noindexSitemapPaths`; `scripts/enrich-sitemap-lastmod.js` also removes generated pages whose final HTML is `noindex,follow`. Do not maintain a second copied list in documentation.
- `scripts/enrich-sitemap-lastmod.js` enriches generated sitemap entries from guide `updatedDate` metadata.
- `public/robots.txt` points to `https://visalang.org/sitemap-index.xml`.
- Root `robots.txt` is a legacy/static artifact that points to the old domain and must never be used for the current deployment; Astro publishes `public/robots.txt` through `dist/`.
- `BaseLayout.astro` centralizes title, description, canonical, hreflang alternates, OG/Twitter metadata, and JSON-LD injection.
- Guide pages emit `Article` and `BreadcrumbList` JSON-LD.
- Guide index emits `CollectionPage` and `ItemList` JSON-LD.
- English and Chinese homepages use real `/` and `/zh/` routes with hreflang alternates.
- `src/content.config.ts` is the only authoritative guide-schema definition; do not copy its evolving field list into planning documents.

SEO risk notes:

- Some source/docs still reflect the older static-site architecture.
- Do not add thin pages just to increase page count.
- For changing official information, prefer source-bounded workflow pages over fixed claims.
- After adding or moving pages, update tests, launch checks, sitemap expectations, and related guide links together.

## 8. 后续窗口的任务边界

Default boundary for future work:

- Work from the Astro source layer unless the user explicitly asks for legacy static files.
- Keep Germany A1 family reunion depth as the priority route unless the user says to expand horizontally.
- Make substantive content improvements, not title-only edits.
- For Chinese content, write natural Chinese for Chinese users. Do not machine-translate English pages line by line.
- Keep official-source-first wording and disclaimers.
- Do not publish or imply legal/immigration advice.
- When adding a guide, include real frontmatter, official sources, last-updated/source-check dates, related guides, and route/category consistency.
- When changing navigation, layouts, SEO, guide structure, sitemap, or route counts, run `npm test` and `npm run launch-check`.
- Before editing, check `git status` because the current working tree may contain user or prior-agent changes.

Recommended completion standard:

- Implement only the requested scope.
- Verify with the smallest relevant check.
- If the change affects public routes or SEO, run both `npm test` and `npm run launch-check`.
- Mention any stale docs or legacy/static layer mismatches instead of silently rewriting unrelated files.

## 9. 哪些文件不要随便动

Do not hand-edit generated/cache/dependency output:

- `dist/`
- `node_modules/`
- `.astro/`
- `package-lock.json`, unless dependencies actually changed.

Be very cautious with deployment/server files:

- `deploy/`
- `public/_headers`
- `public/_redirects`
- `public/robots.txt`
- root `robots.txt`
- `sitemap.xml`
- `astro.config.mjs`

Be cautious with SEO/layout primitives because they affect many pages:

- `src/layouts/BaseLayout.astro`
- `src/layouts/GuideLayout.astro`
- `src/components/GlobalHeader.astro`
- `src/components/GlobalFooter.astro`
- `src/components/MobileNavigation.astro`
- `src/pages/guides/[slug].astro`
- `src/pages/guides/index.astro`
- `src/styles/global.css`

Be cautious with data/spec/test files:

- `src/content.config.ts`
- `src/data/app-data.ts`
- root `app-data.js`
- root `app.js`
- `tests/site.test.js`
- `scripts/launch-check.js`
- `scripts/enrich-sitemap-lastmod.js`

Be cautious with legacy static pages:

- root `index.html`, `styles.css`, `app.js`, `app-data.js`
- root `guides/*.html`
- root `zh/*.html`
- `do-i-need-german-a1.html`
- `germany-family-reunion-a1.html`

These may be legacy artifacts, deployment inputs, or compatibility pages. Do not delete or rewrite them unless the task explicitly calls for reconciling the legacy/static layer with the Astro source layer.

Current worktree warning:

- At the time this context was created, `git status --short` showed many modified and untracked files across Astro config, layouts, components, content, scripts, tests, styles, and the Chinese route. Future windows should treat those as existing work and avoid reverting them without explicit permission.
