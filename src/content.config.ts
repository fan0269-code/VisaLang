import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { comparisonScopes, contentStatuses, decisionStages, highRiskRouteCategories, reviewerRoles, sourceReviewStatuses } from './data/source-review';

const guideSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  slug: z.string(),
  publishedDate: z.string(),
  updatedDate: z.string(),
  sourceReviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  sourceReviewStatus: z.enum(sourceReviewStatuses).default('pending'),
  reviewedByRole: z.enum(reviewerRoles).optional(),
  contentStatus: z.enum(contentStatuses),
  primaryIntent: z.string().min(1).optional(),
  decisionStage: z.enum(decisionStages).default('requirement'),
  nextGuideSlug: z.string().min(1).optional(),
  supportingGuideSlugs: z.array(z.string()).default([]),
  comparisonScope: z.enum(comparisonScopes).default('same-route'),
  audienceScope: z.string().min(1).optional(),
  finalDecisionAuthorityType: z.string().min(1).optional(),
  primaryOfficialAuthorityUrl: z.string().url().refine((url) => url.startsWith('https://'), 'primaryOfficialAuthorityUrl must use HTTPS').optional(),
  examOwnerUrl: z.string().url().refine((url) => url.startsWith('https://'), 'examOwnerUrl must use HTTPS').optional(),
  localExecutionPrompt: z.string().min(1).optional(),
  author: z.string().default('VisaLang Editorial team'),
  readingTime: z.string().default('5'),
  featured: z.boolean().default(false),
  eyebrow: z.string().optional(),
  route: z.string().optional(),
}).superRefine((guide, context) => {
  if (highRiskRouteCategories.includes(guide.category as typeof highRiskRouteCategories[number])) {
    for (const field of ['primaryIntent', 'audienceScope', 'finalDecisionAuthorityType', 'examOwnerUrl', 'localExecutionPrompt'] as const) {
      if (!guide[field]) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [field],
          message: `${field} is required for an audited high-risk route`,
        });
      }
    }
  }
  if (guide.sourceReviewStatus === 'reviewed' && !guide.sourceReviewedAt) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['sourceReviewedAt'],
      message: 'sourceReviewedAt is required when sourceReviewStatus is reviewed',
    });
  }
  if (guide.sourceReviewStatus === 'reviewed' && !guide.reviewedByRole) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['reviewedByRole'],
      message: 'reviewedByRole is required when sourceReviewStatus is reviewed',
    });
  }
  if (guide.sourceReviewStatus !== 'reviewed' && guide.sourceReviewedAt) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['sourceReviewedAt'],
      message: 'sourceReviewedAt is only valid when sourceReviewStatus is reviewed',
    });
  }
  if (guide.nextGuideSlug && guide.nextGuideSlug === guide.slug) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['nextGuideSlug'], message: 'nextGuideSlug cannot point to the current guide' });
  }
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: guideSchema,
});

export const collections = { guides };
