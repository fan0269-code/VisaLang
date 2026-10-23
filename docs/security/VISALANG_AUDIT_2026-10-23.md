---
agent: visalang-independent-auditor
reviewer_independent: true
baseline: main @ f29e165564b01e315b833ea3f45ed627c8204ea4 ; candidate is the uncommitted working tree (4 modified + 1 new file); no commit, push, or deploy
scope:
  - package.json
  - package-lock.json
  - tests/fan-254-dependency-audit.test.js
  - docs/security/DEPENDENCY_REMEDIATION_2026-10-23.md
  - docs/TASK_LOG.md
agent_review_status: fail
overall_verdict: FAIL
findings:
  - severity: P1
    path: docs/security/DEPENDENCY_REMEDIATION_2026-10-23.md
    locator: >-
      "## Baseline findings", line 9; duplicated in docs/TASK_LOG.md line 8 and
      asserted in tests/fan-254-dependency-audit.test.js line 77
    evidence: >-
      An independent `npm audit --json` on `git show HEAD:package-lock.json`
      (astro 7.1.1, 363 lock entries) in a clean directory on 2026-10-23
      (npm 10.9.8, Node 22.23.2, official registry) returned exit 1 with
      metadata {"info":0,"low":0,"moderate":0,"high":8,"critical":1,"total":9}
      and the human summary "9 vulnerabilities (8 high, 1 critical)"; the nine
      entries are astro, devalue, http-cache-semantics, js-yaml, sharp,
      smol-toml, source-map-js, svgo, vite. The documented baseline of
      "1 critical, 16 high, 1 low ... total: 18" does not reproduce under any
      counting method (26 advisories were returned: 1 critical, 12 high,
      10 moderate, 3 low), and three packages the record lists as high
      (`postcss`, `css-tree`, `unifont`) were not flagged at all. The critical
      advisory and its `<7.2.8` patch floor are verified; the counts are not.
    required_action: >-
      Re-run the exact baseline command against the HEAD lockfile in a clean
      checkout with no node_modules and record the verbatim output. If the 18
      figure came from a stale installed tree, a different lockfile, or an
      earlier advisory snapshot, say so and replace the figures in the
      remediation record, docs/TASK_LOG.md, and the test assertion with the
      reproducible output; otherwise supply the exact command and environment
      that yields 18. Do not keep an unverified count in a file the regression
      suite treats as evidence.
  - severity: P2
    path: docs/security/DEPENDENCY_REMEDIATION_2026-10-23.md
    locator: >-
      "## Remediation", line 40 (Prism override rationale)
    evidence: >-
      The record says `@astrojs/markdown-remark@7.3.4` declares
      `@astrojs/prism` within a "`^4` range". The lockfile dependency is exact:
      `node_modules/@astrojs/markdown-remark.dependencies["@astrojs/prism"] =
      "4.1.1"`. The override therefore substitutes `4.1.0`, which does not
      satisfy the parent's exact declaration. `npm ls @astrojs/prism --all`
      reports both consumers at `4.1.0 overridden` with no invalid/peer error,
      so installation succeeds, but the stated rationale is factually wrong
      and understates the skew being accepted.
    required_action: >-
      Correct the sentence to state that the Markdown integration declares
      exactly `4.1.1`, that the override deliberately forces `4.1.0` outside
      that exact pin to hold the Node >=22.22.0 floor, and that the combination
      is accepted on the strength of the passing build/tests plus override
      semantics. Record the risk that removing the override silently restores
      `4.1.1` (Node >=22.23.4).
owner_authorization: pending
deployment_status: not_started
---

# VisaLang Independent Audit — 2026-10-23 dependency remediation

## Independence and authority

I did not write, edit, plan, or test-fix this change. I reviewed it read-only and
wrote only this report. No other repository file was modified: the candidate
file hashes below were identical before and after every command I ran
(`shasum -a 256 -c` returned `OK` for all five), and `HEAD` remained
`f29e165`. `node_modules/`, `dist/`, and `.astro/` are gitignored build state;
they are not candidate content.

## Scope freeze

| Path | State | SHA-256 (prefix) |
| --- | --- | --- |
| `package.json` | modified | `941cceba242b122f` |
| `package-lock.json` | modified | `f3a0a8df8013f134` |
| `tests/fan-254-dependency-audit.test.js` | modified | `29e3051efe5134c5` |
| `docs/TASK_LOG.md` | modified | `78fabef9cc810e22` |
| `docs/security/DEPENDENCY_REMEDIATION_2026-10-23.md` | new (untracked) | `73d1cf2f021442df` |

`git status --short` shows exactly these five paths. No `dist/`, `deploy/`,
`src/`, `public/`, or configuration file changed. Scope is fixed and matches the
approved list.

## Claim verification

| # | Claim | Result |
| --- | --- | --- |
| 1 | Baseline audit: 18 entries (1 critical, 16 high, 1 low); critical = Astro AVIF RCE `GHSA-26w7-cxv4-gfx2`, fixed in astro >=7.2.8; also `GHSA-376h-93r7-7g6f`, `GHSA-98hj-9722-w3j8`, `GHSA-mpr7-6m5w-76rw` | **Advisories verified; counts not verified.** All four GHSAs and their ranges (`<7.2.8`, `<=7.2.3`, `<7.3.2`, `>=7.1.0 <=7.3.2`) are present in the baseline audit, with the critical one leading. The reproducible baseline is 9 package entries (1 critical, 8 high), not 18. See **P1**. |
| 2 | `astro: "7.4.1"` exact; `@astrojs/markdown-remark ^7.3.4`; `@astrojs/sitemap ^3.7.4`; override `@astrojs/prism 4.1.0`; 7.4.2 and 4.1.1 excluded for `engines.node >=22.23.4`; production Node `v22.23.1`, host `v22.23.2` | **Verified.** `npm view` reports astro 7.4.1 `node >=22.22.0`, astro 7.4.2 `node >=22.23.4`, prism 4.1.0 `node >=22.22.0`, prism 4.1.1 `node >=22.23.4`. `docs/OPERATIONS_STATUS.md` line 28 records server Node `v22.23.1`; the host runs `v22.23.2`. The `package.json`/lockfile root both pin `7.4.1`. Overrides are honoured (both Prism entries are 4.1.0). Part of the rationale wording is wrong — see **P2**. |
| 3 | Final `npm audit --json` 0 vulnerabilities; after `npm ci`, 324 packages added / 325 audited / no engine warnings | **Audit verified (exit 0, all counters 0).** `npm ci` was not re-run: this audit mandate forbids `npm install`/`npm ci`, and running it would also mutate the frozen candidate's dependency state. Indirect corroboration: `node_modules/.package-lock.json` records 324 installed entries (325 including the root project, matching npm's count), the installed tree matches the lockfile (`astro@7.4.1`, `@astrojs/markdown-remark@7.3.4`, `@astrojs/sitemap@3.7.4`), and a static scan of all 172 `engines.node` declarations in the lockfile found no mismatch against Node 22.23.2 or 22.23.1 apart from the platform-gated optional `@img/sharp-win32-ia32` (`^20.9.0`, never installed on macOS or Linux). The 324/325 figures are therefore consistent, but were not re-derived from a fresh install by me. |
| 4 | `npm test` 25 suites; `npm run launch-check` 101 pages, 46/46, `READY`; `bash -n deploy/*.sh`; `git diff --check` | **Verified.** Exit 0 for all four. `tests/site.test.js` requires 24 suites plus itself; all printed pass lines and the final `FAN-254 dependency audit contract passed`. Build reported `101 page(s) built in 2.57s`; `find dist -name '*.html'` = 101; launch check `Pass: 46 / Fail: 0 / READY.`; five deploy scripts parse; no whitespace errors. |

## Independent command evidence

All npm commands used `npm_config_cache=/tmp/npm-cache-audit` to bypass the known
broken `~/.npm` cache.

| Command | Exit | Observed |
| --- | --- | --- |
| `git status --short`, `git rev-parse HEAD` | 0 | five scoped paths; `f29e165` |
| `npm audit --json` (HEAD lockfile, clean `/tmp` dir) | **1** | `{"info":0,"low":0,"moderate":0,"high":8,"critical":1,"total":9}`; 26 advisories |
| `npm audit` (HEAD lockfile, human output) | **1** | `9 vulnerabilities (8 high, 1 critical)` |
| `npm audit --json` (candidate) | 0 | all counters 0, 0 entries |
| `npm test` | 0 | 25 suites passed |
| `npm run launch-check` | 0 | 101 pages, 46 pass / 0 fail, `READY.` |
| `for f in deploy/*.sh; do bash -n "$f"; done` | 0 | 5 scripts |
| `git diff --check` | 0 | no output |
| `npm view <pkg> version engines --json` (6 versions) | 0 | floors as claimed |
| `npm ls @astrojs/prism --all`, `npm ls --depth=0` | 0 | both Prism 4.1.0 `overridden`; astro 7.4.1 installed |
| Regression harness in `/tmp` (unmodified copy) | 0 | contract passes |
| Regression harness, 6 mutations | 1 each | see below |
| `npm ci` | **not run** | prohibited by the audit mandate; see claim 3 |
| `shasum -a 256 -c` (pre/post) | 0 | all five candidate files `OK` |

## Lockfile and supply-chain integrity

- Root `packages[""].dependencies` mirrors `package.json` exactly
  (`astro: "7.4.1"`, `@astrojs/markdown-remark: "^7.3.4"`,
  `@astrojs/sitemap: "^3.7.4"`).
- Resolved versions: astro 7.4.1, markdown-remark 7.3.4, sitemap 3.7.4,
  markdown-satteri 0.4.4, internal-helpers 0.13.0, sharp 0.35.5, svgo 4.1.0,
  vite 8.3.5, postcss 8.5.31, nanoid 3.3.20. Lockfile is v3, 417 entries.
- Overrides honoured: the only two `@astrojs/prism` entries are the nested ones
  under `@astrojs/markdown-remark` and `@astrojs/markdown-satteri`; both are
  4.1.0. There is no surviving 4.1.1 anywhere.
- `js-yaml` is absent from the entire lockfile, as claimed; `astro@7.4.1`'s
  registry-declared dependency set matches the lockfile byte-for-byte (52/52,
  no additions, no version drift).
- All 416 `resolved` URLs point to `https://registry.npmjs.org`; no git, file,
  or third-party tarball resolutions.
- Changes are confined to the Astro 7.4 graph: 49 new top-level transitive
  packages (MDX/estree, rolldown/vite support, `undici`, `yaml`, `verkit`,
  `tinyps`), and `argparse`, `js-yaml`, `ohash`, `stream-replace-string` were
  removed. No new direct dependency was added.
- No application source imports Prism directly (grep of `src/` and
  `astro.config.mjs` is empty), consistent with the record.

## Regression sensitivity of the updated test

I copied the five candidate files into `/tmp` (repo untouched) and mutated one
thing at a time. The contract passed unmodified (exit 0) and failed on every
regression (exit 1):

| Mutation | Failure message |
| --- | --- |
| `package.json` astro `^7.4.1` | `manifest pins the patched Astro release` |
| remove `overrides` | assertions on `overrides["@astrojs/prism"]` |
| both lock Prism entries → 4.1.1 | `.../@astrojs/prism keeps the Node 22.22-compatible Prism version` |
| lock root astro `^7.4.1` | `lockfile root mirrors the Astro pin` |
| reintroduce `node_modules/js-yaml` | `js-yaml is absent from the lockfile` |
| lock astro → 7.4.2 | `lockfile keeps the remediated astro resolution` |

The test does guard the two decisions that carry risk (exact pin, Prism
override). Its weakest assertion is the record-table check, which only asserts
that each version string appears somewhere in the document rather than in the
"Remediated" column; that weakness is why the wrong baseline count could pass,
but the lockfile assertions themselves are strong.

## Residual risk

1. **Exact pin vs caret.** `astro: "7.4.1"` deliberately departs from the
   repo's caret convention and blocks automatic pickup of future patches. This
   is the right trade-off while production runs Node 22.23.1, but each future
   Astro security release now needs a reviewed manual bump; the test will fail
   loudly if the pin is widened or the resolution drifts.
2. **Override forcing 4.1.0 over an exact 4.1.1 declaration.** npm accepts it
   (`overridden`, no invalid flag), and Prism is a build-time highlighting
   helper with no direct import, so practical exposure is low. It is still a
   deliberate version skew, and the record's stated rationale for it is
   incorrect (P2). If the override is removed, `npm ci` would install 4.1.1 and
   exceed the production Node floor.
3. **Build-time-only exposure.** No Node application code ships to readers; the
   advisories affect the build toolchain. That lowers reader-side risk but not
   build-host risk (the AVIF/sharp path processes repository images at build
   time), so fixing them was still correct.
4. **No commit, push, or deploy.** Confirmed: `HEAD` is unchanged, no remote
   operation occurred, and no deployment artifact outside gitignored `dist/`
   was produced by the verification build.

## Boundary

This report is the independent agent-review result only. **Owner authorization
is separate and remains `pending`; deployment evidence is separate and none
exists (`not_started`).** Nothing here approves a commit, push, deployment,
release, or external action; no commit, push, or deploy was performed or
observed during this audit.

## Verdict

**FAIL — P0: 0, P1: 1, P2: 1.**

The remediation itself is technically sound and independently reproducible at
the level that matters: the critical Astro advisory and its patch floor are
real, the exact pin and Node floors are correct, the override is honoured, the
final lockfile audits clean, the suite and 101-page launch check pass, and scope
did not drift. The failure is evidentiary: the security record's baseline counts
(and the test that enshrines them) do not match the audit output that the same
lockfile produces today, and the Prism rationale misstates the dependency
declaration. Both are correctable inside the approved scope; the same Auditor
must re-review the corrected files.
