# W04 本地浏览器走查记录

环境：W04 快照构建产物由本机静态预览服务提供（127.0.0.1:4342）；页面不是生产站。使用实际 Chrome UI 完成页面交互。

- 390 × 844 CSS 像素响应式视口：依次查看 `/guides/goethe-a1-germany-family-reunion/`、`/zh/guides/goethe-a1-germany-family-reunion/`、`/guides/german-family-reunion-language-requirement/`、`/zh/guides/german-family-reunion-language-requirement/`。四页的复制按钮均出现页面自己的 `Copied.` / `已复制。` 提示。
- 桌面视口（Chrome 窗口 1352 × 768，关闭设备模拟工具栏）：在同四页点击复制按钮，四次均出现页面自己的 `Copied.` / `已复制。` 提示。
- 390px 视觉核对：中文主管机关问询卡页首先呈现直答与主管机关入口，责任/审查元信息收在默认折叠项内；问询卡字段可在后文横向表格中读取。中文证书页提供可保存核验卡。
- 英文证书页打开责任/审查说明时，状态继续显示 `Verification pending`；页面同时保留受理机关接受规则必须个案核对的边界。
- 来源证据：见 `authority-source-ledger.md`。UI 截图在本轮 CUA 观察中实际查看，但工具未将图像字节写入此模块目录；没有将截图称为真人测试或生产证据。
- 未执行打印对话框；复制路径已在移动与桌面尺寸真实点击验证。未进行真人读者测试、生产环境验证或个案接受核验。
