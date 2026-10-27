import {
  LEGACY_TOOL_LOCAL_STORAGE_PREFIX,
  PLAN_DEVICE_KEY,
  PLAN_SESSION_KEY,
  applyToolPatch,
  chooseRestorablePlan,
  clearToolState,
  createDevicePlanSnapshot,
  createEmptyPlanState,
  parseLegacyToolQuery,
  parseStoredPlan,
  projectStateForTool,
  sanitizePlanState,
  type PlanStateV1,
  type PlanToolId,
} from '../data/plan-state.ts';

type PlanField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface SharedPlanOptions {
  toolId: PlanToolId;
  form?: HTMLFormElement | null;
}

interface StorageCleanupTarget {
  readonly length: number;
  key(index: number): string | null;
  removeItem(key: string): void;
}

const nowIso = () => new Date().toISOString();

const readSession = () => {
  try { return sessionStorage.getItem(PLAN_SESSION_KEY); } catch { return null; }
};
const readDevice = () => {
  try { return localStorage.getItem(PLAN_DEVICE_KEY); } catch { return null; }
};
const writeSession = (state: PlanStateV1) => {
  try { sessionStorage.setItem(PLAN_SESSION_KEY, JSON.stringify(state)); return true; } catch { return false; }
};
const writeDevice = (state: PlanStateV1) => {
  try { localStorage.setItem(PLAN_DEVICE_KEY, JSON.stringify(state)); return true; } catch { return false; }
};
const removeSession = () => {
  try { sessionStorage.removeItem(PLAN_SESSION_KEY); return true; } catch { return false; }
};
const removeDevice = () => {
  try { localStorage.removeItem(PLAN_DEVICE_KEY); return true; } catch { return false; }
};
export const removeLegacyToolCopies = (storage?: StorageCleanupTarget) => {
  try {
    const target = storage ?? localStorage;
    const keys: string[] = [];
    for (let index = 0; index < target.length; index += 1) {
      const key = target.key(index);
      if (key?.startsWith(LEGACY_TOOL_LOCAL_STORAGE_PREFIX)) keys.push(key);
    }
    keys.forEach((key) => target.removeItem(key));
    return true;
  } catch {
    return false;
  }
};

const cleanLegacyToolQuery = () => {
  if (!location.search) return true;
  try { history.replaceState(history.state, '', `${location.pathname}${location.hash}`); return true; } catch { return false; }
};

const setFormValue = (form: HTMLFormElement, name: string, value: unknown) => {
  if (value === null || value === undefined || typeof value === 'object') return;
  const field = form.elements.namedItem(name);
  if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) return;
  const normalized = String(value);
  if (field instanceof HTMLSelectElement && normalized && ![...field.options].some((option) => option.value === normalized)) return;
  field.value = normalized;
};

const restoreForm = (form: HTMLFormElement | null | undefined, projection: Record<string, unknown>) => {
  if (!form) return;
  for (const [name, value] of Object.entries(projection)) setFormValue(form, name, value);
};

export function setupSharedPlan(options: SharedPlanOptions) {
  const locale = document.documentElement.lang === 'zh-CN' ? 'zh-CN' : 'en';
  const localized = (english: string, chinese: string) => locale === 'zh-CN' ? chinese : english;
  const status = document.querySelector<HTMLElement>('[data-plan-status]');
  const setStatus = (message: string) => { if (status) status.textContent = message; };
  const now = nowIso();
  const rawSession = readSession();
  const rawDevice = readDevice();
  removeLegacyToolCopies();
  const chosen = chooseRestorablePlan(rawSession, rawDevice, { now });
  let state = chosen.status === 'ready' && chosen.state ? chosen.state : createEmptyPlanState(locale);
  state = { ...state, locale };
  let restored = chosen.status === 'ready';
  let reconfirmRequired = chosen.status === 'reconfirm_required';

  const deviceCheck = parseStoredPlan(rawDevice, { source: 'device', now });
  if (deviceCheck.status === 'expired' || deviceCheck.status === 'invalid') removeDevice();

  const legacy = parseLegacyToolQuery(options.toolId, location.search);
  if (legacy.hadLegacyFields && legacy.hasCompatibleValues) {
    state = applyToolPatch(state, options.toolId, legacy.patch);
    restored = Object.keys(legacy.patch).length > 0;
    reconfirmRequired = false;
    const stored = writeSession(state);
    const cleaned = cleanLegacyToolQuery();
    setStatus(stored && cleaned
      ? localized('Validated compatible legacy URL values into this tab session and removed the old query from the address bar. Review before running the tool.', '已将兼容的旧网址参数核验后写入此标签页会话，并从地址栏移除旧查询参数。运行工具前请复核。')
      : localized('Legacy values were validated for this page, but browser storage or address-bar cleanup was unavailable. Review before continuing.', '已核验此页面可兼容的旧值，但浏览器存储或地址栏清理不可用。继续前请复核。'));
  } else if (legacy.hadLegacyFields) {
    const cleaned = cleanLegacyToolQuery();
    if (reconfirmRequired) {
      setStatus(cleaned
        ? localized('Removed legacy query values from the address bar. No compatible legacy values were restored, and the saved plan remains incompatible. Clear the shared plan and re-enter current facts.', '已从地址栏移除旧查询值，但没有恢复兼容值，已保存计划仍不兼容。请清除共享计划并重新输入当前事实。')
        : localized('No compatible legacy values were restored. Address-bar cleanup was unavailable, and the saved plan remains incompatible. Clear the shared plan and re-enter current facts.', '没有恢复兼容的旧值，且无法清理地址栏；已保存计划仍不兼容。请清除共享计划并重新输入当前事实。'));
    } else if (chosen.status === 'ready') {
      setStatus(locale === 'zh-CN'
        ? `没有恢复兼容的旧值；${chosen.source === 'session' ? '标签页会话计划' : '可选设备副本'}仍可供复核。${cleaned ? '旧查询值已从地址栏移除。' : '地址栏清理不可用。'}`
        : cleaned
          ? `Removed legacy query values from the address bar. No compatible legacy values were restored; the ${chosen.source === 'session' ? 'tab-session plan' : 'optional device copy'} remains available for review.`
          : `No compatible legacy values were restored and address-bar cleanup was unavailable; the ${chosen.source === 'session' ? 'tab-session plan' : 'optional device copy'} remains available for review.`);
    } else {
      setStatus(cleaned
        ? localized('Removed legacy query values from the address bar. No compatible legacy values were restored.', '已从地址栏移除旧查询值，且没有恢复兼容的旧值。')
        : localized('No compatible legacy values were restored, and address-bar cleanup was unavailable.', '没有恢复兼容的旧值，且地址栏清理不可用。'));
    }
  } else if (reconfirmRequired) {
    setStatus(localized('A saved plan uses an incompatible schema, rule or claim version. Clear the shared plan and re-enter the current facts before relying on a result.', '已保存计划使用不兼容的结构、规则或声明版本。依赖结果前，请清除共享计划并重新输入当前事实。'));
  } else if (chosen.status === 'ready') {
    setStatus(chosen.source === 'session'
      ? localized('Restored shared plan fields from this tab session. Review them before running the tool.', '已从此标签页会话恢复共享计划字段。运行工具前请复核。')
      : localized('Restored the optional device copy. Review it before running the tool; later edits stay in this tab unless you save again.', '已恢复可选设备副本。运行工具前请复核；除非再次保存，后续编辑只保留在此标签页。'));
  } else {
    setStatus(localized('Shared plan is session-only by default. Run a tool to keep approved fields available to the next tool in this tab.', '共享计划默认只保留在当前会话。运行工具后，允许的字段可供此标签页中的下一个工具使用。'));
  }

  restoreForm(options.form, projectStateForTool(state, options.toolId));

  const persist = (patch: Record<string, unknown>) => {
    state = applyToolPatch(state, options.toolId, { ...patch, locale });
    restored = false;
    reconfirmRequired = false;
    setStatus(writeSession(state)
      ? localized('Shared plan updated for this tab session. Review restored fields when you open another tool.', '共享计划已更新到此标签页会话。打开其他工具时请复核恢复的字段。')
      : localized('The result still works on this page, but this browser blocked session storage so it cannot be restored in another tool.', '结果仍可在本页使用，但浏览器阻止了会话存储，因此其他工具无法恢复这些字段。'));
    return state;
  };

  const restoreChecklist = (container: ParentNode) => {
    const projection = projectStateForTool(state, 'checklist');
    const checklistState = projection.checklistState && typeof projection.checklistState === 'object'
      ? projection.checklistState as Record<string, boolean>
      : {};
    container.querySelectorAll<HTMLInputElement>('input[data-checklist-id]').forEach((checkbox) => {
      checkbox.checked = checklistState[checkbox.dataset.checklistId || ''] === true;
    });
  };

  const persistChecklist = (container: ParentNode, routeId: string) => {
    const checklistState = Object.fromEntries([...container.querySelectorAll<HTMLInputElement>('input[data-checklist-id]')]
      .map((checkbox) => [checkbox.dataset.checklistId || '', checkbox.checked])
      .filter(([id]) => Boolean(id)));
    return persist({ routeId, checklistState });
  };

  document.querySelectorAll<HTMLButtonElement>('[data-plan-save-device], [data-plan-clear]').forEach((button) => {
    button.disabled = false;
  });

  document.querySelector<HTMLButtonElement>('[data-plan-save-device]')?.addEventListener('click', () => {
    const snapshot = createDevicePlanSnapshot(state, nowIso());
    setStatus(writeDevice(snapshot)
      ? localized('Saved this approved plan snapshot on this device for 30 days. Later tab-session edits do not update that copy unless you save again.', '已在此设备保存这份计划快照 30 天。除非再次保存，后续标签页会话编辑不会更新该副本。')
      : localized('This browser blocked the optional device save. The current page remains usable and the tab-session copy is unchanged.', '浏览器阻止了可选设备保存。本页仍可使用，标签页会话副本未改变。'));
  });

  document.querySelector<HTMLButtonElement>('[data-plan-clear]')?.addEventListener('click', () => {
    const sessionCleared = removeSession();
    const deviceCleared = removeDevice();
    const legacyCopiesCleared = removeLegacyToolCopies();
    state = createEmptyPlanState(locale);
    restored = false;
    reconfirmRequired = false;
    setStatus(sessionCleared && deviceCleared && legacyCopiesCleared
      ? localized('Shared plan and legacy per-tool local storage cleared from this browser. Current visible fields remain until you restart this tool.', '已从此浏览器清除共享计划和旧版工具本地存储。当前可见字段会保留到你重新开始此工具。')
      : localized('The browser blocked part of the clear operation. Clear this site’s storage in browser settings if you want to remove every saved copy.', '浏览器阻止了部分清除操作。如需删除所有副本，请在浏览器设置中清除此站点的存储。'));
  });

  const restartCurrentTool = () => {
    state = clearToolState(state, options.toolId);
    setStatus(writeSession(state)
      ? localized('This tool’s shared fields were cleared from the tab session. The optional device snapshot is unchanged until you save again or clear the shared plan.', '此工具负责的共享字段已从标签页会话清除。可选设备快照在你再次保存或清除共享计划前不会改变。')
      : localized('The form was reset, but the browser blocked the shared session update.', '表单已重置，但浏览器阻止了共享会话更新。'));
  };

  return {
    get state() { return sanitizePlanState(state); },
    get restored() { return restored; },
    get reconfirmRequired() { return reconfirmRequired; },
    persist,
    persistChecklist,
    restoreChecklist,
    restartCurrentTool,
  };
}
