# VisaLang on Vercel

Production URL: `https://visalang.org`.

`www.visalang.org` redirects to that apex. Do not change `site` in `astro.config.mjs` to a `*.vercel.app` hostname. Preview deployments may use a Vercel hostname; canonical links, hreflang, robots, and the sitemap stay on `https://visalang.org`.

This file is the hosting path. `deploy/deploy.sh` and the other files in `deploy/` are the historical Nginx origin. They are not how this site is published.

Advertising stays fail-closed. `advertisingRuntimeEnabled` in `src/data/site.ts` remains `false`. Do not submit an AdSense application, do not turn the runtime on, and do not add an advertising environment variable as part of this cutover.

No Vercel token, Cloudflare token, or SSH key belongs in the repository.

## What Vercel runs

The Astro preset's default build command is `astro build`. That skips `postbuild`, which writes guide `lastmod` values into `dist/sitemap-0.xml`. `vercel.json` therefore sets:

| Setting | Value |
| --- | --- |
| Framework | Astro (`framework: astro`) |
| Install | `npm ci` |
| Build | `npm run build` |
| Output | `dist` |
| Node.js | `22.x` (`package.json` `engines.node`) |
| Trailing slash | on (`trailingSlash: true`) |
| Clean URLs | off |

`npm run build` cleans the Astro cache, runs `astro build`, then `node scripts/enrich-sitemap-lastmod.js`.

Node must be 22.12 or newer. Vercel only selects a major line from `engines.node`. The value is `22.x`, not `>=22.12.0`. On Vercel a range that starts at 22 and has no upper bound selects the newest major, which is not 22. In the project dashboard, set Node.js Version to 22.x as well. The dashboard value does not override a valid `engines.node`.

The site is static. Do not install `@astrojs/vercel` unless a later change needs on-demand rendering. That adapter is not required for `dist/` and is not part of this setup.

`trailingSlash: true` sends a path without a slash, such as `/about`, to `/about/` with status 308. Paths that already have a file extension are left to the explicit 301 rules. `cleanUrls` stays false so Vercel does not strip `.html` on its own.

## Redirects and headers

Vercel does not apply `public/_redirects` or `public/_headers`. Those files stay in the repo because the launch check reads `dist/_redirects`, and the historical Nginx snippet remains in `deploy/legacy-redirects.conf`.

`vercel.json` is the Vercel copy:

- Each 301 in `public/_redirects` is a `statusCode: 301` redirect. `permanent: true` would send 308, so it is not used.
- `www.visalang.org` is a host 301 to `https://visalang.org` with the same path. It is the first redirect, matching the old Nginx host canonicalisation.
- The Netlify-style `/* /404.html 404` line is not copied as a redirect. A catch-all redirect would shadow real pages. Astro writes `dist/404.html` from `src/pages/404.astro`, and Vercel uses that file for unknown paths.
- Security headers match `public/_headers`: `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, a closed camera/microphone/geolocation policy, and HSTS for one year including subdomains.
- `/_astro/*` stays immutable for one year. `.html`, the sitemap files, and `robots.txt` keep the same cache lifetimes as `_headers`. `/sitemap-0.xml` uses the sitemap lifetime as well, because that is the generated sitemap body.

There is still no `Content-Security-Policy` header. Do not add one in this cutover.

## Connect the GitHub repository

1. In Vercel, import `https://github.com/fan0269-code/VisaLang.git`.
2. Framework preset: Astro. Root directory: the repository root.
3. Production branch: `main`. Leave the production domain as `visalang.org` after the domain step below. A `*.vercel.app` name is only the project preview until the custom domain is attached.
4. Confirm the overrides from `vercel.json`: install `npm ci`, build `npm run build`, output `dist`, Node.js 22.x.
5. Do not add environment variables for this static build. Do not paste a token into the repo.
6. Deploy a preview from the pull request or from `main` before changing public DNS. The preview hostname is for build verification. It is not the canonical site URL.

There is no GitHub Actions workflow in this repository. Nothing in `.github/` needs to be disabled. Do not add an Actions workflow that SSHs to the old origin.

## Custom domains

1. Add `visalang.org`.
2. Add `www.visalang.org`.
3. Set `visalang.org` as the primary domain so `www` redirects to the apex. Do not make `www` primary. Canonical, sitemap, and hreflang already use the apex. Vercel's general advice prefers `www` as primary because a CNAME can move without an IP change; this project keeps the apex because that is the published URL.
4. The `vercel.json` host rule is a second 301 from `www.visalang.org` to `https://visalang.org`. Do not also configure the dashboard to redirect the apex to `www`. Those two rules would loop.

## DNS cutover

Do this only after a Vercel deployment of `main` is ready and the Domains page shows the records for this project.

Copy the records from the project Domains page. Do not reuse an address from another Vercel project or from an old guide if the page shows a different value. Vercel documents `76.76.21.21` as a common apex A record and a `*.vercel-dns-*.com` name as a common `www` CNAME. The Domains page is the source for this project. Newer projects can show a different A record, such as `216.198.79.1`.

At the current DNS host:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | The apex A record shown for `visalang.org` |
| CNAME | `www` | The CNAME target shown for `www.visalang.org`, including a trailing dot if the dashboard shows one |

Then:

1. Remove every other A and AAAA record on the apex and on `www` that points at the old Nginx machine. Leaving the dead origin in place is the Cloudflare HTTP 521 condition: Cloudflare cannot reach that origin.
2. Do not change MX, mail TXT, or other mail records. This cutover is for the website only.
3. If DNS stays at Cloudflare, set the new A and CNAME to DNS only (grey cloud). The orange-cloud proxy in front of the dead origin is what returns 521. Proxying Vercel with SSL mode Flexible is a separate redirect-loop failure. If the proxy stays on, the origin must be the Vercel target from the Domains page and the SSL mode must be Full (strict). DNS-only is the setup that matches "point apex and www at Vercel and remove the dead origin."
4. Remove Cloudflare origin rules, load-balancer pools, and authenticated-origin-pull requirements that still name the old server, if any of those exist. This repository does not record the Cloudflare account layout, so check the dashboard rather than assuming a named rule.
5. If certificate issuance fails, inspect CAA records. Allow the certificate authority shown by Vercel, commonly Let's Encrypt, without deleting unrelated CAA entries blindly.
6. After propagation, check from outside the old server:

```bash
dig A visalang.org +short
dig CNAME www.visalang.org +short
curl -sI https://visalang.org/
curl -sI https://www.visalang.org/
```

The apex response should be HTTPS 200 from Vercel, not Cloudflare 521. `www` should be a 301 to `https://visalang.org/`. Then run the read-only smoke check:

```bash
BASE_URL=https://visalang.org WWW_URL=https://www.visalang.org bash deploy/smoke-test.sh
```

`deploy/smoke-test.sh` does not SSH and does not reload Nginx. A passing smoke check is evidence for that command only. It does not approve advertising, a CMP, or an individual visa outcome.

## What to turn off on the old origin

After the public DNS answers from Vercel and the smoke check has been run:

1. Do not run `bash deploy/deploy.sh`, `deploy/rollback.sh`, `deploy/server-init.sh`, or `deploy/harden.sh`. Each of those scripts exits immediately unless `VISALANG_LEGACY_NGINX_DEPLOY=authorized` is set. That override is an emergency switch for the old machine, not the Vercel path.
2. Stop Nginx, or disable the `visalang.org` site, so the machine is no longer an origin. Do not delete the release directories until the operator has a copy of any evidence they still need. The scripts in git stay.
3. Remove the old origin address from Cloudflare. A proxied record aimed at a stopped Nginx process returns 521 again.
4. Revoke or stop using the SSH deploy path for routine releases. Future releases are Vercel deployments of `main`.

Rollback of the DNS cutover is to restore the previous DNS records only if the old origin is actually up. A stopped origin cannot serve a rollback. Vercel deployment rollback is the Vercel dashboard instant rollback to an earlier deployment, which is separate from `deploy/rollback.sh`.
