/**
 * T27's local-only measurement contract.
 *
 * This module defines what a future, separately authorised collector may accept.
 * It deliberately has no browser, storage, network, cookie, or analytics API.
 */

export const MEASUREMENT_CONTRACT_VERSION = 't27.v1' as const;
export const MEASUREMENT_TRANSPORT = 'none' as const;

export const measurementToolIds = [
  'finder',
  'checklist',
  'timeline',
  'comparison',
  'reminders',
] as const;

export type MeasurementToolId = typeof measurementToolIds[number];
export const measurementLocales = ['en', 'zh-CN'] as const;
export type MeasurementLocale = typeof measurementLocales[number];

export const measurementEventNames = [
  'tool_viewed',
  'tool_result_rendered',
  'tool_takeaway_requested',
] as const;
export type MeasurementEventName = typeof measurementEventNames[number];

export const measurementResultStatuses = [
  'guidance_available',
  'needs_information',
  'needs_authority_confirmation',
  'unsupported',
  'calculated',
  'calculated_attention',
  'comparison_ready',
  'same_product',
  'calendar_ready',
] as const;
export type MeasurementResultStatus = typeof measurementResultStatuses[number];

export const measurementTakeawayActions = [
  'copy',
  'print',
  'checklist_download',
  'ics_download',
] as const;
export type MeasurementTakeawayAction = typeof measurementTakeawayActions[number];

export const measurementStatusByTool: Readonly<Record<MeasurementToolId, readonly MeasurementResultStatus[]>> = {
  finder: ['guidance_available', 'needs_information', 'needs_authority_confirmation', 'unsupported'],
  checklist: ['guidance_available', 'unsupported'],
  timeline: ['calculated', 'calculated_attention'],
  comparison: ['comparison_ready', 'same_product', 'unsupported'],
  reminders: ['calendar_ready'],
};

export const measurementActionsByTool: Readonly<Partial<Record<MeasurementToolId, readonly MeasurementTakeawayAction[]>>> = {
  checklist: ['copy', 'print', 'checklist_download'],
  reminders: ['ics_download'],
};

export interface MeasurementEventDefinition {
  readonly name: MeasurementEventName;
  readonly trigger: string;
  readonly denominator: string;
  readonly allowedAttributes: readonly string[];
  readonly doNotSend: readonly string[];
  readonly boundary: string;
}

export const measurementEventDefinitions: readonly MeasurementEventDefinition[] = [
  {
    name: 'tool_viewed',
    trigger: 'The active JavaScript tool surface initializes for one of the five configured tool routes.',
    denominator: 'Eligible tool-route initializations in the instrumented page environment; this is not a visitor, session, or traffic count.',
    allowedAttributes: ['event_name', 'contract_version', 'tool_id', 'locale'],
    doNotSend: ['Do not emit when the contract version, tool ID, or locale is missing or unknown.'],
    boundary: 'A view is a local contract boundary only until a separately authorised collector exists.',
  },
  {
    name: 'tool_result_rendered',
    trigger: 'A validated form submission renders a known result state. Invalid, malformed, or missing input produces no event.',
    denominator: 'Validated result renderings by tool and finite result status; it is not a completion, success, acceptance, or conversion rate.',
    allowedAttributes: ['event_name', 'contract_version', 'tool_id', 'locale', 'result_status'],
    doNotSend: ['Do not emit for unknown status, validation error, guessed route, raw answers, dates, or official-verification-required details. The unsupported status is only a coarse rendered-state label.', 'Do not count unsupported, needs_information, or needs_authority_confirmation as successful completion.'],
    boundary: 'The result status is an aggregate-safe state label. It never carries the result, explanation, source URL, answer, date, or application detail.',
  },
  {
    name: 'tool_takeaway_requested',
    trigger: 'The user explicitly requests a configured checklist copy/print/download or ICS download action.',
    denominator: 'Explicit accepted takeaway requests by tool and finite action; no download success, import, delivery, or notification is inferred.',
    allowedAttributes: ['event_name', 'contract_version', 'tool_id', 'locale', 'action'],
    doNotSend: ['Do not emit for disabled controls, failed validation, blocked clipboard/download operations, or any unrecognised action.'],
    boundary: 'Checklist text and ICS bytes stay in the browser. This event does not contain their contents and does not prove a device or calendar client completed the action.',
  },
] as const;

export const measurementStorageBoundary = {
  retention: 'No event is stored, queued, or retained by this local contract.',
  sessionState: 'Existing approved tool state remains a separate sessionStorage feature and is not measurement data.',
  deviceState: 'Existing optional 30-day localStorage snapshots remain a separate user-requested plan feature and are not measurement data.',
  transport: 'No analytics endpoint, third-party collector, cookie, identifier, beacon, fetch, or XMLHttpRequest is configured.',
} as const;

export const measurementForbiddenData = [
  'name',
  'email',
  'ip_address',
  'account_id',
  'full_url',
  'url_query',
  'free_text',
  'full_date',
  'exam_date',
  'raw_answer',
  'document_or_certificate_content',
  'user_note',
  'third_party_identifier',
] as const;

const toolIdSet = new Set<string>(measurementToolIds);
const localeSet = new Set<string>(measurementLocales);
const eventNameSet = new Set<string>(measurementEventNames);
const resultStatusSet = new Set<string>(measurementResultStatuses);
const takeawayActionSet = new Set<string>(measurementTakeawayActions);
const eventKeys = {
  tool_viewed: new Set(['event_name', 'contract_version', 'tool_id', 'locale']),
  tool_result_rendered: new Set(['event_name', 'contract_version', 'tool_id', 'locale', 'result_status']),
  tool_takeaway_requested: new Set(['event_name', 'contract_version', 'tool_id', 'locale', 'action']),
} as const;

const isPlainRecord = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

export type MeasurementEvent = {
  event_name: MeasurementEventName;
  contract_version: typeof MEASUREMENT_CONTRACT_VERSION;
  tool_id: MeasurementToolId;
  locale: MeasurementLocale;
  result_status?: MeasurementResultStatus;
  action?: MeasurementTakeawayAction;
};

export type MeasurementValidation =
  | { valid: true; event: MeasurementEvent }
  | { valid: false; reason: string };

const reject = (reason: string): MeasurementValidation => ({ valid: false, reason });

/**
 * Validate and copy only the exact allowlisted event envelope. Unknown keys and
 * values fail closed so a malformed input cannot become a measurement result.
 */
export function validateMeasurementEvent(input: unknown): MeasurementValidation {
  if (!isPlainRecord(input)) return reject('event must be a plain object');
  const eventName = input.event_name;
  if (typeof eventName !== 'string' || !eventNameSet.has(eventName)) return reject('unknown event name');
  const keys = Object.keys(input);
  const allowedKeys = eventKeys[eventName as MeasurementEventName];
  if (keys.some((key) => !allowedKeys.has(key))) return reject('event contains a non-allowlisted attribute');
  if (input.contract_version !== MEASUREMENT_CONTRACT_VERSION) return reject('unknown contract version');
  if (typeof input.tool_id !== 'string' || !toolIdSet.has(input.tool_id)) return reject('unknown tool ID');
  if (typeof input.locale !== 'string' || !localeSet.has(input.locale)) return reject('unknown locale');

  const toolId = input.tool_id as MeasurementToolId;
  const locale = input.locale as MeasurementLocale;
  if (eventName === 'tool_result_rendered') {
    if (typeof input.result_status !== 'string' || !resultStatusSet.has(input.result_status)) return reject('unknown result status');
    const allowedStatuses = measurementStatusByTool[toolId];
    if (!allowedStatuses.includes(input.result_status as MeasurementResultStatus)) return reject('result status is not valid for this tool');
    return { valid: true, event: {
      event_name: eventName,
      contract_version: MEASUREMENT_CONTRACT_VERSION,
      tool_id: toolId,
      locale,
      result_status: input.result_status as MeasurementResultStatus,
    } };
  }
  if (eventName === 'tool_takeaway_requested') {
    if (typeof input.action !== 'string' || !takeawayActionSet.has(input.action)) return reject('unknown takeaway action');
    const allowedActions = measurementActionsByTool[toolId] ?? [];
    if (!allowedActions.includes(input.action as MeasurementTakeawayAction)) return reject('takeaway action is not valid for this tool');
    return { valid: true, event: {
      event_name: eventName,
      contract_version: MEASUREMENT_CONTRACT_VERSION,
      tool_id: toolId,
      locale,
      action: input.action as MeasurementTakeawayAction,
    } };
  }

  return { valid: true, event: {
    event_name: eventName,
    contract_version: MEASUREMENT_CONTRACT_VERSION,
    tool_id: toolId,
    locale,
  } };
}

/**
 * Local-only event factory. It returns null for every malformed or unknown
 * input and never sends, stores, or schedules the returned object.
 */
export function buildMeasurementEvent(input: unknown): MeasurementEvent | null {
  const result = validateMeasurementEvent(input);
  return result.valid ? result.event : null;
}
