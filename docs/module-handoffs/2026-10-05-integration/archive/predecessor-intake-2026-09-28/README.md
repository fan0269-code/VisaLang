# N00｜2026-09-28 existing module intake

This batch receives and freezes the existing W03, W04, W08, and W07 candidate packages. It applies no feature patch and does not complete a T, LP, or LC item.

## Frozen inputs

- Intake: `intake.json`
- Main-tree dirty baseline: `baseline-manifest.json`
- Shared-file conflicts and N01 order: `conflict-map.json`
- Archive copy/hash receipt: `archive/archive-manifest.json`
- Verification summary: `archive-validation.json`
- Full source packages and patch-touched candidate files: `archive/`

Baseline is branch `codex/scheme-3-one-week-content`, HEAD `4cb57e8744c752fed1881281e69e7b24cc7281c4`, upstream `origin/codex/scheme-3-one-week-content`, ahead/behind `0/0`. It records 1,152 staged/dirty/untracked paths before intake creation, with SHA-256 for 1,150 readable non-excluded files; two paths matching the declared sensitive/dependency/cache/model exclusions retain path/status only. No dirty content was reset or overwritten.

## Package state

| Module | Original status | Intake integrity | N01 input | Acceptance state |
|---|---|---|---|---|
| W03 | `ready_for_integration` | verified | admissible | pending integration and broader acceptance |
| W04 | `ready_for_integration` | verified | admissible | pending; screenshots and print evidence remain open |
| W08 | `partial` | verified | admissible | partial; real Git identity and production evidence remain open |
| W07 | `partial` | verified | admissible | partial; T28 browser geometry remains unverified |

All 139 manifested candidate files matched their source hashes; all 139 declared base hashes matched the current main tree. The four original handoff directories, existing 9/28 receipts, original dispatches, allocation baselines, module prompts, 44 historical test receipts, and 46 patch-touched candidate-file copies are preserved and hash-bound. All four candidate patches passed a scratch-only `patch --dry-run`; no patch was applied to this repository.

The prior dispatches' `not_started` fields remain as historical records. Current intake uses the 9/28 inventory: W03/W04 are ready candidates and W08/W07 remain partial. Historical module test logs were verified as evidence but were not rerun in this window. W07 T28 exited 1 before launching because Playwright was absent; this is an environment dependency block, not a passed browser assertion.

## N01 merge contract

Follow `W03 → W04 → W08 → W07`. This is the planned serial merge order and adds no product dependency. Three-way merge `src/styles/global.css` for W03/W04/W07 and `src/pages/tools/route-finder.astro` for W08/W07, comparing each allocation baseline, candidate, and current main bytes by hunk. Preserve unrelated dirty paths.

N01 must capture W04 target-page screenshots and print verification, rerun W07's actual browser geometry check with a working browser dependency, and verify W08 real Git identity on the integrated main tree. W08 production, target-host, backup, TLS, DNS, URL-retention, and rollback claims remain unverified and require their own actual evidence and Owner gates.

## Maintenance state

The 34-task count remains 25 complete / 5 in progress / 4 pending. No T, LP, or LC state is advanced by intake. AI, advertising, real API/input transfer, account actions, production checks, commit, push, and deployment were not run or authorized by this record.
