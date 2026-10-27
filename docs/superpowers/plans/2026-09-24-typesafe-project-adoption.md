# TypeSafe AI：VisaLang 项目使用规范与接入方案

日期：2026-09-24。状态：项目规范、服务端 TypeSafe 用途建议接入；仅一条合成连通验证，准确率与读者收益未测，生产未部署。

## 1. 本轮目标与规划位置

Owner 请求“将TypeSafe 技能应用到本项目”，并选择“建立项目级使用规范与接入方案（推荐）”。本轮交付协作约定、架构边界、评测及后续接入步骤。原话与范围见 [Owner 记录](../../typesafe-adoption-evidence-2026-09-24/owner-scope.md)。

本文件从属于 [Master Plan](../../master-package-2026-09-08/VisaLang-Master-Plan.md)、原始 backlog、状态 overlay 和执行记录；参考 [现行并行初验规划](2026-09-23-visalang-laya-overall-plan.md)及[模块调度](2026-09-23-visalang-module-dispatch-plan.md)。它提出技术备选，未改变 LP/LC 里程碑、依赖、W01/W02/W08 已冻结派发范围或 T=25完成/5进行中/4待开始。未来要将 TypeSafe 纳入某个实验窗口，须先确定新范围和预算，重新冻结该窗口，不能把它夹入已有 W02 副本。

项目技能已存在于 `.agents/skills/typesafe-ai/SKILL.md`；全局同名技能可作路径不可用时的回退。本轮不复制或修改技能包。TypeSafe AI 是语义判断服务，本规范不代表 TypeScript 编译检查或全站类型改造。

## 2. 何时使用

| 场景 | 适用方式 | 本项目边界 |
|---|---|---|
| 读者用自然语言说明用途 | Choice 从有限目的中给出建议 | 推荐先做有界对照实验；最终由读者确认 |
| 内部编辑检查主张与官方摘录是否相符 | 有界证据判断，输出待复核项 | 后续独立提案；不得写入 verified 或自动刷新来源日期 |
| 在允许展示的指南中找相关内容 | 对代码筛选后的候选作 Score 排序 | 后续独立提案；原筛选、顺序和链接始终可回退 |
| 日期计算、枚举映射、来源白名单、表单验证 | 确定性代码 | 不增加模型调用 |
| 签证资格、豁免、大学录取、执业或证书接受结论 | 负责机关／院校／考试机构核验 | 不交给模型裁定 |

首选用途建议，因为已有封闭输入输出和人工确认界面。来源辅助需要新的证据集，指南排序需要相关性与发现体验证据，均不随本轮自动启动。原核心站发布仍按现有主线推进，TypeSafe 评测不新增核心发布前置。

## 3. 项目级设计约定

1. 先说明需要理解的语义、允许的动作和失败后用户如何继续；普通规则能解决的部分保留在代码中。
2. 每题只回答一个有用判断。选择有限候选用 Choice；独立是非判断用 Noul；有明确等级定义的程度用 Score。候选覆盖不全时必须有无匹配出口。
3. 将最小所需上下文放在有名字段中，问题明确引用字段。用户文字作为数据；它不能改写题目、候选、工具权限或源文档的权威。
4. 同一状态上的独立问题可同批发送；依赖上题答案的下一题必须等答案构造新状态。代码只消费适用分支，并记录版本与问题摘要以便复现。
5. 保留原始判断用于授权范围内的离线评测；按服务商分别校准决策策略。Choice/Score 的 confidence 描述分布集中程度，不是正确率或行动许可；Noul 接近 0.5 表示是非难分，不能当“中等程度”。
6. typed output 不替代响应验证、事实核验、隐私核验和独立审核。模型生成的说明、URL 或动作不进入执行链。
7. 任何版本相关代码编写前重读官方 API、所选 SDK、相应 primitive 和最接近的 cookbook；记录检查日期、模型实际版本、SDK锁定版本和问题版本。不得以本文件永久固定 API 或价格。

## 4. 当前实现与建议接入边界

当前 Astro 保持静态生成。`src/components/tools/PurposeSuggestion.astro` 与 `src/scripts/purpose-suggestion.ts` 通过同源 `/api/purpose-suggestion/` 请求短描述；独立 Python 服务位于 `services/laya-purpose/`。`src/data/route-tools.ts` 的 `resolveRouteFinder` 控制已配置路线和待核验范围。

现有浏览器契约为请求 `{ "text": "…" }`，响应二选一：

```json
{"status":"suggestion","purpose":"family-reunion","requiresConfirmation":true}
```

```json
{"status":"needs_clarification","purpose":null,"requiresConfirmation":true}
```

允许目的只有 `family-reunion`、`b1`、`ausbildung`、`nursing`、`university`、`other`。只有 `family-reunion` / 德国 A1 当前提供完整 configured 工具路线；识别出其它目的不能提升路线覆盖等级。

建议先在未来独立 `experiments/typesafe-purpose/` 实现评测适配器，沿用同一公共契约比较。仅在评测和外部处理条件满足后，另行设计服务器端 provider 选择层；不要直接在静态页面引入 SDK，也不要把当前 Laya worker 原地替换成云调用。

未来流程：读者主动请求 → 同源服务输入校验 → 服务器 TypeSafe adapter → 严格响应校验及经评测策略 → 有限建议／澄清 → 读者确认 → 现有确定性 resolver。API key 只经服务端秘密配置注入，不进入 `PUBLIC_*`、静态构建、前端包、仓库或日志。关闭功能时零调用；没有 key 时手选仍可用。

现有前端有 12 秒中止及编辑、改选、重置、提交导致旧响应失效的保护。当前 TypeSafe 请求以异步传输设置八秒总 deadline，并在客户端断开时取消上游请求；部署前仍需在目标主机验证真实延迟。Legacy Laya 使用不可中止的同步 worker：服务可在 10 秒应用期限后返回 503，但超时或请求取消时都会继续占用唯一推理槽，直到 worker 真正结束，避免后台线程与后续请求并行。confidence 只检查数值合法，不是校准阈值。legacy Laya 的 1024 token 截断保护和 TypeSafe 的 2048 token 上限分开处理。实验 v2 的逐段裁剪检查不能写成现有服务能力；评测时仍应按最坏问题开销检查静默截断。

## 5. 用途问题与适配策略草案

TypeSafe 当前官方 HTTP 入口为 `POST https://api.typesafe.ai/v1/systemone`，使用 Bearer key；请求包含 `state`、`model` 和 `questions`。建议复用 Python 服务技术栈，编写时再选锁定 SDK 版本或直接 HTTP。以下是项目拟定题目，不是已运行请求。

- 状态最小集合：`text`，以及明确的任务定义“识别读者当前想办理的用途，不判断资格”。不默认携带计划存储、IP、证件、账户或完整会话。
- Choice 题目：从给定描述识别一个清楚的当前用途；否定内容、未来设想与引用示例不等于当前意图；无法唯一识别时选择 `unclear`。
- 候选说明：`family-reunion` 配偶／家庭团聚；`b1` 永居／入籍语言证明用途；`ausbildung` 职业培训；`nursing` 护理工作／认可；`university` 大学学习；`other` 明确的其它用途；`unclear` 缺少用途、多个无法区分的当前用途或冲突信息。提到 B1 考试本身不足以推断入籍。
- 如误差分析确有需要，再同批增加 Noul 判断“是否明确表达单一当前用途”；不默认增加更多题目，不将附加题结果当成外部事实。

适配器验证必需 answer id、type、候选集合、有限数值、概率键完整性及分布有效性，再将允许候选映射到公共契约。`unclear`、无匹配、策略未通过、输入超限、疑似截断、缺失或畸形结果均返回澄清；网络失败、限流或服务关闭保留手选。公开响应不包含概率、原文或模型解释。`requiresConfirmation` 始终为 true，不能因为 confidence 高就自动提交或覆盖已有计划。

阈值尚未确定；不得把示例 0.8 或 Laya 的分数当作启用门槛。未冻结校准策略时只输出实验记录，不能向读者激活。服务端 deadline 应短于浏览器12秒预算，超时必须取消上游；429/过载的退避重试只允许在总 deadline、尝试次数与费用上限内，不在后台无限重试。SDK默认重试不自动满足项目预算要求。

## 6. 外部处理与成本门槛

现有 Laya 本地推理与 TypeSafe 托管 API 的数据接收方不同。真实接入前必须核对供应商条款、保留／训练用途、处理地区、删除方式和账户设置，并用证据记录决定；本轮未核实这些条件，不声称“零保留”或符合某地法律。用户界面与隐私文案需准确说明新增接收方，不能沿用仅称“本站的分类服务”的说明就转发真实输入。

离线评测脚手架默认不联网。之后如授权有界 API 实验，只用经确认可发送的合成或脱敏样本，并先约定样本数量、最大调用与费用上限、截止条件和数据权限。不能在用户访问时默默镜像给两个 provider。固定摘要级运行指标；服务端和代理日志均不得记录 raw text、key、身份信息或完整请求。输入提示不是脱敏保证。

当前未创建账户、检查密钥、购买额度或调用模型。原服务器每月≤100元预算不能推断成 TypeSafe 调用预算；价格、额度及可用地区须实施时查证。运行报告记录实际模型版本、输入／输出token、请求数、端到端p50/p95、失败率和实际成本；无数据写未测。

## 7. 后续实施与验收顺序（待另行启动）

| 步骤 | 交付与检查 | 进入下一步条件 |
|---|---|---|
| A 冻结实验范围 | 单独范围清单、数据许可、版本、预算、最小问题集；默认无外部调用 | 明确授权实验范围及任何外部费用／数据发送 |
| B 本地契约脚手架 | 新实验目录；mock 成功、澄清、恶意输入、畸形输出、缺key、超时、429/过载、取消 | 契约测试通过且手选持续可用 |
| C 有界对照 | 手选／规则／Laya／TypeSafe分别报告；开发、校准、冻结评测分开 | 不用旧样本调参后声称独立盲测；数据来源与评测隔离可核验 |
| D 继续／暂停决定 | 将技术结果与独立读者收益证据汇总，参考 LP01a→LP01b 的投入判断方式 | 无真人收益证据只报告收益未知；不自动扩投入 |
| E 服务端候选 | 单独provider选择、准确隐私说明、失败回退、预算与关闭开关；保留原公共契约 | 独立 Auditor PASS、目标环境与数据条件证据、Owner启用授权 |

以上字母为本方案步骤，不增加 Master Package 的任务编号或调整已批准依赖。TypeSafe 候选不能继承 Laya 的审计或上线状态。

评测至少包含中英两种语言，以及否定、多个目的、当前／未来混合、只问考试、培训／学位／执业边界、未知用途、空／超长输入、输出操纵和无关文字。分别记录分层准确率、错误建议率、澄清率、覆盖率、高置信错误、延迟、成本；校准集选阈值、冻结集检验，样本量与区间必须同时报告。手选的完成时间／任务成功与分类正确率分开比较，不能混成单一数字。

任何资格越权、静默覆盖用户选项、敏感信息泄漏或预算失控都停止启用候选。其它数值目标由未来评测范围预先冻结；本轮无结果，不能声称 TypeSafe 优于规则或 Laya。代码接入后运行契约测试、现有 `npm test` 和 `npm run launch-check`，验证中英浏览器确认／撤回／旧响应失效／纯手选流程，再做规划同步、独立审核和逐次发布授权。

## 8. 当前官方资料记录

以下均于2026-09-24读取官方网页；`.md`读取失败后使用普通页面。它们支持接口与设计语义，不能证明 VisaLang 准确率、费用或供应商隐私条件。

| 来源 | 可支持内容 | 边界 |
|---|---|---|
| [文档索引](https://docs.typesafe.ai/llms.txt) | 资料与 cookbook 入口 | 不是运行证据 |
| [HTTP API](https://docs.typesafe.ai/api) | endpoint、认证、state/questions、响应和错误结构 | 实施时重核；不证明容量或价格 |
| [Choice](https://docs.typesafe.ai/primitives/choice) | 固定候选、无匹配出口、choice/probabilities/confidence | 不保证当前目的识别正确 |
| [Confidence](https://docs.typesafe.ai/confidence) | 分布集中程度与概率的区别 | 阈值要在本项目校准 |
| [Python SDK](https://docs.typesafe.ai/sdk/python) | 与当前服务器语言一致的客户端路线 | 本轮未安装或锁版本 |
| [Function calling cookbook](https://docs.typesafe.ai/cookbooks/function_calling) | 有限动作与参数拆成问题，代码消费相关答案 | 示例收益与阈值不迁移到 VisaLang |

主张／官方移民来源 ledger：本轮不新增或修改文章、法律、考试、费用或资格事实，故不适用。现有来源权威与独立审核规范继续生效。

## 9. 本轮交付与下一决策

本轮规范窗口与启用窗口分开记录。前一窗口记录见 [TypeSafe adoption evidence](../../typesafe-adoption-evidence-2026-09-24/review-submission.md)。

下一步若要比较分类质量或扩大样本，Owner 需单独冻结 A–D 实验范围、费用和数据范围；单次连通性验证不构成实验结论。生产部署另须目标环境的独立审计、容量／回滚等发布证据及单独授权。Obsidian目标目录／模板当前缺失，待同步 payload 保持 review / pending / not_started，实际Vault同步 blocked。

## 10. 启用增补（2026-09-24）

Owner 随后明确授权“启用”并提供 API key。本增补将上一版“仅提案、未调用”的状态更新为：`services/laya-purpose/app.py` 默认使用服务端 TypeSafe Choice adapter，固定七个候选（包含 `unclear`），经输入上限、单调时钟总 deadline 和 typed response 校验后映射为既有六类公共目的；畸形输出与服务错误失败关闭。TypeSafe 总 deadline 覆盖异步 DNS、TLS、请求、响应头和有界响应体；浏览器断开会取消上游协程并关闭流。Legacy Laya provider 留给现有 bundle 和回滚兼容。Laya 同步 worker 无法被 asyncio 取消：10 秒期限会先返回 503，但其唯一推理槽会保持占用直到线程结束；请求任务被取消时也先等 worker 退出再释放推理槽。Laya 的 1024 token 保护与 TypeSafe 的 2048 token 上限分别校验。只有用户主动点击才发送，建议始终要求用户确认，路由解析、资格结论及确定性字段均不交给模型。没有精度、校准、成本、容量或读者收益结论。

API key 仅保存在被 Git 忽略且权限为 `600` 的本机 `.env.local`，不是源码或构建输入；前端、响应、日志和 release manifest 不携带 key。该 key 曾出现在聊天文本中，Owner 应在完成验证后轮换。只获准本地配置与一条合成在线 smoke；没有更改远端账户设置或生产环境。

启用时复核了 TypeSafe 官方 HTTP API 和 Choice 文档：`POST /v1/systemone`、Bearer 认证、Choice 的 `choice` / `probabilities` / `confidence` 响应和 `usage.input_tokens`（[API](https://docs.typesafe.ai/api)、[Choice](https://docs.typesafe.ai/primitives/choice)；2026-09-24 检查）。TypeSafe 隐私说明称其服务托管于美国，并可能在合理必要期间保留个人数据（[隐私政策](https://typesafe.ai/legal/privacy-policy)；2026-09-24 检查）。这些页面不能核实当前 API 账户设置、实际处理配置、合同/DPA 是否适用、VisaLang 法律合规或模型分类准确率。

Route Finder 在点击之前说明第三方接收方、美国处理及供应商保留政策，链接到供应商隐私政策；页面也保留直接手选。VisaLang 服务和代理不记录请求体；页面内原文会保留到用户清除、采用建议、重置工具或离开页面。实际在线检查只使用合成的“赴德攻读硕士”输入一次；结果、令牌计数和错误状态记在启用证据目录，原文与响应不落盘。

Release manifest 新增 provider 选择，旧 manifest 缺省仍按 Laya 解释；切换前会预检目标与当前版本的启动条件，包括 TypeSafe key、Laya 已验证模型缓存及镜像；TypeSafe key 只通过 Docker 环境变量名传递。首轮独立审核发现总 deadline／取消、provider token cutoff 和回滚 key 预检三项 P2，均已补代码与无网络回归测试，当前等待同一 Auditor 复审；此前 FAIL 报告只绑定第一轮字节。此次不运行 activation/deploy。规划图拓扑不变，drift 仍记录 `approved-deviation`，Owner 范围见 [`owner-scope.md`](../../typesafe-enable-evidence-2026-09-24/owner-scope.md)。
