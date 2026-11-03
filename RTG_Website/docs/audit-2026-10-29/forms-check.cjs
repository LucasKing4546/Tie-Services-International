// Headless check of the form fixes against `astro preview` on :4329.
const { chromium } = require('C:/Users/lucas/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const assert = require('assert');
const B = 'http://localhost:4329';
const OUT = __dirname;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  // The consent banner would cover the form; it isn't what's under test.
  await page.route(/cookielaw|onetrust/, (r) => r.abort());

  // 1. Empty submit: stays on page, inline errors, focus on first field.
  await page.goto(`${B}/contact/aftersales/`);
  await page.click('form.form button[type=submit]');
  assert.strictEqual(new URL(page.url()).pathname, '/contact/aftersales/');
  const invalid = await page.$$eval('[aria-invalid="true"]', (els) => els.map((e) => e.id));
  assert.deepStrictEqual(invalid, ['equipment', 'vessel', 'problem', 'name', 'company', 'email', 'consent']);
  assert.strictEqual(await page.evaluate(() => document.activeElement.id), 'equipment');
  assert.strictEqual(await page.textContent('#equipment-err'), 'Please fill in this field.');
  assert.ok(await page.isVisible('#consent-err'));
  assert.strictEqual(await page.getAttribute('#equipment', 'aria-describedby'), 'equipment-hint equipment-err');
  await page.screenshot({ path: `${OUT}/x04-errors.png`, fullPage: true });

  // 2. Fixing a field clears its error; bad email gets its own message.
  await page.fill('#equipment', 'Traction winch');
  assert.strictEqual(await page.getAttribute('#equipment', 'aria-invalid'), null);
  assert.ok(await page.isHidden('#equipment-err'));
  await page.fill('#email', 'not-an-email');
  assert.match(await page.textContent('#email-err'), /email address/);

  // 3. Valid submit with no backend: stays, status says nothing was sent.
  await page.fill('#vessel', 'Test vessel');
  await page.fill('#problem', 'Brake slipping');
  await page.fill('#name', 'Test');
  await page.fill('#company', 'Test Ltd');
  await page.fill('#email', 'test@example.com');
  await page.check('#consent');
  await page.click('form.form button[type=submit]');
  assert.strictEqual(new URL(page.url()).pathname, '/contact/aftersales/');
  assert.match(await page.textContent('.form-status'), /not connected yet/);
  assert.strictEqual(await page.locator('[aria-invalid="true"]').count(), 0);

  // 4. Honeypot filled: dropped silently, no status.
  await page.goto(`${B}/contact/aftersales/`);
  for (const [s, v] of [['#equipment', 'a'], ['#vessel', 'b'], ['#problem', 'c'], ['#name', 'd'], ['#company', 'e'], ['#email', 'f@g.com']]) await page.fill(s, v);
  await page.check('#consent');
  await page.evaluate(() => (document.querySelector('[name=website]').value = 'spam'));
  await page.click('form.form button[type=submit]');
  assert.strictEqual(new URL(page.url()).pathname, '/contact/aftersales/');
  assert.ok(await page.isHidden('.form-status'));

  // 5. C-09 upload form, multipart; autocomplete tokens.
  await page.goto(`${B}/contact-manufacturing/send-documentation/`.replace('contact-', 'contract-'));
  assert.strictEqual(await page.getAttribute('form.form', 'enctype'), 'multipart/form-data');
  assert.strictEqual(await page.getAttribute('#documents', 'type'), 'file');
  assert.strictEqual(await page.getAttribute('#company', 'autocomplete'), 'organization');
  assert.strictEqual(await page.getAttribute('#phone', 'autocomplete'), 'tel');

  // 6. "What happens next": datasheet steps only on R-01.
  await page.goto(`${B}/resources/datasheets/`);
  assert.strictEqual(await page.locator('.form-next li').count(), 3);
  await page.goto(`${B}/contact/request-a-quotation/`);
  assert.strictEqual(await page.locator('.form-next li').count(), 1);
  assert.strictEqual(await page.getAttribute('form.form', 'enctype'), null);

  // 7. Phone: form first, columns top-aligned.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${B}/contact/aftersales/`);
  const formTop = await page.$eval('form.form', (f) => f.getBoundingClientRect().top);
  const nextTop = await page.$eval('.form-side', (f) => f.getBoundingClientRect().top);
  assert.ok(formTop < nextTop, 'form should come first on a phone');
  await page.click('form.form button[type=submit]');
  await page.screenshot({ path: `${OUT}/x04-phone-errors.png`, fullPage: true });

  assert.deepStrictEqual(errors, []);
  await browser.close();
  console.log('forms-check: all passed');
})().catch((e) => { console.error(e); process.exit(1); });
