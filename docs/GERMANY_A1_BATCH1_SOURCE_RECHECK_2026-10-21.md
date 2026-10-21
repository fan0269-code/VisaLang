# Germany A1 batch 1 source recheck — 2026-10-21

Checked: 2026-10-21 (Asia/Shanghai)  
Branch intent: `chore/germany-a1-batch1-source-recheck`  
Scope: EN P0 `goethe-a1-vs-telc-a1`, `german-a1-documents-checklist`, `german-a1-exam-booking-timeline`, `goethe-a1-fees-by-country`, `goethe-a1-test-centers`, `goethe-a1-retake-policy`, `goethe-a1-germany-family-reunion`; ZH counterparts for vs-telc / documents / timeline / test-centers / germany-family-reunion (claim sync only; no Chinese date refresh).  
Disposition summary: **no public-content change**; refresh EN `sourceReviewedAt` to the actual open-check date; keep existing `updatedDate`.

## Network / access notes

| Source family | Live open from executor | Notes |
| --- | --- | --- |
| Federal Foreign Office (`auswaertiges-amt.de`) | Yes (WebFetch / curl) | Language-proof FAQ and Visas for Germany overview opened. |
| Goethe-Institut (`goethe.de`) | Yes (WebFetch) | Examinations overview, A1 results, Germany FAQ, Beijing registration/prices, Germany price table opened. |
| telc (`telc.net`) | Yes (WebFetch) | Centre finder and Start Deutsch 1 / telc Deutsch A1 product page opened. |
| BAMF (`bamf.de`) | **Blocked** (WebFetch 504; curl/Python SSL EOF) | Claims corroborated via search-indexed official BAMF English leaflet text and Infothek listing for the same Ehegattennachzug language-proof flyer. Not treated as a substitute for mission-level acceptance. |
| German mission China (`china.diplo.de`) | Yes (curl) | ZH vs-telc mission orientation link still resolves. |

## Claim ledger (high-risk)

| Slug | Claim | Deciding authority | Official source opened | Permitted support | Boundary / reader action | Disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `goethe-a1-vs-telc-a1` | Acceptance of a certificate is decided by the responsible mission/authority, not by provider brand or price. | Responsible German mission or competent immigration authority | [AA language-proof FAQ](https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682) | Directs spouses to BAMF and missions for further detail; confirms basic German may be required before entry. | Does not decide the reader's case or interchangeable A1 labels. Ask the mission which exact proof is accepted. | retain; `sourceReviewedAt` → 2026-10-21 |
| `goethe-a1-vs-telc-a1` | Adult Goethe product to compare is **Goethe-Zertifikat A1: Start Deutsch 1**; telc has multiple A1 products so the exact local product must be identified. | Goethe / telc for product identity; mission for acceptance | [Goethe examinations](https://www.goethe.de/en/spr/prf.html); [telc Start Deutsch 1](https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/); [telc centre finder](https://www.telc.net/en/language-examinations/find-a-telc-examination-centre/) | Goethe still lists Start Deutsch 1 (adults) and Fit in Deutsch 1 (youth); telc product page still names Start Deutsch 1 / telc Deutsch A1 as a full (non-partial) A1 exam. | Product identity ≠ visa acceptance. Obtain local centre terms before paying. | retain |
| `german-a1-documents-checklist` | Booking / test-day documents are centre-controlled; visa-file documents are mission-controlled. | Selected centre + responsible mission | AA FAQ (above); [Goethe examinations](https://www.goethe.de/en/spr/prf.html); BAMF family reunification node (live blocked; Infothek/search corroboration of national orientation) | Separates three document moments; no universal ID or mission checklist. | Reader must open the selected centre list and the responsible mission checklist. | retain; `sourceReviewedAt` → 2026-10-21 |
| `german-a1-exam-booking-timeline` | Timeline may use only reader-entered or currently confirmed centre/mission dates; unknown stays unknown. | Selected centre (exam timing) + mission (document deadline) | AA FAQ; Goethe examinations overview | Supports evidence-planning sequence only. | No invented waiting times, result periods, or seat availability. | retain; `sourceReviewedAt` → 2026-10-21 |
| `goethe-a1-fees-by-country` | There is no single global Goethe A1 fee; usable fee is the selected centre's current listing for the exact product/date. | Selected official or authorised centre | [Goethe examinations](https://www.goethe.de/en/spr/prf.html); [Beijing 2026 prices/registration](https://www.goethe.de/ins/cn/zh/spr/prf/anm.html); [Germany price table](https://www.goethe.de/ins/de/zh/prf/pre.html) | First-party local tables still differ (e.g. Beijing learner categories vs Germany adult A1 fee). | Do not copy one location's price to another booking. | retain; `sourceReviewedAt` → 2026-10-21 |
| `goethe-a1-test-centers` | Official centre means Goethe-Institut/exam partner via Goethe route, or telc centre via telc finder; courses are not automatically exam centres. | Exam owner + selected centre | Goethe examinations; Beijing registration page; telc finder | Supports verification sequence and Beijing-only bounded example. | Centre confirmation ≠ visa acceptance. | retain; `sourceReviewedAt` → 2026-10-21 |
| `goethe-a1-retake-policy` | Provider-level rule: examination as a whole may be retaken as often as needed; local seat/fee/route and partial A1 retake must be verified locally. A1 pass context remains whole-exam (≥60 points and all sections). | Goethe for exam-level result context; selected centre for next attempt | [Germany exams FAQ](https://www.goethe.de/ins/de/en/prf/ogf.html); [A1 results](https://www.goethe.de/en/spr/prf/pes/pas1.html) | FAQ restates whole-exam retake; results page still uses 60-point whole-exam pass and rating bands. | No universal next-seat promise; A1 is not treated as modular partial retake. | retain; `sourceReviewedAt` → 2026-10-21 |
| `goethe-a1-germany-family-reunion` | Goethe A1 can be a useful exam route, but route need and accepted proof are decided by the competent mission/foreigners authority; Goethe lists Start Deutsch 1 as adult A1 and describes it as language proof for spousal reunification without replacing mission confirmation. | Competent mission + foreigners authority; Goethe for product identity | Goethe examinations; [AA Visas for Germany](https://www.auswaertiges-amt.de/en/visa-service/215870-215870); BAMF Ehegattennachzug English leaflet (live blocked; search-indexed official text names Start Deutsch 1 of Goethe or telc among ALTE certificates and states the mission decides recognition) | Separates product orientation from case acceptance. | Reader must save the mission's current instruction before booking. | retain; `sourceReviewedAt` → 2026-10-21 |

## Chinese counterparts

| ZH slug | Action |
| --- | --- |
| `goethe-a1-vs-telc-a1` | Authority boundaries and telc product / china.diplo.de links still valid; **no claim edit**; keep `sourceReviewedAt` / `updatedDate` 2026-07-19 (FAN-42: EN date-only / no Chinese force-refresh). |
| `german-a1-documents-checklist` | Same; no edit. |
| `german-a1-exam-booking-timeline` | Same; no edit. |
| `goethe-a1-test-centers` | Same; no edit. |
| `goethe-a1-germany-family-reunion` | Same; no edit. |
| `src/data/zh-germany-a1.ts` | Unchanged dates and authority fields for the five batch-1 ZH records. |

## Front-matter date rule applied

- `updatedDate`: **unchanged** on all seven EN pages (no substantive public-content edit).  
- `sourceReviewedAt`: **2026-10-21** on all seven EN pages (real opens of AA / Goethe / telc; BAMF documented as live-blocked with official-leaflet corroboration).  
- ZH: unchanged.

## Test / verification expectation

Same PR updates `tests/germany-a1-cluster.test.js` and `tests/content-integrity.test.js` so EN `sourceReviewedAt` expectations for this batch are `2026-10-21` while `updatedDate` remains on the prior substantive dates. ZH eight-record `2026-07-19` locks remain.
