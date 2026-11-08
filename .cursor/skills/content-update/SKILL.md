---
name: visalang-content-update
description: Update VisaLang guides and route pages without inventing official facts. Use when editing Markdown guides, hub copy, Chinese pages, source-review dates, or the content update log.
---

# VisaLang content updates

VisaLang points readers to the authority that decides. It does not decide for them.

## Before writing

1. Name the user task and the authority for each claim.
2. Use this order: competent immigration or mission authority, then the official exam owner, then the selected authorised centre.
3. If the current fee, date, seat, exemption, acceptance, or outcome is not in a source you opened, tell the reader which official page to check. Do not fill the gap.
4. Prefer a deeper Germany A1 or B1 page over a new country page.

## While editing

- Keep guide front matter complete: `slug`, `publishedDate`, `updatedDate`, `readingTime`. Slugs match filenames. `related` slugs must exist.
- Change `sourceReviewedAt` only after the source was actually opened. Record the URL, the date, what the source can support, and what it cannot support.
- Do not copy portal fees, processing times, or seat counts into a guide.
- Write Chinese for a Chinese reader. Do not translate English sentence by sentence. Mark English-only hubs in the Chinese UI.
- One guide, one task. Do not merge family reunion with settlement or citizenship.
- Say that language proof and civic-knowledge evidence are different questions when both appear.

## After editing

- Add a dated note to `src/pages/content-update-log.astro` and `docs/TASK_LOG.md`.
- Update the smallest assertion in `tests/` that covers the changed route or sentence.
- Do not mark a page approved, published, or ad-eligible because the copy changed.
- Leave `advertisingRuntimeEnabled` false unless the owner explicitly turns the runtime on.
