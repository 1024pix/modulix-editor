import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { on } from '@ember/modifier';
import eq from 'ember-truth-helpers/helpers/eq';
import SectionsField from './sections-field';

const VISIBILITIES = ['public', 'private'];

function generateShortId() {
  return crypto.randomUUID().slice(0, 8);
}

function sampleModule() {
  return {
    shortId: generateShortId(),
    visibility: 'public',
    sections: [
      {
        id: crypto.randomUUID(),
        type: 'practise',
        grains: [
          {
            id: crypto.randomUUID(),
            title: 'Premier grain',
            components: [
              { id: crypto.randomUUID(), type: 'text', content: 'Un premier composant texte.' },
              { id: crypto.randomUUID(), type: 'image', url: '', alt: '' },
            ],
          },
        ],
      },
    ],
  };
}

export default class ModuleFormPoc extends Component {
  @tracked module = sampleModule();

  @action
  updateVisibility(event) {
    this.module = { ...this.module, visibility: event.target.value };
  }

  @action
  updateSections(sections) {
    this.module = { ...this.module, sections };
  }

  get json() {
    return JSON.stringify(this.module, null, 2);
  }

  <template>
    <div class="module-form-poc container py-4">
      <h1 class="h3 mb-4">POC — Formulaire Modulix généré avec Ember, sans json-editor</h1>

      <div class="field mb-3">
        <label class="form-label">
          shortId (lecture seule, généré)
          <input type="text" class="form-control" value={{this.module.shortId}} readonly />
        </label>
      </div>

      <div class="field mb-4">
        <label class="form-label">
          Visibilité
          <select class="form-select" {{on "change" this.updateVisibility}}>
            {{#each VISIBILITIES as |v|}}
              <option value={{v}} selected={{eq v this.module.visibility}}>{{v}}</option>
            {{/each}}
          </select>
        </label>
      </div>

      <h2 class="h5 mb-3">Sections</h2>
      <SectionsField @sections={{this.module.sections}} @onChange={{this.updateSections}} />

      <h2 class="h5 mt-4 mb-3">JSON généré (vérification)</h2>
      <pre class="module-form-poc__json bg-light border rounded p-3 mb-0"><code>{{this.json}}</code></pre>
    </div>
  </template>
}
