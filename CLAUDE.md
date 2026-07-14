# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

VisaLang is a bilingual (English/中文) static navigation site for language-exam evidence used in visa, residency, citizenship, study, and work journeys. It is built with Astro 7, TypeScript, Astro Content Collections, Markdown guides, CSS, and Node `assert` regression tests. It has no application backend or database.

The site is a **verification navigator, not a decision-maker**: content and tools must guide readers to the official authority that makes the final decision. The fully configured route-tool path is currently Germany family-reunion A1; every other route must remain in the official-verification-required fallback.

## Commands

Run commands from the repository root.

```bash
npm run dev                 # Start the Astro development server
npm run build               # Clean Astro cache, build static output, enrich sitemap lastmod dates
npm run preview             # Preview the built static site
npm test                    # Run the complete Node assert regression suite
npm run launch-check        # Build, then run the release/readiness checks against dist/
```

Run an individual test file directly when iterating on a focused area:

```bash
node tests/route-tools.test.js
node tests/commercial-pages.test.js
node tests/content-integrity.test.js
node tests/germany-a1-cluster.test.js
node tests/germany-b1-cluster.test.js
node tests/germany-testdaf-cluster.test.js
```

There are currently no package scripts for linting, formatting, or standalone type-checking. Do not document or invoke nonexistent `npm run lint` or `npm run typecheck` commands.

`bash deploy/deploy.sh` is a server deployment workflow: it installs locked dependencies, builds, and publishes `dist/` to Nginx. It is not the default local development command.

## Architecture

### Source of truth and generated output

- Treat `src/` as the active Astro application: pages are in `src/pages/`, reusable UI in `src/components/` and `src/layouts/`, content in `src/content/guides/`, and structured logic/data in `src/data/`.
- `public/` is copied directly into `dist/` at build time. It owns public static assets plus deployment behavior such as `_redirects`, `_headers`, and `robots.txt`.
- Never edit `dist/`, `.astro/`, or `node_modules/` by hand. Change `package-lock.json` only when dependencies genuinely change.
- The root `index.html`, `app.js`, `app-data.js`, `styles.css`, `guides/*.html`, and `zh/*.html` belong to a legacy static compatibility layer. Do not use or delete them for normal feature work unless the task explicitly covers legacy compatibility, redirects, or deployment.

### Content, page, and SEO flow

1. `src/content.config.ts` defines the `guides` Markdown collection and validates guide frontmatter.
2. `src/pages/guides/[slug].astro` uses the collection to generate static guide routes and passes guide data/content to `GuideLayout.astro`.
3. `src/data/article-sections.ts` classifies Markdown headings for the standardized guide sections.
4. `GuideLayout.astro` provides the guide trust structure: breadcrumb, one H1, direct answer, verification reminder, TOC, disclaimer, related content, and Article/Breadcrumb JSON-LD.
5. `BaseLayout.astro` provides site-wide metadata and shell: canonical and hreflang links, Open Graph/Twitter tags, Organization JSON-LD, navigation, and footer.
6. `astro.config.mjs` sets `trailingSlash: 'always'` and the production site URL. The sitemap integration produces the sitemap; `scripts/enrich-sitemap-lastmod.js` adds guide update dates after the build.

### Browser tools

`src/data/route-tools.ts` contains the testable route and timeline logic. `src/pages/tools/route-finder.astro` validates browser input, uses that module, persists successful non-sensitive result inputs through URL query parameters, and renders either a configured path or an official-verification fallback. `RouteProgress.astro` separately stores the current route step in `localStorage`; the reminder planner generates ICS locally and has no mail-service integration.

## Project-specific constraints

### Routing, layout, and verification

- Preserve trailing-slash URLs. For a public route addition or migration, update canonical/hreflang tags, JSON-LD, sitemap behavior, internal links, and `public/_redirects` when an older URL needs preservation.
- Reuse `BaseLayout`, `GuideLayout`, existing shared components, and `src/styles/global.css` tokens/classes rather than creating a parallel visual system.
- Guide pages must retain a single H1, accessible skip target, TOC, official verification reminder, disclaimer, and the established guide structure.
- For changes affecting routes, navigation, SEO, content structure, sitemap, redirects, or layout, run both `npm test` and `npm run launch-check` before completion.
- When behavior, route coverage, or required links change, update the smallest relevant assertion in `tests/`.

### Content and commercial boundaries

- Link visa, residency, citizenship, admission, and professional-qualification claims to the authority with final decision power. Link exam fees, dates, centres, cancellations, and results to the official exam owner or authorised centre.
- Do not invent or guarantee fees, dates, eligibility, exemptions, accepted certificates, results, visa outcomes, payment, delivery, or service-completion states. When a fact is not verifiable, give readers a concrete official verification step.
- Keep guide frontmatter complete. In particular, `slug`, `publishedDate`, `updatedDate`, and `readingTime` are required; slugs must be unique, match the filename, and any `related` slugs must resolve.
- Commercial pages remain contact-intent/coming-soon pages. Do not add unconfirmed prices or claims that payment, email sending, review acceptance, product delivery, or a service workflow exists.
- Do not add forms, payments, email delivery, third-party tracking, or ads without explicit scope. Consent/privacy/network requirements must be addressed together for any such change.
- Write Chinese pages naturally for Chinese readers; do not mechanically translate English copy.

## Documentation precedence

Use `PROJECT_CONTEXT.md`, `AGENTS.md`, current `package.json`, `src/`, and `tests/` as the present-day implementation sources. Some historical documentation — including the previous version of this file, `README.md`, `docs/CONTENT_WORKFLOW.md`, and `docs/LAUNCH_CHECKLIST.md` — describes the legacy static layer and must not override the current Astro architecture or test constraints.
