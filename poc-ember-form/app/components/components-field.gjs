import Component from '@glimmer/component';
import { action } from '@ember/object';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import sortableGroup from 'ember-sortable/modifiers/sortable-group';
import sortableItem from 'ember-sortable/modifiers/sortable-item';
import sortableHandle from 'ember-sortable/modifiers/sortable-handle';
import TextComponentEditor from './text-component-editor';
import ImageComponentEditor from './image-component-editor';

// Dispatch "sur-mesure" : pas de moteur oneOf générique, juste une table
// de correspondance type -> composant Ember, tenue à jour à la main.
const EDITORS = {
  text: TextComponentEditor,
  image: ImageComponentEditor,
};

function editorFor(type) {
  return EDITORS[type];
}

function makeComponent(type) {
  const base = { id: crypto.randomUUID(), type };
  if (type === 'text') return { ...base, content: '' };
  return { ...base, url: '', alt: '' };
}

export default class ComponentsField extends Component {
  @action
  reorder(items) {
    this.args.onChange(items);
  }

  @action
  addComponent(type) {
    this.args.onChange([...this.args.components, makeComponent(type)]);
  }

  @action
  removeComponent(component) {
    this.args.onChange(this.args.components.filter((c) => c !== component));
  }

  @action
  updateComponent(component, field, event) {
    this.args.onChange(
      this.args.components.map((c) => (c === component ? { ...c, [field]: event.target.value } : c)),
    );
  }

  <template>
    <ol class="components-field" {{sortableGroup onChange=this.reorder}}>
      {{#each @components as |component|}}
        <li class="components-field__item" data-test-component-id={{component.id}} {{sortableItem model=component}}>
          <span class="components-field__handle" {{sortableHandle}}>⠿</span>
          <strong>{{component.type}}</strong>
          {{#let (editorFor component.type) as |Editor|}}
            <Editor @component={{component}} @onChange={{fn this.updateComponent component}} />
          {{/let}}
          <button type="button" data-test-remove-component {{on "click" (fn this.removeComponent component)}}>Supprimer</button>
        </li>
      {{/each}}
    </ol>
    <button type="button" data-test-add-component="text" {{on "click" (fn this.addComponent "text")}}>+ Composant texte</button>
    <button type="button" data-test-add-component="image" {{on "click" (fn this.addComponent "image")}}>+ Composant image</button>
  </template>
}
