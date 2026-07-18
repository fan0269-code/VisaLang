# VisaLang Production Trust Stabilization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish one verifiable production identity, pause unverified advertising behavior, remove misleading trust signals, minimize tool URL data, and make Nginx deployment test-gated, atomic, redirect-safe, and reversible.

**Architecture:** Keep the existing Astro SSG, Markdown content collections, and BaseLayout/GuideLayout/ToolLayout hierarchy. Make surgical changes around production integrations and trust boundaries: disable AdSense until a separate CMP plan is approved, clarify that content maturity is not source assurance, make Route Finder fallback generic, and move Nginx deployment to versioned releases behind a `current` symlink. Do not add a CMS, database, login system, analytics vendor, payment flow, or new content routes in this phase.

**Tech Stack:** Astro 7, TypeScript, Node `assert`, Bash, Nginx, static HTML output.

**Approved assumptions for this plan:**

- `https://visalang.org` is the only production canonical domain.
- Google AdSense remains paused until a separate consent/CMP implementation is approved and verified.
- Production remains on Nginx static hosting.
- No third-party analytics, forms, email service, payment system, or user account system is introduced.
- Existing content frontmatter values remain unchanged in this phase; only their public labels are clarified.

---

## File map

### Files modified

- `src/layouts/BaseLayout.astro` — remove unconditional AdSense loading.
- `src/pages/privacy-policy.astro` — describe the actual no-ad/no-CMP state.
- `src/pages/cookie-policy.astro` — describe only browser behavior that currently exists.
- `src/data/source-review.ts` — clarify public maturity labels without changing stored values.
- `src/components/GuideStatusBadge.astro` — clarify Chinese maturity labels.
- `src/components/tools/ToolResultSupport.astro` — remove route-mismatched default Germany links.
- `src/pages/tools/route-finder.astro` — persist only enumerated fields and add configured-route next actions.
- `deploy/deploy.sh` — use `visalang.org`, enforce a clean source tree, run test gates, publish versioned releases, and switch atomically.
- `deploy/nginx-vhost-template.conf` — serve the `current` symlink and include executable legacy redirect rules.
- `deploy/README.md` — document the real domain, deploy flow, verification, and rollback.
- `tests/site.test.js` — update ad-state, trust-label, and tool-persistence assertions; load the deploy regression test.
- `tests/route-tools.test.js` — preserve safe configured/fallback behavior.

### Files created

- `deploy/legacy-redirects.conf` — Nginx equivalents of the critical `public/_redirects` rules.
- `deploy/rollback.sh` — switch `current` to the previous successful release.
- `deploy/smoke-test.sh` — black-box production checks for 200 responses, redirects, canonical, robots, and sitemap.
- `tests/deploy.test.js` — regression assertions for domain consistency, atomic releases, redirects, gates, rollback, and smoke checks.

### Files deleted

- `public/ads.txt` — remove the active publisher declaration while AdSense is intentionally paused.

### Explicitly unchanged

- `src/content/guides/*.md`
- `src/content.config.ts`
- `src/data/route-tools.ts`
- `src/styles/global.css`
- legacy root HTML files
- `public/_redirects`

---

### Task 1: Freeze advertising and align public policy with actual behavior

**Files:**
- Modify: `src/layouts/BaseLayout.astro:60-62`
- Modify: `src/pages/privacy-policy.astro:17-45`
- Modify: `src/pages/cookie-policy.astro:13-34`
- Delete: `public/ads.txt`
- Modify: `tests/site.test.js:65-76`

- [ ] **Step 1: Write failing assertions for the no-ad baseline**

Replace the current AdSense assertions in `tests/site.test.js` with:

```js
assert.ok(!src.base.includes('pagead2.googlesyndication.com'), 'shared layout does not load AdSense before CMP approval');
assert.ok(src.privacy.includes('does not currently load Google AdSense'), 'privacy policy states that advertising is paused');
assert.ok(src.privacy.includes('No advertising consent mechanism is currently active'), 'privacy policy does not claim an unverified consent flow');
assert.ok(src.cookies.includes('does not currently set advertising cookies'), 'cookie policy states the current no-ad cookie behavior');
assert.ok(!exists('public/ads.txt'), 'ads.txt is absent while the publisher integration is paused');
assert.ok(!src.base.includes('static.cloudflareinsights.com'), 'shared layout does not load Cloudflare Web Analytics');
```

Keep the existing URL-backed tool and route-progress assertions immediately after these lines.

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
node tests/site.test.js
```

Expected: FAIL because `BaseLayout.astro` still loads AdSense, policy copy says AdSense is active, and `public/ads.txt` exists.

- [ ] **Step 3: Remove the unconditional AdSense loader**

Delete this line from `src/layouts/BaseLayout.astro`:

```astro
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3018617123550799" crossorigin="anonymous"></script>
```

Do not add a feature flag, placeholder script, consent stub, or alternative advertising provider in this phase.

- [ ] **Step 4: Replace the privacy policy advertising claims**

Replace the advertising item in `src/pages/privacy-policy.astro` with:

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

- [ ] **Step 5: Replace the cookie policy advertising claims**

Replace the advertising list item in `src/pages/cookie-policy.astro` with:

```astro
<li><strong>Advertising:</strong> VisaLang does not currently set advertising cookies or load an advertising network. No advertising consent mechanism is currently active.</li>
```

Replace the `Managing cookies` paragraph with:

```astro
<p>Use “Restart this tool” to remove that tool’s URL values. You can also clear or block local storage in your browser settings; doing so may remove saved route-step progress. No advertising preference control is shown while advertising remains disabled.</p>
```

- [ ] **Step 6: Delete the active publisher declaration**

Delete `public/ads.txt`. Do not replace it with an empty file. A future CMP/AdSense plan can restore a verified publisher declaration together with the actual integration.

- [ ] **Step 7: Run tests**

```bash
npm test
```

Expected: PASS, including the new no-ad assertions.

- [ ] **Step 8: Commit**

```bash
git add src/layouts/BaseLayout.astro src/pages/privacy-policy.astro src/pages/cookie-policy.astro tests/site.test.js
git add -u public/ads.txt
git commit -m "fix: pause unverified advertising integration"
```

---

### Task 2: Clarify route maturity without changing content data

**Files:**
- Modify: `src/data/source-review.ts:16-21`
- Modify: `src/components/GuideStatusBadge.astro:7-9`
- Modify: `tests/site.test.js:162-170`

- [ ] **Step 1: Add failing assertions for conservative labels**

Add to `tests/site.test.js` after the existing content-status checks:

```js
const sourceReviewDomain = read('src/data/source-review.ts');
assert.ok(sourceReviewDomain.includes("'complete-route': 'Route structure complete'"), 'complete-route label does not imply completed official-source review');
assert.ok(sourceReviewDomain.includes("'core-route': 'Core route structure'"), 'core-route label describes editorial coverage rather than official acceptance');
assert.ok(src.guide.includes('Official verification pending.'), 'source assurance remains visibly separate from editorial maturity');
assert.ok(src.zhGuide.includes('官方来源事实表待完成'), 'Chinese guides keep source assurance separate from route maturity');
const guideStatusBadge = read('src/components/GuideStatusBadge.astro');
assert.ok(guideStatusBadge.includes("'complete-route': '路线结构完整'"), 'Chinese complete-route label describes route structure');
assert.ok(guideStatusBadge.includes("'core-route': '核心路线结构'"), 'Chinese core-route label describes editorial structure');
```

- [ ] **Step 2: Run the focused test and verify it fails**

```bash
node tests/site.test.js
```

Expected: FAIL because public labels still say `Complete route`, `Core route`, `完整路线`, and `核心路线`.

- [ ] **Step 3: Change English public labels only**

Update `contentStatusLabels` in `src/data/source-review.ts`:

```ts
export const contentStatusLabels: Record<ContentStatus, string> = {
  'complete-route': 'Route structure complete',
  'core-route': 'Core route structure',
  'starter-overview': 'Starter overview',
  'verification-pending': 'Verification pending',
};
```

Do not rename enum values or modify guide frontmatter in this phase.

- [ ] **Step 4: Change Chinese public labels only**

Update `src/components/GuideStatusBadge.astro`:

```ts
const labels = locale === 'zh-CN'
  ? { 'complete-route': '路线结构完整', 'core-route': '核心路线结构', 'starter-overview': '入门概览', 'verification-pending': '待核验' }
  : contentStatusLabels;
```

- [ ] **Step 5: Run tests and build checks**

```bash
npm test
npm run launch-check
```

Expected: PASS. Generated guide pages should continue to show a separate source-review badge.

- [ ] **Step 6: Commit**

```bash
git add src/data/source-review.ts src/components/GuideStatusBadge.astro tests/site.test.js
git commit -m "fix: separate route maturity from source assurance"
```

---

### Task 3: Minimize Route Finder URL state and remove route-mismatched fallback links

**Files:**
- Modify: `src/components/tools/ToolResultSupport.astro:13-34`
- Modify: `src/pages/tools/route-finder.astro:44-77`
- Modify: `tests/site.test.js:116-138`

- [ ] **Step 1: Add failing source-contract assertions**

Add to `tests/site.test.js` after `toolFormController` assertions:

```js
const routeFinder = read('src/pages/tools/route-finder.astro');
const toolResultSupport = read('src/components/tools/ToolResultSupport.astro');
assert.ok(routeFinder.includes("persistedNames: ['country', 'purpose', 'level', 'certificate']"), 'Route Finder persists only enumerated non-free-text fields');
assert.ok(!routeFinder.includes("persistedNames: ['country', 'purpose', 'location'"), 'Route Finder does not persist free-text application location');
assert.ok(toolResultSupport.includes("guideHref = '/guides/'"), 'shared fallback support defaults to the generic Guide Library');
assert.ok(toolResultSupport.includes("guideLabel = 'Browse route guides'"), 'shared fallback support uses a route-neutral label');
assert.ok(!toolResultSupport.includes('Germany B1 settlement and citizenship route'), 'shared fallback support does not push an unrelated Germany route');
assert.ok(routeFinder.includes('route.guide?.href'), 'configured Route Finder results expose their matching guide');
assert.ok(routeFinder.includes("href = '/tools/checklist-generator/'"), 'configured Route Finder results hand off to Checklist');
assert.ok(routeFinder.includes("href = '/tools/timeline-calculator/'"), 'configured Route Finder results hand off to Timeline');
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
node tests/site.test.js
```

Expected: FAIL because Route Finder persists location/date, shared support defaults to Germany A1/B1, and configured results do not render guide/tool links.

- [ ] **Step 3: Make shared result support route-neutral**

Change defaults in `src/components/tools/ToolResultSupport.astro`:

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

- [ ] **Step 4: Persist only enumerated Route Finder fields**

Change the controller setup in `src/pages/tools/route-finder.astro`:

```ts
const controller = form ? setupToolForm(form, { persistedNames: ['country', 'purpose', 'level', 'certificate'] }) : undefined;
```

Keep `location` and `targetDate` as form fields for the current UI, but do not write them to browser history or copied URLs.

- [ ] **Step 5: Add contextual next actions for the configured route**

Inside the configured branch, after `summary.append(list);`, add:

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

Do not add product, contact-intent, pricing, or Route Review links.

- [ ] **Step 6: Run tests**

```bash
npm test
npm run launch-check
```

Expected: PASS. Unsupported routes still return the safe fallback and do not generate a pseudo-checklist.

- [ ] **Step 7: Commit**

```bash
git add src/components/tools/ToolResultSupport.astro src/pages/tools/route-finder.astro tests/site.test.js
git commit -m "fix: make route finder handoff context safe"
```

---

### Task 4: Add executable Nginx legacy redirects and unify the production domain

**Files:**
- Create: `deploy/legacy-redirects.conf`
- Modify: `deploy/nginx-vhost-template.conf:1-63`
- Modify: `deploy/deploy.sh:1-22`
- Create: `tests/deploy.test.js`
- Modify: `tests/site.test.js:5-12`

- [ ] **Step 1: Create a failing deployment regression test**

Create `tests/deploy.test.js`:

```js
const assert = require('node:assert/strict');
const fs = require('node:fs');

const deploy = fs.readFileSync('deploy/deploy.sh', 'utf8');
const nginx = fs.readFileSync('deploy/nginx-vhost-template.conf', 'utf8');
const redirects = fs.readFileSync('deploy/legacy-redirects.conf', 'utf8');

assert.match(deploy, /DOMAIN="\$\{DOMAIN:-visalang\.org\}"/, 'deployment defaults to the canonical VisaLang domain');
assert.doesNotMatch(deploy, /flowlight\.me/, 'deployment no longer targets the legacy domain');
assert.match(nginx, /root \/var\/www\/\$DOMAIN\/current;/, 'Nginx serves the atomic current release symlink');
assert.match(nginx, /include \/etc\/nginx\/snippets\/visalang-legacy-redirects\.conf;/, 'Nginx loads executable legacy redirects');
for (const path of ['/index.html', '/germany-family-reunion-a1.html', '/do-i-need-german-a1.html', '/zh/index.html']) {
  assert.ok(redirects.includes(`location = ${path}`), `Nginx redirects critical legacy path: ${path}`);
}
assert.match(redirects, /\^\/guides\/\(\.\+\)\\\.html\$/, 'Nginx redirects legacy English guide HTML routes');
assert.match(redirects, /\^\/zh\/guides\/\(\.\+\)\\\.html\$/, 'Nginx redirects legacy Chinese guide HTML routes');

console.log('deployment configuration rules passed');
```

Add to `tests/site.test.js` after the current `require` lines:

```js
require('./deploy.test.js');
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
node tests/site.test.js
```

Expected: FAIL because `deploy/legacy-redirects.conf` does not exist.

- [ ] **Step 3: Create executable Nginx redirect rules**

Create `deploy/legacy-redirects.conf`:

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

Keep `public/_redirects`; it remains the Cloudflare Pages/Netlify adapter.

- [ ] **Step 4: Update the Nginx template**

Change the production root to:

```nginx
root /var/www/$DOMAIN/current;
```

Add inside the HTTPS server block before `location /`:

```nginx
include /etc/nginx/snippets/visalang-legacy-redirects.conf;
```

Keep the strict CSP while advertising remains disabled. Do not add Google domains.

- [ ] **Step 5: Make the deploy domain explicit and overridable**

Replace the top deployment variables with:

```bash
DOMAIN="${DOMAIN:-visalang.org}"
SITE_DIR="/var/www/$DOMAIN"
RELEASES_DIR="$SITE_DIR/releases"
CURRENT_LINK="$SITE_DIR/current"
SOURCE_DIR="$SITE_DIR/source"
REPO="https://github.com/fan0269-code/VisaLang.git"
REDIRECTS_TARGET="/etc/nginx/snippets/visalang-legacy-redirects.conf"
```

Remove all `flowlight.me` text from the script.

- [ ] **Step 6: Run the deployment regression test**

```bash
node tests/deploy.test.js
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add deploy/legacy-redirects.conf deploy/nginx-vhost-template.conf deploy/deploy.sh tests/deploy.test.js tests/site.test.js
git commit -m "fix: align nginx deployment with visalang.org"
```

---

### Task 5: Make deployment test-gated, atomic, and reversible

**Files:**
- Modify: `deploy/deploy.sh`
- Create: `deploy/rollback.sh`
- Modify: `tests/deploy.test.js`

- [ ] **Step 1: Extend failing deployment assertions**

Add to `tests/deploy.test.js`:

```js
assert.match(deploy, /npm --prefix "\$SOURCE_DIR" test/, 'deployment runs the complete Node regression suite');
assert.match(deploy, /npm --prefix "\$SOURCE_DIR" run launch-check/, 'deployment runs build and static release checks');
assert.match(deploy, /RELEASE_ID=/, 'deployment creates a commit-addressed release');
assert.match(deploy, /ln -sfn/, 'deployment switches the current release atomically');
assert.match(deploy, /visalang-legacy-redirects\.conf/, 'deployment publishes the Nginx redirect adapter');
assert.ok(fs.existsSync('deploy/rollback.sh'), 'deployment includes an explicit rollback command');
const rollback = fs.readFileSync('deploy/rollback.sh', 'utf8');
assert.match(rollback, /ln -sfn/, 'rollback switches the current symlink');
assert.match(rollback, /nginx -t/, 'rollback validates Nginx before reload');
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
node tests/deploy.test.js
```

Expected: FAIL because deployment is not release-based and rollback script does not exist.

- [ ] **Step 3: Replace the source-update and publish sections with a release-based flow**

Replace the existing clone/update block, including the current `stash`, `pull`, and `stash pop` commands, with:

```bash
if [ ! -d "$SOURCE_DIR/.git" ]; then
  echo "==> 首次部署：克隆仓库"
  $SUDO mkdir -p "$SITE_DIR"
  $SUDO git clone "$REPO" "$SOURCE_DIR"
else
  if [ -n "$($SUDO git -C "$SOURCE_DIR" status --porcelain)" ]; then
    echo "✗ Server source tree contains local changes. Refusing to deploy."
    exit 1
  fi
  echo "==> 更新源码：快进到 origin/main"
  $SUDO git -C "$SOURCE_DIR" pull --ff-only origin main
fi

RELEASE_ID="$($SUDO git -C "$SOURCE_DIR" rev-parse --short=12 HEAD)"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
```

This replacement is required: do not keep the old `stash --include-untracked`, unrestricted `pull`, or `stash pop` path.

Replace the build/publish section with:

```bash
echo "==> 安装依赖并执行发布门禁"
$SUDO npm --prefix "$SOURCE_DIR" ci
$SUDO npm --prefix "$SOURCE_DIR" test
$SUDO npm --prefix "$SOURCE_DIR" run launch-check

if [ ! -f "$SOURCE_DIR/dist/index.html" ]; then
  echo "✗ launch-check 没有留下有效 dist/index.html，停止发布"
  exit 1
fi

if [ -e "$RELEASE_DIR" ]; then
  echo "✗ Release already exists: $RELEASE_DIR"
  exit 1
fi

$SUDO mkdir -p "$RELEASE_DIR" "$RELEASES_DIR"
$SUDO cp -a "$SOURCE_DIR/dist/." "$RELEASE_DIR/"
$SUDO chown -R www-data:www-data "$RELEASE_DIR"
$SUDO chmod -R 755 "$RELEASE_DIR"
$SUDO install -m 0644 "$SOURCE_DIR/deploy/legacy-redirects.conf" "$REDIRECTS_TARGET"

$SUDO ln -sfn "$RELEASE_DIR" "$CURRENT_LINK.next"
$SUDO mv -Tf "$CURRENT_LINK.next" "$CURRENT_LINK"
$SUDO nginx -t
$SUDO systemctl reload nginx
```

Do not delete previous releases during the same deploy.

- [ ] **Step 4: Create an explicit rollback script**

Create `deploy/rollback.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-visalang.org}"
SITE_DIR="/var/www/$DOMAIN"
RELEASES_DIR="$SITE_DIR/releases"
CURRENT_LINK="$SITE_DIR/current"

if [ "${EUID:-$(id -u)}" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
  $SUDO -n true || { echo "✗ Run as root or configure passwordless sudo"; exit 1; }
fi

CURRENT_TARGET="$(readlink -f "$CURRENT_LINK" || true)"
PREVIOUS_RELEASE=""
while IFS= read -r candidate; do
  [ "$(readlink -f "$candidate")" = "$CURRENT_TARGET" ] && continue
  PREVIOUS_RELEASE="$candidate"
  break
done < <(find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | cut -d' ' -f2-)

if [ -z "$PREVIOUS_RELEASE" ]; then
  echo "✗ No previous release is available"
  exit 1
fi

$SUDO ln -sfn "$PREVIOUS_RELEASE" "$CURRENT_LINK.next"
$SUDO mv -Tf "$CURRENT_LINK.next" "$CURRENT_LINK"
$SUDO nginx -t
$SUDO systemctl reload nginx

echo "Rolled back to: $PREVIOUS_RELEASE"
```

- [ ] **Step 5: Make scripts executable**

```bash
chmod +x deploy/deploy.sh deploy/rollback.sh
```

- [ ] **Step 6: Run tests**

```bash
npm test
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add deploy/deploy.sh deploy/rollback.sh tests/deploy.test.js
git commit -m "feat: add atomic deployment and rollback"
```

---

### Task 6: Add black-box production smoke checks

**Files:**
- Create: `deploy/smoke-test.sh`
- Modify: `tests/deploy.test.js`
- Modify: `deploy/README.md`

- [ ] **Step 1: Add failing smoke-script assertions**

Add to `tests/deploy.test.js`:

```js
assert.ok(fs.existsSync('deploy/smoke-test.sh'), 'deployment includes production smoke checks');
const smoke = fs.readFileSync('deploy/smoke-test.sh', 'utf8');
for (const path of ['/', '/guides/', '/robots.txt', '/sitemap-index.xml']) {
  assert.ok(smoke.includes(path), `smoke test checks public path: ${path}`);
}
for (const path of ['/index.html', '/germany-family-reunion-a1.html']) {
  assert.ok(smoke.includes(path), `smoke test checks legacy redirect: ${path}`);
}
assert.ok(smoke.includes('rel="canonical"'), 'smoke test verifies the production canonical');
```

- [ ] **Step 2: Run the test and verify it fails**

```bash
node tests/deploy.test.js
```

Expected: FAIL because `deploy/smoke-test.sh` does not exist.

- [ ] **Step 3: Create production smoke checks**

Create `deploy/smoke-test.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-https://visalang.org}"
EXPECTED_HOST="${EXPECTED_HOST:-visalang.org}"

check_200() {
  local path="$1"
  local status
  status="$(curl -sS -o /dev/null -w '%{http_code}' "$BASE_URL$path")"
  [ "$status" = "200" ] || { echo "✗ Expected 200 for $path, got $status"; exit 1; }
  echo "✓ 200 $path"
}

check_redirect() {
  local path="$1"
  local expected="$2"
  local headers
  headers="$(curl -sS -I "$BASE_URL$path")"
  printf '%s' "$headers" | grep -Eq '^HTTP/[^ ]+ 301' || { echo "✗ Expected 301 for $path"; exit 1; }
  printf '%s' "$headers" | grep -Eiq "^location: (https://$EXPECTED_HOST)?$expected\r?$" || { echo "✗ Unexpected Location for $path"; exit 1; }
  echo "✓ 301 $path -> $expected"
}

for path in / /guides/ /robots.txt /sitemap-index.xml; do
  check_200 "$path"
done

check_redirect /index.html /
check_redirect /germany-family-reunion-a1.html /germany-family-reunion-a1/

homepage="$(curl -fsS "$BASE_URL/")"
printf '%s' "$homepage" | grep -Fq 'rel="canonical" href="https://visalang.org/"' || { echo "✗ Homepage canonical is not visalang.org"; exit 1; }
printf '%s' "$homepage" | grep -Fq 'pagead2.googlesyndication.com' && { echo "✗ AdSense loaded while advertising is paused"; exit 1; }

robots="$(curl -fsS "$BASE_URL/robots.txt")"
printf '%s' "$robots" | grep -Fq 'Sitemap: https://visalang.org/sitemap-index.xml' || { echo "✗ robots.txt sitemap does not use visalang.org"; exit 1; }

echo "Production smoke checks passed for $BASE_URL"
```

- [ ] **Step 4: Make the script executable**

```bash
chmod +x deploy/smoke-test.sh
```

- [ ] **Step 5: Document deploy and rollback commands**

Update `deploy/README.md` so the primary commands are:

```bash
DOMAIN=visalang.org bash deploy/deploy.sh
BASE_URL=https://visalang.org bash deploy/smoke-test.sh
DOMAIN=visalang.org bash deploy/rollback.sh
```

Document these gates:

```text
1. Server source tree must be clean.
2. npm test must pass.
3. npm run launch-check must pass.
4. Nginx configuration must pass nginx -t.
5. current switches only after a complete release exists.
6. smoke-test.sh must pass after reload.
7. Roll back immediately if smoke checks fail.
```

Do not describe `flowlight.me` as a current production domain.

- [ ] **Step 6: Run the complete local verification suite**

```bash
npm test
npm run launch-check
```

Expected: PASS.

Do not run `deploy/smoke-test.sh` against production until the user explicitly authorizes a production verification window.

- [ ] **Step 7: Commit**

```bash
git add deploy/smoke-test.sh deploy/README.md tests/deploy.test.js
git commit -m "test: add production smoke checks"
```

---

### Task 7: Final review and Phase 0 exit evidence

**Files:**
- Review: all files changed in Tasks 1–6
- Update only with verified facts: `docs/TASK_LOG.md`
- Update only with verified facts: `docs/OPERATIONS_STATUS.md`

- [ ] **Step 1: Scan the diff for placeholders and unrelated changes**

```bash
git diff --check
git diff --stat
git diff -- src/ deploy/ tests/ package.json public/
```

Expected:

- No placeholder markers, skipped tests, `.only`, or `.skip` added.
- No guide claims changed.
- No global CSS redesign.
- No analytics, forms, email, payment, or CMP implementation added.

- [ ] **Step 2: Run all verification commands**

```bash
npm test
npm run launch-check
```

Expected: PASS.

- [ ] **Step 3: Verify generated output locally**

Run:

```bash
npm run preview -- --host 127.0.0.1
```

In a separate terminal:

```bash
curl -fsS http://127.0.0.1:4321/ | grep -F 'rel="canonical" href="https://visalang.org/"'
! curl -fsS http://127.0.0.1:4321/ | grep -F 'pagead2.googlesyndication.com'
curl -fsS http://127.0.0.1:4321/privacy-policy/ | grep -F 'does not currently load Google AdSense'
curl -fsS http://127.0.0.1:4321/cookie-policy/ | grep -F 'does not currently set advertising cookies'
```

Expected: canonical present, AdSense absent, policies match actual behavior.

Astro preview does not execute Nginx redirects; redirect verification belongs to an explicitly authorized production window.

- [ ] **Step 4: Run separate review lanes**

Request:

- Code review for correctness and regression risk.
- Security/privacy review for CSP, policy accuracy, and URL data minimization.
- Deployment review for release/rollback safety.

The implementation agent must not serve as its own final approver.

- [ ] **Step 5: Record only verified evidence**

If Tasks 1–6 and local verification pass, add a dated `docs/TASK_LOG.md` entry recording:

```text
- Advertising script removed; no CMP or ad network is active in source.
- visalang.org is the deployment default.
- Nginx legacy redirects have an executable adapter.
- Deployment uses versioned releases and an atomic current symlink.
- npm test and npm run launch-check passed locally.
- Production smoke checks are available but have not been run unless a production window was explicitly authorized.
```

Do not mark DNS, TLS, Nginx response headers, CMP, Search Console, production smoke, or production rollback as verified unless actually exercised.

- [ ] **Step 6: Commit documentation only if it changed**

```bash
git add docs/TASK_LOG.md docs/OPERATIONS_STATUS.md
git commit -m "docs: record phase zero stabilization evidence"
```

Skip this commit if no documentation changes are required.

---

## Phase 0 definition of done

- `npm test` passes.
- `npm run launch-check` passes.
- `BaseLayout.astro` loads no advertising network.
- Privacy and Cookie pages describe the no-ad state.
- `public/ads.txt` is absent.
- Public route maturity labels no longer imply official-source assurance.
- Route Finder does not persist free-text location or date values.
- Shared fallback links are route-neutral.
- Deployment defaults to `visalang.org`.
- Nginx serves `/var/www/visalang.org/current`.
- Nginx loads executable legacy redirect rules.
- Deployments run test gates before switching `current`.
- A rollback script exists and is test-covered.
- A production smoke script exists.
- No claim is made that production checks passed unless they were actually run.

## Deferred to separate plans

1. Germany A1 source packages and claim matrices.
2. Germany B1 source review.
3. Route Finder two-step visual redesign.
4. Context transfer into prefilled Checklist/Timeline forms.
5. Playwright, axe-core, and Lighthouse CI.
6. Search Console/analytics integration.
7. UI design-system cleanup in `global.css`.
8. Newsletter, forms, payments, affiliate links, Route Review, or AI Correction.
9. CMP/AdSense re-enablement.
10. CMS adoption.

Write those plans only after Phase 0 is verified.