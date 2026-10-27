# P04 W07 + local W15 handoff

Status: `partial`. Candidate only; this is not the W00 serial integration, LP04 closeout, or an independent audit.

The assigned copy is `/private/tmp/visalang-W00-2026-09-25-01/W07`, frozen from baseline `b7a9fddd658d95279e05127f32e2ec2cddec7fa8e90c2e254f55df89ff1942b5`. Dispatch and registered W04/W06 asset reuse are recorded in the parent W00 batch. Read-only facts, formulas, checked dates, and claim versions were not changed.

## Candidate changes

- Compressed the shared plan panel to a short summary while keeping status and save/clear actions visible; moved detailed privacy and restart boundaries into a nearby disclosure.
- Reordered Route Finder and Checklist results around status/title, boundary, next step, remaining checks, continuation/actions, then expandable evidence. Versioned claims stay out of the ordinary checklist flow. Text export carries source/version/check-date/boundary metadata.
- Added explicit copy/print/export controls and selectable clipboard fallback. Focused results use a sticky-header scroll margin; evidence is not clipped. Wide result tables retain horizontal scrolling. Result-only print rules reveal evidence disclosures.
- Added a real-browser geometry assertion to T28. Its execution is blocked here because Playwright is not installed in the assigned offline dependency copy. A fresh CUA inspection is also unavailable because the Mac is locked and browser inventory failed. No viewport matrix or post-change visual pass is claimed.

## Verification

See `evidence/logs/` for exact commands and output. `npm run build`, M2-A plan integration, M2-B Route Finder, M2-B Checklist export, and M3 Chinese tool contract exited 0. T28 exited 1 before test setup: module `playwright` is missing. The Checklist assertion internally runs `npm run build`; an additional standalone build log is included.

The currently evidenced route logic includes unknown/unsupported, existing certificate, verify-first and stale-claim branches via deterministic resolver assertions. Plan-state checks cover guarded storage setup, restore/status contracts and save/clear controls; Checklist checks cover stable-state restore/route-change clearing and take-away helper transitions. These are local Node contracts, not end-to-end browser exercises. Editing an already-rendered result, real session restoration, 30-day expiry/clear clicks, clipboard rejection, print and download remain unverified.

## Evidence and limitations

- `evidence/observation-receipt.md` records the previously observed baseline obstruction and the current browser-access limit. No screenshot file was saved; no synthetic image is presented as evidence.
- `record-tool-gap-list.md`, `materials-and-assumptions.md`, `state-and-export-checks.md`, and `calendar-import-status.md` record scope and checks.
- Layout verification is not complete at 375/390/768/desktop, EN/ZH, keyboard, print, and download. Browser CUA state capture reported the Mac locked and `nodeRepl.fetch` unavailable. Exact scrollY and a persisted screenshot are unavailable.
- Real readers, real devices, a real calendar-client import, production, and full LP04 remain untested. This handoff does not change original T/LP/LC gates.

## W00 next actions

Integrate serially against the frozen dirty tree using the per-file hash receipt and `candidate.patch`; resolve existing source differences instead of replacing whole files. After integration, run the agreed W00 governance, full test/build, visual receipts and independent read-only auditor on the exact frozen changed scope. Keep LP04 partial until its real-reader and calendar-import evidence is satisfied by the responsible owner/window.
