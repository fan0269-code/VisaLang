---
status: review
needs_human_review: true
owner_decision: pending
deployment_status: not_started
---
# VisaLang T27 收尾与 T28 本地验收

分支 codex/scheme-3-one-week-content；基线/结果 HEAD 均为 4cb57e8744c752fed1881281e69e7b24cc7281c4，未提交。准确文件范围见本轮 sync.json scope.changedPaths。规划依据为 Master Package T27/T28；T27 同一独立 Auditor 正式 PASS 后才执行 T28。

内容/实现：不新增移民考试事实。只修复共享表单在变更或错误输入时遗留旧结果的问题；六个中英文浏览器回归先红后绿。五工具双语链、移动视口、真实复制/文件下载、PDF、状态恢复的完整事实记录见 VISALANG_T28_LOCAL_ACCEPTANCE_2026-09-20.md。代码事实来源：src/scripts/tool-form.ts、plan-state.ts、measurement-contract.ts；没有外部政策重新核验主张。

T27 最终 focused/npm test/build/governance/diff exit 0，launch-check 1（T23 唯一阻塞）；T28 命令结果见 docs/t28-evidence-2026-09-20/preaudit/command-results.json，最终审查及审查后命令单独留证。T28 尚未全部完成；真人、中文完整原生选择键盘流程、实体设备、日历导入与通知均保留未测。未取得真实统计数据。T19 partial；T23 blocked。

Owner decision pending：无提交、推送、迁移或部署授权。指定 Vault 目录与模板不存在；此文件只是本地待审核载荷，不代表正式 Obsidian 同步完成。
