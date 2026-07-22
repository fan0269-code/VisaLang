# VisaLang Germany A1/B1 备考支持页来源复核与路线去环 Codex 执行提示词

> 直接将本文件完整内容交给 Codex 执行。不要只复制其中某个章节。

## 一、角色与唯一目标

你是 VisaLang 内容站的执行 Agent。请在当前 Astro 项目中完成 **Germany A1 10 篇 pending 备考支持页和 Germany B1 5 篇 pending 备考支持页的来源复核、路线去环和正文清理**。

本轮不是扩页项目，不是法律结论项目，也不是部署项目。采用能完成目标的最小变更，不重构无关代码，不扩大国家/考试范围，不把历史审计、搜索摘要或考试方营销文案当成最终决定机关的证据。

## 二、唯一工作目录和时效门禁

唯一维护目录：

```text
/Users/fanlw/Documents/考试网站维护/VisaLang
```

开始前运行：

```bash
pwd -P
git rev-parse --show-toplevel
git status --short --branch
git status --porcelain=v1 --untracked-files=all
git rev-parse HEAD
git log --oneline -12
```

然后用只读脚本把基线写入会话临时目录；不要写入仓库：

```bash
BASELINE_DIR="$(mktemp -d /tmp/visalang-a1b1-support-baseline.XXXXXX)"
export BASELINE_DIR
python3 - <<'PY'
from hashlib import sha256
from pathlib import Path
import json
import os
import subprocess

root = Path(subprocess.check_output(['git', 'rev-parse', '--show-toplevel'], text=True).strip())
status = subprocess.check_output(['git', 'status', '--porcelain=v1', '--untracked-files=all'], text=True)
untracked_raw = subprocess.check_output(['git', 'ls-files', '--others', '--exclude-standard', '-z'])
untracked = [item.decode() for item in untracked_raw.split(b'\0') if item]
modified_raw = subprocess.check_output(['git', 'diff', '--name-only', '-z'])
staged_raw = subprocess.check_output(['git', 'diff', '--cached', '--name-only', '-z'])
protected_tracked = sorted({
    item.decode()
    for raw in (modified_raw, staged_raw)
    for item in raw.split(b'\0')
    if item
})

def digest_or_deleted(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest() if path.is_file() else '<deleted>'

snapshot = {
    'root': str(root),
    'status': status.splitlines(),
    'staged_diff_sha256': sha256(subprocess.check_output(['git', 'diff', '--cached', '--binary'])).hexdigest(),
    'protected_tracked_sha256': {name: digest_or_deleted(root / name) for name in protected_tracked},
    'untracked_sha256': {name: digest_or_deleted(root / name) for name in untracked},
}
Path(os.environ['BASELINE_DIR'], 'baseline.json').write_text(
    json.dumps(snapshot, ensure_ascii=False, indent=2),
    encoding='utf-8',
)
print(Path(os.environ['BASELINE_DIR'], 'baseline.json'))
PY
```

硬门禁：

- `pwd -P` 和 `git rev-parse --show-toplevel` 必须严格等于 `/Users/fanlw/Documents/考试网站维护/VisaLang`；否则报告 `BLOCKED` 并停止。
- 记录初始分支、HEAD、origin/main 和完整工作树清单。
- 若 A1/B1 备考支持页已被更晚的提交完成，先比较实际行为和本提示词目标；不得重复实现、回退或为制造 RED 破坏已有行为。
- 本提示词以 2026-07-21 的 `main` 基线编写。若当前 HEAD 已包含更晚的 A1/B1 备考支持页工作，必须先重新评估，不可盲目执行。

## 三、事实优先级

发生冲突时按以下顺序判断：

1. 当前维护目录、当前 HEAD、当前源码和测试；
2. 当前项目级 `CLAUDE.md`、`AGENTS.md`、`package.json`；
3. 最新日期的专项审查和 `docs/OPERATIONS_STATUS.md`；
4. `docs/TASK_LOG.md` 中对应提交/发布的记录；
5. 历史设计、计划、旧提示词和旧审计仅作历史证据。

必须知道的当前事实：

- Germany A1 主路线 7 篇核心指南和 8 篇中文 Germany A1 指南的来源复核已在 2026-07-19 完成并发布。不得重复处理。
- Germany B1 核心 8 篇的来源复核已在 2026-07-19 完成并发布。不得重复处理。
- P0 五国（UK、Canada、Italy、Portugal、Finland）10 篇已在 2026-07-21 完成来源复核并发布。不得重复处理。
- France、Netherlands、Spain 已在 2026-07-19 完成来源复核和发布。不得重复处理。
- 旧文件 `docs/prompts/2026-07-18-visalang-content-update-codex.md` 已过期，不是本轮执行依据。
- 本轮 A1 10 篇备考支持页全部 `sourceReviewStatus: pending`、`updatedDate: 2026-07-11` 或 `2026-07-18`，缺少官方来源复核和清晰路线。
- 本轮 B1 5 篇备考支持页全部 `sourceReviewStatus: pending`、`updatedDate: 2026-07-04`，缺少官方来源复核和清晰路线。
- 存在多处双向循环和死胡同。

## 四、必须先读

按顺序阅读：

- `CLAUDE.md`
- `AGENTS.md`
- `PROJECT_CONTEXT.md`
- `package.json`
- `src/content.config.ts`
- `src/data/source-review.ts`
- `src/pages/guides/[slug].astro`
- `src/layouts/GuideLayout.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/ArticleTOC.astro`
- `src/components/LastCheckedBadge.astro`
- `docs/CONTENT_MAP.md`
- `docs/OPERATIONS_STATUS.md`
- `docs/TASK_LOG.md`
- `tests/content-integrity.test.js`
- `tests/germany-a1-cluster.test.js`
- `tests/germany-b1-cluster.test.js`
- `tests/source-review-render.test.js`
- `tests/site.test.js`

然后阅读本轮 15 篇目标指南全文，确认边界和现有内链。

## 五、初始工作树保护

当前仓库可能已有未跟踪的合并报告、提示词、计划和规格文档。初始基线必须使用 `git status --porcelain=v1 --untracked-files=all` 展开到每个文件，并使用上一节生成的 `baseline.json` 保存：

- 初始 status；
- staged diff 的 SHA-256；
- 每个初始 modified/staged tracked 文件的 SHA-256；
- 每个未跟踪文件的 SHA-256。

如果任一 allowlist 目标文件在开始时已经有 tracked 或 untracked 修改，报告 `BLOCKED`，不要尝试在他人未完成修改上继续叠加。执行期间，所有初始未跟踪文件和 allowlist 外的已有 tracked 修改都必须保持字节级不变。

禁止：

```text
git clean
git reset --hard
git restore
git checkout -- <path>
git stash
git add -A
git add .
```

不得编辑、删除、移动、格式化、覆盖或提交初始工作树中与本轮无关的文件。完成后重新生成同结构快照，并逐项验证：

- 初始未跟踪文件仍存在且 SHA-256 不变；
- 初始 modified/staged tracked 文件仍存在且 SHA-256 不变；
- staged diff hash 与初始基线一致；
- 新增变化只来自本轮 allowlist；
- 临时基线目录位于 `/tmp`，不进入 Git。

最终必须满足：

```text
最终工作树变化
= 初始受保护变化
+ 本轮 allowlist 内、逐项说明的变化
```

## 六、本轮精确范围

### 6.1 IN SCOPE：Germany A1 10 篇备考支持页

1. `src/content/guides/goethe-a1-germany-family-reunion.md`
2. `src/content/guides/german-a1-family-reunion-faq.md`
3. `src/content/guides/goethe-a1-listening-practice.md`
4. `src/content/guides/goethe-a1-speaking-topics.md`
5. `src/content/guides/goethe-a1-writing-practice.md`
6. `src/content/guides/goethe-a1-study-plan-working-adults.md`
7. `src/content/guides/goethe-a1-official-links-practice-resources.md`
8. `src/content/guides/goethe-a1-30-day-study-plan.md`
9. `src/content/guides/goethe-a1-booking-mistakes.md`
10. `src/content/guides/goethe-a1-pre-booking-checklist.md`

### 6.2 IN SCOPE：Germany B1 5 篇备考支持页

11. `src/content/guides/goethe-b1-difficulty-analysis.md`
12. `src/content/guides/goethe-b1-listening-deep-dive.md`
13. `src/content/guides/goethe-b1-mock-exam-routine.md`
14. `src/content/guides/goethe-b1-speaking-topics.md`
15. `src/content/guides/goethe-b1-writing-assessment.md`

### 6.3 IN SCOPE：测试和记录

- `tests/germany-a1-cluster.test.js`
- `tests/germany-b1-cluster.test.js`
- `tests/content-integrity.test.js`
- `tests/source-review-render.test.js`
- `tests/site.test.js`，仅在测试入口确实需要时修改
- `docs/CONTENT_MAP.md`
- `docs/TASK_LOG.md`，仅在完成并验证后追加真实结果

### 6.4 OUT OF SCOPE

- Germany A1 已 reviewed 的 7 篇核心指南（主路线）；
- Germany B1 已 reviewed 的 8 篇核心指南；
- 中文 Germany A1 页面；
- UK、Canada、Italy、Portugal、Finland P0 五国；
- France、Netherlands、Spain；
- TestDaF、telc starter 集群；
- 新增任何公开页面或 Hub 页；
- 将任何页面提升为 `complete-route` 以外的更高成熟度；
- 全站视觉设计、CSS 重构、导航重构；
- Route Finder、Checklist、Timeline、Exam Comparison 工具业务；
- 广告、CMP、表单、邮件、支付、商业交付；
- 依赖、`package-lock.json`、Astro 配置；
- 部署、服务器、DNS、TLS、Nginx、第三方账户；
- commit、push、PR。

## 七、今天的内容目标

本轮应实现：

1. 为 15 篇备考支持页逐条建立并保存来源 claim matrix；
2. 实际打开当前第一方来源，逐页决定 `reviewed` 或继续 `pending`；
3. 保持"备考支持内容"和"签证/入籍/居留接受性"的边界——备考页不证明证书被主管机关接受；
4. 修复 A1 和 B1 各自的双向循环、stage 倒退和死胡同；
5. 让每篇备考页的 nextGuideSlug 服从同集群内的业务顺序；
6. 清理正文中的内部编辑语言、自链接和同质化模板 CTA；
7. 同步内容账本；
8. 通过聚焦测试、完整测试和 launch check。

## 八、推荐业务路线

### 8.1 Germany A1 备考支持页路线

A1 主路线（已 reviewed 的 7 篇）保持不变。备考支持页作为条件分支和补充内容，路由如下：

```
requirement 入口（主路线已 reviewed 页）
  ↓
local-execution 备考支持集群
  ├── goethe-a1-pre-booking-checklist → goethe-a1-exam-booking-timeline（→ german-a1-documents-checklist）
  ├── goethe-a1-booking-mistakes → german-a1-documents-checklist
  ├── goethe-a1-official-links-practice-resources → goethe-a1-30-day-study-plan
  ├── goethe-a1-listening-practice → goethe-a1-speaking-topics
  ├── goethe-a1-speaking-topics → goethe-a1-30-day-study-plan
  ├── goethe-a1-writing-practice → goethe-a1-30-day-study-plan
  ├── goethe-a1-study-plan-working-adults → goethe-a1-30-day-study-plan
  ├── goethe-a1-30-day-study-plan（终点，无 next）
  └── goethe-a1-retake-policy → goethe-a1-speaking-topics（条件分支）
```

FAQ 和 Goethe A1 family reunion 的处理：

- `german-a1-family-reunion-faq` 的 nextGuideSlug 改为 `goethe-a1-vs-telc-a1`（同 decisionStage 的下一步），不再回指 `german-family-reunion-language-requirement`。
- `goethe-a1-germany-family-reunion` 的 nextGuideSlug 保持 `goethe-a1-vs-telc-a1`，supportingGuideSlugs 收窄到 A1 集群内。

### 8.2 Germany B1 备考支持页路线

B1 核心 8 篇保持不变。备考支持页作为条件分支和补充内容，路由如下：

```
choice → goethe-b1-vs-telc-b1 → local-execution 核心页
  ↓
local-execution 备考支持集群（从 study-plan 或 fees-and-booking 可进入）
  ├── goethe-b1-difficulty-analysis → goethe-b1-study-plan
  ├── goethe-b1-listening-deep-dive → goethe-b1-mock-exam-routine
  ├── goethe-b1-mock-exam-routine → goethe-b1-study-plan
  ├── goethe-b1-speaking-topics → goethe-b1-mock-exam-routine
  └── goethe-b1-writing-assessment → goethe-b1-mock-exam-routine
```

规则：

- `nextGuideSlug` 是唯一主下一步；终点页省略该字段。
- `supportingGuideSlugs` 指向同集群内的补充或条件性页面，不与 next 重复。
- 备考支持页的 next 不得指向 B1 核心 requirement/choice 页，避免 stage 倒退。
- 备考支持页之间不得形成双向循环。
- 若当前源码职责与表格存在不可调和冲突，报告 `BLOCKED`，不要扩大设计范围。

## 九、官方来源五层门禁

### 9.1 权威顺序

1. 当前德文法条或德国政府官方说明；
2. BAMF 官方说明；
3. Goethe-Institut 官方产品页、考点目录、报名门户；
4. telc 官方产品页和考点目录；
5. 具体官方或授权考点的当前页面。

搜索引擎摘要、AI 回答、历史审计、论坛和其他申请人经验只可用于发现入口，不能作为证据。

### 9.2 Goethe A1/B1 候选官方入口

这些 URL 是候选入口，不是预先批准的来源。你必须实际打开、记录最终 URL、页面标题、访问结果和定位段落：

#### Goethe A1

- `https://www.goethe.de/en/spr/prf.html`
- `https://www.goethe.de/ins/de/en/prf/prf/gza1.html`
- `https://www.goethe.de/ins/de/en/prf/ort.html`
- `https://www.goethe.de/ins/de/en/prf/pre.html`
- `https://www.goethe.de/ins/de/en/prf/prf/gza1/inf.html`
- `https://www.goethe.de/ins/de/en/prf/prf/gza1/ue.html`

#### Goethe B1

- `https://www.goethe.de/en/spr/prf.html`
- `https://www.goethe.de/ins/de/en/prf/prf/gzb1.html`
- `https://www.goethe.de/ins/de/en/prf/ort.html`
- `https://www.goethe.de/ins/de/en/prf/pre.html`
- `https://www.goethe.de/ins/de/en/prf/prf/gzb1/inf.html`
- `https://www.goethe.de/ins/de/en/prf/prf/gzb1/ue.html`

#### telc B1

- `https://www.telc.net/en/language-examinations/certificate-exams/german/certificate-german-telc-german-b1/`
- `https://www.telc.net/en/language-examinations/find-a-telc-examination-centre/`

#### BAMF / 政府

- `https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Migrathek/Niederlassen/niederlassen-node.html`
- `https://www.bamf.de/EN/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/Abschlusspruefung/abschlusspruefung-node.html`

### 9.3 每个高风险主张的 claim matrix

每条主张单独记录，至少包含：

```text
page_slug
claim_id
section_heading
claim_text
claim_category
route_name
jurisdiction
target_authority
decision_owner
source_owner
source_title
source_url（最终 URL）
source_type
source_language
accessed_at（实际日期）
access_result
exact_quote
quote_translation
locator
support_level（direct / partial / contextual / unsupported）
source_scope
claim_scope
scope_match
qualifiers
exceptions_present
cross_references
cross_references_checked
time_sensitive
prohibited_inference
permitted_wording
reader_verification_action
manual_verification_required
stop_reason
final disposition（保留 / 限定 / 删除 / 改为核验动作）
```

对考试/考点主张还要记录：

```text
exact_exam_product
cefr_level
candidate_group
full_exam_or_module
result_document
authority_acceptance_source
centre_name
centre_authorisation_source
exam_location
exam_date
fee / currency / fee_scope
registration_deadline
id_rule
cancellation_rule
result_process
```

## 十、不得推出的结论

严禁从考试方或中央页面推出：

- 备考页证明证书被定居/入籍/签证主管机关接受；
- 考试主办方能决定签证或入籍结果；
- 中央产品页能证明地方费用、日期、名额、出分、退款；
- 某人符合豁免；
- 搜索摘要或历史页面仍是当前有效规则；
- 考试方声称 recognized / widely accepted 等同于主管机关接受。

## 十一、来源停止条件

出现以下任一情况，**受影响的原始主张**必须标记为 `manual verification required`，不得靠猜测保留。但页面的最终状态以**修改后的最终公开内容**为判定对象：

- 若无法支持的主张已经从最终公开内容中完整删除，且删除记录、原主张、停止原因和处置都写入 claim matrix，该已删除主张不再单独阻止页面成为 `reviewed`。
- 若最终公开内容仍直接或间接依赖该主张，或无法确认删除后没有残留同义结论，则页面必须保持 `pending`。
- 页面只有在最终公开版本的所有高风险主张都达到 `direct` 或与限定措辞匹配的 `partial` 支持、且每个边界和读者核验动作已记录时，才可标记 `reviewed`。

来源/主张停止情形包括：

- 页面 403、404、500、空白、验证码或重定向到通用首页；
- 关键正文只能通过未成功加载的 JavaScript 查看；
- PDF 无法打开、下载或定位页码；
- 只能拿到搜索摘要；
- 页面没有明确发布机构；
- 英文与德文版本不一致或英文可能滞后；
- 无法定位原主张、限定词、例外或交叉引用；
- 来源只支持考试产品本身，不支持签证/入籍/居留接受性；
- 只有考试方声称 recognized / widely accepted；
- 考点不在主办方官方目录、产品/地点/日期/币种不明确；
- 中央页面与地方考点页面冲突。

对仍留在最终公开内容中的受影响主张，必须：

1. 让对应页面保持 `sourceReviewStatus: pending`；
2. 不写 `sourceReviewedAt`；
3. 不写 `reviewedByRole`；
4. 删除、限定或改为明确的主管机关/考点核验动作；
5. 在 claim matrix 中记录停止原因和最终处置；
6. 按第十九节的判定规则决定本轮为 `PARTIAL` 或 `BLOCKED`。

## 十二、frontmatter 与状态规则

仅在该页面最终公开版本的所有高风险主张都按实际范围完成复核时，才设置来源状态字段。每个值必须直接来自该页面已完成的 claim matrix；不得复制下面的说明文字到 frontmatter：

- `sourceReviewStatus`：固定为 `reviewed`；否则保留或显式设置 `pending`。
- `sourceReviewedAt`：使用实际完成该页面复核的日期，严格为 `YYYY-MM-DD`。
- `reviewedByRole`：固定为 `source-review`。
- `audienceScope`：用一句具体文本写出已验证的路线、人群和地域范围。
- `finalDecisionAuthorityType`：写出实际最终决定机关类型。
- `primaryOfficialAuthorityUrl`：填入 claim matrix 中实际打开并支持页面主要主管机关边界的最终 HTTPS URL。
- `examOwnerUrl`：页面涉及考试产品时，填入实际打开的考试主办方最终 HTTPS URL；不涉及时不要为了凑字段虚构。
- `localExecutionPrompt`：写出读者需要向具体地方主管机关或官方/授权考点核验的具体动作。

写入后必须通过当前 schema；不得使用示例、说明文字或无效 URL 作为字段值。

规则：

- 15 篇页面可以分别为 reviewed 或 pending；不要预设全部通过。
- A1 备考支持页保持 `complete-route`；B1 备考支持页保持 `core-route`。
- `publishedDate` 保持首次发布日期。
- `updatedDate` 只在有实质用户可见内容变化时更新。
- `sourceReviewedAt` 只代表实际来源复核日期，不能复制 `updatedDate` 或历史审计日期。
- 备考支持页已 reviewed 但读者仍需核验当地动态事实是允许的；不得因动态事实存在而错误回退页面事实复核，也不得把页面 reviewed 写成读者个案已确认。

## 十三、公开内容清理规则

### 13.1 A1 FAQ 和 Goethe A1 family reunion

从 `german-a1-family-reunion-faq.md` 删除或改写：

- 面向编辑者的 `A1 route FAQ` 和 `A1 decision tools and next steps` 模板区块（如仍为用户可见）；
- 每页完全相同的六链接"Continue your B1 decision route"模板（改为 A1 适配版本）。

从 `goethe-a1-germany-family-reunion.md` 删除或改写：

- 面向编辑者的 `Revision history` 区块（如仍为用户可见）；
- 页面自链接。

### 13.2 A1 备考支持页正文

清理或改写：

- 已 reviewed 页面手写的 `Official verification pending`；
- `Reader decision and search intent`；
- `Manual checks still needed`；
- 面向编辑者的 `Before you rely on this page` 清单；
- 页面自链接；
- 每页完全相同的六链接"A1 route FAQ"和"A1 decision tools and next steps"模板。

每页保留：

- 一个明确读者问题；
- 一个限定性的主下一步；
- 最多两个条件性辅助链接；
- 谁最终决定；
- 读者需保存的来源/日期/书面回复；
- VisaLang 不决定资格、豁免、接受或结果的边界。

### 13.3 B1 备考支持页正文

清理或改写：

- `TL;DR verdict` 区块中的内部编辑术语；
- `Continue your B1 decision route` 模板（改为同集群内真实补充页）；
- `Revision history` 区块（如仍为用户可见）；
- 页面自链接。

每页保留：

- 一个明确读者问题；
- 一个限定性的主下一步；
- 最多两个条件性辅助链接；
- 谁最终决定；
- VisaLang 不决定资格、豁免、接受或结果的边界。

品牌方向：

- 前瞻：提前指出下一决策、来源变化和时间风险；
- 锐度：明确谁决定什么，删掉内部术语和模糊结论；
- 温度：承认材料、考试、费用和等待压力，但不承诺结果。

避免 `comprehensive guide`、`ultimate guide`、`one-stop solution`、`navigate the complex world of`、`decision support`、`safe answer`、`最稳`、`一定接受`、`保证通过` 等表达。

## 十四、SEO 与信息架构

- 每页 self-canonical：使用当前绝对 HTTPS trailing-slash URL；
- 所有内部链接使用 trailing slash；
- 不创建 hreflang，因为本轮无中文新增；
- sitemap 保持 54 篇英文 guide canonical + 8 篇中文 Germany A1 canonical，无重复、无 legacy `.html`、无测试 fixture；
- 不添加不可见 FAQPage 或 HowTo schema；
- 不创建薄 FAQ、费用库、考位库或未有官方来源支撑的关键词页。

## 十五、TDD 执行顺序

只为真实缺口写 RED。若预检发现行为已完成，禁止删除正确行为或写故意错误断言来制造失败。

### Slice A：A1 来源状态

在 `tests/germany-a1-cluster.test.js` 增加 A1 备考支持页断言：

- 10 篇保持 `complete-route`；
- 按真实复核结果 reviewed/pending；
- reviewed 必须有真实日期和 source-review role；
- pending 不得有复核日期；
- 已 reviewed 页不保留冲突的手写 pending。

运行：

```bash
node tests/germany-a1-cluster.test.js
```

### Slice B：B1 来源状态

在 `tests/germany-b1-cluster.test.js` 增加 B1 备考支持页断言：

- 5 篇保持 `core-route`；
- 按真实复核结果 reviewed/pending；
- reviewed 必须有真实日期和 source-review role；
- pending 不得有复核日期。

运行：

```bash
node tests/germany-b1-cluster.test.js
```

### Slice C：路线无环

在 `tests/content-integrity.test.js` 增加 A1 和 B1 备考支持页断言：

- target 存在、同 route；
- 无 self-link；
- 无直接双向循环；
- next 与 supporting 不重复；
- terminal 无 next；
- 备考支持页 next 不得指向 requirement/choice 核心页造成 stage 倒退；
- supportingGuideSlugs 不跨集群混用。

运行：

```bash
node tests/content-integrity.test.js
```

### Slice D：构建后的来源状态和 Next guide

在 `tests/source-review-render.test.js` 增加 A1/B1 备考支持页断言：

- reviewed 页面显示 `Official sources last checked` 和 reviewer role；
- pending 页面只显示 pending，不显示虚构日期；
- `dateModified` 仍来自 `updatedDate`，不是 `sourceReviewedAt`；
- A1/B1 备考支持页一个 H1、disclaimer；
- A1/B1 备考支持页的可见 Next guide 等于显式业务 next，而非字母序；
- sitemap 包含 54 篇英文 + 8 篇中文 guide canonical，各一次；
- sitemap 不含 fixture 或 legacy `.html`。

运行：

```bash
node tests/source-review-render.test.js
```

## 十六、允许修改的文件

默认 allowlist：

```text
15 篇备考支持页 Markdown
tests/germany-a1-cluster.test.js
tests/germany-b1-cluster.test.js
tests/content-integrity.test.js
tests/source-review-render.test.js
tests/site.test.js，仅在测试入口确实需要时修改
docs/CONTENT_MAP.md
docs/TASK_LOG.md
```

条件 allowlist：

```text
src/pages/guides/[slug].astro：仅当 A1/B1 备考支持页 Next guide 构建渲染需要最小调整
scripts/launch-check.js：只有失败测试证明现有检查真实有缺陷时
```

默认 denylist：

```text
src/content.config.ts
src/data/source-review.ts
src/data/zh-germany-a1.ts
src/data/site.ts
src/layouts/BaseLayout.astro
src/layouts/GuideLayout.astro
src/layouts/ZhGuideLayout.astro
src/components/ArticleTOC.astro
src/components/LastCheckedBadge.astro
src/styles/global.css
astro.config.mjs
scripts/enrich-sitemap-lastmod.js
package.json
package-lock.json
public/
deploy/
src/pages/germany-b1-settlement-citizenship.astro
src/pages/germany-family-reunion-a1.astro
src/pages/zh/（任何文件）
Germany A1 已 reviewed 的 7 篇核心指南
Germany B1 已 reviewed 的 8 篇核心指南
P0 五国、France、Netherlands、Spain 页面
TestDaF、telc starter 页面
```

若必须修改 denylist 文件才能通过真实失败测试，先停止并在报告中说明；不要擅自扩大范围。

## 十七、绝对禁止项

不得：

- 新增、删除或重命名任何公开页面；
- 修改 Germany A1/B1 已 reviewed 核心指南的正文；
- 修改 P0 五国、France、Netherlands、Spain 内容；
- 将任何页面提升为 `complete-route` 以外的更高成熟度；
- 用 2026-07-14 历史审计直接赋值 reviewed；
- 批量把 `sourceReviewedAt` 改成今天而不实际打开来源；
- 批量刷新 `updatedDate`；
- 复制搜索摘要、AI 回答或旧审计结论到正文；
- 用考试方产品页证明签证/入籍/居留接受性；
- 用中央页面证明地方价格、日期、考位、出分、退款；
- 修改 schema 来绕过内容问题；
- 删除或放宽现有断言；
- 重写 sitemap 架构；
- 添加依赖；
- 编辑 `dist/`、`.astro/`、`node_modules/`；
- 编辑 legacy 根目录 HTML/CSS/JS；
- 运行不存在的 `npm run lint`、`npm run typecheck`、`npm run check`；
- commit、push、PR；
- SSH、scp、rsync、部署、Nginx 或第三方账户操作。

## 十八、验证命令

开始前：

```bash
git status --short --branch
git diff --check
```

聚焦验证：

```bash
node tests/germany-a1-cluster.test.js
node tests/germany-b1-cluster.test.js
node tests/content-integrity.test.js
node tests/source-review-render.test.js
node tests/site.test.js
```

完整门禁：

```bash
npm test
git diff --check
npm run launch-check
git status --short
```

只有以下全部成立才能报告 `PASS`：

- 聚焦测试 exit 0；
- `npm test` exit 0；
- `git diff --check` 无输出；
- `npm run launch-check` exit 0，并以 `READY.` 结束；
- A1 备考支持页保持 `complete-route`，B1 备考支持页保持 `core-route`；
- 15 篇页面无直接双向循环，无 stage 倒退；
- 来源状态与实际核验一致；
- sitemap 含 54 篇英文 + 8 篇中文 guide canonical，各一次；
- 无 `__source-review-*` fixture；
- 初始受保护文件未被修改或删除；
- 没有超出 allowlist 的未说明变更。

若失败：

1. 停止完成声明；
2. 报告命令、退出码和首个可操作错误；
3. 只修本轮直接引入的问题；
4. 不删断言、不放宽来源门禁；
5. 无法在范围内安全修复时报告 `PARTIAL` 或 `BLOCKED`。

## 十九、最终汇报格式

### 结论

只能使用：

- `PASS`：15 篇备考支持页都已完成安全处置；最终公开高风险主张均有足够来源支持；所有页面状态与证据一致；完整验证通过。
- `PARTIAL`：至少一篇备考支持页安全完成并通过验证，但另有页面因**页面级、彼此独立的来源缺口**保持 pending；这些缺口不阻止路线去环、正文清理和已完成页面通过测试。所有已修改内容必须安全、验证通过，且没有工作树冲突或越界修改。
- `BLOCKED`：唯一目录/HEAD/工作树基线不兼容；任一目标文件已有无法安全合并的修改；来源冲突会影响跨页共享结论或主路线设计；无法识别考试方或主管机关导致核心页不能安全处置；必需测试/launch check 失败且无法在 allowlist 内修复；或完成任务需要 denylist、提交、部署、服务器或用户专属输入。

单个页面来源不可访问并不自动使整个任务 `BLOCKED`：若该页面可保持 pending、移除无支持结论，且其他页面与路线工作仍能安全完成，则整体为 `PARTIAL`。只有当来源问题阻断跨页核心结论、路线结构或无法形成安全公开内容时，整体才为 `BLOCKED`。

### 基线

- 唯一根目录；
- 分支；
- 初始 HEAD；
- origin/main；
- 初始工作树；
- 提示词基线是否有效。

### 实际范围

- 计划处理的 15 个 slug；
- 实际处理；
- 保持 pending；
- 明确未处理；
- 新增公开路由：必须为否。

### 工作树保护

- 初始 `--untracked-files=all` 工作树；
- 初始未跟踪文件 SHA-256 清单；
- allowlist 外 tracked/staged 基线 hash；
- 最终逐项对比结果；
- 是否执行 clean/reset/restore/stash：必须为否；
- 是否存在未说明变化。

### 修改文件

| 文件 | 修改目的 | 是否属于 allowlist | 用户可见变化 |
|---|---|---|---|

### 来源与事实

| 页面/claim | 最终权威 | 实际打开 URL | 检查日期 | 定位 | 支持范围 | 不支持边界 | 处置 |
|---|---|---|---|---|---|---|---|

### 状态字段

| 页面 | contentStatus | sourceReviewStatus | sourceReviewedAt | reviewedByRole | updatedDate 依据 |
|---|---|---|---|---|---|

### 路线与 SEO

- A1 备考支持页主路线；
- B1 备考支持页主路线；
- 修复的循环；
- next/supporting；
- canonical；
- sitemap。

### 验证

| 命令 | 退出码 | 关键输出 | 结果 |
|---|---:|---|---|

### 未完成与阻塞

- 无法访问或不能支持主张的来源；
- 需要具体主管机关/考点确认的事实；
- 保持 pending 的页面；
- 未处理的相邻观察。

### 交付边界

明确写出：

- 未提交；
- 未推送；
- 未部署；
- 未访问服务器；
- 未修改第三方账户。
