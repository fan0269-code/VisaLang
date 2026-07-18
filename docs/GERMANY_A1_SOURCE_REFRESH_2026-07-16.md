# Germany A1 source refresh — phase 1 claim/source audit

- Checked: 2026-07-16, Asia/Shanghai (CST, UTC+08:00)
- Result: `PHASE_1_PARTIAL_SOURCE_GAPS_RECORDED`
- Scope: read-only audit of five Germany A1 guides. No guide body, frontmatter, test, content status, review date, commit, push, or deployment change is authorised or included.

## Execution scope and starting state

- Start: 2026-07-16 21:28:13 CST.
- Branch: `main`; HEAD: `9bca539bfda65d27b3c41f790de88be60bb6d03e`.
- Relative to `origin/main`: ahead 3, behind 0.
- Pre-existing modified files: `docs/CONTENT_MAP.md`, `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`, `docs/TASK_LOG.md`, two Spain guide files, and two test files.
- Pre-existing untracked files included both Germany prompts, the Spain pilot, release prompt, and two superpowers planning documents.
- None of the five target guides had a starting diff. This report did not edit them.
- This report did not exist at start. `docs/TASK_LOG.md` already contained user changes; the phase-one entry is appended without replacing them.
- Starting `git diff --check`: pass. Existing changes are user assets and are excluded from this phase's output.

## Authority hierarchy and verification method

Family-reunion eligibility, exemptions, accepted proof, and visa-file documents are controlled first by the mission receiving the application, then the Federal Foreign Office and the competent immigration authority; BAMF supplies general orientation. Goethe and telc can establish exam-product facts, not an individual visa decision. Exam availability, fees, dates, ID, cancellations, results, and certificate delivery require the selected official or authorised centre.

Only final official URLs were used. Each page was opened or requested on 2026-07-16; search snippets were discovery aids only. A global page is not treated as proof of a country, centre, mission, or individual-case rule. The Goethe and telc URLs below returned HTTP 200. The BAMF third-country route returned HTTP 200; the BAMF family landing page produced an intermittent TLS failure in command-line checking but was readable through indexed official content, so claims relying on it are not upgraded beyond its general scope. The Foreign Office FAQ was readable through its current official URL. No local country, city, centre, or mission was supplied, so local claims remain bounded or pending.

Support labels mean direct and scope-matched (`fully supports`), relevant but narrower/incomplete (`partially supports`), absent or conflicting (`does not support`), or inaccessible (`source blocked`).

## 1. `goethe-a1-fees-by-country.md`

| claim id | current claim | source location | risk | claim owner | required source | located source | source title | checked date | support level | geographic scope | supported fact | unsupported boundary | allowed wording | prohibited wording | proposed action | blocker |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FEE-01 | The usable fee is the current fee for the exact exam and local booking route, not an old blog price. | The useful answer | high | selected official/authorised centre | current local A1 listing or written terms | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | partially supports | centre | Goethe routes users to institutes and exam partners. | No local fee, currency, date, or terms. | Verify the selected centre's current fee. | A global or approximate Goethe A1 price. | keep | selected centre not supplied |
| FEE-02 | The adult product is Goethe-Zertifikat A1: Start Deutsch 1. | The useful answer | medium | Goethe-Institut | global product page | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | fully supports | global | Distinguishes adult Start Deutsch 1 from youth Fit in Deutsch 1. | Does not establish local availability. | Name the adult product exactly. | Treat every A1 listing as the adult product. | keep | none |
| FEE-03 | Goethe exams are offered through Goethe-Instituts and exam partners. | The useful answer / verification method | medium | Goethe-Institut | official provider network page | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | fully supports | global | Official provider route exists worldwide. | Does not confirm a particular centre or session. | Start from Goethe's official route. | Call an unlisted school official. | keep | none |
| FEE-04 | Price can differ by country, centre, version, and booking period. | Why price can change | high | selected centre | multiple current local fee schedules | not located | No cross-market official fee comparison | 2026-07-16 | partially supports | centre | Global page omits a universal fee and delegates booking locally. | The enumerated variation factors are not all proven by one source. | Local price and terms must be checked for the exact booking. | Assert named variation factors as a universal rule. | rewrite | representative local schedules not in scope |
| FEE-05 | Course/preparation/administration charges are not automatically the examination fee. | Why price can change | high | selected provider and centre | itemised official quote | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | partially supports | centre | The official page identifies an examination product. | It does not itemise a user's quote. | Ask what the quoted amount covers. | Label a third-party package as the official exam fee. | keep | exact quote not supplied |
| FEE-06 | Cancellation, refund, rescheduling, result and certificate terms must be checked locally before payment. | Before you pay / fee record | medium | selected centre | current centre terms | not located | Local terms required | 2026-07-16 | partially supports | centre | Goethe global page cannot supply local booking terms. | No actual policy or timing is verified. | Check and save the centre's current terms. | State a global refund, reschedule, or result rule. | keep | selected centre not supplied |

### Page disposition

- Current content status: `complete-route`.
- Current source-review status: no `sourceReviewStatus` or `sourceReviewedAt` in frontmatter.
- High-risk claims: 3; fully supported: 2; partially supported: 4; unsupported: 0; blocked: 0.
- Recommended next-stage result: `READY_FOR_LIMITED_REWRITE`.
- Required human/business input: a chosen country/centre only if examples or actual figures are to be added.

## 2. `goethe-a1-test-centers.md`

| claim id | current claim | source location | risk | claim owner | required source | located source | source title | checked date | support level | geographic scope | supported fact | unsupported boundary | allowed wording | prohibited wording | proposed action | blocker |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| CENTER-01 | Goethe exams are offered at Goethe-Instituts and exam partners reached through Goethe's route. | Official centre definition | medium | Goethe-Institut | official provider page | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | fully supports | global | Goethe states this provider model. | No particular centre is verified. | Use the official route, then verify locally. | Confirm a copied address as current. | keep | none |
| CENTER-02 | A course provider is not automatically an official exam provider. | Official centre definition | medium | Goethe/telc | official centre directory | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | fully supports | global | Exam providers are institutes/partners, not any course seller. | A named school remains unassessed. | Require provider confirmation. | Equate course availability with exam authorisation. | keep | none |
| CENTER-03 | telc candidates should use the official centre finder. | Official centre definition | medium | telc | official finder | https://www.telc.net/en/language-examinations/find-a-telc-examination-centre/ | Find a telc examination center | 2026-07-16 | fully supports | global | Finder lists telc examination centres. | Finder does not itself prove a chosen date/product. | Use the finder and contact the centre. | Promise a listed centre currently offers telc A1. | keep | none |
| CENTER-04 | Adult Goethe A1 is Start Deutsch 1, not the youth version, course, or mock test. | Verify exact examination | medium | Goethe-Institut | product overview | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | fully supports | global | Adult and youth A1 products are distinct. | Local offering is not established. | Match the exact adult product. | Treat any A1 label as equivalent. | keep | none |
| CENTER-05 | The responsible authority, not this guide, decides whether telc proof suits a family-reunion case. | Verify exact examination | high | receiving mission/authority | mission checklist | not located | Applicant-specific mission instruction required | 2026-07-16 | partially supports | individual case | telc finder establishes centres only. | Certificate acceptance for a visa file is unverified. | Ask the responsible mission. | Guarantee telc acceptance. | keep | mission not supplied |
| CENTER-06 | Date, deadline, speaking schedule, result/certificate process, ID and payment rules come from the selected centre. | Centre-selection checklist | medium | selected centre | local exam listing and terms | https://www.telc.net/en/language-examinations/find-a-telc-examination-centre/ | Find a telc examination center | 2026-07-16 | partially supports | centre | telc directs users to centres for dates and important information. | No Goethe/telc centre-specific values are proven. | Obtain these items from the chosen centre. | State uniform worldwide terms. | keep | selected centre not supplied |
| CENTER-07 | A vague course/A1 enquiry is not confirmation of an examination place. | When unclear | medium | selected centre | booking confirmation | not located | Booking confirmation required | 2026-07-16 | partially supports | centre | Official routes distinguish exams and centres. | No individual seat is confirmed. | Require explicit exam and booking confirmation. | Treat an enquiry as a booked seat. | keep | booking record not supplied |

### Page disposition

- Current content status: `complete-route`; source-review fields absent.
- High-risk claims: 1; fully supported: 4; partially supported: 3; unsupported: 0; blocked: 0.
- Recommended next-stage result: `READY_FOR_LIMITED_REWRITE`.
- Required human/business input: country/city/centre if the next stage adds a static location or availability statement.

## 3. `goethe-a1-retake-policy.md`

| claim id | current claim | source location | risk | claim owner | required source | located source | source title | checked date | support level | geographic scope | supported fact | unsupported boundary | allowed wording | prohibited wording | proposed action | blocker |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| RETAKE-01 | The results page explains pass/fail context for Start Deutsch 1. | Start with result | medium | Goethe-Institut | official results page | https://www.goethe.de/en/spr/prf/pes/pas1.html | Information on exam results: Goethe-Zertifikat A1 | 2026-07-16 | fully supports | global | Official A1 result context is provided. | It does not establish a local retake seat or terms. | Use it for result context only. | Use it as local rebooking authority. | keep | none |
| RETAKE-02 | Do not assume partial retake or full new booking; ask the centre. | Start with result | medium | Goethe plus selected centre | A1 rules and local terms | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | fully supports | global/centre | Goethe identifies only B1–C2 as modular, excluding A1. | Local rebooking mechanics remain unknown. | State A1 is not listed as modular; verify rebooking locally. | Say A1 modules may be retaken separately. | rewrite | local rebooking terms absent |
| RETAKE-03 | A next seat and registration deadline must be checked locally. | Local-centre questions | medium | selected centre | current booking page | not located | Local booking page required | 2026-07-16 | partially supports | centre | Global sources do not supply seats/deadlines. | No availability is confirmed. | Ask the selected centre. | Promise immediate or anytime retake. | keep | selected centre not supplied |
| RETAKE-04 | Local fee, ID, result and certificate process must be checked locally. | Local-centre questions | medium | selected centre | current local terms | not located | Local terms required | 2026-07-16 | partially supports | centre | These are not global product facts. | No actual fee/document/timing is confirmed. | Verify current local terms. | State a global fee or result time. | keep | selected centre not supplied |
| RETAKE-05 | Cancellation, refund and rescheduling terms are centre-specific checks. | Local-centre questions | medium | selected centre | local purchase terms | not located | Local terms required | 2026-07-16 | partially supports | centre | No global rule is cited. | No centre policy is verified. | Read the selected centre's terms. | State a universal refund/reschedule rule. | keep | selected centre not supplied |
| RETAKE-06 | Another attempt is not guaranteed to fit a visa timeline. | Protect visa timeline | high | centre plus receiving mission | centre timing and mission appointment requirements | not located | Two local authorities required | 2026-07-16 | partially supports | individual case | Page correctly separates the two decision owners. | No case timeline can be calculated. | Compare locally confirmed information. | Guarantee the attempt will fit. | keep | centre and mission not supplied |
| RETAKE-07 | The page FAQ says the mission may decide current document instructions in response to whether a retake is possible. | FAQ | medium | selected centre | local retake terms | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | does not support | centre | Goethe product rules are relevant. | A mission does not decide whether a centre permits rebooking. | Say the centre decides retake/rebooking; mission decides visa proof/timing. | Conflate mission document authority with centre retake authority. | rewrite | none |

### Page disposition

- Current content status: `complete-route`; source-review fields absent.
- High-risk claims: 1; fully supported: 2; partially supported: 4; unsupported: 1; blocked: 0.
- Recommended next-stage result: `READY_FOR_LIMITED_REWRITE`.
- Required human/business input: selected centre for any concrete wait, fee, seat, cancellation, or rebooking claim.

## 4. `german-a1-documents-checklist.md`

| claim id | current claim | source location | risk | claim owner | required source | located source | source title | checked date | support level | geographic scope | supported fact | unsupported boundary | allowed wording | prohibited wording | proposed action | blocker |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| DOC-01 | Booking, test day, certificate, and visa-file documents are separate stages. | Keep moments separate | high | centre / receiving mission | centre rules plus mission checklist | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | partially supports | centre/mission | Exam product and visa use are distinct. | No complete local document list is supplied. | Keep authority and stage labels explicit. | Present one global checklist as mandatory. | keep | centre and mission not supplied |
| DOC-02 | The centre controls booking and test-day instructions; the mission controls visa-file instructions. | Keep moments separate | high | selected centre / mission | local official pages | https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682 | FFO spouse German-language FAQ | 2026-07-16 | partially supports | mission | FFO directs applicants to the relevant diplomatic mission. | No selected centre or mission checklist is verified. | Identify both decision owners. | Let an exam provider decide visa-file completeness. | keep | application location absent |
| DOC-03 | Booking name should match the identity document used. | Before booking | medium | selected centre | local registration terms | not located | Centre registration terms required | 2026-07-16 | partially supports | centre | Sensible verification action only. | It is not proven as a universal formal requirement. | Ask the centre how identity data must be entered. | State a universal document rule. | rewrite | selected centre absent |
| DOC-04 | Booking may require accepted ID/passport details, contact details, payment method, and confirmation. | Before booking | medium | selected centre | local registration instructions | not located | Centre registration instructions required | 2026-07-16 | partially supports | centre | Presented as items to confirm, not a fixed list. | None is established for every centre. | Retain as questions. | Say all items are universally mandatory. | keep | selected centre absent |
| DOC-05 | Test day may require original accepted ID/passport and booking confirmation. | Before test day | medium | selected centre | candidate/test-day rules | https://www.goethe.de/resources/files/pdf347/dfb-v1.pdf | Terms and conditions Start Deutsch 1 | 2026-07-16 | partially supports | global/centre | Official exam administration rules govern identity and participation. | Exact local accepted documents and confirmation format remain local. | Use “may” and direct users to centre instructions. | Promise a copy is sufficient or list universal ID types. | keep | local instructions absent |
| DOC-06 | Arrival time, location, permitted and prohibited items are local instructions. | Before test day | medium | selected centre | test-day notice | not located | Local test-day notice required | 2026-07-16 | partially supports | centre | These are correctly framed as checks. | No values or item list is verified. | Check the centre message. | State a universal arrival time/item policy. | keep | selected centre absent |
| DOC-07 | Keep original certificate and copy, and check name/date/issuer before visa appointment. | Before visa appointment | high | receiving mission | mission checklist | not located | Mission checklist required | 2026-07-16 | partially supports | mission | FFO supports need for language proof in the general spouse route. | Original/copy requirements are not established globally. | Treat as preparation pending mission instructions. | Say every mission requires original plus copy. | rewrite | mission absent |
| DOC-08 | Mission decides whether the certificate is accepted and whether originals, copies, translations or extras are required. | Before visa appointment | high | receiving mission | mission-specific checklist | https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682 | FFO spouse German-language FAQ | 2026-07-16 | fully supports | mission | FFO points applicants to respective diplomatic missions for details. | No individual certificate or file is accepted by this page. | Verify with the responsible mission. | Guarantee acceptance. | keep | none |
| DOC-09 | A course completion record is not automatically an official language certificate. | Intro/common mistakes | high | exam provider and mission | product page plus mission acceptance rule | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | fully supports | global | Goethe identifies the official certificate exam product. | Visa acceptance of another document remains mission-specific. | Distinguish course attendance from an exam certificate. | Treat course completion as accepted visa proof. | keep | none |
| DOC-10 | Every mission does not necessarily accept the same proof in the same way. | Common mistakes | high | receiving mission | multiple mission checklists | https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682 | FFO spouse German-language FAQ | 2026-07-16 | partially supports | mission | FFO directs location-specific questions to missions. | No cross-mission comparison was performed. | Use the responsible mission's current checklist. | Publish a global visa document checklist. | keep | application location absent |

### Page disposition

- Current content status: `complete-route`; source-review fields absent.
- High-risk claims: 6; fully supported: 2; partially supported: 8; unsupported: 0; blocked: 0.
- Recommended next-stage result: `PARTIAL_REWRITE_ONLY`.
- Required human/business input: selected exam centre and actual German mission before any required-document list can be made definite.

## 5. `german-family-reunion-language-requirement.md`

| claim id | current claim | source location | risk | claim owner | required source | located source | source title | checked date | support level | geographic scope | supported fact | unsupported boundary | allowed wording | prohibited wording | proposed action | blocker |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| LANG-01 | Conditions differ when joining a German, EU citizen, or third-country national. | Start with route | high | German legislature/competent authority | BAMF route overview | https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html | BAMF Family reunification | 2026-07-16 | fully supports | national/general | BAMF lists the three route categories and says conditions vary. | It does not decide an individual case. | Identify route category first. | Apply one rule to all family reunion. | keep | none |
| LANG-02 | For spouses joining third-country nationals, simple everyday German applies as a general rule. | Start with route | high | competent mission/authority | BAMF specific route and mission instruction | https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDrittstaatlern/nachzug-zu-drittstaatlern-node.html | Subsequent immigration to join third-country nationals | 2026-07-16 | fully supports | national/general | BAMF states this as a rule for spouses. | Exceptions and individual application remain unresolved. | Preserve “as a rule” and route scope. | Say every spouse must provide A1. | keep | none |
| LANG-03 | Some skilled-worker routes allow language skills to be acquired after arrival. | Start with route | high | competent mission/authority | BAMF route page and mission instruction | https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDrittstaatlern/nachzug-zu-drittstaatlern-node.html | Subsequent immigration to join third-country nationals | 2026-07-16 | fully supports | national/general | BAMF expressly gives skilled-worker family reunification as an example. | Sponsor category and individual eligibility are not determined. | State this as a possible route-dependent exception. | Tell an applicant they are exempt. | keep | none |
| LANG-04 | Sponsor residence category and relationship category must be checked. | Sponsor category | high | receiving mission/competent authority | route-specific official rules | https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDrittstaatlern/nachzug-zu-drittstaatlern-node.html | Subsequent immigration to join third-country nationals | 2026-07-16 | fully supports | national/general | BAMF differentiates by sponsor status and relationship. | No applicant classification is made. | Require route classification. | Infer category from a generic relationship label. | keep | none |
| LANG-05 | The mission must confirm whether proof is required and which proof is accepted. | Confirm mission instruction | high | receiving mission | current mission checklist | https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682 | FFO spouse German-language FAQ | 2026-07-16 | partially supports | mission | FFO gives the general rule and directs users to diplomatic missions. | No mission-specific accepted-proof list is supplied. | Ask the responsible mission. | Guarantee a certificate's acceptance. | keep | application mission absent |
| LANG-06 | Document or age conditions must be confirmed before booking/submission. | Confirm mission instruction | high | receiving mission | mission route checklist | not located | Mission-specific checklist required | 2026-07-16 | partially supports | mission/individual case | BAMF shows age and route qualifications exist. | No complete exception or document list is established. | Frame as a verification question. | Publish a complete universal exception list. | keep | route and mission absent |
| LANG-07 | Goethe Start Deutsch 1 is recognised as proof for spousal reunification, but the guide cannot decide case acceptance. | Official sources / page boundary | high | Goethe for product; mission for acceptance | provider product page plus mission rule | https://www.goethe.de/en/spr/prf.html | German examinations A1–C2 | 2026-07-16 | partially supports | global/mission | Goethe states product recognition for spousal reunification. | It cannot decide every mission or individual file. | Describe provider recognition plus mission verification. | Say all missions must accept it in every case. | keep | mission absent |

### Page disposition

- Current content status: `complete-route`; source-review fields absent.
- High-risk claims: 7; fully supported: 4; partially supported: 3; unsupported: 0; blocked: 0.
- Recommended next-stage result: `READY_FOR_LIMITED_REWRITE`.
- Required human/business input: actual route, sponsor residence category, application location, and mission for case-specific conclusions.

## Cross-page duplication and conflicts

1. Fees and centres consistently avoid static prices/locations; both should retain a single official-provider-to-local-centre workflow rather than duplicate an implied global directory.
2. Centres and documents consistently place ID/test-day rules with the local centre. Neither currently supplies a local source, so these remain questions, not requirements.
3. Retake and fees correctly avoid a fixed resit price. The retake FAQ incorrectly includes the mission as a decider of retake availability; only the centre controls rebooking, while the mission controls visa proof/timing.
4. Documents and language-requirement pages consistently place visa-file authority with the mission. The documents page's “original certificate and copy” is preparatory advice, not a proven global requirement.
5. The Goethe global page supports product/network facts across several pages but cannot support local fees, sessions, documents, results, or cancellation rules.
6. No page currently contains a specific fee, city list, fixed wait, fixed result time, or universal exception list. That restraint should be preserved.

## Source gaps

| blocker id | page | missing input | required authority | required geography | impact | next action |
|---|---|---|---|---|---|---|
| GAP-01 | fees | selected A1 fee, currency, inclusions and payment terms | Goethe-Institut or authorised centre | country/city/centre | no numerical fee may be published | obtain current official listing or dated written confirmation |
| GAP-02 | centres | selected centre and current Start Deutsch 1 session | Goethe-Institut/exam partner | country/city/centre | no static centre/availability claim | verify through official route and local listing |
| GAP-03 | retake | A1 rebooking, cancellation, refund and reschedule terms | selected centre | centre | no waiting-period, fee, or seat claim | obtain centre terms for exact exam/result |
| GAP-04 | documents | accepted booking/test-day ID and confirmation | selected centre | centre | checklist must remain non-mandatory | obtain candidate/test-day instructions |
| GAP-05 | documents | originals, copies, translations and extra visa documents | receiving German mission | mission | no universal visa checklist | identify application location and save current checklist |
| GAP-06 | language requirement | route, sponsor status, proof and exceptions | receiving mission/competent authority | mission/individual case | no case eligibility or exemption conclusion | classify route and ask mission unresolved questions |
| GAP-07 | all local claims | current source date/scope for a chosen location | relevant local authority | local | source-review cannot become complete | add only after locality is defined |

## Next-stage permitted edits

- Fees: tighten the variation sentence to what the evidence proves; keep the dynamic official-centre verification path and no figures.
- Centres: clarify that directory presence does not prove current A1 availability; no static city list without a defined maintenance package.
- Retake: state explicitly that Goethe lists B1–C2, not A1, as modular; correct the FAQ's centre/mission ownership split.
- Documents: label every item by booking, test day, certificate handling, or visa submission; soften “original plus copy” to mission-dependent preparation.
- Language requirement: retain route categories, “as a rule,” skilled-worker example, and mission verification; optionally cite the current Foreign Office page without claiming it is a complete exception list.

## Next-stage prohibited conclusions

Do not add a global/current fee, worldwide centre list, guaranteed session, A1 partial-module retake, fixed wait/refund/result time, universal ID list, universal visa-document checklist, exhaustive exemption list, automatic certificate acceptance, individual exemption/eligibility decision, or claim that an exam provider decides visa acceptance. Do not mark source review complete merely because global orientation pages are accessible.

## Overall phase conclusion

`PHASE_1_PARTIAL_SOURCE_GAPS_RECORDED`. All five pages have traceable claim matrices and every high-risk claim has an owner and required source. Global/national official sources support the product and general family-route boundaries; local fees, centre execution, documents, and individual mission decisions remain intentionally unresolved. Four pages may enter a limited evidence-bounded rewrite; the documents page is partial-rewrite-only until centre and mission inputs exist.

## Files and verification

- Phase files: `docs/GERMANY_A1_SOURCE_REFRESH_2026-07-16.md`, `docs/TASK_LOG.md`.
- Claim totals: 37; high risk: 18; fully supported: 14; partially supported: 22; unsupported: 1; blocked: 0.
- Tests/build: not run because phase one changes documentation only and expressly forbids test/source edits.
- Final checks: `git diff --check` passed; final status/stat and scoped phase-file diff were inspected; the five target guides have zero diff.
