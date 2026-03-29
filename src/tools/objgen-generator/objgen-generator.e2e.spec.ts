import { test, expect } from '@playwright/test';

test.describe('Tool - Objgen generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/objgen-generator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Objgen generator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});