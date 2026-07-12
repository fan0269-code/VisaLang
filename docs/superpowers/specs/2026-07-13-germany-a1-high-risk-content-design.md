# Germany A1 high-risk content design

Date: 2026-07-13

## Goal

Deepen the existing Germany A1 family-reunion decision path without adding new
near-duplicate pages. The outcome is safer, more actionable guidance for the
points at which a reader can make an expensive or time-sensitive mistake.

## Scope

Review and, where supported by current official sources, revise only these
existing guides:

1. `german-family-reunion-language-requirement`
2. `goethe-a1-vs-telc-a1`
3. `goethe-a1-test-centers`
4. `goethe-a1-fees-by-country`
5. `goethe-a1-retake-policy`
6. `german-a1-documents-checklist`
7. `german-a1-exam-booking-timeline`

Create one audit table that records, for each guide: search intent, official
source checked, identified gap, action taken, and residual verification step.
Update `docs/TASK_LOG.md` with the completed window, verification evidence,
and remaining risks.

## Content rules

- Use current official German authority, German mission, Goethe-Institut, or
  telc sources as the factual basis. A general provider overview may explain a
  process but cannot prove a local fee, availability, acceptance decision, or
  individual exemption.
- Keep family-reunion eligibility, certificate acceptance, provider exam
  details, local centre procedures, and visa-file requirements separate.
- Do not add fixed fees, dates, result times, test-centre availability,
  acceptance guarantees, exemption conclusions, legal advice, or claims about
  an individual case unless the exact current official source supports the
  statement and its applicable scope.
- When a fact is local, time-sensitive, unavailable, or contradictory, replace
  a conclusion with a named official source and an explicit verification action.
- Preserve the shared A1 route-support section and keep the next-reading order
  aligned to the reader journey: requirement -> accepted proof -> official
  centre -> fee and booking terms -> timeline and documents -> preparation or
  retake.

## Per-guide intent and acceptance focus

| Guide | Reader decision | Required outcome |
| --- | --- | --- |
| Language requirement | Whether proof or an exception may be relevant | Boundary between route category, authority decision, and proof check is explicit. |
| Goethe vs telc | Which exact product to investigate | Acceptance is verified before provider, price, or availability comparison. |
| Test centres | Whether a booking source is official and suitable | Reader can distinguish course providers from official exam-centre confirmation. |
| Fees | What price is current and comparable | No global price is implied; reader records exact exam, centre, date, fee, and terms. |
| Retake | What to do after an unsuccessful result | Local resit, booking, fee, timing, and certificate rules remain centre-verified. |
| Documents checklist | What belongs to booking, test day, and visa submission | Each stage has a distinct source of truth and no document sufficiency promise. |
| Booking timeline | Whether the route can fit a deadline | Unknown result, delivery, and retake timings remain unknown until locally confirmed. |

## Files deliberately excluded

No changes to page layouts, tools, schema rules, navigation, Chinese pages,
commercial/contact pages, analytics, advertising, deployment, legacy files, or
new guide routes are part of this window.

## Verification

1. Confirm every altered official link opens or, when automated access is
   blocked, downgrade the copy to a manual official-source verification step.
2. Check front matter for every changed guide, including a current
   `updatedDate` and a reading-time estimate consistent with the final body.
3. Run the A1 cluster regression, `npm test`, `npm run build`, and
   `npm run launch-check`.
4. Check generated pages for one H1, official-source links, the A1 hub link,
   intended related-guide links, and no unsupported factual claims.

## Completion criteria

The seven guides are deeper without expanding their claims beyond official
evidence; the audit table explains each editorial decision; all required
checks pass; and the task log identifies any facts that remain reader-side
verification tasks.
