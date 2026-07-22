# Repository Guidelines

## Project Structure & Module Organization

VisaLang is an Astro static site for language-exam and immigration-route guidance. Treat `src/` as the implementation source of truth:

- `src/pages/` defines routes; use nested folders for route groups, for example `pages/tools/route-finder.astro`.
- `src/components/` contains reusable Astro UI; `src/components/tools/` is reserved for shared tool surfaces.
- `src/content/guides/` holds Markdown guide content and front matter; route/tool data belongs in `src/data/`.
- `src/layouts/` provides shared page shells, and `src/styles/global.css` contains design tokens and global styles.
- `tests/` contains Node assertion suites. `docs/` records operational and content decisions. Root-level HTML/CSS/JS files are legacy compatibility assets; do not use them for new features unless a redirect or deployment task requires it.

## Build, Test, and Development Commands

Run commands from `VisaLang/`:

```bash
npm run dev          # Start Astro development server
npm test             # Run all Node regression suites
npm run build        # Clean and generate the production site in dist/
npm run preview      # Serve the generated site locally
npm run launch-check # Rebuild, then validate routes, metadata, links, and schemas
```

Run `npm test` for focused code/content work and `npm run launch-check` before handing off route, navigation, metadata, or deployment-facing changes. This repository has no lint or typecheck scripts.

## Coding Style & Naming Conventions

Follow existing Astro and TypeScript formatting: two-space indentation, single quotes in TypeScript, and concise components with data kept separate from rendering. Name components in PascalCase (`GuideCard.astro`), data modules in kebab-case (`route-tools.ts`), and pages/content slugs in lowercase kebab-case. Preserve the existing trailing-slash route convention. Prefer shared layouts and components over duplicated page markup.

## Testing and Content Safety

Add or update a focused assertion in `tests/` when behavior, a route, or a required link changes. Content front matter must retain the required fields (including `slug`, `publishedDate`, `updatedDate`, and `readingTime`). Visa, exam, fee, and eligibility claims must be official-source-first: do not invent requirements or imply legal advice, payment, delivery, or service completion without a confirmed implementation. Update `docs/TASK_LOG.md` for a completed maintenance window.

## Authority-First Content Policy

VisaLang is a verification navigator, not the deciding authority or a replacement for official sources. Every new or materially updated route guide must identify who has authority over each claim before drafting it. Do not treat a general national overview as proof of a local, programme-specific, centre-specific, or individual outcome.

- For visa, residence, citizenship, and immigration procedure: use the relevant national immigration authority, the competent local authority, or the applicant's specific embassy/consulate. The local authority or mission controls local documents and procedure.
- For university admission and study-language requirements: use the target university and programme as the final authority. Official portals such as DAAD or uni-assist may provide orientation but cannot establish a programme-specific acceptance decision.
- For exam format, score, certificate, test-centre, booking, fee, result, cancellation, or resit information: use the official exam provider and the selected official or authorised test centre. Do not generalise local terms across countries or centres.
- For professional recognition or licensing: use the competent recognition or licensing authority for the profession and place. General government portals are orientation sources, not an individual recognition decision.
- For every other country, establish the equivalent source hierarchy before writing: national authority -> competent receiving/local authority -> official exam provider -> official application or qualification platform. Link readers to the authority that can make the final determination.

For every high-risk factual statement, record the source URL, the date checked, what the source is permitted to support, and its boundary. If the applicable authority, current local rule, fee, deadline, acceptance, exemption, eligibility outcome, or processing time cannot be confirmed, state a concrete reader-side verification action instead of guessing or filling the gap. Never fabricate facts, sources, prices, timelines, eligibility conclusions, acceptance guarantees, or cross-region rules.

## Commits and Pull Requests

Use the established imperative prefixes: `feat:`, `fix:`, `content:`, `docs:`, or `style:` (for example, `fix: preserve tool fallback state`). Keep each commit narrowly scoped. Pull requests should state the user-facing effect, affected routes/data, verification commands and results, linked issue where applicable, and screenshots for visual changes. Flag deployment assumptions separately from source-code completion.

## Obsidian Update Sync

After completing any content-facing change, automatically create or update one review record under `/Users/fanlw/Documents/Website-Content-Hub/10-visalang.org网站维护/30-待审核/网站更新记录/`. Follow `/Users/fanlw/Documents/Website-Content-Hub/50-内容模板/网站更新同步记录模板.md` and record the branch, baseline/result commit when available, changed files, content summary, planning basis, official sources, actual verification results, risks, and owner decision needed.

This sync is part of the content task and does not require a separate reminder. Preserve unrelated repository and Vault changes. Set the Vault record to `status: review`, `needs_human_review: true`, `owner_decision: pending`, and `deployment_status: not_started`. Never mark the record approved, previewed, deployed, or published on the owner's behalf. Do not deploy unless the owner separately authorizes deployment after review.
