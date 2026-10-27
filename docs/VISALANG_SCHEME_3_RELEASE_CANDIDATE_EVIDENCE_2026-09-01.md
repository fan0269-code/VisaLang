# VisaLang 方案三本地发布候选证据

> evidence date: 2026-09-01（Asia/Shanghai）  
> branch: `codex/scheme-3-one-week-content`  
> baseline commit: `2ef029f28c03a5838b3ec9add90d851259e81f82`  
> result commit: 不适用；本维护窗口未获 commit 授权  
> candidate state: Independent Auditor `PASS`、`findings: []`；正式 Vault 同步仍 blocked/incomplete  
> deployment state: `not_started`

## 1. 实施结果

最终静态构建矩阵与 `src/data/publication-manifest.ts` 一致：

| 页面处置 | 实际数量 | 索引与广告结果 |
|---|---:|---|
| 英文支柱指南 | 14 | index、进入 sitemap、仅这些页面允许 AdSense |
| 中文支柱指南 | 5 | index、进入 sitemap、无广告 |
| 首页/Hub/目录/工具/信任页 | 16 | index、进入 sitemap、无广告 |
| pending 英文指南 | 23 | `noindex,follow`、无广告、不进 sitemap |
| 分类页 | 12 | `noindex,follow`、无广告、不进 sitemap |
| 政策/占位/错误页 | 11 | `noindex,follow`、无广告、不进 sitemap |
| 合并旧 URL | 19 | `_redirects` 中单跳 301，源页不再生成 |

构建总量为 81 个 HTML 页面；sitemap 为 35 个 canonical URL；46 个生成页面为 `noindex`；AdSense allowlist 精确为 14 个英文支柱。

## 2. 内容与来源证据

- 14 个英文支柱正文均达到 1,225–1,383 个独立英文词，页面专属的 `Who / Key decisions / Mistakes / Next action / Sources`、责任图、场景和原创资产均通过聚焦门禁；未检出连续 80 个英文词以上的跨页重复正文。
- 5 个中文支柱分别达到 1,801、2,019、2,156、2,477、2,612 个汉字，使用页面专属中文结构、中国申请场景、询问模板和本地执行边界；未使用共享正文 fallback 补齐篇幅。
- 英文 A1、英文 B1、中文三份 claim/source ledger 均记录官方 URL、核验日期、来源主体、支持范围、不能支持的边界、定位信息和更新触发条件：
  - `docs/VISALANG_SCHEME_3_A1_CLAIM_SOURCE_LEDGER_2026-09-01.md`
  - `docs/VISALANG_SCHEME_3_B1_CLAIM_SOURCE_LEDGER_2026-09-01.md`
  - `docs/VISALANG_SCHEME_3_ZH_CLAIM_SOURCE_LEDGER_2026-09-01.md`
- 分批独立审核已经覆盖发布清单、14 个英文支柱及账本、5 个中文支柱及账本；三批最终均为 `PASS`、`findings: []`。同一 Auditor 对原子合并后的全站候选完成终审，同样返回 `PASS`、`findings: []`；结构化结论与完整边界记录在 `docs/VISALANG_SCHEME_3_INDEPENDENT_AUDIT_2026-09-01.md` 的“Final full-site local release-candidate independent audit”。

## 3. 原子合并与发现系统

- 删除 16 个已吸收的英文 Markdown 源和 3 个中文 Astro 源；仅在目标内容分批审核通过后启用对应 19 条 301。
- 19 条重定向均位于通配规则之前，源唯一、目标唯一、无链式跳转；目标页面成功生成。
- 生成站内链接、canonical 与 hreflang 不再指向任何被合并源 URL。
- hreflang 精确保留 7 对：首页、Germany A1 Hub 与 5 对中英文支柱；双方均可索引且不经过重定向。
- 三个路线 Hub 与中英文首页只展示保留支柱路径；12 个分类页退出主发现系统。
- 5 个工具保持功能边界不变，补齐页面专属适用条件、示例输入输出、失败边界和官方后续动作。

## 4. 实际自动化验证

以下命令均在当前工作树、全新构建后实际运行：

| 命令 | 结果 |
|---|---|
| `npm test` | exit 0；历史回归与 13 个方案三聚焦测试全部通过 |
| `npm run launch-check` | exit 0；fresh build 生成 81 页；54 PASS / 0 FAIL；`READY` |
| `node tests/scheme-3-release-candidate.test.mjs` | 通过；精确验证 81/35/46/14/23/12/11/19/7 矩阵 |
| `git diff --check` | 通过；最终审计状态记录更新后再次复跑通过 |

非失败输出仅为 Node 对直接导入 TypeScript 模块的既有 `MODULE_TYPELESS_PACKAGE_JSON` 警告；未出现断言、构建或页面生成错误。

## 5. 375px 与 1440px 浏览器抽查

使用全新 `astro preview` 构建，在 375×900 与 1440×1000 两个视口逐页截图并读取实际布局宽度。12 个样本均满足：一个可见 H1、主内容可见、导航形态与断点一致、`documentElement.scrollWidth <= innerWidth`。

| 类型 | 抽查 URL | 375px | 1440px | 处置核对 |
|---|---|---|---|---|
| 英文支柱 | `/guides/german-family-reunion-language-requirement/` | PASS | PASS | AdSense 存在，页面可索引 |
| 中文支柱 | `/zh/guides/goethe-a1-test-centers/` | PASS | PASS | 无广告，页面可索引 |
| Route Hub | `/germany-family-reunion-a1/` | PASS | PASS | 无广告，六支柱路径可见 |
| 工具 | `/tools/route-finder/` | PASS | PASS | 无广告；375px 标签条使用预期的局部横向滚动，页面本身不溢出 |
| pending 指南 | `/guides/ielts-ukvi-uk-visa/` | PASS | PASS | `noindex,follow`、无广告、无 Next guide 导航 |
| 301 目标 | `/guides/goethe-b1-study-plan/` | PASS | PASS | 自 canonical 正确、AdSense 存在、页面可索引 |

静态预览服务器不执行托管平台的 `_redirects`，因此 301 的状态与单跳性由生成输出门禁验证；浏览器抽查覆盖其最终目标页面。

## 6. 冻结边界与未授权动作

- dirty baseline 记录位于 `.superpowers/sdd/VISALANG_ONE_WEEK_SCHEME_3_CONTENT_PLAN_2026-09-01/baseline.sha256`；既有且无关的工作树改动保持原样。
- 本维护窗口没有 commit、push、部署、生产预览、外部账户变更或 AdSense 复审提交。
- Google 是否批准 AdSense 不是本候选能够保证的结果。
- `docs/VISALANG_INDEPENDENT_AUDITOR_AGENT.md` 指定的同一独立 Auditor 已对最终冻结范围返回 `PASS`、`findings: []`。该结论只关闭内容与实现独立审核门槛，不授权 owner、commit、push、部署、外部账户或正式 Vault 接受。

## 7. Obsidian 同步状态

AGENTS 指定的 Vault 根目录 `/Users/fanlw/Documents/Website-Content-Hub/` 及模板 `/Users/fanlw/Documents/Website-Content-Hub/50-内容模板/网站更新同步记录模板.md` 在当前主机和已挂载卷中均不存在，因此无法安全创建规定路径下的正式记录，也不得伪造 `/Users/fanlw`。

待同步内容已暂存为 `docs/VISALANG_SCHEME_3_OBSIDIAN_SYNC_PAYLOAD_2026-09-01.md`，并保持：

- `status: review`
- `needs_human_review: true`
- `owner_decision: pending`
- `deployment_status: not_started`

该暂存文件不是正式 Vault 同步成功的证据。挂载正确 Vault 与模板后，仍需按模板创建或更新正式记录；在此之前，整体工作不得宣称满足 Obsidian 验收项。
