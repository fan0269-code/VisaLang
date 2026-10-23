---
agent: visalang-independent-auditor
reviewer_independent: true
baseline: main @ f29e165564b01e315b833ea3f45ed627c8204ea4 ; candidate is the uncommitted working tree (4 modified + 1 untracked); this is the re-audit of the R1 FAIL recorded in docs/security/VISALANG_AUDIT_2026-10-23.md; no commit, push, or deploy performed
scope:
  - package.json
  - package-lock.json
  - tests/fan-254-dependency-audit.test.js
  - docs/security/DEPENDENCY_REMEDIATION_2026-10-23.md
  - docs/TASK_LOG.md
agent_review_status: pass
overall_verdict: PASS
findings: []
owner_authorization: pending
deployment_status: not_started
---

# VisaLang Independent Audit — 2026-10-23 dependency remediation, re-audit (R2)

## Independence and authority

I did not write, edit, plan, or test-fix this change in either round. I audited
the corrected candidate read-only and wrote only this report; the R1 report was
not modified (its SHA-256 is unchanged at
`f1b3e528ecb9eddb675ac4b1c266c95db3c02e48cf526ee971aef96567896891`). The five
candidate files hash identically before and after every command in this round
(see scope table). `HEAD` remained `f29e165`. `node_modules/`, `dist/`, and
`.astro/` are gitignored build state and are not candidate content. `npm ci`
and `npm install` were not run: this mandate prohibits them, and running them
would mutate the frozen dependency state under review.

## Scope freeze

`git status --short` shows exactly the five approved paths plus the two auditor
reports (`docs/security/VISALANG_AUDIT_2026-10-23.md`, untracked, and this new
`docs/security/VISALANG_AUDIT_2026-10-23_R2.md`, untracked). `git rev-parse
HEAD` = `f29e165564b01e315b833ea3f45ed627c8204ea4`, branch `main`. No `dist/`,
`deploy/`, `src/`, `public/`, configuration, or unrelated documentation path is
modified or untracked.

| Path | State | SHA-256 (R2) | R1 SHA-256 (prefix) |
| --- | --- | --- | --- |
| `package.json` | modified | `941cceba242b122f4a8cc7de3b3a0edb5eb24f6ee63653f295471720de7c16b7` | `941cceba242b122f…` (same) |
| `package-lock.json` | modified | `f3a0a8df8013f134b02a0a75da4b25924c2988b0ce1a98ff8f621e9a2304922c` | `f3a0a8df8013f134…` (same) |
| `tests/fan-254-dependency-audit.test.js` | modified | `dcf90441b258cf74d430f761ca3c5afc4ce0daeb2b99bede2172885fbcce124c` | `29e3051efe5134c5…` (changed — corrections) |
| `docs/security/DEPENDENCY_REMEDIATION_2026-10-23.md` | untracked (new) | `a326e7b67cae12b80d8d508e900b4198fdfa45a18924598b62c2c4394720f6aa` | `73d1cf2f021442df…` (changed — corrections) |
| `docs/TASK_LOG.md` | modified | `0c3bed22a22f891e6f92b3af4d3f80afb4acf5a12a3a903d3ba7bb4d66a75113` | `78fabef9cc810e22…` (changed — corrections) |

The dependency content itself (`package.json`, `package-lock.json`) is byte-identical
to the R1 candidate, so the R1 technical findings on pins, overrides, resolved
versions, and the clean audit continue to apply unchanged. Only the three
evidentiary/documentation files were corrected.

## Closure of R1 findings

### R1 P1 — unverified baseline vulnerability counts: **CLOSED**

The R1 defect was that the remediation record, `docs/TASK_LOG.md`, and the
regression contract carried a baseline of "18 entries (1 critical, 16 high,
1 low)" that no reproducible command produced.

Verified independently this round:

- I reconstructed the baseline in a clean `/tmp` directory from
  `git show HEAD:package.json` and `git show HEAD:package-lock.json`
  (lockfileVersion 3, 363 entries, `astro@7.1.1`), with **no** `node_modules`,
  and ran `npm_config_cache=/tmp/npm-cache-audit npm audit --package-lock-only
  --json`. Exit **1**, metadata
  `{"info":0,"low":0,"moderate":0,"high":8,"critical":1,"total":9}`, exactly
  **9** package entries: `astro`, `devalue`, `http-cache-semantics`, `js-yaml`,
  `sharp`, `smol-toml`, `source-map-js`, `svgo`, `vite`. Human output:
  `9 vulnerabilities (8 high, 1 critical)`. Repeated 3×: identical 9/9/9.
- `npm audit --json` in the same clean directory **without**
  `--package-lock-only` (still no `node_modules`) also returned exit 1 and the
  same 9 entries, so the count is driven by the committed lockfile and not by
  install-time state. I could not produce 18 or any 1-critical/16-high/1-low
  split by any method available to me; that figure does not reproduce, as the
  correction now says.
- The corrected record (`## Baseline findings`, lines 9–11) now records the
  9-entry figure with the primary counters, names the reproducing command
  (`npm audit --package-lock-only --json` on the committed lockfile), and
  explicitly states that the earlier in-place 18-entry count "was not
  reproducible after a clean `npm ci`". `docs/TASK_LOG.md` line 8 carries the
  same corrected figure (`critical: 1`, `high: 8`, `low: 0`, `total: 9`) and the
  same non-reproducibility statement.
- The regression contract now pins the corrected wording:
  `tests/fan-254-dependency-audit.test.js` lines 77–78 assert the exact string
  "reported 9 vulnerable package entries: 1 critical, 8 high, and 0 low" and
  "not reproducible after a clean `npm ci`". A regression harness in `/tmp`
  (unmodified copy, exit 0) confirmed that reverting the record to
  `18 … 1 critical, 16 high, and 1 low` fails the contract (exit 1,
  `AssertionError: The input did not match the regular expression /reported 9
  vulnerable package entries: 1 critical, 8 high, and 0 low/`), and that
  deleting the non-reproducibility sentence also fails (exit 1). The old count
  is no longer treated as evidence.

The four Astro advisories and their ranges are also independently confirmed from
the same baseline audit JSON (advisory objects, not the summary line):

| Advisory | Severity in audit | Range | Record's table |
| --- | --- | --- | --- |
| `GHSA-26w7-cxv4-gfx2` (AVIF RCE) | critical | `<7.2.8` | matches, including the `<7.2.8` floor |
| `GHSA-376h-93r7-7g6f` | moderate | `<=7.2.3` | matches |
| `GHSA-98hj-9722-w3j8` | moderate | `<7.3.2` | matches |
| `GHSA-mpr7-6m5w-76rw` | low | `>=7.1.0 <=7.3.2` | matches |

The record's statement that the 8 high entries were `js-yaml`, `smol-toml`,
`source-map-js`, `http-cache-semantics`, `svgo`, `sharp`, `devalue`, `vite` is
exact (8 of 8, no extras). Its baseline column (`astro 7.1.1`,
`markdown-remark 7.2.1`, `sitemap 3.7.3`, `prism 4.0.2`, `sharp 0.35.3`,
`svgo 4.0.2`, `vite 8.1.3`, `postcss 8.5.26`, `nanoid 3.3.18`) matches the HEAD
lockfile on all nine.

### R1 P2 — Prism rationale misstated an exact dependency as a range: **CLOSED**

The record now states (`## Remediation`, line 42) that
`@astrojs/markdown-remark@7.3.4` declares the exact dependency
`@astrojs/prism: 4.1.1`, "which is not a range". Verified:

- Candidate lockfile: `node_modules/@astrojs/markdown-remark.dependencies["@astrojs/prism"] = "4.1.1"` (exact, no range operator). The sibling
  `@astrojs/markdown-satteri@0.4.4` declares `"4.1.0"` (also exact).
- `npm ls @astrojs/prism --all` (exit 0): both consumers resolve
  `@astrojs/prism@4.1.0 overridden`; no `invalid` marker. The two surviving
  Prism entries are the nested copies under `@astrojs/markdown-remark` and
  `@astrojs/markdown-satteri`; there is no 4.1.1 anywhere.
- `npm view` engines: `@astrojs/prism@4.1.0` → `node >=22.22.0`;
  `@astrojs/prism@4.1.1` → `node >=22.23.4`.
- The tarball claim is exactly true. I ran `npm pack @astrojs/prism@4.1.0
  @astrojs/prism@4.1.1` in `/tmp`, extracted both, `diff -r`: the only
  differences are `package.json` line 3 (`version`) and line 43
  (`engines.node`, `>=22.22.0` vs `>=22.23.4`). File lists are identical
  (14 files each); no source, type, export-map, or dependency difference
  (`prismjs: ^1.30.0` in both).
- Removal consequence: with the override gone, the `@astrojs/markdown-remark`
  copy would resolve 4.1.1 (and its `>=22.23.4` floor); the
  `@astrojs/markdown-satteri` copy would remain 4.1.0 because that parent
  declares 4.1.0 exactly. The record's "removing the override would silently
  restore 4.1.1 and its Node `>=22.23.4` floor" is therefore correct for the
  copy that carries the deployability constraint; the satteri copy is not
  overridden.
- The record's adjacent statement that no application code imports Prism
  directly holds: recursive grep of `src/` and `astro.config.mjs` for `prism`
  returns 0 matches.

The contract now asserts the corrected rationale: test lines 84–86 require the
exact strings "declares the exact dependency `@astrojs/prism: 4.1.1`", "differ
only in their `version` and `engines.node` fields", and "package `overrides`
entry therefore pins `@astrojs/prism` to `4.1.0`". In the `/tmp` harness,
reverting the rationale to "within a `^4` range", weakening the tarball claim,
or deleting the override-pin sentence each fails the contract (exit 1).

## Correction-by-correction verification

| # | Claimed correction | Independent result |
| --- | --- | --- |
| 1 | Record's `## Baseline findings` carries the reproducible 9-entry clean-install figure with the reproducing command and disclaims the 18-entry in-place count | **Verified.** Lines 9–11 as described; 9/1 critical/8 high/0 low reproduced twice by two audit modes; "not reproducible after a clean `npm ci`" present |
| 2 | `docs/TASK_LOG.md` carries the same corrected 9-entry baseline | **Verified.** Line 8: `critical: 1`, `high: 8`, `low: 0`, `total: 9`, "not reproducible on a clean install"; consistent with observed output |
| 3 | The test asserts the corrected baseline wording and the corrected Prism rationale | **Verified.** Lines 77–78 and 84–86; 5 of 5 targeted mutations fail the contract |
| 4 | Prism rationale: exact `@astrojs/prism: 4.1.1` declaration, tarballs differ only in `version` and `engines.node`, override deliberately forces 4.1.0 to hold the Node `>=22.22.0` floor, removal restores 4.1.1 and `>=22.23.4` | **Verified in full**, including the byte-level tarball comparison (`diff -r`) and both `engines.node` values |

## Record numbers against observed output

| Record claim | Observed this round |
| --- | --- |
| Baseline 9 entries: 1 critical, 8 high, 0 low; `total: 9` | exactly `{"info":0,"low":0,"moderate":0,"high":8,"critical":1,"total":9}`, 9 entries |
| Count reproduced with `npm audit --package-lock-only --json` on the committed lockfile | reproduced, exit 1, 3/3 identical runs |
| 18-entry figure not reproducible after a clean install | I could not produce 18 by either audit mode; consistent |
| `astro@7.4.2` latest, `engines.node >=22.23.4`; `7.4.1` requires `>=22.22.0` | `npm view`: 7.4.2 `>=22.23.4`, 7.4.1 `>=22.22.0` |
| `markdown-remark@7.3.4` satisfies Astro's `^7.3.0` peer range | `npm view astro@7.4.1 peerDependencies` = `{"@astrojs/markdown-remark":"^7.3.0"}` (optional) |
| Production runtime Node `v22.23.1`; verification host `v22.23.2` | `docs/OPERATIONS_STATUS.md` line 28 records server Node `v22.23.1`; host `node -v` = `v22.23.2` |
| Post-change `npm audit --json` exit 0, all counters 0 | exit 0, `{"info":0,"low":0,"moderate":0,"high":0,"critical":0,"total":0}`, 0 entries |
| `npm ls` resolutions (astro 7.4.1, markdown-remark 7.3.4, sitemap 3.7.4, prism 4.1.0 overridden, sharp 0.35.5, svgo 4.1.0, vite 8.3.5, postcss 8.5.31, nanoid 3.3.20) | all nine confirmed via `npm ls --depth=0`, `npm ls @astrojs/prism --all`, and the candidate lockfile |
| `npm test`: exit 0, all 25 regression suites passed | exit 0; `tests/site.test.js` requires 24 files and runs itself = **25** suites (26 "passed" lines because `telc-window-1.test.js` prints two) |
| `npm run launch-check`: exit 0, 101 pages, 46/46, `READY` | exit 0; build log `101 page(s) built in 2.91s`; `find dist -name '*.html'` = 101; `Pass: 46 / Fail: 0`; `READY.` |
| `deploy/*.sh` syntax, `git diff --check` | exit 0 (5 scripts), exit 0, no output |
| `npm ci`: exit 0, 324 added / 325 audited, no engine warnings | **not run** (mandate). Corroborated indirectly: `node_modules/.package-lock.json` has 324 entries, records nothing absent from the candidate lockfile, and 93 platform-gated optional entries are correctly uninstalled on macOS arm64; 92 installed `engines.node` declarations all satisfy Node 22.23.2. The 324/325 figures are consistent but not re-derived from an install by me |
| `js-yaml` absent from the lockfile | 0 occurrences in `package-lock.json` |

## Independent command evidence

All npm commands used `npm_config_cache=/tmp/npm-cache-audit`. Baseline work ran
in a fresh `/tmp` directory containing only `git show HEAD:package.json` and
`git show HEAD:package-lock.json`.

| Command | Exit | Observed |
| --- | --- | --- |
| `git status --short`; `git rev-parse HEAD` | 0 | five scoped paths + 2 auditor reports; `f29e165` |
| `shasum -a 256` (candidate files) | 0 | hashes as in the scope table; unchanged before/after all work |
| `npm audit --package-lock-only --json` (HEAD baseline, clean `/tmp`) | **1** | `high:8, critical:1, total:9`; 9 entries; 26 advisories |
| `npm audit --json` (HEAD baseline, clean `/tmp`, no node_modules) | **1** | same 9 |
| `npm audit` (HEAD baseline, human) | **1** | `9 vulnerabilities (8 high, 1 critical)` |
| `npm audit --package-lock-only --json` ×3 (repeatability) | **1** each | 9 / 9 / 9, identical counters |
| `npm audit --json` (candidate) | 0 | all counters 0, 0 entries |
| `npm ls @astrojs/prism --all` | 0 | both nested `@astrojs/prism@4.1.0 overridden` |
| `npm ls --depth=0` | 0 | `astro@7.4.1`; 7 `extraneous` platform-gated optionals only |
| `npm view astro@7.4.1 astro@7.4.2 @astrojs/prism@4.1.0 @astrojs/prism@4.1.1 version engines --json` | 0 | floors as claimed |
| `npm view astro@7.4.1 peerDependencies --json` | 0 | `^7.3.0`, optional |
| `npm pack @astrojs/prism@4.1.0 @astrojs/prism@4.1.1` (`/tmp`) | 0 | two tarballs, 14 files each |
| `tar -xzf` both; `diff -r x410 x411`; file-list diff | **1** (differences) | only `version` and `engines.node`; file lists identical |
| `npm test` | 0 | 25 suites, `FAN-254 dependency audit contract passed` |
| `npm run launch-check` | 0 | 101 pages, `Pass: 46 / Fail: 0`, `READY.` |
| `for f in deploy/*.sh; do bash -n "$f"; done` | 0 | 5 scripts |
| `git diff --check` | 0 | no output |
| `/tmp` harness: unmodified candidate copy | 0 | contract passes |
| `/tmp` harness: 11 targeted mutations | **1** each | fail as listed below |
| `/tmp` harness: `docs/TASK_LOG.md` baseline count mutated to 18 | **0** | **not guarded** — see observation 3 |
| Synthetic metavuln fixtures (parent depends on vulnerable child) | **1** | only the child is reported; no parent entry (see observation 2) |
| `npm ci` / `npm install` | **not run** | prohibited; see claim table |
| `shasum -a 256 -c`-equivalent pre/post re-hash | 0 | all five candidate files unchanged |

## Regression sensitivity of the corrected test

Copied the five candidate files into `/tmp/r2-harness` (repo untouched),
restored pristine copies between mutations. Baseline copy: exit 0. Mutations
(single change each, applied only to the `/tmp` copy):

| # | Mutation | Exit | Failure |
| --- | --- | --- | --- |
| 1 | `package.json` `astro: "^7.4.1"` | 1 | `manifest pins the patched Astro release` |
| 2 | remove `overrides` | 1 | assertion on `packageJson.overrides[...]` |
| 3 | both lock Prism entries → `4.1.1` | 1 | `…/@astrojs/prism keeps the Node 22.22-compatible Prism version` |
| 4 | lock root `astro: "^7.4.1"` | 1 | `lockfile root mirrors the Astro pin` |
| 5 | reintroduce `node_modules/js-yaml` | 1 | `js-yaml is absent from the lockfile` |
| 6 | lock `astro` → `7.4.2` | 1 | `lockfile keeps the remediated astro resolution` |
| 7 | record baseline back to "18 … 1 critical, 16 high, 1 low" | 1 | regex on the 9-entry wording fails |
| 8 | drop "not reproducible after a clean `npm ci`" | 1 | regex on the disclaimer fails |
| 9 | Prism rationale back to "within a `^4` range" | 1 | regex on the exact-dependency sentence fails |
| 10 | weaken tarball claim to "differ in their engines fields" | 1 | regex on the `version`/`engines.node` sentence fails |
| 11 | delete the override-pin sentence | 1 | regex on "overrides entry therefore pins … 4.1.0" fails |
| 12 | `docs/TASK_LOG.md` baseline → 18 entries / 16 high / 1 low | **0** | **not asserted** (TASK_LOG is only checked for its `Updated:` date) |

The corrected assertions are real guards: the P1 and P2 corrections are now
regression-protected. The 12th case is a coverage gap, not a defect in the
correction itself (the corrected TASK_LOG text is present and consistent; the
record remains the asserted evidence artifact).

## Remaining unverified or imprecise claims introduced by the corrections

None of the following is used as evidence, and none contradicts an operative
figure; I record them so the next reader does not mistake them for verified
observations.

1. **"Entry-level counts are not stable between audit runs"** (record line 11)
   overgeneralises. Repeated runs on the same committed lockfile are perfectly
   stable — I ran the baseline audit 3× and got 9/9/9 identical. What varies is
   the *audited state* (in-place installed tree vs clean lockfile), not a run.
   The following sentence ("not reproducible after a clean `npm ci`") and the
   reproducible 9-entry figure keep the record accurate in substance; the
   phrase should read "between audit environments" if the file is next touched.
2. **"it counted additional parent packages labelled through the same transitive
   advisories"** (same paragraph) is an attribution I could not verify. npm
   10.9.8 does contain dependent-labelling machinery
   (`@npmcli/metavuln-calculator` via `@npmcli/arborist`, surfaced as string
   `via` entries), so the mechanism exists in principle, but I could not
   trigger it in either audit mode on synthetic
   parent→child fixtures, and the reproducible baseline flags no parent package
   (e.g. `@astrojs/internal-helpers` and `@astrojs/markdown-satteri`, both
   ancestors of the vulnerable `js-yaml`, are absent). Reproducing the earlier
   in-place state would require an install, which this mandate prohibits. The
   sentence is explicitly attached to a figure the record declares
   non-reproducible and it justifies no decision, so it is a documented,
   non-operative explanation rather than evidence.
3. **`docs/TASK_LOG.md`'s baseline count is not regression-guarded** (mutation 12
   passes). The corrected figure is present and correct; only the test's reach
   stops at the record.
4. **The test's record-table assertions remain substring-based** (each version
   string must appear anywhere in the document, not in the "Remediated"
   column). This is the same weakness R1 noted; it is why the earlier wrong
   count could pass, and the new explicit baseline assertions now cover the
   figure that mattered.

## Residual risk

1. **Exact pin vs caret.** `astro: "7.4.1"` departs from the repo's caret
   convention and blocks automatic pickup of future patches. Correct while
   production runs Node 22.23.1 (7.4.2 needs `>=22.23.4`), but every future
   Astro security release is now a reviewed manual bump. The test fails loudly
   if the pin is widened or the resolution drifts.
2. **Deliberate override skew.** `@astrojs/prism@4.1.0` is forced beneath a
   parent that declares the exact `4.1.1`; npm accepts it (`overridden`, no
   `invalid`), the tarballs are functionally identical, and Prism is a
   build-time highlighter with no direct import, so exposure is low. It remains
   a skew that must be consciously re-decided when the production Node floor
   moves to `>=22.23.4`.
3. **Build-time-only exposure.** The advisories affect the build toolchain, not
   code shipped to readers; the AVIF/sharp path still processes repository
   images at build time, so the fix was necessary for build-host safety.
4. **`npm ci` claim not re-derived.** The record's 324/325 package-count and
   "no engine warnings" statements are the implementer's; I corroborated the
   installed tree statically (324 lockfile-projected entries, no extraneous
   lockfile divergence, all 92 installed `engines.node` declarations valid for
   Node 22.23.2) but could not re-run the install.
5. **Explanation vs evidence in the baseline paragraph.** Items 1–2 above are
   prose about a discarded figure; the operative 9-entry figure, its command,
   and its reproducibility are independently confirmed.

## Boundary

This report is the independent agent-review result only. **Owner authorization
is separate and remains `pending`; deployment evidence is separate and none
exists (`not_started`).** Agent review does not approve a commit, push,
deployment, release, or external action. No commit, push, deploy, or
dependency install was performed or observed during this audit; `HEAD` is
unchanged and no repository file other than this report was written.

## Verdict

**PASS — P0: 0, P1: 0, P2: 0; new findings: none.**

Both R1 findings are closed and independently verified: the security record,
the task log, and the regression contract now carry the reproducible 9-entry
baseline (1 critical, 8 high, 0 low) obtained from the committed HEAD lockfile
with `npm audit --package-lock-only --json`, the non-reproducible 18-entry
figure is explicitly disclaimed, and the Prism rationale now states the exact
`@astrojs/prism: 4.1.1` declaration, the verified tarball equivalence, and the
deliberate 4.1.0 override that holds the Node `>=22.22.0` floor. Scope is
frozen at the five approved paths, the dependency content is byte-identical to
the R1 candidate, and the full evidence set re-runs green (audit 0, 25 suites,
101-page launch check 46/46 `READY`, deploy syntax, whitespace check). The
remaining items are non-blocking wording and test-reach observations recorded
above. This verdict does not authorise commit, push, or deployment; that
authorization remains with the owner.
