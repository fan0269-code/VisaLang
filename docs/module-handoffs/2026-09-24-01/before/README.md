# VisaLang

## 2026-09-24 全站扫描与下一阶段入口

[全站扫描报告](docs/PROJECT_SCAN_2026-09-24.md) · [内容/UI实施增补](docs/superpowers/plans/2026-09-24-visalang-next-stage-content-ui.md) · [7份当前Codex提示词](docs/prompts/2026-09-24-next-stage/README.md)。原34任务25完成/5进行中/4待开始，73.5%仅是原任务数的本地完成比例；当前M5发布候选，未部署。61指南中20支柱、41支持/参考页仍需价值复盘，noindex不等于整改完成。

先P00重新冻结9/24当前工作树，再首批W03/W04/W08。9/23副本是历史准备状态，不能覆盖TypeSafe成果。用途建议目前支持laya/typesafe，但发布脚本仍强制广告＋一个provider；独立core-only尚未实现。新包只更新规划与可执行指令，没有启动功能实现、API调用、提交或部署。sync `VL-PMAP-20260924-06`，drift `aligned`；独审权威为`docs/planning-map/VISALANG_PROJECT_SCAN_INDEPENDENT_AUDIT_2026-09-24.md`，以其完整字节绑定结论为准。Vault目录/模板缺失，实际同步blocked。

## TypeSafe AI 接入 — 2026-09-24

[使用规范与接入方案](docs/superpowers/plans/2026-09-24-typesafe-project-adoption.md)及其启用增补记录当前实现：用途分类使用服务端 TypeSafe API，保留用户确认、手选回退和确定性路线规则。API key 只在忽略的 `.env.local` 中配置；文本发送给 TypeSafe 前，界面说明美国处理与供应商保留政策。当前只做一条合成输入连通验证；模型效果未评测，生产未部署。后续 AI 工作按 `AGENTS.md` 读取技能与方案。

本次启用规划同步为 `VL-PMAP-20260924-05`；`-01` 保留为前一提案窗口，`-02` 记录首轮修复审查，`-03` 记录 Laya 超时线程生命周期复审，`-04` 记录代码与证据审查。完整审核结论只适用于报告绑定的 sync.json 字节，见 `docs/planning-map/VISALANG_TYPESAFE_ENABLEMENT_INDEPENDENT_AUDIT_2026-09-24.md`。服务端正式部署仍须经过对应环境的证据门禁与单独授权。

## 2026-09-23 W00 隔离分配准备（当前增补）

本轮 Owner 已发送 W00 调度提示词，授权本地冻结、分配和验证；按其优先顺序准备 W01、W02、W08，未把功能模块自动派发。[分配与字节证据](docs/module-handoffs/2026-09-23-01/README.md)及 `docs/module-handoffs/2026-09-23-01/dispatch.json` 是本批实际分配记录。当前工作树 1,115 文件已冻结，三份无 .git 的完整候选及独立依赖已逐项校验；省略的两个可选外部仓库和纳入的15份旧实验日志已登记。

本轮无模块 handoff、无产品集成，W01/W02/W08 状态为 prepared_awaiting_owner_dispatch；LP/LC 仍 pending，原 T=25完成/5进行中/4待开始不变。真人、目标主机、账户与上线观察均未取得；W01无真人保持partial，W02不等待W01通过，W08本地成果不替代LP05a真实环境验收。W09消费已集成W08契约；W10无真人收益证据不能继续W11/12；W13/14仍按自身需求；W16三候选分别核对，W17从真实发布计时。

本轮为分配准备维护窗口，sync `VL-PMAP-20260923-05`，drift `aligned`；审核权威仅为 `docs/planning-map/VISALANG_W00_DISPATCH_INDEPENDENT_AUDIT_2026-09-23.md`，结论以该独立报告及最终实际测试为准。历史增补保留为各自冻结窗口。Vault目录/模板缺失，待同步payload为blocked；无提交、推送、部署、招募、模型运行或外部账户行动授权。


## Current module execution prompts — 2026-09-23

[Module prompt directory](docs/prompts/2026-09-23-module-build/README.md) · [Dispatch plan](docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md). The current plan is split into 17 functional windows plus one serial integration window and one independent audit window. Start by assigning W00; W01 reader preparation, W02 bounded Laya checks and W08 core decoupling can then proceed in isolated copies of the current dirty baseline. Later work retains its original evidence gates. These are reusable instructions, not completed implementation or authorization for every module to run.

Current sync: `VL-PMAP-20260923-04`; review authority: `docs/planning-map/VISALANG_MODULE_PROMPTS_INDEPENDENT_AUDIT_2026-09-23.md`. Existing T/LP/LC execution and publication states remain unchanged. The diagram topology and independent core/Laya/ads release boundaries are preserved.

VisaLang is a live, official-source-first language-exam navigation site for visa, residency, citizenship, study and work-registration paths. Its strongest public routes are Germany A1 family reunion and Germany B1 settlement/citizenship.

VisaLang is an independent information and verification navigator. It does not decide eligibility, certificate acceptance, visa outcomes or individual legal questions.

## Current Stack

- Astro static site with TypeScript
- Markdown guide collection under `src/content/guides/`
- Shared layouts and components under `src/layouts/` and `src/components/`
- Static output in `dist/`
- `@astrojs/sitemap`, structured data, canonical/hreflang and fail-closed discovery/advertising gates
- Node assertion suites and a production-oriented launch check

Root-level HTML/CSS/JS files are legacy compatibility assets. Do not use them as the source for new work and do not deploy them instead of the Astro `dist/` output.

## Local Development

Run from the repository root:

```bash
npm ci
npm run dev
```

Then open the URL printed by Astro. Do not preview the current application by opening the legacy root `index.html` directly.

To exercise Route Finder's optional purpose suggestion, prepare the ignored `.env.local` with `TYPESAFE_API_KEY` and `PURPOSE_PROVIDER=typesafe`, then start the service from another terminal after installing `services/laya-purpose/requirements-typesafe.txt`:

```bash
set -a
source .env.local
set +a
python3 -m uvicorn app:app --app-dir services/laya-purpose --host 127.0.0.1 --port 8011 --no-access-log
```

The Astro development proxy forwards the same-origin endpoint to that local service. Never place the API key in `PUBLIC_*`, browser code, a shell command argument, or tracked file. Do not use personal or immigration case text in provider smoke checks.

## Verification

```bash
npm test
npm run build
npm run launch-check
git diff --check
```

`npm run launch-check` rebuilds the site and validates generated routes, metadata, links, structured data, discovery gates and advertising exclusions. A successful local check is not deployment or owner approval.

## Source of Truth

- `src/pages/`: public routes
- `src/content/guides/`: English guide content
- `src/components/`, `src/layouts/`: shared UI and page shells
- `src/data/`: route, product and navigation data
- `src/styles/global.css`: design system and global styles
- `public/`: deployment-facing static assets, redirects, robots and headers
- `tests/`: regression contracts
- `scripts/`: build, sitemap, launch and production smoke helpers

Do not hand-edit `dist/`, `.astro/` or `node_modules/`.

## Current Execution Authority

The 2026-09-08 Master Package under
`docs/master-package-2026-09-08/` is the current local execution authority,
following the direct user instruction recorded in
`docs/master-package-2026-09-08/EXECUTION_RECORD.md`.

`docs/VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md` remains
historical/in-progress input and evidence for the existing dirty checkout; it
is not erased or treated as new-work authority where it conflicts with the
Master Package.

Read `docs/VISALANG_CURRENT_STATE_2026-09-01.md`, `docs/OPERATIONS_STATUS.md`,
`docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md`,
`docs/RELEASE_CANDIDATE_MANIFEST_2026-08-21.md`, `PROJECT_CONTEXT.md` and
`AGENTS.md` as supporting state, production evidence and repository rules. They
do not independently expand the approved local scope.

Earlier roadmap, taskbook, Phase 0, traffic, monetization and content plans,
including Scheme 3, are retained as point-in-time evidence. They do not by
themselves authorize new pages, analytics, forms, advertising changes,
payments, commits, pushes or deployment.

The maintained whole-site planning view is
`docs/planning-map/visalang-overall-build-plan.html`; its editable Archify
source, append-only sync history, classified candidate manifest and
artifact-bound evidence live beside it. The diagram visualizes the current
authority and execution state but never overrides the Master Package, status
overlay, or explicit Owner decisions. Every content or content-planning
maintenance window must refresh the planning-map sync record and record whether
the change is aligned, an Owner-approved deviation, or unresolved drift.

## Parallel early validation planning — 2026-09-23

The [whole-site plan](docs/superpowers/plans/2026-09-23-visalang-laya-overall-plan.md) and [content plan](docs/superpowers/plans/2026-09-23-visalang-laya-content-plan.md) now schedule LP00 real A1 reader tasks and LP01a initial Laya technical/comparison checks in parallel. LP01a does not wait for recruitment or a demonstrated manual-selection failure. LP01b combines both evidence streams before expanded optimization, full independent evaluation and Linux capacity work; missing reader evidence leaves user benefit unknown. Core fixes and the separately reviewed core release candidate do not wait for Laya checks. The Owner's latest planning instruction supersedes the September 22 mandatory website + Laya + ads joint-release order. Laya, ads and B1 deepening follow separate evidence gates; none automatically blocks the future decoupled core candidate.

Current deployment code still enforces the joint contract: decoupled build, verification, deployment and rollback remain pending implementation. LP00–LP08 (including LP01a/b, LP05a/b and LP06-core/laya/ads) and LC01–LC12 are pending; original task counts stay 25 completed / 5 in-progress / 4 pending. This window changes planning only. Every production action still needs its own explicit Owner authorization.

## Current Boundary

The local baseline is HEAD `4cb57e8744c752fed1881281e69e7b24cc7281c4` on
`codex/scheme-3-one-week-content`. The checkout is intentionally dirty with an
unreconciled Scheme 3 implementation candidate; it is preserved evidence, not
current execution authority or production evidence. The Master Package governs
the approved local work sequence, and its evidence-gated requirements apply
before any later decision about existing Scheme 3 content, discovery gates or
redirects. The recorded production application payload baseline remains
`80c6d04`, which does not prove the current public production commit without a
fresh production check. The old daily-20 content automation remains paused and
is not an authorized execution plan.

Any commit, push, deployment, production change or external-account action requires separate explicit owner authorization.
