# P03｜W08核心、用途建议和广告独立开关

```text
项目：/Users/a1-6/Documents/2.codex/1.visalang.org。
先读取AGENTS.md、docs/PROJECT_SCAN_2026-09-24.md、docs/superpowers/plans/2026-09-24-visalang-next-stage-content-ui.md、docs/prompts/2026-09-23-module-build/COMMON.md及Master/overlay/EXECUTION_RECORD。新增内容规划从属于这些权威，不改变原T/LP/LC门槛。
本提示词只授权所列本地工作，不授权commit/push/deploy/真实回滚、付费API、真实数据外发、账户变更或联系真人。保留所有既有dirty成果。不得用截图/合成样本冒充真人、真实设备或生产证据。不要索取已经明确给出的同一范围授权。
你负责W08/LP05a。本批只能在新W00分配副本内做本地工程；使用已校正的旧W08-core-decoupling.md完整文件范围/失败恢复要求，并读取TypeSafe方案第10节。不要从9/23旧副本开始。

当前源码真相：release.py要求adsRequired=true且purposeProvider为laya或typesafe；TypeSafe分支不要求Laya权重。因此仍未具备core-only，不能继续假设layaRequired始终true。服务实现、隐私说明及TypeSafe凭据边界必须保留。

[ ] 先冻结唯一配置契约：用途建议模式off/laya/typesafe，广告off/on；命名由你根据现有配置合理选择，接口文档供W09/W16复用。形成六组合测试矩阵和旧候选兼容/拒绝规则，禁止并行第二配置源。
[ ] core-only无用途建议UI初始化、请求、代理、Python/模型/镜像/TypeSafe key必需项，也无广告加载；双语手选、确定性路线和保存/恢复继续工作。仅隐藏按钮不算关闭。
[ ] laya模式保留镜像/权重锁与本地容量门禁；typesafe模式使用服务器key、准确发送前说明和费用/隐私/配额证据，不要求无关Laya权重；所有provider故障可手选。AI源码修改先读取项目TypeSafe skill和最新官方文档，不用API验证代替mock单测。
[ ] 同一契约贯穿构建、页面、发布manifest、prepare/verify、evidence门禁、Nginx、probe、start/restore/rollback；保留真实Git身份、dirty候选不可激活、hash、Owner门禁。无.git副本做单测，真实prepare身份验证由W00在集成主树执行，不造.git绕过。
[ ] 六组合以及off↔on、laya↔typesafe失败恢复均有真实断言；广告off为0加载/0广告页，on仅既有14页上限，首页/工具不加载。不得扩大白名单或以假pass替代N/A。
[ ] 串行运行旧W08列出的Python部署单测、node契约、各模式构建及广告/发布检查；独立端口验证EN/ZH和实际零请求，stub标注清楚。禁止真实activate/rollback、DNS/TLS或账户操作。
[ ] 无实际主机、备份、TLS和回滚证据时LP05a仍partial；交本地配置契约、六模式实测、事务单测/失败恢复、未来主机缺口。不要把TypeSafe一次合成smoke算作生产质量通过。

交付必须包含COMMON的handoff.json、逐文件base/candidate哈希、补丁、新文件、测试实际命令/退出码/日志、截图或来源证据、未验证项和共享接口变动。仅使用ready_for_integration、partial或blocked，不自称独立审核PASS。功能窗口不改主树、不维护全局图，W00串行集成后统一治理与独审。

```
