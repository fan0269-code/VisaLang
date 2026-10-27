# T28 findings and disposition

| ID | Severity | Reproduction / impact | Root cause | Disposition |
| --- | --- | --- | --- | --- |
| T28-01 | P2 | Generate Finder, Comparison or Checklist, clear required field, submit: validation error but old result remains visible (six EN/ZH cases) | Shared setupToolForm did not invalidate the result when fields changed or validation failed | Fixed in src/scripts/tool-form.ts. Real-browser red exit 1 → green exit 0; all six hide/focus/recovery assertions pass. |
| QA-01 | Test harness | First home-route locator selected hidden header menu link | Unscoped first match | Runner now uses visible links. Initial failed record preserved; not a product defect. |
| QA-02 | Environment/coverage | Arrow-key native select automation left placeholders unchanged | macOS headless native dropdown selection not exercised successfully with this sequence | English character-selection keyboard flow passes. Chinese full native-dropdown keyboard flow not_tested; retain as T28 follow-up, do not label all accessibility passed. |

No unresolved confirmed P0/P1/P2 product defect remains in the tested scope. No larger repair is justified by current evidence; T29 should take any subsequently confirmed browser/device defects and run targeted regression. No speculative broad refactor. T28 remains in_progress because technical and human/device coverage is partial.
