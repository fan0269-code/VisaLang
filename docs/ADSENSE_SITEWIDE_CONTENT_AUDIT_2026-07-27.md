# VisaLang AdSense 全站内容审计（2026-07-27）

## 1. 审计结论

VisaLang 当前不适合立即再次提交 AdSense 复审。

问题不在“页面数量不足”或基础 SEO 缺失。当前工作树可以生成 101 个 HTML 路由，标题、描述、canonical、H1、结构化数据、内部链接和 sitemap 检查均通过。真正的高风险是：

1. 公开站点同时暴露大量“仍待核验、仍未提供、即将推出”的页面；
2. 一批指南的独立正文很短，页面的大部分可见文字来自所有指南共用的固定模板；
3. 广告运行时代码默认加载到绝大多数页面，包括错误页、`noindex` 法律页、未上线商业页和内容很薄的分类页；
4. 54 篇英文指南统一使用机构署名和角色复核，没有可核验的真实作者或审阅人身份；
5. 当前本地工作树、内容台账和公网 TestDaF 状态并不完全一致。

Google 没有公开统一的最低文章篇数或最低字数。本文的字数统计只是定位薄弱页面的内部审计工具，不是 Google 的通过标准。正式政策依据见：

- [AdSense 内容质量官方资料基线](./ADSENSE_CONTENT_QUALITY_OFFICIAL_SOURCES_2026-07-27.md)
- [Google：无发布商内容或低价值内容](https://support.google.com/publisherpolicies/answer/11112688?hl=en)
- [Google：AdSense 未批准原因](https://support.google.com/adsense/answer/81904?hl=en)
- [Google：创建以用户为中心的实用内容](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

整改只能降低明确风险，不能保证 AdSense 复审通过。

## 2. 审计范围与快照

### 本地仓库

- 仓库：`/Users/fanlw/Documents/考试网站维护/VisaLang`
- 分支：`main`
- 状态：本地落后 `origin/main` 1 个提交
- 受保护的既有修改：TestDaF 4 篇指南、指南路由逻辑、测试和若干文档
- 本次审计没有拉取、还原、暂存、提交、推送或部署

### 页面覆盖

| 页面组 | 数量 | 审计方法 |
|---|---:|---|
| 全部生成 HTML | 101 | 构建产物逐页统计主内容、H1、metadata、canonical、结构化数据和内部链接 |
| sitemap 可索引 URL | 95 | 本地 sitemap 与公网 sitemap 对比 |
| 英文 Markdown 指南 | 54 | 逐文件正文词数、状态、来源复核、分类、相似度和渲染模板占比 |
| 中文指南 | 8 | 构建输出、语言字符量、hreflang 和路由检查 |
| 工具页 | 6 | 源码、构建输出和现有功能测试 |
| 商业/产品页 | 5 | 可用状态、sitemap、广告运行时和公开文案 |
| 国家/路线分类页 | 12 | 内容量、子页数量、sitemap 和广告运行时 |

### 公网核对

2026-07-27 对以下公网内容进行了只读抓取：

- 首页、sitemap、robots.txt、ads.txt；
- 代表性薄页 `yki-vs-other-finland-options`；
- `/pricing/`、`/route-review/`、`/tools/`；
- 4 个 TestDaF 页面。

公网 sitemap 包含 95 个 URL。代表性薄页、定价页、Route Review 和工具页与本地构建哈希一致。4 个 TestDaF 公网页面仍是较早版本，和本地未提交加深稿不同。

## 3. 全站盘点

### 3.1 英文指南成熟度

| 状态 | 数量 |
|---|---:|
| `complete-route` | 17 |
| `core-route` | 13 |
| `starter-overview` | 8 |
| `verification-pending` | 16 |
| 合计 | 54 |

分类分布：

| 分类 | 数量 |
|---|---:|
| Germany A1 | 17 |
| Germany B1 | 13 |
| Germany TestDaF | 4 |
| Germany telc | 4 |
| UK、Canada、Italy、Spain、Portugal、Netherlands、France、Finland | 各 2 |

当前本地 frontmatter 显示 50 篇 `sourceReviewStatus: reviewed`，4 篇 telc 依赖默认 `pending`。公网 TestDaF 仍是旧版本，因此公网实际还有 4 篇 TestDaF 处于来源复核 pending。

更重要的是，渲染状态不等于 frontmatter 计数。当前本地构建中，24/54 篇英文指南仍会显示 `Official verification pending`：

- 16 篇 `contentStatus: verification-pending`；
- 4 篇 telc 缺少明确来源复核和权威字段；
- 4 篇 TestDaF 虽在本地补了来源复核，但仍缺少使页面通过 `authorityIsVerified` 门槛的 `primaryOfficialAuthorityUrl`，所以页面仍显示 pending。

公网 TestDaF 旧版的 pending 提示更多。也就是说，本地 P3 内容加深尚未让这 4 页成为“无 pending 的成熟公开页”。

### 3.2 正文深度

按 Markdown 独立正文统计（移除 frontmatter、URL 和 Markdown 标记）：

| 正文词数区间 | 页面数 |
|---|---:|
| 少于 150 词 | 12 |
| 150–299 词 | 16 |
| 300–499 词 | 15 |
| 500 词以上 | 11 |

少于约 150 词的 12 篇：

| 指南 | 约正文词数 | 内容状态 |
|---|---:|---|
| `yki-vs-other-finland-options` | 91 | verification-pending |
| `tcf-canada-vs-tef` | 93 | verification-pending |
| `portuguese-ciple-a2-for-citizenship-and-residence` | 103 | verification-pending |
| `cils-vs-celi-vs-plida-for-italian-citizenship` | 110 | verification-pending |
| `dutch-inburgering-a2-b1-for-integration-and-citizenship` | 111 | verification-pending |
| `portuguese-language-for-golden-visa-and-citizenship` | 111 | verification-pending |
| `languagecert-selt-uk-visa` | 122 | verification-pending |
| `ielts-ukvi-uk-visa` | 126 | verification-pending |
| `telc-vs-goethe-for-german-visa` | 132 | starter-overview / source pending |
| `telc-b1-b2-germany-work-nursing` | 133 | starter-overview / source pending |
| `telc-b1-b2-fees-and-test-centers` | 136 | starter-overview / source pending |
| `cils-b1-cittadinanza-for-italian-citizenship` | 149 | verification-pending |

其中 9 篇同时满足“独立正文少于约 150 词”和 `contentStatus: verification-pending`。

### 3.3 模板依赖

所有英文指南共享固定的：

- Direct answer；
- Who this applies to；
- Key decisions；
- What to verify officially；
- Common mistakes；
- Next action；
- Official sources；
- disclaimer、CTA 和 Related guides。

模板本身有助于安全说明和导航，但它使薄页在渲染后看起来有 500–580 个英文词，而真正来自该主题 Markdown 正文的内容只有约 90–150 词。

对最薄的一组页面，估算的“非独立正文占主内容比例”为 74%–82%。例如：

| 页面 | 独立正文 | 渲染主内容 | 非独立正文占比估算 |
|---|---:|---:|---:|
| `tcf-canada-vs-tef` | 约 94 词 | 约 530 词 | 约 82% |
| `yki-vs-other-finland-options` | 约 95 词 | 约 510 词 | 约 81% |
| `portuguese-ciple-a2-for-citizenship-and-residence` | 约 104 词 | 约 519 词 | 约 80% |
| `cils-vs-celi-vs-plida-for-italian-citizenship` | 约 111 词 | 约 542 词 | 约 80% |
| 4 篇 telc starter 页 | 约 132–148 词 | 约 569–582 词 | 约 74%–77% |

这不等于模板本身违规，但它说明这些 URL 的独特用户价值不足以由渲染后的总字数证明。

### 3.4 相似页面集群

正文词频相似度最高的页面对包括：

- Spain 两篇 citizenship 指南：约 0.776；
- Canada TEF/TCF 两篇指南：约 0.736；
- Portugal 两篇指南：约 0.689；
- Finland 两篇指南：约 0.659；
- 多组 Germany A1、B1 和 TestDaF 页面：约 0.60–0.75。

主题集群出现词汇重叠是正常的，不能只凭相似度判定重复内容。但对只有两篇短文、同一模板、同一官方来源和同一 pending 状态的国家集群，页面组合很容易呈现为批量替换国家/考试名的入口页。整改时应逐组证明两页解决不同任务，否则合并为一篇更完整的路线页。

### 3.5 分类页与导航页

8 个只有两篇指南的国家分类页主内容约 148–185 英文词：

- Finland
- Canada
- Portugal
- Netherlands
- Italy
- Spain
- UK
- France

这些页面主要由分类介绍和两张 Guide Card 组成，却在 sitemap 中可索引，并默认加载广告运行时。Google 明确不允许在仅承担导航或行为用途、没有足够发布商内容的页面展示广告。分类页可以保留导航作用，但应在“做成真正路线 Hub”和“noindex + 不加载广告”之间二选一。

`/tools/` 主内容约 90 英文词，也是导航 Hub，但已经显式禁用广告；5 个具体工具页也通过 `ToolLayout` 禁用广告，并且有可实际使用的交互功能。因此工具页不是本次最优先的低价值风险。

### 3.6 未上线商业页

以下 5 个 URL 全部在 sitemap 中可索引并默认加载广告运行时：

- `/pricing/`
- `/partners/`
- `/route-review/`
- `/products/a1-practice-pack/`
- `/products/a1-family-reunion-pack/`

公开文案反复出现：

- `Coming soon`
- `Not currently offered`
- `Price to be confirmed`
- `not yet a purchasable product`
- `not currently accepting submissions`

这些页面的边界说明很谨慎，但站点成熟度信号很差。对 AdSense 审核而言，公开索引多个“尚未提供”的产品/服务页，比保留一个简单的联系说明更像未完成站点。

### 3.7 广告运行时覆盖

当前构建的 101 个 HTML 页面中：

- 94 页加载 `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`；
- 7 页显式禁用：Guide Library、Tools Hub 和 5 个具体工具页；
- 6 个 `noindex` 页面仍加载广告运行时，其中包括 404、Privacy、Cookie、Terms、Editorial Policy 和 Affiliate Disclosure；
- 95 个 sitemap URL 中约 88 个加载广告运行时。

仅加载脚本不能证明 Auto ads 实际在每一页插入了广告，账户侧页面排除状态也没有在本次审计中读取。因此这里的结论是“源码存在可展示风险”，不是“已证明每页实际展示广告”。

但 404、noindex 法律页、导航型分类页和未上线商业页没有必要依赖账户侧排除兜底。源码应明确关闭这些页面的广告运行时。

### 3.8 作者、审阅与可信度

- 54/54 英文指南统一署名 `VisaLang Editorial team`；
- 当前本地 50 篇仅记录 `reviewedByRole: source-review`；
- 所有 Article JSON-LD 的 author 都是 Organization；
- About、Contact 和 Editorial Policy 没有真实作者、负责人或审阅人的可核验身份与背景；
- Editorial Policy 主动说明这些角色不是专业资质。

这不是 AdSense 公布的机械拒绝项，但 VisaLang 涉及签证、居留、公民身份和大学录取等高风险决策，读者会合理期待“谁写、谁审、如何审”。应补真实责任主体和方法透明度，但不能为审核伪造姓名、资历、人工审阅或批准状态。

### 3.9 已通过且不是主要问题的项目

以下项目当前表现良好：

- 101 个生成路由；
- 每页唯一 H1；
- title、description、canonical 完整且唯一；
- JSON-LD 可解析；
- 54 篇英文指南都有 Article/Breadcrumb 数据；
- 内部链接全部可解析；
- 10 对中英文 hreflang 互相对应；
- sitemap、robots.txt、ads.txt 可访问；
- 主要导航、移动端目标尺寸、reduced-motion 和 overflow 保护存在；
- 5 个具体工具有 WebApplication 数据和实际交互逻辑；
- Privacy、Cookie、Terms、Editorial Policy、Affiliate Disclosure、About、Contact 均存在；
- `npm test` 通过；
- `npm run launch-check` 通过：37 项通过、0 失败、`READY.`。

这些证明工程和结构基线良好，但不能推翻低价值内容结论。现有测试主要验证结构、路由、字段和边界，不评价页面是否提供足够独特价值。

## 4. 问题分级

### P0：复审前必须处理

#### P0-1：停止把未上线商业页作为公开成熟内容

处理 5 个商业页：

- 如果服务/产品没有真实交付，设为 `noindex`、从 sitemap 移除、停止广告运行时；
- 更简单的方案是暂时只保留一个非索引的状态说明页；
- 不要为了显得完整而编造价格、上线日期、退款条款或服务能力。

验收：

- sitemap 不再包含未上线产品/服务 URL；
- 页面不加载 AdSense runtime；
- 导航不把 Coming soon 项目当成站点主要价值入口。

#### P0-2：关闭无内容、noindex 和导航型页面的广告运行时

至少处理：

- 404；
- Privacy、Cookie、Terms、Editorial Policy、Affiliate Disclosure；
- 仅有两篇文章的薄分类页；
- 未上线商业页。

验收：

- 源码按页面类型显式设置 `enableAds={false}`；
- 构建检查能断言上述路由不包含 AdSense loader；
- 账户侧 Auto ads 排除单独由账户负责人核验，不把源码检查冒充账户证明。

#### P0-3：处理 24 篇可见 pending 指南

不要批量把状态改成 reviewed 来消除提示。逐页选择：

1. 完成权威来源、页面独特任务和真实人工复核后保留索引；
2. 仍有关键证据或内容缺口时 `noindex` 并停止广告；
3. 与同集群另一页不能形成独立价值时合并并设置正确重定向。

验收：

- 广告可投放指南不再显示 `Official verification pending`；
- `sourceReviewStatus`、`contentStatus`、权威 URL 和渲染提示语义一致；
- 真实 reviewer identity/role/date 与复核记录可追溯；
- 未完成页不会因为改字段而被伪装成完成。

#### P0-4：重写、合并或暂时下线最薄的 12 篇

目标不是达到某个字数，而是让每页完成一个独立用户任务。每页至少需要证明：

- 适用读者和不适用读者不同于相邻页面；
- 最终决定权和考试产品权分开；
- 有该国家/考试特有的事实、差异或决策步骤；
- 有本站自己的比较、记录表、核验清单、示例或错误恢复路径；
- 读完后用户能推进下一步，而不只是再次点击官方来源。

验收：

- 每页有明确、不同的主搜索意图；
- 独特正文不再主要依赖通用模板撑起；
- 相邻两页不能证明独立价值时完成合并和重定向；
- 由不同于撰写者的真实人工审阅者抽查，不以 Codex 自审代替人工审阅。

### P1：提高整站可信度与差异化

#### P1-1：重构两页国家集群

对 UK、Canada、Italy、Spain、Portugal、Netherlands、France、Finland 逐组决定：

- 深化成一个完整路线 Hub + 两个真正不同的任务页；或
- 合并为一篇完整路线指南，分类页 `noindex`；或
- 暂时从公开索引和 AdSense 范围移除。

#### P1-2：减少模板成为主要内容的情况

保留必要的安全边界，但不要在每页机械重复全部通用段落。可把重复说明缩成一致的 Trust/Disclaimer 组件，把页面主体留给：

- 本主题特有的证据；
- 对比表；
- 决策树；
- 示例记录；
- 场景化错误；
- 真实下一步。

#### P1-3：补真实的 Who / How / Why

- 公开真实作者或内容负责人；
- 公开真实审阅身份或明确不具名但可核验的组织责任信息；
- 说明来源选择、AI/自动化参与范围和人工复核方法；
- 不虚构资历，不把角色名当成专业资格。

#### P1-4：让公网状态与内容台账一致

- 先完成当前 TestDaF 工作树的所有权确认；
- 不把本地 `reviewed 50 / pending 4` 写成公网现状；
- 公网发布后单独验证 pending 标记、source date、权威链接、sitemap 和最终 release。

### P2：复审前的运营证据

- Search Console 的站点所有权、索引覆盖、sitemap 状态和主要查询仍需账户负责人提供；
- AdSense Policy Center 的具体页面、自动广告排除和 CMP 状态仍需账户侧核验；
- 复审前应做真实移动端浏览和无登录窗口网络检查；
- 复审提交日期、提交人和证据截图应记录，但不能把“已提交”写成“已通过”。

## 5. 建议的最简整改顺序

### 窗口 A：停止明显风险暴露

范围：

- 404/noindex/商业占位/薄分类页的广告运行时；
- 5 个商业占位页的 noindex 和 sitemap；
- 不改指南事实。

完成标准：

- 相关页面不加载广告；
- 未上线商业页不再作为可索引成熟内容；
- focused tests、`npm test`、`npm run launch-check`、`git diff --check` 通过。

### 窗口 B：清理 12 个最薄指南和 8 个两页国家集群

范围：

- 先做逐页保留/合并/noindex 决策；
- 一次只处理一个国家集群；
- 不批量扩写。

完成标准：

- 每个保留 URL 有独立用户任务和原创增值；
- 被合并 URL 有正确 canonical/301；
- 无 pending 页面进入广告资格。

### 窗口 C：完成 telc 和 TestDaF

范围：

- 4 个 telc；
- 4 个 TestDaF；
- 只修来源复核、权威入口、页面差异和渲染状态。

完成标准：

- 不伪造 source review；
- 公网页面不再显示与真实状态矛盾的 pending；
- 内容台账、本地构建和公网一致。

### 窗口 D：作者与人工审阅

范围：

- About、Editorial Policy、author/reviewer 数据模型；
- 真实人工审阅记录。

完成标准：

- 读者可以判断谁负责、如何复核；
- 不把 AI/Codex 审查写成人工批准；
- 高风险页面保留真实复核身份、角色和日期。

### 窗口 E：公网复核与重新申请

完成标准：

- 生产部署和 rollback 已单独验证；
- 公网 sitemap、代表性页面、noindex、ads runtime 和 pending 标记检查通过；
- AdSense/CMP/Auto ads 账户侧证据由授权负责人核对；
- 真实人工抽查完成；
- 之后才提交复审。

## 6. 当前复审门槛

满足以下条件前，不建议重新申请：

- [ ] 5 个未上线商业页不再作为可索引、可广告内容；
- [ ] 404 和 noindex 法律页不加载广告运行时；
- [ ] 8 个薄分类页已深化或 noindex + 禁用广告；
- [ ] 24 个可见 pending 指南已逐页完成、合并或 noindex；
- [ ] 12 个最薄正文页面不再主要依赖模板；
- [ ] telc/TestDaF 本地、台账和公网状态一致；
- [ ] 真实作者/审阅责任和人工抽查已记录；
- [ ] `npm test`、`npm run launch-check`、`git diff --check` 通过；
- [ ] 公网部署、sitemap、代表性页面和广告排除已复核；
- [ ] AdSense 账户侧 Policy Center、CMP 和 Auto ads 排除由授权负责人确认。

即使全部完成，也只能说明明显风险已被处理，不能保证 Google 批准。

## 7. 本次验证结果

- `npm test`：通过；
- `npm run build`：通过，101 pages；
- `npm run launch-check`：通过，37 pass / 0 fail，`READY.`；
- 公网首页：HTTP 200；
- 公网 sitemap：95 URL；
- 公网 robots.txt：允许抓取并指向 sitemap；
- 公网 ads.txt：存在 Google DIRECT seller 行；
- 公网代表性薄页、商业页和工具页与本地构建一致；
- 公网 TestDaF 与本地未提交稿不同，仍保留更多 pending 输出；
- 未读取 Search Console、AdSense、CMP 或 Auto ads 账户设置；
- 未提交、推送或部署。
