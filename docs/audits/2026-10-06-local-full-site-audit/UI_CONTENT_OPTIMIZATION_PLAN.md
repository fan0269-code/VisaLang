# VisaLang UI 与内容优化计划

日期：2026-10-06。此文为审计建议，不是已经批准的实现范围。先处理 AUDIT_REPORT.md 的 P0 线上访问与规划治理问题，再按阶段择项执行；不以增加页面数作为 SEO 目标，不删除、合并或改写 URL，除非另有数据、redirect 审核和 Owner 决定。

## 用户路径与页面结构

### 首页及入口

| 路由 | 当前任务 | 建议结构与界面重点 |
|---|---|---|
| /、/zh/ | 判断 VisaLang 可帮助什么、找到下一步 | 保持“官方核验导航工具”定位；首屏用地区/考试/阶段选择入口、一个可理解的示例结果、来源/个案边界和最近更新。英语/中文首页分别检查真实翻译，避免首页承诺资格结论 |
| /routes/ | 选择地区或申请路线 | 首屏先说明支持范围：configured、verify-only、unsupported 分开显示；每张路线卡显示决定机关和是否能出确定结果 |
| /exams/ | 选择考试产品 | 先展示 4 个 registry-backed 支持产品（按具体地区/级别），其余 27 个参考项标明 reference-only；过滤后保留空结果提示和回到路线入口 |
| /tools/ | 选择工具 | 以“你现在要完成的任务”排列 5 工具，不按代码名称排列；每项显示所需数据、输出、存储方式、不会做的事情 |
| /guides/ | 按目的/阶段/语言找指南 | 现有 Purpose/Stage/Language 筛选、搜索、排序和清空保持；卡片强调读者会带走的清单/问题/记录，source review 与编辑更新时间用两种标签区分 |
| /guides/category/[category]/ | 分类阅读 | 12 个闭合 category 已 noindex；先审真实读者任务和分类重复再决定可见性，不把分类页当自动 SEO 落地页 |

### 核心 hub 与信任页

| 路由组 | 建议 |
|---|---|
| /germany-family-reunion-a1/、/zh/germany-family-reunion-a1/ | 顶部增加“先问申请地使馆/任务”的短路径；把语言证明、证书/考试、预约与材料分层，工具只在已验证条件下给行动建议 |
| /germany-b1-settlement-citizenship/ | 永居、入籍和工作许可路径拆成不同入口；分开语言证明、Leben in Deutschland/入籍考试、一般资格和当地文件，默认引导主管地方机关 |
| /about/、/editorial-policy/ | 说明编辑流程、来源优先级、修订窗口、服务边界；将“最后审查”更新与高风险 claim source date 分开 |
| /contact/ | 保留实际可用的联系方式、接收者、响应承诺与投诉路径；未确认 inbox/SLA 不写“已收到/将回复”或自动提交成功 |
| /privacy-policy/、/cookie-policy/、/terms/ | 用图示或短摘要说明工具存储何时发生、用户如何清除、广告/分析何时触发、服务器日志限制；账户级同意机制仍待确认 |
| /affiliate-disclosure/、/partners/、/pricing/、/products/*、/route-review/ | 维持 noindex 与无虚假支付/交付措辞；用户只能看到真实可用状态，coming-soon 不链接到未上线结账流程 |
| /404.html | 给出返回首页、指南、工具的三条有效直链；保留 noindex，勿把不存在 URL 自动转到无关页面 |

## 五个核心工具的界面改进

所有工具共用的目标结果结构：结果标题 → 当前确定程度 → 结果依据/来源 → 需要用户核实的事项 → 可保存/打印/下载的产物 → 相关指南/下一步。颜色不是唯一状态提示；焦点滚动后标题不能被 sticky header 遮挡。语言切换保留有含义的字段，丢弃无效或高风险自由文本。错误状态必须给恢复动作。

| 工具 | 正常流程 | 错误/边界流程和优化 |
|---|---|---|
| Route Finder | 选国家→申请目的→已有证书/级别→看 route status 和权威核验下一步 | 缺少材料时给 needs_information；verify-only 转到主管机关；不将同一证书当成必然接受；改输入时旧结果即时失效 |
| Checklist Generator | 选路线与证据状态→逐项完成→导出或打印 | 空清单、来源待确认、localStorage/sessionStorage 被拒和导出失败均有本地 fallback；导出文件标示未知项/来源，不模拟已提交给机关 |
| Timeline Calculator | 输入非敏感日期/阶段→展示相对日期→下载/打印 | 非法、过去、跨年、闰日、跨度过长和时区边界给可理解错误；显示估算假设，不说处理时间或出证保证 |
| Exam Comparison | 精确成人/青少年产品、机构、考试版本→两列比较来源与边界 | 缺来源/失效版本回退 unknown；local fee 按国家/城市/中心/类别/日期区分；表格窄屏可读 |
| Reminder Planner | 本地列核验主题/到期日期→下载 ICS 或打印 | 说明只生成设备文件，不会发邮件、不创建日历事件；无邮箱栏；无日期或不可信来源时禁止生成似是而非的提醒 |

本次这些界面没有在浏览器里实测。以上是按组件与测试合同拟定的验收标准，不能写成已通过的用户流程。

## 61 篇指南逐页优化清单

处置规则：核心页优先保留与精确定位；支持页先确认意图、唯一产物、邻页职责和来源，再决定 maintain / one-task-fix / defer。流量没查到必须写 unknown。所有未决定项保持现有 URL、状态、noindex 与广告政策。每条高风险事实记录 URL、checked date、source owner、locator、supports、boundary。

### Germany A1：17 篇英文指南

| 页面 | 建议专属产物 |
|---|---|
| /guides/german-family-reunion-language-requirement/ | 申请前向本人所属德国使领馆/主管机关询问语言证明的问询单；区分通用概述与当地条件 |
| /guides/german-a1-documents-checklist/ | “我还要向哪个机关索取什么”材料核对表；用户指定申请地后才给该辖区官方链接 |
| /guides/german-a1-exam-booking-timeline/ | 由用户输入目标日期生成备考/报名相对计划；所有真实考试日期由所选中心核验 |
| /guides/german-a1-family-reunion-faq/ | 只收录确实未被其他页回答的疑问，标清答复人/机关；与 requirement 主指南保持 FAQ 与主流程区分 |
| /guides/goethe-a1-germany-family-reunion/ | 已持证用户可交给受理机关确认的证书信息卡；明确一般证书级别不自动决定个案接受 |
| /guides/goethe-a1-test-centers/ | 所选城市/考试中心的官方报名入口、日期/候补/考试身份核验清单，不给不存在的实时席位承诺 |
| /guides/goethe-a1-fees-by-country/ | 仅维护存在官方当前费率证据的地区行；显示币种、类别定义、来源日期与“付款前再核验” |
| /guides/goethe-a1-vs-telc-a1/ | 仅比较明确定义的 Goethe A1 与 telc A1 成人产品；签证/接收机关是否接受独立列为待核 |
| /guides/goethe-a1-pre-booking-checklist/ | 付款/提交前按证件姓名、考点、版本、价格来源逐项拦截的清单 |
| /guides/goethe-a1-booking-mistakes/ | 已报名/改名/付款后不同补救分支；引导原考点，不猜退款与改期政策 |
| /guides/goethe-a1-retake-policy/ | 向原 provider/中心询问补考范围、期限和费用的问题清单；不要从另一级考试推导 A1 |
| /guides/goethe-a1-official-links-practice-resources/ | 可带走的官方练习资源索引，分别标注 provider 与资源用途，避免“官方认可本网站”表达 |
| /guides/goethe-a1-30-day-study-plan/ | 30 天练习产物计划和自评，不承诺通过；链接到现行官方样卷 |
| /guides/goethe-a1-study-plan-working-adults/ | 适合碎片时间的 7 天重复节奏，和固定 30 天计划区分 |
| /guides/goethe-a1-listening-practice/ | 听力错误分类记录（数字/拼写/关键词），输出个人复习清单 |
| /guides/goethe-a1-speaking-topics/ | 开口练习提示卡，注明只是练习不是官方题库或考试押题 |
| /guides/goethe-a1-writing-practice/ | 写作自查表，区分格式/任务覆盖/可读性，不声称评分等同考官分数 |

### Germany B1：13 篇英文指南

| 页面 | 建议专属产物 |
|---|---|
| /guides/germany-b1-citizenship-language-proof/ | 入籍语言证明来源/类别核对卡；引用法定来源并指向申请人所在 Einbürgerungsbehörde |
| /guides/germany-b1-leben-in-deutschland-and-language-proof/ | B1 语言证书与入籍知识测试分别核对的双栏表 |
| /guides/germany-b1-settlement-citizenship-checklist/ | 永居与入籍分开的主管机关材料提问单；禁止混成一个通用资格清单 |
| /guides/germany-b1-settlement-citizenship-timeline/ | 用户确认的学习/报名日期规划；法定等待/处理时间未知时不填预测 |
| /guides/goethe-b1-germany-settlement-work/ | 工作/定居/入籍证明边界图；职业监管问题转 licensing authority |
| /guides/goethe-b1-study-plan/ | 多周可调整练习计划，不承诺达到 B1 |
| /guides/goethe-b1-difficulty-analysis/ | 诊断分项练习需要，不把主观难度误作通过率 |
| /guides/goethe-b1-fees-and-booking/ | 选择国家/城市/考试中心后核价和预约问题单 |
| /guides/goethe-b1-listening-deep-dive/ | 听力理解错误日志与复习动作 |
| /guides/goethe-b1-mock-exam-routine/ | 模拟考试准备/复盘单，不标成真实官方计分 |
| /guides/goethe-b1-speaking-topics/ | 交流练习提示卡，不暗示命题范围 |
| /guides/goethe-b1-writing-assessment/ | 写作自评维度、样例来源和人工反馈边界 |
| /guides/goethe-b1-vs-telc-b1/ | 只比较具体版本、模块、结果记录与中心/主管机关接受问题 |

### 其他国家、其他考试：15 篇英文指南

保持 noindex 及 verify-first，逐页核定其唯一用户意图和对应国家/机关。当地规则无法确认时，只给读者如何问的具体动作。

| 页面 | 需保持的独立范围 |
|---|---|
| /guides/cils-b1-cittadinanza-for-italian-citizenship/ | 意大利公民身份申请语言证明的主管机关 |
| /guides/cils-vs-celi-vs-plida-for-italian-citizenship/ | 实际主管机关确认之后比较考试的 provider 事实 |
| /guides/dele-a2-ccse-spanish-citizenship/ | 西班牙国籍路径的机关/考试分工 |
| /guides/dele-levels-spanish-citizenship/ | DELE 级别定义与具体国籍提交接受分别处理 |
| /guides/delf-b1-b2-french-work-study/ | 目标院校/雇主/职业主管机关分别决定标准 |
| /guides/dutch-inburgering-a2-b1-for-integration-and-citizenship/ | IND 与 DUO 程序按具体路线区分 |
| /guides/ielts-ukvi-uk-visa/ | UKVI 指定考试/产品及英国签证类别，直接到 GOV.UK 与官方 provider |
| /guides/languagecert-selt-uk-visa/ | SELT 具体版本/地点及当前 Home Office 认可列表 |
| /guides/portuguese-ciple-a2-for-citizenship-and-residence/ | 葡萄牙国籍与居留路径分开；考试接受由主管机关确认 |
| /guides/portuguese-language-for-golden-visa-and-citizenship/ | 先拆 residency category 与 nationality；不把黄金居留推成语言标准 |
| /guides/staatsexamen-nt2-for-work-and-higher-education/ | NT2 产品与目标大学/课程录取分别核验；逐课程官方来源 |
| /guides/tcf-canada-vs-tef/ | 只有用户先选 IRCC 申请类别后再比较 |
| /guides/tcf-irn-french-residence/ | 法国居留用途与 TCF IRN provider 事实分开，当前申请人向受理机关确认 |
| /guides/tef-canada-immigration/ | IRCC 官方项目要求先于考试介绍；版本/有效期由 IRCC 条目支持 |
| /guides/yki-finnish-citizenship/ | Migri/芬兰考试机构负责规则/级别，个人适用性转 Migri |

### telc 和 TestDaF：8 篇英文指南

| 页面 | 需保持的独立范围 |
|---|---|
| /guides/telc-b1-b2-exam-format-and-preparation/ | 按明确考试代码核对格式/分数；样卷链接日期与版次 |
| /guides/telc-b1-b2-fees-and-test-centers/ | 只有选定授权中心可以支持当地价格、日期和席位 |
| /guides/telc-b1-b2-germany-work-nursing/ | 把语言考试、雇主录用、执业认证和护理监管分别链接 |
| /guides/telc-vs-goethe-for-german-visa/ | 与 A1 比较页分开解释证书/主管机关边界；不预先替机关决定接受 |
| /guides/testdaf-germany-university-admissions/ | 目标学校和具体项目最终说明接受的证书/分数 |
| /guides/testdaf-levels-and-scoring/ | TestDaF provider 解释成绩表达，不能外推任何项目录取阈值 |
| /guides/testdaf-preparation-and-practice/ | 官方模拟题/备考动作 |
| /guides/testdaf-vs-goethe-dsh/ | 先选目标院校，再逐项呈现其接受规则；不做“德国全国统一排名” |

### 中文 8 篇指南

中文页面必须保留地域范围、status label 与对应英文页的真实语义，不从 A1 扩到 B1，不把翻译当独立来源复核。

| 页面 | 建议 |
|---|---|
| /zh/guides/german-a1-documents-checklist/ | 提供可复制的问询单；适用申请地未知时不填材料结论 |
| /zh/guides/german-a1-exam-booking-timeline/ | 日期规划同一共享计算契约，标出输入/公式/不保证项 |
| /zh/guides/german-family-reunion-language-requirement/ | 直接链接申请人所属使领馆的中文/本地程序入口 |
| /zh/guides/goethe-a1-30-day-study-plan/ | 练习安排与报考政策内容分开 |
| /zh/guides/goethe-a1-booking-mistakes/ | 付款前后分支和原报名中心联系动作 |
| /zh/guides/goethe-a1-germany-family-reunion/ | 个案证书接受明确为主管机关决定，link 到申请地 |
| /zh/guides/goethe-a1-test-centers/ | 所选中心/城市数据源、更新时间与候补限制 |
| /zh/guides/goethe-a1-vs-telc-a1/ | 双语对照按精确成人考试产品，不提供跨机构承诺 |

## 引用、审查与更新规范

每个高风险 claim 使用原子记录：claim ID/版本、读者任务、适用国家/地区/程序/考试产品/申请人类别、决定机关、source owner、可直达 URL、页面 locator、检查日期、source 支持的确切一句话、source 不能支持的结论、下次复查日期、所有消费页面与降级状态。

- 签证/居留/入籍：国家机关作一般规则；具体使领馆、地方外事/入籍机关控制所在地申请程序和材料。
- 考试：provider 负责产品格式/成绩规则；被选中的授权中心负责当地日期/费率/付款信息；受理签证、大学或雇主机构决定是否接受。
- 大学：目标 university/programme 才能决定某证书/分数/有效期是否满足录取，不从 DAAD 或其他学校推断。
- 费率/日期：区分币种、地区、成人/青少年、课程学员类别、报名阶段和页面有效年；不能证实就把数值换成“付款前打开这个官方页面并确认类别/总额”的步骤。
- 复核触发：法定/考试规则变化、源页面失效、checkedAt 到期、用户报告冲突、产品或当地分类变化。只在实际打开来源后更新 checkedAt。
- 没有 GSC/Analytics 数据时，把 search demand / traffic / conversion 标为 unknown。禁止按搜索词猜访问或“SEO 完成度”。
- 对 17 个 redirect/合并候选保持 HOLD；不能只为减少支持页而删除、301、升索引或改 canonical。

## 分期任务

| 阶段 | 目标和依赖 | 交付与完成门槛 |
|---|---|---|
| 0. 可达性与基线确认（P0） | 先由系统/站点 owner 从另一网络确认 521 的范围；不需要改站点文件 | 记录含 UTC 时间、用户代理、URL、状态、响应头/请求 ID（若有），Cloudflare 与 origin 相互核对；只有隔离区可复现时说明 |
| 1. 浏览器验收（P1） | CUA 可访问时；临时端口先确认未占用，不干扰其他项目 | 至少 1440×900、768×1024、390×844，英文/中文首屏/首页/A1 hub/B1 hub/工具结果；真实鼠标、键盘、错误恢复、图片截图与 SHA-256 |
| 2. 核心工具走查（P1） | 阶段 1 浏览器可用；只用合成数据 | 五工具各自正常/边界/错误/清空/恢复矩阵；无邮箱/付款/生产 API；可复制/打印/ICS 真实文件检查 |
| 3. 41 页价值与来源台账（P1） | 不依赖用户流量后台；owner 确认今后是否要内容变更 | 每页独有任务、相邻页分工、可用产物、来源和边界、intention/traffic unknown、处置 maintain / one-task-fix / defer；最多挑 3 个确定缺口 |
| 4. A1 费用/中心事实复核（P1） | 已于 2026-10-06 查验 Goethe Germany 与 Goethe Beijing 官方价目页；金额与范围未变，registry 的 2 个 claim / 4 fee rows 已刷新 `sourceCheckedAt`，`nextReviewAt` 为 2026-11-06 | 仅官方价目页已核验；未走 selected checkout，未确认实时席位或个体类别。结账前读者仍须使用选定中心页面确认；不得把页面价格写成交易保证或跨城市价格 |
| 5. 页面信息架构/内链（P2） | 阶段 2、3 中的用户任务证据可见，owner 选择 A1/B1 范围 | 首页→路线→对应工具→官方下一步无回环；每新增/改动内链由 focused test 覆盖；不扩到新国家 |
| 6. 隐私分析与变现评估（P2） | Owner 先决定数据目的、责任人、同意策略、广告账户状态 | 只提交方案和数据流图；无账户接入、无 tracking、无 AdSense/收费操作；未获审批保持 opt-out |

所有阶段必须加入 planning-map 同步和 VisaLang Independent Auditor 要求后，才能成为正式内容/实施窗口。
