export const guideCategories = [
  { name: 'Germany A1', slug: 'germany-a1', country: 'Germany', route: 'Family reunion', exam: 'Goethe / telc', level: 'A1', desc: 'Family reunion language proof', popular: true, adsEligible: true },
  { name: 'Germany B1+', slug: 'germany-b1', country: 'Germany', route: 'Settlement and work', exam: 'Goethe / telc', level: 'B1', desc: 'Settlement, work, citizenship', popular: true, adsEligible: true },
  { name: 'TestDaF', slug: 'germany-testdaf', country: 'Germany', route: 'University admissions', exam: 'TestDaF', level: 'TDN 3-5', desc: 'University admissions', popular: true, adsEligible: true },
  { name: 'telc Deutsch', slug: 'germany-telc', country: 'Germany', route: 'Work and nursing', exam: 'telc Deutsch', level: 'B1/B2', desc: 'Work & nursing registration', popular: true, adsEligible: true },
  { name: 'United Kingdom', slug: 'uk', country: 'United Kingdom', route: 'UK visa and citizenship', exam: 'IELTS UKVI / SELT', level: 'Route-specific', desc: 'UK visa & citizenship English', popular: false, adsEligible: false, noindex: true },
  { name: 'Canada', slug: 'canada', country: 'Canada', route: 'Express Entry', exam: 'TEF Canada / TCF Canada', level: 'Programme-specific', desc: 'Express Entry French-language testing', popular: false, adsEligible: false, noindex: true },
  { name: 'Italy', slug: 'italy', country: 'Italy', route: 'Citizenship', exam: 'CILS / CELI / PLIDA', level: 'B1', desc: 'CILS/CELI/PLIDA citizenship', popular: false, adsEligible: false, noindex: true },
  { name: 'Spain', slug: 'spain', country: 'Spain', route: 'Citizenship', exam: 'DELE / CCSE', level: 'A2', desc: 'DELE & CCSE citizenship', popular: false, adsEligible: false },
  { name: 'France', slug: 'france', country: 'France', route: 'Residence, work, study', exam: 'DELF / TCF IRN', level: 'B1/B2', desc: 'DELF/DALF work & study', popular: false, adsEligible: false },
  { name: 'Finland', slug: 'finland', country: 'Finland', route: 'Citizenship', exam: 'YKI', level: 'Route-specific', desc: 'Citizenship language evidence', popular: false, adsEligible: false, noindex: true },
  { name: 'Netherlands', slug: 'netherlands', country: 'Netherlands', route: 'Integration and named study admissions', exam: 'Inburgering / NT2', level: 'Procedure-specific', desc: 'Inburgering and named UvA/NT2 tasks', popular: false, adsEligible: false, noindex: true },
  { name: 'Portugal', slug: 'portugal', country: 'Portugal', route: 'Residence and citizenship', exam: 'CIPLE / Portuguese proof', level: 'A2', desc: 'CIPLE A2 & Golden Visa', popular: false, adsEligible: false, noindex: true },
];

export const guideCategoryMap = Object.fromEntries(guideCategories.map((category) => [category.slug, category]));

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
  return `Use this category to identify the receiving authority, exact exam family, and official verification step for ${category.desc}. Guides remain outside primary discovery until their source and content status meet the publication gate.`;
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
