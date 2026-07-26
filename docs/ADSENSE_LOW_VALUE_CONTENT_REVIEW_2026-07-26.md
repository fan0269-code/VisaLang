# VisaLang AdSense “低价值内容”官方要求与仓库对照审查

- 检查日期：2026-07-26
- 审查对象：`visalang.org`
- 仓库基线：`0463c3df2fae64485e3baa634f675b7da0bb1896`
- 工作分支：`codex/adsense-low-value-remediation`
- 资料范围：Google AdSense Help、Google Publisher Policies Help、Google Search Central
- 研究子任务边界：先只读对照并写入本记录；后续整改在同一隔离分支实施，结果见第八节

## 结论

AdSense 后台截图只足以确认：`visalang.org` 当前审批状态是“需要注意”，状态详情是“低价值内容”，`ads.txt` 是“已授权”。它不能证明 Google 依据了哪一个页面、哪一项信号，也不能证明只有一个问题。

Google 的公开文件没有规定可保证通过审批的最少文章数、最少字数、最低流量或建站时长。Google 要求的是站点具有足够的原创、相关和有用内容，提供良好体验与清晰导航，可由 AdSense 访问，并符合全部发布商政策。Google Search Central 还明确说明，Google 没有偏好的固定字数。

本仓库已经具备明确主题、54 篇英文指南、站内导航、编辑政策、官方来源字段、公开 `ads.txt`，并主动在工具页和指南索引页关闭广告脚本。但仍有两个应在复审前处理的高优先级风险：

1. `BaseLayout` 默认启用 AdSense，404 页和标记为 `coming-soon`、`unavailable`、`contact-only` 的商业页没有显式关闭广告。Google 明确禁止在错误页、建设中页面以及无发布商内容或低价值内容的屏幕展示 Google 广告。广告脚本存在不等于广告一定展示，但这些页面当前具备被 Auto ads 选中的代码条件。
2. 54 篇英文指南中，仓库自身标记 8 篇为 `starter-overview`、16 篇为 `verification-pending`。这些内部标签不等于 Google 的“低价值内容”判断，但它们是复审前进行逐页原创价值与完成度审查的合理优先队列。不能用批量加字或复用模板文字代替实质改进。

因此，当前证据支持“先完成站点级整改和账号侧核对，再申请复审”，不支持“现在已经可以保证通过”。

## 一、官方要求登记

下表的“允许支持的结论”是该来源可用于本次审查的范围；“边界”说明它不能证明什么。

| 官方来源 | 检查日期 | 允许支持的结论 | 边界 |
| --- | --- | --- | --- |
| [What to do when your site isn't ready to show ads](https://support.google.com/adsense/answer/12176698) | 2026-07-26 | 未准备好可能涉及广告代码、站点不可访问、独特内容/体验不足或政策问题；修复后可从 Sites 页申请复审；通常数日，部分情况 2–4 周 | 是通用故障分类，不披露 VisaLang 的具体拒绝页面或评分 |
| [Check the status of your AdSense sites](https://support.google.com/adsense/answer/12170222) | 2026-07-26 | “Needs attention”表示提交复审前仍需修复问题；“Authorized”只表示 `ads.txt` 找到发布商 ID；账号未激活时可能还有付款资料等任务；不要删除网站再重新提交，以免延迟 | `ads.txt` 已授权不等于网站内容已获批；仓库不能读取账号任务 |
| [Eligibility requirements for AdSense](https://support.google.com/adsense/answer/9724) | 2026-07-26 | 内容应高质量、原创并能吸引受众；须符合 AdSense 政策；申请人须满足年龄要求并可访问所提交网站的 HTML 源码 | 未给出保证审批的最低文章数、字数、流量或站龄 |
| [Make sure your site's pages are ready for AdSense](https://support.google.com/adsense/answer/7299563) | 2026-07-26 | 页面应有独特、原创、相关内容；布局应帮助用户找到所需内容；导航应易读、可用；使用外部资料时必须加入自己的专业知识、改进建议、评论或观点 | “独特/有趣”需站点和页面整体判断，不能由单个元数据字段或字数自动证明 |
| [Google Publisher Policies](https://support.google.com/publisherpolicies/answer/10502938) | 2026-07-26 | 禁止在无发布商内容、低价值内容、建设中、仅用于提醒/导航等屏幕展示 Google 广告；也禁止无增值的复制内容和广告/付费推广多于发布商内容 | 说明广告库存政策，不给出本次站点审批所命中的具体 URL |
| [Google-served ads on screens without publisher-content](https://support.google.com/publisherpolicies/answer/11112688) | 2026-07-26 | 发布商内容应是用户访问网站的主要原因；错误、登录、退出、感谢等无内容/死胡同页、建设中页，以及未经人工审核的自动生成内容不应展示广告 | 不能据此把所有短页面都自动判为违规；需看页面用途与实际内容 |
| [Google-served ads on screens with replicated content](https://support.google.com/publisherpolicies/answer/11190248) | 2026-07-26 | 复制、轻微改写、镜像、抓取、未人工审核的自动生成内容，或无实质增值的外部内容聚合不可展示 Google 广告；应提供专业知识、评论、策划或其他原创增值 | 引用官方来源本身不是复制违规；问题在于是否有实质原创增值 |
| [More ads or paid promotional material than publisher-content](https://support.google.com/publisherpolicies/answer/11169917) | 2026-07-26 | 广告和其他付费推广不应超过发布商内容；页眉、页脚、空白及仅指向站内其他内容的链接不计为发布商内容 | 没有给出统一像素比或广告单元数量阈值 |
| [AdSense Program policies](https://support.google.com/adsense/answer/48182) | 2026-07-26 | 广告不得放在非内容页、专为展示广告创建的页面或误导导航中；展示广告的网站应易于导航 | 合规是持续责任，不代表满足这些条款就一定获批 |
| [Fix AdSense crawler issues](https://support.google.com/adsense/answer/2381908) | 2026-07-26 | 需排除登录、IP/地区限制、robots、WAF、404、多重重定向、服务器或 DNS 等导致 AdSense 爬虫无法访问的问题 | 本地仓库不能证明生产 WAF、DNS、日志与 Google 最近一次抓取结果 |
| [Give access to the AdSense crawler in robots.txt](https://support.google.com/adsense/answer/10532) | 2026-07-26 | 若 `robots.txt` 明确阻止 `Mediapartners-Google`，AdSense 将无法抓取并投放广告 | 仓库文件允许抓取，不等于生产响应、WAF 和缓存同样允许 |
| [Connect your site to AdSense](https://support.google.com/adsense/answer/7584263) | 2026-07-26 | Google 会审查整个站点；代码应连接正确；审批通常数日，部分情况 2–4 周 | 无法从代码仓库确认账号是否在本次抓取中识别到代码 |
| [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | 2026-07-26 | 自查应覆盖原创信息/分析、完整性、相对搜索结果的增值、清晰来源、作者背景、站点焦点和读者能否完成目标；Google 没有偏好的固定字数 | 这是 Search Central 的内容自查指导，不是 AdSense 审批分数公式 |
| [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies) | 2026-07-26 | 应避免为搜索排名批量生成缺少原创价值的页面、近似页面/doorway、抓取或轻微改写内容、无增值的薄联盟页 | 不能仅凭站点存在多篇同模板文章就判定为滥用；目的、原创性和实际价值仍需逐页审查 |
| [Required content: privacy policy](https://support.google.com/adsense/answer/1348695) | 2026-07-26 | 隐私政策应披露 Google 等第三方使用广告 Cookie、个性化广告用途和用户退出个性化广告的方式 | Google 不提供适用于每个司法辖区的完整法律文案；本审查不作法律合规结论 |
| [Google consent management requirements](https://support.google.com/adsense/answer/13554116) | 2026-07-26 | 在 EEA、英国、瑞士向用户投放个性化广告时，发布商需使用 Google 认证并集成 IAB TCF 的 CMP；Google Privacy & messaging 的欧洲法规消息是认证方案 | 是否启用、覆盖哪些地区、配置是否正确属于 AdSense 账号与生产运行时事实，不能由仓库文案证明 |
| [Publisher integration with the IAB Europe TCF](https://support.google.com/adsense/answer/9804260) | 2026-07-26 | IAB TCF v2.3 的强制截止日是 2026-03-01；没有 Purpose 1 的同意时不应调用 Google 广告标签 | 是否产生有效 TC string 需在生产地区流量和账号/CMP 配置中验证 |

## 二、“低价值内容”可以与不可以如何解释

### 官方资料支持的解释

- 这是站点尚未满足发布商内容价值或用户体验要求的状态，可能同时涉及独特内容不足、导航/体验、不可访问或其他政策问题。
- Google 关注内容是不是用户访问页面的主要原因，页面是否真正帮助用户完成目标，以及引用外部来源时是否增加了原创分析、专业知识、评论或策划价值。
- Google 会审查整个网站，而不仅是首页或某一篇长文章。
- 404、建设中、仅导航/提醒、无发布商内容、未人工审查的自动生成内容，以及无实质增值的复制内容，是明确的广告库存风险。

### 官方资料不支持的推断

- 不能声称“少于 N 篇文章”“每篇少于 N 字”“日访问量少于 N”就是拒绝原因。
- 不能声称把每篇文章扩充到某个固定字数就能通过。Search Central 明确说 Google 没有偏好的固定字数。
- 不能声称 `ads.txt` 已授权就代表内容审核合格；这是两个独立状态。
- 不能把一次后台状态直接归因于 AI、模板、页面日期、域名年龄、流量或某一篇文章，除非 Google 在 Policy center 或站点详情中给出更具体证据。
- 不能保证整改后通过，也不能保证复审时长。

## 三、VisaLang 仓库只读对照

### 已有正向基础

1. **主题明确**：站点聚焦语言考试与签证、居留、入籍、留学、工作路径中的语言证明核验。
2. **具备内容规模但不以数量作为合格证明**：`src/content/guides/` 有 54 篇英文指南。
3. **有结构化导航**：全局导航包含 Routes、Exams、Tools、Guides、About；指南存在分类、前后关系、相关指南和面包屑。
4. **有信任与来源框架**：指南数据记录 `sourceReviewStatus`、`sourceReviewedAt`、责任角色、最终决定机构类型和官方 URL；页面展示来源复核状态与免责声明。
5. **部分非文章页面已主动排除广告**：`ToolLayout.astro`、`src/pages/tools/index.astro` 和 `src/pages/guides/index.astro` 显式传入 `enableAds={false}`。
6. **仓库层面的基础可抓取性正常**：`public/robots.txt` 对所有爬虫为 `Allow: /`；`public/ads.txt` 包含截图所示发布商 ID。该结论只覆盖仓库文件，不覆盖生产响应、WAF 或 Google 最近一次抓取。
7. **有隐私和编辑披露**：存在 About、Contact、Editorial Policy、Privacy Policy、Cookie Policy 和 Affiliate Disclosure 页面。

### P0：复审前应修复的明确广告库存风险

#### 1. 404 页加载 AdSense 脚本

- `src/layouts/BaseLayout.astro:31` 将 `enableAds` 默认为 `true`。
- `src/layouts/BaseLayout.astro:65` 在启用时加载 AdSense 脚本。
- `src/pages/404.astro:5` 使用 `BaseLayout`，但没有传入 `enableAds={false}`。
- Google 的无发布商内容政策明确把错误页列为不应展示广告的页面类型。

**允许下达的修复结论**：404 页必须显式关闭 AdSense；同时在 AdSense Auto ads 的页面排除设置中核对生产 404 URL 是否被排除。

**边界**：代码加载脚本不证明 Auto ads 实际在该次审核时展示了广告，也不证明这就是拒绝原因。

#### 2. “建设中/不可用/仅联系”的商业页继承广告默认值

- `src/components/products/CommercialPageShell.astro:17` 使用 `BaseLayout`，未传入 `enableAds={false}`。
- `/products/a1-practice-pack/` 与 `/products/a1-family-reunion-pack/` 标记为 `coming-soon`。
- `/route-review/` 标记为 `unavailable`。
- `/partners/` 标记为 `contact-only`。
- 这些页面的正文分别说明产品、价格、交付、申请或服务尚未开放/确认。

**允许下达的修复结论**：至少对 `coming-soon`、`unavailable`、`contact-only` 页面显式关闭 AdSense；逐页决定这些页面是否仍应公开索引和出现在主要导航中。Google 明确禁止建设中或无有效发布商内容的页面展示广告。

**边界**：`pricing` 当前标记为 `available` 且有实质说明，不能仅因是商业页自动判为低价值；是否保留广告仍应按“发布商内容是否是用户访问主因、推广是否超过内容”逐页判断。

### P1：需要人工逐页判断的内容风险

#### 3. 24 篇指南被仓库自身标记为未达到最高内容成熟度

只读统计结果：

- `complete-route`：17
- `core-route`：13
- `starter-overview`：8
- `verification-pending`：16

**允许下达的审查结论**：将 8 篇 `starter-overview` 和 16 篇 `verification-pending` 作为复审前的优先审查队列。每页至少回答：

- 是否提供了超出官方页面摘要/改写的原创决策帮助？
- 是否把适用对象、关键差异、常见错误和下一步讲完整？
- 读者看完是否能完成一个具体目标，而不只是再去搜索同一问题？
- 相似指南之间是否有清楚而实质的不同，不只是国家、证书或关键词替换？
- 作者/编辑责任、来源和复核方法是否准确透明？

**边界**：内部 `contentStatus` 与 Google 状态没有一一映射。`verification-pending` 可能是诚实的风险披露，不等于低价值；`complete-route` 也不自动等于高价值。

#### 4. 统一模板增强一致性，但不能替代每页原创价值

`GuideLayout.astro` 为全部指南生成相同的 Direct answer、Who this applies to、Key decisions、What to verify officially、Common mistakes、Next action 和 Official sources 结构。这有助于导航和责任边界，但 Google 要求页面相对其他来源提供实质原创增值，并警告大量近似页面或缺少增值的批量内容。

**允许下达的审查结论**：逐页检查真正由该主题产生的独特正文、比较逻辑、工具化清单或案例边界；删除没有独特用户任务的重复页面，或在完成前不投放广告/不参与主要索引。

**边界**：使用共享模板本身不是违规；本次只读审查未进行全站外部重复内容检测，也未证明任何一页是自动生成或复制。

#### 5. 作者身份与制作方法可以更透明，但不能虚构资历

指南使用 `VisaLang Editorial team` 作为作者，并公开编辑政策与来源复核角色。Search Central 建议让读者清楚“谁”创建内容、作者背景是什么，以及在合理需要时说明“如何”制作内容。

**允许下达的审查结论**：补足真实、可核验的编辑责任、作者/审核者背景和制作方法说明；若只有团队署名，应解释团队角色和审核流程。

**边界**：不能为通过审核虚构个人作者、资历、经验、机构背书或审核历史；Google 也没有要求所有页面必须使用个人署名。

### 暂不能由仓库确认的生产事实

- AdSense 在最近一次审核中抓取到的是哪个部署版本。
- `https://visalang.org/robots.txt`、各核心页面与 `ads.txt` 在 Google 抓取时的实际状态码、重定向链和缓存。
- Cloudflare/WAF 是否对 `Mediapartners-Google` 或 `Google-Display-Ads-Bot` 有地区、IP、速率或挑战限制。
- Auto ads 是否在 404、法律页、商业状态页或其他薄页面实际展示。
- Search Console 的索引覆盖、重复页、软 404、抓取异常、人工处置和核心页面自然搜索表现。
- 是否存在站外复制、被抓取内容、异常生成页、隐藏子域或历史部署残留。

## 四、账号侧必须人工核对的事项

以下事项不能从前端代码或仓库推断：

1. **站点详情**：点击 AdSense Sites 中的 `visalang.org`，记录 Google 是否提供比“低价值内容”更细的提示或页面示例。
2. **Policy center**：确认是否同时存在站点级、页面级政策问题、监管问题、广告偏好限制或爬虫错误。
3. **账号首页必做任务**：确认付款资料、身份/年龄、地址、电话或其他账号设置是否仍待完成。Google 说明未完成必做任务会阻止审查推进。
4. **站点所有权与连接**：确认 AdSense 是否检测到当前发布商代码，或 Search Console 所有权是否已在同一 Google 账号下验证。
5. **正确站点 URL**：确认提交的是 `visalang.org`，并检查 `www`、HTTP、HTTPS 的跳转和最终域名一致。
6. **Auto ads 页面排除**：核对并排除 404、建设中、不可用、仅联系/意向页，以及任何尚未完成实质价值审查的页面。
7. **Privacy & messaging**：确认 Google 欧洲法规消息实际启用、覆盖 EEA/英国/瑞士，并已经使用当前要求的认证 CMP / TCF v2.3。仓库中的隐私政策文字不能证明账号配置已生效。
8. **生产爬虫状态**：在 AdSense 的 Crawler access/错误页面和服务器/WAF 日志中确认没有抓取阻断。
9. **流量与受众**：用 Search Console/Analytics 核对主要落地页、查询和用户任务。Google 要求内容能吸引受众，但官方未公布可保证审批的最低流量。
10. **复审历史**：记录上次提交、拒绝和本次修复时间，避免没有实质变化就反复提交。

## 五、复审前官方清单

### A. 内容与用户体验

- [ ] 全站每个公开页面都有明确用户目的，正文是访问该页的主要原因。
- [ ] 逐页确认原创信息、分析、比较、流程、清单或其他实质增值，不只是改写官方资料。
- [ ] 优先审查 8 篇 `starter-overview` 与 16 篇 `verification-pending`；保留、深化、合并或暂不公开应有逐页理由。
- [ ] 相似国家/考试/路线页不是仅替换实体名称的近似页面。
- [ ] 标题准确描述正文，不承诺页面无法提供的服务或答案。
- [ ] 全局、移动端、分类、面包屑与站内链接可用，用户能快速找到目标内容并继续下一步。
- [ ] 作者/编辑责任、来源和审核方法准确透明，不虚构资历。
- [ ] 外部引用、图片或嵌入有明确原创评论/策划价值并符合知识产权要求。

### B. 广告库存与页面范围

- [ ] 404 和其他错误/死胡同页面不加载 AdSense。
- [ ] `coming-soon`、`unavailable`、`contact-only` 或建设中页面不加载 AdSense。
- [ ] 工具索引、指南索引及其他主要为导航/筛选用途的页面继续不加载 AdSense。
- [ ] 页面上的广告和付费推广不超过发布商内容。
- [ ] Auto ads 页面排除与代码层关闭一致。
- [ ] 未经人工审核的自动生成内容不加载广告。

### C. 技术可访问性

- [ ] 正确提交 `visalang.org`，站点已发布并可公开访问，无登录保护。
- [ ] HTTPS 证书有效，HTTP 正确跳转到 HTTPS。
- [ ] 首页、代表性指南、404、`robots.txt`、`ads.txt` 的生产状态码和重定向链已实际验证。
- [ ] `robots.txt` 未阻止 AdSense 爬虫，WAF/CDN 未挑战或封禁相关爬虫。
- [ ] AdSense 代码位于正确站点的 `<head>` 中，且账号能检测到。
- [ ] `ads.txt` 保持发布商 ID 完全一致；“已授权”作为独立检查项保留。
- [ ] Search Console 已核对索引、软 404、重复页、抓取异常和人工处置。

### D. 政策与账号

- [ ] 已检查 Google Publisher Policies、AdSense Program policies 与 Policy center 的全部当前问题。
- [ ] 隐私政策包含 Google 广告 Cookie、个性化广告用途和退出方式等必要披露。
- [ ] Privacy & messaging/CMP 在账号和生产地区流量中实际生效，TCF v2.3 配置已核对。
- [ ] AdSense 首页的付款、身份、年龄、所有权等必做任务全部完成。
- [ ] 对无法由代码证明的账号事实保留截图或操作记录，不以仓库文案代替。

## 六、申请复审步骤与停止条件

Google 官方流程：

1. 登录 AdSense。
2. 打开 **Sites**。
3. 点击需要审核的 `visalang.org`。
4. 确认站点已放置 AdSense 代码。
5. 点击 **Next**。
6. 点击 **Request review**。

提交后通常需要数日，部分情况为 2–4 周。不要删除网站后重新添加，因为 Google 明确提示这可能延迟处理。

### 可提交条件

- 上述 A–D 清单已有当前证据；
- 404 与建设中/不可用页面已从广告范围移除；
- 24 篇较低内部成熟度指南已逐页形成保留、深化、合并或暂不公开的决定；
- Policy center 与账号首页无未处理必做项；
- 生产抓取、代码检测与 CMP 已由账号/生产环境实际验证。

### 必须停止、不得代替用户提交的条件

- 账号页面仍显示未解释的政策或设置任务；
- 无法访问 Policy center、Privacy & messaging、Search Console 或站点详情；
- 只能证明本地代码，不能证明生产版本和爬虫访问；
- 只完成批量加字、改日期或模板扩充，没有逐页原创价值审查；
- 提交按钮将触发新的外部审核，但尚未得到账号所有者对最终状态的确认。

## 七、建议整改顺序

1. **P0 广告范围**：关闭 404、`coming-soon`、`unavailable`、`contact-only` 页面广告；核对 Auto ads 页面排除。
2. **P0 生产与账号证据**：检查 Policy center、站点详情、必做任务、爬虫访问、Search Console、CMP/TCF v2.3。
3. **P1 内容价值**：优先逐页审查 24 篇 `starter-overview` / `verification-pending`，不采用统一字数指标。
4. **P1 相似页与作者透明度**：检查近似页面的独特任务和原创增值，补充真实的作者/编辑与制作方法信息。
5. **完整验证**：执行项目测试、构建、启动检查，并对生产核心路由、错误页、广告脚本范围、`robots.txt`、`ads.txt` 做独立验证。
6. **人工确认后复审**：只有账号侧与生产证据齐全时，再由账号所有者确认并点击 **Request review**。

## 八、本地整改实施结果

实施日期：2026-07-26。以下结论只覆盖分支 `codex/adsense-low-value-remediation` 的本地构建，不代表已推送、已部署或已通过 AdSense 复审。

### 已实施

1. **广告改为默认关闭**：`BaseLayout` 的 `enableAds` 默认值由 `true` 改为 `false`。首页、Germany A1/B1 路线页和进入当前主要发现范围的英文指南显式启用广告。
2. **错误页与未开放商业页退出广告范围**：404、`coming-soon`、`unavailable`、`contact-only` 页面均不加载 AdSense；未开放商业页同时使用 `noindex,follow`。
3. **建立保守的主要发现门禁**：只有 `sourceReviewStatus: reviewed` 且内容状态为 `complete-route` 或 `core-route` 的英文指南，才进入主指南库、sitemap 和广告范围。这是可审计的库存收缩规则，不等于逐页高价值证明，也不保证 AdSense 审批。
4. **24 篇低成熟度指南暂不进入主要发现面**：
   - `starter-overview`：4 篇 TestDaF、4 篇 telc；
   - `verification-pending`：英国、加拿大、意大利、西班牙、法国、芬兰、荷兰、葡萄牙各 2 篇。
   这些旧 URL 仍生成并可由直接地址访问，避免删除造成断链；页面统一 `noindex,follow`、不加载广告，并退出主指南库和 sitemap。恢复资格必须完成页面级来源与原创价值复核，不能只增加字数或修改日期。
5. **主导航不再直接推广未完成指南**：Study 与 Work 入口改为 Route Finder，避免把未完成 TestDaF/telc 草稿作为主要路线落地页。
6. **sitemap 与页面状态保持一致**：构建后脚本自动移除所有生成 HTML 中带 `noindex,follow` 的 canonical URL；launch check 同时验证 noindex 页面不在 sitemap 且不加载 AdSense。
7. **About 页面公开说明发现范围**：展示当前主要指南库数量，并明确元数据门禁不是质量或 AdSense 审批保证；被暂缓页面必须经过逐页编辑审查才能重新进入主要发现面。
8. **商业页按页记录广告决定**：`pricing` 保持可索引，因为它准确说明当前免费/未开放服务状态；但它是商业状态与导航页面，广告会与页面目的混淆，因此显式保持无广告。`coming-soon`、`unavailable`、`contact-only` 页面继续无广告并 `noindex,follow`。

### 24 篇页面逐页处置记录

下表记录的是本次复审前的保守处置，不是 Google 对单页价值的判断。判断维度包括：页面是否有独特用户任务、当前来源复核状态、是否已有足够的原创决策帮助、与相邻页面是否可能重叠，以及仍需补齐什么。所有页面当前决定均为“保留旧 URL 供直接访问，同时退出主要发现、sitemap 与广告；完成所列页面级工作后再决定深化、合并或恢复”。没有使用统一字数阈值。

| 页面 | 当前独特任务 | 当前证据与页面级缺口 | 本次决定与理由 |
| --- | --- | --- | --- |
| `testdaf-germany-university-admissions` | 判断 TestDaF 与德国大学申请的关系 | `starter-overview`，来源复核仍为 pending；需要把大学/项目决定权、成绩要求核验和申请分支形成可复核的独特流程 | 保留并深化；任务独立于备考和分数页，但来源门未完成 |
| `testdaf-levels-and-scoring` | 解释 TDN 3/4/5 与成绩使用 | `starter-overview`，来源复核仍为 pending；需要核对当前评分规则，并区分“成绩说明”和院校接受结论 | 保留并深化；与招生页不同，但不可把分数说明代替院校决定 |
| `testdaf-preparation-and-practice` | 安排 TestDaF 备考与官方练习 | `starter-overview`，来源复核仍为 pending；需要核对当前官方练习入口并补足原创训练顺序和自检方法 | 保留并深化；有独立备考任务，现阶段证据与原创方法记录不足 |
| `testdaf-vs-goethe-dsh` | 比较大学入学语言证明 | `starter-overview`，来源复核仍为 pending；需要按接收方、考试结构、时间和适用边界建立可验证比较 | 保留并深化；比较任务独立，但跨机构结论尚未完成复核 |
| `telc-b1-b2-germany-work-nursing` | 区分工作、护理、居留路线中的 telc | `starter-overview`，来源复核仍为 pending；需要把雇主、职业监管与移民机关的不同决定权拆开 | 保留并深化；路线分支有价值，但不能以考试品牌概括接受性 |
| `telc-b1-b2-exam-format-and-preparation` | 理解考试结构并安全备考 | `starter-overview`，来源复核仍为 pending；需要核对当前考试格式并增加针对结构的原创准备步骤 | 保留并深化；与路线接受页不同，但当前验证和方法深度不足 |
| `telc-b1-b2-fees-and-test-centers` | 查找授权考点并核验费用 | `starter-overview`，来源复核仍为 pending；费用和场次由本地考点控制，需要可维护的官方查询与核验流程 | 保留并深化；用户任务明确，但易变事实不能停留在概括 |
| `telc-vs-goethe-for-german-visa` | 比较签证路线中的 telc 与 Goethe | `starter-overview`，来源复核仍为 pending；需要先按负责机关确认接受证明，再比较考试执行差异 | 保留并深化；不与 telc 格式页合并，但需补齐接收方优先逻辑 |
| `ielts-ukvi-uk-visa` | 判断何时需要 IELTS for UKVI | `verification-pending` 且来源已 reviewed；仍需把签证路线、等级/分数和当前认可考点核验转化为完整决策路径 | 暂缓主要发现并深化；诚实的 pending 边界不能替代完整路线帮助 |
| `languagecert-selt-uk-visa` | 判断 LanguageCert SELT 是否适合英国签证路线 | `verification-pending` 且来源已 reviewed；需要记录当前官方认可范围、路线条件和与 IELTS 页的实质差异 | 暂缓主要发现并深化；保留独立页，但避免仅替换考试品牌 |
| `tef-canada-immigration` | 使用 TEF Canada 处理加拿大移民语言证明 | `verification-pending` 且来源已 reviewed；需要按当前 IRCC 项目、成绩换算和提交步骤完成决策帮助 | 暂缓主要发现并深化；任务独立，项目适用性仍需页面级核验 |
| `tcf-canada-vs-tef` | 在 TCF Canada 与 TEF Canada 间选择 | `verification-pending` 且来源已 reviewed；需要提供相同口径的能力、时间、考点和项目适用比较 | 暂缓主要发现并深化；与 TEF 单页不同，但当前比较增值不足以恢复 |
| `cils-b1-cittadinanza-for-italian-citizenship` | 核验意大利入籍的 CILS B1 证明 | `verification-pending` 且来源已 reviewed；需要补齐主管机关、例外、证书版本与递交边界 | 暂缓主要发现并深化；任务独立，不能由考试方说明替代入籍接受决定 |
| `cils-vs-celi-vs-plida-for-italian-citizenship` | 比较三种意大利语证书 | `verification-pending` 且来源已 reviewed；需要以同一入籍接收条件验证三者，并提供非品牌替换式比较 | 暂缓主要发现并深化；保留比较页，但需与 CILS 单页形成清晰分工 |
| `dele-a2-ccse-spanish-citizenship` | 核验西班牙入籍中的 DELE A2 与 CCSE 组合 | `verification-pending` 且来源已 reviewed；现有范围已收窄，仍等待命名人工接受门及申请人边界确认 | 暂缓主要发现；页面已有独特组合任务，但人工事实门未关闭 |
| `dele-levels-spanish-citizenship` | 先核验入籍路线接受的 DELE 等级 | `verification-pending` 且来源已 reviewed；现有内容已强调接收方优先，仍等待命名人工接受门 | 暂缓主要发现；与 DELE/CCSE 组合页不同，完成事实门后再评估恢复 |
| `tcf-irn-french-residence` | 核验法国国籍程序中的 TCF IRN | `verification-pending` 且来源已 reviewed；程序范围已收窄，但仍需命名人工确认接收程序和当前证明 | 暂缓主要发现；独特程序任务存在，事实接受门尚未关闭 |
| `delf-b1-b2-french-work-study` | 核验索邦艺术类项目的 DELF B1/B2 | `verification-pending` 且来源已 reviewed；页面已限定具体项目范围，仍需命名人工接受与项目当期要求证据 | 暂缓主要发现；不扩张到所有法国工作/学习路线 |
| `yki-finnish-citizenship` | 核验芬兰入籍使用 YKI 的路径 | `verification-pending` 且来源已 reviewed；需要补齐当前主管机关要求、能力等级和申请步骤的完整决策链 | 暂缓主要发现并深化；有独立路线任务，但当前完成度不足 |
| `yki-vs-other-finland-options` | 比较 YKI 与其他芬兰语证明 | `verification-pending` 且来源已 reviewed；需要明确可比较的其他证明、接收条件和逐项差异 | 暂缓主要发现并深化；与 YKI 单页不同，但比较页当前实质增值不足 |
| `dutch-inburgering-a2-b1-for-integration-and-citizenship` | 区分荷兰融入与入籍中的 A2/B1 | `verification-pending` 且来源已 reviewed；需要按当前程序、过渡规则和负责机关完成边界核验 | 暂缓主要发现并深化；路线任务独立，不能用等级标签代替程序判断 |
| `staatsexamen-nt2-for-work-and-higher-education` | 核验 UvA 荷兰语本科对 NT2-II 的要求 | `verification-pending` 且来源已 reviewed；页面已限定 UvA 分支，仍需命名人工接受与当期招生证据 | 暂缓主要发现；不泛化到所有工作或高校路线 |
| `portuguese-ciple-a2-for-citizenship-and-residence` | 核验葡萄牙入籍/居留中的 CIPLE A2 | `verification-pending` 且来源已 reviewed；需要拆分不同法律路线、主管机关和可接受证明 | 暂缓主要发现并深化；范围过宽，恢复前应先收窄或拆分 |
| `portuguese-language-for-golden-visa-and-citizenship` | 区分黄金签证与入籍的语言要求 | `verification-pending` 且来源已 reviewed；需要明确两条路线并非同一语言要求，补齐当前官方决定链 | 暂缓主要发现并深化；有纠错价值，但必须避免把两条路线混为一谈 |

逐页结论汇总：24 页均有可辨识的用户任务，因此本次不删除 URL，也不直接批量合并；8 页因来源复核 pending 必须先完成来源门，16 页虽然已有来源复核记录，但仍存在程序接受、比较增值、命名人工确认或页面完成度缺口。它们在这些页面级缺口关闭前统一不恢复主要发现与广告。该决定只解决当前“是否继续推广/投放”的风险，不冒充已完成内容深化。

### 本地产物证据

- 101 个 HTML 路由继续生成；
- 主指南库：38 张卡片（30 篇进入当前主要发现范围的英文指南 + 8 篇既有中文路线指南）；
- AdSense loader：33 个页面（首页、2 个成熟路线 hub、30 篇进入当前主要发现范围的英文指南）；
- `noindex,follow`：44 个页面，其中包含 24 篇低成熟度英文指南、10 个无合格指南的分类页、未开放商业页、法律页和 404；
- sitemap：57 个 URL，未包含任何 noindex 页面；
- `npm test`：通过；
- `npm run build`：通过，101 页；
- `npm run launch-check`：39 项通过、0 项失败，`READY.`；
- `git diff --check`：通过。

### 仍未完成

- 未推送、未部署，生产站点仍是此前版本；
- 未进入 AdSense Policy center、Auto ads 页面排除、Crawler access、Privacy & messaging 或账号首页必做任务；
- 未核对 Search Console；
- 未点击 `Request review`；
- 这些动作必须在代码审查、所有者确认及部署授权后单独执行。
