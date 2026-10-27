# State and export checks

Node contract results are in `evidence/logs/`:

- M2-B Route Finder covers unsupported/unknown inputs, existing A1 certificate, missing/unconfirmed location and relationship, verify-first/authority-only logic, withdrawn/stale claims, and exact claim-version mismatch in the resolver contract. Exit 0. The test does not interact with the rendered form.
- M2-A shared plan covers a throwing localStorage getter during setup, guarded storage operations, restore/status projection contracts, explicit device save/clear controls, session-default and privacy/restart contracts, plus legacy cleanup. Exit 0. Its 30-day check is presentation/code-contract only; no real expiry interval or button click was exercised.
- M2-B Checklist covers unknown stable IDs, restore projection and state clearing when the route changes, copy/print/export controls, and unsupported/configured action-state helper transitions, source and boundary serializer output, and generated date validation. Exit 0. It does not force a real clipboard rejection or use a browser session.
- M3 Chinese tool presentation contract exited 0.
- T28 real browser test did not start because the assigned copy has no Playwright package. Its new 390px measurement includes actual browser geometry checks for focused result, scrollY, and heading vs sticky header. No claim is made that this assertion passed.

Editing after result to invalidate rendered stale output, actual session recovery, 30-day expiry and clear clicks, clipboard failure, storage denial during a persisted save, print, download contents and keyboard paths were not verified end-to-end in the rendered candidate during this window.
