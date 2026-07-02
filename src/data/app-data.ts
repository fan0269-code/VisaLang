export const brand = {
  name: 'VisaLang',
  domain: 'flowlight.me',
  tagline: 'Find the right language exam for your next move.',
};

export const i18n = {
  en: {
    heroHeadline: 'Find the right language exam for your next move',
    heroSub: 'Official-first guides for visa, residency, and work-registration language exams.',
    footerDisclaimer: 'VisaLang is an independent language-exam navigation site. We are not a government authority, exam owner, immigration lawyer, or visa agency. Always verify requirements with the official source before booking.',
  },
  zh: {
    heroHeadline: '为您的下一步找到正确的语言考试',
    heroSub: '签证、居留和工作注册语言考试的官方优先指南。',
    footerDisclaimer: 'VisaLang 是一个独立的语言考试导航网站。我们不是政府机构、考试主办方、移民律师或签证代理。预订前请务必向官方来源核实要求。',
  },
};

export interface Exam {
  name: string;
  officialSource: string;
  lastUpdated: string;
  category: string;
  country: string;
}

export const exams: Exam[] = [
  { name: 'Goethe-Zertifikat A1', officialSource: 'https://www.goethe.de/en/spr/prf.html', lastUpdated: '2026-06-30', category: 'Language Visa', country: 'Germany' },
  { name: 'Goethe-Zertifikat B1', officialSource: 'https://www.goethe.de/en/spr/prf.html', lastUpdated: '2026-06-30', category: 'Language Visa', country: 'Germany' },
  { name: 'TestDaF', officialSource: 'https://www.testdaf.de/', lastUpdated: '2026-06-30', category: 'Language Visa', country: 'Germany' },
  { name: 'telc Deutsch A1', officialSource: 'https://www.telc.net/', lastUpdated: '2026-06-30', category: 'Language Visa', country: 'Germany' },
  { name: 'telc Deutsch B1', officialSource: 'https://www.telc.net/', lastUpdated: '2026-06-30', category: 'Language Visa', country: 'Germany' },
  { name: 'telc Deutsch B2', officialSource: 'https://www.telc.net/', lastUpdated: '2026-06-30', category: 'Language Visa', country: 'Germany' },
  { name: 'CILS B1 Cittadinanza', officialSource: 'https://cils.unistrasi.it/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Italy' },
  { name: 'CELI B1', officialSource: 'https://www.cvcl.it/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Italy' },
  { name: 'PLIDA B1', officialSource: 'https://plida.it/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Italy' },
  { name: 'Inburgering A2/B1', officialSource: 'https://www.inburgeren.nl/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Netherlands' },
  { name: 'Staatsexamen NT2', officialSource: 'https://www.staatsexamensnt2.nl/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Netherlands' },
  { name: 'CIPLE A2', officialSource: 'https://caple.letras.ulisboa.pt/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Portugal' },
  { name: 'DELE A2', officialSource: 'https://examenes.cervantes.es/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Spain' },
  { name: 'CCSE', officialSource: 'https://examenes.cervantes.es/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Spain' },
  { name: 'DELF B1', officialSource: 'https://www.france-education-international.fr/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'France' },
  { name: 'DELF B2', officialSource: 'https://www.france-education-international.fr/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'France' },
  { name: 'TCF IRN', officialSource: 'https://www.france-education-international.fr/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'France' },
  { name: 'TEF Canada', officialSource: 'https://www.lefrancaisdesaffaires.fr/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Canada' },
  { name: 'TCF Canada', officialSource: 'https://www.france-education-international.fr/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Canada' },
  { name: 'YKI Finnish', officialSource: 'https://www.oph.fi/en/education-and-qualifications/national-certificate-language-proficiency-yki', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'Finland' },
  { name: 'IELTS UKVI', officialSource: 'https://ielts.org/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'United Kingdom' },
  { name: 'LanguageCert SELT', officialSource: 'https://www.languagecert.org/', lastUpdated: '2026-07-01', category: 'Language Visa', country: 'United Kingdom' },
  { name: 'OET', officialSource: 'https://www.occupationalenglishtest.org/', lastUpdated: '2026-06-30', category: 'Medical Language', country: 'Global' },
  { name: 'NCLEX-RN', officialSource: 'https://www.ncsbn.org/', lastUpdated: '2026-06-30', category: 'Nursing', country: 'United States' },
  { name: 'NMC CBT', officialSource: 'https://www.nmc.org.uk/', lastUpdated: '2026-06-30', category: 'Nursing', country: 'United Kingdom' },
  { name: 'NMC OSCE', officialSource: 'https://www.nmc.org.uk/', lastUpdated: '2026-06-30', category: 'Nursing', country: 'United Kingdom' },
  { name: 'CCHI CoreCHI', officialSource: 'https://www.cchicertification.org/', lastUpdated: '2026-06-30', category: 'Interpreter', country: 'United States' },
  { name: 'CCHI CHI', officialSource: 'https://www.cchicertification.org/', lastUpdated: '2026-06-30', category: 'Interpreter', country: 'United States' },
  { name: 'NBCMI CMI', officialSource: 'https://www.certifiedmedicalinterpreters.org/', lastUpdated: '2026-06-30', category: 'Interpreter', country: 'United States' },
  { name: 'NMLS SAFE MLO', officialSource: 'https://mortgage.nationwidelicensingsystem.org/', lastUpdated: '2026-06-30', category: 'State License', country: 'United States' },
  { name: 'USMLE Step 1', officialSource: 'https://www.usmle.org/', lastUpdated: '2026-06-30', category: 'Medicine', country: 'United States' },
];

export const pageSections = [
  'Exam Overview', 'Eligibility', 'Fees', 'Dates', 'Test Format',
  'Locations / Online', 'Required Documents', 'Passing Score', 'Retake Policy',
  'Prep Path', 'Best Courses', 'Practice Test', 'Career Outcome',
  'Related Exams', 'FAQ', 'Last Updated',
];

export const sources = [
  { name: 'Goethe-Institut', url: 'https://www.goethe.de/en/spr/prf.html' },
  { name: 'telc', url: 'https://www.telc.net/' },
  { name: 'TestDaF', url: 'https://www.testdaf.de/' },
  { name: 'BAMF', url: 'https://www.bamf.de/' },
];

export const tools = [
  { id: 'finder', name: 'Route Finder', desc: 'Find the right exam path for your visa or citizenship goal.' },
  { id: 'budget', name: 'Cost Calculator', desc: 'Estimate exam fees, prep costs, and retake budget.' },
  { id: 'checklist', name: 'Documents Checklist', desc: 'Get a checklist of documents for your chosen exam.' },
];

export function calculateExamBudget(options: { examFee: number; prepBudget: number; retakes: number }): { total: number } {
  const { examFee, prepBudget, retakes } = options;
  return { total: examFee + prepBudget + examFee * retakes };
}

export interface ExamPathInput {
  goal: string;
  country: string;
  language: string;
}

export interface ExamPathResult {
  primaryExam: string;
  steps: string[];
  warning: string;
}

export function recommendExamPath(input: ExamPathInput): ExamPathResult {
  const { goal, country, language } = input;
  if (goal === 'spouse-visa' && country === 'Germany' && language === 'German') {
    return {
      primaryExam: 'Goethe-Zertifikat A1',
      steps: [
        'Check the exact language requirement with the German embassy or Auslanderbehorde.',
        'Find an official Goethe-Institut or partner test centre.',
        'Prepare using official Goethe practice materials and original speaking prompts.',
        'Book the exam early — test slots fill up in some countries.',
        'After passing, add the A1 certificate to your visa application documents.',
      ],
      warning: 'Fees, dates, requirements, and accepted exams change. Always confirm with the official exam owner or government authority before booking.',
    };
  }
  return {
    primaryExam: 'Check official requirements',
    steps: ['Verify your specific visa category language requirement with the official government source.', 'Find the list of accepted language exams for your path.', 'Choose an approved test centre and confirm the fee.'],
    warning: 'Fees, dates, requirements, and accepted exams change. Always confirm with the official exam owner or government authority before booking.',
  };
}

export const guideCatalog = [
  { slug: 'goethe-a1-germany-family-reunion', title: 'Goethe A1 for Germany family reunion', category: 'germany-a1' },
  { slug: 'goethe-a1-fees-by-country', title: 'Goethe A1 fees by country', category: 'germany-a1' },
  { slug: 'goethe-a1-speaking-topics', title: 'Goethe A1 speaking topics', category: 'germany-a1' },
  { slug: 'goethe-a1-vs-telc-a1', title: 'Goethe A1 vs telc A1', category: 'germany-a1' },
  { slug: 'goethe-a1-30-day-study-plan', title: '30-day Goethe A1 study plan', category: 'germany-a1' },
  { slug: 'goethe-a1-test-centers', title: 'Goethe A1 test centers', category: 'germany-a1' },
  { slug: 'goethe-a1-retake-policy', title: 'Goethe A1 retake policy', category: 'germany-a1' },
  { slug: 'german-a1-documents-checklist', title: 'German A1 documents checklist', category: 'germany-a1' },
  { slug: 'german-family-reunion-language-requirement', title: 'German family reunion language requirement', category: 'germany-a1' },
  { slug: 'goethe-a1-official-links-practice-resources', title: 'Goethe A1 official links and practice resources', category: 'germany-a1' },
];
