# Phase 1 analytics direction

Reviewed: 2026-07-13. This document records the selected direction only. It does not approve installation, privacy wording, consent treatment, or data collection.

## Decision

**When the remaining Phase 1 gate is opened, use Cloudflare Web Analytics as the long-term free analytics baseline. Do not add Plausible, GA4, GTM, or custom event tracking.**

Cloudflare states that Web Analytics is free, works without moving DNS or using Cloudflare's proxy, and does not collect or use visitors' personal data. It uses a JavaScript beacon to provide page and performance metrics. [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/about/)

This choice intentionally narrows the measurement scope. Cloudflare does not currently support custom events, so it cannot measure route selection, tool completion, official-link clicks, guide CTA clicks, or contact intent. [Cloudflare FAQ](https://developers.cloudflare.com/web-analytics/faq/)

## Allowed scope

- Page views, visits, paths, referring hosts, country/device context, and Core Web Vitals/performance.
- One official Cloudflare Web Analytics beacon for `flowlight.me`.
- A primary account owner and a backup account member with the least access needed to read analytics. Cloudflare supports account members and an Analytics role. [Cloudflare roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/)

## Forbidden scope

- Custom event payloads, user identifiers, tool inputs/results, free text, contact details, document details, query-string tracking, or data export pipelines.
- GA4, GTM, Plausible, self-hosted analytics, or any additional analytics provider.
- Treating Cloudflare page metrics as CTA or conversion attribution.

## Required record before installation

1. Cloudflare account owner and backup Analytics viewer.
2. Confirmation that `flowlight.me` is added in Web Analytics as a non-proxied site and its official beacon snippet is available.
3. Updated Privacy and Cookie Policy wording prepared for Cloudflare's cookie-free page/performance measurement.
4. A narrow test plan: inspect the beacon request, verify that the dashboard receives page data, and confirm no custom event or user-provided payload is sent.

Cloudflare's official setup instructions for a non-proxied site are: add the hostname in Web Analytics, copy the site-specific JavaScript snippet, and add it before the closing body tag. [Cloudflare setup](https://developers.cloudflare.com/web-analytics/get-started/)
