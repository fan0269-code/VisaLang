# VisaLang 双目录合并报告

**日期：** 2026-07-18  
**结果：** 合并完成，目标项目验证通过  
**唯一维护根：** `/Users/fanlw/Documents/考试网站维护/VisaLang`

## 1. 合并对象

旧目录：

```text
/Users/fanlw/Documents/搬迁测试/VisaLang
```

目标目录：

```text
/Users/fanlw/Documents/考试网站维护/VisaLang
```

从本次合并完成起，所有后续编辑、测试、构建和 Git 操作都应在目标目录执行。旧目录保留为回滚备份，不再继续维护。

## 2. Git 提交关系

两个目录均使用：

```text
https://github.com/fan0269-code/VisaLang.git
```

| 项目 | 分支 | HEAD |
|---|---|---|
| 旧目录 | `fix/production-trust-stabilization` | `70c4cddfa87d131f6eb44dc7f2f3b1157526740c` |
| 目标目录 | `main` | `0e1dec2929cae835fbfbb88a9fe3cfd6d0e45e71` |
| 目标远端 | `origin/main` | `0e1dec2929cae835fbfbb88a9fe3cfd6d0e45e71` |

通过 `git merge-base --is-ancestor` 验证：旧目录 HEAD 是目标目录 HEAD 的祖先。

目标 `main` 已包含旧目录的全部已提交成果，并在其后增加 9 个提交。目标目录因此被确定为唯一代码基线；没有用旧目录覆盖目标的任何已跟踪文件。

## 3. 文件差异整理

排除 `.git`、`node_modules`、`dist`、`.astro`、`graphify-out`、`.DS_Store`、`.audit`、`.claude` 和 `.superpowers` 后：

| 分类 | 数量 | 处理 |
|---|---:|---|
| 内容完全一致 | 269 | 无操作 |
| 仅旧目录存在 | 4 | 迁移到目标 |
| 仅目标目录存在 | 12 | 保留目标 |
| 同路径内容不同 | 26 | 均为目标后续提交，保留目标 |

目标独有及同路径差异主要涉及：导航状态、内容 UI、GuideLayout、首页、工具页、部署脚本、重定向、烟雾测试、launch check、测试和运维文档。

## 4. 已迁移文档

以下 4 份文档以非覆盖方式复制到目标相同路径：

| 文件 | SHA-256 |
|---|---|
| `docs/prompts/2026-07-18-visalang-content-update-codex.md` | `48c27038d7884a6baeeb2d9045b7163330adde3f54bea7c94c1d7fad384e1684` |
| `docs/superpowers/plans/2026-07-18-skill-installation-conflict-optimization.md` | `b0332d76f37d86c771ea3274c6030dc862f0531c5c6050fbee36c1dedcde90b6` |
| `docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md` | `782377978c560c90ec430901468abd929ed1427962b8f52e675d9c5978c2d55b` |
| `docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md` | `3d351de3b0bc8a3fc15e2e65a26f97888362cbe07f01ad95b0dca9b3a35989e6` |

源文件与目标文件的 SHA-256 全部一致。

复制后执行：

```bash
git diff --exit-code
```

结果为退出码 0，证明目标已跟踪文件未被修改。

## 5. 明确排除的内容

本次没有迁移：

- 旧目录 `graphify-out/`；
- 旧目录 `.claude/`；
- 双方 `.audit/`；
- 目标 `.superpowers/` 本地 SDD 记录；
- `node_modules/`、`dist/`、`.astro/`；
- `.DS_Store`；
- 旧目录 `.git/`；
- 目标外层 `/Users/fanlw/Documents/考试网站维护/graphify-out` 和 `.gstack`。

这些目录是缓存、生成物、本地工具记录或独立辅助数据，不属于产品代码合并范围。

## 6. 目标项目验证

所有正式验证均在以下目录执行：

```text
/Users/fanlw/Documents/考试网站维护/VisaLang
```

### `npm test`

结果：通过，退出码 0。

通过的测试范围包括：

- route tool rules；
- commercial page rules；
- Germany A1、B1、TestDaF cluster rules；
- guide sources、related links、compliance、app data、legacy handoff 和 deployment checks；
- source-review rendered HTML states；
- deployment configuration；
- UI、route、guide、tool、SEO、accessibility 和 migration checks。

### `git diff --check`

结果：通过，退出码 0，无输出。

### `npm run launch-check`

结果：通过，退出码 0。

构建结果：

- 98 个页面生成成功；
- sitemap 生成成功；
- launch readiness：37 项通过，0 项失败；
- 最终输出：`READY.`

## 7. 执行路径偏差说明

首次组合验证命令未显式切换目录，因当前会话工作目录仍在旧项目，导致旧目录额外执行了一次 `npm test` 和 `npm run launch-check`。

影响范围：

- 旧目录被 Git 忽略的 `.astro/`、`dist/` 和相关构建缓存被重新生成；
- 旧目录 HEAD 未变化；
- 旧目录已跟踪源码无 diff；
- 旧目录未跟踪文档状态与实施前快照完全一致；
- 没有删除、改名或覆盖旧目录的源码和文档。

发现后已使用显式 `cd '/Users/fanlw/Documents/考试网站维护/VisaLang'` 在目标目录重新执行全部正式验证。第 6 节只记录目标目录的正式验证结果。

## 8. 最终新增文档

目标工作树最终只新增以下 7 份文档：

1. `docs/MERGE_REPORT_2026-07-18.md`
2. `docs/prompts/2026-07-18-visalang-content-update-codex.md`
3. `docs/superpowers/plans/2026-07-18-skill-installation-conflict-optimization.md`
4. `docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md`
5. `docs/superpowers/plans/2026-07-18-visalang-dual-directory-merge-plan.md`
6. `docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md`
7. `docs/superpowers/specs/2026-07-18-visalang-dual-directory-merge-design.md`

目标 HEAD 仍为：

```text
0e1dec2929cae835fbfbb88a9fe3cfd6d0e45e71
```

## 9. 后续维护规则

- 唯一维护项目：`/Users/fanlw/Documents/考试网站维护/VisaLang`；
- 不再在 `/Users/fanlw/Documents/搬迁测试/VisaLang` 创建新修改；
- 旧目录保留为回滚备份；
- 需要知识图谱时，应以目标项目重新生成；
- 本次未提交、未推送、未部署。
