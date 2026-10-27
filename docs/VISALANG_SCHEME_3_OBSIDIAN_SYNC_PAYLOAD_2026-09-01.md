---
status: review
needs_human_review: true
owner_decision: pending
deployment_status: not_started
site: visalang.org
record_date: 2026-09-01
branch: codex/scheme-3-one-week-content
baseline_commit: 2ef029f28c03a5838b3ec9add90d851259e81f82
result_commit: unavailable_uncommitted
sync_status: blocked_missing_vault_mount_and_template
agent_review_status: pass
intended_vault_directory: /Users/fanlw/Documents/Website-Content-Hub/10-visalang.org网站维护/30-待审核/网站更新记录/
required_template: /Users/fanlw/Documents/Website-Content-Hub/50-内容模板/网站更新同步记录模板.md
---

# VisaLang 方案三一周内容收缩提质更新记录（待同步载荷）

> 本文件只是在 Vault 未挂载时保留的同步载荷，不是正式 Obsidian 记录。不得据此标记 approved、previewed、deployed 或 published。

## 内容摘要

- 将全站收缩为 14 个英文深度支柱与 5 个中文深度支柱。
- 23 个 pending 英文指南、12 个分类页和 11 个政策/占位/错误页 fail-closed。
- 合并 19 个旧指南 URL，目标内容通过对应分批审核后启用单跳 301。
- sitemap 精确 35 个 canonical；生成页面 81 个、`noindex` 46 个；仅 14 个英文支柱加载 AdSense。
- 五个工具只补齐适用条件、示例、失败边界与官方后续动作，没有增加功能。

## 规划依据

- `docs/VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01.md`
- `src/data/publication-manifest.ts`
- `docs/CONTENT_MAP.md`

## 主要改动范围

- 内容：`src/content/guides/` 下 14 个英文支柱，`src/pages/zh/guides/` 下 5 个中文支柱。
- 数据与布局：发布清单、指南库、文章分段器、中英文指南布局、中文指南数据。
- 全站发现：中英文首页、三个路线 Hub、指南目录、分类页、canonical、hreflang、sitemap 和广告 allowlist。
- 工具：Route Finder、Checklist、Timeline、Exam Comparison、Email Reminders 的页面专属说明。
- 合并：`public/_redirects` 与 19 个被吸收源页面的原子删除。
- 治理：唯一一周计划、历史计划 superseded 标记、README、内容地图、测试和发布证据。

## 官方来源与边界

- A1 claim/source ledger：`docs/VISALANG_SCHEME_3_A1_CLAIM_SOURCE_LEDGER_2026-09-01.md`
- B1 claim/source ledger：`docs/VISALANG_SCHEME_3_B1_CLAIM_SOURCE_LEDGER_2026-09-01.md`
- 中文 claim/source ledger：`docs/VISALANG_SCHEME_3_ZH_CLAIM_SOURCE_LEDGER_2026-09-01.md`
- 内容只支持来源允许支持的范围；费用、考位、日期、证书接受、豁免、处理时间和个案结果仍须向相应主管机关、接收机关、考试主办方或所选考点核验。

## 实际验证

- `npm test`：PASS。
- `npm run launch-check`：PASS；81 页；54/54；`READY`。
- `git diff --check`：PASS（最终审计状态记录后再次复跑）。
- 375px 与 1440px：英文支柱、中文支柱、Hub、工具、pending 和 301 目标均完成截图与页面级横向溢出检查。
- 分批独立审核：发布清单、英文支柱、中文支柱均为 `PASS`、`findings: []`。
- 全站最终 Independent Auditor：`PASS`、`findings: []`；正式结论与授权边界见 `docs/VISALANG_SCHEME_3_INDEPENDENT_AUDIT_2026-09-01.md` 的最终全站审计记录。

## 风险与所有者决定

- 本次是本地未提交候选；没有 commit、push、部署或 AdSense 复审。
- Google 审核结果不可保证。
- 所有者仍需审阅支柱内容、来源边界、19 条重定向与发布矩阵，并另行决定是否 commit、部署和发起 AdSense 复审。
- Vault 路径与模板当前不可访问；正式同步前必须先挂载正确 Vault，再按真实模板校对本载荷。
