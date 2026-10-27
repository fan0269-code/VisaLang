# W08｜核心站点与Laya、广告解耦（LP05a）

```text
你负责VisaLang模块W08：实现核心站点可在Laya与广告关闭时构建、验证、打包和回滚的本地能力，交付独立核心候选的工程前置；不部署、不伪造目标主机验收。

项目主目录：/Users/a1-6/Documents/2.codex/1.visalang.org
先只读：AGENTS.md；docs/superpowers/plans/2026-09-23-visalang-laya-overall-plan.md；同目录2026-09-23-visalang-laya-content-plan.md；docs/prompts/2026-09-23-module-build/COMMON.md；docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md。

工作环境与依赖：
- 只能编辑W00分配的完整dirty快照副本，核对batchId/baselineId/manifest与副本绝对路径。下列scope均为副本相对路径；禁止直接改主目录、用worktree@HEAD丢失未提交成果、共享dist/.astro或覆盖其他窗口成果。未分配时仅只读分析与临时草案。
- 本地解耦实现可立即开展，不等待LP00、W02/LP01a、W10/LP01b或模型质量通过。LP00未完成只意味着真人收益/对应验收证据仍缺，不把它改写成已完成。
- 当前deploy/release.py强制adsRequired/layaRequired=true，prepare要求镜像与模型，activate/rollback操作真实主机；这些不是可直接启用的分支开关。当前dirty状态必须保留，禁止伪造clean commit或将candidateOnly改false绕过门禁。
- COMMON副本默认无.git；现有prepare还需git ls-files/status/rev-parse。副本以聚焦单元测试和结构核对验证，真实Git身份的prepare验证交W00在主目录对串行集成后的候选执行并绑定；缺此证据保持partial。不得伪造.git/提交，或为副本便利新增绕过生产身份校验的协议。

允许写入：
- 拟建src/data/runtime-features.ts统一组件开关契约；先读src/data/publication-manifest.ts与src/data/site.ts，若已有等效配置则复用，不能复制广告白名单成为第二事实源。
- astro.config.mjs；src/layouts/BaseLayout.astro、GuideLayout.astro；src/components/tools/PurposeSuggestion.astro；src/scripts/purpose-suggestion.ts；src/pages/tools/route-finder.astro、src/pages/zh/tools/route-finder.astro；src/pages/privacy-policy.astro、cookie-policy.astro。只改组件关闭/启用、 truthful文案与相关加载，保留内容事实/URL/索引政策。
- deploy/release.py、deploy.sh、rollback.sh、smoke-test.sh、nginx-vhost-template.conf、laya-purpose-nginx.conf、production-evidence.example.json、README.md；deploy/tests/test_release.py。
- scripts/launch-check.js；tests/deploy.test.js、adsense-risk-exposure.test.js、scheme-3-release-candidate.test.mjs、site.test.js、laya-purpose.test.mjs；可新增tests/runtime-features.test.mjs。保留不相关断言与安全约束。
- docs/module-handoffs/<batchId>/W08/。全局计划/图/sync/TASK_LOG由W00串行处理；不编辑public/ads.txt、来源事实或模型/依赖锁。

步骤：
[ ] 记录基线源码/测试和现有缺陷，先冻结组件开关契约及测试矩阵：核心全关、仅Laya、仅广告、两者开启，以及旧联合候选兼容/拒绝策略。交付接口供W09/W16消费，不提前假设下游已有相同字段。
[ ] 核心全关时：无Laya UI初始化/请求/代理必需项、无需Python模型/镜像/cache；无AdSense或广告技术网络加载。验证关闭后的双语手选、确定性规则、保存/恢复仍可用。只隐藏按钮/广告槽不算关闭；白名单仍表示资格，不等于本次必须启用。
[ ] 用统一配置贯穿Astro构建、页面文案、发布清单、prepare/verify、evidence门槛、Nginx生成、探针、start/restore和回滚。模型关闭的候选不能仍强制提供镜像/权重；模型启用时继续要求精确镜像digest与锁定权重。广告关闭的证据标不适用并附实际关闭验证，不能伪装adsConsent=pass。
[ ] 保留源文件/构建字节绑定、篡改拒绝、dirty candidate禁止激活、Owner操作与回滚基线绑定等门禁。验证模式转换及失败恢复：off→on、on→off、单组件变化不会误改另一组件；失败时恢复真实前态，恢复失败必须报错。
[ ] 修正既有检查的模式盲区：scripts/launch-check.js及release-candidate/adsense-risk/site测试当前硬要求14页广告；改为关闭模式0页、启用模式仅现有14篇允许页，不削弱索引与安全页面无广告规则。deploy/smoke-test.sh还错误要求首页有AdSense，而首页策略是无广告；应按实际模式核验正确白名单文章，首页/工具/指南库保持无广告。
[ ] 在独立副本串行运行相应模式的构建与检查，不并行操作同一dist/.astro：
    PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s deploy/tests -v
    node tests/deploy.test.js
    node tests/laya-purpose.test.mjs
    node tests/m2b-route-finder.test.mjs
    node tests/m3-chinese-tool-contract.test.mjs
    node tests/t27-measurement-privacy.test.mjs
    node tests/scheme-3-publication.test.mjs
    node tests/runtime-features.test.mjs（仅在本模块确实新增后）
    npm run build（按新冻结的模式接口逐项运行；正式全量launch-check由W00集成后执行）
    node tests/scheme-3-release-candidate.test.mjs
    node tests/adsense-risk-exposure.test.js（此脚本也会build，必须单独串行）
    bash -n deploy/deploy.sh deploy/rollback.sh deploy/smoke-test.sh
    记录实际命令、配置、退出码、日志；不能删测试或用always-pass绕开14页等旧断言。
[ ] 浏览器用副本专属端口验证EN/ZH手选完成、off状态零相关网络请求、可访问性与恢复。模型故障注入明确为stub；真实服务、真实主机或TLS未测均not_tested。若运行Nginx配置测试，使用明确的隔离临时配置，不能读取并重载生产配置。
[ ] 只做本地候选与事务单测/隔离演练，不执行deploy.sh、rollback.sh、release.py activate/rollback、server-init.sh、harden.sh或真实DNS/TLS/账户变更。模型/广告的真实启用验收仍留给独立模块和授权窗口。
[ ] 输出配置接口说明、组件矩阵、失败恢复证据、未来主机演练清单；实际主机、备份、TLS、17旧URL或真实回滚证据缺失时，模块implementationStatus保持partial，不宣称LP05a全部通过。

交付：docs/module-handoffs/<batchId>/W08/中的handoff.json使用COMMON字段，moduleId=W08；附逐文件base/candidate哈希、changeKind、patch/新增文件、测试日志与baselineId、sharedFileChanges及接口契约。W09必须消费W00串行集成后的本契约和新baseline，不能在旧副本直接覆盖共享文件。

状态仅ready_for_integration、partial、blocked；局部实现就绪与完整LP05a证据分开。W00统一集成、规划图新sync、独立Auditor及最终npm test等收口，本模块不自评正式完成。禁止commit、push、部署、购买、账户变更或联系他人。保留所有既有dirty改动，外部缺口如实报告，不能降低验收来声称成功。
```
