# VisaLang

VisaLang is a pre-launch static MVP for a bilingual language-exam navigation site. It helps users identify language exams for visa, residency, citizenship, and work-registration paths.

## What Exists

- Bilingual homepage: English and Chinese toggle.
- Hero route finder: goal, country, language, and recommended official path.
- Supporting tools: cost calculator and speaking mock entry.
- Exam library: 50 sourced exam seeds and 200 high-intent guide-page seeds.
- Official-source map and safe-preparation disclaimer.

## How To Preview

Open `index.html` directly in a browser, or run a local preview server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

## How To Check

```bash
npm test
```

The test checks the core data shape, brand, bilingual setup, hero route finder, and launch-safe page elements.

## Planning Docs

- `docs/PM_AUDIT.md`: launch-readiness audit and staged product plan.
- `docs/LAUNCH_CHECKLIST.md`: operational go/no-go checklist.
- `docs/CONTENT_WORKFLOW.md`: source-backed guide publishing rules.
- `docs/MONETIZATION_ROADMAP.md`: phased revenue plan and trust boundaries.

## Main Files

- `index.html`: page structure and translatable text hooks.
- `styles.css`: responsive visual design.
- `app-data.js`: exam data, source links, i18n copy, tool logic.
- `app.js`: rendering, language toggle, calculators, and interactions.
- `tests/site.test.js`: lightweight project checks.

## Beginner Next Steps

1. Pick a first niche: Germany family visa, European citizenship language exams, or UKVI English.
2. Verify 20 official pages manually before publishing content.
3. Connect the waitlist form to an email tool.
4. Deploy to a simple static host.
5. Add analytics and search-console tracking.
6. Publish only pages with official source links and `Last Updated` dates.
