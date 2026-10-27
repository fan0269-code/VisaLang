# VisaLang

VisaLang is a live, official-source-first language-exam navigation site for visa, residency, citizenship, study and work-registration paths. Its strongest public routes are Germany A1 family reunion and Germany B1 settlement/citizenship.

VisaLang is an independent information and verification navigator. It does not decide eligibility, certificate acceptance, visa outcomes or individual legal questions.

## Current Stack

- Astro static site with TypeScript
- Markdown guide collection under `src/content/guides/`
- Shared layouts and components under `src/layouts/` and `src/components/`
- Static output in `dist/`
- `@astrojs/sitemap`, structured data, canonical/hreflang and fail-closed discovery/advertising gates
- Node assertion suites and a production-oriented launch check

Root-level HTML/CSS/JS files are legacy compatibility assets. Do not use them as the source for new work and do not deploy them instead of the Astro `dist/` output.

## Local Development

Run from the repository root:

```bash
npm ci
npm run dev
```

Then open the URL printed by Astro. Do not preview the current application by opening the legacy root `index.html` directly.

## Verification

```bash
npm test
npm run build
npm run launch-check
git diff --check
```

`npm run launch-check` rebuilds the site and validates generated routes, metadata, links, structured data, discovery gates and advertising exclusions. A successful local check is not deployment or owner approval.

## Source of Truth

- `src/pages/`: public routes
- `src/content/guides/`: English guide content
- `src/components/`, `src/layouts/`: shared UI and page shells
- `src/data/`: route, product and navigation data
- `src/styles/global.css`: design system and global styles
- `public/`: deployment-facing static assets, redirects, robots and headers
- `tests/`: regression contracts
- `scripts/`: build, sitemap, launch and production smoke helpers

Do not hand-edit `dist/`, `.astro/` or `node_modules/`.

## Current Execution Authority

The 2026-09-08 Master Package under
`docs/master-package-2026-09-08/` is the current local execution authority,
following the direct user instruction recorded in
`docs/master-package-2026-09-08/EXECUTION_RECORD.md`.

`docs/VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md` remains
historical/in-progress input and evidence for the existing dirty checkout; it
is not erased or treated as new-work authority where it conflicts with the
Master Package.

Read `docs/VISALANG_CURRENT_STATE_2026-09-01.md`, `docs/OPERATIONS_STATUS.md`,
`docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md`,
`docs/RELEASE_CANDIDATE_MANIFEST_2026-08-21.md`, `PROJECT_CONTEXT.md` and
`AGENTS.md` as supporting state, production evidence and repository rules. They
do not independently expand the approved local scope.

Earlier roadmap, taskbook, Phase 0, traffic, monetization and content plans,
including Scheme 3, are retained as point-in-time evidence. They do not by
themselves authorize new pages, analytics, forms, advertising changes,
payments, commits, pushes or deployment.

The maintained whole-site planning view is
`docs/planning-map/visalang-overall-build-plan.html`; its editable Archify
source, append-only sync history, classified candidate manifest and
artifact-bound evidence live beside it. The diagram visualizes the current
authority and execution state but never overrides the Master Package, status
overlay, or explicit Owner decisions. Every content or content-planning
maintenance window must refresh the planning-map sync record and record whether
the change is aligned, an Owner-approved deviation, or unresolved drift.

## Current Boundary

The local baseline is HEAD `4cb57e8744c752fed1881281e69e7b24cc7281c4` on
`codex/scheme-3-one-week-content`. The checkout is intentionally dirty with an
unreconciled Scheme 3 implementation candidate; it is preserved evidence, not
current execution authority or production evidence. The Master Package governs
the approved local work sequence, and its evidence-gated requirements apply
before any later decision about existing Scheme 3 content, discovery gates or
redirects. The recorded production application payload baseline remains
`80c6d04`, which does not prove the current public production commit without a
fresh production check. The old daily-20 content automation remains paused and
is not an authorized execution plan.

Any commit, push, deployment, production change or external-account action requires separate explicit owner authorization.
