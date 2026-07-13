# Germany A1 High-Risk Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the seven existing Germany A1 family-reunion guides safer and more actionable using current official sources, without adding routes or overstating local or individual requirements.

**Architecture:** The source of truth remains the seven Markdown guides in `src/content/guides/`. A single audit document records source evidence and editorial decisions; the existing A1 cluster test remains the route-support regression guard, with its dates updated in Task 2 to distinguish audited from untouched guides. The existing Astro guide layout continues to render the shared guide structure, JSON-LD, FAQs, and route support.

**Tech Stack:** Astro 5 static site, Markdown content collections, Node.js assertion tests, npm scripts.

## Global Constraints

- Change only the seven Germany A1 guide files, `docs/PHASE_2_A1_CONTENT_AUDIT.md`, `tests/germany-a1-cluster.test.js`, and `docs/TASK_LOG.md`.
- Do not add routes, change layouts, tools, navigation, Chinese pages, commercial/contact pages, analytics, advertising, deployment, or legacy files.
- Base claims only on a current BAMF, Federal Foreign Office, Goethe-Institut, or telc source; a local authority or local centre remains the source of truth for individual acceptance, fees, dates, availability, results, delivery, and local terms.
- Do not transmit or request personal data; do not promise an exemption, acceptance decision, fee, result time, booking place, or visa outcome.
- Keep the existing shared `## A1 route FAQ` and `## A1 decision tools and next steps` sections in all seven guides.
- Set the edited guides’ `updatedDate` to `2026-07-13`; untouched A1 guides retain `2026-07-11`.
- Required final gates: `node tests/germany-a1-cluster.test.js`, `npm test`, `npm run build`, and `npm run launch-check`.

---

### Task 1: Establish the A1 evidence and editorial audit record

**Files:**
- Create: `docs/PHASE_2_A1_CONTENT_AUDIT.md`
- Modify: none
- Test: manual source URL and scope check

**Interfaces:**
- Consumes: the seven guide slugs named in the design specification and the official URLs below.
- Produces: one row per guide with the columns `intent`, `official source checked`, `gap`, `action`, and `reader-side verification`.

- [ ] **Step 1: Create the audit document with the fixed scope table**

Write one row for each of these exact files: `german-family-reunion-language-requirement.md`, `goethe-a1-vs-telc-a1.md`, `goethe-a1-test-centers.md`, `goethe-a1-fees-by-country.md`, `goethe-a1-retake-policy.md`, `german-a1-documents-checklist.md`, and `german-a1-exam-booking-timeline.md`.

- [ ] **Step 2: Record the official sources and their permitted use**

Use these source URLs in the audit record:

```text
https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html
https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/NachzugZuDrittstaatlern/nachzug-zu-drittstaatlern-node.html
https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse/606682
https://www.goethe.de/en/spr/prf.html
https://www.goethe.de/en/spr/prf/pes/pas1.html
https://www.telc.net/en/language-examinations/find-a-telc-examination-centre/
```

State explicitly that a German mission and the selected local test centre control the reader’s current local instructions.

- [ ] **Step 3: Check every source before using it**

For each URL, record the checked date and whether it supports an overview claim, exact exam fact, or only a reader-side verification action. If a URL is inaccessible or has changed scope, preserve the guide’s conservative wording and record the gap rather than substituting an unverified third-party source.

- [ ] **Step 4: Commit the audit baseline**

```bash
git add docs/PHASE_2_A1_CONTENT_AUDIT.md
git commit -m "docs: record Germany A1 content audit"
```

### Task 2: Deepen the family-reunion requirement guide

**Files:**
- Modify: `src/content/guides/german-family-reunion-language-requirement.md`
- Modify: `docs/PHASE_2_A1_CONTENT_AUDIT.md`
- Modify: `tests/germany-a1-cluster.test.js`
- Test: `node tests/germany-a1-cluster.test.js`

**Interfaces:**
- Consumes: BAMF family overview, BAMF third-country-family-reunification page, Federal Foreign Office FAQ.
- Produces: a guide that separates route category, general language expectation, possible exception categories, and the mission’s case-specific decision.

- [ ] **Step 1: Encode the audited-date contract before editing the guide**

Replace the current unconditional date assertion in `tests/germany-a1-cluster.test.js` with this exact block before the loop:

```js
const auditedA1Guides = new Set([
  'german-family-reunion-language-requirement.md',
  'goethe-a1-vs-telc-a1.md',
  'goethe-a1-test-centers.md',
  'goethe-a1-fees-by-country.md',
  'goethe-a1-retake-policy.md',
  'german-a1-documents-checklist.md',
  'german-a1-exam-booking-timeline.md',
]);
```

Inside the existing guide loop, replace `updatedDate: "2026-07-11"` with:

```js
const expectedUpdateDate = auditedA1Guides.has(file) ? '2026-07-13' : '2026-07-11';
assert.ok(source.includes(`updatedDate: "${expectedUpdateDate}"`), `${file} should show its expected update date`);
```

Run: `node tests/germany-a1-cluster.test.js`

Expected: FAIL because the seven audited guides have not yet all been updated.

- [ ] **Step 2: Add the current official source URLs to the guide’s source section**

Add the BAMF third-country-family-reunification URL and the Federal Foreign Office FAQ URL. Keep the existing BAMF family overview URL.

- [ ] **Step 3: Replace broad exception wording with a scoped verification sequence**

Make the reader first identify whether they join a German national, EU citizen, or third-country national; then identify the sponsor’s current residence category; then use the responsible mission’s instructions for their own file. State that BAMF describes simple everyday German as a general rule for spouses joining third-country nationals, while the applicable route can have different rules, including routes involving skilled workers. Do not enumerate a complete exemption list or decide one.

- [ ] **Step 4: Set the content update date and audit action**

Set `updatedDate: "2026-07-13"`, revise the reading-time value if the final body needs it, and record the exact claim boundary in the audit row.

- [ ] **Step 5: Run the focused cluster guard**

Run: `node tests/germany-a1-cluster.test.js`

Expected: FAIL only for the six remaining audited guides whose dates will be updated by Tasks 3–5; record this expected staged failure in the task report.

- [ ] **Step 6: Commit the guide revision and date-contract test**

```bash
git add src/content/guides/german-family-reunion-language-requirement.md docs/PHASE_2_A1_CONTENT_AUDIT.md tests/germany-a1-cluster.test.js
git commit -m "content: clarify Germany A1 requirement checks"
```

### Task 3: Deepen the provider-comparison and centre-verification guides

**Files:**
- Modify: `src/content/guides/goethe-a1-vs-telc-a1.md`
- Modify: `src/content/guides/goethe-a1-test-centers.md`
- Modify: `docs/PHASE_2_A1_CONTENT_AUDIT.md`
- Test: `node tests/germany-a1-cluster.test.js`

**Interfaces:**
- Consumes: Goethe German-examinations overview and telc examination-centre finder.
- Produces: the decision sequence `authority acceptance -> exact adult product -> official centre -> local terms`.

- [ ] **Step 1: Update the provider-comparison guide**

Keep the exact adult Goethe product name `Goethe-Zertifikat A1: Start Deutsch 1`. Keep telc at the exact-local-product level. Add the Goethe examinations overview and telc centre finder as official sources, and state that no provider comparison substitutes for the responsible authority’s acceptance instruction.

- [ ] **Step 2: Update the centre-verification guide**

Use the Goethe overview for the rule that exams are offered through Goethe-Instituts and exam partners, and the telc centre finder for the route to a telc centre. Make the local centre responsible for date, fee, registration, ID, result, and certificate process. Do not list locations or availability.

- [ ] **Step 3: Update dates and audit rows**

Set both front-matter dates to `2026-07-13` and record source checks, changed wording, and reader-side local checks in the two audit rows.

- [ ] **Step 4: Run the focused cluster guard**

Run: `node tests/germany-a1-cluster.test.js`

Expected: FAIL only for the four remaining audited guides whose dates will be updated by Tasks 4–5; record this expected staged failure in the task report.

- [ ] **Step 5: Commit the provider and centre revision**

```bash
git add src/content/guides/goethe-a1-vs-telc-a1.md src/content/guides/goethe-a1-test-centers.md docs/PHASE_2_A1_CONTENT_AUDIT.md
git commit -m "content: clarify A1 provider and centre checks"
```

### Task 4: Deepen the fee and retake guides

**Files:**
- Modify: `src/content/guides/goethe-a1-fees-by-country.md`
- Modify: `src/content/guides/goethe-a1-retake-policy.md`
- Modify: `docs/PHASE_2_A1_CONTENT_AUDIT.md`
- Test: `node tests/germany-a1-cluster.test.js`

**Interfaces:**
- Consumes: Goethe examinations overview, Goethe A1 results page, and the selected local centre’s published terms.
- Produces: a no-fixed-price and no-universal-retake-rule decision path.

- [ ] **Step 1: Update the fee guide**

Keep it free of numbers. Require a record of exact exam, local official centre, test date, fee, payment deadline, cancellation/refund rule, rescheduling rule, result process, and checked date. Link the reader from fee comparison to a centre and then to the booking timeline.

- [ ] **Step 2: Update the retake guide**

Use the Goethe A1 results page only for the exam-level pass/fail result context. Keep partial retake, full rebooking, next-seat availability, local fee, and certificate timing as local-centre questions. Remove any wording that could imply a universal module-resit or booking rule.

- [ ] **Step 3: Update dates and audit rows**

Set both front-matter dates to `2026-07-13`; write the exact source and retained local verification boundary for each audit row.

- [ ] **Step 4: Run the focused cluster guard**

Run: `node tests/germany-a1-cluster.test.js`

Expected: FAIL only for the two remaining audited guides whose dates will be updated by Task 5; record this expected staged failure in the task report.

- [ ] **Step 5: Commit the fee and retake revision**

```bash
git add src/content/guides/goethe-a1-fees-by-country.md src/content/guides/goethe-a1-retake-policy.md docs/PHASE_2_A1_CONTENT_AUDIT.md
git commit -m "content: strengthen A1 fee and retake checks"
```

### Task 5: Deepen the document and timeline guides

**Files:**
- Modify: `src/content/guides/german-a1-documents-checklist.md`
- Modify: `src/content/guides/german-a1-exam-booking-timeline.md`
- Modify: `docs/PHASE_2_A1_CONTENT_AUDIT.md`
- Test: `node tests/germany-a1-cluster.test.js`

**Interfaces:**
- Consumes: Federal Foreign Office FAQ, BAMF family overview, official provider and local-centre instructions.
- Produces: a three-stage checklist and backwards-planning timeline that never treats a generic page as a visa-file decision.

- [ ] **Step 1: Update the document checklist**

Keep booking, test-day, and visa-submission documents in distinct sections. Add the Federal Foreign Office FAQ to the official sources. State that the centre controls booking and test-day documents, while the responsible mission controls the current visa-file checklist and any original/copy/translation instruction.

- [ ] **Step 2: Update the booking timeline**

Keep only reader-entered or locally confirmed dates. State that the centre’s current process determines result publication, certificate issue/delivery, and next-seat timing; the mission controls document-deadline implications. Remove any wording that can be read as a default buffer or guaranteed timing.

- [ ] **Step 3: Update dates and audit rows**

Set both front-matter dates to `2026-07-13`; record the source, change, and residual reader-side check in the audit table.

- [ ] **Step 4: Run the focused cluster guard**

Run: `node tests/germany-a1-cluster.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the document and timeline revision**

```bash
git add src/content/guides/german-a1-documents-checklist.md src/content/guides/german-a1-exam-booking-timeline.md docs/PHASE_2_A1_CONTENT_AUDIT.md
git commit -m "content: clarify A1 documents and timeline checks"
```

### Task 6: Close the window

**Files:**
- Modify: `docs/PHASE_2_A1_CONTENT_AUDIT.md`
- Modify: `docs/TASK_LOG.md`
- Test: `node tests/germany-a1-cluster.test.js`, `npm test`, `npm run build`, `npm run launch-check`

**Interfaces:**
- Consumes: the seven changed guides and completed audit table.
- Produces: an operational record and final release evidence.

- [ ] **Step 1: Confirm the completed editorial changes satisfy the date contract**

Run: `node tests/germany-a1-cluster.test.js`

Expected: `Germany A1 cluster rules passed`.

- [ ] **Step 2: Record completion and residual risks**

Finalize every audit row. Add a dated Phase 2 A1 entry to `docs/TASK_LOG.md` with changed files, official-source boundaries, commands run, results, and remaining manual checks for local centre/mission instructions.

- [ ] **Step 3: Run all required release gates**

Run:

```bash
npm test
npm run build
npm run launch-check
git diff --check
```

Expected: test commands pass; build generates the site; launch check reports `READY`; diff check has no output.

- [ ] **Step 4: Commit the window record**

```bash
git add docs/PHASE_2_A1_CONTENT_AUDIT.md docs/TASK_LOG.md
git commit -m "test: record Germany A1 content audit"
```
