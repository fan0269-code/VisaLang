# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

VisaLang is a **pre-launch static MVP** for a bilingual (English / 中文) language-exam navigation site. It points users to the right official language exam for visa, residency, citizenship, and work-registration paths. No framework, no backend, no database, no build step — plain HTML/CSS/JS served statically.

The first monetizable niche is **Germany A1 family-reunion**; that is why all 10 guide pages are Germany A1 focused.

## Commands

```bash
npm test                              # data integrity: exams (50), pageSeeds (200), tool logic, homepage markup
npm run launch-check                  # Definition of Ready: legal pages, guides, JSON-LD, sitemap, dead links
python3 -m http.server 4173           # local preview → http://127.0.0.1:4173/index.html
```

There is no lint, no build, no bundler.

## Deployment — live at https://flowlight.me

**Server**: Tencent Cloud CVM, Ubuntu 24.04, IP `43.162.126.37`, user `ubuntu`, SSH key auth.
**GitHub**: `https://github.com/fan0269-code/VisaLang` (public, `main` branch).

**Auto-update**: a system cron (`/etc/cron.d/visalang-update`) runs `/usr/local/bin/visalang-update.sh` every 15 min — `git pull origin main` + `systemctl reload nginx` if there are changes.

**Update workflow** (all the user needs):
```bash
git add -A && git commit -m "what changed" && git push
# Site updates within 15 min, no server access needed.
```

**Server access** (if needed):
```bash
ssh ubuntu@43.162.126.37
sudo systemctl reload nginx          # manual reload
tail /var/log/visalang-update.log    # view auto-update log
```

**Key paths on server**: site root `/var/www/flowlight.me/public/`, nginx config `/etc/nginx/sites-available/flowlight.me.conf`, SSL cert `/etc/letsencrypt/live/flowlight.me/` (auto-renew via certbot).

**Pending user actions**: replace Formspree `YOUR_FORM_ID` in `index.html` line ~232; add analytics snippet to `<head>`. Both are not blocking — site works without them.

## Architecture

**Data + render split.** Everything visible is driven by `app-data.js` and painted client-side by `app.js`. There is no server.

- `app-data.js` — **UMD module**: self-registers as `window.ExamSiteData` in the browser and as `module.exports` under Node (so tests can `require` it). Holds `brand`, `i18n` (en/zh), `exams` (50 seeds), `pageSeeds` (200 high-intent SEO page seeds), `pageSections` (the 15-section guide template), `sources`, `tools`, and the two pure planner functions `calculateExamBudget` and `recommendExamPath`.
- `app.js` — reads `window.ExamSiteData`, then renders stats, category tabs, the exam table, tool cards, sources, and i18n text into `index.html`. Owns the `state` object (`{ category, locale, search }`) and re-renders on tab/search/language-toggle events. The EN↔ZH toggle re-runs `renderAll()`; translatable elements are marked with `data-i18n` / `data-i18n-placeholder` attributes and resolved against `i18n[state.locale]`.
- `index.html` — page structure with i18n hooks; loads `app-data.js` then `app.js` (order matters).
- `styles.css` — responsive styles, shared by homepage and guide pages.
- `guides/*.html` — 10 hand-written static guide pages (Germany A1 batch), each linking back to `/index.html` and loading `../styles.css`.

## Invariants enforced by `tests/site.test.js`

The test file is the spec. Do not let it go red without intent:

- `exams.length === 50` and `pageSeeds.length === 200`. Every exam must have `name`, `officialSource`, and `lastUpdated`.
- `pageSections` must equal the exact 15-element array (Exam Overview → Eligibility → … → Last Updated). This is the canonical guide-page template referenced by `docs/CONTENT_WORKFLOW.md`.
- `tools.length === 3`; `sources` must include a Goethe entry.
- `calculateExamBudget({ examFee:130, prepBudget:49, retakes:1 })` → `{ total: 309 }` (total = `examFee + prepBudget + examFee*retakes`).
- `recommendExamPath({ goal:"spouse-visa", country:"Germany", language:"German" })` must return `primaryExam: "Goethe-Zertifikat A1"` with ≥3 steps, and the `warning` must **not** contain "dump".
- Homepage markup checks: `#hero-finder` appears before `#exam-count`, `#path-result` exists, language toggle and `data-i18n="heroHeadline"`, `#waitlist-message`, and `data-i18n="footerDisclaimer"` all present.
- **Exactly 10** `.html` files in `guides/`. Adding or removing a guide page requires updating this assertion. Each guide must contain `Last updated: 2026-06-30`, an `Official sources` section, and the link `https://www.goethe.de/en/spr/prf.html`.
- Homepage must link to `guides/goethe-a1-germany-family-reunion.html`.

When extending `app-data.js`, keep both export paths working (browser global + Node `module.exports`) — the test requires the Node path.

## Content & compliance rules (from docs/ + enforced by project policy)

- **Official-first, safe prep.** Every guide links back to the official exam owner / government source. Never publish leaked questions, copied real exam items, or fake "authorized" content. The `recommendExamPath` warning string is the canonical compliance statement.
- Do not fabricate specific fees, dates, policy numbers, or government requirements — point users to the official source to verify. The "Last Updated" date on every page is a trust signal.
- Guide-page writing template and workflow live in `docs/CONTENT_WORKFLOW.md` (15-section structure above). Launch verification steps are in `docs/LAUNCH_CHECKLIST.md`; product/status notes in `docs/PM_AUDIT.md`.

## Conventions

- Bilingual copy: add an English string under `i18n.en` and its Chinese counterpart under `i18n.zh` with the same key. The toggle just swaps `state.locale`.
- Guide filenames are kebab-case and topic-specific (e.g. `goethe-a1-fees-by-country.html`). New guides should match the existing Germany A1 page structure so the shared assertions keep passing.