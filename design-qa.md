# Design QA — 2026-07-12

## Comparison target

- Source visual truth: `.audit/flowlight-ui-2026-07-12/04-nextnation-reference.png` (desktop capture of `https://nextnation.co/`).
- Implementation: `.audit/flowlight-ui-2026-07-12/05-redesign-desktop.png` (local Astro preview, `/`, 1440 × 1600).
- Responsive implementation: `.audit/flowlight-ui-2026-07-12/07-redesign-mobile.png` (local Astro preview, `/`, 500 × 1200).
- Full-view comparison: `.audit/flowlight-ui-2026-07-12/06-reference-comparison.png`.
- State: initial homepage, no menu or form state open. NextNation displayed a login modal in the source capture; that authentication surface is intentionally out of scope for VisaLang.

## Findings

- No actionable P0, P1, or P2 findings.
- [P3] The source uses custom photographic and map imagery, while VisaLang deliberately uses an information-only route-planning panel. This is an intentional product difference: the source imagery would imply immigration service delivery that VisaLang does not provide.

## Required fidelity surfaces

- **Fonts and typography:** The implementation adopts a bolder, tighter display hierarchy and compact navigation weights, preserving readable system-font fallbacks. Desktop and mobile screenshots show no clipped headings or truncated controls.
- **Spacing and layout rhythm:** The new two-column desktop hero, contained trust strip, and rounded route surface create the stronger hero-to-action cadence of the reference. Mobile converts to one column with full-width primary actions and stable section rhythm.
- **Colors and visual tokens:** Blue primary actions, dark-navy emphasis panel, pale blue surfaces, and restrained gold details translate the reference's high-contrast brand language without borrowing its identity or claims. Primary text and CTA contrast remain clear in both captures.
- **Image quality and asset fidelity:** No imagery from NextNation was copied. Its imagery is not relevant to VisaLang's verification-only product boundary, so the implementation intentionally uses no substitute image, custom SVG, CSS illustration, or placeholder asset.
- **Copy and content:** All VisaLang copy stays route- and authority-first. The new three-step panel describes only supported preparation actions and does not imply acceptance, legal advice, delivery, or immigration outcomes.
- **Icons and controls:** The implementation introduces no new non-standard icon assets. Existing menu, route, and CTA controls retain semantic HTML; the mobile menu remains the existing native `details` control.
- **Responsiveness and accessibility:** At the 500px capture, the heading wraps cleanly, actions remain visible and full-width, the journey panel fits the viewport, and no persistent control is clipped. Existing skip link, focus style, reduced-motion rule, labelled controls, and 48px action targets remain in the build.
- **States and interactions:** `npm run launch-check` confirmed internal links resolve. The primary home action remains a semantic link to `/tools/route-finder/`; the existing Route Finder is unchanged. No new form, login, or stateful interaction was introduced.

## Comparison history

1. Initial live capture (`01-home-desktop.png`) showed a clean but document-like page with weak hero contrast and limited product hierarchy.
2. Reference capture (`04-nextnation-reference.png`) established the desired principles: stronger headline presence, clear primary action, branded contrast, contained information surface, and generous whitespace.
3. The redesign introduced the current blue/navy token system, split homepage hero, three-move route panel, refined global navigation, route selector, cards, footer, and mobile rules.
4. Post-fix evidence (`05-redesign-desktop.png`, `07-redesign-mobile.png`) shows no P0/P1/P2 visual regressions. The reference comparison is intentionally a design-language comparison, not a pixel clone.

## Implementation checklist

- [x] Rebuild the homepage hero around the primary route decision.
- [x] Apply the blue/navy visual system across shared UI surfaces.
- [x] Preserve all route, CTA, tool, compliance, and content contracts.
- [x] Verify desktop and mobile captures.
- [x] Run source, build, and launch-readiness gates.

## Follow-up polish

- [P3] If future product scope includes a confirmed, factual visual asset library, add original editorial photography or licensed route imagery to selected campaign pages. Do not use imagery that implies a completed visa, acceptance, or professional service outcome.

## Selected Option 3: pale canvas with retained dark route stage

### Comparison target

- Source visual truth: `/Users/fanlw/.codex/generated_images/019f53e3-2e7e-7003-8fc6-c60748797e35/exec-15172c55-74d0-404d-8119-1d6b11e3c08b.png` (the user's selected third visual direction).
- Generated route-atlas asset: `public/images/route-atlas-hero.png` (original image generation; no third-party identity or page asset was copied).
- Corrected desktop implementation: `.audit/flowlight-ui-2026-07-12/14-option3-corrected-desktop-fixed.png` (local `/`, 1440 × 1600).
- Corrected mobile implementation: `.audit/flowlight-ui-2026-07-12/15-option3-corrected-mobile.png` (local `/`, 500 × 1200).
- Earlier light-background comparison: `.audit/flowlight-ui-2026-07-12/12-option3-light-comparison.png`.
- Intentional deviation: the user requested a pale background after selecting the dark direction. The pale blue applies to the surrounding page canvas only. The selected direction's dark-navy hero stage, yellow primary action, route-atlas focal point, cobalt planning panel, and dark route selector remain intact.

### Findings and iteration history

1. [P1, fixed] The first mobile capture (`10-option3-light-mobile.png`) showed the 3-column desktop grid still applying at 500px because the homepage selector outweighed the generic mobile rule. The heading and atlas were forced into the same row.
   - Fix: added an equally specific `body:has(.site-main--home) .home-hero { grid-template-columns: 1fr; }` mobile override in `src/styles/global.css`.
   - Post-fix evidence: `11-option3-light-mobile-fixed.png` shows a single-column heading, full-width CTAs, and an atlas that fits within the viewport.
2. [P1, fixed] The first pale-canvas desktop pass washed the selected option's dark route-planning character into a different visual direction. The user correctly flagged that the request concerned the background, not the rest of the design.
   - Fix: restored the dark-navy hero stage and route selector, yellow primary action, route-atlas composition, and cobalt journey panel; the pale color remains only outside the focal modules.
   - Post-fix evidence: `14-option3-corrected-desktop-fixed.png` and `15-option3-corrected-mobile.png` show the retained high-contrast third direction without overlap or mobile overflow.
3. No actionable P0, P1, or P2 findings remain.
4. [P3] The final hero intentionally uses one route-atlas image rather than the selected concept's larger image-and-icon ecosystem. This keeps the page focused and avoids introducing unsupported route categories or decorative icon systems.

### Required fidelity surfaces

- **Fonts and typography:** The display headline uses the selected direction's large, compact sans-serif hierarchy; desktop and mobile wrapping are deliberate and legible.
- **Spacing and layout rhythm:** Desktop uses a three-zone hero (decision copy, atlas, planning panel); mobile stacks those zones in the same decision order.
- **Colors and tokens:** Pale blue canvas frames a dark-navy hero and route selector; yellow is reserved for the primary action and route-step markers; cobalt carries the planning panel. This preserves the selected direction instead of recoloring it into a light-theme variant.
- **Image quality and asset fidelity:** `route-atlas-hero.png` is an original raster asset placed at its measured hero slot; no custom CSS illustration, placeholder, or copied asset replaces it.
- **Copy and content:** The new copy retains the verification-first boundary and does not imply authority acceptance, visa outcomes, or professional representation.
- **Accessibility and interactions:** Primary links remain semantic anchors, 48px action targets remain present, the mobile menu retains native `details` behavior, and the fixed mobile capture has no horizontal overflow or clipped persistent controls.

### Final implementation checklist

- [x] Apply the selected route-atlas direction to the English homepage.
- [x] Use a pale page canvas at the user's request while retaining the dark route stage, yellow action, route atlas, cobalt panel, and dark focal modules.
- [x] Generate and place an original raster hero asset.
- [x] Re-test source and build after the responsive fix.
- [x] Capture desktop and mobile evidence after the fix.

final result: passed

## Optimize Flowlight UI warm-system implementation

### Comparison target

- User-provided implementation: `/Users/fanlw/Downloads/Optimize Flowlight UI (1)/src/app/App.tsx` and its accompanying `src/styles/theme.css` / `src/styles/fonts.css`.
- Direction adopted: warm `#fffaf2` canvas, dark brown text, wine-red primary action, pale-yellow support surface, green verification state, `Baloo 2` display type, `Poppins` interface text, fine warm borders, and a white authority-check card.
- Desktop evidence: `.audit/flowlight-ui-2026-07-12/22-warm-reference-desktop-built.png`.
- Mobile evidence: `.audit/flowlight-ui-2026-07-12/23-warm-reference-mobile-built.png`.

### Validation

- **Homepage:** the hero now follows the supplied direction's two-column decision/check pattern, while keeping VisaLang's own route and authority-first copy, live CTA targets, and no-account/no-outcome boundaries.
- **Shared UI:** navigation, buttons, card grids, guide articles, tool panels, selectors, alerts, and footer use the same palette, typographic pairing, border treatment, and interaction language.
- **Responsive behaviour:** at 500px, the hero stacks in reading order; primary and secondary actions retain full tap width; the route-check card fits within the viewport.
- **Product integrity:** no guide/source data, official requirement claims, tool rule, pricing state, commercial promise, or SEO/schema output was modified for visual adoption.

final result: passed

## Exam-learning visual system — reference-informed, original implementation

### Comparison target

- Reference examined: `https://www.testgerman.de/`.
- Reference principles used: generous light canvas, high-contrast dark type, a single yellow primary action, learning-product hierarchy, and contained practice/feedback-like panels.
- Explicitly excluded: TestGerman's identity, logo, copy, screenshots, mentor product, exam/course data, pricing, user counts, testimonials, partners, claims, and source code.
- VisaLang desktop evidence: `.audit/flowlight-ui-2026-07-12/16-exam-learning-desktop.png`.
- VisaLang mobile evidence: `.audit/flowlight-ui-2026-07-12/17-exam-learning-mobile.png`.

### Fidelity and safety checks

- **Visual system:** the warm canvas, yellow primary action, compact navigation, dark practice-style panel, and generous section pacing are consistently applied to homepage and shared surfaces; the result is recognisably VisaLang rather than a TestGerman page clone.
- **Content and product boundary:** all title, route, verification, tool, and legal content remains VisaLang-owned and authority-first. No unsupported feedback, mentoring, assessment, account, pricing, or pass-result capability is implied.
- **Responsiveness:** at 500px, the hero stacks in a single reading order, both actions occupy full width, and the atlas/practice panel fits within the viewport.
- **Figma handoff:** a design file was created, but local-page import was blocked before completion by the connected account's usage limit. It must be resumed after capacity returns; it is not recorded as complete.

final result: passed
