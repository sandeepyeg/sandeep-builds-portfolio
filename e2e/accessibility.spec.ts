import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has no critical accessibility violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const violations = results.violations.filter((v) => {
    const isSeriousOrCritical = v.impact === 'critical' || v.impact === 'serious';
    return isSeriousOrCritical;
  });

  expect(violations, JSON.stringify(violations, null, 2)).toHaveLength(0);
});

test('case study page has no critical accessibility violations', async ({ page }) => {
  await page.goto('/work/enterprise-payments');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const violations = results.violations.filter((v) => {
    const isSeriousOrCritical = v.impact === 'critical' || v.impact === 'serious';
    return isSeriousOrCritical;
  });

  expect(violations, JSON.stringify(violations, null, 2)).toHaveLength(0);
});

test('reduced motion mode keeps content accessible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('a[href="mailto:johalsandeep64@gmail.com"]').first()).toBeAttached();
});
