# Phase 1 privacy and consent audit

Reviewed: 2026-07-13
Scope: evaluate the business direction to use Plausible Analytics Cloud Growth and retain Google AdSense. This is an operational risk assessment, not legal advice or a jurisdiction-specific legal opinion. No code, account setting, consent message, policy text, deployment, or data collection was changed.

## Inputs recorded for this review

- Search Console is deferred from this review. It is not confirmed and is not evidence for opening the wider Phase 1 gate.
- Business direction: use Plausible Analytics Cloud Growth for the approved five-event scope; retain AdSense.
- The site serves an international audience, including EEA, UK and Swiss routes. The assessment therefore includes Google's stated requirements for those regions.

## Result

| Surface | Result | Reason |
| --- | --- | --- |
| Plausible Cloud Growth | **Conditionally approved; do not deploy yet** | It fits the minimal approved event scope and Plausible states that its standard service uses no cookies or persistent identifiers. Account owners, retention/deletion decision, DPA review, and corrected public wording are still missing. |
| Retaining the current AdSense implementation | **No-go** | The public site loads the AdSense script on every page, but there is no CMP or consent flow in source or public HTML. The current Privacy and Cookie Policies say advertising is future-only, and the Cookie Policy incorrectly says Plausible uses an analytics cookie. |
| Phase 1 overall | **Closed** | In addition to the privacy/ad issue, contact handling, editorial review, release/rollback ownership and release SOP remain unconfirmed. |

## Evidence reviewed

- `src/layouts/BaseLayout.astro` and the public homepage load `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` with publisher ID `ca-pub-3018617123550799`.
- No source or public-HTML marker was found for a CMP, IAB TCF string, Google Privacy & messaging flow, or consent controls.
- `src/pages/privacy-policy.astro` and `src/pages/cookie-policy.astro` both describe display advertising as a future change. The Cookie Policy says Plausible uses an analytics cookie.
- Plausible states that its standard Cloud service uses no cookies, persistent identifiers, raw IP addresses, or personal-data collection, and that it provides a DPA. This lowers analytics scope but does not resolve AdSense or the site's own legal obligations. [Plausible compliance](https://plausible.io/docs/compliance)
- Google states that AdSense publishers serving users in the EEA, UK or Switzerland must use a Google-certified CMP integrated with the IAB TCF. Google also requires disclosures and consent where required for cookies/local storage and ads personalisation. [Google CMP requirement](https://support.google.com/adsense/answer/13554020?hl=en) · [Google CMP setup](https://support.google.com/adsense/answer/7670013?hl=en)
- Google provides a European-regulations message flow in AdSense Privacy & messaging, but its CMP certification does not itself establish full compliance with applicable privacy law. [Create a European regulations message](https://support.google.com/adsense/answer/10960768?hl=en-2) · [Google CMP requirement](https://support.google.com/adsense/answer/13554020?hl=en)
- The EDPB states that consent must be freely given, specific, informed and unambiguous; a site-specific legal assessment is still required for the jurisdictions it targets. [EDPB consent summary](https://www.edpb.europa.eu/system/files/2026-04/edpb-summary-consent_en.pdf)

## Minimum remediation before retaining AdSense

1. In the AdSense account, name the primary and backup owner; confirm the site/property, selected ad-technology providers, and the decision for EEA, UK and Switzerland.
2. Configure a current Google-certified TCF CMP for the relevant regions. Use AdSense Privacy & messaging only where its current account configuration meets that requirement; otherwise select an appropriate Google-certified CMP. Do not rely on the existing script or a static policy page as consent evidence.
3. Test accept, reject and manage-preferences states in the relevant regions before treating ads as approved. Retain a dated screenshot/export of the configured message and account settings.
4. In a separately authorised policy-copy window, align Privacy and Cookie Policies with the services actually used: AdSense, the consent/choices route, purposes and provider disclosures, contact channel, and Plausible's no-cookie design. Do not claim a legal basis or retention period until the accountable business/legal owner has approved it.
5. For Plausible, create the Cloud account only after a primary owner, backup viewer, retention/deletion owner and DPA/processor review are recorded. Implement only `route_selected`, `tool_completed`, `official_outbound_click`, `guide_cta_clicked`, and `contact_intent_selected`, with no event properties or user-provided values.
6. Run a separate implementation and network-verification window. It must prove that no tool answers, free text, identifiers, email addresses or query strings with identifiers are sent to Plausible, and that AdSense consent handling is active before ads are treated as approved.

## Gate decision

The business direction is recorded, but it does not open Phase 1. Keep the current AdSense script only as an explicitly unresolved risk pending the remediation above; do not add placements, tracking, forms, email, payment, or other third-party services in this state.
