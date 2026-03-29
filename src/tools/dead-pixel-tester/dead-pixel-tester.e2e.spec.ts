import { test, expect } from '@playwright/test';

test.describe('Tool - Dead pixel tester', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dead-pixel-tester');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Dead pixel tester - IT Tools');
  });

  test('', async ({ page }) => {

  });
});