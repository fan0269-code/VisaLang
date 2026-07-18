# Codex UI Optimization Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a guarded, evidence-based Codex prompt that reviews and improves VisaLang's UI optimization plan without changing application source.

**Architecture:** Keep the approved design specification separate from the executable Codex prompt. The prompt treats the current UI/content specification, implementation handoff, and CSS architecture as authoritative inputs, then requires Codex to return only prompt refinements and a prioritised review plan. A separate reviewer validates the final prompt before it is shown to the user.

**Tech Stack:** Markdown, Astro project documentation, Codex read-only review workflow, existing Node build/test commands as future acceptance references.

---

## File structure

- Create: `docs/CODEX_UI_OPTIMIZATION_REVIEW_PROMPT_2026-07-16.md` — the detailed, executable read-only Codex work package.
- Reference: `docs/superpowers/specs/2026-07-16-codex-ui-optimization-review-design.md` — approved scope and guardrails.
- Reference: `docs/superpowers/specs/2026-07-15-visalang-content-ui-design.md` — current product/UI specification.
- Reference: `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md` — implemented state, known defects, and evidence gaps.
- Reference: `docs/STYLE_ARCHITECTURE.md` — active CSS ownership and breakpoint rules.
- Create: `docs/superpowers/plans/2026-07-16-codex-ui-optimization-review.md` — this implementation plan.

> Do not modify application source, build configuration, existing historical prompts, content, deployment files, or consent/advertising settings in this work item. The VisaLang working tree already contains unrelated changes, so do not create a commit unless the user explicitly asks after reviewing the final documents.

### Task 1: Draft the guarded Codex review prompt

**Files:**
- Create: `docs/CODEX_UI_OPTIMIZATION_REVIEW_PROMPT_2026-07-16.md`
- Reference: `docs/superpowers/specs/2026-07-16-codex-ui-optimization-review-design.md`
- Reference: `docs/superpowers/specs/2026-07-15-visalang-content-ui-design.md`
- Reference: `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md`
- Reference: `docs/STYLE_ARCHITECTURE.md`

- [ ] **Step 1: Write the review contract at the top of the prompt**

Include the following requirements verbatim in the prompt:

```markdown
## Role and hard boundary

You are a senior product-design, accessibility, and frontend-review specialist.
Perform a read-only review of the VisaLang UI optimization plan and this prompt.
Do not edit source code, tests, configuration, content, deployment files, analytics, advertising, CMP, consent tooling, or any documentation other than this prompt if explicitly asked to return a revised version.
Do not claim that you ran a browser, build, test suite, or network inspection unless evidence is supplied in the review input.
```

- [ ] **Step 2: Add the context hierarchy and mandatory reading list**

Add a numbered precedence order beginning with the approved 2026-07-15 UI/content specification, then the implementation handoff, CSS architecture, historical Codex work package, and historical audits. Require Codex to state which documents it inspected before giving findings.

- [ ] **Step 3: Add the concrete UI review matrix**

Add explicit checks for all of the following:

```markdown
- 375px, 768px, 1024px, and 1440px layout integrity and horizontal overflow.
- Keyboard traversal, skip link, focus visibility, landmarks, and aria-current precision.
- Guide Library search, filters, URL restoration, aria-live feedback, clear controls, and one-link card semantics.
- Guide article information order, TOC DOM/visual/focus order, source status, final decision-maker language, and related-guide boundaries.
- Tool form validation, error summaries, URL recovery, state persistence boundaries, and safe fallback for routes outside Germany family-reunion A1.
- Related-guide comparisonScope filtering and the known cross-country recommendation risk.
- JSON-LD author object shape without inventing people, qualifications, or review claims.
- Chinese route content-status and translation/review boundaries.
- global.css as the only active stylesheet, with 1440px base desktop and 1024px/768px/375px control points.
```

- [ ] **Step 4: Add visual, compliance, and non-goal guardrails**

State that VisaLang must remain a credible editorial public-information site. Explicitly reject SaaS/dashboard styling, purple gradients, glassmorphism, decorative blobs, card-wall layouts, and non-essential animation. Require advertising and third-party analytics to remain disabled. Prohibit fabricated source, policy, review, translator, legal, consent, or identity claims.

- [ ] **Step 5: Add the exact output schema**

Require a Markdown response with these sections:

```markdown
1. Prompt-quality assessment
2. P0 findings
3. P1 findings
4. P2 findings
5. Browser-evidence gaps
6. Human-decision queue
7. Revised prompt text
```

For every finding require: priority, impact, exact evidence path, verified fact or hypothesis label, smallest viable improvement, acceptance check, and one of `safe to implement`, `requires human confirmation`, or `do not automate`.

- [ ] **Step 6: Validate the draft against the design specification**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
text = Path('docs/CODEX_UI_OPTIMIZATION_REVIEW_PROMPT_2026-07-16.md').read_text(encoding='utf-8')
required = [
    'read-only',
    'comparisonScope',
    '375px',
    '768px',
    '1024px',
    '1440px',
    'global.css',
    'requires human confirmation',
    'do not automate',
]
missing = [item for item in required if item not in text]
assert not missing, f'Missing required prompt constraints: {missing}'
print('Prompt guardrails: PASS')
PY
```

Expected: `Prompt guardrails: PASS`.

### Task 2: Ask Codex to refine the prompt without touching source

**Files:**
- Modify: `docs/CODEX_UI_OPTIMIZATION_REVIEW_PROMPT_2026-07-16.md`
- Reference: `docs/superpowers/specs/2026-07-16-codex-ui-optimization-review-design.md`

- [ ] **Step 1: Send the prompt and design specification to Codex**

Use a request that states:

```markdown
Review the attached VisaLang Codex UI optimization prompt against the attached approved design specification. Improve only the prompt text. Preserve the read-only boundary. Do not propose source edits as completed work. Return a concise change log followed by the full revised prompt.
```

- [ ] **Step 2: Reject any out-of-scope Codex recommendation**

Do not incorporate suggestions that enable advertising or analytics, modify source, replace Astro with Next.js, introduce a second CSS system, create unsupported claims, or turn browser-evidence gaps into asserted defects.

- [ ] **Step 3: Apply only prompt-level refinements**

Replace the draft prompt only with changes that make the audit clearer, more testable, or more evidence-bound. Preserve the required output schema and all guardrails from Task 1.

- [ ] **Step 4: Re-run the prompt guardrail validation**

Run the Task 1 validation command again.

Expected: `Prompt guardrails: PASS`.

### Task 3: Independently review the final prompt and hand it off

**Files:**
- Review: `docs/CODEX_UI_OPTIMIZATION_REVIEW_PROMPT_2026-07-16.md`
- Reference: `docs/superpowers/specs/2026-07-16-codex-ui-optimization-review-design.md`

- [ ] **Step 1: Perform a fresh-context prompt review**

Ask a reviewer to verify that the final prompt has no unresolved placeholder markers, no contradiction with the design specification, no source-edit authorization, no fabricated compliance claim, and a complete per-finding output contract.

- [ ] **Step 2: Run a Markdown sanity check**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
path = Path('docs/CODEX_UI_OPTIMIZATION_REVIEW_PROMPT_2026-07-16.md')
text = path.read_text(encoding='utf-8')
assert text.startswith('# '), 'Prompt needs a Markdown H1'
placeholder_tokens = ('TO' + 'DO', 'TB' + 'D')
assert not any(token in text for token in placeholder_tokens), 'Prompt has placeholders'
assert len(text.splitlines()) > 80, 'Prompt is not detailed enough for the review scope'
print('Prompt structure: PASS')
PY
```

Expected: `Prompt structure: PASS`.

- [ ] **Step 3: Report the handoff boundary to the user**

Report the final prompt path, Codex's prompt-only change log, any human-decision items, and that no application source was modified. Do not commit because the working tree contains unrelated modifications and no commit was requested.
