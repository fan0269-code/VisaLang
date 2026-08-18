# VisaLang 内容更新计划（FAN-24）

状态：待 CEO 确认
制定日期：2026-08-14
计划周期：确认后 20 个自然日，按最小垂直切片执行
计时口径：计划获批当日为 Day 1；若 2026-08-14 获批，Day 20 为 2026-09-02
实现真相源：`src/content/guides/`、`src/data/`、`src/pages/`

## 1. 执行结论

未来 20 个自然日不新增页面，以“4 篇 telc 来源安全闭环 + 1 个数据选出的 pending 国家簇 + Germany A1/B1 各 1 篇核心页复核 + 批次级独立验收”为完成边界。执行顺序为：

1. 完成 4 篇 telc 指南的 authority-first 来源复核；
2. 在 Day 3 前取得 Search Console 28/90 天汇总并给 15 篇 `verification-pending` 指南排序；如未取得，Day 4 记录无数据回退并按来源风险选 1 个国家簇，不等待外部数据；
3. 深化 1 个国家/考试任务簇，最多 2 页，保留、合并或继续 noindex 均须有逐页理由；
4. 复核 Germany A1/B1 各 1 篇核心页的新鲜度与用户下一步；
5. Day 14 起冻结范围，只允许测试修复、独立 review 发现修复和台账同步，Day 20 前形成未发布的可审阅更新包。

首个实施切片限定为一篇指南：`telc-vs-goethe-for-german-visa`。该页包含高风险的接收方/考试比较语境，适合验证从权威归属、来源记录、正文边界、元数据、测试、台账到人工复核的完整流程。首个切片在计划获批后 3 个工作日内完成候选稿，不包含发布。

20 天是自然日假设，而不是 20 个工作日。若 CEO 要求按工作日计算，应在本计划确认时明确；未明确则使用上述自然日口径。外部数据、独立 reviewer 或 CEO 发布决策不作为拖延来源安全工作的理由，但缺少对应证据时不得把相关页面标记为已复核或已发布。

## 2. 目标与用户可见结果

### 目标

- 让每篇被更新的指南解决一个明确的用户决策，而不是扩写通用考试百科。
- 让签证、居留、入籍、院校接收、考试产品和本地执行的决定权清晰分离。
- 将更新队列从历史文档驱动改为“风险 + 证据缺口 + 真实需求”驱动。
- 在 20 个自然日内建立可重复的内容更新、验证、独立复核和发布前审批流程，并交付范围受控的候选更新包。

### 用户可见结果

- 页面开头直接说明“谁决定、读者需要核验什么、本站能帮助做什么决定”。
- 高风险事实附近有当前官方来源和具体核验动作，不用笼统免责声明替代证据。
- 比较页提供相同口径的比较维度，不承诺普遍接受、固定费用、固定日期或个案结果。
- 只有达到来源与成熟度门槛的页面进入主要发现、sitemap 和广告运行时。
- 被复核但证据不足的页面保持 `pending` / noindex，并向读者给出具体核验动作；20 天期限不构成放宽安全门的理由。

## 3. 当前基线

以下数据来自 2026-08-14 对当前工作树 `src/content/guides/*.md` 的只读盘点：

| 指标 | 当前值 | 说明 |
| --- | ---: | --- |
| 英文指南总数 | 53 | 当前 Markdown 内容集合 |
| `sourceReviewStatus: reviewed` | 49 | 其余 4 篇 telc 指南没有来源复核元数据 |
| `complete-route` | 17 | Germany A1 |
| `core-route` | 13 | Germany B1 |
| `starter-overview` | 8 | TestDaF 4 篇、telc 4 篇 |
| `verification-pending` | 15 | 英国、加拿大、意大利、西班牙、法国、荷兰、葡萄牙、芬兰 |

旧 `docs/CONTENT_MAP.md` 的 Immediate execution queue 仍写着“10 篇 Germany A1 待复核”，但当前源码已显示 Germany A1 的 17 篇均为 `reviewed`。后续应在首个内容实施窗口同步修正该队列；本计划不直接修改内容台账，以免把规划判断冒充已完成的来源复核。

## 4. 验收标准

### 本计划验收

- 明确目标、用户可见结果、验收标准、数据边界和非目标。
- 以仓库当前 53 篇指南为基线，明确 4 篇来源缺口和 15 篇完成度缺口。
- 给出首个 3 工作日垂直切片、20 个自然日的 Day 1–20 顺序、owner、任务依赖、验证命令和停止条件。
- 明确 20 天内最多处理 8 页：4 篇 telc、1 个 pending 国家簇最多 2 页、Germany A1/B1 各 1 页；不新增页面。
- Search Console 在 Day 3 前到位则数据排序，未到位则 Day 4 启用无数据回退，不让外部账号阻塞整个计划。
- 未使用未授权的 Search Console、Analytics、AdSense、生产服务器或个人数据。
- 在 Paperclip 留下可复核说明，并由 CEO 确认后再调整已存在的 FAN-35–FAN-44 任务图。

### 每个内容切片验收

- 范围只包含一个页面或一个紧密的两页任务簇；不顺带扩张其他国家或考试。
- 高风险 claim 记录：authority、source URL、checked date、允许支持的范围、边界和读者核验动作。
- 保留全部必需 front matter；只有实质改写才更新 `updatedDate`，来源核验使用 `sourceReviewedAt`。
- 更新或新增至少一个能失败的聚焦断言，覆盖本切片的关键来源边界或路由行为。
- 运行聚焦测试、`npm test`、`npm run launch-check` 和 `git diff --check`；结果全部通过。
- 实现者不得自审通过；独立 reviewer 的 P0/P1/P2 均关闭后返回 `PASS`。
- 内容变更同步 `docs/CONTENT_MAP.md`、`docs/TASK_LOG.md` 和 Obsidian 待审核记录。
- 未经 owner 单独批准，不 commit、push、deploy、请求 AdSense review 或改动外部账号。

### Day 20 完成定义

- 4 篇 telc 均有逐页来源处置记录；只有证据满足时才标记 `reviewed`，否则保留 `pending` 并记录 owner 与具体核验动作。
- Search Console 数据门有明确结果：数据排序或无数据回退，不能以“仍在等待”作为 Day 20 状态。
- 1 个 pending 国家簇（最多 2 页）与 Germany A1/B1 各 1 页完成“更新或有证据的无需修改”结论。
- 所有实际变更通过聚焦断言、`npm test`、`npm run launch-check`、`git diff --check` 和独立 reviewer `PASS`。
- 更新包、台账、Obsidian 待审核记录和 owner 决策项齐备；保持未发布，除非另有明确发布授权。
- 若某页因权威来源不可确认而无法安全完成，不以猜测补齐；该页记录为安全处置完成，但不计为 `reviewed` 或可发布。

## 5. 数据边界与非目标

### 数据边界

- 本计划只使用仓库文件、Git 元数据和 FAN-24 任务线程。
- Search Console / Analytics 只接受 owner 提供的汇总导出：查询、页面、国家、设备、点击、展示、CTR、平均排名；不需要用户级或个人数据。Day 3 后仍无数据则使用风险回退，不自行登录账号或延长计划。
- 官方来源核验只保存公开 URL、访问日期、支持范围和边界，不复制受版权保护的大段正文。
- 生产站点、生产密钥、账单、AdSense/CMP、组织设置和服务器不在本任务授权范围。

### 非目标

- 本任务不直接改写、发布、提交或部署任何指南。
- 不设定未经数据支持的流量、收入、排名或 AdSense 审批承诺。
- 20 天内不生成新页面，不以固定字数作为质量指标，不为消除 `pending` 标签而虚假提升状态。
- 不把考试提供方当作签证、移民、入籍、院校或职业接收的最终决定者。
- 不处理当前工作树中的首页视觉改动、依赖漏洞、广告账户配置或生产发布。
- 不承诺在 20 天内处理全部 15 篇 `verification-pending` 指南；本轮只处理数据/风险选出的 1 个国家簇。

## 6. 优先级模型

每个候选页面按以下顺序判断，不用单一分数覆盖安全门：

1. **来源门**：缺少决定机关、官方来源或边界的页面优先；来源门未关闭时保持 noindex、无广告和非主要发现。
2. **风险门**：签证、居留、入籍、院校接收、职业许可、费用、日期和本地考点高于纯备考方法。
3. **需求门**：使用 Search Console 近 28 天与近 90 天的点击、展示、查询意图和排名趋势；没有数据时不得声称流量优先级。
4. **独特价值门**：页面必须有不同于同簇页面的用户任务和原创决策帮助，否则优先合并或继续 noindex。
5. **实施成本**：在同等风险和需求下，优先可在 1–3 个工作日内完成并验证的切片。

## 7. 20 天执行路线

### Day 1：确认、冻结范围和恢复执行

**Owner**：CEO / Chief of staff 确认；代码工程师同步任务图。
**输出**：接受 revision 2；将已有 FAN-35–FAN-44 调整为本节任务矩阵；暂停旧六周计划中的第二个 pending 国家簇和新增页面门禁。
**停止条件**：revision 2 未确认前不按新范围调整子任务；已在进行的 FAN-36 只允许保全现有工作和记录证据，不扩大页面范围。

### Day 1–3：首个垂直切片与数据门并行

**FAN-36 页面**：`telc-vs-goethe-for-german-visa`。
**用户决策**：先向具体接收机关确认可接受证明，再比较已确认选项的考试产品与本地执行。
**最小范围**：

- 建立 national/mission or competent receiving authority → exam owner → selected authorised centre 的 claim/source/boundary 表；
- 删除或限定任何普遍接受、固定费用、固定日期、固定难度或结果暗示；
- 补齐来源复核 front matter、页面内核验动作和任务专属差异化内容；
- 更新聚焦测试、内容台账、任务日志和 Obsidian 待审核记录；
- 由未参与实现的 reviewer 复核，修复 P0/P1/P2 后由原 reviewer 返回 `PASS`。

**FAN-35 数据门**：账号 owner 在 Day 3 前提供 Search Console 28/90 天非个人级汇总，项目总负责人完成排序。FAN-45 是当前外部输入路径。
**Day 4 强制决策**：如数据仍不可用，项目总负责人把 FAN-35 以“无数据回退已启用”结论完成，按来源风险、事实波动性、权威链清晰度和 1–3 天可交付性选出 1 个 pending 国家簇；不得让 FAN-35 长期保持 blocker。

### Day 4–8：关闭其余 telc 来源缺口

FAN-36 通过后，FAN-37、FAN-38、FAN-39 可并行启动：

1. `telc-b1-b2-exam-format-and-preparation`
2. `telc-b1-b2-fees-and-test-centers`
3. `telc-b1-b2-germany-work-nursing`

每页单独判断保留、合并或继续 noindex。工作/护理页必须分开雇主、职业监管机构、移民机关和考试提供方的权责；费用/考点页不得将某地条款泛化。Day 8 前每页至少形成来源处置记录和可复核候选结论。

**目标状态**：4 篇 telc 页面均有明确来源处置；`sourceReviewStatus` 只有在证据实际满足时才从 49/53 提升，不以补字段代替核验。

### Day 9–13：三个独立维护分支

在 FAN-35 完成“数据排序或无数据回退”后，以下三个分支可并行：

- **FAN-40**：只处理排名第一或风险最高的 1 个 `verification-pending` 国家簇，最多 2 页；候选簇限定为 UK、Canada、Italy、Spain、France、Netherlands、Portugal、Finland 的现有页面，不新建页面。
- **FAN-42**：从真实落地页/查询中选 1 篇 Germany A1 核心页；无数据时按来源风险和事实新鲜度选页。
- **FAN-43**：从真实落地页/查询中选 1 篇 Germany B1 核心页；无数据时按来源风险和事实新鲜度选页。

每个分支必须先记录选页理由，再检查官方来源、决定权、读者下一步、发现门禁和内链。若核验后无需修改，记录来源、日期和“无需修改”的证据，不为制造变更而改写。

### Day 14–17：范围冻结、独立复核和返工

- Day 14 起禁止增加页面或新增需求；只允许关闭 P0/P1/P2、修复测试、同步英文事实对应的必要中文内容与台账；
- 每个内容 issue 由未参与实现的 reviewer 进行只读复核；实现者修复后必须由原 reviewer re-review 并返回 `PASS`；
- 任一页面无法确认当地/项目/考点规则时，保留安全门并记录具体读者核验动作，不猜测，不以 deadline 覆盖 authority-first 政策；
- Day 17 结束时，FAN-37–FAN-40、FAN-42、FAN-43 均应为 `done` 或拥有第一等 blocker、owner 和明确解阻动作。未安全完成的页面从发布候选中移除，但保留处置记录。

### Day 18–20：批次验收与 owner 决策包

**FAN-44 调整为 20 天批次验收门**：

- 汇总实际处理页面、逐页来源处置、状态变化、测试与独立 review 证据；
- 运行受影响的聚焦测试、`npm test`、`npm run launch-check` 和 `git diff --check`；
- 核对 `docs/CONTENT_MAP.md`、`docs/TASK_LOG.md` 和每个内容变更的 Obsidian 待审核记录；
- Day 19 向 CEO / Chief of staff 提交“接受候选包 / 退回修正 / 保持未发布”的决策项；
- Day 20 关闭本计划执行窗口，真实记录未完成项、blocker 与 owner；不因期限自动 commit、push、deploy 或 publish。

### 获批后任务图调整矩阵

| Issue | 交付物 | Owner | 新版初始状态 | 硬依赖 / 处理 |
| --- | --- | --- | --- | --- |
| FAN-35 | Day 3 数据排序或 Day 4 无数据回退 | VisaLang 项目总负责人 | 保持当前状态 | FAN-45 为外部输入，但 Day 4 必须给出回退结论 |
| FAN-36 | 首个 telc 垂直切片 | 代码工程师 | `in_progress` | 无；已在执行，范围冻结为单页 |
| FAN-37 | telc format/preparation | 代码工程师 | `blocked` | blocked by FAN-36 |
| FAN-38 | telc fees/test centers | 代码工程师 | `blocked` | blocked by FAN-36 |
| FAN-39 | telc Germany work/nursing | 代码工程师 | `blocked` | blocked by FAN-36 |
| FAN-40 | 1 个 pending 国家簇，最多 2 页 | 代码工程师 | `blocked` | blocked by FAN-35；不再依赖全部 telc 完成 |
| FAN-41 | 第二个 pending 国家簇 | 代码工程师 | 计划取消 | revision 2 接受后改为 `canceled`，超出 20 天范围 |
| FAN-42 | Germany A1 选 1 页复核 | 代码工程师 | `blocked` | blocked by FAN-35；与 FAN-40/FAN-43 并行 |
| FAN-43 | Germany B1 选 1 页复核 | 代码工程师 | `blocked` | blocked by FAN-35；与 FAN-40/FAN-42 并行 |
| FAN-44 | Day 18–20 批次验收门 | VisaLang 项目总负责人 | `blocked` | blocked by FAN-37、FAN-38、FAN-39、FAN-40、FAN-42、FAN-43 |

父子关系只用于追踪，不代替依赖。revision 2 获批后才修改上述 issue 描述、状态和 `blockedByIssueIds`；修改后必须逐项回读验证。

## 8. 度量与复盘

### 每个切片记录

- source gate：reviewed / pending 及理由；
- discovery gate：index、sitemap、主要发现、广告运行时的实际状态；
- quality gate：搜索意图、独特任务、官方核验动作、内链和下一步；
- verification：聚焦测试、全量测试、launch check、diff check、独立 review；
- release boundary：未发布 / 已授权待发布 / 已部署（只能按真实证据记录）。

### Day 10 中检与 Day 20 复盘

- 计划范围、已完成/待复核/被阻塞页面和剩余日数；
- 如数据可用，记录近 28 天与前一 28 天的页面/查询点击、展示、CTR 和平均排名；
- 被更新页面是否获得更匹配的查询，而不是只看总流量；
- `sourceReviewStatus`、`contentStatus`、noindex 和 sitemap 的数量变化；
- 合并、继续 noindex 或恢复发现的逐页理由；
- 独立 review、聚焦测试、全量验证、台账和 Obsidian 同步的实际完成度；
- 下一窗口的单一优先任务、owner 和 Day 20 后待办。

在取得首份 Search Console 基线前，不设置数值增长目标。基线到位后由 CEO 确认一个主要业务指标和一个防护指标，避免工程团队自行改变产品目标。

## 9. 角色与升级路径

| 事项 | Owner | 升级动作 |
| --- | --- | --- |
| 计划、优先级与业务指标批准 | CEO / Chief of staff | 在 FAN-24 确认或退回计划 |
| Search Console / Analytics 汇总导出 | 账号 owner / FAN-45 owner | Day 3 前提供 28/90 天非个人级导出；无法提供则由项目总负责人在 Day 4 启用无数据回退 |
| 内容实现与自动验证 | 代码工程师 | 在子任务记录命令、结果、风险和剩余工作 |
| 独立内容/代码复核 | 未参与实现的 reviewer | 对 P0/P1/P2 给出结论；未 `PASS` 不报完成 |
| 生产发布 | release owner + CEO 授权 | 单独批准后执行，不由本计划自动授权 |

## 10. CEO 待确认事项

1. 是否批准 20 个自然日口径（获批当日为 Day 1；若 2026-08-14 获批，截止 2026-09-02）？若期望 20 个工作日，请在确认时明确退回修改。
2. 是否批准把本轮范围压缩为最多 8 页：4 篇 telc、1 个 pending 国家簇最多 2 页、Germany A1/B1 各 1 页，并取消 FAN-41 的第二个 pending 国家簇？
3. 是否批准 Day 3 数据截止和 Day 4 无数据回退，由 VisaLang 项目总负责人作出“数据排序 / 风险排序”结论？
4. 是否确认现有 Founding Engineer 或另一个未参与实现的 reviewer 承担各切片独立复核？在 reviewer 未命名前，实施可准备候选稿，但不能标记 review-passed。

确认后再调整已存在的 FAN-35–FAN-44 任务描述、状态和依赖；确认本计划不等于授权 commit、push、deploy、访问外部账号或发布内容。
