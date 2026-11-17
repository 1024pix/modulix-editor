import { test, expect } from '@playwright/test';
import { gotoEditor } from './support/test.js';

const LOCALSTORAGE_KEY = 'modulix-schema';

test.describe('Sauvegarde automatique locale', () => {
  test('sauvegarde le module dans le localStorage après initialisation', async ({
    page,
  }) => {
    await gotoEditor(page);

    const saved = await page.evaluate(
      (key) => localStorage.getItem(key),
      LOCALSTORAGE_KEY,
    );

    expect(saved).not.toBeNull();
    const parsed = JSON.parse(saved);
    expect(parsed).toHaveProperty('shortId');
  });

  test('restaure la sauvegarde au rechargement de la page', async ({
    page,
  }) => {
    const savedModule = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      shortId: 'deadbeef',
      slug: 'module-restaure',
      title: 'Module restauré',
      visibility: 'public',
      sections: [],
    };

    await page.addInitScript(
      ({ key, value }) => {
        localStorage.setItem(key, value);
      },
      { key: LOCALSTORAGE_KEY, value: JSON.stringify(savedModule) },
    );

    await gotoEditor(page);

    const slugInput = page.locator('[name="Module[slug]"]');
    await expect(slugInput).toHaveValue('module-restaure');
  });

  test('supprime silencieusement une sauvegarde corrompue et initialise l’éditeur', async ({
    page,
  }) => {
    await page.addInitScript(
      ({ key, value }) => {
        localStorage.setItem(key, value);
      },
      { key: LOCALSTORAGE_KEY, value: '{ json corrompu !!!' },
    );

    await gotoEditor(page);

    await expect(page.locator('#editor_holder')).not.toBeEmpty();

    const saved = await page.evaluate(
      (key) => localStorage.getItem(key),
      LOCALSTORAGE_KEY,
    );
    const parsed = JSON.parse(saved);
    expect(parsed).toHaveProperty('shortId');
  });

  test.describe('quand l’utilisateur clique sur Supprimer', () => {
    test('une popup est affichée, puis la sauvegarde du localStorage est supprimée', async ({
      page,
    }) => {
      // given
      const savedModule = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        shortId: 'deadbeef',
        slug: 'module-saved',
        title: 'Module sauvegardé',
        visibility: 'public',
        sections: [],
      };
      await gotoEditor(page);

      await page.evaluate(
        ({ key, value }) => localStorage.setItem(key, value),
        { key: LOCALSTORAGE_KEY, value: JSON.stringify(savedModule) },
      );

      // To display page with module already saved on local-storage
      await page.reload();

      const shortIdAvantReset = JSON.parse(
        await page.evaluate(
          (key) => localStorage.getItem(key),
          LOCALSTORAGE_KEY,
        ),
      ).shortId;

      page.on('dialog', (dialog) => dialog.accept());

      // when
      await page.click('#reset-button');
      await page.waitForSelector('[name="Module[shortId]"]', {
        timeout: 10_000,
      });

      // then
      const saved = JSON.parse(
        await page.evaluate(
          (key) => localStorage.getItem(key),
          LOCALSTORAGE_KEY,
        ),
      );
      expect(saved.shortId).not.toBe(shortIdAvantReset);
    });
  });
});
