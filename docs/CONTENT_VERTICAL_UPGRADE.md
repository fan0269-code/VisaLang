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
