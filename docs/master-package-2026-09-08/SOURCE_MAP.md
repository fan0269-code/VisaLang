# Master Package source map

Checked: 2026-09-08 (Asia/Shanghai). This is an implementation map of the
actual repository, not a claim that later Master Package changes are complete.

## Runtime and command baseline

| Concern | Actual source or command | Verified state / boundary |
| --- | --- | --- |
| Framework | `astro.config.mjs`, `package.json`, `package-lock.json` | Astro static site; installed Astro `7.1.1`, declared `^7.0.7` |
| Runtime | `node --version` | Node `v22.23.2` |
| Package manager | `npm --version`, `package-lock.json` | npm `10.9.8`; lockfile version `3` |
| Development | `npm run dev` | Local Astro server only |
| Regression suite | `npm test` | Runs `node tests/site.test.js` |
| Static build | `npm run build` | Clears `.astro`, generates `dist/`, then enriches sitemap last-modified values |
| Local launch check | `npm run launch-check` | Rebuilds then runs `scripts/launch-check.js`; local evidence only |
| Generated output | `dist/` | Static output; never hand-edit as source |

`astro.config.mjs` configures `https://visalang.org`, trailing slashes,
directory-format output and sitemap filtering. `public/` supplies static
deployment inputs; the build copies them to `dist/`. No deployment action is
included in this task.

## Responsibility-to-source mapping

| Master Package responsibility | Actual repository location | Later change surface | Verification |
| --- | --- | --- | --- |
| Routes and hubs | `src/pages/`, especially `index.astro`, A1/B1 hubs, `guides/`, `tools/`, `zh/` | Page source only; preserve trailing slash | test, build, focused route tests |
| English guide bodies | `src/content/guides/*.md`, `src/content.config.ts` | Verified guide rewrites and front matter | focused guide tests, build |
| Shared authority/source UI | `src/layouts/GuideLayout.astro`, `src/layouts/ArticleLayout.astro`, `src/components/SourceCard.astro`, `VerificationAlert.astro`, `TrustNotice.astro`, `LastCheckedBadge.astro` | P0 authority boundaries and later direct-answer presentation | render tests, build |
| Chinese copy/rendering | `src/pages/zh/`, `src/data/zh-germany-a1.ts`, `src/components/ZhGuideLayout.astro` | P0 editorial correction and language synchronization | Chinese-focused tests, build |
| Catalog and rule inputs | `src/data/guide-library.ts`, `guide-taxonomy.ts`, `route-tools.ts`, `app-data.ts`, `article-sections.ts`, `source-review.ts`, `site.ts`, `publication-manifest.ts` | URL/support inventory and typed claim/rule contract | data tests, full tests |
| Tools | `src/pages/tools/`, `src/components/tools/`, `src/scripts/tool-form.ts` | Existing five-tool state after evidence contract | tool tests |
| Shell and styles | `src/layouts/BaseLayout.astro`, `src/components/GlobalHeader.astro`, `GlobalFooter.astro`, `src/styles/global.css` | Scoped presentation only | rendering checks, build |
| Canonical/sitemap/robots | `astro.config.mjs`, `src/layouts/`, `public/robots.txt`, `scripts/enrich-sitemap-lastmod.js` | Source-level config after evidence review | build, launch check |
| Redirects | `public/_redirects` | Protected; evidence and scope required | build, redirect checks |
| Tests/release checks | `tests/`, `tests/site.test.js`, `scripts/launch-check.js` | Focused contracts when behavior changes | focused/full tests, build |
| Operating evidence | `docs/`, `docs/TASK_LOG.md`, `.superpowers/sdd/VisaLang-Master-Plan/` | Decisions, sources, status, handoff | document review |

## Protected locations and authority limits

| Location or action | Rule |
| --- | --- |
| `dist/`, `.astro/`, `node_modules/` | Generated/dependency state; do not hand-edit. |
| `public/_headers`, `public/_redirects` | Specially protected by the Master Package; do not bypass source-level work. Redirect changes need evidence. |
| Existing dirty Scheme 3 files | Pre-existing user/in-progress state. Preserve; do not restore, delete, overwrite, switch branches, or infer an approved migration. |
| Commits, pushes, deployment, production, external accounts | Not authorized. Local verification is not release approval. |
| High-risk claims | Competent immigration authority/mission decides application acceptance; official provider decides product format; selected official/authorised centre decides local booking, fee and operations. |

## Package-to-repository mapping

All eight source artifacts were copied verbatim from the user-provided Master
Package into this directory. Screenshots were deliberately excluded and are not
source material. `shasum -a 256 docs/master-package-2026-09-08/*` reproduces
the integrity check.

| Package artifact | In-repository copy | SHA-256 |
| --- | --- | --- |
| `VisaLang-Codex-Start.md` | `VisaLang-Codex-Start.md` | `838b38421ca6c2fc3b7e49986a1df508f6c57495b5ead3515c1c4eeed8ab39e1` |
| `VisaLang-Master-Plan.md` | `VisaLang-Master-Plan.md` | `540d0c2cc76e63d790c292cd798e2f5b1a4006871cd0f84e71da6e68e913f2a2` |
| `VisaLang-Codex-Backlog.csv` | `VisaLang-Codex-Backlog.csv` | `26fbc283498a2ec60b54f84bedee0c6ca2daaca3e670d74d032ec9c9a6533982` |
| `VisaLang-audit.md` | `VisaLang-audit.md` | `4e7482a66ff2a967b837221ed50d24da5cc8a9d6a3d3e8286dd71e49f8e4277b` |
| `VisaLang-url-remediation.csv` | `VisaLang-url-remediation.csv` | `9519aa5b3be14dbaa18c94300194f3d8847253c99c132ce40390cb7c27ac1161` |
| `VisaLang-content-rewrites.md` | `VisaLang-content-rewrites.md` | `2e4ee6e46d56d3af6e4e4394973fe3dc7984ae84b5d30dbe6bee128f7acb642f` |
| `VisaLang-implementation-plan.md` | `VisaLang-implementation-plan.md` | `a6838ce00c15029a67088e79428a7e9f94f74e6c452b7c7bc085a3e4a390d389` |
| `VisaLang-unverified-urls.csv` | `VisaLang-unverified-urls.csv` | `817545d3533fba75fa912096e2b8bfbfb115eb462f0df36c4bf17807697303a9` |

## Known conflicts

- Existing Scheme 3 changes alter guide availability, discovery gates and
  redirects. Its test/launch-check contracts prove the older model, not Master
  Package acceptance.
- The Master Package requires evidence before irreversible URL retirement or
  migration. No GSC/backlink/equivalent-successor evidence is available here;
  old uncommitted deletion/redirect decisions are not approved migrations.
- Package data-contract guidance is a requirement for later work. This map
  identifies real current files rather than inventing missing directories or
  claiming the contract already exists.
