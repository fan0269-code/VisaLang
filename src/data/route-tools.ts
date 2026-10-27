import {
  claimRegistry,
  currentClaimAsOf,
  examProducts,
  resolveRouteRule,
  routeRules,
  validateClaimSet,
  type Claim,
  type ClaimConsumerLocale,
  type ClaimSourceRef,
  type ExamProduct,
  type RouteRule,
} from './claim-registry.ts';
import {
  checklistItemZh,
  checklistSourceZh,
  localizeRouteFinderPresentation,
  translateRouteText,
  type ToolLocale,
} from './tool-copy.ts';

export const toolLinks = {
  finder: '/tools/route-finder/',
  checklist: '/tools/checklist-generator/',
  timeline: '/tools/timeline-calculator/',
  comparison: '/tools/exam-comparison/',
  reminders: '/tools/email-reminders/',
  a1Pack: '/products/a1-family-reunion-pack/',
  a1PracticePack: '/products/a1-practice-pack/',
  routeReview: '/route-review/',
};

export const checklistStageOrder = [
  'requirement',
  'exam-choice',
  'booking',
  'exam-certificate',
  'submission-review',
] as const;

export type ChecklistStage = typeof checklistStageOrder[number];

export const applicationRegionOptions = [
  { id: 'germany-mission-china', label: 'German mission responsible for a China application location' },
  { id: 'germany-mission-outside-china', label: 'German mission responsible for another application location' },
  { id: 'other-receiving-authority', label: 'Another country or receiving authority' },
  { id: 'not-confirmed', label: 'Not yet confirmed' },
] as const;

export const familyRelationshipOptions = [
  { id: 'spouse', label: 'Spouse reunification' },
  { id: 'other-family', label: 'Another family relationship' },
  { id: 'not-confirmed', label: 'Not yet confirmed' },
] as const;

export interface ChecklistSourceRef {
  owner: string;
  url: string;
  sourceCheckedAt: string;
  supports: string;
  boundary: string;
}

export interface ChecklistItem {
  id: string;
  stage: ChecklistStage;
  action: string;
  doneWhen: string;
  owner: string;
  sourceRefs: readonly ChecklistSourceRef[];
}

export interface ChecklistGroup {
  stage: ChecklistStage;
  items: readonly ChecklistItem[];
}

export type ChecklistResult =
  | {
    status: 'guidance_available';
    routeId: string;
    groups: ChecklistGroup[];
    boundary: string;
  }
  | {
    status: 'unsupported';
    groups: [];
    boundary: string;
  };

const missionRequirementSource: ChecklistSourceRef = {
  owner: 'German Federal Foreign Office and the competent German mission',
  url: 'https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682',
  sourceCheckedAt: '2026-09-08',
  supports: 'A general language-proof starting point and the need to use the competent mission for route details',
  boundary: 'Does not decide an individual requirement, exemption, accepted certificate, document list or visa outcome',
};
const goetheProductSource: ChecklistSourceRef = {
  owner: 'Goethe-Institut',
  url: 'https://www.goethe.de/ins/de/en/prf/prf/gzsd1.html',
  sourceCheckedAt: '2026-09-09',
  supports: 'The exact adult Goethe-Zertifikat A1: Start Deutsch 1 product identity',
  boundary: 'Does not establish immigration acceptance or a selected centre’s current booking and test-day terms',
};
const telcProductChecklistSource: ChecklistSourceRef = {
  owner: 'telc gGmbH',
  url: 'https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/',
  sourceCheckedAt: '2026-09-09',
  supports: 'The exact Start Deutsch 1 / telc Deutsch A1 product identity',
  boundary: 'Does not establish immigration acceptance or a selected centre’s current booking and test-day terms',
};
const goetheCentreEntrySource: ChecklistSourceRef = {
  owner: 'Goethe-Institut and the selected official or authorised centre',
  url: 'https://www.goethe.de/en/spr/prf.html',
  sourceCheckedAt: '2026-09-09',
  supports: 'An exam-owner starting route for identifying a Goethe institute or exam partner before asking that centre for current local instructions',
  boundary: 'Does not prove a seat, current product, fee, identity rule, result date or certificate process at a particular centre',
};
const telcCentreEntrySource: ChecklistSourceRef = {
  owner: 'telc gGmbH and the selected examination centre',
  url: 'https://www.telc.net/en/language-examinations/find-a-telc-examination-centre/',
  sourceCheckedAt: '2026-09-09',
  supports: 'The official finder route used to identify a candidate telc examination centre before requesting its current local instructions',
  boundary: 'A listing does not prove that a centre currently offers the exact A1 product, has a seat or uses any universal local rule',
};

const germanyFamilyReunionA1Checklist: readonly ChecklistItem[] = [
  {
    id: 'requirement.identify-competent-mission',
    stage: 'requirement',
    action: 'Identify the German mission or authority competent for the application location',
    doneWhen: 'The official mission or authority page and the date checked are saved',
    owner: 'Competent German mission or receiving immigration authority',
    sourceRefs: [missionRequirementSource],
  },
  {
    id: 'requirement.record-language-proof-answer',
    stage: 'requirement',
    action: 'Record the authority’s current answer about the language proof and any exemption question',
    doneWhen: 'The exact route-specific wording and its source or official reply are recorded without turning it into an individual eligibility conclusion',
    owner: 'Competent German mission or receiving immigration authority',
    sourceRefs: [missionRequirementSource],
  },
  {
    id: 'exam-choice.record-accepted-product',
    stage: 'exam-choice',
    action: 'Record the exact adult A1 product that the receiving authority says may be used',
    doneWhen: 'The full product name and the authority evidence that applies to this route are saved together',
    owner: 'Competent German mission or receiving immigration authority',
    sourceRefs: [missionRequirementSource],
  },
  {
    id: 'exam-choice.match-owner-product',
    stage: 'exam-choice',
    action: 'Match the recorded product name to its exam-owner page',
    doneWhen: 'The adult product page, product name and source-check date agree',
    owner: 'Goethe-Institut or telc gGmbH',
    sourceRefs: [goetheProductSource, telcProductChecklistSource],
  },
  {
    id: 'booking.verify-selected-centre',
    stage: 'booking',
    action: 'Verify the selected centre through the relevant exam-owner route',
    doneWhen: 'A dated path from the exam owner to the selected centre or an official owner confirmation is saved',
    owner: 'Exam owner and selected official or authorised test centre',
    sourceRefs: [goetheCentreEntrySource, telcCentreEntrySource],
  },
  {
    id: 'booking.confirm-current-product',
    stage: 'booking',
    action: 'Confirm that the selected centre currently offers the exact adult A1 product',
    doneWhen: 'The centre’s current product name, intended session and checked date are recorded',
    owner: 'Selected official or authorised test centre',
    sourceRefs: [goetheCentreEntrySource, telcCentreEntrySource],
  },
  {
    id: 'booking.match-name-and-id',
    stage: 'booking',
    action: 'Match the booking name to the identification required by the selected centre',
    doneWhen: 'The spelling and the centre’s current identification instruction are recorded with no unresolved mismatch',
    owner: 'Selected official or authorised test centre',
    sourceRefs: [goetheCentreEntrySource, telcCentreEntrySource],
  },
  {
    id: 'booking.capture-transaction-terms',
    stage: 'booking',
    action: 'Capture the selected centre’s current fee and payment or change terms before paying',
    doneWhen: 'The dated fee, currency, payment, cancellation and rescheduling evidence is saved from that centre',
    owner: 'Selected official or authorised test centre',
    sourceRefs: [goetheCentreEntrySource, telcCentreEntrySource],
  },
  {
    id: 'exam-certificate.reopen-test-day-instructions',
    stage: 'exam-certificate',
    action: 'Reopen the selected centre’s current test-day instructions',
    doneWhen: 'The arrival, identification and permitted-items instructions for the booked session have been checked again',
    owner: 'Selected official or authorised test centre',
    sourceRefs: [goetheCentreEntrySource, telcCentreEntrySource],
  },
  {
    id: 'exam-certificate.record-result-certificate-route',
    stage: 'exam-certificate',
    action: 'Record the selected centre’s result and certificate route',
    doneWhen: 'The current result notice, certificate collection or delivery process and contact route are saved as planning inputs rather than guarantees',
    owner: 'Selected official or authorised test centre',
    sourceRefs: [goetheCentreEntrySource, telcCentreEntrySource],
  },
  {
    id: 'submission-review.open-route-checklist',
    stage: 'submission-review',
    action: 'Open the competent mission’s current checklist for the exact application route',
    doneWhen: 'The route-specific official checklist and its revision or checked date are saved',
    owner: 'Competent German mission or receiving immigration authority',
    sourceRefs: [missionRequirementSource],
  },
  {
    id: 'submission-review.verify-language-proof-form',
    stage: 'submission-review',
    action: 'Verify the required language-proof document form against the mission checklist',
    doneWhen: 'The exact certificate, original or copy question and any translation or verification instruction are recorded from the receiving authority',
    owner: 'Competent German mission or receiving immigration authority',
    sourceRefs: [missionRequirementSource],
  },
];

export const routeRegistry = [
  {
    id: 'germany-family-reunion-a1',
    country: 'germany',
    purpose: 'family-reunion',
    availability: 'configured',
    title: 'Germany family reunion: A1 verification route',
    shortTitle: 'Germany family reunion A1',
    receivingAuthority: 'the local German mission or competent German authority handling your application',
    officialAction: 'Confirm whether language proof is required in your individual case, whether an exemption applies, and which exact certificate is accepted before booking.',
    reminderOfficialEntry: {
      url: 'https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682',
      label: 'Federal Foreign Office spouse-language orientation',
      boundary: 'This points readers to the competent mission but does not decide an exemption, exact accepted certificate or document, or individual outcome.',
    },
    guide: { href: '/germany-family-reunion-a1/', label: 'Germany A1 family reunion guide' },
    checklist: germanyFamilyReunionA1Checklist,
  },
  {
    id: 'germany-b1', country: 'germany', purpose: 'b1', availability: 'verify-only',
    title: 'Germany B1 route: official verification required', shortTitle: 'Germany B1',
  },
  {
    id: 'germany-ausbildung', country: 'germany', purpose: 'ausbildung', availability: 'verify-only',
    title: 'Germany Ausbildung route: receiving organisation verification required', shortTitle: 'Germany Ausbildung',
  },
  {
    id: 'germany-nursing', country: 'germany', purpose: 'nursing', availability: 'verify-only',
    title: 'Germany nursing route: regulator and employer verification required', shortTitle: 'Germany nursing',
  },
  {
    id: 'germany-university', country: 'germany', purpose: 'university', availability: 'verify-only',
    title: 'Germany university route: university verification required', shortTitle: 'Germany university',
  },
];

export const safeRouteResult = {
  id: 'official-verification-required',
  availability: 'verify-only',
  title: 'Official verification required',
  officialAction: 'Ask the authority, university, employer, training provider, regulator, or other organisation receiving your application which language proof it requires and accepts.',
  authorityTypes: ['The authority or institution receiving the application', 'The official exam owner or authorised local centre'],
  officialEntry: { href: 'https://www.auswaertiges-amt.de/en', label: 'German Federal Foreign Office — find the responsible official authority' },
  questions: ['Which language proof and level apply to this exact route?', 'Is an exemption or alternative proof relevant to my case?', 'Which certificate, document format, and current submission instructions are accepted?'],
  nextSteps: [
    'Identify the organisation that receives your application or document.',
  ],
  guide: { href: '/guides/', label: 'Browse route guides' },
};

export function findRoute(input) {
  const country = String(input.country || '').trim().toLowerCase();
  const purpose = String(input.purpose || '').trim().toLowerCase();
  const configured = routeRegistry.find((route) => route.country === country && route.purpose === purpose && route.availability === 'configured');

  if (!configured) return {
    ...safeRouteResult,
    officialEntry: country === 'germany' ? safeRouteResult.officialEntry : null,
    officialEntryPending: country === 'germany' ? undefined : 'No country-specific official entry can be selected from “Another country”. Start with that country’s government or the institution receiving the application.',
    input,
  };

  return {
    ...configured,
    input,
    nextSteps: [
      'Verify the requirement or exemption with the German mission or competent authority for your application location.',
      'Confirm the exact accepted A1 certificate before comparing providers, fees, or dates.',
      'Use the checklist and timeline below to organise a booking and submission plan.',
    ],
  };
}

export interface RouteFinderInput {
  country?: unknown;
  purpose?: unknown;
  applicationRegionId?: unknown;
  relationship?: unknown;
  certificate?: unknown;
}

export interface RouteFinderBasisClaim {
  claimId: string;
  version: string;
  sourceCheckedAt: string | null;
  sources: readonly ClaimSourceRef[];
}

export interface RouteFinderResult {
  status: 'guidance_available' | 'needs_information' | 'needs_authority_confirmation' | 'unsupported';
  statusLabel: string;
  title: string;
  routeId: string | null;
  selectionSummary: readonly { label: string; value: string }[];
  guidance: string | null;
  basis: {
    ruleId: string;
    ruleVersion: string;
    claims: readonly RouteFinderBasisClaim[];
  } | null;
  missingInformation: readonly string[];
  responsibleParties: readonly string[];
  nextSteps: readonly string[];
  boundary: string;
  allowChecklist: boolean;
  guide: { href: string; label: string } | null;
}

export interface RouteFinderOptions {
  claims?: readonly Claim[];
  rules?: readonly RouteRule[];
  asOf?: string;
  claimVersions?: Readonly<Record<string, string>>;
  forceAuthorityConfirmation?: boolean;
  locale?: ToolLocale;
}

export type RouteFinderFollowUpQuestion = 'applicationRegionId' | 'relationship' | 'certificate';

/**
 * Keeps the Finder from collecting route details once country and purpose
 * already resolve to an unsupported path. The page uses this same bounded
 * contract to decide which follow-up fields participate in validation.
 */
export function getRouteFinderQuestionRelevance(input: Pick<RouteFinderInput, 'country' | 'purpose'>): readonly RouteFinderFollowUpQuestion[] {
  const country = String(input.country || '').trim().toLowerCase();
  const purpose = String(input.purpose || '').trim().toLowerCase();
  const route = routeRegistry.find((candidate) => candidate.country === country && candidate.purpose === purpose);
  return route?.availability === 'configured'
    ? ['applicationRegionId', 'relationship', 'certificate']
    : [];
}

const routeFinderStatusLabels = {
  guidance_available: 'Guidance available',
  needs_information: 'More information needed',
  needs_authority_confirmation: 'Authority confirmation needed',
  unsupported: 'Route not supported',
} as const;

const purposeLabels: Readonly<Record<string, string>> = {
  'family-reunion': 'Family reunion',
  b1: 'Settlement or citizenship / B1',
  ausbildung: 'Ausbildung',
  nursing: 'Nursing',
  university: 'University',
  other: 'Another purpose',
};

const certificateLabels: Readonly<Record<string, string>> = {
  none: 'No certificate yet',
  a1: 'Existing A1 certificate',
  other: 'Another existing certificate',
};

const selectionSummaryFor = (input: RouteFinderInput) => {
  const country = String(input.country || '').trim().toLowerCase();
  const purpose = String(input.purpose || '').trim().toLowerCase();
  const applicationRegionId = String(input.applicationRegionId || '').trim();
  const relationship = String(input.relationship || '').trim();
  const certificate = String(input.certificate || '').trim();
  return [
    { label: 'Country', value: country === 'germany' ? 'Germany' : country === 'other' ? 'Another country' : 'Not provided' },
    { label: 'Purpose', value: purposeLabels[purpose] || 'Not provided' },
    { label: 'Application region', value: applicationRegionOptions.find((option) => option.id === applicationRegionId)?.label || 'Not provided' },
    { label: 'Relationship', value: familyRelationshipOptions.find((option) => option.id === relationship)?.label || 'Not provided' },
    { label: 'Certificate', value: certificateLabels[certificate] || 'Not provided' },
  ];
};

const unsupportedFinderResult = (
  input: RouteFinderInput,
  title: string,
  nextSteps: readonly string[] = safeRouteResult.questions,
): RouteFinderResult => ({
  status: 'unsupported',
  statusLabel: routeFinderStatusLabels.unsupported,
  title,
  routeId: null,
  selectionSummary: selectionSummaryFor(input),
  guidance: null,
  basis: null,
  missingInformation: ['Route-specific rule and source coverage'],
  responsibleParties: safeRouteResult.authorityTypes,
  nextSteps,
  boundary: 'VisaLang has no current, source-reviewed rule for this selection. It cannot reuse the configured spouse-reunification A1 result or decide which proof applies.',
  allowChecklist: false,
  guide: null,
});

const finderBasisFor = (rule: RouteRule, claims: readonly Claim[]) => ({
  ruleId: rule.ruleId,
  ruleVersion: rule.version,
  claims: rule.claimRefs.map((required) => {
    const matches = claims.filter((claim) => claim.claimId === required.claimId && claim.version === required.version);
    const claim = matches.length === 1 ? matches[0] : undefined;
    return {
      claimId: required.claimId,
      version: required.version,
      sourceCheckedAt: claim?.sourceCheckedAt ?? null,
      sources: claim?.sourceRefs ?? [],
    };
  }),
});

/**
 * Maps bounded Finder inputs onto the existing versioned route-rule engine.
 * This wrapper owns presentation context only; it does not duplicate claim
 * validation or make an individual requirement, exemption, or acceptance call.
 */
function resolveRouteFinderBase(input: RouteFinderInput, options: RouteFinderOptions = {}): RouteFinderResult {
  const country = String(input.country || '').trim().toLowerCase();
  const purpose = String(input.purpose || '').trim().toLowerCase();
  const applicationRegionId = String(input.applicationRegionId || '').trim();
  const relationship = String(input.relationship || '').trim();
  const certificate = String(input.certificate || '').trim();
  const selectionSummary = selectionSummaryFor(input);

  const route = routeRegistry.find((candidate) => candidate.country === country && candidate.purpose === purpose);
  if (!country || !purpose) {
    const missingInformation = [!country ? 'country' : '', !purpose ? 'purpose' : ''].filter(Boolean);
    return {
      status: 'needs_information',
      statusLabel: routeFinderStatusLabels.needs_information,
      title: 'Add the route information first',
      routeId: null,
      selectionSummary,
      guidance: null,
      basis: null,
      missingInformation,
      responsibleParties: safeRouteResult.authorityTypes,
      nextSteps: ['Select the country and exact application purpose before relying on language-proof guidance.'],
      boundary: 'Missing route information is not evidence of an exemption or of a language-proof requirement.',
      allowChecklist: false,
      guide: null,
    };
  }
  if (!route || route.availability !== 'configured') {
    return unsupportedFinderResult(
      input,
      route?.title || 'This country and purpose are not configured',
      [
        'Identify the authority or institution receiving the application.',
        ...safeRouteResult.questions,
      ],
    );
  }
  if (relationship === 'other-family') {
    return unsupportedFinderResult(input, 'This configured route covers spouse reunification only', [
      'Find the competent German mission or receiving authority for the exact family relationship.',
      'Ask which language-proof question applies before selecting an exam or using the spouse checklist.',
    ]);
  }

  const missingInformation: string[] = [];
  if (!['germany-mission-china', 'germany-mission-outside-china'].includes(applicationRegionId)) missingInformation.push('application region');
  if (!familyRelationshipOptions.some((option) => option.id === relationship) || relationship === 'not-confirmed') missingInformation.push('relationship category');
  if (!Object.hasOwn(certificateLabels, certificate)) missingInformation.push('certificate status');

  const rules = options.rules ?? routeRules;
  const rule = rules.find((candidate) => candidate.routeId === route.id);
  const claims = options.claims ?? claimRegistry;
  const basis = rule ? finderBasisFor(rule, claims) : null;
  if (missingInformation.length) {
    return {
      status: 'needs_information',
      statusLabel: routeFinderStatusLabels.needs_information,
      title: 'Add the information needed to identify the responsible route',
      routeId: route.id,
      selectionSummary,
      guidance: null,
      basis,
      missingInformation,
      responsibleParties: [route.receivingAuthority],
      nextSteps: ['Confirm the missing item with the competent German mission or receiving authority, then run Route Finder again.'],
      boundary: 'Missing information cannot be treated as proof of an exception, requirement, or accepted certificate.',
      allowChecklist: false,
      guide: route.guide,
    };
  }

  const claimVersions = options.claimVersions ?? Object.fromEntries((rule?.claimRefs ?? []).map((claim) => [claim.claimId, claim.version]));
  const resolution = resolveRouteRule({
    routeId: route.id,
    applicationLocation: applicationRegionOptions.find((option) => option.id === applicationRegionId)?.label,
    claimVersions,
  }, { claims, rules, asOf: options.asOf });

  if (resolution.status !== 'guidance_available' || options.forceAuthorityConfirmation) {
    const status = resolution.status === 'needs_information' ? 'needs_information'
      : resolution.status === 'unsupported' ? 'unsupported'
        : 'needs_authority_confirmation';
    return {
      status,
      statusLabel: routeFinderStatusLabels[status],
      title: status === 'needs_information' ? 'More route information is needed' : status === 'unsupported' ? 'This route is not supported' : 'Reconfirm the route with the responsible authority',
      routeId: route.id,
      selectionSummary,
      guidance: null,
      basis,
      missingInformation: status === 'needs_information' ? ['versioned route evidence'] : ['Current deterministic route evidence'],
      responsibleParties: [route.receivingAuthority],
      nextSteps: [resolution.nextAction || 'Confirm the current route and proof requirements with the competent authority.'],
      boundary: rule?.boundary || 'VisaLang cannot produce deterministic guidance without a current, exact rule and claim set.',
      allowChecklist: false,
      guide: route.guide,
    };
  }

  if (certificate === 'a1' || certificate === 'other') {
    return {
      status: 'needs_authority_confirmation',
      statusLabel: routeFinderStatusLabels.needs_authority_confirmation,
      title: certificate === 'a1' ? 'Verify the existing A1 certificate for this route' : 'Verify the existing certificate for this route',
      routeId: route.id,
      selectionSummary,
      guidance: resolution.guidance ?? null,
      basis,
      missingInformation: ['Receiving-authority decision on the exact certificate'],
      responsibleParties: [route.receivingAuthority, 'The exam owner for the exact certificate product'],
      nextSteps: [
        'Record the exact certificate product, issuing body, issue date, and document form.',
        'Ask the competent mission or receiving authority whether that exact certificate and document form are accepted for this route and whether any recency question applies.',
        'Use the checklist to retain the authority answer and the product source separately.',
      ],
      boundary: 'Having a certificate does not prove that it is accepted, current enough for a receiving authority, or relevant to an exemption. Only the competent authority can decide the application-proof question.',
      allowChecklist: true,
      guide: route.guide,
    };
  }

  return {
    status: 'guidance_available',
    statusLabel: routeFinderStatusLabels.guidance_available,
    title: route.title,
    routeId: route.id,
    selectionSummary,
    guidance: resolution.guidance ?? null,
    basis,
    missingInformation: rule?.outstandingItems ?? [],
    responsibleParties: [route.receivingAuthority, 'The exam owner and selected official or authorised test centre'],
    nextSteps: [
      'Verify the language-proof question and any exception with the competent German mission or receiving authority.',
      'Confirm the exact accepted adult A1 product before comparing local booking options.',
      'Open the working checklist, then use Timeline only after you have current local dates and planning assumptions.',
    ],
    boundary: rule?.boundary || 'This is planning guidance, not an individual authority decision.',
    allowChecklist: true,
    guide: route.guide,
  };
}

export function resolveRouteFinder(input: RouteFinderInput, options: RouteFinderOptions = {}): RouteFinderResult {
  return localizeRouteFinderPresentation(resolveRouteFinderBase(input, options), options.locale);
}

export function getChecklist(routeId): readonly ChecklistItem[] {
  const route = routeRegistry.find((item) => item.id === routeId && item.availability === 'configured');
  if (!route || !('checklist' in route)) return [];
  return route.checklist;
}

export function buildChecklist(
  input: { routeId?: string },
  options: { locale?: ToolLocale } = {},
): ChecklistResult {
  const items = getChecklist(String(input.routeId || ''));
  if (!items.length) {
    return {
      status: 'unsupported',
      groups: [],
      boundary: translateRouteText('No route-specific checklist is configured. Use the organisation receiving the application to identify the applicable requirements.', options.locale),
    };
  }

  const localizedItems = options.locale === 'zh-CN' ? items.map((item) => {
    const itemCopy = checklistItemZh[item.id];
    return {
      ...item,
      ...(itemCopy ?? {}),
      sourceRefs: item.sourceRefs.map((source) => ({
        ...source,
        ...(checklistSourceZh[source.url] ?? {}),
      })),
    };
  }) : items;

  return {
    status: 'guidance_available',
    routeId: String(input.routeId),
    groups: checklistStageOrder.map((stage) => ({
      stage,
      items: localizedItems.filter((item) => item.stage === stage),
    })),
    boundary: translateRouteText('This is a language-proof preparation checklist, not a complete visa-document list, an eligibility decision, an exemption decision or an application outcome.', options.locale),
  };
}

export const TIMELINE_BUFFER_MAX_DAYS = 3650;

export function parseTimelineBufferDays(value) {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string' && !/^\d+$/.test(value.trim())) return null;
  const parsed = typeof value === 'string' ? Number(value.trim()) : value;
  return Number.isSafeInteger(parsed) && Number(parsed) >= 0 && Number(parsed) <= TIMELINE_BUFFER_MAX_DAYS
    ? Number(parsed)
    : null;
}

export const timelinePlanningContract = {
  dayUnit: 'calendar-days',
  maximumInputDays: TIMELINE_BUFFER_MAX_DAYS,
  variables: {
    D: { inputKey: 'targetDate', label: 'Target date' },
    W: { inputKey: 'resultWaitDays', label: 'Result and certificate wait' },
    P: { inputKey: 'documentPreparationDays', label: 'Document preparation' },
    R: { inputKey: 'retakeBufferDays', label: 'Additional retake buffer' },
  },
  formulas: {
    basePlanningDate: 'D - W - P',
    additionalBufferPlanningDate: 'D - W - P - R',
  },
  boundary: 'W, P and R are user-entered planning assumptions or locally confirmed inputs. They are not official defaults, and either calculated date does not guarantee a booking, result, certificate, acceptance or application outcome.',
  retakeBoundary: 'R is only an additional calendar-day buffer. It does not guarantee or automatically include a real next session, re-registration, another fee, another result wait or certificate delivery.',
} as const;

const parseTimelineCalendarDate = (value: unknown) => {
  const target = String(value || '');
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(target);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1) return null;
  const date = new Date(0);
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCFullYear(year, month - 1, day);
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
    ? { value: target, year, month, day, date }
    : null;
};

export function calculateTimeline(input) {
  const target = String(input.targetDate || '');
  const resultWaitDays = parseTimelineBufferDays(input.resultWaitDays);
  const retakeBufferDays = parseTimelineBufferDays(input.retakeBufferDays);
  // `translationDays` is a deprecated pre-M2 input alias. New UI and shared state use `documentPreparationDays`;
  // legacy URL migration normalises the old name before calling this calculator.
  const documentPreparationDays = parseTimelineBufferDays(input.documentPreparationDays ?? input.translationDays);
  if (resultWaitDays === null || retakeBufferDays === null || documentPreparationDays === null) return null;
  const parsedTarget = parseTimelineCalendarDate(target);
  if (!parsedTarget) return null;
  const targetTime = parsedTarget.date.getTime();
  const subtractDays = (days) => {
    const date = new Date(targetTime);
    date.setUTCDate(date.getUTCDate() - days);
    if (Number.isNaN(date.getTime()) || date.getUTCFullYear() < 1) return null;
    const formatted = date.toISOString().slice(0, 10);
    return /^\d{4}-\d{2}-\d{2}$/.test(formatted) ? formatted : null;
  };

  const basePlanningDays = resultWaitDays + documentPreparationDays;
  const additionalBufferPlanningDays = basePlanningDays + retakeBufferDays;
  const basePlanningDate = subtractDays(basePlanningDays);
  const additionalBufferPlanningDate = subtractDays(additionalBufferPlanningDays);
  if (!basePlanningDate || !additionalBufferPlanningDate) return null;

  return {
    targetDate: target,
    basePlanningDate,
    additionalBufferPlanningDate,
    basePlanningDays,
    additionalBufferPlanningDays,
    // Deprecated pre-M2 result aliases retained for internal compatibility only. No current UI exposes them.
    latestTestDate: basePlanningDate,
    cautiousTestDate: additionalBufferPlanningDate,
    totalPlanningDays: additionalBufferPlanningDays,
  };
}

export type TimelineCalendarDateState = 'past' | 'today' | 'future';
export type TimelineResultField = 'targetDate' | 'resultWaitDays' | 'documentPreparationDays' | 'retakeBufferDays' | 'today';

export type TimelineResultState =
  | {
    status: 'invalid';
    field: TimelineResultField;
    reason: 'invalid-target-date' | 'invalid-buffer' | 'calculation-out-of-range' | 'invalid-today';
    message: string;
  }
  | {
    status: 'calculated';
    calculation: NonNullable<ReturnType<typeof calculateTimeline>>;
    basePlanningDateState: TimelineCalendarDateState;
    additionalBufferPlanningDateState: TimelineCalendarDateState;
    requiresAttention: boolean;
    today: string;
  };

const timelineBufferLabels: Readonly<Record<Exclude<TimelineResultField, 'targetDate' | 'today'>, string>> = {
  resultWaitDays: 'result and certificate wait',
  documentPreparationDays: 'document preparation',
  retakeBufferDays: 'additional retake buffer',
};

const calendarDateState = (value: string, today: string): TimelineCalendarDateState => value < today ? 'past' : value > today ? 'future' : 'today';

export function getLocalCalendarDate(now: Date = new Date()): string {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) throw new TypeError('A valid date is required.');
  const year = String(now.getFullYear()).padStart(4, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTimelineResultState(
  input: unknown,
  options: { today?: string; locale?: ToolLocale } = {},
): TimelineResultState {
  const isZh = options.locale === 'zh-CN';
  const values = input && typeof input === 'object' && !Array.isArray(input) ? input as Record<string, unknown> : {};
  if (!parseTimelineCalendarDate(values.targetDate)) {
    return {
      status: 'invalid',
      field: 'targetDate',
      reason: 'invalid-target-date',
      message: isZh ? '请输入 YYYY-MM-DD 格式的真实目标日期。' : 'Enter a real target date in YYYY-MM-DD format.',
    };
  }
  for (const field of ['resultWaitDays', 'documentPreparationDays', 'retakeBufferDays'] as const) {
    if (parseTimelineBufferDays(values[field]) === null) {
      return {
        status: 'invalid',
        field,
        reason: 'invalid-buffer',
        message: isZh
          ? `请用数字输入 0 到 ${TIMELINE_BUFFER_MAX_DAYS} 之间的整数。`
          : `Enter the ${timelineBufferLabels[field]} as a whole number from 0 to ${TIMELINE_BUFFER_MAX_DAYS} using digits only.`,
      };
    }
  }

  const calculation = calculateTimeline(values);
  if (!calculation) {
    return {
      status: 'invalid',
      field: 'targetDate',
      reason: 'calculation-out-of-range',
      message: isZh ? '这些缓冲期会把规划日期推到公元 0001 年以前。请缩短缓冲期或选择更晚的目标日期。' : 'These buffers move a planning date before year 0001. Reduce the buffers or use a later target date.',
    };
  }

  const today = options.today ?? getLocalCalendarDate();
  if (!parseTimelineCalendarDate(today)) {
    return {
      status: 'invalid',
      field: 'today',
      reason: 'invalid-today',
      message: isZh ? '需要有效的参考日期，才能判断规划日期所处时间。' : 'A valid reference date is required before classifying the planning dates.',
    };
  }
  const basePlanningDateState = calendarDateState(calculation.basePlanningDate, today);
  const additionalBufferPlanningDateState = calendarDateState(calculation.additionalBufferPlanningDate, today);
  return {
    status: 'calculated',
    calculation,
    basePlanningDateState,
    additionalBufferPlanningDateState,
    requiresAttention: basePlanningDateState === 'past' || additionalBufferPlanningDateState === 'past',
    today,
  };
}

interface ExamComparisonValidationOptions {
  products?: readonly ExamProduct[];
  claims?: readonly Claim[];
  asOf?: string;
  consumerId?: string;
  consumerLocale?: ClaimConsumerLocale;
  locale?: 'en' | 'zh-CN';
}

const comparisonFactIds = [
  'written-structure-and-duration',
  'oral-format-and-duration',
  'score-rule',
  'whole-or-partial-sitting',
] as const;

const isCurrentComparisonProduct = (product: ExamProduct, options: Required<Pick<ExamComparisonValidationOptions, 'claims' | 'asOf' | 'consumerId' | 'consumerLocale'>>) => {
  if (!product || !product.productClaim || !Array.isArray(product.usedBy) || !Array.isArray(product.comparisonFacts) || product.comparisonFacts.some((fact) => !fact || !fact.source)) return false;
  const hasText = (value: unknown) => typeof value === 'string' && value.trim().length > 0;
  const boundaryIsValid = (value: unknown) => {
    if (!value || typeof value !== 'object') return false;
    const record = value as Record<string, unknown>;
    return ['responsibleParty', 'confirmationAction', 'boundary'].every((key) => hasText(record[key]))
      && record.status === 'needs_authority_confirmation';
  };
  if (!['A1', 'B1'].includes(product.level)
    || !hasText(product.localExecutionBoundary)
    || !boundaryIsValid(product.localFee) || product.localFee.amount !== null || product.localFee.currency !== null
    || !boundaryIsValid(product.acceptance)) return false;
  const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  const claim = options.claims.find((candidate) => candidate.claimId === product.productClaim.claimId && candidate.version === product.productClaim.version);
  const checkedAtIsValid = isDate(product.sourceCheckedAt) && product.sourceCheckedAt <= options.asOf
    && (product.effectiveFrom === null || isDate(product.effectiveFrom))
    && (product.effectiveTo === null || isDate(product.effectiveTo))
    && (product.effectiveFrom === null || product.effectiveFrom <= options.asOf)
    && (product.effectiveTo === null || product.effectiveTo >= options.asOf);
  const factsAreValid = product.comparisonFacts.length === comparisonFactIds.length
    && new Set(product.comparisonFacts.map((fact) => fact.id)).size === comparisonFactIds.length
    && comparisonFactIds.every((id) => product.comparisonFacts.some((fact) => fact.id === id))
    && product.comparisonFacts.every((fact) => fact.status === 'verified'
      && fact.sourceCheckedAt === product.sourceCheckedAt
      && Boolean(fact.value && fact.valueZh && fact.source.publisher && fact.source.locator && fact.source.supports && fact.source.boundary)
      && /^https:\/\//.test(fact.source.url));
  return product.status === 'verified'
    && claim?.examProduct === product.name
    && product.reviewedBy === 'source-review'
    && product.version === product.productClaim.version
    && product.usedBy.includes(options.consumerId)
    && checkedAtIsValid
    && factsAreValid
    && validateClaimSet([product.productClaim], {
      claims: options.claims,
      asOf: options.asOf,
      consumerId: options.consumerId,
      consumerLocale: options.consumerLocale,
    }).valid;
};

export function getExamComparisonOptions(options: ExamComparisonValidationOptions = {}) {
  const products = options.products ?? examProducts;
  const validation = {
    claims: options.claims ?? claimRegistry,
    asOf: options.asOf ?? currentClaimAsOf(),
    consumerId: options.consumerId ?? 'tool:exam-comparison',
    consumerLocale: options.consumerLocale ?? 'multi-lingual',
  };
  return products.filter((product) => product && products.filter((candidate) => candidate?.id === product.id).length === 1 && isCurrentComparisonProduct(product, validation)).map((product) => ({
    id: product.id,
    label: product.name,
    officialUrl: product.officialUrl,
    officialPracticeUrl: product.officialPracticeUrl,
  }));
}

export const examComparisonOptions = getExamComparisonOptions();

export function compareExamProducts(firstId, secondId, options: ExamComparisonValidationOptions = {}) {
  const products = options.products ?? examProducts;
  const validation = {
    claims: options.claims ?? claimRegistry,
    asOf: options.asOf ?? currentClaimAsOf(),
    consumerId: options.consumerId ?? 'tool:exam-comparison',
    consumerLocale: options.consumerLocale ?? 'multi-lingual',
  };
  const locale = options.locale ?? 'en';
  const firstMatches = products.filter((product) => product?.id === firstId);
  const secondMatches = products.filter((product) => product?.id === secondId);
  const first = firstMatches.length === 1 ? firstMatches[0] : undefined;
  const second = secondMatches.length === 1 ? secondMatches[0] : undefined;

  if (!first || !second || !isCurrentComparisonProduct(first, validation) || !isCurrentComparisonProduct(second, validation)) {
    return {
      status: 'unsupported',
      message: locale === 'zh-CN' ? '请选择两个受支持且已经来源复核的考试产品。' : 'Choose two supported, source-reviewed exam products.',
    };
  }
  if (first.id === second.id) {
    return {
      status: 'same_product',
      message: locale === 'zh-CN' ? '请选择两个不同的考试产品；同一产品不能与自身比较。' : 'Choose two different exam products. A product cannot be compared with itself.',
    };
  }

  if (first.level !== second.level) {
    return { status: 'unsupported', message: locale === 'zh-CN' ? '请选择同一等级的两个考试产品（A1 与 A1，或 B1 与 B1）；不同等级不能作为等同选项比较。' : 'Choose two products at the same level (A1 with A1, or B1 with B1). Different levels are not equivalent options.' };
  }

  const secondFacts = new Map(second.comparisonFacts.map((fact) => [fact.id, fact]));
  const localRows = [
    {
      id: 'local-execution',
      label: locale === 'zh-CN' ? '本地执行、日期与出证' : 'Local execution, dates and results',
      firstValue: locale === 'zh-CN' ? '当地场次、报名、考试日、出分和证书流程须向所选官方或授权考点确认。' : first.localExecutionBoundary,
      secondValue: locale === 'zh-CN' ? '当地场次、报名、考试日、出分和证书流程须向所选官方或授权考点确认。' : second.localExecutionBoundary,
      firstStatus: 'needs_authority_confirmation',
      secondStatus: 'needs_authority_confirmation',
      firstOwner: locale === 'zh-CN' ? '所选官方或授权考点' : first.localFee.responsibleParty,
      secondOwner: locale === 'zh-CN' ? '所选官方或授权考点' : second.localFee.responsibleParty,
      firstAction: locale === 'zh-CN' ? '在付款或安排行程前，向所选考点核验当前当地条款。' : first.localFee.confirmationAction,
      secondAction: locale === 'zh-CN' ? '在付款或安排行程前，向所选考点核验当前当地条款。' : second.localFee.confirmationAction,
      firstBoundary: locale === 'zh-CN' ? '考试主办方产品事实不能证明特定考点当前的交易安排。' : first.localFee.boundary,
      secondBoundary: locale === 'zh-CN' ? '考试主办方产品事实不能证明特定考点当前的交易安排。' : second.localFee.boundary,
      firstSourceUrl: null,
      secondSourceUrl: null,
    },
    {
      id: 'local-fee-and-booking',
      label: locale === 'zh-CN' ? '当地费用与报名' : 'Local fee and booking',
      firstValue: locale === 'zh-CN' ? '此处未核实当地金额或报名可用性。' : 'No local amount or booking availability is verified here.',
      secondValue: locale === 'zh-CN' ? '此处未核实当地金额或报名可用性。' : 'No local amount or booking availability is verified here.',
      firstStatus: first.localFee.status,
      secondStatus: second.localFee.status,
      firstOwner: locale === 'zh-CN' ? '所选官方或授权考点' : first.localFee.responsibleParty,
      secondOwner: locale === 'zh-CN' ? '所选官方或授权考点' : second.localFee.responsibleParty,
      firstAction: locale === 'zh-CN' ? '向所选考点核验当前费用、币种、名额、付款、取消和改期条款。' : first.localFee.confirmationAction,
      secondAction: locale === 'zh-CN' ? '向所选考点核验当前费用、币种、名额、付款、取消和改期条款。' : second.localFee.confirmationAction,
      firstBoundary: locale === 'zh-CN' ? '此比较不提供或推断当地金额与报名可用性。' : first.localFee.boundary,
      secondBoundary: locale === 'zh-CN' ? '此比较不提供或推断当地金额与报名可用性。' : second.localFee.boundary,
      firstSourceUrl: null,
      secondSourceUrl: null,
    },
    {
      id: 'receiving-authority-acceptance',
      label: locale === 'zh-CN' ? '接收机关是否接受' : 'Receiving-authority acceptance',
      firstValue: locale === 'zh-CN' ? '此处未核实你的路线是否接受该证明。' : 'Acceptance for your route is not verified here.',
      secondValue: locale === 'zh-CN' ? '此处未核实你的路线是否接受该证明。' : 'Acceptance for your route is not verified here.',
      firstStatus: first.acceptance.status,
      secondStatus: second.acceptance.status,
      firstOwner: locale === 'zh-CN' ? '负责你准确申请路线的接收机关' : first.acceptance.responsibleParty,
      secondOwner: locale === 'zh-CN' ? '负责你准确申请路线的接收机关' : second.acceptance.responsibleParty,
      firstAction: locale === 'zh-CN' ? '向接收机关确认该准确证书产品及文件形式是否适用于你的路线。' : first.acceptance.confirmationAction,
      secondAction: locale === 'zh-CN' ? '向接收机关确认该准确证书产品及文件形式是否适用于你的路线。' : second.acceptance.confirmationAction,
      firstBoundary: locale === 'zh-CN' ? '考试主办方只定义产品，不能替接收机关作接受决定。' : first.acceptance.boundary,
      secondBoundary: locale === 'zh-CN' ? '考试主办方只定义产品，不能替接收机关作接受决定。' : second.acceptance.boundary,
      firstSourceUrl: null,
      secondSourceUrl: null,
    },
  ] as const;
  return {
    status: 'ready',
    first: {
      id: first.id,
      name: first.name,
      officialUrl: first.officialUrl,
      officialPracticeUrl: first.officialPracticeUrl,
      localExecutionBoundary: first.localExecutionBoundary,
    },
    second: {
      id: second.id,
      name: second.name,
      officialUrl: second.officialUrl,
      officialPracticeUrl: second.officialPracticeUrl,
      localExecutionBoundary: second.localExecutionBoundary,
    },
    rows: first.comparisonFacts.flatMap((firstFact) => {
      const secondFact = secondFacts.get(firstFact.id);
      if (!secondFact) return [];
      return [{
        id: firstFact.id,
        label: locale === 'zh-CN' ? firstFact.labelZh : firstFact.label,
        firstValue: locale === 'zh-CN' ? firstFact.valueZh : firstFact.value,
        secondValue: locale === 'zh-CN' ? secondFact.valueZh : secondFact.value,
        firstSourceUrl: firstFact.source.url,
        secondSourceUrl: secondFact.source.url,
        firstSourceCheckedAt: firstFact.sourceCheckedAt,
        secondSourceCheckedAt: secondFact.sourceCheckedAt,
      }];
    }),
    localRows,
  };
}
