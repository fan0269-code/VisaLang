# W03 候选只读复核记录

检查者：独立子代理 `/root/candidate_review`；本文件由实施者转录子代理返回意见，不是 W18 正式独审报告，不出具 PASS。

子代理对照 W00 baseline/candidate.patch 及最终源码/测试复核，未发现确定 P0/P1/P2。中文 C07 在基线已经存在，链接准确；1 configured/4 verify-only 及 B1 内容边界一致。HomeHero 两个调用点已更新。菜单高度最终复用既有 --header-height。Task4 明确关联标签/href，并断言中文证书页面的 noindex/无广告。

建议的外部点击、桌面互斥与焦点遮挡实际浏览器检查已补充（navigation-extra.json），子代理只读取结果，没有独立执行。BaseLayout 已有桌面互斥监听，新 GlobalHeader 对全部菜单的监听重复部分为幂等；W00集成共享布局时留意。MobileNavigation 原有分组无标题作为非阻塞建议保留。

真实设备、多浏览器与读者理解未知；W00集成、统一治理与W18正式独审依然必须执行。
