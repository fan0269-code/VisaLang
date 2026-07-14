# High-risk route official-source package

Checked: 2026-07-14  
Reviewer role: `source-review`  
Scope: the 16 guides listed in `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md` only.

## Review rules

- Only first-party government, final-decision authority, exam-owner, or authorised public-institution pages are included.
- A source supports only the claims stated below. It does not support individual eligibility, a future decision, local availability, fees, dates, processing time, exemptions, or acceptance by another body unless explicitly listed.
- “Unresolved” means the reviewed official pages did not establish the claim. It must not be inferred from an exam-owner page.
- All 16 guides should remain `verification-pending`. This package is sufficient for factual cleanup and bounded sourcing, but not for promotion to `core-route` or `complete-route`: each page still contains unsupported assertions and/or requires route-, applicant-, centre-, institution-, or date-specific confirmation.

## Portugal

### `src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md`

- Final decision authority: [Portuguese Justice portal — Portuguese nationality](https://justica.gov.pt/Registos/Nacionalidade/Nacionalidade-portuguesa)
- Exam owner: [CAPLE, University of Lisbon — CIPLE](https://caple.letras.ulisboa.pt/exame/2/ciple)
- Supported:
  - The Justice portal is the government entry point for determining which nationality profile and documents apply.
  - In profiles where the Justice portal asks for proof of Portuguese, it identifies a Portuguese-as-a-foreign-language certificate obtained through a recognised assessment centre as one possible proof and directs readers to CAPLE.
  - CAPLE is the University of Lisbon assessment centre/exam owner; its own pages may support its exam names, levels, sessions and centres only.
- Unsupported boundaries: the reviewed sources do not establish one universal rule for “Golden Visa holders”; do not state that the residence clock starts at the first permit date, that every reader needs CIPLE A2, that higher CAPLE diplomas are automatically accepted, or that centres fill up.
- Reader must confirm: exact nationality profile; how lawful residence is calculated for that profile; accepted proof and exemptions; current CAPLE session, centre and fee.
- Recommended status: `verification-pending`.

### `src/content/guides/portuguese-ciple-a2-for-citizenship-and-residence.md`

- Final decision authority: [Portuguese Justice portal — Portuguese nationality](https://justica.gov.pt/Registos/Nacionalidade/Nacionalidade-portuguesa)
- Exam owner: [CAPLE, University of Lisbon — CIPLE](https://caple.letras.ulisboa.pt/exame/2/ciple)
- Supported: the same authority/exam-owner boundary above; CAPLE may support CIPLE's assessed level and components on the specific current exam page.
- Unsupported boundaries: no reviewed authority page supports a single “who needs it” list covering naturalisation, marriage, Golden Visa and permanent residence; an exam-owner page cannot establish immigration eligibility or acceptance.
- Reader must confirm: the applicable Justice/immigration procedure, accepted proof and exemption for the individual route, then the exact CAPLE product and centre conditions.
- Recommended status: `verification-pending`.

## Spain

### `src/content/guides/dele-levels-spanish-citizenship.md`

- Final decision authority: **unresolved in this review; a current Ministry of Justice route page must be supplied before route claims are retained**.
- Exam owner: [Instituto Cervantes — nationality tests](https://examenes.cervantes.es/es/presentacion/nacionalidad)
- Supported:
  - Instituto Cervantes owns DELE and supports DELE product levels, format, registration and sessions.
- Unsupported boundaries: the DELE owner page alone does not prove the citizenship minimum, exemptions, SIELE acceptance, or that higher levels provide no benefit; no cost-benefit conclusion is supported.
- Reader must confirm: route eligibility and current evidentiary/exemption rules with the Ministry procedure; exact diploma, centre, date and fee with Cervantes.
- Recommended status: `verification-pending`.

### `src/content/guides/dele-a2-ccse-spanish-citizenship.md`

- Final decision authority: **unresolved in this review; a current Ministry of Justice route page must be supplied before route claims are retained**.
- Exam owners: [Instituto Cervantes — nationality tests](https://examenes.cervantes.es/es/presentacion/nacionalidad); [CCSE FAQ](https://examenes.cervantes.es/es/ccse/preguntas-frecuentes); [DELE FAQ](https://examenes.cervantes.es/es/dele/preguntas-frecuentes)
- Supported: Cervantes owns DELE and CCSE and supports their exam scope; its nationality page identifies DELE A2 or higher and CCSE in certain nationality cases, while directing acquisition-requirement questions to the Ministry of Justice. Cervantes supports the CCSE's current 25-question/45-minute format and its own stated certificate-validity rule, but cannot decide an applicant's route or exemption.
- Unsupported boundaries: do not retain the universal “two exams you need” statement, residence-year shortcuts, nationality exceptions, universal no-exemption language, or fixed duration/date claims unless the exact current authority/product page supports them.
- Reader must confirm: eligible residence route, applicant-specific exemption, required evidence, current test specification, centre, dates, fee and retake terms.
- Recommended status: `verification-pending`.

## United Kingdom

### `src/content/guides/languagecert-selt-uk-visa.md`

- Final decision authority: [UKVI — approved SELTs and centres](https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt)
- Exam owner: [LANGUAGECERT — ESOL SELT](https://www.languagecert.org/en/language-exams/english/languagecert-esol-selt)
- Supported:
  - UKVI lists LANGUAGECERT among approved providers and names the currently approved LANGUAGECERT SELT products.
  - UKVI distinguishes routes requiring four skills from routes requiring speaking and listening, and instructs readers to use route-specific guidance for the required CEFR level.
  - An accepted result must be from an approved test at an approved location and awarded within the period stated by UKVI; the current page states two years.
- Unsupported boundaries: not every LANGUAGECERT product or centre is approved; do not state that all listed CEFR levels apply to every visa, that fees/results are similar to IELTS, that there are fewer centres, or that both products test four skills.
- Reader must confirm: route, required level/components, exact approved product/location on the current UKVI list, booking availability, fee and provider terms.
- Recommended status: `verification-pending`.

### `src/content/guides/ielts-ukvi-uk-visa.md`

- Final decision authority: [UKVI — approved SELTs and centres](https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt)
- Exam owner: [IELTS — IELTS for UKVI](https://ielts.org/take-a-test/test-types/ielts-tests-for-uk-visas-and-immigration)
- Supported: UKVI names IELTS for UKVI and IELTS Life Skills as approved IELTS SELT products, identifies which route families require four skills or speaking/listening, and requires route-specific checking of the CEFR level.
- Unsupported boundaries: “the only IELTS variant accepted” is overbroad because UKVI also names IELTS Life Skills; the page cannot present one static spouse/extension/ILR/citizenship/student level table as universally applicable without linking each current route rule; “same content but stricter security” must be limited to what IELTS itself says about the selected product.
- Reader must confirm: exact visa/nationality route, required level and components, approved IELTS product/location, date, price and result-use window.
- Recommended status: `verification-pending`.

## Canada

### `src/content/guides/tef-canada-immigration.md`

- Final decision authority: [IRCC — Express Entry language test results](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html)
- Exam owner: [Le français des affaires — TEF Canada](https://www.lefrancaisdesaffaires.fr/tests-diplomes/test-evaluation-francais-tef/tef-canada/)
- Supported:
  - IRCC accepts TEF Canada and TCF Canada for Express Entry, uses NCLC for French, publishes programme-specific minimums and official score-conversion tables, and currently requires results to be less than two years old at profile and permanent-residence application stages.
  - The TEF owner supports the current TEF Canada components, administration and centre information.
- Unsupported boundaries: the Express Entry page does not establish acceptance for every immigration or citizenship use; TEF scores are not “CLB 0 to 5+”; do not claim broader international availability, equal purpose, strategic advantage, fee, or local date.
- Reader must confirm: exact IRCC programme/application, current conversion table, result validity at submission, test centre, session and fee.
- Recommended status: `verification-pending`.

### `src/content/guides/tcf-canada-vs-tef.md`

- Final decision authority: [IRCC — Express Entry language test results](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html)
- Exam owners: [France Éducation international — TCF Canada](https://www.france-education-international.fr/test/tcf-canada); [Le français des affaires — TEF Canada](https://www.lefrancaisdesaffaires.fr/tests-diplomes/test-evaluation-francais-tef/tef-canada/)
- Supported: IRCC lists both tests for Express Entry and supplies test-specific conversion tables; each owner supports only its own current format, registration and centres.
- Unsupported boundaries: “equivalent scores,” “same immigration streams,” “no strategic advantage,” adaptive format, relative question counts, and relative centre availability are not established across the reviewed sources as universal conclusions.
- Reader must confirm: target IRCC programme, accepted test/version, current conversion, timing and local availability before choosing.
- Recommended status: `verification-pending`.

## Italy

### `src/content/guides/cils-vs-celi-vs-plida-for-italian-citizenship.md`

- Final decision authority: [Italian Ministry of Foreign Affairs — citizenship](https://www.esteri.it/it/servizi-opportunita/italiani-all-estero/cittadinanza/)
- Exam owners: [CILS — University for Foreigners of Siena](https://cils.unistrasi.it/); [CELI — University for Foreigners of Perugia](https://www.cvcl.it/); [PLIDA — Società Dante Alighieri](https://plida.dante.global/)
- Supported:
  - The Ministry page states a language level not lower than B1 for the citizenship applications in its stated scope and lists admitted certification bodies, including CILS, CELI and PLIDA (plus other named bodies).
  - Each exam owner supports its own certificate name, level, format, sessions and centres.
- Unsupported boundaries: “most accept all three,” consular variation, citizenship-specific content, relative availability, and recommendations based on nearest/earliest centre are not final-authority conclusions.
- Reader must confirm: exact citizenship basis, authority/consulate handling the case, current exemption/alternative-proof rule, accepted certificate version, centre and session.
- Recommended status: `verification-pending`.

### `src/content/guides/cils-b1-cittadinanza-for-italian-citizenship.md`

- Final decision authorities: [Italian Interior Ministry — citizenship](https://libertaciviliimmigrazione.dlci.interno.gov.it/temi/temi/cittadinanza); [Foreign Ministry — citizenship evidence](https://www.esteri.it/it/servizi-opportunita/italiani-all-estero/cittadinanza/)
- Exam owner: [CILS — University for Foreigners of Siena](https://cils.unistrasi.it/)
- Supported: the Interior Ministry states the language requirement applies to citizenship applications by marriage and residence; the Foreign Ministry states the B1 floor and recognised certification bodies within its stated procedure; Siena owns CILS.
- Unsupported boundaries: the guide's “4+ years for non-EU” assertion is not supported and conflicts with route-specific nationality law categories; marriage timing is not a statement of who “needs CILS”; no source makes CILS universally mandatory because alternative proof and exemptions exist.
- Reader must confirm: citizenship basis and timing with the responsible authority, whether an exemption/alternative applies, and the accepted CILS product/session with the owner/centre.
- Recommended status: `verification-pending`.

## France

### `src/content/guides/delf-b1-b2-french-work-study.md`

- Final decision authority: the receiving university, grande école, employer, or professional regulator; **unresolved until that institution is identified**.
- Exam owners: [France Éducation international — DELF tout public](https://www.france-education-international.fr/diplome/delf-tout-public); [DALF](https://www.france-education-international.fr/diplome/dalf)
- Supported: France Éducation international owns DELF/DALF and supports the levels, assessed skills, diploma characteristics, current sessions/centres and any validity statement it expressly publishes.
- Unsupported boundaries: no single final authority governs all “work and study”; “universities often require B2 or C1,” teaching/translation acceptance, professional use, and citizenship substitution cannot be generalised from the exam-owner page.
- Reader must confirm: the named receiving institution/regulator's current accepted proof, minimum score/level, validity and submission deadline before booking.
- Recommended status: `verification-pending`.

### `src/content/guides/tcf-irn-french-residence.md`

- Final decision authority: the receiving prefecture/authority for the selected procedure; **the precise route page remains unresolved in this package**.
- Exam owner: [France Éducation international — TCF IRN](https://www.france-education-international.fr/test/tcf-irn?langue=fr)
- Supported: France Éducation international supports TCF IRN's stated purposes, current four-test format, results and centres; it tells candidates to contact centres for dates and fees and states that the prefecture decides dispensations.
- Unsupported boundaries: one naturalisation page does not establish rules for marriage, every multi-year residence permit, or every residence card; the guide's universal applicant list and A1/A2/B1 mapping require separate route-specific final-authority pages.
- Reader must confirm: precise residence/nationality procedure, required level, accepted evidence and exemption with the prefecture/official procedure; current TCF IRN centre, session, fee and result-use conditions.
- Recommended status: `verification-pending`.

## Finland

### `src/content/guides/yki-finnish-citizenship.md`

- Final decision authority: [Finnish Immigration Service — language skills for citizenship](https://migri.fi/en/language-skills)
- Exam owner: [Finnish National Agency for Education — YKI](https://www.oph.fi/en/national-certificates-language-proficiency-yki)
- Supported: Migri controls citizenship eligibility and directs applicants to its current language-skills evidence rules; the Finnish National Agency for Education owns YKI and supports its languages, levels, components, registration and test centres.
- Unsupported boundaries: YKI's intermediate level must not be described as the only proof; the reviewed pages do not support the guide's universal five-year residence, marriage, or EU long-term-resident lists; citizenship and permanent residence are separate procedures.
- Reader must confirm: current citizenship eligibility, residence-period calculation, acceptable evidence/exemption, required YKI subtest combination, centre, date and fee.
- Recommended status: `verification-pending`.

### `src/content/guides/yki-vs-other-finland-options.md`

- Final decision authority: [Migri — language skills for citizenship](https://migri.fi/en/language-skills)
- Exam owner: [Finnish National Agency for Education — YKI](https://www.oph.fi/en/national-certificates-language-proficiency-yki)
- Supported: Migri's language-skills page is the controlling list of acceptable ways to demonstrate skills for a citizenship application; the YKI owner supports only YKI product/administration facts.
- Unsupported boundaries: “YKI is the default/most widely accepted,” university-course acceptance in general, broad education exemptions, and recognition by unrelated agencies must not be inferred; retain only evidence types and conditions stated on the current Migri page.
- Reader must confirm: which Migri-listed evidence matches the exact qualification and whether documents/subtests meet its conditions.
- Recommended status: `verification-pending`.

## Netherlands

### `src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md`

- Final decision authorities: [IND — civic integration for stronger residence or naturalisation](https://ind.nl/en/living-in-the-netherlands-with-a-residence-permit/civic-integration-for-more-secure-residence-permit-and-naturalisation); [IND — becoming a Dutch national through naturalisation](https://ind.nl/en/dutch-citizenship/becoming-a-dutch-national-through-naturalisation)
- Exam/implementation authority: [DUO — taking the integration exam](https://www.inburgeren.nl/en/taking-the-integration-exam/index.jsp)
- Supported: IND controls the current immigration/naturalisation conditions in each named procedure; DUO controls civic-integration duties, exam components, level/pathway, registration and results within the case information it displays.
- Unsupported boundaries: “A2 for most routes,” a general B1 reform rule, universal five-year coverage, family-reunion scope, deadlines and fines cannot be stated without selecting the reader's applicable IND/DUO procedure and start date.
- Reader must confirm: exact residence/naturalisation route, integration-law cohort, level, exemption, deadline and exam components in Mijn Inburgering/with IND or DUO.
- Recommended status: `verification-pending`.

### `src/content/guides/staatsexamen-nt2-for-work-and-higher-education.md`

- Final decision authority: the receiving educational institution, employer or professional regulator; **unresolved until identified**.
- Exam owner: [College voor Toetsen en Examens — Staatsexamen NT2](https://www.staatsexamensnt2.nl/)
- Supported: the official exam site supports Programme I/II levels, skills, registration, sessions and results as currently published.
- Unsupported boundaries: the exam owner does not establish universal admission, employment or professional-registration acceptance; “Programme I for jobs/MBO,” “Programme II for every HBO/university,” and “NT2 is the one” must not be presented as automatic outcomes.
- Reader must confirm: the named institution/employer/regulator's accepted programme, scores, validity, deadline and any additional evidence before registering.
- Recommended status: `verification-pending`.

## Package-level unresolved items

- Exact page-specific final authority remains unresolved for France work/study and Netherlands work/study because the receiving institution/regulator varies by reader.
- Local test-centre URLs, fees, dates, availability, registration deadlines and retake rules remain unresolved for all pages until a reader selects a country/city/centre and checks the owner or authorised centre.
- Applicant-specific eligibility, residence-period calculations, exemptions, alternate evidence and outcomes remain for the final authority to determine.
- Before any guide is promoted above `verification-pending`, an editor must remove or constrain every unsupported assertion identified here, add traceable source rows, and repeat the official-source review against the then-current pages.
