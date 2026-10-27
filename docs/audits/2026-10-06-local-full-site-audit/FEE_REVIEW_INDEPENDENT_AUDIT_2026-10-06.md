# Independent Fee Review — 2026-10-06

## Verdict

**Scoped implementation review: clean. Overall verdict: BLOCKED.** I found no P0/P1/P2 issue in the fee metadata and test changes. The required exact current-window planning-map freeze and visual evidence are missing, so this review cannot issue `PASS`.

## Baseline and frozen scope

- Reviewer: `visalang-independent-auditor`, independent and read-only.
- Branch/HEAD: `codex/scheme-3-one-week-content` / `4cb57e8744c752fed1881281e69e7b24cc7281c4`; upstream was reported at 0 ahead / 0 behind. Existing unrelated dirty and untracked work is preserved.
- Reviewed candidate paths:
  - `src/pages/tools/index.astro`
  - `tests/site.test.js`
  - `src/data/claim-registry.ts`
  - `tests/claim-registry.test.mjs`
  - `tests/m2a-local-fees-centres.test.mjs`
  - factual and verification summary in `docs/audits/2026-10-06-local-full-site-audit/AUDIT_REPORT.md`
- The fee-review baseline manifest records SHA-256 `b4f28f4dd03b295f48303fac4652af4213c67963b485b9414809fa87664cd3dc`. Its pre-edit hashes are `20470769f472a85fded1e634d335f375a3963d8501225882d36e08a98202b4b0` for the claim registry, `d123930896c5d791ceb5d4147e84f8bbb5b4683dfd4273bab52126e396e554ec` for the claim-registry test, and `ebc4ee0a9e975fda961a073421600843dbee413b33246204b2defe13adf7e4bd` for the local-fees test.
- Current supplied result hashes match the inspected files: `claim-registry.ts` `4afca2a689801ee76d7855f47c081966fbfaa7636cd77b9db6857049b986d46f`; `claim-registry.test.mjs` `aff9052855fdb399a2e6c068a67613ea4af739cc4b7231cd8babbc4a02c7bb83`; `m2a-local-fees-centres.test.mjs` `7079d1d008e2edfe3642d76e53bae9f0d46673d29123b76933047ba7250f126d`.
- The earlier `tests/site.test.js` pre-edit hash was `4bce5115c3995c3d641c6eb1c4b7b961e1990e7795b1b7dec20f6feee9da3a37`; current candidate bytes are `961917e4ccaa75228df71b886e7fbc3de9fdd334fd91f07a08ba8024179d0982`. The existing sync binds the former, which explains the reported governance failure.

## Findings

**No scoped code or fee-data findings.** The fee changes are limited to the two Goethe A1 fee claims and four Germany/Beijing fee records: `sourceCheckedAt` is 2026-10-06 and `nextReviewAt` is 2026-11-06. The four amounts, currency, country/institute scope, category boundaries, source URLs, claim versions, and exam-centre routes remain as represented by their implementations. Test assertions check the six fee metadata records and preserve the 2026-09-09 exam-centre route check date. The tool hub and its added assertions were independently reviewed in the preceding scoped report; no new issue was found in those unchanged paths.

The current `AUDIT_REPORT.md` correctly states that the actual isolated `npm test` run passed the preceding product and fee assertions, then exited 1 at the stale `tests/site.test.js` byte binding. Its latest text also correctly distinguishes that immediate failure from the unresolved browser/perceptual evidence gate. The report states the 57/0/0 isolated `launch-check` result. These test results are submitter-provided and were not rerun by this read-only Auditor.

## Official-source check

Both primary pages were opened on 2026-10-06:

- [Goethe-Institut Germany exam fees](https://www.goethe.de/ins/de/en/prf/pre.html), “Exam fees 2026” adult A1 row and remarks: adult A1 is EUR 155; the page publishes a 20% course-participant discount and defines course participants by participation within six months before the exam. It states prices are per person excluding tax. This supports only the Germany price-page values and exact EUR 124 arithmetic; it does not determine partner-centre checkout, tax, availability, an individual discount decision, or immigration acceptance.
- [Goethe-Institut Beijing registration and prices](https://www.goethe.de/ins/cn/zh/spr/prf/anm.html), current-learner definition and 2026 price table: adult A1 is CNY 1,400 for the page-defined current-learner category and CNY 1,500 for non-current learners. The page describes its six-month/course-evidence rule and says adult examinees must be at least 16. This supports the Beijing page’s rows and local category definition only; it does not establish eligibility for a specific reader, another China location, availability, registration success, final charge, or immigration acceptance.

The claim and fee-source boundaries retain these geographic, category, checkout, seat, and immigration-acceptance limits. No registration or payment flow was checked.

## Governance and release state

The supplied complete `sync.json` SHA-256 is `0e2191b14c712e260441436267432a520943b3f3c6f49de542a376066b9fd688`. It is still `VL-PMAP-20261005-02` with `unresolved` drift; it predates this maintenance window, and its watched digest / `changedPaths` do not include the three fee-review paths. There is no current exact classified scope manifest, generated current-window Archify delivery, automated browser receipt/screenshots, or image-capable review. The old 2026-10-05 blocked visual record is not current evidence.

Therefore the code review is clean, but the whole maintenance window remains **BLOCKED**. Owner authorization: **pending**. Deployment status: **not_started**. No commit, push, deployment, or external action is authorized by this review.
