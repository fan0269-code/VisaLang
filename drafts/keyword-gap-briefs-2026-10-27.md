# 关键词缺口研究 Brief（三节）— 2026-10-27

**产出人**：keyword-researcher-2
**用途**：为「telc 类目解封」「中文歌德A1费用页」「Canada TEF/TCF 决策」三个缺口提供可执行研究结论
**写入范围**：仅 `drafts/`。本文件不触碰 `src/`——`src/` 并非不可写，但**任何 `src/` 改动都会触发 planning-map 同步契约**（`AGENTS.md:47`：需新 sync ID、`docs/planning-map/sync.json`、`history.json` 追加、冻结候选路径分类、watched-scope digest、drift 判定；`tests/planning-map-governance.test.mjs` 的 watch roots 覆盖全部 `src/` 与 `public/`）。这是**流程成本**，不是禁令；只有 drift 判为 `unresolved` 时才阻塞完成与发布。

## 证据基准与方法说明

| 项目 | 内容 |
| --- | --- |
| 竞品观察日期 | 2026-10-27（单次 WebSearch 检索，单引擎、前 5 条结果采样） |
| 仓库事实 | **内容篇数 53**（`git ls-tree -r HEAD --name-only src/content/guides \| wc -l` = 53，版本库口径）；工作区全量 55，其中 2 个是测试夹具（`__source-review-pending-fixture.md`、`__source-review-reviewed-fixture.md`），不计入内容篇数。`src/pages/zh/guides/` 8 篇（遍历哨兵 `8/8`）。`dist/sitemap-0.xml` 41 条 **仅为 13:19 快照，dist 不稳定，不作证据源**（见「证据勘误」§3） |
| 搜索量 | **本文档不给出任何搜索量数字**。项目内无 GSC 导出、无第三方工具授权数据；凡涉及量级处一律标注「需工具确认」 |
| 官方事实 | 只写检索中实际看到的原文口径；无法核验处标「需核验」 |
| 机构名/费用 | 不新造机构名、不新造价格。唯一允许上线的价格数字见 §B.6（已存在于 `claim-registry`） |

## 证据勘误（2026-10-27 复核，**必读**）

本机 shell `grep` 为 toybox 0.8.13，有三处静默陷阱（team-lead 实测）：①BRE 下 `\|` 不支持交替，**不报错、返回空**；②ERE 下 `\b` 被改写成字面量 `b`（既漏计也假命中）；③`grep -c` 数**行**不数**次数**。本机另有 `rg` 15.2.0，`\b` 与交替均正常。**本文档所有「已核验/零命中」断言一律用 `rg` 或 `node`，并附阳性对照。**

本文档初稿有一条结论确实错（§1），另一条初稿观察**成立但我一度错误地自我撤回**（§2）——后者比前者更值得记住。

### 1）「4 篇 telc 页站内入链 = 0」→ **确实错，已修正**

初稿命令用 BRE `\|`（`grep -rn "telc-vs-goethe\|telc-b1-b2"`），静默返回空。`rg` 复核（阳性对照见命令块）：

```
$ rg -n "LocalExamFeeTable" src/layouts/GuideLayout.astro   # 阳性对照，必命中
14:import LocalExamFeeTable from '../components/LocalExamFeeTable.astro';   ← 对照通过

$ rg -n "telc-vs-goethe-for-german-visa|telc-b1-b2-germany-work-nursing|telc-b1-b2-exam-format-and-preparation|telc-b1-b2-fees-and-test-centers" src/
（排除 4 个页面自身后，仅 2 行）
src/pages/germany-b1-settlement-citizenship.astro:88:  ... <a href="/guides/telc-b1-b2-germany-work-nursing/">telc B1/B2 work and nursing decision boundary</a>
src/pages/germany-b1-settlement-citizenship.astro:101: ... <a href="/guides/telc-b1-b2-exam-format-and-preparation/">telc B1 and B2 format baseline</a>
```
→ 修正为：`nursing` 与 `exam-format` 各 1 条入链；`visa 对比` 与 `fees` 为 0 条。

### 2）「英文费用页 `directAnswer` 承诺数字但无渲染」→ **初稿成立；我曾错误自撤，现更正为「当时成立，工作区已加入修复但未提交」**

我第一轮判断（页面承诺「the dated figures appear below」而产物无任何金额）**在已提交状态（HEAD）上是成立的**：

```
$ git show HEAD:src/layouts/GuideLayout.astro | rg -n "LocalExamFeeTable"
HEAD 中无 LocalExamFeeTable（零命中）
$ git show HEAD:src/layouts/GuideLayout.astro | rg -c "."     # 阳性对照：证明 git show 输出正常
113
$ git ls-tree HEAD src/components/ | rg -n "LocalExamFeeTable"
HEAD 中无该组件文件（零命中）

$ git status --short src/components/LocalExamFeeTable.astro src/layouts/GuideLayout.astro tests/m2a-local-fees-centres.test.mjs
 M src/layouts/GuideLayout.astro
?? src/components/LocalExamFeeTable.astro
?? tests/m2a-local-fees-centres.test.mjs
```

**结论**：HEAD 里既没有组件、也没有接线，该页在版本库状态下只有 direct answer、没有金额渲染路径——**初稿观察成立**。工作区已被加入修复（组件与测试为**未跟踪文件**，接线为**未提交改动**）。

**关于「什么时候修的、是谁修的」——本仓库无法定论，不要写具体时刻或任务号。** `git status` 只能给出三态（无 / `??` 未跟踪 / `M` 已改未提交），`??` 与 `M` 只证明「工作区有、版本库无」，**不证明先后或归属**；而未提交意味着没有提交历史可定位任务。mtime **不是时间证据**，只是文件系统属性——实测反例有两个方向：

```
$ stat -f '%Sm  %N' -t '%Y-%m-%d %H:%M:%S' \
    src/layouts/GuideLayout.astro src/components/LocalExamFeeTable.astro \
    tests/m2a-local-fees-centres.test.mjs src/content/guides/goethe-a1-fees-by-country.md
2026-10-27 12:57:19  src/layouts/GuideLayout.astro            ← 早于它 import 的组件 5 小时
2026-10-27 18:12:58  src/components/LocalExamFeeTable.astro
2026-10-06 23:27:09  tests/m2a-local-fees-centres.test.mjs    ← 早于本次工作 3 周，却是未跟踪新文件
2026-10-27 18:15:28  src/content/guides/goethe-a1-fees-by-country.md
```
① 早于它依赖的文件；② 早于它自己存在的那一天（`cp -p`、模板展开、checkout、另存均可任意设定 mtime）。**准确表述**：「HEAD 无渲染路径；工作区已加入修复（组件与测试未跟踪、接线未提交）；该修复未提交，故无法用提交历史定位时点与任务归属」。

**我第二轮的错误**：我在看到这批新文件后复核，把它们当成「一直存在的架构」，于是写下「错，完全推翻」并请 team-lead 撤回——**用修复产物反驳了原始观察**。这一条比 §1 更危险，因为它不是工具骗人，而是**时间维度上的错误归因**。

> **规范（本文档后续所有复核遵循，四条）**：
> ① **阳性对照**——每个「零命中」脚本内建一条已知存在的样本，对照未命中则非零退出；
> ② **模式覆盖面**——报告零命中必须写明模式覆盖了哪几种写法（金额需同时覆盖 `CNY 1,400` / `1400` / `¥1,400` / `EUR 155` 等）；
> ③ **来源溯源**——只用 `git show HEAD:` / `git ls-tree HEAD` / `git status --short` 三态判断「版本库有无」。**mtime 不是时间证据**，只是文件系统属性（实测：某未跟踪新测试文件 mtime 早于本次工作 3 周；某已改文件 mtime 早于它所 import 的组件 5 小时）。`??` 与 `M` 只能证明「工作区有、版本库无」，**不能证明先后或任务归属**；未跟踪文件不能用来证明既有设计；
> ④ **终止哨兵**——凡遍历型脚本（多文件/多目录）必须打印 `[done] processed n/expected`，且 `n !== expected` 非零退出。本机 fs broker 会在读大量文件时**静默截断且不报错**（实测有目录列表在 12 条处截断、脚本被 SIGTERM 后上游只拿到部分结果）。**没有哨兵的遍历输出一律视为可能被截断。** 同时一个文件只读一次，多口径需求先缓存复用。
> ⑤ **风险提示必须标注"已发生"还是"条件满足才发生"**——不得用「很可能已经有人…」把未核推测写成存量风险（本文档初稿曾写「很可能已有人在某篇上以为自己写了答案」，实测 5 篇中仅 1 篇有 `directAnswer` 且已正确注册，**该风险并未发生**）。写风险要么给出已发生的证据，要么明确写清触发条件与当前是否满足。这类错误会让人去改本来正确的东西。

### 3）dist 与"计数"都不稳定，不作为证据源

`dist/` 在本次工作期间多次变动。**sitemap 条目数在同一小时内出现三种读数**（均为 `rg -o "<loc>" dist/sitemap-0.xml | wc -l`）：

| 时刻 | `dist/sitemap-0.xml` loc 数 | 备注 |
| --- | ---: | --- |
| 13:19 | 41 | 当时构建 |
| ~19:20 | **90** | 与 team-lead 读数一致；同一时点 `dist` 顶层条目正常 |
| 19:30 | 41 | 期间该文件一度**不存在**（`rg` 报 `No such file or directory`），`dist` 顶层条目仅 30 |

→ 说明有**并发重建**在反复清空/写入 `dist`。因此 **`dist` 只用于一次性观察，不作可复现证据**；所有结论改用源码级证据（frontmatter `noindex`、`publication-manifest` 名单、`git show HEAD:`）。若确需产物数字，必须**先取得一次稳定构建、并在构建结束后立即快照**（含 sitemap mtime），否则同一小时内会得出 41 或 90 两种结论。

> 同型陷阱提醒：本仓库 `dist/sitemap-0.xml` 是**单行 XML**，`rg -c` 会把全部命中算作 1 行——必须用 `rg -o … | wc -l` 计**次数**。

**计数同样不可单次采信**（实测记录）：

| 读取 | `rg --files src/content/guides \| wc -l` | `find` | `ls -1` | 备注 |
| --- | ---: | ---: | ---: | --- |
| 第 1 次 | 55 | 55 | 55 | 三法一致 |
| 第 2 次（约 30 秒后） | **53** | — | — | **单次读数异常** |
| 第 3–5 次 | 55 | 55 | 55 | 稳定 |

**结论**：内容篇数以**版本库口径**为准 —— `git ls-tree -r HEAD --name-only src/content/guides \| wc -l` = **53**；工作区 55 多出的 2 个是测试夹具 `__source-review-pending-fixture.md` / `__source-review-reviewed-fixture.md`，**不是内容页**。若不区分夹具，工作区计数会把内容量虚增 2 篇。凡出现「篇数」类结论，一律写明口径（HEAD / 工作区）与是否排除夹具，并重复读取 ≥2 次确认稳定。

### 未受影响、仍成立的结论（均 `rg` 复核 + 阳性对照）

- telc 四页 `starter-overview` / Canada 两页 `verification-pending`，六页 `noindex: true`；
- telc 四页均不在 `englishPillarSlugs` / `chinesePillarSlugs`；
- 中文层无费用页（`ls src/pages/zh/guides/ | rg -n "fee|cost|price"` → 零命中，阳性对照为同目录已知文件）；
- 「歌德」计数（**8 文件遍历，带终止哨兵**）：

```
$ ZH=(src/pages/zh/guides/*.astro); EXP=${#ZH[@]}; N=0; echo "expected=$EXP"
expected=8
$ for f in $ZH; do printf "%s  %s\n" "$(rg -o "歌德" "$f" | wc -l | tr -d ' ')" "${f:t}"; N=$((N+1)); done
1  german-a1-documents-checklist.astro
0  german-a1-exam-booking-timeline.astro
0  german-family-reunion-language-requirement.astro
0  goethe-a1-30-day-study-plan.astro
0  goethe-a1-booking-mistakes.astro
0  goethe-a1-germany-family-reunion.astro
0  goethe-a1-test-centers.astro
0  goethe-a1-vs-telc-a1.astro
$ echo "[done] processed ${N}/${EXP} files"
[done] processed 8/8 files
[control OK] positive
$ rg -n 'title="[^"]*歌德[^"]*"' src/pages/zh/guides/   → title 层零命中
```
→ **title 层 0 命中；body 层 1 命中**（`german-a1-documents-checklist.astro:15` 来源锚文本「北京歌德学院考试报名信息」）。模式覆盖面：中文字面量 `歌德`（非 `\p{Han}` 类属性转义），并单独覆盖 `title="..."` 属性层。

**必须知道的两条仓库事实（影响下面所有结论）**

1. 三个缺口在 HEAD 状态均未被收录。源码级可复现证据：六页 `noindex: true`（见 §A.0 / §C.0 命令）+ 均不在 pillar 名单 → `getEnglishGuidePublicationPolicy()` 必然返回 `pending`，与是否构建无关。
   **构建侧旁证（19:30 一次可读构建）**：`rg -o "<loc>" dist/sitemap-0.xml | wc -l` = **41**；其中 `rg -o "<loc>[^<]*(telc|canada|tef|tcf)[^<]*</loc>"` = **3**，三条全部来自 `goethe-a1-vs-telc-a1`、`goethe-b1-vs-telc-b1`、`/zh/guides/goethe-a1-vs-telc-a1`（命中只因 URL 含 "telc" 字样），**无 telc 产品页、无 Canada、无 tef/tcf、无中文费用页**。
2. 仓库根目录的 `sitemap.xml` 是旧静态站遗留文件，**不参与构建**（构建产物 `dist/robots.txt` 指向 `sitemap-index.xml`）。实测：`rg -o "<loc>" sitemap.xml | wc -l` = **53** 条，其中 `rg -o "<loc>[^<]*\.html</loc>"` = **51** 条带 `.html` 后缀，且 `rg -o "<loc>[^<]*(telc|canada)[^<]*</loc>"` = **8** 条含 telc/canada。当前构建的页面是目录式 URL（`/guides/xxx/`），与 `.html` 后缀不匹配 → 该文件确定过期。任何「telc 已在 sitemap 里」的判断都来自它，不要采信。

---

# A. telc 类目解封

## A.0 现状事实（仓库证据）

| 页面 | 正文字数（`---` 之后统计） | contentStatus | noindex | 站内入链 |
| --- | ---: | --- | --- | --- |
| `telc-vs-goethe-for-german-visa` | 1,374 | `starter-overview` | `true` | **0 条** |
| `telc-b1-b2-germany-work-nursing` | 1,369 | `starter-overview` | `true` | **1 条**：`/germany-b1-settlement-citizenship/`（可索引） |
| `telc-b1-b2-exam-format-and-preparation` | 1,346 | `starter-overview` | `true` | **1 条**：`/germany-b1-settlement-citizenship/`（可索引） |
| `telc-b1-b2-fees-and-test-centers` | 1,207 | `starter-overview` | `true` | **0 条** |

入链现状（**`rg` 复核 + 阳性对照**）：`src/pages/germany-b1-settlement-citizenship.astro:88` 链到 nursing 页、`:101` 链到格式页。

```
$ rg -n "LocalExamFeeTable" src/layouts/GuideLayout.astro        # 阳性对照：必命中
14:import LocalExamFeeTable from '../components/LocalExamFeeTable.astro';
[control OK]

$ rg -n "telc-vs-goethe-for-german-visa|telc-b1-b2-germany-work-nursing|telc-b1-b2-exam-format-and-preparation|telc-b1-b2-fees-and-test-centers" src/
  （排除 4 个页面自身后仅 2 行）
src/pages/germany-b1-settlement-citizenship.astro:88:  ... <a href="/guides/telc-b1-b2-germany-work-nursing/">telc B1/B2 work and nursing decision boundary</a>
src/pages/germany-b1-settlement-citizenship.astro:101: ... <a href="/guides/telc-b1-b2-exam-format-and-preparation/">telc B1 and B2 format baseline</a>
（仅此 2 行 → 其余两页零入链）
```

**模式覆盖面**：4 个完整 slug（非前缀），同时覆盖 `.md` / `.astro` / `.ts` 三类文件——因为 slug 唯一，不存在「同一链接写成别名」的漏检面。

出链方向是单向的：4 篇 telc 页面通过 `supportingGuideSlugs` / `nextGuideSlug` 指向 Goethe/B1 页面。

**正文字数证据（7 文件遍历 + 终止哨兵 + 阳性对照）**：

```
$ W=(telc-vs-goethe-for-german-visa telc-b1-b2-germany-work-nursing telc-b1-b2-exam-format-and-preparation \
     telc-b1-b2-fees-and-test-centers tef-canada-immigration tcf-canada-vs-tef goethe-a1-fees-by-country)  # 均加 .md 与目录前缀
$ EXP=${#W[@]}; echo "expected=$EXP"   →   expected=7
 1374  telc-vs-goethe-for-german-visa.md
 1369  telc-b1-b2-germany-work-nursing.md
 1346  telc-b1-b2-exam-format-and-preparation.md
 1207  telc-b1-b2-fees-and-test-centers.md
  579  tef-canada-immigration.md
  688  tcf-canada-vs-tef.md
 1820  goethe-a1-fees-by-country.md
[done] processed 7/7 files
[control OK] positive (1374 words)
```
口径：`awk 'c>=2'` 跳过两条 `---` 之前的 frontmatter 后 `wc -w`；中文页不适用（按词计会失真，故中文页未计字数）。

> 这条勘误改变了 A 节的分批结论：**第一批两页已经各有一条来自可索引 Hub 的入链**，因此它们的解封门槛比初稿判断更低（只需再补 1 条，而不是从 0 建 2 条）；而对比页与费用页仍是零入链的孤儿。

另有两处会直接决定解封成败的结构问题：

- `getEnglishGuidePublicationPolicy()` 要求同时满足 `englishPillarSlugs` 成员 + `sourceReviewStatus === 'reviewed'` + `contentStatus ∈ {complete-route, core-route}` + `noindex !== true`。**telc 四页都不在 `englishPillarSlugs` 里**，`contentStatus` 都是 `starter-overview`。也就是说：只把 `noindex: true` 改成 `false` **不会**让它们进 sitemap，必须同时改三处（pillar 名单、contentStatus、noindex）。
- `telc-vs-goethe-for-german-visa` 的 H2 是模板骨架：`Exam Overview / Eligibility / Fees / Dates / Test Format / Locations / Online / Required Documents / Passing Score / Retake Policy / Prep Path / Best Courses / Practice Test / Career Outcome / Related Exams`，每节仅 1 段通用话；`Best Courses` 节实际内容是「本页不排名课程」。这类空节是解封后必然被判低质的最大风险点。

## A.1 主关键词与变体表

### A.1.1 对比页：`telc-vs-goethe-for-german-visa`

| 角色 | 关键词 | 意图 | 竞争页面类型 | 备注 |
| --- | --- | --- | --- | --- |
| 主关键词 | `telc vs goethe which is better for visa` | commercial investigation | 备考机构对比长文 | 需工具确认（月量级 + KD） |
| 变体 1 | `is telc accepted for german visa` | informational（决策卡点） | 机构 FAQ / 使馆问答转述 | 需工具确认 |
| 变体 2 | `telc or goethe for family reunion visa` | informational | 机构对比页 | 需工具确认 |
| 变体 3 | `telc vs goethe for german embassy` | informational | 机构对比页 | 需工具确认 |
| 变体 4 | `which german certificate does the embassy accept` | informational | 使馆须知页 + 二手转述 | 需工具确认 |
| 变体 5 | `goethe vs telc a1 spouse visa` | informational | 机构对比页 | 与站内 `/guides/goethe-a1-vs-telc-a1/` 有重叠风险 → 见 §A.7 蚕食防护 |

### A.1.2 护理/工作页：`telc-b1-b2-germany-work-nursing`

| 角色 | 关键词 | 意图 | 竞争页面类型 | 备注 |
| --- | --- | --- | --- | --- |
| 主关键词 | `telc b2 pflege nursing germany` | commercial investigation + 流程需求 | 考点/语言学校招生页 + 中介流程页 | 需工具确认 |
| 变体 1 | `telc deutsch b1 b2 pflege recognition` | informational | 考点页 / 中介页 | 需工具确认 |
| 变体 2 | `german b2 requirement for nurse recognition germany` | informational | 中介流程长文 | 需工具确认 |
| 变体 3 | `pflege language requirement anerkennung b2` | informational | 中介/律所页 | 需工具确认 |
| 变体 4 | `which german certificate for nurse recognition` | informational | 中介页 + 论坛 | 需工具确认 |
| 变体 5 | `telc pflege vs goethe b2 nursing` | commercial investigation | 机构对比页 | 需工具确认 |

> 说明：以上变体来自 SERP 中反复出现的实体组合（telc / Goethe / Pflege / Anerkennung / B2 / embassy / spouse visa），**不是**工具导出的搜索量清单。上量前必须用 GSC 现有关联查询 + 关键词工具核对。

## A.2 意图分类结论

- **两页都不是纯 informational**。真实意图是「我有一个人生决定，需要一个能签字的答案」——即 *decision-support*。
- 对比页意图落在 **commercial investigation**，但用户真正想要的是「我的使领馆接不接受 telc」。因此页面第一屏必须回答「谁决定」，而不是「哪个更好」。
- 护理页意图落在 **requirement verification**（先确认认可见习/执照机关要什么），其次才是产品选择。
- **transactional 不成立**：本项目没有报名代理能力，强行做 transactional 会造成承诺风险。

## A.3 SERP 形态观察（2026-10-27）

对比词 `telc vs goethe which is better for visa` Top 5 全部是第三方备考/机构站（languageprep.de、languagetest.in、entri.app、germanacharya、examdeutsch）。共同形态：

1. **双列对比表**（等级范围/价格区间/考点数量/通过分/出分周期/是否接受用于签证与入籍）。
2. **「Choose X if / Choose Y if」决策清单**。
3. **FAQ 区块**（是否更难、是否更便宜、证书是否过期）。
4. **价格区间**（欧元区间、印度卢比区间）与**「证书终身有效 / 12 个月内」**这类断言。

这给我们三个明确的空白（全部是竞品共同缺陷，不是我的推测）：

- **没有任何一条页面引用签发机关的原文**。Top 5 全部用「✅ 签证接受」这类打勾表格代替原文，读者无法拿去和使领馆核对。
- **把「接受」写成全局事实**。真实情况是按使领馆/申请地分别公告，且同一国家内不同签证类别可能点名不同产品。
- **没人处理可得性**。检索中被多篇中文来源重复提到「中国大陆目前无 telc 考点」这一说法（哈工大威海国际教育学院招生文、启德教育问答、搜狐汇总文，均非官方，2026-10-27 观察）。这条如果成立，会直接改变「telc 更便宜更灵活所以选 telc」的结论——**这正是我们要占的空位：可得性先于偏好**。上线表述必须写成「telc 官方考点查询当日未返回该城市考点，需向 telc 官方确认」，**不得**把二手说法写成结论。

护理词 `telc b2 pflege nursing germany` Top 5 形态完全不同：考点招生页（uni-halle IDSK、Semmelweis）、中介流程长文（gogermany.ma、language-lab.io）、telc 官网。特征：

- **考点页**给全部本地事实（日期、报名截止、€195 这类本地价、格式、最小开考人数），但只对自家考点成立。
- **中介页**给「B1–B2 视州而定 / B2 全职独立工作 / 部分州 C1」这类分级表，并常把州级差异写成表格结论，不给出可核对的查找方法。
- **空白**：没有一条把「认可见习/执照主管机关（由职业 + 工作地决定）→ 雇主 → 移民机关 → telc 产品」这四个决策主体拆开，并给出可复制的记录表。现有页面已经有这个四主体框架（这是我们的优势），但缺具体可查证的入口示例。

## A.4 建议大纲（H2 级）

### A.4.1 `telc-vs-goethe-for-german-visa` 改写大纲（目标 ≥ 2,200 词）

1. `## 一分钟答案：先找签发机关的原文，再谈品牌`
2. `## 三步定位你的签发机关`（申请地 → 签证类别 → 该机关当前须知文件）
3. `## 已核对的两个真实样例（同一问题，不同机关给出不同清单）`
   - 样例一：德国驻华使领馆中文须知（点名接受歌德 SD1、telc SD1、ÖSD A1 等，并写「其他机构出具的语言证书均不获认可」「通常只接受考试日期最早在一年前的证书」）
   - 样例二：检索中看到的另一个德国使领馆英文页面（家庭团聚清单中把 telc 与 Goethe、ÖSD、TestDaF、ECL 一并列为 ALTE 认证、且「不超过一年」）
   - 写法要求：只写这两个机关、只写原文口径、明确「其他机关需自行核验」
4. `## 可得性是第一个过滤器：你能不能在申请地考 telc`
   - 只用 telc 官方考点查询的当日结果说话
   - 「查不到 ≠ 一定没有」，给出向 telc 官方询问的模板
5. `## 产品对齐表：同一 CEFR 等级不等于同一张证书`
   - 表头：完整产品名 / 级别 / 目标考生 / 结果文件形式 / 是否可单科 / 授权方
   - 内容必须逐项来自考试方官方产品页，不写「谁更难」
6. `## 使领馆文件里那三个容易踩空的字段`（证书全称、考试日期时效、是否需要原件）
7. `## 四类决策各自找谁`（签发机关 / 考试方 / 所选考点 / 你）
8. `## 可复制的核验记录表`（含「停手条件」列）
9. `## 常见错误`（保留现有 5 条，补：把别国使领馆的清单当本国规则；把二手说法的价格区间当报价）
10. `## FAQ`（3–5 条，全部指向「谁决定」而不是「哪个更好」）
11. `## 官方来源`（每条带 `checked` 日期 + 边界说明）

**删除**：`Exam Overview / Eligibility / Fees / Dates / Test Format / Locations / Online / Required Documents / Passing Score / Retake Policy / Prep Path / Best Courses / Practice Test / Career Outcome / Related Exams` 这 15 个模板空节。其中真正需要的 3 个（产品对齐、费用、考点）以「找谁核验」的形式并入第 5、4 节。

**字数下限**：2,200 词。理由：现有 1,374 词中约 60% 是可删模板句，有效信息密度过低；补入两个机关样例 + 可得性节 + 记录表后，2,200 是可达到的下限而非凑数目标。

### A.4.2 `telc-b1-b2-germany-work-nursing` 改写大纲（目标 ≥ 2,000 词）

1. `## 一分钟答案：三个问题先有答案，再谈 telc`
2. `## 四个决策主体与它们各自的边界`（保留现有表格，扩写「不能要什么」）
3. `## 护理：先用官方职业识别工具定位主管机关`
   - 用 Recognition Finder 的输入/输出逻辑讲清楚，不预写任何州或机构名
   - 明确「全国门户帮你找机关，机关决定个案清单」
4. `## 工作与移民是两条独立审查线`（雇主 offer ≠ 执业许可 ≠ 居留许可）
5. `## telc 护理产品的边界：`telc Deutsch B1·B2 Pflege` 是独立产品`
   - 只写产品页可核验的事实（写作+口语两部分、护理职场语言场景）
   - 明确「不能单考某一级」这类规则必须由所选考点当日确认
6. `## 认可见习与知识考试：谁发通知、谁考试、谁出结果`（不写金额、不写时长承诺）
7. `## 权威记录表（五行版）`（保留现有表，补「停手条件」与「重查日期」列）
8. `## 停手清单`
9. `## 下一步`
10. `## 官方来源`

**字数下限**：2,000 词。

## A.5 需要核验的官方来源类型清单

| 类型 | 具体单位（只用检索中实际出现的） | 用途 | 状态 |
| --- | --- | --- | --- |
| 考试方产品页 | telc 官方证书考试目录、`telc Deutsch B1·B2 Pflege` 产品页 | 产品身份、技能构成、交付形式 | 已在页内引用，需在改写时重新核对日期 |
| 考试方考点查询 | telc 官方 examination-centre finder | 可得性（能否在申请地考） | 已在页内引用；**改写时必须新增「当日查询结果的记录方式」** |
| 考试方规则文件 | telc Rules and Regulations PDF | 报名与考点责任划分 | 已在 fees 页引用；护理页可复用 |
| 德国驻华使领馆须知 | 家庭团聚/结婚定居基本德语证明须知（`china.diplo.de` 中文 PDF + 相应英文入口） | 点名接受哪些证书、"一年内"时效、"其他机构不获认可" | 已核验存在（中文 PDF）；英文入口需再次确认 URL |
| 其他德国使领馆清单页 | 检索中见到的另一个使领馆家庭团聚材料页（英文） | 证明「同一问题不同机关口径不同」 | 需核验：确认该页当前仍在线且措辞未变 |
| 职业认可主管机关入口 | `anerkennung-in-deutschland.de`（Recognition procedure 页 + 职业档案页） | 「由职业+工作地决定主管机关」 | 已在页内引用 |
| 联邦技术移民门户 | `make-it-in-germany.com`（Qualified professionals 工作签证页） | 岗位 offer 与执业许可、移民审查分离 | 已在页内引用 |
| 联邦移民局 | BAMF（家庭团聚信息页） | 例外情形的官方入口 | 需核验：只引其信息页，不引具体豁免结论 |
| 主管机关本体 | **不预写名称**。一律写「由 Recognition Finder 就你的职业与工作地查出的主管机关」 | 防止编造州级机构名 | 硬约束 |

**禁止事项**：不得写任何具体考试费用（现有 4 页全部无价格，这是对的，改写后继续保持）；不得写「某州要求 B1/B2/C1」这类未经该州机关原文核实的句子。

## A.6 解封后应放置的内链位置（逐条可执行）

现有入链 2 条（都来自 B1 Hub），另 2 页为 0。解封仍需与内链同批次上线，但**只需补齐缺口，不必重建全部**。

| 目标 telc 页 | 来源页（均为当前可索引页） | 建议锚文本 | 放置位置 | 状态 |
| --- | --- | --- | --- | --- |
| `telc-b1-b2-germany-work-nursing` | `/guides/germany-b1-settlement-citizenship/`（B1 Hub） | 现有锚文本：`telc B1/B2 work and nursing decision boundary` | `:88` 已存在 | ✅ 已有 |
| `telc-b1-b2-germany-work-nursing` | `/guides/goethe-b1-vs-telc-b1/` | `如果你的用途是工作或护理，先看 telc 护理产品的边界` | 产品对比表后的「另一个方向」段 | ➕ 待补（第 2 条） |
| `telc-b1-b2-exam-format-and-preparation` | `/guides/germany-b1-settlement-citizenship/`（B1 Hub） | 现有锚文本：`telc B1 and B2 format baseline` | `:101` 已存在 | ✅ 已有 |
| `telc-b1-b2-exam-format-and-preparation` | `/guides/goethe-b1-vs-telc-b1/` | `telc B1/B2 官方格式与备考基线` | 「如果接收机关已确认 telc 产品」段 | ➕ 待补（第 2 条） |
| `telc-b1-b2-fees-and-test-centers` | `/guides/goethe-b1-fees-and-booking/` | `同一个 B1 目标的 telc 考点与报价核验路径` | 费用页「另一个产品方向」段 | ➕ 待补 |
| `telc-b1-b2-fees-and-test-centers` | `/tools/exam-comparison/`（工具页，可索引） | `telc 考点与本地报价怎么核验` | 工具结果页说明区 | ➕ 待补（最容易的一处） |
| `telc-vs-goethe-for-german-visa` | `/guides/goethe-a1-vs-telc-a1/` | `如果是签证用途而不是 A1 产品比较，用这份路线级对比` | 「Next action」段 | ➕ 待补 |
| `telc-vs-goethe-for-german-visa` | `/guides/germany-b1-settlement-citizenship/` | `telc 与 Goethe 在签证用途上的受理边界` | 页脚 sources 前的延伸阅读 | ➕ 待补 |
| 四页互相 | 保持现有 `supportingGuideSlugs` 与 `nextGuideSlug`，不新增交叉 | — | 避免 4 页互相堆链形成链接环 |

**同时必须做**：把 4 个 slug 加入 `englishPillarSlugs`（`src/data/publication-manifest.ts`），否则改了 `noindex` 也不进 sitemap。注意 `tests/scheme-3-*` 中对 pillar/sitemap 数量有断言，需要同步核对（见 §A.8）。

## A.7 蚕食防护

| 风险 | 现状 | 处置 |
| --- | --- | --- |
| `telc-vs-goethe-for-german-visa`（路线级）vs `goethe-a1-vs-telc-a1`（A1 产品级） | 两页都可能被 `goethe vs telc spouse visa` 命中 | 保持分工：前者**不写任何 A1 具体格式/费用**，只写「谁决定 + 可得性 + 记录表」；后者保持 A1 产品比较。两页互链时锚文本必须显式写「A1 产品比较」/「路线级受理边界」 |
| `telc-b1-b2-exam-format-and-preparation` vs `telc-b1-b2-germany-work-nursing` | 前者是通用 B1/B2 格式，后者是护理/工作路线 | 护理页**不写听力/写作时长、分数权重**，一律指向格式页；格式页**不出现** Pflege 字样以外的职业内容 |
| `telc-b1-b2-fees-and-test-centers` vs `telc-vs-goethe-for-german-visa` | 都涉及「找考点」 | 费用页独占「报价字段表 + 中心对比表」；对比页只写「可得性 = 有没有考点」，不写报价字段 |

## A.8 风险提示（A 节）

1. **解封 ≠ 收录。** 需要同批次：`englishPillarSlugs` + `contentStatus` 升级 + `noindex:false` + 至少 2 条索引页入链。四项缺一，页面仍是孤儿。
2. **测试断言会红。** `tests/scheme-3-publication.test.mjs`（第 45 行断言「exactly 5 Chinese pillars」，英文侧另有 pillar 数量断言）、`tests/scheme-3-release-candidate.test.mjs`、`tests/scheme-3-content-map.test.mjs`、`tests/fan-73-guide-trust.test.js` 都对名单/数量有硬断言，改名或加项时必须同步。这些属于 `src/`/`tests/` 变更，会触发 planning-map 同步契约（见 §B.9 item 3 的准确口径）——本节只是把改动清单备好，**不在本轮执行**。
3. **「中国大陆无 telc 考点」是二手说法。** 页面只能写「官方考点查询当日未返回」，且必须给读者可复制的询问模板。写成断言会造成事实风险，也会被 telc 官方页面反驳。
4. **不得把别国使领馆清单写成通用规则。** 检索中至少看到三种不同口径的材料页（中国、马尼拉、南非/美国方向的清单各有措辞差异），这恰恰是页面的价值点，但引用时必须标注机关名 + 核对日期。
5. **护理页专业风险最高。** 涉及执业许可与认可见习，任何「B2 就够」「某州要 C1」的句子都可能被当作法律意见。现有页面写法（只写「由主管机关决定」）是正确的，改写时不得为了字数把中介页的分级表搬进来。

## A.9 结论与执行动作

**结论：解封，但分两批，且必须先补内容与内链。**

| 批次 | 页面 | 解封前置条件（全部满足才动 `noindex`） |
| --- | --- | --- |
| 第一批 | `telc-b1-b2-germany-work-nursing` | ①≥2,000 词且删除模板空节；②新增 Recognition Finder 操作节；③**已有 1 条**（Hub `:88`），再补 1 条至 2 条；④source-review 复核日期更新 |
| 第一批 | `telc-b1-b2-exam-format-and-preparation` | 现有 1,346 词已是四页中信息最实的（格式/评分/诊断表齐全）；**已有 1 条**（Hub `:101`），补「官方样题获取路径」+ 第 2 条入链即可申请 |
| 第二批 | `telc-vs-goethe-for-german-visa` | ①≥2,200 词；②补两个使领馆样例（均需重新核验在线状态）；③补「可得性」节；④**从 0 建 2 条入链** |
| 第二批 | `telc-b1-b2-fees-and-test-centers` | 现有 1,207 词结构可用；**从 0 建 2 条入链**：`/guides/goethe-b1-fees-and-booking/` + `/tools/exam-comparison/` |

顺序理由（可反驳）：护理页的竞争者是考点与中介（无强官方链），我们的四主体框架是稀缺品；对比页竞争者是成熟备考站的长文，需要内容量才能站住。先拿下低竞争高商业意图的那一半，比四页齐发更稳。

---

# B. 中文「歌德A1考试费用」页

## B.0 现状事实（仓库证据）

| 事实 | 证据 |
| --- | --- |
| 中文层 `src/pages/zh/guides/` 有 **8 个页面文件**，但只有 **5 篇是可索引 pillar**；其余 3 篇是**重定向候选（retained，closed 策略）** | 8 文件遍历 + 终止哨兵（`[done] processed 8/8 files`）：`rg -o "歌德" $f \| wc -l` → 1/0/0/0/0/0/0/0；`rg -n 'title="[^"]*歌德[^"]*"' src/pages/zh/guides/` → 零命中。**集合区分**：`chinesePillarSlugs` 5 条（`publication-manifest.ts:45-51`）；3 篇非 pillar 正是 `guideRedirectCandidates` 里的 3 条 zh 路径（`:84-86`：`goethe-a1-germany-family-reunion`、`goethe-a1-booking-mistakes`、`german-a1-documents-checklist`）→ 被判 `retained`，**在 pillar 检查之前**就返回 closed |
| 中文层**没有费用页** | `ls src/pages/zh/guides/ \| rg -n "fee\|cost\|price"` → 零命中（同目录 8 个已知文件作阳性对照） |
| 英文费用页 `goethe-a1-fees-by-country` 已在版本库中 | `git ls-tree HEAD src/content/guides/ \| rg "goethe-a1-fees-by-country"` 命中 |
| **金额渲染：HEAD 状态无渲染路径（初稿观察成立）；工作区已加入组件与接线，但组件/测试为未跟踪文件、接线未提交** | `git show HEAD:src/layouts/GuideLayout.astro \| rg -n "LocalExamFeeTable"` → 零命中（同命令 `rg -c "."` = 113，证明输出正常）；`git ls-tree HEAD src/components/ \| rg LocalExamFeeTable` → 零命中；`git status --short` → `?? src/components/LocalExamFeeTable.astro`、`M src/layouts/GuideLayout.astro`、`?? tests/m2a-local-fees-centres.test.mjs`。**不写具体修复时刻、不归属任务号**——mtime 非时间证据，未提交即无提交历史可查。详见「证据勘误」§2 |
| 工作区的渲染机制：组件从 claim registry 取 4 条记录 → `CNY 1,400` / `CNY 1,500` / `EUR 155` | `LocalExamFeeTable.astro:12-13` 调 `getLocalFeeSchedule`（scope `goethe-germany` + `goethe-beijing`）；`:17` `${currency} ${Intl.NumberFormat('en-US').format(amount)}`；`GuideLayout.astro:117` 按 slug 渲染 |
| 工作区新增测试**要求**正文不得重复 registry 金额 | `tests/m2a-local-fees-centres.test.mjs:112` `assert.doesNotMatch(feeGuide, /€155\|€124\|¥1,400\|¥1,500\|EUR 155\|EUR 124\|CNY 1,400\|CNY 1,500/, ...)`；`:114` 断言组件从 registry 派生而非硬编码。**该测试随本次修复一起新增（未跟踪），不能用来证明「一直如此设计」** |
| 北京 1,400 / 1,500 两个数字**已存在于 claim registry**，且已标 `usedBy: guide:zh-goethe-a1-test-centers` | `src/data/claim-registry.ts` `claimId: goethe-beijing-a1-2026-fees` v2026-09-09.1，boundary 明确写「Beijing-only, not a China-wide price」 |

> **最终判断（经三次修正）**：初稿观察「`directAnswer` 承诺数字但无渲染路径」在 **HEAD 状态成立**——第二轮复核时我把工作区里新出现的未跟踪组件误认为既有架构，因而错误地自我推翻，现已更正。工作区确已加入「组件 + claim registry + 正文禁写金额断言」这套修复，但**组件与测试未跟踪、接线未提交**，故不写修复时刻、不归属任务号。
>
> 对 B 节的**实际影响不变**：中文费用页的机会就是①把这套机制接到中文层（组件已含 `zh-CN` 分支文案，`ZhGuideLayout` 未导入）；②补英文页没有的中文报名流程与「内/外部学员定义各中心不同」两节。**前置条件不是"组件未提交"这么简单**——含三项同批依赖，见 §B.10（尤其：`directAnswer` 路径的 consumer id 与费用表的 consumer id 不是同一个，前者会先坏）。

## B.1 中文查询词簇

| 层级 | 查询词 | 意图 | 竞争页面类型（SERP 实测形态） | 备注 |
| --- | --- | --- | --- | --- |
| 主关键词 | `歌德A1考试费用` | transactional-adjacent（要一个数） | 歌德语言中心各分中心公告页 / 歌德德国总部中文价目页 | 需工具确认 |
| 簇 1 费用 | `歌德A1考试费用` `歌德A1多少钱` `歌德A1报名费` `歌德证书考试费用` | 同上 | 分中心公告（内/外部学员双价） | 需工具确认 |
| 簇 2 报名 | `歌德A1报名` `歌德A1报名时间` `歌德A1考位` `歌德A1报名流程` | procedural | 微信公众号推文（报名窗口 + 邮件报名规则） | 需工具确认 |
| 簇 3 门槛 | `德国签证A1要求` `德国家庭团聚A1` `歌德A1签证` `A1证书有效期` | informational（合规） | 使领馆须知 PDF + 二手转述 | 需工具确认 |
| 簇 4 主体区分 | `歌德学院和歌德语言中心区别` `北京歌德考试` `XX歌德语言中心` | navigational | 分中心页 | 需工具确认；这是中文层独有意图，英文层没有对应词 |

**搜索量**：全部需工具确认。建议上量前用 GSC 的 `zh-CN` 维度查询 + 工具交叉，不要用英文页的量级折半估算。

## B.2 意图分类结论

- 主意图是 **transactional-adjacent**：用户要一个「现在到底多少钱」的数，然后决定报名与否。
- 但**真实可交付的答案不是数字**，而是「数字由你所在城市的考点决定，且分内部/外部学员两档，两档定义每个中心不同」。中文 SERP 里没有任何一条页面讲这件事——这是主空白。
- 次意图 **procedural**（怎么报上名）：中文 SERP 的证据密度极高且全部来自中心自己的公告（邮件报名、报名开始时间整点开放、提前无效、报满即止、内部学员优先、未收到缴费通知即报名失败、重复多封邮件作废）。这些是**结构性事实**，不随价格变动，是中文页最该吃下的内容。
- **不成立**：informational「德国 A1 要多少分/难不难」——已有中文页承接（`goethe-a1-vs-telc-a1`、`goethe-a1-30-day-study-plan`），不要抢。

## B.3 中文 SERP 形态偏好（2026-10-27 观察）

`歌德A1考试费用` Top 5 形态：

1. **分中心公告页**（`goetheslz.com` 青岛分中心）：一段文字 + 级别/日期/费用罗列，费用写成「外部学员 1500 元 / 内部学员 1400 元」。
2. **歌德德国总部中文价目页**（`goethe.de/ins/de/zh/prf/pre.html`）：德语区欧元价目表（成人 A1 €155 等），附「课程参加者 20% 折扣 / 每人价格（无增值税）」。**注意：这是德国范围的价目，不是中国价目**——中文读者极易误读，这是一个高价值纠偏点。
3. **微信公众号推文**（川外歌德 / 广财歌德）：报名规则长文，含「内部学员 / 外部学员」报名日、报名窗口、邮件模板、出分周期。
4. **导航/招生聚合页**（搜狐汇总文）：把歌德、telc、德福混排，错误率高（把 telc 说成国内无可查考点、给出 170~240 欧的费用区间）。

由此得出中文页的形态偏好：**短句 + 可执行步骤 + 一张「字段表」+ 一张「找谁问」的表**。中文读者对「长表格对比 + 空泛论证」接受度低；对「第一步做什么、第二步做什么」接受度高。这一点与英文页（长表格 + 边界论证）不同，**不能直译**。

## B.4 建议页面结构（H2 级）

页面应为独立中文页（slug 建议 `goethe-a1-exam-fees-china`），不是英文页的翻译。

1. `## 直接答案`（≤ 90 字，先答后界两句式）
   - 句式建议：「歌德 A1 在中国没有全国统一价：费用由你所在城市的歌德语言中心/歌德学院分院在当期公告中公布，通常分『内部学员』与『外部学员』两档；报名前必须打开你所在考点的当期公告核对，本文不复述任何城市的金额作为通用价。」
2. `## 为什么搜到的价格互相矛盾`（三类来源：德国总部欧元价目 / 分中心人民币公告 / 二手汇总文；各自主管范围）
3. `## 三分钟查到你所在城市的当期价格`（编号步骤，含「看哪一行」「哪一列是内部学员」「公告日期在哪」）
4. `## 「内部学员」到底是什么`（关键：**每个中心的定义不同**——报名前 N 个月内上过该中心课程 / 需上传课时证明或缴费截图；不给统一数字，只给「去哪里看该中心定义」）
5. `## 报名不是先到先得，是「窗口 + 邮件 + 名额」`（报名整点开放、提前无效、每人可发邮件封数上限、报满即止、多封作废、未收到缴费通知=未报上）
6. `## 出分与证书时间：用它排签证，不要用它赌签证`（只用「中心公告写明的阅卷工作日数」这一口径，且注明各中心不同；不写「一般几周」）
7. `## 费用之外还要准备什么钱`（用**空白**预算表：报名费 / 交通 / 证件照 / 证书邮寄 / 重考预留；金额列留空，交由读者填）
8. `## 德国总部价目页为什么不能用**（欧元、德国范围、含税口径不同，课程折扣条件不同）
9. `## 和签证材料的关系：费用不决定受理`（A1 证明的受理由签发机关决定；「一年内」时效需核验原文；证书形式需向机关确认）
10. `## 常见错误`（10 条左右，例如：把北京数字用到其他城市、把「内部学员」当成「报过任何歌德课程」、以为报名免费就等于报名成功、用旧公告的金额付款）
11. `## 下一步`（→ 考点核验页 → 报名时间线 → 材料清单）
12. `## 官方来源`（带核对日期 + 边界）

**字数下限**：2,200 中文字（不含表格与来源清单）。理由：中文页要同时吃「费用 + 报名 + 门槛」三个簇而无蚕食，低于此量必然有一簇讲不透。

**必须的 slots**（`ZhGuideLayout` 在索引状态下会硬校验）：`who` / `key-decisions` / `mistakes` / `next-action` / `sources`，缺一构建即抛错。

## B.5 与英文费用页的关系：**不互挂 hreflang（明确建议）**

**建议：不挂。** 三条理由，均可在仓库内验证：

1. **规则上不允许**。项目已有明文规则：不同地区范围的页面不能机械互设 hreflang（`docs/master-package-2026-09-08/VisaLang-Master-Plan.md`：「如果重写后中文变成『中国专属指南』而英文仍是全球概览，需重新判断是否仍为等价页面……不能一边改变页面主题一边机械保留 hreflang」）。
2. **机制上不会自动挂**。`ZhGuideLayout` 只在 `translatedPaths[englishHref] === guideRecord.href` 时才输出 alternates；`src/data/site.ts` 的 `translatedPaths` 目前只有首页、1 个专题页、5 篇指南、5 个工具。新页只要**不登记**进 `translatedPaths`，就不会产生 hreflang。
3. **语义上不该挂**。英文页覆盖「德国 + 北京」两个 scope 并明确「不是全球价目表」；中文页如果做成「中国读者怎么查本地当期价 + 怎么报名」，主题已经偏移到「中国报名流程」，与英文页不是等价页面。

**实现注意**：`ZhGermanyA1Guide` 接口里 `englishHref` 是必填字段。填 `/guides/goethe-a1-fees-by-country/` 即可（不登记 `translatedPaths`），但必须在记录里加注释说明「仅作数据完整性，不参与 hreflang」——否则未来有人手一抖加进 `translatedPaths`，就会造出一对假的等价关系。建议在同批次加一条测试断言：该 slug 不在 `translatedPaths` 的 value 集合中。

## B.6 价格写法要求（**不得编造价格**）

允许与禁止，写清楚到可以直接照做：

| 情形 | 处理 |
| --- | --- |
| 北京 1,400（在读学员）/ 1,500（非在读学员） | **允许**，但只能通过 `claimRef` 引用 `claimId: goethe-beijing-a1-2026-fees` v2026-09-09.1，并原样保留其 boundary（北京单一分院、非全国价、非考位、非最终收费） |
| 其他城市金额 | **禁止出现**。观察到 2026-10-27 检索中青岛（2026-09 场）与广州（2026-02 场）公告 A1 均为「外部 1500 / 内部 1400」，与北京同数——**这是观察，不是规则**，不得据此写「全国统一 1,400/1,500」 |
| 欧元价目（€155 等） | 仅在「德国总部价目页为什么不能用」一节出现，且必须标注「德国范围、欧元、每人价格（无增值税）、课程折扣另有条件」 |
| 价格区间/均价/「大约多少」 | **全部禁止**。这是中文 SERP 竞品最普遍的错，也是我们唯一的差异化点 |
| 汇率换算 | **禁止**（英文页已有 `## No currency conversion` 政策，中文页沿用） |
| 重考费 | **禁止估算**，只写「需按所选考点当期全科/单科规则与新报价重新核对」 |

**主体区分硬约束（比"用对品牌词"更严，属事实准确性）**：中文语境下至少有两个层级的主体，**不得混称**：

- **歌德学院（Goethe-Institut，含北京分院）**——我们引用的 `goethe.de/ins/cn/zh/spr/prf/anm.html` 是其中国站考试报名页；
- **歌德语言中心（Goethe-Sprachlernzentrum）**——SERP 抽样中的页面署名为「青岛大学歌德语言中心」「四川外国语大学歌德语言中心」「广东财经大学歌德语言中心」，是**另一类署名主体**。

禁止写法：①「各地歌德语言中心均可报名」这类跨主体断言；②把某中心的内部学员学费标准写成"歌德学院的价格"；③把两个主体当作隶属关系陈述（合作关系以其页面自述为准，我们**不断言**）；④**「歌德学院全国统一价」这类范围外推**——北京记录的作用域在注册表里就是 `jurisdiction: 'Goethe-Institut Beijing 2026 registration-page scope only'`（claim 级 `:487`、`scope.jurisdiction` `:491`），注册表自身已把范围限死在"北京报名页"。
要求写法：每一处价格/报名事实都标明**它来自哪一个主体的哪一个页面**，并用该页面自己的署名。这一条直接对应 §B.7 的「需核验」项。

**Direct answer 的实现前提**：`directAnswer` 机制**已存在**——`GuideLayout.astro:47` 的 `directAnswerIsCurrent = Boolean(directAnswer) && validateClaimSet(claimRefs, {...})` 就是现成的守卫，新页照做即可，不是新增要求。

**必做的配套不变量（双向，不能只写单向）**：`LocalExamFeeTable.astro:15-16` 是 **all-or-nothing 门**——

```
const verified = schedules.every((schedule) => schedule.status === 'verified');
const records  = verified ? schedules.flatMap(...) : [];   // 任一 scope 掉出 verified → 表格静默清空
```

任一 scope 掉出 `verified`（版本过期 / 复核日过期 / consumer 不在 `usedBy`），整表静默变 fallback，而 `directAnswer` 仍写「the dated figures appear below」——读者看到承诺、看不到数字、且不报错。

**断言必须是双向不变量，不能写成「必须 ≥1 条 record」**：

> 若 `directAnswer` 匹配 `/below|listed below|see the table/i`（或中文「见下表」）⇒ 被引用 scope 必须全部 `verified`；
> 若任一 scope 非 `verified` ⇒ `directAnswer` 不得匹配该模式。

原因：记录**合法过期时组件本来就该降级为 pending（fail-closed）**，此时「渲染 0 条 record」是**正确行为**。单向断言会在正确降级的那一刻变红，等于逼团队去强推 `status`。它要锁的是「文案承诺与数据状态不失配」，不是「状态必须永远 verified」。这是前瞻性防护，不是当前缺陷——但它正是初稿那条观察在修复后仍可能复现的路径。

## B.7 需要核验的官方来源类型清单

| 类型 | 具体入口（检索中实际出现） | 用途 | 状态 |
| --- | --- | --- | --- |
| 歌德学院中国官方考试入口 | `https://www.goethe.de/ins/cn/zh/spr/prf/anm.html` | 北京分院考试时间与报名信息、当期价目 | 已在仓库多处引用；改写时需重新确认页面仍在且结构未变 |
| 歌德德国总部中文价目页 | `https://www.goethe.de/ins/de/zh/prf/pre.html` | 欧元价目（仅德国范围）、课程折扣条件 | 已核验存在（中文版实见）；作为「不能用」的反例引用 |
| 歌德语言中心（分中心）网络 | `https://goetheslz.com/`（青岛/重庆/成都/广州等分中心页面） | 各城市当期费用、内部/外部学员定义、报名窗口、出分周期 | **需核验 + 硬约束见下**：SERP 抽样中这些页面的署名主体是「XX大学歌德语言中心」（青岛大学、四川外国语大学、广东财经大学），与 `goethe.de/ins/cn` 的**歌德学院北京**不是同一署名主体；两者合作关系须以中心页面自述为准，**不得由我们断言隶属关系** |
| 德国驻华使领馆须知 | `https://china.diplo.de/resource/blob/1341658/.../pdf-info-natvisum-dutschkenntnisse-ehegattennachzug-data.pdf` | 接受证书清单、"其他机构出具的语言证书均不获认可"、"通常只接受考试日期最早在一年前的证书" | 已核验存在（中文 PDF 原文见检索结果）；**"一年内"必须引原文，不得扩写成「所有情形」** |
| 德国驻华使领馆签证入口页 | `https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606` | 材料核验入口 | 已在仓库多处引用 |
| BAMF | 家庭团聚信息页 | 例外情形官方入口 | 已在仓库引用；不引具体豁免结论 |
| 报名公告的原文（微信/中心站） | 各中心公众号推文 | 报名流程事实（窗口、邮件、名额、出分工作日） | **需核验**：微信推文不可作为长期来源，必须落到该中心官网可访问的等价页面；拿不到等价页面时，只写「报名规则以所选中心当期公告为准」+ 询问模板 |

**禁止**：不得写出任何具体中心的全称作为「推荐考点」；不得写「XX 城市目前有考位」。

## B.8 内链落点

| 方向 | 页面 | 锚文本建议 |
| --- | --- | --- |
| 出链（新页 →） | `/zh/guides/goethe-a1-test-centers/` | `核验这个考点是不是官方/授权考点` |
| 出链 | `/zh/guides/german-a1-exam-booking-timeline/` | `把出分和取证节点排进报名时间线` |
| 出链 | `/zh/guides/german-family-reunion-language-requirement/` | `先确认你的路线是否需要 A1` |
| 出链 | `/zh/tools/checklist-generator/` | `保存你的核验清单` |
| 入链（→ 新页） | `/zh/guides/goethe-a1-test-centers/`（已索引） | `歌德 A1 费用怎么查到你所在城市的当期价` |
| 入链 | `/zh/guides/goethe-a1-vs-telc-a1/`（已索引） | `如果已经确定考歌德，直接看费用与报名` |
| 入链 | `/zh/germany-family-reunion-a1/`（专题页，已索引） | `歌德 A1 的费用与报名窗口` |
| 入链 | `/zh/guides/goethe-a1-30-day-study-plan/`（已索引） | `考位与费用确定后再排 30 天计划` |

另建议：`/zh/guides/goethe-a1-test-centers/` 现有「北京费用核验路径」一节目前只讲方法、不给数字，正好由新页承接「方法 → 可引用数字 + 报名流程」，形成 pillar-spoke 而非重复。

## B.9 风险提示（B 节）

1. **术语迁移是高风险改动**。把 7 篇现有中文页里的 `Goethe` 改成「歌德」会触及标题、正文、`description`、`alt`、锚文本，且「歌德学院 / 歌德语言中心」是两个不同主体。建议**只在新页与新建锚文本里用「歌德」**，现有页保留 `Goethe`（首次出现时可写「歌德学院（Goethe-Institut）」），避免一次性大改引发翻译复核返工。
2. **中文页天然有「中国限定」属性**。所有涉及使领馆的表述必须锚定「负责你申请地的德国驻华使领馆」，不得写成「德国要求 A1」这种全球口吻。现有仓库已有一条 claim（`china-family-reunion-a1-certificate-recency-context`，jurisdiction: China application locations only）可用。
3. **索引门槛是硬的**。新页要进 sitemap 必须：加入 `chinesePillarSlugs`（**5 → 6**）+ `contentStatus ∈ {complete-route, core-route}` + `sourceReviewStatus: reviewed` + `noindex: false` + 提供 5 个必需 slot。

   **两个数字不是同一集合，别混用**：中文层有 **8 个页面文件**，其中只有 **5 篇是 pillar**（`publication-manifest.ts:45-51`）；另外 3 篇（`goethe-a1-germany-family-reunion`、`goethe-a1-booking-mistakes`、`german-a1-documents-checklist`）在 `guideRedirectCandidates:84-86` 里，被判 `retained` → closed，**且该判定发生在 pillar 检查之前**。所以新增费用页是「**第 6 个 pillar**」，不是「第 9 个中文页」；`5→6` 只改 pillar 名单，那 3 篇不参与。

   **同时** `tests/scheme-3-publication.test.mjs:45`、`tests/scheme-3-release-candidate.test.mjs:62`、`tests/fan-73-guide-trust.test.js` 都断言「恰好 5 个中文 pillar」，需同步改成 6；`tests/scheme-3-content-map.test.mjs` 要求每个 pillar 在内容映射里有条目。

   **治理口径（准确版，勿简化成"受阻"）**：`src/` 并非不可写，而是任何 `src/` 改动都要走 planning-map 同步契约——按 `AGENTS.md:47` 需新增 sync ID、更新 `docs/planning-map/sync.json`、把 sync ID 追加进 `history.json`、对每个冻结候选路径分类、记录 watched-scope digest 与当前/下一任务状态，并在 `aligned` / `approved-deviation` / `unresolved` 中择一（`approved-deviation` 需可定位的 Owner 决定；`unresolved` 才阻塞完成与发布）。`tests/planning-map-governance.test.mjs` 的 watch roots **刻意覆盖全部 `src/` 与 `public/`**，所以内容型实现无法"悄悄绕过"。→ 结论：**预留流程成本，而不是等"解禁"**。
4. **费用页不要再走回头路**。HEAD 状态该页只有 `directAnswer`、没有渲染路径（初稿观察成立）；工作区已有修复（未跟踪组件 + 未提交接线）。中文页应复用「组件 + claim registry」，**不要**手写金额，也不要照抄英文页 `directAnswer` 的「数字见下文」措辞——除非同时加上 §B.6 的配套断言。接线步骤见 §B.10。
5. **组件是未跟踪文件，且 `dist` 可能已引用它**。`git status` 显示 `?? src/components/LocalExamFeeTable.astro`、`?? tests/m2a-local-fees-centres.test.mjs`、`M src/layouts/GuideLayout.astro`。未提交意味着这批改动**可能在下一次 `checkout` / `reset` 中消失**，而构建产物已引用组件——若此时有人构建并部署，线上与仓库会出现同一页面的两种行为。**在这批改动提交前，不要以当前工作区构建发布。**
6. **公众号来源不可长期引用**。中文 SERP 里最有价值的事实（报名窗口、邮件规则）大量只存在于微信推文。页面必须把「规则会变」写进正文，而不是把某次推文当作规则本体。

## B.10 组件接线：拆成三层，不要写成「接一根线」

先说结论：**今天照"接一根线"接上去，表格能渲染**——但这属于**借用英文页身份**，且 `directAnswer` 会静默失效。这两件事必须一起处理，所以本节的依赖不是一项，是三项。

### 证据：现状为什么「能渲染」但不对

`isAuthorisedConsumer` 的判据是「**`usedBy` 含该 consumerId** 且 **claim locale 为 `multi-lingual` 或等于消费者 locale**」（`claim-registry.ts:1016-1021`）。三处实测：

```
$ rg -n "consumerId" src/components/LocalExamFeeTable.astro          # 阳性对照：3 命中
10:const consumerId = 'guide:goethe-a1-fees-by-country';              ← 硬编码，不接受 prop

$ rg -n "usedBy:" src/data/claim-registry.ts | rg "goethe-(germany|beijing)"
480:  usedBy: ['fee-schedule:goethe-germany', 'guide:goethe-a1-fees-by-country', 'guide:goethe-a1-test-centers'],
511:  usedBy: ['fee-schedule:goethe-beijing', 'guide:goethe-a1-fees-by-country', 'guide:goethe-a1-test-centers', 'guide:zh-goethe-a1-test-centers'],

$ sed -n '455,515p' src/data/claim-registry.ts | rg -n "locale:"
5:      locale: 'multi-lingual',      ← 德国 claim
36:      locale: 'multi-lingual',      ← 北京 claim
```

→ 因为组件把 consumerId **写死成英文页的 id**，而该 id 在**两条** claim 的 `usedBy` 里都有、且两条 `scope.locale` 都是 `multi-lingual`，所以中文页渲染时**两个 scope 都会判 verified**，`every()` 为真，表格正常出数。

**但这是"借用身份"**：注册表里**看不到**中文页对这两条 claim 的依赖。后果不是报错，而是——将来英文费用页被改名/退役，中文页会**静默失去授权**，且没人能从 `usedBy` 里看出原因。

### 真正的两处坑（与"表格变空白"的说法不同）

| 坑 | 机制 | 现状 | 何时触发 |
| --- | --- | --- | --- |
| **T1 `directAnswer` 先坏，且坏成"错误责任方"** | 中文 direct answer 走 `resolveZhGuideDirectAnswer`，其 consumerId 是 `` `guide:zh-${guide.slug}` ``（`zh-germany-a1.ts:261`），**不在任何一条费用 claim 的 `usedBy` 里** → 校验失败 → 回退到硬编码文案 | 未接就没有 directAnswer；一接就会出现「表格有数、direct answer 却给不出结论」 | 只要给中文页写 `directAnswer` + `claimRefs` 就触发 |
| **T2 参数化后才断表** | 若为修正归属把 `consumerId` 改为 prop（这是**正确的修法**），却忘了给**两条** claim 的 `usedBy` 各加中文 id → 德国 scope 判非 verified → `every()` 假 → **整表（含北京的合法金额）一起变 pending** | 尚未发生 | 只做「参数化」不做「注册」时触发 |

#### T1 比"少一个答案"严重：回退文案把读者指向错误的责任方

```
zh-germany-a1.ts:252  zhDirectAnswerUnavailable =
  '本页不会依据过期、缺失或冲突的官方事实给出确定性结论；请先向负责你申请地的德国使领馆或主管机关核验。'
```
这句是**为签证/使领馆语境写的通用句**。对"歌德 A1 费用"页，费用的责任方是**所选考点**，不是使领馆或主管机关。而表格此时**同时正常显示北京金额**（借用英文 id 通过校验）→ 读者会看到「上面让你去问使领馆、下面给出 1,400/1,500」这种自相矛盾的组合。

**因此：费用页不得以 T1 状态上线**——不是"先上线、只是少个答案"。

#### 三条分支（决定了"要不要写 directAnswer"）

`resolveZhGuideDirectAnswer`（`zh-germany-a1.ts:254-265`）的实际行为：

| 写法 | 渲染结果 | 评价 |
| --- | --- | --- |
| 不写 `directAnswer` | 渲染 `description`（`if (!guide.directAnswer) return guide.description;`） | 无答案，但**不会**出现错误责任方文案 |
| 写 `directAnswer` + `claimRefs` 未把 `` `guide:zh-<slug>` `` 注册进 `usedBy` | 回退 `zhDirectAnswerUnavailable`（指向使领馆） | ❌ **T1：错误责任方 + 表格有数** |
| 写 `directAnswer` + `claimRefs: []`（空数组想绕过） | 同样回退：`claim-registry.ts:1101` `if (claimRefs.length === 0) return { valid: false, reason: 'missing_refs' };` | ❌ **无豁免路径** |

> 结论：费用页要么（a）把中文 consumer id 注册进**两条** claim 的 `usedBy` 后再写 `directAnswer`；要么（b）此阶段**不写 `directAnswer`**，让页面渲染 `description`。**不要**写一个校验不过的 `directAnswer`。

> 换句话说：**"接一根线就会让全表 pending" 在当前代码上不成立**（consumerId 硬编码绕过了 usedBy 检查）；真正的顺序陷阱是「先参数化、后注册」——这两步必须同批。

### 三层拆分与处置

| 层 | 内容 | 真实依赖 | 处置 |
| --- | --- | --- | --- |
| **a. 关键词与结构决策** | slug / title / 词簇（`歌德A1考试费用`、`歌德A1报名`、`德国签证A1要求`）、与 `goethe-a1-test-centers` 的分工与互链 | **无代码依赖** | **文案与结构现在就定稿**（本文档 §B.1–B.4、§B.8 即 a 层产出）。注意 a 层只到"文案定稿"为止：**渲染**依赖 b 层的 claim 注册，否则按上表三分支会落到 `description` 或错误文案 |
| **b. 金额渲染** | 组件接进中文页 | ①组件那批改动被接受并提交；②`consumerId` 改为 prop；③**两条** claim 的 `usedBy` 各加中文 consumer id（如 `guide:zh-goethe-a1-exam-fees-china`）；④若写 `directAnswer` + `claimRefs`，同一 id 也必须进 `usedBy` | **b-②③④ 必须同批**，缺 ③ 或 ④ 分别触发 T2 / T1。未同批前不要接 |

> **b 层当前状态：不可开工。** ①尚未满足——组件与测试仍是未跟踪文件、接线未提交，且本轮冻结期间不做任何 git 操作（team-lead 已确认）。**不要按"已经改完了"排期**；b 层的开工信号是「那批改动被批准提交」。a 层与 c 层不受此限。
| **c. 内容侧事实** | 内/外部学员定义各中心不同、报名窗口机制、出分与证书节点 | 无 claim 依赖 | 可写；落盘到 `src/` 会触发 planning-map 同步契约（见 §B.9 item 3） |

### 范围提醒：中文层目前只被预授权了「北京」一个费用 scope

`guide:zh-goethe-a1-test-centers` **只出现在北京 claim 的 `usedBy`（`:511`），不在德国 claim（`:480`）**。这说明：

- 注册表的设计意图是「中文层只看国内考点价」，与中文用户的实际关注一致；
- 若照现状"借用英文 id"接上去，中文页会**连带显示德国欧元价**（`EUR 155` 等）——这既是**范围外推**，也会误导读者把它当国内价（见 §B.6 主体区分硬约束第 2、4 条）。
- 因此 b 层参数化时有一个**产品决策要同时定**：中文页是否只显示北京 scope？若只显示北京，组件需要再加一个 `scopeIds` prop（或页面级只取 `goethe-beijing`），否则 `schedules` 数组里仍会带上德国。

### 不需要改的东西（避免扩大改动面）

- **不要**去改 claim 的 `scope.locale`：两条都是 `multi-lingual`，locale 门本来就是通的。
- **不要**手写金额或另做一张价格表：组件自带 `verified` 闸门，手写拿不到这个保护。

### 建议的护栏测试（4 条，按性价比排序）

**不要**用正则扫组件源码去断言 `consumerId`（组件一重构就失效）。用声明式 + 直接调 API：

| # | 断言 | 拦住什么 | 成本 |
| --- | --- | --- | --- |
| 1 | **声明式清单**：在组件旁维护一份 `{consumerId, scopeId}` 声明（单一来源）；测试遍历它，逐个调 `getLocalFeeSchedule({...})` 并断言 `status === 'verified'` | 把运行态变成构建期断言，T2（参数化后漏注册）当场红 | 低 |
| 2 | 对每个 `consumerId` 断言它**出现在**对应 claim 的 `usedBy` 里（失败时报"缺白名单"而非只报 pending） | 定位更准，避免把"没授权"误读成"记录过期" | 低 |
| 3 | **全中文 pillar 扫 `directAnswer`**：遍历 `chinesePillarSlugs`，对每篇调 `resolveZhGuideDirectAnswer`，断言返回值 **≠** `zhDirectAnswerUnavailable` | 一次拦住整类问题——"某中文页以为在显示答案，其实显示的是通用回退句"，含将来新增页；**也直接拦住 T1** | 低 |
| 4 | **双向不变量**（§B.6 那条）：`directAnswer` 含 `below`/「见下表」⇔ 被引用 scope 全部 `verified` | 防"文案承诺 vs 数据状态"失配 | 中 |

> 第 3 条最值得先做：它不依赖本项目的组件改造，且能覆盖**现有 5 篇**中文 pillar。
>
> **但它今天的实际效力很有限，别夸大**：5 篇 pillar 中只有 1 篇声明了 `directAnswer`（`german-family-reunion-language-requirement`，`zh-germany-a1.ts:123`），其余 4 篇走 `return guide.description`，**根本不会命中回退句**。所以这条断言今天**只在 1 篇上真正生效**，几乎恒绿。它的真正价值在**新增页**——也就是本节的费用页。
>
> **现状核查（取证，非推测）**：那唯一 1 篇**已正确注册**——其引用 claim `germany-family-reunion-a1-china-mission-context` 的 `usedBy` 就是 `['guide:zh-german-family-reunion-language-requirement']`（`claim-registry.ts:338`）。所以**今天没有破损**，这条测试是**防回归**，不是回修任务；不要派人去改现有页面。
>
> 同时说明一个既有约定：**每个想显示 direct answer 的中文页，都把自己的 `guide:zh-<slug>` 注册进所引 claim 的 `usedBy`**。费用页必须沿用该约定，且若要显示两个 scope，就得注册进**两条** claim。

## B.11 结论

**新建 1 篇中文费用/报名页，独立于英文费用页，且不与英文页互挂 hreflang。** 价值不在「翻译价格」，而在「教会读者在 3 分钟内查到本地当期价 + 讲清内部/外部学员定义差异 + 讲清报名窗口机制」——这三件事目前中文 SERP 无人系统讲。

---

# C. Canada TEF/TCF 决策

## C.0 现状事实（仓库证据）

| 页面 | 正文字数 | contentStatus | noindex | 收录 | 站内入链 |
| --- | ---: | --- | --- | --- | --- |
| `tef-canada-immigration` | **579** | `verification-pending` | `true` | 否 | 1 条（来自 `tcf-canada-vs-tef` 的 `supportingGuideSlugs`，也是 noindex 页） |
| `tcf-canada-vs-tef` | **688** | `verification-pending` | `true` | 否 | 1 条（来自 `tef-canada-immigration` 的 `nextGuideSlug`，源页同样 noindex） |

补充事实（源码级可复现，不依赖 dist）：六页 `noindex: true` 已复核；`contentStatus: verification-pending` 意味着即使把 `noindex` 改成 `false`，`getEnglishGuidePublicationPolicy()` 仍返回 `pending`（因为 `mature` 要求 `reviewed` + `complete-route|core-route`）。所以「解封」不是一个开关，而是内容状态升级。

复核命令与输出（**6 文件遍历 + 终止哨兵 + 阳性对照**）：

```
$ T=(src/content/guides/telc-*.md src/content/guides/tef-canada-immigration.md src/content/guides/tcf-canada-vs-tef.md)
$ EXP=${#T[@]}; N=0; echo "expected=$EXP"
expected=6
$ for f in $T; do
    printf "%-56s noindex=%s contentStatus=%s\n" "${f:t}" \
      "$(rg -m1 -o '^noindex: *[a-z]+' "$f" | sed 's/noindex: *//')" \
      "$(rg -m1 -o '^contentStatus: *"[^"]*"' "$f" | sed 's/contentStatus: *//')"
    N=$((N+1)); done
telc-b1-b2-exam-format-and-preparation.md    noindex=true contentStatus="starter-overview"
telc-b1-b2-fees-and-test-centers.md          noindex=true contentStatus="starter-overview"
telc-b1-b2-germany-work-nursing.md           noindex=true contentStatus="starter-overview"
telc-vs-goethe-for-german-visa.md            noindex=true contentStatus="starter-overview"
tef-canada-immigration.md                    noindex=true contentStatus="verification-pending"
tcf-canada-vs-tef.md                         noindex=true contentStatus="verification-pending"
$ echo "[done] processed ${N}/${EXP} files"
[done] processed 6/6 files
[control OK] positive
（哨兵 6/6 + 对照通过 → 输出未被截断）

$ rg -n "telc|tef-canada|tcf-canada" src/data/publication-manifest.ts
29:  'goethe-a1-vs-telc-a1',      ← 是 Goethe vs telc 对比页，不是 telc 产品页
38:  'goethe-b1-vs-telc-b1',
47:  'goethe-a1-vs-telc-a1',      ← chinesePillarSlugs
57:  'germany-telc',              ← noindexCategorySlugs（关掉的分类）
```

> 「收录 = 否」一列基于 13:19 的 `dist/sitemap-0.xml` 快照（dist 现已被移除，需重建复核）；但上表的源码级证据独立成立——`noindex: true` + 不在 pillar 名单 → 策略函数必然返回 `pending`，与是否构建无关。

两者都不在 `englishPillarSlugs` 中；`/about/` 页面明写「Research pages not listed in the Guide Library: TestDaF, telc work/nursing, UK, Canada, Italy, Spain, Portugal, Netherlands, Finland, and France.」——即产品定位上 Canada 目前就是「研究页」而非「路线」。

## C.1 主关键词与变体（供决策参考，非上线计划）

| 角色 | 关键词 | 意图 | 竞争页面类型 | 备注 |
| --- | --- | --- | --- | --- |
| 主关键词候选 | `tef canada vs tcf canada express entry` | commercial investigation | 备考平台 + 移民顾问 | 需工具确认 |
| 变体 | `which french test is easier tef or tcf canada` | commercial investigation | 备考平台 | 需工具确认 |
| 变体 | `express entry french bonus points nclc 7` | informational | 移民顾问长文 + 数据站 | 需工具确认 |
| 变体 | `french language draw crs cutoff 2026` | informational（时效性极强） | 数据站（每日更新） | 需工具确认 |
| 变体 | `tef canada score to nclc conversion` | informational | 备考平台（带计算器） | 需工具确认 |
| 变体 | `加拿大 法语 加分 TEF TCF` | informational | 中文移民中介 | 需工具确认 |

## C.2 SERP 形态观察（2026-10-27）

这是三个缺口里竞争最激烈的一节。Top 5 构成：备考平台（tefcanadapractice.com、tcf-fca.ca、amigrade.com）、移民顾问（topnation.ca、halaniimmigration.com、gofarglobal.com）、数据站（frenchforpr.com）。

共同形态（即进入门槛）：

1. **NCLC 7 分项对照表**（TEF Canada 四项分数段 / TCF Canada 四项分数段），并强调「必须用 Équivalence ancien score 列，不能用 /699」。
2. **CRS 加分规则**（25 分 / 50 分两个档，条件写成「英语 CLB 4 或以下 / CLB 5 及以上」）。
3. **每次抽签的实时数据**（轮次号、ITAs 数、CRS 分数线，甚至「每 5 分钟刷新 IRCC 轮次表」）。
4. **工具**（分数换算计算器、CRS 计算器）。
5. **格式/难度对比**（题量、时长、口语形式、写作任务数）。

同时观察到两个值得注意的**信任风险**（可作为我们不跟进的理由）：

- 有结果页域名长得像官方（例如 `ircc.com`，而官方是 `canada.ca`）；也有页面把「NCLC 7 ≈ B2」等换算混着讲。
- 不同页面给出的 2026 年法语类别分数线**互相冲突**（同一检索返回里出现 382–435、393–419、379–410 三种区间）。这说明该赛道的数据保鲜周期以天计。

## C.3 决策依据（三个维度）

**维度一：内容深度差距**
现有 579 / 688 词，且**完全不含**NCLC 换算表、CRS 加分规则、抽签数据、格式差异的量化。要达到 SERP 门槛需补 4 张有源表格 + 1 个可交互工具口径，估计 2,500–3,000 词。这不是「补两段」的量级，而是重写。

**维度二：竞争强度**
Top 5 全部是**专营**该主题的站点，且其中至少 3 个提供计算器/每日更新数据。我们的模型（只写可核验的边界 + 拒绝发布会过期的数字）在这个赛道**结构性劣势**：读者来这里是为了拿「我够不够分」，而我们不发布分数线。

**维度三：与德国主线偏离度**
`/about/` 已把 Canada 列为「研究页」（"Research pages not listed in the Guide Library"）。中文层工具/指南全部围绕德国 A1（8 篇逐步遍历已核，`8/8`）。**本维度不依赖任何计数结论**——即不看 41/24 这类快照数字，结论也成立：Canada 在站内没有任何可索引的父级 hub。Canada 的实际挂载点只有两类（`rg` 复核）：

- `src/data/guide-taxonomy.ts:43`：一个 `canada` 分类条目，但 `noindex: true`；
- `src/data/app-data.ts:51-52`：TEF Canada / TCF Canada 两个 `referenceExams` 条目，指向**外部**官方站点（`/exams/` 页把它们渲染成「Reference only」外部卡片，不链站内指南）；
- 两篇指南互相引用（`tcf` 的 `supportingGuideSlugs` → `tef`；`tef` 的 `nextGuideSlug` → `tcf`），除此之外**全站零入链**。复核（`rg` + 阳性对照）：

```
$ rg -q "telc-b1-b2-germany-work-nursing" src/pages/germany-b1-settlement-citizenship.astro   # 阳性对照
[control OK]
$ rg -n "tef-canada-immigration|tcf-canada-vs-tef" src/content/ src/pages/ \
    | rg -v "src/content/guides/(tef-canada-immigration|tcf-canada-vs-tef)\.md"
零命中（除两页自身外）
```
模式覆盖面：两个完整 slug（含 `tef-` 与 `tcf-` 两条独立分支），扫描 `src/content/` 与 `src/pages/` 全量；slug 唯一，不存在别名写法。

给 Canada 2 篇（甚至 1 篇）做深度投入，收益不落在任何现有 pillar 的内链网络上——它没有可回链的父级 hub。

**附带维度：时效性维护成本**
法语抽签分数线、IRCC 类别清单、2026–2028 Levels Plan 目标都属于高频变动项。本项目对「时效性来源」的处理是「标 checked 日期 + 不给预测」，这与「每日更新追踪页」的产品形态冲突。

## C.4 明确推荐：**合并为单页 + 维持 noindex（阶段性）**

**推荐：合并（2 → 1），且合并后仍保持 `noindex`，不进入 sitemap。** 明确不建议「现在解封」，也不建议「维持两页现状」。

理由（按决策权重排序）：

1. **两页现状是最差选项**：579 与 688 词的两篇页面目标意图高度重叠（都是「Express Entry 法语测试」），一旦未来有人解开 `noindex`，会形成同站自相竞争；而当前它们互相链接、彼此稀释，对一个非主线主题占用了两个 URL 的名额。
2. **合并能立刻降低维护面**：一页承载「先查 IRCC 要求 → 再选题」的完整链条，符合站点「先要求后产品」的统一叙事。`tef-canada-immigration` 的「programme-first requirement check」框架本身是对的，`tcf-canada-vs-tef` 的产品对比部分作为其下半章即可。
3. **不解封是诚实的**：站点在该赛道既没有 NCLC 表也没有抽签数据，解封后大概率是「排名低 + 停留差」，还有把过期分数线留在页面上的风险。保持 noindex 可以让它作为「读者被其他渠道送到时的兜底页」继续存在，不承担排名任务。
4. **保留再评估触发条件**（关键，避免永久搁置）：满足以下**三条全部**时再考虑解封 ——
   - ① 页面补入 IRCC 官方 NCLC 换算表（引用当前 IRCC 页面 + checked 日期），且不含任何「哪个月分数线多少」类内容；
   - ② 与德国主线建立至少 2 条真实内链关系（例如 `/routes/` 或 `/exams/` 上有明确的「非德国路线」入口），使该页不再是孤岛；
   - ③ GSC 上能观测到该 URL 的**真实外链或品牌搜索需求**（目前无法验证，需工具确认）。

**执行动作（合并方案）**

| 步骤 | 动作 |
| --- | --- |
| 1 | 保留 `tef-canada-immigration` 作为承接 URL（requirement-first 框架更强），把 `tcf-canada-vs-tef` 的「四决策分离表 + 产品对比 + 比较记录」并入其第 3–5 节 |
| 2 | `tcf-canada-vs-tef` 置入 `guideRedirectCandidates`（现有机制：该表是「历史候选，从不作为活动重定向指令」，符合项目治理口径），**不要**写入 `guideRedirects`（当前为空，属活动重定向） |
| 3 | 合并后页面 `contentStatus` 保持 `verification-pending`、`noindex: true`，**不进 sitemap** |
| 4 | 合并后字数目标 1,800–2,200 词（重写而非拼接）：IRCC 要求记录表 + NCLC 边界说明（只写「IRCC 有分项换算表，必须用官方表，不在此复述数字」）+ 中心核验 + 停手条件 |
| 5 | 若坚持做深度版，必须先解决「谁来维护换算表与抽签数据」的责任人问题；无责任人则不要解封 |

## C.5 需要核验的官方来源类型清单

| 类型 | 具体入口 | 用途 | 状态 |
| --- | --- | --- | --- |
| 加拿大移民部语言要求 | IRCC Express Entry language-test results 页（`canada.ca` 域，仓库已有 URL） | 接受哪些考试、分项换算表入口、有效期 | 已在页内引用；改版时需重新核对 |
| 加拿大移民部类别选择 | IRCC category-based selection 页 | 法语类别是否存在、当前类别清单 | **需核验**：类别清单按年调整，必须以 IRCC 当前页为准，不引用二手 |
| TEF Canada 产品方 | Le français des affaires / CCI Paris Île-de-France 官方页 | 产品身份、四个必考能力、报名路径 | 已在页内引用 |
| TCF Canada 产品方 | France Éducation international 官方页 | 产品身份、四个必考项、结果文件 | 已在页内引用 |
| 官方考点 | 上述两个产品方的官方中心/报名路径 | 落地可得性 | 已在页内引用 |
| **禁止类型** | 任何第三方 NCLC 换算表、任何「CRS 分数线追踪」、任何分数计算器 | — | 不引用（会引入过期数据） |

## C.6 内链落点

| 场景 | 建议 |
| --- | --- |
| 合并后的页面 | 只保留 1 条出链到 `/tools/exam-comparison/`（如需），不外链到德国 pillar，避免语义污染 |
| 站内入链 | **不新增**。合并 + noindex 状态下不应从德国主线页面把权重导给一个不收录页面 |
| 若未来解封 | 入口应放在 `/routes/`（路线选择）或 `/exams/`（考试目录），而不是德国 A1/B1 pillar |

## C.7 风险提示（C 节）

1. **合并必须走项目既有机制**：`guideRedirectCandidates` 已明确标注「Historical candidates, never an active redirect instruction」，`guideRedirects` 当前为空。把 `tcf-canada-vs-tef` 放进前者是**声明意图**，不产生 301；若要真重定向，须另走迁移评审（涉及 canonical / sitemap / 内链 / hreflang 一致性）。本轮不建议做活动重定向。
2. **不要把「合并」误解为「删内容」**。`tef-canada-immigration` 现有的四决策表与「不要用 unofficial table 换算」的警告是全站少有的好内容，必须保留。
3. **本节的「不解封」判断基于当前内容深度与竞争格局**，不是对 Canada 主题的长期否定。若未来站点要扩到多国路线，Canada 需要一个真正的 hub（含 IRCC 入口 + 省份差异边界），那时应重启评估，而不是把这篇薄页直接解封。
4. **数据污染风险**：检索中已出现「看起来像官方域名」的第三方站（`ircc.com` 非 `canada.ca`）。改写时若引用任何 IRCC 内容，必须核对域名，并在来源清单里写明 `canada.ca`。

## C.8 结论

**合并为单页（保留 `tef-canada-immigration` 作为承接 URL，`tcf-canada-vs-tef` 置为历史候选），并维持 `noindex`，不进 sitemap。** 不推荐现在解封；也不推荐维持两页现状。

---

# 附：三节一句话结论

| 缺口 | 结论 |
| --- | --- |
| A. telc 类目 | **解封**——分两批：先 `telc-b1-b2-germany-work-nursing` 与 `telc-b1-b2-exam-format-and-preparation`，再 `telc-vs-goethe-for-german-visa` 与 `telc-b1-b2-fees-and-test-centers`；每页解封必须同时满足「字数下限 + 删除模板空节 + ≥2 条索引页入链 + 加入 englishPillarSlugs + contentStatus 升级 + noindex:false」，缺一项仍是孤儿页 |
| B. 中文歌德A1费用 | **新建独立中文页（不互挂 hreflang）**——价值不在翻译价格，而在「3 分钟查到本地当期价 + 内部/外部学员定义差异 + 报名窗口机制」；价格只允许引用 claim registry 里的北京 1,400/1,500（带边界），其他城市金额与区间一律不写 |
| C. Canada TEF/TCF | **合并为单页并维持 noindex**——两页 579/688 词、无 NCLC 表、无抽签数据、无父级 hub，解封后在专营站面前无胜算；合并降低维护面，并设三条可复核的解封触发条件 |

---

## 附：本轮发现的、需要转给其他成员的三个事实

1. **（给 content-editor，已更正三次，以本条为准）** `goethe-a1-fees-by-country` **当前不要派人去改**。HEAD 状态该页确有「`directAnswer` 承诺数字、无渲染路径」的问题，但工作区已加入修复（`src/components/LocalExamFeeTable.astro` + `GuideLayout.astro:117` + `tests/m2a-local-fees-centres.test.mjs`），组件与测试为**未跟踪文件**、接线为**未提交改动**。仍值得做的一件事是加**双向**不变量：`directAnswer` 含 `below` 类措辞 ⇔ 被引用 scope 必须全部 `verified`（单向「必须 ≥1 条 record」会与 fail-closed 降级打架，见 §B.6）。另：这批改动提交前不要以当前工作区构建发布。
2. **（给 link-strategist，勘误）** 初稿称「4 篇 telc 页入链为 0」，**错误**。实况：`nursing` 与 `exam-format` 各已有 1 条来自 `/germany-b1-settlement-citizenship/` 的入链（`:88`、`:101`）；`telc-vs-goethe-for-german-visa` 与 `telc-b1-b2-fees-and-test-centers` 为 0。待补落点见 §A.6（共 4 条缺口）。其中 `/tools/exam-comparison/` 目前只链 telc 官网外链、未链站内 telc 页——这是最容易补、也最能同时服务费用页的一处。
3. **（给 team-lead / 治理）** 三个缺口中的任何一个落地都需要改 `src/data/publication-manifest.ts`（pillar 名单 / noindex 名单）与相应测试断言（`tests/scheme-3-publication.test.mjs`、`tests/scheme-3-release-candidate.test.mjs`、`tests/scheme-3-content-map.test.mjs`、`tests/fan-73-guide-trust.test.js` 对「恰好 5 个中文 pillar」等有硬断言）。**不是"被阻塞"，而是"触发 planning-map 同步契约"**（`AGENTS.md:47`：sync ID + `sync.json` + `history.json` 追加 + 冻结路径分类 + watched-scope digest + drift 判定；`planning-map-governance.test.mjs` 的 watch roots 覆盖全部 `src/` 与 `public/`）。只有 drift 判为 `unresolved` 才阻塞完成与发布。本轮未执行，清单已备。
