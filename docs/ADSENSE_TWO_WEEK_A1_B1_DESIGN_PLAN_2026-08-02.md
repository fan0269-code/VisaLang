# VisaLang 两周 AdSense 低价值内容整改：A1/B1 内容与任务型 UI 设计方案

- **状态：** 已确认的设计定稿，待转化为实施计划
- **确认日期：** 2026-08-02
- **适用站点：** `https://visalang.org`
- **核心拒因：** Google AdSense 政策中心显示“低价值内容”
- **责任边界：** 本文定义整改目标、内容与 UI 标准、验收门槛及排期；不承诺 Google AdSense 必然批准。

---

## 1. 背景、目标与非目标

### 1.1 已知背景

VisaLang 已具备 Astro 静态站、基础技术 SEO、sitemap、robots、结构化数据、政策页面、`ads.txt`、A1/B1 路线和工具页面等基础。Google AdSense 已验证网站所有权，但当前审核提示为“低价值内容”。

现有全站风险主要来自：

- 国际主题覆盖范围大于已成熟内容的覆盖范围；
- 多篇英文指南正文偏短且页面结构相似；
- 非德国主题中仍有 `starter-overview`、`verification-pending` 或相近任务页面；
- 组织署名虽真实，但编辑方法、事实核验、更新记录和责任边界需要更可见；
- CMP、Auto Ads、生产端广告位置、Search Console 索引和移动端体验必须以真实生产证据验证，不能由源码或政策文案替代。

### 1.2 两周目标

在两周内把 VisaLang 收敛为一个可被独立审核的、聚焦于以下两条德国路径的内容产品：

1. **Germany A1 for family reunion**；
2. **Germany B1 for settlement or citizenship**。

可控的完成定义是形成并上线**可提交 AdSense 复审的版本**：核心内容具备独立价值、官方来源、透明编辑责任和可执行任务；未成熟国际内容不再稀释整站主题和质量信号；生产环境证据完整。是否批准仍由 Google 独立决定。

### 1.3 非目标

本窗口不做以下事项：

- 不承诺或暗示签证、永居、入籍、考试、证书接受性或 AdSense 审核结果；
- 不为增加页面数量批量创作国际内容；
- 不新增广告位、产品、服务、付费内容、表单、支付、邮件收集或第三方追踪；
- 不做全站视觉换皮或无关重构；
- 不将源码构建通过、页面已上线或政策文案存在，表述为 Google 已认可；
- 不伪造作者、资质、人工审阅、官方认可或专业身份。

---

## 2. 已确认决策记录

| 决策项 | 确认结果 |
|---|---|
| AdSense 整改目标 | 两周内完成可审核版本并在 Go 条件满足后申请复审；不保证获批 |
| 被拒原因 | 低价值内容（Low value content） |
| 站点定位 | 双层定位：德国深度路线 + 国际官方核验导航 |
| 核心主题 | Germany A1 家庭团聚；Germany B1 永居／入籍 |
| 国际内容 | 保留 URL；统一 `noindex`、无广告、退出 sitemap 和主发现；达到标准后再逐篇升级 |
| 作者策略 | 继续使用 `VisaLang Editorial Team`；以编辑方法、来源、核验日期、更新记录和纠错渠道建立透明度；不公开个人身份 |
| 语言策略 | 英文为审核和 SEO 主语言；中文只覆盖德国 A1/B1 的关键高意图页面 |
| 两周内容规模 | 6–8 篇深度英文核心页；4–6 篇关键中文对应页 |
| 总体执行路径 | 主题集群 + 任务型 UI，而不是只扩写文章或全面视觉重设计 |
| 广告策略 | 仅成熟 A1/B1 核心页可成为广告候选；广告不得破坏首次答案获取、风险提示和任务完成 |

---

## 3. 产品定位与双层信息架构

### 3.1 对外定位

VisaLang 帮助需要办理德国语言证明的人完成：**确认主管机关、核验证明／考试、准备报名、规划时间线和提交前检查**。

VisaLang 不是使领馆、外管局、入籍机关、考试机构、法律顾问或移民顾问，也不替代任何有最终决定权的机构。所有高影响结论必须回到相应官方主体核验。

### 3.2 公开信息架构

```text
首页
├── Germany A1 family reunion（完整路线集群）
│   ├── A1 Route Hub
│   ├── Certificate and acceptance check
│   ├── Booking and test-centre preparation
│   └── Timeline and submission preparation
├── Germany B1 settlement / citizenship（完整路线集群）
│   ├── B1 Route Hub
│   ├── Authority and procedure check
│   ├── Certificate and acceptance check
│   └── Timeline and submission preparation
├── Guides（仅成熟、可索引的德国核心内容）
├── Tools（Route Finder、Checklist、Timeline 等；不承担薄内容获客）
├── Official verification navigator（国际内容隔离层）
│   └── 保留原 URL，但不进入主发现
└── Trust & policies
    ├── About
    ├── Editorial Method
    ├── Content Update Log
    ├── Contact and corrections
    ├── Privacy / Cookie / Terms
    └── Affiliate disclosure
```

### 3.3 国际内容隔离规则

所有非德国 A1/B1 内容在本窗口统一执行：

- 保留现有 URL，避免不必要的 404；
- 页面设置 `noindex`，且不进入 XML sitemap；
- 禁止加载广告；
- 从首页、主导航、默认 Guides、相关推荐和其他主动发现路径移除；
- 顶部显示：`Official verification navigator · Not a complete VisaLang route guide`；
- 仅保留“应向谁确认、应问什么、原始官方来源、何时停止依赖概述”的导航价值；
- 不得使用 `complete`、`recommended route`、`best` 等暗示完整专业结论的表述。

国际页面只有在独立通过本方案第 5 节发布门槛后，才可逐篇恢复索引、sitemap、主发现与广告候选资格。

---

## 4. 核心页面体系与内容矩阵

### 4.1 页面职责

| 页面类型 | 角色 | 读者完成的任务 |
|---|---|---|
| 首页 | 路线分流页 | 判断属于 A1、B1，或需要先核验主管机关 |
| Route Hub | 完整任务中枢 | 从主管机关确认到提交前复核，理解完整路径与顺序 |
| Core Support Guide | 单一决策的深度执行页 | 解决一个不能由其他页面替代的高意图问题 |
| Tools | 任务辅助 | 生成／整理核验清单、时间线或问题，不替代官方决定 |
| Official Verification Navigator | 未成熟资产的诚实承接页 | 识别应联系谁、核验什么、何时停止使用页面概述 |
| Editorial Method / Update Log | 信任基础设施 | 理解内容如何产生、核验、更新和纠错 |

### 4.2 英文核心内容矩阵

目标为 6–8 篇。优先完成 6 篇强内容，只有在来源、差异化和审校均满足门槛时再扩展至 8 篇。

| 集群 | 页面 | 页面级任务 |
|---|---|---|
| A1 | A1 Route Hub | 识别是否应走家庭团聚 A1 路径，并完成从官方确认到递交前检查的完整顺序 |
| A1 | Certificate and acceptance check | 报名前确认受理方、证明／考试机构、时间和适用范围 |
| A1 | Booking and test-centre preparation | 核对考点、报名信息、证件信息、考试安排与申请节点 |
| A1 | Timeline and submission preparation | 从递交节点倒推考试、成绩、重考缓冲和材料核对 |
| B1 | B1 Route Hub | 区分永居与入籍，建立完整的官方核验与准备路径 |
| B1 | Authority and procedure check | 在不同程序、主管机关和个案条件下，先确认适用要求 |
| B1 | Certificate and acceptance check | 核验证书、考试机构、有效性、接受范围和材料要求 |
| B1 | Timeline and submission preparation | 从申请／递交节点倒推考试和材料准备，并保留不确定性缓冲 |

如时间不足，最低可提交内容集合为：两篇 Route Hub、A1 证书核验、A1 时间线、B1 主管机关／程序核验、B1 证书核验。

### 4.3 中文内容矩阵

目标为 4–6 篇，且只能在对应英文事实审核完成后发布。推荐顺序：

1. A1 Route Hub；
2. A1 Certificate and acceptance check；
3. A1 Timeline and submission preparation；
4. B1 Route Hub；
5. B1 Authority and procedure check；
6. B1 Certificate and acceptance check。

中文必须自然面向中文读者写作，不得省略英文版本中的适用边界、风险提示、来源或行动项；不得机械翻译。

---

## 5. 内容分级、发布标准与审核清单

### 5.1 内容等级与公开资格

| 内容等级 | 定义 | 索引 / sitemap | 主发现 | 广告 |
|---|---|---|---|---|
| Complete Route Guide | 已完整解决一条高意图德国路线，来源、边界和完整任务路径齐全 | 可 | 可 | 可作为候选 |
| Core Support Guide | 已完整解决路线中一个独立决策 | 可 | 可 | 可作为候选 |
| Official Verification Navigator | 仅帮助读者识别官方核验任务，尚非完整路线 | 不可 | 不可 | 不可 |
| Research / Update Pending | 来源、差异化或完整性不足 | 不可 | 不可 | 不可 |
| Retire / Merge Candidate | 与相邻页面重叠、无法补足独立价值或已失效 | 不可 | 不可 | 不可 |

只有前两类可：进入 XML sitemap、出现在 `/guides/` 默认列表、获得首页／路线页／相关推荐主动推荐、使用成熟状态文案和成为广告候选。广告候选不等于必须展示广告。

### 5.2 每篇可索引核心页的硬性标准

#### A. 首屏与直接答案

H1 后的首个阅读区必须清楚说明：

- 本页服务谁；
- 对应哪个德国程序；
- 读者当前需要完成的关键决定；
- 最终由哪个官方主体确认；
- 本页来源的最后核验日期。

正文前 15% 必须给出标准情况下的行动方向、需要停止并核验的条件，以及下一步清单或链接。禁止使用“所有人最佳”“保证接受”“你需要知道的一切”等无边界结论。

#### B. 官方证据链

每项会影响考试、申请、材料或时间线的事实结论都必须记录：结论、官方来源 URL、来源主体、适用范围、核验日期、该来源支持／不支持什么，以及不确定时读者应联系谁。

来源优先级：

1. 主管机关、使领馆、移民／入籍官方机构；
2. 官方考试机构与官方授权考点；
3. 政府认可的公共服务信息；
4. 仅用于背景的高可信非官方资料。

论坛、搜索摘要、竞争站文章和无来源社媒信息不得作为关键结论依据。费用、日期、考点、成绩时间、证书时效、接受清单、预约、取消和个案结果等动态事实，未经当前官方来源验证不得写死。

#### C. 原创决策价值

每篇核心页必须至少具备下列三类价值中的两类；Route Hub 必须三类齐全：

1. **条件分支／决策路径：** 如果 X，先做 Y；如果 Z，停止并联系相应机构；
2. **错误模式与后果：** 至少 3 个与本页任务直接相关的错误、后果与避免动作；
3. **任务产出物：** 可带走的核验清单、报名资料清单、倒排计划、材料顺序或询问模板。

通用免责声明、重复 CTA 或单纯站内链接，不计为原创决策价值。

#### D. 任务完成区

每页结尾必须包含 `Before you continue`：3–7 个可执行任务、一个明确的官方核验动作、一个相关工具或下一篇内容，以及 `Report an issue`。主要结束动作不得是广告或商业 CTA。

#### E. 深度保护线

字数不是 Google 的公开审核阈值，任务完整度优先。但为防止碎片化内容，正文建议范围为：

| 页面类型 | 英文正文建议范围 | 最低内容要求 |
|---|---:|---|
| Route Hub | 1,800–2,800 词 | 适用范围、主管机关、完整任务路径、证明／考试核验、时间线、材料检查、错误模式、工具、来源、更新记录 |
| Core Support Guide | 1,000–1,800 词 | 单一任务答案、条件分支、至少 3 个错误模式、任务产出、来源和下一步 |
| 中文核心页 | 通常 1,200–2,000 汉字 | 信息、边界、来源和行动项与英文审核版本一致 |
| Official Verification Navigator | 不以字数为目标 | 只保留清晰核验任务、来源和状态说明 |

无法达到独立价值的页面必须合并、降级或暂缓，不可用泛泛解释填充。

### 5.3 发布前逐页审核清单

**独立价值**

- [ ] 一句话说明独立用户任务；
- [ ] 与同集群页面不存在可合并的重叠；
- [ ] 首屏包含适用对象、程序、边界和主管确认方；
- [ ] 至少两类原创决策价值；Route Hub 具备三类；
- [ ] 结尾提供可执行任务，不是泛泛 CTA。

**事实与来源**

- [ ] 所有高影响结论有可访问的官方来源；
- [ ] 每项来源标明机构、范围和核验日期；
- [ ] 冲突、地区差异和个案不确定性已明确；
- [ ] 无保证、必然接受或适用于所有人的表述；
- [ ] 来源失效或无法复核时不升级为成熟页。

**编辑透明度**

- [ ] 可见 `VisaLang Editorial Team`；
- [ ] 显示来源核验日期、最近实质更新和完整更新记录入口；
- [ ] 可访问 Editorial Method、来源与纠错入口；
- [ ] 不虚构专家、个人资质或审阅事实；
- [ ] 中文页在英文事实审核完成后再发布，且关联正确源版本。

**UX、SEO 与广告资格**

- [ ] 页面只有一个 H1，title 与 description 描述单一任务；
- [ ] 有所属 Route Hub 的上下文和自然下一步；
- [ ] 移动端可用来源、工具和纠错链接；
- [ ] 无侵入式弹窗、误导 CTA、自动播放或虚假下载；
- [ ] 广告不位于标题、直接答案、风险提示、任务清单或主要 CTA 之间；
- [ ] `index`／`noindex`、canonical、hreflang、sitemap 与内容等级一致；
- [ ] 已在真实手机和桌面浏览器复核。

---

## 6. 任务型 UI 设计规范

### 6.1 全站原则

视觉方向为可信、克制、可执行的“决策工作台”，而非考试培训广告页。

- **可信：** 内容状态、来源、核验日期、编辑边界可见；
- **可执行：** 每页完成一项具体判断或准备动作；
- **低焦虑：** 风险明确但不制造恐惧或虚假紧迫感；
- **分层：** 先给答案，再解释，再给证据和例外；
- **商业克制：** 广告与商业入口不打断关键决策。

继续复用现有 Astro 布局、组件与 CSS token，不另建平行设计系统。

### 6.2 首页：A1 / B1 / 不确定情形分流

首页只做三件事：分流用户、说明边界、建立信任。页面结构为：

```text
全局导航：Home · Germany routes · Guides · Tools · About

首屏：定位与边界
H1：Prepare the right German language proof — before you book an exam

路径卡：German A1 — Family reunion
路径卡：German B1 — Settlement or citizenship
路径卡：Not sure which route applies? → Route Finder

统一四步方法：
1. Confirm the authority
2. Verify accepted proof
3. Plan exam timing
4. Check documents before submission

成熟内容入口：A1 / B1 各最多 2 篇
信任区：Editorial method · source-review date · report a correction
页脚：完整政策和联系链接
```

规则：A1/B1 卡片必须说明程序、人群、关键官方确认方和单一 CTA；不确定用户入口与 A1/B1 同等可见；推荐内容最多 4 篇；首页不以国际覆盖广度为卖点；广告不得进入首屏、路径卡之间、四步核验条之间或核心 CTA 前。

### 6.3 Route Hub：完整任务中枢

A1 和 B1 使用相同的信息层级，不可共用空泛事实文案。每页包括：

```text
面包屑
内容状态条（等级、团队、来源核验日期、View sources、Report an issue）
H1 + 一句话范围
直接答案卡：行动方向、最终确认方、停止并核验的条件、下一步
任务步骤导航：01–05
每一步任务模块：目标 / 待核验事项 / 常见错误 / 工具或下一页
关键差异与风险
完成前清单
支持内容
工具
来源与更新记录
```

任务步骤为：

| 步骤 | 目标 | 必须内容 |
|---|---|---|
| 01 Confirm authority | 确认最终决定方 | 机构类型、必须问的问题、不可自行判断的情形 |
| 02 Verify proof | 核验证明／考试接受性 | 证书、机构、日期、地点、范围核验点 |
| 03 Prepare booking | 避免错误报名 | 报名材料、考点、姓名／证件、变更规则 |
| 04 Plan timeline | 预留结果与重考缓冲 | 递交节点、等待期、材料与风险缓冲 |
| 05 Check before submission | 最终复核 | 当前要求、文件一致性、再次确认动作 |

该导航只是页面内任务导航，不追踪个人资料，不显示虚假的完成百分比，不暗示完成即可获得任何行政结果。

### 6.4 Core Support Guide：单一高意图决策页

支持页必须在顶部展示所属路线，例如 `Part of the Germany A1 family-reunion route`，并提供返回 Route Hub 的链接。结构包括：

```text
面包屑 + 返回 Route Hub
内容状态条
H1
适用范围与直接答案
不适用情形 / 必须联系谁
条件分支或决策图
单一决策的深度说明
至少 3 个常见错误：错误 → 后果 → 避免动作
任务产出：清单 / 问题模板 / 时间线输入 / 材料顺序
Before you continue
来源、更新与纠错
```

相关内容最多推荐两篇，只解释明确下一步，避免形成无止境的相关文章循环。

### 6.5 内容状态、更新记录与信任组件

每篇指南在标题区显示与等级一致的状态条：

| 内容等级 | 展示文案 |
|---|---|
| Complete Route Guide | `Complete Route Guide · Source-reviewed on [date]` |
| Core Support Guide | `Core Support Guide · Source-reviewed on [date]` |
| Official Verification Navigator | `Official verification navigator · Not a complete route guide` |
| Research / Update Pending | `Research update in progress · Do not rely on this as a complete route guide` |

状态条均包含：`VisaLang Editorial Team`、`View sources`、`Report an issue` 和最后核验日期。

核心页在来源区前显示最近一次实质更新。实质更新是影响读者决策、来源、适用范围、任务或风险的变更；排版、拼写或颜色调整不作为内容更新。若官方来源变化但未完成复核，应降级或显著标识待核验。

页脚必须直接链接：About、Editorial Method、Content Update Log、Contact / corrections、Privacy Policy、Cookie Policy、Terms、Affiliate Disclosure。

### 6.6 广告与体验边界

**可成为广告候选的页面：** 已通过发布门槛的 A1/B1 Route Hub 和 Core Support Guide。

**禁止广告的页面：** 首页首屏和核心分流区、所有工具、Guides 列表／筛选结果、政策／联系／编辑方法／更新记录、404、国际核验导航页、Research / Update Pending 页面，以及标题、直接答案、关键风险、任务清单和主要 CTA 的相邻区域。

生产端验证要求：首个可见广告不得早于用户看完“范围 + 直接答案 + 官方确认边界”；广告不得与正文或按钮混淆；移动端不得遮挡目录、任务步骤、来源、纠错或底部 CTA。若 Auto Ads 无法稳定满足这些边界，整改期应限制或关闭 Auto Ads，优先保证内容体验。

---

## 7. 编辑透明度与长期运营标准

### 7.1 Editorial Method

新增或强化公开编辑方法页，说明：

- 官方来源优先级；
- 如何区分最终决定方、考试产品方和本地执行方；
- 官方信息冲突时的处理方式；
- 何时仅给出核验动作而不下结论；
- 写作、事实核验、翻译审校和发布批准的职责；
- AI 如参与初稿、整理、润色或翻译时的范围与限制；
- VisaLang 不提供法律、移民、机构接受性或个案结果判断；
- 如何报告错误及如何处理。

### 7.2 组织署名的最低透明度

继续使用 `VisaLang Editorial Team`，但每个核心页必须外显团队责任、来源审核日期、更新记录和纠错入口。不得将角色名称写成专业资格，或将自动化／AI 检查表述为人工审阅。

### 7.3 Content Update Log

新增公开更新记录。每条实质变更应包含：日期、变更类型、影响页面或范围、是否要求读者重新核验。更新日期不得被用来伪装没有实质维护的页面。

---

## 8. 两周倒排计划

### 第 1–2 天：冻结基线与隔离国际内容

- 建立全站 URL 清单并按五级内容状态分类；
- 非德国 A1/B1 页面统一 noindex、禁广告、退出 sitemap 和主发现；
- 确认核心公开集群仅为 A1 和 B1；
- 输出整改前基线：可索引 URL、sitemap URL、广告页、核心页、国际隔离页、404／重定向／标题／robots 状态。

**验收：** 国际内容不出现在主动发现路径；保留国际 URL 正确 noindex、无广告；A1/B1 未误降级；sitemap、canonical、robots 一致。

### 第 3–4 天：内容矩阵与官方来源包

- 锁定 6–8 篇英文与 4–6 篇中文目标页；
- 为每篇英文核心页建立官方来源表：关键事实、URL、机构、范围、核验日期、变化时的升级／降级动作；
- 确定集群内部链接，排除任务重叠；
- 列出旧页的合并、降级或保留导航决策。

**验收：** 每页有唯一任务、目标人群、所属路线和主管确认方；高影响结论均有可访问权威来源；无关键词替换式相似页。

### 第 5–8 天：英文核心集群

按第 4.2 节内容矩阵撰写、重写和审核英文核心页。优先保证 6 篇强内容，不以发布 8 篇半成品为目标。

**验收：** Route Hub 成为完整中枢；支持页只解决单一决策；每页通过第 5.3 节清单；桌面和手机可阅读、核验来源、完成任务并返回所属路线。

### 第 7–9 天：中文关键页

只在英文事实审核完成后开展。按第 4.3 节优先级发布中文对应页面。

**验收：** 中英文事实边界、来源、核验日期和风险提示一致；hreflang、canonical、语言切换与关联链接正确；不把英文限定条件简化为中文确定结论。

### 第 8–10 天：任务型 UI 与信任体系

- 首页完成 A1/B1／不确定情形分流；
- A1/B1 Route Hub 增加步骤导航；
- 支持页增加路线归属、任务产出与 `Before you continue`；
- 统一内容状态条；
- 上线 Editorial Method、Content Update Log、可见来源／核验日期／纠错入口；
- 补齐页脚 Cookie Policy 和 Affiliate Disclosure；
- 统一国际页面状态条，审查 Auto Ads 边界。

**验收：** 首页首屏能区分三类路径；核心页可快速找到等级、团队、日期、来源；国际页不被误解为完整路线；广告不打断答案、风险、步骤和清单。

### 第 11 天：技术 SEO、可访问性和生产前检查

- 构建、内部链接、404、重定向、canonical、robots、sitemap、H1、metadata、JSON-LD、hreflang 检查；
- 桌面与移动端复核主导航、路线卡、任务步骤、来源与纠错；
- 检查性能、布局稳定性、横向溢出、遮挡与不可操作控件。

**验收：** 核心页未误 noindex；国际页未进入 sitemap；首页→路线页→支持页→工具路径可完成；生产前检查不只依赖本地构建。

### 第 12 天：生产广告、CMP 与 Search Console 证据

由有账户权限的负责人完成：

1. **CMP / Google Privacy & Messaging：** 在 EEA、英国、瑞士等适用地区验证同意、拒绝、管理选择与再次打开入口，并记录日期、地区、浏览器、结果和截图。
2. **广告边界：** 桌面和手机检查 A1/B1 广告候选页；检查广告不遮挡主内容；检查 Auto Ads 未出现在工具、政策、国际 noindex 或 404 页面。
3. **Search Console：** 检查 sitemap 提交、A1/B1 URL 抓取／索引状态和 URL 检查结果；记录异常，不假设 Google 已抓取新版本。

**验收：** CMP 行为与政策一致；广告边界合规；核心页无阻断索引的错误；生产证据已保存。

### 第 13 天：独立审查与回归

以首次访问的目标用户与内容质量审核者双重视角检查：定位是否清晰、核心页是否真正完成独立任务、来源是否可追溯、A1/B1 是否有实质差异、国际内容是否诚实降级、组织署名下的责任是否清晰、广告是否干扰。

只修复阻碍审核的 P0／P1 问题；不在最后一天拓展新主题或进行无关视觉重构。

### 第 14 天：最终发布与复审决策

发布后复核线上版本，整理证据包，并依第 9 节作出 Go / No-Go 结论。只有全项 Go 才可在 AdSense 中勾选“我确认已解决相关问题”并申请审核。

---

## 9. 复审 Go / No-Go 门槛与证据包

### 9.1 Go 条件

**内容与定位**

- [ ] 主叙事只聚焦 Germany A1/B1；
- [ ] 至少 6 篇英文核心页达到对应等级；
- [ ] 至少 4 篇中文重点页与英文审核版本事实一致；
- [ ] 非德国内容 noindex、无广告、退出 sitemap 和主发现；
- [ ] 核心页具备独立任务、原创决策价值、任务产出和官方来源链。

**信任与透明度**

- [ ] Editorial Method 与 Content Update Log 公开；
- [ ] 核心页显示团队署名、核验日期、来源和纠错入口；
- [ ] 页脚可访问所有政策、Cookie Policy 和 Affiliate Disclosure；
- [ ] 无不可证明的专家、资质、保证或结果承诺。

**技术与广告合规**

- [ ] 域名、所有权和 `ads.txt` 可验证；
- [ ] CMP 在适用区域真实测试通过，且与政策文本一致；
- [ ] Auto Ads／AdSense 不出现在禁止页面或关键阅读区域；
- [ ] 核心页可抓取、可索引，sitemap 和 meta 一致；
- [ ] 真实手机和桌面端已走通核心阅读路径。

**过程与证据**

- [ ] 发布前检查表逐篇完成；
- [ ] 已保存生产端截图、CMP、广告位置和 Search Console 检查记录；
- [ ] 没有未处理 P0/P1；
- [ ] 最终检查基于线上已发布版本，而非仅本地版本。

任一项未完成即为 **No-Go**，不得提交复审。No-Go 时先处理缺口并重跑相关检查。

### 9.2 证据包最低目录

```text
复审证据包/
├── 01-url-and-content-status.csv
├── 02-core-page-publication-checklists/
├── 03-official-source-records/
├── 04-production-screenshots-desktop-mobile/
├── 05-cmp-verification-record/
├── 06-ad-placement-verification/
├── 07-search-console-and-sitemap-check/
├── 08-build-test-launch-check-results/
├── 09-go-no-go-decision.md
└── 10-known-risks-and-unverified-items.md
```

---

## 10. 后续 30–90 天原则

复审提交后，不立即恢复大量国际短内容。优先维护 A1/B1 的来源变化、读者纠错、索引与体验问题。后续扩展按以下顺序执行：

1. 用 Search Console、读者问题和内容缺口识别主题；
2. 为候选页面先写 brief，证明独立用户任务、官方来源和与现有页的差异；
3. 先达到成熟内容标准，再进入索引、sitemap、主发现和广告候选；
4. 若无法形成独立价值，则合并、保持官方核验导航或不创建；
5. 不用字数、更新日期、模板或广告代码伪造成熟度。

---

## 11. 实施约束与验证要求

实施必须遵循项目现有 Astro 架构：以 `src/` 为源，复用 `BaseLayout`、`GuideLayout`、共享组件和 `src/styles/global.css`。不手改 `dist/`、`.astro/` 或 `node_modules/`。

任何涉及路由、导航、SEO、内容结构、sitemap、重定向或布局的实施，在完成前至少运行：

```bash
npm test
npm run launch-check
git diff --check
```

生产部署、AdSense 账户设置、CMP 配置、Auto Ads 调整、Search Console 操作和复审提交均属于外部／难逆操作，必须由具备权限的负责人在单独授权后进行，并留下可核验记录。
