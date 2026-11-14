# VisaLang AdSense substantive remediation — URL evidence

Date: 2026-11-14. This file records what changed in this pull request. It is not a production retest and not an advertising approval. Live HTTPS notes are the current production site. Preview and `dist/` notes are this branch.

Source reads are the 2026-11-14 audit snapshots named below. A blocked source was narrowed, not filled in.

## V-LEGAL

| URL | Original locator | Actual change | Source read and limit | Structure | Result |
| --- | --- | --- | --- | --- | --- |
| `/germany-b1-settlement-citizenship/` | Quick answer treated the 30 June 2025 English BAMF page as a current three-year option | Hub now follows StAG §10 (1) five years, marks (3) and (3a) weggefallen, says BGBl. 2025 I No. 256 deletes subsection 3 only, and labels the English page as a conflict not to choose. Difficulty card removed. | `sources/7a72a1c9f423df6c.txt` §10; `sources/20de515979e47db6.txt` lines 15–21 and 77–80; `sources/4441f22b946835fc.txt` German overview; English page is conflict only | Canonical unchanged. No Chinese B1. Route Review link is no longer a decision step | In this PR only |
| `/guides/germany-b1-citizenship-language-proof/` | “after three years where the special integration… Only the nationality authority can say whether that sentence is yours.” Decision step 2 offered that path | That choice and the avoidance sentence are gone. Other provisions stay with the authority | Same StAG, BGBl, German BAMF, English BAMF limit as the hub | Self-canonical guide | In this PR only |
| `/content-update-log/` | 2026-11-11 entry used the 30 June 2025 English page as the residence anchor | Old entry kept. New 2026-11-14 entry states the statute wins, the English page is historical, and the work is not deployed | Same legal snapshots | Indexed log, ads off | In this PR only |
| `/guides/germany-b1-leben-in-deutschland-and-language-proof/` | Called the 30 June 2025 English page the newer residence description | Residence anchor is the current statute and the German overview. 15/33 and 17/33 stay tied to orientation vs naturalisation knowledge | `sources/c108be7afe1491aa.txt` lines 69–73; StAG snapshot | Guide remains a separate language/knowledge page | In this PR only |
| `/guides/goethe-b1-vs-telc-b1/` | “special integration may make naturalisation possible after three years” | That sentence is now an explicit “do not choose” conflict. Product comparison remains | StAG, BGBl, final-exam page for 15/33 and 17/33; telc B1 and B1 rules not used to swap modules | Guide | In this PR only |
| `/guides/germany-b1-settlement-citizenship-timeline/` | Source list offered three years where special integration is shown | Timeline does not calculate residence and does not offer that option. Goethe notice rules stay non-countdown facts | StAG and Exam Guidelines §§4.7, 13, 15 from `sources/ec79a5b1cf7f2847.txt` | Guide | In this PR only |
| `/guides/germany-b1-settlement-citizenship-checklist/` | Checkbox for the three-year special-integration possibility | Checkbox now records the five-year section 10 line and a separate row only if the authority names another provision | StAG and AufenthG §9 snapshot | Guide | In this PR only |

## V-A1

| URL | Original locator | Actual change | Source read and limit | Structure | Result |
| --- | --- | --- | --- | --- | --- |
| `/germany-family-reunion-a1/` | Official-links guide was a step in the route list. Certificate age was not the certificate FAQ | Retired links slug removed from the route list. New “Which source owns the question” table. Age points at the certificate FAQ, not the spouse FAQ’s silence | BAMF leaflet boundary, A1 rules, telc A1 product page, certificate FAQ line 15 of `sources/9f6eb9fdef4802f2.txt` | hreflang to the Chinese hub unchanged. Practice boundary points at the study plan | In this PR only |
| `/guides/german-family-reunion-language-requirement/` | “The central Foreign Office FAQ still states no nationwide within one year rule.” | Replaced with the certificate FAQ’s in-der-Regel one-year guidance and oldest-passed-module rule, plus the spouse FAQ’s silence and §30’s limited scope | Certificate FAQ; spouse FAQ `sources/46b998f40cf30b87.txt` lines 2–4; §30 snapshot | Guide | In this PR only |
| `/guides/german-a1-family-reunion-faq/` | Heading “Does the certificate have to be less than a year old?” denied any central one-year rule | Answer now states the certificate FAQ rule, denies automatic expiry, and denies using the spouse FAQ’s silence as a contradiction | Same two AA snapshots and BAMF leaflet imprint 03/2023 | Guide, English only | In this PR only |
| `/zh/germany-family-reunion-a1/` | “BAMF 说明和外交部中央问答都没有写出全国统一的一年内。” | Chinese age paragraph now separates the certificate FAQ, the spouse FAQ, and the mission | Same AA snapshots | Chinese hub hreflang unchanged | In this PR only |
| `/guides/goethe-a1-germany-family-reunion/` | “The central Foreign Office FAQ does not state a one-year rule.” | Bullet now uses the certificate FAQ and the non-expiry limit | A1 rules `sources/0121eab6eecb0c0a.txt` §§1–2, 6–7; certificate FAQ | Guide | In this PR only |
| `/guides/goethe-a1-vs-telc-a1/` | Comparison table stopped at names | Added a format table: Goethe 65-minute written exam and 15-minute speaking group versus telc’s 45-minute reading/writing block and non-partial exam | A1 rules timings; telc product extract `sources/944c4806c12751f2.txt` lines 1–21. Not a ranking | Guide | In this PR only |
| `/guides/goethe-a1-test-centers/` | “Beijing page publishes its own current exam products, dates, prices, forms” | That sentence and the Beijing link-as-verified-list are removed. A regulation does not prove a centre is listed | Exam Guidelines local-fee rule. Beijing HTML not opened | Guide | In this PR only |
| `/guides/german-a1-exam-booking-timeline/` | Spouse FAQ cited to deny a one-year filing rule | Age guidance corrected. Added a labelled hypothetical dependency that stops when any date is unknown | Exam Guidelines §4.7 (about five days = clock time) and A1 14-day part gap | Guide | In this PR only |
| `/guides/german-a1-documents-checklist/` | “neither source creates a nationwide one-year rule” and “No one-year rule” on the spouse FAQ | telc validity and Goethe verify stay. Age now follows the certificate FAQ | Certificate FAQ; spouse FAQ | Guide. Next step is the study plan, not the retired links page | In this PR only |
| `/guides/goethe-a1-fees-by-country/` | “Official Goethe pages publish different local price tables for Germany and for the Beijing institute.” | Beijing prices and learner categories removed. Fee rule is Exam Guidelines §6.1 only | `sources/ec79a5b1cf7f2847.txt` §6.1. Beijing HTML not opened | Guide | In this PR only |
| `/guides/goethe-a1-retake-policy/` | Cited unread results HTML and “Common causes” | Retake is whole-exam only, centre may set the period, no pass rate, results HTML not cited | A1 rules §6.3 and §7; Exam Guidelines §15 | Guide | In this PR only |
| `/zh/guides/german-family-reunion-language-requirement/` | Spouse FAQ described as having no nationwide one-year rule | Chinese text now points age at the certificate FAQ and limits §30 | Same AA and §30 snapshots | hreflang to the English requirement page | In this PR only |
| `/zh/guides/goethe-a1-germany-family-reunion/` | “外交部中央问答也没有一年内的规则。” | Same age split, in Chinese reader order | Same | hreflang unchanged | In this PR only |
| `/zh/guides/goethe-a1-vs-telc-a1/` | Name table said product HTML was still 403 today | Timing rows added from the opened rules. Unopened HTML is not described as today’s 403 | A1 rules and telc product table | hreflang unchanged | In this PR only |
| `/zh/guides/german-a1-exam-booking-timeline/` | Regulation days without a labelled non-official example | Added a hypothetical 2026-12-18 that cannot be counted backwards while certificate and sitting are unknown | Exam Guidelines §4.7; A1 14-day rule | hreflang unchanged | In this PR only |
| `/zh/guides/german-a1-documents-checklist/` | “外交部中央问答里仍然没有这条年限。” | Certificate FAQ guidance added; spouse FAQ silence does not cancel it | Same AA snapshots | hreflang unchanged | In this PR only |
| `/zh/guides/goethe-a1-test-centers/` | Goethe centre HTML “仍未打开” without the Beijing price claim being narrowed | Beijing registration HTML is explicitly unread. A regulation is not a centre list | Exam Guidelines. Beijing HTML not opened | Authority URL moved off the unread Beijing page onto the Exam Guidelines PDF | In this PR only |

## V-MERGE

| URL | Original locator | Actual change | Source | Structure | Result |
| --- | --- | --- | --- | --- | --- |
| `/guides/goethe-a1-pre-booking-checklist/` | Stop-before-pay list without the paid branch | Rewritten as a who/quote/date/stop table plus an after-payment branch. Visa papers link out | Exam Guidelines §§4.7, 6, 13–15. No refund promised | Surviving page. hreflang to `/zh/guides/goethe-a1-booking-mistakes/` | In this PR only |
| `/guides/goethe-a1-official-links-practice-resources/` | Question-to-source table lived only here | Table moved to the A1 hub `#source-duties`. Practice boundary moved to the study plan. File removed | Same A1 and exam-rule limits | 301 to `/germany-family-reunion-a1/` including the `.html` form, before the generic slug rule | Redirect in this PR; production still 200 until deploy |
| `/guides/goethe-a1-booking-mistakes/` | “Most booking problems” and a separate paid section | Paid branch moved. Frequency claim not kept. File removed | Exam Guidelines local terms | 301 to the pre-booking checklist. Chinese page does not redirect | Redirect in this PR |
| `/zh/guides/goethe-a1-booking-mistakes/` | “最容易出错” and no paid branch | Kept as the Chinese pre-pay page. English hreflang now returns to the surviving English checklist. Paid branch added. No Beijing prices | Exam Guidelines §6.1. Beijing HTML not opened | Canonical stays on this Chinese URL | In this PR only |

## V-PREP

| URL | Original locator | Actual change | Source and limit | Result |
| --- | --- | --- | --- | --- |
| `/guides/goethe-a1-30-day-study-plan/` | Generic 30-day topics | 30-day and eight-week views mapped to A1 parts, plus one original time/date drill and an explicit non-effect claim | A1 rules §§1, 2, 6, 7. Adult sample HTML not opened | In this PR only |
| `/guides/goethe-b1-fees-and-booking/` | Booking questions without the regulation anchors | Record tied to §§4.7, 6, 13, 15 and the four B1 modules. Route essay removed | Exam Guidelines and B1 rules. No price copied | In this PR only |
| `/guides/goethe-b1-study-plan/` | Week template plus a separate difficulty page | Self-check has no frequency claim. Eight weeks point at skill pages instead of four more calendars | B1 rules: 65/40/60 minutes, speaking pair, 60 of 100. Samples not opened | In this PR only |
| `/guides/goethe-b1-difficulty-analysis/` | “Why it feels hard” frequency table | Diagnostic table moved. File removed | B1 rules only | 301 to the B1 study plan |
| `/guides/goethe-b1-listening-deep-dive/` | Generic listening strategy | Original Thursday/Friday dialogue with a stated miss reason. Task-type labels marked editorial | B1 listening about 40 minutes. Sample not opened | In this PR only |
| `/guides/goethe-b1-mock-exam-routine/` | Four-week mock calendar and “follow local” for format | Log only. Centre owns logistics. Format conflict goes back to the exam owner. No invented score | B1 timings. Sample not opened | In this PR only |
| `/guides/goethe-b1-speaking-topics/` | English phrase bank | German round with a repair sentence and a note that English frames are not the drill | B1 speaking parts 1–3, 15 minutes pair, 15 minutes prep | In this PR only |
| `/guides/goethe-b1-writing-assessment/` | “Why it loses points” | One incomplete message, a revision, and a reason. No official score. Unread criterion labels not claimed | B1 writing 60 minutes, 100 points, pass at 60. Adult training booklet not reopened | In this PR only |
| `/guides/goethe-a1-listening-practice/` | Generic three-pass routine | Original 14:30 / 3 May transfer drill and a named miss | A1 listening about 20 minutes | In this PR only |
| `/guides/goethe-a1-speaking-topics/` | Topic noun list | One German round: spell, clarify, request | A1 speaking, max four people, no prep | In this PR only |
| `/guides/goethe-a1-study-plan-working-adults/` | Eight-week adult plan as a second article | Short-block view and extension rules moved. File removed | A1 rules | 301 to the 30-day plan |
| `/guides/goethe-a1-writing-practice/` | “If the centre says otherwise, follow the centre” applied to format | Centre ID versus exam-owner format split. Original form with a wrong draft and a reason | A1 writing parts 1–2, 20 minutes | In this PR only |
| `/zh/guides/goethe-a1-30-day-study-plan/` | Week 4 was only a review slogan | Chinese 30-day and eight-week views plus the original time/date drill | A1 rules, not an unread sample | In this PR only |

## V-B1

| URL | Original locator | Actual change | Source | Result |
| --- | --- | --- | --- | --- |
| `/guides/goethe-b1-germany-settlement-work/` | §9 was present; §18c’s different clocks were not anchored | Added §18c (1) three-year skilled-worker title and §18c (2) Blue Card 27/21 months, and said those are not StAG §10 | `sources/fb4ddf33bff070c1.txt` §§18c (1)–(2); §9 snapshot. No calculator | In this PR only. No Chinese B1 |

## V-IA

| URL | Original locator | Actual change | Result |
| --- | --- | --- | --- |
| `/` | Four-check block repeated the same receiving-organisation steps. “N guides” was the update lede | Two path cards: A1 and B1. Update lede names the 14 November correction, not a guide count | In this PR only. Ads remain off at runtime |
| `/routes/` | Developed hubs already match Route Finder’s single configured route | Left as the A1/B1 split. No country matrix | Unchanged task |
| `/exams/` | Directory sat level with the Germany comparisons | Directory is inside a collapsed “official starting points only” control | In this PR only. No new country prose |
| `/guides/` | “source-reviewed complete and core” read as current factual completion | Intro says a review date is a record, not a fresh check of every fact, and merged URLs are not cards | Cards follow the collection, so four retired slugs drop out of ItemList |
| `/about/` | 17/13-style status counts read as quality | Counts stay computed. Prose says they are not a quality score and points at the 15+2 inventory | In this PR only. No operator identity added |
| `/pricing/` | noindex commercial shell also sat in the About menu | Removed from the primary About menu. Footer link and noindex remain. No price or form added | In this PR only |
| `/partners/` | Same | Removed from the primary About menu. noindex remains | In this PR only |
| `/zh/` | Chinese home already labels B1 as English | Left as the Chinese A1 entry with English labels on English tools. No Chinese B1 page | Unchanged task besides shared data dates |
| `/guides/category/germany-a1/` | Cards included pages that are now redirects | Collection-driven cards drop the three retired A1 slugs. noindex not applied to this developed category | In this PR only |
| `/route-review/` | noindex shell linked as if it were a next step on the B1 hub | Page unchanged and still noindex. Hub sentence now says it is not accepting submissions | Isolation kept |
| `/guides/category/germany-b1/` | Would have kept a difficulty card | Difficulty guide removed from the collection, so the card and ItemList entry go with it | In this PR only |

## V-HOLD

| URL | Original locator | Actual change | Source limit | Result |
| --- | --- | --- | --- | --- |
| `/guides/telc-b1-b2-germany-work-nursing/` | Make it in Germany job-offer and licence sentences as current | Those sentences marked unread because the 2026-11-14 fetch was a challenge page. Four-owner table kept. noindex kept | Recognition Finder and telc nursing product remain the read sources. Portal not read | In this PR only. Still isolated |
| `/guides/telc-vs-goethe-for-german-visa/` | Existing exact-product stop conditions | Left in place. The page already stops when the route is unknown. noindex kept. Date not moved because this pass did not reopen it | A1 certificate FAQ not copied into a new visa rule | Isolation unchanged |
| `/guides/telc-b1-b2-exam-format-and-preparation/` | “current FAQ gives 4–6 weeks” and mock 75/25, 135/45 | Those current claims removed. Product timings kept. FAQ 7-day and 14-day meanings narrowed | telc B1/B2 product tables; FAQ `sources/6e07ce671cb89341.txt`. Mock ZIP not unpacked | In this PR only. Still noindex |
| `/guides/telc-b1-b2-fees-and-test-centers/` | “current central regulations” without the file id | Names PDF `10000311_9994-P00-150011` and the FAQ’s 7-day and 14-day limits. No named seat | FAQ and the rules PDF boundary. Finder not searched | In this PR only. Still noindex |
| `/guides/testdaf-germany-university-admissions/` | DAAD listed as if current, beside a pending template | DAAD marked not reopened. Scope note says the pending template is the missing programme URL, not a denial of the TDN 4 framework | TestDaF university page and uni-assist. DAAD timed out | In this PR only. Still isolated |
| `/guides/testdaf-levels-and-scoring/` | Closing line said source review completed | Scope note separates digital 0–20 / 0–80 from paper scoring and from admission | Digital and paper scoring snapshots | In this PR only. Still isolated |
| `/guides/testdaf-preparation-and-practice/` | Editorial loop could be read as a tested course | Loop labelled editorial. Samples not completed. Pending line explained | Digital preparation URL only | In this PR only. Still isolated |
| `/guides/testdaf-vs-goethe-dsh/` | Goethe C1 modules described from an unread page | C1 module claim removed. Digital TestDaF’s four parts kept. DSH stays with the unnamed university | TestDaF structure page. Goethe C1 regulation not read | In this PR only. Still isolated |
| `/guides/category/germany-telc/` | Starter category | noindex and empty-of-new-prose kept. No new nav item | Site state | Isolation unchanged |
| `/guides/category/germany-testdaf/` | Starter category | Same | Site state | Isolation unchanged |

## V-TOOLS

Static HTML is not treated as an interaction pass. `tests/route-tools.test.js` checks configured A1, unknown country, invalid dates, and now a negative buffer, which returns null instead of a later date. `tests/adsense-runtime-boundary.test.js` checks that the five tool sources and, when `dist/` exists, the built tool, pricing, partners, route-review, and 404 HTML contain no `adsbygoogle`, `pagead`, or `doubleclick` request. Email reminders source has no `fetch` and says no email service is connected. Forms were not submitted. No message was sent.

| URL | Check | Result in this PR |
| --- | --- | --- |
| `/tools/route-finder/` | A1 family reunion returns the configured route. University and unknown country stay verify-only with no invented official URL | Unit-tested |
| `/tools/` | Index only. No new article | Unchanged task |
| `/tools/exam-comparison/` | Fee, timing, and centre dimensions stay “verify with the official centre” | Unit-tested |
| `/tools/checklist-generator/` | Unknown route returns an empty checklist | Unit-tested |
| `/tools/timeline-calculator/` | Invalid date and negative buffer return no plan. The page hides a stale result | Unit-tested and page updated |
| `/tools/email-reminders/` | Local plan only | Source assertion. No send |

## V-TRUST

`/editorial-policy/`, `/privacy-policy/`, `/cookie-policy/`, `/terms/`, `/affiliate-disclosure/`, and `/contact/` were not given new operators, licences, or monitoring claims. Existing noindex on the policy pages stays. `/disclaimer/` and `/privacy/` were not created.

## Ads.txt

Public `https://visalang.org/ads.txt` was 200 `text/plain` with `pub-3018617123550799`. The dashboard was not opened, so “dashboard not found” was not “fixed” by editing the file or enabling ads.

## What this file does not claim

Production still serves the previous deployment until a separately authorised deploy. CI and these unit tests do not prove a visa fact. The 15 research guides and 2 product pages were enumerated, not rewritten.
