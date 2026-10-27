# T28 scenario matrix — 2026-09-20

Synthetic agent-operated local Chrome 153.0.8010.48 on macOS; no real participants. JSON files retain full actual result text. Headless desktop 1440×900; mobile viewport emulation 375/390/768×900. Browser plugin absent; installed runtime Playwright used. All external requests intercepted; external favicon request failure is expected test isolation, not an app runtime exception.

| ID | Preconditions | Actions | Expected | Actual / evidence |
| --- | --- | --- | --- | --- |
| en-entry-finder | Fresh 1440x900 context, no saved state | Home -> A1 route -> Finder; submit missing input, then China/spouse/none | Real links reach localized Finder; errors focus field; valid result renders | pass: en-finder.png |
| en-finder-boundaries | Finder with valid A1 inputs | Select other country; then Germany with missing relationship; then existing certificate; recover normal | Unsupported, missing-info and authority-confirmation boundaries remain distinct | pass: en-finder-recovery.png |
| en-comparison | Same tab has A1 plan | Use tool nav -> comparison; empty, A1, same, mixed A1/B1, B1 and restored A1 pairs | Missing rejected; valid A1/B1 tables; same/mixed remain bounded | pass: en-comparison.png |
| en-checklist | Same tab A1 route and exams | Nav -> checklist; verify inherited route; generate, check item, reload, regenerate; copy and read clipboard; download bytes | Stable checkbox restored; clipboard equals downloaded full checklist including state/sources | pass: en-checklist.png |
| en-checklist-print | Generated checklist with one checked task | Invoke print handler; render actual print media to PDF | beforeprint/afterprint observed and PDF contains print output; physical printing not tested | pass: en-checklist-print.png |
| en-checklist-fallback | Valid checklist | Reject clipboard via test fault injection; click copy; select unsupported route; restore A1 | Full manual fallback focused; unsupported route clears/disables takeaways; A1 recovers | pass: en-checklist-recovery.png |
| en-timeline | Same tab A1 plan | Nav timeline; missing buffers, negative buffer, valid target 2027-03-01 with 14/7/30; refresh | Errors focus fields; dates derived from explicit values; approved date restores | pass: en-timeline.png |
| en-reminder | Same tab A1 plan | Nav reminder; missing fields; choose topic/date; actual ICS download; edit date | No false success on missing input; ICS bytes valid; stale download hidden after edit | pass: en-reminder.png |
| en-device-save-clear | Shared session plan from tool chain | Verify no device snapshot; explicitly save; clear session and reload; clear plan | Device snapshot saved only on request; restores and both stores clear | pass: en-cleared.png |
| en-version-recovery | No persisted plan | Create plan then inject stale schema; refresh, clear, re-enter via keyboard | Incompatible version requires reconfirmation; clear/re-enter recovers without URL answers | pass: en-version-recovery.png |
| en-keyboard | Recovered A1 Finder | Restart -> focus first field; use only Tab/Arrow keys to choose controls and Enter submit | Keyboard-only traversal creates a result and moves focus to result | fail: TimeoutError: locator.waitFor: Timeout 30000ms exceeded. |
| en-375-route-finder | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-375-route-finder.png |
| en-375-exam-comparison | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-375-exam-comparison.png |
| en-375-checklist-generator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-375-checklist-generator.png |
| en-375-timeline-calculator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-375-timeline-calculator.png |
| en-375-email-reminders | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-375-email-reminders.png |
| en-390-route-finder | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-390-route-finder.png |
| en-390-exam-comparison | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-390-exam-comparison.png |
| en-390-checklist-generator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-390-checklist-generator.png |
| en-390-timeline-calculator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-390-timeline-calculator.png |
| en-390-email-reminders | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-390-email-reminders.png |
| en-768-route-finder | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-768-route-finder.png |
| en-768-exam-comparison | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-768-exam-comparison.png |
| en-768-checklist-generator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-768-checklist-generator.png |
| en-768-timeline-calculator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-768-timeline-calculator.png |
| en-768-email-reminders | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: en-768-email-reminders.png |
| zh-entry-finder | Fresh 1440x900 context, no saved state | Home -> A1 route -> Finder; submit missing input, then China/spouse/none | Real links reach localized Finder; errors focus field; valid result renders | pass: zh-finder.png |
| zh-finder-boundaries | Finder with valid A1 inputs | Select other country; then Germany with missing relationship; then existing certificate; recover normal | Unsupported, missing-info and authority-confirmation boundaries remain distinct | pass: zh-finder-recovery.png |
| zh-comparison | Same tab has A1 plan | Use tool nav -> comparison; empty, A1, same, mixed A1/B1, B1 and restored A1 pairs | Missing rejected; valid A1/B1 tables; same/mixed remain bounded | pass: zh-comparison.png |
| zh-checklist | Same tab A1 route and exams | Nav -> checklist; verify inherited route; generate, check item, reload, regenerate; copy and read clipboard; download bytes | Stable checkbox restored; clipboard equals downloaded full checklist including state/sources | pass: zh-checklist.png |
| zh-checklist-print | Generated checklist with one checked task | Invoke print handler; render actual print media to PDF | beforeprint/afterprint observed and PDF contains print output; physical printing not tested | pass: zh-checklist-print.png |
| zh-checklist-fallback | Valid checklist | Reject clipboard via test fault injection; click copy; select unsupported route; restore A1 | Full manual fallback focused; unsupported route clears/disables takeaways; A1 recovers | pass: zh-checklist-recovery.png |
| zh-timeline | Same tab A1 plan | Nav timeline; missing buffers, negative buffer, valid target 2027-03-01 with 14/7/30; refresh | Errors focus fields; dates derived from explicit values; approved date restores | pass: zh-timeline.png |
| zh-reminder | Same tab A1 plan | Nav reminder; missing fields; choose topic/date; actual ICS download; edit date | No false success on missing input; ICS bytes valid; stale download hidden after edit | pass: zh-reminder.png |
| zh-device-save-clear | Shared session plan from tool chain | Verify no device snapshot; explicitly save; clear session and reload; clear plan | Device snapshot saved only on request; restores and both stores clear | pass: zh-cleared.png |
| zh-version-recovery | No persisted plan | Create plan then inject stale schema; refresh, clear, re-enter via keyboard | Incompatible version requires reconfirmation; clear/re-enter recovers without URL answers | pass: zh-version-recovery.png |
| zh-keyboard | Recovered A1 Finder | Restart -> focus first field; use only Tab/Arrow keys to choose controls and Enter submit | Keyboard-only traversal creates a result and moves focus to result | fail: TimeoutError: locator.waitFor: Timeout 30000ms exceeded. |
| zh-375-route-finder | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-375-route-finder.png |
| zh-375-exam-comparison | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-375-exam-comparison.png |
| zh-375-checklist-generator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-375-checklist-generator.png |
| zh-375-timeline-calculator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-375-timeline-calculator.png |
| zh-375-email-reminders | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-375-email-reminders.png |
| zh-390-route-finder | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-390-route-finder.png |
| zh-390-exam-comparison | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-390-exam-comparison.png |
| zh-390-checklist-generator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-390-checklist-generator.png |
| zh-390-timeline-calculator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-390-timeline-calculator.png |
| zh-390-email-reminders | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-390-email-reminders.png |
| zh-768-route-finder | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-768-route-finder.png |
| zh-768-exam-comparison | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-768-exam-comparison.png |
| zh-768-checklist-generator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-768-checklist-generator.png |
| zh-768-timeline-calculator | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-768-timeline-calculator.png |
| zh-768-email-reminders | Chrome viewport emulation; not physical mobile device | Open localized tool, operate form and inspect rendered result | Result works, page has no horizontal overflow, form/control labels visible | pass: zh-768-email-reminders.png |

Main runner: 50 pass / 2 keyboard-automation failures; no uncaught app exceptions. These counts are not task-completion rates. Initial hidden-navigation locator mistake is preserved separately in browser-initial and not treated as a website defect.

## Supplementary scenarios

### browser-final/extra-scenarios.json

```json
[
  {
    "id": "stale-ruleVersion",
    "precondition": "Local Chrome, synthetic storage fixtures only",
    "steps": "Inject outdated ruleVersion into previously valid state; reload; clear and re-enter",
    "expected": "Reconfirm required, no automatic old result; successful recovery",
    "status": "pass",
    "actual": {
      "status": "A saved plan uses an incompatible schema, rule or claim version. Clear the shared plan and re-enter the current facts before relying on a result."
    }
  },
  {
    "id": "stale-claimVersions",
    "precondition": "Local Chrome, synthetic storage fixtures only",
    "steps": "Inject outdated claimVersions into previously valid state; reload; clear and re-enter",
    "expected": "Reconfirm required, no automatic old result; successful recovery",
    "status": "pass",
    "actual": {
      "status": "A saved plan uses an incompatible schema, rule or claim version. Clear the shared plan and re-enter the current facts before relying on a result."
    }
  },
  {
    "id": "expired-device",
    "precondition": "Local Chrome, synthetic storage fixtures only",
    "steps": "Inject valid 30-day snapshot that expired yesterday; remove session and reload",
    "expected": "Expired device copy removed and fields not restored",
    "status": "pass",
    "actual": {
      "removed": true
    }
  },
  {
    "id": "malformed-storage",
    "precondition": "Local Chrome, synthetic storage fixtures only",
    "steps": "Set malformed JSON in session and device, reload then use tool",
    "expected": "Invalid device removed; tool remains usable without false result",
    "status": "pass",
    "actual": {
      "result": "Status: Guidance available\n\nGermany family reunion: A1 verification route\nSelection summary\nCountry\nGermany\nPurpose\nFamily reunion\nApplication region\nGerman mission responsible for a China application location\nRelationship\nSpouse reunification\nCertificate\nNo certificate yet\nWhat the current evidence supports\n\nUse the applicant’s ordinary residence to identify the competent German mission, save its current instruction, and keep application-proof questions separate from Goethe product and selected-centre booking questions.\n\nInformation still missing or unconfirmed\nThe current local mission instruction and exact route details have to be checked for the applicant’s location.\nVersioned evidence basis\n\nRule germany-family-reunion-a1-authority-guidance, version 2026-09-09.1.\n\nClaim germany-family-reunion-a1-general-starting-rule, version 2026-09-08.1; source checked 2026-09-08.\nGerman Federal Foreign Office — Not proof of every family-reunion category, exception, accepted certificate, or individual result.\nClaim germany-family-reunion-a1-authority-split, version 2026-09-08.1; source checked 2026-09-08.\nGerman Federal Foreign Office — Specific to the described scenario; it does not determine every family route or an individual result.\nGerman Federal Foreign Office — Residence facts are required to identify a particular mission; this is not an eligibility decision.\nWho is responsible\nthe local German mission or competent German authority handling your application\nThe exam owner and selected official or authorised test centre\nNext steps\nVerify the language-proof question and any exception with the competent German mission or receiving authority.\nConfirm the exact accepted adult A1 product before comparing local booking options.\nOpen the working checklist, then use Timeline only after you have current local dates and planning assumptions.\n\nBoundary: Guidance identifies the verification order only. It does not decide whether proof is required, whether an exception applies, or whether a certificate will be accepted.\n\nGermany A1 family reunion guide / Open Checklist / Open Timeline\n\nInformational guidance only. This tool organises planning questions; it does not decide visa eligibility, certificate acceptance, exam availability, or an individual application outcome.\nOfficial check before you act\n\nConfirm the exact requirement, accepted certificate, documents, date, fee, result process, and local centre rules with the authority or official centre that receives your file.\n\nContinue your plan\n\nBrowse route guides\n\nOpen Checklist / Open Timeline\n\nCopy result\nPrint planExport text file"
    }
  },
  {
    "id": "stale-finder-result",
    "precondition": "Local Chrome, synthetic storage fixtures only",
    "steps": "Generate valid result, clear country and submit",
    "expected": "Invalid input must not retain visible prior result",
    "status": "pass",
    "actual": {
      "hidden": true
    }
  },
  {
    "id": "stale-comparison-result",
    "precondition": "Local Chrome, synthetic storage fixtures only",
    "steps": "Generate valid A1 comparison, clear first product and submit",
    "expected": "Invalid input must not retain visible prior comparison",
    "status": "pass",
    "actual": {
      "hidden": true
    }
  }
]
```

### browser-final/keyboard-supplement.json

```json
[
  {
    "id": "en-keyboard-character-selection",
    "precondition": "Chrome macOS headless; restart focuses country",
    "steps": "g Tab f Tab g Tab s Tab n Tab Enter, no mouse after restart",
    "expected": "A1 result and focus on result",
    "status": "pass",
    "actual": {
      "focus": [
        "country",
        "purpose",
        "applicationRegionId",
        "relationship",
        "certificate"
      ],
      "result": "Status: Guidance available\n\nGermany family reunion: A1 verification route\nSelection summary\nCountry\nGermany\nPurpose\nFamily reunion\nApplication region\nGerman mission responsible for a China application location\nRelationship\nSpouse reunification\nCertificate\nNo certificate yet\nWhat the current evidence supports\n\nUse the applicant’s ordinary residence to identify the competent German mission, save its current instruction, and keep application-proof questions separate from Goethe product and selected-centre booking questions.\n\nInformation still missing or unconfirmed\nThe current local mission instruction and exact route details have to be checked for the applicant’s location.\nVersioned evidence basis\n\nRule germany-family-reunion-a1-authority-guidance, version 2026-09-09.1.\n\nClaim germany-family-reunion-a1-general-starting-rule, version 2026-09-08.1; source checked 2026-09-08.\nGerman Federal Foreign Office — Not proof of every family-reunion category, exception, accepted certificate, or individual result.\nClaim germany-family-reunion-a1-authority-split, version 2026-09-08.1; source checked 2026-09-08.\nGerman Federal Foreign Office — Specific to the described scenario; it does not determine every family route or an individual result.\nGerman Federal Foreign Office — Residence facts are required to identify a particular mission; this is not an eligibility decision.\nWho is responsible\nthe local German mission or competent German authority handling your application\nThe exam owner and selected official or authorised test centre\nNext steps\nVerify the language-proof question and any exception with the competent German mission or receiving authority.\nConfirm the exact accepted adult A1 product before comparing local booking options.\nOpen the working checklist, then use Timeline only after you have current local dates and planning assumptions.\n\nBoundary: Guidance identifies the verification order only. It does not decide whether proof is required, whether an exception applies, or whether a certificate will be accepted.\n\nGermany A1 family reunion guide / Open Checklist / Open Timeline\n\nInformational guidance only. This tool organises planning questions; it does not decide visa eligibility, certificate acceptance, exam availability, or an individual application outcome.\nOfficial check before you act\n\nConfirm the exact requirement, accepted certificate, documents, date, fee, result process, and local centre rules with the authority or official centre that receives your file.\n\nContinue your plan\n\nBrowse route guides\n\nOpen Checklist / Open Timeline\n\nCopy result\nPrint planExport text file"
    },
    "screenshot": "en-keyboard-character-selection.png"
  },
  {
    "id": "zh-keyboard-tab-traversal",
    "precondition": "Chrome macOS headless, blank form",
    "steps": "Restart then Tab through fields and the submit control",
    "expected": "Controls reachable in DOM order",
    "status": "pass",
    "actual": [
      "country",
      "purpose",
      "applicationRegionId",
      "relationship",
      "certificate",
      "查找起始路线"
    ],
    "fullNativeDropdownSelection": "not_tested: arrow keys did not commit native select options in this automation environment; do not infer product accessibility failure or full keyboard PASS"
  }
]
```

### stale-results-red.json

```json
[
  {
    "locale": "en",
    "tool": "route-finder",
    "hidden": false,
    "invalid": "true",
    "focus": "country",
    "field": "country",
    "recovered": true
  },
  {
    "locale": "en",
    "tool": "exam-comparison",
    "hidden": false,
    "invalid": "true",
    "focus": "first",
    "field": "first",
    "recovered": true
  },
  {
    "locale": "en",
    "tool": "checklist-generator",
    "hidden": false,
    "invalid": "true",
    "focus": "route",
    "field": "route",
    "recovered": true
  },
  {
    "locale": "zh-CN",
    "tool": "route-finder",
    "hidden": false,
    "invalid": "true",
    "focus": "country",
    "field": "country",
    "recovered": true
  },
  {
    "locale": "zh-CN",
    "tool": "exam-comparison",
    "hidden": false,
    "invalid": "true",
    "focus": "first",
    "field": "first",
    "recovered": true
  },
  {
    "locale": "zh-CN",
    "tool": "checklist-generator",
    "hidden": false,
    "invalid": "true",
    "focus": "route",
    "field": "route",
    "recovered": true
  }
]
```

### stale-results-green.json

```json
[
  {
    "locale": "en",
    "tool": "route-finder",
    "hidden": true,
    "invalid": "true",
    "focus": "country",
    "field": "country",
    "recovered": true
  },
  {
    "locale": "en",
    "tool": "exam-comparison",
    "hidden": true,
    "invalid": "true",
    "focus": "first",
    "field": "first",
    "recovered": true
  },
  {
    "locale": "en",
    "tool": "checklist-generator",
    "hidden": true,
    "invalid": "true",
    "focus": "route",
    "field": "route",
    "recovered": true
  },
  {
    "locale": "zh-CN",
    "tool": "route-finder",
    "hidden": true,
    "invalid": "true",
    "focus": "country",
    "field": "country",
    "recovered": true
  },
  {
    "locale": "zh-CN",
    "tool": "exam-comparison",
    "hidden": true,
    "invalid": "true",
    "focus": "first",
    "field": "first",
    "recovered": true
  },
  {
    "locale": "zh-CN",
    "tool": "checklist-generator",
    "hidden": true,
    "invalid": "true",
    "focus": "route",
    "field": "route",
    "recovered": true
  }
]
```

## Interpretation and untested coverage

- Main keyboard scripts used ArrowDown without committing native selections in this macOS headless environment. English Finder keyboard flow was subsequently verified using native character selection (g/Tab/f/Tab/g/Tab/s/Tab/n/Tab/Enter); screenshot and focused result are retained. Chinese Tab traversal was observed, but Chinese full keyboard-only dropdown selection remains not_tested. Keyboard coverage is bounded to the recorded cases, not a complete accessibility certification.
- Real target-user task sessions (including planned five participants): not_tested; no recruitment/messages authorized.
- Physical iOS/Android devices, Safari/Firefox/Edge, screen readers: not_tested. Viewport emulation does not prove those devices/browsers.
- Calendar-client import, duplicate import, device notifications, email delivery: not_tested. Downloaded ICS bytes only are verified.
- Physical printer and OS print dialog: not_tested. English/Chinese headless Chrome print media and five-page PDFs are verified.
- Production HTTP, analytics backend/traffic baseline, ads account/CMP behavior, URL migration: not_tested/not_authorized. T23 remains blocked.
- No source freshness or official policy revalidation is claimed by these technical tests; no new visa/exam facts were authored.
- Automatic-copy denial is deliberate test fault injection; real clipboard success was separately verified by reading back actual text and comparing it byte-for-byte with the actual downloaded checklist.
