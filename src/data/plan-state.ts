import { claimRegistry, examProducts, routeRules } from './claim-registry.ts';
import {
  applicationRegionOptions,
  familyRelationshipOptions,
  parseTimelineBufferDays,
  routeRegistry,
  TIMELINE_BUFFER_MAX_DAYS,
} from './route-tools.ts';

export { applicationRegionOptions, familyRelationshipOptions } from './route-tools.ts';

export const PLAN_SCHEMA_VERSION = 1 as const;
export const PLAN_DEVICE_RETENTION_DAYS = 30;
export const PLAN_BUFFER_MAX_DAYS = TIMELINE_BUFFER_MAX_DAYS;
export const PLAN_SESSION_KEY = 'visalang:plan:session';
export const PLAN_DEVICE_KEY = 'visalang:plan:device';
export const LEGACY_TOOL_LOCAL_STORAGE_PREFIX = 'visalang-tool:';

export type PlanLocale = 'en' | 'zh-CN';
export type PlanToolId = 'finder' | 'checklist' | 'timeline' | 'comparison' | 'reminders';

export const reminderTopicOptions = [
  { id: 'confirm-language-requirement', label: 'Confirm the language requirement' },
  { id: 'check-official-centre', label: 'Check an official test centre' },
  { id: 'review-requirement-checklist', label: 'Review my requirement checklist' },
  { id: 'recalculate-timeline', label: 'Recalculate my timeline' },
  { id: 'recheck-official-source', label: 'Recheck an official source' },
] as const;

export interface PlanStateV1 {
  schemaVersion: typeof PLAN_SCHEMA_VERSION;
  locale: PlanLocale;
  routeId: string | null;
  applicationRegionId: string | null;
  ruleVersion: string | null;
  claimVersions: Record<string, string>;
  answers: Record<string, string>;
  selectedExamIds: string[];
  targetDate: string | null;
  buffers: {
    resultWaitDays: number | null;
    documentPreparationDays: number | null;
    retakeBufferDays: number | null;
  };
  checklistState: Record<string, boolean>;
  savedAt: string | null;
  savedUntil: string | null;
}

type StoredPlanResult =
  | { status: 'ready'; state: PlanStateV1 }
  | { status: 'empty' | 'invalid' | 'expired' | 'reconfirm_required'; state: null };

const routeIds = new Set(routeRegistry.map((route) => route.id));
const examIds = new Set(examProducts.map((exam) => exam.id));
const applicationRegionIds = new Set(applicationRegionOptions.map((region) => region.id));
const reminderTopicIds = new Set(reminderTopicOptions.map((topic) => topic.id));
const answerOptions: Readonly<Record<string, ReadonlySet<string>>> = {
  country: new Set(['germany', 'other']),
  purpose: new Set(['family-reunion', 'b1', 'ausbildung', 'nursing', 'university', 'other']),
  level: new Set(['not-sure', 'a0', 'a1', 'a2-plus']),
  relationship: new Set(familyRelationshipOptions.map((option) => option.id)),
  certificate: new Set(['none', 'a1', 'other']),
  reminderTopicId: reminderTopicIds,
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const isCalendarDate = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
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

const isIsoTimestamp = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
};

const storedBuffer = (value: unknown): number | null => Number.isSafeInteger(value)
  && Number(value) >= 0
  && Number(value) <= PLAN_BUFFER_MAX_DAYS
  ? Number(value)
  : null;

const patchBuffer = (value: unknown): number | null => parseTimelineBufferDays(value);

const checklistIdsForRoute = (routeId: string | null): Set<string> => {
  const route = routeRegistry.find((candidate) => candidate.id === routeId);
  if (!route || !('checklist' in route) || !Array.isArray(route.checklist)) return new Set();
  return new Set(route.checklist.map((item) => item.id));
};

const versionsForRoute = (routeId: string | null) => {
  const rule = routeRules.find((candidate) => candidate.routeId === routeId);
  if (!rule) return { ruleVersion: null, claimVersions: {} as Record<string, string> };
  const validRefs = rule.claimRefs.filter((ref) => claimRegistry.some((claim) => claim.claimId === ref.claimId && claim.version === ref.version));
  return {
    ruleVersion: rule.version,
    claimVersions: Object.fromEntries(validRefs.map((ref) => [ref.claimId, ref.version])),
  };
};

export function createEmptyPlanState(locale: PlanLocale = 'en'): PlanStateV1 {
  return {
    schemaVersion: PLAN_SCHEMA_VERSION,
    locale: locale === 'zh-CN' ? 'zh-CN' : 'en',
    routeId: null,
    applicationRegionId: null,
    ruleVersion: null,
    claimVersions: {},
    answers: {},
    selectedExamIds: [],
    targetDate: null,
    buffers: {
      resultWaitDays: null,
      documentPreparationDays: null,
      retakeBufferDays: null,
    },
    checklistState: {},
    savedAt: null,
    savedUntil: null,
  };
}

export function sanitizePlanState(input: unknown): PlanStateV1 {
  if (!isRecord(input)) return createEmptyPlanState();
  const state = createEmptyPlanState(input.locale === 'zh-CN' ? 'zh-CN' : 'en');
  state.routeId = typeof input.routeId === 'string' && routeIds.has(input.routeId) ? input.routeId : null;
  state.applicationRegionId = typeof input.applicationRegionId === 'string' && applicationRegionIds.has(input.applicationRegionId)
    ? input.applicationRegionId
    : null;
  state.ruleVersion = typeof input.ruleVersion === 'string' ? input.ruleVersion : null;

  const expectedVersions = versionsForRoute(state.routeId).claimVersions;
  if (isRecord(input.claimVersions)) {
    for (const claimId of Object.keys(expectedVersions)) {
      const version = input.claimVersions[claimId];
      if (typeof version === 'string') state.claimVersions[claimId] = version;
    }
  }
  if (isRecord(input.answers)) {
    for (const [key, allowed] of Object.entries(answerOptions)) {
      const value = input.answers[key];
      if (typeof value === 'string' && allowed.has(value)) state.answers[key] = value;
    }
  }
  const selectedRoute = routeRegistry.find((route) => route.id === state.routeId);
  if (selectedRoute) {
    state.answers.country = selectedRoute.country;
    state.answers.purpose = selectedRoute.purpose;
  }
  if (Array.isArray(input.selectedExamIds)) {
    for (const value of input.selectedExamIds) {
      if (typeof value === 'string' && examIds.has(value) && !state.selectedExamIds.includes(value)) state.selectedExamIds.push(value);
      if (state.selectedExamIds.length === 2) break;
    }
  }
  state.targetDate = isCalendarDate(input.targetDate) ? input.targetDate : null;
  if (isRecord(input.buffers)) {
    state.buffers = {
      resultWaitDays: storedBuffer(input.buffers.resultWaitDays),
      documentPreparationDays: storedBuffer(input.buffers.documentPreparationDays),
      retakeBufferDays: storedBuffer(input.buffers.retakeBufferDays),
    };
  }
  const applicableChecklistIds = checklistIdsForRoute(state.routeId);
  if (isRecord(input.checklistState)) {
    for (const [id, value] of Object.entries(input.checklistState)) {
      if (applicableChecklistIds.has(id) && typeof value === 'boolean') state.checklistState[id] = value;
    }
  }
  state.savedAt = isIsoTimestamp(input.savedAt) ? input.savedAt : null;
  state.savedUntil = isIsoTimestamp(input.savedUntil) ? input.savedUntil : null;
  return state;
}

const setRoute = (state: PlanStateV1, nextRouteId: string | null) => {
  const routeChanged = state.routeId !== nextRouteId;
  state.routeId = nextRouteId;
  if (routeChanged) state.checklistState = {};
  const route = routeRegistry.find((candidate) => candidate.id === nextRouteId);
  if (route) {
    state.answers.country = route.country;
    state.answers.purpose = route.purpose;
  } else {
    delete state.answers.country;
    delete state.answers.purpose;
  }
  const versions = versionsForRoute(nextRouteId);
  state.ruleVersion = versions.ruleVersion;
  state.claimVersions = versions.claimVersions;
};

const setAnswer = (state: PlanStateV1, key: string, value: unknown) => {
  const allowed = answerOptions[key];
  if (typeof value === 'string' && allowed?.has(value)) state.answers[key] = value;
  else delete state.answers[key];
};

export function applyToolPatch(current: unknown, toolId: PlanToolId, rawPatch: unknown): PlanStateV1 {
  const state = sanitizePlanState(current);
  if (!isRecord(rawPatch)) return state;
  state.savedAt = null;
  state.savedUntil = null;
  if (Object.hasOwn(rawPatch, 'locale') && (rawPatch.locale === 'en' || rawPatch.locale === 'zh-CN')) state.locale = rawPatch.locale;

  if (toolId === 'finder') {
    if (Object.hasOwn(rawPatch, 'routeId')) setRoute(state, typeof rawPatch.routeId === 'string' && routeIds.has(rawPatch.routeId) ? rawPatch.routeId : null);
    if (Object.hasOwn(rawPatch, 'applicationRegionId')) {
      state.applicationRegionId = typeof rawPatch.applicationRegionId === 'string' && applicationRegionIds.has(rawPatch.applicationRegionId)
        ? rawPatch.applicationRegionId
        : null;
    }
    for (const key of ['country', 'purpose', 'level', 'relationship', 'certificate']) {
      if (Object.hasOwn(rawPatch, key)) setAnswer(state, key, rawPatch[key]);
    }
    const selectedRoute = routeRegistry.find((route) => route.id === state.routeId);
    if (selectedRoute) {
      state.answers.country = selectedRoute.country;
      state.answers.purpose = selectedRoute.purpose;
    }
    if (Object.hasOwn(rawPatch, 'targetDate')) state.targetDate = isCalendarDate(rawPatch.targetDate) ? rawPatch.targetDate : null;
  }

  if (toolId === 'checklist') {
    if (Object.hasOwn(rawPatch, 'routeId')) setRoute(state, typeof rawPatch.routeId === 'string' && routeIds.has(rawPatch.routeId) ? rawPatch.routeId : null);
    if (Object.hasOwn(rawPatch, 'checklistState')) {
      state.checklistState = {};
      const allowed = checklistIdsForRoute(state.routeId);
      if (isRecord(rawPatch.checklistState)) {
        for (const [id, value] of Object.entries(rawPatch.checklistState)) {
          if (allowed.has(id) && typeof value === 'boolean') state.checklistState[id] = value;
        }
      }
    }
  }

  if (toolId === 'timeline') {
    if (Object.hasOwn(rawPatch, 'examId')) {
      const examId = typeof rawPatch.examId === 'string' && examIds.has(rawPatch.examId) ? rawPatch.examId : null;
      state.selectedExamIds = examId ? [examId, ...state.selectedExamIds.filter((id) => id !== examId)].slice(0, 2) : [];
    }
    if (Object.hasOwn(rawPatch, 'targetDate')) state.targetDate = isCalendarDate(rawPatch.targetDate) ? rawPatch.targetDate : null;
    for (const key of ['resultWaitDays', 'documentPreparationDays', 'retakeBufferDays'] as const) {
      if (Object.hasOwn(rawPatch, key)) state.buffers[key] = patchBuffer(rawPatch[key]);
    }
  }

  if (toolId === 'comparison') {
    const values = [rawPatch.firstExamId, rawPatch.secondExamId]
      .filter((value): value is string => typeof value === 'string' && examIds.has(value));
    const distinctValues = [...new Set(values)].slice(0, 2);
    state.selectedExamIds = distinctValues.length === 2 ? distinctValues : [];
  }

  if (toolId === 'reminders') {
    if (Object.hasOwn(rawPatch, 'topicId')) setAnswer(state, 'reminderTopicId', rawPatch.topicId);
    if (Object.hasOwn(rawPatch, 'routeId')) setRoute(state, typeof rawPatch.routeId === 'string' && routeIds.has(rawPatch.routeId) ? rawPatch.routeId : null);
  }

  return state;
}

export function projectStateForTool(stateInput: unknown, toolId: PlanToolId): Record<string, unknown> {
  const state = sanitizePlanState(stateInput);
  if (toolId === 'finder') return {
    country: state.answers.country ?? '',
    purpose: state.answers.purpose ?? '',
    applicationRegionId: state.applicationRegionId ?? '',
    relationship: state.answers.relationship ?? '',
    certificate: state.answers.certificate ?? '',
  };
  if (toolId === 'checklist') {
    const checklistState = Object.fromEntries([...checklistIdsForRoute(state.routeId)].map((id) => [id, state.checklistState[id] === true]));
    return { route: state.routeId ?? '', checklistState };
  }
  if (toolId === 'timeline') return {
    examId: state.selectedExamIds[0] ?? '',
    targetDate: state.targetDate ?? '',
    resultWaitDays: state.buffers.resultWaitDays,
    documentPreparationDays: state.buffers.documentPreparationDays,
    retakeBufferDays: state.buffers.retakeBufferDays,
  };
  if (toolId === 'comparison') return {
    first: state.selectedExamIds[0] ?? '',
    second: state.selectedExamIds[1] ?? '',
  };
  return {
    topic: state.answers.reminderTopicId ?? '',
    route: state.routeId ?? '',
  };
}

const versionsAreCompatible = (raw: Record<string, unknown>, routeId: string | null) => {
  const expected = versionsForRoute(routeId);
  if (raw.ruleVersion !== expected.ruleVersion || !isRecord(raw.claimVersions)) return false;
  const actualClaimIds = Object.keys(raw.claimVersions).sort();
  const expectedClaimIds = Object.keys(expected.claimVersions).sort();
  return actualClaimIds.length === expectedClaimIds.length
    && actualClaimIds.every((claimId, index) => claimId === expectedClaimIds[index]
      && raw.claimVersions?.[claimId] === expected.claimVersions[claimId]);
};

export function parseStoredPlan(
  raw: string | null | undefined,
  options: { source: 'session' | 'device'; now: string },
): StoredPlanResult {
  if (!raw?.trim()) return { status: 'empty', state: null };
  let value: unknown;
  try { value = JSON.parse(raw); } catch { return { status: 'invalid', state: null }; }
  if (!isRecord(value)) return { status: 'invalid', state: null };
  if (options.source === 'device') {
    if (!isIsoTimestamp(options.now) || !isIsoTimestamp(value.savedAt) || !isIsoTimestamp(value.savedUntil)) return { status: 'invalid', state: null };
    const savedAt = Date.parse(value.savedAt);
    const savedUntil = Date.parse(value.savedUntil);
    const now = Date.parse(options.now);
    const retention = PLAN_DEVICE_RETENTION_DAYS * 24 * 60 * 60 * 1000;
    if (savedAt > now || savedUntil - savedAt !== retention) return { status: 'invalid', state: null };
    if (now >= savedUntil) return { status: 'expired', state: null };
  }
  if (value.schemaVersion !== PLAN_SCHEMA_VERSION) return { status: 'reconfirm_required', state: null };
  const state = sanitizePlanState(value);
  if ((value.routeId !== null && value.routeId !== undefined && state.routeId === null)
    || !versionsAreCompatible(value, state.routeId)) return { status: 'reconfirm_required', state: null };

  return { status: 'ready', state };
}

export function chooseRestorablePlan(
  sessionRaw: string | null | undefined,
  deviceRaw: string | null | undefined,
  options: { now: string },
) {
  const session = parseStoredPlan(sessionRaw, { source: 'session', now: options.now });
  if (session.status === 'ready') return { ...session, source: 'session' as const };
  if (session.status === 'reconfirm_required') return { ...session, source: 'session' as const };
  const device = parseStoredPlan(deviceRaw, { source: 'device', now: options.now });
  if (device.status === 'ready') return { ...device, source: 'device' as const };
  if (device.status === 'reconfirm_required') return { ...device, source: 'device' as const };
  return { status: 'empty' as const, state: null, source: null };
}

export function createDevicePlanSnapshot(stateInput: unknown, now: string): PlanStateV1 {
  if (!isIsoTimestamp(now)) throw new TypeError('A canonical ISO timestamp is required.');
  const state = sanitizePlanState(stateInput);
  state.savedAt = now;
  state.savedUntil = new Date(Date.parse(now) + PLAN_DEVICE_RETENTION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  return state;
}

const legacyExamIds = new Map<string, string>([
  ['goethe-a1', 'goethe-zertifikat-a1-start-deutsch-1'],
  ['telc-a1', 'telc-start-deutsch-1-a1'],
  ['Goethe-Zertifikat A1', 'goethe-zertifikat-a1-start-deutsch-1'],
  ['Goethe-Zertifikat A1: Start Deutsch 1', 'goethe-zertifikat-a1-start-deutsch-1'],
  ['Start Deutsch 1 / telc Deutsch A1', 'telc-start-deutsch-1-a1'],
  ['telc Deutsch A1', 'telc-start-deutsch-1-a1'],
]);
const legacyLevels = new Map<string, string>([
  ['Not sure', 'not-sure'],
  ['Beginner / A0', 'a0'],
  ['A1', 'a1'],
  ['A2 or above', 'a2-plus'],
]);
const legacyTopics = new Map<string, string>(reminderTopicOptions.flatMap((topic) => [[topic.label, topic.id], [topic.id, topic.id]]));
const routeIdForFinder = (country: string | null, purpose: string | null) => {
  if (country !== 'germany') return null;
  if (purpose === 'family-reunion') return 'germany-family-reunion-a1';
  return routeRegistry.find((route) => route.purpose === purpose)?.id ?? null;
};

export function parseLegacyToolQuery(toolId: PlanToolId, search: string) {
  const params = new URLSearchParams(search);
  const patch: Record<string, unknown> = {};
  const knownFields: Readonly<Record<PlanToolId, readonly string[]>> = {
    finder: ['country', 'purpose', 'location', 'applicationRegionId', 'level', 'certificate', 'targetDate'],
    checklist: ['route'],
    timeline: ['targetDate', 'examType', 'examId', 'resultWaitDays', 'translationDays', 'documentPreparationDays', 'retakeBufferDays'],
    comparison: ['first', 'second'],
    reminders: ['topic', 'date', 'route', 'source'],
  };
  const hadLegacyFields = knownFields[toolId].some((name) => params.has(name));

  if (toolId === 'finder') {
    const country = params.get('country');
    const purpose = params.get('purpose');
    if (answerOptions.country.has(country ?? '')) patch.country = country;
    if (answerOptions.purpose.has(purpose ?? '')) patch.purpose = purpose;
    const level = params.get('level');
    const normalizedLevel = level && (answerOptions.level.has(level) ? level : legacyLevels.get(level));
    if (typeof normalizedLevel === 'string' && answerOptions.level.has(normalizedLevel)) patch.level = normalizedLevel;
    const certificate = params.get('certificate');
    if (answerOptions.certificate.has(certificate ?? '')) patch.certificate = certificate;
    const targetDate = params.get('targetDate');
    if (isCalendarDate(targetDate)) patch.targetDate = targetDate;
    const routeId = routeIdForFinder(country, purpose);
    if (Object.hasOwn(patch, 'country') || Object.hasOwn(patch, 'purpose')) patch.routeId = routeId;
  }
  if (toolId === 'checklist') {
    const route = params.get('route');
    if (route && routeIds.has(route)) patch.routeId = route;
  }
  if (toolId === 'timeline') {
    const rawExam = params.get('examId') ?? params.get('examType');
    const examId = rawExam && (examIds.has(rawExam) ? rawExam : legacyExamIds.get(rawExam));
    if (typeof examId === 'string' && examIds.has(examId)) patch.examId = examId;
    const targetDate = params.get('targetDate');
    if (isCalendarDate(targetDate)) patch.targetDate = targetDate;
    const fieldMap = {
      resultWaitDays: params.get('resultWaitDays'),
      documentPreparationDays: params.get('documentPreparationDays') ?? params.get('translationDays'),
      retakeBufferDays: params.get('retakeBufferDays'),
    };
    for (const [key, value] of Object.entries(fieldMap)) {
      const parsed = patchBuffer(value);
      if (parsed !== null) patch[key] = parsed;
    }
  }
  if (toolId === 'comparison') {
    const first = params.get('first');
    const second = params.get('second');
    const firstExamId = first && (examIds.has(first) ? first : legacyExamIds.get(first));
    const secondExamId = second && (examIds.has(second) ? second : legacyExamIds.get(second));
    if (typeof firstExamId === 'string' && examIds.has(firstExamId)) patch.firstExamId = firstExamId;
    if (typeof secondExamId === 'string' && examIds.has(secondExamId)) patch.secondExamId = secondExamId;
  }
  if (toolId === 'reminders') {
    const topic = params.get('topic');
    const topicId = topic ? legacyTopics.get(topic) : undefined;
    if (typeof topicId === 'string' && reminderTopicIds.has(topicId)) patch.topicId = topicId;
    const route = params.get('route');
    if (route && routeIds.has(route)) patch.routeId = route;
  }
  return { hadLegacyFields, hasCompatibleValues: Object.keys(patch).length > 0, patch };
}

export function serializeSafeShareState(stateInput: unknown): string {
  const state = sanitizePlanState(stateInput);
  return JSON.stringify({
    locale: state.locale,
    routeId: state.routeId,
    selectedExamIds: state.selectedExamIds,
  });
}

export function clearToolState(stateInput: unknown, toolId: PlanToolId): PlanStateV1 {
  const state = sanitizePlanState(stateInput);
  state.savedAt = null;
  state.savedUntil = null;
  if (toolId === 'finder') {
    state.applicationRegionId = null;
    state.answers = Object.fromEntries(Object.entries(state.answers).filter(([key]) => !['country', 'purpose', 'level', 'relationship', 'certificate'].includes(key)));
    setRoute(state, null);
  } else if (toolId === 'checklist') {
    state.checklistState = {};
  } else if (toolId === 'timeline') {
    state.selectedExamIds = [];
    state.targetDate = null;
    state.buffers = { resultWaitDays: null, documentPreparationDays: null, retakeBufferDays: null };
  } else if (toolId === 'comparison') {
    state.selectedExamIds = [];
  } else {
    delete state.answers.reminderTopicId;
  }
  return state;
}
