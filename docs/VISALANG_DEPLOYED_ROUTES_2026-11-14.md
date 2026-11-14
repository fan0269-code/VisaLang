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

## Build set after this branch

Guide markdown count is 49 after four English pages were merged and redirected. The 15 research guides and 8 held German telc/TestDaF guides remain in the collection and outside primary discovery. Category pages for the non-German slugs stay noindex where the taxonomy already says so. This inventory does not add routes.
