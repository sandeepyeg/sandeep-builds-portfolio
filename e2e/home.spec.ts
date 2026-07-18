import { test, expect } from '@playwright/test';

test('home page renders successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Sandeep Johal/);
});

test('main heading is visible', async ({ page }) => {
  await page.goto('/');
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  await expect(heading).toContainText('SANDEEP');
  await expect(heading).toContainText('JOHAL');
});

test('navigation links reach correct sections', async ({ page }) => {
  await page.goto('/');
  await page.locator('a', { hasText: 'Work' }).first().click();
  await expect(page.locator('#work')).toBeInViewport();
});

test('mobile navigation opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await page.locator('.site-header__menu-btn').click();
  const menu = page.locator('.mobile-menu');
  await expect(menu).toHaveClass(/is-open/);

  await page.locator('.mobile-menu__link').first().click();
  await expect(menu).not.toHaveClass(/is-open/);
});

test('enterprise payments case study route works', async ({ page }) => {
  await page.goto('/work/enterprise-payments');
  await expect(page).toHaveTitle(/Enterprise Payments Integration Platform/);
  await expect(page.locator('h1')).toContainText('Enterprise Payments Integration Platform');
});

test('email link uses correct address', async ({ page }) => {
  await page.goto('/');
  const emailLink = page.locator('a[href="mailto:johalsandeep64@gmail.com"]').first();
  await expect(emailLink).toBeAttached();
});

test('LinkedIn link is correct', async ({ page }) => {
  await page.goto('/');
  const linkedin = page.locator('a[href="https://www.linkedin.com/in/johalsandeep"]').first();
  await expect(linkedin).toBeAttached();
});

test('GitHub link is correct', async ({ page }) => {
  await page.goto('/');
  const github = page.locator('a[href*="github.com/sandeepyeg"]').first();
  await expect(github).toBeAttached();
});

test('no unfinished projects have fake repository links', async ({ page }) => {
  await page.goto('/');
  const labSection = page.locator('#lab');
  await labSection.scrollIntoViewIfNeeded();

  const cards = labSection.locator('.project-card');
  const count = await cards.count();
  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    const statusBadge = card.locator('app-status-badge');
    const statusText = await statusBadge.textContent();

    if (statusText?.includes('In Development') || statusText?.includes('Planned')) {
      const ghLink = card.locator('a[href*="github.com"]');
      await expect(ghLink).toHaveCount(0);
    }
  }
});

test('keyboard navigation reaches primary actions', async ({ page }) => {
  await page.goto('/');
  await page.locator('.skip-link').press('Enter');
  await expect(page.locator('#main')).toBeFocused();

  await page.keyboard.press('Tab');
  const firstLink = page.locator('.site-header__brand');
  await expect(firstLink).toBeFocused();
});

test('no horizontal overflow on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
});
