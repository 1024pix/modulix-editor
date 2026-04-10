import LocalBackup from './LocalBackup.js';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') return new jsonWorker();
    return new editorWorker();
  },
};

const schemaUrls = [
  'https://api.integration.pix.fr/api/module-schema/module-json-schema.json',
  'https://api.recette.pix.fr/api/module-schema/module-json-schema.json',
];

if (import.meta.env.DEV) {
  schemaUrls.unshift(`http://localhost:${import.meta.env.VITE_API_PORT}/api/module-schema/module-json-schema.json`);
}

let schema;
while (!schema && schemaUrls.length > 0) {
  schema = await fetch(
    schemaUrls.shift(),
    { cache: 'no-cache' }, // misleading name, this will use the cache, but verify the ETag first (https://developer.mozilla.org/en-US/docs/Web/API/Request/cache)
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`invalid status code ${res.status}`);
      }
      return res.json();
    })
    .catch((err) => {
      console.error(
        'Error fetching JSON Schema from Pix API:',
        err.message,
      );
    });
}

if (schema) {
  init(schema);
} else {
  window.alert('Erreur : Impossible de charger le schéma des modules');
}

function init(schema) {
  const tooltipTriggerList = document.querySelectorAll('[data-tooltip]');
  [...tooltipTriggerList].map(
    (el) =>
      new bootstrap.Tooltip(el, {
        placement: 'bottom',
        trigger: 'hover',
        title: el.dataset.tooltip,
      }),
  );

  const element = document.getElementById('editor_holder');
  const jsonOutputContainer = document.getElementById('json_output');
  const monacoEditor = monaco.editor.create(jsonOutputContainer, {
    language: 'json',
    theme: 'vs',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 13,
    fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
  });

  Jodit.defaultOptions.toolbarAdaptive = false;
  Jodit.defaultOptions.buttons =
    'paragraph,|,bold,italic,strikethrough,link,eraser,|,ul,ol,|,hr,|,source';
  Jodit.defaultOptions.controls.paragraph.list = {
    p: 'Paragraph',
    h4: 'Heading 4',
    h5: 'Heading 5',
    blockquote: 'Quote',
    code: 'Source code',
  };
  Jodit.defaultOptions.controls.ul.list = null;
  Jodit.defaultOptions.controls.ol.list = null;
  Jodit.defaultOptions.enter = 'p';
  Jodit.defaultOptions.defaultMode = 3;
  Jodit.defaultOptions.useSplitMode = true;
  Jodit.defaultOptions.askBeforePasteHTML = false;
  Jodit.defaultOptions.defaultActionOnPaste = Jodit.constants.INSERT_ONLY_TEXT;

  schema.format = 'categories';
  schema.properties.sections.items.headerTemplate =
    '#{{i0}} {{ self.type }}';
  schema.properties.sections.items.properties.grains.items.headerTemplate =
    '#{{i0}} {{ self.title }}';

  // Force text element in top of list
  schema.properties.sections.items.properties.grains.items.properties.components.items.oneOf[0].properties.element.oneOf.sort(
    sortTextElementFirst,
  );
  schema.properties.sections.items.properties.grains.items.properties.components.items.oneOf[1].properties.steps.items.properties.elements.items.oneOf.sort(
    sortTextElementFirst,
  );

  schema.properties.sections.items.properties.grains.items.options = {
    collapsed: true,
  };
  schema.properties.sections.items.options = {
    collapsed: true,
  };

  schema.properties.shortId.default = generateId();
  schema.properties.shortId.readonly = true;

  schema.properties.visibility.default = 'public';
  schema.properties.visibility.readonly = true;

  const editor = new JSONEditor(element, {
    schema,
    theme: 'bootstrap5',
    iconlib: 'fontawesome5',
    no_additional_properties: false,
    disable_edit_json: true,
    disable_properties: true,
    disable_array_reorder: false,
    form_name_root: 'Module',
    show_errors: 'always',
  });

  const previewButton = document.querySelector('#preview-button');
  let previewWindow;
  previewButton.addEventListener('click', () => {
    const moduleContent = editor.getValue();
    const windowName = `modulix-preview-${moduleContent.id}`;
    previewWindow = window.open(
      'https://app.integration.pix.fr/modules/preview',
      windowName,
    );
  });

  window.addEventListener('message', (event) => {
    if (
      event.data?.from === 'pix-app' &&
      event.data?.message === 'Ready to receive content !'
    ) {
      const moduleContent = editor.getValue();
      sendDataForPreview(previewWindow, moduleContent);
    }
  });

  const jsonOutputPane = document.querySelector('#json-output-pane');
  const toggleCodeButton = document.querySelector('#toggle-json-button');
  let jsonOutputPaneDisplayed = false;
  toggleCodeButton.addEventListener('click', () => {
    jsonOutputPaneDisplayed = !jsonOutputPaneDisplayed;
    jsonOutputPane.style.display = jsonOutputPaneDisplayed
      ? 'block'
      : 'none';
  });

  const copyJsonButton = document.querySelector('#copy-json-button');
  copyJsonButton.addEventListener('click', () => {
    navigator.clipboard.writeText(monacoEditor.getValue()).then(() => {
      copyJsonButton.innerHTML = '<span class="fa fa-check me-1"></span> Copié !';
      setTimeout(() => {
        copyJsonButton.innerHTML = '<span class="fa fa-copy me-1"></span> Copier';
      }, 2000);
    });
  });

  const downloadButton = document.querySelector('#download-json-button');
  downloadButton.addEventListener('click', () => {
    const downloadLink = document.createElement('a');
    const json = editor.getValue();
    const jsonContent = JSON.stringify(json, null, 2);
    downloadLink.setAttribute(
      'href',
      'data:application/json;charset=utf-8,' +
      encodeURIComponent(jsonContent),
    );
    downloadLink.setAttribute('download', `${json.slug}.json`);

    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });

  const resetButton = document.querySelector('#reset-button');
  resetButton.addEventListener('click', () => {
    if (
      window.confirm(
        'Voulez-vous vraiment réinitialiser le module ? Toutes les modifications seront perdues.',
      )
    ) {
      LocalBackup.delete();
      window.location.reload();
    }
  });

  const documentationButton = document.querySelector('#display-documentation-button');
  let documentationWindow;
  documentationButton.addEventListener('click', () => {
    const windowName = `cheatsheet`;
    documentationWindow = window.open(`cheatsheet`,'_blank');
  });

  const formatButton = document.getElementById('format-button');
  formatButton.addEventListener('click', () => {
    let jsonValue = JSON.stringify(editor.getValue());
    jsonValue = jsonValue.replaceAll(
      / (\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
      ' $1',
    );
    jsonValue = jsonValue.replaceAll(/ ([;?!])/g, ' $1');
    jsonValue = jsonValue.replaceAll(/(«) | ([»:])/g, '$1 $2');
    jsonValue = jsonValue.replaceAll(/<p><br><\/p>/g, '');
    jsonValue = jsonValue.replaceAll(/\\n/g, '');
    jsonValue = jsonValue.replaceAll(/'/g, '’');

    const output = JSON.parse(jsonValue);
    monacoEditor.setValue(JSON.stringify(output, null, 2));
    editor.setValue(output);
  });

  const collapseAllButton = document.getElementById(
    'collapse-all-button',
  );
  collapseAllButton.addEventListener('click', () => {
    const grainCollapseButtons = document.querySelectorAll(
      '#sections .card-title.level-5 button[title="Collapse"]',
    );
    const sectionCollapseButtons = document.querySelectorAll(
      '#sections .card-title.level-3 button[title="Collapse"]',
    );
    for (const button of [
      ...grainCollapseButtons,
      ...sectionCollapseButtons,
    ]) {
      button.click();
    }
  });

  editor.on('change', () => {
    const newJson = JSON.stringify(editor.getValue(), null, 2);
    if (newJson !== monacoEditor.getValue()) {
      monacoEditor.setValue(newJson);
    }

    LocalBackup.save(editor.getValue());
    const moduleContent = editor.getValue();
    sendDataForPreview(previewWindow, moduleContent);
  });

  monacoEditor.onDidBlurEditorText(() => {
    try {
      const value = JSON.parse(monacoEditor.getValue());
      editor.setValue(value);
    } catch (error) {
      console.error(error);
    }
  });

  editor.on('ready', () => {
    const schema = LocalBackup.load();
    if (schema) {
      editor.setValue(schema);
    }

    document.querySelectorAll('#editor_holder [title]').forEach((el) => {
      new bootstrap.Tooltip(el, { placement: 'top', trigger: 'hover' });
    });
  });
}

function dec2hex(dec) {
  return dec.toString(16).padStart(2, '0');
}

function generateId() {
  const arr = new Uint8Array((8 || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
}

/**
 * Send module content to Pix App preview
 * @param moduleContent
 * @param previewWindow
 */
function sendDataForPreview(previewWindow, moduleContent) {
  previewWindow?.postMessage(
    { from: 'modulix-editor', moduleContent },
    '*',
  );
}

function sortTextElementFirst(elementA, elementB) {
  if (elementA.title === 'text' && elementB.title !== 'text') {
    return -1;
  } else if (elementB.title === 'text' && elementA.title !== 'text') {
    return 1;
  }
  return 0; // keep the original order for other elements
}
