# Codex UI Optimization Review Design

**Date:** 2026-07-16  
**Status:** Approved design awaiting written-spec review  
**Scope:** VisaLang UI optimization review prompt; no source-code changes in this work item.

## Decision summary

VisaLang will remain on Astro. The current product is a static, Markdown-led information site with strict content-source controls, static SEO, lightweight browser interactions, and Nginx static deployment. A production-equivalent Next.js migration would be a large rewrite with limited immediate business benefit.

A new, date-stamped Codex review work package will be created at:

```text
docs/CODEX_UI_OPTIMIZATION_REVIEW_PROMPT_2026-07-16.md
```

Codex will review and improve that prompt only. It must not edit application source, configuration, content, deployment assets, or documentation outside the new review work package.

## Context hierarchy

The Codex prompt must tell Codex to resolve conflicts using the following order:

1. `docs/superpowers/specs/2026-07-15-visalang-content-ui-design.md`
2. `docs/CONTENT_UI_IMPLEMENTATION_HANDOFF.md`
3. `docs/STYLE_ARCHITECTURE.md`
4. `docs/CODEX_UI_IMPLEMENTATION_PROMPTS_2026-07-14.md`
5. Historical design audits and screenshots

The first three documents define current requirements and implementation state. The historical Codex work package is reference material, not the authority for current state.

## Review objectives

The final prompt must require a read-only, evidence-based UI audit covering:

- Responsive layout and horizontal overflow at 375px, 768px, 1024px, and 1440px.
- Keyboard navigation, visible focus, skip links, semantic landmarks, and accurate `aria-current` usage.
- Guide Library search, filters, URL state restoration, live announcements, clear controls, and single-link card behavior.
- Guide page information order, table-of-contents DOM/visual/focus order, source status, final decision-maker language, and related-guide boundaries.
- Tool form validation, error summary semantics, URL recovery, state persistence boundaries, and safe fallback for non-Germany-A1 routes.
- Related-guide filtering, including the known risk of cross-country recommendations bypassing `comparisonScope`.
- Article JSON-LD author object validity without inventing people, qualifications, or review claims.
- Chinese route content-status and review-state boundaries.
- CSS architecture: only `global.css` is active, with 1440px base desktop and 1024px/768px/375px control points; historical compatibility blocks require visual evidence before removal.

## Visual and product constraints

Recommendations must preserve VisaLang as a credible, editorial, public-information service:

- Prioritise reading clarity, source status, content boundaries, and practical next steps.
- Use restrained warm-neutral backgrounds, dark ink text, muted official blue accents, thin dividers, modest radii, and limited shadows.
- Reject dashboard/SaaS visual patterns, card-wall layouts, purple gradients, glassmorphism, decorative blobs, and non-essential animation.
- Keep one clear primary action per page and never use colour as the sole status signal.

## Safety and compliance constraints

The prompt must prohibit Codex from:

- Enabling advertising, third-party analytics, CMPs, or consent tooling.
- Representing advertising, analytics, consent, cookie, source-review, translator-review, or legal-policy status as complete when it is not.
- Inventing official sources, dates, qualifications, policy facts, or user data.
- Proposing broad framework migration, design-system replacement, or whole-site visual rewrite as a default response.

Advertising and third-party analytics remain disabled unless a separately approved consent-and-ad-tech decision authorizes them.

## Required Codex output

Codex must return a revised prompt plus an audit-ready review plan. Every finding must include:

1. Priority: P0, P1, or P2.
2. User impact and affected route or component.
3. Evidence: exact file path and code, document, or runtime observation.
4. Smallest viable improvement; no speculative refactor.
5. Acceptance check: build, existing test, static-output check, browser check, or explicit human decision.
6. Classification: `safe to implement`, `requires human confirmation`, or `do not automate`.

The output must explicitly distinguish verified facts from hypotheses. A lack of real-browser evidence must remain a test gap, not be reported as a confirmed defect.

## Workflow

1. Write the initial detailed review prompt to the new date-stamped Markdown file.
2. Send that file to Codex for read-only prompt refinement.
3. Review Codex's suggestions against the context hierarchy and guardrails.
4. Incorporate only prompt-level improvements that preserve scope.
5. Present the final prompt and any deferred decisions to the user.
6. Do not begin UI source changes until the user selects a single, bounded implementation work package.

## Verification

This documentation-only work item is complete when:

- The review prompt exists at the specified path.
- It references the authoritative current documents.
- It contains all review objectives, hard constraints, output contract, and priority rules above.
- Codex has reviewed the prompt without modifying project source.
- A separate reviewer confirms the prompt contains no placeholders, contradictions, or unauthorized implementation instructions.
