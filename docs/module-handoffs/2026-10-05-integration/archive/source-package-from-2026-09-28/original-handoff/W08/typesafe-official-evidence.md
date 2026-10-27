# TypeSafe official documentation check

Checked 2026-09-25. Project references: `.agents/skills/typesafe-ai/SKILL.md` and `docs/superpowers/plans/2026-09-24-typesafe-project-adoption.md` §10.

| Official source | Supports | Boundary |
|---|---|---|
| [Documentation index](https://docs.typesafe.ai/llms.txt) | Current official API and Choice documentation locations. | Not local execution, price, quota, privacy or quality evidence. |
| [HTTP API](https://docs.typesafe.ai/api) | `POST /v1/systemone`, Bearer key, state/model/questions request shape, typed Choice results, usage token fields and 401/422/429/529 errors. | Token usage does not state VisaLang pricing/account quota. No call was made. |
| [Choice](https://docs.typesafe.ai/primitives/choice) | Fixed-option selection, answer probabilities/confidence and advice to include an `other`/none outcome. | Confidence is not this project's measured accuracy or permission. |
| [Privacy policy](https://typesafe.ai/legal/privacy-policy) | US hosting; policy says inputs are not used to train/fine-tune models and personal data may be retained as reasonably necessary for services/business. | Does not verify account processing settings, contract/DPA applicability, specific retention/deletion, VisaLang legal compliance or quality. |

W08 preserves the server-side key boundary and pre-send disclosure. Price, account quota/settings, real-user input, accuracy, actual cost and production latency remain unverified; TypeSafe release gates therefore require separate privacy/processing and price/quota receipts. No credentials were read and no API request was made.
