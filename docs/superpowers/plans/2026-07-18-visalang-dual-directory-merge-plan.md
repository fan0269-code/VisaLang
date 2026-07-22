# VisaLang 双目录增量合并 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将旧目录独有的 4 份有效文档安全迁移到目标项目，保留目标 `main` 的全部较新成果，并生成可审计合并报告。

**Architecture:** 目标仓库是旧仓库提交历史的后继，因而以目标 `main` 为唯一代码基线。实施只执行非覆盖文档复制、源目标哈希校验和目标项目验证；旧目录、目标已跟踪文件、缓存及本地工具记录均不改变。

**Tech Stack:** Git、Python 3、SHA-256、Astro 7、Node assert tests、npm

---

## 文件结构

**源目录：** `/Users/fanlw/Documents/搬迁测试/VisaLang`

**目标目录：** `/Users/fanlw/Documents/考试网站维护/VisaLang`

**从源复制到目标：**

- `docs/prompts/2026-07-18-visalang-content-update-codex.md`
- `docs/superpowers/plans/2026-07-18-skill-installation-conflict-optimization.md`
- `docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md`
- `docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md`

**在目标创建：**

- `docs/MERGE_REPORT_2026-07-18.md`
- `docs/superpowers/plans/2026-07-18-visalang-dual-directory-merge-plan.md`

**已在目标创建并保留：**

- `docs/superpowers/specs/2026-07-18-visalang-dual-directory-merge-design.md`

### Task 1: 锁定合并基线

**Files:**
- Verify: `/Users/fanlw/Documents/搬迁测试/VisaLang/.git`
- Verify: `/Users/fanlw/Documents/考试网站维护/VisaLang/.git`

- [ ] **Step 1: 记录旧目录基线**

Run:

```bash
git -C '/Users/fanlw/Documents/搬迁测试/VisaLang' status --short --branch
git -C '/Users/fanlw/Documents/搬迁测试/VisaLang' rev-parse HEAD
```

Expected:

- 分支为 `fix/production-trust-stabilization`；
- HEAD 为 `70c4cddfa87d131f6eb44dc7f2f3b1157526740c`；
- 旧目录未跟踪状态与勘察结果一致。

- [ ] **Step 2: 记录目标目录基线**

Run:

```bash
git -C '/Users/fanlw/Documents/考试网站维护/VisaLang' status --short --branch
git -C '/Users/fanlw/Documents/考试网站维护/VisaLang' rev-parse HEAD
git -C '/Users/fanlw/Documents/考试网站维护/VisaLang' rev-parse origin/main
```

Expected:

- 分支为 `main`；
- HEAD 与 `origin/main` 均为 `0e1dec2929cae835fbfbb88a9fe3cfd6d0e45e71`；
- 除已批准的合并规格与实施计划外，没有其他未说明修改。

- [ ] **Step 3: 再次验证提交继承关系**

Run:

```bash
git -C '/Users/fanlw/Documents/考试网站维护/VisaLang' merge-base --is-ancestor \
  70c4cddfa87d131f6eb44dc7f2f3b1157526740c \
  0e1dec2929cae835fbfbb88a9fe3cfd6d0e45e71
```

Expected: 退出码 0。

- [ ] **Step 4: 验证 4 个目标路径不存在**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
root = Path('/Users/fanlw/Documents/考试网站维护/VisaLang')
paths = [
    'docs/prompts/2026-07-18-visalang-content-update-codex.md',
    'docs/superpowers/plans/2026-07-18-skill-installation-conflict-optimization.md',
    'docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md',
    'docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md',
]
existing = [path for path in paths if (root / path).exists()]
assert not existing, f'目标文件已存在，停止复制: {existing}'
print('destination-preflight: PASS')
PY
```

Expected: `destination-preflight: PASS`。

### Task 2: 非覆盖迁移 4 份文档

**Files:**
- Create: `docs/prompts/2026-07-18-visalang-content-update-codex.md`
- Create: `docs/superpowers/plans/2026-07-18-skill-installation-conflict-optimization.md`
- Create: `docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md`
- Create: `docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md`

- [ ] **Step 1: 使用独占创建模式复制文件**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
source = Path('/Users/fanlw/Documents/搬迁测试/VisaLang')
target = Path('/Users/fanlw/Documents/考试网站维护/VisaLang')
paths = [
    'docs/prompts/2026-07-18-visalang-content-update-codex.md',
    'docs/superpowers/plans/2026-07-18-skill-installation-conflict-optimization.md',
    'docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md',
    'docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md',
]
for rel in paths:
    src = source / rel
    dst = target / rel
    assert src.is_file(), f'源文件不存在: {src}'
    dst.parent.mkdir(parents=True, exist_ok=True)
    with dst.open('xb') as handle:
        handle.write(src.read_bytes())
    print(f'copied: {rel}')
PY
```

Expected: 输出 4 行 `copied:`，无覆盖错误。

- [ ] **Step 2: 验证 SHA-256 完全一致**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import hashlib
source = Path('/Users/fanlw/Documents/搬迁测试/VisaLang')
target = Path('/Users/fanlw/Documents/考试网站维护/VisaLang')
paths = [
    'docs/prompts/2026-07-18-visalang-content-update-codex.md',
    'docs/superpowers/plans/2026-07-18-skill-installation-conflict-optimization.md',
    'docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md',
    'docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md',
]
for rel in paths:
    src_hash = hashlib.sha256((source / rel).read_bytes()).hexdigest()
    dst_hash = hashlib.sha256((target / rel).read_bytes()).hexdigest()
    assert src_hash == dst_hash, f'哈希不一致: {rel}'
    print(f'{rel}\t{src_hash}')
print('sha256-verification: PASS')
PY
```

Expected: 4 个哈希和 `sha256-verification: PASS`。

- [ ] **Step 3: 验证目标已跟踪文件未改变**

Run:

```bash
git -C '/Users/fanlw/Documents/考试网站维护/VisaLang' diff --exit-code
```

Expected: 退出码 0，无输出。

### Task 3: 运行目标项目验证

**Files:**
- Verify: `/Users/fanlw/Documents/考试网站维护/VisaLang/package.json`
- Verify: `/Users/fanlw/Documents/考试网站维护/VisaLang/tests/`
- Verify: `/Users/fanlw/Documents/考试网站维护/VisaLang/scripts/launch-check.js`

- [ ] **Step 1: 运行完整测试**

Run:

```bash
cd '/Users/fanlw/Documents/考试网站维护/VisaLang' && npm test
```

Expected: 退出码 0，全部 Node assert 测试通过。

- [ ] **Step 2: 检查 diff 格式**

Run:

```bash
cd '/Users/fanlw/Documents/考试网站维护/VisaLang' && git diff --check
```

Expected: 退出码 0，无输出。

- [ ] **Step 3: 运行发布就绪检查**

Run:

```bash
cd '/Users/fanlw/Documents/考试网站维护/VisaLang' && npm run launch-check
```

Expected: 退出码 0，最终输出包含 `READY.`。

### Task 4: 生成合并报告

**Files:**
- Create: `docs/MERGE_REPORT_2026-07-18.md`

- [ ] **Step 1: 写入实际合并事实**

报告必须记录：

```text
唯一维护根：/Users/fanlw/Documents/考试网站维护/VisaLang
旧目录：/Users/fanlw/Documents/搬迁测试/VisaLang
旧 HEAD：70c4cddfa87d131f6eb44dc7f2f3b1157526740c
目标 HEAD：0e1dec2929cae835fbfbb88a9fe3cfd6d0e45e71
提交关系：旧 HEAD 是目标 HEAD 的祖先
文件差异：269 相同、4 仅旧、12 仅目标、26 目标后续更新
迁移：4 份文档
排除：graphify-out、.claude、.audit、.superpowers、生成目录和 Git 元数据
```

- [ ] **Step 2: 写入 4 个实际 SHA-256**

使用 Task 2 Step 2 的实际输出，不使用占位值。

- [ ] **Step 3: 写入实际验证结果**

分别记录：

- `npm test` 的实际通过结果；
- `git diff --check` 的实际结果；
- `npm run launch-check` 的实际通过项、失败项和 `READY.` 状态；
- 旧目录未修改；
- 未提交、未推送、未部署。

### Task 5: 最终边界验证

**Files:**
- Verify: 目标工作树
- Verify: 旧目录工作树

- [ ] **Step 1: 检查目标新增文件集合**

Run:

```bash
git -C '/Users/fanlw/Documents/考试网站维护/VisaLang' status --short
```

Expected: 只显示以下 7 份新增文档：

```text
docs/MERGE_REPORT_2026-07-18.md
docs/prompts/2026-07-18-visalang-content-update-codex.md
docs/superpowers/plans/2026-07-18-skill-installation-conflict-optimization.md
docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md
docs/superpowers/plans/2026-07-18-visalang-dual-directory-merge-plan.md
docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md
docs/superpowers/specs/2026-07-18-visalang-dual-directory-merge-design.md
```

- [ ] **Step 2: 检查目标 HEAD 未变化**

Run:

```bash
git -C '/Users/fanlw/Documents/考试网站维护/VisaLang' rev-parse HEAD
```

Expected: `0e1dec2929cae835fbfbb88a9fe3cfd6d0e45e71`。

- [ ] **Step 3: 检查旧目录未被修改**

Run:

```bash
git -C '/Users/fanlw/Documents/搬迁测试/VisaLang' rev-parse HEAD
git -C '/Users/fanlw/Documents/搬迁测试/VisaLang' status --short --branch
```

Expected:

- HEAD 仍为 `70c4cddfa87d131f6eb44dc7f2f3b1157526740c`；
- 旧目录状态与实施前基线相同；
- 没有删除、改名或修改旧目录文件。

- [ ] **Step 4: 最终报告**

向用户说明：

```text
合并完成
唯一维护根：/Users/fanlw/Documents/考试网站维护/VisaLang
目标较新代码全部保留
4 份旧目录独有文档已迁移并通过 SHA-256 校验
完整测试与 launch-check 通过
旧目录原样保留为回滚备份
未提交
未推送
未部署
```

本任务不创建 Git commit，因为用户没有要求提交。
