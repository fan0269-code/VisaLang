# VisaLang Owner Input Request

> **superseded programme form:** retained as point-in-time governance evidence. It does not control the Scheme 3 maintenance window; see `docs/VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md`.
>
> Date: 2026-09-01  
> Task: `VL-GOV-001` input request  
> Status: `BLOCKED_INPUT` until the Business Owner supplies or accepts the requested roles and decisions.

## 1. Purpose and safety boundary

This form collects role and authorization decisions needed to execute the 49-card programme. It is not an account-login form. Do not place passwords, recovery codes, API keys, cookies, personal query exports, email content, or other secrets in this document or chat.

The user has already directed that independent review be handled by the dedicated `VisaLang Execution Auditor`. That assignment covers review only. It does not appoint the other operating owners and does not authorize external actions.

## 2. Required role decisions

For each row, provide a business-recognized person or role, backup/escalation, response target, and evidence location. If no owner exists, choose `KEEP_CLOSED`.

| Role | Proposed responsibility | Primary owner or `KEEP_CLOSED` | Backup/escalation | Response target | Durable evidence location |
| --- | --- | --- | --- | --- | --- |
| Business Owner | Stage, budget, external account, route and commercial decisions | `[required]` | `[required]` | `[required]` | `[required]` |
| Programme Owner | Historical task board, dependencies, weekly/monthly review | `Root VisaLang execution agent` — accept/change | `[required]` | `[required]` | retired 49-card board snapshot — accept/change |
| Content Authority Owner | High-risk sources, review cadence, corrections | `[required or KEEP_CLOSED]` | `[required]` | `[required]` | `[required]` |
| Data Owner | Search Console access, exports, dictionary and reports | `[required or KEEP_CLOSED]` | `[required]` | `[required]` | `[required]` |
| Ads/Consent Owner | AdSense and Google Privacy & messaging CMP | `[required or KEEP_CLOSED]` | `[required]` | `[required]` | `[required]` |
| Contact Owner | Receiving, routing, SLA, retention and deletion | `[required or KEEP_CLOSED]` | `[required]` | `[required]` | `[required]` |
| Release Owner | Candidate, authorization, deployment and smoke | `[required or KEEP_CLOSED]` | `[required]` | `[required]` | `[required]` |
| Rollback Owner | Rollback trigger, authorization and recovery | `[required or KEEP_CLOSED]` | `[required]` | `[required]` | `[required]` |
| Independent Auditor | Read-only P0/P1/P2 review | `VisaLang Execution Auditor` — assigned | Fresh independent Agent from the same spec | Per frozen batch | Auditor YAML verdict + `docs/TASK_LOG.md` |

An Agent may execute repository analysis for Programme, Content, or Data work when the Business Owner accepts that operating role. Account permission, personal responsibility, payment, release and production authorization remain separate.

## 3. External capability decisions

Choose one option per capability. Search Console, account/browser inspection, and production-version inspection are read-only unless a later authorization explicitly names a change. The contact-mailbox synthetic test is different: it sends, receives, routes, replies to or escalates, retains, and deletes a bounded test message, so it requires the separate write-capable authorization defined below.

| Capability | Allowed decisions | Owner decision | Scope/date |
| --- | --- | --- | --- |
| Search Console | `AUTHORIZE_READ_ONLY` / `KEEP_CLOSED` | `[required]` | `[required]` |
| Analytics | `KEEP_CLOSED` / `AUTHORIZE_SEPARATE_ASSESSMENT` | `[required]` | `[required]` |
| AdSense | `AUTHORIZE_READ_ONLY` / `KEEP_CURRENT_NO_EXPANSION` / `AUTHORIZE_SEPARATE_DISABLE_REVIEW` | `[required]` | `[required]` |
| CMP | `AUTHORIZE_READ_ONLY_ACCOUNT_AND_BROWSER_CHECK` / `KEEP_UNVERIFIED_NO_EXPANSION` | `[required]` | `[required]` |
| Contact mailbox | `AUTHORIZE_BOUNDED_SYNTHETIC_EMAIL_TEST` / `KEEP_CONTACT_INTENT_ONLY` | `[required]` | `[required]` |
| Production version | `AUTHORIZE_READ_ONLY_VERSION_CHECK` / `KEEP_UNVERIFIED` | `[required]` | `[required]` |

If `AUTHORIZE_BOUNDED_SYNTHETIC_EMAIL_TEST` is selected, the authorization must name all of the following before execution:

- approved sender role/address and recipient mailbox (store only a redacted locator in the repository);
- a synthetic payload with no real name, application, immigration/exam case, identifier, document or sensitive fact;
- which actions are allowed: send, receive, route, reply or escalate, verify the stated retention period, delete the test, and confirm cleanup;
- Contact Owner/operator role, exact date/window, response target and durable redacted evidence location.

This bounded test writes and mutates external mailbox state. It does **not** authorize mailbox or routing configuration changes, access to unrelated messages, a public service/SLA promise, use of real-case data, forms/waitlists, or any other account action. If any field is missing, choose `KEEP_CONTACT_INTENT_ONLY`.

## 4. Source and health policy proposals

Choose `ACCEPT`, `CHANGE`, or `DEFER`:

1. Trigger-first source review with proposed maximum caps: 60 days for route/acceptance/submission claims, 90 days for exam-format/preparation claims, and 30 days while an active first-party conflict remains.
2. No-change source reviews record evidence but do not automatically change public `updatedDate`, `sourceReviewedAt`, indexability, maturity, or advertising eligibility.
3. Weekly Search Console reporting uses the platform Pacific Time calendar and the fixed windows defined in `docs/GROWTH_DATA_DICTIONARY.md`.
4. Health severity and stop/release thresholds remain proposals until Business/Release Owners explicitly accept them.

## 5. Explicitly not requested here

This form does not request or authorize:

- commit or push;
- deployment, release, rollback or server change;
- account setting change;
- enabling Analytics, advertising, CMP, forms, payment or email delivery;
- publishing a second route or new Chinese pages;
- changing noindex, sitemap, advertising or content maturity;
- collecting immigration documents, private case details or payment information.

## 6. Minimal reply format

The Business Owner can reply outside the repository using this compact form:

```text
Business Owner: <person or business-recognized role>
Programme Owner: ACCEPT Root VisaLang execution agent / <replacement>
Content Authority Owner: <role or KEEP_CLOSED>
Data Owner: <role or KEEP_CLOSED>
Ads/Consent Owner: <role or KEEP_CLOSED>
Contact Owner: <role or KEEP_CLOSED>
Release Owner: <role or KEEP_CLOSED>
Rollback Owner: <role or KEEP_CLOSED>
Backup/escalation + response target for each active role: <...>
Search Console: <decision>
Analytics: <decision>
AdSense: <decision>
CMP: <decision>
Contact mailbox: <decision>
Production version: <decision>
Source/health proposals: ACCEPT / CHANGE <details> / DEFER
```

Until this input is complete, related capabilities remain closed or blocked. The correct execution result is `BLOCKED_INPUT`, not an inferred owner or fabricated approval.
