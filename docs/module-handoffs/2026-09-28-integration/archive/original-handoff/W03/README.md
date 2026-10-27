# W03 / LC01 — ready_for_integration

仅在 W00 分配副本 `/private/tmp/visalang-W00-2026-09-24-01/W03` 工作，主树未写入。派发依据是本次 Owner 发送 P01；不改 W00 主树 dispatch 状态。基线 `cd845c55e17fcffa5e2184f6047df6be65f74d3cb393a3f6723fc67b2f784b40`，最终候选 `f895b5901c6cdfadf4eab53ae770e54994d03dd5767e2efdd7979e53ba5501aa`。

首页把三任务移到主图区、图片之前；标题本身成为44px任务链接；去掉重复 spotlight/purpose 和重复 Finder 入口。中文已有 Goethe A1 证书直达现有中文页。保留 A1完整准备、B1内容专题、其他目的官方核验三层边界。Routes/Tools 合并重复入口和 Available 标签。共享导航补 Escape还焦、移焦关闭与外部点击关闭；手机菜单跟随真实header底部定位，沿用现有高度token。

交接文件：

- [handoff.json](handoff.json)：状态、8个源/测试差异的base/candidate哈希、实际测试与限制。
- [candidate.patch](candidate.patch)：仅本模块相对 W00 冻结基线差异。
- [candidate-manifest.json](candidate-manifest.json)：最终1313文件冻结候选身份；[start-byte-verification.json](start-byte-verification.json)为启动时全量复验。
- [capability-matrix.md](capability-matrix.md)、[entry-gap-list.md](entry-gap-list.md)：能力、入口、复现、保留项与W00观察。
- [final-tests.json](final-tests.json)、[final-browser.json](final-browser.json)、[final-keyboard.json](final-keyboard.json)、[link-results.json](link-results.json)、[navigation-extra.json](navigation-extra.json)：实际结果与[原始日志](logs/)。
- [visual-review.json](visual-review.json)、[code-review.md](code-review.md)：只读子代理检查记录，均不替代W18正式独审。
- [evidence-manifest.json](evidence-manifest.json)：新增交接文件、脚本、截图与日志字节哈希。没有新增产品源码文件；新增文件均为本模块证据。

实际验证（均本地）：

| 检查 | 结果 |
|---|---|
| npm run build | exit 0 |
| node tests/task-4-home-routes.test.mjs | exit 0；新中文证书断言先失败后修复，附保留策略检查 |
| node tests/m3-discovery-trust.test.mjs | exit 0 |
| node tests/scheme-3-publication.test.mjs | exit 0 |
| node tests/scheme-3-route-hubs.test.js | exit 0 |
| node tests/m3-chinese-journey.test.mjs | exit 0 |
| browser-check.mjs final | exit 0；16页面/视口组合，HTTP200、非空、无框架错误覆盖、元素边界无横溢出 |
| keyboard-check.mjs final | exit 0；8组EN/ZH×375/390/768/1440，Enter/Tab/Shift-Tab/Escape及模拟触控 |
| link-check.mjs | exit 0；40次三任务/B1/本地化Finder跳转；任务链接44px与焦点可见；ZH证书落地noindex |
| navigation-extra.mjs | exit 0；28项外部点击、互斥、菜单首末链接焦点遮挡检查、无JS开关 |

Chrome headless / Playwright，独立预览 `http://127.0.0.1:4353`。截图CSS与PNG一致：375×812、390×844、768×1024、1440×900；EN/ZH首页及EN Routes/Tools前后同视口。Node直接读取TS时保留现有 MODULE_TYPELESS_PACKAGE_JSON 提示，未改package配置。所有外网请求被阻断；每页唯一资源错误是BaseLayout现有线上favicon地址，未观察到正文运行时错误。预览在交接前停止，需要查看时在该副本用同命令重启。

前后对照：[英文桌面前](screenshots/before-en-1440-first.png) / [后](screenshots/final-en-1440-first.png)，[中文390前](screenshots/before-zh-390-first.png) / [后](screenshots/final-zh-390-first.png)，[英文375后](screenshots/final-en-375-first.png)。任务区域在375/390从原约975–1033px前移至约375–410px，桌面从约898–922px前移至406px；这是DOM位置观测，不是读者理解评分。全部全页/菜单图见screenshots。

共享接口：HomeHero移除必填featuredRoute，新增默认slot；两个调用者已同步。GlobalHeader新监听涵盖desktop/mobile details，BaseLayout原有desktop互斥监听保留且幂等。global.css改动限定Hero、home-tasks与手机菜单定位；W00需与W04逐段合并，不整文件覆盖。RouteSelector、MobileNavigation源码与全部路由/事实/manifest/锁文件保持原字节。

未验证：真人理解、真实手机、多浏览器、屏幕阅读器、深色主题、线上favicon/真实生产、官方事实本轮复查、模型/API、真实日历、目标主机与回滚。LP00/LP04及所有原T/LP/LC总包不因此关闭。初期测试编排失败原始记录与解释见entry-gap-list；探索记录不是最终候选验收结果。

W00下一步：校验本包base/candidate与主树重叠字节，串行逐段合并8文件；如主树已有差异先对账。统一维护权威记录、TASK_LOG、规划图/history/sync、Vault（此前指定Vault路径缺失仍需核实真实状态），运行全量npm test/launch-check/governance与正式独立Auditor。此包只可集成，不是独审PASS、发布许可或维护窗口关闭。没有commit/push/deploy/外部账户/真人联系/API调用。
