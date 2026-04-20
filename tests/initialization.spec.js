import { test, expect } from '@playwright/test';
import { gotoEditor } from './support/test.js';

test.describe('Chargement de l’application', () => {
  test('affiche l’éditeur une fois le schéma chargé', async ({ page }) => {
    await gotoEditor(page);

    await expect(page.locator('#editor_holder')).not.toBeEmpty();
  });

  test('affiche une alerte si le schéma est inaccessible', async ({ page }) => {
    await page.route('**/api/module-schema/module-json-schema.json', (route) =>
      route.abort(),
    );

    const dialogPromise = page.waitForEvent('dialog');
    await page.goto('/modulix-editor/');
    const dialog = await dialogPromise;

    expect(dialog.message()).toContain('schéma');
    await dialog.accept();
  });

  test('le shortId est pré-rempli avec un identifiant hexadécimal de 8 caractères', async ({
    page,
  }) => {
    await gotoEditor(page);

    const shortIdInput = page.locator('[name="Module[shortId]"]');
    const value = await shortIdInput.inputValue();

    expect(value).toMatch(/^[0-9a-f]{8}$/);
  });

  test('le shortId est en lecture seule', async ({ page }) => {
    await gotoEditor(page);

    const shortIdInput = page.locator('[name="Module[shortId]"]');

    await expect(shortIdInput).toHaveAttribute('readonly');
  });

  test('la visibilité est pré-remplie à "public"', async ({ page }) => {
    await gotoEditor(page);

    const visibilityField = page.locator('[name="Module[visibility]"]');
    const value = await visibilityField.inputValue();

    expect(value).toBe('public');
  });

  test('la visibilité ne peut pas être modifiée', async ({ page }) => {
    await gotoEditor(page);

    const visibilityField = page.locator('[name="Module[visibility]"]');

    await expect(visibilityField).toBeDisabled();
  });
});
