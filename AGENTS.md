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

## Commits and Pull Requests

Use the established imperative prefixes: `feat:`, `fix:`, `content:`, `docs:`, or `style:` (for example, `fix: preserve tool fallback state`). Keep each commit narrowly scoped. Pull requests should state the user-facing effect, affected routes/data, verification commands and results, linked issue where applicable, and screenshots for visual changes. Flag deployment assumptions separately from source-code completion.
