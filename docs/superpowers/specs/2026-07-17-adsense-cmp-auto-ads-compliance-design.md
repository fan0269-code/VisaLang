# VisaLang AdSense, Google CMP, and Auto Ads Compliance Design

**Date:** 2026-07-17
**Status:** Approved for implementation-plan authoring
**Business goal:** Preserve display-ad monetisation for the VisaLang traffic site without presenting unverified consent, security-header, performance, or production evidence as complete.

## 1. Decision summary

VisaLang will retain Google AdSense and the currently enabled Auto ads account configuration.

The approved integration model is:

- Google AdSense publisher `ca-pub-3018617123550799`;
- Google Privacy & messaging European regulations message as the Google-certified IAB TCF CMP;
- Auto ads controlled in the AdSense account;
- the standard AdSense site script restored only on explicitly ad-eligible Astro routes;
- the Google authorised-seller declaration restored at `/ads.txt`;
- public policies updated to describe the actual active advertising and consent design;
- the current incompatible static CSP removed rather than replaced with a guessed, broad, or unsupported AdSense domain allowlist;
- non-CSP security headers retained;
- code, account, browser-network, mobile-layout, and production verification kept as distinct evidence layers.

No production deployment or account change is authorised by this design document.

## 2. Requirement change and repository baseline

The earlier production-trust plan assumed AdSense should remain paused until a separate CMP plan existed. The user has now clarified that:

- VisaLang is a traffic site whose monetisation depends on display advertising;
- AdSense has already been added;
- Google Privacy & messaging → European regulations message is published and has been tested;
- Auto ads is enabled;
- AdSense should be retained and integrated compliantly.

The local branch currently includes commit `2c4bb4cad6374e34c1f96f7e6aca4ae11995c741`, which removed the AdSense loader and `public/ads.txt` and changed Privacy/Cookie pages to a no-ad state. That commit is local only and has not been pushed or deployed in this session.

The implementation plan derived from this design must reconcile that local commit by restoring the approved advertising state. It must not continue the obsolete no-ad Task 1 from `docs/superpowers/plans/2026-07-17-production-trust-stabilization-agent-execution.md`.

## 3. Verified repository history

Before the local no-ad commit, the repository used:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018617123550799" crossorigin="anonymous"></script>
```

The authorised-seller declaration was:

```text
google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0
```

Historical records state that a Google European regulations message was published and regionally tested, but those records also contain earlier draft-state language. Therefore:

- the user's current confirmation is accepted as the business requirement and account-state input for design;
- repository history alone does not independently prove the current account configuration;
- the implementation and production-verification plan must request current screenshots or exports and fresh browser evidence before recording production completion.

## 4. Official Google requirements and boundaries

### 4.1 Certified CMP

For personalised ads served through AdSense to users in the EEA, the United Kingdom, and Switzerland, Google requires a Google-certified CMP integrated with the IAB Europe TCF.

Google states that its AdSense Privacy & messaging European regulations messages are certified under this requirement and support IAB TCF.

This satisfies Google's stated CMP product requirement when correctly configured. It does not constitute independent legal approval, and publishers remain responsible for accurate disclosures, purposes, vendors, user choices, and applicable consent requirements.

### 4.2 User choices

The design requires account-side support for:

- Consent / Accept;
- a clear non-consent path, either as a first-level Do not consent / Reject action or by rejecting all relevant purposes and vendors through Manage options;
- Manage options;
- a way to revisit, change, or withdraw choices.

A valid non-consent path is a prerequisite for enabling AdSense, not an optional enhancement. The repository must not claim these paths work merely because the AdSense script exists. Their behavior must be verified in a clean browser session and recorded as account/browser evidence. The Reject test must follow the account's actual configured path rather than require a first-level Reject button when rejection is implemented inside Manage options.

### 4.3 Personalised and non-personalised ads

Rejecting personalised ads does not automatically mean no storage or consent issue exists. Google states that non-personalised ads may still use cookies or mobile identifiers for frequency capping and aggregated reporting where permitted.

The site policy must therefore describe actual account/CMP behavior without claiming that non-personalised ads are cookie-free.

### 4.4 Required privacy content

The Privacy Policy must disclose that:

- third-party vendors, including Google, use cookies to serve ads based on prior visits to VisaLang or other websites;
- Google's advertising cookies enable Google and its partners to serve personalised advertising;
- users can manage or opt out of personalised advertising through Google Ads Settings;
- other advertising vendors or networks must be identified if they are enabled later;
- users in covered regions receive the configured consent message and can manage choices.

### 4.5 ads.txt

Google states that ads.txt is not mandatory but is highly recommended. VisaLang will restore it because the account and publisher ID are already known and it helps prevent unauthorised inventory sales.

The file is evidence of an authorised seller relationship only. It is not evidence that CMP, consent, policy, or production advertising behavior has been verified.

## 5. Architecture

## 5.1 Account layer

The source integration depends on the following account-side configuration:

- AdSense site entry for the canonical VisaLang domain;
- publisher ID `pub-3018617123550799`;
- published Google Privacy & messaging European regulations message;
- the intended button configuration and user-choice flow;
- correct Privacy Policy URL;
- enabled Auto ads;
- intended personalised/non-personalised/limited-ad treatment;
- no unresolved Policy Center, CMP, or ads.txt warning that blocks serving.

These settings are not source-controlled. The project must record current evidence locations rather than inventing source-code representations of them.

## 5.2 Runtime layer

`BaseLayout.astro` will expose one explicit boolean advertising prop, such as `enableAds`, with a default suitable for ordinary content pages. The standard AdSense site script is rendered only when that prop is enabled.

`ToolLayout.astro` must pass `enableAds={false}` for every tool page that uses the shared tool layout. The `/tools/` index does not use `ToolLayout`, so `src/pages/tools/index.astro` must independently pass `enableAds={false}` to `BaseLayout`. `src/pages/guides/index.astro` must also disable advertising because its search and filters persist user-entered or selected state in the URL. Guide articles, route hubs, category pages, and other ordinary content pages may remain ad-eligible.

Rules:

- exactly one AdSense site script on each ad-eligible page;
- no AdSense loader, Google ad request, Auto ads insertion, or advertising DOM on `/tools/` routes or the searchable `/guides/` index;
- add `/tools/*` and `/guides/` as account-side Auto ads page exclusions for defence in depth, with current account evidence recorded before production completion;
- no duplicate loader in pages or components;
- no custom `adsbygoogle.push(...)` calls in this phase;
- no manually coded ad units in this phase;
- no custom CMP banner, region detector, TCF string generator, or consent database;
- Google Privacy & messaging remains the CMP;
- Auto ads behavior remains account-controlled and must be verified rather than inferred from source.

This source-level route exclusion is the primary control that prevents tool URL state from being exposed to the advertising runtime. `Referrer-Policy` and HAR observation are supporting evidence, not substitutes for the exclusion.

## 5.3 Seller declaration

Restore `public/ads.txt` with exactly:

```text
google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0
```

The generated `/ads.txt` must be verified locally and, in an authorised production window, over the canonical HTTPS origin.

## 5.4 Policy layer

### Privacy Policy

The active policy must accurately state:

- VisaLang uses Google AdSense;
- Google Privacy & messaging provides the consent message for covered regions;
- Google and advertising partners may use cookies, local storage, or related identifiers according to user choices and applicable settings;
- personalised and non-personalised advertising are not described as storage-free;
- users can manage advertising choices through the displayed consent/privacy control and Google Ads Settings;
- tool URL state and route-progress local storage remain separate from advertising storage;
- tool routes and the searchable Guide Library index do not load the AdSense runtime, so their URL-backed planning/search state is outside the advertising integration;
- the policy is informational and does not claim legal approval.

### Cookie Policy

The active policy must accurately distinguish:

- Google advertising/consent storage;
- URL-backed tool restoration;
- route-progress local storage;
- Guide Library URL filters;
- the absence of social-media tracking and third-party embeds unless separately introduced.

The policy must explain how users revisit advertising/privacy choices where the Google control is available.

## 5.5 CSP and security headers

### Current conflict

`public/_headers` and `deploy/nginx-vhost-template.conf` currently define a static CSP that permits only self-hosted scripts, connections, and images. It blocks the Google CMP and AdSense runtime.

Google's current AdSense CSP guidance recommends a strict CSP with a fresh per-response nonce and warns against relying on a permanent static AdSense domain allowlist because domains may change.

VisaLang is currently a static Astro site. It has no per-request application server or edge nonce injection layer.

### Approved decision

For the AdSense restoration phase:

- remove the enforcing `Content-Security-Policy` header from `public/_headers`;
- remove the enforcing `Content-Security-Policy` header from the Nginx template;
- retain `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`;
- do not replace CSP with `script-src https:`, wildcard Google domains, or additional `unsafe-inline` / `unsafe-eval` directives;
- do not claim CSP protection remains active;
- record dynamic per-response nonce CSP as a future server/edge architecture project, not a static-site patch.

This is an explicit security trade-off: remove a policy that cannot support the approved third-party runtime correctly rather than preserve a misleading or broken policy.

## 6. Auto ads scope and placement boundaries

Auto ads is enabled at the account layer. No manual ad slots are added in this phase.

The production verification gate must confirm that Auto ads does not:

- load or insert advertising on `/tools/` routes or the searchable `/guides/` index;
- cover or mimic primary navigation;
- appear inside an official-source or verification-warning block in a misleading way;
- obscure Privacy, Cookie, Terms, Editorial Policy, or correction-reporting controls;
- cause horizontal scrolling at 375, 768, 1024, or 1440 pixels;
- produce unacceptable layout instability;
- use labels or placements that imply an advertisement is an official recommendation.

If Auto ads produces unsafe placement or layout behavior, the release must stop or Auto ads must be disabled account-side before deployment is considered successful.

Manual advertising components and reserved ad-slot layouts are deferred to a later optimisation plan.

## 7. Performance and SEO requirements

Restoring the loader must not change:

- page titles, descriptions, canonical links, hreflang, JSON-LD, sitemap, robots, or guide structure;
- the single-H1 rule;
- the official-source-first content hierarchy;
- tool URL-data minimisation.

Verification must include:

- no new duplicate AdSense loaders;
- clean console review;
- clean-profile network evidence;
- mobile viewport checks at 375 and 768 pixels, plus 1024 and 1440 desktop/tablet checks;
- no horizontal overflow;
- CMP controls remain keyboard accessible and do not prevent access to the site;
- Auto ads placement review on the homepage, a long guide, a route hub, Privacy, and Cookie pages;
- explicit proof that Route Finder, every other tool route, and the searchable Guide Library index contain no AdSense loader, Google ad request, advertising DOM, or Auto ads insertion;
- CLS observation, with `< 0.1` as the target for the measured test session;
- no tool query parameter or user-entered planning value in Google request URLs, referrers, payloads, cookies, or storage evidence.

Lighthouse CI and long-term Search Console field-data monitoring remain separate quality/operations work. They are not silently added to this source restoration task.

## 8. Testing strategy

## 8.1 Source and build tests

Update regression tests so they prove:

- `BaseLayout` exposes the explicit advertising enable/disable contract;
- the AdSense publisher script exists exactly once on ad-eligible pages;
- generated `/tools/` routes and the searchable `/guides/` index contain no AdSense loader;
- publisher ID matches `pub-3018617123550799`;
- `public/ads.txt` exists with the approved line;
- Privacy and Cookie pages describe active AdSense and Google consent behavior;
- no Cloudflare Analytics or other analytics provider is introduced;
- the old no-ad/no-CMP assertions are removed;
- `_headers` and Nginx do not contain an enforcing CSP after the approved trade-off;
- non-CSP security headers remain;
- deployment tests and launch checks remain green.

Run:

- focused Node tests;
- `npm test`;
- `npm run launch-check`;
- shell syntax checks for deployment scripts;
- `git diff --check`.

## 8.2 Account evidence

Before production completion is recorded, obtain current evidence for:

- European regulations message published state;
- site/domain selection;
- policy URL;
- Accept, Manage options, and the actual configured non-consent path, whether first-level Reject or reject-all inside Manage options;
- the user-accessible preference reopening/withdrawal path;
- Auto ads enabled state and page exclusions for `/tools/*` and `/guides/`;
- ads.txt status;
- relevant Policy Center/CMP warnings.

User confirmation can authorise the design, but production completion must distinguish user-confirmed evidence from independently observed browser behavior.

## 8.3 Browser and network evidence

In an authorised verification window, use a clean browser profile and synthetic, non-personal, non-identifying test values. Preserve evidence for:

- covered European region before selection;
- Accept;
- Manage options;
- the actual configured non-consent path: first-level Reject when present, otherwise reject-all through Manage options;
- revisit/withdraw choices;
- refresh and navigation persistence;
- Auto ads rendering after the permitted consent state on ad-eligible content pages;
- no advertising runtime or insertion on `/tools/` routes and the searchable `/guides/` index;
- no misleading or obstructive placement;
- cookies/local storage/TCF-related state;
- requests to Google advertising/CMP endpoints;
- response security headers;
- `/ads.txt` response.

Testing must cover `/`, a representative long guide, a route hub, `/guides/`, `/tools/route-finder/`, `/privacy-policy/`, and `/cookie-policy/`.

Raw HAR files, screenshots, cookies, storage exports, advertising identifiers, and consent strings must not be committed to Git, copied into public documentation, or attached to public artifacts. Store raw evidence only in the authorised restricted evidence location. Shared evidence must remove query strings, test values, cookies, advertising identifiers, and session-linked data; repository documentation records only the test time, synthetic scenario, environment, result, and restricted evidence reference.

## 9. Failure behavior and rollback

Source restoration must be independently reversible from unrelated Phase 0 deployment work.

Stop conditions include:

- Google consent message does not appear in a covered-region clean session;
- the configured non-consent path still produces personalised-ad behavior;
- users cannot manage or withdraw choices;
- any `/tools/` route or the searchable `/guides/` index loads the AdSense runtime, makes Google ad requests, or receives Auto ads insertion;
- Auto ads blocks navigation, official-source cues, or legal controls on ad-eligible pages;
- significant horizontal overflow or layout instability appears;
- AdSense or CMP is blocked by deployed security headers;
- production `/ads.txt` is missing or incorrect;
- the account shows a blocking CMP, policy, or ads.txt warning;
- testing exposes tool inputs or route-planning data to advertising requests.

On failure:

- do not describe AdSense as successfully restored;
- disable Auto ads or remove the loader in the authorised rollback path, depending on the failure;
- preserve evidence;
- keep the account, source, and production states explicitly separated in operations documentation.

## 10. Implementation scope

### Expected source files

- `src/layouts/BaseLayout.astro`
- `src/layouts/ToolLayout.astro`
- `src/pages/tools/index.astro`
- `src/pages/guides/index.astro`
- `src/pages/privacy-policy.astro`
- `src/pages/cookie-policy.astro`
- `public/ads.txt`
- `public/_headers`
- `deploy/nginx-vhost-template.conf`
- `tests/site.test.js`
- deployment regression tests created by the production-trust plan
- `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md`
- `docs/TASK_LOG.md`
- `docs/OPERATIONS_STATUS.md`

### Explicit exclusions

- no manual ad-slot component;
- no new ad unit ID;
- no custom CMP implementation;
- no third-party CMP migration;
- no analytics integration;
- no server-side user profile, consent database, login, form, or payment flow;
- no content or route expansion;
- no production deployment without a separate approval;
- no assertion of legal compliance or account approval based solely on repository code.

## 11. Relationship to the production-trust plan

The remainder of the production-trust stabilisation plan remains useful:

- conservative maturity labels;
- Route Finder URL-data minimisation;
- canonical production identity;
- executable Nginx redirects;
- immutable releases;
- explicit rollback target;
- production smoke tooling;
- independent reviews and evidence separation.

All advertising-disabled requirements in the old execution plan are superseded, not only the old Task 1. The reconciled implementation plan must replace:

- the execution-boundary prohibition on advertising restoration;
- the file map that deletes `public/ads.txt`;
- no-ad/no-CMP source assertions;
- the smoke-test rule that treats the AdSense loader as a failure;
- the advertising-disabled CSP assumption;
- the old no-ad Definition of Done;
- Task Log and Operations Status templates that describe advertising as disabled.

Historical no-ad records remain dated historical snapshots. They must not be rewritten as if they never occurred, but they must not be used as the current target state or completion criterion.

The reconciled implementation plan must sequence work as follows:

1. replace the local no-ad commit with this approved AdSense/CMP state;
2. add and test the ad-eligible-route contract, excluding all tools and the searchable Guide Library index in source and the Auto ads account;
3. replace old no-ad smoke assertions, Definition of Done, and evidence templates;
4. complete source/build regression checks;
5. continue the non-advertising trust tasks;
6. update deployment/Nginx configuration without the incompatible CSP;
7. run independent security/privacy, SEO/performance, code, and deployment reviews;
8. record local evidence only, with raw browser artifacts kept outside Git;
9. request a separate account/production browser verification window.

## 12. Official sources

- Google consent management requirements for EEA, UK, and Switzerland: https://support.google.com/adsense/answer/13554116?hl=en
- About European regulations messages: https://support.google.com/adsense/answer/10961068?hl=en
- Google EU user consent policy: https://www.google.com/about/company/user-consent-policy/
- Required privacy-policy content: https://support.google.com/adsense/answer/1348695?hl=en
- Personalized and non-personalized ads: https://support.google.com/adsense/answer/9007336?hl=en
- AdSense CSP integration guidance: https://support.google.com/adsense/answer/16283098?hl=en
- ads.txt guide: https://support.google.com/adsense/answer/12171612?hl=en
- AdSense Program policies: https://support.google.com/adsense/answer/48182?hl=en
- Core Web Vitals and Search: https://developers.google.com/search/docs/appearance/core-web-vitals
- Optimise CLS: https://web.dev/articles/optimize-cls?hl=en
