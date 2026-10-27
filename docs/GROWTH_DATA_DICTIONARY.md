# VisaLang Growth Data Dictionary

> **Status:** `DRAFT` for VL-DATA-001. This document defines a fail-closed reporting contract. It does not prove that an account, data source, or owner is available. The Data Owner must approve an effective version before the first dated weekly report uses it.
>
> **Dictionary version:** `0.1-draft`  
> **Drafted:** 2026-09-01  
> **Effective from:** pending Data Owner approval  
> **Current execution authority:** `docs/VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md`  
> **Scope boundary:** this dictionary remains supporting draft evidence and does not expand that plan.

## 1. Purpose and reporting boundary

This dictionary fixes the meanings, calculations, dimensions, quality states, and evidence rules used by `docs/WEEKLY_OPERATING_REVIEW.md`. Its first use is the Phase 1 four-week data and health baseline. It must not be used to imply that Phase 1 has passed, a route has growth priority, or a commercial capability is live.

The baseline uses these evidence classes:

1. Search demand from an authorised, read-only Google Search Console export.
2. Indexing snapshots from Search Console, kept separate from repository or production checks.
3. Site health from dated local, build, platform, or production checks whose environment is explicit.
4. Trust and source-maintenance records from controlled, non-personal registers.

Analytics, AdSense, and consent management are three separate capabilities. None is a default source for a metric in this dictionary. Their default reporting state is `CLOSED_FOR_PLANNING / UNVERIFIED`, which means no data or conclusion may be attributed to them. It does not claim that a script or account is technically absent. Each capability needs its own owner decision and evidence record before that default can change.

## 2. Version and change control

Every dated report must record `dictionary_version`, `route_map_version`, and the exact data windows. Version changes use this table and a new version number; they never silently rewrite a historical report.

| Version | Effective date | Change | Comparison impact | Approved by |
| --- | --- | --- | --- | --- |
| `0.1-draft` | Pending | Initial VL-DATA-001 draft | Not yet an approved baseline | Pending Data Owner |

For any change, add the reason, old rule, new rule, affected metrics and reports, reprocessing decision, and approver. A formula, filter, brand lexicon, route mapping, time zone, source, or missing-value rule is a definition change. If it makes adjacent weeks incomparable, mark the first report under the new version `BASELINE_RESTART`; do not describe the sequence as four continuous weeks.

Historical raw files are immutable. If a platform revises data or an error is found, preserve the original report and add a dated correction note that links the replacement evidence.

## 3. Time, cadence, and comparison windows

### 3.1 Canonical calendar

- **Search reporting time zone:** `America/Los_Angeles` (Pacific Time, DST-aware). Search Console daily dates are kept in the platform calendar and are not re-bucketed into a local time zone.
- **Evidence timestamps:** ISO 8601 with an offset, preferably UTC with `Z` (for example, `2026-09-01T03:00:00Z`).
- **Planned extraction cadence:** each Monday. The reviewer records the actual extraction time if the planned cadence is missed.
- **Planned search report end date (`planned_E`):** the preceding Friday in Pacific Time. This anchor does not move. The separate `accepted_last_complete_date` records the latest date that the platform evidence supports as complete. If `planned_E` is absent, fresh, partial, or later than `accepted_last_complete_date`, mark the whole matched search block `NA_DELAYED`; do not re-anchor it to an earlier date or move the window to create a favourable comparison.
- **Point-in-time checks:** indexing, HTTP, performance, and source registers use their actual `checked_at` timestamp. They are snapshots, not full-week event totals.
- **Operational event windows:** correction events use the same inclusive Pacific Time dates as `current_7d` and `prior_7d`. Convert stored timestamps only for window membership; retain the original timestamp.
- **Snapshot cutoff:** source expiry and other as-of counts use `reviewed_at` as the cutoff and record its offset. Compare them only with a prior snapshot taken on the same planned weekday.

A Data Owner may approve a different cadence or freeze lag only through a dictionary version change. Week 1 records a baseline and data quality. It does not set a growth target without prior evidence.

### 3.2 Frozen windows

Derive every fixed window from `planned_E`, whether or not the platform data is complete:

- `current_7d = planned_E-6 through planned_E`, inclusive.
- `prior_7d = planned_E-13 through planned_E-7`, inclusive.
- `current_28d = planned_E-27 through planned_E`, inclusive.
- `prior_28d = planned_E-55 through planned_E-28`, inclusive.

When `planned_E` is not supported as complete, all four windows remain anchored to it and the whole matched search block is `NA_DELAYED`. `accepted_last_complete_date` is evidence about delay; it never becomes a substitute anchor.

All sides of a comparison must use the same property, search type, filters, dimensions, dictionary version, and route-map version. The 28-day comparison is current 28 complete days versus the immediately preceding 28 complete days. A 90-day export is a baseline/context source, not a substitute for either matched window.

## 4. Data layers and evidence lineage

### 4.1 Raw evidence layer

Raw evidence is the read-only source export or command output. Store it in an owner-approved durable location. Do not use a temporary path as the only copy. Repository documents contain a pointer and a redacted summary, not account secrets or personal data.

Each raw evidence manifest must record:

| Field | Required meaning |
| --- | --- |
| `evidence_id` | Stable, non-personal identifier |
| `source_system` | For example, `search_console`, `launch_check`, `production_http_check`, `lighthouse_lab`, `correction_register`, or `source_review_register` |
| `property_or_environment` | Exact property, `local`, `build`, `platform`, or `production`; redact account identifiers in the repository when needed |
| `exported_or_checked_at` | ISO 8601 timestamp with offset |
| `data_start`, `data_end` | Inclusive platform dates, or the literal `not_applicable_point_in_time` |
| `platform_timezone` | `America/Los_Angeles` for Search Console; actual zone for other systems |
| `search_type` | `web`, `image`, `video`, `news`, or `NA` |
| `filters` and `dimensions` | Complete, ordered list; write `none` rather than leaving blank |
| `last_complete_date` | Last date accepted as complete, or explicit missing reason |
| `row_count` and `coverage_note` | Export size, row limits, sampling, checked URL set, or other known coverage boundary |
| `location` and `sha256` | Durable evidence pointer and checksum where policy permits |
| `operator_role` | Role, not account secret or unnecessary personal identifier |
| `privacy_review` | `PASS`, `RESTRICTED`, or `REDACTED`, with reason |

Never edit a raw export to make it safe for reporting. Create a separate standard-layer file and keep the raw file controlled.

### 4.2 Standard layer

The standard layer is a reproducible, privacy-reviewed transformation. It preserves source values and adds only controlled fields:

- canonical URL and normalized date;
- source property/environment and evidence ID;
- `route_cohort`, `route_role`, and `indexability_state` from a versioned route map effective on the report date;
- `brand_class` from the versioned lexicon below;
- `availability_state` and `quality_flag`;
- normalized units, such as milliseconds for LCP and a 0–1 value for CLS.

Transformation code or steps, input checksum, output checksum, run time, and dictionary version must be retained. Query text stays in the controlled layer unless it passes the privacy rule in section 9.

### 4.3 Report layer

The report layer contains only aggregates, non-personal labels, evidence links, anomalies, and decisions. Every number must trace to one or more `evidence_id` values. Do not paste raw query tables, email content, tool input, account identifiers, cookies, IP addresses, user IDs, or case details into a weekly report.

A top query may appear only after manual screening confirms that its text contains no name, email, identifier, or case detail. Otherwise show `[withheld: privacy]`; its metric can also be suppressed if the aggregate would create disclosure risk.

## 5. Shared dimensions

Dimensions must never be mixed silently. A total from one export is not added to a total from another dimension export.

| Dimension | Allowed values or rule | Boundary |
| --- | --- | --- |
| `property` | Exact authorised Search Console property | URL-prefix and domain properties are not interchangeable. |
| `search_type` | Platform value, normally `web` only after evidence confirms it | Do not combine search types. |
| `date` | Search Console platform date in Pacific Time | Inclusive windows only. |
| `page` | Canonicalized landing-page URL while preserving meaningful path and language | Page exports can contain variants; record the canonicalization rule. |
| `query` | Exact platform query in the controlled layer | Query exports can omit privacy-filtered rows. |
| `country` | Platform country value | Unknown stays `unknown`; do not infer from language or route. |
| `device` | Platform value such as `desktop`, `mobile`, `tablet` | Do not infer a device class. |
| `route_cohort` | One primary cohort per landing page: `de_a1_en`, `de_b1_en`, `de_a1_zh`, `second_route_approved`, `other_indexable`, `noindex_review`, or `unmapped` | Classification is by page, not query. `second_route_approved` cannot be used before an owner-approved Phase 3 route exists. |
| `route_role` | `core`, `support`, `starter_pending`, `other`, or `unknown` | Comes from the dated route/content map; maturity alone does not prove indexability. |
| `indexability_state` | `expected_indexable`, `expected_noindex`, `observed_conflict`, or `unknown` | Expected source/build state is separate from Search Console observed indexing. |
| `environment` | `local`, `build`, `platform`, or `production` | Results from different environments are not blended. |

The route map is a dated lookup with `canonical_url`, primary cohort, role, expected indexability, evidence source, effective date, and version. An overall site total may include all cohorts. A route total includes only pages mapped to that cohort. Query-only exports cannot be assigned to a route. If page-query data is used, aggregate from that single export; never join separate page and query exports and assume the pair existed.

### 5.1 Roadmap alignment

Weekly reports name one current roadmap phase and one evidence scope:

- Phase 0: planning, responsibility, and evidence closure;
- Phase 1: data and health baseline;
- Phase 2: Germany A1/B1 core-route optimization;
- Phase 3: one approved second-route pilot;
- Phase 4: Chinese Germany A1 route completion;
- Phase 5: separately gated commercial validation;
- Phase 6: scaled operations.

A report may monitor multiple cohorts, but it cannot use data to enter a later phase without that phase's gate evidence and owner decision.

## 6. Search metrics and formulas

Search metrics come only from an authorised Search Console export with property, dates, search type, filters, dimensions, export time, and last complete date recorded. Use the platform total for a property/window when available. Dimension tables are for breakdowns and can be truncated or privacy filtered.

| Metric | Definition and formula | Grain | Update | Owner | Key limitations |
| --- | --- | --- | --- | --- | --- |
| `organic_clicks` | Search Console clicks for the exact window and filter set. For a complete single export, `SUM(clicks)`. | Property/window and optional single controlled breakdown | Weekly | Data Owner | Query-table totals can be lower than platform totals; separate dimension exports must not be added. |
| `organic_impressions` | Search Console impressions for the exact window and filter set. For a complete single export, `SUM(impressions)`. | Same as clicks | Weekly | Data Owner | Same truncation/privacy boundary as clicks. |
| `organic_ctr` | `organic_clicks / organic_impressions * 100`. If impressions are zero, `NA_ZERO_DENOMINATOR`. Never average row CTR values. | Same complete aggregation as numerator and denominator | Weekly | Data Owner | A mix shift across queries/pages can change CTR without a page change. |
| `average_position` | Prefer the platform aggregate. From one complete row set only: `SUM(position_i * impressions_i) / SUM(impressions_i)`. | Same complete aggregation as its rows | Weekly | Data Owner | Lower is better. It is an impression-weighted average, not a fixed rank, and row-limited exports can distort it. |
| `top_landing_pages` | Rank page rows by clicks descending, impressions descending, then canonical URL ascending; default report limit 20. | Page within one property/window/filter set | Weekly | Data Owner | A top list is not a site total. Record ties and export coverage. |
| `top_queries` | Rank controlled query rows by clicks descending, impressions descending, then normalized query ascending; default limit 20. | Query within one property/window/filter set | Weekly | Data Owner | Privacy-filtered/rare queries may be absent. Report text only after privacy screening. |
| `top_countries` | Rank country rows by clicks descending, impressions descending, then platform country value ascending; default limit 20. | Country within one property/window/filter set | Weekly | Data Owner | Platform country is descriptive and must not be inferred from language or route. |
| `device_breakdown` | For every returned platform device value, report clicks, impressions, ratio-of-sums CTR, and the platform/impression-weighted position; rank by clicks, impressions, then device value. | Device within one property/window/filter set | Weekly | Data Owner | A device split is not individual tracking and does not prove task completion. |
| `route_cohort_search` | From one page-dimension export, map each canonical page with the pinned route map, then group by the exact `(route_cohort, route_role, indexability_state)` tuple. Within each tuple, sum clicks/impressions, calculate CTR as ratio of sums, and calculate position as an impression-weighted mean. If impressions are zero, CTR and position are `NA_ZERO_DENOMINATOR`. | Route cohort + route role + indexability state within one page export/window/filter set | Weekly | Data Owner | Unmapped pages stay visible. A cohort subtotal may use explicit labels `ALL_ROLES` and `ALL_INDEXABILITY_STATES`, but must not be labelled as one specific role/state. Page-export coverage can differ from the ungrouped platform total. |
| `nonbrand_impression_share` | `nonbrand impressions / (brand impressions + nonbrand impressions) * 100` on classified query rows. If the denominator is zero, use `NA_ZERO_DENOMINATOR`. | Query rows within one export | Weekly after usable query evidence exists | Data Owner | It describes reported classified query rows, not all site impressions. Suppressed/unclassified rows are excluded and disclosed. |
| `nonbrand_click_share` | `nonbrand clicks / (brand clicks + nonbrand clicks) * 100` on classified query rows. If the denominator is zero, use `NA_ZERO_DENOMINATOR`. | Query rows within one export | Weekly after usable query evidence exists | Data Owner | Same query omission boundary. |

Clicks, impressions, CTR, and position are descriptive search metrics. They do not establish user completion, eligibility, revenue, or a conversion.

### 6.1 Brand and nonbrand classification

Normalize query text with Unicode NFKC, lowercase, trim, and collapse internal whitespace. `brand` means the normalized query matches an approved token/phrase in the versioned lexicon. The initial draft lexicon is:

- exact token or phrase `visalang`;
- exact phrase `visa lang`;
- host token `visalang.org`.

Use token/phrase boundaries so a longer unrelated word does not match. Approved misspellings can be added only through a dictionary version change. A present query that does not match is `nonbrand`. A missing, suppressed, or privacy-filtered query is `unclassified`, never nonbrand. The report records the lexicon version and counts/impressions excluded as unclassified. The Data Owner must approve the draft lexicon before the shares are used.

## 7. Indexing, health, trust, and source metrics

These are separate evidence families. Their dates and environments must stay visible.

| Metric | Source | Definition and formula | Grain / time | Update | Owner | Limitations |
| --- | --- | --- | --- | --- | --- | --- |
| `platform_index_coverage` | Search Console Page Indexing snapshot | `platform indexed URLs / (platform indexed URLs + platform not-indexed URLs) * 100`, using counts from the same property and snapshot. Also report both counts. If the denominator is zero, use `NA_ZERO_DENOMINATOR`. | Property at `checked_at` | Weekly | Data Owner | Platform-discovered URLs can differ from the repository/sitemap set. Do not label this the percentage of intended routes. |
| `expected_indexable_coverage` | Versioned route map plus URL-level indexing evidence | `confirmed indexed expected-indexable canonical URLs / expected-indexable canonical URLs checked * 100`. Report `checked / total eligible` beside it. If zero expected-indexable URLs were checked, use `NA_ZERO_DENOMINATOR`; if the checked set itself is unavailable, use `NA_NO_URL_LEVEL_EVIDENCE`. | Route cohort and snapshot | Weekly when URL-level evidence exists | Data Owner | If only a sample is checked, label it sample coverage. If no URL-level evidence exists, use `NA_NO_URL_LEVEL_EVIDENCE`. |
| `indexing_anomalies` | Search Console snapshot reconciled to route map | Count distinct canonical URLs where expected and observed states conflict; keep category and redacted samples. | URL and snapshot | Weekly | Data Owner | A single snapshot does not justify bulk canonical, robots, or route changes. |
| `unexpected_404_urls` | Dated crawl, launch check, or production HTTP manifest | Count distinct URLs expected to resolve that returned HTTP 404. Record `URLs checked` and manifest. | Environment and point in time | Weekly | Programme Owner; technical support: Implementer | This is checked-set coverage, not the number of user encounters. Expected 404 controls are excluded and documented. |
| `unexpected_5xx_urls` | Same health manifest | Count distinct expected URLs returning HTTP 500–599. Record `URLs checked` and manifest. | Environment and point in time | Weekly | Programme Owner; technical support: Implementer | A clean sample is not proof of all production traffic. Redirects and network failures are separate states. |
| `broken_internal_links` | Dated link/launch check | Count distinct source URL + target URL pairs that fail the approved link rule. | Environment and point in time | Weekly | Programme Owner | State crawler scope and whether fragments/external links were checked. |
| `route_path_check_pass_rate` | Dated synthetic route-path manifest | `passed approved path checks / attempted approved path checks * 100`; if attempted is zero use `NA_ZERO_DENOMINATOR`. Also report passed/attempted and each failed check ID. | Route cohort, environment, and point in time | Weekly on the fixed manifest | Programme Owner; technical support: Implementer | Shows only that the checked hub-to-next-step/official-source/tool paths worked in that environment. It is not visitor use or completion. Never retain tool input. |
| `lab_performance` | Reproducible Lighthouse or equivalent lab run | Report tool performance score, LCP ms, CLS, and TBT ms separately. If three identical runs exist, use the median for each metric; otherwise label the single run. | Page, device profile, build/production, run time | Weekly on fixed sampled routes or after relevant change | Programme Owner; technical support: Implementer | Lab data is not field user experience. Do not use TBT as measured INP. Record tool/version, hardware, network, page, and run count. No pass threshold exists until approved. |
| `correction_reports_received` | Controlled correction register | Count distinct non-personal report IDs with `received_at` in the window. | Site and 7-day window | Weekly | Content Authority Owner | If no approved intake/register exists, value is `NA_CAPABILITY_CLOSED`, not zero. Do not report email content. |
| `correction_reports_open` | Controlled correction register | Count distinct report IDs open at the cutoff. | Site at cutoff | Weekly | Content Authority Owner | Status definitions must be stable. |
| `correction_response_time` | Controlled correction register | Median of `first_substantive_action_at - received_at` for reports first acted on in the window; report sample size. | Site and window | Weekly when sample exists | Content Authority Owner | No sample is `NA_NO_SAMPLE`; do not invent an SLA. |
| `correction_close_time` | Controlled correction register | Median of `closed_at - received_at` for reports closed in the window; report sample size. | Site and window | Weekly when sample exists | Content Authority Owner | Closed cases can have survivorship bias. |
| `source_due_pages` | Versioned source-review register | Count distinct high-risk page slugs with at least one open review record whose `nextReviewAt <= report cutoff`. Report underlying record count separately. | Route cohort at cutoff | Weekly | Content Authority Owner | A due source does not automatically refresh page dates, change indexability, or prove the claim wrong. Missing `nextReviewAt` is a data-quality issue, not excluded. |

Do not combine local/build checks with production checks in one value. Do not call a repository sitemap state a Search Console state. Each row in the weekly report records its environment and evidence ID.

## 8. Comparison calculations and missing data

### 8.1 Metric-specific comparison

For counts with complete matched data:

- `absolute_delta = current - prior`.
- `percent_change = (current - prior) / prior * 100` only when `prior > 0`.
- If `prior = 0` and `current > 0`, show `NEW_FROM_ZERO`; percentage is `NA_ZERO_DENOMINATOR`.
- If both are observed zero, show `NO_CHANGE_ZERO`; percentage remains `NA_ZERO_DENOMINATOR`.

For rates such as CTR and coverage, use percentage-point change: `current_rate - prior_rate`. Do not present that as percent growth. For average position, use `current - prior`; a negative delta is an improvement. Do not compute position percent change. Top-item changes are descriptive (`entered`, `left`, `rank_changed`) and must not be converted into a growth rate.

WoW uses `current_7d` versus `prior_7d`. The 28-day comparison uses `current_28d` versus `prior_28d`. Point-in-time metrics use the current snapshot versus the previous comparable snapshot and display both check times.

### 8.2 Availability states

A blank cell is invalid. Use one of these states:

| State | Meaning |
| --- | --- |
| `0` | A complete, in-scope observation found zero. |
| `NA_NOT_AUTHORIZED` | Required owner/account access was not authorised. |
| `NA_NOT_CONNECTED` | The source is not configured or its existence is unverified. |
| `NA_DELAYED` | The fixed platform window is not complete. |
| `NA_NOT_RUN` | A planned export or health check was not executed. |
| `NA_ZERO_DENOMINATOR` | A ratio or rate is undefined because its observed denominator is zero. Preserve the observed numerator and denominator beside the state. |
| `NA_NO_SAMPLE` | A non-ratio summary needs observations and there are none. |
| `NA_NO_URL_LEVEL_EVIDENCE` | Index-rate denominator or URL match is unavailable. |
| `NA_CAPABILITY_CLOSED` | The related operational capability is closed for planning. |
| `NA_PRIVACY_SUPPRESSED` | Reporting would expose or risk personal data. |
| `NA_NOT_APPLICABLE` | Metric does not apply; include the reason. |
| `INCOMPARABLE` | Definitions, filters, scope, or evidence changed. |

Never coerce an `NA` state to zero. Never carry the previous value forward. Every non-value has `missing_reason`, owner, and next verification action in the weekly report.

### 8.3 Platform delay and revision

Record Search Console `exported_at`, the platform's latest available date, and the accepted `last_complete_date`. Exclude fresh/partial days from comparisons. When the fixed end date is delayed, report `NA_DELAYED` for the whole matched search block rather than mixing dates. If a later export changes a frozen value, preserve the original, add a revision note, and use the corrected value prospectively only as approved. Do not choose a cutoff after viewing whether the result improved.

Query-table privacy filtering, export row limits, Search Console processing changes, and indexing-report lag must appear in the limitations field. These are not evidence of a traffic or indexing change by themselves.

## 9. Privacy, access, and retention boundary

The reporting system is aggregate and data-minimised.

- Do not collect or report passport numbers, immigration documents, payment data, private cases, names, email content, IP addresses, cookies, device/user identifiers, or tool inputs.
- Keep raw query exports in an owner-approved controlled location because queries can contain personal text. The repository receives screened aggregates and durable evidence pointers only.
- Do not paste Analytics, AdSense, or CMP account screens, identifiers, or network captures into this report. Link to a controlled evidence index with a redacted summary.
- Access is least privilege and read-only for extraction. This dictionary does not authorise account login, configuration, sitemap submission, script changes, or production action.
- The Business/Data/Privacy Owner must approve access, retention period, deletion method, and evidence location before restricted raw data is stored. Until then, do not acquire it.
- Checks of route paths or tools record only synthetic test cases and pass/fail results. They never record a visitor's input.

## 10. Separate capability states

The weekly template keeps these entries independent:

| Capability | Default decision state | Default evidence state | Permitted default conclusion | Required before change |
| --- | --- | --- | --- | --- |
| Analytics | `CLOSED_FOR_PLANNING` | `UNVERIFIED` | No Analytics metric or user-behaviour conclusion is available. | Separate Business Owner decision covering purpose, minimisation, access, retention, policy impact, production evidence, and closure method. |
| AdSense | `CLOSED_FOR_PLANNING` | `UNVERIFIED` | Do not expand or infer revenue/ad readiness. This does not assert that existing source or production requests are absent. | Separate Business + Ads/Consent Owner decision and evidence for account role, source scope, Auto Ads/exclusions, production requests, experience, and rollback. |
| Google Privacy & messaging CMP | `CLOSED_FOR_PLANNING` | `UNVERIFIED` | No region-wide consent-path claim is available. | Separate Ads/Consent Owner evidence for account state, tested region/browser, consent, reject, manage/reopen paths, network behaviour, and fallback. |

One capability's evidence never verifies another. A CMP is not Analytics. Analytics approval is not ad approval. An AdSense source reference is not proof of account or consent behaviour.

## 11. Weekly decision rules

The report converts evidence into at most five actions:

- no more than three content/source actions;
- no more than two operations/technical actions.

Each action needs a phase, route cohort, evidence ID, permitted conclusion, owner, due date, completion test, and stop condition. A missing owner, missing gate, missing evidence, privacy risk, platform delay, or incomparable window produces a verification or maintenance action, not a growth claim.

The default decision is to remain in the current phase. Phase 1 needs four consecutive reports under the same approved definition. Missing a week or changing a material definition restarts the valid sequence unless the Data Owner documents a reproducible backfill and Business Owner accepts it. No weekly report by itself authorises content publication, route expansion, commercial activation, commit, push, deployment, or account action.

## 12. Report preparation quality check

Before a dated review is accepted, verify:

- [ ] Approved dictionary and route-map versions are pinned.
- [ ] Property, search type, filters, dimensions, dates, time zone, extraction time, and last complete date are present.
- [ ] Every value or missing state links to raw evidence or a named check.
- [ ] Dimension exports were not added together or joined into invented page-query pairs.
- [ ] CTR is ratio-of-sums and position is platform aggregate or impression weighted.
- [ ] Current/prior windows are exact and comparable; rate changes use percentage points.
- [ ] Brand lexicon, route mapping, and indexability mapping match the pinned versions.
- [ ] Local, build, platform, and production evidence remain separate.
- [ ] Query labels are screened; no personal query, email content, or tool input appears.
- [ ] Analytics, AdSense, and CMP have three separate fail-closed status entries.
- [ ] Week 1 contains no unsupported growth target.
- [ ] Decisions do not exceed three content/source and two operations/technical actions.
