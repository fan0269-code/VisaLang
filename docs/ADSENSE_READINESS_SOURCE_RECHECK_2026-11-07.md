# Germany A1/B1 source recheck — 2026-11-07

Scope: six existing Germany A1/B1 guides, trust-page disclosure, and the advertising runtime gate. No new country pages. No AdSense application. No deployment.

The production host `https://visalang.org` was already recorded as Cloudflare HTTP 521. This recheck does not change hosting.

## Claim ledger

Checked means the URL was opened from this environment on 2026-11-07 and the stated sentence is limited to what that text supports. A blocked fetch is recorded as blocked. It is not treated as a content change on the remote site.

| Guide | Claim kept or changed | Source | Checked | What the source supports | Boundary |
| --- | --- | --- | --- | --- | --- |
| `german-a1-family-reunion-faq` | Kept “basic German”, and pointed exceptions back to the statute and mission | https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682 | 2026-11-07, HTTP 200 | Foreign spouses have to prove at least a basic knowledge of German. Detail is referred to BAMF. Further information is requested from the German mission in the relevant country. | Does not list accepted certificates, fees, or an individual exception. |
| same | Added the simple-German condition and the existence of statutory situations where it does not apply. Did not copy the exception catalogue into a decision. | https://www.gesetze-im-internet.de/aufenthg_2004/__30.html | 2026-11-07 | Section 30(1) sentence 1 no. 2 requires simple German communication for many spouse permits. Later sentences list situations where that condition does not apply. | The mission or foreigners authority applies a situation to a file. |
| `german-a1-exam-booking-timeline` | Kept unknown dates unknown. No result-day number added. | Same Foreign Office FAQ and Residence Act section 30 | 2026-11-07 | Neither text publishes a universal result or certificate turnaround. | Centre and mission dates stay local. |
| `germany-b1-settlement-citizenship-checklist` | Restated separate language and civic-knowledge conditions. Did not copy residence years, pension months, or fees. | https://www.gesetze-im-internet.de/aufenthg_2004/__9.html and https://www.gesetze-im-internet.de/stag/__10.html | 2026-11-07 | Section 9(2) nos. 7 and 8 are separate. Section 10(1) nos. 6 and 7 are separate. Section 10(4) treats CEFR B1 as one way to meet the language condition, with further exceptions. Section 10(5) says civic knowledge is as a rule shown by a successful naturalisation test. | Other subsections and hardship rules exist. This page does not calculate eligibility. |
| `germany-b1-leben-in-deutschland-and-language-proof` | Kept DTZ and Leben in Deutschland separate. Cited the ordinance route for civic knowledge. | https://www.gesetze-im-internet.de/intv/__17.html | 2026-11-07 | Section 17(1) splits DTZ (A2–B1, four skills) from Leben in Deutschland. Section 17(5) says the scaled Leben in Deutschland test can also demonstrate Nationality Act section 10(1) sentence 1 no. 7 knowledge under the naturalisation-test ordinance. | A language result is not civic-knowledge proof. An individual file remains with the authority. |
| same | Portal orientation only. Fee, question count, pass mark, and processing time were not copied. | https://www.einbuergerung.de/ablauf.php?l=en | 2026-11-07, HTTP 200 | The portal says B1 can be shown with listed document types, that the naturalisation test is the usual civic-knowledge proof, and that the Life in Germany test is also considered proof. It also publishes its own fee and timing figures. | Those figures stay on the portal. The nationality authority decides the file. |
| `goethe-b1-vs-telc-b1` | telc product description kept and dated. Goethe module rule withdrawn. | https://www.telc.net/en/language-examinations/certificate-exams/german/certificate-german-telc-german-b1/ | 2026-11-07, HTTP 200 | telc describes Zertifikat Deutsch / telc Deutsch B1 as the general German examination at CEFR B1, with a written examination and an oral examination. | Acceptance is still the receiving authority’s decision. No fee was copied. |
| same | Goethe product URL updated to the redirect target. Module rule not restated. | https://www.goethe.de/ins/de/en/prf/gzb1.cfm | 2026-11-07 | HEAD followed `https://www.goethe.de/ins/de/en/prf/prf/gzb1.html` and `.../gzb1/inf.html` to this URL with HTTP 200. GET of the body returned 403, and a second fetch returned 500. | The page no longer states that Goethe permits modules together or separately. Readers open the current Goethe page. |
| `germany-b1-settlement-citizenship-timeline` | Still refuses residence, eligibility, and processing calculations. | Section 9, section 10, and the naturalisation portal above | 2026-11-07 | The statutes contain duration and evidence conditions. The portal publishes its own timing figures. | No duration or fee number was added to the guide. |

## Sources that did not open here

These URLs stay in the guides because they are the existing official entry points. This environment received HTTP 400 from the host’s request filter, so their body was not re-read on 2026-11-07:

- BAMF family and integration pages, including `https://www.bamf.de/EN/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/Abschlusspruefung/abschlusspruefung-node.html`
- BAMF spouse leaflet PDF `ehegattennachzug-en.pdf`
- BAMF-NAvI `https://bamf-navi.bamf.de/en/Themen/Behoerden/?typ=ABH`

Where a page depended on BAMF-NAvI, the recheck adds the naturalisation portal’s instruction to ask the town, district, or foreigners authority if the locator does not open.

## Advertising and disclosure

- `site.advertisingRuntimeEnabled` is `false`. `BaseLayout` loads the existing publisher script only when a page opts in and that gate is true.
- No new publisher ID was added. `public/ads.txt` keeps the existing seller line and states that the file is not proof of approval or that ads are being served.
- Privacy and cookie copy no longer say that AdSense, Auto ads, or a Google consent message are active.

## Not done

- No AdSense application, account change, or deployment.
- No independent auditor `PASS`. The implementing change is not a self-approval.
- The Obsidian review-record path on the owner’s machine was not available in this environment.
