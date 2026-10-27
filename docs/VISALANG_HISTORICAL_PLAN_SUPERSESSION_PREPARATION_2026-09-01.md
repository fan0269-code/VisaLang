# VL-GOV-003A read-only preparation report

> **superseded preparation:** retained as point-in-time evidence. The former planning-chain filenames and captured snippets below describe a retired package and no longer resolve by design. Current execution authority is `docs/VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md`.

- Inspection scope: current working-tree copies of the six requested files, the 2026-09-01 three-layer planning chain, the detailed taskbook, and the execution board.
- VL-GOV-003A sub-scope change: created this preparation report. Wider batch 2 also created the companion `VL-GOV-004` preparation report and updated only the two corresponding execution-board rows plus one TASK_LOG entry. None of the six inspected target files, README, `CONTENT_WORKFLOW`, runtime, route or content files was edited; no superseded banner or workflow change was applied.
- Result type: preparation only. This is **not** completion, approval, owner authorization, or an Independent Auditor `PASS` for `VL-GOV-003A`.
- Link note: none of the six inspected files uses YAML front matter, and their existing file references are backticked paths rather than Markdown hyperlinks. All exact referenced repository paths listed below currently resolve, except the `CONTENT_WORKFLOW.md` bare `.html` names resolve only under legacy `guides/`, not at repository root.

## 1. Controlling planning basis

The current working tree defines the authority chain as:

1. `docs/VISALANG_MASTER_ROADMAP_2026-09-01.md` — long-term strategy.
2. `docs/VISALANG_CURRENT_STATE_2026-09-01.md` — current state/evidence/blockers.
3. `docs/VISALANG_90_DAY_EXECUTION_PLAN_2026-09-01.md` — rolling execution.

The implementation detail is `docs/VISALANG_DETAILED_EXECUTION_TASKS_2026-09-01.md`. It states that it does not replace owner authorization. The master roadmap states that historical plans remain point-in-time evidence and are not current execution authority when they conflict with the three current documents. The detailed taskbook restricts `VL-GOV-003A` to the four named historical plans, says to preserve their bodies, and assigns any `CONTENT_WORKFLOW.md` change to a separate evaluation/task.

The 90-day plan also requires README to point to the three-layer chain before production/release evidence. The current execution board is the status source for the task IDs, but it is not owner or deployment authorization.

## 2. One exact additive banner for the four historical plans

Use this same blockquote immediately after the H1 in each of the four named historical plans. Do not delete or replace the old metadata/status text.

```md
> **状态（2026-09-01）：已被取代（superseded）的历史规划，仅保留为点时证据，不是当前执行授权。** 当前唯一执行权威为[方案三一周计划](./VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md)。下文（包括旧状态行）中的旧状态、期限、优先级和链接不构成现行指令。
```

Why this is the smallest safe common banner:

- It says `superseded` and “not current execution authority” directly.
- It uses real relative Markdown links to all three current layers and the detailed taskbook.
- It neutralizes obsolete priority pointers inside the old body without rewriting or deleting historical evidence.
- It does not imply that the detailed taskbook or a local check grants owner/deployment authorization.

All four new relative targets exist in the inspected working tree.

## 3. File-by-file findings

### 3.1 `docs/NEXT_STAGE_PHASE_0_EXECUTION_PLAN_2026-08-21.md`

Exact current opening:

```text
1: # VisaLang 下一阶段 Phase 0 具体执行计划
2:
3: > 日期：2026-08-21
4: > 上位任务书：`docs/NEXT_STAGE_EXECUTION_TASKBOOK_2026-08-21.md`
5: > 执行范围：VL-N1～VL-N5 发布基线收敛包
6: > 周期：3–5 个工作日
7: > 默认边界：只做本地盘点、验证、文档收敛和候选准备；本计划不自动授权 commit、push、deploy、外部账号或生产变更。
8: > 完成状态：本计划的 local-preparation 与 Security → App 应用发布均已完成，应用基线为 `80c6d04`。包含本记录的 docs-only governance commit 是获批后继 source/release；第 1～9 节是计划和点时证据，第 10 节是该治理后继之前的应用发布结果。
9:
10: ## 1. 阶段目标
```

**Misread risk: yes, high.** “下一阶段”, “上位任务书”, an execution scope, and a live-looking 3–5 day duration still make it look actionable. The local/deployment boundary does not say that the plan itself is superseded, and there is no direct pointer to the 2026-09-01 chain.

**Banner:** add the exact common banner from section 2 after line 1.

**Existing references/history to preserve:**

- line 4: `docs/NEXT_STAGE_EXECUTION_TASKBOOK_2026-08-21.md`;
- line 44: `docs/RELEASE_CANDIDATE_MANIFEST_2026-08-21.md`;
- line 148: `docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md`;
- the dated scope, duration, boundary, `80c6d04`, and historical status/result text;
- the `https://registry.npmjs.org` registry argument in the historical verification command.

These references currently resolve and must remain historical evidence, not be relabeled as the current chain.

### 3.2 `docs/CONTENT_UPDATE_PLAN_2026-08-14.md`

Exact current opening:

```text
1: # VisaLang 内容更新计划（FAN-24）
2:
3: 状态：待 CEO 确认
4: 制定日期：2026-08-14
5: 计划周期：确认后 20 个自然日，按最小垂直切片执行
6: 计时口径：计划获批当日为 Day 1；若 2026-08-14 获批，Day 20 为 2026-09-02
7: 实现真相源：`src/content/guides/`、`src/data/`、`src/pages/`
8:
9: ## 1. 执行结论
```

**Misread risk: yes, highest of the four historical plans.** “待 CEO 确认” plus an approval-triggered 20-day clock looks like an open proposal that can still be approved. The body gives a future execution order and fallback that do not carry the current Phase/data gates.

**Banner:** add the exact common banner from section 2 after line 1.

**Existing references/history to preserve:**

- line 7: `src/content/guides/`, `src/data/`, `src/pages/`;
- line 42: the `src/content/guides/*.md` snapshot basis;
- lines 53, 75, and 173: `docs/CONTENT_MAP.md`;
- lines 75 and 173: `docs/TASK_LOG.md`;
- lines 3–6 as historical proposal metadata, including “待 CEO 确认”. Do not retroactively change it to approved, rejected, or completed.

### 3.3 `docs/TRAFFIC_SITE_ROADMAP.md`

Exact current opening:

```text
1: # VisaLang Traffic-Site Roadmap
2:
3: Date: 2026-07-02
4:
5: > 状态（2026-07-13）：历史战略参考，不是执行授权。任何分析、留资、邮件、广告、联盟、支付或新路线扩张，必须先遵循 `docs/MASTER_EXECUTION_PLAN.md` 的阶段顺序，并满足 `docs/OPERATIONS_STATUS.md` 的当前门禁。若本文件与上述文件冲突，以后二者为准。
6:
7: ## Traffic-site thesis
```

**Misread risk: yes, indirect but material.** Line 5 already says the roadmap is historical and not execution authorization. However, the same line sends the reader to the older `MASTER_EXECUTION_PLAN.md` and says that old plan plus `OPERATIONS_STATUS.md` prevails. That is now an obsolete authority route. The expansion ideas below can then look like current priorities.

**Banner:** add the exact common banner from section 2 after line 1. Keep line 5 intact as a dated status statement. The new banner’s “including old status line” sentence makes clear that line 5’s old priority rule is historical.

**Existing references/history to preserve:**

- line 5: `docs/MASTER_EXECUTION_PLAN.md` and `docs/OPERATIONS_STATUS.md`;
- the 2026-07-02 date and 2026-07-13 status text;
- the route, traffic, email, affiliate, ad, and expansion ideas as historical strategy, not current authorization.

### 3.4 `docs/MONETIZATION_ROADMAP.md`

Exact current opening:

```text
1: # VisaLang Monetization Roadmap
2:
3: Date: 2026-07-02
4:
5: > 状态（2026-07-13）：历史商业策略参考，不是执行授权。任何分析、留资、邮件、广告、联盟、支付、人工服务或产品交付，必须先遵循 `docs/MASTER_EXECUTION_PLAN.md` 的阶段顺序，并满足 `docs/OPERATIONS_STATUS.md` 的当前门禁。若本文件与上述文件冲突，以后二者为准。
6:
7: ## Core Principle
```

A second near-top directive is:

```text
17: For the traffic-first version of this strategy, use `docs/TRAFFIC_SITE_ROADMAP.md`. For display-ad setup, use `docs/AD_NETWORK_ONBOARDING.md`.
```

**Misread risk: yes, indirect but high impact.** The old disclaimer routes current decisions through `MASTER_EXECUTION_PLAN.md`, and line 17 says “use” other strategy/setup documents. This can be read as permission to start commercial work even though the current chain requires evidence, owners, capability gates, and separate authorization.

**Banner:** add the exact common banner from section 2 after line 1. Preserve line 5 as a dated historical statement rather than silently rewriting its old priority rule.

**Existing references/history to preserve:**

- line 5: `docs/MASTER_EXECUTION_PLAN.md` and `docs/OPERATIONS_STATUS.md`;
- line 17: `docs/TRAFFIC_SITE_ROADMAP.md` and `docs/AD_NETWORK_ONBOARDING.md`;
- line 40: `affiliate-disclosure.html`;
- the dates, old status, commercial ideas, gates, and “do not sell certainty” boundaries as historical strategy.

### 3.5 `README.md`

Exact current opening:

```text
1: # VisaLang
2:
3: VisaLang is a live, official-source-first language-exam navigation site for visa, residency, citizenship, study and work-registration paths. Its strongest public routes are Germany A1 family reunion and Germany B1 settlement/citizenship.
4:
5: VisaLang is an independent information and verification navigator. It does not decide eligibility, certificate acceptance, visa outcomes or individual legal questions.
```

Exact current authority/boundary block:

```text
53: ## Current Execution Authority
54:
55: Read these documents in order before starting maintenance:
56:
57: 1. `docs/VISALANG_MASTER_ROADMAP_2026-09-01.md`
58: 2. `docs/VISALANG_CURRENT_STATE_2026-09-01.md`
59: 3. `docs/VISALANG_90_DAY_EXECUTION_PLAN_2026-09-01.md`
60: 4. `docs/OPERATIONS_STATUS.md`
61: 5. `docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md`
62: 6. `docs/RELEASE_CANDIDATE_MANIFEST_2026-08-21.md`
63: 7. `PROJECT_CONTEXT.md`
64: 8. `AGENTS.md`
65:
66: `docs/MASTER_EXECUTION_PLAN.md`, `docs/NEXT_STAGE_PHASE_0_EXECUTION_PLAN_2026-08-21.md` and `docs/NEXT_STAGE_EXECUTION_TASKBOOK_2026-08-21.md` remain historical planning evidence. They do not independently authorize new pages, analytics, forms, advertising changes, payments, commits, pushes or deployment.
67:
68: ## Current Boundary
69:
70: The repository and governance baseline is `2ef029f`, with local `main` and `origin/main` synchronized at that commit before the current uncommitted planning scope. The recorded production application payload baseline remains `80c6d04`; this repository fact does not prove the current public production commit without a fresh production check. The next work package is real Search Console evidence plus separate Analytics, AdSense and Google Privacy & messaging CMP decisions and account/browser evidence before content expansion or commercial change. The old daily-20 content automation remains paused and is not an authorized execution plan.
71:
72: Any commit, push, deployment, production change or external-account action requires separate explicit owner authorization.
```

**Misread risk: partial.** README is the intended current entry point, so it must not receive a superseded banner. Lines 57–59 correctly put the three current layers first. Risks remain:

1. The single numbered list makes lines 60–64 look like layers 4–8 of the same planning authority instead of supporting controls/evidence.
2. The detailed 2026-09-01 taskbook and current execution board are missing.
3. Line 70 names Search Console/account evidence as “the next work package”, while the execution board currently has `VL-GOV-003A` gated behind incomplete `VL-GOV-003`, `VL-GOV-001/002` blocked, and the Search Console tasks blocked on `VL-GOV-002`/authorization. This sentence can bypass the current dependency/status view.

**Superseded banner:** none.

**Smallest safe README correction:** keep lines 57–59 in their order, then split the rest into labels rather than one authority list:

- **Current planning chain:** the existing three documents.
- **Detailed task scope/status:** add `docs/VISALANG_DETAILED_EXECUTION_TASKS_2026-09-01.md` and `docs/VISALANG_EXECUTION_BOARD_2026-09-01.md`.
- **Supporting controls and production/release evidence:** preserve `docs/OPERATIONS_STATUS.md`, `docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md`, `docs/RELEASE_CANDIDATE_MANIFEST_2026-08-21.md`, `PROJECT_CONTEXT.md`, and `AGENTS.md`.
- Preserve line 66’s three historical-plan references and non-authorization sentence.
- Replace the fixed “next work package” claim with an instruction to read the execution board for current task/dependency status. Keep the `2ef029f`/`80c6d04` evidence boundary and line 72 exactly unless a separately authorized evidence update changes them.

**Other current paths to preserve:** source-of-truth references at lines 42–49 (`src/pages/`, `src/content/guides/`, `src/components/`, `src/layouts/`, `src/data/`, `src/styles/global.css`, `public/`, `tests/`, `scripts/`) and the generated/legacy boundaries for `dist/`, `.astro/`, `node_modules/`, and root `index.html`.

### 3.6 `docs/CONTENT_WORKFLOW.md`

Exact current opening:

```text
1: # VisaLang Content Workflow
2:
3: ## Goal
4:
5: Publish useful exam guides that are accurate, source-backed, and safe.
6:
7: ## Operating Prompts
8:
9: Use these copyable prompts when running VisaLang as a traffic site:
10:
11: - `docs/DAILY_TRAFFIC_MONITORING_PROMPT.md`: daily Search Console / Analytics review that turns real data into no more than 3 actions.
12: - `docs/CONTENT_UPDATE_PROMPT.md`: source-safe content update and new-page planning prompt, with Germany A1 as the first route.
13: - `docs/CEO_OPERATING_AUDIT_PROMPT.md`: CEO-level operating review for priorities, gaps, growth, conversion, and monetization readiness.
14: - `docs/COO_OPERATING_PLAYBOOK_PROMPT.md`: COO-level operating review that turns content, SEO, conversion, data, trust, and monetization ideas into weekly execution.
15: - `docs/WEEKLY_OPERATING_REVIEW.md`: weekly review template for traffic, content, conversion, trust, monetization, and next-week tasks.
```

Its current legacy batch block is:

```text
46: ## First 10 Pages
47:
48: Germany family-visa batch now created in `guides/`:
49:
50: - `goethe-a1-germany-family-reunion.html`
51: - `goethe-a1-fees-by-country.html`
52: - `goethe-a1-speaking-topics.html`
53: - `goethe-a1-vs-telc-a1.html`
54: - `german-family-reunion-language-requirement.html`
55: - `goethe-a1-30-day-study-plan.html`
56: - `goethe-a1-test-centers.html`
57: - `goethe-a1-retake-policy.html`
58: - `german-a1-documents-checklist.html`
59: - `goethe-a1-official-links-practice-resources.html`
```

**Misread risk: yes, high.** It has no authority/scope notice. “Use” and “when running VisaLang as a traffic site” can look like permission to run prompts. It lacks the current gates and all five controls named in the taskbook. The generic page template can also encourage a broad exam encyclopedia rather than one distinct user intent. Lines 46–59 send maintainers toward legacy `guides/`/`.html` assets even though `src/` is the implementation source of truth.

**Superseded banner:** none. The taskbook says to evaluate/update this supporting workflow in a separate task, not mark it as one of the four superseded plans.

**Smallest boundary note for that separate update:** add this after line 1:

```md
> **执行边界（2026-09-01）：** 本段是被保留的历史提案，不是独立执行授权。当前工作包仅由[方案三一周计划](./VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md)限定；本文件不授权新增页面、外部账号操作、commit、push、部署或生产变更。
```

**Existing references to preserve but subordinate:** the five prompt/template paths on lines 11–15. Relabel them as optional aids inside an already authorized work package. The ten `.html` names on lines 50–59 do exist under legacy `guides/`, and matching Markdown guide sources exist under `src/content/guides/`; do not silently delete the historical list. Mark it as a historical first batch or replace it with current source/route references only in the separate workflow scope.

## 4. Focused proposed `CONTENT_WORKFLOW.md` update (separate task)

Keep this narrow. Add the boundary note above, keep the useful source rules, and add these sections before the publishing checklist.

### 4.1 Scope and intent matrix before drafting

Require a work-package/task ID and an approved scope. Require one row per proposed page/update:

```md
| Primary query/evidence window | User decision/job | Route + jurisdiction | Existing canonical URL and `src/` file | Adjacent queries/intents | Overlap/cannibalization risk | Final deciding authority | Source URL + checked date + supported claim + boundary | Decision: update/consolidate/new/no page | Intended next action and internal links |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
```

Rules:

- One canonical page per primary user intent. Map adjacent intents before deciding to create a page.
- Prefer update/consolidation when an existing page already serves the same job. Do not create synonym/thin pages.
- Search demand does not prove an official rule. A page’s existence does not prove demand.
- With no approved real demand data, do not infer a growth priority or expand the content set. Source-risk maintenance may proceed only within the current gate/scope.
- Record national authority, competent local/receiving authority, official exam provider, and official application/qualification platform as applicable. A general overview cannot prove a local, programme, centre, or individual outcome.
- Convert an unconfirmed fee, deadline, acceptance, exemption, eligibility, processing time, or local rule into a concrete reader-side verification action.

### 4.2 Tests first and minimal source change

1. Before implementation, add or update a focused Node assertion for any changed route, behavior, metadata, required link, navigation relation, discovery state, schema, or safety/source contract. Confirm that it fails for the intended reason; if no regression can reasonably apply, record the reason.
2. Make the smallest change under `src/`. Do not hand-edit `dist/`, `.astro/`, `node_modules/`, or legacy root assets as the implementation source.
3. Run and record the focused assertion, `npm test`, and `git diff --check`.
4. Run and record `npm run build` and `npm run launch-check` for route, navigation, metadata, schema, discovery, or deployment-facing changes.
5. Actual test results are verification inputs. They are not owner acceptance, release authorization, or deployment evidence.

### 4.3 Records and Vault sync

- Update `docs/TASK_LOG.md` for the completed maintenance window.
- After every content-facing change, create or update one review record under `/Users/fanlw/Documents/Website-Content-Hub/10-visalang.org网站维护/30-待审核/网站更新记录/` using `/Users/fanlw/Documents/Website-Content-Hub/50-内容模板/网站更新同步记录模板.md`.
- Record branch, baseline/result commit when available, changed files, content summary, planning/taskbook basis, official sources with checked dates/support boundaries, actual verification, risks, and the owner decision needed.
- Set `status: review`, `needs_human_review: true`, `owner_decision: pending`, `deployment_status: not_started`. Never record approved, previewed, deployed, or published for the owner.
- Preserve unrelated repository and Vault changes.

### 4.4 Independent Auditor gate

- The implementer requests the separate, read-only VisaLang Independent Auditor described in `docs/VISALANG_INDEPENDENT_AUDITOR_AGENT.md`.
- The implementer cannot be the sole reviewer and cannot mark their own work review-passed.
- The implementer closes every scoped P0, P1, and P2 finding. The same Auditor re-reviews the corrected scope and returns `PASS`.
- If `PASS` cannot be obtained inside the authorized scope, report the blocker. Automated checks and self-review do not substitute for this gate.
- Auditor `PASS` does not grant owner acceptance, commit/push permission, deployment approval, or an individual immigration/exam outcome.

### 4.5 Owner, release, and deployment boundaries

- Record the task ID, implementation scope, Implementer, approval owner, source authority owner where needed, forbidden actions, and evidence location before work.
- Do not start a new page/content expansion unless the current stage gate and task scope permit it. Do not use a prompt, checklist, query, or historical plan as authorization.
- Content/source completion, test success, Auditor `PASS`, Task Log update, and Vault sync are distinct states. None authorizes commit, push, deployment, production change, smoke, or external-account work.
- Each external action requires separate explicit owner authorization. Record the immutable candidate/commit, authorization, release, production smoke, rollback evidence, and owner acceptance separately.
- Never imply payment, delivery, message receipt, manual service, official acceptance, eligibility, or an individual outcome without confirmed implementation/evidence and the competent authority’s decision.

Also retitle `## First 10 Pages` as a dated historical batch, or map it to current `src/content/guides/*.md` and public routes in a separately approved workflow change. Do not continue presenting legacy `.html` assets as the implementation source.

## 5. Blockers and stop conditions

1. `VL-GOV-003A` is currently `GATED`; its prerequisite `VL-GOV-003` is not complete.
2. Batch 1 received root-level Independent Auditor `PASS` with `findings: []`. The execution board records `VL-000` as `REVIEW_PASS_OWNER_PENDING` and `VL-GOV-003` as `PREPARED_BLOCKED`: the review gap is closed, but Business Owner acceptance, Programme/Business owner mapping and the `VL-000` dependency remain open. No draft is approved or unlocked by the PASS alone.
3. `VL-GOV-001/002` owner and responsibility inputs are also blocked. No historical executor may be inferred to be the current owner.
4. The current three-layer files, detailed taskbook, execution board, evidence register, and related 2026-09-01 documents are untracked in the inspected working tree; README is modified. This report describes that working tree, not a committed or deployed baseline. Existing unrelated changes must not be overwritten or cleaned.
5. The taskbook explicitly puts the `CONTENT_WORKFLOW.md` change in a separate evaluation/task. It must not be folded into the four-banner governance edit without a new scoped task/owner boundary.
6. Any eventual repository change needs focused verification, a separate VisaLang Independent Auditor review with P0–P2 closed and final `PASS`, and record sync. This read-only preparation is not that review.
7. No commit, push, deployment, production change, external-account access, or owner decision was authorized or performed here.

Therefore, this report must not be used to mark `VL-GOV-003A` `DONE` or complete. It is only a ready-to-apply proposal after the recorded dependency and authorization gates are satisfied.
