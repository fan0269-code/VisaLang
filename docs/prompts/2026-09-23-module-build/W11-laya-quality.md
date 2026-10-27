# W11｜Laya完整质量评测与有限修正（LP02）

```text
你负责VisaLang模块W11：在LP01b明确继续后完成Laya完整质量评测、有限修正及LC02/03完整上线资产，保留手选、确定性规则和用户确认边界。

项目主目录：/Users/a1-6/Documents/2.codex/1.visalang.org
先只读：AGENTS.md；docs/superpowers/plans/2026-09-23-visalang-laya-overall-plan.md；同目录2026-09-23-visalang-laya-content-plan.md；docs/prompts/2026-09-23-module-build/COMMON.md；docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md。

隔离与硬前置：
- 只在W00分配的独立完整dirty快照副本中编辑，下列路径均相对副本。核对batchId、baselineId和baseline manifest；不得写主目录，不得用worktree@HEAD替代未提交快照，不共用dist/.astro。无分配时只读分析和临时草案。
- 必须先获得中央已接收的W10/LP01b“继续”记录，绑定LP00真人证据与W02技术证据。本窗口先形成并冻结完整标注/split/评分协议，再进入数据评测或优化；不要求W10先制作本窗口负责的完整包，避免循环依赖。暂停、证据不足或没有真人时不得启动本模块的大投入，返回blocked并说明缺口；不能把模型可运行当作继续授权。
- 读取中央当前LC02/03定义、W02结果、services/laya-purpose/model.lock.json及锁定依赖。若W08已集成，必须以其新基线为准；不要从过期快照覆盖功能开关。

允许写入：
- services/laya-purpose/app.py、questions.json、test_app.py、probe.py、README.md。
- 新建experiments/laya-lp02/用于开发/评测协议、候选冻结、评分代码及按角色授权可见的数据和结果；历史experiments/laya-purpose*保持原字节。
- src/scripts/purpose-suggestion.ts、src/components/tools/PurposeSuggestion.astro、src/pages/privacy-policy.astro、tests/laya-purpose.test.mjs：补齐LC02输入示例、采用前核对、改选、含糊/多目的、不可用继续及文字处理说明，并对应真实UI状态；列为共享文件交W00集成，不修改资格规则或组件开关契约。
- docs/module-handoffs/<batchId>/W11/。
- 模型权重、model.lock.json、requirements.in/lock/txt与Dockerfile默认只读。若证据表明必须换模型/依赖，先交变更提案与影响，不在本模块偷偷升级；改为W00重新分配明确范围后再实施。

步骤：
[ ] 验证W10决定、候选版本与数据角色隔离。开发者不能读取保留集答案再声称盲测；由独立标注/评测角色管理封存答案与报告，记录实际身份/角色，不把AI标注写成真人。
[ ] 将全站规划第5节转为实际完整标注/split/评分协议，独立核对并冻结哈希后，按协议准备开发集至少120条、独立保留集240条（EN/ZH各120；合计180明确＋60需澄清）、困难集120条。两名独立标注者先盲标后裁决；同源句/翻译/近似改写同split。旧20/28/48例与W02已见样本只作回归，不充新保留集。
[ ] 有限比较当前Laya、规则对照与最多两个候选混合方案；只在开发集修正标签/拒识/共享token预算等证实缺陷。不生成签证答案，不自动填国家、判豁免、决定证书接受或暗改确定性route rules。
[ ] 对实际锁定库验证完整输入/指令/选项token构造和裁剪保护，不能用300字符或单一输出token计数替代。confidence未经校准不当正确概率；需要阈值则另有冻结校准集。
[ ] 补齐LC02全部双语交互/隐私文案与LC03定义、排除项、反例、澄清句、内容入口和支持层级；每项绑定实际UI/数据契约及语料版本。W02的最小整理仅作输入，不能直接声称完整资产通过；模型识别范围不扩大现有configured路线。
[ ] 冻结代码、问题定义、权重与依赖哈希后，交独立评测角色一次评测；已揭晓并用于修正的保留集降为回归，下一候选需新独立保留集。保留失败原始证据，不反复改期望答案。
[ ] 逐项报告分子/分母、95%置信区间、语言分组、宏F1、混淆矩阵、错误与覆盖率：240条准确率总体及每语言≥90%；具体建议精确率总体≥95%、每目的≥90%；180明确覆盖≥85%；60需澄清召回≥95%；困难集错误强分类≤2%；关键安全回归零失败。无建议的类别不算通过，不能靠全部拒识过关。
[ ] 运行副本内现有契约测试：
    PYTHONDONTWRITEBYTECODE=1 <已核实Python路径> -m unittest discover -s services/laya-purpose -p 'test_*.py' -v
    node tests/laya-purpose.test.mjs
    node tests/m2b-route-finder.test.mjs
    node tests/t27-measurement-privacy.test.mjs
    额外有意义的评分/裁剪/拒识测试写入允许路径。若改前端，用专属预览端口实测双语确认前零填表、改选、超时、busy、服务关闭与旧响应回退；已有node tests/t28-stale-results.test.mjs可作手选结果恢复回归，不能替代模型场景。
[ ] 输出固定候选身份、完整评测报告、逐项门槛表、残余风险、最终协议/契约差异及W12可复现输入。质量未过时如实标partial，不转交“已达标候选”；环境或封存协议缺失则blocked。

handoff目录：docs/module-handoffs/<batchId>/W11/。按COMMON写handoff.json，moduleId=W11；逐文件baseSha256/candidateSha256、changeKind、实际命令/退出码/日志与baselineId、依赖证据、sharedFileChanges、limitations/nextActions齐备。只交模块增量补丁/新增文件及哈希，由W00串行集成；保留未提交基线。

状态仅ready_for_integration、partial、blocked，不宣称模块正式完成或生产可上线。W00统一新sync、规划图、独立Auditor和最终npm test等验证；评测通过不代替独审、Linux容量或Owner启用授权。禁止commit、push、部署、购买、账户操作、联系他人，不自动下载模型或上传访客文本；需真实标注者/数据缺失时记录缺口，不伪造身份或研究。
```
