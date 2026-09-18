export function applyJsonEditorCopyUuidPatch() {
  const editors = window.JSONEditor?.defaults?.editors;
  if (!editors?.array || !editors?.table) {
    console.warn(
      'json-editor UUID patch not applied: JSONEditor.defaults.editors.array/table not found.',
    );
    return;
  }

  patchArrayEditorCopyButton(editors.array);
  patchTableEditorCopyButton(editors.table);
}

function patchArrayEditorCopyButton(ArrayEditor) {
  ArrayEditor.prototype._createCopyButton = function (i, holder) {
    const button = this.getButton(
      this.getItemTitle(),
      'copy',
      'button_copy_row_title',
      [this.getItemTitle()],
    );
    const schema = this.schema;
    button.classList.add('copy', 'json-editor-btntype-copy');
    button.setAttribute('data-i', i);
    button.addEventListener('click', (e) => {
      const value = this.getValue();
      e.preventDefault();
      e.stopPropagation();
      const clickedIndex = e.currentTarget.getAttribute('data-i') * 1;

      value.forEach((row, j) => {
        if (j === clickedIndex) {
          value.push(regenerateUUIDs(row, schema.items));
        }
      });

      this.setValue(value);
      this.refreshValue(true);
      this.onChange(true);
      this.jsoneditor.trigger('copyRow', this.rows[clickedIndex]);
    });

    holder.appendChild(button);
    return button;
  };
}

function patchTableEditorCopyButton(TableEditor) {
  TableEditor.prototype._createCopyButton = function (i, holder) {
    const button = this.getButton('', 'copy', 'button_copy_row_title_short');
    const schema = this.schema;
    button.classList.add('copy', 'json-editor-btntype-copy');
    button.setAttribute('data-i', i);
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const j = e.currentTarget.getAttribute('data-i') * 1;
      const value = this.getValue();

      const newValue = regenerateUUIDs(value[j], schema.items);

      value.splice(j + 1, 0, newValue);
      this.setValue(value);
      this.onChange(true);
      this.jsoneditor.trigger('copyRow', this.rows[j + 1]);
    });
    holder.appendChild(button);
    return button;
  };
}

export function regenerateUUIDs(value, schema) {
  if (!schema) return deepCopy(value);

  if (schema.type === 'string' && schema.format === 'uuid') {
    return generateUUID();
  }

  if (schema.type === 'object' && schema.properties) {
    const newObj = { ...value };
    for (const key of Object.keys(newObj)) {
      if (schema.properties[key]) {
        newObj[key] = regenerateUUIDs(newObj[key], schema.properties[key]);
      }
    }
    return newObj;
  }

  if (schema.type === 'array' && schema.items) {
    return (Array.isArray(value) ? value : []).map((item) =>
      regenerateUUIDs(item, schema.items),
    );
  }

  if (schema.oneOf || schema.anyOf) {
    const candidates = schema.oneOf || schema.anyOf;
    const matching = candidates.find((s) => schemaMatchesValue(value, s));
    return matching ? regenerateUUIDs(value, matching) : deepCopy(value);
  }

  return deepCopy(value);
}

function deepCopy(target) {
  if (Array.isArray(target)) return target.map(deepCopy);
  if (target !== null && typeof target === 'object') return { ...target };
  return target;
}

function generateUUID() {
  let timestamp = new Date().getTime();

  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    timestamp += performance.now(); // Affine avec microsecondes
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = ((timestamp + Math.random() * 16) % 16) | 0;
    timestamp = Math.floor(timestamp / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function schemaMatchesValue(value, schema) {
  if (schema.oneOf || schema.anyOf) {
    return (schema.oneOf || schema.anyOf).some((s) =>
      schemaMatchesValue(value, s),
    );
  }
  if (schema.type === 'object' && schema.properties) {
    if (typeof value !== 'object' || value === null) return false;
    return Object.entries(schema.properties).every(([key, propSchema]) => {
      if (!propSchema.enum) return true;
      return propSchema.enum.includes(value[key]);
    });
  }
  return true;
}


