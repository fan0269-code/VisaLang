# Dependency security remediation record

Checked: 2026-10-23

Commands: `npm audit --json`, `npm audit --package-lock-only --json`, `npm view`, `npm ls`, `npm pack`, `npm install`, and the repository verification commands listed below, run from the repository root against the official npm registry. No credentials, account data, production data, or deployment settings were captured.

## Baseline findings

A clean checkout of the baseline commit (`f29e165`) resolved `astro@7.1.1`. After `npm ci`, the official audit endpoint reported 9 vulnerable package entries: 1 critical, 8 high, and 0 low (`info: 0`, `low: 0`, `moderate: 0`, `high: 8`, `critical: 1`, `total: 9`). The same count was reproduced with `npm audit --package-lock-only --json` against the committed lockfile.

Entry-level counts are not stable between audit runs: an earlier in-place run on the same baseline reported 18 entries (1 critical, 16 high, 1 low). That figure was not reproducible after a clean `npm ci`, and it counted additional parent packages labelled through the same transitive advisories. This record uses the reproducible clean-install figure of 9 entries.

Direct `astro` advisories:

| Advisory range | Severity | Advisory |
| --- | --- | --- |
| `<7.2.8` | critical | [GHSA-26w7-cxv4-gfx2](https://github.com/advisories/GHSA-26w7-cxv4-gfx2) — remote code execution through AVIF image optimization |
| `<=7.2.3` | moderate | [GHSA-376h-93r7-7g6f](https://github.com/advisories/GHSA-376h-93r7-7g6f) — authorization bypass from a missing path-segment boundary check |
| `<7.3.2` | moderate | [GHSA-98hj-9722-w3j8](https://github.com/advisories/GHSA-98hj-9722-w3j8) — XSS through unescaped `<script>`/`<style>` content |
| `>=7.1.0 <=7.3.2` | low | [GHSA-mpr7-6m5w-76rw](https://github.com/advisories/GHSA-mpr7-6m5w-76rw) — arbitrary CSS injection in View Transitions |

The high entries were transitive build-time packages: `js-yaml`, `smol-toml`, `source-map-js`, `http-cache-semantics`, `svgo`, `sharp`, `devalue`, and `vite`. No runtime application dependency or executable application code is shipped to readers; the static site output is prebuilt HTML, CSS, and images.

## Remediation

| Package | Baseline | Remediated |
| --- | ---: | ---: |
| `astro` | `7.1.1` | `7.4.1` |
| `@astrojs/markdown-remark` | `7.2.1` | `7.3.4` |
| `@astrojs/sitemap` | `3.7.3` | `3.7.4` |
| `@astrojs/prism` | `4.0.2` | `4.1.0` |
| `sharp` | `0.35.3` | `0.35.5` |
| `svgo` | `4.0.2` | `4.1.0` |
| `vite` | `8.1.3` | `8.3.5` |
| `postcss` | `8.5.26` | `8.5.31` |
| `nanoid` | `3.3.18` | `3.3.20` |

Version selection:

- `astro@7.4.2` is the latest registry release, but its `engines.node` is `>=22.23.4`. The recorded production runtime is Node `v22.23.1` and the verification host runs `v22.23.2`, so `7.4.2` exceeds both and is not deployable without a runtime upgrade. `astro@7.4.1` requires Node `>=22.22.0`, fixes all four advisories above, and is therefore pinned exactly as `astro: 7.4.1` so a later `npm install` cannot pull `7.4.2` and break the production Node floor. Any future runtime upgrade can widen this pin in a separate reviewed change.
- `@astrojs/markdown-remark@7.3.4` is required by the Astro 7.4 peer range `^7.3.0`.
- `@astrojs/markdown-remark@7.3.4` declares the exact dependency `@astrojs/prism: 4.1.1`, which is not a range. `@astrojs/prism@4.1.1` declares `engines.node: >=22.23.4`, above the production runtime. Comparing the published tarballs of `4.1.0` and `4.1.1` with `npm pack` and `diff -r` shows the two versions differ only in their `version` and `engines.node` fields; no source, type, or dependency change. The package `overrides` entry therefore pins `@astrojs/prism` to `4.1.0` (Node `>=22.22.0`). npm resolves separate nested copies under each Markdown integration because the parent declares an exact version. No application code imports Prism directly, and this override is a runtime-floor decision rather than a source-version change. Removing the override would silently restore `4.1.1` and its Node `>=22.23.4` floor, so the override is part of the deployability constraint, not cosmetic cleanup.
- Astro 7.4 no longer depends on `js-yaml`; the `js-yaml` tree is absent from the lockfile.

## Post-change verification (2026-10-23)

- `npm audit --json`: exit `0`, `info: 0`, `low: 0`, `moderate: 0`, `high: 0`, `critical: 0`, `total: 0`
- Lockfile resolutions confirmed with `npm ls`: `astro@7.4.1`, `@astrojs/markdown-remark@7.3.4`, `@astrojs/sitemap@3.7.4`, `@astrojs/prism@4.1.0` (overridden), `sharp@0.35.5`, `svgo@4.1.0`, `vite@8.3.5`, `postcss@8.5.31`, `nanoid@3.3.20`
- `npm ci`: exit `0`, 324 packages added and 325 audited, no engine warnings
- `npm test`: exit `0`, all 25 regression suites passed
- `npm run launch-check`: exit `0`, 101 pages built, 46/46 checks passed, `READY`
- `for f in deploy/*.sh; do bash -n "$f" || exit; done`: exit `0`
- `git diff --check`: exit `0`

## Boundary

This record is dependency evidence only. It is not a commit, push, deployment, production approval, or owner approval. The project rules require a separate explicit owner authorization for any commit, push, deployment, or external action, and the independent Auditor verdict is recorded separately.
