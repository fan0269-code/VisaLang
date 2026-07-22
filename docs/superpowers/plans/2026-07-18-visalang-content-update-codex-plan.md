# VisaLang Codex 内容更新提示词 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 根据已批准设计生成一份可直接交给 Codex 的单一 Markdown 主提示词，不执行网站内容更新。

**Architecture:** 以设计规格为唯一范围基线，将五个 Agent 的共同结论整理为“项目事实 → 来源门禁 → P0/P1 工作包 → 编辑与 SEO 规则 → TDD 执行 → 验证与汇报”的执行合同。最终只创建一个提示词文件，并通过静态检查确认没有占位符、范围漂移或不可执行命令。

**Tech Stack:** Markdown、Astro 项目约束、Node assert 测试命令（仅写入提示词，不在本任务执行网站测试）

---

## 文件结构

- 读取：`docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md` — 已批准范围与验收标准。
- 创建：`docs/prompts/2026-07-18-visalang-content-update-codex.md` — 最终交给 Codex 的主提示词。
- 创建：`docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md` — 本执行计划。

### Task 1: 生成最终 Codex 主提示词

**Files:**
- Read: `docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md`
- Create: `docs/prompts/2026-07-18-visalang-content-update-codex.md`

- [ ] **Step 1: 将批准范围转换为执行合同**

提示词必须依次写明：

```text
角色与目标
项目根目录和事实优先级
开始前检查
来源核验停止条件
P0 英文 Germany A1 工作包
P1 中文 Germany A1 工作包
品牌与编辑规则
SEO、双语、frontmatter 和内链规则
禁止项
测试先行执行顺序
验证命令
PASS/PARTIAL/BLOCKED 汇报模板
```

- [ ] **Step 2: 写入精确文件范围**

明确列出 7 篇英文指南、3 个新增中文页面，以及允许同步修改的受控数据、Hub、最小布局/组件和测试。明确排除其他国家、B1/TestDaF 状态提升、视觉重构、商业流程、部署和 legacy 文件。

- [ ] **Step 3: 写入来源门禁**

要求 Codex 对每个高风险主张记录：

```text
主张
最终决定机关
官方来源 URL
实际核验日期 YYYY-MM-DD
来源支持范围
来源不能支持的边界
保留、限定、删除或改为核验步骤
```

来源无法支持时必须保持 `pending`，不得创建占位公开页面，不得自行把 `updatedDate` 当作 `sourceReviewedAt`。

- [ ] **Step 4: 写入执行与验证规则**

提示词应要求 Codex 先写最小失败测试，再实施最小变更，并最终运行：

```bash
node tests/content-integrity.test.js
node tests/germany-a1-cluster.test.js
node tests/source-review-render.test.js
npm test
git diff --check
npm run launch-check
```

明确项目不存在 `npm run lint` 和 `npm run typecheck`。

### Task 2: 静态验证提示词文件

**Files:**
- Test: `docs/prompts/2026-07-18-visalang-content-update-codex.md`

- [ ] **Step 1: 检查文件存在且非空**

Run:

```bash
test -s docs/prompts/2026-07-18-visalang-content-update-codex.md
```

Expected: 退出码 0，无输出。

- [ ] **Step 2: 检查无占位符**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
path = Path('docs/prompts/2026-07-18-visalang-content-update-codex.md')
text = path.read_text(encoding='utf-8')
for marker in ('TBD', 'TODO', '<必须填写>', '<URL>', '<slug>'):
    assert marker not in text, f'发现占位符: {marker}'
print('placeholder-check: PASS')
PY
```

Expected: `placeholder-check: PASS`。

- [ ] **Step 3: 检查关键章节和命令完整**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
text = Path('docs/prompts/2026-07-18-visalang-content-update-codex.md').read_text(encoding='utf-8')
required = [
    'P0：Germany A1 英文内容可信度与路线修复',
    'P1：中文 Germany A1 内容闭环',
    '官方来源与事实门禁',
    'npm test',
    'git diff --check',
    'npm run launch-check',
    'PASS',
    'PARTIAL',
    'BLOCKED',
    '未提交',
    '未推送',
    '未部署',
]
missing = [item for item in required if item not in text]
assert not missing, f'缺少关键内容: {missing}'
print('structure-check: PASS')
PY
```

Expected: `structure-check: PASS`。

- [ ] **Step 4: 检查 Markdown diff**

Run:

```bash
git diff --check -- docs/prompts/2026-07-18-visalang-content-update-codex.md docs/superpowers/specs/2026-07-18-visalang-content-update-codex-design.md docs/superpowers/plans/2026-07-18-visalang-content-update-codex-plan.md
```

Expected: 退出码 0，无输出。

### Task 3: 最终交付核对

**Files:**
- Verify: `docs/prompts/2026-07-18-visalang-content-update-codex.md`

- [ ] **Step 1: 对照规格检查覆盖率**

逐项确认最终提示词覆盖：7 篇英文目标、3 个中文新增页、来源状态、路线顺序、文章特定 CTA、品牌规则、SEO、双语、sitemap、禁止项、TDD、验证命令和最终报告格式。

- [ ] **Step 2: 报告交付边界**

最终向用户说明：

```text
已生成最终 Codex 提示词文件
已完成静态验证
未执行网站内容更新
未提交
未推送
未部署
```

本任务不创建 Git commit，因为用户没有要求提交。
