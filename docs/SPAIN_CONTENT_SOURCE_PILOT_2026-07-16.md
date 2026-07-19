# Spain content source pilot

Review date: 2026-07-16 (Asia/Shanghai)
Re-review date: 2026-07-19 (Asia/Shanghai)
Human acceptance date: 2026-07-19 (Asia/Shanghai)
Scope: `dele-levels-spanish-citizenship` and `dele-a2-ccse-spanish-citizenship` only.

## Gate decision

`SOURCE_GATE_PASSED_WITH_APPLICANT_BOUNDARY`

Agent source and wording re-review: `AGENT_REREVIEW_COMPLETED_WITH_APPLICANT_BOUNDARY`

Human acceptance gate: `ACCEPTED_BY_PROJECT_OWNER`

Acceptance evidence: explicit user confirmation in the Codex task on 2026-07-19. The reviewer is recorded at the project-owner role level because no personal name was provided; no identity is inferred from a local account, repository path, or Git metadata.

The current Ministry of Justice residence-nationality procedure and electronic filing pages close the previous absence of a deciding-authority source. They confirm the competent procedure, link the Instituto Cervantes test-dispensation process, and state that the application requires supporting documents. Instituto Cervantes remains the exam owner for DELE and CCSE product rules.

This does not support an individual eligibility decision, a universal two-test rule, a fixed residence-period shortcut, or a universal exemption conclusion. Both guides remain `verification-pending` and direct the reader to the Ministry procedure before booking.

The human acceptance closes only the final-wording review gate for these two bounded rewrites. It does not change their source-review date, content maturity, authority hierarchy, applicant boundary, or reader-side verification actions.

## Approved official sources

| Authority | URL | Permitted support | Boundary |
|---|---|---|---|
| Ministry of Justice | https://www.mjusticia.gob.es/es/ciudadania/tramites/nacionalidad-residencia | Residence-nationality procedure exists; residence, civic conduct and integration are part of the procedure; separate application paths include Cervantes-test dispensation | Does not decide the reader's category, residence calculation, evidence or exemption |
| Ministry of Justice electronic office | https://sede.mjusticia.gob.es/es/tramites/nacionalidad-espanola | Electronic residence-nationality filing and a separate Cervantes-test dispensation process | Does not prove that a named test applies to every applicant |
| Instituto Cervantes nationality tests | https://examenes.cervantes.es/es/presentacion/nacionalidad | DELE/CCSE product orientation for nationality cases and referral of acquisition questions to the Ministry | Exam owner cannot decide citizenship eligibility |
| Instituto Cervantes DELE FAQ | https://examenes.cervantes.es/es/dele/preguntas-frecuentes | DELE product levels, registration, sessions and the exam owner's nationality-test explanation | Local acceptance and applicant exemption remain Ministry matters |
| Instituto Cervantes CCSE FAQ | https://examenes.cervantes.es/es/ccse/preguntas-frecuentes | CCSE product, registration, format and candidate process | Does not decide the reader's citizenship route |

## Claim matrix

| Claim | Risk | Deciding authority | Required source | Located source | Source date | Support level | Allowed wording | Prohibited wording | Action |
|---|---|---|---|---|---|---|---|---|---|
| Residence nationality is a Ministry of Justice procedure | High | Spanish Ministry of Justice | Current Ministry procedure | https://www.mjusticia.gob.es/es/ciudadania/tramites/nacionalidad-residencia | Checked 2026-07-16 | fully supports | Identify the Ministry procedure as the deciding-authority starting point | VisaLang decides eligibility | Add authority link |
| Every applicant must take DELE A2 and CCSE | High | Spanish Ministry of Justice | Applicant-category requirement and dispensation decision | Ministry procedure plus https://sede.mjusticia.gob.es/es/tramites/nacionalidad-espanola | Checked 2026-07-16 | does not support universally | Ask which evidence and dispensation apply | “Both exams are required for everyone” | Keep removed |
| DELE A2 or higher appears in Cervantes nationality guidance | High | Spanish Ministry of Justice for acceptance; Instituto Cervantes for product | Ministry procedure plus exam-owner guidance | https://examenes.cervantes.es/es/presentacion/nacionalidad and DELE FAQ | Checked 2026-07-16 | partially supports | Attribute the product statement to Cervantes and require Ministry confirmation | Present A2 as an individual legal conclusion | Add bounded wording |
| SIELE is accepted for citizenship | High | Spanish Ministry of Justice | Current accepted-evidence rule | No supporting Ministry source located | Checked 2026-07-16 | does not support | Ask whether alternative proof applies | Treat SIELE as accepted | Keep as verification question only |
| Residence years or nationality shortcuts | High | Spanish Ministry of Justice | Applicant-specific residence rule and calculation | General Ministry procedure only | Checked 2026-07-16 | partially supports | Ask the Ministry to confirm the applicable procedure and calculation | Publish fixed year shortcuts | Keep removed |
| Dispensation can exist | High | Spanish Ministry of Justice | Current dispensation procedure | https://sede.mjusticia.gob.es/es/tramites/nacionalidad-espanola | Checked 2026-07-16 | fully supports | Link the procedure and require an authority decision | Promise an exemption | Add bounded wording |
| Current fees, dates and centres | Medium | Instituto Cervantes and selected authorised centre | Current product and centre page | Cervantes DELE and CCSE FAQ/product pages | Checked 2026-07-16 | partially supports | Direct readers to the current product/centre page | Publish global fixed values | Keep dynamic |
| Higher DELE levels improve citizenship outcome | High | Spanish Ministry of Justice | Current accepted-evidence and outcome rule | No supporting official source located | Checked 2026-07-16 | does not support | No benefit conclusion | Claim higher is better or unnecessary | Keep removed |

## Page disposition

### `dele-levels-spanish-citizenship`

- Source review: reviewed again on 2026-07-19 for the narrow claims retained.
- Content maturity: remains `verification-pending`.
- Safe additions: Ministry procedure link, separation of citizenship authority from exam owner, bounded description of Cervantes product guidance.
- Still unresolved: applicant category, accepted evidence, individual dispensation, and any alternative certificate.

### `dele-a2-ccse-spanish-citizenship`

- Source review: reviewed again on 2026-07-19 for the narrow claims retained.
- Content maturity: remains `verification-pending`.
- Safe additions: Ministry procedure and dispensation links, separation of application requirements from DELE/CCSE product execution.
- Still unresolved: applicant-specific residence calculation, required evidence, dispensation result, centre, date, fee and retake terms.

## Stop rules retained

- Do not promote either page from `verification-pending` in this window.
- Do not infer an individual result from the existence of a Ministry procedure or a Cervantes FAQ.
- Do not add residence-period, nationality-exception, fee, date or universal two-test statements without a page-specific current authority source.

## 2026-07-19 agent re-review evidence

| Source | Access result | Current locator / short exact quote | Permitted support | Boundary |
|---|---|---|---|---|
| Spanish Ministry of Justice residence-nationality procedure | HTTP 200 | Main content: “La obtención de la nacionalidad por residencia requiere…” | Identifies residence nationality as the Ministry procedure and states that the applicable residence period, civic conduct and integration form part of that procedure | Does not determine the reader's applicable period, evidence or outcome |
| Ministry electronic office residence-nationality page | HTTP 200 | “Solicitud de Dispensas de las pruebas del Instituto Cervantes” and the separate online application section | Confirms electronic residence-nationality filing and a separate Cervantes-test dispensation application | The existence of a dispensation process does not establish an individual dispensation |
| Instituto Cervantes nationality-tests page | HTTP 200 | “dos pruebas requisitos… en determinados supuestos” and “DELE nivel A2 o superior y la prueba CCSE” | Attributes the named products and the important “certain cases” boundary to the exam owner | Does not decide which product or dispensation applies to the reader |
| Instituto Cervantes DELE A2 page | HTTP 200 | “Exámenes DELE A2”; product abilities and four-part format | Supports only the current DELE A2 product and format | Does not establish citizenship acceptance or comparative benefit |
| Instituto Cervantes CCSE exam page | HTTP 200 | “La prueba CCSE consta de cinco tareas y de 25 preguntas” | Supports only the current CCSE product structure | Does not establish applicant category, citizenship eligibility or exemption |

The previously listed DELE and CCSE FAQ URLs timed out in this review and were not needed for the retained public claims. No inaccessible FAQ statement was used to promote or expand either page.

## Agent wording and route disposition — 2026-07-19

- Completed an authority-first pre-review of the two public rewrites with the applicant boundary retained; this is not a human acceptance decision.
- Replaced broad product links with the direct current DELE A2 and CCSE product pages.
- Kept `sourceReviewStatus: reviewed` for the bounded page facts and updated the real review date to 2026-07-19.
- Kept `contentStatus: verification-pending`; this review does not resolve applicant-specific evidence, dispensation, residence calculation or local execution.
- Corrected the main route to `dele-a2-ccse-spanish-citizenship` → `dele-levels-spanish-citizenship` → terminal. The choice page no longer sends readers back to the requirement page, and the primary next page is not duplicated in supporting links.
- The project owner explicitly accepted the final wording on 2026-07-19, closing the human wording-review queue item. Both pages remain `verification-pending` for applicant-specific evidence, dispensation, residence calculation and local execution.
