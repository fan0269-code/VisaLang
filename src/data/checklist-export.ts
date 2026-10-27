import type { ChecklistResult, ChecklistSourceRef } from './route-tools.ts';
import { checklistStageLabels, type ToolLocale } from './tool-copy.ts';

type ConfiguredChecklist = Extract<ChecklistResult, { status: 'guidance_available' }>;

export interface ChecklistExportInput {
  routeTitle: string;
  generatedDate: string;
  applicationRegion?: string | null;
  certificateStatus?: string | null;
  checklist: ConfiguredChecklist;
  checklistState: Readonly<Record<string, boolean>>;
}

const isCalendarDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= days[month - 1];
};

const uniqueSources = (checklist: ConfiguredChecklist): ChecklistSourceRef[] => {
  const sources = new Map<string, ChecklistSourceRef>();
  checklist.groups.forEach((group) => group.items.forEach((item) => item.sourceRefs.forEach((source) => {
    const key = `${source.owner}\n${source.url}\n${source.sourceCheckedAt}\n${source.boundary}`;
    if (!sources.has(key)) sources.set(key, source);
  })));
  return [...sources.values()];
};

interface ChecklistTakeawayUi {
  container: { hidden: boolean } | null;
  controls: readonly { disabled: boolean }[];
  feedback: { textContent: string } | null;
  fallback: { hidden: boolean } | null;
  fallbackText: { value: string } | null;
}

export function syncChecklistTakeawayUi(
  ui: ChecklistTakeawayUi,
  available: boolean,
  serializedChecklist: string,
): string {
  const nextSerializedChecklist = available ? serializedChecklist : '';
  if (ui.container) ui.container.hidden = !available;
  ui.controls.forEach((control) => { control.disabled = !available; });
  if (ui.feedback) ui.feedback.textContent = '';
  if (ui.fallback) ui.fallback.hidden = true;
  if (ui.fallbackText) ui.fallbackText.value = nextSerializedChecklist;
  return nextSerializedChecklist;
}

export function serializeChecklist(
  input: ChecklistExportInput,
  options: { locale?: ToolLocale } = {},
): string {
  if (!input.routeTitle.trim()) throw new TypeError('A route title is required.');
  if (!isCalendarDate(input.generatedDate)) throw new TypeError('A valid ISO calendar date is required.');

  const locale = options.locale === 'zh-CN' ? 'zh-CN' : 'en';
  const isZh = locale === 'zh-CN';
  const items = input.checklist.groups.flatMap((group) => group.items);
  const completed = items.filter((item) => input.checklistState[item.id] === true).length;
  const lines = [
    isZh ? 'VisaLang 准备核对清单' : 'VisaLang preparation checklist',
    isZh ? `路线：${input.routeTitle.trim()}` : `Route: ${input.routeTitle.trim()}`,
    isZh ? `生成日期：${input.generatedDate}` : `Generated: ${input.generatedDate}`,
    isZh ? `适用范围：${input.checklist.boundary}` : `Scope: ${input.checklist.boundary}`,
  ];
  if (input.applicationRegion?.trim()) lines.push(isZh ? `申请地区：${input.applicationRegion.trim()}` : `Application region: ${input.applicationRegion.trim()}`);
  if (input.certificateStatus?.trim()) lines.push(isZh ? `证书状态：${input.certificateStatus.trim()}` : `Certificate status: ${input.certificateStatus.trim()}`);

  input.checklist.groups.forEach((group) => {
    lines.push('', checklistStageLabels[locale][group.stage]);
    group.items.forEach((item) => {
      lines.push(
        `${input.checklistState[item.id] === true ? '[x]' : '[ ]'} ${item.action}`,
        isZh ? `  完成标准：${item.doneWhen}` : `  Done when: ${item.doneWhen}`,
        isZh ? `  负责方：${item.owner}` : `  Owner: ${item.owner}`,
      );
    });
  });

  lines.push('', isZh ? `完成进度：${completed}/${items.length}` : `Completion: ${completed}/${items.length}`, '', isZh ? '来源：' : 'Sources:');
  uniqueSources(input.checklist).forEach((source) => {
    lines.push(
      `- ${source.owner}: ${source.url}`,
      isZh ? `  核验日期：${source.sourceCheckedAt}` : `  Checked: ${source.sourceCheckedAt}`,
      isZh ? `  可支持：${source.supports}` : `  Supports: ${source.supports}`,
      isZh ? `  来源边界：${source.boundary}` : `  Source boundary: ${source.boundary}`,
    );
  });
  lines.push('', isZh ? `总体边界：${input.checklist.boundary}` : `Overall boundary: ${input.checklist.boundary}`);
  return lines.join('\n');
}
