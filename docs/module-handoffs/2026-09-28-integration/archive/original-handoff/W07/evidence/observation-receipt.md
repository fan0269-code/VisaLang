# Browser observation receipt

- Candidate browser capture before the UI edits: on the Checklist Generator after a result was generated, the result panel had keyboard focus and the heading was partly concealed by the sticky header. The screenshot was displayed in the task through CUA but was not persisted as a local image; it is not claimed as a deliverable screenshot or post-fix evidence.
- A 390×844 viewport override was attempted in CUA; screenshot presentation was rasterized at 375×812 and exact CSS viewport/scroll offset was not recoverable from the accessible state. Therefore no numeric scroll position is asserted.
- The candidate T28 test now obtains `window.innerWidth`, `window.innerHeight`, `window.scrollY`, active result ID, result-title rect, and sticky-header rect, then asserts titleTop >= headerBottom and can persist screenshots through `VISALANG_SCREENSHOT_DIR` when Playwright is available.
- Current CUA inventory attempt failed: Mac was locked and browser inventory returned `nodeRepl.fetch request failed`. The Playwright test failed before launch because the module is absent. No workaround, secondary browser driver, synthetic screenshot, or human/production claim was used.
- Viewport/locale matrix:

  | Viewport | EN result | ZH result | Evidence |
  |---|---|---|---|
  | 375 CSS px | Not run | Not run | Browser unavailable in this pass |
  | 390×844 CSS px | Not run after fix | Not run after fix | T28 assertion added for both locales but Playwright missing; prior baseline screenshot was rasterized 375×812 and CSS viewport readback is unavailable |
  | 768 CSS px | Not run | Not run | Browser unavailable in this pass |
  | Desktop | Not run | Not run | Browser unavailable in this pass |

- Interaction/format matrix: keyboard traversal and zoom, print rendering, download contents, clipboard-denied fallback, actual session restoration, 30-day device expiry and clear were not exercised in the browser. Real devices/readers and calendar import were not tested.

Source evidence: `tests/t28-stale-results.test.mjs`, `src/styles/global.css`, `src/pages/tools/checklist-generator.astro`, `src/pages/tools/route-finder.astro`. The observed baseline image has no local path or hash because it was not persisted.
