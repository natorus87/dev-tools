import { test, expect } from '@playwright/test';

test.describe('Tool - Web to markdown converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/web-to-markdown-converter');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Web to markdown converter - IT Tools');
  });

  test('', async ({ page }) => {

  });
});