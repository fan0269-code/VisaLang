# VisaLang 2026-07-19 Germany B1 内容完善 Codex 执行提示词

> 直接将本文件完整内容交给 Codex 执行。不要只复制其中某个章节。

## 一、角色与唯一目标

你是 VisaLang 内容站的执行 Agent。请在当前 Astro 项目中完成 **Germany B1 定居许可与入籍核心路线的官方来源复核、路线去环、公开文案清理和 B1 Hub 内容/SEO 收敛**。

本轮不是扩页项目，不是法律结论项目，也不是部署项目。采用能完成目标的最小变更，不重构无关代码，不扩大国家/考试范围，不把历史审计、搜索摘要或考试方营销文案当成最终决定机关的证据。

## 二、唯一工作目录和时效门禁

唯一维护目录：

```text
/Users/fanlw/Documents/考试网站维护/VisaLang
```

旧目录 `/Users/fanlw/Documents/搬迁测试/VisaLang` 只可作为历史/回滚参考，不得编辑、测试、构建或提交。

开始前运行：

```bash
pwd -P
git rev-parse --show-toplevel
git status --short --branch
git status --porcelain=v1 --untracked-files=all
git rev-parse HEAD
git rev-parse origin/main
git log --oneline -12
```

然后用只读脚本把基线写入会话临时目录；不要写入仓库：

```bash
BASELINE_DIR="$(mktemp -d /tmp/visalang-b1-baseline.XXXXXX)"
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
- 若 Germany B1 已被更新后的提交完成，先比较实际行为和本提示词目标；不得重复实现、回退或为制造 RED 破坏已有行为。
- 本提示词以 2026-07-19 的 `main` 基线编写。若当前 HEAD 已包含更晚的 B1 内容工作，必须先重新评估，不可盲目执行。

## 三、事实优先级

发生冲突时按以下顺序判断：

1. 当前维护目录、当前 HEAD、当前源码和测试；
2. 当前项目级 `CLAUDE.md`、`AGENTS.md`、`package.json`；
3. 最新日期的专项审查和 `docs/OPERATIONS_STATUS.md`；
4. `docs/TASK_LOG.md` 中对应提交/发布的记录；
5. 历史设计、计划、旧提示词和旧审计仅作历史证据。

必须知道的当前事实：

- Germany A1 路线、8 篇中文 Germany A1 指南的来源与最终中文措辞复核已经在 2026-07-19 完成并发布；其中 3 篇中文核心路由是在 2026-07-18 内容窗口新增。不得重复处理。
- 旧文件 `docs/prompts/2026-07-18-visalang-content-update-codex.md` 已过期，不是本轮执行依据。
- Germany B1 现有 13 篇指南，内容成熟度为 `core-route`；本轮不得新增 B1 页面或提升成熟度。
- `docs/PHASE_2_B1_CONTENT_AUDIT.md` 中的 `Finalized 2026-07-13` 是历史编辑审计处置，不等于当前 schema 的 `sourceReviewStatus: reviewed`。
- 当前 B1 核心页仍默认 `sourceReviewStatus: pending`，并存在 next-guide 循环和公开内部编辑语言。

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
- `src/pages/germany-b1-settlement-citizenship.astro`
- `docs/MASTER_EXECUTION_PLAN.md`
- `docs/CONTENT_MAP.md`
- `docs/OPERATIONS_STATUS.md`
- `docs/TASK_LOG.md`
- `docs/PHASE_2_B1_CONTENT_AUDIT.md`
- `docs/superpowers/plans/2026-07-19-visalang-germany-b1-content-review.md`
- `tests/germany-b1-cluster.test.js`
- `tests/content-integrity.test.js`
- `tests/source-review-render.test.js`
- `tests/site.test.js`

然后阅读本轮 8 篇核心指南和 5 篇排除的备考页，以确认边界和现有内链。

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

### 6.1 IN SCOPE：8 篇核心指南

1. `src/content/guides/goethe-b1-germany-settlement-work.md`
2. `src/content/guides/germany-b1-citizenship-language-proof.md`
3. `src/content/guides/germany-b1-leben-in-deutschland-and-language-proof.md`
4. `src/content/guides/goethe-b1-vs-telc-b1.md`
5. `src/content/guides/goethe-b1-fees-and-booking.md`
6. `src/content/guides/goethe-b1-study-plan.md`
7. `src/content/guides/germany-b1-settlement-citizenship-timeline.md`
8. `src/content/guides/germany-b1-settlement-citizenship-checklist.md`

### 6.2 IN SCOPE：页面、测试和记录

- `src/pages/germany-b1-settlement-citizenship.astro`
- `src/pages/guides/[slug].astro`，仅用于 Germany B1 显式 Next guide
- `tests/germany-b1-cluster.test.js`
- `tests/content-integrity.test.js`
- `tests/source-review-render.test.js`
- `tests/site.test.js`，仅在测试入口确实需要时修改
- `docs/PHASE_2_B1_CONTENT_AUDIT.md`
- `docs/CONTENT_MAP.md`
- `docs/TASK_LOG.md`，仅在完成并验证后追加真实结果

### 6.3 默认不修改：5 篇备考支持页

- `goethe-b1-difficulty-analysis.md`
- `goethe-b1-listening-deep-dive.md`
- `goethe-b1-mock-exam-routine.md`
- `goethe-b1-speaking-topics.md`
- `goethe-b1-writing-assessment.md`

仅当消除核心路线循环需要调整它们的 `nextGuideSlug` 或 `supportingGuideSlugs` 时，才允许做最小 frontmatter 变更；不得把它们标记为 `reviewed`，除非本轮也逐条完成其考试事实来源复核。不得改写它们的正文。

### 6.4 OUT OF SCOPE

- Germany A1、中文 A1、TestDaF、telc starter 集群；
- France、Netherlands 或其他 `blocked` 页面；
- UK、Canada、Italy、Spain、Finland、Portugal 等其他国家；
- 新增 Germany B1 页面；
- 将任何 B1 页面提升为 `complete-route`；
- 全站视觉设计、CSS 重构、导航重构；
- Route Finder、Checklist、Timeline、Exam Comparison 工具业务；
- 分析、广告、CMP、表单、邮件、支付、商业交付；
- 依赖、`package-lock.json`、Astro 配置；
- 部署、服务器、DNS、TLS、Nginx、第三方账户；
- commit、push、PR。

## 七、今天的内容目标

本轮应实现：

1. 为 8 篇核心页逐条建立并保存来源 claim matrix；
2. 实际打开当前第一方来源，逐页决定 `reviewed` 或继续 `pending`；
3. 保持“页面事实与核验流程已复核”和“读者个案仍需实时核验”的区别；
4. 删除两组直接 next-guide 循环和其他 stage 倒退；
5. 让构建页面的 Next guide 服从显式业务路线，而不是标题字母顺序；
6. 清理 B1 Hub 和核心指南中的内部编辑语言、冲突状态、自链接和模板化导航；
7. 为 B1 Hub 增加最小可访问 TOC 和与可见内容一致的页面级 JSON-LD；
8. 同步内容账本，不能继续把已完成的 Germany A1 来源复核记为 pending；
9. 通过聚焦测试、完整测试和 launch check。

## 八、推荐业务路线

使用双入口、单汇合、单终点，不建立强制循环。按以下逐 slug 映射实施：

| slug | `decisionStage` | `nextGuideSlug` | 精确 `supportingGuideSlugs` |
|---|---|---|---|
| `goethe-b1-germany-settlement-work` | `requirement` | `goethe-b1-vs-telc-b1` | `["germany-b1-settlement-citizenship-checklist", "germany-b1-settlement-citizenship-timeline"]` |
| `germany-b1-citizenship-language-proof` | `requirement` | `goethe-b1-vs-telc-b1` | `["germany-b1-leben-in-deutschland-and-language-proof", "germany-b1-settlement-citizenship-checklist"]`；LiD 是条件分支，不是主 next |
| `germany-b1-leben-in-deutschland-and-language-proof` | `requirement` | `goethe-b1-vs-telc-b1` | `["germany-b1-citizenship-language-proof", "germany-b1-settlement-citizenship-checklist"]` |
| `goethe-b1-vs-telc-b1` | `choice` | `goethe-b1-fees-and-booking` | `["goethe-b1-germany-settlement-work", "germany-b1-citizenship-language-proof"]` |
| `goethe-b1-fees-and-booking` | `local-execution` | `germany-b1-settlement-citizenship-timeline` | `["goethe-b1-vs-telc-b1", "goethe-b1-study-plan"]` |
| `goethe-b1-study-plan` | `local-execution` | `germany-b1-settlement-citizenship-timeline` | `["goethe-b1-vs-telc-b1", "goethe-b1-fees-and-booking"]` |
| `germany-b1-settlement-citizenship-timeline` | `local-execution` | `germany-b1-settlement-citizenship-checklist` | `["goethe-b1-germany-settlement-work", "germany-b1-citizenship-language-proof"]` |
| `germany-b1-settlement-citizenship-checklist` | `submission-review` | 省略该字段 | `["goethe-b1-germany-settlement-work", "germany-b1-citizenship-language-proof"]`；作为终点 |

规则：

- `nextGuideSlug` 是唯一主下一步；没有真实下一步时省略。
- `supportingGuideSlugs` 是并行、补充或条件性页面，不与 next 重复。
- checklist 是提交前复核终点，不能回指 timeline。
- citizenship 与 LiD 不能互相 next。
- `choice` 不得默认倒退到 `requirement`；`submission-review` 不得回到 `local-execution`。
- Route Review 是非法律服务边界，不是 Markdown guide 的 next。
- 不得自行改成另一套路线映射；若当前源码职责与表格存在不可调和冲突，报告 `BLOCKED`，不要扩大设计范围。

## 九、官方来源五层门禁

### 9.1 权威顺序

1. 当前德文法条；
2. 具体地方主管机关当前路线页面、PDF、申请门户或书面回复；
3. BAMF / 德国政府官方说明；
4. Goethe / telc 等考试主办方产品页；
5. 具体官方或授权考点的当前页面、报名门户、PDF 或书面回复。

搜索引擎摘要、AI 回答、历史审计、论坛、培训机构和其他申请人的经验只可用于发现入口，不能作为证据。

### 9.2 Germany B1 候选官方入口

这些 URL 是候选入口，不是预先批准的来源。你必须实际打开、记录最终 URL、页面标题、访问结果和定位段落：

#### 定居许可与 B1 法律术语

- `https://www.gesetze-im-internet.de/aufenthg_2004/__2.html`
- `https://www.gesetze-im-internet.de/aufenthg_2004/__9.html`
- 根据页面实际路线检查 `§9a`、`§18c`、`§26`、`§28` 或其他适用条款；不得把 §9 泛化到所有路线。
- `https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Migrathek/Niederlassen/niederlassen-node.html`
- `https://bamf-navi.bamf.de/en/Themen/Behoerden/?typ=ABH`

#### 入籍、B1 与公民知识

- `https://www.gesetze-im-internet.de/stag/__10.html`
- `https://www.einbuergerung.de/service.php?l=en`
- `https://www.einbuergerung.de/ablauf.php?l=en`
- `https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99099002067003/`
- `https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01-zustaendigkeit-606634`

#### Leben in Deutschland / Einbürgerungstest / DTZ

- `https://www.gesetze-im-internet.de/einbtestv/`
- `https://www.gesetze-im-internet.de/einbtestv/__1.html`
- `https://www.gesetze-im-internet.de/intv/__17.html`
- `https://www.gesetze-im-internet.de/inttestv/__10.html`
- `https://www.bamf.de/EN/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/Abschlusspruefung/abschlusspruefung-node.html`

#### Goethe B1

- `https://www.goethe.de/en/spr/prf.html`
- `https://www.goethe.de/ins/de/en/prf/prf/gzb1.html`
- `https://www.goethe.de/ins/de/en/prf/ort.html`
- `https://www.goethe.de/ins/de/en/prf/pre.html`
- `https://www.goethe.de/ins/de/en/prf/prf/gzb1/inf.html`

#### telc B1

- `https://www.telc.net/en/language-examinations/certificate-exams/german/certificate-german-telc-german-b1/`
- `https://www.telc.net/en/language-examinations/find-a-telc-examination-centre/`
- `https://www.telc.net/en/language-examinations/language-examinations-support-faq/`

### 9.3 每个高风险主张的 claim matrix

每条主张单独记录，至少包含：

```text
page_slug
claim_id
section_heading
claim_text
claim_category
route_name
route_statute
jurisdiction
target_authority
decision_owner
source_owner
source_title
source_url（最终 URL）
source_type
source_language
authoritative_language
accessed_at（实际日期）
access_result
page_updated_at / law_version_or_effective_date
exact_quote
quote_translation
locator（法条/段落/标题/PDF 页）
support_level（direct / partial / contextual / unsupported）
source_scope
claim_scope
scope_match
qualifiers
exceptions_present
cross_references
cross_references_checked
locality_specific
time_sensitive
legal_change_risk
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

严禁从通用 BAMF、政府概览、考试方或中央页面推出：

- 固定定居许可或入籍居住年限；
- 申请人已经符合资格；
- 所有定居许可路线都要求 B1；
- Goethe B1、telc B1、DTZ 或融合课程证书被普遍接受；
- 模块成绩、完整证书和不同考试产品法律效果相同；
- B1 可以替代公民知识，或 LiD/入籍测试可以替代 B1；
- LiD 与 Einbürgerungstest 在所有用途完全等价；
- 某人符合疾病、残障、年龄、困难或其他豁免；
- BAMF 能替地方外管局或入籍机关决定个案；
- 考试主办方或考点能决定定居或入籍结果；
- 中央产品页能证明地方费用、日期、名额、出分、退款或改期；
- 英文法条翻译必然与当前德文法条同步；
- 搜索摘要或历史页面仍是 2026 年有效规则。

2024—2026 年间入籍规则存在变化。凡涉及居住年限、加速路径、生活来源、例外或排除条件的句子，只有在同时核验当前德文法条、对应段落、生效/修订状态和政府说明无冲突时才可保留；否则删除具体数字，改为地方主管机关核验动作。

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
- 未识别具体定居许可法条或申请类别；
- 法条存在未核查的例外、豁免或交叉引用；
- 2024—2026 修法状态不清；
- 来源只支持 B1 水平，不支持具体证书名称；
- 地方主管机关未命名或只写 B1、不写接受文件；
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

- 8 篇页面可以分别为 reviewed 或 pending；不要预设全部通过。
- `contentStatus` 全部保持 `core-route`。
- `publishedDate` 保持首次发布日期。
- `updatedDate` 只在有实质用户可见内容变化时更新。
- `sourceReviewedAt` 只代表实际来源复核日期，不能复制 `updatedDate` 或历史审计日期。
- 页面已 reviewed 但读者仍需核验当地动态事实是允许的；不得因动态事实存在而错误回退页面事实复核，也不得把页面 reviewed 写成读者个案已确认。

## 十三、公开内容清理规则

### 13.1 B1 Hub

从 `src/pages/germany-b1-settlement-citizenship.astro` 删除或改写用户可见的内部实施语言：

- `Content map and internal-link matrix`
- `Existing B1 guide audit`
- `Reworked as...`
- `Genuinely missing decision pages...`
- `proposed support`
- `proposed human-service contact path`

替换为读者导向结构：

1. 谁决定、先确认哪条路线；
2. Settlement / citizenship 两个入口；
3. 语言证明与公民知识分离；
4. 只比较主管机关确认可能适用的证明；
5. 官方/授权考点核验；
6. 时间线；
7. checklist；
8. 可选备考支持；
9. 工具边界。

### 13.2 核心指南

清理或改写：

- 已 reviewed 页面手写的 `Official verification pending`；
- `Reader decision and search intent`；
- `Manual checks still needed`；
- 面向编辑者的 `Before you rely on this page` 清单；
- `Proposed B1 practice pack interest`；
- 页面自链接；
- 每页完全相同的六链接“Continue your B1 decision route”模板。

每页保留：

- 一个明确读者问题；
- 一个限定性的主下一步；
- 最多两个条件性辅助链接；
- 谁最终决定；
- 读者需保存的来源/日期/书面回复；
- VisaLang 不决定资格、豁免、接受或结果的边界。

品牌方向：

- 前瞻：提前指出下一决策、来源变化和时间风险；
- 锐度：明确谁决定什么，删掉内部术语和模糊结论；
- 温度：承认材料、考试、费用和等待压力，但不承诺结果。

避免 `comprehensive guide`、`ultimate guide`、`one-stop solution`、`navigate the complex world of`、`decision support`、`safe answer`、`最稳`、`一定接受`、`保证通过` 等表达。

## 十四、B1 Hub SEO 与可访问性

在最小范围内复用现有组件和布局：

- 保持 self-canonical：`https://visalang.org/germany-b1-settlement-citizenship/`；
- exactly one H1；
- 使用现有 `ArticleTOC`，每个 TOC link 指向真实 H2 id；
- 使用 `BaseLayout` 的 `jsonLD` 接口增加与可见内容一致的：
  - `BreadcrumbList`
  - `CollectionPage`
  - 如使用 `ItemList`，其条目必须在页面可见；
- 不添加不可见 `FAQPage` 或 `HowTo`；
- 所有内部链接使用 trailing slash；
- 不创建 hreflang，因为本轮没有真实等价的中文 B1 页面；
- sitemap 保持一个 Hub canonical 和 13 个 B1 guide canonical，无重复、无 legacy `.html`。

## 十五、TDD 执行顺序

只为真实缺口写 RED。若预检发现行为已完成，禁止删除正确行为或写故意错误断言来制造失败。

### Slice A：来源状态

1. 在 `tests/germany-b1-cluster.test.js` 增加精确断言；
2. 运行：

```bash
node tests/germany-b1-cluster.test.js
```

3. 记录退出码、首个失败和它为何证明当前缺口；
4. 实施最小 frontmatter/内容修复；
5. 重跑至 exit 0。

断言要求：

- B1 仍为 13 篇；
- 全部 `core-route`；
- 8 篇按真实复核结果 reviewed/pending；
- 5 篇未复核支持页保持 pending；
- reviewed 必须有真实日期和 source-review role；
- pending 不得有复核日期；
- 已 reviewed 页不保留冲突的手写 pending。

### Slice B：路线无环

1. 在 `tests/content-integrity.test.js` 增加 B1 业务路线断言；
2. 运行：

```bash
node tests/content-integrity.test.js
```

3. 当前循环应使新增断言失败；
4. 更新 next/supporting；
5. 重跑至 exit 0。

断言要求：

- target 存在、同 route；
- 无 self-link；
- 无直接或多节点循环；
- next 与 supporting 不重复；
- terminal 无 next；
- preparation 分支不能倒退形成循环。

### Slice C：构建后的来源状态和 Next guide

在 `tests/source-review-render.test.js` 增加真实构建断言：

- reviewed 页面显示 `Official sources last checked` 和 reviewer role；
- pending 页面只显示 pending，不显示虚构日期；
- `dateModified` 仍来自 `updatedDate`，不是 `sourceReviewedAt`；
- B1 页面一个 H1、一个 TOC、Article/BreadcrumbList JSON-LD、disclaimer；
- B1 的可见 Next guide 等于显式业务 next，而非字母序；
- sitemap 包含 Hub 和 13 个 B1 canonical，各一次；
- sitemap 不含 fixture 或 legacy `.html`。

运行：

```bash
node tests/source-review-render.test.js
```

该测试会生成 `dist/` 和临时 fixture。必须依赖现有 `try/finally` 清理，并在测试后确认没有遗留 `__source-review-*` 文件。

### Slice D：Hub

为 B1 Hub 添加源级和构建级断言：

- 一个 H1；
- 一个 `ArticleTOC`；
- TOC href 都有对应 id；
- self-canonical；
- JSON-LD 包含 Organization、BreadcrumbList、CollectionPage；
- 核心入口按业务顺序出现；
- 内部链接 trailing slash 且可解析；
- 不出现内部编辑语言。

## 十六、允许修改的文件

默认 allowlist：

```text
8 篇核心 B1 Markdown
src/pages/germany-b1-settlement-citizenship.astro
src/pages/guides/[slug].astro
tests/germany-b1-cluster.test.js
tests/content-integrity.test.js
tests/source-review-render.test.js
docs/PHASE_2_B1_CONTENT_AUDIT.md
docs/CONTENT_MAP.md
docs/TASK_LOG.md
```

条件 allowlist：

```text
5 篇备考页：仅 nextGuideSlug / supportingGuideSlugs，且必须用于消除路线循环
测试入口 tests/site.test.js：仅在现有入口未包含聚焦测试时
scripts/launch-check.js：只有失败测试证明现有检查真实有缺陷时
```

默认 denylist：

```text
src/content.config.ts
src/data/source-review.ts
src/layouts/BaseLayout.astro
src/layouts/GuideLayout.astro
src/components/ArticleTOC.astro
src/components/LastCheckedBadge.astro
src/styles/global.css
astro.config.mjs
scripts/enrich-sitemap-lastmod.js
package.json
package-lock.json
public/
deploy/
```

若必须修改 denylist 文件才能通过真实失败测试，先停止并在报告中说明；不要擅自扩大范围。

## 十七、绝对禁止项

不得：

- 新增、删除或重命名任何公开页面；
- 修改 Germany A1 或中文 A1；
- 修改其他国家、TestDaF 或 telc starter 内容；
- 把 B1 提升为 `complete-route`；
- 用历史 `Finalized` 直接赋值 reviewed；
- 批量把 `sourceReviewedAt` 改成今天；
- 批量刷新 `updatedDate`；
- 复制搜索摘要、AI 回答或旧审计结论到正文；
- 用考试方产品页证明定居/入籍接受性；
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
- B1 保持 13 篇，无新增路由；
- 全部 B1 保持 `core-route`；
- 路线无循环，构建后的 Next guide 服从显式业务顺序；
- 来源状态与实际核验一致；
- Hub canonical、TOC、JSON-LD、H1、内部链接和 sitemap 通过；
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

- `PASS`：8 篇核心页都已完成安全处置；最终公开高风险主张均有足够来源支持；所有页面状态与证据一致；完整验证通过。
- `PARTIAL`：至少一篇核心页安全完成并通过验证，但另有页面因**页面级、彼此独立的来源缺口**保持 pending；这些缺口不阻止路线去环、Hub 清理和已完成页面通过测试。所有已修改内容必须安全、验证通过，且没有工作树冲突或越界修改。
- `BLOCKED`：唯一目录/HEAD/工作树基线不兼容；任一目标文件已有无法安全合并的修改；来源冲突会影响跨页共享结论或主路线设计；无法识别定居许可路线导致 settlement 核心页不能安全处置；必需测试/launch check 失败且无法在 allowlist 内修复；或完成任务需要 denylist、提交、部署、服务器或用户专属输入。

单个页面来源不可访问并不自动使整个任务 `BLOCKED`：若该页面可保持 pending、移除无支持结论，且其他页面与路线工作仍能安全完成，则整体为 `PARTIAL`。只有当来源问题阻断跨页核心结论、路线结构或无法形成安全公开内容时，整体才为 `BLOCKED`。

### 基线

- 唯一根目录；
- 分支；
- 初始 HEAD；
- origin/main；
- 初始工作树；
- 提示词基线是否有效。

### 实际范围

- 计划处理的 8 个 slug；
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

- 主路线；
- 修复的循环；
- next/supporting；
- Hub canonical；
- TOC；
- JSON-LD；
- sitemap；
- 未创建 hreflang 的原因。

### 验证

| 命令 | 退出码 | 关键输出 | 结果 |
|---|---:|---|---|

### 未完成与阻塞

- 无法访问或不能支持主张的来源；
- 需要具体地方主管机关/考点的事项；
- 保持 pending 的页面；
- 未处理的相邻观察。

### 交付边界

明确写出：

- 未提交；
- 未推送；
- 未部署；
- 未访问服务器；
- 未修改第三方账户。
