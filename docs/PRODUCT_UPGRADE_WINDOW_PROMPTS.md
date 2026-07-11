# flowlight.me 产品升级：窗口执行提示词（v1）

> 项目：`/Users/fanlw/Documents/考试网站维护/VisaLang`
> 目标：把 flowlight.me 从语言考试内容库升级为“德国申请场景下的语言证明决策工具站”。
> 主源码：`src/` Astro 层；根目录静态 HTML/JS/CSS 仅为兼容层。除非单独授权，禁止在 `dist/`、`deploy/`、`public/_headers`、`public/_redirects` 中改动。

## 0. 所有窗口的共同执行协议

开始前必须：

1. 阅读 `docs/PROJECT_CONTEXT.md`、本文件、`docs/TASK_LOG.md` 的最近记录。
2. 运行 `git status --short`，不得覆盖既有未提交改动。
3. 先扫描本窗口涉及的文件，列出将修改/新建的文件；若范围不清楚，停止并向总调度提出问题。

共同边界：

- 只改本窗口获授权的文件与直接必要的测试；不要“顺手”改别的窗口范围。
- 不删除现有页面；优先深化、复用或新增明确路由。
- 不作法律、移民、签证、考试通过、证书必然被接受、官方合作关系等承诺。
- 涉及规则、豁免、费用、日期、成绩周期、考试接受度时，只能写稳定的流程性说明；具体事实必须有当前官方来源，并保留“以当地德国使团/主管机关/学校/考试机构为准”的提醒。
- 每个新索引页面、工具页、产品页必须有：明确 H1、独立 title/description、CTA、官方核验提醒、免责声明、内部下一步链接、可维护的更新时间信号。
- 不新增重依赖；优先 Astro、TypeScript、静态数据和小型浏览器脚本。无已确认后端时，邮箱、下载、支付只能是清楚标注的 mock/intent UI，不能伪称已发送、已收费或已保存数据。

完成前必须：

1. 运行与变更相称的测试；默认 `npm test`，涉及路由/构建时再运行 `npm run build` 和 `npm run launch-check`。
2. 运行 `git diff --check`。
3. 在 `docs/TASK_LOG.md` 追加：范围、文件、未做事项、事实风险、验证命令与结果、下一窗口接口。
4. 交接时只报告：改动文件、已验证结果、尚需人工确认项。

## 1. 依赖顺序与文件所有权

执行顺序：窗口 0 → 1 → 4 → 6 → 2 与 3 → 5 → 7。

| 窗口 | 独占主责 | 不得主改 |
|---|---|---|
| 0 | 现状审计、范围裁决、工作流文档 | 产品功能与页面正文 |
| 1 | 首页信息架构、Header、Footer、基础信任页 | 工具逻辑、商业页、内容正文 |
| 2 | Germany A1 内容、A1 集群内链 | Header/Footer、工具引擎、全局样式 |
| 3 | Germany B1 内容与 B1 路线页 | A1 已成熟正文、共享工具引擎 |
| 4 | `src/pages/tools/`、工具组件、工具规则数据 | 定价、真实邮件/支付、Header/Footer |
| 5 | SEO 审计、schema、全站链接规则 | 大规模正文改写、视觉重构 |
| 6 | Pricing、产品、Route Review、Partners、留资意向 UI | 工具计算规则、真实支付或邮件后端 |
| 7 | `src/styles/global.css`、视觉统一、移动端验收 | URL、文案事实、SEO 策略、部署 |

共享文件冲突规则：`src/pages/index.astro` 由窗口 1 先完成结构；窗口 4 和 6 只在已约定的插槽接入 CTA；窗口 7 最后才调整呈现。`BaseLayout.astro` 和 `GuideLayout.astro` 只能由窗口 5 做跨站 SEO/模板改动。

---

## 窗口 0：总调度与范围裁决

**任务身份**：flowlight.me 产品升级总调度。

**目标**：持续维护一份真实的项目地图、依赖顺序和冲突边界；不把“调度”变成大规模开发。

**允许修改**：`docs/PROJECT_CONTEXT.md`、`docs/TASK_LOG.md`、本类调度/路线图文档；仅在明确批准后修改产品代码。

**执行步骤**：

1. 扫描 `src/pages`、`src/components`、`src/layouts`、`src/content/guides`、`src/styles`、`tests`、`scripts` 与当前 Git 状态。
2. 把每个需求标记为“已存在 / 部分存在 / 缺失 / 需业务确认”。
3. 为每个后续窗口给出唯一文件所有权、前置条件、验收项和不能碰的区域。
4. 在每个窗口结束后，检查其交接内容是否满足范围与验收；不合格则退回原窗口，而不是由总调度越界修补。

**交付物**：当前功能矩阵、执行顺序、窗口边界、阻塞清单。

**验收**：后续窗口不同时改同一共享文件；所有未确认的部署、邮件、支付、事实来源风险都显式列出。

**必须升级的阻塞项**：线上实际服务的是 Astro `dist/` 还是旧静态层；邮件服务商/隐私数据流；支付/交付方式；Route Review 实际人工服务 SLA。

---

## 窗口 1：首页定位、导航与基础信息架构

**任务身份**：信息架构与信任基础负责人。

**目标**：让首次访问者在 10 秒内理解：本站帮助其在报名或递件前判断所需语言证明；可用工具获得初步方向；本站不是官方或法律意见来源。

**前置条件**：窗口 0 已确认当前 Astro 层为主源码；窗口 4 的工具 URL 命名已约定为 `/tools/.../`（可先用安全占位链接）。

**允许修改**：

- `src/pages/index.astro`
- `src/components/Header.astro`、`src/components/Footer.astro`
- `src/pages/about.astro`、`contact.astro`、`editorial-policy.astro`、`affiliate-disclosure.astro`、`terms.astro`
- 与以上页面直接有关的测试

**不得修改**：工具计算逻辑、`src/pages/tools/`、产品/定价页、指南正文、全局视觉重构、部署配置。

**必须完成**：

1. 首页 Hero 明确采用：`Find the right German language proof before you book an exam.`；副标题必须覆盖 family reunion、work、Ausbildung、nursing、university、settlement、citizenship。
2. 首页按顺序提供：Hero CTA → Route Finder 入口 → Germany 热门路线 → 工具入口 → 信任/核验说明 → 产品与人工核对入口。
3. 主导航提供 Home、Germany、Exams、Tools、Guides、Pricing、Partners、About。首版可用可访问的二级链接页或普通链接，不为“下拉菜单”引入复杂 JS。
4. Footer 必须保留并补齐 About、Editorial Policy、Disclaimer/Terms、Affiliate Disclosure、Privacy、Contact、Germany Guides、Tools、Popular Routes。
5. 所有新链接必须指向现有 URL 或已与对应窗口约定的未来 URL；未实现的服务不能伪装成可购买/可发送。
6. 在首页和信任页采用固定合规含义：信息性指导、非官方、非法律/移民建议、须向当地德国使团/主管机关/学校/雇主/考试机构核验。

**交付物**：更新后的首页、导航、Footer、基础信任页面，以及“首页 CTA → 工具/商业页 URL 清单”。

**验收**：首页仅通过首屏与紧邻区块即可回答“它是什么、先做什么、如何继续、为何可信”；无失效链接；`npm test` 通过。

---

## 窗口 2：Germany A1 Family Reunion 内容集群

**任务身份**：Germany A1 内容与集群转化负责人。

**目标**：把既有 16 篇 A1 指南整理为一个可从任意入口进入、再走向工具与产品的完整决策路径，而不是重复新写 12 篇相似文章。

**前置条件**：窗口 4 已给出工具 URL；窗口 6 已给出产品/Review URL，或提供明确的暂定链接策略。

**允许修改**：

- `src/pages/germany-family-reunion-a1.astro`
- `src/content/guides/*` 中 `category: "germany-a1"` 的文件
- 必要时新增唯一且不与现有搜索意图重复的 A1 Markdown 指南
- A1 相关测试

**不得修改**：Header/Footer、工具规则、定价/支付、全局 CSS、非 A1 指南、部署配置。

**执行步骤**：

1. 先建立“需求页 → 既有 slug → 缺口 → 处理方式”映射，重点核实 requirement、accepted exam、provider comparison、timeline、documents、fees/results、retake、speaking、writing、booking、official verification。
2. 优先深化现有页面；只有缺少唯一搜索意图时新增页面。不得把同一主题拆成薄页。
3. A1 hub 必须提供明确顺序：确认要求/豁免 → 核对可接受证明 → 比较考试 → 核验中心和条款 → 规划结果与补考缓冲 → 整理材料 → 备考。
4. 每篇 A1 页必须有：适用边界、官方核验动作、FAQ、更新时间、回 A1 hub 的链接，以及 Route Finder、Checklist、Timeline、Exam Comparison、A1 Pack、Route Review 的下一步链接。
5. 对 ÖSD、豁免、证书接受度、结果时间、费用等高风险主题，仅给出核验路径；不把跨地区信息写成普适事实。

**交付物**：A1 内容映射表、更新后的 A1 hub/指南、集群内链矩阵。

**验收**：从任一 A1 页面可在三次点击内抵达 hub、至少一个工具和至少一个下一步转化入口；无新增无来源的规则承诺；构建与检查通过。

---

## 窗口 3：Germany B1 永居与入籍内容集群

**任务身份**：Germany B1 路线内容负责人。

**目标**：建立以“主管机关核验优先”为核心的 B1 永居/入籍决策集群，避免把考试介绍误写成资格结论。

**前置条件**：窗口 4、6 已明确共享工具和转化 URL。

**允许修改**：

- 新增 B1 路线页（建议 `/germany-b1-settlement-citizenship/`）
- `src/content/guides/*` 中 `category: "germany-b1"` 的文件
- 新增 B1 Markdown 指南和相应测试

**不得修改**：A1 正文、Header/Footer、工具引擎、全局样式、部署。

**必须完成**：

1. 先盘点既有九篇 B1 指南，明确哪些可复用为 settlement、citizenship、comparison、speaking、writing、timeline 支撑页。
2. 补齐真正缺失的高意图页面：Settlement Permit、Citizenship、DTZ vs Goethe B1 vs telc B1、Leben in Deutschland + B1、B1 Timeline、B1 Checklist；写作页仅在既有内容无法承接时新增。
3. 每篇页面必须把“语言证明”与居留年限、收入、保险、住房、申请程序等其他条件严格区分，明确本站不能判断个案资格。
4. 每篇页面链接至 B1 hub、Route Finder、Checklist、Timeline、Exam Comparison、Route Review；备考型页面还链接 B1 practice pack 的实际或暂定 URL。

**交付物**：B1 hub、内容映射、所需新指南、内部链接矩阵。

**验收**：用户能从永居或入籍入口完成“核验要求 → 选择/比较语言证明 → 清单与时间线 → Review”的路径；不含地区通用化或法律结论；测试/构建通过。

---

## 窗口 4：轻量工具系统

**任务身份**：决策工具系统负责人。

**目标**：以静态配置和小型前端逻辑实现首版可用的 A1 决策闭环，并为 B1、Ausbildung、Nursing、University 预留可扩展规则结构。

**允许修改/新增**：

- `src/pages/tools/route-finder.astro`
- `src/pages/tools/checklist-generator.astro`
- `src/pages/tools/timeline-calculator.astro`
- `src/pages/tools/exam-comparison.astro`
- `src/pages/tools/email-reminders.astro`
- `src/components/tools/*`
- `src/data/route-tools.ts`（规则、输出、CTA、链接配置）
- 工具专用测试；仅添加必要的工具样式

**不得修改**：Header/Footer、产品/价格定义、真实邮件/支付后端、指南正文、部署。

**实现要求**：

1. Route Finder 收集 country、purpose、application location、current level、existing certificate、target submission date；首版至少可靠覆盖 Germany family reunion A1，并为其他目的返回“需向相应机关核验”的安全结果。
2. Checklist Generator 根据 route 输出优先级、材料核验项目、完成状态和工具/指南下一步。
3. Timeline Calculator 输入目标日期、考试类型、结果等待、补考缓冲、翻译/认证时间；只做用户输入的日期推算，标注为规划估算，不假装知道真实中心周期。
4. Exam Comparison 只能比较已配置的维度；费用、结果时间、中心覆盖必须写为“请向官方中心核验”，不能输出虚构的比较结论。
5. Email Reminder 仅做 capture/intent UI 或本地 mock success state，明确未接入真实发送服务。
6. 所有工具结果都有：信息性指导声明、官方核验动作、相关指南、Checklist/Timeline 互链、A1 Pack/Route Review CTA、可分享的查询参数或可复制摘要。
7. 所有表单具备标签、默认提示、必填校验、错误信息和移动端可用性。

**交付物**：五个工具 URL、规则配置、工具测试、已配置 route 清单和未支持 route 的安全降级策略。

**验收**：A1 用户可在浏览器完成“Route Finder → Checklist → Timeline → 看到 Pack/Review CTA”；没有后端时不会声称邮件已发送；`npm test`、`npm run build`、`npm run launch-check` 通过。

---

## 窗口 5：SEO、Schema 与内链审计

**任务身份**：搜索结构与集群连接负责人。

**目标**：在新页面已经落地后，让德国 A1、B1、工具和产品形成清晰、不互相抢词的搜索与转化结构。

**前置条件**：窗口 1、2、3、4、6 的最终 URL 已冻结；如 URL 未冻结，只完成审计报告，不修改实现。

**允许修改**：

- `src/layouts/BaseLayout.astro`、`src/layouts/GuideLayout.astro`
- `src/content.config.ts`（仅当 schema 增字段确有必要）
- 页面 metadata、相关链接、SEO 测试、sitemap/检查脚本

**不得修改**：正文事实、视觉设计、Header/Footer 信息架构、工具计算规则、部署。

**执行步骤**：

1. 制作 URL—主关键词—搜索意图—下一步 CTA—schema 的矩阵；A1 与 B1 每个主题只能有一个主页面。
2. 检查 H1、title、description、canonical、breadcrumb、更新时间、FAQ、CTA、官方核验提醒、工具/产品链接。
3. 让 A1 hub、B1 hub、工具页、产品页形成双向链接；不使用关键词堆砌。
4. 保留已有效的 Article、Breadcrumb、WebSite schema；只有内容真实满足 FAQ/HowTo/Product 定义时新增对应 schema。
5. 验证 sitemap 中存在所有应索引页面，且 noindex 页面不会被错误收录。

**交付物**：SEO 矩阵、修复后的 metadata/schema/链接、仍需人工官方复核的页面清单。

**验收**：无重复主 title/description、无明显孤儿页、无失效内部链接、构建产物和 sitemap 一致；测试、构建、launch-check 通过。

---

## 窗口 6：产品、留资与商业闭环

**任务身份**：可转化产品信息架构负责人。

**目标**：建立透明、非误导性的免费工具 → 低价资料包 → 人工信息性 Route Review → Partners 的转化路径。

**前置条件**：窗口 4 已提供工具 CTA URL；产品价格、实际交付方式、客服邮箱/表单目的地已由业务方确认。未确认时只能完成“coming soon / contact intent”版本。

**允许修改/新增**：

- `src/pages/pricing.astro`
- `src/pages/products/*`
- `src/pages/route-review.astro`
- `src/pages/partners.astro`
- `src/components/products/*`、产品数据文件、商业页相关测试

**不得修改**：真实支付集成、真实邮件后端、工具计算规则、Header/Footer、指南事实、部署。

**必须完成**：

1. Pricing 清楚比较 Free Tools、A1 Family Reunion Pack、A1 Practice Pack、Route Review、Future AI Correction、Partners/B2B；价格只能在已确认时展示。
2. A1 Pack 和 Practice Pack 必须写清：适合谁、包含什么、不包含什么、使用方式、官方核验边界、无签证/考试保证。
3. Route Review 明确是 informational review，不是法律意见；说明所需输入、输出边界、何时应咨询合格律师；不得使用“批准”“保证接受”等语言。
4. Partners 说明合作类别、透明披露、编辑独立性和联系入口；不得将 Affiliate link 表述为官方推荐。
5. 所有商业 CTA 都有真实目标或明确的“request access / contact”状态；不能制造支付成功、邮件已发、人工已受理的假状态。

**交付物**：商业页面、CTA 映射表、业务确认项清单。

**验收**：读者可分辨免费、付费、人工服务及其限制；每一页有免责声明、官方核验提醒和回工具/指南的路径；测试/构建通过。

---

## 窗口 7：UI 统一、移动端与最终质检

**任务身份**：最终体验与视觉一致性负责人。

**目标**：在功能和页面结构稳定后，以现有设计 token 为基础，把站点统一为专业、清晰、国际化的决策工具体验；不是重做品牌或复制参考网站。

**前置条件**：窗口 1–6 的路由、文案、CTA 和 schema 已冻结；若仍在频繁新增结构，本窗口只出视觉审计，不改 CSS。

**允许修改**：

- `src/styles/global.css`
- 与无障碍、响应式、组件呈现直接相关的 `src/components/*`、`src/layouts/*`
- 视觉/响应式测试或检查脚本

**不得修改**：URL、页面事实文案、SEO 主策略、工具规则、商业政策、部署。

**必须完成**：

1. 统一 Hero、Route Card、Tool Card、Guide Card、Checklist Item、Timeline Step、Disclaimer、Official Verification、Pricing Card 的视觉层级和状态。
2. 重点检查首页、A1/B1 hub、指南页、五个工具页、产品页在 360px、768px、1024px 宽度下的可读性和 CTA 可点击性。
3. 表格在移动端必须可横向滚动或变为可读卡片；表单不应要求横向滚动；按钮有清楚的 hover/focus 状态。
4. 保持克制：单一主色系统、有限辅助色、无无意义动画、无人物图库填充、无“中介广告”视觉暗示。
5. 不改第二套设计系统；只扩展 `global.css` 现有 token/组件类。

**交付物**：UI 变更、关键页面桌面/移动端截图或检查记录、视觉问题修复清单。

**验收**：全站 CTA、卡片、警示/核验信息、表单、表格和导航在移动端可用；无明显样式回归；`npm test`、构建、launch-check、`git diff --check` 通过。

## 2. 统一交接模板

每个窗口完成时，用下列格式交接：

```md
## Window N handoff

### Completed
- [result, not activity]

### Files changed
- `path` — [why]

### Verification
- `command` — [result]

### Decisions/interfaces for next window
- [final URL, component API, data contract, or explicit non-decision]

### Human confirmation still required
- [only genuine external/owner decisions]

### Scope not touched
- [protected areas]
```
