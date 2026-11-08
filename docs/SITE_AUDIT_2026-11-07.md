# VisaLang site audit — 2026-11-07

Baseline: `cursor/adsense-readiness-content-2710` at `34a67c0` (open PR #6). This pass does not revert that branch’s Germany A1/B1 source recheck, ads-off disclosure, or `advertisingRuntimeEnabled: false` gate.

Method: read `src/pages`, shared layouts, `src/styles/global.css`, route data, and the regression tests. No production analytics were available. Live HTTP checks below are the only production observations.

## Live site

Checked 2026-11-07 from this environment:

| URL | Result |
| --- | --- |
| `https://visalang.org` | HTTP 521, `server: cloudflare`, body `error code: 521` |
| `https://www.visalang.org` | HTTP 521, `server: cloudflare` |

Cloudflare answered. The origin did not. This audit does not claim a hosting fix, a sitemap crawl, or any live traffic, ranking, or ad-serving number. The site is **not ready to apply** for AdSense. Merging this branch would not change that.

## What already holds

- Astro 7 static site, trailing-slash URLs, one production stylesheet, skip link, and one H1 gate in `scripts/launch-check.js`.
- Germany A1 family-reunion hub and Germany B1 settlement/citizenship hub exist, with source-reviewed guides. PR #6 refreshed six of those guides on 2026-11-07 and kept the advertising runtime off.
- Tools, guide index, policy pages, commercial placeholders, and 404 stay off the ad loader. `ads.txt` says the seller line is not approval.
- Chinese coverage is a real Germany A1 set (`src/pages/zh/`, eight guide pages), not a machine translation of the whole site.
- Route Finder still configures only Germany family-reunion A1. Other tool results stay on official verification.

## Problem inventory

### P0 — blocks trust in production, not fixed here

| ID | Area | Evidence | Action |
| --- | --- | --- | --- |
| P0-1 | Hosting | Apex and `www` return HTTP 521 | Owner origin/Cloudflare work. Out of this PR. |
| P0-2 | Advertising honesty | A live ad claim would be false while the origin is down and the runtime is off | Keep the fail-closed gate. Do not write “ready to apply”. |

No additional in-repo P0 defect was verified. Invented fees, dates, or outcomes were not found in the pages this pass edited.

### P1 — fixed in this branch

| ID | Area | Evidence | Change |
| --- | --- | --- | --- |
| P1-1 | Information architecture | Homepage resources named only Germany A1. Route chips called Study, Work, and “Not sure” “Route available” even though those entries open Route Finder’s fallback. | Homepage and `/routes/` link both hubs. Chips say “Guide hub” or “Official check first”. |
| P1-2 | Content boundary | `/routes/` said only A1 had a decision path, which hid the B1 guide hub and could be read as “B1 does not exist”. | Copy now separates the configured A1 tool path, the B1 guide hub, and every other official-verification purpose. Hubs cross-link without merging the procedures. |
| P1-3 | SEO / AEO | English home, routes, exams, and guide titles did not name the developed Germany paths. The Chinese homepage title was a list: 签证、永居、入籍语言考试路径导航. | Titles and descriptions name Germany A1 and B1 once, stay inside the 60 / 170 English snippet budget, and do not promise an outcome. Visible H1s stay task-shaped. |
| P1-4 | Chinese navigation | “指南（英文）” sent readers to the unfiltered English library even though Chinese A1 cards are already in that library. | Chinese header and mobile nav use “中文指南” and `/guides/?language=zh`. The library script already reads that query. |
| P1-5 | Responsive layout | Desktop nav hid only at 768px. Between 769px and 1024px the bilingual labels can overflow the 1200px header. `docs/STYLE_ARCHITECTURE.md` already allowed a 1024px breakpoint, and the CSS did not use it. | Primary nav collapses at 1024px. Route chips stack at 768px. |
| P1-6 | Contrast | Dark-mode `--od-primary` is `#78a6ff` with button text `#fff`. From those hex values the contrast is about 2.3:1, under the 4.5:1 text threshold. The same white-on-primary hover applied to non-home route chips. | Dark-mode primary button text is `#0d1725`. Route-chip hover uses the surface and text tokens. |
| P1-7 | Heading order | Exam directory used `h3` for both the country and the exam name. | Country stays `h3`. Exam name is `h4`, with the existing card type styles. |
| P1-8 | Internal links | `/exams/` listed official sites and did not lead with the A1/B1 comparisons. | Four links: Goethe A1 vs telc A1, DTZ/Goethe/telc B1, and both hubs. |

### P2 — left open

| ID | Area | Notes |
| --- | --- | --- |
| P2-1 | Exam directory scope | `src/data/app-data.ts` still lists professional exams (USMLE, NCLEX, NMLS, interpreter certificates) beside language exams. They are external links, not new articles. Removing them needs a separate content decision so a licensing reader is not dropped without a note. |
| P2-2 | Chinese B1 | There is no Chinese B1 hub. A thin translation would violate the depth rule. The UI now says the B1 hub is English. |
| P2-3 | Source gaps carried from PR #6 | BAMF and some Goethe HTML responses were not re-read in that environment. Those guides already say so. This pass did not pretend to re-read them. |
| P2-4 | B1 hub statutes | The 2026-11-07 hub sentence only separates family reunion from settlement/citizenship. It is not a new statutory re-read. Linked guides keep their own `sourceReviewedAt`. |
| P2-5 | CI | There is still no `.github/workflows` pipeline. `npm test` and `npm run launch-check` remain local gates. |
| P2-6 | Account evidence | CMP, Search Console, and ad-account state were not available. Do not treat the repository as account proof. |
| P2-7 | Motion | Resource-link hover no longer translates when reduced motion is requested. Other decorative motion was not re-audited in a browser. |

## Follow-on feature planning

Do these only after the origin returns HTTP 200 and the owner asks:

1. Smoke-test the deployed footer, privacy copy, and absence of `pagead2` on the home page and one A1 guide.
2. Re-open the blocked BAMF and Goethe URLs and record what they actually support.
3. Decide whether the exam directory should drop non-language professional entries.
4. Commission a real Chinese B1 hub only with the same source ledger as the English hub. Do not machine-translate it.
5. Add a CI job for `npm test` and `npm run launch-check` if the owner wants pull-request gates.
6. Advertising stays a later project: owner turns `advertisingRuntimeEnabled` on, privacy copy is rewritten in the same change, and slots are labelled. That work is not started here.

## Skills added

| Skill | Path | Use |
| --- | --- | --- |
| UI conventions | `.cursor/skills/ui-design/SKILL.md` | Tokens, 1024/768/375, contrast, one H1, no second theme |
| Content updates | `.cursor/skills/content-update/SKILL.md` | Authority order, no invented fees or dates, Chinese labelling, update log |
| SEO / AEO | `.cursor/skills/seo-aeo/SKILL.md` | Title, description, heading level, internal links, hreflang, no stuffing |

## SEO / AEO brief follow-up

The 2026-11-07 SEO/AEO brief is the keyword source for this pass. It does not supply search volumes or live rankings, and visalang.org was still HTTP 521, so those were not added.

The top-pick page is `/guides/german-family-reunion-language-requirement/`. Its search title is the question “Do you need German A1 for family reunion?” and the direct answer leaves the decision with the competent mission. Downstream links go to Goethe A1 proof, the Goethe/telc comparison, the FAQ, and the documents checklist. The A1 and B1 hub titles, the Leben in Deutschland answer, and the settlement and citizenship descriptions were tightened the same way. `sourceReviewedAt` on the requirement guide stays 2026-10-21.

## Verification results

- `npm test` passed, including the new `tests/site-audit-2026-11-07.test.js` assertions.
- `npm run launch-check` built 101 pages and passed 46/46 with `READY`. Titles and descriptions stayed unique and inside the English snippet budget. The AdSense runtime stayed off.
- A local preview was opened in Chrome. The English homepage has one H1, both Germany hubs, and no `pagead2` script. At 1000px the header uses the menu button, and that menu opens. Dark-mode primary button text computed as `rgb(13, 23, 37)` on `rgb(120, 166, 255)`. `/guides/?language=zh` showed 8 of 38 guides. The exams page at 375px did not scroll sideways.
- `https://visalang.org` was still HTTP 521, so production rendering was not checked.
