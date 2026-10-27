import type { ContentStatus, DecisionStage, ReviewerRole, SourceReviewStatus } from './source-review';
import type { PublicationDisposition } from './publication-manifest';
import { validateClaimSet, type Claim, type ClaimVersionRef } from './claim-registry.ts';

export interface ZhGermanyA1Guide {
  slug: string;
  title: string;
  description: string;
  directAnswer?: string;
  claimRefs?: readonly ClaimVersionRef[];
  href: string;
  englishHref: string;
  publishedDate: string;
  updatedDate: string;
  readingTime: string;
  publicationDisposition: PublicationDisposition;
  noindex: boolean;
  adsEligible: boolean;
  contentStatus: ContentStatus;
  sourceReviewStatus: SourceReviewStatus;
  sourceReviewedAt?: string;
  reviewedByRole?: ReviewerRole;
  author: string;
  audienceScope: string;
  finalDecisionAuthorityType: string;
  primaryOfficialAuthorityUrl: string;
  examOwnerUrl: string;
  localExecutionPrompt: string;
  decisionStage: DecisionStage;
  nextGuideSlug?: string;
  supportingGuideSlugs: string[];
}

export const zhGermanyA1Guides: ZhGermanyA1Guide[] = [
{
  "slug": "goethe-a1-germany-family-reunion",
  "title": "已有 Goethe A1 证书：递签前核对什么",
  "description": "先记录准确证书名称与考试日期，再打开实际递签地主管机关当前入口，核对它要求的证书、材料形式和日期；仍不清楚就带着一个具体问题询问。",
  "href": "/zh/guides/goethe-a1-germany-family-reunion/",
  "englishHref": "/guides/goethe-a1-germany-family-reunion/",
  "publishedDate": "2026-07-09",
  "updatedDate": "2026-09-22",
  "readingTime": "4",
  "publicationDisposition": "retained",
  "noindex": true,
  "adsEligible": false,
  "contentStatus": "core-route",
  "sourceReviewStatus": "reviewed",
  "sourceReviewedAt": "2026-09-22",
  "reviewedByRole": "translation-review",
  "author": "VisaLang Editorial team",
  "audienceScope": "已有证书、准备向主管德国使领馆提交语言证明的读者。",
  "finalDecisionAuthorityType": "主管德国使领馆",
  "primaryOfficialAuthorityUrl": "https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606",
  "examOwnerUrl": "https://www.goethe.de/en/spr/prf.html",
  "localExecutionPrompt": "现在打开实际递签地主管德国使领馆的当前入口；记录准确证书名称、考试日期、官方要求、来源链接和检查日。要求不明确时，保存一个待答问题。",
  "decisionStage": "local-execution",
  "nextGuideSlug": "german-family-reunion-language-requirement",
  "supportingGuideSlugs": [
    "german-family-reunion-language-requirement"
  ]
},
{
  "slug": "goethe-a1-booking-mistakes",
  "title": "Goethe A1 报名出错：如何向考点核实",
  "description": "在中国选择考点、遇到姓名、付款或报名确认问题的成人 A1 考生。",
  "href": "/zh/guides/goethe-a1-booking-mistakes/",
  "englishHref": "/guides/goethe-a1-booking-mistakes/",
  "publishedDate": "2026-07-09",
  "updatedDate": "2026-09-22",
  "readingTime": "4",
  "publicationDisposition": "retained",
  "noindex": true,
  "adsEligible": false,
  "contentStatus": "core-route",
  "sourceReviewStatus": "reviewed",
  "sourceReviewedAt": "2026-09-22",
  "reviewedByRole": "translation-review",
  "author": "VisaLang Editorial team",
  "audienceScope": "在中国选择考点、遇到姓名、付款或报名确认问题的成人 A1 考生。",
  "finalDecisionAuthorityType": "所选考试中心；北京说明只适用于北京",
  "primaryOfficialAuthorityUrl": "https://www.goethe.de/ins/cn/zh/spr/prf/anm.html",
  "examOwnerUrl": "https://www.goethe.de/en/spr/prf.html",
  "localExecutionPrompt": "按所选考点及主管使领馆的当前说明逐项核验，不将本站整理表当成官方完整清单。",
  "decisionStage": "local-execution",
  "nextGuideSlug": "goethe-a1-test-centers",
  "supportingGuideSlugs": [
    "goethe-a1-test-centers"
  ]
},
{
  "slug": "german-a1-documents-checklist",
  "title": "德国 A1 材料：分清报名、考试和递签",
  "description": "需要将考试材料与签证申请材料分开整理的中文读者。",
  "href": "/zh/guides/german-a1-documents-checklist/",
  "englishHref": "/guides/german-a1-documents-checklist/",
  "publishedDate": "2026-07-09",
  "updatedDate": "2026-09-22",
  "readingTime": "4",
  "publicationDisposition": "retained",
  "noindex": true,
  "adsEligible": false,
  "contentStatus": "core-route",
  "sourceReviewStatus": "reviewed",
  "sourceReviewedAt": "2026-09-22",
  "reviewedByRole": "translation-review",
  "author": "VisaLang Editorial team",
  "audienceScope": "需要将考试材料与签证申请材料分开整理的中文读者。",
  "finalDecisionAuthorityType": "主管使领馆负责签证材料，所选考点负责考试材料",
  "primaryOfficialAuthorityUrl": "https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606",
  "examOwnerUrl": "https://www.goethe.de/en/spr/prf.html",
  "localExecutionPrompt": "按所选考点及主管使领馆的当前说明逐项核验，不将本站整理表当成官方完整清单。",
  "decisionStage": "local-execution",
  "nextGuideSlug": "german-a1-exam-booking-timeline",
  "supportingGuideSlugs": [
    "german-a1-exam-booking-timeline"
  ]
},
  {
    slug: 'german-family-reunion-language-requirement',
    title: '德国配偶团聚到底要不要 A1？',
    description: '先判断你的家庭团聚路径是否可能需要德语 A1，再去官方页面核验证书、豁免和材料要求。',
    directAnswer: '你不能只凭“家庭团聚”四个字断定自己一定要交 A1。先按实际居住地找到主管德国使领馆，确认你的具体路线、是否需要证明、可接受证书和任何例外问题。',
    claimRefs: [{ claimId: 'germany-family-reunion-a1-china-mission-context', version: '2026-09-08.1' }],
    href: '/zh/guides/german-family-reunion-language-requirement/',
    englishHref: '/guides/german-family-reunion-language-requirement/',
    publishedDate: '2026-07-09',
    updatedDate: '2026-09-08',
    readingTime: '8',
    publicationDisposition: 'pillar',
    noindex: false,
    adsEligible: false,
    contentStatus: 'complete-route',
    sourceReviewStatus: 'reviewed',
    sourceReviewedAt: '2026-09-08',
    reviewedByRole: 'translation-review',
    author: 'VisaLang Editorial team',
    audienceScope: '准备德国配偶或家庭团聚申请、尚未确认自己路线是否需要 A1 证明的中文读者。',
    finalDecisionAuthorityType: '负责申请地的德国使领馆或主管机关',
    primaryOfficialAuthorityUrl: 'https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606',
    examOwnerUrl: 'https://www.goethe.de/en/spr/prf.html',
    localExecutionPrompt: '先找到负责你申请地和家庭团聚类别的官方说明，再确认是否需要证明、可接受证书和材料形式。',
    decisionStage: 'requirement',
    nextGuideSlug: 'goethe-a1-vs-telc-a1',
    supportingGuideSlugs: ['goethe-a1-vs-telc-a1', 'goethe-a1-test-centers'],
  },
  {
    slug: 'goethe-a1-vs-telc-a1',
    title: 'Goethe A1 与 telc A1：如何比较',
    description: '先确认主管机关可能接受的准确证明，再比较 Goethe A1 与 telc A1 的考试产品、考点和本地执行条件。',
    href: '/zh/guides/goethe-a1-vs-telc-a1/',
    englishHref: '/guides/goethe-a1-vs-telc-a1/',
    publishedDate: '2026-07-09',
    updatedDate: '2026-09-09',
    readingTime: '8',
    publicationDisposition: 'pillar',
    noindex: false,
    adsEligible: false,
    contentStatus: 'complete-route',
    sourceReviewStatus: 'reviewed',
    sourceReviewedAt: '2026-09-09',
    reviewedByRole: 'translation-review',
    author: 'VisaLang Editorial team',
    audienceScope: '已经向负责机关确认可能适用的 A1 证明、准备比较准确考试产品的中文读者。',
    finalDecisionAuthorityType: '负责接收材料的德国使领馆或主管机关',
    primaryOfficialAuthorityUrl: 'https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606',
    examOwnerUrl: 'https://www.goethe.de/ins/de/en/prf/prf/gzsd1.html',
    localExecutionPrompt: '先确认负责机关接受的准确证明，再分别核验考试方和所选考点的当前产品与报名条件。',
    decisionStage: 'choice',
    nextGuideSlug: 'goethe-a1-test-centers',
    supportingGuideSlugs: ['german-family-reunion-language-requirement', 'goethe-a1-test-centers'],
  },
  {
    slug: 'goethe-a1-test-centers',
    title: '如何核验 Goethe 或 telc A1 官方考点',
    description: '从考试方官方入口确认考点和准确考试产品，再向所选考点核验日期、费用、证件、退改和出证流程。',
    href: '/zh/guides/goethe-a1-test-centers/',
    englishHref: '/guides/goethe-a1-test-centers/',
    publishedDate: '2026-07-18',
    updatedDate: '2026-09-09',
    readingTime: '8',
    publicationDisposition: 'pillar',
    noindex: false,
    adsEligible: false,
    contentStatus: 'complete-route',
    sourceReviewStatus: 'reviewed',
    sourceReviewedAt: '2026-09-09',
    reviewedByRole: 'translation-review',
    author: 'VisaLang Editorial team',
    audienceScope: '已经确认可能适用的 A1 证明、准备核验官方或授权考点的中文读者。',
    finalDecisionAuthorityType: '官方考试主办方和所选官方或授权考点',
    primaryOfficialAuthorityUrl: 'https://www.goethe.de/ins/cn/zh/spr/prf/anm.html',
    examOwnerUrl: 'https://www.goethe.de/en/spr/prf.html',
    localExecutionPrompt: '从考试方官方入口确认考点，再向该考点核验准确考试、日期、费用、证件、退改、成绩和证书流程。',
    decisionStage: 'local-execution',
    nextGuideSlug: 'german-a1-exam-booking-timeline',
    supportingGuideSlugs: ['goethe-a1-vs-telc-a1', 'german-a1-exam-booking-timeline'],
  },
  {
    slug: 'german-a1-exam-booking-timeline',
    title: '德国 A1 报名时间线：如何倒排',
    description: '只使用你已确认的考试、出分、取证和材料节点倒排计划；未知日期保持未知，并回到负责机关或考点核验。',
    href: '/zh/guides/german-a1-exam-booking-timeline/',
    englishHref: '/guides/german-a1-exam-booking-timeline/',
    publishedDate: '2026-07-18',
    updatedDate: '2026-09-09',
    readingTime: '10',
    publicationDisposition: 'pillar',
    noindex: false,
    adsEligible: false,
    contentStatus: 'complete-route',
    sourceReviewStatus: 'reviewed',
    sourceReviewedAt: '2026-09-09',
    reviewedByRole: 'translation-review',
    author: 'VisaLang Editorial team',
    audienceScope: '已经确认路线和考点、需要用自己持有或官方确认的日期倒排计划的中文读者。',
    finalDecisionAuthorityType: '所选官方考点负责考试节点，负责申请的德国使领馆或主管机关负责材料节点',
    primaryOfficialAuthorityUrl: 'https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606',
    examOwnerUrl: 'https://www.goethe.de/ins/cn/zh/spr/prf/anm.html',
    localExecutionPrompt: '取得所选考点当前确认的考试、出分、取证和下一考位信息，再核对负责机关的材料提交节点。',
    decisionStage: 'local-execution',
    nextGuideSlug: 'goethe-a1-30-day-study-plan',
    supportingGuideSlugs: ['goethe-a1-test-centers', 'goethe-a1-30-day-study-plan'],
  },
  {
    slug: 'goethe-a1-30-day-study-plan',
    title: 'Goethe A1 备考计划：30 天怎么安排',
    description: '用合法、稳定、可执行的方式准备 Goethe A1，按 30 天安排听说读写和官方样题练习，不依赖违规材料或通过承诺。',
    href: '/zh/guides/goethe-a1-30-day-study-plan/',
    englishHref: '/guides/goethe-a1-30-day-study-plan/',
    publishedDate: '2026-07-09',
    updatedDate: '2026-09-01',
    readingTime: '10',
    publicationDisposition: 'pillar',
    noindex: false,
    adsEligible: false,
    contentStatus: 'complete-route',
    sourceReviewStatus: 'reviewed',
    sourceReviewedAt: '2026-09-01',
    reviewedByRole: 'translation-review',
    author: 'VisaLang Editorial team',
    audienceScope: '已经确认路线、证明、考点和时间线，准备使用官方材料安排学习的中文读者。',
    finalDecisionAuthorityType: '考试主办方负责考试产品和格式，接收材料的机关负责证明接受',
    primaryOfficialAuthorityUrl: 'https://www.goethe.de/en/spr/prf.html',
    examOwnerUrl: 'https://www.goethe.de/en/spr/prf.html',
    localExecutionPrompt: '使用考试主办方当前的官方说明和练习材料，并在报名前再次核验所选考点与负责机关的要求。',
    decisionStage: 'local-execution',
    supportingGuideSlugs: ['german-a1-exam-booking-timeline', 'goethe-a1-test-centers'],
  },
];

export const zhDirectAnswerUnavailable = '本页不会依据过期、缺失或冲突的官方事实给出确定性结论；请先向负责你申请地的德国使领馆或主管机关核验。';

export function resolveZhGuideDirectAnswer(
  guide: Pick<ZhGermanyA1Guide, 'slug' | 'description' | 'directAnswer' | 'claimRefs'>,
  options: { claims?: readonly Claim[]; asOf?: string } = {},
) {
  if (!guide.directAnswer) return guide.description;
  return validateClaimSet(guide.claimRefs ?? [], {
    ...options,
    consumerId: `guide:zh-${guide.slug}`,
    consumerLocale: 'zh-CN',
  }).valid
    ? guide.directAnswer
    : zhDirectAnswerUnavailable;
}

export const zhCoreOfficialSources = [
  { name: '德国驻华使领馆：家庭团聚基本德语证明', href: 'https://china.diplo.de/cn-zh/service/visa-einreise/2716606-2716606' },
  { name: 'BAMF 家庭团聚信息', href: 'https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html' },
  { name: 'Goethe-Institut 德语考试', href: 'https://www.goethe.de/en/spr/prf.html' },
  { name: 'Goethe-Institut 北京：考试时间、报名与价格', href: 'https://www.goethe.de/ins/cn/zh/spr/prf/anm.html' },
  { name: 'telc Deutsch A1 考试产品', href: 'https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/' },
  { name: 'telc 官方考点查询', href: 'https://www.telc.net/en/language-examinations/find-a-telc-examination-centre/' },
];
