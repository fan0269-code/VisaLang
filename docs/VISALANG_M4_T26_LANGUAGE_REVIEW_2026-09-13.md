# T26 integrated independent language/content review — 2026-09-13

```yaml
agent: visalang-independent-auditor
reviewer_independent: true
baseline: codex/scheme-3-one-week-content@4cb57e8744c752fed1881281e69e7b24cc7281c4
review_kind: integrated_editorial_language_and_content
scope:
  - src/content/guides/goethe-b1-study-plan.md
  - tests/m4-study-assets.test.mjs
  - docs/VISALANG_M4_T26_SOURCE_LEDGER_2026-09-13.md
agent_review_status: pass
overall_verdict: PASS
findings: []
owner_authorization: pending
deployment_status: not_started
planning_drift_status: not_applicable
final_T26_task_completion: pending_T25_and_final_verification
final_M4_review: pending
```

## Independence and reviewed bytes

This separate AI Auditor did not write, edit, plan, source-research for drafting, or fix the reviewed implementation. It previously reviewed the original temporary draft, then independently read the integrated guide, source ledger and production-parser regression. This is a real AI editorial language/content review. It is not a qualified human teacher review, licensed assessor review, Goethe endorsement, official score, CEFR certification or judgement of a learner's spoken performance. Owner authorization and deployment evidence are separate from Agent review.

SHA-256 bindings:

```
ee05a3b4bfb0f9b8441fef05cf470c5cefc08d741a9e828a5186040b2659a371  src/content/guides/goethe-b1-study-plan.md
2f55c786cc896e6c5f5bc555b13fe4e0a269d03851bf92de3f662901f59aff5f  tests/m4-study-assets.test.mjs
3ea9a54f59071c698e236a223543c19dad352a2ab14e387f20c424202ab16242  docs/VISALANG_M4_T26_SOURCE_LEDGER_2026-09-13.md
```

The four integrated German HTML blocks are byte-identical to the four blocks in original draft SHA-256 `57101aa4612f4dff0125e7fbad0fbbe2771381366a7126dd382118eca676f971`. I also re-read the surrounding integrated explanations, exercises and article; byte equality is supplementary evidence, not a substitute for review.

## Per-asset findings

| Asset | Assessment |
| --- | --- |
| Diagnosis/repair/retest | PASS. A filled illustrative listening row and reusable blank row connect observation, possible cause, repair, different-item retest and outcome evidence. The instructions cover all modules and clearly distinguish a short exercise from a full mock. The illustrated corrected-time error is not asserted to occur in a particular real official question. |
| Weekly record | PASS. Concrete session/evidence/completion fields and a recovery slot are usable personal examples. Review compares attempts and records a next adjustment; no hours-to-pass or score inference. |
| Initial writing | PASS as a deliberately incomplete response. Informal German is understandable; missing reason and usable alternative are accurately diagnosed. The short wording is not falsely labelled a grammar error. |
| Revised writing | PASS. Reason, day, time, location and confirmation/counterproposal request fulfil the stated original task. Informal register is consistent; weil, ob and wenn clauses have correct word order. The explanation of the weil clause matches the finite modal placement. |
| Writing transfer/self-check | PASS. A new arrangement, new details and reader comprehension check test transfer rather than copying. Task fulfilment, register and syntax are covered. |
| Initial speaking | PASS as a deliberately unfinished exchange. A ignores B's unavailable day; the diagnosis correctly identifies interaction failure rather than a grammatical failure. |
| Revised speaking | PASS. Counterproposal, acceptance, location change, time, materials and final confirmation are coherent and idiomatic. The host's phrase about bringing exercises is understandable in the shared-session context, though mildly less natural than a preparation expression; no P2 issue. The fictional library closure is labelled. |
| Speaking transfer/self-check | PASS. Role swap, removing the script and an unexpected constraint exercise response. The task explicitly cannot assess pronunciation, fluency or real listening from printed text. |
| Retained eight-week plan and surrounding guide | PASS. Product-specific preparation and local/receiving-authority roles remain separate. Eight weeks and session durations are editorial examples, not official requirements or proven readiness. No official exam tasks or assessment table are reproduced. |

Both skill examples contain initial response, problem, revision, reason, transfer and self-check. The language is grammatical, pedagogically useful and sufficient for this explicitly non-official exercise. No P0/P1/P2 found in the scoped editorial review.

## Independent source verification

Checked 2026-09-13 by browsing actual official pages, solely for review:

- [Goethe B1 further information](https://www.goethe.de/ins/de/en/prf/prf/gzb1/inf.html), module section: confirms the four skill modules. It does not validate VisaLang's eight-week schedule, learner outcome or acceptance for an application.
- [Goethe B1 practice materials](https://www.goethe.de/ins/de/en/prf/prf/gzb1/ueb.html), downloadable adult model-set entry: confirms the correct official starting point and separates adult and young-learner resources.
- [Official adult model set](https://www.goethe.de/pro/relaunch/prf/materialien/B1/b1_modellsatz_erwachsene.pdf), printed pages 42 and 46: confirms writing and speaking assessment sections exist at the ledger's locators. Imprint states revised January 2015; the ledger correctly distinguishes that publication date from today's link/source check. Linking these materials does not award scores to the original exercise.

## Actual verification and limits

Independently ran `node tests/m4-study-assets.test.mjs`: exit 0, existing module-type warning only. It invokes production `buildArticleSections` and verifies actual detailed-section HTML for worksheet fields, four language-tagged blocks, distinct revisions, transfer/self-check and explicit non-official boundaries. It does not mechanically assess German.

Visually inspected supplied `study-writing-375.png`, `study-worksheet-375.png` and `study-worksheet-1440.png`: writing text is legible; worksheet uses a visible focus region and horizontal-scroll instruction; desktop shows all six fields. Controller reports actual ArrowRight scrolling at 375px. A subsequent print-width check found a small table overflow; scoped CSS correction and rebuilt print verification are still pending and are outside this language verdict. This report does not claim print success or final visual verification of that CSS.

Editorial language/content spec compliance: **PASS**. Editorial quality: **PASS**. Full T26 completion still depends on T25 product review and final build/browser/print verification. Final M4 scope, map sync, drift, evidence hashes and independent release-candidate verdict require a separate frozen submission. This report neither closes those gates nor authorizes commit, push, deployment or publication.
