# VisaLang Production Trust Stabilization Execution Orchestration Design

**Date:** 2026-07-17
**Status:** Approved for implementation-plan authoring
**Source plan:** `docs/superpowers/plans/2026-07-17-production-trust-stabilization.md`

## 1. Purpose

This design turns the existing Phase 0 production-trust stabilization plan into a controlled multi-agent execution workflow.

It does not replace the technical requirements in the source plan. It adds:

- a verified implementation baseline;
- dependency-aware execution waves;
- narrow agent responsibilities;
- test-first and review gates;
- explicit stop conditions;
- evidence and handoff rules.

The immediate goal is to implement and locally verify Phase 0 without expanding into deferred product, content, advertising, analytics, or production-operations work.

## 2. Current baseline

At the time of this design:

- the active branch is `fix/production-trust-stabilization`;
- commit `14e5470` adds the Phase 0 implementation plan;
- the Phase 0 product and deployment changes have not yet been implemented;
- `graphify-out/` is untracked and outside this work;
- production DNS, TLS, Nginx behavior, smoke checks, and rollback have not been verified in an authorised production window.

The execution workflow must preserve those facts and must not present planned or historical production behavior as current evidence.

## 3. Approved scope

### Included

- Pause the unverified advertising integration and align Privacy/Cookie copy with actual behavior.
- Separate editorial route maturity from official-source assurance across every public label surface.
- Minimise Route Finder URL persistence and make unsupported-route handoffs neutral.
- Unify the Nginx deployment contract around `visalang.org`.
- Add executable legacy redirects for Nginx.
- Add test-gated, versioned, atomic releases.
- Add an explicit, auditable rollback path.
- Add a production smoke script that is prepared locally but not run without separate authorisation.
- Run independent code, security/privacy, and deployment reviews.
- Record only locally verified evidence.

### Excluded

- Production deployment or server modification.
- DNS, TLS, certificate, firewall, SSH, or live Nginx changes.
- Live production smoke testing or rollback rehearsal.
- Germany A1 source packages or claim matrices.
- Germany B1 source review.
- Route Finder two-step visual redesign.
- Cross-tool prefilled Checklist/Timeline context transfer beyond the Phase 0 safe links.
- Playwright, axe-core, Lighthouse CI, or new CI infrastructure.
- CMP or AdSense re-enablement.
- Analytics, forms, email delivery, payments, accounts, CMS, or new content routes.
- Global CSS redesign or legacy HTML migration.

## 4. Execution approach

### Chosen approach: dependency-driven hybrid orchestration

Implementation tasks that touch shared files run sequentially. Independent review and verification lanes run in parallel after each milestone.

This is preferred over maximum worktree parallelism because Phase 0 repeatedly touches shared integration points:

- `tests/site.test.js` across trust and Route Finder tasks;
- `deploy/deploy.sh` across domain, release, rollback, and smoke tasks;
- `tests/deploy.test.js` across all deployment tasks.

Maximum parallel implementation would create avoidable merge conflicts and make it easier to lose an assertion or security constraint. A single long-running executor is also rejected because it would accumulate too much context and defer feedback until the most expensive point.

## 5. Required corrections to the source plan

The reconciled implementation plan must preserve the source plan's goals and scope while replacing any concrete step or code fragment that conflicts with the corrections below. In particular, the source plan's Task 2 file list, Task 4 host-normalisation details, and Task 5 switch/rollback snippets are superseded and must not be copied unchanged.

### 5.1 Cover every public maturity label surface

`src/pages/guides/index.astro` contains public filter labels for `Complete route` and `Core route`. The maturity-label task must update this surface and add a focused assertion so the public interface consistently describes editorial structure rather than source assurance.

Stored enum values and existing guide frontmatter remain unchanged.

### 5.2 Validate Nginx before switching the release

The deployment sequence must be:

1. build and test the candidate;
2. create the immutable release directory;
3. verify the candidate contains required static output, including `index.html`;
4. install or stage the redirect configuration;
5. run `nginx -t` to validate the complete Nginx configuration and staged redirect include;
6. switch `current` atomically;
7. reload Nginx;
8. run authorised smoke checks.

The pre-switch gate validates Nginx syntax/configuration plus candidate-release filesystem completeness. It does not claim that `nginx -t` serves or exercises the candidate release before `current` changes. The workflow must not switch `current` before all pre-switch gates succeed.

### 5.3 Roll back to an explicitly verified release

Rollback must not infer a target from directory modification time.

The chosen contract is an explicit verified release ID:

- `rollback.sh` requires exactly one release ID argument;
- the argument must match the permitted commit-addressed release-ID format;
- the target must resolve inside `$RELEASES_DIR` and contain `index.html`;
- the target must differ from the current release;
- rollback refuses missing, malformed, nonexistent, incomplete, or current-release targets;
- the operator must obtain the release ID from the authorised deployment record that identifies a previously verified release.

The implementation and regression tests must not contain an mtime-based fallback. If no previously verified release ID exists, production deployment is blocked until a separately authorised production-verification plan establishes a rollback baseline.

### 5.4 Make apex and `www` behavior explicit

`https://visalang.org` is the sole canonical production origin.

The Nginx contract must explicitly define:

- HTTP apex to HTTPS apex;
- HTTP `www` to HTTPS apex;
- HTTPS `www` to HTTPS apex;
- no redirects built from an arbitrary request `Host` value.

The local deployment regression test must verify that:

- the template does not contain `https://$host`;
- the HTTP redirect uses the fixed `https://visalang.org$request_uri` target;
- an HTTPS `www.visalang.org` server block redirects to the apex host;
- the canonical HTTPS `visalang.org` server block serves `/var/www/$DOMAIN/current`.

Actual DNS, certificate coverage, and live redirect behavior remain unverified until a separately authorised production window.

## 6. Execution waves

## Wave 0: Baseline and plan reconciliation

### Purpose

Establish the exact implementation baseline and incorporate the four corrections above before changing product or deployment code.

### Work

- Confirm branch, working tree, and untracked files.
- Confirm current source-plan target files and their pre-change behavior.
- Run the smallest relevant existing tests to establish a known baseline.
- Confirm `graphify-out/` is excluded from staging and edits.
- Finalise the implementation file map and dependency graph.

### Gate

No implementation starts until:

- baseline commands and results are recorded;
- the file map includes `src/pages/guides/index.astro` and `deploy/server-init.sh`;
- the deployment design includes candidate filesystem checks and pre-switch `nginx -t`;
- the rollback design requires an explicit verified release ID and contains no mtime fallback;
- apex/`www` host normalisation and its regression assertions are specified.

## Wave 1: Public trust boundary

Wave 1 runs sequentially because its tasks share `tests/site.test.js` and site-wide trust surfaces.

### Task 1: Advertising and policy alignment

- Write failing no-ad assertions.
- Remove the unconditional AdSense loader.
- Update Privacy and Cookie policy copy to describe the current no-ad/no-CMP state.
- Remove `public/ads.txt` without replacing it with an empty file.
- Run focused tests, then `npm test`.

### Task 2: Maturity and source-assurance separation

- Write failing assertions for conservative English and Chinese labels.
- Add a focused assertion that `src/pages/guides/index.astro` exposes `Route structure complete` and `Core route structure`, not the old public labels.
- Update `src/data/source-review.ts`, `GuideStatusBadge.astro`, and `src/pages/guides/index.astro`.
- Do not rename stored enum values or alter guide frontmatter.
- Run focused tests, `npm test`, and `npm run launch-check`.

### Task 3: Route Finder URL minimisation and neutral handoff

- Write failing assertions for the persistence whitelist and neutral fallback.
- Persist only enumerated non-free-text fields.
- Do not persist `location` or `targetDate`.
- Make shared fallback links route-neutral.
- Add configured-route guide, Checklist, and Timeline next actions without prefilled personal planning data.
- Preserve the generic official-verification fallback for unsupported routes.
- Run focused tests, `npm test`, and `npm run launch-check`.

### Wave 1 review gate

A reviewer who did not author the changes must confirm:

- no advertising or analytics network loads from the shared layout;
- policy copy matches the implementation;
- maturity labels do not imply official review;
- URL persistence excludes free-text and date values;
- unsupported routes do not receive Germany-specific handoffs;
- no guide claims, content frontmatter, global CSS, or legacy HTML changed.

Wave 2 cannot start while Wave 1 has unresolved blocking findings or failing verification.

## Wave 2: Deployment safety boundary

Wave 2 runs sequentially because all tasks share deployment scripts and regression tests.

### Task 4: Domain and executable redirect contract

- Create the deployment regression test first.
- Assert the Nginx template contains no `https://$host` redirect.
- Assert HTTP apex/`www` use the fixed `https://visalang.org$request_uri` target.
- Assert HTTPS `www.visalang.org` redirects to apex and the canonical HTTPS apex server serves `current`.
- Add the Nginx legacy redirect adapter.
- Set the default domain to `visalang.org` in active deployment scripts and instructions, including `deploy/server-init.sh`.
- Serve the versioned `current` symlink.
- Preserve `public/_redirects` for non-Nginx adapters.
- Keep the advertising-disabled CSP; do not add Google domains.

### Task 5: Test-gated atomic release and rollback

- Extend failing tests for release gates, atomic switching, and rollback.
- Refuse a dirty server source tree.
- Use `pull --ff-only`; do not stash server changes.
- Run `npm ci`, `npm test`, and `npm run launch-check` before publishing.
- Copy a complete build into a commit-addressed immutable release directory.
- Verify the candidate release contains `index.html` before any switch.
- Install or stage the redirect include, then run `nginx -t` before switching `current`.
- Atomically switch `current` only after all pre-switch gates pass.
- Require `rollback.sh <verified-release-id>` and validate its format, containment, completeness, existence, and difference from `current`.
- Reject rollback when no explicit verified release ID is available; do not infer a target by mtime.
- Keep previous releases; do not delete them during the same deployment.

### Task 6: Prepared production smoke checks and operations documentation

- Create the smoke script test-first.
- Check representative 200 routes, legacy 301 redirects, canonical host, robots, sitemap, and no-ad state.
- Document deploy, smoke, and rollback interfaces.
- State that production smoke and rollback require a separate authorised window.
- Do not execute production commands during implementation.

### Wave 2 review gate

Three independent review lanes run in parallel:

1. **Code review:** correctness, regressions, scope, test quality.
2. **Security/privacy review:** CSP, policy accuracy, URL minimisation, shell input and host handling.
3. **Deployment review:** dirty-tree refusal, immutable release creation, candidate completeness checks, pre-switch validation, atomic switching, explicit verified-release-ID rollback, redirect completeness, failure modes.

Blocking findings return to the relevant task executor. The executor reruns focused verification, and the reviewer verifies the correction.

## Wave 3: Final local verification and evidence

### Required checks

- `git diff --check`
- changed-file review and scope audit
- scan changed files for `TODO`, `TBD`, placeholders, `.skip`, `.only`, stubs, and unimplemented branches
- `npm test`
- `npm run launch-check`
- local preview checks for canonical, no-ad state, and policy copy
- independent final verifier review

### Evidence rules

`docs/TASK_LOG.md` and `docs/OPERATIONS_STATUS.md` may record only facts verified in this checkout.

Allowed local evidence includes:

- advertising integration removed from source;
- Privacy/Cookie copy aligned with source;
- maturity labels clarified;
- Route Finder persistence reduced;
- deployment regression tests added;
- atomic release and rollback scripts added;
- local `npm test` and `npm run launch-check` results.

The following remain explicitly unverified unless separately exercised under authorisation:

- DNS;
- TLS and certificate coverage;
- live Nginx configuration and response headers;
- live redirects;
- live production smoke tests;
- live production rollback;
- Search Console or analytics behavior.

## 7. Agent responsibilities

### Main coordinator

- Owns the dependency graph and task state.
- Provides each subagent with a narrow, self-contained prompt.
- Prevents simultaneous edits to shared files.
- Integrates review findings and reports actual outcomes.
- Does not self-approve the final implementation.

### TDD executor

- Owns one task at a time.
- Writes the smallest failing assertion first.
- Confirms the expected RED state.
- Implements the minimum change.
- Runs focused verification and reports exact results.
- Does not expand into adjacent cleanup or deferred work.

### TypeScript/Astro reviewer

- Reviews Wave 1 correctness, rendering contracts, test quality, and regressions.
- Confirms no guide claims or unrelated UI changed.

### Security/privacy reviewer

- Reviews advertising/CSP/policy consistency.
- Reviews URL persistence and untrusted query handling.
- Reviews shell variables, host handling, permissions, and sensitive output risks.

### Deployment reviewer

- Reviews Bash and Nginx behavior.
- Exercises deployment regression tests locally.
- Reviews every failure point before and after atomic switching.
- Confirms rollback requires and validates an explicit previously verified release ID, with no mtime fallback.

### Final verifier

- Runs the complete local verification suite from a clean understanding of the requirements.
- Confirms changed files contain no blockers or unrelated changes.
- Confirms documentation states unverified production facts accurately.

## 8. Stop and escalation conditions

Implementation stops and returns to the coordinator if:

- the working tree contains unexpected changes in a target file;
- a task would require editing legacy HTML, guide claims, global CSS, or content frontmatter outside approved scope;
- a test failure indicates a broader pre-existing regression;
- deployment behavior requires unknown server paths, privileges, DNS choices, or certificate assumptions;
- a production command, remote access, or externally visible action would be required;
- a reviewer identifies a security or privacy issue that changes the approved architecture.

Production access, deployment, smoke testing, and rollback require a separate user decision and a separate production-verification plan.

## 9. Completion criteria

This execution design is complete when:

- every source-plan Phase 0 criterion has code and test evidence;
- the four plan corrections in Section 5 are implemented and tested;
- all focused and full local verification commands pass;
- no blocking reviewer findings remain;
- no deferred feature or production operation entered scope;
- `graphify-out/` remains untouched and unstaged;
- evidence documents distinguish local verification from production verification;
- the next handoff is an optional, separately approved production verification window.
