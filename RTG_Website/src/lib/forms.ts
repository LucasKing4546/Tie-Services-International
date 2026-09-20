/**
 * Referrer prefill for gated forms (EnquiryForm.astro). A link into a
 * Form-template page can carry a query param matching a field's `name` —
 * e.g. Product.astro's "Request the datasheet" link appends
 * `?equipment=<product name>` — and that field arrives pre-filled and
 * read-only instead of asking the visitor to retype what the site already
 * knows. Matches generically on `field.name` rather than a schema flag
 * naming which pages may prefill which field, so any gated form gets this
 * for free by linking to it with `?<field name>=<value>`.
 */
export function initFormPrefill(): void {
  const params = new URLSearchParams(location.search);
  if (![...params.keys()].length) return;

  document.querySelectorAll<HTMLElement>('.form [name]').forEach((el) => {
    const name = el.getAttribute('name');
    // Never let a query param fill (or lock) the honeypot — that would
    // defeat its own purpose (CLAUDE.md §5.2).
    if (!name || name === 'website') return;
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
