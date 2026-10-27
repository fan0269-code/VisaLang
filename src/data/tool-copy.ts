export type ToolLocale = 'en' | 'zh-CN';
export type ToolId = 'finder' | 'checklist' | 'timeline' | 'comparison' | 'reminders';

export const supportedToolLocales = ['en', 'zh-CN'] as const;

export interface ToolCopy {
  id: ToolId;
  eyebrow: string;
  title: string;
  description: string;
  formTitle: string;
  formIntro: string;
  submitLabel: string;
  resultTitle: string;
  guidanceTitle: string;
  fields: Readonly<Record<string, string>>;
  text: Readonly<Record<string, string>>;
}

const englishLinks = {
  finder: '/tools/route-finder/',
  checklist: '/tools/checklist-generator/',
  timeline: '/tools/timeline-calculator/',
  comparison: '/tools/exam-comparison/',
  reminders: '/tools/email-reminders/',
} as const;

const chineseLinks = {
  finder: '/zh/tools/route-finder/',
  checklist: '/zh/tools/checklist-generator/',
  timeline: '/zh/tools/timeline-calculator/',
  comparison: '/zh/tools/exam-comparison/',
  reminders: '/zh/tools/email-reminders/',
} as const;

export const getToolLinks = (locale: ToolLocale = 'en') => locale === 'zh-CN' ? chineseLinks : englishLinks;

export const commonToolCopy = {
  en: {
    navAria: 'Decision tools',
    nav: { finder: 'Route Finder', checklist: 'Checklist', timeline: 'Timeline', comparison: 'Compare exams', reminders: 'Reminders' },
    steps: ['Understand the scope', 'Enter verified facts', 'Review and export'],
    sharedTitle: 'Shared plan on this browser',
    sharedPrivacyLead: 'Session-only by default:',
    sharedPrivacy: 'approved fields can move between the five tools in this tab. They are not added to the page URL. Do not enter passport numbers, application numbers, payment details, document contents, private messages, or other sensitive data.',
    restartLead: 'Restart boundary:',
    restartBoundary: 'Restart resets this form and its owned plan fields. Shared route remains when restarting Checklist or Reminders; shared date or exam choices can be cleared by the tool that owns them. Use Clear shared plan to remove the whole plan.',
    save: 'Save on this device for 30 days',
    clear: 'Clear shared plan',
    initialStatus: 'Shared plan controls will initialise with this tool.',
    runtimeLoading: 'Loading the interactive tool…',
    runtimeError: 'The interactive tool could not finish loading. Your entries have not been submitted. Reload to try again, or use the official-source guidance below.',
    runtimeRetry: 'Reload tool',
    readyStatus: 'Interactive controls are ready.',
    copyFallbackTitle: 'Select and copy this text manually',
    copyFallbackHelp: 'Automatic copying is unavailable. The complete text is provided below.',
    noScriptLead: 'JavaScript is required for this planning tool.',
    noScript: 'The form stays disabled and entries are not submitted to the page URL. Use the linked official sources directly if JavaScript is unavailable.',
    restart: 'Restart this tool',
    supportLead: 'Informational guidance only.',
    supportBoundary: 'This tool organises planning questions; it does not decide visa eligibility, certificate acceptance, exam availability, or an individual application outcome.',
    officialCheckTitle: 'Official check before you act',
    officialCheck: 'Confirm the exact requirement, accepted certificate, documents, date, fee, result process, and local centre rules with the authority or official centre that receives your file.',
    continueTitle: 'Continue your plan',
    browseGuides: 'Browse route guides',
    openChecklist: 'Open Checklist',
    openTimeline: 'Open Timeline',
    copy: 'Copy result',
    copied: 'Copied.',
    copyUnavailable: 'Copy unavailable. Select the result text manually.',
    print: 'Print plan',
    export: 'Export text file',
    required: '{field} is required.',
    valid: 'Enter a valid {field}.',
    minimum: '{field} must be {value} or greater.',
    maximum: '{field} must be {value} or less.',
    validValue: 'Enter a valid value for {field}.',
    errorSummaryOne: 'Fix 1 field error',
    errorSummaryMany: 'Fix {count} field errors',
    planSaved: 'Shared plan saved on this device for 30 days.',
    planCleared: 'Shared plan cleared.',
  },
  'zh-CN': {
    navAria: '决策工具',
    nav: { finder: '路线查找器', checklist: '要求核对清单', timeline: '时间线规划器', comparison: '考试比较', reminders: '提醒计划' },
    steps: ['了解适用范围', '输入已核实信息', '检查并导出'],
    sharedTitle: '此浏览器中的共享计划',
    sharedPrivacyLead: '默认仅保留在当前会话：',
    sharedPrivacy: '五个工具可在此标签页传递已允许的字段，且不会把这些字段写入页面网址。请勿输入护照号、申请号、付款信息、文件内容、私人消息或其他敏感信息。',
    restartLead: '重新开始的范围：',
    restartBoundary: '重新开始只会重置当前表单及其负责的计划字段。核对清单或提醒工具重启时会保留共享路线；日期或考试选择可由负责该字段的工具清除。使用“清除共享计划”可删除全部计划。',
    save: '在此设备保存 30 天',
    clear: '清除共享计划',
    initialStatus: '正在为此工具初始化共享计划。',
    runtimeLoading: '正在加载交互工具…',
    runtimeError: '交互工具未能完成加载，填写内容尚未提交。请重新加载后重试，或直接使用下方的官方来源指引。',
    runtimeRetry: '重新加载工具',
    readyStatus: '交互控件已就绪。',
    copyFallbackTitle: '手动选择并复制以下文字',
    copyFallbackHelp: '自动复制不可用，完整文字已显示在下方。',
    noScriptLead: '此规划工具需要 JavaScript。',
    noScript: '表单会保持停用，输入内容也不会提交到页面网址。若 JavaScript 不可用，请直接使用所链接的官方来源。',
    restart: '重新开始此工具',
    supportLead: '仅供信息整理。',
    supportBoundary: '此工具只整理规划问题，不判断签证资格、证书是否被接受、考试是否有名额或个人申请结果。',
    officialCheckTitle: '行动前先向官方核验',
    officialCheck: '请向接收材料的主管机关或官方考点确认准确要求、可接受证书、材料、日期、费用、成绩流程及当地考点规则。',
    continueTitle: '继续你的计划',
    browseGuides: '浏览路线指南',
    openChecklist: '打开要求核对清单',
    openTimeline: '打开时间线规划器',
    copy: '复制结果',
    copied: '已复制。',
    copyUnavailable: '无法自动复制，请手动选择并复制结果文字。',
    print: '打印计划',
    export: '导出文本文件',
    required: '必须填写“{field}”。',
    valid: '请输入有效的“{field}”。',
    minimum: '“{field}”必须不小于 {value}。',
    maximum: '“{field}”必须不大于 {value}。',
    validValue: '请为“{field}”输入有效值。',
    errorSummaryOne: '请修正 1 个字段错误',
    errorSummaryMany: '请修正 {count} 个字段错误',
    planSaved: '共享计划已在此设备保存 30 天。',
    planCleared: '共享计划已清除。',
  },
} as const;

const toolCopy: Readonly<Record<ToolLocale, Readonly<Record<ToolId, ToolCopy>>>> = {
  en: {
    finder: { id: 'finder', eyebrow: 'Decision route', title: 'Route Finder', description: 'Answer the route questions needed for a safe starting point. Germany spouse reunification A1 is the only fully configured route.', formTitle: 'Tell us what you are planning', formIntro: 'These bounded route facts determine the verification path. Language level and target date belong to later exam or time planning and are not required here.', submitLabel: 'Find my starting route', resultTitle: 'Your route starting point', guidanceTitle: 'When Route Finder is useful', fields: { country: 'Country', purpose: 'Purpose', region: 'Application region', relationship: 'Family relationship', certificate: 'Existing certificate' }, text: { selectCountry: 'Select a country', germany: 'Germany', otherCountry: 'Another country', selectPurpose: 'Select a purpose', family: 'Family reunion', b1: 'Settlement or citizenship / B1', ausbildung: 'Ausbildung', nursing: 'Nursing', university: 'University', otherPurpose: 'Another purpose', selectRegion: 'Select the current application region', selectRelationship: 'Select the relationship category', selectCertificate: 'Select one option', noCertificate: 'No certificate yet', a1Certificate: 'I have an A1 certificate', otherCertificate: 'I have another certificate' } },
    checklist: { id: 'checklist', eyebrow: 'Organise evidence', title: 'Requirement Checklist', description: 'Create a working checklist with clear priority, completion status, and the next official check. It is not an authority document list.', formTitle: 'Choose a route', formIntro: 'Only Germany family reunion A1 has a configured route checklist. Other selections remain a safe verification checklist.', submitLabel: 'Build my checklist', resultTitle: 'Your working checklist', guidanceTitle: 'When to use the Requirement Checklist', fields: { route: 'Route' }, text: { selectRoute: 'Select your route', configured: 'configured', verifyFirst: 'verify first', copy: 'Copy checklist', print: 'Print checklist', export: 'Export text file', fallbackTitle: 'Select and copy this checklist text', fallbackText: 'Your browser blocked automatic copying. The complete checklist remains available below.', fallbackAria: 'Checklist text for manual copying' } },
    timeline: { id: 'timeline', eyebrow: 'Plan backwards', title: 'Timeline Planner', description: 'Subtract user-entered calendar-day assumptions from a target date. This planning estimate does not claim real centre dates or result timing.', formTitle: 'Enter your own planning buffers', formIntro: 'Use current official centre information for every input. The calculator does not know local availability.', submitLabel: 'Calculate planning dates', resultTitle: 'Your planning estimate', guidanceTitle: 'When the Timeline Planner is safe to use', fields: { targetDate: 'Target date (D)', exam: 'Exam product', wait: 'Result and certificate wait, calendar days (W)', documents: 'Document preparation, calendar days (P)', retake: 'Additional retake buffer, calendar days (R)' }, text: { selectExam: 'Select a configured exam', inputHelp: 'All subtraction uses calendar days. Enter only your own planning assumptions or values confirmed for the selected centre and document process. No provider or authority default is assumed.' } },
    comparison: { id: 'comparison', eyebrow: 'Planning aid, not an acceptance decision', title: 'Exam Comparison', description: 'Compare two verified adult products at the same level: A1 or B1. This tool does not rank providers or decide which certificate an authority will accept.', formTitle: 'Choose two exact exam products', formIntro: 'Only source-reviewed product facts appear as facts. Local fees, seats, result timing, and immigration acceptance stay as separate verification tasks.', submitLabel: 'Compare exams', resultTitle: 'Your exam comparison', guidanceTitle: 'When Exam Comparison is useful', fields: { first: 'First exam product', second: 'Second exam product' }, text: { selectFirst: 'Select the first exam', selectSecond: 'Select the second exam' } },
    reminders: { id: 'reminders', eyebrow: 'Local planning only', title: 'Reminder Planner', description: 'Create a reminder plan for your own calendar, local storage, notes, or printer. No email service is connected.', formTitle: 'Create a verification reminder', formIntro: 'Only stable topic and route IDs join the shared plan. No email is sent and no account is created.', submitLabel: 'Create reminder plan', resultTitle: 'Your reminder plan', guidanceTitle: 'When the Reminder Planner is useful', fields: { topic: 'Reminder topic', date: 'Reminder date', route: 'Route' }, text: { selectTopic: 'Select a topic', selectRoute: 'Select a route', download: 'Download ICS' } },
  },
  'zh-CN': {
    finder: { id: 'finder', eyebrow: '确定核验路线', title: '路线查找器', description: '回答必要的路线问题，找到安全的核验起点。目前仅完整配置了德国配偶团聚 A1 路线。', formTitle: '说明你的计划', formIntro: '这些有限的路线信息只用于确定核验顺序。语言等级和目标日期属于后续考试或时间规划，此处无需填写。', submitLabel: '查找起始路线', resultTitle: '你的路线起点', guidanceTitle: '何时使用路线查找器', fields: { country: '国家', purpose: '目的', region: '申请地区', relationship: '家庭关系', certificate: '现有证书' }, text: { selectCountry: '选择国家', germany: '德国', otherCountry: '其他国家', selectPurpose: '选择目的', family: '家庭团聚', b1: '永居或入籍 / B1', ausbildung: '职业培训', nursing: '护理工作', university: '大学申请', otherPurpose: '其他目的', selectRegion: '选择当前申请地区', selectRelationship: '选择关系类别', selectCertificate: '选择一项', noCertificate: '尚无证书', a1Certificate: '我已有 A1 证书', otherCertificate: '我有其他证书' } },
    checklist: { id: 'checklist', eyebrow: '整理核验依据', title: '要求核对清单', description: '生成一份包含顺序、完成状态和下一项官方核验的工作清单；它不是主管机关的材料清单。', formTitle: '选择路线', formIntro: '目前只有德国家庭团聚 A1 路线配置了专用清单。其他选择只会返回安全的官方核验提示。', submitLabel: '生成我的核对清单', resultTitle: '你的工作清单', guidanceTitle: '何时使用要求核对清单', fields: { route: '路线' }, text: { selectRoute: '选择你的路线', configured: '已配置', verifyFirst: '先核验', copy: '复制清单', print: '打印清单', export: '导出文本文件', fallbackTitle: '选择并复制以下清单文字', fallbackText: '浏览器阻止了自动复制，完整清单仍显示在下方。', fallbackAria: '用于手动复制的清单文字' } },
    timeline: { id: 'timeline', eyebrow: '从目标日期倒排', title: '时间线规划器', description: '从目标日期减去你输入的日历日假设。本工具不会声称掌握真实考点日期或出成绩时间。', formTitle: '输入你自己的规划缓冲期', formIntro: '每项输入都应来自当前官方考点信息或你明确记录的假设；计算器不了解当地名额。', submitLabel: '计算规划日期', resultTitle: '你的规划估算', guidanceTitle: '何时可以安全使用时间线规划器', fields: { targetDate: '目标日期（D）', exam: '考试产品', wait: '成绩与证书等待日历日（W）', documents: '材料准备日历日（P）', retake: '额外重考缓冲日历日（R）' }, text: { selectExam: '选择已配置的考试', inputHelp: '所有减法都按日历日计算。只输入你自己的规划假设，或已向所选考点和材料流程确认的数值；本工具不会套用任何考试机构或主管机关的默认值。' } },
    comparison: { id: 'comparison', eyebrow: '规划辅助，不作接受决定', title: '考试比较', description: '比较同一等级的两个已核验成人考试产品：A1 或 B1。本工具不对机构排名，也不判断主管机关是否接受某张证书。', formTitle: '选择两个准确的考试产品', formIntro: '只有经来源复核的产品事实才会作为事实显示。当地费用、名额、出分时间及移民机关是否接受，仍是分开的核验任务。', submitLabel: '比较考试', resultTitle: '你的考试比较', guidanceTitle: '何时使用考试比较', fields: { first: '第一个考试产品', second: '第二个考试产品' }, text: { selectFirst: '选择第一个考试', selectSecond: '选择第二个考试' } },
    reminders: { id: 'reminders', eyebrow: '仅在本地规划', title: '提醒计划', description: '为你自己的日历、本地存储、笔记或打印件创建核验提醒。本站没有连接电子邮件发送服务。', formTitle: '创建核验提醒', formIntro: '只有稳定的主题和路线 ID 会进入共享计划。本站不会发送邮件，也不会创建账户。', submitLabel: '创建提醒计划', resultTitle: '你的提醒计划', guidanceTitle: '何时使用提醒计划', fields: { topic: '提醒主题', date: '提醒日期', route: '路线' }, text: { selectTopic: '选择主题', selectRoute: '选择路线', download: '下载 ICS 日历文件' } },
  },
};

export function getToolCopy(toolId: ToolId, locale: ToolLocale = 'en'): ToolCopy {
  return toolCopy[locale === 'zh-CN' ? 'zh-CN' : 'en'][toolId];
}

const reminderTopics = [
  { id: 'confirm-language-requirement', en: 'Confirm the language requirement', zh: '确认语言要求' },
  { id: 'check-official-centre', en: 'Check an official test centre', zh: '核验官方或授权考点' },
  { id: 'review-requirement-checklist', en: 'Review my requirement checklist', zh: '复核我的要求核对清单' },
  { id: 'recalculate-timeline', en: 'Recalculate my timeline', zh: '重新计算我的时间线' },
  { id: 'recheck-official-source', en: 'Recheck an official source', zh: '重新核验官方来源' },
] as const;

export const getReminderTopicOptions = (locale: ToolLocale = 'en') => reminderTopics.map((topic) => ({
  id: topic.id,
  label: locale === 'zh-CN' ? topic.zh : topic.en,
}));

const routeLabelsZh: Readonly<Record<string, string>> = {
  'germany-family-reunion-a1': '德国家庭团聚 A1',
  'germany-b1': '德国 B1 路线',
  'germany-ausbildung': '德国职业培训路线',
  'germany-nursing': '德国护理路线',
  'germany-university': '德国大学申请路线',
};

export const getRouteLabel = (routeId: string, englishLabel: string, locale: ToolLocale = 'en') => (
  locale === 'zh-CN' ? (routeLabelsZh[routeId] ?? englishLabel) : englishLabel
);

const applicationRegionLabelsZh: Readonly<Record<string, string>> = {
  'germany-mission-china': '在中国申请所在地负责的德国使领馆',
  'germany-mission-outside-china': '在其他申请所在地负责的德国使领馆',
  'other-receiving-authority': '其他国家或接收机关',
  'not-confirmed': '尚未确认',
};

export const getApplicationRegionLabel = (regionId: string, englishLabel: string, locale: ToolLocale = 'en') => (
  locale === 'zh-CN' ? (applicationRegionLabelsZh[regionId] ?? englishLabel) : englishLabel
);

const certificateLabelsZh: Readonly<Record<string, string>> = {
  none: '尚无证书',
  a1: '已有 A1 证书——仍须由主管机关确认是否接受',
  other: '已有其他证书——仍须由主管机关确认是否接受',
};

export const getCertificateLabel = (certificateId: string, englishLabel: string, locale: ToolLocale = 'en') => (
  locale === 'zh-CN' ? (certificateLabelsZh[certificateId] ?? englishLabel) : englishLabel
);

export const checklistStageLabels = {
  en: { requirement: '1. Requirement and authority', 'exam-choice': '2. Exact exam product', booking: '3. Booking and payment', 'exam-certificate': '4. Test day, result and certificate', 'submission-review': '5. Submission review' },
  'zh-CN': { requirement: '1. 要求与主管机关', 'exam-choice': '2. 准确考试产品', booking: '3. 报名与付款', 'exam-certificate': '4. 考试日、成绩与证书', 'submission-review': '5. 递交前复核' },
} as const;

export const checklistItemZh: Readonly<Record<string, { action: string; doneWhen: string; owner: string }>> = {
  'requirement.identify-competent-mission': { action: '确认对申请所在地有管辖权的德国使领馆或主管机关', doneWhen: '已保存官方使领馆或主管机关页面及核验日期', owner: '有管辖权的德国使领馆或接收申请的移民主管机关' },
  'requirement.record-language-proof-answer': { action: '记录主管机关对当前语言证明及例外问题的答复', doneWhen: '已逐字记录适用于该路线的说明及来源或官方回复，且未据此推断个人资格', owner: '有管辖权的德国使领馆或接收申请的移民主管机关' },
  'exam-choice.record-accepted-product': { action: '记录接收机关表示可用于该路线的准确成人 A1 考试产品', doneWhen: '完整产品名称与适用于该路线的机关依据一并保存', owner: '有管辖权的德国使领馆或接收申请的移民主管机关' },
  'exam-choice.match-owner-product': { action: '将记录的产品名称与考试主办方产品页逐项核对', doneWhen: '成人产品页、产品名称及来源核验日期一致', owner: 'Goethe-Institut 或 telc gGmbH' },
  'booking.verify-selected-centre': { action: '通过考试主办方路径核验所选考点', doneWhen: '已保存从考试主办方到所选考点的带日期路径或主办方官方确认', owner: '考试主办方及所选官方或授权考点' },
  'booking.confirm-current-product': { action: '确认所选考点当前提供准确的成人 A1 产品', doneWhen: '已记录考点当前产品名称、计划场次和核验日期', owner: '所选官方或授权考点' },
  'booking.match-name-and-id': { action: '让报名姓名与所选考点要求的身份证件一致', doneWhen: '已记录姓名拼写及考点当前身份证件说明，且无未解决的不一致', owner: '所选官方或授权考点' },
  'booking.capture-transaction-terms': { action: '付款前保存所选考点当前费用及付款或变更条款', doneWhen: '已从该考点保存带日期的费用、币种、付款、取消和改期依据', owner: '所选官方或授权考点' },
  'exam-certificate.reopen-test-day-instructions': { action: '重新打开所选考点当前考试日说明', doneWhen: '已再次核验已报名场次的到场、身份证件和可携带物品说明', owner: '所选官方或授权考点' },
  'exam-certificate.record-result-certificate-route': { action: '记录所选考点的成绩与证书获取流程', doneWhen: '已把当前成绩通知、证书领取或寄送流程和联系渠道作为规划输入保存，而非结果保证', owner: '所选官方或授权考点' },
  'submission-review.open-route-checklist': { action: '打开有管辖权使领馆针对准确申请路线的当前清单', doneWhen: '已保存路线专用官方清单及版本或核验日期', owner: '有管辖权的德国使领馆或接收申请的移民主管机关' },
  'submission-review.verify-language-proof-form': { action: '依据使领馆清单核验语言证明所需文件形式', doneWhen: '已从接收机关记录准确证书、原件或复印件问题，以及任何翻译或核验说明', owner: '有管辖权的德国使领馆或接收申请的移民主管机关' },
};

export const checklistSourceZh: Readonly<Record<string, { owner: string; supports: string; boundary: string }>> = {
  'https://www.auswaertiges-amt.de/en/visa-service/buergerservice/faq/01a-deutschkenntnisse-606682': { owner: '德国联邦外交部及有管辖权的德国使领馆', supports: '提供一般语言证明核验起点，并说明路线细节应由有管辖权使领馆确认', boundary: '不判断个人是否需要语言证明、是否适用例外、接受哪张证书、材料清单或签证结果' },
  'https://www.goethe.de/ins/de/en/prf/prf/gzsd1.html': { owner: 'Goethe-Institut', supports: '确认成人 Goethe-Zertifikat A1: Start Deutsch 1 的准确产品身份', boundary: '不证明移民机关接受，也不证明所选考点当前的报名或考试日条款' },
  'https://www.telc.net/en/language-examinations/certificate-exams/german/start-german1-telc-german-a1/': { owner: 'telc gGmbH', supports: '确认 Start Deutsch 1 / telc Deutsch A1 的准确产品身份', boundary: '不证明移民机关接受，也不证明所选考点当前的报名或考试日条款' },
  'https://www.goethe.de/en/spr/prf.html': { owner: 'Goethe-Institut 及所选官方或授权考点', supports: '提供查找 Goethe 考试机构或合作考点的主办方入口', boundary: '不证明特定考点的名额、当前产品、费用、身份要求、出分日期或证书流程' },
  'https://www.telc.net/en/language-examinations/find-a-telc-examination-centre/': { owner: 'telc gGmbH 及所选考试中心', supports: '提供查找候选 telc 考试中心的官方入口', boundary: '名单不证明考点当前提供准确 A1 产品、有名额或采用统一当地规则' },
};

const routeZhText: Readonly<Record<string, string>> = {
  'Guidance available': '可提供核验指引', 'More information needed': '需要补充信息', 'Authority confirmation needed': '需要主管机关确认', 'Route not supported': '暂不支持此路线',
  'Germany family reunion: A1 verification route': '德国家庭团聚：A1 核验路线',
  'Germany family reunion A1': '德国家庭团聚 A1',
  'Germany B1 route: official verification required': '德国 B1 路线：需要向主管机关核验',
  'Germany Ausbildung route: receiving organisation verification required': '德国职业培训路线：需要向接收申请的机构核验',
  'Germany nursing route: regulator and employer verification required': '德国护理路线：需要向监管机关和雇主核验',
  'Germany university route: university verification required': '德国大学申请路线：需要向大学核验',
  'Country': '国家', 'Germany': '德国', 'Another country': '其他国家', 'Not provided': '未提供', 'Purpose': '目的', 'Family reunion': '家庭团聚', 'Settlement or citizenship / B1': '永居或入籍 / B1', 'Ausbildung': '职业培训', 'Nursing': '护理工作', 'University': '大学申请', 'Another purpose': '其他目的', 'Application region': '申请地区', 'Relationship': '家庭关系', 'Certificate': '证书', 'Spouse reunification': '配偶团聚', 'No certificate yet': '尚无证书',
  'German mission responsible for a China application location': '在中国申请所在地负责的德国使领馆',
  'German mission responsible for another application location': '在其他申请所在地负责的德国使领馆',
  'Another country or receiving authority': '其他国家或接收机关',
  'Not yet confirmed': '尚未确认',
  'Another family relationship': '其他家庭关系',
  'Existing A1 certificate': '已有 A1 证书',
  'Another existing certificate': '已有其他证书',
  'Add the route information first': '请先补充路线信息',
  'This country and purpose are not configured': '此国家与目的尚未配置',
  'This configured route covers spouse reunification only': '当前已配置路线仅覆盖配偶团聚',
  'Add the information needed to identify the responsible route': '补充用于确认负责路线的信息',
  'More route information is needed': '需要更多路线信息',
  'This route is not supported': '此路线暂不支持',
  'Reconfirm the route with the responsible authority': '请向负责机关重新确认路线',
  'Verify the existing A1 certificate for this route': '核验现有 A1 证书是否适用于此路线',
  'Verify the existing certificate for this route': '核验现有证书是否适用于此路线',
  'The authority or institution receiving the application': '接收申请的主管机关或机构',
  'The official exam owner or authorised local centre': '官方考试主办方或授权当地考点',
  'The exam owner for the exact certificate product': '准确证书产品的考试主办方',
  'The exam owner and selected official or authorised test centre': '考试主办方及所选官方或授权考点',
  'Identify the authority or institution receiving the application.': '确认实际接收申请的主管机关或机构。',
  'Which language proof and level apply to this exact route?': '向该机关确认这一准确路线适用哪种语言证明及等级。',
  'Is an exemption or alternative proof relevant to my case?': '向该机关确认个人情况是否涉及例外或替代证明。',
  'Which certificate, document format, and current submission instructions are accepted?': '向该机关确认当前接受的准确证书、文件形式及递交说明。',
  'Verify the language-proof question and any exception with the competent German mission or receiving authority.': '向有管辖权的德国使领馆或接收机关核验语言证明问题及任何例外。',
  'Confirm the exact accepted adult A1 product before comparing local booking options.': '比较当地报名选择前，先确认被接受的准确成人 A1 产品。',
  'Open the working checklist, then use Timeline only after you have current local dates and planning assumptions.': '打开工作清单；只有在掌握当前当地日期和规划假设后，才使用时间线工具。',
  'Record the exact certificate product, issuing body, issue date, and document form.': '记录准确证书产品、签发机构、签发日期和文件形式。',
  'Ask the competent mission or receiving authority whether that exact certificate and document form are accepted for this route and whether any recency question applies.': '询问有管辖权的使领馆或接收机关：该准确证书及文件形式是否适用于此路线，以及是否存在时效性问题。',
  'Use the checklist to retain the authority answer and the product source separately.': '使用核对清单，分别保存主管机关答复与产品来源。',
  'Find the competent German mission or receiving authority for the exact family relationship.': '针对这一准确家庭关系，找到有管辖权的德国使领馆或接收机关。',
  'Ask which language-proof question applies before selecting an exam or using the spouse checklist.': '选择考试或使用配偶团聚核对清单前，先询问这一家庭关系适用的语言证明问题。',
  'This is planning guidance, not an individual authority decision.': '这是规划指引，不是主管机关对个人情况作出的决定。',
  'This is a language-proof preparation checklist, not a complete visa-document list, an eligibility decision, an exemption decision or an application outcome.': '这是语言证明准备清单，不是完整签证材料清单、资格决定、例外决定或申请结果。',
  'No route-specific checklist is configured. Use the organisation receiving the application to identify the applicable requirements.': '此路线尚未配置专用清单。请向接收申请的机构确认适用要求。',
};

export const translateRouteText = (value: string, locale: ToolLocale = 'en') => locale === 'zh-CN' ? (routeZhText[value] ?? value) : value;

export function localizeRouteFinderPresentation<Result extends {
  statusLabel: string; title: string; selectionSummary: readonly { label: string; value: string }[];
  guidance: string | null; missingInformation: readonly string[]; responsibleParties: readonly string[];
  nextSteps: readonly string[]; boundary: string; guide: { href: string; label: string } | null;
}>(result: Result, locale: ToolLocale = 'en'): Result {
  if (locale !== 'zh-CN') return result;
  const generic = (value: string) => translateRouteText(value, locale);
  const statusFallback = {
    'needs_information': '需要补充信息后再核验。',
    'needs_authority_confirmation': '请向负责的主管机关再次确认。',
    'unsupported': '此选择尚无经过来源复核的路线规则。',
  } as const;
  const resultStatus = String((result as Result & { status?: string }).status || '');
  return {
    ...result,
    statusLabel: generic(result.statusLabel),
    title: generic(result.title),
    selectionSummary: result.selectionSummary.map((item) => ({ label: generic(item.label), value: generic(item.value) })),
    guidance: result.guidance ? '当前证据只支持按所列顺序继续核验；最终要求及例外仍由有管辖权的接收机关决定。' : null,
    missingInformation: result.missingInformation.map((item) => ({ country: '国家', purpose: '申请目的', 'application region': '申请地区', 'relationship category': '家庭关系类别', 'certificate status': '证书状态', 'Route-specific rule and source coverage': '路线专用规则与来源覆盖', 'Current deterministic route evidence': '当前可确定路线的证据', 'versioned route evidence': '带版本的路线证据' }[item] ?? '仍需官方确认的信息')),
    responsibleParties: result.responsibleParties.map((item) => generic(item).includes('the local German mission') ? '负责申请的当地德国使领馆或主管机关' : generic(item)),
    nextSteps: result.nextSteps.map((item, index) => generic(item) === item ? (statusFallback[resultStatus as keyof typeof statusFallback] ?? ['向负责机关核验当前要求。', '记录准确考试产品及官方来源。', '只用已确认的当地信息继续规划。'][index] ?? '向负责机关核验后再行动。') : generic(item)),
    boundary: generic(result.boundary) === result.boundary ? '此结果只用于安排核验步骤，不证明个人资格、例外、证书接受或申请结果。' : generic(result.boundary),
    guide: result.guide ? { href: '/zh/germany-family-reunion-a1/', label: '查看德国家庭团聚 A1 指南' } : null,
  };
}
