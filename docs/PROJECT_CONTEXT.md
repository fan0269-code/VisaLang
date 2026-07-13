# VisaLang Project Context

Updated: 2026-07-13

This is the shared project map for future Codex windows working on flowlight.me / VisaLang. The site is already live. Do not rebuild from scratch or make broad code changes unless the user explicitly asks for that scope.

## 阶段 0 技术基线与阶段 1 准入状态（2026-07-13）

- 线上静态发布目录已实测为 `/var/www/flowlight.me/public/dist`；Nginx 为 `flowlight.me` 配置了该 root，并以 `index.html` 为入口。
- 服务器源码目录为 `/var/www/flowlight.me/source`。其在 2026-07-12 被记录为 `main` 的 `f25847291d053a927d0b0a2c062474bf9d5a100b`，并据此构建 98 个静态路由发布到 `public/dist`；这只是历史发布记录，不是当前线上提交的证明。
- 发布前的 `7e9cd943ef24f247b6513758535ae26b072dbf3e` 静态产物已保存为服务器回滚副本。后续发布必须继续记录目标 commit、构建时间、线上检查和回滚点。
- **本地源码状态**：2026-07-13 本窗口检查时，本地 `HEAD` 与 `origin/main` 均为 `1d8770cc11ad03145590ee51782a79cd8c848fb0`。工作区另有未提交的指南库展示代码和 `docs/TASK_LOG.md` 改动；本准入窗口不修改、不清理、不发布这些已有改动。本地 Git 状态不能证明线上版本。
- **线上部署状态**：2026-07-13 20:20 CST 的只读公网复核中，apex 首页、`www` 首页、sitemap index、联系页及隐私/Cookie 页面均返回 HTTP 200；两个首页可检查到 Cloudflare Web Analytics beacon，线上 Privacy/Cookie 页面可见 Cloudflare 与 AdSense 说明。公开页面没有版本标记，本窗口未登录服务器，因此线上精确 commit、当前服务器源码和当前回滚路径有效性均为**待业务方确认**。完整历史部署证据见 `docs/OPERATIONS_STATUS.md`，不得将其直接当成当前线上版本证明。
- **业务/运营就绪状态**：七项准入要求中 **0 项**同时具备已命名负责人和直接对应的当前可检查证据。Search Console 或等价监测、Analytics/隐私责任、联系真实收件与分流/保留、联系 SLA、官方来源与高风险事实复核、发布授权、回滚授权及当前路径有效性均仍有缺口。`hello@flowlight.me`、页面政策文案、脚本存在和历史记录均不能替代真实配置、权限与责任证据。因此单一结论为 **暂不启动阶段 1**；业务方最小补件清单以 `docs/OPERATIONS_STATUS.md` 七项表为准。

## 项目简介

VisaLang is an official-source-first language exam route navigation site. It helps readers choose and verify language exam paths for visa, residency, citizenship, family reunion, study, and work-registration goals.

The current product direction is not a generic exam encyclopedia. The best-developed route is Germany A1 family reunion / spouse visa language proof, with supporting Germany B1, TestDaF, telc, UK, Canada, Italy, Spain, France, Finland, Netherlands, and Portugal guide clusters.

## 网站定位

- Audience: people who need a language certificate for a migration, residence, citizenship, university, or professional route.
- Trust model: official sources first, then practical explanation.
- Editorial boundary: never invent current fees, exam dates, accepted certificates, government rules, or visa outcomes.
- Recommended page pattern: quick answer, official-source verification, route checklist, safe preparation advice, related guides, and last-updated/source-check signal.
- Current priority: deepen Germany A1 as the model route before scaling other routes.

## 技术栈

- Astro static site.
- TypeScript in Astro source files and `src/data/app-data.ts`.
- Markdown content collection under `src/content/guides`.
- `@astrojs/sitemap` for sitemap generation.
- Plain CSS in `src/styles/global.css`.
- Node scripts for tests, sitemap enrichment, and launch checks.

Key commands:

- `npm run dev`: local Astro dev server.
- `npm run build`: clean Astro cache, build static pages, enrich sitemap lastmod.
- `npm test`: source-level assertions in `tests/site.test.js`.
- `npm run launch-check`: build then verify generated output and legacy/static contracts.

Current verification result on 2026-07-09:

- `npm run build`: passed, 61 pages generated.
- `npm test`: passed.
- `npm run launch-check`: passed, 53 checks, READY.

## 目录结构说明

- `src/pages/`: Astro routes.
- `src/pages/index.astro`: English homepage.
- `src/pages/zh/index.astro`: Chinese homepage.
- `src/pages/germany-family-reunion-a1.astro`: Germany A1 route hub.
- `src/pages/guides/index.astro`: guide index with route overview, category filter, search, and `CollectionPage` / `ItemList` JSON-LD.
- `src/pages/guides/[slug].astro`: dynamic guide route from Markdown content.
- `src/layouts/`: shared page shells.
- `src/components/`: shared navigation, footer, guide UI, cards, CTA, related links.
- `src/content/guides/`: guide Markdown source. Current count: 49.
- `src/content.config.ts`: guide collection schema.
- `src/data/app-data.ts`: Astro-era brand, i18n, exam/source/tool data, and helper logic.
- `src/styles/global.css`: primary style system.
- `public/`: static files copied into `dist`, including `robots.txt`, `_headers`, `_redirects`, and OG image.
- `scripts/`: `launch-check.js` and `enrich-sitemap-lastmod.js`.
- `tests/`: project assertions.
- `docs/`: operating docs, roadmaps, and this project context.
- `dist/`: generated build output. Do not hand-edit.

Legacy/static layer still present:

- Root `index.html`, `styles.css`, `app.js`, `app-data.js`.
- Root `guides/*.html`.
- Root `zh/*.html`.
- Root `do-i-need-german-a1.html` and `germany-family-reunion-a1.html`.

These older files may still matter for compatibility or launch checks, but new product work should normally start from `src/`.

## 页面路由说明

Astro routes:

- `/`: English homepage.
- `/zh/`: Chinese homepage.
- `/germany-family-reunion-a1/`: Germany A1 family reunion hub.
- `/guides/`: guide index.
- `/guides/[slug]/`: generated guide pages from `src/content/guides/*.md`.
- `/about/`, `/contact/`, `/privacy-policy/`, `/terms/`, `/cookie-policy/`, `/editorial-policy/`, `/affiliate-disclosure/`.
- `/404.html`.

Important static-only route:

- `/do-i-need-german-a1.html` exists in the root static layer, but there is no matching Astro source page at `src/pages/do-i-need-german-a1.astro`.

## 组件结构说明

- `BaseLayout.astro`: HTML shell, global CSS import, header/footer, title suffix handling, meta description, canonical, hreflang alternates, OG/Twitter metadata, optional robots noindex, optional JSON-LD injection.
- `GuideLayout.astro`: guide article shell, breadcrumbs, TOC, article title/summary, updated-date trust bar, Article JSON-LD, BreadcrumbList JSON-LD, related guides, and guide CTA.
- `Header.astro`: site logo, main nav, active guide nav state, language switch.
- `Footer.astro`: legal/trust footer links and disclaimer.
- `ArticleCard.astro`: guide card used in indexes and list sections.
- `Breadcrumbs.astro`: guide breadcrumb UI.
- `TOC.astro`: generated table of contents from Markdown headings.
- `RelatedGuides.astro`: related guide grid and same-route index backlink.
- `GuideCTA.astro`: default "Join waitlist" CTA.

## 样式系统说明

Primary stylesheet:

- `src/styles/global.css`.

Main tokens:

- Brand colors: `--brand`, `--brand-700`, `--brand-600`, `--brand-100`, `--brand-tint`.
- Supporting colors: teal/info, gold, coral, lavender.
- Surfaces/text: `--ink`, `--muted`, `--soft`, `--line`, `--paper`, `--surface`, `--panel`.
- Radius: `--radius`, `--radius-sm`, `--radius-pill`.
- Shadow: `--shadow-sm`, `--shadow-md`, `--shadow-lg`.
- Fonts: `--font-sans`, `--font-display`.

Important style areas:

- Sticky header.
- Footer.
- Hero.
- Guide layout, TOC, breadcrumbs, article content, trust bar.
- Article cards, related guides, route overview cards.
- Search/filter UI.
- Mobile overflow handling for guide tables, long links, and code blocks.

Avoid introducing a second design system. Extend existing tokens/classes first.

## 内容数据来源

Current guide source of truth:

- `src/content/guides/*.md`.
- Frontmatter schema defined in `src/content.config.ts`.

Guide frontmatter fields:

- `title`
- `description`
- `category`
- `slug`
- `publishedDate`
- `updatedDate`
- `author`
- `readingTime`
- `featured`
- `eyebrow`
- `route`
- `related`

Other data:

- `src/data/app-data.ts`: brand, i18n, exam seed list, source list, tool list, planner helpers.
- Root `app-data.js`: legacy static data used by older static pages and tests.

Important limitation:

- `country`, `exam`, and `level` are not formal frontmatter fields today. The content map infers them from `slug`, `title`, and `category`.

## Guide 页面模板说明

Generated guide pages use:

- `src/pages/guides/[slug].astro` to load content.
- `GuideLayout.astro` to render the shared guide wrapper.

Shared guide structure:

- Breadcrumbs.
- Optional TOC from Markdown headings.
- Eyebrow.
- H1 from `title`.
- Summary from `description`.
- Trust bar with `updatedDate`.
- Markdown body.
- Related guide links from `related`.
- Same-route backlink from `category`.
- Guide CTA.

SEO data:

- `Article` JSON-LD uses `publishedDate` and `updatedDate`.
- `BreadcrumbList` JSON-LD is generated from breadcrumbs.
- Canonical URL is `https://flowlight.me/guides/{slug}/`.

Known template consistency issue:

- The wrapper is consistent, but article body structure varies. Some guides are short workflow/checklist pages, some are deeper pillar-style pages. There is no enforced body-section schema beyond tests checking key trust cues.

## SEO 当前实现方式

- `astro.config.mjs` sets `site: "https://flowlight.me"` and `trailingSlash: "always"`.
- `@astrojs/sitemap` generates `dist/sitemap-index.xml` and `dist/sitemap-0.xml`.
- `scripts/enrich-sitemap-lastmod.js` post-processes guide sitemap entries with `updatedDate`.
- `public/robots.txt` points to `https://flowlight.me/sitemap-index.xml`.
- Root `robots.txt` still points to `https://flowlight.me/sitemap.xml`; this belongs to the legacy/static layer and should be handled carefully.
- `BaseLayout.astro` centralizes canonical, meta description, OG/Twitter tags, hreflang alternates, and JSON-LD.
- Homepage emits `WebSite` JSON-LD.
- Guide index emits `CollectionPage` and `ItemList` JSON-LD.
- Guide pages emit `Article` and `BreadcrumbList` JSON-LD.
- Launch check confirms generated pages have one H1, useful meta descriptions, flowlight.me canonical URLs, guide structured data, sitemap inclusion, and internal links.

## 多语言当前实现方式

- There is a real Chinese route at `/zh/` from `src/pages/zh/index.astro`.
- English homepage and Chinese homepage have hreflang alternates.
- Header language switch sends English homepage to `/zh/`, Chinese homepage to `/`, and non-home English pages to `/zh/` labelled as Chinese homepage.
- Most guide pages are English only. The Chinese entry is a Chinese landing/homepage, not a full site-wide translation system.
- Chinese homepage still links to English guide pages, and some card titles/descriptions on `/zh/` are English because they are pulled from English guide frontmatter.

## CTA / waitlist 当前实现方式

Current Astro guide CTA:

- `src/components/GuideCTA.astro` links to `/#waitlist`.
- The generated Astro homepage currently does not contain an element with `id="waitlist"`.
- Result: guide CTA points to a missing anchor on the Astro homepage.

Legacy waitlist:

- Root `index.html` contains `id="waitlist"` and `id="waitlist-form"`.
- Root `app.js` handles waitlist submit in demo/local mode; it does not post to a real email service.
- Docs mention Formspree and `YOUR_FORM_ID`, but current root `index.html` does not show a real `action=` target.

Conclusion:

- The live Astro layer needs a real waitlist target or the guide CTA should be redirected to a real contact/intent page.
- This was not changed in this map window because the user asked primarily for documentation and issue listing.

## 当前分类体系

Current categories from guide frontmatter:

- `germany-a1`: 16 guides.
- `germany-b1`: 9 guides.
- `germany-testdaf`: 4 guides.
- `germany-telc`: 4 guides.
- `uk`: 2 guides.
- `canada`: 2 guides.
- `italy`: 2 guides.
- `spain`: 2 guides.
- `france`: 2 guides.
- `finland`: 2 guides.
- `netherlands`: 2 guides.
- `portugal`: 2 guides.

The guide index category filter is implemented client-side in `src/pages/guides/index.astro`.

Important behavior:

- `/guides/?category=germany-a1` loads the same static `/guides/` HTML, then JavaScript reads the query parameter and hides non-matching cards.
- Without JavaScript, all guides remain visible and a fallback message explains this.

## 当前构建和部署脚本

## Historical product-upgrade dispatch status (verified 2026-07-11; superseded for production state)

This is retained as a historical dispatch record for the pre-release state. It does **not** describe current production: the 2026-07-12 deployment baseline above and `docs/OPERATIONS_STATUS.md` are authoritative for the live branch, commit, static root, rollback artifact, and Phase 1 gate.

### Deployment source-of-truth: release blocker

- **Astro is the approved development target:** current product work belongs in `src/` and is built into `dist/`. The current source contains 54 English guide Markdown files and 5 Chinese guide routes; historical guide counts in older task-log entries are not current inventory.
- **Historical production observation:** a live check of `https://flowlight.me/` on 2026-07-11 showed 43 guides, 15 Germany A1 guides, and 4 Germany B1 guides, which did not match the Astro output at that time.
- **The checked-in CVM deployment script confirms the risk:** `deploy/deploy.sh` clones/pulls the repository into `/var/www/flowlight.me/public` and reloads Nginx; it does not run `npm run build` or publish `dist/`. The Nginx template roots directly at that repository directory.
- **Decision required before any Astro release:** the deployment owner must choose and verify one production contract: (a) build on the server and serve `dist/`; (b) build in CI and publish only `dist/`; or (c) deliberately keep the legacy layer, in which case these Astro upgrade windows must not be treated as production work. Do not hand-edit `dist/` as a workaround.

### Window 8 source release candidate — 2026-07-11

- The Window 0–7 source set is accepted as a **Git source release candidate** after source tests, a 95-page Astro build, the 60-check launch gate, desktop interaction checks, and 390px mobile checks passed.
- Window 8 fixed two release defects only: the committed Germany A1 cluster regression test is now part of `npm test` and follows the frozen hub/product URL contract; four new Germany B1 pages now use the current German Government naturalisation guidance instead of the superseded BMI URL.
- The commercial pages remain contact-intent only. No checkout, payment, delivery, email sending, human-review acceptance, or confirmed paid price is represented as active.
- This status does **not** clear the deployment blocker above. A successful commit and push prove that GitHub received the source; they do not prove that `flowlight.me` built or serves the Astro `dist/` output.

### Product-upgrade functional matrix

| Requirement | Status | Evidence / dispatch decision |
|---|---|---|
| Astro page/layout/component foundation | Exists, not yet production-serving | `src/pages`, `src/layouts`, shared components and `global.css` are established; live site remains legacy. |
| Germany A1 decision cluster | Exists | 16 guides plus `/germany-family-reunion-a1/`; deepen and connect it, do not recreate it. |
| Germany B1 settlement/citizenship route | Partly exists | Nine B1 guides exist, including comparison and study support; there is no dedicated B1 hub or complete settlement/citizenship decision path. |
| Homepage positioning / navigation / footer | Partly exists | Current Astro homepage has explanatory Route Finder content; Header only exposes Home, Germany A1, Guides, About, and Footer is legal/trust-only. |
| Interactive Route Finder, checklist, timeline, comparison, reminders | Missing | `src/data/app-data.ts` has seed tool data, but no `/tools/` routes or functioning tool flow exists. |
| Pricing, packs, Route Review, Partners | Missing | No corresponding Astro routes or product data exist. |
| Email capture and privacy data flow | Needs business confirmation | Contact page exposes `hello@flowlight.me`; legacy waitlist is local/demo mode, while Privacy Policy describes waitlist storage. No provider, processor, retention/deletion process, consent basis, or real destination is verified. |
| Payment and digital delivery | Needs business confirmation | No payment integration, confirmed price, fulfilment method, refund policy, tax handling, or support owner is present. UI may only use clear contact/request-access states until confirmed. |
| Route Review human service | Needs business confirmation | No intake workflow, reviewer identity/qualification, coverage, SLA, capacity, escalation rule, or secure-document policy is present. It must not claim submission, acceptance, or a response time. |
| SEO/schema/internal-link baseline | Exists, follow-up required | Canonical/sitemap/Article/Breadcrumb infrastructure exists; Window 5 owns changes only after final new URLs are frozen. |
| Visual system/mobile baseline | Exists, final pass required | Shared `src/styles/global.css` is the sole system anchor; Window 7 runs only after information architecture and routes are frozen. |
| Advertising / consent compatibility | Needs separate confirmation | The Astro shared head includes an AdSense loader, while current CSP allows only same-origin scripts and production is legacy. Any activated advertising needs a verified CSP, consent/privacy, and deployment review. |

### Locked work order and exclusive ownership

1. **Window 0 — dispatch:** documentation only: `docs/PROJECT_CONTEXT.md`, `docs/TASK_LOG.md`, and roadmap/prompt documents. It verifies handoffs; it never repairs another window's code.
2. **Deployment decision gate:** no code owner. The hosting owner must resolve the release contract above before Astro work is described as live.
3. **Window 1 — information architecture:** exclusively owns `src/pages/index.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, and the named trust pages. It may link only to existing or pre-agreed future URLs; it does not implement tools or commerce.
4. **Window 4 — tools:** exclusively owns `src/pages/tools/**`, `src/components/tools/**`, `src/data/route-tools.ts`, and tool tests. It must not edit Header/Footer or commercial policy; any homepage insertion uses a Window-1-defined slot.
5. **Window 6 — products and intent:** exclusively owns `src/pages/pricing.astro`, `src/pages/products/**`, `src/pages/route-review.astro`, `src/pages/partners.astro`, `src/components/products/**`, product data, and related tests. It cannot connect real email or payment without the business confirmations above.
6. **Windows 2 and 3 — content clusters:** may run in parallel after shared URLs are frozen. Window 2 owns only the A1 hub and `category: germany-a1` Markdown; Window 3 owns only the B1 hub/new B1 routes and `category: germany-b1` Markdown. Neither edits shared navigation, layouts, tools, or global CSS.
7. **Window 5 — SEO and linking:** exclusively owns cross-site metadata/schema/layout contracts, sitemap/check scripts, and link audits after all URLs are frozen. It must not rewrite guide bodies or redesign UI.
8. **Window 7 — UI finalization:** exclusively owns `src/styles/global.css` and narrowly necessary presentational component/layout changes. It cannot change URLs, factual copy, tool rules, commercial terms, or deployment.

Every handoff must list changed files, verification, final URL/data contracts, remaining human decisions, and protected areas untouched. If it changes a file owned by another window, lacks its required test/build evidence, or presents an unconfirmed external service as real, Window 0 returns it to that window rather than patching it.

Build scripts:

- `prebuild`: `npm run clean:astro`.
- `clean:astro`: removes `.astro` and `node_modules/.astro`.
- `build`: `astro build`.
- `postbuild`: `node scripts/enrich-sitemap-lastmod.js`.
- `prelaunch-check`: `npm run build`.
- `launch-check`: `node scripts/launch-check.js`.

Deploy folder:

- `deploy/deploy.sh`
- `deploy/server-init.sh`
- `deploy/harden.sh`
- `deploy/nginx-vhost-template.conf`
- `deploy/README.md`

Do not edit deploy files during content/UI windows.

## 哪些文件可以修改

Safe for content windows:

- `src/content/guides/*.md`
- `docs/*.md`

Safe for narrow page/content structure work:

- `src/pages/index.astro`
- `src/pages/zh/index.astro`
- `src/pages/germany-family-reunion-a1.astro`
- `src/pages/guides/index.astro`

Safe for narrow component work:

- `src/components/ArticleCard.astro`
- `src/components/GuideCTA.astro`
- `src/components/RelatedGuides.astro`
- `src/components/Breadcrumbs.astro`
- `src/components/TOC.astro`

Modify with tests:

- `src/layouts/BaseLayout.astro`
- `src/layouts/GuideLayout.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/styles/global.css`
- `src/content.config.ts`
- `scripts/*.js`
- `tests/site.test.js`

## 哪些文件不要随便动

Generated/cache/dependency files:

- `dist/`
- `node_modules/`
- `.astro/`
- `package-lock.json`, unless dependencies actually change.

Deployment and infrastructure:

- `deploy/*`
- `public/_headers`
- `public/_redirects`
- `public/robots.txt`
- root `robots.txt`
- root `sitemap.xml`
- `astro.config.mjs`

Legacy/static layer:

- root `index.html`
- root `styles.css`
- root `app.js`
- root `app-data.js`
- root `guides/*.html`
- root `zh/*.html`
- root `do-i-need-german-a1.html`
- root `germany-family-reunion-a1.html`

These may be legacy artifacts, compatibility inputs, or launch-check targets. Do not delete or rewrite them without a dedicated reconciliation task.

Current worktree warning:

- The working tree already has many modified/untracked files. Future windows must check `git status --short` before editing and must not revert unrelated changes.
