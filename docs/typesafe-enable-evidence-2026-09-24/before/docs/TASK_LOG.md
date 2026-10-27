## 2026-09-16 — T27 最小统计与隐私一致性（local implementation only）

- Scope: added the local-only `t27.v1` measurement contract for the five existing tools, strict finite-enum validation, tool contract data attributes, and the smallest Privacy/Cookie/Terms wording corrections. No Analytics collector, custom event sender, ad/CMP implementation, account action, form/email service, payment, URL migration, redirect, production probe, commit, push or deployment was performed.
- Actual source audit: current Astro source has no Google Analytics, Plausible, Cloudflare Web Analytics, fetch/XHR/beacon, cookie write, or event transport. AdSense remains conditionally emitted only for the existing eligible English guide publication policy; account, serving, Auto ads, CMP, regional consent and production behavior remain unverified. Existing session-first plan state, optional 30-day device localStorage and local ICS generation remain separate from measurement.
- Contract: `tool_viewed`, `tool_result_rendered`, and `tool_takeaway_requested`; only `t27.v1`, five stable tool IDs, `en|zh-CN`, finite tool-specific result states, and explicit checklist/ICS actions are allowed. Malformed/unknown values and all free text, URL/query, identity, date, raw answer, document, note and third-party identifier fields fail closed. No event is stored or sent, so no traffic baseline or completion rate exists.
- Tests/evidence: `tests/t27-measurement-privacy.test.mjs` is registered in `tests/site.test.js`; full evidence is `docs/VISALANG_T27_EXECUTION_EVIDENCE_2026-09-16.md`. The required external Obsidian Vault root/template is absent; local fallback `docs/VISALANG_T27_OBSIDIAN_SYNC_PAYLOAD_2026-09-16.md` remains `review` / `needs_human_review: true` / `owner_decision: pending` / `deployment_status: not_started`.
- Planning sync: a new T27 sync will bind the exact changed-path scope, watched digest, generated Archify delivery, browser receipt, perceptual receipt, and this log. Drift remains `aligned` if the task stays inside T27; the separate Auditor must re-check the final bytes and exact scope.
- Status boundary: T23 remains `blocked` / `evidence_map_only`; T19 remains partial with calendar-client import `blocked/not_tested`; release remains `not_deployed`; independent review is `unavailable` after two separate read-only Auditor attempts, so no `PASS` or T27 completion gate is claimed.
- Final verification: focused T27 exit 0, build exit 0, launch-check exit 1 with 59 PASS / 0 FAIL / 1 BLOCKED for T23, diff-check exit 0; full `npm test` remains blocked only by the missing independent Auditor report.

# VisaLang Task Log

Updated: 2026-09-09

## Planning authority consolidation — 2026-09-01

- Scope: created a three-layer planning system consisting of a 6–12 month master roadmap, a current-state baseline and a rolling 90-day execution plan. No public route, guide, source claim, application behavior, account, deployment or production state changed.
- Authority result: README now directs maintainers to the three 2026-09-01 planning documents first. The 2026-07-13 master plan and 2026-08-21 taskbook remain historical evidence; Operations Status and release records remain production evidence rather than independent product authorization.
- Planning result: the roadmap holds content expansion and commercial changes behind responsibility, Search Console, separate Analytics/AdSense/CMP evidence and four weeks of stable data. Germany A1/B1 optimization remains the first growth cycle; a second route, broad Chinese expansion and commercial activation remain gated.
- Verification: repository inventory supported 37 Astro page files, 53 English guide files and 25 `.test.js` files; `git diff --check` passed and the placeholder scan returned no matches. Tests/build/launch-check were not run because this scope changes documentation only and does not change source, routes, metadata, sitemap, advertising behavior or deployment files.
- Review boundary: the VisaLang Independent Auditor returned an initial FAIL with three P1 consistency findings and a re-review P2 role-count finding. The README baseline, historical authority ordering, separate Analytics/AdSense/Google Privacy & messaging CMP decisions and drift-prone fixed role count were corrected. The same Auditor's final re-review returned `PASS` with no remaining P0/P1/P2. Owner authorization for commit, push, deployment or external-account action remains pending; deployment is not started.

## Governance-only successor release — 2026-08-21

- The commit containing this record is the approved docs-only successor of App commit `80c6d04`; it contains governance documentation only and leaves product source/output unchanged.
- After successful deployment, origin/server/current advance to that containing commit and the immediate rollback target becomes verified App release `80c6d04c4ccd`.
- Local dirty `main` remains at `9e33c5c` and is then behind by two commits; it is not reset or overwritten.

## Split Security and App production release — 2026-08-21

- Owner authorised both read-only account verification and an explicit account-evidence waiver, then authorised the full ordered release. No authenticated AdSense/CMP context was available; no account setting changed and no account-side verification is claimed.
- Pushed and deployed Security RC `f680c6234611606c0f308bbf386ee714b027385a` first. Server Node 22 gates passed with 100 pages and launch 44/44 READY; immutable release `f680c6234611` and production smoke passed.
- Confirmed production source/current were exactly `f680c62`, then revalidated App RC `80c6d04c4ccd3d5ee9af069703f7a56534939c3e` against that actual baseline: official registry, audit 0, test PASS, 100 pages, launch 46/46 READY, diff/status clean, independent Auditor PASS with P0/P1/P2=0.
- Pushed and deployed App RC. Final production source and `current` resolve to `80c6d04c4ccd3d5ee9af069703f7a56534939c3e` / `/var/www/visalang.org/releases/80c6d04c4ccd`; server source is clean.
- Final smoke passed for homepage, Guides, robots, sitemap, canonical redirects, AdSense source rules, `ads.txt` and security headers. Focused public checks passed for 404/noindex/search/no-ads recovery, separated SEO title versus visible H1, and the default OG PNG.
- Immediate rollback is the verified Security release `/var/www/visalang.org/releases/f680c6234611`; no rollback trigger occurred.
- Local dirty `main` and all unrelated governance/evidence work remained preserved and were not reset or swept into the release.

## Historical VisaLang production and content-ledger reconciliation snapshot — 2026-08-21

- Paused the Codex automation `visalang-20`. Its old `ACTIVE` prompt explicitly required 20 new articles per day; the preserved automation configuration now reports `status = "PAUSED"`, preventing the next 09:00 run.
- Direct production evidence: `/var/www/visalang.org/current` resolves to `/var/www/visalang.org/releases/6a1cb4323920`; server source HEAD is `6a1cb43239200ceae1d43700cdc0241bdbc2e861` and clean. The release directory mtime is `2026-08-18T11:20:52+08:00`.
- Rollback evidence: `/var/www/visalang.org/releases/cd0f73cb0f9d` is complete and maps to ancestor commit `cd0f73cb0f9d4662d73369bb757bdaa02856eb50`. It is an available candidate, not a completed rollback drill.
- Production smoke passed from the production host for homepage, Guide Library, robots, sitemap, legacy/`www` redirects and the repository's canonical, advertising-exclusion, `ads.txt`, robots and security-header assertions.
- Reconciled all 21 Website Content Hub update records. Nineteen records now reflect physical deployment through the current production lineage; FAN-254 and FAN-270 remain `not_started`. All 21 retain `status: review`, `needs_human_review: true` and `owner_decision: pending`; no approval identity or time was fabricated.
- Corrected the FAN-254 Hub `result_commit` from non-ancestor `ea07fb7d94d61d774ad3698cd954d0400c2f5e2a` to current local candidate `f680c6234611606c0f308bbf386ee714b027385a`. The seven local FAN-254 commits remain ahead of `origin/main` and are not deployed.
- FAN-270 remains an uncommitted local SEO candidate. This window did not commit, push, deploy, rollback or alter source/content implementation, DNS/TLS, AdSense/CMP, Search Console or other external accounts.
- Full mapping and remaining owner/review gates are recorded in `docs/RELEASE_RECONCILIATION_2026-08-21.md`.

### Pre-release local candidate snapshot — superseded by the production release above

- The reconciliation bullets above are a point-in-time record. Local `main` subsequently advanced to `9e33c5c`, now 11 commits ahead of `origin/main`: seven FAN-254 commits, three FAN-273 commits and the committed FAN-270 candidate.
- These local commits remain outside production. The working tree also retains pre-existing uncommitted reconciliation/governance files. `docs/RELEASE_CANDIDATE_MANIFEST_2026-08-21.md` is the current package-to-commit matrix.
- At that reconciliation point, the decision remained `NO-GO / OWNER_DECISION_REQUIRED`; this historical note did not authorise commit, push or deployment. The later authorised production result is recorded in the release section above.

## FAN-270 sitewide content and SEO optimisation — 2026-08-20

Scope: audited the current 100-route Astro build and improved search/social metadata without reopening high-risk immigration, exam, fee, eligibility, acceptance, authority, or source-review claims. Existing unrelated workspace files were preserved.

Completed:

- Confirmed the existing canonical, structured-data, hreflang, sitemap, noindex, advertising, and internal-link gates remained coherent across 100 generated routes and 56 indexable routes.
- Added schema-limited guide `seoTitle` metadata and concise titles for 16 indexable Germany A1/B1 guides, preserving their visible H1s, Article headlines, breadcrumbs, related-guide labels, and authority boundaries.
- Shortened the Germany B1 route-hub metadata title plus the Germany B1 hub and Timeline Planner descriptions.
- Replaced the default social-card reference with a 1200×630 PNG rendition of the existing VisaLang artwork and added Open Graph site/locale/image metadata, Twitter image metadata, image alt text, and explicit crawler directives through the shared layout.
- Added `tests/fan-270-seo.test.js` and extended the production launch check to enforce the indexable-English snippet budget and complete social/crawler metadata.
- Recorded the complete audit and boundaries in `docs/FAN-270_SEO_AUDIT_2026-08-20.md`.

Verification and boundary:

- `node tests/fan-270-seo.test.js` passed; `npm test` passed; `npm run launch-check` built 100 routes and passed 46/46 checks with `READY`; `git diff --check` passed.
- Independent read-only review initially found five P2 gaps: artwork-alt accuracy, custom-image metadata coupling, empty `seoTitle` validation, alternate-locale coverage, and an unsupported documentation approval claim. All were corrected; the same reviewer re-reviewed the corrected work and returned `PASS` with no remaining P0/P1/P2 findings.
- No visible guide headline, authority assignment, source date/status, route, canonical, hreflang pair, sitemap membership, content maturity, advertising gate, legal/visa/exam claim, commit, push, preview, deployment, publication, Search Console setting, or production state changed.

## FAN-254 post-release dependency advisory remediation — 2026-08-18

Scope: restored the original `package.json` Astro range after FAN-255 review, synchronized the lockfile root range, preserved the `VisaLang` lockfile project metadata, and retained the lockfile-only dependency remediation after FAN-253 release verification. No source routes, guide content, authority boundaries, discovery/advertising gates, deployment configuration, production state, DNS/TLS, or AdSense/CMP accounts were changed.

Completed:

- Recorded the baseline official `npm audit --json` result as 1 moderate and 5 high vulnerable package entries, with the table separately identifying 1 moderate plus 7 high GHSA IDs, exact npm paths, affected ranges, advisory URLs, and dependency ownership in `docs/security/FAN-254-dependency-audit-2026-08-18.md`.
- Restored the original `package.json` range `astro: ^7.0.7` and synchronized the lockfile root to that range; the lockfile now resolves the smallest verified safe Astro candidate `7.1.1`, plus sharp `0.35.3`, svgo `4.0.2`, js-yaml `4.3.1`, postcss `8.5.26`, and nanoid `3.3.18`.
- The generated generic `docs/security/audit.json` is excluded from the deliverable; the named Markdown record is the authoritative evidence artifact and records its generation context.
- Recorded the post-fix official audit result as zero vulnerabilities with no residual accepted advisories.

Verification and boundary:

- Final manifest/lockfile verification: `npm ci` exit 0 and installed 274 packages; `npm audit --json` exit 0 with `info: 0`, `low: 0`, `moderate: 0`, `high: 0`, `critical: 0`, `total: 0`; `npm test` exit 0; `npm run launch-check` exit 0 with 100 pages and 44/44 checks (`READY`); `for f in deploy/*.sh; do bash -n "$f" || exit; done` exit 0; and `git diff --check` exit 0.
- Independent read-only review by Kepler reviewed commits `f691b20..8f10960` and re-reviewed `8f10960..3312d82`; the same reviewer returned `PASS` with no remaining P0/P1/P2 findings.
- No commit, push, deployment, DNS/TLS change, production access, public smoke check, or external account change was performed.

## FAN-237 sitewide bug audit and Timeline Planner timezone fix — 2026-08-17

Scope: audited the current Astro source, generated output and public route inventory, then fixed the one reproducible user-facing defect found in the Timeline Planner. Existing unrelated content, UI, source-review and documentation changes in the shared worktree were preserved.

Completed:

- Ran the standard source suite and the generated-site launch gate across 100 local routes. The launch gate passed all 44 checks covering route output, H1s, metadata, canonical URLs, JSON-LD, navigation, guide structure, hreflang, internal links, sitemap, noindex and advertising boundaries.
- Checked 904 generated internal fragment links; every target route and fragment resolved.
- Requested the same 100 known routes from `https://visalang.org`; 99 content routes returned HTTP 200, `/404.html` returned HTTP 404 as intended, and all responses retained an HTML title and the shared `main-content` target. This was a route-availability audit, not evidence that the uncommitted fix is deployed.
- Reproduced a Timeline Planner defect under `Pacific/Kiritimati`: a target date of `2026-08-20` with zero buffers rendered `2026-08-19`. The cause was mixing a local-time `Date` with UTC ISO serialization.
- Changed `calculateTimeline` to parse, validate and subtract calendar dates entirely in UTC, preventing timezone-dependent day shifts and rejecting normalized invalid calendar dates.
- Added zero-buffer and multi-buffer UTC+14 regression cases to the standard-suite-loaded `tests/route-tools.test.js` contract.

Verification:

- The new focused regression failed before the fix with `2026-08-19`, then `node tests/route-tools.test.js` passed after the UTC correction.
- The original three-timezone repro passed for `UTC`, `Asia/Shanghai` and `Pacific/Kiritimati`, each returning `2026-08-20` for a zero-buffer target of `2026-08-20`.
- `npm test` passed.
- `npm run launch-check` built 100 pages, passed 44/44 checks and returned `READY`.
- `git diff --check` passed.

Boundary and independent review:

- No visa, exam, fee, eligibility, authority, source-review or other editorial claim changed; no new official source was required for this pure date-arithmetic correction.
- No commit, push, preview, deployment or publication was performed. The current public site should not be described as containing the Timeline Planner fix until a separately authorised deployment is completed and verified.
- Independent read-only review found two P2 date-boundary gaps: `Date.UTC` remapped four-digit years below 0100, and normalized invalid dates lacked a focused assertion. The implementation now uses `setUTCFullYear`, and the standard test covers both `0099-12-31` preservation and `2026-02-30` rejection.
- The same independent reviewer re-ran the corrected scope and returned `PASS` with no remaining P0/P1/P2. Expanded probes covered UTC−12, UTC, Asia/Shanghai, Pacific/Apia and UTC+14, including leap-day and month/year boundaries.

## FAN-75 Stage C controlled CSS cascade cleanup — 2026-08-17

Scope: remove only proven later-overridden rules in the Tools domain and reduce non-semantic left accents across Guide and Tools surfaces. File ownership for this slice was limited to `src/styles/global.css`, the focused FAN-75 test, its `tests/site.test.js` loader line, this log, and `docs/evidence/fan-75/`. Existing unrelated local changes were preserved.

Completed:

- Removed the earlier Tools base rules whose complete property sets were replaced by the later Open Design rules (`tool-page`, `tool-nav`, `tool-stepper`, `tool-workspace`, form/result panels, result support, support grid, and checklist); retained the few foundation-only declarations such as field minimum width and heading paragraph margin.
- Removed the earlier navigation disclosure glyph declarations because the later Header rules replace them at equal specificity.
- Replaced decorative left accents on ordinary decision-authority, direct-summary, official-source, storage, and tool-notice surfaces with neutral full borders. Semantic left accents remain on verification alerts, pending states, guide disclaimers, and compliance/risk states.
- Kept the active Tools navigation target at 44px and preserved the single stylesheet, public-service tokens, dark-mode tokens, print rules, and reduced-motion rule.
- Added `tests/fan-75-css-cascade.test.js` to lock the cascade and semantic-accent boundaries.

Verification:

- `node tests/fan-75-css-cascade.test.js` and `node tests/site.test.js` passed.
- `npm test` passed.
- `npm run launch-check` passed: 100 routes, 44 checks, 0 failures, `READY`.
- `git diff --check` passed.
- `docs/evidence/fan-75/` contains 42 before/after screenshots for English home, Chinese home, Guide Library, one mature guide, one pending guide, one tool, and one route hub at 1440, 768, and 390 widths. All 42 viewport measurements had one H1 and no horizontal overflow.
- `browser-checks.json` records seven 390px keyboard paths (84 visible focus targets) and seven successful dark-mode media checks. The Impeccable detector reports four remaining `side-tab` warnings at the intentionally retained semantic states: `.verification-alert`, `.verification-pending`, `.guide-disclaimer`, and `.compliance-line`. These warnings are reviewed exceptions within FAN-75's risk/verification boundary and are locked by the focused test; ordinary information accents were removed.

Boundary and remaining gate:

- No content claim, theme layer, dependency, commit, push, deploy, publication, production access, or external account change was made.
- FAN-76 remains the required independent review. FAN-75 must not be marked review-passed until that assigned reviewer resolves all P0/P1/P2 findings and returns final `PASS`.

## FAN-236 Stage C CSS cascade P2 correction — 2026-08-17

Scope: corrected only the three CSS completeness findings returned from the independent Stage C review: Guide Library search control sizing/appearance, semantic verification/disclaimer accents, and effective print colours. No content facts, routes, production state, deployment, publication, or commit were changed.

Completed:

- Restored a complete tokenized `.search-input input` rule in the consolidated Open Design layer: `width`, `min-height`, padding, border, radius, background, and foreground; the old broad compound Tools rule remains removed.
- Added final consolidated semantic overrides so warning verification uses `--warning`, risk verification and disclaimers use `--risk`, while summaries and ordinary authority/source/storage/tool notices retain neutral borders.
- Moved the print block after the consolidated screen rules so final computed `body` colours are white/near-black while header/footer hiding and article full-width border/shadow removal remain active.
- Upgraded `tests/fan-75-css-cascade.test.js` to inspect parsed final declarations and print-rule order rather than only selector or `border-left` presence.

Verification:

- `node tests/fan-75-css-cascade.test.js` passed.
- `npm test` passed after a clean serial retry; `npm run launch-check` passed 44/44 with `READY`; `npm run build` passed; `git diff --check` passed.
- Impeccable detector reports only the four intentionally retained semantic side accents (`.verification-alert`, `.verification-pending`, `.guide-disclaimer`, `.compliance-line`); ordinary accents remain absent.
- Existing `docs/evidence/fan-75/` contains the prior 1440/768/390 light/dark and 390 keyboard evidence set for Guide Library, mature guide, pending guide, and related surfaces. This environment has no browser binary or screenshot tool, so fresh post-fix captures were not generated in this run and remain a reviewer-environment action.

Boundary and remaining gate:

- No content-facing source review or Obsidian sync was required; this was an implementation/test-only CSS correction.
- Independent read-only reviewer approval is still required before closing the parent review loop. No commit, push, deploy, publish, or self-approval is claimed.

## FAN-73 阶段 A：指南信任与关键交互层级 — 2026-08-14

Scope: Stage A fail-closed trust slice from FAN-21 for guide library Chinese metadata consistency and critical interaction target sizing. Changes were limited to existing guide surfaces and tests, with no theme layer expansion.

Completed:

- Updated `src/pages/guides/index.astro` to normalize China family-reunion A1 guide cards through `getPrimaryDiscoveryZhGuides`, preserve real review metadata, apply the shared primary-discovery gate, and sort the eligible records by updated date.
- Updated `src/layouts/GuideLayout.astro` to remove nested emphasis from the Direct Answer section and keep one answer container plus a scan-friendly responsibility line.
- Confirmed interaction targets for primary navigation, mobile-menu summary control, filter drawer summary, and active filter chips use 44px minimum hit targets in `src/styles/global.css`.
- Refined `tests/fan-73-guide-trust.test.js` with executable reviewed, pending, and missing-status fixtures; the test proves pending/missing records are excluded from the collection used by cards, counts, and JSON-LD.
- Moved the existing `report-outdated` stack/wrap behavior to the 768px narrow-screen breakpoint so the complete correction CTA remains visible at 390px.
- Updated this task log with verification evidence and remaining risk flags.
- Revalidated in this workspace run: `npm test` passed 100%, and `npm run launch-check` passed 100%/44 checks on a clean retry (the first run saw a transient Astro `.astro/content-assets.mjs.tmp` rename ENOENT).

Verification:

- `npm test` passed with focused FAN-73 assertions and no regressions in existing contracts.
- `npm run launch-check` passed: 100 routes, 44 checks, 0 failures, `READY`.
- `git diff --check` passed.
- Affected guide-library and guide article evidence screenshots are under `/Users/fanlw/Documents/Website-Content-Hub/10-visalang.org网站维护/30-待审核/网站更新记录/2026-08-14-visalang-fan-73-evidence/`. The corrected bottom state is recorded in `guide-article-390-bottom.png` and `keyboard-navigation.json`: at a true 390 CSS px viewport Chrome exposed a 375px layout width beside its scrollbar, with `clientWidth=375`, `scrollWidth=375`, CTA bounds `41..334`, height `48`, and all overflow/visibility checks passed.

Boundary:

- No commit, push, deploy, or publication was performed.
- No fees, timeline, eligibility, outcome, or new-country/exam content decisions were added.
- Authority-first requirement and independent reviewer requirements remain unchanged and in force.
- Current controlled Chinese inventory is 8 reviewed and 0 pending. Missing-status input falls back to pending and is fail-closed; no ninth content record was fabricated to satisfy the earlier plan wording.

## Accumulated AdSense release-readiness review — 2026-07-30

Scope: audited the complete local Window A, UK B-1 through Netherlands B-6, and TestDaF P3.1-P3.3 change set for commit, push, and production deployment. This review did not treat local tests or an Agent review as human content approval or account-side AdSense/CMP evidence.

Completed:

- Fetched and identified the one remote-only `origin/main` commit, `f2c09f4`, plus its remote-only AdSense audit and operations records. The final release tree must retain that commit without force-push and be re-reviewed after integration.
- Explicitly excluded the untracked `.claude/` local settings and nested worktrees from the release scope; release staging must use an exact file list rather than `git add .`.
- Added the missing UK B-1 and TestDaF P3.1-P3.3 combined Vault review record with `status: review`, `needs_human_review: true`, `owner_decision: pending`, and `deployment_status: not_started`.
- Fixed the Finland, Italy, and Canada focused tests so each builds current source and unconditionally checks generated noindex, advertising, sitemap, and route output instead of skipping the assertions when `dist/` is absent.
- Aligned the launch-check discovery gate with the rendering contract by treating explicit `adsEligible: false` as an advertising veto even for a reviewed mature guide.

Verification:

- Finland, Italy, Canada, and Netherlands focused tests passed after the test fixes.
- `npm test` passed.
- `npm run launch-check` passed: 100 routes, 44 checks, 0 failures, `READY.`
- `git diff --check` and deployment shell syntax checks passed.
- Production preflight was read-only: current release and rollback point `cd0f73cb0f9d`, clean server `main`, Node.js `v22.23.1`, valid Nginx configuration, and sufficient disk space.

Open release gates:

- Deployment remains blocked by the repository production contract until current Google Privacy & messaging/CMP publish state, the real non-consent and withdrawal paths, Auto ads state and `/tools/*` plus `/guides/` exclusions, and current Policy Center/ads.txt evidence are recorded, or the project owner explicitly chooses a separately reviewed ad-disabled release strategy.
- Advertising-eligible high-risk pages still require a traceable real human spot-check. An independent Agent review is not recorded as that human check.
- The exact remote-integrated tree still requires the original independent reviewer to return `PASS` before push or deployment.
- No commit, push, production switch, public smoke test, AdSense review request, or account change was performed in this entry.

## AdSense window B-6 Netherlands Inburgering P0 — 2026-07-30

Scope: processed only `dutch-inburgering-a2-b1-for-integration-and-citizenship`, the noindex/advertising/sitemap contract for `/guides/category/netherlands/`, the corresponding tests and ledgers, and the review-only record. The adjacent `staatsexamen-nt2-for-work-and-higher-education` source remained byte-for-byte unchanged and bounded to the named UvA Dutch-taught bachelor's admissions task.

Completed:

- Re-opened the current IND civic-integration and naturalisation pages plus the DUO / Inburgeren exam and course-selection pages on 2026-07-30.
- Reworked the Inburgering guide into a procedure-first check that separates a named more-secure residence requirement, a naturalisation requirement, the civic-integration obligation in the Netherlands, and the separate UvA/NT2 admissions task.
- Added an IND / municipality / DUO / Mijn Inburgering-PIP responsibility table, a personal route record, an A2/B1 stop rule, common mistakes, and a terminal next action.
- Kept the authority boundary explicit: IND owns named residence requirements and the final naturalisation decision; the naturalisation municipality handles application intake and evidence review; municipalities set the Wi 2021 PIP route; DUO / Inburgeren owns obligation and exam execution information; Mijn Inburgering and the PIP hold the personal dynamic record.
- Preserved `contentStatus: verification-pending`, `sourceReviewStatus: reviewed`, and `reviewedByRole: source-review`; recorded the actual source recheck and editorial date as `2026-07-30`.
- Explicitly set the Inburgering guide and Netherlands taxonomy row to `noindex: true` and `adsEligible: false`. The Inburgering guide, read-only NT2 guide, and Netherlands category are noindex, advertising-free, absent from the generated sitemap, and terminal rather than sequential.
- Added `tests/netherlands-window-b.test.js`, its full-suite entry, and a B-6 launch-check contract. The focused test also fixes the NT2 source SHA-256 baseline so this window cannot silently modify the reference page.

Verification:

- `node tests/netherlands-window-b.test.js` — failed first on the old `2026-07-14` source-review date, then passed after the bounded implementation.
- `npm test` — passed, including the Netherlands B-6 focused contract and byte-for-byte NT2 guard.
- `git diff --check` — passed with no output before the build gate.
- `npm run build` — passed; 100 pages generated.
- `npm run launch-check` — passed; 100 routes, 44 checks, 0 failures, `READY.`
- Independent review under the repository's separate-agent rule found and closed two focused-test P2s. The first specification review found that generated-page assertions could be skipped when `dist/` was absent. A fresh standards reviewer then found that merely requiring ignored `dist/` still made the focused command fail on a clean checkout. The focused test now builds current source itself before requiring the sitemap and three Netherlands HTML outputs, then checks noindex, advertising, sitemap and terminal-route behavior. Focused/full/build/launch gates passed again, and the original fresh Standards and Spec reviewers both returned `PASS` with no remaining P0/P1/P2.

Boundary:

- No universal A2/B1 rule, deadline, residence period, cohort, learning route, component list, exemption, dispensation, evidence-acceptance conclusion, residence result, naturalisation result, UvA admission result, official endorsement, or human-review claim was added.
- No form, payment, email collection, commercial function, account setting, commit, push, merge, deployment, or production verification was performed.
- These local content, noindex, sitemap, advertising and test results reduce thin/pending exposure; they do not prove public deployment, AdSense account state, review acceptance, or approval.

## AdSense window B-5 Canada cluster remediation — 2026-07-30

Scope: processed only the Canada country cluster from window B: `tef-canada-immigration`, `tcf-canada-vs-tef`, and `/guides/category/canada/`. The reviewed scope is Express Entry French-language testing; this window did not establish Canadian citizenship evidence, another immigration programme, individual points, invitation, eligibility, permanent-residence outcome, account-side AdSense/CMP/Search Console state, or production state.

Completed:

- Re-opened IRCC's current Express Entry language-test page, the current TEF Canada candidate and registration pages from Le français des affaires, and the current TCF Canada page from France Éducation international.
- Kept IRCC as the authority for the exact Express Entry programme, accepted test, result-validity instruction and test-specific conversion. Kept the exam owners and selected official centres responsible for product and local-execution facts.
- Reworked `tef-canada-immigration` into a programme-first requirement check with an IRCC record covering the programme, language role, exact accepted product, matching table, validity checkpoints and unresolved profile/result questions.
- Reworked `tcf-canada-vs-tef` into a product comparison after the IRCC record is complete, with authority/product separation, a non-ranking comparison, separate test records, stop conditions, common mistakes and a terminal next action.
- Removed citizenship from the requirement page's title and description and explicitly stated that the two-page cluster does not review citizenship evidence or non-Express Entry programmes.
- Preserved both guides as `contentStatus: verification-pending` and `sourceReviewStatus: reviewed`; recorded the real source recheck and editorial date as `2026-07-30` without inventing a human reviewer or promoting maturity.
- Marked the Canada category explicitly noindex while retaining `adsEligible: false`; both guides and the category remain outside primary discovery, advertising runtime and the generated sitemap.
- Added a focused Canada B-5 test and launch-check route assertion, updated the five-country review date, content ledger and rolling window B decision table. Netherlands Inburgering is the next proposed P0 content window.

Verification:

- `node tests/canada-window-b.test.js` — failed first on the old `2026-07-21` source-review date, then exposed two assertion/content wording mismatches, and passed after the bounded implementation and test wording correction.
- `node tests/p0-five-countries.test.js` — passed after recording Canada's actual source-recheck date.
- `npm run build` — passed; 100 pages generated.
- `npm test` — passed, including the focused Canada B-5 contract.
- `npm run launch-check` — passed; 100 routes, 43 checks, 0 failures, `READY.`
- `git diff --check` — passed; the new untracked Canada test, decision record and Obsidian review record also passed trailing-whitespace checks.
- Independent standards and specification reviews found only two documentation-closeout gaps: the rolling decision overview still ended at B-4, and this task log plus the Obsidian record still described final gates as pending. The overview and result records were corrected; both final read-only rechecks returned `PASS`.

Boundary:

- No fixed fee, test date, seat availability, result timing, raw-score equivalence table, individual score/points calculation, invitation, eligibility, application outcome, provider ranking, official endorsement or human-review claim was added.
- The current sources support bounded Express Entry accepted-test/programme paths and exam-product facts only. Applicant profile facts, historical-result notices and current local execution remain reader-side official checks.
- No form, payment, email collection, new commercial function, account setting, commit, push, merge, deployment or production verification was performed.
- These local content, noindex, sitemap, advertising and test results reduce thin/pending exposure; they do not prove public deployment, AdSense account state, review acceptance or approval.

## AdSense window B-4 Italy cluster remediation and fail-closed reconciliation — 2026-07-30

Scope: reconciled the inherited global discovery policy and processed only the Italy country cluster from window B: `cils-b1-cittadinanza-for-italian-citizenship`, `cils-vs-celi-vs-plida-for-italian-citizenship`, and `/guides/category/italy/`. No other country-guide body, account-side AdSense/CMP/Search Console setting, commit, push, deployment, or production state was changed in this window.

Completed:

- Adopted the inherited fail-closed rule as the single discovery policy: only guides that are both `sourceReviewStatus: reviewed` and `contentStatus: complete-route` or `core-route` may enter primary library/category discovery, the sitemap, or advertising runtime.
- Applied that rule at render time, in the Guide Library and category listings, during sitemap post-processing, and in launch checks. Starter and pending guides remain directly reachable for review but render noindex, do not load ads, and are omitted from the generated sitemap.
- Re-opened the current Italian Interior Ministry application guidance, Foreign Ministry citizenship guidance, CILS B1 product page, CELI calendar, and PLIDA product/calendar entry. Kept the competent Interior Ministry office, prefecture, or consulate as the dossier decision owner and the exam bodies as product/local-execution owners.
- Reworked the CILS guide into a citizenship-basis and evidence-requirement check before product selection. Reworked the comparison guide into a CILS/CELI/PLIDA choice record only after the authority requirement is confirmed.
- Added distinct authority records, requirement-to-comparison handoff, product comparison criteria, stop conditions, common mistakes, and concrete terminal next actions.
- Preserved both guides as `contentStatus: verification-pending` and `sourceReviewStatus: reviewed`; recorded the real source recheck and editorial date as `2026-07-30` without inventing a human reviewer or promoting content maturity.
- Marked the Italy category explicitly noindex while retaining `adsEligible: false`; both Italy guides and the category are absent from the generated sitemap and advertising runtime under the global gate.
- Updated the content ledger and window B decision table. Canada comparison is the next proposed P0 content window.

Verification:

- `node tests/italy-window-b.test.js` — failed first on the old review date, then passed after the bounded source and content update.
- `npm run build` — passed; 100 pages generated.
- `npm test` — passed after the reviewed category-boundary copy and its source assertion were aligned.
- `npm run launch-check` — passed; 100 routes, 42 checks, 0 failures, `READY.`
- `git diff --check` — passed; the new untracked Italy test, decision record and Obsidian review record also passed trailing-whitespace checks.
- Independent standards and specification reviews initially found one decision-ledger boundary conflict, one misleading category empty state and one category-noindex test blind spot. All were corrected; both final read-only rechecks returned `PASS`.

Boundary:

- No fixed fee, test date, seat availability, result timing, individual citizenship eligibility, exemption decision, evidence-acceptance guarantee, provider ranking, official endorsement, or human-review claim was added.
- The current official pages support bounded process and product facts only; the responsible office and selected authorised centre remain the current sources for an individual case and local execution.
- No form, payment, email collection, new commercial function, account setting, commit, push, merge, deployment, or production verification was performed.
- These local content, noindex, sitemap, advertising and test results reduce thin/pending exposure; they do not prove public deployment, AdSense account state, review acceptance, or approval.

## AdSense window B-3 Finland cluster consolidation — 2026-07-29

Scope: processed only the Finland country cluster from window B: `yki-finnish-citizenship`, the retired `yki-vs-other-finland-options` route, and `/guides/category/finland/`. This window did not change Italy, Canada, Netherlands, Spain, France, telc, TestDaF, commercial pages, account-side AdSense/CMP/Search Console settings, or production state.

Completed:

- Re-opened Migri's current language-skills and YKI-combination pages and the Finnish National Agency for Education's current YKI overview and selection pages. Kept Migri as the citizenship evidence authority and OPH as the YKI product owner.
- Confirmed that the comparison page did not have enough independent value to remain separate. Merged its useful evidence-comparison task into `yki-finnish-citizenship` and removed the duplicate Markdown source.
- Expanded the retained guide with a Migri-first evidence-path record, non-YKI evidence boundaries, the current oral-plus-written YKI combination check, authority/product separation, pre-registration checks, common mistakes and a concrete next action.
- Preserved the retained guide as `contentStatus: verification-pending` and `sourceReviewStatus: reviewed`; updated the real editorial and source-recheck dates to `2026-07-29` without inventing a human reviewer or promoting content maturity.
- Because the retained guide remains pending, marked it noindex, disabled its AdSense runtime and excluded it from the generated sitemap.
- Added direct 301 redirects for both `/guides/yki-vs-other-finland-options/` and its legacy `.html` URL in the static redirect manifest and production Nginx configuration, with production smoke-check entries.
- Removed both Finland URLs from the legacy sitemap and changed the two legacy HTML fallbacks to noindex with canonicals pointing to the consolidated current route.
- Marked the Finland category as noindex while preserving `adsEligible: false`, and excluded `/guides/category/finland/` from the generated sitemap.
- Updated the content ledger and window B decision table so Finland is recorded as B-3 complete and Italy becomes the next proposed P0 content window.

Verification:

- `node tests/finland-window-b.test.js` — failed first because the duplicate source still existed, then passed after consolidation and a fresh build.
- `node tests/p0-five-countries.test.js` — passed.
- `node tests/content-integrity.test.js` — passed.
- `node tests/deploy.test.js` — passed.
- `node tests/source-review-render.test.js` — passed after the guide-count assertion was updated from the pre-consolidation inventory.
- `node tests/adsense-risk-exposure.test.js` — passed.
- `npm test` — passed.
- `npm run build` — passed; 100 pages generated.
- `npm run launch-check` — passed; 100 routes, 41 checks, 0 failures, `READY.`
- `git diff --check` — passed after documentation and review-record updates; the new untracked decision/test/review records also passed no-index whitespace checks.

Boundary:

- No fixed fee, test date, seat availability, result timing, citizenship eligibility conclusion, exception decision, evidence-acceptance guarantee, official endorsement or human-review claim was added.
- The retired source remains recoverable from Git history; the old public URL is preserved through a 301 redirect.
- No form, payment, email collection, commercial function, new ad placement, account setting, commit, push or deployment was added.
- These local content, redirect, noindex, sitemap and test results reduce duplicate/thin-content exposure; they do not prove public deployment, AdSense account state or approval.

## AdSense window B-2 Portugal cluster remediation — 2026-07-29

Scope: processed only the Portugal country cluster from window B: `portuguese-language-for-golden-visa-and-citizenship`, `portuguese-ciple-a2-for-citizenship-and-residence`, and `/guides/category/portugal/`. This window did not change Finland, Italy, Canada, Netherlands, Spain, France, telc, TestDaF, commercial pages, account-side AdSense/CMP/Search Console settings, or production state.

Completed:

- Re-opened the current Justiça Portuguese-nationality overview and profile guide. The CAPLE CIPLE direct fetch returned 502 in the research tool, while the current CAPLE official-domain result crawled the previous day exposed the A2 product and exam-entry content. Kept Justiça/IRN as the nationality-procedure authority and CAPLE or the selected authorised centre as the exam-product/local-execution source.
- Reworked the residence-route guide into a nationality-profile requirement check with an authority record, Golden Visa boundary, unresolved-evidence path, common mistakes and a controlled handoff to CIPLE.
- Reworked the CIPLE guide into product verification after the requirement check, with an authority/product responsibility table, pre-booking record, common mistakes and a terminal next action.
- Preserved both guides as `contentStatus: verification-pending` and `sourceReviewStatus: reviewed`; updated the real source-check and editorial dates to `2026-07-29` without inventing a human reviewer or promoting content maturity.
- Marked the Portugal country category as noindex while preserving `adsEligible: false`, and excluded `/guides/category/portugal/` from the generated sitemap. The six remaining unprocessed thin country categories were not changed.
- Updated the window B decision table so Portugal is recorded as B-2 complete and Finland becomes the next proposed content window.

Verification:

- `node tests/content-integrity.test.js` — failed first because the two pages did not name distinct requirement/product tasks, then passed after the bounded rewrites.
- `node tests/adsense-risk-exposure.test.js` — failed first because the Portugal category was still indexable and present in the sitemap, then passed after the category policy change.
- `node tests/source-review-render.test.js` — passed after rebuilding the generated Portugal pages and checking pending status, current source date, task labels and terminal routing.
- `node tests/p0-five-countries.test.js` — failed on the historical shared review-date snapshot, then passed after recording Portugal's actual `2026-07-29` source-check date without changing the other four countries.
- `npm test` — passed.
- `npm run build` — passed; 101 pages generated.
- `npm run launch-check` — passed; 101 routes, 41 checks, 0 failures, `READY.`
- `git diff --check` — run after documentation updates as the final whitespace gate.

Boundary:

- No fixed fee, test date, seat availability, result timing, residence calculation, accepted-evidence conclusion, exception, nationality outcome, official endorsement or human-review claim was added.
- CAPLE should be opened once in a normal human browser before publication because the direct research-tool fetch returned 502 even though the current official-domain result was available.
- No form, payment, email collection, commercial function, new ad placement, account setting, commit, push or deployment was added.
- These local content, noindex, sitemap and test results reduce explicit low-value-content exposure; they do not prove public deployment, AdSense account state or approval.

## AdSense window B-1 UK cluster remediation — 2026-07-29

Scope: processed only the UK country cluster from window B: `ielts-ukvi-uk-visa`, `languagecert-selt-uk-visa`, and `/guides/category/uk/`. This window did not change Portugal, Finland, Italy, Canada, Netherlands, Spain, France, telc, TestDaF, commercial pages, account-side AdSense/CMP/Search Console settings, or production state.

Completed:

- Reworked the IELTS UKVI guide into a route-first requirement check that starts from Home Office / GOV.UK, separates final decision authority from IELTS product facts, and points readers to LanguageCert only after the route requirement is known.
- Reworked the LanguageCert SELT guide into a provider-choice / SELT product verification page for readers who have already confirmed the route requirement, while keeping it terminal in the UK sequence.
- Kept both UK guides `contentStatus: verification-pending`, `sourceReviewStatus: reviewed`, `sourceReviewedAt: 2026-07-21`, and `reviewedByRole: source-review`; this window did not use status fields to imply maturity.
- Marked the UK country category as noindex while preserving `adsEligible: false`, and excluded `/guides/category/uk/` from the generated sitemap. Non-UK thin country categories remain unchanged in this window.
- Added focused tests and launch-check assertions for UK category noindex/sitemap exclusion, Germany A1 category control behavior, UK guide task differentiation, pending-status rendering, and avoidance of fixed dynamic facts or outcome promises.

Verification:

- `node tests/content-integrity.test.js` — failed first on an overbroad outcome-promise regex that matched boundary wording, then passed after narrowing the assertion.
- `node tests/source-review-render.test.js` — passed after the UK render assertions were added.
- `node tests/adsense-risk-exposure.test.js` — passed.
- `npm test` — passed.
- `npm run build` — passed; 101 pages generated.
- `npm run launch-check` — passed; 101 routes, 41 checks, 0 failures, `READY.`
- `git diff --check` — passed with no output.
- Follow-up review on 2026-07-30 identified that the generated-output risk test could read a stale `dist/`; `tests/adsense-risk-exposure.test.js` now builds current source before asserting HTML and sitemap behavior. A fresh whole-worktree recheck then passed the three focused tests, `npm test`, `npm run build` (100 pages after later window B consolidation), `npm run launch-check` (43 checks, 0 failures, `READY.`), and `git diff --check`.

Boundary:

- No fixed fees, test dates, seat availability, result timing, visa/citizenship outcome, official endorsement, human reviewer identity, commercial function, form, payment, email collection, account setting, commit, push, or deployment was added.
- This local content and SEO-risk reduction can reduce obvious AdSense low-value-content exposure, but it cannot guarantee AdSense approval.

## AdSense P0 window A risk-exposure stop — 2026-07-27

Scope: stop advertising and index exposure on the page types identified by the 2026-07-27 sitewide AdSense audit. This window did not change guide facts, pending-guide status, content depth, authorship/reviewer records, TestDaF/telc content, dependencies, external accounts, or production state.

Completed:

- Disabled the AdSense runtime on the 404 page and the five existing noindex legal/policy pages.
- Disabled the AdSense runtime on the eight current two-guide country category pages: UK, Canada, Italy, Spain, France, Finland, Netherlands, and Portugal. The four larger Germany exam categories remain ad-eligible in this window.
- Made the shared commercial placeholder shell noindex and advertising-free for Pricing, Partners, Route Review, A1 Family Reunion Pack, and A1 Practice Pack.
- Excluded those five commercial placeholder routes from the generated sitemap while keeping them generated as honest status pages.
- Kept Pricing and Partners in the existing secondary About-menu/footer locations; neither is a primary top-level navigation item.
- Added a focused generated-output test and launch-check assertions for the advertising, noindex, and sitemap contracts.

Verification:

- `node tests/adsense-risk-exposure.test.js` — failed first on the existing 404 AdSense loader, then passed after the minimal implementation.
- `npm test` — passed.
- `npm run build` — passed; 101 pages generated.
- `npm run launch-check` — passed; 101 routes, 39 checks, 0 failures, `READY.`

Boundary:

- No guide Markdown, source-review metadata, content ledger, author/reviewer model, telc/TestDaF content, dependency, account-side Auto ads/CMP/Policy Center setting, commit, push, deployment, server, DNS, or TLS state was changed.
- Source and generated-output checks prove only the local page contract. They do not prove current AdSense account exclusions, live public behavior, policy approval, or future AdSense acceptance.

## AdSense low-value content remediation — local implementation — 2026-07-26

Scope: use Google first-party policy evidence and the repository's controlled content states to reduce provable AdSense inventory and low-maturity discovery risks. This window ran in the isolated `codex/adsense-low-value-remediation` worktree from baseline `0463c3df2fae64485e3baa634f675b7da0bb1896`; it did not touch the original dirty TestDaF worktree.

Completed:

- Recorded the official-source audit in `docs/ADSENSE_LOW_VALUE_CONTENT_REVIEW_2026-07-26.md`. Google provides no guaranteed article-count, word-count, traffic or site-age threshold, so the remediation does not use bulk word expansion.
- Changed advertising to deny-by-default and explicitly enabled it only for the homepage, the Germany A1/B1 route hubs, and 30 source-reviewed complete/core English guides.
- Removed the AdSense loader from 404, tools, directories, legal/trust pages, Chinese pages, commercial status pages and 24 lower-maturity English guides.
- Withheld 8 `starter-overview` and 16 `verification-pending` English guides from the primary Guide Library, sitemap and advertising while preserving their old direct URLs with `noindex,follow`.
- Added a 24-row page-specific disposition record: each page keeps its distinct task and direct URL, but remains withheld until its recorded source, authority, comparison, human-acceptance or substantive decision-help gap is closed. This is a triage decision, not a claim that content deepening is complete.
- Withheld 10 empty lower-maturity category routes from sitemap and advertising; kept Germany A1/B1 category routes indexable but advertising-free.
- Changed Study and Work navigation entries to Route Finder instead of promoting incomplete TestDaF and telc pages.
- Updated the sitemap postbuild step and launch checks so no noindex route can remain in sitemap or load AdSense.
- Kept the available Pricing page indexable but explicitly ad-free after a page-specific review: its purpose is commercial status/navigation, and advertising would blur that task.

Local verification:

- `npm test` — passed.
- `npm run build` — passed; 101 pages generated.
- `npm run launch-check` — passed; 39 checks, 0 failures, `READY.`
- Generated guide library — 38 cards.
- Generated AdSense loader scope — 33 pages.
- Generated `noindex,follow` scope — 44 pages.
- Generated sitemap — 57 URLs and no noindex canonical.

Boundary:

- Local source and build only. No push, deployment, server access, AdSense account setting, Search Console check, CMP/TCF verification or review request was performed.
- `ads.txt` remains authorised in the supplied AdSense screenshot, but this does not establish content approval.
- Push/deployment requires separate owner authorization after review. `Request review` requires a second action-time confirmation after production and account-side checks.

## Germany TestDaF P3.3 cluster connectivity and pre-release gate — 2026-07-26

Scope: connect the four existing TestDaF guides in their controlled decision order, align generated next-guide navigation, and complete the TestDaF cluster regression and local pre-release gate. This window did not re-run P3.1/P3.2 source review, change their bounded factual statements, enter telc or dependencies, or create a commit, push or deployment.

Completed:

- Replaced the circular TestDaF next-guide graph with the terminal sequence programme requirement -> TestDaF scoring -> accepted-proof comparison -> official preparation.
- Reclassified only the admissions entry from `choice` to `requirement`; retained scoring/comparison as `choice`, preparation as `local-execution`, and all four guides as `contentStatus: starter-overview`.
- Removed each primary next target from that page's supporting links and kept the remaining same-route links in decision order. All related slugs resolve to one of the existing four guides.
- Added `germany-testdaf` to the existing explicit-route renderer so generated pages show the controlled Next guide, no alphabetic Previous guide, and no Next guide on the terminal preparation page.
- Expanded `tests/germany-testdaf-cluster.test.js` to cover the four-guide scope, 2026-07-23 reviewed metadata, official-source sections, reader-side verification actions, exact route/supporting mappings, resolved related links, cycle-free termination, and explicit generated-page routing.
- Updated the TestDaF audit and content ledger without changing the reviewed English source count: reviewed 50, pending 4.

Verification:

- `node tests/germany-testdaf-cluster.test.js` — passed after the expected RED failure and minimal route implementation.
- `node tests/content-integrity.test.js` — passed.
- `node tests/source-review-render.test.js` — passed.
- Generated-output inspection confirmed the controlled TestDaF Next targets, no alphabetic Previous targets, and a terminal preparation page.
- `npm test` — passed.
- `git diff --check` — passed with no output.
- `npm run build` — passed; 101 pages generated.
- `npm run launch-check` — passed; 101 routes, 37 checks, 0 failures, `READY.`

Boundary:

- No target university/programme, selected centre, DSH-offering university, local mission, candidate timeline, or applicant decision was supplied or inferred. The existing reader-side checks remain required.
- No fee, date, deadline, result timing, eligibility, exemption, certificate-acceptance guarantee, admission result, visa result, or outcome statement was added.
- No telc content, dependency file, protected prompt, external Vault, commit, push, deployment, server, DNS, TLS, CMP, advertising, analytics, form, payment or email-delivery state was changed.

## Germany TestDaF P3.2 source review — 2026-07-23

Scope: recheck and complete the bounded source review for `testdaf-vs-goethe-dsh` and `testdaf-preparation-and-practice` only. This window did not enter P3.3, change TestDaF related links, touch telc or dependencies, or create a commit, push or deployment.

Completed:

- Opened the current final TestDaF digital-structure, digital-preparation and paper-based-preparation pages and the Goethe-Institut German-examinations page.
- Preserved the comparison guide's programme-first structure. Limited provider facts to the cited digital TestDaF structure and Goethe-Zertifikat C1 module descriptions, added a five-item evidence record, and kept all DSH product and local-procedure claims unresolved because no DSH-offering university was supplied.
- Distinguished official digital tutorials, example tasks and original material from official paper-based model tests, tutorials, tips and original material. Labelled the adjustable practice loop as VisaLang editorial advice and rejected fixed-duration, readiness, score, registration and admissions conclusions.
- Recorded `sourceReviewStatus: reviewed`, `sourceReviewedAt: 2026-07-23`, `reviewedByRole: source-review` and bounded authority/exam-owner prompts for the two P3.2 guides. Both remain `contentStatus: starter-overview`.
- Updated the TestDaF audit and content ledger for these two guides and the controlled English source-review count. Updated only the existing TestDaF date/status assertions; related-link assertions were not changed.

Verification:

- `node tests/germany-testdaf-cluster.test.js` — passed.
- `node tests/content-integrity.test.js` — passed.
- `node tests/source-review-render.test.js` — passed.
- `npm test` — passed.
- `git diff --check` — passed with no output.
- `npm run build` — passed; 101 pages generated.
- `npm run launch-check` — passed; 101 routes, 37 checks, 0 failures, `READY.`

Boundary:

- No target programme, selected TestDaF or Goethe centre, DSH-offering university, TestDaF format or candidate timeline was supplied. Acceptance, result pattern, DSH details, centre terms, readiness and outcomes therefore remain reader-specific checks rather than published conclusions.
- No P3.3 related-link work, telc content, dependency update, commit, push, deployment, server access or third-party account change was performed.

## Germany TestDaF P3.1 source review — 2026-07-23

Scope: recheck and complete the bounded source review for `testdaf-germany-university-admissions` and `testdaf-levels-and-scoring` only. This window did not enter the TestDaF comparison/preparation batch, change TestDaF related links, touch telc or dependencies, or create a commit, push or deployment.

Completed:

- Opened the current final uni-assist language-certificate page and the TestDaF university, digital-scoring and paper-based-scoring pages. A direct DAAD source check returned HTTP 200 for the requirements overview.
- Preserved the existing programme-first structure instead of rewriting both guides. Recorded the current uni-assist certificate-list statement and TestDaF/RO-DT TDN 4 framework, then separated those general facts from one programme's differentiated result, document, stage and submission requirements. Added a dated programme-evidence record instead of inventing a university example.
- Retained the official digital 0–20 component ranges and paper-based test-set adjustment boundary. Added an explicit warning against homemade component averages, unsupported CEFR conversion and using a provider result as an admissions decision.
- Recorded `sourceReviewStatus: reviewed`, `sourceReviewedAt: 2026-07-23`, `reviewedByRole: source-review` and bounded authority/exam-owner prompts for the two P3.1 guides. Both remain `contentStatus: starter-overview`.
- Updated the TestDaF audit and content ledger for these two guides only. `testdaf-vs-goethe-dsh` and `testdaf-preparation-and-practice` remain dated 2026-07-13 with source review pending.
- With explicit project-owner authorization, narrowed the existing TestDaF regression assertions so the two P3.1 guides require the new review date/status while the two P3.2 guides remain locked to their pending baseline. Related-link assertions were not changed.

Verification:

- `node tests/germany-testdaf-cluster.test.js` — passed.
- `node tests/content-integrity.test.js` — passed.
- `node tests/source-review-render.test.js` — passed.
- `npm test` — passed.
- `git diff --check` — passed with no output.
- `npm run build` — passed; 101 pages generated.
- `npm run launch-check` — passed; 101 routes, 37 checks, 0 failures, `READY.`

Boundary:

- The page-level source review covers only the bounded public statements. No target university or programme was supplied, so current accepted proof, result pattern, application stage, materials, route, deadline and admission decision remain programme-specific checks.
- No P3.2 or P3.3 related-link work, telc content, dependency update, commit, push, deployment, server access or third-party account change was performed.

## Germany A1/B1 support-page production release — 2026-07-22

Scope: publish the already reviewed Germany A1/B1 support-page work together with the current local `main` baseline, using the repository's commit-addressed immutable release workflow. The two prompt-file changes that existed before the review window remained uncommitted and were not included.

Release result:

- Created and pushed application commit `cd0f73cb0f9d4662d73369bb757bdaa02856eb50` to `origin/main`.
- Production source fast-forwarded from `d2ea2202668a5e31e6c032f376332874a28a57cd` to the target commit.
- Server `npm test` and `npm run launch-check` passed; 101 pages were built, all 37 checks passed, and the output ended in `READY.`
- Nginx configuration testing passed and `current` switched atomically to `/var/www/visalang.org/releases/cd0f73cb0f9d`.
- `/var/www/visalang.org/releases/d2ea2202668a` remains the immediate verified rollback release.
- Standard public smoke passed for the homepage, Guide Library, robots, sitemap, canonical redirects, AdSense source contract, ad-free routes, `ads.txt` and security headers.
- Public markers passed for the A1 centre-specific ID wording, B1 listening category boundary, B1 speaking sequence, B1 writing dimensions and the 2026-07-22 review date.

Explicit release boundary:

- The project owner instructed the content release to continue while skipping current account-side AdSense/CMP verification. No third-party account was accessed or modified.
- CMP choices, Auto ads placement, Policy Center state, CLS and clean-profile browser network behavior remain unverified in this release.
- Server installation and npm's official audit endpoint reported 1 moderate and 2 high advisories affecting Astro, sharp and svgo. Dependency manifests were unchanged from the rollback release, so the risks predated this content deployment; remediation is deferred to a separately reviewed dependency window.
- No DNS, TLS, analytics, form, payment, email-delivery, CMP or advertising-account configuration was changed. No rollback was triggered.

## Germany A1/B1 support-page source review — 2026-07-22

Scope: review and safely bound the claims, sources, metadata and next-step routes of the ten Germany A1 and five Germany B1 preparation support pages. This window did not include a commit, push, deployment, server access or third-party account change.

Completed:

- Opened current first-party BAMF, Federal Foreign Office and Goethe sources and saved the claim-level review in `docs/GERMANY_A1_B1_SUPPORT_SOURCE_REVIEW_2026-07-22.md`.
- Set all 15 pages to `sourceReviewStatus: reviewed` only after unsupported public values were deleted or changed to explicit competent-authority or selected-centre verification actions.
- Separated immigration acceptance from exam-owner facts and separated global exam information from local date, fee, seat, ID, cancellation, result and certificate procedures.
- Corrected the B1 speaking Part 1–3 sequence and writing assessment dimensions; removed unsupported listening-frequency/prediction language and universal ID wording.
- Removed repeated route/CTA templates, limited supporting links, corrected the A1 pre-booking and B1 support-page stages, and closed next-step loops, regressions and duplicates.
- Updated `docs/CONTENT_MAP.md` and added focused source-status, route, rendered-metadata, sitemap/date and local-ID regression coverage.
- Completed independent standards and specification review; the final review reported no blocking findings.

Verification:

- `node tests/germany-a1-cluster.test.js` — passed.
- `node tests/germany-b1-cluster.test.js` — passed.
- `node tests/content-integrity.test.js` — passed.
- `node tests/source-review-render.test.js` — passed.
- `node tests/site.test.js` — passed.
- `npm test` — passed.
- `git diff --check` — passed with no output.
- `npm run build` — passed; 101 pages generated.
- `npm run launch-check` — passed; 101 routes, 37 checks, 0 failures, `READY.`

Boundary:

- `reviewed` covers only the bounded claims and dispositions recorded in the matrix. It does not decide an individual's route, exception, accepted proof, centre, date, fee, ID, cancellation, result timing or certificate delivery.
- The local `READY.` result is build/readiness evidence, not production publication evidence.
- No commit, push, deployment, server access or third-party account change was performed.

## P0 five-country source review and route closure — 2026-07-21

Scope: re-open current first-party sources for the ten UK, Canada, Italy, Portugal and Finland P0 guides; narrow unsupported claims; replace bidirectional next-guide loops with five requirement-to-choice routes; and update controlled source metadata. No new page, maturity promotion, dependency, deployment, push or third-party account change was included.

Completed:

- Saved a claim-level source matrix in `docs/CONTENT_MAP.md`, including final URLs, locators, support limits, stopped inferences and reader verification actions.
- Re-reviewed all ten pages on 2026-07-21 while retaining `contentStatus: verification-pending` and applicant/local-execution boundaries.
- Narrowed Canada to Express Entry, Italy to the cited citizenship procedures, Portugal to nationality-procedure selection plus CAPLE product facts, Finland to Migri citizenship evidence, and UK to the current UKVI SELT list and route-specific check.
- Removed the five direct bidirectional next-guide loops. Each requirement page now points to its choice page; every choice page is terminal.
- Removed cross-country Finland supporting links and kept supporting links separate from each primary next step.
- Replaced repeated internal review-template wording with page-specific reader actions and updated `updatedDate` only for the ten materially rewritten guides.
- Added focused source-status, route-integrity and generated-HTML regression coverage.

Verification:

- `node tests/p0-five-countries.test.js` — passed.
- `node tests/content-integrity.test.js` — passed.
- `node tests/germany-a1-cluster.test.js` — passed.
- `node tests/source-review-render.test.js` — passed.
- `node tests/site.test.js` and `npm test` — passed.
- `git diff --check` — passed with no output.
- `npm run launch-check` — passed; 101 routes, 37 checks, 0 failures, `READY`.

Boundary:

- `sourceReviewStatus: reviewed` covers only the bounded facts retained in each final page. It does not confirm an applicant's eligibility, exception, certificate acceptance, local centre, date, fee, identity rule, cancellation, result process or outcome.
- No commit, push, deployment, server access or third-party account change is part of this content window.

## Homepage and stylesheet consolidation closure — 2026-07-21

Scope: finish and verify the existing local homepage/CSS consolidation before starting the separately scoped five-country content review. No content-fact, dependency, deployment, push, or public-site change was included.

Completed:

- Removed the duplicate desktop Route Finder header CTA while retaining the homepage primary route entry and mobile navigation.
- Moved the homepage-only body styling to the explicit `home-view` body class and tightened the homepage trust statement.
- Consolidated the remaining active styles into `src/styles/global.css` and removed the inactive `src/styles/open-design.css` migration reference.
- Updated the style architecture and regression assertions to match the one-stylesheet source of truth.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 101 pages generated.
- `npm run launch-check` — passed; 101 routes, 37 checks, 0 failures, `READY`.
- No deployment or public-site verification was performed.

## Editorial UI redesign and semantic navigation — 2026-07-18

Scope: execute the approved UI redesign prompt locally. No advertising/CMP, Privacy/Cookie, deployment configuration, content-fact, dependency, public URL, commit, push or deployment change was authorised.

Completed:

- Verified the existing Related Guides scope gate, Exam Comparison shared verification row, and English/Chinese Article JSON-LD Organization author fixes with focused and aggregate tests.
- Replaced the homepage Route Console class and card-heavy principles with a static Germany A1 route entry, editorial statement, restrained numbered stages and compact trust boundary.
- Kept primary actions on the official blue token, removed the active warm yellow glow, retained warning colour for verification-pending, and confirmed the teal starter-overview treatment.
- Reused the existing sans/serif font tokens with Chinese fallbacks; no external or self-hosted font asset was added.
- Unified desktop and mobile `aria-current`: exact links use `page`, parent sections use `location`, and non-current links omit the attribute.
- Removed only proven-zero active homepage selectors for the old console, signal cards, result actions and earlier journey/atlas/practice surfaces.
- Added production-output assertions for the homepage, Spain authority boundary and Related Guides exclusion, Article JSON-LD, Exam Comparison bundle and navigation semantics.

Files changed in this window:

- `src/pages/index.astro`
- `src/styles/global.css`
- `src/components/GlobalHeader.astro`
- `src/components/MobileNavigation.astro`
- `src/lib/navigation-current.ts`
- `tests/site.test.js`
- `docs/STYLE_ARCHITECTURE.md`
- `docs/TASK_LOG.md`
- `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md`

Verification:

- Stage 1 baseline: `node tests/content-integrity.test.js`, `npm test`, `npm run build`, `npm run launch-check`, and `git diff --check` passed.
- Stage 2/3: focused aggregate tests, CSS-cleanup build and launch check passed.
- Final results are recorded at handoff after the last complete gate.

Deferred and boundaries:

- Self-hosted fonts are deferred because no licensed WOFF2 source asset was available; stable local/system stacks are active.
- Real-browser screenshots and keyboard/network evidence were not collected in this source window.
- AdSense remains present under the existing `enableAds` route contract. No CMP, policy, CSP, third-party permission or advertising behavior was changed here.
- No production deployment or production smoke check was run. A later deployment review must start from a clean, explicitly authorised window.

## Production trust stabilization local implementation — 2026-07-18

Scope: merge the production-trust branch into the primary local checkout and complete the approved local source and deployment-safety contract. No production server, DNS, TLS, Nginx reload, public smoke test, or rollback was executed.

Completed:

- Preserved and committed the existing guide-navigation, homepage, comparison-tool, CSS, test, and documentation changes before merging.
- Restored the approved AdSense publisher loader and `public/ads.txt` on ad-eligible content pages while keeping all tool routes and the searchable Guide Library index advertising-free.
- Updated Privacy and Cookie disclosures, maturity labels, Route Finder URL minimisation, neutral handoffs, `visalang.org` Nginx configuration, executable legacy redirects, immutable release deployment, explicit release-ID rollback, and prepared production smoke checks.
- Reconciled current consent and operations summaries while retaining dated `flowlight.me` and no-ad records as historical evidence only.
- Included the two VisaLang-specific migration handoff documents; excluded the unrelated Claude skill-configuration plan and all `graphify-out/` generated artifacts.

Verification:

- `bash -n deploy/deploy.sh deploy/rollback.sh deploy/smoke-test.sh deploy/server-init.sh` — passed.
- `node tests/deploy.test.js` — passed.
- `npm test` — passed.
- `npm run build` — passed; 98 pages generated.
- `npm run launch-check` — passed; 98 routes, 31 checks, 0 failures, `READY`.
- `git diff --check` — passed.

Production boundary:

- Google account configuration is user-confirmed input; current account exports, Auto ads exclusions, Policy Center state, CMP/browser paths and ads.txt account status were not independently collected.
- DNS, TLS, installed Nginx, live redirects/headers, advertising placement, CLS, public smoke checks and rollback remain unverified.
- Raw HAR files, screenshots, cookies, advertising identifiers and consent strings are not stored in Git or public documentation.
- A separately authorised account/browser/production-verification window is required before deployment or a live compliance claim.

## Content execution ledger and Spain source pilot — 2026-07-16

Scope: upgrade the existing content map into an execution ledger and run a narrow official-source pilot for the two Spain citizenship guides. No new route/page, UI, tool, commercial flow, analytics, advertising, deployment configuration, commit, push, or deployment was included.

Completed:

- Rebuilt `docs/CONTENT_MAP.md` from the current 54 English guide records and five Chinese Germany A1 records, with language, route, maturity, intent, stage, authority, exam owner, update/source-review dates, evidence gap, next action and P0/P1/P2 priority.
- Recorded 16 P0, 35 P1 and 8 P2 items. English evidence state is 13 partial, 3 blocked and 38 pending; no English guide is classified as fully reviewed because the 13 reviewed high-risk source packages retain route/local boundaries. The five Chinese guides remain source- and translation-review pending.
- Created `docs/SPAIN_CONTENT_SOURCE_PILOT_2026-07-16.md` with the Ministry of Justice and Instituto Cervantes source hierarchy plus a claim-level support matrix.
- Added the current Ministry of Justice procedure and electronic dispensation pages to both Spain guides, recorded the real 2026-07-16 narrow source review, and retained applicant-specific verification boundaries.
- Kept both Spain pages at `verification-pending`; no residence-period shortcut, universal two-test rule, SIELE acceptance conclusion, individual exemption, fixed fee/date or outcome claim was added.
- Updated the high-risk audit and regression checks so both rendered Spain pages prove the source-review date, deciding-authority boundary and unchanged pending maturity.

Source-gate result:

- `SOURCE_GATE_PASSED_WITH_APPLICANT_BOUNDARY` for the narrow retained claims.
- Remaining Spain work is human review of the retained wording and any later applicant-category evidence package; source review does not authorize maturity promotion.
- Remaining blocked fact-edit queue: the two France guides and the Netherlands Staatsexamen NT2 guide, pending their named receiving authority/institution/regulator.

Verification:

- Official URL reachability: Ministry of Justice procedure, Ministry electronic office, Cervantes nationality, DELE and CCSE pages returned HTTP 200 during the review.
- Focused `content-integrity` and `source-review-render` tests — passed.
- `git diff --check` — passed.
- `npm test` — passed.
- `npm run build` — passed; 98 pages generated.
- `npm run launch-check` — passed; 98 routes, 31 checks, 0 failures, `READY`.

Delivery boundary:

- Existing unrelated working-tree changes were preserved.
- This window did not commit, push or deploy.

## 导航菜单展开修复与生产发布 — 2026-07-13

Issue: `Routes` 与 `About` 的主导航入口被实现为仅有下拉的 `<summary>`，同时其绝对定位面板被 `.global-header__nav { overflow: auto }` 裁剪，导致用户点击后没有可见反馈。

Released:

- Commit: `01b1827ad20d3cb7e8fc0fa3457f3fc675c1cb33` (`fix: restore navigation menu controls`).
- `Routes` 与 `About` 现在各有一个可访问的直达链接和一个独立、带 aria 标签的展开控件；同一时间只会保留一个展开菜单。
- 桌面导航改为 `overflow: visible`，不再裁剪绝对定位菜单面板。
- Preserved rollback artifact: `/var/www/flowlight.me/releases/20260713T142716Z-pre-1c95a9f-dist`.

Verification:

- 回归检查先失败，确认旧实现缺少独立链接且会裁剪菜单；修复后 `npm test` 通过。
- 本地和服务器 `npm run launch-check` 均通过 25 项检查、0 失败；服务器 Nginx 检查与重载通过。
- 线上工具页 HTML 含 `/routes/`、`/about/` 直达链接和两个下拉控件，最终 CSS 含 `overflow: visible`；工具、路线、关于和 `www` 工具页均返回 HTTP 200。

## 全量 `main` 生产发布与线上复核 — 2026-07-13

Scope: user-authorized publication of all current working-tree changes and the already-pushed `main` history that the production source had not yet pulled. No third-party account, analytics, contact, payment, advertising, or Phase 1 business-process change was made.

Released:

- Commit: `1c95a9f208f78ae955b61df4cb1701ce75eab33e` (`feat: clarify guide library route maturity`).
- Current DNS: both `flowlight.me` and `www.flowlight.me` resolved to `107.150.102.145` at release time; the historical Node 20 host was not on the current DNS path and was not touched.
- Server source advanced from `8d66394` to `1c95a9f`; the published directory is `/var/www/flowlight.me/public/dist`.
- Preserved rollback artifact: `/var/www/flowlight.me/releases/20260713T133159Z-pre-8d66394-dist`.

Verification:

- Local: `npm test`, `npm run build`, `npm run launch-check` (24 checks, 0 failures), and `git diff --check` passed before release.
- Server: dependency install/build, `nginx -t`, Nginx reload, `npm test`, and `npm run launch-check` (24 checks, 0 failures) passed on `1c95a9f`.
- Public: homepage, `www` homepage, guide library, Germany A1/B1 category pages, and sitemap index each returned HTTP 200. The guide library rendered `Complete route`, `Core route`, and `Starter overview` labels.

Business boundary:

- This release does not supply named owners or inspectable business evidence for any Phase 1 entry row. **暂不启动阶段 1** remains the only business-readiness conclusion.

## Phase 2 content / SEO / quality audit window — 2026-07-13

Scope: narrow content, SEO metadata, guide-link, and quality review. No deployment, release, new business line, large page batch, tool logic, pricing, partners, Route Review commercial flow, analytics, advertising, dependency, deployment-config, UI polish, or homepage hero work was changed.

Completed:

- Added `docs/PHASE_2_CONTENT_SEO_QUALITY_AUDIT.md` with findings, allowed-scope decisions, excluded work, and human review items.
- Fixed the Germany A1 route hub so the related guide cards render in route-decision order instead of update-date order.
- Tightened several guide SEO descriptions that were too short or too long, without adding new policy, fee, timing, acceptance, exemption, or eligibility claims.
- Added a content-integrity guard requiring guide metadata descriptions to stay concise and specific.

Official-source boundary:

- A1 / B1 high-risk wording hits were reviewed as a scan. The current A1 / B1 content mostly uses the risky terms to deny over-claims and point readers back to the competent authority or official centre.
- Did not invent route-level official verification dates, fixed fees, fixed result times, accepted-certificate guarantees, exemption conclusions, or individual eligibility findings.

Verification:

- `npm test` — passed, including route tools, commercial pages, A1 cluster, B1 cluster, content integrity, UI/route/tool/SEO/accessibility/migration checks.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.

## P0-1 content update and source-review separation — 2026-07-14

Scope: separate guide editing dates from controlled official-source review metadata and UI. No policy-fact rewrite, homepage redesign, CMP, global CSS refactor, commit, push, or deployment.

Completed:

- Added validated `sourceReviewedAt`, `sourceReviewStatus`, `reviewedByRole`, and `contentStatus` guide metadata. Legacy guides default to `pending`; reviewed records require a date, while pending/not-applicable records reject one.
- Removed Markdown-body date extraction and all existing unconfirmed “Official sources last checked” claims. Historical dates were not copied from `updatedDate`.
- Updated guide article, card, route-hub, homepage, guide-library, and exam-directory date labels so editing dates and official-source review states remain separate.
- Added source-level and built-HTML regression checks for reviewed/pending/not-applicable behavior and the absence of an `updatedDate` fallback.

Verification:

- `npm test` — passed.
- `npm run launch-check` — passed; 28 checks, 0 failures, `READY`.
- `git diff --check` — passed.

Remaining manual work:

- All existing guide records remain `sourceReviewStatus: pending` until a human source reviewer confirms the applicable authority/provider sources, review date, support boundary, and reviewer role.

## P0-2 high-risk route audit and safe-downgrade preparation — 2026-07-14

Scope: the 16 Portugal, Spain, UK, Canada, Italy, France, Finland, and Netherlands guides named by the P0-2 brief. No policy facts were researched, generated, or substantively rewritten.

Completed:

- Added validated intent, audience, final-authority type, authority URL, exam-owner URL, and local verification-prompt fields to the guide schema.
- Made `contentStatus` explicit in all guide frontmatter so route cards, category cards, and article headers no longer infer maturity from country/category.
- Added one shared high-risk status gate: Complete/Core requires both a final decision-authority URL and `sourceReviewStatus: reviewed`; an exam-owner URL alone cannot elevate a page.
- Kept all 16 P0-2 pages at `verification-pending` and added the approved non-conclusive reader verification action.
- Recorded page-level claim categories, source gaps, and human source-package requirements in `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`.
- Left all existing policy, eligibility, period, level, acceptance, exemption, fee, date, validity, and outcome statements unchanged pending human source review.

Verification:

- `npm test` — passed, including built-HTML status-gate fixtures.
- `npm run launch-check` — passed.
- `git diff --check` — passed.

## 阶段 1 业务证据补全（无代码）— 2026-07-13

Scope: only complete, verify, and align business-responsibility/evidence records in `docs/OPERATIONS_STATUS.md`, `docs/PROJECT_CONTEXT.md`, and `docs/TASK_LOG.md` for the seven Phase 1 entry requirements. Existing source, deployment configuration, third-party services, production servers, `dist/`, and root legacy HTML were read-only or untouched.

Business information received:

- The business supplied the seven required evidence categories, evidence rules, stop rules, and allowed document scope.
- No real responsible person's name, business-approved explicit owner role, account-role evidence, evidence repository path, approved SLA, approved test-email scope, release authorization, rollback authorization, or current drill record was supplied in this window. No missing value was inferred or backfilled.

Status separation:

- **本地源码状态**：本窗口开始时 `HEAD` 与 `origin/main` 均为 `1d8770cc11ad03145590ee51782a79cd8c848fb0`。工作区已有与本窗口无关的指南库展示代码和 Task Log 改动；均保留且未发布。
- **线上部署状态**：2026-07-13 20:20 CST 的只读复核中，apex 首页、`www` 首页、sitemap index、联系页及隐私/Cookie 页面返回 HTTP 200；两个首页含 Cloudflare Web Analytics beacon，线上 Privacy/Cookie 页面含 Cloudflare 与 AdSense 说明。公开 HTML 无版本标记，本窗口未登录服务器，故线上精确 commit 与当前回滚路径有效性为待业务方确认。
- **业务/运营就绪状态**：不满足阶段 1 准入；七项中 0 项同时具备已命名负责人和直接对应的当前可检查证据。页面文案、邮箱字符串、脚本存在和历史发布记录未被当作真实权限、收件能力或责任归属证据。

Seven-item result:

- Search Console 或等价搜索监测：公开 sitemap 可检查；负责人/备份制度、平台/属性、访问角色、提交状态、查看路径和复核节奏待业务方确认。
- Analytics：公开 beacon 与政策说明可检查；账户/数据负责人、备份查看人、当前账户角色、面板数据查看方式、隐私/同意要求及批准人、证据保存位置和复核日期待业务方确认。
- 联系真实收件、分流与保留：仅能检查到 `hello@flowlight.me` 字符串；未获准发送测试邮件。实际送达、收件/分流负责人、数据保留负责人、允许/禁止数据、保留/删除规则和升级路径待业务方确认。
- 联系 SLA：负责人、目标时限、工作时间/适用范围、计时起点、超时升级规则和响应记录位置待业务方确认。
- 官方来源与高风险事实复核：可检查到 official-source-first 政策和历史审计样例；主备负责人、固定节奏、强制触发条件、持续审计台账和纠错记录待业务方确认。
- 发布：可检查到历史发布技术记录；授权发布负责人、备份/升级方式、批准点、目标 commit 批准证据和验证记录位置待业务方确认。
- 回滚：可检查到历史发布目录和两个回滚产物路径；负责人/授权人、触发阈值、当前生产主机/发布目录、实际回滚 SOP、沟通批准流程、恢复验证和有效演练证据待业务方确认。

Decision:

- **暂不启动阶段 1。** 七项未全部同时具备已命名负责人和可检查证据。

Not changed:

- No application code, route/content body, tool or commercial logic, analytics/form/email/payment/advertising integration, deployment configuration, server state, production artifact, or legacy root HTML was changed by this window.

Remaining risks and next prerequisite:

- Public reachability does not identify the deployed commit or prove operational ownership.
- The smallest next window remains a no-code business-evidence handoff/review: the business supplies the named owners and the exact minimal materials listed in each `docs/OPERATIONS_STATUS.md` row; an authorized reviewer only checks and records them. The contact test and any rollback drill remain excluded until separately approved. Only after all seven rows pass may a separately scoped minimal implementation window be considered.

Verification:

- `git diff --check` — passed after the three-document consistency review.

Remaining manual checks:

- Before future publication or route expansion, manually recheck any page that would state a fee, result time, accepted certificate, exemption, or eligibility conclusion.
- If the A1 route hub needs a route-level official-source check date later, verify every listed official entry point first instead of copying guide-level dates upward.

## Phase 2 Germany B1 content quality window — 2026-07-13

Scope: continue the content-quality plan after the A1 audit by tightening the Germany B1 settlement/citizenship cluster. No A1 content, Header/Footer, tool engine, global styling, deployment configuration, analytics, advertising, pricing, partners, or route-review commercial flow was changed.

Completed:

- Added `docs/PHASE_2_B1_CONTENT_AUDIT.md` as the B1 source and editorial boundary record.
- Added `tests/germany-b1-cluster.test.js` and wired it into `npm test`.
- Rechecked the B1 cluster as 13 existing guide pages; no new B1 slug was added.
- Updated the B1 hub timestamp and the audited B1 guides' source-check dates.
- Tightened high-risk B1 guidance so language proof, civic knowledge, residence history, livelihood/income, insurance, housing, identity, documents, fees, appointments, and procedure stay separate.
- Removed unsafe universal planning language from the B1 fee/booking and study-plan pages; both now require authority acceptance and local-centre terms before booking or relying on a schedule.

Official-source boundary:

- Used BAMF settlement/residence, naturalisation, and integration-course final-exam pages; Goethe B1 / German examinations pages; telc B1 / centre-finder pages; and the German Government naturalisation starting point only within their stated scope.
- Did not add fixed fees, result times, retake windows, appointment waits, accepted-certificate guarantees, exemption conclusions, or individual eligibility findings.
- The competent authority remains the source of settlement/citizenship acceptance and procedure; the official or authorised centre remains the source of local exam logistics.

Verification:

- `node tests/germany-b1-cluster.test.js` — passed.
- `npm test` — passed, including route tools, commercial pages, A1 cluster, B1 cluster, content integrity, UI/route/tool/SEO/accessibility/migration checks.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.

Remaining manual checks:

- Before a reader books, pays, submits, or changes an application plan, manually check the competent local authority's current B1/civic-knowledge/document/procedure instruction and the selected centre's current fee, ID, result, certificate, cancellation, rescheduling, and retake rules.
- Do not open a second-route expansion until the plan's data prerequisites are met; if continuing content work without those prerequisites, keep deepening A1/B1 official-source quality rather than creating thin new pages.

## Astro 7 production post-release record and health review — 2026-07-13

Scope: record the already-published Astro 7 security upgrade and run a lightweight production health review. No content, UI, SEO, routes, commercial pages, analytics, advertising, deployment configuration, or dependencies were changed.

Release record:

- Target commit: `194e883b183aba981404754f45c0759d2e4e3e3c`.
- Release purpose: upgrade `astro` from 5 to 7, add explicit `@astrojs/markdown-remark`, and remove the Astro / nested `esbuild` vulnerabilities reported by `npm audit`.
- Publication window: Astro 7 production release was completed before this post-release review; the preserved pre-release artifact timestamp is `20260713T044703Z`, and this review was run on 2026-07-13 around 13:02 CST / 05:02Z.
- Production DNS target: `flowlight.me` and `www.flowlight.me` both resolved to `107.150.102.145`.
- Local git state after `git fetch origin main`: `HEAD` and `origin/main` both resolved to `194e883b183aba981404754f45c0759d2e4e3e3c`.
- Production server source: `ubuntu@107.150.102.145:/var/www/flowlight.me/source` resolved to `194e883b183aba981404754f45c0759d2e4e3e3c`.
- Production publish directory: `/var/www/flowlight.me/public/dist`.
- Rollback artifact: `/var/www/flowlight.me/releases/20260713T044703Z-pre-194e883-dist`.

Production verification:

- Server `npm audit --json --registry=https://registry.npmjs.org`: 0 vulnerabilities (`info: 0`, `low: 0`, `moderate: 0`, `high: 0`, `critical: 0`, `total: 0`).
- Server `npm run launch-check`: passed; 98 generated pages, 24 checks, 0 failures, `READY`.
- Public smoke checks:
  - `https://flowlight.me/`: HTTP 200.
  - `https://flowlight.me/tools/`: HTTP 200.
  - `https://flowlight.me/germany-family-reunion-a1/`: HTTP 200.
  - `https://flowlight.me/germany-b1-settlement-citizenship/`: HTTP 200.
  - `https://flowlight.me/guides/goethe-b1-germany-settlement-work/`: HTTP 200.
  - `https://flowlight.me/zh/germany-family-reunion-a1/`: HTTP 200.
  - `https://flowlight.me/pricing/`: HTTP 200.
  - `https://flowlight.me/partners/`: HTTP 200.
  - `https://flowlight.me/route-review/`: HTTP 200.
  - `https://flowlight.me/sitemap-index.xml`: HTTP 200.

Risk and boundary:

- No unresolved production health risk was found in this review: DNS, production source commit, audit, launch-check, and required public URLs all matched the expected state.
- Remaining non-technical operating risks are unchanged from `docs/OPERATIONS_STATUS.md`: named release/rollback owners, rollback authority, and formal restoration drill are still business-operation follow-ups.
- No redeploy was run.

## Astro major upgrade assessment and controlled fix — 2026-07-13

Scope: evaluate and repair the `npm audit` findings rooted in `astro@5.18.2` and its nested `esbuild@0.27.7` with the smallest controlled framework upgrade. No page copy, UI styling, routes, SEO/schema, commercial pages, analytics, advertising, deployment configuration, or unrelated documentation was changed.

Upgrade candidate review:

- `astro@6.4.8`: SemVer-major from Astro 5. It is above the Astro advisory fix thresholds (`<6.1.6`, `<6.1.10`, `<6.3.3`, `<6.4.6`) and removed the previous high-severity Astro advisories, but `npm audit --json --registry=https://registry.npmjs.org` still reported 2 low vulnerabilities because Astro 6 kept `astro/node_modules/esbuild@0.27.7` in the vulnerable range. Not accepted.
- `astro@7.0.7`: SemVer-major from Astro 5 and the version suggested by npm audit. It depends on `esbuild@^0.28.0`; after install, `npm audit --json --registry=https://registry.npmjs.org` reported 0 vulnerabilities. Accepted after full local release-gate verification.

Implemented:

- Updated `astro` from `^5.18.2` to `^7.0.7`.
- Added `@astrojs/markdown-remark@^7.2.1` as an explicit dependency because `src/data/article-sections.ts` imports it directly and Astro 7 no longer left that transitive package resolvable for the project build.
- Updated `package-lock.json` through npm install only. `npm audit fix --force` was not used.

Verification:

- Pre-upgrade audit: 2 vulnerabilities total, 1 low and 1 high, rooted in direct `astro` and nested `astro/node_modules/esbuild`.
- Astro 6 trial audit: 2 low vulnerabilities remained, both through nested `esbuild`.
- Final audit on Astro 7: 0 vulnerabilities.
- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.
- Follow-up clean-install verification after `npm ci --registry=https://registry.npmjs.org` — passed: `npm test`, `npm run build`, `npm run launch-check`, `npm audit --json --registry=https://registry.npmjs.org`, and `git diff --check` all remained clean.

Manual confirmation:

- Production was not deployed in this window.
- Recommended next human check before release: review the dependency-only diff, confirm the team accepts the Astro 7 framework-major jump, then run the normal publish decision separately.

## Dependency security audit window — 2026-07-13

Scope: verify the current `npm ci` / `npm audit` dependency security warnings and decide whether a minimal, controlled upgrade is available. No page content, UI styling, route logic, commercial page, analytics/advertising configuration, deployment script, or unrelated documentation was changed.

Audit result:

- Initial `npm audit --json` against the configured `https://registry.npmmirror.com` registry failed because that mirror does not implement npm's security audit endpoint.
- Re-ran `npm audit --json --registry=https://registry.npmjs.org`; confirmed 2 vulnerabilities total: 1 low and 1 high.
- Direct vulnerable dependency: `astro@5.18.2`.
- Indirect vulnerable dependency: `astro`'s bundled `esbuild@0.27.7`.
- `npm audit` reports the available automatic fix as `astro@7.0.7`, marked as a SemVer-major update.

Decision:

- No non-breaking fix is available inside the current `astro@^5.18.2` range; `npm view astro@5` shows `5.18.2` as the latest Astro 5 release.
- A patched Astro line exists in later majors, but moving from Astro 5 to Astro 6 or 7 is a framework major upgrade and was not applied in this security-only window.
- `npm audit fix --force` was not used.
- Current production risk is limited by the site being built as static Astro output, but the direct dependency still affects the build framework and any future SSR/server-island/dev-server usage. Treat this as a build-chain and framework-surface risk rather than a confirmed exploit in the current static pages.

Follow-up trigger:

- Open a separate controlled Astro-major-upgrade window if the business accepts the migration risk. That window should review Astro 6/7 breaking changes, update dependencies deliberately, run the full release gate, and visually smoke-check key pages before any production deployment.

## Open Design UI production release — 2026-07-13

Scope: publish the already reviewed Open Design UI layer to the current production host. No guide text, route logic, tool calculations, analytics, advertising, policy copy, or deployment script was changed during this release.

Released commits:

- `12bd8c2` — production target and analytics baseline documentation.
- `b15b14ebce0de1c3bcd8d25522bffd5b1c07a395` — Open Design UI layer and audit screenshots.

Production deployment:

- DNS for `flowlight.me` and `www.flowlight.me` resolved to `107.150.102.145` before deployment.
- Production source moved from `16a94dc` to `b15b14e`.
- Production Nginx serves `/var/www/flowlight.me/public/dist`.
- Pre-release production artifact was saved at `/var/www/flowlight.me/releases/20260713T035302Z-pre-b15b14e-dist`.
- Server-side build generated 98 pages, then Nginx configuration test and reload passed.

Public smoke check:

- `https://flowlight.me/`: HTTP 200 and expected homepage marker.
- `https://flowlight.me/tools/`: HTTP 200 and expected tools marker.
- `https://flowlight.me/germany-b1-settlement-citizenship/`: HTTP 200 and expected B1 hub title.
- `https://flowlight.me/guides/goethe-b1-germany-settlement-work/`: HTTP 200 and expected B1 content marker.
- `https://flowlight.me/guides/goethe-b1-vs-telc-b1/`: HTTP 200 and expected DTZ / Goethe / telc title.
- `https://flowlight.me/zh/guides/german-family-reunion-language-requirement/`: HTTP 200 and expected Chinese page title.
- Live CSS returned HTTP 200 and contained the new Open Design primary colour variable.

## B1/A1 verification-guide release and production-target correction — 2026-07-13

Scope: release the three verification-first content updates and record the correct production target. No tool logic, pricing page, commercial flow, analytics, advertising configuration, deployment script, or UI styling was changed in this release.

Released files:

- `src/content/guides/goethe-b1-germany-settlement-work.md`
- `src/content/guides/goethe-b1-vs-telc-b1.md`
- `src/pages/zh/guides/german-family-reunion-language-requirement.astro`

Local release gate:

- `npm test -- --runInBand`: passed.
- `npm run launch-check`: passed; 24 checks, 0 failures, `READY`.
- `git diff --check` for the three target files: passed.

Git and production deployment:

- Released commit: `16a94dc3a9509e10f9d84c21f436fe80d3f0bd7c`.
- Pushed to `origin/main` before deployment.
- DNS for `flowlight.me` and `www.flowlight.me` resolved to `107.150.102.145` during the release check. This is the current production target used for the live deployment.
- Production server source at `/var/www/flowlight.me/source` resolved to `16a94dc` after deployment.
- Production Nginx serves `/var/www/flowlight.me/public/dist`.
- Pre-release production artifact was saved at `/var/www/flowlight.me/releases/20260712T202525PDT-pre-16a94dc-dist`.
- Server-side `npm run build` completed and Nginx configuration test/reload passed during the deployment script.

Public smoke check:

- `https://flowlight.me/`: HTTP 200.
- `https://flowlight.me/guides/goethe-b1-germany-settlement-work/`: HTTP 200 and contained the updated content marker.
- `https://flowlight.me/guides/goethe-b1-vs-telc-b1/`: HTTP 200 and contained the updated title/content marker.
- `https://flowlight.me/zh/guides/german-family-reunion-language-requirement/`: HTTP 200 and contained the updated Chinese scenario section.
- `https://flowlight.me/germany-b1-settlement-citizenship/`: HTTP 200.
- `https://flowlight.me/zh/germany-family-reunion-a1/`: HTTP 200.

Production-target exclusion notes:

- `43.162.126.37` was reachable and had a compatible `/var/www/flowlight.me/public/dist`, but it was not the DNS target for `flowlight.me` during the release. It must not be treated as the live production host unless DNS changes.
- SSH alias `aliyun` / `8.218.193.140` failed host-key verification with reported ED25519 fingerprint `SHA256:yFIeAuRfz70RkuQc+pcY2imBex745Z2IjqQOyZfWNGA`. Do not use it for release work until the server owner verifies the host key.
- Future releases must confirm `dig +short flowlight.me A` before deployment and must publish only to the host currently serving the domain.

## Cloudflare Web Analytics beacon installation — 2026-07-13

Scope: add the user-provided official Cloudflare Web Analytics beacon to the shared Astro layout and align the two public policy pages with the selected free, cookie-free page/performance-only scope. No custom events, user-input analytics, contact collection, advertising configuration, or deployment was changed in this window.

Completed:

- Added the site-specific Cloudflare beacon to `src/layouts/BaseLayout.astro`, so every Astro route receives one beacon.
- Updated Privacy and Cookie Policies to replace the future Plausible wording with the current Cloudflare page/path/referrer/country/device/performance scope.
- Explicitly exclude tool answers, free text, contact details, document details, query strings, and custom events from analytics.

Release and verification:

- Released in `ab28655` and deployed from `main` to `/var/www/flowlight.me/public/dist` on 2026-07-13.
- `npm test`, `npm run launch-check` and `git diff --check` passed before release.
- Server source resolves to `ab28655`; the public homepage, Privacy Policy and Cookie Policy each expose the Cloudflare beacon, and the two policy pages contain the Cloudflare wording and 2026-07-13 update date.
- Cloudflare dashboard evidence supplied by the user shows the `flowlight.me` site created 19 minutes earlier with 4 homepage page views and 1 visit in the prior 24 hours. This confirms initial data receipt; do not add custom events.

## Free analytics scope decision — 2026-07-13

Decision: replace the previously selected paid Plausible direction with Cloudflare Web Analytics as the long-term free baseline. The business accepts the product trade-off: this provides page views, paths, referrals, country/device context and performance metrics, but no custom route, tool, outbound-link, guide-CTA or contact-intent events.

Boundary:

- No Cloudflare account, beacon, code, policy wording, deployment or data collection was changed in this decision window.
- Account primary/backup access must be recorded before a separate beacon-implementation window.

## AdSense European consent publication — 2026-07-13

Scope: account-side publication and regional user verification only. No source code, policy wording, analytics implementation, deployment configuration, or other service was changed in this step.

User-confirmed result:

- The European regulations message was published in AdSense after the matching policies were deployed.
- A regional test showed the consent message, Google-only management options, and normal page behaviour after rejection.

Evidence boundary:

- This is user-reported verification. Retain a dated screenshot or AdSense settings export as the operating record; do not treat this log as independent legal approval.
- Plausible remains unconfigured and must not be installed until account ownership, backup access, retention/deletion and DPA review are documented.

## Privacy and Cookie Policy alignment — 2026-07-13

Scope: align the Astro Privacy Policy and Cookie Policy with the chosen AdSense direction, the drafted European consent message, and the fact that Plausible is not yet enabled. No advertising, analytics, consent-message, account, deployment, or other third-party configuration was changed.

Completed:

- Updated `src/pages/privacy-policy.astro` to disclose the retained Google AdSense script, consent-dependent advertising choices, local tool-progress storage, and the limited future Plausible event scope without claiming that Plausible is live.
- Updated `src/pages/cookie-policy.astro` to remove the incorrect Plausible-cookie claim; document advertising/consent storage, local tool-progress storage, and the future no-cookie Plausible design.
- Preserved the limits against collecting tool answers, free text, email addresses, document details, or other user-provided identifiers in analytics events.

Verification:

- `npm test`: passed.
- `npm run build`: passed; 98 static routes generated.
- `npm run launch-check`: passed; 24 checks, `READY`.
- `git diff --check`: passed.

Not yet complete:

- The updated policies were released in `b9f83b9` and deployed from `main` to `/var/www/flowlight.me/public/dist` on 2026-07-13. The public `/privacy-policy/` and `/cookie-policy/` pages returned HTTP 200 and expose the 2026-07-13 date plus the new AdSense/Plausible wording.
- The AdSense European consent message remains a user-prepared draft. Publish it only now that the matching policies are live, then run a post-publication regional verification before treating advertising consent as complete.
- Plausible remains unconfigured and must not be added before its account owners, retention/deletion decision and DPA review are recorded.

## Phase 2 Germany A1 content close-out — 2026-07-13

Scope: final evidence and release-gate record for the seven English Germany A1 family-reunion guides. No route, layout, tool, navigation, Chinese page, commercial surface, analytics, advertising, deployment, or legacy-file change was made in this close-out.

Completed editorial files:

- `src/content/guides/german-family-reunion-language-requirement.md`
- `src/content/guides/goethe-a1-vs-telc-a1.md`
- `src/content/guides/goethe-a1-test-centers.md`
- `src/content/guides/goethe-a1-fees-by-country.md`
- `src/content/guides/goethe-a1-retake-policy.md`
- `src/content/guides/german-a1-documents-checklist.md`
- `src/content/guides/german-a1-exam-booking-timeline.md`

Evidence boundary:

- The audit in `docs/PHASE_2_A1_CONTENT_AUDIT.md` records current BAMF, Federal Foreign Office, Goethe-Institut, and telc sources only within their stated scope. The Federal Foreign Office FAQ remained a manual official-source verification link because automated access was blocked.
- The responsible German mission remains the source of current local visa/document instructions and proof acceptance; the selected official local test centre remains the source of current exam product, seat, fee, registration, identification, result, certificate, cancellation, rescheduling, and retake terms. No individual eligibility, acceptance, price, availability, timing, or visa outcome is concluded here.

Release evidence:

- `node tests/germany-a1-cluster.test.js`: passed (`Germany A1 cluster rules passed`).
- `npm test`: passed, including Germany A1, guide-source/compliance, deployment, UI, route, SEO, accessibility, and migration checks.
- `npm run build`: passed; 98 static pages generated.
- `npm run launch-check`: passed; 24 checks passed, 0 failed, `READY`.
- `git diff --check`: passed with no output.

Remaining manual checks:

- Before a reader books, pays, changes an appointment, or submits a visa file, manually check the responsible German mission's current family-reunion instruction and the selected official local centre's current terms.
- Treat any locally unavailable, time-sensitive, or conflicting instruction as a verification stop, not an inferred answer.

## Phase 1 privacy and consent audit — 2026-07-13

Scope: audit the business direction to use Plausible Analytics Cloud Growth and retain AdSense. No code, account setting, consent message, policy wording, deployment, or data collection was changed.

Decision:

- Search Console is deferred from this review and remains unconfirmed.
- Plausible Cloud Growth is conditionally approved as the selected future analytics service, limited to the existing five-event scope and with no event properties or user-provided values. It cannot be deployed before account owners, retention/deletion decision and DPA review are recorded.
- Retaining the current AdSense implementation is **not approved**. The public homepage loads the script but no CMP/consent flow is present, and public policy text describes advertising as future-only. The implementation remains an unresolved risk rather than an authorised advertising state.
- Phase 1 remains closed. The full evidence, official-source links and remediation checklist are in `docs/PHASE_1_PRIVACY_CONSENT_AUDIT_2026-07-13.md`.

## Planning-alignment window — 2026-07-13

Scope: planning, operations and historical-roadmap documentation only. No application page, tool logic, third-party integration, legal copy, deployment configuration, release, or content fact was changed.

Completed:

- Declared `docs/MASTER_EXECUTION_PLAN.md` as the only future execution sequence; `docs/OPERATIONS_STATUS.md` as the current evidence and gate record; `docs/PROJECT_CONTEXT.md` as a project map; and this task log as historical window evidence.
- Marked the traffic and monetization roadmaps as non-authorising historical strategy references, so their older waitlist, tracking, advertising and expansion ideas cannot bypass the current Phase 1 gate.
- Replaced the obsolete “next window is Phase 0” instruction. The technical baseline is recorded; the only next window is a no-code Phase 1 entry-confirmation pass with two valid outcomes: open a separately authorised minimal-event window or keep the gate closed.
- Updated deployment wording: the last recorded release used `f258472…`; current local `main` is `c5838eb`, `origin/main` is `f092be6`, and the public homepage contains Open Design markup, but no public version marker proves the current deployed commit.
- Recorded the visible AdSense loader as an unresolved business/privacy risk. It was not removed or expanded in this documentation-only window; a business/legal decision and, if needed, a separately authorised code-removal window remain required.

Verification:

- Read-only Git check: local `main` remains three commits ahead of `origin/main`.
- Read-only public check: `/`, both Germany hubs, `/tools/`, `/guides/`, `/zh/`, `/pricing/`, and `/contact/` returned HTTP 200.
- Documentation-only change: build, tests, deployment and third-party services were intentionally not run or changed.

Next-window prerequisite:

- Business completes every owner/evidence row in `docs/OPERATIONS_STATUS.md`, including an explicit AdSense/Plausible decision. Until then, Phase 1 remains closed.

## Phase 1 entry-responsibility verification — 2026-07-12

Scope: documentation, repository-state verification, and entry-gate decision only. No application pages, tool logic, factual guide content, visual system, deployment script, Nginx configuration, third-party service, personal-data collection, commit, or deployment was changed.

Completed:

- Re-read the Phase 0/1 sequence in `docs/MASTER_EXECUTION_PLAN.md`, current project context, release record, and operations status. Confirmed the technical release baseline remains: local `main` and `origin/main` resolve to `f25847291d053a927d0b0a2c062474bf9d5a100b`; production was published from that `main` commit to `/var/www/flowlight.me/public/dist`; the prior `7e9cd943…` static artifact remains recorded for rollback.
- Performed a read-only public recheck at 2026-07-12 20:58 Asia/Shanghai: `/`, Germany A1, Germany B1, `/tools/`, `/guides/`, and `/zh/` returned HTTP 200 with the expected titles. This confirms reachability only and does not establish any account, approval, service-receipt, or business-operation evidence.
- Reworked `docs/OPERATIONS_STATUS.md` into the seven required Phase 1 entry items. Every row now explicitly records named primary/backup placeholders, status, evidence, gap/risk, and next action for Search Console; analytics/data retention; privacy/consent; contact receiver/data limits/SLA; official-fact review; release/rollback roles; and the fixed release process.
- Verified only repository-visible configuration. The legacy root `index.html` contains a Plausible loader and the Astro shared layout contains an AdSense loader; the source Privacy/Cookie pages also describe Plausible. None supplies an account, access role, processor/retention decision, legal approval, consent decision, or live-service receipt. `/contact/` displays `hello@flowlight.me`, but no receiving/triage proof, permitted-data rule, SLA, or verified mailbox route was found.
- Marked all business owners and approvals as **待业务方确认**, rather than inferring availability from page copy or legacy documentation. Clarified in `docs/PROJECT_CONTEXT.md` that the 2026-07-11 legacy-production observation is historical and is superseded by the 2026-07-12 live deployment baseline.

Decision:

- **暂不启动阶段 1。** The required business conditions are not all explicitly confirmed. No analytics, lead capture, conversion, payment, mail, form, or other third-party integration may begin in this state.

Residual risks:

- Existing Privacy/Cookie source text and the legacy Plausible loader conflict with the absence of account/access/approval evidence; the Astro layout also contains an AdSense loader. Treat all of these as unverified service/compliance evidence, not as authorization or proof that a service is operating.
- The rollback artifact is preserved but has not been restoration-drill verified. A fixed release path is technically evidenced for this release, but release and rollback authority are not yet an approved operating procedure.
- `hello@flowlight.me` is a contact display string only; its owner, receiving endpoint, retention/deletion handling, triage, and reply SLA remain unknown.

Next-window prerequisite:

- Business must complete every Phase 1 gate row in `docs/OPERATIONS_STATUS.md` with named primary/backup owners and inspectable evidence: Search Console property and sitemap status; analytics account/view access; privacy/consent decision; contact receiver and data handling; reply SLA; official-source reviewers; release and rollback authorities; and an approved branch/target/rollback SOP.
- Only then open a new Phase 1 window, limited to privacy-safe events for route selection, tool completion, official external-link click, guide CTA, and contact intent. It must not transmit tool results or personal information.

## Production release: local `main` deployed — 2026-07-12

Scope: publish the current local `main` after release gates, with a server-side build, a preserved prior static artifact, and public route verification.

Completed:

- Confirmed local `main` and `origin/main` both resolve to `f25847291d053a927d0b0a2c062474bf9d5a100b` (`feat: adopt warm Flowlight UI system`). Local uncommitted material was limited to documentation and unrelated/untracked files, so it was not included in the release target.
- Release gate passed locally: `npm test`, `npm run build`, and `npm run launch-check`; build output contained 98 routes and launch check was `24/24` passed, `READY`.
- Preserved the former production static output (`7e9cd943…`) at `/var/www/flowlight.me/releases/20260712T202600CST-7e9cd943/dist` before changing the live directory.
- Switched server source from `feature/flowlight-rebrand` to `main` at `f258472…`, ran `npm ci` and `npm run build` on the server, staged the output, then published it to `/var/www/flowlight.me/public/dist`.
- `nginx -t` passed before and after publication; Nginx reload succeeded.
- Final public HTTPS check at 2026-07-12 20:27 Asia/Shanghai: `/`, `/germany-family-reunion-a1/`, `/germany-b1-settlement-citizenship/`, `/tools/`, `/guides/`, and `/zh/` all returned HTTP 200 with expected titles.

Residual risks:

- The rollback static artifact is preserved but has not yet been exercised as a restoration drill.
- Business ownership for Search Console, analytics, privacy/consent, contact receiver, reply SLA, and official-source review remains unconfirmed. This continues to block Stage 1 tracking and any lead-capture/commercial activation.

## Phase 0 operational baseline and production smoke check — 2026-07-12

Scope: deployment/rollback contract, public smoke check, operating ownership status, and documentation correction only. No application pages, guide facts, tool logic, third-party services, or deployment files were changed.

Completed:

- Logged into the deployment server after its current SSH host key matched the local known-host record.
- Confirmed Nginx serves `/var/www/flowlight.me/public/dist` with `index.html`; the server source is under `/var/www/flowlight.me/source`.
- Confirmed the active server source is `feature/flowlight-rebrand` at `7e9cd943ef24f247b6513758535ae26b072dbf3e`, while the local checkout's `main` is a different commit. The server output exists, but this does not establish that local `main` is live.
- Performed a public HTTPS smoke check at 2026-07-12 20:19 Asia/Shanghai. `/`, `/germany-family-reunion-a1/`, `/germany-b1-settlement-citizenship/`, `/tools/`, `/guides/`, and `/zh/` all returned HTTP 200 with expected titles.
- Added `docs/OPERATIONS_STATUS.md` as the single current status page for deployment evidence, smoke checks, ownership gaps, and the Phase 1 entry gate.

Risks and blockers:

- The checked-in deployment script pulls `origin main`, but the running server checkout is a feature branch. Do not deploy or describe a local `main` build as live until the release owner selects the intended branch/commit and a rollback commit.
- Search Console, analytics access, privacy/consent, contact receiver, reply SLA, official-source reviewer, and release owner are not yet confirmed. No tracking, lead capture, payment, email delivery, or consultation intake may be activated.

Next-window prerequisite:

- Business owner records the missing responsibilities in `docs/OPERATIONS_STATUS.md` and explicitly chooses the production branch/commit plus rollback point. Once that is done, Stage 1 may be scoped as a privacy-safe, minimal observability window; otherwise continue only official-source content refreshes and public health checks.

This log records current project-map findings, known issues, and recommended next-window boundaries for flowlight.me / VisaLang.

## Production 403 Incident - 2026-07-11

Observed online with a reproducible check:

- `https://flowlight.me/` returned Nginx `403` with the native `403 Forbidden` body.
- `https://flowlight.me/index.html` returned `404`, while `/about/` returned the new Astro page with `200`.
- This means the Nginx document root contained partial Astro output but no root `index.html`; it was not an application-route or content error.

Root cause and repository fix:

- The checked-in deployment script pulled the repository into the Nginx document root, never ran `npm run build`, and never verified or copied `dist/`.
- `deploy/deploy.sh` now keeps source in `/var/www/flowlight.me/source`, installs Node/npm when missing, runs `npm ci` and `npm run build`, blocks publication unless `source/dist/index.html` exists, and synchronizes the complete `dist/` into `/var/www/flowlight.me/public`.
- `deploy/server-init.sh`, `deploy/README.md`, and deployment regression assertions were updated to match this contract.
- The first server build exposed a Node 20 compatibility issue in `/exams/`: `Object.groupBy` was replaced with a reducer, and the deployment target was aligned with the actual Nginx root `/var/www/flowlight.me/public/dist`.

Verification:

- `npm test`: passed, including deployment-contract assertions.
- `npm run launch-check`: passed, 24 checks, `READY`.
- `bash -n deploy/deploy.sh deploy/server-init.sh`: passed.
- Server build after the compatibility fix: 98 pages generated successfully; `dist/index.html` exists and Nginx config validation passed.
- Final production verification: `/`, `/about/`, `/routes/`, `/exams/`, `/tools/`, `/guides/`, `/tools/route-finder/`, `/germany-family-reunion-a1/`, and `/zh/` all returned HTTP 200; homepage title is `Find the language proof required for your route | VisaLang`.
- Server source is synchronized to commit `8fd3174`; the live static output was built from `e31665e` and contains the same application content. The final commit only hardens the future deployment script for `ubuntu + sudo` execution.
- The remote fix could not be applied from this session because the configured `aliyun` SSH host key changed and was correctly rejected by SSH. Confirm the new fingerprint `SHA256:yFIeAuRfz70RkuQc+pcY2imBex745Z2IjqQOyZfWNGA` with the server owner before connecting and running the deployment script.

## Decision Product UI Refactor - 2026-07-11

Role: senior product design, UX architecture, frontend implementation, migration, and release verification.

Completed:

- Kept the Astro and Markdown stack; did not rewrite policy, visa, fee, exam-acceptance, or legal conclusions for UI reasons.
- Added `/routes/`, `/exams/`, and `/tools/` centres and rebuilt the homepage around the route decision task.
- Replaced the old primary navigation with Home, Routes, Exams, Tools, Guides, About, and a route-aware language switch. Pricing and Partners moved under About and footer surfaces.
- Added the shared component and token system documented in `docs/UI_REFACTOR_REPORT.md`.
- Migrated English guides to one conditional article layout, removed the duplicate Germany A1 support shell, and kept one TOC and one disclaimer per generated guide.
- Rebuilt the Germany A1 hub as a seven-step route centre with guide, tool, official-source, last-checked, FAQ, and correction-reporting surfaces.
- Rebuilt Guides as a task library with seven filters, sorting, URL state, mobile drawer, result count, and empty state.
- Unified the library across 54 English and 5 Chinese guide entries and added a working Language filter.
- Added a shared tool layout with WebApplication schema, local progress, restart, copy, print, text export, and clear unsupported-route boundaries.
- Removed the Reminder Planner email field and added local reminder, ICS, copy, print, and text export paths.
- Standardised commercial page states and removed request-access purchase language from unavailable products.
- Corrected two truncated guide slugs and added 301 redirects for them and the legacy static layer.
- After two-axis review, changed unsupported route/checklist output to a hard coming-soon stop, removed default timeline buffers, separated update and official-verification dates, added persistent per-step route progress, labelled all Chinese-to-English transitions, expanded legacy legal redirects, and hardened JSON-LD parsing checks.
- Added a build-time Markdown sectioner so all 54 English articles render the eight required sections once and in a fixed order without rewriting the underlying policy or exam content; added previous/next and next-tool navigation to both English and Chinese guide bottoms.

Verification:

- Pre-change backup: `/tmp/visalang-pre-ui-refactor-20260711.tgz`.
- `npm test`: passed.
- `npm run build`: passed, 98 generated HTML routes.
- Browser checks: 1440×900, 768×1024, and 390×844; no horizontal overflow on checked pages; menu, filters, URL state, Route Finder result, and restart passed; console clean.
- Full final `launch-check` and `git diff --check` recorded in the final handoff after the last documentation pass.

Remaining boundaries:

- Chinese remains a focused Germany A1 path rather than a full-site translation.
- Legacy root static files remain until deployment source-of-truth is independently confirmed; redirects prevent route competition.
- No payment, delivery, email-sending, Route Review intake, or partner-application backend is active.

## Google AdSense Script Install - 2026-07-10

Role: monetization script integration owner.

Scope completed:

- Added the Google AdSense publisher script for `ca-pub-3018617123550799` to the shared Astro page head in `src/layouts/BaseLayout.astro`.
- Kept the change narrow: no ad units, no layout changes, no content changes, no route changes, no package/deploy config changes.
- Verified generated pages include the script, including `/`, `/guides/`, `/zh/`, and `/germany-family-reunion-a1/`.

Verification:

- `npm test`: passed.
- `npm run build`: passed, 79 pages generated.
- `npm run launch-check`: passed, 55 checks, READY.
- `git diff --check`: passed.

Remaining follow-up:

- Add visible ad placements only after Google AdSense approval and a separate UX/compliance pass.
- Review cookie/privacy consent requirements for display advertising in a separate legal/compliance window if ads are activated beyond the loader script.

## Final QA Refresh / Deployment Gate - 2026-07-10

Role: final quality check, build/link/mobile/SEO risk gate, and small-fix owner.

Overall conclusion:

- Can deploy, with manual official-source review still recommended for time-sensitive policy, fee, date, test-center, certificate-acceptance, exemption, retake, and result-timing claims.
- No blocking install, build, route, internal-link, sitemap, robots, canonical, CTA, security-cleanup, or mobile-overflow issue remains after this pass.

Package manager / scripts:

- Used npm because `package-lock.json` is present and no `pnpm-lock.yaml`, `yarn.lock`, or `bun.lockb` was found.
- `package.json` provides `dev`, `build`, `preview`, `test`, and `launch-check`.
- `package.json` does not provide `lint` or `typecheck`, so those commands were not run.

Commands run:

- `npm install`: passed.
- `npm test`: passed.
- `npm run build`: passed; 79 pages generated.
- `npm run launch-check`: passed; 55 checks, 0 warnings, 0 failures, `READY`.
- `npm run dev -- --host 127.0.0.1 --port 4321`: sandbox attempt failed with local listen permission; passed after local-server permission, and checked dev routes returned `200`.
- `npm run preview -- --host 127.0.0.1 --port 4322`: passed after local-server permission; checked preview routes returned `200`.
- `git diff --check`: passed.

Pages checked:

- `/`
- `/guides/`
- `/guides/?category=germany-a1`
- `/germany-family-reunion-a1/`
- `/guides/goethe-a1-fees-by-country/`
- `/guides/goethe-a1-test-centers/`
- `/guides/goethe-a1-retake-policy/`
- `/guides/german-a1-documents-checklist/`
- `/guides/goethe-a1-speaking-topics/`
- `/guides/german-a1-family-reunion-faq/`
- `/guides/goethe-a1-vs-telc-a1/`
- `/guides/german-family-reunion-language-requirement/`
- `/guides/goethe-a1-booking-mistakes/`
- `/guides/goethe-a1-30-day-study-plan/`
- `/about/`
- `/editorial-policy/`
- `/privacy-policy/`
- `/cookie-policy/`
- `/terms/`
- `/affiliate-disclosure/`
- `/zh/`
- `/zh/germany-family-reunion-a1/`

Fixes completed:

- Replaced stale telc Deutsch A1 links with the current `start-german1-telc-german-a1` telc page in the English Germany A1 hub, shared Germany A1 support component, Chinese Germany A1 source data, and relevant guides.
- Replaced stale official-source links that returned 404 in generated output: France Education International DELF/DALF/TCF links, Goethe B1 deep link, OPH YKI link, TEF Canada deep link, IRCC Express Entry language-criteria deep link, and Dutch NT2/CvE entry.
- Updated the source test assertion so Goethe B1 depth pages still require a Goethe official source while using the reachable Goethe examinations page.

Link / navigation result:

- Internal links passed `launch-check`.
- Header, Footer, breadcrumbs, Related guides, Germany A1 route links, CTA/contact links, and language-switch links were present in checked generated pages.
- Checked generated pages had one H1, title, meta description, canonical URL, footer links, and no empty `href`, `href="#"`, or `javascript:` links.
- A stale-link scan of generated output found 0 occurrences of the old known-bad official URLs after the fix.
- External link checker still reports some official sites as bot-blocked, redirected, or timeout-prone, especially BAMF, Canada.ca, IELTS, Migri, and CAPLE. These are not treated as confirmed dead links, but should be manually spot-checked in a real browser.

SEO / sitemap result:

- `launch-check` confirmed generated sitemap, robots, guide `lastmod`, canonical URLs, Article/BreadcrumbList JSON-LD, CollectionPage/ItemList JSON-LD, guide category pages, Chinese pages, and legal noindex handling.
- Duplicate title scan found 0 duplicate generated titles.
- Duplicate meta-description scan found 0 duplicate generated descriptions.
- `/guides/?category=germany-a1` remains an intentionally client-filtered view canonicalizing to `/guides/`; indexable category pages remain under `/guides/category/{category}/`.

UI / mobile / security result:

- Existing generated CSS includes protection for long links, guide tables, card grids, responsive grids, and `min-width: 0` layout constraints.
- No obvious hard-coded wide layout blocker was found in the checked generated pages.
- Security cleanup scan found no empty href, `javascript:` links, public `YOUR_FORM_ENDPOINT`, API key/secret placeholders, `debugger`, or frontend `console.log` matches in the checked source/static areas.
- Legal pages use the shared shell and narrow article layout, not raw default templates.

Content / compliance result:

- Risk-term scan found no recommended guaranteed-pass, leaked-material, copied-answer, or official-authority claims. Matches were in prohibitions, disclaimers, or official-source warnings.
- Thin-content scan still shows several non-core starter pages under roughly 150 body words, but they have updated dates and official-source/disclaimer cues.
- Germany A1 content continues to avoid fixed fee/date/test-center promises and keeps official-source, test-center, embassy, or consulate verification language.

Remaining risks / manual review:

- No `lint` or `typecheck` scripts exist; add them only in a separate engineering hardening window.
- External official links should be spot-checked in a normal browser because some official sites block automated checks or redirect through protection pages.
- BAMF migration overview links timed out or returned bot-protection behavior during automated checking; keep them as manual official-source review items.
- Legacy root static files still coexist with Astro source/output; do not reconcile or delete them without a separate source-of-truth/deploy task.
- The actual server deploy path still needs host access/source-of-truth confirmation if deployment is not Git-based.

Recommended next module:

- Proceed with deployment from the current build if the hosting flow builds from the pushed Astro source.
- After deployment, check production 404s, Search Console sitemap status, and CTA/contact clicks.
- Next content window should deepen remaining thin non-core guides or continue Germany A1 official-source refreshes; content expansion should happen in a new window.

## Guides + SEO Review Window - 2026-07-10

Role: Guides list, guide template, Germany A1 internal-link, and technical SEO owner.

Scope completed:

- Re-read `docs/PROJECT_CONTEXT.md`, `docs/CONTENT_MAP.md`, and this task log before making changes.
- Re-checked `/guides/`, `/guides/?category=xxx`, static guide category pages, `/guides/[slug]/`, `/germany-family-reunion-a1/`, Germany A1 core guides, metadata, canonical URLs, structured data, sitemap, robots, and launch checks.
- Kept the work narrow: no guide-body rewrite, no UI design-system changes, no Header/Footer structure changes, no deploy config changes, and no new fee/date/policy/test-center claims.

Files changed:

- `src/content/guides/german-family-reunion-language-requirement.md`
- `src/content/guides/goethe-a1-vs-telc-a1.md`
- `docs/TASK_LOG.md`

Guides list result:

- `/guides/` is currently a guide library rather than a chronological blog: it shows all 49 English guides, has Popular routes, route overview, search, category pills, country / route / exam / level facets, result count, empty state, and guide cards with title, summary, country, route, exam, level, last updated, related route, and CTA.
- Germany A1 is a visible core route in Popular routes and the route overview.
- Latest guides do not dominate the page.

Category / filter SEO result:

- `/guides/?category=xxx` remains a client-side filtered view and canonicalizes to `/guides/`, so parameter combinations are not treated as separate indexable pages.
- Static pages under `/guides/category/{category}/` are the indexable category aggregation pages with route-specific H1, title, meta description, canonical URL, CollectionPage JSON-LD, and ItemList JSON-LD.
- User wording `telc-deutsch` maps to the existing project slug `germany-telc`; no duplicate category slug was added.
- Sitemap handling is appropriate: generated sitemap includes static category pages, not query-parameter variants.

Guide template result:

- Guide detail pages share `GuideLayout.astro` with Breadcrumb, H1, one-line summary, route metadata box, audience fit, non-fit, decision support, TOC, main content, official verification, common mistakes, next action, Related guides, Last updated, Disclaimer, CTA, and route backlink.
- Guide detail SEO includes canonical, Open Graph article type, Article JSON-LD with published/modified dates, and BreadcrumbList JSON-LD.

Germany A1 related-guide changes:

- `german-family-reunion-language-requirement` now points readers to `goethe-a1-vs-telc-a1`, `german-a1-documents-checklist`, and `goethe-a1-germany-family-reunion`, matching the requirement-check -> exam choice -> documents flow.
- `goethe-a1-vs-telc-a1` now points readers to `goethe-a1-test-centers`, `goethe-a1-fees-by-country`, and `goethe-a1-booking-mistakes`, matching the provider comparison -> centre / price / booking-risk flow.
- Germany A1 shared route support still links every Germany A1 guide back to `/germany-family-reunion-a1/` and exposes the core guide set, including FAQ.

SEO metadata result:

- Germany A1 title and description improvements from the prior SEO follow-up are still in place.
- No keyword-stuffed titles were added.
- No page claims that VisaLang is an official authority.
- No ratings, reviews, prices, Course schema, or fake FAQPage schema were added.

Sitemap / robots / canonical result:

- Generated sitemap includes `/germany-family-reunion-a1/`, English guides, guide category pages, and generated Chinese pages.
- Generated sitemap excludes configured noindex legal pages.
- `public/robots.txt` points to `https://flowlight.me/sitemap-index.xml`.
- Guide pages canonicalize to `/guides/{slug}/`.
- Static category pages canonicalize to `/guides/category/{category}/`.
- Query-filtered `/guides/?category=...` URLs remain non-canonical duplicate views.

Still needs content window:

- Germany A1 short-body pages still worth deepening without changing the current SEO shell: `goethe-a1-test-centers`, `goethe-a1-retake-policy`, `german-a1-documents-checklist`, `goethe-a1-speaking-topics`, `goethe-a1-30-day-study-plan`, `goethe-a1-vs-telc-a1`, and `german-family-reunion-language-requirement`.
- Non-Germany thin starter guides remain content-window work, especially Portugal, Netherlands, Italy, Canada/French, and some TestDaF/telc pages listed in the earlier follow-up section.

Still needs UI window:

- No UI window is required before final QA. A UI sitewide unity pass has already run.
- Optional human screenshot review remains useful for `/guides/`, `/guides/category/germany-a1/`, a representative guide detail page, `/germany-family-reunion-a1/`, and mobile filters.

Verification:

- `npm test`: passed.
- `npm run build`: passed, 79 pages generated.
- `npm run launch-check`: passed, 55 checks, READY.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

## Final QA / Deployment Check Window - 2026-07-10

Role: final quality check and deployment readiness owner.

Overall conclusion:

- Can deploy, with human official-source review items for future content maintenance.
- No blocking build, route, internal-link, sitemap, robots, canonical, CTA, or mobile-overflow issue was found in this final QA pass.

Package manager:

- Used npm because `package-lock.json` exists and `package.json` defines npm scripts.

Commands run:

- `npm install`: passed; dependencies already up to date.
- `npm run build`: passed; 79 pages generated.
- `npm test`: passed.
- `npm run launch-check`: passed; 55 checks, 0 warnings, 0 failures, `READY`.
- `npm run dev -- --host 127.0.0.1 --port 4321`: first attempt was blocked by local sandbox port permission; passed after explicit local-server permission.
- `npm run preview -- --host 127.0.0.1 --port 4322`: passed after explicit local-server permission.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

Pages checked:

- `/`
- `/guides/`
- `/guides/?category=germany-a1`
- `/germany-family-reunion-a1/`
- `/guides/goethe-a1-fees-by-country/`
- `/guides/goethe-a1-test-centers/`
- `/guides/goethe-a1-retake-policy/`
- `/guides/german-a1-documents-checklist/`
- `/guides/goethe-a1-speaking-topics/`
- `/guides/german-a1-family-reunion-faq/`
- `/guides/goethe-a1-vs-telc-a1/`
- `/guides/german-family-reunion-language-requirement/`
- `/guides/goethe-a1-booking-mistakes/`
- `/guides/goethe-a1-30-day-study-plan/`
- `/about/`
- `/editorial-policy/`
- `/privacy-policy/`
- `/cookie-policy/`
- `/terms/`
- `/affiliate-disclosure/`
- `/zh/`
- `/zh/germany-family-reunion-a1/`

Page / route result:

- All checked local dev-server routes returned `200`.
- Production preview sanity check for `/`, `/guides/`, `/germany-family-reunion-a1/`, and `/zh/` returned `200`.
- Checked pages had one H1, a title, a meta description, a canonical URL, footer links, and no empty `href`, `href="#"`, or `javascript:` link.

Link / navigation result:

- `launch-check` passed internal-link validation.
- Header, Footer, breadcrumbs, Related guides, Germany A1 route links, and language-switch links passed existing automated checks.
- `/guides/?category=germany-a1` is intentionally a client-side filtered query view that canonicalizes to `/guides/`; indexable category pages are under `/guides/category/{category}/`.
- No dead internal link was fixed in this pass.

Fixes completed:

- Removed the public placeholder `YOUR_FORM_ENDPOINT` example from legacy `app.js`. The waitlist remains demo/local-storage mode, but the public front-end script no longer exposes a half-configured endpoint placeholder.

SEO result:

- Generated sitemap and robots checks passed.
- Generated sitemap includes core pages, Germany A1 pages, Chinese pages, guides, and guide category pages.
- Generated sitemap excludes configured noindex legal pages.
- Generated guide `lastmod` values match `updatedDate`.
- No duplicate generated page titles or duplicate generated meta descriptions were found.
- Guide pages still emit Article and BreadcrumbList JSON-LD; guide index/category pages emit CollectionPage and ItemList JSON-LD.

UI / mobile result:

- Existing responsive CSS covers header wrapping/scrolling, guide grids, guide facets, card grids, long links, tables, and code blocks.
- No hard-coded wide inline styles or obvious mobile-overflow blocker was found in the checked Astro pages.
- Mobile visual risk is not a deploy blocker, but a human screenshot pass is still useful after deploy or before design review.

Content / compliance result:

- Search for risky terms found no recommended guaranteed-pass, leaked-material, copied-answer, or unofficial-authority claims. Matches were in prohibitions, disclaimers, or "verify officially" wording.
- Germany A1 content continues to avoid fixed fee/date/test-center promises and tells readers to verify with official sources, test centers, embassies, or consulates.
- All guide content files checked had `updatedDate`, related metadata, and detectable official-source cues.

Remaining risks:

- No `lint` or `typecheck` scripts are configured in `package.json`.
- Legacy root static files still coexist with Astro source/output; do not delete or reconcile them without a separate source-of-truth task.
- Waitlist is still demo/local-storage mode in the legacy layer; the Astro guide CTA points to `/contact/`, not a live signup provider.
- Some guide bodies remain thin, especially `portuguese-ciple-a2-for-citizenship-and-residence`, `portuguese-language-for-golden-visa-and-citizenshi`, `staatsexamen-nt2-for-work-and-higher-education`, `cils-vs-celi-vs-plida-for-italian-citizenship`, `goethe-a1-30-day-study-plan`, `dutch-inburgering-a2-b1-for-integration-and-citize`, `goethe-a1-vs-telc-a1`, and `german-family-reunion-language-requirement`.
- Chinese coverage is real but partial; `/zh/`, the Chinese Germany A1 hub, and five Chinese core guide pages exist, but the full guide library is not localized.

Human confirmation needed:

- Re-check current official fee, date, retake, ID, test-center, certificate-acceptance, embassy/consulate, and exemption rules before making country-specific publishing claims.
- Decide whether to add formal `lint` and `typecheck` scripts in a separate engineering hardening pass.
- Decide whether the legacy waitlist should be wired to a real provider or left as a demo/contact flow.
- Decide later whether the static-only `/do-i-need-german-a1.html` should become an Astro route.

Recommended next module:

- Deploy is acceptable from the current build.
- After deploy, monitor 404s, Search Console indexing/sitemap status, and CTA/contact clicks.
- Next content-maintenance window should deepen Germany A1 thin pages first: fees, test centers, retake policy, documents checklist, speaking topics, and the 30-day study plan.

## UI Sitewide Unity Follow-up Window - 2026-07-10

Role: UI design system and sitewide visual consistency owner.

Scope completed:

- Re-read `docs/PROJECT_CONTEXT.md`, `docs/CONTENT_MAP.md`, `docs/TASK_LOG.md`, current UI source, layout components, guide templates, Chinese pages, and the existing project scripts.
- Kept this window strictly to UI/display-layer work. No guide body rewrites, no article title edits, no article summary edits, no SEO title/meta description edits, no slug/route changes, no sitemap/robots/canonical changes, no package/deploy config changes, and no policy/fee/date/source claims were changed.
- Promoted English and Chinese Germany A1 route hubs from the standard narrow guide body width to the shared `route-hub-page` width so the hub pages feel more like route entry points while staying in the same visual system.
- Converted the Germany A1 hub's five core decision links into shared card styling so fees, test centers, retake, documents, and speaking entries look like intentional route actions instead of loose article links.
- Updated Chinese guide breadcrumbs and related-guide sections to reuse the same `guide-breadcrumb` and `guide-related` classes as English guide pages.
- Added small shared CSS refinements for route hub width and card behavior inside guide articles.

Files changed in this UI follow-up:

- `src/styles/global.css`
- `src/pages/germany-family-reunion-a1.astro`
- `src/pages/zh/germany-family-reunion-a1.astro`
- `src/components/ZhGuideLayout.astro`
- `docs/TASK_LOG.md`

Unified components / UI surfaces:

- Route hub page width: `route-hub-page`.
- Guide breadcrumbs: English and Chinese guide pages now share `guide-breadcrumb`.
- Related guides: English and Chinese guide pages now share `guide-related` and `guide-related-grid`.
- Route hub entry cards: Germany A1 core decision links now use the same `article-card` family as other guide cards.
- Mobile behavior remains governed by the existing global breakpoints for card grids, route grids, guide facets, search rows, and guide layout.

Homepage UI result:

- No new homepage changes were required in this follow-up. The current homepage already presents the route finder, Germany A1 primary route, coverage stats, Browse by route, Featured guides, and Latest updates inside the shared UI system.

Guides list UI result:

- No filter logic was changed. `/guides/` already uses the shared library header, popular routes, route pills, country/route/exam/level facets, search panel, route overview, guide cards, and empty state.

Guide detail UI result:

- English guide detail pages already use `GuideLayout.astro` with breadcrumbs, summary box, audience sections, TOC, official verification, common mistakes, related guides, last updated, disclaimer, and CTA.
- Chinese guide detail pages now reuse the same breadcrumb and related-guide visual classes, reducing the remaining mismatch between English and Chinese guide templates.

Germany A1 route page UI result:

- `/germany-family-reunion-a1/` and `/zh/germany-family-reunion-a1/` now use the wider route hub width.
- The English route hub's five high-priority decision entries now read as route cards/guide cards, making fees, test centers, retake, documents, and speaking topics easier to scan.

About / Legal UI result:

- No new About/Legal changes were required in this follow-up. Current About, Contact, legal, and 404 pages already use shared page shells and narrow guide article styling from the previous UI window.

Mobile fixes / checks:

- No hard-coded wide inline styles were found in the checked Astro pages.
- Static UI shell/mobile-risk check passed for homepage, guides index, representative English guide, English route hub, Chinese route hub, representative Chinese guide, About, Privacy, and Chinese homepage.
- Header, language switch, card grids, guide facets, search rows, route hub width, and guide breadcrumbs remain covered by global responsive CSS.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed, 79 pages generated.
- `npm run launch-check`: passed, 55 checks, READY.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

Remaining UI risks / human review:

- A real browser screenshot pass is still recommended before deployment sign-off, especially `/`, `/guides/`, `/guides/category/germany-a1/`, `/guides/goethe-a1-germany-family-reunion/`, `/germany-family-reunion-a1/`, `/zh/`, `/zh/germany-family-reunion-a1/`, and one Chinese guide page.
- Legacy root static files still coexist with Astro source; do not reconcile or delete them without a separate source-of-truth/deploy task.
- Some non-Germany guide bodies remain thin, but that is a content-depth issue, not a UI unification blocker.

Final recommendation:

- UI is ready to enter a final visual QA / deployment window, with human screenshot review as the next best step.

## Guides + SEO Follow-up Window - 2026-07-10

Role: Guides + SEO owner, focused on information architecture and metadata after the Germany A1 depth pass.

Scope completed:

- Re-checked `docs/PROJECT_CONTEXT.md`, `docs/CONTENT_MAP.md`, `docs/TASK_LOG.md`, current guide source files, guide list routes, guide category routes, guide template, sitemap/robots/canonical behavior, and launch scripts.
- Kept the existing Guides library architecture: `/guides/` remains the searchable/filterable library, `/guides/?category=xxx` remains a client-side filtering path, and `/guides/category/{category}/` is the indexable static category path.
- Made light SEO metadata edits only for six Germany A1 core guides; no article body rewrites and no new policy, fee, date, or exam-center claims were added.
- Updated `docs/CONTENT_MAP.md` for the changed Germany A1 guide titles and last-updated dates.

Files changed in this follow-up:

- `src/content/guides/german-a1-family-reunion-faq.md`
- `src/content/guides/goethe-a1-vs-telc-a1.md`
- `src/content/guides/german-family-reunion-language-requirement.md`
- `src/content/guides/goethe-a1-booking-mistakes.md`
- `src/content/guides/goethe-a1-30-day-study-plan.md`
- `src/content/guides/goethe-a1-germany-family-reunion.md`
- `docs/CONTENT_MAP.md`
- `docs/TASK_LOG.md`

Guides list / category result:

- `/guides/` displays all 49 current English guide entries from the content collection.
- `/guides/?category=xxx` filters in the browser and keeps canonical as `/guides/`, which avoids indexing many duplicate query URLs.
- Static category pages under `/guides/category/{category}/` are the indexable category aggregation pages, with their own H1, title, meta description, canonical URL, CollectionPage JSON-LD, and ItemList JSON-LD.
- The user-supplied `telc-deutsch` category label maps to the current project category slug `germany-telc`; no new duplicate slug was introduced.
- Country, route, exam, and level filters still rely on `src/data/guide-taxonomy.ts` inference, not first-class frontmatter fields.

Guide template / structured data result:

- Guide detail pages use `GuideLayout.astro` with breadcrumbs, H1, summary box, audience fit, non-fit, TOC, body slot, official verification, common mistakes, related guides, last updated, disclaimer, CTA, and footer.
- Guide detail pages emit Article and BreadcrumbList JSON-LD with published and modified dates.
- Category pages emit CollectionPage and ItemList JSON-LD.
- No fake ratings, reviews, prices, Course schema, or FAQPage schema were added.

Germany A1 internal-link result:

- `/germany-family-reunion-a1/` links to the core Germany A1 guides.
- Every Germany A1 guide receives a shared route-support module linking back to the Germany A1 hub and core guide set.
- Fees page links to test centers, booking mistakes, and booking timeline.
- Test centers page links to documents, Goethe A1 vs telc A1, and fees.
- Documents page links to booking mistakes, language requirement, and test centers.
- Retake page links to speaking, listening, study plan, and booking timeline.
- Speaking page links to study plan, listening practice, and retake.
- FAQ is linked from the shared Germany A1 route-support module and links to requirement, Goethe/telc comparison, and documents.
- Goethe A1 vs telc A1 links to booking mistakes, test centers, and documents.
- Language requirement links to the Goethe A1 route, Goethe A1 vs telc A1, and FAQ; this should be content-reviewed later if the desired next step is documents rather than FAQ.

Title / description optimized:

- `german-a1-family-reunion-faq`: title and description now clarify language-proof FAQ scope.
- `goethe-a1-vs-telc-a1`: title and description now specify German family reunion use and practical comparison dimensions.
- `german-family-reunion-language-requirement`: title and description now frame the page as a requirement guide with official verification.
- `goethe-a1-booking-mistakes`: title and description now describe booking-risk checks before payment.
- `goethe-a1-30-day-study-plan`: title and description now specify family reunion applicants, four-skill practice, official materials, and risk checks.
- `goethe-a1-germany-family-reunion`: title and description now specify visa-proof planning and official verification.

Remaining weak title candidates:

- `dutch-inburgering-a2-b1-for-integration-and-citize`
- `goethe-a1-listening-practice`
- `goethe-a1-pre-booking-checklist`
- `goethe-b1-difficulty-analysis`
- `goethe-b1-listening-deep-dive`
- `goethe-b1-mock-exam-routine`
- `goethe-b1-speaking-topics`
- `goethe-b1-writing-assessment`
- `languagecert-selt-uk-visa`
- `portuguese-ciple-a2-for-citizenship-and-residence`
- `portuguese-language-for-golden-visa-and-citizenshi`
- `telc-b1-b2-fees-and-test-centers`

Remaining weak description candidates:

- `cils-b1-cittadinanza-for-italian-citizenship`
- `cils-vs-celi-vs-plida-for-italian-citizenship`
- `dele-a2-ccse-spanish-citizenship`
- `dele-levels-spanish-citizenship`
- `delf-b1-b2-french-work-study`
- `dutch-inburgering-a2-b1-for-integration-and-citize`
- `goethe-a1-study-plan-working-adults`
- `goethe-b1-fees-and-booking`
- `goethe-b1-germany-settlement-work`
- `languagecert-selt-uk-visa`
- `portuguese-ciple-a2-for-citizenship-and-residence`
- `portuguese-language-for-golden-visa-and-citizenshi`
- `staatsexamen-nt2-for-work-and-higher-education`
- `tcf-irn-french-residence`
- `tef-canada-immigration`
- `testdaf-vs-goethe-dsh`
- `yki-finnish-citizenship`
- `yki-vs-other-finland-options`

Thin body candidates for content window:

- Highest priority non-Germany pages: `portuguese-ciple-a2-for-citizenship-and-residence`, `portuguese-language-for-golden-visa-and-citizenshi`, `staatsexamen-nt2-for-work-and-higher-education`, `cils-vs-celi-vs-plida-for-italian-citizenship`, `dutch-inburgering-a2-b1-for-integration-and-citize`, `tcf-canada-vs-tef`, `cils-b1-cittadinanza-for-italian-citizenship`, `delf-b1-b2-french-work-study`, `testdaf-levels-and-scoring`.
- Germany A1 pages still worth content deepening after the shared template support: `goethe-a1-vs-telc-a1`, `goethe-a1-30-day-study-plan`, `goethe-a1-official-links-practice-resources`, `german-family-reunion-language-requirement`, `goethe-a1-germany-family-reunion`, `goethe-a1-test-centers`.

No current gaps found in this audit:

- Missing official source: none detected in current guide bodies.
- Missing Related guides: none detected in current guide frontmatter.
- Missing Last updated: none detected in current guide frontmatter.

Possible duplicate / canonical risks:

- `/guides/?category=...` and `/guides/category/.../` overlap in user intent. Current handling is acceptable because query URLs canonicalize to `/guides/`, while static category pages are the indexable route pages.
- Legacy root `guides/*.html` and generated Astro guide pages still coexist. Do not remove legacy files without a separate source-of-truth/deployment task.
- `sitemap.xml` in the legacy root layer and generated `dist/sitemap-index.xml` still represent two layers. Current launch checks pass, but deployment source-of-truth should remain a separate task.

Sitemap / robots / canonical result:

- Generated Astro sitemap includes `/germany-family-reunion-a1/`, guides, Chinese generated pages, and static guide category pages.
- Generated sitemap excludes configured noindex legal pages.
- `public/robots.txt` points to `https://flowlight.me/sitemap-index.xml`.
- Guide detail canonical URLs point to `/guides/{slug}/`.
- Static category canonical URLs point to `/guides/category/{category}/`.
- Query-filtered `/guides/?category=...` URLs are not intended as separate indexable pages.

Artificial / human confirmation needed:

- Confirm whether `country`, `exam`, `level`, and source-check date should become formal frontmatter fields instead of inferred taxonomy.
- Confirm whether `language requirement` should link directly to `documents checklist` in frontmatter related guides, replacing or supplementing FAQ.
- Confirm whether the static-only `/do-i-need-german-a1.html` should become an Astro route.
- Re-check all current official source claims before a public publishing push involving fees, exam dates, certificate acceptance, local test centers, retake rules, or country-specific mission rules.

UI window status:

- A UI unification window has already run after the original Guides + SEO pass.
- Remaining UI work is not required before final QA, but a browser screenshot review of `/guides/`, `/guides/category/germany-a1/`, representative guide pages, and mobile filters would still be useful before public design review.

Final QA status:

- The project already has a later final QA log entry showing `npm run launch-check` passed with 55 checks and `READY`.
- Fresh follow-up verification after the metadata changes passed:
  - `npm run build`: passed, 79 pages generated.
  - `npm test`: passed.
  - `npm run launch-check`: passed, 55 checks, READY.
  - `npm run lint`: not available in `package.json`, so not run.
  - `npm run typecheck`: not available in `package.json`, so not run.

## Final QA / Deployment Readiness Window - 2026-07-09

Role: final quality check and release owner.

Deployment recommendation:

- Can deploy from the current Astro build output.
- Final automated launch status: `npm run launch-check` passed with 55 checks, 0 warnings, 0 failures, `READY`.

Fixes completed:

- Changed the shared guide CTA in `src/components/GuideCTA.astro` from the missing Astro homepage `/#waitlist` anchor to the real `/contact/` page.
- Added `tests/site.test.js` assertions so the guide CTA stays pointed at `/contact/` and does not regress to `/#waitlist`.

Commands run:

- `npm install`: passed, dependencies already up to date.
- `npm run dev -- --host 127.0.0.1 --port 4321`: initially blocked by local sandbox port permission, then passed after local network permission was granted.
- `npm run build`: passed, 79 pages generated.
- `npm test`: passed.
- `npm run launch-check`: passed, 55 checks, `READY`.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

Manual / browser checks completed:

- Checked these priority routes via the local dev server: `/`, `/guides/`, `/guides/goethe-a1-germany-family-reunion/`, `/germany-family-reunion-a1/`, `/about/`, `/editorial-policy/`, `/privacy-policy/`, `/cookie-policy/`, `/terms/`, `/affiliate-disclosure/`, `/zh/`, and `/zh/germany-family-reunion-a1/`.
- Desktop and 390px mobile viewport checks found no horizontal overflow on the checked pages.
- The checked pages each had one H1, canonical URL, meta description, Footer links, language switch, and working CTA/link targets.
- Internal-link launch check passed with no dead links.
- Generated sitemap and robots checks passed; generated robots points to the sitemap index.
- Duplicate page-title scan found no duplicate generated titles.

Trust / compliance result:

- About, Editorial Policy, Affiliate Disclosure, Privacy, Cookie, and Terms pages are accessible and use the shared site shell.
- Guide pages have template-level official-source reminders, last-updated cues, disclaimers, and structured data.
- Search for risky claims found no recommended "guaranteed pass", leaked-material, or copied-answer guidance; those terms appear in prohibitions/disclaimers.
- Current fee, date, policy, certificate-acceptance, and country-specific mission claims still require official-source recheck before any strong country-specific publishing push.

Remaining risks:

- No dedicated `lint` or `typecheck` scripts exist in `package.json`; launch confidence currently depends on Astro build, source tests, launch checks, and browser/static inspection.
- Some guide bodies remain thin even though template-level support adds trust cues. Shortest current bodies include Portuguese CIPLE A2, Goethe A1 retake policy, Goethe A1 test centers, Portuguese Golden Visa language, Staatsexamen NT2, German A1 documents checklist, CILS comparison, Goethe A1 speaking topics, Goethe A1 30-day plan, Dutch Inburgering, Goethe A1 vs telc A1, and Goethe A1 fees by country.
- Chinese coverage is intentionally partial: `/zh/`, the Chinese Germany A1 hub, and five Chinese core guides exist; non-Germany Chinese routes and secondary Germany A1 pages are not fully localized.
- Legacy root static files still coexist with Astro source and generated output. Do not delete or rewire them without a separate source-of-truth/deploy task.

Pages needing human review:

- `/guides/goethe-a1-fees-by-country/`
- `/guides/goethe-a1-test-centers/`
- `/guides/goethe-a1-retake-policy/`
- `/guides/german-a1-documents-checklist/`
- `/guides/goethe-a1-speaking-topics/`
- `/guides/portuguese-ciple-a2-for-citizenship-and-residence/`
- `/guides/dutch-inburgering-a2-b1-for-integration-and-citize/`
- `/zh/` and `/zh/germany-family-reunion-a1/` for Chinese-market copy fit.

Official-source verification needed:

- Current German mission rules by applicant country or appointment location.
- Whether A1 applies, and which exemptions may apply, for the user's exact family reunion case.
- Whether Goethe A1, telc A1, or other A1 certificates are accepted by the responsible authority.
- Current Goethe/telc local fees, dates, ID rules, cancellation rules, retake rules, result timing, and certificate delivery.
- Current Portugal, Netherlands, Italy, Spain, France, Finland, UK, and Canada official pages before expanding non-Germany routes.

Recommended next module:

- Maintain the Germany A1 cluster first, especially fees, test centers, retake policy, documents checklist, and speaking topics.
- A new window is recommended for content expansion rather than continuing in this QA window.

## Chinese Core Path Window - 2026-07-09

Role: Chinese site and internationalization owner.

Scope completed:

- Reworked `src/pages/zh/index.astro` so `/zh/` points first to the Chinese Germany A1 path instead of pulling English featured guide cards into the core Chinese journey.
- Added `src/pages/zh/germany-family-reunion-a1.astro` as the Chinese Germany A1 family reunion topic page.
- Added five Chinese core Germany A1 guide pages:
  - `/zh/guides/german-family-reunion-language-requirement/`
  - `/zh/guides/goethe-a1-vs-telc-a1/`
  - `/zh/guides/goethe-a1-booking-mistakes/`
  - `/zh/guides/german-a1-documents-checklist/`
  - `/zh/guides/goethe-a1-30-day-study-plan/`
- Added shared Chinese guide data in `src/data/zh-germany-a1.ts`.
- Added shared Chinese guide wrapper in `src/components/ZhGuideLayout.astro` with `zh-CN`, canonical URLs, hreflang alternates, Article JSON-LD, official-source reminders, related Chinese guides, and compliance disclaimer.
- Updated `src/components/Header.astro` so the Chinese navigation uses Chinese entry points and available English/Chinese guide translations switch directly between paired pages.
- Updated `tests/site.test.js` and `scripts/launch-check.js` to cover the Chinese hub, five Chinese guides, zh-CN metadata, canonical/hreflang, Chinese navigation, language switching, and official-check reminders.

Chinese content still not complete:

- The Chinese site is not a full translation of every English page.
- Non-Germany routes still point to the English guide library or English route pages.
- Germany A1 Chinese coverage now has the core path, but secondary pages such as fees by country, test centers, retake policy, speaking topics, listening practice, official resources, FAQ, and working-adult study plan are still not fully Chinese.

Language switching:

- `/zh/` switches to `/`.
- `/zh/germany-family-reunion-a1/` switches to `/germany-family-reunion-a1/`.
- The five Chinese core guide pages switch to their English guide equivalents, and the matching English guide pages switch back to the Chinese versions.
- English pages without a Chinese equivalent still send users to `/zh/` as the Chinese homepage.

Chinese SEO completed:

- Chinese homepage keeps `zh-CN`, canonical URL, hreflang alternates, and WebSite JSON-LD.
- Chinese topic page has its own title, meta description, canonical URL, hreflang alternates, and FAQPage JSON-LD.
- Five Chinese guide pages have independent titles, meta descriptions, canonical URLs, hreflang alternates, and Article JSON-LD.
- Generated sitemap includes the Chinese generated pages through Astro sitemap generation.

Manual policy checks still needed before treating claims as current:

- Current German mission requirements for the applicant's country or appointment location.
- Whether A1 applies to the user's exact family reunion case and whether an exemption may apply.
- Whether Goethe A1, telc A1, or another certificate is accepted by the responsible authority.
- Current Goethe/telc local fees, exam dates, ID rules, cancellation rules, retake rules, result timing, certificate delivery, and document requirements.
- Any country-specific Chinese applicant instructions from the German mission in China or the responsible application center.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed, 79 pages generated.
- `npm run launch-check`: passed, 55 checks, READY.

## UI Design System + Sitewide Visual Unity Window - 2026-07-09

Role: UI design system and sitewide visual consistency owner.

Scope completed:

- Expanded `src/styles/global.css` into the shared UI layer for page shells, narrow content pages, section headers, card grids, route cards, stat cards, badges/tags, primary/secondary buttons, route finder panels, library panels, guide filters, search controls, and mobile breakpoints.
- Reworked `src/pages/index.astro` so the homepage reads as a route-selection tool: clearer hero, prominent Exam Route Finder, Germany A1 as the primary route, professional coverage stats, route browsing before editorial guide lists, and latest updates pushed lower.
- Reworked `src/pages/guides/index.astro` so `/guides/` reads as a guide library: shared library header, popular routes, route filter pills, country/route/exam/level facets, search panel, route overview, unified guide cards, filter status, and empty-state behavior.
- Unified static route category pages in `src/pages/guides/category/[category].astro` with the same library header and guide card grid.
- Unified `src/pages/germany-family-reunion-a1.astro` with the shared page shell, narrow guide article width, shared guide grid, and shared CTA styling.
- Unified `src/pages/zh/index.astro` with the same hero, stat grid, feature-route panel, section headers, and route cards used by the English homepage.
- Unified About, Contact, legal, and 404 page layouts through `page-shell`, `narrow-page`, and shared guide article styling.

Files changed in this UI window:

- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/guides/index.astro`
- `src/pages/guides/category/[category].astro`
- `src/pages/germany-family-reunion-a1.astro`
- `src/pages/zh/index.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/privacy-policy.astro`
- `src/pages/cookie-policy.astro`
- `src/pages/terms.astro`
- `src/pages/editorial-policy.astro`
- `src/pages/affiliate-disclosure.astro`
- `src/pages/404.astro`

Mobile fixes:

- Added shared small-screen rules so route finder, feature route, card grids, stat grids, guide facets, and guide search collapse to one column.
- Kept header navigation horizontally scrollable on small screens while preserving the language switch outside the nav row.
- Standardized guide/legal/route body width to avoid hard-coded wide layouts.
- Removed remaining hard-coded inline widths from the checked Astro pages, except no content-strategy or legacy static layer changes were made.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed, 73 pages generated.
- `npm run launch-check`: passed, 53 checks, READY.
- Static UI shell/mobile-risk check passed for homepage, guides index, representative guide detail, Germany A1 route hub, About, Privacy, and Chinese homepage.

Pages or areas still worth a later dedicated pass:

- Legacy root HTML/CSS files remain outside the Astro UI system and should only be reconciled in a separate source-of-truth task.
- Individual non-Germany guide bodies still vary in depth and structure; this window unified the wrapper, not the 49 Markdown bodies.
- A live browser screenshot pass would still be useful before a public design review; local preview binding was blocked by the current sandbox, so this window used build output and static risk checks instead.

## Guides + SEO Window - 2026-07-09

Role: Guides list, guide template, and SEO owner.

Scope completed:

- Added shared guide taxonomy in `src/data/guide-taxonomy.ts` for route, country, exam, level, route descriptions, and popular-route flags.
- Upgraded `/guides/` from a simple article list into a guide library with popular routes, route overview, search, route/category filter pills, and country / route / exam / level faceted filters.
- Kept `/guides/?category=xxx` working as a client-side filter path while adding static indexable category pages at `/guides/category/{category}/`.
- Expanded guide cards through `src/components/ArticleCard.astro` so cards show title, short description, country tag, route tag, exam tag, level tag, last updated, related route, reading time, and CTA.
- Standardized `src/layouts/GuideLayout.astro` with template-level Summary, Who this guide is for, Who this guide is not for, On this page, main content, Official verification, Common mistakes, Related guides, Last updated, Disclaimer, CTA, and global footer.
- Updated guide breadcrumbs and same-route backlinks to point to real static category pages instead of homepage anchors or query-only route views.
- Added `ogType` support in `src/layouts/BaseLayout.astro` and set guide pages to `og:type=article`.
- Added `CollectionPage` and `ItemList` JSON-LD for each static guide category page.
- Updated `scripts/launch-check.js` so generated category pages are checked as collection pages, while guide detail pages remain checked for Article/BreadcrumbList JSON-LD, trust cues, and same-route backlinks.

Filtering issues fixed:

- `/guides/?category=xxx` still filters the visible list.
- Search now works together with category, country, exam, and level filters.
- Empty state remains visible when no guide matches.
- Mobile filters collapse to a single-column control stack.
- Static category pages give SEO and no-JavaScript users a real route collection page.

SEO optimized:

- Guide detail pages now emit article Open Graph type.
- Static category pages have canonical URLs, meta descriptions, CollectionPage JSON-LD, and ItemList JSON-LD.
- Guide detail internal links now point to `/guides/category/{category}/`.
- Generated sitemap now includes the new static category pages through Astro sitemap generation.
- Launch checks continue to verify canonical URLs, H1 count, useful meta descriptions, guide structured data, sitemap inclusion, robots, internal links, and noindex legal-page sitemap filtering.

Guide template changes:

- Template-level sections now cover summary, audience fit, non-fit, official verification, common mistakes, last updated, disclaimer, related guides, CTA, and footer.
- Existing Markdown bodies were not rewritten in this window.
- Germany A1 body depth and shared Germany A1 route-support content were left intact.

Pages still needing a content window:

- Older short guides outside the Germany A1 model route still need page-specific depth, examples, official-source tables, and clearer route decision flows.
- Non-Germany category pages are now indexable but still mostly depend on the current short guide bodies.
- Category-level intro copy can be expanded later if a route becomes a commercial/content priority.

Pages still needing a UI window:

- Visual polish for the denser `/guides/` filters and card grid should be checked manually on mobile.
- Static category pages use the existing simple guide-list style; they can later receive a richer category hub layout.
- Homepage, Chinese homepage, and Germany A1 hub were intentionally not redesigned in this window.

Verification completed:

- `npm test`: passed.
- `npm run launch-check`: passed, 53 checks, READY.

## Germany A1 Content Cluster Window - 2026-07-09

Role: Germany A1 Family Reunion topic owner.

Scope completed:

- Reworked the Astro route hub at `src/pages/germany-family-reunion-a1.astro` for `/germany-family-reunion-a1/`.
- Added a Germany A1-only guide support module at `src/components/GermanyA1RouteSupport.astro`.
- Rendered that module from `src/pages/guides/[slug].astro` only when `category: "germany-a1"`.
- Updated Germany A1 guide `related` metadata and `updatedDate` values for the current cluster.
- Added source-level assertions in `tests/site.test.js` so the Germany A1 support module and core links stay covered.

Germany A1 pages changed:

- `/germany-family-reunion-a1/` route hub.
- All `category: "germany-a1"` Astro guides through the shared route-support module.
- Frontmatter updated in: `german-family-reunion-language-requirement`, `goethe-a1-germany-family-reunion`, `goethe-a1-vs-telc-a1`, `goethe-a1-booking-mistakes`, `german-a1-documents-checklist`, `goethe-a1-pre-booking-checklist`, `german-a1-exam-booking-timeline`, `goethe-a1-test-centers`, `goethe-a1-fees-by-country`, `goethe-a1-30-day-study-plan`, `goethe-a1-study-plan-working-adults`, `goethe-a1-speaking-topics`, `goethe-a1-listening-practice`, `goethe-a1-official-links-practice-resources`, `goethe-a1-retake-policy`, and `german-a1-family-reunion-faq`.

Article enhancements added:

- Each Germany A1 guide now receives visible sections for Quick answer, Who this guide is for, Who this guide is not for, What to verify officially, Common mistakes, Step-by-step next action, Related guides, Official sources, Last updated, and Disclaimer.
- The support module avoids invented fees, dates, pass guarantees, and certificate-acceptance promises.
- The module explicitly warns against leaked materials, copied real exam answers, and guaranteed-pass claims.
- The hub now covers route overview, who needs A1, commonly used exams, Goethe A1 vs telc A1, booking/test-center guidance, documents checklist, study plan, retake rules, FAQ, all Germany A1 guides, official verification reminder, and the Start Germany A1 route CTA.

Internal links added or strengthened:

- Requirement check now points toward the Goethe A1 route and Goethe A1 vs telc A1.
- Goethe A1 route now points toward Goethe vs telc and the pre-booking checklist.
- Goethe vs telc now points toward booking mistakes, test centers, and documents.
- Booking mistakes and pre-booking checklist now point toward documents and timeline checks.
- Documents and timeline pages are tied to test-center, booking, and retake planning.
- Study plan pages now point to speaking, listening, and official practice resources.
- Every Germany A1 guide links back to `/germany-family-reunion-a1/` through the shared support module.
- FAQ is included in the shared core guide list alongside all core Germany A1 pages.

Thin or still-weaker pages:

- Individual older short guides such as `goethe-a1-fees-by-country`, `goethe-a1-test-centers`, `goethe-a1-retake-policy`, `goethe-a1-speaking-topics`, and `german-a1-documents-checklist` still have short original bodies. The shared module improves consistency, but these could later receive page-specific tables, examples, and decision flows.
- There is still no Astro source route for `/do-i-need-german-a1.html`; it remains a legacy/static helper.
- Chinese guide coverage remains partial and outside this Germany A1 English cluster pass.

Manual official verification needed:

- Current German mission rules for the applicant's country or appointment location.
- Whether Goethe A1, telc A1, or another A1 certificate is accepted for a specific case.
- Current Goethe or telc local fees, dates, result timing, ID rules, cancellation rules, and retake rules.
- Current BAMF, Auswaertiges Amt, Goethe-Institut, telc, and local test-center pages before publishing country-specific claims.

## Current Check Summary

Role: project map and context compression window.

Scope completed:

- Scanned technology stack, directory structure, routes, content source, guide layout, categories, SEO, multilingual implementation, CTA/waitlist behavior, build scripts, and deploy scripts.
- Created `docs/PROJECT_CONTEXT.md`.
- Created `docs/CONTENT_MAP.md`.
- Updated this `docs/TASK_LOG.md` with findings and next-window boundaries.

Verification completed:

- `npm run build`: passed, 61 pages generated.
- `npm test`: passed.
- `npm run launch-check`: passed, 53 checks, READY.

Working-tree note:

- Many existing modified and untracked files were already present before this map update. Future windows must check `git status --short` and avoid reverting unrelated work.

## Findings By Area

### 页面结构问题

- Homepage is functional but currently behaves mostly like a content index: hero, featured guides, route cards, latest guides.
- It lacks a stronger product/action surface such as an actual route finder, waitlist module, or guided decision entry in the Astro layer.
- `germany-family-reunion-a1.astro` is a route hub but uses page-specific inline styles and does not fully reuse the guide layout.
- `do-i-need-german-a1.html` exists only as a root static page, not as an Astro source route.

### 分类筛选问题

- `/guides/?category=xxx` does filter in normal browsers because `src/pages/guides/index.astro` reads `URLSearchParams` and hides cards client-side.
- The static HTML itself is not pre-filtered by category. With JavaScript unavailable, all guides remain listed and a fallback message appears.
- Category definitions are duplicated between `src/pages/index.astro`, `src/pages/zh/index.astro`, and `src/pages/guides/index.astro`.
- `country`, `exam`, and `level` are not structured frontmatter fields, so future filtering by those dimensions would require inference or schema expansion.

### 中文入口问题

- `/zh/` is a real Chinese homepage with `lang="zh-CN"` and hreflang.
- It is not a full Chinese site. Most guide pages remain English.
- Chinese homepage card titles/descriptions are pulled from English guide frontmatter, so parts of the Chinese page still display English text.
- Header on English article pages labels the language switch as `中文首页`, which is honest but confirms there is no article-level Chinese translation.

### waitlist 链接问题

- `GuideCTA.astro` points `Join waitlist` to `/#waitlist`.
- Generated Astro homepage does not contain an element with `id="waitlist"`.
- Root legacy `index.html` has a waitlist section and form, but the Astro homepage does not.
- Root `app.js` handles the legacy waitlist in demo/local mode; no real email submission endpoint is connected in the Astro layer.
- Docs mention Formspree / `YOUR_FORM_ID`, but the current generated Astro route has no real form target.

### guide 模板问题

- All generated guide pages share `GuideLayout.astro`, including H1, summary, trust bar, breadcrumbs, TOC, related guides, route backlink, CTA, and JSON-LD.
- Article body structure is not normalized. Some pages use quick answer/checklist/workflow structures; others are shorter or older guide bodies.
- The old 15-section guide template exists in docs and legacy data, but it is not enforced as Markdown structure in the Astro content collection.
- `updatedDate` is structured in frontmatter and used by the layout and sitemap enrichment.

### SEO 问题

- Core SEO implementation is healthy: canonical URLs, meta descriptions, hreflang for homepages, sitemap index, guide lastmod, guide JSON-LD, guide index JSON-LD, robots.
- `public/robots.txt` points to `sitemap-index.xml`; root legacy `robots.txt` points to `sitemap.xml`. This split should be reconciled only in a dedicated deploy/source-of-truth task.
- Legal/noindex pages are filtered out of generated sitemap, but `BaseLayout` only emits noindex when pages pass `noindex`; verify each intended noindex page if doing SEO hardening.
- `og:type` is always `website` in `BaseLayout`, including articles; this is acceptable but can be improved later.

### UI 统一问题

- Main visual system is centralized in `src/styles/global.css`.
- Some Astro pages use inline styles and local `<style>` blocks, especially homepage, guide index, Chinese homepage, and Germany A1 hub.
- The English homepage, Chinese homepage, guide index, and guide pages share cards but not a fully unified page composition pattern.
- Footer is complete and stable, with About, Contact, Editorial Policy, Privacy Policy, Cookie Policy, Terms, and Affiliate Disclosure.

### 移动端问题

- Launch check confirms guide tables and long links have mobile overflow protection.
- Guide index search row collapses on small screens.
- Chinese homepage focus block collapses on small screens.
- Still needs visual/manual mobile QA for dense card grids, sticky TOC behavior, and long translated labels.

### 构建风险

- Current build passes.
- Build relies on `scripts/enrich-sitemap-lastmod.js` after Astro build; do not remove `postbuild` without replacing lastmod behavior.
- `launch-check` checks both generated Astro output and legacy static pages. Removing legacy files can break launch readiness.
- The content collection does not currently validate `country`, `exam`, `level`, or source-check date fields.
- Existing worktree contains many modified/untracked files; accidental revert is the main operational risk.

##重点检查结果

| Check | Result |
|---|---|
| `/guides/?category=xxx` 是否真的过滤 | Yes with JavaScript. It is client-side filtering, not separate static category pages. |
| 中文入口是否真正中文化 | Partially. `/zh/` is Chinese, but guide cards still pull English frontmatter and guides are mostly English. |
| Join waitlist 是否有真实目标页 | No in Astro. CTA points to `/#waitlist`, but Astro homepage has no `id="waitlist"`. |
| guide 模板是否统一 | Wrapper is unified; article body structure is not fully standardized. |
| last updated 是否来自数据源 | Yes for guides: `updatedDate` frontmatter feeds layout and sitemap lastmod. |
| 首页是否过于像文章列表 | Somewhat. It is currently a hero plus guide/category lists, not a strong interactive product surface. |
| Germany A1 是否已经形成专题集群 | Yes. 16 Germany A1 guides plus a route hub. |
| Footer 链接是否完整 | Yes. Legal/trust links are present and launch check passes affiliate footer link. |
| sitemap / robots 是否存在 | Yes. Generated `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, and `dist/robots.txt` exist. |
| 项目是否能正常 build | Yes. `npm run build`, `npm test`, and `npm run launch-check` passed. |

## 当前最重要的 10 个问题

1. Astro guide CTA links to a missing `/#waitlist` anchor.
2. Astro layer has no real waitlist form or email capture target.
3. Chinese homepage is only partially Chinese because guide cards reuse English frontmatter.
4. There is no article-level Chinese guide translation system.
5. Category filters are client-side only; no dedicated static category landing pages.
6. Category definitions are duplicated across multiple pages.
7. `country`, `exam`, and `level` are inferred, not structured content fields.
8. Guide body structure is inconsistent across older and newer guides.
9. Homepage still reads more like a guide index than a decision/navigation product.
10. Legacy static layer and Astro source layer coexist, creating source-of-truth risk.

## Recommended Next 6 Windows

### Window 1: Waitlist / CTA Reality Check

Goal:

- Make the current `Join waitlist` path honest and functional.

Suggested file range:

- `src/components/GuideCTA.astro`
- `src/pages/index.astro`
- `src/pages/contact.astro`
- Possibly `src/styles/global.css`
- Tests only if behavior is asserted.

Do not touch:

- Deploy scripts.
- Guide content bodies.

Human confirmation needed:

- Should waitlist collect real emails now?
- Which provider should be used: Formspree, Mailchimp, Google Forms, custom endpoint, or simple contact link?
- What user promise should the CTA make?

### Window 2: Chinese Entry Quality

Goal:

- Make `/zh/` feel intentionally Chinese, not a mixed-language index.

Suggested file range:

- `src/pages/zh/index.astro`
- Optional small structured mapping in the page itself or a new data helper.

Do not touch:

- English guide body content.
- Global routing unless a full i18n task is approved.

Human confirmation needed:

- Is `/zh/` only a Chinese landing page, or should top Germany A1 guides be translated too?

### Window 3: Germany A1 Cluster Depth

Goal:

- Tighten Germany A1 as the flagship topic cluster.

Suggested file range:

- `src/pages/germany-family-reunion-a1.astro`
- `src/content/guides/*a1*.md`
- `src/content/guides/german-*.md`
- Related tests if routes/links change.

Do not touch:

- Non-Germany clusters.
- Deploy config.

Human confirmation needed:

- Should `do-i-need-german-a1.html` become an Astro route?
- Which Germany A1 user journey is the priority: requirement check, booking, prep, documents, or retake risk?

### Window 4: Guide Template Normalization

Goal:

- Define a practical guide body standard without rewriting every article at once.

Suggested file range:

- `docs/CONTENT_WORKFLOW.md`
- `src/layouts/GuideLayout.astro`
- A small sample set in `src/content/guides/`
- `tests/site.test.js` only for stable rules.

Do not touch:

- All guides in one large rewrite.

Human confirmation needed:

- Should the canonical body template be strict 15-section, or flexible route-specific sections?

### Window 5: Content Schema / Content Map Upgrade

Goal:

- Decide whether `country`, `exam`, `level`, and source-check date should become first-class frontmatter.

Suggested file range:

- `src/content.config.ts`
- `src/content/guides/*.md` in small batches.
- `src/pages/guides/index.astro` only if new filters are added.
- `docs/CONTENT_MAP.md`.

Do not touch:

- UI redesign.

Human confirmation needed:

- Which filters matter commercially: route, country, exam, level, language, or user goal?

### Window 6: Legacy / Astro Source-of-Truth Audit

Goal:

- Clarify what is deployed and what should remain as compatibility artifacts.

Suggested file range:

- `README.md`
- `CLAUDE.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/LAUNCH_CHECKLIST.md`
- Maybe tests/launch checks after confirmation.

Do not touch:

- Delete no legacy files unless explicitly approved.
- Deploy config unless explicitly approved.

Human confirmation needed:

- Is the live server serving Astro `dist/` or legacy root files?
- Should old root HTML pages remain permanently, redirect, or be regenerated from Astro?

## Germany A1 Decision Guides Window - 2026-07-10

Role: Germany A1 Family Reunion content owner.

Scope completed:

- Deepened the five Germany A1 decision guides without changing the UI system, route structure, Chinese site, or non-Germany content.
- Reused the existing Germany A1 route-support module for the shared Quick answer, audience fit, official-verification, common-mistake, next-step, related-guide, last-updated, official-source, and disclaimer sections.
- Added source-level tests that preserve the five decision-guide structures and their next-step links.

Pages enhanced:

- `goethe-a1-fees-by-country`: replaced a fixed-fee-style checklist with a local official-verification workflow; covers changing fee factors, payment/refund/rescheduling checks, and the distinction between course and exam fees.
- `goethe-a1-test-centers`: defines an official centre as one shown or confirmed through Goethe or telc; adds exact-exam checks, a centre checklist, and booking risks.
- `goethe-a1-retake-policy`: starts from the score report and local rule rather than promising a resit pattern; adds targeted review, two-week and four-week recovery plans, and a visa-timeline warning.
- `german-a1-documents-checklist`: separates booking, test-day, and visa-file materials; distinguishes original ID, booking proof, official certificate, and local mission requirements.
- `goethe-a1-speaking-topics`: frames topics as adaptable practice areas rather than predictions; adds a safe practice routine, common errors, and a seven-day reset without leaked or copied exam content.

Internal links added or strengthened:

- Fees -> test centres and booking mistakes.
- Test centres -> documents checklist, Goethe vs telc, and fees.
- Documents checklist -> language requirement, test centres, and booking mistakes.
- Retake -> speaking, listening, study plan, and booking timeline.
- Speaking -> study plan, listening, and retake.
- All five pages continue to link back to `/germany-family-reunion-a1/` through the shared Germany A1 route-support module; the hub already lists all five core pages.

Manual official verification still required:

- Current local Goethe/telc fee, payment deadline, refund, and rescheduling rules.
- Whether a local centre offers the exact adult A1 exam on the required date, its ID rules, result timing, and certificate delivery process.
- Local retake or partial-resit rules for the exact examination and test centre.
- The responsible German mission's current certificate-acceptance and visa-document checklist for the applicant's individual case.

Fact-risk assessment:

- No fees, dates, centre lists, acceptance promises, or fixed retake rules were added.
- The A1 examination and skill descriptions are linked to official Goethe information; changing local conditions are explicitly directed back to the responsible official source.

Remaining thin Germany A1 pages:

- `goethe-a1-germany-family-reunion`, `goethe-a1-vs-telc-a1`, `goethe-a1-booking-mistakes`, `goethe-a1-pre-booking-checklist`, and `german-a1-exam-booking-timeline` could be deepened next, but they remain outside this five-page maintenance window.

Recommended next module:

- Use a Guides + SEO window next to refine search intent, title/description fit, and structured internal-link coverage for this completed Germany A1 decision cluster.
- Use the final quality-check window after that SEO pass; a UI window is not currently necessary.

## Germany A1 Guides + SEO Window - 2026-07-10

Role: Germany A1 search-intent and internal-link owner.

Scope completed:

- Refined the five Germany A1 decision-guide titles and meta descriptions so the search result clearly states the next decision: local fee, official centre, retake plan, three document stages, or safe speaking practice.
- Added a compact `Five core decision guides` section near the top of `/germany-family-reunion-a1/`, giving each core page a clear contextual link before the longer route sections.
- Updated the hub's title, description, and last-updated signal to reflect its stronger requirement-to-booking route role.
- Added source-level assertions for the five focused titles and the hub's five direct core-guide links.

SEO boundaries retained:

- No keyword-stuffed copy, new route, schema change, fee/date claim, centre list, or certificate-acceptance promise was added.
- Existing Article, BreadcrumbList, canonical, sitemap, guide-category backlink, and official-source trust cues remain the technical SEO layer for these pages.

Recommended next module:

- Proceed to the final quality-check window for generated-page copy, heading hierarchy, metadata, internal-link targets, and mobile rendering. A separate UI window is still not required.

## Germany A1 Thin-Page Maintenance Window - 2026-07-10

Role: Germany A1 practical-route content owner.

Scope completed:

- Maintained six Germany A1 guides only: fees, test centres, retake, documents, speaking, and the 30-day plan.
- Kept the existing shared trust and disclaimer structure; no UI, route, Chinese, legal, deployment, or non-Germany files were changed.

Practical depth added:

- Fees: a comparable personal fee record and a safe response when two local listings disagree.
- Test centres: a concise official-centre enquiry path when a local page is unclear.
- Retake: a decision rule for choosing a shorter or longer recovery period instead of automatically booking the earliest date.
- Documents: a private record-keeping step and a warning against sharing sensitive scans through unverified channels.
- Speaking: a repeatable ten-minute drill alongside the existing seven-day reset.
- 30-day plan: replaced the thin four-week outline with daily minimum practice, four staged date ranges, a weekly review, a realistic extension rule, and explicit speaking/listening/retake next steps.

Internal links strengthened:

- The 30-day plan now points to speaking, listening, retake, and the Germany A1 hub.
- The existing fee, centre, retake, documents, and speaking progression remains intact.

Fact-risk assessment:

- No fees, dates, test-centre lists, retake entitlement, certificate-acceptance promise, or pass guarantee was added.
- Local conditions and visa requirements continue to require official-source verification.

Remaining thinner Germany A1 guides:

- `goethe-a1-germany-family-reunion`, `goethe-a1-vs-telc-a1`, `goethe-a1-booking-mistakes`, `goethe-a1-pre-booking-checklist`, and `german-a1-exam-booking-timeline` remain suitable candidates for a later content-only window.

Recommended next module:

- Run final quality checks on the completed six-page route, then decide whether the next content window should deepen exam-choice or booking-timeline pages.

## Germany A1 Exam Choice And Booking Window - 2026-07-10

Role: Germany A1 route-decision and booking-risk content owner.

Scope completed:

- Deepened five Germany A1 guides only: Goethe A1 route, Goethe vs telc, booking mistakes, pre-booking checklist, and booking timeline.
- Connected the route as requirement -> acceptance and provider choice -> official centre -> payment checks -> document and timing plan.

Pages enhanced:

- `goethe-a1-germany-family-reunion`: separates the stable Goethe exam description from case-specific mission acceptance and sends users to the requirement, comparison, and pre-booking decisions in order.
- `goethe-a1-vs-telc-a1`: replaces brand preference with four checks: acceptance, availability, process, and total cost.
- `goethe-a1-booking-mistakes`: removes unsupported claims about centre frequency, universal ID practice, fixed lead times, and modular scheduling; adds a factual stop-and-check record and local-resolution path.
- `goethe-a1-pre-booking-checklist`: adds hard stop conditions and one evidence record while keeping certificate acceptance, centre, payment, ID, and preparation checks separate.
- `german-a1-exam-booking-timeline`: adds backward planning from the document deadline and an explicit rule for unknown timings rather than assuming later submission or a usable retake date.

Internal links strengthened:

- Goethe route -> requirement -> Goethe vs telc -> pre-booking checklist.
- Goethe vs telc -> test centres -> booking mistakes -> documents.
- Booking mistakes and pre-booking checklist -> documents, centres, and timeline.
- Timeline -> fees, centres, documents, retake, and requirement check.

Fact-risk assessment:

- No universal booking lead time, centre schedule, ID list, result date, acceptance promise, refund entitlement, modular resit claim, fee, or visa outcome was added.
- Goethe/telc product descriptions use official overview pages; every local or case-specific point remains an official-centre or mission verification task.

Remaining Germany A1 content candidates:

- The central cluster is now materially deeper. A later page-specific pass could refine the FAQ, listening practice, official practice resources, and working-adult study plan, but no additional route page is currently thin enough to require immediate expansion.

Recommended next module:

- Run final quality checks on the complete Germany A1 cluster, including generated-page heading order, metadata, internal links, and narrow/mobile reading surfaces.

## Germany A1 Support Guides Window - 2026-07-10

Role: Germany A1 preparation and source-navigation content owner.

Scope completed:

- Maintained four Germany A1 support guides only: FAQ, listening practice, official resources, and working-adult study plan.
- Kept the existing shared guide structure and did not touch UI, route generation, Chinese pages, non-Germany content, legal pages, or deployment configuration.

Pages enhanced:

- `german-a1-family-reunion-faq`: replaces generic or overcertain answers with safe routing to requirement, provider choice, centre, timeline, documents, and preparation pages.
- `goethe-a1-listening-practice`: replaces unsupported fixed exam-format claims with a three-pass daily drill, error diagnosis, official-format-first practice, and a weekly checkpoint.
- `goethe-a1-official-links-practice-resources`: maps each reader question to the authority, provider, local centre, or practice source that owns the answer.
- `goethe-a1-study-plan-working-adults`: replaces fixed daily workload and outcome claims with flexible weekday/review blocks, an eight-week progression, and a clear extension rule.

Fact-risk cleanup:

- Removed fixed result-time, study-hour, study-duration, partial-resit, provider-acceptance, and listening-procedure claims where they were not safe as universal statements.
- Retained official Goethe, BAMF, telc, and German Federal Foreign Office links; country-, case-, and centre-specific details remain official verification tasks.

Internal links strengthened:

- FAQ now routes to requirement, exam choice, centre, fee, timeline, documents, 30-day plan, working-adult plan, and the hub.
- Listening, official resources, and working-adult plan now cross-link to speaking, 30-day preparation, retake, and pre-booking decisions.

Cluster status:

- The English Germany A1 content cluster is now internally connected and has route-specific depth across requirement, provider choice, booking, documents, fees, timing, preparation, retake, and FAQ support.
- Remaining work is quality assurance and manual official-source review rather than another broad content-expansion window.

Recommended next module:

- Run the final Germany A1 quality-check window, including generated metadata, internal links, mobile reading, and the official-source review list.

## Sitewide Content-Depth Window - 2026-07-10

Role: route-decision content owner.

Scope completed:

- Deepened the live Astro content layer only. No deployment configuration, source-of-truth decision, package configuration, sitemap/canonical behavior, or CSS/UI system was changed.
- Repositioned the site from an exam-description library toward a route-decision product: readers now start with the receiving authority, exact proof, local booking conditions, and document timeline rather than an assumed exam choice.
- Added a shared, route-specific decision layer to every English guide: what the page helps decide, three official-first checks tailored to its route, and a concrete next action into the relevant route cluster.
- Added the equivalent audience boundary and next-action sequence to all five Chinese core guides.

Homepage and library result:

- `/` now states the route-decision proposition in the hero, explains how to use VisaLang, distinguishes Germany A1 as the full route from non-Germany starter routes, adds a five-point pre-payment verification checklist, a Chinese route entry, and a correction path.
- `/guides/` and every indexable category page now explain that the library is for route selection, identify Germany A1 as the deepest route, label other categories as starter overviews, and send no-result searches back to an authority-first decision.

Germany A1 route result:

- `/germany-family-reunion-a1/` now follows a clear eight-step decision sequence: confirm A1 applicability; choose accepted proof; compare Goethe and telc; check fees and official centres; book safely; prepare documents; build a study plan; and retain a retake buffer.
- The existing five core guides remain the route’s concrete actions: local fees, official centre verification, retake planning, three-stage documents, and safe speaking practice. Their existing detailed sections already cover the required local-fee, centre, retake, materials, and no-leak practice constraints; this window makes their role in the route explicit on every generated page.

Non-Germany route result:

- Germany B1+ guides now frame settlement/work/citizenship decisions as authority-specific, distinguish B1 risk from A1, and route readers into the B1 cluster.
- TestDaF guides now lead with target programme and university language requirements, TDN/alternative-proof verification, and backward planning from application deadlines.
- telc Deutsch guides now distinguish exact telc variants, require authority/employer/professional-body confirmation, and direct readers to authorised-centre checks.
- UK, Canada, Italy, Spain, France, Finland, Netherlands, and Portugal guides now explicitly operate as starter routes, with the relevant authority, exact test, local centre, and time-sensitive official check in the decision sequence.

Chinese and trust-page result:

- `/zh/` and `/zh/germany-family-reunion-a1/` now explain the Chinese Germany A1 decision order, who should check an exemption first, and why Chinese readers should preserve official evidence rather than rely on agency or community claims.
- About, Contact, Editorial Policy, Privacy, Cookie, Terms, and Affiliate pages now state the official-source hierarchy, correction evidence and priority, Chinese coverage boundary, sensitive-document boundary, and no-leak/no-guarantee boundaries more clearly without changing their underlying legal role.

Content-depth assessment:

| Cluster | Grade | Assessment |
|---|---|---|
| Germany A1 hub and core guides | A | Model route: requirement, acceptance, fee, centre, documents, preparation, retake, official checks, and connected next actions. |
| Remaining Germany A1 support guides | A | Shared decision layer plus established cluster links; retained as route-support pages. |
| Germany B1+ | B | Decision framing, authority check, provider choice, local fee/centre/retake risks are now explicit; individual pages can later gain more case studies. |
| TestDaF | B | University/TDN/application-timeline decision checks are explicit; target-programme pages remain the human verification point. |
| telc Deutsch | B | Exact-variant, authorised-centre, employer/authority checks and next actions are explicit. |
| UK / Canada / Italy / Spain / France / Finland / Netherlands / Portugal | B | Clear starter-guide boundary, route-specific decision checklist, official verification, and cluster next action; not represented as full country dossiers. |
| Chinese homepage and Germany A1 core guides | A | Chinese-intent route path with official-source boundary and actionable sequence; deliberately not a machine-translated full site. |
| About / Contact / Editorial / Legal | A | Clear trust, correction, commercial, sensitive-data, and no-guarantee boundaries; legal meaning not materially expanded. |

Risk and human verification list:

- Re-check the current German mission or authority rule and possible exemptions for each individual family-reunion case.
- Re-check local official centre status, fees, dates, ID rules, cancellation terms, result timing, and certificate delivery before every booking.
- Re-check university programme language requirements and TDN/alternative-proof conditions for each TestDaF applicant and intake.
- Re-check exact certificate acceptance with the relevant authority, employer, or professional body for Germany B1/telc, UK, Canada, and other country routes.
- Legal/privacy text is clearer but should receive counsel review before any jurisdiction-specific claim, data processor, cookie banner, or monetisation change.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed; 79 static pages generated.
- `npm run launch-check`: passed; 55 checks, READY.
- `git diff --check`: passed.

Recommended next module:

- Perform a human official-source spot-check of the high-risk route pages (Germany A1, B1/telc, TestDaF, Canada, UK) in the live deployment, then deepen individual non-Germany starter-guide bodies only where real authority-specific scenarios warrant it.

## Manual Confirmation Needed

- Real waitlist provider and destination.
- Whether to add a visible waitlist section to Astro homepage or change CTA to Contact.
- Whether `/do-i-need-german-a1.html` should be migrated into Astro.
- Whether Chinese should remain homepage-only or become guide-level localization.
- Whether category filtering should stay client-side or become real route pages.
- Whether to formalize `country`, `exam`, and `level` in guide frontmatter.
- Which layer the live deployment currently serves: Astro `dist/` or legacy root static files.

## Window 0: Product-Upgrade Scan And Workstream Boundary — 2026-07-11

Role: flowlight.me total coordinator.

Scope completed:

- Performed a read-only scan of the live Astro source, legacy compatibility layer, project documentation, route/content inventory, shared components, style system, automated test status, and the supplied Window 1–7 briefs.
- No product, content, UI, SEO, deployment, or dependency code was changed. This entry records the delivery boundary for the follow-on windows.

Current-state decision:

- The active source of truth is `src/` (Astro). The root HTML/JS/CSS layer remains a legacy compatibility surface and must not be used as the primary place for new product work unless the deployment layer is confirmed.
- The Germany A1 cluster is already the deepest English route (16 guides) and should be reused rather than recreated. Germany B1 has nine supporting guides, but lacks the requested settlement/citizenship pillar and route-level hub.
- Homepage “Route Finder” is currently explanatory UI, not an interactive decision tool. There are no dedicated tool, pricing, product, route-review, or partners routes; there is no real email capture destination.

Recommended non-overlapping window order:

1. Window 1: shared information architecture and compliance surfaces, including the navigation/footer contract and an Astro homepage handoff point for tools.
2. Window 4: build the shared, configurable tool engine plus dedicated tool routes. This must own client-side logic and any new tool-specific components only.
3. Window 6: add pricing, product, route-review, partners, and email-capture UI after the tool CTA targets are settled. A payment provider and email destination still need owner confirmation.
4. Window 2: map existing A1 guides to the required cluster and fill only the factual/content gaps after the tool/product URLs exist.
5. Window 3: create the B1 settlement/citizenship pillar and requested supporting route pages, using the same shared tool/product links.
6. Window 5: complete cross-cluster SEO, structured-data, and internal-link audit after the new routes exist.
7. Window 7: perform the final UI-only visual/mobile unification pass after structural work is stable.

Protected areas:

- Do not hand-edit `dist/`, alter deploy configuration, delete legacy pages, or change canonical/sitemap behavior without a dedicated verified scope.
- Do not add claims about certificate acceptance, exemptions, fees, dates, visa outcomes, official affiliation, or legal advice without current authoritative-source verification.
- Do not create competing global navigation, footer, CTA, or style systems in downstream windows; extend the shared Astro components and `src/styles/global.css`.

Verification:

- `npm test`: passed (`site data and tool logic checks passed`).

## Window Prompt Refinement — 2026-07-11

Role: total-dispatch documentation owner.

Scope completed:

- Converted the supplied Window 0–7 briefs into executable, non-overlapping prompts in `docs/PRODUCT_UPGRADE_WINDOW_PROMPTS.md`.
- Added shared guardrails, dependency order, per-window file ownership, explicit allowed/prohibited changes, deliverables, acceptance checks, human-decision gates, and a single handoff format.
- No application, content, CSS, route, SEO, deployment, or dependency code was changed.

Key coordination decisions:

- Run information architecture before the tool engine; run products after tool URLs exist; run A1/B1 content after shared CTA URLs exist; run SEO after URLs are frozen; run UI only after structure is stable.
- The A1 window must map and deepen the existing 16-guide cluster rather than recreate a parallel 12-page cluster.
- Real email, payment, delivery, and Route Review service promises remain blocked on owner-confirmed providers and operations.

Verification:

- `git diff --check`: passed.

## Window 0: Dispatch Verification And Release Gate — 2026-07-11

Role: flowlight.me total coordinator.

Scope completed:

- Re-scanned `src/pages`, `src/components`, `src/layouts`, `src/content/guides`, `src/styles`, `tests`, `scripts`, Git state, the product-upgrade prompt, deployment files, and the reachable production homepage.
- Updated `docs/PROJECT_CONTEXT.md` with the current functional matrix, exclusive file ownership, acceptance/return rule, execution order, and business-risk register.
- No product, content, CSS, route, deployment, or dependency file was changed.

Release-gate finding:

- Production is **not verified to serve the Astro output**. The current live homepage showed 43 guides, 15 Germany A1 guides, and 4 Germany B1 guides; the current local Astro source has 49, 16, and 9 respectively.
- The checked-in CVM deployment script clones/pulls the repository into the Nginx document root and reloads Nginx, but does not build Astro or serve `dist/`. Therefore no Astro-window handoff may claim an online release until the hosting owner confirms and implements a build-and-publish contract.

Functional status:

- Existing: Astro foundation, A1 cluster, B1 supporting guides, SEO baseline, shared visual system.
- Partial: homepage/navigation/trust surfaces and B1 route structure.
- Missing: five interactive tools, product/pricing pages, Route Review, Partners, real email capture, payment, and fulfilment.
- Business confirmation required: deployment contract; email provider/data flow/retention; payment/delivery/refund/tax/support owner; Route Review reviewer/SLA/capacity/secure-intake policy; current official facts; AdSense CSP/consent posture.

Dispatch decision:

1. Keep the established execution order: Window 1 → 4 → 6 → (2 and 3 in parallel) → 5 → 7.
2. Treat deployment as an owner decision gate alongside, not inside, the code windows.
3. Do not permit concurrent edits to shared `index.astro`, Header, Footer, layouts, or `global.css`; the detailed exclusive ownership contract is in `docs/PROJECT_CONTEXT.md` and `docs/PRODUCT_UPGRADE_WINDOW_PROMPTS.md`.
4. Return any handoff that crosses its file boundary, lacks proportional verification, or claims unconfigured email/payment/review service behavior to the originating window.

Verification:

- `git diff --check`: passed before this documentation update.
- Production homepage was read on 2026-07-11 and compared with the current source inventory.

Scope not touched:

- All application code, guide bodies, CSS, build output, hosting configuration, email/payment integrations, and server state.

## Window 5: SEO, Schema And Internal-Link Audit — 2026-07-11

Role: search structure and cluster-connection owner.

URL freeze decision:

- Audited the actual Astro route set after Window 1, 2, 3, 4, and 6 pages were present. No renamed, temporary, or unresolved target URL was found in the new A1, B1, tool, pricing, product, Route Review, or partner routes.
- Treated the following as the frozen SEO contract for this window: `/germany-family-reunion-a1/`, `/germany-b1-settlement-citizenship/`, `/tools/{route-finder,checklist-generator,timeline-calculator,exam-comparison,email-reminders}/`, `/pricing/`, `/products/{a1-family-reunion-pack,a1-practice-pack}/`, `/route-review/`, and `/partners/`.

SEO matrix:

| URL / page role | One primary search intent | Next step CTA | Structured-data decision |
| --- | --- | --- | --- |
| `/germany-family-reunion-a1/` | Germany A1 family-reunion route | Requirement guide → tools → proposed A1 packs / Route Review | FAQPage retained because the page exposes the matching FAQ visibly. |
| A1 requirement, provider-comparison, booking, timing, documents, retake, and preparation guides | One decision per guide: requirement, accepted proof, provider choice, booking risk, timeline, documents, retake, or practice | Back to A1 hub plus the relevant planning tool / proposed support | Article + BreadcrumbList retained on every generated guide. |
| `/germany-b1-settlement-citizenship/` | Germany B1 language proof for settlement permits and citizenship | B1 checklist/timeline/comparison → free tools → pricing / Route Review | No FAQ schema: the page does not present a FAQ section. |
| B1 settlement, citizenship, Leben in Deutschland, checklist, timeline, and exam-comparison guides | One B1 proof or planning question per page, distinct from A1 family reunion | B1 hub → planning tool → Route Review | Article + BreadcrumbList retained. |
| `/tools/*` | Route finding, checklist creation, timeline planning, exam-comparison questions, or local reminder drafting | A1/B1 hub → proposed packs / Route Review | No HowTo schema: these are interactive planning utilities, not step-by-step instructional articles. |
| `/pricing/`, `/products/*`, `/route-review/`, `/partners/` | Transparent support scope, not a claim of a purchasable product or accepted service | Free tools → relevant route hub → contact intent | No Product schema: price, delivery, availability, and service acceptance are not confirmed. |

Search / link changes:

- Replaced A1 hub and tool-result shortcuts that went directly to contact-intent query URLs with the real product-scope and Route Review pages. Those pages still make the contact-intent boundary explicit.
- Added the A1 Practice Pack to the A1 route’s next-step set.
- Connected every tool result to both the A1 and B1 hubs, both proposed A1 product-scope pages, and the Route Review boundary.
- Added both route hubs to the commercial-page boundary and added Pricing to the B1 hub’s conversion path. This removes the prior one-link-only entry condition for each proposed product page without changing a tool calculation, commercial promise, or page fact.
- Extended `launch-check` to enforce unique rendered titles/descriptions, visible-FAQ-only FAQPage use, retained homepage WebSite and guide Article/BreadcrumbList schemas, the complete core sitemap set, and the required A1/B1/tool/product cross-links.

Audit result:

- Generated output has 95 pages, each with exactly one H1, a title, a useful meta description, and a `flowlight.me` canonical URL.
- No duplicate rendered title or meta description, no broken generated internal link, and no generated-page orphan was found.
- All indexable A1, B1, tool, pricing, product, Route Review, and partner URLs are in the generated sitemap. Noindex legal pages retain `noindex,follow` and are excluded from the sitemap.

Human official review still required:

- Germany A1: the receiving authority’s current requirement/exemption handling; accepted certificate; local centre status, fees, dates, ID, cancellation, result, and document rules.
- Germany B1: the competent authority’s current settlement/naturalisation requirements and exact accepted language/civic evidence; no VisaLang page decides individual eligibility.
- Any product or Route Review launch: price, tax, refund, delivery, reviewer qualifications, secure intake, capacity, and contact-data handling before the page can become a real sale or service.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 95 pages generated.
- `npm run launch-check` — passed; 60 checks, READY.
- `git diff --check` — passed.

## Window 5 handoff

### Completed

- Search intents are separated between A1 family reunion, B1 settlement/citizenship, tools, and proposed products; no competing primary page was added.
- Schema stays conservative: WebSite, Article, BreadcrumbList, and visible FAQPage are retained; no unsupported HowTo or Product schema was introduced.
- Cross-cluster links and sitemap/indexing contracts are now regression-checked.

### Files changed

- `src/data/route-tools.ts`, `src/components/tools/ToolResultSupport.astro`, `src/components/products/CommercialBoundary.astro`, `src/pages/germany-family-reunion-a1.astro`, `src/pages/germany-b1-settlement-citizenship.astro`, `tests/route-tools.test.js`, and `scripts/launch-check.js`.

### Decisions/interfaces for next window

- Keep the frozen URL set above. Window 7 may change presentation only; it must not change these routes, their primary search intent, schema strategy, or CTA destinations.
- Proposed packs and Route Review remain informational, non-purchasable/contact-intent pages and intentionally do not use Product schema.

### Human confirmation still required

- The current official facts and all real commercial-operation decisions listed above; deployment remains a separate owner gate.

## Window 8: Final Release Closure — 2026-07-11

Role: final release owner for scope audit, functional acceptance, fact-risk review, SEO, accessibility/mobile checks, build verification, narrow defect repair, Git delivery, and deployment handoff.

### Start-state audit

- Branch: `main`; upstream: `origin/main`; remote: `https://github.com/fan0269-code/VisaLang.git`.
- The branch started two commits ahead of `origin/main`: `897c5e2 content: complete Germany A1 decision cluster` and `265e4d5 content: add Germany A1 writing route`.
- The Window 8 baseline had 23 modified tracked files and 17 untracked status entries representing 23 untracked files. No staged file was present.
- All baseline changes predated Window 8. Git could identify the two committed A1 changes, but could not identify authorship for the uncommitted Window 0–7 files. The task log contained explicit Window 0 and Window 5 handoffs, while separate Window 1, 2, 3, 4, 6, and 7 handoffs were not present. Window 8 therefore treated those files as provenance-incomplete until their diff, ownership boundary, rendered behavior, and tests were checked.
- The real release scope is limited to the documented Window 0–7 source set plus the narrow Window 8 fixes below: shared navigation/footer/home/trust pages; A1 and B1 route content; five client-side tools; proposed/contact-intent commercial pages; shared tool/product components and data; shared CSS; tests; launch checks; and coordination docs.
- Protected areas remained untouched: `deploy/**`, `astro.config.mjs`, `public/_headers`, `public/_redirects`, `public/robots.txt`, legacy root pages, dependency manifests/lockfiles, and generated `dist/**` were not edited or staged.

### Acceptance result

- Functional: Route Finder, Checklist, Timeline Calculator, Exam Comparison, and Reminder Planner were exercised in a rendered browser. The configured A1 result, checklist completion state, calculated dates, six-row comparison, and explicit local-only reminder result all appeared correctly.
- Commercial boundary: pricing, proposed packs, Route Review, and Partners remain informational/contact-intent surfaces. No false purchase, email-send, delivery, or review-acceptance state was found.
- Content and fact risk: new A1/B1 content consistently sends acceptance, exemption, fee, date, result, retake, document, settlement, and citizenship decisions back to the responsible authority or official provider. BAMF DTZ/Leben in Deutschland and settlement guidance, the current Nationality Act B1 rule, Goethe A1, and telc A1 sources were checked against official first-party pages.
- SEO: generated titles and descriptions are unique; every generated page has one H1, a useful description, a `flowlight.me` canonical URL, and resolved internal links. Required A1/B1/tool/product URLs are generated and included in the sitemap; noindex legal pages remain excluded.
- Accessibility/mobile: checked desktop and 390px pages had labelled controls, named buttons, no application console errors, and no horizontal overflow. This is a focused release check, not a full WCAG conformance audit across every browser and assistive technology.

### Window 8 defects fixed

1. `tests/germany-a1-cluster.test.js` was committed but not executed by `npm test`, and its hub assertions still expected pre-Window-5 contact URLs. Added it to the main test entry and split guide contact-intent links from the frozen hub product/Route Review links.
2. Four new B1 surfaces used a superseded BMI naturalisation URL. Replaced it with the current German Government naturalisation guidance and added a regression assertion.

### Verification

- `npm test`: passed; route tools, commercial pages, Germany A1 cluster, and the site suite all ran.
- `npm run build`: passed; 95 static pages generated.
- `npm run launch-check`: passed; 60 checks, 0 warnings, 0 failures, `READY`.
- `git diff --check`: passed.
- Rendered browser QA: desktop key pages and 390px mobile key pages passed HTTP/title/H1/overflow/control-name/console checks; all five tools passed their primary interaction.
- `lint` and `typecheck`: not run because `package.json` defines neither script.

### Release and deployment handoff

- The source is acceptable to commit and push on the current branch after one final post-document verification.
- Push success must not be reported as live deployment success.
- Production remains blocked on the documented source-of-truth decision: the checked-in CVM flow pulls the repository root and reloads Nginx but does not build Astro or publish `dist/`.
- After the hosting owner implements and verifies the chosen build/publish contract, confirm the live route count and spot-check `/`, both Germany hubs, all five tools, pricing/products/Route Review/Partners, sitemap, robots, and production 404s.

### Git delivery result

- Created `01536f4 feat: complete VisaLang product upgrade` and pushed it together with the two pre-existing local A1 commits to `origin/main`.
- Post-push Git state was clean and synchronized: `HEAD` and `origin/main` both resolved to `01536f4205effe3844607e13445217c1db7ec12f` before this final handoff note.
- A post-push production check still showed the legacy homepage inventory: 43 guides, 15 Germany A1 guides, and 4 Germany B1 guides. That does not match the validated 95-page Astro build, so production deployment remains unconfirmed and blocked on the hosting source-of-truth decision above.

## UI reference refinement — 2026-07-11

Scope: presentation-only refinement inspired by the high-level visual principles of NextNation (clear blue primary action, expressive editorial display type, generous whitespace, and contained information panels). No routes, copy, SEO/schema, data, CTA targets, tool rules, commercial claims, or deployment files changed.

Completed:

- Updated the shared visual tokens in `src/styles/global.css` for a calmer blue, lower-noise surfaces, stronger type hierarchy, restrained shadows, and a more precise header treatment.
- Added the shared `hero--home` presentation wrapper to the English and Chinese homepages. It creates an elevated but still information-first entry surface without changing either homepage's content or actions.
- Refined common decision panels, numbered verification steps, cards, and primary actions so they read as one coherent, international product system on desktop and mobile.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 95 static pages generated.
- `git diff --check` — passed.
- Rendered QA at `http://127.0.0.1:4321/`: homepage loaded with no relevant console warnings/errors at desktop and 390px mobile; mobile document width stayed within the viewport.
- Interaction QA: homepage primary CTA -> `/tools/route-finder/`; Route Finder rendered correctly at 390px with no horizontal overflow or relevant console warnings/errors.

## Figma export visual-system adoption — 2026-07-11

Input reviewed: `/Users/fanlw/Downloads/Optimize Flowlight UI`, the exported implementation for the `Optimize Flowlight UI` Figma design.

Scope: visual-only. Existing page copy, routes, canonical/SEO/schema output, data, CTA targets, tool behavior, commercial boundary, and deployment configuration remain unchanged. Reference-only photography and replacement text from the export were intentionally not imported.

Completed:

- Reworked the shared visual system around the export's warm white, deep-navy, and restrained-gold palette; Poppins body typography; Italiana display hierarchy; soft ambient backgrounds; and translucent glass surfaces.
- Converted the global header into a floating, blurred navigation surface and restyled shared cards, route steps, panels, buttons, guide CTA, and tool surfaces so the site reads as one coherent system.
- Applied the homepage layout treatment to both English and Chinese entry pages by adding presentation-only `site-main--home` classes; no visible copy or behavior changed.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 95 static pages generated.
- `git diff --check` — passed.
- Rendered QA: desktop homepage and a configured 390px mobile viewport loaded with the expected title/hero, no relevant console warnings/errors, and no horizontal document overflow.
- Interaction QA: the unique homepage primary CTA continued to navigate to `/tools/route-finder/`; the resulting mobile Route Finder page rendered with no horizontal overflow or relevant console warnings/errors.

## NextNation-inspired homepage design refinement — 2026-07-12

Scope: UI-only redesign based on a live visual reference from `https://nextnation.co/`. The reference informed hierarchy, contrast, whitespace, contained panels, and action emphasis; its branding, copy, login modal, imagery, immigration-service claims, and assets were not copied. Route data, tool behavior, SEO/schema, verification wording, commercial boundaries, and deployment configuration remain unchanged.

Completed:

- Rebuilt the English homepage hero in `src/pages/index.astro` as a stronger split decision surface: headline and CTAs on the left, a three-move verification journey on the right, and an explicit verification boundary beneath the actions.
- Reworked the shared UI system in `src/styles/global.css`: blue primary action, navy emphasis surface, larger editorial type, rounded but restrained shared surfaces, clearer header states, stronger card interaction cues, and a dark global footer.
- Refined homepage route selection into a contained, high-contrast interaction surface. Hover/focus-capable routes receive visual feedback without changing their destinations.
- Added responsive rules for the split hero and retained full-width mobile CTAs, stable navigation, and single-column content at small widths.
- Updated the homepage CTA source assertions in `tests/site.test.js` to validate the real semantic links rather than the retired `PageHero` prop syntax. This preserves the behavior contract while allowing the homepage to own its visual structure.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.
- Visual QA: live source capture, local desktop capture, mobile capture, and a side-by-side comparison are saved under `.audit/flowlight-ui-2026-07-12/`; the formal review is in `design-qa.md` with `final result: passed`.
- Local desktop and 500px mobile captures show no clipped headings, off-screen primary action, or persistent-control overflow. The production deployment status remains separate and unverified by this local UI pass.

## Selected Option 3: pale-canvas route-atlas homepage — 2026-07-12

Scope: the user selected the third generated direction (international route planning) and then requested a pale background. This pass changes only the English homepage presentation, its original hero image asset, source assertions, and visual QA record. It does not change any route/tool logic, factual content, CTA destination, sitemap/schema, commercial claim, or deployment configuration.

Completed:

- Reframed the homepage headline around route planning and verification, then added an original `public/images/route-atlas-hero.png` asset with route-relevant mountain, rail, and city imagery.
- Rebuilt the selected hero as three desktop zones: verification copy, route atlas, and a cobalt three-step planning panel.
- Kept the surrounding canvas pale blue for information density and reading comfort, while retaining the selected direction's dark-navy hero stage, cobalt planning panel, yellow primary action, and yellow route-step markers.
- Added the homepage-specific light/dark token rules without changing the shared route, guide, or tool content surfaces.
- Added a precise mobile override after visual QA found the more-specific homepage grid overriding the generic single-column breakpoint. The corrected 500px screenshot now has one ordered column, full-width actions, and no clipped persistent controls.
- Updated the homepage source assertion so the selected route-planning task and route-atlas asset are regression-checked.

Verification:

- `npm test` — passed after the selected-homepage assertion and responsive repair.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.
- Desktop evidence: `.audit/flowlight-ui-2026-07-12/09-option3-light-desktop.png`.
- Mobile evidence: `.audit/flowlight-ui-2026-07-12/11-option3-light-mobile-fixed.png`.
- Comparison evidence and full current QA record: `design-qa.md` (`final result: passed`).

Correction after clarification:

- The user clarified that “pale background” applies only to the page canvas, not to the selected third direction's hero identity. Restored the dark-navy route stage, yellow primary action, route-atlas composition, cobalt three-step panel, and dark route selector; no route/tool/content behavior changed.
- Corrected desktop evidence: `.audit/flowlight-ui-2026-07-12/14-option3-corrected-desktop-fixed.png`.
- Corrected mobile evidence: `.audit/flowlight-ui-2026-07-12/15-option3-corrected-mobile.png`.

## Exam-learning visual-system refinement — 2026-07-12

Scope: full shared UI-system refresh and English homepage presentation inspired by the high-level product patterns of `https://www.testgerman.de/`: spacious learning-oriented composition, bright primary action, a contained practice-style panel, and clear progression. This is not a clone: TestGerman branding, logo, copy, user counts, course/exam data, pricing, product claims, AI mentor flow, imagery, partner badges, and page implementation were not copied. VisaLang route data, tool behaviour, SEO/schema, legal/verification boundaries, and CTA destinations remain unchanged.

Completed:

- Replaced the prior mixed visual overrides with a coherent light exam-learning system: warm off-white canvas, navy text, restrained blue support surfaces, yellow primary action, compact navigation, and softened information panels.
- Rebuilt the English homepage hero into an original decision-and-practice composition using VisaLang's existing original route-atlas asset and verification-first language.
- Applied the new system across shared cards, route selectors, guide articles, tool panels, filters, notices, and footer so the non-homepage routes keep the same visual family.
- Created a Figma design file named `VisaLang · Exam learning UI direction`. The first local-page import could not finish because the connected Figma/Codex account reached its current usage limit; no partially imported capture is treated as a completed Figma deliverable.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- Desktop evidence: `.audit/flowlight-ui-2026-07-12/16-exam-learning-desktop.png`.
- Mobile evidence: `.audit/flowlight-ui-2026-07-12/17-exam-learning-mobile.png`; no clipped primary actions or horizontal overflow observed.

## Optimize Flowlight UI warm-system adoption — 2026-07-12

Input reviewed: `/Users/fanlw/Downloads/Optimize Flowlight UI (1)`, the user-provided React export.

Scope: presentation-only adoption of the export's warm paper palette, wine-red primary action, yellow support surface, rounded `Baloo 2` display type, compact navigation, and white route-check card pattern. Existing VisaLang routes, guide/tool logic, legal boundaries, structured data, CTA destinations, and deployment configuration remain unchanged.

Completed:

- Added the source direction's `Baloo 2` and `Poppins` type pairing through shared layout font links, then applied it to the visual hierarchy without changing content semantics.
- Rebuilt the English homepage hero as a reference-aligned white route-check card: status badge, authority-first route prompt, green progress state, pale-yellow explanatory note, and wine-red primary action.
- Reworked the shared header, footer, buttons, route grids, cards, guide/tool surfaces, alerts, and filters into the same warm visual system. The global brand now uses the intended `Visa` / red `Lang` treatment.
- Removed the stale IPv4 local preview process and started a read-only static local preview from the fresh `dist/` output at `http://127.0.0.1:4321/`; this does not change production hosting.

Verification:

- Desktop evidence: `.audit/flowlight-ui-2026-07-12/22-warm-reference-desktop-built.png`.
- Mobile evidence: `.audit/flowlight-ui-2026-07-12/23-warm-reference-mobile-built.png`; no horizontal overflow, clipped action, or hidden route-check panel observed.

## Open Design cool-blue UI sync — 2026-07-13

Input reviewed: `/Users/fanlw/Library/Application Support/Open Design/namespaces/release-stable/data/projects/65a225e9-0d82-423a-a31a-67620219401a`.

Scope: presentation-only sync from the Open Design project. No guide text, exam facts, route logic, URLs, SEO metadata, structured data, legal copy, tool calculations, or deployment configuration were changed.

Completed:

- Replaced the compressed `open-design.css` layer with a maintainable cool-blue Open Design system: restrained 8/12/16 radius scale, opaque header, official-first blue action colour, teal route accent, stronger focus rings, mobile rules, and retained system dark-mode tokens.
- Disabled the older warm paper / wine-red / Baloo 2 override block in `global.css` by archiving it inside a non-matching media query, so it no longer competes with the active Open Design layer.
- Removed the now-unused Google font links from `BaseLayout.astro`, since the active Open Design layer uses the system/Noto stack.
- Added the `od-tools` page scope to `/tools/` so the tools index gets the intended feature-card rhythm without changing tool destinations or logic.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.

## Homepage Open Design override repair — 2026-07-13

Scope: homepage UI bug fix after the Open Design sync. No content, routes, SEO metadata, structured data, tool logic, or deployment configuration changed.

Cause:

- Older homepage-specific selectors in `global.css` used `body:has(.site-main--home)` and had higher specificity than the new generic Open Design selectors.
- As a result, homepage-only surfaces such as the header, route selector, route cards, last-checked badges, and verification alert could inherit stale dark/warm styling instead of the active cool-blue Open Design layer.

Completed:

- Added homepage-scoped Open Design overrides in `src/styles/open-design.css` for the header, navigation states, route selector, route cards, article cards, badges, and verification alert.
- Added a tight source-level check for the required homepage OD override selectors during the repair pass.

Verification:

- Homepage OD override check — passed.
- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
## Open Design final alignment release prep — 2026-07-13

Scope: final presentation-only alignment from the Open Design project before production release. No guide text, exam facts, route logic, URLs, SEO metadata, structured data, legal copy, analytics, advertising, deployment script, or tool calculations were changed.

Completed:

- Added the Open Design brand mark and favicon assets to the public static tree, then connected them to the shared header, footer, and document favicon.
- Tightened the active `open-design.css` layer for header/footer branding, route-finder/tool panels, tool steppers, guide-list card rhythm, compact mobile filters, and mobile overflow protection.
- Verified the real 390px mobile viewport with Chrome DevTools Protocol; homepage, guide library, and Route Finder reported document width equal to viewport width.

Local verification:

- `npm test` — passed.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.

Release result:

- UI payload commit: `ef1f9dca9e5add2ea0a88a04a7eaf93663f800da`.
- `flowlight.me` DNS target during release: `107.150.102.145`; standard server deploy completed, server source resolved to `ef1f9dc`, Nginx test/reload passed, and the published static output included `favicon.svg`, the Open Design CSS tokens, and the shared header mark.
- `www.flowlight.me` DNS target during release: `43.162.126.37`; server source resolved to `ef1f9dc` when checked with `sudo git`. Server-side build failed because Node.js was `v20.20.2` while Astro 7 requires `>=22.12.0`, so the locally built and verified `dist` artifact was synchronized to `/var/www/flowlight.me/public/dist`; Nginx test/reload passed.
- Rollback artifacts: `107.150.102.145:/var/www/flowlight.me/releases/20260713T080850Z-pre-ef1f9dc-dist` and `43.162.126.37:/var/www/flowlight.me/releases/20260713T080853Z-pre-ef1f9dc-dist`.

Public smoke check:

- `https://flowlight.me/`: HTTP 200 and expected Open Design header/homepage markers.
- `https://flowlight.me/tools/`: HTTP 200.
- `https://flowlight.me/guides/`: HTTP 200.
- `https://flowlight.me/tools/route-finder/`: HTTP 200.
- `https://www.flowlight.me/`: HTTP 200 and expected Open Design header/homepage markers.
- `https://www.flowlight.me/tools/`: HTTP 200.
- `https://www.flowlight.me/guides/`: HTTP 200 on retry and expected guide-library/header markers.
- `https://www.flowlight.me/favicon.svg`: HTTP 200.

Operational follow-up:

- Upgrade Node.js on `43.162.126.37` to `>=22.12.0` and fix Git safe-directory/ownership so the standard server-side deploy script can build there without the local-artifact fallback.

## Open Design homepage structure sync — 2026-07-13

Scope: presentation-layer homepage alignment from the provided Open Design project at `/Users/fanlw/Library/Application Support/Open Design/namespaces/release-stable/data/projects/65a225e9-0d82-423a-a31a-67620219401a`. No URLs, SEO metadata, structured data, guide facts, route data, tool calculations, legal copy, analytics, advertising, or deployment configuration changed.

Completed:

- Reworked the homepage source structure to match the Open Design route-decision layout: route console, staged decision lane, resource entry panel, purpose selector, recently updated guides, and trust boundary band.
- Added the matching Open Design CSS layer for the new homepage components, including 8/12/16px radius rhythm, cool-blue tokens, non-glass surfaces, route-choice controls, responsive stage cards, and mobile one-column fallbacks.
- Updated the source-level homepage UI regression checks so they guard the new route-console/trust-band structure instead of the previous temporary `od-*` homepage markers.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.

## Guide library maturity-positioning window — 2026-07-13

Scope: narrow content-positioning and guide-library presentation cleanup for `/guides/`, guide category pages, guide cards, and guide status labels. No new country, exam, route, guide page, tool logic, commercial flow, deployment configuration, analytics, form, email, payment, advertising, `dist/`, or root legacy HTML work was in scope.

Completed:

- Centralized guide maturity display in `src/data/guide-taxonomy.ts`: Germany A1 is `Complete route`, Germany B1 is `Core route`, and all other guide categories remain `Starter overview`.
- Updated `/guides/` copy, status filter options, route relevance sorting, and Chinese Germany A1 card status so mature/core routes are easier to distinguish from starter overviews.
- Updated guide category intros and category/list cards so Germany A1, Germany B1, and starter categories no longer present as the same maturity level.
- Reused the same status mapping on guide article headers to avoid B1 guide pages being labelled as starter while the category/library presents them as a core route.
- Added a focused regression assertion for the guide-library maturity vocabulary and taxonomy mapping.

Not changed:

- No guide pages were added or removed; the build still generated 98 pages and retained all 54 English guide source files.
- No A1/B1 article body facts, official-source claims, fees, timelines, acceptance statements, route tools, pricing, partners, Route Review, analytics, forms, email, payment, ads, deployment scripts, `dist/`, or legacy root HTML files were changed.

Remaining risk:

- Non-Germany and non-core Germany exam categories are still starter overviews; deeper official-source expansion should remain a separate phase-2/content-quality or later data-led route window.
- This window improves presentation clarity only; it does not prove live production deployment state because deployment was explicitly out of scope.

Verification:

- `npm test` — passed.
- `npm run build` — passed; 98 static pages generated.
- `npm run launch-check` — passed; 24 checks, 0 failures, `READY`.
- `git diff --check` — passed.

## Content maturity, responsibility, and journey-link model — 2026-07-14

Scope: unify controlled content status, author/review responsibility, status-authorised CTAs, and decision-stage related links across the Astro guide model. No policy-fact expansion, maturity promotion, visual redesign, tool interaction, advertising/CMP, deployment, commit, or push was included.

Completed:

- Standardized the four content statuses and retained the current baselines: Germany A1 `complete-route`, Germany B1 `core-route`, TestDaF `starter-overview`, and the 16 unresolved high-risk guides `verification-pending`.
- Added controlled `primaryIntent`, `decisionStage`, `nextGuideSlug`, `supportingGuideSlugs`, and `comparisonScope` metadata across all 54 English guide records.
- Centralized status-to-CTA permissions so only complete routes expose decision tools; core/starter/pending states remain limited to their approved route and official-source actions.
- Passed Markdown author and review-role data into visible article metadata and Article JSON-LD from the same source; added Chinese Germany A1 role/status records without inventing a source-review date or completed translation review.
- Restricted cross-country related-guide rendering to explicit comparison scope and intent, while requiring a same-route or same-stage supporting link.
- Made About route/status counts and category maturity derive from taxonomy/content data.

Pending:

- All 16 P0-2 high-risk guides remain `verification-pending` until approved source packages close their evidence gaps.
- The five Chinese Germany A1 guides now use the shared status/responsibility semantics, but source review and review-role completion remain pending; this window does not claim a fully reviewed Chinese content migration.

Verification:

- `npm test` — passed.
- `npm run launch-check` — passed; 29 checks, 0 failures, 98 generated routes, `READY`.
- `git diff --check` — passed.

## Final content and UI regression review — 2026-07-14

Scope: read-only regression review of the current uncommitted content/UI implementation relative to `HEAD`, plus the required handoff and task-log documentation. No source repair, commit, push or deployment was performed.

Completed:

- Reviewed the implementation baseline, remediation brief, high-risk source audit, consent/ad-tech decision record, style architecture and current diff.
- Rechecked representative public outputs: homepage, Guide Library, Germany A1 Complete, Germany B1 Core, TestDaF Starter, Route Finder, Chinese entry/guide, Privacy and Cookie.
- Verified generated SEO and trust-state evidence: one H1, canonical/OG metadata, Article/Breadcrumb JSON-LD, reciprocal hreflang pairs, sitemap entries, internal links, source-review state rendering, controlled maturity labels and legacy redirect declarations.
- Created `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md` with completion evidence, remaining issues, source-review queue, CMP/ad status, responsive matrix and bounded next-round recommendations.

Verification:

- `git status --short --branch` — completed; pre-existing modifications preserved.
- `git diff --check` — passed.
- `npm test` — passed.
- `npm run launch-check` — passed; 98 generated routes, 31 checks passed, 0 failed, `READY`.
- Local preview returned `200` for all ten representative trailing-slash routes checked.
- Generated output contained none of the checked AdSense, Cloudflare Insights, DoubleClick, GTM, Meta Pixel or Plausible runtime markers.
- Browser viewport/keyboard/network verification — not completed. Browser initialization failed with `Cannot redefine property: process`; automated markup/CSS checks were not recorded as a substitute.

P0/BLOCKED status:

- CMP and advertising activation remains BLOCKED because target regions, consent framework, CMP/no-CMP strategy, supplier allowlist, storage/expiry, withdrawal, pre-consent-loading rules and approved policy wording are not supplied. AdSense and Cloudflare Web Analytics remain paused in source.
- P0 Privacy/Cookie regression found: public copy says current tools store form fields in `localStorage`, but current tool persistence is URL-query-only; only route-step progress uses `localStorage`.
- P0 content blocker found: five high-risk pages remain blocked from fact editing and still contain deterministic unreviewed policy/acceptance statements. A pending badge does not complete their required fact downgrade. The affected pages are the two Spain pages, `delf-b1-b2-french-work-study`, `tcf-irn-french-residence`, and `staatsexamen-nt2-for-work-and-higher-education`.
- P1 remaining issue: Related Guides can admit a cross-country link solely through matching `decisionStage`, bypassing the explicit cross-country comparison gate.
- P2 remaining issues: some parent navigation links overstate `aria-current="page"`; English and Chinese Article JSON-LD author nodes lack a controlled Schema.org `@type`.

Human review queue:

- Complete the five blocked high-risk authority-source packages above.
- Keep the other 11 audited high-risk pages at `verification-pending` until their individual route/centre/date/programme checks close.
- Review the English records that still resolve to source-review `pending`; never substitute `updatedDate`.
- Complete source and translation review for the five Chinese Germany A1 guides. Their accessible entry and pending UI do not constitute a completed Chinese credibility migration.

### Confirmed P0 correction window

After review findings were confirmed, the user authorised the proposed narrow P0 correction scope.

Completed:

- Corrected Privacy/Cookie wording so current tool results are described as URL-backed and only route-step progress is described as `localStorage` data.
- Safely downgraded the two blocked Spain guides, two blocked France guides and blocked Dutch work/study guide. Removed the audited deterministic claims without adding replacement policy facts; retained verification questions, authority boundaries and official exam-owner links.
- Added regression assertions for the policy persistence description, the five in-body verification boundaries and removal of the identified unsafe phrases.

Verification:

- `npm test` — passed.
- `npm run launch-check` — passed; 98 routes, 31 checks passed, 0 failed, `READY`.
- The five articles remain `verification-pending`; this correction does not claim source review completion.
- CMP/ad-tech strategy, browser viewport/network evidence, Related Guides, navigation `aria-current`, and Article author `@type` remain outside this P0 correction window.

## Content and UI remediation production release — 2026-07-14

User instruction: push and deploy the completed batch.

Completed:

- Committed the full reviewed workspace as `5167dd45361cfa4920ca87c39091652d8e545405` (`feat: complete content and UI remediation`) and pushed `main` to `origin`.
- Confirmed both `flowlight.me` and `www.flowlight.me` resolved to `107.150.102.145` before deployment.
- Preserved the previous served output at `/var/www/flowlight.me/releases/20260714T115051Z-pre-5167dd4-dist`.
- Fast-forwarded server source from `6b8131b` to `5167dd4`, installed locked dependencies, built 98 Astro pages, replaced the served `dist`, checked Nginx configuration and reloaded Nginx.

Verification:

- Server dependency install/audit — 0 vulnerabilities.
- Server `npm test` — passed.
- Server `npm run launch-check` — passed; 98 routes, 31 checks, 0 failures, `READY`.
- Public HTTP — apex, `www`, Guide Library, Complete/Core/Starter guide samples, Route Finder, Chinese entry, Privacy, Cookie and sitemap returned 200.
- Public P0 evidence — corrected URL/local-storage policy wording and safe Spain verification boundary were present.
- Public ad-tech check — no checked AdSense, Cloudflare Insights or DoubleClick runtime marker appeared in homepage, Privacy or Cookie HTML.

Remaining:

- CMP/ad-tech activation remains BLOCKED pending the recorded business/legal decisions.
- Chinese source/translation review and five-page authority-source completion remain pending.
- Browser screenshots, keyboard walkthrough and clean-profile HAR remain unverified because the browser-control runtime failed during this maintenance session.

## 2026-07-16 — Germany A1 source refresh phase 1

- Scope: read-only claim extraction and official-source audit for `goethe-a1-fees-by-country`, `goethe-a1-test-centers`, `goethe-a1-retake-policy`, `german-a1-documents-checklist`, and `german-family-reunion-language-requirement`.
- Result: `PHASE_1_PARTIAL_SOURCE_GAPS_RECORDED`; page dispositions are four `READY_FOR_LIMITED_REWRITE` and one `PARTIAL_REWRITE_ONLY` (`german-a1-documents-checklist`).
- Matrix: 37 claims total; 18 high risk; 14 fully supported; 22 partially supported; 1 unsupported; 0 source blocked.
- Official source types checked: Federal Foreign Office, BAMF national/general family-reunion pages, Goethe-Institut global product/results/rules pages, and the telc official centre finder. No applicant location or selected centre was supplied, so mission/centre-specific gaps remain explicit.
- Worktree protection: preserved all pre-existing modified and untracked files; the five target guides had no starting diff and were not edited. Only the phase-one report and this appended log entry belong to this window.
- Verification: `git diff --check` passed; final status/stat and scoped diffs were inspected; the five target guides have zero diff. No tests or build were run because phase one did not modify source, tests, routes, or content.
- Next-stage entry: only evidence-bounded wording changes may proceed. Local fee, centre availability, retake terms, test-day documents, visa-file documents, certificate acceptance, and individual exemption/eligibility claims require the named centre or mission source first.
- Explicit exclusions: no guide body/frontmatter, content status, source-review date, test, commit, push, or deployment change.

## 2026-07-18 — Germany A1 content, route, and Chinese core-path update

- Scope: updated the seven specified English Germany A1 guides, their bounded route dependencies and shared guide rendering; added three Chinese core-route guides and their controlled data, bilingual mappings, sitemap coverage, and regression tests.
- Source disposition: `german-family-reunion-language-requirement`, `goethe-a1-vs-telc-a1`, `german-a1-documents-checklist`, and `german-a1-exam-booking-timeline` were reviewed against accessible official sources on 2026-07-18. `goethe-a1-test-centers`, `goethe-a1-fees-by-country`, and `goethe-a1-retake-policy` remain `pending` because no selected local centre's current page or written reply was supplied.
- Status separation: all seven target guides retain `contentStatus: complete-route`; only the four completed English source reviews carry `sourceReviewedAt: 2026-07-18` and `reviewedByRole: source-review`. The Chinese records remain independently `pending` with no review date or reviewer role.
- Route result: the English main route now follows requirement, acceptable proof, provider comparison, centre verification, pre-booking checks, timeline, documents, official resources, and study plan; it terminates without a forced next-guide cycle. Retake remains a conditional branch. The Chinese route has the corresponding core sequence and no forced loop at its final study step.
- Public routes added: `/zh/guides/goethe-a1-germany-family-reunion/`, `/zh/guides/goethe-a1-test-centers/`, and `/zh/guides/german-a1-exam-booking-timeline/`. Each has canonical, reciprocal hreflang, Article and BreadcrumbList JSON-LD, and sitemap coverage.
- Rendering result: guide pages display article-specific next actions when authored; Germany A1 previous/next navigation follows the controlled route instead of alphabetical order.
- Review result: standards and prompt-compliance reviews initially found a long forced route loop and three over-claimed local-source reviews. Both were corrected; the final read-only recheck reported no remaining P1/P2 findings.
- Verification: `node tests/content-integrity.test.js`, `node tests/germany-a1-cluster.test.js`, and `node tests/source-review-render.test.js` passed; `npm test` passed; `git diff --check` passed; `npm run launch-check` built 101 pages and passed 37 checks with 0 failures, ending in `READY`.
- Overall result: `PARTIAL`. Technical verification is ready, but three selected-centre-dependent English source reviews and independent Chinese source/translation review remain open.
- Delivery boundary: no branch, commit, push, or deployment was created or performed.

## 2026-07-19 — Germany A1 production release

- User authorised the completed Germany A1 content batch for production publication.
- Re-ran the local release gate: `npm test` passed; `npm run launch-check` built 101 pages and passed 37 checks with 0 failures; deployment shell syntax checks and `git diff --check` passed.
- Staged only the 25 reviewed content, route, Chinese-page, test and task-log files. Pre-existing untracked merge, prompt, plan and specification files remained unstaged and unchanged.
- Created application commit `5cfe8eedc290dd3ef03a2f27617a33ccd3425bd0` (`content: update Germany A1 decision routes`) and pushed `main` from `0e1dec2` to `5cfe8ee`.
- Confirmed the production origin behind Cloudflare is the previously recorded host `107.150.102.145`; server source was clean on `main`, Node.js was `v22.23.1`, Nginx configuration tested successfully, and existing immutable releases were available before publication.
- Ran `/var/www/visalang.org/source/deploy/deploy.sh`. Server source fast-forwarded to `5cfe8ee`; locked dependency install reported 0 vulnerabilities; server `npm test` and `npm run launch-check` passed; Nginx switched atomically to `/var/www/visalang.org/releases/5cfe8eedc290` and reloaded successfully.
- Retained `/var/www/visalang.org/releases/0e1dec2929ca` as the immediate rollback target. No rollback trigger occurred.
- Production smoke passed from the production host: homepage, Guide Library, robots and sitemap returned 200; legacy and `www` redirects returned the expected canonical 301 responses. Additional checks found all three new Chinese routes, both reviewed and pending English source-state markers, and the new sitemap marker online.
- The first local smoke invocation failed during LibreSSL/Cloudflare negotiation with `SSL_ERROR_SYSCALL`; it did not produce an application HTTP failure. The same script passed from the production host, and a clean follow-up marker check returned 6/6.
- Release result: application source pushed and deployed successfully. The three local-centre-dependent English source reviews and independent Chinese source/translation review remain pending by design; CMP, Auto ads, CLS and clean-profile browser network evidence remain outside this content release.

## 2026-07-19 — Germany A1 official-source and Chinese review completion

- Scope: rechecked the three previously pending English local-dependency guides and all eight Chinese Germany A1 pages against first-party authority, exam-owner, and examination-centre sources; review record: `docs/GERMANY_A1_SOURCE_REVIEW_2026-07-19.md`.
- Selected bounded local example: China / Beijing / Beijing German Cultural Center · Goethe-Institut China. The official Beijing pages support the local A1 product, 2026 local fee table, booking notices, and centre-specific withdrawal/postponement information only for the Beijing institute; none of these facts were generalized to another city, centre, country, or provider.
- English disposition: `goethe-a1-test-centers`, `goethe-a1-fees-by-country`, and `goethe-a1-retake-policy` now record `sourceReviewStatus: reviewed`, `sourceReviewedAt: 2026-07-19`, and `reviewedByRole: source-review`. This status covers the published facts and verification process, not a reader's future local seat, date, price, refund decision, or booking outcome.
- Retake correction: the public copy now states that Start Deutsch 1 is non-modular and a failed attempt is followed by a whole-exam repeat; the whole examination may be repeated, while the selected centre still controls current dates, any centre-set period, fee, registration, and seat availability.
- Chinese disposition: all eight controlled Chinese records completed an independent official-source and final-Chinese-wording review on 2026-07-19 and display `来源与翻译审查`. Public internal-editorial headings and unsupported Goethe/telc stability framing were removed; the China-mission source and current BAMF PDF URL were aligned.
- Authority boundary: responsible German missions or authorities decide individual family-reunion requirements, exemptions, accepted proof, and submission format; exam owners define products and exam-level rules; selected centres control current local execution details.
- Verification: focused content/render tests passed; `npm test` passed; `npm run launch-check` built 101 pages and passed 37 checks with 0 failures, ending in `READY`.
- Release boundary: this entry records the reviewed application candidate before commit and production deployment. Deployment evidence is recorded separately after the immutable production release is verified.

## 2026-07-19 — Germany A1 source-review production release

- Created application commit `1521d98021e0eb80efa3dc453bce0e8ea766de4e` (`content: complete Germany A1 source review`) from the exact reviewed 13-file scope and pushed `main` from `b2c8524` to `1521d98`. Pre-existing untracked merge, prompt, plan and specification files remained unstaged and unchanged.
- The first SSH precheck confirmed the previous current release `/var/www/visalang.org/releases/5cfe8eedc290`, then stopped before deployment because an extra nonessential `git status` hit Git's dubious-ownership protection. No server Git configuration was changed.
- Ran the repository deployment script separately. Server source fast-forwarded to `1521d98`; locked dependency install reported 0 vulnerabilities; server `npm test` and `npm run launch-check` passed; Nginx switched atomically to `/var/www/visalang.org/releases/1521d98021e0`.
- Retained `/var/www/visalang.org/releases/5cfe8eedc290` as the immediate rollback target. No rollback trigger occurred.
- Production smoke passed from the production host: homepage, Guide Library, robots and sitemap returned 200; legacy and `www` redirects returned expected canonical 301 responses.
- Public content checks passed for all three English review-date markers and the checked Chinese review date, `来源与翻译审查` role, neutral Goethe/telc title, absence of the old `哪个更稳` wording, and absence of the pending Chinese review message.
- Release result: the reviewed facts, process guides and Chinese review state are online. Dynamic reader-specific centre availability, seat, date, fee and individual family-reunion decisions remain official recheck items, not uncompleted page-review work.

## 2026-07-19 — Germany B1 source review and route cleanup

- Scope: reviewed and rewrote the eight specified Germany B1 settlement, naturalisation, civic-knowledge, exam-comparison, booking, study, timeline and checklist guides; tightened the 13-guide route graph; updated the B1 Hub, focused tests, source audit and content ledger. No public page was added, deleted or renamed.
- Source disposition: the eight core guides now record `sourceReviewStatus: reviewed`, `sourceReviewedAt: 2026-07-19` and `reviewedByRole: source-review`. The five preparation-support guides remain pending; only duplicated supporting slugs were removed from their frontmatter, and their bodies were not rewritten.
- Authority boundary: current consolidated German statutes control route terminology; the competent local foreigners or nationality authority controls the individual route, accepted proof, exceptions and procedure; exam owners define products; selected official or authorised centres control current local execution.
- Conflict handling: the BAMF English final-examination page still contains superseded naturalisation-duration wording. It was retained only as a DTZ/LiD exam-mechanism source and was excluded from every residence-duration or accelerated-naturalisation claim. The generic Federal Portal candidate returned 404 and was not used.
- Public copy: removed internal editorial language, self-links, repeated six-link templates and unsupported universal acceptance or fixed local-execution implications. `updatedDate` changed only on the eight materially rewritten core guides.
- Route result: settlement, citizenship and LiD entry pages converge on the exam comparison; comparison continues to booking; booking and study continue to the evidence timeline; timeline continues to the terminal checklist. The full 13-page next graph terminates without a cycle, self-link or next/supporting duplicate.
- Rendering result: Germany B1 guide navigation now uses explicit `nextGuideSlug` and suppresses the unrelated title-sorted Previous link. The Hub has one H1, one accessible `ArticleTOC`, a self-canonical URL, visible reader-first sections and matching `BreadcrumbList` plus `CollectionPage` JSON-LD. No B1 hreflang was added because no equivalent Chinese B1 route exists.
- Ledger result: `docs/CONTENT_MAP.md` now reflects the completed Germany A1 reviews, all eight reviewed Chinese A1 records, the eight reviewed Germany B1 core guides and the five pending B1 preparation guides.
- Verification: all four focused commands passed; `npm test` passed; `npm run launch-check` built 101 pages and passed 37 checks with 0 failures, ending in `READY.` The first `git diff --check` found three trailing-space lines in the new audit header; they were corrected before the final gate.
- Worktree protection: the nine initial untracked report, prompt, plan and specification files remained present and byte-identical; no initial tracked or staged change existed. All new tracked changes are within the prompt allowlist or the conditional five-support-page frontmatter allowance.
- Delivery boundary: no commit, push, PR, deployment, SSH/server access or third-party account change was performed.

## 2026-07-19 — Germany B1 source-review production release

- Created application commit `c99877850ab13a98851b5bfc9a0d2b0f5d99710d` (`content: complete Germany B1 source review`) from the exact reviewed 21-file scope and pushed `main` from `8919d41` to `c998778`. The nine pre-existing untracked report, prompt, plan and specification files remained unstaged and unchanged.
- Confirmed the previous production release `/var/www/visalang.org/releases/1521d98021e0`, server Node.js `v22.23.1` and valid Nginx configuration before switching.
- Ran the repository immutable deployment script. Server source fast-forwarded to `c998778`; locked dependency installation reported 0 vulnerabilities; server `npm test` passed; server `npm run launch-check` built 101 pages and passed 37 checks with 0 failures, ending in `READY`; Nginx switched atomically to `/var/www/visalang.org/releases/c99877850ab1`.
- Retained `/var/www/visalang.org/releases/1521d98021e0` as the immediate verified rollback target. No rollback trigger occurred.
- Production smoke passed from the production host: homepage, Guide Library, robots and sitemap returned 200; legacy routes and `www` returned expected canonical 301 responses.
- Public Germany B1 checks passed: reviewed markers 8/8, no alphabetic Previous links 8/8, explicit Next mappings 7/7, terminal checklist, and Hub self-canonical/TOC/`CollectionPage` output.
- Release result: the eight reviewed Germany B1 core pages and corrected route graph are online. The five preparation-support pages remain pending, and reader-specific legal route, authority, evidence acceptance and local execution details remain official recheck items.
- No DNS, TLS, CMP, advertising account, analytics, form, payment, email-delivery or other third-party configuration was changed during this release.

## 2026-07-19 — Spain source-pilot agent pre-review

- Scope: completed the agent pre-review portion of the next `docs/CONTENT_MAP.md` item for `dele-a2-ccse-spanish-citizenship` and `dele-levels-spanish-citizenship` only. The named-human acceptance gate remains open. No other country, commercial surface, shared layout, deployment file or third-party configuration was changed.
- Reopened the current Spanish Ministry of Justice residence-nationality procedure and electronic-office dispensation page, plus the current Instituto Cervantes nationality, DELE A2 and CCSE product pages. The two previously listed Cervantes FAQ URLs timed out and were not used for any retained claim.
- Agent pre-review disposition: `AGENT_REREVIEW_COMPLETED_WITH_APPLICANT_BOUNDARY`. The Ministry-first wording and current product descriptions passed an authority-first Codex review; this is not a human acceptance decision. Both pages remain `contentStatus: verification-pending` because applicant category, residence calculation, accepted evidence, individual dispensation and local exam execution remain unresolved.
- Updated the actual source-review and substantive editing date to 2026-07-19, replaced broad exam links with direct current DELE A2 and CCSE pages, and added page-specific next actions.
- Corrected the Spain route metadata to requirement → choice → terminal. Removed the direct bidirectional next-guide loop and the duplicate next/supporting target without changing public slugs.
- Updated `docs/SPAIN_CONTENT_SOURCE_PILOT_2026-07-16.md`, focused regression assertions and the content ledger. The human acceptance item remains first in the immediate execution queue; the three blocked French/Dutch pages remain next after it.
- Completion boundary: result is `PARTIAL` until a named human reviewer intentionally accepts or rejects the final wording. No push or deployment is performed in this window; a scoped local commit may be created after the technical gates pass.

## 2026-07-19 — Spain source-pilot production release

- User authorised publication of the completed Agent pre-review candidate. Created application commit `ee66a0a3273ab85eca233f5732f3cde8689324a3` (`content: pre-review Spain citizenship guides`) and pushed `main` from `6cc615a` to `ee66a0a`. The nine pre-existing untracked report, prompt, plan and specification files remained unstaged and unchanged.
- Re-ran the local release gate: `npm test` passed; `npm run launch-check` built 101 pages and passed 37 checks with 0 failures; deployment shell syntax and `git diff --check` passed.
- Confirmed the previous production release `/var/www/visalang.org/releases/c99877850ab1`, clean server source, Node.js `v22.23.1` and valid Nginx configuration before switching.
- Ran the repository immutable deployment script. Server source fast-forwarded to `ee66a0a`; locked dependency installation reported 0 vulnerabilities; server `npm test` and `npm run launch-check` passed; Nginx switched atomically to `/var/www/visalang.org/releases/ee66a0a3273a`.
- Retained `/var/www/visalang.org/releases/c99877850ab1` as the immediate verified rollback target. No rollback trigger occurred.
- Production smoke passed from the production host: homepage, Guide Library, robots and sitemap returned 200; legacy routes and `www` returned expected canonical 301 responses. Spain public marker checks passed 6/6 for both titles, both pending-state labels, requirement-to-choice Next navigation, terminal choice-page navigation and the active release target.
- Release boundary: the two Spain pages are online but remain `verification-pending`. The named-human acceptance gate is still open; this release does not promote the Agent pre-review to human acceptance or assert any applicant-specific outcome. CMP, Auto ads, CLS and clean-profile browser network evidence remain outside this content release.

## 2026-07-19 — France and Netherlands P0 page-specific authority review

- Scope: executed the next Agent-capable `docs/CONTENT_MAP.md` item for `delf-b1-b2-french-work-study`, `tcf-irn-french-residence`, and `staatsexamen-nt2-for-work-and-higher-education`. The Spain named-human acceptance gate remains open and was not interpreted as accepted. No other country content, commercial flow, deployment configuration or third-party account was changed.
- Evidence packages: created `docs/FRANCE_HIGH_RISK_SOURCE_REVIEW_2026-07-19.md` and `docs/NETHERLANDS_NT2_SOURCE_REVIEW_2026-07-19.md` from current first-party government, exam-owner, named-university and regulator sources.
- France boundary: the current Ministry/Service-Public sources state B2 oral and written from 2026-01-01 for the named naturalisation, reintegration and marriage-declaration procedures. The stale B1 wording on an older Service-Public naturalisation page was excluded. Covered first residence-card procedures remain separately scoped; TCF IRN proves language only and does not replace the civic exam or the authority decision.
- Scope correction after final review: the retained legacy slugs are now explicitly narrowed in title, intent, audience and final-authority metadata to the reviewed Sorbonne faculty, French nationality-procedure and UvA admissions branches. Work, professional, other-institution and French residence routes are stated as outside those pages' reviewed scope; no single receiver is presented as the authority for an unrelated branch.
- Product boundary: FEI and DUO/CvTE support only the retained DELF/DALF, TCF IRN and Staatsexamen NT2 product facts. FEI's stale English TCF format and conflicting first-party retake intervals were not used as settled facts.
- Page disposition: all three pages now record `sourceReviewStatus: reviewed`, `sourceReviewedAt: 2026-07-19`, `reviewedByRole: source-review`, and a named `primaryOfficialAuthorityUrl`, while remaining `contentStatus: verification-pending` for reader-specific acceptance, exceptions, dossier decisions and local execution.
- Route result: removed the France cross-purpose direct next loop and the Netherlands Inburgering/NT2 direct next loop. France and Netherlands now use explicit frontmatter next navigation; all four affected pages are terminal and retain the other route only as non-sequential supporting context.
- Verification: both focused tests passed after confirmed RED failures; after the final authority-scope corrections, `npm test` passed, `npm run launch-check` built 101 pages and passed 37 checks with 0 failures, ending in `READY`, and `git diff --check` passed. Independent standards and specification reviews both ended in `PASS`.
- Delivery boundary: no push, deployment, SSH/server access, DNS, TLS, CMP, advertising, analytics, form, payment or email-delivery change was made. A scoped local commit may be created after the final review; publication requires a separate user instruction.

## 2026-07-19 — France and Netherlands P0 production release

- User accepted the completed France / Netherlands content batch and authorised production publication. Pushed application commit `d2ea2202668a5e31e6c032f376332874a28a57cd` (`content: review France and Netherlands P0 guides`) from `2a634f0` to `d2ea220`; the pre-existing untracked report, prompt, plan and specification files remained unstaged and unchanged.
- Re-ran the local release gate: `npm test` passed; `npm run launch-check` built 101 pages and passed 37 checks with 0 failures; deployment shell syntax and `git diff --check` passed.
- Confirmed the previous production release `/var/www/visalang.org/releases/ee66a0a3273a`, clean server source, Node.js `v22.23.1` and valid Nginx configuration before switching.
- Ran the repository immutable deployment script. Server source fast-forwarded to `d2ea220`; locked dependency installation reported 0 vulnerabilities; server `npm test` and `npm run launch-check` passed; Nginx switched atomically to `/var/www/visalang.org/releases/d2ea2202668a`.
- Retained `/var/www/visalang.org/releases/ee66a0a3273a` as the immediate verified rollback target. No rollback trigger occurred.
- Production smoke passed from the production host: homepage, Guide Library, robots and sitemap returned 200; legacy routes and `www` returned expected canonical 301 responses.
- Public marker checks passed for all three reviewed guides: the narrowed Sorbonne, French nationality-procedure and UvA titles, visible `Verification pending` state, official-source review date, terminal navigation and active release target were online.
- Release boundary: page-level source review is complete for the retained bounded facts, but reader-specific acceptance, exception, dossier, admission and local execution remain official recheck items. Spain's separate named-human acceptance gate remains open. No DNS, TLS, CMP, advertising, analytics, form, payment or email-delivery configuration changed.

## 2026-07-19 — Spain source-pilot project-owner wording acceptance

- The project owner explicitly accepted the final wording of `dele-a2-ccse-spanish-citizenship` and `dele-levels-spanish-citizenship` in the Codex task. No personal reviewer name was supplied, so the acceptance evidence is recorded at the project-owner role level without inferring an identity from local or Git metadata.
- Acceptance scope: closes the human wording-review gate only. It does not change either public guide body, source-review date, `sourceReviewStatus: reviewed`, or `contentStatus: verification-pending`.
- Applicant boundary remains: the Spanish Ministry decides the applicable procedure, evidence and dispensation; Instituto Cervantes defines the exam products; the selected centre controls current local execution. No individual eligibility, accepted-evidence, exemption, fee, date or outcome conclusion was added.
- Content queue result: removed the completed Spain wording gate. The next Agent-capable item is the separately scoped review of the ten remaining pending English Germany A1 support pages.
- Verification: the updated acceptance assertion failed against the old `PENDING` record, then passed after the scoped documentation change; `npm test`, `npm run launch-check` and `git diff --check` passed; independent standards and specification reviews both returned `PASS`.
- Delivery boundary: this entry records the accepted candidate before commit and production publication. Deployment evidence must be recorded separately after the immutable release is verified.

## 2026-08-13 — Bilingual homepage targeted visual optimization

- Scope: implemented the approved targeted evolution for the English and Chinese homepages without changing routes, navigation labels, guide frontmatter, structured-data contracts, advertising configuration, legal copy, or authority-first content rules.
- Shared UI: added `HomeHero.astro`, a generated 4:3 route-verification visual under `src/assets/`, responsive Astro AVIF/WebP output, an explicit responsive preload, one featured-route spotlight, consistent CTA language, and matching bilingual homepage information rhythm.
- Design system: retained `global.css` as the only production stylesheet; unified English and Chinese system sans typography, 8px-based spacing, blue actions, semantic success/warning colours, 8/12/16px control-panel-visual radii, same-theme footer, 150–220ms state feedback, dark mode, reduced motion and accessible focus states.
- Content boundary: kept the Germany A1 emphasis and dynamic primary-discovery counts; no new requirement, acceptance, price, timeline, outcome, social-proof or official-status claim was added.
- Verification: focused UI assertions and `npm test` passed; `npm run build` generated 100 pages; `npm run launch-check` passed 44/44 and ended `READY`; `git diff --check` passed. Responsive checks covered 1440, 1024, 768 and 375px across both homepages, the guide library, one representative guide, a route page and Route Finder with no horizontal overflow. Final Lighthouse measured homepage Performance 100 / LCP 1.16s / CLS 0 / TBT 80ms and representative-guide Performance 100 / LCP 0.76s / CLS 0 / TBT 62ms; lab runs do not provide field INP.
- Review and delivery boundary: independent read-only review found no P0/P1 and identified scoped P2 corrections; after those fixes, the same reviewer returned `PASS`. This window does not commit, push, deploy, preview publicly, approve content, or alter the three pre-existing untracked user planning surfaces.

## 2026-08-14 — FAN-24 content update plan draft

- Scope: created `docs/CONTENT_UPDATE_PLAN_2026-08-14.md` as a six-week, approval-gated content maintenance plan; no guide, route, data module, UI, deployment file or external account was changed.
- Baseline: a read-only inventory of `src/content/guides/*.md` found 53 English guides, 49 with `sourceReviewStatus: reviewed`, 4 telc guides without source-review metadata, 15 `verification-pending` guides, 8 `starter-overview` guides, 17 `complete-route` guides and 13 `core-route` guides.
- Plan order: close the four telc source gaps first, then use Search Console 28/90-day aggregates to select two `verification-pending` country clusters, maintain the highest-demand Germany A1/B1 pages, and allow at most one or two new pages only after evidence and demand gates pass.
- First slice: after plan approval, update `telc-vs-goethe-for-german-visa` end to end within three working days, including authority/source boundaries, focused assertions, ledger/log/Vault sync and independent review. Publication remains separately authorised.
- Data boundary: no Search Console, Analytics, AdSense, production server, production secret, billing or personal data was accessed. Missing search-demand data is an explicit decision input; without it, the plan falls back to source-safety work and does not infer traffic priority.
- Verification: plan-specific repository checks and Paperclip confirmation evidence are recorded in FAN-24. Existing unrelated homepage UI changes remain untouched and unstaged by this task.

## 2026-08-14 — FAN-34 telc vs Goethe authority-first content slice

- Scope: implemented only the first FAN-24 content slice for `telc-vs-goethe-for-german-visa`; the other three telc guides, production state, external accounts and unrelated homepage/UI work remain unchanged.
- Source review: checked the Federal Foreign Office visa entry and certificate guidance, Goethe-Institut exam catalogue, telc exam catalogue, centre finder and FAQ, plus bounded BAMF and German-government route pages. The claim matrix is recorded in `docs/TELC_GOETHE_VISA_SOURCE_REVIEW_2026-08-14.md` with authority, URL, check date, permitted support, boundary and reader action.
- Content result: removed unsupported brand-default, popularity, work-route, nursing-frequency and profession-specific exclusivity claims. Replaced them with a three-layer workflow: save the competent authority's route-specific instruction, compare only exact exam products, then verify current local execution with the selected official or authorised centre.
- Gate result: the page remains `starter-overview`, explicitly `noindex` and advertising-free. Bounded source review is recorded as `reviewed` on 2026-08-14, increasing the controlled English source-review count from 49 to 50 while leaving three telc pages pending.
- Verification: the focused test failed first on the old 2026-06-30 metadata, then passed after the bounded rewrite. `npm test` passed with the new contract included; `npm run launch-check` built 100 pages and passed 44/44 checks with `READY`; `git diff --check` passed.
- Review and delivery boundary: independent Standards review initially found two P2 documentation/template gaps, and independent Spec review found one P2 handoff-boundary gap. All were corrected; the original reviewers rechecked the corrected scope and each returned `PASS` with no remaining P0/P1/P2. No commit, push, preview, deployment, publication or owner approval is claimed; the Vault record remains in human-review state.

## 2026-08-14 — FAN-36 reviewed-source rendering correction

- Review finding: the Founding Engineer found one P1 in the generated `telc-vs-goethe-for-german-visa` route: its reviewed authority metadata rendered correctly in the header, but the shared `GuideLayout` still showed `Official verification pending` because the source fact table was coupled to mature content status.
- Minimal correction: `GuideLayout` now renders the source-reviewed responsibility table whenever the bounded authority metadata is verified. The guide remains `starter-overview`, `noindex` and advertising-free; discovery and content-maturity gates were not changed.
- Regression seam: `tests/telc-window-1.test.js` now builds and reads the generated route, rejects the conflicting pending message, requires the bounded authority/source table and final-decision boundary, and confirms the visible status remains `Starter overview` rather than a mature state.
- Verification: the new rendered-route assertion failed against the old layout, then passed after the one-line condition change. Serial `node tests/telc-window-1.test.js`, `npm test` and `npm run launch-check` passed; launch check built 100 pages, passed 44/44 checks and returned `READY`. Final `git diff --check` is recorded with the FAN-36 resubmission.
- Review and delivery boundary: this correction is awaiting re-review by the same Founding Engineer. No commit, push, preview, deployment, publication or owner approval is claimed.

## 2026-08-14 — FAN-37 telc B1/B2 format and preparation source slice

- Scope: processed only `telc-b1-b2-exam-format-and-preparation`; no other guide, production state, external account or unrelated working-tree change was modified. The page disposition is retain and deepen while continuing `starter-overview`, explicit `noindex` and advertising-free status.
- Source review: checked the current telc product pages for the general `Zertifikat Deutsch / telc Deutsch B1` and `telc Deutsch B2`, downloaded their linked official mock packages, inspected each exact-product scoring section, and checked the telc exam FAQ plus B2 preparation tips. `docs/TELC_B1_B2_FORMAT_SOURCE_REVIEW_2026-08-14.md` records each claim, authority, URL, check date, permitted support, boundary and reader action.
- Content result: separated B1 and B2 timings and delivery formats, recorded the written/oral scoring boundary, qualified telc's current result interval as a non-guaranteed general estimate, and routed current registration, day plan, accessibility and result handover to the selected telc examination centre. Added a product record, official-mock baseline, diagnostic record and repeatable training loop; school, business, nursing, medical and dual-level variants remain out of scope.
- Navigation and maturity: removed the outgoing sequential link to the fee/centre page to avoid the pre-existing two-page next loop. The fee/centre page remains supporting context. Bounded source review increased the controlled English state to 51 reviewed and 2 pending without promoting discovery or content maturity.
- Verification: the new FAN-37 assertion first failed against the old `updatedDate: 2026-06-30`. The review correction then isolated the later FAN-38 contract from the FAN-37 focused file and replaced per-slice front-matter parsers with one shared `frontmatterField(source, name)` helper. After correction, `node tests/telc-window-1.test.js` exited 0 with only the FAN-34 and FAN-37 contracts; the first `npm test` attempt hit a non-assertion concurrent `dist/.prerender` missing-chunk error, then the serial rerun exited 0 with the split FAN-38 contract still covered; `npm run launch-check` built 100 pages, passed 44/44 checks and returned `READY`; final `git diff --check` passed.
- Review and delivery boundary: the P1 reproducibility and P2 duplication findings are corrected and ready for re-review by the same Founding Engineer. No implementation self-approval, commit, push, preview, deployment, publication or owner approval is claimed; the Vault record remains `review` / `pending` / `not_started`.

## 2026-08-14 — FAN-38 telc B1/B2 fees and test centres source slice

- Scope: processed only `telc-b1-b2-fees-and-test-centers`; no other guide, production state, external account or unrelated working-tree change was modified. The page disposition is retain and deepen while continuing `starter-overview`, explicit `noindex` and advertising-free status.
- Source review: checked the current telc centre finder, language-examinations FAQ, Rules and Regulations for telc Examinations and the two exact general B1/B2 product pages. `docs/TELC_B1_B2_FEES_CENTRES_SOURCE_REVIEW_2026-08-14.md` records each claim, authority, URL, check date, permitted support, boundary and reader action.
- Content result: separated telc as exam owner/licensor, the first-party centre finder as a discovery record, and the selected telc examination centre as the candidate's local contract and invoicing party. Added exact-product, centre and written fee-comparison records; routed current price, date, seat, candidate deadline, cancellation, transfer, refund and regional terms to the selected centre without publishing fixed local values.
- Boundary corrections: removed unsupported reasons for centre price differences, prevented the telc centre-administration deadline from becoming a candidate deadline, and made clear that a finder result does not prove an exact product, sitting, seat or fee. A centre quote remains evidence only for its named product, sitting, location and check date.
- Ledger and maturity: bounded source review increased the controlled English state to 52 reviewed and 1 pending without promoting discovery or content maturity. FAN-38 was removed from the immediate queue; the separately scoped work/nursing route remains pending.
- Verification: the new FAN-38 assertion first failed against the old `updatedDate: 2026-06-30`. After review found that the shared window test had been overwritten, the contract was restored as the independent `tests/telc-fees-centres.test.js` and loaded explicitly by `tests/site.test.js`. The focused command and serial `npm test` pass with the FAN-38 contract visible in output; `npm run launch-check` and final `git diff --check` are recorded with the re-review handoff. Earlier full-suite retries were interrupted by concurrent Astro output cleanup, not an assertion failure.
- Review and delivery boundary: the requested P1 test-isolation correction is ready for re-review by the same Founding Engineer. No implementation self-approval, commit, push, preview, deployment, publication or owner approval is claimed; the Vault record remains `review` / `pending` / `not_started`.

## 2026-08-14 — FAN-39 telc work and nursing authority-first source slice

- Scope: processed only `telc-b1-b2-germany-work-nursing`; no other guide, production state, external account or unrelated working-tree change was modified. The page disposition is retain and rewrite while continuing `starter-overview`, explicit `noindex` and advertising-free status.
- Source review: checked the Recognition in Germany procedure and General nurse profile, the current Make it in Germany work-visa-for-qualified-professionals page, the exact `telc Deutsch B1·B2 Pflege` product page and telc exam FAQ. `docs/TELC_WORK_NURSING_SOURCE_REVIEW_2026-08-14.md` records every retained claim's authority, URL, check date, permitted support, boundary and reader action.
- Content result: deleted the unsupported nationwide nursing, work-permit, Blue Card, settlement and citizenship certificate claims. Replaced them with four separate decision records for the competent professional recognition authority, employer, responsible German mission or foreigners authority, and telc plus the selected telc examination centre.
- Reader workflow: requires the exact profession and work location, Recognition Finder result, employer's written job expectations, route-specific immigration instruction, exact accepted certificate and current selected-centre terms. A product page, employer request or national overview cannot decide another authority's question.
- Ledger and maturity: bounded source review increased the controlled English state to 53 reviewed and 0 pending. The four-page telc source-gap queue is complete in the uncommitted review package, without promoting any telc starter page into primary discovery, the sitemap or advertising.
- Verification: the new standalone FAN-39 assertion first failed against the old `updatedDate: 2026-06-30`, then `node tests/telc-work-nursing.test.js` passed after implementation. Review found that the standalone contract was not loaded by the standard suite, so `tests/site.test.js` now requires `telc-work-nursing.test.js`; the final clean `npm test` run passed and printed `FAN-39 telc work and nursing contract passed`. Three earlier suite attempts collided with other active builds writing the shared `dist/` directory and failed with `.prerender` or generated-image `ENOENT` errors before reaching FAN-39; after those processes ended, the serial rerun passed. `npm run launch-check` then built 100 pages, passed 44/44 checks and returned `READY`; `git diff --check` passed.
- Review and delivery boundary: the configured Founding Engineer requested one P1 correction for the missing standard-suite integration. That correction and its documentation update are complete and ready for re-review by the same reviewer. No implementation self-approval, commit, push, preview, deployment, publication or owner approval is claimed; the Vault record remains `review` / `pending` / `not_started`.

## 2026-08-14 — FAN-73 guide trust consistency and interaction hierarchy

- Scope: implemented only the approved Stage A guide-library and shared English-guide trust slice. No guide facts, source-review decisions, routes, product strategy, deployment files, external accounts, commits, pushes or production state were changed.
- Trust consistency: Chinese Guide Library cards now read `sourceReviewStatus`, `sourceReviewedAt`, `updatedDate` and `readingTime` from each controlled `zh-germany-a1.ts` record. The index retains eight reviewed Chinese records and an explicit missing-status `pending` fallback; it no longer borrows an English-card state or publishes the legacy hard-coded date and reading time. Default updated-date sorting now uses each Chinese record's real `updatedDate`.
- Guide hierarchy: the shared English `GuideLayout` now renders one Direct answer container instead of a callout nested inside another callout. A compact Responsibility line names the controlled final authority when verified, otherwise tells the reader to confirm it; VisaLang remains a verification workflow rather than an individual decision maker.
- Interaction targets: desktop primary navigation links and disclosure buttons, the mobile menu trigger, the More filters disclosure and active-filter removal chips now have a computed minimum 44px hit area while retaining the current type, spacing and one-stylesheet token system.
- Regression seam: added `tests/fan-73-guide-trust.test.js` and loaded it through `tests/site.test.js`. The focused assertion first failed on the legacy hard-coded Chinese pending state, then passed after the controlled metadata, fail-closed, sorting, answer hierarchy and target-size corrections.
- Verification: `node tests/fan-73-guide-trust.test.js` passed; the final shared-workspace `npm test` passed; `npm run launch-check` built 100 pages and passed 44/44 checks with `READY`; final `git diff --check` is recorded with the review handoff. Earlier full-suite attempts were interrupted by another workspace process cleaning the shared `.astro` or `dist` output; the same suite first passed in an isolated run snapshot and then passed in the shared workspace once the competing process ended.
- Visual and keyboard evidence: local Chrome CDP captures cover the Guide Library and a representative GuideLayout article at 1440, 768 and true 390 CSS px, plus a dedicated 390px bottom-state capture. The corrected article measured `clientWidth=375` and `scrollWidth=375`; the full correction CTA stayed within `41..334` and measured 48px high. Computed targets were 44px for every desktop primary-nav control, the mobile Menu trigger, More filters and the active filter chip. The closed-state keyboard path was Search -> Purpose -> Country -> More filters -> Active filter; the closed mobile disclosure correctly skipped its hidden links.
- Review and delivery boundary: implementation verification is complete but independent review is still required. The same uninvolved reviewer must resolve the FAN-73 review loop and return `PASS` after any P0/P1/P2 corrections. No self-approval, commit, push, deployment, publication, preview approval or owner approval is claimed; the Vault record stays `review` / `pending` / `not_started`.

## 2026-08-15 — FAN-40 Netherlands Inburgering verification-pending slice

- Selection boundary: FAN-35 revision 3 selected only `dutch-inburgering-a2-b1-for-integration-and-citizenship` through the no-data risk fallback. Search Console had no complete shared 28/90-day window, so this is not presented as a traffic, ranking, click or revenue priority. The separate UvA/NT2 page remains outside the editing scope.
- Source review: reopened the two current IND pages and the two current DUO/Inburgeren pages on 2026-08-15. `docs/NETHERLANDS_INBURGERING_SOURCE_REVIEW_2026-08-15.md` records each authority, URL, permitted support, boundary and reader verification action.
- Disposition: retain and deepen the existing page without merging or restoring discovery. It remains `verification-pending`, explicit noindex, advertising-free and terminal because individual law/cohort, PIP route, level, components, deadline, exemption, evidence and outcome remain authority-specific.
- Reader workflow and internal links: preserve the IND -> municipality -> DUO -> Mijn Inburgering/PIP responsibility split, require a personal route record, and keep UvA/NT2 as non-sequential supporting context rather than a next step.
- Regression seam: updated the standard-suite-loaded `tests/netherlands-window-b.test.js` contract to require the 2026-08-15 source-review metadata and visible source-check date while retaining discovery, authority, terminal-route and UvA/NT2 byte-boundary assertions.
- Verification: `node tests/netherlands-window-b.test.js` passed. After the reviewer requested current reproducibility evidence, two shared-worktree `npm test` attempts hit an Astro optimized-image `ENOENT` while other active work cleaned the same `dist/`; the unchanged working tree was copied to the Paperclip run-owned scratch directory and the isolated `npm test` exited 0, including `Netherlands window B remediation rules passed`. In that same isolated snapshot, `npm run launch-check` built 100 pages, passed 44/44 checks and ended `READY`; final repository `git diff --check` passed. Independent reviewer PASS remains required before completion.
- Delivery boundary: no commit, push, deployment, publication or external-account access is authorised or claimed. The required Vault record remains a human-review artifact, not approval or publication evidence.

## 2026-08-15 — FAN-43 Germany B1 timeline core-page recheck

- Scope and selection: rechecked only `germany-b1-settlement-citizenship-timeline`, the page selected by FAN-35 revision 3 before implementation. This corrects the first review submission, which incorrectly used the no-data fallback and reviewed the citizenship language-proof page. No other Germany B1 page, template or Chinese content was changed for FAN-43.
- Source result: BAMF-NAvI remains an authority locator; the German Government naturalisation process still directs readers to their competent nationality authority and states that processing varies by individual case; Goethe and telc still provide product/centre lookup rather than a reader-specific seat, deadline, result or acceptance decision. The exact sources, check date, permitted support and boundaries are recorded in `docs/GERMANY_B1_TIMELINE_SOURCE_RECHECK_2026-08-15.md`.
- No-change disposition: the selected page already names the correct authority/centre split, requires reader-entered or officially confirmed dates, rejects eligibility and standard-duration calculations, preserves the reviewed/core discovery gate, and links to both requirement branches and the terminal checklist. No public claim required correction, so `updatedDate` and `sourceReviewedAt` were not refreshed merely for recency.
- Regression seam: `tests/fan-43-germany-b1-recheck.test.js`, loaded by the standard suite, fails if FAN-35's selected page loses required front matter, the authority/centre timing boundary, the no-change date discipline, the reader action or its three route links.
- Verification: `node tests/fan-43-germany-b1-recheck.test.js` and `git diff --check` passed in the workspace. Two workspace-local `npm test` attempts passed the FAN-43 assertion but failed later when another process removed shared Astro image/prerender output. The same current source snapshot was therefore verified in `$PAPERCLIP_RUN_SCRATCH_DIR/fan-43-verify`: `npm test` exited 0, and `npm run launch-check` built 100 pages, passed 44/44 checks and returned `READY` using an isolated `dist`.
- Delivery boundary: no commit, push, deployment, publication, production/account access or Chinese sync is claimed. Verification, Obsidian sync and independent review are recorded separately once completed.
## 2026-08-15 — FAN-42 Germany A1 requirement root review

- Scope and selection: reviewed only `german-family-reunion-language-requirement`, selected by FAN-35 revision 3 as a non-traffic priority because it is the high-risk requirement root and its source review dated 2026-07-18. Search Console remained in processing, so no ranking, click or revenue inference was used.
- Source result: checked BAMF's family-route overview and third-country-sponsor route, the Federal Foreign Office language-proof FAQ and German-spouse application workflow, and Goethe's exam catalogue. `docs/GERMANY_A1_REQUIREMENT_SOURCE_REVIEW_2026-08-15.md` records the authority, URL, check date, allowed support, boundary and reader action for each retained claim.
- Content result: retained the route-first structure and `complete-route` discovery state; clarified that the mission/competent immigration authority controls visa-route and document instructions while the selected exam centre controls only local booking/test-day execution; added the route-specific mission-to-foreigners-authority workflow. Only this English page's actual review dates changed. The already-correct Chinese authority split was not refreshed.
- Regression seam: `tests/fan-42-germany-a1-requirement.test.js` fails if the selected slug/date, official handoff, authority split, Route Finder action or next-guide link regresses, and is loaded by the standard suite. After independent review found the shared content-integrity contract still expected the page's pre-review date, `tests/content-integrity.test.js` was narrowed to expect `2026-08-15` only for this substantively updated slug; the other Germany A1 date contracts remain unchanged.
- Verification: after the P1 correction, `node tests/fan-42-germany-a1-requirement.test.js` and `node tests/germany-a1-cluster.test.js` passed. The first combined standard-suite attempt hit a concurrent optimized-image `ENOENT` in shared `dist/`; the clean serial `npm test` rerun exited 0 and printed the FAN-42 contract. `npm run launch-check` then built 100 pages, passed 44/44 checks and returned `READY`; final `git diff --check` passed.
- Review boundary: implementation and automated verification are complete. The configured uninvolved reviewer must still close P0/P1/P2 and return `PASS`; no self-approval, commit, push, deploy, publication or owner approval is claimed.

## 2026-08-21 — FAN-273 404 recovery experience

- Scope: upgraded only the generated 404 recovery surface, its focused styles and regression coverage. No guide facts, content-maturity state, route eligibility, advertising policy, external account, production state or unrelated working-tree change was modified.
- Recovery flow: replaced the single homepage link with a progressively enhanced GET search using the existing Guide Library `q` parameter, plus clearly labelled routes to Route Finder, the reviewed guide library and the homepage. Because the static library applies filtering client-side, a visible `<noscript>` fallback accurately sends script-disabled readers to the complete unfiltered library. The page remains explicitly `noindex` and advertising-free.
- Responsive and accessibility result: preserved one H1, semantic form labels and a named recovery navigation; controls have 48px minimum targets, long labels may wrap, and the 768px breakpoint stacks the search controls. A true 390px Chrome device-emulation check measured `clientWidth=390` and `scrollWidth=390` after the mobile correction.
- Regression seam: added `tests/fan-273-404-recovery.test.js` and loaded it through `tests/site.test.js`. The focused contract first failed against the old one-link page, then passed after implementation.
- Verification: the focused test and scoped `git diff --check` passed; `npm test` passed with the FAN-273 contract visible; `npm run launch-check` built 100 pages, passed 46/46 checks and returned `READY`. Desktop 1440px and true 390px Chrome captures passed visual inspection. The Impeccable detector reported only four pre-existing side-border warnings outside the FAN-273 selectors.
- Review and delivery boundary: application commit `c31ca2a` records the initial implementation/test scope, and `54fbc3c` closes the semantic-token, maintenance-log and no-script-boundary findings. The same uninvolved Standards and Spec reviewers rechecked the corrected range and each returned `PASS` with no remaining P0/P1/P2. No push, preview publication, deployment, production/account access or owner approval is claimed; the Vault record remains `review` / `pending` / `not_started`.


## 2026-09-01 — VisaLang roadmap detailed execution taskbook

- Scope: converted `docs/VISALANG_MASTER_ROADMAP_2026-09-01.md` and its current-state/90-day companions into `docs/VISALANG_DETAILED_EXECUTION_TASKS_2026-09-01.md`; added only the new taskbook link to the master roadmap. Existing unrelated working-tree changes were preserved.
- Execution design: defined 49 task cards across Phase 0–6 with status, priority, owner, dependencies, steps, deliverables, evidence, acceptance and stop rules. Added executable Day 30 and Day 60 gates, a 13-week dependency-driven schedule, owner/contact/account gates, explicit later-phase exit dependencies, a durable evidence-register schema, scoring controls, pre-registered effect rules and reusable task/gate templates.
- Safety boundary: the taskbook does not authorize login, external-account changes, commit, push, deployment, route expansion, advertising expansion or commercial activation. Missing owner or evidence keeps the related capability closed. It also records that the current working tree must be rechecked rather than inferred from the dated current-state snapshot.
- Verification: after review corrections, focused document assertions found 49 unique, field-complete task cards, no duplicate IDs and exactly one initial `READY` task (`VL-000`). `npm test` passed; `npm run launch-check` built 100 pages, passed 46/46 and returned `READY`; `git diff --check` passed.
- Review and delivery boundary: the independent VisaLang Auditor initially returned `FAIL` with two P1 and three P2 findings; all five were closed. Its second review found one P1 about missing Days 61–90 second-route/commercial preparation; that P1 was closed while retaining Phase 2/4 implementation gates. Its third review found two P2 execution-spec inconsistencies about the weekly cap unit and no-candidate owner; both were closed. The same Auditor's final re-review returned `PASS` with `findings: []`, confirming 49 unique field-complete cards, one initial `READY` task, Day 30/60/90 dependencies, safe conditional preparation and later-phase gates. This PASS does not authorize commit, push, deployment, publication or external-account action; all remain pending/not started.


## 2026-09-01 — 49-card execution programme batch 1 foundation

- Authorization and scope: the user instructed execution of all 49 cards and separately designated a dedicated independent review Agent. This batch implements only local/read-only Phase 0/1 foundations and preparation: `VL-000`, `VL-GOV-003`, `VL-DATA-001`, `VL-DATA-002`, a partial `VL-HEALTH-001`, the `VL-GOV-001` input request, and read-only preparation for `VL-SOURCE-001` / `VL-ASSET-001`. It does not claim that external owner, account, data, production or later-phase gates have passed.
- Execution board and review role: created `docs/VISALANG_EXECUTION_BOARD_2026-09-01.md` with all 49 unique tasks and explicit blockers; recorded the active `VisaLang Execution Auditor` assignment in `docs/VISALANG_INDEPENDENT_AUDITOR_AGENT.md`. The Auditor is independent and read-only and cannot replace Business/Data/Ads/Contact/Release/Rollback decisions.
- Governance and owner input: created `docs/OPERATIONS_EVIDENCE_REGISTER.md` with eight blocked evidence records and `docs/VISALANG_OWNER_INPUT_REQUEST_2026-09-01.md` with a no-secrets role/authorization reply form. Unknown owners, current production version, Search Console, Analytics, AdSense, CMP, contact, release and rollback remain fail-closed.
- Data and weekly reporting: created draft `docs/GROWTH_DATA_DICTIONARY.md` and replaced `docs/WEEKLY_OPERATING_REVIEW.md` with a fixed-window, evidence-ID, privacy-safe template. Analytics, AdSense and CMP remain separate `CLOSED_FOR_PLANNING / UNVERIFIED` capabilities; no waitlist/signup or fabricated conversion fields remain. The dictionary is not effective until a Data Owner accepts it.
- Health and content preparation: created `docs/SITE_HEALTH_BASELINE_2026-09-01.md` and `docs/VISALANG_CONTENT_SOURCE_PREPARATION_2026-09-01.md`. The public sample checked seven URLs: homepage, A1, B1, Guide Library, robots and sitemap returned 200; a synthetic missing URL returned 404 with `noindex` and no AdSense loader; no sampled 5xx occurred. This is not a deployed-commit or uptime attestation. The content preparation identifies exactly 23 starter/pending pages and a risk-first Germany queue, but does not approve expiry dates, dispositions, discovery changes or source-owner responsibility.
- Verification: focused structural assertions passed for 49 board tasks, eight 15-field evidence records and 23 proposed dispositions. `npm test` passed. `npm run launch-check` built 100 pages, passed 46/46 and returned `READY`. `git diff --check` passed.
- Current blockers: Business Owner identity/decision, role backups and SLAs, Data/Content/Ads/Contact/Release/Rollback owners, Search Console and account evidence, production-version authorization, source cadence approval and health thresholds remain pending. No commit, push, deployment, publication, account login/change, email test, index/advertising change or production action was performed.
- Review state: the root-level `VisaLang Execution Auditor` initially returned `FAIL` with one P1 and three P2 findings. The bounded contact test authorization, health NA values, preparation/build boundary and `goethe-b1-study-plan` provenance were corrected within scope. The same Auditor re-reviewed the batch and returned `PASS` with `findings: []`. `owner_authorization` remains `pending` and `deployment_status` remains `not_started`; therefore `VL-000` is `REVIEW_PASS_OWNER_PENDING`, not `DONE`, and no later dependency is unlocked.


## 2026-09-01 — 49-card execution programme batch 2 governance preparation

- Scope and dependency boundary: preserved the completed batch-1 Auditor `PASS` and added only decision-preparation evidence for `VL-GOV-003A` and `VL-GOV-004`. Both task cards remain `GATED` / `BLOCKED_INPUT`; this batch does not close `VL-GOV-003`, appoint an owner, alter an old plan, or manufacture a historical approval.
- Historical-plan preparation: created `docs/VISALANG_HISTORICAL_PLAN_SUPERSESSION_PREPARATION_2026-09-01.md`. It confirms that the four named historical plans can still be misread, proposes one additive post-H1 superseded banner linking the three-layer 2026-09-01 chain and detailed taskbook, preserves their historical bodies, and keeps README/`CONTENT_WORKFLOW` corrections as separate scopes. No target historical plan, README, or workflow file was changed.
- Historical-disposition preparation: created `docs/VISALANG_HISTORICAL_DISPOSITION_PREPARATION_2026-09-01.md` with 18 timeboxed package/group rows. Deployment, independent-review and owner-acceptance states remain separate. The safe current decision is HOLD: `80c6d04` is the last directly recorded verified App payload, while current production/release/rollback evidence remains unverified. Missing reviews and owner choices are not inferred.
- Board update: only the `VL-GOV-003A` and `VL-GOV-004` rows now point to these preparation files and state the remaining dependency/owner decisions. Status counts remain unchanged; no task is marked `DONE` or unlocked.
- Verification: focused assertions confirmed the four target files, all current planning links, exactly 18 historical gap rows, preparation-only wording and board evidence links. `git diff --check` passed. `npm test` and `npm run launch-check` were not rerun because this batch adds governance-preparation Markdown and two board locators only; the immediately preceding frozen batch already passed the full suite and 100-page/46-of-46 launch gate, and no runtime/page/route/metadata file changed.
- Safety boundary: no commit, push, deployment, publication, external account, server, email, Vault, content, noindex, advertising, release or rollback action was performed. Business Owner disposition and Programme Owner authorization remain pending.
- Review state: the root-level `VisaLang Execution Auditor` initially returned `FAIL` with two P2 findings. Both reports were corrected to the current batch-1 `PASS` / `REVIEW_PASS_OWNER_PENDING` state, and their change inventory now distinguishes each task sub-scope from the full batch-2 manifest. The same Auditor re-reviewed the exact frozen scope and returned `PASS` with `findings: []`. Business Owner/role/dependency blockers remain; the PASS does not authorize banner application, owner disposition, commit, push, deployment, account action, release, rollback or production change.


## 2026-09-01 — 49-card execution programme batch 3 phase-gate precheck

- Scope and dependency boundary: added one dated preparation record for `VL-GOV-005` and `VL-D30-001`, updated only those two execution-board rows, and appended this log entry. Both gate tasks remain `GATED`; no prerequisite, owner acceptance, exception, account permission, gate decision or downstream phase was created.
- Phase 0 result: `docs/VISALANG_PHASE0_DAY30_GATE_PRECHECK_2026-09-01.md` records `0 PASS / 6 BLOCKED / 0 NOT_APPLICABLE`. The five named prerequisites and the Business Owner Phase 0 decision are all blocked. The safe boundary remains official-source maintenance, read-only health checks and document governance; this is not commit/deployment/account authority.
- Day 30 result: the same record shows `0 PASS / 11 BLOCKED / 0 NOT_APPLICABLE`. Responsibility, Search Console access/snapshot/export, the effective reporting contract, separate Analytics/AdSense/CMP decisions, two valid dated reports and the Business Owner gate decision are absent. Growth content cannot bypass the gate.
- Indirect dependencies: `VL-000`/`VL-GOV-001`, effective `VL-DATA-001`, and `VL-HEALTH-001` are also `BLOCKED`. These three checks explain the gate result and are not double-counted in the 17 direct condition instances.
- Evidence policy: every row gives an exact inspected locator, date, required owner, blocker, next action and exception expiry. No approved exception exists. Drafts, automated tests and Independent Auditor PASS are not treated as owner acceptance or external evidence.
- Verification: focused assertions confirmed six Phase 0 rows, eleven Day 30 rows, three indirect rows, all direct statuses `BLOCKED`, zero `PASS`/`NOT_APPLICABLE`, board evidence links and unchanged 49-card status counts. `git diff --check` passed. `npm test` and `npm run launch-check` were not rerun because the scope is gate-preparation Markdown plus two board locators; no runtime/page/route/metadata/content file changed, and the preceding frozen implementation batch already passed the full suite and 100-page/46-of-46 launch gate.
- Safety boundary: no commit, push, deployment, publication, external account, server, email, Vault, source content, advertising, release or rollback action was performed. Owner authorization and deployment remain pending/not started.
- Review state: the root-level `VisaLang Execution Auditor` initially returned `FAIL` with one P2 provenance finding. The Git capture was relabelled as a timestamped pre-integration snapshot that predates the report/board/log integration, and the final change boundary now distinguishes the original read-only inspection from batch 3. The same Auditor reviewed the corrected frozen scope and returned a superseding `PASS` with `findings: []`. Owner authorization remains pending and deployment remains not started; the PASS does not open either gate or authorize any external/release action.


## 2026-09-01 — 49-card execution programme batch 4 all-card outcome

- Scope: created `docs/VISALANG_49_CARD_EXECUTION_OUTCOME_2026-09-01.md` and appended this entry. No taskbook, board row, runtime, route, metadata, source content, account, server or production surface changed in this batch.
- All-card accounting: all 49 unique task IDs remain in taskbook order with a nonempty owner role, dependency, blocker, next action and evidence location. Current states are `REVIEW_PASS_OWNER_PENDING` 1, `PREPARED_BLOCKED` 4, `BLOCKED_INPUT` 12 and `GATED` 32; `DONE` 0. These states are not renamed as completion and do not unlock dependencies.
- Gate outcome: Phase 0 remains `0 PASS / 6 BLOCKED / 0 NOT_APPLICABLE`; Day 30 remains `0 / 11 / 0`. Day 60 growth selection is gated; at its calendar gate, missing stable data permits only a dated blocked/risk-maintenance decision. Day 90 still requires a dated owner `go` / `wait` / `stop` record and may use evidence-based `wait` inputs when Phase 1, authorization or evidence is insufficient; it is not itself Phase 2 entry. Second-route, Chinese, monetization and later implementation remain gated by their exact dependencies.
- Local verification: final `npm test` passed; Astro built 100 pages; `npm run launch-check` returned 46 PASS / 0 FAIL and `READY`; `git diff --check` passed. These results are local evidence, not production, deployment, account or owner evidence.
- Dirty-tree control: immediately before integrating the outcome report the tree had zero staged paths, six modified tracked paths and thirteen untracked paths. The report itself becomes one additional untracked path. Existing and unrelated changes were preserved; no Git/worktree cleanup, reset, commit or attribution was performed. The launch-check's `clean:astro` step affected only ignored generated caches.
- Safety result: no commit, push, deployment, publication, external-account login/change, Search Console export, email state test, Analytics/AdSense/CMP action, server action, release or rollback was performed. Owner authorization is pending and deployment is not started.
- Resume boundary: the common start is `VL-000` Business Owner acceptance -> `VL-GOV-001` -> `VL-GOV-002`; Phase 0 then branches through `VL-GOV-003` -> `VL-GOV-003A`/`VL-GOV-004` and separately `VL-REL-001`, before `VL-GOV-005` can decide the gate. `docs/VISALANG_OWNER_INPUT_REQUEST_2026-09-01.md` is the authoritative request; silence is not acceptance.
- Review state: the root-level `VisaLang Execution Auditor` initially returned `FAIL` with one P2 later-gate/dependency-model finding. After the nonexistent intermediate gate and unsupported report-count claims were removed and the exact Day 60, Day 90 and Phase 0 branches restored, the same Auditor re-reviewed the frozen all-card scope and returned `PASS` with `findings: []` and `programme_execution_outcome: BLOCKED_WITH_EVIDENCE`. It confirmed 49/49 accounting and `business_programme_done_cards: 0`. Owner authorization remains pending and deployment remains not started; the PASS supplies neither.


## 2026-09-01 — Scheme 3 one-week content contraction release-candidate freeze

- Scope: implemented the sole active `VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md` on branch `codex/scheme-3-one-week-content` from baseline `2ef029f28c03a5838b3ec9add90d851259e81f82`. Existing unrelated dirty and untracked work recorded in the SDD baseline was preserved. No commit, push, deployment, public preview, external-account change or AdSense review submission was performed.
- Content result: retained and rebuilt 14 English pillars plus five independently structured Chinese pillars. English depth is 1,225–1,383 words; Chinese depth is 1,801–2,612 Han characters. Page-specific responsibility, decision, mistake, next-action, scenario and original-asset gates are enforced, and the three dated source ledgers retain source authority, permitted support and boundary fields.
- Publication result: generated exactly 81 HTML pages. The sitemap contains 35 indexable canonicals; 46 pages are `noindex`; only the 14 English pillars load AdSense. The remaining fail-closed groups are exactly 23 pending English guides, 12 categories and 11 policy/placeholder/error routes. Sixteen non-pillar home, Hub, directory, tool and trust pages stay indexable without ads.
- Merge result: after the relevant English and Chinese content batches received independent `PASS`, removed 16 absorbed English sources and three Chinese sources and enabled exactly 19 unique, single-hop 301 rules. Generated internal links, canonicals and the exact seven reciprocal hreflang pairs point directly to successful, indexable targets rather than old URLs.
- Tool and route result: the English A1/B1 and Chinese A1 Hubs expose retained pillars only. The five existing tools add page-specific use conditions, example input/output, failure boundaries and official follow-up actions without expanding product functionality.
- Automated verification: a fresh root run of `npm test` exited 0 and included all historical regressions plus 13 Scheme 3 focused tests. A fresh `npm run launch-check` rebuilt 81 pages and returned 54 PASS / 0 FAIL / `READY`. The exact release matrix, redirects, ads, sitemap, hreflang, source-ledger shape, content depth and cross-page uniqueness checks passed. `git diff --check` passed before evidence integration and is required again at the final freeze. The only non-failing output is the repository's known Node module-type warning for direct TypeScript imports.
- Responsive verification: local Astro preview screenshots and DOM measurements at 375×900 and 1440×1000 covered an English pillar, Chinese pillar, Route Hub, Route Finder, pending guide and redirect target. All 12 samples had visible H1/main content, correct mobile/desktop navigation and no page-level horizontal overflow. The pending sample rendered `noindex,follow`, no ads and no generated next-guide link; the English pillar/redirect target loaded ads, while Chinese/Hub/tool/pending samples did not.
- Review state: the structural, 14-English-pillar and five-Chinese-pillar batches each reached `PASS` with `findings: []` from the designated independent Auditor. The same Auditor then reviewed the complete frozen atomic-merge candidate and returned final full-site `PASS` with `findings: []`; its report independently confirms the 81/35/46/14/23/12/11/19/7 matrix and no scope drift. This closes only the content/implementation review gate and supplies no owner, commit, deployment, external-account or formal Vault authorization.
- Vault boundary: the mandated `/Users/fanlw/Documents/Website-Content-Hub/` root and its required template are not present on this host or mounted volumes. A truthful review-state payload is staged in `docs/VISALANG_SCHEME_3_OBSIDIAN_SYNC_PAYLOAD_2026-09-01.md`, but it is not a formal Vault sync and is not marked approved, deployed or published. Correct Vault mounting/template access remains required before the Obsidian acceptance item can be closed.

## 2026-09-08 — Master Package T01–T02 integration and baseline

- Scope: copied the eight user-provided Markdown/CSV Master Package artifacts into `docs/master-package-2026-09-08/`; added the source map and execution record; and updated the README authority statement. No product source, guide content, route, redirect, deployment configuration, or generated output changed.
- Baseline: recorded HEAD `4cb57e8744c752fed1881281e69e7b24cc7281c4` on `codex/scheme-3-one-week-content`, a normal intentionally dirty checkout, Node `v22.23.2`, npm `10.9.8`, Astro `7.1.1`, and the controller's passing baseline `npm test`, 81-page build, and 54/54 local launch-check evidence. The older Scheme 3 candidate is preserved unreconciled state; it is not current execution authority or Master Package acceptance proof.
- Authority and release boundary: the direct 2026-09-08 user instruction makes the local Master Package the governing work sequence. Owner authorization and deployment remain pending; no commit, push, deploy, external-account, production, or release action occurred or is claimed.

## 2026-09-08 — Master Package T03 P0 authority-boundary correction (implementation awaiting independent audit)

- Scope: corrected only the English Goethe A1 30-day study plan and retained fee guide. The production mutation caught was reusing a page's exam/local authority for the `Current route requirement and accepted proof` verification-table row. A field-level authority split now keeps each page-wide task authority (Goethe/local administration for practice; selected centre for fees/booking) separate from the mission/receiving-authority route-proof row.
- Retention: restored `goethe-a1-fees-by-country.md` non-destructively from repository history, removed only its obsolete source-to-centres redirect from `public/_redirects` and the manifest, and removed its lone support reference to another retired page. The route is directly generated but remains fail-closed/noindex and absent from the sitemap/ads allowlist; all other Scheme 3 mappings and discovery policy remain unchanged. Fee-data rewrite and stale-price review remain deferred.
- Regression coverage: `tests/task-2-p0-render.test.js` builds actual English and Chinese HTML, first failed against the public fee redirect, then passed after the narrow fix. It verifies direct fee-route generation, its self-canonical, absence from both redirect sources, centre/exam task authority, mission/receiving-authority proof row and source, and absence of `检查文中` / `检查 hub 链接`. The aligned collection, redirect, matrix and content-map contracts now record 38 sources, 18 redirects, 82 generated pages, 24 pending English guides and 47 noindex pages.
- Verification: focused authority, render, publication, atomic-merge and release-matrix tests passed; `npm test` passed with only the pre-existing Node module-type warnings; `git diff --check` passed. No commit, push, deployment, publication or external action was performed.
- Review boundary: automated checks and self-review are not independent approval. The required separate VisaLang Independent Auditor review remains pending; no owner or deployment decision is claimed.

## 2026-09-08 — Master Package T04–T05 inventory and fail-closed claim contract

- Scope: added a typed URL/support inventory that preserves 64 audited rows, 14 discovery-only rows, and 24 source-discovered routes, plus a minimal versioned claim/exam/rule contract seeded only with source-checked Germany A1 authority/product boundaries. Existing routes, content, redirects, manifest, package CSVs, and deployment surfaces were not changed in this task.
- Evidence state: the inventory retains one duplicate canonical path without collapsing rows, records the current 18 manifest retirement mappings and 36 policy-derived pending/noindex entries, and derives Chinese guide state from authoritative `zhGermanyA1Guides` metadata rather than Astro wrappers. Source-discovered inputs are sorted by URL then source path before stable IDs are assigned. HTTP, GSC, backlink, migration, local-fee, booking, availability, exception, and individual-outcome evidence remain fail-closed where not verified; unknown fee amounts/currencies are null, never zero or free.
- Verification and boundary: focused T04/T05 tests first failed before their modules existed and passed after implementation; review remediation additionally verified exact-version history/duplicate handling plus strict real-calendar-date, source-check, review, and effective-range gates. Relevant route, P0 render, publication and content-map checks plus `git diff --check` passed. The same separate task-quality reviewer approved T04–T05 with no Critical or Important findings; this is not the repository-mandated final independent Auditor approval. No migration, redirect/reindex action, release decision, commit, push, deployment, external-account action, or owner approval occurred or is claimed.

## 2026-09-08 — Master Package T06–T08 presentation, route support state, C01 and C07

- Scope: completed the first-batch article-presentation, home/route-support, C01, and English C07 implementation. Shared templates now show page-specific direct answers immediately after the title, a concise scope/source/date boundary, one verification alert, and reader-facing coverage wording. The English and Chinese homes and `/routes/` now state the actual support boundary: Germany A1 family reunion is configured; B1 is guide-only; other selector entries are verification-only.
- Authority and publication boundary: C01 and C07 use exact current 2026-09-08.1 Claim Registry records. C07 separates Goethe product facts, receiving-authority acceptance/recency, and reader-specific facts; its China “usually accepted” wording remains China-application-location-only and non-guaranteed. English C07 is restored as generated, self-canonical, `noindex,follow`, ad-free, outside sitemap/discovery and the six-pillar sequence. Only its English redirect was removed; the Chinese legacy redirect remains.
- Matrix and verification: C07 changes current counts to 39 English guide sources, 25 pending English guides, 17 redirects, 83 generated pages, and 48 noindex pages; sitemap URLs (35), ad-enabled pages (14), and six English/five Chinese pillars are unchanged. Focused guide-render and home/route contracts were RED then GREEN; relevant claim, route, publication, content, render, release-matrix checks, `npm run build`, and `git diff --check` passed. After both scoped fix rounds, the same task-quality reviewer re-reviewed and **Approved** Task 4 with no Critical/Important findings. Owner decision and deployment remain pending; no commit, push, deploy, publication, Vault, or external action occurred.

## 2026-09-09 — Master Package T09 independent-audit remediation and review closure

- Audit round 1: the required fresh VisaLang Independent Auditor returned `FAIL` with three P1 and two P2 findings: a test-only guide remained in `dist`, one C01 Federal Foreign Office URL used the wrong path, the submitted per-article source ledger was incomplete, claim `usedBy` was not an enforced consumer/locale gate, and the frozen records contained timing/count/name/dimension conflicts.
- Round-1 remediation: normal builds now clean `dist`; the invalid-claim fixture restores a clean build and launch-check rejects generated guides without current source/manifest ownership. C01 uses the reviewed slash-form FFO URL. Deterministic claims require a stable authorised consumer ID plus compatible locale; missing, wrong, stale, or cross-locale consumers fail closed. Task/payload/redirect/viewport records were reconciled.
- Audit round 2 and correction: the same Independent Auditor returned `FAIL` with one P1 while confirming the other four round-1 findings resolved. The fee article's ledger omitted its rendered FFO route-authority URL, and the Markdown source extractor could return an empty set and make coverage vacuous. The repaired registered test derives de-duplicated Markdown plus frontmatter authority URLs, rejects empty sets, requires exact C01/fee/C07 counts of 4/4/3, and verifies every URL in real rendered HTML. It first failed RED on the exact missing fee FFO row; the complete eight-field row was then added and GREEN restored. A separate read-only task reviewer returned Spec PASS / Task quality Approved / `findings: []`.
- Round-3 candidate evidence: `npm test` exited 0 at 11:27; without rebuilding afterward, direct launch-check passed 55/55 with no fixture source/output and matrix 83 HTML / 35 sitemap / 48 noindex / 14 ads. A separate clean `npm run build` produced 83 pages at 11:28, and `npm run launch-check` rebuilt and passed 55/55. `git diff --check`, eight byte-for-byte package comparisons, and validated baseline gzip/tar checks passed. The round-3 candidate freeze is `2026-09-09 11:43 Asia/Shanghai`.
- Independent review result: the same VisaLang Independent Auditor returned round-3 `PASS` with `findings: []`, closing the T01–T09 local content/implementation review gate. The report discloses one Auditor-side invocation of a focused test that rebuilt only ignored `dist`/Astro cache output; source-candidate porcelain remained 146 = 79 modified / 17 deleted / 50 untracked / 0 staged, regenerated output remained 83 pages, and direct launch-check remained 55/55.
- Boundary: T09 is `completed`, while T10–T34 remain `pending`. Owner approval, commit, push, deployment, publication, production verification, formal Vault sync, and external-account actions remain outside this local candidate. The required Vault directory/template are absent; the repository payload remains `status: review`, `needs_human_review: true`, `owner_decision: pending`, and `deployment_status: not_started`, so it is not a formal sync.

## 2026-09-09 — Master Package M2-A T10–T14 local implementation and review freeze

- Scope and baseline: implemented only T10–T14 on `codex/scheme-3-one-week-content` from unchanged HEAD/baseline `4cb57e8744c752fed1881281e69e7b24cc7281c4`. The extensive pre-existing T01–T09/Scheme 3 dirty tree and controller recovery artifacts were preserved; the result remains uncommitted and `not_deployed`.
- T10 exact products: added one versioned registry for the adult Goethe-Zertifikat A1: Start Deutsch 1 and Start Deutsch 1 / telc Deutsch A1 products. English, Chinese and Exam Comparison consume independently sourced duration, component, oral, scoring and whole/partial-sitting facts. Local fee, centre execution and receiving-authority acceptance remain separate; unknown fields are not ranked, duplicated or guessed.
- T11 staged working list: decomposed the configured Germany family-reunion A1 path into stable atomic requirement, exam-choice, booking, exam/certificate and submission-review tasks. Every item names its owner, source route, done-when evidence and boundary; the list explicitly does not replace a complete route-specific visa checklist.
- T12 local fees and centres: added four 2026 Goethe rows—Germany EUR 155 regular and EUR 124 exact-discount arithmetic, Beijing CNY 1,400 current-learner and CNY 1,500 non-current-learner—and two matching official centre routes. Currency conversion, China-wide inference, category eligibility, checkout, seat and availability claims are prohibited. The fee guide is now the 15th English pillar but remains ad-free.
- T13 calendar arithmetic: aligned the article, Chinese surface, Timeline UI, calculator and shared-state parser on calendar-day `D - W - P` and `D - W - P - R`. Three reproducible scenarios include cross-year and leap-day cases. Inputs are explicit assumptions or local facts, strict digit-only non-negative integers capped at 3,650 days each; no provider wait default, real retake chain, authority deadline or outcome is inferred.
- T14 shared plan and privacy: added schema-v1 session-first state across all five tools, explicit 30-day device snapshots, stable-ID allowlists, route/region/locale separation, current rule/claim versions, safe legacy mappings and explicit reconfirmation. New results never enter tool URLs; no-JavaScript forms stay inert rather than falling back to GET; discard-only queries cannot clear incompatible-state warnings; same-origin historic `visalang-tool:` storage is removed without touching independent route progress. Privacy/Cookie disclosures match those limits, including cross-origin deletion limits.
- Verification candidate: focused T10–T14 RED/GREEN suites pass. Earlier full/launch runs exposed and corrected the old 14-pillar SEO count and stale Exam Comparison assertion. The 17:12–17:14 final window additionally caught a missing assertion comma and an old content-map date contract; both received minimal repairs and focused confirmation before the complete entry was restarted. The final remediation added fee-record metadata fail-closed validation, synchronized the BAMF HTTP 403 disclosure, and made the unknown fee branch expose status/owner/action/boundary; `npm test`, independent `npm run build`, `npm run launch-check` (57/57 / `READY`) and `git diff --check` pass; generated output is exactly 83 HTML / 36 sitemap / 47 noindex / 14 ads, HEAD is unchanged and no path is staged. The same Independent Auditor's latest re-review result is `PASS` with `findings: []`, recorded in `.superpowers/sdd/VisaLang-Master-Plan/m2a-independent-audit-record-2026-09-09.md`.
- Review, Vault and delivery boundary: the repository-mandated same VisaLang Independent Auditor re-reviewed the corrected M2A-01–M2A-08 scope and returned `PASS` with no P0/P1/P2 findings, so T10–T14 are locally complete at the implementation-review gate. T15–T19 and T20–T34 remain pending. `/Users/fanlw`, the required Vault directory and template are absent, so the repository payload is not a formal sync and remains `status: review`, `needs_human_review: true`, `owner_decision: pending`, `deployment_status: not_started`. No owner approval, commit, push, deployment, publication, production check, external account action, authority contact or ICS import occurred.

## 2026-09-10 — Whole-site Archify planning map and drift gate

- Scope and authority: created the derived whole-site planning view and its
  synchronization governance without changing any guide fact, route behavior,
  publication decision, redirect, production state, or Master Package task
  status. The Master Package, backlog status overlay and execution record remain
  authoritative. Sync `VL-PMAP-20260910-01` records `drift: aligned`: T01–T14
  are formally complete, T15–T19 remain implementation candidates pending
  closeout, the next window closes M2-B before M3 T20–T22, and T23 remains
  conditional on evidence and Owner authority.
- Maintained artifacts: added an editable workflow-v2 Archify source, generated
  HTML, append-only sync history, exact classified candidate manifest, machine
  receipt, artifact-bound browser evidence, four hashed screenshots and a
  separate image-capable visual review. The hard-watch contract covers 179
  files under the fixed planning, `src/` and `public/` roots; its digest is
  `b7766e40c50a8cd9bf693bed4bfbdb0fc7d9e41fd4944098d5877e58a6f551b1`.
- Diagram evidence: the final source hash is
  `06b9d62a28abe917dd2e62533618c4ea9f7985902d97ab819eda57689737ab00`
  and the atomically delivered HTML hash is
  `8ee8a1f89881d8e014e449a5100ae43a1c8cec94e6d5e4568869bd09274b19c8`.
  Archify showcase validation passed 9/9 with 0 errors and 0 warnings;
  automated containment passed at 1440×900, 1600×1000, 1920×1080 and
  2048×1320. Saved light/dark screenshots at 1440×900 and 2048×1320 received
  image-capable review with no remaining clipping, overlap or unreadable digest.
- Review loop: the independent Auditor first returned `FAIL` with 3 P1 and 3 P2
  findings. The remediation fixes non-optional roots, candidate-scope/classification
  matching, evidence-sidecar binding, complete sync-receipt binding, unique
  history-chained IDs, the omitted Vault payload path, and the 1440px digest
  wrapping. Round 2 confirmed those six fixes and found one portability P2:
  the browser receipt's generation-machine path was being compared as a current
  checkout path. The test now accepts the same repository-relative artifact
  identity after a clone/worktree move while wrong identities and hashes fail.
  Round 3 confirmed that fix and found a cross-platform separator escape; the
  shared path validator now normalizes first, rejects POSIX/Windows/drive/UNC
  absolute forms and every `..` segment, and covers both separator styles plus
  unsafe screenshot/contact-sheet paths. Round 4 then found that dot/empty
  segments and directories could still masquerade as evidence files; the same
  validator now rejects dot, empty, parent and non-canonical segments, while
  screenshot/contact-sheet evidence must have the expected sidecar extension
  and be a regular file. Round 5 found that verdict checks scanned the whole
  Markdown body; the gate now strictly parses one unique YAML front matter,
  rejects duplicate/unsupported keys, validates every required field and exact
  scope from that object only, and includes spoofed-body and duplicate-key
  regressions. Round 6 then found that a present-but-empty or wrongly typed
  baseline was not rejected; the gate now requires a non-empty branch plus a
  40-character commit SHA and covers empty, array, boolean and numeric
  baselines with fail-closed regressions.
  The same Auditor's final verdict and exact reviewed hashes are
  authoritative in
  `docs/planning-map/VISALANG_PLANNING_MAP_INDEPENDENT_AUDIT_2026-09-10.md`;
  this log does not substitute for or predeclare that verdict.
- Verification state: the focused governance test was observed RED before the
  new history/evidence files existed, then exercised each fail-closed review
  correction. After the same Auditor's Round-7 `PASS`, direct governance passed
  for 179 watched files and sync `VL-PMAP-20260910-01`; the complete `npm test`
  exited 0 on 2026-09-10 at 09:53 Asia/Shanghai, including the Astro production
  build (83 pages), all existing site/content/M2-A/M2-B checks and the planning
  map gate. `git diff --check` also exited 0. The existing
  `MODULE_TYPELESS_PACKAGE_JSON` warnings remain non-failing. These final command
  results were submitted to the same Auditor for evidence confirmation; its
  report remains the independent source of verdict truth.
- Vault and release boundary: the required Vault root and template are absent,
  so the repository fallback payload remains `review` /
  `needs_human_review: true` / `owner_decision: pending` /
  `deployment_status: not_started` and is
  not a formal sync. No commit, push, deployment, publication, migration,
  production claim, external-account action, or Owner approval occurred.

## 2026-09-10–11 — M2-B T15–T19 acceptance candidate and audit freeze

- Scope and baseline: froze the 36-path M2-B candidate on
  `codex/scheme-3-one-week-content` at unchanged HEAD
  `4cb57e8744c752fed1881281e69e7b24cc7281c4`; no staged path, reset, clean,
  branch switch, worktree, commit, push, deploy, publication, external-account
  change, authority contact or calendar import occurred. The original backlog
  CSV remains byte-identical at SHA-256
  `26fbc283498a2ec60b54f84bedee0c6ca2daaca3e670d74d032ec9c9a6533982`.
- Implementation and TDD: closed the T15 relevant-question gap, T17 official
  practice-link gap and T19 trusted-route-source gap through focused RED→GREEN.
  Browser acceptance then found a 390 px comparison whole-page overflow and a
  configured-to-unsupported Checklist action leak; both received focused
  RED→GREEN corrections. Separate read-only task reviews returned PASS with no
  remaining P0/P1/P2 after the Checklist reviewer-required production-bound
  regression was added.
- Browser and ICS evidence: desktop 1440×900, 390×844 and 768×1024 observed
  the recorded Route Finder, Checklist, Comparison, Timeline and Reminder
  states, focus/order and overflow. Clipboard success was observed; a blocked
  Clipboard browser fallback is `not_tested`. Real Chrome print preview showed
  six populated checklist pages and was cancelled without saving. The real
  911-byte ICS download matched the generator byte-for-byte at SHA-256
  `36c0f751d9c3b1ffa4917eaef5cddc353c7215a4970df69a85907075ffefe747`.
  Calendar-client import is `blocked/not_tested`, so T19 is not represented as
  fully verified.
- Verification and review: the first complete pre-audit run passed every
  functional assertion before stopping only at the intentionally last missing-
  audit gate. The same Auditor's round-2 review returned `PASS` with
  `findings: []` for the exact 36-path candidate. The post-report serial run
  then passed all five focused suites, `npm test`, the independent 83-page
  build, `npm run launch-check` (57/57 / `READY`), direct governance for 179
  watched files and `git diff --check`. The audit remains separate from Owner
  and deployment authorization.
- Planning map: corrected successor sync `VL-PMAP-20260911-03`; `drift: aligned`. The
  derived snapshot records T15–T18 complete, T19 client import still awaiting
  separate authorization, and T20 as the next task. Showcase validation passed
  9/9 with 0 errors and 0 warnings. The isolated-Chrome visual check passed all
  four containment viewports; four 1440×900 / 2048×1320 light/dark screenshots
  were visually inspected with no clipping, overlap or unreadable status or
  digest. The same audit path is
  `docs/planning-map/VISALANG_M2B_INDEPENDENT_AUDIT_2026-09-11.md`; its report
  must bind the successor receipt before M3 changes begin.
- Governance correction: round-3 review found that eleven frozen candidate
  files outside the hard watch roots were listed but not byte-bound. A focused
  mutation fixture now requires an exact SHA-256 binding for every such path
  except self-referential `sync.json`; changing the Task Log fixture bytes fails
  closed before the audit gate. The audit still binds the complete sync receipt.
- Current boundary: T15–T18 are locally `completed`; T19 remains `in_progress`
  and not fully verified because calendar-client import is blocked/not_tested.
  The repository Vault payload remains review / needs_human_review / owner
  pending / not_started because the configured Vault root and template are
  absent. No Auditor result authorizes commit, deployment or publication.

## 2026-09-11 — M3 T20–T22 implementation-review PASS; post-PASS successor freeze

- Candidate freeze: planning-map sync `VL-PMAP-20260911-04` records
  `drift: aligned` for the exact 83-path M3 candidate. Its watched scope covers
  188 files; the append-only history, generated Archify delivery, automated
  browser receipt, image-capable perceptual-review receipt and every
  outside-watch candidate are byte-bound. The required M3 review record is
  `docs/planning-map/VISALANG_M3_INDEPENDENT_AUDIT_2026-09-11.md`. The same
  Auditor returned round-1 `FAIL` with exactly 3 P1 and 3 P2 findings. Successor
  correction sync `VL-PMAP-20260911-05` freezes the exact 87-path candidate
  across 188 watched files and binds the atomic Archify delivery, automated
  browser receipt and image-capable perceptual receipt. The same Auditor
  confirmed all six round-1 findings corrected, then returned round-2 `FAIL`
  with 0 P0, 0 P1 and 3 P2. Correction successor
  `VL-PMAP-20260911-06` freezes the same exact 87-path candidate across 188
  watched files and records the 9/9 Archify showcase, atomic delivery, automated
  browser receipt and four-image perceptual review. The same Auditor returned
  round-3 `PASS` with 0 P0, 0 P1 and 0 P2 for that exact candidate. The audit
  report SHA-256 is
  `7ca1cdfc9b8b898a51fae57c353005bbea793ad819a36cbeaaf81b67ab944d01`;
  the reviewed sync SHA-256 is
  `b465a72a8956227888d94bc03a21f8106fe3b247889640a67134f04ce628923d`.
  Post-PASS status successor `VL-PMAP-20260911-07` freezes the same exact
  87-path scope across 188 watched files and binds the updated authority/status
  snapshot, 9/9 Archify delivery, automated browser receipt and four-image
  perceptual receipt. Its final same-auditor binding remains pending; no
  successor `PASS` is preclaimed.
- Status boundary: T20, T21 and T22 are locally `completed` at the
  implementation-review gate. T22 remains local generated/preview evidence,
  not production evidence. T23 remains `evidence_map_only` / `blocked` with
  0 approvals, `newRedirectAuthorization: none` and a blocked release gate.
  T19 remains `partial` / `in_progress` because a real calendar-client import
  is unauthorized and `not_tested`.
- T20 Chinese journey: five `zh-CN` tool routes reuse the shared facts,
  calculations and saved-plan identifiers. The typed reconciliation preserves
  all eight historical Chinese A1 tasks across five maintained guide routes;
  three historical tasks are represented as absorbed task modules rather than
  silently discarded routes.
- T21 discovery and trust: the guide library uses four explicit purposes
  (`family`, `settlement`, `citizenship`, and `preparation`) with exactly three
  public filter facets (Purpose, Stage, and Language), multi-value purpose
  membership, URL restoration/clear behavior and actionable zero-result
  recovery. The directory retains all 31 exam records, prioritizing the two
  exact registry-backed supported A1 products above 29 reference-only entries.
- T22 generated/local evidence: the observed candidate output contains 88
  generated pages, 41 sitemap URLs, 47 noindex pages and 14 ad-eligible pages.
  The reviewed equivalence registry contains 11 genuine reciprocal hreflang
  pairs. Production HTTP is `not_observed`, so local generated output and local
  preview do not establish deployed behavior.
- T23 migration boundary: the repository-only candidate and rollback map records
  evidence gaps and recovery fields without changing redirects, publication
  policy, URLs, canonicals, sitemap behavior or production. Missing GSC,
  backlink and Owner-authorization evidence keep the task blocked. The
  repository legal configuration entry point is present through the deploy
  script, included snippet and documented install flow; production installation
  and effect remain `not_observed`.
- Evidence and release boundary: the focused M3 contracts cover bilingual tool
  presentation and the Chinese journey, discovery/trust and exam priority,
  generated SEO, and the migration evidence map. The candidate planning-map
  sync and round-3 implementation-review `PASS` are recorded above; the
  post-PASS status successor freeze is delivered, while its final same-auditor
  binding and subsequent final serial verification remain separate gates. No
  commit, push, deployment, publication,
  external-account action or calendar import occurred in this documentation
  update.
- RED→GREEN and browser receipts: focused failures caught Chinese authority-step
  collapse, missing M3 full-suite registration, the non-equivalent C01
  hreflang, stale generated-count assertions, active-chip focus loss, the 375 px
  two-column filter grid and the English required marker in Chinese forms. Each
  scoped correction passed its focused regression. The local Chromium matrix
  covered 375×812, 390×844, 768×1024 and 1440×900, including the bilingual tool
  journey, discovery/zero-result/URL state, keyboard focus, trust pages,
  canonical/language/alternate behavior and overflow. The separate browser
  evidence preserves all unexecuted-action and cross-browser boundaries as
  `not_tested`.
- Round-1 correction scope: the six findings covered incomplete branch-specific
  Chinese Finder presentation, a stale site-test literal, a non-fail-closed
  redirect readiness check, missing Chinese-guide CopyButton locale/feedback
  coverage, conflated repository/production legal-configuration evidence and
  contradictory execution/sync records. The same Auditor confirmed all six
  corrections in round 2; that confirmation does not override the round-2
  overall `FAIL` or establish a `PASS`/completion state.
- Round-2 correction scope: the three P2 findings are resolved in the
  correction candidate without
  changing the T19/T23 authority boundaries. Legacy standard-suite redirect
  wording/contracts now describe pre-existing local declarations and
  current source/target output observations, explicitly deny retirement,
  equivalence and migration authorization, and bind all 17 candidates to T23's
  0 approvals, `newRedirectAuthorization: none` and blocked gate. The diagram
  and byte-bound visual receipt now both record zero visual correction rounds.
  The backlog overlay now distinguishes the present repository entry point from
  unobserved production installation, active configuration and effect, while
  retaining the GSC, backlink, Owner, migration and deployment blocks.
- Round-2 correction verification: `scheme-3-atomic-merge` failed RED against
  the affirmative legacy assumptions and then passed GREEN. The corrected
  `scheme-3-release-candidate` and `scheme-3-gates` suites also pass with
  explicit T23 0 approvals / `newRedirectAuthorization: none` / blocked-gate
  bindings. The same Auditor's round-3 review confirmed the resulting exact
  candidate with 0 P0, 0 P1 and 0 P2.
- Round-3 review boundary: same-auditor `PASS` applies to the exact
  `VL-PMAP-20260911-06` candidate and closes the local implementation-review
  gate for T20–T22 only. It does not authorize a T19 calendar import, any T23
  redirect, release, commit, push, deployment, publication or external Vault
  write. The `VL-PMAP-20260911-07` status successor is frozen and delivered;
  its final same-auditor binding and subsequent final serial verification remain
  pending.
- Correction browser evidence: CUA observed four localized result titles for
  the Germany B1, Ausbildung, nursing and university choices, two distinct
  `other-family` recovery steps, and successful Chinese-guide copy feedback
  `已复制。`. The blocked copy feedback is covered by the compiled interaction
  assertion, not by a browser observation. Forced incompatible state, cold-tab
  restore, Chinese export/print/ICS, real calendar import, non-Chromium and
  physical-device coverage remain `not_tested`.
- Automated receipts: the six serial pre-audit M3 commands and all five M2-B
  focused suites passed, and the working build generated 88 pages. The old
  direct 57/57 `READY` receipt was rejected by round 1 because it treated the 17
  unresolved candidates as successful retirements. The corrected focused T23/
  generated-SEO command passed 8/8 after a genuine 5-pass/3-fail RED. Direct
  `scripts/launch-check.js` now intentionally exits 1 with 59 PASS / 0 FAIL /
  1 BLOCKED and ends `BLOCKED.` while `newRedirectAuthorization: none`; local
  target files are not production HTTP evidence. Round-3 implementation review
  is `PASS`; the post-PASS `VL-PMAP-20260911-07` freeze and delivery are recorded,
  while its final same-auditor binding and subsequent full `npm test`, independent
  build and governance remain pending. No final successor `PASS` or release
  completion is preclaimed.
- T19 remains `partial`: local ICS generation/download evidence exists, but a
  real calendar-client import, device reminder, email or notification delivery
  is still unauthorized and `blocked/not_tested`.

## 2026-09-13 — M3 closeout and M4 T24–T26 local candidate

- Authorization/baseline: user approved the proposed M3 final checks and T24–T26 local sequence. Continued the existing feature checkout at `4cb57e8744c752fed1881281e69e7b24cc7281c4`; upstream unchanged,0ahead/0behind. Preserved497 beginning-of-window file bytes and unrelated dirty changes in the gzip-validated `.superpowers/sdd/2026-09-13-visalang-m4-t24-t26/baseline.tar.gz`. No commits or release actions.
- M3 closeout: confirmed existing round-4 Independent Auditor PASS for `VL-PMAP-20260911-07`; fresh full/focused tests,88-page build,governance and diff check passed before M4 edits. launch-check remained59PASS/0FAIL/1T23BLOCKED. This closes earlier stale pending successor wording without editing historic bound reports.
- T24: scoped general/skilled-worker/Blue-Card settlement and naturalisation branches plus unknown route; five guides and hub separate language,knowledge,wider conditions and local authority actions. Added13versioned claims and fail-closed source/freshness bindings. Same task Auditor resolved twoP2 source/contract findings and returned PASS.
- T25: two exact independently sourced adult B1 products extend the shared English/Chinese comparator; original A1 facts remain unchanged. All31directory entries retained,now4supported/27reference. Comparison and booking guides include original selection/quote/decision worksheets and bounded reader scenarios. The same Auditor closed twoP2 malformed-record/recovery issues and returned corrected task PASS. Legacy incomplete guide depth was caught by full content contracts and restored without weakening content gates.
- T26: retained study pillar adds original diagnosis/retest and weekly records plus complete writing/speaking revision/transfer/self-check exercises. Separate integrated AI editorial language review PASS; no official score or qualified-human examiner claim. Actual narrow keyboard scrolling and browser print checks passed;6/4worksheet columns and German examples were visually inspected in the printed output.
- Integration: B1 canonical word counts and source-review-render date fixtures now match verified current content; A1 dates/facts preserved. Full pre-freeze regression passed all functional tests and stopped at the old planning-sync byte binding, as expected before replacing that receipt; it is not recorded as a full-suite PASS. Final build/browser/launch and exact freeze evidence are recorded in `docs/VISALANG_M4_T24_T26_EXECUTION_EVIDENCE_2026-09-13.md`.
- Planning sync: `VL-PMAP-20260913-02`, `drift: aligned`; status-only derived view records local task review and nextT27, preserving dependency topology and Owner gate. Archify showcase validation9/9,zeroerrors/warnings; atomic delivery,automated both-theme browser evidence and separate image-capable perceptual review recorded. Complete sync bytes and exact changed-path scope require `docs/planning-map/VISALANG_M4_INDEPENDENT_AUDIT_2026-09-13.md` PASS. Implementer never self-approves that final gate.
- Boundaries: T19 partial/calendar import not_tested; T23 evidence-map-only/blocked; no URL/index/advertising policy change,production observation,migration,commit,push,deployment or external-account action. Required Obsidian root/template are absent; `docs/VISALANG_M4_OBSIDIAN_SYNC_PAYLOAD_2026-09-13.md` is a repository-only review payload,not formal Vault sync. Owner decision pending and deployment not_started.

## 2026-09-20 — T27 closeout review correction

- Preserved branch, HEAD and all historical dirty work. Replacement Auditor reason and baseline: `docs/t27-closeout-evidence-2026-09-20/review-submission.md`.
- Prior T27 sync `VL-PMAP-20260916-01` lacked its Task Log entry. Independent Auditor initial FAIL identified this P2; this entry corrects that omission, without retroactively asserting PASS.
- Current sync `VL-PMAP-20260920-01`; drift: aligned. Full T27 candidate plus closeout evidence submitted to the same Auditor at `docs/planning-map/VISALANG_T27_CLOSEOUT_INDEPENDENT_AUDIT_2026-09-20.md`. T27 remains in_progress until formal PASS and post-report gates.
- Focused test 0, build 0, launch-check 1 (59 PASS / 0 FAIL / 1 T23 BLOCKED), diff check 0. Extra 57 forbidden-envelope cases rejected.
- Transport none; real measurement data not obtained; T19 calendar import not_tested; T23 migration blocked; no commit/push/deploy/account action. Vault directory/template absent; local review payload retained.

## 2026-09-20 — T28 bounded local technical acceptance

T27 closed only after the same replacement Auditor round-3 PASS and post-report focused/full/build/governance/diff exit 0 (launch 1: existing T23 only). Accepted evidence archived in docs/t28-evidence-2026-09-20/t27-accepted-planning-map and t27-postaudit.

T28 actual coverage and not_tested cases: docs/VISALANG_T28_LOCAL_ACCEPTANCE_2026-09-20.md; scenario matrix and findings under docs/t28-evidence-2026-09-20. Fixed P2 stale result after invalid input in shared tool-form, six bilingual red/green browser cases. Main matrix 50 pass / 2 native-arrow automation failures; supplemental English character keyboard flow passes, Chinese full native-select keyboard flow remains not_tested. No claim that all T28 passed.

Planning sync VL-PMAP-20260920-02; drift: aligned. Final exact-scope Auditor: docs/planning-map/VISALANG_T28_INDEPENDENT_AUDIT_2026-09-20.md. All release gates retained; T19 import not_tested; T23 blocked; Vault sync blocked with local payload. No commit/push/deploy/account action/migration/messages.

## 2026-09-22 — Isolated local Laya purpose-classification experiment

User-authorized local-only experiment under `experiments/laya-purpose/`; production source, content, planning authorities and external systems unchanged. Existing dirty baseline recorded in `evidence/baseline-status.txt`; branch `codex/scheme-3-one-week-content`, HEAD `4cb57e8744c752fed1881281e69e7b24cc7281c4`, upstream ahead/behind 0/0. No commit, push, deployment, external data submission or real business action.

MCP verified with 3 synthetic Chinese probes. Standalone Node CLI reuses one offline Python/Laya instance; 28 artificial Chinese smoke cases returned 17 correct, with high-confidence failures. Retain manual purpose selection; no production integration recommended. Full per-case evidence, runtime timings and limitations in experiment README and evidence/results.json. npm test, planning-map governance, experiment verification, interactive recovery checks and git diff --check exited 0. Build/launch-check not run: no site-facing changes.

This development-only experiment does not trigger content/planning-map or Obsidian synchronization under docs/planning-map/README.md; existing planning receipt stays unchanged. Independent review submitted to the separate VisaLang Independent Auditor; authoritative outcome is experiments/laya-purpose/AUDIT.md. Review is separate from Owner authorization; deployment not_started.


## 2026-09-22 — Laya purpose v2 isolated comparison

- Scope: new `experiments/laya-purpose-v2/` only, plus this appended entry; preserve existing dirty work and every v1/src/public byte. Local offline experiment, no commit/push/deployment or production integration.
- Frozen 28 seen development + 48 new synthetic cases with annotation rules and SHA-256; not an independent blind test. A original / B semantic labels / C gate then B / D newly built rules; single loaded model across the entire evaluation. No outcome-driven tuning or fine-tuning.
- Actual accuracy: development A17 B19 C17 D27 /28; frozen A29 B29 C30 D44 /48. Preserve manual purpose selection. B trades family recall for forced ambiguity; C adds rejection errors/cost; D remains wording-sensitive and synthetic-data-biased.
- Evidence: `experiments/laya-purpose-v2/evidence/results.json`, `summary.json`, `results.md`, `runtime-checks.json`. Freeze integrity, recomputed metrics, repeat-input reuse, malformed/empty/type/length/token recovery, missing runtime/cache tests pass.
- Repository npm test and planning governance were run and fail on a pre-existing Task Log byte-binding mismatch, demonstrated before this append (baseline current file 997604ab..., stored receipt d9fbc94e...). All preceding npm site suites passed. Final governance recheck and exact statuses are in `evidence/verification.json`; do not claim whole-repository green. Build/launch-check not run: no route/navigation/metadata/deployment changes.
- Planning map/Archify and Obsidian sync not applicable to isolated experiment; no content/authority/watch-root edits. Do not modify those authorities to manufacture a passing gate. Repository-wide governance handoff remains blocked separately.
- Separate read-only VisaLang Independent Auditor submission: `experiments/laya-purpose-v2/evidence/audit-submission.json`; the Auditor alone records the verdict in `experiments/laya-purpose-v2/AUDIT.md` and `audit-verdict.json`. No self-approval. Scope review is distinct from repository-wide governance status and Owner deployment authorization.


## 2026-09-22 — Laya purpose suggestions integrated for local source review

Owner requested formal-flow integration and chose an independent Python server/container. Implemented optional bilingual Route Finder description → suggestion → explicit confirmation; existing deterministic route rules and manual selections remain authoritative. Added offline resident service, request/response limits, non-persistent processing, deployment snippets and contract/browser regression coverage. Updated privacy disclosure without new immigration/exam facts.

Actual verification: six Python tests, Node contracts, ten browser interaction cases plus viewport checks, and real-model HTTP/browser smoke passed. Build passed; launch-check 59 pass / 0 fail / 1 existing T23 block. Full-suite pre-audit run reached stale planning governance; final rerun follows refreshed sync and the separate independent report. Evidence: `docs/laya-integration-evidence-2026-09-22/acceptance.md`. Initial concurrent build attempt raced on Astro cache; rerun sequentially. Docker daemon unavailable and Nginx executable absent, so image/production validation is not claimed.

Planning sync: VL-PMAP-20260922-01, drift: approved-deviation, based on the locatable Owner instruction in `docs/superpowers/plans/2026-09-22-laya-purpose-integration.md`. Exact independent review authority: `docs/planning-map/VISALANG_LAYA_INDEPENDENT_AUDIT_2026-09-22.md`; this Task Log does not self-approve. T19 partial/T23 blocked/T28 in_progress/T29 pending preserved. Vault path/template unavailable; review/pending/not_started payload prepared under evidence. No commit, push, deployment, account change or publication performed.


## 2026-09-22 本地联合发布候选

Owner authorized local code/document implementation and preservation of original URLs. Exact plan: `docs/superpowers/plans/2026-09-22-production-candidate.md`. Baseline, 17 retained source/route decisions, model results, browser/keyboard verification and deployment-tool tests: `docs/release-candidate-evidence-2026-09-22/acceptance.md`. T23 local source/config inconsistency repaired; production HTTP remains inconclusive. T28/T29/T30 partial, T31–T34 pending. Real model matches 11/20; Mac RSS 4.14 GB is a capacity warning, not a Linux result. Calendar import and configured Vault sync remain blocked.

Planning sync `VL-PMAP-20260922-02`, `approved-deviation` under the cited Owner scope; classified candidate paths and byte evidence live in sync.json. Independent verdict authority: `docs/planning-map/VISALANG_PRODUCTION_CANDIDATE_INDEPENDENT_AUDIT_2026-09-22.md`. Final full-suite/governance commands follow the immutable audit record; no verdict is self-issued here. Website + Laya + ads remain a joint release condition. No purchase, commit, push, server/DNS/account change or deployment performed.

Current-window drift: approved-deviation.

## 2026-09-23 — Laya-aware whole-site and content planning

Owner requested a written next-stage plan and a whole-site/content-plan update after Laya. Added the two September 23 supplements in `docs/superpowers/plans/`: current capability analysis, LP01–LP08, LC01–LC12, pending model/host targets and a conditional 12-week sequence. Preserved original T01–T34 implementation and release states. Corrected planning authority entry points, the 38=24+14 non-pillar decomposition and M4 evidence links to their actual September 13 files. No product/guide/model/route/index/ad/deployment change was made.

Fresh build/launch-check passes 57/57 locally. Archify showcase/delivery and the final automated desktop check pass; four exact light/dark screenshots received separate image-capable inspection. The initial sandbox Chrome startup failure is retained; approved retry of the same command succeeded. Full-suite preaudit evidence, baseline hashes, previous planning bytes, manifest and delta are in `docs/laya-planning-evidence-2026-09-23/`; final governance/full-suite commands follow the independent report.

Sync: `VL-PMAP-20260923-01`; drift: approved-deviation for Owner-requested planning only. Independent verdict authority: `docs/planning-map/VISALANG_LAYA_PLANNING_INDEPENDENT_AUDIT_2026-09-23.md`. The implementation agent does not self-issue PASS. Required Vault root/template absent; unsynced review payload remains review / needs_human_review true / owner_decision pending / deployment_status not_started. No purchase, commit, push, external account action or deployment occurred.

## 2026-09-23 — 用户价值优先的建站规划修订

- Owner授权实施所贴规划：读者验证前置；取消强制网站/Laya/广告联合发布的规划约束；实际发布分别验收并授权。
- 更新总规划、内容规划及当前权威入口；LP00新增，LP05a/b与LP06-core/laya/ads拆分；LC02/03移出核心前置，B1深化改为独立需求触发。T状态仍25完成/5进行中/4待开始，LP/LC仍待实施。
- 当前联合部署代码保持原样；独立核心构建、验收、部署和回滚尚待实施。没有招募、用户测试、模型改进或生产执行。
- 规划图更新主线与三个分支，共用审核/Owner门禁。sync `VL-PMAP-20260923-02`，drift `approved-deviation`；独立结论仅以 `docs/planning-map/VISALANG_USER_VALUE_PLANNING_INDEPENDENT_AUDIT_2026-09-23.md` 为准。
- 证据目录 `docs/user-value-planning-evidence-2026-09-23/`。Vault指定目录与模板缺失，保留待同步review payload；owner_decision pending / deployment_status not_started。未提交、推送或部署。

## 2026-09-23 — A1与Laya初步验证并行（sync 03）

- Owner接受提前验证建议后要求“好的，那就修改规划”。本轮只修改规划、图与记录，不运行模型实验或招募读者。
- LP00与LP01a并行，LP01a不等真人招募/手选失败；LP01b汇总双轨证据再决定扩大投入，完整质量/容量门槛保留。LC02/03区分初验最小材料与完整启用资产；核心不等待Laya。
- T状态25完成/5进行中/4待开始及LP/LC pending不变；部署仍待解耦，广告/B1依赖未扩大。
- sync `VL-PMAP-20260923-03`，drift approved-deviation；证据 `docs/laya-parallel-planning-evidence-2026-09-23/`，独立结论以 `docs/planning-map/VISALANG_LAYA_PARALLEL_PLANNING_INDEPENDENT_AUDIT_2026-09-23.md` 为准。
- Obsidian指定目录/模板缺失，保留待同步review payload；未提交、推送或部署。

## 2026-09-23 — Module-window prompt pack

Owner requested reusable prompts for separate module windows. Added 17 functional prompts, W00 integration and W18 independent-auditor prompts, shared isolation/handoff contract and dispatch index. Current dirty work is preserved; product/src/public/service/deploy/test implementation remains untouched. Current/next module work is prepared only, not executed; original T25/5/4 and pending LP/LC state remain unchanged.

Sync `VL-PMAP-20260923-04`, drift: aligned; status-only map update preserves topology. Exact scope, frozen baseline, Archify/visual/scenario evidence and unsynced Vault payload are in `docs/module-prompts-evidence-2026-09-23/`. New Auditor authority is `docs/planning-map/VISALANG_MODULE_PROMPTS_INDEPENDENT_AUDIT_2026-09-23.md`; no self-approval. Final npm test runs after that report exists. No launch-check required for prompt/document-only changes without altered application bytes. No commit, push, deployment, account action, purchase or model/reader experiment. Configured Vault root/template are absent, so synchronization remains blocked.

## 2026-09-23 — W00 第一批隔离分配准备

- Batch `2026-09-23-01`；1,115文件当前dirty基线与W01/W02/W08独立副本校验，逐文件字节、Git staged/dirty/untracked/index与省略项见 `docs/module-handoffs/2026-09-23-01/`。三个窗口尚未派发，handoff和集成均0；LP/LC与25/5/4不变。
- 独立Node依赖、Python环境及W02离线权重副本已准备；只验证metadata/字节，未运行模型或真人研究。功能窗口启动时复核基线与端口，按dispatch的逐路径范围工作。
- 规划图为状态更新，sync `VL-PMAP-20260923-05`，drift `aligned`。独立审核权威：`docs/planning-map/VISALANG_W00_DISPATCH_INDEPENDENT_AUDIT_2026-09-23.md`；本行不预先声明其结论。图与视觉证据、候选manifest、基线npm-test实际exit 0见批次目录。新报告存在后再跑最终规划治理与完整npm test，结果保存在批次指定的外部post-audit证据路径，不改已审核字节。
- 页面/导航/元数据/部署实现无变更，launch-check未新增运行；最终npm test仍必跑。Vault目录与模板缺失，payload待同步、owner pending、deployment not_started；无提交、推送、部署或外部动作。


## 2026-09-24 — TypeSafe AI project standards and integration proposal

- Owner requested applying TypeSafe and explicitly selected project-level standards and an integration proposal. Added the AGENTS skill entry, README index and `docs/superpowers/plans/2026-09-24-typesafe-project-adoption.md`.
- Recommended an isolated purpose-suggestion comparison while preserving manual choice, user confirmation and deterministic authority/coverage rules. TypeSafe remains unimplemented and unmeasured. No SDK install, inference, key access, runtime change, account action, commit, push or deployment.
- Existing dirty baseline is recorded in `docs/typesafe-adoption-evidence-2026-09-24/baseline.json`; unrelated bytes preserved. T/LP/LC status, W00 allocations and graph topology unchanged.
- Baseline npm test passed. Archify showcase/deliver passed 9/9, browser retry passed after sandbox Chrome SIGABRT; four exact light/dark PNGs received image-capable review. Candidate preaudit and final gate results are recorded separately; this entry does not pre-approve them. Standalone build/launch-check not_run: documentation/planning-only scope, no routes/runtime/deployment changes. Builds invoked by the full test suite are captured in its output.
- Planning sync `VL-PMAP-20260924-01`, drift: aligned. Review authority: `docs/planning-map/VISALANG_TYPESAFE_ADOPTION_INDEPENDENT_AUDIT_2026-09-24.md`; only the separate Auditor records the verdict. Obsidian target/template missing; local pending payload retained, actual sync blocked. Release remains not_deployed.
