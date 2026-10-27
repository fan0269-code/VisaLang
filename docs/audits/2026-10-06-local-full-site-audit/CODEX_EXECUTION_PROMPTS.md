# VisaLang 后续 Codex 执行提示词

本文件是审计交付中的可复制草稿，不是当前工作树的实施授权。先读 [审计报告](AUDIT_REPORT.md) 和 [UI/内容优化计划](UI_CONTENT_OPTIMIZATION_PLAN.md)。当前 HEAD 为 4cb57e8744c752fed1881281e69e7b24cc7281c4，但工作树含大量未提交变更；不要 reset、checkout 丢弃、覆盖或把整树视为已批准发布候选。

## 总任务书（复制给 Codex）

你是 VisaLang 本地验证与整改执行者。你的目标是根据审计证据逐项恢复可验证的公网状态、完成浏览器与工具验收、为 61 个内容页建立价值/来源台账，并在 Owner 选择范围后实施最小修正。优先解决读者能否安全确定下一步与核心流程是否可用。不要通过增加相似 SEO 页面提高页面数量。

### 开始前

1. 打印当前目录、分支、HEAD、upstream ahead/behind、staged/dirty/untracked 清单；逐文件记录用户已有改动，不把审计文档当成唯一输入。
2. 检查 docs/audits/2026-10-06-local-full-site-audit 及目标输出文件是否已存在；若有其他同项目审计正写该目录，停止重叠写入并报告。
3. 重新读取当前 AGENTS.md、README、当前 Master Package/overlay/EXECUTION_RECORD 和最近 Independent Auditor 结论。旧快照只用作历史，不把 9/28 或 10/5 状态当新代码证据。
4. 先向用户交付具体文件清单、baseline、plan-map scope 和会运行的命令；只执行获得明确文件范围授权的任务。这个仓库已有 dirty state，未指定范围前不得猜测哪些改动属于此任务。
5. 内容或内容规划窗口先走 planning-map README 的精确流程：source JSON、showcase 校验/atomic delivery、四尺寸浏览器回执与截图 hash、独立视觉审阅、同步历史/authority/watched-scope digest、exact changedPaths 和 Auditor 绑定完整 sync.json 字节。若缺条件或 drift=unresolved，停止发布闭环，照实写 BLOCKED。

### 固定边界

- 不修改 dist/、deploy/、public/_headers、public/_redirects、生产账号/系统，除非用户另行给精确授权；不部署、推送、付款、发邮件、创建真实回滚或改生产迁移。
- 保留所有未提交改动。不读取/打印密钥，不将源码、配置、日志或截图上传至 Library/其他外部目的地。
- 按国家/项目/机构/考试中心分别引用决定机关或 provider；保留 URL、检查日期、source owner、定位、能支持的事实和边界。未确认的规则改为面向读者的官方核验动作。
- 所有用例用 synthetic inputs；不运行真实 Laya/TypeSafe API，不发送用户输入。
- “代码存在”“build 通过”“noindex”“广告资格”都不能推出真人通过、Google 收录、AdSense 批准或部署完成。
- 不启动/重启历史内容自动化。

### 分阶段依赖图

P0-可达性复核 → 可用本地浏览器验收 → 五工具正常/错误/恢复走查 → 41 页台账与来源队列 → 最多 3 项确证内容修正 → SEO/隐私/运营决策 → 精确候选冻结、测试、独立 Auditor。

浏览器或网络工具不可用时，继续静态源码/命令可以完成的检查，把屏幕视觉状态记为 not_run；不能用 curl/截图脚本伪造 CUA 浏览器 receipt。

### 验收命令及完成门槛

优先在同项目的隔离副本/临时 checkout 执行 build，因为 npm run build 的 prebuild 会删除 dist/。建议命令：

    npm test
    npm run build
    npm run launch-check
    git diff --check
    node tests/planning-map-governance.test.mjs

当前 `npm test` 在 planning-map 候选字节绑定处先因存档 SHA `4bce5115…` 与当前 `tests/site.test.js` SHA `961917e4…` 不匹配而退出 1；同步当前窗口后仍须补齐 Archify/browser/perceptual gate，不能删断言或改回执伪装 PASS。`package.json` 没有 lint/typecheck/security scan script；报告 not_available，不偷偷联网发送依赖清单。记录所有真实 exit code、stderr、Node/npm 版本与是在原 checkout 还是隔离副本执行。

完成门槛：所有计划范围内 P0/P1/P2 已修复或明确获 Owner 接受为阻塞；来源/claim 证据与浏览器回执齐；build 和 launch-check 真正通过；npm test/governance 的失败与当前状态相符并得到授权的正式处理；内容窗口 planning map drift 不得 unresolved；同一 VisaLang Independent Auditor 按完整冻结范围复审并返回 PASS。独审 PASS 不授权部署。部署为单独未开始阶段。

### 回滚与交接

执行前创建逐文件 hash 清单和仅本任务变更表；失败时只回滚本任务明确修改的文件，不用 git reset --hard、全量 clean 或替换整个 data/doc 文件。保留用户已有变更、untracked evidence 和非目标文件。汇报当前 commit、实改文件、测试结果、浏览器截图路径/hash、来源 ledger、未验证项、实际剩余风险和 Owner 决策。

## 子任务 1：线上访问与当前候选基线

**可复制提示词**

> 只读复核 VisaLang 的当前线上可达性及本地候选身份。审计记录中 2026-10-06 的网页读取器对 https://visalang.org/ 返回 Cloudflare 521，但没有第二个网络确认。用你获准的只读方式分别检查根页、www 规范化、robots.txt、sitemap-index.xml、A1 hub、B1 hub 和核心工具；记录完整 UTC 时间、URL、返回码、redirect、网页标题、是否仅代理/浏览器问题。不要登录账户或查未授权的日志，不要修改 Cloudflare/DNS/Nginx、不部署、不发送表单。并记录当前 git branch/HEAD/upstream/staged/dirty/untracked。无法从两个独立出口证明时明确写“范围未知”，不要认定整站永久不可用。

- 依赖：无；遇线上配置/账户访问需求就停止，交由 Owner。
- 允许范围：公开只读请求、本地 git 状态输出、仅新建报告。
- 验收：每个观察有时间、URL、HTTP结果/工具方式；根/robots/sitemap均有明确的 pass/fail/not_run；不写入生产系统。
- 回滚：无业务文件变更；只删除自己的新报告不得覆盖其他输出。
- Owner 需决定：是否联系托管/Cloudflare owner；是否安排单独生产修复窗口。

## 子任务 2：桌面/移动界面与无障碍浏览器验收

**可复制提示词**

> 在 CUA 浏览器已可用时，只用新端口与隔离副本运行 VisaLang。确认端口空闲并绑定 127.0.0.1；不要停掉/复用其他项目服务。检查 /、/zh/、/routes/、/tools/、两个 A1/B1 hub、五个英文工具中的每组正常页及至少一个中文工具。视口为 1440×900、768×1024、390×844；检查首次加载、跳转、空结果、成功和错误状态，Tab 顺序、焦点可见、菜单开合、水平溢出、reduced motion、结果滚动与 fixed/sticky header 遮挡。测试使用合成输入。只生成本次审计截图到新的本地目录，记录浏览器/URL/视口/时间/截图 SHA-256；不要上传、发布或改页面。若 CUA 失败，注明 exact error 和哪些检查 not_run，然后继续源码/测试评估。

- 依赖：本机浏览器/CUA 正常，dev server 起于独立端口。
- 允许范围：读取代码和运行临时 dev server；需要视觉 bugfix 时先另行批准 exact file scope。
- 验收：8+ 页×3 视口的清单按 pass/fail/not_run；截图 hash 齐全；键盘流程真实操作；不把 launch-check 作为视觉 PASS。
- 回滚：停止本任务自建临时 server，清理由本任务生成在 /tmp 的临时文件；不改 dist 或根目录配置。
- Owner 需决定：是否需要实际 iPhone/Android/Safari 验收或读屏用户研究。

## 子任务 3：五个工具的正常/错误/恢复流程

**可复制提示词**

> 为 Route Finder、Checklist Generator、Timeline Calculator、Exam Comparison、Reminder Planner 编制 synthetic-input 矩阵并在 CUA 实际运行。覆盖空必填、无效 ID、unknown/verify-only、旧来源或过期输入、切换语言/路线、已保存状态恢复、storage 被拒、清空、改输入使旧结果失效、copy fallback、print 和 ICS 实际下载。检查结果/导出中是否保留来源与 unknown 边界，不把提醒生成称为已发邮件/已导入日历。不要运行模型/API、支付、邮件或用户信息。定位问题后先交付 exact repro 和文件范围，等待实现范围授权。

- 依赖：子任务 2 browser runtime 可用。
- 允许范围：测试证据和本地复现，不自动改代码。
- 验收：每个工具有正常、空/错误、恢复、导出结果；导出的 ICS/文本/打印预览与生成器字节一致。
- 回滚：测试值不写进主仓库/个人日历；关闭本任务生成的临时下载。
- Owner 需决定：是否要真实外部日历客户端导入，或只维持本地 ICS 下载。

## 子任务 4：内容价值台账与官方来源复核

**可复制提示词**

> 只读重算 53 篇英文 Markdown＋8 篇中文指南。按 UI_CONTENT_OPTIMIZATION_PLAN.md 中每页列表，逐页填写 route、locale、读者独有任务、可带走产物、相邻页面分工、contentStatus、sourceReviewStatus/date、决定机关/provider、来源 URL/owner/locator/checked date、supports/boundary、缺口、next action、traffic evidence（没有就 unknown）、maintain/one-task-fix/defer 建议。先查德国 A1、德国 B1、Goethe/telc/TestDaF 的首要官方来源；非官方文章不支撑高风险决定。Goethe Germany 与 Beijing 的 2 个价格 claim、4 个 fee rows 已于 2026-10-06 在各自官方页面复核，金额/边界未改，下一次复核日期为 2026-11-06；selected checkout、实际席位和个体类别结果仍未核验。若出现新的来源冲突，先报告并保守降级，不猜值；不删除页面、不改 URL、不升索引。任何源、claim 或页面修改都需新 frozen scope 与规划图同步。

- 依赖：当前 source registry 与官方公开页面可读；不要求 Search Console。
- 允许范围：审计 CSV/JSON/Markdown 新文件；审计图更新需内容规划窗口另批。
- 验收：61 行 route 无漏项/重项；来源日期、机关和 boundary 每条高风险 claim 均可定位；0 项也可接受。
- 回滚：不修改 src/content 或 src/data。
- Owner 需决定：哪些页面进入下一修正 batch；是否继续覆盖其他国家/考试。

## 子任务 5：SEO、同意/隐私、运营分析和商业准备

**可复制提示词**

> 在隔离 build 输出上验证 Astro 生成的 canonical、robots、sitemap、hreflang、Article/Breadcrumb/Collection/WebApplication JSON-LD、内部链接、页面标题描述、noindex 与广告资格是否同一策略。分别记录 source contract、generated local HTML、public live response 三类证据。审核 Analytics/consent/CMP/AdSense 是否真的在浏览器运行、何时发送请求、是否纳入同意和页面排除；本次不要接账号、不要打开/接受广告或导入个人数据。广告资格 ≠ AdSense 批准；无真实 Analytics/GSC 导出则 traffic/index/query 记 unknown。输出 owner decision table，不接入新服务、不修改隐私文案/广告代码。

- 依赖：子任务 1 恢复公网信息；子任务 2 可观察网络请求；若缺授权就仅审源文件/本地产物。
- 允许范围：新建本地审计记录，不触发真实账号或访客 tracking。
- 验收：生成路由/索引/广告/locale 四套矩阵互相一致；所有不能验证的账户状态写 not_observed；来源与证据可追溯。
- 回滚：只写新报告；禁止更改 robots/noindex/canonical/ads/CMP。
- Owner 需决定：Search Console/Analytics 使用与责任人、CMP/隐私选择、AdSense 账户实际状态与广告展示范围。

## 子任务 6：批准后的精确代码/内容修正

**可复制提示词**

> 仅根据 Owner 批准的 exact changedPaths 和来源 ledger 修正有证据的问题；先冻结当前 dirty baseline/hash，不把 report 的建议当 broad authorization。最小修复优先：P0 服务可用性需要其独立运营窗口；UI 修正只改获批组件；内容只修最多 3 个确定缺口且复核全部消费端。不要删页、合并 URL、加 redirect、升级 noindex/sitemap/ads、恢复 automation、创建账号/支付/邮件/真实 API/部署。每项修复都更新 focused assertions 和只针对实际契约的逻辑测试。

- 依赖：Owner 指定候选分支、exact files、已查官方 sources、当前规划图窗口和 audit reviewer。
- 验收：npm test/launch-check/build 有实际日志；真实 UI 变更含 viewport receipts；高风险来源行更新有 URL/date/support/boundary；planning-map governance 通过；独立 VisaLang Auditor 对最终 frozen sync bytes PASS。
- 回滚：使用逐文件 before/after hashes，只撤销本任务拥有的 hunk；保留无关用户改动；不执行全仓 reset。
- Owner 需决定：实际哪些修复进入候选、部署/发布何时审批（本提示词不含部署授权）。

## 最终交接模板

    Verdict: PASS | FAIL | BLOCKED
    Branch / HEAD / upstream:
    Frozen scope / baseline manifest:
    Changed files / unchanged user edits:
    Official source ledger and date:
    Browser and viewport receipts / screenshot hashes:
    npm test:
    npm run build:
    npm run launch-check:
    git diff --check:
    planning-map sync ID / drift / governance test:
    Independent Auditor verdict:
    Live URL observations:
    Not run / reason:
    Owner decisions still required:
    Deployment status: not_started

缺少规划图和独立审计门禁时，整批保持 BLOCKED；不要用“下一步计划”“旧 PASS”或本地 build 成功替代。
