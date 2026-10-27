# VisaLang Weekly Operating Review

> **Status:** `DRAFT` template for VL-DATA-002. Copy this file to `docs/operating-reviews/YYYY-MM-DD.md` for each review; do not overwrite an earlier report.
>
> Use only definitions from `docs/GROWTH_DATA_DICTIONARY.md`. The current dictionary is a draft, so a real baseline remains gated until the Data Owner approves an effective version. This template does not authorise account access, content changes, commit, push, deployment, or any production action.

## Completion rules

- Run the review on the same weekday and in the same reporting time zone each week.
- Replace every bracketed placeholder. A completed report has no blank data cell: use a value or an approved `NA_*` / `INCOMPARABLE` state with a reason.
- Link every value to a raw export or dated health check through an `evidence_id`.
- Week 1 is a baseline only. Do not add a growth target without prior evidence and owner approval.
- Do not record a personal query, email content, account secret, cookie, user identifier, private case, or tool input.
- Keep Analytics, AdSense, and Google Privacy & messaging CMP separate and fail-closed.
- Choose at most three content/source actions and two operations/technical actions.

## 1. Review control and roadmap position

| Field | Required entry |
| --- | --- |
| `report_id` | `[YYYY-MM-DD / stable ID]` |
| `reviewed_at` | `[ISO 8601 timestamp with offset]` |
| `planned_review_day` | `Monday` |
| `search_reporting_timezone` | `America/Los_Angeles` |
| `baseline_week` | `[1 / 2 / 3 / 4 / post-baseline]` |
| `baseline_sequence_status` | `[GATED / VALID_WEEK_N_OF_4 / BASELINE_RESTART / NOT_APPLICABLE]` |
| `dictionary_version` | `[approved version; 0.1-draft is not effective]` |
| `route_map_version` | `[version and effective date]` |
| `current_roadmap_phase` | `[Phase 0 / Phase 1 / Phase 2 / Phase 3 / Phase 4 / Phase 5 / Phase 6]` |
| `phase_gate_status` | `[PASS / BLOCKED / NOT_APPLICABLE]` |
| `primary_evidence_scope` | `[site_all / de_a1_en / de_b1_en / de_a1_zh / approved second route / other exact scope]` |
| `Search Console property` | `[exact authorised property or NA_NOT_AUTHORIZED]` |
| `prepared_by` | `[role]` |
| `Data Owner review` | `[role + date / BLOCKED: no confirmed owner]` |
| `Programme Owner review` | `[role + date / BLOCKED: no confirmed owner]` |

### Roadmap boundary

Check one current operating boundary and cite its gate record.

- [ ] Phase 0: only source maintenance, read-only health checks, and document governance while responsibility/evidence is incomplete.
- [ ] Phase 1: build four consecutive weeks of search and health evidence; no route priority claim from missing or small data.
- [ ] Phase 2: optimize only the approved Germany A1/B1 set supported by Phase 1 and risk evidence.
- [ ] Phase 3: monitor only one separately approved second-route pilot.
- [ ] Phase 4: address evidence-backed Chinese Germany A1 route gaps; do not create a mechanical mirror.
- [ ] Phase 5: evaluate only one separately gated commercial capability.
- [ ] Phase 6: operate the approved scaled portfolio.

- Gate record/evidence ID: `[required]`
- What this gate permits: `[bounded conclusion]`
- What this gate does not permit: `[required]`

## 2. Fixed reporting windows and platform delay

Set `planned_E` to the Friday before this Monday review, in Pacific Time. Derive all four fixed windows from that date. Record `accepted_last_complete_date` separately. If `planned_E` is absent, fresh, partial, or later than the accepted complete date, keep the planned windows and mark the whole matched search block `NA_DELAYED`; never re-anchor to an earlier date or shift a window after viewing results.

| Window | Required exact dates derived from `planned_E` | Completeness |
| --- | --- | --- |
| `current_7d` | `[planned_E-6 through planned_E, inclusive]` | `[COMPLETE / NA_DELAYED]` |
| `prior_7d` | `[planned_E-13 through planned_E-7, inclusive]` | `[COMPLETE / NA_DELAYED]` |
| `current_28d` | `[planned_E-27 through planned_E, inclusive]` | `[COMPLETE / NA_DELAYED]` |
| `prior_28d` | `[planned_E-55 through planned_E-28, inclusive]` | `[COMPLETE / NA_DELAYED]` |
| 90-day context export | `[exact dates / NA_NOT_AUTHORIZED / NA_NOT_RUN]` | `[COMPLETE / NA_*]` |

| Delay field | Required entry |
| --- | --- |
| `planned_E` | `[YYYY-MM-DD PT]` |
| Platform latest available date | `[YYYY-MM-DD PT / NA_NOT_AUTHORIZED]` |
| `accepted_last_complete_date` | `[YYYY-MM-DD PT / NA_DELAYED]` |
| Exported at | `[ISO 8601 timestamp]` |
| Fresh/partial days excluded | `[dates / none / unknown]` |
| Delay decision | `[USE_PLANNED_WINDOWS / REPORT_WHOLE_BLOCK_NA_DELAYED]` |

## 3. Raw evidence register

Use durable, owner-approved locations. A repository entry is a redacted pointer, not a raw account dump.

| Evidence ID | Source and exact purpose | Property / environment | Date range or checked at | Search type, filters, dimensions, coverage | Durable location + checksum | Privacy / availability state |
| --- | --- | --- | --- | --- | --- | --- |
| `[SC-TOTAL-ID]` | Search Console ungrouped totals | `[property]` | `[dates]` | `[web; filters; no dimension]` | `[pointer + sha256]` | `[PASS / restricted / NA_*]` |
| `[SC-PAGE-ID]` | Search Console page breakdown | `[property]` | `[dates]` | `[web; filters; page; rows/limit]` | `[pointer + sha256]` | `[state]` |
| `[SC-QUERY-ID]` | Search Console query breakdown | `[property]` | `[dates]` | `[web; filters; query; rows/limit]` | `[controlled pointer + sha256]` | `[RESTRICTED / NA_*]` |
| `[SC-COUNTRY-ID]` | Search Console country breakdown | `[property]` | `[dates]` | `[web; filters; country; rows/limit]` | `[pointer + sha256]` | `[state]` |
| `[SC-DEVICE-ID]` | Search Console device breakdown | `[property]` | `[dates]` | `[web; filters; device; rows/limit]` | `[pointer + sha256]` | `[state]` |
| `[INDEX-ID]` | Search Console indexing snapshot | `[property]` | `[checked_at]` | `[snapshot scope]` | `[controlled pointer + sha256]` | `[state]` |
| `[ROUTE-MAP-ID]` | Dated route/indexability map | `[source/build]` | `[effective_at]` | `[URL coverage]` | `[pointer + sha256]` | `[state]` |
| `[HTTP-ID]` | 404/5xx and link check | `[local/build/production]` | `[checked_at]` | `[URL manifest and count]` | `[pointer + sha256]` | `[state]` |
| `[PERF-ID]` | Lab performance check | `[build/production]` | `[checked_at]` | `[pages/device/tool/version/run count]` | `[pointer + sha256]` | `[state]` |
| `[CORRECTION-ID]` | Redacted correction-register aggregate | `[controlled register]` | `[dates]` | `[status definitions and record coverage]` | `[pointer + sha256]` | `[state]` |
| `[SOURCE-ID]` | Source review/expiry register | `[route map]` | `[cutoff]` | `[high-risk page coverage]` | `[pointer + sha256]` | `[state]` |

## 4. Data quality and anomaly log

Record platform delay, missing rows, privacy filtering, row limits, filter changes, route-map changes, check failures, releases, incidents, and anything else that affects comparison. Do not explain a change as causal unless separate evidence supports that claim.

| ID | Affected metric/scope | Observed issue | From / to time | Severity | Comparison impact | Owner | Next verification action and date | Evidence ID |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `[DQ-1]` | `[required]` | `[required / none observed]` | `[required]` | `[P0/P1/P2/info]` | `[none / flag / INCOMPARABLE / BASELINE_RESTART]` | `[role / BLOCKED]` | `[action + date]` | `[ID]` |

### Missing-data register

| Metric / evidence | Availability state | Reason | Owner | Next check date | Consequence for decisions |
| --- | --- | --- | --- | --- | --- |
| `[required]` | `[0 / NA_NOT_AUTHORIZED / NA_NOT_CONNECTED / NA_DELAYED / NA_NOT_RUN / NA_ZERO_DENOMINATOR / NA_NO_SAMPLE / NA_NO_URL_LEVEL_EVIDENCE / NA_CAPABILITY_CLOSED / NA_PRIVACY_SUPPRESSED / NA_NOT_APPLICABLE / INCOMPARABLE]` | `[required]` | `[role / BLOCKED]` | `[date]` | `[bounded consequence]` |

## 5. Search demand snapshot

Use the ungrouped platform total for site/property totals. Do not add page, query, country, or device exports together. CTR is clicks divided by impressions. Position is the platform aggregate or an impression-weighted average from one complete row set.

| Metric | Current 7d | Prior 7d | WoW change | Current 28d | Prior 28d | 28d change | Evidence / limitation |
| --- | ---: | ---: | --- | ---: | ---: | --- | --- |
| Organic clicks | `[value / NA_*]` | `[value / NA_*]` | `[absolute; % or state]` | `[value / NA_*]` | `[value / NA_*]` | `[absolute; % or state]` | `[ID + boundary]` |
| Organic impressions | `[value / NA_*]` | `[value / NA_*]` | `[absolute; % or state]` | `[value / NA_*]` | `[value / NA_*]` | `[absolute; % or state]` | `[ID + boundary]` |
| Organic CTR | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[percentage points / state]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[percentage points / state]` | `[ID + numerator/denominator + boundary]` |
| Average position | `[value / NA_*]` | `[value / NA_*]` | `[current-prior; negative improves]` | `[value / NA_*]` | `[value / NA_*]` | `[current-prior; negative improves]` | `[ID + boundary]` |

### Brand / nonbrand reported-query rows

- Brand lexicon/version: `[required]`
- Query privacy review: `[PASS / NA_PRIVACY_SUPPRESSED]`
- Query export omission/row-limit note: `[required]`

| Metric | Current 7d | Prior 7d | Current 28d | Prior 28d | Evidence / limitation |
| --- | ---: | ---: | ---: | ---: | --- |
| Brand impressions | `[value / NA_*]` | `[value / NA_*]` | `[value / NA_*]` | `[value / NA_*]` | `[ID]` |
| Nonbrand impressions | `[value / NA_*]` | `[value / NA_*]` | `[value / NA_*]` | `[value / NA_*]` | `[ID]` |
| Unclassified/suppressed impressions | `[value / NA_*]` | `[value / NA_*]` | `[value / NA_*]` | `[value / NA_*]` | `[ID]` |
| Nonbrand impression share | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[classified rows only; preserve numerator/denominator]` |
| Nonbrand click share | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[classified rows only; preserve numerator/denominator]` |

### Route-map and indexability breakdown

Classify by landing page with the pinned route map. Emit one row for every observed `(route_cohort, route_role, indexability_state)` tuple; repeat a cohort when it contains more than one role or indexability state. Never label a mixed cohort total as one specific role/state. An optional cohort subtotal must use the explicit labels `ALL_ROLES` and `ALL_INDEXABILITY_STATES`. Calculate clicks, impressions, ratio-of-sums CTR, and impression-weighted position at the declared row grain. When impressions are zero, CTR and position are `NA_ZERO_DENOMINATOR`. `noindex` traffic is an anomaly/diagnostic input, not a growth opportunity by default.

- Cohorts accounted for: `[de_a1_en / de_b1_en / de_a1_zh / second_route_approved if separately gated / other_indexable / noindex_review / unmapped; list omissions and NA reason]`
- Approved second-route gate: `[exact gate + cohort / NA_NOT_APPLICABLE]`

| Route cohort | Route role | Indexability state | Pages in tuple | Clicks (28d) | Impressions (28d) | CTR | Position | Evidence / boundary |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- |
| `[cohort]` | `[core / support / starter_pending / other / unknown]` | `[expected_indexable / expected_noindex / observed_conflict / unknown]` | `[value]` | `[value / NA_*]` | `[value / NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value / NA_ZERO_DENOMINATOR / other NA_*]` | `[route-map + page-export IDs]` |
| `[same or next cohort]` | `[one exact role]` | `[one exact state]` | `[value]` | `[value / NA_*]` | `[value / NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value / NA_ZERO_DENOMINATOR / other NA_*]` | `[IDs]` |
| `[optional cohort subtotal]` | `ALL_ROLES` | `ALL_INDEXABILITY_STATES` | `[value]` | `[value / NA_*]` | `[value / NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value / NA_ZERO_DENOMINATOR / other NA_*]` | `[clearly labelled subtotal IDs]` |

### Top breakdowns for `current_28d`

Use the dictionary tie-break rules. Default maximum is 20 rows per breakdown. A row's presence is descriptive, not proof of route priority.

#### Landing pages

| Rank | Canonical page | Route cohort / role / indexability | Clicks | Impressions | CTR | Position | Prior-28d status | Evidence |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| `[1]` | `[URL / NA_*]` | `[classification]` | `[value]` | `[value]` | `[value]` | `[value]` | `[rank / entered / INCOMPARABLE]` | `[ID]` |

#### Queries

Only include text that passed privacy screening. Otherwise use `[withheld: privacy]` or suppress the row.

| Rank | Screened query label | Brand class | Clicks | Impressions | CTR | Position | Prior-28d status | Evidence |
| ---: | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| `[1]` | `[screened text / withheld]` | `[brand/nonbrand/unclassified]` | `[value / suppressed]` | `[value / suppressed]` | `[value / suppressed]` | `[value / suppressed]` | `[rank / entered / suppressed]` | `[controlled ID]` |

#### Countries

| Rank | Platform country | Clicks | Impressions | CTR | Position | Prior-28d status | Evidence |
| ---: | --- | ---: | ---: | ---: | ---: | --- | --- |
| `[1]` | `[value / unknown]` | `[value]` | `[value]` | `[value]` | `[value]` | `[rank / entered / INCOMPARABLE]` | `[ID]` |

#### Devices

| Rank | Platform device | Clicks | Impressions | CTR | Position | Prior-28d status | Evidence |
| ---: | --- | ---: | ---: | ---: | ---: | --- | --- |
| `[1]` | `[desktop/mobile/tablet/other platform value]` | `[value]` | `[value]` | `[value]` | `[value]` | `[rank / entered / INCOMPARABLE]` | `[ID]` |

## 6. Indexing and site health

### Search Console indexing snapshot

| Metric | Current snapshot | Previous comparable snapshot | Change | Checked at / environment | Evidence / limitation |
| --- | ---: | ---: | --- | --- | --- |
| Platform indexed URLs | `[value / NA_*]` | `[value / NA_*]` | `[absolute / INCOMPARABLE]` | `[time; platform]` | `[ID + boundary]` |
| Platform not-indexed URLs | `[value / NA_*]` | `[value / NA_*]` | `[absolute / INCOMPARABLE]` | `[time; platform]` | `[ID + boundary]` |
| Platform index coverage | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[value% / NA_ZERO_DENOMINATOR / other NA_*]` | `[percentage points / state]` | `[time; platform]` | `[ID + numerator/denominator + boundary]` |
| Expected-indexable URLs checked / total | `[checked / total / NA_*]` | `[checked / total / NA_*]` | `[descriptive]` | `[time; platform + route map]` | `[IDs]` |
| Confirmed indexed among checked | `[value / NA_*]` | `[value / NA_*]` | `[absolute / state]` | `[time; platform]` | `[IDs]` |
| Expected-indexable coverage | `[value% / NA_ZERO_DENOMINATOR / NA_NO_URL_LEVEL_EVIDENCE / other NA_*]` | `[value% / NA_ZERO_DENOMINATOR / NA_NO_URL_LEVEL_EVIDENCE / other NA_*]` | `[percentage points / state]` | `[time; platform]` | `[checked numerator/denominator + sample/full-set label]` |
| Indexing anomalies | `[value / NA_*]` | `[value / NA_*]` | `[absolute / state]` | `[time; platform]` | `[category + redacted samples]` |

### HTTP, links, paths, and performance

| Metric/check | Result | Coverage / method | Environment | Checked at | Previous comparable result | Evidence / limitation |
| --- | --- | --- | --- | --- | --- | --- |
| Unexpected 404 URLs | `[count / NA_NOT_RUN]` | `[checked URLs + manifest]` | `[local/build/production]` | `[time]` | `[value / INCOMPARABLE]` | `[ID]` |
| Unexpected 5xx URLs | `[count / NA_NOT_RUN]` | `[checked URLs + manifest]` | `[local/build/production]` | `[time]` | `[value / INCOMPARABLE]` | `[ID]` |
| Broken internal links | `[count / NA_NOT_RUN]` | `[crawler scope]` | `[local/build/production]` | `[time]` | `[value / INCOMPARABLE]` | `[ID]` |
| Route path checks / pass rate | `[passed/attempted; rate% / NA_NOT_RUN]` | `[fixed manifest: hub → next step/official source/tool; synthetic only]` | `[environment]` | `[time]` | `[value / INCOMPARABLE]` | `[ID; no visitor behaviour claim]` |
| Lab performance | `[score; LCP ms; CLS; TBT ms / NA_NOT_RUN]` | `[pages/device/tool/version/runs]` | `[build/production]` | `[time]` | `[values / INCOMPARABLE]` | `[ID; lab only]` |

Do not blend environments. A local/build pass is not a production pass. A synthetic route-path pass shows that a path exists and functions in the checked environment; it does not show that visitors used or completed it.

## 7. Trust, corrections, and source freshness

| Metric | Current | Previous comparable value | Change | Cutoff / sample | Evidence / limitation |
| --- | ---: | ---: | --- | --- | --- |
| Correction reports received | `[value / NA_CAPABILITY_CLOSED]` | `[value / NA_*]` | `[absolute / state]` | `[window]` | `[ID; no email content]` |
| Correction reports open | `[value / NA_CAPABILITY_CLOSED]` | `[value / NA_*]` | `[absolute / state]` | `[cutoff]` | `[ID]` |
| Median time to first substantive action | `[duration / NA_NO_SAMPLE / NA_CAPABILITY_CLOSED]` | `[value / NA_*]` | `[descriptive]` | `[n]` | `[ID; no response or SLA claim]` |
| Median close time | `[duration / NA_NO_SAMPLE / NA_CAPABILITY_CLOSED]` | `[value / NA_*]` | `[descriptive]` | `[n]` | `[ID]` |
| High-risk pages with due/overdue source review | `[value / NA_NOT_RUN]` | `[value / NA_*]` | `[absolute / state]` | `[cutoff]` | `[ID]` |
| Open due/overdue source-review records | `[value / NA_NOT_RUN]` | `[value / NA_*]` | `[absolute / state]` | `[cutoff]` | `[ID]` |

### Source-risk queue

| Priority | Page / route cohort | Authority and risk type | Last checked | Next review date | Trigger / correction state | Owner | Next verification action | Evidence |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| `[1]` | `[slug + cohort]` | `[authority + bounded risk]` | `[date / unknown]` | `[date / missing]` | `[required]` | `[role / BLOCKED]` | `[action + date]` | `[ID]` |

A due source does not automatically update page dates, remove `noindex`, change ad eligibility, or prove a claim false.

## 8. Separate capability records

No capability below supplies a weekly metric unless its own decision and evidence gate is approved. Keep all three records even when all are closed.

### 8.1 Analytics

| Field | Entry |
| --- | --- |
| Decision state | `CLOSED_FOR_PLANNING` unless a separate approved record says otherwise |
| Evidence state | `UNVERIFIED` by default |
| Observed technical/production state | `UNKNOWN` until separately checked and authorised |
| Owner / decision date | `[BLOCKED: unconfirmed / approved role + date]` |
| Evidence record | `[NA_NOT_AUTHORIZED / separate evidence ID]` |
| Permitted conclusion | `No Analytics metric or user-behaviour conclusion is available` unless the separate gate changes it |
| Next review trigger/date | `[owner decision or date]` |

### 8.2 AdSense

| Field | Entry |
| --- | --- |
| Decision state | `CLOSED_FOR_PLANNING` unless a separate approved record says otherwise |
| Evidence state | `UNVERIFIED` by default |
| Observed source/account/production state | `UNKNOWN`; record each separately if authorised |
| Owner / decision date | `[BLOCKED: unconfirmed / approved roles + date]` |
| Evidence record | `[NA_NOT_AUTHORIZED / separate evidence ID]` |
| Permitted conclusion | `Do not expand and do not infer revenue or ad readiness`; this is not a claim that existing requests are absent |
| Rollback/closure evidence | `[unknown / separate record]` |
| Next review trigger/date | `[owner decision or date]` |

### 8.3 Google Privacy & messaging CMP

| Field | Entry |
| --- | --- |
| Decision state | `CLOSED_FOR_PLANNING` unless a separate approved record says otherwise |
| Evidence state | `UNVERIFIED` by default |
| Observed account/region/browser/network state | `UNKNOWN`; do not generalize beyond a tested condition |
| Owner / decision date | `[BLOCKED: unconfirmed / approved role + date]` |
| Evidence record | `[NA_NOT_AUTHORIZED / separate evidence ID]` |
| Permitted conclusion | `No consent, reject, manage, reopen, or region-wide behaviour is verified` unless bounded evidence exists |
| Fallback/closure evidence | `[unknown / separate record]` |
| Next review trigger/date | `[owner decision or date]` |

## 9. Evidence-backed observations

Write observations, not explanations that exceed the evidence.

1. **Search demand:** `[what changed in matched windows, or NA_*; cite evidence]`
2. **Landing page/query:** `[screened, coverage-bounded observation; cite evidence]`
3. **Country/device:** `[platform-dimension observation; cite evidence]`
4. **Route cohort/indexability:** `[route-map observation; cite evidence]`
5. **Index/health/trust:** `[snapshot observation; cite evidence and environment]`

### Prohibited inference check

- [ ] No small sample was used to claim route, country, or commercial priority.
- [ ] No search metric was described as a conversion or user completion.
- [ ] No platform delay, privacy omission, or filter change was described as demand change.
- [ ] No local/build result was described as production evidence.
- [ ] No unsupported causal explanation was added.

## 10. Weekly decisions and action limit

### Phase decision

Select one. Default to remaining in the current phase.

- [ ] Remain in the current phase and continue the comparable baseline.
- [ ] Remain in the current phase and collect missing evidence.
- [ ] Limit work to source-risk maintenance/read-only health checks because a gate is blocked.
- [ ] Restart the baseline because a week or material definition is not comparable.
- [ ] Submit a bounded next-phase candidate for separate owner approval; this report is not that approval.

- **Decision:** `[required]`
- **Reason with evidence IDs:** `[required]`
- **What is explicitly not approved:** `[required]`
- **Owner and decision date:** `[role / BLOCKED]`

### Content/source actions — maximum 3

| Priority | Phase + route/page | Evidence-backed need | Action | Owner | Done when | Due date | Stop condition | Evidence ID |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| `1` | `[required / NO_ACTION]` | `[required]` | `[required]` | `[role / BLOCKED]` | `[verifiable result]` | `[date]` | `[gate/evidence/privacy boundary]` | `[ID]` |
| `2` | `[required / NO_ACTION]` | `[required]` | `[required]` | `[role / BLOCKED]` | `[verifiable result]` | `[date]` | `[condition]` | `[ID]` |
| `3` | `[required / NO_ACTION]` | `[required]` | `[required]` | `[role / BLOCKED]` | `[verifiable result]` | `[date]` | `[condition]` | `[ID]` |

### Operations/technical actions — maximum 2

| Priority | Phase + scope | Evidence-backed need | Action | Owner | Done when | Due date | Stop condition | Evidence ID |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| `1` | `[required / NO_ACTION]` | `[required]` | `[required]` | `[role / BLOCKED]` | `[verifiable result]` | `[date]` | `[no unauthorised external action]` | `[ID]` |
| `2` | `[required / NO_ACTION]` | `[required]` | `[required]` | `[role / BLOCKED]` | `[verifiable result]` | `[date]` | `[condition]` | `[ID]` |

Do not fill unused rows with speculative work. Use `NO_ACTION — insufficient evidence/owner/gate` and state the next verification step.

## 11. Decision log

Append decisions. Never erase an earlier entry; add a superseding row.

| Decision ID / time | Decision and phase | Evidence IDs | Permitted conclusion | Boundary / rejected alternative | Decision owner | Review/expiry date | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `[DEC-1 / ISO time]` | `[required]` | `[IDs]` | `[exact bounded conclusion]` | `[what this does not prove]` | `[role / BLOCKED]` | `[date]` | `[PROPOSED / APPROVED / BLOCKED / SUPERSEDED]` |

## 12. Final quality and privacy check

- [ ] Dictionary version and route-map version are approved and pinned, or the report is clearly `GATED`.
- [ ] Review cadence, time zone, exact windows, extraction time, and last complete date are recorded.
- [ ] Each value or missing state traces to a durable raw export or health check.
- [ ] Current/prior filters and dimensions match; no independent dimension exports were added together.
- [ ] CTR, position, percent changes, percentage-point changes, and zero denominators follow the dictionary.
- [ ] Platform, local, build, and production evidence are separate.
- [ ] Brand/nonbrand, core/support, and expected indexable/noindex classifications use pinned rules.
- [ ] Delays, anomalies, privacy filtering, row limits, and missing data are explicit.
- [ ] No personal query, email content, private case, or tool input appears.
- [ ] Analytics, AdSense, and CMP remain three separate records with default closed/unverified states unless independently evidenced.
- [ ] Week 1 has no unsupported target.
- [ ] There are at most three content/source and two operations/technical actions.
- [ ] The phase decision states what is not approved.
