# VisaLang 下一阶段整体执行规划任务书

> 版本：2026-08-21（基于全站源码、构建产物、现有审计与线上关键路由只读扫描）
> 建议周期：6 周；前 30 天禁止批量新增页面
> 核心原则：先把“版本、责任、数据、复核”闭环，再做内容扩张和商业化。
> 执行状态更新：发布基线收敛已于 2026-08-21 完成，生产应用基线为 `80c6d04`；包含本记录的 docs-only 治理 commit 是获批后继 source/release，Security → App 两阶段发布与 smoke 均 PASS。下文阶段 A/B 与 VL-N1～N5 是发布前计划快照：N1～N5 的本次技术发布目标已完成；A2/A3 的长期责任与历史台账缺口继续作为治理债。当前事实以 `docs/OPERATIONS_STATUS.md` 和 `docs/SPLIT_REATTEST_EXECUTION_2026-08-21.md` 为准。下一阶段转为发布后稳定化、治理候选隔离和数据/账号证据基线。

## 一、执行结论

VisaLang 已不是“需要继续搭网站”的阶段，而是进入**运营闭环与可验证增长阶段**。站点已有完整 Astro 静态架构、100 个生成路由、53 篇英文指南、德国 A1/B1 深度集群、10 个中文入口/内容路由、工具、SEO、结构化数据、广告隔离和发布回滚体系。

下一阶段不应继续追求页面数量，也不应恢复“每天 20 篇”的自动内容生产。当前最重要的工作顺序是：

1. **发布后收口**：以 production application baseline `80c6d04` 为基线完成治理收口；包含本记录的 docs-only 后继进入 origin/生产后，local dirty `main` `9e33c5c` behind 2；保持自动化暂停和账号证据边界；
2. **再建立数据基线**：明确 Search Console、分析、隐私/CMP、联系入口和发布责任；
3. **再做内容增长**：以真实查询和页面数据选择 6–8 个现有页进行升级，不新增相似薄页；
4. **最后决定商业动作**：只有生产端 CMP、广告范围、体验和账号证据齐备后，才考虑 AdSense 复审；只有交付、客服和数据处理真实可用后，才开放留资或付费。

## 二、全站现状基线

### 2.1 已具备能力

- Astro 静态站，生产域名 `https://visalang.org`，trailing slash、canonical、OG/Twitter、JSON-LD、sitemap、robots 已集中实现。
- 当前源码构建生成 **100 个页面**；本次对最终 sitemap 与页面 robots 交叉核验为 **56 个可索引路由、44 个 noindex 路由，冲突为 0**。
- 英文 Markdown 指南 **53 篇**：
  - `complete-route` 17 篇（Germany A1）；
  - `core-route` 13 篇（Germany B1）；
  - `starter-overview` 8 篇（telc、TestDaF）；
  - `verification-pending` 15 篇（英国、加拿大、意大利、西班牙、法国、荷兰、葡萄牙、芬兰）。
- 53 篇当前均有 `sourceReviewStatus: reviewed`；但“来源已复核”不等于“内容成熟并可索引”。公开发现边界是 30 篇 A1/B1 指南；8 篇 starter 与 15 篇 pending（合计 23 篇，43%）仍按 fail-closed 规则保持 noindex、无广告并退出主发现。
- 中文侧已有 `/zh/`、Germany A1 hub 和 8 篇关键指南，共 10 个中文路由；不是完整的全站双语镜像。
- 5 个具体工具页与工具中心已存在；商业页明确区分 free、coming soon、contact only、not currently offered。
- 现有 26 个 Node 回归测试文件、launch check、部署脚本、不可变 release 和回滚候选机制。
- 线上抽查首页、指南库、中文首页、联系页、robots、sitemap 均返回 HTTP 200。

### 2.2 当前主要缺口

1. **发布已完成，本地治理待收口**：production application baseline 已为 `80c6d04`；包含本记录的 docs-only 后继进入 origin/生产后，local dirty `main` `9e33c5c` ahead 0 / behind 2；FAN-254、FAN-273、FAN-270 已部署并完成生产 smoke。
2. **长期运营责任仍需补齐**：本次 Security/App 发布的 owner 授权、独立复核与技术证据已闭环；长期内容人工 disposition、发布备份和回滚责任人仍未全部形成可检查记录。
3. **增长数据缺失**：源码和隐私页均表明 Cloudflare Web Analytics 未启用；本次扫描没有取得 Search Console 28/90 天数据，因此不能声称哪个国家或关键词应优先。
4. **内容成熟度不均**：30 篇 Germany A1/B1 已形成深度主集群；其余 8 篇 starter 与 15 篇 pending 共 23 篇仍未进入公开发现，不应与成熟核心路线按同一发现和商业标准对待。公开页结构完整，但仍需用真实查询、独特证据和任务完成度排查模板化与意图重叠。
5. **中文覆盖不对称**：中文能服务 A1 核心用户，但导航中仍有较多“跳往英文”的路径；在没有真实中文需求数据前，不宜机械翻译 53 篇英文内容。
6. **商业化尚未闭环**：广告代码和内容级隔离已存在，但 CMP choices、Auto Ads placement、CLS、干净浏览器网络行为和 AdSense 账号侧状态需要生产证据；付费包、人工 Route Review、邮件留资也没有完整履约与 SLA。
7. **技术门禁需保持可复现**：已发布 RC 使用 Node 22 与官方 registry，audit 0 且生产门禁通过；未来验证仍应固定官方 registry，并避免多个任务同时清理 `.astro/dist`。本地默认镜像不支持 audit API 仅是未来执行注意项。
8. **文档漂移（本轮已完成当前层收敛）**：扫描时 README、历史计划和旧统计与当前源码并存；本轮已将 README 改为 Astro 真相源、修正根 Project Context，并为历史文档增加隔离提示。历史正文继续保留为点时证据。

## 三、下一阶段总目标（6 周）

### 目标 O1：形成唯一、可发布、可回滚的版本基线

任何人都能回答：当前生产是什么 commit、候选是什么 commit、谁批准、谁复核、如何回滚。

### 目标 O2：获得连续 4 周的真实需求和健康数据

能回答：用户从哪里来、进入哪些页面、哪些查询产生展示/点击、哪些设备/国家存在体验问题。

### 目标 O3：用数据提升现有核心内容，而不是扩充页面数量

优先升级 A1/B1 的高展示低 CTR、高排名潜力或高风险事实页；国际 pending 内容只选择一个国家簇试点。

### 目标 O4：建立可审计的 AdSense/商业化准入包

不承诺审批通过；只保证内容、广告范围、同意、体验、账号和责任证据齐备后再由 owner 决策。

## 四、执行阶段与任务清单

## 阶段 A：发布前计划快照与当前治理债

### A1. 冻结工作区并建立版本清单（本次发布已完成）

- 保留部署前 11 个提交的分包记录，并记录 production application baseline `80c6d04`、包含本记录的 governance successor 与 local behind 2、tracked/untracked 清单。
- FAN-254、FAN-273 与 FAN-270 均标记为已部署；仅未提交治理/证据文件继续按“后续治理候选 / 仅记录 / 排除”分类。
- 继续不 reset、不清理、不把既有 dirty 内容混入后续治理候选；生产发布已在后续单独授权窗口完成。

**交付物**：一页 release candidate manifest。
**验收**：每个变更均有来源 issue、文件范围、review 结果、目标状态；不存在“无法解释的文件”。

### A2. 补齐长期责任与审批矩阵（仍开放的治理债）

必须实名/明确到角色：业务 owner、事实审核 owner、独立 reviewer、release owner、rollback owner、Search Console/Analytics owner、联系邮箱响应 owner。

**验收**：每个角色有主责、备份、响应时限和可检查证据；无人负责时对应能力保持关闭。

### A3. 关闭历史 review 台账缺口（仍开放的治理债）

- 对已部署混合包记录 owner disposition：接受、接受但需修正、或“先部署后补记录”。
- 补齐 FAN-36–40、42、43、73、75 等历史独立复核/复核后再审证据。
- 统一仓库 TASK_LOG、OPERATIONS_STATUS 和 Website Content Hub 状态。

**验收**：部署事实、人工审核事实、owner 决策三者分开记录，不能互相替代。

## 阶段 B：发布前技术门禁（本次发布已完成；常态化要求继续有效）

### B1. 固定生产一致运行环境

- 将本地/CI/生产统一到 Node 22 LTS；记录 npm 版本和 registry。
- 使用支持安全审计 API 的官方或合规 registry 完成一次依赖审计。
- 对 FAN-254 依赖升级候选单独验收，不与内容/SEO变更混发。

**验收**：干净环境 `npm ci` 成功；依赖报告可复现；未解决 advisory 有风险接受人和期限。

### B2. 修复/隔离构建并发风险

- 禁止多个测试或代理同时对同一工作树执行会删除 `.astro/dist` 的构建。
- 在单一干净工作区顺序执行 `npm test`、`npm run build`、`npm run launch-check`、`git diff --check`。
- 如仍出现图片优化 ENOENT，再建立复现测试并修复；不能用偶发成功代替定位。

**验收**：同一候选连续 3 次发布门禁通过；100 页构建稳定；launch check 0 failure。

### B3. 发布前质量补证

- 375/768/1024/1440 四档检查首页、A1/B1 hub、指南、工具、中文、隐私、404。
- 检查键盘导航、focus、横向滚动、图片 CLS、广告脚本隔离和主要 CTA。
- 抽查 headers、canonical、redirect、robots、sitemap、ads.txt。

**验收**：P0/P1/P2 关闭；独立 auditor 返回 PASS；形成候选 commit，但部署需另行批准。

### B4. 清理文档真相源

- 更新 README 为 Astro 当前运行方式。
- 将 `MASTER_EXECUTION_PLAN`、`OPERATIONS_STATUS`、本任务书设为当前权威链；历史方案加“仅参考/已完成/已替代”标记。
- 保持 legacy 根目录文件为兼容层，不再作为新实现入口。

**验收**：新执行者只读 3 份权威文档即可准确判断当前版本、阶段和禁止事项。

## 阶段 C：可观测增长基线（Week 2，P1）

### C1. Search Console 基线

由账号 owner 提供 28/90 天非个人级汇总：query、page、country、device、clicks、impressions、CTR、position；提交并核验 sitemap。

**验收**：有日期、导出人、数据范围和原始导出；能列出前 20 查询/页面和索引异常；不得自行登录或伪造数据。

### C2. 分析与隐私决策

- 业务方在“暂不启用”与“启用 Cloudflare Web Analytics”之间明确选择。
- 若启用，先确认数据保留、访问权限、隐私文案、同意要求和 DPA/区域边界。
- 第一阶段只采集聚合页面访问/来源/国家/设备/性能，不采集工具答案和个人信息。

**验收**：生产网络请求与隐私说明一致；有关闭/回退方案；连续采集 4 周。

### C3. 周度增长看板

固定每周只跟踪：自然点击、展示、CTR、平均排名、landing page、索引覆盖、404/5xx、Core Web Vitals/实验室性能、内容更新时间、纠错工单。

**验收**：第 1 周只建立基线，不设拍脑袋增长目标；第 2 周起按“本周/上周、28 天/前 28 天”复盘。

## 阶段 D：内容与 SEO 增长冲刺（Week 3–4，P1）

### D1. 数据驱动选择 6–8 个旧页

推荐配额：A1 2–3 页、B1 2–3 页、国际 pending 国家簇最多 2 页。选择顺序：

1. 高风险事实或来源易变；
2. 高展示、排名 4–20、有明确查询意图；
3. 高展示低 CTR；
4. 与相邻页面存在意图重叠；
5. 能在 1–3 天形成独特决策价值。

没有 Search Console 数据时，只允许按风险回退处理 A1/B1，不启动第二增长路线。

### D2. 每页实施标准

- 明确“谁决定、页面解决什么、读者下一步是什么”。
- 高风险 claim 必须有 authority、URL、checked date、支持范围、边界、核验动作。
- 补独特比较表、清单、决策树或本地执行步骤；不为字数扩写。
- 检查搜索意图、title/description、H1、canonical、schema、内链、related guides、hreflang。
- 实质改写才更新 `updatedDate`；来源复核单独更新 `sourceReviewedAt`。

**验收**：每页有聚焦断言、全量门禁、独立 review PASS；无重复 slug、断链或越权结论。

### D3. 处理 23 篇隐藏指南（8 starter + 15 pending）的规则

- 不以“字段齐了”直接恢复索引。
- 每个国家簇必须作出：继续 noindex、合并、重写后升级、退休并重定向四选一。
- 只有具备独立任务、完整接收方权威链和真实需求证据，才恢复 sitemap/主发现/广告候选。

**验收**：试点簇有逐页理由；没有为了减少 pending 数量而错误升级。

### D4. 中文策略

- 只处理数据证明有需求的 Germany A1/B1 高意图页。
- 中文为面向中国用户的自然改写，保留全部适用边界和来源；不机械镜像英文站。

**验收**：中英事实对应、hreflang 互指、语言切换可达；缺乏需求时本阶段不扩中文页面。

## 阶段 E：真实下一步与商业准入（Week 5，P1/P2）

### E1. 统一核心用户下一步

A1/B1 hub、核心指南和工具统一到一个真实可完成的免费动作，例如 Route Finder → Checklist → Timeline → 官方核验。

**验收**：每个 CTA 有真实目标、返回路径和失败状态；不宣称完成签证/考试/法律判断。

### E2. 联系与留资门禁

只有在邮箱接收测试、责任人、SLA、隐私与删除流程确认后，才把 mailto 升级为表单或等待名单；否则继续保持无后端、无个人信息采集。

**验收**：测试邮件可收、可回复、可删除；无负责人则功能不上线。

### E3. AdSense 生产证据包

- 账号 owner 核对站点状态、Policy Center、ads.txt、付款/身份待办。
- 从英国/EEA/瑞士适用场景验证 Google 认证 CMP、choices、TC string 与拒绝后的广告行为。
- 验证 Auto Ads 只覆盖成熟内容，404、政策、工具、索引、pending、商业占位页无广告。
- 检查移动端广告位置、CLS、遮挡、内容/广告比例和 clean-profile network。

**验收**：源码、生产、账号三侧一致；所有证据带时间和截图/网络记录。只有 owner 单独批准才提交复审。

## 阶段 F：4 周复盘与下一路线决策（Week 6，P2）

### F1. 复盘

输出：数据变化、索引变化、被更新页表现、纠错/来源风险、工具使用路径、生产健康、AdSense 准入状态。

### F2. 唯一下一路线选择

只有满足以下条件才扩张：

- 已连续观察至少 4 周；
- 有真实自然需求；
- 官方来源链稳定；
- 可形成 6–10 页完整而不重叠的任务路径；
- 有内容 owner 和独立 reviewer。

不满足时，继续优化 Germany A1/B1，不新增国家路线。

## 五、优先级任务表（原始规划与当前状态）

| ID | 优先级 | 任务 | Owner | 前置 | 完成标准 | 当前状态 |
|---|---|---|---|---|---|---|
| VL-N1 | P0 | 生产/本地/候选版本对账 | Release owner | 无 | manifest 完整、每项有状态 | 应用发布已完成于 `80c6d04`；docs-only 后继为包含本记录的治理 commit |
| VL-N2 | P0 | 本次发布批准与独立复核闭环 | Business owner + auditor | N1 | owner disposition + reviewer PASS/真实 blocker | 本次发布已完成；长期 A2/A3 治理债仍开放 |
| VL-N3 | P0 | Node 22 干净环境门禁 | Engineer | N1 | 连续 3 次全绿、100 页稳定 | 本次发布已完成并生产复验 |
| VL-N4 | P0 | FAN-254 依赖候选单独决策 | Engineer + security owner | N3 | audit 可复现、风险有处置 | 已完成、先行部署并保留为回滚点 `f680c62` |
| VL-N5 | P0 | 发布决策与有序执行 | Business + release owner | N2–N4 | commit/release/rollback 明确 | 已完成；App `80c6d04` 已部署 |
| VL-N6 | P1 | Search Console 28/90 天基线 | Account owner | 账号权限 | 可复核导出与前 20 清单 | 未开始；需账号证据 |
| VL-N7 | P1 | Analytics/隐私方案确认 | Privacy + analytics owner | 责任确认 | 生产行为与文案一致 | 未完成 |
| VL-N8 | P1 | 6–8 个旧页内容冲刺 | Content owner | N6 或风险回退 | 每页测试 + 独立 PASS | 未授权；数据基线前不启动 |
| VL-N9 | P1 | 单一 pending 国家簇处置 | Content owner | N6 | 逐页 keep/merge/upgrade/retire 决策 | 未授权 |
| VL-N10 | P1 | A1/B1 免费任务漏斗统一 | Product owner | N7 | CTA 全部真实可完成 | 未授权 |
| VL-N11 | P1 | AdSense 生产证据包 | Ad/CMP owner | N5、N7–N10 | 账号/生产/源码三侧一致 | 账号证据未验证；本次发布仅获豁免 |
| VL-N12 | P2 | 四周数据复盘 | Business owner | N6–N10 | 有结论、有下一唯一优先项 | 未开始 |
| VL-N13 | P2 | 第二路线 go/no-go | CEO/owner | N12 | 满足五项门槛才立项 | 未开始 |

## 六、阶段 KPI 与红线

### 必达 KPI

- 版本可追溯率 100%；候选变更均有 issue、review、owner、release 状态。
- 发布门禁通过率 100%；P0/P1/P2 未关闭不得上线。
- 53 篇指南的来源状态、内容成熟度、发现状态一致率 100%。
- 选定的 6–8 个更新页全部具备官方证据链、真实下一步和独立复核。
- Search Console/Analytics 基线存在后，才设增长目标。
- pending/noindex/无广告隔离不得发生未经逐页批准的回退。

### 停止条件

出现任一条件即停止发布或商业动作：

- 生产 commit 与候选无法对账；
- 高风险事实没有主管机关或来源边界；
- 独立 reviewer 未 PASS；
- CMP/广告实际行为与隐私文案不一致；
- 联系/付费功能没有真实接收、履约、退款或删除流程；
- 为追求数量批量生成相似页面；
- 构建、链接、schema、移动端或线上 smoke 任一硬门禁失败。

## 七、本阶段明确不做

- 不恢复“每日 20 篇”内容自动化；
- 不批量新增国家、考试或中文镜像页；
- 不把 `sourceReviewStatus: reviewed` 等同于可索引、可广告或权威认可；
- 不上线未具备交付能力的付费包、Route Review、邮件服务或 AI 批改；
- 不为 AdSense 审批堆字数、堆页面或增加广告位；
- 不在没有账号 owner 授权时登录或修改 Search Console、Analytics、AdSense、CMP、DNS、服务器；
- 不把本地构建成功表述为已部署或已批准。

## 八、管理节奏

- **每日 10 分钟**：只更新 blocker、owner、下一动作；不重复写长报告。
- **每周 30 分钟**：版本健康、数据、内容风险、CTA、广告/隐私五项复盘。
- **每个内容切片**：实现者自测 → 独立 auditor → 修复 → 原 auditor re-review → owner 决策。
- **每次发布**：候选 commit → 干净构建 → 发布批准 → 不可变 release → 线上 smoke → 回滚点记录。
- **每月一次**：只做一次“是否扩路线/是否开放商业能力”的 go/no-go 决策。

## 九、本次扫描验证记录

- `npm run build`：通过，生成 100 页。
- `npm run launch-check`：通过，46/46，`READY`。
- `npm test`：最终顺序重跑通过；审计期间出现过一次图片优化/缓存目录竞态，故仍将测试编排稳定化列为 P1。
- 最终 sitemap 交叉核验：56 个 sitemap URL 全部为 index 页面；44 个 noindex 页面无一进入 sitemap；index 页面无遗漏。
- 线上只读抽查：首页、Guide Library、中文首页、Contact、robots、sitemap 均为 HTTP 200。
- 初次扫描与文档收敛阶段未修改站点功能、内容正文、外部账号或生产环境；随后单独授权的两阶段发布结果见 Operations、manifest 与 Split report。

## 十、发布后立即启动的工作包

**工作包名称：发布后稳定化与治理收口。**

production application baseline 已形成于 `80c6d04`，包含本记录的 docs-only governance successor 已通过审核并获准发布；其进入 origin/生产后需继续保护 local dirty `main` `9e33c5c`（behind 2），并补齐 Search Console/analytics/CMP 等真实数据与账号证据。数据基线形成前不扩张内容，不恢复 daily-20 自动化。
