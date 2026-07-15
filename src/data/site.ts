export type Locale = 'en' | 'zh-CN';

export const site = {
  name: 'VisaLang',
  url: 'https://visalang.org',
  email: 'hello@visalang.org',
  lastSystemReview: '2026-07-11',
  routes: [
    { id: 'family-reunion', label: 'Family reunion', zh: '家庭团聚', href: '/germany-family-reunion-a1/', status: 'available' },
    { id: 'study', label: 'Study', zh: '留学', href: '/guides/testdaf-germany-university-admissions/', status: 'guide' },
    { id: 'work', label: 'Work', zh: '工作', href: '/guides/telc-b1-b2-germany-work-nursing/', status: 'guide' },
    { id: 'settlement', label: 'Settlement', zh: '永居', href: '/germany-b1-settlement-citizenship/', status: 'available' },
    { id: 'citizenship', label: 'Citizenship', zh: '入籍', href: '/germany-b1-settlement-citizenship/', status: 'available' },
    { id: 'not-sure', label: 'Not sure yet', zh: '还不确定', href: '/tools/route-finder/', status: 'available' },
  ],
  tools: [
    { id: 'finder', label: 'Route Finder', zh: '路线查找器', href: '/tools/route-finder/', description: 'Identify the authority and proof questions to verify first.', status: 'available' },
    { id: 'checklist', label: 'Requirement Checklist', zh: '要求核对清单', href: '/tools/checklist-generator/', description: 'Turn official checks into a trackable list.', status: 'available' },
    { id: 'timeline', label: 'Timeline Planner', zh: '时间线规划器', href: '/tools/timeline-calculator/', description: 'Work backwards from your own deadline and verified timing inputs.', status: 'available' },
    { id: 'comparison', label: 'Exam Comparison', zh: '考试比较', href: '/tools/exam-comparison/', description: 'Compare the questions that must be verified for two exams.', status: 'available' },
    { id: 'reminders', label: 'Reminder Planner', zh: '提醒计划', href: '/tools/email-reminders/', description: 'Create a local plan, calendar file, or printable reminder.', status: 'available' },
  ],
};

export const ui = {
  en: {
    home: 'Home', routes: 'Routes', exams: 'Exams', tools: 'Tools', guides: 'Guides', about: 'About',
    skip: 'Skip to main content', menu: 'Menu', close: 'Close', officialFirst: 'Official sources first',
    verify: 'Always verify before booking', report: 'Report outdated information', lastChecked: 'Official sources last checked',
  },
  'zh-CN': {
    home: '首页', routes: '路线', exams: '考试', tools: '工具', guides: '指南', about: '关于',
    skip: '跳到正文', menu: '菜单', close: '关闭', officialFirst: '官方来源优先',
    verify: '报名前务必再次核验', report: '报告过期信息', lastChecked: '最近官方核验',
  },
};

export const navItems = [
  { key: 'home', href: '/' },
  { key: 'routes', href: '/routes/' },
  { key: 'exams', href: '/exams/' },
  { key: 'tools', href: '/tools/' },
  { key: 'guides', href: '/guides/' },
  { key: 'about', href: '/about/' },
] as const;

export const translatedPaths: Record<string, string> = {
  '/': '/zh/',
  '/germany-family-reunion-a1/': '/zh/germany-family-reunion-a1/',
  '/guides/german-family-reunion-language-requirement/': '/zh/guides/german-family-reunion-language-requirement/',
  '/guides/goethe-a1-vs-telc-a1/': '/zh/guides/goethe-a1-vs-telc-a1/',
  '/guides/goethe-a1-booking-mistakes/': '/zh/guides/goethe-a1-booking-mistakes/',
  '/guides/german-a1-documents-checklist/': '/zh/guides/german-a1-documents-checklist/',
  '/guides/goethe-a1-30-day-study-plan/': '/zh/guides/goethe-a1-30-day-study-plan/',
};

export const productStatuses = {
  available: { en: 'Available', zh: '已开放' },
  'coming-soon': { en: 'Coming soon', zh: '即将开放' },
  'contact-only': { en: 'Contact only', zh: '仅限联系咨询' },
  unavailable: { en: 'Not currently offered', zh: '暂未提供' },
} as const;

export const organisationJsonLD = {
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: `${site.url}/`,
  email: site.email,
  description: 'Independent, official-source-first language-proof route guidance.',
};
