export const sourceReviewStatuses = ['reviewed', 'pending', 'not-applicable'] as const;
export type SourceReviewStatus = typeof sourceReviewStatuses[number];

export const reviewerRoles = ['editorial', 'source-review', 'translation-review'] as const;
export type ReviewerRole = typeof reviewerRoles[number];

export const contentStatuses = ['complete-route', 'core-route', 'starter-overview', 'verification-pending'] as const;
export type ContentStatus = typeof contentStatuses[number];

export const decisionStages = ['requirement', 'choice', 'local-execution', 'submission-review'] as const;
export type DecisionStage = typeof decisionStages[number];

export const comparisonScopes = ['same-route', 'cross-country-comparison'] as const;
export type ComparisonScope = typeof comparisonScopes[number];

export const contentStatusLabels: Record<ContentStatus, string> = {
  'complete-route': 'Complete route',
  'core-route': 'Core route',
  'starter-overview': 'Starter overview',
  'verification-pending': 'Verification pending',
};

export const reviewerRoleLabels: Record<ReviewerRole, string> = {
  editorial: 'Editorial team',
  'source-review': 'Source review',
  'translation-review': 'Translation review',
};

export interface StatusCtaContext {
  routeHref?: string;
  primaryOfficialAuthorityUrl?: string;
  examOwnerUrl?: string;
  nextGuideSlug?: string;
}

export interface StatusCta { label: string; href: string; kind: 'route' | 'official' | 'guide' | 'tool'; }

export function contentStatusCtas(status: ContentStatus, context: StatusCtaContext): StatusCta[] {
  const route = context.routeHref ? [{ label: 'Browse this route', href: context.routeHref, kind: 'route' as const }] : [];
  const authority = context.primaryOfficialAuthorityUrl ? [{ label: 'Check the deciding authority', href: context.primaryOfficialAuthorityUrl, kind: 'official' as const }] : [];
  const examOwner = context.examOwnerUrl ? [{ label: 'Check the official exam owner', href: context.examOwnerUrl, kind: 'official' as const }] : [];
  const nextGuide = context.nextGuideSlug ? [{ label: 'Continue to the next guide', href: `/guides/${context.nextGuideSlug}/`, kind: 'guide' as const }] : [];
  if (status === 'complete-route') {
    return [...nextGuide, ...route, { label: 'Use Route Finder', href: '/tools/route-finder/', kind: 'tool' }, { label: 'Build a checklist', href: '/tools/checklist-generator/', kind: 'tool' }].slice(0, 3);
  }
  if (status === 'core-route') return [...nextGuide, ...authority, ...examOwner, ...route].slice(0, 3);
  if (status === 'starter-overview') return [...authority, ...examOwner, ...route].slice(0, 3);
  return [...authority, ...route].slice(0, 2);
}

export const highRiskRouteCategories = ['portugal', 'spain', 'uk', 'canada', 'italy', 'france', 'finland', 'netherlands'] as const;

export interface GuideStatusGateInput {
  contentStatus: ContentStatus;
  category: string;
  sourceReviewStatus: SourceReviewStatus;
  primaryOfficialAuthorityUrl?: string;
  primaryIntent?: string;
  audienceScope?: string;
  finalDecisionAuthorityType?: string;
  examOwnerUrl?: string;
  localExecutionPrompt?: string;
}

export function resolveGuideContentStatus(guide: GuideStatusGateInput): ContentStatus {
  const isHighRiskGuide = highRiskRouteCategories.includes(guide.category as typeof highRiskRouteCategories[number]);
  const requestsElevatedStatus = guide.contentStatus === 'complete-route' || guide.contentStatus === 'core-route';
  if (isHighRiskGuide && requestsElevatedStatus && (!guide.primaryOfficialAuthorityUrl || guide.sourceReviewStatus !== 'reviewed')) {
    return 'verification-pending';
  }
  return guide.contentStatus;
}
