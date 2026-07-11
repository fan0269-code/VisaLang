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
    guide: { href: '/germany-family-reunion-a1/', label: 'Germany A1 family reunion guide' },
    checklist: [
      { priority: 'First', item: 'Confirm the exact language-proof requirement or any exemption with the receiving German mission or authority.' },
      { priority: 'Before booking', item: 'Confirm the accepted adult A1 certificate name, local test-centre status, ID rules, fee, date, result process, and cancellation terms.' },
      { priority: 'Before submission', item: 'Check the certificate delivery format, translation or certification needs, and the receiving authority’s document instructions.' },
    ],
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
  title: 'Official verification required before choosing an exam',
  officialAction: 'Ask the authority, university, employer, training provider, regulator, or other organisation receiving your application which language proof it requires and accepts.',
  nextSteps: [
    'Identify the organisation that receives your application or document.',
    'Ask for the exact accepted certificate, level, date, and document format in writing where possible.',
    'Only then compare official exam owners and authorised local test centres.',
  ],
  guide: { href: '/guides/', label: 'Browse route guides' },
};

export function findRoute(input) {
  const country = String(input.country || '').trim().toLowerCase();
  const purpose = String(input.purpose || '').trim().toLowerCase();
  const configured = routeRegistry.find((route) => route.country === country && route.purpose === purpose && route.availability === 'configured');

  if (!configured) return { ...safeRouteResult, input };

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

export function getChecklist(routeId) {
  const route = routeRegistry.find((item) => item.id === routeId && item.availability === 'configured');
  if (!route) {
    return [
      { priority: 'First', item: 'Identify the receiving authority and request its current language-proof instructions.' },
      { priority: 'Before booking', item: 'Confirm the exact accepted certificate, local centre rules, timing, and documents with official sources.' },
      { priority: 'Before submission', item: 'Check the receiving authority’s current document format, translation, and certification instructions.' },
    ];
  }
  return route.checklist;
}

export function calculateTimeline(input) {
  const target = String(input.targetDate || '');
  const resultWaitDays = Number(input.resultWaitDays || 0);
  const retakeBufferDays = Number(input.retakeBufferDays || 0);
  const translationDays = Number(input.translationDays || 0);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(target)) return null;

  const targetDate = new Date(`${target}T12:00:00`);
  if (Number.isNaN(targetDate.getTime())) return null;
  const subtractDays = (days) => {
    const date = new Date(targetDate);
    date.setDate(date.getDate() - days);
    return date.toISOString().slice(0, 10);
  };

  return {
    targetDate: target,
    latestTestDate: subtractDays(resultWaitDays + translationDays),
    cautiousTestDate: subtractDays(resultWaitDays + retakeBufferDays + translationDays),
    totalPlanningDays: resultWaitDays + retakeBufferDays + translationDays,
  };
}

export const examComparisonOptions = [
  { id: 'goethe-a1', label: 'Goethe-Zertifikat A1', officialUrl: 'https://www.goethe.de/en/spr/prf.html' },
  { id: 'telc-a1', label: 'telc Deutsch A1', officialUrl: 'https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/' },
];

export const examComparisonDimensions = [
  { label: 'Exact certificate and level', value: 'Check the exact adult A1 certificate name against the receiving authority’s instructions.' },
  { label: 'Acceptance for your case', value: 'Please verify with the German mission or competent authority handling your application.' },
  { label: 'Fees', value: 'Please verify with the official centre.' },
  { label: 'Result timing', value: 'Please verify with the official centre.' },
  { label: 'Centre coverage and dates', value: 'Please verify with the official centre.' },
  { label: 'ID, cancellation, and certificate delivery', value: 'Please verify with the official centre and its current booking terms.' },
];
