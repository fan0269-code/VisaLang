# VisaLang 下一执行窗口提示词：Germany A1/B1 备考支持页来源复核

> 将本文件完整内容复制到新的 Codex 窗口执行。
> 本提示词只授权一个内容维护包；不要自行进入提交、推送、部署、TestDaF、运营接入或商业化窗口。

## 1. 角色、目标和完成定义

你是 VisaLang 的内容维护 Agent。请在真实 Astro 仓库中完成 15 篇 Germany A1/B1 备考支持页的：

1. 当前第一方官方来源复核；
2. 逐条 claim matrix 落盘；
3. 无来源或越界表述的删除、限定或核验动作改写；
4. `nextGuideSlug`、`supportingGuideSlugs` 和 `decisionStage` 的路线去环、去重与去倒退；
5. 内部编辑语言、页面自链接和同质化 CTA 的最小清理；
6. 聚焦测试、全量测试和 launch check；
7. 内容账本及 Obsidian 待审核记录同步。

本窗口不新增公开页面，不改 UI，不改工具逻辑，不接入服务，不提交、不推送、不部署。

完成只有三种结论：

- `PASS`：15 篇均已安全处置，状态与实际证据一致，全部门禁通过；
- `PARTIAL`：部分页面因彼此独立的来源缺口保持 `pending`，但公开内容安全、路线和全部门禁通过；
- `BLOCKED`：工作树冲突、共享来源冲突、范围外文件才可修复的失败，或需要用户/服务器/账户权限。

不得用“执行了命令”“局部测试通过”代替完成定义。

## 2. 唯一目录和两份绑定合同

唯一工作目录：

```text
/Users/fanlw/Documents/考试网站维护/VisaLang
```

先完整阅读：

1. `CLAUDE.md`
2. `AGENTS.md`
3. `docs/MASTER_EXECUTION_PLAN.md`
4. `docs/OPERATIONS_STATUS.md`
5. `docs/prompts/2026-07-21-a1b1-support-pages-codex.md`
6. 本文件

`docs/prompts/2026-07-21-a1b1-support-pages-codex.md` 仍是详细执行合同；本文件是 2026-07-22 的调度与勘误合同。发生冲突时，本文件优先。不要用任何相似旧提示词替代这两份文件。

## 3. 当前预期基线与硬门禁

编写本提示词时的只读基线：

```text
branch: main
HEAD: d2cedb55095f0841065088e24ec7164d21ad3929
origin/main: 85851a330a46f939f3835c820d56928e838ea788
divergence: main ahead of origin/main by 8 commits
worktree: clean
```

这只是预期基线，不是要求回退到该提交。开始时运行：

```bash
pwd -P
git rev-parse --show-toplevel
git status --short --branch
git status --porcelain=v1 --untracked-files=all
git rev-parse HEAD
git rev-parse origin/main
git log --oneline --decorate origin/main..HEAD
git diff --check
```

硬门禁：

- 两个目录结果必须严格等于唯一工作目录；否则 `BLOCKED`。
- 重新生成并保存旧提示词第 2、5 节要求的 `/tmp` 基线快照与 SHA-256。
- 若任一目标指南、目标测试、`docs/CONTENT_MAP.md`、本轮审计文件或 `docs/TASK_LOG.md` 在进入窗口时已有未完成修改，`BLOCKED`，不得叠加。
- 若只是本提示词、旧提示词的状态说明或其他范围外文档已有修改，作为受保护初始变化记录并保持字节级不变；不要为制造 clean baseline 清理它们。
- 若 HEAD 已包含本任务的更晚实现，先逐项比较目标与真实行为；不得重复实现或破坏正确行为来制造 RED。

绝对禁止：`git clean`、`git reset --hard`、`git restore`、`git checkout -- <path>`、`git stash`、`git add .`、`git add -A`。

## 4. 对旧提示词的事实修正

以下事实替代旧提示词第 3 节中的同类表述：

- P0 五国 10 篇已在本地提交 `5aa27b0` 完成，但当前仓库仍领先 `origin/main`；本窗口不得声称它们已因该提交推送或部署。
- 本地提交、远端推送和生产发布是三个独立状态。没有本窗口的直接证据，不得写“已发布”。
- France、Netherlands、Spain 和已复核的 A1/B1 核心页不在本窗口范围内；不得重复处理。
- 15 篇目标页当前均以 schema 默认值或显式值处于 `sourceReviewStatus: pending`，没有 `sourceReviewedAt` 和 `reviewedByRole`。
- 当前 A1/B1 测试仍包含部分旧模板要求；本窗口应以真实用户价值和本提示词为准，先写最小 RED，再同步收窄旧断言，不得简单删除测试覆盖。

## 5. 精确内容范围

### Germany A1：10 篇

```text
src/content/guides/goethe-a1-germany-family-reunion.md
src/content/guides/german-a1-family-reunion-faq.md
src/content/guides/goethe-a1-listening-practice.md
src/content/guides/goethe-a1-speaking-topics.md
src/content/guides/goethe-a1-writing-practice.md
src/content/guides/goethe-a1-study-plan-working-adults.md
src/content/guides/goethe-a1-official-links-practice-resources.md
src/content/guides/goethe-a1-30-day-study-plan.md
src/content/guides/goethe-a1-booking-mistakes.md
src/content/guides/goethe-a1-pre-booking-checklist.md
```

### Germany B1：5 篇

```text
src/content/guides/goethe-b1-difficulty-analysis.md
src/content/guides/goethe-b1-listening-deep-dive.md
src/content/guides/goethe-b1-mock-exam-routine.md
src/content/guides/goethe-b1-speaking-topics.md
src/content/guides/goethe-b1-writing-assessment.md
```

### 测试与记录

```text
tests/germany-a1-cluster.test.js
tests/germany-b1-cluster.test.js
tests/content-integrity.test.js
tests/source-review-render.test.js
tests/site.test.js                         # 仅测试入口确有需要时
docs/GERMANY_A1_B1_SUPPORT_SOURCE_REVIEW_2026-07-22.md
docs/CONTENT_MAP.md
docs/TASK_LOG.md                           # 仅验证完成后追加真实结果
```

条件 allowlist：

```text
src/pages/guides/[slug].astro              # 仅真实渲染失败证明需要时
scripts/launch-check.js                    # 仅现有检查自身有真实缺陷时
```

此外，内容变更验证完成后，按 `AGENTS.md` 同步一份 Obsidian 待审核记录。它是仓库外的单一条件性交付，不授权扫描或改动 Vault 其他内容：

```text
/Users/fanlw/Documents/Website-Content-Hub/10-visalang.org网站维护/30-待审核/网站更新记录/
```

若当前沙箱不能写该目录，只为“读取指定模板 + 创建这一份记录”请求精确权限；不得把该权限扩展为发布、审批或同步网站。

除以上清单外均为 denylist。尤其不得修改 schema、taxonomy、布局、CSS、中文页、已 reviewed 核心指南、其他国家/TestDaF/telc 内容、依赖、public、deploy、legacy 文件、生成目录和第三方配置。

## 6. Claim matrix 必须落盘

旧提示词要求的逐条 claim matrix 统一保存到：

```text
docs/GERMANY_A1_B1_SUPPORT_SOURCE_REVIEW_2026-07-22.md
```

不要把矩阵只留在聊天、临时文件或搜索笔记中。该文件至少包含：

- 本轮日期、分支、初始 HEAD、15 个 slug；
- 每个实际打开来源的发布机构、标题、最终 URL、访问日期、访问结果和定位；
- 每条高风险主张的原文、类别、决定机关、支持级别、来源范围、禁止推论、最终处置；
- 页面最终为 `reviewed` 或 `pending` 的逐页理由；
- 仍需当地主管机关/官方或授权考点确认的动态事实；
- 路线变更前后对照；
- 无法访问来源、冲突来源和人工核验项。

表格至少使用以下核心列：

```text
page_slug | claim_id | claim_text | target_authority | source_title |
final_source_url | accessed_at | locator | support_level | source_scope |
prohibited_inference | permitted_wording | reader_verification_action |
final_disposition | page_status
```

只有实际打开当前第一方页面并定位到支持内容，才能写 `direct` 或 `partial`。搜索摘要、AI 回答、历史审计和考试方营销措辞不能成为最终证据。

## 7. 来源与状态判定

严格执行旧提示词第 9 至 12 节，并补充：

- 来源访问日期使用本窗口真实日期，不预填 `2026-07-22`。
- `updatedDate` 仅在正文发生实质用户可见变化时更新；仅改 metadata、路线或测试时不要机械刷新。
- 页面只有在最终公开版本所有高风险主张均被支持、限定或完整删除，并在 matrix 中有处置记录时，才可设为 `reviewed`。
- 单页来源缺口可保留 `pending` 并形成 `PARTIAL`；不得为追求全绿伪造 reviewed。
- 备考资料可由 Goethe/telc 产品页支持；签证、居留、入籍、豁免或个案接受性必须回到有决定权的主管机关，考试方不能替代。
- 地方费用、日期、考位、证件、退款、取消、出分和证书交付只能由具体官方/授权考点的当前页面支持；否则写读者核验动作。

## 8. 路线目标与 decision stage 勘误

保持 A1=`complete-route`、B1=`core-route`，但不得把成熟度当作来源复核完成。

### A1

- `german-a1-family-reunion-faq`：`requirement -> goethe-a1-vs-telc-a1`。
- `goethe-a1-germany-family-reunion`：`requirement -> goethe-a1-vs-telc-a1`。
- `goethe-a1-pre-booking-checklist` 当前错误标为 `submission-review`；本轮改为 `local-execution`，再指向 `german-a1-exam-booking-timeline`，避免阶段倒退。
- `goethe-a1-booking-mistakes -> german-a1-documents-checklist`。
- `goethe-a1-official-links-practice-resources -> goethe-a1-30-day-study-plan`。
- `goethe-a1-listening-practice -> goethe-a1-speaking-topics`。
- `goethe-a1-speaking-topics -> goethe-a1-30-day-study-plan`。
- `goethe-a1-writing-practice -> goethe-a1-30-day-study-plan`。
- `goethe-a1-study-plan-working-adults -> goethe-a1-30-day-study-plan`。
- `goethe-a1-30-day-study-plan` 为终点，不设 next。

### B1

5 篇均是 `local-execution` 备考支持页；`goethe-b1-difficulty-analysis` 当前的 `choice` 必须改为 `local-execution`：

- `goethe-b1-difficulty-analysis -> goethe-b1-study-plan`。
- `goethe-b1-listening-deep-dive -> goethe-b1-mock-exam-routine`。
- `goethe-b1-mock-exam-routine -> goethe-b1-study-plan`。
- `goethe-b1-speaking-topics -> goethe-b1-mock-exam-routine`。
- `goethe-b1-writing-assessment -> goethe-b1-mock-exam-routine`。

通用规则：

- next 是唯一主下一步；supporting 最多两个，不得包含自己或重复 next；
- 所有目标必须存在并保持同一 `category`；
- 15 篇内不得有自环、直接双向环或多步 next 环；
- 不得从 `local-execution` 倒退到 `requirement`/`choice`；
- 不得因本轮路线清理修改已 reviewed 核心页；若目标路线必须修改核心页才能成立，`BLOCKED` 并报告设计冲突。

## 9. TDD 与执行顺序

按以下顺序推进，每个 slice 先证明真实 RED，再改最小实现：

1. 基线快照与目标页现状表；
2. A1 状态、stage、next/supporting 和正文清理测试；
3. A1 页面逐页来源复核与 matrix；
4. B1 状态、stage、next/supporting 和正文清理测试；
5. B1 页面逐页来源复核与 matrix；
6. 全集路线无环、无倒退、无重复测试；
7. 构建后 badge、dateModified、Next guide、canonical 和 sitemap 测试；
8. 更新 CONTENT_MAP；
9. 运行完整门禁；
10. 门禁全通过后追加 TASK_LOG；
11. 按模板创建 Obsidian `status: review` 记录；
12. 最终重新对比工作树 SHA-256。

如果某项预检已经满足，记录 `already satisfied`，不要破坏它来制造 RED。

## 10. 验证门禁

依次运行，不要并行运行 build/launch-check：

```bash
node tests/germany-a1-cluster.test.js
node tests/germany-b1-cluster.test.js
node tests/content-integrity.test.js
node tests/source-review-render.test.js
node tests/site.test.js
npm test
git diff --check
npm run build
npm run launch-check
git status --short
```

注意：`npm run launch-check` 自带 prebuild。这里保留单独 build 是为了满足总体规划的独立构建证据；必须串行执行，避免 `.astro/data-store.json.tmp` 竞争。

`PASS` 或 `PARTIAL` 必须同时满足：

- 所有聚焦测试 exit 0；
- `npm test` exit 0；
- `git diff --check` 无输出；
- 独立 `npm run build` exit 0；
- `npm run launch-check` exit 0 且以 `READY.` 结束；
- 15 篇状态与 matrix 一致；
- A1/B1 成熟度保持不变；
- 路线无自环、直接环、多步环、stage 倒退和 next/supporting 重复；
- canonical、sitemap 和 `dateModified` 未被来源日期污染；
- 审计文件、CONTENT_MAP、TASK_LOG 与实际结果一致；
- Obsidian 记录保持 `status: review`、`needs_human_review: true`、`owner_decision: pending`、`deployment_status: not_started`；
- 未修改受保护文件，未产生 allowlist 外未说明变化。

如果 `npm run build` 后 `npm test` 因 dist 基线变化暴露问题，只修复本轮直接引入的问题并重新按顺序验证；不得放宽断言。

## 11. 绝对停止规则

出现以下任一项立即停止扩展并报告：

- 目标/测试/账本文件已有未完成修改；
- 需要改 denylist 才能安全完成；
- 来源只能通过搜索摘要、验证码、不可定位 JS、失效 PDF 或无发布机构页面获得；
- 来源之间的冲突会改变跨页路线或共享核心结论；
- 需要用户的个案、所在地、考点、大学/专业或主管机关选择才能得出结论；
- 测试或 launch check 的首个可操作错误不能在 allowlist 内修复；
- 需要提交、推送、部署、服务器、DNS、账户或第三方服务操作。

单页来源不足时优先安全降级为 `pending` 并继续其他独立页面；不要把可隔离的单页缺口夸大成全局 `BLOCKED`。

## 12. 最终报告

最终报告必须包含：

1. `PASS` / `PARTIAL` / `BLOCKED`；
2. 根目录、分支、初始 HEAD、origin/main、ahead/behind、初始工作树；
3. 15 篇逐页的最终 source 状态和理由；
4. 实际修改文件与用户可见变化；
5. claim matrix 路径及 reviewed/pending 数量；
6. 路线变更前后、修复的环/倒退/重复；
7. 每条验证命令、退出码和关键输出；
8. 基线与最终 SHA-256 对比；
9. Obsidian 待审核记录路径与状态；
10. 无法访问来源、人工核验项和未处理相邻问题；
11. 明确写出：未提交、未推送、未部署、未访问服务器、未修改第三方账户。

不要把本地 `READY.` 写成生产发布成功。完成后停止，等待项目所有者审核和决定后续提交/发布窗口。
