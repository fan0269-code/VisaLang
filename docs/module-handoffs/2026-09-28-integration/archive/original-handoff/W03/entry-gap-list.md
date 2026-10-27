# 本轮入口缺口与处置

历史设计输入：扫描 01 英文桌面、03 要求指南手机、07 中文首页；历史 receipt 的 CSS 390×844 与实际 JPEG 375×812 明确区分。它们仅用于解释已确认问题，本轮 before/final 截图来自独立端口 4353 新构建，PNG 与 CSS viewport 均为 1:1。

| 缺口 | 当前副本复现 | 最小处置与证据 |
|---|---|---|
| 首页任务过晚、重复 A1/B1/Finder 入口 | before-browser.json 的 stage-title/zh-stage-title 在桌面约898–922px、375/390约975–1033px；resource 区 Finder 同区两次 | 将三任务移到 Hero copy 内、图片之前；删除重复 spotlight 和 purpose 区，合并为能力说明和各一个 B1/Finder 入口；final-browser.json |
| 任务标题与链接标签重复 | 原 stage-card 同一标签在标题/链接各出现一次 | 标题直接作为可触控链接，保留44px高度；link-results.json 验证任务链接和可见焦点 |
| 中文已有证书任务跳比较页 | stage 文案“提交什么证明”，href 比较页；red-entry-certificate.log exit1 | 直达已有中文证书页；final-1.log exit0，实际 Enter 跳转与 noindex 验证 |
| Tools 重复 Finder CTA、Available 标签缺范围 | 首屏未解释单 configured 与 B1 边界 | 移除重复顶部 Finder CTA 和每卡重复 Available，保留全部5工具与各工具任务描述；范围放首屏 |
| Routes 二次 Finder 入口 | 顶部主CTA加末段3工具又含Finder | 末段保留 Checklist/Timeline；目的卡保持原数据，补1/4与B1范围 |
| Escape 不关闭，焦点离开后遮挡 | before-keyboard.json 8组 escapeClosed/focusReturned/closesOnExit 均 false | GlobalHeader 处理 Escape还焦、移焦关闭、外部点击关闭；final-keyboard.json 8组通过；额外导航28检查 |
| 手机菜单定位使用68px token而非实际header底部 | 原 fixed/inset token | 改absolute top:100%，高度限制仍沿用既有 token；菜单自然跟随当前header |
| 03指南元信息密度 | 历史扫描已证实，但 GuideLayout 未分配给 W03 | 留 W04；未改指南/事实/分类元信息 |

基线 build 与3个必需回归均通过，表明旧断言没有覆盖中文任务错链。新增任务链接断言先失败后修复。

测试编排记录：初次沙箱禁止回环监听与Chrome启动；经工具批准后仅开放本地运行，未请求新范围授权。768px首轮键盘检查两例早于 requestAnimationFrame 的关闭时点，保存 round1日志后增加等待实际帧再检查，非产品改动。额外外部点击首轮选中被菜单覆盖的 h1，保存失败日志后改点页头可见空白，28项通过。浏览器所有外网请求被阻断，favicon 的单一资源错误不是产品运行时异常。

留给W00/W04的只读观察：中文C07数据 decisionStage 仍为 local-execution，是否与已有证书/递签任务一致可由W04核对；本窗口不改数据。MobileNavigation 的目的组缺可见小标题是非阻塞优化建议，保持本次范围最小。菜单原生无JS开关仍可用，Escape增强依赖JS。
