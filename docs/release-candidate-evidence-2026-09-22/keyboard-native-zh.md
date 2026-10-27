# Chinese native keyboard acceptance — 2026-09-22

Surface: macOS Codex in-app browser, isolated tab, static candidate at `http://127.0.0.1:4323/zh/tools/route-finder/`. CUA accessibility state observed directly. No real user/device population study claimed.

After initial focus on the country control, all choices and submit used keyboard events. `Space` opened each native select; `ArrowDown` and `Return` chose the next item; `Tab` advanced. Selected Germany → family reunion → German mission responsible for the application in China → spouse reunion → no certificate. Tab/Return submitted. Accessibility state showed focused result container, “状态：可提供核验指引”, “德国家庭团聚：A1 核验路线”, and all five selected values in the result summary, followed by authority boundaries. Result: **PASS for this browser on this machine**.

An earlier headless Chrome `Space/ArrowDown/Enter` attempt retained the previous purpose. That automation result remains `automation-inconclusive` in browser-results.json; the later native observation does not rewrite it. No screenshot of this native sequence was saved; this receipt is a contemporaneous tool-observation record. Other browsers and physical mobile devices remain untested.
