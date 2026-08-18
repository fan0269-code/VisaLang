import {
  isGuidePrimaryDiscoveryEligible,
  resolveGuideContentStatus,
  type ContentStatus,
  type SourceReviewStatus,
} from './source-review.ts';

interface ZhGuideDiscoveryInput {
  contentStatus: ContentStatus;
  sourceReviewStatus?: SourceReviewStatus;
  updatedDate: string;
}

export function getPrimaryDiscoveryZhGuides<T extends ZhGuideDiscoveryInput>(guides: readonly T[]) {
  return guides
    .map((guide) => {
      const sourceReviewStatus = guide.sourceReviewStatus ?? 'pending';
      return {
        ...guide,
        sourceReviewStatus,
        status: resolveGuideContentStatus({ ...guide, category: 'germany-a1', sourceReviewStatus }),
      };
    })
    .filter((guide) => isGuidePrimaryDiscoveryEligible(guide.status, guide.sourceReviewStatus))
    .sort((a, b) => b.updatedDate.localeCompare(a.updatedDate));
}
