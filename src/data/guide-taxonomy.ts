import { decisionStages, type DecisionStage } from './source-review.ts';

export const guidePurposeLabels = {
  family: 'Family reunion',
  settlement: 'Settlement',
  citizenship: 'Citizenship',
  preparation: 'Preparation',
} as const;

export type GuidePurpose = keyof typeof guidePurposeLabels;

export const guideStageLabels: Record<DecisionStage, string> = {
  requirement: 'Requirement',
  choice: 'Exam choice',
  'local-execution': 'Booking and preparation',
  'submission-review': 'Submission check',
};

export const guideDiscoveryFilters = [
  {
    name: 'purpose',
    label: 'Purpose',
    options: Object.entries(guidePurposeLabels).map(([value, label]) => ({ value, label })),
  },
  {
    name: 'stage',
    label: 'Stage',
    options: decisionStages.map((value) => ({ value, label: guideStageLabels[value] })),
  },
  {
    name: 'language',
    label: 'Language',
    options: [{ value: 'en', label: 'English' }, { value: 'zh', label: '中文' }],
  },
] as const;

export const guideCategories = [
  { name: 'Germany A1', slug: 'germany-a1', country: 'Germany', route: 'Family reunion', purposes: ['family'] as const, exam: 'Goethe / telc', level: 'A1', desc: 'Family reunion language proof', popular: true, adsEligible: false, noindex: true },
  { name: 'Germany B1+', slug: 'germany-b1', country: 'Germany', route: 'Settlement and citizenship', purposes: ['settlement', 'citizenship'] as const, exam: 'Goethe / telc', level: 'B1', desc: 'Settlement and citizenship language proof', popular: true, adsEligible: false, noindex: true },
  { name: 'TestDaF', slug: 'germany-testdaf', country: 'Germany', route: 'University admissions', purposes: ['preparation'] as const, exam: 'TestDaF', level: 'TDN 3-5', desc: 'University admissions', popular: true, adsEligible: false, noindex: true },
  { name: 'telc Deutsch', slug: 'germany-telc', country: 'Germany', route: 'Work and nursing', purposes: ['preparation'] as const, exam: 'telc Deutsch', level: 'B1/B2', desc: 'Work & nursing registration', popular: true, adsEligible: false, noindex: true },
  { name: 'United Kingdom', slug: 'uk', country: 'United Kingdom', route: 'UK visa and citizenship', purposes: ['citizenship', 'preparation'] as const, exam: 'IELTS UKVI / SELT', level: 'Route-specific', desc: 'UK visa & citizenship English', popular: false, adsEligible: false, noindex: true },
  { name: 'Canada', slug: 'canada', country: 'Canada', route: 'Express Entry', purposes: ['preparation'] as const, exam: 'TEF Canada / TCF Canada', level: 'Programme-specific', desc: 'Express Entry French-language testing', popular: false, adsEligible: false, noindex: true },
  { name: 'Italy', slug: 'italy', country: 'Italy', route: 'Citizenship', purposes: ['citizenship'] as const, exam: 'CILS / CELI / PLIDA', level: 'B1', desc: 'CILS/CELI/PLIDA citizenship', popular: false, adsEligible: false, noindex: true },
  { name: 'Spain', slug: 'spain', country: 'Spain', route: 'Citizenship', purposes: ['citizenship'] as const, exam: 'DELE / CCSE', level: 'A2', desc: 'DELE & CCSE citizenship', popular: false, adsEligible: false, noindex: true },
  { name: 'France', slug: 'france', country: 'France', route: 'Residence, work, study', purposes: ['settlement', 'preparation'] as const, exam: 'DELF / TCF IRN', level: 'B1/B2', desc: 'DELF/DALF work & study', popular: false, adsEligible: false, noindex: true },
  { name: 'Finland', slug: 'finland', country: 'Finland', route: 'Citizenship', purposes: ['citizenship'] as const, exam: 'YKI', level: 'Route-specific', desc: 'Citizenship language evidence', popular: false, adsEligible: false, noindex: true },
  { name: 'Netherlands', slug: 'netherlands', country: 'Netherlands', route: 'Integration and named study admissions', purposes: ['settlement', 'citizenship', 'preparation'] as const, exam: 'Inburgering / NT2', level: 'Procedure-specific', desc: 'Inburgering and named UvA/NT2 tasks', popular: false, adsEligible: false, noindex: true },
  { name: 'Portugal', slug: 'portugal', country: 'Portugal', route: 'Residence and citizenship', purposes: ['settlement', 'citizenship'] as const, exam: 'CIPLE / Portuguese proof', level: 'A2', desc: 'CIPLE A2 & Golden Visa', popular: false, adsEligible: false, noindex: true },
];

export const guideCategoryMap = Object.fromEntries(guideCategories.map((category) => [category.slug, category]));

const guidePurposeOverrides: Readonly<Record<string, readonly GuidePurpose[]>> = {
  'german-family-reunion-language-requirement': ['family'],
  'goethe-a1-germany-family-reunion': ['family'],
  'goethe-a1-vs-telc-a1': ['family', 'preparation'],
  'goethe-a1-fees-by-country': ['family', 'preparation'],
  'goethe-a1-test-centers': ['family', 'preparation'],
  'german-a1-exam-booking-timeline': ['family', 'preparation'],
  'german-a1-documents-checklist': ['family', 'preparation'],
  'goethe-a1-30-day-study-plan': ['family', 'preparation'],
  'goethe-b1-germany-settlement-work': ['settlement'],
  'germany-b1-citizenship-language-proof': ['citizenship'],
  'germany-b1-leben-in-deutschland-and-language-proof': ['settlement', 'citizenship'],
  'goethe-b1-vs-telc-b1': ['settlement', 'citizenship', 'preparation'],
  'goethe-b1-fees-and-booking': ['settlement', 'citizenship', 'preparation'],
  'germany-b1-settlement-citizenship-timeline': ['settlement', 'citizenship', 'preparation'],
  'germany-b1-settlement-citizenship-checklist': ['settlement', 'citizenship', 'preparation'],
  'goethe-b1-study-plan': ['settlement', 'citizenship', 'preparation'],
};

export function resolveGuidePurposes(guide: { slug: string; category: string }): readonly GuidePurpose[] {
  const exactPurposes = guidePurposeOverrides[guide.slug];
  if (exactPurposes) return exactPurposes;
  return guideCategoryMap[guide.category]?.purposes ?? ['preparation'];
}

export type GuideMaturityStatus = import('./source-review').ContentStatus;

export function categoryContentStatus(statuses: GuideMaturityStatus[]): GuideMaturityStatus {
  if (statuses.includes('complete-route')) return 'complete-route';
  if (statuses.includes('core-route')) return 'core-route';
  if (statuses.includes('starter-overview')) return 'starter-overview';
  return 'verification-pending';
}

export function guideCategoryIntro(category: { slug: string; desc: string }) {
  if (category.slug === 'germany-a1') {
    return 'This is the site’s most complete decision route. Begin with the requirement check, then move through accepted proof, provider choice, official centres, fees, documents, study, and retake timing.';
  }
  if (category.slug === 'germany-b1') {
    return 'This is a core route for settlement and citizenship planning. Use it to keep language proof, civic knowledge, and wider eligibility evidence separate before checking the competent authority.';
  }
  return `Use this category to identify the receiving authority, exact exam family, and official verification step for ${category.desc}. Research guides are listed in the main library only after their official sources and distinct reader task have been checked.`;
}

const examMatchers = [
  ['goethe', 'Goethe'],
  ['telc', 'telc Deutsch'],
  ['testdaf', 'TestDaF'],
  ['dsh', 'DSH'],
  ['ielts', 'IELTS UKVI'],
  ['languagecert', 'LanguageCert SELT'],
  ['tef', 'TEF Canada'],
  ['tcf', 'TCF'],
  ['cils', 'CILS'],
  ['celi', 'CELI'],
  ['plida', 'PLIDA'],
  ['dele', 'DELE'],
  ['ccse', 'CCSE'],
  ['delf', 'DELF'],
  ['yki', 'YKI'],
  ['inburgering', 'Inburgering'],
  ['staatsexamen', 'Staatsexamen NT2'],
  ['nt2', 'Staatsexamen NT2'],
  ['ciple', 'CIPLE'],
];

export function inferGuideMeta(guide: {
  title: string;
  description: string;
  category: string;
  slug: string;
  route?: string;
  eyebrow?: string;
}) {
  const category = guideCategoryMap[guide.category] ?? {
    name: guide.category,
    slug: guide.category,
    country: 'Multiple',
    route: guide.route ?? guide.category,
    purposes: ['preparation'] as const,
    exam: 'Route-specific',
    level: 'Route-specific',
    desc: guide.category,
    popular: false,
    adsEligible: false,
  };
  const haystack = `${guide.slug} ${guide.title} ${guide.description} ${guide.eyebrow ?? ''}`.toLowerCase();
  const exams = examMatchers.filter(([needle]) => haystack.includes(needle)).map(([, label]) => label);
  const levelMatch = haystack.match(/\b(a1|a2|b1|b2|c1|c2|tdn\s?3|tdn\s?4|tdn\s?5)\b/i);

  return {
    categoryName: category.name,
    country: category.country,
    route: category.route,
    exam: exams.length > 0 ? Array.from(new Set(exams)).join(' / ') : category.exam,
    level: levelMatch ? levelMatch[0].toUpperCase().replace('TDN ', 'TDN ') : category.level,
    routeSlug: category.slug,
    routeDescription: category.desc,
  };
}

export function formatRouteLabel(route?: string, category?: string) {
  if (category && guideCategoryMap[category]) return guideCategoryMap[category].name;
  return route ? route.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()) : '';
}
