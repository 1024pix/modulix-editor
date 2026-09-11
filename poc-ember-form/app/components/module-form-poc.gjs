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
    <div class="module-form-poc">
      <h1>POC — Formulaire Modulix généré avec Ember, sans json-editor</h1>

      <div class="field">
        <label>
          shortId (lecture seule, généré)
          <input type="text" value={{this.module.shortId}} readonly />
        </label>
      </div>

      <div class="field">
        <label>
          Visibilité
          <select {{on "change" this.updateVisibility}}>
            {{#each VISIBILITIES as |v|}}
              <option value={{v}} selected={{eq v this.module.visibility}}>{{v}}</option>
            {{/each}}
          </select>
        </label>
      </div>

      <h2>Sections</h2>
      <SectionsField @sections={{this.module.sections}} @onChange={{this.updateSections}} />

      <h2>JSON généré (vérification)</h2>
      <pre class="module-form-poc__json">{{this.json}}</pre>
    </div>
  </template>
}
