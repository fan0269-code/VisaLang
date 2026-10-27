# VisaLang M3 T20–T23 execution evidence

Window date: 2026-09-11 (Asia/Shanghai)

Evidence state: local implementation, focused automation and local-preview browser
evidence recorded; the same Auditor returned round-3 `PASS` with 0 P0, 0 P1 and
0 P2 for the exact `VL-PMAP-20260911-06` candidate. T20, T21 and T22 are locally
completed at the implementation-review gate; the post-PASS status successor is
exactly frozen and atomically delivered, while its final same-auditor binding
and final serial verification remain pending

Branch: `codex/scheme-3-one-week-content`

Baseline commit: `4cb57e8744c752fed1881281e69e7b24cc7281c4`

Result commit: unavailable — the candidate remains intentionally uncommitted

Deployment: `not_started`

Owner decision: `pending`

Independent review: round 1 `FAIL` (3 P1 + 3 P2); round 2 `FAIL`
(0 P0 + 0 P1 + 3 P2); same-auditor round 3 `PASS` (0 P0 + 0 P1 + 0 P2)

This record distinguishes current local implementation, focused automation and
local-preview browser evidence from verification that has not happened yet. It
grants no authority to commit, push, deploy, publish, change an external account,
import a calendar event, or execute a URL migration. Round 3 confirms all six
round-1 findings and all three round-2 findings are corrected for the exact
reviewed candidate. Its `PASS` closes the local implementation-review gate for
T20–T22 only. T19 remains `partial` / `in_progress`, T23 remains
`evidence_map_only` / `blocked`, and neither M3 nor release is closed. The
post-PASS status successor `VL-PMAP-20260911-07` is exactly frozen and atomically
delivered; its final same-auditor binding and final serial verification remain
pending.

## Current outcome

- `implemented`: T20’s shared bilingual tool presentation and five Chinese tool
  routes, T21’s guide discovery and reader-facing trust corrections, and T22’s
  generated SEO contract are locally completed at the implementation-review
  gate. T23’s evidence-only candidate/rollback map is present in the dirty local
  checkout but remains `evidence_map_only` / `blocked`.
- `automated_verified`: six focused M3 command receipts passed serially in the
  current checkout, including the final T23 rerun; all five focused M2-B suites
  also passed serially. The generated-output suite passed against an 88-page
  `dist/` with 41 sitemap URLs and 47 noindex pages. Post-round-1 focused
  corrections cover the complete Chinese selector matrix, distinct
  `other-family` recovery, both compiled Chinese-guide Clipboard outcomes, the
  current site-test contract and the fail-closed T23 launch gate.
- `browser_verified_so_far`: local preview passed at exact 375×812, 390×844,
  768×1024 and 1440×900 viewports for the recorded T20–T22 surfaces and
  journeys. This is Chromium local-preview evidence only; the explicit
  `not_tested` boundaries below remain open.
- `independently_reviewed`: the same Auditor returned round-3 `PASS` with 0 P0,
  0 P1 and 0 P2 for reviewed sync `VL-PMAP-20260911-06`. The audit report SHA-256
  is `7ca1cdfc9b8b898a51fae57c353005bbea793ad819a36cbeaaf81b67ab944d01`;
  the reviewed complete `sync.json` SHA-256 is
  `b465a72a8956227888d94bc03a21f8106fe3b247889640a67134f04ce628923d`.
  This is the implementation-review result, not a release, Owner or deployment
  approval.
- `committed`: no.
- `deployed`: no.
- `planning_drift_status`: `aligned`. Round-1 sync
  `VL-PMAP-20260911-04` was the audited 83-path candidate. Successor correction
  sync `VL-PMAP-20260911-05` freezes the exact 87-path candidate across 188
  watched files and binds the atomic Archify delivery, automated browser receipt
  and image-capable perceptual receipt; it received the same Auditor's round-2
  `FAIL`. Correction successor `VL-PMAP-20260911-06` freezes the same exact
  87-path candidate across 188 watched files and binds the 9/9 Archify showcase,
  atomic delivery, automated browser receipt and four-image perceptual receipt;
  the same Auditor reviewed that exact receipt and returned round-3 `PASS`.
  Post-PASS status successor `VL-PMAP-20260911-07` freezes the same exact
  87-path scope across 188 watched files and binds the updated authority/status
  snapshot, 9/9 Archify delivery, automated browser receipt and four-image
  perceptual receipt. Its final same-auditor binding remains pending.

## Preservation and authority boundary

- The worktree was already materially dirty. Existing modifications, deletions,
  and untracked files were preserved; no Git reset, checkout restoration, branch
  switch, worktree switch, staging, commit, push, deployment, or publication was
  performed for this record. The current staged path list is empty.
- The Master Package backlog remains byte-identical at SHA-256
  `26fbc283498a2ec60b54f84bedee0c6ca2daaca3e670d74d032ec9c9a6533982`.
- The two protected pre-M3 artifacts remain byte-identical:
  `public/_redirects` is
  `ba08ae41c47462c629c4640b14e940bcf2c22e823fe47a0486e29b4a18af37eb`
  and `src/data/publication-manifest.ts` is
  `af30714bef76d480a163025dfb0e8713543ece88b56f4ef50210537a2d24b7dc`.
- T23 did not restore a source, remove or add a redirect, change a canonical,
  change sitemap policy, or touch a production system. Its dispositions are
  evidence recommendations, not migration authorization.
- T19 remains `partial`: local ICS generation and download have prior M2-B
  evidence, while import into a real calendar client remains
  `blocked/not_tested` without separate explicit authorization.

## Task acceptance matrix

| Task | Implemented | Automated evidence available now | Browser evidence available now | Remaining boundary |
| --- | --- | --- | --- | --- |
| T20 Chinese journey | locally completed at implementation-review gate | `m3-chinese-tool-contract` and `m3-chinese-journey` PASS; bilingual presentation preserves stable rule, source, date, claim, item and route identifiers; the complete purpose matrix, distinct `other-family` recovery and both compiled Chinese-guide Clipboard outcomes are asserted | local preview PASS at 375×812, 390×844, 768×1024 and 1440×900; CUA observed four localized B1/Ausbildung/nursing/university result titles, distinct `other-family` steps and successful Chinese-guide copy feedback `已复制。` | cold new-tab device restore, forced incompatible schema, blocked Clipboard in the browser, actual Chinese export/print/ICS actions and real calendar-client import were not tested |
| T21 discovery and trust | locally completed at implementation-review gate | `m3-discovery-trust` and `commercial-pages` PASS; four stable purpose IDs, membership-based multi-purpose filtering, deterministic URL restore/clear, zero-result recovery, two configured products above 29 reference-only entries, and trust/CTA boundaries are asserted | local preview PASS at all four exact viewports; keyboard skip/menu/filter/chip/clear focus, URL restoration, zero state, 20-card library, 2+29 exam ordering and trust surfaces observed | non-Chromium, physical-device and screen-reader behavior beyond DOM/ARIA/focus inspection were not tested |
| T22 generated SEO | locally completed at implementation-review gate | `m3-generated-seo` PASS 6/6; one canonical, controlled lang/robots, sitemap iff indexable, no parameterized head/sitemap URL, exact reciprocal equivalents, no C01 false pair, current local omission of unresolved redirect-candidate sources, robots/sitemap consistency and full-suite registration are asserted | representative tool, guide, directory and trust metadata PASS in the four-viewport local-preview matrix; no console warnings/errors or page-level overflow observed | production HTTP, headers, redirects, CDN caching, sitemap fetch and live index state were not observed |
| T23 migration map | evidence-only deliverable implemented; migration not executed | `m3-migration-map` PASS 2/2; 17 records, immutable recovery references, complete evidence states, a blocked release gate, and frozen protected hashes are asserted | not applicable to a migration because none was executed | repository legal configuration wiring is present; GSC, backlink, production HTTP, production installation/effect and Owner authorization remain missing, unobserved or pending |

## Implemented scope

### T20 shared Chinese tool journey

- `src/data/tool-copy.ts` supplies typed `en` and `zh-CN` presentation for the
  five shared tools while the calculations, route rules, source references and
  stable IDs remain shared.
- Five thin routes under `src/pages/zh/tools/` render the same Route Finder,
  Checklist, Timeline, Exam Comparison and Reminder implementations with
  `locale="zh-CN"`.
- Tool layout, shell, result support, copy, print and export surfaces accept the
  locale; shared plan state can persist the locale without using it to infer an
  application region.
- Chinese hubs and maintained guides enter the Chinese tool paths. The
  equivalence registry adds only genuine tool pairs and leaves the China-scoped
  C01 guide unpaired.
- `src/data/zh-guide-task-reconciliation.ts` classifies all eight audited
  historical Chinese A1 tasks across five maintained successors. Three absorbed
  task modules remain evidence records with `migrationState: not_assessed`; the
  record does not approve their pre-existing redirect dispositions.

### T21 discovery, exam priority and trust surfaces

- Guide purposes use the stable IDs `family`, `settlement`, `citizenship` and
  `preparation`, including multi-purpose membership where one guide genuinely
  serves more than one task.
- The guide library exposes Purpose, Stage and Language state through a bounded,
  deterministic URL parser/serializer, clear controls and an announced
  zero-result recovery path.
- The exam directory distinguishes the two maintained Goethe/telc A1 product
  records from 29 reference-only official starting points and places the
  configured products first without implying route acceptance.
- About, Editorial Policy, Contact, Pricing, Partners and unavailable product
  surfaces use reader-facing boundaries. Unavailable packs do not expose a CTA
  for a delivery or update service that has not been implemented.

### T22 generated-source contract

- The working M3 build used for focused generated and browser inspection
  completed successfully and generated 88 HTML pages. The inspected output
  contains 41 unique sitemap URLs and 47 noindex pages. The final
  frozen-candidate build remains pending.
- The five `/zh/tools/` routes are indexable, use `lang="zh-CN"`, are
  self-canonical, and are present in the sitemap.
- Eleven reviewed English/Chinese equivalence pairs emit the exact `en`,
  `zh-CN`, and `x-default` set on both sides. The broader English C01 guide and
  China-scoped Chinese C01 guide emit no hreflang relationship.
- No canonical, hreflang target, or sitemap URL contains a query string or
  fragment. The 17 unresolved redirect-candidate sources are absent from the
  current local generated HTML, canonical, hreflang and sitemap output. That
  observation is not an authorized retirement or production HTTP result.
- Generated `robots.txt` matches `public/robots.txt`; it allows crawling so page
  robots directives remain visible and points to the generated sitemap index.
  These are local generated-file observations, not production HTTP claims.

### T23 evidence-only map

- `docs/VISALANG_M3_T23_MIGRATION_CANDIDATE_ROLLBACK_MAP_2026-09-11.md`
  binds all 17 pre-existing Scheme-3 redirect records to package evidence,
  preserved Git blobs and explicit rollback fields.
- The map contains one `HOLD` and 16 `REJECT_CURRENT_REDIRECT` recommendations.
  It contains zero `APPROVE` decisions and records
  `newRedirectAuthorization: none`.
- The repository legal configuration entry point is present:
  `deploy/deploy.sh:78-80` installs `deploy/legacy-redirects.conf`,
  `deploy/nginx-vhost-template.conf:49` includes it, and
  `deploy/README.md:46-55` documents installation. The checked-in snippet
  contains none of the 17 candidate mappings, while production installation
  and effect remain `not-observed`.
- Every record retains the unresolved gates: GSC missing, backlink evidence
  missing, production HTTP not observed, production configuration installation
  and effect not observed, and Owner authorization pending.

## Focused verification ledger

Six focused M3 commands were run serially on 2026-09-11 and all exited 0. The
T23 map suite was deliberately rerun last:

1. `node tests/m3-chinese-tool-contract.test.mjs` — PASS.
2. `node tests/m3-chinese-journey.test.mjs` — PASS.
3. `node tests/m3-discovery-trust.test.mjs` — PASS.
4. `node --test tests/m3-generated-seo.test.mjs` — 6/6 PASS.
5. `node tests/commercial-pages.test.js` — PASS.
6. `node --test tests/m3-migration-map.test.mjs` — final T23 rerun, 2/2 PASS.

The final T23 rerun re-confirmed the frozen protected bytes:

- Master Package backlog:
  `26fbc283498a2ec60b54f84bedee0c6ca2daaca3e670d74d032ec9c9a6533982`.
- `public/_redirects`:
  `ba08ae41c47462c629c4640b14e940bcf2c22e823fe47a0486e29b4a18af37eb`.
- `src/data/publication-manifest.ts`:
  `af30714bef76d480a163025dfb0e8713543ece88b56f4ef50210537a2d24b7dc`.

All five M2-B focused suites were also run serially and passed:

- `node tests/m2b-route-finder.test.mjs`.
- `node tests/m2b-checklist-export.test.mjs`.
- `node tests/m2b-exam-comparison.test.mjs`.
- `node tests/m2b-timeline-result.test.mjs`.
- `node tests/m2b-reminder-ics.test.mjs`.

The focused commands emit the repository’s existing
`MODULE_TYPELESS_PACKAGE_JSON` performance warning when importing TypeScript
modules directly under Node. They did not report a functional test failure.

### RED→GREEN receipts

- The unsupported-route Chinese authority-step uniqueness assertion failed RED
  with 1 distinct rendered step against 4 required steps. Four scoped Chinese
  translations were added; the same assertion then passed GREEN with all four
  steps distinct, and the local-preview result visually confirmed them.
- The full `npm test` aggregation registration check failed RED because
  `tests/site.test.js` omitted 4 of the 5 M3 suite files. After the four missing
  suites were wired into the aggregator, the registration check passed GREEN;
  `tests/site.test.js` now names all five `m3-*` suites. This wiring receipt is
  not represented as the final frozen-candidate `npm test`, which remains
  pending below.
- The recorded initial T22 RED run failed 2 of the then-5 checks: the China-scoped Chinese C01
  page emitted a lone undeclared self-hreflang, and the launch contract still
  expected the pre-T20 83/36/16 generated counts. Removing the non-pair
  alternate and replacing brittle totals with explicit route-set/uniqueness
  assertions made those five checks GREEN. After adding and repairing the
  aggregation-registration check described above, the current suite passed 6/6.
- Browser-focused assertions also caught active-chip removal focusing `BODY`,
  the 375 px Guide Library controls remaining in two columns, and an English
  `Required` pseudo-label on Chinese forms. The focus owner, <=480 px
  single-column grid and `必填` label corrections each passed their focused
  assertion and final browser recheck.

### Same-auditor rounds 1–3 and post-PASS successor boundary

- The required VisaLang Independent Auditor reviewed sync
  `VL-PMAP-20260911-04` and returned round-1 `FAIL` with exactly 3 P1 and 3 P2
  findings. The result is not a release approval.
- Round 2 confirms the correction candidate addresses all six round-1 findings:
  complete branch-specific Chinese Finder presentation and distinct
  `other-family` recovery; a
  locale-aware site-test contract; fail-closed redirect readiness; Chinese-guide
  CopyButton locale plus success/blocked compiled interactions; the repository
  versus production legal-configuration distinction; and reconciliation of the
  correction evidence records.
- The T23/release-gate regression command
  `node --test tests/m3-migration-map.test.mjs tests/m3-generated-seo.test.mjs`
  first exited 1 with 5 passes and 3 expected failures against the old map and
  `READY` behavior, then exited 0 with 8/8 after the narrow correction.
- Direct non-build `node scripts/launch-check.js` now intentionally exits 1
  with 59 PASS, 0 FAIL and 1 BLOCKED, ending in `BLOCKED.` All 17 Scheme-3
  declarations are classified as local structural evidence only; all 17
  candidates remain unresolved/not authorized while
  `newRedirectAuthorization: none`. Local target-file existence is not reported
  as HTTP success.
- Successor correction sync `VL-PMAP-20260911-05` records the exact 87-path
  corrected candidate, 188 watched files, atomic Archify delivery, automated
  browser receipt and image-capable perceptual review. The same Auditor returned
  round-2 `FAIL` with 0 P0, 0 P1 and 3 P2 findings.
- The three P2 corrections are scoped as follows. The legacy standard suites
  now describe only pre-existing local redirect declarations and
  observed local source/target output, explicitly deny retirement,
  equivalence or migration authorization, and bind the 17 candidates to T23's
  zero approvals, `newRedirectAuthorization: none` and blocked release gate.
  The planning diagram records zero visual correction rounds consistently with
  its byte-bound perceptual receipt. The backlog overlay now distinguishes the
  present repository configuration entry point from unobserved production
  installation, active configuration and effect.
- The standard-suite correction is GREEN: `scheme-3-atomic-merge` first failed
  RED against the affirmative legacy contract and then passed; the corrected
  `scheme-3-release-candidate` and `scheme-3-gates` suites also pass with the
  explicit T23 zero-approval / no-authorization / blocked bindings.
- Correction successor `VL-PMAP-20260911-06` is exactly frozen and atomically
  delivered with its automated browser and image-capable perceptual receipts.
  The same Auditor returned round-3 `PASS` with 0 P0, 0 P1 and 0 P2 for that
  exact candidate. The audit report SHA-256 is
  `7ca1cdfc9b8b898a51fae57c353005bbea793ad819a36cbeaaf81b67ab944d01`,
  and the reviewed sync SHA-256 is
  `b465a72a8956227888d94bc03a21f8106fe3b247889640a67134f04ce628923d`.
  This promotes T20–T22 to locally completed at the implementation-review gate.
  It does not promote T19 or T23, authorize release, or predeclare a final
  successor `PASS`.

## Local-preview browser evidence

`docs/VISALANG_M3_T20_T22_BROWSER_EVIDENCE_2026-09-11.md` records the locally
built Astro output served at `http://127.0.0.1:4327/` and inspected in the Codex
in-app Chromium browser. The exact viewports were 375×812, 390×844, 768×1024
and 1440×900. This is not production or cross-browser evidence.

| Surface | 375×812 | 390×844 | 768×1024 | 1440×900 | Exact observed result |
| --- | --- | --- | --- | --- | --- |
| Guide Library | PASS | PASS | PASS | PASS | No page-level overflow; four controls were one column at 375/390 and two columns at 768, with the library visually primary at desktop. The final 390 recheck measured every control at 309 px on the same x coordinate. |
| Exam directory | PASS | PASS | PASS | PASS | Two supported exact A1 products remained before 29 reference-only records; cards reflowed without page overflow. |
| About, Editorial Policy, Contact, Pricing, Partners | PASS | PASS | PASS | PASS | H1 and the primary trust boundary stayed visible; no inactive commercial CTA or page overflow appeared. |
| Chinese home, Germany A1 hub and representative guides | PASS | PASS | PASS | PASS | Chinese navigation and English-destination labels remained explicit; no page overflow appeared. |
| Five `/zh/tools/` routes | PASS | PASS | PASS | PASS | Correct `zh-CN` H1 and localized shell rendered; enabled controls measured at least 44 CSS px high; no page overflow appeared. |
| Chinese comparison ready result | PASS | PASS | PASS | PASS | Page stayed contained; at 375 the focusable table wrapper measured 286 px client width and 680 px scroll width, so only the table scrolled horizontally. |

Observed T20 behavior included the non-inferred application region, Chinese
two-error Finder recovery with focus on country and `必填`, the focused
unsupported state with four distinct authority steps, and the configured
Germany/family/China/spouse/no-certificate route with official sources and
Chinese continuations. The round-1 CUA correction recheck additionally observed
the four localized B1/Ausbildung/nursing/university result titles and two
different `other-family` recovery steps. The explicit 30-day save succeeded,
and same-tab tool navigation restored the configured route. Checklist rendered
12 items across five groups, moved to 1/12 and `[x]` after the first check, and
preserved route, date, scope, region, certificate and official URLs in export
text. Checklist copy announced `清单已复制。`; a maintained Chinese guide's copy
control separately announced `已复制。`. The blocked Chinese-guide Clipboard
feedback passed the compiled interaction assertion but was not induced in CUA.
Timeline calculated base `2026-11-24` and
additional buffer `2026-10-25` for D=`2026-12-15`, W=14, P=7, R=30, while W=-1
hid stale output and focused the Chinese validation error. Comparison rendered
nine rows for Goethe versus telc and recovered from a same-product selection;
Reminder recovered from two empty-field errors and rendered its localized ready
state for `2026-12-15`.

Observed T21 behavior included 20 discoverable guides, exact Purpose/Stage/
Language plus Sort controls, skip-link focus, announced zero-results recovery,
Clear all restoring 20/20 and Search focus, citizenship filtering to 7/20, chip
removal restoring Purpose focus, and direct URL restoration to 1/20 while
discarding the retired `country=Germany` parameter. The 375 px mobile menu
opened and closed from the keyboard without a duplicate active path. Pricing
showed only available free help and no checkout; the reviewed trust/commercial
pages exposed a real contact route without internal workflow language or an
unavailable-product update CTA.

Observed T22 behavior included one self-canonical, controlled robots and correct
HTML language on representative tool, guide, directory and trust pages; exact
three-way alternates on the Route Finder and Goethe test-centres pairs; no
hreflang on either non-equivalent C01 page; and self-canonical indexable Guide
Library and Exam Directory pages without invented alternates. Representative
canonicals contained no query or fragment, and the browser console ended with
no warnings or errors. The generated suite separately covered every HTML page,
sitemap membership, source/output robots consistency, all 11 reciprocal pairs
and the current local absence of all 17 unresolved redirect-candidate sources;
it does not classify those sources as authorized retirements.

## Verification still required before closeout

- The exact post-PASS status successor `VL-PMAP-20260911-07` is frozen and
  atomically delivered. Direct planning-map governance reaches only the stale
  audit-binding gate until the same Auditor reviews that complete receipt.
- Obtain the same VisaLang Independent Auditor's final binding to the exact
  `VL-PMAP-20260911-07` successor. That result remains pending; no final
  successor `PASS` is preclaimed.
- After that binding, run the final frozen-candidate commands serially without
  overlapping build-producing suites: full `npm test`, independent
  `npm run build`, the intentionally blocked `npm run launch-check`, direct
  planning-map governance and `git diff --check`. The earlier 88-page build and
  focused receipts do not replace this final gate, and launch-check may not
  report `READY` while redirect authorization and production evidence are absent.

## Blocked and not tested

- Production HTTP statuses, redirects, headers, canonical behavior, sitemap
  fetch, CDN behavior and live index state: `not_observed` / `not_tested`; no
  production request is inferred from a local build or local preview.
- Real calendar-client import, device alerts, email delivery and notification
  delivery: `blocked/not_tested`; no import or delivery action was authorized.
- The Chinese text export, print dialog and ICS download controls were rendered
  and keyboard-reachable but were not executed in the M3 browser run. M2-B
  retains the shared implementation’s populated print-preview and byte-identical
  ICS-download evidence; those receipts do not establish a real calendar import.
- Forced incompatible saved-schema recovery, blocked-Clipboard fallback and a
  cold new-tab device-snapshot restore were not tested in the M3 browser run.
  The successful Chinese-guide copy recheck and compiled blocked-path assertion
  do not change that browser boundary.
  Screen-reader behavior beyond DOM/ARIA/focus inspection, non-Chromium browsers
  and physical mobile devices were also not tested.
- The repository legal redirect entry point is present, but production
  installation, active configuration and effect were not observed. GSC history
  and backlink evidence are missing, and a locatable Owner migration decision
  remains pending.
  Consequently no T23 migration may execute.
- External Vault synchronization: not performed. The companion repository
  payload is a review record only.
- Commit, push, deployment and publication: not performed and not authorized.
