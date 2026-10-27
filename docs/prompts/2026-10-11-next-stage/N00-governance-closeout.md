# N00-G｜治理结项与 N01 准入

复制下面完整提示词到执行任务。当前提示词修订前的规划回执为 `VL-PMAP-20261011-02`，SHA-256 `2b7fc19a7865ffd6f89a1c4048faca6e62db2771598f2c30b7cad872e39e7d35`。执行前必须重新检查工作区、最新 `sync.json`、审核结果和外部环境；不要把该基线当成执行时的当前值。

```text
项目根目录：/Users/a1-6/Documents/2.codex/1.visalang.org

目标：完成 N00 治理结项并判定 N01 是否已具备准入条件。N00 intake 已完成，四个模块归档不需重做；本任务只关闭当前规划图与维护窗口的治理证据缺口，不集成模块、不实施产品功能、不发布。

先阅读 AGENTS.md、docs/planning-map/README.md、docs/superpowers/plans/2026-10-11-visalang-project-roadmap.md、docs/superpowers/plans/2026-09-28-visalang-integration-content-acceptance.md、docs/prompts/2026-10-11-next-stage/README.md、当前 planning-map/sync.json、当前独立 Auditor 报告和 docs/VISALANG_UPDATE_RECORD_REVIEW_2026-10-11.md。按 Master Package → 原始 backlog → status overlay → EXECUTION_RECORD 顺序核实权威状态。复核仓库当前的既有 dirty/untracked 基线，保护其他工作；不重置或覆盖无关文件。

## 0. 预检与停止条件

1. 冻结本次确切候选路径、分类和 SHA-256；确认当前审计报告绑定的是最新完整 sync.json 字节。任何源、图、receipt、scope、drift、Owner 状态或候选证据变更都须重新计算哈希并让同一独立 Auditor 复审。
2. 先确认受支持的 Archify Chrome/DevTools 执行环境已相对前两次 SIGABRT 有实际变化，且仓库指定 Obsidian Vault 目录和同步模板均可读取。不能仅凭预期、环境变量或 Chrome 可执行文件存在认定环境已恢复。
3. 若浏览器环境没有可验证变化，不得在同一环境重试失败命令；不使用备用浏览器、CDP、CUA、手写脚本、截图工具或其他路径替代。若 Vault 目录或模板仍不可用，不新建替代目录、不编写假模板、不声称已同步；保留本地 review payload 并停止 N00 结项。
4. 预检失败时只更新准确的阻塞证据和维护记录，保持 `drift: unresolved`、N01 blocked、`releaseStatus: not_deployed`。报告具体缺少的环境/路径/文件，结束本轮；不要为绕过 gate 改写测试或降低完成条件。

## 1. Archify 交付与浏览器证据

只有第 0 节确认浏览器环境已恢复后才继续：

1. 在仓库根目录使用 Archify skill 自带 CLI，对 `docs/planning-map/visalang-overall-build-plan.archify.json` 执行 showcase `validate`；需 9 项、0 errors、0 warnings。
2. 使用同一候选执行原子 showcase `deliver` 到 `docs/planning-map/visalang-overall-build-plan.html`。交付失败时不得对旧 HTML 运行视觉检查。
3. 仅对本次成功 delivery 的确切 HTML 运行唯一规范命令：`node <archify-skill-dir>/bin/archify.mjs visual-check docs/planning-map/visalang-overall-build-plan.html --json`。若安装版 CLI 参数格式发生变化，先查该已安装 CLI 的帮助输出，不自行替换实现。
4. receipt 必须绑定本次 HTML SHA-256 和字节数，完成 1440×900、1600×1000、1920×1080、2048×1320 的 containment/readability 检查，并生成 1440×900、2048×1320 的 light/dark 四张截图。保存命令 receipt 与所有截图，计算 HTML 和每张截图的 SHA-256。
5. 由独立的图像能力审阅者查看这四张当前截图，另存独立 perceptual-review receipt，列出 HTML hash、browser receipt hash、每张图的路径/尺寸/hash，以及逐项观察。不得把自动浏览器 receipt 当作感知审阅。

## 2. Obsidian 维护记录

仅当仓库规定的实际 Vault 目标和模板可用时：

1. 读取 `/Users/fanlw/Documents/Website-Content-Hub/50-内容模板/网站更新同步记录模板.md`，按模板创建或更新本次记录，写入 `/Users/fanlw/Documents/Website-Content-Hub/10-visalang.org网站维护/30-待审核/网站更新记录/`。
2. 记录 branch、baseline/result commit（实际可得时）、本次 changed files、规划依据、内容摘要、官方来源（本次仅规划同步时说明无新增事实性内容来源）、实际验证结果、风险和需 Owner 决策项。
3. 保留 front matter：`status: review`、`needs_human_review: true`、`owner_decision: pending`、`deployment_status: not_started`。写入后重新读取实际 Vault 文件并记录路径和 SHA-256；只有该读回证据才能算同步成功。
4. 不把本地 payload 冒充 Vault 文件，不改写 Owner 决策，不部署、不发布、不启用广告。

## 3. 规划同步与验证

1. 本提示词、README 和 roadmap 的相关链接属于 `docs/prompts/` / `docs/superpowers/plans/` watched scope。按 `docs/planning-map/README.md` 更新 status-only 图、唯一新 sync ID、append-only history、完整 watch digest、精确候选路径/分类/字节绑定、Archify delivery/browser/perceptual/Vault evidence。保持 12-node / 11-edge topology，除非权威规划确有范围或依赖变化。
2. 更新 `docs/TASK_LOG.md` 与本地/Vault 维护记录，明确每个命令的真实退出结果、截图/审阅/Vault读回实际状态及剩余限制。
3. 在正式独立审计前先运行 `node tests/planning-map-governance.test.mjs`，记录真实退出码和首个失败断言，将结果作为预审诊断；在浏览器、独立感知审阅、Vault 同步等外部 gate 仍缺失时，允许该预审失败，但不得把它描述为通过，也不得为绕过断言改写测试或伪造证据。治理规程的具体顺序见 `docs/planning-map/README.md`。
4. 只有外部证据齐备、候选 scope 与全部 bytes 已冻结后，才按与 `sync.scope.changedPaths` 完全一致的冻结 scope，交由指定的 VisaLang Independent Auditor 审查，并绑定整个 `sync.json` 的 SHA-256。修复全部 P0/P1/P2 后由同一 Auditor 复审，取得明确 `PASS`。收到 PASS 后不得改动任何已绑定候选文件；紧接着再运行 `node tests/planning-map-governance.test.mjs`，它必须退出 0。若最终测试未退出 0，或任何候选 bytes 有变化，N00 保持 blocked；修复后更新规划同步并由同一 Auditor 对新冻结 scope 和 sync.json hash 复审，再重跑最终测试。
5. 只有 Archify showcase validate/deliver、自动浏览器检查、独立图像审阅、Vault 实际写入/读回、治理测试及独立 Auditor 全部通过，才可将 N00 标记完成和 drift 标记 aligned。任何缺项都保持 unresolved/blocked。

## 4. N01 准入和边界

- 不在本任务中执行 N01。N00 所有准入门槛通过后，只报告可使用 `docs/prompts/2026-09-28-next-stage/N01-integrate-and-verify.md`；等待 Owner 对新阶段的明确派发。
- N01 的既定合并顺序为 W03 → W04 → W08 → W07；各包已有缺口和 W07/W04/W08 的实际验证要求按 N01 提示词执行，不得视为本轮已验证。
- 不 commit、push、deploy、执行真实回滚、修改外部账户、联系招募对象、读取密钥、调用付费 API 或外发真实输入。

## 输出

报告 N00 每个 gate 的 PASS/BLOCKED 与具体证据，最新 sync ID/hash，planning-map governance 命令真实退出码，同一 Auditor 报告路径和 verdict，Vault 实际路径/read-back hash（若成功），以及 N01 是否获得准入。没有逐项证据时保持 BLOCKED，不推断通过。
```
