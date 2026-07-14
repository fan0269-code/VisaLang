# VisaLang content and UI implementation handoff

Review date: 2026-07-14 (Asia/Shanghai)  
Review scope: current uncommitted workspace compared with `HEAD`; read-only source review plus documentation handoff.  
Release authority: none. This review did not commit, push or deploy.

## Overall disposition

The current source builds and passes the repository's automated launch gate. The two P0 regressions found during review were closed in a confirmed narrow correction window: Privacy/Cookie copy now matches the URL-backed tool model, and five source-audit-blocked guides no longer present the identified deterministic policy claims. This safe downgrade does not complete their source review.

Release readiness is nevertheless conditional:

- **BLOCKED — advertising/CMP activation:** product, advertising operations and legal have not approved the Step 3B region, framework, supplier, retention and pre-consent-loading inputs. AdSense and Cloudflare Web Analytics remain paused in source. They must not be restored from this handoff.
- **Manual verification incomplete:** the local browser-control runtime failed during initialization with `Cannot redefine property: process`. Responsive visual, keyboard interaction and clean-profile network-panel evidence were therefore not completed in this window.
- **Chinese source review incomplete:** the Chinese entry and five Chinese Germany A1 guides are accessible and expose pending responsibility metadata, but their source review and translation-review roles are not complete.

## Completed implementation packages and current verification

| Package | Current evidence |
| --- | --- |
| P0-1 source-review date separation | Schema separates `updatedDate`, `sourceReviewedAt` and `sourceReviewStatus`; generated guide checks distinguish reviewed/pending/not-applicable; homepage uses “Recently updated” without presenting it as source review. |
| P0-2 high-risk safe downgrade | All 16 audited high-risk guides render as `verification-pending`; 11 have reviewed source metadata but remain pending in content maturity; five remain blocked from fact editing. |
| P0-3 temporary ad-tech safety | Shared layout no longer injects AdSense or Cloudflare Insights; generated HTML contains no checked ad/CMP/tracking runtime marker; Privacy and Cookie pages describe the paused state. Long-term strategy remains BLOCKED. |
| Content maturity and responsibility | Germany family reunion A1 remains `complete-route`, Germany B1 `core-route`, TestDaF `starter-overview`; author and review-role rendering uses controlled data shared with Article JSON-LD. |
| Guide Library | Search, quick filters, advanced disclosure, URL restoration, active feedback, `aria-live`, Clear all and single-link cards are present and covered by assertions. |
| Guide Article | Ordered header metadata, decision-authority boundary, reviewed-source-table gate, DOM-ordered TOC and journey-related links are present. |
| Tools | Client validation, invalid semantics, first-invalid-field focus, real step transitions, URL-backed non-sensitive restoration and unsupported-route safe fallback are covered by source tests. |
| P2-1 semantics | Native homepage radios, current-page navigation state, separated menu disclosure controls and a named/focusable comparison-table region are present. |
| Style consolidation | `BaseLayout` loads only `global.css`; core tokens have one effective base definition; active viewport breakpoints are limited to 375/768/1024 with 1440 as the base layout. |

Commands completed in this review:

- `git status --short --branch` — completed; the worktree was already extensively modified and was preserved.
- `git diff --check` — passed.
- `npm test` — passed.
- `npm run launch-check` — passed; 98 generated routes, 31 checks passed, 0 failed.
- Local preview HTTP checks — `200` for `/`, `/guides/`, representative Complete/Core/Starter guides, Route Finder, `/zh/`, one Chinese guide, Privacy and Cookie.

## Remaining issues by severity

### Closed P0 — Privacy/Cookie persistence accuracy

Privacy and Cookie copy now says successful tools place only the non-sensitive values needed for restoration in the page URL, while route pages separately store the current route step in `localStorage`. Restart and clearing instructions now match those two mechanisms.

### Closed P0 — five blocked guides safely downgraded

The following pages now replace the identified deterministic conclusions with verification questions, receiving-authority boundaries and exam-owner-only execution links:

- `dele-levels-spanish-citizenship`: A2 as legal minimum, higher levels not required, DELE as standard reference.
- `dele-a2-ccse-spanish-citizenship`: residence periods, two required exams, fixed CCSE duration and universal pass requirement.
- `delf-b1-b2-french-work-study`: lifetime validity and university/professional mappings.
- `tcf-irn-french-residence`: applicant groups and route/level mappings.
- `staatsexamen-nt2-for-work-and-higher-education`: Programme I/II acceptance mapping and “NT2 is the one” conclusion.

All five remain `verification-pending`. Their fact expansion and maturity promotion remain blocked until the missing authority sources are supplied.

### P0 — BLOCKED advertising/CMP business decision

Advertising/CMP activation remains blocked. Required approvals are: target regions and unknown-region fallback; applicable consent framework/version; CMP supplier or approved no-CMP/default-deny strategy; exact allowed suppliers and purposes; consent-state storage/expiry/withdrawal rules; pre-consent loading rules; and approved Privacy/Cookie wording. The safe temporary state is to keep all non-essential advertising and third-party analytics scripts off.

### P1 — manual release evidence incomplete

The required 375/768/1024/1440 visual, keyboard and clean-profile network-panel checks could not be run because browser control failed before opening the page. Automated checks prove markup and CSS safeguards, but do not prove computed layout, focus movement or network behavior in a real browser. Complete these checks before deployment.

### P1 — Chinese trust metadata is only partially migrated

The five Chinese Germany A1 records show `sourceReviewStatus: pending` and no completed review role. Their pages explicitly suppress the source fact table and state that official verification is pending. This is a safe boundary, not a completed Chinese credibility migration.

### P1 — cross-country Related Guides can bypass the comparison gate

The related-link filter accepts a guide when `decisionStage` matches before checking `comparisonScope`. A same-stage guide from another country can therefore render while the source page says `comparisonScope: same-route`. This violates the controlled cross-country-link rule and is present in the Spain supporting-guide data.

### P2 — consent audit record contains historical/current wording tension

`CONSENT_AND_AD_TECH_DECISION_RECORD.md` begins with the implemented temporary pause, but later evidence sections still describe the pre-remediation layout as “current” and say scripts load unconditionally. Treat those passages as the original audit snapshot. A later documentation-only cleanup should label pre-remediation evidence explicitly without changing the BLOCKED decisions or creating compliance claims.

### P2 — slashless preview behavior needs deployment verification

Astro is configured with `trailingSlash: 'always'` and all generated canonical/internal URLs use trailing slashes. The local Astro preview returned `404` for `/guides` without a slash; redirect behavior depends on the deployment server rather than the static build. Existing `.html` and corrected-slug redirects are present, but the production server's general slash normalization should be checked separately.

### P2 — navigation and Article JSON-LD semantics

- Some ordinary desktop section links and mobile About/section links use `aria-current="page"` for a parent section rather than the exact current URL. Visual active state and exact page-current semantics should be separated.
- English and Chinese Article JSON-LD author objects reuse the visible controlled name but omit Schema.org `@type`. A later correction should use a controlled `Organization`/`Person` mapping without inferring a person or credential.

## Human source-review queue

Highest priority blocked fact-edit and safe-rewrite queue:

1. Spain: `dele-levels-spanish-citizenship`, `dele-a2-ccse-spanish-citizenship` — current Spanish Ministry of Justice procedure source required.
2. France: `delf-b1-b2-french-work-study` — named receiving institution or regulator required.
3. France: `tcf-irn-french-residence` — precise prefecture/procedure source required.
4. Netherlands: `staatsexamen-nt2-for-work-and-higher-education` — named institution, employer or regulator required.

Additional queue:

- Eleven audited Portugal/UK/Canada/Italy/Finland/Netherlands pages have source-review metadata but remain `verification-pending` because individual route, centre, date, programme or submission questions remain unresolved.
- The remaining English collection records without explicit reviewed metadata resolve to `pending` by schema and must not inherit `updatedDate` as a review date.
- Five Chinese Germany A1 guides require actual source review, translation review, review dates and approved public role attribution before they can claim completed Chinese trust migration.
- Germany A1, B1 and TestDaF may be deepened only with page-specific official evidence; maturity labels alone are not evidence that every source has been reviewed.

## Responsive and interaction check matrix

| Width | Automated/source evidence | Real-browser result |
| --- | --- | --- |
| 375px | Small-phone rules, local table overflow, 44px targets, single-card link, closed advanced filters and no intentional page-wide overflow are present. | BLOCKED by browser runtime; manual visual/keyboard check required. |
| 768px | Mobile navigation and single-column article/tool/library rules use the approved breakpoint. | BLOCKED by browser runtime; manual visual/keyboard check required. |
| 1024px | Wide composition collapse uses the approved breakpoint. | BLOCKED by browser runtime; manual visual check required. |
| 1440px | Base desktop layout builds without a separate override breakpoint. | BLOCKED by browser runtime; manual visual/keyboard check required. |

Manual check pages: homepage, `/guides/`, one Complete guide, one Core guide, one Starter/Pending guide, `/tools/route-finder/`, `/zh/`, one Chinese guide, `/privacy-policy/`, and `/cookie-policy/`. Include empty and corrected tool submission, filter restoration, TOC traversal, mobile navigation, table horizontal access and a clean-profile network trace.

## Recommended next round

Keep the next content window to one of these evidence-backed options:

1. Deepen the Germany family reunion A1 route using page-specific receiving-authority and exam-owner sources.
2. Expand Germany B1 or TestDaF only where current official evidence supports the exact route/programme boundary.
3. Run one explicitly approved non-Germany pilot after its deciding-authority source package and human reviewer are named.

Do not start additional country expansion, CMP/ad-tech restoration or Chinese maturity promotion from this handoff alone.
