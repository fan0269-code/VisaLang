import { commonToolCopy, type ToolLocale } from '../data/tool-copy.ts';

type ToolField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface ToolFormOptions {
  customError?: (field: ToolField, form: HTMLFormElement) => string | undefined;
  onRestart?: () => void;
  locale?: ToolLocale;
}

const labelCache = new WeakMap<ToolField, string>();
const fieldLabel = (field: ToolField) => {
  const cached = labelCache.get(field);
  if (cached) return cached;
  const label = field.closest('label');
  let text = '';
  if (label) {
    const clone = label.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('.tool-field-error, input, select, textarea, .sr-only').forEach((node) => node.remove());
    text = clone.textContent?.trim() ?? '';
  }
  const value = text || field.name;
  labelCache.set(field, value);
  return value;
};

export function setupToolForm(form: HTMLFormElement, options: ToolFormOptions = {}) {
  const locale = options.locale ?? (document.documentElement.lang === 'zh-CN' ? 'zh-CN' : 'en');
  const copy = commonToolCopy[locale];
  const interpolate = (template: string, values: Record<string, string | number>) => Object.entries(values)
    .reduce((value, [key, replacement]) => value.replace(`{${key}}`, String(replacement)), template);
  const fields = [...form.querySelectorAll<ToolField>('input, select, textarea')].filter((field) => field.name);
  const summary = form.querySelector<HTMLElement>('[data-error-summary]');
  const invalidateResult = () => {
    document.querySelectorAll<HTMLElement>('.tool-result, .tool-result-panel').forEach((result) => {
      result.hidden = true;
    });
  };
  const steps = [...document.querySelectorAll<HTMLElement>('[data-tool-step]')];
  const setStep = (step: number) => steps.forEach((item, index) => {
    item.classList.toggle('current', index === step);
    item.classList.toggle('complete', index < step);
    if (index === step) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
  });
  const errorFor = (field: ToolField) => {
    const custom = options.customError?.(field, form);
    if (custom) return custom;
    if (field.validity.valueMissing) return interpolate(copy.required, { field: fieldLabel(field) });
    if (field.validity.typeMismatch) return interpolate(copy.valid, { field: fieldLabel(field).toLowerCase() });
    if (field.validity.rangeUnderflow && field instanceof HTMLInputElement) return interpolate(copy.minimum, { field: fieldLabel(field), value: field.min });
    if (field.validity.rangeOverflow && field instanceof HTMLInputElement) return interpolate(copy.maximum, { field: fieldLabel(field), value: field.max });
    if (field.validity.badInput) return interpolate(copy.validValue, { field: fieldLabel(field).toLowerCase() });
    return field.validationMessage || '';
  };
  const errorElement = (field: ToolField) => {
    if (!field.id) field.id = `${form.id}-${field.name}`;
    const id = `${field.id}-error`;
    let error = form.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!error) {
      error = document.createElement('span');
      error.id = id;
      error.className = 'tool-field-error';
      error.hidden = true;
      const anchor = field.closest('label') ?? field;
      anchor.insertAdjacentElement('afterend', error);
    }
    return error;
  };
  const clearFieldError = (field: ToolField) => {
    field.removeAttribute('aria-invalid');
    const error = errorElement(field);
    error.hidden = true;
    error.textContent = '';
    const describedBy = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter((id) => id && id !== error.id);
    if (describedBy.length) field.setAttribute('aria-describedby', describedBy.join(' ')); else field.removeAttribute('aria-describedby');
  };
  const showFieldError = (field: ToolField, message: string) => {
    const error = errorElement(field);
    error.textContent = message;
    error.hidden = false;
    field.setAttribute('aria-invalid', 'true');
    const describedBy = new Set((field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    describedBy.add(error.id);
    field.setAttribute('aria-describedby', [...describedBy].join(' '));
  };
  const showFailures = (failures: { field: ToolField; message: string }[]) => {
    fields.forEach(clearFieldError);
    failures.forEach(({ field, message }) => showFieldError(field, message));
    if (summary) {
      summary.replaceChildren();
      summary.hidden = failures.length === 0;
      if (failures.length) {
        const heading = document.createElement('h3'); heading.textContent = failures.length === 1
          ? copy.errorSummaryOne
          : interpolate(copy.errorSummaryMany, { count: failures.length });
        const list = document.createElement('ul');
        failures.forEach(({ field, message }) => { const item = document.createElement('li'); const link = document.createElement('a'); link.href = `#${field.id}`; link.textContent = message; link.addEventListener('click', () => field.focus()); item.append(link); list.append(item); });
        summary.append(heading, list);
      }
    }
    if (failures.length) { invalidateResult(); failures[0].field.focus(); return false; }
    return true;
  };
  const validate = () => showFailures(fields.map((field) => ({ field, message: errorFor(field) })).filter((item) => item.message));
  const reportError = (fieldName: string, message: string) => {
    const field = fields.find((candidate) => candidate.name === fieldName);
    if (!field) return false;
    return showFailures([{ field, message }]);
  };
  fields.forEach((field) => {
    errorElement(field);
    const repair = () => {
      invalidateResult();
      if (!errorFor(field)) {
        clearFieldError(field);
        summary?.querySelector(`a[href="#${CSS.escape(field.id)}"]`)?.closest('li')?.remove();
        const remaining = summary?.querySelectorAll('li').length || 0;
        const heading = summary?.querySelector('h3');
        if (!remaining && summary) { summary.hidden = true; summary.replaceChildren(); }
        else if (heading) heading.textContent = remaining === 1
          ? copy.errorSummaryOne
          : interpolate(copy.errorSummaryMany, { count: remaining });
      }
      setStep(1);
    };
    field.addEventListener('input', repair); field.addEventListener('change', repair);
  });
  setStep(fields.some((field) => field.value) ? 1 : 0);
  document.querySelector('[data-tool-restart]')?.addEventListener('click', () => {
    form.reset(); fields.forEach(clearFieldError); if (summary) summary.hidden = true;
    document.querySelectorAll<HTMLElement>('.tool-result, .tool-result-panel').forEach((result) => { result.hidden = true; });
    options.onRestart?.(); setStep(0); fields[0]?.focus();
  });
  const activate = () => {
    form.removeAttribute('inert');
    form.removeAttribute('aria-busy');
    document.querySelector<HTMLButtonElement>('[data-tool-restart]')?.removeAttribute('disabled');
    form.dispatchEvent(new CustomEvent('visalang:tool-ready', { bubbles: true }));
  };
  return { validate, reportError, markResult: () => setStep(2), activate };
}
