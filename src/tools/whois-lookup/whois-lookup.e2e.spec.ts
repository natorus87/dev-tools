import { test, expect } from '@playwright/test';

test.describe('Tool - Whois lookup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/whois-lookup');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Whois lookup - IT Tools');
  });

  test('', async ({ page }) => {

  });
});