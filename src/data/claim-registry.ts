import { b1RouteClaims } from './b1-route-claims.ts';
import { b1ExamClaims, b1ExamProducts } from './b1-exam-products.ts';

export const claimLifecycleStatuses = ['draft', 'verified', 'needs_review', 'withdrawn'] as const;
export type ClaimLifecycleStatus = typeof claimLifecycleStatuses[number];

export const routeResolutionStatuses = ['guidance_available', 'needs_information', 'needs_authority_confirmation', 'unsupported'] as const;
export type RouteResolutionStatus = typeof routeResolutionStatuses[number];

export interface ClaimSourceRef {
  publisher: string;
  url: string;
  locator: string;
  supports: string;
  boundary: string;
}

export interface ClaimScope {
  locale: 'en' | 'zh-CN' | 'multi-lingual';
  jurisdiction: string;
  route: string;
  audience: string;
}

export interface Claim {
  claimId: string;
  version: string;
  claimText: string;
  route: string;
  jurisdiction: string;
  examProduct: string | null;
  scope: ClaimScope;
  conditions: readonly string[];
  exceptions: readonly string[];
  boundary: string;
  sourceRefs: readonly ClaimSourceRef[];
  sourceCheckedAt: string;
  effectiveFrom: string | null;
  effectiveTo: string | null;
  nextReviewAt: string | null;
  status: ClaimLifecycleStatus;
  reviewedBy: 'source-review';
  usedBy: readonly string[];
}

export interface ClaimVersionRef {
  claimId: string;
  version: string;
}

export interface ClaimSetValidation {
  valid: boolean;
  reason?: 'missing_refs' | 'missing_consumer' | 'invalid_as_of' | 'missing_or_conflicting_claim' | 'not_current_verified';
}

export type ClaimConsumerLocale = ClaimScope['locale'];

export interface ClaimValidationOptions {
  claims?: readonly Claim[];
  asOf?: string;
  consumerId?: string;
  consumerLocale?: ClaimConsumerLocale;
}

export interface LocalFee {
  responsibleParty: string;
  amount: number | null;
  currency: string | null;
  status: 'verified' | 'needs_authority_confirmation';
  confirmationAction: string;
  boundary: string;
}

export interface ExamAcceptanceBoundary {
  responsibleParty: string;
  status: 'needs_authority_confirmation';
  confirmationAction: string;
  boundary: string;
}

export type ExamProductFactId =
  | 'written-structure-and-duration'
  | 'oral-format-and-duration'
  | 'score-rule'
  | 'whole-or-partial-sitting';

export interface ExamProductFact {
  id: ExamProductFactId;
  label: string;
  labelZh: string;
  value: string;
  valueZh: string;
  status: 'verified';
  sourceCheckedAt: string;
  source: ClaimSourceRef;
}

export interface ExamProduct {
  id: string;
  version: string;
  name: string;
  level: string;
  examOwner: string;
  scope: string;
  sourceCheckedAt: string;
  effectiveFrom: string | null;
  effectiveTo: string | null;
  status: ClaimLifecycleStatus;
  reviewedBy: 'source-review';
  officialUrl: string;
  officialPracticeUrl: string;
  comparisonFacts: readonly ExamProductFact[];
  localExecutionBoundary: string;
  productClaim: ClaimVersionRef;
  certificateClaim: ClaimVersionRef;
  usedBy: readonly string[];
  localFee: LocalFee;
  acceptance: ExamAcceptanceBoundary;
}

export interface LocalExamFeeSourceRef {
  owner: string;
  url: string;
  locator: string;
  supports: string;
  boundary: string;
}

export interface LocalExamFeeRecord {
  id: string;
  version: string;
  examProductId: string;
  scopeId: 'goethe-germany' | 'goethe-beijing';
  scopeType: 'country-network-price-list' | 'named-institute';
  countryCode: 'DE' | 'CN';
  city: string | null;
  priceScopeLabel: string;
  candidateCategory: {
    id: 'regular-adult' | 'course-participant' | 'current-learner' | 'non-current-learner';
    label: string;
    eligibilityBoundary: string;
  };
  amount: number;
  currency: 'EUR' | 'CNY';
  unit: 'exam-registration';
  priceYear: 2026;
  sourceCheckedAt: string;
  effectiveFrom: null;
  effectiveTo: null;
  nextReviewAt: string;
  status: 'verified';
  source: LocalExamFeeSourceRef;
  amountDerivation: string | null;
  boundary: string;
  confirmationAction: string;
  claimRef: ClaimVersionRef;
}

export interface ExamCentreRoute {
  id: 'goethe-germany' | 'goethe-beijing';
  examProductId: string;
  scopeType: 'country-network-price-list' | 'named-institute';
  countryCode: 'DE' | 'CN';
  city: string | null;
  label: string;
  officialUrl: string;
  sourceCheckedAt: string;
  verificationAction: string;
  boundary: string;
}

export type LocalFeeScheduleResult =
  | {
    status: 'verified';
    scopeId: string;
    records: readonly LocalExamFeeRecord[];
    conversionApplied: false;
    boundary: string;
  }
  | {
    status: 'needs_authority_confirmation';
    records: [];
    amount: null;
    conversionApplied: false;
    confirmationAction: string;
  };

export interface RouteRule {
  ruleId: string;
  version: string;
  consumerId: string;
  consumerLocale: ClaimConsumerLocale;
  priority: 'P0' | 'P1' | 'P2';
  routeId: string;
  inputConditions: readonly RouteRuleInputCondition[];
  claimRefs: readonly ClaimVersionRef[];
  intendedResultStatus: 'guidance_available';
  explanation: string;
  outstandingItems: readonly string[];
  confirmationItems: readonly string[];
  nextActionId: string;
  boundary: string;
}

export interface RouteRuleInputCondition {
  id: 'applicationLocation';
  required: true;
  description: string;
}

export interface RouteResolutionInput {
  routeId?: string;
  applicationLocation?: string;
  claimVersions?: Readonly<Record<string, string>>;
}

export interface RouteResolution {
  status: RouteResolutionStatus;
  ruleId?: string;
  guidance?: string;
  nextActionId?: string;
  nextAction: string;
}

const checkedAt = '2026-09-08';
const nextReviewAt = '2026-12-08';
const productCheckedAt = '2026-09-09';
const productNextReviewAt = '2026-12-09';
const feeSourceCheckedAt = '2026-10-06';
const feeNextReviewAt = '2026-11-06';

/** The evaluation date for a build or render, distinct from the source-check date. */
export const currentClaimAsOf = () => new Date().toISOString().slice(0, 10);

export const claimRegistry: readonly Claim[] = [
  ...b1RouteClaims,
  ...b1ExamClaims,
  {
    claimId: 'germany-family-reunion-a1-general-starting-rule',
    version: '2026-09-08.1',
    claimText: 'The Federal Foreign Office gives a general basic-German starting point for the described foreign-spouse visa question and directs readers to the competent German mission for route details.',
    route: 'Germany foreign-spouse visa orientation',
    jurisdiction: 'general English orientation only',
    examProduct: null,
    scope: {
      locale: 'en',
      jurisdiction: 'general English orientation only',
      route: 'Germany foreign-spouse visa orientation',
      audience: 'Readers identifying a mission-verification question before choosing an exam product.',
    },
    conditions: ['The reader must identify the competent German mission for their ordinary residence and application context.'],
    exceptions: [],
    boundary: 'This does not establish every family-reunion category, an exception, certificate acceptance, document sufficiency, or an individual visa outcome.',
    sourceRefs: [{
      publisher: 'German Federal Foreign Office',
      url: 'https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682',
      locator: 'Does my foreign spouse have to provide proof of German language skills when applying for a visa?',
      supports: 'A general basic-German starting point and referral to the competent German mission for details.',
      boundary: 'Not proof of every family-reunion category, exception, accepted certificate, or individual result.',
    }],
    sourceCheckedAt: checkedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt,
    status: 'verified',
    reviewedBy: 'source-review',
    usedBy: ['route-rule:germany-family-reunion-a1-authority-guidance', 'guide:german-family-reunion-language-requirement'],
  },
  {
    claimId: 'germany-family-reunion-a1-authority-split',
    version: '2026-09-08.1',
    claimText: 'For the described German-spouse long-stay scenario, the competent German mission abroad receives the application and the destination foreigners authority participates; neither an exam owner nor a test centre decides application acceptance.',
    route: 'Germany spouse or family-reunion application authority verification',
    jurisdiction: 'described German-spouse long-stay scenario only',
    examProduct: null,
    scope: {
      locale: 'en',
      jurisdiction: 'described German-spouse long-stay scenario only',
      route: 'Germany spouse or family-reunion application authority verification',
      audience: 'Readers separating application-proof questions from exam and local-centre administration.',
    },
    conditions: ['The applicant must use the mission competent for their ordinary residence and follow route-specific instructions.'],
    exceptions: [],
    boundary: 'This does not expand to every sponsor, family route, mission, local procedure, accepted certificate, exception, or individual outcome.',
    sourceRefs: [
      {
        publisher: 'German Federal Foreign Office',
        url: 'https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/04-dtehepartner/606680',
        locator: 'I want to marry in Germany and live there with my spouse.',
        supports: 'Application through the competent mission abroad and the destination foreigners authority role in the long-stay decision.',
        boundary: 'Specific to the described scenario; it does not determine every family route or an individual result.',
      },
      {
        publisher: 'German Federal Foreign Office',
        url: 'https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/25-wobeantragen/606738',
        locator: 'Where do I have to apply for my visa?',
        supports: 'Competent mission is tied to ordinary residence and the usual foreigners-authority role for long stays.',
        boundary: 'Residence facts are required to identify a particular mission; this is not an eligibility decision.',
      },
    ],
    sourceCheckedAt: checkedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt,
    status: 'verified',
    reviewedBy: 'source-review',
    usedBy: ['route-rule:germany-family-reunion-a1-authority-guidance', 'guide:german-family-reunion-language-requirement', 'guide:goethe-a1-germany-family-reunion'],
  },
  {
    claimId: 'germany-family-reunion-a1-china-mission-context',
    version: '2026-09-08.1',
    claimText: 'The German missions in China publish China-facing basic-German guidance and direct applicants to current mission instructions for their application context.',
    route: 'Germany family reunion or marriage settlement in the China mission context',
    jurisdiction: 'China application locations only',
    examProduct: null,
    scope: {
      locale: 'zh-CN',
      jurisdiction: 'China application locations only',
      route: 'Germany family reunion or marriage settlement in the China mission context',
      audience: 'Readers whose actual application location is within the China mission context.',
    },
    conditions: ['The application location must be within the German missions in China context.'],
    exceptions: [],
    boundary: 'This is not a global rule, a self-service exception test, confirmation of certificate acceptance, or an individual immigration outcome.',
    sourceRefs: [{
      publisher: 'German missions in China',
      url: 'https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606',
      locator: '家庭团聚/结婚定居所需的基本德语知识证明 — meaning of basic German, forms of proof, and exceptions.',
      supports: 'China-facing basic-German context and a mission-verification starting point.',
      boundary: 'China/application-location scope only; no exception or acceptance conclusion is encoded.',
    }],
    sourceCheckedAt: checkedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt,
    status: 'verified',
    reviewedBy: 'source-review',
    usedBy: ['guide:zh-german-family-reunion-language-requirement'],
  },
  {
    claimId: 'goethe-zertifikat-a1-product-and-certificate',
    version: '2026-09-08.1',
    claimText: 'Goethe defines its own A1 examination product and certificate facts, including the distinction between a passed examination certificate and attendance evidence; Goethe does not decide immigration acceptance.',
    route: 'Goethe-Zertifikat A1: Start Deutsch 1 product and certificate verification',
    jurisdiction: 'Goethe examination product only',
    examProduct: 'Goethe-Zertifikat A1: Start Deutsch 1',
    scope: {
      locale: 'multi-lingual',
      jurisdiction: 'Goethe examination product only',
      route: 'Goethe-Zertifikat A1: Start Deutsch 1 product and certificate verification',
      audience: 'Readers checking the exact Goethe product before asking the receiving authority about acceptance.',
    },
    conditions: ['The reader must confirm the exact local product and booking terms with the selected official or authorised test centre.'],
    exceptions: [],
    boundary: 'This does not establish visa acceptance, application recency, document form, an exception, local fee, booking availability, or an individual outcome.',
    sourceRefs: [{
      publisher: 'Goethe-Institut Germany',
      url: 'https://www.goethe.de/ins/de/en/prf/ogf.html',
      locator: 'Frequently asked questions — German exams; certificate validity and distinction from attendance evidence.',
      supports: 'Goethe product/certificate facts, including that Goethe A1–C2 certificates do not expire and attendance evidence is distinct.',
      boundary: 'Goethe controls its product facts, not receiving-authority acceptance or local execution terms.',
    }],
    sourceCheckedAt: checkedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt,
    status: 'verified',
    reviewedBy: 'source-review',
    usedBy: ['exam-product:goethe-zertifikat-a1-start-deutsch-1', 'guide:goethe-a1-germany-family-reunion'],
  },
  {
    claimId: 'goethe-zertifikat-a1-format-score-and-repeat',
    version: '2026-09-09.1',
    claimText: 'Goethe publishes product-specific written and oral timing, whole-exam scoring, and whole-exam repetition information for Goethe-Zertifikat A1: Start Deutsch 1.',
    route: 'Goethe-Zertifikat A1: Start Deutsch 1 product comparison',
    jurisdiction: 'Goethe examination product only',
    examProduct: 'Goethe-Zertifikat A1: Start Deutsch 1',
    scope: {
      locale: 'multi-lingual',
      jurisdiction: 'Goethe examination product only',
      route: 'Goethe-Zertifikat A1: Start Deutsch 1 product comparison',
      audience: 'Readers comparing the verified structure of the exact adult Goethe A1 product.',
    },
    conditions: ['Local delivery format, registration, fee, date, identity, cancellation, result release and certificate delivery still require the selected centre.'],
    exceptions: [],
    boundary: 'These product facts do not establish local availability, a local result date, immigration acceptance, comparative difficulty or an individual outcome.',
    sourceRefs: [
      {
        publisher: 'Goethe-Institut',
        url: 'https://www.goethe.de/pro/relaunch/prf/de/Durchfuehrungsbestimmungen_A1_Start_Deutsch_1.pdf',
        locator: 'Terms and Conditions for Exam Administration, sections 1.1, 1.4, 3 and 6; last updated 1 September 2025.',
        supports: 'The compulsory written/oral components, 65-minute written duration, 15-minute group speaking format with no preparation, and whole-exam score calculation.',
        boundary: 'The administration terms do not publish a local centre date, fee, seat, result-release time or immigration-acceptance decision.',
      },
      {
        publisher: 'Goethe-Institut',
        url: 'https://www.goethe.de/ins/us/en/spr/prf/ogf.html',
        locator: 'German exams FAQ — how often A1/A2 exams may be repeated.',
        supports: 'A1 is repeated in its entirety and may be repeated as often as required.',
        boundary: 'A product-level repeat rule does not provide a next session, booking right, fee, deadline or result timeline at a selected centre.',
      },
    ],
    sourceCheckedAt: productCheckedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt: productNextReviewAt,
    status: 'verified',
    reviewedBy: 'source-review',
    usedBy: ['exam-product:goethe-zertifikat-a1-start-deutsch-1', 'guide:goethe-a1-vs-telc-a1', 'guide:zh-goethe-a1-vs-telc-a1', 'tool:exam-comparison'],
  },
  {
    claimId: 'telc-start-deutsch-1-format-score-and-partial-sitting',
    version: '2026-09-09.1',
    claimText: 'telc publishes product-specific written and oral timing, scoring material, and a no-partial-examination rule for Start Deutsch 1 / telc Deutsch A1.',
    route: 'Start Deutsch 1 / telc Deutsch A1 product comparison',
    jurisdiction: 'telc examination product only',
    examProduct: 'Start Deutsch 1 / telc Deutsch A1',
    scope: {
      locale: 'multi-lingual',
      jurisdiction: 'telc examination product only',
      route: 'Start Deutsch 1 / telc Deutsch A1 product comparison',
      audience: 'Readers comparing the verified structure of the exact adult telc A1 product.',
    },
    conditions: ['Local registration, fee, date, identity, cancellation, result release and certificate delivery still require the selected telc examination centre.'],
    exceptions: [],
    boundary: 'These product facts do not establish local availability, a local result date, immigration acceptance, comparative difficulty or an individual outcome.',
    sourceRefs: [
      {
        publisher: 'telc gGmbH',
        url: 'https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/',
        locator: 'Structure of the examination table and partial-examination statement.',
        supports: 'The written and oral components, approximate durations, usual four-person/no-preparation oral format, paper-based description and no-partial-examination rule.',
        boundary: 'The product page does not publish a selected centre’s current date, fee, seat, repeat booking, result-release time or immigration-acceptance decision.',
      },
      {
        publisher: 'telc gGmbH',
        url: 'https://shop.telc.net/media/catalog/product/file/2/0/20210103_5070-b00-010106_web_1.pdf',
        locator: 'Start Deutsch 1 / telc Deutsch A1 mock examination, test-format and result-points tables.',
        supports: 'The 60-point score scale and the 36-point lower boundary of the passing rating shown in the official mock examination.',
        boundary: 'The mock examination is preparation/scoring evidence, not a local registration, fee, result date, certificate or immigration-acceptance source.',
      },
    ],
    sourceCheckedAt: productCheckedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt: productNextReviewAt,
    status: 'verified',
    reviewedBy: 'source-review',
    usedBy: ['exam-product:telc-start-deutsch-1-a1', 'guide:goethe-a1-vs-telc-a1', 'guide:zh-goethe-a1-vs-telc-a1', 'tool:exam-comparison'],
  },
  {
    claimId: 'goethe-germany-a1-2026-fees',
    version: '2026-09-09.1',
    claimText: 'Goethe-Institut Germany publishes a 2026 adult Goethe-Zertifikat A1 fee of EUR 155 and a 20 percent course-participant discount, producing EUR 124 by exact arithmetic for the stated category.',
    route: 'Goethe-Zertifikat A1 local fee discovery',
    jurisdiction: 'Goethe-Institut Germany 2026 price-page scope only',
    examProduct: 'Goethe-Zertifikat A1: Start Deutsch 1',
    scope: {
      locale: 'multi-lingual',
      jurisdiction: 'Goethe-Institut Germany 2026 price-page scope only',
      route: 'Goethe-Zertifikat A1 local fee discovery',
      audience: 'Readers verifying a current adult A1 price within the Goethe-Institut Germany price-page scope.',
    },
    conditions: ['The course-participant row applies only when the reader meets the definition published on the current Germany price page and the selected booking channel confirms it.'],
    exceptions: [],
    boundary: 'This is not a worldwide or partner-centre price, a tax or checkout guarantee, a seat claim, a discount-eligibility decision, or an immigration-acceptance source.',
    sourceRefs: [{
      publisher: 'Goethe-Institut Germany',
      url: 'https://www.goethe.de/ins/de/en/prf/pre.html',
      locator: 'Exam fees 2026 — Exams for adults table and Remarks defining the 20 percent course-participant discount.',
      supports: 'The published EUR 155 adult A1 fee, the 20 percent discount and the course-participant definition; EUR 124 is the exact arithmetic result of applying that published discount to EUR 155.',
      boundary: 'Does not establish a selected partner centre’s checkout amount, taxes, availability, seat, individual category eligibility or immigration acceptance.',
    }],
    sourceCheckedAt: feeSourceCheckedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt: feeNextReviewAt,
    status: 'verified',
    reviewedBy: 'source-review',
    usedBy: ['fee-schedule:goethe-germany', 'guide:goethe-a1-fees-by-country', 'guide:goethe-a1-test-centers'],
  },
  {
    claimId: 'goethe-beijing-a1-2026-fees',
    version: '2026-09-09.1',
    claimText: 'Goethe-Institut Beijing publishes 2026 adult Start Deutsch 1 prices of CNY 1,400 for its stated current-learner category and CNY 1,500 for non-current learners.',
    route: 'Goethe-Zertifikat A1 local fee discovery',
    jurisdiction: 'Goethe-Institut Beijing 2026 registration-page scope only',
    examProduct: 'Goethe-Zertifikat A1: Start Deutsch 1',
    scope: {
      locale: 'multi-lingual',
      jurisdiction: 'Goethe-Institut Beijing 2026 registration-page scope only',
      route: 'Goethe-Zertifikat A1 local fee discovery',
      audience: 'Readers verifying a current adult A1 price at the named Goethe-Institut Beijing location.',
    },
    conditions: ['The reader must use the category definition and evidence instructions on the current Beijing page and obtain the actual registration result before treating a transaction as available.'],
    exceptions: [],
    boundary: 'This is Beijing-only evidence, not a China-wide price, a category decision for a reader, a seat or registration-success claim, a final checkout guarantee, or an immigration-acceptance source.',
    sourceRefs: [{
      publisher: 'Goethe-Institut Beijing',
      url: 'https://www.goethe.de/ins/cn/zh/spr/prf/anm.html',
      locator: '2026年考试价格 table for adult A1 and the preceding definition of 在读学员 with supporting-document instructions.',
      supports: 'The Beijing adult A1 current-learner CNY 1,400 and non-current-learner CNY 1,500 rows and the page’s local category definition.',
      boundary: 'Does not support another Chinese city or partner, live availability, a seat, individual category eligibility, a guaranteed final charge or immigration acceptance.',
    }],
    sourceCheckedAt: feeSourceCheckedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt: feeNextReviewAt,
    status: 'verified',
    reviewedBy: 'source-review',
    usedBy: ['fee-schedule:goethe-beijing', 'guide:goethe-a1-fees-by-country', 'guide:goethe-a1-test-centers', 'guide:zh-goethe-a1-test-centers'],
  },
  {
    claimId: 'china-family-reunion-a1-certificate-recency-context',
    version: '2026-09-08.1',
    claimText: 'For the listed German family-reunion or marriage-settlement scenarios in China, the German missions in China say that certificates with an examination date no earlier than one year are usually accepted.',
    route: 'Germany family reunion or marriage settlement in the China mission context',
    jurisdiction: 'China application locations only',
    examProduct: null,
    scope: {
      locale: 'en',
      jurisdiction: 'China application locations only',
      route: 'Germany family reunion or marriage settlement in the China mission context',
      audience: 'Readers checking a current certificate for an application location within the China mission context.',
    },
    conditions: ['The application location must be within the German missions in China context and the reader must confirm the current route instruction.'],
    exceptions: [],
    boundary: 'This is China-only wording. “Usually” is not an automatic acceptance or rejection decision, does not create a global certificate-expiry rule, and does not decide an exception or individual outcome.',
    sourceRefs: [{
      publisher: 'German missions in China',
      url: 'https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606',
      locator: '家庭团聚/结婚定居所需的基本德语知识证明 — certificate examination date and acceptance wording.',
      supports: 'China-facing wording that certificates with an examination date no earlier than one year are usually accepted for the listed scenarios.',
      boundary: 'China/application-location scope only; not a global expiry, automatic acceptance, rejection, exception, or individual result.',
    }],
    sourceCheckedAt: checkedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt,
    status: 'verified',
    reviewedBy: 'source-review',
    usedBy: ['guide:goethe-a1-germany-family-reunion'],
  },
];

const goetheAdministrationSource: ClaimSourceRef = {
  publisher: 'Goethe-Institut',
  url: 'https://www.goethe.de/pro/relaunch/prf/de/Durchfuehrungsbestimmungen_A1_Start_Deutsch_1.pdf',
  locator: 'Terms and Conditions for Exam Administration, sections 1.1, 1.4, 3 and 6; last updated 1 September 2025.',
  supports: 'The exact adult product components, written/oral duration, group speaking format and whole-exam score calculation.',
  boundary: 'Does not establish local delivery, booking, price, seat, result timing, certificate delivery or immigration acceptance.',
};
const goetheRepeatSource: ClaimSourceRef = {
  publisher: 'Goethe-Institut',
  url: 'https://www.goethe.de/ins/us/en/spr/prf/ogf.html',
  locator: 'German exams FAQ — how often A1 and A2 exams may be repeated.',
  supports: 'A1 is repeated in its entirety and may be repeated as often as required.',
  boundary: 'Does not establish the selected centre’s next session, re-registration, fee, cancellation or result timeline.',
};
const telcProductSource: ClaimSourceRef = {
  publisher: 'telc gGmbH',
  url: 'https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/',
  locator: 'Structure of the examination table and partial-examination statement.',
  supports: 'The exact product, written/oral structure and duration, usual oral group, no-preparation statement, paper-based description and no-partial-examination rule.',
  boundary: 'Does not establish a selected centre’s current delivery, date, fee, seat, repeat booking, result timing, certificate delivery or immigration acceptance.',
};
const telcMockSource: ClaimSourceRef = {
  publisher: 'telc gGmbH',
  url: 'https://shop.telc.net/media/catalog/product/file/2/0/20210103_5070-b00-010106_web_1.pdf',
  locator: 'Start Deutsch 1 / telc Deutsch A1 mock examination, test-format and result-points tables.',
  supports: 'The official mock examination’s 60-point score scale and 36-point lower boundary for the passing rating.',
  boundary: 'Preparation/scoring evidence only; not a source for local booking, fee, result date, certificate delivery or immigration acceptance.',
};

const pendingLocalFee = (): LocalFee => ({
  responsibleParty: 'Selected official or authorised test centre',
  amount: null,
  currency: null,
  status: 'needs_authority_confirmation',
  confirmationAction: 'Ask the selected official or authorised test centre for the exact product, date, fee currency, payment, cancellation, result, and certificate terms before paying.',
  boundary: 'No local fee, date, seat, booking, result timing or certificate-delivery fact is verified by the stable product comparison.',
});
const pendingAcceptance = (): ExamAcceptanceBoundary => ({
  responsibleParty: 'Competent German mission or receiving immigration authority for the application route',
  status: 'needs_authority_confirmation',
  confirmationAction: 'Ask the competent mission or receiving authority whether the exact certificate and document form are accepted for the current route.',
  boundary: 'Product identity and exam-owner rules do not establish route-specific certificate acceptance, an exemption, document form or an individual outcome.',
});

export const examProducts: readonly ExamProduct[] = [
  {
    id: 'goethe-zertifikat-a1-start-deutsch-1',
    version: '2026-09-09.1',
    name: 'Goethe-Zertifikat A1: Start Deutsch 1',
    level: 'A1',
    examOwner: 'Goethe-Institut',
    scope: 'Adult Goethe A1 product facts only; local execution and immigration acceptance are separate checks.',
    sourceCheckedAt: productCheckedAt,
    effectiveFrom: null,
    effectiveTo: null,
    status: 'verified',
    reviewedBy: 'source-review',
    officialUrl: 'https://www.goethe.de/ins/de/en/prf/prf/gzsd1.html',
    officialPracticeUrl: 'https://www.goethe.de/en/spr/prf/ueb/pa1.html',
    comparisonFacts: [
      {
        id: 'written-structure-and-duration',
        label: 'Written structure and duration',
        labelZh: '笔试结构与时长',
        value: 'Listening about 20 minutes, Reading 25 minutes and Writing 20 minutes: 65 minutes total without a break.',
        valueZh: '听力约 20 分钟、阅读 25 分钟、写作 20 分钟，合计 65 分钟，中间不休息。',
        status: 'verified',
        sourceCheckedAt: productCheckedAt,
        source: goetheAdministrationSource,
      },
      {
        id: 'oral-format-and-duration',
        label: 'Oral format and duration',
        labelZh: '口试结构与时长',
        value: 'Speaking is a 15-minute group exam with no more than four participants and no preparation time.',
        valueZh: '口试约 15 分钟，为最多 4 人的小组考试，不设准备时间。',
        status: 'verified',
        sourceCheckedAt: productCheckedAt,
        source: goetheAdministrationSource,
      },
      {
        id: 'score-rule',
        label: 'Score rule',
        labelZh: '分数规则',
        value: 'The whole exam is passed at 60 of 100 points or more after all sections have been taken.',
        valueZh: '完成全部部分后，整场考试达到 60/100 或以上为通过。',
        status: 'verified',
        sourceCheckedAt: productCheckedAt,
        source: goetheAdministrationSource,
      },
      {
        id: 'whole-or-partial-sitting',
        label: 'Whole or partial sitting',
        labelZh: '完整或部分考试',
        value: 'A1 is repeated as a complete exam; Goethe’s exam FAQ says it may be repeated as often as required. Local rebooking and fees still apply.',
        valueZh: 'Goethe 官方问答说明 A1 重考时要参加完整考试，并可按需重考；所选考点仍控制重新报名与费用。',
        status: 'verified',
        sourceCheckedAt: productCheckedAt,
        source: goetheRepeatSource,
      },
    ],
    localExecutionBoundary: 'The selected official or authorised local centre controls current delivery format, registration, dates, fees, identity checks, cancellations, result timing and certificate delivery.',
    productClaim: { claimId: 'goethe-zertifikat-a1-format-score-and-repeat', version: '2026-09-09.1' },
    certificateClaim: { claimId: 'goethe-zertifikat-a1-product-and-certificate', version: '2026-09-08.1' },
    usedBy: ['guide:goethe-a1-germany-family-reunion', 'guide:goethe-a1-vs-telc-a1', 'guide:zh-goethe-a1-vs-telc-a1', 'tool:exam-comparison'],
    localFee: pendingLocalFee(),
    acceptance: pendingAcceptance(),
  },
  {
    id: 'telc-start-deutsch-1-a1',
    version: '2026-09-09.1',
    name: 'Start Deutsch 1 / telc Deutsch A1',
    level: 'A1',
    examOwner: 'telc gGmbH',
    scope: 'Adult general-language telc A1 product facts only; local execution and immigration acceptance are separate checks.',
    sourceCheckedAt: productCheckedAt,
    effectiveFrom: null,
    effectiveTo: null,
    status: 'verified',
    reviewedBy: 'source-review',
    officialUrl: telcProductSource.url,
    officialPracticeUrl: telcMockSource.url,
    comparisonFacts: [
      {
        id: 'written-structure-and-duration',
        label: 'Written structure and duration',
        labelZh: '笔试结构与时长',
        value: 'Listening takes about 20 minutes; Reading and Writing are combined in a 45-minute block, with no break stated.',
        valueZh: '听力约 20 分钟；阅读与写作合计 45 分钟，产品页注明中间不休息。',
        status: 'verified',
        sourceCheckedAt: productCheckedAt,
        source: telcProductSource,
      },
      {
        id: 'oral-format-and-duration',
        label: 'Oral format and duration',
        labelZh: '口试结构与时长',
        value: 'Speaking takes about 15 minutes, usually with four test takers and no preparation time.',
        valueZh: '口试约 15 分钟，通常 4 人参加，不设准备时间。',
        status: 'verified',
        sourceCheckedAt: productCheckedAt,
        source: telcProductSource,
      },
      {
        id: 'score-rule',
        label: 'Score rule',
        labelZh: '分数规则',
        value: 'The official mock exam uses a 60-point scale and shows the passing rating from 36 points.',
        valueZh: '官方模拟题使用 60 分制，并从 36/60 起列为通过等级。',
        status: 'verified',
        sourceCheckedAt: productCheckedAt,
        source: telcMockSource,
      },
      {
        id: 'whole-or-partial-sitting',
        label: 'Whole or partial sitting',
        labelZh: '完整或部分考试',
        value: 'The product page says this exam cannot be taken as a partial examination. Confirm any new registration and fee with the selected centre.',
        valueZh: '产品页说明不能只考部分；任何重新报名、场次和费用仍由所选考点确认。',
        status: 'verified',
        sourceCheckedAt: productCheckedAt,
        source: telcProductSource,
      },
    ],
    localExecutionBoundary: 'The selected telc examination centre controls current registration, delivery, dates, fees, identity checks, cancellations, result timing, certificate delivery and any repeat booking.',
    productClaim: { claimId: 'telc-start-deutsch-1-format-score-and-partial-sitting', version: '2026-09-09.1' },
    certificateClaim: { claimId: 'telc-start-deutsch-1-format-score-and-partial-sitting', version: '2026-09-09.1' },
    usedBy: ['guide:goethe-a1-vs-telc-a1', 'guide:zh-goethe-a1-vs-telc-a1', 'tool:exam-comparison'],
    localFee: pendingLocalFee(),
    acceptance: pendingAcceptance(),
  },
  ...b1ExamProducts,
];

const germanyFeeSource: LocalExamFeeSourceRef = {
  owner: 'Goethe-Institut Germany',
  url: 'https://www.goethe.de/ins/de/en/prf/pre.html',
  locator: 'Exam fees 2026 — adult A1 row and Remarks defining the 20 percent course-participant discount.',
  supports: 'EUR 155 for the adult A1 product and a 20 percent discount for the page-defined course-participant category.',
  boundary: 'Germany price-page scope only; not a partner-centre checkout, tax, seat, availability, category-eligibility or immigration-acceptance source.',
};
const beijingFeeSource: LocalExamFeeSourceRef = {
  owner: 'Goethe-Institut Beijing',
  url: 'https://www.goethe.de/ins/cn/zh/spr/prf/anm.html',
  locator: '2026年考试价格 adult A1 row and the current-learner definition above the schedule.',
  supports: 'CNY 1,400 for the page-defined current-learner category and CNY 1,500 for the non-current-learner category at Goethe-Institut Beijing.',
  boundary: 'Beijing institute only; not China-wide and not a seat, registration-success, individual-category, final-checkout or immigration-acceptance source.',
};

export const localExamFeeRecords: readonly LocalExamFeeRecord[] = [
  {
    id: 'goethe-germany-2026-regular-adult',
    version: '2026-09-09.1',
    examProductId: 'goethe-zertifikat-a1-start-deutsch-1',
    scopeId: 'goethe-germany',
    scopeType: 'country-network-price-list',
    countryCode: 'DE',
    city: null,
    priceScopeLabel: 'Goethe-Institut Germany 2026 price page',
    candidateCategory: {
      id: 'regular-adult',
      label: 'Adult regular fee',
      eligibilityBoundary: 'Use this row only when the current Goethe-Institut Germany booking route does not confirm the published course-participant discount for the candidate.',
    },
    amount: 155,
    currency: 'EUR',
    unit: 'exam-registration',
    priceYear: 2026,
    sourceCheckedAt: feeSourceCheckedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt: feeNextReviewAt,
    status: 'verified',
    source: germanyFeeSource,
    amountDerivation: null,
    boundary: 'A Germany price-page record is not a universal Goethe or partner-centre price and does not prove the final charge or a seat.',
    confirmationAction: 'Reopen the Goethe-Institut Germany fee page and the selected official booking channel before payment.',
    claimRef: { claimId: 'goethe-germany-a1-2026-fees', version: '2026-09-09.1' },
  },
  {
    id: 'goethe-germany-2026-course-participant',
    version: '2026-09-09.1',
    examProductId: 'goethe-zertifikat-a1-start-deutsch-1',
    scopeId: 'goethe-germany',
    scopeType: 'country-network-price-list',
    countryCode: 'DE',
    city: null,
    priceScopeLabel: 'Goethe-Institut Germany 2026 price page',
    candidateCategory: {
      id: 'course-participant',
      label: 'Course-participant fee after the published 20% discount',
      eligibilityBoundary: 'The Germany page defines course participants as people who participated in a Goethe-Institut course no more than six months before the exam date; the selected booking channel must confirm the category.',
    },
    amount: 124,
    currency: 'EUR',
    unit: 'exam-registration',
    priceYear: 2026,
    sourceCheckedAt: feeSourceCheckedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt: feeNextReviewAt,
    status: 'verified',
    source: germanyFeeSource,
    amountDerivation: 'EUR 155 × (1 − 20%) = EUR 124',
    boundary: 'EUR 124 is exact arithmetic from the published EUR 155 fee and 20 percent discount, not a separate checkout promise or an individual eligibility decision.',
    confirmationAction: 'Confirm the current course-participant definition, evidence and applied amount in the selected official Goethe-Institut Germany booking channel before payment.',
    claimRef: { claimId: 'goethe-germany-a1-2026-fees', version: '2026-09-09.1' },
  },
  {
    id: 'goethe-beijing-2026-current-learner',
    version: '2026-09-09.1',
    examProductId: 'goethe-zertifikat-a1-start-deutsch-1',
    scopeId: 'goethe-beijing',
    scopeType: 'named-institute',
    countryCode: 'CN',
    city: 'Beijing',
    priceScopeLabel: 'Goethe-Institut Beijing 2026 registration page',
    candidateCategory: {
      id: 'current-learner',
      label: 'Beijing current-learner fee',
      eligibilityBoundary: 'Use only the current Beijing page’s definition and upload instructions; VisaLang does not decide whether a reader qualifies.',
    },
    amount: 1400,
    currency: 'CNY',
    unit: 'exam-registration',
    priceYear: 2026,
    sourceCheckedAt: feeSourceCheckedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt: feeNextReviewAt,
    status: 'verified',
    source: beijingFeeSource,
    amountDerivation: null,
    boundary: 'This is a named Beijing institute row and cannot be extended to another Chinese city, partner, category, checkout or seat.',
    confirmationAction: 'Reopen the Beijing registration page, confirm the current category evidence and wait for the official registration and payment notice before paying.',
    claimRef: { claimId: 'goethe-beijing-a1-2026-fees', version: '2026-09-09.1' },
  },
  {
    id: 'goethe-beijing-2026-non-current-learner',
    version: '2026-09-09.1',
    examProductId: 'goethe-zertifikat-a1-start-deutsch-1',
    scopeId: 'goethe-beijing',
    scopeType: 'named-institute',
    countryCode: 'CN',
    city: 'Beijing',
    priceScopeLabel: 'Goethe-Institut Beijing 2026 registration page',
    candidateCategory: {
      id: 'non-current-learner',
      label: 'Beijing non-current-learner fee',
      eligibilityBoundary: 'Use only when the current Beijing registration route places the candidate in this category; VisaLang does not decide category eligibility.',
    },
    amount: 1500,
    currency: 'CNY',
    unit: 'exam-registration',
    priceYear: 2026,
    sourceCheckedAt: feeSourceCheckedAt,
    effectiveFrom: null,
    effectiveTo: null,
    nextReviewAt: feeNextReviewAt,
    status: 'verified',
    source: beijingFeeSource,
    amountDerivation: null,
    boundary: 'This is a named Beijing institute row and cannot be extended to another Chinese city, partner, category, checkout or seat.',
    confirmationAction: 'Reopen the Beijing registration page and wait for the official registration and payment notice before paying.',
    claimRef: { claimId: 'goethe-beijing-a1-2026-fees', version: '2026-09-09.1' },
  },
];

export const examCentreRoutes: readonly ExamCentreRoute[] = [
  {
    id: 'goethe-germany',
    examProductId: 'goethe-zertifikat-a1-start-deutsch-1',
    scopeType: 'country-network-price-list',
    countryCode: 'DE',
    city: null,
    label: 'Goethe-Institut Germany exam-fee route',
    officialUrl: germanyFeeSource.url,
    sourceCheckedAt: productCheckedAt,
    verificationAction: 'Open the 2026 adult A1 row, then continue to the selected official Goethe-Institut Germany booking route to confirm category, tax, transaction terms and final amount.',
    boundary: 'The Germany page is not a worldwide price and does not guarantee a partner-centre price, a session or a seat.',
  },
  {
    id: 'goethe-beijing',
    examProductId: 'goethe-zertifikat-a1-start-deutsch-1',
    scopeType: 'named-institute',
    countryCode: 'CN',
    city: 'Beijing',
    label: 'Goethe-Institut Beijing registration and price route',
    officialUrl: beijingFeeSource.url,
    sourceCheckedAt: productCheckedAt,
    verificationAction: 'Open the adult A1 price row and local category definition, then follow the current Beijing registration-result and payment-notice process.',
    boundary: 'This route is limited to Goethe-Institut Beijing and cannot be extended to China as a whole, another centre, a live session or a seat.',
  },
];

const localFeeFallback = (): LocalFeeScheduleResult => ({
  status: 'needs_authority_confirmation',
  records: [],
  amount: null,
  conversionApplied: false,
  confirmationAction: 'Use the selected official or authorised test centre’s current page or written reply to confirm the exact product, category, fee, currency and payment terms before paying.',
});

const isCompleteLocalFeeSource = (
  source: LocalExamFeeSourceRef | undefined,
  expectedOwner: string,
) => Boolean(
  source?.owner === expectedOwner
  && typeof source.url === 'string'
  && source.url.startsWith('https://')
  && source.locator
  && source.supports
  && source.boundary
);

const isCurrentLocalFeeRecord = (
  record: LocalExamFeeRecord,
  centreRoute: ExamCentreRoute,
  productId: string | undefined,
  asOf: string,
) => Boolean(
  isIsoCalendarDate(asOf)
  && record.status === 'verified'
  && record.examProductId === productId
  && record.scopeId === centreRoute.id
  && record.scopeType === centreRoute.scopeType
  && record.countryCode === centreRoute.countryCode
  && record.city === centreRoute.city
  && record.version === record.claimRef?.version
  && record.priceYear === 2026
  && Number.isFinite(record.amount)
  && record.amount > 0
  && isIsoCalendarDate(record.sourceCheckedAt)
  && isIsoCalendarDate(record.nextReviewAt)
  && isValidOptionalDate(record.effectiveFrom)
  && isValidOptionalDate(record.effectiveTo)
  && record.sourceCheckedAt <= asOf
  && record.nextReviewAt >= asOf
  && (record.effectiveFrom === null || record.effectiveFrom <= asOf)
  && (record.effectiveTo === null || record.effectiveTo >= asOf)
  && (record.effectiveFrom === null || record.effectiveTo === null || record.effectiveFrom <= record.effectiveTo)
  && isCompleteLocalFeeSource(record.source, centreRoute.id === 'goethe-germany' ? 'Goethe-Institut Germany' : 'Goethe-Institut Beijing')
  && record.source?.url === centreRoute.officialUrl
  && centreRoute.officialUrl.startsWith('https://')
  && centreRoute.verificationAction
  && centreRoute.boundary
  && isIsoCalendarDate(centreRoute.sourceCheckedAt)
  && centreRoute.sourceCheckedAt <= asOf
);

export function getLocalFeeSchedule(
  input: {
    productId?: string;
    scopeId?: string;
    asOf?: string;
    consumerId?: string;
    consumerLocale?: ClaimConsumerLocale;
  },
  options: { records?: readonly LocalExamFeeRecord[]; claims?: readonly Claim[] } = {},
): LocalFeeScheduleResult {
  const records = options.records ?? localExamFeeRecords;
  const asOf = input.asOf ?? currentClaimAsOf();
  const candidates = records.filter((record) => record.examProductId === input.productId && record.scopeId === input.scopeId);
  const centreRoute = examCentreRoutes.find((route) => route.id === input.scopeId && route.examProductId === input.productId);
  const structurallyValid = candidates.length === 2
    && new Set(candidates.map((record) => record.id)).size === candidates.length
    && centreRoute !== undefined
    && candidates.every((record) => isCurrentLocalFeeRecord(record, centreRoute, input.productId, asOf))
    && new Set(candidates.map((record) => record.currency)).size === 1;
  if (!centreRoute || !structurallyValid) return localFeeFallback();

  const claimRefs = [...new Map(candidates.map((record) => [`${record.claimRef.claimId}@${record.claimRef.version}`, record.claimRef])).values()];
  const claimsCurrent = validateClaimSet(claimRefs, {
    claims: options.claims,
    asOf,
    consumerId: input.consumerId ?? `fee-schedule:${input.scopeId}`,
    consumerLocale: input.consumerLocale ?? 'multi-lingual',
  }).valid;
  if (!claimsCurrent) return localFeeFallback();

  return {
    status: 'verified',
    scopeId: String(input.scopeId),
    records: candidates,
    conversionApplied: false,
    boundary: centreRoute.boundary,
  };
}

export const routeRules: readonly RouteRule[] = [{
  ruleId: 'germany-family-reunion-a1-authority-guidance',
  version: '2026-09-09.1',
  consumerId: 'route-rule:germany-family-reunion-a1-authority-guidance',
  consumerLocale: 'en',
  priority: 'P0',
  routeId: 'germany-family-reunion-a1',
  inputConditions: [{
    id: 'applicationLocation',
    required: true,
    description: 'The applicant’s ordinary residence or application location is needed to identify the competent German mission.',
  }],
  claimRefs: [
    { claimId: 'germany-family-reunion-a1-general-starting-rule', version: '2026-09-08.1' },
    { claimId: 'germany-family-reunion-a1-authority-split', version: '2026-09-08.1' },
  ],
  intendedResultStatus: 'guidance_available',
  explanation: 'Use the applicant’s ordinary residence to identify the competent German mission, save its current instruction, and keep application-proof questions separate from Goethe product and selected-centre booking questions.',
  outstandingItems: ['The current local mission instruction and exact route details have to be checked for the applicant’s location.'],
  confirmationItems: ['Confirm the exact route, any exception question, accepted proof, document form, and current instructions with the competent German mission or receiving immigration authority.'],
  nextActionId: 'confirm-competent-german-mission',
  boundary: 'Guidance identifies the verification order only. It does not decide whether proof is required, whether an exception applies, or whether a certificate will be accepted.',
}];

const isCompleteSource = (source: ClaimSourceRef) => Boolean(source.publisher && source.url.startsWith('https://') && source.locator && source.supports && source.boundary);
const isIsoCalendarDate = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;

  const daysInMonth = [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= daysInMonth[month - 1];
};
const isValidOptionalDate = (value: unknown) => value === null || isIsoCalendarDate(value);
const isClaimConsumerLocale = (value: unknown): value is ClaimConsumerLocale => value === 'en' || value === 'zh-CN' || value === 'multi-lingual';
const isAuthorisedConsumer = (claim: Claim, consumerId: string | undefined, consumerLocale: ClaimConsumerLocale | undefined) => Boolean(
  consumerId?.trim()
  && isClaimConsumerLocale(consumerLocale)
  && claim.usedBy.includes(consumerId)
  && (claim.scope.locale === 'multi-lingual' || claim.scope.locale === consumerLocale),
);
const isCurrentClaimInterval = (claim: Claim, asOf: string) => Boolean(
  isIsoCalendarDate(asOf)
  && isIsoCalendarDate(claim.sourceCheckedAt)
  && isIsoCalendarDate(claim.nextReviewAt ?? '')
  && isValidOptionalDate(claim.effectiveFrom)
  && isValidOptionalDate(claim.effectiveTo)
  && claim.sourceCheckedAt <= asOf
  && claim.nextReviewAt !== null
  && claim.nextReviewAt >= asOf
  && (claim.effectiveFrom === null || claim.effectiveFrom <= asOf)
  && (claim.effectiveTo === null || claim.effectiveTo >= asOf)
  && (claim.effectiveFrom === null || claim.effectiveTo === null || claim.effectiveFrom <= claim.effectiveTo),
);
const isCurrentVerifiedClaim = (
  claim: Claim | undefined,
  required: ClaimVersionRef,
  suppliedVersion: string | undefined,
  asOf: string,
  consumerId: string | undefined,
  consumerLocale: ClaimConsumerLocale | undefined,
) => Boolean(
  claim
  && claim.claimId === required.claimId
  && claim.version === required.version
  && suppliedVersion === required.version
  && claim.status === 'verified'
  && isCurrentClaimInterval(claim, asOf)
  && claim.sourceRefs.length > 0
  && claim.sourceRefs.every(isCompleteSource)
  && isAuthorisedConsumer(claim, consumerId, consumerLocale)
);

export function resolveRouteRule(
  input: RouteResolutionInput,
  options: { claims?: readonly Claim[]; rules?: readonly RouteRule[]; asOf?: string } = {},
): RouteResolution {
  if (!input.routeId) {
    return { status: 'needs_information', nextAction: 'Identify the country and route before relying on a language-proof guide.' };
  }
  const rules = options.rules ?? routeRules;
  const rule = rules.find((candidate) => candidate.routeId === input.routeId);
  if (!rule) {
    return { status: 'unsupported', nextAction: 'Use the authority or institution receiving the application to identify the applicable route and language-proof question.' };
  }
  if (!input.applicationLocation?.trim()) {
    return { status: 'needs_information', ruleId: rule.ruleId, nextActionId: rule.nextActionId, nextAction: 'Record the applicant’s ordinary residence or application location before identifying the competent mission.' };
  }
  if (!input.claimVersions) {
    return { status: 'needs_information', ruleId: rule.ruleId, nextActionId: rule.nextActionId, nextAction: 'Record the versioned official evidence required for this route before using deterministic guidance.' };
  }
  const claims = options.claims ?? claimRegistry;
  const asOf = options.asOf ?? currentClaimAsOf();
  const allCurrent = isIsoCalendarDate(asOf) && rule.claimRefs.every((required) => {
    const exactMatches = claims.filter((claim) => claim.claimId === required.claimId && claim.version === required.version);
    return exactMatches.length === 1 && isCurrentVerifiedClaim(
      exactMatches[0],
      required,
      input.claimVersions?.[required.claimId],
      asOf,
      rule.consumerId,
      rule.consumerLocale,
    );
  });
  if (!allCurrent) {
    return { status: 'needs_authority_confirmation', ruleId: rule.ruleId, nextActionId: rule.nextActionId, nextAction: rule.confirmationItems.join(' ') };
  }
  return {
    status: 'guidance_available',
    ruleId: rule.ruleId,
    guidance: rule.explanation,
    nextActionId: rule.nextActionId,
    nextAction: rule.confirmationItems.join(' '),
  };
}

export function validateClaimSet(
  claimRefs: readonly ClaimVersionRef[],
  options: ClaimValidationOptions = {},
): ClaimSetValidation {
  if (claimRefs.length === 0) return { valid: false, reason: 'missing_refs' };
  if (!options.consumerId?.trim() || !isClaimConsumerLocale(options.consumerLocale)) return { valid: false, reason: 'missing_consumer' };
  const asOf = options.asOf ?? currentClaimAsOf();
  if (!isIsoCalendarDate(asOf)) return { valid: false, reason: 'invalid_as_of' };
  const claims = options.claims ?? claimRegistry;
  for (const required of claimRefs) {
    const exactMatches = claims.filter((claim) => claim.claimId === required.claimId && claim.version === required.version);
    if (exactMatches.length !== 1) return { valid: false, reason: 'missing_or_conflicting_claim' };
    if (!isCurrentVerifiedClaim(exactMatches[0], required, required.version, asOf, options.consumerId, options.consumerLocale)) return { valid: false, reason: 'not_current_verified' };
  }
  return { valid: true };
}
