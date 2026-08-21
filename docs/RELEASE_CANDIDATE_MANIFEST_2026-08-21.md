# VisaLang Release Candidate Manifest — 2026-08-21

> 状态：`GOVERNANCE-ONLY SUCCESSOR APPROVED / APP PAYLOAD VERIFIED / DEPLOYMENT REQUIRES GATES`
> 目的：记录候选、批准、两阶段发布与生产验证事实。
> 仓库：`/Users/fanlw/Documents/考试网站维护/VisaLang`

## 1. 基线

| 项目 | 当前事实 |
|---|---|
| 生产应用 payload 基线 | `80c6d04c4ccd3d5ee9af069703f7a56534939c3e` |
| governance source/release | 包含本记录的 docs-only commit；parent 为 `80c6d04`，release 目录使用其 12 位短 ID |
| governance 部署后的直接回滚 release | `/var/www/visalang.org/releases/80c6d04c4ccd` |
| 再前一层 Security release | `f680c6234611606c0f308bbf386ee714b027385a` / `/var/www/visalang.org/releases/f680c6234611` |
| `origin/main` / production source target | 包含本记录的 docs-only governance commit |
| 本地 HEAD | `9e33c5c`（`main`） |
| ahead/behind | governance 后继进入 origin 后，local dirty `main` ahead 0 / behind 2 |
| 工作树 | 初始冻结时 5 个 tracked 修改；本轮执行当前为 11 个 tracked 修改（增加 README/Context/Master/历史提示收敛）与 11 个 untracked 顶层条目；均未暂存 |
| 自动内容生产 | `visalang-20` 已记录为 PAUSED |

应用状态于两阶段发布后在服务器直接核验，payload 基线 `80c6d04` 的 smoke 与聚焦公开检查通过。包含本记录的 docs-only 后继不改变 payload；其 push/deploy 后必须再核对 source/current 与 smoke。

## 2. 本地 11 个提交的变更包

| 变更包 | 提交范围 | 主要范围 | 既有验证/复核记录 | 生产状态 | 建议处置 |
|---|---|---|---|---|---|
| FAN-254 依赖修复 | `f691b20` → `f680c62`（7 commits） | lockfile、安全审计记录、聚焦测试、Task Log | Node 22 官方 registry 连续 3 轮全绿；最终 7 提交范围独立审计 PASS | 已作为第一阶段进入生产并通过 smoke | 保留为 App release 的直接回滚点 |
| FAN-273 404 恢复体验 | `c31ca2a`、`54fbc3c`、`bd11bcf` | 404 页面、CSS、聚焦测试、Task Log | 与 FAN-270 组成 App-after-security RC；修正集成测试后连续 3 轮全绿，最终独立审计 PASS | 已在 Security 生产验证后进入最终生产 | 公开 404/noindex/search/no-ads 检查通过 |
| FAN-270 SEO 元数据 | `9e33c5c`（父提交为 `bd11bcf`） | SEO title、OG/Twitter PNG、layout、launch checks、16 篇指南元数据 | 与 FAN-273 组成 App-after-security RC；唯一额外集成修复后 Node 22 连续 3 轮全绿、独立审计 PASS | 已作为最终 `80c6d04` 进入生产 | 公开 SEO title/H1 与 OG PNG 检查通过 |

## 3. 未提交与未跟踪范围

### 3.1 既有 tracked 修改（本轮保留，不擅自归并）

| 文件 | 已知来源/作用 | 当前处置 |
|---|---|---|
| `AGENTS.md` | 指向独立 Auditor 合同并强化发布授权边界 | preserved；待独立审阅/owner 决定 |
| `docs/CONTENT_MAP.md` | 将已部署内容与待人工 disposition 对账 | preserved |
| `docs/OPERATIONS_STATUS.md` | 生产与发布状态 | current 层区分 App payload `80c6d04` 与包含本记录的 governance successor；后继进入 origin/生产后 local dirty main `9e33c5c` behind 2；旧 `6a1cb43` 与 `9e33c5c`/ahead 11 仅作为部署前点时快照保留 |
| `docs/TASK_LOG.md` | 记录 2026-08-21 reconciliation | preserved；其中 FAN-270 “未提交”描述已被后续 commit 超越 |
| `tests/fan-254-dependency-audit.test.js` | 允许 Task Log 更新日期晚于 FAN-254 窗口 | 主工作树既有修改继续 preserved；同内容已单独提交至 App ref `80c6d04`，未并入 Security RC |

### 3.2 既有 untracked 范围

- `.claude/worktrees/`：代理/工作树状态，排除发布候选；不得删除。
- `docs/AUTOMATION_AUDIT_2026-08-19_VISALANG_20.md`：自动化阻断记录，文档候选。
- `docs/AUTOMATION_AUDIT_2026-08-20_VISALANG_20.md`：自动化阻断记录，文档候选。
- `docs/AUTOMATION_AUDIT_2026-08-21_VISALANG_20.md`：自动化阻断记录，文档候选。
- `docs/RELEASE_RECONCILIATION_2026-08-21.md`：生产/内容台账对账记录，文档候选。
- `docs/VISALANG_INDEPENDENT_AUDITOR_AGENT.md`：独立审核合同，治理候选。
- `docs/evidence/fan-75/`：既有视觉证据，保留，不在本轮重生成。
- `docs/NEXT_STAGE_EXECUTION_TASKBOOK_2026-08-21.md`：本轮上位任务书。
- `docs/NEXT_STAGE_PHASE_0_EXECUTION_PLAN_2026-08-21.md`：本轮具体执行计划。
- `docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md`：本轮隔离候选、失败证据、修复与最终复核记录。
- 本文件：本轮 release manifest。

## 4. 当前验证快照

本轮在无子代理并发构建后顺序验证：

- `npm test`：通过；全部现有合同测试通过，存在 `MODULE_TYPELESS_PACKAGE_JSON` 警告。
- `npm run build`：通过，100 页。
- `npm run launch-check`：通过，46/46，`READY`。
- sitemap/indexability 交叉核验：56 个 sitemap URL 均为 index；44 个 noindex 页面均不在 sitemap；遗漏/冲突为 0。
- 线上关键路由只读抽查：首页、Guides、中文首页、Contact、robots、sitemap 均 HTTP 200。

审计过程中观察到同一工作树并发/重复构建时的 Astro 图片缓存/输出目录偶发失败；因此上述通过只证明当前顺序式工作树快照，不替代候选确定后的 Node 22 干净环境连续验证。

## 5. Review 与授权矩阵

| 包 | 技术验证 | 独立复核 | commit/push 授权 | 部署状态 |
|---|---|---|---|---|
| Security RC `rc/fan254-security-20260821` → `f680c62` | PASS：audit 0；3× test/build100/launch44/diff；server 44/44 | PASS：P0/P1/P2=0，最终 7 提交全覆盖 | pushed | deployed and smoke PASS |
| Corrected App RC `rc/app-after-security-20260821` → `80c6d04` | PASS：audit 0；3× test/build100/launch46/diff；实际 Security 生产基线后再验；server 46/46 | PASS：P0/P1/P2=0，最终 32 文件、引用及部署前门复核通过 | pushed | deployed and smoke PASS |
| Direct App-on-production experiment | Functional PASS / dependency audit FAIL | 非候选 | 不适用 | prohibited |
| Phase 0 规划/manifest 文档 | PASS | PASS：P0/P1/P2=0 | 保持本地治理工作，不混入 App RC | not applicable |

## 6. 开放问题与解阻动作

1. **本地 main 对账**：本地脏 `main` 保持 `9e33c5c`，比 `origin/main`/生产落后 App 集成修复 1 个提交；不得 reset 或覆盖既有工作，需在后续独立治理窗口处置。
2. **回滚演练与 RTO**：`f680c62` 已成为验证过的前一生产 release，但本轮未触发或演练真实回滚。
3. **外部账号证据**：owner 已显式豁免本次 CMP/Auto Ads/Policy Center/CLS clean-profile 证据；这些状态仍不得写成已验证。Search Console/Analytics 也未核验。

## 7. 当前结论

`APP PAYLOAD VERIFIED / GOVERNANCE-ONLY SUCCESSOR IS THIS COMMIT`

Security RC 已先发布并通过生产 smoke；corrected App RC 随后基于该实际生产 commit 再验证、独立 PASS、发布并通过最终 smoke。App 发布时 `origin/main`、server source 与 `current` 精确匹配 `80c6d04`；包含本记录的 docs-only 后继部署后成为新的 source/release head，直接回滚点为 `80c6d04`。账号侧最新证据按 owner 明确“1+2”授权被本次豁免，未修改账号设置且不声称已验证。
