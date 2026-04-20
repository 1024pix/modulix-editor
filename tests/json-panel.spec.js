import { test, expect } from '@playwright/test';
import { gotoEditor } from './support/test.js';

test.describe('Panneau JSON', () => {
  test('le panneau JSON est masqué par défaut', async ({ page }) => {
    await gotoEditor(page);

    await expect(page.locator('#json-output-pane')).toBeHidden();
  });

  test('le bouton JSON affiche le panneau', async ({ page }) => {
    await gotoEditor(page);

    await page.click('#toggle-json-button');

    await expect(page.locator('#json-output-pane')).toBeVisible();
  });

  test('un second clic sur le bouton JSON masque le panneau', async ({
    page,
  }) => {
    await gotoEditor(page);

    await page.click('#toggle-json-button');
    await page.click('#toggle-json-button');

    await expect(page.locator('#json-output-pane')).toBeHidden();
  });

  test("l'éditeur Monaco contient le JSON du module après initialisation", async ({
    page,
  }) => {
    await gotoEditor(page);
    await page.click('#toggle-json-button');

    const jsonContent = await page.evaluate(() =>
      window.monacoEditor.getValue(),
    );
    const parsed = JSON.parse(jsonContent);

    expect(parsed).toHaveProperty('shortId');
    expect(parsed).toHaveProperty('visibility', 'public');
  });

  test('modifier le JSON directement met à jour le formulaire', async ({
    page,
  }) => {
    await gotoEditor(page);
    await page.click('#toggle-json-button');

    const currentJson = await page.evaluate(() =>
      window.monacoEditor.getValue(),
    );
    const module = JSON.parse(currentJson);
    module.slug = 'mon-nouveau-slug';

    await page.evaluate(
      (json) => window.monacoEditor.setValue(json),
      JSON.stringify(module, null, 2),
    );
    await page.evaluate(() => window.monacoEditor.focus());
    await page.locator('h1').click();

    const slugInput = page.locator('[name="Module[slug]"]');
    await expect(slugInput).toHaveValue('mon-nouveau-slug');
  });

  test('un JSON invalide ne met pas à jour le formulaire', async ({ page }) => {
    await gotoEditor(page);
    await page.click('#toggle-json-button');

    const slugAvant = await page.locator('[name="Module[slug]"]').inputValue();

    await page.evaluate(() =>
      window.monacoEditor.setValue('{ json invalide !!!'),
    );
    await page.evaluate(() => window.monacoEditor.focus());
    await page.locator('h1').click();

    await expect(page.locator('[name="Module[slug]"]')).toHaveValue(slugAvant);
  });

  test('corriger un JSON invalide met à jour le formulaire', async ({
    page,
  }) => {
    await gotoEditor(page);
    await page.click('#toggle-json-button');

    await page.evaluate(() => window.monacoEditor.setValue('{ invalide }'));
    await page.evaluate(() => window.monacoEditor.focus());
    await page.locator('h1').click();

    const module = {
      slug: 'test-corrige',
      shortId: 'abc12345',
      visibility: 'public',
    };
    await page.evaluate(
      (json) => window.monacoEditor.setValue(json),
      JSON.stringify(module),
    );
    await page.evaluate(() => window.monacoEditor.focus());
    await page.locator('h1').click();

    await expect(page.locator('[name="Module[slug]"]')).toHaveValue(
      'test-corrige',
    );
  });
});
