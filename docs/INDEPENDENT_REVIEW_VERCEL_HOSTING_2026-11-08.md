```yaml
agent: visalang-independent-auditor
reviewer_independent: true
baseline: cursor/vercel-hosting-cutover-0a50 at 57bd3eb, uncommitted working tree on main (not committed by this review)
scope:
  - vercel.json
  - deploy/VERCEL.md
  - tests/vercel-hosting.test.js
  - tests/site.test.js
  - package.json
  - .gitignore
  - README.md
  - AGENTS.md
  - CLAUDE.md
  - deploy/README.md
  - docs/TASK_LOG.md
  - deploy/deploy.sh
  - deploy/rollback.sh
  - deploy/server-init.sh
  - deploy/harden.sh
  - deploy/smoke-test.sh
  - public/_redirects
  - public/_headers
agent_review_status: pass
overall_verdict: PASS
findings: []
owner_authorization: granted for the PR scope only
deployment_status: not_started
```

Independent review of the uncommitted Vercel hosting cutover on `cursor/vercel-hosting-cutover-0a50` at `57bd3eb`. This reviewer did not implement the change. No P0, P1, or P2 remains. The working tree matches the submitted file list and does not include a DNS change, a Vercel project, or an edit to the old origin.

`astro.config.mjs` still sets `site: 'https://visalang.org'` and `trailingSlash: 'always'`. It has no `output` override and no `@astrojs/vercel` import. `package.json` and `package-lock.json` do not depend on that adapter. `vercel.json` sets `framework` to `astro`, `installCommand` to `npm ci`, `buildCommand` to `npm run build`, `outputDirectory` to `dist`, `cleanUrls` to `false`, and `trailingSlash` to `true`. `npm run build` still runs the Astro build plus `scripts/enrich-sitemap-lastmod.js`. `engines.node` is exactly `22.x`, not an open range such as `>=22.12.0`. Vercel’s Node selector treats `22.x` as the 22 line; an unbounded range can select a newer major.

All 18 `301` lines in `public/_redirects` are `statusCode: 301` rules in `vercel.json`. None set `permanent`. The `/* /404.html 404` line is not copied. The first redirect is the `www.visalang.org` host rule to `https://visalang.org/$1` with status 301, which keeps the path. Vercel’s built-in trailing-slash normalization is a separate 308 and is described in `deploy/VERCEL.md`; paths with a file extension stay on the explicit 301 rules. `cleanUrls: false` leaves those `.html` rules in charge.

The five security headers in `public/_headers` are present with the same values: `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, the closed camera/microphone/geolocation policy, and HSTS `max-age=31536000; includeSubDomains`. Cache-Control for `/_astro/*`, `.html`, `sitemap.xml`, `sitemap-index.xml`, and `robots.txt` matches `_headers`. `vercel.json` also sets the same one-hour cache on `/sitemap-0.xml`, which is the generated sitemap body and is stated in `deploy/VERCEL.md`. Neither file adds `Content-Security-Policy`.

`src/data/site.ts` is outside this diff. `advertisingRuntimeEnabled` remains `false`. The cutover text says not to submit AdSense, not to turn the runtime on, and not to add a token. No secret, Vercel token, or SSH key was added.

`deploy/deploy.sh`, `deploy/rollback.sh`, `deploy/server-init.sh`, and `deploy/harden.sh` are still in the tree. Without `VISALANG_LEGACY_NGINX_DEPLOY=authorized`, each prints the deprecation message and exits 1 before any server change. This review ran that unset path. The strings required by `tests/deploy.test.js` and `tests/content-integrity.test.js` are still present. `deploy/smoke-test.sh` only gained a comment. `.github` is absent, so no GitHub Actions SSH deploy was introduced.

`deploy/VERCEL.md` tells the operator to copy apex and `www` records from the Vercel Domains page, keep `visalang.org` as the primary domain, leave MX and other mail records unchanged, set Cloudflare to DNS-only and remove the dead origin, and not run the Nginx scripts. It names `76.76.21.21` and `216.198.79.1` only as examples Vercel documents, and it says the Domains page is the value to copy. It does not invent visa fees, dates, or search volumes.

This review re-ran `npm test` (passed, including vercel hosting rules and deployment configuration rules), `node tests/vercel-hosting.test.js`, `node tests/deploy.test.js`, `node tests/content-integrity.test.js`, and `git diff --check`. The submitter’s build and launch-check results were accepted as submitted evidence: static `dist/`, 101 pages, postbuild ran, launch-check 46 pass / 0 fail / READY. This review did not create a Vercel project, change DNS, or call the old origin.

Owner authorization for this pull request is separate from live DNS and Vercel account changes. Owner authorization and deployment evidence are separate from this Agent review. This `PASS` does not approve a commit, push, deployment, DNS cutover, Vercel project creation, advertising change, or any visa or exam outcome.
