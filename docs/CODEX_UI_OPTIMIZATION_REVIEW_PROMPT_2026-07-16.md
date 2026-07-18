# Codex UI Optimization Review Work Package — 2026-07-16

> **What this file is:** a read-only review work package for Codex. Codex reviews the VisaLang UI optimization plan and this prompt, then returns prompt refinements plus a prioritised, evidence-bound review plan. Codex must not change application source, tests, configuration, content, deployment assets, analytics, advertising, or consent tooling.

## Role and hard boundary

You are a senior product-design, accessibility, and frontend-review specialist.
Perform a read-only review of the VisaLang UI optimization plan and this prompt.
Do not edit source code, tests, configuration, content, deployment files, analytics, advertising, CMP, consent tooling, or any documentation other than this prompt if explicitly asked to return a revised version.
Do not claim that you ran a browser, build, test suite, or network inspection unless evidence is supplied in the review input.

Additional boundary rules:

- Treat every runtime observation you cannot back with supplied evidence as a hypothesis, never as a confirmed defect.
- Do not propose source edits as completed work. Your deliverable is a revised prompt plus a review plan, not a code change.
- Do not enable, restore, or "prepare" advertising, third-party analytics, CMP, or consent tooling. These remain disabled unless a separately approved consent-and-ad-tech decision authorizes them.
- Do not invent official sources, dates, qualifications, policy facts, reviewer or translator identities, or user data.
- Do not recommend a framework migration, design-system replacement, or whole-site visual rewrite as a default response. VisaLang stays on Astro.

## Context hierarchy and mandatory reading list

Resolve every conflict using this precedence order. Lower-numbered documents win. State, before giving any finding, which of these documents you actually inspected.

1. `docs/superpowers/specs/2026-07-15-visalang-content-ui-design.md` — approved current product/UI specification.
2. `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md` — implemented state, closed P0 regressions, known open defects, and evidence gaps.
3. `docs/STYLE_ARCHITECTURE.md` — active CSS ownership, token model, and breakpoint rules.
4. `docs/CODEX_UI_IMPLEMENTATION_PROMPTS_2026-07-14.md` — historical Codex work package; reference material only, not the authority for current state.
5. Historical design audits and screenshots (for example `design-qa.md`, `docs/UI_REFACTOR_REPORT.md`) — background only.

The first three documents define current requirements and implementation state. Item 4 and item 5 are reference material. If item 4 or 5 contradicts items 1–3, the current documents win and you must flag the stale reference rather than acting on it.

Authoritative implementation facts you must not contradict:

- `src/layouts/BaseLayout.astro` loads exactly one stylesheet, `src/styles/global.css`. `src/styles/open-design.css` is an unloaded migration reference and must not be treated as active or reintroduced.
- The active viewport breakpoints are `max-width: 1024px`, `max-width: 768px`, and `max-width: 375px`, with `1440px` as the base desktop reference (not an extra override). Do not propose new 560/680/800/900/1080px breakpoints.
- Advertising and Cloudflare Web Analytics are paused in source; generated HTML currently contains no ad/CMP/tracking runtime marker.
- Content maturity baselines: Germany family-reunion A1 is `complete-route`, Germany B1 is `core-route`, TestDaF is `starter-overview`; all 16 audited high-risk guides render as `verification-pending`.
- Real-browser responsive, keyboard, and clean-profile network evidence is currently **missing** because the browser-control runtime failed during the last review. Any layout, focus-movement, or network claim without supplied evidence is a test gap, not a defect.

## UI review matrix

Require explicit checks for all of the following. For each item, tie the finding to an exact file path or supplied evidence artifact.

- 375px, 768px, 1024px, and 1440px layout integrity and horizontal overflow.
- Keyboard traversal, skip link, focus visibility, landmarks, and `aria-current` precision.
- Guide Library search, filters, URL restoration, `aria-live` feedback, clear controls, and one-link card semantics.
- Guide article information order, TOC DOM/visual/focus order, source status, final decision-maker language, and related-guide boundaries.
- Tool form validation, error summaries, URL recovery, state persistence boundaries, and safe fallback for routes outside Germany family-reunion A1.
- Related-guide `comparisonScope` filtering and the known cross-country recommendation risk (a same-`decisionStage` guide from another country can currently render before `comparisonScope` is checked).
- JSON-LD author object shape without inventing people, qualifications, or review claims.
- Chinese route content-status and translation/review boundaries (Chinese Germany A1 guides expose `sourceReviewStatus: pending` and must not claim a completed credibility migration).
- `global.css` as the only active stylesheet, with 1440px base desktop and 1024px/768px/375px control points; historical compatibility blocks require visual evidence before removal.

## Visual, compliance, and non-goal guardrails

VisaLang must remain a credible editorial public-information site whose priority is reading clarity, source status, content boundaries, and practical next steps.

Explicitly reject:

- SaaS/dashboard styling, card-wall layouts, purple gradients, glassmorphism, decorative blobs, and non-essential animation.
- Colour as the sole status signal; every status must also carry a textual or shape cue.
- More than one primary action per page.
- Large-radius card systems, glass effects, and heavy shadows.

Preserve:

- Restrained warm-neutral backgrounds, dark ink text, muted official-blue accents, thin dividers, modest radii, and limited shadows.
- Visible focus, textual error/selected/disabled states, and local table overflow.

Compliance non-negotiables:

- Advertising and third-party analytics remain disabled.
- Never represent advertising, analytics, consent, cookie, source-review, translator-review, or legal-policy status as complete when it is not.
- Never fabricate a source, policy, review, translator, legal, consent, or identity claim.

## Required output schema

Return a Markdown response with exactly these sections, in this order:

1. Prompt-quality assessment
2. P0 findings
3. P1 findings
4. P2 findings
5. Browser-evidence gaps
6. Human-decision queue
7. Revised prompt text

For every finding in sections 2–4, require all of:

- **Priority** — P0, P1, or P2.
- **User impact** — the impact and the affected route or component.
- **Evidence** — the exact file path and code, document, or supplied runtime observation.
- **Label** — `verified fact` or `hypothesis`.
- **Smallest viable improvement** — the minimal change; no speculative refactor.
- **Acceptance check** — build, existing test, static-output check, browser check, or explicit human decision.
- **Classification** — one of `safe to implement`, `requires human confirmation`, or `do not automate`.

Section 5 must list every claim that would require real-browser evidence and remains unverified. Section 6 must list every decision that needs a human owner (for example advertising/CMP activation, Chinese review completion, blocked high-risk fact edits). Section 7 must contain the full revised prompt text, preserving the read-only boundary and every guardrail above.

## Codex refinement request

When this file is sent to Codex, use this request verbatim:

```markdown
Review the attached VisaLang Codex UI optimization prompt against the attached approved design specification. Improve only the prompt text. Preserve the read-only boundary. Do not propose source edits as completed work. Return a concise change log followed by the full revised prompt.
```

Reject any Codex recommendation that would enable advertising or analytics, modify source, replace Astro with Next.js, introduce a second CSS system, create unsupported claims, or turn browser-evidence gaps into asserted defects. Apply only prompt-level refinements that make the audit clearer, more testable, or more evidence-bound, and preserve the required output schema and all guardrails.

## Future acceptance references

These commands are the project's current gates. They are listed so that later, approved implementation work has a known bar to meet. Running them is not part of this read-only review.

- `npm test`
- `npm run build`
- `npm run launch-check`

## Handoff boundary

This is a documentation-only work package. Do not commit, push, or deploy. The VisaLang working tree already contains unrelated changes; a commit must not be created unless the user explicitly asks after reviewing the final documents. No application source, test, configuration, content, or deployment asset is modified by this file.
