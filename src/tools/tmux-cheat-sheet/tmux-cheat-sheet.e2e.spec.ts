import { test, expect } from '@playwright/test';

test.describe('Tool - Tmux cheat sheet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tmux-cheat-sheet');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Tmux cheat sheet - IT Tools');
  });

  test('', async ({ page }) => {

  });
});