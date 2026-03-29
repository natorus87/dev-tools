import { test, expect } from '@playwright/test';

test.describe('Tool - Ipv6 reverse dns generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ipv6-reverse-dns-generator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Ipv6 reverse dns generator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});