import { test, expect } from '@playwright/test';

test.describe('Tool - Jasypt encryption decryption', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/jasypt-encryption-decryption');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Jasypt encryption decryption - IT Tools');
  });

  test('', async ({ page }) => {

  });
});