---
name: visalang-ui-design
description: Apply VisaLang UI conventions when changing layout, components, CSS, or responsive behavior. Use for visual consistency, accessibility, breakpoints, and brand-safe polish on this Astro site.
---

# VisaLang UI design

Use the existing visual system. Do not invent a second theme.

## Before editing

1. Read `src/styles/global.css` and `docs/STYLE_ARCHITECTURE.md`.
2. Reuse `BaseLayout`, `GuideLayout`, and components in `src/components/`.
3. Change tokens in `:root` once. Do not add a second `:root` block or a new stylesheet.

## Layout rules

- One `h1` per page. The skip link targets `#main-content`.
- Keep trailing-slash routes. Do not add breakpoints other than `1024px`, `768px`, and `375px`.
- At `1024px`, primary navigation collapses into the menu button.
- At `768px` and `375px`, stack multi-column route, guide, and tool layouts.
- Interactive controls need at least a 44px hit area and a visible `:focus-visible` outline.
- Wide tables scroll inside their container. Do not let the page itself scroll sideways.
- Respect `prefers-reduced-motion`: no hover transforms that move content.

## Color and type

- Body and headings use the system sans stack in `--font-sans`. Do not request web fonts.
- Light primary buttons may use white text on `--od-primary` (`#1959d9`).
- In dark mode, `--od-primary` is `#78a6ff`. Primary button text must be dark (`#0d1725`), not white.
- Warning color is for verification states, not for ordinary buttons.
- English and Chinese share the same components. Label a link that leaves the current language.

## What not to add

- No ad slots, consent banners, or tracking pixels in a UI pass.
- No new card chrome, gradients, or decorative illustration systems.
- No claim that a layout change makes the site ready for an ad network.
