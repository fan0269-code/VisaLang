# VisaLang M3 T20–T22 browser evidence

Checked: 2026-09-11 (Asia/Shanghai)

Environment: locally built Astro static output served with `astro preview` at
`http://127.0.0.1:4327/` and inspected through the Codex in-app Chromium
browser. This is local-preview evidence only. It does not establish production
HTTP, CDN, redirect, Search Console, analytics, advertising-account, or deployed
behavior.

Build under review: 88 generated HTML pages, 41 sitemap URLs, 47 noindex pages,
and 14 ad-eligible pages.

## Viewport and visual matrix

The responsive checks used exact 375×812, 390×844, 768×1024, and
1440×900 viewports. Screenshots were visually inspected during the browser
run. The temporary viewport override was reset afterward. No durable site-page
screenshot file was written by this local browser session.

| Surface | 375 | 390 | 768 | 1440 | Observed result |
| --- | --- | --- | --- | --- | --- |
| Guide Library | pass | pass | pass | pass | No page-level horizontal overflow. At 375 and 390 the four controls form one readable column; at 768 they form two columns; desktop keeps the library visually primary. |
| Exam directory | pass | pass | pass | pass | Two registry-backed supported A1 products remain ahead of 29 reference-only records; cards reflow without page overflow. |
| About, Editorial Policy, Contact, Pricing, Partners | pass | pass | pass | pass | H1 and primary trust boundary remained visible, with no page overflow or inactive commercial CTA. |
| Chinese home, Germany A1 hub, representative Chinese guides | pass | pass | pass | pass | Chinese navigation and English-destination labels remained explicit; no page overflow was observed. |
| Five Chinese tool routes | pass | pass | pass | pass | Correct `zh-CN` H1 and localized form shell rendered at every size; enabled controls measured at least 44 CSS px high and no page overflow was observed. |
| Chinese comparison ready result | pass | pass | pass | pass | The page remains contained. At 375 the comparison wrapper measured 286 px client width and 680 px scroll width with `tabindex="0"`; only the table scrolls horizontally. |

The representative screenshots showed readable cards, forms, error summaries,
results, sources and action rows without clipping or fixed-element obstruction.
The 390 px Guide Library recheck after the final build measured four visible
filter controls at 309 CSS px wide on the same x coordinate, confirming the
single-column correction.

## T20 Chinese journey

- `/zh/tools/route-finder/` initially kept application region empty. The
  Chinese locale did not infer China; the region became
  `germany-mission-china` only after explicit selection.
- Empty Finder submission produced the Chinese two-error summary and moved
  focus to `country`. The generated required marker computed to `"必填"`.
- The unsupported country/family selection hid, disabled and un-required all
  three irrelevant follow-up controls. Its result received focus, exposed the
  `暂不支持此路线` status and boundary, and listed four distinct Chinese
  authority-verification steps.
- In the round-1 correction recheck, CUA submitted the four Germany
  verification-only purposes and observed four branch-specific Chinese result
  titles: `德国 B1 路线：需要向主管机关核验`,
  `德国职业培训路线：需要向接收申请的机构核验`,
  `德国护理路线：需要向监管机关和雇主核验`, and
  `德国大学申请路线：需要向大学核验`.
- The Germany `other-family` recheck preserved two distinct recovery actions:
  first identify the competent German mission or receiving authority for that
  exact relationship, then ask which language-proof question applies before
  choosing an exam or using the spouse checklist. The two actions did not
  collapse into one generic fallback.
- Germany / family reunion / China mission / spouse / no certificate produced
  the focused `可提供核验指引` result, versioned evidence, official-source
  links, the Chinese guide, Checklist and Timeline continuations. Changing the
  certificate to existing A1 produced the separate focused
  `需要主管机关确认` state; it did not assert acceptance.
- The explicit `在此设备保存 30 天` control reported a successful optional
  device snapshot. Navigating through the tool navigation to
  `/zh/tools/checklist-generator/` restored the configured route from the
  same-tab shared session. A cold new-tab restore from the optional device copy
  was not separately observed.
- The configured Checklist produced 12 localized items in five ordered groups.
  Marking the first item changed the visible progress to 1/12, changed its
  status to `已完成`, and changed the serialized line to `[x]`; the export text
  retained the route, generated date, scope, explicitly selected application
  region, certificate state and official URLs.
- `复制清单` succeeded through the browser Clipboard API and announced
  `清单已复制。` The blocked-Clipboard fallback was not induced in this M3
  session; it remains covered by the automated contract and prior M2-B
  evidence.
- On a maintained Chinese guide, `复制指南` succeeded in CUA and the live-region
  feedback was `已复制。`. The blocked Chinese-guide Clipboard outcome was not
  induced in the browser; the compiled interaction assertion covers the exact
  Chinese manual-recovery feedback. That assertion is automation evidence, not
  a browser observation.
- Timeline restored the shared session without inventing date or exam fields.
  A valid `D=2026-12-15`, `W=14`, `P=7`, `R=30` run produced base
  `2026-11-24` and additional-buffer `2026-10-25`, with both formulas and
  non-guarantee copy. Entering `-1` for W hid the stale result, focused W and
  announced the Chinese 0–3650 integer error.
- Comparison restored the explicitly selected Goethe product. Goethe versus
  telc produced the focused nine-row Chinese result, independent official
  sources and local fee/booking/acceptance unknown-state actions. Selecting
  Goethe in both controls produced the separate `选择了同一产品` recovery
  state.
- Reminder restored the configured route. Empty submission produced two
  Chinese field errors and focused the topic. A configured topic and
  `2026-12-15` produced a focused ready result with the localized all-day,
  exclusive-next-day, stable-ID and delivery boundaries plus the localized
  `下载 ICS 日历文件` action.

The Chinese text export, print dialog and ICS download controls were rendered
and keyboard-reachable, but those three actions were not executed again in the
M3 browser session. M2-B already records the shared implementation's populated
print preview and byte-identical real ICS download. A real calendar-client
import remains unauthorized and `blocked/not_tested`.

## T21 discovery, exam and trust interaction

- The desktop Guide Library rendered 20 discoverable cards and exactly the
  Purpose, Stage and Language facets plus Sort. A first Tab reached the skip
  link; activating it focused `main-content`.
- An impossible search produced a visible and announced zero state. Keyboard
  activation of Clear all restored 20/20 and returned focus to Search.
- Purpose `citizenship` produced 7/20, added the controlled
  `?purpose=citizenship` URL and exposed an active-filter chip. Keyboard
  removal normalized the URL, restored 20 cards and returned focus to the
  Purpose select.
- Direct restoration of `q=checklist`, `purpose=citizenship`,
  `stage=submission-review`, `language=en`, and `sort=relevance` produced 1/20.
  A retired `country=Germany` parameter was discarded from the normalized URL.
- The 375 px mobile menu opened and closed from the keyboard with visible
  focus. Hidden desktop/mobile controls did not duplicate the active keyboard
  path.
- Pricing showed only actually available free help and no paid checkout. The
  reviewed trust/commercial pages exposed a real contact route without internal
  workflow vocabulary or update-signup CTAs for unavailable products.

## T22 local-preview metadata

Browser DOM inspection confirmed one self-canonical, one controlled robots
value and the declared HTML language on representative English/Chinese tool,
guide, directory and trust templates.

- `/tools/route-finder/` and `/zh/tools/route-finder/` each emitted the exact
  reciprocal `en`, `zh-CN`, and `x-default` set from the reviewed equivalence
  registry.
- `/guides/goethe-a1-test-centers/` and its Chinese equivalent emitted the same
  three-way reciprocal set with self-canonicals.
- The English and Chinese C01 requirement pages each emitted no hreflang because
  their scopes are not declared equivalent.
- `/guides/` and `/exams/` remained self-canonical, indexable and without an
  invented language alternate.
- All representative pages had no query or fragment in canonical URLs, no
  page-level horizontal overflow, and the browser console returned no warnings
  or errors at the end of both interaction and metadata passes.

The generated-output suite separately checked every built HTML page, every
sitemap member, robots source/output, all 11 reciprocal pairs and the current
local absence of all 17 unresolved redirect-candidate sources. This is not an
authorized-retirement classification. No request was made against production,
so production headers, redirects, CDN caching and live index state are
`not_observed`.

## Browser-discovered corrections and RED/GREEN receipts

1. Active-filter removal initially dropped focus to `BODY`. A focused assertion
   failed, the removal handler retained and refocused the owning control, the
   assertion passed, and the browser recheck focused Purpose.
2. Guide Library controls initially remained two columns at 375 px and
   truncated labels. A focused CSS assertion failed, the <=480 px library grid
   was changed to one column, the assertion passed, and 375/390 browser
   rechecks showed one column.
3. Chinese required markers initially displayed English `Required`. A focused
   assertion failed, the Chinese pseudo-label was localized to `必填`, the
   assertion passed, and the final computed-style/browser recheck confirmed it.
4. Four distinct unsupported-route questions initially collapsed to one
   repeated Chinese fallback. The new uniqueness assertion failed 1 versus 4;
   four scoped translations were added; the assertion passed and the final
   browser result contained four distinct steps.
5. The same Auditor's round-1 review identified incomplete branch-specific
   Chinese presentation and missing Chinese-guide copy locale wiring. The CUA
   correction recheck observed the four localized purpose titles, the two
   distinct `other-family` recovery actions, and successful guide-copy feedback
   `已复制。`. The blocked guide-copy feedback remains compiled-interaction
   coverage only. These observations support the correction candidate; they do
   not predeclare the same Auditor's round-2 result, which remains pending.

## Not tested by this browser record

- Production HTTP, response headers, redirects, sitemap fetches, Search
  Console, backlinks, analytics, advertising/CMP accounts and CDN behavior.
- Real calendar-client import, device alerts, email delivery or notification
  delivery.
- A forced incompatible saved-schema/reconfirm flow, a blocked Clipboard API,
  a cold new-tab device-snapshot restore, and actual Chinese export/print/ICS
  file actions. In particular, the Chinese-guide success observation does not
  make its blocked Clipboard recovery browser-tested.
- Screen-reader announcements beyond DOM/ARIA/focus inspection, non-Chromium
  browsers, and physical mobile devices.

These boundaries do not block the local T20–T22 candidate, but they cannot be
rephrased as deployed, production, cross-browser, assistive-technology, or
calendar-import evidence.
