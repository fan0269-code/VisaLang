# VisaLang Production Trust Stabilization with AdSense Agent Execution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the approved Google AdSense, Google Privacy & messaging CMP, and Auto ads source contract while completing production-trust stabilization, excluding URL-backed tools from advertising, and leaving account/production verification for a separately authorised window.

**Architecture:** Keep the existing Astro SSG, content collections, shared layouts, browser-only tools, Node `assert` tests, Bash deployment scripts, and Nginx static hosting. Add an explicit `enableAds` contract to `BaseLayout`; ordinary content pages may load the single AdSense publisher script, while `ToolLayout`, `/tools/`, and the searchable `/guides/` index disable it. Remove the incompatible static CSP while retaining other security headers, then execute the remaining trust and deployment tasks sequentially with independent code, security/privacy, SEO/performance, and deployment reviews.

**Tech Stack:** Astro 7, TypeScript, JavaScript Node `assert`, Bash, Nginx, static HTML, Markdown documentation.

---

## Approved execution boundary

- Work only on branch `fix/production-trust-stabilization` unless the user explicitly chooses another branch.
- Do not edit, delete, stage, or commit `graphify-out/`.
- Do not change guide facts, guide frontmatter, `src/content.config.ts`, `src/data/route-tools.ts`, `src/styles/global.css`, legacy root HTML, or `public/_redirects`.
- Restore only the approved AdSense publisher loader, `ads.txt`, Google-managed CMP disclosures, and account-controlled Auto ads contract; do not add manual ad units, custom CMP code, analytics, forms, email delivery, payments, accounts, CMS, Playwright, axe-core, Lighthouse CI, or new routes.
- Do not connect to a production server or run deployment, advertising account changes, browser-region smoke, DNS, TLS, Nginx reload, or rollback commands against production.
- Treat `docs/superpowers/specs/2026-07-17-adsense-cmp-auto-ads-compliance-design.md` and `docs/superpowers/specs/2026-07-17-production-trust-stabilization-execution-orchestration-design.md` as controlling specifications.
- This file supersedes every advertising-disabled requirement, smoke assertion, Definition of Done item, and evidence template in `docs/superpowers/plans/2026-07-17-production-trust-stabilization-agent-execution.md`.

## Agent execution map

| Wave | Tasks | Implementation mode | Required independent review |
| --- | --- | --- | --- |
| 0 | Baseline | Main coordinator, read-only | None |
| 1 | Tasks 1–3 | Fresh TDD executor per task, sequential | AdSense security/privacy + TypeScript/Astro review after Task 1; Wave 1 review after Task 3 |
| 2 | Tasks 4–7 | Fresh deployment executor per task, sequential | Code, security/privacy, SEO/performance, and deployment reviewers in parallel after Task 7 |
| 3 | Task 8 | Main coordinator + final verifier | Final verifier must not be an implementation author |

Do not dispatch two implementation agents that can modify `tests/site.test.js`, `deploy/deploy.sh`, or `tests/deploy.test.js` at the same time.

## File map

### Files modified

- `src/layouts/BaseLayout.astro` — add `enableAds` and restore the single AdSense publisher loader on eligible pages.
- `src/layouts/ToolLayout.astro` — disable advertising for every shared tool page.
- `src/pages/tools/index.astro` — disable advertising on the tools index.
- `src/pages/privacy-policy.astro` — disclose active AdSense and Google-managed consent behavior.
- `src/pages/cookie-policy.astro` — disclose advertising/consent storage separately from tool URL/local storage.
- `src/data/source-review.ts` — relabel editorial maturity without changing stored enum values.
- `src/components/GuideStatusBadge.astro` — relabel Chinese editorial maturity.
- `src/pages/guides/index.astro` — disable advertising on the searchable index and use conservative maturity labels.
- `src/components/tools/ToolResultSupport.astro` — make default guide handoff route-neutral.
- `src/pages/tools/route-finder.astro` — persist only enumerated values and add configured-route next actions.
- `public/_headers` — remove the incompatible static CSP while retaining the other security headers.
- `deploy/nginx-vhost-template.conf` — define apex/`www` normalisation, `current` root, redirect include, and non-CSP security headers.
- `deploy/deploy.sh` — add clean-tree, test, candidate, Nginx, and atomic-release gates.
- `deploy/server-init.sh` — replace legacy production-domain instructions with `visalang.org`.
- `deploy/README.md` — document AdSense/account evidence, source-only deployment, smoke, and explicit rollback contracts.
- `tests/site.test.js` — update advertising, route-exclusion, trust, and tool assertions; load deployment tests.
- `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md` — replace the obsolete BLOCKED/no-ad target with the approved design and evidence boundaries.
- `docs/TASK_LOG.md` — record verified local evidence only.
- `docs/OPERATIONS_STATUS.md` — separate local source state, user-confirmed account state, and unverified production state.

### Files created

- `deploy/legacy-redirects.conf` — Nginx equivalents of critical `public/_redirects` rules.
- `deploy/rollback.sh` — rollback to a required, validated, previously verified release ID.
- `deploy/smoke-test.sh` — black-box production checks, not run without authorisation.
- `tests/deploy.test.js` — deployment-domain, redirect, release, rollback, and smoke contracts.

### File restored

- `public/ads.txt` — restore the approved Google authorised-seller declaration.

### Explicitly unchanged

- `src/content/guides/*.md`
- `src/content.config.ts`
- `src/data/route-tools.ts`
- `src/styles/global.css`
- `tests/route-tools.test.js`
- `public/_redirects`
- legacy root HTML/CSS/JS files
- `package.json` and `package-lock.json`

---

### Task 0: Establish the implementation baseline

**Agent:** Main coordinator, read-only.

**Files:**
- Review: `docs/superpowers/specs/2026-07-17-adsense-cmp-auto-ads-compliance-design.md`
- Review: `docs/superpowers/specs/2026-07-17-production-trust-stabilization-execution-orchestration-design.md`
- Review: `docs/superpowers/plans/2026-07-17-production-trust-stabilization.md`
- Review: all files in the file map above

- [ ] **Step 1: Confirm branch and preserve unrelated work**

Run:

```bash
git status --short --branch
git log -3 --oneline --decorate
```

Expected:

- Current branch is `fix/production-trust-stabilization`.
- `graphify-out/` may be untracked and remains excluded.
- No unexpected modification exists in a target implementation file. If one exists, stop and ask the user how to preserve it.

- [ ] **Step 2: Confirm the pre-change test baseline**

Run:

```bash
npm test
npm run launch-check
git diff --check
```

Expected: all commands pass before implementation. If a command fails before any product change, stop and record it as a pre-existing blocker rather than changing unrelated code.

- [ ] **Step 3: Record the superseded source-plan details**

The coordinator must state in the task handoff that executors must not copy these older snippets unchanged:

- Every no-ad requirement in the older execution plan, including deletion of `ads.txt`, no-ad smoke checks, advertising-disabled evidence templates, and no-ad Definition of Done.
- Task 2’s old file list that omitted `src/pages/guides/index.astro`.
- Task 4’s old Nginx host behaviour using `$host` or a combined apex/`www` HTTPS server.
- Task 4’s advertising-disabled static CSP assumption.
- Task 5’s old sequence that switched `current` before `nginx -t`.
- Task 5’s old mtime-based rollback selection.

No commit is created for this read-only task.

---

### Task 1: Restore consent-managed AdSense and exclude URL-backed tools

**Agent:** Fresh TDD executor.  
**Reviewers:** Independent AdSense security/privacy reviewer, then TypeScript/Astro quality reviewer.

**Files:**
- Modify: `tests/site.test.js:65-79`
- Modify: `src/layouts/BaseLayout.astro:7-29,60-62`
- Modify: `src/layouts/ToolLayout.astro:9-11`
- Modify: `src/pages/tools/index.astro:8-13`
- Modify: `src/pages/guides/index.astro:39-47`
- Modify: `src/pages/privacy-policy.astro:4-45`
- Modify: `src/pages/cookie-policy.astro:3-34`
- Modify: `public/_headers:1-9`
- Create: `public/ads.txt`

- [ ] **Step 1: Replace the obsolete no-ad assertions with a failing active advertising contract**

Replace the assertions at `tests/site.test.js:70-79` with:

```js
const adsenseLoader = 'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018617123550799';
assert.ok(src.base.includes('enableAds?: boolean'), 'BaseLayout exposes an explicit advertising contract');
assert.ok(src.base.includes('enableAds = true'), 'ordinary content pages are ad-eligible by default');
assert.equal((src.base.match(/pagead2\.googlesyndication\.com/g) || []).length, 1, 'shared layout declares one AdSense publisher loader');
assert.ok(src.base.includes(adsenseLoader), 'shared layout uses the approved AdSense publisher ID');
assert.ok(!src.base.includes('static.cloudflareinsights.com'), 'shared layout does not load Cloudflare Web Analytics');
assert.ok(src.tool.includes('enableAds={false}'), 'shared tool layout disables advertising');
assert.ok(src.tools.includes('enableAds={false}'), 'tools index disables advertising');
assert.ok(src.guides.includes('enableAds={false}'), 'searchable Guide Library index disables advertising');
assert.equal(read('public/ads.txt').trim(), 'google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0', 'ads.txt declares the approved Google seller relationship');
assert.ok(src.privacy.includes('VisaLang uses Google AdSense on ad-eligible content pages'), 'privacy policy describes the active AdSense scope');
assert.ok(src.privacy.includes('Google Privacy & messaging'), 'privacy policy identifies the Google-managed consent message');
assert.ok(src.privacy.includes('Google Ads Settings'), 'privacy policy provides the personalised-ad settings route');
assert.ok(src.cookies.includes('Google AdSense and Google Privacy & messaging'), 'cookie policy describes advertising and consent storage');
assert.ok(src.privacy.includes('places only the non-sensitive values needed to restore that result in the page URL'), 'privacy policy describes URL-backed tool restoration');
assert.ok(src.cookies.includes('Current tools do not store their form fields in local storage.'), 'cookie policy does not misstate tool fields as local-storage data');
assert.ok(src.cookies.includes('Route progress:') && src.cookies.includes('current route step in browser local storage'), 'cookie policy limits current local-storage behavior to route progress');
const staticHeaders = read('public/_headers');
assert.ok(!staticHeaders.includes('Content-Security-Policy:'), 'static host headers do not ship an incompatible AdSense CSP');
for (const header of ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy', 'Strict-Transport-Security']) {
  assert.ok(staticHeaders.includes(header), `static host headers retain ${header}`);
}
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node tests/site.test.js
```

Expected: FAIL because the local branch currently has no AdSense loader or `ads.txt`, has no `enableAds` contract, still describes a no-ad state, and retains the incompatible static CSP.

- [ ] **Step 3: Add the `enableAds` contract and restore the approved loader**

Add to the `BaseLayout.astro` Props interface:

```ts
enableAds?: boolean;
```

Add to the Astro props destructuring:

```ts
enableAds = true,
```

Render the loader once after the favicon and before JSON-LD scripts:

```astro
{enableAds && <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018617123550799" crossorigin="anonymous"></script>}
```

Do not add custom CMP code, `adsbygoogle.push(...)`, manual ad units, analytics, or tool/query values.

- [ ] **Step 4: Disable advertising on all tool routes and the searchable Guide Library index**

Change `ToolLayout.astro` to:

```astro
<BaseLayout title={title} description={description} canonicalURL={canonicalURL} jsonLD={jsonLD} enableAds={false}>
```

Change `src/pages/tools/index.astro` to:

```astro
<BaseLayout title="Decision tools" description="Use free tools to organise route questions, requirements, timing, exam comparisons, and reminders." canonicalURL="https://visalang.org/tools/" jsonLD={jsonLD} enableAds={false}>
```

Change `src/pages/guides/index.astro` to add the prop:

```astro
<BaseLayout title="Task guide library" description="Filter language-proof guides by purpose, country, route, exam, level, language, and content status." canonicalURL="https://visalang.org/guides/" jsonLD={jsonLD} enableAds={false}>
```

The production/account verification window must separately confirm Auto ads page exclusions for `/tools/*` and `/guides/`. Do not make account changes in this task.

- [ ] **Step 5: Restore the authorised seller declaration**

Create `public/ads.txt` with exactly:

```text
google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0
```

- [ ] **Step 6: Update the Privacy Policy to the active, route-bounded AdSense state**

Keep `updated = '2026-07-17'` and set the description to:

```astro
<BaseLayout title="Privacy Policy" description="How VisaLang handles visitor data, advertising choices, URL state, local storage, and server logs." jsonLD={jsonLD} noindex={true}>
```

Use this advertising list item:

```astro
<li><strong>Advertising:</strong> VisaLang uses Google AdSense on ad-eligible content pages. Google Privacy & messaging provides the European regulations consent message for covered visitors. Google and advertising partners may use cookies, local storage, or related identifiers according to your choices and applicable settings. Tool pages and the searchable Guide Library index do not load the AdSense runtime. Cloudflare Web Analytics is not enabled.</li>
```

Replace the `Cookies and privacy choices` section with:

```astro
<h2>Cookies and privacy choices</h2>
<p>Where the Google consent message is shown, use Consent, Manage options, or the available non-consent path to make a choice. You can reopen or change advertising choices through the Google privacy control where it is available. You can also manage personalised advertising through <a href="https://adssettings.google.com/" rel="nofollow noopener noreferrer">Google Ads Settings</a>.</p>
<p>Use a tool’s restart control to remove its URL values, and clear site data to remove route-step progress. Tool routes and the searchable Guide Library index do not load the AdSense runtime.</p>
```

Replace the `Advertising` section with:

```astro
<h2>Advertising</h2>
<p>Third-party vendors, including Google, use cookies to serve ads based on your previous visits to VisaLang or other websites. Google’s advertising cookies enable Google and its partners to serve personalised ads based on those visits. Non-personalised ads may still use cookies or identifiers for purposes such as frequency capping and aggregated reporting where permitted by your choices and applicable settings.</p>
<p>Auto ads is configured in the AdSense account for ad-eligible content pages. VisaLang does not add manual ad units in this source phase. The authorised-seller entry in <a href="/ads.txt">ads.txt</a> identifies Google as a direct seller; it is not proof of consent or legal approval.</p>
```

Do not claim independent legal approval, a specific downstream vendor list, or browser behavior that has not been verified.

- [ ] **Step 7: Update the Cookie Policy to the active consent/storage state**

Keep `updated = '2026-07-17'` and set:

```astro
<BaseLayout title="Cookie Policy" description="How VisaLang uses advertising consent, URL state, and browser local storage." noindex={true}>
```

Use this advertising list item:

```astro
<li><strong>Advertising and consent:</strong> Google AdSense and Google Privacy & messaging may use cookies, local storage, consent signals, or related identifiers on ad-eligible content pages according to your choices and applicable settings. Tool pages and the searchable Guide Library index do not load the AdSense runtime. Non-personalised ads are not described as storage-free.</li>
```

Replace `Managing cookies` with:

```astro
<h2>Managing cookies</h2>
<p>Use the Google consent/privacy control where available to consent, use the configured non-consent path, manage options, or change a previous advertising choice. You can also manage personalised advertising through <a href="https://adssettings.google.com/" rel="nofollow noopener noreferrer">Google Ads Settings</a>.</p>
<p>Use “Restart this tool” to remove that tool’s URL values. You can also clear or block local storage in your browser settings; doing so may remove saved route-step progress.</p>
```

Keep the existing tool-result URL, route-progress, Guide Library filter, no-social-tracking, and no-third-party-embed boundaries.

- [ ] **Step 8: Remove only the incompatible static CSP header**

Delete the `Content-Security-Policy:` line from `public/_headers`.

Keep these headers unchanged:

```text
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Do not replace CSP with wildcard Google domains, `script-src https:`, `unsafe-inline`, or `unsafe-eval`.

- [ ] **Step 9: Run focused, build, and generated-route verification**

Run:

```bash
node tests/site.test.js
npm test
npm run launch-check
grep -F 'pagead2.googlesyndication.com' dist/index.html
grep -F 'pagead2.googlesyndication.com' dist/guides/german-family-reunion-language-requirement/index.html
! grep -F 'pagead2.googlesyndication.com' dist/tools/index.html
! grep -F 'pagead2.googlesyndication.com' dist/tools/route-finder/index.html
! grep -F 'pagead2.googlesyndication.com' dist/guides/index.html
grep -Fx 'google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0' dist/ads.txt
git diff --check
```

Expected: all commands pass. Content pages contain one loader; tool pages and `/guides/` do not; generated `ads.txt` matches exactly.

- [ ] **Step 10: Run independent advertising reviews**

Run the specification review first. Then dispatch:

- security/privacy review of Google-managed CMP boundaries, route exclusions, policies, CSP trade-off, and evidence handling;
- TypeScript/Astro review of the `enableAds` prop and generated-route behavior;
- SEO/performance review confirming no manual slots were added and production CLS/Auto ads placement remains an explicit later gate.

Resolve every blocker and rerun Step 9 before commit.

- [ ] **Step 11: Commit the consent-managed advertising source contract**

Run:

```bash
git add src/layouts/BaseLayout.astro src/layouts/ToolLayout.astro src/pages/tools/index.astro src/pages/guides/index.astro src/pages/privacy-policy.astro src/pages/cookie-policy.astro public/_headers public/ads.txt tests/site.test.js
git commit -m "fix: restore consent-managed adsense"
```

---

### Task 2: Separate route maturity from source assurance everywhere

**Agent:** Fresh TDD executor.  
**Reviewer:** Defer final approval to the Wave 1 TypeScript/Astro reviewer.

**Files:**
- Modify: `tests/site.test.js:156-171`
- Modify: `src/data/source-review.ts:16-21`
- Modify: `src/components/GuideStatusBadge.astro:7-9`
- Modify: `src/pages/guides/index.astro:26-34`

- [ ] **Step 1: Replace old Guide Library label assertions and add source-label contracts**

Replace `tests/site.test.js:162-164` with:

```js
for (const status of ['Route structure complete', 'Core route structure', 'Starter overview']) {
  assert.ok(src.guides.includes(status), `guide library includes ${status} status`);
}
assert.ok(!src.guides.includes("label: 'Complete route'") && !src.guides.includes("label: 'Core route'"), 'guide library filters do not imply completed official-source review');
const sourceReviewDomain = read('src/data/source-review.ts');
assert.ok(sourceReviewDomain.includes("'complete-route': 'Route structure complete'"), 'complete-route label describes editorial structure');
assert.ok(sourceReviewDomain.includes("'core-route': 'Core route structure'"), 'core-route label describes editorial structure');
const guideStatusBadge = read('src/components/GuideStatusBadge.astro');
assert.ok(guideStatusBadge.includes("'complete-route': '路线结构完整'"), 'Chinese complete-route label describes route structure');
assert.ok(guideStatusBadge.includes("'core-route': '核心路线结构'"), 'Chinese core-route label describes route structure');
```

Keep these existing source-assurance assertions immediately after the new block:

```js
assert.ok(src.guide.includes('Who decides this?') && src.guide.includes('Official verification pending.'), 'English guides expose the deciding-authority boundary');
assert.ok(src.zhGuide.includes('谁最终决定？') && src.zhGuide.includes('官方来源事实表待完成'), 'Chinese guides preserve an explicit pending source boundary');
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node tests/site.test.js
```

Expected: FAIL because English, Chinese, and Guide Library filter labels still use the old maturity wording.

- [ ] **Step 3: Update the shared English labels**

Replace `contentStatusLabels` in `src/data/source-review.ts` with:

```ts
export const contentStatusLabels: Record<ContentStatus, string> = {
  'complete-route': 'Route structure complete',
  'core-route': 'Core route structure',
  'starter-overview': 'Starter overview',
  'verification-pending': 'Verification pending',
};
```

- [ ] **Step 4: Update the Chinese labels**

Replace the locale-specific object in `src/components/GuideStatusBadge.astro` with:

```ts
const labels = locale === 'zh-CN'
  ? { 'complete-route': '路线结构完整', 'core-route': '核心路线结构', 'starter-overview': '入门概览', 'verification-pending': '待核验' }
  : contentStatusLabels;
```

- [ ] **Step 5: Update the Guide Library filter labels**

Replace the status filter entry in `src/pages/guides/index.astro` with:

```ts
{ name: 'status', label: 'Content status', options: [{ value: 'complete-route', label: 'Route structure complete' }, { value: 'core-route', label: 'Core route structure' }, { value: 'starter-overview', label: 'Starter overview' }, { value: 'verification-pending', label: 'Verification pending' }] },
```

Do not change `value`, `contentStatus`, guide frontmatter, sort weights, or source-review state.

- [ ] **Step 6: Run focused and release-facing checks**

Run:

```bash
node tests/site.test.js
npm test
npm run launch-check
```

Expected: all commands pass; generated guide pages continue to show source-review state separately from maturity.

- [ ] **Step 7: Commit the label clarification**

Run:

```bash
git add src/data/source-review.ts src/components/GuideStatusBadge.astro src/pages/guides/index.astro tests/site.test.js
git commit -m "fix: separate route maturity from source assurance"
```

---

### Task 3: Minimise Route Finder URL state and make handoffs route-safe

**Agent:** Fresh TDD executor.  
**Reviewer:** Wave 1 TypeScript/Astro reviewer after implementation.

**Files:**
- Modify: `tests/site.test.js:113-138`
- Modify: `src/components/tools/ToolResultSupport.astro:13-34`
- Modify: `src/pages/tools/route-finder.astro:44-80`
- Test unchanged: `tests/route-tools.test.js`

- [ ] **Step 1: Add failing source-contract assertions**

Add after the `toolFormController` assertions in `tests/site.test.js`:

```js
const routeFinder = read('src/pages/tools/route-finder.astro');
const toolResultSupport = read('src/components/tools/ToolResultSupport.astro');
assert.ok(routeFinder.includes("persistedNames: ['country', 'purpose', 'level', 'certificate']"), 'Route Finder persists only enumerated non-free-text fields');
assert.ok(!routeFinder.includes("persistedNames: ['country', 'purpose', 'location'"), 'Route Finder does not persist free-text application location');
assert.ok(!routeFinder.includes("'targetDate']"), 'Route Finder does not persist target date in its shareable URL');
assert.ok(toolResultSupport.includes("guideHref = '/guides/'"), 'shared fallback support defaults to the generic Guide Library');
assert.ok(toolResultSupport.includes("guideLabel = 'Browse route guides'"), 'shared fallback support uses a route-neutral label');
assert.ok(!toolResultSupport.includes('Germany B1 settlement and citizenship route'), 'shared fallback support does not push an unrelated Germany route');
assert.ok(routeFinder.includes('route.guide?.href'), 'configured Route Finder results expose their matching guide');
assert.ok(routeFinder.includes("checklistLink.href = '/tools/checklist-generator/'"), 'configured Route Finder results hand off to Checklist');
assert.ok(routeFinder.includes("timelineLink.href = '/tools/timeline-calculator/'"), 'configured Route Finder results hand off to Timeline');
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node tests/site.test.js
```

Expected: FAIL because Route Finder persists `location` and `targetDate`, shared support defaults to Germany A1/B1 links, and configured results do not render contextual next actions.

- [ ] **Step 3: Make shared result support route-neutral**

Replace the prop defaults in `src/components/tools/ToolResultSupport.astro` with:

```ts
const {
  resultId,
  guideHref = '/guides/',
  guideLabel = 'Browse route guides',
} = Astro.props;
```

Replace the `Continue your plan` section with:

```astro
<section>
  <h2>Continue your plan</h2>
  <p><a href={guideHref}>{guideLabel}</a></p>
  <p><a href={toolLinks.checklist}>Open Checklist</a> / <a href={toolLinks.timeline}>Open Timeline</a></p>
</section>
```

- [ ] **Step 4: Restrict Route Finder URL persistence**

Replace the controller setup with:

```ts
const controller = form ? setupToolForm(form, { persistedNames: ['country', 'purpose', 'level', 'certificate'] }) : undefined;
```

Keep `location` and `targetDate` as required current-page form fields. Do not write them into browser history or restored URLs.

- [ ] **Step 5: Add configured-route next actions**

Inside the configured branch, immediately after `summary.append(list);`, add:

```ts
if (route.guide?.href) {
  const guide = document.createElement('p');
  const guideLink = document.createElement('a');
  guideLink.href = route.guide.href;
  guideLink.textContent = route.guide.label;
  guide.append('Continue with: ', guideLink);
  summary.append(guide);
}

const tools = document.createElement('p');
const checklistLink = document.createElement('a');
checklistLink.href = '/tools/checklist-generator/';
checklistLink.textContent = 'Open Checklist';
const timelineLink = document.createElement('a');
timelineLink.href = '/tools/timeline-calculator/';
timelineLink.textContent = 'Open Timeline';
tools.append(checklistLink, ' / ', timelineLink);
summary.append(tools);
```

Do not add query parameters, contact links, product links, Route Review, pricing, or a generated checklist for unsupported routes.

- [ ] **Step 6: Run focused and complete verification**

Run:

```bash
node tests/route-tools.test.js
node tests/site.test.js
npm test
npm run launch-check
```

Expected: all commands pass. Unsupported routes retain the `official-verification-required` result and do not receive a pseudo-checklist or Germany-specific default guide.

- [ ] **Step 7: Request the Wave 1 review**

Dispatch a reviewer who did not implement Tasks 1–3. The reviewer must verify:

- advertising appears only on ad-eligible content pages and policies match the Google-managed CMP state;
- tool routes and the searchable Guide Library index remain advertising-free;
- all public maturity labels are conservative;
- Route Finder persists only the four enumerated fields;
- unsupported routes remain neutral;
- no guide fact, guide frontmatter, global CSS, route-tools logic, or legacy file changed.

Resolve every blocking finding and rerun the affected focused tests before continuing.

- [ ] **Step 8: Commit the Route Finder safety change**

Run:

```bash
git add src/components/tools/ToolResultSupport.astro src/pages/tools/route-finder.astro tests/site.test.js
git commit -m "fix: make route finder handoff context safe"
```

---

### Task 4: Add the deployment regression harness, canonical host contract, and Nginx legacy redirects

**Agent:** Fresh deployment TDD executor.  
**Reviewers:** Defer final approval to the Wave 2 parallel review.

**Files:**
- Create: `tests/deploy.test.js`
- Create: `deploy/legacy-redirects.conf`
- Modify: `tests/site.test.js:5-12`
- Modify: `deploy/deploy.sh:1-12`
- Modify: `deploy/nginx-vhost-template.conf`
- Modify: `deploy/server-init.sh:17-52`

- [ ] **Step 1: Create the initial failing deployment test**

Create `tests/deploy.test.js` with:

```js
const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = (file) => fs.readFileSync(file, 'utf8');
const deploy = read('deploy/deploy.sh');
const nginx = read('deploy/nginx-vhost-template.conf');
const serverInit = read('deploy/server-init.sh');
const redirects = read('deploy/legacy-redirects.conf');

assert.ok(deploy.includes('DOMAIN="visalang.org"'), 'deployment is fixed to the canonical VisaLang domain');
assert.doesNotMatch(deploy, /flowlight\.me/, 'deployment no longer targets the legacy domain');
assert.doesNotMatch(nginx, /https:\/\/\$host/, 'Nginx never builds redirects from the request Host header');
assert.ok(nginx.includes('return 301 https://visalang.org$request_uri;'), 'HTTP and www redirects use the fixed canonical host');
assert.ok(nginx.includes('server_name www.visalang.org;'), 'Nginx has a dedicated HTTPS www redirect server');
assert.ok(nginx.includes('server_name visalang.org;'), 'Nginx has a dedicated canonical HTTPS server');
assert.ok(nginx.includes('root /var/www/visalang.org/current;'), 'canonical Nginx server uses the atomic current release');
assert.ok(nginx.includes('include /etc/nginx/snippets/visalang-legacy-redirects.conf;'), 'canonical Nginx server loads executable legacy redirects');
assert.doesNotMatch(nginx, /Content-Security-Policy/, 'Nginx does not ship an incompatible static AdSense CSP');
for (const header of ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy', 'Strict-Transport-Security']) {
  assert.ok(nginx.includes(header), `Nginx retains ${header}`);
}
assert.doesNotMatch(serverInit, /flowlight\.me/, 'server initialization instructions use the canonical domain');
for (const path of ['/index.html', '/germany-family-reunion-a1.html', '/do-i-need-german-a1.html', '/zh/index.html']) {
  assert.ok(redirects.includes(`location = ${path}`), `Nginx redirects critical legacy path: ${path}`);
}
assert.match(redirects, /\^\/guides\/\(\.\+\)\\\.html\$/, 'Nginx redirects legacy English guide HTML routes');
assert.match(redirects, /\^\/zh\/guides\/\(\.\+\)\\\.html\$/, 'Nginx redirects legacy Chinese guide HTML routes');

console.log('deployment configuration rules passed');
```

Add this require after the existing test requires in `tests/site.test.js`:

```js
require('./deploy.test.js');
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node tests/site.test.js
```

Expected: FAIL with `ENOENT` because `deploy/legacy-redirects.conf` does not exist.

- [ ] **Step 3: Create executable Nginx redirect rules**

Create `deploy/legacy-redirects.conf` with:

```nginx
location = /index.html { return 301 /; }
location = /germany-family-reunion-a1.html { return 301 /germany-family-reunion-a1/; }
location = /do-i-need-german-a1.html { return 301 /tools/route-finder/; }
location = /about.html { return 301 /about/; }
location = /contact.html { return 301 /contact/; }
location = /privacy-policy.html { return 301 /privacy-policy/; }
location = /terms.html { return 301 /terms/; }
location = /cookie-policy.html { return 301 /cookie-policy/; }
location = /editorial-policy.html { return 301 /editorial-policy/; }
location = /affiliate-disclosure.html { return 301 /affiliate-disclosure/; }
location = /zh/index.html { return 301 /zh/; }
location = /zh/germany-family-reunion-a1.html { return 301 /zh/germany-family-reunion-a1/; }
location = /guides/dutch-inburgering-a2-b1-for-integration-and-citize/ { return 301 /guides/dutch-inburgering-a2-b1-for-integration-and-citizenship/; }
location = /guides/portuguese-language-for-golden-visa-and-citizenshi/ { return 301 /guides/portuguese-language-for-golden-visa-and-citizenship/; }
location ~ ^/guides/(.+)\.html$ { return 301 /guides/$1/; }
location ~ ^/zh/guides/(.+)\.html$ { return 301 /zh/guides/$1/; }
```

Keep `public/_redirects` unchanged as the non-Nginx adapter.

- [ ] **Step 4: Align the existing deploy script header with the canonical domain**

Before Task 5 replaces the full deployment flow, update the top of `deploy/deploy.sh` so Task 4 has one consistent production identity:

```bash
#!/usr/bin/env bash
# VisaLang deployment target: /var/www/visalang.org

set -euo pipefail

DOMAIN="visalang.org"
SITE_DIR="/var/www/$DOMAIN"
PUBLIC_DIR="$SITE_DIR/public"
SERVE_DIR="$PUBLIC_DIR/dist"
SOURCE_DIR="$SITE_DIR/source"
REPO="https://github.com/fan0269-code/VisaLang.git"
```

Do not otherwise modernise the deployment flow in this step; Task 5 replaces it test-first.

- [ ] **Step 5: Replace the Nginx template with an explicit canonical-host configuration**

Replace `deploy/nginx-vhost-template.conf` with:

```nginx
# VisaLang production Nginx configuration.
# Canonical origin: https://visalang.org

server {
    listen 80;
    listen [::]:80;
    server_name visalang.org www.visalang.org;
    return 301 https://visalang.org$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.visalang.org;

    ssl_certificate     /etc/letsencrypt/live/visalang.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/visalang.org/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    return 301 https://visalang.org$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name visalang.org;

    root /var/www/visalang.org/current;
    index index.html;

    access_log /var/log/nginx/visalang.org.access.log;
    error_log  /var/log/nginx/visalang.org.error.log;

    ssl_certificate     /etc/letsencrypt/live/visalang.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/visalang.org/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;

    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options SAMEORIGIN always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    include /etc/nginx/snippets/visalang-legacy-redirects.conf;

    location ~* \.(css|js)$ {
        expires 1y;
        try_files $uri =404;
    }

    location ~* \.(xml|txt)$ {
        expires 1h;
        try_files $uri =404;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    location / {
        try_files $uri $uri/ =404;
    }

    autoindex off;
}
```

Do not add a replacement CSP allowlist, wildcard Google domains, `script-src https:`, `unsafe-inline`, or `unsafe-eval`. Keep the non-CSP security headers. Do not add a location-level `add_header` in the asset blocks, because it would suppress inheritance of the server-level headers.

- [ ] **Step 6: Update server initialisation prerequisites and output**

Replace the package-install heading and command with:

```bash
echo "==> 安装 Nginx + Certbot + Git + UFW"
DEBIAN_FRONTEND=noninteractive apt install -y nginx certbot python3-certbot-nginx git ufw curl

echo "==> Node.js 要求"
echo "  发布前请单独安装 Node.js 22.12+ 与 npm；本初始化脚本不会在发布窗口修改 Node 运行时。"
```

Keep the existing firewall commands unchanged. Replace `deploy/server-init.sh:35-50` with:

```bash
echo "==> 创建 VisaLang 目录骨架"
mkdir -p /var/www/visalang.org/source /var/www/visalang.org/releases
chown -R www-data:www-data /var/www/visalang.org
chmod -R 755 /var/www/visalang.org

echo ""
echo "==> 初始化完成 ✅"
echo ""
echo "接下来需要由获权操作人完成："
echo "  1) 确认 visalang.org 与 www.visalang.org 的 DNS 目标"
echo "  2) 安装 deploy/nginx-vhost-template.conf 到 /etc/nginx/sites-available/visalang.org.conf"
echo "  3) 安装 deploy/legacy-redirects.conf 到 /etc/nginx/snippets/visalang-legacy-redirects.conf"
echo "  4) nginx -t 通过后再启用并重载 Nginx"
echo "  5) 确认证书覆盖 visalang.org 与 www.visalang.org"
echo "  6) 仅在批准的发布窗口运行 deploy/deploy.sh"
echo ""
echo "服务器公网 IP：$(curl -s ifconfig.me)"
```

Do not run this script during local implementation.

- [ ] **Step 7: Run focused tests and syntax checks**

Run:

```bash
node tests/deploy.test.js
bash -n deploy/server-init.sh
npm test
```

Expected: all commands pass.

- [ ] **Step 8: Commit the canonical deployment contract**

Run:

```bash
git add deploy/deploy.sh deploy/legacy-redirects.conf deploy/nginx-vhost-template.conf deploy/server-init.sh tests/deploy.test.js tests/site.test.js
git commit -m "fix: align nginx deployment with visalang.org"
```

---

### Task 5: Make deployment test-gated, immutable, and atomic

**Agent:** Fresh deployment TDD executor.  
**Reviewers:** Defer final approval to the Wave 2 parallel review.

**Files:**
- Modify: `tests/deploy.test.js`
- Replace: `deploy/deploy.sh`

- [ ] **Step 1: Extend the deployment test with failing release-gate assertions**

Add before the final `console.log` in `tests/deploy.test.js`:

```js
assert.match(deploy, /git -C "\$SOURCE_DIR" status --porcelain/, 'deployment refuses a dirty server source tree');
assert.match(deploy, /pull --ff-only origin main/, 'deployment only fast-forwards the server source');
assert.doesNotMatch(deploy, /stash|stash pop/, 'deployment never hides server changes with stash');
assert.ok(deploy.includes('process.versions.node'), 'deployment enforces the Astro Node.js runtime requirement');
assert.match(deploy, /npm --prefix "\$SOURCE_DIR" test/, 'deployment runs the complete Node regression suite');
assert.match(deploy, /npm --prefix "\$SOURCE_DIR" run launch-check/, 'deployment runs build and static release checks');
assert.match(deploy, /RELEASE_ID=/, 'deployment creates a commit-addressed release');
assert.ok(deploy.includes('"$RELEASE_DIR/index.html"'), 'deployment validates the copied candidate release');
assert.ok(deploy.indexOf('nginx -t') < deploy.indexOf('ln -sfn'), 'Nginx validation occurs before the current symlink switch');
assert.match(deploy, /ln -sfn/, 'deployment stages an atomic symlink switch');
assert.match(deploy, /mv -Tf/, 'deployment atomically replaces current');
assert.match(deploy, /visalang-legacy-redirects\.conf/, 'deployment installs the Nginx redirect adapter');
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node tests/deploy.test.js
```

Expected: FAIL because the current script still stashes changes, runs only `build`, publishes destructively to `public/dist`, and has no release symlink.

- [ ] **Step 3: Replace `deploy/deploy.sh` with the release-based flow**

Use this complete script:

```bash
#!/usr/bin/env bash
set -euo pipefail

DOMAIN="visalang.org"
SITE_DIR="/var/www/$DOMAIN"
RELEASES_DIR="$SITE_DIR/releases"
CURRENT_LINK="$SITE_DIR/current"
SOURCE_DIR="$SITE_DIR/source"
REPO="https://github.com/fan0269-code/VisaLang.git"
REDIRECTS_TARGET="/etc/nginx/snippets/visalang-legacy-redirects.conf"

if [ "${EUID:-$(id -u)}" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
  $SUDO -n true || { echo "✗ Run as root or configure passwordless sudo"; exit 1; }
fi

echo "==> Deployment target: $CURRENT_LINK"
echo "==> Repository: $REPO"

if [ ! -d "$SOURCE_DIR/.git" ]; then
  echo "==> First source checkout"
  $SUDO mkdir -p "$SITE_DIR"
  $SUDO git clone "$REPO" "$SOURCE_DIR"
else
  if [ -n "$($SUDO git -C "$SOURCE_DIR" status --porcelain)" ]; then
    echo "✗ Server source tree contains local changes. Refusing to deploy."
    exit 1
  fi
  echo "==> Fast-forward source to origin/main"
  $SUDO git -C "$SOURCE_DIR" pull --ff-only origin main
fi

RELEASE_ID="$($SUDO git -C "$SOURCE_DIR" rev-parse --short=12 HEAD)"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "✗ Node.js 22.12+ and npm must be installed before deployment"
  exit 1
fi

node -e "const [major, minor] = process.versions.node.split('.').map(Number); if (major < 22 || (major === 22 && minor < 12)) { console.error('Node.js 22.12+ is required'); process.exit(1); }"

echo "==> Install dependencies and run release gates"
$SUDO npm --prefix "$SOURCE_DIR" ci
$SUDO npm --prefix "$SOURCE_DIR" test
$SUDO npm --prefix "$SOURCE_DIR" run launch-check

if [ ! -f "$SOURCE_DIR/dist/index.html" ]; then
  echo "✗ launch-check did not leave a valid dist/index.html"
  exit 1
fi

$SUDO mkdir -p "$RELEASES_DIR"
if [ -e "$RELEASE_DIR" ]; then
  echo "✗ Release already exists: $RELEASE_DIR"
  exit 1
fi

$SUDO mkdir "$RELEASE_DIR"
$SUDO cp -a "$SOURCE_DIR/dist/." "$RELEASE_DIR/"

if [ ! -f "$RELEASE_DIR/index.html" ]; then
  echo "✗ Candidate release does not contain index.html"
  exit 1
fi

$SUDO chown -R www-data:www-data "$RELEASE_DIR"
$SUDO chmod -R 755 "$RELEASE_DIR"
$SUDO install -m 0644 "$SOURCE_DIR/deploy/legacy-redirects.conf" "$REDIRECTS_TARGET"

$SUDO nginx -t
$SUDO ln -sfn "$RELEASE_DIR" "$CURRENT_LINK.next"
$SUDO mv -Tf "$CURRENT_LINK.next" "$CURRENT_LINK"
$SUDO systemctl reload nginx

echo "Deployment switched to release: $RELEASE_ID"
echo "Production smoke checks require a separately authorised window."
```

Important behavior:

- The script requires Node.js 22.12+ instead of installing an unknown distro Node version during release.
- `launch-check` performs the production build through its `prelaunch-check` script.
- The script does not delete previous releases.
- The script does not run production smoke checks.
- The script does not claim the new release is verified in production.

- [ ] **Step 4: Make the deployment script executable**

Run:

```bash
chmod +x deploy/deploy.sh
```

- [ ] **Step 5: Run focused and complete local checks**

Run:

```bash
bash -n deploy/deploy.sh
node tests/deploy.test.js
npm test
```

Expected: all commands pass.

- [ ] **Step 6: Commit the atomic deployment flow**

Run:

```bash
git add deploy/deploy.sh tests/deploy.test.js
git commit -m "feat: add atomic test-gated deployment"
```

---

### Task 6: Add explicit verified-release rollback

**Agent:** Fresh deployment TDD executor.  
**Reviewers:** Defer final approval to the Wave 2 parallel review.

**Files:**
- Create: `deploy/rollback.sh`
- Modify: `tests/deploy.test.js`

- [ ] **Step 1: Add failing rollback-contract assertions**

Add before the final `console.log` in `tests/deploy.test.js`:

```js
assert.ok(fs.existsSync('deploy/rollback.sh'), 'deployment includes an explicit rollback command');
const rollback = read('deploy/rollback.sh');
assert.match(rollback, /RELEASE_ID="\$\{1:-\}"/, 'rollback requires an explicit release ID argument');
assert.match(rollback, /\^\[0-9a-f\]\{7,40\}\$/, 'rollback validates the release ID format');
assert.ok(rollback.includes('"$TARGET_RELEASE/index.html"'), 'rollback requires a complete release target');
assert.ok(rollback.includes('RELEASES_REAL'), 'rollback validates target containment inside releases');
assert.ok(rollback.includes('CURRENT_TARGET'), 'rollback refuses the already-current release');
assert.doesNotMatch(rollback, /find .*%T@|sort -nr|PREVIOUS_RELEASE/, 'rollback does not infer a target by modification time');
assert.ok(rollback.indexOf('nginx -t') < rollback.indexOf('ln -sfn'), 'rollback validates Nginx before switching current');
assert.match(rollback, /ln -sfn/, 'rollback stages an atomic symlink switch');
assert.match(rollback, /mv -Tf/, 'rollback atomically replaces current');
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node tests/deploy.test.js
```

Expected: FAIL because `deploy/rollback.sh` does not exist.

- [ ] **Step 3: Create `deploy/rollback.sh`**

Use this complete script:

```bash
#!/usr/bin/env bash
set -euo pipefail

DOMAIN="visalang.org"
SITE_DIR="/var/www/$DOMAIN"
RELEASES_DIR="$SITE_DIR/releases"
CURRENT_LINK="$SITE_DIR/current"
RELEASE_ID="${1:-}"

if [ ! "$RELEASE_ID" ] || [[ ! "$RELEASE_ID" =~ ^[0-9a-f]{7,40}$ ]]; then
  echo "✗ Usage: rollback.sh <verified-release-id>"
  exit 1
fi

if [ "${EUID:-$(id -u)}" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
  $SUDO -n true || { echo "✗ Run as root or configure passwordless sudo"; exit 1; }
fi

if [ ! -d "$RELEASES_DIR" ]; then
  echo "✗ Releases directory does not exist: $RELEASES_DIR"
  exit 1
fi

RELEASES_REAL="$(readlink -f "$RELEASES_DIR")"
TARGET_RELEASE="$RELEASES_DIR/$RELEASE_ID"
TARGET_REAL="$(readlink -f "$TARGET_RELEASE" || true)"
CURRENT_TARGET="$(readlink -f "$CURRENT_LINK" || true)"

case "$TARGET_REAL" in
  "$RELEASES_REAL"/*) ;;
  *) echo "✗ Rollback target is outside the releases directory"; exit 1 ;;
esac

if [ ! -f "$TARGET_RELEASE/index.html" ]; then
  echo "✗ Rollback target is missing index.html: $TARGET_RELEASE"
  exit 1
fi

if [ "$TARGET_REAL" = "$CURRENT_TARGET" ]; then
  echo "✗ Requested release is already current: $RELEASE_ID"
  exit 1
fi

$SUDO nginx -t
$SUDO ln -sfn "$TARGET_REAL" "$CURRENT_LINK.next"
$SUDO mv -Tf "$CURRENT_LINK.next" "$CURRENT_LINK"
$SUDO systemctl reload nginx

echo "Rolled back to verified release: $RELEASE_ID"
```

The script requires an operator-supplied release ID from an authorised deployment record. It must not guess which release is safe.

- [ ] **Step 4: Make the rollback script executable**

Run:

```bash
chmod +x deploy/rollback.sh
```

- [ ] **Step 5: Run rollback syntax and regression checks**

Run:

```bash
bash -n deploy/rollback.sh
node tests/deploy.test.js
npm test
```

Expected: all commands pass.

- [ ] **Step 6: Commit the explicit rollback contract**

Run:

```bash
git add deploy/rollback.sh tests/deploy.test.js
git commit -m "feat: add explicit release rollback"
```

---

### Task 7: Add production smoke checks and replace deployment documentation

**Agent:** Fresh deployment/documentation TDD executor.  
**Reviewers:** Code, security/privacy, and deployment reviewers run in parallel after this task.

**Files:**
- Create: `deploy/smoke-test.sh`
- Modify: `tests/deploy.test.js`
- Replace: `deploy/README.md`

- [ ] **Step 1: Add failing smoke and documentation assertions**

Add before the final `console.log` in `tests/deploy.test.js`:

```js
assert.ok(fs.existsSync('deploy/smoke-test.sh'), 'deployment includes production smoke checks');
const smoke = read('deploy/smoke-test.sh');
for (const path of ['/', '/guides/', '/robots.txt', '/sitemap-index.xml']) {
  assert.ok(smoke.includes(path), `smoke test checks public path: ${path}`);
}
for (const path of ['/index.html', '/germany-family-reunion-a1.html']) {
  assert.ok(smoke.includes(path), `smoke test checks legacy redirect: ${path}`);
}
assert.ok(smoke.includes('rel="canonical" href="https://visalang.org/"'), 'smoke test verifies the production canonical');
assert.ok(smoke.includes('https://www.visalang.org/'), 'smoke test checks www canonicalisation');
assert.ok(smoke.includes('pagead2.googlesyndication.com'), 'smoke test verifies the active AdSense runtime on eligible content');
assert.ok(smoke.includes('/tools/route-finder/'), 'smoke test verifies the tool route remains advertising-free');
assert.ok(smoke.includes('google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0'), 'smoke test verifies the production ads.txt seller line');
assert.ok(smoke.includes('content-security-policy'), 'smoke test verifies the approved CSP removal');
const deployReadme = read('deploy/README.md');
assert.doesNotMatch(deployReadme, /flowlight\.me/, 'deployment documentation no longer describes the legacy domain as current');
assert.ok(deployReadme.includes('rollback.sh <verified-release-id>'), 'deployment documentation requires an explicit verified rollback target');
assert.ok(deployReadme.includes('separately authorised production window'), 'deployment documentation preserves the production authorisation boundary');
assert.ok(deployReadme.includes('Auto ads page exclusions'), 'deployment documentation requires account-side route exclusions');
assert.ok(deployReadme.includes('Raw HAR files and screenshots must not be committed to Git'), 'deployment documentation protects raw browser evidence');
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node tests/deploy.test.js
```

Expected: FAIL because `deploy/smoke-test.sh` does not exist and the README still describes `flowlight.me`.

- [ ] **Step 3: Create `deploy/smoke-test.sh`**

Use this complete script:

```bash
#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-https://visalang.org}"
WWW_URL="${WWW_URL:-https://www.visalang.org}"

check_200() {
  local path="$1"
  local status
  status="$(curl -sS -o /dev/null -w '%{http_code}' "$BASE_URL$path")"
  [ "$status" = "200" ] || { echo "✗ Expected 200 for $path, got $status"; exit 1; }
  echo "✓ 200 $path"
}

check_redirect() {
  local url="$1"
  local expected="$2"
  local headers
  headers="$(curl -sS -I --max-redirs 0 "$url")"
  printf '%s' "$headers" | grep -Eq '^HTTP/[^ ]+ 301' || { echo "✗ Expected 301 for $url"; exit 1; }
  printf '%s' "$headers" | grep -Eiq "^location: $expected\r?$" || { echo "✗ Unexpected Location for $url"; exit 1; }
  echo "✓ 301 $url -> $expected"
}

for path in / /guides/ /robots.txt /sitemap-index.xml; do
  check_200 "$path"
done

check_redirect "$BASE_URL/index.html" "https://visalang.org/"
check_redirect "$BASE_URL/germany-family-reunion-a1.html" "https://visalang.org/germany-family-reunion-a1/"
check_redirect "$WWW_URL/" "https://visalang.org/"

homepage="$(curl -fsS "$BASE_URL/")"
printf '%s' "$homepage" | grep -Fq 'rel="canonical" href="https://visalang.org/"' || { echo "✗ Homepage canonical is not visalang.org"; exit 1; }
printf '%s' "$homepage" | grep -Fq 'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018617123550799' || { echo "✗ Homepage does not contain the approved AdSense loader"; exit 1; }

tool_page="$(curl -fsS "$BASE_URL/tools/route-finder/")"
if printf '%s' "$tool_page" | grep -Fq 'pagead2.googlesyndication.com'; then
  echo "✗ Route Finder must not load AdSense"
  exit 1
fi

guides_index="$(curl -fsS "$BASE_URL/guides/")"
if printf '%s' "$guides_index" | grep -Fq 'pagead2.googlesyndication.com'; then
  echo "✗ Searchable Guide Library index must not load AdSense"
  exit 1
fi

ads_txt="$(curl -fsS "$BASE_URL/ads.txt")"
printf '%s' "$ads_txt" | grep -Fxq 'google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0' || { echo "✗ ads.txt does not match the approved seller line"; exit 1; }

robots="$(curl -fsS "$BASE_URL/robots.txt")"
printf '%s' "$robots" | grep -Fq 'Sitemap: https://visalang.org/sitemap-index.xml' || { echo "✗ robots.txt sitemap does not use visalang.org"; exit 1; }

headers="$(curl -sS -D - -o /dev/null "$BASE_URL/")"
if printf '%s' "$headers" | grep -Eiq '^content-security-policy:'; then
  echo "✗ Production still sends the incompatible static CSP"
  exit 1
fi
for header in strict-transport-security x-content-type-options x-frame-options referrer-policy permissions-policy; do
  printf '%s' "$headers" | grep -Eiq "^$header:" || { echo "✗ Missing production header: $header"; exit 1; }
done

echo "Production source smoke checks passed for $BASE_URL"
echo "CMP choices, Auto ads placement, CLS, and browser network behavior require the separately authorised clean-profile verification window."
```

- [ ] **Step 4: Make the smoke script executable**

Run:

```bash
chmod +x deploy/smoke-test.sh
```

- [ ] **Step 5: Replace `deploy/README.md` with the current operating contract**

Use this complete document:

```markdown
# VisaLang Nginx deployment

Canonical production origin: `https://visalang.org`.

These files prepare a deployment workflow; their presence does not prove DNS, TLS, Nginx, public redirects, production smoke checks, or rollback have been verified. Production commands require a separately authorised production window.

## Files

- `server-init.sh` — destructive first-server bootstrap; review before use.
- `nginx-vhost-template.conf` — canonical apex/`www` Nginx configuration.
- `legacy-redirects.conf` — executable Nginx legacy redirect rules.
- `deploy.sh` — clean-source, test-gated, immutable-release deployment.
- `smoke-test.sh` — black-box public verification after an authorised release.
- `rollback.sh` — atomic rollback to an explicitly supplied verified release ID.

## Local release gate

Node.js 22.12 or newer and npm must already be installed. The deployment script refuses older or missing runtimes instead of changing the server runtime during a release.

Run from the repository root:

```bash
npm test
npm run launch-check
bash -n deploy/deploy.sh deploy/rollback.sh deploy/smoke-test.sh deploy/server-init.sh
```

All commands must pass before requesting a production window.

## Production prerequisites

Before production work, record:

1. Target commit and release ID.
2. Authorised release operator and rollback authoriser.
3. Current DNS and TLS target.
4. Installed Nginx configuration and redirect snippet paths.
5. A previously verified release ID for rollback.
6. Google Privacy & messaging published-state evidence and the actual non-consent/withdrawal path.
7. Auto ads enabled-state evidence and Auto ads page exclusions for `/tools/*` and `/guides/`.
8. Current AdSense Policy Center, CMP, and ads.txt status.
9. Success criteria and mandatory rollback triggers.

If no previously verified release ID or required AdSense/CMP account evidence exists, stop and establish it in the authorised production-verification plan before deploying.

## Install the Nginx configuration

An authorised server operator installs:

```bash
sudo install -m 0644 deploy/nginx-vhost-template.conf /etc/nginx/sites-available/visalang.org.conf
sudo install -m 0644 deploy/legacy-redirects.conf /etc/nginx/snippets/visalang-legacy-redirects.conf
sudo ln -sfn /etc/nginx/sites-available/visalang.org.conf /etc/nginx/sites-enabled/visalang.org.conf
sudo nginx -t
```

Do not reload Nginx unless the production window explicitly authorises the change.

## Deploy

After authorisation:

```bash
bash deploy/deploy.sh
```

The script refuses a dirty server source tree, fast-forwards `origin/main`, runs `npm ci`, `npm test`, and `npm run launch-check`, creates an immutable commit-addressed release, validates candidate output and Nginx, then switches `current` atomically.

## Verify

After the authorised switch and reload:

```bash
BASE_URL=https://visalang.org WWW_URL=https://www.visalang.org bash deploy/smoke-test.sh
```

Record the command result. Then use a clean browser profile with synthetic non-personal test values to verify the covered-region message, Accept, the actual configured non-consent path, Manage options, withdrawal/reopen behavior, Auto ads placement, CLS, and the advertising-free tool/index routes.

Raw HAR files and screenshots must not be committed to Git, copied into public documentation, or attached to public artifacts. Store them only in the authorised restricted evidence location; shared evidence must remove query strings, cookies, advertising identifiers, consent strings, and session-linked data.

Do not describe production verification as passed unless the script, approved DNS/TLS/header checks, account evidence, and browser checks were actually completed.

## Roll back

Use a release ID already recorded as production-verified:

```bash
bash deploy/rollback.sh <verified-release-id>
```

The rollback script rejects malformed, missing, incomplete, outside-directory, and already-current targets. It never chooses a release by directory modification time.

Run the production smoke checks again after rollback. A real rollback or rollback rehearsal requires separate authorisation.
```

- [ ] **Step 6: Run local syntax and regression checks**

Run:

```bash
bash -n deploy/deploy.sh deploy/rollback.sh deploy/smoke-test.sh deploy/server-init.sh
node tests/deploy.test.js
npm test
npm run launch-check
```

Expected: all commands pass. Do not run `deploy/smoke-test.sh` against the public site in this task.

- [ ] **Step 7: Run the Wave 2 parallel reviews**

Dispatch four reviewers concurrently; none may be an implementation author.

**Code reviewer:**

- Check JavaScript assertions, Astro changes, Bash syntax, and scope.
- Confirm tests fail for the intended missing behavior and pass after implementation.

**Security/privacy reviewer:**

- Check AdSense loads only on ad-eligible routes and policies match the Google-managed CMP design.
- Check `/tools/` and the searchable `/guides/` index remain advertising-free.
- Check Route Finder URL persistence excludes location/date.
- Check static and Nginx CSP removal is explicit while other security headers remain.
- Check Nginx redirects do not use `$host`.
- Check shell variables are quoted and rollback validates containment.
- Check raw HAR/screenshots are excluded from Git and public documentation.

**SEO/performance reviewer:**

- Check no manual ad units were introduced.
- Check source exclusions protect tools and the Guide Library index.
- Confirm production Auto ads placement, mobile overflow, and CLS remain explicit account/browser gates rather than local completion claims.

**Deployment reviewer:**

- Check candidate completeness before switch.
- Check redirect include installation precedes `nginx -t`.
- Check `nginx -t` precedes `ln -sfn` in deploy and rollback.
- Check releases are immutable and retained.
- Check rollback requires an explicit verified release ID and has no mtime fallback.
- Check no script silently claims production smoke success.

Resolve every blocking finding, rerun focused checks, and have the relevant reviewer verify the correction.

- [ ] **Step 8: Commit smoke checks and deployment documentation**

Run:

```bash
git add deploy/smoke-test.sh deploy/README.md tests/deploy.test.js
git commit -m "test: add production smoke checks"
```

---

### Task 8: Run final verification and record Phase 0 local evidence

**Agent:** Main coordinator.  
**Verifier:** Fresh independent verifier who did not implement Tasks 1–7.

**Files:**
- Review: every changed source, test, deploy, and policy file
- Modify only with verified facts: `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md`
- Modify only with verified facts: `docs/TASK_LOG.md`
- Modify only with verified facts: `docs/OPERATIONS_STATUS.md`

- [ ] **Step 1: Audit the final diff and scope**

Run:

```bash
git status --short --branch
git diff --check
git diff --stat main...HEAD
git diff main...HEAD -- src/ deploy/ tests/ public/ docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md docs/TASK_LOG.md docs/OPERATIONS_STATUS.md
```

Expected:

- `graphify-out/` remains untracked and unstaged.
- No guide Markdown, guide frontmatter, global CSS, route-tools data, package dependency, legacy HTML, or `public/_redirects` change appears.
- No unrelated formatting or cleanup appears.

- [ ] **Step 2: Scan changed files for incomplete work**

Run:

```bash
changed_files="$(git diff --name-only main...HEAD -- src deploy tests public/ docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md docs/TASK_LOG.md docs/OPERATIONS_STATUS.md)"
found_blocker=0
while IFS= read -r file; do
  [ -n "$file" ] || continue
  if grep -nE 'TODO:|TBD:|PLACEHOLDER:|test\.skip|test\.only|describe\.skip|describe\.only' "$file"; then
    found_blocker=1
  fi
done <<EOF
$changed_files
EOF
[ "$found_blocker" -eq 0 ]

if git diff --name-only main...HEAD | grep -Ei '\.(har|png|jpe?g|webp)$'; then
  echo 'Raw browser evidence or screenshots must not be committed in this implementation window.'
  exit 1
fi
```

Expected: exit code 0 with no real placeholder, skipped-test, focused-test blocker, raw HAR, or screenshot artifact in implementation changes.

- [ ] **Step 3: Run every local verification gate**

Run:

```bash
bash -n deploy/deploy.sh deploy/rollback.sh deploy/smoke-test.sh deploy/server-init.sh
node tests/deploy.test.js
node tests/route-tools.test.js
npm test
npm run launch-check
git diff --check
```

Expected: all commands pass.

- [ ] **Step 4: Verify generated output locally**

Start preview:

```bash
npm run preview -- --host 127.0.0.1 --port 4322
```

In a separate terminal, run:

```bash
curl -fsS http://127.0.0.1:4322/ | grep -F 'rel="canonical" href="https://visalang.org/"'
curl -fsS http://127.0.0.1:4322/ | grep -F 'pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018617123550799'
! curl -fsS http://127.0.0.1:4322/tools/route-finder/ | grep -F 'pagead2.googlesyndication.com'
! curl -fsS http://127.0.0.1:4322/guides/ | grep -F 'pagead2.googlesyndication.com'
curl -fsS http://127.0.0.1:4322/privacy-policy/ | grep -F 'VisaLang uses Google AdSense on ad-eligible content pages'
curl -fsS http://127.0.0.1:4322/cookie-policy/ | grep -F 'Google AdSense and Google Privacy & messaging'
curl -fsS http://127.0.0.1:4322/ads.txt | grep -Fx 'google.com, pub-3018617123550799, DIRECT, f08c47fec0942fa0'
```

Expected: canonical, active policy text, content-page loader, tool/index exclusions, and ads.txt are present. Astro preview does not prove Google account configuration, CMP choices, Auto ads placement, browser network behavior, or Nginx response headers.

- [ ] **Step 5: Run the independent final verifier**

The verifier must check the controlling design and this plan against the final diff and report:

- whether every reconciled Phase 0 criterion has local evidence;
- whether AdSense/ads.txt are restored only on eligible routes and old no-ad assertions are absent;
- whether static/Nginx CSP removal and retained security headers match the approved trade-off;
- whether the other four production-trust corrections are present;
- whether any implementation or documentation claims account, browser, or live production evidence that was not actually collected;
- whether tests and launch checks actually passed;
- whether any blocker remains.

Do not mark this task complete until the verifier has no blocking finding.

- [ ] **Step 6: Reconcile the consent decision record and add a verified Task Log entry**

Preserve the historical audit in `docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md`, but update its top status to:

```markdown
Status: **SOURCE APPROVED — AdSense restoration is implemented locally; account, browser-network, placement, and production verification remain pending.**
```

Add a dated section explaining:

```markdown
## Approved source target — 2026-07-17

- The business confirmed that Google Privacy & messaging European regulations message is published and tested and that Auto ads is enabled.
- Source restores publisher `ca-pub-3018617123550799` only on ad-eligible content pages.
- All `/tools/` routes and the searchable `/guides/` index disable the AdSense runtime; account-side Auto ads exclusions remain production evidence requirements.
- `public/ads.txt` restores Google direct seller `pub-3018617123550799`.
- The incompatible static CSP is removed; the remaining security headers stay enabled.
- This local source state does not prove current account screenshots/exports, browser consent paths, Auto ads placement, CLS, production headers, or live advertising behavior.
- Raw HAR, screenshots, cookies, advertising identifiers, and consent strings must remain outside Git and public documentation.
```

Then add a new top entry to `docs/TASK_LOG.md` dated `2026-07-17` with this factual structure, using only results actually observed in Steps 1–5:

```markdown
## Production trust stabilization local implementation — 2026-07-17

Scope: implement the approved Phase 0 source, tool, and deployment-safety changes locally. No production server, DNS, TLS, Nginx reload, public smoke test, or rollback was executed.

Completed:

- Restored the approved AdSense publisher loader and `public/ads.txt` on ad-eligible content pages.
- Added the `enableAds` route contract; all tool routes and the searchable Guide Library index remain advertising-free in source and generated HTML.
- Updated Privacy and Cookie pages to describe Google AdSense, Google Privacy & messaging, advertising storage, and the separate URL/local-storage behavior.
- Removed the incompatible static CSP from static-host and Nginx configuration while retaining HSTS, `nosniff`, frame, referrer, and permissions headers.
- Clarified English, Chinese, and Guide Library maturity labels without changing stored content status or guide frontmatter.
- Reduced Route Finder URL persistence to country, purpose, level, and certificate; unsupported-route handoffs remain neutral.
- Added the `visalang.org` Nginx host/redirect contract, executable legacy redirects, immutable release deployment, explicit release-ID rollback, and prepared production source smoke checks.

Verification:

- Bash syntax checks passed for all deployment scripts.
- Deployment regression tests passed.
- `npm test` passed.
- `npm run launch-check` passed.
- `git diff --check` passed.
- Independent code, security/privacy, deployment, and final verification found no remaining blocker.

Production boundary:

- Google account configuration is user-confirmed but current screenshots/exports, Auto ads page exclusions, Policy Center status, CMP paths, and ads.txt account status were not independently collected in this local source window.
- DNS, TLS, installed Nginx configuration, live response headers, live redirects, CMP/browser network behavior, Auto ads placement, CLS, production smoke checks, and production rollback remain unverified.
- Raw HAR files, screenshots, cookies, advertising identifiers, and consent strings are not stored in Git or public documentation.
- A separate authorised account/browser/production-verification window is required before any deployment or compliance claim.
```

If any stated verification did not pass, do not add that bullet and do not mark Phase 0 locally complete.

- [ ] **Step 7: Update the current summary in `docs/OPERATIONS_STATUS.md`**

Update the top date/window and decision summary so it states:

- local reconciled Phase 0 implementation and verification status;
- AdSense is restored only on ad-eligible source routes, while tools and the searchable Guide Library index are excluded;
- Google Privacy & messaging and Auto ads are user-confirmed account inputs, not independently verified production evidence;
- the incompatible static CSP is removed and the retained security-header set is documented;
- `visalang.org` is the intended deployment contract;
- historical no-ad and `flowlight.me` records remain dated historical evidence only;
- current account screenshots/exports, Auto ads page exclusions, DNS/TLS/Nginx/live redirect/CMP/browser/CLS/live smoke/rollback status are not established by this local window;
- no analytics, form, payment, email-delivery, or other service integration is authorised.

Do not rewrite historical release sections or present old `flowlight.me` evidence as current `visalang.org` production proof.

- [ ] **Step 8: Commit evidence documentation only after verification**

If Steps 1–7 pass and the documentation changed, run:

```bash
git add docs/CONSENT_AND_AD_TECH_DECISION_RECORD.md docs/TASK_LOG.md docs/OPERATIONS_STATUS.md
git commit -m "docs: record reconciled phase zero evidence"
```

If verification is incomplete, leave the task open and record the blocker instead of committing a completion claim.

---

## Local Phase 0 definition of done

- `npm test` passes.
- `npm run launch-check` passes.
- Bash syntax checks pass for all deployment scripts.
- `BaseLayout.astro` exposes `enableAds` and contains exactly one approved AdSense publisher loader.
- Tool routes and the searchable Guide Library index contain no AdSense loader in source or generated HTML.
- Privacy and Cookie pages describe Google AdSense, Google Privacy & messaging, advertising storage, user choices, and route exclusions without claiming independent legal approval.
- `public/ads.txt` contains the approved Google direct-seller line.
- Static-host and Nginx configuration contain no enforcing CSP, while HSTS, `nosniff`, frame, referrer, and permissions headers remain.
- English, Chinese, and Guide Library maturity labels describe editorial structure, not official-source assurance.
- Route Finder URL persistence excludes `location` and `targetDate`.
- Unsupported-route support defaults to the Guide Library, not a Germany route.
- Deployment tests enforce the `visalang.org` apex/`www` contract and prohibit `$host` redirects.
- Nginx serves `/var/www/visalang.org/current` and includes executable legacy redirects in the checked template.
- Deployment creates immutable commit-addressed releases and validates candidate output plus Nginx before switching `current`.
- Rollback requires a validated explicit release ID and contains no mtime fallback.
- Production source smoke checks exist but have not been run unless separately authorised.
- Account-side CMP paths, Auto ads page exclusions, browser network behavior, placement, and CLS remain explicit production gates.
- Raw HAR/screenshots, cookies, advertising identifiers, and consent strings are excluded from Git and public docs.
- Independent code, security/privacy, SEO/performance, deployment, and final reviews have no blocking findings.
- Documentation clearly separates local implementation evidence from unverified production state.

## Next authorised planning handoff

After this plan is implemented and locally verified, the next plan may cover an authorised AdSense account/browser/production-verification window. It must verify current Google Privacy & messaging configuration, the actual non-consent and withdrawal paths, Auto ads page exclusions for `/tools/*` and `/guides/`, Policy Center and ads.txt status, clean-profile network behavior, synthetic-data evidence handling, placement/CLS, DNS, TLS, installed Nginx headers, redirects, smoke checks, and rollback readiness. It must identify the release operator, rollback authoriser, target release, verified rollback release ID, restricted evidence location, success criteria, and stop conditions.
