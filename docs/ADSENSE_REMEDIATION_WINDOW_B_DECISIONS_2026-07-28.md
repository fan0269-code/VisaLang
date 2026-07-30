# VisaLang AdSense 窗口 B 逐页整改决策表

原始决策日期：2026-07-28

当前状态核对日期：2026-07-30

## 0. 目标、范围与验收标准

本文件最初是 2026-07-28 窗口 B 的逐页整改决策表；此后滚动回写 B-1 至 B-6 的本地执行状态。原始决策阶段不修改指南正文、路由、广告、索引、账户或部署状态；后续执行变化以各行状态和 `docs/TASK_LOG.md` 为准。

目标：针对 AdSense “低价值内容”风险，先把最容易被判断为 thin、pending、duplicate、category-thin、source-gap 或 authority-gap 的页面逐页定性，并为后续窗口提供可执行处理顺序。

本窗口覆盖：

1. 12 篇最薄指南；
2. UK、Canada、Portugal、Netherlands、Italy、Spain、France、Finland 这 8 个两页国家集群；
3. 上述 8 个国家分类页本身，因为它们是公开页面且当前主要承担导航功能。

验收标准：

- 12 篇最薄指南均有明确处理策略；
- 8 个两页国家集群均有明确策略；
- 两张逐页表的每个页面都明确记录与同集群页面的差异和当前执行状态；
- P0 / P1 / P2 分层完整，并区分页面整改优先级与窗口 C / D / E 的后续工作；
- 每个页面都有下一步处理方向：保留加深 / 合并 / noindex + 禁广告 / 下线或重定向；
- 不通过简单修改 `sourceReviewStatus` 或 `contentStatus` 伪造成熟度；
- 不为凑字数批量扩写；
- 不新增商业功能、广告位、表单、邮件、支付、个人信息收集、国家路线、账户侧操作或部署；
- 不写固定费用、考位、考试日期、出分时间、签证/入籍/录取/职业注册结果；
- 不伪造作者、审阅人、专业资质、人工复核或官方认可；
- 仅执行原始决策文档对账时，可不运行 `npm test`，但必须运行 `git diff --check`；实际正文或门禁实现窗口必须运行对应测试。

## 1. 决策依据

主要依据：

- `docs/ADSENSE_CONTENT_STANDARDS_AND_REMEDIATION_SPEC.md`；
- `docs/ADSENSE_SITEWIDE_CONTENT_AUDIT_2026-07-27.md`；
- `docs/ADSENSE_CONTENT_QUALITY_OFFICIAL_SOURCES_2026-07-27.md`；
- `PROJECT_CONTEXT.md`；
- `CLAUDE.md`；
- `docs/TASK_LOG.md`。

核心规则：

- 可索引、可广告页面必须完成独立用户任务，并证明与相邻页面的差异；
- pending、thin、主要依赖模板、两页薄分类页、noindex 页面不得进入广告资格；
- 若无法证明独立价值，优先合并而不是扩写；
- 若仍需公开承接但内容不成熟，使用 `noindex + 禁广告`；
- 若无维护价值或已被更强页面替代，使用下线或重定向；
- telc 三篇属于窗口 B 的内容价值初筛，但 source/authority 状态修正归窗口 C；
- TestDaF 不属于窗口 B 正文整改主范围，归窗口 C 状态一致性；
- 作者、审阅、人工抽查和 AI 辅助透明度归窗口 D；
- 公网、AdSense 账户侧、CMP、Search Console 归窗口 E。

## 2. 当前状态摘要

当前仓库状态已检查：`main...origin/main [behind 1]`，工作区存在多处既有修改和未跟踪文件。本文件不依赖 `git pull`、`reset`、`checkout` 或 `clean`，也不覆盖既有改动。

当前窗口 B 高风险模式：

- 多数普通国家两页集群的两个指南都仍是 `contentStatus: verification-pending`；
- 多数普通国家分类页只有 2 张 Guide Card 和短介绍，属于 `category-thin`；
- 12 篇最薄指南中，9 篇同时属于普通国家 pending/thin，3 篇 telc 属于 thin + source/authority gap；
- 窗口 A 已对 8 个两页国家分类页关闭广告资格；
- `docs/TASK_LOG.md` 已记录 2026-07-29 的窗口 B-1：UK 两篇指南已加深但仍保持 pending，UK 分类页已 noindex、禁广告并从 sitemap 排除；
- 窗口 B-2 已完成 Portugal 两篇指南的 requirement/product 差异化和官方来源复核；两篇仍保持 pending，Portugal 分类页已 noindex、禁广告并从 sitemap 排除；其他六个国家不得据此写成已完成；
- 窗口 B-3 已完成 Finland 重复页合并和重定向；唯一主指南保持 pending，主指南与分类页均 noindex、禁广告并从 sitemap 排除；
- 窗口 B-4 已完成 Italy 两篇指南的 requirement/comparison 差异化和当前官方来源复核；两篇保持 pending，Italy 分类页已 noindex、禁广告并从 sitemap 排除；
- 窗口 B-5 已完成 Canada 两篇指南的 Express Entry requirement/comparison 差异化和当前官方来源复核；两篇保持 pending，Canada 分类页已 noindex、禁广告并从 sitemap 排除；
- 窗口 B-6 已完成 Netherlands Inburgering 的 procedure-first/authority-first 加深；相邻 UvA/NT2 源文件保持只读，两篇指南与 Netherlands 分类页均 noindex、禁广告并从 sitemap 排除，且两篇均为终点；
- 2026-07-30 已将全站发现策略统一为 fail-closed：只有 `reviewed` 且 `complete-route` / `core-route` 的指南可进入主发现入口、sitemap 和广告运行时。该本地门槛不代表公网发布或 AdSense 审批。

## 3. 12 篇最薄指南逐页决策表

| 页面 slug | 页面路径 | 国家/路线 | 当前 contentStatus | 当前 sourceReviewStatus | 当前是否 pending | 当前主要问题 | 主用户任务 | 官方最终决定方 | 考试产品方 | 官方来源缺口 | 原创增值缺口 | 建议处理 | 推荐优先级 | 不允许写出的结论 | 后续需要改的文件 | 后续需要增加或更新的测试 | 与同集群页面的差异 | 当前执行状态 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `yki-vs-other-finland-options` | 原路径 `src/content/guides/yki-vs-other-finland-options.md`；现 301 到 `yki-finnish-citizenship` | Finland / citizenship language-proof comparison | 原 `verification-pending`；源文件已合并移除 | 原 `reviewed`；未伪造新人工审阅 | 原为 pending；现不再独立生成 | thin / pending / duplicate / source-gap | 比较 YKI 与其他 Finnish language evidence，决定是否需要走 YKI 核验路径 | Finnish immigration and citizenship authority / Migri | Finnish National Agency for Education / Opetushallitus for YKI | 2026-07-29 已复核 Migri evidence list、YKI accepted combinations 与 OPH 产品职责；个案证据、例外和旧证书仍须由 Migri 决定 | 对比价值已吸收到主指南的 evidence-path record、non-YKI evidence、YKI combination、常见误区与下一步 | 窗口 B-3 已合并到 `yki-finnish-citizenship`；原 URL 301，且不再进入 sitemap 或内链 | P0 | 不得说 YKI 是默认或唯一选择；不得保证某课程、学历、证书或 YKI 组合一定被 Migri 接受；不得写固定考试日期、费用、考位或出分时间 | `src/content/guides/yki-finnish-citizenship.md`；`public/_redirects`；`deploy/legacy-redirects.conf`；taxonomy / sitemap；本文件 | 已增加 Finland 集群、redirect/canonical/sitemap、category noindex/ads、content-integrity 与 render 断言 | 原比较任务已并入唯一 Finland 主指南，不再与主指南制造重复入口 | 已完成（窗口 B-3；合并并重定向，主指南保持 pending） |
| `tcf-canada-vs-tef` | `src/content/guides/tcf-canada-vs-tef.md` | Canada / Express Entry French test comparison | `verification-pending` | `reviewed` | 是，因 contentStatus pending | pending；thin / duplicate 已通过任务拆分降低；个案边界仍 unresolved | 在已保存 IRCC Express Entry programme record 后，比较 TEF Canada 与 TCF Canada 的 exact product、official centre 与动态执行条件 | Immigration, Refugees and Citizenship Canada for the exact Express Entry programme | France Éducation international for TCF Canada；Le français des affaires / CCI Paris Île-de-France for TEF Canada | 2026-07-30 已复核 IRCC accepted tests、programme-specific tables、validity checkpoints 和两个 product owners；个案 profile、result notice 与 local execution 仍未决 | 已补 four-decision matrix、product comparison、test record、stop conditions、常见误区和终止式下一步 | 窗口 B-5 已保留加深为 Canada choice 页；与 `tef-canada-immigration` 固定为 requirement -> comparison 顺序，仍为 pending/noindex/禁广告 | P0 | 不得把 TEF/TCF raw scores 自行互换；不得排名更容易/更快；不得保证 points、invitation、PR、citizenship 或其他 programme 接受；不得写固定费用、中心、日期 | `src/content/guides/tcf-canada-vs-tef.md`；`src/content/guides/tef-canada-immigration.md` | 已增加 Canada 集群测试；断言 IRCC/product-owner 分工、任务差异、requirement -> comparison、pending/noindex/ads/sitemap 状态 | 负责已确认 Express Entry requirement 后的 TEF Canada / TCF Canada 产品比较；相邻 requirement 页负责 programme 和 accepted-test 决定 | 已完成（窗口 B-5；正文加深，保持 pending/noindex/禁广告） |
| `portuguese-ciple-a2-for-citizenship-and-residence` | `src/content/guides/portuguese-ciple-a2-for-citizenship-and-residence.md` | Portugal / CIPLE A2 and nationality procedure | `verification-pending` | `reviewed` | 是，因 contentStatus pending | thin / pending / duplicate / source-gap | 判断具体 Portuguese nationality procedure 是否可能需要 CIPLE A2，并把 authority 与 CAPLE 产品信息分开 | Portuguese nationality authority / Justiça.gov.pt | CAPLE for CIPLE | 2026-07-29 已复核 Justiça profile/document-list 与 CAPLE 产品边界；个案接受、例外和 document form 仍须由负责机关确认 | 已补 authority/product 决策表、预订前记录、页面差异、常见误区和下一步；个案接受仍保持 unresolved | 窗口 B-2 已保留加深为 Portugal product-verification 页；与 requirement 页保持 requirement -> choice 顺序，仍为 pending | P0 | 不得说每个 naturalisation、marriage、Golden Visa、permanent residence 申请都需要或接受 CIPLE；不得写固定 CAPLE fee/session/centre | `src/content/guides/portuguese-ciple-a2-for-citizenship-and-residence.md`；可能同步 `src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md` | 更新 Portugal 集群测试；断言 Justiça-first、CAPLE-only-product-boundary、pending/noindex/ads 状态 | 负责确认语言证明后核验 CIPLE 产品；相邻 Golden Visa 页面负责先识别 nationality profile 与 requirement | 已完成（窗口 B-2；正文加深，保持 pending） |
| `cils-vs-celi-vs-plida-for-italian-citizenship` | `src/content/guides/cils-vs-celi-vs-plida-for-italian-citizenship.md` | Italy / citizenship certificate comparison | `verification-pending` | `reviewed` | 是，因 contentStatus pending | pending；thin / duplicate 已通过任务拆分降低；个案边界仍 unresolved | 在已保存 citizenship authority instruction 后，比较 CILS、CELI、PLIDA 的 exact product、authorised centre 与动态执行条件 | Italian Interior Ministry or responsible prefecture/consulate | CILS / CELI / PLIDA certificate owners | 2026-07-30 已复核 Interior Ministry 与 Foreign Ministry 的 B1、admitted-body 和 stated-exemption 边界；个案 evidence、office instruction 与 document form 仍由负责机关决定 | 已补四项 comparison matrix、authority-to-product record、stop conditions、常见误判和终止式下一步 | 窗口 B-4 已保留加深为 Italy choice 页；与 `cils-b1-cittadinanza...` 固定为 requirement -> comparison 顺序，仍为 pending/noindex/禁广告 | P0 | 不得排名哪一个“更容易/更快/一定被接受”；不得保证某证书对个案有效；不得写固定费用、考点、考试日期 | `src/content/guides/cils-vs-celi-vs-plida-for-italian-citizenship.md`；`src/content/guides/cils-b1-cittadinanza-for-italian-citizenship.md` | 已增加 Italy 集群测试；断言 authority vs exam owner、任务差异、requirement -> comparison、pending/noindex/ads/sitemap 状态 | 负责已确认 requirement 后的 CILS、CELI、PLIDA 产品比较；相邻 CILS B1 页面负责 citizenship basis 与 evidence requirement | 已完成（窗口 B-4；正文加深，保持 pending/noindex/禁广告） |
| `dutch-inburgering-a2-b1-for-integration-and-citizenship` | `src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md` | Netherlands / named residence, naturalisation and civic-integration tasks | `verification-pending` | `reviewed` | 是，因 contentStatus pending | pending；thin / authority-gap 已通过任务与职责拆分降低；个案边界仍 unresolved | 先区分具名 IND residence requirement、naturalisation requirement 与 civic-integration obligation，再从个人官方记录确认路线 | IND for named residence requirements and the naturalisation decision；municipality for naturalisation intake/evidence and Wi 2021 PIP | DUO / Inburgeren for obligation and exam execution；Mijn Inburgering / PIP for the personal route record | 2026-07-30 已复核 IND civic-integration/naturalisation 与 DUO exam/course pages；个人 law/cohort、PIP route、level、components、deadline 和 exception 仍未决 | 已补 procedure-first route check、四方职责表、personal route record、A2/B1 stop rule、与 UvA/NT2 的任务边界、常见错误和终止式下一步 | 窗口 B-6 已保留加深；继续 pending/noindex/禁广告，不与具名 UvA/NT2 admissions 页合并或串联 | P0 | 不得写一个通用 A2/B1 规则、统一 residence period、统一 deadline 或保证 residence、naturalisation、exemption、evidence acceptance；不得替读者决定 cohort | `src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md`；Netherlands taxonomy；测试、launch-check 与台账 | 已增加 Netherlands B-6 测试；断言 authority split、personal record、A2/B1 stop rule、两页终点、pending/noindex/ads/sitemap 与 NT2 字节级不变 | 负责具名 residence/naturalisation requirement 与 civic-integration personal route；相邻 NT2 页面只处理具名 UvA Dutch-taught admissions | 已完成（窗口 B-6；正文加深，保持 pending/noindex/禁广告） |
| `portuguese-language-for-golden-visa-and-citizenship` | `src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md` | Portugal / residence-to-citizenship planning | `verification-pending` | `reviewed` | 是，因 contentStatus pending | thin / pending / duplicate / source-gap | 帮 former or current residence-route readers 从 nationality procedure 出发核验是否存在 language proof 要求 | Portuguese nationality authority / Justiça.gov.pt | CAPLE for CIPLE if CIPLE is relevant | 2026-07-29 已复核 Justiça 的 profile/document-list 边界；Golden Visa 仍只作为读者场景，不构成统一语言规则 | 已补 authority record、Golden Visa 边界、转入 CIPLE 的条件、常见误区和下一步；个案 route/acceptance 仍保持 unresolved | 窗口 B-2 已保留加深为 Portugal nationality-profile requirement 页；与 CIPLE product-verification 页差异已由测试固定，仍为 pending | P0 | 不得说 Golden Visa 自动导致 CIPLE 要求或免除；不得推断 residence-period calculation、nationality eligibility 或 accepted proof | `src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md`；可能同步 `portuguese-ciple...` | 更新 Portugal 集群测试；断言 requirement-to-choice 路径、no fixed eligibility/result、pending/noindex/ads 状态 | 负责 residence-to-nationality profile 与语言证明 requirement；相邻 CIPLE 页面只处理考试产品核验 | 已完成（窗口 B-2；正文加深，保持 pending） |
| `languagecert-selt-uk-visa` | `src/content/guides/languagecert-selt-uk-visa.md` | UK / SELT provider choice | `verification-pending` | `reviewed` | 是，因 contentStatus pending | thin / pending / duplicate / source-gap | 判断 UK route 是否可使用 LanguageCert SELT，并区分 Home Office route requirement 与 LanguageCert 产品 | UK immigration authority / Home Office | LanguageCert SELT | 需要记录 GOV.UK SELT list 对 provider、test type、route-specific CEFR level 的支持边界；需要 exam owner 的 product/centre 边界 | 缺少与 IELTS UKVI 的差异表、route-to-test decision tree、booking 前核验清单、provider approval 不等于签证结果说明 | 保留加深为 UK choice/provider 页；与 IELTS UKVI 页形成明确对比，不合并 | P0 | 不得说 LanguageCert 被批准就适合所有 UK visas；不得保证签证、citizenship、centre availability、fee、date 或 result timing | `src/content/guides/languagecert-selt-uk-visa.md`；可能同步 `ielts-ukvi-uk-visa.md` | 更新 UK 集群测试；断言 GOV.UK-first、provider boundary、两 UK 页差异、pending/noindex/ads 状态 | 负责已确认 SELT requirement 后的 LanguageCert provider/product choice；相邻 IELTS UKVI 页面负责 route-first requirement 与 test type | 已完成（窗口 B-1；本次仅对账） |
| `ielts-ukvi-uk-visa` | `src/content/guides/ielts-ukvi-uk-visa.md` | UK / IELTS UKVI route check | `verification-pending` | `reviewed` | 是，因 contentStatus pending | thin / pending / duplicate / source-gap | 判断具体 UK visa/citizenship route 是否需要 IELTS for UKVI 或 Life Skills，并查 Home Office SELT 要求 | UK immigration authority / Home Office | IELTS / British Council, IDP or IELTS SELT delivery partners | 需要记录 GOV.UK route-specific level、test type 和 approved SELT provider list；exam owner 只支持 booking/product facts | 缺少 route requirement checklist、IELTS Academic/General/Life Skills 区分、与 LanguageCert 的选择差异、错误清单 | 保留加深为 UK requirement/check 页；与 LanguageCert provider-choice 页互补 | P0 | 不得说 IELTS UKVI 适合所有 UK routes；不得保证 UKVI outcome、citizenship acceptance、fee、centre、date 或 result time | `src/content/guides/ielts-ukvi-uk-visa.md`；可能同步 `languagecert-selt-uk-visa.md` | 更新 UK 集群测试；断言 route-specific SELT type、GOV.UK authority boundary、pending/noindex/ads 状态 | 负责从具体 UK route 核验 SELT requirement 与 IELTS test type；相邻 LanguageCert 页面负责 provider/product choice | 已完成（窗口 B-1；本次仅对账） |
| `telc-vs-goethe-for-german-visa` | `src/content/guides/telc-vs-goethe-for-german-visa.md` | Germany telc / provider comparison | `starter-overview` | default pending / missing explicit field | 是，因 source/authority fields missing | thin / pending / source-gap / authority-gap | 在 German visa routes 中比较 telc 与 Goethe，但必须先确认 receiving authority 接受规则 | German competent authority for the exact visa/residence route，未在 frontmatter 明确 | telc and Goethe exam owners，未在 frontmatter 明确 | 缺少 primary official authority URL、final decision authority type、exam owner URLs、sourceReviewedAt/reviewed evidence | 缺少 authority-first 对比、route applicability matrix、telc 与 Goethe 证书职责拆分 | 窗口 B 标为 P0 内容价值初筛；实际 source/authority 修正归窗口 C；整改前 noindex + 禁广告 | P0 | 不得说 telc 或 Goethe 对所有 German visa routes 都被接受；不得保证签证结果、费用、考点、日期、证书接受 | `src/content/guides/telc-vs-goethe-for-german-visa.md`；窗口 C 的 telc source/authority matrix；source-review tests | 窗口 C 新增/更新 telc 专测；source-review-render；adsense-risk-exposure；content-integrity | 负责 telc 与 Goethe provider comparison；相邻 telc 页面分别处理 receiving-route acceptance 与本地执行 | 转窗口 C（窗口 B 仅完成内容价值决策） |
| `telc-b1-b2-germany-work-nursing` | `src/content/guides/telc-b1-b2-germany-work-nursing.md` | Germany telc / work, nursing, residence | `starter-overview` | default pending / missing explicit field | 是，因 source/authority fields missing | thin / pending / source-gap / authority-gap | 判断 work、nursing 或 residence 场景中是否应核验 telc B1/B2 | Exact employer, regulator, recognition authority, immigration or residence authority，未在 frontmatter 明确 | telc exam owner，未在 frontmatter 明确 | 缺少 named receiving authority / regulator；缺少 telc product URL 和动态本地执行边界 | 缺少 work vs nursing vs residence 拆分、谁决定 acceptance 的矩阵、不能跨路线套用的错误清单 | 窗口 B 标为内容价值薄页；窗口 C 完成 source/authority；整改前 noindex + 禁广告 | P0 | 不得说 telc B1/B2 自动满足 nursing、work permit、residence 或 recognition；不得写固定 fee/date/centre/result | `src/content/guides/telc-b1-b2-germany-work-nursing.md`；窗口 C source/authority matrix | 窗口 C telc 专测；source-review-render；authority gate；adsense-risk-exposure | 负责 work、nursing、residence 的 receiving-authority acceptance；相邻 fees/centres 页面只处理本地执行 | 转窗口 C（窗口 B 仅完成内容价值决策） |
| `telc-b1-b2-fees-and-test-centers` | `src/content/guides/telc-b1-b2-fees-and-test-centers.md` | Germany telc / local execution | `starter-overview` | default pending / missing explicit field | 是，因 source/authority fields missing | thin / pending / source-gap / authority-gap | 教读者如何通过官方 telc 和授权中心核验 centre、fee、session，而不是给固定费用 | Local authorised telc centre for execution；receiving authority only decides acceptance | telc exam owner and authorised centres，未在 frontmatter 明确 | 缺少 telc official centre search / exam owner source；缺少 local centre responsibility boundary | 缺少 local execution checklist、记录模板、fee/date 不固定的解释、与 work/nursing requirement 页的任务差异 | 可保留加深为 local-execution 工作流页；source/authority 修正归窗口 C；整改前 noindex + 禁广告 | P0 | 不得列固定费用、考点、考试日期、出分时间、取消退款规则；不得保证中心授权或证书交付 | `src/content/guides/telc-b1-b2-fees-and-test-centers.md`；窗口 C source/authority matrix | 窗口 C telc 专测；断言 no fixed fees/dates；adsense-risk-exposure；source-review-render | 负责 centre、fee、session 的官方核验工作流；相邻 work/nursing 页面负责用途与接受方判断 | 转窗口 C（窗口 B 仅完成内容价值决策） |
| `cils-b1-cittadinanza-for-italian-citizenship` | `src/content/guides/cils-b1-cittadinanza-for-italian-citizenship.md` | Italy / citizenship-basis and CILS evidence requirement check | `verification-pending` | `reviewed` | 是，因 contentStatus pending | pending；thin / duplicate 已通过任务拆分降低；个案边界仍 unresolved | 先确认 citizenship basis、responsible office、B1 evidence instruction 和 stated exemption，再决定是否进入 CILS 产品核验 | Italian Interior Ministry or responsible prefecture/consulate | CILS / Università per Stranieri di Siena | 2026-07-30 已复核 Interior Ministry application guidance、Foreign Ministry consular guidance和 CILS B1 产品边界；个案 evidence、exemption 和 document form 仍由负责机关决定 | 已补 authority record、rule-vs-product 表、requirement checklist、与 comparison 页的受控交接、常见错误和下一步 | 窗口 B-4 已保留加深为 Italy requirement 页；与 comparison 页形成 requirement -> comparison 顺序，仍为 pending/noindex/禁广告 | P0 | 不得说 CILS B1 Cittadinanza 一定被所有 citizenship cases 接受；不得保证 consulate acceptance、fee、centre、date 或 result timing | `src/content/guides/cils-b1-cittadinanza-for-italian-citizenship.md`；`src/content/guides/cils-vs-celi-vs-plida-for-italian-citizenship.md` | 已增加 Italy 集群测试；断言 requirement/comparison 差异、authority boundary、pending/noindex/ads/sitemap 状态 | 负责 citizenship basis 与 language-evidence requirement；相邻 comparison 页面负责已确认 requirement 后的证书产品选择 | 已完成（窗口 B-4；正文加深，保持 pending/noindex/禁广告） |

## 4. 8 个两页国家集群决策表

本表覆盖每个国家分类页和该国家下两篇指南的集群策略。分类页属于公开页面，当前在 `src/pages/guides/category/[category].astro` 由 `guideCategories` 生成；窗口 A 已通过 `adsEligible: false` 禁广告，但它们仍需要窗口 B 决定是否深化为 hub 或 noindex。

| 页面 slug | 页面路径 | 国家/路线 | 当前 contentStatus | 当前 sourceReviewStatus | 当前是否 pending | 当前主要问题 | 主用户任务 | 官方最终决定方 | 考试产品方 | 官方来源缺口 | 原创增值缺口 | 建议处理 | 推荐优先级 | 不允许写出的结论 | 后续需要改的文件 | 后续需要增加或更新的测试 | 与同集群页面的差异 | 当前执行状态 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `guides/category/uk` | `src/pages/guides/category/[category].astro` + `src/data/guide-taxonomy.ts` | UK / UK visa and citizenship English | derived category page; 2 guides both verification-pending | derived from child pages; both reviewed but pending | 是，集群子页均 pending | category-thin / pending / duplicate | 帮读者从 UK route 进入 IELTS UKVI 或 LanguageCert SELT 核验 | UK immigration authority / Home Office | IELTS UKVI and LanguageCert SELT product owners | 分类页没有独立官方来源区；只继承子页，不证明路线 hub 成熟 | 缺少 UK route map、两个子页差异、阅读顺序、route-specific SELT type 决策树 | **窗口 B-1 已执行：noindex + 禁广告 + sitemap 排除**；后续若加深，可升级为真正 UK SELT hub | P0 | 不得说任一 SELT provider 适合所有 UK routes；不得保证 visa/citizenship result | `src/data/guide-taxonomy.ts`；`src/pages/guides/category/[category].astro`；`astro.config.mjs` | 已新增/更新 category noindex、sitemap 排除、Germany 控制与 launch-check 断言 | 分类页只承担 UK route 分流与两页阅读顺序；不替代 IELTS route check 或 LanguageCert provider choice | 已完成（窗口 B-1；本次仅对账） |
| `ielts-ukvi-uk-visa` | `src/content/guides/ielts-ukvi-uk-visa.md` | UK / IELTS UKVI | `verification-pending` | `reviewed` | 是 | thin / pending / source-gap | route-first IELTS UKVI 核验 | UK immigration authority / Home Office | IELTS UKVI delivery partners | 需补 route-specific level/test type 来源支持范围 | 需补 route checklist、provider boundary、与 LanguageCert 差异 | **窗口 B-1 已加深正文，保留 pending**；作为 route-first requirement check，不升级成熟度 | P0 | 不得保证任一 UK route、fee、date、result、outcome | `src/content/guides/ielts-ukvi-uk-visa.md` | 已新增/更新 UK cluster task-difference、pending render、禁止动态事实与结果承诺断言 | 负责从具体 UK route 核验 SELT requirement 与 IELTS test type；相邻 LanguageCert 页面负责 provider/product choice | 已完成（窗口 B-1；本次仅对账） |
| `languagecert-selt-uk-visa` | `src/content/guides/languagecert-selt-uk-visa.md` | UK / LanguageCert SELT | `verification-pending` | `reviewed` | 是 | thin / pending / source-gap | provider-choice SELT 核验 | UK immigration authority / Home Office | LanguageCert | 需补 Home Office list 与 LanguageCert product 边界 | 需补 provider comparison、booking checklist、误区 | **窗口 B-1 已加深正文，保留 pending**；作为 provider-choice / SELT product verification，不升级成熟度 | P0 | 不得保证 provider approval 等于个案接受或签证结果 | `src/content/guides/languagecert-selt-uk-visa.md` | 已新增/更新 UK cluster task-difference、pending render、禁止动态事实与结果承诺断言 | 负责已确认 SELT requirement 后的 LanguageCert provider/product choice；相邻 IELTS UKVI 页面负责 route-first requirement 与 test type | 已完成（窗口 B-1；本次仅对账） |
| `guides/category/canada` | `src/pages/guides/category/[category].astro` + `src/data/guide-taxonomy.ts` | Canada / Express Entry French testing | derived category page; 2 guides both verification-pending | derived from child pages; both reviewed but pending | 是，集群子页均 pending | category-thin / pending；子页 duplicate risk 已通过任务拆分降低 | 提示 Express Entry programme requirement -> TEF/TCF comparison 的受控顺序，但不在主发现中展示 pending 卡片 | IRCC for the exact Express Entry programme | TEF Canada and TCF Canada product owners | 分类页不承担独立 IRCC source map，只显示主发现门禁状态 | 两个子页已形成 requirement -> comparison 顺序；分类页无独立索引价值 | 窗口 B-5 已执行 noindex + 禁广告 + sitemap 排除；不机械扩写为 hub | P0 | 不得保证 points、invitation、PR、citizenship acceptance 或 test advantage | `src/data/guide-taxonomy.ts`；`src/pages/guides/category/[category].astro`；Canada 两篇指南 | 已增加 category noindex/ads/sitemap 与 Canada cluster 断言 | 分类页只提示主发现门禁；两篇 pending 指南仅通过直接 URL 供审核，不由分类页分流 | 已完成（窗口 B-5；noindex、禁广告、排除 sitemap） |
| `tef-canada-immigration` | `src/content/guides/tef-canada-immigration.md` | Canada / Express Entry programme-first requirement check | `verification-pending` | `reviewed` | 是 | pending；cluster-thin / duplicate risk 已降低 | 先确认 exact Express Entry programme、accepted French test、IRCC table 和 validity instruction，再决定是否比较 products | IRCC for the exact Express Entry programme | Le français des affaires / CCI Paris Île-de-France | 2026-07-30 已补 current IRCC accepted-test/programme boundary 和 current TEF Canada product/centre path；个案 profile、result notice 和 local execution 未决 | 已补 IRCC requirement record、authority/product 分工、常见误区、comparison handoff 和下一步 | 窗口 B-5 已保留加深为 requirement 页；保持 pending/noindex/禁广告 | P0 | 不得保证 TEF Canada 对所有 Canada programmes 或 citizenship 均适用；不得保证 points、invitation 或 PR | `src/content/guides/tef-canada-immigration.md` | Canada cluster test；content-integrity；source-review-render；ads/sitemap gate | 负责 exact Express Entry programme 与 accepted-test requirement；相邻 comparison 页面只处理已确认 requirement 后的产品选择 | 已完成（窗口 B-5；正文加深，保持 pending/noindex/禁广告） |
| `tcf-canada-vs-tef` | `src/content/guides/tcf-canada-vs-tef.md` | Canada / TEF Canada vs TCF Canada product choice | `verification-pending` | `reviewed` | 是 | pending；thin / duplicate risk 已降低 | 在 IRCC requirement 已确认后比较 TEF Canada / TCF Canada 的 exact product、official centre 与动态执行条件 | IRCC for the exact Express Entry programme | FEI for TCF；CCI Paris Île-de-France for TEF | 2026-07-30 已补 test-specific IRCC path、owner roles 与 four-ability product boundary；个案 result interpretation 和 local execution 未决 | 已补 product comparison、record template、stop conditions、误区和终止式下一步 | 窗口 B-5 已保留加深为 comparison 页；保持 pending/noindex/禁广告 | P0 | 不得说两个考试 raw scores 等价；不得排名难度/速度；不得保证移民结果 | `src/content/guides/tcf-canada-vs-tef.md` | Canada cluster test；source-review-render；ads/sitemap gate | 负责已确认 requirement 后的 TEF Canada / TCF Canada 产品比较；相邻 requirement 页面负责 programme 和 accepted-test 决定 | 已完成（窗口 B-5；正文加深，保持 pending/noindex/禁广告） |
| `guides/category/portugal` | `src/pages/guides/category/[category].astro` + `src/data/guide-taxonomy.ts` | Portugal / residence and citizenship | derived category page; 2 guides both verification-pending | derived from child pages; both reviewed but pending | 是，集群子页均 pending | category-thin / pending / duplicate | 引导 nationality profile -> CIPLE product 的两步阅读顺序 | Portuguese nationality authority | CAPLE | 分类页仍不承担独立 source map；两篇指南已拆分 requirement/product 任务，分类页保持导航型 noindex | 两页差异已完成并有测试；分类页未深化为可索引 route hub | 窗口 B-2 已执行 noindex + 禁广告 + sitemap 排除；两篇指南已分别加深且暂不合并 | P0 | 不得写 Golden Visa、residence 或 nationality 的统一语言规则或结果 | `src/data/guide-taxonomy.ts`；`src/pages/guides/category/[category].astro`；Portugal 两篇指南 | category noindex/ads 测试；Portugal cluster test | 分类页只承担 nationality profile 到 requirement/CIPLE 的阅读顺序；不替代两篇任务页 | 已完成（窗口 B-2；noindex + 禁广告 + sitemap 排除） |
| `portuguese-language-for-golden-visa-and-citizenship` | `src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md` | Portugal / residence-to-nationality requirement | `verification-pending` | `reviewed` | 是 | thin / pending / duplicate | 选择 nationality profile 后判断是否需要 language proof | Portuguese nationality authority | CAPLE if CIPLE relevant | 已补 profile/document-list authority record；个案 evidence acceptance 仍须官方确认 | 已补 requirement flow、Golden Visa 边界、常见误区和转入 CIPLE 的条件 | 窗口 B-2 已保留加深为 requirement 页；差异已通过测试，仍为 pending | P0 | 不得说 Golden Visa 自动产生或免除 CIPLE 要求 | `src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md` | Portugal cluster test | 负责 residence-to-nationality profile 与语言证明 requirement；相邻 CIPLE 页面只处理考试产品核验 | 已完成（窗口 B-2；正文加深，保持 pending） |
| `portuguese-ciple-a2-for-citizenship-and-residence` | `src/content/guides/portuguese-ciple-a2-for-citizenship-and-residence.md` | Portugal / CIPLE A2 choice | `verification-pending` | `reviewed` | 是 | thin / pending / duplicate | 已确认需语言证明时，核验 CIPLE A2 产品和适用性 | Portuguese nationality authority | CAPLE | 已明确 CAPLE 只支持 product facts；procedure acceptance 与个案结论仍归 nationality authority | 已补预订前 verification record、authority/product 分工、常见误区和下一步 | 窗口 B-2 已保留加深为 product-verification 页；与 requirement 页互补，仍为 pending | P0 | 不得保证 CIPLE 对所有情况适用 | `src/content/guides/portuguese-ciple-a2-for-citizenship-and-residence.md` | Portugal cluster test；source-review-render | 负责确认语言证明后核验 CIPLE 产品；相邻 Golden Visa 页面负责先识别 nationality profile 与 requirement | 已完成（窗口 B-2；正文加深，保持 pending） |
| `guides/category/netherlands` | `src/pages/guides/category/[category].astro` + `src/data/guide-taxonomy.ts` | Netherlands / separate Inburgering and named UvA/NT2 tasks | derived category page; 2 guides both verification-pending | derived from child pages; both reviewed but pending | 是，集群子页均 pending | category-thin / pending；两篇任务差异已固定 | 仅标识两个不同接收方的任务，不把 Inburgering 与 UvA admissions 组成统一路线 | IND / municipality for Inburgering procedures；UvA admissions for the named study route | DUO / Inburgeren；Staatsexamen NT2 | 分类页不承担独立 source map；任务与 authority boundary 由两篇直接 URL 指南说明 | 两篇已明确为不同终点；分类页没有独立索引价值 | 窗口 B-6 已显式 noindex + 禁广告 + sitemap 排除；不机械扩写为 hub | P1 | 不得把 Inburgering、NT2-II、work、study、naturalisation 混成统一规则 | `src/data/guide-taxonomy.ts`；Netherlands 两篇指南；测试与 launch-check | 已增加 category noindex/ads/sitemap 与 Netherlands cluster 断言 | 分类页只提示任务分离；两篇 pending 指南仅通过直接 URL 供审核，不形成顺序式 next route | 已完成（窗口 B-6；noindex、禁广告、排除 sitemap） |
| `dutch-inburgering-a2-b1-for-integration-and-citizenship` | `src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md` | Netherlands / procedure-first Inburgering requirement and obligation check | `verification-pending` | `reviewed` | 是 | pending；thin / source-gap / authority-gap 已降低；个案仍 unresolved | 区分 named residence、naturalisation 与 civic-integration obligation，再核验 personal law/cohort/PIP/exams | IND / municipality according to the named procedure | DUO / Inburgeren；Mijn Inburgering / PIP | 2026-07-30 已复核四个官方页面；个案 route、level、deadline、exception 与结果仍须官方确认 | 已补职责表、personal route record、A2/B1 stop rule、常见错误、UvA/NT2 boundary 和终止式下一步 | 窗口 B-6 已保留加深；保持 pending/noindex/禁广告并作为终点 | P0 | 不得写统一 A2/B1、deadline、residence period、cohort、exemption 或结果规则 | `src/content/guides/dutch-inburgering-a2-b1-for-integration-and-citizenship.md` | Netherlands B-6 test；content/render/ads/sitemap gate；launch-check | 只处理具名 Inburgering procedure/obligation；不转入 UvA/NT2 admissions | 已完成（窗口 B-6；正文加深，保持 pending/noindex/禁广告） |
| `staatsexamen-nt2-for-work-and-higher-education` | `src/content/guides/staatsexamen-nt2-for-work-and-higher-education.md` | Netherlands / UvA Dutch-taught admissions | `verification-pending` | `reviewed` | 是 | pending / source-gap / authority-gap；本窗口保持原样 | 用 UvA page 核验 NT2-II 是否适用于 named Dutch-taught bachelor programme | University of Amsterdam Dutch-taught bachelor admissions | DUO / Staatsexamens NT2 | 保持 2026-07-19 的 bounded review；B-6 未重开或扩展其事实范围 | 原有具名 receiver、programme checklist 与 terminal action 保持不变；B-6 只在 Inburgering 页补任务差异 | B-6 作为只读参照页；不合并、不设 `nextGuideSlug`，继续 pending/noindex/禁广告 | P1 | 不得说 NT2-II 自动适用于所有 universities、employers 或 regulators | 只读 `src/content/guides/staatsexamen-nt2-for-work-and-higher-education.md`；测试与生成页检查 | Netherlands B-6 test 固定 SHA-256、terminal/noindex/ads/sitemap；source-review-render | 只处理具名 UvA Dutch-taught admissions；不是 Inburgering 的下一步 | 已核对（窗口 B-6；源文件字节级未改，保持终点） |
| `guides/category/italy` | `src/pages/guides/category/[category].astro` + `src/data/guide-taxonomy.ts` | Italy / citizenship | derived category page; 2 guides both verification-pending | derived from child pages; both reviewed but pending | 是，集群子页均 pending | category-thin / pending；子页 duplicate risk 已通过任务拆分降低 | 提示 citizenship basis and evidence requirement -> CILS/CELI/PLIDA comparison 的受控顺序，但不在主发现中展示 pending 卡片 | Italian Interior Ministry or responsible prefecture/consulate | CILS / CELI / PLIDA product owners | 分类页不承担独立 authority map，只显示主发现门禁状态 | 两个子页已形成 requirement -> comparison 顺序；分类页无独立索引价值 | 窗口 B-4 已执行 noindex + 禁广告 + sitemap 排除；不机械扩写为 hub | P0 | 不得保证 B1 certificate、specific provider 或 citizenship outcome | `src/data/guide-taxonomy.ts`；`src/pages/guides/category/[category].astro`；Italy 两篇指南 | 已增加 category noindex/ads/sitemap 与 Italy cluster 断言 | 分类页只提示主发现门禁；两篇 pending 指南仅通过直接 URL 供审核，不由分类页分流 | 已完成（窗口 B-4；noindex、禁广告、排除 sitemap） |
| `cils-b1-cittadinanza-for-italian-citizenship` | `src/content/guides/cils-b1-cittadinanza-for-italian-citizenship.md` | Italy / citizenship-basis and evidence requirement check | `verification-pending` | `reviewed` | 是 | pending；thin / duplicate risk 已降低 | 核验 citizenship basis、responsible office、B1 evidence instruction 和 stated exemption，再决定是否比较 products | Italian Interior Ministry or responsible prefecture/consulate | CILS / Siena | 2026-07-30 已补 current Interior/Foreign Ministry 与 CILS product boundary；个案 evidence、exemption 和 local execution 未决 | 已补 requirement record、rule/product 分工、常见误区、comparison handoff 和下一步 | 窗口 B-4 已保留加深为 requirement 页；保持 pending/noindex/禁广告 | P0 | 不得保证个案接受、fee、centre、date、result timing | `src/content/guides/cils-b1-cittadinanza-for-italian-citizenship.md` | Italy cluster test；source-review-render；ads/sitemap gate | 负责 citizenship basis 与 language-evidence requirement；相邻 comparison 页面只处理已确认 requirement 后的产品选择 | 已完成（窗口 B-4；正文加深，保持 pending/noindex/禁广告） |
| `cils-vs-celi-vs-plida-for-italian-citizenship` | `src/content/guides/cils-vs-celi-vs-plida-for-italian-citizenship.md` | Italy / certificate product choice | `verification-pending` | `reviewed` | 是 | pending；thin / duplicate risk 已降低 | 在 authority requirement 已确认后比较 CILS/CELI/PLIDA 的 exact product、centre 与动态执行条件 | Italian Interior Ministry or responsible prefecture/consulate | CILS / CELI / PLIDA owners | 2026-07-30 已补 admitted-body、owner-role 与 current product entry；个案 acceptance 和 local execution 未决 | 已补 four-decision matrix、comparison record、stop conditions、误区和终止式下一步 | 窗口 B-4 已保留加深为 comparison 页；保持 pending/noindex/禁广告 | P0 | 不得排名或保证 provider acceptance；不得写固定费用、日期或考位 | `src/content/guides/cils-vs-celi-vs-plida-for-italian-citizenship.md` | Italy cluster test；source-review-render；ads/sitemap gate | 负责已确认 requirement 后的 CILS、CELI、PLIDA 产品比较；相邻 requirement 页面负责 citizenship basis | 已完成（窗口 B-4；正文加深，保持 pending/noindex/禁广告） |
| `guides/category/spain` | `src/pages/guides/category/[category].astro` + `src/data/guide-taxonomy.ts` | Spain / citizenship | derived category page; 2 guides both verification-pending | derived from child pages; both reviewed but pending | 是，集群子页均 pending | category-thin / pending / duplicate | 引导 Ministry-first citizenship procedure，然后选择 DELE/CCSE/level proof | Spanish Ministry of Justice | Instituto Cervantes for DELE/CCSE；SIELE product owner if relevant | 分类页未记录 Ministry procedure、dispensation、Cervantes test scope 的关系 | 缺少 Spain citizenship hub、两页差异和阅读顺序 | noindex + 禁广告；后续可加深为 hub 或继续只作导航 | P1 | 不得写 universal two-test rule、SIELE acceptance、individual dispensation result | `src/data/guide-taxonomy.ts`；`src/pages/guides/category/[category].astro`；Spain 两篇指南 | category noindex/ads 测试；Spain cluster test | 分类页只承担 Ministry procedure 到 exam/level proof 的分流；不替代两篇任务页 | 待执行（窗口 B） |
| `dele-a2-ccse-spanish-citizenship` | `src/content/guides/dele-a2-ccse-spanish-citizenship.md` | Spain / citizenship exam planning | `verification-pending` | `reviewed` | 是 | pending / duplicate / source-gap | 先确认 Ministry procedure 是否要求 DELE A2 and/or CCSE | Spanish Ministry of Justice | Instituto Cervantes for DELE/CCSE | 需保留 dispensation procedure 和 applicant category boundary | 需补 procedure decision tree、与 level page 差异 | 保留加深；两页差异需更明确 | P1 | 不得说所有 citizenship applicants 都需要两项考试 | `src/content/guides/dele-a2-ccse-spanish-citizenship.md` | Spain cluster test；source-review-render | 负责先核验 citizenship procedure 是否要求 DELE/CCSE；相邻 levels 页面负责已确认 requirement 后的 level/proof choice | 待执行（窗口 B） |
| `dele-levels-spanish-citizenship` | `src/content/guides/dele-levels-spanish-citizenship.md` | Spain / DELE level and proof choice | `verification-pending` | `reviewed` | 是 | pending / duplicate / source-gap | 在 authority 已确认需要 language proof 后，核验 DELE level 或 alternative proof | Spanish Ministry of Justice | Instituto Cervantes for DELE；SIELE owner if checked | 需补 accepted proof / SIELE question 的边界 | 需补 level/proof comparison table、record template | 保留加深；若不能区别于 exam-planning 页则合并 | P1 | 不得说 SIELE 被接受；不得保证 exemption 或 accepted level | `src/content/guides/dele-levels-spanish-citizenship.md` | Spain cluster test；content-integrity | 负责已确认语言证明 requirement 后的 level/alternative proof；相邻 DELE/CCSE 页面负责 procedure-first 判断 | 待执行（窗口 B） |
| `guides/category/france` | `src/pages/guides/category/[category].astro` + `src/data/guide-taxonomy.ts` | France / residence, nationality, work, study | derived category page; 2 guides both verification-pending | derived from child pages; both reviewed but pending | 是，集群子页均 pending | category-thin / pending / authority-gap | 区分 Sorbonne admissions DELF/DALF 与 Ministry nationality TCF IRN | Sorbonne admissions for study page；French Ministry of Interior for nationality page | France Éducation international for DELF/DALF/TCF IRN | 分类页未说明两个 receiver 完全不同；容易把 study/work/residence/nationality 混成国家模板 | 缺少 route split map、receiver-first table、阅读顺序 | noindex + 禁广告；暂不做广告内容页；后续可加深为 route map | P1 | 不得把 Sorbonne requirement、nationality procedure、residence card 和 work route 混用 | `src/data/guide-taxonomy.ts`；`src/pages/guides/category/[category].astro`；France 两篇指南 | category noindex/ads 测试；France cluster test | 分类页只区分 Sorbonne admissions 与 Ministry nationality/residence；不替代两篇不同接收方页面 | 待执行（窗口 B） |
| `delf-b1-b2-french-work-study` | `src/content/guides/delf-b1-b2-french-work-study.md` | France / Sorbonne arts admissions | `verification-pending` | `reviewed` | 是 | pending / authority-gap / cluster-thin | 用 named Sorbonne Faculty scope 核验 DELF/DALF evidence | Sorbonne University Faculty of Arts and Humanities admissions | France Éducation international for DELF/DALF | 需保持 named receiver 范围，不能扩展到 all universities/work | 已有边界较清楚，但需补 exact programme checklist 和与 TCF IRN 差异 | 保留加深 | P1 | 不得说 DELF B1/B2 满足所有 French study/work routes | `src/content/guides/delf-b1-b2-french-work-study.md` | France cluster test；source-review-render | 只处理具名 Sorbonne Faculty admissions；相邻 TCF IRN 页面处理 Ministry nationality/residence procedure | 待执行（窗口 B） |
| `tcf-irn-french-residence` | `src/content/guides/tcf-irn-french-residence.md` | France / nationality and residence procedure verification | `verification-pending` | `reviewed` | 是 | pending / source-gap / cluster-thin | 根据 exact Ministry procedure 判断 TCF IRN 是否相关 | French Ministry of the Interior nationality procedure or relevant residence authority | France Éducation international for TCF IRN | 需维护 2026 threshold 和 residence-card dynamic boundary，不写个案规则 | 需补 procedure checklist、nationality vs residence split、与 DELF study 页差异 | 保留加深 | P1 | 不得写一个固定 residence/nationality language rule；不得固定 retake interval | `src/content/guides/tcf-irn-french-residence.md` | France cluster test；source-review-render；no fixed dynamic fact checks | 负责 Ministry nationality/residence procedure 核验；相邻 DELF 页面只处理具名 Sorbonne admissions | 待执行（窗口 B） |
| `guides/category/finland` | `src/pages/guides/category/[category].astro` + `src/data/guide-taxonomy.ts` | Finland / citizenship | derived category page; 1 consolidated guide remains verification-pending | derived from child page; reviewed but pending | 是，唯一子页仍 pending | category-thin / pending；重复页已移除 | 引导 Migri evidence list -> YKI product / other evidence comparison | Migri | Opetushallitus for YKI | 分类页仍无独立 source map，不作为内容落地页 | 主指南已承担完整分流，分类页无额外独立价值 | 窗口 B-3 已 noindex + 禁广告并从 sitemap 排除；不扩写为机械 hub | P0 | 不得说 YKI 是唯一或默认路径；不得保证 citizenship result | `src/data/guide-taxonomy.ts`；`astro.config.mjs`；Finland 主指南 | category noindex/ads/sitemap 测试；Finland consolidation test | 分类页仅保留导航聚合，不替代 Migri-first 主指南 | 已完成（窗口 B-3；noindex、禁广告、排除 sitemap） |
| `yki-finnish-citizenship` | `src/content/guides/yki-finnish-citizenship.md` | Finland / citizenship language-proof and YKI decision | `verification-pending` | `reviewed` | 是 | pending；duplicate 已通过合并消除；个案边界仍 unresolved | 用 Migri evidence list 比较 YKI 与其他证据，再在需要时核验 YKI product | Migri | Opetushallitus for YKI | 2026-07-29 已复核 evidence list、accepted YKI combination 与 OPH product boundary；个案证据、例外、旧证书和执行仍需官方确认 | 已补 evidence-path record、non-YKI evidence 边界、YKI combination、预订前核验、常见误区与下一步 | 窗口 B-3 已保留加深为唯一 Finland 主指南，吸收 comparison 页价值；因仍 pending，已 noindex、禁广告并从 sitemap 排除 | P0 | 不得保证 YKI 或其他 evidence 被接受；不得写 fixed session/fee/centre/result timing；不得保证 citizenship outcome | `src/content/guides/yki-finnish-citizenship.md`；content schema/layout；redirect、taxonomy、sitemap 与本文件 | Finland cluster test；content-integrity；redirect/canonical/sitemap/noindex/ads；source-review-render | 同时承担 Migri requirement 与 evidence comparison；OPH 仅负责 YKI 产品事实 | 已完成（窗口 B-3；正文加深，保持 pending/noindex/禁广告） |
| `yki-vs-other-finland-options` | 原路径 `src/content/guides/yki-vs-other-finland-options.md`；现 301 到主指南 | Finland / retired duplicate comparison route | 原 `verification-pending`；不再独立生成 | 原 `reviewed`；未变造历史状态 | 不再独立暴露 | duplicate route 已消除 | 原比较任务已吸收到主指南 | Migri | Opetushallitus for YKI | 不再维护第二套来源包 | 独立价值不足，已合并 | 窗口 B-3 已下线源文件并重定向；保留可恢复的 Git 历史 | P0 | 不得把重定向写成 Migri 认可、人工审核或 AdSense 通过 | 主指南；`public/_redirects`；`deploy/legacy-redirects.conf` | redirect、sitemap、canonical、无旧内链断言 | 不再是独立页面；全部任务由主指南承接 | 已完成（窗口 B-3；下线并 301） |

## 5. P0 / P1 / P2 优先级与执行顺序

优先级按 AdSense 低价值风险、thin 程度、pending 可见性、重复风险和来源/权威缺口排序。优先级表示整改先后，不等于页面已成熟、已可投放广告或已通过 AdSense。

### P0

1. **UK 两篇 + UK 分类页（已完成 B-1）**：两篇正文已经形成 route-first requirement check 与 provider-choice 的差异；两篇仍为 pending，分类页已 noindex、禁广告并从 sitemap 排除。本次只记录既有事实。
2. **Portugal 两篇 + Portugal 分类页（已完成 B-2）**：两页已形成 nationality-profile requirement 与 CIPLE product-verification 两个独立任务；两篇保持 pending，分类页已 noindex、禁广告并从 sitemap 排除。
3. **Finland 两篇 + Finland 分类页（已完成 B-3）**：比较页已并入 `yki-finnish-citizenship`，旧 slash/`.html` URL 已配置单跳 301；主指南保持 pending，主指南与分类页均已 noindex、禁广告并从 sitemap 排除。
4. **Italy 两篇 + Italy 分类页（已完成 B-4）**：两页已形成 citizenship-basis/evidence requirement 与 CILS/CELI/PLIDA product comparison 两个独立任务；两篇保持 pending，主指南和分类页均 noindex、禁广告并从 sitemap 排除。
5. **Canada 两篇 + Canada 分类页（已完成 B-5）**：两页已形成 exact Express Entry programme/accepted-test requirement 与 TEF Canada/TCF Canada product comparison 两个独立任务；两篇保持 pending，指南和分类页均 noindex、禁广告并从 sitemap 排除。
6. **Netherlands Inburgering 页 + Netherlands 分类页（已完成 B-6）**：Inburgering 已形成 procedure/authority/personal-record 工作流；具名 UvA/NT2 源文件保持只读，两篇均为终点；两篇指南与分类页保持 pending/noindex/禁广告并从 sitemap 排除。
7. **telc 三篇薄页（转窗口 C）**：内容价值风险为 P0，但 source/authority 修正不在窗口 B 执行；不得通过改状态字段提前解除 pending。

窗口 B 的已授权 P0 正文顺序已完成到 Netherlands B-6。本记录不据此继续 Spain、France 或窗口 C；telc 仍归窗口 C。

### P1

- `tef-canada-immigration`：窗口 B-5 已完成 programme-first requirement 和与 TCF comparison 页的差异，保持 pending/noindex/禁广告。
- Netherlands 分类页与 `staatsexamen-nt2-for-work-and-higher-education`：B-6 已完成 noindex/ads/sitemap/terminal 核对；NT2 源文件保持具名 UvA 范围并字节级未改。
- Spain 分类页及两篇指南：区分 citizenship procedure、DELE/CCSE requirement 与 level/alternative proof。
- France 分类页及两篇指南：区分具名 Sorbonne admissions 与 Ministry nationality/residence procedure。

### P2

本决策表覆盖的 12 篇薄指南和 8 个国家集群中暂无 P2 页面，不为填表人为降级。窗口 E 的公网、AdSense 账户、CMP、Search Console 和重新申请核验属于整体整改计划的 P2 运营工作，但不是本表页面正文优先级。
## 6. 后续窗口拆分

### 窗口 B 后续正文整改

本次文档对账完成后，继续按国家集群逐组处理，不批量扩写：

- UK：窗口 B-1 已完成本地正文与分类页整改；两篇仍保持 pending，本文件不把它们写成已成熟或公网已生效；
- Portugal：窗口 B-2 已完成本地正文、来源复核和分类页整改；两篇仍保持 pending，不代表公网或 AdSense 账户状态；
- Finland：窗口 B-3 已确认比较页独立价值不足并完成合并；旧 slash/`.html` URL 单跳 301 到唯一主指南，主指南与分类页均 noindex、禁广告并排除 sitemap，主指南保持 pending；
- Italy：窗口 B-4 已完成 current official-source 复核、citizenship requirement 与 CILS/CELI/PLIDA comparison 的任务拆分；两篇与分类页均保持 pending/noindex/禁广告并排除 sitemap；
- Canada：窗口 B-5 已完成 current IRCC/product-owner 复核、programme requirement 与 TEF/TCF comparison 的任务拆分；两篇与分类页均保持 pending/noindex/禁广告并排除 sitemap；
- Netherlands：窗口 B-6 已完成 IND/municipality/DUO/Mijn Inburgering-PIP 职责拆分与 UvA/NT2 任务边界；Inburgering 与只读 NT2 均为终点，两篇与分类页均 noindex、禁广告并排除 sitemap；
- Spain、France：仍待后续单独授权，保留 receiver-first 差异方向，分类页 noindex + 禁广告。

### 窗口 C

- telc 4 篇 source/authority matrix；
- TestDaF 4 篇 authority gate 和本地/公网/台账状态一致性；
- 不做作者/审阅重构，不新增 telc/TestDaF hub。

### 窗口 D

- About、Editorial Policy、guide author/reviewer 数据模型；
- 真实责任主体、AI 辅助边界和人工抽查记录；
- 不伪造个人、资质、人工审阅或官方认可。

### 窗口 E

- 公网 sitemap、robots、ads.txt、noindex、AdSense runtime、pending 标记抽查；
- AdSense Policy Center、Auto ads exclusions、CMP、Search Console 由授权负责人核验；
- 不部署、不改账户、不提交复审，除非项目负责人明确授权。

## 7. 后续测试建议清单

窗口 B 后续真正改正文或索引状态时，最小测试建议如下：

- 新增或更新 `tests/window-b-country-clusters.test.js`，覆盖 UK、Canada、Portugal、Netherlands、Italy、Spain、France、Finland 每个两页集群的：
  - 两个指南 slug 存在；
  - 每个保留页有不同 `decisionStage`、`primaryIntent` 或明确任务差异；
  - pending/noindex/ads 状态符合决策；
  - 合并页面的 redirect/canonical/sitemap 关系正确。
- 更新 `tests/adsense-risk-exposure.test.js`：
  - 两页薄分类页如果仍未深化，必须无 AdSense loader；
  - noindex 指南不得加载广告；
  - pending 指南不得进入广告候选。
- 更新 `tests/source-review-render.test.js`：
  - 不允许仅因 `sourceReviewStatus: reviewed` 就隐藏真实 pending；
  - authority URL、final decision authority、source review date 与渲染状态一致。
- 更新 `tests/content-integrity.test.js`：
  - related slugs 全部解析；
  - 合并后删除或重定向的 slug 不再被 active related link 指向；
  - 不出现重复 next-guide loop。
- 若分类页设置 noindex，新增 category render 断言：
  - `guides/category/uk`、`canada`、`portugal`、`netherlands`、`italy`、`spain`、`france`、`finland` 输出 `noindex`；
  - sitemap 不包含仍 thin/noindex 的两页国家分类页。

## 8. 原始决策窗口明确未做事项

以下仅描述 2026-07-28 的原始决策窗口，不覆盖后来已回写的 B-1 至 B-4 实施：

- 原始决策窗口未修改任何 `src/content/guides/*.md` 正文；
- 原始决策窗口未修改 `sourceReviewStatus`、`contentStatus`、`updatedDate`、author 或 reviewer 字段；
- 未新增广告位或商业功能；
- 未新增表单、邮件、支付、个人信息收集或第三方追踪；
- 未新增国家路线；
- 未修改 AdSense、CMP、Search Console 或任何外部账户；
- 未部署、未提交、未推送；
- 未把 AI/Agent/Codex 自查写成人工复核；
- 未承诺或保证 AdSense 复审通过。
