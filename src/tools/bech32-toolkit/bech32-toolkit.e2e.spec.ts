import { test, expect } from '@playwright/test';

test.describe('Tool - Bech32 toolkit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/bech32-toolkit');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Bech32 toolkit - IT Tools');
  });

  test('', async ({ page }) => {

  });
});