# VisaLang content/source preparation (read-only)

Purpose: preparatory analysis for future `VL-SOURCE-001` and `VL-ASSET-001`. This is not an owner decision, a source-expiry declaration, a discovery change, or implementation authority.

## 1. Scope and evidence reviewed

- Parsed the leading YAML front matter of all **53** English Markdown guides under `src/content/guides/`.
- Read `src/data/source-review.ts` and the 53-row English ledger in `docs/CONTENT_MAP.md`.
- Read the applicable high-risk, Germany A1/B1, Spain, France, Netherlands, telc and TestDaF review packages, including:
  - `docs/HIGH_RISK_ROUTE_SOURCE_PACKAGE_2026-07-14.md`
  - `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`
  - `docs/SPAIN_CONTENT_SOURCE_PILOT_2026-07-16.md`
  - `docs/FRANCE_HIGH_RISK_SOURCE_REVIEW_2026-07-19.md`
  - `docs/NETHERLANDS_NT2_SOURCE_REVIEW_2026-07-19.md`
  - `docs/NETHERLANDS_INBURGERING_SOURCE_REVIEW_2026-08-15.md`
  - `docs/TELC_B1_B2_FORMAT_SOURCE_REVIEW_2026-08-14.md`
  - `docs/TELC_B1_B2_FEES_CENTRES_SOURCE_REVIEW_2026-08-14.md`
  - `docs/TELC_WORK_NURSING_SOURCE_REVIEW_2026-08-14.md`
  - `docs/TELC_GOETHE_VISA_SOURCE_REVIEW_2026-08-14.md`
  - `docs/PHASE_3_TESTDAF_CONTENT_AUDIT.md`
  - `docs/PHASE_2_A1_CONTENT_AUDIT.md`
  - `docs/GERMANY_A1_SOURCE_REFRESH_2026-07-16.md`
  - `docs/GERMANY_A1_SOURCE_REVIEW_2026-07-19.md`
  - `docs/PHASE_2_B1_CONTENT_AUDIT.md`
  - `docs/GERMANY_A1_B1_SUPPORT_SOURCE_REVIEW_2026-07-22.md`
  - `docs/GERMANY_A1_REQUIREMENT_SOURCE_REVIEW_2026-08-15.md`
  - `docs/GERMANY_B1_TIMELINE_SOURCE_RECHECK_2026-08-15.md`
- Used `docs/TASK_LOG.md` and `docs/ADSENSE_REMEDIATION_WINDOW_B_DECISIONS_2026-07-28.md` only to reconcile later review lineage and prior merge/retain decisions. Prompt/plan files were treated as requirements, not source evidence.
- Created only this preparation report after the read-only analysis; no canonical guide, source-review implementation, schema, route, indexability or advertising file was edited for `VL-SOURCE-001` / `VL-ASSET-001`. No build was run as part of that preparatory analysis. The wider frozen batch later ran `npm test` and `npm run launch-check`, as recorded separately in `docs/TASK_LOG.md`; those batch gates did not change this report's preparation-only status.

## 2. Inventory result and control semantics

The 53 English front-matter records divide exactly as follows:

| contentStatus | count |
| --- | ---: |
| `complete-route` | 17 |
| `core-route` | 13 |
| `starter-overview` | 8 |
| `verification-pending` | 15 |

Therefore the future `VL-ASSET-001` set is exactly **23 = 8 starter-overview + 15 verification-pending**. All 53 currently say `sourceReviewStatus: reviewed`; evidence maturity does not promote content maturity.

`src/data/source-review.ts` permits primary discovery only when a page is both source-reviewed and `complete-route` or `core-route`. The 23-page set is fail-closed even when raw `noindex`/`adsEligible` keys are omitted. In current generated behavior, they remain directly reachable but render noindex, do not load ads, are filtered from guide/category discovery, and are removed from the generated sitemap.

Discovery legend used below:

- **closed-E**: front matter explicitly has `noindex: true` and `adsEligible: false`.
- **closed-G**: the shared maturity/source gate closes discovery even though those raw keys are omitted.

Important schema gap: neither `src/data/source-review.ts` nor the content schema currently defines an asset-disposition enum, risk/trigger/correction fields, `expiresAt`, or `nextReviewAt`. The five allowed asset choices exist only in the current planning documents. They are not the same as `sourceReviewStatus` or claim-level “retained/bounded/deleted” wording.

## 3. Proposed next-review policy (not yet approved)

The repository has **no approved source-expiry formula**. It does not support calling any page “expired” merely by adding days to `sourceReviewedAt`. The following is a conservative proposal for owner review, not a current rule:

1. Store both `lastActualSourceCheckAt` and public `sourceReviewedAt`. Use the later evidence-backed check for queue ordering. Do not overwrite the public field after a no-change review.
2. Apply trigger-first review. A trigger always beats the time cap:
   - **L**: law, regulation, authority page, effective date, or jurisdictional procedure changes or becomes inaccessible.
   - **A**: accepted proof, exemption, document, submission, or receiving-authority instruction changes.
   - **E**: exam-owner product, format, result, certificate, or official training material changes.
   - **X**: selected-centre/local execution changes. Keep the result as a reader action unless that exact local scope is deliberately published.
   - **C**: correction report, detected conflict, or planned edit to a high-risk fact.
3. Candidate maximum intervals, subject to owner approval:
   - legal/route/acceptance/submission and dynamic transaction pages: **at most 60 days**;
   - exam-format/training/editorial-practice pages: **at most 90 days**;
   - active first-party conflict: review when the queue starts and **at most every 30 days** until closed.
4. A completed no-change check records evidence and boundaries. It does not manufacture an `updatedDate`, refresh `sourceReviewedAt`, release noindex, enable ads, or promote maturity.
5. Unknown applicant, mission, programme, employer, regulator, or centre rules remain concrete reader verification actions. Do not fill them from national overviews or exam-owner pages.
6. After an owner approves the cadence, calculate a real `nextReviewAt` from the evidence-backed last check and record time zone, reason, authority, permitted support, boundary, correction state and evidence location. Until then, dates stay `TBD`.

## 4. Draft 23-page disposition ledger

The only allowed choices are exactly:

1. `保留并等待数据`
2. `与相邻意图合并候选`
3. `进入第二路线候选`
4. `因来源不稳定继续 noindex`
5. `建议退役，但需另行批准`

This preparation uses one and only one proposed choice per page. It does not propose a current merge or retirement: the source packages distinguish the current requirement/choice/execution tasks, and there is no common 28/90-day demand or maintenance-cost evidence. Finland's former duplicate comparison page was already merged and retired; it is not one of the current 53.

| slug | maturity | discovery | sourceReviewedAt | risk | data state | proposed disposition | reason | next review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cils-b1-cittadinanza-for-italian-citizenship | verification-pending | closed-E | 2026-07-30 | P0 citizenship; applicant basis/exemption/evidence form and local office remain specific (bounded evidence). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Requirement/choice scope is distinct and source-bounded; no shared 28/90-day demand or maintenance-cost evidence supports a stronger action. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| cils-vs-celi-vs-plida-for-italian-citizenship | verification-pending | closed-E | 2026-07-30 | P0 citizenship choice; exact admitted proof, product, centre and session remain authority/local specific (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Requirement/choice scope is distinct and source-bounded; no shared 28/90-day demand or maintenance-cost evidence supports a stronger action. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| dele-a2-ccse-spanish-citizenship | verification-pending | closed-G | 2026-07-19 | P0 citizenship; applicant category, evidence/dispensation and centre terms unresolved (CONTENT_MAP: partial). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Requirement/choice scope is distinct and source-bounded; no shared 28/90-day demand or maintenance-cost evidence supports a stronger action. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| dele-levels-spanish-citizenship | verification-pending | closed-G | 2026-07-19 | P0 citizenship choice; accepted alternative evidence and individual dispensation unresolved (partial). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Requirement/choice scope is distinct and source-bounded; no shared 28/90-day demand or maintenance-cost evidence supports a stronger action. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| delf-b1-b2-french-work-study | verification-pending | closed-G | 2026-07-19 | P0 admissions; evidence covers one Sorbonne faculty, not another programme/work/profession (partial). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Requirement/choice scope is distinct and source-bounded; no shared 28/90-day demand or maintenance-cost evidence supports a stronger action. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| dutch-inburgering-a2-b1-for-integration-and-citizenship | verification-pending | closed-E | 2026-08-15 | P0 residence/naturalisation; cohort/PIP/level/components/deadline/exemption are personal and authority-specific (bounded). | Blocked/missing shared 28/90d Search Console window | 进入第二路线候选 | The roadmap names UK/Canada/Netherlands for equal-window route assessment; candidate only, with no demand or priority conclusion. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| ielts-ukvi-uk-visa | verification-pending | closed-G | 2026-07-21 | P0 visa; exact route, approved product/location and local terms remain current and route-specific (bounded). | Blocked/missing shared 28/90d Search Console window | 进入第二路线候选 | The roadmap names UK/Canada/Netherlands for equal-window route assessment; candidate only, with no demand or priority conclusion. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| languagecert-selt-uk-visa | verification-pending | closed-G | 2026-07-21 | P0 visa choice; route-specific CEFR/product/location/local terms remain current and specific (bounded). | Blocked/missing shared 28/90d Search Console window | 进入第二路线候选 | The roadmap names UK/Canada/Netherlands for equal-window route assessment; candidate only, with no demand or priority conclusion. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| portuguese-ciple-a2-for-citizenship-and-residence | verification-pending | closed-G | 2026-07-29 | P0 nationality; authority acceptance and local CIPLE execution remain specific; CAPLE browser recheck noted (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Requirement/choice scope is distinct and source-bounded; no shared 28/90-day demand or maintenance-cost evidence supports a stronger action. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| portuguese-language-for-golden-visa-and-citizenship | verification-pending | closed-G | 2026-07-29 | P0 nationality; no universal Golden Visa language/residence conclusion; profile documents vary (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Requirement/choice scope is distinct and source-bounded; no shared 28/90-day demand or maintenance-cost evidence supports a stronger action. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| staatsexamen-nt2-for-work-and-higher-education | verification-pending | closed-G | 2026-07-19 | P0 admissions/work; only named UvA bachelor scope reviewed; no named employer/regulator or universal document recency (partial). | Blocked/missing shared 28/90d Search Console window | 进入第二路线候选 | The roadmap names UK/Canada/Netherlands for equal-window route assessment; candidate only, with no demand or priority conclusion. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| tcf-canada-vs-tef | verification-pending | closed-E | 2026-07-30 | P0 Express Entry choice; programme/table/result interpretation and centre execution remain specific (bounded). | Blocked/missing shared 28/90d Search Console window | 进入第二路线候选 | The roadmap names UK/Canada/Netherlands for equal-window route assessment; candidate only, with no demand or priority conclusion. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| tcf-irn-french-residence | verification-pending | closed-G | 2026-07-19 | P0 nationality/product; applicant scope and centre local; FEI first-party pages conflict on format/retake interval (partial/conflict). | Blocked/missing shared 28/90d Search Console window | 因来源不稳定继续 noindex | Active first-party FEI conflict makes risk maintenance—not growth or promotion—the only safe current disposition. | On queue activation; proposed ≤30d/trigger-first until conflict closes (owner approval needed) |
| tef-canada-immigration | verification-pending | closed-E | 2026-07-30 | P0 Express Entry; programme/profile/result-table/validity and local execution remain specific (bounded). | Blocked/missing shared 28/90d Search Console window | 进入第二路线候选 | The roadmap names UK/Canada/Netherlands for equal-window route assessment; candidate only, with no demand or priority conclusion. | TBD; proposed ≤60d/trigger-first (owner approval needed) |
| telc-b1-b2-exam-format-and-preparation | starter-overview | closed-E | 2026-08-14 | P2 starter; exact general product only; variants, local delivery and external acceptance outside package (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Source package preserves a distinct task and says retain/deepen; no Search Console evidence supports promotion, merge or retirement. | TBD; proposed ≤90d/trigger-first (owner approval needed) |
| telc-b1-b2-fees-and-test-centers | starter-overview | closed-E | 2026-08-14 | P2 starter/transaction; fee, seat, date, deadline and contract are centre/product/sitting specific (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Source package preserves a distinct task and says retain/deepen; no Search Console evidence supports promotion, merge or retirement. | TBD; proposed ≤90d/trigger-first (owner approval needed) |
| telc-b1-b2-germany-work-nursing | starter-overview | closed-E | 2026-08-14 | P2 starter/high consequence; recognition, employer, immigration and product are four different decisions (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Source package preserves a distinct task and says retain/deepen; no Search Console evidence supports promotion, merge or retirement. | TBD; proposed ≤90d/trigger-first (owner approval needed) |
| telc-vs-goethe-for-german-visa | starter-overview | closed-E | 2026-08-14 | P2 starter/visa; exact route/proof/provider acceptance and local execution remain reader-specific (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Source package preserves a distinct task and says retain/deepen; no Search Console evidence supports promotion, merge or retirement. | TBD; proposed ≤90d/trigger-first (owner approval needed) |
| testdaf-germany-university-admissions | starter-overview | closed-G | 2026-07-23 | P2 starter/admissions; no target programme/source supplied; front matter has exam-owner URL only (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Four-guide audit preserves a distinct task/route; target programme and demand evidence are missing, so retain fail-closed. | TBD; proposed ≤90d/trigger-first (owner approval needed) |
| testdaf-levels-and-scoring | starter-overview | closed-G | 2026-07-23 | P2 starter/scoring; reporting owner cannot prove programme use; no target-programme URL (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Four-guide audit preserves a distinct task/route; target programme and demand evidence are missing, so retain fail-closed. | TBD; proposed ≤90d/trigger-first (owner approval needed) |
| testdaf-preparation-and-practice | starter-overview | closed-G | 2026-07-23 | P2 starter; selected format, programme acceptance and centre terms unknown; no target-programme URL (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Four-guide audit preserves a distinct task/route; target programme and demand evidence are missing, so retain fail-closed. | TBD; proposed ≤90d/trigger-first (owner approval needed) |
| testdaf-vs-goethe-dsh | starter-overview | closed-G | 2026-07-23 | P2 starter/comparison; no target programme, DSH university or centre; no target-programme URL (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | Four-guide audit preserves a distinct task/route; target programme and demand evidence are missing, so retain fail-closed. | TBD; proposed ≤90d/trigger-first (owner approval needed) |
| yki-finnish-citizenship | verification-pending | closed-E | 2026-07-29 | P0 citizenship; applicant evidence/exception/old certificate and local YKI execution remain specific (bounded). | Blocked/missing shared 28/90d Search Console window | 保留并等待数据 | The duplicate Finland page was already merged/retired; this retained authority-first page is the unique remaining task, but demand is unknown. | TBD; proposed ≤60d/trigger-first (owner approval needed) |

### Disposition interpretation

- The six UK/Canada/Netherlands pages are only **second-route assessment candidates** because the roadmap names those routes for an equal-window comparison. This is not evidence of route priority, demand, ranking, clicks, or revenue.
- `tcf-irn-french-residence` alone receives the source-instability option because the France package records conflicting first-party FEI format/retake information. The page must not publish either conflicting interval.
- All other pages default to retain-and-wait. No Search Console baseline supports promotion, merging, or retirement.
- No disposition authorises a body edit, discovery change, noindex removal, ad enablement, merge, redirect, or retirement.

## 5. Proposed Germany A1/B1 risk-first source queue

This seed covers all **30 English Germany A1/B1 guides**: 17 A1 and 13 B1. It is deliberately broader than only legal pages so format and local-execution evidence does not silently age. It is sorted by proposed risk tier and then oldest evidence-backed check, not by page count.

The queue does **not** name a long-term Content Authority Owner. Current owner state is **unassigned / awaiting Business Owner confirmation**. A Programme Owner may maintain a preparatory list, but cannot assume the high-risk fact authority role.

Trigger codes are defined in section 3. “Correction state” below means only what the reviewed packages show. It is not a substitute for the missing central correction ledger.

| order | slug | last actual check | risk type | authority | mandatory trigger | expiry / next date | correction state |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1.1 | german-a1-documents-checklist | 2026-07-18 | Tier 1: legal/route/acceptance/submission | Responsible German mission + selected centre | L/A/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Bounded review recorded; reader-local values remain open; central log unconfirmed |
| 1.2 | goethe-a1-vs-telc-a1 | 2026-07-18 | Tier 1: legal/route/acceptance/submission | Responsible mission/immigration authority + Goethe/telc | L/A/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Bounded review recorded; reader-local values remain open; central log unconfirmed |
| 1.3 | germany-b1-citizenship-language-proof | 2026-07-19 | Tier 1: legal/route/acceptance/submission | Local nationality authority + current StAG | L/A/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | 2026-07-19 bounded review; stale/universal claims excluded; central log unconfirmed |
| 1.4 | germany-b1-leben-in-deutschland-and-language-proof | 2026-07-19 | Tier 1: legal/route/acceptance/submission | Local nationality/foreigners authority + BAMF | L/A/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | 2026-07-19 bounded review; stale/universal claims excluded; central log unconfirmed |
| 1.5 | germany-b1-settlement-citizenship-checklist | 2026-07-19 | Tier 1: legal/route/acceptance/submission | Local foreigners/nationality authority + BAMF | L/A/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | 2026-07-19 bounded review; stale/universal claims excluded; central log unconfirmed |
| 1.6 | goethe-b1-germany-settlement-work | 2026-07-19 | Tier 1: legal/route/acceptance/submission | Local foreigners authority + current AufenthG route | L/A/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | 2026-07-19 bounded review; stale/universal claims excluded; central log unconfirmed |
| 1.7 | goethe-b1-vs-telc-b1 | 2026-07-19 | Tier 1: legal/route/acceptance/submission | Competent receiving authority + BAMF/Goethe/telc | L/A/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | 2026-07-19 bounded review; stale/universal claims excluded; central log unconfirmed |
| 1.8 | german-a1-family-reunion-faq | 2026-07-22 | Tier 1: legal/route/acceptance/submission | Competent German mission + foreigners authority | L/A/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Bounded review recorded; reader-local values remain open; central log unconfirmed |
| 1.9 | goethe-a1-germany-family-reunion | 2026-07-22 | Tier 1: legal/route/acceptance/submission | Competent German mission + foreigners authority | L/A/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Bounded review recorded; reader-local values remain open; central log unconfirmed |
| 1.10 | german-family-reunion-language-requirement | 2026-08-15 | Tier 1: legal/route/acceptance/submission | Responsible German mission / immigration authority | L/A/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Correction made/reviewed in 2026-08-15 package; central log still unconfirmed |
| 2.1 | german-a1-exam-booking-timeline | 2026-07-18 | Tier 2: dynamic transaction/execution | Selected centre + responsible mission | A/E/X/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Bounded review recorded; reader-local values remain open; central log unconfirmed |
| 2.2 | goethe-a1-fees-by-country | 2026-07-19 | Tier 2: dynamic transaction/execution | Selected official/authorised centre + Goethe | E/X/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Bounded review recorded; reader-local values remain open; central log unconfirmed |
| 2.3 | goethe-a1-retake-policy | 2026-07-19 | Tier 2: dynamic transaction/execution | Goethe + selected centre | E/X/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Whole-exam retake correction resolved 2026-07-19; central log unconfirmed |
| 2.4 | goethe-a1-test-centers | 2026-07-19 | Tier 2: dynamic transaction/execution | Goethe/telc + selected centre | E/X/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Bounded review recorded; reader-local values remain open; central log unconfirmed |
| 2.5 | goethe-b1-fees-and-booking | 2026-07-19 | Tier 2: dynamic transaction/execution | Receiving authority + selected Goethe centre | A/E/X/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | 2026-07-19 bounded review; stale/universal claims excluded; central log unconfirmed |
| 2.6 | goethe-a1-booking-mistakes | 2026-07-22 | Tier 2: dynamic transaction/execution | Receiving authority + Goethe/selected centre | A/E/X/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Bounded review recorded; reader-local values remain open; central log unconfirmed |
| 2.7 | goethe-a1-official-links-practice-resources | 2026-07-22 | Tier 2: dynamic transaction/execution | Mission + Goethe/selected centre | A/E/X/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Bounded review recorded; reader-local values remain open; central log unconfirmed |
| 2.8 | goethe-a1-pre-booking-checklist | 2026-07-22 | Tier 2: dynamic transaction/execution | Receiving authority + Goethe/selected centre | A/E/X/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | Bounded review recorded; reader-local values remain open; central log unconfirmed |
| 2.9 | germany-b1-settlement-citizenship-timeline | 2026-08-15 (no-change package; FM remains 2026-07-19) | Tier 2: dynamic transaction/execution | Local foreigners/nationality authority + selected centre | A/E/X/C | TBD—no approved cadence/owner; proposed ≤60d or trigger-first | No-change recheck 2026-08-15; dates intentionally not refreshed; central log unconfirmed |
| 3.1 | goethe-b1-study-plan | 2026-07-19 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre; receiving authority for acceptance | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-19 `PHASE_2_B1_CONTENT_AUDIT.md` bounded review limited predictive claims; central log unconfirmed |
| 3.2 | goethe-a1-30-day-study-plan | 2026-07-22 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-22 bounded review removed/limited predictive claims; central log unconfirmed |
| 3.3 | goethe-a1-listening-practice | 2026-07-22 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-22 bounded review removed/limited predictive claims; central log unconfirmed |
| 3.4 | goethe-a1-speaking-topics | 2026-07-22 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-22 bounded review removed/limited predictive claims; central log unconfirmed |
| 3.5 | goethe-a1-study-plan-working-adults | 2026-07-22 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-22 bounded review removed/limited predictive claims; central log unconfirmed |
| 3.6 | goethe-a1-writing-practice | 2026-07-22 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-22 bounded review removed/limited predictive claims; central log unconfirmed |
| 3.7 | goethe-b1-difficulty-analysis | 2026-07-22 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-22 bounded review removed/limited predictive claims; central log unconfirmed |
| 3.8 | goethe-b1-listening-deep-dive | 2026-07-22 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-22 bounded review removed/limited predictive claims; central log unconfirmed |
| 3.9 | goethe-b1-mock-exam-routine | 2026-07-22 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-22 bounded review removed/limited predictive claims; central log unconfirmed |
| 3.10 | goethe-b1-speaking-topics | 2026-07-22 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-22 bounded review removed/limited predictive claims; central log unconfirmed |
| 3.11 | goethe-b1-writing-assessment | 2026-07-22 | Tier 3: exam format/training/editorial practice | Goethe-Institut + selected centre | E/C | TBD—no approved cadence/owner; proposed ≤90d or trigger-first | 2026-07-22 bounded review removed/limited predictive claims; central log unconfirmed |

### Queue notes

- `germany-b1-settlement-citizenship-timeline` proves why the queue cannot sort on front matter alone. Its public `sourceReviewedAt` remains 2026-07-19, but an evidence-backed no-change recheck occurred on 2026-08-15. The package intentionally did not refresh public dates merely for recency.
- Source expiry is not certificate expiry. The support package says a Goethe certificate may be described by its owner as not expiring, while a receiving authority can still require sufficiently recent evidence. The competent receiving authority decides administrative recency.
- All local mission, authority, employer, programme and centre facts remain unresolved by design until the reader supplies a specific scope or the page deliberately reviews a named receiving source.

## 6. Reconciliation findings

1. **`CONTENT_MAP.md` drift:** front matter and later review records show both Portugal pages at `sourceReviewedAt: 2026-07-29`, but the English ledger still shows 2026-07-21. The UK front matter has `updatedDate: 2026-07-29`, while the ledger still shows 2026-07-21. This draft uses current front matter for the 23-page table and separately uses the B1 no-change package for its latest operational check.
2. **TestDaF receiving-authority gap:** all four starter pages name the target university/programme as final authority but have no `primaryOfficialAuthorityUrl`; only the exam-owner URL is present. That is safe under the current starter discovery gate, but it blocks programme-specific conclusions or maturity promotion.
3. **Germany category gap:** `highRiskRouteCategories` in `src/data/source-review.ts` lists Portugal, Spain, UK, Canada, Italy, France, Finland and Netherlands, but omits `germany-a1` and `germany-b1`. Discovery still fails closed when source review is not reviewed, but the category-level high-risk status resolver does not encode the future Germany queue requirement.
4. **Review lineage is split:** current checks are distributed across front matter, claim packages, no-change packages, `CONTENT_MAP.md`, the task log and Window B decision records. There is no single canonical source-expiry/correction ledger.
5. **Evidence is bounded:** all 23 front-matter records say reviewed, but `CONTENT_MAP.md` still labels Spain, France and NT2 records partial/bounded. “Reviewed” means the retained public facts and verification workflow were checked, not that individual eligibility or local execution is closed.

## 7. Key blockers before real VL-SOURCE-001 / VL-ASSET-001 execution

1. **Governance gate:** `VL-SOURCE-001` is gated on `VL-GOV-002`. `docs/OPERATIONS_STATUS.md` still lacks a confirmed Content Authority Owner, backup, cadence, trigger SLA and correction-ledger location. Do not infer the role from Git authors, historical reviewers or email addresses.
2. **Data gate:** there is no complete shared 28/90-day Search Console window for these assets. `verification-pending` and page existence are not demand or country-priority evidence.
3. **No approved expiry policy:** no current rule defines due/expired, risk tiers or trigger response times. The 60/90/30-day values above are proposals only.
4. **No durable fields:** disposition, reason, risk, data state, `nextReviewAt`, expiry, trigger and correction state are absent from the current code/schema and `CONTENT_MAP` table.
5. **Ledger drift and latest-check exception:** front matter and `CONTENT_MAP` disagree for Portugal/UK, while the B1 timeline has a newer real check than public `sourceReviewedAt`. Reconcile evidence before computing dates.
6. **Human disposition remains open:** `CONTENT_MAP.md` says the recent telc/FAN-40/FAN-42/FAN-43 lineage still needs human disposition and that independent re-review must not be inferred from deployment.
7. **Scope-specific sources remain missing:** selected missions/authorities/programmes/employers/regulators/centres are intentionally unresolved. They must remain reader-side checks, not be “closed” by a general source-refresh task.

## 8. Safe next step

After `VL-GOV-002`, the confirmed owner should approve or revise the review tiers and trigger SLA, reconcile the current ledger against front matter and no-change packages, and then assign real dates. `VL-ASSET-001` can consume the 23-row draft only as a proposal after `VL-SOURCE-001`; Search Console data can later confirm or change the proposed dispositions. Any discovery, content, merge or retirement change requires a separate authorised task and independent audit.
