# Phase 2 content / SEO / quality audit

Date: 2026-07-13

Scope: narrow content, SEO metadata, guide-link, and quality review of the current VisaLang content site. This was not a publishing, deployment, product, commercial-flow, analytics, advertising, dependency, or UI-polish window.

## Audit findings

| Finding | Files | In scope? | Action |
| --- | --- | --- | --- |
| A1 route hub says related guides are shown in route order, but the rendered list was sorted by most recent update date. | `src/pages/germany-family-reunion-a1.astro` | Yes | Fixed by using an explicit route-order list for the eight hub guide cards. |
| Several guide `description` fields were shorter than a useful SEO summary or longer than the repo's desired concise range. | `src/content/guides/*.md`, `tests/content-integrity.test.js` | Yes | Fixed concise descriptions and added a metadata-length guard. |
| A1 / B1 high-risk wording scan still produces terms like eligibility, exemption, result timing, fee, and accepted proof, but the reviewed hits are mostly boundary language telling readers to verify with the competent authority or official centre. | A1 / B1 guide Markdown and route hubs | Yes | No bulk rewrite. Keep as manual review watchlist. |
| B1 route hub and guide pages keep authority-first language and separate language proof from residence, income, insurance, housing, civic knowledge, procedure, and eligibility. | `src/pages/germany-b1-settlement-citizenship.astro`, `src/content/guides/*b1*.md` | Yes | No code/content change needed beyond metadata fixes. |
| A1 route hub records "Official verification date not separately recorded" while individual audited guides record source-check dates. | `src/pages/germany-family-reunion-a1.astro`, A1 guide Markdown | Yes | Documented as a remaining editorial boundary; do not invent a route-level source-check date. |

## Not handled in this window

- No deployment or production publish.
- No new route/business line/page batch.
- No changes to tools, pricing, partners, Route Review commercial flow, analytics, advertising, deployment configuration, or dependencies.
- No UI restyle or homepage hero work.
- No broad rewrite of older non-A1/B1 country guides beyond concise metadata descriptions.

## Human review items

- Before publishing future content or running a new route expansion, manually recheck any page that would state a fee, result time, accepted certificate, exemption, or eligibility conclusion.
- Treat the competent authority as the source of route acceptance and eligibility, and the official or authorised centre as the source of exam logistics.
- If the A1 route hub needs a route-level official-source check date later, verify every listed official entry point first instead of copying guide-level dates upward.
