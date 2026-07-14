# VisaLang 站点升级规划 v2

> v2 合并 2026-07-04 用户给的系统性优化规格（首页工具化 + 中文站 + 文章模板 + Pillar + SEO/AdSense）。
> v1 的内容深度工作（5 篇样板 + 9 节模板 + B1 集群 9 篇）作为原料接入，不浪费。
> 定位：签证/永居/入籍/留学/职业注册的**语言考试路径导航工具站**，流量站模型，垂直深度形成壁垒。

---

## 0. 核心定位（统一表述）

- **EN**：VisaLang helps users find the right language exam for visa, residency, citizenship, study, or professional registration pathways.
- **ZH**：VisaLang 帮助用户根据签证、永居、入籍、留学或职业注册需求，找到正确的语言考试路径、官方要求、报名材料和备考方向。

用户进入网站必须 3 秒内回答：① 我该考哪个语言考试？② 我要准备什么材料？③ 下一步点哪里？

**不是博客，不是考试资讯站，是路径导航工具站。**

---

## 1. 五步交付顺序

| 步 | 内容 | 风险 | 产出 | 状态 |
|---|---|---|---|---|
| 1 | 修复中文站 | 低 | /zh/guides/ + hreflang + i18n keys 全补 | ⏳ |
| 2 | 首页改版 | 高 | Exam Finder + Hero search + trust metrics + 视觉重制 | ⏳ 用户指定先做 |
| 3 | 文章页模板升级 | 中 | 9 节→12 节（加 Quick answer / Official card / FAQPage / BreadcrumbList JSON-LD） | 🟡 5 篇已 9 节，待补 3 组件 |
| 4 | Germany A1 Pillar 样板 | 中 | Pillar Page + Cluster 内链网 | ⏳ A1 集群 12 篇已有 |
| 5 | SEO + AdSense 占位 | 低 | 结构化数据全站 + AdSlot 组件 | ⏳ |

**用户指定实施起点：步骤 2（首页重制）+ 全站视觉重制。**
**先固化本 v2 文档，再开始步骤 2。**

---

## 2. 步骤 1 — 修复中文站

### 现状（已核对）
- `zh/index.html` 静态 HTML 已是中文（title/H1/各节标题中文化，带 `data-i18n`）
- `app.js:17` 已检测 `/zh/` 设 `state.locale="zh"`
- **真实缺口**：
  1. 43 篇指南页无 `/zh/guides/` 中文版
  2. `i18n.zh` 在 app-data.js 可能 keys 不全（考试表/分类/工具卡回退英文）
  3. 无 hreflang
  4. Article/FAQPage/BreadcrumbList JSON-LD 多数指南页缺失

### 交付清单
- [ ] 建 `/zh/guides/<slug>.html` 中文版（先做 A1/B1 旗舰 9 篇，其余批量）
- [ ] 全站 `<link rel="alternate" hreflang="en|x-default|zh">`
- [ ] app-data.js `i18n.zh` keys 全补全（与 en 对齐）
- [ ] 中文文案自然，避免机翻腔；符合中文用户理解习惯
- [ ] 每个中文页独立 title/description/H1/JSON-LD
- [ ] 语言切换 EN↔ZH 双向一致

---

## 3. 步骤 2 — 首页改版（用户先做）

### 首屏信息结构
1. **Sticky header**：Logo / Countries / Exams / Guides / Exam Finder / 中文
2. **Hero**：大标题 + 副标题 + **大搜索框**（Search country, exam, or visa route）
3. **Exam Finder 模块**：Country → Purpose → Level → Exam 四级选择器
4. **Trust metrics**：43 guides / 12 routes / 11 countries（做成 trust badge，非普通文字）
5. **三入口**：Start with your country / exam / goal
6. **Featured guides / Browse by route / Latest guides**（视觉优先级低于 Finder）
7. **AdSense 横幅**（Browse by route 后，非 Hero 首屏）

### 视觉规范（immigration-tech）
- 主色 `#2563EB` / 辅助 `#0F766E` / 背景 `#F8FAFC` / 正文 `#0F172A` / 弱文本 `#64748B` / 边框 `#E2E8F0` / 提示 `#F59E0B`
- 字体：Inter（英）/ Noto Sans SC（中）/ Inter（数字标签）
- 关键词：clean / official-first / immigration-tech / soft blue / large search / route cards / trust badges / mobile-first / low-noise

### 13 个 UI 组件
Sticky header / Hero search / Exam Finder / Route cards / Trust metrics / Country cards / Exam cards / Official source card / Quick answer card / FAQ accordion / Related guides card / Waitlist CTA / AdSense-safe ad placeholder

### 改制范围
- `index.html`（EN）+ `zh/index.html`（ZH）信息架构重排
- `styles.css` 全站换色 + 新组件样式
- `app.js` 加 Exam Finder 选择器逻辑 + Hero 搜索接线

---

## 4. 步骤 3 — 文章页模板（9 节→12 节）

v1 的 9 节模板保留，补 3 个组件：

| # | 节 | v1 | v2 补充 |
|---|---|---|---|
| 1 | Quick answer 结论卡 | TL;DR verdict | 改名为 Quick answer，置顶，独立卡片样式 |
| 2 | Who this is for / skip | ✅ | — |
| 3 | 官方规格速查表 | ✅ | — |
| 4 | 工作流/学习计划 | ✅ | — |
| 5 | 可复制模板 | ✅ | — |
| 6 | 费用与流程 | ✅ | — |
| 7 | 常见失败 | ✅ | — |
| 8 | 对比与替代 | ✅ | — |
| 9 | Official sources + changelog | ✅ | 升级为 **Official source card**（name / used for / last checked / link） |
| 10 | **FAQ accordion** | ❌ | 新增 + FAQPage JSON-LD |
| 11 | **Related guides card** | 有但弱 | 强化结构 |
| 12 | **Breadcrumb + JSON-LD** | 有面包屑 | 加 BreadcrumbList JSON-LD |

### 已完成 5 篇回填
A1 study plan / B1 study plan / B1 fees / B1 settlement / B1 vs telc —— 回填 Quick answer 卡样式 + Official source card + FAQPage JSON-LD + BreadcrumbList JSON-LD。

---

## 5. 步骤 4 — Germany A1 Pillar 样板

### Pillar Page
`germany-family-reunion-a1.html`（已存在，升级为 Pillar）
- 完整覆盖：路线定位 / 谁需要 / 接受考试清单 / 材料 / 费用 / 流程 / 豁免 / 失败补救 / FAQ
- 指向所有 Cluster Guides

### Cluster Guides（A1 集群 12 篇已深化 1 篇，待深化 11 篇）
- german-family-reunion-language-requirement
- goethe-a1-germany-family-reunion
- goethe-a1-documents-checklist
- goethe-a1-fees-by-country
- goethe-a1-30-day-study-plan ✅
- goethe-a1-speaking-topics
- goethe-a1-test-centers
- goethe-a1-retake-policy
- goethe-a1-official-links-practice-resources
- goethe-a1-vs-telc-a1
- + 新建：booking-mistakes / listening-practice / exemptions / what-if-fail

### 内链规则
- Pillar → 所有 Cluster
- 每个 Cluster → 回链 Pillar + 横链 2-3 相关 Cluster
- 底部"Related routes"推荐

---

## 6. 步骤 5 — SEO + AdSense

### SEO 技术清单
- [ ] 每页唯一 H1
- [ ] title/description 含 country + exam + purpose
- [ ] BreadcrumbList JSON-LD（全站）
- [ ] Article JSON-LD（指南页，已有部分）
- [ ] FAQPage JSON-LD（有 FAQ 的页）
- [ ] hreflang（EN/ZH 互指）
- [ ] last updated / last checked 显示
- [ ] 图片 alt
- [ ] 移动端优先 + 轻量加载
- [ ] 不堆关键词、不模板化

### AdSense-safe 广告位（AdSlot 组件）
**首页**：Browse by route 后横幅 / Latest guides 前后原生
**文章页**：第一大节后 in-article / 正文中段 / Related guides 前 / 桌面右侧 sticky（不遮目录）/ 移动端间距充足
**禁止**：Quick answer 后立刻放 / 像按钮 / 诱导误点 / 压主内容 / 薄页堆广告 / 核心判断区

---

## 7. 去 AI 味 9 条禁止项

1. 空泛总结
2. 模板化段落
3. "in today's world" / "it is important to note" 反复
4. 无信息长篇介绍
5. 过度承诺
6. 政策信息不加来源
7. 所有文章结构完全一样
8. FAQ 像机器人生成
9. 泛泛形容词无实际信息

**写作原则**：先答用户最关心 / 每节有实际帮助 / 能用表格清单步骤就用 / 不确定明确提醒查官方 / 不假装知道 / 每篇有具体场景+对象+下一步。

---

## 8. 集群厚度规划（继承 v1 §4）

9 集群 38→90+ 篇目标不变。当前 43 篇（含 B1 新增 5 篇）。优先级：
- German A1（12 篇，1 篇深化，待 11 篇）→ 步骤 4 样板
- German B1（9 篇，4 篇深化，待补内链）✅ 集群达标
- TestDaF / French / Spanish / Italian / Portuguese / Dutch / Finnish / UK → 后续滚动

---

## 9. 风险与约束（继承 v1 §7）

- 测试硬约束：每篇指南含 Last updated + Official sources + 官方域名白名单
- 指南数断言 `>= 38`（当前 43）
- 静态站无构建，cron 15 分钟自动上线，每步完成立即 push
- 内容合规：不伪造费用/政策/日期，"以官方为准"提醒保留
- **v2 新增风险**：首页重制动 app.js/index.html/styles.css 三件，需先备份当前首页结构，分块改，每步 npm test 保绿

---

## 10. 验收清单（v2）

每页发布前自检（v1 10 项 + v2 5 项）：
- [ ] 12 节齐全（文章页）
- [ ] Quick answer 卡置顶
- [ ] Official source card（name/used-for/last-checked/link）
- [ ] FAQPage + BreadcrumbList + Article JSON-LD
- [ ] hreflang（中英互指）
- [ ] trust metrics 显示
- [ ] AdSlot 占位（非核心判断区）
- [ ] 移动端 375px 无横向滚动
- [ ] `npm test` 全绿
- [ ] 已 git push

---

*v2 固化于 2026-07-04。实施起点：步骤 2 首页重制 + 全站视觉重制。*

---

## 11. 当前活动子规划 — Germany TestDaF / 德国大学申请语言证明

> **状态：仅规划，尚未执行。** 本子规划继承第 0 节的“路径导航工具站”定位、第 7 节写作原则，以及仓库 `AGENTS.md` 的 Authority-First Content Policy。它只定义 Germany TestDaF 内容线的下一小步，不改写本 v2 其余阶段的历史记录或范围。

### 目标

把现有 TestDaF 的四篇 `Starter overview` 指南补成一条可核验的德国留学语言证明决策路径：读者先确认目标大学/专业的要求，再理解可接受的语言证明与 TestDaF 成绩，最后才进入备考、报名和签证相关的官方核验。

### 本窗口范围与排除项

**范围内：**

- 建立 `docs/PHASE_3_TESTDAF_CONTENT_AUDIT.md`，记录来源、检查日期、可支持的说法、不能支持的结论和读者下一步。
- 审计并补深以下已有指南：
  - `src/content/guides/testdaf-germany-university-admissions.md`
  - `src/content/guides/testdaf-levels-and-scoring.md`
  - `src/content/guides/testdaf-vs-goethe-dsh.md`
  - `src/content/guides/testdaf-preparation-and-practice.md`
- 新增一项紧凑的 TestDaF 集群回归检查，确保四篇指南保留官方来源、最终决定方核验动作、真实相关链接和本窗口更新日期。

**明确不做：**

- 不新建 TestDaF hub、国家页面、商业页面、工具逻辑、中文镜像、广告位或 UI 改版。
- 不把 DAAD、uni-assist、TestDaF 或任何概览页面写成目标大学/专业的最终录取决定。
- 不写固定费用、考位、报名截止日、出分/证书时长、签证通过、录取结果、语言豁免或跨学校的接受保证。
- 不发布、不部署、不提交无关改动；是否新增 hub 只在本窗口审计证明四篇无法形成完整决策路径后，另行规划。

### 权威来源与决定权边界

| 决策问题 | 写作首选来源 | 可以支持的内容 | 不可以支持的内容 |
| --- | --- | --- | --- |
| 目标专业是否接受某语言证明、最低成绩和申请材料 | 目标大学及具体专业的招生/国际学生页面 | 该校该专业在检查日公开列出的要求 | 其他学校、其他专业或个案录取结果 |
| 德国大学申请的一般流程与材料核验 | [uni-assist](https://www.uni-assist.de/en/how-to-apply/assemble-your-documents/language-certificates/) | 申请平台的流程说明和“向目标大学确认”的要求 | 所有大学的统一录取或语言证明结论 |
| 学历准入、学习语言和德国留学总体入口 | [DAAD](https://www.daad.de/en/studying-in-germany/requirements/overview/) | 官方背景、学历准入与语言要求的导航 | 特定项目、申请人的资格或签证结论 |
| TestDaF 考试、成绩、证书和官方练习 | [TestDaF](https://www.testdaf.de/de/) 与 [TestDaF 高校语言证明说明](https://www.testdaf.de/de/hochschulen/der-testdaf-und-hochschulen/nachweis-der-deutschkenntnisse-fuer-das-studium/) | 考试本身、成绩说明和官方练习入口 | 目标专业的最终接受、当地中心的价格/日期/退改/出分承诺 |
| 学生签证与当地递交材料 | [德国外交部](https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/08-studentenvisum-606690)及申请人所在地德国使领馆 | 签证流程的一般官方入口 | 申请人所在地使领馆当前清单、个案签证结果或办理时间 |

当上述来源与目标大学、具体考试中心或具体使领馆页面不一致、不可访问或不够具体时，正文只能写出明确的读者核验动作，不能自行补足结论。

### 执行顺序与每步验收

1. **P3.0：证据审计与缺口表**
   - 创建 `docs/PHASE_3_TESTDAF_CONTENT_AUDIT.md`；为四篇指南分别记录搜索意图、权威来源、允许使用的事实、禁止泛化的事项、待人工核验项和计划中的读者下一步。
   - 验收：每一项高风险信息都能回溯到 URL 与检查日期；每条无法由全国性来源决定的问题都指向目标大学、官方/授权考试中心或具体使领馆。

2. **P3.1：先修正大学录取与成绩解释两篇**
   - 更新 `testdaf-germany-university-admissions.md` 和 `testdaf-levels-and-scoring.md`，把“学校/专业最终决定”放在任何考试比较、成绩解释或报名建议之前。
   - 验收：不再用“多数学校”“通常要求”代替目标专业页面；成绩页区分 TestDaF 成绩说明与大学对该成绩的实际采用。

3. **P3.2：补深考试比较与备考两篇**
   - 更新 `testdaf-vs-goethe-dsh.md` 和 `testdaf-preparation-and-practice.md`，仅比较可由考试官方来源支持的考试特征；选择建议必须以目标大学/专业接受情况为前提。备考只链接官方样题或合法原创学习材料，不引用泄题、押题或“包过”说法。
   - 验收：不把当地可得性、价格、时长或便利性写成跨地区事实；每篇保留可执行的官方核验下一步。

4. **P3.3：集群连通性与发布前质量门**
   - 让四篇指南的相关链接按“院校要求 -> 成绩/可选证明 -> 比较 -> 备考”的决策顺序互相连接，并只链接真实存在的页面；新增 `tests/germany-testdaf-cluster.test.js` 覆盖四篇的范围、日期、官方来源区块、核验动作与相关 slug。
   - 验收：目标测试、`npm test`、`npm run build`、`npm run launch-check` 和 `git diff --check` 全部通过；审计文档与正文没有超出本窗口的费用、时效、资格或录取断言。

### 完成定义

本子规划完成不等于德国留学路径已做完，也不等于网站获得任何官方资格。它完成的标志是：四篇现有 TestDaF 指南形成一个来源可追溯、边界清楚、内部顺序合理的最小决策集群，并保留下一阶段是否需要独立 TestDaF route hub 的审计依据。
