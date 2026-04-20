import { test as base, expect } from '@playwright/test';
import { schema } from '../../modulix.json-schema.js';

const SCHEMA_URL_PATTERN = '**/api/module-schema/module-json-schema.json';
const EDITOR_READY_SELECTOR = '[name="Module[shortId]"]';
const EDITOR_TIMEOUT = 30_000;

export async function gotoEditor(page) {
  await page.route(SCHEMA_URL_PATTERN, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(schema),
    });
  });
  await page.goto('/modulix-editor/');
  await page.waitForSelector(EDITOR_READY_SELECTOR, {
    timeout: EDITOR_TIMEOUT,
  });
}
