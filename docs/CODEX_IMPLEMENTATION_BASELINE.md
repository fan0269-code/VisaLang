# VisaLang Codex implementation baseline

Baseline recorded on 2026-07-14 before the content, trust, UI, and accessibility remediation packages in `CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md`.

## 1. Worktree boundary

`git status --short --branch` at the start of this window reported:

```text
## main...origin/main
 M AGENTS.md
 M CLAUDE.md
 M docs/CONTENT_VERTICAL_UPGRADE.md
?? docs/CODEX_EXECUTION_PROMPTS_2026-07-14.md
?? docs/CONTENT_UI_REMEDIATION_BRIEF_2026-07-14.md
?? docs/OPEN_DESIGN_UI_PROMPTS_2026-07-14.md
```

These six paths are pre-existing user or prior-agent work. They must not be overwritten, reverted, reformatted, staged, or treated as changes made by this baseline window. This baseline adds only `docs/CODEX_IMPLEMENTATION_BASELINE.md`.

## 2. Active implementation layer

The active product is the Astro application under `src/`:

- `src/content.config.ts` validates guide frontmatter in `src/content/guides/*.md`.
- `src/pages/guides/[slug].astro` loads each guide, derives article sections and related navigation, and passes controlled data into `src/layouts/GuideLayout.astro`.
- `src/layouts/GuideLayout.astro` builds guide trust metadata, Article/Breadcrumb JSON-LD, ordered article sections, related content, and the correction path. It composes `src/layouts/ArticleLayout.astro` and shared components.
- `src/layouts/BaseLayout.astro` owns the site shell, canonical/hreflang and social metadata, Organization JSON-LD, global navigation/footer, global styles, and current third-party script injection.
- `src/pages/index.astro`, `src/pages/guides/index.astro`, and other files under `src/pages/` are the real public route sources.
- `src/styles/global.css` and `src/styles/open-design.css` are both active because `BaseLayout.astro` imports both.
- `public/` supplies copied static assets and deployment-facing headers, redirects, and robots rules. It is changed only when a work package explicitly requires it.

The root `index.html`, `styles.css`, `app.js`, `app-data.js`, `guides/*.html`, `zh/*.html`, and similar root HTML files are the legacy compatibility layer. They remain covered by compatibility and deployment assertions, but they are not the implementation target for normal remediation. Generated `dist/`, `.astro/`, and `node_modules/` must never be hand-edited.

## 3. Work-package-to-file map

The paths below are implementation candidates, not authorization to change every listed file. Each package should use the smallest subset needed and add the smallest relevant regression assertion.

| Work package | Primary implementation paths | Verification/spec paths |
|---|---|---|
| P0-1: separate editing and source-review dates | `src/content.config.ts`; `src/content/guides/*.md`; `src/pages/guides/[slug].astro`; `src/layouts/GuideLayout.astro`; `src/components/LastCheckedBadge.astro`; `src/components/GuideCard.astro`; `src/pages/index.astro`; `src/pages/guides/index.astro` | `tests/content-integrity.test.js`; `tests/site.test.js`; rendered output via `scripts/launch-check.js` |
| P0-2: high-risk route audit and safe downgrade | `src/content.config.ts`; only the approved Portugal, Spain, UK, Canada, Italy, France, Finland, and Netherlands files in `src/content/guides/`; `src/data/guide-taxonomy.ts`; guide/category/card/header renderers | `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`; focused content assertions in `tests/content-integrity.test.js` or a narrowly named new test loaded by `tests/site.test.js` |
| P0-3: advertising, consent, and privacy consistency | `src/layouts/BaseLayout.astro`; `src/pages/privacy-policy.astro`; `src/pages/cookie-policy.astro`; inspect `public/_headers`, `public/robots.txt`, and `astro.config.mjs` without changing them unless an approved implementation requires it | `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md`; `tests/site.test.js`; built HTML and browser network checks for an implementation package |
| P1-1 to P1-3: maturity, responsibility, and journey links | `src/content.config.ts`; approved guide Markdown; `src/data/guide-taxonomy.ts`; `src/pages/guides/[slug].astro`; `src/layouts/GuideLayout.astro`; `src/components/GuideCard.astro`; `src/components/RelatedGuides.astro`; `src/pages/index.astro`; guide index/category pages; `src/pages/about.astro`; `src/pages/editorial-policy.astro` | `tests/content-integrity.test.js`; route-cluster tests; `tests/site.test.js`; `scripts/launch-check.js` |
| P1-4: homepage information architecture | `src/pages/index.astro`; `src/components/RouteSelector.astro`; `src/components/GlobalHeader.astro`; active shared styles | `tests/site.test.js`; `scripts/launch-check.js`; manual 375/768/1024/1440 checks |
| P1-5: guide library and cards | `src/pages/guides/index.astro`; `src/components/FilterBar.astro`; `src/components/SearchInput.astro`; `src/components/GuideCard.astro`; active shared styles | `tests/site.test.js`; `scripts/launch-check.js`; narrow-screen and keyboard checks |
| P1-6: article trust and reading structure | `src/pages/guides/[slug].astro`; `src/layouts/GuideLayout.astro`; `src/layouts/ArticleLayout.astro`; `src/components/ArticleTOC.astro`; `src/components/RelatedGuides.astro`; active shared styles | `tests/site.test.js`; `tests/content-integrity.test.js`; `scripts/launch-check.js`; mobile DOM/focus-order checks |
| P1-7 to P1-9: tool errors, progress, and persistence | `src/pages/tools/route-finder.astro`; `checklist-generator.astro`; `timeline-calculator.astro`; `exam-comparison.astro`; `email-reminders.astro`; `src/components/tools/ToolShell.astro`; `src/components/ToolStepper.astro`; `src/data/route-tools.ts` where shared behavior requires it | `tests/route-tools.test.js`; `tests/site.test.js`; `scripts/launch-check.js`; keyboard/screen-reader and fresh-session persistence checks |
| P2-1: radio, navigation, and narrow tables | `src/pages/index.astro`; `src/components/GlobalHeader.astro`; `src/components/MobileNavigation.astro`; `src/pages/tools/exam-comparison.astro`; relevant shared components and styles | `tests/site.test.js`; `scripts/launch-check.js`; keyboard checks at 375px and desktop |
| P2 style consolidation | `src/styles/global.css`; `src/styles/open-design.css`; only directly affected layouts/components; any new style modules must be imported from the established layout entry | `tests/site.test.js`; `scripts/launch-check.js`; screenshot regression at 375/768/1024/1440 |

## 4. Current behavior relevant to later packages

- The guide schema currently has no `sourceReviewedAt`, `sourceReviewStatus`, `reviewedByRole`, or `contentStatus` fields.
- `src/pages/guides/[slug].astro` currently extracts an “Official sources last checked” date from Markdown body text rather than controlled frontmatter.
- `src/pages/index.astro` sorts recent guides by `updatedDate`, then passes the newest `updatedDate` into `LastCheckedBadge`; `GuideCard.astro` also receives `updatedDate` as its `checked` value from the guide index. This is the concrete P0-1 date-semantics defect.
- Maturity is currently inferred from category in `src/data/guide-taxonomy.ts`: Germany A1 is `complete-route`, Germany B1 is `core-route`, and all other categories are `starter`.
- `GuideLayout.astro` currently hard-codes the Article JSON-LD author as the VisaLang organization.
- `BaseLayout.astro` currently injects Google AdSense and Cloudflare Insights scripts unconditionally. No CMP state, accept/reject/withdraw flow, region decision, or consent persistence was found in the inspected shared layout.
- `src/components/tools/ToolShell.astro` persists form values in `localStorage` and always renders `ToolStepper current={1}`. The tool pages and shared shell are therefore the correct layer for later progress and persistence work.
- `tests/site.test.js` already asserts one H1, canonical/hreflang/JSON-LD primitives, guide structure, status vocabulary, tool boundaries, accessibility CSS protections, and legacy redirects. Package-specific tests should extend this suite or one of its required focused suites rather than create an unreferenced test file.

## 5. Test and verification entry points

`package.json` defines these usable commands:

```bash
npm test
npm run build
npm run launch-check
```

- `npm test` runs `node tests/site.test.js`.
- `tests/site.test.js` directly requires `route-tools.test.js`, `commercial-pages.test.js`, `germany-a1-cluster.test.js`, `germany-b1-cluster.test.js`, `germany-testdaf-cluster.test.js`, and `content-integrity.test.js`, then runs its own static source assertions.
- A focused suite can be run with `node tests/<name>.test.js`, but final verification for a package must still use its required aggregate commands.
- `npm run launch-check` first runs the Astro production build through `prelaunch-check`, then executes `scripts/launch-check.js` against `dist/`. It checks generated routes, one H1, metadata, canonical URLs, structured data, guide structure, hreflang reciprocity, internal links, sitemap entries, redirects, and built CSS protections.
- There are no lint, formatter, or standalone typecheck scripts. Do not claim or invoke them.
- For public route, layout, SEO, navigation, sitemap, or content-structure changes, run `npm test` and then `npm run launch-check` sequentially. Do not run build-producing commands concurrently.

## 6. External inputs Codex cannot decide

The following are hard decision or evidence gates, not implementation details to infer:

1. **CMP and advertising consent strategy:** target regions, applicable consent framework, approved CMP vendor or explicit no-CMP policy, allowed vendors, consent-before-load rules, storage/expiry behavior, withdrawal behavior, and approved Privacy/Cookie wording.
2. **Official policy fact review:** the final deciding-authority URL, exam-owner or authorised-centre URL where relevant, review date, exact support boundary for each source, unresolved reader-side checks, and approved content status for every high-risk route page. Codex must not promote or complete a route by copying `updatedDate` or by guessing current rules.
3. **Real author and review identities:** verified names or approved role-only attribution, who actually performed editorial/source/translation review, permitted public wording, and the maintained correction or contact route. Expert titles, credentials, and reviews must not be fabricated.

## 7. Recorded inconsistencies; no repair in this window

- The remediation brief names `src/layouts/ArticleLayout.astro` for article work, while most trust metadata and Article JSON-LD currently live in `GuideLayout.astro`; both are active, with `ArticleLayout.astro` serving as the article/TOC shell.
- The brief's target status is `starter-overview` and also adds `verification-pending`; current taxonomy and component types use `starter` and have no pending state. A later schema migration must choose one controlled vocabulary across data, UI, and tests.
- Current UI labels guide-index sorting as “Recently verified” and passes `updatedDate` into `GuideCard`/`LastCheckedBadge`, although the data is only an editing date.
- `PROJECT_CONTEXT.md` says `npm test` contains project assertions “in `tests/site.test.js`”; in practice that file is the aggregate entry point and requires six additional suites.
- `PROJECT_CONTEXT.md` contains a historical warning that the worktree had many source changes when that document was created. The actual status recorded in section 1 is the current boundary and must take precedence.
- `PROJECT_CONTEXT.md` records that root `robots.txt` points to a different sitemap URL from `public/robots.txt`. This is a legacy/deployment-layer mismatch and is not part of the present baseline task.
- The brief proposes a future multi-file style layout, but the currently active layout imports only `global.css` and `open-design.css`. Any later consolidation must establish one import path deliberately rather than add unreferenced files.

