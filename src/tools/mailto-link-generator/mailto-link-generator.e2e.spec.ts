import { test, expect } from '@playwright/test';

test.describe('Tool - Mailto link generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mailto-link-generator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Mailto link generator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});