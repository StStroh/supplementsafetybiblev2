import { test, expect } from '@playwright/test';

test.describe('Interaction Checker - Label and Suggestion Clicks', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.interaction-input', { timeout: 10000 });
  });

  test('clicking Supplement label focuses left input', async ({ page }) => {
    const supplementLabel = page.locator('button.field-label').filter({ hasText: 'Supplement' });
    const supplementInput = page.locator('#suppInput');

    await supplementLabel.click();
    await expect(supplementInput).toBeFocused();
  });

  test('clicking Medication label focuses right input', async ({ page }) => {
    const medicationLabel = page.locator('button.field-label').filter({ hasText: 'Medication' });
    const medicationInput = page.locator('#medInput');

    await medicationLabel.click();
    await expect(medicationInput).toBeFocused();
  });

  test('clicking a supplement suggestion fills input and closes dropdown', async ({ page }) => {
    const supplementInput = page.locator('#suppInput');

    await supplementInput.click();
    await supplementInput.fill('Mag');

    const dropdown = page.locator('#supp-listbox');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    const firstSuggestion = dropdown.locator('.ac__item').first();
    await firstSuggestion.click();

    await expect(supplementInput).not.toHaveValue('');
    await expect(dropdown).not.toBeVisible();
  });

  test('clicking a medication suggestion fills input and closes dropdown', async ({ page }) => {
    const medicationInput = page.locator('#medInput');

    await medicationInput.click();
    await medicationInput.fill('Met');

    const dropdown = page.locator('#med-listbox');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    const firstSuggestion = dropdown.locator('.ac__item').first();
    await firstSuggestion.click();

    await expect(medicationInput).not.toHaveValue('');
    await expect(dropdown).not.toBeVisible();
  });

  test('clicking supplement chip fills input', async ({ page }) => {
    const supplementInput = page.locator('#suppInput');
    const magnesiumChip = page.locator('.chip').filter({ hasText: 'Magnesium' }).first();

    await magnesiumChip.click();
    await expect(supplementInput).toHaveValue('Magnesium');
  });

  test('clicking medication chip fills input', async ({ page }) => {
    const medicationInput = page.locator('#medInput');
    const metforminChip = page.locator('.chip').filter({ hasText: 'Metformin' }).first();

    await metforminChip.click();
    await expect(medicationInput).toHaveValue('Metformin');
  });

  test('Enter key selects highlighted suggestion', async ({ page }) => {
    const supplementInput = page.locator('#suppInput');

    await supplementInput.click();
    await supplementInput.fill('Vita');

    const dropdown = page.locator('#supp-listbox');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    await supplementInput.press('ArrowDown');
    await supplementInput.press('Enter');

    await expect(supplementInput).not.toHaveValue('Vita');
    await expect(dropdown).not.toBeVisible();
  });

  test('ArrowUp and ArrowDown navigate suggestions', async ({ page }) => {
    const supplementInput = page.locator('#suppInput');

    await supplementInput.click();
    await supplementInput.fill('Vit');

    const dropdown = page.locator('#supp-listbox');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    const firstItem = dropdown.locator('.ac__item').first();
    const secondItem = dropdown.locator('.ac__item').nth(1);

    await supplementInput.press('ArrowDown');
    await expect(secondItem).toHaveClass(/is-active/);

    await supplementInput.press('ArrowUp');
    await expect(firstItem).toHaveClass(/is-active/);
  });

  test('Escape key closes dropdown', async ({ page }) => {
    const supplementInput = page.locator('#suppInput');

    await supplementInput.click();
    await supplementInput.fill('Mag');

    const dropdown = page.locator('#supp-listbox');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    await supplementInput.press('Escape');
    await expect(dropdown).not.toBeVisible();
  });

  test('selecting supplement moves focus to medication when empty', async ({ page }) => {
    const supplementInput = page.locator('#suppInput');
    const medicationInput = page.locator('#medInput');
    const magnesiumChip = page.locator('.chip').filter({ hasText: 'Magnesium' }).first();

    await magnesiumChip.click();

    await page.waitForTimeout(100);
    await expect(medicationInput).toBeFocused();
  });

  test('dropdown appears above sticky CTAs', async ({ page }) => {
    const supplementInput = page.locator('#suppInput');

    await supplementInput.click();
    await supplementInput.fill('Omega');

    const dropdown = page.locator('#supp-listbox');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    const dropdownZIndex = await dropdown.evaluate((el) => {
      return window.getComputedStyle(el).zIndex;
    });

    expect(parseInt(dropdownZIndex)).toBeGreaterThan(1000);
  });

  test('touch input does not blur on suggestion tap', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    const supplementInput = page.locator('#suppInput');

    await supplementInput.tap();
    await supplementInput.fill('Mag');

    const dropdown = page.locator('#supp-listbox');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    const firstSuggestion = dropdown.locator('.ac__item').first();
    await firstSuggestion.tap();

    await expect(supplementInput).not.toHaveValue('');
    await expect(dropdown).not.toBeVisible();
  });
});
