import { test, expect } from '@playwright/test';

test.describe('Interaction Checker Click Behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('clicking "Supplement" label focuses left input', async ({ page }) => {
    const suppLabel = page.locator('button[aria-controls="suppInput"]');
    const suppInput = page.locator('#suppInput');

    await suppLabel.click();
    await expect(suppInput).toBeFocused();
  });

  test('clicking "Medication" label focuses right input', async ({ page }) => {
    const medLabel = page.locator('button[aria-controls="medInput"]');
    const medInput = page.locator('#medInput');

    await medLabel.click();
    await expect(medInput).toBeFocused();
  });

  test('clicking Magnesium chip fills supplement input', async ({ page }) => {
    const magnesiumChip = page.locator('.chip').filter({ hasText: 'Magnesium' });
    const suppInput = page.locator('#suppInput');

    await magnesiumChip.click();
    await expect(suppInput).toHaveValue('Magnesium');
    await expect(suppInput).toBeFocused();
  });

  test('clicking Metformin chip fills medication input', async ({ page }) => {
    const metforminChip = page.locator('.chip').filter({ hasText: 'Metformin' });
    const medInput = page.locator('#medInput');

    await metforminChip.click();
    await expect(medInput).toHaveValue('Metformin');
    await expect(medInput).toBeFocused();
  });

  test('typing in supplement input shows autocomplete dropdown', async ({ page }) => {
    const suppInput = page.locator('#suppInput');

    await suppInput.fill('Mag');
    await page.waitForTimeout(300);

    const dropdown = page.locator('#supp-listbox');
    await expect(dropdown).toBeVisible();
  });

  test('selecting autocomplete item commits value and closes dropdown', async ({ page }) => {
    const suppInput = page.locator('#suppInput');

    await suppInput.fill('Mag');
    await page.waitForTimeout(300);

    const firstOption = page.locator('#supp-listbox .ac__item').first();
    await firstOption.click();

    const dropdown = page.locator('#supp-listbox');
    await expect(dropdown).not.toBeVisible();
    await expect(suppInput).not.toHaveValue('');
  });

  test('inputs have proper ARIA attributes', async ({ page }) => {
    const suppInput = page.locator('#suppInput');
    const medInput = page.locator('#medInput');

    await expect(suppInput).toHaveAttribute('role', 'combobox');
    await expect(suppInput).toHaveAttribute('aria-autocomplete', 'list');
    await expect(suppInput).toHaveAttribute('aria-controls', 'supp-listbox');

    await expect(medInput).toHaveAttribute('role', 'combobox');
    await expect(medInput).toHaveAttribute('aria-autocomplete', 'list');
    await expect(medInput).toHaveAttribute('aria-controls', 'med-listbox');
  });

  test('chips are keyboard accessible', async ({ page }) => {
    const magnesiumChip = page.locator('.chip').filter({ hasText: 'Magnesium' });
    const suppInput = page.locator('#suppInput');

    await magnesiumChip.focus();
    await magnesiumChip.press('Enter');

    await expect(suppInput).toHaveValue('Magnesium');
  });

  test('selecting supplement autocomplete moves focus to medication input', async ({ page }) => {
    const suppInput = page.locator('#suppInput');
    const medInput = page.locator('#medInput');

    await suppInput.fill('Mag');
    await page.waitForTimeout(300);

    const firstOption = page.locator('#supp-listbox .ac__item').first();
    await firstOption.click();

    await page.waitForTimeout(100);
    await expect(medInput).toBeFocused();
  });
});
