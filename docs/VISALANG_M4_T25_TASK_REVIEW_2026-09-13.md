# T25 Independent Task Review — 2026-09-13 (initial)

```yaml
agent: visalang-independent-auditor
reviewer_independent: true
baseline: codex/scheme-3-one-week-content@4cb57e8744c752fed1881281e69e7b24cc7281c4
agent_review_status: fail
overall_verdict: FAIL
findings:
  - severity: P2
    path: src/data/route-tools.ts
    locator: isCurrentComparisonProduct / compareExamProducts
    evidence: Independent mutation reproduction at asOf 2026-09-13 returned ready for both levels undefined and threw for localFee null or acceptance null.
    required_action: Validate supported nonempty levels and all render-consumed local boundary objects before options or ready output; return unsupported without rows for missing/malformed records and add regression coverage.
  - severity: P2
    path: src/pages/tools/exam-comparison.astro
    locator: same_product follow-up
    evidence: Existing same-product next action directs a B1 selection to the other adult A1 product; controller also identified this independently.
    required_action: Use a same-level product action in both languages and retain regression coverage.
owner_authorization: pending
deployment_status: not_started
planning_drift_status: not_applicable
final_M4_review: pending
```

I am the same separate read-only Auditor who reviewed T24 and T26, and did not implement, plan or source-research for drafting this scope. I read the T25 brief/report, ledger, production comparison data/model/component and both guides; source browsing below was independent verification. Owner authorization and deployment evidence are separate from Agent review.

## Spec and quality

Initial task-spec compliance and code quality: FAIL for the two P2 items. Official fact content otherwise verified: adult Goethe and exact adult Zertifikat Deutsch/telc Deutsch B1 are kept distinct from DTZ, youth and scaled products. Language/knowledge/immigration acceptance are not conflated. Local fee, seat, dates, document delivery and acceptance remain unanswered owner questions. The two worksheets are original and contain no fabricated prices. Review pending narrow-screen treatment of these new Markdown tables; their plain initial source does not yet provide the accessible wrappers used in T24/T26.

## Source evidence checked 2026-09-13

- [Goethe B1 administration terms](https://www.goethe.de/pro/relaunch/prf/en/Durchfuehrungsbestimmungen_B1.pdf), 2025-09-01 sections 1 and 6: confirms written timings, paired/exceptional solo oral timing, preparation and separate module threshold.
- [Goethe Exam Guidelines](https://www.goethe.de/pro/relaunch/prf/en/Pruefungsordnung.pdf), 14.7 and 15: module certificates, alternative same-session overall certificate, later consolidation conditions and individual resits. Wording preserves local administration boundaries.
- [Exact telc B1 product](https://www.telc.net/sprachpruefungen/deutsch/zertifikat-deutsch-telc-deutsch-b1/), format table: confirms written groupings/timing and three-part, normally paired speaking with preparation.
- [Adult telc 5061 model](https://shop.telc.net/media/catalog/product/file/2/0/20201225_5061-b00-010301_web.pdf), printed 39–40: written and oral maxima/thresholds match the candidate. The following older resit wording indeed differs from current rules.
- [Current telc regulations](https://www.telc.net/fileadmin/user_upload/pdfs/AGB_Pruefungsordnung/10000311_9994-P00-150011.pdf), section 7 and Appendix 1: confirms 12 months from first result sheet, no individual subtest resit, latest-result credit and registration notification; single-level B1 partial credit is permitted. Correctly given precedence over the old mock for resits.

## Actual verification

Independent malformed-record reproduction: both missing levels returned ready; missing localFee/acceptance threw TypeErrors. Existing model tests did not cover these fields. During the controller's same-product correction RED, independent focused test exited 1 on the A1-specific follow-up text. No final PASS is inferred from the earlier reported green run. Same Auditor will review corrections.

The initially supplied 16 paths are hashed below. Snapshot occurs during authorized correction work; final corrected hashes and final verdict must supersede it. No final planning-map or integrated M4 PASS is issued.

```
fce400c5992c6606d1c06edb97b50dbb099901c94cbb21084ea7e84fad3c0e4f  src/data/b1-exam-products.ts
20470769f472a85fded1e634d335f375a3963d8501225882d36e08a98202b4b0  src/data/claim-registry.ts
4e4cce1c37eb68d8e92fcaaefcc63681b250a055b247b888245de75d643e2fe3  src/data/route-tools.ts
e56bda773f98fccf69e69379de0b7344641466834678109e0c25afd215e5cca2  src/data/app-data.ts
5b9a60a5231807f09bef15ed8a2e898c54df1c0e9ef08688d64afcd178b4d237  src/components/ExamProductComparisonTable.astro
f2a62b080afc164f209b2da4ad44c5c91bce612dedcccdfae34044949877eafb  src/layouts/GuideLayout.astro
10c14d844eb8be7417a9e058d8715aa3f72c7bbad10dfac9c2f465fa375bfb64  src/pages/tools/exam-comparison.astro
05f91db8c3a2e777185f686c16203139c5f65f6316f162ce36a1d1763795dc97  src/data/tool-copy.ts
bfa9ac72f69f53d67a4dc8048de53f1f54739a4097297f46c41c2b7773c32031  src/pages/exams/index.astro
73041184f2e4b7402107ac70c5e5b0729648abe1e2e98206072486425dc5e03b  src/content/guides/goethe-b1-vs-telc-b1.md
a98bd7393d34b8d567f49f54e619f4716cba2c60af697f95c1918b415a14c7e0  src/content/guides/goethe-b1-fees-and-booking.md
3b5ab0a9899262db6217bbfda36ca41aa23fdbfefa425f81b5b3b35259a8871a  tests/m4-b1-comparison.test.mjs
a09abc5f8ec075b6e6fda92e92a0c1244240c4badab659e69419093c7f5f1dbb  tests/m2a-exam-products.test.mjs
50dcac1d4c8e2e57c9a7d8d27176653bb3ca15fd7ad2347db3e3274233bbab0b  tests/m2b-exam-comparison.test.mjs
4b3195f0c08e1bddb18da9c97488dff7db83e94085b5b58b7a35d01fa8ecdd9b  tests/m3-discovery-trust.test.mjs
201bb45d12ed20720acc3ac694587ed2796b9653d4fc4f4192c7164eebe97622  docs/VISALANG_M4_T25_SOURCE_LEDGER_2026-09-13.md
```

## Same-Auditor final bounded T25 re-review — 2026-09-13

```yaml
agent: visalang-independent-auditor
reviewer_independent: true
review_kind: bounded_T25_spec_content_code_quality
agent_review_status: pass
overall_verdict: PASS
findings: []
owner_authorization: pending
deployment_status: not_started
planning_drift_status: not_applicable
final_M4_review: pending
```

**Task-spec compliance: PASS. Content and code quality: PASS.** This is the latest bounded verdict and supersedes the initial FAIL above. Both scoped P2 findings are closed by the same Auditor after correction. No remaining scoped P0/P1/P2 found.

The comparator validates explicit supported levels and complete unresolved local-confirmation records before options or ready output. Missing/unsupported levels, null/incomplete localFee or acceptance and empty execution boundary now safely suppress output. Product/claim identity, dates, versions, consumer and same-level checks remain. Both language versions of same-product recovery now ask for another same-level adult product.

Re-read both final articles in full. The comparison adds distinct product-selection, responsibility and practice-observation assets plus two useful situations. The booking guide adds a quote worksheet, original enquiry, responsibilities and transaction recheck with two situations. These add concrete work for readers without fabricated product facts, prices or outcome claims. Exact core headings, three Original asset sections, two Scenario sections and canonical reading times are restored. Both new Markdown worksheets have visible horizontal-scroll instructions and named focusable responsive regions. Numeric product facts continue to be rendered from shared records; old-telc-source precedence remains correct.

Independently ran all four commands, each exit 0: `node tests/m4-b1-comparison.test.mjs`, `node tests/m2a-exam-products.test.mjs`, `node tests/m2b-exam-comparison.test.mjs`, and `node tests/scheme-3-english-content-quality.test.mjs`. Existing module-type warnings only. Independently byte-compared the A1 product block against the T24-corrected registry after removing only the appended B1 spread: identical. Focused regressions retain actual A1 values and exercise malformed and same-level B1 cases.

Production build, final rendered/browser checks, final shared-registry integration, print CSS, broad suite, map sync and complete frozen-window audit remain controller-owned final verification. This bounded source/spec/code review does not assert those future gates passed. Owner authorization and deployment evidence are separate from Agent review.

Final 16-path task scope SHA-256 (supersedes initial snapshot):

```
fce400c5992c6606d1c06edb97b50dbb099901c94cbb21084ea7e84fad3c0e4f  src/data/b1-exam-products.ts
20470769f472a85fded1e634d335f375a3963d8501225882d36e08a98202b4b0  src/data/claim-registry.ts
f2cba2823afd2fa0233c41728a94fd4ffd4d648cac5f5bde861f9160a72b4d39  src/data/route-tools.ts
e56bda773f98fccf69e69379de0b7344641466834678109e0c25afd215e5cca2  src/data/app-data.ts
5b9a60a5231807f09bef15ed8a2e898c54df1c0e9ef08688d64afcd178b4d237  src/components/ExamProductComparisonTable.astro
f2a62b080afc164f209b2da4ad44c5c91bce612dedcccdfae34044949877eafb  src/layouts/GuideLayout.astro
10c14d844eb8be7417a9e058d8715aa3f72c7bbad10dfac9c2f465fa375bfb64  src/pages/tools/exam-comparison.astro
05f91db8c3a2e777185f686c16203139c5f65f6316f162ce36a1d1763795dc97  src/data/tool-copy.ts
bfa9ac72f69f53d67a4dc8048de53f1f54739a4097297f46c41c2b7773c32031  src/pages/exams/index.astro
4d34ccb68e8912d9e5451a6e55e46febe110a84f8cd34cc0a486c34861a7f8f3  src/content/guides/goethe-b1-vs-telc-b1.md
0226fc76de6b057884848b29271acf5a2d7efb086f168688a9dfcfcb83336836  src/content/guides/goethe-b1-fees-and-booking.md
258595640582e89c9abb5cf8fcf4f5066c4e0d33bb255fd6b48b4356e303413d  tests/m4-b1-comparison.test.mjs
a09abc5f8ec075b6e6fda92e92a0c1244240c4badab659e69419093c7f5f1dbb  tests/m2a-exam-products.test.mjs
50dcac1d4c8e2e57c9a7d8d27176653bb3ca15fd7ad2347db3e3274233bbab0b  tests/m2b-exam-comparison.test.mjs
4b3195f0c08e1bddb18da9c97488dff7db83e94085b5b58b7a35d01fa8ecdd9b  tests/m3-discovery-trust.test.mjs
e2e18d9da33f1e89362c7348f5a95bf984bdaf47864721501e6487bbba22e4d3  docs/VISALANG_M4_T25_SOURCE_LEDGER_2026-09-13.md
```
