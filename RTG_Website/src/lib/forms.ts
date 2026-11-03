/**
 * Validation for every `.form` (EnquiryForm.astro sets `novalidate`). On
 * submit each control is checked with the browser's own constraint API;
 * a failing one gets aria-invalid and its message in the `#<name>-err`
 * line FormField.astro already links with aria-describedby, and focus moves
 * to the first. Errors clear as the visitor fixes them.
 *
 * A filled honeypot (`website`) is dropped silently. With no backend
 * (action '#', CLAUDE.md §5.2) a valid submit is stopped here and the
 * status line says nothing was sent, rather than posting to a 404.
 */
function errLine(el: HTMLElement): HTMLElement | null {
  return document.getElementById(`${el.id}-err`);
}

function showError(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): boolean {
  const line = errLine(el);
  const ok = el.checkValidity();
  if (ok) el.removeAttribute('aria-invalid');
  else el.setAttribute('aria-invalid', 'true');
  if (line) {
    line.textContent = ok ? '' : message(el);
    line.hidden = ok;
  }
  return ok;
}

function message(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string {
  const v = el.validity;
  if (v.valueMissing) {
    if (el instanceof HTMLInputElement && el.type === 'checkbox') return 'Please tick this box to continue.';
    if (el instanceof HTMLSelectElement) return 'Please choose an option.';
    if (el instanceof HTMLInputElement && el.type === 'file') return 'Please attach at least one file.';
    return 'Please fill in this field.';
  }
  if (v.typeMismatch && el.type === 'email') return 'Please enter an email address, like name@company.com.';
  return el.validationMessage;
}

export function initForms(): void {
  document.querySelectorAll<HTMLFormElement>('form.form').forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = '1';
    const controls = () =>
      [...form.elements].filter(
        (el): el is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement =>
          (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) &&
          !!el.id && !!errLine(el),
      );
    const status = form.querySelector<HTMLElement>('.form-status');

    // Re-check a field the visitor has already been told about.
    form.addEventListener('input', (e) => {
      const el = e.target as HTMLInputElement;
      if (el.getAttribute('aria-invalid') === 'true') showError(el);
    });
    form.addEventListener('change', (e) => {
      const el = e.target as HTMLInputElement;
      if (el.getAttribute('aria-invalid') === 'true') showError(el);
    });

    form.addEventListener('submit', (e) => {
      const bad = controls().filter((el) => !showError(el));
      if (bad.length) {
        e.preventDefault();
        bad[0].focus();
        return;
      }
      const honeypot = form.elements.namedItem('website');
      if (honeypot instanceof HTMLInputElement && honeypot.value) {
        e.preventDefault();
        return;
      }
      const endpoint = form.getAttribute('action');
      if (!endpoint || endpoint === '#') {
        e.preventDefault();
        if (status) {
          status.textContent = 'This form is not connected yet, so nothing has been sent.';
          status.hidden = false;
        }
      }
    });
  });
}

/**
 * Referrer prefill for gated forms (EnquiryForm.astro). A link into a
 * Form-template page can carry a query param matching a field's `name` —
 * e.g. Product.astro's "Request the datasheet" link appends
 * `?equipment=<product name>` — and that field arrives pre-filled and
 * read-only instead of asking the visitor to retype what the site already
 * knows.
 *
 * Only the names in PREFILL may be set this way. A link is written by
 * whoever sends it, so anything it fills and locks is that person's choice,
 * not the visitor's: an open match on every field name would let a crafted
 * link lock the delivery email on a datasheet request to someone else's
 * address. Add a name here only if it is safe for a stranger to choose it.
 */
const PREFILL = new Set(['equipment']);

export function initFormPrefill(): void {
  const params = new URLSearchParams(location.search);
  if (![...params.keys()].length) return;

  document.querySelectorAll<HTMLElement>('.form [name]').forEach((el) => {
    const name = el.getAttribute('name');
    if (!name || !PREFILL.has(name)) return;
    const value = params.get(name);
    if (!value) return;

    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      el.value = value;
      el.readOnly = true;
    } else if (el instanceof HTMLSelectElement) {
      const match = [...el.options].some((o) => o.value === value);
      if (!match) return;
      el.value = value;
      // `disabled` (unlike `readOnly` on input/textarea) is excluded from
      // form submission entirely, so the value has to travel on a same-
      // named hidden input instead, or it would never reach the payload.
      el.disabled = true;
      const hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = name;
      hidden.value = value;
      el.insertAdjacentElement('afterend', hidden);
    }
  });
}
