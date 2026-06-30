# 德国考试深耕 — 内容扩充计划

> 决策：路线 A（深耕德国），在现有 10 篇 Germany A1 guide 基础上，补齐 Goethe B1、TestDaF、telc 三个考试的落地页。

## 现有德国内容盘点

| 已有 | 数量 |
|:---|:---|
| 德国相关考试数据条目 | 4 个（Goethe A1 / Goethe B1 / TestDaF / telc B1/B2） |
| 已有完整 guide 页 | 10 篇（全为 Goethe A1 主题） |
| 缺 guide 页的德国考试 | Goethe B1、TestDaF、telc B1/B2 |

## 新增内容清单（12 篇 guide）

### Goethe-Zertifikat B1（4 篇）
面向人群：永居/入籍/工作签证，比 A1 高一档

| 文件名 | 标题 |
|:---|:---|
| `goethe-b1-germany-settlement-work.html` | Goethe B1 for German settlement and work |
| `goethe-b1-fees-and-booking.html` | Goethe B1 fees and booking by country |
| `goethe-b1-vs-telc-b1.html` | Goethe B1 vs telc B1: which is accepted where |
| `goethe-b1-study-plan.html` | 60-day Goethe B1 study plan for working adults |

### TestDaF（4 篇）
面向人群：德国大学留学，不同于签证/入籍

| 文件名 | 标题 |
|:---|:---|
| `testdaf-germany-university-admissions.html` | TestDaF for German university admissions |
| `testdaf-levels-and-scoring.html` | TestDaF levels (TDN 3/4/5) and how scoring works |
| `testdaf-vs-goethe-dsh.html` | TestDaF vs Goethe C1 vs DSH for university entry |
| `testdaf-preparation-and-practice.html` | TestDaF preparation plan and official practice sources |

### telc Deutsch B1/B2（4 篇）
面向人群：护理/工作/居留，与 Goethe 平行的认证路径

| 文件名 | 标题 |
|:---|:---|
| `telc-b1-b2-germany-work-nursing.html` | telc Deutsch B1/B2 for work, nursing, and residence |
| `telc-b1-b2-fees-and-test-centers.html` | telc B1/B2 fees and test centers |
| `telc-vs-goethe-for-german-visa.html` | telc vs Goethe: which German exam for your visa route |
| `telc-b1-b2-exam-format-and-preparation.html` | telc B1/B2 exam format and safe preparation guide |

## 每篇 guide 必须包含

- 面包屑：Home / Germany / 本文
- 左侧 TOC（基于 section h2 锚点）
- 主题 SVG 图标
- `guide-summary` 一段概述
- 至少 3 个 `<section>`（含"官方说了什么"/"该怎么查"/"下一步"三段式）
- `Official sources` 段（对应考试官方链接）
- 合规提示行（费用日期以官方为准）
- `Last updated: {当前日期}`
- JSON-LD Article
- 相关文章 3 篇（优先连回已有 A1 guide）

## 工程注意事项

- `tests/site.test.js` 当前硬检查 `guides/` 目录下恰好 10 个 `.html` 文件
- **新增 guide 前必须同步改测试断言**：把 `assert.equal(guideFiles.length, 10, ...)` 改为对应新数量
- 新增的 guide 也必须满足测试的硬约束：含 `Last updated`、`Official sources`、官方链接
- 每篇的 `<h2>` section 标题需要给 `id` 锚点

## 主页联动

- 首页 guide-batch 区目前硬展示 Germany A1 10 篇。可改为按分类分组展示（如"Germany A1 / Germany B1+ / TestDaF / telc"四组）
- `recommendExamPath` 已经支持 Germany 的所有分支，新增 guide 后路径推荐会自然指向新页面

## 后续可选

- 写完 12 篇后，跑 `npm run launch-check` 确认全站死链、JSON-LD、官方来源
- git push → 等 15 分钟自动上线