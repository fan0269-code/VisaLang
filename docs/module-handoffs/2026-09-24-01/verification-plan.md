# P00 actual verification and remaining command order

This is a documents/snapshot-only preparation window. No src/public/deploy/services behavior changed. The user specifically requires preaudit `node tests/planning-map-governance.test.mjs` to reach the new independent-audit gate, then post-audit `npm test` and governance. No standalone launch-check/build is run for this P00. Existing npm suites launch builds sequentially via execFileSync; no parallel npm command is permitted.

Completed evidence:
- Freeze: 1,313 files and 59,896,160 bytes; baseline plus W03/W04/W08 aggregates all equal. 0 deletions, 0 staged entries, 129 tracked dirty paths, 901 untracked inventory entries. Source was rechecked against frozen inputs at capture.
- Runtime: three independent local node_modules copies, each 10,147 entries verified; no hard links/shared writable dependencies; W08 isolated stdlib venv probe. No install, download, API, model inference or service start.
- Preservation: baseline-preservation.json records unchanged old batch (38 files) and no unexplained main-tree changes. Runtime dependency caches/generated build outputs are outside candidate inputs.
- Archify validate/deliver: exit 0, showcase 9/9, 0 errors/warnings. First browser attempt: exit 1, Chrome SIGABRT inside host tool sandbox. Retry in browser-capable local context: exit 0; canonical receipt records four desktop containment sizes and four exact PNGs. Independent image-capable review records actual screenshot inspection separately.
- First preaudit governance run found screenshot-entry ordering only; all hashes matched. The image reviewer sorted the same reviewed entries to the governance contract before resubmission. Original output: `/private/tmp/visalang-p00-2026-09-24-01-preaudit-governance-first.txt`. Final preaudit output is recorded separately.
- Vault root and template do not exist; no file synchronized to Vault. Repository payload is review/pending/not_started and actual sync blocked.

Credential and network boundary for final tests:
Astro/Vite's local env-loader automatically reads `.env.local` during builds. P00 explicitly forbids reading it. `test-boundary.sb` denies all reads/metadata for that exact credential path, plus all network access. No credential bytes are opened, moved or copied. The Vite loader skips inaccessible env files after tryStatSync. The restriction applies to the unmodified npm test process and descendants, not mocked assertions or a modified Astro configuration.

The sandbox wrapper itself could not initialize inside the original host sandbox (exit 71: sandbox_apply Operation not permitted). In the reviewed local execution context, a public synthetic canary read was denied with EPERM (test-boundary-preflight.txt, exit 0). The canary is not a credential; the real `.env.local` was never used as a read probe. This test verifies the deny rule, not application behavior.

After the fresh Auditor report only:
`env -u TYPESAFE_API_KEY -u LAYA_API_KEY ASTRO_TELEMETRY_DISABLED=1 PYTHONDONTWRITEBYTECODE=1 sandbox-exec -f docs/module-handoffs/2026-09-24-01/test-boundary.sb npm test`
Then `node tests/planning-map-governance.test.mjs`, plus byte-preservation check. Final actual output/exit codes are stored outside the immutable candidate at `/private/tmp/visalang-p00-2026-09-24-01-postaudit/`. Never mark these planned commands passed before execution. Test fixtures may temporarily create then remove their known local test content; final byte binding and governance must still pass.

No assertion is made about a real reader/device, account, API accuracy, production URL, TLS, real host or real rollback. No fake Git metadata is created. Git-dependent release preparation belongs to future W00 module integration in the actual main tree.
