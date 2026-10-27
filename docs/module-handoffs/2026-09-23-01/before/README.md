# VisaLang

## Current module execution prompts — 2026-09-23

[Module prompt directory](docs/prompts/2026-09-23-module-build/README.md) · [Dispatch plan](docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md). The current plan is split into 17 functional windows plus one serial integration window and one independent audit window. Start by assigning W00; W01 reader preparation, W02 bounded Laya checks and W08 core decoupling can then proceed in isolated copies of the current dirty baseline. Later work retains its original evidence gates. These are reusable instructions, not completed implementation or authorization for every module to run.

Current sync: `VL-PMAP-20260923-04`; review authority: `docs/planning-map/VISALANG_MODULE_PROMPTS_INDEPENDENT_AUDIT_2026-09-23.md`. Existing T/LP/LC execution and publication states remain unchanged. The diagram topology and independent core/Laya/ads release boundaries are preserved.

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

## Parallel early validation planning — 2026-09-23

The [whole-site plan](docs/superpowers/plans/2026-09-23-visalang-laya-overall-plan.md) and [content plan](docs/superpowers/plans/2026-09-23-visalang-laya-content-plan.md) now schedule LP00 real A1 reader tasks and LP01a initial Laya technical/comparison checks in parallel. LP01a does not wait for recruitment or a demonstrated manual-selection failure. LP01b combines both evidence streams before expanded optimization, full independent evaluation and Linux capacity work; missing reader evidence leaves user benefit unknown. Core fixes and the separately reviewed core release candidate do not wait for Laya checks. The Owner's latest planning instruction supersedes the September 22 mandatory website + Laya + ads joint-release order. Laya, ads and B1 deepening follow separate evidence gates; none automatically blocks the future decoupled core candidate.

Current deployment code still enforces the joint contract: decoupled build, verification, deployment and rollback remain pending implementation. LP00–LP08 (including LP01a/b, LP05a/b and LP06-core/laya/ads) and LC01–LC12 are pending; original task counts stay 25 completed / 5 in-progress / 4 pending. This window changes planning only. Every production action still needs its own explicit Owner authorization.

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
