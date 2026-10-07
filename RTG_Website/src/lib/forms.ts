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
