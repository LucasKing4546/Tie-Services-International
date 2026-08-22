/**
 * Referrer prefill for gated forms (EnquiryForm.astro). A link into a
 * Form-template page can carry a query param matching a field's `name` —
 * e.g. Product.astro's "Request the full datasheet" link appends
 * `?equipment=<product name>` — and that field arrives pre-filled and
 * read-only, rather than asking the visitor to retype what the site
 * already knows. A field reached with no matching param stays normal and
 * editable, same as today.
 *
 * Matches generically on `field.name` against the query string rather than
 * a schema flag naming which pages may prefill which field, so any future
 * gated form gets the same behaviour for free by simply linking to it with
 * `?<field name>=<value>`. No backend exists yet (CLAUDE.md §5.2) — this is
 * purely a client-side convenience, run once per navigation like the rest
 * of the motion system (see Base.astro).
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
      // `disabled` (unlike `readOnly` on input/textarea above) is excluded
      // from form submission entirely — a disabled select's value would
      // never reach the payload. Disable it for the correct locked-looking
      // UI, but carry the real value on a same-named hidden input instead,
      // so the disabled select and its stand-in never collide on submit.
      el.disabled = true;
      const hidden = document.createElement('input');
      hidden.type = 'hidden';
      hidden.name = name;
      hidden.value = value;
      el.insertAdjacentElement('afterend', hidden);
    }
  });
}
