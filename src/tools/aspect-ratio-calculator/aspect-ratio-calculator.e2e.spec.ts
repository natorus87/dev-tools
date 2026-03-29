import { test, expect } from '@playwright/test';

test.describe('Tool - Aspect ratio calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/aspect-ratio-calculator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Aspect ratio calculator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});