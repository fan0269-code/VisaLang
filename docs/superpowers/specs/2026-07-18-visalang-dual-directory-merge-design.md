# VisaLang 双目录合并设计

**日期：** 2026-07-18  
**状态：** 已获用户批准  
**唯一维护根：** `/Users/fanlw/Documents/考试网站维护/VisaLang`

## 1. 目标

将以下两个本地目录中属于同一 VisaLang 项目的有效成果整理到一个唯一维护项目中：

- 旧目录：`/Users/fanlw/Documents/搬迁测试/VisaLang`
- 目标目录：`/Users/fanlw/Documents/考试网站维护/VisaLang`

合并后，所有后续维护只在目标目录进行。旧目录原样保留为回滚备份，不删除、不改名、不继续维护。

## 2. 已确认的仓库关系

两个目录使用同一个远端：

```text
https://github.com/fan0269-code/VisaLang.git
```

旧目录：

- 分支：`fix/production-trust-stabilization`
- HEAD：`70c4cddfa87d131f6eb44dc7f2f3b1157526740c`
- 提交：`feat: add atomic test-gated deployment`

目标目录：

- 分支：`main`
- HEAD：`0e1dec2929cae835fbfbb88a9fe3cfd6d0e45e71`
- 与 `origin/main` 一致
- 工作树在勘察时干净

Git 已验证：旧目录 HEAD 是目标目录 HEAD 的祖先。目标 `main` 在旧目录 HEAD 之后增加了 9 个提交，包括内容 UI、导航状态、生产信任保护、部署重定向、烟雾测试等更新。

因此，目标目录已经包含旧目录全部已提交成果。两个目录之间不存在需要人工三方合并的已提交代码冲突。

## 3. 文件级差异结论

排除 `.git`、`node_modules`、`dist`、`.astro`、`graphify-out`、`.DS_Store`、`.audit`、`.claude` 和 `.superpowers` 后：

- 旧目录文件：299
- 目标目录文件：307
- 内容完全一致：269
- 仅旧目录存在：4
- 仅目标目录存在：12
- 同路径但内容不同：26

### 3.1 同路径差异的处理

26 个同路径差异全部来自目标目录在旧目录 HEAD 之后的已提交更新，包括：

- 部署说明、重定向、烟雾测试和 launch check；
- 导航当前状态和移动导航；
- GuideLayout、ZhGuideLayout、ArticleTOC；
- 首页、Route Finder、Exam Comparison；
- 全局样式；
- 部署测试和站点测试；
- 运维、内容地图、任务日志和设计文档。

处理原则：全部保留目标版本，不从旧目录覆盖。

### 3.2 目标目录独有文件

目标目录独有的 12 个文件属于目标后续更新，全部保留：

- `deploy/rollback.sh`
- `deploy/smoke-test.sh`
- `docs/CODEX_UI_OPTIMIZATION_REVIEW_PROMPT_2026-07-16.md`
- `docs/GERMANY_A1_SOURCE_REFRESH_2026-07-16.md`
- `docs/GERMANY_A1_SOURCE_REFRESH_PHASE_1_PROMPT.md`
- `docs/GERMANY_A1_SOURCE_REFRESH_PROMPT.md`
- `docs/RELEASE_AUDIT_AND_DEPLOY_PROMPT.md`
- `docs/superpowers/plans/2026-07-15-visalang-content-ui.md`
- `docs/superpowers/plans/2026-07-16-codex-ui-optimization-review.md`
- `docs/superpowers/specs/2026-07-15-visalang-content-ui-design.md`
- `docs/superpowers/specs/2026-07-16-codex-ui-optimization-review-design.md`
- `src/lib/navigation-current.ts`

### 3.3 旧目录独有且需要迁移的文件

仅迁移以下 4 份目标目录缺失的文档：

- `docs/prompts/2026-07-18-visalang-content-update-codex.md`
- `docs/superpowers/plans/2026-07-18-skill-installation-conflict-optimization.md`
- `docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md`
- `docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md`

迁移要求：

- 复制到目标相同相对路径；
- 不覆盖已存在文件；
- 复制后逐文件比较 SHA-256；
- 源和目标哈希必须完全一致；
- 复制失败时停止，不执行后续删除或覆盖动作。

## 4. 不迁移的内容

以下内容不属于产品合并范围，不从旧目录复制到目标项目：

- `graphify-out/`：旧目录的知识图谱和缓存已经落后于目标 `main`；目标外层目录另有更新的 graphify 结果；
- `.claude/`：旧目录为空；
- `.audit/`：双方已有相同的视觉审计资产，不重复复制；
- `.superpowers/`：目标包含自己的 SDD 运行记录，不用旧目录覆盖；
- `node_modules/`、`dist/`、`.astro/`：依赖、构建和缓存生成物；
- `.DS_Store`：系统文件；
- 旧目录 `.git/`：不迁移分支或 Git 元数据。

目标外层 `/Users/fanlw/Documents/考试网站维护/graphify-out` 和 `.gstack` 保持原样，不纳入 Git 项目合并。

## 5. 合并操作设计

### 阶段一：基线确认

在目标目录重新确认：

- 当前分支为 `main`；
- HEAD 与 `origin/main` 一致；
- 工作树没有实施前未说明修改；
- 4 个目标路径尚不存在。

若目标工作树出现新的未说明修改，停止并重新评估，不直接覆盖。

### 阶段二：增量迁移

创建目标缺失的 `docs/prompts/` 目录，并复制 4 份源目录独有文档。复制使用不覆盖模式；任何目标文件意外存在时停止。

### 阶段三：合并记录

在目标目录新增合并报告：

```text
docs/MERGE_REPORT_2026-07-18.md
```

报告应记录：

- 两个目录和唯一维护根；
- Git 提交继承关系；
- 文件差异统计；
- 目标保留、源迁移和排除清单；
- SHA-256 校验结果；
- 实际验证命令和结果；
- 旧目录仅作为回滚备份，不再维护。

### 阶段四：验证

在目标项目根运行：

```bash
npm test
git diff --check
npm run launch-check
```

并执行额外检查：

- 4 个迁移文件源、目标 SHA-256 一致；
- 目标现有已跟踪文件未被迁移步骤覆盖；
- `git status --short` 只显示本次 4 个迁移文档、合并规格、实施计划和合并报告，共 7 份新增文档；
- 目标 HEAD 仍为 `0e1dec2929cae835fbfbb88a9fe3cfd6d0e45e71`，除非用户之后明确要求提交；
- 旧目录的文件和 Git 状态保持不变。

## 6. 失败与回滚

如果复制或验证失败：

1. 停止完成声明；
2. 不修改任何目标已跟踪文件；
3. 删除仅由本次复制新建且已确认内容来自源目录的迁移文档和未完成合并报告；
4. 重新运行 `git status --short`，确认目标恢复到实施前状态；
5. 保留旧目录作为完整来源和回滚备份；
6. 报告准确失败命令和错误。

不得使用 `git reset --hard`、整目录覆盖或删除旧目录作为回滚方式。

## 7. 验收标准

合并完成必须满足：

- 唯一维护项目为 `/Users/fanlw/Documents/考试网站维护/VisaLang`；
- 目标保留 `main` 的全部较新代码、文档、部署和测试更新；
- 4 份旧目录独有文档已迁移且哈希一致；
- 目标包含合并规格、实施计划和一份完整合并报告；
- 最终目标工作树只新增 4 份迁移文档与上述 3 份合并流程文档，共 7 份文档；
- 没有迁移 graphify 缓存、本地工具记录或生成目录；
- 没有覆盖任何目标已跟踪文件；
- `npm test` 通过；
- `git diff --check` 通过；
- `npm run launch-check` 通过并输出 `READY.`；
- 旧目录保持原样，作为只读回滚备份；
- 未提交、未推送、未部署。

## 8. 后续维护规则

从合并完成起：

- 所有编辑、测试、构建、Git 操作都在 `/Users/fanlw/Documents/考试网站维护/VisaLang` 执行；
- `/Users/fanlw/Documents/搬迁测试/VisaLang` 不再接受新修改；
- 若需要更新知识图谱，应针对目标项目重新生成，而不是复制旧目录 `graphify-out`；
- 旧目录只有在确认目标长期稳定后，才可由用户另行决定归档或删除。
