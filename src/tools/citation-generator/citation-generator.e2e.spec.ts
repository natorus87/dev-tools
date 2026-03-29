import { test, expect } from '@playwright/test';

test.describe('Tool - Citation generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/citation-generator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Citation generator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});