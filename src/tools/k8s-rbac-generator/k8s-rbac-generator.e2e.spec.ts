import { test, expect } from '@playwright/test';

test.describe('Tool - K8s rbac generator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/k8s-rbac-generator');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('K8s rbac generator - IT Tools');
  });

  test('', async ({ page }) => {

  });
});