import { test, expect } from '@playwright/test';

test('desktop navigation renders all links', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const nav = page.locator('.site-header__nav-list');
  await expect(nav.locator('a', { hasText: 'Work' })).toBeVisible();
  await expect(nav.locator('a', { hasText: 'About' })).toBeVisible();
  await expect(nav.locator('a', { hasText: 'Experience' })).toBeVisible();
  await expect(nav.locator('a', { hasText: 'Contact' })).toBeVisible();
  await expect(nav.locator('a', { hasText: 'GitHub' })).toBeVisible();
});

test('mobile hamburger menu button is visible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.site-header__menu-btn')).toBeVisible();
});

test('escape closes mobile menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.locator('.site-header__menu-btn').click();
  await expect(page.locator('.mobile-menu')).toHaveClass(/is-open/);

  await page.keyboard.press('Escape');
  await expect(page.locator('.mobile-menu')).not.toHaveClass(/is-open/);
});

test('header gets scrolled style after scrolling', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(200);
  await expect(page.locator('.site-header')).toHaveClass(/is-scrolled/);
});

test('back to top button scrolls to top', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(200);

  await page.locator('.site-footer__top').click();
  await page.waitForTimeout(500);

  const scrollY = await page.evaluate(() => window.scrollY);
  expect(scrollY).toBeLessThan(100);
});
