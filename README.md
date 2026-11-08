# VisaLang

> **部署说明**：生产托管是 Vercel，步骤见 `deploy/VERCEL.md`。规范域名仍是 `https://visalang.org`（`www` 301 到 apex）。`npm run build` 生成 `dist/`。`deploy/deploy.sh` 等 Nginx 脚本已弃用，默认拒绝执行。旧 `.html` URL 由 `vercel.json`、`public/_redirects` 与历史 `deploy/legacy-redirects.conf` 保留。权威 robots/sitemap 在 `public/` → `dist/`。

VisaLang is a live, official-source-first language-exam navigation site for visa, residency, citizenship, study and work-registration paths. Its strongest public routes are Germany A1 family reunion and Germany B1 settlement/citizenship.

VisaLang is an independent information and verification navigator. It does not decide eligibility, certificate acceptance, visa outcomes or individual legal questions.

## Current Stack

- Astro static site with TypeScript
- Markdown guide collection under `src/content/guides/`
- Shared layouts and components under `src/layouts/` and `src/components/`
- Static output in `dist/`
- `@astrojs/sitemap`, structured data, canonical/hreflang and fail-closed discovery/advertising gates
- Node assertion suites and a production-oriented launch check

Pre-Astro dual-stack root HTML/CSS/JS files have been removed. Do not reintroduce them; old `.html` URLs are handled by `vercel.json`, `deploy/legacy-redirects.conf`, and `public/_redirects` (301). Publish only the Astro `dist/` output.

## Production hosting

Vercel serves the static build. The production URL stays `https://visalang.org`, and `www.visalang.org` redirects to that apex. Connect the GitHub repository using the install, build, output, and Node 22.x settings in `deploy/VERCEL.md`. A `*.vercel.app` hostname is only a preview. Do not put it in `astro.config.mjs`.

`deploy/deploy.sh`, `deploy/rollback.sh`, `deploy/server-init.sh`, and `deploy/harden.sh` are the historical Nginx origin. They exit unless `VISALANG_LEGACY_NGINX_DEPLOY=authorized`. There is no GitHub Actions SSH deploy to disable.

`advertisingRuntimeEnabled` stays `false`. This hosting change does not submit AdSense.

## Local Development

Run from the repository root:

```bash
npm ci
npm run dev
```

Then open the URL printed by Astro. There is no root `index.html`; use `npm run preview` after build if you need a static preview.

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

Read these documents in order before starting maintenance:

1. `docs/OPERATIONS_STATUS.md`
2. `docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md`
3. `docs/RELEASE_CANDIDATE_MANIFEST_2026-08-21.md`
4. `docs/NEXT_STAGE_PHASE_0_EXECUTION_PLAN_2026-08-21.md`
5. `docs/NEXT_STAGE_EXECUTION_TASKBOOK_2026-08-21.md`
6. `docs/MASTER_EXECUTION_PLAN.md`
7. `PROJECT_CONTEXT.md`
8. `AGENTS.md`

Historical planning and launch documents remain useful evidence but do not independently authorize new pages, analytics, forms, advertising changes, payments, commits, pushes or deployment.

## Current Boundary

The ordered Security/App application release is complete at `80c6d04`. The docs-only governance commit containing this record is its authorised successor and does not change product source or generated site behavior. Preserve the dirty local `main`; after this successor reaches `origin/main`, local `9e33c5c` is behind by two commits. The next work package is real Search Console/analytics/CMP evidence before any content expansion or commercial change. The old daily-20 content automation remains paused and is not an authorized execution plan.

Any commit, push, deployment, production change or external-account action requires separate explicit owner authorization.
