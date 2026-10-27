# T24 independent task review — 2026-09-13, initial submission

```yaml
agent: visalang-independent-auditor
reviewer_independent: true
baseline: codex/scheme-3-one-week-content@4cb57e8744c752fed1881281e69e7b24cc7281c4
scope: ten owned paths in t24-report.md, hashes below
agent_review_status: fail
overall_verdict: FAIL
review_kind: bounded_task_review_not_final_M4
findings:
  - severity: P2
    path: src/data/b1-route-paths.ts
    locator: B1RoutePath and b1RoutePaths
    evidence: Master Plan section 7.1, lines 415–430; implementation handoff integration item 3
    required_action: Bind the new statutory editorial facts to the shared T05 authoritative claim records with versions, applicability scope, actual check date, review due date, status and usedBy, and reference those records from the new route model and affected articles; verify missing, mismatched or non-current references cannot silently retain a currently verified presentation. Preserve the static informational nature of these headings. Alternatively supply a locatable Owner-approved deviation; Auditor cannot create one.
  - severity: P2
    path: src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md
    locator: Source boundaries and recheck, line 128
    evidence: T24 source ledger Method says BAMF pages returned 403 and only IntV was verified for these claims.
    required_action: Align the retained attribution that BAMF material supports test structure/certificate context with the actual reviewed IntV source, or supply an actual review of the attributed BAMF content. Keep the BAMF link clearly an owner starting point if unreviewed.
owner_authorization: pending
deployment_status: not_started
planning_drift_status: not_applicable
```

## Independence and scope

I did not implement, plan, draft, source-research for drafting, or test-fix this scope. Source browsing below was solely independent verification of submitted claims. I read AGENTS.md, the Auditor specification, T24 brief, Master Plan C09 and sections 7.1–7.3, all ten owned files and the completed implementation handoff. The controller identifies this as incremental work over a captured dirty baseline and retains responsibility for freezing the final window scope. No final M4 or planning-map PASS is issued here. Owner authorization and deployment evidence are separate from Agent review.

## Spec and quality assessment

C09's reader-facing separation is implemented: five no-script legal-heading cards and five distinct checklist anchors preserve general settlement, skilled-worker settlement, Blue Card, citizenship and unknown. Language, knowledge and wider conditions are distinct. Unknown inputs never assign B1 or eligibility. The historical work slug is expressly limited to settlement. The timeline uses two independent tracks with blank confirmed inputs, and no invented periods. These are editorial results, not personal classifications or generic-tool support expansion.

Task spec compliance: FAIL while shared-authority integration is missing. Content/implementation quality: FAIL for the two scoped P2 issues; no P0/P1 identified. The actual statutory descriptions otherwise match the sources reviewed. The T05 gap is about traceability and maintenance of high-risk facts reused in the hub and guides, not a request to introduce an eligibility calculator or auto-expire a statute.

## Article-by-article review

- Hub/data/component: useful independent cards and direct destinations, correct decision-owner split, clear unknown branch. New data lacks T05 claim-reference/version/freshness contract (P2 above).
- Settlement guide: §9/§18c routes and §2 definitions correctly distinguished; no blanket work requirement or personal period. Berlin service is clearly local. Preserved scenarios and task aids remain coherent.
- Citizenship guide: §10 language/knowledge/wider-file split and special-rule boundary are supported; local Berlin headings are examples only. No excluded-title list is copied or acceptance promised.
- Knowledge guide: IntV correctly supports separate tests, B1 plus orientation-result success framework, and conditional naturalisation knowledge proof. No claim that every LiD result suffices. Remaining BAMF attribution conflicts with the submitted source-review limitation (P2 above).
- Checklist: five independent usable sections; different authority, records and next actions; unknown leaves all lanes unresolved. No claim of completed application or permission to submit.
- Timeline: settlement/citizenship tracks, reader-set buffers and evidence dependencies remain separate. It introduces no statutory duration, processing promise or inferred certificate date.

## Independent official-source evidence

Checked 2026-09-13. Sources were read for the narrow assertions above; none establishes an individual outcome.

- [Residence Act §9](https://www.gesetze-im-internet.de/aufenthg_2004/__9.html), paragraph 2: distinct language, knowledge and wider conditions.
- [Residence Act §18c](https://www.gesetze-im-internet.de/aufenthg_2004/__18c.html), paragraphs 1–2: sufficient/simple language, cross-referenced knowledge and different Blue Card period branches.
- [Residence Act §2](https://www.gesetze-im-internet.de/aufenthg_2004/__2.html), paragraphs 9/11: official search returned full relevant paragraphs after direct fetch timed out; A1/B1 definitions verified.
- [Consolidated Nationality Act](https://www.gesetze-im-internet.de/stag/BJNR005830913.html), §10(1),(4)–(6), §11: language, knowledge, special rules and wider conditions remain distinct.
- [IntV §17](https://www.gesetze-im-internet.de/intv/__17.html), paragraphs 1–2,4–5: separate DTZ/LiD, course success and conditional knowledge evidence.
- [Berlin settlement service](https://service.berlin.de/dienstleistung/121864/), language/knowledge headings and other service links: only the narrow local illustration reviewed.
- [Berlin naturalisation service](https://service.berlin.de/dienstleistung/318998/), language and knowledge document headings: local illustration, not copied eligibility lists.
- [Federal naturalisation process](https://www.einbuergerung.de/ablauf.php?l=en), step 2: city/district can identify responsible authority. No timing/fee/acceptance claims imported.

## Verification state

Independently ran `node tests/m4-b1-routes.test.mjs`: exit 0, expected existing typeless-module warning only. It exercises production resolver outputs and unknown inputs and verifies target anchors. Implementer's recorded RED precedes production additions. Built assertions, broad tests, browser evidence and final map evidence are controller-owned and pending this task-review record. Existing date-sensitive suites were reported for integration; no review PASS is inferred from this focused test.

## Reviewed bytes

```
b0abda9cba5c934ae56b4ba7965f350720a1dbec2c289a67fca111a4ab33aeb0  src/data/b1-route-paths.ts
c63d2255893b057d09e9b94b46e03018ade36d938f5d068619398cfe27b63b6a  src/components/B1RoutePaths.astro
e62aeeb7db7608585da985f544aaf3c80960771dccdcfb5dd92b0019dab479f0  src/pages/germany-b1-settlement-citizenship.astro
a23198f59a2d1c1c998f4efbdbe935b891127fdf7fe31d101ebbb2fddf0caa42  src/content/guides/goethe-b1-germany-settlement-work.md
387cb6f34eb2c81cc59381d3d6ecdcbdcd9db9806b6263ad571fb37217d59e9a  src/content/guides/germany-b1-citizenship-language-proof.md
fc8758ae6fed6d8218361ec597a02ec0634999108807b63e9f1aa170d1882724  src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md
55c84b313108c092bfd98400d4c7580025bf47c8f04f793f7382e835242eb81f  src/content/guides/germany-b1-settlement-citizenship-checklist.md
b0e1f996e5d4c69f8abb3fb39909dbc2a23856f2e662dda4910b2d2871c294c8  src/content/guides/germany-b1-settlement-citizenship-timeline.md
b297bb0718c09ed19ffd6809b99cc7c1b550208fc411436eb34e5791ff48016f  tests/m4-b1-routes.test.mjs
59818fc238210dc6c5c12062da20d6ee4b59feccf87f2c3c3a80948dc7e6e256  docs/VISALANG_M4_T24_SOURCE_LEDGER_2026-09-13.md
```

Re-review by this same Auditor is required after correction; final M4 freeze is a separate submission.

## Correction re-review — same Auditor, 2026-09-13

Both original P2 findings are **closed** on source inspection. Thirteen versioned records now live in `src/data/b1-route-claims.ts`, registered centrally with an import/spread, with statutory scope, real checked date, next review, version/status, source locators and consumers. The hub obtains its three evidence statements from validated claim records. All five guides reference versioned claims through existing GuideLayout validation. Missing, changed, withdrawn, overdue, locale-mismatched and unauthorized references produce unresolved output without B1 facts. These are build-time protections; already-generated HTML still requires a rebuild and is not a live legal monitor. Both lingering BAMF content attributions now name the verified IntV source.

Seven new tables render within named focusable regions using existing responsive styles; a real Markdown-render test verifies the wrappers. Current `node tests/m4-b1-routes.test.mjs` exits 0. Independently checking `node tests/claim-registry.test.mjs` exposed a date-fixture integration failure at line 31 (new 2026-09-13 claims expected to be 2026-09-08); controller notified. This is pending test integration, not evidence that the recorded source dates are wrong. Post-correction built/browser and broad evidence remain separate. Initial pre-correction 375px screenshot was visually inspected and shows the cramped table the wrappers address; it is not post-correction evidence.

Correction task spec and quality: no remaining production/content P0/P1/P2 found. Overall bounded task verdict remains pending required test integration and post-correction built evidence. The controller may distinguish later T25 registry additions from the following T24 snapshot:

```
c7319d122160ecc1453354ad95f379cebe7ee125bbf75587e72df21cfae73437  src/data/b1-route-claims.ts
1c6e68968a68f824d6ee705d08ef6e658f4e12f3bedc04820b4d59b40b9dd9ad  src/data/claim-registry.ts
23c9a523268ceb97388b84416483b1cf087703378b5607a94705682ab27a1efa  src/data/b1-route-paths.ts
c63d2255893b057d09e9b94b46e03018ade36d938f5d068619398cfe27b63b6a  src/components/B1RoutePaths.astro
e62aeeb7db7608585da985f544aaf3c80960771dccdcfb5dd92b0019dab479f0  src/pages/germany-b1-settlement-citizenship.astro
6fc726657c12516e547950f950262a6d9d5b2c535a07d3d5a3ab746c5a1d0854  src/content/guides/goethe-b1-germany-settlement-work.md
52d81cf520cff87b8ca5cf311eafd6f95fc697644783da49637f8b2b1430a387  src/content/guides/germany-b1-citizenship-language-proof.md
1e2698392139b65574684204ba9734d5c1b4e822c349e3e38ccb3943b136099f  src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md
f51908cb586262c2f37bcedff327ccff41f957a12f0efe3ebc5fe20274fa24ae  src/content/guides/germany-b1-settlement-citizenship-checklist.md
58a5a93ad479d7ef6f87c945111d8e11d7e862b2a1b8e7498c3cd8a97847bbac  src/content/guides/germany-b1-settlement-citizenship-timeline.md
7788492cd26e7a6c04006681e096da57d982fb8e054eecca90dd2247fb33e7b7  tests/m4-b1-routes.test.mjs
2411ea2e036b1c761bfb4d25a740bd560b00aa2263088b6cfef5724ec44f8e22  docs/VISALANG_M4_T24_SOURCE_LEDGER_2026-09-13.md
```

## Final bounded T24 re-review verdict — 2026-09-13

```yaml
agent: visalang-independent-auditor
reviewer_independent: true
review_kind: bounded_T24_task_review
agent_review_status: pass
overall_verdict: PASS
findings: []
owner_authorization: pending
deployment_status: not_started
planning_drift_status: not_applicable
final_M4_review: pending
```

**Task-spec compliance: PASS. Quality: PASS.** This is the latest bounded T24 verdict and supersedes the initial FAIL and the correction-round pending state above. Both scoped P2 findings were corrected by the implementer and re-reviewed by the same independent Auditor. No scoped P0/P1/P2 remains.

Read actual controller logs `t24-claim-registry-green.log`, `t24-corrected-built-test.log` and `t24-corrected-build.log`: registry contracts passed, built T24 assertions passed, and Astro completed 88 pages. Existing module-type warnings do not indicate test failure. Inspected the date-fixture changes: explicit T24 membership receives its actual 2026-09-13 date; A1 duplicate/history fixtures target their named general claim rather than an unstable first array element, preserving the expected outcomes. Inspected the new table exclusion: only pre-existing `source-fact-table` ancestors are excluded from the exact seven new T24 table count; new T24 wrappers remain asserted for role, accessible label and keyboard focus.

The controller preserved T24 central-registry bytes at `/private/tmp/visalang-m4-20260913/t24-corrected-claim-registry.ts`. SHA-256 matches the earlier correction snapshot `1c6e68968a68f824d6ee705d08ef6e658f4e12f3bedc04820b4d59b40b9dd9ad`. Subsequent T25 registry changes are not covered by this task result and require the later integrated audit.

Additional final corrected test hashes:

```
4142e90fc6dc93ea47a2d33b5d364744bd8de66bdab0f75c3d56311b3da51846  tests/claim-registry.test.mjs
9e7ac94647df4ab76ad541b44bb4a36d9e0461b5ef87610b7ffd62f59fe6f808  tests/m4-b1-routes.test.mjs
```

The code/content hashes in the correction snapshot identify the reviewed production scope. Final window scope, broad tests, corrected screenshot evidence, map sync, drift and artifact bindings remain for the final M4 submission. This bounded PASS is not final M4 completion, publication approval, or deployment evidence. Owner authorization and deployment evidence are separate from Agent review.
