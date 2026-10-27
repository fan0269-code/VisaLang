import {
  resolveGuideContentStatus,
  type ContentStatus,
  type SourceReviewStatus,
} from './source-review.ts';
import { getChineseGuidePublicationPolicy } from './publication-manifest.ts';

interface ZhGuideDiscoveryInput {
  slug: string;
  contentStatus: ContentStatus;
  sourceReviewStatus?: SourceReviewStatus;
  updatedDate: string;
  noindex?: boolean;
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
    .filter((guide) => getChineseGuidePublicationPolicy({
      slug: guide.slug,
      contentStatus: guide.status,
      sourceReviewStatus: guide.sourceReviewStatus,
      noindex: guide.noindex,
    }).index)
    .sort((a, b) => b.updatedDate.localeCompare(a.updatedDate));
}
