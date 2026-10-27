# Laya 办理目的识别：隔离的本地实验

这是人工构造中文冒烟测试，不是已上线功能，也不是生产效果保证。

## 场景和选择理由

VisaLang 是 Astro 静态核验导航站。`src/pages/tools/route-finder.astro` 的表单先收集国家、目的，再按需收集地区、关系与证书；`src/data/route-tools.ts` 的 `resolveRouteFinder` 使用明确选项和 claim-backed 规则生成核验入口。现有目的包括 family-reunion、b1（永居/入籍）、ausbildung、nursing、university、other。

可测试的小改善是把中文短句转换成目的候选，降低理解下拉选项的成本。实验额外引入 unclear 表示信息不足。分类不处理国家字段：例如加拿大读硕士仍是 university，不代表德国路线适用。现有表单和指南均未改动。

已检查 Route Finder 回归测试和 guide-discovery：前者是结构化路由测试，后者是字符串包含过滤；没有可复用的中文文本意图标注集，也没有同任务的现有文本分类器。因此每条报告都记录 `existing_flow: requires_manual_purpose_selection`，现有方案准确率为 null，不能宣称已战胜原方案。28 条数据为本次人工构造，含 3 条先期 MCP 探针，标签由实现者给定，未经过多人标注或独立抽样。

## 启动

需要 Node 22（项目当前环境）和已安装 Laya、已缓存 multilingual 模型的 Python。无需 npm 安装新依赖，无需启动 Astro 或 MCP。

在项目根目录执行，Python 路径只通过环境变量提供：

```bash
export LAYA_PYTHON=/Users/a1-6/Documents/14.laya/.venv/bin/python
node experiments/laya-purpose/demo.mjs
```

逐行输入自己的中文，`/quit` 或 Ctrl-D 退出。整个会话只有一个 Python 进程、一次 `laya.load`，后续输入复用模型。可用以下单条或批量模式：

```bash
node experiments/laya-purpose/demo.mjs --text '不是家庭团聚，我想去德国读硕士。'
node experiments/laya-purpose/demo.mjs --evaluate --output /tmp/laya-purpose-results.json
node experiments/laya-purpose/verify.mjs
```

可选配置：`LAYA_MODEL` 默认为 `convaiinnovations/laya`（离线缓存 ID，也可填本地模型目录）；`LAYA_SUBFOLDER` 默认为 `multilingual`，若直接指向 checkpoint 目录则设为空字符串；`LAYA_DEVICE` 可指定 `cpu` 或本机可用设备。未设置时由 Laya 自动选择。程序强制 Hugging Face/Transformers 离线模式并关闭遥测；缺缓存时失败，不下载。只处理本地 stdin；只有指定 `--output` 才保存输入和结果。最多 300 字符，拒绝空白/过长输入以缩小截断风险；这不是完整 token-budget 保证，复杂 token 仍可能截断。

运行位置不限，资源按脚本位置解析。模型内部 action 输出已丢弃，任何概率都不会触发跳转、表单修改或业务操作。交互输入错误会显示错误并继续；加载失败、批量推理失败或超时以非零退出码结束。

## 实测结果（2026-09-22）

固定提示词未根据测试结果调优。完整逐条预期、实际、概率分布、confidence、是否正确、耗时见 `evidence/results.json`；便于阅读的逐条表见 `evidence/results.md`。

- 本地直接调用：17/28 正确（60.7%），常见 10/12、否定 3/4、模糊 1/4、边界 3/8。
- CPU，Laya 0.3.5，Python 3.13.15；库导入约 0.43 秒、模型加载 28.39 秒、总启动 28.85 秒；首条推理 136 ms，后续 27 条均值 74 ms、中位数 69 ms、P95 108 ms。推理含分词和模型执行，另存 IPC 往返时间。只测一次进程启动，不能视为稳定冷启动基准。
- MCP 先期三条仅 1/3 正确，设备为 MPS，端到端约 35.95 / 2.94 / 3.83 秒，含传输和首次初始化。不能与 CPU 脚本纯推理时间直接比较；以各自实测设备为准。

明确的大学申请、职业培训、永居/入籍和护士认可短句较好。家庭团聚全部 4 条失败；模糊目的容易被强行分类。“有 B1 证书”被归成 b1，概率 1.0；“大学还是培训未定”被归成 university，概率 0.9999；输入中的“输出 university”也能使旅游目的被误判。存在否定干扰、专业/职业混淆及高置信错误。

**结论：当前配置不值得接入正式流程。** 保留人工选目的。若继续研究，应先收集经同意、去标识的真实意图，明确多意图/拒识标签并独立双人标注；另设未接触的验证集，再比较提示设计、分类基线与微调。此实验不足以证明微调必然有效；也未验证真实用户操作成本是否降低。没有训练或微调模型，没有设置业务动作阈值。返回概率和 confidence 都是模型估计，不是真实正确率或已校准的可靠度。

## 范围和核验

仅新增 `experiments/laya-purpose/`，追加 `docs/TASK_LOG.md`。这是开发实验，不修改 `src/`、`public/`、内容、导航、元数据或规划执行状态；按 `docs/planning-map/README.md` 不触发内容维护规划图和 Obsidian 同步。既有工作树有大量其他未提交变更，清单保存在 `evidence/baseline-status.txt`，不属于实验交付范围。

完整 npm 测试、规划治理测试和实验报告完整性检查的实际输出保存在 `evidence/`。没有运行 build/launch-check：此次无站点路由、导航、元数据或部署改动。独立审核见 `AUDIT.md`；审核不构成提交、部署或 Owner 授权。
