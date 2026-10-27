# VisaLang 多窗口执行共同约定

本文件是全部 W 提示词的必读执行契约。W 是窗口编号，不是新增产品里程碑；LP/LC 的定义、门槛与状态仍以两份 2026-09-23 规划及最新 Master 增补为准。当前这批文件只是提示词交付，没有实施各模块。用户将某一提示词发送给窗口时，授权该提示词边界内的本地工作；未发送的提示词不自动启动，前置证据不因提示词存在而满足。

## 2026-09-24 当前状态增补（执行前必读）

先读 `docs/PROJECT_SCAN_2026-09-24.md`、`docs/superpowers/plans/2026-09-24-visalang-next-stage-content-ui.md` 和 `docs/prompts/2026-09-24-next-stage/README.md`。9/23已分配副本是历史基线，9/24 TypeSafe本地接入后重叠文件已变化；未来执行必须由W00新冻结，不从旧副本覆盖主树。

现有用途建议服务支持laya/typesafe，当前release仍强制广告＋一种provider；独立core-only尚未实施。下文及旧W提示词提到Laya时：核心关闭/发布隔离边界应覆盖全部可选用途provider；Laya专用离线质量/权重/容量工作仍只适用于Laya，不能机械替换为TypeSafe API调用。W02/W10–12如要增加TypeSafe评测，先冻结新数据/预算/范围；W16中的laya目标不能暗中改为typesafe，应明确该候选provider及独立证据。9/24启用增补仅证明一次合成连通与本地契约通过，不是准确率、生产或新增调用许可。

本轮只校正现状与执行入口；LP/LC依赖与25/5/4任务状态保持。原规则“只用既有Python Laya分支”现在应按已授权的既有Python用途建议服务（laya/typesafe）理解，不新增其它服务或语义用途。更早审计只覆盖其冻结范围。

## 1. 权威与工作目录

主项目为 `/Users/a1-6/Documents/2.codex/1.visalang.org`。先读根 AGENTS.md、`docs/master-package-2026-09-08/VisaLang-Master-Plan.md`、状态 overlay、EXECUTION_RECORD，以及 `docs/superpowers/plans/2026-09-23-visalang-laya-overall-plan.md`、`2026-09-23-visalang-laya-content-plan.md`、`2026-09-23-visalang-module-dispatch-plan.md`。HTML 图是派生视图，JSON 是图的编辑源。冲突先按最新 Owner 与权威链核对，不为使图过关而倒改规划。

W00 是主目录唯一写入与集成者；功能窗口 W01–W17 只能写 W00 在 dispatch.json 指定的候选副本。所有提示词内 src/、tests/、docs/ 路径均相对此副本。W18 是独立只读审核窗口，唯一可写的是 W00 指定的新审核报告。

W00 必须冻结当前工作树全部纳入候选的文件（包括此前未提交文件和本提示词），保存 branch、HEAD、upstream、ahead/behind、staged/dirty/untracked 清单和逐文件 SHA-256。不能只从 HEAD 创建 worktree 并声称继承了当前规划。不得 stash、reset、clean、切换当前分支或改写他人文件。默认从冻结工作树创建各自无 .git 的独立候选目录；按 `git ls-files --cached --others --exclude-standard -z` 获取清单，校验存在的文件，保留删除记录与安全的相对软链接，不跟随链接读写目录外。排除 .git、node_modules、dist、.astro、虚拟环境、缓存和凭据；逐项登记排除理由。保留 AGENTS、全部必要源码/公开资产/配置/锁文件/测试/文档。缺少必要的未跟踪本地输入时先登记缺口，不能捏造完整快照。

W00 在 `docs/module-handoffs/<batchId>/dispatch.json` 分配唯一 batchId、baselineId、每窗口 workspacePath、模块、允许写路径及实际依赖证据。batchId 可取启动日期加序号，以现有记录唯一性为准；baselineId 是排序的路径+NUL+文件字节+NUL 的 SHA-256。候选目录放系统临时目录或已获写权限目录，不嵌套在主项目受监控源码内。副本逐文件哈希与基线一致才可启动。依赖与 Python 环境分别准备，可复制可信本地依赖但不共享可写 node_modules/dist/.astro/.venv；现有锁文件不变，缺依赖如实记录。

没有分配或依赖证据时，只读检查、编写不改变主项目的临时缺口说明；不得自行在主目录施工。文件写权限扩大应先由 W00 更新分配，不能把目录白名单解释为重写目录内所有文件的要求。

## 2. 并行、合并与验收的区别

- LP00 与 LP01a 可同时开始。无真人仅阻塞真人结果与收益判断，不阻塞有限技术初验。
- LP04/05a/06-core 不等待 Laya 或广告。但 LP04 的真人任务验收、LP05a 的真实目标环境证据不能省略；准备代码完成不等于整个 LP 包通过。
- W03–W07 以真实任务失败或已确认缺陷为依据，已合格资产直接复用；不要为显示进度重写全文。
- 共享事实/工具数据可在独立副本内提出最小变更，但必须交付逐文件 base/candidate 哈希与补丁。W00 对照该基线串行合并；主目录已有不同变更时逐段解决、复验或重新分配基线，不用整文件覆盖。发现同一事实版本或契约冲突时先暂停受影响部分。
- 中文工具有共享英文实现，不能按语言拆成相互独立的代码所有者。共享布局、样式、数据、tests/site.test.js、package 锁文件不能由多个窗口直接写主目录。
- 每个窗口运行自己的聚焦测试。完整 npm test/launch-check 和正式规划图维护在集成冻结后串行执行；`npm run build` 会清理构建输出，禁止共用构建目录并发。
- 子模块交接只表示 ready_for_integration、partial 或 blocked，不能宣称维护窗口完成或独立审计 PASS。W00 统一同步 Master/overlay/执行记录/内容地图/README/TASK_LOG、规划图/history/sync、Vault、全量检查与独立审核，才关闭集成维护窗口。这是同一维护窗口的分工，不是免除子模块治理。
- 副本内的旧 sync 对修改后的源码必然可能失效；记录治理尚待集成，禁止绕过或放宽 tests/planning-map-governance.test.mjs。中央未完成治理，不能以子模块测试通过替代正式交付。

## 3. 产品、事实与授权边界

保持德国 A1 优先、现有中英文、原网址及月服务器预算≤100元（域名除外）。网站为核验导航。只用现有 Astro/静态内容/确定性规则与既有 Python Laya 分支；不增账号、数据库、邮件后端、支付、通用聊天或自动资格判断。不自动扩索引、广告白名单、国家、语种或完整配置路线。

所有实质更新的高风险事实必须真实查阅正确层级的官方来源，记录 URL、检查日、责任机关、段落定位、可支持范围、边界、使用位置。当地考点不能由一般官网代替；无法确认则给具体询问动作。未经重新阅读不得刷新 checkedAt；合成样本、代理测试、点击采用不能冒充真人需求或正确性。

Laya 原始目的文本不进入 URL、广告、遥测或持久计划；只在用户主动请求后建议枚举，确认后才采用；拒识/超时/关闭可手选。原质量/容量协议不变；初验只查有限问题，完整评测与优化须 LP01b 有依据的继续决定。

任何窗口都不得自行 commit、push、部署、回滚真实服务、购买、改变外部账户或联系招募对象。本地只读官方查询与副本内开发/测试可按所领任务执行；真人联系、真实账户、目标主机、日历写入、生产动作必须已有明确的对象及范围授权，缺失时完成其余本地工作并准确保留未验证项。审核通过不等于 Owner 授权。不要重复索取已在会话明确给出的同一范围授权。

## 4. 统一交接格式

在候选副本 `docs/module-handoffs/<batchId>/<WID>/` 输出：`handoff.json`、人可读 `README.md`、仅本模块差异的 `candidate.patch`、新增文件、测试原始日志、必要来源/样本/截图证据。路径通过 W00 分配获得，不任意覆盖别的模块目录。实际受试者身份/联系方式不进入公共仓库；使用去标识 ID 与同意状态引用，敏感原始材料在获准位置保管。

handoff.json 至少包含：

```json
{
  "schemaVersion": 1,
  "batchId": "W00分配的实际ID",
  "moduleId": "本窗口实际W编号",
  "baselineId": "分配快照的实际SHA256",
  "implementationStatus": "ready_for_integration | partial | blocked 三选一",
  "changedFiles": [{"path":"副本相对路径","baseSha256":"原字节哈希；新增为null","candidateSha256":"候选哈希；删除为null","changeKind":"add | modify | delete 三选一"}],
  "tests": [{"command":"实际命令","exitCode":0,"logPath":"实际日志路径","baselineId":"测试候选身份"}],
  "dependencies": [{"moduleId":"实际前置窗口","evidencePath":"可定位结果","status":"真实状态"}],
  "sharedFileChanges": [],
  "limitations": [],
  "nextActions": []
}
```

以上是字段说明，落盘时全部替换为真实值；未运行测试使用 exitCode:null 并在 limitations 记录原因，不能复制示例0。测试 baselineId 必须指向带本模块变更的候选清单，另存其逐文件哈希。补丁不能夹带其他窗口或旧 dirty 改动；删除必须明确说明用户价值和影响，默认保留历史证据及网址。依赖状态不通过时不填 ready_for_integration 代替整个 LP/LC 已验收；可对已完成本地部分交 partial。

最终回复：做了什么、变更路径、实际检查结果、未完成证据、共享接口变更及 W00 下一步。不启动别的模块，不因等待前置而编造结果。
