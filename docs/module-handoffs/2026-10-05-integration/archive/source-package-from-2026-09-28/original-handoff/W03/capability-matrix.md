# W03 能力与入口矩阵

数据依据：本轮分配副本 `src/data/route-tools.ts` 的 routeRegistry、`src/data/site.ts` 的发现入口、publication-manifest、实际中英页面。均只读；未重新核验移民/考试/费用官方事实，未刷新 checkedAt。

| 能力层 | 实際能力 | 本次入口 |
|---|---|---|
| 德国 A1 配偶团聚 | 1 configured，分阶段准备流程；最终接收决定仍由负责机关作出 | EN `/germany-family-reunion-a1/`；ZH `/zh/germany-family-reunion-a1/`；三任务可直接进入 |
| 德国 B1 永居/入籍 | 英文内容专题；对应 germany-b1 工具注册仍为 verify-only | `/germany-b1-settlement-citizenship/`；中文入口就近标明“英文” |
| 官方核验起点 | 总共 4 verify-only：germany-b1、germany-ausbildung、germany-nursing、germany-university；不是四个额外完整流程 | EN/ZH 对应语言的 Route Finder，手选入口；未宣传或调用 AI |

site.routes 的 6 个目的入口不等于 6 个工具注册项。Study/Work/Not sure 共用 Finder；Settlement/Citizenship 共用 B1 内容专题。RouteSelector 的这些目的提示已合格，保持原样。

| 当前任务 | EN | ZH |
|---|---|---|
| 查要求 | `/guides/german-family-reunion-language-requirement/` | `/zh/guides/german-family-reunion-language-requirement/` |
| 已有证书 | `/guides/goethe-a1-germany-family-reunion/` | `/zh/guides/goethe-a1-germany-family-reunion/`（已有 Goethe A1） |
| 准备报名 | `/guides/german-a1-exam-booking-timeline/` | `/zh/guides/german-a1-exam-booking-timeline/` |

中文 C07 是 9/22 恢复的现有受维护页：实际标题与证书记录内容相符；publication policy 为 retained/noindex/无广告。旧 task-4 的“不得虚构中文 C07”断言已经陈旧，本次改为真实路由和内容存在、精确任务链接及 noindex/无广告断言。没有修改索引白名单、发布 manifest 或语言等价映射。中文语言不推断申请地。

截图不能证明真人能理解任务、接受要求正确性或真实设备体验。读者理解和 LP00/LP04 验收仍待 W01/W00 获得真实证据。
