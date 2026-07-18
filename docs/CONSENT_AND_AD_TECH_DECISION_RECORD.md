# VisaLang consent and ad-tech decision record

Audit date: 2026-07-18 (Asia/Shanghai)
Status: **SOURCE APPROVED — AdSense restoration is implemented locally; account, browser-network, placement, and production verification remain pending.**
Scope: local source implementation and historical audit record. This record is not legal advice and does not assert GDPR, UK GDPR, CCPA, TCF, or other regulatory compliance.

## Approved source target — 2026-07-17

- The business confirmed that Google Privacy & messaging European regulations message is published and tested and that Auto ads is enabled.
- Source restores publisher `ca-pub-3018617123550799` only on ad-eligible content pages.
- All `/tools/` routes and the searchable `/guides/` index disable the AdSense runtime; account-side Auto ads exclusions remain production evidence requirements.
- `public/ads.txt` restores Google direct seller `pub-3018617123550799`.
- The incompatible static CSP is removed; the remaining security headers stay enabled.
- This local source state does not prove current account screenshots/exports, browser consent paths, Auto ads placement, CLS, production headers, or live advertising behavior.
- Raw HAR, screenshots, cookies, advertising identifiers, and consent strings must remain outside Git and public documentation.

The temporary safety disposition below is retained as dated historical evidence; it no longer describes the current local source target.

## Temporary safety disposition — 2026-07-14

The minimum temporary disposition has been implemented in source pending the blocked decisions in section 9:

- Removed the unconditional Google AdSense bootstrap from `src/layouts/BaseLayout.astro`.
- Removed the unconditional Cloudflare Web Analytics bootstrap from `src/layouts/BaseLayout.astro`.
- Updated the current Astro Privacy and Cookie pages to state that advertising, third-party analytics, and an advertising-consent mechanism are paused, while documenting the browser storage and URL behavior that remains.
- Added static regression assertions in `tests/site.test.js` so the two paused domains cannot be reintroduced unconditionally through `BaseLayout` and the two policies retain the paused-state disclosure.
- `public/ads.txt` was not changed: it is an account/seller declaration, not a runtime script loader. No CMP, consent banner, vendor list, SDK, ad placement, or tracking channel was added.

**Reason:** section 6 found that non-essential third-party technology loaded before any repository-controlled consent while the target regions and consent strategy were unresolved. Restore either script only after all Step 3B inputs in section 9 are approved, the selected loading/withdrawal behavior is implemented, policy copy matches that behavior, and the regional network checkpoints in section 7 pass. Source completion does not change the still-deployed site until a separately authorised deployment occurs.

Validation completed for the temporary disposition:

- `npm test`: passed.
- `npm run launch-check`: passed with 29 checks and 0 failures across 98 generated routes.
- Local production preview returned `200` for `/`, `/privacy-policy/`, `/cookie-policy/`, and `/tools/route-finder/`; their generated HTML contained none of the paused AdSense, Cloudflare Insights, DoubleClick, Google Tag Manager, Meta Pixel, or Plausible runtime markers checked.
- A controlled browser network-panel session could not be established because the available browser-control runtime failed during initialization. This item remains an explicit manual verification requirement before deployment; the generated-HTML check is not recorded as a substitute for a browser network trace.

## 1. Evidence boundary

This record describes the current Astro source and a limited live-response check. It does not infer account-side settings that cannot be inspected in the repository.

- Canonical application source: `src/`; the root HTML/JS files are a legacy compatibility layer and are not the normal source for current routes.
- Shared runtime evidence: `src/layouts/BaseLayout.astro` unconditionally includes Google AdSense and Cloudflare Web Analytics on every route using `BaseLayout`.
- Policy evidence: `src/pages/privacy-policy.astro` and `src/pages/cookie-policy.astro`.
- Persistence evidence: `src/components/tools/ToolShell.astro`, `src/components/RouteProgress.astro`, and the scripts under `src/pages/tools/`.
- Deployment-policy evidence: `public/_headers`, `public/robots.txt`, `public/ads.txt`, and `astro.config.mjs`.
- At 2026-07-14 18:38 CST, `https://flowlight.me/` returned `200` from nginx and its HTML contained both third-party script URLs. Its response included `Referrer-Policy: strict-origin-when-cross-origin` but did **not** include the CSP declared in `public/_headers`. Therefore `_headers` is not evidence that the live nginx deployment blocks these scripts.
- The audit did not access the AdSense or Cloudflare dashboards and did not run a browser session from each target region. A consent message or vendor behavior injected remotely by an account setting remains possible, but is **not implemented or provable in this repository**.

## 2. Current third-party loading

| Service / request | Source file | Trigger | Possible data categories available to the third party | Source-proven limits |
|---|---|---|---|---|
| Google AdSense bootstrap: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018617123550799` | `src/layouts/BaseLayout.astro`; publisher declaration also exists in `public/ads.txt` | Browser parses the `<head>` of every page using `BaseLayout`; `async` changes timing, not the trigger. No local consent or region condition gates insertion. | Request metadata such as IP address, user agent/device context, timestamp, publisher ID and referrer/origin; after execution, the remote script can potentially access page context and initiate further advertising, measurement, storage, or consent-related requests subject to browser and account configuration. | The repository contains no explicit ad-slot push, vendor list, personalisation selection, consent-mode call, or verified account configuration. Auto-ad placement and downstream endpoints must be observed in a browser; they cannot be derived reliably from the bootstrap tag alone. |
| Cloudflare Web Analytics bootstrap: `https://static.cloudflareinsights.com/beacon.min.js` with site token | `src/layouts/BaseLayout.astro` | Browser parses every `BaseLayout` page. No local consent or region condition gates insertion. | Request metadata such as IP address, user agent/device context, timestamp and referrer/origin; the beacon is configured with a site token and may send page/path, referrer, country/device and performance measurements as described by the current Privacy page. | No custom analytics event calls were found. The repository alone does not prove the exact beacon payload, cookie behavior, retention, dashboard access, or whether query strings are excluded; those require network/account verification. |
| Same-origin favicon: `https://flowlight.me/favicon.svg` | `src/layouts/BaseLayout.astro` | Page load | Normal same-origin asset-request metadata | Not a separate third-party supplier. |

No GA4, Google Tag Manager, Plausible runtime, social pixel, third-party iframe/embed, `sendBeacon`, `fetch`, XHR, WebSocket, or direct `document.cookie` use was found in the current `src/` and `public/` runtime sources. Package-lock entries named `cookie` are transitive dependencies, not evidence that VisaLang writes a browser cookie.

## 3. Consent, rejection, withdrawal, region and persistence that actually exist

### Advertising / analytics consent

| Capability | Current code behavior |
|---|---|
| Accept | No first-party accept control, handler, consent API call, or state transition exists. |
| Reject | No first-party reject control, handler, script suppression, or state transition exists. |
| Withdraw / reopen choices | No first-party preference link, withdrawal control, or state transition exists. Browser storage clearing mentioned in policy copy is a browser-level action, not an implemented VisaLang withdrawal flow. |
| Region determination | No geolocation, country header consumption, server-side region branch, or client-side region branch exists. |
| Consent persistence | No first-party consent key, cookie, local-storage record, expiry, schema version, or audit timestamp exists. |
| Vendor/purpose state | No vendor list, purpose list, IAB TCF API/string, Google Consent Mode call, or equivalent repository-controlled state exists. |
| Account-side message | Unknown. The repository and limited HTML/header check cannot establish whether Google injects a message for some visitors from remote AdSense settings. It must not be treated as implemented until account evidence and regional browser traces are supplied. |

### Non-consent browser persistence

- `ToolShell.astro` stores every current tool form field in `localStorage` under `visalang-tool:<pathname>`. This can include route/purpose, application location, language level, certificate status, target dates, planning buffers, chosen exams, reminder topic, route/authority, and an official-source URL. It has no code-defined expiry. “Restart this tool” removes that page's tool key and clears the query string.
- `RouteProgress.astro` stores the current route step under `visalang-route:<routeId>`. It has no expiry and no component-level clear control.
- Several tools also copy form values into the page URL query using `history.replaceState`; guide filters use URL query state. This is URL persistence/history state, not consent storage. It matters because URLs can appear in browser history, copied links, screenshots and logs.
- No source code sends these form values directly through a first-party API. However, third-party scripts execute on the same pages. The current policies' stronger claims about what an external beacon does or does not receive require payload-level verification, especially after URL changes.

## 4. Policy claims not implemented or not established by code

| Public statement | Gap |
|---|---|
| Privacy: “Where a consent choice is required, we use the choice made through the applicable consent message before treating advertising as consented.” | No local consent state, choice reader, loading gate, or “treat as consented” transition exists. Account-side behavior is unverified. |
| Privacy/Cookie: a European consent message lets the visitor accept, reject, or manage advertising choices. | No such UI or behavior exists in source, and no repository link reopens choices. Whether a remote message appears is unverified by region/account. |
| Privacy/Cookie: AdSense use occurs “where permitted by your choices and applicable requirements.” | Both third-party bootstraps are inserted before any repository-controlled choice and without a region branch. The code does not enforce this condition. |
| Privacy: Cloudflare receives no query strings or other user-provided identifiers. | The code contains no payload filter or proxy that can enforce this statement. Tool inputs are placed into URLs on several pages. A clean-browser request trace is required before this claim can be treated as verified. |
| Privacy: ads are not placed inside official-source sections, forms, or navigation. | No manual ad slots were found, but the unconditional bootstrap could be governed by account-side auto ads. Source alone cannot guarantee placement exclusions. |
| Cookie: external resources may be embedded. | This is conditional future wording; no current third-party iframe/embed was found. It should not be read as a current supplier disclosure. |

These are precise change candidates for a later, authorised copy window. Do not silently convert them into compliance claims. Until the strategy is approved, the safest factual direction would be to distinguish unconditional bootstrap loading, unverified account-side messaging, and browser-level deletion from an implemented consent flow.

## 5. Code behavior not fully covered by policy copy

- Policy copy says tool interfaces “may” save progress, but it does not disclose that all fields in each `.tool-form` are saved automatically, the key pattern, the absence of a code-defined expiry, or which fields can include route/application context and dates.
- The policy mentions clearing browser storage but does not disclose the implemented per-tool Restart removal or that route-progress storage has no equivalent component control.
- The policy does not explain that multiple tools write their inputs into query strings, which may persist outside local storage.
- The policy does not identify the AdSense publisher ID or Cloudflare site token. Whether either should be published in policy copy is a legal/product decision; this audit does not recommend inventing a vendor list from script cascades.
- `public/ads.txt` authorises Google as a direct seller for publisher `pub-3018617123550799`; the policy does not mention the ads.txt seller declaration. This is operational ad-tech configuration, not proof that consent is handled.
- The live nginx response does not apply the CSP written in `public/_headers`. This deployment difference is not covered by policy copy and must be resolved separately from consent wording.

## 6. Pre-consent loading decision

**Yes. The current repository and checked live homepage load non-essential third-party advertising technology before any repository-controlled consent.**

The AdSense bootstrap is emitted unconditionally in the document head. Cloudflare's beacon is also emitted unconditionally. There is no prior local decision point. This conclusion concerns request timing and technical gating; it does not make a legal classification for any jurisdiction and does not establish what a remotely configured Google message might do after the bootstrap has loaded.

## 7. Verifiable network checkpoints

Use a clean browser profile, disable extensions, preserve the network log, and test each approved target-region condition. Record timestamp, apparent region, page, response headers, request URL/domain, initiator, cookies/storage before and after, and exported HAR. At minimum test `/`, `/tools/route-finder/`, `/privacy-policy/`, and `/cookie-policy/`.

1. **Initial state before interaction:** clear cookies/site data, load the page, and check whether requests to `pagead2.googlesyndication.com`, `static.cloudflareinsights.com`, `googleads.g.doubleclick.net`, `fundingchoicesmessages.google.com`, or any other discovered ad/CMP endpoint occur before a choice.
2. **Message availability:** verify whether a consent message appears in every approved region, which supplier renders it, and whether Accept, Reject and Manage choices are equally reachable. Save account configuration evidence as well as the browser trace.
3. **Accept:** record the exact requests, cookies/local-storage keys, TCF/consent signals, vendors and expiry created after acceptance.
4. **Reject:** repeat from a clean profile and prove which advertising/measurement requests and storage do not occur; distinguish the CMP's strictly necessary requests from ad-tech requests.
5. **Withdraw/change:** reopen choices from the site, withdraw prior acceptance, reload and prove that the new state is honored and later non-permitted requests stop. Clearing all browser data is not sufficient evidence of an implemented withdrawal control.
6. **Persistence/expiry:** close/reopen the browser and test immediately and at the approved expiry boundary. Confirm state schema/version and behavior when policy/vendor configuration changes.
7. **Tool data isolation:** enter distinctive non-sensitive test values, submit tools so the URL and local storage change, then inspect every Cloudflare/Google request payload, query, header and referrer. Prove whether tool answers, application location, dates, free text, source URLs, full page query strings or identifiers leave the browser.
8. **Placement:** if ads are enabled, verify at 375, 768, 1024 and 1440 px that no auto/manual ad is inserted in navigation, forms, official-source blocks or critical verification steps.
9. **Headers/deployment:** verify the production CSP and Referrer-Policy on HTML responses. If `public/_headers` is intended to govern production, establish why nginx currently omits its CSP and how approved third-party domains/inline scripts will be handled without weakening unrelated protections.

## 8. Minimal implementation interface reserved for later

No banner, supplier adapter or runtime code is created in this window. After section 9 is approved, the minimum provider-neutral contract should contain only:

- an explicit status such as `unknown | accepted | rejected`, plus policy/schema version and recorded/expiry timestamps;
- approved region/framework classification supplied by the selected strategy, including a defined safe fallback when classification is unavailable;
- separate allow/deny decisions for each approved non-essential capability (at least advertising and analytics), derived from the approved purposes/vendors rather than hard-coded assumptions;
- `loadAdvertising()` and `loadAnalytics()` entry points that are idempotent and cannot run before the corresponding decision permits them;
- `openPreferences()` and `withdrawConsent()` entry points, with a visible persistent route to change choices;
- a versioned storage adapter with approved duration, clear/migrate behavior, and no tool answers or free text in consent state;
- test hooks that expose state transitions and script-load events without adding a production tracking channel.

Default-deny should be used only if approved as the temporary/no-CMP strategy. Supplier names, vendor/purpose lists, regions, retention and wording must come from the approved decision, not from this interface sketch.

## 9. BLOCKED decisions required from product, advertising operations and legal

Implementation remains **BLOCKED** until a named owner and approval evidence are recorded for every item:

- **Target regions:** countries/territories actively served and how unknown, VPN, travel and failed-region-detection cases are handled.
- **Applicable consent framework:** the jurisdiction-specific decision and, if applicable, exact framework/version and Google/IAB requirements. Do not substitute this technical audit for legal advice.
- **CMP supplier or explicit no-CMP strategy:** approved supplier/account/property/configuration and preference-reopen route, or an approved no-CMP/default-deny strategy that states which non-essential services remain off by region.
- **Allowed supplier list:** exact advertising, measurement and CMP suppliers, approved purposes, personalisation mode, auto-ads/placement settings and downstream vendor controls. `ads.txt` alone is not this list.
- **Consent-state storage duration:** key/cookie ownership, expiry, renewal, policy/vendor-version invalidation, withdrawal/deletion and evidence-retention rules.
- **Pre-consent advertising rule:** whether the AdSense bootstrap itself may load before choice in each region, whether only a CMP may load, and the rule for non-personalised/limited ads and measurement. The rule must be testable as network behavior.
- **Policy-copy approval:** wording that accurately describes the selected deployed behavior, data categories, suppliers, choices, retention and contact/rights route without asserting blanket legal compliance.

## 10. Recommended next sequence after decisions

1. Product, advertising operations and legal complete and approve all section 9 inputs.
2. Choose the smallest safe loading architecture; define region failure behavior and approved provider/purpose configuration.
3. Add focused state/load tests first, then implement the provider-neutral gate and the selected CMP or approved no-CMP behavior.
4. Gate every approved non-essential script in `BaseLayout`; keep tool and consent storage separate and add the approved preference/withdrawal route.
5. Update Privacy/Cookie wording only to the behavior actually deployed, including tool/query persistence where approved.
6. Build and run automated tests, then execute all section 7 regional network traces and responsive placement checks.
7. Obtain final product/advertising/legal sign-off before deployment. Deployment, supplier onboarding and account changes require a separately authorised window.
