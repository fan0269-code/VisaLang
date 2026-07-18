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
