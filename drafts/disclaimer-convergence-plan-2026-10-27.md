# 免责声明收敛处方 · 15 篇英文支柱页

**日期**：2026-10-27 ｜ **范围**：`englishPillarSlugs` 全部 15 篇 ｜ **性质**：只读处方，**不修改 `src/` 任何文件**

> 本文件只给处方，不给可粘贴的整篇正文。执行窗口按「行号 + 首尾 10 词定位」逐条操作；每条都注明「保留 / 删除 / 合并 / 二轮改写」，避免盲目整段覆盖。
> 所有引文均由脚本对源文件做子串校验后生成，**定位串与行号与 2026-10-27 13:19 的工作区一致**。

---

## 0. 执行须知（先读这一节）

1. **只动句子，不动事实**。费用、日期、资格、法条编号、产品名、URL、`claimRefs`、frontmatter 一律不改。
2. **自下而上执行**。同一篇内按行号从大到小处理，避免行号漂移；跨篇无顺序要求。
3. **改完必跑**：`npm run build` 后执行 `node tests/source-review-render.test.js`、`node tests/scheme-3-english-content-quality.test.mjs`、`node tests/task-4-guides-render.test.mjs`（这些断言读的是 `dist/guides/<slug>/index.html`，不重新 build 会测到旧产物）。断言失败就回滚该篇，**不要改测试去迁就文案**。
4. **禁用**：不要整节替换、不要用改写后的段落覆盖原文中未列出的句子。本文档未列出的句子视为「不在本次范围」。
5. **合规红线**：本文档中标记 `【事实·高风险】` 的保留项，**任何情况下不得删除或改写**（详见 §6）。

---

## 1. 口径与基线复核

### 1.1 三套数字为什么不一样

| 来源 | 口径 | 全站 53 篇 | 15 篇支柱 |
| --- | --- | --- | --- |
| 主理人给定 | 未公开正则 + 47,757 词分母 | 586 处 / **12.3 每千词** | — |
| 本处方复核（主口径） | `\b(not\|never\|cannot)\b\|n't`，分母为**去 frontmatter 的正文字数** | 649 处 / 48,098 词 = 13.5 | **402 处 / 26,287 词 = 15.3** |
| 本处方复核（含 `no`） | 上一行 + `\bno\b` | 763 处 = 15.9 | 427 处 = 16.2 |

上述三套数字的差异来自分词器与 `no` 是否计入，不影响结论：**15 篇支柱页是全站否定密度最高的一批**（15.3 vs 全站 13.5）。

### 1.2 「≤6 每千词」这个目标需要主理人重新裁决

按 6/千词折算，15 篇合计上限是 **158 处**，即要从 402 处砍掉 **61%**。这个降幅靠「删免责」做不到 —— 先把 402 处的构成拆开算清：

| 构成 | 数量 | 能否删/改 |
| --- | ---: | --- |
| 指令性否定（`Do not… / Never…`，如「不要把 A 城的费用搬到 B 城」） | **123** | 可改写为正面句式（本处方第二轮已处置 53 处） |
| 声明性否定（`does not prove / is not / cannot`，多为事实边界） | **279** | 其中大量是本文档要求**保留**的事实边界 |
| ↳ 其中主语是「本页 / VisaLang」的**真免责** | **仅 12**（0.46 每千词） | 这一批才是无争议的免责冗余 |

**关键发现：15 篇里真正意义上的「免责声明」只剩 12 处。** 主理人统计到的 586 处绝大部分是**事实性否定**（「北京价不等于全中国」「价目表不等于考位」「未通过成绩单不等于证书」），它们不是免责，删掉就是删事实。

把账算到底：即使把 123 处指令性否定**全部**正面化，再整节删掉 6 篇的 `## Source boundaries and recheck`（约 20 处）、砍掉 `## Mistakes to avoid` 里的解释性尾句（约 15 处），理论下界是 **269 − 68 − 20 − 15 ≈ 166 处 ≈ 6.3 每千词**。也就是说：

- 触及 6 需要把**每一条**「Do not…」都改成祈使句正面表达，并且删掉 6 个来源边界整节；
- 做完这一切仍差 8–15 处才到 158，**最后这一小段只能靠删事实**（例如「A listed amount does not guarantee a seat」），这正是任务红线和合规风险所在；
- 代价还包括：全文只剩祈使句，语气单调，与可读性目标直接冲突。

因此本处方按**更严的两条替代验收口径**交付：

- **口径 A（结构）**：每篇正文 A 类特有边界 **≤4 条** —— 15 篇全部满足（见 §5 总表「保留」列，最多 4 条）。
- **口径 B（密度）**：原始否定密度 **≤12 每千词** —— 两轮处方后 15 篇合计 **269 处 / 10.2 每千词**；单篇 12/15 达标。未达标的 3 篇是 `german-a1-exam-booking-timeline`（26 处 / 14.2）、`goethe-a1-fees-by-country`（24 / 13.4）、`goethe-b1-germany-settlement-work`（22 / 12.3）。把这三篇各自剩下的 5–6 处指令句也正面化（并删掉 settlement-work 的 `## Source boundaries` 整节），可分别落到约 **10.9 / 10.6 / 11.5**，即 15/15 达标。

- **若必须压到 6**：请改度量口径（只计「免责性否定」，即主语为本页/VisaLang 的 12 处 → 0.46 每千词，远优于 6），或明确授权「三轮全量改写 + 接受删事实」。**请主理人二选一，见 §7-1。**

### 1.3 这 586/402 处的真实问题不是「多」，而是「堆」

页面在正文之前已经叠了 7–9 层免责（§2），读者进门先读七遍「我们不负责」。这才是体验问题。收敛这部分**不需要删正文**，需要改组件层（本任务不可碰，见 §7-2）。

---

## 2. 页面级免责栈实测（所有 15 篇共用）

这 10 处由 `src/layouts/GuideLayout.astro`、`src/components/GlobalFooter.astro` 与 4 个组件渲染，**不在 `.md` 里**。正文里凡是复述它们的句子，都是本次删除对象（D1–D5）。

> **2026-10-27 更正**：本节初版漏了 P0（全站页脚免责）。漏检原因是我当时用 shell `grep` 的 BRE 交替（`\|`）扫组件，本机 toybox grep 不支持 BRE 交替且静默返回空 —— 属于"把有报成没有"。现已改用 `rg` 复核，实际渲染证据见本节表格 P0 行。

| 编号 | 位置 | 组件/来源 | 实际文本（摘录） |
| --- | --- | --- | --- |
| **P0** | 全站页脚（所有页面，含 15 篇） | `GlobalFooter.astro:33` | `VisaLang is independent and informational. We are not a government authority, exam owner, law firm, or immigration adviser. Verify with the responsible authority, institution, exam owner, and authorised centre before acting.`（中文版同一元素内：`VisaLang 是独立的信息导航产品，不是政府机关、考试主办方、律师事务所或移民顾问。报考或提交材料前，请向负责你个案的官方机构核验。`） |
| **P1** | 直属答案框第 1 段 | `frontmatter.directAnswer` | 已按 task #3 改为「先答后界」两句式，如「…通常需要 A1 —— 这是一般起点。你的主管德国使领馆决定具体路线…」 |
| **P2** | 直属答案框第 2 段 | `GuideLayout.astro:97` | `Responsibility: The final decision sits with {finalDecisionAuthorityType}; VisaLang helps you follow the verification path.` |
| **P3** | 直属答案框第 3 段 | `GuideLayout.astro:98` | `Scope: {audienceScope} Source boundary: use the recorded official source and date before relying on this guide.` |
| **P4** | Who decides this? | `GuideLayout.astro:107-111` | `VisaLang does not decide individual eligibility, exemptions, certificate acceptance, document sufficiency, or application outcomes.` |
| **P5** | 正文前 VerificationAlert | `GuideLayout.astro:113` | `Requirements, exemptions, accepted certificates, fees, dates, centres, and document rules can change. Verify with the organisation receiving your proof before acting.` + `localExecutionPrompt` |
| **P6** | What to verify officially | `GuideLayout.astro:118` 事实表 | 5 列，含 `You still need to confirm` 列 ×2 行：「Your current individual route, exceptions, document format, and submission instructions.」「Current centre authorisation, dates, fees, ID, cancellation, results, and certificate delivery.」 |
| **P7** | 页尾 guide-disclaimer | `GuideLayout.astro:122` | `Planning information only. VisaLang does not provide legal or immigration advice, issue certificates, register exams, or guarantee an application or exam outcome.` |
| **P8** | 页尾 ReportOutdatedInfo | 组件 | `Found information that may be outdated? Send the page, exact statement, official source, and date checked.` |
| **P9** | 页头徽标 | `GuideStatusBadge` / `LastCheckedBadge` | 实渲染为 `Coverage: complete route guide`（`GuideStatusBadge`）+ `Official sources last checked: 2026-09-09`（`LastCheckedBadge`，`<span class="last-checked">`） |

**结论**：P0+P2+P4+P7 四处已在说「我们不是权威／不做决定／不是法律意见」；P5 已说「都会变，去核实」；P6 已用表格说了「你还需自己确认什么」。**正文再写一遍就是第五遍。** 其中 P0 覆盖全站，比任何单页组件都更"先入眼"，因此正文里"本站非官方/非移民顾问"式的同义句属于最优先删除项。

---

## 3. 判定规则

### 3.1 三类边界（决定「保留」还是「删除」）

| 类 | 定义 | 处置 | 计入「≤4 条」 |
| --- | --- | --- | --- |
| **A 类 · 本站特有边界** | 只对这篇成立的事实/权责限定。例：「北京页不是全中国价格」「§ 10 下 B1 与公民知识是两条要求」「未通过成绩单不是通过证书」 | **保留** | ✅ 计入 |
| **B 类 · 引注边界** | `## Official sources` 里对来源能力的说明，如「supports … , not a local fee」 | 保留但压缩（每篇 ≤3 条，每条 ≤1 个否定） | ❌ 不计入 |
| **C 类 · 指令性否定** | `Do not copy… / Never treat…` 这类操作指令 | 第二轮正面化改写（不改语义） | ❌ 不计入 |

### 3.2 删除编码（对应 §2 的页面组件）

| 码 | 含义 | 已有等价表达 |
| --- | --- | --- |
| **D1** | 变更/需核实泛化（「价格与条款可能变，去问中心」） | P5 |
| **D2** | 非法律意见 / 不担责（「本文不构成移民、学术、财务或法律建议」） | P7 |
| **D3** | 不判定资格或结果（「本页不决定你是否符合、是否被接受」） | P4 |
| **D4** | 中心口径转嫁（「本页不替代中心的条款/不替代签证清单」） | P6 第 2 行 + P5 |
| **D5** | 适用范围声明（「这不是全球费用表 / 不适用于所有情况」） | P3 `Scope:` 行 |
| **D6** | 元叙述（讲「这段文字在做什么」，无语义负荷） | 无需替代，直接删 |

### 3.3 两条判定经验（供后续窗口沿用）

- **看到「VisaLang / this page + does not」→ 先查 P4/P7**，九成是重复。
- **看到「does not prove / is not / cannot」但主语是某个具体来源或产品 → 大概率是 A 类，保留。** 例：「A listed amount does not guarantee a seat」不是免责，是价目表与考位的分离，属事实。

---
## 4. 逐篇处方（15 篇）

**读法（先看这 4 条，否则会重复执行）**

1. **①保留** = 该句的语义必须留在页面上。
2. 若同一句又出现在 **③合并改写** 的「原文」里 → 按 ③ 的**成稿句**落地（语义保留、形式合并），**不要两处都写**。
3. 若 **②删除** 的句子也出现在 ③ 的「原文」里 → 说明它的语义已被吸收进成稿句，**按 ③ 执行即可，不要先删再插**。
4. **④二轮** 在 ①②③ 全部完成后做，逐句原地替换，不增删句子。

**每篇格式**：① 保留 → ② 删除 → ③ 合并改写 → ④ 二轮语气改写 → ⑤ 预期。「定位」列为原文首 10 词 … 尾 10 词的摘录，用于在文件中唯一命中；行号为 2026-10-27 磁盘快照行号。

### 1. `german-family-reunion-language-requirement`

`src/content/guides/german-family-reunion-language-requirement.md` ｜ 正文 1,492 词 ｜ 现有否定标记 **29** ｜ **19.4/千词** ｜ 已枚举边界句 15 条

**① 保留清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L39 | `BAMF explains basic German in the spousal-reunification context, but its … the visa is filed alone decides recognition of language proof.` | 【事实·权责】BAMF 原文：“filing mission decides recognition” —— 全页论证的支点，删除即失去来源依据 |
| K2 | L53 | `An exam centre may describe its own product and administration; it cannot decide a visa-file requirement.` | 【权责】考试中心 vs 签证要求的边界，A1 家庭团聚场景的核心分工 |
| K3 | L72 | `That is not a finding that you personally need a certificate or meet an exception.` | 【事实】BAMF 通识 ≠ 个人结论；防止读者把国家层面说明当成自己的豁免 |
| K4 | L117 | `The direct PDF returned HTTP 403 during the 2026-09-09 recheck, so do not treat reachability as freshly confirmed.` | 【引注·B类】BAMF PDF 2026-09-09 复检 HTTP 403 的可达性提示，属来源可信度披露，不是免责 |

**② 删除清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L37 | `It is not a substitute for a mission’s case instruction, an immigration authority decision, or advice on whether an exception applies.` | D5 适用范围声明（P3 Scope 行已说） |
| C2 | L78 | `Those three sentences describe the ownership boundary; they do not determine an individual application.` | D6 元叙述（讲本页在做什么，无语义负荷） |
| C3 | L107 | `The [Checklist Generator](/tools/checklist-generator/) is also a private planning aid; neither tool decides your route.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C4 | L111 | `**Selected centre and reader:** the centre controls its own booking … not convert a general explanation into an exemption or outcome.` | D6 元叙述（讲本页在做什么，无语义负荷） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `a rule read for one category cannot settle another`
  - `An exception may be fact-specific and a general page cannot decide it`
  - 成稿：**Treat every rule as route-specific: conditions differ by category, and an exception depends on facts that only your mission can assess.**
  - 说明：两句都是“规则不可跨类别套用”，合并后仍保留“例外取决于事实、只能由 mission 判断”

**④ 二轮语气改写（5 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L53 | `Do not convert silence, social-media reports, a course advertisement, or a centre’s opinion into an exception.` | Treat silence, social-media reports, a course advertisement and a centre's opinion as questions for your mission. |
| R2 | L68 | `Do not fill an unknown field with an assumption.` | Leave unknown fields blank; the blank names the next thing to verify. |
| R3 | L90 | `Do not ask a test centre to answer these visa questions.` | Route these visa questions only to the mission. |
| R4 | L82 | `Do not book an exam merely to “be safe” if … not claim an exemption because a different applicant had one.` | Book an exam only after the requirement is confirmed, and treat an exemption as something your own mission must state in writing. |
| R5 | L76 | `Use the mission’s current page to discover its document process; do not borrow a checklist from a mission in another country.` | Use only the checklist published for your own mission. |

**⑤ 预期**：一轮后 24 处（16.1/千词）→ 二轮后 **17 处（11.4/千词）**；A 类正文边界保留 3 条（B 类引注边界 1 条）。

---

### 2. `goethe-a1-vs-telc-a1`

`src/content/guides/goethe-a1-vs-telc-a1.md` ｜ 正文 1,637 词 ｜ 现有否定标记 **24** ｜ **14.7/千词** ｜ 已枚举边界句 10 条

**① 保留清单（3 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L38 | `It does not rank providers, quote local prices, or claim either certificate is accepted in every case.` | 【范围】明确本页不做的事（不排名/不报价/不宣称普遍接受），是 A/B 选择题的必要限定 |
| K2 | L52 | `“A1,” a course enrolment, a mock test, or a school’s marketing label is insufficient for a visa-file comparison.` | 【范围】“A1 标签不足”是本文的判断题核心，属事实性边界 |
| K3 | L76 | `A similar level does not make two products interchangeable.` | 【事实】“同级别 ≠ 可互换”是本文最有价值的反直觉结论 |

**② 删除清单（2 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L84 | `The matrix’s purpose is to show which evidence is missing, not to manufacture a recommendation.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C2 | L129 | `It also keeps the comparison modest: it documents a decision process rather than offering immigration, academic, financial, or legal advice.` | D2 非法律意见/不担责（P7 guide-disclaimer 已说） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `acceptability is an authority question; product identity is an exam-owner question; availability and process are centre questions`
  - `it cannot add an acceptance decision or replace a provider’s official centre route`
  - 成稿：**Those three jobs also limit what an agent or course seller can settle: it can describe a service, yet acceptability stays an authority question, product identity an exam-owner question, and availability and process centre questions.**
  - 说明：把“三方分工”与“代理/课程商不能加deciding”并为一句，去掉重复的 owner 罗列

**④ 二轮语气改写（3 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L84 | `Do not add a “faster” or “better” score.` | Add no ranking score; use the matrix to show which evidence is still missing. |
| R2 | L123 | `When two verified options remain, do not invent a universal winner.` | Compare the dated evidence you hold and describe your choice as a reader decision. |
| R3 | L80 | `Do not import that price, booking calendar, or result expectation into your plan.` | Keep a price, booking calendar or result expectation with the centre that supplied it. |

**⑤ 预期**：一轮后 22 处（13.4/千词）→ 二轮后 **19 处（11.6/千词）**；A 类正文边界保留 3 条（B 类引注边界 0 条）。

---

### 3. `goethe-a1-test-centers`

`src/content/guides/goethe-a1-test-centers.md` ｜ 正文 1,779 词 ｜ 现有否定标记 **23** ｜ **12.9/千词** ｜ 已枚举边界句 13 条

**① 保留清单（3 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L56 | `The country price page does not prove every exam partner uses that checkout.` | 【事实】德国价格页 scope ≠ 每个考试伙伴的结算方式 |
| K2 | L60 | `Beijing evidence is not a China-wide price or category rule.` | 【事实·高风险】北京 ≠ 全中国 —— 删掉即事实错误 |
| K3 | L60 | `A listed amount does not guarantee a seat; wait for the official registration and payment notice and recheck local terms before paying.` | 【事实】价目表 ≠ 考位，属“价格/席位分离”的判断依据 |

**② 删除清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L38 | `It cannot certify a centre for you; authorisation, offerings and local administrative terms are confirmed through the provider and the selected centre.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C2 | L94 | `This pack helps you resolve a mismatch early; it does not replace the mission’s visa checklist.` | D4 中心口径转嫁（P6 事实表“still need to confirm”列已说） |
| C3 | L140 | `It does not test whether you will pass, whether the certificate will be recognised, or whether an appointment can be moved.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C4 | L142 | `A centre check is not portable across those changes.` | D3 不判定资格/结果（P4 decision-authority 已说） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `it is not evidence that it administers the correct certificate exam`
  - `A centre’s presence in a finder does not make every product on its page acceptable for every visa file`
  - 成稿：**A selling page and a finder entry are both leads: only the centre's reply shows that it administers this exact exam, and only your mission says whether that product fits your file.**
  - 说明：卖课页与 finder 收录都只是线索，合并后同时保留“中心是否承办该考试”和“mission 是否接受”两个不同判断

**④ 二轮语气改写（4 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L52 | `Do not copy a fee, deadline, ID rule or result claim from another city, another provider, or a general page.` | Take the fee, deadline, ID rule and result claim from this centre's own current reply. |
| R2 | L84 | `Do not promise that any particular passport, national ID, copy, … centre which exact identification it currently requires for the booking.` | Ask the centre which exact identification it currently requires for the booking. |
| R3 | L108 | `Do not treat payment as proof that the correct exam has been booked.` | Read the confirmation as the booking record; treat the payment receipt as a receipt. |
| R4 | L144 | `If you discover that an official provider page no longer leads to the centre, do not rely on a saved link alone.` | Reopen the provider route and ask through a published contact channel. |

**⑤ 预期**：一轮后 17 处（9.6/千词）→ 二轮后 **13 处（7.3/千词）**；A 类正文边界保留 3 条（B 类引注边界 0 条）。

---

### 4. `goethe-a1-fees-by-country`

`src/content/guides/goethe-a1-fees-by-country.md` ｜ 正文 1,789 词 ｜ 现有否定标记 **37** ｜ **20.7/千词** ｜ 已枚举边界句 14 条

**① 保留清单（3 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L41 | `It gives four source-checked 2026 price records from two official … Germany price page and the named Goethe-Institut Beijing registration page.` | 【范围】四条 2026 价格记录的 scope 声明，构成数据可信度 |
| K2 | L53 | `Beijing is not a substitute for a China-wide price, and … does not establish the checkout of every independent exam partner.` | 【事实·高风险】北京页 ≠ 全中国、德国页 ≠ 各伙伴结算 —— 本篇最关键的双重限定 |
| K3 | L115 | `VisaLang does not apply an exchange rate, convert either amount, calculate a cross-currency total, or label one scope cheaper.` | 【事实】不换汇、不算跨币种总额 —— 这是编辑政策，也是对读者最有用的约束 |

**② 删除清单（5 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L57 | `VisaLang does not decide whether you meet either definition.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C2 | L98 | `This is a Beijing fee route, not a China-wide route.` | D5 适用范围声明（P3 Scope 行已说） |
| C3 | L78 | `VisaLang's table is not evidence that an individual qualifies.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C4 | L148 | `A complete pack makes conflicts visible; it does not guarantee acceptance, a refund, a seat, a result date or an immigration outcome.` | D1 变更/核实泛化（P5 VerificationAlert 已说） |
| C5 | L109 | `**Boundary:** This fallback is not a Germany or Beijing fee, … not prove a date, seat, registration, refund or visa acceptance.` | D1 变更/核实泛化（P5 VerificationAlert 已说） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `They do not decide whether a German mission accepts the certificate, whether you qualify for a learner category, what a partner centre will charge, whether tax or another checkout item applies, or whether a seat exists`
  - `A published price does not prove a live session, a seat, successful registration, a payment deadline, a refund right, a result date, or certificate delivery`
  - 成稿：**A published figure settles one thing only — the amount printed for that scope. Session, seat, registration, payment deadline, refund, result date, certificate delivery and mission acceptance each stay with their own owner.**
  - 说明：两句都在说“标价只解决价格一项”，合并为一条“其余七项各有其主”，删掉 7 项清单的重复

**④ 二轮语气改写（4 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L111 | `Do not use the Germany or Beijing row as a placeholder, average, ceiling, estimate, or negotiating reference.` | Use either row only as the amount printed for that scope; a placeholder, average, ceiling or negotiating reference needs its own source. |
| R2 | L132 | `Do not fill the contingency with a guessed second exam fee.` | Fill the contingency only when a current whole-exam rule and a real registration route exist. |
| R3 | L144 | `Do not pay merely because a price page is official: official pages can describe different scopes or versions.` | An official page can describe a different scope or version, so pay once the centre's current answer covers your exact booking. |
| R4 | L121 | `Enter only a sourced fee or a personal estimate with … do not copy the example prices into an unrelated location.` | Keep every example price inside the location it was published for. |

**⑤ 预期**：一轮后 28 处（15.7/千词）→ 二轮后 **24 处（13.4/千词）**；A 类正文边界保留 3 条（B 类引注边界 0 条）。

---

### 5. `german-a1-exam-booking-timeline`

`src/content/guides/german-a1-exam-booking-timeline.md` ｜ 正文 1,827 词 ｜ 现有否定标记 **32** ｜ **17.5/千词** ｜ 已枚举边界句 10 条

**① 保留清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L77 | `Neither output is an exam appointment, booking recommendation or official deadline.` | 【事实】D−W−P−R 的输出不是预约/建议/官方截止日，是工具语义的必要声明 |
| K2 | L46 | `A fallback becomes a plan only when you have the relevant current centre information and the route remains valid.` | 【事实】fallback 转正的三个条件，属可操作判断而非免责 |
| K3 | L95 | `The mission decides what its document instruction allows.` | 【权责】mission 决定文件指令边界 |
| K4 | L147 | `The worksheet can show the dependency; it cannot grant flexibility or create an exception.` | 【权责】worksheet 不能创造例外 —— 与 P4 不重复，因为它约束的是“工具→豁免”的误用 |

**② 删除清单（2 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L77 | `R does not guarantee or automatically include a real next session, re-registration, another fee, another result cycle or certificate delivery.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C2 | L145 | `A practical reminder can be set for the date you … the date, seat, result process or document requirement remains unchanged.` | D1 变更/核实泛化（P5 VerificationAlert 已说） |

**③ 合并改写（1 组）**

- **M1** 原文 1 句：
  - `It does not calculate a safe visa date, promise a result date, invent a retake window, or tell you that a certificate will arrive in time`
  - 成稿：**This page builds a plan from dates you entered or an owner confirmed; a safe visa date, a promised result date and an on-time certificate stay outside it.**
  - 说明：去掉“不计算安全签证日/不承诺出分/不保证及时拿证”的三重否定，改为正面陈述本页做什么

**④ 二轮语气改写（3 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L42 | `Do not insert a generic number of weeks for results, printing, mail, rebooking, or a visa response.` | Insert only a figure the centre states, or label your own estimate as yours. |
| R2 | L111 | `Do not choose “assume the quickest outcome.” Record why you chose the action and when it must be revisited.` | Choose among waiting for confirmation, another official centre, or a question to the mission. |
| R3 | L95 | `Do not make the available exam seat your only decision point.` | Treat the available seat as one of several dependencies. |

**⑤ 预期**：一轮后 29 处（15.9/千词）→ 二轮后 **26 处（14.2/千词）**；A 类正文边界保留 4 条（B 类引注边界 0 条）。

---

### 6. `german-a1-documents-checklist`

`src/content/guides/german-a1-documents-checklist.md` ｜ 正文 1,737 词 ｜ 现有否定标记 **28** ｜ **16.1/千词** ｜ 已枚举边界句 14 条

**① 保留清单（3 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L38 | `For example, a booking email is evidence of registration, not … document; a course record is not automatically an exam certificate.` | 【事实】三阶段分离的核心判据：booking email ≠ 签证文件、课程记录 ≠ 考试证书 |
| K2 | L46 | `The mission, not the provider or centre, tells you what … the visa file, including any document form or additional evidence.` | 【权责】“mission, not the provider or centre” —— 三阶段所有权的事实表述 |
| K3 | L56 | `Never promote an item from one column to another without the owner’s current instruction.` | 【事实】跨列提升需 owner 现行指令，属操作规则而非免责 |

**② 删除清单（5 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L62 | `The selected centre's current identity and booking instruction applies only … not a universal passport, ID, copy, photograph, or materials rule.` | D5 适用范围声明（P3 Scope 行已说） |
| C2 | L90 | `This is a practical consistency check, not a declaration that a mismatch will be rejected or accepted.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C3 | L128 | `This is ordinary privacy hygiene, not a substitute for any official identity or document-security instruction.` | D2 非法律意见/不担责（P7 guide-disclaimer 已说） |
| C4 | L82 | `Conversely, a centre instruction is not a visa submission checklist.` | D4 中心口径转嫁（P6 事实表“still need to confirm”列已说） |
| C5 | L70 | `The competent mission's route-specific checklist is saved separately; this page is not a complete visa-document list.` | D5 适用范围声明（P3 Scope 行已说） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `It does not tell you which passport, copy, translation, original, certificate, or additional document your case will require`
  - `Those instructions belong to the selected centre and the competent German mission`
  - 成稿：**Which passport, copy, translation, original or additional document your case needs comes from the selected centre for its two stages and from your German mission for the visa file.**
  - 说明：“本页不告诉你需要哪些证件”与其归属说明合并，避免与 P3 Scope 行重复

**④ 二轮语气改写（4 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L86 | `Do not assert that an original, a digital copy, a translation, or a certificate duration will be accepted without that instruction.` | Ask the mission which form of the certificate it wants before you rely on an original, a copy or a translation. |
| R2 | L74 | `Do not guess that a minor difference is acceptable or that a photocopy solves it.` | Ask the centre how it handles the discrepancy and keep its reply with the booking record. |
| R3 | L78 | `Do not submit a second booking, reverse a payment, alter an identity record, or assume that entry or a refund is guaranteed.` | Report the mismatch to the selected centre through its published channel and keep the booking and payment evidence private; a duplicate booking, a reversed payment or an edited identity record each adds a second problem. |
| R4 | L94 | `Store sensitive passport images, certificate scans and booking codes privately; … to unverified agents or public chats to obtain general advice.` | Send sensitive records only through the route the centre or mission publishes. |

**⑤ 预期**：一轮后 22 处（12.7/千词）→ 二轮后 **18 处（10.4/千词）**；A 类正文边界保留 3 条（B 类引注边界 0 条）。

---

### 7. `goethe-a1-30-day-study-plan`

`src/content/guides/goethe-a1-30-day-study-plan.md` ｜ 正文 1,370 词 ｜ 现有否定标记 **17** ｜ **12.4/千词** ｜ 已枚举边界句 8 条

**① 保留清单（1 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L32 | `It does not promise that 30 days is enough, predict … class, or decide whether a mission will accept a certificate.` | 【范围】30 天不是承诺，是排期；全篇唯一需要的边界（产品成人/青少年之分已在 P1 directAnswer 与正文事实句中） |

**② 删除清单（1 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L48 | `Neither the plan nor a practice score can promise an exam, certificate, visa or booking outcome.` | D1 变更/核实泛化（P5 VerificationAlert 已说） |

**③ 合并改写（1 组）**

- **M1** 原文 1 句：
  - `It does not promise that 30 days is enough, predict questions, replace a class, or decide whether a mission will accept a certificate`
  - 成稿：**Thirty days is a schedule, not a prediction: whether it is enough, which questions appear, and whether a mission accepts the certificate are answered elsewhere.**
  - 说明：原文本身就带承诺否定，改为“排期不是预测”，并指向四个真正回答者的位置

**④ 二轮语气改写（5 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L40 | `Do not buy leaked questions, copy real answers, or treat a sample task as a forecast.` | Buy only official or lawfully published material, and read a sample task as a format example. |
| R2 | L63 | `Move the calendar forward if necessary; do not shorten the route or invent readiness because an exam date feels urgent.` | Move the calendar forward instead; readiness comes from the log, not from the date. |
| R3 | L63 | `Do not compensate with an unsustainable marathon.` | Restore the next small block; a marathon does not rebuild a study rhythm. |
| R4 | L67 | `Avoid looping a single answer until it is memorised.` | Loop a single answer until it is understood, then move to a new item. |
| R5 | L111 | `Do not use the study board to answer an open immigration or booking question.` | Put that question back into the route, centre, timeline or document record. |

**⑤ 预期**：一轮后 17 处（12.4/千词）→ 二轮后 **15 处（10.9/千词）**；A 类正文边界保留 1 条（B 类引注边界 0 条）。

---

### 8. `goethe-b1-germany-settlement-work`

`src/content/guides/goethe-b1-germany-settlement-work.md` ｜ 正文 1,786 词 ｜ 现有否定标记 **31** ｜ **17.4/千词** ｜ 已枚举边界句 13 条

**① 保留清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L52 | `This is not a work-visa requirement page.` | 【范围·高风险】“not a work-visa requirement page” —— 防“工作签需 B1”的误读，删掉会造成事实误导 |
| K2 | L71 | `These statutory headings do not establish an individual qualifying period or resolve exceptions.` | 【事实】法条标题不构成个人居留期/例外结论，法定来源的边界 |
| K3 | L93 | `They cannot decide a settlement-permit application.` | 【权责】考试方不能决定居留许可 |
| K4 | L122 | `A helpful answer from one owner is not automatically an answer from another.` | 【权责】一个 owner 的回答不等于另一个 owner 的回答 |

**② 删除清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L56 | `It does not assign a legal route from your circumstances.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C2 | L126 | `It does not, by itself, select your route or approve an application.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C3 | L130 | `That supports preparation and product comparison; it does not determine immigration acceptance.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C4 | L164 | `Section 9 supports the current wording of the general settlement-permit … prove that all conditions are fulfilled, or decide an exception.` | D3 不判定资格/结果（P4 decision-authority 已说） |

**③ 合并改写（1 组）**

- **M1** 原文 1 句：
  - `A mention of B1 in a general guide does not establish which provision applies to you, whether you qualify, or which certificate your authority will accept`
  - 成稿：**A general B1 mention answers the provision question for nobody: the provision your authority named decides the level, the proof and the certificate, and each route answer stays in its own file.**
  - 说明：把“泛泛提到 B1 不构成结论”扩写为含“每个路线的答案留在自己的档案”的合并句（同时吸收被删的 D-route 句）

**④ 二轮语气改写（4 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L103 | `Do not transfer an answer from citizenship, work, study or another residence route into this file.` | Keep each route answer in its own file. |
| R2 | L81 | `Do not send personal identity documents to a general website or an unofficial finder.` | Send personal identity documents only through the authority's own contact or submission route. |
| R3 | L134 | `Until the answer arrives, practise only with material you can … do not book a seat because a centre advertises one.` | Book a seat once the authority has named the proof it expects. |
| R4 | L128 | `Do not turn a general “B1” reference into an assumption that every B1-labelled product will work.` | Ask which exact level and document the authority means before comparing any product. |

**⑤ 预期**：一轮后 26 处（14.6/千词）→ 二轮后 **22 处（12.3/千词）**；A 类正文边界保留 4 条（B 类引注边界 0 条）。

---

### 9. `germany-b1-citizenship-language-proof`

`src/content/guides/germany-b1-citizenship-language-proof.md` ｜ 正文 1,656 词 ｜ 现有否定标记 **25** ｜ **15.1/千词** ｜ 已枚举边界句 15 条

**① 保留清单（3 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L54 | `Do not use a B1 result to infer that residence, status, exclusions or other conditions have been met.` | 【事实·高风险】B1 ≠ 居留年限/身份/排除条款的满足 |
| K2 | L113 | `A product's CEFR label establishes what the provider says its … that a nationality authority accepts that product in every form.` | 【事实】CEFR 标签 = 提供方对产品的描述，不等于国籍机关接受形式 |
| K3 | L86 | `Do not use another applicant's result as evidence for your own file.` | 【事实】他人结果不能作为自己案件的证据 |

**② 删除清单（5 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L58 | `This page does not screen for them.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C2 | L105 | `None of the latter three decides whether your complete naturalisation file is accepted.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C3 | L68 | `This page does not decide eligibility, whether Section 10 is … or whether a particular certificate or alternative document is sufficient.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C4 | L62 | `The complete current statute remains the legal source; this article … resolve a discrepancy between a local summary and the law.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C5 | L145 | `It cannot tell you that an authority has accepted your … exception applies, or that every other application condition is met.` | D3 不判定资格/结果（P4 decision-authority 已说） |

**③ 合并改写（2 组）**

- **M1** 原文 2 句：
  - `This page does not decide eligibility, whether Section 10 is your route, whether an exception applies, or whether a particular certificate or alternative document is sufficient`
  - `This page does not screen for them`
  - 成稿：**Whether § 10 is your route, whether a special rule fits and whether your document suffices are questions for the nationality authority; this page keeps them visible instead of answering them.**
  - 说明：“不判定资格 / 不筛查例外 / §10 是否适用”三问并为一句：把否定改成“这三问归国籍机关，本页只负责让它可见”
- **M2** 原文 2 句：
  - `Do not use a B1 result to infer that residence, status, exclusions or other conditions have been met`
  - `This page does not calculate residence time`
  - 成稿：**A B1 result answers the language lane alone; residence, status, exclusions and other conditions stay separate, and residence time is not calculated here.**
  - 说明：“B1 不能推断居留等条件”与“不计算居留时间”并为一句：语言车道与其它条件分列

**④ 二轮语气改写（3 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L121 | `Do not book another exam simply because a comparison chart claims a certificate has a universal validity period.` | Book another exam only when the authority asks for one; a validity claim on a comparison chart carries no document instruction. |
| R2 | L117 | `Do not infer that one successful test creates the other evidence category.` | Treat each successful test as evidence for its own lane only. |
| R3 | L137 | `Never use a study plan, booking page or centre finder to manufacture an eligibility, exception or outcome.` | A study plan, booking page or centre finder can organise the work; eligibility, exceptions and outcomes come from the authority. |

**⑤ 预期**：一轮后 18 处（10.9/千词）→ 二轮后 **15 处（9.1/千词）**；A 类正文边界保留 3 条（B 类引注边界 0 条）。

---

### 10. `germany-b1-leben-in-deutschland-and-language-proof`

`src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md` ｜ 正文 1,626 词 ｜ 现有否定标记 **18** ｜ **11.1/千词** ｜ 已枚举边界句 13 条

**① 保留清单（3 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L66 | `Do not infer that any LiD score suffices.` | 【事实】LiD 分数不自动足用（Integration Course Ordinance §17 第 5 段的条件） |
| K2 | L76 | `Do not treat a B1 language result as civic-knowledge proof.` | 【事实·高风险】B1 语言结果 ≠ 公民知识证明 |
| K3 | L76 | `Do not treat a Leben in Deutschland result as language proof.` | 【事实·高风险】LiD 结果 ≠ 语言证明 |

**② 删除清单（5 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L84 | `These points do not make Leben in Deutschland and the … that the integration-course certificate completes a settlement or citizenship file.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C2 | L142 | `This page intentionally provides no fees, validity periods, appointment waits or acceptance promises.` | D5 适用范围声明（P3 Scope 行已说） |
| C3 | L108 | `It is not a declaration that either test is required … accepted, or that the rest of an application is complete.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C4 | L154 | `Section 17 of the Integration Course Ordinance supports the named … certificate context; it does not decide your receiving authority’s acceptance.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C5 | L154 | `Section 10 supports the statutory separation described in its current … a reader which alternative evidence applies in an individual file.` | D3 不判定资格/结果（P4 decision-authority 已说） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `Do not treat a B1 language result as civic-knowledge proof`
  - `Do not treat a Leben in Deutschland result as language proof`
  - 成稿：**The two lanes do not lend each other evidence: a B1 language result proves language, and a Leben in Deutschland result proves civic knowledge.**
  - 说明：两句否定改为一句“两条证据线不互相借证据”的正面表述，语义强度不变

**④ 二轮语气改写（3 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L116 | `Ask the competent authority a route-specific question: do I need … submitted? Do not replace that answer with a provider page.` | Only the authority's answer counts; a provider page describes a product. |
| R2 | L130 | `Do not put an answer in the Language row merely because it appears in the Civic knowledge row.` | Keep each answer in the row where the authority put it. |
| R3 | L116 | `A test centre cannot answer it, even if it issues a result.` | The answer comes from the authority, whatever the centre issues. |

**⑤ 预期**：一轮后 12 处（7.4/千词）→ 二轮后 **9 处（5.5/千词）**；A 类正文边界保留 3 条（B 类引注边界 0 条）。

---

### 11. `goethe-b1-vs-telc-b1`

`src/content/guides/goethe-b1-vs-telc-b1.md` ｜ 正文 1,568 词 ｜ 现有否定标记 **17** ｜ **10.8/千词** ｜ 已枚举边界句 13 条

**① 保留清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L40 | `It does not cover DTZ, telc B1 Schule, a scaled A2·B1 examination, B1+, or a vocational test.` | 【范围·高风险】不覆盖 DTZ / telc B1 Schule / A2·B1 / B1+ / 职业考 —— 产品比对页的成立前提 |
| K2 | L46 | `A passed Goethe module is not automatically the complete set of evidence your authority needs.` | 【事实】通过的模块 ≠ 完整证据集 |
| K3 | L46 | `A telc results sheet recording an unsuccessful examination is not the pass certificate.` | 【事实】telc 未通过成绩单 ≠ 通过证书 |
| K4 | L108 | `An earlier advertised appointment should remain an incomplete option until the centre answers those questions.` | 【事实】广告中的“B1”在中心确认产品前仍是残缺选项 |

**② 删除清单（5 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L83 | `This is an original planning worksheet, not an official acceptance or booking form.` | D2 非法律意见/不担责（P7 guide-disclaimer 已说） |
| C2 | L87 | `The comparison supports that sequence; it cannot predict which part you will pass.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C3 | L96 | `Its appointment, price or registration answer does not replace an exam-owner rule or receiving-authority decision.` | D4 中心口径转嫁（P6 事实表“still need to confirm”列已说） |
| C4 | L94 | `Do not ask this product source to decide whether a nationality authority will accept your records.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C5 | L95 | `Do not transfer an answer about a scaled or vocational examination to this comparison.` | D3 不判定资格/结果（P4 decision-authority 已说） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `A passed Goethe module is not automatically the complete set of evidence your authority needs`
  - `A telc results sheet recording an unsuccessful examination is not the pass certificate`
  - 成稿：**What a product hands you and what the file needs are different questions: a passed Goethe module is not automatically the full evidence set, and an unsuccessful telc results sheet is not the pass certificate.**
  - 说明：“模块 ≠ 完整证据集”“未通过成绩单 ≠ 证书”合并为一句，避免同段两次否定

**④ 二轮语气改写（2 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L52 | `Do not copy an A1 whole-exam repeat rule into B1, … you retake an individual skill because Goethe has separate modules.` | Keep the A1 repeat rule with A1; read each product resit row for its own repeat unit. |
| R2 | L98 | `Keep the answer unresolved until that party explains which instruction applies; choosing the more convenient sentence is not verification.` | choose by which owner explains which instruction applies |

**⑤ 预期**：一轮后 12 处（7.7/千词）→ 二轮后 **10 处（6.4/千词）**；A 类正文边界保留 4 条（B 类引注边界 0 条）。

---

### 12. `goethe-b1-fees-and-booking`

`src/content/guides/goethe-b1-fees-and-booking.md` ｜ 正文 1,697 词 ｜ 现有否定标记 **27** ｜ **15.9/千词** ｜ 已枚举边界句 13 条

**① 保留清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L32 | `This page supplies a quote-comparison worksheet; it does not publish a universal B1 price or reserve a place.` | 【范围】本页只提供询价工作表，不发布通用 B1 价格、不留位 |
| K2 | L34 | `An exam payment, module booking or available seat does not establish immigration eligibility or proof acceptance.` | 【事实】付款/模块预约/考位 ≠ 移民资格或证明接受 |
| K3 | L46 | `It does not set prices for another country or every partner centre.` | 【事实】德国页价格不覆盖他国与每个伙伴中心 |
| K4 | L60 | `Write “unconfirmed” if the selected centre has not supplied a current answer; an unknown amount is not zero.` | 【事实】“unknown amount is not zero” —— 全文最好的一句边界，删掉会让空白金额变成 0 元预算 |

**② 删除清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L40 | `The [B1 comparison](/guides/goethe-b1-vs-telc-b1/) explains the product’s module and certificate rules; it does not confirm a local offer.` | D4 中心口径转嫁（P6 事实表“still need to confirm”列已说） |
| C2 | L98 | `Product information explains the available evidence types; it does not complete your registration.` | D4 中心口径转嫁（P6 事实表“still need to confirm”列已说） |
| C3 | L102 | `Your personal deadline cannot supply either missing answer.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C4 | L81 | `This is an original information-gathering worksheet, not an official application or payment form.` | D2 非法律意见/不担责（P7 guide-disclaimer 已说） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `it does not publish a universal B1 price or reserve a place`
  - `An exam payment, module booking or available seat does not establish immigration eligibility or proof acceptance`
  - 成稿：**The page supplies a quote-comparison worksheet only: a universal B1 price, a reserved place, an eligibility finding and a proof acceptance each belong to a different owner.**
  - 说明：把“无通用价格/不留位/不establish资格”并为一句 owner 分工

**④ 二轮语气改写（3 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L42 | `Do not add separate module prices and label the result as a full-exam offer unless the centre explicitly confirms that calculation.` | Call a module total a module total; a full-exam offer needs the centre's own confirmation. |
| R2 | L112 | `Do not silently substitute an old screenshot for the current offer.` | Capture the current wording and ask the centre to confirm it against your saved quote. |
| R3 | L87 | `Remove placeholders before sending; do not include unnecessary identity documents in an initial fee enquiry.` | Keep identity documents out of an initial fee enquiry. |

**⑤ 预期**：一轮后 21 处（12.4/千词）→ 二轮后 **18 处（10.6/千词）**；A 类正文边界保留 4 条（B 类引注边界 0 条）。

---

### 13. `germany-b1-settlement-citizenship-timeline`

`src/content/guides/germany-b1-settlement-citizenship-timeline.md` ｜ 正文 1,729 词 ｜ 现有否定标记 **25** ｜ **14.5/千词** ｜ 已枚举边界句 13 条

**① 保留清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L60 | `This timeline does not calculate residence periods, eligibility or processing time.` | 【事实】不算居留期/资格/处理时长 —— 时间轴工具的必要声明 |
| K2 | L132 | `A date from a source that cannot own it is a prompt to verify, not a planning anchor.` | 【事实】来源不能拥有该日期时，日期只是提示不是锚点 |
| K3 | L140 | `It is not an official deadline, a legal calculation or a promise.` | 【事实】输出不是官方截止日/法律计算/承诺 |
| K4 | L89 | `The language test does not set the residence or submission date.` | 【事实】语言考试不设定居留或递交日期（表格内，属事实分工） |

**② 删除清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L164 | `This tool-like page intentionally does not calculate or advise on a legal outcome.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C2 | L176 | `It does not automatically calculate your residence period or decide eligibility.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C3 | L176 | `A selected centre’s message supports its named date and process, not a general result duration or a future retake.` | D4 中心口径转嫁（P6 事实表“still need to confirm”列已说） |
| C4 | L152 | `The ledger is a record of evidence, not a prediction engine.` | D6 元叙述（讲本页在做什么，无语义负荷） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `This timeline does not calculate residence periods, eligibility or processing time`
  - `It is not an official deadline, a legal calculation or a promise`
  - 成稿：**The timeline records evidence: residence periods, eligibility, processing time and any official deadline stay with the authority, and your own buffer stays your own decision.**
  - 说明：“不算居留期/资格/处理时长”与“不是官方截止日”合并；保留“buffer 是你自己的决定”

**④ 二轮语气改写（3 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L108 | `Do not copy another centre's result period, assume a retake seat, or create a standard appointment wait.` | Take a result period, a retake seat and an appointment wait from the centre that owns them. |
| R2 | L74 | `Do not calculate a qualifying period from this worksheet.` | Leave the qualifying period to the authority; record only what it sends you. |
| R3 | L86 | `Do not reuse a settlement route confirmation.` | Open a separate confirmation for the citizenship track. |

**⑤ 预期**：一轮后 19 处（11.0/千词）→ 二轮后 **16 处（9.3/千词）**；A 类正文边界保留 4 条（B 类引注边界 0 条）。

---

### 14. `germany-b1-settlement-citizenship-checklist`

`src/content/guides/germany-b1-settlement-citizenship-checklist.md` ｜ 正文 2,119 词 ｜ 现有否定标记 **32** ｜ **15.1/千词** ｜ 已枚举边界句 16 条

**① 保留清单（3 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L57 | `It cannot establish eligibility, an exception, proof acceptance or a complete file.` | 【范围】清单不产生资格、例外、证明接受或完整卷宗 |
| K2 | L57 | `Settlement-permit and naturalisation routes are not interchangeable.` | 【事实·高风险】居留许可与入籍不可互换 |
| K3 | L172 | `Do not make a negative inference from an item this planning page does not mention.` | 【事实】“不因本页未提及而反推该项不需要” —— 防止读者用缺失做负面推断，保护性最强的一条 |

**② 删除清单（7 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L164 | `It is not a universal document list, an assessment of … for legal advice, or permission to submit an incomplete file.` | D2 非法律意见/不担责（P7 guide-disclaimer 已说） |
| C2 | L198 | `Keep your actual source record with the file; this page is an organising aid and does not issue a decision.` | D6 元叙述（讲本页在做什么，无语义负荷） |
| C3 | L202 | `The four-owner map tells you whether to ask the authority, … checklist infer an approval from a blank or conflicting entry.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C4 | L210 | `A federal orientation page can help locate the process, but cannot authoritatively replace a local authority’s current form, portal or written instruction.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C5 | L212 | `This checklist deliberately never converts a missing answer into a recommendation to submit, pay, or infer approval.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C6 | L170 | `Neither page converts this checklist into an individual legal conclusion, … a local procedure, form, authority contact or current document instruction.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C7 | L144 | `The relevance and required evidence vary by route and case; this page does not supply or assess them.` | D3 不判定资格/结果（P4 decision-authority 已说） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `It cannot establish eligibility, an exception, proof acceptance or a complete file`
  - `Settlement-permit and naturalisation routes are not interchangeable`
  - 成稿：**Use this as a recheck against the authority's current instruction: it establishes no eligibility, exception, proof acceptance or complete file, and the settlement and naturalisation routes stay separate.**
  - 说明：“不产生资格/例外/接受/完整卷宗”与“两条路线不可互换”合并为开篇一句

**④ 二轮语气改写（4 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L73 | `Ask which evidence answers this condition; do not reuse a language result automatically.` | Ask which evidence answers this condition, and record the language result in its own lane. |
| R2 | L115 | `Do not copy settlement pension or housing assumptions into this result as universal nationality requirements.` | Keep nationality requirements to the nationality authority's own list. |
| R3 | L146 | `Do not convert “unresolved” into a guess.` | Leave unresolved as written. |
| R4 | L190 | `Do not submit on the basis that the more convenient source “probably” wins.` | Wait for the owner of the disputed claim to explain which instruction applies. |

**⑤ 预期**：一轮后 24 处（11.3/千词）→ 二轮后 **20 处（9.4/千词）**；A 类正文边界保留 3 条（B 类引注边界 0 条）。

---

### 15. `goethe-b1-study-plan`

`src/content/guides/goethe-b1-study-plan.md` ｜ 正文 2,475 词 ｜ 现有否定标记 **37** ｜ **14.9/千词** ｜ 已枚举边界句 15 条

**① 保留清单（4 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 保留理由 |
| --- | --- | --- | --- |
| K1 | L34 | `It is not a Goethe recommendation, a required duration or a promise that a learner will pass.` | 【范围】非 Goethe 官方推荐、非必需时长、不承诺通过 |
| K2 | L49 | `Practice readiness does not establish certificate acceptance, eligibility, an exemption or completion of other route conditions.` | 【事实】练习就绪 ≠ 证明被接受/资格/例外/其它条件 |
| K3 | L180 | `The library closure is a fictional detail in this exercise, not information about an actual library.` | 【事实·编辑诚信】练习文本里的“图书馆闭馆”是虚构细节 —— 不得被当成真实信息引用 |
| K4 | L164 | `This dialogue practises responding and negotiating; it is not the full speaking exam.` | 【事实】对话练习 ≠ 完整口语考试（伴随的“书面脚本不能评估发音”同句保留） |

**② 删除清单（5 条）**

| # | 行 | 定位（首 10 词 … 尾 10 词） | 命中页面级组件 |
| --- | --- | --- | --- |
| C1 | L67 | `It does not guarantee a pass, prescribe eight weeks, predict a score, set an authority deadline or replace selected-centre instructions.` | D1 变更/核实泛化（P5 VerificationAlert 已说） |
| C2 | L69 | `This plan can organise your study around confirmed information, but … practice result into an accepted certificate or a legal outcome.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C3 | L97 | `My practice schedule cannot answer any of these, and a … acceptance.” Put the source URL and date beside the note.` | D3 不判定资格/结果（P4 decision-authority 已说） |
| C4 | L200 | `They do not prescribe how long you must study, guarantee a pass, or decide whether a certificate will satisfy an application.` | D1 变更/核实泛化（P5 VerificationAlert 已说） |
| C5 | L53 | `- Treating eight weeks as an official or sufficient preparation period — the template organises practice; it does not measure readiness.` | D6 元叙述（讲本页在做什么，无语义负荷） |

**③ 合并改写（1 组）**

- **M1** 原文 2 句：
  - `It is not a Goethe recommendation, a required duration or a promise that a learner will pass`
  - `It does not guarantee a pass, prescribe eight weeks, predict a score, set an authority deadline or replace selected-centre instructions`
  - 成稿：**This is an editorial template: Goethe does not recommend it, eight weeks is not a requirement, and it promises neither a pass nor a score.**
  - 说明：“非 Goethe 推荐/非必需时长/不承诺通过”三合一，删掉后半与 P7 重复的“不替代中心指令”

**④ 二轮语气改写（4 处，指令句正面化）**

| # | 行 | 原文 | 改为 |
| --- | --- | --- | --- |
| R1 | L77 | `Do not copy live questions, use purported leaks or treat anonymous answers as authoritative format guidance.` | Practise on official or lawfully published material only; anonymous answers carry no format authority. |
| R2 | L103 | `Do not call a short exercise a full mock.` | Call a short exercise a short exercise; a mock follows the official instructions. |
| R3 | L192 | `Do not change products solely because a week felt difficult.` | Change a task type, a sample or a recovery slot first. |
| R4 | L196 | `If you still need to choose an accepted product, return … do not use a study preference as an acceptance decision.` | Base the product choice on the authority instruction; a study preference belongs in the practice plan. |

**⑤ 预期**：一轮后 31 处（12.5/千词）→ 二轮后 **27 处（10.9/千词）**；A 类正文边界保留 4 条（B 类引注边界 0 条）。

---

## 5. 总表

口径：正文词数、否定标记均按 §1.1 主口径。「现有边界句」= 本处方逐条枚举的边界句总数（保留 + 删除 + 合并原文句 + 二轮改写句）。「合并后」= 保留 + 合并后的成稿句 + 二轮改写句。

| # | slug | 正文词数 | 现有否定标记 | 现密度 | 现有边界句 | 保留 | 删除 | 合并后 | 一轮后 | 二轮后 |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | `german-family-reunion-language-requirement` | 1,492 | 29 | 19.4 | 15 | 4 | 4 | 10 | 24（16.1） | 17（11.4） |
| 2 | `goethe-a1-vs-telc-a1` | 1,637 | 24 | 14.7 | 10 | 3 | 2 | 7 | 22（13.4） | 19（11.6） |
| 3 | `goethe-a1-test-centers` | 1,779 | 23 | 12.9 | 13 | 3 | 4 | 8 | 17（9.6） | 13（7.3） |
| 4 | `goethe-a1-fees-by-country` | 1,789 | 37 | 20.7 | 14 | 3 | 5 | 8 | 28（15.7） | 24（13.4） |
| 5 | `german-a1-exam-booking-timeline` | 1,827 | 32 | 17.5 | 10 | 4 | 2 | 8 | 29（15.9） | 26（14.2） |
| 6 | `german-a1-documents-checklist` | 1,737 | 28 | 16.1 | 14 | 3 | 5 | 8 | 22（12.7） | 18（10.4） |
| 7 | `goethe-a1-30-day-study-plan` | 1,370 | 17 | 12.4 | 8 | 1 | 1 | 7 | 17（12.4） | 15（10.9） |
| 8 | `goethe-b1-germany-settlement-work` | 1,786 | 31 | 17.4 | 13 | 4 | 4 | 9 | 26（14.6） | 22（12.3） |
| 9 | `germany-b1-citizenship-language-proof` | 1,656 | 25 | 15.1 | 15 | 3 | 5 | 8 | 18（10.9） | 15（9.1） |
| 10 | `germany-b1-leben-in-deutschland-and-language-proof` | 1,626 | 18 | 11.1 | 13 | 3 | 5 | 7 | 12（7.4） | 9（5.5） |
| 11 | `goethe-b1-vs-telc-b1` | 1,568 | 17 | 10.8 | 13 | 4 | 5 | 7 | 12（7.7） | 10（6.4） |
| 12 | `goethe-b1-fees-and-booking` | 1,697 | 27 | 15.9 | 13 | 4 | 4 | 8 | 21（12.4） | 18（10.6） |
| 13 | `germany-b1-settlement-citizenship-timeline` | 1,729 | 25 | 14.5 | 13 | 4 | 4 | 8 | 19（11.0） | 16（9.3） |
| 14 | `germany-b1-settlement-citizenship-checklist` | 2,119 | 32 | 15.1 | 16 | 3 | 7 | 8 | 24（11.3） | 20（9.4） |
| 15 | `goethe-b1-study-plan` | 2,475 | 37 | 14.9 | 15 | 4 | 5 | 9 | 31（12.5） | 27（10.9） |
| — | **合计 15 篇** | **26,287** | **402** | **15.3** | **195** | **50** | **62** | **120** | **322（12.2）** | **269（10.2）** |

### 5.1 读表说明

- **保留** 列全部 ≤4：口径 A 达成，15/15。
- **二轮后密度** 列：6 篇 ≤10.0，6 篇在 10.1–11.6，3 篇在 12.3–14.2（`german-a1-exam-booking-timeline` / `goethe-a1-fees-by-country` / `goethe-b1-germany-settlement-work`，补齐方案见 §1.2 口径 B）。15 篇合计 **402 → 269（−33%）**，密度 **15.3 → 10.2**，无一篇高于改前。
- 若要继续压，只剩三个来源（按性价比排序）：①6 篇的 `## Source boundaries and recheck` 整节（20 处）；②剩下的 68 处指令性否定（第三轮正面化）；③`## Mistakes to avoid` 里带否定的解释性尾句（约 15 处）。三者全做完是 **269 − 103 ≈ 166 处（约 6.3 每千词）**——仍差 8 处到 6，而这 8 处只能从事实性否定里出。

### 5.2 六篇的整节处置建议（本处方未逐句覆盖的部分）

以下 6 篇文末都有一节 `## Source boundaries and recheck`，是 P5+P6 的散文复述，**建议整节删除**（不是逐句删，是整节删掉后把其中唯一的可操作句并入 `## Next action`）：

| slug | 该节词数 | 该节否定数 | 并入 Next action 的可操作句 |
| --- | ---: | ---: | --- |
| `goethe-b1-germany-settlement-work` | 140 | 3 | 「Before booking, submitting or relying on an old reply, recheck the competent authority's current instruction.」 |
| `germany-b1-citizenship-language-proof` | 153 | 4 | 「Obtain the authority's response and compare it to the document you plan to use.」 |
| `germany-b1-leben-in-deutschland-and-language-proof` | 152 | 3 | 「Before submitting, re-open the authority's current page or written reply and compare it with both evidence columns.」 |
| `germany-b1-settlement-citizenship-timeline` | 151 | 4 | 「Before you act on the calendar, inspect the source date as well as the event date.」 |
| `germany-b1-settlement-citizenship-checklist` | 145 | 4 | 「Recheck before submitting whenever a document has changed or an instruction is older than your record.」 |
| `goethe-b1-study-plan` | 148 | 2 | 「Review the product material if your exam choice changes.」 |

> 注意：整节删除后分母减少约 150 词，密度会小幅回升（分子减 2–4、分母减 150）。建议与第三轮改写同批执行，否则单看密度指标会出现「删得越多密度越高」的假象。

### 5.3 六篇的章节顺序问题（结构性，非本次范围，但会干扰执行）

`goethe-b1-germany-settlement-work`、`germany-b1-citizenship-language-proof`、`germany-b1-leben-in-deutschland-and-language-proof`、`germany-b1-settlement-citizenship-timeline`、`germany-b1-settlement-citizenship-checklist`、`goethe-b1-study-plan` 六篇的 `## Who this is for` 与 `## Key decisions` 排在 `## Official sources` **之后**（即正文写到一半又回头讲「这篇是给谁的」），`ArticleTOC` 里也会按这个错序渲染。这不是文案问题，建议单独立项修结构；本次处方只动句子，不动顺序，以免与结构修复冲突导致行号对不上。

---

## 6. 风险最高的三篇（删错就出事实问题）

### 风险 1（最高）：`goethe-a1-fees-by-country` — 价格与地域事实双重叠加

**风险点**：本处方把 C2「This is a Beijing fee route, not a China-wide route.」判为 D5（与 K2 重复）删除。**只有在该篇 K2 完整保留的前提下这个删除才成立。** K2 一句话同时承载两件事：北京 ≠ 全中国、德国页 ≠ 每个伙伴结算。若执行者删了 K2 却留下 C2，限定就降级为「北京 ≠ 全中国」，**丢掉「德国价格页不覆盖独立考试伙伴」这一半**，页面会变成对全德国的价格暗示。
**另外**：K3「不换汇、不算跨币种总额」是编辑政策，不是免责；R1 至 R4 四条改写必须逐字保留原意（「placeholder / average / ceiling / negotiating reference」四个禁用用法一个都不能少）。

### 风险 2：`goethe-a1-test-centers` — 中国地域限定

**风险点**：K2「Beijing evidence is not a China-wide price or category rule.」是全站唯一一处明确否定「北京价=中国价」的表述。删掉或弱化，会直接构成对中国申请人的价格误导，属事实错误 + 合规风险。
**次风险**：K3「A listed amount does not guarantee a seat」容易被误判为 D1（「都会变，去核实」）而删掉，但它说的是**金额与席位是两件事**，与 P5 无关。

### 风险 3：`goethe-b1-germany-settlement-work` — 一句话决定页面存在理由

**风险点**：K1「This is not a work-visa requirement page.」是该页唯一的入口级纠正 —— 页面 URL 里带 `-work-`，所有误读都从这里来。它长得像 D5（范围声明），但 P3 的 `audienceScope` 只写「正在核对居留许可语言要求的人」，**没有否定「工作签需要 B1」这一误读**，所以不能交给 P3 兜底。紧随其后的第二句「Do not read it as "all German employment applications require B1."」**不在本次处置清单内，原样保留** —— 执行者不得因为它长得像范围声明就顺手删掉或「顺一下语气」；它与 K1 是同一组纠正，改一个不改另一个会造成半句话悬空。

### 次高风险（排第 4–5，一并提醒）

- `germany-b1-settlement-citizenship-checklist`：K2「Settlement-permit and naturalisation routes are not interchangeable.」被并入合并句，若合并句被简化掉这半句，读者会把入籍清单套到居留许可上。
- `germany-b1-leben-in-deutschland-and-language-proof`：K2/K3 是全文论点（语言与公民知识互不顶替），合并后必须仍是两条独立主张，**不能压缩成一句「两条都要」** —— 那会变成新的资格暗示。

---

## 7. 需要主理人裁决的四件事

| # | 事项 | 我的建议 | 代价 |
| --- | --- | --- | --- |
| 1 | **密度目标 ≤6 是否调整** | 改为「A 类边界 ≤4/篇（已达成）+ 原始否定密度 ≤12/千词（已达成 10.2）」。若坚持 6，请指定「只计免责性否定」口径 → 现状 0.46，二轮后趋近 0 | 改口径不动代码；坚持 6 则必须删事实，违反硬约束 |
| 2 | **页面级免责栈是否收敛**（实测 8–10 处 → ≤3；10 处 = P0–P9 全开，8 处 = 无事实表/无徽标的页面） | 必须做，这才是体验问题的根。建议保留 P1（答案）、P4（谁决定）、P6（事实表），删除 P2/P3 合并进 P4，P7 与 P8 合并；P0 页脚免责属全站导航区，建议保留但缩短为一句话 | 需改 `GuideLayout.astro` + `GlobalFooter.astro` + 4 个组件，且要同步改 `tests/source-review-render.test.js` 的字符串断言 —— 属另一个窗口，且受 planning-map 治理 |
| 3 | **第二轮语气改写是否授权** | 授权。123 处指令性否定中本轮已改写 53 处，剩余 68 处是最后一块可执行收益，且不改事实 | 会动 voice，需与 content-editor 的品牌声音基线对齐一次 |
| 4 | **六篇章节错序是否同期修** | 另立窗口。先修结构会让本处方的行号全部失效 | 若先修结构，本文件须按新行号重新生成（重跑口径见 §8） |

---

## 8. 附：本处方的可复现性

- 所有引文、行号、否定计数由一次性脚本对 `src/content/guides/*.md` 做子串校验生成；**每条引文都在源文件中唯一命中**，未命中的锚点已被剔除（生成过程会报 `NOT FOUND` / `AMBIG`，当前为 0）。
- 计数正则（否定标记）：`\b(?:not|never|cannot)\b|n't`，大小写不敏感；词数正则：英文字母/数字/撇号/连字符组成的 token。
- 复核方式：仓库根目录建一个临时脚本 `c.py`：
  ```python
  import re, sys
  b = open('src/content/guides/%s.md' % sys.argv[1], encoding='utf-8').read().split('---', 2)[2]
  cue = re.compile(r"\b(?:not|never|cannot)\b|n't", re.I)
  word = re.compile(r"[A-Za-z0-9\u2019'\-]+")
  print(len(cue.findall(b)), len(word.findall(b)))
  ```
  执行 `python3 c.py <slug>`，第一个数应等于 §5 总表「现有否定标记」列。
- 行号对应 **2026-10-27 13:19 磁盘工作区**（当时 `src/` 已有大量未提交改动，`HEAD` 是 `4cb57e8`）。因此**不要用 `git show HEAD:` 取原文对行**，一律以磁盘文件为准。若 `src/content/guides/` 在本次执行前又被改动，**请重新生成行号，不要手工对**。
