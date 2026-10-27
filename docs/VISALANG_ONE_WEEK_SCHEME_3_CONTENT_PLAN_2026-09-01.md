# VisaLang 方案三：一周全站内容收缩提质计划

> status: active-authority  
> execution window: 2026-09-01 至 2026-09-07（Asia/Shanghai）  
> completion target: 本地发布候选；不包含 commit、push、部署或 AdSense 复审

本文件是本维护窗口唯一执行规划。历史计划只作为点时证据保留，并须标记为 `superseded`；审计、来源包、任务日志和当前状态证据不得删除。

## 1. 最终发布矩阵

| 页面状态 | 数量 | 索引 | sitemap | 广告 |
|---|---:|---|---|---|
| 英文支柱指南 | 14 | 是 | 是 | 是 |
| 中文支柱指南 | 5 | 是 | 是 | 否 |
| 首页、路线中心、目录、工具、About/Contact | 16 | 是 | 是 | 否 |
| 待核验英文指南 | 23 | 否 | 否 | 否 |
| 分类页 | 12 | 否 | 否 | 否 |
| 政策、商业占位、404 | 11 | 否 | 否 | 否 |
| 被合并旧指南 URL | 19 | 单跳 301 | 否 | 否 |

完成后约生成 81 个页面：35 个进入 sitemap，46 个 `noindex`，仅 14 个英文支柱加载 AdSense。

## 2. 支柱内容范围

### English A1（6）

1. `german-family-reunion-language-requirement`：要求判断、主管机关层级、证明与豁免核验树、询问模板；吸收 accepted-proof 与 FAQ。
2. `goethe-a1-vs-telc-a1`：同一路线考试比较、停止条件、选择工作表。
3. `goethe-a1-test-centers`：官方考点核验、费用/政策留档、付款前检查；吸收费率、预报名、报名错误页。
4. `german-a1-exam-booking-timeline`：倒排时间线、未知日期和补考分支；吸收 retake。
5. `german-a1-documents-checklist`：报名、考试当天、申请递交三套材料及缺失项处理。
6. `goethe-a1-30-day-study-plan`：诊断、30 天学习、错误追踪和原创练习；吸收 working-adult、official-resources 与听说写练习。

### English B1（8）

1. `goethe-b1-germany-settlement-work`
2. `germany-b1-citizenship-language-proof`
3. `germany-b1-leben-in-deutschland-and-language-proof`
4. `goethe-b1-vs-telc-b1`
5. `goethe-b1-fees-and-booking`
6. `germany-b1-settlement-citizenship-timeline`
7. `germany-b1-settlement-citizenship-checklist`
8. `goethe-b1-study-plan`：吸收 difficulty、mock、listening、speaking、writing 五页。

### 中文（5）

1. `german-family-reunion-language-requirement`：吸收 accepted-proof。
2. `goethe-a1-vs-telc-a1`。
3. `goethe-a1-test-centers`：吸收 booking-mistakes。
4. `german-a1-exam-booking-timeline`：吸收 documents-checklist。
5. `goethe-a1-30-day-study-plan`。

中文内容不得逐字翻译，须使用德国驻华使领馆、考试方中国站点和具体考点来源，并增加中国申请场景与中文询问模板。

## 3. 内容与来源硬门槛

- 英文独立正文按任务达到约 1,200–2,400 词；中文达到 1,800–3,000 汉字；共享布局、导航和免责声明不计入。
- 每页只有一个主任务，并包含直接答案、适用/不适用边界、四方责任图、至少两个场景和至少三类原创资产。
- `Who / Key decisions / Mistakes / Next action / Sources` 必须页面专属，不得依赖共享 fallback 凑正文。
- 高风险主张必须记录官方 URL、核验日期、来源主体、允许支持的内容、边界和更新触发条件。
- 无法确认的费用、日期、考位、接受、豁免或处理时间改为具体核验动作，不猜测、不保证结果。
- 不得出现连续 80 个英文词以上的跨页重复正文；阅读时间按最终正文重算。

## 4. 永久重定向

仅在目标支柱通过内容和来源审核后删除源页并启用单跳 301：

- A1：accepted-proof 与 FAQ → requirement；fees、pre-booking、booking-mistakes → test-centers；retake → timeline；working-adults、official-links、listening、speaking、writing → 30-day-study-plan。
- B1：difficulty、mock、listening、speaking、writing → `goethe-b1-study-plan`。
- 中文：accepted-proof → requirement；booking-mistakes → test-centers；documents-checklist → timeline。

所有站内链接、路线步骤、相关推荐、canonical、hreflang 和 sitemap 必须直接指向目标，不得依赖重定向完成内部导航。

## 5. 全站门禁

- 英文/中文首页、三个路线 Hub、目录、工具和 About/Contact 保持索引但无广告。
- 12 个分类页全部 `noindex`、无广告并退出 sitemap。
- 5 个工具补齐页面专属使用条件、例子、输出解释、失败边界和官方后续动作，不扩功能。
- 23 个 pending/starter 指南继续 fail-closed。
- 政策、商业占位和 404 继续 `noindex`、无广告。
- 建立一份代码发布清单统一控制支柱 allowlist、重定向、分类关闭、索引、sitemap 和广告。

## 6. 验收

- sitemap 精确包含 35 个允许索引的 canonical URL。
- 19 个旧 URL 均为单跳 301，目标成功且站内没有旧链接。
- 仅 14 个英文支柱加载 AdSense。
- 23 个 pending、12 个分类和 11 个政策/占位/错误页全部 `noindex`。
- 5 对指南、首页及 A1 Hub 的 hreflang 成对有效，不指向重定向或 `noindex`。
- 聚焦测试、`npm test`、`npm run launch-check`、`git diff --check` 全部通过。
- 375px 与 1440px 抽查英文支柱、中文支柱、Hub、工具、pending 和重定向目标。
- 同一名独立 VisaLang Auditor 最终返回 `PASS` 且 findings 为空。
- Obsidian 记录保持 `status: review`、`needs_human_review: true`、`owner_decision: pending`、`deployment_status: not_started`。

若任何高风险支柱无法确认主管机关或未通过独立审核，不得将其加入 allowlist 或启用对应 301，也不得把整体工作报告为完成。Google 是否批准 AdSense 不属于本周可保证结果。

质量判据同时采用 Google 的[发布商政策](https://support.google.com/adsense/answer/10502938?hl=zh-Hans)、[AdSense 页面准备要求](https://support.google.com/adsense/answer/7299563?hl=en-EN)和[以用户为先的内容指南](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)。这些资料用于约束本地候选质量，不构成 Google 审核结果或通过保证。

## 7. 七日实施与冻结节奏

| 日期 | 实施内容 | 当日冻结与审核 |
|---|---|---|
| 2026-09-01 | 记录 dirty baseline；冻结 81 页处置、19 条重定向、来源账本和失败测试；本文件成为唯一执行规划。 | 冻结结构批次，交独立 Auditor。 |
| 2026-09-02 | A1 要求/比较/考点；B1 永居/入籍；中文要求。 | 冻结 6 页，记录逐页来源边界。 |
| 2026-09-03 | A1 时间线/材料/学习；B1 公民知识/考试比较；中文考试比较。 | 先修前批 P0–P2，再冻结 6 页。 |
| 2026-09-04 | B1 费用报名/时间线；中文考点/时间线；迁移 A1 合并内容。 | 冻结 4 页及 A1 合并目标。 |
| 2026-09-05 | B1 清单/学习；中文学习；完成三组 Hub 和全部 19 个目标内容。 | 只有目标内容门禁通过后才允许原子删除和 301。 |
| 2026-09-06 | 首页、目录、工具、信任面；收紧分类、广告、sitemap、hreflang、内链；运行深度和重复检查。 | 14:00 冻结完整本地候选，交同一 Auditor 全站审计。 |
| 2026-09-07 | 只修 Auditor P0/P1/P2；运行全量验证；同一 Auditor 复审；同步维护证据和 Obsidian 待审核记录。 | findings 为空且 `PASS` 才标记为本地发布候选。 |

本计划替代并要求删除以下四份 2026-09-01 现行规划：

- `docs/VISALANG_MASTER_ROADMAP_2026-09-01.md`
- `docs/VISALANG_90_DAY_EXECUTION_PLAN_2026-09-01.md`
- `docs/VISALANG_DETAILED_EXECUTION_TASKS_2026-09-01.md`
- `docs/VISALANG_EXECUTION_BOARD_2026-09-01.md`

更早规划仅保留为 `superseded` 点时证据；审计、来源包、当前状态、任务日志和历史执行证据不得删除。

## Task 1 — 发布清单与失败关闭门禁

- 先新增聚焦测试，并确认它们因缺少方案三行为而失败。
- 建立统一发布清单：14 个英文支柱、5 个中文支柱、19 条重定向、12 个关闭分类。
- 统一索引、sitemap、广告和中文发现逻辑；首页及三个 Hub 关闭广告。
- 文章布局要求页面专属关键决策等内容，不再使用通用 fallback 充当正文。
- 更新 launch-check 和既有硬编码测试，使其验证目标发布矩阵。

## Task 2 — 英文 A1 六支柱与来源账本

- 深改六个 A1 支柱，迁移 11 个被吸收页面中仍有独立价值的内容。
- 建立逐页 claim/source ledger，记录官方来源、检查日期、支持范围和边界。
- 不编辑共享发布清单、中文文件或 `_redirects`；最终删除与重定向由 Task 5 原子执行。
- 运行 A1、内容完整性和来源相关聚焦测试。

## Task 3 — 英文 B1 八支柱与来源账本

- 深改八个 B1 支柱，迁移五个练习支持页中仍有独立价值的内容。
- 建立逐页 claim/source ledger，区分 national、local、exam owner 与 test centre 权限。
- 不编辑共享发布清单、中文文件或 `_redirects`；最终删除与重定向由 Task 5 原子执行。
- 运行 B1、内容完整性和来源相关聚焦测试。

## Task 4 — 中文五支柱与全站非广告内容面

- 深改五个中文支柱，使用中国官方入口与本地执行提示，不做逐字翻译。
- 更新中文 Hub、中文发现和五组 guide hreflang；补齐首页、Hub、目录、工具与信任面的页面专属说明。
- 不删除中文旧页且不编辑 `_redirects`；最终原子合并由 Task 5 执行。
- 运行中文渲染、sitemap、hreflang、工具和站点聚焦测试。

## Task 5 — 原子合并、规划替换与引用清理

- 先确认 19 个目标支柱均通过对应内容门禁，再删除 16 个英文和 3 个中文源页。
- 将 19 条单跳 301 写入 `_redirects`，更新所有内链、路线步骤、related、canonical、hreflang 与 sitemap 输入。
- 删除四份现行规划文件，以本文件取代；修复全部入站引用，历史规划只加 `superseded` 标记。
- 保留审计、来源包、当前状态、任务日志和其他既有用户改动。

## Task 6 — 发布候选验证

- 运行内容长度、重复段落、来源账本、URL 清单、广告清单、sitemap 与重定向检查。
- 运行聚焦测试、`npm test`、`npm run launch-check` 与 `git diff --check`。
- 在 375px 与 1440px 抽查英文、中文、Hub、工具、pending 和重定向目标。
- 生成冻结 manifest 与实际命令输出，禁止将未运行项目写成通过。

## Task 7 — 独立审核与维护证据

- 由未参与规划、写作、来源研究或修复的同一名 VisaLang Independent Auditor 审查冻结范围。
- 修复全部 P0/P1/P2 后由同一 Auditor 复审，只有 findings `[]` 且 `PASS` 才完成。
- 更新 `TASK_LOG`、`CONTENT_MAP`、发布证据与 Obsidian 待审核记录；不 commit、push、部署或提交 AdSense。
