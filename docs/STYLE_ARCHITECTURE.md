# VisaLang style architecture

## Active source

`src/layouts/BaseLayout.astro` loads one stylesheet: `src/styles/global.css`.

The former `src/styles/open-design.css` override layer has been removed after its active rules were consolidated into `global.css`. Do not recreate or import a second theme layer. A rule is active only when it is in `global.css`.

The existing exam-learning compatibility block remains active inside `global.css`. Its remaining declarations are observable on the approved pages, including the page background treatment, so this pass preserves their cascade instead of guessing that they are unused. Reduce it only through a separate selector-by-selector visual audit.

## Editorial authority pass — 2026-07-18

- Body copy uses the stable humanist sans stack behind `--font-sans`; headings use the distinct serif stack behind `--font-display`. Both retain `Noto Sans SC` / `Noto Serif SC`, system and generic fallbacks.
- No font files or runtime font requests were added. Self-hosted fonts remain deferred until licensed WOFF2 assets are available.
- `global.css` remains the only production stylesheet. The former inactive `open-design.css` migration reference has been removed.
- Primary actions use `--primary` and `--primary-hover`. Warning colour is reserved for verification-pending and other warning states.
- The active page glow is limited to low-opacity blue/teal values at or below `.025`; the warm yellow glow was removed.
- Starter overview badges use the secondary teal treatment; verification-pending badges retain the warning treatment.
- Viewport layout continues to use only 1024px, 768px and 375px. Article TOC behaviour switches at 768px.
- The homepage now uses a static `.route-entry`, a numbered editorial stage list and compact trust prose instead of the Route Console, signal cards and trust-card wall.
- Proven-zero active selectors for the old Route Console, signal cards, result actions and earlier journey/atlas/practice hero surfaces were removed. The inactive archived override file was removed after consolidation.

## Pre-consolidation mapping

Before this consolidation, `global.css` loaded first and `open-design.css` loaded second. The later file therefore won whenever specificity was equal. `global.css` also contained archived theme blocks below its original foundation.

| Area | Earlier/duplicate source | Final source before migration | Consolidated location |
| --- | --- | --- | --- |
| Core tokens | `global.css` root, archived editorial root, archived warm root | `open-design.css` root | Top of `global.css` |
| Header/navigation | Repeated global header rules and theme overrides | Open Design header rules plus the latest P2-1 states | `global.css`, navigation section |
| Home Hero | Several `body:has(.site-main--home)` generations | Open Design home composition | `global.css`, home section |
| Guide Card/Library | Global card, filter and grid foundations | Scoped `.od-guide-library` rules | `global.css`, guide-library section |
| Guide Article | Global article/TOC foundations | Scoped `.od-guide-article` rules | `global.css`, article section |
| Tool Form | Global tool controls and table foundations | Open Design tool workspace rules | `global.css`, tools section |
| Focus/error/selected/disabled | Global foundation plus later component overrides | Latest accessible state rules | `global.css`, state rules beside their components |

The archived theme comments and uncertain legacy selectors remain in `global.css` only where removing them cannot yet be proven safe. They are no longer allowed to redefine core tokens.

## Tokens

Core tokens have one light-mode definition at the top of `global.css`. Dark-mode values are the only conditional redefinition and live in one `prefers-color-scheme: dark` block. Components consume semantic tokens such as `--surface`, `--text`, `--border`, `--primary`, `--risk`, `--focus`, `--radius-*`, and `--shadow-*`.

Do not introduce a second root theme block or component-prefixed aliases that remap these tokens. Change the canonical token once, then verify all four core page types.

## Breakpoint strategy

| Width | Intent |
| --- | --- |
| Base / 1440 | Full desktop navigation, two-column compositions where already approved, normal content measure |
| 1024px | Collapse wide page compositions and reduce desktop-only density |
| 768px | Switch to mobile navigation, single-column article/tool/library layouts, inline TOC |
| 375px | Small-phone spacing, stacked controls and locally scrollable tables |

Only `max-width: 1024px`, `max-width: 768px`, and `max-width: 375px` may be added for viewport layout. `1440px` is the base reference, not an extra override. Preference and print media queries are separate accessibility/output concerns.

## Core component ownership

- Header: `.global-header*`, `.nav-menu*`, `.mobile-navigation*` in `global.css`.
- Home Hero: `.home-hero*`, `.route-entry`, `.stage-list`, `.stage-card` and `.trust-statement` in `global.css`.
- Guide Card and Library: `.guide-card*`, `.od-guide-library*`, `.guide-filter-form`, `.filter-*` in `global.css`.
- Guide Article: `.guide-layout`, `.guide-article*`, `.article-toc`, `.decision-authority`, `.source-fact-table`, `.od-guide-article*` in `global.css`.
- Tool Form: `.tool-page*`, `.tool-form*`, `.tool-field-*`, `.tool-stepper`, `.tool-table-*`, `.tool-error-*` in `global.css`.

## Guardrails

- Do not recreate or import `open-design.css`, or add a new theme override layer.
- Do not treat the retained exam-learning compatibility block as a new override layer; migrate a declaration only when its rendered use is proven.
- Do not redefine core tokens inside page/component sections.
- Do not add ad-hoc 560/680/800/900/1080px breakpoints.
- Preserve visible focus, textual error/selected states, disabled states and local table overflow.
- Do not delete uncertain legacy selectors until usage is proven by source search and representative-page regression checks.
- Avoid large-radius card systems, purple gradients, glass effects, decorative blobs and heavy shadows.
