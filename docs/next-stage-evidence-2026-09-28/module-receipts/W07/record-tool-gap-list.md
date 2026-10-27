# P04 scoped gap list

| Gap/requirement | Candidate response | Evidence status |
|---|---|---|
| 390 CSS px Checklist heading obscured by sticky header | Result panel gets header-aware scroll margin; T28 now measures title/header rectangles, focus and scrollY and asserts no overlap | Baseline CUA screenshot showed partial title occlusion; geometry test not executable here (`playwright` missing) |
| Reader-facing results mixed with technical evidence | Route and checklist order boundary/next steps/verification before collapsible versioned evidence | Build + route/checklist source contracts passed; browser reading test not run |
| Plan panel too tall | One-line session/device save summary; detailed reset/privacy rules in adjacent disclosure | M2-A contract passed; visual viewport check outstanding |
| Actions/focus/long tables | explicit copy/print/export controls, selectable fallback, focus scroll margin, horizontal table scroll; no evidence `overflow:hidden` | source contracts + build passed; UI action/print/download not browser-verified |
| Checklist has three categories and confirmed-vs-assumption distinction | Existing requirement, exam-choice/booking/certificate, and submission-review stages retained; Timeline labels W/P/R as confirmed local inputs or user assumptions | Existing data read-only; no data/fact changes |
