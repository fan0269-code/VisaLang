# VisaLang 下一阶段 Phase 0 具体执行计划

> 日期：2026-08-21
> 上位任务书：`docs/NEXT_STAGE_EXECUTION_TASKBOOK_2026-08-21.md`
> 执行范围：VL-N1～VL-N5 发布基线收敛包
> 周期：3–5 个工作日
> 默认边界：只做本地盘点、验证、文档收敛和候选准备；本计划不自动授权 commit、push、deploy、外部账号或生产变更。
> 完成状态：本计划的 local-preparation 与 Security → App 应用发布均已完成，应用基线为 `80c6d04`。包含本记录的 docs-only governance commit 是获批后继 source/release；第 1～9 节是计划和点时证据，第 10 节是该治理后继之前的应用发布结果。

## 1. 阶段目标

在不丢失既有工作、不混合无关变更的前提下，形成一个可以由 owner 明确接受、退回或拆分的发布候选，并让以下问题均有唯一答案：

1. 生产正在运行哪个 commit/release；
2. 部署前 11 个提交如何进入当前生产谱系，以及 local `main` 为何落后 origin 1 个提交；
3. 哪些内容已通过自动验证和独立复核；
4. 哪些只是未提交记录，不能进入候选；
5. 谁负责批准、发布和回滚；
6. 下一次发布的目标 commit 与回滚点是什么。

## 2. 发布前工作分解与顺序（历史计划快照）

| 顺序 | ID | 任务 | 负责人 | 输入 | 输出 | 验收 | 当时状态 |
|---:|---|---|---|---|---|---|---|
| 1 | VL-N1.1 | 冻结并记录 Git/生产基线 | 执行代理 | Git、Operations Status | Release manifest | commit、ahead/behind、dirty、生产/回滚点齐全 | 已完成本地证据 |
| 2 | VL-N1.2 | 将 11 个提交归入变更包 | 执行代理 | `origin/main..HEAD` | 3 个候选包矩阵 | 每个提交只属于一个包 | 已完成 |
| 3 | VL-N1.3 | 归类未提交/未跟踪文件 | 执行代理 + 文件 owner | `git status` | preserve/候选/记录/排除清单 | 无法解释文件为 0 | 部分完成；owner 待确认 |
| 4 | VL-N2.1 | 核验独立复核证据 | VisaLang Auditor | Task Log、审计记录 | 每包 review 状态 | P0/P1/P2 关闭或有真实 blocker | FAN-273/FAN-270 有记录；FAN-254 最终范围需 re-attest；本轮文档独立复核 PASS（初审 2 个 P2 已关闭） |
| 5 | VL-N2.2 | 补 owner disposition | 业务 owner | manifest | 接受/拆分/退回决定 | 决策人、时间、范围齐全 | 阻塞：需用户/owner 决定 |
| 6 | VL-N3.1 | 干净、顺序式发布门禁 | 工程负责人 | 候选树 | test/build/launch 记录 | `npm test`、build、launch、diff check 全绿 | 当前工作树已验证；干净候选待决策 |
| 7 | VL-N3.2 | 稳定性复查 | 工程负责人 | Node 22 环境 | 连续门禁记录 | 同一候选连续 3 次全绿 | 未开始；先确定候选 |
| 8 | VL-N4.1 | FAN-254 依赖包单独决策 | 安全/工程 owner | 依赖审计包 | 接受/退回/拆分 | 官方 registry audit 可复现 | 技术证据具备；owner 待定 |
| 9 | VL-N5.1 | 确定 release commit | release owner | N1–N4 | 唯一 commit | 工作树洁净、review/owner 完整 | 阻塞 |
| 10 | VL-N5.2 | 确定 rollback commit 和 RTO | rollback owner | 生产记录 | 回滚卡 | commit、命令、RTO、验收 URL | 候选已知；未演练 |
| 11 | VL-N5.3 | 发布 go/no-go | 业务 owner + release owner | 全部证据 | 决策记录 | 明确 GO 或 NO-GO | 阻塞；不得自动发布 |

## 3. 每日安排

### Day 1：证据冻结与变更包矩阵

- 记录 `origin/main`、HEAD、ahead/behind、工作树状态；
- 列出 11 个提交并分为 FAN-254、FAN-273、FAN-270；
- 将未提交文件标记为 preserved，不把既有工作纳入本轮实现；
- 生成 `docs/RELEASE_CANDIDATE_MANIFEST_2026-08-21.md`。

**完成定义**：提交与文件均可追溯，未知项有 owner 和解阻动作。

### Day 2：独立复核与文档真相收敛

- 对 release manifest、执行计划和必要的当前状态修正做独立只读审计；
- 只修正会导致错误执行的当前事实，不重写历史记录；
- README、Operations、Project Context 明确 Astro/src/dist 为唯一当前执行链；
- 历史 legacy 文件保留兼容用途，但不作为部署入口。

**完成定义**：独立 auditor PASS；权威文档之间不再互相矛盾。

### Day 3：候选决策与确定性验证

- owner 对三个包分别选择：接受进入候选、拆分、退回、继续本地保留；当前审计建议 `SPLIT AND RE-ATTEST`，不要直接发布混合 HEAD；
- 在生产一致的 Node 22、支持 audit API 的 registry、无并发 build 环境运行完整门禁；
- 明确唯一 release commit 与 rollback commit。

**完成定义**：如果 owner 尚未决策，阶段结论必须是 `NO-GO / OWNER_DECISION_REQUIRED`，不能用技术通过替代授权。

### Day 4–5：仅在 Day 3 GO 后执行的发布准备

- 连续 3 次顺序式门禁；
- 发布前 390/768/1440 代表页检查；
- 准备部署命令、smoke URL 和回滚命令；
- 再次请求一次单独、明确的发布授权。

**完成定义**：只形成发布准备包。没有单独授权，不 push、不 deploy、不改服务器。

## 4. 具体命令链

```bash
# 证据盘点（只读）
git status --short
git rev-list --left-right --count origin/main...HEAD
git log --oneline origin/main..HEAD
git diff --check

# 候选确定后，在无并发构建的工作区顺序执行
npm ci
npm test
npm run build
npm run launch-check
git diff --check

# 依赖审计必须使用支持 audit API 的 registry
npm audit --registry=https://registry.npmjs.org --omit=dev
```

任何命令失败：保存完整日志，停止进入下一门；不得重复运行直到偶发成功后隐藏首次失败。

## 5. 发布前 Owner 决策单（历史快照）

需由业务 owner 明确填写：

| 决策项 | 可选值 | 当时值 |
|---|---|---|
| FAN-254 依赖包 | 接受 / 退回 / 拆分 / 保留本地 | 待定 |
| FAN-273 404 包 | 接受 / 退回 / 拆分 / 保留本地 | 待定 |
| FAN-270 SEO 包 | 接受 / 退回 / 拆分 / 保留本地 | 待定 |
| 未提交 reconciliation 文档包 | 纳入后续独立候选 / 仅记录 / 退回 | 待定 |
| 本轮新增规划文档 | 接受 / 修订 / 退回 | 待定 |
| 允许 commit | 是 / 否 | 否（尚无单独授权） |
| 允许 push | 是 / 否 | 否（尚无单独授权） |
| 允许 deploy | 是 / 否 | 否（尚无单独授权） |

## 6. 发布前阶段退出标准（历史计划）

### GO

- 变更包、commit、review、owner、release 状态一一对应；
- 工作树洁净，ahead/behind 可解释；
- Node 22 干净环境完整门禁连续 3 次通过；
- release/rollback owner 和 commit 已确认；
- 获得单独发布授权。

### NO-GO

任一情况即为 NO-GO：owner 未决定、review 未闭环、工作树混合、候选不唯一、门禁失败、回滚责任不明确、外部账号/生产授权缺失。

## 7. 发布前本地执行边界（历史快照）

本轮先执行 VL-N1、VL-N2 的可本地完成部分，并完成一次当前工作树验证。owner 身份、commit/push/deploy、生产回滚演练和账号侧动作无法由代理代填，必须作为显式门禁保留。


## 8. 发布前执行进度快照（已由第 10 节取代）

| 项目 | 实际结果 |
|---|---|
| Git/生产基线冻结 | 完成：production/origin `6a1cb43`，local `9e33c5c`，ahead 11 / behind 0 |
| 11 提交分包 | 完成：FAN-254（7）、FAN-273（3）、FAN-270（1）；确认 SEO commit 位于前两包之后 |
| Release manifest | 完成：当前结论 `NO-GO / SPLIT AND RE-ATTEST` |
| 文档真相收敛 | 完成当前层：README 改为 Astro；根 PROJECT_CONTEXT 修正 53 guides/domain/social asset/schema；历史 docs 加隔离提示；Master 指向当前 Phase 0；Operations/Task Log 补当前候选状态 |
| 验证 | `npm test`、100 页 build、launch-check 46/46、sitemap/indexability 0 冲突、`git diff --check` 通过 |
| 独立复核 | PASS：同一 Auditor 初审发现 2 个 P2，修复后复审为 P0/P1/P2=0；owner authorization 仍 pending |
| Owner disposition | 未完成；需要业务 owner 对三个包逐项选择 |
| Commit/push/deploy | 未执行，也未获单独授权 |

因此，当时已经执行到所有不依赖 owner 身份与生产授权的本地步骤。当时下一硬门为 owner 接受 `SPLIT AND RE-ATTEST`；该门随后已由 owner 授权及两阶段发布关闭。


## 9. Local-preparation snapshot before production authorization

本节记录生产发布授权前的点时快照：用户当时仅授权“建立隔离候选并验证，暂不部署”。实际结果见 `docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md`：

- Security RC `6a1cb43..f680c62`：Node 22、官方 registry、audit 0、连续 3 轮全门禁通过、最终独立审计 PASS；
- 直接从旧 production 发布 App patch：功能门禁通过但依赖 audit 失败，已判定禁止；
- App-after-security `f680c62..9e33c5c`：首次 3 次测试均暴露 Task Log 固定日期集成缺陷；
- 只修改 1 个测试断言后：audit 0、连续 3 轮全门禁通过、最终独立审计 PASS；
- 截至该点时快照，仅获授权创建一文件 App 集成 commit `80c6d04`；当时尚未 push、deploy、访问生产或修改账号。

当时一文件集成修复已作为 `80c6d04` 单独提交，并建立两个有序本地 refs；不可变候选再验证与独立审计 PASS。当时下一门为：**是否单独授权 push**；部署仍明确排除。后续现状以第 10 节为准。


## 10. App production completion before the governance-only successor

Owner subsequently authorised both read-only account verification and an explicit waiver where authenticated account evidence was unavailable, then authorised the full release. Security `f680c62` was deployed and smoke-verified first. App `80c6d04` was revalidated against that actual production baseline, independently passed, then deployed and smoke-verified. Final `origin/main`, server source and `current` match `80c6d04`; no rollback trigger occurred. Account settings were not changed, and waived CMP/Auto Ads/Policy Center/CLS evidence is not represented as verified.
