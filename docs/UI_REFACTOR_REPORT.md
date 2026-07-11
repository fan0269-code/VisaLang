# Flowlight / VisaLang UI Refactor Report

Updated: 2026-07-11

## Completion scope

This refactor keeps Astro, Markdown content collections, plain CSS, and the current route corpus. It changes the product shell from a guide blog into a language-proof route decision product. No guide-body legal, visa, exam-acceptance, fee, or policy conclusion was rewritten for visual reasons.

Pre-change backup:

- `/tmp/visalang-pre-ui-refactor-20260711.tgz`
- SHA-256: `c632c7e4d81048d13bf1578df026af780364ab367d91b7820efe650b0759f417`

## Page and template inventory

Generated output: 98 HTML routes.

| Surface | Routes or count | Template/source |
|---|---:|---|
| Home | `/` | `src/pages/index.astro` |
| Top-level centres | `/routes/`, `/exams/`, `/tools/`, `/guides/` | Astro pages under `src/pages/` |
| Route hubs | Germany A1 and Germany B1 | Route pages under `src/pages/` |
| Guide library | 54 English guides plus 5 Chinese guides | `src/pages/guides/[slug].astro`, Chinese data, and Markdown collection |
| Guide categories | 12 | `src/pages/guides/category/[category].astro` |
| Decision tools | 5 tools plus `/tools/` centre | `ToolLayout.astro` + tool pages |
| Commercial/status pages | Pricing, Partners, Route Review, two packs | `CommercialPageShell.astro` |
| Chinese path | `/zh/`, Chinese Germany A1 hub, 5 Chinese guides | shared global shell + `ArticleLayout.astro` through a localized adapter |
| Trust and legal | About, Contact, Editorial, Privacy, Cookie, Terms, Affiliate | shared `BaseLayout.astro` |
| Error | `/404.html` | `src/pages/404.astro` |

Dynamic route families:

- `/guides/{slug}/`: 54 English guides.
- `/guides/category/{category}/`: 12 indexable category pages.
- `/zh/guides/{slug}/`: 5 Chinese core guides.

## Shared component inventory

Global shell and navigation:

- `GlobalHeader`, `MobileNavigation`, `GlobalFooter`, `Breadcrumbs`, `PageHero`.

Route and trust:

- `RouteSelector`, `RouteProgress`, `TrustNotice`, `VerificationAlert`, `SourceCard`, `LastCheckedBadge`, `ReportOutdatedInfo`.

Guide library and articles:

- `GuideCard`, `GuideStatusBadge`, `FilterBar`, `SearchInput`, `ArticleTOC`, `RelatedGuides`.

Decision and tool UI:

- `ComparisonTable`, `DecisionTable`, `ToolStepper`, `ToolResultPanel`, `CopyButton`, `PrintButton`, `ExportButton`.

Product status:

- `ProductStatus`, `CommercialPageShell`, `CommercialBoundary`, `IntentCTA`.

Removed as obsolete or duplicate:

- `Header.astro`, `Footer.astro`, `TOC.astro`.
- `GermanyA1RouteSupport.astro`, which duplicated Who/Common mistakes/Official sources/Last updated/Disclaimer on every Germany A1 guide.
- `GuideCTA.astro`, which preserved the old generic CTA pattern.

## Design system

`src/styles/global.css` now defines semantic tokens for:

- page and reading widths;
- typography sizes and line height;
- spacing scale;
- radius, border, shadow, focus, disabled, hover, and active states;
- primary, secondary, risk, warning, success, surface, text, and neutral colours;
- dark-mode values through `prefers-color-scheme`;
- reduced-motion behaviour;
- desktop, tablet, and mobile layout rules;
- print output and horizontally scrollable comparison tables.

Visual direction: restrained public-service decision UI. One teal accent, neutral surfaces, limited shadows, no decorative gradients, no simulated official marks, and no high-motion effects.

## Old-page migration table

| Old surface | Current treatment | Canonical replacement |
|---|---|---|
| Root `index.html` | legacy static source, not edited | Astro `/` |
| Root `germany-family-reunion-a1.html` | legacy static source | Astro `/germany-family-reunion-a1/` |
| `do-i-need-german-a1.html` | legacy helper | `/tools/route-finder/` |
| Root `guides/*.html` | legacy duplicates | `/guides/{slug}/` |
| Root `zh/index.html` | legacy duplicate | `/zh/` |
| Root `zh/guides/*.html` | legacy duplicates | `/zh/guides/{slug}/` |
| Old local Header/Footer/TOC implementations | removed | Global components |
| Germany A1 support shell on every guide | removed | conditional single `GuideLayout` sections |

The legacy files remain in the repository as historical artifacts because the live deployment source has not been independently confirmed. Deploy-facing redirects prevent them from competing with Astro routes.

## Redirect table

| From | To | Status |
|---|---|---:|
| `/index.html` | `/` | 301 |
| `/germany-family-reunion-a1.html` | `/germany-family-reunion-a1/` | 301 |
| `/do-i-need-german-a1.html` | `/tools/route-finder/` | 301 |
| `/zh/index.html` | `/zh/` | 301 |
| `/zh/germany-family-reunion-a1.html` | `/zh/germany-family-reunion-a1/` | 301 |
| `/guides/dutch-inburgering-a2-b1-for-integration-and-citize/` | corrected citizenship slug | 301 |
| `/guides/portuguese-language-for-golden-visa-and-citizenshi/` | corrected citizenship slug | 301 |
| `/guides/:slug.html` | `/guides/:slug/` | 301 |
| `/zh/guides/:slug.html` | `/zh/guides/:slug/` | 301 |

## Navigation fixes

- Primary navigation is now Home, Routes, Exams, Tools, Guides, About, and language switch.
- Pricing and Partners moved into About and footer surfaces.
- Routes dropdown is organised by purpose.
- Tools opens `/tools/`, not Route Finder directly.
- Mobile navigation is a real expandable menu rather than a horizontally scrolling desktop nav.
- Language switch preserves the current route when a translation exists.
- Chinese-only missing translations are explicitly labelled as English destinations in desktop navigation, mobile navigation, route selectors, and the footer.

## Mobile and interaction verification

Verified in the in-app browser:

| Viewport | Pages | Result |
|---|---|---|
| 1440 × 900 | Home | single-line 69px header, hero and CTAs visible, no horizontal overflow |
| 768 × 1024 | Guides | two-column filter layout, readable results, no horizontal overflow |
| 390 × 844 | Germany A1, guide article, Route Finder | single-column route steps, 44px controls, collapsed TOC, working menu, no horizontal overflow |

Interactions verified:

- mobile menu opens and exposes 13 navigation links;
- mobile guide filters are collapsed by default;
- Purpose filter updates URL and result count; the unified library includes 54 English and 5 Chinese guides;
- Route Finder produces the configured Germany A1 result;
- Restart clears the result, form state, and URL;
- browser console recorded no errors or warnings on checked pages.

## Accessibility check

Implemented and checked:

- skip link and shared main target;
- one H1 on every generated route;
- semantic header, nav, main, article, aside, section, details, table, form, and footer elements;
- visible focus ring and 44px minimum interactive height;
- labels for required form controls and inline error regions;
- `aria-live`, `aria-current`, breadcrumb labels, table captions, and overflow region labels;
- mobile TOC and filter disclosure behaviour;
- reduced-motion CSS;
- print styles and mobile table overflow;
- no generated-route horizontal overflow in the tested viewports.

## SEO and structured data

- `BaseLayout`: canonical, Open Graph, Twitter, Organization, hreflang.
- Guide pages: Article and BreadcrumbList.
- Route FAQ: FAQPage only where the FAQ is visibly rendered.
- Real tools: WebApplication.
- Guide library and category pages: CollectionPage and ItemList.
- Sitemap contains corrected slugs and excludes the truncated variants.
- New launch gate checks unique titles/descriptions, canonical URLs, schemas, H1, internal links, redirects, and sitemap state across generated output.
- A build-time Markdown sectioner moves existing Who/Common mistakes/Next action/Official sources content without rewriting it, so every English guide renders the eight requested semantic sections once and in the same order.
- English and Chinese guides share `ArticleLayout.astro`; both render the same eight-section decision sequence, with localized labels and one shared TOC implementation.

## Unresolved or deliberately bounded items

- Chinese coverage remains a focused Germany A1 path, not a full-site translation. The Chinese home and route now reuse PageHero, TrustNotice, RouteSelector, RouteProgress, global navigation, global footer, and article primitives; a complete Chinese Routes, Exams, Tools, About, and legal corpus is future content work.
- Payment, product delivery, email reminders, Route Review intake, and partner application workflows are not available. The UI states this explicitly and does not show a purchase action.
- The legacy root static files remain until hosting source-of-truth is confirmed. They are not the Astro editing source.
- Official-source policy, fee, exam-centre, and acceptance facts still require normal human review over time.
- No standalone `lint` or `typecheck` package scripts exist. Astro's build-time type generation and the Node tests are the current engineering gate.
- Chinese guide pages reuse `ArticleLayout.astro` and now include the same eight-section order, official sources, next tools, previous/next navigation, same-route guidance, and correction reporting. Their localized adapter remains separate from the English Markdown collection because the Chinese content is intentionally authored as a focused path instead of a line-by-line translation.

## Verification commands

- `npm test`
- `npm run build`
- `npm run launch-check`
- `git diff --check`
