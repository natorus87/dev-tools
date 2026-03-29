import { test, expect } from '@playwright/test';

test.describe('Tool - Credit card generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/credit-card-generator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Credit card generator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});