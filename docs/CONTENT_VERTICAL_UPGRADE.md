# VisaLang 内容垂直度升级规划

> 目标：把 VisaLang 从"广覆盖目录站"升级为"按语种/目的深度垂直的决策站"。
> 本文档固化 2026-07-04 会话中给出的规划，作为后续内容生产的执行依据。
> 状态：5 篇样板已落地（A1 study plan + B1 集群 4 篇），其余按 §6 执行顺序推进。

---

## 1. 现状盘点（2026-07-04）

| 维度 | 现状 | 评估 |
|---|---|---|
| 指南页数 | 38 篇 | 数量达标（测试断言 ≥38） |
| 覆盖范围 | 9 国/语种（德/法/西/葡/意/荷/芬/英/加） | 广度够，深度参差 |
| 深度旗舰 | Goethe A1 系列 12 篇 + Goethe B1 3 篇 | A1/B1 集群已深化 |
| 单页字数 | 升级前 ~360–490 词；升级后 1500–2150 词 | 5 篇已达标，其余待升级 |
| 章节结构 | 升级前 3 节 h2；升级后 9 节 h2 + h3 分层 + 表格/模板 | 模板已对齐 |
| 数据资产 | 50 exams / 200 pageSeeds | 后端数据充足，前端未充分呈现 |
| 测试约束 | 38 篇指南需含 Last updated + Official sources + 官方域名白名单 | 硬约束，改动需保绿 |
| 中文版 | 仅 `zh/index.html` 首页 | 指南页未中文化 |

**核心问题**：38 篇中多数仍是"目录式薄页"（300–500 词）。A1 study plan + B1 集群已做深度样板，其余集群需按同模板推进。

---

## 2. 升级目标（三层）

| 层 | 目标 | 指标 |
|---|---|---|
| L1 单页深度 | 每页从 ~400 词 → 1500–2000 词，含模板/检查清单/案例/表格 | 单页字数×3–5 |
| L2 集群厚度 | 每个语种从 2–4 篇 → 6–12 篇支柱集群 | 38 → 90+ 篇 |
| L3 信任工程 | 实测样例、官方链接核实日期、更新日志、对照表 | 100% 页面含核实日期 + changelog |

---

## 3. 单页深度升级模板（L1，已验证样板）

每个指南页强制升级到以下 9 节结构（参考已落地的 `goethe-a1-30-day-study-plan.html` 与 `goethe-b1-study-plan.html`）：

1. **TL;DR verdict** — 一句话定性 + 适用人群 + 关键前置条件（2–3 句）
2. **Who this is for / Who should skip** — 各 3 个具体场景（任务级，非人群标签）
3. **官方规格速查表** — 模块/级别/CEFR 对标/费用范围/时长/通过线/出成绩周期（带官方链接）
4. **完整工作流/学习计划** — 分阶段，每阶段含目标 + 任务 + 检查点 + 资源（用表格）
5. **可复制模板** — 提示词模板 / 口语话题清单 / 文档检查清单 / 写作框架（`<pre>` 代码块）
6. **费用与流程实操** — 报名步骤、所需文档、考试中心选择、补考政策（含"以官方为准"提醒）
7. **常见失败与排错** — 5 个高频失败点 + 触发条件 + 规避方法（表格）
8. **对比与替代** — 同类考试对照表（并排表格，非并列段落）
9. **官方来源 + 更新日志** — ≥3 条官方链接带 `verified YYYY-MM-DD` + Last updated 真实日期 + changelog

**已落地样板字数对照**：

| 指南页 | 升级前 | 升级后 | 倍数 |
|---|---|---|---|
| goethe-a1-30-day-study-plan | 361 | 1964 | 5.4× |
| goethe-b1-study-plan | 444 | 2154 | 4.9× |
| goethe-b1-fees-and-booking | 450 | 1794 | 4.0× |
| goethe-b1-germany-settlement-work | 493 | 1569 | 3.2× |
| goethe-b1-vs-telc-b1 | 461 | 1514 | 3.3× |

---

## 4. 集群厚度规划（L2）

把现有 38 篇按"语种 × 目的"重组成 9 个支柱集群，每个集群补到 6–12 篇：

| 集群 | 现有 | 补齐缺口（示例） | 目标篇数 | 状态 |
|---|---|---|---|---|
| **German A1（家庭团聚）** | 12 | 已饱和，做深度刷新（A1 study plan 已做） | 12 | 🟡 1/12 深化 |
| **German B1（定居/工作）** | 4 | +B1 听力专项 / 口语题型 / 写作评分标准 / 模考资源 / 真题难度分析 | 8 | 🟢 4/8 深化，待补 5 篇 |
| **TestDaF（留学）** | 4 | +TestDaF 口语录音流程 / 评分等级详解 / 大学认可清单 / 模考时间表 | 8 | ⚪ 待刷新 |
| **French（加拿大/法国）** | 3 | +TEF Canada 口语题型 / TCF Canada 写作评分 / DELF B1 vs B2 / 法语 A2 备考 | 8 | ⚪ 待刷新 |
| **Spanish（DELE/CCSE）** | 2 | +DELE A2 口语真题 / CCSE 公民考试大纲 / SIELE vs DELE / 西语学习路径 | 6 | ⚪ 待刷新 |
| **Italian（CILS/CELI/PLIDA）** | 3 | +CILS B1 公民考试细节 / PLIDA vs CELI / 意大利语 A2 备考 | 6 | ⚪ 待刷新 |
| **Portuguese（CIPLE/A2）** | 2 | +CIPLE 考试中心 / 葡语 A2 学习计划 / 黄金签证语言要求 | 5 | ⚪ 待刷新 |
| **Dutch（Inburgering）** | 1 | +A2 听力题型 / Inburgering 考试中心 / 融入考试大纲 | 4 | ⚪ 待刷新 |
| **Finnish（YKI）** | 2 | +YKI 中级口语 / 芬兰语学习资源 | 3 | ⚪ 待刷新 |
| **UK（IELTS UKVI/LanguageCert）** | 2 | +IELTS UKVI A1 vs B1 / LanguageCert SELT 报名流程 | 4 | ⚪ 待刷新 |

**优先级**：German B1 集群先做（已深 4 篇，待补 5 篇缺口）→ A1 集群刷新 → TestDaF → 其他语种。

---

## 5. 信任工程（L3，贯穿全程）

- **核实日期**：所有官方链接旁加 `· verified YYYY-MM-DD`，每月批量复核
- **真实更新日志**：每页底部加 changelog（最近 2–3 次改动）
- **对照表优先**：所有"对比"内容用并排表格，不用并列段落
- **成本透明**：费用一律带"本币 + 查证日期 + 官方链接"，禁止裸数字
- **JSON-LD 升级**：指南页在 Article 之外加 HowTo（学习计划类）或 FAQPage（费用/对比类）
- **中文版扩展**：旗舰页（Goethe A1/B1、TestDaF）先做 zh 译本

---

## 6. 执行顺序（滚动）

**已完成**
- ✅ Week 1 样板：A1 study plan + B1 study plan（9 节模板对齐）
- ✅ B1 集群刷新：fees-and-booking / settlement-work / vs-telc-b1 三篇深化的 9 节模板落地
- ✅ 已 push 到 GitHub（`a27c3df`），cron 15 分钟自动上线

**进行中 / 下一步**
1. **新建 German B1 缺口 5 篇**：听力专项 / 口语题型 / 写作评分 / 模考资源 / 真题难度 → B1 集群达 8 篇
2. **刷新 A1 集群其余 11 篇**到 9 节模板（A1 study plan 已是样板）
3. **TestDaF 集群刷新**（4 篇 + 补 4 篇）
4. **第二集群 + 信任工程**：补 French 集群 + 全站批量加核实日期/changelog + 旗舰页中文化

之后每两周推进一个新语种集群，直到 9 个集群全部达标。

---

## 7. 风险与约束

- **测试硬约束**（`tests/site.test.js`）：每篇指南必须有 `Last updated: YYYY-MM-DD` + `Official sources` 节 + 命中官方域名白名单（goethe.de / testdaf.de / telc.net / cils.unistrasi.it / cvcl.it / dante.global / inburgeren.nl / cve.nl / caple.letras.ulisboa.pt / cervantes.es / siele.org / ielts.org / languagecert.org / gov.uk / oph.fi / migri.fi / lefrancaisdesaffaires.fr / france-education-international）。新增指南须命中白名单域名，否则测试红。
- **指南数断言**：`>= 38`，新增不改数量即可；若减需同步改测试。
- **静态站无构建**：改动即发布，cron 15 分钟自动拉取上线——**每个集群改完立即 push**，避免本地堆积。
- **内容合规**：不伪造费用/政策/日期，"以官方为准"提醒必须保留；指南页底部 `compliance-line` 与 `last-updated` 类不可删。

---

## 8. 验收清单（每页发布前自检）

- [ ] 9 节齐全（详情页/对比页/指南页通用）
- [ ] 至少 1 张表格或 1 段可复制模板
- [ ] 官方链接带 `verified YYYY-MM-DD`
- [ ] "Last updated" 为真实日期
- [ ] changelog 至少 1 条
- [ ] 决策闭环：谁该用 / 谁跳过 / 替代方案
- [ ] 无一句话章节（每段 3–5 句）
- [ ] 命中官方域名白名单
- [ ] `npm test` 全绿
- [ ] 已 `git push`（cron 15 分钟上线）

---

*本规划为活文档，随推进迭代。最后更新：2026-07-04。*
