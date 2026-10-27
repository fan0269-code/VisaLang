# VisaLang 已有成果集成与内容验收计划

> **For agentic workers:** 使用 superpowers:executing-plans 逐任务执行；本计划优先单一W00串行集成，独立VisaLang Auditor负责最终审查。未经派发不启动其他模块。每一步用复选框记录实际证据。

**Goal:** 将已存在的W03/W04/W08/W07隔离候选接入当前主树，补齐本地验证，形成41页内容处置与有限内容修正，再提交具体core候选及真实缺口。

**Architecture:** 保持Astro静态站、确定性规则和当前内容范围；复用W08统一开关契约。W00接收当前dirty基准下的最小补丁，串行处理重叠文件，保留每个模块的来源和未验证项。

**Tech Stack:** 当前锁定Astro、TypeScript、Markdown、Node断言及既有Python发布工具；不升级框架或引入新AI。

**Spec:** [9/28进度审查](../../PROJECT_REVIEW_2026-09-28.md)，Master/overlay/EXECUTION_RECORD，9/23 overall/content/module-dispatch及9/24 content-ui增补。本计划细化原W00/W03/W04/W07/W08/W15–W18和LC01/04–07/12，替代旧提示词中“重新从零派发四模块”的启动判断，不替换权威顺序。

## Global Constraints

- 保留25完成/5进行中/4待开始及所有未满足的T/LP/LC门槛；模块候选存在不等于已集成或独审完成。
- 原URL、15EN/5ZH指南索引白名单、14EN广告资格上限、现有中文范围及服务器预算≤100元/月（域名除外）不扩张。广告资格不等于启用。
- 不自动commit/push/deploy、真实回滚、改账户、联系真人、读取密钥或调用付费API；只允许所派提示词范围内的本地实施和验证。
- 高风险事实先建权威ledger；只在实际读过来源后更新检查日。翻译不扩大地域、项目、考点或个案支持范围。
- build/launch-check及可能内部build的测试串行；不同模块不用共享可写dist、依赖或缓存。不得删除断言以掩盖功能回归。
- 规划图、history、全部sync字节、独审、TASK_LOG与Vault真实状态按AGENTS执行；无实际证据不得填PASS。

## Review Focus

- 旧dispatch“未开始”覆盖已完成隔离工作：任务0逐文件核对并持久化完整包，来源不同则停止该包应用。
- CSS或Finder整文件覆盖丢功能：任务1在三方基准上逐段合并，并同时测试布局、provider开关与结果保存。
- 英中共享入口相同但真实状态不一致：任务1验证已有证书/unknown/verify-only、旧结果失效、恢复与导出。
- 将费用登记到期当新价格事实：任务2/3按登记项核验，失败不刷新verified/checkedAt，不编造价格。
- 自动通过被当真人/生产/发布通过：任务4分别记录本地、真人、日历、主机与Owner状态。

## 任务0：接收和冻结已有四模块（N00 / W00）

**文件：** 读`docs/next-stage-evidence-2026-09-28/module-inventory.json`、原dispatch和四个workspace；新建`docs/module-handoffs/2026-09-28-integration/`下`intake.json`、`baseline-manifest.json`、`conflict-map.json`、`archive/`。执行日期变化可更换batch目录，但后续提示词必须消费实际返回路径。

**接口：** intake每模块包含`moduleId, workspacePath, baselineId, candidateId, handoffSha256, changedFiles, patchSha256, receivedStatus, missingEvidence`；changedFiles记录路径、base/candidate/current SHA-256和处置。仅`verified`包可进入任务1。

- [x] 保存当前branch/HEAD/upstream本地差异、staged/dirty/untracked及逐文件哈希；排除凭据并逐项说明。
- [x] 校验9/28归档与原handoff、candidate.patch、全部改动文件；比对分配基准、当前主树及候选，不信文件修改时间。
- [x] 持久化四份完整交接材料及补丁涉及的候选文件（包括来源、浏览器、测试证据）；不复制node_modules、密钥或模型权重。
- [x] 将`global.css`的W03/W04/W07和Finder的W08/W07列为冲突；标明W07 partial和W04缺归档截图，避免派发“重新做P01–P04”。
- [x] 检查归档每项哈希、文件数及补丁可应用性；缺失项标blocked并保留其他可进行包。交付intake，不应用功能补丁。

## 任务1：串行集成并补技术验证（N01 / W00＋W15）

**文件：** intake冻结的43个不同非模块证据路径为输入上限，含`src/styles/global.css`、`src/pages/tools/route-finder.astro`、`src/layouts/GuideLayout.astro`、`src/components/ZhGuideLayout.astro`、`src/components/tools/ToolShell.astro`、`deploy/release.py`及对应原测试。W08新增`src/data/runtime-features.ts`、`tests/runtime-features.test.mjs`须随包接入。只改修复已确认集成问题所需路径，超出范围另列。

**接口：** 按W08 `runtime-feature-contract.md`复用`{schemaVersion:1,purposeSuggestions:'off'|'laya'|'typesafe',advertising:'off'|'on'}`；`VISALANG_PURPOSE_MODE`/`VISALANG_ADS_MODE`默认off，经构建写入`dist/runtime-features.json`，发布消费`release.json.features`。不得再造开关源。输出`integration-record.json`、实际日志与浏览器receipt。

- [ ] 按W03 → W04 → W08 → W07串行合并；顺序只是合并策略，不宣称W07依赖W08事实。共享文件按三方差异逐段处理，保留全部功能。
- [ ] 先记录W07 T28缺依赖失败。定位已可用本地浏览器依赖或使用可用CUA进行同等真实几何验证；不把环境失败当回归已通过。
- [ ] 运行受影响原focused测试；六模式逐一build再launch-check，最后恢复off/off构建。构建/探针不得发送真实API请求。
- [ ] 375/390/768/桌面×EN/ZH检查入口、证书卡、Finder→Checklist→Timeline→ICS；实际测量清单结果标题不被固定导航遮挡、焦点到位、页面无横溢出，归档截图和数值。
- [ ] 验证unknown/已有证书/verify-only、改输入后旧结果失效、复制失败回退、存储被拒、session恢复、30天过期和清空；实际打开打印预览、核对下载文本/ICS所含来源与未确认项。下载不代替日历导入。
- [ ] 对W04归档四目标页截图并复核来源ledger；非目标指南仍保留正确布局。高风险实质改写回任务3流程。
- [ ] 在实际Git身份下验证dirty候选拒绝；未获提交授权时不得为使prepare成功而commit或篡改身份。正向immutable release prepare、主机/备份/TLS/真实回滚等仍缺则记录partial。
- [ ] 输出实际应用/未应用路径、冲突解决理由、集成后SHA-256和测试失败/未测项。模块原日志不得冒充集成后通过。

## 任务2：41页价值台账与来源队列（N02 / W17、LC12）

**文件：** 读`src/content/guides/`、`src/data/publication-manifest.ts`、`src/data/zh-germany-a1.ts`、`src/data/claim-registry.ts`、`docs/CONTENT_MAP.md`与新构建；创建batch中的`support-content-review.csv`、`source-review-queue.json`、`next-content-shortlist.md`。

**接口：** CSV每行包含`route,locale,group,readerTask,uniqueOutput,neighbourDivision,authority,sourceBoundary,gap,evidence,disposition,nextAction,reviewTrigger,trafficEvidence`。route去重；disposition仅`maintain|one-task-fix|defer`。没有分析数据则trafficEvidence=`unknown`。

- [ ] 从当前源码重算61=20＋41、41=17＋24并与盘点交叉核验；数量变化先查来源，不硬凑数字。
- [ ] 逐页阅读41页现有正文和相关支柱，填真实任务分工与可使用产物；禁止仅用词数/模板评分批量判定。
- [ ] 从注册表提取当前最早2026-10-09到期的2条费用事实及4条当地费用记录，列ID、来源、owner、适用地区/产品、checkedAt、nextReviewAt及消费者；生成可核验队列。
- [ ] 单独验收20支柱与四模块的任务承接，识别“已解决、尚缺证据、确证缺口”。只读盘点不更改来源检查日或内容状态。
- [ ] 选最多3项有明确失败证据的A1任务修正给任务3；允许0项。输出每项允许文件、来源、产物与通过条件；不删页、301、升索引或开启广告。

## 任务3：有证据才补一小批内容（N03 / LC04–07）

**文件：** 严格由任务2的shortlist冻结，优先现有`goethe-a1-vs-telc-a1`、`goethe-a1-test-centers`、`goethe-a1-fees-by-country`、`goethe-a1-pre-booking-checklist`及现有中文对应资产；无需新增URL。费用维护实际核验`claim-registry.ts`及所有消费者。

- [ ] 为每项先列主管机关/考试方/选定考点及允许支持边界，实际打开官方来源，记录URL、日期、定位、断言与不能证明的内容。
- [ ] 只补shortlist确认的独有产物：准确成人产品待问表、分币种当地报价记录或付款前核验单；现有卡片满足则复用，不扩篇幅。
- [ ] 未确认费用、受理、例外或出证日期时写明读者应向谁问什么、保存什么回答；不填估计值或推广结论。
- [ ] 新行为/路由/必要链接更改更新focused断言；仅低影响文案不加镜像测试。验证来源渲染、内容完整性、EN/ZH边界及原索引/广告政策。
- [ ] 交付逐项变更前后、ledger、实际命令结果和未测项；来源不可确认的条目标待核，不能为关闭清单强行verified。

## 任务4：形成具体core候选与独立审核（N04 / W00、W15、W16、W18）

- [ ] 按现有COMMON及P06串行执行完整`npm test`和`npm run launch-check`；core为off/off；如只有尚未生成的新规划审计门禁失败，按预审状态记录。
- [ ] 冻结全部候选范围与来源；更新EXECUTION_RECORD/必要overlay、README、TASK_LOG、Archify图/history/sync；四尺寸自动浏览器与两主题图片审阅分别留证。
- [ ] 独立VisaLang Auditor只读审核精确范围、完整sync字节及全部来源与截图；所有P0/P1/P2修复后由同一Auditor复审。
- [ ] PASS后再跑governance与全量测试；日志置独立审后receipt。任一已封印字节变化重新同步/复审。
- [ ] 出具`core-candidate-status.md`：本地代码、审查、真人、日历、目标主机、原17生产URL、发布/回滚身份分别列状态。T19/T23/T28/T29/T30仅按真实证据更新。
- [ ] LP00按原5–8名同意参与读者方案准备；无真人结果不升LP04。LP05a没有实际环境证据仍partial。核心候选可交接，生产就绪不得误报。
- [ ] Vault可用则按模板落review记录；不可用则保留payload并明确blocked。提交/推送/部署和所有外部动作留待逐次明确授权。

## 本阶段完成口径

本地目标是已接收四模块、受控集成、技术缺口有结果、41页台账完整、最多3项实际内容缺口处理并经独审。若真人/主机/日历或独审证据缺失，报告具体未完成项，不将整个M5或LP04/LP05a写成完成。新的规划文件交付不改变以上执行复选框。
