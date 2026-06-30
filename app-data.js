(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ExamSiteData = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const lastUpdated = "2026-06-30";

  const brand = {
    name: "VisaLang",
    tagline: "Language exams for visa, residency, and citizenship paths.",
    headline: "Find the right language exam for your next move.",
  };

  const i18n = {
    en: {
      lang: "en",
      title: "VisaLang | Language exams for visa, residency, and citizenship paths.",
      languageToggle: "中文",
      navFind: "Find exam",
      navLibrary: "Exam library",
      navSources: "Official sources",
      updates: "Get updates",
      eyebrow: "Visa, residency, and citizenship language exams",
      heroHeadline: "Find the right language exam for your next move.",
      heroCopy:
        "Compare official exam routes, CEFR levels, fees, test formats, and practice plans for Germany, Italy, the Netherlands, Portugal, the UK, and more.",
      startRoute: "Start with your route",
      browseExams: "Browse exams",
      startHere: "Start here",
      threeFields: "3 fields",
      finderTitle: "Find Your Exam Path",
      finderIntro:
        "Choose your goal, country, and language. VisaLang points you to the first official route to check.",
      goal: "Goal",
      country: "Country",
      language: "Language",
      spouseVisa: "Spouse or family reunion visa",
      citizenship: "Citizenship or permanent residency",
      work: "Work or professional registration",
      officialFirst: "Official-first",
      officialFirstText: "Every route links back to exam owners and government sources.",
      goalLed: "Goal-led",
      goalLedText: "Start from visa, residency, citizenship, or work registration.",
      safePrep: "Safe prep",
      safePrepText: "Original practice only. No leaked questions or copied exam items.",
      examSeeds: "officially sourced exam seeds",
      guidePages: "high-intent guide pages",
      planningTools: "free planning tools",
      sourceGroups: "official source groups",
      costTitle: "Total Cost Calculator",
      costIntro: "Estimate exam fee, prep budget, and retake risk before you book.",
      examFee: "Official exam fee",
      prepBudget: "Prep budget",
      retakes: "Expected retakes",
      mockTitle: "Speaking Mock Entry",
      mockIntro: "Practice with original prompts, structured rubrics, and safe preparation notes.",
      exam: "Exam",
      practiceType: "Practice type",
      popularRoutes: "Popular routes",
      popularRoutesHint: "Choose by outcome first, exam second.",
      familyVisa: "Family visa",
      germanyFamily: "Germany family visa",
      germanyFamilyText: "Goethe A1, telc, and official German exam options",
      europeanCitizenship: "European citizenship",
      europeanCitizenshipText: "CILS B1, Dutch Inburgering, YKI Finnish, CIPLE",
      ukviEnglish: "UK visa English",
      ukviEnglishText: "IELTS UKVI, PTE Home, LanguageCert SELT",
      examLibrary: "Exam library",
      matchingRoutes: "matching official routes",
      showMore: "Show more",
      searchPlaceholder: "Search country, language, exam, or prep route",
      market: "Market",
      whyItMatters: "Why it matters",
      prepRoute: "Preparation route",
      officialSource: "Official source",
      guideStructure: "Every guide follows the same trusted structure",
      helpfulTools: "Helpful tools before paid prep",
      safePreparation: "Built for safe preparation",
      safePreparationText:
        "VisaLang links back to official exam owners and uses original practice prompts only. We do not publish leaked questions, copied real exam items, fake authorization claims, or official-looking assets.",
      sourceMap: "Official source map",
      routeUpdates: "Get route updates before you book",
      routeUpdatesText:
        "Receive fee changes, registration windows, official source updates, and new mock practice openings.",
      joinWaitlist: "Join waitlist",
      emailPlaceholder: "you@example.com",
      waitlistSending: "Sending…",
      waitlistSuccess: "Thanks — you're on the list. We'll only email official route updates before you book.",
      waitlistError: "Something went wrong. Please try again or email us directly.",
      footerDisclaimer:
        "VisaLang is an independent guide. Always confirm requirements, fees, dates, and accepted exams with the official exam owner or government authority before booking.",
      footerStatus: "Project status: pre-launch MVP for validation.",
      all: "All",
      budgetNote: (result) =>
        `Exam $${result.examFee} + prep $${result.prepBudget} + ${result.retakes} retake(s).`,
      budgetDisclaimer: "Estimate only — not official fees. Confirm exact amounts on the official exam site.",
      mockResult: (exam, skill) =>
        `<strong>${exam} · ${skill}</strong>
         <ul class="mock-scenario">
           <li>Original scenario: introduce yourself and describe a simple daily situation.</li>
           <li>Time box: about 5–7 minutes for a first attempt.</li>
         </ul>
         <p class="mock-rubric">Scoring dimensions (original rubric only):</p>
         <ol class="mock-rubric-list">
           <li>Task completion — did you answer the prompt?</li>
           <li>Fluency — steady pace without long pauses.</li>
           <li>Vocabulary — everyday words for the topic.</li>
           <li>Accuracy — grammar within the target CEFR level.</li>
         </ol>
         <p>Real exam questions and official-looking assets stay out of the practice flow. Check the official exam page for the exact task types and timing.</p>`,
      officialDisclaimer: "Fees, dates, and accepted exams change — always confirm with the official exam owner or government authority before booking.",
      pageSections: null,
      tools: null,
    },
    zh: {
      lang: "zh-CN",
      title: "VisaLang | 签证、永居与入籍语言考试导航",
      languageToggle: "EN",
      navFind: "查考试",
      navLibrary: "考试库",
      navSources: "官方来源",
      updates: "获取更新",
      eyebrow: "签证、永居与入籍语言考试",
      heroHeadline: "找到适合签证、永居或入籍的语言考试。",
      heroCopy:
        "对比德国、意大利、荷兰、葡萄牙、英国等国家的官方考试路径、CEFR 等级、费用、题型和备考路线。",
      startRoute: "从你的路径开始",
      browseExams: "浏览考试库",
      startHere: "从这里开始",
      threeFields: "3 项信息",
      finderTitle: "查找你的考试路径",
      finderIntro: "选择目标、国家和语言，VisaLang 会提示你优先核查的官方考试路径。",
      goal: "目标",
      country: "国家",
      language: "语言",
      spouseVisa: "配偶或家庭团聚签证",
      citizenship: "入籍或永久居留",
      work: "工作或职业注册",
      officialFirst: "官方优先",
      officialFirstText: "每条路径都回链考试主办方或政府来源。",
      goalLed: "目标导向",
      goalLedText: "先按签证、永居、入籍或职业注册确认路径。",
      safePrep: "安全备考",
      safePrepText: "只做原创练习，不提供泄题或复制真实考题。",
      examSeeds: "条官方来源考试种子",
      guidePages: "个高意图指南页面",
      planningTools: "个免费规划工具",
      sourceGroups: "组官方来源",
      costTitle: "总费用计算器",
      costIntro: "在报名之前估算考试费、备考预算和重考风险。",
      examFee: "官方考试费",
      prepBudget: "备考预算",
      retakes: "预计重考次数",
      mockTitle: "口语模拟入口",
      mockIntro: "使用原创题境、结构化评分标准和安全备考提示进行练习。",
      exam: "考试",
      practiceType: "练习类型",
      popularRoutes: "热门路径",
      popularRoutesHint: "先选结果，再确认考试。",
      familyVisa: "家庭签证",
      germanyFamily: "德国家庭团聚签证",
      germanyFamilyText: "Goethe A1、telc 及官方德语考试选项",
      europeanCitizenship: "欧洲入籍",
      europeanCitizenshipText: "CILS B1、Dutch Inburgering、YKI Finnish、CIPLE",
      ukviEnglish: "英国签证英语",
      ukviEnglishText: "IELTS UKVI、PTE Home、LanguageCert SELT",
      examLibrary: "考试库",
      matchingRoutes: "条匹配的官方路径",
      showMore: "显示更多",
      searchPlaceholder: "搜索国家、语言、考试或备考路径",
      market: "市场",
      whyItMatters: "需求原因",
      prepRoute: "备考路径",
      officialSource: "官方来源",
      guideStructure: "每篇指南都采用同一套可信结构",
      helpfulTools: "付费备考前先用这些工具",
      safePreparation: "为安全备考而设计",
      safePreparationText:
        "VisaLang 回链官方考试方，并且只使用原创练习提示。我们不发布泄题、复制真实考题、虚假授权声明或仿官方素材。",
      sourceMap: "官方来源地图",
      routeUpdates: "报名之前获取路径更新",
      routeUpdatesText: "接收费用变动、报名窗口、官方来源更新和新的模拟练习名额。",
      joinWaitlist: "加入等待名单",
      emailPlaceholder: "you@example.com",
      waitlistSending: "发送中…",
      waitlistSuccess: "已加入名单。我们只会在你报名前，发送官方路径更新邮件。",
      waitlistError: "出了点问题，请重试或直接给我们发邮件。",
      footerDisclaimer:
        "VisaLang 是独立指南网站。报名之前，请务必到考试主办方或政府机构官网确认要求、费用、日期和认可考试。",
      footerStatus: "项目状态：上线前验证版 MVP。",
      all: "全部",
      budgetNote: (result) =>
        `考试费 $${result.examFee} + 备考 $${result.prepBudget} + ${result.retakes} 次重考。`,
      budgetDisclaimer: "仅为估算，非官方费用。确切金额请以官方考试网站为准。",
      mockResult: (exam, skill) =>
        `<strong>${exam} · ${skill}</strong>
         <ul class="mock-scenario">
           <li>原创场景：自我介绍并描述一个简单的日常情境。</li>
           <li>时间建议：首次尝试约 5–7 分钟。</li>
         </ul>
         <p class="mock-rubric">评分维度（仅原创评分标准）：</p>
         <ol class="mock-rubric-list">
           <li>任务完成度——是否回应了题目要求。</li>
           <li>流利度——节奏稳定，没有长停顿。</li>
           <li>词汇——贴近话题的日常用词。</li>
           <li>准确度——语法控制在目标 CEFR 等级内。</li>
         </ol>
         <p>练习流程不使用真实考题或仿官方素材。题型与计时请以官方考试页面为准。</p>`,
      officialDisclaimer: "费用、日期与认可考试可能变动，报名前请务必到考试主办方或政府机构官网确认。",
      pageSections: [
        "考试概览",
        "报名资格",
        "费用",
        "日期",
        "考试形式",
        "考点 / 线上考试",
        "所需材料",
        "合格分数",
        "重考政策",
        "备考路径",
        "推荐课程",
        "模拟练习",
        "职业或身份结果",
        "相关考试",
        "常见问题",
        "最后更新",
      ],
      tools: null,
    },
  };

  i18n.en.tools = null;
  i18n.zh.tools = [
    {
      name: "考试费用计算器",
      promise: "估算考试费、备考预算、重考风险和真实总支出。",
      conversion: "通过邮件接收费用更新提醒。",
    },
    {
      name: "签证考试路径查询",
      promise: "根据国家、目标和语言匹配用户应先阅读的考试页面。",
      conversion: "导向导师、课程或顾问线索。",
    },
    {
      name: "AI 模拟入口",
      promise: "收集口语/写作场景，并导向原创练习提示。",
      conversion: "提供不含真实考题的付费模拟练习。",
    },
  ];

  const pageSections = [
    "Exam Overview",
    "Eligibility",
    "Fees",
    "Dates",
    "Test Format",
    "Locations / Online",
    "Required Documents",
    "Passing Score",
    "Retake Policy",
    "Prep Path",
    "Best Courses",
    "Practice Test",
    "Career Outcome",
    "Related Exams",
    "FAQ",
    "Last Updated",
  ];

  const sources = [
    {
      name: "Goethe-Institut exams",
      url: "https://www.goethe.de/en/spr/prf.html",
      use: "German A1-C2 exam framework, centers, format, and official exam references.",
    },
    {
      name: "DUO Inburgeren",
      url: "https://www.inburgeren.nl/en/",
      use: "Netherlands civic integration exam paths, practice information, and official requirements.",
    },
    {
      name: "CCHI Certification",
      url: "https://cchicertification.org/",
      use: "US healthcare interpreter certification tracks and language coverage.",
    },
    {
      name: "NMLS Resource Center",
      url: "https://mortgage.nationwidelicensingsystem.org/",
      use: "SAFE MLO testing, licensing, and state mortgage originator information.",
    },
    {
      name: "Pearson VUE",
      url: "https://home.pearsonvue.com/",
      use: "Testing vendor and exam delivery references across IT, language, and professional exams.",
    },
    {
      name: "PSI Exams",
      url: "https://www.psiexams.com/",
      use: "US state licensing, FAA, contractor, and insurance exam delivery references.",
    },
  ];

  const exams = [
    ["Goethe-Zertifikat A1", "Language Visa", "Germany", "German", "spouse visa and family reunion", "Goethe-Institut exams"],
    ["Goethe-Zertifikat B1", "Language Visa", "Germany", "German", "settlement, work, and citizenship paths", "Goethe-Institut exams"],
    ["TestDaF", "Language Visa", "Germany", "German", "university admissions", "TestDaF Institute"],
    ["telc Deutsch B1/B2", "Language Visa", "Germany", "German", "work, nursing, and residence paths", "telc"],
    ["CILS B1 Cittadinanza", "Language Visa", "Italy", "Italian", "Italian citizenship", "Universita per Stranieri di Siena"],
    ["CELI B1", "Language Visa", "Italy", "Italian", "citizenship and residence", "Universita per Stranieri di Perugia"],
    ["PLIDA B1", "Language Visa", "Italy", "Italian", "citizenship and study", "Societa Dante Alighieri"],
    ["Dutch Inburgering A2/B1", "Language Visa", "Netherlands", "Dutch", "integration, residence, and citizenship", "DUO Inburgeren"],
    ["Staatsexamen NT2", "Language Visa", "Netherlands", "Dutch", "work and higher education", "DUO Inburgeren"],
    ["YKI Finnish", "Language Visa", "Finland", "Finnish", "Finnish citizenship", "Finnish National Agency for Education"],
    ["Portuguese CIPLE", "Language Visa", "Portugal", "Portuguese", "residence and citizenship", "CAPLE"],
    ["DELE A2", "Language Visa", "Spain", "Spanish", "Spanish citizenship", "Instituto Cervantes"],
    ["CCSE Spain", "Language Visa", "Spain", "Spanish", "Spanish citizenship civics", "Instituto Cervantes"],
    ["TEF Canada", "Language Visa", "Canada", "French", "Canadian immigration", "CCI Paris Ile-de-France"],
    ["TCF Canada", "Language Visa", "Canada", "French", "Canadian immigration", "France Education International"],
    ["TCF IRN", "Language Visa", "France", "French", "French residence and citizenship", "France Education International"],
    ["DELF B1/B2", "Language Visa", "France", "French", "study, work, and residence", "France Education International"],
    ["Norskprove", "Language Visa", "Norway", "Norwegian", "residence and citizenship", "Kompetanse Norge"],
    ["Prove i Dansk 3", "Language Visa", "Denmark", "Danish", "residence, work, and citizenship", "SIRI Denmark"],
    ["Swedex B1/B2", "Language Visa", "Sweden", "Swedish", "work and study", "Swedex"],
    ["LanguageCert SELT", "Language Visa", "United Kingdom", "English", "UK visa and immigration", "LanguageCert"],
    ["IELTS UKVI", "Language Visa", "United Kingdom", "English", "UK visa and study", "IELTS"],
    ["PTE Home", "Language Visa", "United Kingdom", "English", "UK family and settlement visas", "Pearson PTE"],
    ["PTE Academic", "Language Visa", "Australia/Canada/UK", "English", "study and immigration", "Pearson PTE"],
    ["OET Medicine/Nursing", "Medical Language", "Global", "English", "healthcare registration", "OET"],
    ["NCLEX-RN", "Nursing", "United States/Canada", "English", "registered nursing license", "NCSBN"],
    ["NMC CBT", "Nursing", "United Kingdom", "English", "overseas nurse registration", "NMC"],
    ["NMC OSCE", "Nursing", "United Kingdom", "English", "overseas nurse registration", "NMC"],
    ["CCHI CoreCHI", "Interpreter", "United States", "Multilingual", "healthcare interpreting", "CCHI Certification"],
    ["CCHI CHI Spanish", "Interpreter", "United States", "Spanish", "healthcare interpreting", "CCHI Certification"],
    ["CCHI CHI Arabic", "Interpreter", "United States", "Arabic", "healthcare interpreting", "CCHI Certification"],
    ["CCHI CHI Mandarin", "Interpreter", "United States", "Mandarin", "healthcare interpreting", "CCHI Certification"],
    ["NBCMI CMI Spanish", "Interpreter", "United States", "Spanish", "medical interpreting", "NBCMI"],
    ["NBCMI CMI Russian", "Interpreter", "United States", "Russian", "medical interpreting", "NBCMI"],
    ["ATA Certification", "Interpreter", "United States", "Language pairs", "translator certification", "American Translators Association"],
    ["Federal Court Interpreter Spanish", "Interpreter", "United States", "Spanish", "federal court interpreting", "US Courts"],
    ["NMLS SAFE MLO", "State License", "United States", "English", "mortgage loan originator license", "NMLS Resource Center"],
    ["Real Estate Salesperson", "State License", "United States", "English", "state real estate license", "State Real Estate Commissions"],
    ["Insurance Producer Life & Health", "State License", "United States", "English", "state insurance license", "State Insurance Departments"],
    ["Insurance Property & Casualty", "State License", "United States", "English", "state insurance license", "State Insurance Departments"],
    ["Contractor License", "State License", "United States", "English", "state contractor licensing", "NASCLA"],
    ["Electrician Journeyman", "State License", "United States", "English", "state electrical license", "State Licensing Boards"],
    ["Cosmetology State Board", "State License", "United States", "English", "cosmetology license", "State Cosmetology Boards"],
    ["CDL Knowledge Test", "State License", "United States", "English", "commercial driving license", "State DMVs"],
    ["FAA Part 107", "State License", "United States", "English", "commercial drone pilot certificate", "FAA"],
    ["Notary Public Exam", "State License", "United States", "English", "state notary commission", "State Secretaries of State"],
    ["PTCB CPhT", "Healthcare Entry", "United States", "English", "pharmacy technician certification", "PTCB"],
    ["CNA State Exam", "Healthcare Entry", "United States", "English", "certified nursing assistant", "State Nursing Aide Registries"],
    ["CCMA", "Healthcare Entry", "United States", "English", "clinical medical assistant", "NHA"],
    ["USMLE Step 1", "Medicine", "United States", "English", "medical licensing", "USMLE"],
  ].map(([name, category, country, language, intent, officialSource]) => ({
    name,
    category,
    country,
    language,
    intent,
    officialSource,
    lastUpdated,
    officialUrl: sourceUrlFor(officialSource),
    demand: demandFor(category),
    difficulty: difficultyFor(category),
    monetization: monetizationFor(category),
  }));

  const pageIntents = [
    "fee and total cost",
    "eligibility and required documents",
    "practice test and study plan",
    "best courses and tutor leads",
  ];

  const pageSeeds = exams.flatMap((exam) =>
    pageIntents.map((intent) => ({
      title: `${exam.name} ${intent}`,
      exam: exam.name,
      category: exam.category,
      country: exam.country,
      intent,
      officialSource: exam.officialSource,
      lastUpdated: exam.lastUpdated,
    }))
  );

  const tools = [
    {
      name: "Exam Cost Calculator",
      promise: "Show exam fee, prep budget, retake risk, and realistic total cash needed.",
      conversion: "Email capture for updated fee alerts.",
    },
    {
      name: "Visa Exam Path Finder",
      promise: "Match country, goal, and language to the first exam page a user should read.",
      conversion: "Tutor, course, or consultant lead handoff.",
    },
    {
      name: "AI Mock Entry",
      promise: "Collect speaking/writing scenario and route users toward original practice prompts.",
      conversion: "Paid mock tokens without copyrighted exam questions.",
    },
  ];

  function sourceUrlFor(name) {
    const known = sources.find((source) => source.name === name);
    const fallback = {
      "TestDaF Institute": "https://www.testdaf.de/",
      telc: "https://www.telc.net/",
      "Universita per Stranieri di Siena": "https://cils.unistrasi.it/",
      "Universita per Stranieri di Perugia": "https://www.cvcl.it/",
      "Societa Dante Alighieri": "https://plida.dante.global/",
      "Finnish National Agency for Education": "https://www.oph.fi/",
      CAPLE: "https://caple.letras.ulisboa.pt/",
      "Instituto Cervantes": "https://examenes.cervantes.es/",
      "CCI Paris Ile-de-France": "https://www.lefrancaisdesaffaires.fr/",
      "France Education International": "https://www.france-education-international.fr/",
      "Kompetanse Norge": "https://www.kompetansenorge.no/",
      "SIRI Denmark": "https://www.nyidanmark.dk/",
      Swedex: "https://www.swedex.info/",
      LanguageCert: "https://www.languagecert.org/",
      IELTS: "https://ielts.org/",
      "Pearson PTE": "https://www.pearsonpte.com/",
      OET: "https://oet.com/",
      NCSBN: "https://www.nclex.com/",
      NMC: "https://www.nmc.org.uk/",
      NBCMI: "https://www.certifiedmedicalinterpreters.org/",
      "American Translators Association": "https://www.atanet.org/",
      "US Courts": "https://www.uscourts.gov/",
      "State Real Estate Commissions": "https://www.arello.org/",
      "State Insurance Departments": "https://content.naic.org/",
      NASCLA: "https://www.nascla.org/",
      "State Licensing Boards": "https://www.careeronestop.org/",
      "State Cosmetology Boards": "https://www.careeronestop.org/",
      "State DMVs": "https://www.fmcsa.dot.gov/",
      FAA: "https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot",
      "State Secretaries of State": "https://www.nass.org/",
      PTCB: "https://www.ptcb.org/",
      "State Nursing Aide Registries": "https://www.careeronestop.org/",
      NHA: "https://www.nhanow.com/",
      USMLE: "https://www.usmle.org/",
    };
    return known ? known.url : fallback[name] || "https://www.careeronestop.org/";
  }

  function demandFor(category) {
    if (category.includes("Language")) return "High-intent immigration deadline";
    if (category.includes("Interpreter") || category.includes("Nursing")) return "Career license with high anxiety";
    if (category.includes("State")) return "License-to-earn-money demand";
    return "Professional advancement";
  }

  function difficultyFor(category) {
    if (category.includes("Language")) return "Medium";
    if (category.includes("Interpreter")) return "Hard";
    if (category.includes("State")) return "Medium";
    return "Medium";
  }

  function monetizationFor(category) {
    if (category.includes("Language")) return "speaking cards, AI mock, tutor leads, visa consultant leads";
    if (category.includes("Interpreter")) return "glossaries, roleplay audio, 40-hour course leads, paid feedback";
    if (category.includes("State")) return "prelicensing school leads, checklists, reminders, course affiliate";
    return "prep courses, paid planners, practice diagnostics";
  }

  function calculateExamBudget(input) {
    const examFee = Number(input.examFee) || 0;
    const prepBudget = Number(input.prepBudget) || 0;
    const retakes = Number(input.retakes) || 0;
    return {
      examFee,
      prepBudget,
      retakes,
      total: examFee + prepBudget + examFee * retakes,
    };
  }

  function recommendExamPath(input, locale = "en") {
    const goal = String(input.goal || "").toLowerCase();
    const country = String(input.country || "").toLowerCase();
    const language = String(input.language || "").toLowerCase();
    const zh = locale === "zh";

    if (goal.includes("spouse") && country.includes("germany")) {
      return pathResult(
        "Goethe-Zertifikat A1",
        zh
          ? [
              "确认你的签证路径是否要求 A1 或更高 CEFR 等级。",
              "优先查看 Goethe 官方页面，核对考试形式、考点和报名规则。",
              "从原创口语卡片和每日听力练习开始。",
            ]
          : [
              "Confirm whether the visa route requires A1 or a higher CEFR level.",
              "Use the official Goethe exam page for format, centers, and registration rules.",
              "Start with original speaking cards and daily listening drills.",
            ],
        zh
      );
    }

    if (country.includes("netherlands") || language.includes("dutch")) {
      return pathResult(
        "Dutch Inburgering A2/B1",
        zh
          ? [
              "在 DUO 核对当前融入路径和考试模块。",
              "报名之前先制定口语和 KNM 练习计划。",
              "把官方截止日期和重考规则放进同一个追踪表。",
            ]
          : [
              "Check DUO for the current integration route and exam components.",
              "Build a speaking and KNM practice plan before booking.",
              "Collect official deadlines and retake rules in one tracker.",
            ],
        zh
      );
    }

    if (language.includes("italian") || country.includes("italy")) {
      return pathResult(
        "CILS B1 Cittadinanza",
        zh
          ? [
              "确认你的申请是否接受 CILS、CELI 或 PLIDA。",
              "对比考试日期和附近考点。",
              "使用原创口语题境和入籍词汇清单练习。",
            ]
          : [
              "Confirm whether CILS, CELI, or PLIDA is accepted for the user's case.",
              "Compare exam dates and nearby centers.",
              "Use original oral prompts and citizenship vocabulary lists.",
            ],
        zh
      );
    }

    if (country.includes("portugal") || language.includes("portuguese")) {
      return pathResult(
        "CIPLE A2",
        zh
          ? [
              "在 CAPLE 官网核对你适用的葡萄牙语等级与考试形式。",
              "确认入籍或永居所需的是 CIPLE 还是其他等级。",
              "用原创口语场景和日常葡萄牙语素材练习。",
            ]
          : [
              "Check the CAPLE site for the required Portuguese level and exam format.",
              "Confirm whether your route needs CIPLE or a different level.",
              "Practice with original speaking scenarios and everyday Portuguese materials.",
            ],
        zh
      );
    }

    if (country.includes("spain") || language.includes("spanish")) {
      return pathResult(
        "DELE A2 + CCSE",
        zh
          ? [
              "在 Instituto Cervantes 核对 DELE 等级与 CCSE 公民考试要求。",
              "确认入籍路径是否两者都需要。",
              "用原创题境和西班牙文化常识资料备考。",
            ]
          : [
              "Check Instituto Cervantes for the DELE level and CCSE civics requirement.",
              "Confirm whether your citizenship route needs both exams.",
              "Prepare with original prompts and Spanish culture study notes.",
            ],
        zh
      );
    }

    if (country.includes("finland") || language.includes("finnish")) {
      return pathResult(
        "YKI National Certificate",
        zh
          ? [
              "在芬兰国家教育署核对 YKI 等级与可用语种。",
              "确认入籍或永居所需的语言等级。",
              "用原创口语和写作题境练习。",
            ]
          : [
              "Check the Finnish National Agency for Education for YKI levels and languages.",
              "Confirm the language level your citizenship or residence route requires.",
              "Practice with original speaking and writing prompts.",
            ],
        zh
      );
    }

    if (country.includes("norway") || language.includes("norwegian")) {
      return pathResult(
        "Norskprove",
        zh
          ? [
              "在 Kompetanse Norge 核对当前融入考试模块与等级。",
              "确认口语、写作、社会知识各模块要求。",
              "用原创场景和官方样题说明练习。",
            ]
          : [
              "Check Kompetanse Norge for current integration exam modules and levels.",
              "Confirm the speaking, writing, and social-studies requirements.",
              "Practice with original scenarios and the official sample descriptions.",
            ],
        zh
      );
    }

    if (country.includes("denmark") || language.includes("danish")) {
      return pathResult(
        "Prove i Dansk 3",
        zh
          ? [
              "在 SIRI 核对融入路径与可用考试等级。",
              "确认口语和阅读模块的报名规则。",
              "用原创日常丹麦语场景练习。",
            ]
          : [
              "Check SIRI for the integration route and available exam levels.",
              "Confirm the speaking and reading module registration rules.",
              "Practice with original everyday Danish scenarios.",
            ],
        zh
      );
    }

    if (country.includes("canada") && (language.includes("french") || goal.includes("immigration"))) {
      return pathResult(
        "TEF Canada / TCF Canada",
        zh
          ? [
              "在 CCI 或 France Éducation International 核对认可的加拿大法语考试。",
              "对比 TEF Canada 与 TCF Canada 的形式与等级换算。",
              "用原创口语和写作场景按移民口径练习。",
            ]
          : [
              "Check the accepted Canadian French exams with CCI or France Éducation International.",
              "Compare TEF Canada and TCF Canada formats and level conversions.",
              "Practice with original speaking and writing prompts aligned to immigration scoring.",
            ],
        zh
      );
    }

    if (country.includes("france") || language.includes("french")) {
      return pathResult(
        "TCF IRN / DELF B1",
        zh
          ? [
              "在 France Éducation International 核对入籍或居留所需考试。",
              "区分 TCF IRN（居留/入籍）与 DELF（长期学习/工作）。",
              "用原创口语和听力场景练习。",
            ]
          : [
              "Check France Éducation International for the exam your residence or citizenship route needs.",
              "Distinguish TCF IRN (residence/citizenship) from DELF (long-term study/work).",
              "Practice with original speaking and listening scenarios.",
            ],
        zh
      );
    }

    if (country.includes("united kingdom") || country.includes(" uk")) {
      return pathResult(
        "LanguageCert SELT / IELTS UKVI",
        zh
          ? [
              "在 UKVI 官网确认你的签证类别所需 CEFR 等级（A1/A2/B1/B2）。",
              "核对认可的 SELT 考试方：LanguageCert 或 IELTS UKVI。",
              "用原创口语和听力场景按 SELT 形式练习。",
            ]
          : [
              "Check the UKVI site for the CEFR level your visa category requires (A1/A2/B1/B2).",
              "Confirm accepted SELT providers: LanguageCert or IELTS UKVI.",
              "Practice with original speaking and listening prompts in the SELT format.",
            ],
        zh
      );
    }

    if (goal.includes("citizenship")) {
      return pathResult(
        "Country citizenship language exam",
        zh
          ? [
              "先在目标国移民或内政部门官网确认入籍语言等级。",
              "确认被认可的考试方和证书有效期。",
              "用原创口语、写作场景和官方样题说明备考。",
            ]
          : [
              "Start at the target country's immigration or interior ministry site for the citizenship language level.",
              "Confirm accepted exam providers and certificate validity.",
              "Prepare with original speaking and writing prompts plus official sample descriptions.",
            ],
        zh
      );
    }

    return pathResult(
      "LanguageCert SELT",
      zh
        ? [
            "先从目标国家的官方签证语言要求开始。",
            "确认被接受的考试后，再比较备考产品。",
            "追踪费用、材料规则、重考政策和截止日期。",
          ]
        : [
            "Start from the official visa requirement for the target country.",
            "Pick the accepted exam before comparing prep products.",
            "Track fees, document rules, retake policy, and deadlines.",
          ],
      zh
    );
  }

  function pathResult(primaryExam, nextSteps, zh = false) {
    return {
      primaryExam,
      nextSteps,
      warning: zh
        ? "合规规则：只使用原创练习和官方链接；避免泄题、虚假授权或受版权保护的真实考题。费用、日期与政策可能变动，请以官方来源为准。"
        : "Compliance rule: use original practice and official links only; avoid leaked questions, fake authorization, or copyrighted real exam items. Fees, dates, and policies change — always check the official source.",
    };
  }

  return {
    exams,
    brand,
    i18n,
    pageSections,
    pageSeeds,
    sources,
    tools,
    calculateExamBudget,
    recommendExamPath,
  };
});
