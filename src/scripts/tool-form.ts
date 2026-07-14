type ToolField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface ToolFormOptions {
  persistedNames: string[];
  customError?: (field: ToolField, form: HTMLFormElement) => string | undefined;
}

const fieldLabel = (field: ToolField) => field.closest('label')?.querySelector(':scope > span')?.textContent?.trim()
  || field.closest('label')?.firstChild?.textContent?.trim()
  || field.name;

export function setupToolForm(form: HTMLFormElement, options: ToolFormOptions) {
  const fields = [...form.querySelectorAll<ToolField>('input, select, textarea')].filter((field) => field.name);
  const summary = form.querySelector<HTMLElement>('[data-error-summary]');
  const steps = [...document.querySelectorAll<HTMLElement>('[data-tool-step]')];
  const setStep = (step: number) => steps.forEach((item, index) => {
    item.classList.toggle('current', index === step);
    item.classList.toggle('complete', index < step);
    if (index === step) item.setAttribute('aria-current', 'step'); else item.removeAttribute('aria-current');
  });
  const errorFor = (field: ToolField) => {
    const custom = options.customError?.(field, form);
    if (custom) return custom;
    if (field.validity.valueMissing) return `${fieldLabel(field)} is required.`;
    if (field.validity.typeMismatch) return `Enter a valid ${fieldLabel(field).toLowerCase()}.`;
    if (field.validity.rangeUnderflow && field instanceof HTMLInputElement) return `${fieldLabel(field)} must be ${field.min} or greater.`;
    if (field.validity.badInput) return `Enter a valid value for ${fieldLabel(field).toLowerCase()}.`;
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
      field.closest('label')?.append(error);
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
  const validate = () => {
    const failures = fields.map((field) => ({ field, message: errorFor(field) })).filter((item) => item.message);
    fields.forEach(clearFieldError);
    failures.forEach(({ field, message }) => showFieldError(field, message));
    if (summary) {
      summary.replaceChildren();
      summary.hidden = failures.length === 0;
      if (failures.length) {
        const heading = document.createElement('h3'); heading.textContent = `Fix ${failures.length} field ${failures.length === 1 ? 'error' : 'errors'}`;
        const list = document.createElement('ul');
        failures.forEach(({ field, message }) => { const item = document.createElement('li'); const link = document.createElement('a'); link.href = `#${field.id}`; link.textContent = message; link.addEventListener('click', () => field.focus()); item.append(link); list.append(item); });
        summary.append(heading, list);
      }
    }
    if (failures.length) { failures[0].field.focus(); return false; }
    return true;
  };
  const persist = () => {
    const params = new URLSearchParams();
    const data = new FormData(form);
    options.persistedNames.forEach((name) => { const value = String(data.get(name) || '').trim(); if (value) params.set(name, value); });
    history.replaceState(null, '', params.size ? `${location.pathname}?${params}` : location.pathname);
  };
  const params = new URLSearchParams(location.search);
  let restored = false;
  options.persistedNames.forEach((name) => {
    const value = params.get(name); if (value === null) return;
    const field = form.elements.namedItem(name);
    if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) { field.value = value; restored = true; }
  });
  fields.forEach((field) => {
    errorElement(field);
    const repair = () => {
      if (!errorFor(field)) {
        clearFieldError(field);
        summary?.querySelector(`a[href="#${CSS.escape(field.id)}"]`)?.closest('li')?.remove();
        const remaining = summary?.querySelectorAll('li').length || 0;
        const heading = summary?.querySelector('h3');
        if (!remaining && summary) { summary.hidden = true; summary.replaceChildren(); }
        else if (heading) heading.textContent = `Fix ${remaining} field ${remaining === 1 ? 'error' : 'errors'}`;
      }
      setStep(1);
    };
    field.addEventListener('input', repair); field.addEventListener('change', repair);
  });
  setStep(fields.some((field) => field.value) ? 1 : 0);
  document.querySelector('[data-tool-restart]')?.addEventListener('click', () => {
    form.reset(); fields.forEach(clearFieldError); if (summary) summary.hidden = true;
    document.querySelectorAll<HTMLElement>('.tool-result, .tool-result-panel').forEach((result) => { result.hidden = true; });
    history.replaceState(null, '', location.pathname); setStep(0); fields[0]?.focus();
  });
  return { validate, persist, restored, markResult: () => setStep(2) };
}
