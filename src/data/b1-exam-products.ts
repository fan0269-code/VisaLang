import type { Claim, ClaimSourceRef, ExamProduct, ExamProductFact } from './claim-registry.ts';

const checkedAt = '2026-09-13';
const version = '2026-09-13.1';
const nextReviewAt = '2026-12-13';
const boundary = 'Adult B1 product facts only; no local fee, date, seat, result-delivery promise, receiving-authority acceptance or individual outcome.';
const source = (publisher: string, url: string, locator: string, supports: string): ClaimSourceRef => ({ publisher, url, locator, supports, boundary });
const goetheTerms = source('Goethe-Institut', 'https://www.goethe.de/pro/relaunch/prf/en/Durchfuehrungsbestimmungen_B1.pdf', '2025-09-01 B1 administration terms, sections 1.1–1.4 and 6.1–6.3.', 'Adult B1 written modules and timing, paired/exceptional individual speaking and preparation time, and each module’s pass threshold.');
const goetheRules = source('Goethe-Institut', 'https://www.goethe.de/pro/relaunch/prf/en/Pruefungsordnung.pdf', '2025-09-01 Exam Guidelines, sections 14.7.1–14.7.7 and 15.', 'B1 module resits and module certificates; same-venue/session overall certificate and separate conditions for later consolidation. No entitlement to a particular resit date.');
const telcProduct = source('telc gGmbH', 'https://www.telc.net/sprachpruefungen/deutsch/zertifikat-deutsch-telc-deutsch-b1/', 'Aufbau und Ablauf der Prüfung: exact Zertifikat Deutsch / telc Deutsch B1 table.', 'Adult general-language B1 written/oral structure and timing, usual paired oral format and preparation time. Not DTZ, B1 Schule, A2·B1, B1+ or a vocational test.');
const telcMock = source('telc gGmbH', 'https://shop.telc.net/media/catalog/product/file/2/0/20201225_5061-b00-010301_web.pdf', 'Zertifikat Deutsch Übungstest 1, 14th edition 2021, 5061-B00-010301, printed pages 39–40: points and certificate threshold.', '225 written and 75 oral maximum points, with 135 written AND 45 oral required. Scoring only: the old mock’s resit deadline is superseded by current regulations.');
const telcRules = source('telc gGmbH', 'https://www.telc.net/fileadmin/user_upload/pdfs/AGB_Pruefungsordnung/10000311_9994-P00-150011.pdf', 'Rules valid from 2025-04-15, Examination Regulations section 7.1–7.3 and Appendix 1, pages 15–16.', 'Pass certificate versus unsuccessful result sheet; written/oral partial resit within 12 months of first results sheet, latest result credit, registration notification, no individual-subtest retake; single-level B1 is eligible for partial credit.');
const fact = (id: ExamProductFact['id'], label: string, labelZh: string, value: string, valueZh: string, factSource: ClaimSourceRef): ExamProductFact => ({ id, label, labelZh, value, valueZh, status: 'verified', sourceCheckedAt: checkedAt, source: factSource });

export const b1ExamProducts: readonly ExamProduct[] = [
  {
    id: 'goethe-zertifikat-b1', version, name: 'Goethe-Zertifikat B1', level: 'B1', examOwner: 'Goethe-Institut',
    scope: 'Adult Goethe B1 product comparison only; this does not configure a B1 immigration route or establish certificate acceptance.',
    sourceCheckedAt: checkedAt, effectiveFrom: null, effectiveTo: null, status: 'verified', reviewedBy: 'source-review',
    officialUrl: 'https://www.goethe.de/ins/de/en/prf/prf/gzb1/inf.html',
    officialPracticeUrl: 'https://www.goethe.de/ins/de/en/prf/prf/gzb1/ueb.html',
    comparisonFacts: [
      fact('written-structure-and-duration', 'Written structure and duration', '笔试结构与时长', 'Reading 65 minutes, Listening about 40 minutes and Writing 60 minutes: about 165 minutes excluding breaks, in three written modules.', '阅读 65 分钟、听力约 40 分钟、写作 60 分钟：三个笔试模块合计约 165 分钟，不含休息。', goetheTerms),
      fact('oral-format-and-duration', 'Oral format and duration', '口试结构与时长', 'Speaking normally takes about 15 minutes in pairs; an exceptional individual exam takes about 10 minutes. Both have 15 minutes of preparation.', '口试通常为双人考试，约 15 分钟；特殊情况下的单人口试约 10 分钟。两种形式均有 15 分钟准备时间。', goetheTerms),
      fact('score-rule', 'Score rule', '分数规则', 'At least 60 of 100 points are required in each module. The four modules are assessed separately.', '每个模块须达到至少 60/100 分；四个模块分别评定。', goetheTerms),
      fact('whole-or-partial-sitting', 'Modules, resits and certificate output', '模块、重考与证书输出', 'Individual modules may be repeated; the centre sets resit arrangements. Passed modules receive module certificates. Passing all four at one venue in one session also gives the right to an overall certificate. Later module certificates can be combined; a later consolidated certificate has additional centre and timing conditions in section 14.7.', '可以重考单个模块，具体重考安排由考点确认。通过的模块有模块证书；在同一考点同一场次通过全部四个模块，也有权获得总证书。后续模块证书可与已有模块证书组合使用；后续合并出具总证书另受第 14.7 条的考点和时间条件约束。', goetheRules),
    ],
    localExecutionBoundary: 'The selected official or authorised local centre confirms available modules, current delivery, registration, dates, fees, identity checks, cancellation, results and certificate delivery.',
    productClaim: { claimId: 'goethe-zertifikat-b1-format-score-modules-certificate', version },
    certificateClaim: { claimId: 'goethe-zertifikat-b1-format-score-modules-certificate', version },
    usedBy: ['guide:goethe-b1-vs-telc-b1', 'guide:goethe-b1-fees-and-booking', 'tool:exam-comparison'],
    localFee: { responsibleParty: 'Selected official or authorised test centre', amount: null, currency: null, status: 'needs_authority_confirmation', confirmationAction: 'Confirm the exact adult B1 modules, date, fee currency, payment, cancellation, results and certificate terms with the selected centre before paying.', boundary },
    acceptance: { responsibleParty: 'Competent receiving authority for the exact application', status: 'needs_authority_confirmation', confirmationAction: 'Ask which exact B1 product and full or modular certificate documents the receiving authority accepts for your application.', boundary },
  },
  {
    id: 'telc-zertifikat-deutsch-b1', version, name: 'Zertifikat Deutsch / telc Deutsch B1', level: 'B1', examOwner: 'telc gGmbH',
    scope: 'Adult general-language telc B1 product comparison only; excludes DTZ, scaled A2·B1, B1 Schule, B1+ and vocational tests. No B1 immigration-route or acceptance decision.',
    sourceCheckedAt: checkedAt, effectiveFrom: null, effectiveTo: null, status: 'verified', reviewedBy: 'source-review',
    officialUrl: telcProduct.url, officialPracticeUrl: telcMock.url,
    comparisonFacts: [
      fact('written-structure-and-duration', 'Written structure and duration', '笔试结构与时长', 'Reading and Language Elements share 90 minutes, Listening takes about 30 minutes and Writing 30 minutes, in one written examination.', '笔试中阅读与语言要素共用 90 分钟，听力约 30 分钟，写作 30 分钟，合为笔试部分。', telcProduct),
      fact('oral-format-and-duration', 'Oral format and duration', '口试结构与时长', 'The three-part speaking examination takes about 15 minutes, usually with two participants, after 20 minutes of preparation.', '口试有三个部分，约 15 分钟，通常为两名考生共同参加，另有 20 分钟准备时间。', telcProduct),
      fact('score-rule', 'Score rule', '分数规则', 'At least 135 of 225 written points AND 45 of 75 oral points are required: 60% in each examination part. A combined total alone does not establish a pass.', '笔试须至少达到 135/225 分，且口试须至少达到 45/75 分，即两个部分分别达到 60%；只看合计分数不能判断通过。', telcMock),
      fact('whole-or-partial-sitting', 'Modules, resits and certificate output', '模块、重考与证书输出', 'If one part is not passed, the written or oral part may be retaken within 12 months of the first results sheet; request partial credit at registration. Only the latest result is credited; individual subtests cannot be retaken. Passing produces a certificate; an unsuccessful exam produces a results sheet. Confirm local dates and fees with the centre.', '若有部分未通过，可在首次成绩单日期起 12 个月内重考笔试或口试部分，并在报名时申请保留已通过部分的成绩。只计入最近一次成绩，不能单独重考子测试。通过考试获得证书，未通过则获得成绩单；当地日期与费用须向考点确认。', telcRules),
    ],
    localExecutionBoundary: 'The selected official or authorised local centre confirms the exact adult B1 product, current delivery, partial-credit registration, dates, fees, identity checks, cancellation, results and certificate delivery.',
    productClaim: { claimId: 'telc-zertifikat-deutsch-b1-format-score-partial-certificate', version },
    certificateClaim: { claimId: 'telc-zertifikat-deutsch-b1-format-score-partial-certificate', version },
    usedBy: ['guide:goethe-b1-vs-telc-b1', 'tool:exam-comparison'],
    localFee: { responsibleParty: 'Selected official or authorised test centre', amount: null, currency: null, status: 'needs_authority_confirmation', confirmationAction: 'Confirm the exact adult telc B1 product, partial-credit conditions, date, fee currency, payment, cancellation, results and certificate terms with the selected centre before paying.', boundary },
    acceptance: { responsibleParty: 'Competent receiving authority for the exact application', status: 'needs_authority_confirmation', confirmationAction: 'Ask whether the exact Zertifikat Deutsch / telc Deutsch B1 certificate and document form are accepted for your application.', boundary },
  },
];

export const b1ExamClaims: readonly Claim[] = b1ExamProducts.map((product) => ({
  claimId: product.productClaim.claimId, version,
  claimText: `${product.examOwner} defines the exact adult ${product.name} structure, timing, score and repeat/certificate rules; local execution and receiving-authority acceptance remain separate.`,
  route: `${product.name} product comparison`, jurisdiction: `${product.examOwner} examination product only`, examProduct: product.name,
  scope: { locale: 'multi-lingual', jurisdiction: `${product.examOwner} examination product only`, route: `${product.name} product comparison`, audience: 'Adults comparing the exact B1 products, without treating the product rules as an immigration or individual acceptance decision.' },
  conditions: ['Confirm the exact adult product. The selected centre controls local execution; the receiving authority controls acceptance.'], exceptions: [], boundary,
  sourceRefs: [...new Map(product.comparisonFacts.map((f) => [f.source.url, f.source])).values()],
  sourceCheckedAt: checkedAt, effectiveFrom: null, effectiveTo: null, nextReviewAt,
  status: 'verified', reviewedBy: 'source-review', usedBy: [`exam-product:${product.id}`, ...product.usedBy],
}));
