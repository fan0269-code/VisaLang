# T27 最小统计与隐私一致性执行证据 — 2026-09-16

## 1. 范围与边界

- 任务：Master Package T27「实现最小统计与隐私一致性」。
- 分支：`codex/scheme-3-one-week-content`。
- HEAD 基线：`4cb57e8744c752fed1881281e69e7b24cc7281c4`。
- 既有 dirty worktree 未清理、未 reset、未 clean、未切换分支、未创建 worktree；`docs/t27-evidence-2026-09-16/baseline-git-status.txt` 保留开始检查时的状态。
- 本窗口没有 Analytics、广告账号、CMP、Search Console、生产 HTTP、日历客户端、邮件服务或真实用户参与。
- 本窗口不处理 T23 redirect、`public/_redirects`、canonical、hreflang、sitemap、迁移、付款、外部账号、commit、push 或 deploy。

## 2. 实际数据流审计（代码事实与文案事实分开）

### 代码实际做什么

- `src/layouts/BaseLayout.astro` 只在 `enableAds` 为真时输出 Google AdSense loader。`GuideLayout` 通过 publication manifest 只给部分英文成熟指南开启；工具、工具索引、首页、路线页、政策和商业页显式关闭。
- 当前 Astro 源码没有 Google Analytics、Plausible、Cloudflare Web Analytics、`fetch`、XHR、`sendBeacon`、cookie 写入或 Analytics event sender。`public/_headers` 和 `public/robots.txt` 只提供响应头与抓取配置，不提供测量采集。
- 五个工具通过 `src/scripts/plan-state.ts` 在当前标签页使用 `sessionStorage` 保存受 schema 校验的计划字段；用户明确点击设备保存后才写入 `localStorage`，保存快照最多 30 天。`RouteProgress.astro` 单独保存路线步骤。
- `src/data/reminder-ics.ts` 在浏览器/纯函数中生成 RFC 5545 文本；页面用 Blob 触发本地下载，不发送日期、路线答案或 ICS 到服务器。提醒不是邮件服务。
- 旧根目录兼容资产仍包含历史 `index.html`/`zh/index.html` 的 Plausible 标签和 `app.js` waitlist `localStorage` 代码。它们不属于当前 Astro `src/` 构建源；T27 不激活、修改或把它们当成当前 Astro 统计证据。

### 文案声称什么

- Privacy/Cookie 现明确区分：AdSense loader 的源码边界不等于已核验的账号、投放、CMP、区域同意或生产行为；当前 Astro 没有 Analytics 或自定义事件发送。
- Privacy/Cookie 说明了 session-first 计划、可选 30 天 localStorage、独立路线进度、旧 URL 清理边界和可能存在的 hosting/CDN 日志；没有把本地存储写成云同步。
- Terms 明确：工具不创建账号、不提交工具答案、不发邮件提醒；ICS 只是本地文件，不代表导入、通知或送达。
- Pricing/Partners/Affiliate 文案仍只表达免费工具、接触意向和条件性商业披露，不新增付款、交付、邮件、人工审核或官方推荐承诺。

## 3. 本地 measurement contract：`t27.v1`

实现文件：`src/data/measurement-contract.ts`。它是无浏览器、无存储、无网络副作用的纯验证模块；`MEASUREMENT_TRANSPORT` 固定为 `none`。`ToolShell.astro` 只在五个工具页面输出可审计的 contract/tool/transport data attributes，没有发送事件。

| event name | trigger | tool 属性 | 其他允许属性 | 分母与边界 |
| --- | --- | --- | --- | --- |
| `tool_viewed` | 五个工具页面的 active JS surface 初始化 | `tool_id`：`finder`、`checklist`、`timeline`、`comparison`、`reminders` | `contract_version=t27.v1`、`locale=en|zh-CN` | 只表示可测量工具 surface 初始化，不是访客、session 或流量数；当前无 collector |
| `tool_result_rendered` | 严格验证后渲染有限状态； malformed、缺失或校验失败不发送 | 同上 | `result_status`：按工具固定的有限枚举 | 统计渲染状态，不是完成、成功、接受、转化或官方决定；`unsupported`、`needs_information`、`needs_authority_confirmation` 不计为成功 |
| `tool_takeaway_requested` | 用户明确请求清单复制/打印/下载或 ICS 下载 | 同上 | `action`：`copy`、`print`、`checklist_download`、`ics_download`，并按工具白名单 | 只表示显式请求，不表示 clipboard、下载、导入、通知或送达成功；失败/禁用/未知动作不发送 |

工具结果状态白名单：

- Finder：`guidance_available`、`needs_information`、`needs_authority_confirmation`、`unsupported`；
- Checklist：`guidance_available`、`unsupported`；
- Timeline：`calculated`、`calculated_attention`；
- Exam Comparison：`comparison_ready`、`same_product`、`unsupported`；
- Reminder/ICS：`calendar_ready`。

`locale` 仅允许 `en` 与 `zh-CN`。契约不收集 route/application-region/exam/date 值；它们只留在既有本地计划状态中。未知 event、tool ID、locale、version、status、action、额外 key 或不匹配的 tool/status 组合均 fail closed，`buildMeasurementEvent()` 返回 `null`。

明确禁止进入测量 event 或持久化测量数据：姓名、邮箱、IP、账号、完整 URL、URL query、自由文本、完整日期、考试日期、原始答案、路线表单答案、证件/签证/申请材料、用户备注、可复原个人选择的信息和未经审查的第三方 identifier。也不发送结果正文、来源 URL、ICS 内容、UID、保存时间或计划快照。

## 4. 测试与本地验证

新增 `tests/t27-measurement-privacy.test.mjs`，并注册到 `tests/site.test.js`。覆盖合法事件/枚举、五个工具、未知事件与工具 ID、未知状态/动作/locale/version、额外字段（URL、邮箱、日期）、malformed/null、页面 contract data attributes、无网络采集器、Storage/ICS 边界以及 Privacy/Terms/Affiliate/Partners/Pricing 文案边界。

本窗口已观察到：

| 命令 | 结果 | 边界 |
| --- | --- | --- |
| `node tests/t27-measurement-privacy.test.mjs` | exit 0 | focused T27 assertions passed |
| `npm test`（最终重跑） | exit 1 | 功能 assertions 先通过；最终停在 planning governance 的缺少独立 Auditor 报告门，未把它写成测试 PASS |
| `npm run build`（最终重跑） | exit 0 | 88 pages built locally |
| `npm run launch-check`（最终重跑） | exit 1 | 59 PASS / 0 FAIL / 1 BLOCKED；唯一 BLOCKED 是 T23 的 17 个既有 redirect candidates，未修改 T23 |
| `git diff --check`（最终重跑） | exit 0 | no whitespace errors |
| Archify validate/deliver/visual-check | exit 0 | showcase 9/9, 0 errors/0 warnings; browser containment passed; four light/dark screenshots separately inspected |

命令摘要和稳定证据保存在 `docs/t27-evidence-2026-09-16/`。最终 focused/build/launch/diff 已重跑；`npm test` 的唯一治理阻塞是独立审查报告缺失，摘要见 `npm-test-summary.txt`。planning governance 同样保持 fail-closed，直到独立 Auditor 真正写出并绑定 PASS 报告。

## 5. 独立审查与发布边界

- Independent review：`unavailable`。已尝试两次独立、只读 VisaLang Auditor（`visalang-t27-independent-auditor` 与 `visalang-t27-independent-auditor-r2`）；两次均未生成报告、verdict 或消息。没有把实现者检查当作审查通过。
- T27 状态：`local implementation only`；精确 changed-path scope 尚未取得 Auditor `PASS`，因此不满足独立审查完成门。
- T19：仍为 partial/in progress，真实日历客户端导入 `blocked/not_tested`。
- T23：仍为 `blocked` / `evidence_map_only`；未改变 redirect。
- Release status：`not_deployed`。
- 未 commit、未 push、未 deploy、未登录外部账号、未产生真实流量基线。
