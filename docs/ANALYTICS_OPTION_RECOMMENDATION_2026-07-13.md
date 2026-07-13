# Phase 1 analytics option recommendation

Reviewed: 2026-07-13. Scope: choose a measurement direction only; this document does not approve deployment, privacy wording, consent treatment, or any data collection.

## Decision

**When the Phase 1 entry gate is formally opened, use Plausible Analytics Cloud on the Growth plan; do not add Google Analytics 4 (GA4) or Google Tag Manager.**

This is the smallest managed option that fits VisaLang's stated Phase 1 question: which route a visitor selects, whether a tool is completed, which official external link is clicked, which guide CTA is used, and whether a contact intent is selected. The Growth plan is the first Plausible tier intended for team sharing/invited members; VisaLang needs a named primary and a backup viewer. Plausible Cloud has a 30-day no-card trial; its public documentation currently does not publish a fixed amount in the text, so the accountable owner must confirm the live price and pageview tier on the official pricing screen before subscribing. Custom events and automatic outbound-link events count toward the monthly usage total. [Plausible plans](https://plausible.io/docs/subscription-plans)

**Until the written gate is complete, select the no-analytics baseline.** That means no new tracker, no events, no GTM, and no change to the current source. Search Console is independent of this choice and remains the source for organic-search performance.

## Comparison

| Option | Fit for the five Phase 1 events | Privacy / consent implications | Access and retention | Delivery burden | Recommendation |
| --- | --- | --- | --- | --- | --- |
| **Plausible Cloud — Growth** | Built-in outbound-link tracking; custom events can be sent from a CSS class or JavaScript. Avoid custom properties and event values for this window. | Plausible says it sets no visitor cookies, stores no persistent identifiers or raw IP addresses, and processes/stores Cloud data in the EU. This reduces scope but is **not** a site-specific legal decision; existing advertising and any jurisdictional obligations still require the approved policy/consent decision. | Growth is the tier for team sharing. Roles include Owner, Admin, Editor and Viewer. The owner must record an approved retention/deletion decision; Plausible permits site-data deletion. | One script in the shared Astro layout plus narrowly placed event hooks; do not use GTM. | **Choose after gate approval.** |
| **GA4 Standard** | Event-based and capable of all five events, but is broader than needed. | Google provides consent-mode and advertising/privacy controls, which add configuration and verification work. The account must explicitly keep Google signals and ad-personalisation off unless separately approved. Do not assume a consent banner or existing wording is sufficient. | GA4 Standard is free. Its event/user-level retention choices are 2 or 14 months (aggregated reports are treated differently). Property roles include Administrator, Editor, Analyst and Viewer. | A Google tag plus event schema/configuration and privacy settings; GTM is unnecessary for this small static site but is often added, increasing governance surface. | **Do not choose for Phase 1.** Reconsider only if approved advertising/product analytics needs exceed the defined five events. |
| **Plausible Community Edition (self-hosted)** | Functionally relevant, but no Phase 1 capability requires it. | Data-hosting location is controllable by VisaLang, but VisaLang then owns the full operational and compliance burden. | Software is free and AGPL-licensed; VisaLang would own backups, upgrades, server security, availability, bot filtering, capacity and retention. | New service infrastructure, monitoring, backup and incident ownership. | **Do not choose.** It conflicts with the plan's minimal-operation objective. |
| **No analytics baseline** | Does not answer on-site route/tool/CTA questions; Search Console still answers search discovery and indexing questions. | No new analytics processor or analytics event transmission. It does not resolve any existing advertising/privacy configuration. | No new analytics account, access, or retention duty. | None. | **Use now**, while the Phase 1 gate remains closed. |

Primary sources: [Plausible event options](https://plausible.io/docs/script-extensions), [Plausible custom events](https://plausible.io/docs/custom-event-goals), [Plausible compliance](https://plausible.io/docs/compliance), [Plausible roles](https://plausible.io/docs/users-roles), [Plausible self-hosting responsibilities](https://plausible.io/self-hosted-web-analytics), [Google Analytics terms (GA4 provided without charge)](https://marketingplatform.google.com/about/analytics/terms/us/), [GA4 retention](https://support.google.com/analytics/answer/7667196), [GA4 access roles](https://support.google.com/analytics/answer/9305587), and [Google tag privacy controls](https://developers.google.com/tag-platform/security/guides/privacy).

## Guardrails for the chosen Plausible implementation

Allowed event names only:

1. `route_selected`
2. `tool_completed`
3. `official_outbound_click`
4. `guide_cta_clicked`
5. `contact_intent_selected`

Do not send: tool answers/results, free-text fields, email addresses, names, document identifiers, case details, query strings that might contain identifiers, or custom event properties. For tagged links, Plausible documents that an automatic `href` property may be stored in full; only tag a link when its destination URL is known to contain no sensitive value. Its default page reporting strips most query parameters, but that default is not a reason to transmit user-provided query strings. [Plausible custom-event URL behavior](https://plausible.io/docs/custom-event-goals) · [Plausible URL handling](https://plausible.io/docs/script-extensions)

## Required business record before implementation

Record all of the following in the Phase 1 gate, then open a separate authorised implementation window:

- service: `Plausible Analytics Cloud`, team and confirmed live plan/pageview tier;
- primary owner, backup owner, both account roles, and data-retention/deletion owner;
- approved retention/deletion setting and evidence that the DPA/processor review is accepted;
- approved jurisdiction-specific privacy and consent approach, including whether the currently loaded AdSense script changes the conclusion;
- the five permitted event names above, with confirmation that no event parameters/properties are allowed;
- a test plan: browser network check, dashboard verification, and a manual review that no prohibited data is transmitted.

The source currently contains Plausible references in the privacy/cookie pages and an AdSense loader in the shared layout. Those facts are not evidence that either service is approved, active, or compliant; the cookie-page wording also needs a separately authorised review before a tracker is enabled.
