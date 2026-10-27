# W12｜Laya真实Linux容量与费用验证（LP03）

```text
你负责VisaLang模块W12：对W11固定候选在真实可用的Linux测试环境验证镜像、运行容量、稳定性与成本边界。Mac推理、依赖解析、单元测试和健康接口200都不能代替这些证据。

项目主目录：/Users/a1-6/Documents/2.codex/1.visalang.org
先只读：AGENTS.md；docs/superpowers/plans/2026-09-23-visalang-laya-overall-plan.md；同目录2026-09-23-visalang-laya-content-plan.md；docs/prompts/2026-09-23-module-build/COMMON.md；docs/superpowers/plans/2026-09-23-visalang-module-dispatch-plan.md。

隔离与硬前置：
- 只编辑W00分配的独立完整dirty快照副本，下列路径均相对副本；核对batchId/baselineId/manifest。禁止直接改主目录、自动worktree@HEAD、共享dist/.astro。无分配只读分析与临时草案。
- 必须有W10/LP01b“继续”决定、W11已固定且完整质量达标的候选身份，以及W00确认可运行测试的真实Linux环境。明确CPU架构、内核、物理/虚拟机、内存、cgroup限额、磁盘、镜像基底和负载来源。Mac或Mac上的Linux虚拟环境仅能证明所测环境，不能冒充目标Linux主机。
- 没有真实Linux环境/测试权限、冻结镜像基底、离线权重或固定候选时，先完成只读缺口清单与运行方案，状态blocked；不得购买服务器、修改生产主机或自行绕过授权。

输入（默认只读）：
- W11候选manifest、质量报告、服务代码/问题定义/模型与依赖字节哈希。
- services/laya-purpose/{Dockerfile,app.py,questions.json,model.lock.json,requirements.in,requirements.lock,requirements.txt,README.md,probe.py,test_app.py}。
- W08集成后的发布模式/资源契约与deploy/{release.py,laya-purpose-nginx.conf,README.md}。现有3GB容器、2CPU参数只是旧配置，不是已经通过的容量结论。

允许写入：
- 新建experiments/laya-lp03/保存Linux专用测量运行器、场景定义、原始采样、分析报告与复现说明。
- services/laya-purpose/Dockerfile、probe.py、README.md：仅修正必要的可复现构建/探针环境标识问题；不得顺带升级依赖、换模型、调标签或改变分类算法。任何代码/镜像变化重新冻结，并明确是否需W11重验，旧质量报告不能无条件绑定新候选。
- docs/module-handoffs/<batchId>/W12/。deploy资源参数、全局计划/图/sync/TASK_LOG由W00据结论串行集成，不直接修改；权重/锁文件默认只读。

步骤：
[ ] 验证W11源代码与权重哈希及W10决定，登记目标环境与可运行范围、负载计划、采样间隔、运行时长和停止条件。不存在的硬件/镜像不能用示例标识填表。
[ ] 按services/laya-purpose/Dockerfile构建实际Linux amd64镜像。现有可复用命令形态：
    docker build --platform linux/amd64 --build-arg PYTHON_IMAGE=<已核实Python3.13基础镜像@sha256:digest> services/laya-purpose
    只使用已获准测试环境与锁定输入，记录基础/最终镜像身份、包清单、构建日志、架构与权重哈希。示例digest不能使用；依赖lock存在不等于build成功；不自动发布/推送镜像到registry。若最终只有本地image ID，明确其边界，生产需要的registry digest仍为缺口。
[ ] 权重按model.lock.json校验、保持multilingual子目录并只读挂载。使用离线模式、单worker、明确资源限制和本机回环端口；不得运行时下载模型，不暴露探针/指标到公网。启动命令在实验目录记录，不调用真实deploy.sh/release.py activate。
[ ] 分别测冷启动峰值、热请求、长输入、并发拒绝、断线后仍在运行的推理、重启、真实推理探针和静态站并行访问；/healthz仅说明loaded，需实际调用/api/purpose-suggestion/。检查原始输入没有进入服务/代理日志。
[ ] 记录宿主机及cgroup峰值、OOM/重启、CPU、请求分子分母、p95/p99和时间序列。标准不降低：热请求端到端p95≤2秒、p99≤5秒；24小时无OOM及持续内存增长；站点/代理/服务一起运行时峰值≤物理内存75%；前端12秒回退另测。没有完成24小时观察就写实际持续时长与not_tested，不能用少量快速请求推断全天稳定。
[ ] 将资源测量与独立成本表绑定：每月≤人民币100元（域名除外）按当前官方续费价格、税、IPv4、备份与必要流量核算，区分已有费用/试用/首年价。不购买，不许以估算填已确认费用；费用或硬件不可得则标未知。
[ ] 不达标保留原始失败；给出瓶颈与有限下一步建议。任何加载方式、精度、量化、模型或依赖变更都不能直接沿用质量结论，交W00/W11重新明确范围并复验，不在容量模块偷偷优化。
[ ] 运行现有契约回归并保存实际环境日志：
    PYTHONDONTWRITEBYTECODE=1 <候选使用的Python路径> -m unittest discover -s services/laya-purpose -p 'test_*.py' -v
    node tests/laya-purpose.test.mjs
    新Linux运行器按其真实CLI执行并记录命令、退出码、硬件/候选身份与开始结束时间。现有probe.py结果内写死local macOS CPU；不得原样把该报告当Linux证据，应在本模块运行器中如实记录或对允许的probe作审查修正。
[ ] 输出精确候选/镜像/机器身份、原始采样、质量未变/需重验说明、各门槛结果与费用表，供W00/W16绑定。Docker单测/模拟故障不冒充生产真实回滚，Linux测试环境通过不代表生产已部署。

交付：docs/module-handoffs/<batchId>/W12/；按COMMON写handoff.json，moduleId=W12，包含逐文件base/candidate哈希与changeKind、补丁/新增文件及哈希、tests实际命令/退出码/logPath/baselineId、W10/W11/W08证据依赖、sharedFileChanges、limitations、nextActions。由W00串行集成，禁止覆盖其后续新基线。

状态仅ready_for_integration、partial、blocked；缺目标环境或质量前置即blocked，观察/容量/成本未齐为partial，不宣称正式完成或允许启用。W00统一规划图新sync、独立Auditor及最终npm test等验证。禁止commit、push、部署、购买、生产主机/账户变更或联系他人；本地测试许可不扩大为外部行动授权。
```
