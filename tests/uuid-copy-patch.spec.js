import { test, expect } from '@playwright/test';
import { gotoEditor } from './support/test.js';

const regExpForUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const ORIGINAL_UUID = '33333333-3333-4333-8333-333333333333';

test.describe('Patch UUID - when user duplicates an element', () => {
  test('regenerateUUIDs - should generate a new UUID for a text element', async ({
    page,
  }) => {
    await gotoEditor(page);

    const result = await page.evaluate(async () => {
      const { regenerateUUIDs } = await import(
        '/modulix-editor/json-editor-copy-uuid-patch.js'
      );

      const textElementSchema = {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          type: { type: 'string', enum: ['text'] },
          content: { type: 'string' },
        },
      };

      const original = {
        id: '33333333-3333-4333-8333-333333333333',
        type: 'text',
        content: 'Mon élément à dupliquer dans le grain',
      };

      const copy = regenerateUUIDs(original, textElementSchema);

      return { originalId: original.id, copiedId: copy.id, copy };
    });

    expect(result.originalId).toBe(ORIGINAL_UUID);
    expect(result.copiedId).not.toBe(result.originalId);
    expect(result.copiedId).toMatch(regExpForUUID);
    expect(result.copy.type).toBe('text');
    expect(result.copy.content).toBe('Mon élément à dupliquer dans le grain');
  });

  test('applyJsonEditorCopyUuidPatch - clicking the copy button should generate a new UUID for the copied element', async ({
    page,
  }) => {
    await gotoEditor(page);

    const values = await page.evaluate(() => {
      const ArrayEditor = window.JSONEditor.defaults.editors.array;

      const fakeEditor = {
        schema: {
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              type: { type: 'string', enum: ['text'] },
            },
          },
        },
        _values: [{ id: '33333333-3333-4333-8333-333333333333', type: 'text' }],
        getValue() {
          return this._values;
        },
        setValue(v) {
          this._values = v;
        },
        refreshValue() {},
        onChange() {},
        jsoneditor: { trigger() {} },
        rows: [{}],
        getButton: () => document.createElement('button'),
        getItemTitle: () => 'Item',
      };

      const holder = document.createElement('div');
      ArrayEditor.prototype._createCopyButton.call(fakeEditor, 0, holder);
      holder.querySelector('button').click();

      return fakeEditor.getValue();
    });

    expect(values).toHaveLength(2);
    expect(values[0].id).toBe(ORIGINAL_UUID);
    expect(values[1].id).not.toBe(ORIGINAL_UUID);
    expect(values[1].id).toMatch(regExpForUUID);
  });
});