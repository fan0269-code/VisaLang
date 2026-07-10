# VisaLang Task Log

Updated: 2026-07-10

This log records current project-map findings, known issues, and recommended next-window boundaries for flowlight.me / VisaLang.

## Final QA / Deployment Check Window - 2026-07-10

Role: final quality check and deployment readiness owner.

Overall conclusion:

- Can deploy, with human official-source review items for future content maintenance.
- No blocking build, route, internal-link, sitemap, robots, canonical, CTA, or mobile-overflow issue was found in this final QA pass.

Package manager:

- Used npm because `package-lock.json` exists and `package.json` defines npm scripts.

Commands run:

- `npm install`: passed; dependencies already up to date.
- `npm run build`: passed; 79 pages generated.
- `npm test`: passed.
- `npm run launch-check`: passed; 55 checks, 0 warnings, 0 failures, `READY`.
- `npm run dev -- --host 127.0.0.1 --port 4321`: first attempt was blocked by local sandbox port permission; passed after explicit local-server permission.
- `npm run preview -- --host 127.0.0.1 --port 4322`: passed after explicit local-server permission.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

Pages checked:

- `/`
- `/guides/`
- `/guides/?category=germany-a1`
- `/germany-family-reunion-a1/`
- `/guides/goethe-a1-fees-by-country/`
- `/guides/goethe-a1-test-centers/`
- `/guides/goethe-a1-retake-policy/`
- `/guides/german-a1-documents-checklist/`
- `/guides/goethe-a1-speaking-topics/`
- `/guides/german-a1-family-reunion-faq/`
- `/guides/goethe-a1-vs-telc-a1/`
- `/guides/german-family-reunion-language-requirement/`
- `/guides/goethe-a1-booking-mistakes/`
- `/guides/goethe-a1-30-day-study-plan/`
- `/about/`
- `/editorial-policy/`
- `/privacy-policy/`
- `/cookie-policy/`
- `/terms/`
- `/affiliate-disclosure/`
- `/zh/`
- `/zh/germany-family-reunion-a1/`

Page / route result:

- All checked local dev-server routes returned `200`.
- Production preview sanity check for `/`, `/guides/`, `/germany-family-reunion-a1/`, and `/zh/` returned `200`.
- Checked pages had one H1, a title, a meta description, a canonical URL, footer links, and no empty `href`, `href="#"`, or `javascript:` link.

Link / navigation result:

- `launch-check` passed internal-link validation.
- Header, Footer, breadcrumbs, Related guides, Germany A1 route links, and language-switch links passed existing automated checks.
- `/guides/?category=germany-a1` is intentionally a client-side filtered query view that canonicalizes to `/guides/`; indexable category pages are under `/guides/category/{category}/`.
- No dead internal link was fixed in this pass.

Fixes completed:

- Removed the public placeholder `YOUR_FORM_ENDPOINT` example from legacy `app.js`. The waitlist remains demo/local-storage mode, but the public front-end script no longer exposes a half-configured endpoint placeholder.

SEO result:

- Generated sitemap and robots checks passed.
- Generated sitemap includes core pages, Germany A1 pages, Chinese pages, guides, and guide category pages.
- Generated sitemap excludes configured noindex legal pages.
- Generated guide `lastmod` values match `updatedDate`.
- No duplicate generated page titles or duplicate generated meta descriptions were found.
- Guide pages still emit Article and BreadcrumbList JSON-LD; guide index/category pages emit CollectionPage and ItemList JSON-LD.

UI / mobile result:

- Existing responsive CSS covers header wrapping/scrolling, guide grids, guide facets, card grids, long links, tables, and code blocks.
- No hard-coded wide inline styles or obvious mobile-overflow blocker was found in the checked Astro pages.
- Mobile visual risk is not a deploy blocker, but a human screenshot pass is still useful after deploy or before design review.

Content / compliance result:

- Search for risky terms found no recommended guaranteed-pass, leaked-material, copied-answer, or unofficial-authority claims. Matches were in prohibitions, disclaimers, or "verify officially" wording.
- Germany A1 content continues to avoid fixed fee/date/test-center promises and tells readers to verify with official sources, test centers, embassies, or consulates.
- All guide content files checked had `updatedDate`, related metadata, and detectable official-source cues.

Remaining risks:

- No `lint` or `typecheck` scripts are configured in `package.json`.
- Legacy root static files still coexist with Astro source/output; do not delete or reconcile them without a separate source-of-truth task.
- Waitlist is still demo/local-storage mode in the legacy layer; the Astro guide CTA points to `/contact/`, not a live signup provider.
- Some guide bodies remain thin, especially `portuguese-ciple-a2-for-citizenship-and-residence`, `portuguese-language-for-golden-visa-and-citizenshi`, `staatsexamen-nt2-for-work-and-higher-education`, `cils-vs-celi-vs-plida-for-italian-citizenship`, `goethe-a1-30-day-study-plan`, `dutch-inburgering-a2-b1-for-integration-and-citize`, `goethe-a1-vs-telc-a1`, and `german-family-reunion-language-requirement`.
- Chinese coverage is real but partial; `/zh/`, the Chinese Germany A1 hub, and five Chinese core guide pages exist, but the full guide library is not localized.

Human confirmation needed:

- Re-check current official fee, date, retake, ID, test-center, certificate-acceptance, embassy/consulate, and exemption rules before making country-specific publishing claims.
- Decide whether to add formal `lint` and `typecheck` scripts in a separate engineering hardening pass.
- Decide whether the legacy waitlist should be wired to a real provider or left as a demo/contact flow.
- Decide later whether the static-only `/do-i-need-german-a1.html` should become an Astro route.

Recommended next module:

- Deploy is acceptable from the current build.
- After deploy, monitor 404s, Search Console indexing/sitemap status, and CTA/contact clicks.
- Next content-maintenance window should deepen Germany A1 thin pages first: fees, test centers, retake policy, documents checklist, speaking topics, and the 30-day study plan.

## UI Sitewide Unity Follow-up Window - 2026-07-10

Role: UI design system and sitewide visual consistency owner.

Scope completed:

- Re-read `docs/PROJECT_CONTEXT.md`, `docs/CONTENT_MAP.md`, `docs/TASK_LOG.md`, current UI source, layout components, guide templates, Chinese pages, and the existing project scripts.
- Kept this window strictly to UI/display-layer work. No guide body rewrites, no article title edits, no article summary edits, no SEO title/meta description edits, no slug/route changes, no sitemap/robots/canonical changes, no package/deploy config changes, and no policy/fee/date/source claims were changed.
- Promoted English and Chinese Germany A1 route hubs from the standard narrow guide body width to the shared `route-hub-page` width so the hub pages feel more like route entry points while staying in the same visual system.
- Converted the Germany A1 hub's five core decision links into shared card styling so fees, test centers, retake, documents, and speaking entries look like intentional route actions instead of loose article links.
- Updated Chinese guide breadcrumbs and related-guide sections to reuse the same `guide-breadcrumb` and `guide-related` classes as English guide pages.
- Added small shared CSS refinements for route hub width and card behavior inside guide articles.

Files changed in this UI follow-up:

- `src/styles/global.css`
- `src/pages/germany-family-reunion-a1.astro`
- `src/pages/zh/germany-family-reunion-a1.astro`
- `src/components/ZhGuideLayout.astro`
- `docs/TASK_LOG.md`

Unified components / UI surfaces:

- Route hub page width: `route-hub-page`.
- Guide breadcrumbs: English and Chinese guide pages now share `guide-breadcrumb`.
- Related guides: English and Chinese guide pages now share `guide-related` and `guide-related-grid`.
- Route hub entry cards: Germany A1 core decision links now use the same `article-card` family as other guide cards.
- Mobile behavior remains governed by the existing global breakpoints for card grids, route grids, guide facets, search rows, and guide layout.

Homepage UI result:

- No new homepage changes were required in this follow-up. The current homepage already presents the route finder, Germany A1 primary route, coverage stats, Browse by route, Featured guides, and Latest updates inside the shared UI system.

Guides list UI result:

- No filter logic was changed. `/guides/` already uses the shared library header, popular routes, route pills, country/route/exam/level facets, search panel, route overview, guide cards, and empty state.

Guide detail UI result:

- English guide detail pages already use `GuideLayout.astro` with breadcrumbs, summary box, audience sections, TOC, official verification, common mistakes, related guides, last updated, disclaimer, and CTA.
- Chinese guide detail pages now reuse the same breadcrumb and related-guide visual classes, reducing the remaining mismatch between English and Chinese guide templates.

Germany A1 route page UI result:

- `/germany-family-reunion-a1/` and `/zh/germany-family-reunion-a1/` now use the wider route hub width.
- The English route hub's five high-priority decision entries now read as route cards/guide cards, making fees, test centers, retake, documents, and speaking topics easier to scan.

About / Legal UI result:

- No new About/Legal changes were required in this follow-up. Current About, Contact, legal, and 404 pages already use shared page shells and narrow guide article styling from the previous UI window.

Mobile fixes / checks:

- No hard-coded wide inline styles were found in the checked Astro pages.
- Static UI shell/mobile-risk check passed for homepage, guides index, representative English guide, English route hub, Chinese route hub, representative Chinese guide, About, Privacy, and Chinese homepage.
- Header, language switch, card grids, guide facets, search rows, route hub width, and guide breadcrumbs remain covered by global responsive CSS.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed, 79 pages generated.
- `npm run launch-check`: passed, 55 checks, READY.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

Remaining UI risks / human review:

- A real browser screenshot pass is still recommended before deployment sign-off, especially `/`, `/guides/`, `/guides/category/germany-a1/`, `/guides/goethe-a1-germany-family-reunion/`, `/germany-family-reunion-a1/`, `/zh/`, `/zh/germany-family-reunion-a1/`, and one Chinese guide page.
- Legacy root static files still coexist with Astro source; do not reconcile or delete them without a separate source-of-truth/deploy task.
- Some non-Germany guide bodies remain thin, but that is a content-depth issue, not a UI unification blocker.

Final recommendation:

- UI is ready to enter a final visual QA / deployment window, with human screenshot review as the next best step.

## Guides + SEO Follow-up Window - 2026-07-10

Role: Guides + SEO owner, focused on information architecture and metadata after the Germany A1 depth pass.

Scope completed:

- Re-checked `docs/PROJECT_CONTEXT.md`, `docs/CONTENT_MAP.md`, `docs/TASK_LOG.md`, current guide source files, guide list routes, guide category routes, guide template, sitemap/robots/canonical behavior, and launch scripts.
- Kept the existing Guides library architecture: `/guides/` remains the searchable/filterable library, `/guides/?category=xxx` remains a client-side filtering path, and `/guides/category/{category}/` is the indexable static category path.
- Made light SEO metadata edits only for six Germany A1 core guides; no article body rewrites and no new policy, fee, date, or exam-center claims were added.
- Updated `docs/CONTENT_MAP.md` for the changed Germany A1 guide titles and last-updated dates.

Files changed in this follow-up:

- `src/content/guides/german-a1-family-reunion-faq.md`
- `src/content/guides/goethe-a1-vs-telc-a1.md`
- `src/content/guides/german-family-reunion-language-requirement.md`
- `src/content/guides/goethe-a1-booking-mistakes.md`
- `src/content/guides/goethe-a1-30-day-study-plan.md`
- `src/content/guides/goethe-a1-germany-family-reunion.md`
- `docs/CONTENT_MAP.md`
- `docs/TASK_LOG.md`

Guides list / category result:

- `/guides/` displays all 49 current English guide entries from the content collection.
- `/guides/?category=xxx` filters in the browser and keeps canonical as `/guides/`, which avoids indexing many duplicate query URLs.
- Static category pages under `/guides/category/{category}/` are the indexable category aggregation pages, with their own H1, title, meta description, canonical URL, CollectionPage JSON-LD, and ItemList JSON-LD.
- The user-supplied `telc-deutsch` category label maps to the current project category slug `germany-telc`; no new duplicate slug was introduced.
- Country, route, exam, and level filters still rely on `src/data/guide-taxonomy.ts` inference, not first-class frontmatter fields.

Guide template / structured data result:

- Guide detail pages use `GuideLayout.astro` with breadcrumbs, H1, summary box, audience fit, non-fit, TOC, body slot, official verification, common mistakes, related guides, last updated, disclaimer, CTA, and footer.
- Guide detail pages emit Article and BreadcrumbList JSON-LD with published and modified dates.
- Category pages emit CollectionPage and ItemList JSON-LD.
- No fake ratings, reviews, prices, Course schema, or FAQPage schema were added.

Germany A1 internal-link result:

- `/germany-family-reunion-a1/` links to the core Germany A1 guides.
- Every Germany A1 guide receives a shared route-support module linking back to the Germany A1 hub and core guide set.
- Fees page links to test centers, booking mistakes, and booking timeline.
- Test centers page links to documents, Goethe A1 vs telc A1, and fees.
- Documents page links to booking mistakes, language requirement, and test centers.
- Retake page links to speaking, listening, study plan, and booking timeline.
- Speaking page links to study plan, listening practice, and retake.
- FAQ is linked from the shared Germany A1 route-support module and links to requirement, Goethe/telc comparison, and documents.
- Goethe A1 vs telc A1 links to booking mistakes, test centers, and documents.
- Language requirement links to the Goethe A1 route, Goethe A1 vs telc A1, and FAQ; this should be content-reviewed later if the desired next step is documents rather than FAQ.

Title / description optimized:

- `german-a1-family-reunion-faq`: title and description now clarify language-proof FAQ scope.
- `goethe-a1-vs-telc-a1`: title and description now specify German family reunion use and practical comparison dimensions.
- `german-family-reunion-language-requirement`: title and description now frame the page as a requirement guide with official verification.
- `goethe-a1-booking-mistakes`: title and description now describe booking-risk checks before payment.
- `goethe-a1-30-day-study-plan`: title and description now specify family reunion applicants, four-skill practice, official materials, and risk checks.
- `goethe-a1-germany-family-reunion`: title and description now specify visa-proof planning and official verification.

Remaining weak title candidates:

- `dutch-inburgering-a2-b1-for-integration-and-citize`
- `goethe-a1-listening-practice`
- `goethe-a1-pre-booking-checklist`
- `goethe-b1-difficulty-analysis`
- `goethe-b1-listening-deep-dive`
- `goethe-b1-mock-exam-routine`
- `goethe-b1-speaking-topics`
- `goethe-b1-writing-assessment`
- `languagecert-selt-uk-visa`
- `portuguese-ciple-a2-for-citizenship-and-residence`
- `portuguese-language-for-golden-visa-and-citizenshi`
- `telc-b1-b2-fees-and-test-centers`

Remaining weak description candidates:

- `cils-b1-cittadinanza-for-italian-citizenship`
- `cils-vs-celi-vs-plida-for-italian-citizenship`
- `dele-a2-ccse-spanish-citizenship`
- `dele-levels-spanish-citizenship`
- `delf-b1-b2-french-work-study`
- `dutch-inburgering-a2-b1-for-integration-and-citize`
- `goethe-a1-study-plan-working-adults`
- `goethe-b1-fees-and-booking`
- `goethe-b1-germany-settlement-work`
- `languagecert-selt-uk-visa`
- `portuguese-ciple-a2-for-citizenship-and-residence`
- `portuguese-language-for-golden-visa-and-citizenshi`
- `staatsexamen-nt2-for-work-and-higher-education`
- `tcf-irn-french-residence`
- `tef-canada-immigration`
- `testdaf-vs-goethe-dsh`
- `yki-finnish-citizenship`
- `yki-vs-other-finland-options`

Thin body candidates for content window:

- Highest priority non-Germany pages: `portuguese-ciple-a2-for-citizenship-and-residence`, `portuguese-language-for-golden-visa-and-citizenshi`, `staatsexamen-nt2-for-work-and-higher-education`, `cils-vs-celi-vs-plida-for-italian-citizenship`, `dutch-inburgering-a2-b1-for-integration-and-citize`, `tcf-canada-vs-tef`, `cils-b1-cittadinanza-for-italian-citizenship`, `delf-b1-b2-french-work-study`, `testdaf-levels-and-scoring`.
- Germany A1 pages still worth content deepening after the shared template support: `goethe-a1-vs-telc-a1`, `goethe-a1-30-day-study-plan`, `goethe-a1-official-links-practice-resources`, `german-family-reunion-language-requirement`, `goethe-a1-germany-family-reunion`, `goethe-a1-test-centers`.

No current gaps found in this audit:

- Missing official source: none detected in current guide bodies.
- Missing Related guides: none detected in current guide frontmatter.
- Missing Last updated: none detected in current guide frontmatter.

Possible duplicate / canonical risks:

- `/guides/?category=...` and `/guides/category/.../` overlap in user intent. Current handling is acceptable because query URLs canonicalize to `/guides/`, while static category pages are the indexable route pages.
- Legacy root `guides/*.html` and generated Astro guide pages still coexist. Do not remove legacy files without a separate source-of-truth/deployment task.
- `sitemap.xml` in the legacy root layer and generated `dist/sitemap-index.xml` still represent two layers. Current launch checks pass, but deployment source-of-truth should remain a separate task.

Sitemap / robots / canonical result:

- Generated Astro sitemap includes `/germany-family-reunion-a1/`, guides, Chinese generated pages, and static guide category pages.
- Generated sitemap excludes configured noindex legal pages.
- `public/robots.txt` points to `https://flowlight.me/sitemap-index.xml`.
- Guide detail canonical URLs point to `/guides/{slug}/`.
- Static category canonical URLs point to `/guides/category/{category}/`.
- Query-filtered `/guides/?category=...` URLs are not intended as separate indexable pages.

Artificial / human confirmation needed:

- Confirm whether `country`, `exam`, `level`, and source-check date should become formal frontmatter fields instead of inferred taxonomy.
- Confirm whether `language requirement` should link directly to `documents checklist` in frontmatter related guides, replacing or supplementing FAQ.
- Confirm whether the static-only `/do-i-need-german-a1.html` should become an Astro route.
- Re-check all current official source claims before a public publishing push involving fees, exam dates, certificate acceptance, local test centers, retake rules, or country-specific mission rules.

UI window status:

- A UI unification window has already run after the original Guides + SEO pass.
- Remaining UI work is not required before final QA, but a browser screenshot review of `/guides/`, `/guides/category/germany-a1/`, representative guide pages, and mobile filters would still be useful before public design review.

Final QA status:

- The project already has a later final QA log entry showing `npm run launch-check` passed with 55 checks and `READY`.
- Fresh follow-up verification after the metadata changes passed:
  - `npm run build`: passed, 79 pages generated.
  - `npm test`: passed.
  - `npm run launch-check`: passed, 55 checks, READY.
  - `npm run lint`: not available in `package.json`, so not run.
  - `npm run typecheck`: not available in `package.json`, so not run.

## Final QA / Deployment Readiness Window - 2026-07-09

Role: final quality check and release owner.

Deployment recommendation:

- Can deploy from the current Astro build output.
- Final automated launch status: `npm run launch-check` passed with 55 checks, 0 warnings, 0 failures, `READY`.

Fixes completed:

- Changed the shared guide CTA in `src/components/GuideCTA.astro` from the missing Astro homepage `/#waitlist` anchor to the real `/contact/` page.
- Added `tests/site.test.js` assertions so the guide CTA stays pointed at `/contact/` and does not regress to `/#waitlist`.

Commands run:

- `npm install`: passed, dependencies already up to date.
- `npm run dev -- --host 127.0.0.1 --port 4321`: initially blocked by local sandbox port permission, then passed after local network permission was granted.
- `npm run build`: passed, 79 pages generated.
- `npm test`: passed.
- `npm run launch-check`: passed, 55 checks, `READY`.
- `npm run lint`: not available in `package.json`, so not run.
- `npm run typecheck`: not available in `package.json`, so not run.

Manual / browser checks completed:

- Checked these priority routes via the local dev server: `/`, `/guides/`, `/guides/goethe-a1-germany-family-reunion/`, `/germany-family-reunion-a1/`, `/about/`, `/editorial-policy/`, `/privacy-policy/`, `/cookie-policy/`, `/terms/`, `/affiliate-disclosure/`, `/zh/`, and `/zh/germany-family-reunion-a1/`.
- Desktop and 390px mobile viewport checks found no horizontal overflow on the checked pages.
- The checked pages each had one H1, canonical URL, meta description, Footer links, language switch, and working CTA/link targets.
- Internal-link launch check passed with no dead links.
- Generated sitemap and robots checks passed; generated robots points to the sitemap index.
- Duplicate page-title scan found no duplicate generated titles.

Trust / compliance result:

- About, Editorial Policy, Affiliate Disclosure, Privacy, Cookie, and Terms pages are accessible and use the shared site shell.
- Guide pages have template-level official-source reminders, last-updated cues, disclaimers, and structured data.
- Search for risky claims found no recommended "guaranteed pass", leaked-material, or copied-answer guidance; those terms appear in prohibitions/disclaimers.
- Current fee, date, policy, certificate-acceptance, and country-specific mission claims still require official-source recheck before any strong country-specific publishing push.

Remaining risks:

- No dedicated `lint` or `typecheck` scripts exist in `package.json`; launch confidence currently depends on Astro build, source tests, launch checks, and browser/static inspection.
- Some guide bodies remain thin even though template-level support adds trust cues. Shortest current bodies include Portuguese CIPLE A2, Goethe A1 retake policy, Goethe A1 test centers, Portuguese Golden Visa language, Staatsexamen NT2, German A1 documents checklist, CILS comparison, Goethe A1 speaking topics, Goethe A1 30-day plan, Dutch Inburgering, Goethe A1 vs telc A1, and Goethe A1 fees by country.
- Chinese coverage is intentionally partial: `/zh/`, the Chinese Germany A1 hub, and five Chinese core guides exist; non-Germany Chinese routes and secondary Germany A1 pages are not fully localized.
- Legacy root static files still coexist with Astro source and generated output. Do not delete or rewire them without a separate source-of-truth/deploy task.

Pages needing human review:

- `/guides/goethe-a1-fees-by-country/`
- `/guides/goethe-a1-test-centers/`
- `/guides/goethe-a1-retake-policy/`
- `/guides/german-a1-documents-checklist/`
- `/guides/goethe-a1-speaking-topics/`
- `/guides/portuguese-ciple-a2-for-citizenship-and-residence/`
- `/guides/dutch-inburgering-a2-b1-for-integration-and-citize/`
- `/zh/` and `/zh/germany-family-reunion-a1/` for Chinese-market copy fit.

Official-source verification needed:

- Current German mission rules by applicant country or appointment location.
- Whether A1 applies, and which exemptions may apply, for the user's exact family reunion case.
- Whether Goethe A1, telc A1, or other A1 certificates are accepted by the responsible authority.
- Current Goethe/telc local fees, dates, ID rules, cancellation rules, retake rules, result timing, and certificate delivery.
- Current Portugal, Netherlands, Italy, Spain, France, Finland, UK, and Canada official pages before expanding non-Germany routes.

Recommended next module:

- Maintain the Germany A1 cluster first, especially fees, test centers, retake policy, documents checklist, and speaking topics.
- A new window is recommended for content expansion rather than continuing in this QA window.

## Chinese Core Path Window - 2026-07-09

Role: Chinese site and internationalization owner.

Scope completed:

- Reworked `src/pages/zh/index.astro` so `/zh/` points first to the Chinese Germany A1 path instead of pulling English featured guide cards into the core Chinese journey.
- Added `src/pages/zh/germany-family-reunion-a1.astro` as the Chinese Germany A1 family reunion topic page.
- Added five Chinese core Germany A1 guide pages:
  - `/zh/guides/german-family-reunion-language-requirement/`
  - `/zh/guides/goethe-a1-vs-telc-a1/`
  - `/zh/guides/goethe-a1-booking-mistakes/`
  - `/zh/guides/german-a1-documents-checklist/`
  - `/zh/guides/goethe-a1-30-day-study-plan/`
- Added shared Chinese guide data in `src/data/zh-germany-a1.ts`.
- Added shared Chinese guide wrapper in `src/components/ZhGuideLayout.astro` with `zh-CN`, canonical URLs, hreflang alternates, Article JSON-LD, official-source reminders, related Chinese guides, and compliance disclaimer.
- Updated `src/components/Header.astro` so the Chinese navigation uses Chinese entry points and available English/Chinese guide translations switch directly between paired pages.
- Updated `tests/site.test.js` and `scripts/launch-check.js` to cover the Chinese hub, five Chinese guides, zh-CN metadata, canonical/hreflang, Chinese navigation, language switching, and official-check reminders.

Chinese content still not complete:

- The Chinese site is not a full translation of every English page.
- Non-Germany routes still point to the English guide library or English route pages.
- Germany A1 Chinese coverage now has the core path, but secondary pages such as fees by country, test centers, retake policy, speaking topics, listening practice, official resources, FAQ, and working-adult study plan are still not fully Chinese.

Language switching:

- `/zh/` switches to `/`.
- `/zh/germany-family-reunion-a1/` switches to `/germany-family-reunion-a1/`.
- The five Chinese core guide pages switch to their English guide equivalents, and the matching English guide pages switch back to the Chinese versions.
- English pages without a Chinese equivalent still send users to `/zh/` as the Chinese homepage.

Chinese SEO completed:

- Chinese homepage keeps `zh-CN`, canonical URL, hreflang alternates, and WebSite JSON-LD.
- Chinese topic page has its own title, meta description, canonical URL, hreflang alternates, and FAQPage JSON-LD.
- Five Chinese guide pages have independent titles, meta descriptions, canonical URLs, hreflang alternates, and Article JSON-LD.
- Generated sitemap includes the Chinese generated pages through Astro sitemap generation.

Manual policy checks still needed before treating claims as current:

- Current German mission requirements for the applicant's country or appointment location.
- Whether A1 applies to the user's exact family reunion case and whether an exemption may apply.
- Whether Goethe A1, telc A1, or another certificate is accepted by the responsible authority.
- Current Goethe/telc local fees, exam dates, ID rules, cancellation rules, retake rules, result timing, certificate delivery, and document requirements.
- Any country-specific Chinese applicant instructions from the German mission in China or the responsible application center.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed, 79 pages generated.
- `npm run launch-check`: passed, 55 checks, READY.

## UI Design System + Sitewide Visual Unity Window - 2026-07-09

Role: UI design system and sitewide visual consistency owner.

Scope completed:

- Expanded `src/styles/global.css` into the shared UI layer for page shells, narrow content pages, section headers, card grids, route cards, stat cards, badges/tags, primary/secondary buttons, route finder panels, library panels, guide filters, search controls, and mobile breakpoints.
- Reworked `src/pages/index.astro` so the homepage reads as a route-selection tool: clearer hero, prominent Exam Route Finder, Germany A1 as the primary route, professional coverage stats, route browsing before editorial guide lists, and latest updates pushed lower.
- Reworked `src/pages/guides/index.astro` so `/guides/` reads as a guide library: shared library header, popular routes, route filter pills, country/route/exam/level facets, search panel, route overview, unified guide cards, filter status, and empty-state behavior.
- Unified static route category pages in `src/pages/guides/category/[category].astro` with the same library header and guide card grid.
- Unified `src/pages/germany-family-reunion-a1.astro` with the shared page shell, narrow guide article width, shared guide grid, and shared CTA styling.
- Unified `src/pages/zh/index.astro` with the same hero, stat grid, feature-route panel, section headers, and route cards used by the English homepage.
- Unified About, Contact, legal, and 404 page layouts through `page-shell`, `narrow-page`, and shared guide article styling.

Files changed in this UI window:

- `src/styles/global.css`
- `src/pages/index.astro`
- `src/pages/guides/index.astro`
- `src/pages/guides/category/[category].astro`
- `src/pages/germany-family-reunion-a1.astro`
- `src/pages/zh/index.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/privacy-policy.astro`
- `src/pages/cookie-policy.astro`
- `src/pages/terms.astro`
- `src/pages/editorial-policy.astro`
- `src/pages/affiliate-disclosure.astro`
- `src/pages/404.astro`

Mobile fixes:

- Added shared small-screen rules so route finder, feature route, card grids, stat grids, guide facets, and guide search collapse to one column.
- Kept header navigation horizontally scrollable on small screens while preserving the language switch outside the nav row.
- Standardized guide/legal/route body width to avoid hard-coded wide layouts.
- Removed remaining hard-coded inline widths from the checked Astro pages, except no content-strategy or legacy static layer changes were made.

Verification completed:

- `npm test`: passed.
- `npm run build`: passed, 73 pages generated.
- `npm run launch-check`: passed, 53 checks, READY.
- Static UI shell/mobile-risk check passed for homepage, guides index, representative guide detail, Germany A1 route hub, About, Privacy, and Chinese homepage.

Pages or areas still worth a later dedicated pass:

- Legacy root HTML/CSS files remain outside the Astro UI system and should only be reconciled in a separate source-of-truth task.
- Individual non-Germany guide bodies still vary in depth and structure; this window unified the wrapper, not the 49 Markdown bodies.
- A live browser screenshot pass would still be useful before a public design review; local preview binding was blocked by the current sandbox, so this window used build output and static risk checks instead.

## Guides + SEO Window - 2026-07-09

Role: Guides list, guide template, and SEO owner.

Scope completed:

- Added shared guide taxonomy in `src/data/guide-taxonomy.ts` for route, country, exam, level, route descriptions, and popular-route flags.
- Upgraded `/guides/` from a simple article list into a guide library with popular routes, route overview, search, route/category filter pills, and country / route / exam / level faceted filters.
- Kept `/guides/?category=xxx` working as a client-side filter path while adding static indexable category pages at `/guides/category/{category}/`.
- Expanded guide cards through `src/components/ArticleCard.astro` so cards show title, short description, country tag, route tag, exam tag, level tag, last updated, related route, reading time, and CTA.
- Standardized `src/layouts/GuideLayout.astro` with template-level Summary, Who this guide is for, Who this guide is not for, On this page, main content, Official verification, Common mistakes, Related guides, Last updated, Disclaimer, CTA, and global footer.
- Updated guide breadcrumbs and same-route backlinks to point to real static category pages instead of homepage anchors or query-only route views.
- Added `ogType` support in `src/layouts/BaseLayout.astro` and set guide pages to `og:type=article`.
- Added `CollectionPage` and `ItemList` JSON-LD for each static guide category page.
- Updated `scripts/launch-check.js` so generated category pages are checked as collection pages, while guide detail pages remain checked for Article/BreadcrumbList JSON-LD, trust cues, and same-route backlinks.

Filtering issues fixed:

- `/guides/?category=xxx` still filters the visible list.
- Search now works together with category, country, exam, and level filters.
- Empty state remains visible when no guide matches.
- Mobile filters collapse to a single-column control stack.
- Static category pages give SEO and no-JavaScript users a real route collection page.

SEO optimized:

- Guide detail pages now emit article Open Graph type.
- Static category pages have canonical URLs, meta descriptions, CollectionPage JSON-LD, and ItemList JSON-LD.
- Guide detail internal links now point to `/guides/category/{category}/`.
- Generated sitemap now includes the new static category pages through Astro sitemap generation.
- Launch checks continue to verify canonical URLs, H1 count, useful meta descriptions, guide structured data, sitemap inclusion, robots, internal links, and noindex legal-page sitemap filtering.

Guide template changes:

- Template-level sections now cover summary, audience fit, non-fit, official verification, common mistakes, last updated, disclaimer, related guides, CTA, and footer.
- Existing Markdown bodies were not rewritten in this window.
- Germany A1 body depth and shared Germany A1 route-support content were left intact.

Pages still needing a content window:

- Older short guides outside the Germany A1 model route still need page-specific depth, examples, official-source tables, and clearer route decision flows.
- Non-Germany category pages are now indexable but still mostly depend on the current short guide bodies.
- Category-level intro copy can be expanded later if a route becomes a commercial/content priority.

Pages still needing a UI window:

- Visual polish for the denser `/guides/` filters and card grid should be checked manually on mobile.
- Static category pages use the existing simple guide-list style; they can later receive a richer category hub layout.
- Homepage, Chinese homepage, and Germany A1 hub were intentionally not redesigned in this window.

Verification completed:

- `npm test`: passed.
- `npm run launch-check`: passed, 53 checks, READY.

## Germany A1 Content Cluster Window - 2026-07-09

Role: Germany A1 Family Reunion topic owner.

Scope completed:

- Reworked the Astro route hub at `src/pages/germany-family-reunion-a1.astro` for `/germany-family-reunion-a1/`.
- Added a Germany A1-only guide support module at `src/components/GermanyA1RouteSupport.astro`.
- Rendered that module from `src/pages/guides/[slug].astro` only when `category: "germany-a1"`.
- Updated Germany A1 guide `related` metadata and `updatedDate` values for the current cluster.
- Added source-level assertions in `tests/site.test.js` so the Germany A1 support module and core links stay covered.

Germany A1 pages changed:

- `/germany-family-reunion-a1/` route hub.
- All `category: "germany-a1"` Astro guides through the shared route-support module.
- Frontmatter updated in: `german-family-reunion-language-requirement`, `goethe-a1-germany-family-reunion`, `goethe-a1-vs-telc-a1`, `goethe-a1-booking-mistakes`, `german-a1-documents-checklist`, `goethe-a1-pre-booking-checklist`, `german-a1-exam-booking-timeline`, `goethe-a1-test-centers`, `goethe-a1-fees-by-country`, `goethe-a1-30-day-study-plan`, `goethe-a1-study-plan-working-adults`, `goethe-a1-speaking-topics`, `goethe-a1-listening-practice`, `goethe-a1-official-links-practice-resources`, `goethe-a1-retake-policy`, and `german-a1-family-reunion-faq`.

Article enhancements added:

- Each Germany A1 guide now receives visible sections for Quick answer, Who this guide is for, Who this guide is not for, What to verify officially, Common mistakes, Step-by-step next action, Related guides, Official sources, Last updated, and Disclaimer.
- The support module avoids invented fees, dates, pass guarantees, and certificate-acceptance promises.
- The module explicitly warns against leaked materials, copied real exam answers, and guaranteed-pass claims.
- The hub now covers route overview, who needs A1, commonly used exams, Goethe A1 vs telc A1, booking/test-center guidance, documents checklist, study plan, retake rules, FAQ, all Germany A1 guides, official verification reminder, and the Start Germany A1 route CTA.

Internal links added or strengthened:

- Requirement check now points toward the Goethe A1 route and Goethe A1 vs telc A1.
- Goethe A1 route now points toward Goethe vs telc and the pre-booking checklist.
- Goethe vs telc now points toward booking mistakes, test centers, and documents.
- Booking mistakes and pre-booking checklist now point toward documents and timeline checks.
- Documents and timeline pages are tied to test-center, booking, and retake planning.
- Study plan pages now point to speaking, listening, and official practice resources.
- Every Germany A1 guide links back to `/germany-family-reunion-a1/` through the shared support module.
- FAQ is included in the shared core guide list alongside all core Germany A1 pages.

Thin or still-weaker pages:

- Individual older short guides such as `goethe-a1-fees-by-country`, `goethe-a1-test-centers`, `goethe-a1-retake-policy`, `goethe-a1-speaking-topics`, and `german-a1-documents-checklist` still have short original bodies. The shared module improves consistency, but these could later receive page-specific tables, examples, and decision flows.
- There is still no Astro source route for `/do-i-need-german-a1.html`; it remains a legacy/static helper.
- Chinese guide coverage remains partial and outside this Germany A1 English cluster pass.

Manual official verification needed:

- Current German mission rules for the applicant's country or appointment location.
- Whether Goethe A1, telc A1, or another A1 certificate is accepted for a specific case.
- Current Goethe or telc local fees, dates, result timing, ID rules, cancellation rules, and retake rules.
- Current BAMF, Auswaertiges Amt, Goethe-Institut, telc, and local test-center pages before publishing country-specific claims.

## Current Check Summary

Role: project map and context compression window.

Scope completed:

- Scanned technology stack, directory structure, routes, content source, guide layout, categories, SEO, multilingual implementation, CTA/waitlist behavior, build scripts, and deploy scripts.
- Created `docs/PROJECT_CONTEXT.md`.
- Created `docs/CONTENT_MAP.md`.
- Updated this `docs/TASK_LOG.md` with findings and next-window boundaries.

Verification completed:

- `npm run build`: passed, 61 pages generated.
- `npm test`: passed.
- `npm run launch-check`: passed, 53 checks, READY.

Working-tree note:

- Many existing modified and untracked files were already present before this map update. Future windows must check `git status --short` and avoid reverting unrelated work.

## Findings By Area

### 页面结构问题

- Homepage is functional but currently behaves mostly like a content index: hero, featured guides, route cards, latest guides.
- It lacks a stronger product/action surface such as an actual route finder, waitlist module, or guided decision entry in the Astro layer.
- `germany-family-reunion-a1.astro` is a route hub but uses page-specific inline styles and does not fully reuse the guide layout.
- `do-i-need-german-a1.html` exists only as a root static page, not as an Astro source route.

### 分类筛选问题

- `/guides/?category=xxx` does filter in normal browsers because `src/pages/guides/index.astro` reads `URLSearchParams` and hides cards client-side.
- The static HTML itself is not pre-filtered by category. With JavaScript unavailable, all guides remain listed and a fallback message appears.
- Category definitions are duplicated between `src/pages/index.astro`, `src/pages/zh/index.astro`, and `src/pages/guides/index.astro`.
- `country`, `exam`, and `level` are not structured frontmatter fields, so future filtering by those dimensions would require inference or schema expansion.

### 中文入口问题

- `/zh/` is a real Chinese homepage with `lang="zh-CN"` and hreflang.
- It is not a full Chinese site. Most guide pages remain English.
- Chinese homepage card titles/descriptions are pulled from English guide frontmatter, so parts of the Chinese page still display English text.
- Header on English article pages labels the language switch as `中文首页`, which is honest but confirms there is no article-level Chinese translation.

### waitlist 链接问题

- `GuideCTA.astro` points `Join waitlist` to `/#waitlist`.
- Generated Astro homepage does not contain an element with `id="waitlist"`.
- Root legacy `index.html` has a waitlist section and form, but the Astro homepage does not.
- Root `app.js` handles the legacy waitlist in demo/local mode; no real email submission endpoint is connected in the Astro layer.
- Docs mention Formspree / `YOUR_FORM_ID`, but the current generated Astro route has no real form target.

### guide 模板问题

- All generated guide pages share `GuideLayout.astro`, including H1, summary, trust bar, breadcrumbs, TOC, related guides, route backlink, CTA, and JSON-LD.
- Article body structure is not normalized. Some pages use quick answer/checklist/workflow structures; others are shorter or older guide bodies.
- The old 15-section guide template exists in docs and legacy data, but it is not enforced as Markdown structure in the Astro content collection.
- `updatedDate` is structured in frontmatter and used by the layout and sitemap enrichment.

### SEO 问题

- Core SEO implementation is healthy: canonical URLs, meta descriptions, hreflang for homepages, sitemap index, guide lastmod, guide JSON-LD, guide index JSON-LD, robots.
- `public/robots.txt` points to `sitemap-index.xml`; root legacy `robots.txt` points to `sitemap.xml`. This split should be reconciled only in a dedicated deploy/source-of-truth task.
- Legal/noindex pages are filtered out of generated sitemap, but `BaseLayout` only emits noindex when pages pass `noindex`; verify each intended noindex page if doing SEO hardening.
- `og:type` is always `website` in `BaseLayout`, including articles; this is acceptable but can be improved later.

### UI 统一问题

- Main visual system is centralized in `src/styles/global.css`.
- Some Astro pages use inline styles and local `<style>` blocks, especially homepage, guide index, Chinese homepage, and Germany A1 hub.
- The English homepage, Chinese homepage, guide index, and guide pages share cards but not a fully unified page composition pattern.
- Footer is complete and stable, with About, Contact, Editorial Policy, Privacy Policy, Cookie Policy, Terms, and Affiliate Disclosure.

### 移动端问题

- Launch check confirms guide tables and long links have mobile overflow protection.
- Guide index search row collapses on small screens.
- Chinese homepage focus block collapses on small screens.
- Still needs visual/manual mobile QA for dense card grids, sticky TOC behavior, and long translated labels.

### 构建风险

- Current build passes.
- Build relies on `scripts/enrich-sitemap-lastmod.js` after Astro build; do not remove `postbuild` without replacing lastmod behavior.
- `launch-check` checks both generated Astro output and legacy static pages. Removing legacy files can break launch readiness.
- The content collection does not currently validate `country`, `exam`, `level`, or source-check date fields.
- Existing worktree contains many modified/untracked files; accidental revert is the main operational risk.

##重点检查结果

| Check | Result |
|---|---|
| `/guides/?category=xxx` 是否真的过滤 | Yes with JavaScript. It is client-side filtering, not separate static category pages. |
| 中文入口是否真正中文化 | Partially. `/zh/` is Chinese, but guide cards still pull English frontmatter and guides are mostly English. |
| Join waitlist 是否有真实目标页 | No in Astro. CTA points to `/#waitlist`, but Astro homepage has no `id="waitlist"`. |
| guide 模板是否统一 | Wrapper is unified; article body structure is not fully standardized. |
| last updated 是否来自数据源 | Yes for guides: `updatedDate` frontmatter feeds layout and sitemap lastmod. |
| 首页是否过于像文章列表 | Somewhat. It is currently a hero plus guide/category lists, not a strong interactive product surface. |
| Germany A1 是否已经形成专题集群 | Yes. 16 Germany A1 guides plus a route hub. |
| Footer 链接是否完整 | Yes. Legal/trust links are present and launch check passes affiliate footer link. |
| sitemap / robots 是否存在 | Yes. Generated `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, and `dist/robots.txt` exist. |
| 项目是否能正常 build | Yes. `npm run build`, `npm test`, and `npm run launch-check` passed. |

## 当前最重要的 10 个问题

1. Astro guide CTA links to a missing `/#waitlist` anchor.
2. Astro layer has no real waitlist form or email capture target.
3. Chinese homepage is only partially Chinese because guide cards reuse English frontmatter.
4. There is no article-level Chinese guide translation system.
5. Category filters are client-side only; no dedicated static category landing pages.
6. Category definitions are duplicated across multiple pages.
7. `country`, `exam`, and `level` are inferred, not structured content fields.
8. Guide body structure is inconsistent across older and newer guides.
9. Homepage still reads more like a guide index than a decision/navigation product.
10. Legacy static layer and Astro source layer coexist, creating source-of-truth risk.

## Recommended Next 6 Windows

### Window 1: Waitlist / CTA Reality Check

Goal:

- Make the current `Join waitlist` path honest and functional.

Suggested file range:

- `src/components/GuideCTA.astro`
- `src/pages/index.astro`
- `src/pages/contact.astro`
- Possibly `src/styles/global.css`
- Tests only if behavior is asserted.

Do not touch:

- Deploy scripts.
- Guide content bodies.

Human confirmation needed:

- Should waitlist collect real emails now?
- Which provider should be used: Formspree, Mailchimp, Google Forms, custom endpoint, or simple contact link?
- What user promise should the CTA make?

### Window 2: Chinese Entry Quality

Goal:

- Make `/zh/` feel intentionally Chinese, not a mixed-language index.

Suggested file range:

- `src/pages/zh/index.astro`
- Optional small structured mapping in the page itself or a new data helper.

Do not touch:

- English guide body content.
- Global routing unless a full i18n task is approved.

Human confirmation needed:

- Is `/zh/` only a Chinese landing page, or should top Germany A1 guides be translated too?

### Window 3: Germany A1 Cluster Depth

Goal:

- Tighten Germany A1 as the flagship topic cluster.

Suggested file range:

- `src/pages/germany-family-reunion-a1.astro`
- `src/content/guides/*a1*.md`
- `src/content/guides/german-*.md`
- Related tests if routes/links change.

Do not touch:

- Non-Germany clusters.
- Deploy config.

Human confirmation needed:

- Should `do-i-need-german-a1.html` become an Astro route?
- Which Germany A1 user journey is the priority: requirement check, booking, prep, documents, or retake risk?

### Window 4: Guide Template Normalization

Goal:

- Define a practical guide body standard without rewriting every article at once.

Suggested file range:

- `docs/CONTENT_WORKFLOW.md`
- `src/layouts/GuideLayout.astro`
- A small sample set in `src/content/guides/`
- `tests/site.test.js` only for stable rules.

Do not touch:

- All guides in one large rewrite.

Human confirmation needed:

- Should the canonical body template be strict 15-section, or flexible route-specific sections?

### Window 5: Content Schema / Content Map Upgrade

Goal:

- Decide whether `country`, `exam`, `level`, and source-check date should become first-class frontmatter.

Suggested file range:

- `src/content.config.ts`
- `src/content/guides/*.md` in small batches.
- `src/pages/guides/index.astro` only if new filters are added.
- `docs/CONTENT_MAP.md`.

Do not touch:

- UI redesign.

Human confirmation needed:

- Which filters matter commercially: route, country, exam, level, language, or user goal?

### Window 6: Legacy / Astro Source-of-Truth Audit

Goal:

- Clarify what is deployed and what should remain as compatibility artifacts.

Suggested file range:

- `README.md`
- `CLAUDE.md`
- `docs/PROJECT_CONTEXT.md`
- `docs/LAUNCH_CHECKLIST.md`
- Maybe tests/launch checks after confirmation.

Do not touch:

- Delete no legacy files unless explicitly approved.
- Deploy config unless explicitly approved.

Human confirmation needed:

- Is the live server serving Astro `dist/` or legacy root files?
- Should old root HTML pages remain permanently, redirect, or be regenerated from Astro?

## Germany A1 Decision Guides Window - 2026-07-10

Role: Germany A1 Family Reunion content owner.

Scope completed:

- Deepened the five Germany A1 decision guides without changing the UI system, route structure, Chinese site, or non-Germany content.
- Reused the existing Germany A1 route-support module for the shared Quick answer, audience fit, official-verification, common-mistake, next-step, related-guide, last-updated, official-source, and disclaimer sections.
- Added source-level tests that preserve the five decision-guide structures and their next-step links.

Pages enhanced:

- `goethe-a1-fees-by-country`: replaced a fixed-fee-style checklist with a local official-verification workflow; covers changing fee factors, payment/refund/rescheduling checks, and the distinction between course and exam fees.
- `goethe-a1-test-centers`: defines an official centre as one shown or confirmed through Goethe or telc; adds exact-exam checks, a centre checklist, and booking risks.
- `goethe-a1-retake-policy`: starts from the score report and local rule rather than promising a resit pattern; adds targeted review, two-week and four-week recovery plans, and a visa-timeline warning.
- `german-a1-documents-checklist`: separates booking, test-day, and visa-file materials; distinguishes original ID, booking proof, official certificate, and local mission requirements.
- `goethe-a1-speaking-topics`: frames topics as adaptable practice areas rather than predictions; adds a safe practice routine, common errors, and a seven-day reset without leaked or copied exam content.

Internal links added or strengthened:

- Fees -> test centres and booking mistakes.
- Test centres -> documents checklist, Goethe vs telc, and fees.
- Documents checklist -> language requirement, test centres, and booking mistakes.
- Retake -> speaking, listening, study plan, and booking timeline.
- Speaking -> study plan, listening, and retake.
- All five pages continue to link back to `/germany-family-reunion-a1/` through the shared Germany A1 route-support module; the hub already lists all five core pages.

Manual official verification still required:

- Current local Goethe/telc fee, payment deadline, refund, and rescheduling rules.
- Whether a local centre offers the exact adult A1 exam on the required date, its ID rules, result timing, and certificate delivery process.
- Local retake or partial-resit rules for the exact examination and test centre.
- The responsible German mission's current certificate-acceptance and visa-document checklist for the applicant's individual case.

Fact-risk assessment:

- No fees, dates, centre lists, acceptance promises, or fixed retake rules were added.
- The A1 examination and skill descriptions are linked to official Goethe information; changing local conditions are explicitly directed back to the responsible official source.

Remaining thin Germany A1 pages:

- `goethe-a1-germany-family-reunion`, `goethe-a1-vs-telc-a1`, `goethe-a1-booking-mistakes`, `goethe-a1-pre-booking-checklist`, and `german-a1-exam-booking-timeline` could be deepened next, but they remain outside this five-page maintenance window.

Recommended next module:

- Use a Guides + SEO window next to refine search intent, title/description fit, and structured internal-link coverage for this completed Germany A1 decision cluster.
- Use the final quality-check window after that SEO pass; a UI window is not currently necessary.

## Germany A1 Guides + SEO Window - 2026-07-10

Role: Germany A1 search-intent and internal-link owner.

Scope completed:

- Refined the five Germany A1 decision-guide titles and meta descriptions so the search result clearly states the next decision: local fee, official centre, retake plan, three document stages, or safe speaking practice.
- Added a compact `Five core decision guides` section near the top of `/germany-family-reunion-a1/`, giving each core page a clear contextual link before the longer route sections.
- Updated the hub's title, description, and last-updated signal to reflect its stronger requirement-to-booking route role.
- Added source-level assertions for the five focused titles and the hub's five direct core-guide links.

SEO boundaries retained:

- No keyword-stuffed copy, new route, schema change, fee/date claim, centre list, or certificate-acceptance promise was added.
- Existing Article, BreadcrumbList, canonical, sitemap, guide-category backlink, and official-source trust cues remain the technical SEO layer for these pages.

Recommended next module:

- Proceed to the final quality-check window for generated-page copy, heading hierarchy, metadata, internal-link targets, and mobile rendering. A separate UI window is still not required.

## Germany A1 Thin-Page Maintenance Window - 2026-07-10

Role: Germany A1 practical-route content owner.

Scope completed:

- Maintained six Germany A1 guides only: fees, test centres, retake, documents, speaking, and the 30-day plan.
- Kept the existing shared trust and disclaimer structure; no UI, route, Chinese, legal, deployment, or non-Germany files were changed.

Practical depth added:

- Fees: a comparable personal fee record and a safe response when two local listings disagree.
- Test centres: a concise official-centre enquiry path when a local page is unclear.
- Retake: a decision rule for choosing a shorter or longer recovery period instead of automatically booking the earliest date.
- Documents: a private record-keeping step and a warning against sharing sensitive scans through unverified channels.
- Speaking: a repeatable ten-minute drill alongside the existing seven-day reset.
- 30-day plan: replaced the thin four-week outline with daily minimum practice, four staged date ranges, a weekly review, a realistic extension rule, and explicit speaking/listening/retake next steps.

Internal links strengthened:

- The 30-day plan now points to speaking, listening, retake, and the Germany A1 hub.
- The existing fee, centre, retake, documents, and speaking progression remains intact.

Fact-risk assessment:

- No fees, dates, test-centre lists, retake entitlement, certificate-acceptance promise, or pass guarantee was added.
- Local conditions and visa requirements continue to require official-source verification.

Remaining thinner Germany A1 guides:

- `goethe-a1-germany-family-reunion`, `goethe-a1-vs-telc-a1`, `goethe-a1-booking-mistakes`, `goethe-a1-pre-booking-checklist`, and `german-a1-exam-booking-timeline` remain suitable candidates for a later content-only window.

Recommended next module:

- Run final quality checks on the completed six-page route, then decide whether the next content window should deepen exam-choice or booking-timeline pages.

## Germany A1 Exam Choice And Booking Window - 2026-07-10

Role: Germany A1 route-decision and booking-risk content owner.

Scope completed:

- Deepened five Germany A1 guides only: Goethe A1 route, Goethe vs telc, booking mistakes, pre-booking checklist, and booking timeline.
- Connected the route as requirement -> acceptance and provider choice -> official centre -> payment checks -> document and timing plan.

Pages enhanced:

- `goethe-a1-germany-family-reunion`: separates the stable Goethe exam description from case-specific mission acceptance and sends users to the requirement, comparison, and pre-booking decisions in order.
- `goethe-a1-vs-telc-a1`: replaces brand preference with four checks: acceptance, availability, process, and total cost.
- `goethe-a1-booking-mistakes`: removes unsupported claims about centre frequency, universal ID practice, fixed lead times, and modular scheduling; adds a factual stop-and-check record and local-resolution path.
- `goethe-a1-pre-booking-checklist`: adds hard stop conditions and one evidence record while keeping certificate acceptance, centre, payment, ID, and preparation checks separate.
- `german-a1-exam-booking-timeline`: adds backward planning from the document deadline and an explicit rule for unknown timings rather than assuming later submission or a usable retake date.

Internal links strengthened:

- Goethe route -> requirement -> Goethe vs telc -> pre-booking checklist.
- Goethe vs telc -> test centres -> booking mistakes -> documents.
- Booking mistakes and pre-booking checklist -> documents, centres, and timeline.
- Timeline -> fees, centres, documents, retake, and requirement check.

Fact-risk assessment:

- No universal booking lead time, centre schedule, ID list, result date, acceptance promise, refund entitlement, modular resit claim, fee, or visa outcome was added.
- Goethe/telc product descriptions use official overview pages; every local or case-specific point remains an official-centre or mission verification task.

Remaining Germany A1 content candidates:

- The central cluster is now materially deeper. A later page-specific pass could refine the FAQ, listening practice, official practice resources, and working-adult study plan, but no additional route page is currently thin enough to require immediate expansion.

Recommended next module:

- Run final quality checks on the complete Germany A1 cluster, including generated-page heading order, metadata, internal links, and narrow/mobile reading surfaces.

## Germany A1 Support Guides Window - 2026-07-10

Role: Germany A1 preparation and source-navigation content owner.

Scope completed:

- Maintained four Germany A1 support guides only: FAQ, listening practice, official resources, and working-adult study plan.
- Kept the existing shared guide structure and did not touch UI, route generation, Chinese pages, non-Germany content, legal pages, or deployment configuration.

Pages enhanced:

- `german-a1-family-reunion-faq`: replaces generic or overcertain answers with safe routing to requirement, provider choice, centre, timeline, documents, and preparation pages.
- `goethe-a1-listening-practice`: replaces unsupported fixed exam-format claims with a three-pass daily drill, error diagnosis, official-format-first practice, and a weekly checkpoint.
- `goethe-a1-official-links-practice-resources`: maps each reader question to the authority, provider, local centre, or practice source that owns the answer.
- `goethe-a1-study-plan-working-adults`: replaces fixed daily workload and outcome claims with flexible weekday/review blocks, an eight-week progression, and a clear extension rule.

Fact-risk cleanup:

- Removed fixed result-time, study-hour, study-duration, partial-resit, provider-acceptance, and listening-procedure claims where they were not safe as universal statements.
- Retained official Goethe, BAMF, telc, and German Federal Foreign Office links; country-, case-, and centre-specific details remain official verification tasks.

Internal links strengthened:

- FAQ now routes to requirement, exam choice, centre, fee, timeline, documents, 30-day plan, working-adult plan, and the hub.
- Listening, official resources, and working-adult plan now cross-link to speaking, 30-day preparation, retake, and pre-booking decisions.

Cluster status:

- The English Germany A1 content cluster is now internally connected and has route-specific depth across requirement, provider choice, booking, documents, fees, timing, preparation, retake, and FAQ support.
- Remaining work is quality assurance and manual official-source review rather than another broad content-expansion window.

Recommended next module:

- Run the final Germany A1 quality-check window, including generated metadata, internal links, mobile reading, and the official-source review list.

## Manual Confirmation Needed

- Real waitlist provider and destination.
- Whether to add a visible waitlist section to Astro homepage or change CTA to Contact.
- Whether `/do-i-need-german-a1.html` should be migrated into Astro.
- Whether Chinese should remain homepage-only or become guide-level localization.
- Whether category filtering should stay client-side or become real route pages.
- Whether to formalize `country`, `exam`, and `level` in guide frontmatter.
- Which layer the live deployment currently serves: Astro `dist/` or legacy root static files.
