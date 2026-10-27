import { reminderTopicOptions } from './plan-state.ts';
import { routeRegistry } from './route-tools.ts';
import { getReminderTopicOptions, type ToolLocale } from './tool-copy.ts';

export interface ReminderIcsInput {
  topicId?: unknown;
  routeId?: unknown;
  date?: unknown;
  sourceUrl?: unknown;
}

export interface ReminderIcsOptions {
  generatedAt?: unknown;
  locale?: ToolLocale;
}

export type ReminderIcsResult =
  | {
    status: 'invalid';
    field: 'topic' | 'route' | 'date' | 'source' | 'generatedAt';
    message: string;
  }
  | {
    status: 'ready';
    filename: 'visalang-reminder.ics';
    uid: string;
    content: string;
  };

const invalid = (field: Extract<ReminderIcsResult, { status: 'invalid' }>['field'], message: string): ReminderIcsResult => ({
  status: 'invalid',
  field,
  message,
});

const parseCalendarDate = (value: unknown) => {
  const date = String(value || '');
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1) return null;
  const utc = new Date(0);
  utc.setUTCHours(0, 0, 0, 0);
  utc.setUTCFullYear(year, month - 1, day);
  if (utc.getUTCFullYear() !== year || utc.getUTCMonth() !== month - 1 || utc.getUTCDate() !== day) return null;
  return { date, utc };
};

const compactCalendarDate = (date: string) => date.replaceAll('-', '');

const nextCalendarDate = (parsed: NonNullable<ReturnType<typeof parseCalendarDate>>) => {
  const next = new Date(parsed.utc.getTime());
  next.setUTCDate(next.getUTCDate() + 1);
  const year = next.getUTCFullYear();
  if (year < 1 || year > 9999) return null;
  const month = String(next.getUTCMonth() + 1).padStart(2, '0');
  const day = String(next.getUTCDate()).padStart(2, '0');
  return `${String(year).padStart(4, '0')}-${month}-${day}`;
};

const canonicalUtcTimestamp = (value: unknown): value is string => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return false;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) && new Date(parsed).toISOString() === value;
};

const compactUtcTimestamp = (value: string) => value
  .replaceAll('-', '')
  .replaceAll(':', '')
  .replace(/\.\d{3}Z$/, 'Z');

export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');
}

export function foldIcsLine(line: string): string {
  const encoder = new TextEncoder();
  const physicalLines: string[] = [];
  let current = '';
  for (const character of line) {
    if (encoder.encode(`${current}${character}`).length <= 75) {
      current += character;
      continue;
    }
    if (current) physicalLines.push(current);
    current = ` ${character}`;
  }
  physicalLines.push(current);
  return physicalLines.join('\r\n');
}

const validOptionalSource = (value: unknown, officialUrl: string) => {
  const source = String(value || '').trim();
  if (!source) return { valid: true as const, value: officialUrl };
  try {
    const parsed = new URL(source);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.href !== officialUrl) return { valid: false as const, value: '' };
    return { valid: true as const, value: officialUrl };
  } catch {
    return { valid: false as const, value: '' };
  }
};

export function createReminderIcs(input: ReminderIcsInput, options: ReminderIcsOptions): ReminderIcsResult {
  const locale = options.locale === 'zh-CN' ? 'zh-CN' : 'en';
  const isZh = locale === 'zh-CN';
  const topicId = String(input.topicId || '');
  const routeId = String(input.routeId || '');
  const topic = (isZh ? getReminderTopicOptions(locale) : reminderTopicOptions).find((candidate) => candidate.id === topicId);
  if (!topic) return invalid('topic', isZh ? '请选择一个已配置的提醒主题。' : 'Choose one of the configured reminder topics.');
  const route = routeRegistry.find((candidate) => candidate.id === routeId);
  if (!route || route.availability !== 'configured' || !route.reminderOfficialEntry) {
    return invalid('route', isZh ? '请选择一个已配置且带有可信官方核验入口的提醒路线。' : 'Choose a configured reminder route with a trusted official verification entry.');
  }

  const start = parseCalendarDate(input.date);
  if (!start) return invalid('date', isZh ? '请输入 YYYY-MM-DD 格式的真实提醒日期。' : 'Enter a real reminder date in YYYY-MM-DD format.');
  const endDate = nextCalendarDate(start);
  if (!endDate) return invalid('date', isZh ? '请选择一个日期，使其不含结束日的下一天仍在 0001–9999 年范围内。' : 'Choose a reminder date whose exclusive next day remains within years 0001–9999.');

  const source = validOptionalSource(input.sourceUrl, route.reminderOfficialEntry.url);
  if (!source.valid) return invalid('source', isZh ? '请使用该路线配置的可信官方核验网址，或将可选来源留空。' : 'Use the configured route’s trusted official verification URL, or leave the optional source blank.');
  if (!canonicalUtcTimestamp(options.generatedAt)) return invalid('generatedAt', isZh ? '需要规范的 UTC 生成时间戳。' : 'A canonical UTC generation timestamp is required.');

  const uid = `visalang-${topicId}-${routeId}-${compactCalendarDate(start.date)}@visalang.org`;
  const description = isZh ? [
    '路线或主管机关：德国家庭团聚 A1。',
    '官方入口：德国联邦外交部配偶语言要求说明。',
    '边界：此入口用于找到负责的使领馆，不判断例外、准确可接受证书或文件，也不判断个人结果。',
    '边界：此日历事件只提示你手动核验；它不证明截止日期、预约、名额、成绩、证书、接受决定或通知送达。',
  ].join('\n') : [
    `Route or authority: ${route.shortTitle}.`,
    `Official entry: ${route.reminderOfficialEntry.label}.`,
    `Boundary: ${route.reminderOfficialEntry.boundary}`,
    'Boundary: this event only prompts a manual check. It does not prove a deadline, appointment, seat, result, certificate, acceptance, or notification delivery.',
  ].join('\n');
  const logicalLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//VisaLang//${isZh ? 'Reminder Planner zh-CN' : 'Reminder Planner'}//EN`,
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${compactUtcTimestamp(options.generatedAt)}`,
    `DTSTART;VALUE=DATE:${compactCalendarDate(start.date)}`,
    `DTEND;VALUE=DATE:${compactCalendarDate(endDate)}`,
    `SUMMARY:${escapeIcsText(topic.label)}`,
    `URL:${source.value}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  return {
    status: 'ready',
    filename: 'visalang-reminder.ics',
    uid,
    content: `${logicalLines.map(foldIcsLine).join('\r\n')}\r\n`,
  };
}
