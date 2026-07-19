# High-risk route source audit

Audit date: 2026-07-14  
Scope: P0-2 audit and safe-downgrade preparation only. No policy statement in the listed guides has been confirmed by this audit.

Status rule: a high-risk guide cannot render as `complete-route` or `core-route` unless it has both a `primaryOfficialAuthorityUrl` and `sourceReviewStatus: reviewed`. An exam-owner URL alone is insufficient. All pages in this batch remain `verification-pending`.

| Guide file | Current contentStatus | High-risk claim categories present | Final decision authority URL already present | Exam-owner URL already present | Human official-source package required | Suggested status |
|---|---|---|---|---|---|---|
| `src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md` | verification-pending | citizenship/residence period; accepted certificate/level; booking timing | No | Yes — CAPLE | Portuguese citizenship/immigration authority for route, residence-period calculation, accepted proof and exemptions; CAPLE scope confirmation | verification-pending |
| `src/content/guides/portuguese-ciple-a2-for-citizenship-and-residence.md` | verification-pending | citizenship/residence eligibility; accepted level; applicant groups | No | Yes — CAPLE | Portuguese citizenship/immigration authority for each audience and accepted proof; CAPLE exam scope | verification-pending |
| `src/content/guides/dele-levels-spanish-citizenship.md` | verification-pending | applicant-specific accepted proof, alternatives and dispensation | Yes — Ministry of Justice, reviewed 2026-07-16 | Yes — Instituto Cervantes | Project-owner wording acceptance completed 2026-07-19; no individual eligibility or SIELE-acceptance conclusion | verification-pending |
| `src/content/guides/dele-a2-ccse-spanish-citizenship.md` | verification-pending | applicant category, residence calculation, required evidence and dispensation result | Yes — Ministry of Justice, reviewed 2026-07-16 | Yes — Instituto Cervantes | Project-owner wording acceptance completed 2026-07-19; current centre/date/fee checks remain local | verification-pending |
| `src/content/guides/languagecert-selt-uk-visa.md` | verification-pending | Home Office approval; visa levels; acceptance equivalence; fees/results | Yes — UK government link exists | Yes — LanguageCert | UK government route-specific requirement/approved-test evidence and current SELT list; LanguageCert product and local-centre details | verification-pending |
| `src/content/guides/ielts-ukvi-uk-visa.md` | verification-pending | route-specific CEFR levels; accepted IELTS variant; security/booking | Yes — UK government link exists | Yes — IELTS | UK government route-specific level, skills, exemptions and approved-test evidence; IELTS UKVI product/local-centre details | verification-pending |
| `src/content/guides/tef-canada-immigration.md` | verification-pending | immigration/citizenship acceptance; CRS/CLB scoring; validity period | Yes — IRCC link exists | Yes — Le français des affaires | IRCC source for each programme/use, accepted result and validity; exam-owner scoring/product details | verification-pending |
| `src/content/guides/tcf-canada-vs-tef.md` | verification-pending | equivalent scores; immigration-stream acceptance; comparative advantage | No | Yes — both exam-owner links exist | IRCC source for accepted tests, programme scope and score conversion; both exam-owner product details | verification-pending |
| `src/content/guides/cils-vs-celi-vs-plida-for-italian-citizenship.md` | verification-pending | accepted certificates; consular variation; exam availability | No | Yes — CILS/CELI/PLIDA links exist | Italian citizenship authority/competent consulate for accepted evidence and applicant scope; each exam owner’s product details | verification-pending |
| `src/content/guides/cils-b1-cittadinanza-for-italian-citizenship.md` | verification-pending | residence/marriage years; legal requirement; accepted alternatives | No | Yes — CILS | Italian citizenship authority/competent consulate for applicable route, periods, exemptions and proof; CILS product details | verification-pending |
| `src/content/guides/delf-b1-b2-french-work-study.md` | verification-pending | certificate validity; university/professional levels; citizenship acceptance | No | Yes — France Éducation international | Target institution/professional authority/prefecture for required proof and acceptance; exam-owner validity/product scope | verification-pending |
| `src/content/guides/tcf-irn-french-residence.md` | verification-pending | residence/citizenship applicant groups; levels; validity period | No | Yes — France Éducation international | French residence/citizenship authority for route, level, exemptions and accepted proof; TCF IRN product details | verification-pending |
| `src/content/guides/yki-finnish-citizenship.md` | verification-pending | citizenship/permanent-residence applicants; residence years; required level; exemptions | No | Yes — Finnish National Agency for Education | Migri/competent authority for citizenship and residence requirements, evidence and exemptions; YKI exam scope | verification-pending |
| `src/content/guides/yki-vs-other-finland-options.md` | verification-pending | accepted alternative evidence; exemptions; authority recognition | Yes — Migri link exists | Yes — Finnish National Agency for Education | Migri source for every alternative/exemption and applicant scope; YKI exam scope | verification-pending |
| `src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md` | verification-pending | required level; affected applicants; residence years; exemptions | No | Yes — DUO/Inburgeren | IND/competent citizenship or immigration authority for route and applicant scope; DUO for integration/exam execution | verification-pending |
| `src/content/guides/staatsexamen-nt2-for-work-and-higher-education.md` | verification-pending | programme-to-study/work mapping; institutional/professional acceptance | No | Yes — Staatsexamen NT2 | Target institution/employer/professional regulator for accepted proof; Staatsexamen NT2 product scope | verification-pending |

## Safe downgrade applied

- Added controlled intent, audience, decision-authority type, existing authority/exam-owner URL metadata, and a non-conclusive local execution prompt to the 16 pages.
- Kept all 16 pages at `verification-pending`.
- Added the same reader action to each page: “Before registering, check the current requirement with the authority that receives your application. This page helps you prepare the questions and official sources to use.”
- No page was promoted. Existing URLs were classified only when the current Markdown already named and linked them.

## Existing factual content deliberately not rewritten

This preparation pass did not validate or rewrite existing claims about eligibility, residence periods, required levels, accepted exams or certificates, exemptions, fees, dates, result validity, test format, centre availability, or immigration/citizenship outcomes. These statements remain visible only behind a `verification-pending` status and the new verification action. They require the source packages listed above before substantive editing.

No factual assertion was deleted in this batch. Therefore there are no deletion records.

## Out-of-scope high-risk audit queue

The following clusters may also contain immigration, citizenship, admission, professional-recognition, acceptance, fee, timing, or validity claims. They were not fact-edited or promoted in this batch:

- `src/content/guides/german-a1-*.md` and `src/content/guides/goethe-a1-*.md`
- `src/content/guides/germany-b1-*.md` and `src/content/guides/goethe-b1-*.md`
- `src/content/guides/testdaf-*.md`
- `src/content/guides/telc-*.md`
- Chinese Germany A1 route pages under `src/pages/zh/` and `src/components/ZhGuideLayout.astro`

Each cluster needs a separately approved audit window and a human-provided source package. This document does not change their factual content or review state.

## P0-2 page disposition — 2026-07-14

The editorial source reviewer used `docs/HIGH_RISK_ROUTE_SOURCE_PACKAGE_2026-07-14.md`. A reviewed source set does not promote a page: all pages remain `verification-pending` while applicant-, route-, centre-, date- or institution-specific questions remain.

| Guides | Disposition | Reviewed sources | Unresolved |
|---|---|---|---|
| Portugal (2) | Deleted universal CIPLE acceptance, fixed residence-period and booking-availability claims; limited the text to the Justice-profile check and CAPLE product boundary. | Portuguese Justice portal; CAPLE CIPLE | Applicant profile, residence calculation, accepted proof/exemption, centre/date/fee |
| UK (2) | Deleted static route-level table, “only IELTS variant”, relative fee/availability and all-products/all-skills comparisons; limited approval to the current UKVI product/location/route list. | UKVI SELT list; LANGUAGECERT; IELTS | Route level/skills/exemption, approved location, date/fee/provider terms |
| Canada (2) | Deleted citizenship-wide acceptance, incorrect CLB range, equivalent-score/same-stream/strategic-advantage and relative-availability claims; limited validity/conversion statements to IRCC Express Entry. | IRCC Express Entry language-test page; TEF Canada; TCF Canada | Programme scope, current conversion, submission timing, centre/date/fee |
| Italy (2) | Deleted fixed residence/marriage periods, universal CILS need, relative availability and consular-generalisation claims; limited B1/certifier statements to the authorities' stated citizenship scope. | Interior Ministry; Foreign Ministry; CILS/CELI/PLIDA owners | Citizenship basis, exemption/alternative proof, exact product/centre/session |
| Finland (2) | Deleted universal residence/applicant lists and “YKI default/only proof” claims; limited alternatives to Migri's current evidence conditions. | Migri language-skills page; Finnish National Agency for Education YKI | Eligibility/residence calculation, evidence/exemption, subtests/centre/date/fee |
| Netherlands Inburgering | Deleted universal A2/B1, five-year, applicant and deadline/fine claims; limited the page to selecting the IND procedure/cohort and DUO execution details. | IND integration/naturalisation; DUO exam page | Route/cohort, exemption, deadline, current case-specific components |

### BLOCKED pages not fact-edited

The following pages lack the required page-specific final-decision-authority input. Their existing factual prose was not treated as reviewed, and no `sourceReviewedAt` was added:

- `src/content/guides/delf-b1-b2-french-work-study.md`
- `src/content/guides/tcf-irn-french-residence.md`
- `src/content/guides/staatsexamen-nt2-for-work-and-higher-education.md`

They remain `verification-pending`. Required inputs are, respectively, the named French receiving institution/regulator; the precise French prefecture/procedure page; and the named Dutch institution/employer/regulator.

## P0-3 page-specific authority review — 2026-07-19

The 2026-07-14 blocked disposition above is historical. The three pages now have current, page-specific source packages and bounded rewrites:

- `docs/FRANCE_HIGH_RISK_SOURCE_REVIEW_2026-07-19.md`
- `docs/NETHERLANDS_NT2_SOURCE_REVIEW_2026-07-19.md`

| Guide | Named authority or receiver reviewed | Page disposition | Unresolved boundary |
|---|---|---|---|
| `delf-b1-b2-french-work-study` | Sorbonne University Faculty of Arts and Humanities; FEI DELF/DALF | Narrowed to the reviewed faculty admissions branch; still `verification-pending` | Exact programme rules remain current and receiver-specific; work and professional routes are explicitly outside page scope |
| `tcf-irn-french-residence` | Ministry of the Interior nationality procedure; current Service-Public nationality evidence page; FEI TCF IRN | Narrowed to the reviewed nationality-procedure branch; still `verification-pending` | Applicant category, exception/dispensation, dossier decision and local centre terms remain reader-specific; residence routes are explicitly outside page scope |
| `staatsexamen-nt2-for-work-and-higher-education` | University of Amsterdam Dutch-taught bachelor's admissions; DUO/CvTE NT2 pages | Narrowed to the reviewed UvA admissions branch; still `verification-pending` | Exact programme rules remain current and receiver-specific; work and professional routes are explicitly outside page scope; NT2 does not automatically confer admission |

The source packages close the missing-input blocker, not the reader-specific decision. `sourceReviewedAt` records review of the facts retained on each rewritten page; it does not promote `contentStatus`, guarantee acceptance, or substitute for a current receiver check.

### Spain source pilot — 2026-07-16

The previous deciding-authority gap for the two Spain guides was closed using the current Spanish Ministry of Justice residence-nationality procedure and electronic application/dispensation pages. The narrow source review and claim boundaries are recorded in `docs/SPAIN_CONTENT_SOURCE_PILOT_2026-07-16.md`.

Both guides now record the Ministry as the primary official authority and a real source-review date. They remain `verification-pending`: the reviewed pages do not authorize VisaLang to decide an applicant category, residence calculation, accepted evidence, individual dispensation, or local exam terms.

The project owner explicitly accepted the retained Ministry-first wording on 2026-07-19 in the Codex task. This closes the human wording-review gate only; it does not promote either page or resolve any applicant-specific decision.
