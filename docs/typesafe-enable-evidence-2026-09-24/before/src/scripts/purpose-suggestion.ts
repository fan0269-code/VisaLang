const purposes = new Set(['family-reunion', 'b1', 'ausbildung', 'nursing', 'university', 'other']);

export function parsePurposeSuggestion(value: unknown): string | null {
  if (!value || typeof value !== 'object') throw new Error('Invalid suggestion');
  const data = value as Record<string, unknown>;
  if (data.requiresConfirmation !== true) throw new Error('Confirmation required');
  if (data.status === 'needs_clarification' && data.purpose === null) return null;
  if (data.status !== 'suggestion' || typeof data.purpose !== 'string' || !purposes.has(data.purpose)) throw new Error('Invalid purpose');
  return data.purpose;
}

export function setupPurposeSuggestion(form: HTMLFormElement) {
  const panel = document.querySelector<HTMLElement>('[data-purpose-suggestion]');
  const input = panel?.querySelector<HTMLTextAreaElement>('textarea');
  const request = panel?.querySelector<HTMLButtonElement>('[data-purpose-request]');
  const apply = panel?.querySelector<HTMLButtonElement>('[data-purpose-apply]');
  const status = panel?.querySelector<HTMLElement>('[data-purpose-status]');
  const purpose = form.elements.namedItem('purpose');
  if (!panel || !input || !request || !apply || !status || !(purpose instanceof HTMLSelectElement)) return;
  const zh = panel.dataset.locale === 'zh-CN';
  let version = 0;
  let controller: AbortController | undefined;
  let candidate: string | null = null;
  const invalidate = () => {
    version += 1;
    controller?.abort();
    controller = undefined;
    candidate = null;
    apply.hidden = true;
    request.disabled = false;
    status.textContent = '';
    panel.removeAttribute('aria-busy');
  };
  input.addEventListener('input', invalidate);
  form.addEventListener('change', invalidate);
  form.addEventListener('reset', () => { invalidate(); input.value = ''; });
  form.addEventListener('submit', invalidate);
  request.addEventListener('click', async () => {
    invalidate();
    const text = input.value.trim();
    if (!text || [...text].length > 300) {
      status.textContent = zh ? '请输入 1–300 字的简短目的，或直接选择下方选项。' : 'Enter a short purpose (1–300 characters), or choose below.';
      input.focus();
      return;
    }
    const current = version;
    controller = new AbortController();
    const pending = controller;
    const timeout = window.setTimeout(() => pending.abort(), 12000);
    request.disabled = true;
    panel.setAttribute('aria-busy', 'true');
    status.textContent = zh ? '正在识别目的…你仍可直接选择下方选项。' : 'Looking for a purpose… You can still choose below.';
    try {
      const response = await fetch('/api/purpose-suggestion/', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }), signal: pending.signal,
        credentials: 'omit', cache: 'no-store', redirect: 'error',
      });
      if (!response.ok) throw new Error('Service unavailable');
      const next = parsePurposeSuggestion(await response.json());
      if (current !== version) return;
      candidate = next;
      if (!next) {
        status.textContent = zh ? '还不能确定单一目的。请补充说明，或直接选择下方选项。' : 'A single purpose is not clear. Add detail or choose below.';
        return;
      }
      const label = [...purpose.options].find((option) => option.value === next)?.textContent || '';
      status.textContent = zh ? `建议目的：${label}。请核对；这不代表资格、证书要求或国家路线已确认。` : `Suggested purpose: ${label}. Please check; eligibility, certificate requirements and country coverage are not confirmed.`;
      apply.hidden = false;
    } catch {
      if (current === version) status.textContent = zh ? '暂时无法获取建议。请直接使用下方选项，或稍后重试。' : 'Suggestions are unavailable. Use the choices below or try again later.';
    } finally {
      window.clearTimeout(timeout);
      if (current === version) { request.disabled = false; panel.removeAttribute('aria-busy'); }
    }
  });
  apply.addEventListener('click', () => {
    if (!candidate) return;
    purpose.value = candidate;
    purpose.dispatchEvent(new Event('change', { bubbles: true }));
    input.value = '';
    status.textContent = zh ? '已采用。请继续确认国家和其他信息。' : 'Applied. Continue confirming the country and other details.';
    purpose.focus();
  });
  panel.hidden = false;
}
