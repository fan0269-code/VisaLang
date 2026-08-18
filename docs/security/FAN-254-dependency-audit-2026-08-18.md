# FAN-254 dependency audit record

Checked: 2026-08-18

Commands: `npm audit --json`, `npm explain <package>`, and `npm audit fix --package-lock-only` from the repository root. The audit data came from the official npm registry advisory endpoint. No credentials, account data, production data, or deployment settings were captured.

## Baseline findings

The release baseline resolved the following paths and versions:

| npm path | Baseline version | Advisory range | Severity | Advisory |
| --- | ---: | --- | --- | --- |
| `node_modules/astro` | `7.0.7` | `>=2.9.0 <=7.0.9` | moderate | [GHSA-4g3v-8h47-v7g6](https://github.com/advisories/GHSA-4g3v-8h47-v7g6) |
| `node_modules/js-yaml` | `4.3.0` | `>=4.0.0 <4.3.1` | high | [GHSA-5p4m-2wfm-xmqj](https://github.com/advisories/GHSA-5p4m-2wfm-xmqj) |
| `node_modules/nanoid` | `3.3.15` | `<=3.3.17` | high | [GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv), [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8) |
| `node_modules/postcss` | `8.5.16` | `<=8.5.22` | high | [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp), [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) |
| `node_modules/sharp` | `0.34.5` | `<0.35.0` | high | [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) |
| `node_modules/svgo` | `4.0.1` | `>=4.0.0 <4.0.2` | high | [GHSA-2p49-hgcm-8545](https://github.com/advisories/GHSA-2p49-hgcm-8545) |

The baseline official `npm audit --json` metadata contained 1 moderate and 5 high vulnerable package entries (not advisory IDs): `moderate: 1`, `high: 5`, `critical: 0`, `total: 6`. The table contains 1 moderate plus 7 high GHSA IDs because several vulnerable package entries map to more than one advisory. The exact dependency paths were rooted in `astro`: `astro -> sharp`, `astro -> svgo`, `astro -> vite -> postcss -> nanoid`, and `astro -> @astrojs/internal-helpers -> js-yaml`.

## Post-change verification (2026-08-18)

After restoring the original `package.json` range `astro: ^7.0.7`, synchronizing the package-lock root to `astro: ^7.0.7`, and retaining the remediated lock resolution, a final official audit was re-run and reported:

- `npm audit --json` metadata: `moderate: 0`, `high: 0`, `critical: 0`, `total: 0`
- Node modules in lockfile: `astro@7.1.1`, `sharp@0.35.3`, `svgo@4.0.2`
- `npm ci`: exit `0`, 274 packages installed; vulnerability status is recorded separately by the final `npm audit --json`
- `npm audit --json`: exit `0`, `info: 0`, `low: 0`, `moderate: 0`, `high: 0`, `critical: 0`, `total: 0`
- `npm test`: exit `0`
- `npm run launch-check`: exit `0`, 100 pages, 44/44 checks, `READY`
- `for f in deploy/*.sh; do bash -n "$f" || exit; done`: exit `0`
- `git diff --check`: exit `0`

## Remediation result

The manifest range was restored rather than widened: `package.json` and the lockfile root both declare `astro: ^7.0.7`. The lockfile now resolves:

| Package | Remediated version |
| --- | ---: |
| `astro` | `7.1.1` |
| `sharp` | `0.35.3` |
| `svgo` | `4.0.2` |
| `js-yaml` | `4.3.1` |
| `postcss` | `8.5.26` |
| `nanoid` | `3.3.18` |

The post-fix official `npm audit --json` result was exit `0`, with `info: 0`, `low: 0`, `moderate: 0`, `high: 0`, `critical: 0`, and `total: 0`. Residual accepted advisories: none.

Version selection: GHSA-4g3v-8h47-v7g6 lists `astro@7.1.0` as the patched version for the baseline Astro advisory. A separate official record, GHSA-hpcx-pg6g-x697, was withdrawn on 2026-08-03; it is not treated here as a confirmed vulnerability, but its withdrawn record documents a registry-impersonation claim for the exact `7.1.0` tarball. As a conservative supply-chain screening decision, `7.1.0` is excluded from this remediation candidate set. The first version after that excluded release, `astro@7.1.1`, was selected as the smallest compatible candidate and independently checked with official registry metadata and `npm audit --json` on 2026-08-18; it returned zero vulnerabilities. Sources: [GHSA-4g3v-8h47-v7g6](https://github.com/advisories/GHSA-4g3v-8h47-v7g6), [GHSA-hpcx-pg6g-x697 withdrawn record](https://github.com/advisories/GHSA-hpcx-pg6g-x697), and [Astro 7.1.1 npm metadata](https://registry.npmjs.org/astro/7.1.1).

The generic generated file `docs/security/audit.json` is not delivered. This named record is the authoritative evidence artifact; it was generated from the repository root on 2026-08-18 using the official npm registry advisory data and the commands listed above. This record is dependency evidence for a future separately authorised release. It is not deployment, production approval, DNS/TLS approval, or AdSense/CMP account approval.
