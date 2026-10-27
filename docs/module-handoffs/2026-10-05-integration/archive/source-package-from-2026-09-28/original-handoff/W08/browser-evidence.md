# W08 local browser receipt

Checked 2026-09-25 on candidate build served from `127.0.0.1:4543` by a temporary static-file server. This server is a local stub; it has no Python provider, TypeSafe proxy, production origin, account or credentials.

## Observed behavior

- English `/tools/route-finder/` rendered the manual form with no Purpose Suggestion panel. Germany, family reunion, responsible German mission for a China application location, spouse reunification and no certificate produced the bounded deterministic “Guidance available / Germany family reunion: A1 verification route” result, with the existing authority and eligibility boundaries.
- The English route snapshot was saved to this browser and restored after reload. It was cleared with “Clear shared plan” when the check ended.
- Chinese `/zh/tools/route-finder/` rendered the manual form with no Purpose Suggestion panel. The same bounded choices produced “可提供核验指引 / 德国家庭团聚：A1 核验路线”. The shared plan and legacy tool storage were cleared after the check.
- Accessibility-tree observations exposed the form labels, current selections, result and clearing confirmation. They are the retained visual/source evidence; no screenshot file was captured.

## Request evidence and boundary

The temporary server access log observed same-origin GETs for the English and Chinese Route Finder documents, local base CSS, Route Finder client bundle, tool-form/tool-copy bundles and logo. The recorded requests contained no `/api/purpose-suggestion/`, optional suggestion client bundle, TypeSafe endpoint or AdSense asset. The Route Finder browser session had no suggestion panel and required no provider action. The local static server cannot record or prove all browser egress; a full HAR/network capture was unavailable, so “zero network requests” is limited to the captured local request log plus built DOM/bundle inspection and the absent UI.

The generated core-off/ads-off files and six-mode build/launch-check matrix are separately retained in `logs/`. No model API, TypeSafe credential, real user data, live service, DNS, TLS, host or production account was used.
