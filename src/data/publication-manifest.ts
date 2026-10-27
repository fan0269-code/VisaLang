import type { ContentStatus, SourceReviewStatus } from './source-review';

export type PublicationDisposition = 'pillar' | 'pending' | 'redirect' | 'retained' | 'category';

export interface PublicationPolicy {
  disposition: PublicationDisposition;
  index: boolean;
  sitemap: boolean;
  ads: boolean;
}

export interface EnglishGuidePublicationInput {
  slug: string;
  contentStatus: ContentStatus;
  sourceReviewStatus: SourceReviewStatus;
  noindex?: boolean;
  adsEligible?: boolean;
}

export interface ChineseGuidePublicationInput {
  slug: string;
  contentStatus: ContentStatus;
  sourceReviewStatus: SourceReviewStatus;
  noindex?: boolean;
}

export const englishPillarSlugs = [
  'german-family-reunion-language-requirement',
  'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers',
  'goethe-a1-fees-by-country',
  'german-a1-exam-booking-timeline',
  'german-a1-documents-checklist',
  'goethe-a1-30-day-study-plan',
  'goethe-b1-germany-settlement-work',
  'germany-b1-citizenship-language-proof',
  'germany-b1-leben-in-deutschland-and-language-proof',
  'goethe-b1-vs-telc-b1',
  'goethe-b1-fees-and-booking',
  'germany-b1-settlement-citizenship-timeline',
  'germany-b1-settlement-citizenship-checklist',
  'goethe-b1-study-plan',
] as const;

export const chinesePillarSlugs = [
  'german-family-reunion-language-requirement',
  'goethe-a1-vs-telc-a1',
  'goethe-a1-test-centers',
  'german-a1-exam-booking-timeline',
  'goethe-a1-30-day-study-plan',
] as const;

export const noindexCategorySlugs = [
  'germany-a1',
  'germany-b1',
  'germany-testdaf',
  'germany-telc',
  'uk',
  'canada',
  'italy',
  'spain',
  'france',
  'finland',
  'netherlands',
  'portugal',
] as const;

// Historical candidates, never an active redirect instruction.
export const guideRedirectCandidates: Readonly<Record<string, string>> = {
  '/guides/german-a1-family-reunion-faq/': '/guides/german-family-reunion-language-requirement/',
  '/guides/goethe-a1-pre-booking-checklist/': '/guides/goethe-a1-test-centers/',
  '/guides/goethe-a1-booking-mistakes/': '/guides/goethe-a1-test-centers/',
  '/guides/goethe-a1-retake-policy/': '/guides/german-a1-exam-booking-timeline/',
  '/guides/goethe-a1-study-plan-working-adults/': '/guides/goethe-a1-30-day-study-plan/',
  '/guides/goethe-a1-official-links-practice-resources/': '/guides/goethe-a1-30-day-study-plan/',
  '/guides/goethe-a1-listening-practice/': '/guides/goethe-a1-30-day-study-plan/',
  '/guides/goethe-a1-speaking-topics/': '/guides/goethe-a1-30-day-study-plan/',
  '/guides/goethe-a1-writing-practice/': '/guides/goethe-a1-30-day-study-plan/',
  '/guides/goethe-b1-difficulty-analysis/': '/guides/goethe-b1-study-plan/',
  '/guides/goethe-b1-mock-exam-routine/': '/guides/goethe-b1-study-plan/',
  '/guides/goethe-b1-listening-deep-dive/': '/guides/goethe-b1-study-plan/',
  '/guides/goethe-b1-speaking-topics/': '/guides/goethe-b1-study-plan/',
  '/guides/goethe-b1-writing-assessment/': '/guides/goethe-b1-study-plan/',
  '/zh/guides/goethe-a1-germany-family-reunion/': '/zh/guides/german-family-reunion-language-requirement/',
  '/zh/guides/goethe-a1-booking-mistakes/': '/zh/guides/goethe-a1-test-centers/',
  '/zh/guides/german-a1-documents-checklist/': '/zh/guides/german-a1-exam-booking-timeline/',
};

export const guideRedirects: Readonly<Record<string, string>> = {
};

export const retainedGuidePaths = Object.keys(guideRedirectCandidates);
const retainedPathSet = new Set(retainedGuidePaths);

const englishPillarSet = new Set<string>(englishPillarSlugs);
const chinesePillarSet = new Set<string>(chinesePillarSlugs);
const noindexCategorySet = new Set<string>(noindexCategorySlugs);
const redirectSourceSet = new Set(Object.keys(guideRedirects));

const closedPolicy = (disposition: PublicationDisposition): PublicationPolicy => ({
  disposition,
  index: false,
  sitemap: false,
  ads: false,
});

export function isEnglishPillarSlug(slug: string): boolean {
  return englishPillarSet.has(slug);
}

export function isChinesePillarSlug(slug: string): boolean {
  return chinesePillarSet.has(slug);
}

export function isNoindexCategorySlug(slug: string): boolean {
  return noindexCategorySet.has(slug);
}

export function getEnglishGuidePublicationPolicy(input: EnglishGuidePublicationInput): PublicationPolicy {
  if (retainedPathSet.has(`/guides/${input.slug}/`)) return closedPolicy('retained');
  if (redirectSourceSet.has(`/guides/${input.slug}/`)) return closedPolicy('redirect');
  const mature = input.sourceReviewStatus === 'reviewed'
    && (input.contentStatus === 'complete-route' || input.contentStatus === 'core-route');
  if (!englishPillarSet.has(input.slug) || !mature || input.noindex === true) return closedPolicy('pending');
  return { disposition: 'pillar', index: true, sitemap: true, ads: input.adsEligible !== false };
}

export function getChineseGuidePublicationPolicy(input: ChineseGuidePublicationInput): PublicationPolicy {
  if (retainedPathSet.has(`/zh/guides/${input.slug}/`)) return closedPolicy('retained');
  if (redirectSourceSet.has(`/zh/guides/${input.slug}/`)) return closedPolicy('redirect');
  const mature = input.sourceReviewStatus === 'reviewed'
    && (input.contentStatus === 'complete-route' || input.contentStatus === 'core-route');
  if (!chinesePillarSet.has(input.slug) || !mature || input.noindex === true) return closedPolicy('pending');
  return { disposition: 'pillar', index: true, sitemap: true, ads: false };
}

export function getCategoryPublicationPolicy(_slug: string): PublicationPolicy {
  return closedPolicy('category');
}
