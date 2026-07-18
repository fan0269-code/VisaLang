# VisaLang Production Trust Stabilization Agent Execution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement and locally verify the approved Phase 0 production-trust stabilization with dependency-aware multi-agent execution, while leaving every production operation for a separately authorised window.

**Architecture:** Keep the existing Astro SSG, content collections, shared layouts, browser-only tools, Node `assert` tests, Bash deployment scripts, and Nginx static hosting. Execute trust-surface changes sequentially, then deployment-safety changes sequentially, with independent code, security/privacy, and deployment reviews at milestone gates. This reconciled plan supersedes the old Task 2 file list, Task 4 host-normalisation details, and Task 5 switch/rollback snippets in `docs/superpowers/plans/2026-07-17-production-trust-stabilization.md`.

**Tech Stack:** Astro 7, TypeScript, JavaScript Node `assert`, Bash, Nginx, static HTML, Markdown documentation.

---

## Approved execution boundary

- Work only on branch `fix/production-trust-stabilization` unless the user explicitly chooses another branch.
- Do not edit, delete, stage, or commit `graphify-out/`.
- Do not change guide facts, guide frontmatter, `src/content.config.ts`, `src/data/route-tools.ts`, `src/styles/global.css`, legacy root HTML, or `public/_redirects`.
- Do not add analytics, advertising, CMP, forms, email delivery, payments, accounts, CMS, Playwright, axe-core, Lighthouse CI, or new routes.
- Do not connect to a production server or run deployment, smoke, DNS, TLS, Nginx reload, or rollback commands against production.
- Treat `docs/superpowers/specs/2026-07-17-production-trust-stabilization-execution-orchestration-design.md` as the controlling specification when it differs from the older Phase 0 plan.

## Agent execution map

| Wave | Tasks | Implementation mode | Required independent review |
| --- | --- | --- | --- |
| 0 | Baseline | Main coordinator, read-only | None |
| 1 | Tasks 1–3 | Fresh TDD executor per task, sequential | TypeScript/Astro reviewer after Task 3 |
| 2 | Tasks 4–7 | Fresh deployment executor per task, sequential | Code, security/privacy, and deployment reviewers in parallel after Task 7 |
| 3 | Task 8 | Main coordinator + final verifier | Final verifier must not be an implementation author |

Do not dispatch two implementation agents that can modify `tests/site.test.js`, `deploy/deploy.sh`, or `tests/deploy.test.js` at the same time.

## File map

### Files modified

- `src/layouts/BaseLayout.astro` — remove unconditional AdSense loading.
- `src/pages/privacy-policy.astro` — describe the current no-ad/no-CMP state.
- `src/pages/cookie-policy.astro` — describe current URL/local-storage behavior and no advertising cookies.
- `src/data/source-review.ts` — relabel editorial maturity without changing stored enum values.
- `src/components/GuideStatusBadge.astro` — relabel Chinese editorial maturity.
- `src/pages/guides/index.astro` — use the same conservative public maturity labels in filters.
- `src/components/tools/ToolResultSupport.astro` — make default guide handoff route-neutral.
- `src/pages/tools/route-finder.astro` — persist only enumerated values and add configured-route next actions.
- `deploy/nginx-vhost-template.conf` — define apex/`www` normalisation, `current` root, and redirect include.
- `deploy/deploy.sh` — add clean-tree, test, candidate, Nginx, and atomic-release gates.
- `deploy/server-init.sh` — replace legacy production-domain instructions with `visalang.org`.
- `deploy/README.md` — document the source-only deployment, smoke, and explicit rollback contracts.
- `tests/site.test.js` — update trust/tool assertions and load deployment tests.
- `docs/TASK_LOG.md` — record verified local evidence only.
- `docs/OPERATIONS_STATUS.md` — separate local implementation evidence from unverified production state.

### Files created

- `deploy/legacy-redirects.conf` — Nginx equivalents of critical `public/_redirects` rules.
- `deploy/rollback.sh` — rollback to a required, validated, previously verified release ID.
- `deploy/smoke-test.sh` — black-box production checks, not run without authorisation.
- `tests/deploy.test.js` — deployment-domain, redirect, release, rollback, and smoke contracts.

### File deleted

- `public/ads.txt` — remove the active publisher declaration while advertising is paused.

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

- Task 2’s old file list that omitted `src/pages/guides/index.astro`.
- Task 4’s old Nginx host behaviour using `$host` or a combined apex/`www` HTTPS server.
- Task 5’s old sequence that switched `current` before `nginx -t`.
- Task 5’s old mtime-based rollback selection.

No commit is created for this read-only task.

---

### Task 1: Pause advertising and align public policy

**Agent:** Fresh TDD executor.
**Reviewer:** Defer final approval to the Wave 1 TypeScript/Astro reviewer.

**Files:**
- Modify: `tests/site.test.js:65-76`
- Modify: `src/layouts/BaseLayout.astro:60-62`
- Modify: `src/pages/privacy-policy.astro:4-45`
- Modify: `src/pages/cookie-policy.astro:3-34`
- Delete: `public/ads.txt`

- [ ] **Step 1: Replace the active-ad assertions with a failing no-ad contract**

Replace the assertions at `tests/site.test.js:70-76` with:

```js
assert.ok(!src.base.includes('pagead2.googlesyndication.com'), 'shared layout does not load AdSense before CMP approval');
assert.ok(!src.base.includes('static.cloudflareinsights.com'), 'shared layout does not load Cloudflare Web Analytics');
assert.ok(src.privacy.includes('does not currently load Google AdSense'), 'privacy policy states that advertising is paused');
assert.ok(src.privacy.includes('No advertising consent mechanism is currently active'), 'privacy policy does not claim an unverified consent flow');
assert.ok(src.cookies.includes('does not currently set advertising cookies'), 'cookie policy states the current no-ad cookie behavior');
assert.ok(!exists('public/ads.txt'), 'ads.txt is absent while the publisher integration is paused');
assert.ok(src.privacy.includes('places only the non-sensitive values needed to restore that result in the page URL'), 'privacy policy describes URL-backed tool restoration');
assert.ok(src.cookies.includes('Current tools do not store their form fields in local storage.'), 'cookie policy does not misstate tool fields as local-storage data');
assert.ok(src.cookies.includes('Route progress:') && src.cookies.includes('current route step in browser local storage'), 'cookie policy limits current local-storage behavior to route progress');
```

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```bash
node tests/site.test.js
```

Expected: FAIL because the shared layout still loads AdSense, the policies still describe an active advertising/consent state, and `public/ads.txt` still exists.

- [ ] **Step 3: Remove the shared AdSense loader**

Delete this line from `src/layouts/BaseLayout.astro`:

```astro
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018617123550799" crossorigin="anonymous"></script>
```

Do not add a feature flag, alternate provider, placeholder script, consent stub, or analytics script.

- [ ] **Step 4: Replace the Privacy Policy advertising statements**

Set:

```astro
const updated = '2026-07-17';
```

Use this exact advertising list item:

```astro
<li><strong>Advertising:</strong> VisaLang does not currently load Google AdSense or another advertising network. No advertising consent mechanism is currently active. Advertising will remain disabled until its consent, privacy, security-header, and regional requirements have been reviewed and tested.</li>
```

Replace the `Cookies and privacy choices` section body with:

```astro
<p>VisaLang does not currently load an advertising consent message because display advertising is paused. You can clear URL values with a tool’s restart control and remove route-step progress by clearing site data in your browser.</p>
```

Replace the `Advertising` section body with:

```astro
<p>Display advertising is currently disabled. VisaLang will update this policy before enabling an advertising network, consent platform, or related third-party storage.</p>
```

- [ ] **Step 5: Replace the Cookie Policy advertising statements**

Set:

```astro
const updated = '2026-07-17';
```

Change the `BaseLayout` description to:

```astro
<BaseLayout title="Cookie Policy" description="How VisaLang uses URL state and browser local storage." noindex={true}>
```

Replace the advertising list item with:

```astro
<li><strong>Advertising:</strong> VisaLang does not currently set advertising cookies or load an advertising network. No advertising consent mechanism is currently active.</li>
```

Replace the `Managing cookies` paragraph with:

```astro
<p>Use “Restart this tool” to remove that tool’s URL values. You can also clear or block local storage in your browser settings; doing so may remove saved route-step progress. No advertising preference control is shown while advertising remains disabled.</p>
```

Keep the existing URL-state, route-progress, guide-filter, no-social-tracking, and no-third-party-embed statements.

- [ ] **Step 6: Delete the publisher declaration**

Run:

```bash
rm public/ads.txt
```

Expected: the file is removed, not replaced by an empty file.

- [ ] **Step 7: Run the complete local test gate**

Run:

```bash
npm test
```

Expected: PASS, ending with the existing site test success output.

- [ ] **Step 8: Commit the no-ad baseline**

Run:

```bash
git add src/layouts/BaseLayout.astro src/pages/privacy-policy.astro src/pages/cookie-policy.astro tests/site.test.js
git add -u public/ads.txt
git commit -m "fix: pause unverified advertising integration"
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

- policy/source behavior matches the no-ad state;
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
    add_header Content-Security-Policy "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
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

Do not add Google, analytics, form, or other third-party CSP origins. Do not add a location-level `add_header` in the asset blocks, because it would suppress inheritance of the server-level security headers.

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
assert.ok(smoke.includes('pagead2.googlesyndication.com'), 'smoke test rejects paused AdSense runtime');
const deployReadme = read('deploy/README.md');
assert.doesNotMatch(deployReadme, /flowlight\.me/, 'deployment documentation no longer describes the legacy domain as current');
assert.ok(deployReadme.includes('rollback.sh <verified-release-id>'), 'deployment documentation requires an explicit verified rollback target');
assert.ok(deployReadme.includes('separately authorised production window'), 'deployment documentation preserves the production authorisation boundary');
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
if printf '%s' "$homepage" | grep -Fq 'pagead2.googlesyndication.com'; then
  echo "✗ AdSense loaded while advertising is paused"
  exit 1
fi

robots="$(curl -fsS "$BASE_URL/robots.txt")"
printf '%s' "$robots" | grep -Fq 'Sitemap: https://visalang.org/sitemap-index.xml' || { echo "✗ robots.txt sitemap does not use visalang.org"; exit 1; }

echo "Production smoke checks passed for $BASE_URL"
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
6. Success criteria and mandatory rollback triggers.

If no previously verified release ID exists, stop and establish a rollback baseline in the authorised production-verification plan before deploying.

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

Record raw results. Do not describe production verification as passed unless this command and the approved DNS/TLS/header checks were actually run.

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

Dispatch three reviewers concurrently; none may be an implementation author.

**Code reviewer:**

- Check JavaScript assertions, Astro changes, Bash syntax, and scope.
- Confirm tests fail for the intended missing behavior and pass after implementation.

**Security/privacy reviewer:**

- Check no advertising/analytics runtime remains.
- Check policy text matches source behavior.
- Check Route Finder URL persistence excludes location/date.
- Check Nginx redirects do not use `$host`.
- Check shell variables are quoted and rollback validates containment.

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
- Modify only with verified facts: `docs/TASK_LOG.md`
- Modify only with verified facts: `docs/OPERATIONS_STATUS.md`

- [ ] **Step 1: Audit the final diff and scope**

Run:

```bash
git status --short --branch
git diff --check
git diff --stat main...HEAD
git diff main...HEAD -- src/ deploy/ tests/ public/ads.txt docs/TASK_LOG.md docs/OPERATIONS_STATUS.md
```

Expected:

- `graphify-out/` remains untracked and unstaged.
- No guide Markdown, guide frontmatter, global CSS, route-tools data, package dependency, legacy HTML, or `public/_redirects` change appears.
- No unrelated formatting or cleanup appears.

- [ ] **Step 2: Scan changed files for incomplete work**

Run:

```bash
changed_files="$(git diff --name-only main...HEAD -- src deploy tests public/ads.txt docs/TASK_LOG.md docs/OPERATIONS_STATUS.md)"
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
```

Expected: exit code 0 with no real placeholder, skipped-test, or focused-test blocker in implementation files.

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
! curl -fsS http://127.0.0.1:4322/ | grep -F 'pagead2.googlesyndication.com'
curl -fsS http://127.0.0.1:4322/privacy-policy/ | grep -F 'does not currently load Google AdSense'
curl -fsS http://127.0.0.1:4322/cookie-policy/ | grep -F 'does not currently set advertising cookies'
```

Expected: canonical and policy text are present; AdSense is absent. Astro preview does not execute Nginx redirect behavior.

- [ ] **Step 5: Run the independent final verifier**

The verifier must check the controlling design and this plan against the final diff and report:

- whether every Phase 0 criterion has local evidence;
- whether the four reconciled corrections are present;
- whether any implementation or documentation claims live production evidence;
- whether tests and launch checks actually passed;
- whether any blocker remains.

Do not mark this task complete until the verifier has no blocking finding.

- [ ] **Step 6: Add a verified local entry to `docs/TASK_LOG.md`**

Add a new top entry dated `2026-07-17` with this factual structure, using only results actually observed in Steps 1–5:

```markdown
## Production trust stabilization local implementation — 2026-07-17

Scope: implement the approved Phase 0 source, tool, and deployment-safety changes locally. No production server, DNS, TLS, Nginx reload, public smoke test, or rollback was executed.

Completed:

- Removed the shared AdSense loader and `public/ads.txt`; no CMP or replacement advertising/analytics integration was added.
- Updated Privacy and Cookie pages to describe the current no-ad state and existing URL/local-storage behavior.
- Clarified English, Chinese, and Guide Library maturity labels without changing stored content status or guide frontmatter.
- Reduced Route Finder URL persistence to country, purpose, level, and certificate; unsupported-route handoffs remain neutral.
- Added the `visalang.org` Nginx host/redirect contract, executable legacy redirects, immutable release deployment, explicit release-ID rollback, and prepared production smoke checks.

Verification:

- Bash syntax checks passed for all deployment scripts.
- Deployment regression tests passed.
- `npm test` passed.
- `npm run launch-check` passed.
- `git diff --check` passed.
- Independent code, security/privacy, deployment, and final verification found no remaining blocker.

Production boundary:

- DNS, TLS, installed Nginx configuration, live response headers, live redirects, production smoke checks, and production rollback remain unverified.
- A separate authorised production-verification window is required before any deployment claim.
```

If any stated verification did not pass, do not add that bullet and do not mark Phase 0 locally complete.

- [ ] **Step 7: Update the current summary in `docs/OPERATIONS_STATUS.md`**

Update the top date/window and decision summary so it states:

- local Phase 0 implementation and local verification status;
- advertising remains disabled in source;
- `visalang.org` is the intended deployment contract;
- historical `flowlight.me` records remain historical evidence only;
- current DNS/TLS/Nginx/live redirect/live smoke/rollback status is not established by this local window;
- Phase 1 remains closed and no service integration is authorised.

Do not rewrite historical release sections or present old `flowlight.me` evidence as current `visalang.org` production proof.

- [ ] **Step 8: Commit evidence documentation only after verification**

If Steps 1–7 pass and the documentation changed, run:

```bash
git add docs/TASK_LOG.md docs/OPERATIONS_STATUS.md
git commit -m "docs: record phase zero local evidence"
```

If verification is incomplete, leave the task open and record the blocker instead of committing a completion claim.

---

## Local Phase 0 definition of done

- `npm test` passes.
- `npm run launch-check` passes.
- Bash syntax checks pass for all deployment scripts.
- `BaseLayout.astro` loads no advertising or analytics network.
- Privacy and Cookie pages describe the no-ad/no-CMP source state.
- `public/ads.txt` is absent.
- English, Chinese, and Guide Library maturity labels describe editorial structure, not official-source assurance.
- Route Finder URL persistence excludes `location` and `targetDate`.
- Unsupported-route support defaults to the Guide Library, not a Germany route.
- Deployment tests enforce the `visalang.org` apex/`www` contract and prohibit `$host` redirects.
- Nginx serves `/var/www/visalang.org/current` and includes executable legacy redirects in the checked template.
- Deployment creates immutable commit-addressed releases and validates candidate output plus Nginx before switching `current`.
- Rollback requires a validated explicit release ID and contains no mtime fallback.
- Production smoke checks exist but have not been run unless separately authorised.
- Independent code, security/privacy, deployment, and final reviews have no blocking findings.
- Documentation clearly separates local implementation evidence from unverified production state.

## Next authorised planning handoff

After this plan is implemented and locally verified, the next plan may cover an authorised production-verification window for DNS, TLS, installed Nginx configuration, response headers, redirects, smoke checks, and rollback readiness. It must not execute automatically and must identify the release operator, rollback authoriser, target release, verified rollback release ID, success criteria, and stop conditions.
