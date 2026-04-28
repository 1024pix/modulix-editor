import { test, expect } from '@playwright/test';
import { gotoEditor } from './support/test.js';

const LOCALSTORAGE_KEY = 'modulix-schema';

test.describe("Barre d'outils", () => {
  test.describe('Bouton Supprimer', () => {
    test('affiche une confirmation avant de supprimer', async ({ page }) => {
      await gotoEditor(page);

      const dialogPromise = page.waitForEvent('dialog');
      page.click('#reset-button');
      const dialog = await dialogPromise;

      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toContain('réinitialiser');
      await dialog.dismiss();
    });

    test('annuler la confirmation ne recharge pas la page', async ({
      page,
    }) => {
      await gotoEditor(page);

      await page.evaluate(() => {
        window.__notReloaded = true;
      });

      page.on('dialog', (dialog) => dialog.dismiss());
      await page.click('#reset-button');

      const marker = await page.evaluate(() => window.__notReloaded);
      expect(marker).toBe(true);
    });

    test('confirmer la suppression recharge la page et vide le localStorage', async ({
      page,
    }) => {
      await gotoEditor(page);

      const shortIdAvantReset = JSON.parse(
        await page.evaluate(
          (key) => localStorage.getItem(key),
          LOCALSTORAGE_KEY,
        ),
      ).shortId;

      page.on('dialog', (dialog) => dialog.accept());
      await page.click('#reset-button');

      await page.waitForSelector('[name="Module[shortId]"]', {
        timeout: 30_000,
      });

      const saved = JSON.parse(
        await page.evaluate(
          (key) => localStorage.getItem(key),
          LOCALSTORAGE_KEY,
        ),
      );
      expect(saved.shortId).not.toBe(shortIdAvantReset);
    });
  });

  test.describe('Bouton Mémo', () => {
    test('ouvre la fiche mémo dans un nouvel onglet', async ({
      page,
      context,
    }) => {
      await gotoEditor(page);

      const [cheatsheetPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('#display-documentation-button'),
      ]);

      expect(cheatsheetPage.url()).toContain('cheatsheet');
    });
  });

  test.describe('Bouton Nettoyer', () => {
    test('remplace les apostrophes droites par des apostrophes typographiques', async ({
      page,
    }) => {
      await gotoEditor(page);
      await page.click('#toggle-json-button');

      const currentJson = await page.evaluate(() =>
        window.monacoEditor.getValue(),
      );
      const module = JSON.parse(currentJson);
      module.title = "C'est un test";

      await page.evaluate(
        (json) => window.monacoEditor.setValue(json),
        JSON.stringify(module, null, 2),
      );
      await page.evaluate(() => window.monacoEditor.focus());
      await page.locator('h1').click();
      await page.click('#format-button');

      const result = await page.evaluate(() => window.monacoEditor.getValue());
      const resultModule = JSON.parse(result);
      expect(resultModule.title).toBe("C’est un test");
    });

    test('ajoute une espace insécable avant les signes de ponctuation doubles', async ({
      page,
    }) => {
      await gotoEditor(page);
      await page.click('#toggle-json-button');

      const currentJson = await page.evaluate(() =>
        window.monacoEditor.getValue(),
      );
      const module = JSON.parse(currentJson);
      module.title = 'Vraiment ?';

      await page.evaluate(
        (json) => window.monacoEditor.setValue(json),
        JSON.stringify(module, null, 2),
      );
      await page.evaluate(() => window.monacoEditor.focus());
      await page.locator('h1').click();
      await page.click('#format-button');

      const result = await page.evaluate(() => window.monacoEditor.getValue());
      const resultModule = JSON.parse(result);
      expect(resultModule.title).toBe('Vraiment ?');
    });
  });

  test.describe('Bouton Replier', () => {
    test("le bouton Replier est présent dans la barre d'outils", async ({
      page,
    }) => {
      await gotoEditor(page);

      await expect(page.locator('#collapse-all-button')).toBeVisible();
    });

    test("cliquer sur Replier ne provoque pas d'erreur", async ({ page }) => {
      await gotoEditor(page);

      const errors = [];
      page.on('pageerror', (err) => errors.push(err.message));

      await page.click('#collapse-all-button');

      expect(errors).toHaveLength(0);
    });
  });

  test.describe('Bouton Prévisualiser', () => {
    test('ouvre une nouvelle fenêtre vers la preview Pix', async ({
      page,
      context,
    }) => {
      await gotoEditor(page);

      const [previewPage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('#preview-button'),
      ]);

      expect(previewPage.url()).toContain(
        'app.integration.pix.fr/modules/preview',
      );
    });
  });
});
