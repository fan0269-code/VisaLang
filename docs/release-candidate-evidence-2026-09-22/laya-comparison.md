# 冻结样例与真实 Laya 结果

先写入 `laya-expected.json`，再由 `probe.py` 调用本地真实服务；输入均为合成测试文本，不是访客数据。期望文件 SHA-256：`74012ccf073964146d2067e18531310d0f43f7677ce36d27eb377b556d0aa6ed`。

**11/20（55%）匹配期望：中文 6/10，英文 5/10。这个小型固定集不能代表线上准确率。**

| 类别 | 正确/总数 |
|---|---|
| normal | 8/10 |
| negation | 2/4 |
| ambiguous | 0/4 |
| boundary | 1/2 |

| ID | 输入 | 预期 | 实际 | 失败原因/结果 |
|---|---|---|---|---|
| 1 | 我准备去德国与丈夫长期团聚。 | family-reunion | b1 | 明确家庭团聚意图被错分为 B1 路线 |
| 2 | 我在德国生活多年，现在准备申请入籍。 | b1 | b1 | 符合期望 |
| 3 | 我想申请德国烘焙师的双元制职业培训。 | ausbildung | ausbildung | 符合期望 |
| 4 | 我已经是护士，想在德国办理护理资格认可。 | nursing | nursing | 符合期望 |
| 5 | 我准备申请德国大学的计算机硕士。 | university | university | 符合期望 |
| 6 | 我只是去德国旅游，不申请大学也不办团聚。 | other | family-reunion | 未识别否定范围，输出被否定用途 |
| 7 | 不是去和家人团聚，我这次只申请大学。 | university | university | 符合期望 |
| 8 | 我想去德国发展，还没确定做什么。 | 需要澄清 | b1 | 信息不足或多个意图，仍强行给出单一建议 |
| 9 | 团聚和读大学我都在考虑，暂时没决定。 | 需要澄清 | university | 信息不足或多个意图，仍强行给出单一建议 |
| 10 | B1 | 需要澄清 | needs_clarification | 符合期望 |
| 11 | I want to join my spouse in Germany permanently. | family-reunion | b1 | 明确家庭团聚意图被错分为 B1 路线 |
| 12 | I am preparing a German citizenship application. | b1 | b1 | 符合期望 |
| 13 | I want to apply for a German vocational apprenticeship. | ausbildung | ausbildung | 符合期望 |
| 14 | I am a qualified nurse seeking professional recognition in Germany. | nursing | nursing | 符合期望 |
| 15 | I want to apply for a masters degree at a German university. | university | university | 符合期望 |
| 16 | I am visiting Germany for a holiday, not applying for study or family reunion. | other | family-reunion | 未识别否定范围，输出被否定用途 |
| 17 | I am not joining family; my current goal is university admission. | university | university | 符合期望 |
| 18 | I want to move abroad but have not chosen what to do. | 需要澄清 | b1 | 信息不足或多个意图，仍强行给出单一建议 |
| 19 | I am undecided between joining my spouse and starting a degree. | 需要澄清 | family-reunion | 信息不足或多个意图，仍强行给出单一建议 |
| 20 | B1 exam score | 需要澄清 | university | 信息不足或多个意图，仍强行给出单一建议 |

所有建议仍要求用户确认，且不替代确定性规则。当前结果不足以批准公开上线；应先修复标签设计或更换模型，并用独立保留集复验，不能只硬编码这 20 条通过。

本机 macOS CPU：20 次 HTTP 200，单次约 0.071–0.130 秒，进程峰值 RSS **4,140,924,928 字节**。这不是 Linux 容量结果，但说明不能假设 4 GB 整机或 3 GB 容器预算足够。目标机冷启动、并发拒绝、长时间运行、重启和网站同时访问均待测。

本轮验证正式服务调用链，未将本地 HTTP 结果冒充 MCP 工具结果；此前 MCP 实验的错误记录仍保留。
