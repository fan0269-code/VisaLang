# Local browser runs, kept separate

`report.json`, the PNG files in this directory, and `desktop.har`, `mobile.har`, and `no-js.har` are one run. `generatedAt` is `2026-11-14T03:10:39.460Z`. That tree was head `830ca4143ada7abf8b9909bb997e70085895b7cf`. Those 36 observations are not a later head and not production.

`supplement-1106-report.json` is an 11-URL JSON from `2026-11-14T03:24:20Z` with no screenshots and no HAR. It is not the 36-observation run.

A later rerun, if present under `supplement-rerun/`, has its own `generatedAt`. It does not replace the 36 observations.

# Local browser run, 2026-11-14

Origin: `http://127.0.0.1:4173`, serving this branch’s `dist/` with the exact redirects from `vercel.json`. This is not production and not an advertising approval.

Chrome was driven by Playwright (`channel: chrome`, headless). `artifacts/runtime-browser/report.json` is the observation log. HAR files are `desktop.har`, `mobile.har`, and `no-js.har`.

## What ran

- Route Finder: empty submit, Germany family-reunion A1, another country / another purpose.
- Exam Comparison: same exam twice, then Goethe A1 and telc A1.
- Checklist: empty submit, Germany B1 (not configured), Germany family-reunion A1. The A1 boxes were unchecked.
- Timeline: empty submit, result wait of -3 (rejected, no date created), then 10/5/2 days from 2026-12-31.
- Reminder Planner: empty submit, invalid URL, then a local plan and an ICS download. `mailto` was false. No POST left the browser.
- Guide library search: `family reunion` (14 visible cards), `zzzz-not-a-guide` (empty state), and a markup string (empty state, no dialog).
- 404 for `/this-page-is-absent/` with `noindex,follow`, then its search form.
- Pricing, partners, and route review: HTTP 200, `noindex,follow`.
- Booking-mistakes URL: one 301 to the pre-booking checklist, then 200.
- Mobile 390×844: reminder plan and Route Finder.
- JavaScript disabled: the five tools, the guide library, and the 404. Status is `blocked-without-javascript`. The forms were visible and no result was invented. Guide filtering did not run.

## Ads

Ad-request total across the three HARs: 0. DOM ad nodes: 0 on every recorded page. The only request that left the preview host was `GET https://visalang.org/favicon.svg` (200). No `adsbygoogle`, `pagead`, `doubleclick`, or `googlesyndication` request.

`observed` means the browser showed that state. It does not mean the page is approved for advertising.
