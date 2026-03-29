import { test, expect } from '@playwright/test';

test.describe('Tool - Api client', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/api-client');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Api client - IT Tools');
  });

  test('', async ({ page }) => {

  });
});