export const commercialStatus = 'contact-intent';

export const commercialLinks = {
  tools: '/tools/route-finder/',
  guides: '/guides/',
  germanyA1Guide: '/germany-family-reunion-a1/',
  pricing: '/pricing/',
  a1FamilyReunionPack: '/products/a1-family-reunion-pack/',
  a1PracticePack: '/products/a1-practice-pack/',
  routeReview: '/route-review/',
  partners: '/partners/',
  contact: '/contact/',
  a1FamilyReunionPackIntent: '/contact/?interest=a1-family-reunion-pack',
  a1PracticePackIntent: '/contact/?interest=a1-practice-pack',
  routeReviewIntent: '/contact/?interest=route-review',
  partnersIntent: '/contact/?interest=partners',
};

export const commercialOffers = [
  {
    id: 'free-tools',
    name: 'Free Tools',
    status: 'Available now',
    price: 'Free',
    href: commercialLinks.tools,
    action: 'Use free tools',
    summary: 'Self-serve planning tools that organise questions and next steps before an exam booking or application decision.',
  },
  {
    id: 'a1-family-reunion-pack',
    name: 'A1 Family Reunion Pack',
    status: 'Coming soon',
    price: 'Price to be confirmed',
    href: commercialLinks.a1FamilyReunionPack,
    action: 'View proposed scope',
    summary: 'A proposed low-cost planning pack for the Germany A1 family-reunion route; it is not currently purchasable.',
  },
  {
    id: 'a1-practice-pack',
    name: 'A1 Practice Pack',
    status: 'Coming soon',
    price: 'Price to be confirmed',
    href: commercialLinks.a1PracticePack,
    action: 'View proposed scope',
    summary: 'A proposed low-cost original-practice companion for A1 preparation; it is not currently purchasable.',
  },
  {
    id: 'route-review',
    name: 'Informational Route Review',
    status: 'Not currently offered',
    price: 'Price to be confirmed',
    href: commercialLinks.routeReview,
    action: 'View free routes',
    summary: 'A proposed human informational review of a reader’s route questions, not legal, immigration, or admissions advice.',
  },
  {
    id: 'ai-correction',
    name: 'Future AI Correction',
    status: 'Coming soon',
    price: 'Not available',
    href: commercialLinks.contact,
    action: 'Share interest',
    summary: 'A possible future writing-feedback tool. It is not available, does not accept submissions, and has no price or delivery date.',
  },
  {
    id: 'partners',
    name: 'Partners / B2B',
    status: 'Contact only',
    price: 'Scope and pricing to be confirmed',
    href: commercialLinks.partners,
    action: 'Partner information',
    summary: 'A contact path for relevant organisations; commercial relationships do not determine editorial conclusions or official-source guidance.',
  },
];

export const businessConfirmations = [
  'A confirmed price, currency, tax treatment, refund policy, and launch date for each paid offer.',
  'The exact files or access delivered by each pack, delivery method, and support owner.',
  'A real contact-intake destination, privacy notice, data-retention rule, and response owner before collecting personal information.',
  'The Route Review reviewer qualifications, capacity, service level, secure-intake policy, and escalation process.',
  'Any partner eligibility, commercial terms, affiliate disclosures, and a process for maintaining editorial independence.',
];
