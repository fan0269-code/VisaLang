# VisaLang deployed routes, 2026-11-14

This note is an inventory for a separate SEO review. It does not restore, expand, or index the pages it lists.

## What was counted

Code on this branch, read from `src/pages/` and `src/content/guides/`, is the build source. Production HTTPS checks below were made against `https://visalang.org` on 2026-11-14 from this agent. Those live responses are the current production deployment. They are not this pull request.

The machine-readable list is `artifacts/visalang-deployed-routes.json`.

## The 15 non-German research guides

Each of these files is a guide collection entry. On production each URL returned **200**, `noindex,follow`, and was **absent** from `sitemap-0.xml` (57 locs) and from the primary nav.

| URL | File | Frontmatter noindex | Status |
| --- | --- | --- | --- |
| https://visalang.org/guides/ielts-ukvi-uk-visa/ | `ielts-ukvi-uk-visa.md` | false; still noindex because status is verification-pending | verification-pending |
| https://visalang.org/guides/languagecert-selt-uk-visa/ | `languagecert-selt-uk-visa.md` | false; same gate | verification-pending |
| https://visalang.org/guides/tef-canada-immigration/ | `tef-canada-immigration.md` | true | verification-pending |
| https://visalang.org/guides/tcf-canada-vs-tef/ | `tcf-canada-vs-tef.md` | true | verification-pending |
| https://visalang.org/guides/tcf-irn-french-residence/ | `tcf-irn-french-residence.md` | false; same gate | verification-pending |
| https://visalang.org/guides/delf-b1-b2-french-work-study/ | `delf-b1-b2-french-work-study.md` | false; same gate | verification-pending |
| https://visalang.org/guides/cils-b1-cittadinanza-for-italian-citizenship/ | `cils-b1-cittadinanza-for-italian-citizenship.md` | true | verification-pending |
| https://visalang.org/guides/cils-vs-celi-vs-plida-for-italian-citizenship/ | `cils-vs-celi-vs-plida-for-italian-citizenship.md` | true | verification-pending |
| https://visalang.org/guides/dele-a2-ccse-spanish-citizenship/ | `dele-a2-ccse-spanish-citizenship.md` | false; same gate | verification-pending |
| https://visalang.org/guides/dele-levels-spanish-citizenship/ | `dele-levels-spanish-citizenship.md` | false; same gate | verification-pending |
| https://visalang.org/guides/portuguese-ciple-a2-for-citizenship-and-residence/ | `portuguese-ciple-a2-for-citizenship-and-residence.md` | false; same gate | verification-pending |
| https://visalang.org/guides/portuguese-language-for-golden-visa-and-citizenship/ | `portuguese-language-for-golden-visa-and-citizenship.md` | false; same gate | verification-pending |
| https://visalang.org/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship/ | `dutch-inburgering-a2-b1-for-integration-and-citizenship.md` | true | verification-pending |
| https://visalang.org/guides/staatsexamen-nt2-for-work-and-higher-education/ | `staatsexamen-nt2-for-work-and-higher-education.md` | false; same gate | verification-pending |
| https://visalang.org/guides/yki-finnish-citizenship/ | `yki-finnish-citizenship.md` | true | verification-pending |

`GuideLayout` noindexes a guide unless source review is `reviewed` and content status is `complete-route` or `core-route`. Frontmatter `noindex: false` does not put a verification-pending guide into the sitemap.

## The 2 product pages

| URL | File | Live |
| --- | --- | --- |
| https://visalang.org/products/a1-family-reunion-pack/ | `src/pages/products/a1-family-reunion-pack.astro` | 200, `noindex,follow`, not in sitemap, not in primary nav |
| https://visalang.org/products/a1-practice-pack/ | `src/pages/products/a1-practice-pack.astro` | 200, `noindex,follow`, not in sitemap, not in primary nav |

Both use `CommercialPageShell`, which sets `noindex` and `enableAds={false}`.

## Live technical checks, kept separate from this PR

- `https://visalang.org/ads.txt` returned **200**, `content-type: text/plain; charset=utf-8`, with the existing seller line `pub-3018617123550799`. The AdSense dashboard was not opened. The publisher ID was not changed. Ads were not turned on.
- `http://visalang.org/` on this network was **308** from Vercel to `https://visalang.org/`, then 200. The audit environment recorded Pingora 500 and an empty body. That difference is environmental. It was not treated as an origin fault.
- `https://www.visalang.org/` was **301** to `https://visalang.org/`.
- `https://visalang.org/disclaimer/` and `https://visalang.org/privacy/` were **404**. Neither page was created. `/privacy-policy/` returned 200.

## Production snapshot 11:07, kept separate from this pull request

A later public snapshot on 2026-11-14, 11:07 Asia/Shanghai, fetched 101 VisaLang HTML URLs. All 101 returned 200. 44 were `noindex`. The original 75 HTML body hashes were unchanged, so that snapshot is not acceptance of this pull request. The 26 URLs that were not in the earlier 75 are the 15 non-German guides, 2 product pages, 8 non-German category pages, and `/404.html`. The 12 category pages were all fetched. Germany A1 and B1 were indexable. The other 10 categories, including Spain and France, rendered `noindex,follow` and an empty item list. Spain and France did that without a taxonomy `noindex` flag on the production pages. This pull request now sets that flag so a later primary-discovery guide cannot unlock those categories. That flag is not a claim that production was leaking, and it is not deployed.

`/404.html` returned 200 with `noindex,follow`. That is the error document opened directly. It is not evidence that every unknown path is a soft 404, and this pull request does not add a new global routing rule.

The snapshot closed the previously unnamed 15+2 set and the category links it could follow. It does not prove that every unlinked route on main was found. The four English URLs this pull request redirects were still 200 on production.

## Build set after this branch

This branch’s `dist/` contains **97 HTML routes**: 36 static Astro pages, 49 guide pages, and **12 category pages**. `artifacts/visalang-deployed-routes.json` lists every built URL in `builtRoutes`, with the robots meta from this build. Redirects are listed separately in `redirects`. A redirect is not one of the 97 HTML files. Astro’s preview server does not apply `vercel.json`; `scripts/preview-with-redirects.mjs` does.

The 15 research guides and 8 held German telc/TestDaF guides remain in the collection and outside primary discovery. This inventory does not add, delete, or restore those pages.

## Category routes

`categoryRoutes` in the JSON records, for each of the 12 category URLs, the production HTTP status, `capturedAt`, response headers, production robots meta, this build’s robots meta, and whether `src/data/guide-taxonomy.ts` sets `noindex: true`.

At the preserved public snapshot, Spain and France did not have `noindex: true` on the taxonomy object. Their live pages still rendered `noindex,follow` because the category page indexed only when at least one guide was in primary discovery, and those categories had none. That code reading is kept as `inventoryCodeReading`. This head now sets `taxonomyNoindexFlag` from `src/data/guide-taxonomy.ts`, where Spain and France are `noindex: true`. The public HTTP fields were not rewritten. Neither layer proves that every unlinked main route was found. The same render gate, not a taxonomy flag, noindexes `/guides/category/germany-telc/` and `/guides/category/germany-testdaf/`. UK, Canada, Italy, Finland, Netherlands, and Portugal do set `noindex: true`. Germany A1 and Germany B1 render indexable category pages.

`liveProduction15plus2` records the same HTTP status, `capturedAt`, headers, and robots meta for the 15 guides and 2 product pages. On 2026-11-14 each returned 200 and `noindex,follow`. That capture is production, not this pull request.
