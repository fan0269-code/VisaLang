# T24 — B1 settlement and citizenship source ledger

Checked date: **2026-09-13**. Planning authority: Master Plan C09 and backlog T24. This is an implementing source record for independent audit, not an Auditor PASS, owner approval or release authorization.

## Method and observed limitations

- Read actual § 9, § 18c, consolidated StAG § 10–11, and IntV § 17 provisions through the web tool. § 2 single-page open timed out, but the official search result returned the complete relevant paragraphs (9) and (11), which were read; the consolidated Residence Act result corroborated them. Direct StAG § 10 timed out; the official consolidated Act was opened and the complete relevant provision read.
- BAMF final-examination pages (English and German) returned HTTP 403. Retained BAMF link is an owner starting point, not evidence of a completed page review. The old attributed “BAMF explains” sentence was replaced with a verified IntV § 17 attribution. All retained DTZ/LiD factual content is supported by that ordinance.
- BAMF-NAvI supplied only its JavaScript application shell. It is a locator entry point, with no individual result verified. Every unresolved result includes a city/district official-website next action.
- Berlin sources were read for narrowly stated local examples only. The Berlin naturalisation excluded-title list is not identical to the consolidated current statute. Candidate does not copy either list or resolve individual applicability; it explicitly uses the statute for law and sends discrepancies to the competent authority.
- No fee, test duration, processing duration, numeric qualifying period, individual acceptance or exemption conclusion is newly published in T24. Existing centre questions remain questions, not factual promises.
- Editorial worksheets, scenarios, dependency fields and copyable questions are original reader aids; blank fields do not assert facts. All high-risk factual categories retained or added are mapped below. Publisher facts are paraphrased; statutory sources control the legal claim boundaries.

## germany-b1-settlement-citizenship

- **usedBy:** `src/pages/germany-b1-settlement-citizenship.astro`; route `/germany-b1-settlement-citizenship/`
- **Reader task:** Choose procedure, then read an independent legal-heading result.
- **Distinct intent / planning basis:** C09 routing hub; preserve existing route and publication state.
- **Related links:** Independent results and checklist anchors; C10 comparison, knowledge guide, booking guide, study guide, timeline.
- **Next action:** Pick only an authority-named heading; otherwise use unknown route and request an official route/checklist.
- **Risk / boundary:** Heading selection is not an eligibility classifier. Route tools remain planning tools and are not asserted to implement the new legal branches.
- **Maintenance:** recheck quarterly and after legal/procedural change; per-centre facts always require a selected-centre current check.

The hub renders `src/components/B1RoutePaths.astro` from `src/data/b1-route-paths.ts`. These implementation files share this usedBy record. The unknown result assigns no language level and links to the dedicated unresolved checklist.

### germany-b1-settlement-citizenship / S9

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__9.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 9(2), numbers 1–9; following exception/evidence sentences
- **Allowed support:** General settlement lists language and knowledge separately and retains wider conditions.
- **Boundary:** Not every settlement route; no individual eligibility or certificate-format decision.
- **usedBy:** `src/pages/germany-b1-settlement-citizenship.astro`

### germany-b1-settlement-citizenship / S2

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__2.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 2(9), (11)
- **Allowed support:** Simple German maps to A1; sufficient German maps to B1 in this Act.
- **Boundary:** Definitions do not select a route or decide acceptable evidence.
- **usedBy:** `src/pages/germany-b1-settlement-citizenship.astro`

### germany-b1-settlement-citizenship / S18

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__18c.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 18c(1), numbers 1–5 and final sentence; § 18c(2)
- **Allowed support:** Skilled-worker settlement language and cross-references; Blue Card A1/B1 qualifying-period distinction; employment and contribution evidence matter.
- **Boundary:** No work-visa-wide B1 rule, personal period calculation, assessment of German qualifications or exception decision. No numeric period copied into the candidate.
- **usedBy:** `src/pages/germany-b1-settlement-citizenship.astro`

### germany-b1-settlement-citizenship / ST

- **Source URL:** https://www.gesetze-im-internet.de/stag/BJNR005830913.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 10(1), (4), (4a), (5), (6); § 11
- **Allowed support:** General naturalisation language and civic knowledge are distinct; B1 examination standard; special rules and exceptions exist; wider conditions/exclusions remain.
- **Boundary:** No individual route assignment, universal certificate list, residence-date calculation or exception conclusion. Full text used after direct § 10 page timed out.
- **usedBy:** `src/pages/germany-b1-settlement-citizenship.astro`

### germany-b1-settlement-citizenship / NP

- **Source URL:** https://www.einbuergerung.de/ablauf.php?l=en
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Government Commissioner for Migration, Refugees and Integration / Anti-Racism
- **Locator:** Step 2: Personalised information; Step 3 closing document-list boundary; Step 4
- **Allowed support:** Town/city or district administration can identify nationality authority; authority provides forms/information and additional document needs.
- **Boundary:** Orientation only. No portal fees, processing estimates, simplified evidence conclusions or eligibility statements are imported.
- **usedBy:** `src/pages/germany-b1-settlement-citizenship.astro`

### germany-b1-settlement-citizenship / NAV

- **Source URL:** https://bamf-navi.bamf.de/en/Themen/Behoerden/?typ=ABH
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Office for Migration and Refugees (BAMF)
- **Locator:** Authorities application entry and JavaScript notice
- **Allowed support:** Authority-locator entry point only.
- **Boundary:** Only shell readable in browser tool; no returned authority result verified. Candidate also supplies city/district official-site next action.
- **usedBy:** `src/pages/germany-b1-settlement-citizenship.astro`

## goethe-b1-germany-settlement-work

- **usedBy:** `src/content/guides/goethe-b1-germany-settlement-work.md`; route `/guides/goethe-b1-germany-settlement-work/`
- **Reader task:** Identify the settlement provision before selecting language proof.
- **Distinct intent / planning basis:** C09 settlement task; retain historic work-containing slug and explicitly delimit it.
- **Related links:** Hub results; separate § 9 / § 18c checklist anchors; C10 comparison, timeline.
- **Next action:** Ask the foreigners authority for the exact statutory service and three evidence categories.
- **Risk / boundary:** No blanket B1 for employment; no case/qualifying-period/exception decision. Berlin illustration cannot supply another city’s procedure.
- **Maintenance:** recheck quarterly and after legal/procedural change; per-centre facts always require a selected-centre current check.

### goethe-b1-germany-settlement-work / S9

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__9.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 9(2), numbers 1–9; following exception/evidence sentences
- **Allowed support:** General settlement lists language and knowledge separately and retains wider conditions.
- **Boundary:** Not every settlement route; no individual eligibility or certificate-format decision.
- **usedBy:** `src/content/guides/goethe-b1-germany-settlement-work.md`

### goethe-b1-germany-settlement-work / S2

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__2.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 2(9), (11)
- **Allowed support:** Simple German maps to A1; sufficient German maps to B1 in this Act.
- **Boundary:** Definitions do not select a route or decide acceptable evidence.
- **usedBy:** `src/content/guides/goethe-b1-germany-settlement-work.md`

### goethe-b1-germany-settlement-work / S18

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__18c.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 18c(1), numbers 1–5 and final sentence; § 18c(2)
- **Allowed support:** Skilled-worker settlement language and cross-references; Blue Card A1/B1 qualifying-period distinction; employment and contribution evidence matter.
- **Boundary:** No work-visa-wide B1 rule, personal period calculation, assessment of German qualifications or exception decision. No numeric period copied into the candidate.
- **usedBy:** `src/content/guides/goethe-b1-germany-settlement-work.md`

### goethe-b1-germany-settlement-work / BS

- **Source URL:** https://service.berlin.de/dienstleistung/121864/
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Land Berlin, ServicePortal / Landesamt für Einwanderung
- **Locator:** Introduction: Ausnahmen; Voraussetzungen: Ausreichende Deutsch-Kenntnisse and Grundkenntnisse; Erforderliche Unterlagen
- **Allowed support:** Berlin general-settlement service separates language/knowledge and points specified groups to other services.
- **Boundary:** Berlin-only procedural illustration. No local dates, fees, livelihood detail or residence calculations are generalised.
- **usedBy:** `src/content/guides/goethe-b1-germany-settlement-work.md`

### goethe-b1-germany-settlement-work / G

- **Source URL:** https://www.goethe.de/ins/de/en/prf/prf/gzb1.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Goethe-Institut
- **Locator:** Goethe-Zertifikat B1 description; Testing locations; Practice materials
- **Allowed support:** Exact B1 product identity; owner offers practice material and links to local dates/prices.
- **Boundary:** No universal immigration acceptance, certificate format decision, local seat, fee or timing claim.
- **usedBy:** `src/content/guides/goethe-b1-germany-settlement-work.md`

### goethe-b1-germany-settlement-work / NAV

- **Source URL:** https://bamf-navi.bamf.de/en/Themen/Behoerden/?typ=ABH
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Office for Migration and Refugees (BAMF)
- **Locator:** Authorities application entry and JavaScript notice
- **Allowed support:** Authority-locator entry point only.
- **Boundary:** Only shell readable in browser tool; no returned authority result verified. Candidate also supplies city/district official-site next action.
- **usedBy:** `src/content/guides/goethe-b1-germany-settlement-work.md`

## germany-b1-citizenship-language-proof

- **usedBy:** `src/content/guides/germany-b1-citizenship-language-proof.md`; route `/guides/germany-b1-citizenship-language-proof/`
- **Reader task:** Organise the naturalisation language question in its own wider file.
- **Distinct intent / planning basis:** C09 citizenship task; maintain independent intent and slug.
- **Related links:** Citizenship-only checklist; LiD evidence guide; C10 comparison.
- **Next action:** Ask nationality authority for its language, knowledge, wider-file and possible special-rule assessment instructions.
- **Risk / boundary:** § 10 general route only. Other nationality routes remain unresolved, with concrete authority enquiry. No certificate is declared accepted.
- **Maintenance:** recheck quarterly and after legal/procedural change; per-centre facts always require a selected-centre current check.

### germany-b1-citizenship-language-proof / ST

- **Source URL:** https://www.gesetze-im-internet.de/stag/BJNR005830913.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 10(1), (4), (4a), (5), (6); § 11
- **Allowed support:** General naturalisation language and civic knowledge are distinct; B1 examination standard; special rules and exceptions exist; wider conditions/exclusions remain.
- **Boundary:** No individual route assignment, universal certificate list, residence-date calculation or exception conclusion. Full text used after direct § 10 page timed out.
- **usedBy:** `src/content/guides/germany-b1-citizenship-language-proof.md`

### germany-b1-citizenship-language-proof / BC

- **Source URL:** https://service.berlin.de/dienstleistung/318998/
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Land Berlin, ServicePortal / Landesamt für Einwanderung
- **Locator:** Erforderliche Unterlagen: Sprachnachweis; Nachweis der Kenntnisse der deutschen Rechts- und Gesellschaftsordnung
- **Allowed support:** Separate local language and knowledge document headings illustrate why the reader needs a local checklist.
- **Boundary:** Berlin-only example. Specific title exclusions on this page are not copied: they differ from the current consolidated StAG text. Statute governs legal wording; authority resolves local case/procedure.
- **usedBy:** `src/content/guides/germany-b1-citizenship-language-proof.md`

### germany-b1-citizenship-language-proof / NP

- **Source URL:** https://www.einbuergerung.de/ablauf.php?l=en
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Government Commissioner for Migration, Refugees and Integration / Anti-Racism
- **Locator:** Step 2: Personalised information; Step 3 closing document-list boundary; Step 4
- **Allowed support:** Town/city or district administration can identify nationality authority; authority provides forms/information and additional document needs.
- **Boundary:** Orientation only. No portal fees, processing estimates, simplified evidence conclusions or eligibility statements are imported.
- **usedBy:** `src/content/guides/germany-b1-citizenship-language-proof.md`

## germany-b1-leben-in-deutschland-and-language-proof

- **usedBy:** `src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md`; route `/guides/germany-b1-leben-in-deutschland-and-language-proof/`
- **Reader task:** Read actual test documents without merging language and knowledge evidence.
- **Distinct intent / planning basis:** C09 knowledge task; preserve slug and integration-course evidence boundaries.
- **Related links:** Separate settlement and citizenship guides; terminal checklist; C10 comparison.
- **Next action:** Record actual document/result in each lane and ask authority which category and result condition it satisfies.
- **Risk / boundary:** Any-result LiD equivalence explicitly rejected; no score/fee/timing invented. BAMF article unavailable, so verified ordinance is the claim source.
- **Maintenance:** recheck quarterly and after legal/procedural change; per-centre facts always require a selected-centre current check.

### germany-b1-leben-in-deutschland-and-language-proof / I17

- **Source URL:** https://www.gesetze-im-internet.de/intv/__17.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 17(1), (2), (4), (5)
- **Allowed support:** DTZ A2–B1 language test, separate LiD; successful integration course needs B1 and required orientation-test result; LiD may support nationality knowledge subject to applicable test rules.
- **Boundary:** Does not mean any LiD score qualifies; no invented score, acceptance, certificate validity, fee or result interval. Candidate directs actual-result verification to authority.
- **usedBy:** `src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md`

### germany-b1-leben-in-deutschland-and-language-proof / ST

- **Source URL:** https://www.gesetze-im-internet.de/stag/BJNR005830913.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 10(1), (4), (4a), (5), (6); § 11
- **Allowed support:** General naturalisation language and civic knowledge are distinct; B1 examination standard; special rules and exceptions exist; wider conditions/exclusions remain.
- **Boundary:** No individual route assignment, universal certificate list, residence-date calculation or exception conclusion. Full text used after direct § 10 page timed out.
- **usedBy:** `src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md`

### germany-b1-leben-in-deutschland-and-language-proof / NP

- **Source URL:** https://www.einbuergerung.de/ablauf.php?l=en
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Government Commissioner for Migration, Refugees and Integration / Anti-Racism
- **Locator:** Step 2: Personalised information; Step 3 closing document-list boundary; Step 4
- **Allowed support:** Town/city or district administration can identify nationality authority; authority provides forms/information and additional document needs.
- **Boundary:** Orientation only. No portal fees, processing estimates, simplified evidence conclusions or eligibility statements are imported.
- **usedBy:** `src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md`

## germany-b1-settlement-citizenship-checklist

- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-checklist.md`; route `/guides/germany-b1-settlement-citizenship-checklist/`
- **Reader task:** Use a route-specific final evidence recheck.
- **Distinct intent / planning basis:** C09 independent checklists; preserve terminal review task and slug.
- **Related links:** Five stable checklist anchors; requirement guides; C10 comparison; timeline.
- **Next action:** Resolve the exact gap with the foreigners or nationality authority named by the selected checklist.
- **Risk / boundary:** These are original question worksheets, not complete official document lists, eligibility outputs, or submission permission. Unknown remains unresolved.
- **Maintenance:** recheck quarterly and after legal/procedural change; per-centre facts always require a selected-centre current check.

### germany-b1-settlement-citizenship-checklist / S9

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__9.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 9(2), numbers 1–9; following exception/evidence sentences
- **Allowed support:** General settlement lists language and knowledge separately and retains wider conditions.
- **Boundary:** Not every settlement route; no individual eligibility or certificate-format decision.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-checklist.md`

### germany-b1-settlement-citizenship-checklist / S2

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__2.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 2(9), (11)
- **Allowed support:** Simple German maps to A1; sufficient German maps to B1 in this Act.
- **Boundary:** Definitions do not select a route or decide acceptable evidence.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-checklist.md`

### germany-b1-settlement-citizenship-checklist / S18

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__18c.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 18c(1), numbers 1–5 and final sentence; § 18c(2)
- **Allowed support:** Skilled-worker settlement language and cross-references; Blue Card A1/B1 qualifying-period distinction; employment and contribution evidence matter.
- **Boundary:** No work-visa-wide B1 rule, personal period calculation, assessment of German qualifications or exception decision. No numeric period copied into the candidate.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-checklist.md`

### germany-b1-settlement-citizenship-checklist / ST

- **Source URL:** https://www.gesetze-im-internet.de/stag/BJNR005830913.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 10(1), (4), (4a), (5), (6); § 11
- **Allowed support:** General naturalisation language and civic knowledge are distinct; B1 examination standard; special rules and exceptions exist; wider conditions/exclusions remain.
- **Boundary:** No individual route assignment, universal certificate list, residence-date calculation or exception conclusion. Full text used after direct § 10 page timed out.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-checklist.md`

### germany-b1-settlement-citizenship-checklist / NP

- **Source URL:** https://www.einbuergerung.de/ablauf.php?l=en
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Government Commissioner for Migration, Refugees and Integration / Anti-Racism
- **Locator:** Step 2: Personalised information; Step 3 closing document-list boundary; Step 4
- **Allowed support:** Town/city or district administration can identify nationality authority; authority provides forms/information and additional document needs.
- **Boundary:** Orientation only. No portal fees, processing estimates, simplified evidence conclusions or eligibility statements are imported.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-checklist.md`

### germany-b1-settlement-citizenship-checklist / NAV

- **Source URL:** https://bamf-navi.bamf.de/en/Themen/Behoerden/?typ=ABH
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Office for Migration and Refugees (BAMF)
- **Locator:** Authorities application entry and JavaScript notice
- **Allowed support:** Authority-locator entry point only.
- **Boundary:** Only shell readable in browser tool; no returned authority result verified. Candidate also supplies city/district official-site next action.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-checklist.md`

## germany-b1-settlement-citizenship-timeline

- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-timeline.md`; route `/guides/germany-b1-settlement-citizenship-timeline/`
- **Reader task:** Plan evidence dependencies after route and owner confirmation.
- **Distinct intent / planning basis:** C09 preparation timeline; preserve confirmed-date task and slug.
- **Related links:** Separate settlement/citizenship checklists and requirement guides; booking/finder references retained.
- **Next action:** Enter only reader or owner-confirmed dates; request missing dates from responsible authority or centre.
- **Risk / boundary:** Original blank worksheets add no statutory periods, official buffers, result dates, retake seats or processing promises.
- **Maintenance:** recheck quarterly and after legal/procedural change; per-centre facts always require a selected-centre current check.

### germany-b1-settlement-citizenship-timeline / S9

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__9.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 9(2), numbers 1–9; following exception/evidence sentences
- **Allowed support:** General settlement lists language and knowledge separately and retains wider conditions.
- **Boundary:** Not every settlement route; no individual eligibility or certificate-format decision.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-timeline.md`

### germany-b1-settlement-citizenship-timeline / S18

- **Source URL:** https://www.gesetze-im-internet.de/aufenthg_2004/__18c.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 18c(1), numbers 1–5 and final sentence; § 18c(2)
- **Allowed support:** Skilled-worker settlement language and cross-references; Blue Card A1/B1 qualifying-period distinction; employment and contribution evidence matter.
- **Boundary:** No work-visa-wide B1 rule, personal period calculation, assessment of German qualifications or exception decision. No numeric period copied into the candidate.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-timeline.md`

### germany-b1-settlement-citizenship-timeline / ST

- **Source URL:** https://www.gesetze-im-internet.de/stag/BJNR005830913.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Ministry of Justice and Consumer Protection / Federal Office of Justice, Gesetze im Internet
- **Locator:** § 10(1), (4), (4a), (5), (6); § 11
- **Allowed support:** General naturalisation language and civic knowledge are distinct; B1 examination standard; special rules and exceptions exist; wider conditions/exclusions remain.
- **Boundary:** No individual route assignment, universal certificate list, residence-date calculation or exception conclusion. Full text used after direct § 10 page timed out.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-timeline.md`

### germany-b1-settlement-citizenship-timeline / NP

- **Source URL:** https://www.einbuergerung.de/ablauf.php?l=en
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Government Commissioner for Migration, Refugees and Integration / Anti-Racism
- **Locator:** Step 2: Personalised information; Step 3 closing document-list boundary; Step 4
- **Allowed support:** Town/city or district administration can identify nationality authority; authority provides forms/information and additional document needs.
- **Boundary:** Orientation only. No portal fees, processing estimates, simplified evidence conclusions or eligibility statements are imported.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-timeline.md`

### germany-b1-settlement-citizenship-timeline / G

- **Source URL:** https://www.goethe.de/ins/de/en/prf/prf/gzb1.html
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Goethe-Institut
- **Locator:** Goethe-Zertifikat B1 description; Testing locations; Practice materials
- **Allowed support:** Exact B1 product identity; owner offers practice material and links to local dates/prices.
- **Boundary:** No universal immigration acceptance, certificate format decision, local seat, fee or timing claim.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-timeline.md`

### germany-b1-settlement-citizenship-timeline / NAV

- **Source URL:** https://bamf-navi.bamf.de/en/Themen/Behoerden/?typ=ABH
- **Checked date:** 2026-09-13
- **Publisher / Owner:** Federal Office for Migration and Refugees (BAMF)
- **Locator:** Authorities application entry and JavaScript notice
- **Allowed support:** Authority-locator entry point only.
- **Boundary:** Only shell readable in browser tool; no returned authority result verified. Candidate also supplies city/district official-site next action.
- **usedBy:** `src/content/guides/germany-b1-settlement-citizenship-timeline.md`

## Verification handoff

- RED: `node tests/m4-b1-routes.test.mjs` exited 1 on `T24 provides production route outputs` before production data/component existed.
- GREEN: same command exited 0 after implementation, testing actual route-resolution outputs, distinct evidence lanes/authorities, unknown inputs, and checklist destinations. Existing Node package module-type warning only.
- Controller must run `node tests/m4-b1-routes.test.mjs --built` after its build. That checks actual rendered hub cards and every rendered checklist anchor.
- Controller owns broad tests, launch-check, planning map sync, Obsidian record, frozen-scope audit submission and separate Auditor result. Implementer has not rebuilt dist/.astro or modified shared tools/publication policy. The subsequent independent-review correction below records the narrowly authorized shared registry import/spread.

## Independent task-review corrections — registry binding and mobile tables

The independent task review identified a P2 integration gap against Master Plan §7.1. The controller explicitly expanded T24 ownership to `src/data/b1-route-claims.ts` and an import/spread in `src/data/claim-registry.ts`; no owner deviation is claimed.

- `b1-route-claims.ts` is the authoritative source for 13 T24 statements, importing the `Claim` type only. Each record has claimId, version `2026-09-13.1`, jurisdiction/route/audience/locale scope, conditions, exceptions, boundary, complete sourceRefs, sourceCheckedAt `2026-09-13`, nextReviewAt `2026-12-13`, status `verified`, source-review role and actual consumer IDs. Effective dates remain null rather than inferred from an amendment summary.
- `claim-registry.ts` imports and spreads those records. `b1-route-paths.ts` contains version references and navigational copy; it obtains legal field text and sources from the validated registry records. It uses `validateClaimSet` for the fixed English hub consumer and the current build date.
- Missing/withdrawn/wrong-version/expired/unauthorized-consumer/wrong-locale claims suppress language/knowledge/wider factual output and produce a concrete current-authority enquiry. Unknown routes assign no level or eligibility output.
- All five guide frontmatters bind `directAnswer` to explicit versioned `claimRefs`. Existing GuideLayout validation supplies the established stale-answer fallback. The maintained Markdown body is a dated article, not a runtime legal engine. Already-generated static HTML must be rebuilt after withdrawal/review expiry; this is the existing static delivery limitation, not a live claim of evergreen freshness.
- These claims are reused by the hub reading result and relevant article consumers. Generic Route Finder/Checklist Generator do not claim support for these additional legal branches and are not added to usedBy.
- Both retained assertions attributing substantive support to unread BAMF final-exam material were changed to the verified Integration Course Ordinance §17. The BAMF owner link remains an owner starting point with its failed-access limitation recorded above.
- Seven new tables now use the existing `responsive-table` container with role=region, tabindex=0, descriptive aria-label and a narrow-screen horizontal-scroll hint. No global CSS changed.

### Registry claim-to-consumer record

The exact sourceRefs/conditions/boundaries are part of each Claim object and bind to the same checked official provisions recorded per article above. `hub:germany-b1-settlement-citizenship` means the page + B1RoutePaths component + route model consumer, not a generic eligibility tool.

- `germany-b1-settlement-general-language@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:goethe-b1-germany-settlement-work`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`, `guide:germany-b1-leben-in-deutschland-and-language-proof`.
- `germany-b1-settlement-general-knowledge@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:goethe-b1-germany-settlement-work`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`, `guide:germany-b1-leben-in-deutschland-and-language-proof`.
- `germany-b1-settlement-general-wider-file@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:goethe-b1-germany-settlement-work`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`.
- `germany-b1-settlement-skilled-language@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:goethe-b1-germany-settlement-work`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`, `guide:germany-b1-leben-in-deutschland-and-language-proof`.
- `germany-b1-settlement-skilled-knowledge@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:goethe-b1-germany-settlement-work`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`, `guide:germany-b1-leben-in-deutschland-and-language-proof`.
- `germany-b1-settlement-skilled-wider-file@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:goethe-b1-germany-settlement-work`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`.
- `germany-b1-settlement-blue-card-language@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:goethe-b1-germany-settlement-work`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`, `guide:germany-b1-leben-in-deutschland-and-language-proof`.
- `germany-b1-settlement-blue-card-knowledge@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:goethe-b1-germany-settlement-work`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`, `guide:germany-b1-leben-in-deutschland-and-language-proof`.
- `germany-b1-settlement-blue-card-wider-file@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:goethe-b1-germany-settlement-work`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`.
- `germany-b1-citizenship-language@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:germany-b1-citizenship-language-proof`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`, `guide:germany-b1-leben-in-deutschland-and-language-proof`.
- `germany-b1-citizenship-knowledge@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:germany-b1-citizenship-language-proof`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`, `guide:germany-b1-leben-in-deutschland-and-language-proof`.
- `germany-b1-citizenship-wider-file@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `hub:germany-b1-settlement-citizenship`, `guide:germany-b1-citizenship-language-proof`, `guide:germany-b1-settlement-citizenship-checklist`, `guide:germany-b1-settlement-citizenship-timeline`.
- `germany-b1-integration-course-evidence@2026-09-13.1` — checked 2026-09-13; next review 2026-12-13; verified; usedBy: `guide:germany-b1-leben-in-deutschland-and-language-proof`.

### Correction verification

- Registry RED: `node tests/m4-b1-routes.test.mjs` exited 1 because an expired legal claim still emitted `route-information` instead of `unresolved`.
- Registry GREEN: after integration, the test uses the actual registry and mutates missing, withdrawn, wrong-version, unauthorized and wrong-locale records; all suppress facts. Replacing current claim text proves production route output actually consumes the registry statement.
- Mobile RED: the same suite rendered actual Markdown using `@astrojs/markdown-remark`, then failed because a new table lacked a contained horizontal-scroll wrapper.
- Mobile GREEN: all seven rendered tables are in labelled, focusable responsive regions. The --built mode also checks those wrappers in real generated pages after controller build.
- Final `node tests/m4-b1-routes.test.mjs` and `git diff --check`: exit 0. No build performed by implementing agent.
- Canonical final counts strip frontmatter, external URLs and HTML tags, then count Unicode word tokens per `tests/scheme-3-english-content-quality.test.mjs`: settlement 1697/9 min, citizenship 1590/8 min, knowledge 1555/8 min, checklist 1971/10 min, timeline 1657/9 min. Reading time is ceil(words/200).

These are correction/verification inputs; the same independent Auditor must re-review. No implementing-agent PASS or release authorization is recorded.

## Rendered test scope correction

Controller post-correction build exposed an overbroad test count: `node tests/m4-b1-routes.test.mjs --built` observed RED (`2 !== 1`) because GuideLayout adds an existing verification-responsibilities table outside the article Markdown. The test now excludes only a table inside the exact `source-fact-table` ancestor. It still requires literal per-article table counts 1/1/1/2/2 and asserts that every counted table has a responsive-table region, tabindex=0 and descriptive aria-label. No production source changed. Re-running `node tests/m4-b1-routes.test.mjs --built` returned GREEN (exit 0); `git diff --check` also exited 0. This run uses the controller's built artifacts; the implementing agent did not build.
