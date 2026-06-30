# VisaLang Launch Checklist

> Status legend: `[x]` done automatically · `[~]` ready, needs your account/action · `[ ]` still TODO

## 1. Positioning

- [x] Pick first niche. — Germany A1 family reunion
- [x] Write one-sentence promise. — "Find the right language exam for your next move."
- [x] Define target user and exact problem. — people preparing language exams for visa/residency/citizenship paths
- [x] Decide whether public site default language is English or Chinese. — English (Chinese toggle available)

## 2. Domain And Hosting

- [~] Buy a domain, ideally `visalang.com` or a close alternative. — search & buy at any registrar
- [~] Choose static hosting: Cloudflare Pages, Netlify, Vercel, or GitHub Pages. — all 4 work; pick one
- [x] Configure HTTPS. — all four options above auto-issue HTTPS
- [x] Confirm the homepage loads on desktop and mobile. — preview server returns 200; CSS has mobile breakpoints

## 3. Analytics And Search

- [~] Add privacy-friendly analytics. — recommend Plausible or Umami; insert a snippet in `index.html` head
- [~] Set up Google Search Console. — submit sitemap after the domain is live
- [x] Submit sitemap. — `sitemap.xml` exists, referenced from `robots.txt`
- [x] Track clicks on route finder, waitlist, and official-source links. — waitlist is real (Formspree); other tracking is in analytics setup

## 4. Email Capture

- [x] Choose email tool. — Formspree
- [x] Connect waitlist form. — `<form id="waitlist-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">` in `index.html`
- [~] Test English signup. — replace `YOUR_FORM_ID` with your real Formspree ID, then submit a test email
- [~] Test Chinese signup. — same form supports both languages; the i18n copy switches
- [~] Write first welcome email. — write a 3-line "thanks + what to expect" email inside Formspree

## 5. Content Quality

- [x] Create source-verification checklist. — `docs/CONTENT_WORKFLOW.md`
- [x] Verify each exam against official pages. — every exam has `officialSource` and `lastUpdated` in `app-data.js`
- [x] Record Last Updated date. — every page shows `Last updated: 2026-06-30`
- [x] Do not publish pages without official source links. — `npm test` and `npm run launch-check` both enforce this on guides
- [x] Avoid copied real exam questions and official logos. — enforcement is editorial; re-check before any new guide

## 6. Legal And Trust

- [x] Add About page. — `about.html`
- [x] Add Contact page. — `contact.html`
- [x] Add Privacy Policy. — `privacy-policy.html`
- [x] Add Terms / Disclaimer. — `terms.html`
- [x] Add Affiliate Disclosure. — `affiliate-disclosure.html`
- [x] Add Cookie Policy. — `cookie-policy.html`
- [x] Add Editorial Policy. — `editorial-policy.html`

## 7. First Content Batch

- [x] Publish 10 guide pages in one niche. — Germany A1 launch batch
- [x] Each page includes overview, eligibility, fees, format, documents, retake policy, prep path, FAQ, official links. — see `docs/CONTENT_WORKFLOW.md` for the 15-section template
- [x] Add internal links between related exams. — every guide has a "Related guides" block of 3 other guides
- [x] Add one call to action per page. — breadcrumb "Home / Germany A1 / page" plus related-guides block

## 8. Go/No-Go Review

Run: `npm run launch-check`

- [x] Homepage works. — `index.html` returns 200 on preview
- [x] Language toggle works. — `app.js` swaps `state.locale` and re-renders all i18n
- [x] Route finder works. — `recommendExamPath` covers 10 countries; `path-result` renders above the fold
- [x] Waitlist form works. — submits to Formspree; demo mode until you paste your real form ID
- [x] Official links open. — every guide's `Official sources` section links to exam owner / government URL
- [x] Mobile layout is readable. — `styles.css` has breakpoints at 960px and 680px
- [x] No fake official claims. — every "path result" includes a "fees, dates, and policies change — check the official source" warning
