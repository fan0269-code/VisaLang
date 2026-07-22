# VisaLang P0 五国官方来源复核与路线去环 Codex 执行提示词

> 直接将本文件完整内容交给 Codex 执行。不要只复制其中某个章节。

## 一、角色与唯一目标

你是 VisaLang 内容站的执行 Agent。请在当前 Astro 项目中完成 **UK、Canada、Italy、Portugal、Finland 五个国家共 10 篇指南的官方来源重新核验、双向 next-guide 循环修复、正文清理和 frontmatter 状态收敛**。

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
BASELINE_DIR="$(mktemp -d /tmp/visalang-p0-baseline.XXXXXX)"
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
- 若这 10 篇已被更晚的提交完成，先比较实际行为和本提示词目标；不得重复实现、回退或为制造 RED 破坏已有行为。
- 本提示词以 2026-07-21 的 `main` 基线编写。若当前 HEAD 已包含更晚的五国内容工作，必须先重新评估，不可盲目执行。

## 三、事实优先级

发生冲突时按以下顺序判断：

1. 当前维护目录、当前 HEAD、当前源码和测试；
2. 当前项目级 `CLAUDE.md`、`AGENTS.md`、`package.json`；
3. 最新日期的专项审查和 `docs/OPERATIONS_STATUS.md`；
4. `docs/TASK_LOG.md` 中对应提交/发布的记录；
5. 历史设计、计划、旧提示词和旧审计仅作历史证据。

必须知道的当前事实：

- Germany A1 路线、8 篇中文 Germany A1 指南的来源与最终中文措辞复核已经在 2026-07-19 完成并发布；德国 B1 核心 8 篇也已复核并发布。不得重复处理。
- France（2 篇）、Netherlands NT2（1 篇）、Spain（2 篇）在 2026-07-19 完成了来源复核和发布，Spain 命名人工验收门禁仍独立开放。不得重复处理。
- 旧文件 `docs/prompts/2026-07-18-visalang-content-update-codex.md` 已过期，不是本轮执行依据。
- 本轮 10 篇五国指南当前全部 `sourceReviewStatus: reviewed`、`sourceReviewedAt: 2026-07-14`、`contentStatus: verification-pending`。这个 `reviewed` 基于 2026-07-14 的历史审计基线，不是当前逐页打开官方来源的核验。本轮必须重新核验或安全保持 pending。
- 10 篇两两之间全部存在直接双向 `nextGuideSlug` 循环。
- Finland 两篇的 `supportingGuideSlugs` 错误包含了 Italy、Spain、Netherlands 页面，必须收窄到本国。

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
- `docs/HIGH_RISK_ROUTE_SOURCE_AUDIT.md`
- `docs/CONTENT_MAP.md`
- `docs/OPERATIONS_STATUS.md`
- `docs/TASK_LOG.md`
- `tests/content-integrity.test.js`
- `tests/germany-a1-cluster.test.js` 或 `tests/p0-five-countries.test.js`（如已存在）
- `tests/source-review-render.test.js`
- `tests/site.test.js`

然后阅读本轮 10 篇目标指南全文，确认边界和现有内链。

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

### 6.1 IN SCOPE：10 篇指南

**UK（2 篇）：**

1. `src/content/guides/ielts-ukvi-uk-visa.md`
2. `src/content/guides/languagecert-selt-uk-visa.md`

**Canada（2 篇）：**

3. `src/content/guides/tef-canada-immigration.md`
4. `src/content/guides/tcf-canada-vs-tef.md`

**Italy（2 篇）：**

5. `src/content/guides/cils-b1-cittadinanza-for-italian-citizenship.md`
6. `src/content/guides/cils-vs-celi-vs-plida-for-italian-citizenship.md`

**Portugal（2 篇）：**

7. `src/content/guides/portuguese-language-for-golden-visa-and-citizenship.md`
8. `src/content/guides/portuguese-ciple-a2-for-citizenship-and-residence.md`

**Finland（2 篇）：**

9. `src/content/guides/yki-finnish-citizenship.md`
10. `src/content/guides/yki-vs-other-finland-options.md`

### 6.2 IN SCOPE：页面、测试和记录

- `tests/content-integrity.test.js`
- `tests/germany-a1-cluster.test.js` 或新建 `tests/p0-five-countries.test.js`
- `tests/source-review-render.test.js`
- `tests/site.test.js`，仅在测试入口确实需要时修改
- `docs/CONTENT_MAP.md`
- `docs/TASK_LOG.md`，仅在完成并验证后追加真实结果

### 6.3 OUT OF SCOPE

- Germany A1、Germany B1、TestDaF、telc starter 集群；
- France（2 篇）、Netherlands Inburgering（1 篇）、Spain（2 篇）；
- 新增任何公开页面或 Hub 页；
- 将任何页面提升为 `complete-route` 或 `core-route`；
- 全站视觉设计、CSS 重构、导航重构；
- Route Finder、Checklist、Timeline、Exam Comparison 工具业务；
- 分析、广告、CMP、表单、邮件、支付、商业交付；
- 依赖、`package-lock.json`、Astro 配置；
- 部署、服务器、DNS、TLS、Nginx、第三方账户；
- commit、push、PR。

## 七、今天的内容目标

本轮应实现：

1. 为 10 篇指南逐条建立并保存来源 claim matrix；
2. 实际打开当前第一方来源，逐页决定 `reviewed` 或继续 `pending`；
3. 保持"页面事实与核验流程已复核"和"读者个案仍需实时核验"的区别；
4. 删除五国各自的双向 next-guide 循环，建立 requirement → choice 单向链；
5. 收窄 Finland supportingGuideSlugs 到本国，删除跨国家的错误引用；
6. 清理正文中的通用模板语言、自链接和同质化 CTA；
7. 同步内容账本和任务日志；
8. 通过聚焦测试、完整测试和 launch check。

## 八、推荐业务路线

每个国家 2 篇形成 requirement → choice 单向链，choice 为终点：

| 国家 | requirement slug | `decisionStage` | choice slug | `decisionStage` | choice `nextGuideSlug` |
|---|---|---|---|---|---|
| UK | `ielts-ukvi-uk-visa` | `requirement` | `languagecert-selt-uk-visa` | `choice` | 省略 |
| Canada | `tef-canada-immigration` | `requirement` | `tcf-canada-vs-tef` | `choice` | 省略 |
| Italy | `cils-b1-cittadinanza-for-italian-citizenship` | `requirement` | `cils-vs-celi-vs-plida-for-italian-citizenship` | `choice` | 省略 |
| Portugal | `portuguese-language-for-golden-visa-and-citizenship` | `requirement` | `portuguese-ciple-a2-for-citizenship-and-residence` | `choice` | 省略 |
| Finland | `yki-finnish-citizenship` | `requirement` | `yki-vs-other-finland-options` | `choice` | 省略 |

每对 requirement → choice 的 `supportingGuideSlugs` 指向对方即可，不与 next 重复。

规则：

- `nextGuideSlug` 是唯一主下一步；choice 页没有真实下一步时省略该字段。
- `supportingGuideSlugs` 是补充或条件性页面，不与 next 重复。
- 不得跨国家混用 supporting guide。
- requirement 不得回指 choice，choice 不得回指 requirement。
- 若当前源码职责与表格存在不可调和冲突，报告 `BLOCKED`，不要扩大设计范围。

## 九、官方来源五层门禁

### 9.1 权威顺序

1. 当前该国移民/国籍/签证主管机关官方页面或法条；
2. 具体使领馆、地方当局或申请门户的当前说明；
3. 国家政府官方概览；
4. 官方考试主办方产品页；
5. 具体官方或授权考点的当前页面、报名门户、PDF 或书面回复。

搜索引擎摘要、AI 回答、历史审计、论坛和其他申请人经验只可用于发现入口，不能作为证据。

### 9.2 候选官方入口

这些 URL 是候选入口，不是预先批准的来源。你必须实际打开、记录最终 URL、页面标题、访问结果和定位段落。

#### UK

- `https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt`
- `https://www.gov.uk/check-english-language`
- `https://ielts.org/take-a-test/test-types/ielts-tests-for-uk-visas-and-immigration`
- `https://www.languagecert.org/en/language-exams/english/languagecert-esol-selt`

#### Canada

- `https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html`
- `https://www.canada.ca/en/immigration-refugees-citizenship/services/application/express-entry/eligibility.html`
- `https://www.lefrancaisdesaffaires.fr/en/`
- `https://www.france-education-international.fr/en/test/tcf-canada`

#### Italy

- `https://libertaciviliimmigrazione.dlci.interno.gov.it/temi/temi/cittadinanza`
- `https://www.esteri.it/it/servizi-opportunita/italiani-all-estero/cittadinanza/`
- `https://cils.unistrasi.it/`
- `https://www.cvcl.it/`
- `https://plida.dante.global/`

#### Portugal

- `https://justica.gov.pt/Registos/Nacionalidade/Nacionalidade-portuguesa`
- `https://caple.letras.ulisboa.pt/exame/2/ciple`
- `https://www.imi.gov.pt/`

#### Finland

- `https://migri.fi/en/language-skills`
- `https://migri.fi/en/application_for_finnish_citizenship`
- `https://www.oph.fi/en/national-certificates-language-proficiency-yki`

### 9.3 每个高风险主张的 claim matrix

每条主张单独记录，至少包含：

```text
page_slug（实际 slug 值）
claim_id
section_heading
claim_text
claim_category
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

严禁从通用政府概览、考试方或中央页面推出：

- 申请人已经符合资格；
- 所有签证/入籍/居留路线都要求同一考试或同一等级；
- Goethe、IELTS、TEF、CILS、CAPLE、YKI 等考试被普遍接受；
- 模块成绩、完整证书和不同考试产品法律效果相同；
- 某人符合疾病、残障、年龄、困难或其他豁免；
- 考试主办方能决定签证或入籍结果；
- 中央页面能证明地方费用、日期、名额、出分、退款或改期；
- 英文法条翻译必然与原文同步；
- 搜索摘要或历史页面仍是当前有效规则。

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
- 英文与原文版本不一致或英文可能滞后；
- 无法定位原主张、限定词、例外或交叉引用；
- 来源只支持考试产品本身，不支持签证/入籍/居留接受性；
- 地方主管机关未命名或只写考试名称、不写接受文件；
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

- 10 篇页面可以分别为 reviewed 或 pending；不要预设全部通过。
- `contentStatus` 全部保持 `verification-pending`。
- `publishedDate` 保持首次发布日期。
- `updatedDate` 只在有实质用户可见内容变化时更新。
- `sourceReviewedAt` 只代表实际来源复核日期，不能复制 `updatedDate` 或 2026-07-14 历史审计日期。
- 页面已 reviewed 但读者仍需核验当地动态事实是允许的；不得因动态事实存在而错误回退页面事实复核，也不得把页面 reviewed 写成读者个案已确认。

## 十三、公开内容清理规则

### 13.1 正文清理

从 10 篇指南中删除或改写面向编辑者的内部实施语言：

- `This review did not establish...`（如正文中保留但来源已复核，应改写为读者导向表述）
- `This page helps you prepare the questions and official sources to use.`（可保留但需自然化，不要每页一字不差地复制）
- 每页完全相同的 localExecutionPrompt 变体应改写为针对该国/该考试的独特核验动作。
- 页面自链接。
- 同质化的"Continue your decision route"模板。

每页保留：

- 一个明确读者问题；
- 一个限定性的主下一步（服从显式业务路线）；
- 谁最终决定；
- 读者需保存的来源/日期/书面回复；
- VisaLang 不决定资格、豁免、接受或结果的边界。

品牌方向：

- 前瞻：提前指出下一决策、来源变化和时间风险；
- 锐度：明确谁决定什么，删掉内部术语和模糊结论；
- 温度：承认材料、考试、费用和等待压力，但不承诺结果。

避免 `comprehensive guide`、`ultimate guide`、`one-stop solution`、`navigate the complex world of`、`decision support`、`safe answer`、`最稳`、`一定接受`、`保证通过` 等表达。

### 13.2 文章特定下一步

确保每页的 Next guide 显示的是显式业务路线中的下一步，而不是字母序或双向循环中的回指。若 GuideLayout 已有文章特定 next action 渲染逻辑（2026-07-18 已修复），本轮不重复修改布局。

## 十四、SEO 与双语

- 每页 self-canonical：使用当前绝对 HTTPS trailing-slash URL。
- 所有内部链接使用 trailing slash；
- 本轮无中文新增页面，不创建 hreflang；
- sitemap 保持 54 篇英文 guide canonical + 8 篇中文 Germany A1 canonical，无重复、无 legacy `.html`、无测试 fixture；
- 不创建 FAQPage 或 HowTo schema，除非页面真实可见 FAQ 且与内容一致。

## 十五、TDD 执行顺序

只为真实缺口写 RED。若预检发现行为已完成，禁止删除正确行为或写故意错误断言来制造失败。

### Slice A：来源状态

在 `tests/germany-a1-cluster.test.js` 或新测试文件中增加五国断言：

- 10 篇保持 `verification-pending`；
- 按真实复核结果 reviewed/pending；
- reviewed 必须有真实日期和 source-review role；
- pending 不得有复核日期；
- 已 reviewed 页不保留冲突的手写 pending。

运行：

```bash
node tests/germany-a1-cluster.test.js
```

若新建了 `tests/p0-five-countries.test.js`，同时运行它。

### Slice B：路线无环

在 `tests/content-integrity.test.js` 增加五国断言：

- target 存在、同 category/route；
- 无 self-link；
- 无直接双向 nextGuideSlug 循环；
- next 与 supporting 不重复；
- choice 页无 next；
- supportingGuideSlugs 不跨国家混用（特别检查 Finland）。

运行：

```bash
node tests/content-integrity.test.js
```

### Slice C：构建后的来源状态和 Next guide

在 `tests/source-review-render.test.js` 增加五国断言：

- reviewed 页面显示 `Official sources last checked` 和 reviewer role；
- pending 页面只显示 pending，不显示虚构日期；
- `dateModified` 仍来自 `updatedDate`，不是 `sourceReviewedAt`；
- 五国页面一个 H1、disclaimer；
- 五国的可见 Next guide 等于显式业务 next，而非字母序；
- sitemap 包含 54 篇英文 + 8 篇中文 guide canonical，各一次；
- sitemap 不含 fixture 或 legacy `.html`。

运行：

```bash
node tests/source-review-render.test.js
```

## 十六、允许修改的文件

默认 allowlist：

```text
10 篇 P0 指南 Markdown
tests/content-integrity.test.js
tests/germany-a1-cluster.test.js 或 tests/p0-five-countries.test.js（新建）
tests/source-review-render.test.js
tests/site.test.js，仅在测试入口确实需要时修改
docs/CONTENT_MAP.md
docs/TASK_LOG.md
```

条件 allowlist：

```text
src/pages/guides/[slug].astro：仅当五国 Next guide 构建渲染需要最小调整
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
src/components/ZhGuideLayout.astro
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
```

若必须修改 denylist 文件才能通过真实失败测试，先停止并在报告中说明；不要擅自扩大范围。

## 十七、绝对禁止项

不得：

- 新增、删除或重命名任何公开页面；
- 修改 Germany A1/B1、France、Netherlands Inburgering、Spain、TestDaF、telc starter 内容；
- 将任何页面提升为 `complete-route` 或 `core-route`；
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
node tests/content-integrity.test.js
node tests/germany-a1-cluster.test.js
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
- 10 篇页面保持 `verification-pending`；
- 五国各自无直接双向 next-guide 循环；
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

- `PASS`：10 篇核心页都已完成安全处置；最终公开高风险主张均有足够来源支持；所有页面状态与证据一致；完整验证通过。
- `PARTIAL`：至少一篇核心页安全完成并通过验证，但另有页面因**页面级、彼此独立的来源缺口**保持 pending；这些缺口不阻止路线去环、正文清理和已完成页面通过测试。所有已修改内容必须安全、验证通过，且没有工作树冲突或越界修改。
- `BLOCKED`：唯一目录/HEAD/工作树基线不兼容；任一目标文件已有无法安全合并的修改；来源冲突会影响跨页共享结论或主路线设计；无法识别各国主管机关导致核心页不能安全处置；必需测试/launch check 失败且无法在 allowlist 内修复；或完成任务需要 denylist、提交、部署、服务器或用户专属输入。

单个页面来源不可访问并不自动使整个任务 `BLOCKED`：若该页面可保持 pending、移除无支持结论，且其他页面与路线工作仍能安全完成，则整体为 `PARTIAL`。只有当来源问题阻断跨页核心结论、路线结构或无法形成安全公开内容时，整体才为 `BLOCKED`。

### 基线

- 唯一根目录；
- 分支；
- 初始 HEAD；
- origin/main；
- 初始工作树；
- 提示词基线是否有效。

### 实际范围

- 计划处理的 10 个 slug；
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

- 五国主路线；
- 修复的循环；
- next/supporting；
- Finland supportingGuideSlugs 收窄结果；
- canonical；
- sitemap。

### 验证

| 命令 | 退出码 | 关键输出 | 结果 |
|---|---:|---|---|

### 未完成与阻塞

- 无法访问或不能支持主张的来源；
- 需要具体主管机关确认的事实；
- 保持 pending 的页面；
- 未处理的相邻观察。

### 交付边界

明确写出：

- 未提交；
- 未推送；
- 未部署；
- 未访问服务器；
- 未修改第三方账户。
